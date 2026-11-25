import { brandMark, calibration, fontNotice as printFontNotice, ink, lineStyle, muted, registerFonts, textMm, useFont, atLeastLine, atLeastText } from '../../apps/editor/assets/brand/print.js'
import type { PrintLabel } from '../print-export/sheets.ts'
import { printFonts } from '../print-export/fonts.ts'
// Printable sheet for the experimental K2 "costa" butterfly. Page 1 is the cut sheet in
// landscape, so the wingspan runs along the long side of the paper (the stiffer grain direction
// of most office and laser paper). Page 2 is its back face for double-sided printing and page 3
// shows the build, balance and trim steps.

import { jsPDF } from 'jspdf'
import { rounded, sha256, type Drawing, type Line, type Point } from '../geometry/butterfly.ts'
import { toPaper, trimGeometry } from '../geometry/workshop-art.ts'
import { svg } from '../print-export/sheets.ts'
import { backFaceWords, printSafeMm } from '../../apps/editor/assets/print-faces.js'
import type { Species } from '../geometry/workshop-models.ts'
import {
  estimateFlight,
  hemWidthAt,
  k2Art,
  k2Outline,
  k2Poses,
  papers,
  type FlightEstimate,
  type K2Outline,
} from './k2-airframe.ts'

export type K2Paper = 'A4' | 'US_LETTER'
export type K2Locale = 'en' | 'es' | 'ru'
export type K2Settings = {
  species?: Species
  span_mm?: number
  appearance_id?: 'natural' | 'carnival' | 'twilight' | 'coloring'
  paper?: K2Paper
  locale?: K2Locale
}

const pageSize: Record<K2Paper, [number, number]> = { A4: [297, 210], US_LETTER: [279.4, 215.9] }
const bodyDepth = 8
const clipCentreFromNose = 13 // a 33 mm clip pushed fully onto the nose
const recommended = { paper: '120', clips: 2, clip_g: 0.5 }
export const k2SpanRange = { minimum: 148, maximum: 184, step: 2 }
const spanRange = k2SpanRange

// Paper conventions (tokens.css via brand/print.js): valley dashed, mountain dash-dot, cut solid.
const dark = ink
const centerInk = lineStyle.valley.stroke
const wingInk = lineStyle.mountain.stroke
const costaInk = ink
const clipInk = ink
const halo = '#FFFFFF'
const hemFill = '#FFFFFF'
const valleyDash = lineStyle.valley.dash
const mountainDash = lineStyle.mountain.dash

export type K2Plan = Required<K2Settings> & {
  outline: K2Outline
  keel_depth_mm: number
  nose_y_mm: number
  wing_root_y_mm: number
  tail_y_mm: number
  balance_from_nose_mm: number
  dihedral_deg: number
  tip_height_mm: number
  prediction: FlightEstimate
  evidence: 'experimental_unvalidated'
}

export function makeK2(settings: K2Settings = {}): K2Plan {
  const species = settings.species ?? 'monarch'
  if (!Object.hasOwn(k2Poses, species)) throw new Error('Unknown butterfly species')
  const span_mm = settings.span_mm ?? k2Poses[species].span_mm
  const { minimum, maximum, step } = spanRange
  if (!Number.isInteger(span_mm) || span_mm < minimum || span_mm > maximum || (span_mm - minimum) % step)
    throw new Error(`Finished span must be from ${minimum} to ${maximum} mm in ${step} mm increments`)
  const paper = settings.paper ?? 'A4'
  if (!Object.hasOwn(pageSize, paper)) throw new Error('Unknown paper size')
  const locale = settings.locale ?? 'en'
  if (!Object.hasOwn(words, locale)) throw new Error('Unknown print locale')
  const appearance_id = settings.appearance_id ?? 'natural'
  const outline = k2Outline(species, span_mm)
  if (!Object.hasOwn(outline.model.palettes, appearance_id)) throw new Error('Unknown butterfly appearance')
  const g = outline.model.geometry
  const prediction = predict(outline, papers[recommended.paper], recommended.clips * recommended.clip_g)
  const dihedral = g.target_dihedral_deg
  return {
    species,
    span_mm,
    appearance_id,
    paper,
    locale,
    outline,
    keel_depth_mm: bodyDepth,
    nose_y_mm: g.nose_y,
    wing_root_y_mm: g.fore_root_y,
    tail_y_mm: g.abdomen_y,
    balance_from_nose_mm: Math.round(prediction.balance_target_y - g.nose_y),
    dihedral_deg: dihedral,
    tip_height_mm: Math.round((span_mm / 2) * Math.sin((dihedral * Math.PI) / 180)),
    prediction,
    evidence: 'experimental_unvalidated',
  }
}

export function predict(o: K2Outline, paper = papers['120'], clip_g = 1.0, grain_along_span = true) {
  const g = o.model.geometry
  const flat = o.cut.map(([x, y]): Point => [x === 0 ? 0 : x + Math.sign(x) * bodyDepth, y])
  return estimateFlight({
    top: o.top,
    flat,
    root_x_mm: o.root[0],
    paper,
    grain_along_span,
    clip_g,
    clip_center_y: g.nose_y + clipCentreFromNose,
    target_margin: 0.1,
    hem: { polygon: o.hem.right, width_at: (x) => hemWidthAt(o, x) },
    costa: o.costa,
  })
}

// Split a finished-view art line at the centre so each half travels with its own wing.
function artHalf(line: Line, side: number): Point[][] {
  const points = line.points
  const inside = ([x]: Point) => x * side >= 0
  if (points.every(inside)) return [points]
  if (!points.some(([x]) => x * side > 0)) return []
  const crossing = ([x, y]: Point, [u, v]: Point): Point => [0, rounded(y - ((v - y) * x) / (u - x))]
  if (line.closed) {
    const clipped = points.flatMap((b, i) => {
      const a = points[(i + points.length - 1) % points.length]
      const edge = inside(a) === inside(b) ? [] : [crossing(a, b)]
      if (inside(b)) edge.push(b)
      return edge
    })
    return clipped.length >= 3 ? [clipped] : []
  }
  const pieces: Point[][] = []
  let current = inside(points[0]) ? [points[0]] : []
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1],
      b = points[i]
    if (inside(a) !== inside(b)) {
      current.push(crossing(a, b))
      if (!inside(b)) {
        if (current.length > 1) pieces.push(current)
        current = []
      }
    }
    if (inside(b)) current.push(b)
  }
  if (current.length > 1) pieces.push(current)
  return pieces
}

function circle(cx: number, cy: number, r: number, n = 20): Point[] {
  return Array.from({ length: n }, (_, i): Point => [
    rounded(cx + r * Math.cos((i / n) * 2 * Math.PI)),
    rounded(cy + r * Math.sin((i / n) * 2 * Math.PI)),
  ])
}

// Flat sheet in paper millimetres with the body centre on x = 0 and the nose at nose_y.
export function k2Flat(plan: K2Plan) {
  const o = plan.outline
  const d = plan.keel_depth_mm
  const nose = plan.nose_y_mm,
    tail = plan.tail_y_mm
  const shift =
    (side: number) =>
    ([x, y]: Point): Point => [rounded(x + side * d), y]
  const halfEnd = o.cut.findIndex(([x], i) => i > 0 && x === 0)
  const rightCut = o.cut.slice(0, halfEnd + 1).map(shift(1))
  const leftCut = o.cut
    .slice(0, halfEnd + 1)
    .map(([x, y]): Point => [-x, y])
    .reverse()
    .map(shift(-1))
  const outline = [...rightCut, ...leftCut]
  const topEnd = o.top.findIndex(([x], i) => i > 0 && x === 0)
  const rightTop = o.top.slice(0, topEnd + 1)
  const right = rightTop.map(shift(1))
  const left = rightTop.map(([x, y]): Point => [-x, y]).map(shift(-1))

  const art = k2Art(o, plan.appearance_id)
  const lines: Line[] = [
    {
      id: 'paper-web',
      points: [
        [-d, nose],
        [d, nose],
        [d, tail],
        [-d, tail],
      ],
      closed: true,
      fill: '#FFFFFF',
    },
    ...[1, -1].map((side) => ({
      id: side > 0 ? 'hem-right' : 'hem-left',
      points: (side > 0 ? o.hem.right : o.hem.left).map(shift(side)),
      closed: true,
      fill: hemFill,
    })),
    { ...art[0], id: 'wing-background', points: right, stroke: undefined },
    { ...art[0], id: 'wing-background-left', points: [...left].reverse(), stroke: undefined },
  ]
  for (const line of art.slice(1)) {
    for (const side of [-1, 1]) {
      for (const [index, points] of artHalf(line, side).entries()) {
        lines.push({ ...line, id: line.id + (side < 0 ? '-l-' : '-r-') + index, points: points.map(shift(side)) })
      }
    }
  }

  // Folds. Viewed from the printed side: the centre is a valley, the wing roots and the hem
  // lines are mountains (the hem goes behind the wing).
  const creases: Line[] = [
    { id: 'center-valley', points: [[0, nose], [0, tail]], dash: valleyDash, stroke: centerInk, weight: 0.46 },
    ...[1, -1].map((side) => ({
      id: side > 0 ? 'right-root-mountain' : 'left-root-mountain',
      points: [[side * d, nose], [side * d, tail]] as Point[],
      dash: mountainDash,
      stroke: wingInk,
      weight: 0.46,
    })),
    ...[1, -1].map((side) => {
      const m = ([x, y]: Point): Point => [side * x, y]
      return {
        id: side > 0 ? 'right-costa-hem' : 'left-costa-hem',
        points: [m(o.root), m(o.hemEnd)].map(shift(side)),
        dash: mountainDash,
        stroke: costaInk,
        weight: 0.5,
      }
    }),
  ]

  // Trim tabs on the hindwings: two short slits each and a hinge line between their ends.
  const trim = trimGeometry(o.model, o.shape.trailing)
  const tabs: Line[] = []
  for (const side of [1, -1]) {
    const p = (q: Point) => shift(side)(toPaper(q, o.span_mm, side))
    const name = side > 0 ? 'right' : 'left'
    for (const i of [0, 1])
      tabs.push({ id: `${name}-tab-slit-${i}`, points: [p(trim.ends[i]), p(trim.hinges[i])], stroke: dark, weight: 0.52 })
    tabs.push({
      id: `${name}-tab-hinge`,
      points: [p(trim.hinges[0]), p(trim.hinges[1])],
      dash: valleyDash,
      stroke: wingInk,
      weight: 0.42,
    })
  }

  // Clip zone on the body walls: from the nose back to just ahead of the wing root.
  const clipBack = plan.wing_root_y_mm - 3
  const clip: Line[] = [1, -1].map((side) => ({
    id: side > 0 ? 'right-clip-zone' : 'left-clip-zone',
    points: [
      [side * 1.4, nose + 1.5],
      [side * (d - 1.4), nose + 1.5],
      [side * (d - 1.4), clipBack],
      [side * 1.4, clipBack],
    ] as Point[],
    closed: true,
    stroke: clipInk,
    weight: 0.4,
    dash: [1.2, 0.8],
  }))

  // Balance dots: fingertips go under these when the butterfly is finished.
  const by = rounded(nose + plan.balance_from_nose_mm)
  const bx = d + o.root[0] + 12
  const balance: Line[] = []
  for (const side of [1, -1]) {
    balance.push(
      { id: `balance-ring-${side}`, points: circle(side * bx, by, 2.2), closed: true, fill: halo, stroke: clipInk, weight: 0.55 },
      { id: `balance-dot-${side}`, points: circle(side * bx, by, 0.8, 12), closed: true, fill: clipInk },
    )
  }

  const marks = [...creases, ...tabs.filter((t) => t.dash), ...clip]
  for (const line of marks) {
    lines.push({ ...line, id: line.id + '-halo', weight: 1.2, stroke: halo, dash: undefined, fill: undefined, closed: false }, line)
  }
  lines.push(...tabs.filter((t) => !t.dash), ...balance)
  lines.push({ id: 'cut', points: outline, closed: true, stroke: dark, weight: 0.52 })
  return { outline, lines, creases, tabs, clip, balance, balance_y: by }
}

// ---------------------------------------------------------------------------------------
// Words. Left and right are seen from the tail looking toward the nose.

type Words = {
  names: Record<Species, string>
  note: string
  span: string
  print: string
  legend: [string, string, string, string, string, string]
  paperTitle: string
  paper: (gsm: string) => string
  grain: string
  clips: (n: number) => string
  strip: string
  stripLine: string
  stripHelp: (mm: number) => string
  guide: string
  steps: { title: string; action: string; check: string }[]
  predicted: (p: K2Plan) => string
}

const words: Record<K2Locale, Words> = {
  en: {
    names: { monarch: 'Monarch', morpho: 'Blue morpho', swallowtail: 'Swallowtail' },
    note: 'K2 costa glider · Experimental · Flight not yet tested on paper',
    span: 'finished span',
    print: 'Print at 100% / actual size, landscape. Measure this line before cutting.',
    legend: ['Cut', 'Center valley', 'Wing and costa mountains', 'Edge strip folds under', 'Clip zone', 'Balance dot'],
    paperTitle: 'Paper and clips',
    paper: (gsm) => `${gsm} g/m² uncoated printer paper or light card (100–140 works).`,
    grain: 'The wings run along the long side of the sheet. Most office paper is stiffer that way.',
    clips: (n) => `${n} standard metal paper clips, 33 mm long.`,
    strip: 'Tip-height strip',
    stripLine: 'wingtip',
    stripHelp: (mm) => `Cut out. Stand it on the table beside a wingtip. ${mm} mm above the body.`,
    guide: 'Build, balance and trim',
    steps: [
      {
        title: 'Cut',
        action: 'Cut the outside line, including the edge strips and the antenna clubs. Cut the four short slits at the back of the hindwings.',
        check: 'One piece. Each hindwing has a tab between two slits.',
      },
      {
        title: 'Score',
        action: 'Lay a ruler on each dashed line and press along it with an empty ballpoint pen.',
        check: 'Every fold line shows a groove. Thick paper now folds cleanly.',
      },
      {
        title: 'Fold the costa',
        action: 'Fold each edge strip under its wing along its dashed line. Press it flat.',
        check: 'The front edge is straight and doubled, like the costa vein of a real wing.',
      },
      {
        title: 'Fold the body',
        action: 'Fold in half on the dashed centre line, colors inside. Then fold each wing back out on its dash-dot line.',
        check: 'The two body layers hang underneath and touch.',
      },
      {
        title: 'Clip the head',
        action: 'Slide both clips onto the head over the two body layers, one on top of the other, all the way to the nose.',
        check: 'The clips stay inside the dashed clip box.',
      },
      {
        title: 'Balance',
        action: 'Rest the wings on two fingertips under the ringed dots. Tail drops: add a clip. Nose drops: slide a clip back, or remove one.',
        check: 'It stays level on your fingers.',
      },
      {
        title: 'Set the V',
        action: 'Lift both wings into a shallow V. Look from the tail and compare each wingtip with the strip.',
        check: 'Both tips are the same height.',
      },
      {
        title: 'Launch and trim',
        action: 'Push it gently forward, nose level, at walking speed. Dives: bend both tabs up 1–2 mm. Swoops up and stalls: flatten them.',
        check: 'Turns left: bend the right tab up a little. Turns right: the left tab.',
      },
    ],
    predicted: (p) =>
      `Estimate for ${p.span_mm} mm on 120 g/m² with two clips: balance ${p.balance_from_nose_mm} mm behind the nose, glide about ${p.prediction.glide_speed_m_s.toFixed(1)} m/s. Not yet measured.`,
  },
  es: {
    names: { monarch: 'Monarca', morpho: 'Morfo azul', swallowtail: 'Cola de golondrina' },
    note: 'Planeador K2 con costa · Experimental · Vuelo aún sin probar en papel',
    span: 'envergadura final',
    print: 'Imprime al 100 % en tamaño real y en horizontal. Mide esta línea antes de recortar.',
    legend: ['Corte', 'Doblez central', 'Dobleces de alas y costa', 'La tira del borde va debajo', 'Zona del clip', 'Punto de equilibrio'],
    paperTitle: 'Papel y clips',
    paper: (gsm) => `Papel de impresora sin estucar de ${gsm} g/m² o cartulina ligera (sirve de 100 a 140).`,
    grain: 'Las alas van a lo largo del lado largo de la hoja. Casi todo el papel de oficina es más rígido en esa dirección.',
    clips: (n) => `${n} clips metálicos normales de 33 mm.`,
    strip: 'Tira de altura',
    stripLine: 'punta del ala',
    stripHelp: (mm) => `Recórtala. Ponla de pie en la mesa junto a una punta del ala. ${mm} mm sobre el cuerpo.`,
    guide: 'Construir, equilibrar y ajustar',
    steps: [
      {
        title: 'Recorta',
        action: 'Recorta la línea exterior, con las tiras del borde y las puntas de las antenas. Corta las cuatro ranuras cortas de las alas traseras.',
        check: 'Es una sola pieza. Cada ala trasera tiene una aleta entre dos ranuras.',
      },
      {
        title: 'Marca los dobleces',
        action: 'Apoya una regla en cada línea discontinua y repásala con un bolígrafo sin tinta.',
        check: 'Cada doblez tiene un surco. El papel grueso se dobla limpio.',
      },
      {
        title: 'Dobla la costa',
        action: 'Dobla cada tira del borde debajo de su ala por su línea de trazos. Aplánala bien.',
        check: 'El borde delantero queda recto y doble, como la vena costal de un ala real.',
      },
      {
        title: 'Dobla el cuerpo',
        action: 'Dobla por la mitad en la línea central de trazos, con los colores dentro. Luego dobla cada ala hacia fuera por su línea de trazo y punto.',
        check: 'Las dos capas del cuerpo cuelgan debajo y se tocan.',
      },
      {
        title: 'Pon los clips en la cabeza',
        action: 'Desliza los dos clips sobre las dos capas del cuerpo, uno encima del otro, hasta la punta.',
        check: 'Los clips quedan dentro del recuadro de trazos.',
      },
      {
        title: 'Equilibra',
        action: 'Apoya las alas en dos dedos bajo los puntos con anillo. Si cae la cola, añade un clip. Si cae la cabeza, retrasa un clip o quítalo.',
        check: 'Se queda horizontal sobre tus dedos.',
      },
      {
        title: 'Forma la V',
        action: 'Sube las dos alas en una V suave. Mira desde la cola y compara cada punta con la tira.',
        check: 'Las dos puntas están a la misma altura.',
      },
      {
        title: 'Lanza y ajusta',
        action: 'Empújala suavemente hacia delante, con la punta recta, a paso de caminar. Si cae en picado, sube las dos aletas 1–2 mm. Si sube y se frena, aplánalas.',
        check: 'Gira a la izquierda: sube un poco la aleta derecha. Gira a la derecha: la izquierda.',
      },
    ],
    predicted: (p) =>
      `Estimación para ${p.span_mm} mm en 120 g/m² con dos clips: equilibrio a ${p.balance_from_nose_mm} mm de la punta, unos ${p.prediction.glide_speed_m_s.toFixed(1)} m/s. Aún sin medir.`,
  },
  ru: {
    names: { monarch: 'Монарх', morpho: 'Голубой морфо', swallowtail: 'Махаон' },
    note: 'Планер K2 с костальной жилкой · Опытная модель · Полёт на бумаге ещё не проверен',
    span: 'размах крыльев',
    print: 'Печатай в масштабе 100%, альбомная ориентация. Перед вырезанием измерь эту линию.',
    legend: ['Разрез', 'Сгиб в центре', 'Сгибы крыльев и края', 'Полоска края уходит вниз', 'Зона скрепок', 'Точка баланса'],
    paperTitle: 'Бумага и скрепки',
    paper: (gsm) => `Бумага для принтера ${gsm} г/м² без покрытия или тонкий картон (подойдёт 100–140).`,
    grain: 'Крылья идут вдоль длинной стороны листа. Офисная бумага обычно жёстче в этом направлении.',
    clips: (n) => `${n} обычные металлические скрепки длиной 33 мм.`,
    strip: 'Полоска высоты',
    stripLine: 'кончик крыла',
    stripHelp: (mm) => `Вырежи. Поставь на стол рядом с кончиком крыла. ${mm} мм выше корпуса.`,
    guide: 'Сборка, баланс и настройка',
    steps: [
      {
        title: 'Вырежи',
        action: 'Вырежи по внешней линии, вместе с полосками края и булавами усиков. Сделай четыре коротких надреза сзади на задних крыльях.',
        check: 'Одна деталь. На каждом заднем крыле есть закрылок между двумя надрезами.',
      },
      {
        title: 'Продави сгибы',
        action: 'Приложи линейку к каждой пунктирной линии и проведи по ней пустой шариковой ручкой.',
        check: 'На каждой линии сгиба есть бороздка. Плотная бумага сгибается ровно.',
      },
      {
        title: 'Согни край крыла',
        action: 'Загни каждую полоску края под крыло по её пунктирной линии. Прижми.',
        check: 'Передний край прямой и двойной, как костальная жилка настоящего крыла.',
      },
      {
        title: 'Согни корпус',
        action: 'Согни пополам по центральной пунктирной линии, цветом внутрь. Затем отогни каждое крыло наружу по его штрихпунктирной линии.',
        check: 'Два слоя корпуса висят снизу и касаются друг друга.',
      },
      {
        title: 'Надень скрепки на голову',
        action: 'Надень обе скрепки на два слоя корпуса, одну поверх другой, до самого носа.',
        check: 'Скрепки находятся внутри пунктирной рамки.',
      },
      {
        title: 'Проверь баланс',
        action: 'Положи крылья на два пальца под точками в кружках. Хвост опускается: добавь скрепку. Нос опускается: сдвинь скрепку назад или сними её.',
        check: 'Бабочка держится ровно на пальцах.',
      },
      {
        title: 'Сделай букву V',
        action: 'Подними оба крыла в неглубокую V. Посмотри с хвоста и сравни каждый кончик с полоской.',
        check: 'Оба кончика на одной высоте.',
      },
      {
        title: 'Запуск и настройка',
        action: 'Мягко толкни вперёд, нос ровно, со скоростью шага. Пикирует: подними оба закрылка на 1–2 мм. Взмывает и зависает: выпрями их.',
        check: 'Поворачивает влево: чуть подними правый закрылок. Вправо: левый.',
      },
    ],
    predicted: (p) =>
      `Оценка для ${p.span_mm} мм на 120 г/м² с двумя скрепками: баланс в ${p.balance_from_nose_mm} мм от носа, около ${p.prediction.glide_speed_m_s.toFixed(1)} м/с. Ещё не измерено.`,
  },
}

function wrap(text: string, limit: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? line + ' ' + word : word
    if (line && next.length > limit) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

function placed(lines: Line[], x0: number, y0: number, scale = 1): Line[] {
  return lines.map((line) => ({
    ...line,
    points: line.points.map(([x, y]): Point => [rounded(x0 + scale * x), rounded(y0 + scale * y)]),
  }))
}

export function k2CutPage(plan: K2Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const text = words[plan.locale]
  const flat = k2Flat(plan)
  const minY = Math.min(...flat.outline.map(([, y]) => y))
  const maxY = Math.max(...flat.outline.map(([, y]) => y))
  const top = 25
  const lines = placed(flat.lines, width / 2, top - minY)
  const labels: PrintLabel[] = []
  const label = (x: number, y: number, copy: string, size: number, color = dark, font: PrintLabel['font'] = 'text') =>
    labels.push({ x, y, text: copy, size, color, font })
  const mark = brandMark(9, 6.5)
  lines.push(...mark.lines)
  labels.push(...(mark.labels as PrintLabel[]))
  label(9 + mark.width + 2, 10, 'K2', textMm.min, muted, 'bold')
  lines.push(...registrationCrosses(width, false))
  label(9, 18.5, text.names[plan.species], textMm.title, dark, 'display')
  label(9, 23.5, `${plan.span_mm} mm ${text.span}`, textMm.min)
  for (const [i, part] of wrap(text.note, 30).entries()) label(9, 28 + i * 4.2, part, textMm.min, muted)

  // Legend along the bottom, then the ruler, paper advice and the tip-height strip.
  const base = Math.min(height - 58, top + (maxY - minY) + 8)
  const keys: Line[] = [
    { id: 'key-cut', points: [], stroke: dark, weight: lineStyle.cut.weight },
    { id: 'key-center', points: [], stroke: centerInk, weight: 0.46, dash: valleyDash },
    { id: 'key-mountain', points: [], stroke: wingInk, weight: 0.46, dash: mountainDash },
    { id: 'key-hem', points: [], stroke: costaInk, weight: 0.8 },
    { id: 'key-clip', points: [], stroke: clipInk, weight: 0.4, dash: [1.2, 0.8] },
  ]
  // Lay legend items out by label length; a long translation wraps onto a second row
  // instead of running into the 6 mm edge zone.
  const widths = text.legend.map((t) => 14 + t.length * 1.75)
  const gap = 6
  let kx = 9,
    ky = base
  const place = (w: number) => {
    if (kx > 9 && kx + w > width - 9) {
      kx = 9
      ky += 6.5
    }
    const at = [kx, ky]
    kx += w + gap
    return at
  }
  for (const [index, key] of keys.entries()) {
    const [x, y] = place(widths[index])
    if (key.id === 'key-hem')
      lines.push({ id: 'key-hem-fill', points: [[x, y - 1.6], [x + 10, y - 1.6], [x + 10, y + 1.6], [x, y + 1.6]], closed: true, fill: hemFill, stroke: costaInk, weight: 0.3 })
    else lines.push({ ...key, points: [[x, y], [x + 10, y]] })
    label(x + 12, y + 1, text.legend[index], textMm.min)
  }
  const [bx, by] = place(widths[5])
  lines.push(
    { id: 'key-balance-ring', points: circle(bx + 5, by, 2.2), closed: true, fill: halo, stroke: clipInk, weight: 0.55 },
    { id: 'key-balance-dot', points: circle(bx + 5, by, 0.8, 12), closed: true, fill: clipInk },
  )
  label(bx + 12, by + 1, text.legend[5], textMm.min)

  const ry = ky + 10
  const cal = calibration(9, ry, plan.locale, { note: false })
  lines.push(...cal.lines)
  labels.push(...(cal.labels as PrintLabel[]))
  label(73, ry + 0.5, text.print, textMm.min)
  label(9, ry + 8, text.paperTitle, textMm.body, dark, 'bold')
  let y = ry + 13
  for (const line of [text.paper('120'), text.grain, text.clips(recommended.clips)]) {
    for (const part of wrap(line, 95)) {
      label(9, y, part, textMm.min)
      y += 4.2
    }
  }
  for (const part of wrap(text.predicted(plan), 95)) {
    label(9, y, part, textMm.min, muted)
    y += 4.2
  }

  // Tip-height strip: a cut-out card. Its line sits at body depth + tip rise above the table.
  const sx = width - 60,
    sy = ry - 1
  const stripH = 36,
    stripW = 11
  const tipLine = stripH - (plan.keel_depth_mm + plan.tip_height_mm)
  lines.push(
    { id: 'strip-cut', points: [[sx, sy], [sx + stripW, sy], [sx + stripW, sy + stripH], [sx, sy + stripH]], closed: true, stroke: dark, weight: 0.52 },
    { id: 'strip-body', points: [[sx, sy + stripH - plan.keel_depth_mm], [sx + stripW, sy + stripH - plan.keel_depth_mm]], stroke: muted, weight: 0.35, dash: [0.8, 0.8] },
    { id: 'strip-tip', points: [[sx - 1.5, sy + tipLine], [sx + stripW + 1.5, sy + tipLine]], stroke: clipInk, weight: 0.8 },
  )
  label(sx, sy - 2.5, text.strip, 3, clipInk)
  label(sx + stripW + 3, sy + tipLine + 1, text.stripLine, 2.5, clipInk)
  for (const [i, part] of wrap(text.stripHelp(plan.tip_height_mm), 22).entries())
    label(sx + stripW + 3, sy + tipLine + 6 + i * 4.2, part, textMm.min)

  label(9, height - printSafeMm - 1.5, 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2', 2.2)
  return { width, height, lines, labels }
}

// Small schematic pictures for each step, drawn in a 40 x 22 mm box.
function stepPicture(index: number, plan: K2Plan): Line[] {
  const L: Line[] = []
  const draw = (id: string, points: Point[], stroke = dark, weight = 0.45, extra: Partial<Line> = {}) =>
    L.push({ id: `step${index}-${id}`, points, stroke, weight, ...extra })
  const arrow = (id: string, points: Point[]) => {
    draw(id, points, wingInk, 0.45)
    const [x, y] = points.at(-1)!,
      [fx, fy] = points.at(-2)!
    const a = Math.atan2(y - fy, x - fx)
    const e = (o: number): Point => [x - 1.6 * Math.cos(a + o), y - 1.6 * Math.sin(a + o)]
    draw(id + '-tip', [e(0.5), [x, y], e(-0.5)], wingInk, 0.45)
  }
  const flat = k2Flat(plan)
  if (index === 0 || index === 1) {
    const minY = Math.min(...flat.outline.map(([, y]) => y))
    const s = 0.17
    const pts = flat.outline.map(([x, y]): Point => [rounded(20 + x * s), rounded(1 + (y - minY) * s)])
    draw('shape', pts, dark, 0.35, { closed: true })
    for (const c of index === 1 ? flat.creases : flat.tabs)
      draw(c.id, c.points.map(([x, y]): Point => [rounded(20 + x * s), rounded(1 + (y - minY) * s)]), c.stroke, 0.35, { dash: c.dash ? [0.6, 0.5] : undefined })
  } else if (index === 2) {
    // Section through the leading edge: the strip turns under the wing.
    draw('wing', [[4, 12], [36, 12]], dark, 0.6)
    draw('hem', [[4, 13.2], [14, 13.2]], costaInk, 0.6)
    draw('bend', [[4, 12], [3.2, 12.6], [4, 13.2]], costaInk, 0.6)
    arrow('turn', [[10, 6], [5, 6.5], [2.6, 9.5]])
    draw('front', [[1, 18], [6, 18]], muted, 0.3)
  } else if (index === 3) {
    // Tail view: T with the doubled body underneath.
    draw('left', [[3, 6], [19.4, 6]], dark, 0.6)
    draw('right', [[20.6, 6], [37, 6]], dark, 0.6)
    draw('wall-l', [[19.4, 6], [19.4, 15]], centerInk, 0.6)
    draw('wall-r', [[20.6, 6], [20.6, 15]], centerInk, 0.6)
    draw('keel', [[19.4, 15], [20, 15.6], [20.6, 15]], centerInk, 0.6)
  } else if (index === 4) {
    // Side view of the head with two clips.
    draw('body', [[2, 6], [38, 6], [38, 14], [2, 14]], centerInk, 0.5, { closed: true })
    draw('zone', [[3, 7], [16, 7], [16, 13], [3, 13]], clipInk, 0.35, { closed: true, dash: [1, 0.7] })
    draw('clip1', [[2, 8], [14, 8], [14.8, 9], [14.8, 11], [14, 12], [4, 12], [3.3, 11], [3.3, 10], [12, 10]], ink, 0.5)
    draw('clip2', [[2, 7.4], [15, 7.4], [15.8, 8.6], [15.8, 11.4], [15, 12.6], [2, 12.6]], muted, 0.4)
    arrow('push', [[24, 18], [17, 18]])
  } else if (index === 5) {
    // Balance on two fingertips (tail view).
    draw('left', [[3, 7], [19.4, 7]], dark, 0.6)
    draw('right', [[20.6, 7], [37, 7]], dark, 0.6)
    draw('keel', [[20, 7], [20, 14]], centerInk, 0.9)
    for (const x of [12, 28]) draw('finger' + x, [[x - 2, 20], [x - 2, 9.6], [x, 7.6], [x + 2, 9.6], [x + 2, 20]], muted, 0.45)
  } else if (index === 6) {
    // Tail view: shallow V with the strip next to the right tip.
    const rise = 6
    draw('left', [[3, 12 - rise], [19.4, 12]], dark, 0.6)
    draw('right', [[20.6, 12], [33, 12 - rise]], dark, 0.6)
    draw('keel', [[20, 12], [20, 18.5]], centerInk, 0.9)
    draw('table', [[1, 18.5], [39, 18.5]], muted, 0.3)
    draw('strip', [[35, 18.5], [35, 3], [38, 3], [38, 18.5]], dark, 0.35)
    draw('mark', [[34, 12 - rise], [39, 12 - rise]], clipInk, 0.7)
  } else {
    // Side view of a hindwing tab bent up, and the flight path.
    draw('wing', [[4, 14], [26, 14]], dark, 0.6)
    draw('tab', [[26, 14], [31, 12]], wingInk, 0.7)
    arrow('lift', [[33, 15], [33, 10]])
    draw('path', [[2, 4], [12, 5], [22, 7], [36, 9]], muted, 0.3, { dash: [0.8, 0.8] })
  }
  return L
}

// Two crosses at the same physical spots on both faces of a double-sided print.
function registrationCrosses(width: number, back: boolean): Line[] {
  return [[width - 14, 12], [width - 30, 12]].flatMap(([x0, y], i): Line[] => {
    const x = back ? width - x0 : x0
    return [
      { id: `register-ring-${i}`, points: circle(x, y, 2.1, 16), closed: true, fill: '#FFFFFF', stroke: dark, weight: 0.3 },
      { id: `register-h-${i}`, points: [[x - 3, y], [x + 3, y]], stroke: dark, weight: 0.3 },
      { id: `register-v-${i}`, points: [[x, y - 3], [x, y + 3]], stroke: dark, weight: 0.3 },
    ]
  })
}

// Back of the landscape cut sheet. Printed double-sided with a short-edge flip, every fold lands
// behind its twin: left and right swap and valleys become mountains. The thin outline lets the
// builder check that both faces line up after cutting.
export function k2BackPage(plan: K2Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const text = words[plan.locale]
  const back = backFaceWords(plan.locale, true)
  const flat = k2Flat(plan)
  const minY = Math.min(...flat.outline.map(([, y]) => y))
  const mirror = (line: Line): Line => ({ ...line, points: line.points.map(([x, y]): Point => [-x, y]) })
  const swap = (dash?: number[]) => (dash === valleyDash ? mountainDash : dash === mountainDash ? valleyDash : dash)
  const sheet: Line[] = [{ id: 'back-outline', points: flat.outline.map(([x, y]): Point => [-x, y]), closed: true, stroke: muted, weight: 0.3 }]
  for (const line of [...flat.creases, ...flat.tabs.filter((t) => t.dash), ...flat.clip]) {
    sheet.push({ ...mirror(line), id: line.id + '-back-halo', weight: 1.2, stroke: halo, dash: undefined, fill: undefined, closed: false })
    sheet.push({ ...mirror(line), id: line.id + '-back', dash: swap(line.dash) })
  }
  sheet.push(...flat.tabs.filter((t) => !t.dash).map((line) => ({ ...mirror(line), id: line.id + '-back' })))
  const lines = [...placed(sheet, width / 2, 25 - minY), ...registrationCrosses(width, true)]
  const labels: PrintLabel[] = [
    { x: 40, y: 10, text: 'Open Flight  ·  K2', size: textMm.min, color: muted, font: 'display' },
    { x: 40, y: 17.5, text: text.names[plan.species] + '  ·  ' + back.title, size: 5, color: dark },
    ...back.lines.map((line, i) => ({ x: 9, y: height - 30 + i * 4.2, text: line, size: 2.8, color: dark })),
    { x: 9, y: height - printSafeMm - 1.5, text: 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2', size: 2.2, color: dark },
  ]
  return { width, height, lines, labels }
}

export function k2GuidePage(plan: K2Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const text = words[plan.locale]
  const lines: Line[] = []
  const labels: PrintLabel[] = []
  const label = (x: number, y: number, copy: string, size: number, color = dark, font: PrintLabel['font'] = 'text') =>
    labels.push({ x, y, text: copy, size, color, font })
  label(9, 10, 'Open Flight  ·  K2', textMm.min, muted, 'display')
  label(9, 18, text.guide + '  ·  ' + text.names[plan.species], textMm.title, dark, 'display')
  const cols = 4
  const colW = (width - 18) / cols
  for (const [index, step] of text.steps.entries()) {
    const x = 9 + (index % cols) * colW
    const y = 26 + Math.floor(index / cols) * ((height - 40) / 2)
    lines.push(...placed(stepPicture(index, plan), x + 2, y))
    label(x, y + 30, `${index + 1}. ${step.title}`, textMm.body, dark, 'bold')
    let b = y + 35
    for (const part of wrap(step.action, 36)) {
      label(x, b, part, textMm.min)
      b += 4.1
    }
    b += 0.8
    for (const part of wrap(step.check, 36)) {
      label(x, b, part, textMm.min, muted)
      b += 4.1
    }
  }
  label(9, height - printSafeMm - 1.5, 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2', 2.2)
  return { width, height, lines, labels }
}

export function k2Pdf(plan: K2Plan): Buffer {
  // Page 2 is the back of the cut sheet for double-sided printing; page 3 is the guide.
  const pages = [k2CutPage(plan), k2BackPage(plan), k2GuidePage(plan)]
  const [w, h] = pageSize[plan.paper]
  const doc = new jsPDF({ unit: 'mm', format: [w, h], orientation: 'landscape', compress: true, putOnlyUsedFonts: true, precision: 5 })
  doc.setCreationDate("D:20000101000000+00'00'")
  doc.setFileId(sha256(JSON.stringify(pages)).slice(0, 32))
  doc.setLanguage(plan.locale)
  doc.setProperties({
    title: 'Open Flight - K2 butterfly trial',
    author: 'Open Flight contributors',
    subject: 'Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. ' + printFontNotice,
  })
  registerFonts(doc, printFonts())
  doc.viewerPreferences({ PrintScaling: 'None' })
  for (const [index, page] of pages.entries()) {
    if (index) doc.addPage([w, h], 'landscape')
    doc.setLineJoin('round')
    for (const line of page.lines) {
      if (!line.points.length) continue
      if (line.stroke) doc.setDrawColor(line.stroke)
      if (line.fill) doc.setFillColor(line.fill)
      doc.setLineWidth(line.stroke ? atLeastLine(line.weight) : 0)
      doc.setLineDashPattern(line.dash ?? [], 0)
      doc.path(line.points.map((c, i) => ({ op: i ? 'l' : 'm', c })))
      if (line.closed) doc.close()
      if (line.fill && line.stroke) doc.fillStroke()
      else if (line.fill) doc.fill()
      else doc.stroke()
    }
    for (const l of page.labels as PrintLabel[]) {
      useFont(doc, l.font)
      doc.setFontSize((atLeastText(l.size) * 72) / 25.4)
      doc.setTextColor(l.color ?? dark)
      doc.text(l.text, l.x, l.y)
    }
  }
  return Buffer.from(doc.output('arraybuffer'))
}

// SVG views for the workshop page and the book artwork.
const svgPath = (l: Line) =>
  `<path d="M${l.points.map((p) => p.join(' ')).join(' L')}${l.closed ? ' Z' : ''}" fill="${l.fill ?? 'none'}" stroke="${l.stroke ?? 'none'}" stroke-width="${l.weight ?? 0}"${l.dash ? ` stroke-dasharray="${l.dash.join(' ')}"` : ''}/>`
export function k2FinishedSvg(plan: K2Plan): string {
  const lines = k2Art(plan.outline, plan.appearance_id)
  const xs = plan.outline.top.map(([x]) => x),
    ys = plan.outline.top.map(([, y]) => y)
  const x0 = Math.min(...xs) - 3,
    y0 = Math.min(...ys) - 3
  const w = Math.max(...xs) + 3 - x0,
    h = Math.max(...ys) + 3 - y0
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${rounded(x0)} ${rounded(y0)} ${rounded(w)} ${rounded(h)}" role="img">${lines.map(svgPath).join('')}</svg>`
}
// The flat sheet alone, used as a paper texture.
export function k2Preview(plan: K2Plan): string {
  const flat = k2Flat(plan)
  const xs = flat.outline.map(([x]) => x),
    ys = flat.outline.map(([, y]) => y)
  const width = rounded(Math.max(...xs) - Math.min(...xs) + 6)
  const top = Math.min(...ys)
  const height = rounded(Math.max(...ys) - top + 6)
  return svg({ width, height, lines: placed(flat.lines, width / 2, 3 - top), labels: [] })
    .toString('utf8')
    .replace(` width="${width}mm" height="${height}mm"`, '')
}
export function k2PageSvg(plan: K2Plan, page: 0 | 1 | 2 = 0): string {
  const drawing = [k2CutPage, k2BackPage, k2GuidePage][page](plan)
  return svg(drawing).toString('utf8')
}
