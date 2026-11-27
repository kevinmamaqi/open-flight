// Print & Play: which pages to print for one to three designs.
// Pure and deterministic. No DOM and no PDF code, so the page, the static build, the
// application service and the tests all read the same rules.
//
// A design is a plate of the book (A1-A4, B1-B3, F1-F3, see book/catalog.js). Each plate
// prints as its pattern page, any shared build page and one quick guide page that the
// print export draws. Airplanes take 2 pages, butterflies 3 and flying objects 2.
import { plates, plateById, plateFor, chapterById } from './book/catalog.js?v=4b14e3f58ca0'
import { bookURL, localePaper, readBookURL } from './book-model.js?v=4b14e3f58ca0'
import { objects, packetPath } from './assets/objects/activities.js?v=4b14e3f58ca0'
import { paperSizes, sheetCatalog, sheetIdFor, sheetLocales, sheetPath } from './family-sheets.js?v=4b14e3f58ca0'
import { workshopHome } from './assets/workshop-address.js?v=4b14e3f58ca0'

export const maxDesigns = 3
export const printPapers = Object.freeze([...paperSizes])
export const printEdges = Object.freeze(['cut', 'whole'])
export const designIds = Object.freeze(plates.map(plate => plate.id))

const w = (en, es, ru) => ({ en, es, ru })

/**
 * Ready sets. "No scissors" prints the airplane patterns as whole sheets, which are folded
 * without cutting, so the name is true. Every other set prints the cut-border patterns.
 */
export const readySets = Object.freeze([
  Object.freeze({
    id: 'first-flight', plates: Object.freeze(['B1', 'A1', 'F1']), edge: 'cut',
    title: w('First flight', 'Primer vuelo', 'Первый полёт'),
    summary: w(
      'A butterfly, an airplane and a ring. Scissors and two paper clips.',
      'Una mariposa, un avión y un anillo. Tijeras y dos clips.',
      'Бабочка, самолёт и кольцо. Ножницы и две скрепки.',
    ),
  }),
  Object.freeze({
    id: 'no-scissors', plates: Object.freeze(['A1', 'A2', 'F1']), edge: 'whole',
    title: w('No scissors', 'Sin tijeras', 'Без ножниц'),
    summary: w(
      'Two airplanes and a ring. Fold only, no cutting.',
      'Dos aviones y un anillo. Solo se pliega, no se recorta.',
      'Два самолёта и кольцо. Только сгибы, без вырезания.',
    ),
  }),
  Object.freeze({
    id: 'spin-and-glide', plates: Object.freeze(['F1', 'F2', 'F3']), edge: 'cut',
    title: w('Spin and glide', 'Gira y planea', 'Вращение и планирование'),
    summary: w(
      'A ring, a maple seed and a two-winged glider. The maple seed needs scissors and one clip.',
      'Un anillo, una semilla de arce y un planeador de dos alas. La semilla necesita tijeras y un clip.',
      'Кольцо, крылатка клёна и двукрылый планёр. Для крылатки нужны ножницы и одна скрепка.',
    ),
  }),
])
export const readySetById = id => readySets.find(set => set.id === id) ?? null

/** The ready set a list of plate IDs and an edge exactly match, in order, or null. */
export function readySetFor(selection) {
  const { plates: ids, edge = 'cut' } = selection
  return readySets.find(set => set.edge === edge && set.plates.length === ids.length &&
    set.plates.every((id, index) => id === ids[index])) ?? null
}

/** A plate ID ("a1"), a design model ("boeing-747", "ring") or a butterfly sheet ID ("monarch-k3"; an
 * older "monarch-k2" link opens the same plate, which now prints K3). */
export function resolvePlate(value) {
  if (typeof value !== 'string') throw new RangeError('Choose a design by plate ID or model.')
  const key = value.trim()
  const found = plateById(key.toUpperCase()) ?? plateFor(key) ??
    plateFor(sheetCatalog.find(entry => entry.id === key && entry.family === 'butterfly' && ['k2', 'k3'].includes(entry.construction))?.model)
  if (!found) throw new RangeError('Unknown design: ' + key.slice(0, 40))
  return found
}

export const paperToken = paper => {
  if (!paperSizes.includes(paper)) throw new RangeError('Unknown paper size.')
  return paper === 'A4' ? 'a4' : 'letter'
}
export const paperFromToken = token => ({ a4: 'A4', letter: 'US_LETTER', us_letter: 'US_LETTER' })[String(token).toLowerCase()] ?? null

/** Default paper for a browser's language list: US Letter in the Americas, A4 elsewhere. */
export const defaultPaper = (languages = []) => localePaper(languages)

/**
 * Check a selection and return it in canonical form. `plates` or `designs` hold plate IDs or
 * models. Order is kept, duplicates are rejected and at most three designs are allowed.
 */
export function normalizeSelection(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('Expected a Print & Play selection.')
  const { paper = 'A4', lang = 'en', edge = 'cut' } = input
  const requested = input.plates ?? input.designs
  if (!Array.isArray(requested) || requested.length < 1 || requested.length > maxDesigns)
    throw new RangeError('Choose 1 to ' + maxDesigns + ' designs.')
  if (!paperSizes.includes(paper)) throw new RangeError('Unknown paper size.')
  if (!sheetLocales.includes(lang)) throw new RangeError('Unknown language.')
  if (!printEdges.includes(edge)) throw new RangeError('Unknown airplane sheet edge.')
  const ids = requested.map(value => resolvePlate(value).id)
  if (new Set(ids).size !== ids.length) throw new RangeError('Choose distinct designs.')
  return { plates: ids, paper, lang, edge }
}

/**
 * Add or remove a design. A fourth design replaces the oldest and says so.
 * Returns { plates, added, removed, replaced } where `replaced` is the dropped plate ID or null.
 */
export function toggleDesign(current, id, limit = maxDesigns) {
  const plate = resolvePlate(id).id
  const list = [...current]
  if (list.includes(plate)) return { plates: list.filter(item => item !== plate), added: null, removed: plate, replaced: null }
  list.push(plate)
  const replaced = list.length > limit ? list.shift() : null
  return { plates: list, added: plate, removed: null, replaced }
}

/** The pages a plate prints, in order. The guide page is drawn by the export; the rest are copied. */
export function pagePlan(plateId, { paper = 'A4', lang = 'en', edge = 'cut' } = {}) {
  const plate = resolvePlate(plateId)
  if (plate.chapter === 'flying-objects') {
    const item = objects.find(object => object.id === plate.model)
    return [
      { role: 'pattern', plate: plate.id, source: { type: 'packet', path: packetPath(paper, lang), index: item.page - 1 } },
      { role: 'guide', plate: plate.id },
    ]
  }
  const sheetId = sheetIdFor(plate.model)
  const entry = sheetCatalog.find(item => item.id === sheetId)
  if (entry.family === 'airplane') {
    // The 3-page guide and the back-of-sheet page give way to the one-page quick guide.
    const pattern = edge === 'whole'
      ? { type: 'plane', model: plate.model, edge, index: 0 }
      : { type: 'library', path: sheetPath(sheetId, paper, lang), index: 0 }
    return [{ role: 'pattern', plate: plate.id, source: pattern }, { role: 'guide', plate: plate.id }]
  }
  // K3: the cut sheet, then the build, balance and trim page (bookPages [0, 2]).
  const [pattern, build] = entry.bookPages
  const path = sheetPath(sheetId, paper, lang)
  return [
    { role: 'pattern', plate: plate.id, source: { type: 'library', path, index: pattern } },
    { role: 'build', plate: plate.id, source: { type: 'library', path, index: build } },
    { role: 'guide', plate: plate.id },
  ]
}
export const pagesPerDesign = plateId => pagePlan(plateId).length
export const pageCount = ids => ids.reduce((total, id) => total + pagesPerDesign(id), 0)

/** What each design needs, for the cards: tools in the quick-guide order. */
export function toolsFor(plateId, edge = 'cut') {
  const plate = resolvePlate(plateId)
  if (plate.chapter === 'butterflies') return ['scissors', 'clips']
  if (plate.chapter === 'airplanes') return edge === 'whole' ? ['paper'] : ['scissors']
  return plate.id === 'F2' ? ['scissors', 'clip'] : ['paper']
}

const lowerPaper = paper => paperToken(paper)
/** Static single-design file, relative to the site root: print/singles/A1-a4-en.pdf */
export const singlePath = (plateId, paper, lang) => {
  const { id } = resolvePlate(plateId)
  if (!sheetLocales.includes(lang)) throw new RangeError('Unknown language.')
  return 'print/singles/' + id + '-' + lowerPaper(paper) + '-' + lang + '.pdf'
}
/** Static ready-set file: print/sets/first-flight-a4-en.pdf */
export const setPath = (setId, paper, lang) => {
  if (!readySetById(setId) || !sheetLocales.includes(lang)) throw new RangeError('Unknown ready set or language.')
  return 'print/sets/' + setId + '-' + lowerPaper(paper) + '-' + lang + '.pdf'
}
/** The file a selection downloads as: open-flight-print-and-play-B1-A1-F1-a4-en.pdf */
export function printFilename(selection) {
  const { plates: ids, paper, lang } = normalizeSelection(selection)
  return 'open-flight-print-and-play-' + ids.join('-') + '-' + lowerPaper(paper) + '-' + lang + '.pdf'
}
/** Where the page finds a selection's PDF without building it: a single, a ready set or null. */
export function staticPath(selection) {
  const { plates: ids, paper, lang, edge } = normalizeSelection(selection)
  if (ids.length === 1 && edge === 'cut') return singlePath(ids[0], paper, lang)
  const set = readySetFor({ plates: ids, edge })
  return set ? setPath(set.id, paper, lang) : null
}

/** Address of a design's page on the site: openflight.design/airplanes/boeing-747/ (es/ and ru/ prefixed). */
export function designURL(plateId, lang = 'en') {
  const plate = resolvePlate(plateId)
  const chapter = chapterById(plate.chapter)
  return workshopHome + (lang === 'en' ? '' : lang + '/') + chapter.route + '/' + plate.model + '/'
}
export const shortURL = (plateId, lang = 'en') => designURL(plateId, lang).replace(/^https:\/\//, '')

// ---- The URL hash, shared with the booklet builder ----------------------------------------
// #m=monarch-k3,boeing-747&activities=ring&paper=letter  (book-model.js bookURL / readBookURL)
function bookParts(ids) {
  const sheets = [], activities = []
  for (const id of ids) {
    const plate = resolvePlate(id)
    if (plate.chapter === 'flying-objects') activities.push(plate.model)
    else sheets.push(sheetIdFor(plate.model))
  }
  return { sheets, activities }
}

/** The hash for /print/ and /book. `m=` is always present, even when empty. */
export function selectionHash({ plates: ids, paper, edge = 'cut' }) {
  const { sheets, activities } = bookParts(ids)
  const fields = new URLSearchParams({ m: sheets.join(',') })
  if (activities.length) fields.set('activities', activities.join(','))
  fields.set('paper', paperToken(paper))
  if (edge === 'whole') fields.set('edge', 'whole')
  return '#' + fields.toString().replace(/%2C/g, ',')
}

/** Read a selection from a hash or address. Unknown IDs are ignored and the list is cut to three. */
export function readSelection(address, languages = []) {
  const partial = readBookURL(address)
  const ids = []
  for (const id of partial.sheets ?? []) {
    const entry = sheetCatalog.find(item => item.id === id)
    if (entry && (entry.family === 'airplane' || ['k2', 'k3'].includes(entry.construction))) ids.push(resolvePlate(entry.model).id)
  }
  for (const id of partial.activities ?? []) ids.push(resolvePlate(id).id)
  return {
    plates: [...new Set(ids)].slice(0, maxDesigns),
    paper: partial.paper ?? defaultPaper(languages),
    edge: partial.edge ?? 'cut',
    ...(partial.lang && { lang: partial.lang }),
  }
}

/**
 * The booklet link: the same selection opened in the Flight Book builder with a cover and a log.
 * It always carries `m=`, even for an empty selection.
 */
export function bookletLink(selection, base = 'book.html') {
  const { plates: ids, paper, lang = 'en', edge = 'cut' } = selection
  const { sheets, activities } = bookParts(ids)
  const prefix = base + '?lang=' + lang
  if (!sheets.length && !activities.length) return prefix + selectionHash({ plates: [], paper, edge })
  const href = new URL(bookURL({ lang, paper, edge, sheets, ...(activities.length && { activities }) }, base))
  return base + href.search + href.hash.replace(/%2C/g, ',')
}

/** Rounded size for the bar: "52 KB" or "1.4 MB". */
export function formatBytes(bytes) {
  return bytes < 1024 * 1024 ? Math.max(1, Math.round(bytes / 1024)) + ' KB' : (bytes / 1048576).toFixed(1) + ' MB'
}
