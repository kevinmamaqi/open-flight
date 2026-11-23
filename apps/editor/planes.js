import { makePlane, planeCatalog, planeSource, sheetSizes, liveries } from './assets/planes/core.js'
import { planeSvg, planeSpecimen, esc, stripes } from './assets/planes/drawing.js'
import { foldSvg, planeGuide } from './assets/planes/guide.js'
import { planePdfBytes } from './assets/planes/pdf.js'

const words = {
  skip: ['Skip to design', 'Перейти к модели'],
  atlas: ['Flight atlas', 'Атлас полётов'],
  foldGuide: ['Fold guide', 'Схема сборки'],
  myBuilds: ['My builds', 'Мои модели'],
  language: ['Language', 'Язык'],
  hangar: ['Paper airplane studio', 'Мастерская бумажных самолётов'],
  start: ['Start folding', 'Начать сборку'],
  print: ['Download build PDF', 'Скачать PDF для сборки'],
  oneSheet: ['One whole sheet', 'Один целый лист'],
  paperModel: ['Folded paper model', 'Бумажная модель'],
  choose: ['Choose an aircraft', 'Выберите самолёт'],
  workbench: ['Folding table', 'Стол для сборки'],
  benchIntro: [
    'Keep the short edge away from you. One sheet makes one plane.',
    'Положите лист коротким краем от себя. Из одного листа получится один самолёт.',
  ],
  diagrams: ['Fold diagrams', 'Схемы сгибов'],
  fold3d: ['3D folds', 'Сгибы в 3D'],
  flight: ['Flight path', 'Траектория'],
  view: ['Choose a view', 'Выберите вид'],
  printed: ['Print side', 'Лицевая сторона'],
  reverse: ['Reverse', 'Оборот'],
  moving: ['Moving flap', 'Подвижный клапан'],
  crease: ['Crease', 'Сгиб'],
  previous: ['Previous', 'Назад'],
  next: ['Next fold', 'Следующий сгиб'],
  experiment: ['Flight experiment', 'Опыт с полётом'],
  settings: ['Your design', 'Ваша модель'],
  paper: ['Paper size', 'Формат листа'],
  livery: ['Printed colors', 'Расцветка'],
  heritage: ['Heritage stripes', 'Классические полосы'],
  festival: ['Festival colors', 'Праздничные цвета'],
  pencil: ['Graphite', 'Графит'],
  keel: ['Body fold', 'Глубина корпуса'],
  keelHint: ['A deeper body leaves less paper in each wing.', 'Чем глубже сгиб корпуса, тем уже крыло.'],
  tips: ['Wing-tip height', 'Высота законцовок'],
  tipHint: ['At zero, both outside edges stay flat.', 'При нуле внешние кромки остаются плоскими.'],
  save: ['Save a copy', 'Сохранить копию'],
  build: ['Build at home', 'Для сборки дома'],
  files: ['The print pack', 'Файлы для печати'],
  printHelp: [
    'Print page 1 at 100%. The diagram pages can stay on screen. Check the 20 mm line with a ruler.',
    'Печатайте страницу 1 в масштабе 100%. Схемы можно оставить на экране. Проверьте линейкой контрольные 20 мм.',
  ],
  svg: ['Full-size SVG sheet', 'Полноразмерный лист SVG'],
  guideFile: ['Offline illustrated guide', 'Схемы для работы офлайн'],
  source: ['Editable design JSON', 'Файл модели JSON'],
  reference: ['Aircraft reference', 'Настоящий самолёт'],
  local: [
    'Copies stay in this browser. Export the design file to take a copy with you.',
    'Копии хранятся в этом браузере. Скачайте файл модели, чтобы перенести её на другое устройство.',
  ],
  share: ['Copy design link', 'Копировать ссылку'],
  import: ['Import design', 'Импортировать модель'],
  designLink: ['Design link', 'Ссылка на модель'],
  back: ['Back to the flight atlas', 'Вернуться в атлас полётов'],
  inspiration: ['Inspired by', 'По мотивам'],
  step: ['Fold', 'Сгиб'],
  of: ['of', 'из'],
  launch: [
    'Hold near the nose and launch gently, wings level, into clear space.',
    'Возьмитесь за корпус ближе к носу. Мягко запустите самолёт горизонтально в свободное пространство.',
  ],
  copied: ['Design link copied.', 'Ссылка скопирована.'],
  copyManually: ['Select and copy the design link below.', 'Выделите и скопируйте ссылку ниже.'],
  saved: ['Copy saved in this browser.', 'Копия сохранена в этом браузере.'],
  load: ['Open', 'Открыть'],
  imported: ['Design imported.', 'Модель импортирована.'],
  invalid: [
    'Choose a valid Open Flight airplane design JSON file.',
    'Выберите корректный JSON-файл бумажного самолёта Open Flight.',
  ],
  storage: [
    'The browser could not save this copy. Download the design JSON to keep it.',
    'Браузер не смог сохранить копию. Скачайте JSON-файл модели.',
  ],
  creating: ['Preparing your PDF…', 'Готовим PDF…'],
  ready: ['Build PDF downloaded.', 'PDF для сборки скачан.'],
  pdfError: [
    'The PDF assets could not be loaded. The SVG sheet and illustrated guide are available below.',
    'Не удалось открыть ресурсы PDF. Ниже доступны лист SVG и схемы сборки.',
  ],
  viewerError: [
    'The 3D view could not be loaded. Use the fold diagrams to keep building.',
    'Не удалось открыть трёхмерный вид. Для сборки используйте схемы сгибов.',
  ],
  savedAt: ['Saved', 'Сохранено'],
  mm: ['mm', 'мм'],
  airplane: ['Paper airplane studio', 'Мастерская бумажных самолётов'],
}
const $ = (id) => document.getElementById(id)
const params = new URLSearchParams(location.search)
let locale = params.get('lang') === 'ru' ? 'ru' : 'en'
const tr = (key) => words[key][locale === 'ru' ? 1 : 0]
const chooseModel = (id) => planeCatalog.find((m) => m.model_id === id) ?? planeCatalog[0]
const selectInitial = () => {
  const model = chooseModel(params.get('model'))
  const source = { model_id: model.model_id }
  const paper = params.get('paper'),
    livery = params.get('livery')
  if (Object.hasOwn(sheetSizes, paper)) source.paper = paper
  if (liveries.includes(livery)) source.livery = livery
  for (const [key, field, lo, hi] of [
    ['keel', 'keel_mm', 12, 28],
    ['tips', 'winglet_mm', 0, 12],
  ]) {
    const raw = params.get(key)
    if (raw !== null && /^\d+$/.test(raw) && Number(raw) >= lo && Number(raw) <= hi)
      source[field] = Number(raw)
  }
  return source
}
let plan = makePlane(selectInitial(), locale),
  stage = 0,
  mode = 'guide',
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
    keel: plan.keel_mm,
    tips: plan.winglet_mm,
    livery: plan.livery,
  }
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
    link.href = './?lang=' + locale
  })
  $('language').value = locale
  $('paper').options[0].textContent = 'A4 · 210 × 297 ' + tr('mm')
  $('paper').options[1].textContent =
    locale === 'ru' ? 'US Letter · 215,9 × 279,4 мм' : 'US Letter · 8½ × 11 in'
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
        p.paper.replace('_', ' ') +
        ' · ' +
        p.keel_mm +
        '/' +
        p.winglet_mm +
        ' ' +
        tr('mm') +
        ' · ' +
        tr(p.livery)
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
function renderPlan() {
  const plate = {
    'boeing-747': '#f8dfb1',
    'douglas-dc3': '#d4e6c7',
    'tupolev-tu144': '#e6dbf1',
    'ilyushin-il62': '#d3e7eb',
  }[plan.model_id]
  document.documentElement.style.setProperty('--plate', plate)
  document.title = plan.name + ' · ' + tr('airplane') + ' · Open Flight'
  $('name').textContent = plan.name
  $('character').textContent = plan.character
  $('inspiration').textContent = tr('inspiration') + ' ' + plan.inspiration
  $('format').textContent = plan.paper.replace('_', ' ')
  $('sample-number').textContent = 'OF / ' + plan.code
  $('aircraft').innerHTML = planeSpecimen(plan)
  $('paper').value = plan.paper
  $('livery').value = plan.livery
  $('keel').value = plan.keel_mm
  $('tips').value = plan.winglet_mm
  $('keel-value').value = plan.keel_mm + ' ' + tr('mm')
  $('tips-value').value = plan.winglet_mm + ' ' + tr('mm')
  $('keel').setAttribute('aria-valuetext', $('keel-value').value)
  $('tips').setAttribute('aria-valuetext', $('tips-value').value)
  $('reference-name').textContent = plan.inspiration
  $('history').textContent = plan.history
  $('reference').textContent = plan.reference.label + ' ↗'
  $('reference').href = plan.reference.url
  $('trial').textContent = tr('launch') + ' ' + plan.experiment
  $('share-fallback').hidden = true
  syncAddress()
  renderStep()
}
function renderStep() {
  stage = Math.min(Math.max(stage, 0), plan.steps.length - 1)
  const step = plan.steps[stage]
  $('fold-figure').innerHTML = foldSvg(plan, step)
  $('step-count').textContent = tr('step') + ' ' + (stage + 1) + ' ' + tr('of') + ' ' + plan.steps.length
  $('step-title').textContent = step.title
  $('instruction').textContent = step.instruction
  $('previous').disabled = stage === 0
  $('next').disabled = stage === plan.steps.length - 1
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
    loadingViewer ??= import('./flight-viewer.js')
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
  ['livery', 'livery'],
  ['keel', 'keel_mm'],
  ['tips', 'winglet_mm'],
]) {
  $(control).addEventListener(control === 'keel' || control === 'tips' ? 'input' : 'change', (e) => {
    const value = e.target.value
    plan = makePlane({ ...plan.source, [field]: field.endsWith('_mm') ? Number(value) : value }, locale)
    renderPlan()
  })
}
$('models').addEventListener('click', (e) => {
  const button = e.target.closest('[data-model]')
  if (button && button.dataset.model !== plan.model_id)
    acceptDesign({ model_id: button.dataset.model, paper: plan.paper, livery: plan.livery }, true)
})
document.querySelectorAll('a[href="#fold"]').forEach((link) => {
  link.addEventListener('click', () => {
    mode = 'guide'
    renderStep()
  })
})
$('language').addEventListener('change', (e) => {
  locale = e.target.value
  translate()
  acceptDesign(plan.source)
  renderCopies()
})
document.querySelector('.view-tabs').addEventListener('click', (e) => {
  const button = e.target.closest('[data-mode]')
  if (button) {
    mode = button.dataset.mode
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
    list.unshift({ id: crypto.randomUUID(), date: new Date().toISOString(), source: plan.source })
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
let pdfLibrary, typeface
function pdfScripts() {
  if (globalThis.jspdf) return Promise.resolve(globalThis.jspdf.jsPDF)
  pdfLibrary ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = new URL('./assets/planes/vendor/jspdf.js', import.meta.url).href
    script.onload = () => resolve(globalThis.jspdf.jsPDF)
    script.onerror = () => {
      script.remove()
      pdfLibrary = undefined
      reject(Error('PDF renderer'))
    }
    document.head.append(script)
  })
  return pdfLibrary
}
function fontData() {
  typeface ??= Promise.all([
    fetch(new URL('./assets/planes/vendor/DejaVuSans.ttf', import.meta.url)),
    fetch(new URL('./assets/planes/vendor/DejaVu-LICENSE.txt', import.meta.url)),
  ])
    .then(([font, notice]) => {
      if (!font.ok || !notice.ok) throw Error('PDF typeface')
      return Promise.all([font.arrayBuffer(), notice.text()])
    })
    .then(([bytes, notice]) => {
      const raw = new Uint8Array(bytes)
      let binary = ''
      for (let i = 0; i < raw.length; i += 16384) binary += String.fromCharCode(...raw.subarray(i, i + 16384))
      return { base64: btoa(binary), notice }
    })
    .catch((error) => {
      typeface = undefined
      throw error
    })
  return typeface
}
document.querySelectorAll('.pdf').forEach((el) => {
  el.onclick = async () => {
    const buttons = document.querySelectorAll('.pdf')
    const copy = plan
    buttons.forEach((b) => {
      b.disabled = true
    })
    announce(tr('creating'))
    try {
      const [JsPDF, font] = await Promise.all([pdfScripts(), fontData()])
      download(planePdfBytes(copy, JsPDF, font.base64, font.notice), 'application/pdf', 'pdf', '', copy)
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
