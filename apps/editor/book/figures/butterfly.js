// "Where it balances, where it lifts": the explanatory figure of the butterfly plates
// (B1-B3). A to-scale top view with a ruler from the nose, the clips, the balance target,
// the estimated lift point and the margin between them, a faint mark for the first fold,
// three side views (tail-heavy, balanced, nose-heavy) and the tab inset. Pure and
// deterministic: numbers come from butterfly-data.js, generated from makeK2 by
// scripts/build_nature_figures.ts. Spanish and Russian need a native read.
import { color, print } from '../../assets/brand/tokens.js'
import { butterflyData } from './butterfly-data.js'

const w = (en, es, ru) => ({ en, es, ru })
const names = {
  monarch: w('monarch', 'monarca', 'монарх'),
  morpho: w('blue morpho', 'morfo azul', 'голубой морфо'),
  swallowtail: w('swallowtail', 'macaón', 'махаон'),
}
const words = {
  title: w('Where it balances, where it lifts', 'Dónde se equilibra y dónde la sostiene el aire', 'Где точка равновесия и где подъёмная сила'),
  ruler: w('mm from the nose', 'mm desde el morro', 'мм от носа'),
  clips: w('Two clips, about 1 g', 'Dos clips, cerca de 1 g', 'Две скрепки, около 1 г'),
  target: w('It should balance here', 'Aquí debe equilibrarse', 'Здесь должно быть равновесие'),
  lift: w('Lift point (estimate)', 'Punto de sustentación (estimación)', 'Точка подъёмной силы (оценка)'),
  margin: w('balance ahead of lift = steady', 'equilibrio delante de la sustentación = estable', 'равновесие впереди подъёмной силы = устойчиво'),
  ghost: w('First fold (model): balance behind lift = swoop and stall', 'Primer pliegue (modelo): equilibrio detrás de la sustentación = sube y se desploma', 'Первый вариант (модель): равновесие позади подъёмной силы = взмыв и сваливание'),
  states: [
    w('Tail-heavy', 'Cola pesada', 'Тяжёлый хвост'),
    w('Balanced and trimmed', 'Equilibrada y ajustada', 'Сбалансирована и настроена'),
    w('Nose-heavy', 'Morro pesado', 'Тяжёлый нос'),
  ],
  paths: [
    w('rises, slows, drops', 'sube, se frena, cae', 'взмывает, тормозит, падает'),
    w('long, shallow glide', 'planeo largo y suave', 'долгое пологое планирование'),
    w('steep dive', 'picado', 'крутое пике'),
  ],
  tab: w('Tabs bent up 1–2 mm', 'Aletas dobladas 1–2 mm hacia arriba', 'Язычки отогнуты вверх на 1–2 мм'),
  push: w('air pushes the tail down', 'el aire empuja la cola hacia abajo', 'воздух давит хвост вниз'),
  noseUp: w('nose up', 'el morro sube', 'нос поднимается'),
  tabRule: w('Tabs up: less dive.', 'Aletas arriba: menos picado.', 'Язычки вверх: меньше пикирует.'),
  honesty: w(
    'Numbers are model estimates for 120 g/m² paper and two 33 mm clips. They have not been measured yet.',
    'Las cifras son estimaciones del modelo para papel de 120 g/m² y dos clips de 33 mm. Aún no se han medido.',
    'Числа — оценки модели для бумаги 120 г/м² и двух скрепок по 33 мм. Их ещё не измеряли.',
  ),
}

const W = 400 // figure width in user units; the print variant maps it to 100 mm
const K = 1.85 // units per millimetre in the top view (same scale for all three species)
const FONT = "'Open Flight Text',Andika,sans-serif"

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const n = v => Math.round(v * 10) / 10
const dec = (v, lang) => (lang === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ','))

/** Words to lines for a column `width` units wide at `size`. Cyrillic sets wider. */
function wrap(text, width, size, lang) {
  const max = Math.floor(width / (size * (lang === 'ru' ? 0.6 : 0.54)))
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? line + ' ' + word : word
    if (line && next.length > max) {
      lines.push(line)
      line = word
    } else line = next
  }
  return line ? [...lines, line] : lines
}
const mm = lang => (lang === 'ru' ? ' мм' : ' mm')
const FS = 14 // label size; at 100 mm wide in print this is 9.9 pt
const LEAD = FS * 1.25
const text = (x, y, lines, { size = FS, anchor = 'start', weight, fill } = {}) =>
  `<text x="${n(x)}" y="${n(y)}"${size === FS ? '' : ` font-size="${size}"`}${anchor === 'start' ? '' : ` text-anchor="${anchor}"`}${weight ? ` font-weight="${weight}"` : ''}${fill ? ` fill="${fill}"` : ''}>` +
  [].concat(lines).map((line, i) => (i ? `<tspan x="${n(x)}" dy="${n(size * 1.25)}">` : '<tspan>') + esc(line) + '</tspan>').join('') + '</text>'
const line = (points, stroke, width = 1.4, extra = '') =>
  `<path d="M${points.map(([x, y]) => n(x) + ' ' + n(y)).join('L')}" fill="none" stroke="${stroke}" stroke-width="${width}"${extra}/>`

function palette(printed) {
  return {
    ink: printed ? print.ink : color.diagramInk,
    muted: printed ? print.muted : color.textMuted,
    outline: color.lineGuide,
    paper: color.surface,
    air: color.seriesA,
    change: color.textAccent,
    steady: color.textSuccess,
    clip: color.border,
    tab: color.diagramMoving,
  }
}

/** Side profile of a paper butterfly, nose to the right, with its balance and lift marks. */
function profile([x, y, angle], balance, lift, c, id) {
  return `<g transform="translate(${n(x)} ${n(y)}) rotate(${angle}) scale(1.5)">` +
    line([[-15, 0], [13, 0]], c.ink, 1.6) + line([[-8, 2.5], [12, 2.5]], c.ink, 1.1) + `<circle cx="13" cy="1.2" r="2" fill="${c.ink}"/>` +
    `<use href="#${id}-t" transform="translate(${balance} 0) scale(.8)"/>` +
    line([[lift, -2], [lift, -11]], c.air, 1.3, ` marker-end="url(#${id}-a)"`) + '</g>'
}

function draw(model, lang, printed) {
  const data = butterflyData[model]
  if (!data) throw new RangeError('No butterfly figure for ' + model)
  if (!words.title[lang]) throw new RangeError('Unknown language ' + lang)
  const c = palette(printed)
  const id = 'b' + model.slice(0, 2) + model.length
  const cx = W / 2, top = 62
  const at = mm => top + mm * K
  const art = [], labels = [text(8, 26, words.title[lang], { size: 17, weight: 'bold' })]

  // Top view: light outline at true proportions, mirrored about the body centre line.
  const right = data.outline.map(([x, y]) => [cx + x * K, at(y)])
  const left = right.slice(1, -1).reverse().map(([x, y]) => [2 * cx - x, y])
  art.push(`<path d="M${[...right, ...left].map(([x, y]) => Math.round(x) + ' ' + Math.round(y)).join('L')}Z" fill="${c.paper}" stroke="${c.outline}" stroke-width="1.4"/>`)
  for (const side of [1, -1]) {
    const p = ([x, y]) => [cx + side * x * K, at(y)]
    const { ends, hinges } = data.tabs
    art.push(line([p(ends[0]), p(hinges[0]), p(hinges[1]), p(ends[1])], c.ink, 1.2),
      `<use href="#${id}-t" x="${n(cx + side * data.dots_x_mm * K)}" y="${n(at(data.dots_mm))}"/>`)
  }

  // The ruler on the centre line: a tick every 10 mm, a number every 20 mm on the right.
  art.push(line([[cx, at(0)], [cx, at(data.length_mm)]], c.ink, 1.2))
  const ticks = []
  for (let mm = 0; mm <= data.length_mm; mm += 10) {
    const half = mm % 20 ? 3 : 5
    ticks.push(`M${cx - half} ${n(at(mm))}H${cx + half}`)
    if (!(mm % 20) && mm !== 40) labels.push(text(cx + 9, at(mm) + 5, mm ? String(mm) : '0 ' + words.ruler[lang], { fill: c.muted }))
  }
  art.push(`<path d="${ticks.join('')}" stroke="${c.ink}" stroke-width="1.2"/>`)

  // Clips on the head: the clip box, the two clips and their centre.
  const [z0, z1] = data.clip_zone_mm
  const yc = at(data.clip_center_mm)
  art.push(`<rect x="${cx - 6}" y="${n(at(z0))}" width="12" height="${n((z1 - z0) * K)}" fill="none" stroke="${c.ink}" stroke-width="1.2" stroke-dasharray="3 2"/>`,
    `<rect x="${cx - 3.5}" y="${n(at(z0))}" width="7" height="${n((2 * data.clip_center_mm - z0) * K)}" rx="3" fill="${c.clip}"/>`,
    `<circle cx="${cx}" cy="${n(yc)}" r="2.6" fill="${c.ink}"/>`, line([[cx - 7, yc], [cx - 16, at(5)]], c.ink, 1.2))
  labels.push(text(cx - 19, at(5) + 5, words.clips[lang], { anchor: 'end' }))

  // Balance target, lift point, the margin between them and the first fold's ghost.
  const target = data.dots_mm, lift = Math.round(data.lift_point_mm)
  const ghost = data.lift_point_mm + Math.abs(data.k1_static_margin) * data.mac_mm
  const [yt, yl, yg] = [at(target), at(data.lift_point_mm), at(ghost)]
  const base = at(data.wing_root_mm) - 14
  art.push(`<use href="#${id}-t" transform="translate(${cx} ${n(yt)}) scale(1.1)"/>`,
    `<g fill="none" stroke="${c.change}" stroke-width="1.4" stroke-dasharray="2.5 1.5"><circle cx="${cx}" cy="${n(yg)}" r="4.4"/><circle cx="${cx}" cy="${n(yg)}" r="1.4"/></g>`,
    `<circle cx="${cx}" cy="${n(yl)}" r="4.5" fill="${c.paper}" stroke="${c.air}" stroke-width="1.8"/>`,
    line([[cx - 2.4, yl + 1.3], [cx, yl - 1.3], [cx + 2.4, yl + 1.3]], c.air, 1.6))
  // Left, above the wing: where it should balance. Right, above the wing: the lift point.
  const tl = wrap(words.target[lang] + ': ' + target + mm(lang), 160, FS, lang)
  art.push(line([[cx - 5, yt - 4], [cx - 24, base + 4]], c.ink, 1.2))
  labels.push(text(cx - 26, base - LEAD * (tl.length - 1), tl, { anchor: 'end', weight: 'bold' }))
  const ll = wrap(words.lift[lang] + ': ' + lift + mm(lang), 150, FS, lang)
  art.push(line([[cx + 4, yl - 4], [cx + 34, base + 4]], c.air, 1.2))
  labels.push(text(cx + 36, base - LEAD * (ll.length - 1), ll, { fill: c.air, weight: 'bold' }))
  // Right, over the wing: the margin. Left, over the wing: the first fold's ghost.
  const bx = cx + 10
  const [ahead, steady] = words.margin[lang].split(' = ')
  art.push(line([[bx - 3, yt], [bx, yt], [bx, yl], [bx - 3, yl]], c.steady, 1.8), line([[bx, (yt + yl) / 2], [bx + 24, yl + 22]], c.steady, 1.2))
  labels.push(text(bx + 27, yl + 28, [...wrap(lift - target + mm(lang) + ': ' + ahead, 150, FS, lang), '= ' + steady], { fill: c.steady, weight: 'bold' }))
  art.push(line([[cx - 4, yg + 3], [cx - 24, yg + 22]], c.change, 1.2))
  labels.push(text(cx - 26, yg + 28, wrap(words.ghost[lang], 160, FS, lang), { anchor: 'end', fill: c.change }))

  // Three side views from a hand: where the balance sits decides the flight.
  let y = at(data.length_mm) + 34
  const panel = 128
  const flights = [
    { path: 'M18 40Q44 4 68 20Q82 30 90 96', at: [68, 20, -30], balance: -7, lift: 3 },
    { path: 'M18 40L120 66', at: [98, 61, 14], balance: 5, lift: -2 },
    { path: 'M18 40Q46 42 66 96', at: [53, 62, 62], balance: 9, lift: -5 },
  ]
  const titles = words.states.map(s => wrap(s[lang], panel - 10, FS, lang))
  const notes = words.paths.map(s => wrap(s[lang], panel - 10, FS, lang))
  const rows = Math.max(...titles.map(t => t.length)), noteRows = Math.max(...notes.map(t => t.length))
  const flight = y + rows * LEAD + 6, box = rows * LEAD + 118 + noteRows * LEAD
  flights.forEach((f, i) => {
    const x0 = 6 + i * (panel + 4)
    art.push(`<rect x="${x0}" y="${n(y)}" width="${panel}" height="${n(box)}" rx="6" fill="none" stroke="${c.outline}" stroke-width="1.2"/>`,
      `<g transform="translate(${x0} ${n(flight)})"><use href="#${id}-h"/>` +
      `<path d="${f.path}" fill="none" stroke="${c.ink}" stroke-width="1.4" stroke-dasharray="4 3"/>` + profile(f.at, f.balance, f.lift, c, id) + '</g>')
    labels.push(text(x0 + panel / 2, y + 20, titles[i], { anchor: 'middle', weight: 'bold' }),
      text(x0 + panel / 2, flight + 116, notes[i], { anchor: 'middle', fill: c.muted }))
  })
  y += box + 16

  // The tab inset: a hindwing tab bent up makes the air push the tail down, so the nose rises.
  const tabLines = wrap(words.tab[lang], 190, FS, lang)
  art.push(`<g transform="translate(0 ${n(y)})">` +
    `<path d="M72 52H310" fill="none" stroke="${c.ink}" stroke-width="2.4"/>` + line([[98, 56], [306, 56]], c.ink, 1.4) +
    `<circle cx="312" cy="53" r="4" fill="${c.ink}"/>` +
    `<path d="M72 52L50 40L54 37L74 49Z" fill="${c.tab}" stroke="${c.ink}" stroke-width="1.4"/>` +
    line([[270, 38], [124, 38]], c.air, 1.6, ` marker-end="url(#${id}-a)" stroke-dasharray="5 3"`) +
    line([[60, 14], [60, 33]], c.change, 2.2, ` marker-end="url(#${id}-r)"`) +
    `<path d="M338 70A28 28 0 0 0 352 30" fill="none" stroke="${c.change}" stroke-width="2.2" marker-end="url(#${id}-r)"/></g>`)
  labels.push(text(8, y + 84, tabLines, { weight: 'bold' }),
    text(74, y + 22, wrap(words.push[lang], 230, FS, lang), { fill: c.change }),
    text(392, y + 88, words.noseUp[lang], { anchor: 'end', fill: c.change }),
    text(392, y + 106, words.tabRule[lang], { anchor: 'end', weight: 'bold' }))
  y += 122 + LEAD * Math.max(0, tabLines.length - 1) + 10

  const honesty = wrap(words.honesty[lang], W - 16, FS, lang)
  labels.push(text(8, y, honesty, { fill: c.muted }))
  const height = Math.ceil(y + LEAD * (honesty.length - 1) + 10)

  const arrow = (key, fill) => `<marker id="${id}-${key}" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="${fill}"/></marker>`
  const defs = `<defs><g id="${id}-t"><circle r="4" fill="${c.paper}" stroke="${c.ink}" stroke-width="1.4"/><circle r="1.6" fill="${c.ink}"/></g>` +
    arrow('a', c.air) + arrow('r', c.change) +
    `<path id="${id}-h" d="M3 44c0-7 4-11 10-11h6c3 0 3 4 0 4h-4h8c3 0 3 4 0 4h-2c3 0 3 4 0 4h-2c3 0 2 4-1 4h-8c-4 0-7-2-7-5z" fill="${c.paper}" stroke="${c.ink}" stroke-width="1.2"/></defs>`
  const title = words.title[lang] + ' · ' + names[model][lang]
  const size = printed ? ` width="100mm" height="${n(height / 4)}mm"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}"${size} role="img" aria-labelledby="${id}-title">` +
    `<title id="${id}-title">${esc(title)}</title>${defs}` +
    `<g stroke-linejoin="round" stroke-linecap="round">${art.join('')}</g>` +
    `<g font-family="${FONT}" font-size="${FS}" fill="${c.ink}" stroke="${c.paper}" stroke-width="3.5" paint-order="stroke">${labels.join('')}</g></svg>`
}

/** The figure as an SVG string, for the plate page and the browser. */
export function figure(model, lang = 'en', state = {}) {
  return draw(model, lang, false)
}

/** Printed variant: 100 mm wide, black text, no controls. Text stays at 9 pt or more. */
export function printFigure(model, lang = 'en') {
  return draw(model, lang, true)
}

/** The butterfly figure shows every state at once, so it has no controls. */
export function figureControls(model, lang = 'en') {
  return []
}

const pct = v => Math.round(v * 100)
/** The text alternative, with every number the figure shows. */
export function figureText(model, lang = 'en', state = {}) {
  const d = butterflyData[model]
  if (!d) throw new RangeError('No butterfly figure for ' + model)
  const target = d.dots_mm, lift = Math.round(d.lift_point_mm), name = names[model][lang]
  const v = dec(d.glide_speed_m_s, lang)
  if (lang === 'es')
    return `Vista desde arriba de la ${name} de papel, a escala, con una regla desde el morro. Dos clips (cerca de 1 g) van en la cabeza, centrados a ${d.clip_center_mm} mm del morro. Debe equilibrarse sobre los puntos con anillo, a ${target} mm del morro. El modelo sitúa el punto de sustentación a ${lift} mm, así que el equilibrio queda ${lift - target} mm por delante: vuelo estable. Con dos clips en papel de 120 g/m², el modelo predice el equilibrio a ${Math.round(d.balance_two_clips_mm)} mm del morro, un margen estático del ${pct(d.static_margin)} % y un planeo de unos ${v} m/s. En el mismo modelo, nuestro primer pliegue se equilibraba detrás de su punto de sustentación (${pct(d.k1_static_margin)} %), lo que predice que sube y se desploma. Tres vistas de lado: con la cola pesada sube, se frena y cae; equilibrada y ajustada planea largo y suave; con el morro pesado cae en picado. Detalle: al doblar las aletas 1–2 mm hacia arriba, el aire empuja la cola hacia abajo, el morro sube y cae menos en picado. ${words.honesty.es}`
  if (lang === 'ru')
    return `Вид сверху на бумажную бабочку «${name}» в масштабе, с линейкой от носа. Две скрепки (около 1 г) надеты на голову, их центр в ${d.clip_center_mm} мм от носа. Модель должна балансировать на точках в кружках, в ${target} мм от носа. По модели точка подъёмной силы находится в ${lift} мм от носа, то есть равновесие на ${lift - target} мм впереди неё: полёт устойчивый. С двумя скрепками на бумаге 120 г/м² модель предсказывает равновесие в ${Math.round(d.balance_two_clips_mm)} мм от носа, запас устойчивости ${pct(d.static_margin)} % и скорость планирования около ${v} м/с. В той же модели наш первый вариант балансировал позади своей точки подъёмной силы (${pct(d.k1_static_margin)} %), а это означает взмыв и сваливание. Три вида сбоку: с тяжёлым хвостом модель взмывает, тормозит и падает; сбалансированная и настроенная долго и полого планирует; с тяжёлым носом круто пикирует. Врезка: если отогнуть язычки вверх на 1–2 мм, воздух давит хвост вниз, нос поднимается, и модель меньше пикирует. ${words.honesty.ru}`
  return `Top view of the paper ${name}, drawn to scale, with a ruler from the nose. Two clips (about 1 g) sit on the head, centred ${d.clip_center_mm} mm behind the nose. It should balance on the ringed dots, ${target} mm behind the nose. The model puts the lift point ${lift} mm behind the nose, so the balance point is ${lift - target} mm ahead of it: steady. With two clips on 120 g/m² paper the model predicts a balance ${Math.round(d.balance_two_clips_mm)} mm behind the nose, a static margin of ${pct(d.static_margin)}% and a glide of about ${v} m/s. In the same model our first fold balanced behind its lift point (${pct(d.k1_static_margin)}%), which predicts a swoop and a stall. Three side views: tail-heavy rises, slows and drops; balanced and trimmed makes a long, shallow glide; nose-heavy dives steeply. Inset: bending the tabs up 1–2 mm makes the air push the tail down, so the nose comes up and it dives less. ${words.honesty.en}`
}
