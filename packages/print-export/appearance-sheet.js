import { sheetPath } from '../../apps/editor/family-sheets.js'
import { sheetAppearance } from '../../apps/editor/model-appearance.js'
import { makePlane, planePdf } from '../planes/index.ts'
import { makeFoldedButterfly, foldedPdf } from '../folded-butterfly/index.ts'
import { classicComparisonPdf } from '../product-core/folded-butterflies.ts'
import { makeK2, k2Pdf } from '../folded-butterfly/k2-sheet.ts'

// Library PDFs carry original colors and, for airplanes, the cut border. Anything else is drawn.
export async function loadAppearanceSheet(sheetId, paper, lang, appearance, loadAsset, edge = 'cut') {
  const path = sheetPath(sheetId, paper, lang)
  const sheet = sheetAppearance(sheetId, appearance)
  const airplane = sheet.family === 'airplane'
  if (sheet.original && (!airplane || edge === 'cut')) return loadAsset(path)
  if (airplane) {
    return planePdf(makePlane({ model_id: sheet.model, paper, livery: sheet.appearance, edge }, lang))
  }
  if (sheet.construction === 'k2')
    return k2Pdf(makeK2({ species: sheet.model, paper, appearance_id: sheet.appearance, locale: lang }))
  const plan = makeFoldedButterfly({ species: sheet.model, paper, appearance_id: sheet.appearance }, lang)
  return sheet.construction === 'k1' ? foldedPdf(plan) : classicComparisonPdf(plan)
}
