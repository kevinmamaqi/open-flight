import { butterflySwatches } from './assets/atlas/swatches.js'
import { planeCatalog, planeColors, liveries } from './assets/planes/catalog.js'
import { planeFlagCountry } from './assets/planes/country-markings.js'
import { sheetCatalog, sheetLocales } from './family-sheets.js'

import { objectIds, objectPalettes } from './assets/objects/appearance.js'
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
  us: { en: 'U.S. flag', es: 'Bandera de EE. UU.', ru: 'Флаг США' },
  ussr: { en: 'USSR flag', es: 'Bandera de la URSS', ru: 'Флаг СССР' },
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
    return Object.entries(swatches).map(([id, colors]) => ({ id, label: labels[id][lang], colors: [...colors] }))
  }
  if (plane) {
    return liveries.map(id => ({
      id, label: labels[id === 'flag' ? planeFlagCountry(model) : id][lang],
      colors: [...planeColors(plane, id)],
    }))
  }
  throw new RangeError('Unknown flyer appearance')
}

export function sheetAppearance(sheetId, appearance) {
  const entry = entries.get(sheetId)
  if (!entry) throw new RangeError('Unknown flyer sheet')
  const choices = appearanceChoices(entry.model)
  const defaultId = choices[0].id
  const id = appearance ?? defaultId
  if (!choices.some(choice => choice.id === id)) throw new RangeError('Unknown flyer appearance')
  return { ...entry, appearance: id, original: id === defaultId }
}

export function appearanceArtPath(sheetId, style = 'studio', appearance) {
  if (!appearanceArtStyles.includes(style)) throw new RangeError('Unknown book artwork style')
  if (objectIds.includes(sheetId)) {
    const color = appearance ?? 'field'
    if (!Object.hasOwn(objectPalettes[sheetId], color)) throw new RangeError('Unknown colors')
    return 'assets/book/models/' + sheetId + (color === 'field' || style === 'ink' ? '' : '-' + color) + '-' + style + '.jpg'
  }
  const selection = sheetAppearance(sheetId, appearance)
  // Color palettes share one monochrome outline. The flag changes the wing markings.
  const useOriginal = selection.original || (style === 'ink' && selection.appearance !== 'flag')
  const variant = useOriginal ? '' : '-' + selection.appearance
  return 'assets/book/models/' + sheetId + variant + '-' + style + '.jpg'
}
