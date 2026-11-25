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
      if (process.env.OPENFLIGHT_SCREENSHOTS && lang === 'en' && id === 'monarch') {
        await page.evaluate(() => document.fonts.ready)
        await page.screenshot({ path: process.env.OPENFLIGHT_SCREENSHOTS + '/monarch-mobile.png' })
        await page.setViewportSize({ width: 1280, height: 900 })
        await page.screenshot({ path: process.env.OPENFLIGHT_SCREENSHOTS + '/monarch.png' })
        await page.setViewportSize({ width: 390, height: 844 })
      }
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
      const panels = page.locator('.model-workbench > .bench-panel')
      assert.equal(await panels.count(), 4)
      const [specimen, controls, lesson, origin] = await panels.evaluateAll((items) =>
        items.map((el) => el.getBoundingClientRect().top),
      )
      assert.ok(specimen < controls && controls < lesson && lesson < origin, route + ' mobile panel order')
      await page.locator('.path-mode').click()
      await page.locator('.sketch-play').click()
      await page.waitForFunction(() => Number(document.querySelector('.sketch-position').value) > 1)
      await page.locator('.specimen-mode').click()
      const steps = page.locator('.lesson-steps li:visible')
      assert.equal(await steps.count(), 1)
      const first = await steps.innerText()
      await page.locator('.lesson-next').click()
      assert.notEqual(await steps.innerText(), first)
      await page.locator('.lesson-prev').click()
      assert.equal(await steps.innerText(), first)
      if (family !== 'flying-objects') {
        await page.locator('.origin-map > summary').click()
        await page.locator('.of-model-map__map').waitFor({ state: 'visible' })
        await page.locator('.origin-map > summary').click()
      } else assert.match(await page.locator('.origin-panel > a').getAttribute('href'), /^https:/)
      if (lang !== 'en') continue
      if (family === 'butterflies') {
        assert.match(await page.locator('.model-poster').getAttribute('src'), /-k2-[a-z]+\.svg$/)
        await page.locator('.span-range').fill('180')
        await page.waitForFunction(() =>
          document.querySelector('.model-poster').src.startsWith('data:image/svg+xml'),
        )
        assert.equal(await page.locator('[data-stage-span]').innerText(), '180 mm')
        assert.match(await page.locator('[data-model-studio]').getAttribute('href'), /span=180/)
      }
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
  await page.setViewportSize({ width: 1280, height: 900 })
  for (const route of productRoutes.filter((route) => route.includes('/'))) {
    await page.goto(new URL(publicPath(route, 'en'), base).href)
    await page.locator('[data-model-workbench][data-ready]').waitFor()
    const [specimen, controls, lesson, origin] = await page
      .locator('.model-workbench > .bench-panel')
      .evaluateAll((items) =>
        items.map((el) => {
          const { x, y, right, bottom } = el.getBoundingClientRect()
          return { x, y, right, bottom }
        }),
      )
    assert.ok(specimen.right < controls.x && specimen.y === controls.y, route + ' upper row')
    assert.ok(
      lesson.x === specimen.x &&
        origin.x === controls.x &&
        lesson.y === origin.y &&
        lesson.y > specimen.bottom,
      route + ' lower row',
    )
    if (
      process.env.OPENFLIGHT_SCREENSHOTS &&
      ['butterflies/monarch', 'flying-objects/samara', 'airplanes/tupolev-tu144'].includes(route)
    )
      await page.screenshot({ path: process.env.OPENFLIGHT_SCREENSHOTS + '/' + route.split('/')[1] + '.png' })
  }
  await page.setViewportSize({ width: 320, height: 780 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(new URL('ru/butterflies/monarch/?span=180&colors=twilight', base).href)
  await page.locator('[data-model-workbench][data-ready]').waitFor()
  assert.equal(await page.locator('.span-range').inputValue(), '180')
  assert.match(await page.locator('.mast a[hreflang=en]').getAttribute('href'), /span=180/)
  await page.locator('.path-mode').click()
  await page.locator('.sketch-play').click()
  assert.equal(await page.locator('.sketch-position').inputValue(), '100')
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  const staticPage = await browser.newPage({ javaScriptEnabled: false })
  await staticPage.goto(new URL('butterflies/monarch/', base).href)
  assert.equal(await staticPage.locator('.lesson-steps li:visible').count(), 8)
  assert.ok(await staticPage.locator('.model-print').isVisible())
  await staticPage.close()
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto(new URL('book.html?lang=es#m=&activities=samara&hero=samara&a=samara:indigo', base).href)
  await page.locator('[data-edit="samara"]').click()
  assert.equal(await page.locator('#cover-model').isDisabled(), true)
  assert.equal(await page.locator('[data-appearance="indigo"]').getAttribute('aria-pressed'), 'true')
  await page.locator('#book-cover').scrollIntoViewIfNeeded()
  await page.locator('#cover-canvas').waitFor({ state: 'visible', timeout: 20000 })
  assert.equal(await page.locator('#reader-select option').count(), 6)
  assert.deepEqual(errors, [])
  console.log(
    '30 model pages passed sketch, lesson and origin checks. Desktop panel positions, ten 3D views, custom PDFs and the six-page object-only book passed.',
  )
} finally {
  await browser.close()
}
