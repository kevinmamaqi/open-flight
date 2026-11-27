import { appendix, chapterLabel, chapters } from './book/catalog.js'

export const siteLocales = ['en', 'es', 'ru']
const words = (en, es, ru) => ({ en, es, ru })
const chapter = id => chapters.find(item => item.id === id)

export const siteLabels = {
  // The site is the book's free web edition. The root is the brand, not "Workshop".
  home: words('Open Flight', 'Open Flight', 'Open Flight'),
  contents: words('Contents', 'Índice', 'Содержание'),
  print: appendix.find(item => item.id === 'print').title,
  printShort: words('Print & Play', 'Imprime y vuela', 'Печать'),
  'flight-book': words('The book', 'El libro', 'Книга'),
  teachers: words('For teachers', 'Para docentes', 'Для учителей'),
  contact: words('Contact', 'Contacto', 'Контакты'),
  'how-it-flies': chapter('how-it-flies').title,
  airplanes: chapter('airplanes').title,
  butterflies: chapter('butterflies').title,
  'flying-objects': chapter('flying-objects').title,
  contests: chapter('contests').title,
  experiments: chapter('experiments').title,
  'motor-lab': appendix.find(item => item.id === 'motor-lab').title,
  references: words('Sources and credits', 'Fuentes y créditos', 'Источники и авторы'),
  // Labs and tools, linked from the plates and chapters rather than the header.
  designs: words('Contents', 'Índice', 'Содержание'),
  studio: words('Earlier fold: rear tabs', 'Pliegue anterior: aletas traseras', 'Ранний вариант: задние язычки'),
  keel: words('Earlier fold: pinched spine', 'Pliegue anterior: lomo pinzado', 'Ранний вариант: сжатый корпус'),
  costa: words('Butterfly lab', 'Laboratorio de mariposas', 'Лаборатория бабочек'),
  planes: words('Airplane lab', 'Laboratorio de aviones', 'Лаборатория самолётов'),
  book: words('Make a booklet', 'Crea un cuadernillo', 'Собрать буклет'),
  classroom: words('Classroom planner', 'Planificador de aula', 'Планировщик урока'),
  'flight-objects': words('Flying objects studio', 'Estudio de objetos voladores', 'Студия летающих моделей'),
  motor: words('Motor workbench', 'Banco de motores', 'Стенд для мотора'),
  compare: words('Compare two designs', 'Comparar dos modelos', 'Сравнить две модели'),
  circuit: words('Flight circuit on screen', 'Circuito de vuelo en pantalla', 'Лётная трасса на экране'),
  next: words('Next steps', 'Próximos pasos', 'Следующие шаги'),
  library: words('Print & Play', 'Imprime y vuela', 'Распечатать и запустить'),
  menu: words('Contents', 'Índice', 'Содержание'),
  chapters: words('Chapters', 'Capítulos', 'Главы'),
  more: words('Print, read and teach', 'Imprimir, leer y enseñar', 'Печать, чтение и уроки'),
  primary: words('Main navigation', 'Navegación principal', 'Главная навигация'),
  language: words('Language', 'Idioma', 'Язык'),
  breadcrumb: words('Breadcrumb', 'Ruta de navegación', 'Путь к странице'),
  skip: words('Skip to content', 'Ir al contenido', 'Перейти к содержанию'),
  footer: words('Free to read and print at home and in class. No account.', 'Gratis para leer e imprimir en casa y en el aula. Sin cuenta.', 'Бесплатно читать и печатать дома и в классе. Без регистрации.'),
  source: words('Source code', 'Código fuente', 'Исходный код'),
  feedback: words('Share a flight observation', 'Comparte una observación de vuelo', 'Поделиться наблюдением'),
}

// Every tool and lab belongs to a chapter or an appendix page.
const toolParents = {
  studio: 'butterflies', keel: 'butterflies', costa: 'butterflies',
  planes: 'airplanes', 'flight-objects': 'flying-objects',
  compare: 'experiments', circuit: 'experiments',
  book: 'print', classroom: 'teachers', motor: 'motor-lab', next: 'motor-lab',
}
const chapterRoutes = ['how-it-flies', 'nature', 'airplanes', 'butterflies', 'flying-objects', 'history', 'space', 'contests', 'experiments']
const languages = { en: 'English', es: 'Español', ru: 'Русский' }
const primary = ['print', 'teachers', 'flight-book']
const menuMore = ['print', 'flight-book', 'teachers', 'references', 'motor-lab', 'contact']

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
)

export function publicPath(route, lang) {
  if (route === 'home') return lang === 'en' ? '' : lang
  return (lang === 'en' ? '' : lang + '/') + route + '/'
}

/** The label a reader sees for a page: chapters carry their number. */
export function pageLabel(id, lang) {
  const item = chapter(id)
  return item && chapterRoutes.includes(id) ? chapterLabel(item, lang) : siteLabels[id][lang]
}

export function navHref(id, lang, base) {
  const home = base + (lang === 'en' ? '' : lang + '.html')
  if (id === 'home') return home
  if (id === 'contents' || id === 'designs') return home + '#contents'
  if (id === 'library') return base + publicPath('print', lang)
  if (id === 'circuit') return base + 'planes.html?view=flight&lang=' + lang
  if (Object.hasOwn(toolParents, id) || id === 'references')
    return base + id + '.html?lang=' + lang
  return base + publicPath(id, lang)
}

function navLink(id, lang, base, selected, label = pageLabel(id, lang)) {
  return '<a href="' + escapeHtml(navHref(id, lang, base)) + '"' +
    (id === selected ? ' aria-current="page"' : '') + '>' + escapeHtml(label) + '</a>'
}

export function navigationLinks(lang, base, page) {
  const current = toolParents[page] ?? page
  return {
    primary: primary.map(id => navLink(id, lang, base, current, id === 'print' ? siteLabels.printShort[lang] : undefined)).join(''),
    menu: '<p class="menu-group">' + siteLabels.chapters[lang] + '</p>' +
      chapterRoutes.map(id => navLink(id, lang, base, current)).join('') +
      '<p class="menu-group">' + siteLabels.more[lang] + '</p>' +
      menuMore.map(id => navLink(id, lang, base, current)).join(''),
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

/** Breadcrumb items for a tool page: Open Flight › chapter or appendix page › tool. */
export function toolTrail(page, lang, base = './') {
  const parent = toolParents[page]
  return [
    { label: siteLabels.home[lang], href: navHref('home', lang, base) },
    ...(parent ? [{ label: pageLabel(parent, lang), href: navHref(parent, lang, base) }] : []),
    { label: pageLabel(page, lang) },
  ]
}

export function breadcrumbs(items, lang) {
  return '<nav class="breadcrumbs wrap" aria-label="' + siteLabels.breadcrumb[lang] + '"><ol>' +
    items.map(({ label, href }) => href
      ? '<li><a href="' + escapeHtml(href) + '">' + escapeHtml(label) + '</a></li>'
      : '<li aria-current="page">' + escapeHtml(label) + '</li>',
    ).join('') + '</ol></nav>'
}

export function siteFooter(lang, base = './') {
  const repository = 'https://github.com/kevinmamaqi/open-flight'
  const link = (href, label) => '<a href="' + escapeHtml(href) + '">' + escapeHtml(label) + '</a>'
  return '<a class="wordmark" href="' + escapeHtml(navHref('home', lang, base)) + '"><img src="' + base +
    'assets/brand/logo.svg" width="245" height="59" alt="Open Flight"></a>' +
    '<span>' + siteLabels.footer[lang] + '</span>' +
    link(navHref('print', lang, base), siteLabels.print[lang]) +
    link(navHref('flight-book', lang, base), siteLabels['flight-book'][lang]) +
    link(navHref('teachers', lang, base), siteLabels.teachers[lang]) +
    link(navHref('references', lang, base), siteLabels.references[lang]) +
    link(navHref('contact', lang, base), siteLabels.contact[lang]) +
    link(repository, siteLabels.source[lang] + ' ↗') +
    link(repository + '/issues/new?template=flight-report.yml', siteLabels.feedback[lang] + ' ↗')
}
