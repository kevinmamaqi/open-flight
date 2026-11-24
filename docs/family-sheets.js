import { baselines } from './assets/atlas/baselines.js?v=703c9111bd20'
import { planeCatalog, sheetSizes } from './assets/planes/catalog.js?v=703c9111bd20'

export const sheetLocales = Object.freeze(['en', 'es', 'ru'])
export const paperSizes = Object.freeze(Object.keys(sheetSizes))

// A butterfly's two constructions share one species. W1 keeps its original filename.
const butterflies = Object.keys(baselines)
export const sheetCatalog = Object.freeze([
  ...['k1', 'w1'].flatMap(construction => butterflies.map(model => ({
    id: construction === 'k1' ? model + '-k1' : model,
    model, family: 'butterfly', construction,
    pages: construction === 'k1' ? 2 : 1,
    sharedGuide: construction === 'k1' ? { key: 'folded-butterfly', index: 1 } : null,
  }))),
  ...planeCatalog.map(({ model_id: model }) => ({
    id: model, model, family: 'airplane', construction: 'whole-sheet',
    pages: 4, sharedGuide: null,
  })),
].map(entry => Object.freeze(entry)))
export const sheetIds = Object.freeze(sheetCatalog.map(entry => entry.id))

export function sheetName(id, lang) {
  const item = sheetCatalog.find(entry => entry.id === id)
  if (!item || !sheetLocales.includes(lang)) throw new RangeError('Unknown sheet or language')
  return item.family === 'butterfly'
    ? baselines[item.model].names[lang]
    : planeCatalog.find(plane => plane.model_id === item.model).inspiration[lang]
}

export function sheetIdFor(model, construction = 'k1') {
  const item = sheetCatalog.find(entry => entry.model === model &&
    (entry.family === 'airplane' || entry.construction === construction))
  if (!item) throw new RangeError('Unknown model or construction')
  return item.id
}

export function sheetPath(id, paper, lang) {
  if (!sheetIds.includes(id) || !paperSizes.includes(paper) || !sheetLocales.includes(lang))
    throw new RangeError('Unknown print sheet, paper or language')
  return 'library/' + id + '-' + paper + '-' + lang + '.pdf'
}
