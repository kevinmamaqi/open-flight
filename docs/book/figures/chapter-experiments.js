// Figures for Chapter 7 · The flight lab. Both are diagrams of the method: the marks are
// placed by a fixed pattern, not taken from launches, and each figure says so inside it.
import { blue, frame, ink, kite, line, muted, poly, text } from './chapter-kit.js?v=eb901ca27c79'

const w = (en, es, ru) => ({ en, es, ru })
const words = {
  spot: w('Same spot', 'Mismo sitio', 'То же место'),
  a: w('Setup A', 'Configuración A', 'Настройка A'),
  b: w('Setup B: one change', 'Configuración B: un cambio', 'Настройка B: одно изменение'),
  middle: w('Middle of five', 'Valor central de cinco', 'Средний из пяти'),
  method: w('Method diagram: not real launches', 'Diagrama del método: no son lanzamientos reales', 'Схема метода, а не настоящие запуски'),
  distance: w('Distance', 'Distancia', 'Дальность'),
}
const labels = {
  'fair-test': w('A fair test: two setups, five launches each', 'Una prueba justa: dos configuraciones, cinco lanzamientos cada una', 'Честный опыт: две настройки, по пять запусков'),
  results: w('Comparing two setups by their middle results', 'Comparar dos configuraciones por su valor central', 'Сравнение двух настроек по средним результатам'),
}
export const figureIds = Object.keys(labels)
const say = (key, lang) => words[key][lang] ?? words[key].en

// A fixed pattern of landing marks, in units along the floor. Not data.
const patternA = [300, 330, 352, 372, 404]
const patternB = [348, 380, 400, 418, 452]
const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="${blue}"/>`
const cross = (x, y) => line([[x - 7, y - 7], [x + 7, y + 7]], { stroke: kite, width: 3 }) + line([[x - 7, y + 7], [x + 7, y - 7]], { stroke: kite, width: 3 })
const ring = (x, y) => `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="${ink}" stroke-width="2"/>`

const draw = {
  'fair-test'(lang) {
    const spot = [60, 120]
    const marks = (list, y, mark) => list.map((x) => line([spot, [x, y]], { stroke: muted, width: 1.5, dash: '4 6' }) + mark(x, y)).join('')
    return poly([[spot[0] - 12, spot[1] - 12], [spot[0] + 12, spot[1] - 12], [spot[0] + 12, spot[1] + 12], [spot[0] - 12, spot[1] + 12]], { fill: ink }) +
      text(spot[0], spot[1] + 40, say('spot', lang), { anchor: 'middle' }) +
      marks(patternA, 62, dot) + ring(patternA[2], 62) + text(470, 68, say('a', lang), { fill: blue }) +
      marks(patternB, 178, cross) + ring(patternB[2], 178) + text(470, 184, say('b', lang), { fill: kite }) +
      text(352, 30, say('middle', lang), { anchor: 'middle' }) +
      text(540, 232, say('method', lang), { anchor: 'end', fill: muted })
  },
  results(lang) {
    const y = 120, x = (v) => 40 + (v - 280) * 2.6
    return line([[30, y], [530, y]], { width: 3 }) + text(530, y + 30, say('distance', lang) + ' →', { anchor: 'end', fill: muted }) +
      patternA.map((v) => dot(x(v), y - 30)).join('') + ring(x(patternA[2]), y - 30) + text(x(patternA[0]), y - 56, say('a', lang), { fill: blue }) +
      patternB.map((v) => cross(x(v), y + 30)).join('') + ring(x(patternB[2]), y + 30) + text(x(patternB[0]), y + 70, say('b', lang), { fill: kite }) +
      text(540, 222, say('method', lang), { anchor: 'end', fill: muted })
  },
}
const sizes = { 'fair-test': 244, results: 236 }

export function figure(id, lang = 'en') {
  if (!draw[id]) throw new RangeError('No chapter figure ' + id)
  return frame(id, lang, 560, sizes[id], labels[id][lang] ?? labels[id].en, draw[id](lang))
}
export const figureControls = () => []
export function figureText(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  return (labels[id][lang] ?? labels[id].en) + '. ' + say('method', lang) + '.'
}
