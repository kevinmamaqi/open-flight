import { color } from './assets/brand/tokens.js?v=7988ca7cb2ce'
import { makeWorld, clamp, butterflyGeometry, flightRun, practiceTabs } from './flight-geometry.js?v=7988ca7cb2ce'
import { diagramRenderer, framing, spatialRenderer } from './flight-render.js?v=7988ca7cb2ce'
import { flightCircuit, sampleFlight } from './flight-model.js?v=7988ca7cb2ce'
import { circuitWords } from './flight-circuit-copy.js?v=7988ca7cb2ce'
import { printFlightScorecard } from './flight-scorecard.js?v=7988ca7cb2ce'
import { viewerWords } from './flight-words.js?v=7988ca7cb2ce'

const views = {
  orbit: [0.46, 0.69],
  rear: [0, 0.13],
  top: [0, Math.PI / 2 - 0.002],
  side: [Math.PI / 2, 0.11],
}
const directions = ['leftWing', 'rightWing', 'leftTrim', 'rightTrim']
const signed = (value) => (value > 0 ? '+' : '') + value + '°'
const template = `
  <div class="ofv-panel">
    <div class="ofv-top"><span class="ofv-mode" data-v="mode"></span>
      <div class="ofv-camera-tools"><label><span data-v="cameraLabel"></span><select data-v="camera"></select></label>
        <button type="button" data-v="dimension"></button></div>
    </div>
    <div class="ofv-circuit" data-v="circuit"><label><span data-v="gateLabel"></span><select data-v="gate"></select></label><p data-v="intro"></p></div>
    <div class="ofv-stage" data-v="stage" tabindex="0" role="group">
      <div class="ofv-canvas" data-v="surface"></div>
      <span class="ofv-compass" data-v="viewBadge"></span>
      <span class="ofv-key" data-v="key"><span data-v="keyA"></span><span data-v="keyB"></span></span>
    </div>
    <div class="ofv-controls">
      <button type="button" class="ofv-replay" data-v="play"></button>
      <label class="ofv-progress"><span data-v="progressLabel"></span>
        <input type="range" min="0" max="100" step="1" data-v="progress"><output data-v="percent"></output></label>
      <label class="ofv-marks"><input type="checkbox" data-v="marks" checked><span data-v="markLabel"></span></label>
    </div>
    <div class="ofv-lesson">
      <div class="ofv-step-nav" data-v="steps">
        <button type="button" data-v="back">‹</button><span data-v="count"></span><button type="button" data-v="forward">›</button>
      </div>
      <div class="ofv-lesson-copy"><strong data-v="title"></strong><p data-v="caption"></p><small data-v="notice"></small></div>
    </div>
    <div class="ofv-readings" data-v="readings">
      <p data-v="current"></p><p data-v="result" aria-live="polite"></p>
      <small data-v="trace"></small>
      <details class="ofv-gates"><summary data-v="windowLabel"></summary><ol data-v="windows"></ol></details>
    </div>
    <details class="ofv-adjust" data-v="launchSettings" open><summary data-v="launchTitle"></summary>
      <p data-v="how"></p><div class="ofv-sliders" data-v="releaseSliders"></div>
      <button type="button" class="ofv-reset" data-v="launchReset"></button>
    </details>
    <div class="ofv-circuit" data-v="real">
      <p data-v="realSetup"></p><p data-v="balance"></p>
      <label class="ofv-notes"><span data-v="notesLabel"></span><textarea data-v="notes" rows="2" maxlength="800"></textarea></label>
      <small data-v="notesHelp"></small>
      <button type="button" data-v="print"></button>
    </div>
    <details class="ofv-adjust" data-v="adjust"><summary data-v="adjustTitle"></summary>
      <p data-v="adjustHelp"></p><div class="ofv-sliders" data-v="sliders"></div>
      <button type="button" class="ofv-reset" data-v="reset"></button>
    </details>
    <p class="ofv-sr" data-v="accessible" aria-live="polite"></p>
  </div>`

/**
 * Mount once and update with the current design, locale, fold stage and print parameters.
 * Mode "flight" takes the final plane frame. Optional onStage(index) and onTrim(side,degrees)
 * keep the surrounding editor in sync. Practice wing angles and release bank remain local.
 */
export function mountFlightViewer(host) {
  const box = document.createElement('section')
  box.className = 'ofv'
  box.innerHTML = template
  host.replaceChildren(box)
  const el = Object.fromEntries(
    Array.from(box.querySelectorAll('[data-v]')).map((node) => [node.dataset.v, node]),
  )
  const sliders = {}
  for (const key of directions) {
    const label = document.createElement('label'),
      text = document.createElement('span'),
      range = document.createElement('input'),
      out = document.createElement('output')
    range.type = 'range'
    range.min = key.endsWith('Wing') ? '0' : '-12'
    range.max = key.endsWith('Wing') ? '30' : '12'
    range.step = key.endsWith('Wing') ? '1' : '2'
    range.dataset.knob = key
    label.append(text, out, range)
    el.sliders.append(label)
    sliders[key] = { label, text, range, out }
    range.addEventListener('input', () => setKnob(key, Number(range.value)))
  }
  const releaseSliders = {}
  const releaseControls = Object.entries(flightCircuit().controls).filter(([key]) => !key.startsWith('trim'))
  releaseControls.push(['leftTab', { min: -12, max: 12, step: 2 }], ['rightTab', { min: -12, max: 12, step: 2 }])
  for (const [key, { min, max, step }] of releaseControls) {
    const label = document.createElement('label')
    const text = document.createElement('span')
    const range = document.createElement('input')
    const out = document.createElement('output')
    range.type = 'range'
    range.min = min
    range.max = max
    range.step = step
    range.dataset.launch = key
    label.append(text, out, range)
    el.releaseSliders.append(label)
    releaseSliders[key] = { text, range, out, label }
    range.addEventListener('input', () => {
      const value = Number(range.value)
      if (key.endsWith('Tab')) {
        const tabs = practiceTabs(state.run.inputs)
        tabs[key === 'leftTab' ? 'left' : 'right'] = value
        state.launch.trimDeg = (tabs.left + tabs.right) / 2
        state.launch.trimDifferenceDeg = tabs.right - tabs.left
      } else state.launch[key] = value
      prepareRun()
      progress = 0
      stop()
      refreshLabels()
      drawSoon()
    })
  }
  for (const { id } of flightCircuit().gates) {
    const opt = document.createElement('option')
    opt.value = id
    el.gate.append(opt)
  }
  for (const key of Object.keys(views)) {
    const opt = document.createElement('option')
    opt.value = key
    el.camera.append(opt)
  }
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const images = new Map()
  let state = {
    family: 'butterfly',
    id: 'monarch',
    locale: 'en',
    stage: 2,
    mode: 'fold',
    parameters: {},
    marks: true,
    camera: 'orbit',
    launch: { gate: 'level' },
  }
  let lang = viewerWords.en,
    words = circuitWords.en,
    circuit = flightCircuit(),
    angle = [...views.orbit],
    progress = 1,
    requested = 0,
    epoch = 0,
    renderer = null,
    canvas = null
  let backend = 'diagram',
    spatialPossible = true,
    destroyed = false,
    playing = false,
    drag = null,
    firstState = true,
    frameEpoch = 0,
    notesKey = '',
    notesSessionOnly = false
  const sessionNotes = new Map()
  function getImage(src) {
    if (!src) return null
    if (src instanceof HTMLCanvasElement) return src
    if (!images.has(src)) {
      const image = new Image()
      images.set(src, image)
      image.onload = drawSoon
      image.onerror = drawSoon
      image.src = src
    }
    const im = images.get(src)
    return im.complete && im.naturalWidth > 0 ? im : null
  }
  function draw() {
    if (!renderer || destroyed) return
    const rect = el.surface.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const world = makeWorld(state, progress)
    try {
      renderer.draw(
        world,
        framing(world, state, Math.round(rect.width), Math.round(rect.height), angle),
        getImage,
      )
    } catch (error) {
      if (backend !== 'webgl') return
      spatialPossible = false
      useDiagram()
    }
  }
  function drawSoon() {
    if (destroyed || requested) return
    requested = requestAnimationFrame(() => {
      requested = 0
      draw()
    })
  }
  function changeCanvas(node, kind, driver) {
    if (destroyed) {
      driver.dispose()
      return
    }
    renderer?.dispose()
    renderer = driver
    canvas = node
    backend = kind
    box.dataset.renderer = kind
    node.setAttribute('aria-hidden', 'true')
    el.surface.replaceChildren(node)
    refreshLabels()
    drawSoon()
  }
  function useDiagram() {
    ++epoch
    const node = document.createElement('canvas')
    try {
      changeCanvas(node, 'diagram', diagramRenderer(node))
    } catch {
      renderer?.dispose()
      renderer = null
      backend = 'text'
      el.surface.textContent = lang.noCanvas
      box.dataset.renderer = 'text'
      refreshLabels()
    }
  }
  async function useSpatial() {
    const token = ++epoch
    const node = document.createElement('canvas')
    let driver
    try {
      driver = await spatialRenderer(node)
    } catch {
      if (!destroyed && token === epoch) {
        spatialPossible = false
        refreshLabels()
      }
      return
    }
    if (destroyed || token !== epoch) {
      driver.dispose()
      return
    }
    node.addEventListener(
      'webglcontextlost',
      (event) => {
        event.preventDefault()
        if (!destroyed && canvas === node) {
          spatialPossible = false
          useDiagram()
        }
      },
      { once: true },
    )
    changeCanvas(node, 'webgl', driver)
  }
  const number = (value) => state.format.format(value)
  const units = { speed: ' m/s', height: ' m' }
  function prepareRun() {
    state.run = null
    if (state.mode === 'flight') {
      state.run = flightRun(state)
      state.gateMarkers = circuit.gates.find(({ id }) => id === state.run.gate).markers
    }
  }
  function setGate(gate) {
    state.launch = { gate }
    if (state.family === 'butterfly') {
      const { left_trim_deg = 0, right_trim_deg = 0 } = state.parameters
      state.launch.trimDeg = (left_trim_deg + right_trim_deg) / 2
      state.launch.trimDifferenceDeg = right_trim_deg - left_trim_deg
    }
    prepareRun()
    setView(circuit.gates.find(({ id }) => id === gate).view)
    progress = 0
    stop()
    drawSoon()
  }
  function renderWindows(gate) {
    el.windowLabel.textContent = words.window
    el.windows.replaceChildren()
    for (const marker of gate.markers) {
      const { forward, across, width, bottom, top } = marker
      const index = state.run.samples.findIndex(({ point }) => point[2] >= forward)
      const item = document.createElement('li')
      const span = number(across - width / 2) + '–' + number(across + width / 2)
      const height = bottom === top ? number(top) : number(bottom) + '–' + number(top)
      const position = words.travel + ' ' + number(forward) + ' m · ' +
        words.across + ' ' + span + ' m · ' + words.heightNow + ' ' + height + ' m'
      if (index < 1) {
        item.textContent = position + '. ' + words.unreached
      } else {
        const a = state.run.samples[index - 1].point
        const b = state.run.samples[index].point
        const ratio = (forward - a[2]) / (b[2] - a[2])
        const right = a[0] + ratio * (b[0] - a[0])
        const above = a[1] + ratio * (b[1] - a[1])
        item.textContent = position + '. ' + words.crossing + ' ' +
          words.across + ' ' + number(right) + ' m · ' + words.heightNow + ' ' + number(above) + ' m'
      }
      el.windows.append(item)
    }
  }
  function phaseLabel() {
    const v = Math.round(progress * 100) + '%'
    el.progress.value = String(Math.round(progress * 100))
    el.percent.textContent = v
    el.progress.setAttribute('aria-valuetext', v)
    if (state.mode === 'flight' && state.run) {
      const a = sampleFlight(state.run, progress)
      el.current.textContent =
        words.progress + ' ' + number(a.time) + ' s · ' + words.travel + ' ' +
        number(a.point[2]) + ' m · ' + words.across + ' ' + number(a.point[0]) +
        ' m · ' + words.heightNow + ' ' + number(a.point[1]) + ' m · ' +
        words.pitch + ' ' + number(a.pitchDeg) + '° · ' +
        words.directionNow + ' ' + number(a.directionDeg) + '° · ' +
        words.attackNow + ' ' + number(a.angleOfAttackDeg) + '° · ' +
        words.speedNow + ' ' + number(a.speed) + ' m/s'
      if (backend === 'text') el.surface.textContent = el.current.textContent
    }
    el.play.textContent =
      (playing ? 'Ⅱ  ' : motion.matches ? '›  ' : '↻  ') +
      (playing
        ? lang.pause
        : motion.matches
          ? lang.advance
          : state.mode === 'flight'
            ? lang.launch
            : lang.replay)
  }
  function currentValues() {
    const p = state.parameters,
      baseline = butterflyGeometry[state.id]?.angle ?? 8
    return {
      leftWing: state.leftWing ?? baseline,
      rightWing: state.rightWing ?? baseline,
      leftTrim: p.left_trim_deg ?? 0,
      rightTrim: p.right_trim_deg ?? 0,
    }
  }
  function refreshLabels() {
    const flight = state.mode === 'flight',
      butter = state.family === 'butterfly'
    box.dataset.mode = state.mode
    lang = viewerWords[state.locale] ?? viewerWords.en
    words = circuitWords[state.locale] ?? circuitWords.en
    circuit = flightCircuit(state.locale)
    const gate = circuit.gates.find(({ id }) => id === state.launch.gate)
    for (const key of ['circuit', 'readings', 'launchSettings', 'real']) el[key].hidden = !flight
    if (backend === 'text' && !flight) el.surface.textContent = lang.noCanvas
    if (flight && state.run) {
      box.lang = state.locale
      el.gateLabel.textContent = words.select
      for (const opt of el.gate.options) opt.textContent = circuit.gates.find(({ id }) => id === opt.value).name
      el.gate.value = state.launch.gate
      el.intro.textContent = circuit.intro
      el.launchTitle.textContent = words.setup
      el.launchReset.textContent = words.reset
      el.print.textContent = words.print
      el.notesLabel.textContent = words.notes
      const key = ['open-flight', 'real-flight-notes', state.family, state.id, gate.id].join('/')
      if (key !== notesKey) {
        notesKey = key
        let saved = sessionNotes.get(key)
        if (saved === undefined) {
          try {
            saved = localStorage.getItem(key)
          } catch {
            notesSessionOnly = true
          }
        }
        el.notes.value = saved ?? ''
      }
      el.notesHelp.textContent = notesSessionOnly ? words.notesSession : words.notesHelp
      el.realSetup.textContent = gate.real
      el.how.textContent = words.how
      el.balance.textContent = words.balance
      el.trace.textContent = words.trace
      renderWindows(gate)
      const { outcome, end, landing } = state.run
      el.result.textContent = words[outcome] + '. ' + words[end] +
        (landing ? ' · ' + words.travel + ' ' + number(landing[2]) + ' m · ' +
          words.across + ' ' + number(landing[0]) + ' m' : '')
      const tabs = practiceTabs(state.run.inputs)
      for (const [key, { text, range, out, label }] of Object.entries(releaseSliders)) {
        const value = key === 'leftTab' ? tabs.left : key === 'rightTab' ? tabs.right : state.run.inputs[key]
        label.hidden = !butter && key.endsWith('Tab')
        text.textContent = words[key]
        range.value = String(value)
        out.textContent = number(value) + (units[key] ?? '°')
        range.setAttribute('aria-label', words[key])
        range.setAttribute('aria-valuetext', out.textContent)
      }
    }
    const camera = lang[state.camera] ?? lang.orbit
    el.cameraLabel.textContent = lang.camera
    for (const opt of el.camera.options) opt.textContent = lang[opt.value]
    el.camera.value = state.camera
    el.viewBadge.textContent = camera
    el.mode.textContent = flight ? lang.flight : lang.folded
    el.dimension.textContent =
      backend === 'webgl' ? lang.diagram : spatialPossible ? lang.spatial : lang.noGPU
    el.dimension.disabled = !spatialPossible && backend !== 'webgl'
    el.stage.setAttribute('aria-label', camera + '. ' + lang.interaction)
    el.surface.title = lang.interaction
    el.progressLabel.textContent = flight ? lang.route : lang.pose
    el.markLabel.textContent = lang.marks
    el.marks.parentElement.hidden = flight
    el.marks.checked = !!state.marks
    el.steps.hidden = flight
    el.back.setAttribute('aria-label', lang.previous)
    el.forward.setAttribute('aria-label', lang.next)
    const count = state.stageCount ?? (butter ? 6 : 1)
    el.count.textContent = lang.stage + ' ' + (state.stage + 1) + ' ' + lang.stageOf + ' ' + count
    el.back.disabled = state.stage <= 0 || (!butter && !state.onStage)
    el.forward.disabled = state.stage >= count - 1 || (!butter && !state.onStage)
    el.title.textContent = flight
      ? gate.name
      : state.title || (butter ? lang.phases[state.stage] : state.name) || lang.folded
    el.caption.textContent = flight
      ? gate.hint
      : state.caption || (butter ? lang.tips[state.stage] : '') || ''
    el.notice.hidden = !flight
    el.notice.textContent = flight ? words.notice : ''
    el.accessible.textContent = [el.mode.textContent, el.title.textContent, camera]
      .filter(Boolean)
      .join('. ')
    el.adjust.hidden = !butter || flight
    el.adjustTitle.textContent = lang.adjust
    el.adjustHelp.textContent = lang.trimHelp
    el.reset.textContent = lang.reset
    const values = currentValues()
    const showAngles = butter && state.marks && !flight && [2, 4, 5].includes(state.stage)
    el.key.hidden = !flight && !showAngles
    el.key.dataset.flight = String(flight)
    if (flight) {
      el.keyA.textContent = lang.release
      el.keyB.textContent = state.run?.landing ? lang.landing : ''
      el.keyB.hidden = !state.run?.landing
    } else if (showAngles) {
      el.keyB.hidden = false
      const isTrim = state.stage >= 4
      el.keyA.textContent =
        (isTrim ? lang.leftTrim : lang.leftWing) +
        ' ' +
        signed(isTrim ? values.leftTrim : values.leftWing)
      el.keyB.textContent =
        (isTrim ? lang.rightTrim : lang.rightWing) +
        ' ' +
        signed(isTrim ? values.rightTrim : values.rightWing)
    }
    for (const key of directions) {
      const { range, text, out, label } = sliders[key]
      text.textContent = lang[key]
      range.value = String(values[key])
      out.textContent = signed(values[key])
      range.setAttribute('aria-label', lang[key])
      range.setAttribute('aria-valuetext', signed(values[key]))
    }
    phaseLabel()
  }
  function stop() {
    ++frameEpoch
    playing = false
    phaseLabel()
  }
  function play() {
    if (playing) {
      stop()
      return
    }
    if (motion.matches) {
      progress = progress >= 0.999 ? 0 : clamp(progress + 0.25, 0, 1)
      phaseLabel()
      drawSoon()
      return
    }
    const start = performance.now(),
      duration = state.mode === 'flight' ? 3100 : 1850,
      version = ++frameEpoch
    playing = true
    progress = 0
    phaseLabel()
    const tick = (now) => {
      if (destroyed || version !== frameEpoch) return
      const t = clamp((now - start) / duration, 0, 1)
      progress = state.mode === 'flight' ? t : t * t * (3 - 2 * t)
      if (t === 1) playing = false
      phaseLabel()
      draw()
      if (playing) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  function setKnob(key, value) {
    if (key.endsWith('Trim')) {
      const side = key === 'leftTrim' ? 'left' : 'right'
      state.parameters = { ...state.parameters, [side + '_trim_deg']: value }
      if (state.mode === 'fold' && state.stage < 4 && state.family === 'butterfly') setStage(4)
      state.onTrim?.(side, value)
    } else if (key.endsWith('Wing')) {
      state[key] = value
      if (state.mode === 'fold' && state.stage < 2 && state.family === 'butterfly') setStage(2)
    }
    refreshLabels()
    drawSoon()
  }
  function setStage(next) {
    if (next === state.stage) return
    const callback = state.onStage
    state.stage = next
    state.title = ''
    state.caption = ''
    progress = state.family === 'airplane' ? 0.46 : 1
    stop()
    refreshLabels()
    drawSoon()
    callback?.(next)
  }
  function setView(key) {
    state.camera = key
    angle = [...views[key]]
    if (state.mode === 'flight' && key === 'orbit') angle = [0.93, 0.63]
    if (state.mode === 'flight' && key === 'side') angle = [Math.PI / 2, 0]
    refreshLabels()
    drawSoon()
  }
  function orbit(dx, dy) {
    angle = [angle[0] + dx, clamp(angle[1] + dy, 0.04, Math.PI / 2 - 0.002)]
    state.camera = 'orbit'
    el.camera.value = 'orbit'
    el.viewBadge.textContent = lang.orbit
    el.stage.setAttribute('aria-label', lang.orbit + '. ' + lang.interaction)
    drawSoon()
  }
  function sheetTexture() {
    if (state.family !== 'airplane' || !state.sheetDecoration || !state.planes) return null
    const key = ['paper', state.id, state.appearance, state.planes.width, state.planes.height].join('/')
    if (images.has(key)) return images.get(key)
    const canvas = document.createElement('canvas'),
      scale = 560 / state.planes.width,
      ctx = canvas.getContext('2d')
    canvas.width = 560
    canvas.height = Math.round(state.planes.height * scale)
    if (!ctx) return null
    ctx.scale(scale, scale)
    ctx.fillStyle = color.surface
    ctx.fillRect(0, 0, state.planes.width, state.planes.height)
    for (const part of state.sheetDecoration) {
      if (part.type !== 'polygon' || !part.points.length) continue
      ctx.beginPath()
      ctx.moveTo(...part.points[0])
      for (const p of part.points.slice(1)) ctx.lineTo(...p)
      ctx.closePath()
      ctx.fillStyle = part.fill
      ctx.fill()
    }
    images.set(key, canvas)
    return canvas
  }
  function update(options = {}) {
    const design = options.id !== undefined && options.id !== state.id
    const changed =
      firstState ||
      design ||
      (options.mode !== undefined && options.mode !== state.mode) ||
      (options.stage !== undefined && options.stage !== state.stage)
    const newMode = firstState || (options.mode !== undefined && options.mode !== state.mode)
    if (design) {
      delete state.leftWing
      delete state.rightWing
      state.parameters = {}
      state.caption = ''
      state.title = ''
    }
    state = { ...state, ...options, parameters: { ...state.parameters, ...(options.parameters ?? {}) } }
    state.paperTexture = sheetTexture()
    state.locale = Object.hasOwn(viewerWords, state.locale) ? state.locale : 'en'
    state.format = new Intl.NumberFormat(state.locale, { maximumFractionDigits: 1 })
    box.lang = state.locale
    if (state.mode === 'flight') {
      if (newMode || design) setGate('level')
      else prepareRun()
    }
    if (changed && state.mode !== 'flight') {
      stop()
      progress =
        state.family === 'airplane' && state.planes?.kind === 'flat' ? 0.43 : 1
      if (newMode || design) setView('orbit')
    }
    firstState = false
    refreshLabels()
    drawSoon()
  }
  el.gate.addEventListener('change', () => setGate(el.gate.value))
  el.launchReset.addEventListener('click', () => setGate(state.launch.gate))
  el.notes.addEventListener('input', () => {
    const value = el.notes.value
    sessionNotes.set(notesKey, value)
    try {
      if (value) localStorage.setItem(notesKey, value)
      else localStorage.removeItem(notesKey)
    } catch {
      notesSessionOnly = true
      el.notesHelp.textContent = words.notesSession
    }
  })
  el.print.addEventListener('click', () => printFlightScorecard(circuit, state.locale))
  el.play.addEventListener('click', play)
  el.progress.addEventListener('input', () => {
    const next = Number(el.progress.value) / 100
    stop()
    progress = next
    phaseLabel()
    drawSoon()
  })
  el.marks.addEventListener('change', () => {
    state.marks = el.marks.checked
    refreshLabels()
    drawSoon()
  })
  el.camera.addEventListener('change', () => setView(el.camera.value))
  el.dimension.addEventListener('click', () => (backend === 'webgl' ? useDiagram() : useSpatial()))
  el.back.addEventListener('click', () => setStage(state.stage - 1))
  el.forward.addEventListener('click', () => setStage(state.stage + 1))
  el.reset.addEventListener('click', () => {
    delete state.leftWing
    delete state.rightWing
    if (state.family === 'butterfly') {
      state.parameters = { ...state.parameters, left_trim_deg: 0, right_trim_deg: 0 }
      state.onTrim?.('left', 0)
      state.onTrim?.('right', 0)
    }
    refreshLabels()
    drawSoon()
  })
  el.stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return
    drag = [event.clientX, event.clientY, event.pointerId]
    el.stage.setPointerCapture(event.pointerId)
  })
  el.stage.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag[2]) return
    const dx = event.clientX - drag[0],
      dy = event.clientY - drag[1]
    drag = [event.clientX, event.clientY, event.pointerId]
    orbit(-dx * 0.008, dy * 0.008)
  })
  el.stage.addEventListener('lostpointercapture', () => (drag = null))
  el.stage.addEventListener('keydown', (event) => {
    const key = {
      ArrowLeft: [-0.18, 0],
      ArrowRight: [0.18, 0],
      ArrowUp: [0, 0.13],
      ArrowDown: [0, -0.13],
    }[event.key]
    if (key) {
      event.preventDefault()
      orbit(...key)
    }
  })
  const onVisibility = () => {
    if (document.hidden) stop()
  }
  document.addEventListener('visibilitychange', onVisibility)
  motion.addEventListener('change', stop)
  const resize = new ResizeObserver(drawSoon)
  resize.observe(el.surface)
  useDiagram()
  useSpatial()
  return {
    update,
    destroy() {
      destroyed = true
      ++epoch
      ++frameEpoch
      resize.disconnect()
      cancelAnimationFrame(requested)
      motion.removeEventListener('change', stop)
      document.removeEventListener('visibilitychange', onVisibility)
      renderer?.dispose()
      for (const im of images.values()) {
        im.onload = null
        im.onerror = null
      }
      box.remove()
    },
  }
}
