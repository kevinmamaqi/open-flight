// Trencadís for the K3 wings: the wing is broken into irregular glazed fragments with pale grout
// between them, the way Gaudí and Jujol covered Park Güell and the Palau de la Música's columns.
// Each fragment takes the colour the species art paints under its centre, varied a little like
// hand-glazed tile, so the monarch, morpho and swallowtail stay recognisable. A few fragments are
// "found" pieces in an accent colour. Deterministic for a given seed. Colour only: the caller keeps
// the cut outline, folds and markings.
import type { Line, Point } from '../geometry/butterfly.ts'

export type Mosaic = { grout: string; accents: string[]; piece_mm: number; gap_mm: number; accent_share: number }

function rng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32)
}
const r3 = (v: number) => Math.round(v * 1000) / 1000

function inside([x, y]: Point, poly: Point[]) {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}
const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
function convex(poly: Point[]) {
  const s = poly.map((_, i) => Math.sign(cross(poly[i], poly[(i + 1) % poly.length], poly[(i + 2) % poly.length])))
  return s.every((v) => v >= 0) || s.every((v) => v <= 0)
}
/** Sutherland–Hodgman: any subject polygon clipped by a convex polygon. */
function clip(subject: Point[], by: Point[]): Point[] {
  const dir = Math.sign(by.reduce((a, p, i) => a + cross([0, 0], p, by[(i + 1) % by.length]), 0)) || 1
  let out = subject
  for (let i = 0; i < by.length && out.length; i++) {
    const a = by[i], b = by[(i + 1) % by.length]
    const keep = (p: Point) => dir * cross(a, b, p) >= 0
    const cut = (p: Point, q: Point): Point => {
      const t = cross(a, b, p) / (cross(a, b, p) - cross(a, b, q))
      return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]
    }
    const input = out
    out = []
    for (let k = 0; k < input.length; k++) {
      const p = input[k], q = input[(k + 1) % input.length]
      if (keep(q)) { if (!keep(p)) out.push(cut(p, q)); out.push(q) } else if (keep(p)) out.push(cut(p, q))
    }
  }
  return out
}
function area(poly: Point[]) {
  return Math.abs(poly.reduce((a, p, i) => a + cross([0, 0], p, poly[(i + 1) % poly.length]), 0)) / 2
}

/** The inverse of a rigid transform (rotation and translation), found from three images. */
export function invertRigid(f: (p: Point) => Point): (q: Point) => Point {
  const t = f([0, 0]), ex = f([1, 0]), ey = f([0, 1])
  const a = ex[0] - t[0], b = ex[1] - t[1], c = ey[0] - t[0], d = ey[1] - t[1]
  const det = a * d - b * c
  return ([x, y]) => {
    const u = x - t[0], v = y - t[1]
    return [(d * u - c * v) / det, (-b * u + a * v) / det]
  }
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
function toHsl([r, g, b]: number[]) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h / 6, s, l]
}
function fromHsl([h, s, l]: number[]) {
  const k = (n: number) => (n + h * 12) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return '#' + [f(0), f(8), f(4)].map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
}
/** A hand-glazed variant: a little lighter or darker, a little richer. */
function glaze(colour: string, r: () => number) {
  const [h, s, l] = toHsl(hex(colour))
  return fromHsl([(h + (r() - 0.5) * 0.03 + 1) % 1, Math.min(1, s * (1.05 + r() * 0.2)), Math.min(0.94, Math.max(0.06, l + (r() - 0.5) * 0.16))])
}

/**
 * Trencadís fragments covering one posed wing outline (right side). `toRaw` carries a posed point
 * back to the species art frame, where `layers` (closed, filled, in paint order) give its colour;
 * a point under no layer takes `fallback`, the wing border ink.
 */
export function mosaicWing(id: string, outline: Point[], toRaw: (q: Point) => Point, layers: Line[], fallback: string, m: Mosaic, seed: number): Line[] {
  const r = rng(seed)
  const xs = outline.map((p) => p[0]), ys = outline.map((p) => p[1])
  const [x0, y0, x1, y1] = [Math.min(...xs) - m.piece_mm, Math.min(...ys) - m.piece_mm, Math.max(...xs) + m.piece_mm, Math.max(...ys) + m.piece_mm]
  const nx = Math.ceil((x1 - x0) / m.piece_mm), ny = Math.ceil((y1 - y0) / m.piece_mm)
  const grid: Point[][] = []
  for (let j = 0; j <= ny; j++) {
    grid.push([])
    for (let i = 0; i <= nx; i++) {
      const edge = i === 0 || j === 0 || i === nx || j === ny
      const jit = edge ? 0 : 0.36 * m.piece_mm
      grid[j].push([x0 + i * m.piece_mm + (r() - 0.5) * 2 * jit, y0 + j * m.piece_mm + (r() - 0.5) * 2 * jit])
    }
  }
  const cells: Point[][] = []
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const q: Point[] = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]]
    // Break about half the tiles once more along a diagonal, so the pieces are irregular.
    if (!convex(q) || r() < 0.28) {
      if (r() < 0.5) cells.push([q[0], q[1], q[2]], [q[0], q[2], q[3]])
      else cells.push([q[0], q[1], q[3]], [q[1], q[2], q[3]])
    } else cells.push(q)
  }
  const out: Line[] = []
  for (const cell of cells) {
    const piece = clip(outline, cell)
    if (piece.length < 3 || area(piece) < 0.6) continue
    const c: Point = [piece.reduce((a, p) => a + p[0], 0) / piece.length, piece.reduce((a, p) => a + p[1], 0) / piece.length]
    const raw = toRaw(c)
    let colour = fallback
    for (const layer of layers) if (layer.fill && inside(raw, layer.points)) colour = layer.fill
    colour = r() < m.accent_share ? m.accents[Math.floor(r() * m.accents.length)] : glaze(colour, r)
    // Pull every corner towards the centre so the grout shows between pieces.
    const shrunk = piece.map(([x, y]): Point => {
      const dx = x - c[0], dy = y - c[1], d = Math.hypot(dx, dy) || 1, k = Math.max(0, d - m.gap_mm) / d
      return [r3(c[0] + dx * k), r3(c[1] + dy * k)]
    })
    out.push({ id: `${id}-tessera-${out.length}`, points: shrunk, closed: true, fill: colour })
  }
  return out
}
