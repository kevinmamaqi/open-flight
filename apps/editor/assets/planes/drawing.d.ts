import type { PlanePlan } from '../../../../packages/planes/types.ts'
export function planeSvg(plan: PlanePlan): string
export function planeSpecimen(plan: PlanePlan): string
export function planeBackSvg(plan: PlanePlan): string
export const printSafeMm: number
export function sheetScene(plan: PlanePlan): unknown[]
export function backScene(plan: PlanePlan): unknown[]
export function stripes(plan: PlanePlan): unknown[]
export function pageSize(plan: PlanePlan): [number, number]
