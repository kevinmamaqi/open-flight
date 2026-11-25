import { book, chapterById, chapterLabel, chapters, plateFor, plates } from './book/catalog.js'
import { fieldModel } from './atlas-guide.js'
import { specimenPath } from './model-appearance.js'
import { workshopHome } from './assets/workshop-address.js'
import { plateMarkup } from './plate.js'
import { chapterBody as writtenChapter } from './book/render-chapter.js'
import { breadcrumbs, escapeHtml as e, navHref, pageLabel, publicPath, siteFooter, siteHeader, siteLabels, siteLocales } from './site-navigation.js'

const w = (en, es, ru) => ({ en, es, ru })
const copy = {
  print: w('Print & Play', 'Imprime y vuela', 'Распечатать и запустить'),
  printChapter: w(
    'Print one design from this chapter, or a set of up to three. One PDF, ready for A4 or US Letter.',
    'Imprime un modelo de este capítulo o un juego de hasta tres. Un solo PDF, listo para A4 o Carta.',
    'Распечатайте одну модель из этой главы или набор до трёх. Один PDF для A4 или US Letter.',
  ),
  plates: w('Plates', 'Láminas', 'Таблицы'),
  chapter: w('Chapter', 'Capítulo', 'Глава'),
  previous: w('Previous chapter', 'Capítulo anterior', 'Предыдущая глава'),
  next: w('Next chapter', 'Capítulo siguiente', 'Следующая глава'),
  contents: w('Contents', 'Índice', 'Содержание'),
}

// The opening paragraphs of the three design chapters.
const chapterIntros = {
  airplanes: [
    w('Each airplane folds from one rectangular sheet. The folds decide where the paper’s weight sits and how the wings meet the air.',
      'Cada avión se pliega a partir de una hoja rectangular. Los pliegues deciden dónde queda el peso del papel y cómo encuentran las alas el aire.',
      'Каждый самолёт складывается из одного прямоугольного листа. Сгибы решают, где окажется вес бумаги и как крылья встретят воздух.'),
    w('Upper Deck and Prairie Skipper are built to glide slowly, Tailwind to fly straight and steady, and Delta Comet is the classic dart. None has a recorded test flight yet: each plate says what to expect and what to try.',
      'Dos pisos y Planeador de la pradera están hechos para planear despacio, Viento de cola para volar recto y estable, y Cometa delta es el dardo clásico. Ninguno tiene todavía un vuelo de prueba registrado: cada lámina dice qué esperar y qué probar.',
      '«Две палубы» и «Луговой планёр» созданы для медленного планирования, «Попутный ветер» — для ровного прямого полёта, а «Дельта-комета» — классический дротик. Ни у одного пока нет записанного испытательного полёта: на каждой таблице сказано, чего ожидать и что попробовать.'),
  ],
  butterflies: [
    w('Real butterflies flap, twist and glide. A paper butterfly can only glide, so it must balance like a flying wing.',
      'Las mariposas de verdad aletean, se retuercen y planean. Una mariposa de papel solo puede planear, así que tiene que equilibrarse como un ala volante.',
      'Настоящие бабочки машут крыльями, изгибают их и планируют. Бумажная бабочка может только планировать, поэтому она должна балансировать, как летающее крыло.'),
    w('These are experimental gliders, our second attempt. Build one, balance it on the dots and tell us how it flies.',
      'Son planeadores experimentales, nuestro segundo intento. Construye uno, equilíbralo sobre los puntos y cuéntanos cómo vuela.',
      'Это экспериментальные планёры, наша вторая попытка. Соберите один, уравновесьте его на точках и расскажите, как он летает.'),
  ],
  'flying-objects': [
    w('Three classic experiments: a ring that flies like a shuttlecock, a seed that spins as it falls, and a two-winged glider from a 1918 book.',
      'Tres experimentos clásicos: un anillo que vuela como un volante de bádminton, una semilla que gira al caer y un planeador de dos alas de un libro de 1918.',
      'Три классических опыта: кольцо, которое летит как волан, семя, которое вращается при падении, и двукрылый планёр из книги 1918 года.'),
  ],
}

const products = {
  designs: { redirect: true },
  'flight-book': {
    description: w(
      'The printed edition of One Sheet: its chapters, format and status. Everything in it that you can fold is free to print today.',
      'La edición impresa de Una hoja: sus capítulos, formato y estado. Todo lo que se puede plegar ya se puede imprimir gratis.',
      'Печатное издание книги «Один лист»: главы, формат и состояние работы. Всё, что в ней можно сложить, уже сейчас можно бесплатно распечатать.',
    ),
  },
  teachers: {
    image: lang => 'assets/atlas/book-log-' + lang + '.png', tool: 'classroom',
    action: w('Plan classroom copies', 'Planifica las copias para el aula', 'Рассчитать тираж для класса'),
    description: w(
      'Plan a paper-flight lesson for your class. Choose a team size and paper format, calculate the copies you need, and give teams a simple test to run together.',
      'Prepara una clase de vuelo en papel. Elige cuántos alumnos habrá en cada equipo y el formato de papel, calcula las copias y asigna a los equipos una prueba sencilla.',
      'Подготовьте урок о полёте бумажных моделей. Выберите размер команды и формат бумаги, рассчитайте количество копий и предложите командам простой опыт.',
    ),
    links: [
      [w('Open the printable lesson', 'Abre la ficha para imprimir', 'Открыть задание для печати'), lang => 'library/family-lesson-' + lang + '.html'],
      [copy.print, lang => publicPath('print', lang)],
    ],
  },
  'motor-lab': {
    image: 'assets/motor/saddle-illustration.svg', tool: 'motor',
    action: w('Open the motor workbench', 'Abre el banco de motores', 'Открыть стенд для мотора'),
    description: w(
      'Explore a removable motor mount and a button-to-LED bench experiment with someone who has worked with electronics before. The workbench contains the fit drawing, firmware and trial log. Powered flight is untested.',
      'Explora, con alguien que ya haya trabajado con electrónica, un soporte de motor desmontable y una prueba de banco con pulsador y LED. Consulta el plano, el firmware y el registro de ensayos. El vuelo con motor sigue sin probarse.',
      'Вместе с тем, кто уже работал с электроникой, изучите съёмное крепление мотора и опыт с кнопкой и светодиодом. На стенде есть чертёж, прошивка и журнал испытаний. Полёт с мотором ещё не проверен.',
    ),
    links: [
      [w('Print the mount drawing (A4)', 'Imprime el plano del soporte (A4)', 'Распечатать чертёж крепления (A4)'), () => 'assets/motor/OF-M0-r1-A4.pdf'],
      [siteLabels.next, lang => 'next.html?lang=' + lang],
    ],
  },
}
const familyChapters = chapters.filter(chapter => chapter.family).map(chapter => chapter.id)
// Chapters written as text (How flight works, Contests and records, The flight lab).
const textChapters = chapters.filter(chapter => chapter.route && !chapter.family).map(chapter => chapter.id)
export const productRoutes = [
  ...Object.keys(products),
  ...familyChapters,
  ...textChapters,
  ...plates.map(plate => plate.chapter + '/' + plate.model),
]
/** Routes that belong in the sitemap: redirects are left out. */
export const sitemapRoutes = productRoutes.filter(route => !products[route]?.redirect)

const absolute = (route, lang) => workshopHome + publicPath(route, lang)
const ogLocale = { en: 'en_US', es: 'es_ES', ru: 'ru_RU' }
const link = (href, label, cls = '') => `<a href="${e(href)}"${cls ? ' class="' + cls + '"' : ''}>${e(label)}</a>`

export function languageAlternates(route) {
  return [...siteLocales.map(lang => [lang, absolute(route, lang)]), ['x-default', absolute(route, 'en')]]
}

function head(route, lang, title, description, trail) {
  const itemListElement = trail.map(({ label, route }, index) => ({
    '@type': 'ListItem', position: index + 1, name: label, item: absolute(route, lang),
  }))
  const structured = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement }
  return `<title>${e(title)}</title>
  <meta name="description" content="${e(description)}">
  <link rel="canonical" href="${absolute(route, lang)}">
  ${languageAlternates(route).map(([locale, href]) => `<link rel="alternate" hreflang="${locale}" href="${href}">`).join('\n  ')}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Open Flight">
  <meta property="og:locale" content="${ogLocale[lang]}">
  ${siteLocales.filter(locale => locale !== lang).map(locale => `<meta property="og:locale:alternate" content="${ogLocale[locale]}">`).join('\n  ')}
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:url" content="${absolute(route, lang)}">
  <meta property="og:image" content="${workshopHome + 'assets/brand/social-' + lang + '.png'}">
  <meta property="og:image:alt" content="Open Flight">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>`
}

function plateCard(plate, lang, base) {
  const model = fieldModel(plate.model, lang)
  return `<li><a class="plate-card panel" href="${e(base + publicPath(plate.chapter + '/' + plate.model, lang))}">
    <span class="plate-card-art stage-grid"><img src="${base}${e(specimenPath(plate.model))}" alt="" loading="lazy" decoding="async"></span>
    <span class="plate-card-copy"><small>${plate.id}</small><strong>${e(model.name)}</strong>
    <span>${e(plate.lineage[lang])}</span>
    <span class="plate-badges"><span class="chip">${e(plate.kind[lang])}</span><span class="chip chip-evidence">${e(plate.evidence[lang])}</span></span></span>
  </a></li>`
}

function chapterPager(chapter, lang, base) {
  const routed = chapters.filter(item => item.route)
  const index = routed.findIndex(item => item.id === chapter.id)
  const side = (item, label) => item
    ? `<a href="${e(base + publicPath(item.route, lang))}"><small>${label}</small> ${e(chapterLabel(item, lang))}</a>` : '<span></span>'
  return `<nav class="plate-pager" aria-label="${copy.contents[lang]}">${side(routed[index - 1], copy.previous[lang])}${side(routed[index + 1], copy.next[lang])}</nav>`
}

function chapterBody(chapter, lang, base) {
  return `<header class="chapter-head">
    <p class="eyebrow">${copy.chapter[lang]} ${chapter.n}</p>
    <h1>${e(chapter.title[lang])}</h1>
    <p class="lede">${e(chapter.standfirst[lang])}</p>
    ${(chapterIntros[chapter.id] ?? []).map(p => '<p>' + e(p[lang]) + '</p>').join('')}
  </header>
  <section aria-labelledby="plates-title"><h2 id="plates-title" class="sr-only">${copy.plates[lang]}</h2>
    <ol class="plate-list">${chapter.plates.map(id => plateCard(plates.find(plate => plate.id === id), lang, base)).join('')}</ol></section>
  <aside class="chapter-print panel"><div><h2>${copy.print[lang]}</h2><p>${copy.printChapter[lang]}</p></div>
    ${link(base + publicPath('print', lang), copy.print[lang], 'button primary')}</aside>
  ${chapterPager(chapter, lang, base)}`
}

const bookWords = {
  status: w('The book · in preparation', 'El libro · en preparación', 'Книга · готовится'),
  read: w('Read the free web edition', 'Lee la edición digital gratuita', 'Читать бесплатное веб-издание'),
  inside: w('What will be inside', 'Qué habrá dentro', 'Что будет внутри'),
  edition: w('The edition', 'La edición', 'Издание'),
  facts: [
    [w('Format', 'Formato', 'Формат'), w('210 × 279 mm. It also prints at 100% on A4 and US Letter.', '210 × 279 mm. También se imprime al 100 % en A4 y Carta.', '210 × 279 мм. Печатается в масштабе 100% на A4 и US Letter.')],
    [w('Pages', 'Páginas', 'Страницы'), w('About 160, sewn', 'Unas 160, cosidas', 'Около 160, шитый переплёт')],
    [w('Languages', 'Idiomas', 'Языки'), w('English, Spanish and Russian', 'Inglés, español y ruso', 'Английский, испанский и русский')],
    [w('Status', 'Estado', 'Статус'), w('Being written. Chapters appear on this site as they are finished.', 'En redacción. Los capítulos aparecen en esta web a medida que se terminan.', 'Пишется. Главы появляются на сайте по мере готовности.')],
  ],
  honest: w(
    'Every design in the book will be built, flown and photographed before the book is printed. Until then, each plate says which numbers are estimates.',
    'Cada modelo del libro se construirá, se volará y se fotografiará antes de imprimirlo. Hasta entonces, cada lámina indica qué números son estimaciones.',
    'Перед печатью каждую модель из книги соберут, испытают в полёте и сфотографируют. А пока на каждой таблице отмечено, какие числа являются оценками.',
  ),
  now: w('Print & Play now', 'Imprime y vuela ya', 'Печатайте и запускайте уже сейчас'),
  nowText: w(
    'Everything in the book that you can fold is free to print today.',
    'Todo lo que se puede plegar del libro ya se puede imprimir gratis.',
    'Всё, что в книге можно сложить, уже сегодня можно бесплатно распечатать.',
  ),
  look: w('Look inside', 'Echa un vistazo', 'Заглянуть внутрь'),
  lookNote: w('Pages from the preview edition, in English. Photographs from Pixabay; drawings from the printable geometry.', 'Páginas de la edición de avance, en inglés. Fotografías de Pixabay; dibujos a partir de la geometría imprimible.', 'Страницы пробного выпуска на английском. Фотографии с Pixabay; рисунки построены по геометрии шаблонов.'),
  booklet: w('Download the complete family booklet (A4 PDF)', 'Descarga el cuadernillo familiar completo (PDF A4)', 'Скачать полный семейный буклет (PDF A4)'),
}

function bookBody(lang, base) {
  const t = key => bookWords[key][lang]
  return `<section class="product-hero">
    <div><p class="eyebrow">${t('status')}</p><h1>${e(book.title[lang])}</h1>
      <p class="plate-lineage">${e(book.subtitle[lang])}</p>
      <p class="lede">${e(book.promise[lang])}</p>
      ${link(base + publicPath('home', lang) + '#contents', t('read'), 'button primary')}</div>
    <div class="product-art book-cover-art"><img src="${base}assets/book/preview/cover.webp" alt="${e(book.title[lang])}" decoding="async"></div>
  </section>
  <section class="book-look" aria-labelledby="look-title"><h2 id="look-title">${t('look')}</h2><p class="hint">${t('lookNote')}</p>
    <ol class="look-inside">${['toc', 'nature', 'nature-insects', 'game-spot-the-trim', 'plate-A1', 'history-timeline', 'space', 'contests-records', 'index'].map(id => `<li><a href="${base}assets/book/preview/${id}.webp"><img src="${base}assets/book/preview/${id}.webp" alt="" loading="lazy" decoding="async"></a></li>`).join('')}</ol></section>
  <section class="book-inside" aria-labelledby="inside-title"><h2 id="inside-title">${t('inside')}</h2>
    <ol class="book-chapters">${chapters.map(chapter => `<li><span class="contents-number">${chapter.n}</span><div><strong>${chapter.route ? link(base + publicPath(chapter.route, lang), chapter.title[lang]) : e(chapter.title[lang])}</strong><p>${e(chapter.standfirst[lang])}</p></div></li>`).join('')}</ol></section>
  <section class="book-edition" aria-labelledby="edition-title"><h2 id="edition-title">${t('edition')}</h2>
    <dl class="plate-glance">${bookWords.facts.map(([label, value]) => '<div><dt>' + e(label[lang]) + '</dt><dd>' + e(value[lang]) + '</dd></div>').join('')}</dl>
    <p>${t('honest')}</p></section>
  <section class="book-now" aria-labelledby="now-title"><h2 id="now-title">${t('now')}</h2><p>${t('nowText')}</p>
    <ul class="plate-links"><li>${link(base + publicPath('print', lang), copy.print[lang], 'text-link')}</li>
    <li>${link(base + navHref('book', lang, '').replace(/^\.?\//, ''), siteLabels.book[lang], 'text-link')}</li>
    <li>${link(base + 'assets/book/samples/flight-book-A4-' + lang + '.pdf', t('booklet'), 'text-link')}</li></ul></section>`
}

function productBody(route, lang, base) {
  const product = products[route]
  const image = typeof product.image === 'function' ? product.image(lang) : product.image
  const next = product.tool ? navHref(product.tool, lang, '') : null
  return `<section class="product-hero${image ? '' : ' product-hero-text'}"><div>
    <h1>${e(pageLabel(route, lang))}</h1><p class="lede">${e(product.description[lang])}</p>
    ${next ? link(base + next, product.action[lang], 'button primary') : ''}
  </div>${image ? `<div class="product-art"><img src="${base}${e(image)}" alt="" decoding="async"></div>` : ''}</section>
  <div class="actions">${product.links.map(([label, path]) => link(base + path(lang), label[lang], 'button secondary')).join('')}</div>`
}

function redirectPage(lang, base) {
  const target = base + publicPath('home', lang) + '#contents'
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Open Flight</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${workshopHome + publicPath('home', lang)}">
  <meta http-equiv="refresh" content="0; url=${e(target)}">
</head>
<body><a href="${e(target)}">${siteLabels.contents[lang]}</a></body>
</html>`
}

export function renderProduct(route, lang, assetKey = '') {
  if (!productRoutes.includes(route) || !siteLocales.includes(lang)) throw new RangeError('Unknown workshop page')
  const [category, model] = route.split('/')
  const base = '../'.repeat(route.split('/').length + (lang === 'en' ? 0 : 1))
  if (products[route]?.redirect) return redirectPage(lang, base)
  const chapter = chapterById(category)
  const plate = model ? plateFor(model) : null
  const trail = [{ label: siteLabels.home[lang], route: 'home' }]
  let title, description, body, styles = ['product.css'], script = null
  if (plate) {
    const field = fieldModel(model, lang)
    trail.push({ label: chapterLabel(chapter, lang), route: category }, { label: plate.id + ' ' + field.name, route })
    title = field.name + ', ' + plate.lineage[lang].charAt(0).toLowerCase() + plate.lineage[lang].slice(1) + ' · Open Flight'
    description = plate.lineage[lang] + '. ' + plate.kind[lang] + '.'
    body = plateMarkup(model, lang, base)
    styles = ['product.css', 'plate.css']
    script = 'plate-page.js'
  } else if (chapter && !chapter.family) {
    trail.push({ label: chapterLabel(chapter, lang), route })
    title = chapterLabel(chapter, lang) + ' · ' + book.title[lang] + ' · Open Flight'
    description = chapter.standfirst[lang] + ' ' + book.subtitle[lang] + '.'
    body = writtenChapter(chapter.id, lang, base) + chapterPager(chapter, lang, base)
    styles = ['product.css', 'plate.css', 'chapter.css']
  } else if (chapter) {
    trail.push({ label: chapterLabel(chapter, lang), route })
    title = chapterLabel(chapter, lang) + ' · ' + book.title[lang] + ' · Open Flight'
    description = chapter.standfirst[lang]
    body = chapterBody(chapter, lang, base)
    styles = ['product.css', 'plate.css']
  } else if (route === 'flight-book') {
    trail.push({ label: siteLabels['flight-book'][lang], route })
    title = book.title[lang] + ' · ' + book.subtitle[lang] + ' · Open Flight'
    description = products['flight-book'].description[lang]
    body = bookBody(lang, base)
    styles = ['product.css', 'plate.css']
  } else {
    trail.push({ label: pageLabel(route, lang), route })
    title = pageLabel(route, lang) + ' · Open Flight'
    description = products[route].description[lang]
    body = productBody(route, lang, base)
  }
  const crumbs = trail.map(({ label, route }, index) => index === trail.length - 1
    ? { label } : { label, href: navHref(route, lang, base) })
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${head(route, lang, title, description, trail)}
  ${script ? '<script type="module" src="' + base + script + assetKey + '"></script>' : ''}
  <script type="module" src="${base}atlas-nav.js${assetKey}"></script>
  <link rel="icon" href="${base}assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}tokens.css${assetKey}">
  <link rel="stylesheet" href="${base}system.css${assetKey}">
  ${styles.map(name => '<link rel="stylesheet" href="' + base + name + assetKey + '">').join('\n  ')}
</head>
<body>
  <a class="skip-link" href="#main">${siteLabels.skip[lang]}</a>
  <header class="mast">${siteHeader(route, lang, base, route)}</header>
  ${breadcrumbs(crumbs, lang)}
  <main id="main" class="wrap product-page">
    ${body}
  </main>
  <footer class="site-footer wrap">${siteFooter(lang, base)}</footer>
</body></html>`.replace(/[ \t]+$/gm, '')
}

