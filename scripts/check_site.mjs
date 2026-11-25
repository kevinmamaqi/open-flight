// Verify the generated site before it can trigger a production build.
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { workshopHome } from '../apps/editor/assets/workshop-address.js'
import { languageAlternates, sitemapRoutes } from '../apps/editor/site-pages.js'
import { publicPath, siteLocales } from '../apps/editor/site-navigation.js'

const output = resolve(process.argv[2] ?? 'dist/site')
const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8')
assert.match(readFileSync(join(output, 'robots.txt'), 'utf8'), /^Sitemap: https:\/\/openflight\.design\/sitemap\.xml$/m)
const titles = new Set()
const descriptions = new Set()
// Print & Play pages are written by scripts/build_print_and_play.mjs.
const routes = ['home', ...sitemapRoutes, 'print']
const indexed = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(.*?)<\/url>/g)]
assert.equal(indexed.length, routes.length * siteLocales.length)
const sitemapEntries = new Map(indexed.map(([, url, alternates]) => [url, alternates]))

function checkLocalResource(path, canonical, product) {
  const url = new URL(path, canonical)
  if (url.origin !== new URL(workshopHome).origin) return
  let relative = decodeURIComponent(url.pathname.slice(1))
  if (!relative || relative.endsWith('/')) relative += 'index.html'
  if (relative === 'es' || relative === 'ru') relative += '.html'
  const file = join(output, relative)
  assert.ok(existsSync(file) && statSync(file).isFile(), `${canonical} references missing ${relative}`)
  if (product && url.pathname === new URL(canonical).pathname && url.hash)
    assert.ok(url.hash === '#main' || ids.has(decodeURIComponent(url.hash.slice(1))), `${canonical} links to a missing anchor ${url.hash}`)
}
let ids = new Set()

for (const route of routes) {
  for (const lang of siteLocales) {
    const path = publicPath(route, lang)
    const file = route === 'home' && lang !== 'en' ? path + '.html' : path + 'index.html'
    const document = readFileSync(join(output, file), 'utf8')
    const canonical = workshopHome + path
    const got = { alternates: {}, headings: 0, menu: 0, resources: [], crumbs: 0, externalScripts: 0 }
    new HTMLRewriter()
      .on('html', { element: el => { got.lang = el.getAttribute('lang') } })
      .on('title', { text: part => { got.title = (got.title ?? '') + part.text } })
      .on('meta[name=description]', { element: el => { got.description = el.getAttribute('content') } })
      .on('meta[name=robots]', { element: el => { got.robots = el.getAttribute('content') } })
      .on('link[rel=canonical]', { element: el => { got.canonical = el.getAttribute('href') } })
      .on('link[rel=alternate][hreflang]', { element: el => { got.alternates[el.getAttribute('hreflang')] = el.getAttribute('href') } })
      .on('main h1', { element: () => { got.headings++ } })
      .on('.mast .workshop-menu a', { element: () => { got.menu++ } })
      .on('.breadcrumbs li[aria-current=page]', { element: () => { got.crumbs++ } })
      .on('a[href], link[rel=stylesheet]', { element: el => { got.resources.push(el.getAttribute('href')) } })
      .on('img[src], script[src]', { element: el => {
        got.resources.push(el.getAttribute('src'))
        if (el.tagName === 'script') got.externalScripts++
      } })
      .transform(document)
    assert.equal(got.lang, lang, canonical)
    assert.equal(got.canonical, canonical)
    assert.equal(got.headings, 1, canonical)
    assert.ok(got.menu >= 8, canonical + ' is missing the prerendered menu')
    assert.ok(got.description?.length > 30 && !descriptions.has(got.description), canonical + ' needs a distinct description')
    assert.ok(got.title?.includes('Open Flight') && !titles.has(got.title), canonical + ' needs a distinct title')
    assert.ok(!got.robots?.includes('noindex'), canonical)
    descriptions.add(got.description)
    titles.add(got.title)
    assert.deepEqual(got.alternates, Object.fromEntries(languageAlternates(route)), canonical)
    assert.ok(sitemapEntries.has(canonical), canonical + ' is missing from the sitemap')
    for (const [locale, href] of languageAlternates(route))
      assert.ok(sitemapEntries.get(canonical).includes(`hreflang="${locale}" href="${href}"`), canonical)
    if (route !== 'home' && route !== 'print') {
      // Every page loads the navigation script; a plate adds its own.
      assert.equal(got.externalScripts, route.includes('/') ? 2 : 1, canonical + ' unexpected script count')
      if (route.includes('/')) {
        assert.ok(document.includes('data-plate-page=') && document.includes('plate-page.js'), canonical)
        assert.ok(got.resources.some(path=>path.includes('.pdf')), canonical+' needs a printable fallback')
      }
      assert.equal(got.crumbs, 1, canonical)
      const json = document.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
      const trail = JSON.parse(json)
      assert.equal(trail['@type'], 'BreadcrumbList')
      assert.equal(trail.itemListElement.at(-1)?.item, canonical)
      assert.ok(trail.itemListElement.every((item, index) => item.position === index + 1 && sitemapEntries.has(item.item)), canonical)
    }
    ids = new Set([...document.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]))
    for (const resource of got.resources) checkLocalResource(resource, canonical, route !== 'home')
  }
}
console.log(`${sitemapEntries.size} localised indexable pages have matching metadata, crawlable navigation and valid release links`)
