// K3 replaced the earlier butterfly folds on every list. These checks keep older shared books,
// Print & Play links and library addresses working.
import assert from 'node:assert/strict'
import test from 'node:test'
import { currentSheets, sheetCatalog, sheetIdFor, sheetPath } from '../apps/editor/family-sheets.js'
import { readSelection, resolvePlate } from '../apps/editor/print-and-play.js'
import { studioForBookSheet } from '../apps/editor/model-studio.js'
import { defaultSheets } from '../apps/editor/book-model.js'

const species = ['monarch', 'morpho', 'swallowtail']

test('K3 is the only butterfly fold offered; older sheets and links still resolve', () => {
  for (const s of species) assert.equal(sheetIdFor(s), s + '-k3')
  const offered = currentSheets.filter((e) => e.family === 'butterfly').map((e) => e.construction)
  assert.deepEqual([...new Set(offered)], ['k3'])
  for (const id of ['monarch', 'monarch-k1', 'monarch-k2', 'morpho-k2']) {
    const entry = sheetCatalog.find((e) => e.id === id)
    assert.ok(entry.retired, id)
    assert.match(sheetPath(id, 'A4', 'en'), /^library\//)
  }
  assert.equal(resolvePlate('monarch-k2').model, 'monarch')
  assert.equal(resolvePlate('monarch-k3').model, 'monarch')
  assert.deepEqual(readSelection('#m=monarch-k2,boeing-747&paper=a4').plates, readSelection('#m=monarch-k3,boeing-747&paper=a4').plates)
  assert.match(studioForBookSheet({ lang: 'en', paper: 'A4' }, 'monarch-k2'), /^\.\/costa\.html\?/)
  assert.match(studioForBookSheet({ lang: 'es', paper: 'A4' }, 'morpho-k3'), /species=morpho/)
})

test('new books start with the K3 butterflies', () => {
  for (const s of species) assert.ok(defaultSheets.includes(s + '-k3'))
  assert.ok(!defaultSheets.some((id) => /-k[12]$/.test(id)))
})
