// Printable sheet for the K3 dart butterfly, the folded butterfly for all three species. Page 1
// is the cut sheet in landscape (wings along the long, usually stiffer, side of office paper),
// page 2 its back face for double-sided printing and page 3 the fold, balance and trim steps.
// A separate design-review page compares K3 with K2. Every flight figure printed here is a model
// estimate; no K3 flight has been recorded.

import { jsPDF } from 'jspdf'
import { rounded, sha256, type Drawing, type Line, type Point } from '../geometry/butterfly.ts'
import type { PrintLabel } from '../print-export/sheets.ts'
import { svg } from '../print-export/sheets.ts'
import { printFonts } from '../print-export/fonts.ts'
import { brandMark, calibration, fontNotice, ink, lineStyle, muted, registerFonts, textMm, useFont, atLeastLine, atLeastText } from '../../apps/editor/assets/brand/print.js'
import { backFaceWords, printSafeMm } from '../../apps/editor/assets/print-faces.js'
import type { Species } from '../geometry/workshop-models.ts'
import {
  estimateK3,
  isK3Span,
  k3Art,
  k3DefaultSpan,
  k3Elevons,
  k3Flat,
  k3Geometry,
  k3PoseForSpan,
  k3Poses,
  k3SpanRange,
  polygonArea,
  clipCentreFromHead,
  type K3Estimate,
  type K3Geometry,
} from './k3-dart.ts'
import { makeK2 } from './k2-sheet.ts'
import { papers } from './k2-airframe.ts'

export type K3Paper = 'A4' | 'US_LETTER'
export type K3Locale = 'en' | 'es' | 'ru'
export type K3Appearance = 'natural' | 'carnival' | 'twilight' | 'coloring'
export type K3Settings = {
  species?: Species
  span_mm?: number
  appearance_id?: K3Appearance
  paper?: K3Paper
  locale?: K3Locale
}
export { k3SpanRange, k3DefaultSpan }

const pageSize: Record<K3Paper, [number, number]> = { A4: [297, 210], US_LETTER: [279.4, 215.9] }
const valleyDash = lineStyle.valley.dash
const mountainDash = lineStyle.mountain.dash
const valleyInk = lineStyle.valley.stroke
const mountainInk = lineStyle.mountain.stroke
const halo = '#FFFFFF'
const green = '#1F7A4D'
const paperFill = '#FFFFFF'
const shade = '#EDE7DA'
const recommended = { paper: '120', clips: 2, clip_g: 0.5 }

export type K3Plan = Required<K3Settings> & {
  geo: K3Geometry
  // Two clips (the recommended build), one clip, and two clips with the doublers glued.
  prediction: K3Estimate
  estimate: K3Estimate
  estimateOneClip: K3Estimate
  estimateBonded: K3Estimate
  // Same names as the K2 plan, so views and books can use either.
  keel_depth_mm: number
  keel_tail_mm: number
  nose_y_mm: number
  wing_root_y_mm: number
  tail_y_mm: number
  balance_from_nose_mm: number
  dihedral_deg: number
  tip_height_mm: number
  revision: string
  evidence: 'experimental_unvalidated'
}

export function makeK3(settings: K3Settings = {}): K3Plan {
  const species = settings.species ?? 'monarch'
  if (!Object.hasOwn(k3Poses, species)) throw new Error('Unknown butterfly species')
  const span_mm = settings.span_mm ?? k3DefaultSpan[species]
  const { minimum, maximum, step } = k3SpanRange
  if (!isK3Span(span_mm)) throw new Error(`Finished span must be from ${minimum} to ${maximum} mm in ${step} mm increments`)
  const paper = settings.paper ?? 'A4'
  if (!Object.hasOwn(pageSize, paper)) throw new Error('Unknown paper size')
  const locale = settings.locale ?? 'en'
  if (!Object.hasOwn(words, locale)) throw new Error('Unknown print locale')
  const appearance_id = settings.appearance_id ?? 'natural'
  const geo = k3Geometry(species, k3PoseForSpan(species, span_mm))
  if (!Object.hasOwn(geo.model.palettes, appearance_id)) throw new Error('Unknown butterfly appearance')
  const clipG = recommended.clips * recommended.clip_g
  const estimate = estimateK3(geo, papers[recommended.paper], clipG)
  const tipY = geo.top.reduce((a, p) => (p[0] > a[0] ? p : a))[1]
  const rise = (geo.span_mm / 2) * Math.sin((geo.pose.dihedral_deg * Math.PI) / 180)
  return {
    species,
    span_mm,
    appearance_id,
    paper,
    locale,
    geo,
    prediction: estimate,
    estimate,
    estimateOneClip: estimateK3(geo, papers[recommended.paper], recommended.clip_g),
    estimateBonded: estimateK3(geo, papers[recommended.paper], clipG, 0.1, true),
    keel_depth_mm: geo.pose.keel_front_mm,
    keel_tail_mm: geo.pose.keel_tail_mm,
    nose_y_mm: geo.head_y,
    wing_root_y_mm: geo.costa[0][1],
    tail_y_mm: geo.tail_y,
    balance_from_nose_mm: Math.round(estimate.balance_target_from_head_mm),
    dihedral_deg: geo.pose.dihedral_deg,
    tip_height_mm: Math.round(keelDepth(geo, tipY) + rise),
    revision: sha256(JSON.stringify([geo.pose, geo.cutHalf])).slice(0, 10),
    evidence: 'experimental_unvalidated',
  }
}

// ---------------------------------------------------------------------------------------
// Words. Left and right are seen from the tail looking toward the nose.

type Words = {
  names: Record<Species, string>
  note: string
  cutHint: string
  span: string
  mm: string
  print: string
  legend: [string, string, string, string]
  paperLine: string
  predicted: (p: K3Plan) => string
  strip: string
  stripHelp: (mm: number) => string
  guide: string
  steps: { title: string; action: string; check: string }[]
}
const decimal = (n: number, locale: K3Locale) => n.toFixed(1).replace('.', locale === 'en' ? '.' : ',')

const words: Record<K3Locale, Words> = {
  en: {
    names: { monarch: 'Monarch', morpho: 'Blue morpho', swallowtail: 'Swallowtail' },
    note: 'K3 dart butterfly · Swept wings, a head with antennae and a folded body.',
    cutHint: 'Cut the solid line, including the V between each antenna and the nose flap.',
    span: 'finished span',
    mm: 'mm',
    print: 'Print at 100%, landscape. Measure this line before cutting.',
    legend: ['Cut', 'Valley: folds toward you', 'Mountain: folds away', 'Balance dot'],
    paperLine: '120 g/m² uncoated paper or light card (100–140 works). Two 33 mm metal paper clips. A glue stick makes the front edges stiffer.',
    predicted: (p) =>
      `Estimate for ${p.span_mm} mm on 120 g/m² with two clips: balance ${p.balance_from_nose_mm} mm behind the head, glide about ${decimal(p.prediction.glide_speed_m_s, 'en')} m/s. Not yet measured.`,
    strip: 'Tip-height strip',
    stripHelp: (mm) => `Stand it beside a wingtip: tip at ${mm} mm.`,
    guide: 'Fold, balance and trim',
    steps: [
      {
        title: 'Cut',
        action: 'Cut the solid outline. Cut the V between each antenna and the dark nose flap, and the four short slits at the back of the hindwings.',
        check: 'One piece. The nose flap is free from both antennae.',
      },
      {
        title: 'Score',
        action: 'Lay a ruler on every dashed line and press along it with an empty ballpoint pen.',
        check: 'Each fold line shows a groove.',
      },
      {
        title: 'Fold the front edges',
        action: 'Fold each tan strip (3) under its forewing on the dash-dot line. A glue stick under the strip makes the wing stiffer.',
        check: 'The front edge runs straight from the head to the wingtip, doubled.',
      },
      {
        title: 'Tuck the nose flap',
        action: 'Fold the dark nose flap (4) under, behind the head, on its dash-dot line. Press hard.',
        check: 'The flap lies flat behind the head. Its eyes face down.',
      },
      {
        title: 'Fold the body',
        action: 'Fold in half on the dashed centre line (5), colors inside. The nose flap wraps round the front of the body.',
        check: 'The eyes now show on both sides of the head.',
      },
      {
        title: 'Open the wings',
        action: 'Fold each wing back out on its dash-dot root line (6). Set a shallow V with the tip-height strip.',
        check: 'The body is deep at the head and shallow at the tail. Both wingtips are the same height.',
      },
      {
        title: 'Clip and balance',
        action: 'Push a clip onto the head from the front, over the nose flap, and a second on top. Rest the wings on two fingertips under the green dots.',
        check: 'It stays level. Tail drops: add weight at the head. Nose drops: slide a clip back.',
      },
      {
        title: 'Launch and trim',
        action: 'Push it smoothly forward, nose level, about as fast as a jog. Dives: bend both hindwing tabs up 1–2 mm. Climbs and stalls: flatten them.',
        check: 'Turns left: lift the right tab a little (seen from the tail). Turns right: the left tab.',
      },
    ],
  },
  es: {
    names: { monarch: 'Monarca', morpho: 'Morfo azul', swallowtail: 'Macaón' },
    note: 'Mariposa dardo K3 · Alas hacia atrás, cabeza con antenas y cuerpo plegado.',
    cutHint: 'Recorta la línea continua, también la V entre cada antena y la solapa de la punta.',
    span: 'envergadura final',
    mm: 'mm',
    print: 'Imprime al 100 % y en horizontal. Mide esta línea antes de recortar.',
    legend: ['Corte', 'Valle: se dobla hacia ti', 'Montaña: se dobla hacia atrás', 'Punto de equilibrio'],
    paperLine: 'Papel sin estucar de 120 g/m² o cartulina ligera (sirve de 100 a 140). Dos clips metálicos de 33 mm. Con pegamento de barra, los bordes delanteros quedan más rígidos.',
    predicted: (p) =>
      `Estimación para ${p.span_mm} mm en 120 g/m² con dos clips: equilibrio a ${p.balance_from_nose_mm} mm detrás de la cabeza, unos ${decimal(p.prediction.glide_speed_m_s, 'es')} m/s. Aún sin medir.`,
    strip: 'Tira de altura',
    stripHelp: (mm) => `Ponla junto a una punta del ala: punta a ${mm} mm.`,
    guide: 'Dobla, equilibra y ajusta',
    steps: [
      {
        title: 'Recorta',
        action: 'Recorta la línea continua. Corta la V entre cada antena y la solapa oscura de la punta, y las cuatro ranuras cortas de las alas traseras.',
        check: 'Es una sola pieza. La solapa de la punta queda libre de las dos antenas.',
      },
      {
        title: 'Marca los dobleces',
        action: 'Apoya una regla en cada línea discontinua y repásala con un bolígrafo sin tinta.',
        check: 'Cada línea de doblez tiene un surco.',
      },
      {
        title: 'Dobla los bordes delanteros',
        action: 'Dobla cada tira beige (3) debajo de su ala delantera por la línea de trazo y punto. Con pegamento de barra debajo, el ala queda más rígida.',
        check: 'El borde delantero va recto y doble desde la cabeza hasta la punta del ala.',
      },
      {
        title: 'Mete la solapa de la punta',
        action: 'Dobla la solapa oscura (4) hacia abajo, detrás de la cabeza, por su línea de trazo y punto. Presiona fuerte.',
        check: 'La solapa queda plana detrás de la cabeza, con los ojos hacia abajo.',
      },
      {
        title: 'Dobla el cuerpo',
        action: 'Dobla por la mitad en la línea central discontinua (5), con los colores dentro. La solapa abraza la parte delantera del cuerpo.',
        check: 'Ahora se ven los ojos a los dos lados de la cabeza.',
      },
      {
        title: 'Abre las alas',
        action: 'Dobla cada ala hacia fuera por su línea de trazo y punto junto al cuerpo (6). Forma una V suave con la tira de altura.',
        check: 'El cuerpo es alto en la cabeza y bajo en la cola. Las dos puntas están a la misma altura.',
      },
      {
        title: 'Clips y equilibrio',
        action: 'Mete un clip en la cabeza desde delante, sobre la solapa, y otro encima. Apoya las alas en dos dedos bajo los puntos verdes.',
        check: 'Se queda horizontal. Si cae la cola, añade peso en la cabeza. Si cae la cabeza, retrasa un clip.',
      },
      {
        title: 'Lanza y ajusta',
        action: 'Empújala con suavidad hacia delante, con la punta recta, a la velocidad de un trote. Si cae en picado, sube 1–2 mm las dos aletas traseras. Si sube y se frena, aplánalas.',
        check: 'Gira a la izquierda: sube un poco la aleta derecha (mirando desde la cola). Gira a la derecha: la izquierda.',
      },
    ],
  },
  ru: {
    names: { monarch: 'Монарх', morpho: 'Голубой морфо', swallowtail: 'Махаон' },
    note: 'Бабочка-дротик K3 · Отведённые назад крылья, голова с усиками и сложенный корпус.',
    cutHint: 'Вырежи по сплошной линии, включая V между каждым усиком и носовым клапаном.',
    span: 'размах крыльев',
    mm: 'мм',
    print: 'Печатай в масштабе 100%, альбомная ориентация. Перед вырезанием измерь эту линию.',
    legend: ['Разрез', 'Долина: сгиб к себе', 'Гора: сгиб от себя', 'Точка баланса'],
    paperLine: 'Бумага 120 г/м² без покрытия или тонкий картон (подойдёт 100–140). Две металлические скрепки по 33 мм. С клеем-карандашом передние кромки жёстче.',
    predicted: (p) =>
      `Оценка для ${p.span_mm} мм на 120 г/м² с двумя скрепками: баланс в ${p.balance_from_nose_mm} мм за головой, около ${decimal(p.prediction.glide_speed_m_s, 'ru')} м/с. Ещё не измерено.`,
    strip: 'Полоска высоты',
    stripHelp: (mm) => `Поставь рядом с кончиком крыла: кончик на ${mm} мм.`,
    guide: 'Сложи, уравновесь и настрой',
    steps: [
      {
        title: 'Вырежи',
        action: 'Вырежи по сплошной линии. Прорежь V между каждым усиком и тёмным носовым клапаном и четыре коротких надреза сзади на задних крыльях.',
        check: 'Одна деталь. Носовой клапан не соединён с усиками.',
      },
      {
        title: 'Продави сгибы',
        action: 'Приложи линейку к каждой пунктирной линии и проведи по ней пустой шариковой ручкой.',
        check: 'На каждой линии сгиба есть бороздка.',
      },
      {
        title: 'Подогни передние кромки',
        action: 'Загни каждую бежевую полоску (3) под переднее крыло по штрихпунктирной линии. Клей-карандаш под полоской сделает крыло жёстче.',
        check: 'Передняя кромка идёт прямо от головы до кончика крыла, в два слоя.',
      },
      {
        title: 'Заправь носовой клапан',
        action: 'Загни тёмный клапан (4) вниз, за голову, по его штрихпунктирной линии. Сильно прижми.',
        check: 'Клапан лежит плоско за головой, глазами вниз.',
      },
      {
        title: 'Согни корпус',
        action: 'Согни пополам по центральной пунктирной линии (5), цветом внутрь. Клапан обхватит переднюю часть корпуса.',
        check: 'Теперь глаза видны с обеих сторон головы.',
      },
      {
        title: 'Раскрой крылья',
        action: 'Отогни каждое крыло наружу по штрихпунктирной линии у корпуса (6). Задай неглубокую V по полоске высоты.',
        check: 'Корпус высокий у головы и низкий у хвоста. Оба кончика на одной высоте.',
      },
      {
        title: 'Скрепки и баланс',
        action: 'Надень скрепку на голову спереди, поверх клапана, и вторую сверху. Положи крылья на два пальца под зелёными точками.',
        check: 'Бабочка держится ровно. Хвост опускается — добавь вес на голову. Нос опускается — сдвинь скрепку назад.',
      },
      {
        title: 'Запуск и настройка',
        action: 'Плавно толкни её вперёд, нос ровно, примерно со скоростью лёгкого бега. Пикирует — подними оба задних язычка на 1–2 мм. Взмывает и зависает — выпрями их.',
        check: 'Поворачивает влево — чуть подними правый язычок (если смотреть с хвоста). Вправо — левый.',
      },
    ],
  },
}
export const k3Names = (locale: K3Locale) => words[locale].names

const circle = (cx: number, cy: number, r: number, n = 20): Point[] =>
  Array.from({ length: n }, (_, i): Point => [rounded(cx + r * Math.cos((i / n) * 2 * Math.PI)), rounded(cy + r * Math.sin((i / n) * 2 * Math.PI))])
const place = (lines: Line[], x0: number, y0: number, s = 1): Line[] =>
  lines.map((l) => ({ ...l, points: l.points.map(([x, y]): Point => [rounded(x0 + s * x), rounded(y0 + s * y)]) }))
function wrap(text: string, limit: number): string[] {
  const out: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? line + ' ' + word : word
    if (line && next.length > limit) {
      out.push(line)
      line = word
    } else line = next
  }
  if (line) out.push(line)
  return out
}

// Split a finished-view line at x = 0 so each half travels with its own wing (as in K2).
function half(line: Line, side: number): Point[][] {
  const inside = ([x]: Point) => x * side >= 0
  const pts = line.points
  if (pts.every(inside)) return [pts]
  if (!pts.some(([x]) => x * side > 0)) return []
  const cross = ([x, y]: Point, [u, v]: Point): Point => [0, rounded(y - ((v - y) * x) / (u - x))]
  if (line.closed) {
    const clipped = pts.flatMap((b, i) => {
      const a = pts[(i + pts.length - 1) % pts.length]
      const e = inside(a) === inside(b) ? [] : [cross(a, b)]
      if (inside(b)) e.push(b)
      return e
    })
    return clipped.length >= 3 ? [clipped] : []
  }
  const pieces: Point[][] = []
  let cur = inside(pts[0]) ? [pts[0]] : []
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i]
    if (inside(a) !== inside(b)) {
      cur.push(cross(a, b))
      if (!inside(b)) {
        if (cur.length > 1) pieces.push(cur)
        cur = []
      }
    }
    if (inside(b)) cur.push(b)
  }
  if (cur.length > 1) pieces.push(cur)
  return pieces
}

// ---------------------------------------------------------------------------------------
// Flat sheet lines in sheet millimetres (body centre x = 0).

export function k3SheetLines(plan: K3Plan) {
  const { geo } = plan
  const flat = k3Flat(geo)
  const art = k3Art(geo, plan.appearance_id)
  const lines: Line[] = []
  // Paper parts that carry no wing art: keel walls, sleeve and doublers.
  lines.push({ id: 'paper', points: flat.outline, closed: true, fill: paperFill })
  const bodyInk = '#2A2030'
  lines.push({ id: 'sleeve-face', points: flat.sleeve, closed: true, fill: bodyInk })
  for (const side of [-1, 1]) {
    const m = (p: Point) => flat.toFlat([side * p[0], p[1]], side)
    lines.push({ id: 'doubler-' + side, points: geo.doubler.map(m), closed: true, fill: '#F3E3C4' })
    for (const [i, line] of art.entries()) {
      if (line.id === 'silhouette') {
        lines.push({ ...line, id: 'wing-ground-' + side, points: geo.half.map(m), stroke: undefined })
        continue
      }
      for (const [k, pts] of half(line, side).entries()) lines.push({ ...line, id: `${line.id}-${side}-${i}-${k}`, points: pts.map((p) => flat.toFlat(p, side)) })
    }
  }
  // Eyes on the sleeve: after folding they sit on each side of the head.
  for (const side of [-1, 1]) {
    const y = geo.head_y - geo.pose.sleeve_mm * 0.42
    const x = side * geo.pose.keel_front_mm * 0.42
    lines.push({ id: 'sleeve-eye-' + side, points: circle(x, y, 2.4), closed: true, fill: '#F7EFD9' })
    lines.push({ id: 'sleeve-pupil-' + side, points: circle(x, y, 1.1), closed: true, fill: bodyInk })
  }

  const creases: Line[] = [
    { id: 'center-valley', points: flat.crease.center, dash: valleyDash, stroke: valleyInk, weight: 0.46 },
    { id: 'sleeve-mountain', points: flat.crease.sleeve, dash: mountainDash, stroke: mountainInk, weight: 0.46 },
    ...[1, -1].map((side) => ({
      id: 'root-mountain-' + side,
      points: flat.crease.root.map(([x, y]): Point => [side * x, y]),
      dash: mountainDash,
      stroke: mountainInk,
      weight: 0.46,
    })),
    ...[1, -1].map((side) => ({
      id: 'costa-mountain-' + side,
      points: [geo.doubler[0], geo.doubler[3]].map((p) => flat.toFlat([side * p[0], p[1]], side)),
      dash: mountainDash,
      stroke: mountainInk,
      weight: 0.5,
    })),
  ]
  const el = k3Elevons(geo)
  const slits: Line[] = []
  for (const side of [1, -1]) {
    const m = (p: Point) => flat.toFlat([side * p[0], p[1]], side)
    for (const i of [0, 1]) slits.push({ id: `elevon-slit-${side}-${i}`, points: [m(el.ends[i]), m(el.hinges[i])], stroke: ink, weight: 0.52 })
    creases.push({ id: 'elevon-hinge-' + side, points: [m(el.hinges[0]), m(el.hinges[1])], dash: valleyDash, stroke: valleyInk, weight: 0.42 })
  }
  // Balance dots on the wings at the target balance line.
  const by = geo.head_y + plan.estimate.balance_target_from_head_mm
  const balance: Line[] = []
  for (const side of [1, -1]) {
    const p = flat.toFlat([side * 26, by], side)
    balance.push(
      { id: 'balance-ring-' + side, points: circle(p[0], p[1], 2.3), closed: true, fill: halo, stroke: green, weight: 0.55 },
      { id: 'balance-dot-' + side, points: circle(p[0], p[1], 0.85, 12), closed: true, fill: green },
    )
  }
  for (const c of creases) lines.push({ ...c, id: c.id + '-halo', stroke: halo, weight: 1.2, dash: undefined }, c)
  lines.push(...slits, ...balance)
  lines.push({ id: 'cut', points: flat.outline, closed: true, stroke: ink, weight: 0.52 })
  return { flat, lines, creases, slits, balance, balance_y: by }
}

// ---------------------------------------------------------------------------------------
// 3D finished model: wings at the root height of the keel, raised by the dihedral.

type P3 = [number, number, number]
function keelDepth(geo: K3Geometry, y: number) {
  const t = Math.max(0, Math.min(1, (y - geo.head_y) / (geo.tail_y - geo.head_y)))
  return geo.pose.keel_front_mm + (geo.pose.keel_tail_mm - geo.pose.keel_front_mm) * t
}
function lift(geo: K3Geometry, [x, y]: Point): P3 {
  const d = geo.pose.dihedral_deg * (Math.PI / 180)
  return [x * Math.cos(d), y, keelDepth(geo, y) + Math.abs(x) * Math.sin(d)]
}
function camera(yawDeg: number, pitchDeg: number) {
  const a = (yawDeg * Math.PI) / 180,
    b = (pitchDeg * Math.PI) / 180
  // x right, y toward the tail, z up. Returns screen x right, screen y down.
  return ([x, y, z]: P3): Point => {
    const x1 = x * Math.cos(a) - y * Math.sin(a)
    const y1 = x * Math.sin(a) + y * Math.cos(a)
    return [rounded(x1), rounded(y1 * Math.sin(b) - z * Math.cos(b))]
  }
}

export function k3View(plan: K3Plan, view: 'perspective' | 'side' | 'rear' | 'top'): Line[] {
  const { geo } = plan
  const art = k3Art(geo, plan.appearance_id)
  const cam = view === 'perspective' ? camera(-24, 58) : view === 'side' ? camera(-90, 0.0001) : view === 'rear' ? camera(180, 0.0001) : camera(0, 90)
  const out: Line[] = []
  const keelSide: Point[] = []
  const N = 20
  for (let i = 0; i <= N; i++) keelSide.push([0, geo.head_y + ((geo.tail_y - geo.head_y) * i) / N])
  const keel3: P3[] = [...keelSide.map(([, y]): P3 => [0, y, 0]), ...keelSide.reverse().map(([, y]): P3 => [0, y, keelDepth(geo, y)])]
  const sleeve3: P3[] = [
    [0, geo.head_y, 0],
    [0, geo.head_y + geo.pose.sleeve_mm, 0],
    [0, geo.head_y + geo.pose.sleeve_mm, keelDepth(geo, geo.head_y + geo.pose.sleeve_mm) - 1],
    [0, geo.head_y, geo.pose.keel_front_mm - 1],
  ]
  const clip3: P3[] = [
    [0, geo.head_y - 1.2, 3],
    [0, geo.head_y + 31, 3],
    [0, geo.head_y + 31, 8.5],
    [0, geo.head_y - 1.2, 8.5],
  ]
  const keelLines: Line[] = [
    { id: 'keel', points: keel3.map(cam), closed: true, fill: shade, stroke: ink, weight: 0.35 },
    { id: 'sleeve', points: sleeve3.map(cam), closed: true, fill: '#2A2030', stroke: ink, weight: 0.3 },
    { id: 'clip', points: clip3.map(cam), closed: true, stroke: '#7D8794', weight: 0.7 },
  ]
  const wingLines = art.map((l) => ({ ...l, points: l.points.map((p) => cam(lift(geo, p))) }))
  if (view === 'top') return wingLines
  if (view === 'side') return [...wingLines, ...keelLines]
  return [...keelLines, ...wingLines]
}

const boxed = (lines: Line[], x: number, y: number, w: number, h: number): Line[] => {
  const xs = lines.flatMap((l) => l.points.map(([px]) => px)),
    ys = lines.flatMap((l) => l.points.map(([, py]) => py))
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const s = Math.min(w / (x1 - x0), h / (y1 - y0))
  return place(lines, x + (w - s * (x1 - x0)) / 2 - s * x0, y + (h - s * (y1 - y0)) / 2 - s * y0, s)
}

// ---------------------------------------------------------------------------------------
// Pages.

const footer = 'Open Flight  /  CERN-OHL-W-2.0  /  © Open Flight · personal and classroom use  /  K3'

// Two crosses at the same physical spots on both faces of a double-sided print.
function registrationCrosses(width: number, back: boolean): Line[] {
  return [[width - 14, 12], [width - 30, 12]].flatMap(([x0, y], i): Line[] => {
    const x = back ? width - x0 : x0
    return [
      { id: `register-ring-${i}`, points: circle(x, y, 2.1, 16), closed: true, fill: '#FFFFFF', stroke: ink, weight: 0.3 },
      { id: `register-h-${i}`, points: [[x - 3, y], [x + 3, y]], stroke: ink, weight: 0.3 },
      { id: `register-v-${i}`, points: [[x, y - 3], [x, y + 3]], stroke: ink, weight: 0.3 },
    ]
  })
}
const sheetTop = 14

export function k3CutPage(plan: K3Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const text = words[plan.locale]
  const sheet = k3SheetLines(plan)
  const ys = sheet.flat.outline.map(([, y]) => y)
  const top = sheetTop
  const lines = place(sheet.lines, width / 2, top - Math.min(...ys))
  const labels: PrintLabel[] = []
  const label = (x: number, y: number, copy: string, size: number, color = ink, font: PrintLabel['font'] = 'text') => labels.push({ x, y, text: copy, size, color, font })
  const mark = brandMark(9, 6.5)
  lines.push(...mark.lines)
  labels.push(...(mark.labels as PrintLabel[]))
  label(9 + mark.width + 2, 10, 'K3', textMm.min, muted, 'bold')
  lines.push(...registrationCrosses(width, false))
  label(9, 18.5, text.names[plan.species], textMm.title, ink, 'display')
  label(9, 23.5, `${plan.span_mm} ${text.mm} ${text.span}`, textMm.min)
  let ty = 29
  for (const copy of [text.note, text.cutHint])
    for (const part of wrap(copy, 26)) (label(9, ty, part, textMm.min, copy === text.note ? muted : ink), (ty += 4.2))

  // Fold numbers beside the creases, in build order.
  const at = (p: Point): Point => [width / 2 + p[0], top - Math.min(...ys) + p[1]]
  const geo = plan.geo
  const flat = sheet.flat
  const tag = (p: Point, n: string) => {
    const [x, y] = at(p)
    lines.push({ id: 'tag-' + n + x, points: circle(x, y, 2.6), closed: true, fill: ink })
    label(x - 1.05, y + 1.1, n, 3, '#FFFFFF', 'bold')
  }
  const dc = polygonArea(geo.doubler)
  for (const side of [1, -1]) tag(flat.toFlat([side * dc.cx, dc.cy], side), '3')
  tag([0, geo.head_y - geo.pose.sleeve_mm - 4], '4')
  tag([4.5, (geo.head_y + geo.tail_y) / 2 + 12], '5')
  tag([flat.crease.root[1][0] + 6, flat.crease.root[1][1] - 4], '6')

  const base = height - 50
  const keys: Line[] = [
    { id: 'k-cut', points: [], stroke: ink, weight: 0.52 },
    { id: 'k-valley', points: [], stroke: valleyInk, weight: 0.46, dash: valleyDash },
    { id: 'k-mountain', points: [], stroke: mountainInk, weight: 0.46, dash: mountainDash },
  ]
  let kx = 9
  for (const [i, key] of keys.entries()) {
    lines.push({ ...key, points: [[kx, base], [kx + 10, base]] })
    label(kx + 12, base + 1, text.legend[i], textMm.min)
    kx += 18 + text.legend[i].length * 1.75
  }
  lines.push({ id: 'k-ring', points: circle(kx + 4, base, 2.3), closed: true, fill: halo, stroke: green, weight: 0.55 }, { id: 'k-dot', points: circle(kx + 4, base, 0.85, 12), closed: true, fill: green })
  label(kx + 9, base + 1, text.legend[3], textMm.min)
  const cal = calibration(9, base + 9, plan.locale, { note: false })
  lines.push(...cal.lines)
  labels.push(...(cal.labels as PrintLabel[]))
  const stripX = width - 62
  const limit = Math.floor((stripX - 14) / 1.95)
  for (const [i, part] of wrap(text.print, Math.floor((stripX - 82) / 1.95)).entries()) label(76, base + 9.5 + i * 4.2, part, textMm.min)
  let ny = base + 17 + (wrap(text.print, Math.floor((stripX - 82) / 1.95)).length - 1) * 4.2
  for (const n of [text.paperLine, text.predicted(plan)]) for (const part of wrap(n, limit)) (label(9, ny, part, textMm.min, n === text.paperLine ? ink : muted), (ny += 4.2))

  // Tip-height strip: stands on the table beside a wingtip.
  const tipHeight = plan.tip_height_mm
  const sx = stripX,
    sy = height - 62,
    sh = 40,
    sw = 10
  lines.push(
    { id: 'strip', points: [[sx, sy], [sx + sw, sy], [sx + sw, sy + sh], [sx, sy + sh]], closed: true, stroke: ink, weight: 0.52 },
    { id: 'strip-mark', points: [[sx - 1.5, sy + sh - tipHeight], [sx + sw + 1.5, sy + sh - tipHeight]], stroke: green, weight: 0.8 },
  )
  label(sx, sy - 2.5, text.strip, 2.8, green)
  for (const [i, part] of wrap(text.stripHelp(tipHeight), 20).entries()) label(sx + sw + 3, sy + sh - tipHeight + 1 + i * 3.6, part, 2.4)
  label(9, height - printSafeMm - 1.5, footer, 2.2)
  return { width, height, lines, labels }
}

// Back of the landscape cut sheet. Printed double-sided with a short-edge flip, every fold lands
// behind its twin: left and right swap and valleys become mountains.
export function k3BackPage(plan: K3Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const text = words[plan.locale]
  const back = backFaceWords(plan.locale, true)
  const sheet = k3SheetLines(plan)
  const minY = Math.min(...sheet.flat.outline.map(([, y]) => y))
  const mirror = (line: Line): Line => ({ ...line, points: line.points.map(([x, y]): Point => [-x, y]) })
  const swap = (dash?: number[]) => (dash === valleyDash ? mountainDash : dash === mountainDash ? valleyDash : dash)
  const swapInk = (stroke?: string) => (stroke === valleyInk ? mountainInk : stroke === mountainInk ? valleyInk : stroke)
  const out: Line[] = [{ id: 'back-outline', points: sheet.flat.outline.map(([x, y]): Point => [-x, y]), closed: true, stroke: muted, weight: 0.3 }]
  for (const line of sheet.creases) {
    out.push({ ...mirror(line), id: line.id + '-back-halo', weight: 1.2, stroke: halo, dash: undefined })
    out.push({ ...mirror(line), id: line.id + '-back', dash: swap(line.dash), stroke: swapInk(line.stroke) })
  }
  out.push(...sheet.slits.map((line) => ({ ...mirror(line), id: line.id + '-back' })))
  const lines = [...place(out, width / 2, sheetTop - minY), ...registrationCrosses(width, true)]
  const labels: PrintLabel[] = [
    { x: 40, y: 10, text: 'Open Flight  ·  K3', size: textMm.min, color: muted, font: 'display' },
    { x: 40, y: 17.5, text: text.names[plan.species] + '  ·  ' + back.title, size: 5, color: ink },
    ...back.lines.map((line, i) => ({ x: 9, y: height - 30 + i * 4.2, text: line, size: 2.8, color: ink })),
    { x: 9, y: height - printSafeMm - 1.5, text: footer, size: 2.2, color: ink },
  ]
  return { width, height, lines, labels }
}

// Guide pictures are drawn from the real geometry at small scale.
const circleAt = (x: number, y: number, r: number) => circle(x, y, r, 14)
function stepPicture(index: number, plan: K3Plan): Line[] {
  const { geo } = plan
  const sheet = k3SheetLines(plan)
  const flat = sheet.flat
  const L: Line[] = []
  const draw = (id: string, points: Point[], stroke = ink, weight = 0.4, extra: Partial<Line> = {}) => L.push({ id: `s${index}-${id}`, points, stroke, weight, ...extra })
  const outline = { id: 'outline', points: flat.outline, closed: true, stroke: ink, weight: 0.4, fill: paperFill } as Line
  if (index <= 1) {
    const parts: Line[] = [outline]
    if (index === 0) parts.push(...sheet.slits)
    else parts.push(...sheet.creases.map((c) => ({ ...c, weight: 0.4 })))
    return boxed(parts, 0, 0, 44, 26)
  }
  if (index === 2) {
    // Top view of the flat sheet with the doublers folded under (shown dashed).
    const parts: Line[] = [{ ...outline, points: [...geo.half, ...geo.half.slice(1, -1).reverse().map(([x, y]): Point => [-x, y])].map(([x, y]) => flat.toFlat([x, y], x < 0 ? -1 : 1)) }]
    for (const side of [1, -1]) {
      const m = (p: Point) => flat.toFlat([side * p[0], p[1]], side)
      parts.push({ id: 'folded-' + side, points: geo.doublerFolded.map(m), closed: true, fill: '#F3E3C4', stroke: mountainInk, weight: 0.35, dash: [0.8, 0.6] })
      parts.push({ id: 'ghost-' + side, points: geo.doubler.map(m), closed: true, stroke: muted, weight: 0.25, dash: [0.5, 0.5] })
    }
    return boxed(parts, 0, 0, 44, 26)
  }
  const arrow = (id: string, pts: Point[]) => {
    draw(id, pts, mountainInk, 0.45)
    const [x, y] = pts.at(-1)!,
      [fx, fy] = pts.at(-2)!
    const a = Math.atan2(y - fy, x - fx)
    const e = (o: number): Point => [x - 1.8 * Math.cos(a + o), y - 1.8 * Math.sin(a + o)]
    draw(id + '-tip', [e(0.5), [x, y], e(-0.5)], mountainInk, 0.45)
  }
  const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 16): Point[] =>
    Array.from({ length: n + 1 }, (_, i): Point => {
      const a = a0 + ((a1 - a0) * i) / n
      return [rounded(cx + r * Math.cos(a)), rounded(cy + r * Math.sin(a))]
    })
  if (index === 3) {
    // Side section through the head: printed side up, nose to the left.
    // Before (dashed): the flap lies flat ahead of the head. After: it is folded under the body.
    const y = 9
    draw('body', [[16, y], [42, y]], ink, 0.8)
    draw('head-mark', [[16, y - 1.6], [22, y - 1.6]], '#2A2030', 1.2)
    draw('flap-before', [[3, y], [16, y]], muted, 0.4, { dash: [0.8, 0.6] })
    draw('flap-after', [[16, y + 1.4], [29, y + 1.4]], '#2A2030', 1.0)
    draw('crease', arc(16, y + 0.7, 0.7, -Math.PI / 2, -1.5 * Math.PI, 6), mountainInk, 0.6)
    arrow('turn', arc(16, y + 1, 9, -Math.PI * 0.97, -Math.PI * 1.6, 14))
    return place(L, 0, 2)
  }
  if (index === 4) {
    // Tail view: wings out, two body walls hanging, the dark flap wrapped round their front.
    const cx = 22,
      top = 6,
      depth = 14
    draw('wing-l', [[3, top + 2.5], [cx - 0.7, top]], ink, 0.8)
    draw('wing-r', [[cx + 0.7, top], [41, top + 2.5]], ink, 0.8)
    draw('wall-l', [[cx - 0.7, top], [cx - 0.7, top + depth]], valleyInk, 0.7)
    draw('wall-r', [[cx + 0.7, top], [cx + 0.7, top + depth]], valleyInk, 0.7)
    draw('sleeve', [[cx - 1.8, top + 3], [cx - 1.8, top + depth + 1.1], [cx, top + depth + 1.9], [cx + 1.8, top + depth + 1.1], [cx + 1.8, top + 3]], '#2A2030', 1.0)
    draw('eye-l', circleAt(cx - 3.2, top + 7, 0.9), '#2A2030', 0.6, { closed: true, fill: '#F7EFD9' })
    draw('eye-r', circleAt(cx + 3.2, top + 7, 0.9), '#2A2030', 0.6, { closed: true, fill: '#F7EFD9' })
    return L
  }
  if (index === 5) return boxed(k3View(plan, 'perspective'), 0, 0, 44, 26)
  if (index === 6) {
    const side = k3View(plan, 'side')
    const by = geo.head_y + plan.estimate.balance_target_from_head_mm
    const finger: Line = { id: 'finger', points: [[by - 3, 40], [by - 3, 2], [by, -1], [by + 3, 2], [by + 3, 40]].map(([y, z]): Point => [y, z - 30 + 25]), stroke: green, weight: 0.5 }
    // Side view uses screen x = -y; place the finger at the same screen coordinate.
    const cam = camera(-90, 0.0001)
    const fx = cam([0, by, 0])[0]
    finger.points = [[fx - 3, 28], [fx - 3, 6], [fx, 3], [fx + 3, 6], [fx + 3, 28]]
    return boxed([...side, finger], 0, 0, 44, 26)
  }
  // Elevons: side section of the hindwing tab bent up.
  draw('wing', [[4, 14], [28, 14]], ink, 0.7)
  draw('tab', [[28, 14], [34, 11.5]], valleyInk, 0.8)
  draw('path', [[2, 4], [14, 5.5], [26, 7.5], [40, 9]], muted, 0.3, { dash: [0.8, 0.8] })
  return place(L, 2, 2)
}

export function k3GuidePage(plan: K3Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const text = words[plan.locale]
  const lines: Line[] = []
  const labels: PrintLabel[] = []
  const label = (x: number, y: number, copy: string, size: number, color = ink, font: PrintLabel['font'] = 'text') => labels.push({ x, y, text: copy, size, color, font })
  label(9, 10, 'Open Flight  ·  K3', textMm.min, muted, 'display')
  label(9, 18, text.guide + '  ·  ' + text.names[plan.species], textMm.title, ink, 'display')
  const cols = 4,
    colW = (width - 18) / cols
  const chars = Math.floor((colW - 4) / 1.83)
  for (const [i, step] of text.steps.entries()) {
    const x = 9 + (i % cols) * colW
    const y = 26 + Math.floor(i / cols) * ((height - 40) / 2)
    lines.push(...place(stepPicture(i, plan), x + 2, y))
    label(x, y + 32, `${i + 1}. ${step.title}`, textMm.body, ink, 'bold')
    let b = y + 37
    for (const part of wrap(step.action, chars)) (label(x, b, part, textMm.min), (b += 4.1))
    b += 0.8
    for (const part of wrap(step.check, chars)) (label(x, b, part, textMm.min, muted), (b += 4.1))
  }
  label(9, height - printSafeMm - 1.5, footer, 2.2)
  return { width, height, lines, labels }
}

// Design review: finished views, the numbers and the comparison with K2. English, for the
// design record; not part of the printed sheet.
export function k3ReviewPage(plan: K3Plan): Drawing {
  const [width, height] = pageSize[plan.paper]
  const lines: Line[] = []
  const labels: PrintLabel[] = []
  const label = (x: number, y: number, text: string, size: number, color = ink, font: PrintLabel['font'] = 'text') => labels.push({ x, y, text, size, color, font })
  const name = words.en.names[plan.species]
  label(9, 10, 'Open Flight  ·  design review', textMm.min, muted, 'display')
  label(9, 18, `${name} K3: a butterfly built like a dart`, textMm.title, ink, 'display')
  lines.push(...boxed(k3View(plan, 'perspective'), 9, 24, 150, 92))
  lines.push(...boxed(k3View(plan, 'top'), 168, 24, width - 177, 60))
  label(168, 90, 'Top', textMm.min, muted)
  lines.push(...boxed(k3View(plan, 'side'), 168, 96, 56, 22))
  label(168, 124, 'Side: clip under the head', textMm.min, muted)
  lines.push(...boxed(k3View(plan, 'rear'), 230, 96, width - 239, 22))
  label(240, 124, 'Tail view', textMm.min, muted)

  const k2 = makeK2({ species: plan.species }).prediction
  const e = plan.estimate,
    e1 = plan.estimateOneClip,
    eb = plan.estimateBonded
  const rows: [string, string, string][] = [
    ['', 'K2 costa', 'K3 dart'],
    ['Finished span', `${Math.round(k2.span_mm)} mm`, `${Math.round(e.span_mm)} mm`],
    ['Leading-edge sweep', k2.costa_sweep_deg < 0 ? `${Math.round(-k2.costa_sweep_deg)}° forward` : `${Math.round(k2.costa_sweep_deg)}° back`, `${Math.round(e.sweep_deg)}° back`],
    ['Wing area', `${k2.area_cm2.toFixed(0)} cm²`, `${e.area_cm2.toFixed(0)} cm²`],
    ['Aspect ratio', k2.aspect_ratio.toFixed(1), e.aspect_ratio.toFixed(1)],
    ['Paper mass, 120 g/m²', `${k2.paper_g.toFixed(2)} g`, `${e.paper_g.toFixed(2)} g`],
    ['Static margin, 2 clips', `${Math.round(k2.static_margin * 100)}%`, `${Math.round(e.static_margin * 100)}%`],
    ['Static margin, 1 clip', '—', `${Math.round(e1.static_margin * 100)}%`],
    ['Clip for +10% margin', `${k2.clip_needed_g.toFixed(2)} g`, `${e.clip_needed_g.toFixed(2)} g`],
    ['Glide speed', `${k2.glide_speed_m_s.toFixed(1)} m/s`, `${e.glide_speed_m_s.toFixed(1)} m/s`],
    ['Tip bend at 1 g', `${k2.tip_deflection_mm.toFixed(0)} mm`, `${e.tip_deflection_mm.toFixed(0)} mm (${eb.tip_deflection_mm.toFixed(0)} glued)`],
  ]
  let ty = 136
  for (const [i, [a, b, c]] of rows.entries()) {
    const font = i === 0 ? 'bold' : 'text'
    label(9, ty, a, textMm.min, ink, 'bold')
    label(62, ty, b, textMm.min, i === 0 ? ink : muted, font)
    label(92, ty, c, textMm.min, ink, font)
    ty += 4.4
  }
  const prose = [
    `What changed. K2 balances by holding the clips on a 24 mm antenna stick ahead of the wings. K3 gets that lever from sweep instead: each wing keeps its ${name.toLowerCase()} outline and markings but swings back about its root, so the lifting area moves behind a compact head. The forewings slide over the hindwings like a gliding butterfly’s, and the outline becomes an arrowhead.`,
    `Folds. A tan costa doubler folds under each forewing as a straight, doubled leading edge, the first fold of a paper dart. A dark nose flap folds under and wraps the front of the body, giving the head its eyes and a bumper. The body is deep at the thorax (${plan.keel_depth_mm} mm) and shallow at the abdomen (${plan.keel_tail_mm} mm), so the clip hides under the head and the side view reads as a butterfly body.`,
    'Honest limits. These are strip-theory estimates for flat paper, with a rough correction for the swept spar. Sweep does almost all the balancing; the nose flap and deep keel add a little margin, and the doublers are there for stiffness, not balance. The swept wing bends more than K2 unless the doublers are glued. No K3 flight has been recorded.',
    'Next check. Print page 1 at 100% on 120 g/m², build it with page 3, and compare five launches with a K2 built from the same paper.',
  ]
  let py = 136
  for (const p of prose) {
    for (const part of wrap(p, Math.floor((width - 131) / 1.82))) (label(122, py, part, 2.75), (py += 3.8))
    py += 1.6
  }
  label(9, height - printSafeMm - 1.5, footer + ' design review ' + plan.revision, 2.2)
  return { width, height, lines, labels }
}

function writePdf(pages: Drawing[], plan: K3Plan, title: string): Buffer {
  const [w, h] = pageSize[plan.paper]
  const doc = new jsPDF({ unit: 'mm', format: [w, h], orientation: 'landscape', compress: true, putOnlyUsedFonts: true, precision: 5 })
  doc.setCreationDate("D:20000101000000+00'00'")
  doc.setFileId(sha256(JSON.stringify(pages)).slice(0, 32))
  doc.setLanguage(plan.locale)
  doc.setProperties({ title, author: 'Open Flight contributors', subject: 'Original design: CERN-OHL-W-2.0. Artwork and text: © Open Flight, free for personal and classroom use; all other rights reserved. ' + fontNotice })
  registerFonts(doc, printFonts())
  doc.viewerPreferences({ PrintScaling: 'None' })
  for (const [index, pg] of pages.entries()) {
    if (index) doc.addPage([w, h], 'landscape')
    doc.setLineJoin('round')
    for (const line of pg.lines) {
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
    for (const l of pg.labels as PrintLabel[]) {
      useFont(doc, l.font)
      doc.setFontSize((atLeastText(l.size) * 72) / 25.4)
      doc.setTextColor(l.color ?? ink)
      doc.text(l.text, l.x, l.y)
    }
  }
  return Buffer.from(doc.output('arraybuffer'))
}

// The printed sheet: cut page, its back face for double-sided printing, and the guide.
export function k3Pdf(plan: K3Plan): Buffer {
  return writePdf([k3CutPage(plan), k3BackPage(plan), k3GuidePage(plan)], plan, 'Open Flight - K3 dart butterfly')
}
// The design record: the sheet plus the review page.
export function k3ReviewPdf(plan: K3Plan): Buffer {
  return writePdf([k3CutPage(plan), k3GuidePage(plan), k3ReviewPage(plan)], plan, 'Open Flight - K3 dart butterfly design review')
}

// ---------------------------------------------------------------------------------------
// SVG views for the workshop page, the 3D specimen and the book artwork.

const svgPath = (l: Line) =>
  `<path d="M${l.points.map((p) => p.join(' ')).join(' L')}${l.closed ? ' Z' : ''}" fill="${l.fill ?? 'none'}" stroke="${l.stroke ?? 'none'}" stroke-width="${l.weight ?? 0}"${l.dash ? ` stroke-dasharray="${l.dash.join(' ')}"` : ''}/>`

export function k3BuildSteps(plan: K3Plan) {
  return words[plan.locale].steps.map((step, index) => ({
    ...step,
    diagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 26" aria-hidden="true">' + stepPicture(index, plan).map(svgPath).join('') + '</svg>',
  }))
}

export function k3FinishedSvg(plan: K3Plan): string {
  const lines = k3Art(plan.geo, plan.appearance_id)
  const xs = plan.geo.top.map(([x]) => x),
    ys = plan.geo.top.map(([, y]) => y)
  const all = lines.flatMap((l) => l.points)
  const x0 = Math.min(...xs, ...all.map(([x]) => x)) - 3,
    y0 = Math.min(...ys, ...all.map(([, y]) => y)) - 3
  const w = Math.max(...xs, ...all.map(([x]) => x)) + 3 - x0,
    h = Math.max(...ys, ...all.map(([, y]) => y)) + 3 - y0
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${rounded(x0)} ${rounded(y0)} ${rounded(w)} ${rounded(h)}" role="img">${lines.map(svgPath).join('')}</svg>`
}

// The flat sheet alone, used as the 3D paper texture. Its viewBox starts 3 mm outside the outline.
export function k3PreviewBox(plan: K3Plan) {
  const outline = k3Flat(plan.geo).outline
  const xs = outline.map(([x]) => x),
    ys = outline.map(([, y]) => y)
  const half = Math.max(...xs.map(Math.abs))
  return { width: rounded(2 * half + 6), height: rounded(Math.max(...ys) - Math.min(...ys) + 6), top: Math.min(...ys) }
}
export function k3Preview(plan: K3Plan): string {
  const box = k3PreviewBox(plan)
  return svg({ width: box.width, height: box.height, lines: place(k3SheetLines(plan).lines, box.width / 2, 3 - box.top), labels: [] })
    .toString('utf8')
    .replace(` width="${box.width}mm" height="${box.height}mm"`, '')
}
export function k3PageSvg(plan: K3Plan, page: 0 | 1 | 2 = 0): string {
  return svg([k3CutPage, k3BackPage, k3GuidePage][page](plan)).toString('utf8')
}

// Finished model for the 3D specimen. Each face lists its points on the flat sheet (for the
// texture) and in the finished model: x across, up, z from nose (negative) to tail (positive),
// centred on the body. Wings meet at the root line; the keel walls hang below it.
export function k3Faces(plan: K3Plan) {
  const { geo } = plan
  const flat = k3Flat(geo)
  const d = (geo.pose.dihedral_deg * Math.PI) / 180
  const center = (geo.head_y + geo.tail_y) / 2
  const faces: { side: number; part: 'wing' | 'wall'; flat: Point[]; points: [number, number, number][] }[] = []
  for (const side of [-1, 1]) {
    faces.push({
      side,
      part: 'wing',
      flat: geo.half.map((p) => flat.toFlat(p, side)),
      points: geo.half.map(([x, y]) => [rounded(side * x * Math.cos(d)), rounded(x * Math.sin(d)), rounded(y - center)]),
    })
    const [A, E] = flat.crease.root
    const wallFlat: Point[] = [[0, geo.head_y], [side * A[0], A[1]], [side * E[0], E[1]], [0, E[1]]]
    faces.push({
      side,
      part: 'wall',
      flat: wallFlat,
      points: [
        [0.12 * side, -geo.pose.keel_front_mm, rounded(geo.head_y - center)],
        [0.12 * side, 0, rounded(geo.head_y - center)],
        [0.12 * side, 0, rounded(geo.tail_y - center)],
        [0.12 * side, -geo.pose.keel_tail_mm, rounded(geo.tail_y - center)],
      ],
    })
  }
  // Two 33 mm clips pushed onto the head from the front, seen from the side.
  const nose = geo.head_y - center - 1.2
  const clip = (offset: number): [number, number, number][] =>
    [
      [nose + 31, 0.5], [nose + 2, 0.5], [nose, 2.5], [nose + 0.3, 5], [nose + 2, 7],
      [nose + 29, 7], [nose + 31, 5], [nose + 29, 3], [nose + 4, 3],
    ].map(([z, rise]): [number, number, number] => [0.55 + offset, rounded(rise - geo.pose.keel_front_mm - 0.3), rounded(z)])
  return { faces, clips: [clip(0), clip(-1.1)], center }
}

export { clipCentreFromHead, polygonArea }
