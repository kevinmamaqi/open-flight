import { sheetPath } from './family-sheets.js?v=7988ca7cb2ce'
import { sheetAppearance } from './model-appearance.js?v=7988ca7cb2ce'
import { makePlane } from './assets/planes/core.js?v=7988ca7cb2ce'
import { planeBrowserPdf } from './assets/planes/print.js?v=7988ca7cb2ce'

// Library PDFs carry original colors and, for airplanes, the cut border. Anything else is drawn.
export async function loadAppearanceSheet(sheetId, paper, lang, appearance, loadAsset, edge = 'cut') {
  const path = sheetPath(sheetId, paper, lang)
  const sheet = sheetAppearance(sheetId, appearance)
  const airplane = sheet.family === 'airplane'
  if (sheet.original && (!airplane || edge === 'cut')) return loadAsset(path)
  if (airplane) {
    return planeBrowserPdf(makePlane({ model_id: sheet.model, paper, livery: sheet.appearance, edge }, lang))
  }
  const { makeFoldedButterfly, prepareFoldedPdf, foldedPdf, classicComparisonPdf, makeK2, k2Pdf, makeK3, k3Pdf } =
    await import('./browser-workshop.js?v=7988ca7cb2ce')
  await prepareFoldedPdf()
  if (sheet.construction === 'k3')
    return k3Pdf(makeK3({ species: sheet.model, paper, appearance_id: sheet.appearance, locale: lang }))
  if (sheet.construction === 'k2')
    return k2Pdf(makeK2({ species: sheet.model, paper, appearance_id: sheet.appearance, locale: lang }))
  const plan = makeFoldedButterfly({ species: sheet.model, paper, appearance_id: sheet.appearance }, lang)
  return sheet.construction === 'k1' ? foldedPdf(plan) : classicComparisonPdf(plan)
}
