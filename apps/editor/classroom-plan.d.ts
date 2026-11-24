import type { BookOptions } from '../../packages/print-export/family-book.js'

export type ClassroomOptions = {
  learners: number
  team_size: 2 | 3 | 4
}

export function classroomPlan(input: ClassroomOptions & Pick<BookOptions, 'lang' | 'paper'>, bookBase?: string | URL): {
  settings: Required<BookOptions>
  learners: number
  team_size: 2 | 3 | 4
  teams: number
  rows: Array<
    | { kind: 'model'; sheet_id: string; pages: number[]; copies: number }
    | { kind: 'scale_check' | 'shared_guide' | 'flight_log'; pages: number[]; copies: number }
  >
  total_sheets: number
  optional_pages: number[]
  book_url: string
  guide_url: string
}
