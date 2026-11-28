import { butterflySwatches, k3DesignSwatches } from './assets/atlas/swatches.js?v=7988ca7cb2ce'
import { planeCatalog, planeColors, liveries, planeFinish } from './assets/planes/catalog.js?v=7988ca7cb2ce'
import { currentConstruction, sheetCatalog, sheetLocales } from './family-sheets.js?v=7988ca7cb2ce'

import { objectIds, objectPalettes } from './assets/objects/appearance.js?v=7988ca7cb2ce'
export { k3DesignSwatches }

const labels = {
  field: { en:'Original colors', es:'Colores originales', ru:'Исходные цвета' },
  sunset: { en:'Sunset', es:'Atardecer', ru:'Закат' },
  indigo: { en:'Indigo', es:'Índigo', ru:'Индиго' },
  natural: { en: 'Field colors', es: 'Colores naturales', ru: 'Природная окраска' },
  carnival: { en: 'Carnival', es: 'Carnaval', ru: 'Карнавал' },
  twilight: { en: 'Twilight', es: 'Crepúsculo', ru: 'Сумерки' },
  coloring: { en: 'Color your own', es: 'Colorea tus alas', ru: 'Раскрась сам' },
  airshow: { en: 'Airshow', es: 'Exhibición aérea', ru: 'Авиашоу' },
  heritage: { en: 'Heritage stripes', es: 'Franjas clásicas', ru: 'Классические полосы' },
  festival: { en: 'Festival colors', es: 'Colores vivos', ru: 'Праздничные цвета' },
  pencil: { en: 'Graphite', es: 'Grafito', ru: 'Графит' },
  modernista: { en: 'Barcelona', es: 'Barcelona', ru: 'Барселона' },
}
const entries = new Map(sheetCatalog.map(item => [item.id, item]))
export const appearanceArtStyles = Object.freeze(['studio', 'illustrated', 'ink'])

export function appearanceChoices(modelId, lang = 'en') {
  if (!sheetLocales.includes(lang)) throw new RangeError('Unknown appearance language')
  if (objectIds.includes(modelId)) return Object.entries(objectPalettes[modelId]).map(([id, colors]) => ({ id, colors, label: labels[id][lang] }))
  const model = entries.get(modelId)?.model
  const plane = planeCatalog.find(entry => entry.model_id === model)
  const swatches = butterflySwatches[model]
  if (swatches) {
    const shared = Object.entries(swatches).map(([id, colors]) => ({ id, label: labels[id][lang], colors: [...colors] }))
    // A bare species ID is the current butterfly, K3; retired K1, K2 and W1 sheets keep the shared colours.
    const k3 = modelId.endsWith('-k3') || (modelId === model && currentConstruction === 'k3')
    const extra = k3 ? Object.entries(k3DesignSwatches[model] ?? {}).map(([id, colors]) => ({ id, label: labels[id][lang], colors: [...colors] })) : []
    return [...shared, ...extra]
  }
  if (plane) {
    return liveries.map(id => ({
      id, label: labels[id][lang],
      colors: [...planeColors(plane, id)],
    }))
  }
  throw new RangeError('Unknown flyer appearance')
}

/** The colour choices of the K3 studio for one species: the shared ones, then the K3-only designs. */
export function k3AppearanceChoices(species, lang = 'en') {
  return appearanceChoices(species + '-k3', lang)
}

/** The colours one printable sheet can be drawn in: a retired butterfly sheet has no K3-only design. */
export function sheetChoices(sheetId, lang = 'en') {
  const entry = entries.get(sheetId)
  if (!entry) throw new RangeError('Unknown flyer sheet')
  return appearanceChoices(sheetId, lang)
    .filter(choice => entry.family !== 'butterfly' || entry.construction === 'k3' || !Object.hasOwn(k3DesignSwatches[entry.model] ?? {}, choice.id))
}

export function sheetAppearance(sheetId, appearance) {
  const entry = entries.get(sheetId)
  if (!entry) throw new RangeError('Unknown flyer sheet')
  const choices = sheetChoices(sheetId)
  const defaultId = choices[0].id
  const id = appearance ?? defaultId
  if (!choices.some(choice => choice.id === id)) throw new RangeError('Unknown flyer appearance')
  return { ...entry, appearance: id, original: id === defaultId }
}

// Keep the field-table specimen separate from the angled studio photographs in the book.
export function specimenPath(id, appearance) {
  if (butterflySwatches[id]) return 'assets/atlas/' + id + '-k3-' + (appearance ?? 'natural') + '.svg'
  const color = appearance ?? (objectIds.includes(id) ? 'field' : 'heritage')
  return 'assets/viewer/' + id + '-' + color + '.webp'
}

export function appearanceArtPath(sheetId, style = 'studio', appearance) {
  if (!appearanceArtStyles.includes(style)) throw new RangeError('Unknown book artwork style')
  if (objectIds.includes(sheetId)) {
    const color = appearance ?? 'field'
    if (!Object.hasOwn(objectPalettes[sheetId], color)) throw new RangeError('Unknown colors')
    return 'assets/book/models/' + sheetId + (color === 'field' || style === 'ink' ? '' : '-' + color) + '-' + style + '.jpg'
  }
  const selection = sheetAppearance(sheetId, appearance)
  // Color palettes share one monochrome outline.
  const useOriginal = selection.original || style === 'ink'
  const variant = useOriginal ? '' : '-' + selection.appearance
  return 'assets/book/models/' + sheetId + variant + '-' + style + '.jpg'
}

/** The caption under an airplane model for the chosen livery: it follows the colors. */
export function appearanceCaption(modelId, appearance, lang = 'en') {
  const plane = planeCatalog.find(entry => entry.model_id === modelId)
  if (!plane || !liveries.includes(appearance)) throw new RangeError('Unknown airplane livery')
  return planeFinish(plane, appearance, lang)
}
