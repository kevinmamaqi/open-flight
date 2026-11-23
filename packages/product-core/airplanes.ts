import { sha256 } from '../geometry/butterfly.ts'
import {
  makePlane, planeGuide, planePdf, planeSource, planeSvg,
  type PlaneLocale, type PlaneOptions,
} from '../planes/index.ts'

export type PlaneOutput = 'plan' | 'guide' | 'svg' | 'pdf' | 'source_json'

export function airplanePlan(settings: PlaneOptions, locale: PlaneLocale = 'en', format: PlaneOutput = 'plan') {
  const plan = makePlane(settings, locale)
  const formats = {
    plan: { mime: 'application/json', render: () => JSON.stringify(plan) },
    guide: { mime: 'text/html', render: () => planeGuide(plan) },
    svg: { mime: 'image/svg+xml', render: () => planeSvg(plan) },
    pdf: { mime: 'application/pdf', render: () => planePdf(plan) },
    source_json: { mime: 'application/json', render: () => planeSource(plan) },
  }
  const { mime, render } = formats[format]
  const bytes = Buffer.from(render())
  const encoding = format === 'pdf' ? 'base64' : 'utf8'
  return {
    settings: plan.source,
    locale: plan.locale,
    evidence_state: 'concept',
    output: {
      format,
      media_type: mime,
      encoding,
      byte_length: bytes.length,
      sha256: sha256(bytes),
      content: bytes.toString(encoding),
    },
  }
}
