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
  sheetSizes,
} from '../packages/planes/index.ts'
import type { PlaneOptions, PlanePaper, Point } from '../packages/planes/types.ts'

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
function assertPrintReferences(svg: string, drawing: string, width: number, height: number) {
  const toMm = (value: string) => Number(value) * 25.4 / 72
  const border = [[0, 0], [width, 0], [width, height], [0, height], [0, 0]]
  assert.ok(svg.includes('points="' + border.map((point) => point.join(',')).join(' ') + '"'))
  const paths = drawing.match(/^[\d.]+ [\d.]+ m(?:\n[\d.]+ [\d.]+ l){4}\nS$/gm) ?? []
  assert.ok(paths.some((path) => {
    const coords = (path.match(/[\d.]+/g) ?? []).map(toMm)
    return border.every(([x, y], i) =>
      Math.abs(coords[i * 2] - x) < 0.01 && Math.abs(coords[i * 2 + 1] - (height - y)) < 0.01,
    )
  }), 'One continuous path follows the physical paper edges')
  const elbows = Array.from(
    drawing.matchAll(/^([\d.]+) ([\d.]+) m\n([\d.]+) ([\d.]+) l\n([\d.]+) ([\d.]+) l\nS$/gm),
    (match) => match.slice(1).map(toMm),
  )
  for (const x of [0, width]) {
    for (const y of [0, height]) {
      // SVG has a top-left origin. PDF has a bottom-left origin.
      assert.ok(svg.includes(` ${x},${y} `))
      assert.ok(elbows.some(([leftX, leftY, elbowX, elbowY, endX, endY]) =>
        Math.abs(elbowX - x) < 0.01 && Math.abs(elbowY - (height - y)) < 0.01 &&
        leftY === elbowY && endX === elbowX && leftX !== elbowX && endY !== elbowY,
      ), `Missing corner mark at ${x}, ${y} mm`)
    }
  }
  const lines = Array.from(
    drawing.matchAll(/^([\d.]+) ([\d.]+) m\n([\d.]+) ([\d.]+) l\nS$/gm),
    (match) => match.slice(1).map(toMm),
  )
  assert.ok(lines.some(([x1, y1, x2, y2]) =>
    Math.abs(x2 - x1 - 20) < 0.01 && y1 === y2 &&
    y1 >= 15 && y1 < height / 2 && x1 > width / 2 && x2 <= width - 15,
  ), 'The 20 mm scale bar must fit inside the lower-right printable area')
}

const papers: PlanePaper[] = ['A4', 'US_LETTER']
test('every fold preserves every square millimetre and maps its vertices back to the full printable sheet', () => {
  for (const model of planeCatalog)
    for (const paper of papers)
      for (const [keel_mm, winglet_mm] of [
        [12, 0],
        [19, 7],
        [28, 12],
      ]) {
        const plan = makePlane({ model_id: model.model_id, paper, keel_mm, winglet_mm })
        const [w, h] = sheetSizes[paper]
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
        const tailRoots = plan.creases
          .filter((crease) => crease.step === plan.rootStep)
          .flatMap((crease) => crease.line.filter(([, y]) => Math.abs(y - h) < 0.0001).map(([x]) => x))
        assert.deepEqual(
          [...new Set(tailRoots.map((x) => x.toFixed(4)))].sort(),
          [w / 2 - keel_mm, w / 2 + keel_mm].map((x) => x.toFixed(4)).sort(),
        )
        assert.equal(plan.steps.at(-1)?.frame.kind, 'tips')
        close(Math.min(...plan.wingPolygon.map((p) => p[0])), keel_mm + winglet_mm)
        assert.ok(plan.steps.every((s) => s.instruction.length > 45))
      }
})
test('recipes have different real outlines, crease sets, printable source and linked specimens', () => {
  const plans = planeCatalog.map((m) => makePlane({ model_id: m.model_id }))
  assert.equal(new Set(plans.map((p) => JSON.stringify(p.stockOutline))).size, 4)
  assert.equal(new Set(plans.map((p) => JSON.stringify(p.creases))).size, 4)
  for (const plan of plans) {
    const svg = planeSvg(plan)
    assert.ok(svg.includes('<metadata>'))
    for (const url of [
      'https://spdx.org/licenses/CERN-OHL-W-2.0.html',
      'https://creativecommons.org/licenses/by-sa/4.0/',
      'https://kevinmamaqi.github.io/open-flight/references.html',
    ]) {
      assert.ok(svg.includes('href="' + url + '"'))
      assert.ok(planeGuide(plan).includes('href="' + url + '"'))
    }
    assert.match(svg, /width="210mm" height="297mm"/)
    assert.match(svg, /20 mm/)
    assert.match(svg, /stroke-dasharray=/)
    assert.deepEqual(makePlane(JSON.parse(planeSource(plan))).source, plan.source)
    const file = readFileSync(
      new URL('../apps/editor/assets/planes/' + plan.model_id + '.svg', import.meta.url),
      'utf8',
    ).trim()
    assert.equal(planeSpecimen(plan), file)
    assert.match(plan.reference.url, /^https:\/\//)
    const different = makePlane({ ...plan.source, keel_mm: 26, winglet_mm: 0, livery: 'festival' })
    assert.notEqual(planeSvg(different), svg)
    assert.notDeepEqual(different.wingPolygon, plan.wingPolygon)
    assert.ok(different.steps.at(-1)?.instruction.includes('flat'))
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
        close((Number(box[1]) * 25.4) / 72, plan.dimensions.width_mm)
        close((Number(box[2]) * 25.4) / 72, plan.dimensions.height_mm)
        assert.equal(
          (text.match(/\/Type \/Page\b/g) || []).length,
          1 + Math.ceil(plan.steps.length / 3) + (plan.steps.length % 3 === 1 ? 0 : 1),
        )
        const page = (await PDFDocument.load(pdf)).getPage(0)
        const content = page.node.Contents()
        assert.ok(content instanceof PDFRawStream)
        const drawing = Buffer.from(decodePDFRawStream(content).decode()).toString('latin1')
        assertPrintReferences(planeSvg(plan), drawing, plan.dimensions.width_mm, plan.dimensions.height_mm)
        assert.match(text, /\/PrintScaling \/None/)
        assert.match(text, /\/Duplex \/Simplex/)
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
test('unknown formats, paper revisions and invalid dimensions are rejected before export', () => {
  for (const update of [
    { model_id: 'other' },
    { paper: 'A3' },
    { livery: 'unknown' },
    { keel_mm: 11 },
    { keel_mm: 28.1 },
    { winglet_mm: 13 },
    { revision: '2' },
  ]) {
    assert.throws(() => makePlane({ model_id: 'boeing-747', ...update } as PlaneOptions), RangeError)
  }
})
