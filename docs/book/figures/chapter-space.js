// Figures for Chapter 8 · Beyond the sky: a re-entry glide in section view, and Mars against
// Earth as two pairs of columns (air density, gravity). Drawn like an architect's sheet with
// dimension lines and a title block. Values come from chapters/space.js (NASA Mars fact sheet,
// NASA Glenn); the density is an estimate and the figure says so inside the drawing.
import { arrow, frame, gliderSide, ink, kite, line, muted, n, text, titleBlock } from './chapter-kit.js?v=2807f4a798d5'

const w = (en, es, ru) => ({ en, es, ru })
const say = (item, lang) => item[lang] ?? item.en

/** Values as sourced: air density in kg/m³ and gravity in m/s². */
export const values = { density: { earth: 1.229, mars: 0.016 }, gravity: { earth: 9.81, mars: 3.73 } }

const words = {
  orbit: w('Orbit', 'Órbita', 'Орбита'),
  re1: w('Re-entry:', 'Reentrada:', 'Вход в воздух:'),
  re2: w('air slows it', 'el aire frena', 'воздух тормозит'),
  glide: w('Unpowered glide', 'Planeo sin motor', 'Планирование без тяги'),
  runway: w('Runway', 'Pista', 'Полоса'),
  karman: w('100 km · Kármán line (FAI)', '100 km · línea de Kármán (FAI)', '100 км · линия Кармана (FAI)'),
  us: w('80 km · US line', '80 km · línea de EE. UU.', '80 км · линия США'),
  t1: w('Re-entry glide', 'Planeo de reentrada', 'Спуск на планировании'),
  t2: w('Section · not to scale', 'Sección · sin escala', 'Разрез · без масштаба'),
  t3: w('Open Flight · ch. 8', 'Open Flight · cap. 8', 'Open Flight · гл. 8'),
  dens: w('Air density, kg/m³', 'Densidad del aire, kg/m³', 'Плотность воздуха, кг/м³'),
  grav: w('Gravity, m/s²', 'Gravedad, m/s²', 'Сила тяжести, м/с²'),
  earth: w('Earth', 'Tierra', 'Земля'),
  mars: w('Mars', 'Marte', 'Марс'),
  d1: w('Mars air: 0.016 ± 0.006, an estimate.', 'Aire de Marte: 0,016 ± 0,006, una estimación.', 'Воздух Марса: 0,016 ± 0,006, оценка.'),
  d2: w('Same scale in each pair.', 'Misma escala en cada pareja.', 'Один масштаб в каждой паре.'),
  t4: w('Mars against Earth', 'Marte frente a la Tierra', 'Марс и Земля'),
  t5: w('Columns · linear scale', 'Columnas · escala lineal', 'Столбцы · линейный масштаб'),
}
const labels = {
  'space-reentry': w('A re-entry glide in section view, from orbit through the Kármán line to a runway, with no engine', 'Un planeo de reentrada en sección, desde la órbita, a través de la línea de Kármán, hasta una pista, sin motor', 'Планирование при возвращении, вид в разрезе: с орбиты через линию Кармана к полосе, без двигателя'),
  'space-density': w('Mars against Earth as two pairs of columns: air density about 1.3 per cent, gravity about 38 per cent', 'Marte frente a la Tierra en dos parejas de columnas: densidad del aire cerca del 1,3 por ciento, gravedad cerca del 38 por ciento', 'Марс и Земля двумя парами столбцов: плотность воздуха около 1,3 процента, сила тяжести около 38 процентов'),
}
export const figureIds = Object.keys(labels)

const num = (value, lang) => (lang === 'en' ? String(value) : String(value).replace('.', ','))

const draw = {
  'space-reentry'(lang) {
    const path = [[40, 36], [110, 66], [170, 110], [230, 160], [300, 205], [380, 248], [460, 282], [500, 296]]
    return line([[20, 300], [540, 300]], { width: 3 }) + line([[56, 70], [346, 70]], { stroke: muted, width: 1.5, dash: '8 6' }) + line([[56, 116], [346, 116]], { stroke: muted, width: 1.5, dash: '8 6' }) +
      text(346, 62, say(words.karman, lang), { anchor: 'end', fill: muted }) + text(346, 108, say(words.us, lang), { anchor: 'end', fill: muted }) +
      line(path, { stroke: kite, width: 4, dash: '10 6' }) + arrow([456, 280], [500, 296], { stroke: kite, width: 4 }) +
      gliderSide(262, 177, 54, 33) +
      text(48, 24, say(words.orbit, lang), { weight: 700 }) +
      text(30, 150, say(words.re1, lang), { weight: 700 }) + text(30, 172, say(words.re2, lang), { fill: muted }) +
      text(130, 262, say(words.glide, lang), { weight: 700 }) + text(20, 326, say(words.runway, lang), { fill: muted }) +
      titleBlock(546, 404, 250, [say(words.t1, lang), say(words.t2, lang), say(words.t3, lang)])
  },
  'space-density'(lang) {
    const base = 240, full = 160, column = (x, height, fill) => `<rect x="${x}" y="${n(base - height)}" width="60" height="${n(Math.max(height, 2.1))}" fill="${fill}" stroke="${ink}" stroke-width="1.5"/>`
    const { density: d, gravity: g } = values
    const mars = (full * d.mars) / d.earth, marsG = (full * g.mars) / g.earth
    const pct = (a, b) => num(+(a / b * 100).toFixed(a / b < 0.1 ? 1 : 0), lang)
    return text(60, 36, say(words.dens, lang), { weight: 700 }) + text(340, 36, say(words.grav, lang), { weight: 700 }) +
      line([[56, base], [220, base]], { width: 2 }) + line([[336, base], [500, base]], { width: 2 }) +
      line([[56, base - full], [220, base - full]], { stroke: muted, width: 1.5, dash: '6 5' }) + line([[336, base - full], [500, base - full]], { stroke: muted, width: 1.5, dash: '6 5' }) +
      column(60, full, 'none') + column(160, mars, kite) + column(340, full, 'none') + column(440, marsG, kite) +
      text(90, base - full - 10, num(d.earth, lang), { anchor: 'middle', weight: 700 }) + text(190, base - mars - 40, num(d.mars, lang), { anchor: 'middle', weight: 700 }) + text(190, base - mars - 16, pct(d.mars, d.earth) + ' %', { anchor: 'middle', fill: kite, weight: 700 }) +
      text(370, base - full - 10, num(g.earth, lang), { anchor: 'middle', weight: 700 }) + text(470, base - marsG - 40, num(g.mars, lang), { anchor: 'middle', weight: 700 }) + text(470, base - marsG - 16, pct(g.mars, g.earth) + ' %', { anchor: 'middle', fill: kite, weight: 700 }) +
      [90, 190, 370, 470].map((cx, i) => text(cx, base + 26, say(i % 2 ? words.mars : words.earth, lang), { anchor: 'middle' })).join('') +
      text(14, 312, say(words.d1, lang), { fill: muted }) + text(14, 334, say(words.d2, lang), { fill: muted }) +
      titleBlock(546, 384, 220, [say(words.t4, lang), say(words.t5, lang), say(words.t3, lang)])
  },
}
const sizes = { 'space-reentry': [560, 412], 'space-density': [560, 392] }

export function figure(id, lang = 'en') {
  if (!draw[id]) throw new RangeError('No chapter figure ' + id)
  const [width, height] = sizes[id]
  return frame(id, lang, width, height, say(labels[id], lang), draw[id](lang))
}
export const figureControls = () => []
export function figureText(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  if (id === 'space-density') {
    const { density: d, gravity: g } = values
    return say(labels[id], lang) + ': ' + say(words.dens, lang) + ' ' + num(d.earth, lang) + ' / ' + num(d.mars, lang) + '; ' + say(words.grav, lang) + ' ' + num(g.earth, lang) + ' / ' + num(g.mars, lang) + '. ' + say(words.d1, lang)
  }
  return say(labels[id], lang) + '. ' + say(words.karman, lang) + '; ' + say(words.us, lang) + '. ' + say(words.t2, lang) + '.'
}
