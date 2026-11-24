import { sheetPath } from './family-sheets.js?v=703c9111bd20'
import { sheetAppearance } from './model-appearance.js?v=703c9111bd20'
import { makePlane } from './assets/planes/core.js?v=703c9111bd20'
import { planeBrowserPdf } from './assets/planes/print.js?v=703c9111bd20'

export async function loadAppearanceSheet(sheetId, paper, lang, appearance, loadAsset) {
  const path = sheetPath(sheetId, paper, lang)
  const sheet = sheetAppearance(sheetId, appearance)
  if (sheet.original) return loadAsset(path)
  if (sheet.family === 'airplane') {
    return planeBrowserPdf(makePlane({ model_id: sheet.model, paper, livery: sheet.appearance }, lang))
  }
  const { makeFoldedButterfly, prepareFoldedPdf, foldedPdf, classicComparisonPdf } =
    await import('./browser-workshop.js?v=703c9111bd20')
  await prepareFoldedPdf()
  const plan = makeFoldedButterfly({ species: sheet.model, paper, appearance_id: sheet.appearance }, lang)
  return sheet.construction === 'k1' ? foldedPdf(plan) : classicComparisonPdf(plan)
}
