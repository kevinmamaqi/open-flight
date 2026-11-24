import { countPayment, json, sameOrigin, serviceConfig, smallBody, utcDay, verifyCheckout } from '../../_flight-book.js'

export async function onRequestPost({ request, env }) {
  return confirmCheckout(request, env, fetch)
}

// Inject the Stripe fetch in local tests to exercise the real request handler.
export async function confirmCheckout(request, env, fetchStripe) {
  const config = serviceConfig(request, env)
  if (!sameOrigin(request) || !config.checkout) return json({ verified: false }, 404)
  const id = await smallBody(request, 170)
  if (id === null || !/^cs_live_[a-zA-Z0-9]{1,160}$/.test(id)) return json({ verified: false }, 400)
  if (!await verifyCheckout(id, env, fetchStripe)) return json({ verified: false })
  if (config.metrics) {
    try {
      await countPayment(env.FLIGHT_BOOK_DB, utcDay(), id)
    } catch { /* The Stripe verification remains valid if D1 is unavailable. */ }
  }
  return json({ verified: true })
}
