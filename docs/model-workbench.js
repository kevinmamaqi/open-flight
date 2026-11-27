import { specimenPath, appearanceChoices } from './model-appearance.js?v=4b14e3f58ca0'
import { bookFromStudio, studioForBookSheet } from './model-studio.js?v=4b14e3f58ca0'
import { sheetIdFor, sheetPath } from './family-sheets.js?v=4b14e3f58ca0'
import { flightObjects } from './assets/objects/activities.js?v=4b14e3f58ca0'
import { objectIds, coloredPacket } from './assets/objects/appearance.js?v=4b14e3f58ca0'
import { escapeHtml as e } from './site-navigation.js?v=4b14e3f58ca0'

import { sketchMarkup, mountSketch } from './model-sketch.js?v=4b14e3f58ca0'
import { studioOrigins } from './studio-origins.js?v=4b14e3f58ca0'
import { k3Facts, k3SpanRange } from './assets/atlas/k3-facts.js?v=4b14e3f58ca0'

const benchLabels = {
  en: ['Model', 'Flight path', 'Customize', 'Wingspan', 'Book uses the standard span', 'Build settings'],
  es: [
    'Modelo',
    'Trayectoria',
    'Personalizar',
    'Envergadura',
    'El libro usa la envergadura estándar',
    'Ajustes de montaje',
  ],
  ru: [
    'Модель',
    'Траектория',
    'Настроить',
    'Размах крыльев',
    'В книге используется стандартный размах',
    'Параметры сборки',
  ],
}

const labels = {
  en: [
    'Colors',
    'Explore in 3D',
    'Paper size',
    'Print my model',
    'Add to my Flight Book',
    'Rotate',
    'View a flight',
    'Pause',
    'Motion illustration',
    'Front',
    'Above',
    'Side',
    'Try another view',
    '3D is unavailable on this device.',
    'Build instructions',
    'Preparing PDF…',
    'Download failed. Try again.',
    'Setting',
    'Loose tuck',
    'Deeper tuck',
    'Clip A',
    'Clip B',
    'Level wings',
    'Raised tips',
    'Flight position',
  ],
  es: [
    'Colores',
    'Explorar en 3D',
    'Formato',
    'Imprimir mi modelo',
    'Añadir a mi libro de vuelo',
    'Girar',
    'Ver un vuelo',
    'Pausa',
    'Ilustración del movimiento',
    'Frente',
    'Arriba',
    'Lado',
    'Cambiar de vista',
    'Este dispositivo no admite la vista 3D.',
    'Instrucciones de montaje',
    'Preparando el PDF…',
    'No se ha podido descargar. Inténtalo de nuevo.',
    'Ajuste',
    'Poco solape',
    'Más solape',
    'Clip A',
    'Clip B',
    'Alas planas',
    'Puntas elevadas',
    'Posición en vuelo',
  ],
  ru: [
    'Окраска',
    'Посмотреть в 3D',
    'Формат бумаги',
    'Напечатать модель',
    'Добавить в книгу полётов',
    'Поворот',
    'Посмотреть полёт',
    'Пауза',
    'Иллюстрация движения',
    'Спереди',
    'Сверху',
    'Сбоку',
    'Сменить ракурс',
    'На этом устройстве недоступен режим 3D.',
    'Инструкция по сборке',
    'Готовим PDF…',
    'Не удалось скачать. Попробуйте ещё раз.',
    'Настройка',
    'Малый нахлёст',
    'Большой нахлёст',
    'Скрепка A',
    'Скрепка B',
    'Крылья ровно',
    'Кончики подняты',
    'Положение в полёте',
  ],
}
export function workbenchMarkup(id, lang, base, details = {}) {
  const t = labels[lang],
    object = objectIds.includes(id),
    sheet = object ? id : sheetIdFor(id)
  const choices = appearanceChoices(id, lang)
  const defaultPaper = object
    ? flightObjects(lang).packets.A4 +
      '#page=' +
      flightObjects(lang).activities.find((item) => item.id === id).page
    : sheetPath(sheet, 'A4', lang)
  const setting = { ring: 18, samara: 20, tandem: 22 }[id]
  const b = benchLabels[lang]
  const title = details.title ?? flightObjects(lang).activities.find((item) => item.id === id)?.title ?? id
  const heading = details.title ? 'h1' : 'h2'
  const art = base + specimenPath(id)
  const icon = (name) =>
    '<svg class="bench-icon" aria-hidden="true"><use href="' + base + 'editor-art.svg#' + name + '"/></svg>'
  const facts = k3Facts[id]
  return `<div class="model-workbench" data-model-workbench="${e(id)}" data-base="${e(base)}">
    <section class="bench-panel specimen-panel">
      <div class="specimen-head"><div><${heading}>${e(title)}</${heading}>${details.subtitle ? '<p class="specimen-subtitle">' + e(details.subtitle) + '</p>' : ''}</div>
      <div class="segmented specimen-modes" role="group" aria-label="${t[12]}">
        <button class="specimen-mode" aria-pressed="true">${icon('wings')}${b[0]}</button><button class="path-mode" aria-pressed="false">${icon('flight')}${b[1]}</button></div></div>
      <div class="model-stage stage-grid" data-family="${facts ? 'butterfly' : object ? 'object' : 'airplane'}"><img class="model-poster" src="${e(art)}" alt="${e(title)}" fetchpriority="high"><div class="model-canvas" hidden></div>
      ${sketchMarkup(id, lang, e(art))}</div>
      <div class="stage-actions"><button type="button" class="button secondary explore">${icon('angles')}${t[1]}</button>
      <span class="specimen-scale">${facts ? '<span data-stage-span>' + facts.span + ' mm</span>' : ''}</span></div>
      <div class="orbit-controls" hidden><label>${t[5]}<input class="orbit" type="range" min="-180" max="180" value="32"></label>
      <label>${t[12]}<select class="angle"><option value="36">${t[9]}</option><option value="82">${t[10]}</option><option value="8">${t[11]}</option></select></label>
      <button class="play button secondary" type="button">${t[6]}</button><label>${t[24]}<input class="flight-position" type="range" min="0" max="100" value="0"></label><small>${t[8]}</small></div>
      ${details.description ? '<p class="specimen-note">' + e(details.description) + '</p>' : ''}
    </section>
    <section class="bench-panel controls-panel"><h2>${icon('sliders')}${b[2]}</h2>
    <fieldset class="model-palette"><legend>${t[0]}</legend><div class="paint-grid">${choices.map(({ id, label, colors }, i) => `<button type="button" data-paint="${e(id)}" aria-pressed="${i === 0}"><span class="palette-chip" aria-hidden="true" style="background:linear-gradient(120deg,${colors[0]} 48%,${colors[1]} 48% 76%,${colors[2]} 76%)"></span>${e(label)}</button>`).join('')}</div></fieldset>
    ${facts ? '<label class="bench-span" for="model-span">' + b[3] + '<output for="model-span">' + facts.span + ' mm</output></label><input id="model-span" class="span-range" type="range" min="' + k3SpanRange.minimum + '" max="' + k3SpanRange.maximum + '" step="' + k3SpanRange.step + '" value="' + facts.span + '">' : ''}
    ${details.metrics ? '<dl class="model-facts">' + details.metrics + '</dl>' : ''}
    <div class="model-tools">${setting ? `<label>${t[17]}<select class="setting"><option value="0">${t[setting]}</option><option value="1">${t[setting + 1]}</option></select></label>` : ''}
    <label>${t[2]}<select class="size"><option>A4</option><option value="US_LETTER">${lang === 'es' ? 'Carta' : 'US Letter'}</option></select></label></div>
    <div class="print-actions"><a class="button primary model-print" href="${e(base + defaultPaper)}">${icon('print')}${t[3]}</a><a class="button secondary model-book" href="${e(base + bookFromStudio(sheet, choices[0].id, lang, 'A4').slice(2))}">${icon('book')}${t[4]}</a></div>
    ${facts ? '<small class="book-span" hidden>' + b[4] + ' (' + facts.span + ' mm).</small>' : ''}<span class="stage-status" role="status"></span></section>
    ${details.panels ?? ''}</div>`
}

export function mountWorkbench(root) {
  const id = root.dataset.modelWorkbench,
    lang = document.documentElement.lang,
    base = root.dataset.base
  const t = labels[lang],
    $ = (selector) => root.querySelector(selector),
    object = objectIds.includes(id)
  const sheet = object ? id : sheetIdFor(id),
    choices = appearanceChoices(id, lang)
  const params = new URLSearchParams(location.search),
    activity = object && flightObjects(lang).activities.find((item) => item.id === id)
  let paint = choices.find((c) => c.id === params.get('colors'))?.id ?? choices[0].id
  let viewer,
    opening,
    revision = 0
  const paper = $('.size'),
    setting = $('.setting'),
    play = $('.play'),
    slider = $('.flight-position'),
    status = $('.stage-status')
  if (params.get('paper') === 'US_LETTER') paper.value = 'US_LETTER'
  if (setting && params.get('setting') === '1') setting.value = '1'
  const span = $('.span-range')
  const facts = k3Facts[id]
  if (span) {
    const value = Number(params.get('span'))
    if (
      Number.isInteger(value) &&
      value >= +span.min &&
      value <= +span.max &&
      (value - span.min) % +span.step === 0
    )
      span.value = value
  }
  let mode = 'specimen',
    stopSketch,
    posterRevision = 0
  const customSpan = () => span && +span.value !== facts.span
  const markMode = (next) => {
    mode = next
    $('.model-poster').hidden = next !== 'specimen'
    $('.model-canvas').hidden = next !== 'orbit'
    $('.orbit-controls').hidden = next !== 'orbit'
    $('.sketch-board').hidden = next !== 'path'
    $('.explore').hidden = next === 'orbit'
    $('.specimen-mode').setAttribute('aria-pressed', String(next !== 'path'))
    $('.path-mode').setAttribute('aria-pressed', String(next === 'path'))
    if (next !== 'path') stopSketch?.()
    if (next !== 'orbit') viewer?.seek(0)
  }
  const setSpecimen = () => {
    revision++
    markMode('specimen')
    if (object && setting.value === '1') void show()
  }
  $('.specimen-mode').onclick = setSpecimen
  $('.path-mode').onclick = () => {
    revision++
    markMode('path')
    stopSketch ??= mountSketch(root, id, lang)
  }
  const map = $('.origin-map')
  if (map) studioOrigins(map)(id, lang)
  const steps = [...root.querySelectorAll('.lesson-steps li')]
  let lessonPaper = 'A4'
  async function syncLessonPaper() {
    if (!steps.length || !id.includes('-') || lessonPaper === paper.value) return
    const requested = paper.value
    const [{ makePlane }, { foldSvg }] = await Promise.all([
      import('./assets/planes/core.js?v=4b14e3f58ca0'),
      import('./assets/planes/guide.js?v=4b14e3f58ca0'),
    ])
    if (paper.value !== requested) return
    const plan = makePlane({ model_id: id, paper: requested }, lang)
    for (const [i, item] of steps.entries()) {
      const step = plan.steps[i]
      item.querySelector('.step-picture').innerHTML = foldSvg(plan, step)
      item.querySelector('h3').textContent = step.title
      item.querySelector('p').textContent = step.instruction
    }
    lessonPaper = requested
  }
  if (steps.length) {
    const previous = $('.lesson-prev'),
      next = $('.lesson-next')
    let index = 0
    const showStep = () => {
      steps.forEach((step, i) => {
        step.hidden = i !== index
      })
      previous.disabled = index === 0
      next.disabled = index === steps.length - 1
      if (next.disabled && document.activeElement === next) previous.focus()
      if (previous.disabled && document.activeElement === previous) next.focus()
    }
    previous.onclick = () => {
      index--
      showStep()
    }
    next.onclick = () => {
      index++
      showStep()
    }
    $('.step-buttons').hidden = false
    showStep()
  }
  function playing(active) {
    play.textContent = active ? t[7] : t[6]
    play.setAttribute('aria-pressed', String(active))
  }
  async function show() {
    const version = ++revision
    mode = 'orbit'
    try {
      opening ??= import('./model-viewer.js?v=4b14e3f58ca0').then(({ createViewer }) =>
        createViewer($('.model-canvas'), id, lang, (fraction, active) => {
          slider.value = Math.round(fraction * 100)
          playing(active)
        }),
      )
      viewer = await opening
      if (version !== revision) return
      await viewer.setModel(paint, paper.value, setting?.value === '1', span ? +span.value : undefined)
      if (version !== revision) return
      markMode('orbit')
      status.textContent = ''
    } catch {
      if (version !== revision) return
      opening = null
      viewer?.dispose()
      viewer = null
      markMode('specimen')
      status.textContent = t[13]
    }
  }
  async function updatePoster() {
    const version = ++posterRevision
    let url = base + specimenPath(id, paint)
    if (customSpan()) {
      const api = await import('./browser-workshop.js?v=4b14e3f58ca0')
      if (version !== posterRevision) return
      const plan = api.makeK3({ species: id, appearance_id: paint, span_mm: +span.value })
      url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(api.k3FinishedSvg(plan))
    }
    $('.model-poster').src = url
    $('.course-flyer').setAttribute('href', url)
  }
  function sync(updateURL) {
    for (const button of root.querySelectorAll('[data-paint]'))
      button.setAttribute('aria-pressed', String(button.dataset.paint === paint))
    void syncLessonPaper().catch(() => {
      status.textContent = t[16]
    })
    void updatePoster().catch(() => {
      status.textContent = t[13]
    })
    if (span) {
      const measure = span.value + ' mm'
      $('.bench-span output').textContent = $('[data-stage-span]').textContent = measure
      $('.book-span').hidden = !customSpan()
      const tip = $('[data-tip-height]')
      if (tip)
      {
        // The tip height is the keel depth under the tip plus the rise from the wing V.
        const rise = (s) => (s / 2) * Math.sin((facts.angle * Math.PI) / 180)
        tip.textContent = Math.round(facts.tip - rise(facts.span) + rise(+span.value)) + ' mm'
      }
      $('.model-poster').style.setProperty('--span-scale', +span.value / k3SpanRange.maximum)
    }
    if (activity && $('.lesson-pattern'))
      $('.lesson-pattern').src = base + activity.appearances.find((a) => a.id === paint).drawing
    const packet = object && coloredPacket(flightObjects(lang).packets[paper.value], paint)
    const link = $('.model-print')
    link.href = base + (object ? packet + '#page=' + activity.page : sheetPath(sheet, paper.value, lang))
    $('.model-book').href = base + bookFromStudio(sheet, paint, lang, paper.value).slice(2)
    const studio = $('[data-model-studio]')
    if (studio)
      studio.href =
        base +
        studioForBookSheet({ lang, paper: paper.value, appearances: { [id]: paint } }, sheet).slice(2) +
        (object ? '&setting=' + setting.value : customSpan() ? '&span=' + span.value : '')
    const url = new URL(location.href)
    if (updateURL) {
      url.searchParams.set('colors', paint)
      url.searchParams.set('paper', paper.value)
      if (setting) url.searchParams.set('setting', setting.value)
      if (span) url.searchParams.set('span', span.value)
      history.replaceState(null, '', url)
      if (mode === 'orbit' || (mode === 'specimen' && setting?.value === '1')) void show()
      root.dispatchEvent(new CustomEvent('modelchange', { detail: { id, paint, paper: paper.value } }))
    }
    for (const a of document.querySelectorAll('.mast a[hreflang]')) {
      const target = new URL(a.href)
      for (const key of ['colors', 'paper', 'setting', 'span'])
        if (url.searchParams.has(key)) target.searchParams.set(key, url.searchParams.get(key))
      a.href = target.href
    }
  }
  root.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-paint]')
    if (choice) {
      paint = choice.dataset.paint
      sync(true)
    }
  })
  if (span) span.oninput = () => sync(true)
  paper.onchange = () => sync(true)
  if (setting) setting.onchange = () => sync(true)
  $('.explore').onclick = show
  $('.orbit').oninput = () => viewer?.view(+$('.orbit').value, +$('.angle').value)
  $('.angle').onchange = $('.orbit').oninput
  play.onclick = () => viewer?.toggle()
  slider.oninput = () => viewer?.seek(Number(slider.value) / 100)
  $('.model-print').onclick = async (event) => {
    if (object || (paint === choices[0].id && !customSpan())) return
    event.preventDefault()
    status.textContent = t[15]
    try {
      const { loadAppearanceSheet } = await import('./appearance-sheet-browser.js?v=4b14e3f58ca0')
      const name =
        [sheet, paint, ...(customSpan() ? [span.value + 'mm'] : []), paper.value, lang].join('-') + '.pdf'
      let bytes
      if (customSpan()) {
        const api = await import('./browser-workshop.js?v=4b14e3f58ca0')
        const plan = api.makeK3({
          species: id,
          span_mm: +span.value,
          appearance_id: paint,
          paper: paper.value,
          locale: lang,
        })
        await api.prepareFoldedPdf()
        bytes = api.k3Pdf(plan)
      } else bytes = await loadAppearanceSheet(sheet, paper.value, lang, paint)
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })),
        a = document.createElement('a')
      a.download = name
      a.href = url
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 60000)
      status.textContent = ''
    } catch {
      status.textContent = t[16]
    }
  }
  root.dataset.ready = 'true'
  sync(false)
  if (setting?.value === '1') void show()
}
if (typeof document !== 'undefined')
  for (const root of document.querySelectorAll('[data-model-workbench]')) mountWorkbench(root)
