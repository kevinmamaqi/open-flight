import type {
  CatalogPlane,
  PlaneOptions,
  PlanePlan,
  PlaneLocale,
  PlanePaper,
  PlaneLivery,
  PlaneEdge,
} from '../../../../packages/planes/types.ts'
export const planeCatalog: CatalogPlane[]
export const sheetSizes: Record<PlanePaper, [number, number]>
export const liveries: PlaneLivery[]
export const revision: string
export const revisions: string[]
export const sheetEdges: readonly PlaneEdge[]
export const trimMm: number
export function makePlane(input: PlaneOptions, locale?: PlaneLocale): PlanePlan
export function planeSource(plan: PlanePlan): string
