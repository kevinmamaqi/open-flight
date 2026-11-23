// Paper coordinates are millimetres. Scene Y points up; the nose points towards negative Z.
import { butterflies } from './flight-butterflies.js'

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const radians = (n) => (n * Math.PI) / 180
const mix = (a, b, t) => a + (b - a) * t
const HIGHLIGHT = '#d43f26',
  CREASE = '#274263',
  FOAM = '#fffae9'
export const paletteNames = ['natural', 'carnival', 'twilight', 'coloring']
export const butterflyGeometry = butterflies
const unitSquare = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
]
const planeColors = {
  'boeing-747': ['#fff3de', '#e6663f', '#245682'],
  'douglas-dc3': ['#d6eeec', '#df963b', '#255f66'],
  'tupolev-tu144': ['#ffe8dd', '#dc5847', '#394974'],
  'ilyushin-il62': ['#dfedff', '#4a83bd', '#c44b45'],
}

export function rotate(point, a, b, angle) {
  const x = b[0] - a[0],
    y = b[1] - a[1],
    z = b[2] - a[2],
    len = Math.hypot(x, y, z)
  if (!angle || !len) return point
  const k = [x / len, y / len, z / len],
    v = point.map((n, i) => n - a[i])
  const dot = k[0] * v[0] + k[1] * v[1] + k[2] * v[2],
    c = Math.cos(angle),
    s = Math.sin(angle)
  const cross = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]]
  return v.map((n, i) => a[i] + n * c + cross[i] * s + k[i] * dot * (1 - c))
}

const segment = (world, points, color, dash = false) => world.lines.push({ points, color, dash })
const face = (world, flat, points, color, uv, image) =>
  world.faces.push({ flat, points, color, uv, image })
const board = (world, x, z, width, length, y, color) =>
  face(
    world,
    unitSquare,
    [
      [x, y, z],
      [x + width, y, z],
      [x + width, y, z + length],
      [x, y, z + length],
    ],
    color,
  )
const mark = ([x, y, z], rise = 0.3) => [x, y + rise, z]
function cutLine(world, points, color, dash) {
  segment(
    world,
    points.map((p) => mark(p)),
    color,
    dash,
  )
}
const angles = (state, g) => [state.leftWing ?? g.angle, state.rightWing ?? g.angle]
function butterfly(world, state, pose, foldedForFlight = false) {
  const g = butterflies[state.id]
  if (!g) return
  const p = state.parameters ?? {},
    span = p.span_mm || g.span,
    center = (g.range[0] + g.range[1]) / 2
  const stage = foldedForFlight ? 5 : state.stage,
    progress = foldedForFlight ? 1 : pose
  const levelAt = (step) => (stage > step ? 1 : stage === step ? progress : 0)
  const rootFactor = levelAt(2),
    tabFactor = levelAt(4),
    clipFactor = levelAt(3)
  const wingAngles = angles(state, g),
    trim = [p.left_trim_deg ?? 0, p.right_trim_deg ?? 0]
  const paper = ([x, z], side = 1) => [((x * span) / 200) * side, 0, z - center]
  const texture = paletteNames.includes(state.appearance) ? state.appearance : 'natural'
  const art = new URL('./assets/viewer/' + state.id + '-' + texture + '.webp', import.meta.url).href
  const uvAt = ([x, z], side = 1) => [
    (((x * g.span) / 200) * side + (g.span + 3.5) / 2) / (g.span + 3.5),
    1 - (z - g.range[0] + 1.75) / (g.range[1] - g.range[0] + 3.5),
  ]
  const bodyColor = texture === 'coloring' ? '#f6f2e5' : '#423341'
  const groundColor = { monarch: '#ff972f', morpho: '#39add1', swallowtail: '#ffd343' }[state.id]
  // Baseline textures are rasterizations of the flat print generator; each physical panel gets
  // its own original texture coordinates before the tab and wing rotations are composed.
  face(
    world,
    g.body,
    g.body.map((v) => paper(v)),
    bodyColor,
    g.body.map((v) => uvAt(v)),
    art,
  )
  for (const side of [-1, 1]) {
    const i = side === -1 ? 0 : 1
    const rootA = paper([g.root, g.fore], side),
      rootB = paper([g.root, g.hind], side)
    const hinge = g.hinges.map((v) => paper(v, side))
    const foldWing = (point) => rotate(point, rootA, rootB, radians(side * wingAngles[i] * rootFactor))
    const foldTab = (point) =>
      foldWing(rotate(point, hinge[0], hinge[1], radians(-side * trim[i] * tabFactor)))
    for (const [coords, transform] of [
      [g.wing, foldWing],
      [g.tab, foldTab],
    ]) {
      const flat = coords,
        corners = flat.map((v) => transform(paper(v, side)))
      face(
        world,
        flat,
        corners,
        texture === 'coloring' ? FOAM : groundColor,
        flat.map((v) => uvAt(v, side)),
        art,
      )
    }
    if (!foldedForFlight && state.marks) {
      cutLine(world, [foldWing(rootA), foldWing(rootB)], stage === 2 ? HIGHLIGHT : CREASE, true)
      cutLine(world, hinge.map(foldWing), stage === 4 ? HIGHLIGHT : CREASE, true)
      g.ends.forEach((v, index) =>
        cutLine(
          world,
          [foldTab(paper(v, side)), foldTab(hinge[index])],
          stage === 1 ? HIGHLIGHT : CREASE,
          false,
        ),
      )
      if (stage === 1)
        cutLine(
          world,
          [...g.wing, g.wing[0]].map((v) => paper(v, side)),
          HIGHLIGHT,
          false,
        )
    }
  }
  if (!foldedForFlight && stage === 0) {
    const sheetW = state.paper === 'letter' ? 215.9 : 210,
      sheetL = state.paper === 'letter' ? 279.4 : 297
    // The surrounding sheet is cropped in this close view. The rule stays true to the model.
    board(world, -sheetW / 2, -sheetL / 2, sheetW, sheetL, -1.2, '#fff9e6')
    world.faces.at(-1).ground = -1.2
    if (state.marks) {
      const z = (g.range[1] - g.range[0]) / 2 + 11
      segment(
        world,
        [
          [-25, -0.6, z],
          [25, -0.6, z],
        ],
        CREASE,
      )
      for (let i = 0; i <= 10; i++)
        segment(
          world,
          [
            [-25 + i * 5, -0.6, z],
            [-25 + i * 5, -0.6, z - (i % 5 === 0 ? 4 : 2)],
          ],
          CREASE,
        )
    }
  }
  if (clipFactor > 0) {
    // Rear bend reaches the printed cross at nose + clip_rear_from_nose_mm.
    const z = g.nose - center + g.clip,
      front = z - g.clip - 2,
      offset = (1 - clipFactor) * 14
    const loop = [
      [-1.4, z - 6],
      [-1.4, front + 3],
      [-0.9, front + 1],
      [1, front],
      [2.2, front + 0.7],
      [2.9, front + 2.7],
      [2.9, z - 2],
      [2, z - 0.6],
      [0.6, z],
      [-1.7, z - 0.15],
      [-2.9, z - 1.7],
      [-2.9, front + 7],
    ]
    const wire = loop.map(([x, v]) => [x, 0.8 + offset, v])
    segment(world, wire, '#334754')
    segment(
      world,
      wire.map(([x, y, v]) => [x + 0.42, y + 0.16, v + 0.15]),
      '#cfe9ed',
    )
  }
  if (!foldedForFlight && state.marks && stage === 3) {
    const station = g.nose + g.clip - center
    segment(
      world,
      [
        [-3, 1.2, station],
        [3, 1.2, station],
      ],
      HIGHLIGHT,
    )
    segment(
      world,
      [
        [0, 1.2, station - 2],
        [0, 1.2, station + 2],
      ],
      HIGHLIGHT,
    )
  }
}

// Clip only for rendering a rigid panel. Slabs meet on the same fold in the intact sheet.
function clipX(polygon, x, sign) {
  const result = []
  polygon.forEach((a, index) => {
    const b = polygon[(index + 1) % polygon.length],
      aDist = sign * (a[0] - x),
      bDist = sign * (b[0] - x)
    if (aDist >= -0.00001) result.push(a)
    if ((aDist > 0 && bDist < 0) || (aDist < 0 && bDist > 0))
      result.push([x, mix(a[1], b[1], aDist / (aDist - bDist))])
  })
  return result
}

// Map a clipped subpanel back to the uncreased sheet so its printed stripe stays attached.
function originalUV(polygon, source, original, width, height) {
  if (!original || original.length !== source.length || source.length < 3) return null
  const uv = ([x, y]) => [x / width, 1 - y / height]
  if (polygon === source) return original.map(uv)
  const a = source[0],
    b = source[1],
    dx = b[0] - a[0],
    dy = b[1] - a[1]
  for (let i = 2; i < source.length; i++) {
    const c = source[i],
      ex = c[0] - a[0],
      ey = c[1] - a[1],
      det = dx * ey - dy * ex
    if (Math.abs(det) < 0.00001) continue
    return polygon.map(([x, y]) => {
      const f = ((x - a[0]) * ey - (y - a[1]) * ex) / det,
        g = (dx * (y - a[1]) - dy * (x - a[0])) / det
      return uv(original[0].map((v, k) => v + (original[1][k] - v) * f + (original[i][k] - v) * g))
    })
  }
  return null
}

function plane(world, state, pose, foldedForFlight) {
  const d = state.planes
  if (!d?.width || !d?.height) return
  const colors = state.colors
    ? ['#fff4e2', state.colors[0], state.colors[1]]
    : (planeColors[state.id] ?? planeColors['boeing-747'])
  const visible = d.panels ?? [],
    moving = d.moves ?? []
  const centered = ([x, z], layer = 0) => [x - d.width / 2, layer, z - d.height / 2]
  function panel(polygon, points, side, active = false, source = polygon, original) {
    if (!polygon || polygon.length < 3) return
    const tint = side === 'back' ? colors[1] : colors[0]
    const uv = state.paperTexture && originalUV(polygon, source, original, d.width, d.height)
    face(world, polygon, points, uv ? '#fff4e4' : tint, uv, uv ? state.paperTexture : null)
    if (uv) world.faces.at(-1).singleSidedPrint = true
    if (state.marks || foldedForFlight)
      cutLine(world, [...points, points[0]], active ? HIGHLIGHT : colors[2])
  }
  // The whole-sheet workshop supplies each real moving layer and its crease in sheet coordinates.
  // Source polygons remain flat only for triangulation. The displayed points rotate rigidly in 3D.
  if ((foldedForFlight || d.kind === 'wings' || d.kind === 'tips') && d.stockOutline?.length) {
    const mid = d.width / 2,
      keel = d.keel_mm,
      tips = d.winglet_mm
    const centeredZ = foldedForFlight
      ? (Math.min(...d.stockOutline.map((v) => v[1])) + Math.max(...d.stockOutline.map((v) => v[1]))) / 2
      : d.height / 2
    const wingStep = !foldedForFlight && d.kind === 'wings'
    const finish = foldedForFlight ? 1 : wingStep ? 0 : pose
    const maxWing = mid - keel - tips
    const shapePoint = ([x, z], level, side) => {
      const dist = Math.abs(x - mid),
        wing = Math.max(0, dist - keel)
      const opening = wingStep ? clamp((pose - (side < 0 ? 0 : 0.46)) / 0.54, 0, 1) : 1
      const angle = radians(90 * (1 - opening) + (d.dihedral_deg ?? 8) * finish)
      const tipAngle = angle + (Math.PI / 2 - angle) * finish,
        inner = Math.min(wing, maxWing),
        tip = Math.max(0, wing - maxWing)
      const spread = inner * Math.cos(angle) + tip * Math.cos(tipAngle)
      return [
        side * (spread + 0.11 * (level + 1)),
        Math.min(dist, keel) - keel + inner * Math.sin(angle) + tip * Math.sin(tipAngle) + 0.13 * level,
        z - centeredZ,
      ]
    }
    // Every source layer is split at the four physical hinges before rotation. This keeps
    // the centre keel and upright tips connected and preserves the stepped nose and paper edges.
    const stocks = d.before?.length ? d.before : [{ face: 'front', polygon: d.stockOutline, z: 0 }]
    const stops = [0, tips, mid - keel, mid, mid + keel, d.width - tips, d.width]
    for (const layer of stocks) {
      for (let i = 1; i < stops.length; i++) {
        const lo = stops[i - 1],
          hi = stops[i]
        if (hi - lo < 0.001) continue
        const poly = clipX(clipX(layer.polygon, lo, 1), hi, -1)
        if (poly.length < 3) continue
        const side = hi <= mid ? -1 : 1,
          level = layer.z ?? 0
        panel(
          poly,
          poly.map((v) => shapePoint(v, level, side)),
          layer.face,
          false,
          layer.polygon,
          layer.original,
        )
      }
    }
    return
  }
  // Fold-and-reopen shows the crease forming in the middle of the scrub, then opens flat.
  const phase = d.reopen ? 1 - Math.abs(2 * pose - 1) : pose
  if (!moving.length || phase < 0.0001 || (phase > 0.9999 && !d.reopen)) {
    const layers = phase < 0.0001 ? (d.before ?? visible) : visible
    for (const p of layers)
      panel(
        p.polygon,
        p.polygon.map((v) => centered(v, (p.z ?? 0) * 0.22)),
        p.face,
        false,
        p.polygon,
        p.original,
      )
    if (state.marks)
      for (const hinge of d.hinges ?? [])
        cutLine(
          world,
          hinge.map((v) => centered(v, layers.length * 0.22 + 0.5)),
          HIGHLIGHT,
          true,
        )
    return
  }
  for (const p of d.fixed ?? [])
    panel(
      p.polygon,
      p.polygon.map((v) => centered(v, (p.z ?? 0) * 0.22)),
      p.face,
      false,
      p.polygon,
      p.original,
    )
  for (const [n, move] of moving.entries()) {
    const layer = ((d.fixed?.length ?? 1) + n + 0.5) * 0.22
    const hinge = move.hinge.map((v) => centered(v, layer))
    const [a, b] = move.hinge
    const side =
      move.from
        .map((v) => (b[0] - a[0]) * (v[1] - a[1]) - (b[1] - a[1]) * (v[0] - a[0]))
        .find((v) => Math.abs(v) > 0.0001) ?? 1
    const angle = -Math.sign(side) * move.angle_deg * phase
    const points = move.from.map((v) => rotate(centered(v, layer), hinge[0], hinge[1], radians(angle)))
    panel(
      move.from,
      points,
      phase > 0.5 ? (move.face === 'back' ? 'front' : 'back') : move.face,
      true,
      move.from,
      move.original,
    )
    if (state.marks) cutLine(world, hinge, HIGHLIGHT, true)
  }
}

const courses = {
  monarch: { range: 1, drift: 0, sway: 0, glide: 0.26 },
  morpho: { range: 0.83, drift: 0, sway: 6, glide: 0.44 },
  swallowtail: { range: 0.91, drift: 0, sway: 0, glide: 0.34 },
  'boeing-747': { range: 0.92, sway: 0, glide: 0.3 },
  'douglas-dc3': { range: 0.85, sway: 2, glide: 0.45 },
  'tupolev-tu144': { range: 1, sway: 0, glide: 0.19 },
  'ilyushin-il62': { range: 0.95, sway: 1, glide: 0.32 },
}
export function trajectory(state, t) {
  const c = courses[state.id] ?? courses.monarch
  // A repeatable family of illustrative curves. These coefficients are scene units, never
  // fitted performance data. Upturned right tab cues a right bank when viewed from behind.
  const p = state.parameters ?? {},
    bank = (state.releaseBank ?? 0) / 12
  const turn = clamp(((p.right_trim_deg ?? 0) - (p.left_trim_deg ?? 0)) / 18 + bank, -1, 1)
  const symmetric = clamp(((p.right_trim_deg ?? 0) + (p.left_trim_deg ?? 0)) / 24, -1, 1)
  const tip = state.id === 'morpho' ? 0.2 * Math.exp(-5 * t) * Math.sin(3 * Math.PI * t) : 0
  const x = turn * 81 * t * t + (c.sway ?? 0) * Math.sin(2 * Math.PI * t) * Math.sin(Math.PI * t)
  const y = 39 * (1 - t) + 20 * (c.glide + symmetric * 0.17) * Math.sin(Math.PI * t)
  return {
    point: [x, y, 116 - 236 * c.range * t],
    bank: -0.27 * bank * Math.exp(-2.7 * t) - 0.34 * turn * Math.sin(Math.PI * t) + tip,
  }
}
const scene = () => ({ faces: [], lines: [] })
export function makeWorld(state, progress) {
  const world = scene(),
    flight = state.mode === 'flight',
    renderModel = state.family === 'airplane' ? plane : butterfly
  if (!flight) {
    renderModel(world, state, progress, false)
    return world
  }
  const t = clamp(progress, 0, 1),
    dot = trajectory(state, t)
  const before = trajectory(state, Math.max(0, t - 0.005)).point,
    after = trajectory(state, Math.min(1, t + 0.005)).point
  const yaw = Math.atan2(after[0] - before[0], -(after[2] - before[2]))
  const desc = Math.atan2(after[1] - before[1], Math.hypot(after[2] - before[2], after[0] - before[0]))
  renderModel(world, state, 1, true)
  const width =
    state.family === 'airplane' ? (state.planes?.width ?? 210) : (state.parameters?.span_mm ?? 170)
  const scale = (state.family === 'airplane' ? 47 : 43) / width
  const transform = ([a, b, c]) => {
    const x = a * scale,
      y = b * scale,
      z = c * scale
    const bankedX = x * Math.cos(dot.bank) - y * Math.sin(dot.bank)
    const bankedY = y * Math.cos(dot.bank) + x * Math.sin(dot.bank)
    const pitchedY = bankedY * Math.cos(desc) - z * Math.sin(desc)
    const pitchedZ = bankedY * Math.sin(desc) + z * Math.cos(desc)
    return [
      dot.point[0] + bankedX * Math.cos(yaw) - pitchedZ * Math.sin(yaw),
      dot.point[1] + pitchedY,
      dot.point[2] + bankedX * Math.sin(yaw) + pitchedZ * Math.cos(yaw),
    ]
  }
  world.faces.forEach((face) => (face.points = face.points.map(transform)))
  world.lines.forEach((line) => (line.points = line.points.map(transform)))
  // The repeatable course is a miniature practice mat. Ground markers distinguish release,
  // position directly below the aircraft, and first contact with the floor.
  const landing = trajectory(state, 1).point
  const ground = (outline, y, color) => {
    face(
      world,
      outline,
      outline.map(([x, z]) => [x, y, z]),
      color,
    )
    world.faces.at(-1).ground = y
  }
  const disk = (x, z, rx, rz, y, color) =>
    ground(
      Array.from({ length: 32 }, (_, i) => {
        const a = (i * 2 * Math.PI) / 32
        return [x + rx * Math.cos(a), z + rz * Math.sin(a)]
      }),
      y,
      color,
    )
  const mat = [
    [-82, -135],
    [82, -135],
    [91, -126],
    [91, 126],
    [82, 135],
    [-82, 135],
    [-91, 126],
    [-91, -126],
  ]
  ground(mat, -5, '#8baea3')
  ground(mat, -3.7, '#dcebd4')
  for (let i = -75; i <= 75; i += 25)
    segment(
      world,
      [
        [i, -3.55, -128],
        [i, -3.55, 128],
      ],
      i === 0 ? '#75988b' : '#abc8b6',
      i === 0,
    )
  for (let i = -125; i <= 125; i += 25)
    segment(
      world,
      [
        [-84, -3.55, i],
        [84, -3.55, i],
      ],
      '#abc8b6',
    )
  disk(0, 116, 9, 9, -3.17, '#2e7663')
  disk(0, 116, 5, 5, -3.05, '#daead9')
  for (const [r, y, color] of [
    [10, -3.2, '#d7633a'],
    [6.6, -3.1, '#ffedbd'],
    [3.1, -2.98, '#e96c40'],
  ])
    disk(landing[0], landing[2], r, r, y, color)
  const shadowSize = 1 - clamp(dot.point[1] / 90, 0, 0.55)
  disk(dot.point[0], dot.point[2], 9.5 * shadowSize, 4 * shadowSize, -2.82, '#93b3a0')
  const ribbon = (fraction, width, yOffset, color) => {
    if (fraction < 0.005) return
    const centers = Array.from({ length: 30 }, (_, i) => trajectory(state, (fraction * i) / 29).point)
    const left = centers.map(([x, y, z]) => [x - width, y + yOffset, z])
    const right = centers.map(([x, y, z]) => [x + width, y + yOffset, z]).reverse()
    const pts = [...left, ...right]
    face(
      world,
      pts.map(([x, , z]) => [x, z]),
      pts,
      color,
    )
  }
  ribbon(1, 1.25, -0.12, '#98c7bd')
  ribbon(t, 1.2, 0.13, '#2d7180')
  segment(
    world,
    Array.from({ length: 65 }, (_, i) => trajectory(state, i / 64).point),
    '#275d68',
    true,
  )
  const flag = (x, z, h, color) => {
    segment(
      world,
      [
        [x, -2.7, z],
        [x, h + 4, z],
      ],
      '#375b54',
    )
    face(
      world,
      [
        [0, 0],
        [1, 0],
        [0, 1],
      ],
      [
        [x, h + 4, z],
        [x + 7, h + 2, z],
        [x, h - 1, z],
      ],
      color,
    )
  }
  if (state.id === 'swallowtail') {
    for (const x of [-41, 41]) {
      const z = -44,
        color = x < 0 ? '#db5d3e' : '#d59a2c'
      segment(
        world,
        [
          [x - 9, -2.7, z],
          [x - 9, 12, z],
          [x + 9, 12, z],
          [x + 9, -2.7, z],
        ],
        color,
      )
      flag(x - 9, z, 12, color)
    }
  } else if (state.id === 'morpho') {
    for (const x of [-22, 22]) flag(x, 35, 13, '#3d97a5')
  } else {
    for (const [i, z] of [45, -12, -69].entries()) {
      segment(
        world,
        [
          [-14, -3.07, z],
          [14, -3.07, z],
        ],
        '#718d80',
      )
      flag(i % 2 ? -18 : 18, z, 5, '#ef9e40')
    }
  }
  segment(world, [dot.point, [dot.point[0], -2.7, dot.point[2]]], '#618e84', true)
  return world
}
