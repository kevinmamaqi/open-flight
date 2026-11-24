import { planeCredits, creditText } from './credits.js?v=788c398039bb'

export const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )
const n = (x) => (Math.abs(x) < 0.0005 ? '0' : Number(x.toFixed(3)).toString())
const xy = (points) => points.map((p) => p.map(n).join(',')).join(' ')
const poly = (points, fill, stroke = 'none', sw = 0) => ({
  type: 'polygon',
  points,
  fill,
  stroke,
  sw,
})
const line = (points, stroke, sw = 0.4, dash) => ({
  type: 'polyline',
  points,
  fill: 'none',
  stroke,
  sw,
  dash,
})
const label = (pos, value, size = 3, color = '#253b44', anchor = 'start') => ({
  type: 'text',
  pos,
  value,
  size,
  color,
  anchor,
})
const dot = (pos, radius, fill, stroke = 'none', sw = 0) => ({
  type: 'circle',
  pos,
  radius,
  fill,
  stroke,
  sw,
})
export function svgParts(parts) {
  return parts
    .map((e) => {
      if (e.type === 'text')
        return (
          (e.url ? '<a href="' + esc(e.url) + '">' : '') +
          '<text x="' +
          n(e.pos[0]) +
          '" y="' +
          n(e.pos[1]) +
          '" font-size="' +
          e.size +
          '" font-family="DejaVu Sans,Arial,sans-serif" fill="' +
          e.color +
          '" text-anchor="' +
          e.anchor +
          '">' +
          esc(e.value) +
          '</text>' +
          (e.url ? '</a>' : '')
        )
      const style =
        'fill="' +
        e.fill +
        '" stroke="' +
        e.stroke +
        '" stroke-width="' +
        n(e.sw) +
        '" stroke-linejoin="round" stroke-linecap="round"'
      if (e.type === 'circle')
        return (
          '<circle cx="' + n(e.pos[0]) + '" cy="' + n(e.pos[1]) + '" r="' + n(e.radius) + '" ' + style + '/>'
        )
      return (
        '<' +
        e.type +
        ' points="' +
        xy(e.points) +
        '" ' +
        style +
        (e.dash ? ' stroke-dasharray="' + e.dash.join(' ') + '"' : '') +
        '/>'
      )
    })
    .join('')
}

function cropX(points, bound, sign) {
  const result = []
  if (!points.length) return result
  for (let i = 0; i < points.length; i++) {
    const a = points[i],
      b = points[(i + 1) % points.length]
    const d = (a[0] - bound) * sign,
      e = (b[0] - bound) * sign
    if (d >= -1e-7) result.push(a)
    if (d * e < -1e-7) result.push([bound, a[1] + ((b[1] - a[1]) * d) / (d - e)])
  }
  return result
}
// Clip convex livery patches against the real wing perimeter before projecting into the plate.
function cropConvex(subject, shape) {
  let points = subject
  const signed = shape.reduce((sum, a, i) => {
    const b = shape[(i + 1) % shape.length]
    return sum + a[0] * b[1] - b[0] * a[1]
  }, 0)
  if (Math.abs(signed) < 1e-5) return []
  const dir = Math.sign(signed)
  for (let i = 0; i < shape.length && points.length; i++) {
    const a = shape[i],
      b = shape[(i + 1) % shape.length]
    const side = (p) => dir * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]))
    const inside = []
    for (let j = 0; j < points.length; j++) {
      const p = points[j],
        q = points[(j + 1) % points.length],
        dp = side(p),
        dq = side(q)
      if (dp >= -1e-7) inside.push(p)
      if (dp * dq < -1e-7)
        inside.push([p[0] + ((q[0] - p[0]) * dp) / (dp - dq), p[1] + ((q[1] - p[1]) * dp) / (dp - dq)])
    }
    points = inside
  }
  return points
}
export function stripes(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions
  const [a, b, c] = plan.colors
  const shapes = []
  const ribbon = (t, depth, slope, color, reach = 0.39) => {
    const x = w * reach
    shapes.push(
      poly(
        [
          [0, h * t],
          [x, h * t + slope],
          [x, h * t + slope + depth],
          [0, h * t + depth],
        ],
        color,
      ),
    )
  }
  if (plan.motif === 'steps') {
    ribbon(0.43, 16, 62, a)
    ribbon(0.51, 5, 62, c)
    ribbon(0.75, 22, 34, b)
    ribbon(0.85, 4, 34, a)
  } else if (plan.motif === 'rays') {
    ribbon(0.48, 20, 42, a)
    ribbon(0.59, 6, 36, b)
    ribbon(0.68, 13, 24, a)
    ribbon(0.78, 6, 15, c)
  } else if (plan.motif === 'chevrons') {
    ribbon(0.56, 21, 38, a, 0.43)
    ribbon(0.7, 13, -31, b, 0.43)
    ribbon(0.84, 17, -33, a, 0.43)
    ribbon(0.93, 4, -33, c, 0.43)
  } else {
    ribbon(0.47, 6, 51, b)
    ribbon(0.6, 18, 43, a)
    ribbon(0.77, 7, 21, a)
    ribbon(0.812, 7, 21, c)
    ribbon(0.876, 4, 18, a)
    ribbon(0.906, 4, 18, c)
  }
  const reflect = (p) => [w - p[0], p[1]]
  return [...shapes, ...shapes.map((s) => ({ ...s, points: s.points.map(reflect) }))]
}
function creaseDash(kind) {
  return kind === 'mountain' ? [3.4, 1, 0.7, 1] : [2.3, 1.4]
}
export function sheetScene(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions,
    ru = plan.locale === 'ru'
  const parts = [...stripes(plan)]
  const ink = '#233e46'
  const credit = creditText(plan.locale)
  for (const crease of plan.creases) parts.push(line(crease.line, ink, 0.32, creaseDash(crease.kind)))
  // Place at most two small numbered targets per action, on different slopes when possible.
  const taken = []
  for (const s of plan.steps) {
    const list = plan.creases
      .filter((c) => c.step === s.index)
      .sort((a, b) => {
        const length = ({ line: [p, q] }) => Math.hypot(p[0] - q[0], p[1] - q[1])
        return length(b) - length(a)
      })
    const directions = new Set()
    for (const {
      line: [p, q],
    } of list) {
      if (directions.size === 2) break
      const angle = Math.round((Math.atan2(q[1] - p[1], q[0] - p[0]) * 18) / Math.PI)
      const key = (angle + 36) % 18
      if (directions.has(key)) continue
      for (const f of [0.35, 0.53, 0.67, 0.22, 0.8]) {
        const at = [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f]
        if (
          at[0] < 5 ||
          at[0] > w - 5 ||
          at[1] < 5 ||
          at[1] > h - 21 ||
          taken.some((a) => Math.hypot(a[0] - at[0], a[1] - at[1]) < 8)
        )
          continue
        taken.push(at)
        directions.add(key)
        parts.push(
          dot(at, 2.5, '#ffffff', ink, 0.35),
          label([at[0], at[1] + 1], String(s.index + 1), 2.8, ink, 'middle'),
        )
        break
      }
    }
  }
  const scaleX = w - 36,
    scaleY = h - 10
  parts.push(
    poly(
      [
        [13, h - 23],
        [w / 2 - 31, h - 23],
        [w / 2 - 31, h - 5],
        [13, h - 5],
      ],
      '#ffffff',
    ),
    label([14, h - 19.4], plan.name, 3.2),
    label([14, h - 16], credit.creator, 2.3),
    {
      ...label([14, h - 12.8], credit.geometry, 2.3),
      url: planeCredits.geometry.url,
    },
    {
      ...label([14, h - 9.6], credit.artwork, 2.3),
      url: planeCredits.artwork.url,
    },
    { ...label([14, h - 6.5], credit.credits, 2.15), url: planeCredits.url },
    poly(
      [
        [scaleX - 3, h - 19],
        [w - 7, h - 19],
        [w - 7, h - 5],
        [scaleX - 3, h - 5],
      ],
      '#ffffff',
    ),
    label([scaleX + 10, scaleY - 3], ru ? '20 мм' : '20 mm', 2.8, ink, 'middle'),
    line(
      [
        [scaleX, scaleY],
        [scaleX + 20, scaleY],
      ],
      ink,
      0.5,
    ),
    line(
      [
        [scaleX, scaleY - 1.5],
        [scaleX, scaleY + 1.5],
      ],
      ink,
      0.5,
    ),
    line(
      [
        [scaleX + 20, scaleY - 1.5],
        [scaleX + 20, scaleY + 1.5],
      ],
      ink,
      0.5,
    ),
  )
  return parts
}
export function planeSvg(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions
  const credit = creditText(plan.locale)
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    w +
    'mm" height="' +
    h +
    'mm" viewBox="0 0 ' +
    w +
    ' ' +
    h +
    '" role="img" xml:lang="' +
    plan.locale +
    '"><title>' +
    esc(plan.name) +
    '</title><desc>' +
    esc(
      {
        en: 'Printed face. Print at actual size. Every marked line is a fold.',
        ru: 'Лицевая сторона. Печатайте в масштабе 100%. Все линии предназначены для сгибания.',
        es: 'Cara impresa. Imprime a tamaño real. Cada línea marcada indica un doblez.',
      }[plan.locale],
    ) +
    ' ' +
    esc([credit.creator, credit.geometry, credit.artwork, credit.credits].join('. ')) +
    '</desc>' +
    '<metadata>' +
    esc(
      JSON.stringify({
        creator: planeCredits.creator,
        originalGeometry: planeCredits.geometry,
        originalArtworkAndLessons: planeCredits.artwork,
        credits: planeCredits.url,
        model: plan.model_id,
        revision: plan.revision,
      }),
    ) +
    '</metadata>' +
    svgParts(sheetScene(plan)) +
    '</svg>'
  )
}

export function specimenScene(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions,
    c = w / 2,
    k = plan.keel_mm,
    tip = plan.winglet_mm
  const outline = plan.stockOutline,
    parts = [],
    decals = stripes(plan)
  function project([x, y]) {
    const sign = Math.sign(x - c),
      spread = Math.abs(x - c)
    const root = Math.max(0, spread - k),
      flat = Math.min(root, c - k - tip)
    const z = spread < k ? spread - k : flat * 0.14 + root - flat
    return [0.86 * sign * flat - 0.9 * y, 0.5 * sign * flat + 0.3 * y - 0.94 * z]
  }
  const boundaries = [0, tip, c - k, c, c + k, w - tip, w]
  const bases = ['#d3cbb7', '#f5eccc', '#b0a78c', '#afa889', '#fff8dd', '#ede1bd']
  const outlineInk = '#3d4b49'
  for (let i = 0; i < boundaries.length - 1; i++) {
    if (boundaries[i + 1] - boundaries[i] < 0.1) continue
    const region = cropX(cropX(outline, boundaries[i], 1), boundaries[i + 1], -1)
    if (region.length < 3) continue
    const mapped = region.map(project)
    parts.push(poly(mapped, bases[i], outlineInk, 0.9))
    for (const panel of plan.stockPanels) {
      const piece = cropConvex(panel.polygon, region)
      if (piece.length < 3) continue
      parts.push(
        poly(
          piece.map(project),
          panel.face === 'front'
            ? bases[i]
            : ['#c6ccba', '#e3e6d6', '#a3a694', '#afb19e', '#f1efde', '#d6d8c3'][i],
          '#797e68',
          0.5,
        ),
      )
      if (panel.face !== 'front') continue
      const a = panel.sourcePolygon[0],
        b = panel.sourcePolygon[1]
      const p = panel.polygon[0],
        q = panel.polygon[1]
      const dx = b[0] - a[0],
        dy = b[1] - a[1],
        den = dx * dx + dy * dy
      if (den < 1e-8) continue
      // An even number of paper flips exposes the print face. Its in-plane map is a rotation.
      const cos = ((q[0] - p[0]) * dx + (q[1] - p[1]) * dy) / den
      const sin = ((q[1] - p[1]) * dx - (q[0] - p[0]) * dy) / den
      const place = ([x, y]) => [
        p[0] + cos * (x - a[0]) - sin * (y - a[1]),
        p[1] + sin * (x - a[0]) + cos * (y - a[1]),
      ]
      for (const decal of decals) {
        const patch = cropConvex(decal.points.map(place), piece)
        if (patch.length >= 3) parts.push(poly(patch.map(project), decal.fill))
      }
    }
    parts.push(line([...mapped, mapped[0]], outlineInk, 0.6))
  }
  const all = parts.flatMap((e) => e.points)
  const xs = all.map((p) => p[0]),
    ys = all.map((p) => p[1])
  const minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys)
  const scale = Math.min(366 / (maxX - minX), 167 / (maxY - minY))
  const offset = [210 - ((minX + maxX) * scale) / 2, 110 - ((minY + maxY) * scale) / 2]
  return parts.map((s) => ({
    ...s,
    sw: s.sw * scale,
    points: s.points.map((p) => [p[0] * scale + offset[0], p[1] * scale + offset[1]]),
  }))
}
export function planeSpecimen(plan) {
  const parts = specimenScene(plan)
  const shadow = parts
    .filter((p) => p.type === 'polygon' && p.stroke !== 'none')
    .map((p) => ({ ...p, fill: '#263e46', stroke: 'none' }))
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 222" role="img" aria-label="' +
    esc(plan.name) +
    '"><title>' +
    esc(plan.name) +
    '</title><g opacity=".11" transform="translate(4 14)">' +
    svgParts(shadow) +
    '</g>' +
    svgParts(parts) +
    '</svg>'
  )
}
