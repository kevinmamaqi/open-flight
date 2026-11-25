import { workbenchMarkup } from './model-workbench.js?v=51d4970dfb40'
import { appearanceArtPath } from './model-appearance.js?v=51d4970dfb40'
import { planeCatalog } from './assets/planes/catalog.js?v=51d4970dfb40'
import { objectCopy } from './flight-objects-copy.js?v=51d4970dfb40'
import { designIds, fieldModel, studioLink, words } from './atlas-guide.js?v=51d4970dfb40'
import { flightObjects } from './assets/objects/activities.js?v=51d4970dfb40'
import { workshopHome } from './assets/workshop-address.js?v=51d4970dfb40'
import { sheetIdFor, sheetPath } from './family-sheets.js?v=51d4970dfb40'
import { breadcrumbs, escapeHtml as e, navHref, publicPath, siteHeader, siteLabels, siteLocales } from './site-navigation.js?v=51d4970dfb40'

const w = words
const copy = {
  open: w('Open the workshop', 'Abrir el taller', 'Открыть мастерскую'),
  models: w('Choose a model', 'Elige un modelo', 'Выбери модель'),
  downloads: w('Print the pattern', 'Imprime la plantilla', 'Напечатай шаблон'),
  materials: w('What you need', 'Qué necesitas', 'Что понадобится'),
  experiment: w('Try this flight test', 'Prueba este experimento', 'Проверь в полёте'),
  print: w(
    'Print at 100% (Actual size) and check the 50 mm scale on the sheet with a ruler.',
    'Imprime al 100 % (Tamaño real) y comprueba con una regla que la escala del papel mide 50 mm.',
    'Печатай в масштабе 100% («Фактический размер») и проверь линейкой отметку 50 мм.',
  ),
  letter: w('US Letter', 'Carta', 'US Letter'),
  paired: w('Monarch K1 and K2 trial PDF', 'PDF de la prueba del monarca K1 y K2', 'PDF для сравнения монарха K1 и K2'),
  variants: w('Other butterfly folds', 'Otros pliegues de mariposa', 'Другие варианты сгиба'),
  w1: w('Tabbed wings (W1)', 'Alas con aletas (W1)', 'Крылья с язычками (W1)'),
  k2title: w('Folded leading edge (K2)', 'Borde de ataque plegado (K2)', 'Подогнутая передняя кромка (K2)'),
  alternate: w('See the other models', 'Ver los otros modelos', 'Посмотреть другие модели'),
}
const products = {
  designs: {
    description: w(
      'Choose a paper butterfly, fold a one-sheet airplane, or try a ring glider, maple spinner or tandem. The patterns and activities are free to print.',
      'Elige una mariposa de papel, pliega un avión de una sola hoja o prueba un anillo, una semilla giratoria o un planeador tándem. Las plantillas y actividades son gratuitas.',
      'Выбери бумажную бабочку или самолёт из одного листа. Попробуй кольцеплан, кленовую крылатку или тандем. Шаблоны и задания можно распечатать бесплатно.',
    ),
  },
  butterflies: {
    family: 'butterfly', image: appearanceArtPath('monarch-k2'), tool: 'costa',
    description: w(
      'Cut and fold three paper butterfly gliders with printable patterns. Change a fold, check the balance with a paper clip, and record where each glider lands.',
      'Recorta y pliega tres planeadores con forma de mariposa. Cambia un pliegue, comprueba el equilibrio con un clip y apunta dónde aterriza cada uno.',
      'Вырежи и сложи три планера-бабочки по шаблонам. Измени сгиб, проверь баланс скрепкой и отметь места посадок.',
    ),
  },
  airplanes: {
    family: 'airplane', image: appearanceArtPath('boeing-747'), tool: 'planes',
    description: w(
      'Fold a paper airplane from a single rectangular sheet. Pick one of four models and follow its illustrated guide, with printable patterns in A4 and US Letter.',
      'Pliega un avión de papel con una sola hoja rectangular. Elige uno de cuatro modelos y sigue su guía ilustrada, con plantillas en A4 y Carta.',
      'Сложи бумажный самолёт из одного прямоугольного листа. Выбери одну из четырёх моделей и следуй рисункам. Шаблоны есть в форматах A4 и US Letter.',
    ),
  },
  'flying-objects': {
    family: 'object', image: appearanceArtPath('ring'), tool: 'flight-objects',
    description: w(
      'Make a ring glider, a maple spinner and a Williams tandem glider. Each activity gives you a build, two settings to compare and a way to record the result.',
      'Construye un planeador de anillo, una semilla giratoria y un planeador tándem Williams. Cada actividad incluye instrucciones, dos variantes y una forma de anotar el resultado.',
      'Сделай кольцеплан, кленовую крылатку или тандемный планер Уильямса. В каждом задании есть инструкция, две настройки для сравнения и способ записать результат.',
    ),
  },
  'flight-book': {
    image: lang => 'assets/atlas/book-cover-' + lang + '.png', tool: 'book',
    action: w('Build your Flight Book', 'Crea tu libro de vuelo', 'Создай свою книгу полётов'),
    description: w(
      'Make a free printable book with your choice of flyers, folding guides and flight logs. Preview the pages, choose A4 or US Letter, then download a PDF or share the setup.',
      'Crea un libro gratuito para imprimir con tus modelos, guías de pliegues y registros de vuelo. Previsualiza las páginas, elige A4 o Carta y descarga el PDF o comparte tu selección.',
      'Собери бесплатную книгу с выбранными моделями, схемами сгибов и журналами полётов. Просмотри страницы, выбери A4 или US Letter, скачай PDF или поделись своей подборкой.',
    ),
    links: [
      [w('Read the complete A4 book (PDF)', 'Leer el libro completo en A4 (PDF)', 'Открыть полную книгу A4 (PDF)'), lang=>'assets/book/samples/flight-book-A4-'+lang+'.pdf'],
      [w('Preview the flight log', 'Ver el registro de vuelo', 'Посмотреть журнал полётов'), lang => 'book.html?lang=' + lang + '&p=4'],
      [siteLabels.teachers, lang => publicPath('teachers', lang)],
    ],
  },
  teachers: {
    image: lang => 'assets/atlas/book-log-' + lang + '.png', tool: 'classroom',
    action: w('Plan classroom copies', 'Planifica las copias para el aula', 'Рассчитай тираж для класса'),
    description: w(
      'Plan a paper-flight lesson for your class. Choose a team size and paper format, calculate the copies you need, and give teams a simple test to run together.',
      'Prepara una clase de vuelo en papel. Elige cuántos alumnos habrá en cada equipo y el formato de papel, calcula las copias y asigna a los equipos una prueba sencilla.',
      'Подготовь урок о полёте бумажных моделей. Выбери размер команды и формат бумаги, рассчитай количество копий и предложи командам простой опыт.',
    ),
    links: [
      [w('Open the printable lesson', 'Abre la ficha para imprimir', 'Открой задание для печати'), lang => 'library/family-lesson-' + lang + '.html'],
      [siteLabels['flight-book'], lang => publicPath('flight-book', lang)],
    ],
  },
  'motor-lab': {
    image: 'assets/motor/saddle-illustration.svg', tool: 'motor',
    action: w('Open the motor workbench', 'Abre el banco de motores', 'Открой стенд для мотора'),
    description: w(
      'Explore a removable motor mount and a button-to-LED bench experiment with an adult. The workbench contains the fit drawing, firmware and trial log. Powered flight is untested.',
      'Explora con un adulto un soporte de motor desmontable y una prueba de banco con pulsador y LED. Consulta el plano, el firmware y el registro de ensayos. El vuelo con motor sigue sin probarse.',
      'Вместе со взрослым изучи съёмное крепление мотора и опыт с кнопкой и светодиодом. На стенде есть чертёж, прошивка и журнал испытаний. Полёт с мотором ещё не проверен.',
    ),
    links: [
      [w('Print the mount drawing (A4)', 'Imprime el plano del soporte (A4)', 'Напечатай чертёж крепления (A4)'), () => 'assets/motor/OF-M0-r1-A4.pdf'],
      [siteLabels.next, lang => 'next.html?lang=' + lang],
    ],
  },
}
const categories = Object.keys(products).filter(id => products[id].family)
const modelsByCategory = Object.fromEntries(categories.map(id =>
  [id, designIds.filter(model => fieldModel(model).family === products[id].family)],
))
export const productRoutes = [
  ...Object.keys(products),
  ...categories.flatMap(id => modelsByCategory[id].map(model => id + '/' + model)),
]

const nameOf = model => model.family === 'airplane' ? model.inspiration : model.name
const photo = (src, base, lazy = false) =>
  `<div class="product-art"><img src="${base}${e(src.replace(/^\.\//, ''))}" alt=""${lazy ? ' loading="lazy"' : ''} decoding="async"></div>`
const link = (href, label, cls = '') =>
  `<a href="${e(href)}"${cls ? ' class="' + cls + '"' : ''}>${e(label)}</a>`
const absolute = (route, lang) => workshopHome + publicPath(route, lang)
const ogLocale = { en: 'en_US', es: 'es_ES', ru: 'ru_RU' }

export function languageAlternates(route) {
  return [...siteLocales.map(lang => [lang, absolute(route, lang)]), ['x-default', absolute(route, 'en')]]
}

function productHead(route, lang, title, description, trail) {
  const social = workshopHome + 'assets/brand/social-' + lang + '.png'
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
  <meta property="og:image" content="${social}">
  <meta property="og:image:alt" content="Open Flight">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>`
}

function productCard(id, lang, base) {
  const product = products[id]
  return `<li class="product-card panel">
    ${photo(typeof product.image === 'function' ? product.image(lang) : product.image, base, true)}
    <div class="product-card-copy"><h2>${link(base + publicPath(id, lang), siteLabels[id][lang])}</h2>
    <p>${e(product.description[lang])}</p></div>
  </li>`
}

function modelCards(category, ids, lang, base) {
  return `<ul class="product-grid">${ids.map(id => {
    const model = fieldModel(id, lang)
    return `<li class="product-card panel">
      ${photo(appearanceArtPath(model.family==='object' ? id : sheetIdFor(id)), base, true)}
      <div class="product-card-copy"><h3>${link(base + publicPath(category + '/' + id, lang), nameOf(model))}</h3>
      <p>${e(model.technique)}</p></div>
    </li>`
  }).join('')}</ul>`
}

function modelContent(model, lang, base, trialsBase) {
  const t = key => copy[key][lang]
  const butterfly = model.family === 'butterfly'
  const object = model.family === 'object'
  const lab = object ? flightObjects(lang) : null
  const activity = lab?.activities.find(item => item.id === model.id)
  const files = (construction = 'k2') => ['A4', 'US_LETTER'].map(paper => {
    const path = activity ? lab.packets[paper] + '#page=' + activity.page
      : sheetPath(sheetIdFor(model.id, construction), paper, lang)
    return link(base + path, (paper === 'A4' ? paper : t('letter')) + ' PDF', 'button secondary')
  }).join('')
  const trial = model.id === 'monarch'
    ? '<p>' + link(trialsBase + 'trials/monarch-k1-k2-A4-' + lang + '.pdf', t('paired'), 'text-link') + '</p>' : ''
  const variants = butterfly ? `<section aria-labelledby="variants">
    <h2 id="variants">${t('variants')}</h2>
    <h3>${link(base+studioLink(model.id,lang).slice(2),t('w1'),'text-link')}</h3><div class="actions">${files('w1')}</div>
    <h3>${link(base+'keel.html?species='+model.id+'&lang='+lang,w('Pinched spine','Pliegue central','Складной корпус')[lang]+' (K1)','text-link')}</h3><div class="actions">${files('k1')}</div>${trial}
  </section>` : ''
  const aircraft = planeCatalog.find(item=>item.model_id===model.id)
  const materials = butterfly ? w('120 g/m² paper, scissors, a ruler and two 33 mm paper clips.', 'Papel de 120 g/m², tijeras, regla y dos clips de 33 mm.', 'Бумага 120 г/м², ножницы, линейка и две скрепки по 33 мм.')[lang] : model.materials
  return `<div class="product-sections">
    <section aria-labelledby="materials"><h2 id="materials">${t('materials')}</h2><p>${e(materials)}</p></section>
    <section aria-labelledby="downloads"><h2 id="downloads">${t('downloads')}${butterfly ? ' (K2)' : ''}</h2>
      <div class="actions">${files()}</div><p class="hint">${t('print')}</p></section>
    <section aria-labelledby="experiment"><h2 id="experiment">${t('experiment')}</h2>
      <p>${e(model.experiment)}</p>
      ${activity ? '<p>' + link(activity.source.url, model.inspiration, 'text-link') + '</p>' : ''}
    </section>
    ${activity ? '<section><h2>'+objectCopy[lang].build+'</h2><ol>'+activity.steps.map(step=>'<li>'+e(step)+'</li>').join('')+'</ol><p>'+e(activity.recovery)+'</p></section>' : ''}
    ${aircraft ? '<section><h2>'+e(aircraft.field.landmark[lang])+'</h2><p>'+e(aircraft.field.look[lang])+'</p><p>'+e(aircraft.field.finish[lang])+'</p></section>' : ''}${variants}
  </div>`
}

export function renderProduct(route, lang, assetKey = '', trialsBase = null) {
  if (!productRoutes.includes(route) || !siteLocales.includes(lang)) throw new RangeError('Unknown workshop page')
  const [category, id] = route.split('/')
  const base = '../'.repeat(route.split('/').length + (lang === 'en' ? 0 : 1))
  const product = products[category]
  const model = id ? fieldModel(id, lang) : null
  const categoryLabel = siteLabels[category][lang]
  const label = model ? nameOf(model) : categoryLabel
  const desc = model ? model.shape : product.description[lang]
  const title = (model ? label + ' · ' + categoryLabel : label) + ' · Open Flight'
  const trail = [{ label: siteLabels.home[lang], route: 'home' }]
  if (categories.includes(category)) trail.push({ label: siteLabels.designs[lang], route: 'designs' })
  trail.push({ label: categoryLabel, route: category })
  if (model) trail.push({ label, route })
  const crumbs = trail.map(({ label, route }, index) => index === trail.length - 1
    ? { label } : { label, href: navHref(route, lang, base) })
  const image = model?.image ?? (typeof product.image === 'function' ? product.image(lang) : product.image)
  const next = model ? (model.family === 'butterfly' ? './costa.html?' + new URLSearchParams({species:id,lang}) : model.studio).slice(2)
    : product.tool ? navHref(product.tool, lang, '') : null
  const metric = (label,value) => '<div><dt>'+e(label)+'</dt><dd>'+e(String(value))+'</dd></div>'
  const objectFacts = {
    ring:[w('Rim fold','Pliegue del borde','Подгиб обода'), '13 mm', w('Folds at rim','Pliegues del borde','Сгибы обода'), '2'],
    samara:[w('Clip stations','Posiciones del clip','Положения скрепки'),'A / B',w('Wings','Alas','Крылья'),'1'],
    tandem:[w('Front span before folding','Envergadura delantera antes de plegar','Передний размах до сгиба'),'80 mm',w('Rear span before folding','Envergadura trasera antes de plegar','Задний размах до сгиба'),'72 mm'],
  }
  function metrics() {
    if(model.family === 'object'){
      const [a,v,b,n] = objectFacts[id]
      return metric(a[lang],v)+metric(b[lang],n)
    }
    return model.settings.map(({label,value,unit})=>metric(label,value+' '+unit)).join('')
  }
  const hero = `<section class="product-hero${image ? '' : ' product-hero-text'}"><div>
    ${model ? '<p class="hint">' + e(model.family === 'airplane' ? model.name : model.technique) + '</p>' : ''}
    <h1>${e(label)}</h1><p class="lede">${e(desc)}</p>
    ${model ? '<dl class="model-facts">'+metrics()+'</dl><a class="text-link" data-model-studio href="'+e(base+next)+'">'+w('Build instructions','Instrucciones de montaje','Инструкция по сборке')[lang]+' ↗</a>' : next ? link(base + next, (product.action ?? copy.open)[lang], 'button primary') : ''}
  </div>${model ? workbenchMarkup(id, lang, base) : image ? photo(image, base) : ''}</section>`
  let body = ''
  if (model) {
    body = modelContent(model, lang, base, trialsBase ?? base) +
      `<section aria-labelledby="related"><h2 id="related">${copy.alternate[lang]}</h2>${modelCards(category, modelsByCategory[category].filter(other => other !== id), lang, base)}</section>`
  } else if (product.family) {
    body = `<section aria-labelledby="models"><h2 id="models">${copy.models[lang]}</h2>${modelCards(category, modelsByCategory[category], lang, base)}</section>`
  } else if (category === 'designs') {
    body = `<ul class="product-grid">${Object.keys(products).filter(id => id !== 'designs').map(id => productCard(id, lang, base)).join('')}</ul>`
  } else {
    body = `<div class="actions">${product.links.map(([label, path]) => link(base + path(lang), label[lang], 'button secondary')).join('')}</div>`
  }
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${productHead(route, lang, title, desc, trail)}
  ${model ? '<script type="module" src="'+base+'model-workbench.js'+assetKey+'"></script>' : ''}
  <link rel="icon" href="${base}assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}tokens.css${assetKey}">
  <link rel="stylesheet" href="${base}system.css${assetKey}">
  <link rel="stylesheet" href="${base}product.css${assetKey}">
</head>
<body>
  <a class="skip-link" href="#main">${siteLabels.skip[lang]}</a>
  <header class="mast">${siteHeader(route, lang, base, route)}</header>
  ${breadcrumbs(crumbs, lang)}
  <main id="main" class="wrap product-page">
    ${hero}
    ${body}
  </main>
  <footer class="site-footer wrap">
    ${link(navHref('home', lang, base), 'Open Flight', 'brand')}
    ${link(navHref('library', lang, base), siteLabels.library[lang])}
    ${link(navHref('references', lang, base), siteLabels.references[lang])}
  </footer>
</body></html>`.replace(/[ \t]+$/gm, '')
}
