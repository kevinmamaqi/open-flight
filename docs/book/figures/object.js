// "Balance and lift": the explanatory figure of the flying-object plates (F1-F3).
// Same grammar as the butterfly figure: target = balance point, blue arrow = air force,
// dashed line = path or air, red = the one thing you change. Pure and deterministic;
// geometry comes from object-data.js (scripts/build_nature_figures.ts). Spanish and
// Russian need a native read.
import { color, print } from '../../assets/brand/tokens.js?v=60abccfc0f99'
import { objectData } from './object-data.js?v=60abccfc0f99'

const w = (en, es, ru) => ({ en, es, ru })
const words = {
  title: w('Balance and lift', 'Equilibrio y sustentación', 'Равновесие и подъёмная сила'),
  ring: {
    rim: w('1 or 2 rim folds: the heavy front', '1 o 2 pliegues en el borde: el frente pesado', '1 или 2 сгиба обода: тяжёлый перёд'),
    balance: w('It balances about here (estimate)', 'Se equilibra más o menos aquí (estimación)', 'Равновесие примерно здесь (оценка)'),
    lift: w('the air pushes up', 'el aire empuja hacia arriba', 'воздух давит вверх'),
    peaks: w('the two peaks', 'los dos picos', 'два выступа'),
    tilt: w('Tipped? The air on the tail pushes it back into line, like a shuttlecock.', '¿Se inclina? El aire en la cola lo endereza, como a un volante de bádminton.', 'Наклонилось? Воздух на хвосте возвращает кольцо на курс, как волан.'),
    honesty: w('Shape from the fold geometry of a US Letter sheet. Positions are estimates, not measurements.', 'Forma calculada con el pliegue de una hoja Carta. Las posiciones son estimaciones, no medidas.', 'Форма рассчитана по сгибу листа US Letter. Положения — оценки, а не измерения.'),
  },
  samara: {
    axis: w('spin axis', 'eje de giro', 'ось вращения'),
    balance: w('balance point, near the clip', 'punto de equilibrio, cerca del clip', 'точка равновесия у скрепки'),
    cone: w('cone angle', 'ángulo del cono', 'угол конуса'),
    section: w('Mid-wing, cut across', 'Corte a media ala', 'Сечение посередине крыла'),
    spinning: w('spinning', 'giro', 'вращение'),
    falling: w('falling: air comes up', 'caída: el aire sube', 'падение: воздух снизу'),
    wind: w('the air it meets', 'el aire que encuentra', 'встречный воздух'),
    vortex: w('leading-edge vortex: extra lift', 'remolino del borde delantero: más sustentación', 'вихрь у передней кромки: добавка подъёмной силы'),
    root: w('Root, cut across', 'Corte en la base', 'Сечение у основания'),
    front: w('front edge', 'borde delantero', 'передняя кромка'),
    honesty: w('Drawn from the printed wing. The cone angle is drawn at 15° to show it; it is not measured.', 'Dibujado a partir del ala impresa. El cono se dibuja a 15° para verlo; no está medido.', 'Нарисовано по печатному крылу. Угол конуса 15° показан для наглядности и не измерен.'),
  },
  tandem: {
    nose: w('nose roll', 'morro enrollado', 'свёрнутый нос'),
    clip: w('small clip', 'clip pequeño', 'маленькая скрепка'),
    target: w('balance here', 'equilibrio aquí', 'равновесие здесь'),
    tail: w('balance here: tail-heavy, it sinks', 'equilibrio aquí: cola pesada, se hunde', 'равновесие здесь: хвост тяжёлый, модель проседает'),
    downwash: w('air pushed down by the front wings', 'aire que bajan las alas delanteras', 'воздух, отброшенный передними крыльями вниз'),
    caption: w('Balance nearer the front wings: the back wings work like a tail.', 'Equilibrio cerca de las alas delanteras: las traseras hacen de cola.', 'Равновесие ближе к передним крыльям: задние работают как хвост.'),
    level: w('level', 'planas', 'ровно'),
    raised: w('tips raised: rolls back', 'puntas arriba: se endereza', 'кончики вверх: выравнивается'),
    honesty: w('Reviewer estimate from the printed pattern on 80 g/m² paper. Not measured.', 'Estimación de revisión a partir del patrón impreso en papel de 80 g/m². Sin medir.', 'Оценка рецензента по печатной выкройке на бумаге 80 г/м². Не измерено.'),
  },
}
const controls = {
  samara: { name: 'clip', label: w('Clip position', 'Posición del clip', 'Положение скрепки'), options: [['A', w('A, front', 'A, delante', 'A, спереди')], ['B', w('B, back', 'B, detrás', 'B, сзади')]] },
  tandem: { name: 'clip', label: w('Nose clip', 'Clip en el morro', 'Скрепка на носу'), options: [['on', w('With the clip', 'Con clip', 'Со скрепкой')], ['off', w('Paper only', 'Solo papel', 'Только бумага')]] },
}

const W = 400, FS = 14, LEAD = FS * 1.25
const FONT = "'Open Flight Text',Andika,sans-serif"
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const n = v => Math.round(v * 10) / 10
const dec = (v, lang) => (lang === 'en' ? String(v) : String(v).replace('.', ','))
function wrap(text, width, lang) {
  const max = Math.floor(width / (FS * (lang === 'ru' ? 0.6 : 0.54)))
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? line + ' ' + word : word
    if (line && next.length > max) { lines.push(line); line = word } else line = next
  }
  return line ? [...lines, line] : lines
}
const text = (x, y, lines, { size = FS, anchor = 'start', weight, fill } = {}) =>
  `<text x="${n(x)}" y="${n(y)}"${size === FS ? '' : ` font-size="${size}"`}${anchor === 'start' ? '' : ` text-anchor="${anchor}"`}${weight ? ` font-weight="${weight}"` : ''}${fill ? ` fill="${fill}"` : ''}>` +
  [].concat(lines).map((l, i) => (i ? `<tspan x="${n(x)}" dy="${LEAD}">` : '<tspan>') + esc(l) + '</tspan>').join('') + '</text>'
const path = (d, stroke, width = 1.4, extra = '') => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}"${extra}/>`
const line = (pts, stroke, width, extra) => path('M' + pts.map(([x, y]) => n(x) + ' ' + n(y)).join('L'), stroke, width, extra)
const target = (id, x, y, s = 1, ghost = false) => `<use href="#${id}-t" transform="translate(${n(x)} ${n(y)}) scale(${s})"${ghost ? ' opacity=".45"' : ''}/>`

function palette(printed) {
  return {
    ink: printed ? print.ink : color.diagramInk, muted: printed ? print.muted : color.textMuted,
    outline: color.lineGuide, paper: color.surface, face: color.diagramBack, air: color.seriesA,
    wash: color.focus, change: color.textAccent, clip: color.border,
  }
}

function ring(lang, c, id, art, labels) {
  const d = objectData.ring.letter, t = words.ring
  const s = 1.3, R = ((d.diameter_mm[0] + d.diameter_mm[1]) / 4) * s, x0 = 74, y0 = 168, rim = d.rim_fold_mm * s
  // Near side, with the V facing the viewer: angle -90..90 from the V maps to height R·sin.
  const edge = d.skirt_profile_mm.slice(6, 19).map((skirt, i) => [x0 + rim + skirt * s, y0 + R * Math.sin(((-90 + i * 15) * Math.PI) / 180)])
  const far = d.skirt_profile_mm.slice(18).concat(d.skirt_profile_mm.slice(1, 7)).map((skirt, i) => [x0 + rim + skirt * s, y0 + R * Math.sin(((90 + i * 15) * Math.PI) / 180)])
  art.push(`<g transform="rotate(-6 ${x0} ${y0})">` +
    line(far, c.outline, 1.2, ' stroke-dasharray="3 3"') +
    `<path d="M${x0} ${n(y0 - R)}L${edge.map(([x, y]) => n(x) + ' ' + n(y)).join('L')}L${x0} ${n(y0 + R)}Z" fill="${c.paper}" stroke="${c.ink}" stroke-width="1.4"/>` +
    `<rect x="${x0}" y="${n(y0 - R)}" width="${n(rim)}" height="${n(2 * R)}" fill="${c.ink}"/>` +
    `<ellipse cx="${x0}" cy="${y0}" rx="${n(R * 0.22)}" ry="${n(R)}" fill="${c.face}" stroke="${c.change}" stroke-width="2.4"/>` +
    target(id, x0 + d.balance_from_front_mm * s, y0, 1.3) + line([[x0 + 4, y0 - R - 4], [40, 70]], c.change, 1.2) +
    line([[x0 + 64 * s, y0 - 6], [x0 + 72 * s, y0 - R - 30]], c.air, 2.4, ` marker-end="url(#${id}-a)"`) + '</g>')
  const peak = edge[3]
  labels.push(text(8, 56, wrap(t.rim[lang], 190, lang), { fill: c.change, weight: 'bold' }),
    text(x0 + 72 * s + 10, y0 - R - 26, t.lift[lang], { fill: c.air, weight: 'bold' }),
    text(x0 + d.balance_from_front_mm * s + 10, y0 + R + 30, wrap(t.balance[lang], 150, lang), { anchor: 'middle', weight: 'bold' }),
    text(Math.min(peak[0], 300), peak[1] - 14, t.peaks[lang], { fill: c.muted }))
  // Inset: tipped 10 degrees, the air on the tail pushes it back.
  const y = y0 + R + 84
  art.push(`<g transform="translate(60 ${y + 30}) rotate(-10)"><path d="M0 -22H90L110 -6L110 6L90 22H0Z" fill="${c.paper}" stroke="${c.ink}" stroke-width="1.4"/><rect x="0" y="-22" width="12" height="44" fill="${c.ink}"/></g>` +
    line([[168, y - 12], [168, y + 12]], c.air, 2, ` marker-end="url(#${id}-a)"`) + path(`M210 ${y + 44}A44 44 0 0 1 206 ${y + 8}`, c.air, 2, ` marker-end="url(#${id}-a)"`))
  labels.push(text(228, y + 18, wrap(t.tilt[lang], 166, lang)))
  return { y: y + 30 + LEAD * wrap(t.tilt[lang], 166, lang).length, honesty: t.honesty[lang] }
}

function samara(lang, c, id, art, labels, state) {
  const d = objectData.samara, t = words.samara, clip = state.clip === 'B' ? 'B' : 'A'
  const s = 2.15, ax = 128, ay = 150, tan = Math.tan((15 * Math.PI) / 180)
  const along = mm => [ax + (mm - d.balance[clip].from_root_mm) * s, ay - (mm - d.balance[clip].from_root_mm) * s * tan]
  const chord = [0.62, 0.86, 1, 0.98, 0.8, 0.35], half = mm => (chord[Math.min(5, Math.floor((mm / d.length_mm) * 6))] * d.mid_chord_mm * s * 0.22)
  const stations = Array.from({ length: 13 }, (_, i) => (i / 12) * d.length_mm)
  const le = stations.map(mm => { const [x, y] = along(mm); return [x, y - half(mm)] })
  const te = stations.map(mm => { const [x, y] = along(mm); return [x, y + half(mm)] }).reverse()
  const [rx, ry] = along(0), [tx, ty] = along(d.length_mm)
  art.push(line([[ax, 60], [ax, 268]], c.ink, 1.2, ' stroke-dasharray="8 3 2 3"'),
    path(`M${n(ax - 60)} 86A60 14 0 1 0 ${n(ax + 52)} 79`, c.air, 2, ` marker-end="url(#${id}-a)"`),
    `<path d="M${[...le, ...te].map(([x, y]) => n(x) + ' ' + n(y)).join('L')}Z" fill="${c.face}" stroke="${c.ink}" stroke-width="1.4"/>`,
    line(le, c.ink, 2.6), line([[ax, ay], [tx, ay]], c.outline, 1.2, ' stroke-dasharray="3 3"'),
    path(`M${ax + 70} ${ay}A70 70 0 0 0 ${n(ax + 70 * Math.cos(0.26))} ${n(ay - 70 * Math.sin(0.26))}`, c.muted, 1.4),
    `<rect x="${n(rx - 2)}" y="${n(ry - 6)}" width="14" height="12" rx="2" fill="${c.clip}" stroke="${c.change}" stroke-width="2"/>`, target(id, ax, ay, 1.3))
  labels.push(text(ax + 8, 66, t.axis[lang], { fill: c.muted }), text(ax - 16, ay + 34, wrap(t.balance[lang], 170, lang), { weight: 'bold' }),
    text(ax + 76, ay - 4, t.cone[lang], { fill: c.muted }), text(tx - 4, ty - 22, d.length_mm.toFixed(0) + (lang === 'ru' ? ' мм' : ' mm'), { anchor: 'end', fill: c.muted }))
  // Two cuts across the wing: mid-span (how the air meets it) and the root (where the clip goes).
  const y = 300
  art.push(`<g transform="translate(250 ${y + 84})">` + path('M-50 6Q0 -8 56 2', c.ink, 3) +
    line([[96, 40], [50, 40]], c.air, 2, ` marker-end="url(#${id}-a)"`) + line([[96, 40], [96, -2]], c.air, 2, ` marker-end="url(#${id}-a)"`) +
    line([[96, 40], [62, 12]], c.air, 2.6, ` marker-end="url(#${id}-a)" stroke-dasharray="6 3"`) +
    path('M-44 -6C-60 -22 -30 -34 -22 -18', c.air, 1.8, ` marker-end="url(#${id}-a)"`) + '</g>')
  labels.push(text(196, y + 8, t.section[lang], { weight: 'bold' }), text(196, y + 28, wrap(t.vortex[lang], 196, lang), { fill: c.air }),
    text(322, y + 146, t.spinning[lang], { anchor: 'middle', fill: c.air }), text(392, y + 166, t.falling[lang], { anchor: 'end', fill: c.air }),
    text(296, y + 112, wrap(t.wind[lang], 90, lang), { anchor: 'end', fill: c.air }))
  const rw = d.root_chord_mm * 6.5, x1 = 24
  art.push(line([[x1, y + 80], [x1 + rw, y + 80]], c.ink, 3), ...['A', 'B'].map(k => `<circle cx="${n(x1 + d.stations_mm[k] * 6.5)}" cy="${y + 80}" r="7" fill="${k === clip ? c.change : c.paper}" stroke="${c.change}" stroke-width="2"/>`))
  labels.push(text(8, y + 8, t.root[lang], { weight: 'bold' }), text(x1, y + 106, t.front[lang], { fill: c.muted }),
    ...['A', 'B'].map(k => text(x1 + d.stations_mm[k] * 6.5, y + 64, k, { anchor: 'middle', weight: 'bold', fill: c.change })))
  return { y: y + 196, honesty: t.honesty[lang] }
}

function tandem(lang, c, id, art, labels, state) {
  const d = objectData.tandem, t = words.tandem, clip = state.clip !== 'off'
  const s = 2.6, x = mm => 30 + (mm - d.nose_mm) * s, y0 = 170
  const k = d.downwash.at(-1), cg = clip ? k.target : d.balance_paper_only
  const qf = d.front.quarter_chord, qr = d.rear.quarter_chord
  const share = (qr - cg) / (qr - qf), total = 110
  art.push(line([[x(d.nose_mm), y0], [x(d.tail_mm), y0]], c.ink, 2), line([[x(d.nose_mm + 4), y0 + 10], [x(d.tail_mm), y0 + 10]], c.ink, 1.2),
    `<circle cx="${n(x(d.nose_mm + 3))}" cy="${y0 + 5}" r="7" fill="${c.paper}" stroke="${c.change}" stroke-width="2.4"/>`,
    line([[x(d.front.le), y0 - 3], [x(d.front.le + d.front.root_chord), y0 + 1]], c.ink, 5),
    line([[x(d.rear.le), y0 - 1], [x(d.rear.le + d.rear.root_chord), y0 + 1]], c.ink, 5),
    ...[0, 16, 32].map(dx => line([[x(d.front.le + d.front.root_chord) - 18 + dx, y0 + 4], [x(d.rear.le) + 4 + dx * 1.4, y0 + 20]], c.wash, 1.4, ` marker-end="url(#${id}-w)" stroke-dasharray="4 3"`)),
    line([[x(qf), y0 - 8], [x(qf), y0 - 8 - total * share]], c.air, 2.6, ` marker-end="url(#${id}-a)"`),
    line([[x(qr), y0 - 8], [x(qr), y0 - 8 - total * (1 - share)]], c.air, 2.6, ` marker-end="url(#${id}-a)"`),
    clip ? `<rect x="${n(x(d.clip_stations_mm[0]))}" y="${y0 + 2}" width="${n((d.clip_stations_mm[1] - d.clip_stations_mm[0]) * s)}" height="10" rx="3" fill="${c.clip}" stroke="${c.change}" stroke-width="2"/>` : '',
    target(id, x(cg), y0 + 30, 1.4), line([[x(cg), y0 + 22], [x(cg), y0 + 4]], c.ink, 1.2, ' stroke-dasharray="2 2"'))
  labels.push(text(8, y0 + 40, t.nose[lang], { fill: c.change, weight: 'bold' }),
    text(x(cg) + (clip ? -12 : 12), y0 + 58, wrap(clip ? t.target[lang] : t.tail[lang], 200, lang), { anchor: clip ? 'middle' : 'start', weight: 'bold', fill: clip ? c.ink : c.change }),
    text(x(d.rear.le) - 20, y0 + 44, wrap(t.downwash[lang], 140, lang), { fill: c.wash }))
  if (clip) labels.push(text(x(d.clip_stations_mm[0]) - 6, y0 - 26, t.clip[lang], { fill: c.change, weight: 'bold' }))
  let y = y0 + 110
  const cap = wrap(t.caption[lang], W - 16, lang)
  labels.push(text(8, y, cap, { weight: 'bold' }))
  y += LEAD * cap.length + 12
  // Tail view: level wings against raised tips, which roll back to level.
  art.push(line([[40, y + 30], [150, y + 30]], c.ink, 4), line([[95, y + 30], [95, y + 44]], c.ink, 3),
    line([[230, y + 22], [285, y + 34], [340, y + 22]], c.ink, 4), line([[285, y + 34], [285, y + 48]], c.ink, 3),
    path(`M350 ${y + 46}A60 60 0 0 1 352 ${y + 10}`, c.air, 2, ` marker-end="url(#${id}-a)"`))
  const raised = wrap(t.raised[lang], 170, lang)
  labels.push(text(95, y + 72, t.level[lang], { anchor: 'middle', fill: c.muted }), text(285, y + 72, raised, { anchor: 'middle', fill: c.muted }))
  return { y: y + 84 + LEAD * raised.length, honesty: t.honesty[lang] }
}

function draw(model, lang, state, printed) {
  const panel = { ring, samara, tandem }[model]
  if (!panel) throw new RangeError('No object figure for ' + model)
  if (!words.title[lang]) throw new RangeError('Unknown language ' + lang)
  const c = palette(printed), id = 'o' + model.slice(0, 2)
  const art = [], labels = [text(8, 26, words.title[lang], { size: 17, weight: 'bold' })]
  const { y, honesty } = panel(lang, c, id, art, labels, state)
  const lines = wrap(honesty, W - 16, lang)
  labels.push(text(8, y, lines, { fill: c.muted }))
  const height = Math.ceil(y + LEAD * (lines.length - 1) + 10)
  const arrow = (key, fill) => `<marker id="${id}-${key}" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="${fill}"/></marker>`
  const size = printed ? ` width="100mm" height="${n(height / 4)}mm"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}"${size} role="img" aria-labelledby="${id}-title">` +
    `<title id="${id}-title">${esc(words.title[lang])}</title><defs><g id="${id}-t"><circle r="4" fill="${c.paper}" stroke="${c.ink}" stroke-width="1.4"/><circle r="1.6" fill="${c.ink}"/></g>` +
    arrow('a', c.air) + arrow('w', c.wash) + `</defs><g stroke-linejoin="round" stroke-linecap="round">${art.join('')}</g>` +
    `<g font-family="${FONT}" font-size="${FS}" fill="${c.ink}" stroke="${c.paper}" stroke-width="3.5" paint-order="stroke">${labels.join('')}</g></svg>`
}

/** The figure as an SVG string. `state.clip` is 'A' or 'B' (samara) or 'on' or 'off' (tandem). */
export function figure(model, lang = 'en', state = {}) {
  return draw(model, lang, state, false)
}

/** Printed variant: 100 mm wide, black text, no controls, default state. */
export function printFigure(model, lang = 'en') {
  return draw(model, lang, {}, true)
}

/** Controls only where they match a real action: move the samara clip, add the tandem clip. */
export function figureControls(model, lang = 'en') {
  const control = controls[model]
  if (!control) return []
  return [{ name: control.name, label: control.label[lang], options: control.options.map(([value, label]) => ({ value, label: label[lang] })) }]
}

/** The text alternative, with the numbers behind the drawing. */
export function figureText(model, lang = 'en', state = {}) {
  const t = {
    ring: () => {
      const d = objectData.ring.letter, [a, b] = d.diameter_mm.map(Math.round)
      return {
        en: `Side view of the ring glider, rim forward and a little nose-up. Folded on the diagonal, a US Letter sheet gives a ring about ${a}–${b} mm across, with the two peaks about ${d.peak_separation_deg}° apart and a tail up to ${Math.round(d.skirt_at_peaks_mm)} mm long behind the rim. The two rim folds hold about ${Math.round(d.rim_paper_share * 100)}% of the paper, so the front is heavier. Our estimate puts the balance point about ${Math.round(d.balance_from_front_mm)} mm behind the front edge. The air pushes up on the ring behind that point. Inset: when the ring tips, the air on its tail pushes it back into line, like a shuttlecock. ${words.ring.honesty.en}`,
        es: `Vista lateral del planeador de anillo, con el borde delante y el morro un poco arriba. Doblada por la diagonal, una hoja Carta da un anillo de unos ${a}–${b} mm de diámetro, con los dos picos a unos ${d.peak_separation_deg}° y una cola de hasta ${Math.round(d.skirt_at_peaks_mm)} mm detrás del borde. Los dos pliegues del borde reúnen cerca del ${Math.round(d.rim_paper_share * 100)} % del papel, así que el frente pesa más. Según nuestra estimación, se equilibra a unos ${Math.round(d.balance_from_front_mm)} mm del borde delantero. El aire empuja el anillo hacia arriba detrás de ese punto. Detalle: si el anillo se inclina, el aire en la cola lo endereza, como a un volante de bádminton. ${words.ring.honesty.es}`,
        ru: `Кольцо сбоку: обод впереди, нос чуть приподнят. Лист US Letter, сложенный по диагонали, даёт кольцо диаметром около ${a}–${b} мм; два выступа расположены примерно в ${d.peak_separation_deg}° друг от друга, а хвост за ободом длиной до ${Math.round(d.skirt_at_peaks_mm)} мм. В двух сгибах обода около ${Math.round(d.rim_paper_share * 100)} % бумаги, поэтому перёд тяжелее. По нашей оценке, точка равновесия примерно в ${Math.round(d.balance_from_front_mm)} мм от передней кромки. Воздух давит на кольцо вверх позади этой точки. Врезка: если кольцо наклонится, воздух на хвосте вернёт его на курс, как волан. ${words.ring.honesty.ru}`,
      }
    },
    samara: () => {
      const d = objectData.samara, clip = state.clip === 'B' ? 'B' : 'A', r = d.balance[clip].from_root_mm
      return {
        en: `Three-quarter view of the paper maple seed spinning. The wing is ${Math.round(d.length_mm)} mm long and rises outward at a small cone angle around a vertical spin axis. With a 0.3 g clip on 80 g/m² paper, it spins around its balance point, about ${Math.round(r)} mm from the root (estimate). Mid-wing cut: spinning moves the wing sideways and falling brings air up, so the air meets the wing at a slant; a small whirl of air above the front edge, the leading-edge vortex, adds lift. Root cut: clip station A is ${dec(d.stations_mm.A, 'en')} mm from the front edge and B is ${dec(d.stations_mm.B, 'en')} mm; the clip is shown at ${clip}. ${words.samara.honesty.en}`,
        es: `Vista en tres cuartos de la semilla de arce de papel girando. El ala mide ${Math.round(d.length_mm)} mm y sube hacia fuera con un pequeño ángulo de cono alrededor de un eje de giro vertical. Con un clip de 0,3 g en papel de 80 g/m², gira alrededor de su punto de equilibrio, a unos ${Math.round(r)} mm de la base (estimación). Corte a media ala: al girar, el ala va de lado, y al caer, el aire sube, así que el aire le llega inclinado; un pequeño remolino sobre el borde delantero añade sustentación. Corte en la base: el punto A está a ${dec(d.stations_mm.A, 'es')} mm del borde delantero y el B a ${dec(d.stations_mm.B, 'es')} mm; el clip está en ${clip}. ${words.samara.honesty.es}`,
        ru: `Бумажная крылатка клёна в полёте, вид в три четверти. Крыло длиной ${Math.round(d.length_mm)} мм поднимается наружу под небольшим углом конуса вокруг вертикальной оси вращения. Со скрепкой 0,3 г на бумаге 80 г/м² крылатка вращается вокруг точки равновесия, примерно в ${Math.round(r)} мм от основания (оценка). Сечение посередине: при вращении крыло движется вбок, при падении воздух идёт снизу, поэтому воздух встречает крыло наискось; маленький вихрь над передней кромкой добавляет подъёмную силу. Сечение у основания: метка A в ${dec(d.stations_mm.A, 'ru')} мм от передней кромки, метка B в ${dec(d.stations_mm.B, 'ru')} мм; скрепка показана на ${clip}. ${words.samara.honesty.ru}`,
      }
    },
    tandem: () => {
      const d = objectData.tandem, clip = state.clip !== 'off', k = d.downwash
      const np = [k.at(-1).neutral_point, k[0].neutral_point].map(Math.round), g = [k[0].clip_g[0], k.at(-1).clip_g[1]]
      const b = Math.round(d.balance_paper_only)
      return {
        en: `Side view of the Williams tandem glider: nose roll, keel, front wings and back wings. Both pairs lift. Measured from the end of the printed blank, our estimate puts the lift point ${np[0]}–${np[1]} mm back and the paper-only balance point about ${b} mm back, which is tail-heavy. About ${g[0]}–${g[1]} g of clip near the nose would bring the balance ahead of the lift point. ${clip ? 'With the clip, the balance sits nearer the front wings and the front wings carry more of the weight.' : 'Paper only, the balance sits behind the lift point and the glider sinks.'} The front wings push air down onto the back wings. Tail view: raised tips roll the glider back to level. ${words.tandem.honesty.en}`,
        es: `Vista lateral del planeador tándem de Williams: morro enrollado, quilla, alas delanteras y traseras. Los dos pares sustentan. Medido desde el extremo de la plantilla impresa, estimamos el punto de sustentación a ${np[0]}–${np[1]} mm y el equilibrio solo con papel a unos ${b} mm, con la cola pesada. Unos ${dec(g[0], 'es')}–${dec(g[1], 'es')} g de clip cerca del morro llevarían el equilibrio por delante de la sustentación. ${clip ? 'Con el clip, el equilibrio queda cerca de las alas delanteras, que cargan más peso.' : 'Solo con papel, el equilibrio queda detrás de la sustentación y el planeador se hunde.'} Las alas delanteras empujan aire hacia abajo sobre las traseras. Vista desde atrás: con las puntas levantadas, vuelve a ponerse horizontal. ${words.tandem.honesty.es}`,
        ru: `Планер-тандем Уильямса сбоку: свёрнутый нос, киль, передние и задние крылья. Обе пары создают подъёмную силу. Если считать от края печатной заготовки, по нашей оценке точка подъёмной силы находится в ${np[0]}–${np[1]} мм, а равновесие без скрепки — примерно в ${b} мм: хвост тяжёлый. Около ${dec(g[0], 'ru')}–${dec(g[1], 'ru')} г скрепки у носа переносят равновесие впереди точки подъёмной силы. ${clip ? 'Со скрепкой равновесие ближе к передним крыльям, и они несут больше веса.' : 'Без скрепки равновесие позади точки подъёмной силы, и планер проседает.'} Передние крылья отбрасывают воздух вниз на задние. Вид сзади: приподнятые кончики возвращают планер в горизонталь. ${words.tandem.honesty.ru}`,
      }
    },
  }[model]
  if (!t) throw new RangeError('No object figure for ' + model)
  return t()[lang]
}
