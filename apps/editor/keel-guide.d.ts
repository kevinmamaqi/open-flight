import type { Species } from '../../packages/geometry/workshop-models.ts'
import type { Locale } from '../../packages/print-export/sheets.ts'

export type KeelStep = {
  id: 'cut' | 'center' | 'wings' | 'table' | 'clip' | 'launch'
  title: string
  action: string
  check: string
}

export function keelSteps(locale?: Locale): KeelStep[]
export function keelDiagram(stepIndex?: number, species?: Species, locale?: Locale, spanMm?: number): string
