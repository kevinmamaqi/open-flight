import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { pathToFileURL } from 'node:url'
import type { Browser, Page, Request } from 'playwright-core'

async function artwork(page: Page) {
  // Wait for the latest API draft and the corresponding image decode.
  await page.waitForFunction(() => {
    const img = document.querySelector<HTMLImageElement>('#preview')
    return (
      document.querySelector('#art-board')?.getAttribute('aria-busy') === 'false' &&
      img?.complete &&
      !!img.naturalWidth
    )
  })
  return page.locator('#preview').evaluate(async (img: HTMLImageElement) => {
    const sample = document.createElement('canvas')
    sample.width = sample.height = 96
    const context = sample.getContext('2d')!
    context.drawImage(img, 0, 0, sample.width, sample.height)
    const pixels = context.getImageData(0, 0, sample.width, sample.height).data
    const hash = await crypto.subtle.digest('SHA-256', pixels)
    return Array.from(new Uint8Array(hash), (n) => n.toString(16).padStart(2, '0')).join('')
  })
}

async function downloadText(page: Page, kind: string) {
  const downloaded = page.waitForEvent('download')
  await page.locator('#downloads a[data-kind="' + kind + '"]').click()
  const path = await (await downloaded).path()
  assert.ok(path)
  return readFileSync(path, 'utf8')
}

// The three models, live draft, photo, trim drawing and real print must agree before saving a revision.
export async function checkWorkshopPlay(page: Page) {
  const writes: string[] = []
  const outside: string[] = []
  const origin = new URL(page.url()).origin
  const capture = (request: Request) => {
    const url = new URL(request.url()),
      path = url.pathname
    if (/^https?:$/.test(url.protocol) && url.origin !== origin) outside.push(url.origin)
    if (request.method() === 'POST' && /^\/v1\/designs(?:\/[^/]+\/revisions)?$/.test(path))
      writes.push(path)
  }
  page.on('request', capture)
  try {
    const speciesArt = new Set<string>()
    const questions = new Set<string>()
    const stepArt = new Set<string>()
    for (const species of ['monarch', 'morpho', 'swallowtail']) {
      await page.locator('.species-card[data-species="' + species + '"]').click()
      await page.locator('#wing-view').click()
      speciesArt.add(await artwork(page))
      await page.locator('#meet-butterfly').click()
      await page.waitForFunction(
        () => !!document.querySelector<HTMLImageElement>('#nature-photo')?.naturalWidth,
      )
      assert.match(
        (await page.locator('#nature-credit').getAttribute('href')) ?? '',
        /^https:\/\/pixabay\.com\/photos\//,
      )
      assert.match(
        (await page.locator('#nature-photo').getAttribute('src')) ?? '',
        new RegExp(species + '\\.jpg$'),
      )
      await page.locator('#nature-dialog [data-close]').click()
      await page.locator('#glide-view').click()
      assert.ok(await page.locator('#cue-' + species).isVisible())
      assert.equal(await page.locator('.experiment-cue:visible').count(), 1)
      questions.add(await page.locator('#board-note').innerText())
      await page.locator('[data-preset="neutral"]').click()
      const flat = await page.locator('#glide-path').getAttribute('d')
      await page.locator('[data-preset="left"]').click()
      const left = await page.locator('#glide-path').getAttribute('d')
      await page.locator('[data-preset="right"]').click()
      const right = await page.locator('#glide-path').getAttribute('d')
      assert.equal(new Set([flat, left, right]).size, 3)
      assert.equal(await page.locator('#right-trim').inputValue(), '8')
      await page.locator('#reset-design').click()
      await page.locator('#wing-view').click()
      // The actual registered illustration for each step must decode without a network service.
      for (let step = 0; step < 6; step++) {
        await page.waitForFunction(
          () => !!document.querySelector<HTMLImageElement>('#step-diagram')?.naturalWidth,
        )
        assert.match(
          await page.locator('#step-count').innerText(),
          new RegExp('Step ' + (step + 1) + ' of 6'),
        )
        const file = await page.locator('#step-diagram').getAttribute('src')
        assert.ok(file && file.startsWith('/assets/field-guide/'))
        stepArt.add(file)
        await page.locator('#next-step').click()
      }
    }
    assert.equal(speciesArt.size, 3)
    assert.equal(questions.size, 3)
    assert.ok(stepArt.size >= 10)
    await page.locator('.species-card[data-species="morpho"]').click()
    await page.locator('#wing-view').click()
    const original = await artwork(page)
    await page.locator('label[for=palette-twilight]').click()
    assert.notEqual(await artwork(page), original)
    await page.locator('#wing').focus()
    await page.keyboard.press('Home')
    await page.keyboard.press('ArrowRight')
    assert.equal(await page.locator('#wing').inputValue(), '150')
    await page.locator('#left-trim').focus()
    await page.keyboard.press('Home')
    assert.equal(await page.locator('#left-trim').inputValue(), '-12')
    await page.locator('#right-trim').focus()
    await page.keyboard.press('End')
    assert.equal(await page.locator('#right-trim').inputValue(), '12')
    // Browsing a second species should preserve the original unsaved experiment.
    await page.locator('.species-card[data-species="monarch"]').click()
    await page.locator('.species-card[data-species="morpho"]').click()
    assert.ok(await page.locator('#palette-twilight').isChecked())
    assert.equal(await page.locator('#left-trim').inputValue(), '-12')
    assert.equal(await page.locator('#right-trim').inputValue(), '12')
    await artwork(page)
    assert.ok(
      await page.evaluate(() => {
        const box = document.querySelector('#art-board')!.getBoundingClientRect()
        const image = document.querySelector('#preview')!.getBoundingClientRect()
        return (
          image.left >= box.left &&
          image.right <= box.right &&
          image.top >= box.top &&
          image.bottom <= box.bottom
        )
      }),
    )
    assert.deepEqual(writes, [])
    await page.locator('#print-design').click()
    await page.locator('#prepare-print').click()
    await page.locator('#downloads a[data-kind=guide]').waitFor()
    const source = JSON.parse(await downloadText(page, 'source'))
    assert.deepEqual(source.parameters, { span_mm: 150, left_trim_deg: -12, right_trim_deg: 12 })
    assert.equal(source.appearance_id, 'twilight')
    const guide = await downloadText(page, 'guide')
    assert.match(guide, /Morpho peleides/)
    assert.match(guide, /data:image\/jpeg;base64,/)
    assert.match(guide, /data:image\/svg\+xml;base64,/)
    assert.match(guide, /12° down/)
    assert.match(guide, /12° up/)
    assert.deepEqual(writes, ['/v1/designs'])
    assert.deepEqual(outside, [])
    await page.locator('#print-dialog [data-close]').click()
    await page.locator('.species-card[data-species="monarch"]').click()
    await artwork(page)
  } finally {
    page.off('request', capture)
  }
}

export async function checkReadOnlyStudio(
  browser: Browser,
  workspace: string,
  privateRevision: { design_id: string; revision_id: string },
) {
  const server = spawn(
    process.execPath,
    ['apps/api/server.ts', '--workspace', workspace, '--port', '0', '--read-only'],
    { stdio: ['ignore', 'pipe', 'inherit'] },
  )
  const closed = once(server, 'close'),
    lines = createInterface({ input: server.stdout })
  const context = await browser.newContext()
  try {
    const [first] = await Promise.race([
      once(lines, 'line'),
      closed.then(() => {
        throw new Error('Read-only studio stopped before launch.')
      }),
    ])
    const page = await context.newPage()
    const rejected: number[] = []
    page.on('response', (response) => {
      if (new URL(response.url()).pathname.startsWith('/v1/') && response.status() >= 400)
        rejected.push(response.status())
    })
    await page.goto(pathToFileURL(JSON.parse(first).launcher).href)
    await page.locator('#read-only-note').waitFor()
    assert.equal(await page.locator('.species-card').count(), 3)
    for (const id of ['monarch', 'morpho', 'swallowtail']) {
      await page.locator('.species-card[data-species="' + id + '"]').click()
      await page.locator('label[for=palette-coloring]').click()
      await artwork(page)
      assert.ok(await page.locator('#palette-coloring').isChecked())
      assert.ok(await page.locator('#print-design').isDisabled())
      assert.ok(await page.locator('#save-design').isDisabled())
    }
    for (const ref of [privateRevision, { design_id: 'butterfly-001', revision_id: 'b1' }]) {
      await page.evaluate(({ design_id, revision_id }) => {
        location.hash = new URLSearchParams({ design: design_id, revision: revision_id }).toString()
      }, ref)
      await page.waitForFunction(
        (id) => document.querySelector('#revision')?.textContent === id,
        ref.revision_id,
      )
      await artwork(page)
      await page.locator('#wing').focus()
      await page.keyboard.press('Home')
      await artwork(page)
      assert.ok(await page.locator('#save-design').isDisabled())
    }
    assert.deepEqual(rejected, [])
  } finally {
    lines.close()
    await context.close()
    server.kill()
    await closed
  }
}
