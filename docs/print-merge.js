// Joins Print & Play PDFs. This is the only PDF code the /print/ page loads, and only when a
// second design is chosen: it needs pdf-lib alone. The browser loads it as the bundle
// print-merge-engine.js (bun scripts/build_print_and_play.mjs --engine). The static build and
// the application service run this same source, so every route returns the same bytes.
import { Duplex, PDFArray, PDFDict, PDFDocument, PDFRawStream, PDFRef, PrintScaling } from 'pdf-lib'

const fixedDate = new Date('2026-11-25T00:00:00Z')

function same(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}
function hash(bytes) {
  let h = 2166136261
  for (let i = 0; i < bytes.length; i++) h = Math.imul(h ^ bytes[i], 16777619)
  return (h >>> 0).toString(16) + ':' + bytes.length
}

/**
 * Copying pages from several documents repeats the fonts and images they share. Collapse
 * byte-identical streams to one object and point every reference at it. A merged set of three
 * flying objects then weighs about what one of them does.
 */
export function dedupeStreams(doc) {
  const { context } = doc
  for (let pass = 0; pass < 4; pass++) {
    const firstOf = new Map()
    const swap = new Map()
    for (const [ref, object] of context.enumerateIndirectObjects()) {
      if (!(object instanceof PDFRawStream) || object.contents.length < 1024) continue
      const description = object.dict.toString()
      if (/\d+ \d+ R/.test(description)) continue // wait for the streams it points to to settle
      const key = description + hash(object.contents)
      const known = firstOf.get(key)
      if (known && same(known.bytes, object.contents)) swap.set(ref.toString(), known.ref)
      else if (!known) firstOf.set(key, { ref, bytes: object.contents })
    }
    if (!swap.size) break
    const replace = (value) => (value instanceof PDFRef ? swap.get(value.toString()) : undefined)
    const walk = (object) => {
      if (object instanceof PDFDict) {
        for (const [name, value] of object.entries()) {
          const found = replace(value)
          if (found) object.set(name, found)
          else walk(value)
        }
      } else if (object instanceof PDFArray) {
        for (let i = 0; i < object.size(); i++) {
          const value = object.get(i)
          const found = replace(value)
          if (found) object.set(i, found)
          else walk(value)
        }
      } else if (object instanceof PDFRawStream) walk(object.dict)
    }
    for (const [, object] of context.enumerateIndirectObjects()) walk(object)
    for (const key of swap.keys()) {
      const [number, generation] = key.split(' ')
      context.delete(PDFRef.of(Number(number), Number(generation)))
    }
  }
}

/** Metadata and print settings every Print & Play PDF carries: single-sided, scaling None. */
export function finishDocument(doc, { title, lang }) {
  doc.setTitle(title)
  doc.setAuthor('Open Flight')
  doc.setCreator('Open Flight')
  doc.setSubject('Print & Play · CC BY-SA 4.0 art and text · CERN-OHL-W-2.0 geometry · openflight.design')
  doc.setLanguage(lang)
  doc.setCreationDate(fixedDate)
  doc.setModificationDate(fixedDate)
  const prefs = doc.catalog.getOrCreateViewerPreferences()
  prefs.setDuplex(Duplex.Simplex)
  prefs.setPrintScaling(PrintScaling.None)
  return doc
}

/**
 * Join whole PDFs in order. Each source is copied in a single call, so resources used by
 * several of its pages arrive once. `sources` are Uint8Arrays or loaded PDFDocuments.
 */
export async function mergePdfs(sources, { title, lang }) {
  const out = await PDFDocument.create({ updateMetadata: false })
  for (const source of sources) {
    const loaded = source instanceof PDFDocument ? source : await PDFDocument.load(source, { updateMetadata: false })
    for (const page of await out.copyPages(loaded, loaded.getPageIndices())) out.addPage(page)
  }
  dedupeStreams(out)
  finishDocument(out, { title, lang })
  return out.save({ useObjectStreams: false })
}

/** The title of a merged set: "Open Flight Print & Play · B1, A1, F1". */
export const setTitle = (ids) => 'Open Flight Print & Play · ' + ids.join(', ')
