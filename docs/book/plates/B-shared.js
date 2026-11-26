// Blocks shared by the three butterfly plates (B1-B3). Numbers come from the same
// generated module as the figure, so the plate and the figure cannot disagree.
// Spanish (tú) and Russian (вы, «язычки» for the tabs) need a native read before release.
import { butterflyData } from '../figures/butterfly-data.js?v=cab232a23c6b'

export const w = (en, es, ru) => ({ en, es, ru })
const dec = v => w(v.toFixed(1), v.toFixed(1).replace('.', ','), v.toFixed(1).replace('.', ','))
const pct = v => Math.round(v * 100)

/** At-a-glance rows: what you need, then the model numbers with their evidence state. */
export function butterflyGlance(model) {
  const d = butterflyData[model]
  const v = dec(d.glide_speed_m_s)
  return [
    { label: w('Paper', 'Papel', 'Бумага'), value: w('120 g/m², wings along the long side', '120 g/m², alas a lo largo del lado largo', '120 г/м², крылья вдоль длинной стороны'), state: null },
    { label: w('Clips', 'Clips', 'Скрепки'), value: w('Two 33 mm metal clips, a glue stick', 'Dos clips metálicos de 33 mm, pegamento de barra', 'Две металлические скрепки по 33 мм, клей-карандаш'), state: null },
    { label: w('Wingspan', 'Envergadura', 'Размах крыльев'), value: w(d.span_mm + ' mm', d.span_mm + ' mm', d.span_mm + ' мм'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w(d.dots_mm + ' mm behind the head', 'a ' + d.dots_mm + ' mm de la cabeza', d.dots_mm + ' мм за головой'), state: 'estimate' },
    { label: w('Glide speed', 'Velocidad de planeo', 'Скорость планирования'), value: w('about ' + v.en + ' m/s', 'unos ' + v.es + ' m/s', 'около ' + v.ru + ' м/с'), state: 'estimate' },
    { label: w('Recorded flights', 'Vuelos registrados', 'Записанные полёты'), value: w('None yet', 'Ninguno todavía', 'Пока нет'), state: 'not-yet-measured' },
  ]
}

/** How it flies: the same physics for all three, with each species' own numbers. */
export function butterflyFlight(model) {
  const d = butterflyData[model]
  const lift = Math.round(d.lift_point_mm), gap = lift - d.dots_mm
  const [wl, v] = [dec(d.wing_loading_n_m2), dec(d.glide_speed_m_s)]
  const k1 = pct(d.k1_static_margin), k3 = pct(d.static_margin), sweep = Math.round(d.sweep_deg)
  return {
    en: {
      lead: 'Your butterfly is a glider with no tail. Its wings must hold it up and keep it steady, so where it balances matters more than anything else.',
      body: [
        `Two points matter. The balance point is where it balances on your fingertips. The lift point is where the air pushes up on the wings, on average. On this butterfly our model puts the balance target ${d.dots_mm} mm behind the head and the lift point ${lift} mm behind it: ${gap} mm apart, balance first. When the balance point is a little in front of the lift point, the butterfly glides steadily. When it is behind, the nose rises, the butterfly slows and drops.`,
        `The wings are swept back like a paper dart, about ${sweep}° at the front edge. That moves the lift point back, behind the head, so the two clips on the head can sit in front of it. The forewings overlap the hindwings, the way a gliding butterfly holds them.`,
        'The tabs at the back set the angle. Bent up a little, they make the air push the tail down, so the nose lifts and the wings can make lift. The V shape of the wings helps it roll back to level.',
        'This is our fourth fold. The earlier ones did not fly well in the founder’s informal tries; those were observations, not recorded trials. This one gets its balance from swept wings instead of a long head. Build it and tell us how it flies.',
      ],
      grownUps: [
        `A glider with no tail flies steadily when its balance point is in front of its neutral point, the spot where extra lift acts when the nose tips up. On a flat wing that spot sits about a quarter of the way back from the front edge, averaged over the wing’s area. The gap between the two points, as a share of the wing’s average depth, is called the static margin. Our flat-wing model gives the first fold (K1) a margin of ${k1}% on 80 g/m² with one clip: not steady. It gives this dart version (K3) +${k3}% with two 33 mm clips on 120 g/m² paper. Almost all of that comes from the sweep; the folded nose and deep body add a little, and the doubled front edges are there to stiffen the swept wings.`,
        'Being steady is not enough. A perfectly flat wing balanced in front of its neutral point can settle only where it makes no lift, so it dives. Bending the tabs at the back up a little, which engineers call reflex, makes the air push the tail down, so the wing glides nose-up and makes lift. Tailless aircraft solve the same problem with bent-up back edges, swept wings and twisted wings. Early in aviation, Igo Etrich and Franz Wels built a tailless glider modelled on the winged seed of the vine Alsomitra macrocarpa, then called Zanonia.',
        `Each square metre of wing holds up about ${wl.en} newtons of weight (${wl.en} N/m²). At a lift coefficient of 0.6, a measure of how hard the wing works, that predicts a glide near ${v.en} m/s, about a jog, which is why the launch is a smooth push at jogging speed, not a walk. Paper bends: with the grain along the span, the model predicts the tips bend about ${Math.round(d.tip_bend_mm)} mm in a steady glide (1 g) on 120 g/m² and about ${Math.round(d.tip_bend_80_mm)} mm on 80 g/m². Every number here is a model estimate, not a measurement.`,
      ],
    },
    es: {
      lead: 'Tu mariposa es un planeador sin cola. Sus alas tienen que sostenerla y mantenerla estable, así que el punto donde se equilibra importa más que nada.',
      body: [
        `Hay dos puntos importantes. El punto de equilibrio es donde se sostiene sobre tus dedos. El punto de sustentación es donde, de media, el aire empuja las alas hacia arriba. En esta mariposa, nuestro modelo sitúa el equilibrio a ${d.dots_mm} mm de la cabeza y la sustentación a ${lift} mm: ${gap} mm de separación, con el equilibrio delante. Si el equilibrio queda un poco por delante, planea estable. Si queda detrás, el morro sube, se frena y cae.`,
        `Las alas van hacia atrás como en un dardo de papel, unos ${sweep}° en el borde delantero. Así el punto de sustentación se desplaza hacia atrás, detrás de la cabeza, y los dos clips de la cabeza quedan delante de él. Las alas delanteras cubren las traseras, como las lleva una mariposa cuando planea.`,
        'Las aletas de atrás fijan el ángulo. Dobladas un poco hacia arriba, hacen que el aire empuje la cola hacia abajo, el morro sube y las alas sustentan. La forma de V ayuda a que vuelva a ponerse horizontal.',
        'Es nuestro cuarto pliegue. Los anteriores no volaron bien en las pruebas informales del fundador; fueron observaciones, no pruebas registradas. Este consigue el equilibrio con alas hacia atrás en lugar de una cabeza larga. Constrúyelo y cuéntanos cómo vuela.',
      ],
      grownUps: [
        `Un planeador sin cola vuela estable cuando su punto de equilibrio está por delante de su punto neutro, el lugar donde actúa la sustentación extra cuando el morro se levanta. En un ala plana ese punto está a un cuarto de la distancia desde el borde delantero, de media sobre el área del ala. La distancia entre los dos puntos, como fracción de la anchura media del ala, se llama margen estático. Nuestro modelo de ala plana da al primer pliegue (K1) un margen del ${k1} % en papel de 80 g/m² con un clip: no es estable. A esta versión dardo (K3) le da +${k3} % con dos clips de 33 mm en papel de 120 g/m². Casi todo viene de la flecha de las alas; la punta plegada y el cuerpo alto suman un poco, y los bordes delanteros dobles sirven para dar rigidez a las alas.`,
        'Ser estable no basta. Un ala totalmente plana equilibrada por delante de su punto neutro solo puede asentarse donde no sustenta, así que cae en picado. Doblar un poco hacia arriba las aletas traseras, lo que los ingenieros llaman reflex, hace que el aire empuje la cola hacia abajo, y el ala planea con el morro alto y sustenta. Las alas volantes resuelven lo mismo con bordes traseros levantados, alas en flecha y alas torcidas. En los primeros años de la aviación, Igo Etrich y Franz Wels construyeron un planeador sin cola inspirado en la semilla alada de la liana Alsomitra macrocarpa, entonces llamada Zanonia.',
        `Cada metro cuadrado de ala sostiene unos ${wl.es} newtons de peso (${wl.es} N/m²). Con un coeficiente de sustentación de 0,6, una medida de cuánto trabaja el ala, eso predice un planeo cercano a ${v.es} m/s, como un trote; por eso se lanza con un empujón suave a velocidad de trote, no al paso. El papel se dobla: con la fibra a lo largo de la envergadura, el modelo predice que las puntas se doblan unos ${Math.round(d.tip_bend_mm)} mm en planeo estable (1 g) en papel de 120 g/m² y unos ${Math.round(d.tip_bend_80_mm)} mm en papel de 80 g/m². Todas estas cifras son estimaciones del modelo, no medidas.`,
      ],
    },
    ru: {
      lead: 'Ваша бабочка — планер без хвоста. Крылья должны и держать её, и делать полёт устойчивым, поэтому важнее всего, где у неё точка равновесия.',
      body: [
        `Важны две точки. Точка равновесия — там, где модель балансирует на пальцах. Точка подъёмной силы — там, где воздух в среднем давит на крылья вверх. Для этой бабочки наша модель даёт точку равновесия в ${d.dots_mm} мм за головой, а точку подъёмной силы — в ${lift} мм: ${gap} мм разницы, равновесие впереди. Если равновесие чуть впереди точки подъёмной силы, бабочка планирует ровно. Если позади, нос задирается, она теряет скорость и падает.`,
        `Крылья отведены назад, как у бумажного дротика, — передняя кромка под углом около ${sweep}°. Так точка подъёмной силы уходит назад, за голову, и две скрепки на голове оказываются впереди неё. Передние крылья заходят на задние, как у бабочки, когда она планирует.`,
        'Язычки сзади задают угол. Если чуть отогнуть их вверх, воздух давит хвост вниз, нос поднимается, и крылья создают подъёмную силу. V-образные крылья помогают бабочке выровняться после крена.',
        'Это наш четвёртый вариант. Прежние плохо летали в неформальных пробах основателя; это были наблюдения, а не записанные испытания. Здесь равновесие дают отведённые назад крылья, а не длинная голова. Соберите её и расскажите нам, как она летает.',
      ],
      grownUps: [
        `Бесхвостый планер летит устойчиво, когда точка равновесия находится впереди нейтральной точки — места, где действует добавочная подъёмная сила, когда нос приподнимается. У плоского крыла эта точка примерно на четверти ширины от передней кромки, в среднем по площади крыла. Расстояние между двумя точками в долях средней ширины крыла называют запасом устойчивости. Наша модель плоского крыла даёт первому варианту (K1) ${k1} % на бумаге 80 г/м² с одной скрепкой: неустойчиво. Версии-дротику (K3) она даёт +${k3} % с двумя скрепками по 33 мм на бумаге 120 г/м². Почти всё это — заслуга стреловидности; сложенный нос и высокий корпус добавляют немного, а двойные передние кромки нужны для жёсткости крыльев.`,
        'Одной устойчивости мало. Совершенно плоское крыло с равновесием впереди нейтральной точки может уравновеситься только там, где не даёт подъёмной силы, и модель пикирует. Если чуть отогнуть вверх язычки сзади — инженеры называют это реверсом профиля, — воздух прижмёт хвост вниз, и крыло будет планировать с поднятым носом и создавать подъёмную силу. Бесхвостые самолёты решают ту же задачу отогнутыми вверх задними кромками, стреловидными и закрученными крыльями. В первые годы авиации Иго Этрих и Франц Вельс построили бесхвостый планер по образцу крылатого семени лианы Alsomitra macrocarpa, которую тогда называли Zanonia.',
        `Каждый квадратный метр крыла держит около ${wl.ru} ньютона веса (${wl.ru} Н/м²). При коэффициенте подъёмной силы 0,6 — это мера того, насколько усердно работает крыло, — получается скорость планирования около ${v.ru} м/с, как у лёгкого бега; поэтому модель запускают плавным толчком со скоростью бега, а не шага. Бумага гнётся: при волокнах вдоль размаха модель даёт прогиб кончиков около ${Math.round(d.tip_bend_mm)} мм в ровном планировании (1 g) на бумаге 120 г/м² и около ${Math.round(d.tip_bend_80_mm)} мм на 80 г/м². Все числа здесь — оценки модели, а не измерения.`,
      ],
    },
  }
}

/** Sources every butterfly plate cites for the flight physics and the K3 model. */
export const butterflyReferences = [
  { label: 'Open Flight, K3 dart butterfly: design and model (docs/research/butterfly-k3-dart.md)', url: 'https://github.com/kevinmamaqi/open-flight/blob/main/docs/research/butterfly-k3-dart.md',
    note: w('Our current fold, its estimates and limits. CC BY-SA 4.0.', 'Nuestro pliegue actual, sus estimaciones y límites. CC BY-SA 4.0.', 'Наш текущий вариант, его оценки и ограничения. CC BY-SA 4.0.') },
  { label: 'Open Flight, K2 butterfly airframe: the earlier fold and the flight model (docs/research/butterfly-k2-airframe.md)', url: 'https://github.com/kevinmamaqi/open-flight/blob/main/docs/research/butterfly-k2-airframe.md',
    note: w('Our model and its limits. CC BY-SA 4.0.', 'Nuestro modelo y sus límites. CC BY-SA 4.0.', 'Наша модель и её ограничения. CC BY-SA 4.0.') },
  { label: 'NASA Glenn Research Center, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/learn-about-aerodynamics/',
    note: w('Lift, balance and stability. US government text: paraphrased, linked.', 'Sustentación, equilibrio y estabilidad. Texto del gobierno de EE. UU.: parafraseado y enlazado.', 'Подъёмная сила, равновесие, устойчивость. Текст правительства США: пересказ со ссылкой.') },
  { label: 'Li, Goodwill, Wang & Ristroph (2022). Centre of mass location, flight modes, stability and dynamic modelling of gliders. J. Fluid Mech. 937, A6. doi:10.1017/jfm.2022.89', url: 'https://doi.org/10.1017/jfm.2022.89',
    note: w('Moving the balance point turns a glide into a dive or a tumble. CC BY 4.0.', 'Mover el equilibrio convierte un planeo en picado o en volteretas. CC BY 4.0.', 'Сдвиг центра тяжести превращает планирование в пике или кувырки. CC BY 4.0.') },
]
