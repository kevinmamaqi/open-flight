import { readFileSync } from 'node:fs'
import type { GuideEntry } from '../product-core/content.ts'
import type { WorkshopParameters } from '../geometry/workshop-models.ts'
import type { Paper, Locale } from './sheets.ts'

const words = {
  en: {
    title: 'Picture guide',
    span: 'Flat wingspan',
    left: 'Left tab',
    right: 'Right tab',
    paint: 'Colors',
    up: 'up',
    down: 'down',
    flat: 'flat',
    palette: {
      natural: 'Field colors',
      carnival: 'Carnival',
      twilight: 'Twilight',
      coloring: 'Color your own',
    },
    look: 'Look from behind the tail toward the nose.',
    page2: 'Fold, tune and try',
    question: 'Flight experiment',
    mm: 'mm',
    reference: 'In the wild',
    model: 'Template',
    source: 'Source',
    photo: 'Photo',
    folds: 'Build steps',
  },
  ru: {
    title: 'Инструкция с рисунками',
    span: 'Размах развёртки',
    left: 'Левый язычок',
    right: 'Правый язычок',
    paint: 'Цвета',
    up: 'вверх',
    down: 'вниз',
    flat: 'ровно',
    palette: {
      natural: 'Окрас бабочки',
      carnival: 'Карнавал',
      twilight: 'Сумерки',
      coloring: 'Раскрась сам',
    },
    look: 'Смотри от хвоста к носу.',
    page2: 'Сложи, настрой и запусти',
    question: 'Опыт с полётом',
    mm: 'мм',
    reference: 'В природе',
    model: 'Шаблон',
    source: 'Исходник',
    photo: 'Фото',
    folds: 'Шаги сборки',
  },
}
const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

function embedded(path: string) {
  const match = /^\/assets\/field-guide\/([a-z0-9-]+\.(svg|jpg))$/.exec(path)
  if (!match) throw Error('Unknown field-guide illustration')
  const bytes = readFileSync(
    new URL('../../apps/editor/assets/field-guide/' + match[1], import.meta.url),
  )
  return (
    'data:' +
    (match[2] === 'svg' ? 'image/svg+xml' : 'image/jpeg') +
    ';base64,' +
    bytes.toString('base64')
  )
}

type Revision = {
  ref: { design_id: string; revision_id: string; source_sha256: string }
  parameters: WorkshopParameters
  appearance_id: string
}

export function pictureGuide(entry: GuideEntry, revision: Revision, paper: Paper, locale: Locale) {
  const guide = entry[locale],
    t = words[locale]
  const angle = (n: number) =>
    n === 0 ? '0° · ' + t.flat : Math.abs(n) + '° ' + (n > 0 ? t.up : t.down)
  const p = revision.parameters
  const palette = t.palette[revision.appearance_id as keyof typeof t.palette] ?? revision.appearance_id
  const setting = (label: string, value: string) =>
    '<div><dt>' + label + '</dt><dd>' + escape(value) + '</dd></div>'
  const settings = [
    setting(t.span, p.span_mm + ' ' + t.mm),
    setting(t.left, angle(p.left_trim_deg)),
    setting(t.right, angle(p.right_trim_deg)),
    setting(t.paint, palette),
  ].join('')
  const steps = guide.steps.map(
    (step, i) => `<section class="step"><span class="number">${i + 1}</span>
    <div><h3>${escape(step.title)}</h3><p>${escape(step.body)}</p></div>
    <img src="${embedded(step.diagram)}" alt=""></section>`,
  )
  const photo = entry.photo.local_path
    ? `<img class="photo" src="${embedded(entry.photo.local_path)}" alt="${escape(guide.photo_alt)}">`
    : ''
  const title = escape(guide.common_name),
    model = escape(revision.ref.design_id) + ' / ' + escape(revision.ref.revision_id)
  return `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · ${t.title} · Open Flight</title><style>
@page{size:${paper === 'A4' ? 'A4' : 'Letter'};margin:13mm}*{box-sizing:border-box}
body{background:#f2eee7;color:#29233a;font:16px/1.45 system-ui,sans-serif;margin:0}
article{max-width:780px;margin:20px auto;padding:32px 38px;background:white;border-radius:16px}
header{display:flex;align-items:center;justify-content:space-between;font-size:.8em;font-weight:700;color:#5e456d;border-bottom:2px solid #604479;padding-bottom:8px}
h1{font-size:2.5em;margin:14px 0 0;line-height:1.04}h2{font-size:1.45em;margin:17px 0 8px}h3{font-size:1.05em;margin:0}p{margin:4px 0 9px}
dl{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #bfb3c6;border-radius:9px;padding:10px 12px;margin:14px 0 4px;gap:9px}
dt{font-size:.75em}dd{font-size:1em;font-weight:700;margin:0}.step{display:grid;grid-template-columns:28px 1fr 34%;gap:11px;align-items:center;padding:10px 0;border-bottom:1px solid #dfd9e3;break-inside:avoid}
.number{display:grid;place-items:center;border:1px solid #7c5791;border-radius:50%;width:26px;height:26px;font-weight:700;color:#603979}.step img{display:block;width:100%;height:83px;object-fit:contain}
.nature{display:flex;align-items:center;gap:15px;margin-top:16px}.photo{width:28%;height:95px;border-radius:8px;object-fit:cover}
footer{font-size:.74em;color:#50485b;margin-top:11px;overflow-wrap:anywhere} a{color:#543474}
@media(max-width:540px){article{padding:16px;margin:8px}dl{grid-template-columns:1fr 1fr}.step{grid-template-columns:25px 1fr}.step img{grid-column:2}.nature{align-items:flex-start}}
@media print{body{background:white;font-size:10.5pt}article{max-width:none;margin:0;padding:0;break-after:page}article:last-of-type{break-after:auto}.step{padding:3.5mm 0}.step img{height:24mm}.nature img{height:24mm}h1{font-size:26pt}}
</style><article><header><b>Open Flight</b><span>${t.title} · 1 / 2</span></header>
<h1>${title}</h1><p><i>${escape(entry.scientific_name)}</i></p><dl>${settings}</dl><p>${t.look}</p>
<h2>${t.folds}</h2>${steps.slice(0, 3).join('')}
<div class="nature">${photo}<div><h3>${t.reference}</h3><p>${escape(guide.observation)}</p><small>${t.photo} · <a href="${escape(entry.photo.url)}">${escape(entry.photo.creator)} · Pixabay</a></small></div></div>
<footer>${t.model} · ${model}</footer></article>
<article><header><b>Open Flight · ${title}</b><span>${t.title} · 2 / 2</span></header><h2>${t.page2}</h2>
${steps.slice(3).join('')}<h2>${t.question}</h2><p>${escape(guide.flight_question)}</p>
<footer><a href="${escape(entry.trim_reference.url)}">${escape(entry.trim_reference.source)}</a> · <a href="${escape(entry.natural_history.url)}">${escape(entry.natural_history.source)}</a><br>${t.model} · ${model}<br>${t.source} SHA-256 · ${escape(revision.ref.source_sha256)}</footer></article></html>`
}
