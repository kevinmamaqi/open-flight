import assert from 'node:assert/strict'
import test from 'node:test'
import { canonical, sha256, type Point } from '../packages/geometry/butterfly.ts'
import { toPaper, wingShape } from '../packages/geometry/workshop-art.ts'
import {
  workshopArt,
  workshopEditable,
  workshopMetrics,
  workshopModels,
  type WorkshopModel,
  type WorkshopParameters,
} from '../packages/geometry/workshop.ts'
import { sizes, svg } from '../packages/print-export/sheets.ts'
import { workshopPreview, workshopSheet } from '../packages/print-export/workshop.ts'

function source(model: WorkshopModel, parameters: WorkshopParameters, appearance_id: string) {
  const design_id = model.model,
    revision_id = model.baseline_revision
  const source_sha256 = sha256(
    canonical(workshopEditable(model, design_id, revision_id, parameters, appearance_id)),
  )
  return { ref: { design_id, revision_id, source_sha256 }, parameters, appearance_id }
}
const cross = (a: Point, b: Point, p: Point) =>
  (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])
function segmentDistance([x, y]: Point, a: Point, b: Point) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1]
  const u = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(x - a[0] - u * dx, y - a[1] - u * dy)
}
function touches(p: Point, cut: Point[], tolerance: number) {
  return cut.some((point, i) => segmentDistance(p, point, cut[(i + 1) % cut.length]) <= tolerance)
}
function inside([x, y]: Point, cut: Point[]) {
  let count = 0
  for (let i = 0, j = cut.length - 1; i < cut.length; j = i++) {
    const [a, b] = cut[i],
      [c, d] = cut[j]
    if (b > y !== d > y && x < ((c - a) * (y - b)) / (d - b) + a) count++
  }
  return count % 2 === 1
}
test('three distinct, symmetric, nonintersecting cut shapes have different aspect ratios', () => {
  const ratios = []
  for (const model of workshopModels) {
    const cut = wingShape(model).outline.map((p) => toPaper(p, model.parameters.span_mm)),
      len = cut.length
    assert.equal(
      Math.max(...cut.map((p) => p[0])) - Math.min(...cut.map((p) => p[0])),
      model.parameters.span_mm,
    )
    for (let i = 1; i < len; i++)
      assert.deepEqual(cut[i], [Math.abs(cut[len - i][0]) ? -cut[len - i][0] : 0, cut[len - i][1]])
    for (let i = 0; i < len; i++)
      for (let j = i + 2; j < len; j++) {
        if (i === 0 && j === len - 1) continue
        const a = cut[i],
          b = cut[(i + 1) % len],
          c = cut[j],
          d = cut[(j + 1) % len]
        assert.equal(
          cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0,
          false,
          'cut crossing in ' + model.name,
        )
      }
    const metrics = workshopMetrics(model, model.parameters)
    assert.ok(
      Math.abs(metrics.aspect_ratio - model.parameters.span_mm ** 2 / metrics.planform_area_mm2) <
        0.0006,
    )
    ratios.push(metrics.aspect_ratio)
  }
  assert.ok(ratios[1] + 0.8 < ratios[0] && ratios[0] + 0.3 < ratios[2])
})

test('every free tab edge starts on the cut, finishes at its own hinge, and shares a continuous surface', () => {
  for (const model of workshopModels)
    for (const span_mm of [148, 184]) {
      const art = workshopArt(model, { ...model.parameters, span_mm }, 'natural', true)
      const pts = (id: string) => art.lines.find((l) => l.id === id)!.points
      const cut = pts('cut')
      for (const side of ['left', 'right']) {
        const hinges = pts('tab-hinge-' + side)
        for (const i of [0, 1]) {
          const [end, hinge] = pts('tab-slit-' + side + '-' + i)
          assert.ok(touches(end, cut, 0.003))
          assert.deepEqual(hinge, hinges[i])
          assert.ok(inside(hinge, cut))
          assert.ok(end[1] - hinge[1] >= 8.98)
          assert.ok(inside([end[0], (end[1] + hinge[1]) / 2], cut))
        }
        assert.ok(inside([(hinges[0][0] + hinges[1][0]) / 2, (hinges[0][1] + hinges[1][1]) / 2], cut))
      }
    }
})

test('natural artwork fits inside the cut shape across both span limits', () => {
  for (const model of workshopModels)
    for (const span_mm of [148, 184]) {
      const [silhouette, ...art] = workshopArt(model, { ...model.parameters, span_mm }, 'natural').lines
      for (const line of art)
        for (const p of line.points)
          assert.ok(
            inside(p, silhouette.points) || touches(p, silhouette.points, 0.22),
            model.name + ' ' + line.id + ' crosses the cut',
          )
    }
})

test('two independently signed tab settings visibly change the artwork and its build instructions', () => {
  for (const model of workshopModels) {
    const neutral = model.parameters,
      up = { ...neutral, left_trim_deg: 8 },
      down = { ...neutral, left_trim_deg: -8 }
    const both = { ...up, right_trim_deg: -12 }
    const fingerprints = [neutral, up, down, both].map((p) =>
      sha256(workshopPreview(model, p, 'natural')),
    )
    assert.equal(new Set(fingerprints).size, 4)
    const base = workshopArt(model, neutral, 'natural'),
      raised = workshopArt(model, up, 'natural')
    const right = (lines: typeof base.lines) => lines.filter((line) => line.id.startsWith('right-'))
    assert.deepEqual(right(base.lines), right(raised.lines))
    const doc = workshopSheet(model, source(model, both, 'natural'), 'US_LETTER', 'en')
    assert.ok(doc.labels.some((l) => l.text === 'Left  +8°'))
    assert.ok(doc.labels.some((l) => l.text === 'Right  -12°'))
    const angles = [8, -12]
    for (const [i, angle] of angles.entries()) {
      const [a, b] = doc.lines.find((l) => l.id === 'gauge-tab-' + i)!.points
      assert.ok(Math.abs((Math.atan2(a[1] - b[1], b[0] - a[0]) * 180) / Math.PI - angle) < 0.01)
    }
  }
})

test('both paper sizes carry the actual cut span, 50 mm rule, source and selected language', () => {
  for (const model of workshopModels) {
    const p = { ...model.parameters, span_mm: 184, left_trim_deg: -6 }
    const rev = source(model, p, 'twilight')
    assert.equal(
      new Set(model.appearances.map((a) => sha256(workshopPreview(model, p, a.appearance_id)))).size,
      4,
    )
    for (const paper of ['A4', 'US_LETTER'] as const)
      for (const locale of ['en', 'ru'] as const) {
        const sheet = workshopSheet(model, rev, paper, locale)
        const cut = sheet.lines.find((l) => l.id === 'cut')!,
          ruler = sheet.lines.find((l) => l.id === 'ruler')!
        assert.deepEqual([sheet.width, sheet.height], sizes[paper])
        assert.equal(
          Math.max(...cut.points.map((p) => p[0])) - Math.min(...cut.points.map((p) => p[0])),
          p.span_mm,
        )
        assert.equal(ruler.points[1][0] - ruler.points[0][0], 50)
        assert.ok(sheet.labels.some((l) => l.text.includes(rev.ref.source_sha256)))
        assert.ok(
          sheet.labels.some((l) =>
            l.text.includes(locale === 'en' ? 'five level glides' : 'пять запусков'),
          ),
        )
        assert.ok(svg(sheet).length < 1048576)
      }
  }
})
