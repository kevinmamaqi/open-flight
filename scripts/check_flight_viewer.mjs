import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { butterflyGeometry, makeWorld, trajectory } from '../apps/editor/flight-geometry.js'

const app = fileURLToPath(new URL('../apps/editor/', import.meta.url))
const planeAssets = process.env.OPEN_FLIGHT_PLANE_ASSETS ?? join(app, 'assets/planes')
const hash = (b) => createHash('sha256').update(b).digest('hex')
const origin = 'https://open-flight.test/open-flight/'
const pageHTML =
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="flight-viewer.css"><main style="max-width:720px;margin:auto" id="viewer"></main>'
const base = {
  id: 'monarch',
  family: 'butterfly',
  mode: 'fold',
  stage: 2,
  locale: 'en',
  marks: true,
  parameters: { span_mm: 172, left_trim_deg: 0, right_trim_deg: 0 },
}
for (const species of Object.keys(butterflyGeometry)) {
  const flat = makeWorld({ ...base, id: species, stage: 1 }, 1),
    folded = makeWorld({ ...base, id: species, stage: 2 }, 1)
  assert.equal(flat.faces.length, 5)
  assert.equal(folded.faces.length, 5)
  assert.ok(Math.max(...folded.faces[1].points.map((v) => v[1])) > 8)
  const asymmetric = makeWorld(
    { ...base, id: species, stage: 4, parameters: { ...base.parameters, left_trim_deg: 12 } },
    1,
  )
  for (const i of [0, 1, 3, 4]) assert.deepEqual(asymmetric.faces[i].points, folded.faces[i].points)
  assert.notDeepEqual(asymmetric.faces[2].points, folded.faces[2].points)
}
assert.deepEqual(trajectory(base, 0), trajectory({ ...base, parameters: { right_trim_deg: 12 } }, 0))
assert.ok(trajectory({ ...base, parameters: { left_trim_deg: 12 } }, 1).point[0] < 0)
assert.ok(trajectory({ ...base, parameters: { right_trim_deg: 12 } }, 1).point[0] > 0)
const zoom = new Map()
for (const [width, disabled, reduce] of [
  [1120, false, false],
  [390, false, true],
  [390, true, true],
]) {
  const binary = process.env.OPENFLIGHT_CHROME
  const browser = await chromium.launch({
    executablePath: binary,
    args: disabled
      ? ['--disable-webgl']
      : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  })
  try {
    const context = await browser.newContext({
      viewport: { width, height: 850 },
      reducedMotion: reduce ? 'reduce' : 'no-preference',
    })
    const page = await context.newPage(),
      errors = [],
      failed = [],
      outbound = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.route('**/*', async (route) => {
      const url = route.request().url()
      if (!url.startsWith(origin)) {
        outbound.push(url)
        return route.abort()
      }
      const name = url.slice(origin.length)
      if (!name) return route.fulfill({ contentType: 'text/html', body: pageHTML })
      const filepath = name.startsWith('assets/planes/')
        ? join(planeAssets, name.slice('assets/planes/'.length))
        : join(app, name)
      if (!existsSync(filepath)) {
        failed.push(name)
        return route.fulfill({ status: 404, body: 'not found' })
      }
      const ext = filepath.split('.').at(-1),
        type = { js: 'text/javascript', css: 'text/css', webp: 'image/webp' }[ext]
      return route.fulfill({
        contentType: type ?? 'application/octet-stream',
        body: readFileSync(filepath),
      })
    })
    await page.goto(origin)
    await page.evaluate(async (config) => {
      const { mountFlightViewer } = await import('./flight-viewer.js')
      window.testView = mountFlightViewer(document.getElementById('viewer'))
      window.testView.update(config)
    }, base)
    const backend = disabled ? 'diagram' : 'webgl'
    await page.locator('.ofv[data-renderer="' + backend + '"]').waitFor()
    if (disabled) await page.locator('[data-v=dimension]:disabled').waitFor()
    const stage = page.locator('[data-v=stage]'),
      progress = page.locator('[data-v=progress]')
    await page.waitForFunction(() =>
      performance.getEntriesByType('resource').some((x) => x.name.includes('monarch-natural.webp')),
    )
    const frame = () =>
      page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
      )
    const shot = async (label) => {
      await frame()
      const png = await stage.screenshot({
        path: process.env.OPEN_FLIGHT_SHOT_DIR
          ? join(process.env.OPEN_FLIGHT_SHOT_DIR, width + '-' + backend + '-' + label + '.png')
          : undefined,
      })
      assert.ok(png.length > 4800)
      return hash(png)
    }
    const start = await shot('fold')
    await page.getByRole('button', { name: 'Next fold' }).click()
    await page.getByRole('button', { name: 'Next fold' }).click()
    assert.match(await page.locator('[data-v=count]').innerText(), /5 of 6/)
    await page.locator('[data-v=adjustTitle]').click()
    await page.locator('[data-knob=leftTrim]').fill('12')
    await page.locator('[data-knob=rightWing]').fill('29')
    await page.locator('[data-v=camera]').selectOption('rear')
    const rear = await shot('rear')
    assert.notEqual(rear, start)
    await stage.focus()
    await page.keyboard.press('ArrowRight')
    assert.notEqual(await shot('orbit'), rear)
    await page.evaluate(() =>
      window.testView.update({
        mode: 'flight',
        id: 'swallowtail',
        appearance: 'carnival',
        parameters: { left_trim_deg: 12, right_trim_deg: 0 },
      }),
    )
    assert.match(await page.locator('[data-v=notice]').innerText(), /Illustrated path/)
    await progress.fill('11')
    assert.equal(await progress.inputValue(), '11')
    const early = await shot('flight-start')
    await progress.fill('92')
    const late = await shot('flight-end')
    assert.notEqual(late, early)
    await page.locator('[data-v=play]').click()
    if (reduce) {
      assert.equal(await progress.inputValue(), '100')
      await page.locator('[data-v=play]').click()
      assert.equal(await progress.inputValue(), '0')
    } else {
      await page.waitForFunction(() =>
        document.querySelector('[data-v=play]').textContent.includes('Pause'),
      )
      await page.locator('[data-v=play]').click()
      assert.match(await page.locator('[data-v=play]').textContent(), /Launch/)
    }
    if (existsSync(join(planeAssets, 'core.js'))) {
      for (const id of ['boeing-747', 'douglas-dc3', 'tupolev-tu144', 'ilyushin-il62']) {
        await page.evaluate(async (id) => {
          const { makePlane } = await import('./assets/planes/core.js')
          const { stripes } = await import('./assets/planes/drawing.js')
          window.plane = makePlane({ model_id: id, paper: 'A4', keel_mm: 18, winglet_mm: 6 }, 'en')
          const step = window.plane.steps[1]
          window.testView.update({
            id,
            family: 'airplane',
            mode: 'fold',
            stage: step.index,
            stageCount: window.plane.steps.length,
            planes: step.frame,
            sheetDecoration: stripes(window.plane),
            colors: window.plane.colors,
            appearance: window.plane.source.livery,
            title: step.title,
            caption: step.instruction,
          })
        }, id)
        const a = await shot(id + '-step')
        await progress.fill('80')
        const b = await shot(id + '-fold')
        assert.notEqual(a, b)
        await page.evaluate(() => {
          const step = window.plane.steps.at(-1)
          window.testView.update({ planes: step.frame, stage: step.index, mode: 'flight', locale: 'ru' })
        })
        assert.match(await page.locator('[data-v=mode]').textContent(), /полётом/)
        await shot(id + '-flight')
      }
    }
    assert.equal(await page.locator('.ofv').getAttribute('data-renderer'), backend)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    assert.equal(overflow, false)
    assert.deepEqual(outbound, [])
    assert.deepEqual(failed, [])
    assert.deepEqual(errors, [])
    await page.evaluate(() => testView.destroy())
    assert.equal(await page.locator('.ofv').count(), 0)
    zoom.set(width + 'px ' + backend, { reducedMotion: reduce })
  } finally {
    await browser.close()
  }
}
console.log(
  'Verified butterfly hinges and trim signs, flight progression, cameras, four airplane folds when catalog is present, keyboard controls, contained mobile layout, and local-only assets.',
  Object.fromEntries(zoom),
)
