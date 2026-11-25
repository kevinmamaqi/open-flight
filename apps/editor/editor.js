import { languageSwitch, localizedLinks } from './atlas-nav.js'
import { butterflySwatches } from './assets/atlas/swatches.js'
import { foldArtwork, showFoldStep } from './fold-lesson.js'
import { keelSteps } from './keel-guide.js'
import { foldedAddress, foldedExports, foldedSettings } from './studio-folded.js'
import { flightPhysics,physicsTitle } from './atlas-physics.js'
import { butterflies } from './flight-butterflies.js'
import { words } from './editor-i18n.js'
import { drawGlide, playGlide } from './editor-glide.js'

const $ = (id) => document.getElementById(id)
let spatial
let spatialMode = 'fold'
const svgNS = 'http://www.w3.org/2000/svg'
const modelIds = ['monarch', 'morpho', 'swallowtail']
const loopback = location.hostname === '127.0.0.1'
import { studioOrigins, bookColorAction } from './studio-origins.js'
import { bookFromStudio } from './model-studio.js'
const updateAtlas = studioOrigins(document.getElementById('origin-atlas'))
const initial = new URLSearchParams(location.hash.slice(1))
if (initial.has('grant')) {
  if (loopback) sessionStorage.setItem('open-flight-grant', initial.get('grant'))
  initial.delete('grant')
  history.replaceState(
    null,
    '',
    location.pathname + location.search + (initial.size ? '#' + initial : ''),
  )
}
const grant = loopback && sessionStorage.getItem('open-flight-grant')
const portable = grant ? null : import('./browser-workshop.js')
const pageOptions = new URLSearchParams(location.search)
let foldedDraft
const foldedCache = new Map()
let foldedView = 'folded'
let foldedStep = 0
let foldedRender = 0
let foldedLesson
const requestedLanguage = pageOptions.get('lang')
if (Object.hasOwn(words, requestedLanguage))
  sessionStorage.setItem('open-flight-language', requestedLanguage)
const storedLanguage = sessionStorage.getItem('open-flight-language')
let locale = Object.hasOwn(words, storedLanguage) ? storedLanguage : 'en'
let revision,
  draft,
  stepIndex = 0,
  currentView = 'wings'
let designIndex = [],
  enabled = new Set()
const guides = new Map(),
  seeds = new Map(),
  draftCache = new Map()
const retryKeys = new Map(),
  downloads = []
let selection = 0,
  previewGeneration = 0,
  previewTimer,
  previewController,
  visibleURL,
  activityGeneration = 0,
  busy = false

function t(key, substitutions = {}) {
  return (words[locale][key] ?? key).replace(/\{(\w+)\}/g, (match, k) => substitutions[k] ?? match)
}
function translateChrome() {
  document.documentElement.lang = locale
  document.title = t('studioTitle') + ' · Open Flight'
  localizedLinks(locale)
  const home = new URL('./', import.meta.url)
  home.searchParams.set('lang', locale)
  $('atlas-home').href = home
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n)
  })
  document.querySelectorAll('[data-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.dataset.aria))
  })
}
function icon(id, small = false) {
  const element = document.createElementNS(svgNS, 'svg'),
    use = document.createElementNS(svgNS, 'use')
  element.setAttribute('class', small ? 'small-icon' : 'icon')
  element.setAttribute('aria-hidden', 'true')
  use.setAttribute('href', new URL('./editor-art.svg#' + id, import.meta.url).href)
  element.append(use)
  return element
}
function el(tag, className, value) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (value !== undefined) node.textContent = value
  return node
}
function message(text = '', error = false, node = $('status')) {
  node.textContent = text
  node.classList.toggle('error', error)
}
async function request(path, options = {}) {
  const response = portable
    ? await (await portable).publicRequest(path, options)
    : await fetch(path, {
        ...options,
        headers: { Authorization: 'Bearer ' + grant, ...options.headers },
      })
  if (!response.ok) {
    let detail
    try {
      detail = await response.json()
    } catch {}
    throw new Error(detail?.code === 'revision_conflict' ? t('conflict') : t('unavailable'))
  }
  return response
}
async function get(path) {
  return (await request(path)).json()
}
async function post(path, body, head) {
  const payload = JSON.stringify(body)
  const fingerprint = JSON.stringify([path, head, payload])
  const key = retryKeys.get(fingerprint) ?? crypto.randomUUID()
  retryKeys.set(fingerprint, key)
  const headers = {
    'Content-Type': 'application/json',
    'Idempotency-Key': key,
  }
  if (head) headers['If-Match'] = '"' + head + '"'
  const result = await (await request(path, { method: 'POST', headers, body: payload })).json()
  retryKeys.delete(fingerprint)
  return result
}
async function draftPreview(design, settings, signal) {
  return (
    await request('/v1/previews/draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ design, ...settings }),
      signal,
    })
  ).json()
}
function refKey(ref) {
  return ref.design_id + '/' + ref.revision_id
}
function nameFor(item) {
  return item.ref.design_id === 'butterfly-001'
    ? t('stock')
    : item.ref.design_id === 'butterfly-' + item.species_id
      ? t(item.species_id)
      : item.name
}
function fresh(item) {
  return {
    parameters: { ...item.parameters },
    appearance_id: item.appearance_id,
  }
}
function edited() {
  return (
    !!revision &&
    (draft.appearance_id !== revision.appearance_id ||
      Object.entries(draft.parameters).some(([k, v]) => v !== revision.parameters[k]))
  )
}
function writableHead() {
  return revision.visibility === 'private' && revision.ref.revision_id === revision.head_revision_id
}
function guide() {
  return guides.get(revision?.species_id)
}
function degrees(n) {
  return n > 0 ? '+' + n + '°' : n < 0 ? '−' + Math.abs(n) + '°' : '0°'
}
function mm(n) {
  return n + (locale === 'ru' ? ' мм' : ' mm')
}
function localizedAngle(n) {
  return n === 0 ? t('flat') : t(n > 0 ? 'signedUp' : 'signedDown', { n: Math.abs(n) })
}

async function listDesigns() {
  const items = []
  let cursor
  do {
    const page = await get(
      '/v1/designs?limit=100' + (cursor ? '&cursor=' + encodeURIComponent(cursor) : ''),
    )
    items.push(...page.items)
    cursor = page.next_cursor
  } while (cursor)
  designIndex = items
  renderLibrary()
}
function renderLibrary() {
  const select = $('design-list'),
    original = document.createElement('optgroup'),
    saved = document.createElement('optgroup')
  original.label = t('original')
  saved.label = t('saves')
  for (const item of designIndex) {
    const group = ['butterfly-001', ...modelIds.map((id) => 'butterfly-' + id)].includes(
      item.ref.design_id,
    )
      ? original
      : saved
    group.append(new Option(nameFor(item), refKey(item.ref)))
  }
  select.replaceChildren(...[saved, original].filter((group) => group.children.length))
  if (revision) {
    const key = refKey(revision.ref)
    if (![...select.options].some((o) => o.value === key))
      select.add(new Option(revision.name + ' · ' + revision.ref.revision_id, key))
    select.value = key
  }
}
async function readRevision(key) {
  const [id, rev] = key.split('/')
  return get('/v1/designs/' + encodeURIComponent(id) + '/revisions/' + encodeURIComponent(rev))
}
async function openChoice(key) {
  const ticket = ++selection
  const seed = [...seeds.values()].find((s) => refKey(s.design.ref) === key)
  const data = seed?.design ?? (await readRevision(key))
  if (ticket === selection) show(data)
}
async function loadSpecs() {
  await Promise.all(
    modelIds.map(async (id) => {
      const entry = designIndex.find((d) => d.ref.design_id === 'butterfly-' + id)
      if (!entry) return
      const design = await readRevision(refKey(entry.ref))
      const preview = await draftPreview(design.ref, {})
      const thumbURL = URL.createObjectURL(new Blob([preview.svg], { type: 'image/svg+xml' }))
      seeds.set(id, { design, thumbURL })
    }),
  )
}
function renderCards() {
  const cards = modelIds.flatMap((id) => {
    const seed = seeds.get(id)
    if (!seed) return []
    const button = el('button', 'species-card')
    button.type = 'button'
    button.dataset.species = id
    button.setAttribute('aria-pressed', String(revision?.species_id === id))
    const specimen = el('span', 'specimen'),
      image = document.createElement('img')
    image.src = seed.thumbURL
    image.alt = ''
    specimen.append(image)
    const caption = el('span'),
      mark = el('span', 'card-check')
    caption.append(el('span', 'species-name', t(id)), el('span', 'species-trait', t(id + 'Trait')))
    mark.append(icon('check', true))
    button.append(specimen, caption, mark)
    button.addEventListener('click', () => {
      if (busy || revision?.ref.design_id === seed.design.ref.design_id) return
      openChoice(refKey(seed.design.ref)).catch(reportError)
    })
    return [button]
  })
  $('species-picker').replaceChildren(...cards)
}
function renderPalette() {
  const choices = revision.supported_appearances.map((appearance) => {
    const id = appearance.appearance_id,
      wrap = el('div', 'palette-option')
    const radio = document.createElement('input')
    Object.assign(radio, {
      type: 'radio',
      name: 'palette',
      id: 'palette-' + id,
      value: id,
      checked: draft.appearance_id === id,
    })
    const label = document.createElement('label')
    label.htmlFor = radio.id
    const dot = el('span', 'palette-dot')
    dot.dataset.appearance = id
    // The dot shows the colours that will actually print (from the print palettes).
    const species = document.querySelector('.controls')?.dataset.species
    const swatch = butterflySwatches[species]?.[id === 'blank' ? 'coloring' : id]
    if (swatch) {
      dot.style.setProperty('--swatch-1', swatch[0])
      dot.style.setProperty('--swatch-2', swatch[1])
      dot.style.setProperty('--swatch-3', swatch[2])
    }
    const name = words[locale][id] ?? appearance.title
    if (['coloring', 'blank'].includes(id)) {
      const hint = el('span', 'sr-only', t('coloringHint'))
      hint.id = 'ink-hint-' + id
      radio.setAttribute('aria-describedby', hint.id)
      label.title = t('coloringHint')
      wrap.append(radio, label, hint)
    } else wrap.append(radio, label)
    label.append(dot, el('span', null, id === 'coloring' ? name + ' · ' + t('lowInk') : name))
    radio.addEventListener('change', () => {
      if (!busy && radio.checked) {
        if (foldedDraft) updateFolded({ appearance_id: id })
        else changeDraft({ appearance_id: id }, 0)
      }
    })
    return wrap
  })
  $('palette-list').replaceChildren(...choices)
}
function setRange(id, name, value = draft.parameters[name]) {
  const definition = revision.parameter_definitions.find((p) => p.name === name)
  if (!definition) return
  const input = $(id)
  Object.assign(input, {
    min: definition.minimum,
    max: definition.maximum,
    step: definition.step,
    value,
  })
  input.style.setProperty(
    '--fill',
    ((input.valueAsNumber - definition.minimum) / (definition.maximum - definition.minimum)) * 100 + '%',
  )
}
function renderSettings() {
  if (!revision) return
  const bookLink = $('book-colors')
  bookLink.hidden = !revision.species_id
  if (revision.species_id) {
    const id = revision.species_id + (foldedDraft ? '-k1' : '')
    bookLink.href = bookFromStudio(id, foldedDraft?.appearance_id ?? draft.appearance_id, locale, foldedDraft?.paper ?? $('paper').value)
    bookLink.textContent = bookColorAction(locale)
  }
  $('construction').hidden = !revision.species_id
  $('tabbed-body').setAttribute('aria-pressed', String(!foldedDraft))
  $('folded-body').setAttribute('aria-pressed', String(!!foldedDraft))
  $('folded-options').hidden = !foldedDraft
  $('activities').hidden = !!foldedDraft
  $('folded-preview').hidden = !foldedDraft
  $('preview').hidden = !!foldedDraft
  $('wing-view').querySelector('span').textContent = t(foldedDraft ? 'foldedBody' : 'wings')
  $('glide-view').querySelector('span').textContent = t(foldedDraft ? 'flatPattern' : 'glideSketch')
  if (foldedDraft) return renderFoldedSettings()
  const p = draft.parameters
  setRange('wing', 'span_mm')
  $('wing-value').textContent = mm(p.span_mm)
  $('wing').setAttribute('aria-valuetext', mm(p.span_mm))
  $('span-min').textContent = mm($('wing').min)
  $('span-max').textContent = mm($('wing').max)
  const hasTrim = 'left_trim_deg' in p && 'right_trim_deg' in p
  $('spatial-open').hidden = !hasTrim
  $('spatial-step').hidden = !hasTrim
  $('trim-controls').hidden = !hasTrim
  $('glide-view').hidden = !hasTrim
  if (hasTrim) {
    for (const side of ['left', 'right']) {
      const name = side + '_trim_deg',
        id = side + '-trim'
      setRange(id, name)
      $(side + '-value').textContent = degrees(p[name])
      $(id).setAttribute('aria-valuetext', localizedAngle(p[name]))
      const radians = (p[name] * Math.PI) / 180
      document
        .querySelector('#' + side + '-profile .bend')
        .setAttribute(
          'd',
          'M2 9H18L' +
            (18 + 21 * Math.cos(radians)).toFixed(2) +
            ' ' +
            (9 - 21 * Math.sin(radians)).toFixed(2),
        )
    }
    for (const button of document.querySelectorAll('[data-preset]')) {
      const [left, right] = presetAngles[button.dataset.preset]
      button.setAttribute('aria-pressed', String(p.left_trim_deg === left && p.right_trim_deg === right))
    }
  }
  for (const radio of document.querySelectorAll('input[name=palette]'))
    radio.checked = radio.value === draft.appearance_id
  const dirty = edited()
  $('reset-design').disabled = busy || !dirty
  $('save-design').disabled =
    busy || !enabled.has(writableHead() ? 'reviseDesign' : 'forkDesign') || (writableHead() && !dirty)
  $('save-label').textContent = t(writableHead() ? (dirty ? 'saveChanges' : 'saved') : 'saveDesign')
  $('print-design').disabled = busy || !enabled.has('startExport')
  $('read-only-note').hidden =
    enabled.has('forkDesign') || enabled.has('reviseDesign') || enabled.has('startExport')
  $('evidence').textContent = t(dirty || revision.evidence_state !== 'concept' ? 'modified' : 'concept')
  $('span').textContent = mm(p.span_mm)
  const scale = p.span_mm / Math.max(184, Number($('wing').max))
  $('preview').style.setProperty('--physical-width', 91 * scale + '%')
  $('preview').style.setProperty('--physical-height', 100 * scale + '%')
  renderBoardCopy()
}
function renderFoldedSettings() {
  const settings = foldedDraft
  setRange('wing', 'span_mm', settings.span_mm)
  const span = mm(settings.span_mm)
  $('wing-value').textContent = span
  $('wing').setAttribute('aria-valuetext', span)
  $('span-min').textContent = mm($('wing').min)
  $('span-max').textContent = mm($('wing').max)
  for (const radio of document.querySelectorAll('input[name=palette]'))
    radio.checked = radio.value === settings.appearance_id
  for (const id of ['spatial-open', 'spatial-step', 'trim-controls', 'read-only-note'])
    $(id).hidden = true
  $('glide-view').hidden = false
  $('glide-board').hidden = true
  $('art-board').hidden = false
  $('wing-view').setAttribute('aria-pressed', String(foldedView === 'folded'))
  $('glide-view').setAttribute('aria-pressed', String(foldedView === 'flatPattern'))
  $('evidence').textContent = t('concept')
  $('board-note').textContent = guide()?.[locale]?.flight_question ?? ''
  $('note-icon').setAttribute('href', './editor-art.svg#leaf')
  $('save-label').textContent = t('copyBuild')
  $('save-design').disabled = busy
  $('print-design').disabled = busy
  $('reset-design').disabled = busy || (
    settings.span_mm === revision.parameters.span_mm &&
    settings.appearance_id === revision.appearance_id
  )
  syncFoldedAddress()
  void renderFoldedPreview()
}
function syncFoldedAddress() {
  const address = foldedAddress(new URL(location.href), foldedDraft, locale, foldedView, foldedStep)
  history.replaceState(null, '', address)
  address.searchParams.delete('construction')
  $('folded-edition').href = './keel.html' + address.search + '#comparison'
}
async function renderFoldedPreview() {
  const ticket = ++foldedRender
  $('art-board').setAttribute('aria-busy', 'true')
  foldedLesson = undefined
  try {
    const api = await (portable ?? import('./browser-workshop.js'))
    if (!foldedDraft || ticket !== foldedRender) return
    const plan = api.makeFoldedButterfly(foldedDraft, locale)
    foldedLesson = { api, plan }
    renderStep()
    const flat = foldedView === 'flatPattern'
    const preview = $('folded-preview')
    preview.setAttribute('aria-label', t(flat ? 'flatPattern' : 'foldedBody') + ' · ' + nameFor(revision))
    preview.replaceChildren(foldArtwork(flat ? api.foldedPreview(plan) : api.foldedFinishedPreview(plan)))
    $('span').textContent = mm(flat ? plan.flat_span_mm : plan.span_mm)
    $('area').textContent = t(flat ? 'flatPattern' : 'foldedBody')
  } catch (error) {
    if (ticket === foldedRender && foldedDraft) reportError(error)
  } finally {
    if (ticket === foldedRender && foldedDraft) $('art-board').setAttribute('aria-busy', 'false')
  }
}
function updateFolded(change) {
  foldedDraft = { ...foldedDraft, ...change }
  clearDownloads()
  renderSettings()
}
function switchConstruction(folded) {
  if (!revision?.species_id || busy || folded === !!foldedDraft) return
  const key = refKey(revision.ref)
  if (!folded) {
    foldedCache.set(key, { settings: foldedDraft, step: foldedStep, view: foldedView })
    const url = new URL(location.href)
    url.search = new URLSearchParams({ lang: locale })
    history.replaceState(null, '', url)
    foldedDraft = undefined
    foldedLesson = undefined
    ++foldedRender
    show(revision)
    return
  }
  previewController?.abort()
  ++previewGeneration
  const saved = foldedCache.get(key)
  foldedStep = saved?.step ?? 0
  foldedView = saved?.view ?? 'folded'
  updateFolded(saved?.settings ?? foldedSettings(new URLSearchParams(), revision, draft))
}

function renderBoardCopy() {
  if (!revision) return
  const activeGuide = guide()
  const skating = currentView === 'glide' && !!activeGuide
  $('wing-view').setAttribute('aria-pressed', String(!skating))
  $('glide-view').setAttribute('aria-pressed', String(skating))
  $('art-board').hidden = skating
  $('glide-board').hidden = !skating
  $('note-icon').setAttribute('href', '/editor-art.svg#' + (skating ? 'flight' : 'leaf'))
  $('board-note').textContent = activeGuide?.[locale]?.flight_question || t('legacyNote')
  if (skating) drawGlide(draft.parameters, revision.species_id, t)
}
function renderMetrics(metrics) {
  const area = Math.round(metrics.planform_area_mm2).toLocaleString(locale)
  const text = [t('area', { n: area })]
  if (Number.isFinite(metrics.aspect_ratio))
    text.push(
      t('flightShape', {
        n: metrics.aspect_ratio.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      }),
    )
  $('area').textContent = text.join(' · ')
}
function fitSpanRule() {
  const image = $('preview')
  if (foldedDraft || !draft || !image.naturalWidth || !image.clientWidth || !image.clientHeight) return
  // A physical-size SVG is decoded at 96 CSS pixels per inch, then fitted inside the preview.
  const fit = Math.min(image.clientWidth / image.naturalWidth, image.clientHeight / image.naturalHeight)
  document.querySelector('.span-rule').style.width = (draft.parameters.span_mm * 96 * fit) / 25.4 + 'px'
}
function changeDraft(change, delay) {
  if (!revision) return
  if (change.appearance_id || change.parameters?.span_mm) foldedCache.delete(refKey(revision.ref))
  draft = {
    ...draft,
    ...change,
    parameters: { ...draft.parameters, ...change.parameters },
  }
  if (edited()) draftCache.set(refKey(revision.ref), draft)
  else draftCache.delete(refKey(revision.ref))
  message()
  clearDownloads()
  renderSettings()
  renderStep()
  schedulePreview(delay)
}
function show(data) {
  if (!data.species_id) foldedDraft = undefined
  const previous = revision
  revision = data
  draft = draftCache.get(refKey(data.ref)) ?? fresh(data)
  if (previous?.species_id !== data.species_id) {
    stepIndex = 0
    if (foldedDraft) {
      foldedDraft = { ...foldedDraft, species: data.species_id }
      foldedStep = 0
    }
  }
  if (!data.species_id) currentView = 'wings'
  const id = data.species_id ?? 'legacy'
  document.querySelector('.preview-card').dataset.species = id
  document.querySelector('.controls').dataset.species = id
  for (const card of document.querySelectorAll('.species-card'))
    card.setAttribute('aria-pressed', String(data.species_id === card.dataset.species))
  $('title').textContent = nameFor(data)
  $('scientific').textContent = guide()?.scientific_name ?? ''
  $('preview').alt = t('designAlt', { name: nameFor(data) })
  $('revision').textContent = data.ref.revision_id
  renderLibrary()
  renderPalette()
  renderSettings()
  renderGuide()
  renderMetrics(data.geometry)
  clearDownloads()
  if (!foldedDraft) {
    const url = new URL(location.href)
    url.searchParams.delete('construction')
    url.hash = new URLSearchParams({ design: data.ref.design_id, revision: data.ref.revision_id })
    history.replaceState(null, '', url)
    message(data.head_revision_id === data.ref.revision_id ? '' : t('preserved'))
    schedulePreview(0)
    listActivities().catch(reportError)
  } else message()
}
function schedulePreview(delay = 0) {
  const token = ++previewGeneration
  clearTimeout(previewTimer)
  previewController?.abort()
  const controller = new AbortController()
  previewController = controller
  const design = revision,
    settings = structuredClone(draft),
    dirty = edited()
  const seed = seeds.get(design.species_id)
  $('art-board').setAttribute('aria-busy', 'true')
  const live = async () => {
    let url,
      metrics = design.geometry,
      owned = false
    if (!dirty && seed?.design.ref.source_sha256 === design.ref.source_sha256) url = seed.thumbURL
    else if (!dirty && enabled.has('previewDesign')) {
      const proof = await post('/v1/previews', { design: design.ref })
      const bytes = await (
        await request('/v1/artifacts/' + proof.svg.artifact_id + '/content', {
          signal: controller.signal,
        })
      ).blob()
      url = URL.createObjectURL(bytes)
      metrics = proof.geometry
      owned = true
    } else {
      const result = await draftPreview(design.ref, settings, controller.signal)
      url = URL.createObjectURL(new Blob([result.svg], { type: 'image/svg+xml' }))
      metrics = result.geometry
      owned = true
    }
    if (token !== previewGeneration) {
      if (owned) URL.revokeObjectURL(url)
      return
    }
    const oldURL = visibleURL
    $('preview').src = url
    $('glider-image').setAttribute('href', url)
    visibleURL = owned ? url : null
    if (oldURL) URL.revokeObjectURL(oldURL)
    $('art-board').setAttribute('aria-busy', 'false')
    renderMetrics(metrics)
  }
  previewTimer = setTimeout(
    () =>
      live().catch((error) => {
        if (token !== previewGeneration || error.name === 'AbortError') return
        $('art-board').setAttribute('aria-busy', 'false')
        $('preview').removeAttribute('src')
        $('glider-image').removeAttribute('href')
        if (visibleURL) URL.revokeObjectURL(visibleURL)
        visibleURL = null
        message(t('previewError') + ' ' + error.message, true)
        const retry = el('button', 'text-button', t('retry'))
        retry.type = 'button'
        retry.addEventListener('click', () => {
          message()
          schedulePreview()
        })
        $('status').append(' ', retry)
      }),
    delay,
  )
}
const presetAngles = { left: [8, 0], neutral: [0, 0], right: [0, 8] }
const files = {
  'print-pdf': ['printPdf', 'pdf'],
  'print-svg': ['printSvg', 'svg'],
  guide: ['pictureGuide', 'html'],
  source: ['printSource', 'json'],
  lesson: ['printLesson', 'md'],
  game: ['printGame', 'md'],
  trial: ['printTrial', 'json'],
}

function renderGuide() {
  const info = guide(),
    content = info?.[locale]
  $('step-content').hidden = !content?.steps?.length
  $('field-guide').hidden = !content
  $('meet-butterfly').hidden = !info?.photo?.local_path
  if (!content) return
  renderStep()
  updateAtlas(info.id, locale)
  const photo = info.photo
  $('photo-box').hidden = !photo.local_path
  if (photo.local_path) {
    $('peek-photo').src = new URL('.' + photo.local_path, import.meta.url).pathname
    $('reference-photo').src = new URL('.' + photo.local_path, import.meta.url).pathname
    $('reference-photo').alt = content.photo_alt
  } else $('reference-photo').removeAttribute('src')
  $('field-name').textContent = content.common_name
  $('observation').textContent = content.observation
  const explanation = flightPhysics(info.id,locale)
  $('butter-physics').hidden=!explanation
  $('butter-physics').querySelector('summary').textContent=physicsTitle(locale)
  $('butter-physics').querySelector('p').textContent=explanation
  $('pixabay-link').href = photo.url
  $('pixabay-link').querySelector('span').textContent = t('photoCredit', {
    name: photo.creator,
  })
  $('nature-link').href = info.natural_history.url
  $('nature-link').textContent = t('inNature')
  $('nature-link').title = info.natural_history.source
}
function openPhoto() {
  const info = guide()
  if (!info?.photo?.local_path) return
  const entry = info[locale]
  $('nature-title').textContent = entry.common_name + ' · ' + info.scientific_name
  $('nature-copy').textContent = entry.observation
  $('nature-photo').src = new URL('.' + info.photo.local_path, import.meta.url).pathname
  $('nature-photo').alt = entry.photo_alt
  $('nature-credit').href = info.photo.url
  $('nature-credit').textContent = t('photoCredit', {
    name: info.photo.creator,
  })
  $('nature-more').href = info.natural_history.url
  $('nature-more').textContent = info.natural_history.source
  $('nature-dialog').showModal()
}
const studioLesson = {
  figure: $('diagram-board'), progress: $('step-count'), title: $('step-title'),
  action: $('step-body'), check: $('step-check'), previous: $('prev-step'),
  next: $('next-step'), nextLabel: $('next-step').querySelector('span'),
}
const stepCount = (n, total) => t('step', { n, total })
function selectFoldedStep(index) {
  foldedStep = index
  syncFoldedAddress()
  renderStep()
}
function renderStep() {
  if (foldedDraft) {
    if (!foldedLesson) return
    const { api, plan } = foldedLesson
    const artwork = foldArtwork(api.foldedLessonSvg(plan, foldedStep))
    showFoldStep(studioLesson, {
      index: foldedStep, total: plan.steps.length, count: stepCount, step: plan.steps[foldedStep], artwork,
      forwardLabel: t('next'),
    })
    $('next-step').querySelector('use').setAttribute('href', './editor-art.svg#next')
    return
  }
  const steps = guide()?.[locale].steps
  if (!steps?.length) return
  stepIndex = Math.min(stepIndex, steps.length - 1)
  const step = steps[stepIndex]
  let action = step.body
  if (step.id === 'fold') {
    const { root, angle } = butterflies[revision.species_id]
    const wing = (draft.parameters.span_mm * (100 - root)) / 200
    const height = Math.round(wing * Math.sin((angle * Math.PI) / 180))
    action += ' ' + t('tipHeight', { height: mm(height) })
  }
  if (step.id === 'launch') action += ' ' + t('buildNote')
  if (step.id === 'trim') {
    action += ' ' + t('currentTrim', {
      left: localizedAngle(draft.parameters.left_trim_deg),
      right: localizedAngle(draft.parameters.right_trim_deg),
    })
  }
  const artwork = document.createElement('img')
  artwork.id = 'step-diagram'
  artwork.alt = ''
  artwork.src = new URL('.' + step.diagram, import.meta.url).pathname
  showFoldStep(studioLesson, {
    index: stepIndex, total: steps.length, count: stepCount, step: { ...step, action }, artwork,
    firstLabel: t('firstStep'), forwardLabel: t('next'),
  })
  const last = stepIndex === steps.length - 1
  $('next-step').querySelector('use').setAttribute('href', './editor-art.svg#' + (last ? 'prev' : 'next'))
  refreshSpatial()
}
function clearDownloads() {
  downloads.splice(0).forEach((url) => URL.revokeObjectURL(url))
  $('downloads').replaceChildren()
  message('', false, $('print-status'))
}
function reportError(error) {
  if (error.name !== 'AbortError') message(error.message, true)
}
async function listActivities() {
  if (!revision) return
  const token = ++activityGeneration
  $('activities').replaceChildren()
  const params = new URLSearchParams({
    locale,
    species_id: revision.species_id ?? 'legacy',
  })
  const page = await get('/v1/activities?' + params)
  if (token !== activityGeneration) return
  $('activities').replaceChildren(
    ...page.items.map((item) => {
      const button = el('button')
      button.type = 'button'
      button.append(
        icon(item.kind === 'game' ? 'target' : 'book', true),
        document.createTextNode(item.title),
      )
      button.addEventListener('click', async () => {
        try {
          const detail = await get(
            '/v1/activities/' +
              encodeURIComponent(item.ref.activity_id) +
              '/revisions/' +
              encodeURIComponent(item.ref.revision_id),
          )
          if (token !== activityGeneration) return
          $('lesson-title').textContent = detail.title
          $('lesson-body').replaceChildren(...lessonNodes(detail.content_markdown))
          $('lesson-dialog').showModal()
        } catch (error) {
          reportError(error)
        }
      })
      return button
    }),
  )
}
// Render the small Markdown subset used in the packaged activities as text nodes.
function lessonNodes(markdown) {
  const sections = []
  let list
  for (const line of markdown
    .replace(/^# [^\n]+\n/, '')
    .trim()
    .split('\n')) {
    const text = line.trim()
    if (!text) {
      list = null
      continue
    }
    const ordered = /^\d+[.)]\s+(.+)/.exec(text),
      unordered = /^[-*]\s+(.+)/.exec(text)
    if (ordered || unordered) {
      const tag = ordered ? 'ol' : 'ul'
      if (!list || list.localName !== tag) {
        list = el(tag)
        sections.push(list)
      }
      const item = el('li')
      item.append(...lessonText((ordered || unordered)[1]))
      list.append(item)
    } else {
      list = null
      const node = el(/^#{1,6}\s/.test(text) ? 'h3' : 'p')
      node.append(...lessonText(text.replace(/^#{1,6}\s+/, '')))
      sections.push(node)
    }
  }
  return sections
}
function lessonText(line) {
  const parts = [],
    inline = /\[([^\]\n]+)\]\((https:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*/g
  let end = 0
  for (const match of line.matchAll(inline)) {
    parts.push(line.slice(end, match.index))
    if (match[3]) parts.push(el('strong', null, match[3]))
    else {
      try {
        const url = new URL(match[2])
        const link = el('a', null, match[1])
        link.href = url.href
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        parts.push(link)
      } catch {
        parts.push(match[1])
      }
    }
    end = match.index + match[0].length
  }
  parts.push(line.slice(end))
  return parts
}
async function persist(name) {
  const oldKey = refKey(revision.ref),
    settings = {
      parameters: { ...draft.parameters },
      appearance_id: draft.appearance_id,
    }
  const data = writableHead()
    ? await post(
        '/v1/designs/' + encodeURIComponent(revision.ref.design_id) + '/revisions',
        settings,
        revision.ref.revision_id,
      )
    : await post('/v1/designs', { source: revision.ref, name, ...settings })
  draftCache.delete(oldKey)
  show(data)
  await listDesigns()
  return data
}
async function mutation(run, errorNode) {
  if (busy) return
  busy = true
  const controls = [
    ...document.querySelectorAll('button:enabled:not([data-close]),select:enabled,input:enabled'),
  ]
  controls.forEach((control) => {
    control.disabled = true
  })
  try {
    await run()
  } catch (error) {
    message(error.message, true, errorNode || $('status'))
  } finally {
    controls.forEach((control) => {
      control.disabled = false
    })
    busy = false
    renderSettings()
    renderStep()
  }
}
function defaultName() {
  return t('myName', {
    name: guide()?.[locale].common_name ?? nameFor(revision),
  })
}
function updatePrintSummary() {
  if (foldedDraft) {
    $('print-summary').textContent = [nameFor(revision), t('foldedBody'), mm(foldedDraft.span_mm), t(foldedDraft.appearance_id)].join(' · ')
    return
  }
  const parts = [nameFor(revision), mm(draft.parameters.span_mm)]
  if (words[locale][draft.appearance_id]) parts.push(t(draft.appearance_id))
  if (revision.species_id)
    parts.push(
      t('currentTrim', {
        left: degrees(draft.parameters.left_trim_deg),
        right: degrees(draft.parameters.right_trim_deg),
      }),
    )
  $('print-summary').textContent = parts.join(' · ') + (edited() ? ' ' + t('unsavedPrint') : '')
}
async function exportFolded() {
  clearDownloads()
  const printLocale = $('print-locale').value
  const planInput = { ...foldedDraft, paper: $('paper').value }
  const api = await (portable ?? import('./browser-workshop.js'))
  const plan = api.makeFoldedButterfly(planInput, printLocale)
  message(t('preparing'), false, $('print-status'))
  await api.prepareFoldedPdf()
  for (const { kind, ext, mime, bytes } of foldedExports(api, plan)) {
    const link = el('a')
    const url = URL.createObjectURL(new Blob([bytes], { type: mime }))
    downloads.push(url)
    link.href = url
    link.dataset.kind = kind
    link.download = [plan.species, 'k1', plan.span_mm, plan.appearance_id, plan.paper, printLocale, kind].join('-') + '.' + ext
    link.append(icon('download', true), document.createTextNode(t(kind === 'fold-guide' ? 'guide' : files[kind][0])))
    $('downloads').append(link)
  }
  message(t('filesReady'), false, $('print-status'))
  $('downloads').querySelector('a')?.focus()
}
async function copyFoldedLink() {
  try {
    await navigator.clipboard.writeText(location.href)
    message(t('buildCopied'))
  } catch {
    const link = el('a', null, location.href)
    link.href = location.href
    $('status').replaceChildren(link)
    link.focus()
  }
}
async function exportFiles() {
  clearDownloads()
  const printLocale = $('print-locale').value,
    paper = $('paper').value
  if (edited()) await persist(defaultName())
  const ref = revision.ref
  message(t('preparing'), false, $('print-status'))
  const formats = ['pdf', 'svg', 'source_json', 'instructions', 'activity_assets', 'trial_sheet']
  if (revision.species_id) formats.push('illustrated_guide')
  const job = await post('/v1/exports', {
    design: ref,
    formats,
    page_size: paper,
    locale: printLocale,
  })
  const done = await get('/v1/jobs/' + encodeURIComponent(job.job_id))
  if (done.status !== 'succeeded') throw new Error(t('downloadsFailed'))
  const results = await Promise.all(
    done.artifact_ids.map(async (id) => {
      const kind = Object.keys(files).find((prefix) => id.startsWith(prefix + '-'))
      if (!kind) return null
      const bytes = await (await request('/v1/artifacts/' + encodeURIComponent(id) + '/content')).blob()
      return { kind, bytes }
    }),
  )
  for (const result of results
    .filter(Boolean)
    .sort((a, b) => Object.keys(files).indexOf(a.kind) - Object.keys(files).indexOf(b.kind))) {
    const [label, ext] = files[result.kind],
      url = URL.createObjectURL(result.bytes),
      link = el('a')
    downloads.push(url)
    link.href = url
    link.dataset.kind = result.kind
    link.download =
      [ref.design_id, ref.revision_id, result.kind, paper, printLocale].join('-') + '.' + ext
    link.append(icon('download', true), document.createTextNode(t(label)))
    $('downloads').append(link)
  }
  updatePrintSummary()
  message(t('filesReady'), false, $('print-status'))
  $('downloads').querySelector('a')?.focus()
}

function refreshSpatial() {
  if (!spatial || !revision?.species_id || !$('spatial-dialog').open) return
  const steps = guide()?.[locale]?.steps ?? []
  spatial.update({
    family: 'butterfly',
    id: revision.species_id,
    name: nameFor(revision),
    mode: spatialMode,
    locale,
    appearance: draft.appearance_id,
    parameters: draft.parameters,
    stage: stepIndex,
    stageCount: steps.length || 6,
    title: steps[stepIndex]?.title,
    caption: steps[stepIndex]?.body,
    onStage(index) {
      stepIndex = index
      renderStep()
    },
    onTrim(side, value) {
      changeDraft({ parameters: { [side + '_trim_deg']: value } }, 150)
    },
  })
  for (const mode of ['fold', 'flight'])
    $('spatial-' + mode).setAttribute('aria-pressed', String(mode === spatialMode))
}
async function openSpatial(mode, start) {
  if (!revision?.species_id) return
  spatialMode = mode
  if (start !== undefined && start !== stepIndex) {
    stepIndex = start
    renderStep()
  }
  if (!$('spatial-dialog').open) $('spatial-dialog').showModal()
  const { mountFlightViewer } = await import('./flight-viewer.js')
  if (!$('spatial-dialog').open) return
  spatial ??= mountFlightViewer($('spatial-surface'))
  refreshSpatial()
}
function wireUI() {
  $('tabbed-body').addEventListener('click', () => switchConstruction(false))
  $('folded-body').addEventListener('click', () => switchConstruction(true))
  $('spatial-open').addEventListener('click', () =>
    openSpatial(
      currentView === 'glide' ? 'flight' : 'fold',
      currentView === 'wings' && stepIndex === 0 ? 2 : undefined,
    ).catch(reportError),
  )
  $('spatial-step').addEventListener('click', () => openSpatial('fold').catch(reportError))
  for (const mode of ['fold', 'flight'])
    $('spatial-' + mode).addEventListener('click', () => openSpatial(mode).catch(reportError))
  $('spatial-dialog').addEventListener('close', () => {
    spatial?.destroy()
    spatial = undefined
  })
  $('preview').addEventListener('load', fitSpanRule)
  new ResizeObserver(fitSpanRule).observe($('preview'))
  for (const side of ['left', 'right']) {
    const profile = document.createElementNS(svgNS, 'svg')
    profile.id = side + '-profile'
    profile.setAttribute('class', 'tab-profile')
    profile.setAttribute('viewBox', '0 0 43 17')
    profile.setAttribute('aria-hidden', 'true')
    for (const [name, d] of [
      ['zero', 'M18 9H42'],
      ['bend', 'M2 9H39'],
    ]) {
      const line = document.createElementNS(svgNS, 'path')
      line.setAttribute('class', name)
      line.setAttribute('d', d)
      profile.append(line)
    }
    $(side + '-value').before(profile)
  }
  for (const button of document.querySelectorAll('[data-close]'))
    button.addEventListener('click', () => button.closest('dialog').close())
  for (const dialog of document.querySelectorAll('dialog')) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return
      const box = dialog.getBoundingClientRect()
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      )
        dialog.close()
    })
  }
  document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
    anchor.addEventListener('click', (event) => {
      const id = anchor.hash.slice(1),
        section = $(id)
      if (!section) return
      event.preventDefault()
      section.tabIndex = -1
      section.focus({ preventScroll: true })
      section.scrollIntoView({ block: 'start' })
    }),
  )
  $('open-library').addEventListener('click', async () => {
    if (busy) return
    try {
      await listDesigns()
      $('library-dialog').showModal()
      $('design-list').focus()
    } catch (error) {
      reportError(error)
    }
  })
  $('load-design').addEventListener('click', async () => {
    if (busy) return
    const value = $('design-list').value
    if (!value) return
    try {
      switchConstruction(false)
      await openChoice(value)
      $('library-dialog').close()
    } catch (error) {
      $('library-dialog').close()
      reportError(error)
    }
  })
  $('wing-view').addEventListener('click', () => {
    if (foldedDraft) {
      foldedView = 'folded'
      renderSettings()
      return
    }
    currentView = 'wings'
    renderBoardCopy()
  })
  $('glide-view').addEventListener('click', () => {
    if (foldedDraft) {
      foldedView = 'flatPattern'
      renderSettings()
      return
    }
    currentView = 'glide'
    renderBoardCopy()
  })
  $('play-glide').addEventListener('click', playGlide)
  $('meet-butterfly').addEventListener('click', openPhoto)
  $('photo-box').addEventListener('click', openPhoto)
  $('jump-guide').addEventListener('click', () => {
    $('print-dialog').close()
    $('build-guide').tabIndex = -1
    $('build-guide').focus({ preventScroll: true })
    $('build-guide').scrollIntoView({ block: 'start' })
  })
  for (const [id, name] of [
    ['wing', 'span_mm'],
    ['left-trim', 'left_trim_deg'],
    ['right-trim', 'right_trim_deg'],
  ]) {
    $(id).addEventListener('input', () => {
      if (busy) return
      if (foldedDraft) {
        if (name === 'span_mm') updateFolded({ span_mm: $(id).valueAsNumber })
        return
      }
      changeDraft({ parameters: { [name]: $(id).valueAsNumber } }, 65)
    })
  }
  for (const button of document.querySelectorAll('[data-preset]')) {
    button.addEventListener('click', () => {
      if (busy || !revision) return
      const [left, right] = presetAngles[button.dataset.preset]
      currentView = 'glide'
      changeDraft({ parameters: { left_trim_deg: left, right_trim_deg: right } }, 0)
      playGlide()
    })
  }
  $('reset-design').addEventListener('click', () => {
    if (!revision || busy) return
    if (foldedDraft) updateFolded({
      span_mm: revision.parameters.span_mm,
      appearance_id: revision.appearance_id,
    })
    else changeDraft(fresh(revision), 0)
    message(t('resetOk'))
  })
  $('save-design').addEventListener('click', () => {
    if (!revision || busy) return
    if (foldedDraft) return void copyFoldedLink()
    if (writableHead())
      return mutation(async () => {
        const d = await persist()
        message(t('saveOk', { name: d.name }))
      })
    message('', false, $('save-status'))
    $('design-name').value = defaultName()
    $('save-dialog').showModal()
    $('design-name').focus()
    $('design-name').select()
  })
  $('save-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const name = $('design-name').value.trim()
    if (!name) {
      $('design-name').setCustomValidity(t('noName'))
      $('design-name').reportValidity()
      return
    }
    mutation(async () => {
      const d = await persist(name)
      $('save-dialog').close()
      message(t('saveOk', { name: d.name }))
    }, $('save-status'))
  })
  $('design-name').addEventListener('input', () => {
    $('design-name').setCustomValidity('')
    message('', false, $('save-status'))
  })
  $('print-design').addEventListener('click', () => {
    if (!revision || busy) return
    if (foldedDraft) $('paper').value = foldedDraft.paper
    updatePrintSummary()
    $('print-dialog').showModal()
  })
  $('print-form').addEventListener('submit', (event) => {
    event.preventDefault()
    mutation(foldedDraft ? exportFolded : exportFiles, $('print-status'))
  })
  $('paper').addEventListener('change', () => {
    if (foldedDraft) updateFolded({ paper: $('paper').value })
    else {
      clearDownloads()
      renderSettings()
    }
  })
  $('print-locale').addEventListener('change', clearDownloads)
  $('prev-step').addEventListener('click', () => {
    if (foldedDraft) return selectFoldedStep(foldedStep - 1)
    if (stepIndex > 0) {
      stepIndex--
      renderStep()
    }
  })
  $('next-step').addEventListener('click', () => {
    if (foldedDraft) return selectFoldedStep(foldedStep + 1)
    const steps = guide()?.[locale].steps
    if (steps?.length) {
      stepIndex = (stepIndex + 1) % steps.length
      renderStep()
    }
  })
  languageSwitch((next) => {
    locale = next
    sessionStorage.setItem('open-flight-language', locale)
    const url = new URL(location.href)
    url.searchParams.set('lang', locale)
    history.replaceState(null, '', url)
    $('print-locale').value = locale
    translateChrome()
    renderCards()
    if (revision) show(revision)
  })
  window.addEventListener('hashchange', () => {
    const params = new URLSearchParams(location.hash.slice(1))
    if (!params.has('design') || !params.has('revision') || busy) return
    switchConstruction(false)
    openChoice(params.get('design') + '/' + params.get('revision')).catch(reportError)
  })
}

translateChrome()
$('print-locale').value = locale
wireUI()
try {
  message(t('loading'))
  const [caps, fieldGuide] = await Promise.all([
    get('/v1/capabilities'),
    get('/v1/field-guide'),
    listDesigns(),
  ])
  enabled = new Set(caps.enabled_operations)
  if (!enabled.has('previewDraft')) throw new Error(t('unavailable'))
  for (const item of fieldGuide.species) guides.set(item.id, item)
  await loadSpecs()
  renderCards()
  const first = seeds.get('monarch')?.design.ref ?? designIndex[0]?.ref
  const explicitRevision = initial.has('design') && initial.has('revision')
  const foldedStart = !explicitRevision && pageOptions.get('construction') === 'k1'
  const foldedSeed = foldedStart && seeds.get(pageOptions.get('species'))?.design
  const selected =
    explicitRevision
      ? initial.get('design') + '/' + initial.get('revision')
      : first && refKey(foldedSeed?.ref ?? first)
  if (!selected) throw new Error(t('selectFirst'))
  await openChoice(selected)
  if (['A4','US_LETTER'].includes(pageOptions.get('paper'))) $('paper').value = pageOptions.get('paper')
  const appearance = pageOptions.get('appearance_id')
  if (!foldedStart && appearance && revision.supported_appearances.some(choice => choice.appearance_id === appearance))
    changeDraft({ appearance_id: appearance }, 0)
  if (foldedStart && revision?.species_id) {
    const step = Number(pageOptions.get('step'))
    const total = keelSteps(locale).length
    foldedStep = Number.isInteger(step) && step >= 1 && step <= total ? step - 1 : 0
    foldedView = pageOptions.get('view') === 'flatPattern' ? 'flatPattern' : 'folded'
    previewController?.abort()
    ++previewGeneration
    updateFolded(foldedSettings(pageOptions, revision, draft))
  } else if (pageOptions.get('view') === 'flight' && revision?.species_id) {
    currentView = 'glide'
    renderBoardCopy()
    $('glide-board').scrollIntoView({ block: 'nearest' })
    await openSpatial('flight')
  }
} catch (error) {
  reportError(error)
}
