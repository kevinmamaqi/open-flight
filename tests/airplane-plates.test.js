import assert from 'node:assert/strict'
import test from 'node:test'
import { plates } from '../apps/editor/book/catalog.js'
import { airplaneBalance } from '../apps/editor/book/figures/airplane-balance.js'
import { airplaneOutcome, figure, figureControls, figurePrint, figureText } from '../apps/editor/book/figures/airplane.js'

const langs = ['en', 'es', 'ru']
const airplanes = plates.filter((plate) => plate.chapter === 'airplanes')
const states = ['estimate', 'not-yet-measured', 'measured', 'concept', 'render', 'photograph', null]

test('the balance figure is small, deterministic, honest and complete in every state', () => {
  for (const { model } of airplanes)
    for (const lang of langs) {
      const controls = figureControls(model, lang)
      assert.deepEqual(controls.map((c) => c.name), ['clips', 'trim'])
      for (const clips of [0, 1, 2])
        for (const trim of [0, 1, 2]) {
          const svg = figure(model, lang, { clips, trim })
          assert.equal(svg, figure(model, lang, { clips: String(clips), trim: String(trim) }))
          assert.ok(Buffer.byteLength(svg) < 10240, `${model} ${lang} ${Buffer.byteLength(svg)} bytes`)
          assert.match(svg, /^<svg [^>]*role="img"/)
          assert.doesNotMatch(svg, /NaN|undefined|<script/)
          const text = figureText(model, lang, { clips, trim })
          assert.ok(text.includes(String(Math.round(airplaneBalance[model].A4.balance[clips]))))
        }
      const print = figurePrint(model, lang)
      assert.match(print, /width="170mm"/)
      assert.ok(print.includes('M5 ') && print.includes('H165'), 'a 160 mm ruler from 0')
    }
  // Wrapped lines become separate <text> elements; read the words as a person would.
  const words = (svg) => svg.replace(/<\/text><text[^>]*>/g, ' ').replace(/<[^>]+>/g, '')
  for (const { model } of airplanes) {
    assert.match(words(figure(model, 'en')), /Balance point computed from the folds\. Lift range estimated\. Not yet measured\./)
    assert.match(words(figurePrint(model, 'en')), /Not yet measured\./)
    assert.match(words(figure(model, 'en')), /What to look for\. Not a measurement\./)
  }
  assert.match(figure('boeing-747', 'en', { trim: 1 }), /drawn ×2/)
  assert.throws(() => figure('boeing-747', 'en', { clips: 3 }), RangeError)
  assert.throws(() => figure('monarch', 'en'), RangeError)
})

test('what to look for follows the published rules', () => {
  const d = airplaneBalance['tupolev-tu144'].A4
  assert.equal(airplaneOutcome(d, 0, 0).path, 'dives')
  assert.equal(airplaneOutcome(d, 0, 2).path, 'glides')
  assert.equal(airplaneOutcome(airplaneBalance['boeing-747'].A4, 0, 0).path, 'swoops')
  assert.equal(airplaneOutcome(airplaneBalance['ilyushin-il62'].A4, 0, 0).path, 'glides')
  assert.equal(airplaneOutcome(airplaneBalance['ilyushin-il62'].A4, 0, 2).path, 'swoops')
})

test('airplane plates follow the content contract and quote the computed numbers', async () => {
  for (const { id, model } of airplanes) {
    const plate = (await import(`../apps/editor/book/plates/${id}.js`)).default
    assert.equal(plate.id, id)
    assert.equal(plate.model, model)
    assert.ok(plate.glance.length <= 6)
    const d = airplaneBalance[model].A4
    for (const row of plate.glance) {
      assert.ok(states.includes(row.state))
      for (const lang of langs) assert.ok(row.label[lang] && row.value[lang])
    }
    const balance = plate.glance.find((row) => row.label.en === 'Balance point')
    for (const lang of langs) assert.ok(balance.value[lang].includes(String(Math.round(d.balance[0]))))
    assert.equal(balance.state, 'estimate')
    for (const lang of langs) {
      const { lead, body, grownUps } = plate.howItFlies[lang]
      assert.ok(lead && body.length >= 2 && body.length <= 3 && grownUps.length)
      assert.ok(body.join(' ').includes(String(Math.round(d.balance[0]))))
      assert.ok(plate.why[lang].title && plate.why[lang].body.length && plate.why[lang].borrows)
      const t = plate.tryThis[lang]
      assert.ok(t.question && t.prediction && t.steps.length && t.lookFor)
      // Records belong to the contests chapter.
      assert.doesNotMatch(grownUps.join(' '), /record|récord|рекорд|Guinness/i)
    }
    for (const ref of plate.references) {
      assert.match(ref.url, /^https:\/\//)
      for (const lang of langs) assert.ok(ref.label && ref.note[lang])
    }
  }
  const delta = (await import('../apps/editor/book/plates/A4.js')).default
  assert.match(delta.why.en.body.join(' '), /Nobody knows who folded it first/)
})
