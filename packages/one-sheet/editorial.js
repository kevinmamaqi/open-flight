// One Sheet · editorial spreads: cover, back cover, contents, photo openers, games
// and index, plus the shared pieces of the round-3 look (design note:
// evidence/2026-11-25-book-orientation/research-r3/design.md):
// - a strict 12-column grid, birch paper and graphite ink (Swiss and Nordic calm);
// - Unbounded for display type, numerals and signage labels; Open Flight Text for reading;
// - a red flight path that crosses every chapter opener on the same diagonal
//   (Lissitzky's wedge, Rodchenko's diagonal), ending in a paper dart;
// - metro-style roundels in the running heads for wayfinding;
// - the night sky for the space chapter.
import { book, chapterById, chapters, plates } from '../../apps/editor/book/catalog.js'
import {
  chapterData, escapeHtml as e, grownUpsBox, inline, openerPhoto, sectionNumber as webSectionNumber, textOf, ui,
} from '../../apps/editor/book/render-chapter.js'
import { photoCredit, photoFor } from '../../apps/editor/book/photos.js'

const w = (en, es, ru) => ({ en, es, ru })
export const editorialWords = {
  contents: w('Contents', 'Índice', 'Содержание'),
  games: w('Games between the chapters', 'Juegos entre capítulos', 'Игры между главами'),
  game: w('Game', 'Juego', 'Игра'),
  index: w('Index', 'Índice alfabético', 'Указатель'),
  chapter: w('Chapter', 'Capítulo', 'Глава'),
  goal: w('Goal', 'Objetivo', 'Цель'),
  players: w('Players', 'Jugadores', 'Игроки'),
  need: w('You need', 'Necesitas', 'Понадобится'),
  setup: w('Set up', 'Prepara', 'Подготовка'),
  play: w('Play', 'Juega', 'Игра'),
  score: w('Score', 'Puntos', 'Очки'),
  teaches: w('What it teaches', 'Qué enseña', 'Чему учит'),
  court: w('The court', 'La pista', 'Площадка'),
  launch: w('Launch line', 'Línea de lanzamiento', 'Линия запуска'),
  rings: w('Target rings: 3, 2, 1 points', 'Anillos: 3, 2 y 1 puntos', 'Кольца мишени: 3, 2 и 1 очко'),
  project: w('Project', 'Proyecto', 'Проект'),
  drawing: w('Drawing', 'Plano', 'Чертёж'),
  scale: w('Scale', 'Escala', 'Масштаб'),
  sheet: w('Sheet', 'Hoja', 'Лист'),
  edition: w('Edition', 'Edición', 'Издание'),
  editionValue: w('Preview, November 2026', 'Avance, noviembre de 2026', 'Пробный выпуск, ноябрь 2026'),
  fromSheet: w('From one sheet to a flight', 'De una hoja a un vuelo', 'От листа к полёту'),
  free: w('Every sheet in this book prints free at openflight.design.', 'Todas las hojas de este libro se imprimen gratis en openflight.design.', 'Все листы из этой книги можно бесплатно распечатать на openflight.design.'),
  inside: w('Inside', 'Dentro', 'Внутри'),
  afterChapter: w('after chapter', 'tras el capítulo', 'после главы'),
  plates: w('Plates', 'Láminas', 'Таблицы'),
}
const say = (entry, lang) => entry[lang] ?? entry.en
const side = (n) => (n % 2 ? 'recto' : 'verso')

/** Chapters set on the night sky: dark ground, paper text, the red turned up for the dark. */
export const nightChapters = new Set(['space'])
export const isNight = (chapterId) => nightChapters.has(chapterId)

/** Two-digit numeral, as on a departure board: 1 → 01. */
export const numeral = (n) => String(n).padStart(2, '0')

/** A metro-line roundel: the chapter number in a red disc; games use an ink disc. */
export const roundel = (label, cls = '') => `<span class="roundel${cls ? ' ' + cls : ''}" aria-hidden="true">${e(label)}</span>`

/**
 * One page. Openers and bleed pages drop the running head; full-bleed pages drop the folio.
 * `mark` puts a roundel beside the running head (the chapter number, or G + game number).
 */
export function page(n, inner, { cls = '', head = '', mark = '', markCls = '', folio = true } = {}) {
  const runhead = head ? `<div class="runhead">${mark !== '' ? roundel(mark, markCls) : ''}<span>${e(head)}</span></div>` : ''
  return `<section class="page ${side(n)} ${cls}" data-page="${n}"><div class="trim">${inner}${runhead}${folio ? `<div class="folio">${n}</div>` : ''}</div></section>`
}
export const chapterTitle = (id, lang) => chapterById(id)?.title[lang] ?? ''
export const chapterMark = (id) => chapterById(id)?.n ?? ''

/**
 * The flight path: one straight diagonal across the opening spread, from the foot of the
 * verso to a paper dart near the head of the recto. Both pages draw the same line in
 * spread coordinates (420 × 279 mm), so it runs on across the gutter. The angle (about
 * 37°) is the same in every chapter: the book's one recurring gesture.
 */
const path = { x0: -8, y0: 238, x1: 258, y1: 33 }
export function flightPath(pageSide) {
  const angle = (Math.atan2(path.y1 - path.y0, path.x1 - path.x0) * 180) / Math.PI
  const dart = `<g transform="translate(${path.x1} ${path.y1}) rotate(${angle.toFixed(2)})"><path class="dart" d="M0 0 L-17 -7 L-12.5 0 L-17 7 Z"/><path class="dart-fold" d="M0 0 L-12.5 0"/></g>`
  return `<svg class="flightpath ${pageSide}" viewBox="0 0 420 279" aria-hidden="true"><line class="trail" x1="${path.x0}" y1="${path.y0}" x2="${path.x1 - 13}" y2="${path.y1 + 10}"/>${dart}</svg>`
}

/**
 * The text page of a chapter opener, shared by OP and PH: an oversized chapter numeral,
 * the title, the opening words, the chapter's sections with their pages, and the note.
 */
export function openerRecto(n, { meta, lang, intro, rows, noteLabel, note, cls = '' }) {
  const num = meta.n ? `<p class="opener-num" aria-hidden="true">${numeral(meta.n)}</p>` : ''
  const orbit = cls.includes('night') ? '<svg class="orbit" viewBox="0 0 210 279" aria-hidden="true"><circle cx="184" cy="24" r="54"/><circle cx="184" cy="24" r="80"/></svg>' : ''
  return page(n, `${orbit}${flightPath('recto')}${num}<div class="area"><div class="opener-text" data-slot="opener-text"><p class="chapter-no">${say(editorialWords.chapter, lang)} ${meta.n}</p><h1 class="chapter-title">${e(meta.title[lang])}</h1><p class="standfirst">${intro}</p>${rows}</div><aside class="notes-box grownups opener-note" data-slot="opener-note"><b>${noteLabel}</b><p>${note}</p></aside></div>`, { cls: 'opener ' + cls })
}

/**
 * A pull figure: the first measured number in a section's own words, set large, with the
 * sentence it comes from as its caption. Nothing is invented: the number, its unit and the
 * sentence are the chapter text, and the sentence keeps its notes and evidence chips. A
 * section can name its own with `pull: { value, unit, sentence }` in the chapter module.
 */
const units = 'km/h|km/s|m/s|kg/m³|km|cm|mm|kg|m|g|°C|кг/м³|км/ч|км/с|м/с|км|см|мм|кг|м|г'
const approx = /(?:about|around|roughly|nearly|almost|some|unos|unas|cerca de|casi|ronda (?:los|las)|около|примерно|почти|приблизительно)(?:\s(?:на|в|до|de))?\s*$/i
const pullRe = new RegExp(`(?:(Mach|Мах)\\s(\\d+))|(\\d{1,3}(?:[ ,.\\u00a0\\u202f]\\d{3})*(?:[.,]\\d+)?)[\\s\\u00a0](${units})(?![\\p{L}\\d/])`, 'u')
export function pullFigure(t, lang, chapter) {
  if (t.pull) return pullHtml(t.pull, lang, chapter)
  const plainOf = (s) => s.replace(/\{\{[\w-]+\}\}/g, '').replace(/\s*\[\[[\w-]+\]\]/g, '')
  for (const text of [t.lead, ...(t.body ?? [])].filter(Boolean)) {
    // Sentences end at . ! ? followed by a space or the end, so 1.2 stays whole.
    for (const sentence of text.match(/(?:[^.!?]|[.!?](?!\s|$))+[.!?]*/g) ?? []) {
      const plain = plainOf(sentence)
      const m = plain.match(pullRe)
      if (!m) continue
      const prefix = approx.test(plain.slice(0, m.index)) ? '≈' : ''
      return pullHtml(m[1] ? { before: m[1], value: m[2], sentence } : { value: prefix + m[3], unit: m[4], sentence }, lang, chapter)
    }
  }
  return ''
}
function pullHtml({ before, value, unit, sentence }, lang, chapter) {
  // U+00A0, not the narrow U+202F: the Unbounded subset has no narrow space.
  const num = String(value).replace(/[\u00a0\u202f ]/g, '\u00a0')
  // Long figures (≈27 300) step down a size so they always fit the notes column.
  const digits = num.replace(/[^\p{N}.,]/gu, '').length
  const size = digits >= 6 ? ' pull-xl' : digits >= 4 ? ' pull-l' : ''
  return `<figure class="pull${size}"><p class="pull-figure">${before ? `<span class="pull-unit">${e(before)}</span> ` : ''}<span class="pull-num">${e(num)}</span>${unit ? ` <span class="pull-unit">${e(unit)}</span>` : ''}</p>${sentence ? `<figcaption>${inline(sentence.trim(), lang, chapter)}</figcaption>` : ''}</figure>`
}

/** A photograph placed like a plate: image, caption, credit; renders are labelled as such. */
export function photoFigure(id, ctx, cls = '') {
  const p = photoFor(id)
  if (!p) return ''
  return `<figure class="photo ${cls}"><img src="${ctx.asset('assets/book/photos/' + p.file)}" alt=""><figcaption class="caption">${e(say(p.caption, ctx.lang))} <span class="credit">${e(photoCredit(id, ctx.lang))}</span></figcaption></figure>`
}

/** The title block that closes every architectural drawing sheet. */
function titleBlock(lang, rows) {
  return `<table class="title-block">${rows.map(([k, v]) => `<tr><th>${e(say(editorialWords[k], lang))}</th><td>${e(v)}</td></tr>`).join('')}</table>`
}

/** A dimension line in mm, drawn as an architect would: ticks, extension and the figure. */
const dimension = (mm, label, vertical = false) => vertical
  ? `<svg class="dim dim-v" data-scaled="rotated label, same size as the horizontal one" viewBox="0 0 16 ${mm}" style="height:${mm / 2}mm;width:8mm"><line x1="12" y1="0" x2="12" y2="${mm}"/><line x1="9" y1="-3" x2="15" y2="3"/><line x1="9" y1="${mm - 3}" x2="15" y2="${mm + 3}"/><text x="7" y="${mm / 2}" transform="rotate(-90 7 ${mm / 2})">${label}</text></svg>`
  : `<svg class="dim" viewBox="0 0 ${mm} 16" style="width:${mm / 2}mm;height:8mm"><line x1="0" y1="12" x2="${mm}" y2="12"/><line x1="-3" y1="15" x2="3" y2="9"/><line x1="${mm - 3}" y1="15" x2="${mm + 3}" y2="9"/><text x="${mm / 2}" y="7.5">${label}</text></svg>`

/** The court drawing shared by the games: launch line, distance marks and target rings. */
function courtSvg(lang) {
  const marks = [1, 2, 3, 4, 5].map((m) => `<line x1="${20 + m * 30}" y1="18" x2="${20 + m * 30}" y2="82" class="guide"/><text x="${20 + m * 30}" y="94">${m} m</text>`).join('')
  return `<svg class="court" viewBox="0 0 200 100" role="img" aria-label="${e(say(editorialWords.court, lang))}">
    <rect x="1" y="1" width="198" height="98" class="frame"/>
    <line x1="20" y1="12" x2="20" y2="88" class="launch"/><text x="22" y="10" class="label">${e(say(editorialWords.launch, lang))}</text>
    ${marks}
    <circle cx="140" cy="50" r="24" class="ring"/><circle cx="140" cy="50" r="15" class="ring"/><circle cx="140" cy="50" r="6" class="ring bull"/>
    <path d="M24 50 C 60 30, 100 34, 134 48" class="path"/><text x="114" y="84" class="label">${e(say(editorialWords.rings, lang))}</text>
  </svg>`
}

function pageOf(ctx, predicate) {
  const s = ctx.plan.spreads.find(predicate)
  return s ? s.pages[0] : ''
}

/** Sections of a chapter, numbered 8.1, 8.2 … as on the opener and above each spread title. */
export const sectionNumber = (chapter, section) => webSectionNumber(chapter.id, section)

export const editorialTemplates = {
  /** Front cover: the drawing sheet, made a poster. Not counted in the page numbers. */
  COVER(spread, ctx) {
    const { lang } = ctx
    const inner = `<svg class="cover-wedge" viewBox="0 0 210 279" preserveAspectRatio="none" aria-hidden="true"><path d="M-4 236 L-4 283 L214 79 L214 32 Z"/></svg>
      <div class="sheet-frame"></div>
      <div class="cover-title"><p class="eyebrow">Open Flight</p><h1>${e(book.title[lang])}</h1><p class="lineage">${e(book.subtitle[lang])}</p></div>
      <figure class="cover-sheet"><div data-scaled="1:2">${ctx.a1Sheet}</div>${dimension(210, '210 ' + (lang === 'ru' ? 'мм' : 'mm'))}${dimension(297, '297 ' + (lang === 'ru' ? 'мм' : 'mm'), true)}</figure>
      <figure class="cover-plane" aria-label="${e(say(editorialWords.fromSheet, lang))}">${ctx.planeDrawings[0]}</figure>
      ${titleBlock(lang, [['project', book.title[lang]], ['drawing', 'OF-001 · A1 ' + ctx.plateName('A1')], ['scale', '1:2'], ['sheet', '1 / 1'], ['edition', say(editorialWords.editionValue, lang)]])}`
    return page(0, inner, { cls: 'cover', folio: false })
  },

  /** Back cover: the night sky, the promise, six photographs and the free-print address. */
  BACK(spread, ctx) {
    const { lang } = ctx
    const strip = ['maple-seeds', 'dragonfly', 'gliding-bird', 'kite', 'glider', 'rocket'].map((id) => photoFigure(id, ctx, 'thumb')).join('')
    const inner = `<svg class="cover-wedge back-wedge" viewBox="0 0 210 279" preserveAspectRatio="none" aria-hidden="true"><path d="M-4 236 L-4 283 L214 79 L214 32 Z"/></svg>
      <div class="back-text"><p class="eyebrow">Open Flight</p><h2 class="back-title">${e(book.title[lang])}</h2><p class="standfirst">${e(book.promise[lang])}</p>
      <p class="back-chapters">${chapters.filter((c) => c.route || c.family).map((c) => e(c.title[lang])).join(' · ')}</p></div>
      <div class="back-strip">${strip}</div>
      <div class="back-foot"><div class="qr-tile">${ctx.qr('https://openflight.design/')}</div><p>${e(say(editorialWords.free, lang))}</p></div>`
    return page(999, inner, { cls: 'cover back night', folio: false })
  },

  /** Contents: chapters with big numerals and pages; the games and six photographs beside them. */
  TOC(spread, ctx) {
    const { lang } = ctx
    const [v, r] = spread.pages
    const opener = (c) => pageOf(ctx, (s) => s.chapter === c.id && ['OP', 'PH'].includes(s.template))
    const rows = chapters.filter((c) => opener(c)).map((c) => `<tr${isNight(c.id) ? ' class="is-night"' : ''}><td class="toc-n">${numeral(c.n)}</td><td><b>${e(c.title[lang])}</b><span>${e(c.standfirst[lang])}</span></td><td class="toc-page">${opener(c)}</td></tr>`).join('')
    const games = ctx.plan.spreads.filter((s) => s.template === 'GM').map((s, i) => {
      let title = s.title
      try { title = textOf(sectionFor(s.content).section, lang).t.title } catch {}
      return `<tr><td class="toc-n">${roundel('G' + (i + 1), 'roundel-ink')}</td><td>${e(title)}</td><td class="toc-page">${s.pages[0]}</td></tr>`
    }).join('')
    const photos = ['paper-plane', 'maple-seeds', 'monarch', 'vintage-plane', 'rocket', 'mars'].map((id) => photoFigure(id, ctx, 'thumb')).join('')
    return page(v, `<div class="area"><div data-slot="contents"><h1 class="chapter-title">${say(editorialWords.contents, lang)}</h1><table class="toc toc-book">${rows}</table></div></div>`, { cls: 'contents-spread' }) +
      page(r, `<div class="area"><div data-slot="games"><p class="eyebrow">${say(editorialWords.games, lang)}</p><table class="toc toc-games">${games}</table><div class="toc-photos">${photos}</div></div></div>`, { cls: 'contents-spread' })
  },

  /** A chapter opener: a full-bleed photograph, the flight path, an oversized numeral. */
  PH(spread, ctx) {
    const { lang } = ctx
    const meta = chapterById(spread.chapter)
    const chapter = chapterData(spread.chapter)
    const { t, lang: l } = textOf(chapter.opener, lang)
    const [v, r] = spread.pages
    const night = isNight(spread.chapter) ? 'night' : ''
    // A photograph, never a render, leads the opener (same rule as the web chapter page).
    const photo = openerPhoto(spread.chapter, spread.photo ?? chapter.opener.photo)
    const sections = chapter.sections.filter((s) => s.kind !== 'game').map((s) => {
      const pg = pageOf(ctx, (x) => x.content === spread.chapter + '#' + s.id)
      return `<tr><td class="toc-id">${sectionNumber(chapter, s)}</td><td>${e(textOf(s, l).t.title)}</td><td class="toc-page">${pg}</td></tr>`
    }).join('')
    const p = photoFor(photo)
    const verso = p
      ? `<div class="bleed photo-bleed"><img src="${ctx.asset('assets/book/photos/' + p.file)}" alt=""></div>${flightPath('verso')}<p class="photo-tag">${e(say(p.caption, lang))} <span class="credit">${e(photoCredit(photo, lang))}</span></p>`
      : `<div class="bleed stage"></div>${flightPath('verso')}`
    return page(v, verso, { cls: `is-bleed opener ${night}`, folio: false }) +
      openerRecto(r, { meta, lang, intro: inline(t.intro, l, chapter), rows: `<table class="toc toc-sections">${sections}</table>`, noteLabel: say(ui.grownUps, lang), note: inline(t.grownUps, l, chapter), cls: night })
  },

  /** A game between chapters: the rules and a cropped photograph on the left, the court on the right. */
  GM(spread, ctx) {
    const { lang } = ctx
    const { chapter, section } = sectionFor(spread.content)
    const { t, lang: l } = textOf(section, lang)
    const [v, r] = spread.pages
    const n = ctx.plan.spreads.filter((s) => s.template === 'GM').findIndex((s) => s.id === spread.id) + 1
    const list = (items, tag = 'ul') => items?.length ? `<${tag} class="steps">${items.map((x) => `<li>${inline(x, l, chapter)}</li>`).join('')}</${tag}>` : ''
    const photo = section.photo && photoFor(section.photo) ? `<div class="gm-photo">${photoFigure(section.photo, ctx)}</div>` : ''
    const verso = `${photo}<div class="area"><div data-slot="game-rules"><p class="game-badge">${roundel(String(n), 'roundel-ink roundel-xl')}<span class="eyebrow">${say(editorialWords.game, lang)}</span></p><h2 class="spread-title">${e(t.title)}</h2>
      ${t.goal ? `<p class="standfirst">${inline(t.goal, l, chapter)}</p>` : ''}
      <dl class="game-facts">${t.players ? `<div><dt>${say(editorialWords.players, lang)}</dt><dd>${e(t.players)}</dd></div>` : ''}${t.need?.length ? `<div><dt>${say(editorialWords.need, lang)}</dt><dd>${e(t.need.join(' · '))}</dd></div>` : ''}</dl>
      <h3>${say(editorialWords.setup, lang)}</h3>${list(t.setup, 'ol')}</div></div>`
    const recto = `<div class="area"><figure class="stage court-band">${courtSvg(lang)}</figure><div data-slot="game-play"><h3>${say(editorialWords.play, lang)}</h3>${list(t.play, 'ol')}
      ${t.score ? `<h3>${say(editorialWords.score, lang)}</h3><p>${inline(t.score, l, chapter)}</p>` : ''}
      ${t.teaches ? `<aside class="notes-box grownups"><b>${say(editorialWords.teaches, lang)}</b><p>${inline(t.teaches, l, chapter)}</p></aside>` : ''}</div></div>`
    const head = say(editorialWords.game, lang) + ' ' + n
    return page(v, verso, { head, mark: 'G' + n, markCls: 'roundel-ink', cls: 'gm' + (photo ? ' has-photo' : ''), folio: !photo }) + page(r, recto, { head: t.title, mark: 'G' + n, markCls: 'roundel-ink', cls: 'gm' })
  },

  /** Index: every titled spread and plate, alphabetically, with its first page. */
  IX(spread, ctx) {
    const { lang } = ctx
    const entries = new Map()
    const add = (term, pg) => { if (term && pg) entries.set(term, [...new Set([...(entries.get(term) ?? []), pg])]) }
    for (const s of ctx.plan.spreads) {
      if (s.plate) add(ctx.plateName(s.plate) + ' (' + s.plate + ')', s.pages[0])
      if (s.content) { try { add(textOf(sectionFor(s.content).section, lang).t.title, s.pages[0]) } catch {} }
    }
    for (const c of chapters) add(c.title[lang], pageOf(ctx, (s) => s.chapter === c.id))
    const sorted = [...entries].sort(([a], [b]) => a.localeCompare(b, lang))
    const items = sorted.map(([term, pages]) => `<li><span>${e(term)}</span> <b>${pages.join(', ')}</b></li>`).join('')
    const [v, r] = spread.pages
    const half = Math.ceil(sorted.length / 2)
    const split = items.split('</li>')
    return page(v, `<div class="area"><div data-slot="index"><h1 class="chapter-title">${say(editorialWords.index, lang)}</h1><ul class="index">${split.slice(0, half).join('</li>')}</li></ul></div></div>`, { cls: 'ix' }) +
      page(r, `<div class="area"><div data-slot="index-2"><ul class="index">${split.slice(half).join('</li>')}</ul></div></div>`, { cls: 'ix' })
  },
}

export function sectionFor(ref) {
  const [chapterId, sectionId] = String(ref).split('#')
  const chapter = chapterData(chapterId)
  const section = chapter.sections.find((s) => s.id === sectionId)
  if (!section) throw new RangeError('No section ' + ref)
  return { chapter, section }
}

export { plates, grownUpsBox }
