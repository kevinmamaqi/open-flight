// How to launch and trim each design, in English, Spanish and Russian.
// One source for the design pages, Print & Play sheets and the book.
// Rows are ordered by importance: a printed sheet shows the first three.
// The fixes follow how paper gliders behave. None has been tested on these
// designs yet, so every table carries `trimNote`. Spanish and Russian need a
// native read (Russian uses вы, as BRAND.md says).
const w = (en, es, ru) => ({ en, es, ru })
const row = (see, fix) => ({ see, fix })

export const flightNoteLabels = {
  launch: w('Launch it', 'Lánzalo', 'Запуск'),
  trim: w('Trim it', 'Ajústalo', 'Настройка'),
  see: w('If it…', 'Si…', 'Если модель…'),
  fix: w('Try this', 'Prueba esto', 'Попробуйте'),
  trimNote: w(
    'What to try. These fixes follow how paper gliders behave. They have not yet been tested on this design.',
    'Qué probar. Estos ajustes siguen cómo se comportan los planeadores de papel. Aún no se han probado en este modelo.',
    'Что попробовать. Эти советы основаны на поведении бумажных планёров. На этой модели их ещё не проверяли.',
  ),
}

const plane = {
  dive: row(
    w('Dives into the floor', 'Cae en picado', 'Пикирует в пол'),
    w('Bend up the back 15 mm of each wing, next to the body, until the back corner sits 1 mm above the wing. Still diving: bend 1 mm more.',
      'Dobla hacia arriba los últimos 15 mm de cada ala, junto al cuerpo, hasta que la esquina trasera quede 1 mm por encima del ala. Si sigue cayendo, dobla 1 mm más.',
      'Отогните вверх задние 15 мм каждого крыла у корпуса, чтобы задний угол поднялся на 1 мм над крылом. Если всё ещё пикирует, отогните ещё на 1 мм.'),
  ),
  swoop: row(
    w('Swoops up, stops, then drops', 'Sube, se frena y cae', 'Взмывает, замирает и падает'),
    w('Flatten the back edges a little and throw more gently. Still swooping: slide a paper clip onto the nose.',
      'Aplana un poco los bordes traseros y lánzalo con más suavidad. Si sigue igual, pon un clip en el morro.',
      'Немного распрямите задние кромки и бросайте мягче. Не помогло — наденьте скрепку на нос.'),
  ),
  left: row(
    w('Turns left', 'Gira a la izquierda', 'Поворачивает влево'),
    w('Look from behind and make both wings, both tips and the V match. Then bend the back edge of the right wing up 1 mm.',
      'Míralo desde atrás e iguala las dos alas, las dos puntas y la V. Después dobla 1 mm hacia arriba el borde trasero del ala derecha.',
      'Посмотрите сзади: оба крыла, обе законцовки и угол V должны совпадать. Затем отогните вверх на 1 мм заднюю кромку правого крыла.'),
  ),
  right: row(
    w('Turns right', 'Gira a la derecha', 'Поворачивает вправо'),
    w('Make both sides match. Then bend the back edge of the left wing up 1 mm.',
      'Iguala los dos lados. Después dobla 1 mm hacia arriba el borde trasero del ala izquierda.',
      'Сделайте обе стороны одинаковыми. Затем отогните вверх на 1 мм заднюю кромку левого крыла.'),
  ),
  roll: row(
    w('Rolls over and spirals down', 'Se vuelca y baja en espiral', 'Переворачивается и уходит в спираль'),
    w('Lift each tip to about 10 mm above the body fold, both at the same height.',
      'Levanta cada punta unos 10 mm por encima del pliegue del cuerpo, las dos a la misma altura.',
      'Поднимите каждую законцовку примерно на 10 мм над сгибом корпуса, обе на одну высоту.'),
  ),
  rock: row(
    w('Rocks from side to side', 'Se balancea de lado a lado', 'Раскачивается с крыла на крыло'),
    w('Flatten the V a little and check that the tips stand upright.',
      'Aplana un poco la V y comprueba que las puntas estén rectas.',
      'Немного уменьшите угол V и проверьте, что законцовки стоят прямо.'),
  ),
}

const butterflyLaunch = w(
  'Hold the body under the wings between finger and thumb, nose level. Stand still in a room without draughts. Push forward smoothly, about as fast as a jog, and let go. Do not throw it upward. Mark where it first touches the floor.',
  'Sujeta el cuerpo por debajo de las alas entre el índice y el pulgar, con el morro recto. Quédate quieto en una sala sin corrientes. Empújala hacia delante con suavidad, a la velocidad de un trote, y suéltala. No la lances hacia arriba. Marca dónde toca el suelo por primera vez.',
  'Держите корпус под крыльями большим и указательным пальцами, нос горизонтально. Встаньте неподвижно в комнате без сквозняков. Плавно толкните модель вперёд, примерно со скоростью лёгкого бега, и отпустите. Не бросайте вверх. Отметьте место первого касания пола.',
)
const butterflyTrim = [
  row(w('Dives into the floor', 'Cae en picado', 'Пикирует в пол'),
    w('Bend both tabs up 1–2 mm. Still diving: slide one clip back a little. It must still balance on the dots.',
      'Dobla las dos aletas 1–2 mm hacia arriba. Si sigue cayendo, mueve un clip un poco hacia atrás. Debe seguir equilibrándose sobre los puntos.',
      'Отогните оба язычка вверх на 1–2 мм. Если всё ещё пикирует, сдвиньте одну скрепку немного назад. Модель должна по-прежнему балансировать на точках.')),
  row(w('Swoops up, slows, then drops', 'Sube, se frena y cae', 'Взмывает, теряет скорость и падает'),
    w('Flatten both tabs. Check that it balances on the dots.',
      'Aplana las dos aletas. Comprueba que se equilibra sobre los puntos.',
      'Выпрямите оба язычка. Проверьте, что модель балансирует на точках.')),
  row(w('Turns to one side', 'Gira hacia un lado', 'Поворачивает в сторону'),
    w('Bend the tab on the outside of the turn up a little: the right tab for a left turn, the left tab for a right turn.',
      'Dobla un poco hacia arriba la aleta del lado exterior del giro: la derecha si gira a la izquierda, la izquierda si gira a la derecha.',
      'Немного отогните вверх язычок с внешней стороны поворота: правый, если модель уходит влево, левый — если вправо.')),
  row(w('Drops straight after launch', 'Cae nada más soltarla', 'Падает сразу после запуска'),
    w('Push a little faster. Then check the tabs.',
      'Empújala un poco más rápido. Después revisa las aletas.',
      'Толкайте чуть быстрее. Затем проверьте язычки.')),
  row(w('Rolls over or spirals', 'Se vuelca o baja en espiral', 'Переворачивается или уходит в спираль'),
    w('Check both tips on the strip: same height. Then raise both a little.',
      'Mide las dos puntas con la tira: deben tener la misma altura. Después levanta las dos un poco.',
      'Проверьте полоской высоту обоих кончиков: она должна быть одинаковой. Затем немного поднимите оба.')),
  row(w('The wings flap or droop', 'Las alas aletean o se caen', 'Крылья хлопают или провисают'),
    w('Glue the tan front strips under the wings. Use 120 g/m² paper with the wings along the long side. Try a smaller span.',
      'Pega con pegamento de barra las tiras beige bajo las alas. Usa papel de 120 g/m² con las alas a lo largo del lado largo. Prueba una envergadura menor.',
      'Приклейте бежевые полоски под крыльями клеем-карандашом. Возьмите бумагу 120 г/м², крылья вдоль длинной стороны листа. Попробуйте меньший размах.')),
]

export const flightNotes = {
  'boeing-747': {
    launch: w(
      'Pinch the body under the wings, near the balance point. Hold it at shoulder height, nose level, and push it forward smoothly at walking speed. Do not throw hard: broad wings climb, slow down and drop when they go too fast.',
      'Sujeta el cuerpo por debajo de las alas, cerca del punto de equilibrio. Sostenlo a la altura del hombro, con el morro recto, y empújalo hacia delante con suavidad, a paso de caminar. No lo lances fuerte: las alas anchas suben, se frenan y caen cuando van demasiado rápido.',
      'Возьмите корпус снизу, под крыльями, ближе к точке равновесия. Держите его на уровне плеча, нос горизонтально, и плавно толкните вперёд со скоростью шага. Не бросайте сильно: на большой скорости широкие крылья задирают нос, теряют скорость и падают.',
    ),
    trim: [
      row(w('Swoops up and drops', 'Sube y cae', 'Взмывает и падает'),
        w('Slide one paper clip onto the nose before you touch the back edges. With one clip it should balance about 103 mm behind the nose (estimate).',
          'Pon un clip en el morro antes de tocar los bordes traseros. Con un clip debería equilibrarse a unos 103 mm del morro (estimación).',
          'Наденьте одну скрепку на нос, прежде чем трогать задние кромки. Со скрепкой точка равновесия должна быть примерно в 103 мм от носа (оценка).')),
      plane.dive, plane.roll, plane.left, plane.right, plane.rock,
    ],
  },
  'douglas-dc3': {
    launch: w(
      'Pinch the body under the wings. Hold it at shoulder height with the nose level or a little down. Push it forward gently, at walking speed, and let it find its own speed.',
      'Sujeta el cuerpo por debajo de las alas. Sostenlo a la altura del hombro, con el morro recto o un poco hacia abajo. Empújalo con suavidad, a paso de caminar, y deja que encuentre su propia velocidad.',
      'Возьмите корпус снизу, под крыльями. Держите его на уровне плеча, нос горизонтально или чуть вниз. Мягко толкните вперёд со скоростью шага и дайте модели самой найти свою скорость.',
    ),
    trim: [
      row(w('Swoops and stalls', 'Sube y se desploma', 'Взмывает и сваливается'),
        w('Slide one paper clip onto the nose. It should then balance about 110 mm behind the nose (estimate).',
          'Pon un clip en el morro. Así debería equilibrarse a unos 110 mm del morro (estimación).',
          'Наденьте одну скрепку на нос. Тогда точка равновесия должна быть примерно в 110 мм от носа (оценка).')),
      row(w('Turns or drops a wing right after launch', 'Gira o baja un ala nada más soltarlo', 'Сразу после запуска поворачивает или опускает крыло'),
        w('Sight along the front edge. A twisted cuff steers the plane, so flatten it before you bend anything else.',
          'Mira a lo largo del borde delantero. Un borde enrollado torcido desvía el avión: enderézalo antes de doblar nada más.',
          'Посмотрите вдоль передней кромки. Перекрученный валик уводит самолёт, поэтому выпрямите его, прежде чем что-то отгибать.')),
      plane.dive, plane.roll, plane.rock,
    ],
  },
  'ilyushin-il62': {
    launch: w(
      'Pinch the body under the wings and hold it level at shoulder height. Throw at a steady, medium speed, as if you were passing a ball to someone 3 m away.',
      'Sujeta el cuerpo por debajo de las alas y sostenlo recto a la altura del hombro. Lánzalo a una velocidad media y constante, como si pasaras una pelota a alguien a 3 m.',
      'Возьмите корпус снизу, под крыльями, и держите его ровно на уровне плеча. Бросайте с ровной средней скоростью, как будто передаёте мяч человеку в 3 м от вас.',
    ),
    trim: [
      row(w('Turns either way', 'Gira hacia un lado', 'Поворачивает в любую сторону'),
        w('Look from behind first. Both tips should stand straight up and measure 10 mm. A leaning tip works like a rudder.',
          'Míralo primero desde atrás. Las dos puntas deben estar rectas y medir 10 mm. Una punta inclinada hace de timón.',
          'Сначала посмотрите сзади. Обе законцовки должны стоять прямо и иметь высоту 10 мм. Наклонённая законцовка работает как руль.')),
      plane.dive, plane.swoop, plane.roll, plane.rock,
    ],
  },
  'tupolev-tu144': {
    launch: w(
      'Pinch the body under the wings, near the balance point. Throw firmly and straight, with the nose a little above level. Use a long room or a calm day outdoors, and throw away from faces: the nose is pointed.',
      'Sujeta el cuerpo por debajo de las alas, cerca del punto de equilibrio. Lánzalo fuerte y recto, con el morro un poco por encima de la horizontal. Usa una sala larga o un día sin viento al aire libre, y nunca lo lances hacia la cara de nadie: la punta es afilada.',
      'Возьмите корпус снизу, под крыльями, ближе к точке равновесия. Бросайте сильно и прямо, нос чуть выше горизонта. Нужна длинная комната или безветренный день на улице. Не бросайте в сторону лиц: нос острый.',
    ),
    trim: [
      row(w('Dives', 'Cae en picado', 'Пикирует'),
        w('Bend the back edges up 1 mm, then 2 mm. Do this before anything else. Nose clips are rarely needed: one clip makes the dive worse.',
          'Dobla los bordes traseros 1 mm hacia arriba, y luego 2 mm. Hazlo antes que nada. Casi nunca hace falta un clip en el morro: con uno, cae aún más.',
          'Отогните задние кромки вверх на 1 мм, потом на 2 мм. Начните с этого. Скрепка на носу почти никогда не нужна: с ней дротик пикирует ещё сильнее.')),
      row(w('Flutters or opens in flight', 'Vibra o se abre en el aire', 'Дрожит или раскрывается в полёте'),
        w('Crease the body fold hard again.',
          'Vuelve a marcar con fuerza el pliegue del cuerpo.',
          'Ещё раз сильно прогладьте сгиб корпуса.')),
      plane.left, plane.right, plane.roll,
    ],
  },
  // Record planes: the launch that suits each design. Short, so the quick guide fits one page.
  'red-dart': {
    launch: w(
      'Hold it near the back, a finger on the back edge. Throw hard and level, like a javelin, never towards anyone.',
      'Sujétalo por detrás con un dedo en el borde trasero. Lánzalo fuerte y a nivel, como una jabalina, nunca hacia nadie.',
      'Держите за хвост, палец на задней кромке. Бросайте сильно и ровно, как копьё, и никогда в людей.',
    ),
    trim: [
      row(w('Curves away', 'Se desvía', 'Уходит в сторону'),
        w('Make the two thin wings match. Press any loose wrap flat.',
          'Iguala las dos alas finas. Aprieta las vueltas sueltas.',
          'Выровняйте оба крыла. Прижмите отставшие обороты.')),
      plane.dive, plane.roll,
    ],
  },
  'shaheen-shin': {
    launch: w(
      'Start with gentle throws at about 45°. Once it glides well, throw harder and steeper.',
      'Empieza con lanzamientos suaves a unos 45°. Cuando planee bien, lánzalo más fuerte y más alto.',
      'Начните с мягких бросков под 45°. Когда планирует хорошо, бросайте сильнее и круче.',
    ),
    trim: [
      row(w('Dives after the climb', 'Cae tras subir', 'Пикирует после подъёма'),
        w('Curl the back edge up 1 mm, then 2 mm. Stand the fins straight.',
          'Levanta el borde trasero 1 mm, luego 2 mm. Endereza las aletas.',
          'Подогните заднюю кромку на 1–2 мм. Поставьте кили ровно.')),
      plane.left, plane.right,
    ],
  },
  'crescent-boomerang': {
    launch: w(
      'Hold it with the wings vertical. Turn your body and release it sideways at chest height.',
      'Sujétalo con las alas en vertical. Gira el cuerpo y suéltalo de lado a la altura del pecho.',
      'Держите модель крыльями вертикально. Повернитесь и отпустите её вбок на уровне груди.',
    ),
    trim: [
      row(w('Does not come back', 'No vuelve', 'Не возвращается'),
        w('Bend both back edges up. More bend, smaller circle.',
          'Levanta los dos bordes traseros. Más curva, círculo más pequeño.',
          'Отогните обе задние кромки. Сильнее изгиб — меньше круг.')),
      row(w('Dives into the floor', 'Se clava en el suelo', 'Врезается в пол'),
        w('Flatten the wings, then bend the back edges up a little more.',
          'Aplana las alas y levanta un poco más los bordes traseros.',
          'Выпрямите крылья и чуть сильнее отогните задние кромки.')),
      plane.roll,
    ],
  },
  'sky-king': {
    launch: w(
      'Practise with a gentle, level push. For time, throw hard nearly straight up.',
      'Practica con un empujón suave y a nivel. Para buscar tiempo, lánzalo fuerte casi en vertical.',
      'Тренируйтесь мягким ровным запуском. На время бросайте сильно почти вертикально.',
    ),
    trim: [
      row(w('Dives', 'Cae en picado', 'Пикирует'),
        w('Curl both back edges up a little.',
          'Levanta un poco los dos bordes traseros.',
          'Чуть подогните обе задние кромки вверх.')),
      row(w('Climbs, stalls and drops', 'Sube, se frena y cae', 'Задирает нос и падает'),
        w('Flatten the back edges a little.',
          'Aplana un poco los bordes traseros.',
          'Немного выпрямите задние кромки.')),
      plane.left, plane.right,
    ],
  },
  monarch: { launch: butterflyLaunch, trim: butterflyTrim },
  morpho: { launch: butterflyLaunch, trim: butterflyTrim },
  swallowtail: { launch: butterflyLaunch, trim: butterflyTrim },
  ring: {
    launch: w(
      'Find the V between the two peaks. Hold the ring at the bottom of the V, two fingers inside and your thumb outside, with the rolled rim forward. Reach your arm back, swing it up and let go gently when your hand is beside your ear.',
      'Busca la V entre los dos picos. Sujeta el anillo por el fondo de la V, con dos dedos dentro y el pulgar fuera, y el borde enrollado hacia delante. Lleva el brazo atrás, súbelo y suéltalo con suavidad cuando la mano pase junto a la oreja.',
      'Найдите V между двумя выступами. Возьмите кольцо за дно V: два пальца внутри, большой снаружи, свёрнутый обод смотрит вперёд. Отведите руку назад, поднимите её и мягко отпустите кольцо, когда кисть окажется у уха.',
    ),
    trim: [
      row(w('Dives', 'Se clava hacia abajo', 'Пикирует'),
        w('The front is too heavy. Unroll one rim fold.', 'El frente pesa demasiado. Desenrolla un pliegue del borde.', 'Перёд слишком тяжёлый. Разверните один сгиб обода.')),
      row(w('Climbs, slows and falls back', 'Sube, se frena y cae hacia atrás', 'Набирает высоту, тормозит и падает назад'),
        w('Launch more gently. Add a rim fold.', 'Lánzalo con más suavidad. Añade un pliegue al borde.', 'Запускайте мягче. Добавьте один сгиб обода.')),
      row(w('Wobbles or turns', 'Se tambalea o gira', 'Виляет или поворачивает'),
        w('Make the ring round. Smooth the tuck so nothing sticks out.', 'Haz que el anillo quede redondo. Alisa el encaje para que nada sobresalga.', 'Сделайте кольцо круглым. Разгладьте место стыка, чтобы ничего не торчало.')),
      row(w('The ring opens', 'El anillo se abre', 'Кольцо раскрывается'),
        w('Tuck deeper, or add one small piece of tape.', 'Mete más el extremo o pon un trocito de cinta adhesiva.', 'Вставьте конец глубже или подклейте маленький кусочек скотча.')),
    ],
  },
  samara: {
    launch: w(
      'Hold the tip of the wing with the clip pointing down. Hold it as high as you safely can: a tall helper with an arm raised, about 2 m, never less than 1.5 m. Open your fingers without pushing. Watch from the side, then lie down and watch from below.',
      'Sujeta la punta del ala con el clip hacia abajo. Sostenla lo más alto que puedas sin peligro: una persona alta con el brazo en alto, a unos 2 m, y nunca a menos de 1,5 m. Abre los dedos sin empujar. Mírala de lado y después túmbate y mírala desde abajo.',
      'Возьмите крыло за кончик, скрепкой вниз. Поднимите его как можно выше без риска: помощник повыше — с поднятой рукой, примерно на 2 м, и никогда ниже 1,5 м. Разожмите пальцы, не толкая. Посмотрите сбоку, а потом лягте на пол и посмотрите снизу.',
    ),
    trim: [
      row(w('Falls straight down', 'Cae en línea recta', 'Падает отвесно'),
        w('Drop it from higher. Then curl the dotted edge a little more.', 'Suéltala desde más alto. Después curva un poco más el borde punteado.', 'Отпустите выше. Затем чуть сильнее подогните край по пунктиру.')),
      row(w('Flutters or tumbles', 'Aletea o da tumbos', 'Трепещет или кувыркается'),
        w('Put the clip at A, nearer the front edge.', 'Pon el clip en A, más cerca del borde delantero.', 'Переставьте скрепку в положение A, ближе к передней кромке.')),
      row(w('Spins but falls fast', 'Gira pero cae rápido', 'Вращается, но падает быстро'),
        w('Use lighter paper or a smaller clip. Flatten the outer half of the wing.', 'Usa papel más ligero o un clip más pequeño. Aplana la mitad exterior del ala.', 'Возьмите бумагу тоньше или скрепку меньше. Выпрямите внешнюю половину крыла.')),
      row(w('The clip slips', 'El clip se resbala', 'Скрепка соскальзывает'),
        w('Push it on further, flat against the paper.', 'Mételo más, bien plano contra el papel.', 'Наденьте её глубже, плотно к бумаге.')),
    ],
  },
  tandem: {
    launch: w(
      'Hold the keel at its middle between finger and thumb. Point the nose a little down. Push it gently forward and let go.',
      'Sujeta la quilla por el centro entre el índice y el pulgar. Apunta el morro un poco hacia abajo. Empújalo suavemente hacia delante y suéltalo.',
      'Возьмите киль посередине большим и указательным пальцами. Чуть опустите нос. Мягко толкните модель вперёд и отпустите.',
    ),
    trim: [
      row(w('Sinks almost flat or falls backwards', 'Baja casi plano o cae hacia atrás', 'Опускается почти плашмя или падает назад'),
        w('It is tail-heavy. Slide a small paper clip onto the keel just behind the nose, and move it forward until it glides.',
          'Le pesa la cola. Pon un clip pequeño en la quilla, justo detrás del morro, y adelántalo hasta que planee.',
          'Перетяжелён хвост. Наденьте маленькую скрепку на киль сразу за носом и сдвигайте её вперёд, пока модель не начнёт планировать.')),
      row(w('Plunges nose-first', 'Se clava de morro', 'Клюёт носом'),
        w('It is nose-heavy. Move the clip back, or unroll one nose fold.', 'Le pesa el morro. Mueve el clip hacia atrás o desenrolla un pliegue del morro.', 'Перетяжелён нос. Сдвиньте скрепку назад или разверните один сгиб носа.')),
      row(w('Turns', 'Gira', 'Поворачивает'),
        w('Look from behind. The back wings must line up with the front wings, left and right at the same height.',
          'Míralo desde atrás. Las alas traseras deben quedar alineadas con las delanteras, y la izquierda y la derecha a la misma altura.',
          'Посмотрите сзади. Задние крылья должны стоять точно за передними, левая и правая стороны на одной высоте.')),
      row(w('Still dives with the clip well back', 'Sigue cayendo con el clip muy atrás', 'Пикирует, хотя скрепка далеко сзади'),
        w('Bend the back edge of the rear wings up about 1 mm.', 'Dobla hacia arriba, más o menos 1 mm, el borde trasero de las alas traseras.', 'Отогните вверх примерно на 1 мм заднюю кромку задних крыльев.')),
      row(w('Rolls and spirals', 'Se vuelca y baja en espiral', 'Переворачивается и уходит в спираль'),
        w('Raise all four tips a little.', 'Levanta un poco las cuatro puntas.', 'Немного поднимите все четыре кончика крыльев.')),
      row(w('Glides, but short', 'Planea, pero poco', 'Планирует, но недалеко'),
        w('Bend the front edge of the front wings down very slightly. Williams found this can help.',
          'Dobla muy ligeramente hacia abajo el borde delantero de las alas delanteras. Williams vio que puede ayudar.',
          'Совсем чуть-чуть отогните вниз переднюю кромку передних крыльев. Уильямс заметил, что это может помочь.')),
    ],
  },
}

/** The launch line and the first `count` trim rows for one design and language. */
export function flightNotesFor(model, lang, count = Infinity) {
  const notes = flightNotes[model]
  if (!notes) throw new RangeError('No flight notes for ' + model)
  return {
    launch: notes.launch[lang],
    trim: notes.trim.slice(0, count).map(({ see, fix }) => ({ see: see[lang], fix: fix[lang] })),
    note: flightNoteLabels.trimNote[lang],
  }
}
