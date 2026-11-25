import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { chapters, plates } from '../apps/editor/book/catalog.js'
import { photos } from '../apps/editor/book/photos.js'
import { chapterBody, chapterMeta, chapterModules, evidenceLabels, photoAlt } from '../apps/editor/book/render-chapter.js'
import * as how from '../apps/editor/book/figures/chapter-how-it-flies.js'
import * as contests from '../apps/editor/book/figures/chapter-contests.js'
import * as experiments from '../apps/editor/book/figures/chapter-experiments.js'
import * as nature from '../apps/editor/book/figures/chapter-nature.js'
import * as historyFigures from '../apps/editor/book/figures/chapter-history.js'
import * as spaceFigures from '../apps/editor/book/figures/chapter-space.js'
import { templateIds } from '../packages/one-sheet/templates.js'

const plan = JSON.parse(readFileSync(new URL('../packages/one-sheet/flatplan.json', import.meta.url), 'utf8'))
const langs = ['en', 'es', 'ru']

test('the flat plan covers its fixed pages with verso and recto in place', () => {
  const pages = plan.spreads.flatMap((s) => s.pages)
  assert.deepEqual(pages, Array.from({ length: plan.pages }, (_, i) => i + 1))
  for (const s of plan.spreads) {
    assert.ok(templateIds.includes(s.template), s.id + ' template')
    if (s.pages.length === 2) assert.equal(s.pages[0] % 2, 0, s.id + ' starts on a verso')
  }
  assert.equal(new Set(plan.spreads.map((s) => s.id)).size, plan.spreads.length)
  for (const ids of Object.values(plan.sample)) for (const id of ids) assert.ok([...plan.spreads, ...(plan.covers ?? [])].some((s) => s.id === id), 'sample ' + id)
})

test('flat-plan plates and chapters match the catalog', () => {
  const plated = plan.spreads.filter((s) => s.template === 'PL').map((s) => s.plate)
  assert.deepEqual(plated, plates.map((p) => p.id))
  for (const s of plan.spreads.filter((s) => s.plate)) assert.equal(s.chapter, plates.find((p) => p.id === s.plate).chapter)
  const openers = plan.spreads.filter((s) => ['OP', 'PH'].includes(s.template) && s.chapter).map((s) => s.chapter)
  assert.deepEqual(openers, chapters.map((c) => c.id))
  for (const s of plan.spreads.filter((s) => s.content)) {
    const [chapterId, sectionId] = s.content.split('#')
    assert.equal(s.chapter, chapterId)
    assert.ok(chapterModules[chapterId].sections.some((x) => x.id === sectionId), s.content)
  }
  // Chapters written but not yet listed in catalog.js have no spreads until the lead wires them.
  for (const [id, chapter] of Object.entries(chapterModules).filter(([id]) => chapters.some((c) => c.id === id)))
    for (const section of chapter.sections) assert.ok(plan.spreads.some((s) => s.content === id + '#' + section.id), 'no spread for ' + id + '#' + section.id)
})

const shape = (value) => JSON.stringify(value, (key, v) => (typeof v === 'string' ? (v.match(/\[\[[\w-]+\]\]|\{\{[\w-]+\}\}/g) ?? []).join('') : v))
const strings = (value) => JSON.stringify(value).match(/"(?:[^"\\]|\\.)*"/g) ?? []

test('chapter modules are complete in three languages with the same notes and evidence markers', () => {
  for (const chapter of Object.values(chapterModules)) {
    const refs = new Set(chapter.references.map((r) => r.id))
    for (const item of [chapter.opener, ...chapter.sections]) {
      for (const lang of langs) {
        assert.ok(item.text[lang], `${chapter.id} ${item.id ?? 'opener'} ${lang}`)
        assert.equal(shape(item.text[lang]), shape(item.text.en), `${chapter.id} ${item.id ?? 'opener'} ${lang} shape`)
        for (const s of strings(item.text[lang])) {
          assert.ok(!s.includes('!'), `exclamation mark in ${chapter.id} ${lang}: ${s}`)
          for (const [, id] of s.matchAll(/\[\[([\w-]+)\]\]/g)) assert.ok(refs.has(id), `${chapter.id} cites unknown ${id}`)
          for (const [, state] of s.matchAll(/\{\{([\w-]+)\}\}/g)) assert.ok(evidenceLabels[state], `${chapter.id} unknown state ${state}`)
        }
      }
      assert.doesNotMatch(JSON.stringify(item.text.es), /\bvosotros\b|\bvuestr[oa]s?\b/i, 'Spanish uses tú')
      assert.doesNotMatch(JSON.stringify(item.text.ru), /(^|[^а-яё])(ты|тебя|тебе|твой|твоя|твои|твоё)(?![а-яё])/i, 'Russian uses вы')
    }
    for (const ref of chapter.references) if (ref.url) assert.equal(new URL(ref.url).protocol, 'https:')
    assert.equal(chapter.review.es, 'needs-native-review')
    assert.equal(chapter.review.ru, 'needs-native-review')
  }
})

test('chapter pages render in every language and figures stay small and deterministic', () => {
  for (const id of Object.keys(chapterModules))
    for (const lang of langs) {
      const html = chapterBody(id, lang, '../')
      assert.match(html, /<h1>/)
      assert.doesNotMatch(html, /\[\[|\{\{/)
    }
  for (const module of [how, contests, experiments, nature, historyFigures, spaceFigures])
    for (const id of module.figureIds)
      for (const lang of langs) {
        const svg = module.figure(id, lang)
        assert.ok(svg.length < 10_000, id + ' under 10 KB')
        assert.equal(svg, module.figure(id, lang))
        assert.ok(module.figureText(id, lang))
      }
  assert.match(contests.figure('records-distance', 'en'), /98\.43 m/)
})

const newChapters = ['nature', 'history', 'space', 'games']
// Hand-written alt text covers the first photo slots; later photos use their registry caption.
const altIds = ['paper-plane', 'maple-seeds', 'dandelion', 'dragonfly', 'monarch', 'gliding-bird', 'bat', 'kite', 'glider', 'vintage-plane', 'rocket', 'earth-orbit', 'mars', 'folding-hands', 'feather']
const photoIds = Object.keys(photos)
const gameFields = ['title', 'lead', 'goal', 'players', 'need', 'setup', 'play', 'score', 'teaches', 'tryIt', 'grownUps']

test('nature, history, space and games are complete: try-it, grown-ups, sources, photo slots and figures', () => {
  assert.deepEqual(Object.keys(photoAlt).sort(), [...altIds].sort())
  const figures = new Map([...[nature, historyFigures, spaceFigures].flatMap((m) => m.figureIds.map((id) => [id, m]))])
  for (const id of newChapters) {
    const chapter = chapterModules[id]
    assert.ok(chapter, id + ' is wired into chapterModules')
    assert.ok(chapterMeta(id)?.title?.en, id + ' has a title')
    const cited = new Set(JSON.stringify(chapter.sections.concat(chapter.opener)).matchAll(/\[\[([\w-]+)\]\]/g).map((m) => m[1]))
    assert.equal(new Set(chapter.references.map((r) => r.id)).size, chapter.references.length, id + ' reference ids are unique')
    for (const ref of chapter.references) {
      assert.ok(cited.has(ref.id), `${id} reference ${ref.id} is never cited`)
      assert.match(ref.checked, /^\d{4}-\d{2}-\d{2}$/)
    }
    for (const item of [chapter.opener, ...chapter.sections]) {
      if (item.photo) assert.ok(photoIds.includes(item.photo), `${id} unknown photo ${item.photo}`)
      if (item.figure) assert.ok(figures.has(item.figure), `${id} unknown figure ${item.figure}`)
    }
    for (const lang of langs) assert.ok(chapter.opener.text[lang].grownUps, `${id} opener grown-ups ${lang}`)
    for (const section of chapter.sections) {
      for (const lang of langs) {
        const t = section.text[lang]
        assert.ok(t.title && t.lead, `${id}#${section.id} ${lang} title and lead`)
        assert.ok(t.tryIt?.steps?.length >= 2 && t.tryIt.lookFor, `${id}#${section.id} ${lang} try-it`)
        assert.ok(t.grownUps?.length >= 1, `${id}#${section.id} ${lang} grown-ups`)
        if (section.kind === 'timeline') assert.equal(t.timeline.length, section.text.en.timeline.length, `${id}#${section.id} ${lang} timeline length`)
        if (section.figure) assert.ok(t.caption, `${id}#${section.id} ${lang} caption`)
      }
    }
  }
  const games = chapterModules.games.sections
  assert.ok(games.length >= 8 && games.every((g) => g.kind === 'game'))
  assert.equal(new Set(games.map((g) => g.chapter)).size, games.length, 'one game after each chapter')
  for (const game of games) {
    assert.ok(chapterMeta(game.chapter), 'game ' + game.id + ' links to chapter ' + game.chapter)
    for (const lang of langs) {
      for (const field of gameFields) assert.ok(game.text[lang][field], `${game.id} ${lang} ${field}`)
      for (const field of ['need', 'setup', 'play']) assert.ok(Array.isArray(game.text[lang][field]) && game.text[lang][field].length >= 2, `${game.id} ${lang} ${field}`)
    }
  }
})

const build = (env = {}) => spawnSync(process.execPath, ['scripts/build_one_sheet.mjs', '--check', '--lang', 'ru'], { encoding: 'utf8', env: { ...process.env, ...env } })

test('the book build passes its overflow, font and 9 pt checks, and fails when a slot overflows', () => {
  const ok = build()
  assert.equal(ok.status, 0, ok.stderr)
  assert.match(ok.stdout, /no overflow, all fonts loaded/)
  const stressed = build({ ONE_SHEET_STRESS: '1' })
  assert.equal(stressed.status, 1)
  assert.match(stressed.stderr, /overflow p\.18 slot "text"/)
})

test('chapter.css passes the design lint', () => {
  assert.match(execFileSync(process.execPath, ['scripts/check_design.mjs'], { encoding: 'utf8' }), /Design checks pass/)
})
