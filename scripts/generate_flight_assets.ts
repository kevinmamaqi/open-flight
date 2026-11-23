import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { Point } from '../packages/geometry/butterfly.ts'
import { trimGeometry, wingShape } from '../packages/geometry/workshop-art.ts'
import { workshopModels } from '../packages/geometry/workshop-models.ts'
import { workshopPreview } from '../packages/print-export/workshop.ts'

const output = new URL('../apps/editor/', import.meta.url)
const round = (value: number) => Math.round(value * 1000) / 1000
const clean = (points: Point[]) => points.map(([x, y]) => [round(x), round(y)])
const same = (a: Point, b: Point) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.00001
const geometries = Object.fromEntries(
  workshopModels.map((model) => {
    const shape = wingShape(model)
    const { hinges, ends } = trimGeometry(model, shape.trailing)
    // Insert each trim slit on the actual sampled trailing edge, including irregular swallowtail contours.
    const station = (point: Point) =>
      shape.trailing.findIndex((b, i) => {
        if (!i) return false
        const a = shape.trailing[i - 1]
        return (
          Math.abs(
            Math.hypot(b[0] - a[0], b[1] - a[1]) -
              Math.hypot(b[0] - point[0], b[1] - point[1]) -
              Math.hypot(a[0] - point[0], a[1] - point[1]),
          ) < 0.00001
        )
      })
    const [inner, outer] = ends.map(station)
    if (outer < 1 || inner <= outer) throw Error('Missing trim intersection: ' + model.species)
    const wing = [
      ...shape.fore.points,
      ...shape.trailing.slice(1, outer),
      ends[1],
      hinges[1],
      hinges[0],
      ends[0],
      ...shape.trailing.slice(inner),
    ]
    const tab = [hinges[1], ends[1], ...shape.trailing.slice(outer, inner), ends[0], hinges[0]]
    const g = model.geometry
    const fore = shape.outline.findIndex((p) => same(p, [g.root_x, g.fore_root_y]))
    const hind = shape.outline.findIndex((p) => same(p, [g.root_x, g.hind_root_y]))
    const abdomen = shape.outline.findIndex((p) => same(p, [0, g.abdomen_y]))
    if (fore < 1 || hind < fore || abdomen < hind) throw Error('Missing root: ' + model.species)
    const spine = [...shape.outline.slice(0, fore + 1), ...shape.outline.slice(hind, abdomen + 1)]
    const body: Point[] = [
      ...spine,
      ...spine
        .slice(1, -1)
        .reverse()
        .map(([x, y]): Point => [-x, y]),
    ]
    const min = Math.min(...shape.outline.map((p) => p[1])),
      max = Math.max(...shape.outline.map((p) => p[1]))
    for (const appearance of model.appearances) {
      const palette = appearance.appearance_id
      const texture = fileURLToPath(
        new URL('assets/viewer/' + model.species + '-' + palette + '.webp', output),
      )
      execFileSync(
        'magick',
        [
          '-background',
          'none',
          '-density',
          '110',
          'msvg:-',
          '-resize',
          '640x',
          '-quality',
          '90',
          '-define',
          'webp:method=6',
          texture,
        ],
        {
          input: workshopPreview(model, model.parameters, palette),
        },
      )
    }
    return [
      model.species,
      {
        wing: clean(wing),
        tab: clean(tab),
        body: clean(body),
        hinges: clean(hinges),
        ends: clean(ends),
        range: [round(min), round(max)],
        root: g.root_x,
        fore: g.fore_root_y,
        hind: g.hind_root_y,
        nose: g.nose_y,
        clip: g.clip_rear_from_nose_mm,
        angle: g.target_dihedral_deg,
        span: model.parameters.span_mm,
      },
    ]
  }),
)
writeFileSync(
  new URL('flight-butterflies.js', output),
  '// Generated from the same cut paths as the PDF by scripts/generate_flight_assets.ts.\nexport const butterflies = ' +
    JSON.stringify(geometries) +
    '\n',
)
