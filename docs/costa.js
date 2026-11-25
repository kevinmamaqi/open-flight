// K2 costa glider worktable: choose a species, span, colors and paper, read the balance
// estimate and download the three-page sheet. Everything is drawn in the browser.
import { currentLocale, localizedLinks } from './atlas-nav.js?v=8a5cae46106b'
import * as api from './browser-workshop.js?v=8a5cae46106b'
import { sheetName } from './family-sheets.js?v=8a5cae46106b'
import { appearanceChoices } from './model-appearance.js?v=8a5cae46106b'
import { bookFromStudio } from './model-studio.js?v=8a5cae46106b'

const languages = ['en', 'es', 'ru']
const copy = {
  skip: ['Skip to the butterfly', 'Ir a la mariposa', 'К бабочке'],
  eyebrow: ['Experimental butterfly · K2', 'Mariposa experimental · K2', 'Опытная бабочка · K2'],
  title: ['Costa butterfly glider', 'Mariposa planeadora con costa', 'Бабочка-планер с жилкой'],
  intro: [
    'Swept-back forewings, a stiff folded front edge and a longer head for two paper clips. It balances before it flies.',
    'Alas delanteras inclinadas hacia atrás, un borde delantero doblado y rígido y una cabeza más larga para dos clips. Se equilibra antes de volar.',
    'Передние крылья отведены назад, передний край подогнут и жёсткий, а длинная голова держит две скрепки. Сначала баланс, потом полёт.',
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
  behindNose: ['mm behind the nose', 'mm detrás de la punta', 'мм от носа'],
  tipFact: ['Wingtip height', 'Altura de las puntas', 'Высота кончиков'],
  aboveBody: ['mm above the body', 'mm sobre el cuerpo', 'мм над корпусом'],
  speedFact: ['Glide speed', 'Velocidad de planeo', 'Скорость планирования'],
  estimate: [
    'Estimates from a first-order model. Nobody has flown this paper model yet.',
    'Estimaciones de un modelo simplificado. Nadie ha volado todavía este modelo de papel.',
    'Оценки по упрощённой модели. Эту бумажную модель ещё никто не запускал.',
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
  const choices = appearanceChoices(state.species + '-k2', locale)
  state.appearance_id = choices.some((c) => c.id === params.get('colors')) ? params.get('colors') : choices[0].id
  const span = Number(params.get('span'))
  const { minimum, maximum, step } = api.k2SpanRange
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
    ...species.map((id) => new Option(sheetName(id + '-k2', locale), id, false, id === plan.species)),
  )
  const colors = $('colors')
  colors.replaceChildren(
    ...appearanceChoices(plan.species + '-k2', locale).map(
      (c) => new Option(c.label, c.id, false, c.id === plan.appearance_id),
    ),
  )
  const span = $('span')
  const { minimum, maximum, step } = api.k2SpanRange
  Object.assign(span, { min: minimum, max: maximum, step, value: plan.span_mm })
  $('span-value').textContent = plan.span_mm + ' mm'
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
  plan = api.makeK2({ ...state, locale })
  renderControls()
  // Both SVGs come from the generator in this repository, not from user input.
  $('finished').innerHTML = api.k2FinishedSvg(plan)
  $('sheet').innerHTML = api.k2PageSvg(plan, 0)
  $('finished-caption').textContent = tr('caption')
  $('book').href = bookFromStudio(plan.species + '-k2', plan.appearance_id, locale, plan.paper)
  renderFacts()
  syncAddress()
}

for (const node of document.querySelectorAll('[data-word]')) node.textContent = tr(node.dataset.word)
document.documentElement.lang = locale
localizedLinks(locale)

$('controls').addEventListener('input', (event) => {
  const { name, value } = event.target
  if (name === 'species') {
    state = { ...state, species: value, appearance_id: appearanceChoices(value + '-k2', locale)[0].id }
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
    const blob = new Blob([api.k2Pdf(plan)], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${plan.species}-k2-${plan.paper}-${locale}.pdf`
    link.click()
    setTimeout(() => URL.revokeObjectURL(link.href), 30_000)
    $('status').textContent = tr('ready')
  } catch {
    $('status').textContent = tr('failed')
  }
})

render()
