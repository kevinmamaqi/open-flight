// Figures for Chapter 2 · How flight works. Contract as in book/README.md, keyed by
// figure id instead of model: figure(id, lang), figureControls(id, lang), figureText(id, lang).
// Diagrams, not to scale. The Reynolds bands are estimates and say so inside the figure.
import { arrow, balanceMark, blue, frame, gliderSide, grid, ink, kite, line, muted, n, pale, poly, rotate, sheet, text } from './chapter-kit.js?v=27dc78b6a91f'

const w = (en, es, ru) => ({ en, es, ru })
const words = {
  lift: w('Lift', 'Sustentación', 'Подъёмная сила'),
  drag: w('Drag', 'Resistencia', 'Сопротивление'),
  weight: w('Weight', 'Peso', 'Вес'),
  thrust: w('Thrust: only during the throw', 'Empuje: solo al lanzar', 'Тяга: только при броске'),
  path: w('Glide path', 'Trayectoria de planeo', 'Траектория планирования'),
  small: w('Small angle', 'Ángulo pequeño', 'Малый угол'),
  more: w('Larger angle: more lift', 'Más ángulo: más sustentación', 'Больше угол — больше сила'),
  stall: w('Too steep: stall', 'Demasiado: pérdida', 'Слишком круто: срыв'),
  air: w('Air', 'Aire', 'Воздух'),
  balance: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'),
  neutral: w('Neutral point', 'Punto neutro', 'Нейтральная точка'),
  clip: w('Clip: weight in front', 'Clip: peso delante', 'Скрепка: вес спереди'),
  gust: w('Nose up? Pushed back down', '¿Morro arriba? Vuelve a bajar', 'Нос вверх? Вернётся вниз'),
  finger: w('Fingertip', 'Dedo', 'Палец'),
  more2: w('More lift', 'Más sustentación', 'Больше силы'),
  less: w('Less lift', 'Menos sustentación', 'Меньше силы'),
  v: w('Shallow V (dihedral)', 'V poco profunda (diedro)', 'Неглубокое V'),
  rolls: w('Rolls back to level', 'Vuelve a nivelarse', 'Возвращается в горизонт'),
  ratio: w('Glide ratio = d ÷ h = lift ÷ drag', 'Relación de planeo = d ÷ h = sustentación ÷ resistencia', 'Качество = d ÷ h = подъёмная сила ÷ сопротивление'),
  height: w('Height h', 'Altura h', 'Высота h'),
  distance: w('Distance d', 'Distancia d', 'Дальность d'),
  estimates: w('Estimates, air at about 20 °C', 'Estimaciones, aire a unos 20 °C', 'Оценки, воздух около 20 °C'),
  butterfly: w('Paper butterfly', 'Mariposa de papel', 'Бумажная бабочка'),
  plane: w('Paper planes', 'Aviones de papel', 'Бумажные самолёты'),
  airliner: w('Airliner wing in cruise', 'Ala de avión comercial en crucero', 'Крыло лайнера в полёте'),
  re: w('Reynolds number', 'Número de Reynolds', 'Число Рейнольдса'),
}
const say = (key, lang) => words[key][lang] ?? words[key].en

const labels = {
  forces: w('Four forces on a paper glider', 'Cuatro fuerzas sobre un planeador de papel', 'Четыре силы, действующие на бумажный планёр'),
  'angle-of-attack': w('A flat wing at three angles of attack', 'Un ala plana con tres ángulos de ataque', 'Плоское крыло при трёх углах атаки'),
  balance: w('Balance point ahead of the neutral point', 'Punto de equilibrio delante del punto neutro', 'Точка равновесия впереди нейтральной точки'),
  dihedral: w('Wings in a shallow V seen from behind', 'Alas en V poco profunda vistas desde atrás', 'Крылья неглубоким V, вид сзади'),
  glide: w('Glide ratio: distance over height', 'Relación de planeo: distancia entre altura', 'Качество планирования: дальность к высоте'),
  reynolds: w('Reynolds numbers on a logarithmic scale', 'Números de Reynolds en escala logarítmica', 'Числа Рейнольдса в логарифмической шкале'),
}
export const figureIds = Object.keys(labels)

const draw = {
  forces(lang) {
    const c = [280, 175], gamma = Math.atan(1 / 3), u = [Math.cos(gamma), Math.sin(gamma)]
    const weight = 125, lift = weight * Math.cos(gamma), drag = weight * Math.sin(gamma)
    const at = (v, len) => [c[0] + v[0] * len, c[1] + v[1] * len]
    return line([[30, 175 - 250 / 3], [530, 175 + 250 / 3]], { stroke: muted, width: 2, dash: '8 6' }) +
      text(36, 175 - 250 / 3 - 14, say('path', lang), { fill: muted }) +
      arrow([46, 175 - 234 / 3 + 10], [150, 175 - 130 / 3 + 10], { stroke: ink, width: 2, dash: '2 6' }) +
      text(40, 300, say('thrust', lang), { fill: muted }) +
      gliderSide(c[0], c[1], 170, (gamma * 180) / Math.PI) +
      arrow(c, at([u[1], -u[0]], lift), { stroke: blue, width: 4 }) + text(c[0] + 52, c[1] - 112, say('lift', lang), { weight: 700, fill: blue }) +
      arrow(c, at([-u[0], -u[1]], drag + 30), { stroke: kite, width: 4 }) + text(c[0] - 40, c[1] + 46, say('drag', lang), { weight: 700, fill: kite, anchor: 'end' }) +
      arrow(c, [c[0], c[1] + weight], { stroke: ink, width: 5 }) + text(c[0] + 14, c[1] + weight - 6, say('weight', lang), { weight: 700 }) +
      balanceMark(c[0], c[1])
  },
  'angle-of-attack'(lang) {
    const panel = (i, degrees, key) => {
      const cx = 95 + i * 185, cy = 120
      const plate = rotate([[cx - 60, cy], [cx + 60, cy]], [cx, cy], -degrees)
      const out = degrees > 20 ? [] : [0, 1, 2].map((k) => line([[cx - 88, cy - 34 + k * 34], [cx - 64, cy - 34 + k * 34], [cx + 64, cy - 34 + k * 34 + degrees * 0.9], [cx + 86, cy - 34 + k * 34 + degrees * 1.6]], { stroke: muted, width: 1.5 }))
      const curls = degrees > 20 ? [0, 1, 2].map((k) => `<circle cx="${n(cx - 10 + k * 28)}" cy="${n(cy - 38 - k * 8)}" r="${10 + k * 2}" fill="none" stroke="${kite}" stroke-width="2" stroke-dasharray="5 4"/>`).join('') + line([[cx - 88, cy + 30], [cx + 86, cy + 30]], { stroke: muted, width: 1.5 }) : ''
      return arrow([cx - 88, cy + 70], [cx - 52, cy + 70], { stroke: muted, width: 2, head: 9 }) + text(cx - 46, cy + 76, say('air', lang), { fill: muted }) +
        out.join('') + curls + line(plate, { stroke: ink, width: 5 }) +
        text(cx, 228, degrees + '°', { anchor: 'middle', weight: 700 }) + text(cx, 250, say(key, lang), { anchor: 'middle' })
    }
    return panel(0, 4, 'small') + panel(1, 10, 'more') + panel(2, 24, 'stall')
  },
  balance(lang) {
    const y = 130, cg = 250, np = 310
    return gliderSide(280, y, 380, 0) +
      `<rect x="438" y="${y - 8}" width="34" height="18" rx="6" fill="none" stroke="${kite}" stroke-width="3"/>` + text(470, y - 22, say('clip', lang), { anchor: 'end', fill: kite }) +
      balanceMark(cg, y + 6) + line([[cg, y - 6], [cg, 58]], { stroke: ink, width: 1.5 }) + text(cg - 6, 50, say('balance', lang), { anchor: 'end', weight: 700 }) +
      poly([[np, y + 2], [np - 9, y + 16], [np + 9, y + 16]], { fill: blue, stroke: blue }) + line([[np, y - 4], [np, 82]], { stroke: blue, width: 1.5 }) + text(np + 6, 76, say('neutral', lang), { fill: blue, weight: 700 }) +
      `<path d="M${cg - 22} ${y + 54}q22 -20 44 0v18h-44z" fill="${pale}" stroke="${ink}" stroke-width="2"/>` + text(cg, y + 98, say('finger', lang), { anchor: 'middle', fill: muted }) +
      arrow([420, 210], [455, 172], { stroke: kite, width: 3 }) + text(410, 236, say('gust', lang), { anchor: 'middle' })
  },
  dihedral(lang) {
    const c = [280, 130], roll = -10
    const wing = (side) => [[c[0], c[1]], [c[0] + side * 170, c[1] - 26], [c[0] + side * 170, c[1] - 44]]
    const left = rotate(wing(-1), c, roll), right = rotate(wing(1), c, roll), keel = rotate([[c[0], c[1]], [c[0], c[1] + 46]], c, roll)
    return line([[60, c[1]], [500, c[1]]], { stroke: grid, width: 2, dash: '6 6' }) +
      line(left, { width: 4 }) + line(right, { width: 4 }) + line(keel, { width: 4 }) +
      arrow([left[1][0] + 30, left[1][1] + 20], [left[1][0] + 30, left[1][1] - 60], { stroke: blue, width: 4 }) + text(left[1][0] + 10, left[1][1] + 48, say('more2', lang), { fill: blue, weight: 700 }) +
      arrow([right[1][0] - 30, right[1][1] - 4], [right[1][0] - 30, right[1][1] - 44], { stroke: blue, width: 3 }) + text(right[1][0] - 10, right[1][1] - 52, say('less', lang), { fill: blue, anchor: 'end' }) +
      `<path d="M${c[0] - 70} ${c[1] + 92}a90 40 0 0 0 140 0" fill="none" stroke="${kite}" stroke-width="3"/>` + poly([[c[0] + 70, c[1] + 92], [c[0] + 58, c[1] + 80], [c[0] + 78, c[1] + 78]], { fill: kite, stroke: kite, width: 1 }) +
      text(c[0], c[1] + 126, say('rolls', lang), { anchor: 'middle' }) + text(c[0], 30, say('v', lang), { anchor: 'middle', weight: 700 })
  },
  glide(lang) {
    const top = [80, 70], land = [500, 196]
    return line([[30, 196], [530, 196]], { width: 3 }) +
      gliderSide(top[0] + 20, top[1] + 4, 70, 17) + arrow([top[0] + 50, top[1] + 14], land, { stroke: kite, width: 3 }) +
      line([[60, top[1]], [60, 196]], { stroke: muted, width: 2, dash: '6 5' }) + text(52, 140, say('height', lang), { anchor: 'end' }) +
      line([[80, 214], [500, 214]], { stroke: muted, width: 2, dash: '6 5' }) + text(290, 236, say('distance', lang), { anchor: 'middle' }) +
      text(530, 40, say('ratio', lang), { anchor: 'end', weight: 700 })
  },
  reynolds(lang) {
    const x = (re) => 40 + (Math.log10(re) - 3) * 96
    const band = (lo, hi, y, key) => `<rect x="${n(x(lo))}" y="${y}" width="${n(x(hi) - x(lo))}" height="22" fill="${pale}" stroke="${ink}" stroke-width="2"/>` + text(Math.min(x(lo), 380), y - 8, say(key, lang))
    const sup = ['³', '⁴', '⁵', '⁶', '⁷', '⁸']
    return line([[40, 170], [520, 170]], { width: 2 }) +
      sup.map((s, i) => line([[40 + i * 96, 164], [40 + i * 96, 176]], { width: 2 }) + text(40 + i * 96, 198, '10' + s, { anchor: 'middle' })).join('') +
      band(8e3, 1.3e4, 52, 'butterfly') + band(1e4, 8e4, 108, 'plane') + band(2e7, 6e7, 52, 'airliner') +
      text(280, 222, say('re', lang) + ' · ' + say('estimates', lang), { anchor: 'middle', fill: muted })
  },
}

const sizes = { forces: 340, 'angle-of-attack': 260, balance: 260, dihedral: 260, glide: 250, reynolds: 236 }

export function figure(id, lang = 'en') {
  if (!draw[id]) throw new RangeError('No chapter figure ' + id)
  return frame(id, lang, 560, sizes[id], labels[id][lang] ?? labels[id].en, draw[id](lang))
}
export const figureControls = () => []
export function figureText(id, lang = 'en') {
  if (!labels[id]) throw new RangeError('No chapter figure ' + id)
  return labels[id][lang] ?? labels[id].en
}
