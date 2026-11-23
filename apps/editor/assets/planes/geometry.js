// Each paper vertex keeps its position on the untouched sheet as well as its current position.
// Interpolating both at a hinge carries a crease through however many layers are under a fold.
const epsilon = 1e-7
const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
const cross = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])
const lerp = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]
const unique = (points) => points.filter((p, i) => !points.slice(0, i).some((q) => dist2(p, q) < epsilon))
export function area(points) {
  return Math.abs(
    points.reduce((sum, a, i) => {
      const b = points[(i + 1) % points.length]
      return sum + a[0] * b[1] - a[1] * b[0]
    }, 0) / 2,
  )
}
export function hull(points) {
  const sorted = unique(points).sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const chain = (seq) => {
    const part = []
    for (const p of seq) {
      while (part.length >= 2 && cross(part.at(-2), part.at(-1), p) <= epsilon) part.pop()
      part.push(p)
    }
    part.pop()
    return part
  }
  return [...chain(sorted), ...chain([...sorted].reverse())]
}
function reflect(p, [a, b]) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1]
  const d = cross(a, b, p) / (dx * dx + dy * dy)
  return [p[0] + 2 * d * dy, p[1] - 2 * d * dx]
}
function clip(vertices, line, sign) {
  const out = []
  for (let i = 0; i < vertices.length; i++) {
    const a = vertices[i],
      b = vertices[(i + 1) % vertices.length]
    const da = sign * cross(...line, a.p),
      db = sign * cross(...line, b.p)
    if (da >= -epsilon) out.push(a)
    if ((da > epsilon && db < -epsilon) || (da < -epsilon && db > epsilon)) {
      const t = da / (da - db)
      out.push({ p: lerp(a.p, b.p, t), o: lerp(a.o, b.o, t) })
    }
  }
  return out.length >= 3 && area(out.map((v) => v.p)) > epsilon ? out : []
}
export const openSheet = (w, h) => [
  {
    face: 'front',
    tag: '',
    vertices: [
      [0, 0],
      [w, 0],
      [w, h],
      [0, h],
    ].map((p) => ({ p, o: p })),
  },
]
export const publicPanels = (panels) =>
  panels.map(({ vertices, face }, z) => ({
    face,
    polygon: vertices.map((v) => v.p),
    original: vertices.map((v) => v.o),
    z,
  }))
export const outlineOf = (panels) => hull(panels.flatMap((p) => p.vertices.map((v) => v.p)))
const reverse = (face) => (face === 'front' ? 'back' : 'front')
function extremities(pts) {
  return pts.reduce(
    (best, a) => pts.reduce((pair, b) => (dist2(a, b) > dist2(...pair) ? [a, b] : pair), best),
    [pts[0], pts[0]],
  )
}

// Cut only the mathematical polygon at a hinge; each side remains part of one connected sheet.
export function applyFolds(base, ops, step, independent = false) {
  let panels = base
  const lifted = []
  const moves = [],
    creases = []
  for (const op of ops) {
    const sign = Math.sign(cross(...op.line, op.toward))
    const fixed = [],
      moving = []
    for (const panel of panels) {
      if (op.only && op.only !== panel.tag) {
        fixed.push(panel)
        continue
      }
      const stay = clip(panel.vertices, op.line, -sign)
      const flap = clip(panel.vertices, op.line, sign)
      if (stay.length) fixed.push({ ...panel, vertices: stay })
      if (!flap.length) continue
      const folded = flap.map((v) => ({ p: reflect(v.p, op.line), o: v.o }))
      moving.push({ face: reverse(panel.face), vertices: folded, tag: op.tag ?? panel.tag, movedAt: step })
      const onHinge = flap.filter((v) => Math.abs(cross(...op.line, v.p)) < 1e-4)
      if (stay.length && onHinge.length >= 2) {
        const original = extremities(onHinge.map((v) => v.o))
        if (dist2(...original) > 0.01) creases.push({ line: original, step, kind: op.kind ?? 'valley' })
      }
      moves.push({
        face: panel.face,
        from: flap.map((v) => v.p),
        to: folded.map((v) => v.p),
        original: flap.map((v) => v.o),
        hinge: op.line,
        angle_deg: op.under ? -180 : 180,
      })
    }
    // Each wing is raised separately. Its projected face cannot become a layer for its twin's crease.
    if (independent) {
      lifted.push(...moving.reverse())
      panels = fixed
    } else {
      panels = op.under ? [...moving.reverse(), ...fixed] : [...fixed, ...moving.reverse()]
    }
  }
  return {
    panels: [...panels, ...lifted],
    moves,
    creases,
    fixed: publicPanels(panels.filter((p) => p.movedAt !== step)),
  }
}
export function wingShape(stockOutline, width, keel, winglet) {
  const half = width / 2
  const left = clip(
    stockOutline.map((p) => ({ o: p, p })),
    [
      [half - keel, 0],
      [half - keel, 1],
    ],
    1,
  )
  const wing = left.map((v) => [v.p[0] + keel, v.p[1]])
  return winglet
    ? clip(
        wing.map((p) => ({ o: p, p })),
        [
          [keel + winglet, 0],
          [keel + winglet, 1],
        ],
        -1,
      ).map((v) => v.p)
    : wing
}
export function dedupeCreases(creases) {
  const seen = new Set()
  return creases.filter(({ line, step }) => {
    const key =
      step +
      '/' +
      line
        .map((p) => p.map((n) => n.toFixed(3)).join(','))
        .sort()
        .join('/')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
