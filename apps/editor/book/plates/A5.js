// Plate A5 · Needle, Open Flight's version of the Red Dart by Lazar Krstić. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Facts and sources: docs/research/unusual-flyer-sources.md. Spanish (tú) and Russian (вы) need a native read.
import { references as shared } from './A-references.js'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A5',
  model: 'red-dart',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('20–30 min · 11 steps', '20–30 min · 11 pasos', '20–30 мин · 11 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 · a ruler · a pencil', '1 hoja A4 · una regla · un lápiz', '1 лист A4 · линейка · карандаш'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('98 mm behind the nose (A4)', 'a 98 mm de la punta (A4)', '98 мм от носа (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('23 mm on a 187 mm body (A4)', '23 mm en un cuerpo de 187 mm (A4)', '23 мм при длине 187 мм (A4)'), state: 'estimate' },
    { label: w('Original', 'Original', 'Оригинал'), value: w('Red Dart by Lazar Krstić · 61.11 m, Red Bull Paper Wings 2022', 'Red Dart de Lazar Krstić · 61,11 m, Red Bull Paper Wings 2022', 'Red Dart Лазара Крстича · 61,11 м, Red Bull Paper Wings 2022'), state: null },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Dart · hard, level throw · our version untested', 'Dardo · lanzamiento fuerte y a nivel · nuestra versión sin probar', 'Дротик · сильный ровный бросок · наша версия не испытана'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Needle hardly glides at all. Your arm gives it all its speed, and it keeps that speed for as long as it can, like a thrown javelin.',
      body: [
        'Almost the whole sheet is wrapped round one narrow triangle. That makes a hard, thin body with tiny wings. There is very little to rub against the air, so it slows down slowly.',
        'The wraps stack paper at the front. Folded on A4, Needle should balance about 98 mm behind the nose, well ahead of its small wings. A dart balanced that far forward points itself along its path, like an arrow.',
        'It needs a long room or a calm day outside, and a firm, level throw. Never throw it towards anyone: the nose is sharp. Our version is untested. Tell us how far it went.',
      ],
      grownUps: [
        'Needle is 187 mm long and only 23 mm across the wings, an aspect ratio of 0.24. Its 21 cm² of wing carry 4.4 g of paper, about 2.1 kg per square metre: seven times the load of the gliders in this chapter. At a lift coefficient of 0.6 that means 7–8 m/s just to stay up, so it flies on the speed of the throw, not on its wings. The balance point (98 mm) sits about 20 % of the wing’s average depth ahead of the estimated centre of lift (122–125 mm): very stable, which is what a distance dart wants. These figures are estimates from the fold geometry.',
        'A distance throw is mostly a ballistic flight: the arm gives the energy in a fraction of a second and drag spends it. A glider with big wings would climb, slow down and float; a dart keeps its speed. Contest rules for distance ask for one standard A4 sheet, folded without cuts, so practise with the whole-sheet build.',
      ],
    },
    es: {
      lead: 'Aguja casi no planea. Tu brazo le da toda su velocidad, y ella la conserva todo lo que puede, como una jabalina.',
      body: [
        'Casi toda la hoja se envuelve alrededor de un triángulo estrecho. Así queda un cuerpo duro y fino con alas diminutas. Hay muy poco que roce con el aire, así que se frena despacio.',
        'Las vueltas acumulan papel delante. Plegada con una hoja A4, Aguja debería equilibrarse a unos 98 mm de la punta, muy por delante de sus alas pequeñas. Un dardo equilibrado tan adelante se orienta solo en su trayectoria, como una flecha.',
        'Necesita una sala larga o un día sin viento al aire libre, y un lanzamiento firme y a nivel. No la lances nunca hacia nadie: la punta es afilada. Nuestra versión no se ha probado. Cuéntanos hasta dónde llegó.',
      ],
      grownUps: [
        'Aguja mide 187 mm de largo y solo 23 mm de envergadura: un alargamiento de 0,24. Sus 21 cm² de ala llevan 4,4 g de papel, unos 2,1 kg por metro cuadrado: siete veces la carga de los planeadores de este capítulo. Con un coeficiente de sustentación de 0,6 necesita 7–8 m/s solo para sostenerse, así que vuela gracias a la velocidad del lanzamiento, no a sus alas. El equilibrio (98 mm) queda alrededor de un 20 % de la anchura media del ala por delante del centro de sustentación estimado (122–125 mm): muy estable, justo lo que busca un dardo de distancia. Son estimaciones a partir de la geometría de los pliegues.',
        'Un lanzamiento de distancia es sobre todo un vuelo balístico: el brazo da la energía en una fracción de segundo y la resistencia la gasta. Un planeador de alas grandes subiría, se frenaría y flotaría; un dardo conserva la velocidad. Las reglas de distancia piden una hoja A4 normal, plegada sin cortes, así que entrena con la versión de hoja entera.',
      ],
    },
    ru: {
      lead: '«Игла» почти не планирует. Всю скорость ей даёт ваша рука, и она сохраняет её как можно дольше, как брошенное копьё.',
      body: [
        'Почти весь лист обёрнут вокруг одного узкого треугольника. Получается твёрдый тонкий корпус с крошечными крыльями. Тереться о воздух почти нечему, поэтому самолёт тормозит медленно.',
        'Обороты собирают бумагу спереди. Если сложить «Иглу» из листа A4, она должна балансировать примерно в 98 мм от носа — далеко впереди своих маленьких крыльев. Дротик с таким передним центром тяжести сам разворачивается по курсу, как стрела.',
        'Ей нужна длинная комната или безветренный день на улице и сильный ровный бросок. Никогда не бросайте её в сторону людей: нос острый. Наша версия ещё не испытана. Расскажите, как далеко она улетела.',
      ],
      grownUps: [
        '«Игла» длиной 187 мм и размахом всего 23 мм: удлинение 0,24. На 21 см² крыла приходится 4,4 г бумаги — около 2,1 кг на квадратный метр, в семь раз больше, чем у планёров этой главы. При коэффициенте подъёмной силы 0,6 ей нужно 7–8 м/с, чтобы просто держаться в воздухе, так что она летит за счёт скорости броска, а не крыльев. Точка равновесия (98 мм) лежит примерно на 20 % средней ширины крыла впереди расчётного центра подъёмной силы (122–125 мм): очень устойчиво — именно это нужно дротику на дальность. Это оценки по геометрии сгибов.',
        'Бросок на дальность — в основном баллистический полёт: рука отдаёт энергию за доли секунды, а сопротивление воздуха её тратит. Планёр с большими крыльями взмыл бы, потерял скорость и поплыл; дротик скорость сохраняет. Правила соревнований на дальность требуют один стандартный лист A4 без разрезов, поэтому тренируйтесь с версией из целого листа.',
      ],
    },
  },
  why: {
    en: {
      title: 'Where it comes from',
      body: [
        'Lazar Krstić from Serbia won the distance final of Red Bull Paper Wings at Hangar-7 in Salzburg on 14 May 2022 with a throw of 61.11 m. Guinness lists it as the farthest throw at that championship; the overall distance record belongs to other designs. Foldable Flight teaches his plane as the “Red Dart”.',
        'Needle is Open Flight’s version of it. The fold sequence is derived from Krstić’s design; the diagrams, text and art are our own, drawn from the fold geometry. Nothing is copied from the videos. Red Bull and Guinness appear only as facts; there is no endorsement.',
      ],
      borrows: 'It borrows the whole fold of the Red Dart: every crease after the first pivots on one point, which becomes the nose.',
    },
    es: {
      title: 'De dónde viene',
      body: [
        'Lazar Krstić, de Serbia, ganó la final de distancia de Red Bull Paper Wings en el Hangar-7 de Salzburgo el 14 de mayo de 2022 con un lanzamiento de 61,11 m. Guinness lo registra como el lanzamiento más largo de ese campeonato; el récord absoluto de distancia es de otros diseños. Foldable Flight enseña su avión como «Red Dart».',
        'Aguja es la versión de Open Flight. La secuencia de dobleces deriva del diseño de Krstić; los esquemas, textos e ilustraciones son nuestros, hechos a partir de la geometría de los dobleces. No se copia nada de los vídeos. Red Bull y Guinness aparecen solo como datos; no implican respaldo.',
      ],
      borrows: 'Toma todo el plegado del Red Dart: cada doblez después del primero gira sobre un mismo punto, que acaba siendo la punta.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Лазар Крстич из Сербии выиграл финал Red Bull Paper Wings на дальность в «Ангаре-7» в Зальцбурге 14 мая 2022 года броском на 61,11 м. Guinness называет его самым дальним броском этого чемпионата; общий рекорд дальности принадлежит другим моделям. Foldable Flight показывает его самолёт под названием Red Dart.',
        '«Игла» — версия Open Flight. Порядок сгибов взят из модели Крстича; схемы, тексты и рисунки — наши, по геометрии сгибов. Из видео ничего не скопировано. Red Bull и Guinness упомянуты только как факты; это не означает их одобрения.',
      ],
      borrows: 'Модель берёт весь сгиб Red Dart: каждый сгиб после первого проходит через одну точку, которая становится носом.',
    },
  },
  tryThis: {
    en: {
      question: 'Do tight wraps fly straighter?',
      prediction: 'Predict first: which copy lands closer to a straight line, the loose one or the tight one?',
      steps: [
        'Fold two Needles from the same paper: wrap one loosely and one as tightly as you can.',
        'Mark a straight line on the floor from where you stand.',
        'Throw each copy five times along the line with the same hard, level push.',
        'Mark where each one first touches the floor.',
        'Measure how far each mark is from the line.',
      ],
      lookFor: 'Look for wide curves from the loose copy: a layer that lifts in flight works like a small rudder.',
    },
    es: {
      question: '¿Las vueltas apretadas vuelan más recto?',
      prediction: 'Predice primero: ¿qué copia aterriza más cerca de una línea recta, la floja o la apretada?',
      steps: [
        'Pliega dos Agujas con el mismo papel: una con vueltas flojas y otra lo más apretada que puedas.',
        'Marca en el suelo una línea recta desde donde estás.',
        'Lanza cada copia cinco veces a lo largo de la línea, con el mismo empujón fuerte y a nivel.',
        'Marca dónde toca el suelo cada una por primera vez.',
        'Mide a qué distancia de la línea queda cada marca.',
      ],
      lookFor: 'Fíjate en las curvas amplias de la copia floja: una capa que se levanta en el aire hace de timón.',
    },
    ru: {
      question: 'Летят ли плотные обороты прямее?',
      prediction: 'Сначала предскажите: какая копия приземлится ближе к прямой линии — рыхлая или плотная?',
      steps: [
        'Сложите две «Иглы» из одинаковой бумаги: одну оберните рыхло, другую — как можно плотнее.',
        'Отметьте на полу прямую линию от места, где вы стоите.',
        'Бросьте каждую копию пять раз вдоль линии одинаково сильно и ровно.',
        'Отметьте, где каждая впервые коснулась пола.',
        'Измерьте, насколько каждая отметка отстоит от линии.',
      ],
      lookFor: 'Смотрите, не уходит ли рыхлая копия широкой дугой: отставший в полёте слой работает как маленький руль.',
    },
  },
  references: [
    shared.forces, shared.cg, shared.gliders,
    {
      label: 'Red Bull · Red Bull Paper Wings World Final 2022 results',
      url: 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results',
      note: w('The distance podium and Krstić’s two throws.', 'El podio de distancia y los dos lanzamientos de Krstić.', 'Пьедестал в дисциплине на дальность и два броска Крстича.'),
    },
    {
      label: 'Guinness World Records · Farthest throw at the Red Bull Paper Plane Championship',
      url: 'https://www.guinnessworldrecords.com/world-records/729614-farthest-throw-at-the-red-bull-paper-plane-championship',
      note: w('61.11 m, 14 May 2022.', '61,11 m, 14 de mayo de 2022.', '61,11 м, 14 мая 2022 года.'),
    },
    {
      label: 'Foldable Flight · Red Dart tutorial (2022)',
      url: 'https://www.youtube.com/watch?v=4D6HZRaVFF8',
      note: w('The fold sequence our diagrams are derived from.', 'La secuencia de dobleces de la que derivan nuestros esquemas.', 'Последовательность сгибов, по которой построены наши схемы.'),
    },
  ],
}
