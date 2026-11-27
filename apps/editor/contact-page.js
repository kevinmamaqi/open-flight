// Sends the contact form as JSON to /api/contact and reports the result in place.
const form = document.getElementById('contact-form')
if (form) {
  const opened = Date.now()
  const status = form.querySelector('.contact-status')
  const button = form.querySelector('button[type="submit"]')
  const say = (text, mail) => {
    status.textContent = text
    if (mail) {
      const link = document.createElement('a')
      link.href = 'mailto:' + form.dataset.address
      link.textContent = form.dataset.address
      status.append(' ', link)
    }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(form))
    const emailOk = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(String(data.email).trim())
    form.querySelector('#contact-email').setAttribute('aria-invalid', String(!emailOk))
    if (!String(data.name).trim() || !emailOk || String(data.message).trim().length < 10) return say(form.dataset.invalid)
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
      } else {
        say(form.dataset.failed, true)
      }
    } catch {
      say(form.dataset.failed, true)
    } finally {
      button.disabled = false
    }
  })
}
