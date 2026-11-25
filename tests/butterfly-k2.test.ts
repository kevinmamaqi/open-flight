import assert from 'node:assert/strict'
import test from 'node:test'
import { foldedGeometry, makeFoldedButterfly } from '../packages/folded-butterfly/index.ts'
import { estimateFlight, papers } from '../packages/folded-butterfly/k2-airframe.ts'
import { k2BackPage, k2CutPage, k2Flat, k2GuidePage, k2Pdf, makeK2, predict } from '../packages/folded-butterfly/k2-sheet.ts'
import { printSafeMm } from '../apps/editor/assets/print-faces.js'

type P = [number, number]
const species = ['monarch', 'morpho', 'swallowtail'] as const
const spans = [148, 166, 184]

function inside([x, y]: P, poly: P[]) {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i],
      [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}
function reflect([x, y]: P, [a, b]: [P, P]): P {
  const dx = b[0] - a[0],
    dy = b[1] - a[1]
  const t = ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)
  const fx = a[0] + t * dx,
    fy = a[1] + t * dy
  return [2 * fx - x, 2 * fy - y]
}

test('K1 balances behind its neutral point with the clip it asks for', () => {
  for (const s of species) {
    const plan = makeFoldedButterfly({ species: s })
    const g = foldedGeometry(plan)
    const e = estimateFlight({
      top: g.originalOutline as P[],
      flat: g.outline as P[],
      root_x_mm: (6 * plan.span_mm) / 200,
      paper: papers['80'],
      grain_along_span: false,
      clip_g: 0.5,
      clip_center_y: plan.nose_y_mm + plan.clip_station_mm / 2,
    })
    assert.ok(e.static_margin < 0, `${s} K1 margin ${e.static_margin}`)
  }
})

test('K2 balances ahead of its neutral point with two clips on 120 g/m² paper', () => {
  for (const s of species)
    for (const span of spans) {
      const plan = makeK2({ species: s, span_mm: span })
      const two = predict(plan.outline, papers['120'], 1.0)
      assert.ok(two.static_margin > 0.05 && two.static_margin < 0.25, `${s} ${span}: ${two.static_margin}`)
      // One gram or so of clip is enough; K1 needed several grams for the same margin.
      assert.ok(two.clip_needed_g < 1.1, `${s} ${span}: needs ${two.clip_needed_g} g`)
    }
})

test('no forewing tip reaches ahead of the nose', () => {
  for (const s of species) {
    const plan = makeK2({ species: s })
    const o = plan.outline
    const wing = o.top.filter(([x]) => Math.abs(x) > o.root[0] + 10)
    assert.ok(Math.min(...wing.map(([, y]) => y)) > plan.nose_y_mm + 15, s)
  }
})

test('the folded costa strip lands inside its own wing', () => {
  for (const s of species)
    for (const span of spans) {
      const o = makeK2({ species: s, span_mm: span }).outline
      for (const corner of o.hem.right.slice(1, -1)) {
        assert.ok(!inside(corner, o.top), `${s} ${span}: hem corner printed outside the wing`)
        assert.ok(inside(reflect(corner, o.costa), o.top), `${s} ${span}: folded hem leaves the wing`)
      }
    }
})

test('balance dots, clip zone and trim tabs sit on paper', () => {
  for (const s of species) {
    const plan = makeK2({ species: s })
    const flat = k2Flat(plan)
    for (const line of flat.balance.filter((l) => l.id.startsWith('balance-dot')))
      for (const p of line.points) assert.ok(inside(p, flat.outline), `${s} dot off the wing`)
    for (const line of flat.clip) for (const p of line.points) assert.ok(inside(p, flat.outline), `${s} clip zone`)
    for (const line of flat.tabs) assert.ok(inside(line.points[1], flat.outline), `${s} ${line.id}`)
    // The clip zone stops before the wing root so the clips never sit under the wings.
    const back = Math.max(...flat.clip.flatMap((l) => l.points.map(([, y]) => y)))
    assert.ok(back < plan.wing_root_y_mm, s)
  }
})

test('every species, span, paper and language fits its landscape page', () => {
  for (const s of species)
    for (const span of [148, 184])
      for (const paper of ['A4', 'US_LETTER'] as const)
        for (const locale of ['en', 'es', 'ru'] as const) {
          const plan = makeK2({ species: s, span_mm: span, paper, locale })
          for (const page of [k2CutPage(plan), k2BackPage(plan), k2GuidePage(plan)]) {
            assert.ok(page.width > page.height)
            for (const line of page.lines)
              for (const [x, y] of line.points)
                assert.ok(x >= printSafeMm && x <= page.width - printSafeMm && y >= printSafeMm && y <= page.height - printSafeMm, `${s} ${span} ${paper} ${line.id}`)
            for (const label of page.labels) assert.ok(label.y <= page.height - printSafeMm - 1 && label.x >= printSafeMm, `${s} ${label.text}`)
          }
          const cut = k2CutPage(plan)
          const wingBottom = Math.max(...cut.lines.filter((l) => l.id === 'cut').flatMap((l) => l.points.map(([, y]) => y)))
          const strip = cut.lines.find((l) => l.id === 'strip-cut')!
          assert.ok(Math.min(...strip.points.map(([, y]) => y)) > wingBottom, `${s} ${span} ${paper}: strip overlaps wing`)
        }
})

test('the K2 PDF has three landscape pages at actual size: sheet, back and guide', () => {
  const bytes = k2Pdf(makeK2({ species: 'morpho', locale: 'ru' })).toString('latin1')
  const boxes = [...bytes.matchAll(/\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/g)].map((m) => [Number(m[1]), Number(m[2])])
  assert.equal(boxes.length, 3)
  for (const [w, h] of boxes) {
    assert.ok(Math.abs(w - (297 * 72) / 25.4) < 0.5 && Math.abs(h - (210 * 72) / 25.4) < 0.5)
  }
})

test('invalid K2 settings are refused', () => {
  assert.throws(() => makeK2({ span_mm: 147 }))
  assert.throws(() => makeK2({ span_mm: 186 }))
  assert.throws(() => makeK2({ species: 'moth' as never }))
  assert.throws(() => makeK2({ paper: 'A3' as never }))
  assert.throws(() => makeK2({ locale: 'fr' as never }))
})
