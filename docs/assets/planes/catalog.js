const pair = (en, ru) => ({ en, ru })

export const planeCatalog = [
  {
    model_id: 'boeing-747',
    name: pair('Upper Deck', 'Две палубы'),
    inspiration: pair('Boeing 747', 'Boeing 747'),
    origin: pair('United States', 'США'),
    character: pair('Pleated nose · broad wings', 'Нос со складкой · широкие крылья'),
    history: pair(
      'Look at the raised upper deck on the Museum of Flight’s first 747. Two overlapping nose folds give this paper model a small raised step you can feel.',
      'Посмотрите на верхнюю палубу первого Boeing 747 в Музее авиации Сиэтла. Две встречные складки образуют на носу бумажной модели ступеньку, которую можно нащупать.',
    ),
    experiment: pair(
      'Make a second copy with a deeper body fold. Keep the nose pleat and launch height the same. Which copy stays level for longer?',
      'Сделайте второй самолёт с более глубоким сгибом корпуса. Оставьте носовую складку и высоту старта прежними. Какой самолёт дольше летит ровно?',
    ),
    reference: {
      label: 'The Museum of Flight • Boeing 747-121',
      url: 'https://www.museumofflight.org/exhibits-and-events/aircraft/boeing-747-121',
    },
    keel_mm: 20,
    winglet_mm: 6,
    code: '747',
    colors: ['#e25c32', '#095572', '#f4b550'],
    motif: 'steps',
  },
  {
    model_id: 'douglas-dc3',
    name: pair('Prairie Skipper', 'Луговой планёр'),
    inspiration: pair('Douglas DC-3', 'Douglas DC-3'),
    origin: pair('United States', 'США'),
    character: pair('Rolled leading edge · wide nose', 'Двойной подгиб · широкий нос'),
    history: pair(
      'The Smithsonian’s DC-3 carried passengers on two propeller engines. Find the wide metal wings in the museum photograph. The paper version keeps broad shoulders and rolls the front edge twice.',
      'У пассажирского DC-3 из коллекции Смитсоновского института два винтовых двигателя. Найдите на фотографии широкие металлические крылья. У бумажной версии широкие плечи и два подгиба передней кромки.',
    ),
    experiment: pair(
      'Open the wings into a very shallow V. Compare three gentle launches with three from a copy with taller turned-up tips. Count how often each lands wings-level.',
      'Раскройте крылья неглубокой буквой V. Сделайте три мягких запуска, затем ещё три с копией с более высокими законцовками. Посчитайте, сколько раз каждая модель приземлилась ровно.',
    ),
    reference: {
      label: 'Smithsonian • Douglas DC-3',
      url: 'https://airandspace.si.edu/collection-objects/douglas-dc-3/nasm_A19530075000',
    },
    keel_mm: 16,
    winglet_mm: 8,
    code: 'DC·3',
    colors: ['#168569', '#ea9c1c', '#20657e'],
    motif: 'rays',
  },
  {
    model_id: 'tupolev-tu144',
    name: pair('Delta Comet', 'Дельта-комета'),
    inspiration: pair('Tupolev Tu-144', 'Туполев Ту-144'),
    origin: pair('Soviet Union', 'СССР'),
    character: pair('Double sweep · narrow delta', 'Два косых сгиба · узкое крыло'),
    history: pair(
      'Trace the triangular wing in NASA’s three-view drawing of the Tu-144. On paper, a second long diagonal on each side narrows the triangle. The full-size aircraft used a more complex delta outline.',
      'Обведите взглядом треугольное крыло на чертеже Ту-144 из отчёта NASA. В бумажной модели второй длинный косой сгиб с каждой стороны сужает треугольник. У настоящего самолёта контур крыла сложнее.',
    ),
    experiment: pair(
      'Fold a Delta and a Prairie Skipper from the same paper. Launch gently from the same place three times. Compare the spots where the two shapes first touch the floor.',
      'Сложите «Дельту» и «Луговой планёр» из одинаковой бумаги. Трижды запустите их с одного места. Сравните точки первого касания пола.',
    ),
    reference: {
      label: 'NASA • Tu-144 flight research, Fig. 1',
      url: 'https://ntrs.nasa.gov/api/citations/20000052206/downloads/20000052206.pdf',
    },
    keel_mm: 18,
    winglet_mm: 4,
    code: '144',
    colors: ['#7552b0', '#e65978', '#2e71b3'],
    motif: 'chevrons',
  },
  {
    model_id: 'ilyushin-il62',
    name: pair('Tailwind', 'Попутный ветер'),
    inspiration: pair('Ilyushin Il-62', 'Ильюшин Ил-62'),
    origin: pair('Soviet Union', 'СССР'),
    character: pair('Swept shoulders · striped tail', 'Стреловидные крылья · полосатый хвост'),
    history: pair(
      'The State Aviation Museum’s Il-62 has swept wings and four engines at the rear. Look for the two pairs. Two pairs of stripes on the paper wing tips echo that detail.',
      'У Ил-62 в Государственном музее авиации стреловидные крылья и четыре двигателя в хвосте. Найдите две пары двигателей. На бумажной модели им соответствуют две пары полос на законцовках.',
    ),
    experiment: pair(
      'Make one copy with flat tips and one with 10 mm tips. Give each three level launches. Record any left or right landings before changing another fold.',
      'Сложите один самолёт с плоскими крыльями, а у другого загните концы на 10 мм. По три раза мягко запустите их горизонтально. Отметьте, какой сел левее или правее, прежде чем менять другой сгиб.',
    ),
    reference: {
      label: 'State Aviation Museum • Ил-62',
      url: 'https://aviamuseum.com.ua/ru/exposition/exposition/kb-ilyushina/173-il-62',
    },
    keel_mm: 22,
    winglet_mm: 10,
    code: 'IL·62',
    colors: ['#277aa3', '#ef8756', '#3da890'],
    motif: 'pairs',
  },
]

export const sheetSizes = { A4: [210, 297], US_LETTER: [215.9, 279.4] }
export const liveries = ['heritage', 'festival', 'pencil']
export const revision = '1'
export function planeColors(model, livery) {
  if (livery === 'pencil') return ['#687481', '#a3a9ad', '#6c7d84']
  if (livery === 'festival') return ['#e44f75', '#148d89', '#e8a323']
  return model.colors
}
