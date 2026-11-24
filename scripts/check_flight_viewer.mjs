import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { butterflyGeometry, makeWorld, trajectory } from '../apps/editor/flight-geometry.js'
import { flightCircuit, sampleFlight, simulateFlight } from '../apps/editor/flight-model.js'

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
const level = simulateFlight()
assert.deepEqual(level, simulateFlight({ gate: 'level' }))
assert.equal(level.outcome, 'glide')
assert.deepEqual(sampleFlight(level, 0), level.samples[0])
assert.deepEqual(sampleFlight(level, 1), level.samples.at(-1))
assert.equal(level.landing[0], 0)
assert.equal(level.landing[1], 0)
const dip = simulateFlight({ gate: 'dip' })
assert.equal(dip.outcome, 'recovery')
assert.ok(Math.abs(dip.samples[0].pitchDeg + 2) < 1e-9)
const steep = simulateFlight({ gate: 'dip', speed: 1.5, height: 0.5, directionDeg: -30, angleOfAttackDeg: -8 })
assert.equal(steep.outcome, 'steep')
assert.ok(steep.landing[2] < dip.landing[2])
const turn = simulateFlight({ gate: 'turn' })
assert.ok(turn.landing[0] > 0.5)
assert.ok(simulateFlight({ bankDeg: -18 }).landing[0] < -0.5)
assert.ok(simulateFlight({ trimDifferenceDeg: 12 }).landing[0] > 0.5)
assert.notDeepEqual(simulateFlight({ trimDeg: 8 }).landing, level.landing)
for (const key of ['directionDeg', 'angleOfAttackDeg', 'speed', 'bankDeg', 'height']) {
  const changed = simulateFlight({ [key]: flightCircuit().controls[key].max })
  assert.notDeepEqual(changed.landing, level.landing, key)
}
for (const locale of ['en', 'es', 'ru']) {
  assert.equal(flightCircuit(locale).gates.length, 3)
  assert.equal(flightCircuit(locale).evidence, 'simulation')
}
assert.equal(simulateFlight({ speed: Infinity }).inputs.speed, 3.5)
assert.equal(simulateFlight({ height: -7 }).inputs.height, 0.5)
function checkGround(state) {
  for (const run of [level, dip, steep, turn]) {
    for (const progress of [0, 0.25, 0.5, 0.99, 1]) {
      const world = makeWorld({ ...state, mode: 'flight', camera: 'side', run }, progress)
      const posed = world.faces.filter((face) => face.ground === undefined)
      assert.ok(posed.length > 0)
      if (state.family === 'butterfly') posed.push(...world.lines.slice(0, 2)) // Nose clip wire.
      const lowest = Math.min(...posed.flatMap((face) => face.points.map((point) => point[1])))
      const floor = Math.min(...world.faces.filter((face) => face.ground !== undefined).map((face) => face.ground))
      assert.equal(lowest === floor, progress === 1, state.id)
      assert.ok(lowest >= floor, state.id)
      assert.ok(Math.abs(lowest - floor - 30 * sampleFlight(run, progress).point[1]) < 1e-9)
    }
  }
}
for (const id of Object.keys(butterflyGeometry)) {
  checkGround({ ...base, id })
  const neutral = makeWorld({ ...base, id, mode: 'flight', run: level }, 0)
  const raised = makeWorld({ ...base, id, mode: 'flight', run: simulateFlight({ trimDeg: 6, trimDifferenceDeg: 12 }) }, 0)
  const shapeRelativeToBody = (world, index) =>
    world.faces[index].points.map((point) => point.map((n, axis) => n - world.faces[0].points[0][axis]))
  const left = shapeRelativeToBody(raised, 2).flat()
  const leftNeutral = shapeRelativeToBody(neutral, 2).flat()
  assert.ok(left.every((value, index) => Math.abs(value - leftNeutral[index]) < 1e-9))
  assert.notDeepEqual(shapeRelativeToBody(raised, 4), shapeRelativeToBody(neutral, 4))
}
for (const run of [level, dip, steep, turn]) {
  const [right, , forward] = run.landing
  const point = trajectory({ run }, 1).point
  assert.ok(Math.abs(point[0] - right * 30) < 1e-9)
  assert.ok(Math.abs(point[2] + forward * 30) < 1e-9)
}
if (existsSync(join(planeAssets, 'core.js'))) {
  const { makePlane } = await import(pathToFileURL(join(planeAssets, 'core.js')))
  for (const id of ['boeing-747', 'douglas-dc3', 'tupolev-tu144', 'ilyushin-il62']) {
    const plan = makePlane({ model_id: id, paper: 'A4', keel_mm: 18, winglet_mm: 6 }, 'en')
    checkGround({ family: 'airplane', id, planes: plan.steps.at(-1).frame })
  }
}
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
    const leftTab = page.locator('[data-launch=leftTab]')
    const rightTab = page.locator('[data-launch=rightTab]')
    assert.equal(await leftTab.inputValue(), '12')
    assert.equal(await rightTab.inputValue(), '0')
    const rightTabShot = await shot('neutral-right-tab')
    await rightTab.fill('-12')
    assert.equal(await leftTab.inputValue(), '12')
    assert.notEqual(await shot('right-tab-down'), rightTabShot)
    assert.match(await page.locator('[data-v=current]').textContent(), /Direction of motion.*Angle of attack.*Speed/)
    assert.doesNotMatch(await page.locator('[data-v=current]').textContent(), /Throw direction|Release speed/)
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
    await page.locator('[data-v=gate]').selectOption('dip')
    assert.equal(await page.locator('[data-v=camera]').inputValue(), 'side')
    assert.match(await page.locator('[data-v=result]').textContent(), /flattened/)
    await page.locator('[data-v=windowLabel]').click()
    assert.equal(await page.locator('[data-v=windows] li').count(), 2)
    assert.match(await page.locator('[data-v=windows]').textContent(), /Simulated crossing/)
    const speed = page.locator('[data-launch=speed]')
    const baseline = await page.locator('[data-v=result]').textContent()
    await speed.focus()
    await page.keyboard.press('ArrowRight')
    assert.equal(await speed.inputValue(), '3.2')
    assert.notEqual(await page.locator('[data-v=result]').textContent(), baseline)
    await page.locator('[data-v=launchReset]').click()
    assert.equal(await speed.inputValue(), '3.1')
    assert.equal(await page.locator('[data-v=result]').textContent(), baseline)
    await page.locator('[data-v=gate]').selectOption('turn')
    assert.equal(await page.locator('[data-v=camera]').inputValue(), 'top')
    await page.evaluate(() => window.testView.update({ locale: 'es' }))
    assert.match(await page.locator('[data-v=title]').textContent(), /Giro amplio/)
    const notes = page.locator('[data-v=notes]')
    await notes.fill('0,8 m a la derecha')
    await page.locator('[data-v=gate]').selectOption('level')
    assert.equal(await notes.inputValue(), '')
    await page.locator('[data-v=gate]').selectOption('turn')
    assert.equal(await notes.inputValue(), '0,8 m a la derecha')
    assert.equal(await page.evaluate(() => localStorage.getItem('open-flight/real-flight-notes/butterfly/swallowtail/turn')), '0,8 m a la derecha')
    const printable = await page.evaluate(() => {
      let captured
      window.print = () => {
        const article = document.querySelector('.ofv-scorecard')
        captured = { title: article.querySelector('h1').textContent, rows: article.querySelectorAll('tbody tr').length }
      }
      document.querySelector('[data-v=print]').click()
      window.dispatchEvent(new Event('afterprint'))
      if (document.querySelector('.ofv-scorecard')) throw Error('Scorecard not cleared after printing')
      return captured
    })
    assert.equal(printable.rows, 15)
    assert.match(printable.title, /vuelos reales/)
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
    if (disabled) {
      await page.evaluate(async (config) => {
        HTMLCanvasElement.prototype.getContext = () => null
        const { mountFlightViewer } = await import('./flight-viewer.js')
        window.testView = mountFlightViewer(document.getElementById('viewer'))
        window.testView.update({ ...config, mode: 'flight', locale: 'ru' })
      }, base)
      await page.locator('.ofv[data-renderer="text"]').waitFor()
      assert.match(await page.locator('[data-v=current]').textContent(), /Момент полёта/)
      await page.locator('[data-v=gate]').selectOption('turn')
      assert.match(await page.locator('[data-v=result]').textContent(), /Касание пола в модели/)
      assert.deepEqual(errors, [])
    }
    zoom.set(width + 'px ' + backend, { reducedMotion: reduce })
  } finally {
    await browser.close()
  }
}
console.log(
  'Verified butterfly hinges, bounded teaching model, three launches, real-flight scorecard, flight progression, cameras, four airplane folds when catalog is present, keyboard controls, contained mobile layout, and local-only assets.',
  Object.fromEntries(zoom),
)
