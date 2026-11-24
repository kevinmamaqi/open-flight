import { readFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { createBook, normalizeBook, sheetPath, type BookOptions } from '../print-export/family-book.js'
import { sha256 } from '../geometry/butterfly.ts'
import { invalid } from './contracts.ts'

const editorAssets = new URL('../../apps/editor/', import.meta.url)
const chunkBytes = 192 * 1024

export async function renderFamilyBook(settings: BookOptions = {}, output = 'manifest', offset = 0) {
  let book
  try {
    book = normalizeBook(settings)
  } catch (error) {
    throw invalid(error instanceof Error ? error.message : 'Invalid book settings.')
  }
  const manifest = {
    edition: 'family-book-1',
    settings: book,
    sheets: book.sheets.map(id => ({ id, path: sheetPath(id, book.paper, book.lang) })),
  }
  if (output === 'manifest') {
    if (offset !== 0) throw invalid('An offset applies to a PDF download.')
    return manifest
  }
  const bytes = Buffer.from(await createBook(book, {
    loadAsset: path => readFile(new URL(path, editorAssets)),
  }))
  if (offset >= bytes.length) throw invalid('The offset is outside the book.')
  const end = Math.min(offset + chunkBytes, bytes.length)
  return {
    ...manifest,
    pdf: {
      media_type: 'application/pdf', encoding: 'base64', byte_length: bytes.length,
      sha256: sha256(bytes), offset, next_offset: end < bytes.length ? end : null,
      content: bytes.subarray(offset, end).toString('base64'),
    },
  }
}

export function motorLab(locale: 'en' | 'es' | 'ru' = 'en') {
  const { content, ...design } = JSON.parse(readFileSync(new URL('assets/motor/lab.json', editorAssets), 'utf8'))
  return { ...design, locale, content: content[locale] }
}
