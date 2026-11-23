import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { randomUUID } from 'node:crypto'
import { spawn } from 'node:child_process'
import { Workspace } from '../packages/product-core/workspace.ts'
import { Fault } from '../packages/product-core/contracts.ts'
import { model, outline, metrics, sha256 } from '../packages/geometry/butterfly.ts'
import { sizes, sheet, svg, pdf } from '../packages/print-export/sheets.ts'

function fixture(t: any) {
  const dir = mkdtempSync(join(tmpdir(), 'open-flight-unit-'))
  const w = new Workspace(dir)
  t.after(() => {
    w.close()
    rmSync(dir, { recursive: true })
  })
  const baseline = w.call('getDesignRevision', { design_id: 'butterfly-001', revision_id: 'b1' })
  const fork = () =>
    w.call('forkDesign', { source: baseline.ref, name: 'Test copy', idempotency_key: randomUUID() })
  return { w, dir, baseline, fork }
}
const code = (expected: string) => (e: unknown) => e instanceof Fault && e.body.code === expected

test('outline is symmetric, centered on its body and fits the same physical width on both paper sizes', (t) => {
  const { baseline } = fixture(t)
  for (const span of [148, 172, 184]) {
    const points = outline(span),
      xs = points.map(([x]) => x)
    assert.equal(Math.max(...xs) - Math.min(...xs), span)
    const set = new Set(points.map((p) => p.join(',')))
    for (const [x, y] of points) assert.ok(set.has([-x, y].join(',')))
    assert.ok(metrics(span).planform_area_mm2 > 0)
    for (const paper of ['A4', 'US_LETTER'] as const) {
      const scene = sheet({ ...baseline, parameters: { span_mm: span } }, paper, 'en')
      const ruler = scene.lines.find((l) => l.id === 'ruler')!
      assert.equal(ruler.points[1][0] - ruler.points[0][0], 50)
      assert.deepEqual([scene.width, scene.height], sizes[paper])
      for (const l of scene.lines)
        for (const [x, y] of l.points)
          assert.ok(x >= 10 && x <= scene.width - 10 && y >= 10 && y <= scene.height - 10)
      const svgBytes = svg(scene).toString()
      assert.ok(svgBytes.includes('id="trim--1"'))
      assert.ok(svgBytes.includes('id="clip-B"'))
    }
  }
})
test('source and print artifacts have stable independent identities; Russian and English share cut geometry', (t) => {
  const { w, baseline } = fixture(t)
  const design = baseline.ref
  const start = (locale: string, key = randomUUID()) =>
    w.call('startExport', {
      design,
      formats: ['pdf', 'source_json', 'svg', 'instructions', 'activity_assets', 'trial_sheet'],
      page_size: 'A4',
      locale,
      idempotency_key: key,
    })
  const en = start('en'),
    again = start('en'),
    ru = start('ru')
  assert.deepEqual(en.artifact_ids, again.artifact_ids)
  assert.equal(en.artifact_ids[1], ru.artifact_ids[1])
  const content = (id: string) => w.call('downloadArtifact', { artifact_id: id }).bytes as Buffer
  assert.equal(sha256(content(en.artifact_ids[1])), design.source_sha256)
  assert.match(content(ru.artifact_ids[3]).toString(), /Соберите планер/)
  assert.match(content(ru.artifact_ids[4]).toString(), /Садовые ворота/)
  assert.deepEqual(JSON.parse(content(en.artifact_ids[5]).toString()).trials, [])
  const cut = (id: string) =>
    content(id)
      .toString()
      .match(/<path id="cut"[^>]+>/)![0]
  assert.equal(cut(en.artifact_ids[2]), cut(ru.artifact_ids[2]))
  assert.equal(content(en.artifact_ids[0]).subarray(0, 5).toString(), '%PDF-')
  assert.notDeepEqual(content(en.artifact_ids[0]), content(ru.artifact_ids[0]))
  assert.deepEqual(pdf(sheet(baseline, 'A4', 'en')), content(en.artifact_ids[0]))
})
test('revision retry replays before checking head; changed input conflicts and stale writes cannot overwrite', (t) => {
  const { w, fork } = fixture(t),
    original = fork(),
    key = randomUUID()
  const edit = {
    design_id: original.ref.design_id,
    expected_head_revision: 'r1',
    parameters: { span_mm: 160 },
    idempotency_key: key,
  }
  const revised = w.call('reviseDesign', edit)
  assert.deepEqual(w.call('reviseDesign', edit), revised)
  assert.throws(
    () => w.call('reviseDesign', { ...edit, appearance_id: 'meadow' }),
    code('idempotency_conflict'),
  )
  assert.throws(
    () => w.call('reviseDesign', { ...edit, idempotency_key: randomUUID() }),
    code('revision_conflict'),
  )
  assert.equal(
    w.call('getDesignRevision', { design_id: original.ref.design_id, revision_id: 'r1' }).geometry
      .span_mm,
    172,
  )
  assert.deepEqual(revised.evidence_record_ids, [])
})
test('the two transports can share one database; another workspace cannot see its private objects', (t) => {
  const { w, dir, fork } = fixture(t),
    f = fork(),
    request = {
      design: f.ref,
      formats: ['pdf'],
      page_size: 'US_LETTER',
      locale: 'en',
      idempotency_key: randomUUID(),
    }
  const job = w.call('startExport', request)
  const reader = new Workspace(dir, true),
    other = new Workspace(join(dir, 'separate'))
  try {
    assert.deepEqual(reader.call('getJob', { job_id: job.job_id }), job)
    assert.throws(() => reader.call('startExport', request), code('forbidden'))
    for (const [op, args] of [
      ['getJob', { job_id: job.job_id }],
      ['getArtifact', { artifact_id: job.artifact_ids[0] }],
      ['getDesignRevision', { design_id: f.ref.design_id, revision_id: 'r1' }],
    ] as const) {
      assert.throws(() => other.call(op, args), code('not_found'))
    }
  } finally {
    reader.close()
    other.close()
  }
})
test('schema, evidence gates, immutable baseline, optimistic locking and bounded pagination reject impossible inputs', (t) => {
  const { w, baseline, fork } = fixture(t),
    d = fork(),
    key = randomUUID()
  const input = {
    design_id: d.ref.design_id,
    expected_head_revision: 'r1',
    parameters: {},
    idempotency_key: key,
  }
  for (const parameters of [{ span_mm: 167 }, { span_mm: 186 }, { span_mm: 0 }, { ballast: 10 }]) {
    assert.throws(() => w.call('reviseDesign', { ...input, parameters }), code('invalid_input'))
  }
  assert.throws(
    () => w.call('reviseDesign', { ...input, evidence_state: 'tested_baseline' }),
    code('invalid_input'),
  )
  assert.throws(
    () => w.call('reviseDesign', { ...input, design_id: model.model, expected_head_revision: 'b1' }),
    code('forbidden'),
  )
  assert.throws(
    () =>
      w.call('previewDesign', {
        design: { ...d.ref, source_sha256: baseline.ref.source_sha256 },
        idempotency_key: key,
      }),
    code('invalid_input'),
  )
  const page = w.call('listDesigns', { limit: 1 })
  assert.ok(page.next_cursor)
  const seen: string[] = []
  let current = page
  while (true) {
    seen.push(current.items[0].ref.design_id)
    if (!current.next_cursor) break
    current = w.call('listDesigns', { limit: 1, cursor: current.next_cursor })
  }
  assert.deepEqual(seen, [
    'butterfly-001',
    'butterfly-monarch',
    'butterfly-morpho',
    'butterfly-swallowtail',
    d.ref.design_id,
  ])
  assert.throws(() => w.call('listActivities', { cursor: page.next_cursor }), code('invalid_input'))
  assert.throws(() => w.call('inventFlight', {}), code('unsupported_capability'))
})
test('independent simultaneous writers can advance the same head only once', async (t) => {
  const { dir, w, fork } = fixture(t),
    d = fork()
  const worker =
    "import {Workspace} from './packages/product-core/workspace.ts';const w=new Workspace(process.argv[1]);try{const r=w.call('reviseDesign',JSON.parse(process.argv[2]));console.log(r.ref.revision_id);}catch(e){console.log(e.body?.code??e.message);}finally{w.close();}"
  function save(span: number): Promise<string> {
    const args = {
      design_id: d.ref.design_id,
      expected_head_revision: 'r1',
      parameters: { span_mm: span },
      idempotency_key: randomUUID(),
    }
    const child = spawn(process.execPath, [
      '--input-type=module',
      '-e',
      worker,
      dir,
      JSON.stringify(args),
    ])
    return new Promise((ok, fail) => {
      let output = ''
      child.stdout.on('data', (c) => (output += c))
      child.on('error', fail)
      child.on('close', (c) => (c === 0 ? ok(output.trim()) : fail(Error('Worker exit ' + c))))
    })
  }
  assert.deepEqual((await Promise.all([save(160), save(180)])).sort(), ['r2', 'revision_conflict'])
  assert.equal(
    w.call('getDesignRevision', { design_id: d.ref.design_id, revision_id: 'r1' }).head_revision_id,
    'r2',
  )
})
