// Finished-plane geometry and first-order estimates from the folded stock.
//
// The stock is the flat, layered model just before the body is folded in half, nose up, with the
// centre crease on x = centre. The wing roots are straight creases; each wing turns about its root
// line, so a point keeps its distance along that line. That gives the flight frame: t runs from
// the nose toward the tail along the root line, s runs outward from it. Every number is an
// estimate for perfect folds and uniform paper.

import { vortexLattice } from '../balance.ts'
import { area, centroid, cross, type P, type Panel } from './engine.ts'

export type Finish = {
  centre: number
  // Left wing root crease, two points in stock coordinates (nose end first).
  root: [P, P]
  // Optional winglet crease on the left wing; paper beyond it stands up.
  winglet?: [P, P]
  dihedral_deg: number
  gsm: number
  clip_g?: number
  // Where a clip would sit, mm behind the nose (if the builder adds one).
  clip_mm?: number
  // Only paper inside this convex outline counts as wing (for flaps that end up wrapped round the
  // body). Mass always counts every layer.
  wingWithin?: P[]
  // Points either side of the centre where the nose layers are counted (default 3 mm off centre,
  // 8 mm behind the tip).
  probes?: P[]
}

export type Estimate = {
  length_mm: number
  span_mm: number
  area_cm2: number
  aspect_ratio: number
  mac_mm: number
  sweep_deg: number
  mass_g: number
  loading_n_m2: number
  balance_mm: number
  neutral_mm: number
  // Wing-area centroid: the aft end of the centre-of-lift range for low-aspect-ratio wings.
  area_centroid_mm: number
  static_margin: number
  static_margin_aft: number
  speed_m_s: [number, number]
  reynolds: [number, number]
  layers_at_nose: number
  planform: P[]
  keel: P[]
  columns: { s: number; le: number; te: number }[]
}

function clipHalf(vs: P[], a: P, b: P, keepSign: number): P[] {
  const out: P[] = []
  for (let i = 0; i < vs.length; i++) {
    const p = vs[i],
      q = vs[(i + 1) % vs.length]
    const dp = keepSign * cross(a, b, p),
      dq = keepSign * cross(a, b, q)
    if (dp >= -1e-9) out.push(p)
    if ((dp > 1e-9 && dq < -1e-9) || (dp < -1e-9 && dq > 1e-9)) {
      const t = dp / (dp - dq)
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t])
    }
  }
  return out.length >= 3 && area(out) > 1e-6 ? out : []
}

function clipConvex(poly: P[], within: P[]): P[] {
  const orient = Math.sign(within.reduce((acc, p, i) => acc + cross(p, within[(i + 1) % within.length], centroid(within)), 0)) || 1
  let out = poly
  for (let i = 0; i < within.length && out.length; i++) out = clipHalf(out, within[i], within[(i + 1) % within.length], orient)
  return out
}

export function analyse(stock: Panel[], f: Finish): Estimate {
  const polys = stock.map((p) => p.vertices.map((v) => v.p))
  const nose = Math.min(...polys.flat().filter(([x]) => Math.abs(x - f.centre) < 1.5).map(([, y]) => y))
  const left = polys.map((poly) => clipHalf(poly, [f.centre, 0], [f.centre, 1], Math.sign(cross([f.centre, 0], [f.centre, 1], [f.centre - 1, 0])))).filter((p) => p.length)
  // Flight frame from the left root line.
  const [r0, r1] = f.root
  const L = Math.hypot(r1[0] - r0[0], r1[1] - r0[1])
  const u: P = [(r1[0] - r0[0]) / L, (r1[1] - r0[1]) / L]
  const out: P = [u[1], -u[0]] // points away from the centre for a left wing with u toward the tail
  const flip = out[0] > 0 ? -1 : 1
  const n: P = [out[0] * flip, out[1] * flip]
  const noseP: P = [f.centre, nose]
  const T = (p: P) => (p[0] - noseP[0]) * u[0] + (p[1] - noseP[1]) * u[1]
  const Sd = (p: P) => (p[0] - r0[0]) * n[0] + (p[1] - r0[1]) * n[1]

  // Mass: every layer of the stock, so asymmetric wraps count where they are.
  let mass = 0,
    moment = 0
  for (const poly of polys) {
    const a = area(poly) * f.gsm * 1e-6
    mass += a
    moment += a * T(centroid(poly))
  }
  const clip = f.clip_g ?? 0
  const balance = (moment + clip * (f.clip_mm ?? 10)) / (mass + clip)

  // Wing columns: intersect each left panel beyond the root (and inside any winglet) with lines s = const.
  const wing = left
    .map((poly) => clipHalf(poly, r0, r1, Math.sign(cross(r0, r1, [r0[0] + n[0], r0[1] + n[1]]))))
    .map((poly) => (poly.length && f.winglet ? clipHalf(poly, f.winglet[0], f.winglet[1], Math.sign(cross(f.winglet[0], f.winglet[1], [r0[0], r0[1]]))) : poly))
    .map((poly) => (poly.length && f.wingWithin ? clipConvex(poly, f.wingWithin) : poly))
    .filter((p) => p.length)
  if (!wing.length) throw new Error('No wing paper beyond the root crease')
  const sMax = Math.max(...wing.flat().map(Sd))
  const N = 120
  const columns: Estimate['columns'] = []
  for (let i = 0; i < N; i++) {
    const s = ((i + 0.5) / N) * sMax
    const ivs: [number, number][] = []
    for (const poly of wing) {
      const ts: number[] = []
      for (let k = 0; k < poly.length; k++) {
        const a = poly[k],
          b = poly[(k + 1) % poly.length]
        const sa = Sd(a) - s,
          sb = Sd(b) - s
        if (sa * sb <= 0 && sa !== sb) {
          const t = sa / (sa - sb)
          ts.push(T([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]))
        }
      }
      if (ts.length >= 2) ivs.push([Math.min(...ts), Math.max(...ts)])
    }
    if (!ivs.length) continue
    columns.push({ s, le: Math.min(...ivs.map((v) => v[0])), te: Math.max(...ivs.map((v) => v[1])) })
  }
  const ds = sMax / N
  const chordArea = columns.reduce((a, c) => a + (c.te - c.le) * ds, 0) * 2
  const mac = (columns.reduce((a, c) => a + (c.te - c.le) ** 2 * ds, 0) * 2) / chordArea
  const semi = columns.at(-1)!.s + ds / 2
  const interp = (key: 'le' | 'te') => (eta: number) => {
    const i = Math.max(0, Math.min(columns.length - 1, Math.round(eta / ds - 0.5)))
    return columns[i][key]
  }
  const lattice = vortexLattice(interp('le'), interp('te'), semi)
  const areaCentroid = columns.reduce((a, c) => a + ((c.le + c.te) / 2) * (c.te - c.le) * ds, 0) / (chordArea / 2)
  const cosD = Math.cos((f.dihedral_deg * Math.PI) / 180)
  const span = 2 * semi * cosD
  const loading = ((mass + clip) * 9.81e-3) / (chordArea * 1e-6)
  const speed = [0.6, 0.3].map((cl) => Math.sqrt((2 * loading) / (1.2 * cl))) as [number, number]
  const re = speed.map((v) => (v * mac * 1e-3) / 1.5e-5) as [number, number]
  // Leading-edge sweep from the first quarter of the span.
  const q = columns[Math.floor(columns.length * 0.75)],
    q0 = columns[Math.floor(columns.length * 0.1)]
  const sweep = (Math.atan2(q.le - q0.le, q.s - q0.s) * 180) / Math.PI
  // Planform outline in flight coordinates (x across, y back), both wings.
  const rightEdge: P[] = columns.map((c) => [c.s, c.le])
  const rightTrail: P[] = columns.map((c): P => [c.s, c.te]).reverse()
  const halfOutline = [...rightEdge, ...rightTrail]
  const planform: P[] = [...halfOutline.map(([x, y]): P => [x, y]), ...halfOutline.map(([x, y]): P => [-x, y]).reverse()]
  // Keel depth along t: distance from the centre line to the root line, where the stock has paper.
  const keel: P[] = []
  const tMax = Math.max(...polys.flat().map(T))
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * tMax
    const pc: P = [noseP[0] + u[0] * t, noseP[1] + u[1] * t]
    keel.push([t, Math.abs(Sd(pc))])
  }
  // Layers through the nose, counted just either side of the centre fold.
  const probes: P[] = f.probes ?? [
    [f.centre - 3, nose + 8],
    [f.centre + 3, nose + 8],
  ]
  const layers = probes
    .map(
      (probe) =>
        stock.filter((p) => {
          const poly = p.vertices.map((v) => v.p)
          const signs = poly.map((q, i) => Math.sign(cross(q, poly[(i + 1) % poly.length], probe)))
          return signs.every((x) => x >= 0) || signs.every((x) => x <= 0)
        }).length,
    )
    .reduce((a, b) => a + b, 0)
  return {
    length_mm: tMax,
    span_mm: span,
    area_cm2: chordArea / 100,
    aspect_ratio: (span * span) / chordArea,
    mac_mm: mac,
    sweep_deg: sweep,
    mass_g: mass,
    loading_n_m2: loading,
    balance_mm: balance,
    neutral_mm: lattice.centre,
    area_centroid_mm: areaCentroid,
    static_margin: (lattice.centre - balance) / mac,
    static_margin_aft: (areaCentroid - balance) / mac,
    speed_m_s: speed,
    reynolds: re,
    layers_at_nose: layers,
    planform,
    keel,
    columns,
  }
}
