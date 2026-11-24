import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'
import test from 'node:test'
import { eligibleBookServices, supportChoices } from '../apps/editor/book-support.js'
import { recordBookEvent } from '../apps/editor/book-metrics.js'
import { onRequestGet } from '../functions/assets/book/services.json.js'
import { onRequestPost as event } from '../functions/api/flight-book/event.js'
import { confirmCheckout } from '../functions/api/flight-book/confirm.js'

const origin = 'https://workshop.example'
const stripeLink = 'https://buy.stripe.com/five'
const id = 'cs_live_Example123'
const env = {
  FLIGHT_BOOK_ORIGIN: origin,
  FLIGHT_BOOK_LINKS: JSON.stringify({ 5: stripeLink }),
  FLIGHT_BOOK_STRIPE_PAYMENT_LINKS: 'plink_Owned123',
  STRIPE_SECRET_KEY: 'rk_live_Fixture',
}
const request = (route, body, page = origin, source = page) =>
  new Request(page + '/api/flight-book/' + route, {
    method: 'POST', body, headers: { Origin: source },
  })

function database() {
  const db = new DatabaseSync(':memory:')
  db.exec(readFileSync(new URL('../public-release/flight-book-metrics.sql', import.meta.url), 'utf8'))
  return {
    prepare: sql => ({
      bind: (...args) => ({ run: () => db.prepare(sql).run(...args) }),
    }),
    totals: () => db.prepare('SELECT event, count FROM flight_book_daily ORDER BY event').all()
      .map(row => [row.event, row.count]),
    receipts: () => db.prepare('SELECT hash FROM flight_book_paid_receipts').all().map(row => row.hash),
    close: () => db.close(),
  }
}

test('checkout offers only valid amounts configured for the chosen HTTPS origin', () => {
  const config = { origin, links: { 3: 'http://buy.stripe.com/three', 5: stripeLink, 10: 'https://user:password@buy.stripe.com/ten', extra: stripeLink } }
  const available = supportChoices(new URL(origin + '/book.html'), config)
  assert.deepEqual(available.amounts, [0, 5])
  assert.equal(available.suggested, 5)
  assert.equal(available.linkFor(5), stripeLink)
  assert.equal(available.linkFor(0), null)
  assert.equal(available.linkFor(10), null)

  const flexible = supportChoices(origin, { origin, links: { other: stripeLink } })
  assert.deepEqual(flexible.amounts, [0, 'other'])
  assert.equal(flexible.suggested, 0)
  for (const origin of ['https://localhost', 'https://127.0.0.1', 'https://kevinmamaqi.github.io', 'file://', 'https://workshop.example/path', 'http://workshop.example']) {
    assert.equal(eligibleBookServices(origin, { origin }), false)
  }
  assert.equal(eligibleBookServices('https://preview.workshop.example', config), false)
})

test('config publishes only eligible public capabilities without secrets', async () => {
  const options = { ...env, FLIGHT_BOOK_METRICS: 'true', FLIGHT_BOOK_DB: {} }
  const response = onRequestGet({ request: new Request(origin + '/assets/book/services.json'), env: options })
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.deepEqual(await response.json(), { origin, links: { 5: stripeLink }, checkout: true, metrics: true })
  const off = onRequestGet({ request: new Request('https://kevinmamaqi.github.io/assets/book/services.json'), env: options })
  assert.deepEqual(await off.json(), { origin: null, links: {}, checkout: false, metrics: false })
  const generic = await onRequestGet({ request: new Request(origin), env: {
    FLIGHT_BOOK_ORIGIN: origin, FLIGHT_BOOK_LINKS: JSON.stringify({ other: stripeLink }),
  } }).json()
  assert.deepEqual(generic, { origin, links: { other: stripeLink }, checkout: false, metrics: false })
})

test('anonymous counters accept only fixed same-origin events', async () => {
  const db = database()
  const metrics = { ...env, FLIGHT_BOOK_METRICS: 'true', FLIGHT_BOOK_DB: db }
  try {
    for (const kind of ['download', 'home', 'book', 'download']) {
      assert.equal((await event({ request: request('event', kind), env: metrics })).status, 204)
    }
    for (const kind of ['paid', 'tracking'.repeat(100), '{"name":"Pilot"}']) {
      assert.equal((await event({ request: request('event', kind), env: metrics })).status, 400)
    }
    assert.equal((await event({ request: request('event', 'book', origin, 'https://other.example'), env: metrics })).status, 404)
    assert.equal((await event({ request: request('event', 'book'), env })).status, 404)
    assert.deepEqual(db.totals(), [['book', 1], ['download', 2], ['home', 1]])
  } finally { db.close() }
})

test('a Stripe paid EUR session for an allowed link verifies and counts once', async () => {
  const db = database()
  const metrics = { ...env, FLIGHT_BOOK_METRICS: 'true', FLIGHT_BOOK_DB: db }
  const paid = {
    id, object: 'checkout.session', livemode: true, mode: 'payment',
    status: 'complete', payment_status: 'paid', currency: 'eur',
    amount_total: 500, payment_link: 'plink_Owned123',
    customer_details: { name: 'Fixture customer', email: 'test@example.org' },
  }
  const stripe = (changes = {}) => async (url, options) => {
    assert.equal(url, 'https://api.stripe.com/v1/checkout/sessions/' + id)
    assert.equal(options.headers.Authorization, 'Bearer ' + env.STRIPE_SECRET_KEY)
    assert.equal(options.redirect, 'error')
    return Response.json({ ...paid, ...changes })
  }
  try {
    const blocked = await confirmCheckout(request('confirm', id, origin, 'https://other.example'), metrics,
      () => { assert.fail('Cross-origin request reached Stripe') })
    assert.equal(blocked.status, 404)
    const invalid = await confirmCheckout(request('confirm', 'cs_test_False'), metrics,
      () => { assert.fail('Test-mode token reached Stripe') })
    assert.equal(invalid.status, 400)
    for (const changes of [{ id: 'another' }, { status: 'open' }, { livemode: false },
      { currency: 'usd' }, { amount_total: 0 }, { payment_status: 'unpaid' }, { payment_link: 'plink_Unknown' },
      { payment_link: null }, { mode: 'subscription' }]) {
      const result = await confirmCheckout(request('confirm', id), metrics, stripe(changes))
      assert.deepEqual(await result.json(), { verified: false })
    }
    assert.deepEqual(db.totals(), [])
    const repeated = await Promise.all(Array.from({ length: 3 }, () =>
      confirmCheckout(request('confirm', id), metrics, stripe())))
    for (const response of repeated) assert.deepEqual(await response.json(), { verified: true })
    assert.deepEqual(db.totals(), [['paid', 1]])
    assert.match(db.receipts()[0], /^[a-f0-9]{64}$/)
    assert.equal(db.receipts().length, 1)

    const noMetrics = await confirmCheckout(request('confirm', id), env, stripe())
    assert.deepEqual(await noMetrics.json(), { verified: true })
    const dbUnavailable = await confirmCheckout(request('confirm', id), { ...metrics, FLIGHT_BOOK_DB: {
      prepare: () => { throw new Error('DB unavailable') },
    } }, stripe())
    assert.deepEqual(await dbUnavailable.json(), { verified: true })
  } finally { db.close() }
})

test('browser removes a Stripe return token and transmits only fixed events and the token', async t => {
  const { recoverBookCheckout } = await import('../apps/editor/book-support.js')
  const requests = []
  globalThis.location = new URL(origin + '/book.html?lang=es&paid=' + id + '#pilot=Luc%C3%ADa')
  globalThis.history = { state: null, replaceState: (_state, _title, url) => { globalThis.location = url } }
  t.mock.method(globalThis, 'fetch', async (resource, init) => {
    const path = String(resource)
    requests.push({ path, ...init })
    if (path.endsWith('services.json')) return Response.json({ origin, links: { 5: stripeLink }, checkout: true, metrics: true })
    if (path.endsWith('/confirm')) return Response.json({ verified: true })
    return new Response(null, { status: 204 })
  })
  try {
    assert.equal(await recoverBookCheckout(), true)
    assert.equal(globalThis.location.search, '?lang=es')
    assert.equal(globalThis.location.hash, '#pilot=Luc%C3%ADa')
    assert.equal(await recoverBookCheckout(), false)
    await recordBookEvent('download')
    await recordBookEvent('paid')
    assert.equal(requests.length, 3)
    assert.equal(requests[1].body, id)
    assert.equal(requests[2].body, 'download')
    for (const { credentials, referrerPolicy } of requests) {
      assert.equal(credentials, 'omit')
      assert.equal(referrerPolicy, 'no-referrer')
    }
  } finally {
    delete globalThis.location
    delete globalThis.history
  }
})
