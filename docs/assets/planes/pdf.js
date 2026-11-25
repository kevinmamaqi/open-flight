import { aircraftPortrait } from './field-portraits.js?v=317e8ae67356'
import { backScene, pageSize, sheetScene, specimenScene } from './drawing.js?v=317e8ae67356'
import { foldScene } from './guide.js?v=317e8ae67356'
import { planeCredits, creditText } from './credits.js?v=317e8ae67356'

function draw(doc, parts, offset = [0, 0], scale = 1) {
  const pt = ([x, y]) => [offset[0] + x * scale, offset[1] + y * scale]
  for (const e of parts) {
    if (e.type === 'text') {
      doc.setFontSize((e.size * scale * 72) / 25.4)
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
    doc.setLineWidth((e.sw ?? 0.3) * scale)
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
export function planePdfBytes(plan, JsPDF, fontBase64, fontNotice) {
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
  doc.addFileToVFS('DejaVuSans.ttf', fontBase64)
  doc.addFont('DejaVuSans.ttf', 'Flight', 'normal')
  doc.setFont('Flight', 'normal')
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
      t(
        'Embedded DejaVu Sans font notices:',
        'Лицензия встроенного шрифта DejaVu Sans:',
        'Avisos de licencia de la fuente DejaVu Sans incrustada:',
      ) +
      '\n' +
      fontNotice,
    keywords: ['Open Flight', credit.geometry, credit.artwork].join(', '),
  })
  doc.setCreationDate("D:20260101000000+00'00'")
  doc.setFileId(fixedId('airplane-print-safe/' + JSON.stringify(plan.source) + plan.locale + planeCredits.url))
  draw(doc, sheetScene(plan))
  // Page 2 is the back of the same sheet, for double-sided printing.
  doc.addPage([w, h], 'portrait')
  draw(doc, backScene(plan))
  const write = (value, x, y, size, color = '#243f48') => {
    doc.setFontSize(size)
    doc.setTextColor(color)
    doc.text(value, x, y)
  }
  const block = (value, x, y, width, size = 9) => {
    doc.setFontSize(size)
    doc.setTextColor('#304950')
    const lines = doc.splitTextToSize(value, width)
    doc.text(lines, x, y, { lineHeightFactor: 1.38 })
  }
  const notebook = (y) => {
    const x = w * 0.44
    draw(doc, specimenScene(plan), [12, y + 4], (w * 0.36) / 420)
    write(t('Flight notebook', 'Лётный дневник', 'Cuaderno de vuelo'), x, y + 8, 14)
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
    write(t('Launch', 'Запуск', 'Lanzamiento'), 13, y + 57, 9)
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
      write(String(trial), 15, lineY - 1, 8)
      doc.setDrawColor('#c3d1cb')
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
    write(field.landmark, x, y + 98, 11)
    block([field.fold, field.finish].join(' '), x, y + 104, w - x - 12, 8.3)
    doc.setFontSize(7.4)
    doc.setTextColor('#165765')
    doc.textWithLink(field.museum.label, x, y + 122, { url: field.museum.url })
    write(credit.creator, 12, y + 130, 8)
    doc.setFontSize(8)
    doc.setTextColor('#165765')
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
    write('OPEN FLIGHT   /   ' + plan.inspiration, 12, 13, 8.4)
    write(plan.name, 12, 24, 23)
    write(
      t('Folding guide', 'Как сложить', 'Guía de dobleces') + '  ' + (page + 1) + ' / ' + count,
      12,
      32,
      10,
    )
    const label =
      (plan.paper === 'A4' ? 'A4' : t('US Letter', 'US Letter', 'Carta')) +
      '   •   ' +
      plan.keel_mm +
      ' / ' +
      plan.winglet_mm +
      (ru ? ' мм' : ' mm')
    doc.setFontSize(8)
    doc.text(label, w - 12, 13, { align: 'right' })
    block(
      plan.trim_mm
        ? t(
            'For the model, print page 1, or pages 1–2 double-sided (flip on the long edge) to see the fold lines on both faces. Cut along the thick border, then fold. Any print scale works because the lines meet the border you cut.',
            'Для самолёта распечатайте страницу 1 или страницы 1–2 с двух сторон (переворот по длинному краю), чтобы линии были видны с обеих сторон. Вырежьте лист по толстой рамке и складывайте. Подойдёт любой масштаб печати: линии доходят до вырезанного края.',
            'Para el avión, imprime la página 1, o las páginas 1–2 a doble cara (girando por el borde largo) para ver las líneas en las dos caras. Recorta por el borde grueso y luego dobla. Sirve cualquier escala de impresión, porque las líneas llegan al borde que recortas.',
          )
        : t(
            'For the model, print page 1, or pages 1–2 double-sided (flip on the long edge) to see the fold lines on both faces. Actual size is best: the 20 mm line measures 20 mm. Fit to page also works; the line then measures about 19 mm, so fold to the paper edges.',
            'Для самолёта распечатайте страницу 1 или страницы 1–2 с двух сторон (переворот по длинному краю), чтобы линии были видны с обеих сторон. Лучше всего масштаб 100%: контрольная линия будет ровно 20 мм. «По размеру страницы» тоже подойдёт: линия будет около 19 мм, сгибайте по краям листа.',
            'Para el avión, imprime la página 1, o las páginas 1–2 a doble cara (girando por el borde largo) para ver las líneas en las dos caras. Lo mejor es el tamaño real: la línea mide 20 mm. «Ajustar a la página» también sirve; la línea medirá unos 19 mm, así que dobla siguiendo los bordes del papel.',
          ),
      12,
      38.5,
      w - 24,
      7.6,
    )
    const panels = plan.steps.slice(page * perPage, (page + 1) * perPage)
    const lane = (h - 72) / 3
    panels.forEach((step, i) => {
      const y = 51 + i * lane,
        picture = (w * 0.47) / 388,
        x = w * 0.505
      doc.setDrawColor('#c3d1cb')
      doc.setLineWidth(0.3)
      doc.line(12, y, w - 12, y)
      doc.setFillColor('#214a54')
      doc.circle(16, y + 7.5, 4, 'F')
      doc.setFontSize(10)
      doc.setTextColor('#ffffff')
      doc.text(String(step.index + 1), 16, y + 8.8, { align: 'center' })
      write(step.title, 23, y + 9, 12)
      draw(doc, foldScene(plan, step), [8, y + 14], picture)
      block(step.instruction, x, y + 22, w - x - 14, 9.3)
    })
    if (panels.length === 1) notebook(55 + lane)
    const footer = t(
      'Cream: print side  •  Mint: reverse  •  Orange: moving flap  •  Dashes: crease',
      'Кремовый: печать  •  Мятный: оборот  •  Оранжевый: клапан  •  Пунктир: сгиб',
      'Crema · cara impresa   /   Verde menta · reverso   /   Naranja · parte que se dobla   /   Rayas · doblez',
    )
    write(footer, 12, h - 12, 7.8)
    write('Open Flight  /  ' + plan.code + '  /  r' + plan.revision, 12, h - 7, 7.4, '#586e72')
  }
  if (plan.steps.length % perPage !== 1) {
    doc.addPage([w, h], 'portrait')
    write('OPEN FLIGHT  /  ' + plan.name, 12, 15, 10)
    notebook(30)
  }
  return new Uint8Array(doc.output('arraybuffer'))
}
