import { photoCredit, photoFor, photoPath } from './photos.js?v=827c6a6b1e8f'
// Web rendering of a book chapter: chapterBody(chapterId, lang, base) returns an HTML
// fragment (no <head>, no site header) for /how-it-flies/, /contests/ and /experiments/.
// The book pipeline (packages/one-sheet) reuses inline(), chip(), boxes and tables from here,
// so the web edition and the book set the same words. Styles: apps/editor/chapter.css.
import { chapterById } from './catalog.js?v=827c6a6b1e8f'
import howItFlies from './chapters/how-it-flies.js?v=827c6a6b1e8f'
import contests, { records } from './chapters/contests.js?v=827c6a6b1e8f'
import experiments from './chapters/experiments.js?v=827c6a6b1e8f'
import nature from './chapters/nature.js?v=827c6a6b1e8f'
import * as figuresNature from './figures/chapter-nature.js?v=827c6a6b1e8f'
import history from './chapters/history.js?v=827c6a6b1e8f'
import * as figuresHistory from './figures/chapter-history.js?v=827c6a6b1e8f'
import space from './chapters/space.js?v=827c6a6b1e8f'
import * as figuresSpace from './figures/chapter-space.js?v=827c6a6b1e8f'
import games from './chapters/games.js?v=827c6a6b1e8f'
import * as figuresHow from './figures/chapter-how-it-flies.js?v=827c6a6b1e8f'
import * as figuresContests from './figures/chapter-contests.js?v=827c6a6b1e8f'
import * as figuresExperiments from './figures/chapter-experiments.js?v=827c6a6b1e8f'

const w = (en, es, ru) => ({ en, es, ru })
export const chapterModules = { 'how-it-flies': howItFlies, nature, history, space, games, contests, experiments }
const figureModules = [figuresHow, figuresContests, figuresExperiments, figuresNature, figuresHistory, figuresSpace]
export { records }

/** Evidence states, always shown as words (book/README.md). */
export const evidenceLabels = {
  estimate: w('estimate', 'estimación', 'оценка'),
  'not-yet-measured': w('not yet measured', 'aún sin medir', 'ещё не измерено'),
  measured: w('measured', 'medido', 'измерено'),
  concept: w('concept', 'concepto', 'концепция'),
  render: w('render', 'render', 'рендер'),
  photograph: w('photograph', 'fotografía', 'фотография'),
}

export const ui = {
  chapter: w('Chapter', 'Capítulo', 'Глава'),
  contents: w('In this chapter', 'En este capítulo', 'В этой главе'),
  tryIt: w('Try it', 'Pruébalo', 'Попробуйте'),
  lookFor: w('Look for', 'Fíjate en', 'Обратите внимание'),
  grownUps: w('Go deeper', 'Más a fondo', 'Копнём глубже'),
  sources: w('Sources', 'Fuentes', 'Источники'),
  question: w('Question', 'Pregunta', 'Вопрос'),
  why: w('Why it matters', 'Por qué importa', 'Зачем это нужно'),
  need: w('You need', 'Necesitas', 'Понадобится'),
  steps: w('Steps', 'Pasos', 'Шаги'),
  record: w('Record your launches on sheet L2', 'Anota tus lanzamientos en la hoja L2', 'Записывайте запуски на листе L2'),
  look: w('What to look for', 'En qué fijarse', 'На что смотреть'),
  known: w('What we know so far', 'Lo que sabemos hasta ahora', 'Что известно сейчас'),
  safety: w('Safety', 'Seguridad', 'Безопасность'),
  see: w('If it…', 'Si…', 'Если модель…'),
  cause: w('Why', 'Por qué', 'Почему'),
  fix: w('Try this', 'Prueba esto', 'Попробуйте'),
  review: w('', 'Traducción en borrador: pendiente de revisión por un hablante nativo.', 'Черновик перевода: ждёт проверки носителем языка.'),
  asOf: w('Facts checked on', 'Datos comprobados el', 'Факты проверены'),
  goal: w('Goal', 'Objetivo', 'Цель'),
  players: w('Players', 'Jugadores', 'Игроки'),
  setup: w('Set up', 'Preparación', 'Подготовка'),
  play: w('Play', 'Cómo se juega', 'Игра'),
  score: w('Score', 'Puntuación', 'Очки'),
  teaches: w('What it teaches', 'Qué enseña', 'Чему учит'),
  after: w('Play it after chapter', 'Juégalo tras el capítulo', 'Играйте после главы'),
  interlude: w('Between chapters', 'Entre capítulos', 'Между главами'),
  noLink: w('In the Open Flight source', 'En el código fuente de Open Flight', 'В исходных материалах Open Flight'),
}
const say = (entry, lang) => entry[lang] ?? entry.en

/** Photo slots: ids the lead supplies as assets/photos/<id>.jpg. Alt text is written here, in three languages. */
export const photoAlt = {
  'paper-plane': w('A paper plane in flight', 'Un avión de papel en vuelo', 'Бумажный самолёт в полёте'),
  'maple-seeds': w('Maple seeds with one wing each', 'Semillas de arce con un ala cada una', 'Семена клёна с одним крылом'),
  dandelion: w('A dandelion seed head', 'Una cabezuela de diente de león', 'Пушистое соцветие одуванчика'),
  dragonfly: w('A dragonfly with its four wings open', 'Una libélula con las cuatro alas abiertas', 'Стрекоза с раскрытыми четырьмя крыльями'),
  monarch: w('A monarch butterfly', 'Una mariposa monarca', 'Бабочка-монарх'),
  'gliding-bird': w('A bird gliding on still wings', 'Un ave planeando con las alas quietas', 'Птица, планирующая на неподвижных крыльях'),
  bat: w('A bat in flight', 'Un murciélago en vuelo', 'Летучая мышь в полёте'),
  kite: w('A kite in the sky', 'Una cometa en el cielo', 'Воздушный змей в небе'),
  glider: w('A glider in flight', 'Un planeador en vuelo', 'Планёр в полёте'),
  'vintage-plane': w('An early aeroplane', 'Un avión de los primeros tiempos', 'Ранний самолёт'),
  rocket: w('A rocket rising', 'Un cohete ascendiendo', 'Взлетающая ракета'),
  'earth-orbit': w('Earth’s edge seen from orbit', 'El borde de la Tierra visto desde la órbita', 'Край Земли, вид с орбиты'),
  mars: w('The surface of Mars', 'La superficie de Marte', 'Поверхность Марса'),
  'folding-hands': w('Hands folding a sheet of paper', 'Manos plegando una hoja de papel', 'Руки складывают лист бумаги'),
  feather: w('A feather', 'Una pluma', 'Перо'),
}

/** Number, title and route of a chapter: the catalog first, then the module's own fallback `meta`. */
export const chapterMeta = (id) => chapterById(id) ?? chapterModules[id]?.meta ?? null
const chapterHref = (meta, lang, base) => (meta?.route ? base + (lang === 'en' ? '' : lang + '/') + meta.route + '/' : null)

/**
 * The opener's photograph. A chapter opens on a photograph, not a render: if the chosen
 * picture is a render, the first photograph offered here for that chapter leads instead.
 * The book's photo opener (packages/one-sheet/editorial.js) uses the same rule.
 */
const openerPhotographs = { space: ['dragon-over-earth', 'aurora', 'milky-way'] }
export function openerPhoto(chapterId, id) {
  if (!id || photoFor(id)?.kind !== 'render') return id
  return (openerPhotographs[chapterId] ?? []).find((x) => photoFor(x)?.kind === 'photograph') ?? id
}

/** Section numbers as in the book: 8.1, 8.2 … Games are not numbered. */
export function sectionNumber(chapterId, section) {
  const n = chapterMeta(chapterId)?.n
  const numbered = chapterModules[chapterId]?.sections.filter((s) => s.kind !== 'game') ?? []
  const i = numbered.indexOf(section)
  return n && i >= 0 ? `${n}.${i + 1}` : ''
}

export function photoBlock(id, lang, base = './') {
  // Files, captions and credits come from photos.js; a slot without a photograph renders nothing.
  const photo = photoFor(id)
  if (!photo) return ''
  const alt = photoAlt[id]
  return `<figure class="chapter-figure chapter-photo" data-photo="${id}"><img src="${e(base + photoPath(id))}" alt="${e(alt ? say(alt, lang) : say(photo.caption, lang))}" loading="lazy" decoding="async"><figcaption>${e(say(photo.caption, lang))} <span class="credit">${e(photoCredit(id, lang))}</span></figcaption></figure>`
}

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const e = escapeHtml

export function chapterData(chapterId) {
  const chapter = chapterModules[chapterId]
  if (!chapter) throw new RangeError('No chapter content for ' + chapterId)
  return chapter
}

/** The language block of a section or opener, falling back to English if a draft is missing. */
export function textOf(item, lang) {
  const own = item.text[lang]
  return own ? { lang, t: own } : { lang: 'en', t: item.text.en }
}

export function chip(state, lang) {
  const label = evidenceLabels[state]
  if (!label) throw new RangeError('Unknown evidence state ' + state)
  return `<span class="chip chip-evidence" data-state="${state}">${e(say(label, lang))}</span>`
}

/** Escape a string, then turn [[ref]] into a numbered note and {{state}} into an evidence chip. */
export function inline(value, lang, chapter, prefix = 'ref') {
  return e(value)
    .replace(/\s*\[\[([\w-]+)\]\]/g, (_, id) => {
      const index = chapter.references.findIndex((ref) => ref.id === id)
      if (index < 0) throw new RangeError(`Unknown reference ${id} in ${chapter.id}`)
      return `<sup class="chapter-note"><a href="#${prefix}-${chapter.id}-${index + 1}">${index + 1}</a></sup>`
    })
    // Adjacent notes share one superscript, separated by commas: 13,14 rather than 1314.
    .replace(/<\/a><\/sup><sup class="chapter-note">/g, '</a>,')
    .replace(/\{\{([\w-]+)\}\}/g, (_, state) => chip(state, lang))
}

export function chapterFigure(id, lang) {
  const module = figureModules.find((m) => m.figureIds.includes(id))
  if (!module) throw new RangeError('No chapter figure ' + id)
  return { svg: module.figure(id, lang), text: module.figureText(id, lang) }
}

const paragraphs = (list, lang, chapter, cls = '') => (list ?? []).map((p) => `<p${cls ? ` class="${cls}"` : ''}>${inline(p, lang, chapter)}</p>`).join('')
const list = (items, lang, chapter, tag = 'ul', cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''}>${items.map((i) => `<li>${inline(i, lang, chapter)}</li>`).join('')}</${tag}>`

export function tryItBox(tryIt, lang, chapter) {
  if (!tryIt) return ''
  return `<aside class="chapter-box chapter-try"><h3>${say(ui.tryIt, lang)}</h3>${list(tryIt.steps, lang, chapter, 'ol')}${tryIt.lookFor ? `<p><strong>${say(ui.lookFor, lang)}:</strong> ${inline(tryIt.lookFor, lang, chapter)}</p>` : ''}</aside>`
}

export function grownUpsBox(items, lang, chapter) {
  if (!items?.length) return ''
  return `<aside class="chapter-box chapter-grownups"><h3>${say(ui.grownUps, lang)}</h3>${paragraphs(items, lang, chapter)}</aside>`
}

export function figureBlock(id, caption, lang, chapter, cls = '') {
  if (!id) return ''
  const { svg, text } = chapterFigure(id, lang)
  return `<figure class="chapter-figure${cls ? ' ' + cls : ''}"><div class="chapter-figure-frame stage-grid">${svg}</div>${caption ? `<figcaption>${inline(caption, lang, chapter)}</figcaption>` : `<figcaption class="sr-only">${e(text)}</figcaption>`}</figure>`
}

export function timelineList(entries, lang, chapter) {
  if (!entries?.length) return ''
  return `<ol class="chapter-dates">${entries.map((entry) => `<li><span class="chapter-when">${e(entry.when)}</span><span class="chapter-what">${inline(entry.what, lang, chapter)}</span></li>`).join('')}</ol>`
}

export function gameBox(t, section, lang, chapter) {
  const meta = chapterMeta(section.chapter)
  return `<dl class="chapter-game-facts"><div><dt>${say(ui.goal, lang)}</dt><dd>${inline(t.goal, lang, chapter)}</dd></div><div><dt>${say(ui.players, lang)}</dt><dd>${e(t.players)}</dd></div></dl>` +
    `<h3>${say(ui.need, lang)}</h3>${list(t.need, lang, chapter)}` +
    `<h3>${say(ui.setup, lang)}</h3>${list(t.setup, lang, chapter, 'ol', 'chapter-steps')}` +
    `<h3>${say(ui.play, lang)}</h3>${list(t.play, lang, chapter, 'ol', 'chapter-steps')}` +
    `<p class="chapter-score"><strong>${say(ui.score, lang)}:</strong> ${inline(t.score, lang, chapter)}</p>` +
    `<p class="chapter-teaches"><strong>${say(ui.teaches, lang)}:</strong> ${inline(t.teaches, lang, chapter)}</p>`
}

export function trimTable(t, lang, chapter) {
  if (!t.rows) return ''
  return `<div class="chapter-table-wrap"><table class="chapter-table"><thead><tr><th scope="col">${say(ui.see, lang)}</th><th scope="col">${say(ui.cause, lang)}</th><th scope="col">${say(ui.fix, lang)}</th></tr></thead><tbody>${t.rows.map((r) => `<tr><th scope="row">${e(r.see)}</th><td>${e(r.why)}</td><td>${e(r.fix)}</td></tr>`).join('')}</tbody></table>${t.rowsNote ? `<p class="chapter-small">${e(t.rowsNote)}</p>` : ''}</div>`
}

const formatValue = (value, lang) => (lang === 'en' ? String(value) : String(value).replace('.', ','))
const formatDate = (date, lang) => {
  const [y, m, d] = date.split('-').map(Number)
  if (!m) return String(y)
  const options = d ? { day: 'numeric', month: 'short', year: 'numeric' } : { month: 'short', year: 'numeric' }
  return new Intl.DateTimeFormat(lang, { ...options, timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d || 1))
}

export function recordsTable(kind, t, lang, chapter) {
  const unit = kind === 'distance' ? (lang === 'ru' ? 'м' : 'm') : lang === 'ru' ? 'с' : 's'
  const rows = records[kind].map((r) => `<tr${r.current ? ' class="is-current"' : ''}><td>${formatDate(r.date, lang)}</td><td class="chapter-num">${formatValue(r.value, lang)}&nbsp;${unit}${r.imperial ? `<span class="chapter-small"> (${e(r.imperial)})</span>` : ''}</td><td>${e(say(r.who, lang))}</td><td>${r.place ? e(say(r.place, lang)) : '—'}</td><td>${r.refs.map((id) => inline(`[[${id}]]`, lang, chapter)).join('')}</td></tr>`).join('')
  return `<div class="chapter-table-wrap"><table class="chapter-table chapter-records"><caption>${e(t.table[kind])}</caption><thead><tr><th scope="col">${e(t.table.date)}</th><th scope="col">${e(t.table.value)}</th><th scope="col">${e(t.table.who)}</th><th scope="col">${e(t.table.where)}</th><th scope="col">${e(t.table.source)}</th></tr></thead><tbody>${rows}<tr class="is-yours"><td colspan="5">${e(t.table.yours)}: ______</td></tr></tbody></table></div>`
}

export function recordSheet(record, lang) {
  const rows = record.rows.map((row) => `<tr><th scope="row">${e(row)}</th>${record.columns.slice(1).map(() => '<td></td>').join('')}</tr>`).join('')
  return `<div class="chapter-table-wrap"><table class="chapter-table chapter-log"><thead><tr>${record.columns.map((c) => `<th scope="col">${e(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`
}

export function logSheet(log) {
  const rows = Array.from({ length: log.rows }, (_, i) => `<tr><th scope="row">${i + 1}</th>${log.columns.slice(1).map(() => '<td></td>').join('')}</tr>`).join('')
  return `<div class="chapter-log-sheet"><p class="chapter-log-title">${e(log.title)}</p><dl class="chapter-log-fields">${log.fields.map((f) => `<div><dt>${e(f)}</dt><dd></dd></div>`).join('')}</dl><div class="chapter-table-wrap"><table class="chapter-table chapter-log"><thead><tr>${log.columns.map((c) => `<th scope="col">${e(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div><dl class="chapter-log-fields">${log.after.map((f) => `<div><dt>${e(f)}</dt><dd></dd></div>`).join('')}</dl><ol class="chapter-log-notes">${log.notes.map((note) => `<li>${e(note)}</li>`).join('')}</ol></div>`
}

function sectionBody(section, t, lang, chapter, base) {
  const parts = []
  if (section.photo) parts.push(photoBlock(section.photo, lang, base))
  if (t.lead) parts.push(`<p class="chapter-lead">${inline(t.lead, lang, chapter)}</p>`)
  if (section.kind === 'profile') parts.push(`<p class="chapter-role">${e(t.role)}</p><p class="chapter-why">${e(t.why)}</p>`)
  if (section.kind === 'experiment') {
    parts.push(`<p class="chapter-question">${e(t.question)}</p>`)
    parts.push(`<aside class="chapter-box chapter-grownups"><h3>${say(ui.why, lang)}</h3><p>${inline(t.why, lang, chapter)}</p></aside>`)
    parts.push(`<h3>${say(ui.need, lang)}</h3>${list(t.need, lang, chapter)}`)
    parts.push(`<h3>${say(ui.steps, lang)}</h3>${list(t.steps, lang, chapter, 'ol', 'chapter-steps')}`)
    parts.push(`<h3>${say(ui.record, lang)}</h3>${recordSheet(t.record, lang)}`)
    parts.push(`<p><strong>${say(ui.look, lang)}:</strong> ${inline(t.lookFor, lang, chapter)}</p>`)
    parts.push(`<p class="chapter-known"><strong>${say(ui.known, lang)}:</strong> ${inline(t.knownSoFar, lang, chapter)}</p>`)
    parts.push(`<p class="chapter-safety"><strong>${say(ui.safety, lang)}:</strong> ${e(t.safety)}</p>`)
    return parts.join('')
  }
  if (section.kind === 'game') {
    parts.push(gameBox(t, section, lang, chapter))
    parts.push(tryItBox(t.tryIt, lang, chapter))
    parts.push(grownUpsBox(t.grownUps, lang, chapter))
    const meta = chapterMeta(section.chapter), href = chapterHref(meta, lang, base)
    if (meta) parts.push(`<p class="chapter-after">${say(ui.after, lang)} ${href ? `<a href="${e(href)}">` : ''}${meta.n ? e(meta.n) + ' · ' : ''}${e(meta.title[lang])}${href ? '</a>' : ''}</p>`)
    return parts.join('')
  }
  if (section.figure && section.kind !== 'records') parts.push(figureBlock(section.figure, t.caption, lang, chapter))
  if (section.image) parts.push(`<figure class="chapter-figure chapter-image"><img src="${e(base + section.image.src)}" alt="" loading="lazy" decoding="async"><figcaption>${inline(t.caption, lang, chapter)}</figcaption></figure>`)
  parts.push(paragraphs(t.body, lang, chapter))
  parts.push(timelineList(t.timeline, lang, chapter))
  if (section.kind === 'records') {
    parts.push(figureBlock('records-distance', t.caption, lang, chapter, 'chapter-figure-wide'))
    parts.push(recordsTable('distance', t, lang, chapter))
    parts.push(figureBlock('records-time', t.captionTime, lang, chapter))
    parts.push(recordsTable('time', t, lang, chapter))
  }
  parts.push(trimTable(t, lang, chapter))
  if (t.log) parts.push(logSheet(t.log))
  if (section.kind === 'contest') {
    parts.push(`<div class="chapter-events">${t.events.map((ev) => `<section class="chapter-event"><h3>${e(ev.name)}</h3>${list(ev.rules, lang, chapter, 'ol')}</section>`).join('')}</div>`)
    parts.push(`<h3>${e(t.classroomTitle)}</h3>${list(t.classroom, lang, chapter)}`)
    parts.push(`<h3>${e(t.recordTitle)}</h3>${recordSheet({ columns: t.record, rows: ['', '', ''] }, lang)}`)
    parts.push(`<p class="chapter-safety"><strong>${say(ui.safety, lang)}:</strong> ${e(t.safety)}</p>`)
  }
  if (t.watch) parts.push(`<aside class="chapter-box chapter-watch"><h3>${e(t.watchTitle)}</h3><ul>${t.watch.map((item) => {
    const ref = chapter.references.find((r) => r.id === item.ref)
    return `<li><a href="${e(ref.url)}" rel="noopener">${e(item.label)}</a></li>`
  }).join('')}</ul>${t.portrait ? `<p class="chapter-small">${e(t.portrait)}</p>` : ''}</aside>`)
  parts.push(tryItBox(t.tryIt, lang, chapter))
  parts.push(grownUpsBox(t.grownUps, lang, chapter))
  return parts.join('')
}

export function referencesList(chapter, lang, prefix = 'ref') {
  return `<ol class="chapter-references">${chapter.references.map((ref, i) => `<li id="${prefix}-${chapter.id}-${i + 1}">${ref.url ? `<a href="${e(ref.url)}" rel="noopener">${e(ref.label)}</a>` : `${e(ref.label)} · ${say(ui.noLink, lang)}`}</li>`).join('')}</ol>`
}

/** The chapter page body for one language. `base` is the relative path to the site root. */
export function chapterBody(chapterId, lang, base = './') {
  const chapter = chapterData(chapterId)
  const meta = chapterMeta(chapterId)
  const opener = textOf(chapter.opener, lang)
  const sections = chapter.sections.map((section) => ({ section, ...textOf(section, lang) }))
  const toc = sections.map(({ section, t }) => `<li><a href="#${section.id}">${e(t.title)}</a></li>`).join('')
  const review = say(ui.review, lang)
  return `<article class="chapter" lang="${lang}" data-chapter="${chapterId}">
  <header class="chapter-head">
    <p class="eyebrow">${meta.n ? say(ui.chapter, lang) + ' ' + meta.n : say(ui.interlude, lang)}</p>
    <h1>${e(meta.title[lang])}</h1>
    <p class="chapter-standfirst">${e(meta.standfirst[lang])}</p>
    <p class="lede chapter-intro"${opener.lang !== lang ? ` lang="${opener.lang}"` : ''}>${inline(opener.t.intro, opener.lang, chapter)}</p>
    ${photoBlock(openerPhoto(chapterId, chapter.opener.photo), lang, base)}
    ${chapter.opener.figure ? figureBlock(chapter.opener.figure, opener.t.caption, opener.lang, chapter) : ''}
    <aside class="chapter-box chapter-grownups"><h2>${say(ui.grownUps, lang)}</h2><p>${inline(opener.t.grownUps, opener.lang, chapter)}</p></aside>
    <nav class="chapter-toc" aria-labelledby="toc-${chapterId}"><h2 id="toc-${chapterId}">${say(ui.contents, lang)}</h2><ol>${toc}</ol></nav>
  </header>
  ${sections.map(({ section, lang: l, t }) => `<section class="chapter-section chapter-${section.kind}" id="${section.id}" aria-labelledby="${section.id}-title"${l !== lang ? ` lang="${l}"` : ''}>
    <h2 id="${section.id}-title">${sectionNumber(chapterId, section) ? `<span class="chapter-section-no">${sectionNumber(chapterId, section)}</span> ` : ''}${e(t.title)}</h2>
    ${sectionBody(section, t, l, chapter, base)}
  </section>`).join('\n  ')}
  <footer class="chapter-foot">
    <h2>${say(ui.sources, lang)}</h2>
    ${referencesList(chapter, lang)}
    <p class="chapter-small">${say(ui.asOf, lang)} ${formatDate(chapter.asOf, lang)}.${review && chapter.review[lang] === 'needs-native-review' ? ' ' + review : ''}</p>
  </footer>
</article>`
}
