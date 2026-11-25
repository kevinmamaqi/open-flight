import { readFile } from 'node:fs/promises'
import { sha256 } from '../geometry/butterfly.ts'
import { renderPrintAndPlay } from '../print-export/print-and-play.js'
import { designName } from '../../apps/editor/print-guide-content.js'
import {
  designURL, normalizeSelection, pagePlan, printFilename, resolvePlate, selectionHash, staticPath,
  type PrintSelection,
} from '../../apps/editor/print-and-play.js'
import { invalid } from './contracts.ts'

const editorAssets = new URL('../../apps/editor/', import.meta.url)
const chunkBytes = 192 * 1024

export type PrintAndPlayArgs = {
  designs: string[]
  lang?: 'en' | 'es' | 'ru'
  paper?: 'A4' | 'US_LETTER'
  edge?: 'cut' | 'whole'
  output?: 'manifest' | 'pdf'
  offset?: number
}

/**
 * The Print & Play PDF for one to three designs: the same bytes the website downloads.
 * `designs` are plate IDs or models. The manifest lists the pages and the website's static
 * file for these settings; `output: "pdf"` returns the PDF in base64 pieces.
 */
export async function printAndPlay(args: PrintAndPlayArgs) {
  const { output = 'manifest', offset = 0 } = args
  let selection: PrintSelection
  try {
    const { designs, output: _output, offset: _offset, ...rest } = args
    selection = normalizeSelection({ ...rest, plates: designs })
  } catch (error) {
    throw invalid(error instanceof Error ? error.message : 'Invalid Print & Play settings.')
  }
  const pages = selection.plates.map((id) => pagePlan(id, selection))
  const manifest = {
    edition: 'print-and-play-1',
    settings: { designs: selection.plates, lang: selection.lang, paper: selection.paper, edge: selection.edge },
    filename: printFilename(selection),
    page_count: pages.reduce((total, plan) => total + plan.length, 0),
    designs: selection.plates.map((id, index) => ({
      id, model: resolvePlate(id).model, name: designName(id, selection.lang), url: designURL(id, selection.lang),
      pages: pages[index].map((page: any) => ({
        role: page.role,
        source: page.source?.path ?? null,
        source_page: page.source?.path ? page.source.index + 1 : null,
      })),
    })),
    static_path: staticPath(selection),
    booklet_hash: selectionHash(selection),
  }
  if (output === 'manifest') {
    if (offset !== 0) throw invalid('An offset applies to a PDF download.')
    return manifest
  }
  const bytes = Buffer.from(await renderPrintAndPlay(selection, { loadAsset: (path: string) => readFile(new URL(path, editorAssets)) }))
  if (offset >= bytes.length) throw invalid('The offset is outside the PDF.')
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
