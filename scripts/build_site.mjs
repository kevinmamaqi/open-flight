import { flightObjects } from '../apps/editor/assets/objects/activities.js'
import { monarchTrialSheets } from '../apps/editor/book-model.js'
import { paperSizes, sheetLocales } from '../apps/editor/family-sheets.js'
import { createBook } from '../packages/print-export/family-book.js'
import { previousHome, workshopHome as domain } from '../apps/editor/assets/workshop-address.js'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { ru, es } from '../apps/editor/atlas-copy.js'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url)),
  editor = join(root, 'apps/editor')
const out = resolve(root, process.argv[2] ?? 'dist/site')
mkdirSync(out, { recursive: true })
const updateAttr = (name, value) => ({ element: (el) => el.setAttribute(name, value) })
const replaceText = (value) => ({ element: (el) => el.setInnerContent(value) })
// Pages caches files independently. Link each release's HTML and ES module graph
// to the same asset generation, including dynamic imports in the worktables.
const assets = readdirSync(editor, { recursive: true })
  .filter(name => /\.(css|js|mjs|json)$/.test(name) || /^assets\/(?:motor|objects)\/.*\.(csv|h|ino|md|pdf|svg|txt|zip|jpg|png)$/.test(name))
  .sort()
const hash = createHash('sha256').update(readFileSync(fileURLToPath(import.meta.url)))
for (const name of assets) hash.update(name).update('\0').update(readFileSync(join(editor, name))).update('\0')
const assetKey = '?v=' + hash.digest('hex').slice(0, 12)
function versionAttribute(attr) {
  return {
    element(el) {
      const href = el.getAttribute(attr)
      if (/^(?:\.{1,2}\/)?[\w./-]+\.(?:js|css)$/.test(href)) el.setAttribute(attr, href + assetKey)
    },
  }
}
function versionHtml(source) {
  return new HTMLRewriter()
    .on('script[src]', versionAttribute('src'))
    .on('link[rel="stylesheet"]', versionAttribute('href'))
    .transform(source)
}
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
      updateAttr('content', domain + 'assets/brand/social-' + lang + '.png'),
    )
    .on('meta[property="og:image:alt"]', updateAttr('content', photoAlt))
    .on('link[rel="canonical"]', updateAttr('href', domain + lang))
    .on('meta[property="og:url"]', updateAttr('content', domain + lang))
    .on('#book-log-image', updateAttr('src', './assets/atlas/book-log-' + lang + '.png'))
    .on('#book-cover-image', updateAttr('src', './assets/atlas/book-cover-' + lang + '.png'))
    .on('#specimen', updateAttr('alt', photoAlt))
    .on('#specimen-name', replaceText(name + ' ↗'))
    .on('#specimen-family', replaceText(family))
    .on('#previous-site', updateAttr('href', previousHome + lang + '.html?previous=1'))
  for (const item of flightObjects(lang).activities) {
    const selector = '[data-object="' + item.id + '"]'
    rewrite = rewrite.on(selector, replaceText(item.title)).on(selector, updateAttr('href', './flight-objects.html?model=' + item.id + '&lang=' + lang))
  }
  for (const [selector, href] of Object.entries({
    '#hero-link': 'studio.html?lang=' + lang + '#design=butterfly-monarch&revision=w1',
    '#specimen-name': 'studio.html?lang=' + lang + '#design=butterfly-monarch&revision=w1',
    '#folded-butterfly': 'studio.html?construction=k1&species=monarch&lang=' + lang,
    '#book-link': 'book.html?lang=' + lang,
    '#nav-book': 'book.html?lang=' + lang,
    '#book-sample': 'book.html?lang=' + lang + '&p=4',
    '#monarch-trial': 'book.html?lang=' + lang + '&p=4#m=monarch-k1,monarch-k2&paper=a4',
    '#specimen-sheet': 'library/monarch-A4-' + lang + '.pdf',
    '#classroom-link': 'classroom.html?lang=' + lang,
    '#object-family': 'flight-objects.html?lang=' + lang,
    '#objects-link': 'flight-objects.html?lang=' + lang,
    '#download': 'library/monarch-k1-A4-' + lang + '.pdf',
    '[data-route=butterfly]': 'studio.html?lang=' + lang + '#design=butterfly-monarch&revision=w1',
    '[data-route=airplane]': 'planes.html?lang=' + lang,
    '#lesson-file': 'library/family-lesson-' + lang + '.html',
    '#references': 'references.html?lang=' + lang,
    '#compare-link': 'compare.html?lang=' + lang,
    '#motor-link': 'motor.html?lang=' + lang,
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
  if (entry.isFile() && entry.name.endsWith('.html'))
    writeFileSync(join(out, dest), versionHtml(readFileSync(source, 'utf8')))
  else if (entry.isFile() && /\.(js|css|svg|webmanifest)$/.test(entry.name)) cpSync(source, join(out, dest))
}
for (const name of ['unusual-flyer-sources.md', 'williams-tandem.md']) {
  const research = join(root, 'docs/research', name)
  cpSync(existsSync(research) ? research : join(root, 'guides', name), join(out, 'assets/objects', name))
}
const trials = join(out, 'trials')
mkdirSync(trials, { recursive: true })
const loadAsset = path => readFile(join(editor, path))
for (const lang of sheetLocales) {
  for (const paper of paperSizes) {
    const bytes = await createBook({ lang, paper, sheets: monarchTrialSheets }, { loadAsset })
    writeFileSync(join(trials, 'monarch-k1-k2-' + paper + '-' + lang + '.pdf'), bytes)
  }
}
// The bundled workshop has no ES imports. Third-party modules keep their published contents.
const localModule = /(\b(?:from\s*|import\s*\(\s*|import\s+))(["'])(\.{1,2}\/[\w./-]+\.js)\2/g
for (const name of assets) {
  if (!name.endsWith('.js') || name === 'browser-workshop.js' || name.includes('/vendor/')) continue
  const source = readFileSync(join(editor, name), 'utf8')
  const result = source.replace(localModule, (_all, keyword, quote, url) => keyword + quote + url + assetKey + quote)
  if (result !== source) writeFileSync(join(out, name), result)
}
for (const alias of ['studio', 'planes', 'book', 'classroom', 'motor']) {
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
const pages = ['book.html','classroom.html','motor.html','keel.html','costa.html','studio.html', 'planes.html', 'references.html', 'compare.html', 'next.html', 'flight-objects.html']
writeFileSync(
  join(out, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    '<url><loc>' +
    domain +
    '</loc></url><url><loc>' +
    domain +
    'ru</loc></url><url><loc>' +
    domain +
    'es</loc></url>' +
    pages
      .flatMap((page) =>
        ['en', 'ru', 'es'].map((lang) => '<url><loc>' + domain + page.replace(/\.html$/, '') + '?lang=' + lang + '</loc></url>'),
      )
      .join('') +
    '</urlset>',
)
for (const path of [
  'index.html',
  'tokens.css', 'system.css', 'site.webmanifest', 'assets/brand/logo.svg', 'assets/brand/favicon.ico', 'assets/fonts/OpenFlightText-Regular.woff2',
  'classroom.html', 'classroom.js', 'book-size.js', 'book-reader.js', 'model-origins.js', 'model-map.js', 'model-appearance.js', 'assets/origins/world-land.png', 'assets/book/pdf.worker.min.mjs',
  'book.html', 'book.js', 'book-engine.js', 'motor.html', 'assets/motor/lab.json', 'fold-lesson.js',
  'assets/atlas/book-cover-en.png', 'assets/atlas/book-cover-es.png', 'assets/atlas/book-cover-ru.png',
  'studio.html',
  'planes.html',
  'flight-viewer.js', 'keel.js','keel-guide.js','library/monarch-k1-US_LETTER-es.pdf',
  'costa.html', 'costa.js', 'library/monarch-k2-A4-ru.pdf', 'assets/print-faces.js',
  'browser-workshop.js',
  'references.html',
  'flight-objects.html', 'assets/objects/flight-lab-A4-en.pdf', 'assets/objects/CREDITS.md',
  'library/boeing-747-US_LETTER-ru.pdf',
  'library/monarch-A4-es.pdf',
  'library/family-lesson-es.html',
  'compare.html',
  'next.html',
  'es.html',
]) {
  if (!existsSync(join(out, path))) throw Error('Missing public file ' + path)
}
if (process.argv.includes('--cloudflare')) {
  cpSync(join(root, 'public-release/flight-book-routes.json'), join(out, '_routes.json'))
}
console.log('Static workshop ready in ' + out)
