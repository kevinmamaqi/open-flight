// Step diagrams for the record planes, drawn as print lines in millimetres.
// Visual language of the Open Flight fold guides: white front, pale blue reverse, amber moving
// flap, red arrow. Earlier creases are drawn on every layer they cross.

import { rounded, type Line } from '../../geometry/butterfly.ts'
import { lineStyle } from '../../../apps/editor/assets/brand/print.js'
import { clipSegment, isometry, type Crease, type Frame, type P, type Panel, type Step } from './engine.ts'

export const colors = {
  front: '#FFFFFF',
  back: '#C5D6E6',
  moving: '#E3A83A',
  arrow: '#A63A21',
  ink: '#1D2731',
  crease: '#8A96A3',
  mark: '#1F7A4D',
}
const valleyDash = lineStyle.valley.dash
const mountainDash = lineStyle.mountain.dash

export type Box = { x: number; y: number; w: number; h: number }
type Map = (p: P) => P

function bounds(groups: P[][]) {
  const pts = groups.flat()
  const xs = pts.map((p) => p[0]),
    ys = pts.map((p) => p[1])
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}
const pts = (panels: Panel[]) => panels.flatMap((p) => p.vertices.map((v) => v.p))

export function fitMap(groups: P[][], box: Box, pad = 2): { map: Map; scale: number } {
  const b = bounds(groups)
  const s = Math.min((box.w - 2 * pad) / Math.max(1, b.x1 - b.x0), (box.h - 2 * pad) / Math.max(1, b.y1 - b.y0))
  const ox = box.x + (box.w - s * (b.x1 - b.x0)) / 2 - s * b.x0
  const oy = box.y + (box.h - s * (b.y1 - b.y0)) / 2 - s * b.y0
  return { map: ([x, y]) => [rounded(ox + s * x), rounded(oy + s * y)], scale: s }
}

// Panels bottom to top, with the creases each one carries.
export function panelLines(panels: Panel[], creases: Crease[], map: Map, id: string, highlight?: (panel: Panel) => boolean): Line[] {
  const out: Line[] = []
  panels.forEach((panel, i) => {
    const poly = panel.vertices.map((v) => map(v.p))
    out.push({ id: `${id}-panel-${i}`, points: poly, closed: true, fill: highlight?.(panel) ? colors.moving : panel.face === 'front' ? colors.front : colors.back, stroke: colors.ink, weight: 0.22 })
    const iso = isometry(panel)
    if (!iso) return
    const sheetPoly = panel.vertices.map((v) => v.o)
    for (const [k, c] of creases.entries()) {
      const seg = clipSegment(c.a, c.b, sheetPoly)
      if (!seg) continue
      // Seen from this layer's visible face.
      const kind = panel.face === 'front' ? c.kind : c.kind === 'valley' ? 'mountain' : 'valley'
      out.push({ id: `${id}-crease-${i}-${k}`, points: seg.map((q) => map(iso(q))), stroke: colors.crease, weight: 0.16, dash: kind === 'valley' ? [1.2, 0.8] : [1.6, 0.6, 0.3, 0.6] })
    }
  })
  return out
}

function arrowHead(id: string, at: P, from: P, size = 1.8): Line {
  const a = Math.atan2(at[1] - from[1], at[0] - from[0])
  const e = (o: number): P => [rounded(at[0] - size * Math.cos(a + o)), rounded(at[1] - size * Math.sin(a + o))]
  return { id, points: [e(0.45), at, e(-0.45)], closed: true, fill: colors.arrow, stroke: colors.arrow, weight: 0.2 }
}

// A curved arrow from p to q, bowing to the left of the direction of travel.
export function curvedArrow(id: string, p: P, q: P, bow = 0.25, mountain = false): Line[] {
  const d: P = [q[0] - p[0], q[1] - p[1]]
  const L = Math.hypot(d[0], d[1])
  if (L < 2) return []
  const n: P = [-d[1] / L, d[0] / L]
  const c: P = [(p[0] + q[0]) / 2 + n[0] * L * bow, (p[1] + q[1]) / 2 + n[1] * L * bow]
  const pts: P[] = Array.from({ length: 17 }, (_, i) => {
    const t = i / 16,
      u = 1 - t
    return [rounded(u * u * p[0] + 2 * u * t * c[0] + t * t * q[0]), rounded(u * u * p[1] + 2 * u * t * c[1] + t * t * q[1])]
  })
  return [{ id, points: pts, stroke: colors.arrow, weight: 0.55, dash: mountain ? [1.2, 0.7] : undefined }, arrowHead(id + '-head', pts.at(-1)!, pts.at(-3)!)]
}

function hingeLine(id: string, hinge: [P, P], within: P[], map: Map, kind: 'valley' | 'mountain'): Line | null {
  // Extend the hinge across the moving paper.
  const [a, b] = hinge
  const d: P = [b[0] - a[0], b[1] - a[1]]
  const L = Math.hypot(d[0], d[1])
  const u: P = [d[0] / L, d[1] / L]
  const ts = within.map((p) => (p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1])
  const near = within.filter((p) => Math.abs((p[0] - a[0]) * u[1] - (p[1] - a[1]) * u[0]) < 0.05)
  const tsNear = near.map((p) => (p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1])
  const span = tsNear.length >= 2 ? tsNear : ts
  const t0 = Math.min(...span) - 3,
    t1 = Math.max(...span) + 3
  const P0: P = [a[0] + u[0] * t0, a[1] + u[1] * t0],
    P1: P = [a[0] + u[0] * t1, a[1] + u[1] * t1]
  return { id, points: [map(P0), map(P1)], stroke: colors.ink, weight: 0.5, dash: kind === 'valley' ? valleyDash : mountainDash }
}

// Before and after views of one step, side by side in the box.
export function stepLines(step: Step, box: Box): Line[] {
  const f: Frame = step.frame
  const gap = 10
  const half: Box = { x: box.x, y: box.y, w: (box.w - gap) / 2, h: box.h }
  const right: Box = { x: box.x + half.w + gap, y: box.y, w: half.w, h: box.h }
  const out: Line[] = []
  const id = `s${step.n}`
  // A common scale for both views so the change in size reads correctly.
  const before = pts(f.before),
    after = pts(f.after)
  const sb = fitMap([before, ...f.moves.map((m) => m.to)], half).scale
  const sa = fitMap([after], right).scale
  const s = Math.min(sb, sa)
  const centred = (groups: P[][], b: Box): Map => {
    const bb = bounds(groups)
    const ox = b.x + (b.w - s * (bb.x1 - bb.x0)) / 2 - s * bb.x0
    const oy = b.y + (b.h - s * (bb.y1 - bb.y0)) / 2 - s * bb.y0
    return ([x, y]) => [rounded(ox + s * x), rounded(oy + s * y)]
  }
  const mb = centred([before, ...(f.view === 'fold' || f.view === 'reopen' ? f.moves.map((m) => m.to) : [])], half)
  const ma = centred([after], right)

  // Before: highlight the paper that moves.
  const movingFrom = f.moves.map((m) => m.from)
  out.push(...panelLines(f.before, f.creasesBefore, mb, id + '-b'))
  for (const [i, poly] of movingFrom.entries()) out.push({ id: `${id}-flap-${i}`, points: poly.map(mb), closed: true, fill: colors.moving, stroke: colors.ink, weight: 0.22 })
  // Redraw creases on top of the shaded flaps so the reader keeps the landmarks.
  for (const g of f.guides) out.push({ id: `${id}-guide-${g.a}`, points: [mb(g.a), mb(g.b)], stroke: colors.mark, weight: 0.4, dash: [0.8, 0.6] })
  const hinges = new Set<string>()
  for (const [i, m] of f.moves.entries()) {
    const key = m.hinge.flat().map((v) => v.toFixed(2)).join(',')
    if (hinges.has(key)) continue
    hinges.add(key)
    const all = f.moves.filter((n) => n.hinge.flat().map((v) => v.toFixed(2)).join(',') === key)
    const h = hingeLine(`${id}-hinge-${i}`, m.hinge, all.flatMap((n) => n.from), mb, m.kind)
    if (h) out.push(h)
    // Arrow from the point that travels furthest.
    let far: { p: P; q: P; d: number } | null = null
    for (const n of all) n.from.forEach((p, k) => {
      const q = n.to[k]
      const d = Math.hypot(q[0] - p[0], q[1] - p[1])
      if (!far || d > far.d) far = { p, q, d }
    })
    if (far) {
      const { p, q } = far as { p: P; q: P }
      const a = mb([p[0] + (q[0] - p[0]) * 0.12, p[1] + (q[1] - p[1]) * 0.12])
      const b = mb([p[0] + (q[0] - p[0]) * 0.85, p[1] + (q[1] - p[1]) * 0.85])
      out.push(...curvedArrow(`${id}-arrow-${i}`, a, b, 0.28, m.kind === 'mountain'))
    }
  }
  for (const [i, mk] of f.marks.entries()) {
    const c = mb(mk.at)
    out.push({ id: `${id}-mark-${i}`, points: circle(c, 0.9), closed: true, fill: colors.mark })
  }
  if (f.view === 'turn') {
    const c: P = [box.x + half.w + gap / 2, box.y + box.h / 2]
    out.push(...curvedArrow(`${id}-turn`, [c[0] - 4, c[1] + 2], [c[0] + 4, c[1] + 2], 0.9))
  } else {
    const c: P = [box.x + half.w + gap / 2, box.y + box.h / 2]
    out.push({ id: `${id}-then`, points: [[c[0] - 3, c[1]], [c[0] + 2, c[1]]], stroke: colors.ink, weight: 0.4 }, arrowHead(`${id}-then-head`, [c[0] + 3.2, c[1]], [c[0], c[1]], 1.4))
  }
  // After.
  out.push(...panelLines(f.after, f.creasesAfter, ma, id + '-a'))
  return out
}

export function circle(c: P, r: number, n = 14): P[] {
  return Array.from({ length: n }, (_, i): P => [rounded(c[0] + r * Math.cos((i / n) * 2 * Math.PI)), rounded(c[1] + r * Math.sin((i / n) * 2 * Math.PI))])
}

// Crease pattern of the whole sheet after the given step (sheet coordinates).
export function creasePattern(width: number, height: number, creases: Crease[], box: Box, upTo = Infinity): Line[] {
  const { map } = fitMap([[[0, 0], [width, height]]], box, 1)
  const out: Line[] = [{ id: 'cp-sheet', points: [map([0, 0]), map([width, 0]), map([width, height]), map([0, height])], closed: true, fill: colors.front, stroke: colors.ink, weight: 0.3 }]
  for (const [i, c] of creases.filter((c) => c.step <= upTo).entries())
    out.push({ id: `cp-${i}`, points: [map(c.a), map(c.b)], stroke: c.kind === 'valley' ? lineStyle.valley.stroke : lineStyle.mountain.stroke, weight: 0.35, dash: c.kind === 'valley' ? valleyDash : mountainDash })
  return out
}
