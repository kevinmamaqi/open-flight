import { flightObjects } from './assets/objects/activities.js?v=9b28ac5f5814'
import { ru, es } from './atlas-copy.js?v=9b28ac5f5814'
import { currentLocale, homeURL, localizedLinks } from './atlas-nav.js?v=9b28ac5f5814'
import { fieldModel, studioLink, foldedLink } from './atlas-guide.js?v=9b28ac5f5814'
import { sheetCatalog, sheetIdFor, sheetPath } from './family-sheets.js?v=9b28ac5f5814'
import { normalizeBook } from './book-model.js?v=9b28ac5f5814'
import { recordBookEvent } from './book-metrics.js?v=9b28ac5f5814'

const assetVersion = new URL(import.meta.url).search
const fragment = new URLSearchParams(location.hash.slice(1))
if (fragment.has('grant') || (fragment.has('design') && fragment.has('revision'))) {
  location.replace(new URL('./studio.html' + location.search + location.hash, import.meta.url))
}
const lang = currentLocale()
const staticLanguage = location.pathname.match(/\/(es|ru)\.html$/)?.[1]
if (staticLanguage && staticLanguage !== lang) {
  location.replace(homeURL(lang) + location.hash)
}
const t = (en, es, ru) => ({ en, es, ru })[lang]
const $ = (id) => document.getElementById(id)
document.documentElement.lang = lang
const translation = { ru, es }[lang]
if (translation) {
  document.title = t(
    'Open Flight · The paper flight workshop',
    'Open Flight · Taller de vuelo en papel',
    'Open Flight · Мастерская бумажных полётов',
  )
  document.querySelector('meta[name=description]').content = translation.intro
  for (const node of document.querySelectorAll('[data-t]'))
    if (translation[node.dataset.t]) node.textContent = translation[node.dataset.t]
}
localizedLinks(lang)
for (const a of document.querySelectorAll('.wordmark')) a.href = homeURL(lang)
for (const a of document.querySelectorAll('[data-route]'))
  a.href = a.dataset.route === 'airplane' ? studioLink('boeing-747', lang) : studioLink('monarch', lang)
$('folded-butterfly').href = foldedLink('monarch', lang)
const bookLink = './book.html?lang=' + lang
$('nav-book').href = bookLink
$('book-sample').href = bookLink + '&p=4'
$('book-log-image').src = './assets/atlas/book-log-' + lang + '.png' + assetVersion
$('book-cover-image').src = './assets/atlas/book-cover-' + lang + '.png' + assetVersion
const pilot = $('home-pilot')
function updateHomeBook() {
  const name = pilot.value.trim()
  try {
    normalizeBook({pilot:name})
    pilot.setCustomValidity('')
  } catch {
    pilot.setCustomValidity(t('Use up to 40 Latin or Cyrillic characters.', 'Escribe hasta 40 caracteres en alfabeto latino o cirílico.', 'Введите до 40 символов латиницей или кириллицей.'))
  }
  $('home-cover-pilot').textContent = name
  $('home-cover-pilot').hidden = !name
  $('book-link').href = bookLink + (name ? '#' + new URLSearchParams({pilot:name}) : '')
}
pilot.addEventListener('input',updateHomeBook)
$('book-link').addEventListener('click',event => {
  if (!pilot.reportValidity()) event.preventDefault()
})
$('home-book-form').addEventListener('submit',event => {
  event.preventDefault()
  if (pilot.reportValidity()) location.assign($('book-link').href)
})
updateHomeBook()
recordBookEvent('home')
$('compare-link').href = './compare.html?lang=' + lang
$('flight-link').href = studioLink('boeing-747', lang, true)
$('references').href = './references.html?lang=' + lang
$('motor-link').href = './motor.html?lang=' + lang
$('classroom-link').href = './classroom.html?lang=' + lang
$('objects-link').href = './flight-objects.html?lang=' + lang
$('lesson-file').href = './library/family-lesson-' + lang + '.html'
const order = [
  'monarch',
  'boeing-747',
  'ring',
  'morpho',
  'tupolev-tu144',
  'samara',
  'swallowtail',
  'douglas-dc3',
  'ilyushin-il62',
  'tandem',
]
const models = order.map((id) => fieldModel(id, lang))
const lab = flightObjects(lang)
const activities = new Map(lab.activities.map(item => [item.id, item]))
$('object-family').href = $('objects-link').href
const select = $('download-model')
$('download-paper').querySelector('[value=US_LETTER]').textContent = t(
  'US Letter',
  'Carta (EE. UU.)',
  'US Letter',
)
for (const family of ['butterfly', 'airplane', 'object']) {
  for (const m of models.filter(model => model.family === family)) {
    const label = family === 'airplane' ? m.inspiration : m.name
    const a = family === 'object' ? document.querySelector('[data-object="' + m.id + '"]') : document.createElement('a')
    a.href = m.studio
    a.textContent = label
    if (family !== 'object') $(family === 'airplane' ? 'plane-links' : 'butter-links').append(a)
    select.add(new Option(family === 'airplane' ? m.name + ' · ' + label : label, m.id))
  }
}
const patternLabel = $('specimen-sheet').textContent
let pos = 0
function display() {
  const m = models[pos],
    name = m.family === 'airplane' ? m.inspiration : m.name
  const activity = activities.get(m.id)
  $('specimen-sheet').href = activity
    ? './' + lab.packets.A4 + assetVersion + '#page=' + activity.page
    : './' + sheetPath(sheetIdFor(m.id, 'w1'), 'A4', lang) + assetVersion
  $('specimen-sheet').textContent = activity ? t('Open the activity (A4 PDF)', 'Ver la actividad (PDF A4)', 'Открыть задание (PDF, A4)') : patternLabel
  $('specimen').src = m.family === 'butterfly' ? './assets/viewer/' + m.id + '-natural.webp' : m.image
  $('specimen').alt = t('Open design ', 'Abrir el diseño ', 'Открыть модель ') + name
  $('hero-link').href = $('specimen-name').href = m.studio
  $('specimen-name').textContent = name + ' ↗'
  $('specimen-family').textContent =
    m.family === 'airplane'
      ? t('Whole-sheet airplane', 'Avión de hoja entera', 'Бумажный самолёт')
      : t('Butterfly glider', 'Planeador mariposa', 'Планер-бабочка')
  if (activity) $('specimen-family').textContent = t('Experimental design', 'Diseño experimental', 'Экспериментальная модель')
  $('specimen-detail').textContent = m.family === 'airplane' ? m.name : m.inspiration
  $('specimen-count').textContent = String(pos + 1).padStart(2, '0') + ' / ' + models.length
  document.querySelector('.showcase').dataset.family = m.family
}
for (const [id, step, label] of [
  ['back', -1, t('Previous design', 'Diseño anterior', 'Предыдущая модель')],
  ['next', 1, t('Next design', 'Diseño siguiente', 'Следующая модель')],
]) {
  $(id).setAttribute('aria-label', label)
  $(id).onclick = () => {
    pos = (pos + step + models.length) % models.length
    display()
  }
}
display()
const k1Note = $('sheet-note').textContent
const patternAndBack = t('Pattern, reverse side and fold guide', 'Plantilla, reverso y guía de pliegues', 'Выкройка, оборот и схема сгибов')
function download() {
  const butterfly = models.find(m=>m.id===select.value)?.family==='butterfly'
  $('construction-field').hidden=!butterfly
  const activity = activities.get(select.value)
  if (activity) {
    const path = lab.packets[$('download-paper').value]
    $('sheet-contents').textContent = activity.title + ' · ' + t('Page ', 'Página ', 'Страница ') + activity.page + t(' of 3', ' de 3', ' из 3')
    $('sheet-note').textContent = activity.materials + ' ' + t('Experimental design. The PDF includes all three activities.', 'Diseño experimental. El PDF incluye las tres actividades.', 'Экспериментальная модель. В PDF входят все три задания.')
    $('download').href = './' + path + assetVersion + '#page=' + activity.page
    $('download').download = path.split('/').pop()
    return
  }
  const id = sheetIdFor(select.value, $('construction').value)
  const { pages, construction } = sheetCatalog.find(sheet => sheet.id === id)
  const pageUnit = t(pages === 1 ? 'page' : 'pages', pages === 1 ? 'página' : 'páginas',
    pages === 1 ? 'страница' : pages < 5 ? 'страницы' : 'страниц')
  const contents = construction === 'w1'
    ? t('Cut pattern with adjustable tabs', 'Plantilla con aletas ajustables', 'Выкройка с регулируемыми язычками')
    : patternAndBack
  const notes = {
    k1: k1Note,
    k2: t('Experimental fold. Use 120 g/m² paper and two 33 mm clips. A measured comparison with K1 is still pending.',
      'Pliegue experimental. Usa papel de 120 g/m² y dos clips de 33 mm. Aún falta comparar sus vuelos con los del K1 y medirlos.',
      'Экспериментальный сгиб. Возьми бумагу 120 г/м² и две скрепки по 33 мм. Сравнение с K1 в полёте ещё предстоит.'),
    w1: t('Start with both tabs level. Mark five landings, raise one tab slightly and repeat from the same spot.',
      'Empieza con las dos aletas a ras. Marca cinco aterrizajes, levanta un poco una aleta y repite desde el mismo sitio.',
      'Выровняй оба язычка. Отметь пять посадок, чуть подними один язычок и повтори запуски с того же места.'),
    'whole-sheet': t('Print page 1 at 100%. Check that all four sides of the cut border are visible before cutting.',
      'Imprime la página 1 al 100 %. Comprueba que se ven los cuatro lados del borde antes de recortar.',
      'Напечатай страницу 1 в масштабе 100 %. Перед тем как вырезать, проверь, что видны все четыре стороны рамки.'),
  }
  $('sheet-contents').textContent = pages + ' ' + pageUnit + ' · ' + contents
  $('sheet-note').textContent = notes[construction]
  const path = sheetPath(id, $('download-paper').value, lang)
  $('download').href = './' + path + assetVersion
  $('download').download = path.split('/').pop()
}
$('construction').onchange = download
select.onchange = download
$('download-paper').onchange = download
download()
async function learning() {
  const response = await fetch(new URL('./assets/atlas/learning.json', import.meta.url))
  if (!response.ok) return
  const rows = (await response.json())[lang].families
  for (const [i, row] of rows.entries()) {
    const n = $('learning-notes').children[i]
    n.querySelector('h3').textContent = row.label
    n.querySelector('p').textContent = row.prompt
  }
}
learning().catch(() => {})
