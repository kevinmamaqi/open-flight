// Sends the contact form, with its Cloudflare Turnstile token, as JSON to /api/contact and
// reports the result in place.
const form = document.getElementById('contact-form')
if (form) {
  const opened = Date.now()
  const status = form.querySelector('.contact-status')
  const button = form.querySelector('button[type="submit"]')
  const say = text => { status.textContent = text }
  const resetCheck = () => globalThis.turnstile?.reset?.(form.querySelector('.cf-turnstile'))
  form.addEventListener('submit', async event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(form))
    const emailOk = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(String(data.email).trim())
    form.querySelector('#contact-email').setAttribute('aria-invalid', String(!emailOk))
    if (!String(data.name).trim() || !emailOk || String(data.message).trim().length < 10) return say(form.dataset.invalid)
    if (!data['cf-turnstile-response']) return say(form.dataset.challenge)
    button.disabled = true
    say(form.dataset.sending)
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsed: Date.now() - opened }),
      })
      const result = await response.json().catch(() => ({}))
      if (response.ok && result.ok) {
        form.reset()
        say(form.dataset.sent)
      } else if (result.error === 'invalid') {
        say(form.dataset.invalid)
      } else if (result.error === 'challenge') {
        say(form.dataset.challenge)
      } else {
        say(form.dataset.failed)
      }
    } catch {
      say(form.dataset.failed)
    } finally {
      // A Turnstile token is single-use.
      resetCheck()
      button.disabled = false
    }
  })
}
