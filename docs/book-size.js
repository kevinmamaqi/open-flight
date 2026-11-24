import { coverSizes, measuredSizes } from './book-size-data.js?v=788c398039bb'
import { sheetCatalog } from './family-sheets.js?v=788c398039bb'

const guides = new Map(sheetCatalog
  .filter(({ sharedGuide }) => sharedGuide)
  .map(({ id, sharedGuide }) => [id, sharedGuide.key]))

// The result is an estimate for normalized options. Names and QR encoding can change the exact byte count.
export function estimateBookBytes({ lang, paper, sheets, style }) {
  const { singles, frontMatter, sharedGuide } = measuredSizes[lang][paper]
  const countedGuides = new Set()
  // The first single includes the five keeper pages. Each subsequent single adds
  // its sheets and artwork, with one keeper set subtracted from the measurement.
  let bytes = frontMatter
  for (const id of sheets) {
    bytes += singles[id] - frontMatter + coverSizes[style][id] - coverSizes.studio[id]
    const guide = guides.get(id)
    if (guide && countedGuides.has(guide)) bytes -= sharedGuide
    if (guide) countedGuides.add(guide)
  }
  return bytes
}
