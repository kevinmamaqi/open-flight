import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const base = process.argv[2]
if (!base) throw new Error('Pass the URL for the built workshop, including its trailing slash.')
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH && { executablePath: process.env.CHROMIUM_PATH }),
})
try {
  const page = await browser.newPage({ viewport: { width: 320, height: 780 } })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const choose = async (id) => {
    await page.locator(id).focus()
    await page.keyboard.press('Enter')
  }
  const checkWidth = async () => {
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  }
  for (const lang of ['en', 'es', 'ru']) {
    await page.goto(new URL('studio.html?lang=' + lang + '#design=butterfly-morpho&revision=w1', base).href)
    await page.locator('#construction').waitFor()
    assert.equal(await page.locator('#tabbed-body').getAttribute('aria-pressed'), 'true')
    await page.locator('#wing').fill('182')
    await page.locator('label[for=palette-twilight]').click()
    await choose('#folded-body')
    await page.locator('#folded-preview svg').waitFor()
    assert.equal(await page.locator('#folded-body').getAttribute('aria-pressed'), 'true')
    assert.equal(await page.locator('#trim-controls').isVisible(), false)
    assert.equal(await page.locator('#wing').inputValue(), '182')
    assert.equal(await page.locator('#palette-twilight').isChecked(), true)
    assert.equal(new URL(page.url()).searchParams.get('species'), 'morpho')
    assert.equal(await page.locator('html').getAttribute('lang'), lang)
    await checkWidth()
    const preview = await page.locator('#folded-preview svg').innerHTML()
    await choose('#glide-view')
    await page.waitForFunction((old) => document.querySelector('#folded-preview svg').innerHTML !== old, preview)
    assert.equal(
      await page.locator('#diagram-board #lesson-cut').getAttribute('d'),
      await page.locator('#folded-preview #cut').getAttribute('d'),
    )
    await choose('#next-step')
    assert.equal(new URL(page.url()).searchParams.get('step'), '2')
    const title = await page.locator('#step-title').textContent()
    assert.ok(await page.locator('#step-check').textContent())
    const foldedUrl = page.url()
    await choose('#tabbed-body')
    assert.equal(await page.locator('#wing').inputValue(), '182')
    assert.equal(await page.locator('#palette-twilight').isChecked(), true)
    assert.equal(await page.locator('#trim-controls').isVisible(), true)
    assert.match(new URL(page.url()).hash, /revision=w1/)
    await choose('#folded-body')
    assert.equal(await page.locator('#step-title').textContent(), title)
    await page.goto(foldedUrl)
    await page.locator('#folded-preview svg').waitFor()
    assert.equal(await page.locator('#step-title').textContent(), title)
    assert.equal(await page.locator('#glide-view').getAttribute('aria-pressed'), 'true')
    await choose('#print-design')
    await page.locator('#paper').selectOption('US_LETTER')
    await choose('#prepare-print')
    const pdfLink = page.locator('#downloads [data-kind=print-pdf]')
    await pdfLink.waitFor()
    assert.match(await pdfLink.getAttribute('download'), new RegExp('morpho-k1-182-twilight-US_LETTER-' + lang))
    const [download] = await Promise.all([page.waitForEvent('download'), pdfLink.click()])
    const printable = (await readFile(await download.path())).toString('latin1')
    assert.match(printable, /%PDF-/)
    // Cut sheet, its back face for double-sided printing, and the fold guide.
    assert.equal([...printable.matchAll(/\/Type\s*\/Page\b/g)].length, 3)
    await choose('#jump-guide')
    const advanced = await page.locator('#folded-edition').getAttribute('href')
    await page.goto(new URL(advanced, base).href)
    await page.locator('#preview svg').waitFor()
    assert.equal(await page.locator('#step-title').textContent(), title)
  }
  await page.goto(new URL('planes.html?model=boeing-747&lang=en', base).href)
  await page.locator('#fold-figure svg').waitFor()
  const first = await page.locator('#step-title').textContent()
  await choose('#next')
  assert.notEqual(await page.locator('#step-title').textContent(), first)
  assert.equal(await page.locator('#previous').isEnabled(), true)
  await checkWidth()
  assert.deepEqual(errors, [])
  console.log('Shared fold lesson verified in all locales at 320 px, including folded PDF and deep links.')
} finally {
  await browser.close()
}
