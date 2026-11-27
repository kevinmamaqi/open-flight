import { objects } from './assets/objects/activities.js?v=2807f4a798d5'
import { appearanceChoices, appearanceArtPath, appearanceArtStyles } from './model-appearance.js?v=2807f4a798d5'
import { paperSizes, sheetCatalog, sheetIdFor, sheetLocales } from './family-sheets.js?v=2807f4a798d5'
import { sheetEdges } from './assets/print-faces.js?v=2807f4a798d5'
import { workshopHome } from './assets/workshop-address.js?v=2807f4a798d5'

export const monarchTrialSheets = Object.freeze(['monarch-k1', 'monarch-k2'])

const entries = new Map(sheetCatalog.map(item => [item.id, item]))
const titles = { en: 'Flight Book', es: 'Libro de vuelo', ru: 'Книга полётов' }
const canonicalBook = new URL('book', workshopHome).href
export const bookTitle = lang => titles[lang] || titles.en
export function bookEdition(lang, count, paper) {
  const plural = new Intl.PluralRules(lang).select(count)
  const format = paper === 'A4' ? 'A4' : ({en:'US Letter',es:'Carta',ru:'US Letter'}[lang])
  const labels = {en:['Edition 02','model','models','models'],es:['Edición 02','modelo','modelos','modelos'],ru:['Выпуск 02','модель','модели','моделей']}[lang]
  const noun = labels[plural === 'one' ? 1 : plural === 'few' ? 2 : 3]
  return labels[0] + ' · ' + count + ' ' + noun + ' · ' + format
}
export const coverLimit = 64
export const pilotLimit = 40
export const bookStyles = appearanceArtStyles

// Editorial teaching sequence. Time ranges are planning allowances for a first build.
const levels = Object.freeze({
  monarch: 1, 'boeing-747': 2, 'douglas-dc3': 2, morpho: 2,
  'ilyushin-il62': 2, swallowtail: 3, 'tupolev-tu144': 1,
  // Open Flight versions of record and championship planes.
  'sky-king': 2, 'crescent-boomerang': 2, 'shaheen-shin': 3, 'red-dart': 3,
})
export const modelOrder = Object.freeze([...Object.keys(levels), ...objects.map(item => item.id)])
export const starterModels = Object.freeze(['monarch', 'boeing-747', 'morpho'])
export const defaultSheets = Object.freeze(Object.keys(levels).map(model => sheetIdFor(model)))
const textPattern = /^[\p{Script=Latin}\p{Script=Cyrillic}\p{M}\d .,!?'’“”«»()&+\-–#№:]*$/u
function label(value, limit, field) {
  if (typeof value !== 'string') throw new TypeError('Invalid ' + field + '.')
  const clean = value.trim().normalize('NFC')
  if (Array.from(clean).length > limit || !textPattern.test(clean))
    throw new RangeError('Invalid ' + field + '.')
  return clean
}
function bookAppearances(choices = {}) {
  if (!choices || typeof choices !== 'object' || Array.isArray(choices)) throw new RangeError('Invalid model colors.')
  const colors = {}
  for (const model of Object.keys(choices)) {
    if (!modelOrder.includes(model)) throw new RangeError('Invalid model for colors.')
    const available = appearanceChoices(model, 'en')
    if (!available.some(choice => choice.id === choices[model])) throw new RangeError('Invalid colors for ' + model + '.')
    if (choices[model] !== available[0].id) colors[model] = choices[model]
  }
  return Object.fromEntries(modelOrder.filter(id => Object.hasOwn(colors, id)).map(id => [id, colors[id]]))
}
const activityIds = new Set(objects.map(item => item.id))
function validActivities(ids) {
  return Array.isArray(ids) && new Set(ids).size === ids.length && Array.from(ids).every(id => activityIds.has(id))
}
export function normalizeBook(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('Expected book options.')
  const { lang = 'en', paper = 'A4', sheets = defaultSheets, pilot = '', style = 'studio',
    cover = '', theme = 'sky', edge = 'cut' } = input
  if (!sheetLocales.includes(lang) || !paperSizes.includes(paper)) throw new RangeError('Invalid book language or paper.')
  if (!bookStyles.includes(style) || !['sky', 'sunset', 'meadow'].includes(theme)) throw new RangeError('Invalid cover style or theme.')
  // Airplane pages: 'cut' prints a border to cut along; 'whole' folds the full page.
  if (!sheetEdges.includes(edge)) throw new RangeError('Invalid airplane sheet edge.')
  if (!Array.isArray(sheets) || (!sheets.length && !input.activities?.length) || !Array.from(sheets).every(id => entries.has(id))
      || new Set(sheets).size !== sheets.length) throw new RangeError('Select 1 to ' + entries.size + ' distinct sheets.')
  const activities = input.activities === undefined ? (input.sheets === undefined ? [...activityIds] : []) : input.activities
  if (!validActivities(activities)) throw new RangeError('Choose distinct flying object activities.')
  const coverModel = input.coverModel === undefined || input.coverModel === '' ? (sheets[0] ?? activities[0]) : input.coverModel
  if (!sheets.includes(coverModel) && !activities.includes(coverModel)) throw new RangeError('Select a cover model included in the book.')
  return { lang, paper, ...(activities.length && { activities: [...activities] }), sheets: [...sheets], coverModel, appearances: bookAppearances(input.appearances), pilot: label(pilot,pilotLimit,'pilot name'), style,
    theme, edge, cover: label(cover,coverLimit,'cover title') || bookTitle(lang) }
}

export function modelDetails(id) {
  const item = entries.get(id)
  if (!item) throw new RangeError('Unknown model.')
  const level = levels[item.model]
  return { level, minutes: [[10,15],[15,20],[20,25]][level - 1],
    tools: item.family === 'butterfly' ? 'scissors-clip' : 'paper' }
}
export function artPath(id, style = 'studio') {
  return appearanceArtPath(id, style)
}
export function bookPlan(input = {}) {
  const { sheets, activities = [] } = normalizeBook(input)
  const keeps = 5, shared = new Map()
  let number = keeps
  const items = sheets.map(id => {
    const { pages: count, bookPages, sharedGuide } = entries.get(id)
    const pages = []
    for (const index of bookPages ?? Array.from({ length: count }, (_, i) => i)) {
      if (sharedGuide?.index === index) {
        if (shared.has(sharedGuide.key)) continue
        shared.set(sharedGuide.key, number + 1)
      }
      pages.push({ index, number: ++number })
    }
    return { id, start: pages[0].number, end: number, pages,
      guidePage: sharedGuide ? shared.get(sharedGuide.key) : null }
  })
  const originPages = []
  const seen = new Set()
  for (const id of sheets) {
    const { model } = entries.get(id)
    if (!seen.has(model)) {
      seen.add(model)
      originPages.push({ model, id, number: ++number })
    }
  }
  const activityPages = activities.map(id => ({ id, number: ++number }))
  return { pageCount: number, modelCount: originPages.length + activityPages.length, originPages, activityPages,
    guidePage: shared.get('folded-butterfly') ?? null, entries: items, keeps }
}
export function localePaper(languages = []) {
  for (const language of typeof languages === 'string' ? [languages] : languages) {
    try {
      const region = new Intl.Locale(language).region
      if (region) return ['US','CA','MX','PH','CO','CR','GT','NI','PA','SV','VE','CL','PR','DO','HN','BZ'].includes(region) ? 'US_LETTER' : 'A4'
    } catch { /* Try the next browser language. */ }
  }
  return 'A4'
}
export function bookURL(input, base = canonicalBook) {
  const book = normalizeBook(input), url = new URL(base, canonicalBook)
  url.search = ''
  url.searchParams.set('lang',book.lang)
  const fields = new URLSearchParams({ m: book.sheets.join(','), paper: book.paper === 'A4' ? 'a4' : 'letter', style: book.style })
  if (book.coverModel !== book.sheets[0]) fields.set('hero', book.coverModel)
  const colors = Object.entries(book.appearances).map(([id, color]) => id + ':' + color)
  if (colors.length) fields.set('a', colors.join(','))
  if (book.activities?.length) fields.set('activities', book.activities.join(','))
  if (book.pilot) fields.set('pilot',book.pilot)
  if (book.cover !== bookTitle(book.lang)) fields.set('title',book.cover)
  if (book.theme !== 'sky') fields.set('theme',book.theme)
  if (book.edge !== 'cut') fields.set('edge',book.edge)
  url.hash = fields.toString()
  return url.href
}
export function readBookURL(address) {
  const url = new URL(address, canonicalBook), fields = new URLSearchParams(url.search)
  for (const [key,value] of new URLSearchParams(url.hash.slice(1))) fields.set(key,value)
  const partial = {}, lang = fields.get('lang'), selection = fields.get('m')
  if (sheetLocales.includes(lang)) partial.lang = lang
  if (selection !== null) {
    const ids = selection ? selection.split(',') : []
    if (ids.every(id=>entries.has(id)) && new Set(ids).size === ids.length) partial.sheets = ids
  }
  if (fields.has('activities')) {
    const ids = fields.get('activities').split(',')
    if (validActivities(ids)) partial.activities = ids
  }
  const hero = fields.get('hero')
  if (hero && ((partial.sheets || defaultSheets).includes(hero) || partial.activities?.includes(hero))) partial.coverModel = hero
  if (fields.has('a')) {
    const pairs = []
    for (const token of fields.get('a').split(',').slice(0, modelOrder.length)) {
      const [model, color, extra] = token.split(':')
      if (!extra && modelOrder.includes(model) && appearanceChoices(model,'en').some(choice => choice.id === color))
        pairs.push([model, color])
    }
    partial.appearances = bookAppearances(Object.fromEntries(pairs))
  }
  const paper = { a4:'A4',letter:'US_LETTER',us_letter:'US_LETTER' }[(fields.get('paper') || '').toLowerCase()]
  if (paper && paperSizes.includes(paper)) partial.paper = paper
  if (bookStyles.includes(fields.get('style'))) partial.style = fields.get('style')
  if (['sky','sunset','meadow'].includes(fields.get('theme'))) partial.theme = fields.get('theme')
  if (sheetEdges.includes(fields.get('edge'))) partial.edge = fields.get('edge')
  for (const [key,field,limit] of [['pilot','pilot',pilotLimit],['title','cover',coverLimit]]) {
    if (!fields.has(key)) continue
    try { partial[field] = label(fields.get(key),limit,field) } catch { /* Ignore an invalid shared label. */ }
  }
  return partial
}
export function bookFilename(input) {
  const { pilot, paper, lang } = normalizeBook(input)
  const slug = pilot.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\d]+/gu,'-').replace(/^-|-$/g,'')
  return 'flight-book-' + (slug || lang) + '-' + (paper === 'A4' ? 'a4' : 'letter') + '.pdf'
}
