// Balance and lift estimates for the four whole-sheet airplanes, computed from the fold geometry.
// The method follows the airplane review of 25 November 2026:
// - Balance point: the area-weighted centroid of every paper layer of the folded stock. The body,
//   wing and tip folds run from nose to tail, so they do not move it. Uniform paper, perfect folds.
// - Paper clips: 0.5 g each, 10 mm behind the nose.
// - Lift range: from the neutral point of a flat-plate vortex lattice (linear theory, small angles)
//   to the centroid of the wing area. At gliding angles, low-aspect-ratio wings gain vortex lift at
//   their side edges, which moves the centre of pressure back towards that centroid. Body, tips and
//   paper flex are ignored.
// Every number here is an estimate. None is a measurement.
import { makePlane } from '../../apps/editor/assets/planes/core.js'
import { keelAt as keelDepth } from '../../apps/editor/assets/planes/geometry.js'
import type { PlaneModelId, PlanePaper, PlanePlan, Point } from './types.ts'

export const balanceMethod = Object.freeze({
  paper_gsm: 80,
  clip_g: 0.5,
  clip_mm: 10,
  dihedral_deg: 8,
  air_density: 1.2,
  kinematic_viscosity: 1.5e-5,
  lift_coefficients: [0.6, 0.3] as const,
  lattice: Object.freeze({ spanwise: 24, chordwise: 12 }),
})
// Plate order: A1 Upper Deck, A2 Prairie Skipper, A3 Tailwind, A4 Delta Comet, then the record planes
// A5 Red Dart, A6 Shaheen Shin, A7 Crescent Boomerang, A8 Sky King.
export const balanceModels: readonly PlaneModelId[] = [
  'boeing-747',
  'douglas-dc3',
  'ilyushin-il62',
  'tupolev-tu144',
  'red-dart',
  'shaheen-shin',
  'crescent-boomerang',
  'sky-king',
]
export const balancePapers: readonly PlanePaper[] = ['A4', 'US_LETTER']

export function polygonArea(points: Point[]): number {
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    const a = points[i],
      b = points[(i + 1) % points.length]
    sum += a[0] * b[1] - b[0] * a[1]
  }
  return Math.abs(sum) / 2
}
export function polygonCentroid(points: Point[]): Point {
  let twice = 0,
    cx = 0,
    cy = 0
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i],
      [x1, y1] = points[(i + 1) % points.length]
    const f = x0 * y1 - x1 * y0
    twice += f
    cx += (x0 + x1) * f
    cy += (y0 + y1) * f
  }
  return [cx / (3 * twice), cy / (3 * twice)]
}
// Where a convex polygon crosses the line x = at (y grows towards the tail): [front, back].
function spanAt(polygon: Point[], at: number, axis: 0 | 1 = 0): [number, number] | null {
  const other = axis === 0 ? 1 : 0
  const hits: number[] = []
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i],
      b = polygon[(i + 1) % polygon.length]
    if (a[axis] === b[axis]) {
      if (a[axis] === at) hits.push(a[other], b[other])
    } else if ((a[axis] - at) * (b[axis] - at) <= 0) {
      hits.push(a[other] + ((at - a[axis]) / (b[axis] - a[axis])) * (b[other] - a[other]))
    }
  }
  return hits.length ? [Math.min(...hits), Math.max(...hits)] : null
}

export interface LatticeResult {
  /** Lift slope per radian for the whole wing. */
  clAlpha: number
  /** Chordwise position of the centre of lift (the neutral point of a flat plate), in planform units. */
  centre: number
  /** All panel circulations share one sign: a sanity check of the solution. */
  consistent: boolean
}

/**
 * Flat-plate vortex lattice for a symmetric planform. `le(eta)` and `te(eta)` give the leading and
 * trailing edge at spanwise distance eta from the root (0 ≤ eta ≤ semiSpan). The chordwise axis
 * points downstream. Horseshoe vortices sit on the quarter chord of each panel with the control
 * point at three quarters; panels use cosine spacing across the span.
 */
export function vortexLattice(
  le: (eta: number) => number,
  te: (eta: number) => number,
  semiSpan: number,
  spanwise: number = balanceMethod.lattice.spanwise,
  chordwise: number = balanceMethod.lattice.chordwise,
): LatticeResult {
  type Panel = { A: Point; B: Point; C: Point; width: number; bound: number }
  const panels: Panel[] = []
  const station = (eta: number, f: number) => le(eta) + (te(eta) - le(eta)) * f
  for (const side of [-1, 1])
    for (let i = 0; i < spanwise; i++) {
      const e0 = (semiSpan * (1 - Math.cos((Math.PI * i) / spanwise))) / 2
      const e1 = (semiSpan * (1 - Math.cos((Math.PI * (i + 1)) / spanwise))) / 2
      const em = (e0 + e1) / 2
      for (let j = 0; j < chordwise; j++) {
        const b0 = station(e0, (j + 0.25) / chordwise),
          b1 = station(e1, (j + 0.25) / chordwise)
        const control = station(em, (j + 0.75) / chordwise)
        // Every bound segment runs left to right, so all horseshoes share one sense.
        const inner: Point = [side * e0, b0],
          outer: Point = [side * e1, b1]
        panels.push({
          A: side < 0 ? outer : inner,
          B: side < 0 ? inner : outer,
          C: [side * em, control],
          width: e1 - e0,
          bound: (b0 + b1) / 2,
        })
      }
    }
  // Normal velocity at P, per unit circulation, from the bound segment A→B (all in one plane).
  function segment(P: Point, A: Point, B: Point): number {
    const r1x = P[0] - A[0],
      r1y = P[1] - A[1],
      r2x = P[0] - B[0],
      r2y = P[1] - B[1]
    const r0x = B[0] - A[0],
      r0y = B[1] - A[1]
    const cross = r1x * r2y - r1y * r2x
    if (Math.abs(cross) < 1e-9) return 0
    const n1 = Math.hypot(r1x, r1y),
      n2 = Math.hypot(r2x, r2y)
    const dot = (r0x * r1x + r0y * r1y) / n1 - (r0x * r2x + r0y * r2y) / n2
    return dot / (4 * Math.PI * cross)
  }
  // Normal velocity at P from a trailing leg that runs from A to infinity downstream.
  function trailing(P: Point, A: Point): number {
    const dx = P[0] - A[0],
      dy = P[1] - A[1]
    if (Math.abs(dx) < 1e-9) return 0
    return (1 + dy / Math.hypot(dx, dy)) / (4 * Math.PI * dx)
  }
  const n = panels.length
  const rows = panels.map((p) => {
    const row = new Float64Array(n + 1)
    panels.forEach((q, k) => {
      row[k] = trailing(p.C, q.A) + segment(p.C, q.A, q.B) - trailing(p.C, q.B)
    })
    row[n] = 1 // unit angle of attack in a unit stream
    return row
  })
  for (let c = 0; c < n; c++) {
    let pivot = c
    for (let r = c + 1; r < n; r++) if (Math.abs(rows[r][c]) > Math.abs(rows[pivot][c])) pivot = r
    ;[rows[c], rows[pivot]] = [rows[pivot], rows[c]]
    const head = rows[c]
    for (let r = c + 1; r < n; r++) {
      const row = rows[r]
      const f = row[c] / head[c]
      if (f === 0) continue
      for (let k = c; k <= n; k++) row[k] -= f * head[k]
    }
  }
  const gamma = new Float64Array(n)
  for (let r = n - 1; r >= 0; r--) {
    let sum = rows[r][n]
    for (let k = r + 1; k < n; k++) sum -= rows[r][k] * gamma[k]
    gamma[r] = sum / rows[r][r]
  }
  let lift = 0,
    moment = 0
  panels.forEach((p, i) => {
    lift += gamma[i] * p.width
    moment += gamma[i] * p.width * p.bound
  })
  let area = 0
  const steps = 400
  for (let k = 0; k < steps; k++) {
    const eta = ((k + 0.5) / steps) * semiSpan
    area += 2 * (te(eta) - le(eta)) * (semiSpan / steps)
  }
  return {
    clAlpha: (2 * Math.abs(lift)) / area,
    centre: moment / lift,
    consistent: gamma.every((g) => Math.sign(g) === Math.sign(gamma[0])),
  }
}

/** A run of equal paper layers along the spine: [from, to, layers], in mm from the nose. */
export type LayerRun = [number, number, number]

export interface AirplaneBalance {
  model_id: PlaneModelId
  paper: PlanePaper
  /** The cut-out sheet that is folded, mm. */
  sheet: [number, number]
  steps: number
  length: number
  span: number
  keel: number
  tips: number
  area_cm2: number
  aspect: number
  mass_g: number
  loading_gm2: number
  rootChord: number
  tipChord: number
  sweep_deg: number
  mac: number
  /** Leading edge of the mean aerodynamic chord, mm from the nose. */
  macLE: number
  /** Balance point with 0, 1 and 2 clips, mm from the nose. */
  balance: [number, number, number]
  /** Estimated range for the centre of lift: lattice neutral point to wing-area centroid. */
  lift: [number, number]
  /** Gliding speed at lift coefficients 0.6 and 0.3, m/s. */
  speed: [number, number]
  reynolds: [number, number]
  /** Height of each wingtip above the body fold at the 3D model's 8° V, mm. */
  tipRise: number
  layers: LayerRun[]
  /** Body depth below the wing, [mm from the nose, depth]. */
  body: Point[]
}

const round = (value: number, digits = 1) => {
  const f = 10 ** digits
  const r = Math.round(value * f) / f
  return Object.is(r, -0) ? 0 : r
}

/** Paper layers just beside the spine, from nose to tail. Slivers under 1 mm, where folded corners
 * meet at the tip of the nose, join the run behind them. */
function layerRuns(plan: PlanePlan, nose: number, length: number): LayerRun[] {
  const x = plan.dimensions.width_mm / 2 - 0.5
  const intervals = plan.stockPanels.map((p) => spanAt(p.polygon, x)).filter((s): s is [number, number] => !!s && s[1] - s[0] > 1e-6)
  const cuts = [...new Set([nose, nose + length, ...intervals.flat()].map((v) => round(v, 6)))]
    .filter((v) => v >= nose - 1e-6 && v <= nose + length + 1e-6)
    .sort((a, b) => a - b)
  const merge = (runs: LayerRun[]) =>
    runs.reduce<LayerRun[]>((out, run) => {
      const last = out.at(-1)
      if (last && last[2] === run[2]) last[1] = run[1]
      else out.push([...run])
      return out
    }, [])
  const raw: LayerRun[] = []
  for (let i = 0; i + 1 < cuts.length; i++) {
    const mid = (cuts[i] + cuts[i + 1]) / 2
    const count = intervals.filter(([a, b]) => a < mid && mid < b).length
    raw.push([round(cuts[i] - nose), round(cuts[i + 1] - nose), count])
  }
  const runs: LayerRun[] = [],
    merged = merge(raw)
  let start: number | null = null
  for (const [i, run] of merged.entries()) {
    if (run[1] - run[0] < 1 && i < merged.length - 1) {
      start ??= run[0]
      continue
    }
    runs.push([start ?? run[0], run[1], run[2]])
    start = null
  }
  return merge(runs)
}

/** Body depth below the wing at each station: the smaller of the body fold and the folded half-width. */
function bodyProfile(plan: PlanePlan, nose: number, length: number): Point[] {
  const outline = plan.stockOutline,
    centre = plan.dimensions.width_mm / 2
  // A slanted root (record planes) makes the body deeper toward the tail.
  const root = plan.root
  const keelAt = (y: number) => (root ? Math.max(0, keelDepth(root, plan.dimensions.width_mm, y)) : plan.keel_mm)
  const keel = Math.max(...outline.map(([, y]) => keelAt(y)))
  const halfWidth = (y: number) => {
    const across = spanAt(outline, y, 1)
    return across ? centre - across[0] : 0
  }
  const ys = new Set<number>([nose, nose + length])
  for (const [, y] of outline) if (y > nose && y < nose + length) ys.add(y)
  for (let i = 0; i < outline.length; i++) {
    const a = outline[i],
      b = outline[(i + 1) % outline.length]
    const ha = centre - a[0],
      hb = centre - b[0]
    if (!root && a[1] !== b[1] && (ha - keel) * (hb - keel) < 0) ys.add(a[1] + ((keel - ha) / (hb - ha)) * (b[1] - a[1]))
  }
  if (root) for (let i = 0; i <= 40; i++) ys.add(nose + (i / 40) * length)
  const points: Point[] = [...ys]
    .sort((a, b) => a - b)
    .map((y) => [round(y - nose), round(Math.max(0, Math.min(keelAt(y), halfWidth(y))))])
  // Keep only the corners.
  return points.filter((p, i) => {
    if (i === 0 || i === points.length - 1) return true
    const [a, b] = [points[i - 1], points[i + 1]]
    return Math.abs((p[0] - a[0]) * (b[1] - a[1]) - (p[1] - a[1]) * (b[0] - a[0])) > 1e-6
  })
}

export function airplaneBalance(model_id: PlaneModelId, paper: PlanePaper = 'A4'): AirplaneBalance {
  const plan = makePlane({ model_id, paper }, 'en')
  if (plan.edge !== 'cut') throw new Error('The estimates assume the default cut-border build')
  const { width_mm: w, height_mm: h } = plan.dimensions
  const m = balanceMethod
  // Balance point of the folded stock.
  let paperArea = 0,
    moment = 0
  for (const panel of plan.stockPanels) {
    const a = polygonArea(panel.polygon)
    paperArea += a
    moment += a * polygonCentroid(panel.polygon)[1]
  }
  if (Math.abs(paperArea - w * h) > 1e-6 * w * h) throw new Error(model_id + ': folded paper does not add up to the sheet')
  const ys = plan.stockOutline.map((p) => p[1])
  const nose = Math.min(...ys),
    tail = Math.max(...ys),
    length = tail - nose
  const balance0 = moment / paperArea - nose
  const mass = ((w * h) / 1e6) * m.paper_gsm
  const withClips = (n: number) => (mass * balance0 + n * m.clip_g * m.clip_mm) / (mass + n * m.clip_g)
  // Wing planform: one half, tips excluded, root at x = w / 2.
  const wing = plan.wingPolygon
  const xs = wing.map((p) => p[0])
  const rootX = Math.max(...xs),
    tipX = Math.min(...xs),
    semi = rootX - tipX
  const S = 2 * polygonArea(wing)
  const chord = (eta: number) => spanAt(wing, Math.min(rootX - 1e-6, Math.max(tipX + 1e-6, rootX - eta)), 0) as [number, number]
  const le = (eta: number) => chord(eta)[0],
    te = (eta: number) => chord(eta)[1]
  let i1 = 0,
    i2 = 0,
    i3 = 0
  const steps = 400
  for (let k = 0; k < steps; k++) {
    const eta = ((k + 0.5) / steps) * semi
    const c = te(eta) - le(eta)
    i1 += c
    i2 += c * c
    i3 += c * le(eta)
  }
  const mac = i2 / i1,
    macLE = i3 / i1
  // A raked, pointed tip can give a few small negative circulations on the default lattice; a finer
  // spanwise grid resolves it (the Crescent Boomerang on US Letter).
  let lattice = vortexLattice(le, te, semi)
  if (!lattice.consistent) lattice = vortexLattice(le, te, semi, 32)
  if (!lattice.consistent) throw new Error(model_id + ': the vortex lattice did not converge to one sign')
  const loading = (mass / 1000) * 9.81 / (S / 1e6)
  const speed = m.lift_coefficients.map((cl) => Math.sqrt((2 * loading) / (m.air_density * cl)))
  return {
    model_id,
    paper,
    sheet: [round(w), round(h)],
    steps: plan.steps.length,
    length: round(length),
    span: round(2 * semi),
    keel: plan.keel_mm,
    tips: plan.winglet_mm,
    area_cm2: round(S / 100),
    aspect: round((4 * semi * semi) / S, 2),
    mass_g: round(mass, 2),
    loading_gm2: Math.round(mass / (S / 1e6)),
    rootChord: round(te(0) - le(0)),
    tipChord: round(te(semi) - le(semi)),
    sweep_deg: round((Math.atan2(le(semi) - le(semi * 0.6), semi * 0.4) * 180) / Math.PI),
    mac: round(mac),
    macLE: round(macLE - nose),
    // Two decimals, so that a value shown in whole millimetres is rounded only once.
    balance: [round(balance0, 2), round(withClips(1), 2), round(withClips(2), 2)],
    lift: [round(lattice.centre - nose, 2), round(polygonCentroid(wing)[1] - nose, 2)],
    speed: [round(speed[0], 2), round(speed[1], 2)],
    reynolds: speed.map((v) => Math.round((v * (mac / 1000)) / m.kinematic_viscosity / 1000) * 1000) as [number, number],
    tipRise: round(semi * Math.sin((m.dihedral_deg * Math.PI) / 180)),
    layers: layerRuns(plan, nose, length),
    body: bodyProfile(plan, nose, length),
  }
}

export function airplaneBalanceTable(): Record<string, Record<string, AirplaneBalance>> {
  return Object.fromEntries(
    balanceModels.map((id) => [id, Object.fromEntries(balancePapers.map((paper) => [paper, airplaneBalance(id, paper)]))]),
  )
}

/** The committed browser module, byte for byte. */
export function airplaneBalanceSource(table = airplaneBalanceTable()): string {
  const lines = [
    '// Generated by scripts/build_airplane_balance.mjs from makePlane() with packages/planes/balance.ts. Do not edit.',
    '// Estimates from the fold geometry, not measurements: revision 2 cut-border build, uniform 80 g/m² paper,',
    '// perfect folds. Clips are 0.5 g each, 10 mm behind the nose. The lift range runs from a flat-plate',
    '// vortex-lattice neutral point to the centroid of the wing area. Lengths in mm from the nose.',
    'export const balanceMethod = ' + JSON.stringify(balanceMethod),
    'export const airplaneBalance = {',
  ]
  for (const [id, papers] of Object.entries(table)) {
    lines.push('  ' + JSON.stringify(id) + ': {')
    for (const [paper, data] of Object.entries(papers)) {
      const { model_id, paper: _paper, ...values } = data
      lines.push('    ' + JSON.stringify(paper) + ': ' + JSON.stringify(values) + ',')
    }
    lines.push('  },')
  }
  lines.push('}', '')
  return lines.join('\n')
}
