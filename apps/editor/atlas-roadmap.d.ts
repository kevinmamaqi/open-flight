import type { Locale } from '../../packages/print-export/sheets.ts'

export function motorRoadmap(locale?: Locale): {
  locale: Locale
  status: string
  stages: { title: string; action: string; record: string }[]
  parts: { part: string; criterion: string }[]
  sources: { label: string; url: string }[]
}
