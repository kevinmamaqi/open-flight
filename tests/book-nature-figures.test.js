// Butterfly and flying-object plates: generated figure data stays in sync with the
// geometry, figures are pure and small, and plate content follows the book contract.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { outputs } from '../scripts/build_nature_figures.ts'
import * as butterfly from '../apps/editor/book/figures/butterfly.js'
import * as object from '../apps/editor/book/figures/object.js'

const root = new URL('../', import.meta.url)
const langs = ['en', 'es', 'ru']
const families = [
  { module: butterfly, models: ['monarch', 'morpho', 'swallowtail'] },
  { module: object, models: ['ring', 'samara', 'tandem'] },
]
const states = ['estimate', 'not-yet-measured', 'measured', 'concept', 'render', 'photograph', null]

test('committed figure data matches a fresh run of the generator', () => {
  for (const [path, build] of Object.entries(outputs))
    assert.equal(readFileSync(new URL(path, root), 'utf8'), build(), `${path} is stale: run bun scripts/build_nature_figures.ts`)
})

test('figures are deterministic, under 10 KB, labelled as estimates, with matching text alternatives', () => {
  for (const { module, models } of families)
    for (const model of models)
      for (const lang of langs) {
        const controls = module.figureControls(model, lang)
        const variants = [{}]
        for (const control of controls) {
          assert.ok(control.name && control.label && control.options.length >= 2)
          for (const option of control.options) variants.push({ [control.name]: option.value })
        }
        assert.equal(module.figure(model, lang), module.figure(model, lang, variants[controls.length ? 1 : 0]), 'the default is the first option')
        for (const state of variants) {
          const svg = module.figure(model, lang, state)
          assert.equal(svg, module.figure(model, lang, state))
          assert.ok(Buffer.byteLength(svg) < 10000, `${model} ${lang} is ${Buffer.byteLength(svg)} bytes`)
          assert.match(svg, /^<svg [^>]*viewBox/)
          assert.ok(module.figureText(model, lang, state).length > 200)
        }
        const printed = module.printFigure(model, lang)
        assert.match(printed, /width="100mm"/)
        assert.ok(Buffer.byteLength(printed) < 10000)
      }
  assert.match(butterfly.figure('monarch', 'en'), /not been measured yet/)
  assert.match(butterfly.figureText('monarch', 'en'), /34 mm behind the nose.*39 mm/)
  assert.match(butterfly.figureText('morpho', 'en'), /static margin of 16%/)
  assert.deepEqual(butterfly.figureControls('monarch', 'en'), [])
  assert.notEqual(object.figure('samara', 'en', { clip: 'B' }), object.figure('samara', 'en'))
  assert.match(object.figureText('tandem', 'en', { clip: 'off' }), /sinks/)
})

test('plates follow the book contract in three languages', async () => {
  for (const [id, model] of [['B1', 'monarch'], ['B2', 'morpho'], ['B3', 'swallowtail'], ['F1', 'ring'], ['F2', 'samara'], ['F3', 'tandem']]) {
    const plate = (await import(`../apps/editor/book/plates/${id}.js`)).default
    assert.equal(plate.id, id)
    assert.equal(plate.model, model)
    assert.ok(plate.glance.length > 0 && plate.glance.length <= 6)
    for (const row of plate.glance) {
      assert.ok(states.includes(row.state), `${id} state ${row.state}`)
      for (const lang of langs) assert.ok(row.label[lang] && row.value[lang])
    }
    assert.ok(plate.glance.some(row => row.state === 'not-yet-measured'), `${id} says what has not been measured`)
    for (const lang of langs) {
      const flies = plate.howItFlies[lang], why = plate.why[lang], trial = plate.tryThis[lang]
      assert.ok(flies.lead && flies.body.length >= 2 && flies.body.length <= 4 && flies.grownUps.length >= 1)
      assert.ok(why.title && why.body.length && why.borrows)
      assert.ok(trial.question && trial.prediction && trial.steps.length && trial.lookFor)
      if (lang !== 'en') assert.notEqual(flies.lead, plate.howItFlies.en.lead)
    }
    for (const ref of plate.references) {
      assert.equal(new URL(ref.url).protocol, 'https:')
      assert.ok(ref.label && langs.every(lang => ref.note[lang]))
    }
  }
})

test('corrected facts stay corrected', () => {
  const read = path => readFileSync(new URL(path, root), 'utf8')
  assert.match(read('apps/editor/assets/objects/CREDITS.md'), /Gregory Vogt \(Oklahoma State University/)
  assert.doesNotMatch(read('apps/editor/model-origins.js'), /two long tails|dos colas largas/)
  assert.doesNotMatch(read('apps/editor/atlas-guide.js'), /Wing lift at the body/)
  assert.doesNotMatch(read('packages/field-guide/species.json'), /Cola de golondrina/)
  assert.doesNotMatch(read('apps/editor/assets/objects/activities.js'), /at shoulder height/)
  assert.match(read('apps/editor/assets/objects/tandem.js'), /small paper clip/)
})
