// Plate A2 · Prairie Skipper, after the Douglas DC-3. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Spanish (tú) and Russian (вы) are drafts and need a native read before release.
// Editor: source the near-vertical airtime launch before adding it to print.
import { references as shared } from './A-references.js?v=eb901ca27c79'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A2',
  model: 'douglas-dc3',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('15–20 min · 7 steps', '15–20 min · 7 pasos', '15–20 мин · 7 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · scissors · 1–2 paper clips', '1 hoja A4 o Carta · tijeras · 1–2 clips', '1 лист A4 или US Letter · ножницы · 1–2 скрепки'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('121 mm behind the nose (A4)', 'a 121 mm del morro (A4)', '121 мм от носа (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('148 mm, tips folded up (A4)', '148 mm, con las puntas dobladas (A4)', '148 мм с поднятыми законцовками (A4)'), state: 'estimate' },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Slowest glider · gentle throw · untested', 'El planeador más lento · lanzamiento suave · sin probar', 'Самый медленный планёр · мягкий бросок · не испытан'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Prairie Skipper has the biggest wing in the fleet for the same sheet of paper. A big, light wing can fly slowly, so it can stay up a long time.',
      body: [
        'Your throw starts it. Then it glides downhill through the air while weight pulls and drag slows it.',
        'The rolled front edge does two jobs. It makes the front of the wing stiff, and it puts three layers of paper across the front 12 mm.',
        'The thing that matters most is balance. Folded on A4, it should balance about 121 mm behind the nose. Our estimate says that may be too far back for such a broad wing, so keep a paper clip ready. If it climbs and stalls, slide the clip onto the nose before you bend the back edges. This design is untested. Tell us how it flew.',
      ],
      grownUps: [
        'Prairie Skipper’s aspect ratio, a measure of how long and slim a wing is, is 0.61, about a fifteenth of the real DC-3’s 9 (29 m span, 92 m² of wing). Each square metre of wing carries about 123 g (1.2 N/m²), the least of the four, so the model predicts a glide of roughly 1.8–2.6 m/s. The balance point sits 44 % of the way along the wing’s average depth. A simple flat-wing model puts the neutral point, the spot where extra lift acts when the nose tips up, at 46 mm, and the middle of the wing area at 137 mm. So the plane can only be steady if swirls of air along its side edges add lift further back when it flies nose-high. Expect it to fly slowly and nose-high, and to want weight on the nose: one clip should bring the balance to about 110 mm. The 8 mm tips stop air spilling round the wing ends and work as small fins behind the balance point. All of these figures are estimates from the fold geometry.',
        'Contest category: airtime. Contests ask for an uncut sheet, so practise with the whole-sheet build, not the cut border. At home, time gentle launches; a broad, soft wing like this one may not survive a hard throw.',
      ],
    },
    es: {
      lead: 'Planeador de la pradera tiene el ala más grande de la flota con la misma hoja de papel. Un ala grande y ligera puede volar despacio, así que puede mantenerse mucho tiempo en el aire.',
      body: [
        'Tu lanzamiento lo pone en marcha. Después planea cuesta abajo por el aire mientras el peso tira de él y la resistencia lo frena.',
        'El borde delantero enrollado hace dos trabajos. Pone rígida la parte delantera del ala y coloca tres capas de papel en los primeros 12 mm.',
        'Lo más importante es el equilibrio. Plegado con una hoja A4, debería equilibrarse a unos 121 mm del morro. Según nuestra estimación, puede estar demasiado atrás para un ala tan ancha, así que ten un clip a mano. Si sube y se desploma, pon el clip en el morro antes de doblar los bordes traseros. Este modelo no se ha probado. Cuéntanos cómo voló.',
      ],
      grownUps: [
        'El alargamiento de Planeador de la pradera, una medida de lo larga y estrecha que es un ala, es 0,61, más o menos una quinceava parte del 9 del DC-3 real (29 m de envergadura, 92 m² de ala). Cada metro cuadrado de ala lleva unos 123 g (1,2 N/m²), lo menos de los cuatro, así que el modelo predice un planeo de unos 1,8–2,6 m/s. El punto de equilibrio está al 44 % de la anchura media del ala. Un modelo sencillo de ala plana sitúa el punto neutro, el lugar donde actúa la sustentación extra cuando el morro se levanta, a 46 mm, y el centro del área del ala a 137 mm. Así que el avión solo puede ser estable si los remolinos de aire de sus bordes laterales añaden sustentación más atrás cuando vuela con el morro alto. Es de esperar que vuele despacio y con el morro alto, y que necesite peso en el morro: con un clip debería equilibrarse a unos 110 mm. Las puntas de 8 mm evitan que el aire se escape por los extremos del ala y hacen de pequeñas derivas detrás del punto de equilibrio. Todas estas cifras son estimaciones a partir de la geometría de los pliegues.',
        'Categoría de competición: tiempo de vuelo. Las competiciones piden una hoja sin cortar, así que entrena con la versión de hoja entera, no con el borde recortado. En casa, cronometra lanzamientos suaves; un ala ancha y blanda como esta puede no aguantar un lanzamiento fuerte.',
      ],
    },
    ru: {
      lead: 'У «Лугового планёра» самое большое крыло во всём звене из такого же листа. Большое лёгкое крыло может лететь медленно, поэтому долго держится в воздухе.',
      body: [
        'Ваш бросок даёт ему начальную скорость. Дальше он планирует вниз: вес тянет его, а сопротивление тормозит.',
        'Свёрнутая передняя кромка делает две работы. Она придаёт жёсткость передней части крыла и кладёт три слоя бумаги на первые 12 мм.',
        'Главное — балансировка. Если сложить его из листа A4, он должен балансировать примерно в 121 мм от носа. По нашей оценке, для такого широкого крыла это может быть слишком далеко назад, поэтому держите скрепку наготове. Если самолёт взмывает и сваливается, наденьте её на нос, прежде чем отгибать задние кромки. Эта модель ещё не испытана. Расскажите, как она полетела.',
      ],
      grownUps: [
        'Удлинение «Лугового планёра» — мера того, насколько крыло длинное и узкое, — 0,61, примерно в пятнадцать раз меньше, чем 9 у настоящего DC-3 (размах 29 м, площадь крыла 92 м²). Каждый квадратный метр крыла несёт около 123 г (1,2 Н/м²) — меньше всех из четырёх, поэтому модель даёт скорость планирования примерно 1,8–2,6 м/с. Точка равновесия находится на 44 % средней ширины крыла. Простая модель плоского крыла ставит нейтральную точку — место, где действует добавочная подъёмная сила, когда нос приподнимается, — в 46 мм, а середину площади крыла — в 137 мм. Поэтому самолёт устойчив, только если вихри воздуха у боковых кромок добавляют подъёмную силу дальше назад, когда он летит с поднятым носом. Ожидайте медленного полёта с поднятым носом и потребности в грузе на носу: с одной скрепкой точка равновесия должна сместиться примерно к 110 мм. Законцовки по 8 мм не дают воздуху перетекать через концы крыла и работают как маленькие кили позади точки равновесия. Все эти цифры — оценки по геометрии сгибов.',
        'Соревновательная дисциплина: время полёта. На соревнованиях нужен неразрезанный лист, поэтому тренируйтесь с версией из целого листа, а не с вырезанной по рамке. Дома засекайте время мягких запусков: широкое мягкое крыло может не выдержать сильного броска.',
      ],
    },
  },
  why: {
    en: {
      title: 'Why it exists',
      body: [
        'Rolling the front edge over itself is a common trick in paper gliders. It makes a stiff, heavy front edge. Prairie Skipper also folds in its shoulders, which leaves a broad, almost square wing.',
        'Its name points to the Douglas DC-3, a 1930s airliner that helped airlines earn money by carrying passengers. The first version flew on 17 December 1935, with beds for overnight passengers. The likeness is in spirit only. The DC-3’s wing is long and slender, about nine times as long as it is wide. The paper wing is shorter than the plane is long.',
      ],
      borrows: 'It borrows the DC-3’s gentle, patient flying, not its long, slender wing.',
    },
    es: {
      title: 'Por qué existe',
      body: [
        'Enrollar el borde delantero sobre sí mismo es un truco habitual en los planeadores de papel. Crea un borde delantero rígido y pesado. Planeador de la pradera además pliega sus hombros hacia dentro, y deja un ala ancha, casi cuadrada.',
        'Su nombre recuerda al Douglas DC-3, un avión de pasajeros de los años treinta que ayudó a las aerolíneas a ganar dinero transportando viajeros. La primera versión voló el 17 de diciembre de 1935, con camas para los viajes de noche. El parecido es solo de espíritu. El ala del DC-3 es larga y estrecha, unas nueve veces más larga que ancha. El ala de papel es más corta que el propio avión.',
      ],
      borrows: 'Toma del DC-3 su vuelo tranquilo y paciente, no su ala larga y estrecha.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Свернуть переднюю кромку саму на себя — обычный приём для бумажных планёров. Так получается жёсткая тяжёлая передняя кромка. «Луговой планёр» ещё и подгибает плечи внутрь, и остаётся широкое, почти квадратное крыло.',
        'Название отсылает к Douglas DC-3, пассажирскому самолёту 1930-х годов, на котором авиакомпании начали зарабатывать на перевозке пассажиров. Первая версия взлетела 17 декабря 1935 года, со спальными местами для ночных рейсов. Сходство — только в характере. Крыло DC-3 длинное и узкое, примерно в девять раз длиннее своей ширины. Бумажное крыло короче самого самолёта.',
      ],
      borrows: 'От DC-3 модель берёт спокойный, терпеливый полёт, а не длинное узкое крыло.',
    },
  },
  tryThis: {
    en: {
      question: 'Which one sinks more slowly?',
      prediction: 'Predict first: after a gentle launch, which stays up longer, Prairie Skipper or Delta Comet? Our prediction is Prairie Skipper, if it is well balanced. Its wing is 60 % bigger for the same sheet, so it can fly more slowly.',
      steps: [
        'Fold a Prairie Skipper and a Delta Comet from the same paper.',
        'Balance each on a pencil. Add a clip to the Skipper if it balances behind 121 mm.',
        'Launch each five times from the same height, with the same gentle push.',
        'Time each flight with a stopwatch, from release to the first touch.',
        'Write down every stall.',
      ],
      lookFor: 'Look for a slow, flat glide. If it swoops and stalls, add a clip and try again.',
    },
    es: {
      question: '¿Cuál baja más despacio?',
      prediction: 'Predice primero: tras un lanzamiento suave, ¿cuál aguanta más en el aire, Planeador de la pradera o Cometa delta? Nuestra predicción es el Planeador de la pradera, si está bien equilibrado. Su ala es un 60 % más grande con la misma hoja, así que puede volar más despacio.',
      steps: [
        'Pliega un Planeador de la pradera y un Cometa delta con el mismo papel.',
        'Equilibra cada uno sobre un lápiz. Pon un clip al Planeador si se equilibra por detrás de 121 mm.',
        'Lanza cada uno cinco veces desde la misma altura, con el mismo empujón suave.',
        'Cronometra cada vuelo, desde que lo sueltas hasta que toca algo por primera vez.',
        'Anota cada desplome.',
      ],
      lookFor: 'Busca un planeo lento y recto. Si sube y se desploma, pon un clip y prueba otra vez.',
    },
    ru: {
      question: 'Какая модель снижается медленнее?',
      prediction: 'Сначала предскажите: после мягкого запуска кто продержится в воздухе дольше — «Луговой планёр» или «Дельта-комета»? Мы предсказываем «Луговой планёр», если он хорошо сбалансирован. Его крыло на 60 % больше при том же листе, поэтому он может лететь медленнее.',
      steps: [
        'Сложите «Луговой планёр» и «Дельта-комету» из одинаковой бумаги.',
        'Положите каждый на карандаш. Если «Луговой планёр» балансирует дальше 121 мм от носа, наденьте на нос скрепку.',
        'Запустите каждый пять раз с одной высоты одинаковым мягким толчком.',
        'Засекайте время каждого полёта: от броска до первого касания.',
        'Записывайте каждое сваливание.',
      ],
      lookFor: 'Смотрите, планирует ли модель медленно и ровно. Если взмывает и сваливается, наденьте скрепку и попробуйте снова.',
    },
  },
  references: [
    shared.wing, shared.gliders, shared.cg,
    {
      label: 'Smithsonian National Air and Space Museum · Douglas DC-3',
      url: 'https://www.si.edu/object/nasm_A19530075000',
      note: w('The real aircraft and its long wing.', 'El avión real y su ala larga.', 'Настоящий самолёт и его длинное крыло.'),
    },
    shared.torres,
  ],
}
