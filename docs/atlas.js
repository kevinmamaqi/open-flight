import { ru, es } from './atlas-copy.js?v=674464fb115d'
import { currentLocale, homeURL, localizedLinks } from './atlas-nav.js?v=674464fb115d'
import { fieldModel, studioLink, foldedLink } from './atlas-guide.js?v=674464fb115d'
import { sheetIdFor, sheetPath } from './family-sheets.js?v=674464fb115d'
import { normalizeBook } from './book-model.js?v=674464fb115d'
import { recordBookEvent } from './book-metrics.js?v=674464fb115d'

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
$('hero-book').href = $('nav-book').href = bookLink
$('book-cover-image').src = './assets/atlas/book-cover-' + lang + '.png' + new URL(import.meta.url).search
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
$('lesson-file').href = './library/family-lesson-' + lang + '.html'
const order = [
  'monarch',
  'boeing-747',
  'morpho',
  'tupolev-tu144',
  'swallowtail',
  'douglas-dc3',
  'ilyushin-il62',
]
const models = order.map((id) => fieldModel(id, lang))
const select = $('download-model')
$('download-paper').querySelector('[value=US_LETTER]').textContent = t(
  'US Letter',
  'Carta (EE. UU.)',
  'US Letter',
)
for (const m of [...models].sort(
  (a, b) => Number(a.family === 'airplane') - Number(b.family === 'airplane'),
)) {
  const a = document.createElement('a')
  a.href = m.studio
  a.textContent = m.family === 'airplane' ? m.inspiration : m.name
  $(m.family === 'airplane' ? 'plane-links' : 'butter-links').append(a)
  select.add(new Option(m.family === 'airplane' ? m.name + ' · ' + m.inspiration : m.name, m.id))
}
let pos = 0
function display() {
  const m = models[pos],
    name = m.family === 'airplane' ? m.inspiration : m.name
  $('specimen').src = m.image
  $('specimen').alt = t('Open design ', 'Abrir el diseño ', 'Открыть модель ') + name
  $('hero-link').href = $('specimen-name').href = m.studio
  $('specimen-name').textContent = name + ' ↗'
  $('specimen-family').textContent =
    m.family === 'airplane'
      ? t('Whole-sheet airplane', 'Avión de hoja entera', 'Бумажный самолёт')
      : t('Butterfly glider', 'Planeador mariposa', 'Планер-бабочка')
  $('specimen-detail').textContent = m.family === 'airplane' ? m.name : m.inspiration
  $('specimen-count').textContent = String(pos + 1).padStart(2, '0') + ' / 07'
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
function download() {
  const butterfly = models.find(m=>m.id===select.value)?.family==='butterfly'
  $('construction-field').hidden=!butterfly
  const id = sheetIdFor(select.value, $('construction').value)
  const path = sheetPath(id, $('download-paper').value, lang)
  $('download').href = './' + path
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
