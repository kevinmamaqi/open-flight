import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { PDFDocument, PDFRawStream, decodePDFRawStream } from 'pdf-lib'
import {
  makePlane,
  planeCatalog,
  planeGuide,
  planePdf,
  planeSource,
  planeSpecimen,
  planeSvg,
  printSafeMm,
  sheetSizes,
} from '../packages/planes/index.ts'
import type { PlaneOptions, PlanePaper, PlanePlan, Point } from '../packages/planes/types.ts'
import { backScene, sheetScene, stripes } from '../apps/editor/assets/planes/drawing.js'

function polygonArea(polygon: Point[]): number {
  return (
    Math.abs(
      polygon.reduce((sum, [x, y], i) => {
        const next = polygon[(i + 1) % polygon.length]
        return sum + x * next[1] - y * next[0]
      }, 0),
    ) / 2
  )
}
function close(actual: number, expected: number, tolerance = 0.0001) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} differs from ${expected}`)
}
type Part = {
  type: string
  points?: Point[]
  pos?: Point
  radius?: number
  value?: string
  dash?: number[]
  stroke?: string
}
// Office printers leave the outer few millimetres blank. Every guide must sit inside the safe
// area on both faces, except artwork and a labelled winglet fold that lies within the strip.
function assertSafeFace(parts: Part[], plan: PlanePlan, artwork: number) {
  const W = plan.page.width_mm,
    H = plan.page.height_mm,
    d = plan.trim_mm
  // Revision 2 prints a cut border trim_mm inside the paper (further in at the sides when a design
  // needs another paper shape). Revision 1 keeps guides printSafeMm in.
  const [mx, my] = d ? plan.offset_mm ?? [d, d] : [printSafeMm, printSafeMm],
    m = Math.min(mx, my),
    slack = d ? 0.5 : 0.25
  const inside = ([x, y]: Point) => x >= mx - slack && x <= W - mx + slack && y >= my - slack && y <= H - my + slack
  const distances = parts.filter((p) => p.type === 'text' && / mm$/.test(p.value ?? '')).map((p) => p.value)
  for (const part of parts.slice(d ? 0 : artwork)) {
    const points = part.points ?? (part.pos ? [part.pos] : [])
    if (points.every(inside)) continue
    assert.ok(!d, `${plan.model_id} ${plan.paper}: ${part.type} outside the cut border at ${JSON.stringify(points[0])}`)
    const x = points[0][0]
    const winglet = part.type === 'polyline' && points.every((p) => Math.abs(p[0] - x) < 1e-6) && (x < m || x > W - m)
    assert.ok(winglet, `${plan.model_id} ${plan.paper}: ${part.type} outside the printable area at ${JSON.stringify(points[0])}`)
    assert.ok(distances.includes(Number(Math.min(x, W - x).toFixed(1)) + ' mm'), 'Winglet distance label')
  }
  if (d) {
    const border = [[mx, my], [W - mx, my], [W - mx, H - my], [mx, H - my], [mx, my]]
    assert.ok(
      parts.some((p) => p.type === 'polyline' && !p.dash && JSON.stringify(p.points?.map((q) => q.map((v) => Number(v.toFixed(3))))) === JSON.stringify(border.map((q) => q.map((v) => Number(v.toFixed(3)))))),
      'Thick cut border',
    )
    // Every fold that reaches the edge of the folded sheet ends exactly on the cut border.
    const onBorder = ([x, y]: Point) => [x - mx, W - mx - x, y - my, H - my - y].some((v) => Math.abs(v) < 1e-6)
    for (const crease of plan.creases.filter((c) => c.print !== false))
      for (const [x, y] of crease.line) {
        const atEdge = [x, plan.dimensions.width_mm - x, y, plan.dimensions.height_mm - y].some((v) => Math.abs(v) < 1e-6)
        if (!atEdge) continue
        assert.ok(
          parts.some((p) => p.dash && p.points?.some((q) => onBorder(q) && Math.abs(q[1] - (y + my)) < 1e-6 && (Math.abs(q[0] - (x + mx)) < 1e-6 || Math.abs(q[0] - (W - x - mx)) < 1e-6))),
          `${plan.model_id}: fold ends at the cut border`,
        )
      }
  } else {
    for (const [x, y] of [[m, m], [W - m, m], [m, H - m], [W - m, H - m]])
      assert.ok(
        parts.some((p) => p.type === 'polyline' && p.points?.length === 3 && Math.abs(p.points[1][0] - x) < 1e-6 && Math.abs(p.points[1][1] - y) < 1e-6),
        `Missing corner bracket at ${x}, ${y} mm`,
      )
  }
  const numbered = new Set(parts.filter((p) => p.type === 'circle' && p.radius === 2.5).map((p) => p.pos))
  const labels = new Set(parts.filter((p) => p.type === 'text' && /^\d+$/.test(p.value ?? '')).map((p) => Number(p.value)))
  for (const step of plan.steps)
    if (plan.creases.some((c) => c.step === step.index && c.print !== false)) assert.ok(labels.has(step.index + 1), `${plan.model_id}: step ${step.index + 1} has no number on the sheet`)
  assert.ok(numbered.size >= labels.size)
}
function assertMirroredBack(front: Part[], back: Part[], plan: PlanePlan) {
  const w = plan.page.width_mm
  const key = (p: Part, mirror: boolean) =>
    JSON.stringify([
      p.points!.map(([x, y]) => [Number((mirror ? w - x : x).toFixed(2)), Number(y.toFixed(2))]).sort(),
      p.dash!.length === 4 ? (mirror ? 'valley' : 'mountain') : mirror ? 'mountain' : 'valley',
    ])
  const folds = (parts: Part[], mirror: boolean) => parts.filter((p) => p.dash).map((p) => key(p, mirror)).sort()
  assert.deepEqual(folds(back, false), folds(front, true), 'Back folds mirror the front with mountain and valley swapped')
  const crosses = (parts: Part[], mirror: boolean) =>
    parts.filter((p) => p.type === 'circle' && p.radius === 2.1).map((p) => [Number((mirror ? w - p.pos![0] : p.pos![0]).toFixed(2)), p.pos![1]]).sort()
  assert.equal(crosses(front, false).length, 2)
  assert.deepEqual(crosses(back, true), crosses(front, false), 'Registration crosses meet through the paper')
  assert.ok(!back.some((p) => p.type === 'polygon' && p.stroke === 'none' && (p as { fill?: string }).fill !== '#ffffff' && (p.points?.length ?? 0) > 3), 'No artwork on the back')
}
function assertScaleBar(drawing: string, width: number, height: number) {
  const toMm = (value: string) => Number(value) * 25.4 / 72
  const lines = Array.from(
    drawing.matchAll(/^([\d.]+) ([\d.]+) m\n([\d.]+) ([\d.]+) l\nS$/gm),
    (match) => match.slice(1).map(toMm),
  )
  assert.ok(lines.some(([x1, y1, x2, y2]) =>
    Math.abs(x2 - x1 - 50) < 0.01 && y1 === y2 &&
    y1 >= 15 && y1 < height / 2 && x1 > width / 2 && x2 <= width - 15,
  ), 'The 50 mm calibration line must fit inside the lower-right printable area')
}

const papers: PlanePaper[] = ['A4', 'US_LETTER']
// Body depth and tip height to try: the original grid, or a record plane's own range.
type Model = (typeof planeCatalog)[number]
function sizesFor(model: Model, grid: (readonly [number, number])[]): [number, number][] {
  if (!model.keel_range) return grid.map(([k, t]) => [k, t])
  const [k0, k1] = model.keel_range,
    [t0, t1] = model.winglet_range ?? [0, 12]
  const mid = (a: number, b: number) => Math.round((a + b) / 2)
  return [[k0, t0], [mid(k0, k1), mid(t0, t1)], [k1, t1]]
}
test('every fold preserves every square millimetre and maps its vertices back to the full printable sheet', () => {
  for (const model of planeCatalog)
    for (const paper of papers)
      for (const [keel_mm, winglet_mm, revision] of [
        ...sizesFor(model, [[12, 0], [19, 7], [28, 12]]).map(([k, t]) => [k, t, '2'] as const),
        ...sizesFor(model, [[19, 7]]).map(([k, t]) => [k, t, '1'] as const),
      ]) {
        const plan = makePlane({ model_id: model.model_id, paper, keel_mm, winglet_mm, revision })
        // Revision 2 folds the sheet inside the cut border; revision 1 folds the whole paper.
        const [w, h] = revision === '1' ? sheetSizes[paper] : [plan.dimensions.width_mm, plan.dimensions.height_mm]
        for (const { frame } of plan.steps) {
          for (const layers of [frame.before, frame.panels]) {
            close(
              layers.reduce((sum, p) => sum + polygonArea(p.polygon), 0),
              w * h,
            )
            for (const layer of layers) {
              assert.equal(layer.original.length, layer.polygon.length)
              close(polygonArea(layer.original), polygonArea(layer.polygon))
              assert.ok(
                layer.original.every(
                  ([x, y]) => x >= -0.0001 && y >= -0.0001 && x <= w + 0.0001 && y <= h + 0.0001,
                ),
              )
            }
          }
          for (const move of frame.moves) {
            assert.equal(move.original.length, move.from.length)
            close(polygonArea(move.from), polygonArea(move.to))
          }
        }
        assert.ok(
          plan.creases.every((c) =>
            c.line.every(([x, y]) => x >= -0.0001 && y >= -0.0001 && x <= w + 0.0001 && y <= h + 0.0001),
          ),
        )
        assert.equal(plan.steps.at(-2)?.frame.kind, 'wings')
        // The wing roots reach the tail keel_mm either side of the centre (a slanted root starts
        // shallower at the nose).
        // Record planes fold the wings through many layers, so read the hinge on the folded stock.
        const rootEnds = plan.root
          ? plan.steps[plan.rootStep].frame.hinges.map(([p, q]) => (p[1] > q[1] ? p : q))
          : plan.creases.filter((crease) => crease.step === plan.rootStep).flatMap((crease) => crease.line)
        const tail = Math.max(...rootEnds.map(([, y]) => y))
        const tailRoots = rootEnds.filter(([, y]) => Math.abs(y - tail) < 0.0001).map(([x]) => x)
        assert.deepEqual(
          [...new Set(tailRoots.map((x) => x.toFixed(4)))].sort(),
          [w / 2 - keel_mm, w / 2 + keel_mm].map((x) => x.toFixed(4)).sort(),
        )
        assert.equal(plan.steps.at(-1)?.frame.kind, 'tips')
        if (!plan.root) close(Math.min(...plan.wingPolygon.map((p) => p[0])), keel_mm + winglet_mm)
        else assert.ok(Math.min(...plan.wingPolygon.map((p) => p[0])) >= winglet_mm)
        assert.ok(plan.steps.every((s) => s.instruction.length > 45))
      }
})
test('recipes have different real outlines, crease sets, printable source and linked specimens', () => {
  const plans = planeCatalog.map((m) => makePlane({ model_id: m.model_id }))
  assert.equal(new Set(plans.map((p) => JSON.stringify(p.stockOutline))).size, planeCatalog.length)
  assert.equal(new Set(plans.map((p) => JSON.stringify(p.creases))).size, planeCatalog.length)
  for (const plan of plans) {
    const svg = planeSvg(plan)
    assert.ok(svg.includes('<metadata>'))
    // A record plane links its fold credit to the tutorial of the original it is derived from.
    for (const url of [
      plan.designer ? plan.reference.url : 'https://spdx.org/licenses/CERN-OHL-W-2.0.html',
      'https://creativecommons.org/licenses/by-sa/4.0/',
      'https://openflight.design/references',
    ]) {
      assert.ok(svg.includes('href="' + url + '"'))
      assert.ok(planeGuide(plan).includes('href="' + url + '"'))
    }
    assert.match(svg, /width="210mm" height="297mm"/)
    assert.match(svg, /50 mm/)
    assert.match(svg, /stroke-dasharray=/)
    assert.deepEqual(makePlane(JSON.parse(planeSource(plan))).source, plan.source)
    assert.match(plan.reference.url, /^https:\/\//)
    const model = planeCatalog.find((m) => m.model_id === plan.model_id)!
    const [, deepest] = model.keel_range ?? [12, 28]
    const [flattest] = model.winglet_range ?? [0, 12]
    const different = makePlane({ ...plan.source, keel_mm: Math.min(26, deepest), winglet_mm: flattest, livery: 'festival' })
    assert.notEqual(planeSvg(different), svg)
    assert.notDeepEqual(different.wingPolygon, plan.wingPolygon)
    if (!plan.designer) assert.ok(different.steps.at(-1)?.instruction.includes('flat'))
    else {
      assert.ok(svg.includes(plan.original!) && svg.includes(plan.designer.en))
      assert.ok(planeGuide(plan).includes(plan.rights!))
    }
  }
})
// Node/V8 generated the original SVGs. JavaScriptCore clips a degenerate polygon
// differently in the Tu-144 preview, so verify the published bytes with Node.
test('checked-in airplane specimens match the original Node renderer', { skip: Boolean(process.versions.bun) }, () => {
  for (const { model_id } of planeCatalog) {
    const plan = makePlane({ model_id })
    const file = readFileSync(
      new URL('../apps/editor/assets/planes/' + plan.model_id + '.svg', import.meta.url),
      'utf8',
    ).trim()
    assert.equal(planeSpecimen(plan), file)
  }
})
test('a 100% physical sheet and trilingual illustrated guides export deterministically in both paper formats', async () => {
  for (const model of planeCatalog)
    for (const paper of papers)
      for (const locale of ['en', 'ru', 'es'] as const) {
        const plan = makePlane({ model_id: model.model_id, paper }, locale)
        const pdf = planePdf(plan),
          text = pdf.toString('latin1')
        assert.equal(text.slice(0, 5), '%PDF-')
        const box = /\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/.exec(text)
        assert.ok(box)
        close((Number(box[1]) * 25.4) / 72, plan.page.width_mm)
        close((Number(box[2]) * 25.4) / 72, plan.page.height_mm)
        assert.equal(
          (text.match(/\/Type \/Page\b/g) || []).length,
          // A record plane's notebook (history and credits) always has its own page.
          2 + Math.ceil(plan.steps.length / 3) + (plan.steps.length % 3 === 1 && !plan.rights ? 0 : 1),
        )
        const page = (await PDFDocument.load(pdf)).getPage(0)
        const content = page.node.Contents()
        assert.ok(content instanceof PDFRawStream)
        const drawing = Buffer.from(decodePDFRawStream(content).decode()).toString('latin1')
        assertScaleBar(drawing, plan.page.width_mm, plan.page.height_mm)
        assert.match(text, /\/PrintScaling \/None/)
        assert.match(text, /\/Duplex \/DuplexFlipLongEdge/)
        const guide = planeGuide(plan)
        assert.match(guide, new RegExp('<html lang="' + locale + '">'))
        assert.equal((guide.match(/<article>/g) || []).length, plan.steps.length)
        assert.equal((guide.match(/<svg\b/g) || []).length, plan.steps.length + 1)
        assert.ok(guide.includes(plan.reference.url))
        assert.ok(guide.includes(plan.field.museum.url))
        assert.ok(plan.steps[plan.field.step])
        assert.ok(!guide.includes('<script'))
        assert.match(guide, /<img[^>]+src="data:image\/jpeg;base64,/)
        assert.doesNotMatch(guide, /src="https?:/)
        assert.match(text, /\/Subtype \/Image/)
        assert.ok(text.includes('/Lang (' + locale + ')'))
        if (locale === 'ru') assert.ok(guide.includes('Сгиб') || guide.includes('сгиб'))
        if (locale === 'es') {
          assert.match(guide, /DOBLA/)
          assert.match(guide, /tamaño real/)
          assert.match(planeSvg(plan), /xml:lang="es"/)
          assert.match(planeSvg(plan), /Cara impresa/)
          const english = makePlane(plan.source)
          assert.notEqual(plan.steps[0].instruction, english.steps[0].instruction)
          assert.deepEqual(
            plan.steps.map(({ frame }) => frame),
            english.steps.map(({ frame }) => frame),
          )
        }
      }
  const p = makePlane({ model_id: 'douglas-dc3' })
  assert.deepEqual(planePdf(p), planePdf(p))
})
test('every guide prints inside office-printer margins on both faces, and the back mirrors the front', () => {
  for (const model of planeCatalog)
    for (const paper of papers)
      for (const [keel_mm, winglet_mm] of sizesFor(model, [[12, 0], [20, 4], [28, 12], [16, 6]]))
        for (const livery of ['heritage', 'airshow'] as const)
        for (const sheet of [{ revision: '1' }, { revision: '2', edge: 'cut' }, { revision: '2', edge: 'whole' }] as const) {
          const plan = makePlane({ model_id: model.model_id, paper, keel_mm, winglet_mm, livery, ...sheet }) as PlanePlan
          const front = sheetScene(plan) as Part[],
            back = backScene(plan) as Part[]
          assertSafeFace(front, plan, stripes(plan).length)
          assertSafeFace(back, plan, 0)
          assertMirroredBack(front, back, plan)
        }
})
test('revision 2 folds the cut-out sheet by default, offers the whole sheet, and saved revision 1 designs still open', () => {
  for (const paper of papers) {
    const current = makePlane({ model_id: 'boeing-747', paper })
    assert.equal(current.revision, '2')
    assert.equal(current.trim_mm, 7)
    close(current.dimensions.width_mm, current.page.width_mm - 14)
    close(current.dimensions.height_mm, current.page.height_mm - 14)
    assert.match(current.steps[0].instruction, /^Cut out the sheet along the thick border/)
    const saved = makePlane({ model_id: 'boeing-747', paper, revision: '1' })
    assert.equal(saved.trim_mm, 0)
    assert.deepEqual(saved.page, saved.dimensions)
    assert.deepEqual(makePlane(JSON.parse(planeSource(saved))).source, saved.source)
    assert.notDeepEqual(saved.creases, current.creases)
    // Revision 2 with a whole-sheet edge folds exactly what revision 1 folds.
    const whole = makePlane({ model_id: 'boeing-747', paper, edge: 'whole' })
    assert.equal(whole.trim_mm, 0)
    assert.equal(whole.source.edge, 'whole')
    assert.deepEqual(whole.creases, saved.creases)
    assert.equal(current.source.edge, 'cut')
    assert.equal('edge' in saved.source, false)
    assert.deepEqual(makePlane(JSON.parse(planeSource(whole))).source, whole.source)
  }
  assert.throws(() => makePlane({ model_id: 'boeing-747', revision: '1', edge: 'cut' }), /whole sheet/)
  assert.throws(() => makePlane({ model_id: 'boeing-747', edge: 'borderless' as never }), /sheet edge/)
})
test('unknown formats, paper revisions and invalid dimensions are rejected before export', () => {
  for (const update of [
    { model_id: 'other' },
    { paper: 'A3' },
    { livery: 'unknown' },
    { keel_mm: 11 },
    { keel_mm: 28.1 },
    { winglet_mm: 13 },
    { revision: '3' },
  ]) {
    assert.throws(() => makePlane({ model_id: 'boeing-747', ...update } as PlaneOptions), RangeError)
  }
})

test('the Needle prints only its marking folds and keeps its A4 shape on US Letter', () => {
  for (const paper of papers)
    for (const edge of ['cut', 'whole'] as const) {
      const plan = makePlane({ model_id: 'red-dart', paper, edge })
      // Folds through the wrapped body cross every layer; none of them belongs on the template.
      const printed = plan.creases.filter((c) => c.print !== false)
      assert.ok(printed.every((c) => c.step <= 3), `${paper} ${edge}: body or wing crease printed`)
      assert.ok(printed.length <= 16, `${paper} ${edge}: ${printed.length} printed creases`)
      const { width_mm: w, height_mm: h } = plan.dimensions
      if (paper === 'US_LETTER') {
        close(h / w, Math.SQRT2, 0.001)
        assert.equal(plan.trim_mm, 7)
        assert.ok(plan.offset_mm && plan.offset_mm[0] > plan.offset_mm[1])
      } else assert.equal(plan.offset_mm, undefined)
    }
})
