// The markup of /print/: ready sets, design cards grouped by chapter and the sticky bar.
// Pure: the static build writes it into the three language pages, and print.js draws it
// itself when a page arrives without it (the development server).
import { chapters, chapterLabel, plates } from './book/catalog.js?v=efdc141e4945'
import { designName } from './print-guide-content.js?v=efdc141e4945'
import { counted, printCopy, printName } from './print-copy.js?v=efdc141e4945'
import { pageCount, pagesPerDesign, readySets, toolsFor } from './print-and-play.js?v=efdc141e4945'
import { specimenPath } from './model-appearance.js?v=efdc141e4945'
import { objects } from './assets/objects/activities.js?v=efdc141e4945'
import { escapeHtml as e, navHref, siteLabels } from './site-navigation.js?v=efdc141e4945'

const thumbnail = (plate) => plate.chapter === 'airplanes' ? 'assets/planes/' + plate.model + '.svg'
  : plate.chapter === 'butterflies' ? specimenPath(plate.model)
  : objects.find(item => item.id === plate.model).illustration

export const toolWords = (plate, lang, edge = 'cut') =>
  toolsFor(plate.id, edge).map(tool => printCopy.tools[tool][lang]).join(', ')

function designCard(plate, lang, base) {
  const name = designName(plate.id, lang)
  const pages = counted(pagesPerDesign(plate.id), lang, printCopy.pageOne, printCopy.pageMany, printCopy.pageMany5)
  return `<li><button class="design-card" type="button" aria-pressed="false" data-plate="${plate.id}">
      <img src="${base}${e(thumbnail(plate))}" alt="" width="160" height="100" loading="lazy" decoding="async">
      <span class="design-id">${plate.id}</span>
      <span class="design-name">${e(name)}</span>
      <span class="design-meta">${e(plate.kind[lang])}</span>
      <span class="design-meta">${e(pages)} · ${e(toolWords(plate, lang))}</span>
      <span class="design-state"><span aria-hidden="true">✓ </span>${printCopy.selected[lang]}</span>
    </button></li>`
}

function setCard(set, lang) {
  const pages = counted(pageCount(set.plates), lang, printCopy.pageOne, printCopy.pageMany, printCopy.pageMany5)
  return `<li><button class="set-card" type="button" aria-pressed="false" data-set="${set.id}">
      <span class="set-title">${e(set.title[lang])}</span>
      <span class="set-ids">${set.plates.join(' · ')}</span>
      <span class="set-summary">${e(set.summary[lang])}</span>
      <span class="set-meta" data-set-meta="${set.id}">${e(pages)}</span>
      <span class="design-state"><span aria-hidden="true">✓ </span>${printCopy.selected[lang]}</span>
    </button></li>`
}

export function printPageHtml(lang, base = './') {
  const t = key => printCopy[key][lang]
  const groups = chapters.filter(chapter => chapter.plates).map(chapter => `
      <section class="design-group" aria-labelledby="group-${chapter.id}">
        <h3 id="group-${chapter.id}">${e(chapterLabel(chapter, lang))}</h3>
        <ul class="design-grid">${plates.filter(plate => plate.chapter === chapter.id).map(plate => designCard(plate, lang, base)).join('')}</ul>
      </section>`).join('')
  return `<main class="wrap print-page" id="main" tabindex="-1">
    <div class="print-head">
      <h1 id="title">${e(printName[lang])}</h1>
      <p class="lede" id="lead">${e(t('lead'))}</p>
    </div>
    <div class="print-layout">
      <div class="print-choices">
        <section aria-labelledby="sets-title">
          <h2 id="sets-title">${e(t('sets'))}</h2>
          <ul class="set-list">${readySets.map(set => setCard(set, lang)).join('')}</ul>
          <noscript><p class="hint">${e(t('noscript'))}</p><ul>${readySets.map(set =>
            `<li><a href="${base}print/sets/${set.id}-a4-${lang}.pdf">${e(set.title[lang])} (A4)</a> · <a href="${base}print/sets/${set.id}-letter-${lang}.pdf">${e(set.title[lang])} (${e(printCopy.paperNames.US_LETTER[lang])})</a></li>`).join('')}</ul></noscript>
        </section>
        <section aria-labelledby="own-title">
          <h2 id="own-title">${e(t('own'))}</h2>
          <p class="hint">${e(t('ownHint'))}</p>
          ${groups}
        </section>
        <p class="print-reminder" id="reminder"><strong>${e(t('reminder'))}</strong></p>
        <p class="hint" id="untested">${e(t('untested'))}</p>
      </div>
      <aside class="print-bar" id="bar" aria-labelledby="bar-title">
        <h2 class="sr-only" id="bar-title">${e(t('chosen'))}</h2>
        <p class="bar-summary" id="summary" aria-live="polite">${e(t('empty'))}</p>
        <div class="bar-row">
          <label class="bar-paper" for="paper"><span>${e(t('paper'))}</span>
            <select id="paper"><option value="A4">${e(printCopy.paperNames.A4[lang])}</option><option value="US_LETTER">${e(printCopy.paperNames.US_LETTER[lang])}</option></select></label>
          <button class="button primary" id="get" type="button" aria-disabled="true">${e(t('get'))}</button>
        </div>
        <p class="hint bar-status" id="status" role="status"></p>
        <div class="bar-after" id="after" hidden>
          <p><strong>${e(t('afterTitle'))}</strong></p>
          <p>${e(t('afterBooklet'))} <a id="booklet" href="${base}book.html?lang=${lang}#m=">${e(t('booklet'))} →</a></p>
        </div>
      </aside>
    </div>
  </main>`
}

/** The page footer, the same three links as every product page. */
export const printFooterHtml = (lang, base = './') =>
  `<a class="brand" href="${e(navHref('home', lang, base))}">Open Flight</a>
    <a href="${e(navHref('library', lang, base))}">${e(siteLabels.library[lang])}</a>
    <a href="${e(navHref('references', lang, base))}">${e(siteLabels.references[lang])}</a>`
