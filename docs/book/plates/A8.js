// Plate A8 · Snub Nose, Open Flight's version of the Sky King by Takuo Toda. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Facts and sources: docs/research/unusual-flyer-sources.md. Spanish (tú) and Russian (вы) need a native read.
import { references as shared } from './A-references.js?v=27dc78b6a91f'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A8',
  model: 'sky-king',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('20–25 min · 13 steps', '20–25 min · 13 pasos', '20–25 мин · 13 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · a ruler', '1 hoja A4 o Carta · una regla', '1 лист A4 или US Letter · линейка'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('60 mm behind the nose (A4)', 'a 60 mm de la punta (A4)', '60 мм от носа (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('140 mm on a 139 mm body (A4)', '140 mm en un cuerpo de 139 mm (A4)', '140 мм при длине 139 мм (A4)'), state: 'estimate' },
    { label: w('Original', 'Original', 'Оригинал'), value: w('Sky King by Takuo Toda · design family of the 2009 time-aloft record', 'Sky King de Takuo Toda · familia del récord de tiempo en el aire de 2009', 'Sky King Такуо Тоды · семейство рекорда времени полёта 2009 года'), state: null },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Glider · gentle or steep throw · our version untested', 'Planeador · lanzamiento suave o empinado · nuestra versión sin probar', 'Планёр · мягкий или крутой бросок · наша версия не испытана'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Snub Nose has a short, squashed nose and two little fins at the back. Throw it up high and it turns into a slow, floating glider.',
      body: [
        'The tip of the nose is folded back inside and squashed flat. That packs layers of paper at the front, where the weight is needed, and gives a blunt nose that survives bumps. Folded on A4, it should balance about 60 mm behind the nose.',
        'Behind the nose the wing spreads out in a wide triangle. The two fins at the back of the wing tips are its tail: they keep the nose pointing into the air.',
        'Curl the back edges up a little and the nose stays up, so it glides instead of diving. Too much and it climbs, stalls and drops. Our version is untested. Tell us how long it stayed up.',
      ],
      grownUps: [
        'Snub Nose is 139 mm long and 140 mm across, an aspect ratio of 1.35, with 145 cm² of wing for 4.4 g of paper: about 310 g per square metre, which predicts a glide of 3–4 m/s. The squashed nose stacks eight layers in the first 14 mm. Its leading edges are swept back 45°. The balance point (60 mm) sits just behind the flat-wing neutral point (54 mm) and well ahead of the wing-area centroid (85 mm), so it may be only just stable: one clip moves it to about 55 mm. These figures are estimates from the fold geometry.',
        'For time aloft, Takuo Toda throws nearly straight up and lets the plane level off at the top. Time aloft is roughly the height reached divided by the sink rate, so a plane that climbs straight and then sinks slowly does best.',
      ],
    },
    es: {
      lead: 'Nariz chata tiene una punta corta y aplastada y dos aletas pequeñas atrás. Lánzala bien alto y se convierte en un planeador lento que flota.',
      body: [
        'La punta se dobla hacia dentro y se aplasta. Así se acumulan capas de papel delante, donde hace falta el peso, y queda una punta roma que aguanta los golpes. Plegada con una hoja A4, debería equilibrarse a unos 60 mm de la punta.',
        'Detrás de la punta, el ala se abre en un triángulo ancho. Las dos aletas de atrás, en las puntas de las alas, son su cola: mantienen la punta de cara al aire.',
        'Levanta un poco los bordes de atrás y la punta se mantiene arriba, así que planea en vez de caer en picado. Si te pasas, sube, se frena y cae. Nuestra versión no se ha probado. Cuéntanos cuánto tiempo se mantuvo en el aire.',
      ],
      grownUps: [
        'Nariz chata mide 139 mm de largo y 140 mm de envergadura, un alargamiento de 1,35, con 145 cm² de ala para 4,4 g de papel: unos 310 g por metro cuadrado, lo que predice un planeo de 3–4 m/s. La punta aplastada acumula ocho capas en los primeros 14 mm. Sus bordes delanteros están inclinados 45° hacia atrás. El equilibrio (60 mm) queda justo detrás del punto neutro del ala plana (54 mm) y bastante por delante del centroide del ala (85 mm), así que puede ser apenas estable: un clip lo adelanta a unos 55 mm. Son estimaciones a partir de la geometría de los pliegues.',
        'Para buscar tiempo en el aire, Takuo Toda lanza casi en vertical y deja que el avión se enderece arriba. El tiempo en el aire es más o menos la altura alcanzada dividida por la velocidad de descenso, así que gana el avión que sube recto y luego baja despacio.',
      ],
    },
    ru: {
      lead: 'У «Курносика» короткий расплющенный нос и два маленьких киля сзади. Бросьте его высоко, и он превратится в медленный парящий планёр.',
      body: [
        'Кончик носа завёрнут внутрь и расплющен. Так спереди, где нужен вес, собираются слои бумаги, а тупой нос выдерживает удары. Если сложить его из листа A4, он должен балансировать примерно в 60 мм от носа.',
        'За носом крыло расходится широким треугольником. Два киля на задних концах крыльев — это его хвост: они держат нос против потока.',
        'Слегка подогните задние кромки вверх, и нос не будет опускаться: самолёт планирует, а не пикирует. Если перестараться, он задирает нос, теряет скорость и падает. Наша версия ещё не испытана. Расскажите, сколько он продержался в воздухе.',
      ],
      grownUps: [
        'Длина «Курносика» 139 мм, размах 140 мм, удлинение 1,35; 145 см² крыла на 4,4 г бумаги — около 310 г на квадратный метр, что даёт скорость планирования 3–4 м/с. Расплющенный нос собирает восемь слоёв на первых 14 мм. Передние кромки отклонены назад на 45°. Точка равновесия (60 мм) лежит чуть позади нейтральной точки плоского крыла (54 мм) и намного впереди центра площади крыла (85 мм), поэтому самолёт может быть лишь едва устойчив: одна скрепка сдвигает её примерно к 55 мм. Это оценки по геометрии сгибов.',
        'Чтобы продержаться в воздухе дольше, Такуо Тода бросает почти вертикально вверх и даёт самолёту выровняться наверху. Время полёта примерно равно набранной высоте, делённой на скорость снижения, поэтому выигрывает самолёт, который ровно взлетает и медленно опускается.',
      ],
    },
  },
  why: {
    en: {
      title: 'Where it comes from',
      body: [
        'Takuo Toda of the Japan Origami Airplane Association designs planes folded from one uncut sheet. In 2009 a modified Sky King stayed up for 27.9 s, a Guinness record; his 2010 record of 29.2 s used a newer design, the Sky King Zero Fighter, folded from A5. The current record, 31.2 s from 2026, belongs to another team. Most airtime finalists at Red Bull Paper Wings 2022 flew the Sky King.',
        'Snub Nose is Open Flight’s version of the A4 Sky King. The fold sequence is derived from Toda’s design; the diagrams, text and art are our own, drawn from the fold geometry. Nothing is copied from the videos or books. Guinness and Red Bull appear only as facts; there is no endorsement.',
      ],
      borrows: 'It borrows the squashed nose, the swept wing and the tail fins of the Sky King.',
    },
    es: {
      title: 'De dónde viene',
      body: [
        'Takuo Toda, de la Asociación Japonesa de Aviones de Origami, diseña aviones plegados con una hoja sin cortes. En 2009 un Sky King modificado se mantuvo 27,9 s en el aire, un récord Guinness; su récord de 2010, 29,2 s, usó un diseño más nuevo, el Sky King Zero Fighter, plegado en A5. El récord actual, 31,2 s desde 2026, es de otro equipo. La mayoría de finalistas de tiempo de vuelo de Red Bull Paper Wings 2022 usaron el Sky King.',
        'Nariz chata es la versión de Open Flight del Sky King en A4. La secuencia de dobleces deriva del diseño de Toda; los esquemas, textos e ilustraciones son nuestros, hechos a partir de la geometría de los dobleces. No se copia nada de los vídeos ni de los libros. Guinness y Red Bull aparecen solo como datos; no implican respaldo.',
      ],
      borrows: 'Toma del Sky King la punta aplastada, el ala en flecha y las aletas de cola.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Такуо Тода из Японской ассоциации оригами-самолётов складывает модели из одного неразрезанного листа. В 2009 году доработанный Sky King продержался в воздухе 27,9 с — рекорд Guinness; рекорд 2010 года, 29,2 с, поставлен с более новой моделью — Sky King Zero Fighter из листа A5. Нынешний рекорд, 31,2 с с 2026 года, принадлежит другой команде. На Red Bull Paper Wings 2022 большинство финалистов в категории «время полёта» летали на Sky King.',
        '«Курносик» — версия Open Flight классического Sky King из листа A4. Порядок сгибов взят из модели Тоды; схемы, тексты и рисунки — наши, по геометрии сгибов. Из видео и книг ничего не скопировано. Guinness и Red Bull упомянуты только как факты; это не означает их одобрения.',
      ],
      borrows: 'Модель берёт у Sky King расплющенный нос, стреловидное крыло и хвостовые кили.',
    },
  },
  tryThis: {
    en: {
      question: 'How much curl does the back edge need?',
      prediction: 'Predict first: flat, slightly curled or strongly curled — which stays up longest?',
      steps: [
        'Fold one Snub Nose with flat back edges.',
        'Launch it five times, gently and level, from the same height. Count the seconds to landing.',
        'Curl both back edges up slightly and launch five more times.',
        'Curl them more and launch five more times.',
        'Compare the middle time of each set of five.',
      ],
      lookFor: 'Look for dives with flat edges, a long glide with a slight curl, and climbs and stalls with too much.',
    },
    es: {
      question: '¿Cuánto hay que curvar el borde de atrás?',
      prediction: 'Predice primero: plano, un poco curvado o muy curvado, ¿con cuál se mantiene más tiempo?',
      steps: [
        'Pliega una Nariz chata con los bordes de atrás planos.',
        'Lánzala cinco veces, suave y a nivel, desde la misma altura. Cuenta los segundos hasta que aterriza.',
        'Curva un poco hacia arriba los dos bordes de atrás y lánzala cinco veces más.',
        'Cúrvalos más y lánzala otras cinco veces.',
        'Compara el tiempo del medio de cada serie de cinco.',
      ],
      lookFor: 'Fíjate si cae en picado con los bordes planos, planea largo con una curva ligera y sube y se desploma si te pasas.',
    },
    ru: {
      question: 'Насколько подгибать заднюю кромку?',
      prediction: 'Сначала предскажите: ровная, чуть подогнутая или сильно подогнутая — с какой кромкой полёт дольше?',
      steps: [
        'Сложите «Курносика» с ровными задними кромками.',
        'Запустите его пять раз мягко и горизонтально с одной высоты. Считайте секунды до посадки.',
        'Чуть подогните обе задние кромки вверх и запустите ещё пять раз.',
        'Подогните их сильнее и запустите ещё пять раз.',
        'Сравните серединное время каждой пятёрки.',
      ],
      lookFor: 'Смотрите, пикирует ли самолёт с ровными кромками, долго ли планирует с лёгким изгибом и не взмывает ли со сваливанием, если перестараться.',
    },
  },
  references: [
    shared.forces, shared.cg, shared.elevator, shared.gliders, shared.wing,
    {
      label: 'WIRED (2009) · Takuo Toda folds the Sky King',
      url: 'https://www.youtube.com/watch?v=c1fXWVhd6dU',
      note: w('Toda’s own narrated fold; a modified Sky King set the 2009 record.', 'Toda pliega y explica el modelo; un Sky King modificado logró el récord de 2009.', 'Тода сам складывает и объясняет модель; доработанный Sky King установил рекорд 2009 года.'),
    },
    {
      label: 'Guinness World Records · Longest time flying a paper aircraft',
      url: 'https://www.guinnessworldrecords.com/world-records/longest-time-flying-a-paper-aircraft.html',
      note: w('The current record: 31.2 s, 2026.', 'El récord actual: 31,2 s, 2026.', 'Нынешний рекорд: 31,2 с, 2026 год.'),
    },
    {
      label: 'PPO · Sky King tutorial on A4 (2020)',
      url: 'https://www.youtube.com/watch?v=JV2aMbGtmZE',
      note: w('The fold sequence our diagrams are derived from.', 'La secuencia de dobleces de la que derivan nuestros esquemas.', 'Последовательность сгибов, по которой построены наши схемы.'),
    },
  ],
}
