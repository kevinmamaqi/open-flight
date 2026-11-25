// Exercise the consumer path through the built workshop (serve dist/site over HTTP).
import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { productRoutes } from '../apps/editor/site-pages.js'
import { publicPath } from '../apps/editor/site-navigation.js'
import { appearanceChoices } from '../apps/editor/model-appearance.js'
import { PDFDocument } from 'pdf-lib'
import { readFile } from 'node:fs/promises'

const base = process.argv[2] || 'http://127.0.0.1:4876/'
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const errors = []
page.on('pageerror', (err) => errors.push(err.message))
try {
  for (const lang of ['en', 'es', 'ru'])
    for (const route of productRoutes.filter((route) => route.includes('/'))) {
      await page.goto(new URL(publicPath(route, lang), base).href)
      const [family, id] = route.split('/')
      const appearance = appearanceChoices(id, lang).at(-1).id
      await page.locator('[data-paint="' + appearance + '"]').click()
      await page.locator('.size').selectOption('US_LETTER')
      assert.equal(
        await page.locator('[data-paint="' + appearance + '"]').getAttribute('aria-pressed'),
        'true',
      )
      assert.ok((await page.locator('.model-book').getAttribute('href')).includes('paint=' + appearance))
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        route + ' overflows',
      )
      if (lang !== 'en') continue
      await page.locator('.explore').click()
      await page.locator('.model-canvas canvas').waitFor({ state: 'visible', timeout: 10000 })
      await page.locator('.angle').selectOption('8')
      if (family === 'flying-objects') await page.locator('.setting').selectOption('1')
      await page.locator('.play').click()
      await page.waitForFunction(() => Number(document.querySelector('.flight-position').value) > 1)
      if (family === 'flying-objects') {
        const href = await page.locator('.model-print').getAttribute('href')
        assert.match(href, /US_LETTER-en-indigo.pdf#page=[123]/)
        const response = await page.request.get(new URL(href, page.url()).href)
        assert.equal((await PDFDocument.load(await response.body())).getPageCount(), 3)
      } else {
        const download = page.waitForEvent('download', { timeout: 15000 })
        await page.locator('.model-print').click()
        const file = await download
        assert.ok(file.suggestedFilename().includes(appearance))
        const pdf = await PDFDocument.load(await readFile(await file.path()))
        assert.equal(pdf.getPageCount(), family === 'airplanes' ? 5 : 3)
      }
      await page.goto('about:blank')
    }
  await page.goto(new URL('book.html?lang=es#m=&activities=samara&hero=samara&a=samara:indigo', base).href)
  await page.locator('[data-edit="samara"]').click()
  assert.equal(await page.locator('#cover-model').isDisabled(), true)
  assert.equal(await page.locator('[data-appearance="indigo"]').getAttribute('aria-pressed'), 'true')
  await page.locator('#book-cover').scrollIntoViewIfNeeded()
  await page.locator('#cover-canvas').waitFor({ state: 'visible', timeout: 20000 })
  assert.equal(await page.locator('#reader-select option').count(), 6)
  assert.deepEqual(errors, [])
  console.log(
    '30 model pages, ten interactive flight views and colored print outputs, and a six-page object-only book passed.',
  )
} finally {
  await browser.close()
}
