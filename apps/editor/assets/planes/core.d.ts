import type {
  CatalogPlane,
  PlaneOptions,
  PlanePlan,
  PlaneLocale,
  PlanePaper,
  PlaneLivery,
} from '../../../../packages/planes/types.ts'
export const planeCatalog: CatalogPlane[]
export const sheetSizes: Record<PlanePaper, [number, number]>
export const liveries: PlaneLivery[]
export const revision: string
export function makePlane(input: PlaneOptions, locale?: PlaneLocale): PlanePlan
export function planeSource(plan: PlanePlan): string
