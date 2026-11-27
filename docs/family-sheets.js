import { objects } from './assets/objects/activities.js?v=c8c7ae41db63'
import { baselines } from './assets/atlas/baselines.js?v=c8c7ae41db63'
import { planeCatalog, sheetSizes } from './assets/planes/catalog.js?v=c8c7ae41db63'
import { makePlane } from './assets/planes/core.js?v=c8c7ae41db63'

export const sheetLocales = Object.freeze(['en', 'es', 'ru'])
export const paperSizes = Object.freeze(Object.keys(sheetSizes))

// An airplane PDF: template, its back, three guide steps per page and the flight notebook, which
// shares the last guide page when it holds one step (a record plane's notebook has its own page).
function planePages(model) {
  const plan = makePlane({ model_id: model })
  const steps = plan.steps.length
  const pages = 2 + Math.ceil(steps / 3) + (steps % 3 === 1 && !plan.rights ? 0 : 1)
  return { pages, bookPages: [0, ...Array.from({ length: pages - 2 }, (_, i) => i + 2)] }
}
// A butterfly's constructions share one species. W1 keeps its original filename.
// K3 is the current folded butterfly. W1, K1 and K2 are retired: they stay in the catalog so
// shared books, saved designs and printed library links still open, but no list offers them.
const butterflies = Object.keys(baselines)
export const sheetCatalog = Object.freeze([
  ...['k1', 'w1'].flatMap(construction => butterflies.map(model => ({
    id: construction === 'k1' ? model + '-k1' : model,
    model, family: 'butterfly', construction,
    // K1: cut sheet, its back face for double-sided printing, then the shared fold guide.
    pages: construction === 'k1' ? 3 : 1, retired: true,
    ...(construction === 'k1' ? { bookPages: [0, 2] } : {}),
    sharedGuide: construction === 'k1' ? { key: 'folded-butterfly', index: 2 } : null,
  }))),
  ...planeCatalog.map(({ model_id: model }) => ({
    id: model, model, family: 'airplane', construction: 'whole-sheet',
    // Page 2 of the PDF is the back of the template for double-sided printing. A bound book
    // cannot guarantee that page lands behind the template, so the book leaves it out.
    ...planePages(model), sharedGuide: null,
  })),
  // K2 costa glider: a landscape cut sheet, its back face and a species guide. Experimental.
  ...butterflies.map(model => ({
    id: model + '-k2', model, family: 'butterfly', construction: 'k2',
    pages: 3, bookPages: [0, 2], sharedGuide: null, retired: true,
  })),
  // K3 dart butterfly: a landscape cut sheet, its back face and a species guide.
  ...butterflies.map(model => ({
    id: model + '-k3', model, family: 'butterfly', construction: 'k3',
    pages: 3, bookPages: [0, 2], sharedGuide: null,
  })),
].map(entry => Object.freeze(entry)))
export const sheetIds = Object.freeze(sheetCatalog.map(entry => entry.id))
// The sheets lists and pickers offer. Retired sheets still resolve by ID.
export const currentSheets = Object.freeze(sheetCatalog.filter(entry => !entry.retired))
export const currentSheetIds = Object.freeze(currentSheets.map(entry => entry.id))
export const currentConstruction = 'k3'

export function sheetName(id, lang) {
  const object = objects.find(item => item.id === id)
  if (object && sheetLocales.includes(lang)) return object[lang].title
  const item = sheetCatalog.find(entry => entry.id === id)
  if (!item || !sheetLocales.includes(lang)) throw new RangeError('Unknown sheet or language')
  return item.family === 'butterfly'
    ? baselines[item.model].names[lang]
    : planeCatalog.find(plane => plane.model_id === item.model).inspiration[lang]
}

export function sheetIdFor(model, construction = currentConstruction) {
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
