import { ru } from '../apps/editor/atlas-copy.js'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url)),
  editor = join(root, 'apps/editor')
const out = resolve(root, process.argv[2] ?? 'dist/site')
mkdirSync(out, { recursive: true })
const russianTitle = 'Open Flight · Мастерская бумажных полётов'
const domain = 'https://kevinmamaqi.github.io/open-flight/'
const updateAttr = (name, value) => ({ element: (el) => el.setAttribute(name, value) })
const replaceText = (value) => ({ element: (el) => el.setInnerContent(value) })
const ruHome = new HTMLRewriter()
  .on('html', updateAttr('lang', 'ru'))
  .on('title', replaceText(russianTitle))
  .on('[data-t]', {
    element(el) {
      const key = el.getAttribute('data-t')
      if (ru[key]) el.setInnerContent(ru[key])
    },
  })
  .on('meta[name="description"]', updateAttr('content', ru.intro))
  .on('meta[property="og:title"]', updateAttr('content', russianTitle))
  .on('meta[property="og:description"]', updateAttr('content', ru.intro))
  .on('meta[property="og:locale"]', updateAttr('content', 'ru_RU'))
  .on('meta[property="og:image"]', updateAttr('content', domain + 'assets/atlas/workshop-preview-ru.png'))
  .on('meta[property="og:image:alt"]', updateAttr('content', 'Бумажный монарх в мастерской Open Flight'))
  .on('link[rel="canonical"]', updateAttr('href', domain + 'ru.html'))
  .on('#hero-link', updateAttr('href', './studio.html?lang=ru#design=butterfly-monarch&revision=w1'))
  .on('#specimen-name', replaceText('Монарх ↗'))
  .on('#specimen-family', replaceText('Планер-бабочка'))
  .on('#download', updateAttr('href', './library/monarch-A4-ru.pdf'))
  .on('[data-route=butterfly]', updateAttr('href', './studio.html?lang=ru'))
  .on('[data-route=airplane]', updateAttr('href', './planes.html?lang=ru'))
  .on('#lesson-file', updateAttr('href', './library/family-lesson-ru.html'))
  .on('#references', updateAttr('href', './references.html?lang=ru'))
  .on('#roadmap-link', updateAttr('href', './references.html?lang=ru#powered'))
  .transform(readFileSync(join(editor, 'atlas.html'), 'utf8'))
writeFileSync(join(editor, 'ru.html'), ruHome)
for (const entry of readdirSync(editor, { withFileTypes: true })) {
  const dest =
    entry.name === 'index.html' ? 'studio.html' : entry.name === 'atlas.html' ? 'index.html' : entry.name
  const source = join(editor, entry.name)
  if (entry.isDirectory() && ['assets', 'library'].includes(entry.name))
    cpSync(source, join(out, dest), {
      recursive: true,
      filter: (p) => !p.endsWith('.d.ts'),
    })
  if (entry.isFile() && /\.(html|js|css|svg)$/.test(entry.name)) cpSync(source, join(out, dest))
}
for (const alias of ['studio', 'planes']) {
  const dir = join(out, alias)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, 'index.html'),
    '<!doctype html><html lang="en"><meta charset="utf-8"><title>Open Flight</title><a id="route" href="../' +
      alias +
      '.html">Open Flight</a><script src="../route-alias.js"></script></html>',
  )
}
writeFileSync(
  join(out, 'route-alias.js'),
  "location.replace(document.getElementById('route').href+location.search+location.hash)\n",
)
writeFileSync(join(out, '.nojekyll'), '')
const origin = 'https://kevinmamaqi.github.io/open-flight/'
const pages = ['studio.html', 'planes.html', 'references.html']
writeFileSync(
  join(out, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    '<url><loc>' +
    origin +
    '</loc></url><url><loc>' +
    origin +
    'ru.html</loc></url>' +
    pages
      .flatMap((page) =>
        ['en', 'ru'].map((lang) => '<url><loc>' + origin + page + '?lang=' + lang + '</loc></url>'),
      )
      .join('') +
    '</urlset>',
)
for (const path of [
  'index.html',
  'studio.html',
  'planes.html',
  'flight-viewer.js',
  'browser-workshop.js',
  'references.html',
  'library/boeing-747-US_LETTER-ru.pdf',
]) {
  if (!existsSync(join(out, path))) throw Error('Missing public file ' + path)
}
console.log('Static workshop ready in ' + out)
