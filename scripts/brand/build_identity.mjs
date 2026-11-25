// Builds the Open Flight identity from the symbol geometry below, the outlined wordmark
// (scripts/brand/wordmark.json, from outline_wordmark.py) and the brand colour tokens.
// Authoring tool, not part of the site build: run it after changing the mark or the brand colours.
//   node scripts/brand/build_identity.mjs            SVGs only
//   node scripts/brand/build_identity.mjs --raster   also PNG icons, favicon.ico and social previews
//                                                    (needs playwright-core's Chromium and ImageMagick)
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { color } from '../../apps/editor/assets/brand/tokens.js'
import { es, ru } from '../../apps/editor/atlas-copy.js'
const en = { headline1: 'Fold a glider.', headline2: 'Change its flight.' }

const root = fileURLToPath(new URL('../../', import.meta.url))
const out = root + 'apps/editor/assets/brand/'
mkdirSync(out, { recursive: true })
const wm = JSON.parse(readFileSync(root + 'scripts/brand/wordmark.json', 'utf8'))
const ink = color.brandInk, kite = color.brandKite, sheet = color.brandSheet, white = '#FFFFFF'

// Symbol on a 48-unit grid: a sheet whose top-right corner lifts away along a valley fold.
// The fold is dashed (the valley notation used on every printed sheet); the lifted corner is the dart.
function symbol({ line, flap, fill, dashed = true, weight = 3 }) {
  return (
    `<g transform="translate(-1.5 1.5)" stroke-linejoin="round" stroke-linecap="round">` +
    (fill ? `<path d="M6 11H24L37 24V42H6Z" fill="${fill}"/>` : '') +
    `<path d="M24 11H6V42H37V24" fill="none" stroke="${line}" stroke-width="${weight}"/>` +
    (dashed
      ? `<path d="M24 11L37 24" stroke="${line}" stroke-width="2.4" stroke-dasharray="2.6 2.6"/>`
      : `<path d="M24 11L37 24" stroke="${line}" stroke-width="${weight * 0.6}"/>`) +
    `<path d="M24 11L37 24L46 2Z" fill="${flap}" stroke="${flap}" stroke-width="1.6"/>` +
    `</g>`
  )
}
const variants = {
  '': { line: ink, flap: kite, fill: sheet, text: ink }, // full colour
  '-mono': { line: ink, flap: ink, fill: null, text: ink }, // one colour
  '-reversed': { line: white, flap: kite, fill: null, text: white }, // on ink or photographs
}
// Lockup: symbol 48 high; wordmark cap height = half the symbol; baseline on the sheet's lower edge.
const scale = 24 / wm.capHeight
const textX = 58, baseline = 43.5
const lockupW = Math.ceil(textX + wm.advance * scale + 2)
const lockupH = Math.ceil(baseline - wm.descent * scale + 2)
const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`
for (const [suffix, v] of Object.entries(variants)) {
  writeFileSync(out + `symbol${suffix}.svg`, svg(48, 48, symbol(v), 'Open Flight'))
  writeFileSync(
    out + `logo${suffix}.svg`,
    svg(
      lockupW,
      lockupH,
      symbol(v) +
        `<path transform="translate(${textX} ${baseline}) scale(${scale.toFixed(5)})" fill="${v.text}" d="${wm.path}"/>`,
      'Open Flight',
    ),
  )
}
// Favicon: no dashes below 32 px; switches to a light outline in dark browser chrome.
writeFileSync(
  out + 'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><style>.l{stroke:${ink}}.s{fill:${sheet}}@media (prefers-color-scheme:dark){.l{stroke:${white}}.s{fill:none}}</style>` +
    `<g transform="translate(-1.5 1.5)" stroke-linejoin="round" stroke-linecap="round"><path class="s" d="M6 11H24L37 24V42H6Z"/><path class="l" d="M24 11H6V42H37V24M24 11L37 24" fill="none" stroke-width="4"/><path d="M24 11L37 24L46 2Z" fill="${kite}" stroke="${kite}" stroke-width="2"/></g></svg>\n`,
)

if (process.argv.includes('--raster')) {
  const { chromium } = await import('playwright-core')
  const fonts = root + 'apps/editor/assets/fonts/'
  const browser = await chromium.launch()
  const shot = async (html, w, h, file) => {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
    await page.setContent(html, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: out + file, omitBackground: false })
    await page.close()
  }
  const icon = (size, pad, bg) =>
    `<body style="margin:0;background:${bg}"><svg width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${48 + 2 * pad} ${48 + 2 * pad}">${symbol(variants[''])}</svg></body>`
  await shot(icon(180, 7, color.page), 180, 180, 'apple-touch-icon.png')
  await shot(icon(192, 6, color.page), 192, 192, 'icon-192.png')
  await shot(icon(512, 6, color.page), 512, 512, 'icon-512.png')
  await shot(icon(512, 14, color.page), 512, 512, 'icon-maskable-512.png') // symbol inside the 80% safe zone
  await shot(`<body style="margin:0;background:${color.page}">${readFileSync(out + 'favicon.svg', 'utf8').replace('<svg ', '<svg width="32" height="32" ')}</body>`, 32, 32, 'favicon-32.png')
  execFileSync('magick', [out + 'favicon-32.png', '-define', 'icon:auto-resize=32,16', out + 'favicon.ico'])
  rmSync(out + 'favicon-32.png')
  // Social preview, 1200 x 630, one per language, built from the home page copy.
  const face = (name, file, weight, style = 'normal') =>
    `@font-face{font-family:'${name}';src:url(data:font/woff2;base64,${readFileSync(fonts + file).toString('base64')});font-weight:${weight};font-style:${style}}`
  const monarch = readFileSync(root + 'apps/editor/assets/atlas/monarch.svg', 'utf8')
  for (const [lang, copy] of [['en', en], ['es', es], ['ru', ru]]) {
    const html = `<html lang="${lang}"><style>${face('Alegreya', 'Alegreya-Bold.woff2', 700)}${face('Open Flight Text', 'OpenFlightText-Regular.woff2', 400)}${face('Open Flight Text', 'OpenFlightText-Bold.woff2', 700)}
      body{margin:0;width:1200px;height:630px;background:${color.page};color:${ink};font-family:'Open Flight Text';position:relative;overflow:hidden}
      .grid{position:absolute;inset:0;background-image:linear-gradient(${color.rule} 1px,transparent 1px),linear-gradient(90deg,${color.rule} 1px,transparent 1px);background-size:30px 30px;opacity:.55}
      .logo{position:absolute;left:72px;top:64px;height:58px}
      h1{position:absolute;left:72px;top:168px;width:560px;margin:0;font:700 68px/1.04 Alegreya}
      h1 span{display:block;color:${color.textAccent}}
      p{position:absolute;left:72px;bottom:66px;width:520px;margin:0;font-size:25px;line-height:1.4;color:${color.textMuted}}
      .art{position:absolute;right:28px;top:150px;width:470px;transform:rotate(-8deg)}
      .art svg{width:100%;height:auto}
      .path{position:absolute;inset:0}</style>
      <div class="grid"></div>
      <svg class="path" viewBox="0 0 1200 630"><path d="M690 590C800 560 880 500 930 420" fill="none" stroke="${color.lineValley}" stroke-width="4" stroke-dasharray="${'14 10'}" stroke-linecap="round"/></svg>
      <img class="logo" src="data:image/svg+xml;base64,${Buffer.from(readFileSync(out + 'logo.svg')).toString('base64')}">
      <h1>${copy.headline1}<span>${copy.headline2}</span></h1>
      <p>${copy.socialLine ?? (lang === 'ru' ? 'Бесплатно · 5–12 лет · печать на A4 и Letter' : lang === 'es' ? 'Gratis · 5–12 años · imprime en A4 o Carta' : 'Free · ages 5–12 · prints on A4 or US Letter')}</p>
      <div class="art">${monarch}</div></html>`
    await shot(html, 1200, 630, `social-${lang}.png`)
  }
  await browser.close()
}
console.log('Identity written to ' + out)
