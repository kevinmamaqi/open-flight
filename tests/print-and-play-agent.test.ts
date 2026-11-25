import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { Workspace } from '../packages/product-core/workspace.ts'
import { catalog, Fault } from '../packages/product-core/contracts.ts'
import { sha256 } from '../packages/geometry/butterfly.ts'
import { renderPrintAndPlay } from '../packages/print-export/print-and-play.js'

const loadAsset = (path: string) => readFile(new URL('../apps/editor/' + path, import.meta.url))
const workspace = (t: any, readOnly = false) => {
  const dir = mkdtempSync(join(tmpdir(), 'print-agent-'))
  const w = new Workspace(dir, readOnly)
  t.after(() => { w.close(); rmSync(dir, { recursive: true }) })
  return w
}

test('print_and_play is one operation across HTTP, MCP and the service, on a read grant', (t) => {
  const tool = catalog.tools.find((entry) => entry['x-operationId'] === 'printAndPlay')! as any
  assert.equal(tool.name, 'openflight_print_and_play')
  assert.deepEqual(tool['x-http'].method + ' ' + tool['x-http'].path, 'POST /v1/print-and-play')
  assert.deepEqual(tool['x-required-scopes'], ['openflight:designs:read'])
  const w = workspace(t, true)
  assert.ok((w.call('getCapabilities').enabled_operations as string[]).includes('printAndPlay'))
})

test('the service returns the plan and the same bytes as the website for the same input', async (t) => {
  const w = workspace(t)
  const args = { designs: ['B1', 'boeing-747', 'ring'], paper: 'US_LETTER', lang: 'es' }
  const plan = await w.call('printAndPlay', args)
  assert.deepEqual(plan.settings, { designs: ['B1', 'A1', 'F1'], lang: 'es', paper: 'US_LETTER', edge: 'cut' })
  assert.equal(plan.page_count, 7)
  assert.equal(plan.filename, 'open-flight-print-and-play-B1-A1-F1-letter-es.pdf')
  assert.equal(plan.static_path, 'print/sets/first-flight-letter-es.pdf')
  assert.match(plan.booklet_hash, /^#m=monarch-k2,boeing-747&activities=ring/)
  assert.deepEqual(plan.designs[0].pages.map((page: any) => page.role), ['pattern', 'build', 'guide'])
  const parts: Buffer[] = []
  let offset: number | null = 0, digest = ''
  while (offset !== null) {
    const { pdf } = await w.call('printAndPlay', { ...args, output: 'pdf', offset })
    digest = pdf.sha256
    parts.push(Buffer.from(pdf.content, 'base64'))
    offset = pdf.next_offset
  }
  const bytes = Buffer.concat(parts)
  assert.equal(sha256(bytes), digest)
  const site = Buffer.from(await renderPrintAndPlay(args, { loadAsset }))
  assert.equal(sha256(site), digest)
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-')
})

test('the service rejects bad input with structured errors', async (t) => {
  const w = workspace(t)
  const code = (expected: string) => (e: unknown) => e instanceof Fault && e.body.code === expected
  await assert.rejects(async () => w.call('printAndPlay', { designs: [] }), code('invalid_input'))
  await assert.rejects(async () => w.call('printAndPlay', { designs: ['A1', 'A2', 'A3', 'A4'] }), code('invalid_input'))
  await assert.rejects(async () => w.call('printAndPlay', { designs: ['A1'], paper: 'B5' }), code('invalid_input'))
  await assert.rejects(async () => w.call('printAndPlay', { designs: ['Z9'] }), code('invalid_input'))
  await assert.rejects(async () => w.call('printAndPlay', { designs: ['A1'], offset: 5 }), code('invalid_input'))
  await assert.rejects(async () => w.call('printAndPlay', { designs: ['A1'], output: 'pdf', offset: 99999999 }), code('invalid_input'))
})
