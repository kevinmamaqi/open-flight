import { aircraftPortrait } from './field-portraits.js'
import { backScene, pageSize, sheetScene, specimenScene } from './drawing.js'
import { foldScene } from './guide.js'
import { planeCredits, creditText } from './credits.js'
import { atLeastLine, atLeastText, fontNotice as printFontNotice, ink, muted, registerFonts, textMm, useFont } from '../brand/print.js'

function draw(doc, parts, offset = [0, 0], scale = 1) {
  const pt = ([x, y]) => [offset[0] + x * scale, offset[1] + y * scale]
  for (const e of parts) {
    if (e.type === 'text') {
      useFont(doc, e.font)
      doc.setFontSize((atLeastText(e.size * scale) * 72) / 25.4)
      doc.setTextColor(e.color)
      const align = e.anchor === 'middle' ? 'center' : e.anchor === 'end' ? 'right' : 'left'
      if (e.url) doc.textWithLink(e.value, ...pt(e.pos), { align, url: e.url })
      else doc.text(e.value, ...pt(e.pos), { align })
      continue
    }
    const fill = e.fill && e.fill !== 'none',
      stroke = e.stroke && e.stroke !== 'none'
    if (fill) doc.setFillColor(e.fill)
    if (stroke) doc.setDrawColor(e.stroke)
    doc.setLineWidth(stroke ? atLeastLine((e.sw ?? 0.3) * scale) : 0)
    doc.setLineDashPattern(
      (e.dash ?? []).map((x) => x * scale),
      0,
    )
    const style = fill && stroke ? 'FD' : fill ? 'F' : 'S'
    if (e.type === 'circle') {
      doc.circle(...pt(e.pos), e.radius * scale, style)
      continue
    }
    if (!e.points.length) continue
    const pts = e.points.map(pt)
    const segments = pts.slice(1).map((p, i) => [p[0] - pts[i][0], p[1] - pts[i][1]])
    doc.lines(segments, ...pts[0], [1, 1], style, e.type === 'polygon')
  }
  doc.setLineDashPattern([], 0)
}
function fixedId(value) {
  let hash = 2166136261
  return [1, 2, 3, 4]
    .map((n) => {
      for (const c of n + value) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619)
      return (hash >>> 0).toString(16).padStart(8, '0')
    })
    .join('')
}
// jsPDF and the embedded typeface are supplied by the local Node package or the offline browser bundle.
export function planePdfBytes(plan, JsPDF, fonts) {
  // Pages are always the real paper size. In revision 2 the sheet to fold sits inside it.
  const [w, h] = pageSize(plan)
  const ru = plan.locale === 'ru',
    t = (en, ruText, es) => ({ en, ru: ruText, es })[plan.locale]
  const credit = creditText(plan.locale)
  const doc = new JsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [w, h],
    compress: true,
    putOnlyUsedFonts: true,
    precision: 5,
  })
  registerFonts(doc, fonts)
  doc.setLanguage(plan.locale)
  doc.viewerPreferences({ PrintScaling: 'None', Duplex: 'DuplexFlipLongEdge' })
  doc.setProperties({
    title: plan.name + ' · Open Flight',
    author: planeCredits.creator,
    subject:
      t(
        'Whole-sheet paper airplane and illustrated fold guide',
        'Бумажный самолёт из целого листа и схемы сборки',
        'Avión de papel de una hoja entera y guía ilustrada de dobleces',
      ) +
      '. ' +
      [credit.creator, credit.geometry, credit.artwork, planeCredits.url].join('. ') +
      '\n' +
      printFontNotice,
    keywords: ['Open Flight', credit.geometry, credit.artwork].join(', '),
  })
  doc.setCreationDate("D:20260101000000+00'00'")
  doc.setFileId(fixedId('airplane-print-safe/' + JSON.stringify(plan.source) + plan.locale + planeCredits.url))
  draw(doc, sheetScene(plan))
  // Page 2 is the back of the same sheet, for double-sided printing.
  doc.addPage([w, h], 'portrait')
  draw(doc, backScene(plan))
  const write = (value, x, y, size, color = ink, font = 'text') => {
    useFont(doc, font)
    doc.setFontSize(Math.max(size, textMm.min * 72 / 25.4))
    doc.setTextColor(color)
    doc.text(value, x, y)
  }
  const block = (value, x, y, width, size = 9) => {
    useFont(doc, 'text')
    doc.setFontSize(Math.max(size, 9))
    doc.setTextColor(ink)
    const lines = doc.splitTextToSize(value, width)
    doc.text(lines, x, y, { lineHeightFactor: 1.38 })
  }
  const notebook = (y) => {
    const x = w * 0.44
    draw(doc, specimenScene(plan), [12, y + 4], (w * 0.36) / 420)
    write(t('Flight notebook', 'Лётный дневник', 'Cuaderno de vuelo'), x, y + 8, 14, ink, 'display')
    block(
      t(
        'Hold the body near the front. Launch gently and level into clear space.',
        'Возьмитесь за корпус ближе к носу. Мягко запустите самолёт горизонтально в свободное пространство.',
        'Sujeta el cuerpo cerca de la punta. Lanza suavemente, a nivel y hacia un espacio despejado.',
      ) +
        ' ' +
        plan.experiment,
      x,
      y + 17,
      w - x - 12,
    )
    write(t('Launch', 'Запуск', 'Lanzamiento'), 13, y + 57, 9, ink, 'bold')
    write(
      t(
        'Where did it land?  What changed?',
        'Где сел самолёт? Что изменилось?',
        '¿Dónde aterrizó? ¿Qué cambió?',
      ),
      36,
      y + 57,
      9,
    )
    for (let trial = 1; trial <= 5; trial++) {
      const lineY = y + 59 + trial * 6
      write(String(trial), 15, lineY - 1, 9)
      doc.setDrawColor(muted)
      doc.setLineWidth(0.3)
      doc.line(35, lineY, w - 12, lineY)
    }
    const { field } = plan
    const portraitWidth = w * 0.34
    doc.addImage(
      aircraftPortrait(plan.model_id),
      'JPEG',
      12,
      y + 94,
      portraitWidth,
      (portraitWidth * 210) / 470,
    )
    write(field.landmark, x, y + 98, 11, ink, 'bold')
    block([field.fold, field.finish].join(' '), x, y + 104, w - x - 12, 9)
    useFont(doc, 'text')
    doc.setFontSize(9)
    doc.setTextColor(muted)
    doc.textWithLink(field.museum.label, x, y + 122, { url: field.museum.url })
    write(credit.creator, 12, y + 130, 9, muted)
    useFont(doc, 'text')
    doc.setFontSize(9)
    doc.setTextColor(muted)
    doc.textWithLink(credit.geometry, 12, y + 135, {
      url: planeCredits.geometry.url,
    })
    doc.textWithLink(credit.artwork, w * 0.5, y + 135, {
      url: planeCredits.artwork.url,
    })
    doc.textWithLink(credit.credits, 12, y + 140, { url: planeCredits.url })
  }
  const perPage = 3,
    count = Math.ceil(plan.steps.length / perPage)
  for (let page = 0; page < count; page++) {
    doc.addPage([w, h], 'portrait')
    write('Open Flight  ·  ' + plan.inspiration, 12, 13, 9, muted, 'display')
    write(plan.name, 12, 24, 23, ink, 'display')
    write(
      t('Folding guide', 'Как сложить', 'Guía de dobleces') + '  ' + (page + 1) + ' / ' + count,
      12,
      32,
      10,
      ink,
      'bold',
    )
    const label =
      (plan.paper === 'A4' ? 'A4' : t('US Letter', 'US Letter', 'Carta')) +
      '   •   ' +
      plan.keel_mm +
      ' / ' +
      plan.winglet_mm +
      (ru ? ' мм' : ' mm')
    useFont(doc, 'text')
    doc.setFontSize(9)
    doc.setTextColor(muted)
    doc.text(label, w - 12, 13, { align: 'right' })
    block(
      plan.trim_mm
        ? t(
            'Use the airplane template. For two printed faces, print the template and its reverse from the separate airplane PDF, flipping on the long edge. Cut along the thick border, then fold. Any print scale works because the lines meet the border you cut.',
            'Возьмите выкройку самолёта. Для двусторонней печати выберите выкройку и её оборот в отдельном PDF самолёта, с переворотом по длинному краю. Вырежьте лист по толстой рамке и складывайте. Подойдёт любой масштаб печати: линии доходят до вырезанного края.',
            'Usa la plantilla del avión. Para imprimir las dos caras, elige la plantilla y su reverso en el PDF individual del avión y gira por el borde largo. Recorta por el borde grueso y luego dobla. Sirve cualquier escala de impresión, porque las líneas llegan al borde que recortas.',
          )
        : t(
            'Use the airplane template. For two printed faces, print the template and its reverse from the separate airplane PDF, flipping on the long edge. Actual size is best: the 50 mm line measures 50 mm. Fit to page also works; the line then measures about 48 mm, so fold to the paper edges.',
            'Возьмите выкройку самолёта. Для двусторонней печати выберите выкройку и её оборот в отдельном PDF самолёта, с переворотом по длинному краю. Лучше всего масштаб 100%: контрольная линия будет ровно 50 мм. «По размеру страницы» тоже подойдёт: линия будет около 48 мм, сгибайте по краям листа.',
            'Usa la plantilla del avión. Para imprimir las dos caras, elige la plantilla y su reverso en el PDF individual del avión y gira por el borde largo. Lo mejor es el tamaño real: la línea mide 50 mm. «Ajustar a la página» también sirve; la línea medirá unos 48 mm, así que dobla siguiendo los bordes del papel.',
          ),
      12,
      38.5,
      w - 24,
      9,
    )
    const panels = plan.steps.slice(page * perPage, (page + 1) * perPage)
    const lane = (h - 80) / 3
    panels.forEach((step, i) => {
      const y = 58 + i * lane,
        picture = (w * 0.47) / 388,
        x = w * 0.505
      doc.setDrawColor(muted)
      doc.setLineWidth(0.3)
      doc.line(12, y, w - 12, y)
      doc.setLineDashPattern([], 0)
      doc.setDrawColor(ink)
      doc.setLineWidth(0.5)
      doc.circle(16, y + 7.5, 4, 'S')
      useFont(doc, 'bold')
      doc.setFontSize(10)
      doc.setTextColor(ink)
      doc.text(String(step.index + 1), 16, y + 8.8, { align: 'center' })
      write(step.title, 23, y + 9, 12, ink, 'bold')
      draw(doc, foldScene(plan, step), [8, y + 14], picture)
      block(step.instruction, x, y + 22, w - x - 14, 9.3)
    })
    if (panels.length === 1) notebook(62 + lane)
    const footer = t(
      'White: printed side  ·  Pale: reverse  ·  Shaded: flap that moves  ·  Dashes: crease',
      'Белое: печать  ·  Светлое: оборот  ·  Тёмное: клапан  ·  Пунктир: сгиб',
      'Blanco: cara impresa  ·  Claro: reverso  ·  Sombreado: parte que se dobla  ·  Trazos: doblez',
    )
    write(footer, 12, h - 13, 9, muted)
    write('Open Flight  ·  ' + plan.code + '  ·  r' + plan.revision, 12, h - 8, 9, muted)
  }
  if (plan.steps.length % perPage !== 1) {
    doc.addPage([w, h], 'portrait')
    write('Open Flight  ·  ' + plan.name, 12, 15, 10, muted, 'display')
    notebook(30)
  }
  return new Uint8Array(doc.output('arraybuffer'))
}
