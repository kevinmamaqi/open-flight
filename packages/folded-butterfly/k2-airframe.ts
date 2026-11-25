// K2 "costa" airframe: geometry and first-order flight physics for the folded butterfly.
//
// K1 places the forewing tips ahead of the nose and the clip only 8 mm in front of the
// wing root. Its balance point therefore falls behind the neutral point for every paper
// and clip, and its forward-swept, unsupported forewings bend tip-up under lift. K2 keeps
// the species outline but changes four things:
//   1. a gliding posture: each forewing swings back about its root, so the apex sits
//      behind the head and bending no longer twists the tip to a higher angle;
//   2. a longer head and thorax ahead of the wing root carrying the clip as a lever;
//   3. a straight costa (leading-edge vein) with a tapered hem folded underneath as a
//      spar from the head to near the apex;
//   4. trim tabs on the hindwings and a printed balance point to check before flying.
// Everything here is a prediction until real paper is built and launched.

import type { Point } from '../geometry/butterfly.ts'
import type { Segment, Species, WorkshopModel } from '../geometry/workshop-models.ts'
import { workshopModels } from '../geometry/workshop-models.ts'

export type K2Pose = {
  // Degrees each forewing rotates back about its root (tips move toward the tail).
  sweep_deg: number
  // Last forewing segment that becomes the straight costa (0-based, inclusive).
  costa_segments: number
  // Extra head and thorax length ahead of the forewing root, mm.
  head_mm: number
  // Hem width at the root and at the outer end, mm, and the fraction of the costa it covers.
  hem_root_mm: number
  hem_tip_mm: number
  hem_fraction: number
  // Default finished span for this species, mm.
  span_mm: number
}

// Chosen by sweeping sweep angle and head length for a 10% static margin with about 1 g of clips,
// while keeping each species recognisable.
export const k2Poses: Record<Species, K2Pose> = {
  monarch: { sweep_deg: 10, costa_segments: 1, head_mm: 24, hem_root_mm: 7, hem_tip_mm: 4, hem_fraction: 0.86, span_mm: 172 },
  morpho: { sweep_deg: 7, costa_segments: 1, head_mm: 32, hem_root_mm: 7, hem_tip_mm: 4, hem_fraction: 0.84, span_mm: 164 },
  swallowtail: { sweep_deg: 10, costa_segments: 0, head_mm: 24, hem_root_mm: 7, hem_tip_mm: 4, hem_fraction: 0.86, span_mm: 176 },
}

const toMm = (xPct: number, span: number) => (xPct * span) / 200
const toPct = (xMm: number, span: number) => (xMm * 200) / span

function rotateAbout([x, y]: Point, [cx, cy]: Point, angle: number): Point {
  const dx = x - cx,
    dy = y - cy
  const c = Math.cos(angle),
    s = Math.sin(angle)
  return [cx + dx * c - dy * s, cy + dx * s + dy * c]
}

// Return a derived workshop model whose wing outline and art follow the K2 posture.
// The species palettes and painters are reused, so markings stay recognisable.
export function k2Model(species: Species, pose: K2Pose = k2Poses[species]): WorkshopModel {
  const base = workshopModels.find((m) => m.species === species)
  if (!base) throw new Error('Unknown butterfly species')
  const g = base.geometry
  const span = pose.span_mm
  const shift = pose.head_mm
  const root: Point = [toMm(g.root_x, span), g.fore_root_y]
  const angle = (pose.sweep_deg * Math.PI) / 180
  // Swing the forewing back about its root. The apex turns by the full angle and the
  // angle fades to zero at the notch, so the hindwing and its markings stay unchanged.
  const notch: Point = [toMm(g.fore_edge.at(-1)![4], span), g.fore_edge.at(-1)![5]]
  const apexMm = Math.max(...g.fore_edge.map((s) => toMm(s[4], span)))
  const swing = (p: Point): Point => {
    const mm: Point = [toMm(p[0], span), p[1]]
    const fromNotch = Math.hypot(mm[0] - notch[0], mm[1] - notch[1])
    const reach = Math.hypot(apexMm - notch[0], g.fore_edge[0][5] - notch[1])
    const weight = Math.min(1, fromNotch / reach) ** 0.8
    const [x, y] = rotateAbout(mm, root, angle * weight)
    return [toPct(x, span), y]
  }
  let fore: Segment[] = g.fore_edge.map((s) => {
    const a = swing([s[0], s[1]]),
      b = swing([s[2], s[3]]),
      c = swing([s[4], s[5]])
    return [a[0], a[1], b[0], b[1], c[0], c[1]]
  })
  // Straighten the costa: one straight cubic from the root to the end of the chosen segment.
  const costaEnd: Point = [fore[pose.costa_segments][4], fore[pose.costa_segments][5]]
  const r: Point = [g.root_x, g.fore_root_y]
  const third = (t: number): [number, number] => [
    r[0] + (costaEnd[0] - r[0]) * t,
    r[1] + (costaEnd[1] - r[1]) * t,
  ]
  fore = [[...third(1 / 3), ...third(2 / 3), ...costaEnd] as Segment, ...fore.slice(pose.costa_segments + 1)]
  const hind = g.hind_edge
  const shiftSeg = (s: Segment): Segment => [s[0], s[1] + shift, s[2], s[3] + shift, s[4], s[5] + shift]
  const geometry = {
    ...g,
    nose_y: g.nose_y,
    abdomen_y: g.abdomen_y + shift,
    fore_root_y: g.fore_root_y + shift,
    hind_root_y: g.hind_root_y + shift,
    fore_origin: [g.fore_origin[0], g.fore_origin[1] + shift] as Point,
    hind_origin: [g.hind_origin[0], g.hind_origin[1] + shift] as Point,
    fore_edge: fore.map(shiftSeg),
    hind_edge: hind.map(shiftSeg),
  }
  return {
    ...base,
    baseline_revision: 'k2',
    geometry,
    parameters: { ...base.parameters, span_mm: span },
  } as WorkshopModel
}

// ---------------------------------------------------------------------------------------
// First-order physics. Flat-plate strip theory, small deflection, unbonded paper layers.

export type Paper = { gsm: number; thickness_mm: number; e_along_gpa: number; e_across_gpa: number }
// Typical uncoated office and card stock values; not measured for a specific product.
export const papers: Record<string, Paper> = {
  '80': { gsm: 80, thickness_mm: 0.1, e_along_gpa: 5.5, e_across_gpa: 2.5 },
  '100': { gsm: 100, thickness_mm: 0.12, e_along_gpa: 5.5, e_across_gpa: 2.5 },
  '120': { gsm: 120, thickness_mm: 0.14, e_along_gpa: 5.5, e_across_gpa: 2.5 },
  '160': { gsm: 160, thickness_mm: 0.19, e_along_gpa: 5.0, e_across_gpa: 2.3 },
  '200': { gsm: 200, thickness_mm: 0.24, e_along_gpa: 4.5, e_across_gpa: 2.1 },
}

function polygonArea(poly: Point[]) {
  let a = 0,
    cy = 0
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i],
      [x2, y2] = poly[(i + 1) % poly.length]
    const c = x1 * y2 - x2 * y1
    a += c
    cy += (y1 + y2) * c
  }
  a /= 2
  return { area: Math.abs(a), cy: cy / (6 * a) }
}

type Strip = { x: number; dx: number; le: number; te: number; chord: number }
function strips(outline: Point[], xFrom: number, n = 240): Strip[] {
  const xmax = Math.max(...outline.map((p) => p[0]))
  const out: Strip[] = []
  for (let i = 0; i < n; i++) {
    const x = xFrom + ((i + 0.5) / n) * (xmax - xFrom)
    const ys: number[] = []
    for (let j = 0; j < outline.length; j++) {
      const [x1, y1] = outline[j],
        [x2, y2] = outline[(j + 1) % outline.length]
      if ((x1 - x) * (x2 - x) < 0) ys.push(y1 + ((y2 - y1) * (x - x1)) / (x2 - x1))
    }
    ys.sort((a, b) => a - b)
    let chord = 0
    for (let k = 0; k + 1 < ys.length; k += 2) chord += ys[k + 1] - ys[k]
    if (chord > 0) out.push({ x, dx: (xmax - xFrom) / n, le: ys[0], te: ys.at(-1)!, chord })
  }
  return out
}

export type MassItem = { label: string; grams: number; y: number }
export type FlightEstimate = {
  span_mm: number
  area_cm2: number
  aspect_ratio: number
  mac_mm: number
  neutral_point_y: number
  balance_target_y: number
  paper_g: number
  paper_centroid_y: number
  clip_g: number
  clip_center_y: number
  balance_y: number
  static_margin: number
  clip_needed_g: number
  wing_loading_n_m2: number
  glide_speed_m_s: number
  tip_deflection_mm: number
  tip_deflection_launch_mm: number
  costa_sweep_deg: number
}

// top: finished top-view outline (x >= 0 half used for bending). flat: printed cut outline.
// extra: printed paper that adds mass (for example the folded hem) as separate polygons.
export function estimateFlight(options: {
  top: Point[]
  flat: Point[]
  root_x_mm: number
  paper: Paper
  grain_along_span: boolean
  clip_g: number
  clip_center_y: number
  hem?: { polygon: Point[]; width_at: (x: number) => number }
  target_margin?: number
  costa?: [Point, Point]
}): FlightEstimate {
  const { top, flat, paper, clip_g, clip_center_y } = options
  const targetMargin = options.target_margin ?? 0.12
  const plan = polygonArea(top)
  const sheet = polygonArea(flat)
  const span = 2 * Math.max(...top.map((p) => p[0]))
  const half = strips(top, 0)
  let num = 0,
    den = 0,
    mac = 0
  for (const s of half) {
    num += (s.le + s.chord / 4) * s.chord * s.dx
    den += s.chord * s.dx
    mac += s.chord * s.chord * s.dx
  }
  const np = num / den
  const macMm = mac / den
  const paperG = sheet.area * 1e-6 * paper.gsm
  const target = np - targetMargin * macMm
  const balance = (paperG * sheet.cy + clip_g * clip_center_y) / (paperG + clip_g)
  const clipNeeded = Math.max(0, (paperG * (sheet.cy - target)) / (target - clip_center_y))
  const mass = paperG + clip_g
  const weight = mass * 9.81e-3
  const wl = weight / (plan.area * 1e-6)
  // Cantilever each half-wing from its root crease. Lift follows chord (strip theory).
  const e = (options.grain_along_span ? paper.e_along_gpa : paper.e_across_gpa) * 1e9
  const t = paper.thickness_mm * 1e-3
  const dPerWidth = (e * t ** 3) / 12 // N·m per metre of chord
  const wing = strips(top, options.root_x_mm, 300)
  const liftTotal = weight / 2
  const chordSum = wing.reduce((a, s) => a + s.chord * s.dx, 0)
  const q = wing.map((s) => (liftTotal * s.chord * s.dx) / chordSum) // N on each strip
  // Bending moment at each station from all outboard strips.
  const moment = wing.map((s, i) => {
    let m = 0
    for (let j = i; j < wing.length; j++) m += q[j] * ((wing[j].x - s.x) * 1e-3)
    return m
  })
  let slope = 0,
    defl = 0
  for (let i = 0; i < wing.length; i++) {
    const hem = options.hem ? options.hem.width_at(wing[i].x) : 0
    // The hem is a second, unbonded layer; it adds its own bending stiffness.
    const ei = dPerWidth * (wing[i].chord + hem) * 1e-3
    const curvature = moment[i] / ei
    slope += curvature * wing[i].dx * 1e-3
    defl += slope * wing[i].dx * 1e-3
  }
  const costa = options.costa
  const sweep = costa
    ? (Math.atan2(costa[1][1] - costa[0][1], costa[1][0] - costa[0][0]) * 180) / Math.PI
    : NaN
  return {
    span_mm: span,
    area_cm2: plan.area / 100,
    aspect_ratio: (span * span) / plan.area,
    mac_mm: macMm,
    neutral_point_y: np,
    balance_target_y: target,
    paper_g: paperG,
    paper_centroid_y: sheet.cy,
    clip_g,
    clip_center_y,
    balance_y: balance,
    static_margin: (np - balance) / macMm,
    clip_needed_g: clipNeeded,
    wing_loading_n_m2: wl,
    glide_speed_m_s: Math.sqrt((2 * wl) / (1.2 * 0.6)),
    tip_deflection_mm: defl * 1e3,
    tip_deflection_launch_mm: defl * 1e3 * 3,
    costa_sweep_deg: sweep,
  }
}

// ---------------------------------------------------------------------------------------
// Outline with the costa hem. Coordinates are finished top-view paper millimetres, with the
// body centre on x = 0. The hem lies outside the costa in the flat sheet and folds under it.

import { wingArt, wingShape, toPaper } from '../geometry/workshop-art.ts'
import { rounded, type Line } from '../geometry/butterfly.ts'

export type K2Outline = {
  model: WorkshopModel
  span_mm: number
  top: Point[]
  cut: Point[]
  hem: { right: Point[]; left: Point[] }
  costa: [Point, Point]
  hemEnd: Point
  root: Point
  shape: ReturnType<typeof wingShape>
}

export function k2Outline(species: Species, span = k2Poses[species].span_mm): K2Outline {
  const pose = { ...k2Poses[species], span_mm: span }
  const model = k2Model(species, pose)
  const shape = wingShape(model)
  const g = model.geometry
  const root = toPaper([g.root_x, g.fore_root_y], span)
  // Replace the original rounded head with antennae: two clubs at the nose, a narrow pair of
  // shafts over the clip, then the head and thorax where the wings begin.
  const raw = shape.outline.map((p) => toPaper(p, span))
  const iHead = raw.findIndex(([x, y]) => x === root[0] && y === root[1])
  const antennaHead = antennae(g.nose_y, g.fore_root_y, root)
  const rightRaw = [...antennaHead, ...raw.slice(iHead + 1)]
  const tailAt = rightRaw.findIndex(([x], i) => i > 0 && x === 0)
  const rightTop = rightRaw.slice(0, tailAt + 1)
  const top = [...rightTop, ...rightTop.slice(1, -1).reverse().map(([x, y]): Point => [-x, y])]
  const end = toPaper([g.fore_edge[0][4], g.fore_edge[0][5]], span)
  const length = Math.hypot(end[0] - root[0], end[1] - root[1])
  const u: Point = [(end[0] - root[0]) / length, (end[1] - root[1]) / length]
  const n: Point = [u[1], -u[0]] // points away from the wing, toward the nose side
  const reach = pose.hem_fraction * length
  const width = (s: number) => pose.hem_root_mm + (pose.hem_tip_mm - pose.hem_root_mm) * (s / reach)
  const on = (s: number, w = 0): Point => [
    rounded(root[0] + u[0] * s + n[0] * w),
    rounded(root[1] + u[1] * s + n[1] * w),
  ]
  // 45-degree ends keep the folded hem inside the wing outline and off the root crease.
  const hemRight: Point[] = [on(0), on(pose.hem_root_mm, pose.hem_root_mm), on(reach - pose.hem_tip_mm, pose.hem_tip_mm), on(reach)]
  // Replace the straight costa points on each side of the outline with the hem.
  const iRoot = top.findIndex(([x, y]) => x === root[0] && y === root[1])
  const iEnd = top.findIndex(([x, y]) => x === end[0] && y === end[1])
  if (iRoot < 0 || iEnd < 0) throw new Error('Costa not found in outline')
  const mirror = ([x, y]: Point): Point => [-x, y]
  const rightPart = [...top.slice(0, iRoot + 1), ...hemRight.slice(1), ...top.slice(iEnd)]
  // The outline is symmetric: rebuild the left half by mirroring the right half.
  const tail = rightPart.findIndex(([x], i) => i > 0 && x === 0)
  const half = rightPart.slice(0, tail + 1)
  const cut = [...half, ...half.slice(1, -1).reverse().map(mirror)]
  return {
    model,
    span_mm: span,
    top,
    cut,
    hem: { right: hemRight, left: hemRight.map(mirror) },
    costa: [root, end],
    hemEnd: on(reach),
    root,
    shape,
  }
}

function bezier(a: Point, b: Point, c: Point, d: Point, n = 8): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / n,
      u = 1 - t
    return [
      rounded(u ** 3 * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t ** 3 * d[0]),
      rounded(u ** 3 * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t ** 3 * d[1]),
    ]
  })
}

// Right half of the head, from the nose on the centre line to the forewing root.
export const antennaShaft = 1.6
export const antennaClub = { x: 3.2, y: 2.6, rx: 2.0, ry: 2.5 }
function antennae(nose: number, foreRoot: number, root: Point): Point[] {
  const club = antennaClub
  const neckEnd = foreRoot - 8.5
  const start: Point = [0, nose]
  return [
    start,
    ...bezier(start, [1.6, nose - 0.2], [club.x + club.rx, nose - 0.4], [club.x + club.rx, nose + club.y]),
    ...bezier([club.x + club.rx, nose + club.y], [club.x + club.rx, nose + club.y + 2.6], [antennaShaft + 0.6, nose + club.y + club.ry + 1.2], [antennaShaft, nose + club.y + club.ry + 3]),
    [antennaShaft, rounded(neckEnd)],
    ...bezier([antennaShaft, neckEnd], [antennaShaft + 2.4, neckEnd + 0.4], [3.9, foreRoot - 5.5], [3.6, foreRoot - 3.2]),
    ...bezier([3.6, foreRoot - 3.2], [3.4, foreRoot - 1.6], [root[0] - 0.6, foreRoot - 0.4], root),
  ]
}

// Species art redrawn on the K2 outline, with antennae that stay inside the cut.
export function k2Art(o: K2Outline, appearance: string): Line[] {
  const g = o.model.geometry
  const lines = wingArt(o.model, appearance, o.span_mm, o.shape).filter(
    (line) => !line.id.startsWith('antenna'),
  )
  lines[0] = { ...lines[0], points: o.top }
  const inkOnly = appearance === 'coloring'
  const c = o.model.palettes[appearance as keyof typeof o.model.palettes]
  const club = antennaClub
  for (const side of [-1, 1]) {
    const m = ([x, y]: Point): Point => [rounded(side * x), rounded(y)]
    lines.push({
      id: 'antenna-' + side,
      points: [
        [0.7, g.fore_root_y - 9],
        [0.75, g.nose_y + club.y + club.ry + 4],
        [1.6, g.nose_y + club.y + club.ry + 1],
        [club.x - 0.4, g.nose_y + club.y + 0.8],
      ].map((p) => m(p as Point)),
      stroke: inkOnly ? c.ink : c.sun,
      weight: 0.5,
    })
    lines.push({
      id: 'antenna-club-' + side,
      points: Array.from({ length: 24 }, (_, i): Point => {
        const a = (i / 24) * 2 * Math.PI
        return m([club.x + 0.15 + 1.0 * Math.cos(a), g.nose_y + club.y + 0.4 + 1.5 * Math.sin(a)])
      }),
      closed: true,
      fill: inkOnly ? c.ink : c.sun,
    })
  }
  return lines
}

export function hemWidthAt(o: K2Outline, x: number): number {
  const [r, e] = o.costa
  const pose = k2Poses[o.model.species]
  const s = (x - r[0]) / ((e[0] - r[0]) / Math.hypot(e[0] - r[0], e[1] - r[1]))
  const reach = pose.hem_fraction * Math.hypot(e[0] - r[0], e[1] - r[1])
  if (s < 0 || s > reach) return 0
  return pose.hem_root_mm + (pose.hem_tip_mm - pose.hem_root_mm) * (s / reach)
}
