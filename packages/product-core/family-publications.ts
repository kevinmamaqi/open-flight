import { readFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { classroomPlan, type ClassroomOptions } from '../../apps/editor/classroom-plan.js'
import { bookPlan, createBook, normalizeBook, sheetPath, type BookOptions } from '../print-export/family-book.js'
import { sha256 } from '../geometry/butterfly.ts'
import { invalid } from './contracts.ts'

const editorAssets = new URL('../../apps/editor/', import.meta.url)
const chunkBytes = 192 * 1024

export async function renderFamilyBook(settings: BookOptions = {}, output = 'manifest', offset = 0, classroom?: ClassroomOptions) {
  let book
  let printPlan
  try {
    if (classroom) {
      if (output !== 'manifest' || Object.keys(settings).some(key => key !== 'lang' && key !== 'paper'))
        throw new RangeError('Classroom planning uses manifest output and accepts only language and paper settings.')
      const { settings: starter, ...counts } = classroomPlan({
        lang: settings.lang, paper: settings.paper, ...classroom,
      })
      book = starter
      printPlan = counts
    } else {
      book = normalizeBook(settings)
    }
  } catch (error) {
    throw invalid(error instanceof Error ? error.message : 'Invalid book settings.')
  }
  const plan = bookPlan(book)
  const manifest = {
    edition: 'flight-book-2',
    settings: book,
    page_count: plan.pageCount,
    model_count: plan.modelCount,
    shared_guide_page: plan.guidePage,
    sheets: plan.entries.map(({ id, start, end, guidePage }) => ({
      id, path: sheetPath(id, book.paper, book.lang), first_page: start, last_page: end, guide_page: guidePage,
    })),
  }
  if (output === 'manifest') {
    if (offset !== 0) throw invalid('An offset applies to a PDF download.')
    return printPlan ? { ...manifest, classroom: printPlan } : manifest
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
