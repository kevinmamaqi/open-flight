import { paperSizes, sheetCatalog, sheetIdFor, sheetLocales } from './family-sheets.js?v=788c398039bb'

const entries = new Map(sheetCatalog.map(item => [item.id, item]))
const titles = { en: 'Flight Book', es: 'Libro de vuelo', ru: 'Книга полётов' }
const canonicalBook = 'https://kevinmamaqi.github.io/open-flight/book.html'
export const bookTitle = lang => titles[lang] || titles.en
export function bookEdition(lang, count, paper) {
  const plural = new Intl.PluralRules(lang).select(count)
  const format = paper === 'A4' ? 'A4' : ({en:'US Letter',es:'Carta',ru:'US Letter'}[lang])
  const labels = {en:['Edition 01','model','models','models'],es:['Edición 01','modelo','modelos','modelos'],ru:['Выпуск 01','модель','модели','моделей']}[lang]
  const noun = labels[plural === 'one' ? 1 : plural === 'few' ? 2 : 3]
  return labels[0] + ' · ' + count + ' ' + noun + ' · ' + format
}
export const coverLimit = 64
export const pilotLimit = 40
export const bookStyles = Object.freeze(['studio', 'illustrated', 'ink'])

// Editorial teaching sequence. Time ranges are planning allowances for a first build.
const levels = Object.freeze({
  monarch: 1, 'boeing-747': 1, 'douglas-dc3': 1, morpho: 2,
  'ilyushin-il62': 2, swallowtail: 3, 'tupolev-tu144': 3,
})
export const modelOrder = Object.freeze(Object.keys(levels))
export const starterModels = Object.freeze(['monarch', 'boeing-747', 'morpho'])
export const defaultSheets = Object.freeze(modelOrder.map(model => sheetIdFor(model)))
const textPattern = /^[\p{Script=Latin}\p{Script=Cyrillic}\p{M}\d .,!?'’“”«»()&+\-–#№:]*$/u
function label(value, limit, field) {
  if (typeof value !== 'string') throw new TypeError('Invalid ' + field + '.')
  const clean = value.trim().normalize('NFC')
  if (Array.from(clean).length > limit || !textPattern.test(clean))
    throw new RangeError('Invalid ' + field + '.')
  return clean
}
export function normalizeBook(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('Expected book options.')
  const { lang = 'en', paper = 'A4', sheets = defaultSheets, pilot = '', style = 'studio',
    cover = '', theme = 'sky' } = input
  if (!sheetLocales.includes(lang) || !paperSizes.includes(paper)) throw new RangeError('Invalid book language or paper.')
  if (!bookStyles.includes(style) || !['sky', 'sunset', 'meadow'].includes(theme)) throw new RangeError('Invalid cover style or theme.')
  if (!Array.isArray(sheets) || !sheets.length || !Array.from(sheets).every(id => entries.has(id))
      || new Set(sheets).size !== sheets.length) throw new RangeError('Select 1 to 10 distinct sheets.')
  return { lang, paper, sheets: [...sheets], pilot: label(pilot,pilotLimit,'pilot name'), style,
    theme, cover: label(cover,coverLimit,'cover title') || bookTitle(lang) }
}

export function modelDetails(id) {
  const item = entries.get(id)
  if (!item) throw new RangeError('Unknown model.')
  const level = levels[item.model]
  return { level, minutes: [[10,15],[15,20],[20,25]][level - 1],
    tools: item.family === 'butterfly' ? 'scissors-clip' : 'paper' }
}
export function artPath(id, style = 'studio') {
  if (!entries.has(id) || !bookStyles.includes(style)) throw new RangeError('Unknown book artwork.')
  return 'assets/book/models/' + id + '-' + style + '.jpg'
}
export function bookPlan(input = {}) {
  const { sheets } = normalizeBook(input)
  const keeps = 5, shared = new Map()
  let number = keeps
  const items = sheets.map(id => {
    const { pages: count, sharedGuide } = entries.get(id)
    const pages = []
    for (let index = 0; index < count; index++) {
      if (sharedGuide?.index === index) {
        if (shared.has(sharedGuide.key)) continue
        shared.set(sharedGuide.key, number + 1)
      }
      pages.push({ index, number: ++number })
    }
    return { id, start: pages[0].number, end: number, pages,
      guidePage: sharedGuide ? shared.get(sharedGuide.key) : null }
  })
  return { pageCount: number, modelCount: new Set(sheets.map(id => entries.get(id).model)).size,
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
  if (book.pilot) fields.set('pilot',book.pilot)
  if (book.cover !== bookTitle(book.lang)) fields.set('title',book.cover)
  if (book.theme !== 'sky') fields.set('theme',book.theme)
  url.hash = fields.toString()
  return url.href
}
export function readBookURL(address) {
  const url = new URL(address, canonicalBook), fields = new URLSearchParams(url.search)
  for (const [key,value] of new URLSearchParams(url.hash.slice(1))) fields.set(key,value)
  const partial = {}, lang = fields.get('lang'), selection = fields.get('m')
  if (sheetLocales.includes(lang)) partial.lang = lang
  if (selection) {
    const ids = selection.split(',')
    if (ids.every(id=>entries.has(id)) && new Set(ids).size === ids.length) partial.sheets = ids
  }
  const paper = { a4:'A4',letter:'US_LETTER',us_letter:'US_LETTER' }[(fields.get('paper') || '').toLowerCase()]
  if (paper && paperSizes.includes(paper)) partial.paper = paper
  if (bookStyles.includes(fields.get('style'))) partial.style = fields.get('style')
  if (['sky','sunset','meadow'].includes(fields.get('theme'))) partial.theme = fields.get('theme')
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
