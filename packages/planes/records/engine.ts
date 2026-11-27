// Flat-folding engine for the record-plane diagrams.
//
// The paper is a stack of convex panels, bottom to top. Every vertex keeps its position on the
// table (p) and on the untouched sheet (o). A fold splits each selected panel by a straight line
// and reflects the part on one side. Valley folds lay the flap on top of the stack, mountain folds
// tuck it underneath. Because every panel is an isometric image of part of the sheet, each crease
// can be drawn on whichever layers it crosses, and the crease pattern comes out in sheet
// coordinates. Non-flat moves (reverse folds, tucks) are modelled by the flat result they leave.

import { cross } from '../../geometry/polygon.ts'

export { cross }

export type P = [number, number]
export type Vertex = { p: P; o: P }
export type Face = 'front' | 'back'
export type Panel = { face: Face; tags: string[]; vertices: Vertex[] }
export type Kind = 'valley' | 'mountain'
export type Crease = { a: P; b: P; kind: Kind; step: number }
export type Move = { from: P[]; to: P[]; hinge: [P, P]; kind: Kind }
export type Frame = {
  view: 'fold' | 'reopen' | 'turn' | 'rotate' | 'action'
  before: Panel[]
  after: Panel[]
  moves: Move[]
  hinges: [P, P][]
  creasesBefore: Crease[]
  creasesAfter: Crease[]
  // Optional marks the builder measures, drawn on the "before" view.
  marks: { at: P; label: string }[]
  guides: { a: P; b: P; label?: string }[]
}
export type Step = { n: number; title: string; text: string; check?: string; frame: Frame }

const eps = 1e-7
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]]
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]]
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k]
const dot = (a: P, b: P) => a[0] * b[0] + a[1] * b[1]
const len = (a: P) => Math.hypot(a[0], a[1])
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
export const area = (pts: P[]) => Math.abs(pts.reduce((s, a, i) => s + a[0] * pts[(i + 1) % pts.length][1] - a[1] * pts[(i + 1) % pts.length][0], 0) / 2)
export function centroid(pts: P[]): P {
  let A = 0,
    cx = 0,
    cy = 0
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i],
      [x1, y1] = pts[(i + 1) % pts.length]
    const f = x0 * y1 - x1 * y0
    A += f
    cx += (x0 + x1) * f
    cy += (y0 + y1) * f
  }
  return [cx / (3 * A), cy / (3 * A)]
}

export function reflect(p: P, [a, b]: [P, P]): P {
  const d = sub(b, a)
  const t = dot(sub(p, a), d) / dot(d, d)
  const f = add(a, mul(d, t))
  return [2 * f[0] - p[0], 2 * f[1] - p[1]]
}

// Keep the part of a convex polygon where sign * cross(line, p) >= 0.
function clip(vs: Vertex[], line: [P, P], sign: number): Vertex[] {
  const out: Vertex[] = []
  for (let i = 0; i < vs.length; i++) {
    const a = vs[i],
      b = vs[(i + 1) % vs.length]
    const da = sign * cross(line[0], line[1], a.p),
      db = sign * cross(line[0], line[1], b.p)
    if (da >= -eps) out.push(a)
    if ((da > eps && db < -eps) || (da < -eps && db > eps)) {
      const t = da / (da - db)
      out.push({ p: lerp(a.p, b.p, t), o: lerp(a.o, b.o, t) })
    }
  }
  return out.length >= 3 && area(out.map((v) => v.p)) > 1e-4 ? out : []
}

// Line helpers. All return two points on the crease in current table coordinates.
export const line = {
  through: (a: P, b: P): [P, P] => [a, b],
  // The crease that lays point a onto point b: their perpendicular bisector.
  pointOnto(a: P, b: P): [P, P] {
    const m = lerp(a, b, 0.5)
    const d = sub(b, a)
    return [m, add(m, [-d[1], d[0]])]
  },
  // The crease through pivot that lays the ray pivot->a onto the ray pivot->b (angle bisector).
  rayOnto(pivot: P, a: P, b: P): [P, P] {
    const u = sub(a, pivot),
      v = sub(b, pivot)
    const w = add(mul(u, 1 / len(u)), mul(v, 1 / len(v)))
    return [pivot, add(pivot, w)]
  },
  vertical: (x: number): [P, P] => [
    [x, 0],
    [x, 1],
  ],
  horizontal: (y: number): [P, P] => [
    [0, y],
    [1, y],
  ],
}

export class Model {
  panels: Panel[]
  creases: Crease[] = []
  steps: Step[] = []
  readonly width: number
  readonly height: number
  private pendingMarks: Frame['marks'] = []
  private pendingGuides: Frame['guides'] = []

  constructor(width: number, height: number, face: Face = 'front') {
    this.width = width
    this.height = height
    const corners: P[] = [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ]
    this.panels = [{ face, tags: ['sheet'], vertices: corners.map((p) => ({ p, o: p })) }]
  }

  clone(): Panel[] {
    return this.panels.map((p) => ({ face: p.face, tags: [...p.tags], vertices: p.vertices.map((v) => ({ p: [...v.p] as P, o: [...v.o] as P })) }))
  }

  bbox(panels = this.panels) {
    const pts = panels.flatMap((p) => p.vertices.map((v) => v.p))
    const xs = pts.map((p) => p[0]),
      ys = pts.map((p) => p[1])
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
  }

  // Position on the table of a point given in original sheet coordinates, read from the topmost
  // panel that contains it.
  where(o: P): P {
    for (let i = this.panels.length - 1; i >= 0; i--) {
      const panel = this.panels[i]
      const map = isometry(panel)
      if (map && insideConvex(o, panel.vertices.map((v) => v.o))) return map(o)
    }
    throw new Error(`Sheet point ${o} is not on any panel`)
  }

  // Fold the selected panels across `crease`, moving the side that contains `toward`.
  fold(crease: [P, P], toward: P, opts: { select?: (panel: Panel, index: number) => boolean; kind?: Kind; tag?: string } = {}): Move[] {
    const kind = opts.kind ?? 'valley'
    const sign = Math.sign(cross(crease[0], crease[1], toward))
    if (!sign) throw new Error('The point that shows which side moves lies on the crease')
    const fixed: Panel[] = [],
      moving: Panel[] = [],
      moves: Move[] = []
    this.panels.forEach((panel, i) => {
      if (opts.select && !opts.select(panel, i)) {
        fixed.push(panel)
        return
      }
      const stay = clip(panel.vertices, crease, -sign)
      const flap = clip(panel.vertices, crease, sign)
      if (stay.length) fixed.push({ ...panel, vertices: stay })
      if (!flap.length) return
      const to = flap.map((v) => ({ p: reflect(v.p, crease), o: v.o }))
      moving.push({ face: panel.face === 'front' ? 'back' : 'front', tags: opts.tag ? [...panel.tags, opts.tag] : [...panel.tags], vertices: to })
      moves.push({ from: flap.map((v) => v.p), to: to.map((v) => v.p), hinge: crease, kind })
      // The crease on the sheet, if this panel was actually bent here.
      const onHinge = flap.filter((v) => Math.abs(cross(crease[0], crease[1], v.p)) < 1e-4)
      if (stay.length && onHinge.length >= 2) {
        const os = onHinge.map((v) => v.o)
        let best: [P, P] = [os[0], os[1]]
        for (const a of os) for (const b of os) if (len(sub(a, b)) > len(sub(best[0], best[1]))) best = [a, b]
        // Seen from the printed (front) side of the sheet.
        const seen: Kind = panel.face === 'front' ? kind : kind === 'valley' ? 'mountain' : 'valley'
        if (len(sub(best[0], best[1])) > 0.05) this.creases.push({ a: best[0], b: best[1], kind: seen, step: this.steps.length + 1 })
      }
    })
    if (!moves.length) throw new Error('This fold moves no paper')
    const flipped = moving.reverse()
    this.panels = kind === 'valley' ? [...fixed, ...flipped] : [...flipped, ...fixed]
    return moves
  }

  // Turn the whole model over, left to right (about a vertical axis through its middle).
  turnOver(axis: 'vertical' | 'horizontal' = 'vertical') {
    const b = this.bbox()
    const c: P = [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2]
    const m = axis === 'vertical' ? ([x, y]: P): P => [2 * c[0] - x, y] : ([x, y]: P): P => [x, 2 * c[1] - y]
    this.panels = this.panels
      .map((p) => ({ ...p, face: (p.face === 'front' ? 'back' : 'front') as Face, vertices: p.vertices.map((v) => ({ p: m(v.p), o: v.o })).reverse() }))
      .reverse()
  }

  rotate(deg: number, about?: P) {
    const b = this.bbox()
    const c = about ?? [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2]
    const a = (deg * Math.PI) / 180
    const r = ([x, y]: P): P => {
      const dx = x - c[0],
        dy = y - c[1]
      return [c[0] + dx * Math.cos(a) - dy * Math.sin(a), c[1] + dx * Math.sin(a) + dy * Math.cos(a)]
    }
    this.panels = this.panels.map((p) => ({ ...p, vertices: p.vertices.map((v) => ({ p: r(v.p), o: v.o })) }))
  }

  // Move the model so its bounding box starts at the origin (keeps diagrams tidy).
  normalise() {
    const b = this.bbox()
    this.panels = this.panels.map((p) => ({ ...p, vertices: p.vertices.map((v) => ({ p: [v.p[0] - b.x0, v.p[1] - b.y0] as P, o: v.o })) }))
  }

  mark(at: P, label: string) {
    this.pendingMarks.push({ at, label })
  }
  guide(a: P, b: P, label?: string) {
    this.pendingGuides.push({ a, b, label })
  }

  // Record one builder step. `act` performs folds and other moves on this model.
  step(title: string, text: string, act: (m: Model) => Move[] | void, opts: { reopen?: boolean; view?: Frame['view']; check?: string } = {}) {
    const before = this.clone()
    const creasesBefore = [...this.creases]
    const result = act(this)
    const moves = Array.isArray(result) ? result : []
    const after = this.clone()
    if (opts.reopen) this.panels = before.map((p) => ({ ...p }))
    const view = opts.view ?? (opts.reopen ? 'reopen' : 'fold')
    this.steps.push({
      n: this.steps.length + 1,
      title,
      text,
      check: opts.check,
      frame: {
        view,
        before,
        after: opts.reopen ? this.clone() : after,
        moves,
        hinges: moves.map((m) => m.hinge),
        creasesBefore,
        creasesAfter: [...this.creases],
        marks: this.pendingMarks,
        guides: this.pendingGuides,
      },
    })
    if (opts.reopen) this.steps.at(-1)!.frame.after = this.clone()
    this.pendingMarks = []
    this.pendingGuides = []
  }
}

// The rigid map from sheet coordinates to table coordinates for one panel: express the point in a
// frame built on two vertices of the sheet, then rebuild it in the same frame on the table. A
// panel turned over an odd number of times is mirrored, so its normal flips.
export function isometry(panel: Panel): ((o: P) => P) | null {
  const vs = panel.vertices
  let best: [Vertex, Vertex] | null = null
  for (const a of vs) for (const b of vs) if (!best || len(sub(b.o, a.o)) > len(sub(best[1].o, best[0].o))) best = [a, b]
  if (!best || len(sub(best[1].o, best[0].o)) < 1e-6) return null
  const [i, j] = best
  // The vertex furthest from that edge fixes the handedness; thin slivers still have one.
  const k = vs.reduce((a, v) => (Math.abs(cross(i.o, j.o, v.o)) > Math.abs(cross(i.o, j.o, a.o)) ? v : a), vs[0])
  if (Math.abs(cross(i.o, j.o, k.o)) < 1e-9) return null
  const mirror = Math.sign(cross(i.o, j.o, k.o)) !== Math.sign(cross(i.p, j.p, k.p))
  const uo = mul(sub(j.o, i.o), 1 / len(sub(j.o, i.o)))
  const no: P = [-uo[1], uo[0]]
  const up = mul(sub(j.p, i.p), 1 / len(sub(j.p, i.p)))
  const np: P = mirror ? [up[1], -up[0]] : [-up[1], up[0]]
  return (o: P): P => {
    const d = sub(o, i.o)
    return add(i.p, add(mul(up, dot(d, uo)), mul(np, dot(d, no))))
  }
}

export function insideConvex(p: P, poly: P[]): boolean {
  let sign = 0
  for (let i = 0; i < poly.length; i++) {
    const c = cross(poly[i], poly[(i + 1) % poly.length], p)
    if (Math.abs(c) < 1e-6) continue
    const s = Math.sign(c)
    if (!sign) sign = s
    else if (s !== sign) return false
  }
  return true
}

// Clip a segment (in sheet coordinates) to a convex polygon (in sheet coordinates).
export function clipSegment(a: P, b: P, poly: P[]): [P, P] | null {
  let t0 = 0,
    t1 = 1
  const d = sub(b, a)
  const orient = Math.sign(poly.reduce((s, p, i) => s + cross(p, poly[(i + 1) % poly.length], centroid(poly)), 0)) || 1
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i],
      q = poly[(i + 1) % poly.length]
    const fa = orient * cross(p, q, a),
      fd = orient * (cross(p, q, b) - cross(p, q, a))
    if (Math.abs(fd) < 1e-12) {
      if (fa < -1e-9) return null
      continue
    }
    const t = -fa / fd
    if (fd > 0) t0 = Math.max(t0, t)
    else t1 = Math.min(t1, t)
    if (t0 > t1) return null
  }
  if (t1 - t0 < 1e-6) return null
  return [lerp(a, b, t0), lerp(a, b, t1)]
}
