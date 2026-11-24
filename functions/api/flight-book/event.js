import { countEvent, json, sameOrigin, serviceConfig, smallBody, utcDay } from '../../_flight-book.js'

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request) || !serviceConfig(request, env).metrics) return json({}, 404)
  const kind = await smallBody(request, 16)
  if (!['home', 'book', 'download'].includes(kind)) return json({}, 400)
  try {
    await countEvent(env.FLIGHT_BOOK_DB, utcDay(), kind)
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return json({}, 503)
  }
}
