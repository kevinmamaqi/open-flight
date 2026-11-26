// Build the One Sheet book sample from packages/one-sheet/flatplan.json and the content modules.
//   bun scripts/build_one_sheet.mjs [--lang en,ru] [--spreads id,id|sample|all] [--out dist/one-sheet] [--copy dir] [--no-png]
// For each language it assembles one HTML document, waits for the self-hosted fonts, fails on
// any missing font, any overflowing slot or any text below 9 pt, then prints with Chromium at
// 210 × 279 mm (preferCSSPageSize): a screen PDF, a home print-friendly PDF and a press PDF with
// a 3 mm bleed whose TrimBox and BleedBox are set with pdf-lib. No PDF/X claim. PNG previews of
// each spread come from the screen variant. Never uses a browser extension or network fonts.
import { chromium } from 'playwright-core'
import { PDFDocument } from 'pdf-lib'
import qrcode from 'qrcode-generator'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { renderSpread } from '../packages/one-sheet/templates.js'
import { words } from '../packages/one-sheet/content.js'
import { planeCatalog } from '../apps/editor/assets/planes/catalog.js'
import { plates } from '../apps/editor/book/catalog.js'
import { makePlane } from '../apps/editor/assets/planes/core.js'
import { planeSvg } from '../apps/editor/assets/planes/drawing.js'
import { lineStyle } from '../apps/editor/assets/brand/print.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const editor = join(root, 'apps/editor/')
const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name)
  return i > 0 ? process.argv[i + 1] : fallback
}
const plan = JSON.parse(readFileSync(join(root, 'packages/one-sheet/flatplan.json'), 'utf8'))
const out = resolve(root, arg('out', 'dist/one-sheet'))
const langs = arg('lang', Object.keys(plan.sample).filter((l) => plan.sample[l].length).join(',')).split(',')
const spreadsArg = arg('spreads', 'sample')
const checkOnly = process.argv.includes('--check')
const wantPng = !checkOnly && !process.argv.includes('--no-png')
mkdirSync(out, { recursive: true })

// Optional modules written by the plate agents: used when present, labelled slots otherwise.
const optional = async (path) => (existsSync(join(editor, path)) ? import(pathToFileURL(join(editor, path)).href) : null)
const extras = {
  plate: (await optional('book/plates/A1.js'))?.default ?? null,
  // The print variant is drawn at its real size, so its labels stay at 9 pt or more.
  figure: (m => m?.figurePrint ? (model, lang) => m.figurePrint(model, lang, { ruler: false }) : m?.figure ?? null)(await optional('book/figures/airplane.js')),
}

// ---------- shared assets ----------
const asset = (path) => pathToFileURL(join(editor, path)).href
const qr = (url) => {
  const code = qrcode(0, 'M')
  code.addData(url)
  code.make()
  return code.createSvgTag({ cellSize: 2, margin: 0, scalable: true })
}
const legendLine = (kind) => {
  const s = lineStyle[kind]
  return `<svg viewBox="0 0 12 2" style="width:12mm;height:2mm"><line x1="0" y1="1" x2="12" y2="1" stroke="${s.stroke}" stroke-width="${s.weight}"${s.dash ? ` stroke-dasharray="${s.dash.join(' ')}"` : ''}/></svg>`
}
const scaleBar = (mm, label) => `<span class="scalebar"><svg viewBox="0 0 ${mm} 3" style="width:${mm}mm;height:3mm"><line x1="0" y1="2.6" x2="${mm}" y2="2.6" stroke="currentColor" stroke-width="0.35"/>${Array.from({ length: 11 }, (_, i) => `<line x1="${(i * mm) / 10}" y1="${i % 5 ? 1.6 : 0.4}" x2="${(i * mm) / 10}" y2="2.6" stroke="currentColor" stroke-width="0.3"/>`).join('')}</svg>${label}</span>`
const planeDrawings = planeCatalog.map((p) => readFileSync(join(editor, `assets/planes/${p.model_id}.svg`), 'utf8').replace(/<\?xml[^>]*>/, ''))

function contextFor(lang) {
  const a1 = makePlane({ model_id: 'boeing-747' }, lang)
  const half = a1.dimensions.width_mm / 2
  const xs = a1.wingPolygon.map((p) => p[1])
  const span = Math.round(2 * (half - a1.keel_mm - a1.winglet_mm))
  const length = Math.round(a1.dimensions.height_mm - Math.min(...xs))
  const g = words.glanceRows
  const pick = (entry) => entry[lang] ?? entry.en
  return {
    lang, plan, extras, qr, legendLine, scaleBar, planeDrawings,
    asset,
    plateName: (id) => {
      const model = plates.find((plate) => plate.id === id)?.model
      const p = planeCatalog.find((c) => c.model_id === model)
      return p ? p.name[lang] : id
    },
    a1Glance: () => [
      [pick(g.sheet[0]), pick(g.sheet[1])],
      [pick(g.span[0]), pick(g.span[1](span))],
      [pick(g.length[0]), pick(g.length[1](length))],
      [pick(g.folds[0]), pick(g.folds[1](a1.steps.length))],
      [pick(g.balance[0]), pick(g.balance[1])],
      [pick(g.flights[0]), pick(g.flights[1])],
    ],
    // The printed A4 sheet from the same geometry, placed at exactly 1:2 by book.css.
    a1Sheet: planeSvg(a1).replace(/ width="[\d.]+mm" height="[\d.]+mm"/, ''),
    a1Specimen: planeDrawings[0],
  }
}

// ---------- typographic pre-pass (text nodes only) ----------
const nb = ' '
const units = 'mm|cm|m|km|g\\/m²|g|kg|s|%|°|GPa|N|мм|см|м|км|г\\/м²|г|кг|с|ГПа'
function typeset(html, lang) {
  return html.split(/(<[^>]+>)/).map((part) => {
    if (part.startsWith('<')) return part
    let t = part.replace(new RegExp(`(\\d) (${units})(?![\\p{L}])`, 'gu'), `$1${nb}$2`)
    if (lang === 'ru') t = t.replace(/(^|[\s(«])([ВКСУОИАвксуоиа]|на|по|за|из|от|до|не|но|со|во|ко|об|то|же|ли)\s/gu, `$1$2${nb}`)
    if (lang === 'es') t = t.replace(/(^|[\s(«])(a|y|o|e|u|de|la|el|en|un|al)\s/gu, `$1$2${nb}`)
    return t
  }).join('')
}

const fontFace = (family, file, weight, style = 'normal') => `@font-face{font-family:'${family}';src:url('${asset('assets/fonts/' + file)}') format('woff2');font-weight:${weight};font-style:${style};font-display:block}`
const fonts = [
  fontFace('Open Flight Text', 'OpenFlightText-Regular.woff2', 400),
  fontFace('Open Flight Text', 'OpenFlightText-Bold.woff2', 700),
  fontFace('Open Flight Text', 'OpenFlightText-Italic.woff2', 400, 'italic'),
  fontFace('Alegreya', 'Alegreya-Bold.woff2', '500 900'),
  fontFace('Alegreya', 'Alegreya-Italic.woff2', 400, 'italic'),
  fontFace('Unbounded', 'Unbounded.woff2', '200 900'),
].join('\n')

function selectSpreads(lang) {
  const ids = spreadsArg === 'sample' ? plan.sample[lang] ?? [] : spreadsArg === 'all' ? plan.spreads.map((s) => s.id) : spreadsArg.split(',')
  return ids.map((id) => {
    const spread = [...plan.spreads, ...(plan.covers ?? [])].find((s) => s.id === id)
    if (!spread) throw new RangeError('No spread ' + id + ' in the flat plan')
    return spread
  })
}

function documentFor(lang, variant) {
  const ctx = contextFor(lang)
  let body = selectSpreads(lang).map((spread) => renderSpread(spread, ctx)).join('\n')
  // ONE_SHEET_STRESS=1 pads every main text slot, to prove the overflow check fails (tests).
  if (process.env.ONE_SHEET_STRESS) body = body.replaceAll('data-slot="text">', 'data-slot="text"><p>' + 'overflow '.repeat(600) + '</p>')
  // The press PDF uses full-resolution print masters (kept outside Git) when they are present.
  if (variant === 'press') {
    const web = asset('assets/book/photos/')
    body = body.replaceAll(new RegExp(web.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([\\w-]+\\.jpg)', 'g'), (m, file) => {
      const master = join(root, 'local/book-photos-print', file)
      return existsSync(master) ? pathToFileURL(master).href : m
    })
  }
  const sheets = ['packages/one-sheet/book.css', 'packages/one-sheet/editorial.css', ...(variant === 'screen' ? [] : [`packages/one-sheet/${variant}.css`])]
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>One Sheet · sample · ${lang}</title>
<link rel="stylesheet" href="${asset('tokens.css')}">
${sheets.map((s) => `<link rel="stylesheet" href="${pathToFileURL(join(root, s)).href}">`).join('\n')}
<style>${fonts}</style></head><body class="${variant}">${typeset(body, lang)}</body></html>`
}

// ---------- checks run inside the page ----------
async function inspect(page) {
  return page.evaluate(async () => {
    await document.fonts.ready
    const problems = []
    const faces = [...document.fonts]
    for (const f of faces) if (f.status !== 'loaded' && f.status !== 'unloaded') problems.push(`font ${f.family} ${f.weight} ${f.style}: ${f.status}`)
    for (const spec of ['400 10pt "Open Flight Text"', '700 10pt "Open Flight Text"', '700 10pt "Alegreya"', '800 10pt "Unbounded"']) if (!(await document.fonts.load(spec)).length || !document.fonts.check(spec)) problems.push('font not available: ' + spec)
    const mm = 96 / 25.4
    for (const slot of document.querySelectorAll('[data-slot]')) {
      const over = Math.max(slot.scrollHeight - slot.clientHeight, slot.scrollWidth - slot.clientWidth)
      // 2 px (0.53 mm) allows the glyph overflow of a last line; anything more is clipped text.
      if (over > 2) problems.push(`overflow p.${slot.closest('.page').dataset.page} slot "${slot.dataset.slot}" by ${(over / mm).toFixed(1)} mm`)
    }
    for (const el of document.querySelectorAll('.page *')) {
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
      if (!own || el.closest("[data-scaled]")) continue
      let px = parseFloat(getComputedStyle(el).fontSize)
      if (el instanceof SVGGraphicsElement) px *= el.getScreenCTM()?.a ?? 1
      if (px < 11.9) problems.push(`text below 9 pt (${(px * 0.75).toFixed(1)} pt) p.${el.closest('.page').dataset.page}: ${el.textContent.trim().slice(0, 40)}`)
    }
    return { problems, faces: faces.filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`) }
  })
}

const exe = process.env.CHROMIUM_PATH || [join(homedir(), 'Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing')].find(existsSync)
const browser = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] })
const failures = []
const written = []
try {
  for (const lang of langs) {
    if (!selectSpreads(lang).length) continue
    for (const variant of checkOnly ? ['screen'] : ['screen', 'home', 'press']) {
      const htmlPath = join(out, `one-sheet-sample-${lang}-${variant}.html`)
      writeFileSync(htmlPath, documentFor(lang, variant))
      const page = await browser.newPage()
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' })
      await page.emulateMedia({ media: 'print' })
      const { problems, faces } = await inspect(page)
      if (problems.length) failures.push(...problems.map((p) => `${lang} ${variant}: ${p}`))
      if (variant === 'screen') console.log(`${lang}: fonts loaded: ${faces.join(', ')}`)
      if (checkOnly) { await page.close(); continue }
      const pdfPath = join(out, `one-sheet-sample-${lang}-${variant}.pdf`)
      await page.pdf({ path: pdfPath, preferCSSPageSize: true, printBackground: true, tagged: variant === 'screen', outline: variant === 'screen' })
      if (variant === 'press') {
        const doc = await PDFDocument.load(readFileSync(pdfPath))
        const pt = 72 / 25.4
        for (const p of doc.getPages()) {
          p.setBleedBox(0, 0, 216 * pt, 285 * pt)
          p.setTrimBox(3 * pt, 3 * pt, 210 * pt, 279 * pt)
        }
        writeFileSync(pdfPath, await doc.save())
      }
      written.push(pdfPath)
      if (variant === 'screen' && wantPng) {
        await page.emulateMedia({ media: 'screen' })
        await page.evaluate(() => document.body.classList.add('spreads'))
        await page.setViewportSize({ width: 1700, height: 1200 })
        for (const el of await page.$$('.spread')) {
          const id = await el.getAttribute('data-spread')
          const png = join(out, `one-sheet-sample-${lang}-${id}.png`)
          await el.screenshot({ path: png })
          written.push(png)
        }
      }
      await page.close()
    }
  }
} finally {
  await browser.close()
}
if (failures.length) {
  console.error(failures.length + ' One Sheet check failures:\n' + failures.join('\n'))
  process.exit(1)
}
const copy = arg('copy', null)
if (copy) {
  mkdirSync(copy, { recursive: true })
  for (const file of written) copyFileSync(file, join(copy, file.split('/').pop()))
}
console.log(checkOnly ? 'One Sheet check: no overflow, all fonts loaded, no text below 9 pt.' : `One Sheet sample: ${written.length} files in ${out}${copy ? ' (copied to ' + copy + ')' : ''}. No overflow, all fonts loaded, no text below 9 pt.`)
