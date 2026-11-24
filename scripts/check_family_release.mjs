import assert from 'node:assert/strict'
import { readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { createBook } from '../packages/print-export/family-book.js'
import { bookSupport } from '../apps/editor/book-support.js'

const base = new URL(process.argv[2])
const shots = process.argv[3]
if (shots) await mkdir(shots, {recursive: true})
const publicAssets = fileURLToPath(new URL('../apps/editor/', import.meta.url))
const browser = await chromium.launch()
try {
  const ctx = await browser.newContext({viewport:{width:390,height:844}})
  const errors = [], external = []
  await ctx.route('**/*', route => {
    if (new URL(route.request().url()).origin === base.origin) return route.continue()
    external.push(route.request().url())
    return route.abort()
  })
  await ctx.addInitScript(() => Object.defineProperty(document, 'fullscreenEnabled', {get:()=>false}))
  const page = await ctx.newPage()
  page.on('pageerror', e => errors.push(e.message))
  page.on('response', r => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()) })
  await page.goto(new URL('es.html', base).href)
  await page.locator('#book-link').click()
  await page.locator('#download-book:enabled').waitFor()
  await page.locator('#fullscreen').click()
  assert.ok(await page.locator('body').evaluate(el => el.classList.contains('is-expanded')))
  await page.keyboard.press('Escape')
  await page.locator('#cover-input').fill('Alas del sábado')
  await page.locator('label:has(input[value="sunset"])').click()
  await page.locator('label:has(input[value="US_LETTER"])').click()
  await page.reload()
  await page.locator('#download-book:enabled').waitFor()
  assert.equal(await page.locator('#cover-input').inputValue(), 'Alas del sábado')
  assert.equal(await page.locator('#book-cover').getAttribute('data-paper'), 'US_LETTER')
  const support = bookSupport('es')
  assert.equal(await page.locator('#support').isVisible(), Boolean(support.url))
  if (support.url) assert.equal(await page.locator('#support').getAttribute('href'), support.url)
  const file = page.waitForEvent('download')
  await page.locator('#download-book').click()
  const downloaded = await readFile(await (await file).path())
  const expected = await createBook({lang:'es',paper:'US_LETTER',theme:'sunset',cover:'Alas del sábado'}, {
    loadAsset:path => readFile(join(publicAssets, path)),
  })
  assert.ok(downloaded.equals(Buffer.from(expected)), 'Browser and local book engines must produce the same complete PDF')
  for (const lang of ['es','en','ru']) {
    await page.goto(new URL('motor.html?lang='+lang, base).href)
    await page.locator('#phone-files a').first().waitFor()
    assert.equal(await page.locator('html').getAttribute('lang'),lang)
    assert.equal(await page.locator('#bom li').count(),7)
    assert.equal(await page.locator('#bench-files a').count(),3)
    assert.equal(await page.locator('#phone-files a').count(),2)
    assert.equal(await page.locator('#files a').count(),5)
    assert.match(await page.locator('#commercial-links a').first().getAttribute('href'), /powerup|shopify/i)
    await page.locator('main img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading = "eager"; return img.decode()})))
    assert.ok(await page.locator('main img').evaluateAll(imgs=>imgs.every(img=>img.complete && img.naturalWidth>0)))
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))
    for(const link of await page.locator('#phone-files a, #bench-files a, #files a').all()) {
      const href=await link.getAttribute('href'), result=await page.request.get(new URL(href,base).href)
      assert.equal(result.status(),200,href)
      const path = new URL(href,base).pathname
      if(path.endsWith('.zip')) assert.equal((await result.body()).subarray(0,2).toString(),'PK')
      if(path.endsWith('OF-M0-r1-bench.ino')) assert.equal(await result.text(), await readFile(join(publicAssets,'assets/motor/OF-M0-r1-bench.ino'),'utf8'))
    }
  }
  if(shots) {
    await page.setViewportSize({width:1280,height:860})
    for(const [name,route] of [['motor','motor.html?lang=en'],['book','book.html?lang=en'],['home-book','?lang=en#family-book']]) {
      await page.goto(new URL(route,base).href)
      await page.evaluate(()=>document.fonts.ready)
      if(name==='home-book') await page.locator('#family-book').scrollIntoViewIfNeeded()
      await page.screenshot({path:join(shots,name+'.png')})
    }
  }
  assert.deepEqual(errors, [])
  assert.deepEqual(external, [])
  console.log('Home to book, fullscreen fallback, reload, byte-identical custom PDF and all motor downloads verified without external requests.')
} finally { await browser.close() }
