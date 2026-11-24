import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { Ajv2020 } from 'ajv/dist/2020.js'
import type { Tool } from '@modelcontextprotocol/server'

const read = (path: string) =>
  JSON.parse(readFileSync(new URL('../../api/' + path, import.meta.url), 'utf8'))
export const openapi = read('openapi.json')
type Mapping = {
  'x-operationId': string
  'x-http': {
    method: string
    path: string
    argumentBindings?: Record<string, { in: string; name: string; transform?: string }>
  }
}
export const catalog = read('mcp-tools.json') as {
  tools: (Tool & Mapping)[]
  resourceTemplates: ({
    uriTemplate: string
    name: string
    title: string
    description: string
  } & Mapping)[]
}
export const toolsByOperation = new Map<string, any>(
  catalog.tools.map((t: any) => [t['x-operationId'], t]),
)
const validator = new Ajv2020({ strict: false, allErrors: false, ownProperties: true })
const inputs = new Map([...toolsByOperation].map(([op, t]) => [op, validator.compile(t.inputSchema)]))
const operations = Object.values(openapi.paths).flatMap((methods: any) =>
  Object.values(methods),
) as any[]
export const scopesByOperation = new Map<string, string[]>(
  operations.map((o) => [o.operationId, o['x-required-scopes']]),
)
export const fullScopes = [...new Set([...scopesByOperation.values()].flat())].sort()

export class Fault extends Error {
  status: number
  body: {
    code: string
    message: string
    request_id: string
    retryable: boolean
    details?: { field: string; reason: string }[]
  }
  constructor(
    status: number,
    code: string,
    message: string,
    details?: { field: string; reason: string }[],
  ) {
    super(message)
    this.status = status
    this.body = {
      code,
      message,
      request_id: randomUUID(),
      retryable: status >= 500,
      ...(details ? { details } : {}),
    }
  }
}
export function invalid(message: string) {
  return new Fault(400, 'invalid_input', message)
}
export function missing() {
  return new Fault(404, 'not_found', 'This item is unavailable in the selected workspace.')
}
export function checkInput(operation: string, args: unknown) {
  if (operation === 'downloadArtifact') {
    const valid = inputs.get('getArtifact')!
    if (!valid(args)) throw invalid('Use a valid artifact ID.')
    return
  }
  const valid = inputs.get(operation)
  if (!valid) throw new Fault(400, 'unsupported_capability', 'This product operation is unavailable.')
  if (!valid(args)) {
    const error = valid.errors?.[0]
    throw invalid((error?.instancePath || 'Request') + ' ' + (error?.message || 'is invalid') + '.')
  }
}
export const limits = {
  max_page_size: 100,
  max_export_jobs_in_flight: 1,
  max_artifact_bytes: 1048576,
  idempotency_retention_seconds: 31536000,
  job_retention_seconds: 31536000,
}
export const version = '0.5.0'
