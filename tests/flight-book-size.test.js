import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { defaultSheets, normalizeBook, starterModels } from '../apps/editor/book-model.js'
import { estimateBookBytes } from '../apps/editor/book-size.js'
import { paperSizes, sheetCatalog, sheetIdFor, sheetIds, sheetLocales } from '../apps/editor/family-sheets.js'
import { createBook } from '../packages/print-export/family-book.js'

const assets = new Map()
const loadAsset = path => {
  if (!assets.has(path)) assets.set(path, readFile(new URL('../apps/editor/' + path, import.meta.url)))
  return assets.get(path)
}

const variants = [
  { sheets: ['tupolev-tu144'], style: 'ink' },
  { sheets: starterModels.map(id => sheetIdFor(id)), style: 'studio' },
  { sheets: sheetCatalog.filter(({ construction }) => construction === 'k1').map(({ id }) => id), style: 'ink' },
  { sheets: sheetCatalog.filter(({ construction }) => construction === 'w1').map(({ id }) => id), style: 'illustrated' },
  { sheets: sheetCatalog.filter(({ family }) => family === 'airplane').map(({ id }) => id), style: 'studio' },
  { sheets: defaultSheets, style: 'illustrated' },
  { sheets: [...sheetIds].reverse(), style: 'ink' },
  { sheets: ['morpho-k1','boeing-747','ilyushin-il62'], style:'illustrated', coverModel:'boeing-747', appearances:{morpho:'twilight','boeing-747':'airshow','ilyushin-il62':'airshow'} },
]

test('estimates rendered Flight Book sizes within 4% across locales, paper, styles and mixed legacy editions', async t => {
  let worst = { error: 0 }
  for (const lang of sheetLocales) for (const paper of paperSizes) {
    const letter = { en: 'W', es: 'Ñ', ru: 'Ш' }[lang]
    for (const [index, variant] of variants.entries()) {
      const book = normalizeBook({
        lang, paper, ...variant,
        pilot: index % 2 === 0 ? letter.repeat(40) : '',
        cover: index === variants.length - 1 ? letter.repeat(64) : '',
      })
      const estimate = estimateBookBytes(book)
      const actual = (await createBook(book, { loadAsset })).byteLength
      const error = Math.abs(estimate - actual) / actual
      if (error > worst.error) worst = { error, lang, paper, estimate, actual, index }
      assert.ok(error < 0.04, JSON.stringify(worst))
    }
  }
  t.diagnostic(`Maximum relative error: ${(worst.error * 100).toFixed(2)}% (${worst.lang} ${worst.paper}, ${worst.estimate} estimated vs ${worst.actual} rendered bytes)`)
})
