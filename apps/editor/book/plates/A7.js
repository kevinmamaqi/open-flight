// Plate A7 · Homecoming, Open Flight's version of the Crescent Boomerang flown by Seunghoon Lee. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Circle radius r = 2m / (ρ·S·CL) with ρ = 1.2 kg/m³ and CL 0.6–1.0.
// Facts and sources: docs/research/unusual-flyer-sources.md. Spanish (tú) and Russian (вы) need a native read.
import { references as shared } from './A-references.js'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A7',
  model: 'crescent-boomerang',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('15–20 min · 10 steps', '15–20 min · 10 pasos', '15–20 мин · 10 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · a ruler', '1 hoja A4 o Carta · una regla', '1 лист A4 или US Letter · линейка'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('74 mm behind the nose (A4)', 'a 74 mm de la punta (A4)', '74 мм от носа (A4)'), state: 'estimate' },
    { label: w('Circle', 'Círculo', 'Круг'), value: w('radius about 0.45–0.75 m', 'radio de unos 0,45–0,75 m', 'радиус около 0,45–0,75 м'), state: 'estimate' },
    { label: w('Original', 'Original', 'Оригинал'), value: w('Crescent Boomerang · Seunghoon Lee’s winning aerobatics, Red Bull Paper Wings 2022', 'Crescent Boomerang · acrobacias ganadoras de Seunghoon Lee, Red Bull Paper Wings 2022', 'Crescent Boomerang · победный номер Сынхуна Ли, Red Bull Paper Wings 2022'), state: null },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Returns · sideways throw · our version untested', 'Vuelve · lanzamiento de lado · nuestra versión sin probar', 'Возвращается · бросок вбок · наша версия не испытана'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Throw Homecoming on its side, wings standing up, and it flies round in a circle and comes back towards you.',
      body: [
        'Wings push the plane the way they face. Flat wings push it up. Turn the wings on their side and the push points sideways, into the middle of a circle.',
        'Bending the back edges up makes the wings work harder, and the circle gets smaller. That is how you tune it: with the back edges, not with a harder throw.',
        'The winglets at the back keep the nose pointing along the circle. Folded on A4, it should balance about 74 mm behind the nose. Our version is untested. Tell us how close it came back.',
      ],
      grownUps: [
        'Turned on its side, all the lift becomes the inward force of a circle: ½ρv²·S·CL = m·v²/r. The speed cancels, so r = 2m / (ρ·S·CL). With 4.4 g of paper and 164 cm² of wing, a lift coefficient of 0.6–1.0 gives a radius of about 0.45–0.75 m. The circle depends on mass, wing area and how hard the wing works, which the bent-up tail sets, not on how hard you throw.',
        'Homecoming is 167 mm long and 143 mm across, an aspect ratio of 1.24. Its balance point (74 mm) lies near the front of the estimated centre-of-lift range (68–104 mm), so its pitch stability is modest; one clip moves the balance to about 68 mm. The bent-up tail does two jobs: it holds the nose up so the plane does not dive, and it sets the size of the circle. These figures are estimates from the fold geometry.',
      ],
    },
    es: {
      lead: 'Lanza Regreso de lado, con las alas de pie, y volará en círculo y volverá hacia ti.',
      body: [
        'Las alas empujan el avión hacia donde miran. Las alas planas lo empujan hacia arriba. Ponlas de lado y el empujón apunta hacia un lado, hacia el centro de un círculo.',
        'Si levantas los bordes de atrás, las alas trabajan más y el círculo se hace más pequeño. Así se ajusta: con los bordes de atrás, no lanzando más fuerte.',
        'Las aletas de atrás mantienen la punta en la dirección del círculo. Plegado con una hoja A4, debería equilibrarse a unos 74 mm de la punta. Nuestra versión no se ha probado. Cuéntanos cuánto se acercó al volver.',
      ],
      grownUps: [
        'De lado, toda la sustentación se convierte en la fuerza hacia dentro de un círculo: ½ρv²·S·CL = m·v²/r. La velocidad se cancela, así que r = 2m / (ρ·S·CL). Con 4,4 g de papel y 164 cm² de ala, un coeficiente de sustentación de 0,6–1,0 da un radio de unos 0,45–0,75 m. El círculo depende de la masa, de la superficie del ala y de cuánto trabaja el ala, que fija la cola levantada, no de la fuerza del lanzamiento.',
        'Regreso mide 167 mm de largo y 143 mm de envergadura, un alargamiento de 1,24. Su equilibrio (74 mm) queda cerca del principio del margen estimado del centro de sustentación (68–104 mm), así que su estabilidad de cabeceo es modesta; un clip adelanta el equilibrio a unos 68 mm. La cola levantada hace dos cosas: sostiene la punta para que no caiga en picado y fija el tamaño del círculo. Son estimaciones a partir de la geometría de los pliegues.',
      ],
    },
    ru: {
      lead: 'Бросьте «Возвращение» на боку, с вертикальными крыльями, и оно пролетит по кругу и вернётся к вам.',
      body: [
        'Крылья толкают самолёт туда, куда они смотрят. Плоские крылья толкают вверх. Поставьте крылья на бок, и толчок направится вбок — к центру круга.',
        'Если отогнуть задние кромки вверх, крылья работают сильнее, и круг становится меньше. Так модель и настраивают: задними кромками, а не силой броска.',
        'Законцовки сзади держат нос по направлению круга. Если сложить модель из листа A4, она должна балансировать примерно в 74 мм от носа. Наша версия ещё не испытана. Расскажите, насколько близко она вернулась.',
      ],
      grownUps: [
        'На боку вся подъёмная сила становится центростремительной силой: ½ρv²·S·CL = m·v²/r. Скорость сокращается, поэтому r = 2m / (ρ·S·CL). При 4,4 г бумаги и 164 см² крыла коэффициент подъёмной силы 0,6–1,0 даёт радиус около 0,45–0,75 м. Размер круга зависит от массы, площади крыла и того, насколько сильно работает крыло — это задаёт поднятый хвост, — а не от силы броска.',
        'Длина «Возвращения» 167 мм, размах 143 мм, удлинение 1,24. Точка равновесия (74 мм) лежит у переднего края расчётного диапазона центра подъёмной силы (68–104 мм), поэтому устойчивость по тангажу скромная; одна скрепка сдвигает равновесие примерно к 68 мм. Поднятый хвост делает два дела: не даёт носу опуститься и задаёт размер круга. Это оценки по геометрии сгибов.',
      ],
    },
  },
  why: {
    en: {
      title: 'Where it comes from',
      body: [
        'Seunghoon Lee, a science teacher from South Korea, won the aerobatics final of Red Bull Paper Wings on 14 May 2022 with a one-minute routine, and this boomerang came back to his hand. We found no named designer: his channel WePlay published the same fold in 2018, and “Crescent Boomerang” appears to be Foldable Flight’s name for it.',
        'Homecoming is Open Flight’s version of it. The fold sequence is derived from that design; the diagrams, text and art are our own, drawn from the fold geometry. Nothing is copied from the videos. Red Bull appears only as a fact; there is no endorsement.',
      ],
      borrows: 'It borrows the locked, doubled nose, the slanted wing roots and the winglets of the Crescent Boomerang.',
    },
    es: {
      title: 'De dónde viene',
      body: [
        'Seunghoon Lee, profesor de ciencias de Corea del Sur, ganó la final de acrobacias de Red Bull Paper Wings el 14 de mayo de 2022 con una actuación de un minuto, y este bumerán volvía a su mano. No encontramos el nombre de quien lo diseñó: su canal WePlay publicó el mismo plegado en 2018, y «Crescent Boomerang» parece ser el nombre que le da Foldable Flight.',
        'Regreso es la versión de Open Flight. La secuencia de dobleces deriva de ese diseño; los esquemas, textos e ilustraciones son nuestros, hechos a partir de la geometría de los dobleces. No se copia nada de los vídeos. Red Bull aparece solo como dato; no implica respaldo.',
      ],
      borrows: 'Toma del Crescent Boomerang la punta doble bloqueada, la base inclinada de las alas y las aletas.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Сынхун Ли, учитель естествознания из Южной Кореи, выиграл финал Red Bull Paper Wings по аэробатике 14 мая 2022 года с минутным номером, и этот бумеранг возвращался ему в руку. Имени автора модели мы не нашли: канал Ли WePlay показал тот же сгиб в 2018 году, а название Crescent Boomerang, по-видимому, дали в Foldable Flight.',
        '«Возвращение» — версия Open Flight. Порядок сгибов взят из этой модели; схемы, тексты и рисунки — наши, по геометрии сгибов. Из видео ничего не скопировано. Red Bull упомянут только как факт; это не означает одобрения.',
      ],
      borrows: 'Модель берёт у Crescent Boomerang закреплённый двойной нос, наклонные основания крыльев и законцовки.',
    },
  },
  tryThis: {
    en: {
      question: 'Does the tail set the size of the circle?',
      prediction: 'Predict first: with both back edges bent up, will the circle get bigger or smaller?',
      steps: [
        'Fold one Homecoming and stand at a mark on the floor.',
        'Throw it on its side five times with flat back edges. Mark each landing.',
        'Bend both back edges up along their whole length.',
        'Throw five more times the same way and mark the landings.',
        'Measure how far each mark is from where you stood.',
      ],
      lookFor: 'Look for landings closer to your mark with the bent tail, and for dives if the wings are not flat.',
    },
    es: {
      question: '¿La cola decide el tamaño del círculo?',
      prediction: 'Predice primero: con los dos bordes de atrás levantados, ¿el círculo será más grande o más pequeño?',
      steps: [
        'Pliega un Regreso y ponte sobre una marca en el suelo.',
        'Lánzalo de lado cinco veces con los bordes de atrás planos. Marca cada aterrizaje.',
        'Levanta los dos bordes de atrás a lo largo.',
        'Lánzalo cinco veces más igual y marca los aterrizajes.',
        'Mide a qué distancia de tu marca queda cada aterrizaje.',
      ],
      lookFor: 'Fíjate si con la cola levantada aterriza más cerca de tu marca, y si cae en picado cuando las alas no están planas.',
    },
    ru: {
      question: 'Задаёт ли хвост размер круга?',
      prediction: 'Сначала предскажите: если отогнуть обе задние кромки вверх, круг станет больше или меньше?',
      steps: [
        'Сложите одно «Возвращение» и встаньте на отметку на полу.',
        'Бросьте его на боку пять раз с ровными задними кромками. Отметьте каждую посадку.',
        'Отогните обе задние кромки вверх по всей длине.',
        'Бросьте ещё пять раз так же и отметьте посадки.',
        'Измерьте, насколько каждая отметка отстоит от места, где вы стояли.',
      ],
      lookFor: 'Смотрите, приземляется ли модель ближе к вам с поднятым хвостом и не пикирует ли, если крылья не плоские.',
    },
  },
  references: [
    shared.forces, shared.elevator, shared.rotations,
    {
      label: 'Red Bull · Red Bull Paper Wings World Final 2022 results',
      url: 'https://www.redbull.com/int-en/red-bull-paper-wings-world-final-results',
      note: w('Seunghoon Lee first in aerobatics with 46 points.', 'Seunghoon Lee, primero en acrobacias con 46 puntos.', 'Сынхун Ли — первый в аэробатике с 46 баллами.'),
    },
    {
      label: 'WePlay · Boomerang plane (2018)',
      url: 'https://www.youtube.com/watch?v=qP8FrPScgos',
      note: w('The same fold, published four years before the final; no designer named.', 'El mismo plegado, publicado cuatro años antes de la final; sin autor.', 'Тот же сгиб, опубликованный за четыре года до финала; автор не указан.'),
    },
    {
      label: 'Foldable Flight · Crescent Boomerang tutorial (2022)',
      url: 'https://www.youtube.com/watch?v=PAp6CToFr3Y',
      note: w('The fold sequence our diagrams are derived from.', 'La secuencia de dobleces de la que derivan nuestros esquemas.', 'Последовательность сгибов, по которой построены наши схемы.'),
    },
  ],
}
