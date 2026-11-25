export const siteLocales = ['en', 'es', 'ru']
const words = (en, es, ru) => ({ en, es, ru })

export const siteLabels = {
  home: words('Workshop', 'Taller', 'Мастерская'),
  designs: words('Designs', 'Modelos', 'Модели'),
  butterflies: words('Paper butterflies', 'Mariposas de papel', 'Бумажные бабочки'),
  airplanes: words('Paper airplanes', 'Aviones de papel', 'Бумажные самолёты'),
  'flying-objects': words('Flying objects', 'Objetos voladores', 'Летающие модели'),
  'flight-book': words('Flight Book', 'Libro de vuelo', 'Книга полётов'),
  teachers: words('For teachers', 'Para docentes', 'Для учителей'),
  'motor-lab': words('Motor lab', 'Laboratorio de motores', 'Лаборатория мотора'),
  studio: words('Butterfly studio', 'Estudio de mariposas', 'Студия бабочек'),
  planes: words('Airplane studio', 'Estudio de aviones', 'Студия самолётов'),
  book: words('Book builder', 'Creador del libro', 'Редактор книги'),
  classroom: words('Classroom planner', 'Planificador de aula', 'Планировщик урока'),
  'flight-objects': words('Flying objects workshop', 'Taller de objetos voladores', 'Мастерская летающих моделей'),
  keel: words('Folded butterfly', 'Mariposa plegada', 'Складная бабочка'),
  costa: words('Experimental K2', 'K2 experimental', 'Экспериментальная K2'),
  motor: words('Motor workbench', 'Banco de motores', 'Стенд для мотора'),
  compare: words('Compare designs', 'Comparar modelos', 'Сравнить модели'),
  circuit: words('Flight circuit', 'Circuito de vuelo', 'Лётная трасса'),
  references: words('Sources and credits', 'Fuentes y créditos', 'Источники и авторы'),
  next: words('Next steps', 'Próximos pasos', 'Следующие шаги'),
  library: words('Print library', 'Biblioteca para imprimir', 'Библиотека для печати'),
  menu: words('Menu', 'Menú', 'Меню'),
  primary: words('Main navigation', 'Navegación principal', 'Главная навигация'),
  language: words('Language', 'Idioma', 'Язык'),
  breadcrumb: words('Breadcrumb', 'Ruta de navegación', 'Путь к странице'),
  skip: words('Skip to content', 'Ir al contenido', 'Перейти к содержанию'),
}
const toolParents = {
  studio: 'butterflies', keel: 'butterflies', costa: 'butterflies',
  planes: 'airplanes', 'flight-objects': 'flying-objects', book: 'flight-book',
  classroom: 'teachers', motor: 'motor-lab', compare: 'designs', circuit: 'airplanes',
}
const designFamilies = ['butterflies', 'airplanes', 'flying-objects']
const languages = { en: 'English', es: 'Español', ru: 'Русский' }
const primary = ['designs', 'flight-book', 'teachers']
const menu = [...designFamilies, 'flight-book', 'teachers', 'motor-lab', 'compare', 'circuit', 'library', 'references', 'next']
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
)

export function publicPath(route, lang) {
  if (route === 'home') return lang === 'en' ? '' : lang
  return (lang === 'en' ? '' : lang + '/') + route + '/'
}

export function navHref(id, lang, base) {
  const home = base + (lang === 'en' ? '' : lang + '.html')
  if (id === 'home') return home
  if (id === 'library') return home + '#library'
  if (id === 'circuit') return base + 'planes.html?view=flight&lang=' + lang
  if (Object.hasOwn(toolParents, id) || ['references', 'next'].includes(id))
    return base + id + '.html?lang=' + lang
  return base + publicPath(id, lang)
}

function navLink(id, lang, base, selected) {
  return '<a href="' + escapeHtml(navHref(id, lang, base)) + '"' +
    (id === selected ? ' aria-current="page"' : '') + '>' + siteLabels[id][lang] + '</a>'
}

export function navigationLinks(lang, base, page) {
  return {
    primary: primary.map(id => navLink(id, lang, base, page)).join(''),
    menu: menu.map(id => navLink(id, lang, base, page)).join(''),
  }
}

export function siteHeader(page, lang, base = './', route = null) {
  const links = navigationLinks(lang, base, page)
  const selector = siteLocales.map(locale => {
    const href = route ? base + publicPath(route, locale)
      : page === 'home' ? navHref('home', locale, base) : '?lang=' + locale
    return `<a id="${locale}" lang="${locale}" hreflang="${locale}" href="${href}"
      aria-label="${languages[locale]}"${locale === lang ? ' aria-current="true"' : ''}>${locale.toUpperCase()}</a>`
  }).join('')
  return `<div class="mast-in">
    <a class="wordmark" href="${navHref('home', lang, base)}"${page === 'home' ? ' aria-current="page"' : ''}><img src="${base}assets/brand/logo.svg" width="245" height="59" alt="Open Flight"></a>
    <nav class="primary-links" aria-label="${siteLabels.primary[lang]}">${links.primary}</nav>
    <details class="workshop-menu"><summary aria-label="${siteLabels.menu[lang]}"><span>${siteLabels.menu[lang]}</span></summary>
      <div class="workshop-links">${links.menu}</div>
    </details>
    <nav class="lang" aria-label="${siteLabels.language[lang]}">${selector}</nav>
  </div>`
}

export function toolTrail(page, lang, base = './') {
  const ids = ['home']
  const parent = toolParents[page]
  if (designFamilies.includes(parent)) ids.push('designs')
  if (parent) ids.push(parent)
  return [
    ...ids.map(id => ({ label: siteLabels[id][lang], href: navHref(id, lang, base) })),
    { label: siteLabels[page][lang] },
  ]
}

export function breadcrumbs(items, lang) {
  return '<nav class="breadcrumbs wrap" aria-label="' + siteLabels.breadcrumb[lang] + '"><ol>' +
    items.map(({ label, href }) => href
      ? '<li><a href="' + escapeHtml(href) + '">' + escapeHtml(label) + '</a></li>'
      : '<li aria-current="page">' + escapeHtml(label) + '</li>',
    ).join('') + '</ol></nav>'
}
