import { jsPDF } from 'jspdf'
import { type Drawing, type Point, sha256 } from '../geometry/butterfly.ts'
import { atLeastLine, atLeastText, fontNotice, ink, registerFonts, useFont } from '../../apps/editor/assets/brand/print.js'
import { b1Pdf, b1Preview, b1Sheet, b1Svg } from './b1-frozen.ts'
import type { Locale, Paper } from './sizes.ts'
import { printFonts } from './fonts.ts'

export { sizes, type Locale, type Paper } from './sizes.ts'
export type PrintLabel = Drawing['labels'][number] & { font?: 'text' | 'bold' | 'display' }

// The b1 prototype prints through its frozen renderer (b1-frozen.ts); these drawings are routed there.
const frozen = new WeakSet<object>()
export function sheet(revision: any, paper: Paper, locale: Locale): Drawing {
  const drawing = b1Sheet(revision, paper, locale)
  frozen.add(drawing)
  return drawing
}
export function preview(revision: any): Buffer {
  return b1Preview(revision)
}

function escapeXML(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
export function svg(drawing: Drawing): Buffer {
  if (frozen.has(drawing)) return b1Svg(drawing)
  const { width, height, lines, labels } = drawing
  const paths = lines.map((line) => {
    const path = 'M' + line.points.map((p) => p.join(' ')).join(' L') + (line.closed ? ' Z' : '')
    return (
      '<path id="' +
      line.id +
      '" d="' +
      path +
      '" fill="' +
      (line.fill ?? 'none') +
      '" stroke="' +
      (line.stroke ?? 'none') +
      '" stroke-width="' +
      (line.stroke ? atLeastLine(line.weight) : 0) +
      '"' +
      (line.dash ? ' stroke-dasharray="' + line.dash.join(' ') + '"' : '') +
      '/>'
    )
  })
  const text = (labels as PrintLabel[]).map(
    (l) =>
      '<text x="' +
      l.x +
      '" y="' +
      l.y +
      '" font-size="' +
      atLeastText(l.size) +
      '" fill="' +
      (l.color ?? ink) +
      (l.font === 'display' ? '" font-family="Alegreya, Georgia, serif" font-weight="700' : l.font === 'bold' ? '" font-weight="700' : '') +
      '">' +
      escapeXML(l.text) +
      '</text>',
  )
  return Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      width +
      'mm" height="' +
      height +
      'mm" viewBox="0 0 ' +
      width +
      ' ' +
      height +
      '" font-family="Open Flight Text, Andika, sans-serif" stroke-linejoin="round">' +
      [...paths, ...text].join('\n') +
      '</svg>\n',
  )
}

export function pdf(drawing: Drawing & { locale?: Locale }, extraPages: Drawing[] = []): Buffer {
  if (frozen.has(drawing)) return b1Pdf(drawing, extraPages)
  const doc = new jsPDF({
    unit: 'mm',
    format: [drawing.width, drawing.height],
    compress: true,
    putOnlyUsedFonts: true,
    precision: 5,
  })
  doc.setCreationDate("D:20000101000000+00'00'")
  const source = extraPages.length ? [drawing, ...extraPages] : drawing
  doc.setFileId(sha256(JSON.stringify(source)).slice(0, 32))
  if (drawing.locale) doc.setLanguage(drawing.locale)
  doc.setProperties({
    title: 'Open Flight - Butterfly Glider',
    author: 'Open Flight contributors',
    subject:
      'Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. ' + fontNotice,
  })
  registerFonts(doc, printFonts())
  doc.viewerPreferences({ PrintScaling: 'None' })
  for (const [index, page] of [drawing, ...extraPages].entries()) {
    if (index) doc.addPage([page.width, page.height])
    doc.setLineJoin('round')
    for (const line of page.lines) {
      if (line.stroke) doc.setDrawColor(line.stroke)
      if (line.fill) doc.setFillColor(line.fill)
      doc.setLineWidth(line.stroke ? atLeastLine(line.weight) : 0)
      doc.setLineDashPattern(line.dash ?? [], 0)
      const ops = line.points.map((p: Point, i: number) => ({
        op: i ? 'l' : 'm',
        c: p,
      }))
      doc.path(ops)
      if (line.closed) doc.close()
      if (line.fill && line.stroke) doc.fillStroke()
      else if (line.fill) doc.fill()
      else doc.stroke()
    }
    for (const l of page.labels as PrintLabel[]) {
      useFont(doc, l.font)
      doc.setFontSize((atLeastText(l.size) * 72) / 25.4)
      doc.setTextColor(l.color ?? ink)
      doc.text(l.text, l.x, l.y)
    }
  }
  return Buffer.from(doc.output('arraybuffer'))
}
