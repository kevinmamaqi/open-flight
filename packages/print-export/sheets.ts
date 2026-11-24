import { readFileSync } from 'node:fs'
import { jsPDF } from 'jspdf'
import { butterfly, type Drawing, type Point, sha256 } from '../geometry/butterfly.ts'

export const sizes = { A4: [210, 297], US_LETTER: [215.9, 279.4] } as const
export type Paper = keyof typeof sizes
export type Locale = 'en' | 'ru' | 'es'

const copy = {
  en: [
    'Butterfly Glider',
    'Experimental paper glider',
    'Print at 100% / actual size. Measure the line before cutting.',
    'Solid outline: cut. Dashed roots: fold both wings up equally.',
    'Dotted trim marks: leave flat for the first comparison.',
    'Slide the same paper clip onto the nose. Align its rear end with A or B.',
    'Try plain copier paper. Record the actual paper and clip used.',
    'Calibration',
    'Flat span',
    'Source',
  ],
  ru: [
    'Планер-бабочка',
    'Экспериментальный бумажный планер',
    'Печатайте в масштабе 100%. Измерьте линию перед вырезанием.',
    'Вырежьте по контуру. По штриховым линиям одинаково поднимите крылья.',
    'Линии мелкого пунктира оставьте плоскими для первого опыта.',
    'Наденьте скрепку на нос. Совместите её задний конец с меткой A или B.',
    'Возьмите офисную бумагу. Запишите, какую бумагу и скрепку использовали.',
    'Контроль масштаба',
    'Размах развёртки',
    'Исходник',
  ],
  es: [
    'Planeador mariposa',
    'Planeador de papel experimental',
    'Imprime al 100 % en tamaño real. Mide la línea antes de recortar.',
    'Recorta por el contorno continuo. Levanta ambas alas por las líneas de trazos.',
    'Deja planas las aletas marcadas con puntos para la primera comparación.',
    'Desliza el mismo clip por la punta. Alinea su extremo trasero con A o B.',
    'Prueba con papel normal de impresora. Anota el papel y el clip que uses.',
    'Control de escala',
    'Envergadura en plano',
    'Archivo fuente',
  ],
}
export function sheet(revision: any, paper: Paper, locale: Locale): Drawing {
  const [width, height] = sizes[paper],
    t = copy[locale]
  const { ref, parameters, appearance_id } = revision
  const { lines, labels } = butterfly(parameters.span_mm, appearance_id, width / 2, 54)
  const label = (x: number, y: number, text: string, size: number, color = '#23362e') =>
    labels.push({ x, y, text, size, color })
  label(14, 17, 'OPEN FLIGHT', 3.6, '#486456')
  label(14, 31, t[0], 8.5)
  label(14, 40, t[1] + '  /  ' + ref.design_id + '  /  ' + ref.revision_id, 3.2)
  label(14, 165, t[8] + '  ' + parameters.span_mm + ' mm', 3.7)
  t.slice(3, 7).forEach((line, i) => label(14, 177 + i * 6, line, 3.15))
  label(14, 211, t[7] + '  /  50 mm', 3.6)
  lines.push({
    id: 'ruler',
    points: [
      [14, 218],
      [64, 218],
    ],
    stroke: '#20382f',
    weight: 0.42,
  })
  for (let mm = 0; mm <= 50; mm += 5) {
    lines.push({
      id: 'tick-' + mm,
      points: [
        [14 + mm, 218],
        [14 + mm, mm % 10 === 0 ? 214.8 : 216.3],
      ],
      stroke: '#20382f',
      weight: 0.32,
    })
  }
  label(14, 227, t[2], 3.1)
  label(14, height - 17, t[9] + ' SHA-256', 2.8)
  label(14, height - 12, ref.source_sha256, 2.7)
  label(14, height - 7, 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0', 2.5)
  return { width, height, lines, labels }
}

function escapeXML(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
export function svg(drawing: Drawing): Buffer {
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
      (line.weight ?? 0) +
      '"' +
      (line.dash ? ' stroke-dasharray="' + line.dash.join(' ') + '"' : '') +
      '/>'
    )
  })
  const text = labels.map(
    (l) =>
      '<text x="' +
      l.x +
      '" y="' +
      l.y +
      '" font-size="' +
      l.size +
      '" fill="' +
      (l.color ?? '#23362e') +
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
      '" font-family="DejaVu Sans, sans-serif" stroke-linejoin="round">' +
      [...paths, ...text].join('\n') +
      '</svg>\n',
  )
}
export function preview(revision: any): Buffer {
  const width = 200,
    height = 110
  return svg({
    width,
    height,
    ...butterfly(revision.parameters.span_mm, revision.appearance_id, width / 2, 7),
  })
}

const fontPath = new URL('../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf', import.meta.url)
const fontNotice = readFileSync(
  new URL('../../node_modules/dejavu-fonts-ttf/LICENSE', import.meta.url),
  'utf8',
)
let font64: string
export function pdf(drawing: Drawing & { locale?: Locale }, extraPages: Drawing[] = []): Buffer {
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
      'Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. Embedded font notices:\n' + fontNotice,
  })
  font64 ??= readFileSync(fontPath).toString('base64')
  doc.addFileToVFS('DejaVuSans.ttf', font64)
  doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal')
  doc.setFont('DejaVu', 'normal')
  for (const [index, page] of [drawing, ...extraPages].entries()) {
    if (index) doc.addPage([page.width, page.height])
    doc.setLineJoin('round')
    for (const line of page.lines) {
      if (line.stroke) doc.setDrawColor(line.stroke)
      if (line.fill) doc.setFillColor(line.fill)
      doc.setLineWidth(line.weight ?? 0)
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
    for (const l of page.labels) {
      doc.setFontSize((l.size * 72) / 25.4)
      doc.setTextColor(l.color ?? '#23362e')
      doc.text(l.text, l.x, l.y)
    }
  }
  return Buffer.from(doc.output('arraybuffer'))
}
