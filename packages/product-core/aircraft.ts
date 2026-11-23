import { model, canonical, generator, editable, metrics } from '../geometry/butterfly.ts'
import {
  workshopModels,
  workshopGenerator,
  workshopEditable,
  workshopMetrics,
} from '../geometry/workshop.ts'
import { sheet, preview, type Paper, type Locale } from '../print-export/sheets.ts'
import { workshopPreview, workshopSheet } from '../print-export/workshop.ts'
import { invalid } from './contracts.ts'

export type Parameters = { span_mm: number; left_trim_deg?: number; right_trim_deg?: number }
type WorkshopModel = (typeof workshopModels)[number]
export type Species = WorkshopModel['species']
type Selection = { species_id?: Species; parameters: Parameters; appearance_id: string }
type Definition = { name: string; minimum: number; maximum: number; step: number }

function airframe(species?: Species) {
  if (species === undefined) return undefined
  const found = workshopModels.find((entry) => entry.species === species)
  if (!found) throw invalid('This butterfly model is unavailable.')
  return found
}

export const baselines = [model, ...workshopModels]
export const definition = (species?: Species) => airframe(species) ?? model
export const generatorId = (species?: Species) => (species === undefined ? generator : workshopGenerator)

function signedTrim(parameters: Parameters) {
  return {
    span_mm: parameters.span_mm,
    left_trim_deg: parameters.left_trim_deg ?? 0,
    right_trim_deg: parameters.right_trim_deg ?? 0,
  }
}

export function sourceFor(id: string, revision: string, selection: Selection) {
  const current = airframe(selection.species_id)
  const { parameters, appearance_id } = selection
  const source = current
    ? workshopEditable(current, id, revision, signedTrim(parameters), appearance_id)
    : editable(id, revision, parameters.span_mm, appearance_id)
  return canonical(source)
}

export function geometryFor(selection: Selection) {
  const current = airframe(selection.species_id)
  return current
    ? workshopMetrics(current, signedTrim(selection.parameters))
    : metrics(selection.parameters.span_mm)
}

type PrintRevision = Selection & {
  ref: { design_id: string; revision_id: string; source_sha256: string }
  name: string
  evidence_state: string
}
export function previewFor(dto: PrintRevision) {
  const current = airframe(dto.species_id)
  return current ? workshopPreview(current, signedTrim(dto.parameters), dto.appearance_id) : preview(dto)
}
export function sheetFor(dto: PrintRevision, paper: Paper, locale: Locale) {
  const current = airframe(dto.species_id)
  return current
    ? workshopSheet(current, { ...dto, parameters: signedTrim(dto.parameters) }, paper, locale)
    : sheet(dto, paper, locale)
}

export function applyEdits(
  selection: Selection,
  values: Record<string, number> = {},
  appearance?: string,
) {
  const specs = definition(selection.species_id)
  const defs: Definition[] = specs.parameter_definitions
  for (const [key, value] of Object.entries(values)) {
    const def = defs.find((item) => item.name === key)
    if (!def) throw invalid('Unknown parameter for this butterfly: ' + key)
    if (
      !Number.isFinite(value) ||
      value < def.minimum ||
      value > def.maximum ||
      !Number.isInteger((value - def.minimum) / def.step)
    ) {
      throw invalid(`Choose ${key} from ${def.minimum} to ${def.maximum} in increments of ${def.step}.`)
    }
  }
  const appearance_id = appearance ?? selection.appearance_id
  if (!specs.appearances.some((item: { appearance_id: string }) => item.appearance_id === appearance_id))
    throw invalid('Select an appearance available for this butterfly.')
  return { parameters: { ...selection.parameters, ...values }, appearance_id }
}
