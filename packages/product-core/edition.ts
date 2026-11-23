import { sha256 } from '../geometry/butterfly.ts'
import { svg, pdf, type Paper, type Locale } from '../print-export/sheets.ts'
import { pictureGuide } from '../print-export/build-guide.ts'
import { activities, forAircraft, fieldGuide, trialSheet } from './content.ts'
import {
  definition,
  generatorId,
  geometryFor,
  sourceFor,
  sheetFor,
  type Species,
  type Parameters as AircraftParameters,
} from './aircraft.ts'
import { invalid } from './contracts.ts'

export type Ref = {
  design_id: string
  revision_id: string
  source_sha256: string
}
export type ActivityRef = (typeof activities)[number]['ref']
export function revision(
  design_id: string,
  revision_id: string,
  name: string,
  parameters: AircraftParameters,
  appearance_id: string,
  parent: Ref | null,
  origin: 'original' | 'fork' | 'revision',
  created_at: string,
  species_id?: Species,
) {
  const model = definition(species_id)
  const selection = { parameters, appearance_id, species_id }
  const source = sourceFor(design_id, revision_id, selection)
  const ref = { design_id, revision_id, source_sha256: sha256(source) }
  return {
    source,
    dto: {
      ref,
      head_revision_id: revision_id,
      name,
      kind: 'butterfly_glider',
      ...(species_id ? { species_id } : {}),
      visibility: parent ? 'private' : 'public',
      parameters,
      parameter_definitions: model.parameter_definitions,
      appearance_id,
      supported_appearances: model.appearances,
      evidence_state: parent ? 'modified_experiment' : 'concept',
      evidence_record_ids: [],
      geometry: geometryFor(selection),
      created_at,
      provenance: {
        origin,
        parent,
        generator_revision: generatorId(species_id),
        rights: model.rights,
      },
    },
  }
}

export function emitPrintFiles(
  record: { dto: any; source: string },
  options: {
    formats: string[]
    page_size: Paper
    locale: Locale
    activities?: ActivityRef[]
  },
  put: (type: string, mime: string, value: Buffer | string, refs?: ActivityRef[]) => void,
) {
  const { dto, source } = record
  const available = forAircraft(dto.species_id, options.locale)
  const selected = (options.activities ?? []).map((ref) => {
    const entry = available.find(
      (a) =>
        a.ref.activity_id === ref.activity_id &&
        a.ref.revision_id === ref.revision_id &&
        a.ref.content_sha256 === ref.content_sha256,
    )
    if (!entry) throw invalid('Select an exact activity revision in the requested language.')
    return entry
  })
  const drawing = options.formats.some((f) => f === 'pdf' || f === 'svg')
    ? sheetFor(dto, options.page_size, options.locale)
    : undefined
  for (const format of options.formats) {
    switch (format) {
      case 'svg':
        put('print-svg', 'image/svg+xml', svg(drawing!))
        break
      case 'pdf':
        put('print-pdf', 'application/pdf', pdf(drawing!))
        break
      case 'source_json':
        put('source', 'application/json', source)
        break
      case 'trial_sheet':
        put(
          'trial',
          'application/json',
          JSON.stringify(trialSheet(dto.ref, dto, options.locale), null, 2) + '\n',
        )
        break
      case 'illustrated_guide': {
        const entry = fieldGuide.find((item) => item.id === dto.species_id)
        if (!entry) throw invalid('The picture guide is available for the three workshop butterflies.')
        const activity = available.find((item) => item.kind === 'lesson')!
        put('guide', 'text/html', pictureGuide(entry, dto, options.page_size, options.locale), [activity.ref])
        break
      }
      case 'instructions':
      case 'activity_assets': {
        const kind = format === 'instructions' ? 'lesson' : 'game'
        const assets = selected.length ? selected : available
        const matches = assets.filter((a) => a.kind === kind)
        if (!matches.length)
          throw invalid('Select a matching ' + kind + ' for ' + format + ' or omit the activity filter.')
        for (const activity of new Set(matches)) {
          const header =
            dto.ref.design_id + ' / ' + dto.ref.revision_id + ' / ' + dto.ref.source_sha256 + '\n\n'
          put(kind, 'text/markdown', header + activity.content_markdown, [activity.ref])
        }
        break
      }
    }
  }
}
