import { jsPDF } from 'jspdf'
import { planePdfBytes } from '../../apps/editor/assets/planes/pdf.js'
import type { PlanePlan } from './types.ts'
import { printFonts } from '../print-export/fonts.ts'
export type * from './types.ts'
export {
  makePlane,
  planeCatalog,
  planeSource,
  sheetSizes,
  revision,
  revisions,
  sheetEdges,
  trimMm,
  liveries,
} from '../../apps/editor/assets/planes/core.js'
export { planeSvg, planeBackSvg, planeSpecimen, printSafeMm } from '../../apps/editor/assets/planes/drawing.js'
export { foldSvg, planeGuide } from '../../apps/editor/assets/planes/guide.js'
export function planePdf(plan: PlanePlan): Buffer {
  return Buffer.from(planePdfBytes(plan, jsPDF, printFonts()))
}
