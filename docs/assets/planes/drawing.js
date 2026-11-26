import { planeCredits, creditText, creditLinks } from './credits.js?v=48cc97ad30d5'
import { backFaceWords, backKind, printSafeMm } from '../print-faces.js?v=48cc97ad30d5'
import { keelAt } from './geometry.js?v=48cc97ad30d5'
import { atLeastText, calibration, calibrationShort, ink as paperInk, lineStyle, muted as paperMuted, textMm } from '../brand/print.js?v=48cc97ad30d5'

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
const label = (pos, value, size = 3, color = paperInk, anchor = 'start', font = 'text') => ({
  type: 'text',
  pos,
  value,
  size,
  color,
  anchor,
  font,
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
          atLeastText(e.size) +
          (e.font === 'display'
            ? '" font-family="Alegreya,Georgia,serif" font-weight="700'
            : '" font-family="Open Flight Text,Andika,sans-serif' + (e.font === 'bold' ? '" font-weight="700' : '')) +
          '" fill="' +
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
  } else if (plan.motif === 'darts') {
    ribbon(0.3, 18, 70, a, 0.5)
    ribbon(0.42, 6, 70, c, 0.5)
    ribbon(0.6, 20, 50, b, 0.5)
    ribbon(0.73, 6, 50, a, 0.5)
    ribbon(0.86, 10, 30, c, 0.5)
  } else if (plan.motif === 'bars') {
    ribbon(0.66, 10, 0, a, 0.5)
    ribbon(0.715, 4, 0, c, 0.5)
    ribbon(0.79, 15, 12, b, 0.5)
    ribbon(0.9, 6, 12, a, 0.5)
  } else if (plan.motif === 'crescent') {
    ribbon(0.52, 12, 44, a)
    ribbon(0.6, 5, 34, c)
    ribbon(0.72, 14, 20, b)
    ribbon(0.85, 5, 9, a)
  } else if (plan.motif === 'crown') {
    ribbon(0.55, 14, -30, a, 0.45)
    ribbon(0.63, 5, -30, c, 0.45)
    ribbon(0.76, 16, -12, b, 0.45)
    ribbon(0.88, 5, -6, a, 0.45)
  } else {
    ribbon(0.47, 6, 51, b)
    ribbon(0.6, 18, 43, a)
    ribbon(0.77, 7, 21, a)
    ribbon(0.812, 7, 21, c)
    ribbon(0.876, 4, 18, a)
    ribbon(0.906, 4, 18, c)
  }
  if (plan.livery === 'airshow') {
    // Coloured landmarks on the outer wing survive the folds on both faces.
    const tile = (points,fill) => shapes.push(poly(points.map(([x,y])=>[x*w,y*h]),fill))
    if (plan.motif === 'steps') {
      for (let row=0;row<2;row++) for(let i=0;i<4-row;i++) {
        const x=.035+i*.031, y=.64+row*.026+x*.35
        tile([[x,y],[x+.021,y+.006],[x+.021,y+.017],[x,y+.011]],b)
      }
    } else if (plan.motif === 'rays') {
      for (const y of [.55,.67,.79]) tile([[.025,y],[.13,y+.018],[.18,y+.054],[.11,y+.037]],c)
    } else if (plan.motif === 'chevrons') {
      for (const x of [.03,.11,.19]) tile([[x,.64],[x+.04,.58],[x+.013,.65],[x+.05,.68]],b)
    } else if (plan.motif === 'darts') {
      for (const y of [.5,.66,.8]) tile([[.3,y],[.44,y+.03],[.44,y+.045],[.3,y+.015]],c)
    } else if (plan.motif === 'bars') {
      for (const x of [.05,.16,.27,.38]) tile([[x,.84],[x+.06,.84],[x+.06,.87],[x,.87]],c)
    } else if (plan.motif === 'crescent') {
      for (const y of [.66,.79]) tile([[.06,y],[.2,y+.03],[.24,y+.05],[.1,y+.03]],c)
    } else if (plan.motif === 'crown') {
      for (const x of [.08,.18,.28]) tile([[x,.7],[x+.035,.66],[x+.07,.7],[x+.035,.73]],c)
    } else {
      for (const y of [.55,.72]) for (const dy of [0,.025])
        tile([[.018,y+dy],[.18,y+dy+.045],[.23,y+dy+.062],[.018,y+dy+.014]],c)
    }
  }
  const reflect = (p) => [w - p[0], p[1]]
  return [...shapes, ...shapes.map((s) => ({ ...s, points: s.points.map(reflect) }))]
}
function creaseDash(kind) {
  return kind === 'mountain' ? lineStyle.mountain.dash : lineStyle.valley.dash
}
export { printSafeMm }
const guideInk = paperInk

// Liang–Barsky clip of one segment to a rectangle. Returns null when nothing is inside.
function clipSegment([p, q], x0, y0, x1, y1) {
  let t0 = 0,
    t1 = 1
  const dx = q[0] - p[0],
    dy = q[1] - p[1]
  for (const [d, room] of [
    [-dx, p[0] - x0],
    [dx, x1 - p[0]],
    [-dy, p[1] - y0],
    [dy, y1 - p[1]],
  ]) {
    if (Math.abs(d) < 1e-9) {
      if (room < 0) return null
      continue
    }
    const r = room / d
    if (d < 0) {
      if (r > t1) return null
      if (r > t0) t0 = r
    } else {
      if (r < t0) return null
      if (r < t1) t1 = r
    }
  }
  if (t1 - t0 < 1e-6) return null
  return [
    [p[0] + t0 * dx, p[1] + t0 * dy],
    [p[0] + t1 * dx, p[1] + t1 * dy],
  ]
}

// Corner brackets sit inside the printable area, with a short arrow toward each real corner.
function cornerMarks(w, h, m = printSafeMm) {
  const parts = []
  for (const [x, dx] of [[0, 1], [w, -1]]) {
    for (const [y, dy] of [[0, 1], [h, -1]]) {
      const at = (a, b) => [x + dx * a, y + dy * b]
      parts.push(
        line([at(m + 9, m), at(m, m), at(m, m + 9)], guideInk, 0.9),
        line([at(m + 5.5, m + 5.5), at(m + 1.6, m + 1.6)], guideInk, 0.35),
        line([at(m + 1.6, m + 3.6), at(m + 1.6, m + 1.6), at(m + 3.6, m + 1.6)], guideInk, 0.35),
      )
    }
  }
  return parts
}

// Where a fold line reaches the paper edge, a small triangle on the safe line points at that spot.
function edgeMarker(point, w, h, m) {
  const near = (v, limit) => v <= m + 1e-6 || v >= limit - m - 1e-6
  if (near(point[0], w) && near(point[1], h)) return null
  // Keep a marker close to a corner inside the printable strip.
  const keep = (v, limit) => Math.min(limit - m - 1.1, Math.max(m + 1.1, v))
  const x = near(point[1], h) ? keep(point[0], w) : point[0],
    y = near(point[0], w) ? keep(point[1], h) : point[1]
  let tip, base
  if (y <= m) (tip = [x, m - 0.2]), (base = [[x - 1.1, m + 1.7], [x + 1.1, m + 1.7]])
  else if (y >= h - m) (tip = [x, h - m + 0.2]), (base = [[x - 1.1, h - m - 1.7], [x + 1.1, h - m - 1.7]])
  else if (x <= m) (tip = [m - 0.2, y]), (base = [[m + 1.7, y - 1.1], [m + 1.7, y + 1.1]])
  else if (x >= w - m) (tip = [w - m + 0.2, y]), (base = [[w - m - 1.7, y - 1.1], [w - m - 1.7, y + 1.1]])
  else return null
  return poly([tip, ...base], guideInk)
}

const creaseKey = (kind, back) => (back ? backKind(kind) : kind)
// Fold lines for one face. The back face mirrors left and right (long-edge duplex) and swaps
// mountain and valley, because a fold seen from the other side turns the other way.
function creaseScene(plan, back) {
  const { width_mm: w, height_mm: h } = plan.dimensions,
    m = plan.trim_mm ? 0 : printSafeMm
  const flip = (p) => (back ? [w - p[0], p[1]] : p)
  const parts = [],
    markers = new Map()
  for (const crease of plan.creases) {
    if (crease.print === false) continue
    const [p, q] = crease.line.map(flip)
    const kind = creaseKey(crease.kind, back)
    const dash = creaseDash(kind)
    const ink = kind === 'mountain' ? lineStyle.mountain.stroke : lineStyle.valley.stroke
    const inside = clipSegment([p, q], m, m, w - m, h - m)
    if (inside) {
      parts.push(line(inside, ink, lineStyle.valley.weight, dash))
      if (plan.trim_mm) continue
      for (const end of [p, q]) {
        const key = end.map((v) => v.toFixed(1)).join(',')
        if (!markers.has(key)) markers.set(key, edgeMarker(end, w, h, m))
      }
      continue
    }
    // A fold parallel to a long edge inside the blank strip (a narrow winglet): print the line
    // where the printer allows it and label its distance from the edge inside the safe area.
    if (Math.abs(p[0] - q[0]) < 1e-6) {
      const x = p[0],
        fromEdge = Math.min(x, w - x),
        side = x < w / 2 ? 1 : -1
      parts.push(line([[x, m], [x, h - m]], ink, lineStyle.valley.weight, dash))
      for (const y of [h * 0.3]) {
        const edge = side > 0 ? m : w - m
        parts.push(
          line([[edge + side * 7, y], [edge + side * 0.4, y]], guideInk, 0.3),
          line([[edge + side * 1.8, y - 1], [edge + side * 0.4, y], [edge + side * 1.8, y + 1]], guideInk, 0.3),
          label([edge + side * 8, y + 1], Number(fromEdge.toFixed(1)) + ' mm', 2.3, guideInk, side > 0 ? 'start' : 'end'),
        )
      }
    }
  }
  for (const marker of markers.values()) if (marker) parts.push(marker)
  return parts
}

// Two crosses at the same physical spots on both faces. Hold the printed sheet to a window:
// when the printer registered both sides, each pair overlaps.
function registrationMarks(plan, back) {
  const { width_mm: w, height_mm: h } = plan.dimensions
  // Choose a height near the top where neither cross touches a fold line.
  const clear = ([x, y]) =>
    plan.creases.every(({ line: [p, q] }) => {
      const dx = q[0] - p[0],
        dy = q[1] - p[1],
        t = Math.max(0, Math.min(1, ((x - p[0]) * dx + (y - p[1]) * dy) / (dx * dx + dy * dy)))
      return Math.hypot(x - p[0] - t * dx, y - p[1] - t * dy) > 4.5
    })
  let y = printSafeMm + 13
  for (let candidate = printSafeMm + 9; candidate < h * 0.3; candidate += 1) {
    if ([0.27, 0.73].every((f) => clear([w * f, candidate]))) {
      y = candidate
      break
    }
  }
  const spots = [[w * 0.27, y], [w * 0.73, y]]
  return spots.flatMap(([x0, y]) => {
    const x = back ? w - x0 : x0
    return [
      dot([x, y], 2.1, '#ffffff', guideInk, 0.3),
      line([[x - 3, y], [x + 3, y]], guideInk, 0.3),
      line([[x, y - 3], [x, y + 3]], guideInk, 0.3),
    ]
  })
}

// Place at most two small numbered targets per action, on different slopes when possible.
function stepTargets(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions,
    keep = printSafeMm + 4
  const taken = [],
    targets = []
  for (const s of plan.steps) {
    const list = plan.creases
      .filter((c) => c.step === s.index && c.print !== false)
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
          at[0] < keep ||
          at[0] > w - keep ||
          at[1] < keep ||
          at[1] > h - 21 ||
          taken.some((a) => Math.hypot(a[0] - at[0], a[1] - at[1]) < 8)
        )
          continue
        taken.push(at)
        directions.add(key)
        targets.push({ at, index: s.index })
        break
      }
    }
    // A fold close to the edge (a narrow winglet) gets its number just inside the safe area.
    if (!directions.size && list.length) {
      const [p, q] = list[0].line
      for (const f of [0.35, 0.53, 0.67, 0.22]) {
        const raw = [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f]
        const at = [Math.min(w - keep, Math.max(keep, raw[0])), Math.min(h - 21, Math.max(keep, raw[1]))]
        if (taken.some((a) => Math.hypot(a[0] - at[0], a[1] - at[1]) < 8)) continue
        taken.push(at)
        targets.push({ at, index: s.index })
        break
      }
    }
  }
  return targets
}
function targetParts(targets, flip = (p) => p) {
  return targets.flatMap(({ at, index }) => {
    const p = flip(at)
    return [dot(p, 2.5, '#ffffff', guideInk, 0.35), label([p[0], p[1] + 1], String(index + 1), 2.8, guideInk, 'middle')]
  })
}

// Shift sheet coordinates onto the printed page. Revision 2 sits trim_mm inside the paper.
function onPage(plan, parts) {
  const d = plan.trim_mm ?? 0
  const [dx, dy] = plan.offset_mm ?? [d, d]
  if (!dx && !dy) return parts
  const move = ([x, y]) => [x + dx, y + dy]
  return parts.map((e) => ({
    ...e,
    ...(e.points ? { points: e.points.map(move) } : {}),
    ...(e.pos ? { pos: move(e.pos) } : {}),
  }))
}
// The thick cut border is the edge of the sheet the builder folds. Fold lines meet it exactly.
function cutBorder(w, h) {
  return [line([[0, 0], [w, 0], [w, h], [0, h], [0, 0]], guideInk, 0.9)]
}
const cutWords = {
  en: 'Cut along the thick border first.',
  ru: 'Сначала вырежьте лист по толстой рамке.',
  es: 'Primero recorta por el borde grueso.',
}
export function pageSize(plan) {
  const page = plan.page ?? plan.dimensions
  return [page.width_mm, page.height_mm]
}
function clipArtwork(parts, w, h) {
  // Artwork stops at the cut border so nothing is printed outside the sheet being cut out.
  const box = [[0, 0], [w, 0], [w, h], [0, h]]
  return parts
    .map((e) => (e.type === 'polygon' ? { ...e, points: cropConvex(e.points, box) } : e))
    .filter((e) => e.type !== 'polygon' || e.points.length >= 3)
}

export function sheetScene(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions,
    ru = plan.locale === 'ru'
  const trimmed = !!plan.trim_mm
  const parts = [
    ...(trimmed ? clipArtwork(stripes(plan), w, h) : stripes(plan)),
    ...(trimmed ? cutBorder(w, h) : cornerMarks(w, h)),
    ...creaseScene(plan, false),
    ...registrationMarks(plan, false),
    ...targetParts(stepTargets(plan)),
  ]
  const ink = guideInk
  const credit = creditText(plan.locale, plan)
  // Bottom band: the model's credits on the left, the 50 mm calibration line on the right.
  const scaleX = w - 82,
    scaleY = h - 21
  const cal = calibration(scaleX, scaleY, plan.locale, { note: false })
  parts.push(
    poly(
      [
        [21, h - 38.5],
        [w - 86, h - 38.5],
        [w - 86, h - 15.7],
        [21, h - 15.7],
      ],
      '#ffffff',
    ),
    ...(trimmed
      ? [
          poly([[21, h - 43.5], [w - 86, h - 43.5], [w - 86, h - 38.5], [21, h - 38.5]], '#ffffff'),
          label([22, h - 39.8], cutWords[plan.locale] ?? cutWords.en, textMm.min, paperInk, 'start', 'bold'),
        ]
      : []),
    label([22, h - 34.5], plan.name, textMm.body, paperInk, 'start', 'display'),
    label([22, h - 30.4], credit.creator, textMm.min, paperMuted),
    {
      ...label([22, h - 26.3], credit.geometry, textMm.min, paperMuted),
      url: creditLinks(plan).geometry,
    },
    {
      ...label([22, h - 22.2], credit.artwork, textMm.min, paperMuted),
      url: planeCredits.artwork.url,
    },
    { ...label([22, h - 18.1], credit.credits, textMm.min, paperMuted), url: planeCredits.url },
    poly(
      [[scaleX - 2, h - 33], [w - 16, h - 33], [w - 16, h - 15.7], [scaleX - 2, h - 15.7]],
      '#ffffff',
    ),
    label([scaleX, h - 28.5], calibrationShort(plan.locale), textMm.min, paperInk),
    ...cal.lines.map((l) => line(l.points, l.stroke, l.weight)),
    ...cal.labels.map((l) => label([l.x, l.y], l.text, l.size, l.color, 'start', l.font)),
  )
  return onPage(plan, parts)
}
// The back face for double-sided printing: the same folds seen from behind, no artwork.
export function backScene(plan) {
  const { width_mm: w, height_mm: h } = plan.dimensions
  const words = backFaceWords(plan.locale)
  const flip = (p) => [w - p[0], p[1]]
  const parts = [
    ...(plan.trim_mm ? cutBorder(w, h) : cornerMarks(w, h)),
    ...creaseScene(plan, true),
    ...registrationMarks(plan, true),
    ...targetParts(stepTargets(plan), flip),
    poly([[21, h - 35.5], [w - 21, h - 35.5], [w - 21, h - 15.7], [21, h - 15.7]], '#ffffff'),
    label([22, h - 31], plan.name + '  ·  ' + words.title, textMm.body, paperInk, 'start', 'display'),
  ]
  words.lines.forEach((text, i) => parts.push(label([22, h - 26.6 + i * 4.1], text, textMm.min)))
  return onPage(plan, parts)
}
export function planeBackSvg(plan) {
  const [w, h] = pageSize(plan)
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + 'mm" height="' + h + 'mm" viewBox="0 0 ' + w + ' ' + h +
    '" overflow="hidden" role="img" xml:lang="' + plan.locale + '"><title>' + esc(plan.name) + '</title>' +
    svgParts(backScene(plan)) + '</svg>'
  )
}
export function planeSvg(plan) {
  const [w, h] = pageSize(plan)
  const credit = creditText(plan.locale, plan)
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    w +
    'mm" height="' +
    h +
    'mm" viewBox="0 0 ' +
    w +
    ' ' +
    h +
    '" overflow="hidden" role="img" xml:lang="' +
    plan.locale +
    '"><title>' +
    esc(plan.name) +
    '</title><desc>' +
    esc(
      {
        en: plan.trim_mm
          ? 'Printed face. Cut out the sheet along the thick border, which sits ' + plan.trim_mm + ' mm inside the paper. The fold lines run to that border. Fold along the numbered dashed lines.'
          : 'Printed face. Print at actual size. Guides stay 6 mm inside the paper, and corner brackets point to the real corners. Fold along the numbered dashed lines.',
        ru: plan.trim_mm
          ? 'Лицевая сторона. Вырежьте лист по толстой рамке: она в ' + plan.trim_mm + ' мм от края. Линии сгибов доходят до рамки. Сгибайте по пронумерованным пунктирным линиям.'
          : 'Лицевая сторона. Печатайте в масштабе 100%. Все линии отстоят на 6 мм от края, а уголки указывают на настоящие углы листа. Сгибайте по пронумерованным пунктирным линиям.',
        es: plan.trim_mm
          ? 'Cara impresa. Recorta la hoja por el borde grueso, que está a ' + plan.trim_mm + ' mm del borde del papel. Las líneas de doblez llegan hasta ese borde. Dobla por las líneas discontinuas numeradas.'
          : 'Cara impresa. Imprime a tamaño real. Las guías quedan a 6 mm del borde, y las esquinas marcadas señalan las esquinas reales. Dobla por las líneas discontinuas numeradas.',
      }[plan.locale] +
        (plan.offset_mm
          ? {
              en: ' The border gives the A4 shape this design needs, so it sits further in at the sides.',
              ru: ' Рамка задаёт форму листа A4, нужную этой модели, поэтому по бокам она дальше от края.',
              es: ' El borde da la forma A4 que necesita este modelo, por eso queda más adentro a los lados.',
            }[plan.locale]
          : ''),
    ) +
    ' ' +
    esc([credit.creator, credit.geometry, credit.artwork, credit.credits].join('. ')) +
    '</desc>' +
    '<metadata>' +
    esc(
      JSON.stringify({
        creator: planeCredits.creator,
        ...(plan.designer ? { basedOn: plan.original, designer: plan.designer.en, rights: plan.rights } : {}),
        originalGeometry: plan.designer ? { name: 'Derived from ' + plan.original, url: plan.reference.url } : planeCredits.geometry,
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
  // A slanted root (record planes) makes the body depth vary from nose to tail.
  const depth = plan.root ? (y) => keelAt(plan.root, w, y) : () => k
  function project([x, y]) {
    const sign = Math.sign(x - c),
      spread = Math.abs(x - c),
      kk = depth(y)
    const root = Math.max(0, spread - kk),
      flat = Math.min(root, c - kk - tip)
    const z = spread < kk ? spread - kk : flat * 0.14 + root - flat
    return [0.86 * sign * flat - 0.9 * y, 0.5 * sign * flat + 0.3 * y - 0.94 * z]
  }
  const boundaries = [0, tip, c - k, c, c + k, w - tip, w]
  const bases = ['#d3cbb7', '#f5eccc', '#b0a78c', '#afa889', '#fff8dd', '#ede1bd']
  const outlineInk = '#3d4b49'
  const rootLeft = plan.root,
    rootRight = plan.root?.map(([x, y]) => [w - x, y])
  const cropAt = (points, a, b, keep) => {
    const side = (p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])
    const sign = Math.sign(side(keep))
    const out = []
    for (let i = 0; i < points.length; i++) {
      const p = points[i],
        q = points[(i + 1) % points.length],
        dp = sign * side(p),
        dq = sign * side(q)
      if (dp >= -1e-7) out.push(p)
      if (dp * dq < -1e-7) out.push([p[0] + ((q[0] - p[0]) * dp) / (dp - dq), p[1] + ((q[1] - p[1]) * dp) / (dp - dq)])
    }
    return out
  }
  const slantedRegion = (i) => {
    const vertical = (x) => [[x, 0], [x, 1]]
    const mid = [c, (rootLeft[0][1] + rootLeft[1][1]) / 2]
    if (i === 0) return tip ? cropAt(outline, ...vertical(tip), [0, 0]) : []
    if (i === 5) return tip ? cropAt(outline, ...vertical(w - tip), [w, 0]) : []
    if (i === 1) return cropAt(cropAt(outline, ...vertical(tip), [w, 0]), ...rootLeft, [0, rootLeft[0][1]])
    if (i === 4) return cropAt(cropAt(outline, ...vertical(w - tip), [0, 0]), ...rootRight, [w, rootRight[0][1]])
    if (i === 2) return cropAt(cropAt(outline, ...rootLeft, mid), ...vertical(c), [0, 0])
    return cropAt(cropAt(outline, ...rootRight, mid), ...vertical(c), [w, 0])
  }
  for (let i = 0; i < boundaries.length - 1; i++) {
    if (!plan.root && boundaries[i + 1] - boundaries[i] < 0.1) continue
    const region = plan.root ? slantedRegion(i) : cropX(cropX(outline, boundaries[i], 1), boundaries[i + 1], -1)
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
