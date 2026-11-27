// Rendered-page checks for the design system. Needs the built site served over HTTP.
//   bun scripts/check_ui.mjs http://localhost:8000/ [--width 375] [--lang en,ru]
// For every page: text contrast against the actual background (WCAG 2.2 AA), touch targets
// smaller than 44 x 44 px (inline links inside a sentence are exempt), horizontal overflow,
// and a visible focus indicator on the first focusable elements.
import { chromium } from 'playwright-core'
import { publicPath } from '../apps/editor/site-navigation.js'

const args = process.argv.slice(2)
const base = args.find((a) => /^https?:/.test(a)) ?? 'http://localhost:8000/'
const opt = (name, fallback) => {
  const i = args.indexOf('--' + name)
  return i >= 0 ? args[i + 1] : fallback
}
const width = Number(opt('width', '375'))
const langs = opt('lang', 'en,ru').split(',')
const tools = [
  ['home', { en: 'index.html', ru: 'ru.html', es: 'es.html' }],
  ['studio', 'studio.html'], ['planes', 'planes.html'], ['flight', 'planes.html?model=boeing-747&view=flight'],
  ['book', 'book.html'], ['classroom', 'classroom.html'], ['motor', 'motor.html'], ['keel', 'keel.html'],
  ['costa', 'costa.html'], ['compare', 'compare.html'], ['references', 'references.html'], ['next', 'next.html'],
  ['objects', 'flight-objects.html'],
]

const products = ['designs', 'flight-book', 'contact', 'teachers', 'motor-lab', 'butterflies/monarch', 'airplanes/tupolev-tu144', 'flying-objects/ring']
  .map(route => [route, Object.fromEntries(langs.map(lang => [lang, publicPath(route, lang)]))])
const pages = args.includes('--products-only') ? products : [...tools, ...products]

function audit() {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number)
    return { r, g, b, a }
  }
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  const blend = (top, under) => ({
    r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1,
  })
  const background = (el) => {
    const layers = []
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n)
      if (cs.backgroundImage !== 'none' && !/gradient/.test(cs.backgroundImage)) return null // photo or raster behind text
      const c = parse(cs.backgroundColor)
      if (c && c.a > 0) {
        layers.push(c)
        if (c.a >= 1) break
      }
    }
    let colour = { r: 255, g: 255, b: 255, a: 1 }
    for (const l of layers.reverse()) colour = blend(l, colour)
    return colour
  }
  const visible = (el) => {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el)
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05
  }
  const contrast = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const seen = new Set()
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    const el = t.parentElement
    if (!t.textContent.trim() || !el || seen.has(el) || !visible(el) || el.closest('svg,[aria-hidden="true"],.sr-only,option')) continue
    seen.add(el)
    const cs = getComputedStyle(el)
    const fg = parse(cs.color), bg = background(el)
    if (!fg || !bg) continue
    const fgc = fg.a < 1 ? blend(fg, bg) : fg
    const [hi, lo] = [lum(fgc), lum(bg)].sort((a, b) => b - a)
    const ratio = (hi + 0.05) / (lo + 0.05)
    const size = parseFloat(cs.fontSize), bold = Number(cs.fontWeight) >= 700
    const large = size >= 24 || (bold && size >= 18.66)
    if (ratio < (large ? 3 : 4.5)) contrast.push(`${ratio.toFixed(2)} "${t.textContent.trim().slice(0, 30)}" <${el.tagName.toLowerCase()}.${[...el.classList].join('.')}>`)
  }
  const small = []
  const tiny = []
  for (const el of document.querySelectorAll('a[href],button,input:not([type=hidden]),select,summary,[role=button],[tabindex]:not([tabindex="-1"])')) {
    if (!visible(el) || el.closest('[hidden],dialog:not([open])')) continue
    const r = el.getBoundingClientRect()
    const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && /\S/.test(el.parentElement.textContent.replace(el.textContent, ''))
    if (inline) continue
    if (el.type === 'checkbox' || el.type === 'radio') {
      const label = el.labels?.[0]?.getBoundingClientRect()
      if (label && label.height >= 44) continue
    }
    if (r.width < 44 || r.height < 44) small.push(`${Math.round(r.width)}x${Math.round(r.height)} <${el.tagName.toLowerCase()}#${el.id}.${[...el.classList].join('.')}> "${(el.textContent || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 24)}"`)
  }
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || el.closest('svg')) continue
    if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize) < 13.9)
      tiny.push(`${getComputedStyle(el).fontSize} <${el.tagName.toLowerCase()}.${[...el.classList].join('.')}> "${el.textContent.trim().slice(0, 24)}"`)
  }
  return { contrast, small, tiny, overflow: document.documentElement.scrollWidth - innerWidth }
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
let failures = 0
for (const [name, path] of pages)
  for (const lang of langs) {
    const url = typeof path === 'string' ? path + (path.includes('?') ? '&' : '?') + 'lang=' + lang : path[lang]
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    await page.goto(base + url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const r = await page.evaluate(audit)
    // focus: tab to the first five focusable elements and require a visible outline or box-shadow
    const focus = []
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      const f = await page.evaluate(() => {
        const el = document.activeElement
        if (!el || el === document.body) return null
        const cs = getComputedStyle(el)
        return { ok: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || /\d+px/.test(cs.boxShadow), tag: el.tagName + '#' + el.id }
      })
      if (f && !f.ok) focus.push(f.tag)
    }
    const problems = r.contrast.length + r.small.length + r.tiny.length + focus.length + (r.overflow > 1 ? 1 : 0)
    failures += problems
    console.log(`${name.padEnd(10)} ${lang} ${width}px  contrast:${r.contrast.length} targets<44:${r.small.length} text<14px:${r.tiny.length} focus:${focus.length} overflow:${r.overflow}`)
    if (args.includes('--verbose'))
      for (const line of [...r.contrast.map((c) => 'contrast ' + c), ...r.small.map((s) => 'target ' + s), ...r.tiny.map((s) => 'small text ' + s), ...focus.map((s) => 'focus ' + s)].slice(0, 25))
        console.log('    ' + line)
    await page.close()
  }
await browser.close()
console.log(failures ? failures + ' UI issues' : 'UI checks pass')
process.exit(failures ? 1 : 0)
