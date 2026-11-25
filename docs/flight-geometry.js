import { sampleFlight, simulateFlight } from './flight-model.js?v=3b57e65abbf7'
// Paper coordinates are millimetres. Scene Y points up; the nose points towards negative Z.
import { butterflies } from './flight-butterflies.js?v=3b57e65abbf7'

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

const sceneScale = 30
const floorY = -2.4
const scenePoint = ([x, y, z]) => [sceneScale * x, floorY + sceneScale * y, -sceneScale * z]

export function practiceTabs({ trimDeg, trimDifferenceDeg }) {
  return {
    left: clamp(trimDeg - trimDifferenceDeg / 2, -12, 12),
    right: clamp(trimDeg + trimDifferenceDeg / 2, -12, 12),
  }
}
export function flightRun(state) {
  if (state.run) return state.run
  const params = state.parameters ?? {}
  const left = params.left_trim_deg ?? 0
  const right = params.right_trim_deg ?? 0
  return simulateFlight({
    trimDeg: (left + right) / 2,
    trimDifferenceDeg: right - left,
    bankDeg: state.releaseBank,
    ...state.launch,
  })
}

export function trajectory(state, t) {
  const sample = sampleFlight(flightRun(state), t)
  return {
    point: scenePoint(sample.point),
    bank: -radians(sample.bankDeg),
    yaw: radians(sample.headingDeg),
    pitch: radians(sample.pitchDeg),
    direction: radians(sample.directionDeg),
    time: sample.time,
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
  const run = flightRun(state)
  const dot = trajectory({ run }, progress)
  const { yaw, pitch } = dot
  const tabs = practiceTabs(run.inputs)
  renderModel(world, {
    ...state,
    parameters: { ...state.parameters, left_trim_deg: tabs.left, right_trim_deg: tabs.right },
  }, 1, true)
  const width =
    state.family === 'airplane' ? (state.planes?.width ?? 210) : (state.parameters?.span_mm ?? 170)
  // Enlarge the paper relative to the practice mat so the release attitude stays visible.
  const scale = 28 / width
  const transform = ([a, b, c]) => {
    const x = a * scale,
      y = b * scale,
      z = c * scale
    const bankedX = x * Math.cos(dot.bank) - y * Math.sin(dot.bank)
    const bankedY = y * Math.cos(dot.bank) + x * Math.sin(dot.bank)
    const pitchedY = bankedY * Math.cos(pitch) - z * Math.sin(pitch)
    const pitchedZ = bankedY * Math.sin(pitch) + z * Math.cos(pitch)
    return [
      dot.point[0] + bankedX * Math.cos(yaw) - pitchedZ * Math.sin(yaw),
      pitchedY,
      dot.point[2] + bankedX * Math.sin(yaw) + pitchedZ * Math.cos(yaw),
    ]
  }
  const parts = [...world.faces, ...world.lines]
  parts.forEach((part) => (part.points = part.points.map(transform)))
  // The solver follows one point, while the displayed glider is enlarged. Anchor its
  // lowest point to the tracked height so its silhouette reaches the floor at the stop.
  const lowest = Math.min(...parts.flatMap((part) => part.points.map((point) => point[1])))
  for (const part of parts)
    for (const point of part.points) point[1] = dot.point[1] + (point[1] - lowest)
  const path = run.samples.map((sample) => scenePoint(sample.point))
  const edge = 20
  const minX = Math.min(-65, ...path.map(([x]) => x - edge))
  const maxX = Math.max(65, ...path.map(([x]) => x + edge))
  const minZ = Math.min(-140, ...path.map(([, , z]) => z - edge))
  const maxZ = Math.max(24, ...path.map(([, , z]) => z + edge))
  const maxY = Math.max(70, ...path.map(([, y]) => y + edge))
  world.bounds = [minX, maxX].flatMap((x) =>
    [minZ, maxZ].flatMap((z) => [-3, maxY].map((y) => [x, y, z])),
  )
  const ground = (outline, y, color) => {
    face(world, outline, outline.map(([x, z]) => [x, y, z]), color)
    world.faces.at(-1).ground = y
  }
  const disk = (x, z, radius, y, color) =>
    ground(
      Array.from({ length: 24 }, (_, i) => {
        const a = (i * 2 * Math.PI) / 24
        return [x + radius * Math.cos(a), z + radius * Math.sin(a)]
      }),
      y,
      color,
    )
  ground([[minX, minZ], [maxX, minZ], [maxX, maxZ], [minX, maxZ]], floorY, '#dcebd4')
  for (let x = Math.ceil(minX / 30) * 30; x < maxX; x += 30)
    segment(world, [[x, -2, minZ], [x, -2, maxZ]], x === 0 ? '#64867a' : '#abc8b6', x === 0)
  for (let z = Math.ceil(minZ / 30) * 30; z < maxZ; z += 30)
    segment(world, [[minX, -2, z], [maxX, -2, z]], z === 0 ? '#64867a' : '#abc8b6', z === 0)
  disk(0, 0, 7, -1.55, '#2e7663')
  disk(0, 0, 3, -1.4, '#daead9')
  if (run.landing) {
    const [x, , z] = path.at(-1)
    disk(x, z, 7, -1.55, '#a6452c')
    disk(x, z, 3, -1.4, '#ffedbd')
  }
  disk(dot.point[0], dot.point[2], 5, -1.25, '#93b3a0')
  segment(world, path, '#487581', true)
  const next = run.samples.findIndex((sample) => sample.time > dot.time)
  const travelled = next < 0 ? path : path.slice(0, next)
  if (travelled.length) segment(world, [...travelled, dot.point], '#285964')
  segment(world, [dot.point, [dot.point[0], -1, dot.point[2]]], '#618e84', true)

  for (const { across, forward, width, bottom, top } of state.gateMarkers ?? []) {
    const x1 = across - width / 2
    const x2 = across + width / 2
    const a = scenePoint([x1, bottom, forward])
    const b = scenePoint([x1, top, forward])
    const c = scenePoint([x2, top, forward])
    const d = scenePoint([x2, bottom, forward])
    segment(world, [a, b, c, d], '#823763')
    segment(world, [scenePoint([x1, 0, forward]), b], '#823763', true)
    segment(world, [scenePoint([x2, 0, forward]), c], '#823763', true)
    segment(world, [scenePoint([x1, 0, forward]), scenePoint([x2, 0, forward])], '#823763')
    if (state.camera === 'side') {
      for (const y of new Set([bottom, top])) {
        segment(
          world,
          [scenePoint([0, y, forward - 0.16]), scenePoint([0, y, forward + 0.16])],
          '#823763',
        )
      }
    }
  }
  const vector = (a, color, length) => {
    const end = [
      dot.point[0] + length * Math.cos(a) * Math.sin(yaw),
      dot.point[1] + length * Math.sin(a),
      dot.point[2] - length * Math.cos(a) * Math.cos(yaw),
    ]
    const tail = (delta) => [
      end[0] - 5 * Math.cos(a + delta) * Math.sin(yaw),
      end[1] - 5 * Math.sin(a + delta),
      end[2] + 5 * Math.cos(a + delta) * Math.cos(yaw),
    ]
    segment(world, [dot.point, end], color)
    segment(world, [tail(0.55), end, tail(-0.55)], color)
  }
  if (dot.point[1] > floorY && state.camera !== 'top' && state.camera !== 'rear') {
    vector(dot.direction, '#172f33', 23)
    vector(dot.pitch, '#ba4f14', 29)
  }
  return world
}
