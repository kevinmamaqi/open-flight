// Cloudflare Pages serves a file such as book.html at /book. GitHub Pages
// needs a directory alias for that same URL. Publish the real page on Cloudflare.
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const source = resolve(process.argv[2] ?? '.')
const output = resolve(process.argv[3] ?? join(source, '.pages-output'))
if (output === source || !['index.html', 'book.html', 'library', 'trials'].every(name => existsSync(join(source, name))))
  throw new Error('Run against the published workshop directory and choose a separate output.')
const aliases = ['book', 'classroom', 'motor', 'planes', 'studio']
mkdirSync(output, {recursive: true})
for (const entry of readdirSync(source, {withFileTypes: true})) {
  if (entry.name.startsWith('.') || (entry.isDirectory() && aliases.includes(entry.name))) continue
  cpSync(join(source, entry.name), join(output, entry.name), {recursive: true})
}
const redirects = aliases.map(name => '/' + name + '/ /' + name + ' 301')
writeFileSync(join(output, '_redirects'), redirects.join('\n') + '\n')
// This is a multi-page workshop. Missing patterns should return an HTTP 404.
writeFileSync(join(output, '404.html'), `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found · Open Flight</title><link rel="stylesheet" href="/tokens.css"><link rel="stylesheet" href="/system.css">
<main class="wrap"><h1>404 · Open Flight</h1><p>Page not found. Choose your workshop.</p>
<nav><a href="/">English</a> · <a lang="es" href="/es">Español</a> · <a lang="ru" href="/ru">Русский</a></nav></main></html>\n`)
