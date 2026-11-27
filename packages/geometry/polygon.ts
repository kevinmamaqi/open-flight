import type { Point } from './butterfly.ts'

export const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])

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

/** Sutherland–Hodgman: any subject polygon clipped by a convex polygon. */
export function clipPolygon(subject: Point[], by: Point[]): Point[] {
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
