import { makeFoldedButterfly, foldedPdf, foldedSource, foldedSvg, type FoldedPlan, type FoldedSettings } from '../folded-butterfly/index.ts'
import { canonical, sha256 } from '../geometry/butterfly.ts'
import { workshopEditable, workshopModels } from '../geometry/workshop.ts'
import { workshopSheet } from '../print-export/workshop.ts'
import { pdf, type Locale } from '../print-export/sheets.ts'

export function classicComparisonPdf(plan: FoldedPlan) {
  const model = workshopModels.find(item => item.species === plan.species)!
  const parameters = { ...model.parameters, span_mm: plan.span_mm }
  const original = plan.span_mm === model.parameters.span_mm && plan.appearance_id === model.appearance_id
  const id = original ? model.model : 'comparison-' + plan.species + '-' + plan.span_mm + '-' + plan.appearance_id
  const revision_id = original ? model.baseline_revision : 'pair1'
  const source = workshopEditable(model,id,revision_id,parameters,plan.appearance_id)
  const ref = { design_id:id, revision_id, source_sha256:sha256(canonical(source)) }
  const drawing = workshopSheet(model,{ref,parameters,appearance_id:plan.appearance_id},plan.paper,plan.locale)
  if (!original) {
    const label = drawing.labels.find(item => item.text.includes('/v1/designs/'))
    if (label) label.text = 'Open Flight · W1 / ' + model.species + ' / ' + plan.span_mm + ' mm / ' + plan.appearance_id
  }
  return pdf(drawing)
}

export type FoldedOutput = 'plan'|'svg'|'pdf'|'classic_pdf'|'source_json'
export function foldedButterflyPlan(settings:FoldedSettings = {}, locale:Locale = 'en', format:FoldedOutput='plan') {
  const plan=makeFoldedButterfly(settings,locale)
  const render={
    plan:()=>JSON.stringify(plan), svg:()=>foldedSvg(plan),pdf:()=>foldedPdf(plan),
    classic_pdf:()=>classicComparisonPdf(plan),source_json:()=>foldedSource(plan)
  }[format]
  const bytes=Buffer.from(render())
  const isPdf=format==='pdf'||format==='classic_pdf'
  const encoding = isPdf ? 'base64' : 'utf8'
  return {
    settings:{species:plan.species,span_mm:plan.span_mm,appearance_id:plan.appearance_id,paper:plan.paper},
    revision:plan.revision,locale:plan.locale,evidence_state:'concept',
    flat_span_mm:plan.flat_span_mm,keel_depth_mm:plan.keel_depth_mm,clip_station_mm:plan.clip_station_mm,
    output:{format,media_type:isPdf?'application/pdf':format==='svg'?'image/svg+xml':'application/json',
      encoding,byte_length:bytes.length,sha256:sha256(bytes),content:bytes.toString(encoding)}
  }
}
