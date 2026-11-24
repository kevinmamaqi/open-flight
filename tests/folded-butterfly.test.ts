import assert from 'node:assert/strict'
import { test } from 'node:test'
import { inflateSync } from 'node:zlib'
import {
  foldedFinishedPreview,
  foldedGeometry,
  foldedGuideSvg,
  foldedLessonSvg,
  foldedPdf,
  foldedPreview,
  foldedSource,
  foldedSvg,
  makeFoldedButterfly,
  type FoldedSettings,
} from '../packages/folded-butterfly/index.ts'
import { rounded, type Point } from '../packages/geometry/butterfly.ts'
import {
  workshopArt,
  workshopGenerator,
  workshopModels,
} from '../packages/geometry/workshop.ts'
import { sizes } from '../packages/print-export/sheets.ts'

const stations = { monarch: 17, morpho: 18, swallowtail: 17 }

for (const model of workshopModels) {
  test(`K1 ${model.species} perimeter joins exact original wings across a 16 mm web`, () => {
    for (const span_mm of [148, model.parameters.span_mm, 184]) {
      const plan = makeFoldedButterfly({ species: model.species, span_mm })
      const {
        outline,
        web,
        left,
        right,
        creases,
        clipStops,
        shoulders,
        lines,
      } = foldedGeometry(plan)
      const xs = outline.map(([x]) => x)
      assert.equal(Math.max(...xs) - Math.min(...xs), span_mm + 16)
      assert.ok(Math.min(...xs) + 105 >= 5)
      assert.ok(105 - Math.max(...xs) >= 5)
      const oldOutline = workshopArt(
        model,
        { ...model.parameters, span_mm },
        'natural',
        true,
      ).lines.find((line) => line.id === 'cut')!.points
      const projection =
        (side: number) =>
        ([x, y]: Point): Point => [rounded(x - side * 8), y]
      const projected = right
        .map(projection(1))
        .concat(left.slice(1, -1).map(projection(-1)))
      assert.deepEqual(projected, oldOutline)
      assert.deepEqual(
        [right[0], right.at(-1), left[0], left.at(-1)],
        [web[1], web[2], web[3], web[0]],
      )
      assert.equal(
        plan.body_length_mm,
        model.geometry.abdomen_y - model.geometry.nose_y,
      )
      assert.equal(plan.keel_depth_mm, 8)
      assert.deepEqual(
        creases.map((crease) => crease.points),
        [-8, 0, 8].map((x) => [
          [x, plan.nose_y_mm],
          [x, plan.abdomen_y_mm],
        ]),
      )
      assert.equal(plan.clip_station_mm, stations[model.species])
      const stopY = plan.nose_y_mm + plan.clip_station_mm
      assert.deepEqual(
        clipStops.map((stop) => stop.points),
        [
          [
            [-1, stopY],
            [-7, stopY],
          ],
          [
            [1, stopY],
            [7, stopY],
          ],
        ],
      )
      assert.deepEqual(
        shoulders.map(({ points }) => {
          const a = points[0],
            b = points[8]
          return [rounded((a[0] + b[0]) / 2), rounded((a[1] + b[1]) / 2)]
        }),
        [
          [-10.3, stopY],
          [10.3, stopY],
        ],
      )
      assert.deepEqual(
        lines.filter((line) => /slit|tab-hinge/.test(line.id)),
        [],
      )
      assert.equal(lines.filter((line) => line.id === 'cut').length, 1)
    }
  })
}

test('editable K1 source is locale-independent and validates saved revision and dimensions', () => {
  const p = makeFoldedButterfly(
    { species: 'swallowtail', appearance_id: 'twilight', paper: 'US_LETTER' },
    'es',
  )
  const settings = JSON.parse(foldedSource(p))
  assert.deepEqual(settings, {
    format: 'open-flight-folded-butterfly',
    revision: 'k1',
    species: 'swallowtail',
    span_mm: p.span_mm,
    appearance_id: 'twilight',
    paper: 'US_LETTER',
  } as const)
  assert.deepEqual(makeFoldedButterfly(settings, 'es'), p)
  assert.equal(
    foldedSource(makeFoldedButterfly(settings, 'ru')),
    foldedSource(p),
  )
  assert.equal(p.evidence, 'experimental_unvalidated')
  assert.deepEqual(
    p.steps.map((step) => step.id),
    ['cut', 'center', 'wings', 'table', 'clip', 'launch'],
  )
  for (const patch of [
    { format: 'existing' },
    { revision: 'w1' },
    { species: 'unknown' },
    { span_mm: 149 },
    { span_mm: 146 },
    { span_mm: 186 },
    { span_mm: NaN },
    { appearance_id: 'unknown' },
    { paper: 'unknown' },
  ])
    assert.throws(() =>
      makeFoldedButterfly({ ...settings, ...patch } as FoldedSettings),
    )
  assert.equal(workshopGenerator, 'butterfly-workshop-w1-2e6f328c7a57eeaa')
})

function pdfPaths(bytes: Uint8Array) {
  const binary = Buffer.from(bytes).toString('latin1')
  const stream =
    /\/Filter \/FlateDecode\s*>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/.exec(
      binary,
    )
  assert.ok(stream, 'find the compressed page paths')
  return inflateSync(Buffer.from(stream[1], 'latin1')).toString('latin1')
}

test('SVG and PDF use actual-size paper and the same 50 mm ruler', () => {
  for (const paper of ['A4', 'US_LETTER'] as const) {
    for (const locale of ['en', 'es', 'ru'] as const) {
      const plan = makeFoldedButterfly(
        { species: 'morpho', span_mm: 184, appearance_id: 'coloring', paper },
        locale,
      )
      const [width, height] = sizes[paper]
      const sheet = foldedSvg(plan)
      assert.match(
        sheet,
        new RegExp(
          `width="${width}mm" height="${height}mm" viewBox="0 0 ${width} ${height}"`,
        ),
      )
      assert.match(sheet, /id="ruler" d="M9 143 L59 143"/)
      assert.ok(sheet.includes(plan.steps[5].title))
      assert.match(
        foldedSvg(plan, true),
        /id="gauge-clip-stop" d="M28 216.7 L28 227.3"/,
      )
      const guide = foldedGuideSvg(plan)
      assert.ok(guide.includes(plan.steps[5].title))
      assert.ok(!guide.includes('id="cut"'))
      const preview = foldedPreview(plan)
      assert.match(preview, /^<svg[^>]* viewBox="0 0 206 /)
      assert.ok(!preview.includes('id="ruler"'))
      const bytes = foldedPdf(plan)
      const pdf = Buffer.from(bytes).toString('latin1')
      assert.match(pdf, /\/Count 2\b/)
      const box = /\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/.exec(pdf)
      assert.ok(box, 'includes the calibrated page box')
      const ptToMM = 25.4 / 72
      assert.ok(Math.abs(Number(box[1]) * ptToMM - width) < 0.0001)
      assert.ok(Math.abs(Number(box[2]) * ptToMM - height) < 0.0001)
      const content = pdfPaths(bytes)
      const ruler = /25\.51181 ([\d.]+) m\n167\.24409 \1 l/.exec(content)
      assert.ok(ruler, 'PDF ruler has exactly the two endpoints 50 mm apart')
      assert.ok(Math.abs(Number(ruler[1]) * ptToMM - (height - 143)) < 0.0001)
      const noseGauge = /28\.34646 ([\d.]+) m\n28\.34646 ([\d.]+) l/.exec(
        content,
      )
      const clipGauge = /79\.37008 ([\d.]+) m\n79\.37008 ([\d.]+) l/.exec(
        content,
      )
      assert.ok(
        noseGauge && clipGauge,
        'PDF gauge places the clip stop 18 mm aft of the nose',
      )
      assert.deepEqual(noseGauge.slice(1), clipGauge.slice(1))
      assert.deepEqual(bytes, foldedPdf(plan))
      assert.equal(sheet, foldedSvg(plan))
    }
  }
})

test('all workshop palettes preserve colored vectors independently from geometry', () => {
  const variants = ['natural', 'carnival', 'twilight', 'coloring'] as const
  for (const model of workshopModels) {
    const previews = variants.map((appearance_id) =>
      foldedPreview(
        makeFoldedButterfly({
          species: model.species,
          appearance_id,
        }),
      ),
    )
    assert.equal(new Set(previews).size, variants.length)
    for (const [index, preview] of previews.entries())
      assert.ok(preview.includes(model.palettes[variants[index]].ink))
  }
})

test('assembled preview recovers the original wingspan above a touching 8 mm keel', () => {
  for (const model of workshopModels) {
    const plan = makeFoldedButterfly({ species: model.species, span_mm: 184 })
    const preview = foldedFinishedPreview(plan)
    const points = (id: string): Point[] => {
      const path = new RegExp('id="' + id + '" d="M([^"]+)"').exec(preview)
      assert.ok(path, id)
      return path[1]
        .replace(/ Z$/, '')
        .split(' L')
        .map((point) => point.split(' ').map(Number) as Point)
    }
    const wing = points('assembled-silhouette')
    const xs = wing.map(([x]) => x)
    assert.equal(Math.max(...xs) - Math.min(...xs), plan.span_mm)
    assert.ok(!preview.includes('paper-web'))
    const [a, b] = points('rear-wing-plane')
    assert.equal(b[0] - a[0], plan.span_mm)
    assert.equal(a[1], b[1])
    for (const side of ['left', 'right']) {
      const [root, bottom] = points('rear-wall-' + side)
      assert.equal(root[0], bottom[0])
      assert.equal(root[1], a[1])
      assert.equal(bottom[1] - root[1], 8)
    }
    assert.ok(preview.includes('both wings level'))
    assert.ok(
      foldedFinishedPreview(
        makeFoldedButterfly({ species: plan.species }, 'es'),
      ).includes('alas al mismo nivel'),
    )
    assert.ok(
      foldedFinishedPreview(
        makeFoldedButterfly({ species: plan.species }, 'ru'),
      ).includes('крылья на одном уровне'),
    )
  }
})


test('the cut lesson and exact print use the active plan’s web and clip coordinates', () => {
  const defaultPlan = makeFoldedButterfly({ species: 'morpho', span_mm: 184, appearance_id: 'twilight' })
  // Exercise the derived manufacturing data as if the physical source changed.
  const plan = { ...defaultPlan, keel_depth_mm: 10, flat_span_mm: 204, clip_station_mm: 19 }
  const cutLesson = foldedLessonSvg(plan, 0)
  const printable = foldedSvg(plan, true)
  const width = 210
  const { outline, creases, clipStops } = foldedGeometry(plan)
  const top = Math.min(...outline.map(([, y]) => y))
  for (const { id, points } of [...creases, ...clipStops]) {
    for (const [text, svgId, offsetX, offsetY] of [
      [cutLesson, 'lesson-' + id, (plan.flat_span_mm + 6) / 2, 3 - top],
      [printable, id, width / 2, 29],
    ] as const) {
      const path = new RegExp('id="' + svgId + '" d="([^"]+)').exec(text)?.[1]
      assert.ok(path, svgId)
      const coords = path.match(/[+-]?\d+(?:\.\d+)?/g)?.map(Number)
      const expected = points.flatMap(([x, y]) => [
        Number((x + offsetX).toFixed(3)),
        Number((y + offsetY).toFixed(3)),
      ])
      assert.deepEqual(coords, expected, svgId)
    }
  }
  assert.match(foldedLessonSvg(plan, 4), />19 mm</)
  assert.match(printable, /id="gauge-clip-stop" d="M29 216.7 L29 227.3"/)
})
