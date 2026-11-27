import { breadcrumbs, navHref, navigationLinks, siteHeader, siteLabels, siteLocales, toolTrail } from './site-navigation.js?v=eb901ca27c79'
import { movedPage, previousHome, workshopHome } from './assets/workshop-address.js?v=eb901ca27c79'

if (location.href.startsWith(previousHome)) {
  let keepPrevious = new URLSearchParams(location.search).get('previous') === '1'
  try {
    if (keepPrevious) sessionStorage.setItem('open-flight-previous-site', '1')
    else keepPrevious = sessionStorage.getItem('open-flight-previous-site') === '1'
  } catch {}
  const destination = !keepPrevious && movedPage(location.href)
  if (destination) {
    // Keep old links usable while DNS or TLS is still propagating.
    fetch(new URL('assets/atlas/print-catalog.json', workshopHome), {
      method: 'HEAD', credentials: 'omit', referrerPolicy: 'no-referrer',
    }).then(response => {
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) location.replace(destination)
    }).catch(() => {})
  }
}

const locales = siteLocales
export const languageInPath = path => path.match(/\/(es|ru)(?:\.html)?$/)?.[1]
export function currentLocale() {
  const forced = new URLSearchParams(location.search).get('lang')
  const pathLang = languageInPath(location.pathname)
  let saved
  try {
    saved = sessionStorage.getItem('open-flight-language')
  } catch {}
  const defaultHome = mast?.dataset.sitePage === 'home' ? 'en' : undefined
  const lang = [forced, pathLang, defaultHome, saved].find((v) => locales.includes(v)) || 'en'
  try {
    sessionStorage.setItem('open-flight-language', lang)
  } catch {}
  return lang
}
export const homeURL = (lang) => navHref('home', lang, './')
// Pages that keep unsaved work in memory (the studios) switch language in place:
// the links stay real links, and a plain click calls onSelect instead of reloading.
export function languageSwitch(onSelect) {
  for (const l of locales) {
    document.getElementById(l)?.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return
      e.preventDefault()
      onSelect(l)
    })
  }
}
export function localizedLinks(lang) {
  refreshNavigation(lang)
  for (const l of locales) {
    const a = document.getElementById(l)
    if (!a) continue
    const home = mast?.dataset.sitePage === 'home'
    const url = new URL(home ? homeURL(l) : location.href, location.href)
    if (!home) url.searchParams.set('lang', l)
    url.hash = location.hash
    a.href = url.href
    if (l === lang) a.setAttribute('aria-current', 'true')
    else a.removeAttribute('aria-current')
  }
}
const mast = document.querySelector('[data-site-page]')
if (mast && !mast.firstElementChild) mast.innerHTML = siteHeader(mast.dataset.sitePage, currentLocale())

function refreshNavigation(lang) {
  if (!mast) return
  const page = mast.dataset.sitePage
  const menu = mast.querySelector('.workshop-menu')
  const current = new URL(location.href)
  const circuit = page === 'planes' && current.searchParams.get('view') === 'flight'
  const nav = navigationLinks(lang, './', circuit ? 'circuit' : page)
  const primary = mast.querySelector('.primary-links')
  const list = menu.querySelector('.workshop-links')
  if (mast.dataset.navLocale !== lang || mast.dataset.navView !== String(circuit)) {
    mast.dataset.navLocale = lang
    mast.dataset.navView = String(circuit)
    primary.innerHTML = nav.primary
    list.innerHTML = nav.menu
    primary.setAttribute('aria-label', siteLabels.primary[lang])
    mast.querySelector('.lang').setAttribute('aria-label', siteLabels.language[lang])
    menu.querySelector('summary').setAttribute('aria-label', siteLabels.menu[lang])
    menu.querySelector('summary span').textContent = siteLabels.menu[lang]
    mast.querySelector('.wordmark').href = homeURL(lang)
    const trail = document.querySelector('[data-site-trail]')
    if (trail) trail.innerHTML = breadcrumbs(toolTrail(circuit ? 'circuit' : page, lang), lang)
    const skip = document.querySelector('[data-site-skip]')
    if (skip) skip.textContent = siteLabels.skip[lang]
  }

  const hash = new URLSearchParams(current.hash.slice(1))
  const id = page === 'planes' ? current.searchParams.get('model')
    : page === 'studio' ? current.searchParams.get('species') || hash.get('design')?.replace(/^butterfly-/, '')
    : ['keel', 'costa'].includes(page) ? current.searchParams.get('species') || 'monarch' : null
  // Compare and the circuit now live in chapter 7; keep their links in step when a page shows them.
  const compare = list.querySelector('a[href*="compare.html"]')
  if (compare) compare.href = navHref('compare', lang, './') +
    (id ? '&left=' + encodeURIComponent(id) + '&right=' + (id === 'morpho' ? 'monarch' : 'morpho') : '')
  const circuitLink = list.querySelector('a[href*="view=flight"]')
  if (circuitLink && (page === 'planes' || page === 'studio')) {
    current.searchParams.set('lang', lang)
    current.searchParams.set('view', 'flight')
    circuitLink.href = current.href
  }
}

const menu = mast?.querySelector('.workshop-menu')
if (menu) {
  menu.addEventListener('toggle', () => {
    if (menu.open) refreshNavigation(document.documentElement.lang)
  })
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) || event.target.closest('.workshop-links a')) menu.open = false
  })
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.open) return
    menu.open = false
    menu.querySelector('summary').focus()
  })
}

// Print-at-actual-size reminder: every [data-print-reminder] beside a download, in the page language.
const reminderCopy = {
  en: ['Print at 100% (Actual size).', 'Turn off “Fit to page”. The line marked 50 mm on the sheet should measure 50 mm.'],
  es: ['Imprime al 100 % (Tamaño real).', 'Desactiva «Ajustar a la página». La línea marcada 50 mm debe medir 50 mm.'],
  ru: ['Печатайте в масштабе 100% («Фактический размер»).', 'Отключите «По размеру страницы». Линия «50 мм» на листе должна быть ровно 50 мм.'],
}
const reminders = document.querySelectorAll('[data-print-reminder]')
for (const el of document.querySelectorAll('[data-print-calibration] span')) {
  const fill = () => {
    const lang = locales.includes(document.documentElement.lang) ? document.documentElement.lang : currentLocale()
    el.textContent = (lang === 'ru' ? '50 мм · ' : '50 mm · ') + reminderCopy[lang][0]
  }
  fill()
  new MutationObserver(fill).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
}
if (reminders.length) {
  const fill = () => {
    const lang = locales.includes(document.documentElement.lang) ? document.documentElement.lang : currentLocale()
    const [title, body] = reminderCopy[lang]
    for (const el of reminders) {
      const strong = document.createElement('strong')
      strong.textContent = title
      el.replaceChildren(strong, document.createTextNode(body))
    }
  }
  fill()
  new MutationObserver(fill).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
}
