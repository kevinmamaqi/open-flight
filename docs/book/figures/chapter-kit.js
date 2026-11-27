// Shared drawing helpers for the chapter figures (figures/chapter-*.js).
// Pure functions: the same input gives the same SVG bytes. Colours come from the brand
// tokens; meaning is carried by line style and words, so every figure reads in grayscale.
// Figures are 560 units wide (records: 696) and text is never below 16 units, so a figure
// placed 111 mm wide or more in the book keeps every label at 9 pt or larger.
import { color } from '../../assets/brand/tokens.js?v=2807f4a798d5'

export const ink = color.diagramInk
export const muted = color.textMuted
export const blue = color.lineValley
export const kite = color.diagramArrow
export const pale = color.diagramBack
export const grid = color.grid
export const sheet = color.diagramFront

export const esc = (value) => String(value).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
export const n = (value) => +value.toFixed(1)

/** The whole figure. `label` is the accessible title. */
export function frame(id, lang, width, height, label, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}" lang="${lang}" data-figure="${id}" font-family="Open Flight Text, Andika, sans-serif" font-size="16" fill="${ink}"><title>${esc(label)}</title>${body}</svg>`
}

export function text(x, y, value, { size = 16, anchor = 'start', weight = 400, fill = ink, italic = false } = {}) {
  return `<text x="${n(x)}" y="${n(y)}" font-size="${size}"${anchor === 'start' ? '' : ` text-anchor="${anchor}"`}${weight === 400 ? '' : ` font-weight="${weight}"`}${italic ? ' font-style="italic"' : ''}${fill === ink ? '' : ` fill="${fill}"`}>${esc(value)}</text>`
}

export function line(points, { stroke = ink, width = 2, dash = null, fill = 'none' } = {}) {
  return `<polyline points="${points.map(([x, y]) => n(x) + ',' + n(y)).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round" stroke-linejoin="round"/>`
}

export function poly(points, { fill = sheet, stroke = ink, width = 2 } = {}) {
  return `<polygon points="${points.map(([x, y]) => n(x) + ',' + n(y)).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`
}

/** A straight arrow from a to b with a solid head. */
export function arrow([x1, y1], [x2, y2], { stroke = kite, width = 3, dash = null, head = 12 } = {}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const back = (da) => [x2 - head * Math.cos(angle + da), y2 - head * Math.sin(angle + da)]
  const shaftEnd = [x2 - head * 0.8 * Math.cos(angle), y2 - head * 0.8 * Math.sin(angle)]
  return line([[x1, y1], shaftEnd], { stroke, width, dash }) + poly([[x2, y2], back(0.42), back(-0.42)], { fill: stroke, stroke, width: 1 })
}

/** Rotate points about a centre by degrees (clockwise on screen). */
export function rotate(points, [cx, cy], degrees) {
  const a = (degrees * Math.PI) / 180
  return points.map(([x, y]) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)])
}

/** The balance-point symbol: a circle with two filled quarters. */
export function balanceMark(x, y, r = 9) {
  return `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${sheet}" stroke="${ink}" stroke-width="2"/><path d="M${n(x)} ${n(y)}V${n(y - r)}A${r} ${r} 0 0 1 ${n(x + r)} ${n(y)}ZM${n(x)} ${n(y)}V${n(y + r)}A${r} ${r} 0 0 1 ${n(x - r)} ${n(y)}Z" fill="${ink}"/>`
}

/** A side-view paper glider: body, wing and nose, pointing right. */
export function gliderSide(cx, cy, length = 220, tilt = 0) {
  const h = length / 2
  const body = rotate([[cx - h, cy - 4], [cx + h, cy], [cx - h, cy + 22]], [cx, cy], tilt)
  const wing = rotate([[cx - h, cy - 6], [cx + h * 0.55, cy - 2], [cx + h, cy], [cx - h, cy]], [cx, cy], tilt)
  return poly(body, { fill: pale }) + poly(wing, { fill: sheet })
}

/** A horizontal dimension line between x1 and x2 at height y, with end ticks and a centred label. */
export function dim(x1, x2, y, label, { fill = muted, above = true } = {}) {
  return line([[x1, y - 5], [x1, y + 5]], { stroke: fill, width: 1.5 }) + line([[x2, y - 5], [x2, y + 5]], { stroke: fill, width: 1.5 }) +
    line([[x1, y], [x2, y]], { stroke: fill, width: 1.5 }) + text((x1 + x2) / 2, above ? y - 8 : y + 20, label, { anchor: 'middle', fill })
}

/** A small architect's title block with a ruled frame, bottom right. `rows` are short strings. */
export function titleBlock(right, bottom, width, rows) {
  const height = rows.length * 20 + 10, x = right - width, y = bottom - height
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(width)}" height="${n(height)}" fill="none" stroke="${ink}" stroke-width="1.5"/>` +
    rows.map((row, i) => text(x + 8, y + 22 + i * 20, row, { weight: i === 0 ? 700 : 400, fill: i === 0 ? ink : muted })).join('')
}
