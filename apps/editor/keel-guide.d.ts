import type { FoldedPlan } from '../../packages/folded-butterfly/index.ts'
import type { Locale } from '../../packages/print-export/sheets.ts'

export type KeelStep = {
  id: 'cut' | 'center' | 'wings' | 'table' | 'clip' | 'launch'
  title: string
  action: string
  check: string
}

export function keelSteps(locale?: Locale): KeelStep[]
export function keelDiagram(plan: FoldedPlan, stepIndex: number, color: string, flatSvg: () => string): string
