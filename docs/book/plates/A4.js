// Plate A4 · Delta Comet, after the Tupolev Tu-144. Content contract: ../README.md.
// The fold is the traditional paper dart; nobody knows who folded it first. Open Flight drew it
// to scale and added 4 mm tips. Numbers come from figures/airplane-balance.js (A4, cut border,
// 80 g/m²): estimates, not measurements. Records belong to the contests chapter, not here.
// Spanish (tú) and Russian (вы) are drafts and need a native read before release.
// Editor: replace the general source for the Tu-144 elevons and canards with a primary source before print.
import { references as shared } from './A-references.js?v=efdc141e4945'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A4',
  model: 'tupolev-tu144',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('10–15 min · 6 steps', '10–15 min · 6 pasos', '10–15 мин · 6 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · scissors', '1 hoja A4 o Carta · tijeras', '1 лист A4 или US Letter · ножницы'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('152 mm behind the nose (A4)', 'a 152 mm del morro (A4)', '152 мм от носа (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('152 mm, tips folded up (A4)', '152 mm, con las puntas dobladas (A4)', '152 мм с поднятыми законцовками (A4)'), state: 'estimate' },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Fast dart · firm throw · untested', 'Dardo rápido · lanzamiento fuerte · sin probar', 'Быстрый дротик · сильный бросок · не испытан'), state: 'estimate' },
    { label: w('Fold', 'Pliegue', 'Сгиб'), value: w('The traditional dart, with 4 mm tips added', 'El dardo tradicional, con puntas de 4 mm añadidas', 'Традиционный дротик с добавленными законцовками 4 мм'), state: null },
  ],
  howItFlies: {
    en: {
      lead: 'Delta Comet is the classic dart. It has the smallest wing for its paper, so it must fly fast to hold itself up.',
      body: [
        'Your throw gives it that speed. Then weight pulls it down and drag slows it, so it glides downhill.',
        'Its wing is a long triangle with most of its area at the back. The air lifts it behind the balance point, and that keeps it pointing straight, like the feathers on an arrow.',
        'The thing that matters most is the back edges. A flat dart is nose-heavy and dives. Bend the back edges up a little, and it flies flat and far. Folded on A4, it should balance about 152 mm behind the nose. This design is untested. Tell us how it flew.',
      ],
      grownUps: [
        'Delta Comet’s aspect ratio, a measure of how long and slim a wing is, is 1.03. Its front edges sweep back at 67.5°, and the wing is 240 mm deep at the body and 56 mm at the tip. The balance point is 152 mm behind the nose, 21 % of the way along the wing’s average depth. A simple flat-wing model puts the neutral point, the spot where extra lift acts when the nose tips up, at 166 mm (30 %). The gap, about +9 % of the average depth, keeps it steady. But a flat wing balanced like this would settle only where it makes no lift, so it would dive. Bending the back edges up a little makes the air push the tail down, so the plane glides with its nose slightly up and makes lift: the bent edges do the job of a big plane’s elevators. Folding corners to the centre adds layers but moves paper inwards and back, not forwards. Balance is about where the weight sits compared with the lift, not about how heavy the nose looks. At steeper angles, slim triangle wings gain extra lift from swirls of air along their front edges (Polhamus). All of these figures are estimates from the fold geometry.',
        'Each square metre of wing carries about 198 g (1.9 N/m²), so it glides at about 2–3 m/s and flies much faster when thrown. Contest category: distance. Darts tolerate hard throws. Contests ask for an uncut sheet, so practise with the whole-sheet build.',
      ],
    },
    es: {
      lead: 'Cometa delta es el dardo clásico. Tiene el ala más pequeña para su papel, así que debe volar rápido para sostenerse.',
      body: [
        'Tu lanzamiento le da esa velocidad. Después el peso tira de él y la resistencia lo frena, así que planea cuesta abajo.',
        'Su ala es un triángulo largo con casi toda la superficie atrás. El aire lo sostiene por detrás del punto de equilibrio, y eso lo mantiene recto, como las plumas de una flecha.',
        'Lo más importante son los bordes traseros. Un dardo plano pesa demasiado de morro y cae en picado. Dobla un poco hacia arriba los bordes traseros, y volará recto y lejos. Plegado con una hoja A4, debería equilibrarse a unos 152 mm del morro. Este modelo no se ha probado. Cuéntanos cómo voló.',
      ],
      grownUps: [
        'El alargamiento de Cometa delta, una medida de lo larga y estrecha que es un ala, es 1,03. Sus bordes delanteros van inclinados hacia atrás 67,5°, y el ala mide 240 mm de fondo junto al cuerpo y 56 mm en la punta. El punto de equilibrio está a 152 mm del morro, al 21 % de la anchura media del ala. Un modelo sencillo de ala plana sitúa el punto neutro, el lugar donde actúa la sustentación extra cuando el morro se levanta, a 166 mm (30 %). La diferencia, de alrededor del +9 % de la anchura media, lo mantiene estable. Pero un ala plana equilibrada así solo se asentaría donde no sustenta, así que caería en picado. Doblar un poco hacia arriba los bordes traseros hace que el aire empuje la cola hacia abajo, y el avión planea con el morro algo levantado y sustenta: los bordes doblados hacen el trabajo del timón de profundidad de un avión grande. Llevar las esquinas al centro añade capas, pero mueve el papel hacia dentro y hacia atrás, no hacia delante. El equilibrio depende de dónde está el peso respecto a la sustentación, no de lo pesado que parezca el morro. Con más ángulo, las alas en triángulo estrechas ganan sustentación extra con los remolinos de aire de sus bordes delanteros (Polhamus). Todas estas cifras son estimaciones a partir de la geometría de los pliegues.',
        'Cada metro cuadrado de ala lleva unos 198 g (1,9 N/m²), así que planea a unos 2–3 m/s y va mucho más rápido al lanzarlo. Categoría de competición: distancia. Los dardos aguantan lanzamientos fuertes. Las competiciones piden una hoja sin cortar, así que entrena con la versión de hoja entera.',
      ],
    },
    ru: {
      lead: '«Дельта-комета» — классический бумажный дротик. У неё самое маленькое крыло на такой лист, поэтому ей нужно лететь быстро, чтобы держаться в воздухе.',
      body: [
        'Ваш бросок даёт эту скорость. Дальше вес тянет её вниз, а сопротивление тормозит, и она планирует вниз.',
        'Её крыло — длинный треугольник, большая часть площади которого сзади. Воздух поднимает её позади точки равновесия, и это держит её прямо, как оперение стрелы.',
        'Главное — задние кромки. Ровный дротик перетяжелён на нос и пикирует. Отогните задние кромки немного вверх, и он полетит ровно и далеко. Если сложить его из листа A4, он должен балансировать примерно в 152 мм от носа. Эта модель ещё не испытана. Расскажите, как она полетела.',
      ],
      grownUps: [
        'Удлинение «Дельта-кометы» — мера того, насколько крыло длинное и узкое, — 1,03. Передние кромки отведены назад на 67,5°, у корпуса крыло шириной 240 мм, на конце — 56 мм. Точка равновесия — в 152 мм от носа, на 21 % средней ширины крыла. Простая модель плоского крыла ставит нейтральную точку — место, где действует добавочная подъёмная сила, когда нос приподнимается, — в 166 мм (30 %). Разница, около +9 % средней ширины, делает самолёт устойчивым. Но плоское крыло с такой балансировкой уравновесится только там, где не даёт подъёмной силы, и будет пикировать. Если немного отогнуть задние кромки вверх, воздух прижмёт хвост вниз, и самолёт будет планировать с чуть поднятым носом и создавать подъёмную силу: отогнутые кромки делают работу руля высоты большого самолёта. Сведение углов к середине добавляет слои, но сдвигает бумагу внутрь и назад, а не вперёд. Балансировка зависит от того, где вес находится относительно подъёмной силы, а не от того, насколько тяжёлым кажется нос. На больших углах узкие треугольные крылья получают дополнительную подъёмную силу от вихрей воздуха вдоль передних кромок (Полхамус). Все эти цифры — оценки по геометрии сгибов.',
        'Каждый квадратный метр крыла несёт около 198 г (1,9 Н/м²), поэтому самолёт планирует со скоростью около 2–3 м/с и летит гораздо быстрее при броске. Соревновательная дисциплина: дальность. Дротики выдерживают сильные броски. На соревнованиях нужен неразрезанный лист, поэтому тренируйтесь с версией из целого листа.',
      ],
    },
  },
  why: {
    en: {
      title: 'Why it exists',
      body: [
        'This is the dart most people learn first. Nobody knows who folded it first. Open Flight measured it, drew every fold to scale and added 4 mm tips.',
        'Its name points to the Tupolev Tu-144, the first supersonic airliner to fly. It took off near Moscow on 31 December 1968. Both are tailless deltas. Neither has a horizontal tail, so both balance with moving surfaces on the back edge of the wing. On the Tu-144 they are called elevons. On paper, they are the back edges you bend. Later Tu-144s added small retractable wings near the nose to help at low speed. The paper dart does not copy the Tu-144’s curved, double-swept wing.',
      ],
      borrows: 'It borrows the Tu-144’s tailless delta and its elevons, the back edges you bend.',
    },
    es: {
      title: 'Por qué existe',
      body: [
        'Es el dardo que casi todo el mundo aprende primero. Nadie sabe quién lo plegó por primera vez. Open Flight lo midió, dibujó cada pliegue a escala y le añadió puntas de 4 mm.',
        'Su nombre recuerda al Tupolev Tu-144, el primer avión supersónico de pasajeros que voló. Despegó cerca de Moscú el 31 de diciembre de 1968. Los dos son deltas sin cola. Ninguno tiene cola horizontal, así que los dos se equilibran con superficies móviles en el borde trasero del ala. En el Tu-144 se llaman elevones. En papel, son los bordes traseros que doblas. Los Tu-144 posteriores añadieron pequeñas alas retráctiles cerca del morro para volar a poca velocidad. El dardo de papel no copia el ala curva de doble flecha del Tu-144.',
      ],
      borrows: 'Toma del Tu-144 el delta sin cola y sus elevones: los bordes traseros que doblas.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Это дротик, который большинство людей учатся складывать первым. Никто не знает, кто сложил его первым. Open Flight измерила его, начертила каждый сгиб в масштабе и добавила законцовки по 4 мм.',
        'Название отсылает к Ту-144, первому сверхзвуковому пассажирскому самолёту, поднявшемуся в воздух. Он взлетел под Москвой 31 декабря 1968 года. Оба — бесхвостые «треугольники». Ни у одного нет горизонтального хвоста, поэтому оба балансируются подвижными поверхностями на задней кромке крыла. На Ту-144 они называются элевонами. На бумаге это задние кромки, которые вы отгибаете. Поздние Ту-144 получили небольшие убирающиеся крылья у носа для полёта на малой скорости. Бумажный дротик не повторяет изогнутое крыло Ту-144 с двойной стреловидностью.',
      ],
      borrows: 'От Ту-144 модель берёт бесхвостый треугольник и элевоны — задние кромки, которые вы отгибаете.',
    },
  },
  tryThis: {
    en: {
      question: 'What do the back edges do?',
      prediction: 'Predict first: flat, it dives early. With the back edges up, it flies flatter and further.',
      steps: [
        'Fold one Delta Comet.',
        'Throw it five times with flat back edges, with the same firm push.',
        'Bend up the back 15 mm of each wing, next to the body, by 2 mm.',
        'Throw it five more times with the same push.',
        'Mark where each flight first touches the floor.',
      ],
      lookFor: 'Look for an early dive with flat edges, and a flatter, longer flight with the edges up.',
    },
    es: {
      question: '¿Qué hacen los bordes traseros?',
      prediction: 'Predice primero: plano, cae en picado pronto. Con los bordes traseros hacia arriba, vuela más recto y más lejos.',
      steps: [
        'Pliega un Cometa delta.',
        'Lánzalo cinco veces con los bordes traseros planos, con el mismo empujón firme.',
        'Dobla 2 mm hacia arriba los últimos 15 mm de cada ala, junto al cuerpo.',
        'Lánzalo cinco veces más con el mismo empujón.',
        'Marca dónde toca el suelo cada vuelo por primera vez.',
      ],
      lookFor: 'Fíjate si cae en picado pronto con los bordes planos, y si vuela más recto y más lejos con los bordes hacia arriba.',
    },
    ru: {
      question: 'Что делают задние кромки?',
      prediction: 'Сначала предскажите: с ровными кромками он рано пикирует. С отогнутыми вверх кромками летит ровнее и дальше.',
      steps: [
        'Сложите одну «Дельта-комету».',
        'Бросьте её пять раз с ровными задними кромками одинаковым сильным броском.',
        'Отогните вверх на 2 мм задние 15 мм каждого крыла у корпуса.',
        'Бросьте ещё пять раз так же.',
        'Отмечайте, где каждый полёт впервые коснулся пола.',
      ],
      lookFor: 'Смотрите, пикирует ли модель рано с ровными кромками и летит ли ровнее и дальше с отогнутыми.',
    },
  },
  references: [
    shared.elevator, shared.cg, shared.exploratorium,
    {
      label: 'NASA Technical Reports Server · Tu-144 flight research',
      url: 'https://ntrs.nasa.gov/api/citations/20000052206/downloads/20000052206.pdf',
      note: w('The real aircraft’s wing and its flight tests.', 'El ala del avión real y sus ensayos en vuelo.', 'Крыло настоящего самолёта и его лётные испытания.'),
    },
    {
      label: 'Technik Museum Sinsheim · Tupolev Tu-144',
      url: 'https://www.technik-museum.de/en/discover/exhibits/tupolev-tu-144/',
      note: w('A Tu-144 you can see today.', 'Un Tu-144 que puedes ver hoy.', 'Ту-144, который можно увидеть сегодня.'),
    },
    shared.polhamus,
  ],
}
