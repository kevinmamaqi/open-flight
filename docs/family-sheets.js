import { baselines } from './assets/atlas/baselines.js?v=317e8ae67356'
import { planeCatalog, sheetSizes } from './assets/planes/catalog.js?v=317e8ae67356'

export const sheetLocales = Object.freeze(['en', 'es', 'ru'])
export const paperSizes = Object.freeze(Object.keys(sheetSizes))

// A butterfly's constructions share one species. W1 keeps its original filename.
const butterflies = Object.keys(baselines)
export const sheetCatalog = Object.freeze([
  ...['k1', 'w1'].flatMap(construction => butterflies.map(model => ({
    id: construction === 'k1' ? model + '-k1' : model,
    model, family: 'butterfly', construction,
    // K1: cut sheet, its back face for double-sided printing, then the shared fold guide.
    pages: construction === 'k1' ? 3 : 1,
    ...(construction === 'k1' ? { bookPages: [0, 2] } : {}),
    sharedGuide: construction === 'k1' ? { key: 'folded-butterfly', index: 2 } : null,
  }))),
  ...planeCatalog.map(({ model_id: model }) => ({
    id: model, model, family: 'airplane', construction: 'whole-sheet',
    // Page 2 of the PDF is the back of the template for double-sided printing. A bound book
    // cannot guarantee that page lands behind the template, so the book leaves it out.
    pages: 5, bookPages: [0, 2, 3, 4], sharedGuide: null,
  })),
  // K2 costa glider: a landscape cut sheet, its back face and a species guide. Experimental.
  ...butterflies.map(model => ({
    id: model + '-k2', model, family: 'butterfly', construction: 'k2',
    pages: 3, bookPages: [0, 2], sharedGuide: null,
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
