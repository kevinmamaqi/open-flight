import { sheetPath } from '../../apps/editor/family-sheets.js'
import { sheetAppearance } from '../../apps/editor/model-appearance.js'
import { makePlane, planePdf } from '../planes/index.ts'
import { makeFoldedButterfly, foldedPdf } from '../folded-butterfly/index.ts'
import { classicComparisonPdf } from '../product-core/folded-butterflies.ts'

export async function loadAppearanceSheet(sheetId, paper, lang, appearance, loadAsset) {
  const path = sheetPath(sheetId, paper, lang)
  const sheet = sheetAppearance(sheetId, appearance)
  if (sheet.original) return loadAsset(path)
  if (sheet.family === 'airplane') {
    return planePdf(makePlane({ model_id: sheet.model, paper, livery: sheet.appearance }, lang))
  }
  const plan = makeFoldedButterfly({ species: sheet.model, paper, appearance_id: sheet.appearance }, lang)
  return sheet.construction === 'k1' ? foldedPdf(plan) : classicComparisonPdf(plan)
}
