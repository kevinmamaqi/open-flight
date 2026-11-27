// The home page is the book's cover and contents. Chapter 1, "One sheet",
// opens it. The header comes from site-navigation.js at build time.
import { appendix, book, chapterLabel, chapters, plates } from './book/catalog.js?v=27dc78b6a91f'
import { fieldModel } from './atlas-guide.js?v=27dc78b6a91f'
import { specimenPath } from './model-appearance.js?v=27dc78b6a91f'
import { workshopHome } from './assets/workshop-address.js?v=27dc78b6a91f'
import { escapeHtml as e, publicPath, siteFooter, siteLabels, siteLocales } from './site-navigation.js?v=27dc78b6a91f'

const w = (en, es, ru) => ({ en, es, ru })
const copy = {
  open: w('Open the contents', 'Abrir el índice', 'Открыть содержание'),
  audience: w(
    'For anyone curious about flight, from five years old to ninety-five. No account needed.',
    'Para cualquier persona curiosa por el vuelo, de cinco a noventa y cinco años. Sin cuenta.',
    'Для всех, кому интересен полёт, — от пяти до девяноста пяти лет. Без регистрации.',
  ),
  printHelp: w('Pick up to three designs. One PDF.', 'Elige hasta tres modelos. Un solo PDF.', 'Выберите до трёх моделей. Один PDF.'),
  plate: w('Plate', 'Lámina', 'Таблица'),
  previous: w('Previous plate', 'Lámina anterior', 'Предыдущая таблица'),
  next: w('Next plate', 'Lámina siguiente', 'Следующая таблица'),
  soon: w('In preparation', 'En preparación', 'Готовится'),
  appendix: w('Appendix', 'Apéndice', 'Приложение'),
  oneSheet: [
    w('Every flyer in this book starts as one sheet of paper. Fold it, launch it, then change one thing and launch it again. That is the whole method, and it works at the kitchen table and in a classroom.',
      'Cada modelo de este libro empieza siendo una hoja de papel. Plégala, lánzala, cambia una sola cosa y vuelve a lanzarla. Ese es todo el método, y funciona en la mesa de la cocina y en el aula.',
      'Каждая модель в этой книге начинается с одного листа бумаги. Сложите его, запустите, измените что-то одно и запустите снова. В этом весь метод, и он работает и на кухонном столе, и в классе.'),
    w('We say what we know and what we don’t. Numbers marked “estimate” come from the geometry. Tell us how yours fly.',
      'Te contamos lo que sabemos y lo que no. Los números marcados como «estimación» salen de la geometría. Cuéntanos cómo vuelan los tuyos.',
      'Мы говорим, что знаем и чего не знаем. Числа с пометкой «оценка» получены из геометрии. Расскажите, как летают ваши.'),
  ],
  together: [
    [w('Ages 5–7 · make it together', 'De 5 a 7 años · en compañía', '5–7 лет · делаем вместе'),
      w('Choose a design and its colors. Two pairs of hands make the tricky folds and cuts easier. Point to where you think it will land.',
        'Elige un modelo y sus colores. Con dos pares de manos, los pliegues y cortes difíciles salen mejor. Señala dónde crees que aterrizará.',
        'Выберите модель и её окраску. Вдвоём сложные сгибы и надрезы получаются легче. Покажите, где, по-вашему, она приземлится.')],
    [w('Ages 8–12 · run a flight test', 'De 8 a 12 años · una prueba de vuelo', '8–12 лет · лётное испытание'),
      w('Mark where five flights land. Change one fold and fly five more from the same spot. What changed?',
        'Marca dónde aterrizan cinco vuelos. Cambia un pliegue y haz otros cinco desde el mismo sitio. ¿Qué ha cambiado?',
        'Отметьте, где приземлятся пять полётов. Измените один сгиб и сделайте ещё пять запусков с того же места. Что изменилось?')],
    [w('Any age · go deeper', 'Cualquier edad · más a fondo', 'Любой возраст · копнём глубже'),
      w('Open “Go deeper” on each plate: the real physics, the numbers and where they come from. Then ask what the next flight could tell you, and let the builder choose the next change.',
        'Abre «Más a fondo» en cada lámina: la física de verdad, los números y de dónde salen. Después pregunta qué podría enseñaros el próximo vuelo y deja que quien construye elija el siguiente cambio.',
        'Откройте раздел «Копнём глубже» на каждой таблице: настоящая физика, цифры и откуда они взялись. Потом спросите, что может показать следующий полёт, и дайте конструктору выбрать следующее изменение.')],
  ],
  teachers: w('Plan copies for your class, print a fair-test sheet and run a contest together.',
    'Calcula las copias para tu clase, imprime una hoja de prueba justa y organizad juntos una competición.',
    'Рассчитайте тираж для класса, распечатайте лист честного опыта и устройте соревнование вместе.'),
  teachersAction: w('Plan a class', 'Planifica una clase', 'Спланировать урок'),
  bookText: w('We are preparing One Sheet as a printed book for readers aged 8 to 12: seven chapters to make, fly and change, and an annex with every model, 128 pages in the current proof. Its patterns print at 100% on A4 and US Letter. The chapters on this site are its free web edition.',
    'Estamos preparando Una hoja como libro impreso para lectores de 8 a 12 años: siete capítulos para construir, volar y cambiar, y un anexo con todos los modelos, 128 páginas en la prueba actual. Sus plantillas se imprimen al 100 % en A4 y Carta. Los capítulos de esta web son su edición digital gratuita.',
    'Мы готовим «Один лист» как печатную книгу для читателей 8–12 лет: семь глав, где модели собирают, запускают и улучшают, и приложение со всеми моделями — 128 страниц в текущей вёрстке. Шаблоны печатаются в масштабе 100% на A4 и US Letter. Главы на этом сайте — её бесплатное веб-издание.'),
  bookAction: w('About the book', 'Sobre el libro', 'О книге'),
}
const ogLocale = { en: 'en_US', es: 'es_ES', ru: 'ru_RU' }

function plateCard(plate, lang) {
  const name = fieldModel(plate.model, lang).name
  return `<li><a class="contents-plate" href="./${publicPath(plate.chapter + '/' + plate.model, lang)}">
    <img src="./${specimenPath(plate.model)}" alt="" loading="lazy" decoding="async">
    <span><small>${plate.id}</small> ${e(name)}</span></a></li>`
}

function contents(lang) {
  const rows = chapters.map(chapter => {
    const href = chapter.route ? './' + publicPath(chapter.route, lang) : chapter.id === 'one-sheet' ? '#one-sheet' : null
    const title = href ? `<a href="${href}">${e(chapter.title[lang])}</a>` : e(chapter.title[lang])
    const owned = plates.filter(plate => plate.chapter === chapter.id)
    return `<li class="contents-chapter" id="chapter-${chapter.id}">
      <span class="contents-number">${String(chapter.n).padStart(2, '0')}</span>
      <div><h3>${title}${chapter.status ? ' <span class="chip">' + copy.soon[lang] + '</span>' : ''}</h3>
      <p>${e(chapter.standfirst[lang])}</p>
      ${owned.length ? '<ul class="contents-plates">' + owned.map(plate => plateCard(plate, lang)).join('') + '</ul>' : ''}</div>
    </li>`
  })
  const back = appendix.map(item => {
    const href = item.id === 'references' ? './references.html?lang=' + lang : './' + publicPath(item.route, lang)
    return `<a href="${href}">${e(item.title[lang])}</a>`
  }).join(' · ')
  return rows.join('') + `<li class="contents-chapter"><span class="contents-number">A</span>
    <div><h3>${copy.appendix[lang]}</h3><p>${back}</p></div></li>`
}

export function renderHome(lang) {
  if (!siteLocales.includes(lang)) throw new RangeError('Unknown language')
  const canonical = workshopHome + publicPath('home', lang)
  const title = book.title[lang] + ' · Open Flight'
  const cover = plates.map(plate => ({
    id: plate.id,
    name: fieldModel(plate.model, lang).name,
    lineage: plate.lineage[lang],
    src: './' + specimenPath(plate.model),
    href: './' + publicPath(plate.chapter + '/' + plate.model, lang),
  }))
  const first = cover.find(item => item.id === 'B1')
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fbf9f4">
  <title>${e(title)}</title>
  <meta name="description" content="${e(book.promise[lang])}">
  <link rel="canonical" href="${canonical}">
  ${siteLocales.map(locale => `<link rel="alternate" hreflang="${locale}" href="${workshopHome + publicPath('home', locale)}">`).join('\n  ')}
  <link rel="alternate" hreflang="x-default" href="${workshopHome}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Open Flight">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(book.promise[lang])}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${ogLocale[lang]}">
  <meta property="og:image" content="${workshopHome}assets/brand/social-${lang}.png">
  <meta property="og:image:alt" content="Open Flight">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="./assets/brand/favicon.ico" sizes="32x32">
  <link rel="icon" href="./assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="./assets/brand/apple-touch-icon.png">
  <link rel="manifest" href="./site.webmanifest">
  <link rel="preload" href="./assets/fonts/OpenFlightText-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="./tokens.css">
  <link rel="stylesheet" href="./system.css">
  <link rel="stylesheet" href="./home.css">
  <script type="module" src="./atlas-nav.js"></script>
  <script type="module" src="./home.js"></script>
</head>
<body>
  <a class="skip-link" href="#contents" data-site-skip>${siteLabels.skip[lang]}</a>
  <header class="mast" data-site-page="home"></header>
  <main>
    <section class="book-hero wrap" aria-labelledby="book-title">
      <div class="book-hero-copy">
        <p class="eyebrow">Open Flight · ${e(book.subtitle[lang])}</p>
        <h1 id="book-title">${e(book.title[lang])}</h1>
        <p class="lede">${e(book.promise[lang])}</p>
        <div class="actions"><a class="button primary" href="./${publicPath('print', lang)}">${siteLabels.print[lang]}</a>
          <a class="text-link" href="#contents">${copy.open[lang]} ↓</a></div>
        <p class="hint">${copy.printHelp[lang]} ${copy.audience[lang]}</p>
      </div>
      <figure class="book-cover stage-grid" data-cover>
        <p class="book-cover-title" aria-hidden="true">${e(book.title[lang])}</p>
        <a class="book-cover-art" href="${first.href}" data-cover-link><img src="${first.src}" alt="${e(first.name)}" width="440" height="245" fetchpriority="high" data-cover-image></a>
        <figcaption><span><small data-cover-id>${copy.plate[lang]} ${first.id}</small> <strong data-cover-name>${e(first.name)}</strong><i data-cover-lineage>${e(first.lineage)}</i></span>
          <span class="turn"><button type="button" data-cover-step="-1" aria-label="${copy.previous[lang]}">←</button><button type="button" data-cover-step="1" aria-label="${copy.next[lang]}">→</button></span></figcaption>
        <script type="application/json" data-cover-plates>${JSON.stringify({ label: copy.plate[lang], plates: cover }).replaceAll('<', '\\u003c')}</script>
      </figure>
    </section>
    <section class="contents wrap" id="contents" aria-labelledby="contents-title">
      <h2 id="contents-title">${siteLabels.contents[lang]}</h2>
      <ol class="contents-list">${contents(lang)}</ol>
    </section>
    <section class="one-sheet wrap" id="one-sheet" aria-labelledby="one-sheet-title">
      <div><p class="eyebrow">${chapterLabel(chapters[0], lang)}</p>
        <h2 id="one-sheet-title">${e(chapters[0].title[lang])}</h2>
        ${copy.oneSheet.map(p => '<p>' + e(p[lang]) + '</p>').join('')}</div>
      <dl class="reading-together">${copy.together.map(([term, text]) => '<div><dt>' + e(term[lang]) + '</dt><dd>' + e(text[lang]) + '</dd></div>').join('')}</dl>
    </section>
    <section class="home-notes wrap">
      <div><h2>${siteLabels.teachers[lang]}</h2><p>${copy.teachers[lang]}</p>
        <a class="text-link" href="./${publicPath('teachers', lang)}">${copy.teachersAction[lang]} →</a></div>
      <div><h2>${siteLabels['flight-book'][lang]}</h2><p>${copy.bookText[lang]}</p>
        <a class="text-link" href="./${publicPath('flight-book', lang)}">${copy.bookAction[lang]} →</a></div>
    </section>
  </main>
  <footer class="site-footer wrap">${siteFooter(lang, './')}</footer>
</body>
</html>
`
}

