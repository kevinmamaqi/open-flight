// Plate A6 · Sky Raft, Open Flight's version of the Shaheen Shin credited to Shin Moo Joon. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Facts and sources: docs/research/unusual-flyer-sources.md. Spanish (tú) and Russian (вы) need a native read.
import { references as shared } from './A-references.js?v=7988ca7cb2ce'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A6',
  model: 'shaheen-shin',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('20–30 min · 13 steps', '20–30 min · 13 pasos', '20–30 мин · 13 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · a ruler · 1 paper clip', '1 hoja A4 o Carta · una regla · 1 clip', '1 лист A4 или US Letter · линейка · 1 скрепка'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('26 mm behind the front edge (A4)', 'a 26 mm del borde delantero (A4)', '26 мм от передней кромки (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('130 mm on a 105 mm chord (A4)', '130 mm con 105 mm de fondo (A4)', '130 мм при глубине 105 мм (A4)'), state: 'estimate' },
    { label: w('Original', 'Original', 'Оригинал'), value: w('Shaheen Shin by Shin Moo Joon · flown to 14.86 s, Red Bull Paper Wings 2022', 'Shaheen Shin de Shin Moo Joon · 14,86 s, Red Bull Paper Wings 2022', 'Shaheen Shin Шин Му Джуна · 14,86 с, Red Bull Paper Wings 2022'), state: null },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Airtime glider · steep throw · our version untested', 'Planeador de tiempo · lanzamiento empinado · nuestra versión sin probar', 'Планёр на время · крутой бросок · наша версия не испытана'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Sky Raft has two jobs: shoot up like a stick when you throw it, then float down like a raft on a slow river.',
      body: [
        'Almost half of the sheet is rolled into a thick bar along the front edge. That puts the weight at the front, so a hard throw sends it up straight instead of looping.',
        'Behind the bar is a short, wide, nearly square wing with a fin at each tip. Light for its size, it sinks slowly. The fins work like a tail and keep it pointing into the air.',
        'Folded on A4, it should balance about 26 mm behind the front edge. Our estimate puts that close to its limit, so keep a paper clip ready. If it climbs, stalls and drops, clip the middle of the bar. Our version is untested. Tell us how long it stayed up.',
      ],
      grownUps: [
        'Sky Raft is 130 mm across and 105 mm deep on A4, an aspect ratio of 1.25, with 136 cm² of wing for 4.4 g of paper: about 330 g per square metre, which predicts a glide of 3–4 m/s. The rolled bar stacks up to 11 layers near the centre. A flat-wing model puts the neutral point 20 mm behind the front edge; the side-edge vortices of a short wing move the real centre of lift back towards the area centroid at 53 mm (Polhamus; Torres and Mueller). The balance at 26 mm lies inside that range, near its front end, so the plane may be barely stable: a clip moves it to about 25 mm, two clips to 23 mm. These figures are estimates from the fold geometry.',
        'Time aloft is roughly launch height divided by sink rate. An airtime plane therefore needs two opposite things: compact and nose-heavy for the climb, light and broad for the descent. A slight V from behind and a small upward curl at the back edge help it settle into a wide, gentle circle.',
      ],
    },
    es: {
      lead: 'Balsa del cielo tiene dos tareas: subir como un palo cuando la lanzas y luego bajar flotando como una balsa en un río lento.',
      body: [
        'Casi la mitad de la hoja se enrolla en una barra gruesa a lo largo del borde delantero. Así el peso queda delante, y un lanzamiento fuerte la hace subir recta en lugar de dar una vuelta.',
        'Detrás de la barra hay un ala corta, ancha, casi cuadrada, con una aleta en cada punta. Es ligera para su tamaño y baja despacio. Las aletas hacen de cola y la mantienen de cara al aire.',
        'Plegada con una hoja A4, debería equilibrarse a unos 26 mm del borde delantero. Según nuestra estimación, eso está cerca de su límite, así que ten un clip a mano. Si sube, se frena y cae, pon el clip en el centro de la barra. Nuestra versión no se ha probado. Cuéntanos cuánto tiempo se mantuvo en el aire.',
      ],
      grownUps: [
        'Balsa del cielo mide 130 mm de ancho y 105 mm de fondo en A4, un alargamiento de 1,25, con 136 cm² de ala para 4,4 g de papel: unos 330 g por metro cuadrado, lo que predice un planeo de 3–4 m/s. La barra enrollada acumula hasta 11 capas cerca del centro. Un modelo de ala plana sitúa el punto neutro a 20 mm del borde delantero; los remolinos de los bordes laterales de un ala corta llevan el centro de sustentación real hacia el centroide del ala, a 53 mm (Polhamus; Torres y Mueller). El equilibrio, a 26 mm, queda dentro de ese margen, cerca de su extremo delantero, así que puede ser apenas estable: un clip lo lleva a unos 25 mm y dos clips a 23 mm. Son estimaciones a partir de la geometría de los pliegues.',
        'El tiempo en el aire es más o menos la altura del lanzamiento dividida por la velocidad de descenso. Un avión de tiempo necesita dos cosas opuestas: compacto y pesado delante para subir, ligero y ancho para bajar. Una V ligera vista desde atrás y una pequeña curva hacia arriba en el borde trasero le ayudan a describir un círculo amplio y suave.',
      ],
    },
    ru: {
      lead: 'У «Небесного плота» две задачи: после броска взлететь вверх, как палка, а потом плыть вниз, как плот по медленной реке.',
      body: [
        'Почти половина листа скатана в толстый валик вдоль передней кромки. Вес оказывается спереди, и после сильного броска самолёт идёт прямо вверх, а не делает петлю.',
        'За валиком — короткое широкое, почти квадратное крыло с килем на каждом конце. Для своего размера оно лёгкое и снижается медленно. Кили работают как хвост и держат самолёт носом к потоку.',
        'Если сложить его из листа A4, он должен балансировать примерно в 26 мм от передней кромки. По нашей оценке, это близко к пределу, поэтому держите скрепку наготове. Если самолёт взмывает, теряет скорость и падает, наденьте скрепку на середину валика. Наша версия ещё не испытана. Расскажите, сколько он продержался в воздухе.',
      ],
      grownUps: [
        'На листе A4 «Небесный плот» имеет размах 130 мм и глубину 105 мм, удлинение 1,25, и 136 см² крыла на 4,4 г бумаги: около 330 г на квадратный метр, что даёт скорость планирования 3–4 м/с. Скатанный валик собирает до 11 слоёв у середины. Модель плоского крыла ставит нейтральную точку в 20 мм от передней кромки; вихри у боковых кромок короткого крыла смещают настоящий центр подъёмной силы назад, к центру площади крыла в 53 мм (Полхамус; Торрес и Мюллер). Точка равновесия в 26 мм лежит внутри этого диапазона, у его переднего края, так что самолёт может быть едва устойчив: одна скрепка сдвигает её примерно к 25 мм, две — к 23 мм. Это оценки по геометрии сгибов.',
        'Время полёта примерно равно высоте броска, делённой на скорость снижения. Поэтому самолёту на время нужны две противоположные вещи: компактность и тяжёлый нос для подъёма, лёгкость и широкое крыло для спуска. Лёгкая буква V сзади и небольшой изгиб задней кромки вверх помогают ему перейти в широкий плавный круг.',
      ],
    },
  },
  why: {
    en: {
      title: 'Where it comes from',
      body: [
        'Rana Muhammad Usman Saeed from Pakistan won the airtime final of Red Bull Paper Wings in May 2022 with a square glider: 14.86 s. His 16.39 s throw the day before is the championship’s Guinness record, not the overall time-aloft record. Foldable Flight credits the design to Shin Moo Joon, inspired by Ken Blackburn’s glider, and calls it the “Shaheen Shin”; we found no other source for the name.',
        'Sky Raft is Open Flight’s version of it. The fold sequence is derived from that design; the diagrams, text and art are our own, drawn from the fold geometry. Nothing is copied from the videos. Red Bull and Guinness appear only as facts; there is no endorsement.',
      ],
      borrows: 'It borrows the rolled front bar, the square wing and the tip fins of the Shaheen Shin.',
    },
    es: {
      title: 'De dónde viene',
      body: [
        'Rana Muhammad Usman Saeed, de Pakistán, ganó la final de tiempo de vuelo de Red Bull Paper Wings en mayo de 2022 con un planeador cuadrado: 14,86 s. Su lanzamiento de 16,39 s del día anterior es el récord Guinness del campeonato, no el récord absoluto de tiempo en el aire. Foldable Flight atribuye el diseño a Shin Moo Joon, inspirado en el planeador de Ken Blackburn, y lo llama «Shaheen Shin»; no encontramos otra fuente para ese nombre.',
        'Balsa del cielo es la versión de Open Flight. La secuencia de dobleces deriva de ese diseño; los esquemas, textos e ilustraciones son nuestros, hechos a partir de la geometría de los dobleces. No se copia nada de los vídeos. Red Bull y Guinness aparecen solo como datos; no implican respaldo.',
      ],
      borrows: 'Toma del Shaheen Shin la barra enrollada delantera, el ala cuadrada y las aletas de las puntas.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Рана Мухаммад Усман Саид из Пакистана выиграл финал Red Bull Paper Wings на время полёта в мае 2022 года с квадратным планёром: 14,86 с. Его бросок на 16,39 с накануне — рекорд Guinness этого чемпионата, а не общий рекорд времени полёта. Foldable Flight называет автором модели Шин Му Джуна, вдохновлённого планёром Кена Блэкберна, и даёт ей имя Shaheen Shin; других источников этого названия мы не нашли.',
        '«Небесный плот» — версия Open Flight. Порядок сгибов взят из этой модели; схемы, тексты и рисунки — наши, по геометрии сгибов. Из видео ничего не скопировано. Red Bull и Guinness упомянуты только как факты; это не означает их одобрения.',
      ],
      borrows: 'Модель берёт у Shaheen Shin скатанный передний валик, квадратное крыло и кили на концах.',
    },
  },
  tryThis: {
    en: {
      question: 'Does a curled back edge keep it up longer?',
      prediction: 'Predict first: will a 2 mm curl at the back edge make it glide longer, or make it stall?',
      steps: [
        'Fold one Sky Raft.',
        'Launch it five times, gently and level, from the same height. Count the seconds to landing.',
        'Curl the back edge up by 2 mm along its whole width.',
        'Launch it five more times the same way and count again.',
        'Compare the middle time of each set of five.',
      ],
      lookFor: 'Look for a flatter, longer glide with the curl, and for bobbing or stalls if the curl is too big.',
    },
    es: {
      question: '¿Un borde trasero curvado lo mantiene más tiempo en el aire?',
      prediction: 'Predice primero: ¿una curva de 2 mm en el borde trasero alargará el planeo o hará que se desplome?',
      steps: [
        'Pliega una Balsa del cielo.',
        'Lánzala cinco veces, suave y a nivel, desde la misma altura. Cuenta los segundos hasta que aterriza.',
        'Curva hacia arriba 2 mm el borde trasero a lo ancho.',
        'Lánzala cinco veces más igual y vuelve a contar.',
        'Compara el tiempo del medio de cada serie de cinco.',
      ],
      lookFor: 'Fíjate si con la curva planea más largo y más recto, o si sube y baja o se desploma cuando la curva es demasiado grande.',
    },
    ru: {
      question: 'Продлевает ли полёт подогнутая задняя кромка?',
      prediction: 'Сначала предскажите: изгиб задней кромки на 2 мм удлинит планирование или приведёт к сваливанию?',
      steps: [
        'Сложите один «Небесный плот».',
        'Запустите его пять раз мягко и горизонтально с одной высоты. Считайте секунды до посадки.',
        'Подогните заднюю кромку вверх на 2 мм по всей ширине.',
        'Запустите ещё пять раз так же и снова посчитайте.',
        'Сравните среднее (серединное) время каждой пятёрки.',
      ],
      lookFor: 'Смотрите, становится ли планирование ровнее и дольше с изгибом и не начинает ли самолёт клевать или сваливаться, если изгиб слишком большой.',
    },
  },
  references: [
    shared.forces, shared.cg, shared.elevator, shared.gliders, shared.torres, shared.polhamus,
    {
      label: 'Guinness World Records · Longest time aloft at the Red Bull Paper Wings Championship',
      url: 'https://www.guinnessworldrecords.com/world-records/729617-longest-time-aloft-at-the-red-bull-paper-wings-championship',
      note: w('Saeed, 16.39 s on 13 May 2022; 14.86 s in the final.', 'Saeed, 16,39 s el 13 de mayo de 2022; 14,86 s en la final.', 'Саид, 16,39 с 13 мая 2022 года; 14,86 с в финале.'),
    },
    {
      label: 'Foldable Flight · Shaheen Shin tutorial (2022)',
      url: 'https://www.youtube.com/watch?v=lIBeQDtJLf4',
      note: w('The fold sequence our diagrams are derived from, and the design credit.', 'La secuencia de dobleces de la que derivan nuestros esquemas, y la autoría del diseño.', 'Последовательность сгибов, по которой построены наши схемы, и авторство модели.'),
    },
  ],
}
