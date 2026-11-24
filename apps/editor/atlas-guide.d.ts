import type { Locale } from '../../packages/print-export/sheets.ts'

export const designIds: string[]
export function compareModels(left?: string, right?: string, locale?: Locale): {
  locale: Locale
  models: {
    id: string
    name: string
    inspiration: string
    family: 'butterfly' | 'airplane'
    technique: string
    materials: string
    shape: string
    experiment: string
    image: string
    settings: { label: string; value: number; unit: 'mm' | '°' }[]
    studio: string
  }[]
  question: string
}
