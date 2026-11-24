import { loadBookServices } from './book-support.js?v=703c9111bd20'

export async function recordBookEvent(kind) {
  if (!['home', 'book', 'download'].includes(kind)) return
  const config = await loadBookServices()
  if (!config.metrics) return
  try {
    await fetch('/api/flight-book/event', {
      method: 'POST', body: kind, credentials: 'omit', keepalive: true,
      redirect: 'error', referrerPolicy: 'no-referrer',
    })
  } catch { /* An unavailable counter leaves the book flow working. */ }
}
