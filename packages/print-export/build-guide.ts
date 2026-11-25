import { readFileSync } from 'node:fs'
import type { GuideEntry } from '../product-core/content.ts'
import { workshopModels, wingtipHeight, type WorkshopParameters } from '../geometry/workshop.ts'
import type { Paper, Locale } from './sheets.ts'
import { documentCss } from '../../apps/editor/assets/brand/print.js'

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
    tipHeight: 'Target height at each outer tip',
    buildNote:
      'Optional build note: write down which steps needed help and the two tip heights you measured.',
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
    tipHeight: 'Высота края каждого крыла',
    buildNote:
      'По желанию запиши, на каких шагах понадобилась помощь и какой получилась высота с каждой стороны.',
  },
  es: {
    title: 'Guía ilustrada',
    span: 'Envergadura en plano',
    left: 'Aleta izquierda',
    right: 'Aleta derecha',
    paint: 'Colores',
    up: 'arriba',
    down: 'abajo',
    flat: 'plana',
    palette: {
      natural: 'Colores naturales',
      carnival: 'Carnaval',
      twilight: 'Atardecer',
      coloring: 'Para colorear',
    },
    look: 'Mira desde la cola hacia la punta.',
    page2: 'Coloca el clip, ajusta y planea',
    question: 'Experimento de vuelo',
    mm: 'mm',
    reference: 'En la naturaleza',
    model: 'Patrón',
    source: 'Archivo fuente',
    photo: 'Foto',
    folds: 'Pasos de montaje',
    tipHeight: 'Altura de cada extremo',
    buildNote: 'Si quieres, anota en qué pasos necesitaste ayuda y cuánto medía cada extremo.',
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
  const modelSpec = workshopModels.find((item) => item.species === entry.id)!
  const height = Math.round(wingtipHeight(modelSpec, p.span_mm))
  const steps = guide.steps.map(
    (step, i) => `<section class="step"><span class="number">${i + 1}</span>
    <div><h3>${escape(step.title)}</h3><p>${escape(step.body)}</p>${step.id === 'fold' ? `<p><strong>${t.tipHeight} · ≈ ${height} ${t.mm}</strong></p>` : ''}</div>
    <img src="${embedded(step.diagram)}" alt=""></section>`,
  )
  const photo = entry.photo.local_path
    ? `<img class="photo" src="${embedded(entry.photo.local_path)}" alt="${escape(guide.photo_alt)}">`
    : ''
  const title = escape(guide.common_name),
    model = escape(revision.ref.design_id) + ' / ' + escape(revision.ref.revision_id)
  return `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · ${t.title} · Open Flight</title><style>
${documentCss({ paper })}
</style><article><header><b>Open Flight</b><span>${t.title} · 1 / 2</span></header>
<h1>${title}</h1><p><i>${escape(entry.scientific_name)}</i></p><dl>${settings}</dl><p>${t.look}</p>
<h2>${t.folds}</h2>${steps.slice(0, 3).join('')}
<div class="nature">${photo}<div><h3>${t.reference}</h3><p>${escape(guide.observation)}</p><small>${t.photo} · <a href="${escape(entry.photo.url)}">${escape(entry.photo.creator)} · Pixabay</a></small></div></div>
<footer>${t.model} · ${model}</footer></article>
<article><header><b>Open Flight · ${title}</b><span>${t.title} · 2 / 2</span></header><h2>${t.page2}</h2>
${steps.slice(3).join('')}<h2>${t.question}</h2><p>${escape(guide.flight_question)}</p><p>${t.buildNote}</p>
<footer><a href="${escape(entry.trim_reference.url)}">${escape(entry.trim_reference.source)}</a> · <a href="${escape(entry.natural_history.url)}">${escape(entry.natural_history.source)}</a><br>${t.model} · ${model}<br>${t.source} SHA-256 · ${escape(revision.ref.source_sha256)}</footer></article></html>`
}
