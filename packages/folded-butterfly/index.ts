import {
  rounded,
  type Drawing,
  type Line,
  type Point,
} from '../geometry/butterfly.ts'
import { toPaper, wingArt, wingShape } from '../geometry/workshop-art.ts'
import {
  workshopModels,
  type Species,
  type WorkshopModel,
} from '../geometry/workshop-models.ts'
import {
  pdf,
  sizes,
  svg,
  type Locale,
  type Paper,
} from '../print-export/sheets.ts'
import { keelDiagram, keelSteps, type KeelStep } from '../../apps/editor/keel-guide.js'
import { backFaceWords, printSafeMm } from '../../apps/editor/assets/print-faces.js'

type Appearance = keyof WorkshopModel['palettes']
export type FoldedSettings = {
  format?: 'open-flight-folded-butterfly'
  revision?: 'k1'
  species?: Species
  span_mm?: number
  appearance_id?: Appearance
  paper?: Paper
}

const bodyDepth = 8
export const foldedSpanSpec = workshopModels[0].parameter_definitions.find(({ name }) => name === 'span_mm')!
export const foldedSpecies = workshopModels.map(({ species }) => species)
export function isFoldedSpan(value: number): boolean {
  const { minimum, maximum, step } = foldedSpanSpec
  return Number.isInteger(value) && value >= minimum && value <= maximum && (value - minimum) % step === 0
}
const evidence = 'experimental_unvalidated' as const
const dark = '#272239'
const centerInk = '#005A8D'
const wingInk = '#813842'
const clipInk = '#254A36'
const halo = '#FFFEF4'
const valleyDash = [0.65, 1.05]
const mountainDash = [2.8, 0.9, 0.55, 0.9]

export type FoldedPlan = Required<FoldedSettings> & {
  locale: Locale
  keel_depth_mm: number
  flat_span_mm: number
  clip_station_mm: number
  body_length_mm: number
  nose_y_mm: number
  abdomen_y_mm: number
  evidence: typeof evidence
  steps: KeelStep[]
}

function modelFor(species: Species) {
  const model = workshopModels.find((item) => item.species === species)
  if (!model) throw new Error('Unknown folded butterfly species')
  return model
}

export function makeFoldedButterfly(
  settings: FoldedSettings = {},
  locale: Locale = 'en',
): FoldedPlan {
  const {
    format = 'open-flight-folded-butterfly',
    revision = 'k1',
    species = 'monarch',
    appearance_id = 'natural',
    paper = 'A4',
  } = settings
  if (format !== 'open-flight-folded-butterfly')
    throw new Error('Unknown folded butterfly source format')
  if (revision !== 'k1') throw new Error('Unknown folded butterfly revision')
  const model = modelFor(species)
  const { span_mm = model.parameters.span_mm } = settings
  if (!isFoldedSpan(span_mm)) {
    const { minimum, maximum, step } = foldedSpanSpec
    throw new Error(`Finished span must be from ${minimum} to ${maximum} mm in ${step} mm increments`)
  }
  if (!Object.hasOwn(model.palettes, appearance_id))
    throw new Error('Unknown butterfly appearance')
  if (!Object.hasOwn(sizes, paper)) throw new Error('Unknown paper size')
  if (!Object.hasOwn(words, locale)) throw new Error('Unknown print locale')
  const { nose_y, abdomen_y, clip_rear_from_nose_mm } = model.geometry
  return {
    format,
    revision,
    species,
    span_mm,
    appearance_id,
    paper,
    locale,
    keel_depth_mm: bodyDepth,
    flat_span_mm: span_mm + 2 * bodyDepth,
    clip_station_mm: clip_rear_from_nose_mm,
    body_length_mm: abdomen_y - nose_y,
    nose_y_mm: nose_y,
    abdomen_y_mm: abdomen_y,
    evidence,
    steps: keelSteps(locale),
  }
}

export function foldedGeometry(plan: FoldedPlan) {
  const model = modelFor(plan.species)
  const original = wingShape(model)
  const {
    nose_y_mm: nose,
    abdomen_y_mm: tail,
    keel_depth_mm: depth,
    clip_station_mm: station,
  } = plan
  const translate =
    (side: number) =>
    ([x, y]: Point): Point => [rounded(x + side * depth), y]
  const originalOutline = original.outline.map((point) =>
    toPaper(point, plan.span_mm),
  )
  const midpoint = originalOutline.findIndex(([x, y]) => x === 0 && y === tail)
  const right = originalOutline.slice(0, midpoint + 1).map(translate(1))
  const left = [
    originalOutline[midpoint],
    ...originalOutline.slice(midpoint + 1),
    originalOutline[0],
  ].map(translate(-1))
  const outline = [...right, ...left]
  const web: Point[] = [
    [-depth, nose],
    [depth, nose],
    [depth, tail],
    [-depth, tail],
  ]
  const creases: Line[] = [-depth, 0, depth].map((x) => ({
    id: x === 0 ? 'center-valley' : x < 0 ? 'left-mountain' : 'right-mountain',
    points: [
      [x, nose],
      [x, tail],
    ],
    dash: x === 0 ? valleyDash : mountainDash,
    stroke: x === 0 ? centerInk : wingInk,
    weight: 0.46,
  }))
  const clipStops: Line[] = [-1, 1].map((side) => ({
    id: side < 0 ? 'left-clip-stop' : 'right-clip-stop',
    points: [
      [side, nose + station],
      [side * (depth - 1), nose + station],
    ],
    stroke: clipInk,
    weight: 0.56,
  }))
  const shoulders: Line[] = [-1, 1].map((side) => ({
    id: side < 0 ? 'left-clip-shoulder' : 'right-clip-shoulder',
    points: Array.from({ length: 16 }, (_, i): Point => {
      const angle = (i * Math.PI) / 8
      return [
        rounded(side * (depth + 2.3) + 0.65 * Math.cos(angle)),
        rounded(nose + station + 0.65 * Math.sin(angle)),
      ]
    }),
    closed: true,
    fill: clipInk,
    stroke: halo,
    weight: 0.45,
  }))
  const art = wingArt(model, plan.appearance_id, plan.span_mm, original)
  // Place the new paper web between the original wing backgrounds. Species markings and the
  // original two halves of the printed insect move with their own side of the cut.
  const lines: Line[] = [
    { id: 'paper-web', points: web, closed: true, fill: '#FFFFFF' },
    { ...art[0], id: 'wing-background', points: right, stroke: undefined },
    { ...art[0], id: 'wing-background-left', points: left, stroke: undefined },
  ]
  for (const line of art.slice(1)) {
    for (const side of [-1, 1]) {
      const pieces = artHalf(line, side)
      for (const [index, points] of pieces.entries()) {
        lines.push({
          ...line,
          id: line.id + (side < 0 ? '-l-' : '-r-') + index,
          points: points.map(translate(side)),
        })
      }
    }
  }
  for (const line of [...creases, ...clipStops]) {
    lines.push(
      {
        ...line,
        id: line.id + '-halo',
        weight: 1.25,
        stroke: halo,
        dash: undefined,
      },
      line,
    )
  }
  lines.push(...shoulders)
  lines.push({
    id: 'cut',
    points: outline,
    closed: true,
    stroke: dark,
    weight: 0.52,
  })
  return {
    outline,
    web,
    left,
    right,
    originalOutline,
    creases,
    clipStops,
    shoulders,
    lines,
  }
}

// Keep intersections on the original axis so each half of the painted body joins
// exactly in the folded top view. An open line can yield multiple separate pieces.
function artHalf(line: Line, side: number): Point[][] {
  const points = line.points
  const inside = ([x]: Point) => x * side >= 0
  if (points.every(inside)) return [points]
  if (!points.some(([x]) => x * side > 0)) return []
  const crossing = ([x, y]: Point, [u, v]: Point): Point => [
    0,
    rounded(y - ((v - y) * x) / (u - x)),
  ]
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

const words = {
  en: {
    names: {
      monarch: 'Monarch',
      morpho: 'Blue morpho',
      swallowtail: 'Swallowtail',
    },
    note: 'Experimental folded body · Physical build and flight trials pending',
    print: 'Print at 100% / actual size. Measure this line before cutting.',
    labels: ['Cut', 'Center valley', 'Wing mountains', 'Clip stop'],
    build: 'Build with scissors and one small rounded paper clip',
    span: 'finished span',
    flat: 'flat span',
    rear: 'View from tail toward nose',
    guide: 'How to build and launch',
    next: 'Open page 2 for illustrated steps.',
    gauge: 'Full-size nose and clip gauge',
    gaugeHelp:
      'Place the folded body on its side. Match its nose to the left line.',
    gaugeStop: 'The back end of the clip should meet the green line.',
    nose: 'Nose',
    clip: 'Back of clip',
    assembledTop: 'Assembled · top view',
    assembledRear: 'Tail view · both wings level',
    keelLayers: 'Two layers touch',
  },
  es: {
    names: {
      monarch: 'Monarca',
      morpho: 'Morfo azul',
      swallowtail: 'Cola de golondrina',
    },
    note: 'Cuerpo plegado experimental · Pendiente de probar en papel y en vuelo',
    print:
      'Imprime al 100 % en tamaño real. Mide esta línea antes de recortar.',
    labels: ['Corte', 'Doblez central', 'Dobleces de alas', 'Tope del clip'],
    build: 'Construye con tijeras y un clip pequeño y redondeado',
    span: 'envergadura final',
    flat: 'envergadura en plano',
    rear: 'Vista de la cola a la punta',
    guide: 'Cómo construir y lanzar',
    next: 'Consulta la página 2 para ver los pasos ilustrados.',
    gauge: 'Guía del clip a tamaño real',
    gaugeHelp:
      'Apoya de lado el cuerpo plegado. Alinea su punta con la línea izquierda.',
    gaugeStop: 'El extremo trasero del clip debe llegar a la línea verde.',
    nose: 'Punta',
    clip: 'Extremo trasero',
    assembledTop: 'Plegada · vista superior',
    assembledRear: 'Desde la cola · alas al mismo nivel',
    keelLayers: 'Las dos capas se tocan',
  },
  ru: {
    names: {
      monarch: 'Монарх',
      morpho: 'Голубой морфо',
      swallowtail: 'Махаон',
    },
    note: 'Опытный сложенный корпус · Сборку и полёт ещё предстоит испытать',
    print: 'Печатай в масштабе 100%. Перед вырезанием измерь эту линию.',
    labels: ['Разрез', 'Сгиб в центре', 'Сгибы крыльев', 'Метка скрепки'],
    build: 'Для сборки нужны ножницы и небольшая закруглённая скрепка',
    span: 'размах крыльев',
    flat: 'размах развёртки',
    rear: 'Вид от хвоста к носу',
    guide: 'Сборка и запуск',
    next: 'На странице 2 — пошаговые рисунки.',
    gauge: 'Шкала для скрепки в натуральную величину',
    gaugeHelp: 'Положи сложенный корпус набок. Совмести нос с левой линией.',
    gaugeStop: 'Задний край скрепки должен совпасть с зелёной линией.',
    nose: 'Нос',
    clip: 'Задний край',
    assembledTop: 'В сборе · вид сверху',
    assembledRear: 'Вид с хвоста · крылья на одном уровне',
    keelLayers: 'Два слоя соприкасаются',
  },
}

function placed(lines: Line[], x0: number, y0: number, scale = 1): Line[] {
  return lines.map((line) => ({
    ...line,
    points: line.points.map(([x, y]): Point => [
      rounded(x0 + scale * x),
      rounded(y0 + scale * y),
    ]),
  }))
}

function wrap(text: string, limit: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? line + ' ' + word : word
    if (line && next.length > limit) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

function stepDiagram(
  step: KeelStep['id'],
  plan: FoldedPlan,
  geometry: ReturnType<typeof foldedGeometry>,
): Line[] {
  const lines: Line[] = []
  const draw = (id: string, points: Point[], stroke = dark, weight = 0.48) =>
    lines.push({ id: step + '-' + id, points, stroke, weight })
  const arrow = (id: string, points: Point[]) => {
    draw(id, points, wingInk)
    const [x, y] = points.at(-1)!
    const [fromX, fromY] = points.at(-2)!
    const a = Math.atan2(y - fromY, x - fromX)
    const end = (offset: number): Point => [
      x - 1.45 * Math.cos(a + offset),
      y - 1.45 * Math.sin(a + offset),
    ]
    draw(id + '-tip', [end(0.48), [x, y], end(-0.48)], wingInk)
  }
  if (step === 'cut') {
    const scale = 0.11
    const top = Math.min(...geometry.outline.map((point) => point[1]))
    draw(
      'shape',
      geometry.outline.map(([x, y]) => [x * scale, (y - top) * scale]),
    )
    lines[0].closed = true
    for (const crease of geometry.creases)
      draw(
        crease.id,
        crease.points.map(([x, y]) => [x * scale, (y - top) * scale]),
        crease.stroke,
        0.32,
      )
  } else if (step === 'center') {
    draw('paper', [
      [-12, 5],
      [-4, 5],
      [0, 5],
      [4, 5],
      [12, 5],
    ])
    draw(
      'valley',
      [
        [0, 4.45],
        [0, 5.55],
      ],
      centerInk,
      0.85,
    )
    arrow('left-arrow', [
      [-12, 4],
      [-10, 1.8],
      [-7, 0.5],
    ])
    arrow('right-arrow', [
      [12, 4],
      [10, 1.8],
      [7, 0.5],
    ])
  } else if (step === 'wings') {
    draw(
      'pinched',
      [
        [-1, 7],
        [-1, 2],
        [-1, 0],
      ],
      dark,
    )
    draw(
      'pinched-other',
      [
        [1, 7],
        [1, 2],
        [1, 0],
      ],
      dark,
    )
    draw(
      'crease',
      [
        [-1, 3],
        [1, 3],
      ],
      wingInk,
      0.65,
    )
    arrow('left-arrow', [
      [-2, 1],
      [-6, 1.5],
      [-10, 4],
    ])
    arrow('right-arrow', [
      [2, 1],
      [6, 1.5],
      [10, 4],
    ])
  } else if (step === 'table') {
    draw(
      'table',
      [
        [-15, 6.5],
        [15, 6.5],
      ],
      '#66736F',
      0.7,
    )
    draw('paper', [
      [-12, 6],
      [-0.55, 6],
      [-0.55, 0.5],
      [0.55, 0.5],
      [0.55, 6],
      [12, 6],
    ])
    arrow('left-press', [
      [-8, 0],
      [-8, 4.9],
    ])
    arrow('right-press', [
      [8, 0],
      [8, 4.9],
    ])
  } else if (step === 'clip') {
    // Side elevation. A 7 mm wall drawing keeps the printed nose station legible.
    const start = -12
    const stop = start + plan.clip_station_mm * 0.69
    draw('wall', [
      [start, 0.5],
      [13, 0.5],
      [13, 7.5],
      [start, 7.5],
      [start, 0.5],
    ])
    draw(
      'stop',
      [
        [stop, 1.1],
        [stop, 6.9],
      ],
      clipInk,
      0.52,
    )
    draw(
      'clip',
      [
        [start - 1.8, 4.6],
        [stop - 1.2, 4.6],
        [stop, 3.8],
        [stop - 1.2, 3],
        [start - 0.65, 3],
      ],
      wingInk,
      0.62,
    )
  } else {
    draw('level', [
      [-12, 1.5],
      [0, 1.5],
      [12, 1.5],
    ])
    draw('grip', [
      [-0.48, 1.5],
      [-0.48, 7.1],
      [0.48, 7.1],
      [0.48, 1.5],
    ])
    draw(
      'finger-left',
      [
        [-3.2, 4.7],
        [-2.1, 6.15],
        [-0.55, 6.15],
      ],
      clipInk,
    )
    draw(
      'finger-right',
      [
        [3.2, 4.7],
        [2.1, 6.15],
        [0.55, 6.15],
      ],
      clipInk,
    )
  }
  return lines
}

function drawing(
  plan: FoldedPlan,
  geometry: ReturnType<typeof foldedGeometry>,
  quickStart = false,
): Drawing & { locale: Locale } {
  const [width, height] = sizes[plan.paper]
  const text = words[plan.locale]
  const lines = placed(geometry.lines, width / 2, 29)
  const labels: Drawing['labels'] = []
  const label = (
    x: number,
    y: number,
    copy: string,
    size: number,
    color = dark,
  ) => labels.push({ x, y, text: copy, size, color })
  label(9, 10, 'OPEN FLIGHT  /  K1', 3.2, clipInk)
  lines.push(...registrationCrosses(width, false))
  label(9, 18, text.names[plan.species], 6.1)
  label(9, 24, text.note, 2.8)
  label(
    9,
    28.6,
    `${plan.span_mm} mm ${text.span}  ·  ${plan.flat_span_mm} mm ${text.flat}`,
    2.6,
  )
  const keys = [
    { id: 'key-cut', stroke: dark, weight: 0.52 },
    { ...geometry.creases[1], id: 'key-center' },
    { ...geometry.creases[0], id: 'key-wings' },
    { ...geometry.clipStops[0], id: 'key-clip' },
  ]
  for (const [index, key] of keys.entries()) {
    const x = 9 + index * ((width - 18) / keys.length)
    lines.push({
      ...key,
      points: [
        [x, 132],
        [x + 10, 132],
      ],
    })
    label(x + 12, 133, text.labels[index], 2.6)
  }
  lines.push({
    id: 'ruler',
    points: [
      [9, 143],
      [59, 143],
    ],
    stroke: dark,
    weight: 0.44,
  })
  for (let mm = 0; mm <= 50; mm += 5)
    lines.push({
      id: 'ruler-tick-' + mm,
      points: [
        [9 + mm, 143],
        [9 + mm, mm % 10 === 0 ? 140.2 : 141.3],
      ],
      stroke: dark,
      weight: 0.32,
    })
  label(62, 143.5, '50 mm  ·  ' + text.print, 2.85)
  label(9, 151, text.build, 3.45, clipInk)
  if (quickStart) {
    label(9, 157, text.next, 3.35, clipInk)
    const columnWidth = (width - 18) / 2
    plan.steps.forEach((step, index) =>
      label(
        9 + (index % 2) * columnWidth,
        169 + Math.floor(index / 2) * 9,
        index + 1 + '. ' + step.title,
        3.8,
      ),
    )
    const x = 10
    const y = 218
    const stop = x + plan.clip_station_mm
    lines.push(
      {
        id: 'gauge-wall',
        points: [
          [x, y],
          [x + 39, y],
          [x + 39, y + 8],
          [x, y + 8],
        ],
        closed: true,
        fill: '#E6EEEB',
        stroke: '#788F84',
        weight: 0.29,
      },
      {
        id: 'gauge-nose',
        points: [
          [x, y - 1.3],
          [x, y + 9.3],
        ],
        stroke: dark,
        weight: 0.44,
      },
      {
        id: 'gauge-clip-stop',
        points: [
          [stop, y - 1.3],
          [stop, y + 9.3],
        ],
        stroke: clipInk,
        weight: 0.62,
      },
    )
    label(x, 202, text.gauge, 4.5)
    label(x, y + 15, text.nose, 2.75)
    label(stop, y + 15, text.clip, 2.75, clipInk)
    label(x, y + 21, plan.clip_station_mm + ' mm', 3.2)
    label(58, y + 2.1, text.gaugeHelp, 3.3)
    label(58, y + 8.1, text.gaugeStop, 3.3)
  } else {
    label(9, 155.5, text.rear + ' (2–4, 6)', 2.35)
    const columnWidth = (width - 18) / 2
    for (const [index, step] of plan.steps.entries()) {
      const x = 9 + (index % 2) * columnWidth
      const y = 163 + Math.floor(index / 2) * 36
      lines.push(
        ...placed(stepDiagram(step.id, plan, geometry), x + 17, y - 4.7),
      )
      label(x, y + 9, index + 1 + '. ' + step.title, 3)
      let baseline = y + 13.7
      for (const content of wrap(step.action, 67)) {
        label(x, baseline, content, 2.43)
        baseline += 3.25
      }
      baseline += 0.5
      for (const content of wrap(step.check, 67)) {
        label(x, baseline, content, 2.43, clipInk)
        baseline += 3.25
      }
    }
  }
  label(9, height - printSafeMm - 1.5, 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0', 2.2)
  return { width, height, lines, labels, locale: plan.locale }
}

function guideDrawing(
  plan: FoldedPlan,
  geometry: ReturnType<typeof foldedGeometry>,
): Drawing {
  const [width, height] = sizes[plan.paper]
  const copy = words[plan.locale]
  const lines: Line[] = []
  const labels: Drawing['labels'] = [
    { x: 9, y: 10, text: 'OPEN FLIGHT  /  K1', size: 3.2, color: clipInk },
    { x: 9, y: 20, text: copy.guide, size: 6.1 },
    { x: 9, y: 26.5, text: copy.rear + ' (2–4, 6)', size: 3.15 },
  ]
  let y = 33
  for (const [index, step] of plan.steps.entries()) {
    lines.push(
      {
        id: 'step-rule-' + index,
        points: [
          [9, y],
          [width - 9, y],
        ],
        stroke: '#B7C7C0',
        weight: 0.32,
      },
      ...placed(stepDiagram(step.id, plan, geometry), 34, y + 10, 1.48),
    )
    const x = 62
    labels.push({
      x,
      y: y + 7.45,
      text: index + 1 + '. ' + step.title,
      size: 4.12,
      color: clipInk,
    })
    let baseline = y + 13.7
    for (const line of wrap(step.action, 65)) {
      labels.push({ x, y: baseline, text: line, size: 3.53 })
      baseline += 4.75
    }
    baseline += 1.15
    for (const line of wrap(step.check, 65)) {
      labels.push({ x, y: baseline, text: line, size: 3.53, color: clipInk })
      baseline += 4.75
    }
    y = Math.max(y + 34, baseline - 0.5)
  }
  labels.push({
    x: 9,
    y: height - printSafeMm - 1.5,
    text: 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0',
    size: 2.2,
  })
  return { width, height, lines, labels }
}

// Two crosses at the same physical spots on both faces of a double-sided print.
const crossSpots = (width: number): Point[] => [[width - 14, 12], [width - 30, 12]]
function registrationCrosses(width: number, back: boolean): Line[] {
  return crossSpots(width).flatMap(([x0, y], i): Line[] => {
    const x = back ? width - x0 : x0
    return [
      { id: `register-ring-${i}`, points: Array.from({ length: 16 }, (_, k): Point => [rounded(x + 2.1 * Math.cos((k * Math.PI) / 8)), rounded(y + 2.1 * Math.sin((k * Math.PI) / 8))]), closed: true, fill: '#FFFFFF', stroke: dark, weight: 0.3 },
      { id: `register-h-${i}`, points: [[x - 3, y], [x + 3, y]], stroke: dark, weight: 0.3 },
      { id: `register-v-${i}`, points: [[x, y - 3], [x, y + 3]], stroke: dark, weight: 0.3 },
    ]
  })
}

// The back of the cut sheet for long-edge double-sided printing. Each fold appears where it
// meets the paper from behind: left and right swap, and valleys become mountains. The outline
// is drawn thin so a builder can check that both faces line up after cutting.
function backDrawing(plan: FoldedPlan, geometry: ReturnType<typeof foldedGeometry>): Drawing & { locale: Locale } {
  const [width, height] = sizes[plan.paper]
  const back = backFaceWords(plan.locale)
  const mirror = (line: Line): Line => ({ ...line, points: line.points.map(([x, y]): Point => [-x, y]) })
  const swapped = (line: Line): Line => ({
    ...mirror(line),
    dash: line.dash === valleyDash ? mountainDash : line.dash === mountainDash ? valleyDash : line.dash,
  })
  const sheet: Line[] = [
    { id: 'back-outline', points: geometry.outline.map(([x, y]): Point => [-x, y]), closed: true, stroke: '#8C8898', weight: 0.3 },
  ]
  for (const line of [...geometry.creases, ...geometry.clipStops]) {
    sheet.push({ ...mirror(line), id: line.id + '-back-halo', weight: 1.25, stroke: halo, dash: undefined })
    sheet.push({ ...swapped(line), id: line.id + '-back' })
  }
  sheet.push(...geometry.shoulders.map((line) => ({ ...mirror(line), id: line.id + '-back' })))
  const lines = [...placed(sheet, width / 2, 29), ...registrationCrosses(width, true)]
  const text = words[plan.locale]
  const labels: Drawing['labels'] = [
    // The registration crosses mirror to the top left on this face, so the header starts after them.
    { x: 40, y: 10, text: 'OPEN FLIGHT  /  K1', size: 3.2, color: clipInk },
    { x: 40, y: 18, text: text.names[plan.species] + '  ·  ' + back.title, size: 5.2, color: dark },
    ...back.lines.map((line, i) => ({ x: 9, y: 140 + i * 4.4, text: line, size: 2.8, color: dark })),
    { x: 9, y: height - printSafeMm - 1.5, text: 'Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0', size: 2.2, color: dark },
  ]
  return { width, height, lines, labels, locale: plan.locale }
}

// The three printed pages as drawings: cut sheet, its back face and the guide.
export function foldedPages(plan: FoldedPlan): Drawing[] {
  const geometry = foldedGeometry(plan)
  return [drawing(plan, geometry, true), backDrawing(plan, geometry), guideDrawing(plan, geometry)]
}

export function foldedBackSvg(plan: FoldedPlan): string {
  return svg(backDrawing(plan, foldedGeometry(plan))).toString('utf8')
}

export function foldedSvg(plan: FoldedPlan, quickStart = false): string {
  return svg(drawing(plan, foldedGeometry(plan), quickStart)).toString('utf8')
}

export function foldedGuideSvg(plan: FoldedPlan): string {
  return svg(guideDrawing(plan, foldedGeometry(plan))).toString('utf8')
}

export function foldedPdf(plan: FoldedPlan): Uint8Array {
  const geometry = foldedGeometry(plan)
  // Page 2 is the back of the cut sheet for double-sided printing; page 3 is the guide.
  return pdf(drawing(plan, geometry, true), [backDrawing(plan, geometry), guideDrawing(plan, geometry)])
}

export function foldedSource(plan: FoldedPlan): string {
  const { format, revision, species, span_mm, appearance_id, paper } = plan
  return (
    JSON.stringify(
      { format, revision, species, span_mm, appearance_id, paper },
      null,
      2,
    ) + '\n'
  )
}

export function foldedPreview(plan: FoldedPlan): string {
  const geometry = foldedGeometry(plan)
  const ys = geometry.outline.map((point) => point[1])
  const top = Math.min(...ys),
    bottom = Math.max(...ys)
  const width = plan.flat_span_mm + 6
  const height = rounded(bottom - top + 6)
  return svg({
    width,
    height,
    lines: placed(geometry.lines, width / 2, 3 - top),
    labels: [],
  })
    .toString('utf8')
    .replace(` width="${width}mm" height="${height}mm"`, '')
}

export function foldedLessonSvg(plan: FoldedPlan, index: number): string {
  const color = modelFor(plan.species).palettes[plan.appearance_id].base
  return keelDiagram(plan, index, color, () => foldedPreview(plan))
}

export function foldedFinishedPreview(plan: FoldedPlan): string {
  const model = modelFor(plan.species)
  const shape = wingShape(model)
  const copy = words[plan.locale]
  // With both wings against the same plane, their roots coincide directly above
  // the center crease. The top projection is the unexpanded species pattern.
  const topArt = wingArt(model, plan.appearance_id, plan.span_mm, shape)
  const ys = shape.outline.map((point) => point[1])
  const drawingTop = 12 - Math.min(...ys)
  const drawingBottom = Math.max(...ys) + drawingTop
  const width = plan.span_mm + 12
  const center = width / 2
  const wingLevel = rounded(drawingBottom + 23)
  const keelBottom = rounded(wingLevel + plan.keel_depth_mm)
  const height = rounded(keelBottom + 7)
  const colors = model.palettes[plan.appearance_id]
  const art = placed(
    topArt.map((line) => ({ ...line, id: 'assembled-' + line.id })),
    center,
    drawingTop,
  )

  // Rear elevation. Two overlapping strokes show the walls' touching faces. Their
  // nominal geometry has zero gap and both retreat 8 mm under the level wings.
  const sideView: Line[] = [
    {
      id: 'rear-wing-plane',
      points: [
        [6, wingLevel],
        [width - 6, wingLevel],
      ],
      stroke: dark,
      weight: 0.76,
    },
    {
      id: 'rear-color-left',
      points: [
        [6, wingLevel - 0.47],
        [center, wingLevel - 0.47],
      ],
      stroke: colors.base,
      weight: 0.47,
    },
    {
      id: 'rear-color-right',
      points: [
        [center, wingLevel - 0.47],
        [width - 6, wingLevel - 0.47],
      ],
      stroke: colors.base,
      weight: 0.47,
    },
    {
      id: 'rear-wall-left',
      points: [
        [center - 0.31, wingLevel],
        [center - 0.31, keelBottom],
      ],
      stroke: dark,
      weight: 0.62,
    },
    {
      id: 'rear-wall-right',
      points: [
        [center + 0.31, wingLevel],
        [center + 0.31, keelBottom],
      ],
      stroke: '#53596C',
      weight: 0.62,
    },
    {
      id: 'rear-center-crease',
      points: [
        [center - 0.31, keelBottom],
        [center + 0.31, keelBottom],
      ],
      stroke: dark,
      weight: 0.61,
    },
    {
      id: 'rear-depth-mark',
      points: [
        [center + 4, wingLevel],
        [center + 6, wingLevel],
        [center + 6, keelBottom],
        [center + 4, keelBottom],
      ],
      stroke: clipInk,
      weight: 0.46,
    },
  ]
  const labels: Drawing['labels'] = [
    { x: 6, y: 7.5, text: copy.assembledTop, size: 3.65, color: dark },
    {
      x: 6,
      y: wingLevel - 5.5,
      text: copy.assembledRear,
      size: 3.25,
      color: dark,
    },
    {
      x: center + 9,
      y: keelBottom - 2.6,
      text: plan.keel_depth_mm + ' mm',
      size: 3.2,
      color: clipInk,
    },
    {
      x: center + 9,
      y: keelBottom + 1.7,
      text: copy.keelLayers,
      size: 2.7,
      color: clipInk,
    },
  ]
  return svg({ width, height, lines: [...art, ...sideView], labels })
    .toString('utf8')
    .replace(` width="${width}mm" height="${height}mm"`, '')
}
