import { book, chapterById, chapterLabel, chapters, plateFor, plates } from './book/catalog.js?v=27dc78b6a91f'
import { fieldModel } from './atlas-guide.js?v=27dc78b6a91f'
import { specimenPath } from './model-appearance.js?v=27dc78b6a91f'
import { workshopHome } from './assets/workshop-address.js?v=27dc78b6a91f'
import { plateMarkup } from './plate.js?v=27dc78b6a91f'
import { chapterBody as writtenChapter } from './book/render-chapter.js?v=27dc78b6a91f'
import { breadcrumbs, escapeHtml as e, navHref, pageLabel, publicPath, siteFooter, siteHeader, siteLabels, siteLocales } from './site-navigation.js?v=27dc78b6a91f'

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
    w('Four more are Open Flight’s versions of record and championship planes: Needle after the Red Dart, Sky Raft after the Shaheen Shin, Homecoming after the Crescent Boomerang and Snub Nose after the Sky King. Each plate names the original, its designer and its record, and explains why it flies.',
      'Otros cuatro son versiones de Open Flight de aviones de récord y de campeonato: Aguja, basado en el Red Dart; Balsa del cielo, en el Shaheen Shin; Regreso, en el Crescent Boomerang, y Nariz chata, en el Sky King. Cada lámina nombra el original, a su autor y su récord, y explica por qué vuela.',
      'Ещё четыре — версии Open Flight рекордных и чемпионских самолётов: «Игла» по мотивам Red Dart, «Небесный плот» — Shaheen Shin, «Возвращение» — Crescent Boomerang и «Курносик» — Sky King. На каждой таблице названы оригинал, его автор и рекорд и объяснено, почему модель летает.'),
  ],
  butterflies: [
    w('Real butterflies flap, twist and glide. A paper butterfly can only glide, so it must balance like a flying wing.',
      'Las mariposas de verdad aletean, se retuercen y planean. Una mariposa de papel solo puede planear, así que tiene que equilibrarse como un ala volante.',
      'Настоящие бабочки машут крыльями, изгибают их и планируют. Бумажная бабочка может только планировать, поэтому она должна балансировать, как летающее крыло.'),
    w('Build one, balance it on the dots and tell us how it flies.',
      'Construye uno, equilíbralo sobre los puntos y cuéntanos cómo vuela.',
      'Соберите один, уравновесьте его на точках и расскажите, как он летает.'),
  ],
  'flying-objects': [
    w('Three classic experiments: a ring that flies like a shuttlecock, a seed that spins as it falls, and a two-winged glider from a 1918 book.',
      'Tres experimentos clásicos: un anillo que vuela como un volante de bádminton, una semilla que gira al caer y un planeador de dos alas de un libro de 1918.',
      'Три классических опыта: кольцо, которое летит как волан, семя, которое вращается при падении, и двукрылый планёр из книги 1918 года.'),
  ],
}

const products = {
  designs: { redirect: true },
  contact: {
    description: w(
      'Write to Open Flight: publishers, schools, museums, press and anyone with a flight to report.',
      'Escribe a Open Flight: editoriales, escuelas, museos, prensa y cualquiera que quiera contarnos un vuelo.',
      'Напишите Open Flight: издательства, школы, музеи, пресса и все, кто хочет рассказать о полёте.',
    ),
  },
  'flight-book': {
    description: w(
      'The printed edition of One Sheet: its chapters, format and status. Every model in it can already be printed free at home or in class.',
      'La edición impresa de Una hoja: sus capítulos, formato y estado. Todos sus modelos ya se pueden imprimir gratis en casa o en el aula.',
      'Печатное издание книги «Один лист»: главы, формат и состояние работы. Все модели из неё уже можно бесплатно распечатать дома или в классе.',
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
    <span class="plate-badges"><span class="chip">${e(plate.kind[lang])}</span></span></span>
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
  inside: w('Inside the printed edition', 'Dentro de la edición impresa', 'Внутри печатного издания'),
  subtitle: w('Make it fly, find out why', 'Hazla volar, descubre por qué', 'Запустите лист и узнайте, почему он летит'),
  printedChapters: [
    w('Fold it and let go', 'Dóblalo y suéltalo', 'Сложите и отпустите'),
    w('What changed the flight?', '¿Qué cambió el vuelo?', 'Что изменило полёт?'),
    w('Make a wing into a ring', 'Convierte un ala en un anillo', 'Сверните крыло в кольцо'),
    w('Make something that falls slowly', 'Haz algo que caiga despacio', 'Сделайте то, что падает медленно'),
    w('Give a glider a butterfly’s shape', 'Dale a un planeador forma de mariposa', 'Планер в форме бабочки'),
    w('Run a fair flight test', 'Haz una prueba de vuelo justa', 'Проведите честное лётное испытание'),
    w('Design a better flyer for your room', 'Diseña un mejor modelo volador para tu habitación', 'Придумайте лучшую модель для своей комнаты'),
  ],
  insideNote: w(
    'Chapters 1 to 5 each start with something to make: a plain-paper dart, a ring, a maple spinner and a paper butterfly. You fly it, read what happened, change one thing and fly it again. Chapters 6 and 7 use what you made. An annex gives all fourteen models a page of their own. The longer chapters on nature, history, space and contests stay in the free web edition.',
    'Los capítulos 1 a 5 empiezan con algo que construir: un dardo de papel normal, un anillo, un helicóptero de arce y una mariposa de papel. Lo vuelas, lees lo que pasó, cambias una cosa y vuelves a volarlo. Los capítulos 6 y 7 usan lo que has construido. Un anexo dedica una página a cada uno de los catorce modelos. Los capítulos más largos sobre naturaleza, historia, espacio y concursos siguen en la edición digital gratuita.',
    'Главы 1–5 начинаются с того, что нужно сделать: дротик из обычного листа, кольцо, кленовую крылатку и бумажную бабочку. Вы запускаете модель, разбираете, что произошло, меняете одну деталь и запускаете снова. Главы 6 и 7 работают с тем, что вы сделали. В приложении у каждой из четырнадцати моделей своя страница. Длинные главы о природе, истории, космосе и соревнованиях остаются в бесплатном веб-издании.',
  ),
  annex: w('Annex: every model, A1–A8, B1–B3 and F1–F3', 'Anexo: todos los modelos, A1–A8, B1–B3 y F1–F3', 'Приложение: все модели, A1–A8, B1–B3 и F1–F3'),
  edition: w('The edition', 'La edición', 'Издание'),
  facts: [
    [w('Format', 'Formato', 'Формат'), w('210 × 279 mm. It also prints at 100% on A4 and US Letter.', '210 × 279 mm. También se imprime al 100 % en A4 y Carta.', '210 × 279 мм. Печатается в масштабе 100% на A4 и US Letter.')],
    [w('Pages', 'Páginas', 'Страницы'), w('128 in the current proof, sewn binding planned. The final extent is set with the publisher.', '128 en la prueba actual, con encuadernación cosida prevista. La extensión final se decide con la editorial.', '128 в текущей вёрстке, планируется шитый переплёт. Окончательный объём определяется вместе с издательством.')],
    [w('Reader', 'Lectores', 'Читатели'), w('Written for ages 8 to 12 reading on their own. Younger children build with a helper, and adults go deeper.', 'Pensado para niños y niñas de 8 a 12 años que leen solos. Los más pequeños construyen con ayuda y los adultos profundizan.', 'Для детей 8–12 лет, которые читают сами. Младшие собирают модели со взрослым, а взрослые узнают больше.')],
    [w('Languages', 'Idiomas', 'Языки'), w('English, Spanish and Russian. The Spanish and Russian texts are drafts awaiting a native-speaker review.', 'Inglés, español y ruso. Los textos en español y ruso son borradores pendientes de revisión por hablantes nativos.', 'Английский, испанский и русский. Испанский и русский тексты — черновики, их ещё проверят носители языка.')],
    [w('Status', 'Estado', 'Статус'), w('The English manuscript and layout are complete. Flight tests, family and classroom trials and photography come next.', 'El manuscrito y la maquetación en inglés están terminados. Ahora siguen las pruebas de vuelo, las pruebas con familias y en el aula, y las fotografías.', 'Рукопись и вёрстка на английском готовы. Дальше — лётные испытания, проверка в семьях и классах и фотосъёмка.')],
    [w('Rights', 'Derechos', 'Права'), w('© Open Flight. The web edition is free to read and print at home and in class. Rights in the printed edition, its new material and its translations are available to license.', '© Open Flight. La edición digital se puede leer e imprimir gratis en casa y en el aula. Los derechos de la edición impresa, de su material nuevo y de sus traducciones están disponibles para licenciar.', '© Open Flight. Веб-издание можно бесплатно читать и печатать дома и в классе. Права на печатное издание, его новые материалы и переводы доступны для лицензирования.')],
  ],
  write: w('Write to us →', 'Escríbenos →', 'Написать нам →'),
  partners: w(
    'We are looking for a publishing partner for the printed edition, starting with Spanish, and for schools, museums and makers who want to test it.',
    'Buscamos una editorial para la edición impresa, empezando por la edición en español, y escuelas, museos y makers que quieran probarla.',
    'Мы ищем издательство для печатного издания, начиная с испанского, а также школы, музеи и мейкеров, готовых его испытать.',
  ),
  honest: w(
    'Every design in the book will be built, flown and photographed before the book is printed. Until then, each plate says which numbers are estimates.',
    'Cada modelo del libro se construirá, se volará y se fotografiará antes de imprimirlo. Hasta entonces, cada lámina indica qué números son estimaciones.',
    'Перед печатью каждую модель из книги соберут, испытают в полёте и сфотографируют. А пока на каждой таблице отмечено, какие числа являются оценками.',
  ),
  now: w('Print & Play now', 'Imprime y vuela ya', 'Печатайте и запускайте уже сейчас'),
  nowText: w(
    'Every model in the book can already be printed free at home or in class.',
    'Todos los modelos del libro ya se pueden imprimir gratis en casa o en el aula.',
    'Все модели из книги уже можно бесплатно распечатать дома или в классе.',
  ),
  look: w('Look inside', 'Echa un vistazo', 'Заглянуть внутрь'),
  lookNote: w('Pages from an earlier preview of the web edition, in English. Photographs from Pixabay; drawings from the printable geometry.', 'Páginas de una vista previa anterior de la edición digital, en inglés. Fotografías de Pixabay; dibujos a partir de la geometría imprimible.', 'Страницы раннего пробного выпуска веб-издания на английском. Фотографии с Pixabay; рисунки построены по геометрии шаблонов.'),
  booklet: w('Download the complete family booklet (A4 PDF)', 'Descarga el cuadernillo familiar completo (PDF A4)', 'Скачать полный семейный буклет (PDF A4)'),
}

function bookBody(lang, base) {
  const t = key => bookWords[key][lang]
  return `<section class="product-hero">
    <div><p class="eyebrow">${t('status')}</p><h1>${e(book.title[lang])}</h1>
      <p class="plate-lineage">${e(t('subtitle'))}</p>
      <p class="lede">${e(book.promise[lang])}</p>
      ${link(base + publicPath('home', lang) + '#contents', t('read'), 'button primary')}</div>
    <div class="product-art book-cover-art"><img src="${base}assets/book/preview/cover.webp" alt="${e(book.title[lang])}" decoding="async"></div>
  </section>
  <section class="book-look" aria-labelledby="look-title"><h2 id="look-title">${t('look')}</h2><p class="hint">${t('lookNote')}</p>
    <ol class="look-inside">${['toc', 'nature', 'nature-insects', 'game-spot-the-trim', 'plate-A1', 'history-timeline', 'space', 'contests-records', 'index'].map(id => `<li><a href="${base}assets/book/preview/${id}.webp"><img src="${base}assets/book/preview/${id}.webp" alt="" loading="lazy" decoding="async"></a></li>`).join('')}</ol></section>
  <section class="book-inside" aria-labelledby="inside-title"><h2 id="inside-title">${t('inside')}</h2>
    <p>${e(t('insideNote'))}</p>
    <ol class="book-chapters">${bookWords.printedChapters.map((title, i) => `<li><span class="contents-number">${i + 1}</span><div><strong>${e(title[lang])}</strong></div></li>`).join('')}<li><span class="contents-number">A</span><div><strong>${e(t('annex'))}</strong></div></li></ol></section>
  <section class="book-edition" aria-labelledby="edition-title"><h2 id="edition-title">${t('edition')}</h2>
    <dl class="plate-glance">${bookWords.facts.map(([label, value]) => '<div><dt>' + e(label[lang]) + '</dt><dd>' + e(value[lang]) + '</dd></div>').join('')}</dl>
    <p>${t('honest')}</p>
    <p>${e(t('partners'))} ${link(base + publicPath('contact', lang), t('write'), 'text-link')}</p></section>
  <section class="book-now" aria-labelledby="now-title"><h2 id="now-title">${t('now')}</h2><p>${t('nowText')}</p>
    <ul class="plate-links"><li>${link(base + publicPath('print', lang), copy.print[lang], 'text-link')}</li>
    <li>${link(base + navHref('book', lang, '').replace(/^\.?\//, ''), siteLabels.book[lang], 'text-link')}</li>
    <li>${link(base + 'assets/book/samples/flight-book-A4-' + lang + '.pdf', t('booklet'), 'text-link')}</li></ul></section>`
}

export const contactAddress = 'hello@openflight.design'

const contactWords = {
  title: w('Contact', 'Contacto', 'Контакты'),
  lede: w(
    'Publishers, teachers, museums, press, or a flight you want to tell us about: write here and Kevin, who makes Open Flight, will answer.',
    'Editoriales, docentes, museos, prensa o un vuelo que quieras contarnos: escribe aquí y te responderá Kevin, que hace Open Flight.',
    'Издательства, учителя, музеи, пресса или полёт, о котором хочется рассказать: напишите здесь, и вам ответит Кевин, автор Open Flight.',
  ),
  direct: w('Or email', 'O escribe a', 'Или напишите на'),
  name: w('Your name', 'Tu nombre', 'Ваше имя'),
  email: w('Your email', 'Tu correo', 'Ваш email'),
  organisation: w('Organisation (optional)', 'Organización (opcional)', 'Организация (необязательно)'),
  topic: w('About', 'Tema', 'Тема'),
  topics: [
    ['publishing', w('Publishing the book', 'Publicar el libro', 'Издание книги')],
    ['school', w('A school or classroom', 'Una escuela o un aula', 'Школа или класс')],
    ['museum', w('A museum or science centre', 'Un museo o centro de ciencia', 'Музей или научный центр')],
    ['press', w('Press', 'Prensa', 'Пресса')],
    ['flight', w('How a model flew', 'Cómo voló un modelo', 'Как летала модель')],
    ['other', w('Something else', 'Otra cosa', 'Другое')],
  ],
  message: w('Message', 'Mensaje', 'Сообщение'),
  send: w('Send', 'Enviar', 'Отправить'),
  sending: w('Sending…', 'Enviando…', 'Отправляем…'),
  sent: w('Thank you. Your message is on its way, and the reply will come to the email you gave.', 'Gracias. Tu mensaje está en camino y la respuesta llegará al correo que has indicado.', 'Спасибо. Сообщение отправлено, ответ придёт на указанный email.'),
  invalid: w('Please add your name, a valid email and a message of at least a few words.', 'Añade tu nombre, un correo válido y un mensaje de al menos unas palabras.', 'Укажите имя, правильный email и сообщение хотя бы из нескольких слов.'),
  failed: w('The message could not be sent. Please email', 'No se ha podido enviar el mensaje. Escribe a', 'Сообщение не отправилось. Напишите, пожалуйста, на'),
  kids: w('Children: please ask a grown-up to write for you. No names or photos of children are needed.', 'Niños y niñas: pedid a una persona adulta que escriba por vosotros. No hacen falta nombres ni fotos de menores.', 'Дети, попросите взрослого написать за вас. Имена и фото детей не нужны.'),
  privacy: w('Your name, email and message are used only to reply to you. They are delivered by email through Cloudflare and are not stored on this site or shared.', 'Tu nombre, correo y mensaje solo se usan para responderte. Se entregan por correo electrónico a través de Cloudflare y no se guardan en esta web ni se comparten.', 'Имя, email и сообщение используются только для ответа вам. Они доставляются по почте через Cloudflare, не хранятся на сайте и никому не передаются.'),
}

function contactBody(lang, base) {
  const t = key => contactWords[key][lang]
  const mail = `<a class="text-link" href="mailto:${contactAddress}">${contactAddress}</a>`
  const field = (id, label, input) => `<p class="contact-field"><label class="form-label" for="contact-${id}">${e(label)}</label>${input}</p>`
  return `<section class="product-hero product-hero-text"><div>
    <h1>${e(t('title'))}</h1><p class="lede">${e(t('lede'))}</p>
    <p>${e(t('direct'))} ${mail}</p></div></section>
  <form class="contact-form panel" id="contact-form" method="post" action="/api/contact" lang="${lang}" novalidate
    data-sending="${e(t('sending'))}" data-sent="${e(t('sent'))}" data-invalid="${e(t('invalid'))}" data-failed="${e(t('failed'))}" data-address="${contactAddress}">
    <input type="hidden" name="lang" value="${lang}">
    <p class="contact-trap" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></p>
    ${field('name', t('name'), '<input id="contact-name" name="name" autocomplete="name" maxlength="120" required>')}
    ${field('email', t('email'), '<input id="contact-email" name="email" type="email" autocomplete="email" maxlength="200" required>')}
    ${field('organisation', t('organisation'), '<input id="contact-organisation" name="organisation" autocomplete="organization" maxlength="160">')}
    ${field('topic', t('topic'), '<select id="contact-topic" name="topic">' + contactWords.topics.map(([value, label]) => `<option value="${value}">${e(label[lang])}</option>`).join('') + '</select>')}
    ${field('message', t('message'), '<textarea id="contact-message" name="message" rows="8" maxlength="5000" required></textarea>')}
    <p class="hint">${e(t('kids'))}</p>
    <p class="hint">${e(t('privacy'))}</p>
    <p><button class="button primary" type="submit">${e(t('send'))}</button></p>
    <p class="contact-status" role="status" aria-live="polite"></p>
  </form>`
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
  } else if (route === 'contact') {
    trail.push({ label: siteLabels.contact[lang], route })
    title = siteLabels.contact[lang] + ' · Open Flight'
    description = products.contact.description[lang]
    body = contactBody(lang, base)
    script = 'contact-page.js'
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

