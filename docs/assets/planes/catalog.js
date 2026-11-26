import { originCountryName } from './heritage.js?v=efdc141e4945'

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
  // Record and championship planes. Other people's designs, credited to them, with fold diagrams
  // drawn by Open Flight from the fold geometry. Facts: docs/research/unusual-flyer-sources.md.
  {
    model_id: 'red-dart',
    record: true,
    // An A4 design: on other paper it folds an A4-shaped sheet cut from the page.
    sheet_ratio: Math.SQRT2,
    launch: local(
      'Hold the body near the back with a finger on the back edge. Throw hard and level, like a javelin, into a long clear space.',
      'Возьмитесь за корпус ближе к хвосту, упритесь пальцем в заднюю кромку. Бросайте сильно и ровно, как копьё, в длинное свободное пространство.',
      'Sujeta el cuerpo cerca de la cola con un dedo en el borde de atrás. Lánzalo fuerte y a nivel, como una jabalina, hacia un espacio largo y despejado.',
    ),
    designer: local('Lazar Krstić', 'Лазар Крстич', 'Lazar Krstić'),
    name: local('Needle', 'Игла', 'Aguja'),
    original: 'Red Dart',
    inspiration: local(
      'Based on the Red Dart by Lazar Krstić',
      'По мотивам Red Dart Лазара Крстича',
      'Basado en el Red Dart de Lazar Krstić',
    ),
    origin: originCountryName('red-dart'),
    character: local('Wrapped core · tiny wings', 'Обёрнутая сердцевина · крошечные крылья', 'Núcleo envuelto · alas diminutas'),
    history: local(
      'Lazar Krstić from Serbia won the distance final of Red Bull Paper Wings in Salzburg on 14 May 2022 with this dart: 61.11 m. Guinness lists it as the farthest throw at that championship; the overall distance record is held by other designs. “Red Dart” is Foldable Flight’s name for it. The whole sheet is wrapped round a narrow triangle, so it is almost all body and hardly any wing. This is Open Flight’s version of it.',
      'Лазар Крстич из Сербии выиграл финал Red Bull Paper Wings на дальность в Зальцбурге 14 мая 2022 года с этим дротиком: 61,11 м. Guinness называет его самым дальним броском на этом чемпионате; общий рекорд дальности принадлежит другим моделям. Название Red Dart придумали в Foldable Flight. Весь лист обёрнут вокруг узкого треугольника: почти один корпус и совсем немного крыла. Здесь — версия Open Flight.',
      'Lazar Krstić, de Serbia, ganó la final de distancia de Red Bull Paper Wings en Salzburgo el 14 de mayo de 2022 con este dardo: 61,11 m. Guinness lo registra como el lanzamiento más largo de ese campeonato; el récord absoluto de distancia es de otros diseños. «Red Dart» es el nombre que le da Foldable Flight. Toda la hoja se envuelve alrededor de un triángulo estrecho: casi todo es cuerpo y apenas hay ala. Esta es la versión de Open Flight.',
    ),
    experiment: local(
      'Fold two copies: one with loose wraps and one wrapped as tightly as you can. Predict first: which flies straighter? Throw each five times with the same hard, level push, like a javelin. Mark where each first touches the floor and how far it curved.',
      'Сложите две модели: одну с рыхлыми оборотами, другую обёрнутую как можно плотнее. Сначала предскажите: какая полетит прямее? Бросьте каждую пять раз одинаково сильно и ровно, как копьё. Отметьте, где каждая впервые коснулась пола и насколько ушла в сторону.',
      'Pliega dos copias: una con vueltas flojas y otra envuelta lo más apretada que puedas. Predice primero: ¿cuál vuela más recto? Lanza cada una cinco veces con el mismo empujón fuerte y a nivel, como una jabalina. Marca dónde toca el suelo cada una por primera vez y cuánto se desvió.',
    ),
    reference: { label: 'Foldable Flight • Red Dart tutorial', url: 'https://www.youtube.com/watch?v=4D6HZRaVFF8' },
    field: {
      step: 7,
      variant: 'Red Dart',
      landmark: local('The wrapped core', 'Обёрнутая сердцевина', 'El núcleo envuelto'),
      look: local(
        'Pinch the body near the nose: dozens of layers lie there, all wrapped round one narrow triangle.',
        'Сожмите корпус у носа: там лежат десятки слоёв, обёрнутых вокруг одного узкого треугольника.',
        'Aprieta el cuerpo cerca de la punta: ahí hay decenas de capas, todas envueltas alrededor de un triángulo estrecho.',
      ),
      fold: local(
        'Folds 6–8 · Wrap the paper round the core, side after side.',
        'Сгибы 6–8 · Оборачивайте бумагу вокруг сердцевины, сторона за стороной.',
        'Dobleces 6–8 · Envuelve el papel alrededor del núcleo, un lado y luego el otro.',
      ),
      finish: local(
        'Look along the body from the tail: the bands spiral round the layers.',
        'Посмотрите вдоль корпуса с хвоста: полосы закручиваются вокруг слоёв.',
        'Mira el cuerpo desde la cola: las franjas dan vueltas alrededor de las capas.',
      ),
      museum: { label: 'Red Bull • Paper Wings World Final 2022 results', url: 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results' },
    },
    keel_mm: 12,
    keel_range: [8, 16],
    winglet_mm: 0,
    winglet_range: [0, 0],
    code: 'RD·22',
    colors: ['#c8312b', '#1d2f4f', '#e9b43a'],
    motif: 'darts',
  },
  {
    model_id: 'shaheen-shin',
    record: true,
    launch: local(
      'Indoors, start with gentle throws at about 45°. In competition the throw goes hard, nearly straight up, and the plane levels off at the top.',
      'В помещении начните с мягких бросков примерно под 45°. На соревнованиях бросают сильно, почти вертикально вверх, и наверху самолёт выравнивается.',
      'En interior, empieza con lanzamientos suaves a unos 45°. En competición se lanza fuerte, casi en vertical, y el avión se endereza arriba.',
    ),
    designer: local('Shin Moo Joon', 'Шин Му Джун', 'Shin Moo Joon'),
    name: local('Sky Raft', 'Небесный плот', 'Balsa del cielo'),
    original: 'Shaheen Shin',
    inspiration: local(
      'Based on the Shaheen Shin by Shin Moo Joon',
      'По мотивам Shaheen Shin Шин Му Джуна',
      'Basado en el Shaheen Shin de Shin Moo Joon',
    ),
    origin: originCountryName('shaheen-shin'),
    character: local('Rolled bar · square wing · tip fins', 'Скатанный валик · квадратное крыло · кили', 'Barra enrollada · ala cuadrada · aletas'),
    history: local(
      'Rana Muhammad Usman Saeed from Pakistan won the airtime final of Red Bull Paper Wings in May 2022 with a square glider: 14.86 s. His 16.39 s throw the day before is the championship’s Guinness record, not the overall time-aloft record. Foldable Flight credits the design to Shin Moo Joon, inspired by Ken Blackburn’s glider, and calls it “Shaheen Shin”; we found no other source for the name. This is Open Flight’s version of it.',
      'Рана Мухаммад Усман Саид из Пакистана выиграл финал Red Bull Paper Wings на время полёта в мае 2022 года с квадратным планёром: 14,86 с. Его бросок на 16,39 с накануне — рекорд Guinness этого чемпионата, а не общий мировой рекорд. Foldable Flight называет автором модели Шин Му Джуна, который вдохновлялся планёром Кена Блэкберна, и даёт ей имя Shaheen Shin; других источников этого названия мы не нашли. Здесь — версия Open Flight.',
      'Rana Muhammad Usman Saeed, de Pakistán, ganó la final de tiempo de vuelo de Red Bull Paper Wings en mayo de 2022 con un planeador cuadrado: 14,86 s. Su lanzamiento de 16,39 s del día anterior es el récord Guinness del campeonato, no el récord absoluto de tiempo en el aire. Foldable Flight atribuye el diseño a Shin Moo Joon, inspirado en el planeador de Ken Blackburn, y lo llama «Shaheen Shin»; no encontramos otra fuente para ese nombre. Esta es la versión de Open Flight.',
    ),
    experiment: local(
      'Fold one. Launch it five times gently and level, then curl the back edge up by 2 mm and launch five more. Predict first: which glides longer? Count the seconds from release to landing for each throw.',
      'Сложите одну модель. Мягко запустите её пять раз горизонтально, затем подогните заднюю кромку вверх на 2 мм и запустите ещё пять раз. Сначала предскажите: в каком случае планирование дольше? Считайте секунды от броска до посадки.',
      'Pliega uno. Lánzalo cinco veces suave y a nivel; después levanta 2 mm el borde de atrás y lánzalo cinco veces más. Predice primero: ¿cuándo planea más tiempo? Cuenta los segundos desde que lo sueltas hasta que aterriza.',
    ),
    reference: { label: 'Foldable Flight • Shaheen Shin tutorial', url: 'https://www.youtube.com/watch?v=lIBeQDtJLf4' },
    field: {
      step: 8,
      variant: 'Shaheen Shin',
      landmark: local('The rolled bar', 'Скатанный валик', 'La barra enrollada'),
      look: local(
        'Feel the thick bar along the front edge: almost half of the sheet is rolled into it.',
        'Нащупайте толстый валик вдоль передней кромки: в него скатана почти половина листа.',
        'Toca la barra gruesa del borde delantero: casi la mitad de la hoja está enrollada en ella.',
      ),
      fold: local(
        'Folds 9–10 · Roll the nose down five times to the mark.',
        'Сгибы 9–10 · Пять раз скатайте нос до отметки.',
        'Dobleces 9–10 · Enrolla la punta cinco veces hasta la marca.',
      ),
      finish: local(
        'Look for the bands that wrap the bar and run back onto the wing.',
        'Найдите полосы, которые обвивают валик и уходят на крыло.',
        'Busca las franjas que envuelven la barra y siguen por el ala.',
      ),
      museum: {
        label: 'Guinness World Records • Paper Wings airtime',
        url: 'https://www.guinnessworldrecords.com/world-records/729617-longest-time-aloft-at-the-red-bull-paper-wings-championship',
      },
    },
    keel_mm: 18,
    keel_range: [14, 24],
    winglet_mm: 15,
    winglet_range: [10, 20],
    code: 'SS·22',
    colors: ['#1f7a4d', '#e3a83a', '#24577a'],
    motif: 'bars',
  },
  {
    model_id: 'crescent-boomerang',
    record: true,
    launch: local(
      'Hold the body with the wings vertical, never flat. Turn your body and release it sideways at chest height, roughly level.',
      'Держите корпус так, чтобы крылья стояли вертикально, а не плашмя. Повернитесь всем телом и отпустите модель вбок на уровне груди, примерно горизонтально.',
      'Sujeta el cuerpo con las alas en vertical, nunca planas. Gira el cuerpo y suéltalo de lado a la altura del pecho, más o menos a nivel.',
    ),
    designer: local('Designer not established', 'Автор не установлен', 'Autor sin confirmar'),
    name: local('Homecoming', 'Возвращение', 'Regreso'),
    original: 'Crescent Boomerang',
    inspiration: local(
      'Based on the Crescent Boomerang flown by Seunghoon Lee',
      'По мотивам Crescent Boomerang, с которым выступал Сынхун Ли',
      'Basado en el Crescent Boomerang que lanzó Seunghoon Lee',
    ),
    origin: originCountryName('crescent-boomerang'),
    character: local('Locked nose · winglets · bent-up tail', 'Закреплённый нос · законцовки · поднятый хвост', 'Punta bloqueada · aletas · cola levantada'),
    history: local(
      'Seunghoon Lee, a science teacher from South Korea, won the aerobatics final of Red Bull Paper Wings on 14 May 2022 with a one-minute routine; this boomerang came back to his hand. We found no named designer: his channel WePlay published the same fold in 2018, and “Crescent Boomerang” appears to be Foldable Flight’s name. Thrown on its side, its lift points into a circle. This is Open Flight’s version of it.',
      'Сынхун Ли, учитель естествознания из Южной Кореи, выиграл финал Red Bull Paper Wings по аэробатике 14 мая 2022 года с минутным номером; этот бумеранг возвращался ему в руку. Имени автора модели мы не нашли: канал Ли WePlay показал тот же сгиб в 2018 году, а название Crescent Boomerang, по-видимому, дали в Foldable Flight. Если бросить его на боку, подъёмная сила направлена внутрь круга. Здесь — версия Open Flight.',
      'Seunghoon Lee, profesor de ciencias de Corea del Sur, ganó la final de acrobacias de Red Bull Paper Wings el 14 de mayo de 2022 con una actuación de un minuto; este bumerán volvía a su mano. No encontramos el nombre de quien lo diseñó: su canal WePlay publicó el mismo plegado en 2018, y «Crescent Boomerang» parece ser el nombre que le da Foldable Flight. Si lo lanzas de lado, su sustentación apunta hacia el centro de un círculo. Esta es la versión de Open Flight.',
    ),
    experiment: local(
      'Hold it with the wings vertical and throw it sideways at chest height, five times with flat back edges and five with both back edges bent up. Predict first: which circle is smaller? Mark where you stood and where each throw lands.',
      'Держите модель крыльями вертикально и бросайте вбок на уровне груди: пять раз с ровными задними кромками и пять раз с обеими отогнутыми вверх. Сначала предскажите: где круг меньше? Отметьте, где вы стояли и где приземлился каждый бросок.',
      'Sujétalo con las alas en vertical y lánzalo de lado a la altura del pecho: cinco veces con los bordes de atrás planos y cinco con los dos levantados. Predice primero: ¿cuándo hace un círculo más pequeño? Marca dónde estabas y dónde aterriza cada lanzamiento.',
    ),
    reference: { label: 'Foldable Flight • Crescent Boomerang tutorial', url: 'https://www.youtube.com/watch?v=PAp6CToFr3Y' },
    field: {
      step: 6,
      variant: 'Crescent Boomerang',
      landmark: local('The locked nose', 'Закреплённый нос', 'La punta bloqueada'),
      look: local(
        'Find the small tip tucked under the big flaps: it holds the doubled leading edges shut.',
        'Найдите маленький кончик, заправленный под большие клапаны: он держит двойные передние кромки.',
        'Busca la puntita metida bajo las solapas grandes: mantiene cerrados los bordes delanteros dobles.',
      ),
      fold: local(
        'Fold 7 · Lift the tip that shows below the flaps and tuck it in.',
        'Сгиб 7 · Поднимите кончик под клапанами и заправьте его.',
        'Doblez 7 · Sube la punta que asoma bajo las solapas y métela.',
      ),
      finish: local(
        'Look for the crescent bands that curve across both wings.',
        'Найдите полосы-полумесяцы, изогнутые через оба крыла.',
        'Busca las franjas en forma de luna creciente que cruzan las dos alas.',
      ),
      museum: { label: 'Red Bull • Paper Wings World Final 2022 results', url: 'https://www.redbull.com/int-en/red-bull-paper-wings-world-final-results' },
    },
    keel_mm: 24,
    keel_range: [18, 30],
    winglet_mm: 10,
    winglet_range: [6, 14],
    code: 'CB·22',
    colors: ['#3b4fb8', '#f29c38', '#2aa198'],
    motif: 'crescent',
  },
  {
    model_id: 'sky-king',
    record: true,
    launch: local(
      'For practice, push it gently and level at shoulder height. For time, throw it hard nearly straight up and let it level off.',
      'Для тренировки мягко запускайте горизонтально с уровня плеч. На время бросайте сильно, почти вертикально вверх, и дайте модели выровняться.',
      'Para practicar, empújalo suave y a nivel a la altura del hombro. Para buscar tiempo, lánzalo fuerte casi en vertical y deja que se enderece.',
    ),
    designer: local('Takuo Toda', 'Такуо Тода', 'Takuo Toda'),
    name: local('Snub Nose', 'Курносик', 'Nariz chata'),
    original: 'Sky King',
    inspiration: local(
      'Based on the Sky King by Takuo Toda',
      'По мотивам Sky King Такуо Тоды',
      'Basado en el Sky King de Takuo Toda',
    ),
    origin: originCountryName('sky-king'),
    character: local('Blunt nose · swept edges · tail fins', 'Тупой нос · стреловидные кромки · кили', 'Punta roma · bordes en flecha · aletas'),
    history: local(
      'Takuo Toda of the Japan Origami Airplane Association designs planes folded from one uncut sheet. In 2009 a modified Sky King stayed up for 27.9 s, a Guinness record. His 2010 record, 29.2 s, used a newer design, the Sky King Zero Fighter, folded from A5. Today’s record, 31.2 s from 2026, belongs to another team. It is based on the A4 Sky King taught to everyone, which most airtime finalists flew in 2022. This is Open Flight’s version of it.',
      'Такуо Тода из Японской ассоциации оригами-самолётов складывает модели из одного неразрезанного листа. В 2009 году доработанный Sky King продержался в воздухе 27,9 с — рекорд Guinness. Рекорд 2010 года, 29,2 с, поставлен с более новой моделью — Sky King Zero Fighter из листа A5. Нынешний рекорд, 31,2 с с 2026 года, принадлежит другой команде. Он основан на классическом Sky King из листа A4; в 2022 году на нём летали большинство финалистов в категории «время полёта». Здесь — версия Open Flight.',
      'Takuo Toda, de la Asociación Japonesa de Aviones de Origami, diseña aviones plegados con una hoja sin cortes. En 2009 un Sky King modificado se mantuvo 27,9 s en el aire, un récord Guinness. Su récord de 2010, 29,2 s, se hizo con un diseño más nuevo, el Sky King Zero Fighter, plegado en A5. El récord actual, 31,2 s desde 2026, es de otro equipo. Se basa en el Sky King en A4 que se enseña a todo el mundo; en 2022 lo usaron la mayoría de finalistas de tiempo de vuelo. Esta es la versión de Open Flight.',
    ),
    experiment: local(
      'Fold one. Launch it five times gently and level with flat back edges, then curl both back edges up slightly and launch five more. Predict first: which version dives and which climbs? Count the seconds in the air and mark each landing.',
      'Сложите одну модель. Мягко запустите её пять раз горизонтально с ровными задними кромками, затем слегка подогните обе кромки вверх и запустите ещё пять раз. Сначала предскажите: какой вариант пикирует, а какой задирает нос? Считайте секунды в воздухе и отмечайте посадки.',
      'Pliega uno. Lánzalo cinco veces suave y a nivel con los bordes de atrás planos; luego levanta un poco los dos bordes y lánzalo cinco veces más. Predice primero: ¿qué versión cae en picado y cuál sube? Cuenta los segundos en el aire y marca cada aterrizaje.',
    ),
    reference: { label: 'PPO • Sky King tutorial (A4)', url: 'https://www.youtube.com/watch?v=JV2aMbGtmZE' },
    field: {
      step: 10,
      variant: 'Sky King',
      landmark: local('The blunt nose', 'Тупой нос', 'La punta roma'),
      look: local(
        'Look at the front from the side: the tip is folded back inside and squashed into a small, hard square.',
        'Посмотрите на нос сбоку: кончик завёрнут внутрь и расплющен в маленький твёрдый квадрат.',
        'Mira la punta de lado: está doblada hacia dentro y aplastada en un cuadradito duro.',
      ),
      fold: local(
        'Folds 10–11 · Reverse the tip inside, then squash it flat.',
        'Сгибы 10–11 · Вверните кончик внутрь и расплющите его.',
        'Dobleces 10–11 · Mete la punta hacia dentro y aplástala.',
      ),
      finish: local(
        'Look for the crown of bands that meets at the blunt nose.',
        'Найдите «корону» из полос, которые сходятся у тупого носа.',
        'Busca la corona de franjas que se junta en la punta roma.',
      ),
      museum: { label: 'TIME • Best Inventions of 2009: the Sky King', url: 'https://content.time.com/time/specials/packages/article/0,28804,1934027_1934003_1933991,00.html' },
    },
    keel_mm: 15,
    keel_range: [11, 20],
    winglet_mm: 13,
    winglet_range: [8, 18],
    code: 'SK·09',
    colors: ['#d33d5b', '#2b6cb0', '#f2b134'],
    motif: 'crown',
  },
]

// Shown with every record plane: what Open Flight made and what it took from the original.
export const recordRights = local(
  'Open Flight’s version of a credited design. The diagrams, text and art are original Open Flight work, drawn from the fold geometry; the fold sequence is derived from the credited design. Nothing is copied from the videos or books. Red Bull, Guinness and the original plane names appear only as factual references; there is no endorsement.',
  'Версия Open Flight модели указанного автора. Схемы, тексты и рисунки — оригинальная работа Open Flight, выполненная по геометрии сгибов; порядок сгибов взят из указанной модели. Ничего не скопировано из видео или книг. Red Bull, Guinness и названия оригинальных моделей упомянуты только как факты; это не означает их одобрения.',
  'Versión de Open Flight de un diseño acreditado. Los esquemas, textos e ilustraciones son obra original de Open Flight, hechos a partir de la geometría de los dobleces; la secuencia de dobleces deriva del diseño acreditado. No se copia nada de los vídeos ni de los libros. Red Bull, Guinness y los nombres de los aviones originales aparecen solo como referencias; no implican respaldo.',
)

const spanishReferenceLabels = {
  'The Museum of Flight • Boeing 747-121': 'Museo del Vuelo de Seattle • Boeing 747-121',
  'Smithsonian • Douglas DC-3': 'Smithsonian • Douglas DC-3',
  'NASA • Tu-144 flight research, Fig. 1': 'NASA • Estudio de vuelo del Tu-144, fig. 1',
  'Technik Museum Sinsheim • Tupolev Tu-144': 'Museo de Tecnología de Sinsheim • Tupolev Tu-144',
  'State Aviation Museum • Il-62': 'Museo Estatal de Aviación de Kyiv • Il-62',
  'Foldable Flight • Red Dart tutorial': 'Foldable Flight • Tutorial del Red Dart',
  'Foldable Flight • Shaheen Shin tutorial': 'Foldable Flight • Tutorial del Shaheen Shin',
  'Foldable Flight • Crescent Boomerang tutorial': 'Foldable Flight • Tutorial del Crescent Boomerang',
  'PPO • Sky King tutorial (A4)': 'PPO • Tutorial del Sky King (A4)',
  'Red Bull • Paper Wings World Final 2022 results': 'Red Bull • Resultados de Paper Wings 2022',
  'Guinness World Records • Paper Wings airtime': 'Guinness World Records • Tiempo en el aire en Paper Wings',
  'TIME • Best Inventions of 2009: the Sky King': 'TIME • Mejores inventos de 2009: el Sky King',
}

export function referenceForLocale(reference, locale) {
  if (locale !== 'es') return reference
  return { ...reference, label: spanishReferenceLabels[reference.label] ?? reference.label }
}

export const sheetSizes = { A4: [210, 297], US_LETTER: [215.9, 279.4] }
export const liveries = ['heritage', 'festival', 'pencil', 'airshow']
// Revision 1 always folds the whole sheet. Revision 2 adds the sheet edge choice: 'cut' prints a
// thick border trimMm inside the paper and folds the cut-out sheet; 'whole' folds the full paper.
export { trimMm, sheetEdges } from '../print-faces.js?v=efdc141e4945'
export const revision = '2'
export const revisions = ['1', '2']
export function planeColors(model, livery) {
  if (livery === 'airshow') return {
    'boeing-747': ['#174d70','#eb7145','#ecc652'],
    'douglas-dc3': ['#205b50','#dca543','#9cc1ae'],
    'tupolev-tu144': ['#323b72','#d24062','#8caee1'],
    'ilyushin-il62': ['#2d566e','#438e9b','#e8bb60'],
    'red-dart': ['#8e1f1f','#f06a4b','#f2c14e'],
    'shaheen-shin': ['#18523b','#4aa173','#f0c75e'],
    'crescent-boomerang': ['#262f6e','#5c7de0','#f6c35b'],
    'sky-king': ['#7c2338','#e0607b','#f5d06a'],
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
