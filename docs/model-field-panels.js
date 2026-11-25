import { diagrams, instructions } from './assets/atlas/k2-lessons.js?v=3b57e65abbf7'
import { makePlane } from './assets/planes/core.js?v=3b57e65abbf7'
import { foldSvg } from './assets/planes/guide.js?v=3b57e65abbf7'
import { modelOrigin } from './model-origins.js?v=3b57e65abbf7'
import { escapeHtml as e } from './site-navigation.js?v=3b57e65abbf7'

const words = {
  en: [
    'Fold guide',
    'Previous step',
    'Next step',
    'In the wild',
    'Aircraft origins',
    'Design origins',
    'Explore the world map',
    'Model source',
    'What you need',
    'Try this flight test',
    'Build instructions',
    'Step',
  ],
  es: [
    'Guía de montaje',
    'Paso anterior',
    'Paso siguiente',
    'En la naturaleza',
    'Historia del avión',
    'Origen del diseño',
    'Explora el mapa del mundo',
    'Fuente del modelo',
    'Qué necesitas',
    'Prueba este experimento',
    'Instrucciones de montaje',
    'Paso',
  ],
  ru: [
    'Как собрать',
    'Предыдущий шаг',
    'Следующий шаг',
    'В природе',
    'История самолёта',
    'Откуда взялась модель',
    'Изучить карту мира',
    'Источник модели',
    'Что понадобится',
    'Проверь в полёте',
    'Инструкция по сборке',
    'Шаг',
  ],
}
const sources = {
  ring: [
    'The NASA/JPL classroom glider starts with a rectangle. The two corners become peaks behind the folded rim.',
    'El planeador de NASA/JPL parte de una hoja rectangular. Dos esquinas forman las puntas detrás del borde doblado.',
    'Для планера NASA/JPL берут прямоугольный лист. За сложенным ободом видны две вершины из уголков бумаги.',
  ],
  samara: [
    'Gregory Vogt’s NASA activity follows a winged maple seed. Look for the heavy seed at the base, where the paper model carries its clip.',
    'La actividad de Gregory Vogt para la NASA se inspira en la sámara del arce. Busca la semilla en la base, donde el modelo de papel lleva el clip.',
    'За основу опыта Грегори Фогта для NASA взята крылатка клёна. Найди тяжёлое семя у основания крыла. На бумажной модели там крепится скрепка.',
  ],
  tandem: [
    'Archibald Williams drew two pairs of wings in his 1918 book Things To Make. You can trace them in figure 128, model B.',
    'Archibald Williams dibujó dos pares de alas en su libro Things To Make de 1918. Búscalas en la figura 128, modelo B.',
    'В книге Things To Make 1918 года Арчибальд Уильямс нарисовал две пары крыльев. Найди их на рисунке 128, модель B.',
  ],
}
const icon = (base, id) =>
  '<svg class="bench-icon" aria-hidden="true"><use href="' + base + 'editor-art.svg#' + id + '"/></svg>'

export function fieldPanels(model, lang, base, studio, activity) {
  const { id, family } = model
  const t = words[lang]
  const butterfly = family === 'butterfly'
  const src = modelOrigin(id, lang)
  const plane = family === 'airplane' && makePlane({ model_id: id }, lang)
  const steps = butterfly
    ? instructions[lang].map((step, index) => ({ ...step, diagram: diagrams[id][index] }))
    : plane
      ? plane.steps.map((step) => ({
          title: step.title,
          action: step.instruction,
          diagram: foldSvg(plane, step),
        }))
      : activity.steps.map((action) => ({ action }))
  const lesson = `<section class="bench-panel fold-panel"><h2>${icon(base, 'fold')}${t[0]}</h2>
    <p class="lesson-materials"><strong class="materials-label">${t[8]}</strong> ${e(model.materials)}</p>
    ${activity ? '<img class="lesson-pattern" alt="" src="' + base + activity.illustration + '">' : ''}
    <ol class="lesson-steps">${steps
      .map(
        (step, i) => `<li>
      ${step.diagram ? '<div class="step-picture" aria-hidden="true">' + step.diagram + '</div>' : ''}
      <div><span class="step-number">${t[11]} ${i + 1} / ${steps.length}</span>
      ${step.title ? '<h3>' + e(step.title) + '</h3>' : ''}<p>${e(step.action)}</p>${step.check ? '<p class="step-check">' + e(step.check) + '</p>' : ''}</div>
    </li>`,
      )
      .join('')}</ol>
    <div class="step-buttons" hidden><button type="button" class="lesson-prev" aria-label="${t[1]}">${icon(base, 'prev')}</button>
    <button type="button" class="lesson-next">${t[2]}${icon(base, 'next')}</button></div>
    <details class="bench-disclosure"><summary>${t[9]}</summary><p>${e(model.experiment)}</p><p>${e(activity?.physics ?? model.shape)}</p>${activity ? '<p>' + e(activity.recovery) + '</p>' : ''}</details>
    <a class="text-link studio-link" data-model-studio href="${e(base + studio)}">${t[10]} ↗</a></section>`
  const photo = src?.illustration
  const figure = photo
    ? `<figure class="origin-photo"><img loading="lazy" src="${base}assets/${butterfly ? 'field-guide/' : 'origins/'}${e(photo.file)}" alt="${e(photo.caption)}"><figcaption><a href="${e(photo.url)}">${e(photo.credit)}</a></figcaption></figure>`
    : plane
      ? `<img class="origin-drawing" loading="lazy" src="${base}assets/planes/field/${id}.svg" alt="${e(plane.field.variant)}">`
      : id === 'samara'
        ? `<figure class="origin-photo"><img loading="lazy" src="${base}assets/objects/maple-keys.jpg" alt="Acer rubrum"><figcaption><a href="https://commons.wikimedia.org/wiki/File:Acer_rubrum_seed_keys.jpg">Dcrjsr</a> · <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a></figcaption></figure>`
        : `<img class="origin-drawing" loading="lazy" src="${base}${activity.illustration}" alt="${e(activity.title)}">`
  const title = src ? (butterfly ? t[3] : t[4]) : t[5]
  const field = `<section class="bench-panel origin-panel"><h2>${icon(base, butterfly ? 'leaf' : 'globe')}${title}</h2>
    ${figure}<h3>${e(src?.place ?? activity.source.label)}</h3>
    <p>${e(src?.story ?? sources[id][['en', 'es', 'ru'].indexOf(lang)])}</p>
    ${plane ? '<p><strong>' + e(plane.field.landmark) + '</strong> ' + e(plane.field.look) + '</p>' : ''}
    ${src ? '<details class="bench-disclosure origin-map"><summary>' + t[6] + '</summary><div data-map></div></details>' : ''}
    <a class="text-link" href="${e(src?.sources[0].url ?? activity.source.url)}">${e(src?.sources[0].label ?? t[7])} ↗</a></section>`
  return lesson + field
}
