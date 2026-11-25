import { aircraftPortrait } from './field-portraits.js?v=51d4970dfb40'
import { esc, svgParts, specimenScene } from './drawing.js?v=51d4970dfb40'
import { planeCredits, creditText } from './credits.js?v=51d4970dfb40'
import { color } from '../brand/tokens.js?v=51d4970dfb40'
// Faces of the sheet, told apart by lightness: white front, pale reverse, shaded moving flap.
const ink = color.diagramInk,
  printed = color.diagramFront,
  back = color.diagramBack,
  active = color.diagramMoving,
  arrow = color.diagramArrow
const line = (points, stroke, sw = 1.5, dash) => ({
  type: 'polyline',
  points,
  stroke,
  sw,
  dash,
  fill: 'none',
})
const poly = (points, fill, stroke = ink, sw = 1) => ({
  type: 'polygon',
  points,
  stroke,
  sw,
  fill,
})
const text = (pos, value, size, color = ink, anchor = 'start') => ({
  type: 'text',
  pos,
  value,
  size,
  color,
  anchor,
})
function addArrow(parts, start, end) {
  const dx = end[0] - start[0],
    dy = end[1] - start[1],
    d = Math.hypot(dx, dy)
  if (d < 4) return
  const ux = dx / d,
    uy = dy / d,
    mid = [(end[0] + start[0]) / 2 + uy * 5, (end[1] + start[1]) / 2 - ux * 5]
  parts.push(
    line([start, mid, end], arrow, 2.4),
    poly(
      [
        end,
        [end[0] - ux * 7 + uy * 3.5, end[1] - uy * 7 - ux * 3.5],
        [end[0] - ux * 7 - uy * 3.5, end[1] - uy * 7 + ux * 3.5],
      ],
      arrow,
      arrow,
      0.5,
    ),
  )
}
function faceScene(parts, panels, map) {
  for (const p of panels) parts.push(poly(p.polygon.map(map), p.face === 'front' ? printed : back))
}
function drawFrame(parts, frame, before, pos) {
  const map = ([x, y]) => [pos + (x - frame.width / 2) * 0.54, 28 + y * 0.54]
  faceScene(parts, before ? frame.before : frame.panels, map)
  if (!before) return
  const arrows = new Map()
  for (const move of frame.moves) {
    parts.push(poly(move.from.map(map), active, ink, 0.7))
    const [a, b] = move.hinge
    const axis = [b[0] - a[0], b[1] - a[1]]
    const hits = move.from.filter((p) => Math.abs(axis[0] * (p[1] - a[1]) - axis[1] * (p[0] - a[0])) < 0.015)
    if (hits.length >= 2) {
      const order = hits.sort((p, q) => (p[0] - q[0]) * axis[0] + (p[1] - q[1]) * axis[1])
      parts.push(line([map(order[0]), map(order.at(-1))], ink, 1.65, [4.4, 2.3]))
    }
    const key = move.hinge
      .flat()
      .map((v) => v.toFixed(2))
      .join(',')
    let best = arrows.get(key)
    move.from.forEach((p, i) => {
      const q = move.to[i],
        d = Math.hypot(q[0] - p[0], q[1] - p[1])
      if (!best || d > best.d) best = { p, q, d }
    })
    arrows.set(key, best)
  }
  for (const { p, q } of arrows.values()) {
    const between = (f) => map([p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f])
    addArrow(parts, between(0.13), between(0.82))
  }
}
function rearSection(plan, end) {
  const parts = [],
    centre = 194,
    base = 117,
    span = 137,
    k = plan.keel_mm * 1.4
  const rise = end ? 13 : 0,
    tips = end ? plan.winglet_mm * 1.9 : 0
  for (const side of [-1, 1]) {
    const x = centre + side * span,
      root = centre + side * 3,
      wing = base - rise
    const shape = [
      [centre, base + k],
      [root, base - 1.8],
      [x, wing - 2],
      [x, wing - tips],
      [x + side * 2, wing - tips],
      [x + side * 2, wing + 2],
      [root, base + 2],
      [centre + side, base + k],
    ]
    parts.push(poly(shape, side > 0 ? active : printed, ink, 1.65))
    if (end && tips) addArrow(parts, [x - side * 12, wing + 13], [x - side * 5, wing - tips + 2])
  }
  const ru = plan.locale === 'ru'
  parts.push(
    text(
      [centre, 179],
      { en: 'TAIL VIEW', ru: 'ВИД С ХВОСТА', es: 'VISTA DESDE LA COLA' }[plan.locale],
      9.5,
      ink,
      'middle',
    ),
    text([centre + 10, base + k - 2], plan.keel_mm + (ru ? ' мм' : ' mm'), 10),
  )
  if (end && tips)
    parts.push(text([55, base - rise - tips - 8], plan.winglet_mm + (ru ? ' мм' : ' mm'), 10, ink, 'middle'))
  return parts
}
export function foldScene(plan, step) {
  const ru = plan.locale === 'ru',
    frame = step.frame,
    parts = []
  if (frame.kind === 'wings') {
    const spine = frame.width / 2,
      height = frame.height
    const map = ([x, y]) => [108 + (x - spine) * 0.47, 28 + y * 0.47]
    const closed = plan.steps[plan.rootStep - 1].frame
    faceScene(parts, closed.panels, map)
    const x = spine - plan.keel_mm
    const crossings = []
    for (let i = 0; i < closed.outline.length; i++) {
      const a = closed.outline[i],
        b = closed.outline[(i + 1) % closed.outline.length]
      if ((a[0] - x) * (b[0] - x) <= 0 && Math.abs(a[0] - b[0]) > 0.001)
        crossings.push(a[1] + ((x - a[0]) / (b[0] - a[0])) * (b[1] - a[1]))
    }
    if (crossings.length)
      parts.push(line([map([x, Math.min(...crossings)]), map([x, height])], ink, 1.7, [4, 2.3]))
    addArrow(parts, map([spine * 0.45, height * 0.72]), map([spine + 18, height * 0.72]))
    parts.push(
      text(
        [93, 17],
        {
          en: 'ONE WING AT A TIME',
          ru: 'ПО ОДНОМУ КРЫЛУ',
          es: 'UN ALA A LA VEZ',
        }[plan.locale],
        10,
        ink,
        'middle',
      ),
      text(
        [91, 185],
        plan.keel_mm +
          {
            en: ' mm from spine',
            ru: ' мм от сгиба',
            es: ' mm desde el centro',
          }[plan.locale],
        10,
        ink,
        'middle',
      ),
    )
    addArrow(parts, [149, 104], [178, 104])
    const section = rearSection(plan, false).map((e) => {
      const shift = ([px, py]) => [185 + px * 0.5, 48 + py * 0.5]
      return e.type === 'text'
        ? { ...e, pos: shift(e.pos), size: e.size * 0.9 }
        : { ...e, points: e.points.map(shift) }
    })
    return [...parts, ...section]
  }
  if (frame.kind === 'tips') {
    parts.push(
      text(
        [194, 18],
        {
          en: 'Match the height of both tips',
          ru: 'Высота законцовок должна совпадать',
          es: 'Iguala la altura de los extremos',
        }[plan.locale],
        12,
        ink,
        'middle',
      ),
    )
    return [...parts, ...rearSection(plan, true)]
  }
  parts.push(
    text([98, 17], { en: 'FOLD', ru: 'СЛОЖИТЕ', es: 'DOBLA' }[plan.locale], 10, ink, 'middle'),
    text(
      [291, 17],
      frame.reopen
        ? { en: 'REOPEN', ru: 'РАСКРОЙТЕ', es: 'ABRE' }[plan.locale]
        : { en: 'CHECK', ru: 'ПРОВЕРЬТЕ', es: 'COMPRUEBA' }[plan.locale],
      10,
      ink,
      'middle',
    ),
  )
  drawFrame(parts, frame, true, 98)
  addArrow(parts, [177, 104], [207, 104])
  drawFrame(parts, frame, false, 291)
  if (frame.reopen)
    parts.push(
      line(
        [
          [291, 28],
          [291, 28 + frame.height * 0.54],
        ],
        ink,
        1.1,
        [4, 3],
      ),
    )
  return parts
}
export function foldSvg(plan, step) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 198" role="img"><title>' +
    esc(step.title) +
    '</title><desc>' +
    esc(step.instruction) +
    '</desc>' +
    svgParts(foldScene(plan, step)) +
    '</svg>'
  )
}
export function planeGuide(plan) {
  const credit = creditText(plan.locale)
  const t = (en, ruText, es) => ({ en, ru: ruText, es })[plan.locale]
  const { field } = plan
  const tiles = plan.steps
    .map(
      (s) =>
        '<article><h2><span>' +
        (s.index + 1) +
        '</span> ' +
        esc(s.title) +
        '</h2>' +
        foldSvg(plan, s) +
        '<p>' +
        esc(s.instruction) +
        '</p></article>',
    )
    .join('')
  return (
    '<!doctype html><html lang="' +
    plan.locale +
    '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' +
    esc(plan.name) +
    ' · Open Flight</title><style>*{box-sizing:border-box}body{background:#faf7ed;color:#213b44;font:16px/1.5 system-ui,sans-serif;max-width:1030px;margin:auto;padding:24px}header,article,footer{background:#fffefa;border:1px solid #b8c9c7;border-radius:14px;padding:18px}header{display:grid;grid-template-columns:1fr 30%;gap:12px;align-items:center}h1{margin:0;font-size:clamp(2rem,6vw,3.7rem);line-height:1}h2{font-size:1.1em;margin:0}h2 span{display:inline-block;text-align:center;background:#204650;border-radius:50%;color:white;width:1.65em}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:12px;margin:14px 0}article{break-inside:avoid}article p{margin:0}svg{display:block;width:100%}.field{display:grid;grid-template-columns:34% 1fr;gap:16px;align-items:start;margin-top:20px}.field img{width:100%;height:auto;border-radius:6px}.field p{margin:.35em 0}@media(max-width:550px){.field{grid-template-columns:1fr}.field img{max-width:470px}}footer a{color:#18546b;overflow-wrap:anywhere}small{color:#475e64} @media print{body{padding:0;background:white;font-size:9pt}header,article,footer{padding:7px}section{grid-template-columns:1fr 1fr}h1{font-size:24pt}article svg{height:32mm}a{color:black}footer{break-inside:avoid}}</style><header><div><small>OPEN FLIGHT / ' +
    esc(plan.inspiration) +
    '</small><h1>' +
    esc(plan.name) +
    '</h1><p>' +
    esc(
      t(
        'One full sheet. Print the matching template at actual size. Check its 50 mm line with a ruler.',
        'Один целый лист. Распечатайте шаблон в масштабе 100%. Измерьте линейкой контрольные 50 мм.',
        'Una hoja entera. Imprime la plantilla correspondiente a tamaño real. Comprueba con una regla que la línea mide 50 mm.',
      ),
    ) +
    '</p><small>' +
    esc(
      t(
        'White = printed face · pale = reverse · shaded = flap that moves · dashed = crease.',
        'Белое — сторона с печатью, светлое — оборот, тёмное — подвижный клапан, пунктир — сгиб.',
        'Blanco · cara impresa. Claro · reverso. Sombreado · parte que se dobla. Línea de trazos · doblez.',
      ),
    ) +
    '</small></div><svg viewBox="0 0 420 222" role="img" aria-label="' +
    esc(plan.name) +
    '">' +
    svgParts(specimenScene(plan)) +
    '</svg></header><section>' +
    tiles +
    '</section><footer><h2>' +
    esc(t('Try a flight', 'Пробный полёт', 'Prueba de vuelo')) +
    '</h2><p>' +
    esc(
      t(
        'Hold the body near the front and launch gently and level into clear space.',
        'Возьмитесь за корпус ближе к носу. Мягко запустите самолёт горизонтально в свободное пространство.',
        'Sujeta el cuerpo cerca de la punta y lanza suavemente, a nivel y hacia un espacio despejado.',
      ),
    ) +
    '</p><p>' +
    esc(plan.experiment) +
    '</p><p>' +
    esc(plan.history) +
    '</p><div class="field"><img width="470" height="210" src="' +
    aircraftPortrait(plan.model_id) +
    '" alt="' +
    esc(field.variant + ' · ' + field.landmark) +
    '"><div><h2>' +
    esc(field.landmark) +
    '</h2><p>' +
    esc([field.look, field.fold, field.finish].join(' ')) +
    '</p><p><a href="' +
    esc(plan.field.museum.url) +
    '">' +
    esc(plan.field.museum.label) +
    '</a>' +
    (plan.field.museum.url === plan.reference.url
      ? ''
      : ' · <a href="' + esc(plan.reference.url) + '">' + esc(plan.reference.label) + '</a>') +
    '</p></div></div><p><small>' +
    esc(credit.creator) +
    ' · <a href="' +
    planeCredits.geometry.url +
    '">' +
    esc(credit.geometry) +
    '</a> · <a href="' +
    planeCredits.artwork.url +
    '">' +
    esc(credit.artwork) +
    '</a><br><a href="' +
    planeCredits.url +
    '">' +
    esc(credit.credits) +
    '</a></small></p></footer></html>'
  )
}
