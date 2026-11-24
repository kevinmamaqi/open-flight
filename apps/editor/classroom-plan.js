import { bookPlan, bookURL, normalizeBook, starterModels } from './book-model.js'
import { sheetIdFor } from './family-sheets.js'

const sheets = starterModels.map(model => sheetIdFor(model))

export function classroomPlan({ lang, paper, learners, team_size }, bookBase) {
  if (!Number.isInteger(learners) || learners < 1 || learners > 300)
    throw new RangeError('Enter a class size from 1 to 300.')
  if (![2, 3, 4].includes(team_size))
    throw new RangeError('Choose 2, 3 or 4 learners per team.')

  const settings = normalizeBook({ lang, paper, sheets, style: 'ink' })
  const { entries, guidePage, originPages } = bookPlan(settings)
  const teams = Math.ceil(learners / team_size)
  const rows = [
    { kind: 'scale_check', pages: [2], copies: 1 },
    ...entries.map(({ id, pages }) => ({
      kind: 'model',
      sheet_id: id,
      pages: pages.map(({ number }) => number).filter(number => number !== guidePage),
      copies: teams,
    })),
    { kind: 'shared_guide', pages: [guidePage], copies: teams },
    { kind: 'flight_log', pages: [4], copies: teams },
  ]
  const book_url = bookURL(settings, bookBase)
  const guide = new URL('classroom.html', book_url)
  guide.search = new URLSearchParams({
    lang: settings.lang, learners, team: team_size, paper: settings.paper === 'A4' ? 'a4' : 'letter',
  }).toString()

  return {
    settings,
    learners, team_size, teams, rows,
    total_sheets: rows.reduce((total, { pages, copies }) => total + pages.length * copies, 0),
    optional_pages: [1, 3, 5, ...originPages.map(page => page.number)],
    book_url,
    guide_url: guide.href,
  }
}
