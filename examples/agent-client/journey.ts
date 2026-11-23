// This client communicates only over the published transports. It imports no product code.
import { Client } from '@modelcontextprotocol/client'
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio'
import assert from 'node:assert/strict'
import { randomUUID, createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const { values } = parseArgs({ options: { workspace: { type: 'string' }, origin: { type: 'string' } } })
if (!values.workspace)
  throw Error('Pass --workspace DIRECTORY. Each journey creates a private test design.')
const workspace = resolve(values.workspace)
const origin = values.origin ? new URL(values.origin) : null
if (origin && (origin.protocol !== 'http:' || origin.hostname !== '127.0.0.1'))
  throw Error('Use the workspace HTTP server on IPv4 loopback.')
const token = origin ? readFileSync(join(workspace, 'http-' + origin.port + '.token'), 'utf8') : null
const hash = (b: Buffer) => createHash('sha256').update(b).digest('hex')
const protocol = '2026-07-28'
const adapter = fileURLToPath(new URL('../../apps/mcp-server/server.ts', import.meta.url))
async function connect() {
  const c = new Client(
    { name: 'open-flight-journey', version: '1.0.0' },
    { versionNegotiation: { mode: { pin: protocol } } },
  )
  await c.connect(
    new StdioClientTransport({ command: process.execPath, args: [adapter, '--workspace', workspace] }),
  )
  return c
}
let client = await connect()
const invoke = async (name: string, args: Record<string, unknown> = {}) =>
  (await client.callTool({ name: 'openflight_' + name, arguments: args })).structuredContent as any
async function call(name: string, args: Record<string, unknown> = {}) {
  const result = await invoke(name, args)
  assert.equal(result.ok, true, JSON.stringify(result.error))
  return result.data
}
async function http(path: string, options: RequestInit = {}) {
  const reply = await fetch(new URL(path, origin!), {
    ...options,
    headers: { Authorization: 'Bearer ' + token, ...options.headers },
  })
  assert.ok(reply.ok, 'HTTP ' + reply.status + ' for ' + path)
  return reply
}
try {
  const tools = (await client.listTools()).tools
  assert.equal(tools.length, 15)
  assert.equal((await client.listResourceTemplates()).resourceTemplates.length, 1)
  const caps = await call('get_capabilities')
  assert.equal(caps.enabled_operations.length, 16)
  const airplanes = await call('list_airplanes')
  assert.deepEqual(airplanes.items.map((item: { model_id: string }) => item.model_id).sort(),
    ['boeing-747', 'douglas-dc3', 'ilyushin-il62', 'tupolev-tu144'])
  if (origin) assert.deepEqual(await (await http('/v1/airplanes')).json(), airplanes)
  const airplane = { model_id: 'ilyushin-il62', paper: 'US_LETTER', keel_mm: 24, winglet_mm: 0, livery: 'pencil' }
  for (const output of ['plan', 'guide', 'svg', 'pdf', 'source_json']) {
    const body = { settings: airplane, locale: 'ru', output }
    const result = await call('plan_airplane', body)
    const bytes = Buffer.from(result.output.content, result.output.encoding)
    assert.equal(result.evidence_state, 'concept')
    assert.equal(result.output.byte_length, bytes.length)
    assert.equal(result.output.sha256, hash(bytes))
    assert.equal(result.settings.winglet_mm, 0)
    if (output === 'pdf') assert.equal(bytes.subarray(0, 5).toString(), '%PDF-')
    if (output === 'source_json') assert.deepEqual(JSON.parse(bytes.toString()), result.settings)
    if (output === 'plan') assert.equal(JSON.parse(bytes.toString()).source.model_id, airplane.model_id)
    if (origin) {
      const response = await http('/v1/airplanes/plan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), result)
    }
  }
  const guide = await call('get_field_guide')
  assert.deepEqual(guide.species.map((item: { id: string }) => item.id).sort(), [
    'monarch',
    'morpho',
    'swallowtail',
  ])
  if (origin) assert.deepEqual(await (await http('/v1/field-guide')).json(), guide)
  const listing = await call('list_designs', { kind: 'butterfly_glider', limit: 10 })
  const src = listing.items.find((item: any) => item.ref.design_id === 'butterfly-morpho').ref
  const baseline = await call('get_design_revision', {
    design_id: src.design_id,
    revision_id: src.revision_id,
  })
  const draftValues = { parameters: { left_trim_deg: 8 }, appearance_id: 'carnival' }
  const draft = await call('preview_draft', { design: src, ...draftValues })
  assert.equal(draft.is_flight_simulation, false)
  assert.ok(draft.geometry.aspect_ratio > 0)
  if (origin)
    assert.deepEqual(
      await (
        await http('/v1/previews/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ design: src, ...draftValues }),
        })
      ).json(),
      draft,
    )
  const fork = await call('fork_design', {
    idempotency_key: randomUUID(),
    source: src,
    name: 'Garden Gate client trial',
    ...draftValues,
  })
  const def = baseline.parameter_definitions.find((p: { name: string }) => p.name === 'span_mm')
  const change = {
    idempotency_key: randomUUID(),
    design_id: fork.ref.design_id,
    expected_head_revision: fork.ref.revision_id,
    parameters: { span_mm: def.minimum + 2 * def.step, left_trim_deg: 0, right_trim_deg: 8 },
    appearance_id: 'twilight',
  }
  const revised = await call('revise_design', change)
  assert.equal(revised.evidence_state, 'modified_experiment')
  assert.deepEqual(await call('revise_design', change), revised)
  assert.equal(
    (await invoke('revise_design', { ...change, appearance_id: 'natural' })).error.code,
    'idempotency_conflict',
  )
  assert.equal(
    (await invoke('revise_design', { ...change, idempotency_key: randomUUID() })).error.code,
    'revision_conflict',
  )
  const preview = await call('preview_design', { idempotency_key: randomUUID(), design: revised.ref })
  assert.deepEqual(preview.geometry, revised.geometry)
  assert.equal(preview.is_flight_simulation, false)
  const activities = await call('list_activities', { locale: 'ru', species_id: 'morpho' })
  for (const a of activities.items) {
    const actual = await call('get_activity_revision', {
      activity_id: a.ref.activity_id,
      revision_id: a.ref.revision_id,
    })
    assert.equal(hash(Buffer.from(actual.content_markdown)), a.ref.content_sha256)
  }
  const order = {
    idempotency_key: randomUUID(),
    design: revised.ref,
    formats: ['pdf', 'svg', 'source_json', 'instructions', 'activity_assets', 'trial_sheet'],
    page_size: 'US_LETTER',
    locale: 'ru',
    activities: activities.items.map((a: { ref: object }) => a.ref),
  }
  const job = await call('start_export', order)
  await client.close()
  client = await connect()
  await client.listTools()
  const recovered = await call('get_job', { job_id: job.job_id })
  assert.equal(recovered.status, 'succeeded')
  assert.equal(recovered.artifact_ids.length, 6)
  assert.deepEqual(await call('start_export', order), job)
  if (origin) {
    const base = '/v1/designs/' + revised.ref.design_id + '/revisions/' + revised.ref.revision_id
    assert.deepEqual(await (await http(base)).json(), revised)
    const { idempotency_key, ...body } = order
    const replay = await http('/v1/exports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotency_key },
      body: JSON.stringify(body),
    })
    assert.deepEqual(await replay.json(), job)
    const revisionsUrl = new URL('/v1/designs/' + change.design_id + '/revisions', origin)
    for (const [key, appearance, status, code] of [
      [change.idempotency_key, 'natural', 409, 'idempotency_conflict'],
      [randomUUID(), change.appearance_id, 412, 'revision_conflict'],
    ] as const) {
      const rejected = await fetch(revisionsUrl, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Idempotency-Key': key,
          'If-Match': '"' + change.expected_head_revision + '"',
        },
        body: JSON.stringify({ parameters: change.parameters, appearance_id: appearance }),
      })
      assert.equal(rejected.status, status)
      assert.equal((await rejected.json()).code, code)
    }
  }
  let printPdfHash = ''
  for (const id of [preview.svg.artifact_id, ...recovered.artifact_ids]) {
    const meta = await call('get_artifact', { artifact_id: id })
    const resource = await client.readResource({ uri: 'openflight://artifacts/' + id })
    const content = resource.contents[0]
    assert.ok('blob' in content)
    const bytes = Buffer.from(content.blob, 'base64')
    assert.equal(hash(bytes), meta.ref.sha256)
    assert.equal(bytes.length, meta.ref.byte_length)
    assert.deepEqual(meta.source_design, revised.ref)
    if (meta.ref.media_type === 'application/pdf') printPdfHash = meta.ref.sha256
    if (origin) assert.deepEqual(Buffer.from(await (await http(meta.access.path)).arrayBuffer()), bytes)
  }
  const negotiated = client.getNegotiatedProtocolVersion()
  assert.equal(negotiated, protocol)
  console.log(
    JSON.stringify(
      {
        protocol: negotiated,
        server: client.getServerVersion(),
        tools: tools.length,
        transport: 'stdio',
        http_bytes_compared: Boolean(origin),
        design: revised.ref,
        geometry: revised.geometry,
        preview: preview.svg,
        print_pdf_sha256: printPdfHash,
        job: job.job_id,
        artifacts: recovered.artifact_ids.length,
        checks: [
          'discovery',
          'airplane fold plan, guide and download hashes',
          'fork',
          'save',
          'replay',
          'key conflict',
          'stale edit',
          'preview',
          'activities',
          'restart',
          'download hashes',
        ],
      },
      null,
      2,
    ),
  )
} finally {
  await client.close()
}
