import test from 'node:test'
import assert from 'node:assert/strict'
import { compareModels, designIds } from '../apps/editor/atlas-guide.js'
import { makeK2 } from '../packages/folded-butterfly/k2-sheet.ts'
import { planeCatalog } from '../packages/planes/index.ts'

test('each language can compare any distinct pair using the released fold and clip dimensions', () => {
  const expected = Object.fromEntries([
    ...(['monarch','morpho','swallowtail'] as const).map(species=>{
      const p = makeK2({species})
      return [species,[p.span_mm,p.dihedral_deg,p.tip_height_mm]]
    }),
    ...['ring', 'samara', 'tandem'].map(id => [id, []]),
    ...planeCatalog.map((p) => [p.model_id, [p.keel_mm, p.winglet_mm]]),
  ])
  assert.deepEqual(new Set(designIds), new Set(Object.keys(expected)))
  for (const locale of ['en', 'es', 'ru'] as const)
    for (const left of designIds)
      for (const right of designIds) {
        if (left === right) {
          assert.throws(() => compareModels(left, right, locale), RangeError)
          continue
        }
        const comparison = compareModels(left, right, locale)
        assert.equal(comparison.locale, locale)
        assert.deepEqual(
          comparison.models.map((m) => m.id),
          [left, right],
        )
        assert.ok(comparison.question.length > 20)
        for (const m of comparison.models) {
          assert.deepEqual(
            m.settings.map((s) => s.value),
            expected[m.id],
          )
          assert.ok(m.shape.length > 55 && m.experiment.length > 35)
          const studio = new URL(m.studio, 'https://example.test/')
          assert.equal(studio.searchParams.get('lang'), locale)
          if (m.family !== 'butterfly') assert.equal(studio.searchParams.get('model'), m.id)
          else assert.equal(studio.searchParams.get('species'), m.id)
        }
      }
})
