// Audits printable PDFs against the paper rules in DESIGN.md.
//   node scripts/check_print_design.mjs [--report] file.pdf ...      (defaults to every printable)
// Per page: smallest text (pt), fonts, thinnest stroke (mm), marks inside the 6 mm edge zone,
// the 50 mm calibration line and its measured length. With Ghostscript: ink coverage per page.
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { print } from '../apps/editor/assets/brand/tokens.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
const { OPS } = pdfjs
const MM = 72 / 25.4
const args = process.argv.slice(2)
const report = args.includes('--report')
let files = args.filter((a) => !a.startsWith('--'))
if (!files.length) {
  const lib = root + 'apps/editor/library/'
  const objects = root + 'apps/editor/assets/objects/'
  files = [
    ...readdirSync(lib).filter((f) => f.endsWith('.pdf')).map((f) => lib + f),
    ...readdirSync(objects).filter((f) => f.endsWith('.pdf')).map((f) => objects + f),
  ]
}

const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
]
const apply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]
const scaleOf = (m) => Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2]))

async function auditPage(page) {
  const [, , W, H] = page.view
  const ops = await page.getOperatorList()
  let ctm = [1, 0, 0, 1, 0, 0], lineWidth = 1
  const stack = []
  const res = { widthMm: W / MM, heightMm: H / MM, minStrokeMm: Infinity, edge: [], calibration: [] }
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i], a = ops.argsArray[i]
    if (fn === OPS.save) stack.push([ctm, lineWidth])
    else if (fn === OPS.restore) [ctm, lineWidth] = stack.pop() ?? [ctm, lineWidth]
    else if (fn === OPS.transform) ctm = mul(ctm, a)
    else if (fn === OPS.setLineWidth) lineWidth = a[0]
    else if (fn === OPS.constructPath) {
      const [draw, data, minMax] = a
      const stroked = [OPS.stroke, OPS.closeStroke, OPS.fillStroke, OPS.eoFillStroke, OPS.closeFillStroke, OPS.closeEOFillStroke].includes(draw)
      const path = data?.[0] instanceof Float32Array || Array.isArray(data?.[0]) ? data[0] : data
      if (stroked) {
        const w = (lineWidth * scaleOf(ctm)) / MM
        if (w > 0) res.minStrokeMm = Math.min(res.minStrokeMm, w)
        // a single straight segment: is it the 50 mm calibration line?
        if (path && path.length === 6 && path[0] === 0 && path[3] === 1) {
          const [x0, y0] = apply(ctm, path[1], path[2]), [x1, y1] = apply(ctm, path[4], path[5])
          const len = Math.hypot(x1 - x0, y1 - y0) / MM
          if (Math.abs(len - print.calibration) < 1) res.calibration.push(+len.toFixed(2))
        }
      }
      if (minMax && minMax.length === 4 && Number.isFinite(minMax[0])) {
        const pts = [apply(ctm, minMax[0], minMax[1]), apply(ctm, minMax[2], minMax[3])]
        const x0 = Math.min(pts[0][0], pts[1][0]) / MM, x1 = Math.max(pts[0][0], pts[1][0]) / MM
        const y0 = Math.min(pts[0][1], pts[1][1]) / MM, y1 = Math.max(pts[0][1], pts[1][1]) / MM
        const pageW = W / MM, pageH = H / MM
        // ignore full-page backgrounds; flag marks that reach into the edge zone
        const fullPage = x0 <= 0.5 && y0 <= 0.5 && x1 >= pageW - 0.5 && y1 >= pageH - 0.5
        if (!fullPage && (x0 < print.safe - 0.01 || y0 < print.safe - 0.01 || x1 > pageW - print.safe + 0.01 || y1 > pageH - print.safe + 0.01))
          res.edge.push(`path ${x0.toFixed(1)},${y0.toFixed(1)}–${x1.toFixed(1)},${y1.toFixed(1)}`)
      }
    }
  }
  const text = await page.getTextContent()
  const fonts = new Set()
  let minText = Infinity
  for (const item of text.items) {
    if (!item.str?.trim()) continue
    const size = Math.hypot(item.transform[2], item.transform[3])
    minText = Math.min(minText, size)
    fonts.add(text.styles[item.fontName]?.fontFamily ?? item.fontName)
    const x = item.transform[4] / MM, y = item.transform[5] / MM, w = item.width / MM
    if (x < print.safe - 0.01 || y < print.safe - 0.01 || x + w > W / MM - print.safe + 0.01 || y > H / MM - print.safe + 0.01)
      res.edge.push(`text "${item.str.slice(0, 24)}" at ${x.toFixed(1)},${y.toFixed(1)}`)
  }
  for (const id of Object.keys(page.commonObjs?._objs ?? {})) void id
  res.minTextPt = +minText.toFixed(2)
  res.fonts = [...fonts]
  return res
}

function inkCoverage(file) {
  try {
    const out = execFileSync('gs', ['-q', '-o', '-', '-sDEVICE=inkcov', '-r36', file]).toString()
    // inkcov gives, per channel, the share of the page area carrying that ink. The largest channel
    // is the inked area (black text converted from RGB lands on all four channels at once).
    return out.trim().split('\n').map((l) => Math.max(...l.trim().split(/\s+/).slice(0, 4).map(Number)))
  } catch {
    return null
  }
}

const problems = []
let pages = 0
for (const file of files) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(file)), verbosity: 0, disableFontFace: true }).promise
  const fontNames = new Set()
  const name = file.replace(root, '')
  const ink = existsSync('/opt/homebrew/bin/gs') || existsSync('/usr/bin/gs') ? inkCoverage(file) : null
  let calibrated = false
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const r = await auditPage(page)
    pages++
    for (const f of r.fonts) fontNames.add(f)
    if (r.calibration.length) calibrated = true
    const tag = `${name} p${p}`
    if (r.minTextPt < print.text.min - 0.05) problems.push(`${tag}: text at ${r.minTextPt} pt (minimum ${print.text.min} pt)`)
    if (r.minStrokeMm < print.line.min - 0.005) problems.push(`${tag}: stroke ${r.minStrokeMm.toFixed(3)} mm (minimum ${print.line.min} mm)`)
    if (r.edge.length) problems.push(`${tag}: ${r.edge.length} marks within ${print.safe} mm of the edge, e.g. ${r.edge[0]}`)
    if (report)
      console.log(`${tag}  ${r.widthMm.toFixed(1)}×${r.heightMm.toFixed(1)} mm  text≥${r.minTextPt}pt  stroke≥${r.minStrokeMm.toFixed(2)}mm  cal=${r.calibration.join('/') || '-'}  ink=${ink ? (ink[p - 1] * 100).toFixed(1) + '%' : '?'}  edge=${r.edge.length}`)
    if (ink && ink[p - 1] > 0.5) problems.push(`${tag}: heavy ink, ${(ink[p - 1] * 100).toFixed(0)}% of the page area inked`)
  }
  if (!calibrated) problems.push(`${name}: no ${print.calibration} mm calibration line`)
  if (report) console.log(`${name}  fonts: ${[...fontNames].join(', ')}`)
}
console.log(`${files.length} files, ${pages} pages audited`)
if (problems.length) {
  console.error(problems.length + ' print rule failures:\n' + problems.slice(0, 60).join('\n') + (problems.length > 60 ? `\n… ${problems.length - 60} more` : ''))
  process.exit(1)
}
console.log('Print checks pass')
