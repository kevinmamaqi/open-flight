import { appearanceArtPath } from './model-appearance.js?v=703c9111bd20'
import { coverSizes, measuredSizes } from './book-size-data.js?v=703c9111bd20'
import { sheetCatalog } from './family-sheets.js?v=703c9111bd20'

const sheetsById = new Map(sheetCatalog.map(entry => [entry.id,entry]))

// The result is an estimate for normalized options. Names and QR encoding can change the exact byte count.
export function estimateBookBytes({ lang, paper, sheets, style, appearances = {} }) {
  const { singles, frontMatter, sharedGuide, colored, duplicateNotes } = measuredSizes[lang][paper]
  const countedGuides = new Set()
  const countedModels = new Set()
  // The first single includes the five keeper pages. Each subsequent single adds
  // its sheets and artwork, with one keeper set subtracted from the measurement.
  let bytes = frontMatter
  for (const id of sheets) {
    const entry = sheetsById.get(id)
    const color = appearances[entry.model]
    const cover = coverSizes[appearanceArtPath(id,style,color)] - coverSizes[appearanceArtPath(id,'studio',color)]
    bytes += singles[id] - frontMatter + (colored[id + '/' + color] ?? 0) + cover
    if (countedModels.has(entry.model)) bytes -= duplicateNotes[entry.model]
    countedModels.add(entry.model)
    const guide = entry.sharedGuide?.key
    if (guide && countedGuides.has(guide)) bytes -= sharedGuide
    if (guide) countedGuides.add(guide)
  }
  return bytes
}
