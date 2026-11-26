// Local study PDFs for record and championship paper planes: origin, aerodynamics, original step
// diagrams drawn from fold geometry, finished views and the crease pattern. English only while
// the folds are reviewed. Creator designs: credit the designer and keep the tutorial linked; do
// the rights decision is recorded in docs/research/unusual-flyer-sources.md.

import { jsPDF } from 'jspdf'
import { rounded, sha256, type Drawing, type Line } from '../../geometry/butterfly.ts'
import type { PrintLabel } from '../../print-export/sheets.ts'
import { printFonts } from '../../print-export/fonts.ts'
import { brandMark, fontNotice, ink, muted, registerFonts, textMm, useFont, atLeastLine, atLeastText } from '../../../apps/editor/assets/brand/print.js'
import { analyse, type Estimate, type Finish } from './analysis.ts'
import { Model, type P, type Panel } from './engine.ts'
import { colors, creasePattern, fitMap, stepLines, type Box } from './render.ts'

export type Source = { label: string; url: string; says?: string }
export type RecordPlane = {
  id: string
  name: string
  // One line under the name, e.g. "Distance winner, Red Bull Paper Wings 2022".
  claim: string
  designer: string
  paper: 'A4' | 'US_LETTER'
  facts: [string, string][]
  origin: string[]
  // Paragraphs may be computed from the estimate.
  aero: (string | ((e: Estimate) => string))[]
  throwing: string[]
  trim: string[]
  sources: Source[]
  tutorial: Source
  rights: string
  uncertain: string[]
  // Runs the fold steps on the model and returns the stock (just before the body closes) and the finish.
  build: (m: Model) => { stock: Panel[]; finish: Finish }
}

export const sheetSize = { A4: [210, 297] as P, US_LETTER: [215.9, 279.4] as P }
const page: [number, number] = [297, 210]
const gsm = { A4: 80, US_LETTER: 75 }

export type Built = { plane: RecordPlane; model: Model; stock: Panel[]; finish: Finish; estimate: Estimate }

export function buildPlane(plane: RecordPlane): Built {
  const [w, h] = sheetSize[plane.paper]
  const model = new Model(w, h)
  const { stock, finish } = plane.build(model)
  const estimate = analyse(stock, { ...finish, gsm: finish.gsm || gsm[plane.paper] })
  return { plane, model, stock, finish, estimate }
}

function wrap(text: string, limit: number): string[] {
  const out: string[] = []
  let line = ''
  // Hard-break tokens longer than a line (long URLs) so they never run past the margin.
  const words = text.split(' ').flatMap((w) => (w.length <= limit ? [w] : w.match(new RegExp(`.{1,${limit}}`, 'g'))!))
  for (const word of words) {
    const next = line ? line + ' ' + word : word
    if (line && next.length > limit) {
      out.push(line)
      line = word
    } else line = next
  }
  if (line) out.push(line)
  return out
}

type Ctx = { lines: Line[]; labels: PrintLabel[] }
const label = (c: Ctx, x: number, y: number, text: string, size: number, color = ink, font: PrintLabel['font'] = 'text') => c.labels.push({ x, y, text, size, color, font })
function para(c: Ctx, x: number, y: number, text: string, chars: number, size = 2.75, lead = 3.9, color = ink): number {
  for (const part of wrap(text, chars)) {
    label(c, x, y, part, size, color)
    y += lead
  }
  return y + 1.4
}
function header(c: Ctx, b: Built, kicker: string, title: string) {
  const mark = brandMark(9, 6.5)
  c.lines.push(...mark.lines)
  c.labels.push(...(mark.labels as PrintLabel[]))
  label(c, 42, 10, '·  ' + kicker, textMm.min, muted, 'bold')
  label(c, 9, 19, title, textMm.title, ink, 'display')
}
const footer = (c: Ctx, b: Built, n: number) =>
  label(c, 9, page[1] - 7, `Open Flight study sheet · ${b.plane.name} · designed by ${b.plane.designer} · Open Flight’s version, credited to the original · page ${n}`, 2.2, muted)

// Finished views from the estimate: planform, side profile and tail view.
function topView(e: Estimate, box: Box): Line[] {
  const { map } = fitMap([e.planform], box, 1)
  const keelTop: P[] = [
    [-1.2, 0],
    [1.2, 0],
    [1.2, e.length_mm],
    [-1.2, e.length_mm],
  ]
  return [
    { id: 'top-wing', points: e.planform.map(map), closed: true, fill: colors.front, stroke: colors.ink, weight: 0.35 },
    { id: 'top-body', points: keelTop.map(map), closed: true, fill: colors.back, stroke: colors.ink, weight: 0.25 },
  ]
}
function sideView(e: Estimate, box: Box): Line[] {
  // Body below the wing line, nose to the left.
  const body: P[] = [...e.keel.map(([t, d]): P => [t, d]), [e.length_mm, 0], [0, 0]]
  const wingLine: P[] = [
    [Math.min(...e.columns.map((c) => c.le)), -0.6],
    [Math.max(...e.columns.map((c) => c.te)), -0.6],
  ]
  const { map } = fitMap([body, wingLine, [[0, -8]]], box, 1)
  const bal = e.balance_mm
  return [
    { id: 'side-body', points: body.map(map), closed: true, fill: colors.back, stroke: colors.ink, weight: 0.3 },
    { id: 'side-wing', points: wingLine.map(map), stroke: colors.ink, weight: 0.8 },
    { id: 'side-balance', points: [map([bal, -6]), map([bal, -1.5])], stroke: colors.mark, weight: 0.6 },
    { id: 'side-balance-dot', points: circleAt(map([bal, -1.2]), 0.9), closed: true, fill: colors.mark },
  ]
}
function tailView(e: Estimate, finish: Finish, box: Box): Line[] {
  const semi = e.span_mm / 2
  const d = (finish.dihedral_deg * Math.PI) / 180
  const keel = Math.max(...e.keel.map(([, k]) => k))
  const pts: P[] = [
    [-semi, -semi * Math.tan(d)],
    [0, 0],
    [semi, -semi * Math.tan(d)],
  ]
  const { map } = fitMap([pts, [[0, keel], [0, -20]]], box, 1)
  return [
    { id: 'tail-wings', points: pts.map(map), stroke: colors.ink, weight: 0.8 },
    { id: 'tail-keel', points: [map([0, 0]), map([0, keel])], stroke: colors.ink, weight: 1.2 },
  ]
}
const circleAt = (c: P, r: number): P[] => Array.from({ length: 14 }, (_, i): P => [rounded(c[0] + r * Math.cos((i / 14) * 2 * Math.PI)), rounded(c[1] + r * Math.sin((i / 14) * 2 * Math.PI))])

function originPage(b: Built, n: number): Drawing {
  const c: Ctx = { lines: [], labels: [] }
  const { plane, estimate: e } = b
  header(c, b, 'Record and championship planes', plane.name)
  label(c, 9, 25, plane.claim, textMm.body, ink, 'bold')
  let y = 33
  for (const p of plane.origin) y = para(c, 9, y, p, 92)
  y += 1
  for (const [k, v] of plane.facts) {
    label(c, 9, y, k, 2.6, ink, 'bold')
    for (const [i, part] of wrap(v, 60).entries()) label(c, 46, y + i * 3.6, part, 2.6)
    y += 3.6 * wrap(v, 60).length + 0.8
  }
  // Finished views on the right.
  c.lines.push(...topView(e, { x: 172, y: 26, w: 116, h: 92 }))
  label(c, 172, 123, 'Finished, from above', 2.5, muted)
  c.lines.push(...sideView(e, { x: 172, y: 130, w: 70, h: 30 }))
  label(c, 172, 165, 'Side · green: balance point', 2.5, muted)
  c.lines.push(...tailView(e, b.finish, { x: 248, y: 130, w: 40, h: 30 }))
  label(c, 248, 165, 'From the tail', 2.5, muted)
  const rows: [string, string][] = [
    ['Length · span', `${Math.round(e.length_mm)} mm · ${Math.round(e.span_mm)} mm`],
    ['Wing area · aspect ratio', `${e.area_cm2.toFixed(0)} cm² · ${e.aspect_ratio.toFixed(1)}`],
    ['Leading-edge sweep', `${Math.round(e.sweep_deg)}°`],
    ['Paper · mass', `${plane.paper === 'A4' ? 'A4, 80' : 'US Letter, 75'} g/m² · ${e.mass_g.toFixed(1)} g`],
  ]
  let ty = 172
  for (const [k, v] of rows) {
    label(c, 172, ty, k, 2.5, muted)
    label(c, 222, ty, v, 2.5)
    ty += 3.8
  }
  footer(c, b, n)
  return { width: page[0], height: page[1], lines: c.lines, labels: c.labels }
}

function flightPage(b: Built, n: number): Drawing {
  const c: Ctx = { lines: [], labels: [] }
  const { plane, estimate: e } = b
  header(c, b, plane.name, 'Why it flies the way it does')
  let y = 28
  for (const p of plane.aero) y = para(c, 9, y, typeof p === 'function' ? p(e) : p, 100)
  label(c, 9, y + 2, 'How to throw it', textMm.body, ink, 'bold')
  y += 7
  for (const p of plane.throwing) y = para(c, 9, y, '· ' + p, 100)
  label(c, 9, y + 2, 'How to trim it', textMm.body, ink, 'bold')
  y += 7
  for (const p of plane.trim) y = para(c, 9, y, '· ' + p, 100)
  // Estimates on the right.
  const x = 200
  label(c, x, 28, 'Model estimate', textMm.body, ink, 'bold')
  const rows: [string, string][] = [
    ['Balance point', `${Math.round(e.balance_mm)} mm behind the nose`],
    ['Centre of lift', `${Math.round(e.neutral_mm)}–${Math.round(e.area_centroid_mm)} mm behind the nose`],
    ['Static margin', `${Math.round(e.static_margin * 100)}% to ${Math.round(e.static_margin_aft * 100)}% of the mean chord`],
    ['Mean chord', `${Math.round(e.mac_mm)} mm`],
    ['Wing loading', `${e.loading_n_m2.toFixed(1)} N/m²`],
    ['Glide speed', `${e.speed_m_s[0].toFixed(1)}–${e.speed_m_s[1].toFixed(1)} m/s`],
    ['Nose layers', `${e.layers_at_nose} (both sides of the body)`],
  ]
  let ty = 35
  for (const [k, v] of rows) {
    label(c, x, ty, k, 2.5, muted)
    label(c, x + 36, ty, v, 2.5)
    ty += 4.2
  }
  para(c, x, ty + 2, 'Balance from the area of every paper layer; perfect folds, uniform paper. The centre of lift runs from the flat-plate vortex-lattice point to the wing-area centroid, where low-aspect-ratio wings move it at gliding angles. Positive margin means stable in pitch. Glide speed at lift coefficients 0.6 and 0.3. Estimates, not measurements.', 46, 2.4, 3.4, muted)
  footer(c, b, n)
  return { width: page[0], height: page[1], lines: c.lines, labels: c.labels }
}

function stepPages(b: Built, first: number): Drawing[] {
  const steps = b.model.steps
  const per = 6
  const pages: Drawing[] = []
  for (let k = 0; k * per < steps.length; k++) {
    const c: Ctx = { lines: [], labels: [] }
    header(c, b, b.plane.name, k ? 'Folding, continued' : 'Folding')
    for (const [i, s] of steps.slice(k * per, k * per + per).entries()) {
      const col = i % 2,
        row = Math.floor(i / 2)
      const x = 9 + col * 141,
        y = 26 + row * 58
      c.lines.push(...stepLines(s, { x, y, w: 78, h: 50 }))
      label(c, x + 81, y + 4, `${s.n}. ${s.title}`, 3, ink, 'bold')
      let ty = para(c, x + 81, y + 9, s.text, 30, 2.55, 3.5)
      if (s.check) para(c, x + 81, ty, s.check, 30, 2.4, 3.3, muted)
    }
    footer(c, b, first + k)
    pages.push({ width: page[0], height: page[1], lines: c.lines, labels: c.labels })
  }
  return pages
}

function sourcesPage(b: Built, n: number): Drawing {
  const c: Ctx = { lines: [], labels: [] }
  const { plane, model } = b
  header(c, b, plane.name, 'Crease pattern, sources and open questions')
  c.lines.push(...creasePattern(model.width, model.height, model.creases, { x: 9, y: 26, w: 110, h: 118 }))
  let ly = para(c, 9, 149, 'Every crease on the unfolded sheet, printed side up. Dashed: valley. Dash-dot: mountain.', 66, 2.4, 3.4, muted)
  let y = 30
  const x = 128
  label(c, x, y, 'Tutorial', textMm.body, ink, 'bold')
  y = para(c, x, y + 5, plane.tutorial.label, 80, 2.5, 3.5) - 1.4
  y = para(c, x, y, plane.tutorial.url, 86, 2.2, 3.1, muted)
  label(c, x, y + 2, 'Sources', textMm.body, ink, 'bold')
  y += 7
  for (const s of plane.sources) {
    y = para(c, x, y, `${s.label}${s.says ? ': ' + s.says : ''}`, 80, 2.45, 3.4) - 1.4
    y = para(c, x, y, s.url, 86, 2.2, 3.1, muted)
  }
  label(c, x, y + 2, 'Credit and reuse', textMm.body, ink, 'bold')
  y = para(c, x, y + 7, plane.rights, 80, 2.45, 3.4)
  if (plane.uncertain.length) {
    label(c, 9, ly + 2, 'Still to check', textMm.body, ink, 'bold')
    ly += 7
    for (const u of plane.uncertain) ly = para(c, 9, ly, '· ' + u, 68, 2.35, 3.25, muted)
  }
  footer(c, b, n)
  return { width: page[0], height: page[1], lines: c.lines, labels: c.labels }
}

export function planePages(b: Built): Drawing[] {
  const steps = stepPages(b, 3)
  return [originPage(b, 1), flightPage(b, 2), ...steps, sourcesPage(b, 3 + steps.length)]
}

// One page comparing every plane: planforms at the same scale and the key numbers.
export function overviewPage(all: Built[]): Drawing {
  const c: Ctx = { lines: [], labels: [] }
  const mark = brandMark(9, 6.5)
  c.lines.push(...mark.lines)
  c.labels.push(...(mark.labels as PrintLabel[]))
  label(c, 42, 10, '·  Study sheets for the Open Flight versions', textMm.min, muted, 'bold')
  label(c, 9, 19, 'Record and championship paper planes', textMm.title, ink, 'display')
  para(
    c,
    9,
    27,
    'Four planes that won or set records, each folded from one A4 sheet. Drawn below from above at the same scale. The distance plane is almost all body; the airtime and aerobatics planes are almost all wing. Each sheet that follows explains where the plane comes from, why it is shaped that way, and how to fold, throw and trim it.',
    150,
  )
  const scale = 0.37
  const cell = 70
  all.forEach((b, i) => {
    const e = b.estimate
    const x0 = 9 + i * cell + cell / 2
    const y0 = 46
    const map = ([x, y]: P): P => [rounded(x0 + x * scale), rounded(y0 + y * scale)]
    c.lines.push({ id: `ov-${b.plane.id}`, points: e.planform.map(map), closed: true, fill: colors.front, stroke: colors.ink, weight: 0.35 })
    c.lines.push({ id: `ov-body-${b.plane.id}`, points: [map([0, 0]), map([0, e.length_mm])], stroke: colors.ink, weight: 0.6 })
    const by = map([0, e.balance_mm])
    c.lines.push({ id: `ov-bal-${b.plane.id}`, points: circleAt(by, 0.9), closed: true, fill: colors.mark })
    label(c, x0 - cell / 2 + 3, 132, b.plane.name, textMm.body, ink, 'bold')
    let y = para(c, x0 - cell / 2 + 3, 137, b.plane.claim, 40, 2.4, 3.3, muted)
    const rows: [string, string][] = [
      ['Designer', b.plane.designer],
      ['Length, span', `${Math.round(e.length_mm)} mm, ${Math.round(e.span_mm)} mm`],
      ['Wing area', `${e.area_cm2.toFixed(0)} cm²`],
      ['Wing loading', `${e.loading_n_m2.toFixed(1)} N/m²`],
      ['Nose layers', `${e.layers_at_nose}`],
      ['Balance', `${Math.round(e.balance_mm)} mm from nose`],
    ]
    for (const [k, v] of rows) {
      label(c, x0 - cell / 2 + 3, y, k, 2.3, muted)
      for (const [j, part] of wrap(v, 22).entries()) label(c, x0 - cell / 2 + 28, y + j * 3.1, part, 2.3)
      y += 3.3 * Math.max(1, wrap(v, 22).length)
    }
  })
  label(c, 9, 126, 'Green dot: balance point. 5 g of A4 paper each. Estimates for perfect folds, not measurements.', 2.3, muted)
  label(c, 9, page[1] - 7, 'Open Flight study sheets · original designs credited on each sheet · no endorsement', 2.2, muted)
  return { width: page[0], height: page[1], lines: c.lines, labels: c.labels }
}

export function pdf(pages: Drawing[], title: string): Buffer {
  const [w, h] = page
  const doc = new jsPDF({ unit: 'mm', format: [w, h], orientation: 'landscape', compress: true, putOnlyUsedFonts: true, precision: 5 })
  doc.setCreationDate("D:20000101000000+00'00'")
  doc.setFileId(sha256(JSON.stringify(pages.map((p) => p.lines.length))).slice(0, 32))
  doc.setLanguage('en')
  doc.setProperties({ title, author: 'Open Flight contributors', subject: 'Study sheet for an Open Flight version of a credited design. ' + fontNotice })
  registerFonts(doc, printFonts())
  for (const [index, pg] of pages.entries()) {
    if (index) doc.addPage([w, h], 'landscape')
    doc.setLineJoin('round')
    for (const line of pg.lines) {
      if (!line.points.length) continue
      if (line.stroke) doc.setDrawColor(line.stroke)
      if (line.fill) doc.setFillColor(line.fill)
      doc.setLineWidth(line.stroke ? atLeastLine(line.weight) : 0)
      doc.setLineDashPattern(line.dash ?? [], 0)
      doc.path(line.points.map((p, i) => ({ op: i ? 'l' : 'm', c: p })))
      if (line.closed) doc.close()
      if (line.fill && line.stroke) doc.fillStroke()
      else if (line.fill) doc.fill()
      else doc.stroke()
    }
    for (const l of pg.labels as PrintLabel[]) {
      useFont(doc, l.font)
      doc.setFontSize((atLeastText(l.size) * 72) / 25.4)
      doc.setTextColor(l.color ?? ink)
      doc.text(l.text, l.x, l.y)
    }
  }
  return Buffer.from(doc.output('arraybuffer'))
}
