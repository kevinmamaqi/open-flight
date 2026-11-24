export type BookOptions = {
  lang?: 'en' | 'es' | 'ru'
  paper?: 'A4' | 'US_LETTER'
  theme?: 'sky' | 'sunset' | 'meadow'
  cover?: string
  sheets?: string[]
}
export function normalizeBook(input?: BookOptions): Required<BookOptions>
export function createBook(input: BookOptions, assets: {loadAsset(path: string): Promise<Uint8Array>}): Promise<Uint8Array>
export function sheetPath(id: string, paper: string, lang: string): string
