import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { Workspace } from '../packages/product-core/workspace.ts'
import { sha256 } from '../packages/geometry/butterfly.ts'

test('drafts are transient, immutable templates fork with the exact edits and print the selected species', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'open-flight-workshop-'))
  const w = new Workspace(dir)
  t.after(() => {
    w.close()
    rmSync(dir, { recursive: true })
  })
  const count = () =>
    ['heads', 'revisions', 'artifacts', 'jobs', 'receipts'].map(
      (table) => w.db.prepare('SELECT COUNT(*) AS n FROM ' + table).get()!.n,
    )
  const guide = w.call('getFieldGuide')
  assert.equal(guide.species.length, 3)
  const metrics = new Set()
  const fullColorCuts = new Set()
  for (const { id: species, photo, en, ru } of guide.species) {
    assert.ok(photo.url.startsWith('https://pixabay.com/'))
    assert.ok(en.steps.length >= 4 && ru.steps.length === en.steps.length)
    const design = w.call('getDesignRevision', { design_id: 'butterfly-' + species, revision_id: 'w1' })
    const before = count()
    const draft = (params: object, appearance_id = 'natural') =>
      w.call('previewDraft', { design: design.ref, parameters: params, appearance_id })
    const natural = draft({})
    metrics.add(design.geometry.aspect_ratio)
    fullColorCuts.add(natural.svg)
    const changed = { span_mm: 154, left_trim_deg: -4, right_trim_deg: 8 }
    const result = draft(changed, 'carnival')
    assert.notEqual(result.svg, natural.svg)
    assert.notEqual(draft({ left_trim_deg: 8 }).svg, draft({ right_trim_deg: 8 }).svg)
    assert.notEqual(draft({}, 'coloring').svg, natural.svg)
    assert.deepEqual(count(), before)
    for (const outside of [
      { span_mm: 151 },
      { right_trim_deg: 14 },
      { left_trim_deg: -13 },
      { span_mm: 148, arbitrary: 1 },
    ]) {
      assert.throws(
        () => draft(outside),
        (err: any) => err.body.code === 'invalid_input',
      )
    }
    const args = {
      source: design.ref,
      name: 'Trim comparison',
      parameters: changed,
      appearance_id: 'carnival',
      idempotency_key: randomUUID(),
    }
    const fork = w.call('forkDesign', args)
    assert.deepEqual(w.call('forkDesign', args), fork)
    assert.equal(fork.species_id, species)
    assert.deepEqual(fork.parameters, changed)
    assert.equal(fork.provenance.parent.source_sha256, design.ref.source_sha256)
    assert.equal(fork.evidence_state, 'modified_experiment')
    assert.throws(
      () =>
        w.call('reviseDesign', {
          design_id: design.ref.design_id,
          expected_head_revision: 'w1',
          parameters: changed,
          idempotency_key: randomUUID(),
        }),
      (err: any) => err.body.code === 'forbidden',
    )
    const savedPreview = w.call('previewDesign', { design: fork.ref, idempotency_key: randomUUID() })
    assert.equal(sha256(result.svg), savedPreview.svg.sha256)
    for (const locale of ['en', 'ru']) {
      const lessons = w.call('listActivities', { locale, species_id: species })
      assert.equal(lessons.items.length, 2)
      const job = w.call('startExport', {
        design: fork.ref,
        formats: ['source_json', 'instructions', 'trial_sheet', 'svg', 'pdf', 'illustrated_guide'],
        page_size: 'A4',
        locale,
        idempotency_key: randomUUID(),
      })
      const content = (index: number) =>
        w.call('downloadArtifact', { artifact_id: job.artifact_ids[index] }).bytes as Buffer
      assert.equal(sha256(content(0)), fork.ref.source_sha256)
      assert.deepEqual(JSON.parse(content(0).toString()).parameters, changed)
      assert.ok(
        content(1)
          .toString()
          .includes((locale === 'en' ? en : ru).steps[1].body),
      )
      assert.equal(JSON.parse(content(2).toString()).protocol.protocol_id, 'wing-trim')
      assert.ok(content(3).toString().includes(fork.ref.source_sha256))
      assert.equal(content(4).subarray(0, 5).toString(), '%PDF-')
      const guideHtml = content(5).toString()
      assert.equal(guideHtml.split('data:image/svg+xml;base64,').length - 1, en.steps.length)
      assert.ok(guideHtml.includes('data:image/jpeg;base64,'))
      assert.ok(guideHtml.includes(fork.ref.source_sha256) && guideHtml.includes('154'))
      assert.ok(guideHtml.includes(locale === 'en' ? '4° down' : '4° вниз'))
    }
  }
  assert.equal(metrics.size, 3)
  assert.equal(fullColorCuts.size, 3)
})

test('an existing workshop acquires the three catalog models without touching a b1 private revision or its print bytes', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'open-flight-upgrade-'))
  let w = new Workspace(dir)
  t.after(() => {
    w.close()
    rmSync(dir, { recursive: true })
  })
  const b1 = w.call('getDesignRevision', { design_id: 'butterfly-001', revision_id: 'b1' })
  assert.equal(b1.ref.source_sha256, 'dc399ad2135cd4ef218455420a63e566f4d492494671475a4326285a74073ad1')
  const fork = w.call('forkDesign', {
    source: b1.ref,
    name: 'Existing drawing',
    idempotency_key: randomUUID(),
  })
  const print = (design: object) => {
    const job = w.call('startExport', {
      design,
      formats: ['pdf'],
      page_size: 'A4',
      locale: 'en',
      idempotency_key: randomUUID(),
    })
    return w.call('downloadArtifact', { artifact_id: job.artifact_ids[0] }).bytes
  }
  const stored = print(fork.ref)
  assert.deepEqual(
    print(b1.ref),
    readFileSync(new URL('../designs/butterfly-001/print/a4.pdf', import.meta.url)),
  )
  // Recreate the b1-only catalog an existing studio had immediately before updating.
  w.db.exec(
    "DELETE FROM revisions WHERE id IN ('butterfly-monarch','butterfly-morpho','butterfly-swallowtail'); DELETE FROM heads WHERE id IN ('butterfly-monarch','butterfly-morpho','butterfly-swallowtail')",
  )
  w.close()
  w = new Workspace(dir)
  assert.equal(w.call('listDesigns').items.length, 5)
  assert.deepEqual(
    w.call('getDesignRevision', { design_id: fork.ref.design_id, revision_id: 'r1' }),
    fork,
  )
  assert.deepEqual(print(fork.ref), stored)
  const reader = new Workspace(dir, true)
  try {
    assert.ok(
      reader.call('previewDraft', { design: b1.ref, parameters: { span_mm: 150 } }).svg.includes('<svg'),
    )
    assert.throws(
      () => reader.call('forkDesign', { source: b1.ref, name: 'Copy', idempotency_key: randomUUID() }),
      (err: any) => err.body.code === 'forbidden',
    )
  } finally {
    reader.close()
  }
})
