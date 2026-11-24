const locales = ['en', 'es', 'ru']
export function currentLocale() {
  const forced = new URLSearchParams(location.search).get('lang')
  const pathLang = location.pathname.match(/\/(es|ru)\.html$/)?.[1]
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
export function localizedLinks(lang) {
  for (const l of locales) {
    const a = document.getElementById(l)
    if (!a) continue
    const home = /\/(es|ru|atlas|index)\.html$/.test(location.pathname) || location.pathname.endsWith('/')
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
      const plane = page.pathname.endsWith('/planes.html')
      const butterfly = page.pathname.endsWith('/studio.html')
      const id = plane
        ? page.searchParams.get('model')
        : butterfly
          ? hash.get('design')?.replace(/^butterfly-/, '')
          : null
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
        './studio.html?lang=' + lang,
        './planes.html?lang=' + lang,
        compare,
        circuit,
        home + '#library',
        './references.html?lang=' + lang,
        './next.html?lang=' + lang,
      ]
      summary.textContent = labels[0]
      list.replaceChildren(
        ...urls.map((href, i) => {
          const a = document.createElement('a')
          a.href = href
          a.textContent = labels[i + 1]
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
