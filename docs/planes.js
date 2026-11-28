import { foldArtwork, showFoldStep } from './fold-lesson.js?v=7988ca7cb2ce'
import { makePlane, planeCatalog, planeSource, sheetSizes, liveries, sheetEdges, revision } from './assets/planes/core.js?v=7988ca7cb2ce'
import { planeSvg, planeSpecimen, esc, stripes } from './assets/planes/drawing.js?v=7988ca7cb2ce'
import { foldSvg, planeGuide } from './assets/planes/guide.js?v=7988ca7cb2ce'
import { planeBrowserPdf } from './assets/planes/print.js?v=7988ca7cb2ce'
import { appearanceChoices } from './model-appearance.js?v=7988ca7cb2ce'

const words = {
  fieldTitle: ['From aircraft to paper', 'От самолёта к бумаге', 'Del avión real al papel'],
  fieldIntro: [
    'Spot a detail on the real aircraft, then find it in your paper build.',
    'Найдите особую деталь настоящего самолёта, а затем посмотрите, как она выглядит на бумаге.',
    'Busca un detalle en el avión real y luego encuéntralo en tu modelo de papel.',
  ],
  fieldFold: ['Find the fold', 'Найдите сгиб', 'Encuentra el doblez'],
  fieldPaper: ['Spot it on paper', 'Найдите деталь на модели', 'Búscalo en el papel'],
  fieldJump: ['Try this fold', 'Попробовать этот сгиб', 'Prueba este doblez'],
  fieldCredit: [
    'Original Open Flight illustration · schematic ·',
    'Рисунок Open Flight · схема ·',
    'Ilustración original de Open Flight · dibujo esquemático ·',
  ],
  proposed: [
    'Proposed trial. Record what your launches actually do.',
    'План опыта. Запишите, что происходит во время ваших запусков.',
    'Prueba propuesta. Anota qué ocurre en tus lanzamientos.',
  ],
  skip: ['Skip to design', 'Перейти к модели', 'Ir al diseño'],
  atlas: ['Flight atlas', 'Атлас полётов', 'Atlas de vuelo'],
  foldGuide: ['Fold guide', 'Схема сборки', 'Guía de dobleces'],
  myBuilds: ['My builds', 'Мои модели', 'Mis modelos'],
  language: ['Language', 'Язык', 'Idioma'],
  hangar: ['Paper airplane studio', 'Мастерская бумажных самолётов', 'Taller de aviones de papel'],
  start: ['Start folding', 'Начать сборку', 'Empezar a doblar'],
  print: ['Download build PDF', 'Скачать PDF для сборки', 'Descargar PDF de montaje'],
  oneSheet: ['One sheet per airplane', 'Один лист на самолёт', 'Una hoja por avión'],
  paperModel: ['Folded paper model', 'Бумажная модель', 'Modelo de papel doblado'],
  choose: ['Choose an aircraft', 'Выберите самолёт', 'Elige un avión'],
  workbench: ['Folding table', 'Стол для сборки', 'Mesa de trabajo'],
  benchIntro: [
    'Keep the short edge away from you. One sheet makes one plane.',
    'Положите лист коротким краем от себя. Из одного листа получится один самолёт.',
    'Coloca el lado corto de la hoja hacia el lado opuesto de la mesa. Con una hoja entera haces un avión. Para imprimir a tamaño real, ten una regla a mano.',
  ],
  diagrams: ['Fold diagrams', 'Схемы сгибов', 'Dibujos de los dobleces'],
  fold3d: ['3D folds', 'Сгибы в 3D', 'Doblez en 3D'],
  flight: ['Flight path', 'Траектория', 'Trayectoria de vuelo'],
  view: ['Choose a view', 'Выберите вид', 'Elige una vista'],
  printed: ['Print side', 'Лицевая сторона', 'Cara impresa'],
  reverse: ['Reverse', 'Оборот', 'Reverso'],
  moving: ['Moving flap', 'Подвижный клапан', 'Parte que se dobla'],
  crease: ['Crease', 'Сгиб', 'Línea de doblez'],
  previous: ['Previous', 'Назад', 'Anterior'],
  next: ['Next fold', 'Следующий сгиб', 'Siguiente doblez'],
  experiment: ['Flight experiment', 'Опыт с полётом', 'Prueba de vuelo'],
  settings: ['Your design', 'Ваша модель', 'Tu diseño'],
  paper: ['Paper size', 'Формат листа', 'Tamaño de la hoja'],
  edge: ['Sheet edge', 'Край листа', 'Borde de la hoja'],
  edgeCut: ['Cut border · 7 mm inset', 'Рамка для вырезания · 7 мм от края', 'Borde para recortar · margen de 7 mm'],
  edgeWhole: ['Whole sheet · no cutting', 'Целый лист без вырезания', 'Hoja entera sin recortar'],
  edgeCutHint: [
    'Print at 100%. Check that all four sides of the thick border are visible, then cut along it.',
    'Печатайте в масштабе 100 %. Проверьте, что видны все четыре стороны толстой рамки, и вырежьте лист по ней.',
    'Imprime al 100 %. Comprueba que se ven los cuatro lados de la línea gruesa y recorta por ella.',
  ],
  edgeWholeHint: [
    'Fold a plain sheet whole using the diagrams. To print the fold marks all the way to the edges, use borderless printing or a print shop.',
    'Складывай чистый лист целиком по схемам. Чтобы напечатать линии сгиба до самого края, выбери печать без полей или обратись в типографию.',
    'Dobla la hoja en blanco entera con ayuda de los dibujos. Para imprimir las marcas hasta los bordes, usa impresión sin márgenes o acude a una copistería.',
  ],
  livery: ['Printed colors', 'Расцветка', 'Colores del avión'],
  keel: ['Body fold', 'Глубина корпуса', 'Profundidad del cuerpo'],
  keelHint: [
    'A deeper body leaves less paper in each wing.',
    'Чем глубже сгиб корпуса, тем уже крыло.',
    'Cuanto más profundo sea el doblez del cuerpo, más estrechas serán las alas.',
  ],
  tips: ['Wing-tip height', 'Высота законцовок', 'Doblez en los extremos de las alas'],
  tipHint: [
    'At zero, both outside edges stay flat.',
    'При нуле внешние кромки остаются плоскими.',
    'Con 0 mm, los bordes exteriores de las alas quedan planos.',
  ],
  save: ['Save a copy', 'Сохранить копию', 'Guardar una copia'],
  build: ['Build at home', 'Для сборки дома', 'Arma tu avión en casa'],
  files: ['The print pack', 'Файлы для печати', 'Archivos para imprimir'],
  printHelp: [
    'Print page 1, or pages 1–2 double-sided (flip on long edge) to see the folds on both faces. With a cut border, cut along the thick line before folding.',
    'Печатайте страницу 1 или страницы 1–2 с двух сторон (переворот по длинному краю), чтобы сгибы были видны с обеих сторон. Если есть рамка, сначала вырежьте лист по толстой линии.',
    'Imprime la página 1, o las páginas 1–2 a doble cara (girando por el borde largo) para ver los dobleces en las dos caras. Si tiene borde, recórtalo por la línea gruesa antes de doblar.',
  ],
  svg: ['Full-size SVG sheet', 'Полноразмерный лист SVG', 'Hoja SVG a tamaño real'],
  guideFile: ['Offline illustrated guide', 'Схемы для работы офлайн', 'Guía ilustrada sin conexión'],
  source: ['Editable design JSON', 'Файл модели JSON', 'Diseño editable en JSON'],
  reference: ['Aircraft reference', 'Настоящий самолёт', 'Avión real'],
  local: [
    'Copies stay in this browser. Export the design file to take a copy with you.',
    'Копии хранятся в этом браузере. Скачайте файл модели, чтобы перенести её на другое устройство.',
    'Las copias se guardan en este navegador. Descarga el archivo de diseño para llevarlo a otro dispositivo.',
  ],
  share: ['Copy design link', 'Копировать ссылку', 'Copiar enlace al diseño'],
  import: ['Import design', 'Импортировать модель', 'Importar diseño'],
  designLink: ['Design link', 'Ссылка на модель', 'Enlace al diseño'],
  back: ['Back to the flight atlas', 'Вернуться в атлас полётов', 'Volver al atlas de vuelo'],
  inspiration: ['Inspired by', 'По мотивам', 'Inspirado en el'],
  step: ['Fold', 'Сгиб', 'Doblez'],
  of: ['of', 'из', 'de'],
  launch: [
    'Hold near the nose and launch gently, wings level, into clear space.',
    'Возьмитесь за корпус ближе к носу. Мягко запустите самолёт горизонтально в свободное пространство.',
    'Sujeta el cuerpo cerca de la punta. Lanza suavemente, a nivel y hacia un espacio despejado.',
  ],
  copied: ['Design link copied.', 'Ссылка скопирована.', 'Enlace al diseño copiado.'],
  copyManually: [
    'Select and copy the design link below.',
    'Выделите и скопируйте ссылку ниже.',
    'Selecciona y copia el enlace de abajo.',
  ],
  saved: [
    'Copy saved in this browser.',
    'Копия сохранена в этом браузере.',
    'Copia guardada en este navegador.',
  ],
  load: ['Open', 'Открыть', 'Abrir'],
  imported: ['Design imported.', 'Модель импортирована.', 'Diseño importado.'],
  invalid: [
    'Choose a valid Open Flight airplane design JSON file.',
    'Выберите корректный JSON-файл бумажного самолёта Open Flight.',
    'Elige un archivo JSON válido de un avión de Open Flight.',
  ],
  storage: [
    'The browser could not save this copy. Download the design JSON to keep it.',
    'Браузер не смог сохранить копию. Скачайте JSON-файл модели.',
    'El navegador no pudo guardar la copia. Descarga el diseño en JSON para conservarlo.',
  ],
  creating: ['Preparing your PDF…', 'Готовим PDF…', 'Preparando el PDF…'],
  ready: ['Build PDF downloaded.', 'PDF для сборки скачан.', 'PDF de montaje descargado.'],
  pdfError: [
    'The PDF assets could not be loaded. The SVG sheet and illustrated guide are available below.',
    'Не удалось открыть ресурсы PDF. Ниже доступны лист SVG и схемы сборки.',
    'No se pudo preparar el PDF. Abajo puedes descargar la hoja SVG y la guía ilustrada.',
  ],
  viewerError: [
    'The 3D view could not be loaded. Use the fold diagrams to keep building.',
    'Не удалось открыть трёхмерный вид. Для сборки используйте схемы сгибов.',
    'No se pudo cargar la vista en 3D. Puedes seguir con los dibujos de los dobleces.',
  ],
  savedAt: ['Saved', 'Сохранено', 'Guardado'],
  mm: ['mm', 'мм', 'mm'],
  airplane: ['Paper airplane studio', 'Мастерская бумажных самолётов', 'Taller de aviones de papel'],
  // Record and championship planes are other people's designs, flown in a final or a record.
  recordFieldTitle: ['From the record flight to paper', 'От рекордного полёта к бумаге', 'Del vuelo récord al papel'],
  recordFieldIntro: [
    'Find the feature that made this design win, then fold it yourself.',
    'Найдите деталь, благодаря которой эта модель победила, и сложите её сами.',
    'Busca el detalle que hizo ganar a este diseño y dóblalo tú.',
  ],
  recordReference: ['Tutorial and sources', 'Видеоурок и источники', 'Tutorial y fuentes'],
  recordTips: ['Fin height', 'Высота килей', 'Altura de las aletas'],
  recordTipHint: [
    'The fins stand up along the outside edges.',
    'Кили поднимаются вдоль внешних кромок.',
    'Las aletas se levantan en los bordes exteriores.',
  ],
  recordKeelHint: [
    'A deeper body leaves less paper in each wing. The original measurement is the default.',
    'Чем глубже корпус, тем уже крыло. По умолчанию стоит размер оригинала.',
    'Cuanto más profundo es el cuerpo, más estrechas son las alas. El valor inicial es el del original.',
  ],
}
const keelRange = (model) => model.keel_range ?? [12, 28]
const tipsRange = (model) => model.winglet_range ?? [0, 12]
// Swap the copy keys that differ for record planes, so translate() keeps them in step.
function copyFor(plan) {
  const record = !!plan.designer
  for (const [plain, special] of [
    ['fieldTitle', 'recordFieldTitle'],
    ['fieldIntro', 'recordFieldIntro'],
    ['reference', 'recordReference'],
    ['tips', 'recordTips'],
    ['tipHint', 'recordTipHint'],
    ['keelHint', 'recordKeelHint'],
  ])
    document.querySelectorAll('[data-copy="' + plain + '"],[data-copy="' + special + '"]').forEach((el) => {
      el.dataset.copy = record ? special : plain
      el.textContent = tr(el.dataset.copy)
    })
}
import { flightPhysics,physicsTitle } from './atlas-physics.js?v=7988ca7cb2ce'
import { currentLocale, languageSwitch, localizedLinks } from './atlas-nav.js?v=7988ca7cb2ce'
import { studioOrigins, bookColorAction } from './studio-origins.js?v=7988ca7cb2ce'
import { bookFromStudio } from './model-studio.js?v=7988ca7cb2ce'
const $ = (id) => document.getElementById(id)
const updateAtlas = studioOrigins($('origin-atlas'))
const params = new URLSearchParams(location.search)
const languages = ['en', 'ru', 'es']
const requestedLanguage = currentLocale()
let locale = languages.includes(requestedLanguage) ? requestedLanguage : 'en'
const tr = (key) => words[key][languages.indexOf(locale)]
const paperName = (paper) => (paper === 'US_LETTER' && locale === 'es' ? 'Carta' : paper.replace('_', ' '))
const chooseModel = (id) => planeCatalog.find((m) => m.model_id === id) ?? planeCatalog[0]
const selectInitial = () => {
  const model = chooseModel(params.get('model'))
  const source = { model_id: model.model_id }
  const paper = params.get('paper'),
    livery = params.get('livery'),
    edge = params.get('edge')
  if (Object.hasOwn(sheetSizes, paper)) source.paper = paper
  if (sheetEdges.includes(edge)) source.edge = edge
  if (liveries.includes(livery)) source.livery = livery
  for (const [key, field, [lo, hi]] of [
    ['keel', 'keel_mm', keelRange(model)],
    ['tips', 'winglet_mm', tipsRange(model)],
  ]) {
    const raw = params.get(key)
    if (raw !== null && /^\d+$/.test(raw) && Number(raw) >= lo && Number(raw) <= hi)
      source[field] = Number(raw)
  }
  return source
}
let plan = makePlane(selectInitial(), locale),
  stage = 0,
  mode = ['fold', 'flight'].includes(params.get('view')) ? params.get('view') : 'guide',
  viewer,
  loadingViewer,
  noticeTimer
const storageKey = 'open-flight.planes.copies.v1'
function announce(message) {
  clearTimeout(noticeTimer)
  $('notice').textContent = message
  noticeTimer = setTimeout(() => {
    $('notice').textContent = ''
  }, 5500)
}
function urlForPlan() {
  const url = new URL('./planes.html', location.href)
  const fields = {
    model: plan.model_id,
    lang: locale,
    paper: plan.paper,
    edge: plan.edge,
    keel: plan.keel_mm,
    tips: plan.winglet_mm,
    livery: plan.livery,
  }
  if (mode !== 'guide') fields.view = mode
  for (const [k, v] of Object.entries(fields)) url.searchParams.set(k, String(v))
  return url
}
function syncAddress() {
  try {
    const url = urlForPlan()
    url.hash = location.hash
    history.replaceState(null, '', url)
  } catch {
    /* Some offline preview shells expose an opaque origin. */
  }
}
function translate() {
  document.documentElement.lang = locale
  document.querySelectorAll('[data-copy]').forEach((el) => {
    el.textContent = tr(el.dataset.copy)
  })
  document.querySelectorAll('[data-group]').forEach((el) => {
    el.setAttribute('aria-label', tr(el.dataset.group))
  })
  document.querySelectorAll('[data-home]').forEach((link) => {
    link.href = { en: './', ru: './ru.html', es: './es.html' }[locale]
  })
  localizedLinks(locale)
  $('paper').options[0].textContent = 'A4 · 210 × 297 ' + tr('mm')
  $('paper').options[1].textContent = {
    en: 'US Letter · 8½ × 11 in',
    ru: 'US Letter · 215,9 × 279,4 мм',
    es: 'Carta · 215,9 × 279,4 mm',
  }[locale]
  $('edge').options[0].textContent = tr('edgeCut')
  $('edge').options[1].textContent = tr('edgeWhole')
}
function renderModels() {
  const current = document.activeElement?.dataset?.model
  $('models').innerHTML = planeCatalog
    .map(
      (model) =>
        '<button class="model" type="button" data-model="' +
        model.model_id +
        '" aria-pressed="' +
        (model.model_id === plan.model_id) +
        '"><img src="./assets/planes/' +
        model.model_id +
        '.svg" width="76" height="45" alt=""><span><b>' +
        esc(model.name[locale]) +
        '</b><small>' +
        esc(model.inspiration[locale]) +
        '</small></span></button>',
    )
    .join('')
  if (current)
    $('models')
      .querySelector('[data-model="' + current + '"]')
      ?.focus({ preventScroll: true })
}
function savedList() {
  try {
    const files = JSON.parse(localStorage.getItem(storageKey) || '[]')
    return Array.isArray(files)
      ? files.filter((item) => {
          try {
            return !!(item?.id && item.date && makePlane(item.source))
          } catch {
            return false
          }
        })
      : []
  } catch {
    return []
  }
}
function renderCopies() {
  const list = savedList()
  $('saved-builds').innerHTML = list
    .map((copy, i) => {
      const p = makePlane(copy.source, locale)
      const title =
        p.name +
        ' · ' +
        paperName(p.paper) +
        ' · ' +
        p.keel_mm +
        '/' +
        p.winglet_mm +
        ' ' +
        tr('mm') +
        ' · ' +
        appearanceChoices(p.model_id, locale).find(choice => choice.id === p.livery).label
      return (
        '<button type="button" data-copy-index="' +
        i +
        '" class="saved-button" title="' +
        esc(tr('load') + ' ' + title) +
        '">' +
        esc(title) +
        '</button>'
      )
    })
    .join('')
}
function renderField() {
  const { field } = plan
  updateAtlas(plan.model_id, locale)
  $('book-colors').textContent = bookColorAction(locale)
  $('book-colors').href = bookFromStudio(plan.model_id, plan.livery, locale, plan.paper)
  $('field-airframe').src = './assets/planes/field/' + plan.model_id + '.svg'
  $('field-airframe').alt = field.variant + ' · ' + field.landmark
  $('field-variant').textContent = field.variant
  $('field-landmark').textContent = field.landmark
  $('field-look').textContent = field.look
  $('field-diagram').innerHTML = foldSvg(plan, plan.steps[field.step])
  $('field-paper').innerHTML = planeSpecimen(plan)
  $('field-fold').textContent = field.fold
  $('field-finish').textContent = field.finish
  $('field-museum').textContent = field.museum.label + ' ↗'
  $('field-museum').href = field.museum.url
}
function renderPlan() {
  const plate = {
    'boeing-747': '#f8dfb1',
    'douglas-dc3': '#d4e6c7',
    'tupolev-tu144': '#e6dbf1',
    'ilyushin-il62': '#d3e7eb',
    'red-dart': '#f5ddd5',
    'shaheen-shin': '#d8ecdc',
    'crescent-boomerang': '#dfe3f6',
    'sky-king': '#f6dfe3',
  }[plan.model_id]
  const model = planeCatalog.find((m) => m.model_id === plan.model_id)
  ;[$('keel').min, $('keel').max] = keelRange(model).map(String)
  ;[$('tips').min, $('tips').max] = tipsRange(model).map(String)
  // A design without fins has nothing to adjust at the tips.
  const noTips = tipsRange(model)[1] === 0
  for (const el of [document.querySelector('label[for="tips"]'), $('tips'), $('tips').nextElementSibling]) if (el) el.hidden = noTips
  copyFor(plan)
  document.documentElement.style.setProperty('--plate', plate)
  document.title = plan.name + ' · ' + tr('airplane') + ' · Open Flight'
  $('name').textContent = plan.name
  $('character').textContent = plan.character
  $('plane-physics').querySelector('summary').textContent=physicsTitle(locale)
  $('plane-physics').querySelector('p').textContent=flightPhysics(plan.model_id,locale)
  $('inspiration').textContent = (plan.designer ? '' : tr('inspiration') + ' ') + plan.inspiration
  $('format').textContent = paperName(plan.paper)
  $('sample-number').textContent = 'OF / ' + plan.code
  $('aircraft').innerHTML = planeSpecimen(plan)
  $('paper').value = plan.paper
  $('edge').value = plan.edge
  $('edge-hint').textContent = tr(plan.edge === 'cut' ? 'edgeCutHint' : 'edgeWholeHint')
  if ($('livery').dataset.model !== plan.model_id) {
    $('livery').replaceChildren(...appearanceChoices(plan.model_id, locale).map(
      ({ id, label }) => new Option(label, id),
    ))
    $('livery').dataset.model = plan.model_id
  }
  $('livery').value = plan.livery
  $('keel').value = plan.keel_mm
  $('tips').value = plan.winglet_mm
  $('keel-value').value = plan.keel_mm + ' ' + tr('mm')
  $('tips-value').value = plan.winglet_mm + ' ' + tr('mm')
  $('keel').setAttribute('aria-valuetext', $('keel-value').value)
  $('tips').setAttribute('aria-valuetext', $('tips-value').value)
  $('reference-name').textContent = plan.inspiration
  $('history').textContent = plan.history + (plan.rights ? ' ' + plan.rights : '')
  $('reference').textContent = plan.reference.label + ' ↗'
  $('reference').href = plan.reference.url
  $('trial').textContent = (plan.launch ?? tr('launch')) + ' ' + plan.experiment
  $('share-fallback').hidden = true
  syncAddress()
  renderField()
  renderStep()
}
function renderStep() {
  stage = Math.min(Math.max(stage, 0), plan.steps.length - 1)
  const step = plan.steps[stage]
  showFoldStep({
    figure: $('fold-figure'), progress: $('step-count'), title: $('step-title'),
    action: $('instruction'), previous: $('previous'), next: $('next'),
  }, {
    index: stage, total: plan.steps.length, step: { ...step, action: step.instruction },
    count: (n, total) => tr('step') + ' ' + n + ' ' + tr('of') + ' ' + total,
    artwork: foldArtwork(foldSvg(plan, step)),
  })
  const focusStep = document.activeElement?.dataset?.stage
  $('step-progress').innerHTML = plan.steps
    .map(
      (s) =>
        '<button type="button" data-stage="' +
        s.index +
        '" class="' +
        (s.index < stage ? 'done' : '') +
        '" ' +
        (s.index === stage ? 'aria-current="step"' : '') +
        ' aria-label="' +
        esc(tr('step') + ' ' + (s.index + 1) + ' · ' + s.title) +
        '"></button>',
    )
    .join('')
  if (focusStep !== undefined)
    $('step-progress')
      .querySelector('[data-stage="' + focusStep + '"]')
      ?.focus({ preventScroll: true })
  document.querySelectorAll('[data-mode]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === mode))
  })
  $('diagrams').hidden = mode !== 'guide'
  $('three').hidden = mode === 'guide'
  $('step-details').hidden = mode === 'flight'
  $('flight-note').hidden = mode !== 'flight'
  if (mode !== 'guide') void updateViewer()
}
async function updateViewer() {
  try {
    loadingViewer ??= import('./flight-viewer.js?v=7988ca7cb2ce')
      .then(({ mountFlightViewer }) => mountFlightViewer($('three')))
      .catch((error) => {
        loadingViewer = undefined
        throw error
      })
    viewer = await loadingViewer
    if (mode === 'guide') return
    const step = plan.steps[mode === 'flight' ? plan.steps.length - 1 : stage]
    viewer.update({
      family: 'airplane',
      id: plan.model_id,
      locale,
      mode,
      stage: step.index,
      stageCount: plan.steps.length,
      paper: plan.paper === 'A4' ? 'a4' : 'letter',
      planes: step.frame,
      name: plan.name,
      title: mode === 'flight' ? tr('flight') : step.title,
      caption: mode === 'flight' ? plan.experiment : step.instruction,
      onStage: (index) => {
        stage = index
        renderStep()
      },
      appearance: plan.livery,
      colors: plan.colors,
      sheetDecoration: stripes(plan),
      parameters: {
        keel_mm: plan.keel_mm,
        winglet_mm: plan.winglet_mm,
        dihedral_deg: 8,
        livery: plan.livery,
        colors: plan.colors,
      },
    })
  } catch {
    $('three').textContent = tr('viewerError')
  }
}
function acceptDesign(options, first = false) {
  plan = makePlane(options, locale)
  if (first) stage = 0
  renderModels()
  renderPlan()
}
for (const [control, field] of [
  ['paper', 'paper'],
  ['edge', 'edge'],
  ['livery', 'livery'],
  ['keel', 'keel_mm'],
  ['tips', 'winglet_mm'],
]) {
  $(control).addEventListener(control === 'keel' || control === 'tips' ? 'input' : 'change', (e) => {
    const value = e.target.value
    plan = makePlane(
      {
        ...plan.source,
        // Only revision 2 offers the cut border; a saved revision 1 copy moves up when edited.
        ...(field === 'edge' ? { revision } : {}),
        [field]: field.endsWith('_mm') ? Number(value) : value,
      },
      locale,
    )
    renderPlan()
  })
}
$('models').addEventListener('click', (e) => {
  const button = e.target.closest('[data-model]')
  if (button && button.dataset.model !== plan.model_id)
    acceptDesign(
      {
        model_id: button.dataset.model,
        paper: plan.paper,
        edge: plan.edge,
        livery: plan.livery,
      },
      true,
    )
})
document.querySelectorAll('a[href="#fold"]').forEach((link) => {
  link.addEventListener('click', () => {
    mode = 'guide'
    if (link.id === 'field-jump') stage = plan.field.step
    syncAddress()
    renderStep()
  })
})
languageSwitch((next) => {
  locale = next
  try { sessionStorage.setItem('open-flight-language',locale) } catch {}
  translate()
  acceptDesign(plan.source)
  renderCopies()
})
document.querySelector('.view-tabs').addEventListener('click', (e) => {
  const button = e.target.closest('[data-mode]')
  if (button) {
    mode = button.dataset.mode
    syncAddress()
    renderStep()
  }
})
$('previous').onclick = () => {
  stage--
  renderStep()
}
$('next').onclick = () => {
  stage++
  renderStep()
}
$('step-progress').onclick = (e) => {
  const b = e.target.closest('[data-stage]')
  if (b) {
    stage = Number(b.dataset.stage)
    renderStep()
  }
}
$('save').onclick = () => {
  try {
    const list = savedList()
    list.unshift({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      source: plan.source,
    })
    localStorage.setItem(storageKey, JSON.stringify(list))
    renderCopies()
    announce(tr('saved'))
  } catch {
    announce(tr('storage'))
  }
}
$('saved-builds').onclick = (e) => {
  const b = e.target.closest('[data-copy-index]')
  if (b) {
    const copy = savedList()[Number(b.dataset.copyIndex)]
    if (copy) {
      acceptDesign(copy.source, true)
      $('name').scrollIntoView({ block: 'center' })
    }
  }
}
window.addEventListener('storage', (e) => {
  if (e.key === storageKey) renderCopies()
})
$('import').onclick = () => $('import-file').click()
$('import-file').onchange = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  try {
    if (file.size > 100000) throw Error()
    const src = JSON.parse(await file.text())
    if (src.format !== 'open-flight-plane') throw Error()
    acceptDesign(src, true)
    announce(tr('imported'))
  } catch {
    announce(tr('invalid'))
  } finally {
    e.target.value = ''
  }
}
$('share').onclick = async () => {
  const link = urlForPlan().toString()
  try {
    await navigator.clipboard.writeText(link)
    announce(tr('copied'))
  } catch {
    $('share-fallback').hidden = false
    $('share-url').value = link
    $('share-url').focus()
    $('share-url').select()
    announce(tr('copyManually'))
  }
}
function download(content, type, ext, suffix = '', copy = plan) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = copy.model_id + '-' + copy.paper.toLowerCase() + '-' + copy.locale + suffix + '.' + ext
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}
$('svg').onclick = () => download(planeSvg(plan), 'image/svg+xml', 'svg')
$('guide-file').onclick = () => download(planeGuide(plan), 'text/html;charset=utf-8', 'html', '-guide')
$('source').onclick = () => download(planeSource(plan), 'application/json', 'json')
document.querySelectorAll('.pdf').forEach((el) => {
  el.onclick = async () => {
    const buttons = document.querySelectorAll('.pdf')
    const copy = plan
    buttons.forEach((b) => {
      b.disabled = true
    })
    announce(tr('creating'))
    try {
      download(await planeBrowserPdf(copy), 'application/pdf', 'pdf', '', copy)
      announce(tr('ready'))
    } catch {
      announce(tr('pdfError'))
    } finally {
      buttons.forEach((b) => {
        b.disabled = false
      })
    }
  }
})
window.addEventListener('pagehide', (e) => {
  if (!e.persisted) viewer?.destroy()
})
translate()
renderModels()
renderPlan()
renderCopies()

if (mode === 'flight') requestAnimationFrame(() => document.querySelector('.view-tabs').scrollIntoView())
