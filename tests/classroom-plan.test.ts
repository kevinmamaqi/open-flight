import assert from 'node:assert/strict'
import test from 'node:test'
import { classroomPlan } from '../apps/editor/classroom-plan.js'
import { renderFamilyBook } from '../packages/product-core/family-publications.ts'

test('the classroom manifest matches the browser copy plan for the Starter 3 ink book', async () => {
  const classroom = { learners: 31, team_size: 3 } as const
  const { settings, ...plan } = classroomPlan({
    lang: 'es', paper: 'US_LETTER', ...classroom,
  })
  const result = await renderFamilyBook({ lang: 'es', paper: 'US_LETTER' }, 'manifest', 0, classroom)
  assert.ok('classroom' in result)
  assert.deepEqual(result.classroom, plan)
  assert.deepEqual(result.settings, settings)
  assert.equal(result.page_count, 15)
  assert.deepEqual(result.settings.sheets, ['monarch-k1', 'boeing-747', 'morpho-k1'])
  assert.equal(result.settings.style, 'ink')
  assert.equal(plan.teams, 11)
  assert.equal(plan.total_sheets, 89)
  assert.deepEqual(plan.rows, [
    { kind: 'scale_check', pages: [2], copies: 1 },
    { kind: 'model', sheet_id: 'monarch-k1', pages: [6], copies: 11 },
    { kind: 'model', sheet_id: 'boeing-747', pages: [8, 9, 10, 11], copies: 11 },
    { kind: 'model', sheet_id: 'morpho-k1', pages: [12], copies: 11 },
    { kind: 'shared_guide', pages: [7], copies: 11 },
    { kind: 'flight_log', pages: [4], copies: 11 },
  ])
  assert.deepEqual(plan.optional_pages, [1, 3, 5, 13, 14, 15])
  assert.equal(new URL(plan.book_url).searchParams.get('lang'), 'es')
  assert.equal(new URLSearchParams(new URL(plan.book_url).hash.slice(1)).get('paper'), 'letter')
  assert.equal(new URL(plan.guide_url).pathname, '/open-flight/classroom.html')
  assert.equal(new URL(plan.guide_url).searchParams.get('learners'), '31')
  const legacy = await renderFamilyBook(settings)
  assert.equal('classroom' in legacy, false)
  assert.deepEqual(legacy.sheets, result.sheets)
})

test('classroom print planning validates the dimensions and leaves PDF downloads separate', async () => {
  const options = { learners: 1, team_size: 4 } as const
  assert.equal(classroomPlan(options).total_sheets, 9)
  assert.throws(() => classroomPlan({ ...options, learners: 301 }), /class size/)
  await assert.rejects(renderFamilyBook({ pilot: 'Ada' }, 'manifest', 0, options), /only language and paper/)
  await assert.rejects(renderFamilyBook({}, 'pdf', 0, options), /manifest output/)
  await assert.rejects(renderFamilyBook({}, 'manifest', 1, options), /offset applies to a PDF/)
})
