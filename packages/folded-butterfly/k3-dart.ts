// K3 "dart" butterfly: the folded butterfly construction for all three species.
//
// K2 reaches a positive static margin by holding the clips on a 24 mm antenna stick ahead of
// the wings. It works on paper, but it reads as a lollipop rather than a butterfly. K3 gets the
// same lever from the wing shape instead, the way a paper dart does:
//   1. Pose: each real wing keeps its species outline and markings but is swung back rigidly
//      about its own root. The forewing slides back over the hindwing, so the planform becomes
//      an arrowhead and the lifting area (and neutral point) moves aft of the head.
//   2. Head: a compact round head with two short cut antennae sits directly ahead of the costa
//      roots. There is no stick. The clip hides under the head, on the deepest part of the keel.
//   3. Dart folds: a tapered keel (deep thorax, shallow abdomen), a nose sleeve that folds under
//      and wraps the front of the keel, and a wide triangular costa doubler under each forewing.
//      The doublers and sleeve put layered paper forward and stiffen the leading edge.
//   4. Trim: hindwing elevons at the aft-most trailing edge, where a swept planform has the most
//      pitch lever, and a lower dihedral because sweep already adds roll stability.
// Every number in this file is a first-order model estimate. No K3 flight has been recorded yet.

import { rounded, type Line, type Point } from '../geometry/butterfly.ts'
import type { Species, WorkshopModel } from '../geometry/workshop-models.ts'
import { toPaper, trimGeometry, wingArt, wingShape } from '../geometry/workshop-art.ts'
import { estimateFlight, k2Model, k2Poses, papers, type Paper } from './k2-airframe.ts'

export type K3Pose = {
  // Scale of the species wings before posing: the span they would have laid flat, mm.
  base_span_mm: number
  // Forewing rotation back about the costa root. The species costa leans forward, so the
  // leading-edge sweep that results is smaller than this number.
  fore_swing_deg: number
  // Hindwing rotation back about its inner trailing root.
  hind_swing_deg: number
  // Head front to costa root, mm.
  head_mm: number
  // Keel depth at the head and at the abdomen tip, mm. The root creases are straight lines.
  keel_front_mm: number
  keel_tail_mm: number
  // Nose sleeve: length of the flap that folds under and wraps the keel front, mm.
  sleeve_mm: number
  // Costa doubler: width at the root and at its outer end, and the share of the costa it covers.
  doubler_root_mm: number
  doubler_tip_mm: number
  doubler_fraction: number
  // Finished wing V, degrees per side.
  dihedral_deg: number
  // Hindwing elevon stations, as fractions of the finished half-span.
  elevon_x: [number, number]
  elevon_depth_mm: number
}

const monarchPose: K3Pose = {
  base_span_mm: 200,
  fore_swing_deg: 45,
  hind_swing_deg: 20,
  head_mm: 13,
  keel_front_mm: 14,
  keel_tail_mm: 5,
  sleeve_mm: 13,
  doubler_root_mm: 15,
  doubler_tip_mm: 3,
  doubler_fraction: 0.8,
  dihedral_deg: 8,
  elevon_x: [0.42, 0.66],
  elevon_depth_mm: 9,
}
// The morpho's broad forewing leans further forward, so it swings 5 degrees more to reach a
// similar sweep. Pose search: scripts/k3_pose_search.ts.
export const k3Poses: Record<Species, K3Pose> = {
  monarch: monarchPose,
  morpho: { ...monarchPose, fore_swing_deg: 50 },
  swallowtail: { ...monarchPose },
}

// Finished span choices, mm. The pose is scaled to reach the chosen span.
export const k3SpanRange = { minimum: 150, maximum: 180, step: 2 }
export const k3DefaultSpan: Record<Species, number> = { monarch: 172, morpho: 176, swallowtail: 176 }
export function isK3Span(value: number): boolean {
  const { minimum, maximum, step } = k3SpanRange
  return Number.isInteger(value) && value >= minimum && value <= maximum && (value - minimum) % step === 0
}

// The pose whose finished span is the requested one (to within 0.5 mm). The head, antennae and
// keel keep their size; only the wings scale.
export function k3PoseForSpan(species: Species, span_mm: number): K3Pose {
  const pose = k3Poses[species]
  if (!pose) throw new Error('Unknown butterfly species')
  let base = (pose.base_span_mm * span_mm) / 171
  for (let i = 0; i < 6; i++) {
    const span = k3Geometry(species, { ...pose, base_span_mm: base }).span_mm
    if (Math.abs(span - span_mm) < 0.05) break
    base *= span_mm / span
  }
  return { ...pose, base_span_mm: rounded(base) }
}

const deg = Math.PI / 180
const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]]
const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]]
const mul = (a: Point, k: number): Point => [a[0] * k, a[1] * k]
const len = (a: Point) => Math.hypot(a[0], a[1])
const lerp = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const round = (p: Point): Point => [rounded(p[0]), rounded(p[1])]

function rotateAbout(p: Point, c: Point, angle: number): Point {
  const [dx, dy] = sub(p, c)
  const co = Math.cos(angle),
    si = Math.sin(angle)
  return [c[0] + dx * co - dy * si, c[1] + dx * si + dy * co]
}

function cubicPoints(a: Point, b: Point, c: Point, d: Point, n = 10): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / n,
      u = 1 - t
    return [
      u ** 3 * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t ** 3 * d[0],
      u ** 3 * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t ** 3 * d[1],
    ] as Point
  })
}

// Same surface mapping as the workshop painters (workshop-art.ts), so the outlines below
// coincide with the painted fans, including the bulge where the wings overlap.
type Edge = { points: Point[]; distance: number[]; length: number }
function along(path: Edge, fraction: number): Point {
  const distance = Math.max(0, Math.min(1, fraction)) * path.length
  let hi = path.distance.length - 1,
    lo = 0
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2)
    if (distance > path.distance[mid]) lo = mid
    else hi = mid
  }
  return lerp(path.points[lo], path.points[hi], (distance - path.distance[lo]) / (path.distance[hi] - path.distance[lo] || 1))
}
function surface(path: Edge, origin: Point, fore: boolean) {
  return (t: number, r: number): Point => {
    const [x, y] = lerp(origin, along(path, t), r)
    const distance = fore ? (1 - t) / 0.1 : t / 0.38
    return [x, y + 11.5 * Math.exp(-(distance ** 2)) * Math.sin(Math.PI * r)]
  }
}

function segmentHit(p: Point, p2: Point, q: Point, q2: Point): { t: number; u: number } | null {
  const r = sub(p2, p),
    s = sub(q2, q)
  const den = r[0] * s[1] - r[1] * s[0]
  if (Math.abs(den) < 1e-12) return null
  const qp = sub(q, p)
  const t = (qp[0] * s[1] - qp[1] * s[0]) / den
  const u = (qp[0] * r[1] - qp[1] * r[0]) / den
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? { t, u } : null
}

export function insidePolygon([x, y]: Point, poly: Point[]): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i],
      [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

export function polygonArea(poly: Point[]) {
  let a = 0,
    cx = 0,
    cy = 0
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i],
      [x2, y2] = poly[(i + 1) % poly.length]
    const c = x1 * y2 - x2 * y1
    a += c
    cx += (x1 + x2) * c
    cy += (y1 + y2) * c
  }
  a /= 2
  return { area: Math.abs(a), cx: cx / (6 * a), cy: cy / (6 * a) }
}

// ---------------------------------------------------------------------------------------
// Finished top view. Millimetres, body centre on x = 0, y grows toward the tail.

export type K3Geometry = {
  species: Species
  pose: K3Pose
  model: WorkshopModel
  // Right half of the finished outline from the head front (x = 0) to the abdomen tip (x = 0).
  half: Point[]
  // Both halves, closed.
  top: Point[]
  span_mm: number
  head_y: number
  tail_y: number
  costa: [Point, Point]
  sweep_deg: number
  // The posed wing polygons and the transforms that carry species art onto them.
  fore: Point[]
  hind: Point[]
  foreTransform: (p: Point) => Point
  hindTransform: (p: Point) => Point
  // Where the forewing margin crosses the hindwing edge.
  notch: Point
  // Points of the hidden hindwing front that poke out ahead of the forewing (should be none).
  exposed: Point[]
  antenna: Point[]
  // Right half of the printed cut line: the finished half with the costa doubler added.
  cutHalf: Point[]
  doubler: Point[]
  doublerFolded: Point[]
  trailing: Point[]
}

export function k3Geometry(species: Species = 'monarch', pose: K3Pose = k3Poses[species]): K3Geometry {
  if (!pose) throw new Error('Unknown butterfly species')
  const S = pose.base_span_mm
  // Start from the K2 model with no swing and no head shift: species outline with a straight costa.
  const model = k2Model(species, { ...k2Poses[species], sweep_deg: 0, head_mm: 0, span_mm: S })
  const g = model.geometry
  const shape = wingShape(model)
  const P = (p: Point) => toPaper(p, S)
  const foreMap = surface(shape.fore, g.fore_origin, true)
  const hindMap = surface(shape.hind, g.hind_origin, false)
  const N = 90
  const foreEdge = Array.from({ length: N + 1 }, (_, i) => P(foreMap(i / N, 1)))
  const foreRay = Array.from({ length: 24 }, (_, i) => P(foreMap(1, 1 - (i + 1) / 24)))
  const hindRay = Array.from({ length: 24 }, (_, i) => P(hindMap(0, i / 23)))
  // The hind edge for the cut uses the true trailing edge (shape.trailing), which includes the
  // swallowtail streamer; the painted fan may stop short of it.
  const hindEdge = shape.trailing.map(P)

  const costaRoot = P([g.root_x, g.fore_root_y])
  const hindRoot = P([g.root_x, g.hind_root_y])
  const foreTransform = (p: Point) => rotateAbout(p, costaRoot, pose.fore_swing_deg * deg)
  const hindTransform = (p: Point) => rotateAbout(p, hindRoot, pose.hind_swing_deg * deg)

  const forePath = [...foreEdge, ...foreRay].map(foreTransform)
  const hindPath = hindEdge.map(hindTransform)
  const fore = forePath
  const hind = [...hindRay.map(hindTransform), ...hindPath.slice(1)]

  // First place the forewing margin meets the hindwing edge, walking out along the costa.
  let cut: { i: number; j: number; point: Point } | undefined
  for (let i = 0; i + 1 < forePath.length && !cut; i++)
    for (let j = 0; j + 1 < hindPath.length; j++) {
      const hit = segmentHit(forePath[i], forePath[i + 1], hindPath[j], hindPath[j + 1])
      if (hit && i > 4) {
        cut = { i, j, point: lerp(forePath[i], forePath[i + 1], hit.t) }
        break
      }
    }
  if (!cut) throw new Error('Forewing and hindwing do not meet in this pose')
  const notch = cut.point
  const wing = [...forePath.slice(0, cut.i + 1), notch, ...hindPath.slice(cut.j + 1)]

  // Head with antennae ahead of the costa root. The costa root sits on the body edge.
  const rx = costaRoot[0]
  const headY = costaRoot[1] - pose.head_mm
  const a = antennaOutline(headY, rx)
  const neck: Point = [rx - 1.1, headY + 9]
  const head: Point[] = [
    [0, headY],
    ...a.outline,
    ...cubicPoints(a.outline.at(-1)!, [rx + 0.9, headY + 5.2], [neck[0] + 0.6, neck[1] - 1.8], neck, 6),
    ...cubicPoints(neck, [neck[0] - 0.2, neck[1] + 1.6], [rx - 0.3, costaRoot[1] - 1.2], costaRoot, 5),
  ]
  // Abdomen tip behind the hindwing roots; keep the hind outline on or outside the body edge.
  const wingClean = wing.filter((p, i) => i === 0 || p[0] >= rx - 0.01)
  const end = wingClean.at(-1)!
  const tailY = end[1] + 13
  const tail = cubicPoints(end, [end[0] - 0.4, end[1] + 5], [2.8, tailY], [0, tailY], 8)
  const half = [...head, ...wingClean.slice(1), ...tail].map(round)
  const top = [...half, ...half.slice(1, -1).reverse().map(([x, y]): Point => [-x, y])]
  const span = 2 * Math.max(...half.map(([x]) => x))

  // Hidden hindwing front: it must stay under the posed forewing.
  const exposed = hindRay.map(hindTransform).filter((p) => p[0] > rx + 1 && !insidePolygon(p, [costaRoot, ...forePath]) && !insidePolygon(p, wing))

  // Straight costa: the first fore-edge point to the end of the straight segment.
  // k2Model replaces the first costa_segments + 1 segments with one straight segment: index 0.
  const costaEndPct = model.geometry.fore_edge[0]
  const costaEnd = foreTransform(P([costaEndPct[4], costaEndPct[5]]))
  const costa: [Point, Point] = [costaRoot, costaEnd]
  const sweep = Math.atan2(costaEnd[1] - costaRoot[1], costaEnd[0] - costaRoot[0]) / deg

  const d = doubler(costa, pose)
  // Replace the straight costa run inside the doubler's reach with the doubler's three outer corners.
  const L = len(sub(costaEnd, costaRoot))
  const u = mul(sub(costaEnd, costaRoot), 1 / L)
  const onCosta = (p: Point) => {
    const r = sub(p, costaRoot)
    const s = r[0] * u[0] + r[1] * u[1]
    return { s, off: Math.abs(r[0] * u[1] - r[1] * u[0]) }
  }
  const iRoot = half.findIndex((p) => p[0] === round(costaRoot)[0] && p[1] === round(costaRoot)[1])
  const reach = pose.doubler_fraction * L
  let iAfter = iRoot + 1
  while (iAfter < half.length) {
    const q = onCosta(half[iAfter])
    if (q.off < 0.05 && q.s <= reach + 1e-6) iAfter++
    else break
  }
  const cutHalf = [...half.slice(0, iRoot + 1), ...d.flat.slice(1).map(round), ...half.slice(iAfter)]
  const trailing = [notch, ...hindPath.slice(cut.j + 1)].filter((p) => p[0] >= rx)
  return {
    species,
    pose,
    model,
    half,
    top,
    span_mm: rounded(span),
    head_y: rounded(headY),
    tail_y: rounded(tailY),
    costa,
    sweep_deg: rounded(sweep),
    fore,
    hind,
    foreTransform,
    hindTransform,
    notch,
    exposed,
    antenna: a.outline,
    cutHalf,
    doubler: d.flat,
    doublerFolded: d.folded,
    trailing,
  }
}

// Right antenna and the front of the head. The antenna leaves the head 1.6 mm out from the
// centre crease and leans out 24 degrees, so the slot between the antenna and the nose sleeve
// opens into a wide V that scissors can reach.
export const antennaSpec = { length: 14, width: 2.3, lean_deg: 24, club_r: 1.9 }
function antennaOutline(headY: number, rx: number) {
  const { length, width, lean_deg, club_r } = antennaSpec
  const dir: Point = [Math.sin(lean_deg * deg), -Math.cos(lean_deg * deg)]
  const nrm: Point = [-dir[1], dir[0]] // points outward and back
  const base: Point = [1.6 + width / 2, headY + 1.2]
  const tip = add(base, mul(dir, length))
  const innerBase = add(base, mul(nrm, -width / 2))
  const outerBase = add(base, mul(nrm, width / 2))
  const clubC = add(tip, mul(dir, club_r * 0.4))
  // Round the front of the club, from just behind its inner side to just behind its outer side.
  const inward = Math.atan2(-nrm[1], -nrm[0])
  const clubPts = Array.from({ length: 15 }, (_, i): Point => {
    const a = inward - 0.6 + ((Math.PI + 1.2) * i) / 14
    return add(clubC, [club_r * Math.cos(a), club_r * Math.sin(a)])
  })
  const frontCurve = cubicPoints([0, headY], [0.7, headY - 0.1], [innerBase[0] - 0.3, innerBase[1] + 0.2], innerBase, 4)
  const outline: Point[] = [
    ...frontCurve,
    add(tip, mul(nrm, -width / 2)),
    ...clubPts,
    add(tip, mul(nrm, width / 2)),
    outerBase,
    [rx + 0.6, headY + 3.4],
  ]
  return { outline, tip, base }
}

// Costa doubler: a strip on the nose side of the costa that folds under the forewing.
// The inner end is cut at 45 degrees so the folded strip stays off the body and root crease.
function doubler(costa: [Point, Point], pose: K3Pose) {
  const [root, end] = costa
  const L = len(sub(end, root))
  const u = mul(sub(end, root), 1 / L)
  const n: Point = [u[1], -u[0]] // toward the nose side
  const reach = pose.doubler_fraction * L
  const w0 = pose.doubler_root_mm,
    w1 = pose.doubler_tip_mm
  const on = (s: number, w: number): Point => add(root, add(mul(u, s), mul(n, w)))
  const flat: Point[] = [on(0, 0), on(w0, w0), on(reach - w1, w1), on(reach, 0)]
  const folded = flat.map(([x, y]) => {
    // Reflect across the costa line.
    const rel = sub([x, y], root)
    const s = rel[0] * u[0] + rel[1] * u[1]
    const w = rel[0] * n[0] + rel[1] * n[1]
    return add(root, add(mul(u, s), mul(n, -w)))
  })
  return { flat, folded, width_at_s: (s: number) => (s < 0 || s > reach ? 0 : s < w0 ? s : w0 + ((w1 - w0) * (s - w0)) / (reach - w0)) }
}

// ---------------------------------------------------------------------------------------
// Flat sheet. The keel walls lie between the centre valley (x = 0) and the root crease, which
// runs straight from depth keel_front at the head to keel_tail at the abdomen tip. Each finished
// half is laid against its crease by a rigid move, so printed shapes are exactly the wing shapes.

export type K3Flat = {
  outline: Point[]
  toFlat: (p: Point, side: number) => Point
  crease: { center: [Point, Point]; root: [Point, Point]; sleeve: [Point, Point] }
  sleeve: Point[]
  keel: Point[]
}

export function k3Flat(geo: K3Geometry): K3Flat {
  const { pose } = geo
  const df = pose.keel_front_mm,
    dt = pose.keel_tail_mm
  const s = geo.tail_y - geo.head_y
  const cx = (dt - df) / s
  const c: Point = [cx, Math.sqrt(1 - cx * cx)]
  const n: Point = [c[1], -c[0]]
  const A: Point = [df, geo.head_y]
  const toFlat = ([x, y]: Point, side: number): Point => {
    const p = add(A, add(mul(c, y - geo.head_y), mul(n, Math.abs(x))))
    return round([side * p[0], p[1]])
  }
  const E = toFlat([0, geo.tail_y], 1)
  const right = geo.cutHalf.map((p) => toFlat(p, 1))
  const left = [...geo.cutHalf].reverse().map((p) => toFlat(p, -1))
  // Nose sleeve ahead of the keel front, 1 mm narrower than the keel on each side, corners chamfered.
  const w = df - 1,
    f = pose.sleeve_mm,
    y0 = geo.head_y
  const sleeve: Point[] = [
    [w, y0],
    [w, y0 - f + 2.5],
    [w - 2.5, y0 - f],
    [-w + 2.5, y0 - f],
    [-w, y0 - f + 2.5],
    [-w, y0],
  ]
  // Outline: right half from the head front round to the abdomen tip, across the keel tail,
  // left half back to its head front, then round the sleeve.
  const corners: Point[] = [
    ...right,
    [-E[0], E[1]],
    ...left,
    [-df, y0],
    ...sleeve.slice().reverse(),
    [df, y0],
  ]
  const outline = corners.map(round)
  // Remove consecutive duplicates.
  const clean = outline.filter((p, i) => i === 0 || p[0] !== outline[i - 1][0] || p[1] !== outline[i - 1][1])
  const keel: Point[] = [[0, y0], A, E, [0, E[1]]]
  return {
    outline: clean,
    toFlat,
    crease: { center: [[0, y0], [0, E[1]]], root: [A, E], sleeve: [[-w, y0], [w, y0]] },
    sleeve,
    keel,
  }
}

// ---------------------------------------------------------------------------------------
// Mass, balance and first-order flight estimate. Every piece of paper is counted in its finished
// place: the wings in the top view, the keel walls under the body, the doublers reflected under
// the forewings and the sleeve folded back over the keel front.

export type K3Estimate = {
  span_mm: number
  area_cm2: number
  aspect_ratio: number
  mac_mm: number
  sweep_deg: number
  neutral_point_from_head_mm: number
  paper_g: number
  paper_centroid_from_head_mm: number
  clip_g: number
  clip_centre_from_head_mm: number
  balance_from_head_mm: number
  static_margin: number
  balance_target_from_head_mm: number
  clip_needed_g: number
  wing_loading_n_m2: number
  glide_speed_m_s: number
  tip_deflection_mm: number
  pieces: { label: string; grams: number; y_from_head_mm: number }[]
}

export const clipCentreFromHead = 13 // a 33 mm clip pushed fully onto the keel front

// bonded: the doubler is glued to the wing. A bonded double layer is twice as thick and about
// eight times as stiff as one sheet; two loose sheets are only twice as stiff.
export function estimateK3(geo: K3Geometry, paper: Paper = papers['120'], clip_g = 1.0, target_margin = 0.1, bonded = false): K3Estimate {
  const { pose } = geo
  const gsm = paper.gsm * 1e-6 // g per mm²
  const pieces: K3Estimate['pieces'] = []
  const piece = (label: string, area: number, y: number) => pieces.push({ label, grams: area * gsm, y_from_head_mm: y - geo.head_y })
  const top = polygonArea(geo.top)
  piece('wings, head and body top', top.area, top.cy)
  const L = geo.tail_y - geo.head_y
  const df = pose.keel_front_mm,
    dt = pose.keel_tail_mm
  piece('keel walls', L * (df + dt), geo.head_y + (L * (df + 2 * dt)) / (3 * (df + dt)))
  const folded = polygonArea(geo.doublerFolded)
  piece('costa doublers', 2 * folded.area, folded.cy)
  piece('nose sleeve', 2 * (df - 1) * pose.sleeve_mm, geo.head_y + pose.sleeve_mm / 2)
  const paperG = pieces.reduce((a, p) => a + p.grams, 0)
  const paperY = geo.head_y + pieces.reduce((a, p) => a + p.grams * p.y_from_head_mm, 0) / paperG
  const clipY = geo.head_y + clipCentreFromHead

  // Neutral point, MAC and bending from the K2 strip model. Passing the top outline as the
  // "flat" sheet and the rest of the paper as clip mass gives it the right total weight.
  const rx = geo.costa[0][0]
  const u = sub(geo.costa[1], geo.costa[0])
  const cosSweep = u[0] / len(u)
  const d = doubler(geo.costa, pose)
  const base = estimateFlight({
    top: geo.top,
    flat: geo.top,
    root_x_mm: rx,
    paper,
    grain_along_span: true,
    clip_g: paperG - top.area * gsm + clip_g,
    clip_center_y: clipY,
    hem: { polygon: geo.doublerFolded, width_at: (x) => ((bonded ? 7 : 1) * d.width_at_s((x - rx) / cosSweep)) / cosSweep },
    target_margin,
    costa: geo.costa,
  })
  const np = base.neutral_point_y
  const mac = base.mac_mm
  const balance = (paperG * paperY + clip_g * clipY) / (paperG + clip_g)
  const target = np - target_margin * mac
  const clipNeeded = Math.max(0, (paperG * (paperY - target)) / (target - clipY))
  const mass = paperG + clip_g
  const wl = (mass * 9.81e-3) / (top.area * 1e-6)
  return {
    span_mm: geo.span_mm,
    area_cm2: top.area / 100,
    aspect_ratio: (geo.span_mm * geo.span_mm) / top.area,
    mac_mm: mac,
    sweep_deg: geo.sweep_deg,
    neutral_point_from_head_mm: np - geo.head_y,
    paper_g: paperG,
    paper_centroid_from_head_mm: paperY - geo.head_y,
    clip_g,
    clip_centre_from_head_mm: clipCentreFromHead,
    balance_from_head_mm: balance - geo.head_y,
    static_margin: (np - balance) / mac,
    balance_target_from_head_mm: target - geo.head_y,
    clip_needed_g: clipNeeded,
    wing_loading_n_m2: wl,
    glide_speed_m_s: Math.sqrt((2 * wl) / (1.2 * 0.6)),
    // Strip bending runs along x; a swept spar is longer by 1/cos(sweep), and deflection grows
    // with length cubed. This is a rough correction, not a swept-beam model.
    tip_deflection_mm: base.tip_deflection_mm / cosSweep ** 3,
    pieces,
  }
}

// Elevon slits on the hindwing trailing edge, in finished coordinates.
export function k3Elevons(geo: K3Geometry) {
  const half = geo.span_mm / 2
  const pct = geo.pose.elevon_x.map((f) => (f * half * 200) / geo.pose.base_span_mm) as [number, number]
  const model = { ...geo.model, geometry: { ...geo.model.geometry, tab_x: pct, tab_depth_mm: geo.pose.elevon_depth_mm } } as WorkshopModel
  // trimGeometry works in % of half-span; express the trailing edge in those units.
  const trailingPct = geo.trailing.map(([x, y]): Point => [(x * 200) / geo.pose.base_span_mm, y])
  const t = trimGeometry(model, trailingPct)
  const mm = ([x, y]: Point): Point => [(x * geo.pose.base_span_mm) / 200, y]
  return { ends: t.ends.map(mm) as [Point, Point], hinges: t.hinges.map(mm) as [Point, Point] }
}

// Species art carried onto the posed wings. Each wing is painted in its natural pose and moved
// rigidly, so veins and spots are the K2 artwork. The forewing is painted over the hindwing,
// with a dark underlay so its black border hides the hindwing beneath, as on a real butterfly.
export function k3Art(geo: K3Geometry, appearance = 'natural'): Line[] {
  const S = geo.pose.base_span_mm
  const model = geo.model
  const shape = wingShape(model)
  const raw = wingArt(model, appearance, S, shape)
  const c = model.palettes[appearance as keyof typeof model.palettes]
  const inkOnly = appearance === 'coloring'
  const out: Line[] = [{ id: 'silhouette', points: geo.top, closed: true, fill: inkOnly ? '#FFFFFF' : c.ink, stroke: c.ink, weight: 0.44 }]
  const move = (line: Line, side: number, f: (p: Point) => Point): Line => ({
    ...line,
    points: line.points.map(([x, y]) => {
      const p = f([side * x, y])
      return round([side * p[0], p[1]])
    }),
  })
  for (const side of [-1, 1]) {
    const prefix = side < 0 ? 'left-' : 'right-'
    for (const line of raw.filter((l) => l.id.startsWith(prefix + 'hind-'))) out.push(move(line, side, geo.hindTransform))
    out.push({
      id: prefix + 'fore-underlay',
      points: geo.fore.map(([x, y]) => round([side * x, y])),
      closed: true,
      fill: inkOnly ? '#FFFFFF' : c.ink,
      stroke: inkOnly ? c.ink : undefined,
      weight: inkOnly ? 0.3 : 0,
    })
    for (const line of raw.filter((l) => l.id.startsWith(prefix + 'fore-'))) out.push(move(line, side, geo.foreTransform))
  }
  // Body: reuse the species body art, moved so the head sits at the K3 head and the abdomen
  // reaches the K3 tail. The species antennae are replaced by the cut antennae.
  const g = model.geometry
  const bodyModel = {
    ...model,
    geometry: { ...g, nose_y: geo.head_y - 4, fore_root_y: geo.head_y + 13.2 - 5 + 0, hind_root_y: geo.tail_y - 16, abdomen_y: geo.tail_y + 1 },
  } as WorkshopModel
  const body = wingArt(bodyModel, appearance, S, wingShape(bodyModel)).filter(
    (l) => !/^(left|right)-|^silhouette$|^antenna/.test(l.id),
  )
  out.push(...body)
  // Antennae: a painted shaft and club inside each cut antenna.
  for (const side of [-1, 1]) {
    const m = ([x, y]: Point): Point => round([side * x, y])
    const { length, lean_deg, club_r, width } = antennaSpec
    const dir: Point = [Math.sin(lean_deg * deg), -Math.cos(lean_deg * deg)]
    const base: Point = [1.6 + width / 2, geo.head_y + 1.2]
    const tip = add(base, mul(dir, length))
    out.push({ id: 'antenna-' + side, points: [add(base, [0, 3]), base, tip].map(m), stroke: inkOnly ? c.ink : c.sun, weight: 0.55 })
    const clubC = add(tip, mul(dir, club_r * 0.4))
    out.push({
      id: 'antenna-club-' + side,
      points: Array.from({ length: 18 }, (_, i): Point => add(clubC, [1.0 * Math.cos((i / 18) * 2 * Math.PI), 1.25 * Math.sin((i / 18) * 2 * Math.PI)])).map(m),
      closed: true,
      fill: inkOnly ? c.ink : c.sun,
    })
  }
  return out
}
