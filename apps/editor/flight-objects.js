import { currentLocale, localizedLinks } from './atlas-nav.js'
import { flightObjects } from './assets/objects/activities.js'
import { objectCopy } from './flight-objects-copy.js'

const $ = id => document.getElementById(id)
const lang = currentLocale()
const copy = objectCopy[lang]
const lab = flightObjects(lang)
const url = new URL(location.href)
const selected = lab.activities.find(item => item.id === url.searchParams.get('model')) ?? lab.activities[0]
document.documentElement.lang = lang
document.title = selected.title + ' · ' + copy.title + ' · Open Flight'

function element(tag, text) {
  const node = document.createElement(tag)
  node.textContent = text
  return node
}
function link(label, url) {
  const a = element('a', label)
  a.href = url
  return a
}

for (const id of ['skip', 'title', 'intro', 'build', 'experiment', 'why', 'fix', 'size', 'more', 'nature', 'evidence'])
  $(id).textContent = copy[id]
$('picker').setAttribute('aria-label', copy.select)
for (const item of lab.activities) {
  const next = new URL(url)
  next.searchParams.set('model', item.id)
  next.searchParams.set('lang', lang)
  const a = link('', next.href)
  a.dataset.model = item.id
  a.append(element('small', copy.paperTypes[item.sheet]), element('strong', item.title))
  if (selected.id === item.id) a.setAttribute('aria-current', 'page')
  $('picker').append(a)
}
$('activity').dataset.model = selected.id
$('name').textContent = selected.title
$('question').textContent = selected.question
$('art').src = './' + selected.illustration
$('materials').textContent = selected.materials
$('steps').replaceChildren(...selected.steps.map(step => element('li', step)))
$('original').href = selected.source.url
$('original').textContent = selected.source.label + ' ↗'
$('svg').href = './' + selected.illustration
$('svg').textContent = copy.drawing
$('activity-book').textContent = copy.book
$('activity-classroom').textContent = copy.classroom
$('trial').textContent = selected.test
$('physics').textContent = selected.physics
$('recovery').textContent = selected.recovery
$('packet').textContent = copy.print
$('print-note').textContent = copy.printNote + ' ' + copy.page + ' ' + selected.page + '.'
$('kit').textContent = copy.kit
$('credits').textContent = copy.credit
$('paper-size').options[1].textContent = copy.letter
const initialPaper = url.searchParams.get('paper')
if (Object.hasOwn(lab.packets, initialPaper)) $('paper-size').value = initialPaper
function choosePaper() {
  const paper = $('paper-size').value
  $('packet').href = './' + lab.packets[paper]
  const size = paper === 'A4' ? 'a4' : 'letter'
  $('activity-book').href = './book.html?' + new URLSearchParams({lang, paper: size, addActivity: selected.id})
  $('activity-classroom').href = './classroom.html?' + new URLSearchParams({lang, paper: size, objects: '1'})
  for (const a of $('picker').children) {
    const next = new URL(a.href)
    next.searchParams.set('paper', paper)
    a.href = next.href
  }
}
$('paper-size').addEventListener('change', () => {
  const next = new URL(location.href)
  next.searchParams.set('paper', $('paper-size').value)
  history.replaceState(null, '', next)
  choosePaper()
  localizedLinks(lang)
})
choosePaper()
$('activity').hidden = false
localizedLinks(lang)
$('more-intro').textContent = copy.moreIntro
$('source-review').textContent = copy.review
for (const ref of lab.references) {
  if (ref.asset) {
    if (selected.id !== 'samara') continue
    $('field').hidden = false
    const frame = element('figure', '')
    const img = document.createElement('img')
    img.src = './' + ref.asset
    img.alt = ref.motion
    img.loading = 'lazy'
    const large = link('', img.src)
    large.setAttribute('aria-label', copy.full + ' · ' + ref.title)
    large.append(img)
    const caption = element('figcaption', '')
    caption.append(element('p', ref.motion), link(ref.title, ref.url), ' · ' + ref.creator + ' · ', link(ref.policy, ref.licenseUrl))
    frame.append(large, caption)
    $('media').append(frame)
  } else {
    const a = link('', ref.url)
    a.append(element('strong', ref.title + ' ↗'), element('span', ref.creator), element('p', ref.motion))
    $('sources').append(a)
  }
}
