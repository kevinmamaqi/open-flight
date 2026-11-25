import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'
import { PDFDocument } from 'pdf-lib'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { flightObjects } from '../apps/editor/assets/objects/activities.js'
import { bookPlan, readBookURL } from '../apps/editor/book-model.js'

const base = new URL(process.argv[2] ?? 'http://127.0.0.1:4197/')
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
try {
  // A deep link must never offer the fallback ring actions before its module has loaded.
  const loadingPage = await browser.newPage({ javaScriptEnabled: false })
  await loadingPage.goto(new URL('flight-objects.html?model=samara&lang=en', base).href)
  assert.equal(await loadingPage.locator('#activity-book').isVisible(), false)
  assert.equal(await loadingPage.locator('#kit').isVisible(), true)
  await loadingPage.close()
  for (const lang of ['en', 'es', 'ru']) {
    const lab = flightObjects(lang)
    const page = await browser.newPage({ locale: lang, viewport: { width: 375, height: 812 } })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    const home = new URL(lang === 'en' ? './' : lang + '.html', base)
    await page.goto(home.href)
    await page.locator('#plane-links a').first().waitFor()
    for (const paper of ['A4', 'US_LETTER']) {
      await page.selectOption('#download-paper', paper)
      const trialURL = new URL(await page.locator('#monarch-trial').getAttribute('href'), base)
      assert.deepEqual(readBookURL(trialURL).sheets, ['monarch-k1', 'monarch-k2'])
      assert.equal(readBookURL(trialURL).paper, paper)
      assert.equal(readBookURL(trialURL).lang, lang)
      assert.equal(trialURL.searchParams.get('p'), '4')
      await page.click('#monarch-trial')
      await page.locator('#book-page-4 canvas:not([hidden])').waitFor()
      const ready = page.waitForEvent('download')
      await page.click('#download-book')
      const trialDownload = await ready
      const trialBytes = await readFile(await trialDownload.path())
      const printable = await page.request.get(new URL('trials/monarch-k1-k2-' + paper + '-' + lang + '.pdf', base).href)
      assert.equal(printable.status(), 200)
      assert.ok(trialBytes.equals(await printable.body()), 'The direct printable and reader download must match')
      const trial = await getDocument({data: new Uint8Array(trialBytes), verbosity: 0}).promise
      try {
        const instructions = await (await trial.getPage(2)).getTextContent()
        const materials = instructions.items.map(item => item.str).join(' ')
        assert.match(materials, /120/)
        assert.match(materials, /33/)
        const log = await (await trial.getPage(4)).getTextContent()
        assert.ok(['K1', 'K2'].every(id => log.items.some(item => item.str === id)))
      } finally {
        await trial.destroy()
      }
      await page.goto(home.href)
      await page.locator('#plane-links a').first().waitFor()
    }
    await page.selectOption('#construction', 'w1')
    assert.equal(await page.locator('#monarch-trial').isVisible(), false)
    assert.equal(await page.locator('#object-links a').count(), 3)
    for (const item of lab.activities) {
      const a = page.locator('[data-object="' + item.id + '"]')
      assert.equal(await a.textContent(), item.title)
      const link = new URL(await a.getAttribute('href'), base)
      assert.equal(link.searchParams.get('model'), item.id)
      assert.equal(link.searchParams.get('lang'), lang)
      await page.selectOption('#download-model', item.id)
      assert.equal(await page.locator('#construction-field').isVisible(), false)
      for (const paper of ['A4', 'US_LETTER']) {
        await page.selectOption('#download-paper', paper)
        const packet = new URL(await page.locator('#download').getAttribute('href'), base)
        assert.equal(packet.pathname, new URL(lab.packets[paper],base).pathname)
        assert.equal(packet.hash, '#page=' + item.page)
        const res = await page.request.get(packet.href)
        assert.equal(res.status(), 200)
        assert.equal((await PDFDocument.load(await res.body())).getPageCount(), 3)
      }
    }
    await page.locator('[data-object="samara"]').click()
    await page.selectOption('#paper-size', 'US_LETTER')
    await page.click('#activity-book')
    assert.equal(await page.locator('[name="activity"][value="samara"]').isChecked(), true)
    await page.locator('[name="activity"][value="tandem"]').check()
    await page.reload()
    assert.equal(await page.locator('[name="activity"][value="tandem"]').isChecked(), true)
    const event = page.waitForEvent('download')
    await page.click('#download-book')
    const download = await event
    const pdf = await PDFDocument.load(await readFile(await download.path()))
    const options = page.locator('#reader-select option')
    assert.equal(await options.count(), pdf.getPageCount())
    assert.ok((await options.last().textContent()).includes(lab.activities[2].title))
    await page.selectOption('#reader-select', String(pdf.getPageCount()))
    await page.locator('#book-page-' + pdf.getPageCount() + ' canvas:not([hidden])').waitFor()
    await page.goto(new URL('classroom.html?lang=' + lang + '&objects=1&learners=11&team=3&paper=letter',base).href)
    const book = readBookURL(new URL(await page.locator('#starter').getAttribute('href'),base))
    assert.equal(book.paper,'US_LETTER')
    assert.deepEqual(book.activities,lab.activities.map(item=>item.id))
    const activityRows = await page.locator('#page-ranges tr').allTextContents()
    for (const item of lab.activities) assert.ok(activityRows.some(row => row.includes(item.title)))
    assert.equal(bookPlan(book).activityPages.length,3)
    await page.locator('#include-activities').uncheck()
    assert.equal((await page.locator('#starter').getAttribute('href')).includes('activities='),false)
    await page.goto(new URL('compare.html?lang=' + lang + '&left=ring&right=samara',base).href)
    assert.deepEqual(await page.locator('.compare-card h2').allTextContents(), lab.activities.slice(0,2).map(item=>item.title))
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth + 1), true)
    assert.deepEqual(errors,[])
    console.log(lang + ': paired Monarch trial in both sizes, three activities, book PDF, class copy plan and comparison passed')
    await page.close()
  }
} finally {
  await browser.close()
}
