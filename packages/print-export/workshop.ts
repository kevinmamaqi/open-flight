import { rounded, type Drawing, type Label, type Line, type Point } from '../geometry/butterfly.ts'
import {
  placeArt,
  tabHeight,
  wingtipHeight,
  workshopArt,
  type WorkshopModel,
  type WorkshopParameters,
} from '../geometry/workshop.ts'
import { sizes, svg, type Locale, type Paper, type PrintLabel } from './sheets.ts'
import { accent as accentInk, brandMark, calibration, ink, lineStyle, muted as mutedInk, textMm } from '../../apps/editor/assets/brand/print.js'

type PrintRevision = {
  ref: { design_id: string; revision_id: string; source_sha256: string }
  parameters: WorkshopParameters
  appearance_id: string
}
const words = {
  en: {
    lab: 'BUTTERFLY WORKSHOP',
    names: {
      monarch: 'Monarch',
      morpho: 'Blue Morpho',
      swallowtail: 'Swallowtail',
    },
    flatSpan: 'flat wingspan',
    scale: 'Measure this line',
    print: 'Print at 100% / actual size',
    legend: ['Cut', 'Wing fold', 'Tab fold'],
    heading: 'Build your butterfly',
    step: ['Cut out the shape', 'Lift both wings', 'Clip the nose', 'Set each tail tab'],
    cut: [
      'Follow the outside edge and the',
      'two solid slits on each rear tab.',
      'Stop at the dots. Keep the hinge.',
    ],
    fold: ['Print side up, nose away. Keep the', 'center flat. Measure both outer tips.'],
    clip: [
      'Slide one small, blunt paper clip',
      'onto the nose. Stop its back end',
      'at the cross. Keep the clip in place.',
    ],
    tabs: ['Read left and right from behind.', 'Bend each tab from its own wing.'],
    side: ['Left', 'Right'],
    flat: 'flat',
    up: 'up',
    down: 'down',
    launch: 'Launch gently and level in a clear space.',
    compare: 'Try five level glides with flat tabs. Change one tab, then compare five more.',
    materials:
      'Use one sheet of plain copier paper and one small paper clip. Record which ones you use.',
    note: 'Experimental paper glider',
    source: 'Source',
    mm: 'mm',
    sideMark: ['L', 'R'],
  },
  ru: {
    lab: 'МАСТЕРСКАЯ БАБОЧЕК',
    names: {
      monarch: 'Монарх',
      morpho: 'Голубой морфо',
      swallowtail: 'Махаон',
    },
    flatSpan: 'размах развёртки',
    scale: 'Измерь эту линию',
    print: 'Печать в масштабе 100%',
    legend: ['Разрез', 'Сгиб крыла', 'Сгиб закрылка'],
    heading: 'Собери свою бабочку',
    step: ['Вырежи контур', 'Подними крылья', 'Надень скрепку', 'Отогни язычки'],
    cut: [
      'Вырежи бабочку по контуру.',
      'Сделай по два надреза на закрылках.',
      'Остановись у точек. Сохрани сгиб.',
    ],
    fold: ['Рисунком вверх, носом от себя.', 'Измерь высоту краёв над столом.'],
    clip: [
      'Надень на нос небольшую скрепку',
      'с тупым концом. Совмести её задний',
      'край с крестиком. Оставь её на месте.',
    ],
    tabs: ['Смотри на бабочку сзади.', 'Отгибай закрылок от плоскости крыла.'],
    side: ['Левый', 'Правый'],
    flat: 'ровно',
    up: 'вверх',
    down: 'вниз',
    launch: 'Запускай мягко и ровно на свободном месте.',
    compare: 'Сделай пять запусков с плоскими закрылками. Отогни один и сравни ещё пять полётов.',
    materials: 'Возьми лист обычной офисной бумаги и небольшую скрепку. Запиши, какие именно.',
    note: 'Экспериментальный планер',
    source: 'Исходник',
    mm: 'мм',
    sideMark: ['Л', 'П'],
  },
  es: {
    lab: 'TALLER DE MARIPOSAS',
    names: {
      monarch: 'Monarca',
      morpho: 'Morfo azul',
      swallowtail: 'Cola de golondrina',
    },
    flatSpan: 'de envergadura en plano',
    scale: 'Mide esta línea',
    print: 'Imprime al 100 %',
    legend: ['Corte', 'Pliegue del ala', 'Pliegue de la aleta'],
    heading: 'Construye tu mariposa',
    step: ['Recorta la forma', 'Levanta las dos alas', 'Coloca el clip', 'Ajusta las aletas'],
    cut: [
      'Recorta el borde y los dos cortes',
      'cortos de cada aleta de cola.',
      'Para en los puntos. Deja el pliegue.',
    ],
    fold: ['Dibujo arriba, punta lejos de ti.', 'Mide los dos extremos desde la mesa.'],
    clip: [
      'Desliza un clip pequeño por la punta.',
      'Alinea el extremo de atrás con la cruz.',
      'Deja el clip en el mismo sitio.',
    ],
    tabs: ['Mira desde atrás para ver los lados.', 'Dobla cada aleta desde su ala.'],
    side: ['Izquierda', 'Derecha'],
    flat: 'plana',
    up: 'arriba',
    down: 'abajo',
    launch: 'Lanza suave y a nivel en un espacio despejado.',
    compare: 'Haz cinco planeos con las aletas planas. Cambia una aleta y compara otros cinco.',
    materials: 'Usa papel normal de impresora y un clip pequeño. Anota cuáles usaste.',
    note: 'Planeador de papel experimental',
    source: 'Archivo fuente',
    mm: 'mm',
    sideMark: ['I', 'D'],
  },
}
const latin = {
  monarch: 'Danaus plexippus',
  morpho: 'Morpho peleides',
  swallowtail: 'Papilio machaon',
}
const dark = ink,
  muted = mutedInk,
  accent = accentInk,
  paper = '#FFFFFF'
// The W1 geometry module (fingerprinted) fixes shapes; the paper line convention is applied here.
function paperStyle(line: Line): Line {
  if (line.id === 'cut') return { ...line, stroke: lineStyle.cut.stroke, weight: lineStyle.cut.weight }
  if (line.id.startsWith('root-fold-') && !line.id.endsWith('-halo')) return { ...line, ...lineStyle.valley }
  if (line.id.startsWith('tab-hinge-') && !line.id.endsWith('-halo')) return { ...line, ...lineStyle.guide, stroke: ink }
  if (line.id.startsWith('tab-slit-') && !line.id.endsWith('-halo')) return { ...line, stroke: ink, weight: lineStyle.cut.weight }
  return line
}

function oval(x: number, y: number, rx: number, ry: number): Point[] {
  return Array.from({ length: 27 }, (_, i) => {
    const a = (2 * Math.PI * i) / 26
    return [rounded(x + Math.cos(a) * rx), rounded(y + Math.sin(a) * ry)]
  })
}
function measure(n: number, locale: Locale) {
  const value = String(Math.round(n * 10) / 10)
  return locale === 'en' ? value : value.replace('.', ',')
}

export function workshopPreview(
  model: WorkshopModel,
  parameters: WorkshopParameters,
  appearance: string,
): Buffer {
  const art = workshopArt(model, parameters, appearance)
  const margin = 1.75,
    width = parameters.span_mm + margin * 2,
    height = rounded(art.maxY - art.minY + margin * 2)
  return svg({
    width,
    height,
    lines: placeArt(art.lines, width / 2, margin - art.minY),
    labels: [],
  })
}

export function workshopSheet(
  model: WorkshopModel,
  revision: PrintRevision,
  paperSize: Paper,
  locale: Locale,
): Drawing & { locale: Locale } {
  const [width, height] = sizes[paperSize],
    t = words[locale],
    g = model.geometry
  const { parameters: p, appearance_id: appearance, ref } = revision
  const art = workshopArt(model, p, appearance, true)
  const artY = 45 - art.minY
  const lines = placeArt(art.lines, width / 2, artY).map(paperStyle),
    labels: PrintLabel[] = []
  const line = (id: string, points: Point[], stroke = dark, weight = 0.4, dash?: number[]) =>
    lines.push({ id, points, stroke, weight, dash })
  const body = (id: string, points: Point[], fill: string, stroke?: string, weight = 0.28) =>
    lines.push({ id, points, closed: true, fill, stroke, weight })
  const label = (x: number, y: number, text: string, size = 3.1, color = dark, font: PrintLabel['font'] = 'text') =>
    labels.push({ x, y, text, size, color, font })
  const copy = (x: number, y: number, rows: string[], step = 4.9) =>
    rows.forEach((row, i) => label(x, y + i * step, row, 3.05))
  const step = (n: number, x: number, y: number) => {
    body('number-ring-' + n, oval(x + 2.6, y - 1.3, 2.65, 2.65), dark)
    label(x + 1.71, y - 0.23, String(n + 1), 2.9, '#FFFFFF')
    label(x + 7.3, y, t.step[n], textMm.step, dark, 'bold')
  }
  const bright = model.palettes[appearance as keyof typeof model.palettes].sun
  const trimInk = appearance === 'coloring' ? dark : model.palettes.natural.shade

  const mark = brandMark(13, 9)
  lines.push(...mark.lines)
  labels.push(...(mark.labels as PrintLabel[]))
  label(13 + mark.width + 3, 12.6, t.lab, textMm.min, muted)
  label(12.6, 27.1, t.names[model.species], textMm.display, dark, 'display')
  label(13, 35, latin[model.species] + '   ·   ' + p.span_mm + ' ' + t.mm + ' ' + t.flatSpan, textMm.min, muted)
  const rulerX = width - 74
  label(rulerX, 14.3, t.scale + '  ·  50 ' + t.mm, textMm.min, dark, 'bold')
  const cal = calibration(rulerX, 23.5, locale, { note: false })
  lines.push(...cal.lines)
  labels.push(...(cal.labels as PrintLabel[]))
  label(rulerX, 31.1, t.print, textMm.min, muted)
  line(
    'masthead-rule',
    [
      [13, 39.3],
      [width - 13, 39.3],
    ],
    muted,
    0.3,
  )

  // Put L/R directly between the corresponding slit endpoints.
  for (const [index, side] of [-1, 1].entries()) {
    const [x, y] = art.tab.fromHinge(0.5, g.tab_depth_mm * 0.48)
    const px = width / 2 + (side * x * p.span_mm) / 200,
      py = artY + y
    body('tab-badge-' + index, oval(px, py, 1.9, 1.9), paper)
    label(px - 0.92, py + 0.95, t.sideMark[index], 2.65)
  }
  const legendY = 150
  const cols = [13, 77, width - 72],
    keys: (number[] | undefined)[] = [undefined, lineStyle.valley.dash, lineStyle.guide.dash]
  cols.forEach((x, i) => {
    line(
      'legend-' + i,
      [
        [x, legendY - 1],
        [x + 9.5, legendY - 1],
      ],
      dark,
      0.55,
      keys[i],
    )
    label(x + 12, legendY, t.legend[i], 3.15)
  })
  line(
    'instruction-rule',
    [
      [13, 154.8],
      [width - 13, 154.8],
    ],
    muted,
    0.35,
  )
  label(13, 163.3, t.heading, textMm.title, dark, 'display')
  const right = width / 2 + 3
  step(0, 13, 172.4)
  copy(13, 179, t.cut)
  // Enlarged rear tab detail: the solid slit ends meet the dotted hinge.
  line(
    'diagram-tab-trailing',
    [
      [16, 196.2],
      [46, 196.2],
    ],
    dark,
    0.42,
  )
  line(
    'diagram-tab-slit-one',
    [
      [21, 196.2],
      [21, 192.2],
    ],
    dark,
    0.52,
  )
  line(
    'diagram-tab-slit-two',
    [
      [39.5, 196.2],
      [39.5, 192.2],
    ],
    dark,
    0.52,
  )
  line(
    'diagram-tab-fold',
    [
      [21, 192.2],
      [39.5, 192.2],
    ],
    accent,
    0.48,
    [0.55, 0.85],
  )
  for (const [index, x] of [21, 39.5].entries())
    body('diagram-slit-stop-' + index, oval(x, 192.2, 0.84, 0.84), paper, dark, 0.4)

  step(1, right, 172.4)
  const theta = (g.target_dihedral_deg * Math.PI) / 180
  const mx = right + 27,
    baseY = 183.5,
    arm = 17,
    rise = arm * Math.tan(theta)
  line(
    'front-view-datum',
    [
      [mx - 3.2 - arm, baseY],
      [mx + 3.2 + arm, baseY],
    ],
    muted,
    0.25,
    [1, 1],
  )
  line(
    'front-view-fold',
    [
      [mx - 3.2 - arm, baseY - rise],
      [mx - 3.2, baseY],
      [mx + 3.2, baseY],
      [mx + 3.2 + arm, baseY - rise],
    ],
    trimInk,
    0.9,
  )
  line(
    'front-view-rise',
    [
      [mx + 5.2 + arm, baseY - rise],
      [mx + 5.2 + arm, baseY],
    ],
    dark,
    0.32,
  )
  line(
    'front-view-rise-left',
    [
      [mx - 5.2 - arm, baseY - rise],
      [mx - 5.2 - arm, baseY],
    ],
    dark,
    0.32,
  )
  for (const [index, x] of [mx - 3.2 - arm, mx + 3.2 + arm].entries())
    body('diagram-outer-tip-' + index, oval(x, baseY - rise, 0.75, 0.75), paper, dark, 0.35)
  label(mx + 8 + arm, baseY - 1.2, g.target_dihedral_deg + '°', 3.3)
  label(
    mx + 8 + arm,
    baseY + 3.9,
    '≈ ' + Math.round(wingtipHeight(model, p.span_mm)) + ' ' + t.mm,
    3.1,
    accent,
  )
  copy(right, 189.8, t.fold)

  line(
    'row-rule',
    [
      [13, 199],
      [width - 13, 199],
    ],
    muted,
    0.27,
  )
  step(3, right, 208)
  for (const [i, angle] of [p.left_trim_deg, p.right_trim_deg].entries()) {
    const x = right + i * 42,
      y = 220,
      arm = 20,
      rad = (angle * Math.PI) / 180
    const tip: Point = [x + 3 + arm * Math.cos(rad), y - arm * Math.sin(rad)]
    line(
      'gauge-neutral-' + i,
      [
        [x, y],
        [x + 26, y],
      ],
      muted,
      0.31,
      [1.3, 1.0],
    )
    line('gauge-tab-' + i, [[x + 3, y], tip], trimInk, 0.55)
    body('gauge-hinge-' + i, oval(x + 3, y, 0.75, 0.75), dark)
    label(x, 215, t.side[i] + '  ' + (angle > 0 ? '+' : '') + angle + '°', 3.05)
    const amount = Math.abs(tabHeight(model, p.span_mm, angle))
    const offset =
      angle === 0 ? t.flat : measure(amount, locale) + ' ' + t.mm + ' ' + (angle > 0 ? t.up : t.down)
    label(x, 226, offset, 2.95, accent)
  }
  copy(right, 232, t.tabs)
  step(2, 13, 208)
  copy(13, 215, t.clip)
  // A top view of the flat nose shows which end of the paper clip reaches the mark.
  const nx = 24,
    ny = 228.2
  line(
    'nose-schematic',
    [
      [nx - 3.5, ny + 10],
      [nx - 3.5, ny],
      [nx + 3.5, ny],
      [nx + 3.5, ny + 10],
    ],
    muted,
    0.34,
  )
  line(
    'nose-target',
    [
      [nx - 5.1, ny + 7],
      [nx + 5.1, ny + 7],
    ],
    accent,
    0.4,
    [1.1, 0.8],
  )
  line(
    'nose-cross',
    [
      [nx, ny + 5.7],
      [nx, ny + 8.3],
    ],
    accent,
    0.38,
  )
  line(
    'clip-illustration',
    [
      [nx + 1.5, ny + 2],
      [nx + 1.5, ny - 1.1],
      [nx + 0.9, ny - 2.1],
      [nx - 1.05, ny - 2.1],
      [nx - 1.9, ny - 1.1],
      [nx - 1.9, ny + 5.8],
      [nx - 1.3, ny + 7],
      [nx + 1.4, ny + 7],
      [nx + 2.1, ny + 5.8],
      [nx + 2.1, ny + 0.9],
    ],
    trimInk,
    0.48,
  )
  body('clip-color-key', oval(nx + 8, ny + 6.8, 0.8, 0.8), bright, dark, 0.22)
  label(nx + 10, ny + 7.8, g.clip_rear_from_nose_mm + ' ' + t.mm, 2.95)

  line(
    'test-rule',
    [
      [13, 242],
      [width - 13, 242],
    ],
    muted,
    0.35,
  )
  label(13, 247.5, t.launch, 3.1)
  label(13, 252, t.compare, 3.1)
  label(13, 256.5, t.materials, 2.85, muted)
  const url = '/v1/designs/' + ref.design_id + '/revisions/' + ref.revision_id
  label(13, height - 17.7, t.source + '  ' + url, 2.6, muted)
  label(13, height - 12.8, 'SHA-256  ' + ref.source_sha256, 2.55, muted)
  label(13, height - 7.8, t.note + '   /   CERN-OHL-W-2.0   /   CC BY-SA 4.0', 2.55, muted)
  return { width, height, lines, labels, locale }
}
