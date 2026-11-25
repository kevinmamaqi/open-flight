// Plate B1, Monarch. Spanish and Russian need a native read before release.
import { butterflyFlight, butterflyGlance, butterflyReferences, w } from './B-shared.js?v=827c6a6b1e8f'

export default {
  id: 'B1', model: 'monarch',
  glance: butterflyGlance('monarch'),
  howItFlies: butterflyFlight('monarch'),
  why: {
    en: { title: 'A long-distance glider',
      body: ['Monarchs are long-distance fliers. Each autumn, many monarchs from eastern North America travel thousands of kilometres to fir forests in central Mexico. Their caterpillars eat milkweed.',
        'On the way they often stop flapping and glide or soar on rising warm air, which saves energy. Researchers in Ontario found that soaring was their main way of flying in good weather.'],
      borrows: 'Our paper monarch borrows the long forewings of a migrant.' },
    es: { title: 'Una planeadora de largas distancias',
      body: ['Las monarcas vuelan muy lejos. Cada otoño, muchas monarcas del este de Norteamérica recorren miles de kilómetros hasta los bosques de oyamel del centro de México. Sus orugas comen algodoncillo.',
        'Por el camino, a menudo dejan de aletear y planean o se elevan en corrientes de aire caliente, y así ahorran energía. Unos investigadores de Ontario vieron que, con buen tiempo, ese vuelo planeado era su forma principal de volar.'],
      borrows: 'Nuestra monarca de papel toma prestadas las alas delanteras largas de una viajera.' },
    ru: { title: 'Планер дальних перелётов',
      body: ['Монархи летают на огромные расстояния. Каждую осень многие монархи с востока Северной Америки пролетают тысячи километров до пихтовых лесов центральной Мексики. Их гусеницы едят ваточник.',
        'По пути бабочки часто перестают махать крыльями и планируют или парят в тёплых восходящих потоках, экономя силы. Исследователи в Онтарио заметили, что в хорошую погоду парение у них — главный способ полёта.'],
      borrows: 'Наш бумажный монарх позаимствовал длинные передние крылья у путешественницы.' },
  },
  tryThis: {
    en: { question: 'Does a bigger butterfly glide farther?', prediction: 'Which one lands farther: the 148 mm or the 184 mm monarch? Our model says the big one bends about twice as much at the tip.',
      steps: ['Print two monarchs on the same paper: one at 148 mm and one at 184 mm.', 'Balance both on their dots.', 'Launch each five times from the same spot, with the same smooth push.', 'Mark every first touchdown, even the bad ones.'],
      lookFor: 'Which marks cluster farther away, and whether the big wings flap or droop.' },
    es: { question: '¿Una mariposa más grande planea más lejos?', prediction: '¿Cuál llega más lejos: la monarca de 148 mm o la de 184 mm? Nuestro modelo dice que la grande se dobla en la punta unas dos veces más.',
      steps: ['Imprime dos monarcas en el mismo papel: una de 148 mm y otra de 184 mm.', 'Equilibra las dos sobre sus puntos.', 'Lanza cada una cinco veces desde el mismo sitio, con el mismo empujón suave.', 'Marca cada primer contacto con el suelo, también los malos.'],
      lookFor: 'Qué marcas quedan más lejos y si las alas grandes aletean o se caen.' },
    ru: { question: 'Большая бабочка планирует дальше?', prediction: 'Какая улетит дальше: монарх размахом 148 мм или 184 мм? По нашей модели кончики большой гнутся примерно вдвое сильнее.',
      steps: ['Распечатайте двух монархов на одной бумаге: размахом 148 мм и 184 мм.', 'Уравновесьте обоих на точках.', 'Запустите каждого пять раз с одного места одинаковым плавным толчком.', 'Отмечайте каждое первое касание пола, даже неудачное.'],
      lookFor: 'Чьи отметки ложатся дальше и не хлопают ли и не провисают ли большие крылья.' },
  },
  references: [
    { label: 'U.S. Fish & Wildlife Service, Monarch (Danaus plexippus)', url: 'https://www.fws.gov/species/monarch-danaus-plexippus', note: w('Migration and life cycle. US government text: paraphrased, linked.', 'Migración y ciclo de vida. Texto del gobierno de EE. UU.: parafraseado y enlazado.', 'Миграция и жизненный цикл. Текст правительства США: пересказ со ссылкой.') },
    { label: 'CONABIO, La travesía de la monarca', url: 'https://biomx.biodiversidad.gob.mx/especies/espPrioritaria/monarca/travesia', note: w('The route to the wintering forests. Linked and paraphrased.', 'La ruta hasta los bosques de invernada. Enlazado y parafraseado.', 'Путь к местам зимовки. Ссылка и пересказ.') },
    { label: 'Gibo, D. L. & Pallett, M. J. (1979). Soaring flight of monarch butterflies during the late summer migration in southern Ontario. Can. J. Zool. 57: 1393–1401', url: 'https://doi.org/10.1139/z79-180', note: w('Soaring as the main flight mode in good weather. Cited only; no figures reused.', 'El vuelo planeado como forma principal con buen tiempo. Solo citado; no se reutilizan figuras.', 'Парение как основной способ полёта в хорошую погоду. Только цитата, без рисунков.') },
    ...butterflyReferences,
  ],
}
