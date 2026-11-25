import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { airplaneBalance, airplaneBalanceSource, vortexLattice } from '../packages/planes/balance.ts'

test('the vortex lattice reproduces textbook wings', () => {
  // Rectangular wing, aspect ratio 1: Helmbold's lift slope 2πA / (2 + √(A² + 4)) ≈ 1.48 per radian.
  const helmbold = (2 * Math.PI) / (2 + Math.sqrt(5))
  const rect = vortexLattice(() => 0, () => 100, 50, 30, 16)
  assert.ok(rect.consistent)
  assert.ok(Math.abs(rect.clAlpha - helmbold) / helmbold < 0.02, String(rect.clAlpha))
  // Delta wing, aspect ratio 1: centre of lift near 0.62 of the root chord (slender theory: 2/3).
  const delta = vortexLattice((eta) => (eta / 50) * 200, () => 200, 50, 30, 16)
  assert.ok(Math.abs(delta.centre / 200 - 0.62) < 0.02, String(delta.centre / 200))
  // A long rectangular wing lifts near its quarter chord.
  const long = vortexLattice(() => 0, () => 100, 400, 30, 8)
  assert.ok(Math.abs(long.centre / 100 - 0.25) < 0.02, String(long.centre))
})

test('A4 balance points and lift ranges match the 25 November review within 2 mm', () => {
  const report = {
    'boeing-747': [[114, 104, 95], [52, 135]],
    'douglas-dc3': [[121, 110, 101], [46, 137]],
    'tupolev-tu144': [[152, 137, 126], [166, 200]],
    'ilyushin-il62': [[135, 122, 112], [118, 175]],
  } as const
  for (const [id, [balance, lift]] of Object.entries(report)) {
    const d = airplaneBalance(id as keyof typeof report, 'A4')
    d.balance.forEach((v, i) => assert.ok(Math.abs(v - balance[i]) <= 2, `${id} balance ${i}: ${v}`))
    d.lift.forEach((v, i) => assert.ok(Math.abs(v - lift[i]) <= 2, `${id} lift ${i}: ${v}`))
    assert.ok(d.balance[0] > d.balance[1] && d.balance[1] > d.balance[2], 'clips move the balance forward')
    assert.ok(d.balance[0] < 160, 'fits the 160 mm book ruler')
    assert.ok(d.tipRise >= 9 && d.tipRise <= 11, 'an 8° V lifts each tip about 10 mm')
    assert.equal(d.layers[0][0], 0)
    assert.equal(d.layers.at(-1)?.[1], d.length)
    assert.deepEqual(d.body.at(-1), [d.length, d.keel])
  }
})

test('the committed browser module matches a fresh computation', () => {
  const committed = readFileSync(new URL('../apps/editor/book/figures/airplane-balance.js', import.meta.url), 'utf8')
  assert.equal(committed, airplaneBalanceSource(), 'Run bun scripts/build_airplane_balance.mjs')
})
