import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { sheetFor } from '../packages/product-core/aircraft.ts'
import { pdf } from '../packages/print-export/sheets.ts'
import { makePlane, planePdf } from '../packages/planes/index.ts'

const base = new URL(process.argv[2] ?? 'http://127.0.0.1:4190/')
if (!base.pathname.endsWith('/')) base.pathname += '/'
const shots = process.argv[3]
if (shots) mkdirSync(shots, { recursive: true })
const social = process.argv[4]
const hash = (data) => createHash('sha256').update(data).digest('hex')
const browser = await chromium.launch()
async function bytes(page, link) {
  return Buffer.from(
    await link.evaluate(async (a) => Array.from(new Uint8Array(await (await fetch(a.href)).arrayBuffer()))),
  )
}
async function download(page, locator) {
  const [out] = await Promise.all([page.waitForEvent('download'), locator.click()])
  return readFileSync(await out.path())
}
async function setRange(locator, value) {
  const { min, step } = await locator.evaluate((input) => ({
    min: Number(input.min),
    step: Number(input.step) || 1,
  }))
  await locator.focus()
  await locator.press('Home')
  for (let n = min; n < value; n += step) await locator.press('ArrowRight')
  assert.equal(Number(await locator.inputValue()), value)
}
try {
  for (const [width, lang] of [
    [1440, 'en'],
    [390, 'ru'],
    [390, 'es'],
  ]) {
    const ctx = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      reducedMotion: 'reduce',
    })
    const page = await ctx.newPage(),
      errors = [],
      bad = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('response', (res) => {
      if (res.url().startsWith(base.href) && res.status() >= 400)
        bad.push([res.status(), res.url().split('?')[0]])
    })
    await page.goto(new URL('?lang=' + lang, base).href)
    await page.locator('#plane-links a').first().waitFor()
    assert.equal(await page.locator('html').getAttribute('lang'), lang)
    assert.equal(await page.locator('.family-links a').count(), 7)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true)
    await page.locator('#next').click()
    assert.match(await page.locator('#hero-link').getAttribute('href'), /boeing-747/)
    await page.locator('#back').click()
    if (shots) await page.screenshot({ path: join(shots, 'home-' + lang + '.png') })
    if (social) {
      const original = page.viewportSize()
      await page.setViewportSize({ width: 1200, height: 630 })
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: join(social, 'workshop-preview-' + lang + '.png') })
      await page.setViewportSize(original)
    }
    // Every home route stays reachable on a phone, including the comparison and motor notebook.
    await page.locator('.workshop-menu > summary').click()
    assert.equal(await page.locator('.workshop-links a:visible').count(), 8)
    await page.locator('.workshop-links a[href*="compare.html"]').click()
    await page.locator('#left-model').selectOption('swallowtail')
    await page.locator('#right-model').selectOption('douglas-dc3')
    assert.equal(await page.locator('.compare-card').count(), 2)
    assert.equal(await page.locator('.measure-list dd').first().textContent(), '180 mm')
    assert.equal(await page.locator('.measure-list dd').last().textContent(), '8 mm')
    assert.equal(await page.locator('.trial-line span').count(), 10)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true)
    const altLanguage = lang === 'es' ? 'ru' : 'es'
    await page.locator('#' + altLanguage).click()
    await page.locator('#right-model').waitFor()
    assert.equal(await page.locator('#right-model').inputValue(), 'douglas-dc3')
    await page.locator('#' + lang).click()
    if (shots) await page.screenshot({ path: join(shots, 'compare-' + lang + '.png') })
    await page.goto(new URL('next.html?lang=' + lang, base).href)
    await page.locator('.stage').first().waitFor()
    assert.equal(await page.locator('.stage').count(), 4)
    assert.equal(await page.locator('#sources a').count(), 6)
    await page.locator('#circuit').click()
    await page.locator('.ofv [data-v=gate]:visible').waitFor()
    await page.locator('[data-v=gate]').selectOption('turn')
    assert.equal(await page.locator('[data-v=gate]').inputValue(), 'turn')
    await page.goto(new URL(lang === 'en' ? '?lang=en' : lang + '.html', base).href)
    await page.locator('#plane-links a').first().waitFor()
    assert.match(
      await page.locator('#lesson-file').getAttribute('href'),
      new RegExp('family-lesson-' + lang + '\\.html$'),
    )
    const offline = await page.request.get(new URL('library/family-lesson-' + lang + '.html', base).href)
    assert.equal(offline.status(), 200)
    assert.match(await offline.text(), new RegExp('<html lang="' + lang + '"'))
    const libraryDownload = page.locator('#download')
    assert.equal(await libraryDownload.getAttribute('download'), 'monarch-k1-A4-' + lang + '.pdf')
    await page.locator('#construction').selectOption('w1')
    assert.equal(await libraryDownload.getAttribute('download'), 'monarch-A4-' + lang + '.pdf')
    await page.locator('#download-model').selectOption('boeing-747')
    assert.equal(await page.locator('#construction-field').isVisible(), false)
    await page.locator('#download-model').selectOption('morpho')
    await page.locator('#construction').selectOption('k1')
    await page.locator('#download-paper').selectOption('US_LETTER')
    assert.equal(await libraryDownload.getAttribute('download'), 'morpho-k1-US_LETTER-' + lang + '.pdf')
    const print = await download(page, libraryDownload)
    assert.equal(print.subarray(0, 4).toString(), '%PDF')
    assert.equal((print.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length, 2)
    await page.locator('.family-cta[data-route=butterfly]').click()
    await page.locator('#preview svg').waitFor()
    assert.equal(await page.locator('#view').inputValue(), 'folded')
    assert.equal(await page.locator('#species').inputValue(), 'monarch')
    await page.goBack()
    await page.locator('#classic-butterfly').click()
    await page.locator('.species-card[data-species=monarch]').waitFor()
    assert.equal(await page.locator('html').getAttribute('lang'), lang)
    await page.locator('#butter-physics summary').click()
    assert.ok((await page.locator('#butter-physics p').innerText()).length > 55)
    await setRange(page.locator('#left-trim'), 8)
    await setRange(page.locator('#right-trim'), -4)
    await setRange(page.locator('#wing'), 176)
    await page.locator('#spatial-step').click()
    await page.locator('#spatial-dialog[open] .ofv').waitFor()
    await page.locator('#spatial-flight').click()
    await page.locator('#spatial-flight[aria-pressed="true"]').waitFor()
    await page.locator('.ofv [data-v="progress"]').focus()
    await page.locator('.ofv [data-v="progress"]').press('End')
    if (shots)
      await page.screenshot({
        path: join(shots, 'butterfly-flight-' + lang + '.png'),
      })
    await page.keyboard.press('Escape')
    await page.locator('#print-design').click()
    await page.locator('#paper').selectOption('US_LETTER')
    await page.locator('#prepare-print').click()
    const srcLink = page.locator('#downloads [data-kind=source]')
    await srcLink.waitFor({ timeout: 30000 })
    const source = await bytes(page, srcLink),
      data = JSON.parse(source)
    assert.deepEqual(data.parameters, {
      left_trim_deg: 8,
      right_trim_deg: -4,
      span_mm: 176,
    })
    const ref = {
      design_id: data.design_id,
      revision_id: data.revision_id,
      source_sha256: hash(source),
    }
    const rawPdf = await bytes(page, page.locator('#downloads [data-kind=print-pdf]'))
    const expected = pdf(
      sheetFor(
        {
          ref,
          name: '',
          evidence_state: 'modified_experiment',
          parameters: data.parameters,
          species_id: 'monarch',
          appearance_id: data.appearance_id,
        },
        'US_LETTER',
        lang,
      ),
    )
    assert.equal(
      hash(rawPdf),
      hash(expected),
      'browser butterfly PDF matches the Node renderer byte for byte',
    )
    assert.match(
      (await bytes(page, page.locator('#downloads [data-kind=guide]'))).toString(),
      /data:image\/jpeg;base64/,
    )
    const address = page.url()
    await page.reload()
    await page.waitForFunction(() => document.querySelector('#wing')?.value === '176')
    assert.equal(page.url(), address)
    await page.goto(new URL('planes.html?model=tupolev-tu144&lang=' + lang, base).href)
    await page.locator('[data-model=tupolev-tu144]').waitFor()
    assert.equal(await page.locator('[data-model]').count(), 4)
    await page.locator('#plane-physics summary').click()
    assert.ok((await page.locator('#plane-physics p').innerText()).length > 55)
    await setRange(page.locator('#keel'), 26)
    await setRange(page.locator('#tips'), 10)
    await page.locator('#paper').selectOption('US_LETTER')
    await page.locator('#next').click()
    assert.match(await page.locator('#step-count').textContent(), /2/)
    await page.locator('#save').click()
    await page.locator('[data-copy-index]').first().waitFor()
    const planeSource = JSON.parse(await download(page, page.locator('#source')))
    assert.equal(planeSource.keel_mm, 26)
    assert.equal(planeSource.winglet_mm, 10)
    assert.equal(planeSource.model_id, 'tupolev-tu144')
    const output = await download(page, page.locator('.pdf').first())
    assert.equal(hash(output), hash(planePdf(makePlane(planeSource, lang))), 'airplane PDF parity')
    if (shots)
      await page.screenshot({
        path: join(shots, 'airplanes-' + lang + '.png'),
      })
    await page.goto(new URL('references.html?lang=' + lang + '#powered', base).href)
    await page.locator('#butter article').first().waitFor()
    assert.equal(await page.locator('#planes article').count(), 4)
    assert.equal(await page.locator('#planes article img').count(), 4)
    assert.equal(await page.locator('#butter article').count(), 3)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true)
    assert.deepEqual(errors, [])
    assert.deepEqual(bad, [])
    await ctx.close()
    console.log(
      'PASS ' +
        width +
        ' px ' +
        lang +
        ' · home, 7 designs, 3D, local save/reload, references and exact edited PDF exports for both families',
    )
  }
  const narrow = await browser.newPage({viewport:{width:320,height:720},reducedMotion:'reduce'})
  for (const path of ['es.html','keel.html?lang=es','compare.html?lang=es','next.html?lang=ru','studio.html?lang=es','planes.html?lang=ru','references.html?lang=es']) {
    await narrow.goto(new URL(path,base).href)
    const trigger=narrow.locator('.workshop-menu summary')
    await trigger.click()
    const bounds=await narrow.locator('.workshop-links').boundingBox()
    assert.ok(bounds && bounds.x >= 0 && bounds.x+bounds.width <= 321,'Menu fits at 320 px on '+path)
    const overflow=await narrow.evaluate(()=>document.documentElement.scrollWidth-innerWidth)
    assert.ok(overflow<=1,'Page overflow at 320 px on '+path+' ('+overflow+' px)')
    await trigger.press('Escape')
  }
  await narrow.close()
} finally {
  await browser.close()
}
