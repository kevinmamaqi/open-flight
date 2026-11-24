import { ru, es } from '../apps/editor/atlas-copy.js'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url)),
  editor = join(root, 'apps/editor')
const out = resolve(root, process.argv[2] ?? 'dist/site')
mkdirSync(out, { recursive: true })
const domain = 'https://kevinmamaqi.github.io/open-flight/'
const updateAttr = (name, value) => ({ element: (el) => el.setAttribute(name, value) })
const replaceText = (value) => ({ element: (el) => el.setInnerContent(value) })
const template = readFileSync(join(editor, 'atlas.html'), 'utf8')
for (const [lang, copy, title, region, photoAlt, name, family] of [
  [
    'ru',
    ru,
    'Open Flight · Мастерская бумажных полётов',
    'ru_RU',
    'Бумажный монарх в мастерской Open Flight',
    'Монарх',
    'Планер-бабочка',
  ],
  [
    'es',
    es,
    'Open Flight · Taller de vuelo en papel',
    'es_ES',
    'Planeador monarca de papel en el taller Open Flight',
    'Monarca',
    'Planeador mariposa',
  ],
]) {
  let rewrite = new HTMLRewriter()
    .on('html', updateAttr('lang', lang))
    .on('title', replaceText(title))
    .on('[data-t]', {
      element(el) {
        const text = copy[el.getAttribute('data-t')]
        if (text) el.setInnerContent(text)
      },
    })
    .on('meta[name="description"]', updateAttr('content', copy.intro))
    .on('meta[property="og:title"]', updateAttr('content', title))
    .on('meta[property="og:description"]', updateAttr('content', copy.intro))
    .on('meta[property="og:locale"]', updateAttr('content', region))
    .on(
      'meta[property="og:image"]',
      updateAttr('content', domain + 'assets/atlas/workshop-preview-' + lang + '.png'),
    )
    .on('meta[property="og:image:alt"]', updateAttr('content', photoAlt))
    .on('link[rel="canonical"]', updateAttr('href', domain + lang + '.html'))
    .on('#specimen', updateAttr('alt', photoAlt))
    .on('#specimen-name', replaceText(name + ' ↗'))
    .on('#specimen-family', replaceText(family))
  for (const [selector, href] of Object.entries({
    '#hero-link': 'studio.html?lang=' + lang + '#design=butterfly-monarch&revision=w1',
    '#specimen-name': 'studio.html?lang=' + lang + '#design=butterfly-monarch&revision=w1',
    '#download': 'library/monarch-A4-' + lang + '.pdf',
    '[data-route=butterfly]': 'studio.html?lang=' + lang,
    '[data-route=airplane]': 'planes.html?lang=' + lang,
    '#lesson-file': 'library/family-lesson-' + lang + '.html',
    '#references': 'references.html?lang=' + lang,
    '#compare-link': 'compare.html?lang=' + lang,
    '#roadmap-link': 'next.html?lang=' + lang,
    '#flight-link': 'planes.html?model=boeing-747&lang=' + lang + '&view=flight',
  }))
    rewrite = rewrite.on(selector, updateAttr('href', './' + href))
  writeFileSync(join(editor, lang + '.html'), rewrite.transform(template))
}
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
const pages = ['studio.html', 'planes.html', 'references.html', 'compare.html', 'next.html']
writeFileSync(
  join(out, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    '<url><loc>' +
    origin +
    '</loc></url><url><loc>' +
    origin +
    'ru.html</loc></url><url><loc>' +
    origin +
    'es.html</loc></url>' +
    pages
      .flatMap((page) =>
        ['en', 'ru', 'es'].map((lang) => '<url><loc>' + origin + page + '?lang=' + lang + '</loc></url>'),
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
  'library/monarch-A4-es.pdf',
  'library/family-lesson-es.html',
  'compare.html',
  'next.html',
  'es.html',
]) {
  if (!existsSync(join(out, path))) throw Error('Missing public file ' + path)
}
console.log('Static workshop ready in ' + out)
