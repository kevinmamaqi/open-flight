// Butterfly lab for K3, the dart butterfly: choose a species, span, colors and paper, read the
// balance estimate and download the three-page sheet. Everything is drawn in the browser.
// The page keeps its /costa address so links to the earlier K2 lab still open it.
import { currentLocale, localizedLinks } from './atlas-nav.js?v=48cc97ad30d5'
import * as api from './browser-workshop.js?v=48cc97ad30d5'
import { sheetName } from './family-sheets.js?v=48cc97ad30d5'
import { appearanceChoices } from './model-appearance.js?v=48cc97ad30d5'
import { bookFromStudio } from './model-studio.js?v=48cc97ad30d5'

const languages = ['en', 'es', 'ru']
const copy = {
  skip: ['Skip to the butterfly', 'Ir a la mariposa', 'К бабочке'],
  eyebrow: ['Folded butterfly · K3', 'Mariposa plegada · K3', 'Складная бабочка · K3'],
  title: ['Dart butterfly', 'Mariposa dardo', 'Бабочка-дротик'],
  intro: [
    'Wings swept back like a paper dart, a doubled front edge, and a folded body with a head that holds two paper clips. It balances before it flies.',
    'Alas hacia atrás como un dardo de papel, un borde delantero doble y un cuerpo plegado con una cabeza que sujeta dos clips. Se equilibra antes de volar.',
    'Крылья отведены назад, как у бумажного дротика, передняя кромка двойная, а сложенный корпус с головой держит две скрепки. Сначала баланс, потом полёт.',
  ],
  species: ['Butterfly', 'Mariposa', 'Бабочка'],
  span: ['Finished wingspan', 'Envergadura final', 'Размах крыльев'],
  colors: ['Wing colors', 'Colores de las alas', 'Окраска крыльев'],
  paper: ['Paper size', 'Tamaño de papel', 'Формат бумаги'],
  letter: ['US Letter', 'Carta', 'US Letter'],
  download: ['Download PDF', 'Descargar PDF', 'Скачать PDF'],
  book: ['Add to a Flight Book', 'Añadir a un libro de vuelo', 'Добавить в книгу полётов'],
  preparing: ['Preparing the PDF…', 'Preparando el PDF…', 'Готовим PDF…'],
  ready: ['PDF ready.', 'PDF listo.', 'PDF готов.'],
  failed: ['The PDF could not be made here.', 'No se pudo crear el PDF.', 'Не удалось создать PDF.'],
  factsTitle: ['Paper, clips and balance', 'Papel, clips y equilibrio', 'Бумага, скрепки и баланс'],
  paperFact: ['Paper', 'Papel', 'Бумага'],
  paperValue: ['120 g/m², wings along the long side', '120 g/m², alas a lo largo del lado largo', '120 г/м², крылья вдоль длинной стороны'],
  clipsFact: ['Clips', 'Clips', 'Скрепки'],
  clipsValue: ['Two 33 mm paper clips', 'Dos clips de 33 mm', 'Две скрепки по 33 мм'],
  balanceFact: ['Balance point', 'Punto de equilibrio', 'Точка баланса'],
  behindNose: ['mm behind the head', 'mm detrás de la cabeza', 'мм за головой'],
  tipFact: ['Wingtip height', 'Altura de las puntas', 'Высота кончиков'],
  aboveBody: ['mm above the body', 'mm sobre el cuerpo', 'мм над корпусом'],
  speedFact: ['Glide speed', 'Velocidad de planeo', 'Скорость планирования'],
  estimate: [
    'Model estimates for 120 g/m² paper and two clips. No K3 flight has been recorded yet. Measure your own balance point before launch.',
    'Estimaciones del modelo para papel de 120 g/m² y dos clips. Aún no hay vuelos de K3 registrados. Mide el punto de equilibrio antes del lanzamiento.',
    'Оценки модели для бумаги 120 г/м² и двух скрепок. Полёты K3 ещё не записаны. Перед запуском найди точку равновесия.',
  ],
  sheetTitle: ['Printed sheet', 'Hoja impresa', 'Лист для печати'],
  sheetHelp: [
    'Page 1 is the cut sheet, page 2 its back for double-sided printing (flip on the short edge), page 3 the build steps.',
    'La página 1 es la hoja para recortar, la 2 su reverso para imprimir a doble cara (girando por el borde corto) y la 3 los pasos.',
    'Страница 1 — лист для вырезания, страница 2 — его оборот для двусторонней печати (переворот по короткому краю), страница 3 — шаги сборки.',
  ],
  caption: ['Finished butterfly, seen from above', 'Mariposa terminada, vista desde arriba', 'Готовая бабочка, вид сверху'],
}
const params = new URLSearchParams(location.search)
const locale = currentLocale()
const tr = (key) => copy[key][languages.indexOf(locale)]
const $ = (id) => document.getElementById(id)
const species = ['monarch', 'morpho', 'swallowtail']

function initialState() {
  const state = { species: 'monarch', paper: 'A4' }
  if (species.includes(params.get('species'))) state.species = params.get('species')
  if (['A4', 'US_LETTER'].includes(params.get('paper'))) state.paper = params.get('paper')
  const choices = appearanceChoices(state.species + '-k3', locale)
  state.appearance_id = choices.some((c) => c.id === params.get('colors')) ? params.get('colors') : choices[0].id
  const span = Number(params.get('span'))
  const { minimum, maximum, step } = api.k3SpanRange
  if (Number.isInteger(span) && span >= minimum && span <= maximum && (span - minimum) % step === 0) state.span_mm = span
  return state
}
let state = initialState()
let plan

function syncAddress() {
  const url = new URL(location.href)
  url.search = new URLSearchParams({
    lang: locale,
    species: plan.species,
    span: String(plan.span_mm),
    colors: plan.appearance_id,
    paper: plan.paper,
  }).toString()
  history.replaceState(null, '', url)
}

function renderControls() {
  const select = $('species')
  select.replaceChildren(
    ...species.map((id) => new Option(sheetName(id + '-k3', locale), id, false, id === plan.species)),
  )
  const colors = $('colors')
  colors.replaceChildren(
    ...appearanceChoices(plan.species + '-k3', locale).map(
      (c) => new Option(c.label, c.id, false, c.id === plan.appearance_id),
    ),
  )
  const span = $('span')
  const { minimum, maximum, step } = api.k3SpanRange
  Object.assign(span, { min: minimum, max: maximum, step, value: plan.span_mm })
  $('span-value').textContent = plan.span_mm + (locale === 'ru' ? ' мм' : ' mm')
  $('paper').value = plan.paper
  $('paper').options[1].textContent = tr('letter')
}

function renderFacts() {
  const p = plan.prediction
  const facts = [
    [tr('paperFact'), tr('paperValue')],
    [tr('clipsFact'), tr('clipsValue')],
    [tr('balanceFact'), plan.balance_from_nose_mm + ' ' + tr('behindNose')],
    [tr('tipFact'), plan.tip_height_mm + ' ' + tr('aboveBody') + ' (' + plan.dihedral_deg + '°)'],
    [tr('speedFact'), p.glide_speed_m_s.toFixed(1).replace('.', locale === 'en' ? '.' : ',') + ' m/s'],
  ]
  $('facts').replaceChildren(
    ...facts.map(([term, value]) => {
      const row = document.createElement('div')
      const dt = document.createElement('dt'),
        dd = document.createElement('dd')
      dt.textContent = term
      dd.textContent = value
      row.append(dt, dd)
      return row
    }),
  )
}

function render() {
  plan = api.makeK3({ ...state, locale })
  renderControls()
  // Both SVGs come from the generator in this repository, not from user input.
  $('finished').innerHTML = api.k3FinishedSvg(plan)
  $('sheet').innerHTML = api.k3PageSvg(plan, 0)
  $('finished-caption').textContent = tr('caption')
  $('book').href = bookFromStudio(plan.species + '-k3', plan.appearance_id, locale, plan.paper)
  renderFacts()
  syncAddress()
}

for (const node of document.querySelectorAll('[data-word]')) node.textContent = tr(node.dataset.word)
document.documentElement.lang = locale
localizedLinks(locale)

$('controls').addEventListener('input', (event) => {
  const { name, value } = event.target
  if (name === 'species') {
    state = { ...state, species: value, appearance_id: appearanceChoices(value + '-k3', locale)[0].id }
  } else if (name === 'span') state.span_mm = Number(value)
  else if (name === 'colors') state.appearance_id = value
  else if (name === 'paper') state.paper = value
  else return
  render()
})

$('download').addEventListener('click', async () => {
  $('status').textContent = tr('preparing')
  try {
    await api.prepareFoldedPdf()
    const blob = new Blob([api.k3Pdf(plan)], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${plan.species}-k3-${plan.paper}-${locale}.pdf`
    link.click()
    setTimeout(() => URL.revokeObjectURL(link.href), 30_000)
    $('status').textContent = tr('ready')
  } catch {
    $('status').textContent = tr('failed')
  }
})

render()
