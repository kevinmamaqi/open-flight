// Print & Play, built at site-build time:
//   print/singles/<plateId>-<paper>-<lang>.pdf   10 designs x 2 papers x 3 languages = 60 files
//   print/sets/<set>-<paper>-<lang>.pdf          3 ready sets x 2 papers x 3 languages = 18 files
//   print/manifest.json                          bytes and pages of every file, for the page's size line
//   print/index.html, es/print/index.html, ru/print/index.html
// Each single copies its pages from one source document in one call, so shared fonts and
// images arrive once (1,384 KB against 467 KB in the review's measurement). A custom set of
// two or three designs is joined in the browser from these singles; the ready sets are the same
// join done here, so the page, the service and the files agree byte for byte.
//   bun scripts/build_print_and_play.mjs [outDir]    build everything (default dist/site)
//   bun scripts/build_print_and_play.mjs --engine    refresh apps/editor/print-merge-engine.js
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument } from 'pdf-lib'
import { breadcrumbs, escapeHtml as e, navHref, publicPath, siteHeader, siteLabels, siteLocales } from '../apps/editor/site-navigation.js'
import { workshopHome } from '../apps/editor/assets/workshop-address.js'
import { printCopy, printName } from '../apps/editor/print-copy.js'
import { printFooterHtml, printPageHtml } from '../apps/editor/print-page.js'
import { designIds, paperToken, printPapers, readySets, setPath, singlePath } from '../apps/editor/print-and-play.js'
import { mergePdfs, setTitle } from '../apps/editor/print-merge.js'
import { buildSingle, printContext } from '../packages/print-export/print-and-play.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const editor = join(root, 'apps/editor')
const ogLocale = { en: 'en_US', es: 'es_ES', ru: 'ru_RU' }

/** The browser's copy of apps/editor/print-merge.js: pdf-lib bundled, nothing else. */
export async function buildMergeEngine() {
  const bundle = await Bun.build({
    entrypoints: [join(editor, 'print-merge.js')], target: 'browser', format: 'esm', minify: true,
  })
  if (!bundle.success) throw new Error(bundle.logs.join('\n'))
  return (await bundle.outputs[0].text()).replaceAll('` \n', '`\\x20\n')
}

function write(file, data) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, data)
}

/** One language's /print/ page, written from apps/editor/print.html with its own relative paths. */
export function renderPrintPage(template, lang, assetKey = '') {
  const base = lang === 'en' ? '../' : '../../'
  const canonical = workshopHome + publicPath('print', lang)
  const title = printCopy.documentTitle[lang]
  const description = printCopy.description[lang]
  const alternates = [...siteLocales.map(code => [code, workshopHome + publicPath('print', code)]), ['x-default', workshopHome + publicPath('print', 'en')]]
  const head = `
    <link rel="canonical" href="${canonical}">
    ${alternates.map(([code, href]) => `<link rel="alternate" hreflang="${code}" href="${href}">`).join('\n    ')}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Open Flight">
    <meta property="og:locale" content="${ogLocale[lang]}">
    ${siteLocales.filter(code => code !== lang).map(code => `<meta property="og:locale:alternate" content="${ogLocale[code]}">`).join('\n    ')}
    <meta property="og:title" content="${e(title)}">
    <meta property="og:description" content="${e(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${workshopHome}assets/brand/social-${lang}.png">
    <meta name="twitter:card" content="summary_large_image">
  </head>`
  const trail = breadcrumbs([{ label: siteLabels.home[lang], href: navHref('home', lang, base) }, { label: printName[lang] }], lang)
  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${e(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/, `$1${e(description)}$2`)
    .replace('</head>', head)
    .replace(/(href|src)="\.\//g, `$1="${base}`)
    .replace(/(print\.css|print\.js|tokens\.css|system\.css)"/g, `$1${assetKey}"`)
    .replace('<body data-base="./">', `<body data-base="${base}">`)
    .replace(/(<a class="skip-link"[^>]*>)[^<]*(<\/a>)/, `$1${e(siteLabels.skip[lang])}$2`)
    .replace('<header class="mast" data-site-page="print"></header>', `<header class="mast" data-site-page="print">${siteHeader('print', lang, base, 'print')}</header>`)
    .replace('<div id="print-trail"></div>', `<div id="print-trail">${trail}</div>`)
    .replace('<div id="print-root"></div>', `<div id="print-root">${printPageHtml(lang, base)}</div>`)
    .replace('<footer class="site-footer wrap" id="footer"></footer>', `<footer class="site-footer wrap" id="footer">${printFooterHtml(lang, base)}</footer>`)
  if (html.includes('data-base="./"') || !html.includes('print-root">')) throw new Error('print.html changed shape: update renderPrintPage')
  return html
}

function addToSitemap(out) {
  const file = join(out, 'sitemap.xml')
  if (!existsSync(file)) return
  const current = readFileSync(file, 'utf8')
  if (current.includes(workshopHome + 'print/')) return
  const alternates = [...siteLocales, 'x-default'].map(code =>
    `<xhtml:link rel="alternate" hreflang="${code}" href="${workshopHome + publicPath('print', code === 'x-default' ? 'en' : code)}"/>`).join('')
  const urls = siteLocales.map(lang => `<url><loc>${workshopHome + publicPath('print', lang)}</loc>${alternates}</url>`).join('\n')
  writeFileSync(file, current.replace('</urlset>', urls + '\n</urlset>'))
}

export async function buildPrintAndPlay(outDir, { assetKey = '' } = {}) {
  const out = resolve(root, outDir)
  const context = printContext(path => readFile(join(editor, path)))
  const files = {}
  const keep = (path, bytes, pages) => {
    write(join(out, path), bytes)
    files[path.replace(/^print\//, '')] = { bytes: bytes.length, pages }
  }
  const pagesOf = async bytes => (await PDFDocument.load(bytes, { updateMetadata: false })).getPageCount()
  const singles = new Map()
  for (const paper of printPapers) {
    for (const lang of ['en', 'es', 'ru']) {
      for (const id of designIds) {
        const bytes = await buildSingle(id, { paper, lang }, context)
        singles.set(id + paper + lang, bytes)
        keep(singlePath(id, paper, lang), bytes, await pagesOf(bytes))
      }
      for (const set of readySets) {
        // The cut-border sets join the singles written above; "No scissors" needs whole-sheet airplanes.
        const parts = []
        for (const id of set.plates)
          parts.push(set.edge === 'cut' ? singles.get(id + paper + lang) : await buildSingle(id, { paper, lang, edge: set.edge }, context))
        const bytes = await mergePdfs(parts, { title: setTitle(set.plates), lang })
        keep(setPath(set.id, paper, lang), bytes, await pagesOf(bytes))
      }
    }
  }
  write(join(out, 'print/manifest.json'), JSON.stringify({ edition: 'print-and-play-1', papers: printPapers.map(paperToken), files }, null, 1) + '\n')
  const template = readFileSync(join(editor, 'print.html'), 'utf8')
  for (const lang of siteLocales) write(join(out, publicPath('print', lang), 'index.html'), renderPrintPage(template, lang, assetKey))
  // The page imports the book's shared modules. build_site.mjs copies only top-level editor files,
  // so make sure these two reach the site (copying a file twice is harmless).
  for (const name of ['catalog.js', 'flight-notes.js']) cpSync(join(editor, 'book', name), join(out, 'book', name))
  addToSitemap(out)
  return { files: Object.keys(files).length, bytes: Object.values(files).reduce((sum, file) => sum + file.bytes, 0) }
}

if (import.meta.main) {
  if (process.argv.includes('--engine')) {
    writeFileSync(join(editor, 'print-merge-engine.js'), await buildMergeEngine())
    console.log('Wrote apps/editor/print-merge-engine.js')
  } else {
    const result = await buildPrintAndPlay(process.argv[2] ?? 'dist/site')
    console.log('Print & Play: ' + result.files + ' PDFs, ' + (result.bytes / 1048576).toFixed(1) + ' MB')
  }
}
