import { chromium } from 'playwright-core'
import { checkReadOnlyStudio, checkWorkshopPlay } from './workshop_editor_checks.ts'
import assert from 'node:assert/strict'
import { execFile, spawn } from 'node:child_process'
import { parseArgs, promisify } from 'node:util'
import { once } from 'node:events'
import { createInterface } from 'node:readline'
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'

const { values } = parseArgs({
  options: {
    screenshots: { type: 'string' },
    'server-runtime': { type: 'string' },
  },
})
const runtime = values['server-runtime']
if (runtime && !['node', 'bun'].includes(runtime))
  throw Error('Choose node or bun as the server runtime.')
const workspace = mkdtempSync(join(tmpdir(), 'open-flight-browser-'))
const server = spawn(
  runtime ?? process.execPath,
  ['apps/api/server.ts', '--workspace', workspace, '--port', '0'],
  { stdio: ['ignore', 'pipe', 'inherit'] },
)
const closed = once(server, 'close')
const sha = (b: Buffer) => createHash('sha256').update(b).digest('hex')
type PreviewWindow = Window & { svgBlobs: Map<string, Blob> }
let browser
try {
  const lines = createInterface({ input: server.stdout })
  const first = await Promise.race([
    once(lines, 'line'),
    closed.then(() => {
      throw Error('HTTP server stopped before opening its port.')
    }),
  ])
  lines.close()
  const { origin, launcher } = JSON.parse(first[0])
  const unauthorized = await fetch(origin + '/v1/designs')
  assert.equal(unauthorized.status, 401)
  const otherOrigin = await fetch(origin + '/v1/designs', {
    headers: { Origin: 'https://example.invalid' },
  })
  assert.equal(otherOrigin.status, 403)
  const journey = await promisify(execFile)(process.execPath, [
    'examples/agent-client/journey.ts',
    '--workspace',
    workspace,
    '--origin',
    origin,
  ])
  const report = JSON.parse(journey.stdout)
  assert.ok(report.http_bytes_compared)
  browser = await chromium.launch({ executablePath: process.env.OPENFLIGHT_CHROME || undefined })
  await checkReadOnlyStudio(browser, workspace, report.design)
  const screenshotDir = values.screenshots ?? process.env.OPENFLIGHT_SCREENSHOTS
  const output = screenshotDir ? resolve(screenshotDir) : null
  if (output) mkdirSync(output, { recursive: true })
  const widths = []
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 } })
    const page = await context.newPage(),
      pageErrors: string[] = []
    page.on('pageerror', (e) => pageErrors.push(e.message))
    // Retain the actual Blob given to the image. Chromium need not retain CDP response bodies
    // after a streamed fetch has been consumed as a Blob.
    await page.addInitScript(() => {
      const svgBlobs = new Map<string, Blob>()
      ;(window as unknown as PreviewWindow).svgBlobs = svgBlobs
      const original = URL.createObjectURL.bind(URL)
      URL.createObjectURL = (value) => {
        const url = original(value)
        if (value instanceof Blob && value.type === 'image/svg+xml') svgBlobs.set(url, value)
        return url
      }
    })
    await page.goto(pathToFileURL(launcher).href)
    await page.locator('.species-card[data-species="monarch"]').waitFor()
    await page.waitForFunction(() => {
      const image = document.querySelector<HTMLImageElement>('#preview')
      return (
        image?.complete &&
        image.naturalWidth > 0 &&
        !document.querySelector<HTMLInputElement>('#wing')?.disabled
      )
    })
    if (output) await page.screenshot({ path: join(output, 'studio-' + width + '.png'), fullPage: true })
    const actions = page.locator('.species-card')
    assert.equal(await actions.count(), 3)
    await checkWorkshopPlay(page)
    // Open the same saved MCP revision in the editor and compare the actual rendered image and PDF.
    await page.evaluate(
      (fragment) => {
        location.hash = fragment
      },
      new URLSearchParams({
        design: report.design.design_id,
        revision: report.design.revision_id,
      }).toString(),
    )
    await page.waitForFunction(async (digest) => {
      const img = document.querySelector<HTMLImageElement>('#preview')
      if (!img?.complete || !img.naturalWidth) return false
      const blob = (window as unknown as PreviewWindow).svgBlobs.get(img.src)
      if (!blob) return false
      const bytes = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer())
      return (
        Array.from(new Uint8Array(bytes), (n) => n.toString(16).padStart(2, '0')).join('') === digest
      )
    }, report.preview.sha256)
    assert.equal(await page.locator('#revision').innerText(), report.design.revision_id)
    assert.match(await page.locator('#span').innerText(), new RegExp(String(report.geometry.span_mm)))
    await page.locator('.lang #ru').click()
    await page.getByRole('button', { name: 'Садовые ворота' }).click()
    await page.getByRole('heading', { name: 'Садовые ворота' }).waitFor()
    await page.locator('#lesson-dialog [data-close]').click()
    await page.locator('#print-design').click()
    await page.locator('#paper').selectOption('US_LETTER')
    await page.locator('#print-locale').selectOption('es')
    await page.locator('#prepare-print').click()
    const pdfLink = page.locator('#downloads a[data-kind="print-pdf"]')
    await pdfLink.waitFor()
    const pendingDownload = page.waitForEvent('download')
    await pdfLink.click()
    const file = await (await pendingDownload).path()
    assert.ok(file)
    assert.equal(sha(readFileSync(file)), report.print_pdf_sha256)
    const downloadGuide = page.waitForEvent('download')
    await page.locator('#downloads a[data-kind="guide"]').click()
    const guidePath = await (await downloadGuide).path()
    assert.ok(guidePath)
    const guide = readFileSync(guidePath, 'utf8')
    assert.ok(guide.includes(report.design.source_sha256) && guide.includes('8° arriba') && guide.includes('<html lang="es"'))
    assert.ok(guide.includes('data:image/jpeg;base64,') && guide.includes('data:image/svg+xml;base64,'))
    await page.locator('#print-dialog [data-close]').click()
    await page.locator('.lang #en').click()
    await page.locator('.species-card[data-species="swallowtail"]').click()
    await page.waitForFunction(() => document.querySelector('#revision')?.textContent === 'w1')
    const leftPreset = page.locator('[data-preset="left"]')
    await leftPreset.click()
    assert.equal(await page.locator('#left-trim').inputValue(), '8')
    assert.equal(await page.locator('#right-trim').inputValue(), '0')
    await page.locator('#wing').focus()
    await page.keyboard.press('Home')
    await page.keyboard.press('ArrowRight')
    // These edits were possible on the catalog model before a single save.
    assert.equal(await page.locator('#wing').inputValue(), '150')
    await page.locator('#save-design').click()
    await page.locator('#design-name').fill('Swallowtail turn ' + width)
    await page.locator('#confirm-save').click()
    await page.waitForFunction(() => document.querySelector('#revision')?.textContent === 'r1')
    await page.locator('[data-preset="right"]').click()
    await page.locator('#save-design').click()
    await page.waitForFunction(() => document.querySelector('#revision')?.textContent === 'r2')
    await page.locator('#open-library').click()
    await page.locator('#design-list').selectOption('butterfly-001/b1')
    await page.locator('#load-design').click()
    await page.waitForFunction(() => document.querySelector('#revision')?.textContent === 'b1')
    const overflow = await page.evaluate(() => {
      if (document.documentElement.scrollWidth <= innerWidth) return []
      return Array.from(document.querySelectorAll('body *')).filter(node => node.getBoundingClientRect().right > innerWidth + 1)
        .map(node => node.tagName + '.' + (node.id || node.classList[0] || '') + '@' + Math.round(node.getBoundingClientRect().right)).slice(0,16)
    })
    assert.deepEqual(overflow, [], 'Horizontal overflow at '+width+' px')
    assert.deepEqual(pageErrors, [])
    widths.push(width)
    await context.close()
  }
  console.log(
    JSON.stringify(
      {
        browser: browser.version(),
        http_runtime: values['server-runtime'],
        widths,
        authorization: ['401 missing grant', '403 foreign origin'],
        ...report,
      },
      null,
      2,
    ),
  )
} finally {
  await browser?.close()
  server.kill()
  await closed
  rmSync(workspace, { recursive: true })
}
