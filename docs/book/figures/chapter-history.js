// Figure for Chapter 7 · A short history of flight: the chapter's dates on one axis, drawn
// like a plan with a numbered schedule below. From 1780 the scale is linear (2 units per
// year); the two oldest dates sit before an axis break. Dates come from chapters/history.js.
import { blue, dim, frame, ink, kite, line, muted, n, sheet, text, titleBlock } from './chapter-kit.js?v=7988ca7cb2ce'

const w = (en, es, ru) => ({ en, es, ru })
const say = (item, lang) => item[lang] ?? item.en

const year = (y) => 150 + (y - 1780) * 2
/** `x` is the position on the axis; `y` the height of the numbered marker. */
const events = [
  { n: 1, x: 40, y: 76, when: w('5th c. BCE', 's. V a. C.', 'V в. до н. э.'), name: w('Kites in China', 'Cometas en China', 'Змеи в Китае') },
  { n: 2, x: 90, y: 76, when: w('c. 1505', 'h. 1505', 'ок. 1505'), name: w('Leonardo’s bird codex', 'Códice de Leonardo', 'Кодекс Леонардо') },
  { n: 3, x: year(1783), y: 76, when: w('1783', '1783', '1783'), name: w('Montgolfier balloon', 'Globo Montgolfier', 'Шар Монгольфье') },
  { n: 4, x: year(1799), y: 76, when: w('1799', '1799', '1799'), name: w('Cayley’s silver disc', 'Disco de Cayley', 'Диск Кейли') },
  { n: 5, x: year(1853), y: 76, when: w('1853', '1853', '1853'), name: w('Cayley’s glider', 'Planeador de Cayley', 'Планёр Кейли') },
  { n: 6, x: year(1893.5), y: 76, when: w('1891–96', '1891–96', '1891–96'), name: w('Lilienthal’s glides', 'Planeos de Lilienthal', 'Полёты Лилиенталя') },
  { n: 7, x: year(1903), y: 44, when: w('1903', '1903', '1903'), name: w('Wright Flyer', 'Wright Flyer', '«Флайер» Райтов') },
  { n: 8, x: year(1967), y: 76, when: w('1967', '1967', '1967'), name: w('Paper plane contest', 'Concurso de aviones de papel', 'Конкурс бумажных самолётов') },
]
const words = {
  scale: w('50 years', '50 años', '50 лет'),
  honest1: w('Dates follow the sources.', 'Las fechas siguen las fuentes.', 'Даты даны по источникам.'),
  honest2: w('The two oldest are uncertain.', 'Las dos más antiguas son inciertas.', 'Две самые древние неточны.'),
  t1: w('Dates of flight', 'Fechas del vuelo', 'Даты полёта'),
  t2: w('Linear from 1780', 'Lineal desde 1780', 'Линейно с 1780'),
  t3: w('Open Flight · ch. 7', 'Open Flight · cap. 7', 'Open Flight · гл. 7'),
}
const labels = {
  'history-timeline': w('Timeline of flight from kites to the 1967 paper plane contest, with the oldest dates before an axis break', 'Cronología del vuelo, de las cometas al concurso de aviones de papel de 1967, con las fechas más antiguas antes de un corte del eje', 'Хронология полёта от змеев до конкурса бумажных самолётов 1967 года, самые древние даты — до разрыва оси'),
}
export const figureIds = Object.keys(labels)

const marker = (e) => line([[e.x, e.y + 11], [e.x, 110]], { stroke: muted, width: 1.5 }) +
  `<circle cx="${n(e.x)}" cy="${e.y}" r="11" fill="${sheet}" stroke="${ink}" stroke-width="2"/>` + text(e.x, e.y + 6, String(e.n), { anchor: 'middle', weight: 700 })

function draw(lang) {
  const ticks = [1800, 1850, 1900, 1950].map((y) => line([[year(y), 110], [year(y), 120]], { stroke: ink, width: 2 }) + text(year(y), 142, String(y), { anchor: 'middle', fill: muted })).join('')
  const rows = events.map((e, i) => {
    const y = 232 + i * 26
    return `<circle cx="24" cy="${y - 5}" r="10" fill="${sheet}" stroke="${ink}" stroke-width="2"/>` + text(24, y, String(e.n), { anchor: 'middle', weight: 700 }) +
      text(46, y, say(e.when, lang), { weight: 700, fill: blue }) + text(172, y, say(e.name, lang), {})
  }).join('')
  return line([[20, 110], [112, 110]], { width: 3 }) + line([[118, 100], [124, 120]], { width: 2 }) + line([[128, 100], [134, 120]], { width: 2 }) +
    line([[140, 110], [540, 110]], { width: 3 }) + line([[year(1891), 110], [year(1896), 110]], { stroke: kite, width: 8 }) + ticks +
    events.map(marker).join('') +
    dim(year(1900), year(1950), 166, say(words.scale, lang), { above: false }) + rows +
    text(14, 456, say(words.honest1, lang), { fill: muted }) + text(14, 478, say(words.honest2, lang), { fill: muted }) +
    titleBlock(546, 500, 190, [say(words.t1, lang), say(words.t2, lang), say(words.t3, lang)])
}

export function figure(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  return frame(id, lang, 560, 508, say(labels[id], lang), draw(lang))
}
export const figureControls = () => []
export function figureText(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  return say(labels[id], lang) + ': ' + events.map((e) => e.n + ', ' + say(e.when, lang) + ', ' + say(e.name, lang)).join('; ') + '. ' + say(words.honest1, lang) + ' ' + say(words.honest2, lang)
}
