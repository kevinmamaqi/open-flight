// Balance and trim, side view: the explanatory figure of the airplane plates A1–A4.
// It is drawn from numbers computed from each design's folds (airplane-balance.js), so it differs
// from design to design. Pure and deterministic: the same input always gives the same bytes.
// Spanish and Russian labels need a native read before release (Russian uses вы).
import { color, print } from '../../assets/brand/tokens.js?v=827c6a6b1e8f'
import { planeCatalog } from '../../assets/planes/catalog.js?v=827c6a6b1e8f'
import { airplaneBalance } from './airplane-balance.js?v=827c6a6b1e8f'

const languages = ['en', 'es', 'ru']
const paths = ['dives', 'glides', 'swoops']
const ruPlural = (n, one, few, many) => {
  const t = n % 10,
    h = n % 100
  return t === 1 && h !== 11 ? one : t >= 2 && t <= 4 && (h < 12 || h > 14) ? few : many
}
const words = {
  en: {
    title: 'Balance and trim, side view',
    paper: { A4: 'A4', US_LETTER: 'US Letter' },
    nose: 'nose',
    balances: (mm) => `Balances ${mm} mm from the nose`,
    lift: (a, b) => `Lift acts somewhere in ${a}–${b} mm (estimate)`,
    layers: (n) => `${n} layers of paper`,
    edges: (mm) => (mm ? `Back edges up ${mm} mm (drawn ×2)` : 'Back edges flat'),
    look: 'What to look for. Not a measurement.',
    paths: ['dives', 'glides', 'swoops and stalls'],
    why: {
      ahead: 'The balance point is ahead of the lift range, so the nose drops.',
      aheadUp: 'The balance point is ahead of the lift range. The bent-up back edges hold the nose up.',
      front: 'The balance point is in the front half of the lift range.',
      frontUp: 'The balance point is in the front half of the lift range. 2 mm up is too much here.',
      back: 'The balance point is behind the middle of the lift range, so the nose rises.',
      backUp: 'The balance point is behind the middle of the lift range. Bent-up back edges lift the nose even more: add a clip first.',
    },
    honesty: 'Balance point computed from the folds. Lift range estimated. Not yet measured.',
    controls: ['Paper clips on the nose', 'Back edges'],
    trim: (mm) => (mm ? `up ${mm} mm` : 'flat'),
    text: (d) =>
      `${d.name}: side view with the nose on the left, folded from ${d.paper}. ` +
      [`With no paper clips it balances ${d.b[0]} mm`, `With one paper clip on the nose it balances ${d.b[1]} mm`, `With two paper clips on the nose it balances ${d.b[2]} mm`][d.clips] +
      ` behind the nose. The air lifts it somewhere between ${d.lift[0]} and ${d.lift[1]} mm behind the nose (estimate). ` +
      `The nose has ${d.layers} layers of paper over the first ${d.layerTo} mm. ${d.edges}. ${d.why} Look for: ${d.path}. ` +
      (d.clips ? `Without clips it balances at ${d.b[0]} mm. ` : `One clip moves the balance point to ${d.b[1]} mm, two clips to ${d.b[2]} mm. `),
    sideScale: 'Side view at 1:2',
    rulerMark: 'balance point (estimate)',
    rulerNote: 'Put the nose on 0. Balance the plane on a pencil. It should balance near the mark.',
    rulerScale: 'Actual size: this ruler is 160 mm long when printed at 100%.',
  },
  es: {
    title: 'Equilibrio y ajuste, vista lateral',
    paper: { A4: 'A4', US_LETTER: 'Carta' },
    nose: 'morro',
    balances: (mm) => `Se equilibra a ${mm} mm del morro`,
    lift: (a, b) => `La sustentación actúa entre ${a} y ${b} mm (estimación)`,
    layers: (n) => `${n} capas de papel`,
    edges: (mm) => (mm ? `Bordes traseros ${mm} mm arriba (dibujado ×2)` : 'Bordes traseros planos'),
    look: 'Qué observar. No es una medición.',
    paths: ['cae en picado', 'planea', 'sube y se desploma'],
    why: {
      ahead: 'El punto de equilibrio está delante de la zona de sustentación, así que el morro baja.',
      aheadUp: 'El punto de equilibrio está delante de la zona de sustentación. Los bordes traseros doblados hacia arriba sostienen el morro.',
      front: 'El punto de equilibrio está en la mitad delantera de la zona de sustentación.',
      frontUp: 'El punto de equilibrio está en la mitad delantera de la zona de sustentación. Aquí, 2 mm hacia arriba es demasiado.',
      back: 'El punto de equilibrio está detrás del centro de la zona de sustentación, así que el morro sube.',
      backUp: 'El punto de equilibrio está detrás del centro de la zona de sustentación. Si doblas los bordes hacia arriba, el morro sube todavía más: pon antes un clip.',
    },
    honesty: 'Punto de equilibrio calculado a partir de los pliegues. Zona de sustentación estimada. Aún sin medir.',
    controls: ['Clips en el morro', 'Bordes traseros'],
    trim: (mm) => (mm ? `${mm} mm arriba` : 'planos'),
    text: (d) =>
      `${d.name}: vista lateral con el morro a la izquierda. Plegado con una hoja ${d.paper}. ` +
      [`Sin clips se equilibra a ${d.b[0]} mm`, `Con un clip en el morro se equilibra a ${d.b[1]} mm`, `Con dos clips en el morro se equilibra a ${d.b[2]} mm`][d.clips] +
      ` del morro. El aire lo sostiene en algún punto entre ${d.lift[0]} y ${d.lift[1]} mm del morro (estimación). ` +
      `El morro tiene ${d.layers} capas de papel en los primeros ${d.layerTo} mm. ${d.edges}. ${d.why} Qué observar: ${d.path}. ` +
      (d.clips ? `Sin clips se equilibra a ${d.b[0]} mm. ` : `Con un clip, el punto de equilibrio pasa a ${d.b[1]} mm; con dos, a ${d.b[2]} mm. `),
    sideScale: 'Vista lateral a escala 1:2',
    rulerMark: 'punto de equilibrio (estimación)',
    rulerNote: 'Pon el morro en el 0. Equilibra el avión sobre un lápiz. Debería equilibrarse cerca de la marca.',
    rulerScale: 'Tamaño real: esta regla mide 160 mm si se imprime al 100 %.',
  },
  ru: {
    title: 'Балансировка и настройка, вид сбоку',
    paper: { A4: 'A4', US_LETTER: 'US Letter' },
    nose: 'нос',
    balances: (mm) => `Точка равновесия: ${mm} мм от носа`,
    lift: (a, b) => `Подъёмная сила — где-то в ${a}–${b} мм (оценка)`,
    layers: (n) => `${n} ${ruPlural(n, 'слой', 'слоя', 'слоёв')} бумаги`,
    edges: (mm) => (mm ? `Задние кромки вверх на ${mm} мм (на рисунке ×2)` : 'Задние кромки ровные'),
    look: 'На что смотреть. Это не измерение.',
    paths: ['пикирует', 'планирует', 'взмывает и сваливается'],
    why: {
      ahead: 'Точка равновесия впереди зоны подъёмной силы, поэтому нос опускается.',
      aheadUp: 'Точка равновесия впереди зоны подъёмной силы. Отогнутые вверх задние кромки удерживают нос.',
      front: 'Точка равновесия в передней половине зоны подъёмной силы.',
      frontUp: 'Точка равновесия в передней половине зоны подъёмной силы. Здесь 2 мм вверх — уже слишком много.',
      back: 'Точка равновесия позади середины зоны подъёмной силы, поэтому нос задирается.',
      backUp: 'Точка равновесия позади середины зоны подъёмной силы. Отогнутые вверх кромки задирают нос ещё сильнее: сначала наденьте скрепку.',
    },
    honesty: 'Точка равновесия рассчитана по сгибам. Зона подъёмной силы — оценка. Ещё не измерено.',
    controls: ['Скрепки на носу', 'Задние кромки'],
    trim: (mm) => (mm ? `вверх на ${mm} мм` : 'ровно'),
    text: (d) =>
      `«${d.name}»: вид сбоку, нос слева. Самолёт сложен из листа ${d.paper}. ` +
      [`Без скрепок точка равновесия находится в ${d.b[0]} мм`, `С одной скрепкой на носу точка равновесия находится в ${d.b[1]} мм`, `С двумя скрепками на носу точка равновесия находится в ${d.b[2]} мм`][d.clips] +
      ` от носа. Воздух поддерживает модель где-то между ${d.lift[0]} и ${d.lift[1]} мм от носа (оценка). ` +
      `В носу ${d.layers} ${ruPlural(d.layers, 'слой', 'слоя', 'слоёв')} бумаги на первых ${d.layerTo} мм. ${d.edges}. ${d.why} На что смотреть: ${d.path}. ` +
      (d.clips ? `Без скрепок точка равновесия — ${d.b[0]} мм. ` : `С одной скрепкой точка равновесия сместится к ${d.b[1]} мм, с двумя — к ${d.b[2]} мм. `),
    sideScale: 'Вид сбоку в масштабе 1:2',
    rulerMark: 'точка равновесия (оценка)',
    rulerNote: 'Приложите нос к нулю. Положите самолёт на карандаш. Он должен балансировать рядом с отметкой.',
    rulerScale: 'Натуральная величина: при печати в масштабе 100% длина линейки 160 мм.',
  },
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const n1 = (v) => String(Math.round(v * 10) / 10)
const mm = (v) => Math.round(v)

function data(model, lang, paper = 'A4') {
  if (!languages.includes(lang)) throw new RangeError('Unknown figure language')
  const d = airplaneBalance[model]?.[paper]
  if (!d) throw new RangeError('No balance figure for ' + model + ' on ' + paper)
  return d
}
function choice(value, name) {
  const v = value === undefined || value === null || value === '' ? 0 : Number(value)
  if (![0, 1, 2].includes(v)) throw new RangeError('Unknown ' + name + ' setting')
  return v
}
const settings = (state = {}) => ({ clips: choice(state.clips, 'clips'), trim: choice(state.trim, 'trim'), paper: state.paper ?? 'A4' })
const nameOf = (model, lang) => planeCatalog.find((p) => p.model_id === model).name[lang]

/**
 * What to look for, by simple published rules. The lift range runs from a to b.
 * Balance ahead of the range: flat back edges dive; 1–2 mm up glides.
 * Balance in the front half: flat or 1 mm up glides; 2 mm up is too much for a glider and swoops.
 * Balance in the back half: swoops and stalls, whatever the back edges do.
 */
export function airplaneOutcome(d, clips = 0, trim = 0) {
  const x = d.balance[clips],
    [a, b] = d.lift
  if (x < a) return { zone: 'ahead', path: trim ? 'glides' : 'dives', why: trim ? 'aheadUp' : 'ahead' }
  if (x <= (a + b) / 2) return { zone: 'front', path: trim === 2 ? 'swoops' : 'glides', why: trim === 2 ? 'frontUp' : 'front' }
  return { zone: 'back', path: 'swoops', why: trim ? 'backUp' : 'back' }
}

// Greedy wrap by a generous average glyph width, so lines never overflow. Deterministic.
const glyph = 0.53
const textWidth = (value, size) => value.length * size * glyph
function wrap(value, size, width) {
  const max = Math.max(8, Math.floor(width / (size * glyph)))
  const out = []
  let line = ''
  for (const word of value.split(' ')) {
    if (line && (line + ' ' + word).length > max) {
      out.push(line)
      line = word
    } else line = line ? line + ' ' + word : word
  }
  if (line) out.push(line)
  return out
}
const text = (x, y, value, size, attrs = '') =>
  `<text x="${n1(x)}" y="${n1(y)}" font-size="${n1(size)}"${attrs}>${esc(value)}</text>`
/** Wrapped text; returns [svg, height]. */
function para(x, y, value, size, width, attrs = '', leading = 1.3) {
  const rows = wrap(value, size, width)
  return [rows.map((row, i) => text(x, y + i * size * leading, row, size, attrs)).join(''), rows.length * size * leading]
}
const head = (x, y, dir, s, fill) => `<path d="M${n1(x)} ${n1(y)}l${n1(-s * 0.6)} ${n1(-dir * s)}h${n1(s * 1.2)}z" fill="${fill}"/>`

/**
 * The side view and its ruler. Geometry is drawn at k units per millimetre with the nose at x0
 * and the wing line at y. Decorations scale with u (1 on screen, where the font is 9 units).
 * Rows are laid out for the deepest body (22 mm) so every design has the same height.
 */
function sideView(d, w, s, o) {
  const { k, x0, y, u, ink, left, right, clipsShown = true } = o
  const f = 9 * u
  const X = (v) => x0 + v * k
  const L = d.length,
    depth = d.keel * k
  const [a, b] = d.lift
  const balance = d.balance[s.clips]
  const bottom = y + 22 * k
  const out = []
  // Lift: a pale band over the estimated range, with an arrow in its middle.
  const top = y - 26 * u
  out.push(
    `<rect x="${n1(X(a))}" y="${n1(top)}" width="${n1((b - a) * k)}" height="${n1(y + depth + 6 * u - top)}" fill="${color.surfaceSelected}" stroke="${color.seriesA}" stroke-width="${n1(0.6 * u)}" stroke-dasharray="${n1(3 * u)} ${n1(2 * u)}"/>`,
  )
  const liftX = X((a + b) / 2)
  out.push(`<path d="M${n1(liftX)} ${n1(y - 3 * u)}V${n1(top + 4 * u)}" stroke="${color.seriesA}" stroke-width="${n1(1.8 * u)}"/>` + head(liftX, top + 0.5 * u, -1, 4 * u, color.seriesA))
  const liftLabel = w.lift(mm(a), mm(b))
  const lx = Math.min(Math.max(liftX - textWidth(liftLabel, f) / 2, left), right - textWidth(liftLabel, f))
  out.push(text(lx, top - 4 * u, liftLabel, f, ` fill="${color.seriesA}"`))
  // Body: the side of the folded keel below the wing line.
  const keel = d.body.map(([v, t]) => `${n1(X(v))} ${n1(y + t * k)}`).reverse()
  out.push(`<path d="M${n1(X(0))} ${n1(y)}H${n1(X(L))}L${keel.join('L')}Z" fill="${color.surface}" fill-opacity=".7" stroke="${ink}" stroke-width="${n1(0.75 * u)}"/>`)
  out.push(text(X(0) - 2 * u, y + 3 * u, w.nose, f * 0.85, ` text-anchor="end" fill="${color.textMuted}"`))
  // Paper layers along the spine, exaggerated: each layer is drawn 1.3 units thick.
  const t = 1.3 * u
  let stack = `M${n1(X(0))} ${n1(y)}`
  for (const [, to, count] of d.layers) stack += `V${n1(y - count * t)}H${n1(X(to))}`
  out.push(`<path d="${stack}V${n1(y)}Z" fill="${ink}" fill-opacity=".8"/>`)
  const thick = d.layers.reduce((m, r) => (r[2] > m[2] ? r : m))
  const layerLabel = w.layers(thick[2])
  out.push(text(Math.max(X((thick[0] + thick[1]) / 2) - textWidth(layerLabel, f * 0.85) / 2, left), y - thick[2] * t - 4 * u, layerLabel, f * 0.85))
  // Back edges: the last 15 mm of the wing, raised by the trim and drawn twice as high.
  const hinge = X(L - 15),
    rise = s.trim * 2 * k
  if (s.trim)
    out.push(
      `<path d="M${n1(hinge)} ${n1(y)}H${n1(X(L))}" stroke="${color.border}" stroke-width="${n1(0.6 * u)}" stroke-dasharray="${n1(u)} ${n1(u)}"/>` +
        `<path d="M${n1(X(L - 5))} ${n1(y - rise - 12 * u)}V${n1(y - rise - 3 * u)}" stroke="${color.mark}" stroke-width="${n1(1.2 * u)}"/>` +
        head(X(L - 5), y - rise - 1.5 * u, 1, 3 * u, color.mark),
    )
  out.push(`<path d="M${n1(hinge)} ${n1(y)}L${n1(X(L))} ${n1(y - rise)}" stroke="${color.mark}" stroke-width="${n1(2 * u)}" stroke-linecap="round"/>`)
  // Clips on the nose, 10 mm back.
  if (clipsShown)
    for (let i = 0; i < s.clips; i++)
      out.push(`<rect x="${n1(X(3) + i * 1.5 * u)}" y="${n1(y - 2.2 * u + i * 2.6 * u)}" width="${n1(13 * k)}" height="${n1(4 * u)}" rx="${n1(2 * u)}" fill="none" stroke="${ink}" stroke-width="${n1(0.7 * u)}"/>`)
  // Balance point: the quartered symbol and the weight arrow.
  const cx = X(balance),
    cy = y + depth / 2,
    r = 3.8 * u,
    drop = bottom + 15 * u
  out.push(
    `<circle cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(r)}" fill="${color.surface}" stroke="${ink}" stroke-width="${n1(0.75 * u)}"/>` +
      `<path d="M${n1(cx)} ${n1(cy - r)}A${n1(r)} ${n1(r)} 0 0 1 ${n1(cx + r)} ${n1(cy)}H${n1(cx)}ZM${n1(cx)} ${n1(cy + r)}A${n1(r)} ${n1(r)} 0 0 1 ${n1(cx - r)} ${n1(cy)}H${n1(cx)}Z" fill="${ink}"/>` +
      `<path d="M${n1(cx)} ${n1(cy + r)}V${n1(drop - 3 * u)}" stroke="${ink}" stroke-width="${n1(1.8 * u)}"/>` +
      head(cx, drop, 1, 4 * u, ink),
  )
  if (s.trim) {
    // A bent-up back edge pushes the tail down and the nose up: a clockwise arrow, nose on the left.
    const R = r + 5.5 * u,
      ex = cx + R * 0.87,
      ey = cy - R * 0.5
    out.push(
      `<path d="M${n1(cx - R * 0.87)} ${n1(ey)}A${n1(R)} ${n1(R)} 0 0 1 ${n1(ex)} ${n1(ey)}" fill="none" stroke="${color.mark}" stroke-width="${n1(1.3 * u)}"/>` +
        `<path d="M${n1(ex + 2.8 * u)} ${n1(ey - 1.8 * u)}l${n1(-1.6 * u)} ${n1(5.4 * u)}l${n1(-4.4 * u)} ${n1(-3.2 * u)}z" fill="${color.mark}"/>`,
    )
  }
  const label = w.balances(mm(balance))
  const fits = cx + 5 * u + textWidth(label, f) < right
  out.push(text(fits ? cx + 5 * u : cx - 5 * u, drop, label, f, `${fits ? '' : ' text-anchor="end"'} font-weight="700"`))
  // The back-edge label sits on its own row, under the tail.
  const edgeRow = drop + 12 * u
  out.push(text(X(L), edgeRow, w.edges(s.trim), f * 0.9, ` text-anchor="end" fill="${color.textAccent}"`))
  // Ruler from the nose to the tail, 10 mm ticks.
  const ry = edgeRow + 11 * u
  let ticks = ''
  for (let v = 0; v <= L; v += 10) ticks += `M${n1(X(v))} ${n1(ry)}v${n1((v % 50 ? 2.5 : 5) * u)}`
  let marks = ''
  for (let v = 0; v <= L; v += 50) marks += text(X(v), ry + 13 * u, String(v), f * 0.85, ' text-anchor="middle"')
  out.push(
    `<path d="M${n1(X(0))} ${n1(ry)}H${n1(X(L))}${ticks}" stroke="${ink}" stroke-width="${n1(0.6 * u)}" fill="none"/>` +
      marks +
      text(right, ry + 13 * u, 'mm · ' + w.paper[s.paper], f * 0.85, ` text-anchor="end" fill="${color.textMuted}"`),
  )
  return [out.join(''), ry + 13 * u]
}

// Three small side views of a flight on a floor line, in a 92 × 34 cell at u = 1.
const flightPaths = {
  dives: 'M4 8C24 8 34 12 42 30',
  glides: 'M4 8L84 26',
  swoops: 'M4 12C16 12 22 0 32 2S38 15 48 16S56 6 64 9S74 22 78 30',
}
function lookFor(w, outcome, x0, y, u, ink) {
  let out = text(x0, y, w.look, 9 * u, ' font-weight="700"')
  paths.forEach((id, i) => {
    const on = outcome.path === id
    out +=
      `<g transform="translate(${n1(x0 + i * 98 * u)} ${n1(y + 6 * u)}) scale(${n1(u * 1000) / 1000})">` +
      (on ? `<rect width="92" height="48" rx="3" fill="none" stroke="${ink}"/>` : '') +
      `<path d="M2 31H90" stroke="${color.rule}"/>` +
      `<path d="${flightPaths[id]}" fill="none" stroke="${on ? ink : color.border}" stroke-width="${on ? 1.8 : 1}"${on ? '' : ' stroke-dasharray="2 2"'}/>` +
      text(46, 42, w.paths[i], 9, ` text-anchor="middle"${on ? ' font-weight="700"' : ` fill="${color.textMuted}"`}`) +
      '</g>'
  })
  return [out, 6 * u + 48 * u]
}

const svgOpen = (attrs, lang) =>
  `<svg xmlns="http://www.w3.org/2000/svg" ${attrs} role="img" lang="${lang}" font-family="'Open Flight Text', Andika, system-ui, sans-serif"`

/** The balance-and-trim figure for a design page. `state`: { clips: 0–2, trim: 0–2 (mm), paper }. */
export function figure(model, lang, state = {}) {
  const s = settings(state)
  const d = data(model, lang, s.paper),
    w = words[lang]
  const outcome = airplaneOutcome(d, s.clips, s.trim)
  const W = 320,
    ink = color.text,
    x0 = 26
  const [side, sideEnd] = sideView(d, w, s, { k: 0.88, x0, y: 50, u: 1, ink, left: 6, right: W - 6 })
  const stripY = sideEnd + 20
  const [strip, stripH] = lookFor(w, outcome, x0, stripY, 1, ink)
  const [why, whyH] = para(x0, stripY + stripH + 14, w.why[outcome.why], 9, W - x0 - 10)
  const honestY = stripY + stripH + 14 + whyH + 6
  const [honest, honestH] = para(x0, honestY, w.honesty, 8.1, W - x0 - 10, ` fill="${color.textMuted}"`)
  const H = Math.ceil(honestY + honestH - 2)
  return (
    svgOpen(`viewBox="0 0 ${W} ${H}"`, lang) +
    ` fill="${ink}" data-clips="${s.clips}" data-trim="${s.trim}">` +
    `<title>${esc(w.title + ': ' + nameOf(model, lang))}</title>` +
    `<rect width="${W}" height="${H}" fill="${color.surfaceStage}"/>` +
    side +
    strip +
    why +
    honest +
    '</svg>'
  )
}

/** The two controls, both real actions on paper. Values are numbers; labels are words. */
export function figureControls(model, lang) {
  data(model, lang)
  const w = words[lang]
  return [
    { name: 'clips', label: w.controls[0], options: [0, 1, 2].map((value) => ({ value, label: String(value) })) },
    { name: 'trim', label: w.controls[1], options: [0, 1, 2].map((value) => ({ value, label: w.trim(value) })) },
  ]
}

/** The text alternative, with the numbers. */
export function figureText(model, lang, state = {}) {
  const s = settings(state)
  const d = data(model, lang, s.paper),
    w = words[lang]
  const outcome = airplaneOutcome(d, s.clips, s.trim)
  const nose = d.layers.find((r) => r[2] > 1) ?? d.layers[0]
  return (
    w.text({
      name: nameOf(model, lang),
      paper: w.paper[s.paper],
      clips: s.clips,
      b: d.balance.map(mm),
      lift: d.lift.map(mm),
      layers: nose[2],
      layerTo: mm(nose[1]),
      edges: w.edges(s.trim).replace(/ \([^)]*×2\)/, ''),
      why: w.why[outcome.why],
      path: w.paths[paths.indexOf(outcome.path)],
    }) + w.honesty
  )
}

/**
 * The print variant for the book: no controls, the default state, sized in millimetres for a
 * 170 mm measure. The side view is at 1:2. With `ruler` (the default), a 1:1 balance ruler from 0
 * to 160 mm follows; every design balances within it. Print at 100%.
 */
export function figurePrint(model, lang, { paper = 'A4', ruler = true } = {}) {
  const s = settings({ paper })
  const d = data(model, lang, paper),
    w = words[lang]
  const outcome = airplaneOutcome(d, 0, 0)
  const W = 170,
    ink = print.ink,
    u = print.text.min / 72 * 25.4 / 9, // 9 pt type, in millimetres
    f = 9 * u,
    x0 = 8
  const [side, sideEnd] = sideView(d, w, s, { k: 0.5, x0, y: 12, u, ink, left: 1, right: W - 1, clipsShown: false })
  let y = sideEnd + 6 * u
  let body = side + text(x0, y, w.sideScale, f * 0.9, ` fill="${print.muted}"`)
  y += 16 * u
  const [strip, stripH] = lookFor(w, outcome, x0, y, u, ink)
  y += stripH + 12 * u
  const [why, whyH] = para(x0, y, w.why[outcome.why], f, W - 2 * x0)
  body += strip + why
  y += whyH + 6 * u
  if (ruler) {
    const r0 = 5,
      top = y + f * 1.4
    let ticks = ''
    for (let v = 0; v <= 160; v++) ticks += `M${r0 + v} ${n1(top)}v${v % 10 ? (v % 5 ? 1.5 : 2.5) : 4}`
    let marks = ''
    for (let v = 0; v <= 160; v += 10) marks += text(r0 + v, top + 4 + f, String(v), f * 0.9, ' text-anchor="middle"')
    const mark = r0 + d.balance[0],
      label = mm(d.balance[0]) + ' mm · ' + w.rulerMark
    const fits = mark + 2.4 + textWidth(label, f) < W - 1
    const [note, noteH] = para(r0, top + 4 + f * 2.6, w.rulerNote, f, 160)
    body +=
      text(r0, top - f * 0.45, w.nose, f, ' font-weight="700"') +
      `<path d="M${r0} ${n1(top)}H${r0 + 160}${ticks}" stroke="${ink}" stroke-width="${print.line.fold}" fill="none"/>` +
      marks +
      `<path d="M${n1(mark)} ${n1(top - 0.4)}l-1.7 -3.2h3.4z" fill="${ink}"/>` +
      text(fits ? mark + 2.4 : mark - 2.4, top - f * 0.45, label, f, `${fits ? '' : ' text-anchor="end"'} font-weight="700"`) +
      note +
      text(r0, top + 4 + f * 2.6 + noteH, w.rulerScale, f * 0.9, ` fill="${print.muted}"`)
    y = top + 4 + f * 2.6 + noteH + f * 1.6
  }
  const [honest, honestH] = para(x0, y, w.honesty, f * 0.9, W - 2 * x0, ` fill="${print.muted}"`)
  const H = Math.ceil(y + honestH)
  return (
    svgOpen(`width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}"`, lang) +
    ` fill="${ink}">` +
    `<title>${esc(w.title + ': ' + nameOf(model, lang))}</title>` +
    body +
    honest +
    '</svg>'
  )
}
