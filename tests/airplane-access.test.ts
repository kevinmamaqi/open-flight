import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { makePlane, planeGuide, planePdf, planeSource, planeSvg } from '../packages/planes/index.ts'
import { Fault } from '../packages/product-core/contracts.ts'
import { Workspace } from '../packages/product-core/workspace.ts'

test('read-only airplane settings round-trip, reproduce the chosen outputs and leave no workspace records', t => {
  const directory = mkdtempSync(join(tmpdir(), 'open-flight-plane-access-'))
  const workspace = new Workspace(directory, true)
  t.after(() => {
    workspace.close()
    rmSync(directory, { recursive: true })
  })
  const countRecords = () => ['heads', 'revisions', 'artifacts', 'jobs', 'receipts'].map(
    table => workspace.db.prepare('SELECT COUNT(*) AS n FROM ' + table).get()!.n,
  )
  const before = countRecords()
  const catalog = workspace.call('listAirplanes')
  assert.equal(catalog.items.length, 4)
  for (const model of catalog.items) {
    const baseline = workspace.call('planAirplane', { settings: { model_id: model.model_id }, output: 'source_json' })
    const source = JSON.parse(baseline.output.content)
    assert.deepEqual(source, baseline.settings)
    assert.equal(source.keel_mm, model.keel_mm)
    assert.equal(source.winglet_mm, model.winglet_mm)
    assert.equal(source.paper, 'A4')
    assert.equal(source.livery, 'heritage')
    const settings = { ...source, paper: 'US_LETTER', keel_mm: 28, winglet_mm: 0, livery: 'pencil' }
    const plan = makePlane(settings, 'ru')
    const expected = {
      plan: JSON.stringify(plan), guide: planeGuide(plan), svg: planeSvg(plan),
      pdf: planePdf(plan), source_json: planeSource(plan),
    }
    for (const [format, content] of Object.entries(expected)) {
      const result = workspace.call('planAirplane', { settings, locale: 'ru', output: format })
      assert.equal(result.evidence_state, 'concept')
      assert.deepEqual(result.settings, settings)
      assert.deepEqual(Buffer.from(result.output.content, result.output.encoding), Buffer.from(content))
    }
  }
  const badSettings = [
    { model_id: 'unknown' }, { model_id: 'boeing-747', keel_mm: 12.5 },
    { model_id: 'boeing-747', winglet_mm: 13 }, { model_id: 'boeing-747', revision: 'future' },
    { model_id: 'boeing-747', custom_fold: 10 },
  ]
  for (const settings of badSettings) {
    assert.throws(() => workspace.call('planAirplane', { settings }),
      (error: unknown) => error instanceof Fault && error.body.code === 'invalid_input')
  }
  assert.deepEqual(countRecords(), before)
})
