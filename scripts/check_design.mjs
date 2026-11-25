// Design-system checks. Run: node scripts/check_design.mjs
// 1. WCAG 2.2 contrast for every text/background token pair the product uses.
// 2. Data and mark colours stay distinguishable in grayscale.
// 3. Every raw colour survives a round trip through a CMYK press profile (skipped without ImageMagick).
// 4. Stylesheets and pages use tokens: no hard-coded colours, font names, font sizes, radii or durations.
// 5. The generated token module and the identity SVGs agree with tokens.css.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { moduleSource, readTokens } from './build_tokens.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const editor = root + 'apps/editor/'
const t = readTokens()
const failures = []
const fail = (m) => failures.push(m)

// ---------- colour maths ----------
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const lum = (h) => {
  const [r, g, b] = rgb(h).map(lin)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
const lightness = (h) => {
  const y = lum(h)
  return y > 216 / 24389 ? 116 * Math.cbrt(y) - 16 : (24389 / 27) * y
}
const hex = (name) => {
  const v = t[name]
  if (!/^#[0-9a-f]{6}$/i.test(v ?? '')) throw Error(`--${name} is not a plain colour: ${v}`)
  return v
}

// ---------- 1. contrast ----------
const textOn = {
  'color-text': ['color-page', 'color-surface', 'color-surface-sunken', 'color-surface-stage', 'color-surface-selected', 'color-surface-attention', 'color-surface-success', 'color-surface-caution', 'color-highlight'],
  'color-text-muted': ['color-page', 'color-surface', 'color-surface-sunken', 'color-surface-stage', 'color-surface-selected', 'color-surface-attention', 'color-surface-success', 'color-surface-caution'],
  'color-text-link': ['color-page', 'color-surface', 'color-surface-sunken', 'color-surface-stage', 'color-surface-selected'],
  'color-text-accent': ['color-page', 'color-surface', 'color-surface-sunken', 'color-surface-attention'],
  'color-text-success': ['color-page', 'color-surface', 'color-surface-success'],
  'color-text-caution': ['color-page', 'color-surface', 'color-surface-caution'],
  'color-text-danger': ['color-page', 'color-surface', 'color-surface-attention'],
  'color-text-inverse': ['color-surface-inverse', 'color-selected', 'color-action', 'color-action-hover'],
  'color-action-text': ['color-action', 'color-action-hover'],
  'color-selected-text': ['color-selected'],
}
// Non-text UI (WCAG 1.4.11): control borders, focus ring, marks and data series need 3:1.
const graphicOn = {
  'color-border': ['color-page', 'color-surface', 'color-surface-sunken'],
  'color-focus': ['color-page', 'color-surface', 'color-surface-sunken', 'color-surface-stage'],
  'color-selected': ['color-page', 'color-surface', 'color-surface-stage'],
  'color-action': ['color-page', 'color-surface'],
  'color-mark': ['color-page', 'color-surface', 'color-surface-stage'],
  'color-series-a': ['color-surface', 'color-surface-stage'],
  'color-series-b': ['color-surface', 'color-surface-stage'],
  'color-series-c': ['color-surface', 'color-surface-stage'],
  'color-line-cut': ['color-surface', 'color-surface-stage'],
  'color-line-valley': ['color-surface', 'color-surface-stage'],
  'color-line-mountain': ['color-surface', 'color-surface-stage'],
  'color-line-guide': ['color-surface', 'color-surface-stage'],
}
const rows = []
for (const [map, min, kind] of [
  [textOn, 4.5, 'text'],
  [graphicOn, 3, 'graphic'],
]) {
  for (const [fg, bgs] of Object.entries(map))
    for (const bg of bgs) {
      const r = ratio(hex(fg), hex(bg))
      rows.push([kind, fg, bg, r])
      if (r < min) fail(`${kind} contrast ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`)
    }
}

// ---------- 2. grayscale ----------
const series = ['color-series-a', 'color-series-b', 'color-series-c', 'color-series-d']
for (let i = 0; i < series.length; i++)
  for (let j = i + 1; j < series.length; j++) {
    const d = Math.abs(lightness(hex(series[i])) - lightness(hex(series[j])))
    if (d < 8) fail(`${series[i]} and ${series[j]} differ by only ${d.toFixed(1)} L* in grayscale`)
  }

// ---------- 3. printer gamut ----------
const rawNames = Object.keys(t).filter((k) => k.startsWith('of-'))
let gamut = 'skipped (no ImageMagick)'
try {
  const profiles = '/System/Library/ColorSync/Profiles/'
  if (!existsSync(profiles + 'Generic CMYK Profile.icc')) throw Error('no profile')
  const out = execFileSync('magick', [
    ...rawNames.map((n) => 'xc:' + hex(n)), '+append',
    '-profile', profiles + 'sRGB Profile.icc', '-intent', 'Relative', '-black-point-compensation',
    '-profile', profiles + 'Generic CMYK Profile.icc', '-profile', profiles + 'sRGB Profile.icc',
    '-depth', '8', 'txt:-',
  ]).toString()
  const back = out.split('\n').filter((l) => /^\d+,0:/.test(l)).map((l) => '#' + l.match(/#([0-9A-F]{6})/i)[1])
  const worst = rawNames.map((n, i) => {
    const d = rgb(hex(n)).map((c, k) => Math.abs(c - rgb(back[i])[k]) * 255)
    return [n, Math.max(...d)]
  })
  for (const [n, d] of worst) if (d > 24) fail(`--${n} shifts ${d.toFixed(0)}/255 in a CMYK round trip: out of printer gamut`)
  gamut = 'max channel shift ' + Math.max(...worst.map((w) => w[1])).toFixed(0) + '/255'
} catch (e) {
  if (!/no profile|ENOENT/.test(String(e))) throw e
}

// ---------- 4. hard-coded values ----------
const allowFiles = new Set(['tokens.css'])
const cssFiles = readdirSync(editor).filter((f) => f.endsWith('.css') && !allowFiles.has(f))
const rules = [
  [/#[0-9a-fA-F]{3,8}\b/, 'hex colour'],
  [/\b(?:rgba?|hsla?|oklch|lab)\(/, 'colour function'],
  [/\b(?:white|black)\b(?![-\w])/, 'named colour'],
  [/font-family\s*:(?![^;]*var\(--font-)/, 'font-family without a font token'],
  [/\b(?:Rubik|Georgia|Arial|Helvetica|DejaVu|Andika|Alegreya)\b/, 'font name'],
  [/font-size\s*:\s*[\d.]+(?:px|rem|em|pt)/, 'raw font-size'],
  [/(?:^|[\s;{])font\s*:[^;]*\b[\d.]+(?:px|rem)\b/, 'raw size in font shorthand'],
  [/border-radius\s*:\s*[^;]*\d+(?:px|rem|em)/, 'raw border-radius'],
  [/(?:transition|animation)[^;:]*:\s*[^;]*\b(?!0m?s\b)\d+m?s\b/, 'raw duration'],
  [/(?:^|[\s;{])(?:margin|padding|gap|row-gap|column-gap|scroll-margin)[\w-]*\s*:[^;]*\b(?:[3-9]|[1-9]\d+)(?:\.\d+)?(?:px|rem)\b/, 'raw spacing (use --space-*)'],
]
const lint = []
for (const file of cssFiles) {
  const lines = readFileSync(editor + file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\/|@font-face\s*{[^}]*}/g, (c) => c.replace(/[^\n]/g, ' '))
    .split('\n')
  lines.forEach((line, i) => {
    for (const [re, what] of rules) if (re.test(line)) lint.push(`${file}:${i + 1} ${what}: ${line.trim().slice(0, 90)}`)
  })
}
for (const file of readdirSync(editor).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(editor + file, 'utf8')
  for (const m of html.matchAll(/style="([^"]*)"/g))
    if (/#[0-9a-f]{3,8}\b|rgb\(|font-family|font-size/i.test(m[1])) lint.push(`${file}: inline style with hard-coded value: ${m[1]}`)
  if (/<style[^>]*>\s*[^<\s]/.test(html)) lint.push(`${file}: <style> block; move it into a stylesheet`)
}
for (const l of lint) fail(l)
// Every var(--x) must be defined in tokens.css or locally (a component variable set in a rule or by script).
const defined = new Set(Object.keys(t))
const scriptVars = new Set()
for (const f of readdirSync(editor).filter((f) => f.endsWith('.js')))
  for (const [, n] of readFileSync(editor + f, 'utf8').matchAll(/setProperty\(\s*['"`]--([\w-]+)/g)) scriptVars.add(n)
for (const file of [...cssFiles, 'system.css']) {
  const css = readFileSync(editor + file, 'utf8')
  const local = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]))
  for (const [all, name, fallback] of css.matchAll(/var\(--([\w-]+)(\s*,[^)]*)?\)/g))
    if (!defined.has(name) && !local.has(name) && !scriptVars.has(name) && !fallback)
      fail(`${file}: var(--${name}) is not defined in tokens.css or the stylesheet`)
}

// ---------- 5. generated module and identity ----------
if (readFileSync(editor + 'assets/brand/tokens.js', 'utf8') !== moduleSource(t))
  fail('assets/brand/tokens.js is out of date: run node scripts/build_tokens.mjs')
const brandDir = editor + 'assets/brand/'
const allowed = new Set([t['color-brand-ink'], t['color-brand-kite'], t['color-brand-sheet'], t['of-white'], t['of-black']].map((c) => c.toLowerCase()))
for (const f of readdirSync(brandDir).filter((f) => f.endsWith('.svg'))) {
  for (const [c] of readFileSync(brandDir + f, 'utf8').matchAll(/#[0-9a-f]{6}\b/gi))
    if (!allowed.has(c.toLowerCase())) fail(`assets/brand/${f} uses ${c}, which is not a brand token`)
}

if (process.argv.includes('--report')) {
  console.log('kind     foreground            background              ratio')
  for (const [k, fg, bg, r] of rows) console.log(k.padEnd(8), fg.padEnd(22), bg.padEnd(24), r.toFixed(2))
  console.log('series L*: ' + series.map((s) => s.slice(13) + ' ' + lightness(hex(s)).toFixed(0)).join(', '))
}
console.log(`${rows.length} contrast pairs checked; gamut: ${gamut}; ${cssFiles.length} stylesheets linted`)
if (failures.length) {
  console.error(failures.length + ' design check failures:\n' + failures.slice(0, 80).join('\n') + (failures.length > 80 ? `\n… ${failures.length - 80} more` : ''))
  process.exit(1)
}
console.log('Design checks pass')
