import { eligibleBookServices, supportChoices } from '../apps/editor/book-support.js'

export function serviceConfig(request, env) {
  const inactive = { origin: null, links: {}, checkout: false, metrics: false }
  const origin = env.FLIGHT_BOOK_ORIGIN
  if (!eligibleBookServices(request.url, { origin })) return inactive
  let configuredLinks
  try {
    configuredLinks = JSON.parse(env.FLIGHT_BOOK_LINKS || '{}')
  } catch { configuredLinks = {} }
  const choices = supportChoices(request.url, { origin, links: configuredLinks })
  const links = Object.fromEntries(choices.amounts.slice(1).map(amount => [amount, choices.linkFor(amount)]))
  const paymentLinks = (env.FLIGHT_BOOK_STRIPE_PAYMENT_LINKS || '').trim().split(/\s*,\s*/)
  const checkout = choices.amounts.length > 1 && /^(?:rk|sk)_live_[a-zA-Z0-9]+$/.test(env.STRIPE_SECRET_KEY || '')
    && paymentLinks.some(id => /^plink_[a-zA-Z0-9]+$/.test(id))
  return { origin, links, checkout, metrics: env.FLIGHT_BOOK_METRICS === 'true' && Boolean(env.FLIGHT_BOOK_DB) }
}

export function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' },
  })
}

export function sameOrigin(request) {
  const site = request.headers.get('Sec-Fetch-Site')
  return request.headers.get('Origin') === new URL(request.url).origin && (!site || site === 'same-origin')
}

export async function smallBody(request, limit) {
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'text/plain' || !request.body) return null
  const bytes = new Uint8Array(limit)
  const reader = request.body.getReader()
  let used = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) return new TextDecoder().decode(bytes.subarray(0, used))
      if (used + value.length > limit) {
        await reader.cancel()
        return null
      }
      bytes.set(value, used)
      used += value.length
    }
  } catch { return null }
  finally { reader.releaseLock() }
}

export function countEvent(db, day, event) {
  return db.prepare(`
    INSERT INTO flight_book_daily (day, event, count) VALUES (?, ?, 1)
    ON CONFLICT(day, event) DO UPDATE SET count = count + 1
  `).bind(day, event).run()
}

export async function countPayment(db, day, sessionID) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(sessionID))
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
  // The SQL trigger increments the aggregate atomically for new receipts only.
  return db.prepare('INSERT OR IGNORE INTO flight_book_paid_receipts (hash, day) VALUES (?, ?)')
    .bind(hash, day).run()
}

export const utcDay = (time = Date.now()) => new Date(time).toISOString().slice(0, 10)

export async function verifyCheckout(id, env, fetchStripe) {
  const allowed = new Set((env.FLIGHT_BOOK_STRIPE_PAYMENT_LINKS || '').trim().split(/\s*,\s*/))
  try {
    const response = await fetchStripe('https://api.stripe.com/v1/checkout/sessions/' + id, {
      headers: { Authorization: 'Bearer ' + env.STRIPE_SECRET_KEY, 'Stripe-Version': '2026-11-18.endive' },
      redirect: 'error', signal: AbortSignal.timeout(6000),
    })
    if (!response.ok) return false
    const session = await response.json()
    return session.id === id && session.object === 'checkout.session' && session.livemode === true
      && session.mode === 'payment' && session.status === 'complete' && session.payment_status === 'paid'
      && session.currency === 'eur' && Number.isSafeInteger(session.amount_total) && session.amount_total > 0
      && /^plink_[a-zA-Z0-9]+$/.test(session.payment_link) && allowed.has(session.payment_link)
  } catch {
    return false
  }
}
