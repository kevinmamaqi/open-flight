import type { BookOptions, NormalizedBook } from '../../packages/print-export/family-book.js'

export type ClassroomOptions = {
  learners: number
  team_size: 2 | 3 | 4
  include_activities?: boolean
}

export function classroomPlan(input: ClassroomOptions & Pick<BookOptions, 'lang' | 'paper'>, bookBase?: string | URL): {
  settings: NormalizedBook
  learners: number
  team_size: 2 | 3 | 4
  teams: number
  rows: Array<
    | { kind: 'activity'; activity_id: string; pages: number[]; copies: number }
    | { kind: 'model'; sheet_id: string; pages: number[]; copies: number }
    | { kind: 'scale_check' | 'shared_guide' | 'flight_log'; pages: number[]; copies: number }
  >
  total_sheets: number
  optional_pages: number[]
  book_url: string
  guide_url: string
}
