// Checks for the record-plane study sheets. They confirm that the fold engine is consistent and
// that each reconstruction matches what was measured from its tutorial. They do not show that
// any plane flies, and the reconstructions are not the designers' own diagrams.
import assert from 'node:assert/strict'
import test from 'node:test'
import { area, isometry, Model, line } from '../packages/planes/records/engine.ts'
import { recordPlanes } from '../packages/planes/records/index.ts'
import { buildPlane, overviewPage, pdf, planePages } from '../packages/planes/records/sheet.ts'

const built = recordPlanes.map(buildPlane)
const byId = Object.fromEntries(built.map((b) => [b.plane.id, b]))

test('every panel is a rigid image of its part of the sheet, at every step', () => {
  for (const b of built)
    for (const s of b.model.steps)
      for (const panel of s.frame.after) {
        const map = isometry(panel)
        assert.ok(map, `${b.plane.id} step ${s.n}: degenerate panel`)
        for (const v of panel.vertices) {
          const q = map!(v.o)
          assert.ok(Math.hypot(q[0] - v.p[0], q[1] - v.p[1]) < 0.01, `${b.plane.id} step ${s.n}: vertex off by ${Math.hypot(q[0] - v.p[0], q[1] - v.p[1])}`)
        }
      }
})

test('folding never creates or loses paper', () => {
  for (const b of built) {
    const sheet = b.model.width * b.model.height
    for (const s of b.model.steps) {
      const total = s.frame.after.reduce((a, p) => a + area(p.vertices.map((v) => v.p)), 0)
      assert.ok(Math.abs(total - sheet) < 0.5, `${b.plane.id} step ${s.n}: ${total} mm² of ${sheet}`)
    }
    assert.ok(Math.abs(b.estimate.mass_g - 4.99) < 0.01, `${b.plane.id} mass ${b.estimate.mass_g}`)
  }
})

test('turning over and folding back restores the sheet', () => {
  const m = new Model(210, 297)
  m.fold(line.vertical(105), [200, 10])
  m.turnOver()
  for (const p of m.panels) for (const v of p.vertices) assert.ok(v.p[0] >= -1e-6 && v.p[0] <= 105 + 1e-6)
  assert.equal(m.panels.length, 2)
})

test('finished sizes match the tutorial measurements', () => {
  const near = (v: number, lo: number, hi: number, what: string) => assert.ok(v >= lo && v <= hi, `${what}: ${v.toFixed(1)} not in ${lo}–${hi}`)
  const rd = byId['red-dart'].estimate
  near(rd.length_mm, 190, 200, 'Red Dart length')
  near(rd.span_mm, 20, 30, 'Red Dart span')
  near(rd.layers_at_nose, 30, 50, 'Red Dart nose layers')
  const ss = byId['shaheen-shin'].estimate
  near(ss.length_mm, 104, 112, 'Shaheen Shin chord')
  near(ss.span_mm, 138, 148, 'Shaheen Shin span')
  const cb = byId['crescent-boomerang'].estimate
  near(cb.length_mm, 175, 186, 'Crescent Boomerang length')
  near(cb.span_mm, 140, 162, 'Crescent Boomerang span')
  near(cb.layers_at_nose, 6, 10, 'Crescent Boomerang nose layers')
  const sk = byId['sky-king'].estimate
  near(sk.length_mm, 140, 150, 'Sky King length')
  near(sk.span_mm, 145, 160, 'Sky King span')
  near(sk.sweep_deg, 43, 47, 'Sky King sweep')
  // The distance dart carries far more weight per wing area than the gliders.
  for (const g of [ss, cb, sk]) assert.ok(rd.loading_n_m2 > 4 * g.loading_n_m2)
})

test('creases lie on the sheet and every page fits A4 landscape', () => {
  for (const b of built) {
    for (const c of b.model.creases) for (const p of [c.a, c.b]) assert.ok(p[0] > -0.01 && p[0] < b.model.width + 0.01 && p[1] > -0.01 && p[1] < b.model.height + 0.01, `${b.plane.id} crease off the sheet`)
    const pages = planePages(b)
    for (const page of pages)
      for (const l of page.lines) for (const [x, y] of l.points) assert.ok(x >= 0 && x <= page.width && y >= 0 && y <= page.height, `${b.plane.id}: ${l.id} at ${x},${y}`)
    assert.equal(pdf(pages, b.plane.name).subarray(0, 5).toString(), '%PDF-')
  }
  const ov = overviewPage(built)
  for (const l of ov.lines) for (const [x, y] of l.points) assert.ok(x >= 0 && x <= ov.width && y >= 0 && y <= ov.height)
})

test('each sheet credits its designer and links its tutorial and sources', () => {
  for (const b of built) {
    assert.ok(b.plane.designer.length > 3)
    assert.match(b.plane.tutorial.url, /^https:\/\//)
    assert.ok(b.plane.sources.length >= 1 && b.plane.sources.every((s) => /^https:\/\//.test(s.url)))
    assert.match(b.plane.rights, /derived from the credited design/)
    assert.match(b.plane.rights, /no endorsement/)
  }
})

test('text stays above the footer on every page', () => {
  for (const b of built) for (const page of planePages(b)) for (const l of page.labels) if (!/^Open Flight study sheet/.test(l.text)) assert.ok(l.y < page.height - 10, `${b.plane.id}: "${l.text.slice(0, 40)}" at y ${l.y}`)
})
