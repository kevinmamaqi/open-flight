// Plate A3 · Tailwind, after the Ilyushin Il-62. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Spanish (tú) and Russian (вы) are drafts and need a native read before release.
// Editor: replace the tail-strut source (currently general knowledge) with an Ilyushin or museum source before print.
import { references as shared } from './A-references.js?v=71e84a390ddb'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A3',
  model: 'ilyushin-il62',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('15–20 min · 7 steps', '15–20 min · 7 pasos', '15–20 мин · 7 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · scissors · a ruler', '1 hoja A4 o Carta · tijeras · una regla', '1 лист A4 или US Letter · ножницы · линейка'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('135 mm behind the nose (A4)', 'a 135 mm del morro (A4)', '135 мм от носа (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('132 mm, tips folded up (A4)', '132 mm, con las puntas dobladas (A4)', '132 мм с поднятыми законцовками (A4)'), state: 'estimate' },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Straight flyer · steady throw · untested', 'Vuelo recto · lanzamiento firme · sin probar', 'Прямой полёт · ровный бросок · не испытан'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Tailwind sits between the dart and the glider. Its tall tips keep it pointing into the air, like the feathers on an arrow.',
      body: [
        'A folded band adds weight to the front edge. Two folds sweep the wings back. Your throw starts it, then it glides while weight pulls and drag slows it.',
        'Its 10 mm tips are the tallest in the fleet. They sit behind the balance point. If the nose swings to one side, the air pushes on the tips and swings it back.',
        'The thing that matters most is equal tips. If one tip stands taller or leans, it steers the plane like a rudder. Folded on A4, it should balance about 135 mm behind the nose. This design is untested. Tell us how it flew.',
      ],
      grownUps: [
        'Tailwind’s aspect ratio, a measure of how long and slim a wing is, is 0.75, and its front edges sweep back at 58.5°. The balance point sits 28 % of the way along the wing’s average depth. That is between the neutral point from a simple flat-wing model (118 mm, 18 %) and the middle of the wing area (175 mm, 50 %), so the plane should be just steady at gliding angles. A hard throw makes the wing meet the air at a flatter angle, moves the push of the air forwards and may make it climb. The tips keep the nose pointing into the wind, like a weathervane, and stop air spilling round the wing ends. Because they stand above the wing, they also help the V roll the plane back to level. The deep 22 mm body below the wing works the other way: side area below the balance point makes it a little slower to level. Flattening the tips gives 15 % more span and 10 % more wing: a slower sink, but a less straight path. All of these figures are estimates from the fold geometry.',
        'Contest category: accuracy and target flying, and indoor distance from a steady throw.',
      ],
    },
    es: {
      lead: 'Viento de cola está entre el dardo y el planeador. Sus puntas altas lo mantienen apuntando hacia el aire, como las plumas de una flecha.',
      body: [
        'Una tira doblada añade peso al borde delantero. Dos pliegues inclinan las alas hacia atrás. Tu lanzamiento lo pone en marcha y después planea mientras el peso tira de él y la resistencia lo frena.',
        'Sus puntas de 10 mm son las más altas de la flota. Están detrás del punto de equilibrio. Si el morro se desvía hacia un lado, el aire empuja las puntas y lo endereza.',
        'Lo más importante es que las puntas sean iguales. Si una punta está más alta o inclinada, dirige el avión como un timón. Plegado con una hoja A4, debería equilibrarse a unos 135 mm del morro. Este modelo no se ha probado. Cuéntanos cómo voló.',
      ],
      grownUps: [
        'El alargamiento de Viento de cola, una medida de lo larga y estrecha que es un ala, es 0,75, y sus bordes delanteros van inclinados hacia atrás 58,5°. El punto de equilibrio está al 28 % de la anchura media del ala. Queda entre el punto neutro de un modelo sencillo de ala plana (118 mm, 18 %) y el centro del área del ala (175 mm, 50 %), así que el avión debería ser justo estable en planeo. Un lanzamiento fuerte hace que el ala reciba el aire con un ángulo más plano, adelanta el empuje del aire y puede hacer que suba. Las puntas mantienen el morro hacia el viento, como una veleta, y evitan que el aire se escape por los extremos del ala. Como están por encima del ala, también ayudan a la V a devolver el avión a nivel. El cuerpo profundo de 22 mm bajo el ala actúa al revés: la superficie lateral por debajo del punto de equilibrio hace que tarde un poco más en nivelarse. Aplanar las puntas da un 15 % más de envergadura y un 10 % más de ala: un descenso más lento, pero un vuelo menos recto. Todas estas cifras son estimaciones a partir de la geometría de los pliegues.',
        'Categoría de competición: puntería y vuelo a un blanco, y distancia en interior con un lanzamiento firme.',
      ],
    },
    ru: {
      lead: '«Попутный ветер» — нечто среднее между дротиком и планёром. Высокие законцовки держат его носом по потоку, как оперение стрелы.',
      body: [
        'Подогнутая полоса утяжеляет переднюю кромку. Два сгиба отводят крылья назад. Ваш бросок даёт ему скорость, а дальше он планирует: вес тянет его, а сопротивление тормозит.',
        'Его законцовки по 10 мм — самые высокие во всём звене. Они стоят позади точки равновесия. Если нос уходит в сторону, воздух давит на законцовки и возвращает его.',
        'Главное — одинаковые законцовки. Если одна выше другой или наклонена, она поворачивает самолёт, как руль. Если сложить его из листа A4, он должен балансировать примерно в 135 мм от носа. Эта модель ещё не испытана. Расскажите, как она полетела.',
      ],
      grownUps: [
        'Удлинение «Попутного ветра» — мера того, насколько крыло длинное и узкое, — 0,75, а передние кромки отведены назад на 58,5°. Точка равновесия находится на 28 % средней ширины крыла. Это между нейтральной точкой простой модели плоского крыла (118 мм, 18 %) и серединой площади крыла (175 мм, 50 %), поэтому на углах планирования самолёт должен быть едва устойчив. Сильный бросок заставляет крыло встречать воздух под более пологим углом, сдвигает давление воздуха вперёд и может заставить самолёт взмыть. Законцовки держат нос по ветру, как флюгер, и не дают воздуху перетекать через концы крыла. Поскольку они стоят над крылом, они ещё и помогают углу V выравнивать крен. Глубокий корпус 22 мм под крылом действует наоборот: боковая площадь ниже точки равновесия немного замедляет выравнивание. Если распрямить законцовки, размах вырастет на 15 %, а площадь крыла — на 10 %: снижение медленнее, но полёт менее прямой. Все эти цифры — оценки по геометрии сгибов.',
        'Соревновательная дисциплина: точность и полёт в цель, а также дальность в помещении при ровном броске.',
      ],
    },
  },
  why: {
    en: {
      title: 'Why it exists',
      body: [
        'Tailwind is an Open Flight variation that mixes two families. The folded front band comes from gliders. The swept shoulders come from darts.',
        'Its name points to the Ilyushin Il-62, a long-range jet that first flew in January 1963. The Il-62 carried its four engines at the tail. With so much weight at the back, an empty Il-62 could tip onto its tail on the ground, so it lowered a small extra strut under the tail when parked. Balance matters for every aircraft. The paper plane has no engines and no tail. The paired stripes on its wings are a reminder of the engines.',
      ],
      borrows: 'It borrows the Il-62’s swept wing and its lesson about balance.',
    },
    es: {
      title: 'Por qué existe',
      body: [
        'Viento de cola es una variante de Open Flight que mezcla dos familias. La tira doblada del frente viene de los planeadores. Los hombros inclinados vienen de los dardos.',
        'Su nombre recuerda al Ilyushin Il-62, un reactor de largo alcance que voló por primera vez en enero de 1963. El Il-62 llevaba sus cuatro motores junto a la cola. Con tanto peso atrás, un Il-62 vacío podía apoyarse sobre la cola en tierra, así que al aparcar bajaba un pequeño puntal bajo la cola. El equilibrio importa en cualquier aeronave. El avión de papel no tiene motores ni cola. Las franjas por pares de sus alas recuerdan los motores.',
      ],
      borrows: 'Toma del Il-62 el ala en flecha y su lección sobre el equilibrio.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        '«Попутный ветер» — вариант Open Flight, в котором смешаны два семейства. Подогнутая передняя полоса пришла от планёров. Стреловидные плечи — от дротиков.',
        'Название отсылает к Ил-62, дальнему реактивному самолёту, который впервые взлетел в январе 1963 года. Четыре двигателя Ил-62 стояли у хвоста. Из-за большого веса сзади пустой Ил-62 мог опрокинуться на хвост, поэтому на стоянке под хвост выпускалась небольшая дополнительная опора. Балансировка важна для любого летательного аппарата. У бумажной модели нет ни двигателей, ни хвоста. Парные полосы на её крыльях напоминают о двигателях.',
      ],
      borrows: 'От Ил-62 модель берёт стреловидное крыло и урок о балансировке.',
    },
  },
  tryThis: {
    en: {
      question: 'Are tall tips worth it?',
      prediction: 'Predict first: which lands inside the lane more often? Our prediction is the copy with tips. Its wings are 20 mm shorter, though, so it may land a little sooner.',
      steps: [
        'Fold one Tailwind with flat tips and one with 10 mm tips.',
        'Lay a 1 m wide lane on the floor with two strings.',
        'Give each five level launches from the same spot.',
        'Record every landing left or right of the lane.',
        'Change no other fold until you have compared both.',
      ],
      lookFor: 'Look for a straight flight inside the lane. A turn means a tip is leaning: check both from behind.',
    },
    es: {
      question: '¿Valen la pena las puntas altas?',
      prediction: 'Predice primero: ¿cuál aterriza más veces dentro del pasillo? Nuestra predicción es la copia con puntas. Pero sus alas son 20 mm más cortas, así que puede aterrizar un poco antes.',
      steps: [
        'Pliega un Viento de cola con las puntas planas y otro con puntas de 10 mm.',
        'Marca en el suelo un pasillo de 1 m de ancho con dos cuerdas.',
        'Lanza cada uno cinco veces a nivel desde el mismo sitio.',
        'Anota cada aterrizaje a la izquierda o a la derecha del pasillo.',
        'No cambies ningún otro pliegue hasta comparar los dos.',
      ],
      lookFor: 'Busca un vuelo recto dentro del pasillo. Si gira, una punta está inclinada: mira las dos desde atrás.',
    },
    ru: {
      question: 'Нужны ли высокие законцовки?',
      prediction: 'Сначала предскажите: какая модель чаще приземлится внутри дорожки? Мы предсказываем модель с законцовками. Но её крылья на 20 мм короче, поэтому она может сесть чуть раньше.',
      steps: [
        'Сложите один «Попутный ветер» с плоскими законцовками и один — с законцовками по 10 мм.',
        'Разметьте на полу дорожку шириной 1 м двумя верёвками.',
        'Запустите каждый пять раз горизонтально с одного места.',
        'Записывайте каждую посадку левее или правее дорожки.',
        'Не меняйте другие сгибы, пока не сравните оба самолёта.',
      ],
      lookFor: 'Смотрите, летит ли модель прямо внутри дорожки. Если поворачивает, одна законцовка наклонена: проверьте обе сзади.',
    },
  },
  references: [
    shared.wing, shared.rotations, shared.cg,
    {
      label: 'State Aviation Museum, Kyiv · Il-62',
      url: 'https://aviamuseum.com.ua/ru/exposition/exposition/kb-ilyushina/173-il-62',
      note: w('The real aircraft, with its four engines at the tail.', 'El avión real, con sus cuatro motores junto a la cola.', 'Настоящий самолёт с четырьмя двигателями у хвоста.'),
    },
  ],
}
