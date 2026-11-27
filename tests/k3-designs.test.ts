// Checks for the extra K3 wing designs (k3-designs.ts). A design changes colours only: the cut
// outline, folds and estimates must match the field-colour sheet exactly. They say nothing about flight.
import assert from 'node:assert/strict'
import test from 'node:test'
import { k3Designs, k3DesignPalettes } from '../packages/folded-butterfly/k3-designs.ts'
import { k3Art } from '../packages/folded-butterfly/k3-dart.ts'
import { k3Pdf, k3SheetLines, makeK3 } from '../packages/folded-butterfly/k3-sheet.ts'
import { makeK2 } from '../packages/folded-butterfly/k2-sheet.ts'
import { appearanceChoices, k3AppearanceChoices, k3DesignSwatches, sheetChoices } from '../apps/editor/model-appearance.js'

const species = ['monarch', 'morpho', 'swallowtail'] as const

test('every K3 design keeps the field-colour geometry and estimate for every species', () => {
  for (const sp of species) for (const design of k3Designs) {
    const natural = makeK3({ species: sp })
    const plan = makeK3({ species: sp, appearance_id: design })
    assert.equal(plan.appearance_id, design)
    assert.deepEqual(plan.geo.top, natural.geo.top)
    const [a, b] = [k3SheetLines(plan), k3SheetLines(natural)]
    // Only the painted lines may differ: outline, creases, slits and balance marks are the same sheet.
    for (const key of ['flat', 'creases', 'slits', 'balance', 'balance_y'] as const) assert.equal(JSON.stringify(a[key]), JSON.stringify(b[key]), key)
    assert.deepEqual(plan.estimate, natural.estimate)
    assert.ok(k3Pdf(plan).byteLength > 10000)
  }
})

test('the Barcelona wings are trencadís: glazed tesserae inside each wing, markings kept', () => {
  for (const sp of species) {
    const plan = makeK3({ species: sp, appearance_id: 'modernista' })
    const art = k3Art(plan.geo, 'modernista')
    const tesserae = art.filter((l) => l.id.includes('-tessera-'))
    assert.ok(tesserae.length > 200, sp + ': ' + tesserae.length + ' tesserae')
    assert.ok(new Set(tesserae.map((l) => l.fill)).size > 40, sp + ': glaze variety')
    assert.ok(art.some((l) => /-vein/.test(l.id) && l.stroke), sp + ': veins kept as leading')
    assert.ok(!art.some((l) => /-(ground|dusting|pollen-glint)/.test(l.id)), sp + ': soft painted ground replaced')
    // Every piece sits inside its wing: no tile reaches past the cut outline.
    const xs = (pts: number[][]) => pts.map((p) => Math.abs(p[0]))
    const maxX = Math.max(...xs(plan.geo.fore), ...xs(plan.geo.hind))
    for (const t of tesserae) assert.ok(Math.max(...xs(t.points)) <= maxX + 1e-6)
    assert.notDeepEqual(art.map((l) => l.id), k3Art(plan.geo, 'natural').map((l) => l.id))
  }
})

test('K3 designs stay off the retired K2 sheet, and unknown designs are still refused', () => {
  assert.throws(() => makeK2({ species: 'monarch', appearance_id: 'modernista' as never }), /appearance/i)
  assert.throws(() => makeK3({ species: 'monarch', appearance_id: 'gaudi' as never }), /Unknown butterfly appearance/)
})

test('K3 offers Barcelona with swatches matching the print palette; retired sheets do not', () => {
  for (const sp of species) {
    const p = k3DesignPalettes[sp].modernista
    assert.deepEqual(k3DesignSwatches[sp].modernista, [p.base, p.sun, p.ink])
    const choices = k3AppearanceChoices(sp, 'es')
    const last = choices[choices.length - 1]!
    assert.equal(last.id, 'modernista')
    assert.equal(last.label, 'Barcelona')
    assert.equal(appearanceChoices(sp).at(-1)!.id as string, 'modernista')
    assert.ok(!sheetChoices(sp + '-k2').some((c) => (c.id as string) === 'modernista'))
  }
})
