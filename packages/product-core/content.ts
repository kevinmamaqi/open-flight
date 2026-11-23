import { readFileSync } from 'node:fs'
import { sha256 } from '../geometry/butterfly.ts'
import type { Species, Parameters } from './aircraft.ts'
import type { Locale } from '../print-export/sheets.ts'

type GuideTranslation = {
  common_name: string
  observation: string
  flight_question: string
  photo_alt: string
  steps: { id: string; title: string; body: string; diagram: string }[]
}
export type GuideEntry = {
  id: Species
  scientific_name: string
  photo: { url: string; creator: string; local_path: string | null }
  natural_history: { url: string; source: string }
  trim_reference: { url: string; source: string }
  en: GuideTranslation
  ru: GuideTranslation
}
export const fieldGuide: GuideEntry[] = JSON.parse(
  readFileSync(new URL('../field-guide/species.json', import.meta.url), 'utf8'),
)

const assets = [
  [
    'build-en',
    'en',
    'lesson',
    'Build the Butterfly Glider',
    'Cut, fold and set the clip.',
    'content/en/butterfly-001/build.md',
  ],
  [
    'build-ru',
    'ru',
    'lesson',
    'Соберите планер-бабочку',
    'Вырежьте планер, согните крылья и установите скрепку.',
    'content/ru/butterfly-001/build.md',
  ],
  [
    'garden-gate-en',
    'en',
    'game',
    'Garden Gate',
    'Count gate passes and measure landing error.',
    'games/garden-gate/en.md',
  ],
  [
    'garden-gate-ru',
    'ru',
    'game',
    'Садовые ворота',
    'Считайте проходы и измеряйте расстояние до цветка.',
    'games/garden-gate/ru.md',
  ],
]
const originalActivities = assets.map(([id, locale, kind, title, summary, path]) => {
  const content_markdown = readFileSync(new URL('../../' + path, import.meta.url), 'utf8')
  return {
    ref: { activity_id: id, revision_id: 'a1', content_sha256: sha256(content_markdown) },
    kind,
    title,
    locale,
    aircraft_kinds: ['butterfly_glider'],
    summary,
    content_markdown,
    evidence_classification: kind === 'game' ? 'untested_activity' : 'instruction',
  }
})

const buildGuides = fieldGuide.flatMap((entry) =>
  (['en', 'ru'] as const).map((locale) => {
    const guide = entry[locale]
    const title =
      (locale === 'ru' ? 'Соберите планер «' : 'Build the ') +
      guide.common_name +
      (locale === 'ru' ? '»' : '')
    const content_markdown =
      [
        '# ' + title,
        guide.observation,
        ...guide.steps.map(
          (step, index) => '## ' + (index + 1) + '. ' + step.title + '\n\n' + step.body,
        ),
        guide.flight_question,
        '[' + entry.photo.creator + ' · Pixabay](' + entry.photo.url + ')',
        '[' + entry.trim_reference.source + '](' + entry.trim_reference.url + ')',
      ].join('\n\n') + '\n'
    return {
      ref: {
        activity_id: 'workshop-' + entry.id + '-' + locale,
        revision_id: 'w1',
        content_sha256: sha256(content_markdown),
      },
      kind: 'lesson',
      title,
      locale,
      aircraft_kinds: ['butterfly_glider'],
      summary: guide.flight_question,
      evidence_classification: 'instruction',
      content_markdown,
      species_id: entry.id,
    }
  }),
)

export const activities = [...originalActivities, ...buildGuides].sort((a, b) =>
  a.ref.activity_id < b.ref.activity_id ? -1 : a.ref.activity_id > b.ref.activity_id ? 1 : 0,
)

export function forAircraft(species?: Species, locale?: Locale) {
  return activities.filter(
    (item) =>
      (!locale || item.locale === locale) &&
      (item.kind === 'game' ||
        ('species_id' in item ? item.species_id === species : species === undefined)),
  )
}

export function trialSheet(
  ref: { design_id: string; revision_id: string; source_sha256: string },
  selection?: { species_id?: Species; parameters: Parameters },
  locale: Locale = 'en',
) {
  const workshop = selection?.species_id
  const parameters = selection?.parameters
  return {
    schema_version: 1,
    record_type: 'flight_test',
    test_id: ref.design_id + '-' + ref.revision_id + '-planned',
    status: 'planned',
    is_example: false,
    evidence_kind: 'physical',
    design: { design_id: ref.design_id, revision: ref.revision_id, source_sha256: ref.source_sha256 },
    protocol: {
      protocol_id: workshop ? 'wing-trim' : 'clip-position',
      revision: workshop ? 'w1' : 'b1',
      acceptance_rule: null,
      defined_at: null,
    },
    setup: {
      aircraft_instance_id: null,
      material_spec: null,
      finished_mass_g: null,
      balance_mm_from_nose: null,
      launch_method: null,
      release_height_m: null,
      environment: null,
    },
    performed_at: null,
    performed_by: null,
    trials: [],
    evidence_artifacts: [],
    review: { decision: 'pending', reviewer: null, reviewed_at: null },
    notes:
      workshop && parameters
        ? locale === 'ru'
          ? `Размах развёртки ${parameters.span_mm} мм. Если смотреть сзади, левый клапан ${parameters.left_trim_deg}°, правый ${parameters.right_trim_deg}°. Плюс означает сгиб вверх. Сравните плоские клапаны с одним изменённым. Чередуйте настройки по пять бросков с одной высоты. Используйте те же бумагу и скрепку. Запишите направление и место посадки при каждой попытке.`
          : `Planned ${workshop} build, ${parameters.span_mm} mm flat span. Set left trim to ${parameters.left_trim_deg}° and right trim to ${parameters.right_trim_deg}°, viewed from behind (positive up). Start with flat tabs and change one tab. Alternate five gentle releases of each configuration with the same paper, clip and height. Record every landing and observed direction.`
        : 'Plan only. Record the actual station, stock, print calibration and launch conditions with the raw observations.',
  }
}
