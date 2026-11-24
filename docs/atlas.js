import { ru, es } from './atlas-copy.js?v=50000cb495d7'
import { currentLocale, homeURL, localizedLinks } from './atlas-nav.js?v=50000cb495d7'
import { fieldModel, studioLink, foldedLink } from './atlas-guide.js?v=50000cb495d7'

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
  a.href = a.dataset.route === 'airplane' ? studioLink('boeing-747',lang) : foldedLink('monarch',lang)
$('classic-butterfly').href=studioLink('monarch',lang)
$('compare-link').href = './compare.html?lang=' + lang
$('flight-link').href = studioLink('boeing-747', lang, true)
$('references').href = './references.html?lang=' + lang
$('roadmap-link').href = './next.html?lang=' + lang
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
  a.href = m.family === 'butterfly' ? foldedLink(m.id,lang) : m.studio
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
  $('hero-link').href = $('specimen-name').href = m.family === 'butterfly' ? foldedLink(m.id,lang) : m.studio
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
  const tag=butterfly && $('construction').value==='k1' ? '-k1' : ''
  const file = select.value + tag + '-' + $('download-paper').value + '-' + lang + '.pdf'
  $('download').href = './library/' + file
  $('download').download = file
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
