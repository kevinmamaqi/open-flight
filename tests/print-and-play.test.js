import assert from 'node:assert/strict'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readBookURL } from '../apps/editor/book-model.js'
import {
  bookletLink, defaultPaper, designIds, maxDesigns, normalizeSelection, pageCount, pagePlan, printFilename,
  readSelection, readySets, selectionHash, staticPath, toggleDesign,
} from '../apps/editor/print-and-play.js'
import { quickGuideContent } from '../apps/editor/print-guide-content.js'
import { mergePdfs, setTitle } from '../apps/editor/print-merge.js'
import { buildMergeEngine, buildPrintAndPlay } from '../scripts/build_print_and_play.mjs'
import { renderPrintAndPlay } from '../packages/print-export/print-and-play.js'

const editor = new URL('../apps/editor/', import.meta.url)
const loadAsset = path => readFile(new URL(path, editor))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')

test('three ready sets, at most three designs, a fourth replaces the oldest', () => {
  assert.deepEqual(readySets.map(set => set.plates), [['B1', 'A1', 'F1'], ['A1', 'A2', 'F1'], ['F1', 'F2', 'F3']])
  assert.equal(maxDesigns, 3)
  assert.deepEqual(toggleDesign(['A1', 'A2', 'A3'], 'A4'), { plates: ['A2', 'A3', 'A4'], added: 'A4', removed: null, replaced: 'A1' })
  assert.deepEqual(toggleDesign(['A1', 'A2'], 'a1').plates, ['A2'])
  assert.throws(() => normalizeSelection({ plates: ['A1', 'A2', 'A3', 'A4'] }), RangeError)
  assert.throws(() => normalizeSelection({ plates: [] }), RangeError)
  assert.throws(() => normalizeSelection({ plates: ['A1', 'boeing-747'] }), /distinct/)
  assert.throws(() => normalizeSelection({ plates: ['Z9'] }), /Unknown design/)
  assert.deepEqual(normalizeSelection({ designs: ['boeing-747', 'monarch', 'ring'] }).plates, ['A1', 'B1', 'F1'])
})

test('paper follows the locale and file names carry ids, paper and language', () => {
  assert.equal(defaultPaper(['en-US']), 'US_LETTER')
  assert.equal(defaultPaper(['es-MX']), 'US_LETTER')
  assert.equal(defaultPaper(['es-ES', 'en-US']), 'A4')
  assert.equal(printFilename({ plates: ['B1', 'A1', 'F1'], paper: 'US_LETTER', lang: 'ru' }), 'open-flight-print-and-play-B1-A1-F1-letter-ru.pdf')
  assert.equal(staticPath({ plates: ['A1'], paper: 'A4', lang: 'es' }), 'print/singles/A1-a4-es.pdf')
  assert.equal(staticPath({ plates: ['B1', 'A1', 'F1'], paper: 'A4', lang: 'en' }), 'print/sets/first-flight-a4-en.pdf')
  assert.equal(staticPath({ plates: ['A1', 'A2', 'F1'], paper: 'A4', lang: 'en' }), null) // cut-border airplanes are not the No scissors set
  assert.equal(staticPath({ plates: ['A1', 'A2', 'F1'], paper: 'A4', lang: 'en', edge: 'whole' }), 'print/sets/no-scissors-a4-en.pdf')
})

test('the hash round-trips through the booklet reader and the booklet link always has m=', () => {
  const selection = { plates: ['B1', 'A1', 'F1'], paper: 'US_LETTER', lang: 'es', edge: 'cut' }
  const hash = selectionHash(selection)
  assert.equal(hash, '#m=monarch-k3,boeing-747&activities=ring&paper=letter')
  assert.deepEqual(readBookURL('https://openflight.design/book' + hash), { sheets: ['monarch-k3', 'boeing-747'], activities: ['ring'], paper: 'US_LETTER' })
  assert.deepEqual(readSelection(hash, ['en']).plates, ['B1', 'A1', 'F1'])
  assert.deepEqual(readSelection('#m=monarch-k1,boeing-747&paper=a4').plates, ['A1'])
  assert.deepEqual(readSelection('#m=a,b,c&activities=nope').plates, [])
  assert.match(bookletLink(selection), /^book\.html\?lang=es#m=monarch-k3,boeing-747&/)
  assert.match(bookletLink({ plates: ['F1'], paper: 'A4', lang: 'en' }), /#m=&/)
  assert.match(bookletLink({ plates: [], paper: 'A4', lang: 'ru' }), /#m=&paper=a4$/)
})

test('page plan: airplanes 2 pages, butterflies 3, objects 2; every design has a guide last', () => {
  const counts = Object.fromEntries(designIds.map(id => [id, pagePlan(id).length]))
  assert.deepEqual(counts, { A1: 2, A2: 2, A3: 2, A4: 2, A5: 2, A6: 2, A7: 2, A8: 2, B1: 3, B2: 3, B3: 3, F1: 2, F2: 2, F3: 2 })
  for (const id of designIds) assert.equal(pagePlan(id).at(-1).role, 'guide')
  assert.deepEqual(pagePlan('B1', { paper: 'A4', lang: 'es' }).map(p => p.source?.index ?? null), [0, 2, null])
  assert.equal(pagePlan('F2')[0].source.index, 1)
  assert.equal(pageCount(['B1', 'A1', 'F1']), 7)
  assert.equal(pagePlan('A1', { edge: 'whole' })[0].source.type, 'plane')
})

test('quick guide content: original name first, launch line, three trim rows and the untested note', () => {
  for (const lang of ['en', 'es', 'ru']) {
    const a1 = quickGuideContent('A1', lang)
    assert.equal(a1.id, 'A1')
    assert.equal(a1.trim.rows.length, 3)
    assert.match(a1.trim.note, /\S/)
    assert.equal(a1.url, 'https://openflight.design/' + (lang === 'en' ? '' : lang + '/') + 'airplanes/boeing-747/')
  }
  assert.equal(quickGuideContent('A1', 'en').name, 'Upper Deck')
  assert.equal(quickGuideContent('A1', 'es').name, 'Dos pisos')
  assert.match(quickGuideContent('A1', 'en', { edge: 'whole' }).materials.text, /No scissors/)
})

async function textOf(bytes) {
  const doc = await getDocument({ data: new Uint8Array(bytes), verbosity: 0 }).promise
  const pages = []
  for (let n = 1; n <= doc.numPages; n++) pages.push((await (await doc.getPage(n)).getTextContent()).items.map(i => i.str).join(' '))
  return pages
}

test('static build: 84 singles and 18 sets with plate IDs in the text, sane sizes, three pages', { timeout: 120000 }, async t => {
  const out = mkdtempSync(join(tmpdir(), 'print-and-play-'))
  t.after(() => rmSync(out, { recursive: true }))
  await buildPrintAndPlay(out)
  const singles = readdirSync(join(out, 'print/singles')), sets = readdirSync(join(out, 'print/sets'))
  assert.equal(singles.length, 84)
  assert.equal(sets.length, 18)
  const manifest = JSON.parse(readFileSync(join(out, 'print/manifest.json'), 'utf8'))
  assert.equal(Object.keys(manifest.files).length, 102)
  const expectedPages = { A: 2, B: 3, F: 2 }
  for (const name of singles) {
    const bytes = readFileSync(join(out, 'print/singles', name))
    assert.ok(bytes.length > 40 * 1024 && bytes.length < 470 * 1024, name + ' ' + bytes.length)
    assert.equal(manifest.files['singles/' + name].bytes, bytes.length)
  }
  for (const lang of ['en', 'es', 'ru']) {
    for (const id of designIds) {
      const pages = await textOf(readFileSync(join(out, `print/singles/${id}-a4-${lang}.pdf`)))
      assert.equal(pages.length, expectedPages[id[0]])
      assert.ok(pages.every(text => text.includes(id)), id + ' on every page')
      // Record planes credit their original instead of an Open Flight geometry licence.
      assert.ok(pages.at(-1).includes('© Open Flight') && (/^A[5-8]$/.test(id) || pages.at(-1).includes('CERN-OHL-W-2.0')))
    }
  }
  const sizeLimit = 1.2 * 1024 * 1024
  for (const set of readySets) {
    const bytes = readFileSync(join(out, `print/sets/${set.id}-letter-en.pdf`))
    assert.equal((await textOf(bytes)).length, pageCount(set.plates))
    assert.ok(bytes.length < sizeLimit, set.id + ' ' + bytes.length)
  }
  // Paper rules (9 pt, 0.3 mm, 6 mm edge, 50 mm line) hold for the cut-border files. The No scissors
  // set prints airplanes as whole sheets, whose livery art reaches the paper edge by design.
  const audited = ['B1', 'A1', 'F1', 'F2'].map(id => join(out, `print/singles/${id}-a4-en.pdf`))
    .concat(['A3', 'A4', 'B3', 'F3'].map(id => join(out, `print/singles/${id}-letter-ru.pdf`)),
      [join(out, 'print/sets/first-flight-letter-es.pdf'), join(out, 'print/sets/spin-and-glide-a4-en.pdf')])
  execFileSync(process.execPath, [new URL('../scripts/check_print_design.mjs', import.meta.url).pathname, ...audited], { stdio: 'pipe' })
  // One bytes everywhere: the set file, the service render and the browser-style join of the singles.
  const file = readFileSync(join(out, 'print/sets/first-flight-letter-es.pdf'))
  const joined = await mergePdfs(['B1', 'A1', 'F1'].map(id => readFileSync(join(out, `print/singles/${id}-letter-es.pdf`))), { title: setTitle(['B1', 'A1', 'F1']), lang: 'es' })
  const service = await renderPrintAndPlay({ designs: ['B1', 'boeing-747', 'ring'], paper: 'US_LETTER', lang: 'es' }, { loadAsset })
  assert.equal(sha(joined), sha(file))
  assert.equal(sha(service), sha(file))
  const single = await renderPrintAndPlay({ plates: ['A1'], paper: 'A4', lang: 'ru' }, { loadAsset })
  assert.equal(sha(single), sha(readFileSync(join(out, 'print/singles/A1-a4-ru.pdf'))))
  // Pages for the three languages and the sitemap-free page markup.
  for (const [path, lang, base] of [['print', 'en', '../'], ['es/print', 'es', '../../'], ['ru/print', 'ru', '../../']]) {
    const html = readFileSync(join(out, path, 'index.html'), 'utf8')
    assert.match(html, new RegExp(`<html lang="${lang}">`))
    assert.match(html, new RegExp(`src="${base.replaceAll('.', '\\.')}print\\.js`))
    assert.equal((html.match(/hreflang="/g) ?? []).length >= 4, true)
    assert.match(html, /data-site-page="print"/)
  }
})

test('the committed browser merge engine matches its source', async () => {
  assert.equal(readFileSync(new URL('print-merge-engine.js', editor), 'utf8'), await buildMergeEngine())
})
