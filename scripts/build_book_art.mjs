import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'
import { sheetCatalog } from '../apps/editor/family-sheets.js'
import { appearanceArtPath, appearanceArtStyles, appearanceChoices } from '../apps/editor/model-appearance.js'
import { makePlane } from '../apps/editor/assets/planes/core.js'
import { stripes } from '../apps/editor/assets/planes/drawing.js'
import { makeWorld } from '../apps/editor/flight-geometry.js'
import {
  foldedGeometry,
  foldedPreview,
  makeFoldedButterfly,
} from '../packages/folded-butterfly/index.ts'

function keel(model, appearance) {
  const plan = makeFoldedButterfly({ species: model, appearance_id: appearance })
  const { left, right, outline } = foldedGeometry(plan)
  const { keel_depth_mm: depth, nose_y_mm: nose, abdomen_y_mm: tail } = plan
  const top = Math.min(...outline.map(([, y]) => y))
  const bottom = Math.max(...outline.map(([, y]) => y))
  const width = plan.flat_span_mm + 6
  const height = bottom - top + 6
  const center = (top + bottom) / 2
  const faces = [-1, 1].flatMap((side) => {
    const wing = side < 0 ? left : right
    // The two halves of the web fold vertically against one another.
    // The 0.24 mm separation represents the two paper surfaces for rendering.
    const wall = [[side * depth, nose], [0, nose], [0, tail], [side * depth, tail]]
    return [
      {
        flat: wing,
        points: wing.map(([x, y]) => [x - side * depth, 0, y - center]),
      },
      {
        flat: wall,
        points: wall.map(([x, y]) => [0.12 * side, Math.abs(x) - depth, y - center]),
      },
    ].map((face) => ({
      ...face,
      uv: face.flat.map(([x, y]) => [0.5 + x / width, 1 - (y - top + 3) / height]),
      image: 'keel',
    }))
  })
  const clipNose = nose - center - 1.3
  const clipStop = nose - center + plan.clip_station_mm
  // The folded body takes a 6–8 mm wide clip, gripping the vertical paper web.
  const clip = [
    [0, 0, clipStop - 4], [0, 0, clipNose + 3], [0, 0.7, clipNose + 1],
    [0, 2.5, clipNose], [0, 4.6, clipNose + 0.3], [0, 6.5, clipNose + 2],
    [0, 7, clipNose + 4], [0, 7, clipStop - 3], [0, 5.9, clipStop - 1],
    [0, 3.7, clipStop], [0, 1.5, clipStop - 0.7], [0, 0.8, clipStop - 2.8],
  ].map(([, rise, z]) => [0.55, rise - depth - 0.3, z])
  const sized = (svg) => svg.replace(
    '<svg ',
    `<svg width="${Math.round(width * 7)}" height="${Math.round(height * 7)}" `,
  )
  const svg = sized(foldedPreview(plan))
  const inkSvg = sized(foldedPreview({ ...plan, appearance_id: 'coloring' }))
  return { world: { faces, lines: [{ points: clip }] }, svg, inkSvg }
}

function modelFor(entry, appearance) {
  if (entry.construction === 'k1') return keel(entry.model, appearance)
  if (entry.construction === 'w1') {
    const world = makeWorld({
      family: entry.family,
      id: entry.model,
      appearance,
      stage: 5,
    }, 1)
    // The viewer represents the wire as an outline and a highlight. Use one solid wire here.
    world.lines = world.lines.slice(0, 1)
    const coloring = makeWorld({
      family: entry.family,
      id: entry.model,
      appearance: 'coloring',
      stage: 5,
    }, 1).faces[0].image
    return { world, coloring }
  }
  const plan = makePlane({ model_id: entry.model, livery: appearance })
  const frame = plan.steps.at(-1).frame
  const world = makeWorld({
    family: entry.family,
    id: entry.model,
    colors: plan.colors,
    planes: frame,
    paperTexture: 'plane',
  }, 1)
  return { world, decoration: stripes(plan), stock: [frame.width, frame.height] }
}

const editor = new URL('../apps/editor/', import.meta.url)
const output = new URL('assets/book/models/', editor)
const renderUrl = new URL('./render_book_art.js', import.meta.url).href
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || process.env.OPENFLIGHT_CHROME || undefined,
  args: ['--allow-file-access-from-files', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
let scratch
try {
  scratch = await mkdtemp(join(tmpdir(), 'open-flight-book-art-'))
  const documentUrl = pathToFileURL(join(scratch, 'art.html'))
  await writeFile(documentUrl, '<!doctype html><meta charset="utf-8">')
  const page = await browser.newPage()
  await page.goto(documentUrl.href)
  await page.evaluate(async (url) => { window.renderBookArt = (await import(url)).renderBookArt }, renderUrl)
  await mkdir(output, { recursive: true })
  for (const entry of sheetCatalog) {
    for (const [index, { id: appearance }] of appearanceChoices(entry.model).entries()) {
      const model = modelFor(entry, appearance)
      const styles = appearanceArtStyles.filter((style) =>
        index === 0 || appearanceArtPath(entry.id, style, appearance) !== appearanceArtPath(entry.id, style),
      )
      const files = await page.evaluate(({ entry, model, styles }) =>
        window.renderBookArt(entry, model, styles), { entry, model, styles })
      for (const [style, data] of Object.entries(files)) {
        const path = new URL(appearanceArtPath(entry.id, style, appearance), editor)
        await writeFile(path, Buffer.from(data.split(',')[1], 'base64'))
      }
    }
    console.log(entry.id)
  }
} finally {
  await browser.close()
  if (scratch) await rm(scratch, { recursive: true })
}
