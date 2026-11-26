// What the one-page quick guide says. Pure data in English, Spanish and Russian:
// the print export lays it out (packages/print-export/quick-guide.js).
// Nothing here is a flight or a measurement. Launch and trim lines come from
// book/flight-notes.js, with its note that they are not yet tested on this design.
import { resolvePlate, shortURL, designURL } from './print-and-play.js?v=efdc141e4945'
import { flightNoteLabels, flightNotesFor } from './book/flight-notes.js?v=efdc141e4945'
import { baselines } from './assets/atlas/baselines.js?v=efdc141e4945'
import { planeCatalog } from './assets/planes/catalog.js?v=efdc141e4945'
import { objects } from './assets/objects/activities.js?v=efdc141e4945'

const w = (en, es, ru) => ({ en, es, ru })

export const guideCopy = {
  materials: w('You need', 'Necesitas', 'Понадобится'),
  tally: w('Mark five landings:', 'Marca cinco aterrizajes:', 'Отметьте пять посадок:'),
  scan: w('Step pictures and more', 'Imágenes de los pasos y más', 'Картинки шагов и многое другое'),
  licence: w(
    'Art and text CC BY-SA 4.0 · Geometry CERN-OHL-W-2.0 · openflight.design',
    'Arte y texto CC BY-SA 4.0 · Geometría CERN-OHL-W-2.0 · openflight.design',
    'Рисунки и текст CC BY-SA 4.0 · Геометрия CERN-OHL-W-2.0 · openflight.design',
  ),
  // A record plane's folds are derived from its credited original, so they carry no Open Flight licence.
  recordLicence: w(
    'Art and text CC BY-SA 4.0 · Folds derived from the original · openflight.design',
    'Arte y texto CC BY-SA 4.0 · Dobleces derivados del original · openflight.design',
    'Рисунки и текст CC BY-SA 4.0 · Сгибы по оригинальной модели · openflight.design',
  ),
}

// Tools come from the sheets' own text: the K3 sheet (paper, clips, scoring pen, glue stick), the airplane
// sheets (scissors for the cut border) and the activity cards (objects).
const butterflyTools = w(
  '120 g/m² paper, scissors and two 33 mm paper clips. A ruler and an empty ballpoint pen for the folds, a glue stick for the front edges.',
  'Papel de 120 g/m², tijeras y dos clips de 33 mm. Una regla y un bolígrafo sin tinta para los dobleces, pegamento de barra para los bordes delanteros.',
  'Бумага 120 г/м², ножницы и две скрепки по 33 мм. Линейка и шариковая ручка без чернил для сгибов, клей-карандаш для передних кромок.',
)
const airplaneTools = {
  cut: w('One sheet of paper and scissors. A paper clip for trimming.',
    'Una hoja de papel y tijeras. Un clip para ajustar.',
    'Лист бумаги и ножницы. Скрепка для настройки.'),
  whole: w('One sheet of paper. No scissors. A paper clip for trimming.',
    'Una hoja de papel. Sin tijeras. Un clip para ajustar.',
    'Лист бумаги. Без ножниц. Скрепка для настройки.'),
}

/** The design's own name: the original fold name first, never the aircraft's. */
export function designName(plateId, lang) {
  const plate = resolvePlate(plateId)
  if (plate.chapter === 'airplanes') return planeCatalog.find(plane => plane.model_id === plate.model).name[lang]
  if (plate.chapter === 'butterflies') return baselines[plate.model].names[lang]
  return objects.find(object => object.id === plate.model)[lang].title
}

export function materialsFor(plateId, lang, edge = 'cut') {
  const plate = resolvePlate(plateId)
  if (plate.chapter === 'butterflies') return butterflyTools[lang]
  if (plate.chapter === 'airplanes') return airplaneTools[edge === 'whole' ? 'whole' : 'cut'][lang]
  return objects.find(object => object.id === plate.model)[lang].materials
}

/** Everything the quick guide prints for one design, in one language. */
export function quickGuideContent(plateId, lang, { edge = 'cut' } = {}) {
  const plate = resolvePlate(plateId)
  const notes = flightNotesFor(plate.model, lang, 3)
  return {
    id: plate.id,
    model: plate.model,
    family: plate.chapter === 'airplanes' ? 'airplane' : plate.chapter === 'butterflies' ? 'butterfly' : 'object',
    name: designName(plate.id, lang),
    lineage: plate.lineage[lang],
    kind: plate.kind[lang],
    evidence: plate.evidence[lang],
    statusLine: [...new Set([...plate.kind[lang].split(' · '), ...plate.evidence[lang].split(' · ')])].join(' · '),
    materials: { label: guideCopy.materials[lang], text: materialsFor(plate.id, lang, edge) },
    launch: { label: flightNoteLabels.launch[lang], text: notes.launch },
    trim: {
      label: flightNoteLabels.trim[lang],
      seeLabel: flightNoteLabels.see[lang],
      fixLabel: flightNoteLabels.fix[lang],
      rows: notes.trim,
      note: notes.note,
    },
    tally: guideCopy.tally[lang],
    scan: guideCopy.scan[lang],
    url: designURL(plate.id, lang),
    shortUrl: shortURL(plate.id, lang),
    licence: (planeCatalog.find(plane => plane.model_id === plate.model)?.record ? guideCopy.recordLicence : guideCopy.licence)[lang],
  }
}
