import { languageAlternates, productRoutes, renderProduct, sitemapRoutes } from '../apps/editor/site-pages.js'
import { renderHome } from '../apps/editor/site-home.js'
import { breadcrumbs, publicPath, siteHeader, siteLabels, toolTrail } from '../apps/editor/site-navigation.js'
import { monarchTrialSheets } from '../apps/editor/book-model.js'
import { paperSizes, sheetLocales } from '../apps/editor/family-sheets.js'
import { createBook } from '../packages/print-export/family-book.js'
import { workshopHome as domain } from '../apps/editor/assets/workshop-address.js'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url)),
  editor = join(root, 'apps/editor')
const out = resolve(root, process.argv[2] ?? 'dist/site')
mkdirSync(out, { recursive: true })
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
function versionHtml(source, lang = 'en') {
  const rewrite = new HTMLRewriter()
    .on('[data-site-page]', {
      element(el) {
        el.setInnerContent(siteHeader(el.getAttribute('data-site-page'), lang), { html: true })
      },
    })
    .on('[data-site-skip]', replaceText(siteLabels.skip[lang]))
    .on('script[src]', versionAttribute('src'))
    .on('link[rel="stylesheet"]', versionAttribute('href'))
  const page = source.match(/data-site-page="([\w-]+)"/)?.[1]
  if (page && page !== 'home') {
    rewrite.on('head', { element: el => el.append('<meta name="robots" content="noindex">', { html: true }) })
    rewrite.on('[data-site-trail]', {
      element: el => el.setInnerContent(breadcrumbs(toolTrail(page, lang), lang), { html: true }),
    })
  }
  return rewrite.transform(source)
}
// The home page is the book's cover and contents, rendered in each language.
// The files stay in apps/editor so the local editor server can serve them too.
for (const [lang, file] of [['en', 'atlas.html'], ['es', 'es.html'], ['ru', 'ru.html']])
  writeFileSync(join(editor, file), renderHome(lang))
for (const entry of readdirSync(editor, { withFileTypes: true })) {
  const dest =
    entry.name === 'index.html' ? 'studio.html' : entry.name === 'atlas.html' ? 'index.html' : entry.name
  const source = join(editor, entry.name)
  if (entry.isDirectory() && ['assets', 'library', 'book'].includes(entry.name))
    cpSync(source, join(out, dest), {
      recursive: true,
      filter: (p) => !p.endsWith('.d.ts'),
    })
  if (entry.isFile() && entry.name.endsWith('.html'))
    writeFileSync(join(out, dest), versionHtml(readFileSync(source, 'utf8'), ['es.html', 'ru.html'].includes(entry.name) ? entry.name.slice(0, 2) : 'en'))
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
for (const route of productRoutes) {
  for (const lang of sheetLocales) {
    const directory = join(out, publicPath(route, lang))
    mkdirSync(directory, { recursive: true })
    writeFileSync(join(directory, 'index.html'), renderProduct(route, lang, assetKey))
  }
}
const sitemap = ['home', ...sitemapRoutes].flatMap(route => {
  const alternates = languageAlternates(route).map(([lang, href]) =>
    '<xhtml:link rel="alternate" hreflang="' + lang + '" href="' + href + '"/>',
  ).join('')
  return sheetLocales.map(lang =>
    '<url><loc>' + domain + publicPath(route, lang) + '</loc>' + alternates + '</url>',
  )
})
writeFileSync(join(out, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  sitemap.join('\n') + '\n</urlset>\n',
)
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + domain + 'sitemap.xml\n')
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
// Print & Play (apps/editor/print.html): static PDFs under print/ and the /print/, /es/print/ and /ru/print/ pages.
await (await import('./build_print_and_play.mjs')).buildPrintAndPlay(out, { assetKey })
console.log('Static workshop ready in ' + out)
