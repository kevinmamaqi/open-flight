import { makePlane } from './assets/planes/core.js?v=7988ca7cb2ce'
import { stripes } from './assets/planes/drawing.js?v=7988ca7cb2ce'
import { makeWorld } from './flight-geometry.js?v=7988ca7cb2ce'

// K2: the same folded body under swept forewings, with the clips in the longer head.
export function costaModel(plan, api) {
  const { k2Flat, k2Preview, makeK2 } = api
  const flat = k2Flat(plan)
  const { keel_depth_mm: depth, nose_y_mm: nose, tail_y_mm: tail } = plan
  const outline = flat.outline
  const top = Math.min(...outline.map(([, y]) => y))
  const bottom = Math.max(...outline.map(([, y]) => y))
  const xs = outline.map(([x]) => x)
  const width = Math.max(...xs) - Math.min(...xs) + 6
  const height = bottom - top + 6
  const center = (top + bottom) / 2
  // The finished wings are the top outline beside the body web; the hem is folded underneath.
  const half = plan.outline.top.slice(0, plan.outline.top.findIndex(([x], i) => i > 0 && x === 0) + 1)
  const angle = (plan.dihedral_deg * Math.PI) / 180
  const faces = [-1, 1].flatMap((side) => {
    const wing = half.map(([x, y]) => [side * x + side * depth, y])
    const wall = [
      [side * depth, nose],
      [0, nose],
      [0, tail],
      [side * depth, tail],
    ]
    return [
      {
        flat: wing,
        points: wing.map(([x, y]) => [
          (x - side * depth) * Math.cos(angle),
          Math.abs(x - side * depth) * Math.sin(angle),
          y - center,
        ]),
      },
      { flat: wall, points: wall.map(([x, y]) => [0.12 * side, Math.abs(x) - depth, y - center]) },
    ].map((face) => ({
      ...face,
      uv: face.flat.map(([x, y]) => [0.5 + x / width, 1 - (y - top + 3) / height]),
      image: 'keel',
    }))
  })
  const clipNose = nose - center - 1.3
  const clipStop = plan.wing_root_y_mm - 3 - center
  const clip = [
    [clipStop - 4, 0],
    [clipNose + 3, 0],
    [clipNose + 1, 0.7],
    [clipNose, 2.5],
    [clipNose + 0.3, 4.6],
    [clipNose + 2, 6.5],
    [clipNose + 4, 7],
    [clipStop - 3, 7],
    [clipStop - 1, 5.9],
    [clipStop, 3.7],
    [clipStop - 0.7, 1.5],
    [clipStop - 2.8, 0.8],
  ].map(([z, rise]) => [0.55, rise - depth - 0.3, z])
  const sized = (svg) =>
    svg.replace('<svg ', `<svg width="${Math.round(width * 7)}" height="${Math.round(height * 7)}" `)
  const svg = sized(k2Preview(plan))
  const inkSvg = sized(
    k2Preview(makeK2({ species: plan.species, span_mm: plan.span_mm, appearance_id: 'coloring' })),
  )
  return {
    world: { faces, lines: [{ points: clip }, { points: clip.map(([x, y, z]) => [-x, y, z + 1]) }] },
    svg,
    inkSvg,
  }
}

// K3: swept wings above a tapered keel, the clips pushed onto the head. Faces come from the
// printed geometry (k3Faces), textured with the flat sheet.
export function dartModel(plan, api) {
  const { k3Faces, k3Preview, k3PreviewBox, makeK3 } = api
  const box = k3PreviewBox(plan)
  const { faces, clips } = k3Faces(plan)
  const uv = ([x, y]) => [0.5 + x / box.width, 1 - (y - box.top + 3) / box.height]
  const sized = (svg) =>
    svg.replace('<svg ', `<svg width="${Math.round(box.width * 7)}" height="${Math.round(box.height * 7)}" `)
  return {
    world: {
      faces: faces.map((face) => ({ flat: face.flat, points: face.points, uv: face.flat.map(uv), image: 'keel' })),
      lines: clips.map((points) => ({ points })),
    },
    svg: sized(k3Preview(plan)),
    inkSvg: sized(k3Preview(makeK3({ species: plan.species, span_mm: plan.span_mm, appearance_id: 'coloring' }))),
  }
}

export function planeModel(id, appearance, paper = 'A4') {
  const plan = makePlane({ model_id: id, livery: appearance, paper })
  const frame = plan.steps.at(-1).frame
  const world = makeWorld(
    {
      family: 'airplane',
      id: id,
      colors: plan.colors,
      planes: frame,
      paperTexture: 'plane',
    },
    1,
  )
  return { world, decoration: stripes(plan), stock: [frame.width, frame.height] }
}
