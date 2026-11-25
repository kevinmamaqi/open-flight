import type { BookOptions, NormalizedBook } from '../../packages/print-export/family-book.js'
export function studioForBookSheet(book: NormalizedBook, sheetId: string): string
export function bookFromStudio(sheetId: string, appearance: string, lang: string, paper: string): string
export function applyStudioColors(draft: BookOptions, address: string): BookOptions
