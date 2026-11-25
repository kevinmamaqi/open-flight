// Plate A1 · Upper Deck, after the Boeing 747. Content contract: ../README.md.
// Numbers come from figures/airplane-balance.js (A4, cut border, 80 g/m²): estimates, not measurements.
// Spanish (tú) and Russian (вы) are drafts and need a native read before release.
// Editor: check the cargo-nose sentence against a Museum of Flight or Boeing source before print.
import { references as shared } from './A-references.js?v=827c6a6b1e8f'
const w = (en, es, ru) => ({ en, es, ru })

export default {
  id: 'A1',
  model: 'boeing-747',
  glance: [
    { label: w('Build time', 'Tiempo', 'Время'), value: w('15–20 min · 7 steps', '15–20 min · 7 pasos', '15–20 мин · 7 шагов'), state: 'estimate' },
    { label: w('You need', 'Necesitas', 'Понадобится'), value: w('1 sheet of A4 or US Letter · scissors · 1–2 paper clips', '1 hoja A4 o Carta · tijeras · 1–2 clips', '1 лист A4 или US Letter · ножницы · 1–2 скрепки'), state: null },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w('114 mm behind the nose (A4)', 'a 114 mm del morro (A4)', '114 мм от носа (A4)'), state: 'estimate' },
    { label: w('Span', 'Envergadura', 'Размах'), value: w('144 mm, tips folded up (A4)', '144 mm, con las puntas dobladas (A4)', '144 мм с поднятыми законцовками (A4)'), state: 'estimate' },
    { label: w('Expected flight', 'Vuelo esperado', 'Ожидаемый полёт'), value: w('Slow glider · gentle throw · untested', 'Planeador lento · lanzamiento suave · sin probar', 'Медленный планёр · мягкий бросок · не испытан'), state: 'estimate' },
  ],
  howItFlies: {
    en: {
      lead: 'Your throw is the only push. Then Upper Deck slides down through the air, like a sledge on a gentle slope.',
      body: [
        'Weight pulls the plane down. The wings turn that fall into a long, slow slide. Drag, the rub of the air, slows it.',
        'The thing that matters most is balance. Upper Deck has short, broad wings, and the air lifts them near the front. So the weight must sit far forward too. The nose step folds six layers of paper into the first 17 mm.',
        'Folded on A4, it should balance about 114 mm behind the nose. Our estimate says that may be a little too far back, so keep a paper clip ready. If it climbs and stalls, slide the clip onto the nose before you bend the back edges. This design is untested. Tell us how it flew.',
      ],
      grownUps: [
        'Upper Deck is a short, broad flying wing: 144 mm from tip to tip on a 249 mm body. Its aspect ratio, a measure of how slim a wing is, is just 0.64. A simple flat-wing model puts the neutral point, where extra lift acts when the nose rises, 52 mm behind the nose. Swirls of air along the side edges add lift further back, towards the middle of the wing at 135 mm (Polhamus; Torres and Mueller). The balance point is at 114 mm, 41 % along the wing’s average depth, so the plane may be barely steady. Expect a slow, nose-high glide that bobs. Try one nose clip before you bend the back edges: it moves the balance about 10 mm forwards. These figures are estimates from the fold geometry.',
        'Each square metre of wing carries about 137 g (1.3 N/m²), so the model predicts a glide of roughly 2–3 m/s, about jogging speed. Its Reynolds number, which compares speed and size with how sticky the air is, is 30,000–40,000: more than a thousand times lower than a 747 wing in cruise. Contest category: airtime or target games from a gentle launch, not distance. Contests ask for an uncut sheet, so practise with the whole-sheet build.',
      ],
    },
    es: {
      lead: 'Tu lanzamiento es el único empujón. Después, Dos pisos baja deslizándose por el aire, como un trineo por una cuesta suave.',
      body: [
        'El peso tira del avión hacia abajo. Las alas convierten esa caída en un deslizamiento largo y lento. La resistencia, el roce del aire, lo frena.',
        'Lo más importante es el equilibrio. Dos pisos tiene alas cortas y anchas, y el aire las sostiene cerca de la parte delantera. Por eso el peso también debe ir muy adelante. El escalón del morro pliega seis capas de papel en los primeros 17 mm.',
        'Plegado con una hoja A4, debería equilibrarse a unos 114 mm del morro. Según nuestra estimación, puede estar un poco demasiado atrás, así que ten un clip a mano. Si sube y se desploma, pon el clip en el morro antes de doblar los bordes traseros. Este modelo no se ha probado. Cuéntanos cómo voló.',
      ],
      grownUps: [
        'Dos pisos es un ala volante corta y ancha: 144 mm de punta a punta sobre un cuerpo de 249 mm. Su alargamiento, una medida de lo estrecha que es un ala, es solo 0,64. Un modelo sencillo de ala plana sitúa el punto neutro, donde actúa la sustentación extra cuando el morro sube, a 52 mm del morro. Los remolinos de los bordes laterales añaden sustentación más atrás, hacia el centro del ala, a 135 mm (Polhamus; Torres y Mueller). El equilibrio queda a 114 mm, al 41 % de la anchura media del ala, así que puede ser apenas estable. Espera un planeo lento, con el morro alto, que sube y baja. Prueba un clip en el morro antes de doblar los bordes traseros: adelanta el equilibrio unos 10 mm. Son estimaciones a partir de la geometría de los pliegues.',
        'Cada metro cuadrado de ala lleva unos 137 g (1,3 N/m²), así que el modelo predice un planeo de unos 2–3 m/s, más o menos a velocidad de trote. Su número de Reynolds, que compara velocidad y tamaño con lo pegajoso que es el aire, es de 30 000–40 000: más de mil veces menor que el de un ala de 747 en crucero. Categoría de competición: tiempo de vuelo o juegos de puntería con lanzamiento suave, no distancia. Las competiciones piden una hoja sin cortar, así que entrena con la versión de hoja entera.',
      ],
    },
    ru: {
      lead: 'Ваш бросок — единственный толчок. Дальше «Две палубы» скользит вниз по воздуху, как санки по пологой горке.',
      body: [
        'Вес тянет самолёт вниз. Крылья превращают падение в долгое медленное скольжение. Сопротивление — трение о воздух — тормозит его.',
        'Главное — балансировка. У «Двух палуб» короткие широкие крылья, и воздух поднимает их ближе к носу. Поэтому вес тоже должен быть далеко впереди. Ступенька на носу собирает шесть слоёв бумаги на первых 17 мм.',
        'Если сложить его из листа A4, он должен балансировать примерно в 114 мм от носа. По нашей оценке, это может быть чуть дальше, чем нужно, поэтому держите скрепку наготове. Если самолёт взмывает и сваливается, наденьте её на нос, прежде чем отгибать задние кромки. Эта модель ещё не испытана. Расскажите, как она полетела.',
      ],
      grownUps: [
        '«Две палубы» — короткое широкое летающее крыло: размах 144 мм при длине 249 мм. Его удлинение — мера того, насколько крыло узкое, — всего 0,64. Простая модель плоского крыла ставит нейтральную точку — где действует добавочная подъёмная сила, когда нос поднимается, — в 52 мм от носа. Вихри у боковых кромок добавляют подъёмную силу дальше назад, к середине крыла в 135 мм (Полхамус; Торрес и Мюллер). Точка равновесия — в 114 мм, на 41 % средней ширины крыла, так что самолёт может быть едва устойчив. Ждите медленного планирования с поднятым носом и покачиванием. Прежде чем отгибать задние кромки, наденьте на нос скрепку: она сдвинет равновесие примерно на 10 мм вперёд. Это оценки по геометрии сгибов.',
        'Каждый квадратный метр крыла несёт около 137 г (1,3 Н/м²), поэтому модель даёт скорость планирования примерно 2–3 м/с — как при лёгком беге. Его число Рейнольдса, которое сравнивает скорость и размер с «липкостью» воздуха, — 30 000–40 000: более чем в тысячу раз меньше, чем у крыла Boeing 747 в крейсерском полёте. Соревновательная дисциплина: время полёта или игры на точность с мягким броском, но не дальность. На соревнованиях нужен неразрезанный лист, поэтому тренируйтесь с версией из целого листа.',
      ],
    },
  },
  why: {
    en: {
      title: 'Why it exists',
      body: [
        'Folding the point of a dart back is an old way to blunt the nose and move paper to the front. Open Flight added a small pleat, so the nose has a step you can feel.',
        'The step is a nod to the raised upper deck of the first Boeing 747, which flew on 9 February 1969. Boeing put the flight deck up there so that cargo versions could open the whole nose. The likeness ends there. The 747 has a tail, four engines and long swept wings. Upper Deck has none of these.',
      ],
      borrows: 'It borrows the step behind the cockpit of the 747, and nothing else.',
    },
    es: {
      title: 'Por qué existe',
      body: [
        'Doblar hacia atrás la punta de un dardo es una forma antigua de achatar el morro y llevar papel hacia delante. Open Flight añadió un pequeño pliegue, así que el morro tiene un escalón que puedes tocar.',
        'El escalón recuerda el piso superior del primer Boeing 747, que voló el 9 de febrero de 1969. Boeing subió allí la cabina de mando para que las versiones de carga pudieran abrir todo el morro. El parecido termina ahí. El 747 tiene cola, cuatro motores y alas largas en flecha. Dos pisos no tiene nada de eso.',
      ],
      borrows: 'Toma del 747 el escalón detrás de la cabina, y nada más.',
    },
    ru: {
      title: 'Откуда эта модель',
      body: [
        'Загнуть острый нос бумажного дротика назад — старый способ сделать нос тупым и перенести бумагу вперёд. Open Flight добавила небольшую складку, и на носу появилась ступенька, которую можно нащупать.',
        'Ступенька напоминает верхнюю палубу первого Boeing 747, который впервые взлетел 9 февраля 1969 года. Boeing поднял туда кабину экипажа, чтобы у грузовых версий открывался весь нос. На этом сходство заканчивается. У Boeing 747 есть хвост, четыре двигателя и длинные стреловидные крылья. У «Двух палуб» ничего этого нет.',
      ],
      borrows: 'От Boeing 747 модель берёт только ступеньку за кабиной.',
    },
  },
  tryThis: {
    en: {
      question: 'Does a paper clip help?',
      prediction: 'Predict first: where will it balance with one clip, and will it fly further? Our estimate: about 10 mm further forward, at 103 mm, with fewer stalls.',
      steps: [
        'Fold two Upper Decks from the same paper.',
        'Balance each one on a pencil and mark the spot.',
        'Slide one 33 mm paper clip onto the nose of one copy. Balance it again.',
        'Launch each copy five times from the same spot, with the same gentle push.',
        'Mark where each one first touches the floor.',
      ],
      lookFor: 'Look for swoops and stalls without the clip, and a longer, flatter glide with it.',
    },
    es: {
      question: '¿Ayuda un clip?',
      prediction: 'Predice primero: ¿dónde se equilibrará con un clip y volará más lejos? Nuestra estimación: unos 10 mm más adelante, a 103 mm, y con menos desplomes.',
      steps: [
        'Pliega dos Dos pisos con el mismo papel.',
        'Equilibra cada uno sobre un lápiz y marca el punto.',
        'Pon un clip de 33 mm en el morro de uno de ellos. Vuelve a equilibrarlo.',
        'Lanza cada avión cinco veces desde el mismo sitio, con el mismo empujón suave.',
        'Marca dónde toca el suelo cada uno por primera vez.',
      ],
      lookFor: 'Fíjate si sube y se desploma sin el clip, y si planea más largo y más recto con él.',
    },
    ru: {
      question: 'Поможет ли скрепка?',
      prediction: 'Сначала предскажите: где будет точка равновесия со скрепкой и полетит ли самолёт дальше? Наша оценка: примерно на 10 мм ближе к носу, в 103 мм, и реже сваливается.',
      steps: [
        'Сложите два самолёта «Две палубы» из одинаковой бумаги.',
        'Положите каждый на карандаш и отметьте точку равновесия.',
        'Наденьте скрепку 33 мм на нос одного самолёта. Снова найдите точку равновесия.',
        'Запустите каждый пять раз с одного места одинаковым мягким толчком.',
        'Отметьте, где каждый впервые коснулся пола.',
      ],
      lookFor: 'Смотрите, взмывает ли самолёт и сваливается без скрепки и планирует ли дольше и ровнее со скрепкой.',
    },
  },
  references: [
    shared.forces, shared.cg, shared.elevator, shared.gliders, shared.exploratorium,
    {
      label: 'The Museum of Flight · Boeing 747-121',
      url: 'https://www.museumofflight.org/exhibits-and-events/aircraft/boeing-747-121',
      note: w('The first 747 and its raised upper deck.', 'El primer 747 y su piso superior.', 'Первый Boeing 747 и его верхняя палуба.'),
    },
    shared.torres, shared.polhamus,
  ],
}
