// Brings a plate to life: colors and paper update the picture and the print
// link, figure controls redraw the "How it flies" figure, and the fold diagrams
// follow the paper size. Everything works as plain links without this script.
import { appearanceChoices, specimenPath } from './model-appearance.js?v=7988ca7cb2ce'
import { flightObjects } from './assets/objects/activities.js?v=7988ca7cb2ce'
import { coloredPacket, objectIds } from './assets/objects/appearance.js?v=7988ca7cb2ce'
import { sheetIdFor, sheetPath } from './family-sheets.js?v=7988ca7cb2ce'
import { plateWords } from './plate-words.js?v=7988ca7cb2ce'
import { mountZoom } from './viewer-zoom.js?v=7988ca7cb2ce'

const figureModules = {
  airplane: () => import('./book/figures/airplane.js?v=7988ca7cb2ce'),
  butterfly: () => import('./book/figures/butterfly.js?v=7988ca7cb2ce'),
  object: () => import('./book/figures/object.js?v=7988ca7cb2ce'),
}

// A CAD-style view gizmo: an orbit ring and three named axes that follow the
// camera. Drag it to orbit; pick Front, Top or Side to look straight along an
// axis; the middle dot goes back to the starting view. The models fly towards
// -z with +y up, so Front looks at the nose.
const HOME = [32, 36]
const VIEWS = [
  { key: 'front', axis: [0, 0, -1], view: [0, 0] },
  { key: 'top', axis: [0, 1, 0], view: [0, 89] },
  { key: 'side', axis: [1, 0, 0], view: [90, 0] },
]
function mountGizmo(box, lang, { turn, snap }) {
  if (!box) return null
  const NS = 'http://www.w3.org/2000/svg', SIZE = 132, R = 40
  const el = (name, attrs, parent) => {
    const node = document.createElementNS(NS, name)
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value)
    parent?.append(node)
    return node
  }
  box.setAttribute('role', 'group')
  box.setAttribute('aria-label', plateWords.orbit[lang])
  const svg = el('svg', { viewBox: `${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`, width: SIZE, height: SIZE }, box)
  el('circle', { r: R + 18, class: 'gizmo-disc' }, svg)
  const ring = el('path', { class: 'gizmo-ring' }, svg)
  const axes = VIEWS.map(item => {
    const line = el('line', { x1: 0, y1: 0, class: 'gizmo-axis gizmo-' + item.key }, svg)
    const label = el('g', { class: 'gizmo-label gizmo-' + item.key, role: 'button', tabindex: 0, 'data-view': item.key, 'aria-label': plateWords[item.key][lang] }, svg)
    el('rect', { x: -22, y: -22, width: 44, height: 44, class: 'gizmo-hit' }, label)
    const pill = el('rect', { y: -11, height: 22, rx: 11, class: 'gizmo-pill' }, label)
    const text = el('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central' }, label)
    text.textContent = plateWords[item.key][lang]
    return { ...item, line, label, pill, text }
  })
  const home = el('g', { class: 'gizmo-home', role: 'button', tabindex: 0, 'data-view': 'home', 'aria-label': plateWords.home[lang] }, svg)
  el('rect', { x: -22, y: -22, width: 44, height: 44, class: 'gizmo-hit' }, home)
  el('circle', { r: 6, class: 'gizmo-dot' }, home)

  let measured = false
  function draw(yaw, pitch) {
    const a = (yaw * Math.PI) / 180, t = (pitch * Math.PI) / 180
    // Camera basis for a camera at `eye` looking at the origin with +y up.
    const z = [Math.sin(a) * Math.cos(t), Math.sin(t), -Math.cos(a) * Math.cos(t)]
    const x = [-Math.cos(a), 0, -Math.sin(a)]
    const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]]
    const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
    const project = v => [dot(v, x) * R, -dot(v, y) * R, dot(v, z)]
    ring.setAttribute('d', Array.from({ length: 49 }, (_, i) => {
      const [px, py] = project([Math.cos((i / 48) * 2 * Math.PI), 0, Math.sin((i / 48) * 2 * Math.PI)])
      return (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1)
    }).join(''))
    if (!measured && !box.hidden) {
      for (const axis of axes) {
        const width = Math.ceil(axis.text.getComputedTextLength()) + 16
        axis.pill.setAttribute('x', -width / 2)
        axis.pill.setAttribute('width', width)
      }
      measured = true
    }
    for (const axis of axes) {
      const [px, py, depth] = project(axis.axis)
      axis.line.setAttribute('x2', px.toFixed(1))
      axis.line.setAttribute('y2', py.toFixed(1))
      axis.label.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`)
      axis.label.classList.toggle('is-behind', depth < -0.05)
      axis.line.classList.toggle('is-behind', depth < -0.05)
    }
  }
  const choose = key => {
    const item = VIEWS.find(v => v.key === key)
    snap(...(item ? item.view : HOME))
  }
  let press = null
  svg.addEventListener('pointerdown', event => {
    if (event.button !== 0) return
    press = { x: event.clientX, y: event.clientY, moved: false, key: event.target.closest('[data-view]')?.dataset.view }
    svg.setPointerCapture(event.pointerId)
    box.classList.add('is-dragging')
  })
  svg.addEventListener('pointermove', event => {
    if (!press) return
    const dx = event.clientX - press.x, dy = event.clientY - press.y
    if (!press.moved && Math.hypot(dx, dy) < 4) return
    press.moved = true
    press.x = event.clientX
    press.y = event.clientY
    turn(dx * 0.8, dy * 0.8)
  })
  svg.addEventListener('pointerup', () => {
    if (press && !press.moved && press.key) choose(press.key)
    press = null
    box.classList.remove('is-dragging')
  })
  svg.addEventListener('pointercancel', () => { press = null; box.classList.remove('is-dragging') })
  svg.addEventListener('keydown', event => {
    const key = event.target.closest?.('[data-view]')?.dataset.view
    if (!key || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    choose(key)
  })
  return { draw, show: () => { box.hidden = false } }
}

// The specimen photo is the first paint and the fallback. Once the figure is on
// screen the 3D model replaces it; drag or use the arrow keys to turn it.
// Touch drags turn it sideways only, so the page still scrolls under a finger.
function mountTurntable(root, model, lang, settings) {
  const figure = root.querySelector('.plate-specimen'), slot = root.querySelector('[data-plate-model]')
  const hint = root.querySelector('.plate-turn-hint')
  let viewer = null, opening = null, yaw = 32, pitch = 36, shown = false
  const idle = { update: async () => {} }
  if (!figure || !slot || typeof IntersectionObserver === 'undefined') return idle
  if (navigator.connection?.saveData) return idle

  const gizmo = mountGizmo(root.querySelector('[data-gizmo]'), lang, {
    turn: (dx, dy) => turn(dx, dy),
    snap: (toYaw, toPitch) => snap(toYaw, toPitch),
  })
  const view = () => {
    viewer?.view(yaw, pitch)
    gizmo?.draw(yaw, pitch)
  }
  // Zoom is the shared viewer component (viewer-zoom.js), the same on every model page.
  const zoom = mountZoom({
    stage: slot,
    box: root.querySelector('[data-zoom]'),
    viewer: () => viewer,
    onUse: () => { stopOrbit(); if (hint) hint.hidden = true },
  })
  // A short glide to a named view; instant for people who ask for reduced motion.
  let glide = 0
  function snap(toYaw, toPitch) {
    stopOrbit()
    cancelAnimationFrame(glide)
    if (hint) hint.hidden = true
    const fromYaw = yaw, fromPitch = pitch
    const dYaw = ((toYaw - fromYaw + 540) % 360) - 180
    const begin = performance.now(), length = calm ? 0 : 450
    const step = now => {
      const k = length ? Math.min(1, (now - begin) / length) : 1
      const ease = 1 - (1 - k) ** 3
      yaw = (fromYaw + dYaw * ease + 360) % 360
      pitch = fromPitch + (toPitch - fromPitch) * ease
      view()
      glide = k < 1 ? requestAnimationFrame(step) : 0
    }
    glide = requestAnimationFrame(step)
  }
  // A slow orbit shows that the model is 3D. It stops for good at the first touch
  // and never runs for people who ask for reduced motion or while off screen.
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  let orbiting = !calm, onScreen = true, spin = 0, last = 0
  function orbit(now) {
    spin = 0
    if (!orbiting || !onScreen || !viewer) return
    if (last) yaw = (yaw + (now - last) * 0.012) % 360
    last = now
    view()
    spin = requestAnimationFrame(orbit)
  }
  const startOrbit = () => { if (orbiting && !spin) { last = 0; spin = requestAnimationFrame(orbit) } }
  const stopOrbit = () => {
    orbiting = false
    cancelAnimationFrame(spin)
    spin = 0
  }
  const turn = (dx, dy) => {
    stopOrbit()
    cancelAnimationFrame(glide)
    yaw = (yaw + dx + 360) % 360
    pitch = Math.max(-89, Math.min(89, pitch + dy))
    view()
    if (hint) hint.hidden = true
  }
  async function load() {
    const { paint, paper } = settings()
    try {
      opening ??= import('./model-viewer.js?v=7988ca7cb2ce').then(({ createViewer }) => createViewer(slot, model, lang, () => {}))
      viewer = await opening
      await viewer.setModel(paint, paper)
      if (!shown) gizmo?.show()
      zoom.show()
      view()
      if (!shown) {
        shown = true
        slot.hidden = false
        figure.dataset.turntable = 'ready'
        if (hint) hint.hidden = false
        new IntersectionObserver(entries => {
          onScreen = entries.some(entry => entry.isIntersecting)
          if (onScreen) startOrbit()
        }).observe(figure)
      }
    } catch {
      viewer?.dispose()
      viewer = null
      slot.hidden = true
      delete figure.dataset.turntable
    }
  }
  const watch = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return
    watch.disconnect()
    const start = () => void load()
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 })
    else setTimeout(start, 200)
  })
  watch.observe(figure)

  let drag = null
  slot.addEventListener('pointerdown', event => {
    if (event.button !== 0) return
    stopOrbit()
    slot.setPointerCapture(event.pointerId)
    if (zoom.pointerDown(event)) {
      drag = null
      slot.classList.remove('is-dragging')
      return
    }
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, touch: event.pointerType === 'touch' }
    slot.classList.add('is-dragging')
  })
  slot.addEventListener('pointermove', event => {
    if (zoom.pointerMove(event) || drag?.id !== event.pointerId) return
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y
    drag.x = event.clientX
    drag.y = event.clientY
    // The model follows the hand, as in CAD tools: drag right and it turns right,
    // drag down and its top tips towards you.
    turn(dx * 0.5, drag.touch ? 0 : dy * 0.4)
  })
  const end = event => {
    zoom.pointerEnd(event)
    if (drag?.id !== event.pointerId) return
    drag = null
    slot.classList.remove('is-dragging')
  }
  slot.addEventListener('pointerup', end)
  slot.addEventListener('pointercancel', end)
  slot.addEventListener('lostpointercapture', end)
  slot.addEventListener('focus', stopOrbit)
  slot.addEventListener('keydown', event => {
    const step = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] }[event.key]
    if (!step) return
    event.preventDefault()
    turn(...step)
  })
  return { update: () => (shown ? load() : Promise.resolve()) }
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

  const turntable = mountTurntable(root, model, lang, () => ({ paint, paper: paper.value }))

  let lessonPaper = 'A4'
  async function syncSteps() {
    if (family !== 'airplane' || lessonPaper === paper.value) return
    const requested = paper.value
    const [{ makePlane }, { foldSvg }] = await Promise.all([import('./assets/planes/core.js?v=7988ca7cb2ce'), import('./assets/planes/guide.js?v=7988ca7cb2ce')])
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
    void turntable.update()
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
      const { loadAppearanceSheet } = await import('./appearance-sheet-browser.js?v=7988ca7cb2ce')
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
