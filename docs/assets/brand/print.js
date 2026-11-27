// Paper conventions for every Open Flight printable (PDF sheets, guides, book pages).
// All values derive from tokens.css through tokens.js. DESIGN.md explains the rules:
// text >= 9 pt, lines >= 0.3 mm, nothing within 6 mm of the edge, a 50 mm calibration line,
// fold types told apart by dash pattern (not colour), and a small brand mark.
import { color, print } from './tokens.js?v=60abccfc0f99'

export { print }
export const mmPerPt = 25.4 / 72
/** Text sizes in mm (jsPDF and SVG labels in this project are sized in mm). */
export const textMm = Object.freeze(
  Object.fromEntries(Object.entries(print.text).map(([k, v]) => [k, +(v * mmPerPt).toFixed(3)])),
)
export const ink = print.ink
export const muted = print.muted
export const accent = color.textAccent

/** Line styles. Cut is solid and heaviest; valley is dashed; mountain is dash-dot; guides are dotted. */
export const lineStyle = Object.freeze({
  cut: { stroke: ink, weight: print.line.cut },
  valley: { stroke: color.lineValley, weight: print.line.fold, dash: print.dash.valley },
  mountain: { stroke: color.lineMountain, weight: print.line.fold, dash: print.dash.mountain },
  guide: { stroke: muted, weight: print.line.min, dash: print.dash.guide },
  rule: { stroke: muted, weight: print.line.min },
})
export const atLeastLine = (w) => Math.max(w ?? 0, print.line.min)
export const atLeastText = (mm) => Math.max(mm, textMm.min)

/** Fonts embedded in every PDF. Paths are relative to apps/editor (browser) or resolved by the caller (Node). */
export const fontFiles = Object.freeze({
  text: 'assets/fonts/OpenFlightText-Regular.ttf',
  bold: 'assets/fonts/OpenFlightText-Bold.ttf',
  display: 'assets/fonts/Alegreya-Bold.ttf',
})
export const fontNotice =
  'Embedded fonts: Open Flight Text, a renamed subset of Andika by SIL International, and Alegreya by Juan Pablo del Peral (Huerta Tipográfica). Both under the SIL Open Font License 1.1.'
/** Register the three faces on a jsPDF document. base64 = { text, bold, display }. */
export function registerFonts(doc, base64) {
  doc.addFileToVFS('OpenFlightText-Regular.ttf', base64.text)
  doc.addFont('OpenFlightText-Regular.ttf', 'OFText', 'normal')
  doc.addFileToVFS('OpenFlightText-Bold.ttf', base64.bold)
  doc.addFont('OpenFlightText-Bold.ttf', 'OFText', 'bold')
  doc.addFileToVFS('Alegreya-Bold.ttf', base64.display)
  doc.addFont('Alegreya-Bold.ttf', 'OFDisplay', 'bold')
  doc.setFont('OFText', 'normal')
}
/** Select a face: 'text' (default), 'bold' or 'display'. */
export function useFont(doc, kind = 'text') {
  if (kind === 'display') doc.setFont('OFDisplay', 'bold')
  else doc.setFont('OFText', kind === 'bold' ? 'bold' : 'normal')
}

const calibrationCopy = {
  en: ['50 mm', 'Print at 100% (Actual size). Measure this line: it should be 50 mm.'],
  es: ['50 mm', 'Imprime al 100 % (Tamaño real). Mide esta línea: debe medir 50 mm.'],
  ru: ['50 мм', 'Печатайте в масштабе 100% («Фактический размер»). Длина линии — 50 мм.'],
}
export const calibrationWords = (locale) => calibrationCopy[locale] ?? calibrationCopy.en
const calibrationShortCopy = {
  en: 'Print at 100%: this line is 50 mm',
  es: 'Imprime al 100 %: esta línea mide 50 mm',
  ru: 'Печать 100%: длина линии 50 мм',
}
/** A short form of the instruction for tight spaces (airplane sheets, book pages). */
export const calibrationShort = (locale) => calibrationShortCopy[locale] ?? calibrationShortCopy.en

/**
 * The calibration mark: a 50 mm line with end stops and 10 mm ticks, its length and the instruction.
 * (x, y) is the left end of the line. Returns { lines, labels } in mm, the shapes the sheet renderers use.
 * The instruction sits below the line unless `note` is false (when the sheet prints it elsewhere).
 */
export function calibration(x, y, locale = 'en', { note = true, id = 'ruler' } = {}) {
  const [length, instruction] = calibrationWords(locale)
  const L = print.calibration
  const lines = [{ id, points: [[x, y], [x + L, y]], stroke: ink, weight: 0.4 }]
  for (let mm = 0; mm <= L; mm += 10) {
    const end = mm === 0 || mm === L
    lines.push({ id: `${id}-tick-${mm}`, points: [[x + mm, y], [x + mm, y - (end ? 3 : 1.6)]], stroke: ink, weight: end ? 0.4 : print.line.min })
  }
  const labels = [{ x: x + L + 2.5, y: y + 0.4, text: length, size: textMm.min, color: ink, font: 'bold' }]
  if (note) labels.push({ x, y: y + 5, text: instruction, size: textMm.min, color: ink })
  return { lines, labels, width: L + 2.5 + length.length * textMm.min * 0.6, height: note ? 8 : 4 }
}

/**
 * The brand mark for paper: symbol plus "Open Flight", `height` mm tall (default 4 mm, about 21 mm wide).
 * Never wider than print.brandMax. (x, y) is the top-left corner.
 */
export function brandMark(x, y, height = 4, { mono = false } = {}) {
  const s = height / 42 // the symbol spans 42 units of its 48-unit grid
  const p = (px, py) => [+(x + (px - 4.5) * s).toFixed(3), +(y + (py - 3.5) * s).toFixed(3)]
  const kite = mono ? ink : color.brandKite
  const lines = [
    { id: 'brand-sheet', points: [p(24, 11), p(6, 11), p(6, 42), p(37, 42), p(37, 24)], stroke: ink, weight: Math.max(print.line.min, 3 * s) },
    { id: 'brand-crease', points: [p(24, 11), p(37, 24)], stroke: ink, weight: print.line.min, dash: [0.5, 0.5] },
    { id: 'brand-flap', points: [p(24, 11), p(37, 24), p(46, 2)], closed: true, fill: kite, stroke: kite, weight: print.line.min },
  ]
  const labels = [{ x: x + height * 1.3, y: y + height * 0.86, text: 'Open Flight', size: Math.max(textMm.min, height * 0.78), color: ink, font: 'display' }]
  return { lines, labels, width: Math.min(print.brandMax, height * 1.3 + 4.4 * Math.max(textMm.min, height * 0.78)) }
}

/**
 * Stylesheet for standalone printable HTML (offline guides, family lessons), built from the tokens.
 * `fontsBase` is the relative path to assets/fonts/ when the file ships with the site; without it
 * the page falls back to the system sans. `paper` pins @page to one size; omit it to follow the printer.
 */
export function documentCss({ fontsBase = '', paper } = {}) {
  const face = (family, file, weight, style = 'normal') =>
    `@font-face{font-family:'${family}';src:url('${fontsBase}${file}') format('woff2');font-weight:${weight};font-style:${style};font-display:swap}`
  const fonts = fontsBase
    ? face('Open Flight Text', 'OpenFlightText-Regular.woff2', 400) +
      face('Open Flight Text', 'OpenFlightText-Bold.woff2', 700) +
      face('Open Flight Text', 'OpenFlightText-Italic.woff2', 400, 'italic') +
      face('Alegreya', 'Alegreya-Bold.woff2', 700) +
      face('Alegreya', 'Alegreya-Italic.woff2', 400, 'italic')
    : ''
  const size = paper ? `size:${paper === 'A4' ? 'A4' : 'Letter'};` : ''
  return (
    fonts +
    `@page{${size}margin:${print.margin}mm}*{box-sizing:border-box}` +
    `.print-calibration{display:none;align-items:center;gap:2mm;margin-top:4mm;font-size:${print.text.min}pt}.print-calibration svg{width:${print.calibration}mm;height:3mm;overflow:visible}` +
    `body{margin:0;background:${color.page};color:${color.text};font:17px/1.55 'Open Flight Text',Andika,system-ui,sans-serif}` +
    `main,article{max-width:46rem;margin:1.5rem auto;padding:2rem;background:${color.surface};border:1px solid ${color.rule};border-radius:8px}` +
    `header{display:flex;justify-content:space-between;gap:1rem;padding-bottom:.5rem;border-bottom:1px dashed ${color.border};color:${color.textMuted};font-size:.85rem;font-weight:700}` +
    `header b,header a{font-family:Alegreya,Georgia,serif;color:${color.text};font-size:1rem}` +
    `h1,h2,h3{font-family:Alegreya,Georgia,serif;line-height:1.15;margin:1.2em 0 .4em}h1{font-size:2.3rem;margin-top:.6em}h2{font-size:1.45rem}h3{font-size:1.1rem}` +
    `i,em{font-family:Alegreya,Georgia,serif}p{margin:.35em 0 .7em}li{margin:.45em 0}a{color:${color.textLink}}` +
    `table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}td,th{border:1px solid ${color.border};padding:.45em .55em;text-align:start;vertical-align:top}th{color:${color.textMuted};font-size:.85rem}` +
    `dl{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;border:1px solid ${color.rule};border-radius:8px;padding:.7rem}dt{font-size:.85rem;color:${color.textMuted}}dd{margin:0;font-weight:700}` +
    `.step{display:grid;grid-template-columns:2rem 1fr 34%;gap:.75rem;align-items:center;padding:.6rem 0;border-bottom:1px solid ${color.rule};break-inside:avoid}` +
    `.number{display:grid;place-items:center;width:1.75rem;height:1.75rem;border:2px solid ${color.text};border-radius:50%;font-weight:700}` +
    `.step img{display:block;width:100%;height:83px;object-fit:contain}.nature{display:flex;align-items:center;gap:1rem;margin-top:1rem}.photo{width:28%;height:95px;border-radius:4px;object-fit:cover}` +
    `footer{margin-top:1rem;color:${color.textMuted};font-size:.85rem;overflow-wrap:anywhere}small{font-size:.85rem}` +
    `@media(max-width:540px){main,article{margin:.5rem;padding:1rem}dl{grid-template-columns:1fr 1fr}.step{grid-template-columns:1.75rem 1fr}.step img{grid-column:2}table{display:block;overflow-x:auto}}` +
    `@media print{body{background:#fff;color:${print.ink};font-size:${print.text.body}pt;line-height:${print.leading}}` +
    `main,article{max-width:none;margin:0;padding:0;border:0;break-after:page}main:last-of-type,article:last-of-type{break-after:auto}` +
    `h1{font-size:${print.text.display}pt}h2{font-size:${print.text.step}pt}h3{font-size:${print.text.body}pt}` +
    `header,footer,small,th,dt{font-size:${print.text.min}pt}td,th{border:2px solid ${print.ink}}.step{border-bottom:2px solid ${print.muted};padding:3.5mm 0}` +
    `.step img,.nature img{height:24mm}a{color:${print.ink}}table{break-inside:avoid}.print-calibration{display:flex}}`
  )
}
/** Markup for the printed 50 mm calibration line in HTML documents (shown only when printing). */
export function calibrationHtml(locale = 'en') {
  const [length, instruction] = calibrationWords(locale)
  const L = print.calibration
  return (
    `<p class="print-calibration"><svg viewBox="0 0 ${L} 3" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="0.4"><path d="M0 2.6H${L}"/><path d="M0 0V2.6"/><path d="M${L} 0V2.6"/></g></svg>` +
    `<span><b>${length}</b> · ${instruction}</span></p>`
  )
}
