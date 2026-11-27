import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { PDFDocument } from 'pdf-lib'
import { sheetCatalog, sheetLocales, sheetPath, paperSizes } from '../apps/editor/family-sheets.js'
import { appearanceArtPath, appearanceArtStyles, appearanceChoices, appearanceCaption, sheetChoices } from '../apps/editor/model-appearance.js'
import { makePlane, planePdf, planeSpecimen, planeSvg, sheetSizes } from '../packages/planes/index.ts'
import { foldedPdf, makeFoldedButterfly } from '../packages/folded-butterfly/index.ts'
import { k2Pdf, makeK2 } from '../packages/folded-butterfly/k2-sheet.ts'
import { k3Pdf, makeK3 } from '../packages/folded-butterfly/k3-sheet.ts'
import { classicComparisonPdf } from '../packages/product-core/folded-butterflies.ts'
import { loadAppearanceSheet } from '../packages/print-export/appearance-sheet.js'

const asset = path => readFile(new URL('../apps/editor/' + path, import.meta.url))
const unexpectedAsset = path => assert.fail('Customized PDF tried to read ' + path)
const mmToPt = 72 / 25.4

async function verifyPages(bytes, count, paper, landscape = false) {
  const document = await PDFDocument.load(bytes)
  assert.equal(document.getPageCount(), count)
  const [portraitWidth, portraitHeight] = sheetSizes[paper]
  // The K2 and K3 butterfly sheets turn the same paper sideways so the wings run along the grain.
  const [width, height] = landscape ? [portraitHeight, portraitWidth] : [portraitWidth, portraitHeight]
  for (const page of document.getPages()) {
    assert.ok(Math.abs(page.getWidth() - width * mmToPt) < 0.01)
    assert.ok(Math.abs(page.getHeight() - height * mmToPt) < 0.01)
  }
}

test('every appearance has localized labels and matching model art', async () => {
  const paths = new Set()
  for (const sheet of sheetCatalog) {
    const choices = sheetChoices(sheet.id)
    // K3, the current butterfly, also offers the K3-only Barcelona design; retired sheets do not.
    assert.deepEqual(choices.map(choice => choice.id), sheet.family === 'butterfly'
      ? ['natural', 'carnival', 'twilight', 'coloring', ...(sheet.construction === 'k3' ? ['modernista'] : [])]
      : ['heritage', 'festival', 'pencil', 'airshow'])
    for (const lang of sheetLocales) {
      for (const { label, colors } of sheetChoices(sheet.id, lang)) {
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
  // 13 earlier sheets, three K3 butterflies and four record planes: each sheet × 4 appearances × 3 styles,
  // less the shared ink art; then Barcelona on the three K3 butterflies (studio and illustrated).
  assert.equal(paths.size, 117 + 27 + 36 + 6)
  assert.equal(appearanceChoices('monarch').at(-1).id, 'modernista')
  assert.throws(() => appearanceArtPath('monarch-k2', 'studio', 'modernista'), RangeError)
  assert.equal(appearanceChoices('tupolev-tu144', 'ru').some(choice => /флаг/i.test(choice.label)), false)
  assert.throws(() => appearanceArtPath('monarch-k1', 'studio', 'flag'), RangeError)
})

test('the 96 original PDFs are read directly and colored sheets use the studio renderers', async () => {
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
    const appearance = sheet.family === 'butterfly' ? 'carnival' : 'airshow'
    const colored = await loadAppearanceSheet(sheet.id, paper, lang, appearance, unexpectedAsset)
    assert.notDeepEqual(colored, await asset(sheetPath(sheet.id, paper, lang)))
    await verifyPages(colored, sheet.pages, paper, ['k2', 'k3'].includes(sheet.construction))
    if (sheet.construction === 'k3') {
      assert.deepEqual(colored, k3Pdf(makeK3({ species: sheet.model, paper, appearance_id: appearance, locale: lang })))
    } else if (sheet.construction === 'k2') {
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

test('airplane liveries keep the folds, print no flags, and the caption follows the livery', () => {
  for (const sheet of sheetCatalog.filter(item => item.family === 'airplane')) {
    assert.throws(() => makePlane({ model_id: sheet.model, livery: 'flag' }), RangeError)
    for (const paper of paperSizes) {
      const baseline = makePlane({ model_id: sheet.model, paper })
      for (const { id } of appearanceChoices(sheet.model)) {
        const plan = makePlane({ model_id: sheet.model, paper, livery: id })
        assert.deepEqual(plan.creases, baseline.creases)
        assert.deepEqual(plan.wingPolygon, baseline.wingPolygon)
        for (const lang of sheetLocales) {
          const caption = appearanceCaption(sheet.model, id, lang)
          assert.equal(makePlane({ model_id: sheet.model, paper, livery: id }, lang).field.finish, caption)
          assert.doesNotMatch(caption, /flag|bandera|флаг/i)
        }
      }
    }
    assert.notEqual(appearanceCaption(sheet.model, 'pencil', 'en'), appearanceCaption(sheet.model, 'heritage', 'en'))
  }
})
