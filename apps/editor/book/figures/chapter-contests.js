// Figures for Chapter 6 · Contests and records: the records drawn to scale from
// chapters/contests.js. records-distance is 696 units wide at 4 units per metre, so
// placed 174 mm wide in the book it is exactly 1:1000 (1 mm on the page = 1 m).
// The "as of" date is drawn inside each figure.
import { records } from '../chapters/contests.js'
import { blue, frame, ink, kite, line, muted, n, text } from './chapter-kit.js'

const w = (en, es, ru) => ({ en, es, ru })
const words = {
  asOf: w('Guinness World Records, as of ', 'Guinness World Records, a ', 'Guinness World Records, на '),
  yours: w('Your measurement', 'Tu medida', 'Ваш результат'),
  m: w('m', 'm', 'м'),
  s: w('s', 's', 'с'),
  bar: w('10 m', '10 m', '10 м'),
}
const labels = {
  'records-distance': w('Paper airplane distance records drawn to scale', 'Récords de distancia de aviones de papel a escala', 'Рекорды дальности бумажных самолётов в масштабе'),
  'records-time': w('Paper airplane time-aloft records on a seconds axis', 'Récords de tiempo de vuelo en un eje de segundos', 'Рекорды времени полёта на шкале секунд'),
}
export const figureIds = Object.keys(labels)

const say = (key, lang) => words[key][lang] ?? words[key].en
const number = (value, lang) => (lang === 'en' ? String(value) : String(value).replace('.', ','))
const year = (date) => date.slice(0, 4)
const day = (date, lang) => {
  const [y, m, d] = date.split('-').map(Number)
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d))
}

function rows(list, lang, { x0, unit, step, top, suffix }) {
  return list.map((r, i) => {
    const y = top + i * step, end = x0 + r.value * unit
    const stroke = r.current ? kite : ink
    return text(x0 - 12, y + 6, year(r.date), { anchor: 'end', fill: muted }) +
      line([[x0, y], [end, y]], { stroke, width: r.current ? 6 : 4 }) +
      text(end + 8, y + 6, number(r.value, lang) + ' ' + say(suffix, lang), { weight: r.current ? 700 : 400, fill: stroke })
  }).join('')
}

const draw = {
  'records-distance'(lang) {
    const x0 = 64, unit = 4, step = 34, top = 34, list = records.distance
    const yours = top + list.length * step
    const ticks = [0, 25, 50, 75, 100].map((m) => line([[x0 + m * unit, yours + 26], [x0 + m * unit, yours + 34]], { stroke: muted, width: 2 }) + text(x0 + m * unit, yours + 54, m + ' ' + say('m', lang), { anchor: 'middle', fill: muted })).join('')
    return rows(list, lang, { x0, unit, step, top, suffix: 'm' }) +
      line([[x0, yours], [x0 + 60 * unit, yours]], { stroke: blue, width: 3, dash: '10 7' }) + text(x0 + 60 * unit + 8, yours + 6, say('yours', lang), { fill: blue }) +
      line([[x0, yours + 30], [x0 + 100 * unit, yours + 30]], { stroke: muted, width: 2 }) + ticks +
      text(696, yours + 84, say('asOf', lang) + day(records.asOf, lang), { anchor: 'end', fill: muted })
  },
  'records-time'(lang) {
    const x0 = 64, unit = 13, step = 40, top = 34, list = records.time
    const yours = top + list.length * step
    const ticks = [0, 10, 20, 30].map((s) => line([[x0 + s * unit, yours + 26], [x0 + s * unit, yours + 34]], { stroke: muted, width: 2 }) + text(x0 + s * unit, yours + 54, s + ' ' + say('s', lang), { anchor: 'middle', fill: muted })).join('')
    return rows(list, lang, { x0, unit, step, top, suffix: 's' }) +
      line([[x0, yours], [x0 + 10 * unit, yours]], { stroke: blue, width: 3, dash: '10 7' }) + text(x0 + 10 * unit + 8, yours + 6, say('yours', lang), { fill: blue }) +
      line([[x0, yours + 30], [x0 + 32 * unit, yours + 30]], { stroke: muted, width: 2 }) + ticks +
      text(560, yours + 84, say('asOf', lang) + day(records.asOf, lang), { anchor: 'end', fill: muted })
  },
}
const sizes = {
  'records-distance': [696, 34 + records.distance.length * 34 + 96],
  'records-time': [560, 34 + records.time.length * 40 + 96],
}

export function figure(id, lang = 'en') {
  if (!draw[id]) throw new RangeError('No chapter figure ' + id)
  const [width, height] = sizes[id]
  return frame(id, lang, width, n(height), labels[id][lang] ?? labels[id].en, draw[id](lang))
}
export const figureControls = () => []
export function figureText(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  const list = id === 'records-distance' ? records.distance : records.time
  const unit = id === 'records-distance' ? say('m', lang) : say('s', lang)
  return (labels[id][lang] ?? labels[id].en) + ': ' + list.map((r) => year(r.date) + ' ' + number(r.value, lang) + ' ' + unit).join(', ') + '. ' + say('asOf', lang) + day(records.asOf, lang) + '.'
}
