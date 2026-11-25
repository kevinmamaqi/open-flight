import assert from 'node:assert/strict'
import test from 'node:test'
import { backFaceWords, backKind, printSafeMm, sheetEdges, trimMm } from '../apps/editor/assets/print-faces.js'
import { foldedGeometry, foldedPages, makeFoldedButterfly } from '../packages/folded-butterfly/index.ts'
import { k2BackPage, k2CutPage, k2Flat, makeK2 } from '../packages/folded-butterfly/k2-sheet.ts'
import type { Drawing, Line } from '../packages/geometry/butterfly.ts'

const species = ['monarch', 'morpho', 'swallowtail'] as const
const valley = [0.65, 1.05]
const mountain = [2.8, 0.9, 0.55, 0.9]
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6

// Every fold drawn on the front reappears on the back where it meets the paper from behind:
// x mirrored about the page centre, valley and mountain swapped.
function assertMirroredFolds(front: Drawing, back: Drawing, folds: Line[]) {
  for (const fold of folds) {
    const f = front.lines.find((l) => l.id === fold.id)
    const b = back.lines.find((l) => l.id === fold.id + '-back')
    assert.ok(f && b, `${fold.id} on both faces`)
    f.points.forEach(([x, y], i) => {
      assert.ok(near(b.points[i][0], front.width - x) && near(b.points[i][1], y), `${fold.id} mirrored`)
    })
    const same = (a?: number[], b?: number[]) => JSON.stringify(a) === JSON.stringify(b)
    const swapped = same(f.dash, valley) ? mountain : same(f.dash, mountain) ? valley : f.dash
    assert.deepEqual(b.dash, swapped, `${fold.id} swaps mountain and valley`)
  }
}
function assertCrossesMeet(front: Drawing, back: Drawing) {
  const centres = (d: Drawing) =>
    d.lines.filter((l) => l.id.startsWith('register-h-')).map((l) => (l.points[0][0] + l.points[1][0]) / 2)
  const f = centres(front),
    b = centres(back)
  assert.equal(f.length, 2)
  assert.deepEqual(b.map((x) => Number((front.width - x).toFixed(6))), f.map((x) => Number(x.toFixed(6))))
}
function assertInsideSafeArea(page: Drawing, ignore: (l: Line) => boolean = () => false) {
  for (const line of page.lines)
    if (!ignore(line))
      for (const [x, y] of line.points)
        assert.ok(x >= printSafeMm && x <= page.width - printSafeMm && y >= printSafeMm && y <= page.height - printSafeMm, line.id)
  for (const label of page.labels) assert.ok(label.y <= page.height - printSafeMm - 1, label.text)
}

test('shared print conventions', () => {
  assert.equal(backKind('valley'), 'mountain')
  assert.equal(backKind('mountain'), 'valley')
  assert.equal(backKind('flat'), 'flat')
  assert.deepEqual([...sheetEdges], ['cut', 'whole'])
  assert.ok(trimMm > printSafeMm)
  for (const locale of ['en', 'es', 'ru']) {
    assert.equal(backFaceWords(locale).lines.length, 3)
    assert.notEqual(backFaceWords(locale, true).lines[0], backFaceWords(locale).lines[0])
  }
})

test('K1 prints a mirrored back face with its clip marks and keeps every mark printable', () => {
  for (const s of species)
    for (const paper of ['A4', 'US_LETTER'] as const) {
      const plan = makeFoldedButterfly({ species: s, paper }, 'ru')
      const [front, back, guide] = foldedPages(plan)
      const geometry = foldedGeometry(plan)
      assertMirroredFolds(front, back, [...geometry.creases, ...geometry.clipStops])
      assertCrossesMeet(front, back)
      for (const page of [front, back, guide]) assertInsideSafeArea(page)
    }
})

test('K2 prints a mirrored back face for a short-edge flip', () => {
  for (const s of species)
    for (const paper of ['A4', 'US_LETTER'] as const) {
      const plan = makeK2({ species: s, paper, locale: 'es' })
      const front = k2CutPage(plan),
        back = k2BackPage(plan)
      const flat = k2Flat(plan)
      assertMirroredFolds(front, back, [...flat.creases, ...flat.tabs.filter((t) => t.dash)])
      assertCrossesMeet(front, back)
      assertInsideSafeArea(back)
      assert.ok(back.labels.some((l) => l.text.includes('corto')), 'short-edge flip')
    }
})
