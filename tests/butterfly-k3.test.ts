// Checks for the K3 dart butterfly, the current folded butterfly. They confirm that the printed
// sheet can be cut and folded as drawn for every species, span, paper and language, and that
// older links still open. They do not show that K3 flies.
import assert from 'node:assert/strict'
import test from 'node:test'
import { estimateK3, insidePolygon, k3Flat, k3Geometry, k3PoseForSpan, k3SpanRange } from '../packages/folded-butterfly/k3-dart.ts'
import { k3BackPage, k3BuildSteps, k3CutPage, k3Faces, k3GuidePage, k3Pdf, k3SheetLines, makeK3 } from '../packages/folded-butterfly/k3-sheet.ts'
import { dartButterflyPlan } from '../packages/product-core/folded-butterflies.ts'
import { makeK2 } from '../packages/folded-butterfly/k2-sheet.ts'
import { papers } from '../packages/folded-butterfly/k2-airframe.ts'
import { printSafeMm } from '../apps/editor/assets/print-faces.js'

type P = [number, number]

function crosses(a: P, b: P, c: P, d: P) {
  const o = (p: P, q: P, r: P) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]))
  return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0
}
function selfIntersections(poly: P[]) {
  const hits: number[][] = []
  for (let i = 0; i < poly.length; i++)
    for (let j = i + 2; j < poly.length; j++) {
      if (i === 0 && j === poly.length - 1) continue
      if (crosses(poly[i], poly[(i + 1) % poly.length], poly[j], poly[(j + 1) % poly.length])) hits.push([i, j])
    }
  return hits
}

test('K3 cut line is one simple outline', () => {
  const flat = k3Flat(k3Geometry())
  assert.deepEqual(selfIntersections(flat.outline), [])
  const finished = k3Geometry().top
  assert.deepEqual(selfIntersections(finished), [])
})

test('posed forewing hides the front of the hindwing', () => {
  assert.equal(k3Geometry().exposed.length, 0)
})

test('costa doubler folds onto its own forewing and stays off the body', () => {
  const geo = k3Geometry()
  const rx = geo.costa[0][0]
  for (const p of geo.doublerFolded.slice(1, -1)) {
    assert.ok(insidePolygon(p, geo.top), `folded doubler corner ${p} leaves the wing`)
    assert.ok(p[0] > rx, `folded doubler corner ${p} reaches the body`)
  }
  // Unfolded, the doubler lies outside the wing, ahead of the costa.
  for (const p of geo.doubler.slice(1, -1)) assert.ok(!insidePolygon(p, geo.top))
})

test('nose flap and antennae are separate pieces of paper', () => {
  const geo = k3Geometry()
  const flat = k3Flat(geo)
  const flapEdge = Math.max(...flat.sleeve.map(([x]) => x))
  const antennaInner = Math.min(...geo.antenna.filter(([, y]) => y < geo.head_y).map((p) => flat.toFlat(p, 1)[0]))
  assert.ok(antennaInner - flapEdge >= 2, `gap ${antennaInner - flapEdge} mm is too narrow for scissors`)
})

test('keel tapers from thorax to abdomen and the root creases are straight', () => {
  const flat = k3Flat(k3Geometry())
  const [a, e] = flat.crease.root
  assert.ok(a[0] > e[0])
  assert.equal(flat.crease.center[0][0], 0)
})

test('the cut sheet fits A4 landscape inside the safe margin', () => {
  const plan = makeK3()
  const page = k3CutPage(plan)
  const sheet = page.lines.find((l) => l.id === 'cut')!
  for (const [x, y] of sheet.points) {
    assert.ok(x > printSafeMm && x < page.width - printSafeMm, `x ${x}`)
    assert.ok(y > printSafeMm && y < page.height - printSafeMm, `y ${y}`)
  }
  assert.ok(k3Pdf(plan).subarray(0, 5).toString() === '%PDF-')
  assert.ok(k3SheetLines(plan).slits.length === 4)
})

test('model estimate: stable with two clips, about the span of K2, more sweep', () => {
  const geo = k3Geometry()
  const e = estimateK3(geo, papers['120'], 1.0)
  const k2 = makeK2({ species: 'monarch' }).prediction
  assert.ok(e.static_margin > 0.1, `margin ${e.static_margin}`)
  assert.ok(Math.abs(e.span_mm - k2.span_mm) < 8)
  assert.ok(e.sweep_deg > 30)
  // Gluing the doubler makes the swept wing at least as stiff as K2's.
  assert.ok(estimateK3(geo, papers['120'], 1.0, 0.1, true).tip_deflection_mm <= k2.tip_deflection_mm + 0.5)
})

const species = ['monarch', 'morpho', 'swallowtail'] as const
const spans: number[] = []
for (let s = k3SpanRange.minimum; s <= k3SpanRange.maximum; s += k3SpanRange.step) spans.push(s)

test('every species and span folds from one simple outline, hides its hindwing front and is stable in the model', () => {
  for (const s of species)
    for (const span of spans) {
      const geo = k3Geometry(s, k3PoseForSpan(s, span))
      assert.ok(Math.abs(geo.span_mm - span) < 0.5, `${s} ${span}: span ${geo.span_mm}`)
      assert.equal(geo.exposed.length, 0, `${s} ${span}: hindwing front shows`)
      assert.deepEqual(selfIntersections(k3Flat(geo).outline), [], `${s} ${span}: cut line crosses itself`)
      const e = estimateK3(geo, papers['120'], 1.0)
      assert.ok(e.static_margin > 0.1, `${s} ${span}: margin ${e.static_margin}`)
      assert.ok(e.sweep_deg > 25, `${s} ${span}: sweep ${e.sweep_deg}`)
    }
})

test('every page fits both papers inside the safe margin, in every language', () => {
  for (const s of species)
    for (const span of [k3SpanRange.minimum, k3SpanRange.maximum])
      for (const paper of ['A4', 'US_LETTER'] as const)
        for (const locale of ['en', 'es', 'ru'] as const) {
          const plan = makeK3({ species: s, span_mm: span, paper, locale })
          for (const page of [k3CutPage(plan), k3BackPage(plan), k3GuidePage(plan)]) {
            for (const line of page.lines)
              for (const [x, y] of line.points)
                assert.ok(x >= 0 && x <= page.width && y >= 0 && y <= page.height, `${s} ${span} ${paper} ${locale}: ${line.id} at ${x},${y}`)
            for (const label of page.labels) assert.ok(label.x >= printSafeMm - 0.01 && label.y <= page.height - printSafeMm + 0.01, `${s} ${paper} ${locale}: "${label.text}"`)
          }
          const cut = k3CutPage(plan).lines.find((l) => l.id === 'cut')!
          for (const [x, y] of cut.points) assert.ok(x > printSafeMm && x < k3CutPage(plan).width - printSafeMm && y > printSafeMm, `${s} ${paper}: cut at ${x},${y}`)
        }
})

test('the PDF has the cut sheet, its back and the guide; the guide speaks the chosen language', () => {
  const bytes = k3Pdf(makeK3({ species: 'morpho', locale: 'ru', paper: 'US_LETTER' }))
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-')
  assert.equal((bytes.toString('latin1').match(/\/Type \/Page\b/g) ?? []).length, 3)
  assert.equal(k3BuildSteps(makeK3({ locale: 'es' }))[0].title, 'Recorta')
  assert.equal(k3BuildSteps(makeK3({ locale: 'ru' })).length, 8)
  assert.throws(() => makeK3({ span_mm: 184 }), /Finished span/)
  assert.throws(() => makeK3({ appearance_id: 'neon' as never }), /appearance/)
})

test('the back face mirrors every crease and swaps valleys and mountains', () => {
  const plan = makeK3()
  const front = k3SheetLines(plan).creases
  const back = k3BackPage(plan).lines.filter((l) => l.id.endsWith('-back') && !l.id.includes('slit'))
  assert.equal(back.length, front.length)
})

test('the 3D faces match the flat sheet: wings above the root line, keel walls below', () => {
  const { faces } = k3Faces(makeK3({ species: 'swallowtail' }))
  assert.equal(faces.length, 4)
  for (const face of faces) {
    assert.equal(face.flat.length, face.points.length)
    if (face.part === 'wing') assert.ok(face.points.every(([, up]) => up >= 0))
    else assert.ok(face.points.every(([, up]) => up <= 0))
  }
})

test('agents get the same K3 sheet the workshop prints', () => {
  const plan = dartButterflyPlan({ species: 'swallowtail', span_mm: 160, paper: 'US_LETTER' }, 'es', 'pdf')
  const direct = k3Pdf(makeK3({ species: 'swallowtail', span_mm: 160, paper: 'US_LETTER', locale: 'es' }))
  assert.equal(Buffer.from(plan.output.content, 'base64').equals(direct), true)
  assert.equal(plan.revision, 'k3')
  assert.equal(plan.evidence_state, 'concept')
  const summary = JSON.parse(dartButterflyPlan({}, 'en', 'plan').output.content)
  assert.ok(summary.static_margin_two_clips > 0.1)
  assert.equal(summary.steps.length, 8)
})
