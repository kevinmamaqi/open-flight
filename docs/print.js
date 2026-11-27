// /print/: choose one to three designs, then get one PDF.
// One design, and the three ready sets, are static files from the build. Two or three designs
// are those singles joined here with pdf-lib, which loads only when a second design is chosen.
import { breadcrumbs, navHref, siteHeader, siteLabels, siteLocales } from './site-navigation.js?v=60abccfc0f99'
import { printFooterHtml, printPageHtml } from './print-page.js?v=60abccfc0f99'
import { counted, printCopy, printName } from './print-copy.js?v=60abccfc0f99'
import { designName } from './print-guide-content.js?v=60abccfc0f99'
import {
  bookletLink, defaultPaper, formatBytes, maxDesigns, pageCount, printFilename, readSelection,
  readySetById, readySetFor, resolvePlate, selectionHash, setPath, singlePath, staticPath, toggleDesign,
} from './print-and-play.js?v=60abccfc0f99'

const storageKey = 'open-flight-print'
const $ = (id) => document.getElementById(id)
const params = new URLSearchParams(location.search)
const lang = [params.get('lang'), document.documentElement.lang].find((value) => siteLocales.includes(value)) || 'en'
const base = document.body.dataset.base || './'
document.documentElement.lang = lang
const t = (key) => printCopy[key][lang]

// Pages from the build arrive complete. The development server serves the bare template.
const root = $('print-root')
if (!root.firstElementChild) {
  root.innerHTML = printPageHtml(lang, base)
  document.title = printCopy.documentTitle[lang]
}
const mast = document.querySelector('[data-site-page]')
if (mast && !mast.firstElementChild) mast.innerHTML = siteHeader('print', lang, base, 'print')
const trail = $('print-trail')
if (trail && !trail.firstElementChild)
  trail.innerHTML = breadcrumbs([{ label: siteLabels.home[lang], href: navHref('home', lang, base) }, { label: printName[lang] }], lang)
const footer = $('footer')
if (footer && !footer.firstElementChild) footer.innerHTML = printFooterHtml(lang, base)
const skip = document.querySelector('[data-site-skip]')
if (skip) skip.textContent = siteLabels.skip[lang]

// ---- State: kept in the hash (shareable, opens as a booklet) and in sessionStorage -----------
function loadState() {
  const fromHash = readSelection(location.href, navigator.languages)
  if (fromHash.plates.length || /[#&]m=/.test(location.hash)) return fromHash
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey))
    if (saved && Array.isArray(saved.plates)) {
      const plates = saved.plates.filter((id) => { try { return resolvePlate(id) } catch { return false } }).slice(0, maxDesigns)
      return { plates, paper: saved.paper === 'US_LETTER' ? 'US_LETTER' : 'A4', edge: saved.edge === 'whole' ? 'whole' : 'cut' }
    }
  } catch { /* A private window may not allow storage. */ }
  return { plates: [], paper: defaultPaper(navigator.languages), edge: 'cut' }
}
const state = loadState()
// "Add to Print & Play" on a plate links here with #add=<plate ID>: add it to the set being built.
const adding = new URLSearchParams(location.hash.slice(1)).get('add')
if (adding) {
  try {
    if (!state.plates.includes(resolvePlate(adding).id)) state.plates = toggleDesign(state.plates, adding).plates
  } catch { /* Unknown plate: keep the current set. */ }
  history.replaceState(null, '', location.pathname + location.search)
}
if (state.edge === 'whole' && !readySetFor(state)) state.edge = 'cut'
const selection = () => ({ plates: [...state.plates], paper: state.paper, edge: state.edge, lang })

// ---- Sizes: exact from the build for static files, summed (then measured) for joined sets ------
let manifest = null
const merged = new Map()
const key = () => state.plates.join('-') + '|' + state.paper + '|' + state.edge
const manifestRow = (path) => manifest?.files?.[path.replace(/^print\//, '')] ?? null

function sizeInfo() {
  if (!state.plates.length) return null
  const pages = pageCount(state.plates)
  const path = staticPath(selection())
  if (path) {
    const row = manifestRow(path)
    return { pages, bytes: row?.bytes ?? null, exact: Boolean(row) }
  }
  if (merged.has(key())) return { pages, bytes: merged.get(key()).length, exact: true }
  const sizes = state.plates.map((id) => manifestRow(singlePath(id, state.paper, lang))?.bytes)
  return { pages, bytes: sizes.every(Number.isFinite) ? sizes.reduce((a, b) => a + b, 0) : null, exact: false }
}

// ---- Rendering --------------------------------------------------------------------------------
function render() {
  const active = readySetFor(state)
  for (const card of root.querySelectorAll('[data-plate]'))
    card.setAttribute('aria-pressed', String(state.plates.includes(card.dataset.plate)))
  for (const card of root.querySelectorAll('[data-set]'))
    card.setAttribute('aria-pressed', String(active?.id === card.dataset.set))
  $('paper').value = state.paper
  const info = sizeInfo()
  const summary = $('summary')
  if (!info) summary.textContent = t('empty')
  else {
    const size = info.bytes == null ? '' : ' · ' + (info.exact ? '' : t('about') + ' ') + formatBytes(info.bytes)
    summary.textContent = counted(state.plates.length, lang, printCopy.designOne, printCopy.designMany, printCopy.designMany5) +
      ' · ' + counted(info.pages, lang, printCopy.pageOne, printCopy.pageMany, printCopy.pageMany5) + size
  }
  $('get').setAttribute('aria-disabled', String(!state.plates.length))
  $('booklet').href = bookletLink(selection(), base + 'book.html')
  for (const meta of root.querySelectorAll('[data-set-meta]')) {
    const set = readySetById(meta.dataset.setMeta)
    const row = manifestRow(setPath(set.id, state.paper, lang))
    meta.textContent = counted(pageCount(set.plates), lang, printCopy.pageOne, printCopy.pageMany, printCopy.pageMany5) +
      (row ? ' · ' + formatBytes(row.bytes) : '')
  }
  const hash = state.plates.length ? selectionHash(state) : ''
  history.replaceState(null, '', location.pathname + location.search + hash)
  for (const code of siteLocales) {
    const link = $(code)
    if (link?.href) link.href = link.href.split('#')[0] + hash
  }
  try { sessionStorage.setItem(storageKey, JSON.stringify({ plates: state.plates, paper: state.paper, edge: state.edge })) } catch { /* Optional. */ }
}

function changed(message = '') {
  $('after').hidden = true
  $('status').textContent = message
  render()
  if (state.plates.length > 1 && !readySetFor(state)) prepareMerge().catch(() => {})
}

// ---- Joining singles in the browser -----------------------------------------------------------
let engine = null
async function fetchBytes(path) {
  const response = await fetch(base + path)
  if (!response.ok) throw new Error('Could not load ' + path)
  return new Uint8Array(await response.arrayBuffer())
}
async function prepareMerge() {
  const snapshot = key()
  if (merged.has(snapshot)) return merged.get(snapshot)
  const ids = [...state.plates], { paper } = state
  const [library, ...singles] = await Promise.all([
    engine ??= import('./print-merge-engine.js?v=60abccfc0f99'),
    ...ids.map((id) => fetchBytes(singlePath(id, paper, lang))),
  ])
  const bytes = await library.mergePdfs(singles, { title: library.setTitle(ids), lang })
  merged.set(ids.join('-') + '|' + paper + '|cut', bytes)
  if (key() === snapshot) render()
  return bytes
}
async function pdfBytes() {
  const path = staticPath(selection())
  return path ? fetchBytes(path) : prepareMerge()
}

// ---- Events -----------------------------------------------------------------------------------
root.addEventListener('click', (event) => {
  const design = event.target.closest('[data-plate]')
  const set = event.target.closest('[data-set]')
  if (design) {
    const result = toggleDesign(state.plates, design.dataset.plate)
    state.plates = result.plates
    state.edge = 'cut'
    changed(result.replaced ? printCopy.replaced(designName(result.added, lang), designName(result.replaced, lang), lang) : '')
  } else if (set) {
    const chosen = readySetById(set.dataset.set)
    state.plates = [...chosen.plates]
    state.edge = chosen.edge
    changed()
  }
})
$('paper').addEventListener('change', (event) => {
  state.paper = event.target.value === 'US_LETTER' ? 'US_LETTER' : 'A4'
  changed()
})
$('get').addEventListener('click', async () => {
  if (!state.plates.length) return
  const status = $('status'), button = $('get')
  const name = printFilename(selection())
  status.textContent = t('busy')
  button.setAttribute('aria-busy', 'true')
  try {
    const bytes = await pdfBytes()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
    link.download = name
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(link.href), 60_000)
    status.textContent = t('ready') + ' ' + name
    $('after').hidden = false
  } catch {
    status.textContent = t('failed')
  } finally {
    button.removeAttribute('aria-busy')
  }
})

render()
fetch(base + 'print/manifest.json').then((response) => (response.ok ? response.json() : null)).then((data) => {
  manifest = data
  render()
}).catch(() => {})
if (state.plates.length > 1 && !readySetFor(state)) prepareMerge().catch(() => {})
