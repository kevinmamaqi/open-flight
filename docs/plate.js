// A design page is a plate of the book: what it is, how to print it, how it
// flies, how to make, launch and trim it, why it exists and one experiment.
// Rendered at build time; plate-page.js adds colours, paper and figure controls.
import { zoomMarkup, zoomWords } from './viewer-zoom.js?v=7988ca7cb2ce'
import { diagrams, instructions } from './assets/atlas/k3-lessons.js?v=7988ca7cb2ce'
import { makePlane } from './assets/planes/core.js?v=7988ca7cb2ce'
import { foldSvg } from './assets/planes/guide.js?v=7988ca7cb2ce'
import { flightObjects } from './assets/objects/activities.js?v=7988ca7cb2ce'
import { fieldModel, studioLink } from './atlas-guide.js?v=7988ca7cb2ce'
import { chapterById, plateFor, plateNeighbours } from './book/catalog.js?v=7988ca7cb2ce'
import { flightNoteLabels, flightNotesFor } from './book/flight-notes.js?v=7988ca7cb2ce'
import { plateContent, plateFigure } from './book/content.js?v=7988ca7cb2ce'
import { sheetIdFor, sheetPath } from './family-sheets.js?v=7988ca7cb2ce'
import { appearanceChoices, specimenPath } from './model-appearance.js?v=7988ca7cb2ce'
import { modelOrigin } from './model-origins.js?v=7988ca7cb2ce'
import { escapeHtml as e, publicPath } from './site-navigation.js?v=7988ca7cb2ce'
import { k3Facts } from './assets/atlas/k3-facts.js?v=7988ca7cb2ce'
import { plateWords } from './plate-words.js?v=7988ca7cb2ce'

export { plateWords }

const w = (en, es, ru) => ({ en, es, ru })
const t = (key, lang) => plateWords[key][lang]

export const familyOf = model => fieldModel(model).family
const objectActivity = (model, lang) => flightObjects(lang).activities.find(item => item.id === model)

/** The default print file for a design, relative to the site root. */
export function defaultPrintPath(model, paper, lang) {
  const activity = objectActivity(model, lang)
  if (activity) return flightObjects(lang).packets[paper] + '#page=' + activity.page
  return sheetPath(sheetIdFor(model), paper, lang)
}

function steps(model, lang) {
  const family = familyOf(model)
  if (family === 'butterfly')
    return instructions[lang].map((step, index) => ({ ...step, diagram: diagrams[model][index] }))
  if (family === 'airplane') {
    const plane = makePlane({ model_id: model }, lang)
    return plane.steps.map(step => ({ title: step.title, action: step.instruction, diagram: foldSvg(plane, step) }))
  }
  return objectActivity(model, lang).steps.map(action => ({ action }))
}

// The website shows design facts without testing-status labels: rows that only
// say nothing is recorded yet are left out, and "untested" endings are trimmed.
// The book and PDFs keep their evidence labels.
const untested = /untested|sin probar|не испытан/i
const plainValue = value => value.split(' · ').filter(part => !untested.test(part)).join(' · ')

function glanceRows(model, lang, content) {
  if (content?.glance?.length)
    return content.glance
      .filter(row => row.state !== 'not-yet-measured')
      .map(row => ({ label: row.label[lang], value: plainValue(row.value[lang]) }))
  const field = fieldModel(model, lang)
  const rows = [{ label: t('tools', lang), value: field.materials }]
  if (k3Facts[model]) rows.push({ label: t('span', lang), value: k3Facts[model].span + ' mm' })
  for (const setting of field.settings.slice(0, 2)) rows.push({ label: setting.label, value: setting.value + ' ' + setting.unit })
  return rows
}

const stateWords = {
  estimate: w('estimate', 'estimación', 'оценка'),
  'not-yet-measured': w('not yet measured', 'aún sin medir', 'ещё не измерено'),
  measured: w('measured', 'medido', 'измерено'),
  concept: w('concept', 'concepto', 'концепция'),
  render: w('render', 'render', 'рендер'),
  photograph: w('photograph', 'fotografía', 'фотография'),
}
export const evidenceChip = (state, lang) => state && stateWords[state]
  ? ' <span class="chip chip-evidence">' + e(stateWords[state][lang]) + '</span>' : ''

function figureBlock(model, lang, family) {
  const module = plateFigure(family)
  if (!module) return ''
  const controls = module.figureControls?.(model, lang) ?? []
  const svg = module.figure(model, lang)
  const text = module.figureText?.(model, lang) ?? ''
  const controlMarkup = controls.map(control => `<fieldset class="figure-control"><legend>${e(control.label)}</legend>
    <div class="segmented">${control.options.map((option, i) => `<button type="button" data-figure-control="${e(control.name)}" data-value="${e(String(option.value))}" aria-pressed="${i === 0}">${e(option.label)}</button>`).join('')}</div></fieldset>`).join('')
  return `<figure class="plate-figure stage-grid" data-plate-figure data-family="${family}">
      <div class="plate-figure-art" data-figure-art>${svg}</div>
      ${text ? '<figcaption class="sr-only" data-figure-text>' + e(text) + '</figcaption>' : ''}
    </figure>${controlMarkup ? '<div class="figure-controls">' + controlMarkup + '</div>' : ''}`
}

function whyBlock(model, lang, base, content) {
  const family = familyOf(model)
  const origin = modelOrigin(model, lang)
  const activity = objectActivity(model, lang)
  const photo = origin?.illustration
  const art = photo
    ? `<figure class="plate-origin"><img loading="lazy" src="${base}assets/${family === 'butterfly' ? 'field-guide/' : 'origins/'}${e(photo.file)}" alt="${e(photo.caption)}"><figcaption>${e(photo.caption)} · <a href="${e(photo.url)}">${e(photo.credit)}</a></figcaption></figure>`
    : family === 'airplane'
      ? `<figure class="plate-origin"><img loading="lazy" src="${base}assets/planes/field/${model}.svg" alt=""></figure>`
      : activity ? `<figure class="plate-origin"><img loading="lazy" src="${base}${activity.illustration}" alt=""></figure>` : ''
  const why = content?.why?.[lang]
  const title = why?.title ?? origin?.place ?? activity?.source.label ?? ''
  const body = why?.body ?? [origin?.story ?? activity?.physics ?? ''].filter(Boolean)
  const source = origin?.sources?.[0] ?? (activity ? { label: activity.source.label, url: activity.source.url } : null)
  return `<section class="plate-section plate-why" aria-labelledby="why-title">
    <h2 id="why-title">${t(family === 'butterfly' ? 'wild' : 'why', lang)}</h2>
    <div class="plate-why-grid">${art}<div>
      ${title ? '<h3>' + e(title) + '</h3>' : ''}${body.map(p => '<p>' + e(p) + '</p>').join('')}
      ${why?.borrows ? '<p class="plate-borrows">' + e(why.borrows) + '</p>' : ''}
      ${source ? '<p><a class="text-link" href="' + e(source.url) + '">' + e(source.label) + ' ↗</a></p>' : ''}
    </div></div>
  </section>`
}

function tryBlock(model, lang, base, content) {
  const field = fieldModel(model, lang)
  const trial = content?.tryThis?.[lang]
  const compare = base + 'compare.html?' + new URLSearchParams({ lang, left: model, right: model === 'morpho' ? 'monarch' : 'morpho' })
  const body = trial
    ? `<p class="plate-question">${e(trial.question)}</p>
      <p><strong>${t('predict', lang)}</strong> ${e(trial.prediction)}</p>
      <ol class="plate-try-steps">${trial.steps.map(step => '<li>' + e(step) + '</li>').join('')}</ol>
      <p><strong>${t('look', lang)}.</strong> ${e(trial.lookFor)}</p>`
    : `<p class="plate-question">${e(field.experiment)}</p>`
  return `<section class="plate-section plate-try" aria-labelledby="try-title">
    <h2 id="try-title">${t('try', lang)}</h2>${body}
    <p><a class="text-link" href="${e(compare)}">${t('compare', lang)} ↗</a></p>
  </section>`
}

function grownUpsBlock(model, lang, base, content) {
  const family = familyOf(model)
  const flies = content?.howItFlies?.[lang]
  const paragraphs = flies?.grownUps ?? []
  const lab = family === 'airplane' ? base + studioLink(model, lang).slice(2)
    : family === 'butterfly' ? base + 'costa.html?' + new URLSearchParams({ species: model, lang }) : null
  // The retired folds are history now: named here, no longer offered as builds.
  const earlier = family === 'butterfly' ? `<h3>${t('earlier', lang)}</h3><p>${t('earlierText', lang)}</p>` : ''
  const references = content?.references ?? []
  return `<details class="plate-section plate-grownups">
    <summary><h2>${t('grownUps', lang)}</h2></summary>
    ${paragraphs.map(p => '<p>' + e(p) + '</p>').join('')}
    ${lab ? '<p><a class="text-link" href="' + e(lab) + '">' + t('lab', lang) + ' ↗</a></p>' : ''}
    ${earlier}
    ${references.length ? '<h3>' + t('references', lang) + '</h3><ul class="plate-references">' + references.map(ref =>
      '<li><a href="' + e(ref.url) + '">' + e(ref.label) + '</a>' + (ref.note ? ' · ' + e(ref.note[lang]) : '') + '</li>').join('') + '</ul>' : ''}
  </details>`
}

/** The whole plate, without the page head, header or footer. */
export function plateMarkup(model, lang, base) {
  const plate = plateFor(model)
  if (!plate) throw new RangeError('No plate for ' + model)
  const chapter = chapterById(plate.chapter)
  const family = familyOf(model)
  const field = fieldModel(model, lang)
  const content = plateContent(plate.id)
  const choices = appearanceChoices(model, lang)
  const flight = content?.howItFlies?.[lang]
  const notes = flightNotesFor(model, lang)
  const { previous, next } = plateNeighbours(model)
  const title = field.name
  const pager = item => item ? `<a href="${e(base + publicPath(item.chapter + '/' + item.model, lang))}"><small>${item.id}</small> ${e(fieldModel(item.model, lang).name)}</a>` : '<span></span>'
  const print = base + defaultPrintPath(model, 'A4', lang)
  return `<article class="plate" data-plate-page="${e(model)}" data-plate-id="${plate.id}" data-family="${family}" data-base="${e(base)}">
  <header class="plate-head">
    <p class="eyebrow">${t('plate', lang)} ${plate.id} · <a href="${e(base + publicPath(chapter.route, lang))}">${t('chapter', lang)} ${chapter.n}</a></p>
    <h1>${e(title)}</h1>
    <p class="plate-lineage">${e(plate.lineage[lang])}</p>
    <p class="plate-badges"><span class="chip">${e(plate.kind[lang])}</span></p>
    <a class="button primary plate-quick-print" data-print href="${e(print)}">${t('print', lang)}</a>
  </header>
  <div class="plate-hero">
    <figure class="plate-specimen stage-grid"><img class="plate-poster" src="${e(base + specimenPath(model))}" alt="${e(title)}" fetchpriority="high"><div class="plate-model" data-plate-model hidden tabindex="0" aria-label="${e(title)} · ${t('turnLabel', lang)} ${e(zoomWords.hint[lang])}"></div><div class="plate-gizmo" data-gizmo hidden></div>${zoomMarkup(lang)}<span class="plate-turn-hint" aria-hidden="true" hidden><svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="12" rx="9" ry="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17.5 6.6l3 1.6-2.4 2.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>${t('turn', lang)}</span></figure>
    <section class="plate-print panel" aria-label="${t('print', lang)}">
      ${choices.length > 1 ? `<fieldset class="model-palette"><legend>${t('colors', lang)}</legend><div class="paint-grid">${choices.map(({ id, label, colors }, i) => `<button type="button" data-paint="${e(id)}" aria-pressed="${i === 0}"><span class="palette-chip" aria-hidden="true" style="background:linear-gradient(120deg,${colors[0]} 48%,${colors[1]} 48% 76%,${colors[2]} 76%)"></span>${e(label)}</button>`).join('')}</div></fieldset>` : ''}
      <label class="plate-paper">${t('paper', lang)}<select class="size"><option value="A4">A4</option><option value="US_LETTER">${t('letter', lang)}</option></select></label>
      <a class="button primary model-print" data-print href="${e(print)}">${t('print', lang)}</a>
      <p class="print-reminder" data-print-reminder></p>
      <p class="plate-add"><a class="text-link" data-add-print href="${e(base + publicPath('print', lang) + '#add=' + plate.id)}">+ ${t('add', lang)}</a></p>
      <span class="stage-status" role="status"></span>
      <details class="plate-glance-box">
        <summary><h2 class="plate-panel-title">${t('glance', lang)}</h2></summary>
        <dl class="plate-glance">${glanceRows(model, lang, content).map(row => '<div><dt>' + e(row.label) + '</dt><dd>' + e(row.value) + '</dd></div>').join('')}</dl>
      </details>
    </section>
  </div>
  <section class="plate-section plate-flight" aria-labelledby="flight-title">
    <h2 id="flight-title">${t(model === 'samara' ? 'spins' : 'flies', lang)}</h2>
    <div class="plate-flight-grid">
      <div class="plate-flight-figure">${figureBlock(model, lang, family)}</div>
      <div class="plate-flight-copy">
        <p class="lede">${e(flight?.lead ?? field.shape)}</p>
        ${(flight?.body ?? []).map(p => '<p>' + e(p) + '</p>').join('')}
      </div>
    </div>
  </section>
  <section class="plate-section plate-make" aria-labelledby="make-title">
    <h2 id="make-title">${t('make', lang)}</h2>
    <p class="lesson-materials"><strong>${t('need', lang)}</strong> ${e(field.materials)}</p>
    <ol class="plate-steps">${steps(model, lang).map((step, i, all) => `<li>
      ${step.diagram ? '<div class="step-picture" aria-hidden="true">' + step.diagram + '</div>' : ''}
      <div><span class="step-number">${t('step', lang)} ${i + 1} / ${all.length}</span>
      ${step.title ? '<h3>' + e(step.title) + '</h3>' : ''}<p>${e(step.action)}</p>${step.check ? '<p class="step-check">' + e(step.check) + '</p>' : ''}</div>
    </li>`).join('')}</ol>
  </section>
  <section class="plate-section plate-launch" aria-labelledby="launch-title">
    <div class="plate-launch-copy"><h2 id="launch-title">${flightNoteLabels.launch[lang]}</h2><p>${e(notes.launch)}</p></div>
    <div class="plate-trim"><h2>${flightNoteLabels.trim[lang]}</h2>
      <table class="trim-table"><thead><tr><th scope="col">${flightNoteLabels.see[lang]}</th><th scope="col">${flightNoteLabels.fix[lang]}</th></tr></thead>
      <tbody>${notes.trim.map(row => '<tr><th scope="row">' + e(row.see) + '</th><td>' + e(row.fix) + '</td></tr>').join('')}</tbody></table>
      <p class="hint">${e(notes.note)}</p></div>
  </section>
  ${whyBlock(model, lang, base, content)}
  ${tryBlock(model, lang, base, content)}
  ${grownUpsBlock(model, lang, base, content)}
  <nav class="plate-pager" aria-label="${t('plates', lang)}">${pager(previous)}${pager(next)}</nav>
</article>`
}
