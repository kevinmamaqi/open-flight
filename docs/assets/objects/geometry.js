import { objectPalettes, objectDrawing } from './appearance.js?v=efdc141e4945'

// Coordinates are millimetres. The ring uses an illustrative opening, which the builder measures after tucking.
export function objectModel(id, appearance = 'field', second = false) {
  const [paper, accent, detail] = objectPalettes[id][appearance]
  const faces = [],
    lines = []
  function panel(points, color) {
    // A local plane for triangulation also handles the vertical faces of the keel and ring.
    const a = points[0],
      b = points[1],
      c = points[2]
    const u = b.map((x, i) => x - a[i]),
      v = c.map((x, i) => x - a[i])
    const normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    const drop = normal.map(Math.abs).indexOf(Math.max(...normal.map(Math.abs)))
    faces.push({ points, color, flat: points.map((p) => p.filter((_, i) => i !== drop)) })
  }
  if (id === 'ring') {
    const radius = second ? 36 : 44
    const point = (i, z) => {
      const angle = (i * Math.PI) / 24
      return [radius * Math.cos(angle), radius * Math.sin(angle), z]
    }
    const tail = (i) => -8 + 48 * Math.abs(Math.cos((i * Math.PI) / 24))
    for (let i = 0; i < 48; i++) {
      panel([point(i, -28), point(i + 1, -28), point(i + 1, -18), point(i, -18)], accent)
      panel([point(i, -18), point(i + 1, -18), point(i + 1, tail(i + 1)), point(i, tail(i))], paper)
    }
  } else if (id === 'samara') {
    // Sample the printed Bezier outline at chord stations. Lift the dotted trailing edge
    // and map the original vein artwork back onto those panels at its print coordinates.
    const curves = [
      [
        [6.3, 20.5],
        [8, 13.8],
        [14, 13],
        [22, 15],
      ],
      [
        [22, 15],
        [39, 18],
        [65, 4.2],
        [111, 3.3],
      ],
      [
        [111, 3.3],
        [127, 2.9],
        [131, 9.5],
        [124, 16.5],
      ],
      [
        [124, 16.5],
        [108, 32.2],
        [62, 34],
        [29, 35.4],
      ],
      [
        [29, 35.4],
        [14, 40],
        [4, 35.8],
        [6.3, 20.5],
      ],
    ]
    const outline = curves.flatMap((curve) =>
      Array.from({ length: 24 }, (_, i) => {
        const t = i / 24,
          u = 1 - t
        return [0, 1].map(
          (axis) =>
            u ** 3 * curve[0][axis] +
            3 * u * u * t * curve[1][axis] +
            3 * u * t * t * curve[2][axis] +
            t ** 3 * curve[3][axis],
        )
      }),
    )
    const min = Math.min(...outline.map((p) => p[0])),
      max = Math.max(...outline.map((p) => p[0]))
    const stations = Array.from({ length: 37 }, (_, i) => {
      const x = min + 0.02 + ((max - min - 0.04) * i) / 36
      const ends = outline.flatMap(([ax, ay], j) => {
        const [bx, by] = outline[(j + 1) % outline.length]
        return (ax <= x && bx > x) || (bx <= x && ax > x) ? [ay + ((by - ay) * (x - ax)) / (bx - ax)] : []
      })
      const front = Math.min(...ends),
        chord = Math.max(...ends) - front
      return [0, 0.52, 1].map((k) => [x - 8.3, k * k * chord * 0.14, front + k * chord - 21])
    })
    for (let i = 1; i < stations.length; i++)
      for (let k = 0; k < 2; k++) {
        const a = stations[i - 1],
          b = stations[i]
        const points = [a[k], b[k], b[k + 1], a[k + 1]]
        panel(points, paper)
        const face = faces.at(-1)
        face.uv = points.map(([x, , z]) => [(x + 8.3) / 132, 1 - (z + 21) / 42])
        face.smooth = true
      }
    const z = second ? 9 : 0
    lines.push({
      points: [
        [-7, 1, z],
        [9, 1, z],
        [11, 1, z + 1],
        [11, 1, z + 3],
        [9, 1, z + 4],
        [-6, 1, z + 4],
        [-8, 0, z + 3],
        [-8, -1, z + 1],
        [7, -1, z + 1],
      ],
    })
  } else {
    panel(
      [
        [0, -4, -45],
        [0, 0, -45],
        [0, 0, 75],
        [0, -4, 75],
      ],
      detail,
    )
    for (const side of [-1, 1]) {
      for (const [start, span, tipChord, rootChord, color] of [
        [-33, 36, 26, 31, paper],
        [27, 32, 24, 29, accent],
      ]) {
        const tip = side * span,
          rise = second ? span * 0.16 : 0
        panel(
          [
            [0, 0, start],
            [tip, rise, start],
            [tip, rise, start + tipChord],
            [0, 0, start + rootChord],
          ],
          color,
        )
        panel(
          [
            [0, 0.12, start + 4],
            [tip, rise + 0.12, start + 4],
            [tip, rise + 0.12, start + 6],
            [0, 0.12, start + 6],
          ],
          detail,
        )
      }
    }
  }
  const model = { world: { faces, lines } }
  if (id === 'samara')
    model.textureUrl = new URL('./' + objectDrawing(id, appearance).split('/').at(-1), import.meta.url).href
  return model
}
