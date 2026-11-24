const inactive = Object.freeze({ origin: null, links: Object.freeze({}), checkout: false, metrics: false })
const choices = [3, 5, 10, 'other']
let configuration = inactive
let loading

function httpsURL(value) {
  if (typeof value !== 'string' || !value || value.length > 2048) return null
  try {
    const url = new URL(value)
    const host = url.hostname
    if (url.protocol === 'https:' && !url.port && !url.username && !url.password &&
        /\.[a-z\d-]*[a-z][a-z\d-]*$/i.test(host) &&
        !/(^|\.)(github\.io|localhost|local|home\.arpa)$/.test(host)) return url
  } catch { /* Leave malformed URLs disabled. */ }
  return null
}

export function eligibleBookServices(at, config) {
  const page = httpsURL(at?.href ?? at)
  const origin = httpsURL(config?.origin)
  return Boolean(page && origin && config.origin === origin.origin && page.origin === origin.origin)
}

export function loadBookServices() {
  const at = globalThis.location
  if (!httpsURL(at?.href)) return Promise.resolve(inactive)
  loading ??= fetch(new URL('./assets/book/services.json', import.meta.url), {
    credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer', cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  }).then(async response => {
    if (response.ok) {
      const config = await response.json()
      if (eligibleBookServices(at, config)) configuration = config
    }
    return configuration
  }).catch(() => inactive)
  return loading
}

export function supportChoices(at = globalThis.location, config = configuration) {
  const links = new Map()
  if (eligibleBookServices(at, config)) for (const amount of choices) {
    const url = httpsURL(config.links?.[amount])
    if (url) links.set(amount, url.href)
  }
  return {
    amounts: [0, ...links.keys()],
    suggested: links.has(5) ? 5 : 0,
    linkFor: amount => links.get(amount) ?? null,
  }
}

// Compatibility for the former static book page.
export function bookSupport() {
  return { url: null, suggestedEUR: 5 }
}

export async function recoverBookCheckout() {
  const at = globalThis.location
  if (!at?.href) return false
  const url = new URL(at.href)
  if (!url.searchParams.has('paid')) return false
  const tokens = url.searchParams.getAll('paid')
  url.searchParams.delete('paid')
  // Remove the return token before any asynchronous work or sharing.
  globalThis.history.replaceState(globalThis.history.state, '', url)
  if (tokens.length !== 1 || !/^cs_live_[a-zA-Z0-9]{1,160}$/.test(tokens[0])) return false
  const config = await loadBookServices()
  if (!config.checkout) return false
  try {
    const response = await fetch('/api/flight-book/confirm', {
      method: 'POST', body: tokens[0], credentials: 'omit',
      redirect: 'error', referrerPolicy: 'no-referrer', cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    return response.ok && (await response.json()).verified === true
  } catch {
    return false
  }
}
