import http, { type IncomingMessage } from 'node:http'
import type { AddressInfo } from 'node:net'
import { randomBytes, timingSafeEqual } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { Workspace } from '../../packages/product-core/workspace.ts'
import { catalog, Fault, invalid, missing, scopesByOperation } from '../../packages/product-core/contracts.ts'

const { values } = parseArgs({
  options: {
    workspace: { type: 'string' },
    port: { type: 'string', default: '4180' },
    'read-only': { type: 'boolean' },
  },
})
if (!values.workspace)
  throw Error('Usage: node apps/api/server.ts --workspace DIRECTORY [--port 4180] [--read-only]')
const port = Number(values.port)
if (!Number.isInteger(port) || port < 0 || port > 65535) throw Error('Choose a TCP port between 0 and 65535.')
const workspace = new Workspace(values.workspace, values['read-only'])
const token = randomBytes(32).toString('hex')
const editorRoot = fileURLToPath(new URL('../editor/', import.meta.url))
const publicTypes: Record<string, string> = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ino': 'text/plain; charset=utf-8',
  '.h': 'text/plain; charset=utf-8',
  '.zip': 'application/zip',
  '.csv': 'text/csv; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}
const assets = new Map<string, [string, string]>([
  ['/', ['atlas.html', publicTypes['.html']]],
  ['/studio.html', ['index.html', publicTypes['.html']]],
  ['/ru.html', ['ru.html', publicTypes['.html']]],
  ['/es.html', ['es.html', publicTypes['.html']]],
])
// Only these two reviewed notes accompany the public activity sheets.
for (const name of ['unusual-flyer-sources.md', 'williams-tandem.md']) {
  const research = '../../docs/research/' + name
  const source = existsSync(join(editorRoot, research)) ? research : '../../guides/' + name
  assets.set('/assets/objects/' + name, [source, publicTypes['.md']])
}
for (const entry of readdirSync(editorRoot, {
  recursive: true,
  withFileTypes: true,
})) {
  if (!entry.isFile()) continue
  const path = relative(editorRoot, join(entry.parentPath, entry.name))
  const mime = publicTypes[extname(path)]
  const appFile =
    /^(?:tokens|system|home|lab|editor|atlas|planes|references|flight|keel|costa|compare|next|browser-workshop|studio-folded|fold|family|book|classroom|model|studio-origins|appearance-sheet-browser|motor)(?:-[a-z0-9-]+)?\.(js|css|html|svg)$|^site\.webmanifest$/.test(
      path,
    )
  if (mime && (path.startsWith('assets/') || path.startsWith('library/') || appFile))
    assets.set('/' + path, [path, mime])
}
const mappings = [...catalog.tools, ...catalog.resourceTemplates].map((entry) => {
  const { method, path, argumentBindings } = entry['x-http']
  const names = [...path.matchAll(/\{(\w+)\}/g)].map((m) => m[1])
  return {
    op: entry['x-operationId'],
    method,
    names,
    pattern: new RegExp('^' + path.replace(/\{\w+\}/g, '([^/]+)') + '$'),
    bindings: argumentBindings ?? {
      artifact_id: { in: 'path', name: 'artifact_id' },
    },
  }
})
async function readBody(req: IncomingMessage) {
  if (req.headers['content-type']?.split(';')[0] !== 'application/json')
    throw invalid('Send a JSON request body.')
  let n = 0
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    n += chunk.length
    if (n > 32768) throw invalid('Request body exceeds 32 KiB.')
    chunks.push(chunk)
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (body && typeof body === 'object' && !Array.isArray(body)) return body
  } catch {}
  throw invalid('Send a JSON object.')
}

const server = http.createServer(async (req, res) => {
  const host = '127.0.0.1:' + (server.address() as AddressInfo).port
  const root = 'http://' + host
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self' blob:; worker-src 'self'; img-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  )
  const json = (status: number, value: unknown) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(value))
  }
  try {
    if (req.headers.host !== host || (req.headers.origin !== undefined && req.headers.origin !== root))
      throw new Fault(403, 'forbidden', 'Use this editor’s loopback origin.')
    const url = new URL(req.url ?? '/', root)
    const aliases: Record<string, string> = {
      '/studio': '/studio.html',
      '/studio/': '/studio.html',
      '/planes': '/planes.html',
      '/planes/': '/planes.html',
      '/compare': '/compare.html',
      '/compare/': '/compare.html',
      '/classroom': '/classroom.html',
      '/classroom/': '/classroom.html',
      '/book': '/book.html',
      '/book/': '/book.html',
      '/motor': '/motor.html',
      '/motor/': '/motor.html',
      '/next': '/next.html',
      '/next/': '/next.html',
      '/es': '/es.html',
      '/es/': '/es.html',
      '/index.html': '/',
    }
    if (aliases[url.pathname] && req.method === 'GET') {
      res.writeHead(307, { Location: aliases[url.pathname] + url.search })
      res.end()
      return
    }
    const asset = assets.get(url.pathname)
    if (asset && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': asset[1] })
      res.end(readFileSync(join(editorRoot, asset[0])))
      return
    }
    const supplied = Buffer.from(req.headers.authorization ?? ''),
      expected = Buffer.from('Bearer ' + token)
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected))
      throw new Fault(
        401,
        'unauthenticated',
        'Open the private launch file or provide this instance’s bearer grant.',
      )
    const route = mappings.find((r) => r.method === req.method && r.pattern.test(url.pathname))
    if (!route) throw missing()
    const matches = route.pattern.exec(url.pathname)!
    const args: Record<string, unknown> = Object.create(null)
    const body = req.method === 'POST' ? await readBody(req) : {}
    const bindings = Object.entries(route.bindings) as [
      string,
      { in: string; name: string; transform?: string },
    ][]
    for (const key of Object.keys(body))
      if (!bindings.some(([, b]) => b.in === 'body' && b.name === key))
        throw invalid('Unknown body field: ' + key)
    for (const key of url.searchParams.keys())
      if (
        !bindings.some(([, b]) => b.in === 'query' && b.name === key) ||
        url.searchParams.getAll(key).length !== 1
      )
        throw invalid('Unknown or repeated query field: ' + key)
    for (const [arg, b] of bindings) {
      if (b.in === 'path') args[arg] = matches[1 + route.names.indexOf(b.name)]
      if (b.in === 'body' && Object.hasOwn(body, b.name)) args[arg] = body[b.name]
      if (b.in === 'query' && url.searchParams.has(b.name)) {
        const v = url.searchParams.get(b.name)!
        args[arg] = arg === 'limit' && /^\d+$/.test(v) ? Number(v) : v
      }
      if (b.in === 'header' && req.headers[b.name.toLowerCase()] !== undefined) {
        const v = String(req.headers[b.name.toLowerCase()])
        if (b.transform === 'quote-etag') {
          const match = /^"([a-z0-9][a-z0-9_-]{0,95})"$/.exec(v)
          if (!match) throw invalid('Use the quoted expected revision in If-Match.')
          args[arg] = match[1]
        } else args[arg] = v
      }
    }
    const result = await workspace.call(route.op, args)
    if (route.op === 'downloadArtifact') {
      res.writeHead(200, {
        'Content-Type': result.meta.ref.media_type,
        'Content-Length': result.bytes.length,
        ETag: '"' + result.meta.ref.sha256 + '"',
      })
      res.end(result.bytes)
      return
    }
    if (result.ref?.revision_id && result.head_revision_id === result.ref.revision_id)
      res.setHeader('ETag', '"' + result.ref.revision_id + '"')
    if (route.op === 'startExport') res.setHeader('Location', '/v1/jobs/' + result.job_id)
    json(
      route.op === 'startExport'
        ? 202
        : req.method === 'GET' || scopesByOperation.get(route.op)?.every((scope) => scope.endsWith(':read'))
          ? 200
          : 201,
      result,
    )
  } catch (err) {
    const error =
      err instanceof Fault
        ? err
        : new Fault(500, 'internal_error', 'The local request failed. Retry with the same key.')
    json(error.status, error.body)
  }
})
server.listen(port, '127.0.0.1', () => {
  const actual = (server.address() as AddressInfo).port,
    root = 'http://127.0.0.1:' + actual
  const privateFile = (name: string, data: string) => {
    const target = join(workspace.directory, name),
      temp = target + '.' + process.pid + '.tmp'
    writeFileSync(temp, data, { mode: 0o600, flag: 'wx' })
    renameSync(temp, target)
    return target
  }
  privateFile('http-' + actual + '.token', token)
  const dest = root + '/#grant=' + token
  const launcher = privateFile(
    'editor-' + actual + '.html',
    '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0;url=' +
      dest +
      '"><title>Open Flight</title><a href="' +
      dest +
      '">Open the local editor</a></html>',
  )
  console.log(JSON.stringify({ origin: root, launcher }))
})
