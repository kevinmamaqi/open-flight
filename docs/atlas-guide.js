import { k3Facts } from './assets/atlas/k3-facts.js?v=cab232a23c6b'
import { appearanceArtPath } from './model-appearance.js?v=cab232a23c6b'
import { objects } from './assets/objects/activities.js?v=cab232a23c6b'
import { flightPhysics } from './atlas-physics.js?v=cab232a23c6b'
import { baselines } from './assets/atlas/baselines.js?v=cab232a23c6b'
import { planeCatalog } from './assets/planes/catalog.js?v=cab232a23c6b'

export const languages = ['en', 'es', 'ru']
export const words = (en, es, ru) => ({ en, es, ru })
const w = words
const shapes = {
  monarch: w(
    'Follow the orange forewing to its long tip. The black veins help you see its sweep.',
    'Sigue el ala naranja hasta la punta alargada. Las venas negras te ayudan a ver su forma.',
    'Проследи за чёрными жилками до вытянутого кончика оранжевого крыла.',
  ),
  morpho: w(
    'Trace the broad blue forewing and rounded hindwing. Both sides fold up from the narrow body.',
    'Recorre el ala delantera ancha y la trasera redondeada. Ambas se levantan desde el cuerpo estrecho.',
    'Обведи широкое синее переднее крыло и округлое заднее. Крылья поднимаются от узкого корпуса.',
  ),
  swallowtail: w(
    'Find the short tail on each hindwing. The adjustable tabs sit closer to the body.',
    'Busca la cola corta de cada ala trasera. Las aletas ajustables están más cerca del cuerpo.',
    'Найдите короткий хвостик на каждом заднем крыле. Регулируемые язычки расположены ближе к корпусу.',
  ),
}
const copy = {
  butterfly: w('Cut and fold', 'Recortar y plegar', 'Вырезать и сложить'),
  plane: w('Fold a whole sheet', 'Plegar una hoja entera', 'Сложить целый лист'),
  butterflyTools: w(
    '120 g/m² paper, scissors, ruler, two 33 mm clips and a glue stick',
    'Papel de 120 g/m², tijeras, regla, dos clips de 33 mm y pegamento de barra',
    'Бумага 120 г/м², ножницы, линейка, две скрепки по 33 мм и клей-карандаш',
  ),
  planeTools: w(
    'One rectangular sheet and a ruler. You can start with plain paper.',
    'Una hoja rectangular y una regla. Puedes usar papel sin imprimir.',
    'Прямоугольный лист и линейка. Подойдёт обычная бумага без рисунка.',
  ),
  span: w('Wingspan', 'Envergadura', 'Размах крыльев'),
  rootAngle: w(
    'Wing angle (V)',
    'Ángulo de las alas (V)',
    'Угол крыльев (V)',
  ),
  tab: w('Rear tab depth', 'Profundidad de la aleta de cola', 'Глубина заднего язычка'),
  tip: w('Wingtip height','Altura de las puntas','Высота кончиков'),
  clip: w(
    'Nose to rear of clip',
    'Del morro al extremo trasero del clip',
    'От носа до заднего конца скрепки',
  ),
  keel: w('Body fold depth', 'Profundidad del pliegue del fuselaje', 'Глубина сгиба корпуса'),
  winglet: w('Wingtip fold', 'Pliegue de la punta', 'Загиб законцовки'),
  wingTrial: w(
    'Start with both tabs level. Raise one tab a little on a second run. Which side receives more first landings?',
    'Empieza con las dos aletas de cola a ras. En la segunda serie sube un poco una sola. ¿En qué lado se concentran las primeras tomas de contacto?',
    'Сначала выровняй оба язычка. Для второй серии немного подними один. С какой стороны окажется больше первых касаний?',
  ),
}
export const designIds = [...Object.keys(baselines), ...planeCatalog.map((p) => p.model_id), ...objects.map(item => item.id)]
export function foldedLink(species, locale, settings = {}) {
  return './studio.html?' + new URLSearchParams({ construction: 'k1', species, lang: locale, ...settings })
}
export function studioLink(id, locale, flight = false) {
  const query = new URLSearchParams({ lang: locale })
  if (flight) query.set('view', 'flight')
  if (Object.hasOwn(baselines, id)) return './studio.html?' + query + '#design=butterfly-' + id + '&revision=w1'
  query.set('model', id)
  return './planes.html?' + query
}
export function fieldModel(id, locale = 'en') {
  const t = (x) => x[locale]
  const metrics = (entries) => entries.map(([key, value, unit]) => ({ label: t(copy[key]), value, unit }))
  if (Object.hasOwn(baselines, id)) {
    const b = baselines[id]
    return {
      id,
      name: t(b.names),
      inspiration: b.scientific,
      family: 'butterfly',
      technique: t(copy.butterfly),
      materials: t(copy.butterflyTools),
      shape: t(shapes[id]) + ' ' + flightPhysics(id, locale),
      experiment: t(copy.wingTrial),
      image: './' + appearanceArtPath(id+'-k3'),
      settings: metrics([
        ['span', k3Facts[id].span, 'mm'],
        ['rootAngle', k3Facts[id].angle, '°'],
        ['tip', k3Facts[id].tip, 'mm'],
      ]),
      studio: './costa.html?' + new URLSearchParams({species:id,lang:locale}),
    }
  }
  const activity = objects.find(item => item.id === id)
  if (activity) {
    const words = activity[locale]
    return {
      id, name: words.title, inspiration: activity.source.label, family: 'object',
      technique: words.verb, materials: words.materials, shape: words.physics, experiment: words.test,
      image: './' + activity.illustration, settings: [],
      studio: './flight-objects.html?' + new URLSearchParams({ model: id, lang: locale }),
    }
  }
  const p = planeCatalog.find((p) => p.model_id === id)
  if (!p) throw new RangeError('Unknown Open Flight design')
  return {
    id,
    name: t(p.name),
    inspiration: t(p.inspiration),
    family: 'airplane',
    technique: t(copy.plane),
    materials: t(copy.planeTools),
    shape: t(p.character) + '. ' + flightPhysics(id, locale),
    experiment: t(p.experiment),
    image: './assets/planes/' + id + '.svg',
    settings: metrics([
      ['keel', p.keel_mm, 'mm'],
      ['winglet', p.winglet_mm, 'mm'],
    ]),
    studio: studioLink(id, locale),
  }
}
const questions = {
  butterfly: w(
    'Do the two wing shapes leave different clusters of landing marks?',
    '¿Las dos formas de ala dejan grupos de marcas distintos?',
    'Различаются ли группы отметок у двух форм крыла?',
  ),
  airplane: w(
    'How often does each whole-sheet fold land inside the same broad gate?',
    '¿Cuántas veces cae cada avión dentro de la misma puerta ancha?',
    'Сколько раз каждый самолёт приземлится в одних и тех же широких воротах?',
  ),
  mixed: w(
    'How do a clipped butterfly and a folded airplane settle after the same gentle release?',
    '¿Cómo planean una mariposa con clip y un avión plegado cuando los sueltas igual de suave?',
    'Как планируют бабочка со скрепкой и бумажный самолёт при одинаковом мягком запуске?',
  ),
}
export function compareModels(left = 'monarch', right = 'morpho', locale = 'en') {
  if (!languages.includes(locale) || left === right)
    throw new RangeError('Choose a language and two distinct designs')
  const models = [fieldModel(left, locale), fieldModel(right, locale)]
  if (models.some(model => model.family === 'object')) {
    const question = w('How does each design move between release and first contact?',
      '¿Cómo se mueve cada modelo desde que lo sueltas hasta que toca el suelo?',
      'Как движется каждая модель от момента запуска до первого касания пола?')
    return { locale, models, question: question[locale] }
  }
  const kind = models[0].family === models[1].family ? models[0].family : 'mixed'
  return { locale, models, question: questions[kind][locale] }
}
