import { originCountryName } from './heritage.js?v=827c6a6b1e8f'

const local = (en, ru, es) => ({ en, ru, es })

export const planeCatalog = [
  {
    model_id: 'boeing-747',
    name: local('Upper Deck', 'Две палубы', 'Dos pisos'),
    inspiration: local('Boeing 747', 'Boeing 747', 'Boeing 747'),
    origin: originCountryName('boeing-747'),
    character: local(
      'Pleated nose · broad wings',
      'Нос со складкой · широкие крылья',
      'Punta escalonada · alas anchas',
    ),
    history: local(
      'Look at the raised upper deck on the Museum of Flight’s first 747. Two overlapping nose folds give this paper model a small raised step you can feel.',
      'Посмотрите на верхнюю палубу первого Boeing 747 в Музее авиации Сиэтла. Две встречные складки образуют на носу бумажной модели ступеньку, которую можно нащупать.',
      'Busca el piso superior elevado del primer 747 en el Museo del Vuelo de Seattle. Sus dos dobleces superpuestos dejan un escalón en la punta del avión de papel que puedes tocar.',
    ),
    experiment: local(
      'Make a second copy with a deeper body fold. Predict first: will its balance point move? Balance both on a pencil to check. Then launch each five times from the same height. Mark where each first touches the floor, and whether it glided, dived or stalled.',
      'Сделайте второй самолёт с более глубоким сгибом корпуса. Сначала предскажите: сдвинется ли точка равновесия? Проверьте оба самолёта на карандаше. Затем запустите каждый по пять раз с одной высоты. Отметьте, где каждый впервые коснулся пола и планировал он, пикировал или сваливался.',
      'Haz otra copia con un doblez del cuerpo más profundo. Predice primero: ¿se moverá el punto de equilibrio? Equilibra las dos sobre un lápiz para comprobarlo. Después lanza cada una cinco veces desde la misma altura. Marca dónde toca el suelo cada una por primera vez y si planeó, cayó en picado o se desplomó.',
    ),
    reference: {
      label: 'The Museum of Flight • Boeing 747-121',
      url: 'https://www.museumofflight.org/exhibits-and-events/aircraft/boeing-747-121',
    },
    field: {
      step: 3,
      variant: 'Boeing 747-121',
      landmark: local('Raised upper deck', 'Верхняя палуба', 'Piso superior elevado'),
      look: local(
        'The short raised deck sits behind the cockpit.',
        'Короткая верхняя палуба сразу за кабиной.',
        'El piso superior corto queda detrás de la cabina.',
      ),
      fold: local(
        'Fold 4 · Lift the loose tip back toward the nose to make the step.',
        'Сгиб 4 · Отогните свободный кончик к носу, чтобы получилась ступенька.',
        'Doblez 4 · Vuelve a doblar la punta suelta hacia delante para formar el escalón.',
      ),
      finish: local(
        'Look from the side for the two layers at the nose. The stepped bands repeat the idea in color.',
        'Сбоку видны два слоя на носу. Цветные полосы повторяют форму ступеньки.',
        'Mira la punta de lado y busca las dos capas. Las franjas escalonadas repiten esa forma.',
      ),
    },
    keel_mm: 20,
    winglet_mm: 6,
    code: '747',
    colors: ['#e25c32', '#095572', '#f4b550'],
    motif: 'steps',
  },
  {
    model_id: 'douglas-dc3',
    name: local('Prairie Skipper', 'Луговой планёр', 'Planeador de la pradera'),
    inspiration: local('Douglas DC-3', 'Douglas DC-3', 'Douglas DC-3'),
    origin: originCountryName('douglas-dc3'),
    character: local(
      'Rolled leading edge · wide nose',
      'Двойной подгиб · широкий нос',
      'Doble borde delantero · punta ancha',
    ),
    history: local(
      'The Smithsonian’s DC-3 carried passengers on two propeller engines. Look for its long, slender metal wings. The paper version is the opposite: a short, broad wing with the front edge rolled twice.',
      'У пассажирского DC-3 из коллекции Смитсоновского института два винтовых двигателя. Найдите длинные узкие металлические крылья. У бумажной версии всё наоборот: короткое широкое крыло с дважды подогнутой передней кромкой.',
      'El DC-3 del Smithsonian llevaba pasajeros y tenía dos motores de hélice. Fíjate en sus alas de metal, largas y estrechas. En papel es al revés: un ala corta y ancha con el borde delantero doblado dos veces.',
    ),
    experiment: local(
      'Open the wings into a very shallow V. Compare five gentle launches with five from a copy with taller turned-up tips. Count how often each lands wings-level.',
      'Раскройте крылья неглубокой буквой V. Сделайте пять мягких запусков, затем ещё пять с копией с более высокими законцовками. Посчитайте, сколько раз каждая модель приземлилась ровно.',
      'Abre las alas en una V poco profunda. Compara cinco lanzamientos suaves con cinco de una copia con los extremos de las alas más altos. Cuenta cuántas veces aterriza cada uno con las alas a nivel.',
    ),
    reference: {
      label: 'Smithsonian • Douglas DC-3',
      url: 'https://www.si.edu/object/nasm_A19530075000',
    },
    field: {
      step: 3,
      variant: 'Douglas DC-3',
      landmark: local(
        'Long wing and twin propellers',
        'Длинное крыло и два винта',
        'Ala larga y dos hélices',
      ),
      look: local(
        'The long metal wing carries an engine and propeller on each side.',
        'На длинном крыле по одному винтовому двигателю с каждой стороны.',
        'El ala larga de metal lleva un motor con hélice a cada lado.',
      ),
      fold: local(
        'Folds 2–4 · Roll the front edge twice and fold in its corners.',
        'Сгибы 2–4 · Дважды подогните передний край и загните его углы.',
        'Dobleces 2–4 · Dobla dos veces el borde delantero y lleva las esquinas hacia dentro.',
      ),
      finish: local(
        'Pinch the double edge and look for the broad outline and fan-shaped stripes.',
        'Нащупайте двойной край, затем найдите широкий контур и полосы веером.',
        'Toca el borde doble y busca la forma ancha y las franjas en abanico.',
      ),
    },
    keel_mm: 16,
    winglet_mm: 8,
    code: 'DC·3',
    colors: ['#168569', '#ea9c1c', '#20657e'],
    motif: 'rays',
  },
  {
    model_id: 'tupolev-tu144',
    name: local('Delta Comet', 'Дельта-комета', 'Cometa delta'),
    inspiration: local('Tupolev Tu-144', 'Туполев Ту-144', 'Tupolev Tu-144'),
    origin: originCountryName('tupolev-tu144'),
    character: local(
      'Two diagonal folds · narrow delta',
      'Два косых сгиба · узкое крыло',
      'Dos dobleces diagonales · ala delta estrecha',
    ),
    history: local(
      'Trace the triangular wing in NASA’s three-view drawing of the Tu-144. This paper plane is the traditional dart, whose first folder is unknown; Open Flight added 4 mm tips. A second long diagonal on each side narrows the triangle. The full-size aircraft used a more complex delta outline.',
      'Обведите взглядом треугольное крыло на чертеже Ту-144 из отчёта NASA. Эта бумажная модель — традиционный дротик, автор которого неизвестен; Open Flight добавила законцовки по 4 мм. Второй длинный косой сгиб с каждой стороны сужает треугольник. У настоящего самолёта контур крыла сложнее.',
      'Sigue el contorno triangular del ala del Tu-144 en el dibujo de tres vistas de la NASA. Este avión de papel es el dardo tradicional, de autor desconocido; Open Flight le añadió puntas de 4 mm. Un segundo doblez diagonal largo por lado estrecha el triángulo. El ala del avión real tiene un contorno más complejo.',
    ),
    experiment: local(
      'Fold one Delta Comet. Throw it five times with flat back edges, then bend up the back 15 mm of each wing, next to the body, by 2 mm. Throw five more times with the same firm push. Predict first: which flies flatter and further? Mark where each flight first touches the floor.',
      'Сложите одну «Дельта-комету». Бросьте её пять раз с ровными задними кромками, затем отогните вверх на 2 мм задние 15 мм каждого крыла у корпуса. Бросьте ещё пять раз так же сильно. Сначала предскажите: в каком случае полёт ровнее и дальше? Отмечайте точку первого касания пола.',
      'Pliega un Cometa delta. Lánzalo cinco veces con los bordes traseros planos y después dobla 2 mm hacia arriba los últimos 15 mm de cada ala, junto al cuerpo. Lánzalo cinco veces más con el mismo empujón firme. Predice primero: ¿cuándo vuela más recto y más lejos? Marca dónde toca el suelo cada vuelo por primera vez.',
    ),
    reference: {
      label: 'NASA • Tu-144 flight research, Fig. 1',
      url: 'https://ntrs.nasa.gov/api/citations/20000052206/downloads/20000052206.pdf',
    },
    field: {
      step: 2,
      variant: 'Tupolev Tu-144',
      landmark: local('Long delta wing', 'Длинное треугольное крыло', 'Ala delta alargada'),
      look: local(
        'Trace the long edge of the triangular wing back from the nose.',
        'Проследите длинную кромку треугольного крыла от носа назад.',
        'Sigue el borde largo del ala triangular desde la punta hacia atrás.',
      ),
      fold: local(
        'Fold 3 · The second diagonal draws the paper into a slimmer triangle.',
        'Сгиб 3 · Второй косой сгиб сужает треугольник.',
        'Doblez 3 · La segunda diagonal convierte el papel en un triángulo más estrecho.',
      ),
      finish: local(
        'Look for the triangular outline and the angled stripes that follow it.',
        'Найдите треугольный силуэт и полосы, повторяющие его углы.',
        'Busca el contorno triangular y las franjas en ángulo que lo acompañan.',
      ),
      museum: {
        label: 'Technik Museum Sinsheim • Tupolev Tu-144',
        url: 'https://www.technik-museum.de/en/discover/exhibits/tupolev-tu-144/',
      },
    },
    keel_mm: 18,
    winglet_mm: 4,
    code: '144',
    colors: ['#7552b0', '#e65978', '#2e71b3'],
    motif: 'chevrons',
  },
  {
    model_id: 'ilyushin-il62',
    name: local('Tailwind', 'Попутный ветер', 'Viento de cola'),
    inspiration: local('Ilyushin Il-62', 'Ильюшин Ил-62', 'Ilyushin Il-62'),
    origin: originCountryName('ilyushin-il62'),
    character: local(
      'Swept shoulders · tall tips',
      'Стреловидные крылья · высокие законцовки',
      'Alas inclinadas hacia atrás · puntas altas',
    ),
    history: local(
      'The State Aviation Museum’s Il-62 has swept wings and four engines at the rear. Look for the two pairs. Two pairs of stripes on the paper wing tips echo that detail.',
      'У Ил-62 в Государственном музее авиации стреловидные крылья и четыре двигателя в хвосте. Найдите две пары двигателей. На бумажной модели им соответствуют две пары полос на законцовках.',
      'El Il-62 del Museo Estatal de Aviación tiene alas inclinadas hacia atrás y cuatro motores junto a la cola. Busca los dos pares. Dos pares de franjas en los extremos de las alas de papel recuerdan ese detalle.',
    ),
    experiment: local(
      'Make one copy with flat tips and one with 10 mm tips. Give each five level launches. Record any left or right landings before changing another fold.',
      'Сложите один самолёт с плоскими крыльями, а у другого загните концы на 10 мм. По пять раз мягко запустите их горизонтально. Отметьте, какой сел левее или правее, прежде чем менять другой сгиб.',
      'Haz una copia con los bordes de las alas planos y otra con dobleces de 10 mm en los extremos. Lanza cada una cinco veces a nivel. Anota cuáles aterrizan a la izquierda o a la derecha antes de cambiar otro doblez.',
    ),
    reference: {
      label: 'State Aviation Museum • Il-62',
      url: 'https://aviamuseum.com.ua/ru/exposition/exposition/kb-ilyushina/173-il-62',
    },
    field: {
      step: 3,
      variant: 'Ilyushin Il-62',
      landmark: local(
        'Twin pairs at the tail',
        'Две пары двигателей у хвоста',
        'Dos pares de motores en la cola',
      ),
      look: local(
        'Find the two engine pairs beside the tail and the horizontal surface above them.',
        'Найдите две пары двигателей у хвоста и горизонтальную плоскость над ними.',
        'Busca los dos pares de motores junto a la cola y la superficie horizontal por encima.',
      ),
      fold: local(
        'Fold 4 · Fold the shoulders inward to angle back the paper wing.',
        'Сгиб 4 · Подогните косые плечи, чтобы крыло стало стреловидным.',
        'Doblez 4 · Dobla los lados hacia dentro para que las alas se inclinen hacia atrás.',
      ),
      finish: local(
        'Look for the pairs of stripes toward the wing tips. The bands suggest the paired engines.',
        'Найдите пары полос у законцовок. Они напоминают парные двигатели.',
        'Busca los pares de franjas cerca de los extremos de las alas. Recuerdan a los pares de motores.',
      ),
    },
    keel_mm: 22,
    winglet_mm: 10,
    code: 'IL·62',
    colors: ['#277aa3', '#ef8756', '#3da890'],
    motif: 'pairs',
  },
]

const spanishReferenceLabels = {
  'The Museum of Flight • Boeing 747-121': 'Museo del Vuelo de Seattle • Boeing 747-121',
  'Smithsonian • Douglas DC-3': 'Smithsonian • Douglas DC-3',
  'NASA • Tu-144 flight research, Fig. 1': 'NASA • Estudio de vuelo del Tu-144, fig. 1',
  'Technik Museum Sinsheim • Tupolev Tu-144': 'Museo de Tecnología de Sinsheim • Tupolev Tu-144',
  'State Aviation Museum • Il-62': 'Museo Estatal de Aviación de Kyiv • Il-62',
}

export function referenceForLocale(reference, locale) {
  if (locale !== 'es') return reference
  return { ...reference, label: spanishReferenceLabels[reference.label] ?? reference.label }
}

export const sheetSizes = { A4: [210, 297], US_LETTER: [215.9, 279.4] }
export const liveries = ['heritage', 'festival', 'pencil', 'airshow']
// Revision 1 always folds the whole sheet. Revision 2 adds the sheet edge choice: 'cut' prints a
// thick border trimMm inside the paper and folds the cut-out sheet; 'whole' folds the full paper.
export { trimMm, sheetEdges } from '../print-faces.js?v=827c6a6b1e8f'
export const revision = '2'
export const revisions = ['1', '2']
export function planeColors(model, livery) {
  if (livery === 'airshow') return {
    'boeing-747': ['#174d70','#eb7145','#ecc652'],
    'douglas-dc3': ['#205b50','#dca543','#9cc1ae'],
    'tupolev-tu144': ['#323b72','#d24062','#8caee1'],
    'ilyushin-il62': ['#2d566e','#438e9b','#e8bb60'],
  }[model.model_id]
  if (livery === 'pencil') return ['#687481', '#a3a9ad', '#6c7d84']
  if (livery === 'festival') return ['#e44f75', '#148d89', '#e8a323']
  return model.colors
}

// What to look for on the printed model. Every livery prints the design's bands, so the field
// caption holds; Graphite prints them grey and Airshow adds landmark tiles on the outer wing.
const liveryNotes = {
  pencil: local(
    'Graphite prints the bands in grey, ready to colour in.',
    'В графитовой раскраске полосы печатаются серыми, их можно раскрасить.',
    'En grafito, las franjas se imprimen en gris para que las colorees.',
  ),
  airshow: local(
    'Airshow adds small coloured tiles on the outer wing.',
    'Раскраска «Авиашоу» добавляет небольшие цветные плашки на внешней части крыла.',
    'Exhibición aérea añade pequeñas teselas de color en la parte exterior del ala.',
  ),
}
/** The caption under a printed model, following its livery. */
export function planeFinish(model, livery, locale) {
  const note = liveryNotes[livery]?.[locale]
  return model.field.finish[locale] + (note ? ' ' + note : '')
}
