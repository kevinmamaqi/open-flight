// Brings a plate to life: colors and paper update the picture and the print
// link, figure controls redraw the "How it flies" figure, and the fold diagrams
// follow the paper size. Everything works as plain links without this script.
import { appearanceChoices, specimenPath } from './model-appearance.js'
import { flightObjects } from './assets/objects/activities.js'
import { coloredPacket, objectIds } from './assets/objects/appearance.js'
import { sheetIdFor, sheetPath } from './family-sheets.js'
import { plateWords } from './plate-words.js'

const figureModules = {
  airplane: () => import('./book/figures/airplane.js'),
  butterfly: () => import('./book/figures/butterfly.js'),
  object: () => import('./book/figures/object.js'),
}

export function mountPlate(root) {
  const model = root.dataset.platePage, base = root.dataset.base, family = root.dataset.family
  const lang = document.documentElement.lang
  const $ = selector => root.querySelector(selector)
  const object = objectIds.includes(model)
  const sheet = object ? model : sheetIdFor(model)
  const choices = appearanceChoices(model, lang)
  const params = new URLSearchParams(location.search)
  const activity = object && flightObjects(lang).activities.find(item => item.id === model)
  const paper = $('.size'), status = $('.stage-status'), prints = [...root.querySelectorAll('[data-print]')]
  let paint = choices.find(choice => choice.id === params.get('colors'))?.id ?? choices[0]?.id
  if (params.get('paper') === 'US_LETTER') paper.value = 'US_LETTER'

  let lessonPaper = 'A4'
  async function syncSteps() {
    if (family !== 'airplane' || lessonPaper === paper.value) return
    const requested = paper.value
    const [{ makePlane }, { foldSvg }] = await Promise.all([import('./assets/planes/core.js'), import('./assets/planes/guide.js')])
    if (paper.value !== requested) return
    const plan = makePlane({ model_id: model, paper: requested }, lang)
    for (const [i, item] of root.querySelectorAll('.plate-steps li').entries()) {
      const step = plan.steps[i]
      if (!step) continue
      item.querySelector('.step-picture').innerHTML = foldSvg(plan, step)
      item.querySelector('h3').textContent = step.title
      item.querySelector('div > p').textContent = step.instruction
    }
    lessonPaper = requested
  }

  function sync(updateURL) {
    for (const button of root.querySelectorAll('[data-paint]'))
      button.setAttribute('aria-pressed', String(button.dataset.paint === paint))
    if (paint) $('.plate-poster').src = base + specimenPath(model, paint)
    const href = base + (object
      ? coloredPacket(flightObjects(lang).packets[paper.value], paint) + '#page=' + activity.page
      : sheetPath(sheet, paper.value, lang))
    for (const print of prints) print.href = href
    void syncSteps().catch(() => { status.textContent = plateWords.failed[lang] })
    const url = new URL(location.href)
    if (updateURL) {
      if (paint) url.searchParams.set('colors', paint)
      url.searchParams.set('paper', paper.value)
      history.replaceState(null, '', url)
    }
    for (const a of document.querySelectorAll('.mast a[hreflang]')) {
      const target = new URL(a.href)
      for (const key of ['colors', 'paper']) if (url.searchParams.has(key)) target.searchParams.set(key, url.searchParams.get(key))
      a.href = target.href
    }
  }

  root.addEventListener('click', event => {
    const choice = event.target.closest('[data-paint]')
    if (choice) { paint = choice.dataset.paint; sync(true) }
  })
  paper.onchange = () => sync(true)

  // Default colors print the static sheet; other colors are drawn in the browser.
  const download = async event => {
    if (object || !paint || paint === choices[0].id) return
    event.preventDefault()
    status.textContent = plateWords.preparing[lang]
    try {
      const { loadAppearanceSheet } = await import('./appearance-sheet-browser.js')
      const bytes = await loadAppearanceSheet(sheet, paper.value, lang, paint)
      const href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.download = [sheet, paint, paper.value, lang].join('-') + '.pdf'
      a.href = href
      a.click()
      setTimeout(() => URL.revokeObjectURL(href), 60000)
      status.textContent = ''
    } catch {
      status.textContent = plateWords.failed[lang]
    }
  }
  for (const print of prints) print.onclick = download

  // The figure redraws from the same pure module that drew it at build time.
  const figure = $('[data-plate-figure]')
  if (figure && figureModules[family]) {
    const state = {}
    root.addEventListener('click', async event => {
      const button = event.target.closest('[data-figure-control]')
      if (!button) return
      const name = button.dataset.figureControl
      state[name] = Number.isNaN(Number(button.dataset.value)) ? button.dataset.value : Number(button.dataset.value)
      for (const other of root.querySelectorAll('[data-figure-control="' + name + '"]'))
        other.setAttribute('aria-pressed', String(other === button))
      const module = await figureModules[family]()
      figure.querySelector('[data-figure-art]').innerHTML = module.figure(model, lang, state)
      const text = figure.querySelector('[data-figure-text]')
      if (text && module.figureText) text.textContent = module.figureText(model, lang, state)
    })
  }

  root.dataset.ready = 'true'
  sync(false)
}

if (typeof document !== 'undefined')
  for (const root of document.querySelectorAll('[data-plate-page]')) mountPlate(root)
