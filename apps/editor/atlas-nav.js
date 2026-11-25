import { movedPage, previousHome, workshopHome } from './assets/workshop-address.js'

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

const locales = ['en', 'es', 'ru']
export const languageInPath = path => path.match(/\/(es|ru)(?:\.html)?$/)?.[1]
export function currentLocale() {
  const forced = new URLSearchParams(location.search).get('lang')
  const pathLang = languageInPath(location.pathname)
  let saved
  try {
    saved = sessionStorage.getItem('open-flight-language')
  } catch {}
  const lang = [forced, pathLang, saved].find((v) => locales.includes(v)) || 'en'
  try {
    sessionStorage.setItem('open-flight-language', lang)
  } catch {}
  return lang
}
export const homeURL = (l) => (l === 'en' ? './?lang=en' : './' + l + '.html')
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
  for (const l of locales) {
    const a = document.getElementById(l)
    if (!a) continue
    const home = /\/(es|ru|atlas|index)(?:\.html)?$/.test(location.pathname) || location.pathname.endsWith('/')
    const url = new URL(home ? homeURL(l) : location.href, location.href)
    if (!home) url.searchParams.set('lang', l)
    url.hash = location.hash
    a.href = url.href
    if (l === lang) a.setAttribute('aria-current', 'true')
    else a.removeAttribute('aria-current')
  }
}
const menuCopy = {
  en: [
    'Menu',
    'Workshop',
    'Build a butterfly',
    'Fold an airplane',
    'Compare designs',
    'Flight circuit',
    'Print library',
    'Field references',
    'Next steps',
    'Flight Book',
    'Motor lab',
    'Flying objects',
  ],
  es: [
    'Menú',
    'Taller',
    'Construir una mariposa',
    'Plegar un avión',
    'Comparar diseños',
    'Circuito de vuelo',
    'Biblioteca para imprimir',
    'Fuentes y créditos',
    'Próximos pasos',
    'Libro de vuelo',
    'Laboratorio de motores',
    'Objetos voladores',
  ],
  ru: [
    'Меню',
    'Мастерская',
    'Сделать бабочку',
    'Сложить самолёт',
    'Сравнить модели',
    'Лётная трасса',
    'Для печати',
    'Источники',
    'Следующие шаги',
    'Книга полётов',
    'Лаборатория мотора',
    'Летающие модели',
  ],
}
const markers = document.querySelectorAll('[data-workshop-menu]')
if (markers.length) {
  for (const holder of markers) {
    const details = document.createElement('details'),
      summary = document.createElement('summary'),
      list = document.createElement('div')
    details.className = 'workshop-menu'
    list.className = 'workshop-links'
    function refresh() {
      const lang = locales.includes(document.documentElement.lang)
        ? document.documentElement.lang
        : currentLocale()
      const labels = menuCopy[lang],
        home = homeURL(lang),
        page = new URL(location.href),
        hash = new URLSearchParams(page.hash.slice(1))
      const path = page.pathname.replace(/\.html$/, '')
      const plane = path.endsWith('/planes')
      const butterfly = path.endsWith('/studio')
      const folded = path.endsWith('/keel')
      const id = plane
        ? page.searchParams.get('model')
        : butterfly
          ? page.searchParams.get('species') || hash.get('design')?.replace(/^butterfly-/, '')
          : folded ? page.searchParams.get('species') || 'monarch' : null
      const compare =
        './compare.html?lang=' +
        lang +
        (id ? '&left=' + encodeURIComponent(id) + '&right=' + (id === 'morpho' ? 'monarch' : 'morpho') : '')
      let circuit = './planes.html?model=boeing-747&view=flight&lang=' + lang
      if (plane || butterfly) {
        page.searchParams.set('lang', lang)
        page.searchParams.set('view', 'flight')
        circuit = page.href
      }
      const urls = [
        home,
        './studio.html?lang=' + lang + '#design=butterfly-monarch&revision=w1',
        './planes.html?lang=' + lang,
        compare,
        circuit,
        home + '#library',
        './references.html?lang=' + lang,
        './next.html?lang=' + lang,
        './book.html?lang=' + lang,
        './motor.html?lang=' + lang,
        './flight-objects.html?lang=' + lang,
      ]
      const label = document.createElement('span')
      label.textContent = labels[0]
      summary.replaceChildren(label)
      summary.setAttribute('aria-label', labels[0])
      list.replaceChildren(
        ...urls.map((href, i) => {
          const a = document.createElement('a')
          a.href = href
          a.textContent = labels[i + 1]
          const here = new URL(href, location.href)
          const now = new URL(location.href)
          if (i > 0 && here.pathname === now.pathname && here.searchParams.get('view') === now.searchParams.get('view')) a.setAttribute('aria-current', 'page')
          return a
        }),
      )
    }
    refresh()
    details.addEventListener('toggle', () => {
      if (details.open) refresh()
    })
    new MutationObserver(refresh).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    })
    details.append(summary, list)
    holder.append(details)
    document.addEventListener('click', (e) => {
      if (!details.contains(e.target)) details.open = false
    })
    details.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        details.open = false
        summary.focus()
      }
    })
    list.addEventListener('click', () => {
      details.open = false
    })
  }
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
