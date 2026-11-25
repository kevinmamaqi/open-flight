// Rebuild packages/one-sheet/flatplan.json from the catalog and the chapter modules.
//   bun scripts/build_flatplan.mjs
// Existing spreads keep their ids, templates and order; chapters written as modules
// (nature, history, space) get a photo opener and one spread per section; a game
// follows each chapter; pages are renumbered so every spread starts on a verso.
// Deterministic: the same catalog and modules always give the same plan.
import { readFileSync, writeFileSync } from 'node:fs'
import { chapters } from '../apps/editor/book/catalog.js'
import { chapterModules } from '../apps/editor/book/render-chapter.js'

const file = new URL('../packages/one-sheet/flatplan.json', import.meta.url)
const plan = JSON.parse(readFileSync(file, 'utf8'))
const old = plan.spreads.filter((s) => !s.generated)
const byChapter = (id) => old.filter((s) => s.chapter === id)
const front = old.filter((s) => s.chapter === null && s.pages[0] < 10).map((s) =>
  s.id === 'imprint-contents' ? { ...s, id: 'toc', template: 'TOC', title: 'Contents' } : s)
const back = old.filter((s) => s.chapter === null && s.pages[0] >= 10).map((s) =>
  s.id === 'index' ? { ...s, template: 'IX', title: 'Index' } : s)
const written = ['nature', 'history', 'space']
const games = chapterModules.games?.sections ?? []
const gameFor = (chapterId) => games.filter((g) => (g.chapter ?? g.link) === chapterId)

const spreads = [...front]
for (const chapter of chapters) {
  if (written.includes(chapter.id) && chapterModules[chapter.id]) {
    const module = chapterModules[chapter.id]
    spreads.push({ id: chapter.id, template: 'PH', chapter: chapter.id, title: chapter.title.en, photo: module.opener?.photo ?? null, generated: true })
    for (const section of module.sections)
      spreads.push({ id: chapter.id + '-' + section.id, template: 'EX', chapter: chapter.id, content: chapter.id + '#' + section.id, title: null, generated: true })
  } else spreads.push(...byChapter(chapter.id))
  for (const game of gameFor(chapter.id))
    spreads.push({ id: 'game-' + game.id, template: 'GM', chapter: 'games', content: 'games#' + game.id, title: null, generated: true })
}
const linked = new Set(chapters.map((c) => c.id))
for (const game of games.filter((g) => !linked.has(g.chapter ?? g.link)))
  spreads.push({ id: 'game-' + game.id, template: 'GM', chapter: 'games', content: 'games#' + game.id, title: null, generated: true })
spreads.push(...back)

// Renumber: page 1 alone, then spreads from page 2, and a single closing page.
let n = 1
for (const s of spreads) {
  const single = s.pages ? s.pages.length === 1 : false
  if (n === 1 || (single && s === spreads.at(-1))) { s.pages = [n]; n += 1; continue }
  s.pages = [n, n + 1]
  n += 2
}
plan.spreads = spreads
plan.pages = n - 1
plan.sample = {
  en: ['cover', 'toc', 'nature', ...spreads.filter((s) => s.chapter === 'nature' && s.template === 'EX').slice(0, 2).map((s) => s.id),
    ...spreads.filter((s) => s.template === 'GM').slice(0, 2).map((s) => s.id),
    'how-it-flies-four-forces', 'plate-A1', 'history', ...spreads.filter((s) => s.chapter === 'history' && s.template === 'EX').slice(0, 1).map((s) => s.id),
    'space', ...spreads.filter((s) => s.chapter === 'space' && s.template === 'EX').slice(0, 1).map((s) => s.id), 'contests-records', 'index', 'back'].filter((id) => id === 'cover' || id === 'back' || spreads.some((s) => s.id === id)),
  es: ['cover', 'toc', 'space'].filter((id) => id === 'cover' || spreads.some((s) => s.id === id)),
  ru: ['cover', 'toc', 'nature', 'how-it-flies-four-forces'].filter((id) => id === 'cover' || spreads.some((s) => s.id === id)),
}
writeFileSync(file, JSON.stringify(plan, null, 2) + '\n')
console.log(`Flat plan: ${spreads.length} spreads, ${plan.pages} pages, ${spreads.filter((s) => s.template === 'GM').length} games.`)
