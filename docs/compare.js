import { compareModels, designIds, fieldModel } from './atlas-guide.js?v=4042ad8d9b65'
import { currentLocale, homeURL, localizedLinks } from './atlas-nav.js?v=4042ad8d9b65'
const lang = currentLocale(),
  i = { en: 0, es: 1, ru: 2 }[lang]
const t = (en, es, ru) => [en, es, ru][i],
  $ = (id) => document.getElementById(id)
const el = (tag, txt, cls) => {
  const n = document.createElement(tag)
  if (txt != null) n.textContent = txt
  if (cls) n.className = cls
  return n
}
const texts = {
  skip: t('Skip to comparison', 'Ir a la comparación', 'К сравнению'),
  tag: t('At the worktable', 'En la mesa de trabajo', 'На рабочем столе'),
  title: t('Which two will you fly?', '¿Cuáles vas a lanzar?', 'Какие две модели запустим?'),
  intro: t(
    'Choose two gliders. Look at what changes in the paper, predict a landing, then put them to the same test.',
    'Elige dos planeadores. Mira qué cambia en el papel, predice dónde aterrizarán y ponlos a prueba.',
    'Выбери два планера. Сравни бумажные детали, предположи, куда они полетят, и проведи один опыт для обоих.',
  ),
  'test-tag': t('Try it on paper', 'Pruébalo en papel', 'Опыт с бумагой'),
  method: t(
    'Use the same paper stock, builder, release height and direction. Alternate A and B for five launches each. Mark every first touch, including misses. A design pair changes several features at once. To test one fold, make two copies of the same design and change only that fold.',
    'Usa el mismo tipo de papel, la misma persona, altura y dirección de salida. Alterna A y B hasta completar cinco lanzamientos de cada uno. Marca el primer contacto, también los fallos. Entre dos diseños cambian varios rasgos. Para estudiar un solo pliegue, haz dos copias del mismo diseño y cambia solo ese pliegue.',
    'Возьми одинаковую бумагу. Пусть один человек запускает оба планера с одной высоты и в одном направлении. Чередуй A и B, по пять запусков каждого. Отмечай все первые касания, включая промахи. У разных моделей меняется сразу несколько деталей. Для проверки одного сгиба сделай две копии одной модели.',
  ),
  evidence: t(
    'The numbers describe the original printable templates. Flight differences are questions for your experiment. Measure the finished glider’s balance point separately from the nose-clip mark.',
    'Las medidas corresponden a las plantillas originales. Las diferencias de vuelo se investigan con el experimento. Mide el punto de equilibrio del planeador terminado por separado de la marca del clip.',
    'Числа относятся к исходным шаблонам. Различия в полёте предстоит проверить. Точку равновесия готового планера измеряй отдельно от отметки скрепки.',
  ),
  print: t(
    'Print this comparison and scorecard',
    'Imprimir la comparación y la ficha',
    'Распечатать сравнение и карточку',
  ),
}
for (const [id, txt] of Object.entries(texts)) $(id).textContent = txt
document.title = texts.title + ' · Open Flight'
document.documentElement.lang = lang
$('home').href = $('foot-home').href = homeURL(lang)
$('print').onclick = () => window.print()
const url = new URL(location.href)
let left = designIds.includes(url.searchParams.get('left')) ? url.searchParams.get('left') : 'monarch'
let right = designIds.includes(url.searchParams.get('right')) ? url.searchParams.get('right') : 'morpho'
if (left === right) right = designIds.find((id) => id !== left)
const presets = [
  ['monarch', 'morpho', t('Two butterflies', 'Dos mariposas', 'Две бабочки')],
  ['boeing-747', 'tupolev-tu144', t('Two airplanes', 'Dos aviones', 'Два самолёта')],
  ['swallowtail', 'douglas-dc3', t('Butterfly + airplane', 'Mariposa y avión', 'Бабочка и самолёт')],
]
for (const [a, b, name] of presets) {
  const button = el('button', name)
  button.type = 'button'
  button.onclick = () => {
    left = a
    right = b
    render()
  }
  $('presets').append(button)
}
function card(model, index) {
  const a = el('article', null, 'compare-card ' + model.family),
    header = el('div', null, 'compare-art')
  const label = el(
      'label',
      (index ? 'B' : 'A') + ' · ' + t('Choose design', 'Elige un diseño', 'Выбери модель'),
    ),
    select = el('select')
  select.id = index ? 'right-model' : 'left-model'
  label.htmlFor = select.id
  for (const id of designIds) {
    const m = fieldModel(id, lang)
    select.add(new Option(m.name + ' · ' + m.inspiration, id))
  }
  select.value = model.id
  select.onchange = () => {
    const other = index ? left : right
    if (select.value === other) {
      if (index) left = right
      else right = left
    }
    if (index) right = select.value
    else left = select.value
    render()
    $(select.id).focus()
  }
  const image = el('img')
  image.src = model.image
  image.alt = ''
  image.width = 280
  image.height = 126
  header.append(label, select, image)
  const detail = el('div', null, 'compare-detail')
  detail.append(
    el('p', model.technique, 'over'),
    el('h2', model.name),
    el('p', model.inspiration, 'spec-name'),
    el('p', model.shape),
    el('h3', t('Bring to the table', 'Materiales', 'Материалы')),
    el('p', model.materials),
  )
  const dl = el('dl', null, 'measure-list')
  for (const item of model.settings) {
    const row = el('div')
    row.append(el('dt', item.label), el('dd', item.value + (item.unit === '°' ? '' : ' ') + item.unit))
    dl.append(row)
  }
  const action = el('a', t('Build this model ↗', 'Construir este modelo ↗', 'Собрать модель ↗'), 'quiet')
  action.href = model.studio
  detail.append(
    dl,
    el('h3', t('Change one thing', 'Cambia una cosa', 'Измени одну деталь')),
    el('p', model.experiment),
    action,
  )
  if(model.family==='butterfly'){
    const choice=el('p'),link=el('a',t('Compare this tabbed build with a folded body ↗','Comparar estas aletas con el cuerpo plegado ↗','Сравнить эту модель с вариантом со складным корпусом ↗'),'quiet')
    link.href='./keel.html?' + new URLSearchParams({ species: model.id, lang }) + '#comparison';choice.append(link);detail.append(choice)
  }
  a.append(header, detail)
  return a
}
function render() {
  const pair = compareModels(left, right, lang)
  $('comparison').replaceChildren(...pair.models.map(card))
  $('test-heading').textContent = pair.question
  $('trial-grid').replaceChildren(
    ...pair.models.map((m, i) => {
      const row = el('div', null, 'trial-line')
      row.append(el('strong', (i ? 'B' : 'A') + ' · ' + m.name))
      for (let n = 1; n <= 5; n++) row.append(el('span', String(n)))
      return row
    }),
  )
  const next = new URL(location.href)
  next.searchParams.set('left', left)
  next.searchParams.set('right', right)
  next.searchParams.set('lang', lang)
  history.replaceState(null, '', next)
  localizedLinks(lang)
  Array.from($('presets').children).forEach((btn, i) =>
    btn.setAttribute('aria-pressed', String(left === presets[i][0] && right === presets[i][1])),
  )
}
render()
