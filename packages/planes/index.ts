import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { jsPDF } from 'jspdf'
import { planePdfBytes } from '../../apps/editor/assets/planes/pdf.js'
import type { PlanePlan } from './types.ts'
export type * from './types.ts'
export {
  makePlane,
  planeCatalog,
  planeSource,
  sheetSizes,
  revision,
  liveries,
} from '../../apps/editor/assets/planes/core.js'
export { planeSvg, planeSpecimen } from '../../apps/editor/assets/planes/drawing.js'
export { foldSvg, planeGuide } from '../../apps/editor/assets/planes/guide.js'
const require = createRequire(import.meta.url)
let font: string | undefined
let fontNotice: string | undefined
export function planePdf(plan: PlanePlan): Buffer {
  font ??= readFileSync(require.resolve('dejavu-fonts-ttf/ttf/DejaVuSans.ttf')).toString('base64')
  fontNotice ??= readFileSync(require.resolve('dejavu-fonts-ttf/LICENSE'), 'utf8')
  return Buffer.from(planePdfBytes(plan, jsPDF, font, fontNotice))
}
