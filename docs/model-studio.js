import { objectIds } from './assets/objects/appearance.js?v=eb901ca27c79'
import { foldedLink, studioLink } from './atlas-guide.js?v=eb901ca27c79'
import { defaultSheets } from './book-model.js?v=eb901ca27c79'
import { sheetCatalog } from './family-sheets.js?v=eb901ca27c79'
import { appearanceChoices } from './model-appearance.js?v=eb901ca27c79'

const sheets = new Map(sheetCatalog.map(entry => [entry.id, entry]))

export function studioForBookSheet(book, sheetId) {
  if (objectIds.includes(sheetId))
    return './flight-objects.html?' + new URLSearchParams({model:sheetId, lang:book.lang, colors:book.appearances?.[sheetId] ?? 'field', paper:book.paper})
  const entry = sheets.get(sheetId)
  if (!entry) throw new RangeError('Unknown printable model.')
  const color = book.appearances?.[entry.model] || appearanceChoices(entry.model, book.lang)[0].id
  if (entry.construction === 'k1')
    return foldedLink(entry.model, book.lang, { appearance_id: color, paper: book.paper })
  // The butterfly lab draws K3. A retired K2 sheet opens the same species there.
  if (entry.construction === 'k2' || entry.construction === 'k3')
    return './costa.html?' + new URLSearchParams({ lang: book.lang, species: entry.model, colors: color, paper: book.paper })
  const path = studioLink(entry.model, book.lang)
  const [address, hash] = path.split('#')
  const field = entry.family === 'airplane' ? 'livery' : 'appearance_id'
  return address + '&' + new URLSearchParams({ [field]: color, paper: book.paper }) + (hash ? '#' + hash : '')
}

export function bookFromStudio(sheetId, appearance, lang, paper) {
  const color = new URLSearchParams({ flyer: sheetId, paint: appearance })
  const query = new URLSearchParams({ lang, paper: paper === 'US_LETTER' ? 'letter' : 'a4' })
  return './book.html?' + query + '#' + color
}

// The link transfers only this model's color. A family's title and other choices stay in their saved book.
export function applyStudioColors(draft, address) {
  const fields = new URLSearchParams(new URL(address).hash.slice(1))
  const flyer = fields.get('flyer')
  const entry = sheets.get(flyer)
  const appearance = fields.get('paint')
  if (objectIds.includes(flyer) && appearanceChoices(flyer).some(choice => choice.id === appearance))
    return {activities:[...new Set([...(draft.activities ?? []), flyer])], appearances:{...draft.appearances,[flyer]:appearance}}
  if (!entry || !appearanceChoices(entry.model, 'en').some(choice => choice.id === appearance)) return {}
  const prior = Array.isArray(draft.sheets) ? draft.sheets.filter(id => sheets.has(id)) : defaultSheets
  const previousEdition = prior.find(id => sheets.get(id).model === entry.model)
  let selected = [...prior]
  if (!selected.includes(entry.id)) {
    selected = previousEdition ? selected.map(id => id === previousEdition ? entry.id : id) : [...selected, entry.id]
  }
  const coverModel = !prior.includes(entry.id) && previousEdition && draft.coverModel === previousEdition ? entry.id : draft.coverModel
  return { sheets: selected, coverModel, appearances: { ...draft.appearances, [entry.model]: appearance } }
}
