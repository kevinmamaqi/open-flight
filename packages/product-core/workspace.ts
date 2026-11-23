import { planeCatalog, sheetSizes, liveries, revision as planeRevision } from '../planes/index.ts'
import { airplanePlan } from './airplanes.ts'
import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
import { canonical, sha256 } from '../geometry/butterfly.ts'
import { type Paper, type Locale } from '../print-export/sheets.ts'
import { revision, emitPrintFiles, type Ref, type ActivityRef } from './edition.ts'
import { activities, forAircraft, fieldGuide } from './content.ts'
import { applyEdits, baselines, generatorId, geometryFor, previewFor, sourceFor } from './aircraft.ts'
import {
  Fault,
  invalid,
  missing,
  limits,
  version,
  checkInput,
  scopesByOperation,
  fullScopes,
} from './contracts.ts'

type Revision = ReturnType<typeof revision>
const now = () => new Date().toISOString()

function cursorFor(id: string, filter: string) {
  return Buffer.from(canonical([filter, id])).toString('base64url')
}
function after(cursor: string | undefined, filter: string) {
  if (!cursor) return ''
  try {
    const [saved, id] = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'))
    if (saved === filter && typeof id === 'string' && cursorFor(id, filter) === cursor) return id
  } catch {}
  throw invalid('Use the cursor from this listing with the same filters.')
}

export class Workspace {
  db: DatabaseSync
  directory: string
  scopes: string[]
  constructor(path: string, readOnly = false) {
    if (!path) throw Error('Select a workspace directory.')
    this.directory = resolve(path)
    mkdirSync(this.directory, { recursive: true, mode: 0o700 })
    this.db = new DatabaseSync(join(this.directory, 'open-flight.sqlite'))
    this.scopes = readOnly ? fullScopes.filter((s) => s.endsWith(':read')) : fullScopes
    this.db.exec('PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;')
    this.db.exec(
      [
        'CREATE TABLE IF NOT EXISTS heads (id TEXT PRIMARY KEY, revision TEXT NOT NULL)',
        'CREATE TABLE IF NOT EXISTS revisions (id TEXT, revision TEXT, dto TEXT NOT NULL, source TEXT NOT NULL, PRIMARY KEY(id,revision))',
        'CREATE TABLE IF NOT EXISTS artifacts (id TEXT PRIMARY KEY, meta TEXT NOT NULL, bytes BLOB NOT NULL)',
        'CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, dto TEXT NOT NULL)',
        'CREATE TABLE IF NOT EXISTS receipts (op TEXT, key TEXT, digest TEXT NOT NULL, result TEXT NOT NULL, PRIMARY KEY(op,key))',
      ].join(';'),
    )
    this.transaction(() => {
      for (const model of baselines) {
        if (this.db.prepare('SELECT 1 FROM heads WHERE id=?').get(model.model)) continue
        this.save(
          revision(
            model.model,
            model.baseline_revision,
            model.name,
            model.parameters,
            model.appearance_id,
            null,
            'original',
            '2026-11-23T00:00:00Z',
            model.species,
          ),
        )
      }
    })
  }
  close() {
    this.db.close()
  }
  private transaction<T>(fn: () => T): T {
    this.db.exec('BEGIN IMMEDIATE')
    try {
      const result = fn()
      this.db.exec('COMMIT')
      return result
    } catch (err) {
      this.db.exec('ROLLBACK')
      throw err
    }
  }
  private save(r: Revision) {
    const { design_id, revision_id } = r.dto.ref
    this.db
      .prepare('INSERT INTO revisions VALUES(?,?,?,?)')
      .run(design_id, revision_id, JSON.stringify(r.dto), r.source)
    this.db
      .prepare('INSERT INTO heads VALUES(?,?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision')
      .run(design_id, revision_id)
    return r.dto
  }
  private read(id: string, rev: string) {
    const row = this.db
      .prepare(
        'SELECT r.dto,r.source,h.revision AS head FROM revisions r JOIN heads h USING(id) WHERE r.id=? AND r.revision=?',
      )
      .get(id, rev)
    if (!row) throw missing()
    const dto = JSON.parse(row.dto as string)
    dto.head_revision_id = row.head
    return { dto, source: row.source as string }
  }
  private exact(ref: Ref) {
    const record = this.read(ref.design_id, ref.revision_id)
    if (record.dto.ref.source_sha256 !== ref.source_sha256)
      throw invalid('The source hash differs from the stored design revision.')
    if (
      record.dto.provenance.generator_revision !== generatorId(record.dto.species_id) ||
      record.source !== sourceFor(ref.design_id, ref.revision_id, record.dto)
    )
      throw new Fault(
        400,
        'unsupported_capability',
        'Use the retained generator for this revision. Existing exported bytes remain available.',
      )
    return record
  }
  private artifact(
    format: string,
    media_type: string,
    bytes: Buffer,
    design: Ref,
    sources: ActivityRef[] = [],
  ) {
    if (bytes.length > limits.max_artifact_bytes)
      throw new Fault(400, 'quota_exceeded', 'The artifact exceeds the local export limit.')
    const digest = sha256(bytes)
    const artifact_id = format + '-' + sha256(canonical([design, sources, media_type, digest])).slice(0, 40)
    const ref = {
      artifact_id,
      sha256: digest,
      media_type,
      byte_length: bytes.length,
    }
    const meta = {
      ref,
      source_design: design,
      source_activities: sources,
      created_at: now(),
      access: {
        mode: 'api_download',
        path: '/v1/artifacts/' + artifact_id + '/content',
      },
      available_until: null,
    }
    this.db
      .prepare('INSERT OR IGNORE INTO artifacts VALUES(?,?,?)')
      .run(artifact_id, JSON.stringify(meta), bytes)
    return ref
  }
  private export(args: {
    design: Ref
    formats: string[]
    page_size: Paper
    locale: Locale
    activities?: ActivityRef[]
  }) {
    const { dto, source } = this.exact(args.design)
    const ids: string[] = []
    emitPrintFiles({ dto, source }, args, (type, mime, value, refs = []) => {
      ids.push(this.artifact(type, mime, Buffer.from(value), dto.ref, refs).artifact_id)
    })
    const created_at = now(),
      job_id = 'job-' + randomUUID()
    const dtoJob = {
      job_id,
      kind: 'export',
      status: 'succeeded',
      input_sha256: sha256(canonical(args)),
      design: dto.ref,
      artifact_ids: ids,
      created_at,
      updated_at: created_at,
      expires_at: new Date(Date.parse(created_at) + limits.job_retention_seconds * 1000).toISOString(),
    }
    this.db.prepare('INSERT INTO jobs VALUES(?,?)').run(job_id, JSON.stringify(dtoJob))
    return dtoJob
  }
  can(op: string) {
    return scopesByOperation.has(op) && scopesByOperation.get(op)!.every((s) => this.scopes.includes(s))
  }
  call(op: string, args: Record<string, any> = {}): any {
    if (!scopesByOperation.has(op))
      throw new Fault(400, 'unsupported_capability', 'This operation is unavailable.')
    if (!this.can(op))
      throw new Fault(403, 'forbidden', 'The selected workspace grant lacks the required scope.')
    checkInput(op, args)
    if (!Object.hasOwn(args, 'idempotency_key')) return this.run(op, args)
    const { idempotency_key: key, ...payload } = args
    const digest = sha256(canonical(payload))
    return this.transaction(() => {
      const old = this.db.prepare('SELECT digest,result FROM receipts WHERE op=? AND key=?').get(op, key)
      if (old) {
        if (old.digest !== digest)
          throw new Fault(409, 'idempotency_conflict', 'Use a new key for different inputs.')
        return JSON.parse(old.result as string)
      }
      const result = this.run(op, payload)
      this.db.prepare('INSERT INTO receipts VALUES(?,?,?,?)').run(op, key, digest, JSON.stringify(result))
      return result
    })
  }
  private run(op: string, a: Record<string, any>): any {
    switch (op) {
      case 'listAirplanes':
        return { revision: planeRevision, papers: Object.keys(sheetSizes), liveries, items: planeCatalog }
      case 'planAirplane':
        return airplanePlan(a.settings, a.locale, a.output)
      case 'getCapabilities':
        return {
          api_version: 'v1',
          implementation_version: version,
          enabled_operations: [...scopesByOperation.keys()].filter((id) => this.can(id)),
          transports: ['ui', 'http', 'mcp_stdio'],
          locales: ['en', 'ru'],
          limits,
          granted_scopes: this.scopes,
        }
      case 'getFieldGuide':
        return { species: fieldGuide }
      case 'previewDraft': {
        const { dto } = this.exact(a.design)
        const draft = {
          ...dto,
          ...applyEdits(dto, a.parameters, a.appearance_id),
        }
        return {
          svg: previewFor(draft).toString('utf8'),
          geometry: geometryFor(draft),
          is_flight_simulation: false,
        }
      }
      case 'listDesigns': {
        const filter = 'designs/' + (a.kind ?? 'all'),
          start = after(a.cursor, filter),
          limit = a.limit ?? 20
        const rows =
          a.kind === 'paper_airplane'
            ? []
            : this.db
                .prepare(
                  'SELECT h.id,r.dto FROM heads h JOIN revisions r ON r.id=h.id AND r.revision=h.revision WHERE h.id>? ORDER BY h.id LIMIT ?',
                )
                .all(start, limit + 1)
        const items = rows.slice(0, limit).map((row) => {
          const { ref, head_revision_id, name, kind, evidence_state, species_id } = JSON.parse(
            row.dto as string,
          )
          return {
            ref,
            head_revision_id,
            name,
            kind,
            evidence_state,
            ...(species_id ? { species_id } : {}),
          }
        })
        return {
          items,
          next_cursor: rows.length > limit ? cursorFor(rows[limit - 1].id as string, filter) : null,
        }
      }
      case 'getDesignRevision':
        return this.read(a.design_id, a.revision_id).dto
      case 'forkDesign': {
        const { dto } = this.exact(a.source)
        if (!a.name.trim()) throw invalid('Provide a nonblank name.')
        const selection = applyEdits(dto, a.parameters, a.appearance_id)
        return this.save(
          revision(
            'd-' + randomUUID(),
            'r1',
            a.name.trim(),
            selection.parameters,
            selection.appearance_id,
            dto.ref,
            'fork',
            now(),
            dto.species_id,
          ),
        )
      }
      case 'reviseDesign': {
        const head = this.db.prepare('SELECT revision FROM heads WHERE id=?').get(a.design_id)
        if (!head) throw missing()
        if (baselines.some((model) => model.model === a.design_id))
          throw new Fault(403, 'forbidden', 'Fork the baseline to make an editable copy.')
        if (head.revision !== a.expected_head_revision)
          throw new Fault(412, 'revision_conflict', 'Reload the current revision before saving.', [
            { field: 'head_revision_id', reason: String(head.revision) },
          ])
        const { dto } = this.read(a.design_id, a.expected_head_revision)
        this.exact(dto.ref)
        const selection = applyEdits(dto, a.parameters, a.appearance_id)
        return this.save(
          revision(
            a.design_id,
            'r' + (Number(a.expected_head_revision.slice(1)) + 1),
            dto.name,
            selection.parameters,
            selection.appearance_id,
            dto.ref,
            'revision',
            now(),
            dto.species_id,
          ),
        )
      }
      case 'previewDesign': {
        const { dto } = this.exact(a.design)
        return {
          design: dto.ref,
          svg: this.artifact('preview', 'image/svg+xml', previewFor(dto), dto.ref),
          geometry: dto.geometry,
          evidence_state: dto.evidence_state,
          is_flight_simulation: false,
        }
      }
      case 'startExport':
        return this.export(a as Parameters<Workspace['export']>[0])
      case 'getJob': {
        const row = this.db.prepare('SELECT dto FROM jobs WHERE id=?').get(a.job_id)
        if (!row) throw missing()
        return JSON.parse(row.dto as string)
      }
      case 'getArtifact':
      case 'downloadArtifact': {
        const row = this.db.prepare('SELECT meta,bytes FROM artifacts WHERE id=?').get(a.artifact_id)
        if (!row) throw missing()
        const meta = JSON.parse(row.meta as string)
        return op === 'getArtifact' ? meta : { meta, bytes: Buffer.from(row.bytes as Uint8Array) }
      }
      case 'listActivities': {
        const filter =
            'activities/' +
            (a.locale ?? 'all') +
            '/' +
            (a.kind ?? 'all') +
            (a.species_id ? '/' + a.species_id : ''),
          start = after(a.cursor, filter),
          limit = a.limit ?? 20
        const matching = a.species_id
          ? forAircraft(a.species_id === 'legacy' ? undefined : a.species_id)
          : activities
        const entries = matching.filter(
          (item) =>
            item.ref.activity_id > start &&
            (!a.locale || item.locale === a.locale) &&
            (!a.kind || item.kind === a.kind),
        )
        const items = entries.slice(0, limit).map(({ content_markdown, ...summary }) => summary)
        return {
          items,
          next_cursor: entries.length > limit ? cursorFor(items.at(-1)!.ref.activity_id, filter) : null,
        }
      }
      case 'getActivityRevision': {
        const entry = activities.find(
          (x) => x.ref.activity_id === a.activity_id && x.ref.revision_id === a.revision_id,
        )
        if (!entry) throw missing()
        return entry
      }
    }
  }
}
