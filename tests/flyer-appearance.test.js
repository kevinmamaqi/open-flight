import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { PDFDocument } from 'pdf-lib'
import { sheetCatalog, sheetLocales, sheetPath, paperSizes } from '../apps/editor/family-sheets.js'
import { appearanceArtPath, appearanceArtStyles, appearanceChoices } from '../apps/editor/model-appearance.js'
import { makePlane, planePdf, planeSpecimen, planeSvg, sheetSizes } from '../packages/planes/index.ts'
import { foldedPdf, makeFoldedButterfly } from '../packages/folded-butterfly/index.ts'
import { k2Pdf, makeK2 } from '../packages/folded-butterfly/k2-sheet.ts'
import { classicComparisonPdf } from '../packages/product-core/folded-butterflies.ts'
import { loadAppearanceSheet } from '../packages/print-export/appearance-sheet.js'

const asset = path => readFile(new URL('../apps/editor/' + path, import.meta.url))
const unexpectedAsset = path => assert.fail('Customized PDF tried to read ' + path)
const mmToPt = 72 / 25.4

async function verifyPages(bytes, count, paper, landscape = false) {
  const document = await PDFDocument.load(bytes)
  assert.equal(document.getPageCount(), count)
  const [portraitWidth, portraitHeight] = sheetSizes[paper]
  // The K2 butterfly sheet turns the same paper sideways so the wings run along the grain.
  const [width, height] = landscape ? [portraitHeight, portraitWidth] : [portraitWidth, portraitHeight]
  for (const page of document.getPages()) {
    assert.ok(Math.abs(page.getWidth() - width * mmToPt) < 0.01)
    assert.ok(Math.abs(page.getHeight() - height * mmToPt) < 0.01)
  }
}

test('every appearance has localized labels and matching model art', async () => {
  const paths = new Set()
  for (const sheet of sheetCatalog) {
    const choices = appearanceChoices(sheet.model)
    assert.deepEqual(choices.map(choice => choice.id), sheet.family === 'butterfly'
      ? ['natural', 'carnival', 'twilight', 'coloring']
      : ['heritage', 'festival', 'pencil', 'flag'])
    for (const lang of sheetLocales) {
      for (const { label, colors } of appearanceChoices(sheet.model, lang)) {
        assert.ok(label)
        assert.ok(colors.every(color => /^#[0-9a-f]{6}$/i.test(color)))
      }
    }
    for (const style of appearanceArtStyles) {
      const original = appearanceArtPath(sheet.id, style)
      const baseline = await asset(original)
      for (const { id } of choices) {
        const path = appearanceArtPath(sheet.id, style, id)
        paths.add(path)
        if (path !== original) assert.notDeepEqual(await asset(path), baseline)
        else assert.ok(baseline.length)
      }
    }
  }
  assert.equal(paths.size, 121)
  assert.equal(appearanceChoices('tupolev-tu144', 'ru').at(-1).label, 'Флаг СССР')
  assert.throws(() => appearanceArtPath('monarch-k1', 'studio', 'flag'), RangeError)
})

test('the 78 original PDFs are read directly and colored sheets use the studio renderers', async () => {
  for (const sheet of sheetCatalog) {
    for (const paper of paperSizes) {
      for (const lang of sheetLocales) {
        const path = sheetPath(sheet.id, paper, lang)
        const original = await asset(path)
        const [baseline] = appearanceChoices(sheet.model)
        assert.equal(await loadAppearanceSheet(sheet.id, paper, lang, baseline.id, async requested => {
          assert.equal(requested, path)
          return original
        }), original)
      }
    }
    const paper = 'US_LETTER'
    const lang = 'es'
    const appearance = sheet.family === 'butterfly' ? 'carnival' : 'flag'
    const colored = await loadAppearanceSheet(sheet.id, paper, lang, appearance, unexpectedAsset)
    assert.notDeepEqual(colored, await asset(sheetPath(sheet.id, paper, lang)))
    await verifyPages(colored, sheet.pages, paper, sheet.construction === 'k2')
    if (sheet.construction === 'k2') {
      assert.deepEqual(colored, k2Pdf(makeK2({ species: sheet.model, paper, appearance_id: appearance, locale: lang })))
    } else if (sheet.family === 'butterfly') {
      const plan = makeFoldedButterfly({ species: sheet.model, paper, appearance_id: appearance }, lang)
      assert.deepEqual(colored, sheet.construction === 'k1' ? foldedPdf(plan) : classicComparisonPdf(plan))
    } else {
      const plan = makePlane({ model_id: sheet.model, paper, livery: appearance }, lang)
      assert.deepEqual(colored, planePdf(plan))
    }
  }
})

test('an airplane with original colors and a whole-sheet edge is drawn instead of read from the cut-border library', async () => {
  for (const sheet of sheetCatalog.filter(item => item.family === 'airplane')) {
    const [baseline] = appearanceChoices(sheet.model)
    const whole = await loadAppearanceSheet(sheet.id, 'A4', 'en', baseline.id, unexpectedAsset, 'whole')
    assert.deepEqual(whole, planePdf(makePlane({ model_id: sheet.model, paper: 'A4', edge: 'whole' }, 'en')))
    assert.notDeepEqual(whole, await asset(sheetPath(sheet.id, 'A4', 'en')))
  }
})

test('country flags render on airplane stock and exposed wing panels without changing folds', () => {
  for (const sheet of sheetCatalog.filter(item => item.family === 'airplane')) {
    for (const paper of paperSizes) {
      const baseline = makePlane({ model_id: sheet.model, paper })
      const flagged = makePlane({ model_id: sheet.model, paper, livery: 'flag' })
      assert.deepEqual(flagged.creases, baseline.creases)
      assert.deepEqual(flagged.wingPolygon, baseline.wingPolygon)
      const flagColor = ['tupolev-tu144', 'ilyushin-il62'].includes(sheet.model)
        ? ['#CC0000', '#FFD700']
        : ['#B31942', '#0A3161']
      const svg = planeSvg(flagged)
      const specimen = planeSpecimen(flagged)
      for (const color of flagColor) {
        assert.ok(svg.includes('fill="' + color + '"'))
        assert.ok(specimen.includes('fill="' + color + '"'))
      }
    }
  }
})
