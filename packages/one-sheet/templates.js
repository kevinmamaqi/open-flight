// One Sheet spread templates. Each takes (spread, ctx) and returns one or two
// <section class="page"> elements at 210 × 279 mm. Every box that holds text is a
// fixed-size slot marked data-slot; scripts/build_one_sheet.mjs fails if one overflows.
// OP, EX, PL, DA, XP and PR set real content. SQ, LN and AP, and any spread whose content
// is not written yet, render the flat-plan entry as a labelled planning dummy.
import { chapterById, chapters, plateById } from '../../apps/editor/book/catalog.js'
import { flightNotesFor } from '../../apps/editor/book/flight-notes.js'
import {
  chapterData, chapterFigure, escapeHtml as e, grownUpsBox, inline, logSheet, recordSheet, recordsTable,
  records, textOf, timelineList, trimTable, tryItBox, ui,
} from '../../apps/editor/book/render-chapter.js'
import { words } from './content.js'
import {
  chapterMark, chapterTitle as chapterHead, editorialTemplates, flightPath, isNight, openerRecto, page, photoFigure, pullFigure,
  sectionNumber,
} from './editorial.js'

const say = (entry, lang) => entry[lang] ?? entry.en
const sectionOf = (ref) => {
  const [chapterId, sectionId] = ref.split('#')
  const chapter = chapterData(chapterId)
  const section = chapter.sections.find((s) => s.id === sectionId)
  if (!section) throw new RangeError('No section ' + ref)
  return { chapter, section }
}
const figureSvg = (id, lang) => chapterFigure(id, lang).svg

/** Contents of one chapter, from the flat plan, with plate IDs and fixed page numbers. */
function chapterContents(chapterId, ctx) {
  const rows = ctx.plan.spreads.filter((s) => s.chapter === chapterId && s.template !== 'OP').map((s) => {
    let title = s.title ?? ''
    let no = ''
    if (s.content) {
      const { chapter, section } = sectionOf(s.content)
      title = textOf(section, ctx.lang).t.title
      no = sectionNumber(chapter, section)
    }
    if (s.plate) {
      const name = ctx.plateName(s.plate)
      title = s.template === 'PL' ? name : s.template === 'SQ' ? say(words.sequence, ctx.lang) : chapterId === 'butterflies' ? say(words.fieldNotes, ctx.lang) : say(words.lineage, ctx.lang)
    }
    return `<tr><td class="toc-id">${s.plate && s.template === 'PL' ? s.plate : no}</td><td>${e(title)}</td><td class="toc-page">${s.pages[0]}</td></tr>`
  })
  return `<table class="toc">${rows.join('')}</table>`
}

const templates = {
  OP(spread, ctx) {
    const { lang } = ctx
    const meta = chapterById(spread.chapter)
    if (!meta || !['how-it-flies', 'airplanes', 'contests', 'experiments'].includes(spread.chapter)) return templates.dummy(spread, ctx)
    const [v, r] = spread.pages
    let art, caption, intro, note
    if (spread.chapter === 'airplanes') {
      art = `<div class="opener-grid">${ctx.planeDrawings.map((svg) => `<div>${svg}</div>`).join('')}</div>`
      caption = say(words.openerDrawings, lang)
      intro = meta.standfirst[lang]
      note = say(words.airplanesNote, lang)
    } else {
      const chapter = chapterData(spread.chapter)
      const { t } = textOf(chapter.opener, lang)
      art = chapter.opener.figure ? `<div class="opener-figure">${figureSvg(chapter.opener.figure, lang)}</div>` : `<div class="photo-slot">${e(say(words.photoToCome, lang))}</div>`
      caption = t.caption
      intro = t.intro
      note = inline(t.grownUps, lang, chapter)
    }
    return page(v, `<div class="bleed stage"></div>${flightPath('verso')}<div class="opener-art">${art}<p class="caption opener-caption" data-slot="opener-caption">${e(caption)}</p></div>`, { cls: 'is-bleed opener', folio: false }) +
      openerRecto(r, { meta, lang, intro: e(intro), rows: chapterContents(spread.chapter, ctx), noteLabel: say(ui.grownUps, lang), note })
  },

  EX(spread, ctx) {
    if (!spread.content) return templates.dummy(spread, ctx)
    const { lang } = ctx
    const { chapter, section } = sectionOf(spread.content)
    const { t, lang: l } = textOf(section, lang)
    const [v, r] = spread.pages
    const head = chapterHead(spread.chapter, lang)
    const mark = chapterMark(spread.chapter)
    const night = isNight(spread.chapter) ? ' night' : ''
    const no = sectionNumber(chapter, section)
    const verso = `<div class="area grid12"><div class="notes" data-slot="notes">${pullFigure(t, l, chapter)}${grownUpsBox(t.grownUps, l, chapter)}</div><div class="main" data-slot="text">${no ? `<p class="section-no">${no}</p>` : ''}<h2 class="spread-title">${e(t.title)}</h2>${t.lead ? `<p class="standfirst">${inline(t.lead, l, chapter)}</p>` : ''}${(t.body ?? []).map((p) => `<p>${inline(p, l, chapter)}</p>`).join('')}${timelineList(t.timeline, l, chapter)}</div></div>`
    let figure = ''
    if (section.figure) figure = `<figure class="figure-band stage" data-slot="figure">${figureSvg(section.figure, l)}</figure>`
    else if (section.image) figure = `<figure class="figure-band" data-slot="figure"><img src="${ctx.asset(section.image.src)}" alt=""></figure>`
    else if (section.photo) figure = `<div class="figure-band photo-band" data-slot="figure">${photoFigure(section.photo, ctx)}</div>`
    const extra = t.log ? logSheet(t.log) : trimTable(t, l, chapter)
    const recto = `<div class="area">${figure}<div class="grid12 below"><div class="main" data-slot="boxes">${extra}${tryItBox(t.tryIt, l, chapter)}</div><div class="notes" data-slot="caption">${t.caption ? `<p class="caption">${inline(t.caption, l, chapter)}</p>` : ''}</div></div></div>`
    return page(v, verso, { head, mark, cls: 'ex' + night }) + page(r, recto, { head: t.title, mark, cls: 'ex' + night })
  },

  DA(spread, ctx) {
    if (spread.content !== 'contests#records') return spread.content ? templates.EX(spread, ctx) : templates.dummy(spread, ctx)
    const { lang } = ctx
    const { chapter, section } = sectionOf(spread.content)
    const { t, lang: l } = textOf(section, lang)
    const [v, r] = spread.pages
    const best = records.distance.find((x) => x.current)
    const pull = best ? `<figure class="pull pull-record"><p class="pull-figure"><span class="pull-num">${e(String(best.value).replace('.', lang === 'en' ? '.' : ','))}</span> <span class="pull-unit">${lang === 'ru' ? 'м' : 'm'}</span></p><figcaption>${e(say(best.who, lang))}${best.place ? ' · ' + e(say(best.place, lang)) : ''} · ${e(best.date.slice(0, 4))}</figcaption></figure>` : ''
    const verso = `<div class="area"><div data-slot="text" class="da-text"><div class="da-head"><h2 class="spread-title">${e(t.title)}</h2>${pull}</div><p class="standfirst">${inline(t.lead, l, chapter)}</p>${t.body.map((p) => `<p>${inline(p, l, chapter)}</p>`).join('')}</div><figure class="da-scale stage" data-slot="figure">${figureSvg('records-distance', l)}<figcaption class="caption">${inline(t.caption, l, chapter)}</figcaption></figure></div>`
    const recto = `<div class="area grid12"><div class="main" data-slot="tables"><figure class="stage da-time">${figureSvg('records-time', l)}</figure><p class="caption">${inline(t.captionTime, l, chapter)}</p>${recordsTable('distance', t, l, chapter)}${recordsTable('time', t, l, chapter)}</div><div class="notes" data-slot="notes">${tryItBox(t.tryIt, l, chapter)}${grownUpsBox(t.grownUps, l, chapter)}<div class="qr-box">${ctx.qr('https://openflight.design/contests/')}<p class="caption">${say(words.livePage, lang)} · openflight.design/contests</p></div></div></div>`
    const mark = chapterMark(spread.chapter)
    return page(v, verso, { head: chapterHead(spread.chapter, lang), mark, cls: 'da' }) + page(r, recto, { head: t.title, mark, cls: 'da' })
  },

  XP(spread, ctx) {
    if (!spread.content) return templates.dummy(spread, ctx)
    const { lang } = ctx
    const { chapter, section } = sectionOf(spread.content)
    const { t, lang: l } = textOf(section, lang)
    const [v, r] = spread.pages
    const head = chapterHead(spread.chapter, lang)
    const mark = chapterMark(spread.chapter)
    if (section.kind === 'contest') {
      const verso = `<div class="area"><div data-slot="text"><h2 class="spread-title">${e(t.title)}</h2><p class="standfirst">${inline(t.lead, l, chapter)}</p>${t.body.map((p) => `<p>${inline(p, l, chapter)}</p>`).join('')}${t.events.map((ev) => `<h3>${e(ev.name)}</h3><ol class="steps">${ev.rules.map((x) => `<li>${e(x)}</li>`).join('')}</ol>`).join('')}</div></div>`
      const recto = `<div class="area grid12"><div class="main" data-slot="sheet"><h3>${e(t.classroomTitle)}</h3><ul>${t.classroom.map((x) => `<li>${e(x)}</li>`).join('')}</ul><h3>${e(t.recordTitle)}</h3>${recordSheet({ columns: t.record, rows: ['', '', '', ''] }, l)}<p class="safety"><b>${say(ui.safety, lang)}:</b> ${e(t.safety)}</p></div><div class="notes" data-slot="notes">${grownUpsBox(t.grownUps, l, chapter)}</div></div>`
      return page(v, verso, { head, mark }) + page(r, recto, { head: t.title, mark })
    }
    const verso = `<div class="area grid12"><div class="notes" data-slot="notes"><aside class="notes-box grownups"><b>${say(ui.why, lang)}</b><p>${inline(t.why, l, chapter)}</p></aside></div><div class="main" data-slot="text"><p class="eyebrow">${e(t.title)}</p><h2 class="question">${e(t.question)}</h2><h3>${say(ui.need, lang)}</h3><ul>${t.need.map((x) => `<li>${e(x)}</li>`).join('')}</ul><h3>${say(ui.steps, lang)}</h3><ol class="steps">${t.steps.map((x) => `<li>${inline(x, l, chapter)}</li>`).join('')}</ol></div></div>`
    const recto = `<div class="area"><div class="photo-slot" data-slot="photo">${e(say(words.photoToCome, lang))}</div><div data-slot="record"><h3>${say(ui.record, lang)}</h3>${recordSheet(t.record, l)}<p><b>${say(ui.look, lang)}:</b> ${inline(t.lookFor, l, chapter)}</p><p><b>${say(ui.known, lang)}:</b> ${inline(t.knownSoFar, l, chapter)}</p><p class="safety"><b>${say(ui.safety, lang)}:</b> ${e(t.safety)}</p></div></div>`
    return page(v, verso, { head, mark }) + page(r, recto, { head: t.title, mark })
  },

  PR(spread, ctx) {
    if (!spread.content) return templates.dummy(spread, ctx)
    const { lang } = ctx
    const { chapter, section } = sectionOf(spread.content)
    const { t, lang: l } = textOf(section, lang)
    const [v, r] = spread.pages
    const verso = `<div class="area"><div class="pr-type" data-slot="name">${pullFigure(t, l, chapter).replace('class="pull', 'class="pull pull-hero')}<p class="eyebrow">${e(t.role)}</p><h2 class="chapter-title">${e(t.title)}</h2><p class="standfirst">${e(t.why)}</p><p class="caption">${e(t.portrait)}</p></div></div>`
    const recto = `<div class="area grid12"><div class="main" data-slot="text">${t.body.map((p) => `<p>${inline(p, l, chapter)}</p>`).join('')}</div><div class="notes" data-slot="notes"><aside class="notes-box watch"><b>${e(t.watchTitle)}</b>${t.watch.map((item) => `<p>${e(item.label)}</p>${ctx.qr(chapter.references.find((ref) => ref.id === item.ref).url)}`).join('')}</aside></div></div>`
    const mark = chapterMark(spread.chapter)
    return page(v, verso, { head: chapterHead(spread.chapter, lang), mark }) + page(r, recto, { head: t.title, mark })
  },

  PL(spread, ctx) {
    if (spread.plate !== 'A1') return templates.dummy(spread, ctx)
    const { lang } = ctx
    const plate = plateById('A1')
    const [v, r] = spread.pages
    const a1 = ctx.extras.plate
    const glance = a1?.glance?.length
      ? a1.glance.map((row) => [say(row.label, lang), say(row.value, lang) + (row.state ? ` {{${row.state}}}` : '')])
      : ctx.a1Glance()
    const rows = glance.map(([k, val]) => `<tr><th>${e(k)}</th><td>${inline(val, lang, { id: 'plate', references: [] })}</td></tr>`).join('')
    const legend = ['cut', 'valley', 'mountain'].map((k) => `<li>${ctx.legendLine(k)} ${say(words[k], lang)}</li>`).join('')
    const verso = `<p class="plate-id" aria-hidden="true">A1</p><div class="area"><div data-slot="plate-data"><p class="eyebrow">${say(words.plate, lang)} A1</p><h1 class="plate-name">${e(ctx.plateName('A1'))}</h1><p class="lineage">${e(plate.lineage[lang])}</p><p class="chips"><span class="chip">${e(plate.evidence[lang])}</span> <span class="chip">${e(plate.kind[lang])}</span></p><table class="data">${rows}</table>
      <figure class="pattern"><div class="pattern-crop" data-scaled="1:2">${ctx.a1Sheet}</div><figcaption class="caption">${e(say(words.patternCaption, lang))}${ctx.scaleBar(25, say(words.scaleHalf, lang))}<ul class="legend">${legend}</ul></figcaption></figure></div>
      <aside class="play" data-slot="play">${ctx.qr('https://openflight.design/airplanes/boeing-747/')}<div><b>${say(words.printPlay, lang)} · ${say(words.sheet, lang)} A1</b><p>${e(say(words.playText, lang))}</p></div></aside></div>`
    const notes = flightNotesFor('boeing-747', lang, 3)
    const lead = a1?.howItFlies?.[lang]?.lead
    // The balance-and-trim figure needs a spread of its own (pp. 62–63); the notes column carries the grown-up note.
    const grownUp = a1?.howItFlies?.[lang]?.grownUps?.[0]
    const recto = `<div class="bleed stage specimen-band"></div><div class="area"><figure class="specimen" data-slot="specimen">${ctx.a1Specimen}<figcaption class="caption"><b>A1 · ${e(ctx.plateName('A1'))}.</b> ${e(say(words.specimenCaption, lang))}</figcaption></figure>
      <div class="grid12 below"><div class="main" data-slot="flight"><h3>${say(words.howItFlies, lang)}</h3>${lead ? `<p>${e(lead)}</p>` : `<p class="slot-label">${e(say(words.slotPlate, lang))}</p>`}<h3>${say(words.launch, lang)}</h3><p>${e(notes.launch)}</p><h3>${say(words.trim, lang)}</h3><table class="trim-table">${notes.trim.map((row) => `<tr><th>${e(row.see)}</th><td>${e(row.fix)}</td></tr>`).join('')}</table><p class="caption">${e(notes.note)}</p></div>
      <div class="notes" data-slot="figure">${grownUp ? `<aside class="notes-box grownups"><b>${say(ui.grownUps, lang)}</b><p>${e(grownUp)}</p></aside>` : `<p class="slot-label">${e(say(words.slotFigure, lang))}</p>`}</div></div></div>`
    const mark = chapterMark('airplanes')
    return page(v, verso, { head: chapterHead('airplanes', lang), mark, cls: 'pl' }) + page(r, recto, { head: 'A1 · ' + ctx.plateName('A1'), mark, cls: 'pl is-bleed' })
  },

  /** The flat-plan entry, labelled, for a spread whose content is not written yet. */
  dummy(spread, ctx) {
    const { lang } = ctx
    const box = `<div class="area"><div class="dummy" data-slot="dummy"><p class="eyebrow">${say(words.planned, lang)} · ${spread.template}</p><h2 class="spread-title">${e(spread.title ?? (spread.plate ? spread.plate + ' · ' + ctx.plateName(spread.plate) : spread.id))}</h2>${spread.image ? `<p class="caption">${say(words.image, lang)}: ${e(spread.image)}</p>` : ''}</div></div>`
    return spread.pages.map((n) => page(n, box, { head: chapterHead(spread.chapter, lang), mark: chapterMark(spread.chapter) })).join('')
  },
}
for (const id of ['SQ', 'LN', 'AP']) templates[id] = templates.dummy
Object.assign(templates, editorialTemplates)

export const templateIds = ['OP', 'PL', 'SQ', 'EX', 'LN', 'PR', 'DA', 'XP', 'AP', 'COVER', 'BACK', 'TOC', 'PH', 'GM', 'IX']
export function renderSpread(spread, ctx) {
  const template = templates[spread.template]
  if (!template) throw new RangeError('Unknown template ' + spread.template)
  return `<div class="spread" data-spread="${spread.id}">${template(spread, ctx)}</div>`
}
export { chapters }
