// Figures for Chapter 3 · Nature's flyers. Contract as in book/README.md, keyed by figure id:
// figure(id, lang), figureControls(id, lang), figureText(id, lang). Drawn like an architect's
// sheet: plan views, a dimension line and a title block. Dates are approximate and sourced in
// chapters/nature.js; the figures say so inside the drawing.
import { blue, dim, frame, ink, kite, line, muted, n, pale, poly, text, titleBlock } from './chapter-kit.js?v=7988ca7cb2ce'

const w = (en, es, ru) => ({ en, es, ru })
const say = (item, lang) => item[lang] ?? item.en

/** First fossil dates in million years ago (Mya), with the range the sources give. */
export const dates = [
  { id: 'insects', mya: 325, from: 325, name: w('Insects', 'Insectos', 'Насекомые'), label: w('about 325', 'hace unos 325', 'около 325'), row: 62, ends: 0 },
  { id: 'kin', mya: 300, from: 300, name: w('Dragonfly kin', 'Parientes de libélulas', 'Родня стрекоз'), label: w('about 300', 'hace unos 300', 'около 300'), row: 120, ends: 0 },
  { id: 'pterosaurs', mya: 228, from: 228, name: w('Pterosaurs', 'Pterosaurios', 'Птерозавры'), label: w('215 to 228, to 66', '215 a 228, hasta 66', '215–228, до 66'), row: 178, ends: 66 },
  { id: 'birds', mya: 150, from: 150, name: w('Birds: Archaeopteryx', 'Aves: Archaeopteryx', 'Птицы: археоптерикс'), label: w('about 150', 'hace unos 150', 'около 150'), row: 236, ends: 0 },
  { id: 'bats', mya: 52, from: 52, name: w('Bats', 'Murciélagos', 'Летучие мыши'), label: w('about 52', 'hace unos 52', 'около 52'), row: 294, ends: 0 },
]

const words = {
  unit: w('Million years ago (Mya)', 'Millones de años atrás (Ma)', 'Миллионы лет назад'),
  scale: w('100 million years', '100 millones de años', '100 миллионов лет'),
  honest: w('Dates are approximate, and sources differ.', 'Las fechas son aproximadas y las fuentes difieren.', 'Даты приблизительные, источники расходятся.'),
  seeds: w('Winged seeds: about 360 to 385, older still', 'Semillas con alas: unos 360 a 385, aún más antiguas', 'Крылатые семена: около 360–385, ещё древнее'),
  t1: w('First flyers, in time', 'Primeros voladores', 'Первые летуны'),
  t2: w('Plan · linear scale', 'Plano · escala lineal', 'План · линейный масштаб'),
  t3: w('Open Flight · ch. 3', 'Open Flight · cap. 3', 'Open Flight · гл. 3'),
  w1: w('Wings in plan', 'Alas en planta', 'Крылья в плане'),
  w2: w('Not to scale', 'Sin escala', 'Без масштаба'),
  w3: w('Open Flight · ch. 3', 'Open Flight · cap. 3', 'Open Flight · гл. 3'),
  span: w('Wingspan differs: sizes are not compared', 'La envergadura varía: no se comparan tamaños', 'Размах разный: размеры не сравниваются'),
  glide: w('Gliding only', 'Solo planea', 'Только планирует'),
}
const wingNames = [
  { name: w('Insect', 'Insecto', 'Насекомое'), how: [w('Four wings,', 'Cuatro alas,', 'Четыре крыла,'), w('each steered', 'cada una libre', 'управляемые')] },
  { name: w('Pterosaur', 'Pterosaurio', 'Птерозавр'), how: [w('One long', 'Un dedo', 'Один длинный'), w('finger', 'muy largo', 'палец')] },
  { name: w('Bird', 'Ave', 'Птица'), how: [w('Feathers', 'Plumas', 'Перья'), w('', '', '')] },
  { name: w('Bat', 'Murciélago', 'Летучая мышь'), how: [w('Four long', 'Cuatro dedos', 'Четыре длинных'), w('fingers', 'largos', 'пальца')] },
  { name: w('Paper butterfly', 'Mariposa de papel', 'Бумажная бабочка'), how: [w('One fixed', 'Una pieza', 'Одна неподвижная'), w('piece', 'fija', 'деталь')] },
]

const labels = {
  'nature-timeline': w('Timeline of the first flyers, drawn to a linear scale in millions of years', 'Cronología de los primeros voladores, a escala lineal en millones de años', 'Хронология первых летунов в линейном масштабе, в миллионах лет'),
  'nature-wings': w('Wings of an insect, a pterosaur, a bird, a bat and a paper butterfly, in plan', 'Alas de un insecto, un pterosaurio, un ave, un murciélago y una mariposa de papel, en planta', 'Крылья насекомого, птерозавра, птицы, летучей мыши и бумажной бабочки, вид сверху'),
}
export const figureIds = Object.keys(labels)

const x = (mya) => 540 - mya * 1.15

/** One wing in plan, left side; mirrored about cx for the right. */
function pair(points, cx, options) {
  const mirror = points.map(([px, py]) => [2 * cx - px, py])
  return poly(points, options) + poly(mirror, options)
}

const wings = [
  (cx) => pair([[cx - 4, 60], [cx - 52, 38], [cx - 54, 50], [cx - 5, 70]], cx, { fill: pale }) + pair([[cx - 4, 74], [cx - 50, 86], [cx - 46, 98], [cx - 5, 86]], cx, { fill: pale }),
  (cx) => pair([[cx - 5, 60], [cx - 52, 34], [cx - 44, 84], [cx - 6, 112]], cx, { fill: pale }) + line([[cx - 5, 60], [cx - 52, 34]], { width: 4 }) + line([[cx - 5, 60], [cx - 36, 62]], { width: 3 }),
  (cx) => pair([[cx - 5, 60], [cx - 52, 62], [cx - 54, 78], [cx - 44, 80], [cx - 40, 94], [cx - 28, 94], [cx - 22, 104], [cx - 6, 98]], cx, { fill: pale }) + line([[cx - 5, 62], [cx - 50, 64]], { width: 3 }),
  (cx) => pair([[cx - 5, 100], [cx - 24, 60], [cx - 56, 44], [cx - 52, 64], [cx - 54, 84], [cx - 44, 100], [cx - 36, 118]], cx, { fill: pale }) + [[-56, 44], [-52, 64], [-54, 84], [-44, 100]].map(([dx, dy]) => line([[cx - 24, 60], [cx + dx, dy]], { width: 2 }) + line([[cx + 24, 60], [cx - dx, dy]], { width: 2 })).join(''),
  (cx) => pair([[cx - 4, 70], [cx - 48, 42], [cx - 52, 78], [cx - 4, 84]], cx, { fill: pale }) + pair([[cx - 4, 86], [cx - 36, 94], [cx - 28, 118], [cx - 4, 98]], cx, { fill: pale }),
]

const draw = {
  'nature-timeline'(lang) {
    const rows = dates.map((d) => {
      const x0 = x(d.from), x1 = x(d.ends), end = x0 > 400
      return text(end ? 546 : x0, d.row - 14, say(d.name, lang), { weight: 700, anchor: end ? 'end' : 'start' }) +
        line([[x0, d.row], [x1, d.row]], { stroke: d.id === 'pterosaurs' ? blue : ink, width: 5 }) +
        `<circle cx="${n(x0)}" cy="${d.row}" r="7" fill="${kite}"/>` +
        text(end ? 546 : x0, d.row + 26, say(d.label, lang), { fill: muted, anchor: end ? 'end' : 'start' })
    }).join('')
    const ticks = [0, 100, 200, 300].map((m) => line([[x(m), 346], [x(m), 356]], { stroke: ink, width: 2 }) + text(x(m), 378, String(m), { anchor: 'middle', fill: muted })).join('')
    return rows + line([[x(330), 350], [x(0), 350]], { stroke: ink, width: 2 }) + ticks +
      dim(x(100), x(0), 402, say(words.scale, lang), { above: false }) +
      text(14, 430, say(words.honest, lang), { fill: muted }) + text(14, 454, say(words.seeds, lang), { fill: muted }) +
      text(14, 408, say(words.unit, lang), { fill: muted }) +
      titleBlock(546, 540, 250, [say(words.t1, lang), say(words.t2, lang), say(words.t3, lang)])
  },
  'nature-wings'(lang) {
    const cols = [70, 210, 350, 490]
    const label = (cx, i, anchor = 'middle', y = 150) => text(cx, y, say(wingNames[i].name, lang), { anchor, weight: 700 }) + text(cx, y + 22, say(wingNames[i].how[0], lang), { anchor, fill: muted }) + (say(wingNames[i].how[1], lang) ? text(cx, y + 42, say(wingNames[i].how[1], lang), { anchor, fill: muted }) : '')
    const row = cols.map((cx, i) => wings[i](cx) + line([[cx, 46], [cx, 120]], { width: 5 }) + label(cx, i)).join('')
    const paper = `<g transform="translate(0,250)">${wings[4](70)}${line([[70, 46], [70, 120]], { width: 5 })}</g>` + label(130, 4, 'start', 290) + text(130, 354, say(words.glide, lang), { fill: kite, weight: 700 })
    return row + paper + line([[14, 238], [546, 238]], { stroke: muted, width: 1.5, dash: '6 5' }) + text(546, 226, say(words.span, lang), { anchor: 'end', fill: muted }) +
      titleBlock(546, 384, 220, [say(words.w1, lang), say(words.w2, lang), say(words.w3, lang)])
  },
}
const sizes = { 'nature-timeline': [560, 550], 'nature-wings': [560, 396] }

export function figure(id, lang = 'en') {
  if (!draw[id]) throw new RangeError('No chapter figure ' + id)
  const [width, height] = sizes[id]
  return frame(id, lang, width, height, say(labels[id], lang), draw[id](lang))
}
export const figureControls = () => []
export function figureText(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  if (id === 'nature-wings') return say(labels[id], lang) + ': ' + wingNames.map((item) => say(item.name, lang) + ', ' + item.how.map((h) => say(h, lang)).join(' ').trim()).join('; ') + '. ' + say(words.w2, lang) + '.'
  return say(labels[id], lang) + ': ' + dates.map((d) => say(d.name, lang) + ' ' + say(d.label, lang)).join('; ') + '. ' + say(words.honest, lang) + ' ' + say(words.seeds, lang) + '.'
}
