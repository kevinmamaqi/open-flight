// Contact form: same-origin JSON, at most 8 KB, handed to the private openflight-contact
// Worker through the CONTACT service binding. Self-contained, because the production Pages
// project (root `docs`) bundles only the site folder: build_site.mjs copies this file to
// <site>/functions/api/contact.js. Without the binding the form reports that it is unavailable.
const LIMIT = 8192
const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' },
})
const sameOrigin = request => {
  const site = request.headers.get('Sec-Fetch-Site')
  return request.headers.get('Origin') === new URL(request.url).origin && (!site || site === 'same-origin')
}

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ ok: false }, 403)
  if (!env.CONTACT) return json({ ok: false, error: 'unavailable' }, 503)
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return json({ ok: false, error: 'invalid' }, 415)
  const body = await request.text()
  if (body.length > LIMIT) return json({ ok: false, error: 'invalid' }, 413)
  const response = await env.CONTACT.fetch('https://openflight-contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Visitor-IP': request.headers.get('CF-Connecting-IP') || 'unknown' },
    body,
  })
  return json(await response.json().catch(() => ({ ok: false })), response.status)
}
