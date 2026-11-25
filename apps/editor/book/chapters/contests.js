// Chapter 9 · Contests and records. One source for the chapter page (/contests/) and
// the book (One Sheet; spreads in packages/one-sheet/flatplan.json). Same contract as how-it-flies.js.
//
// Every record carries the date we checked it (`records.asOf`) and its sources. Records
// change: re-check Guinness World Records the week before anything is printed.
// Red Bull and Guinness are named only to describe them, with no marks or logos
// (owner decision K10). People are profiled from cited sources only: no quotes, no
// reproduced diagrams, no portraits without a licence.
const w = (en, es, ru) => ({ en, es, ru })

/** Records drawn to scale and listed in the data spread. Values are as published. */
export const records = {
  asOf: '2026-11-25',
  distance: [
    { id: 'felch-1985', date: '1985-05', value: 58.82, imperial: '193 ft', who: w('Tony Felch', 'Tony Felch', 'Тони Фелч'), place: null, refs: ['gwr-history'] },
    { id: 'krieger-2003', date: '2003-09-06', value: 63.19, imperial: '207 ft 4 in', who: w('Stephen Krieger', 'Stephen Krieger', 'Стивен Кригер'), place: w('USA', 'EE. UU.', 'США'), refs: ['gwr-history', 'gwr-2012', 'seattletimes-2003'] },
    { id: 'collins-2012', date: '2012-02-26', value: 69.14, imperial: '226 ft 10 in', who: w('Joe Ayoob, thrower; John M. Collins, designer', 'Joe Ayoob, lanzador; John M. Collins, diseñador', 'Джо Аюб — бросок; Джон М. Коллинз — конструкция'), place: w('Sacramento, California, USA', 'Sacramento, California (EE. UU.)', 'Сакраменто, Калифорния, США'), refs: ['gwr-history', 'gwr-2012'] },
    { id: 'daegu-2022', date: '2022-04-16', value: 77.134, imperial: '252 ft 7 in', who: w('Kim Kyu Tae, Shin Moo Joon and Chee Yie Jian', 'Kim Kyu Tae, Shin Moo Joon y Chee Yie Jian', 'Ким Гю Тхэ, Син Му Джун и Чи Йи Цзянь'), place: w('Daegu, South Korea', 'Daegu (Corea del Sur)', 'Тэгу, Южная Корея'), refs: ['gwr-2022'] },
    { id: 'ruble-2022', date: '2022-12-02', value: 88.31, imperial: '289 ft 9 in', who: w('Dillon Ruble, with Nathaniel Erickson and Garrett Jensen', 'Dillon Ruble, con Nathaniel Erickson y Garrett Jensen', 'Диллон Рубл с Натаниэлем Эриксоном и Гарреттом Дженсеном'), place: w('Crown Point, Indiana, USA', 'Crown Point, Indiana (EE. UU.)', 'Краун-Пойнт, Индиана, США'), refs: ['gwr-ruble', 'gwr-history'] },
    { id: 'shanghai-2025', date: '2025-12-28', value: 98.43, imperial: '322 ft 11 in', current: true, who: w('Liu Liwen and five teammates', 'Liu Liwen y cinco compañeros de equipo', 'Лю Ливэнь и ещё пять участников команды'), place: w('Shanghai, China', 'Shanghái (China)', 'Шанхай, Китай'), refs: ['gwr-distance', 'gwr-history'] },
  ],
  time: [
    { id: 'blackburn-1998', date: '1998', value: 27.6, who: w('Ken Blackburn', 'Ken Blackburn', 'Кен Блэкберн'), place: w('USA', 'EE. UU.', 'США'), refs: ['deseret-2003'] },
    { id: 'toda-2010', date: '2010', value: 29.2, who: w('Takuo Toda', 'Takuo Toda', 'Такуо Тода'), place: w('Japan', 'Japón', 'Япония'), refs: ['gwr-kids-2023'] },
    { id: 'kunshan-2026', date: '2026-02-11', value: 31.2, current: true, who: w('A team of seven', 'Un equipo de siete personas', 'Команда из семи человек'), place: w('Kunshan, China', 'Kunshan (China)', 'Куньшань, Китай'), refs: ['gwr-time'] },
  ],
}

const chapter = {
  id: 'contests',
  asOf: '2026-11-25',
  review: { en: 'editorial-draft', es: 'needs-native-review', ru: 'needs-native-review' },
  opener: {
    figure: null,
    text: {
      en: {
        intro: 'People have thrown paper planes for distance and for time for decades, and the records keep growing. This chapter shows how a record is measured, who holds the records today and how to run a fair contest of your own.',
        grownUps: 'Records change. Every figure here carries the date we checked it, 25 November 2026. Contests and record keepers are named only to describe them; none of them has reviewed or endorsed this chapter.',
        caption: 'Photograph to come: a tape measure on a real floor. Nothing in it will be staged.',
      },
      es: {
        intro: 'Desde hace décadas se lanzan aviones de papel por distancia y por tiempo, y los récords siguen creciendo. Este capítulo muestra cómo se mide un récord, quién tiene hoy los récords y cómo organizar tu propia competición justa.',
        grownUps: 'Los récords cambian. Cada cifra lleva la fecha en que la comprobamos, el 25 de noviembre de 2026. Las competiciones y los registros de récords se nombran solo para describirlos; ninguno ha revisado ni respaldado este capítulo.',
        caption: 'Fotografía pendiente: una cinta métrica sobre un suelo real. Nada en ella será un montaje.',
      },
      ru: {
        intro: 'Бумажные самолёты запускают на дальность и на время уже десятки лет, и рекорды продолжают расти. В этой главе — как измеряют рекорд, кому принадлежат рекорды сегодня и как провести собственные честные соревнования.',
        grownUps: 'Рекорды меняются. У каждой цифры здесь есть дата проверки — 25 ноября 2026 г. Соревнования и организации, фиксирующие рекорды, названы только для описания; ни одна из них не проверяла и не одобряла эту главу.',
        caption: 'Фотография будет позже: рулетка на настоящем полу. Ничего постановочного в ней не будет.',
      },
    },
  },
  sections: [
    {
      id: 'what-counts',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'What counts as a record',
          lead: 'A record is not just a long throw. It is a long throw that was measured under rules and checked by someone else.',
          body: [
            'Records need categories. The two best known are distance, how far a plane flies from the throwing line to the spot where it first touches the ground, and time aloft, how long it stays in the air after it leaves the hand. There are others. Guinness World Records also lists the fastest time to fold and throw a paper plane, and the largest paper plane ever flown. The current one flew in Bologna, Italy, on 25 June 2026, with wings 20.04 m from tip to tip. It beat an 18.21 m plane built by students in Braunschweig, Germany [[gwr-largest-aircraft]] [[gwr-kids-2023]].',
            'Records need rules. Is the paper A4, or a bigger sheet? May you cut it or add tape? Is the throw made indoors, where no wind can help? Change any rule and you have a different record, so record books state the rules alongside the number.',
            'Records need measurement. Distance is measured along the ground, with a long tape or a laser. Time is measured with a stopwatch or a video, from the release to the first touch.',
            'Records need evidence. In February 2012 a plane designed by John Collins and thrown by Joe Ayoob flew 69.14 m in a hangar in California. Guinness officials were not there, and the first Guinness report said the evidence was still to be reviewed [[gwr-2012]]. Guinness now lists that flight in its record history [[gwr-history]]. A witness, a video and a careful log turn a great throw into a record.',
            'The same habits make a good experiment. Chapter 10 uses them at home.',
          ],
          tryIt: {
            steps: [
              'Choose one category: distance or time.',
              'Write down three rules before anyone throws.',
              'Decide who measures, and how.',
              'Keep every throw on the list, even the bad ones.',
            ],
          },
          grownUps: [
            'Guinness’s public record pages give the result, the people, the place and the date, but not the full rules [[gwr-distance]] [[gwr-time]]. Guinness’s own history of the distance record gives its main rules: one sheet of A4 lighter than 100 g/m², flown indoors in still air, launched from a standing start behind a line, with a walk or run-up of up to 3.04 m [[gwr-history]].',
            'Contests set their own rules, which differ again: see Red Bull Paper Wings on the next spreads [[redbull-rules]].',
          ],
        },
        es: {
          title: 'Qué cuenta como récord',
          lead: 'Un récord no es solo un lanzamiento largo. Es un lanzamiento largo medido según unas reglas y comprobado por otra persona.',
          body: [
            'Los récords necesitan categorías. Las dos más conocidas son la distancia, lo que vuela un avión desde la línea de lanzamiento hasta el punto donde toca el suelo por primera vez, y el tiempo de vuelo, cuánto se mantiene en el aire tras salir de la mano. Hay otras. Guinness World Records también registra el menor tiempo en plegar y lanzar un avión de papel, y el mayor avión de papel que ha volado. El actual voló en Bolonia (Italia) el 25 de junio de 2026, con 20,04 m de punta a punta. Superó a uno de 18,21 m construido por estudiantes en Braunschweig (Alemania) [[gwr-largest-aircraft]] [[gwr-kids-2023]].',
            'Los récords necesitan reglas. ¿El papel es A4 o una hoja más grande? ¿Se puede cortar o añadir cinta? ¿Se lanza bajo techo, donde ningún viento ayuda? Si cambias una regla, tienes otro récord; por eso los libros de récords indican las reglas junto a la cifra.',
            'Los récords necesitan medición. La distancia se mide sobre el suelo, con una cinta larga o un láser. El tiempo se mide con cronómetro o video, desde que se suelta hasta el primer contacto.',
            'Los récords necesitan pruebas. En febrero de 2012, un avión diseñado por John Collins y lanzado por Joe Ayoob voló 69,14 m en un hangar de California. No había jueces de Guinness, y la primera nota de Guinness decía que las pruebas aún debían revisarse [[gwr-2012]]. Hoy Guinness incluye ese vuelo en su historial de récords [[gwr-history]]. Un testigo, un video y un registro cuidadoso convierten un gran lanzamiento en un récord.',
            'Esos mismos hábitos hacen un buen experimento. El capítulo 10 los usa en casa.',
          ],
          tryIt: {
            steps: [
              'Elige una categoría: distancia o tiempo.',
              'Escribe tres reglas antes de que nadie lance.',
              'Decide quién mide y cómo.',
              'Anota todos los lanzamientos, incluso los malos.',
            ],
          },
          grownUps: [
            'Las páginas públicas de récords de Guinness dan el resultado, las personas, el lugar y la fecha, pero no las reglas completas [[gwr-distance]] [[gwr-time]]. La propia historia del récord de distancia de Guinness da sus reglas principales: una hoja A4 de menos de 100 g/m², vuelo bajo techo y sin corrientes, lanzamiento desde parado tras una línea y una carrerilla de hasta 3,04 m [[gwr-history]].',
            'Cada competición fija sus reglas, que también varían: ver Red Bull Paper Wings en las páginas siguientes [[redbull-rules]].',
          ],
        },
        ru: {
          title: 'Что считается рекордом',
          lead: 'Рекорд — это не просто дальний бросок. Это дальний бросок, измеренный по правилам и проверенный кем-то другим.',
          body: [
            'Рекордам нужны категории. Две самые известные — дальность, то есть расстояние от линии броска до точки, где самолёт впервые касается земли, и время в воздухе — сколько он держится в воздухе после того, как покинул руку. Есть и другие. Книга рекордов Гиннесса также фиксирует самое быстрое складывание и запуск бумажного самолёта и самый большой из летавших бумажных самолётов. Нынешний рекордсмен пролетел в Болонье (Италия) 25 июня 2026 года, размах его крыльев 20,04 м. Он превзошёл самолёт размахом 18,21 м, построенный студентами в Брауншвейге (Германия) [[gwr-largest-aircraft]] [[gwr-kids-2023]].',
            'Рекордам нужны правила. Бумага формата A4 или лист побольше? Можно ли её резать или подклеивать скотчем? Бросок делают в помещении, где не поможет ветер? Измените любое правило — и получится другой рекорд, поэтому в книгах рекордов правила указывают рядом с цифрой.',
            'Рекордам нужны измерения. Дальность меряют по земле длинной рулеткой или лазером. Время засекают секундомером или по видео — от выпуска из руки до первого касания.',
            'Рекордам нужны доказательства. В феврале 2012 года самолёт Джона Коллинза, брошенный Джо Аюбом, пролетел 69,14 м в ангаре в Калифорнии. Представителей Гиннесса там не было, и в первом сообщении Гиннесса говорилось, что доказательства ещё предстоит проверить [[gwr-2012]]. Сейчас Гиннесс включает этот полёт в историю рекордов [[gwr-history]]. Свидетель, видео и аккуратный журнал превращают отличный бросок в рекорд.',
            'Те же привычки нужны и хорошему эксперименту. В главе 10 — дома.',
          ],
          tryIt: {
            steps: [
              'Выберите одну категорию: дальность или время.',
              'Запишите три правила до первого броска.',
              'Решите, кто измеряет и как.',
              'Записывайте каждый бросок, даже неудачный.',
            ],
          },
          grownUps: [
            'На открытых страницах рекордов Гиннесса указаны результат, участники, место и дата, но не полные правила [[gwr-distance]] [[gwr-time]]. В истории рекорда дальности сам Гиннесс приводит главные правила: один лист A4 легче 100 г/м², полёт в закрытом помещении без сквозняков, запуск с места из-за линии и разбег не больше 3,04 м [[gwr-history]].',
            'У соревнований свои правила, и они снова другие: см. Red Bull Paper Wings на следующих разворотах [[redbull-rules]].',
          ],
        },
      },
    },
    {
      id: 'records',
      kind: 'records',
      figure: 'records-distance',
      figures: ['records-distance', 'records-time'],
      text: {
        en: {
          title: 'Records over time',
          lead: 'Here are the longest paper-plane flights, drawn to scale. In the book, one millimetre on the page is one metre on the floor.',
          body: [
            'In 1985 the longest recorded paper-plane flight was 58.82 m. Forty years later it is 98.43 m, set in Shanghai on 28 December 2025 by a team of six. That is almost the length of a football pitch [[gwr-history]] [[gwr-distance]].',
            'The record grew in steps. John Collins describes one of them: earlier record planes were darts thrown hard and high, while his 2012 plane was thrown level and flew as a glider [[wired-collins-2018]]. In 2022 the Daegu team split the work, with one person designing, one folding and one throwing [[gwr-2022]]. Every record since has been set by a team.',
            'Time aloft has grown more slowly: from 27.6 s in 1998 to 31.2 s in 2026, less than four seconds in almost thirty years [[deseret-2003]] [[gwr-time]]. Every extra second is hard to win, because a paper plane can stay up only as long as its height lasts. Count slowly to thirty-one: that is how long the record plane stayed in the air.',
            'Records change. These are the values we checked on 25 November 2026. The live page has the latest.',
          ],
          caption: 'Distance records, drawn to scale: in the book, 1 mm on the page is 1 m. The dashed line is for your own measurement. Data from Guinness World Records, as of 25 November 2026.',
          captionTime: 'Time aloft records on a seconds axis. Data from Guinness World Records; 1998 from a newspaper list. As of 25 November 2026.',
          table: { date: 'Date', value: 'Record', who: 'Who', where: 'Where', source: 'Source', yours: 'Your measurement', distance: 'Distance', time: 'Time aloft', current: 'current record' },
          tryIt: {
            steps: [
              'Measure your best throw in metres.',
              'Draw it beside the records with a pencil: 1 mm for each metre.',
              'Write the date next to your line.',
            ],
          },
          grownUps: [
            'Distance history comes from Guinness World Records’ own table, published in May 2026 [[gwr-history]], with the 2022 and 2025 records from their record pages [[gwr-2022]] [[gwr-distance]] and the December 2022 record from Guinness’s children’s site [[gwr-ruble]].',
            'Time aloft: 31.2 s from the current record page [[gwr-time]]. Takuo Toda’s 29.2 s is named as the earlier record in a 2023 Guinness article [[gwr-kids-2023]]. Kyodo News reported in 2009 that Toda’s 27.9 s, recognised by Guinness, beat a mark set eleven years earlier in the United States by 0.3 s [[japantimes-2009]]; a 2003 newspaper list names that indoor mark as Ken Blackburn’s 27.6 s [[deseret-2003]].',
          ],
        },
        es: {
          title: 'Récords por año',
          lead: 'Aquí están los vuelos de avión de papel más largos, dibujados a escala. En el libro, un milímetro en la página es un metro en el suelo.',
          body: [
            'En 1985, el vuelo de avión de papel más largo registrado era de 58,82 m. Cuarenta años después es de 98,43 m, logrado en Shanghái el 28 de diciembre de 2025 por un equipo de seis personas. Es casi lo que mide un campo de fútbol [[gwr-history]] [[gwr-distance]].',
            'El récord creció por etapas. John Collins describe una: los aviones récord anteriores eran dardos lanzados con fuerza y alto, mientras que el suyo de 2012 se lanzó horizontal y voló como planeador [[wired-collins-2018]]. En 2022, el equipo de Daegu se repartió el trabajo: una persona diseñó, otra plegó y otra lanzó [[gwr-2022]]. Desde entonces, todos los récords los ha logrado un equipo.',
            'El tiempo de vuelo ha crecido más despacio: de 27,6 s en 1998 a 31,2 s en 2026, menos de cuatro segundos en casi treinta años [[deseret-2003]] [[gwr-time]]. Cada segundo extra cuesta mucho, porque un avión de papel solo se mantiene arriba mientras le dura la altura. Cuenta despacio hasta treinta y uno: eso duró en el aire el avión del récord.',
            'Los récords cambian. Estos son los valores que comprobamos el 25 de noviembre de 2026. Los últimos, en la web.',
          ],
          caption: 'Récords de distancia a escala: en el libro, 1 mm en la página es 1 m. La línea discontinua es para tu propia medición. Datos de Guinness World Records, a 25 de noviembre de 2026.',
          captionTime: 'Récords de tiempo de vuelo en un eje de segundos. Datos de Guinness World Records; 1998, de una lista de prensa. A 25 de noviembre de 2026.',
          table: { date: 'Fecha', value: 'Récord', who: 'Quién', where: 'Dónde', source: 'Fuente', yours: 'Tu medición', distance: 'Distancia', time: 'Tiempo de vuelo', current: 'récord actual' },
          tryIt: {
            steps: [
              'Mide en metros tu mejor lanzamiento.',
              'Dibújalo a lápiz junto a los récords: 1 mm por cada metro.',
              'Escribe la fecha junto a tu línea.',
            ],
          },
          grownUps: [
            'La historia de la distancia procede de la tabla de Guinness World Records, publicada en mayo de 2026 [[gwr-history]]; los récords de 2022 y 2025, de sus páginas de récords [[gwr-2022]] [[gwr-distance]], y el de diciembre de 2022, del sitio infantil de Guinness [[gwr-ruble]].',
            'Tiempo de vuelo: 31,2 s, de la página del récord actual [[gwr-time]]. Los 29,2 s de Takuo Toda figuran como récord anterior en un artículo de Guinness de 2023 [[gwr-kids-2023]]. La agencia Kyodo informó en 2009 de que los 27,9 s de Toda, reconocidos por Guinness, superaban en 0,3 s una marca de once años antes en Estados Unidos [[japantimes-2009]]; una lista de prensa de 2003 da esa marca bajo techo como los 27,6 s de Ken Blackburn [[deseret-2003]].',
          ],
        },
        ru: {
          title: 'Рекорды по годам',
          lead: 'Здесь самые дальние полёты бумажных самолётов в масштабе. В книге один миллиметр на странице — это один метр на полу.',
          body: [
            'В 1985 году самый дальний зарегистрированный полёт бумажного самолёта составлял 58,82 м. Через сорок лет — 98,43 м: этот рекорд установила команда из шести человек в Шанхае 28 декабря 2025 года. Это почти длина футбольного поля [[gwr-history]] [[gwr-distance]].',
            'Рекорд рос ступенями. Джон Коллинз описывает одну из них: прежние рекордные самолёты были «дротиками», их бросали сильно и высоко, а его самолёт 2012 года бросили горизонтально, и он летел как планер [[wired-collins-2018]]. В 2022 году команда из Тэгу разделила работу: один конструировал, другой складывал, третий бросал [[gwr-2022]]. С тех пор все рекорды ставили команды.',
            'Время в воздухе росло медленнее: с 27,6 с в 1998 году до 31,2 с в 2026-м — меньше четырёх секунд почти за тридцать лет [[deseret-2003]] [[gwr-time]]. Каждую лишнюю секунду выиграть трудно: бумажный самолёт держится в воздухе, лишь пока у него есть высота. Посчитайте медленно до тридцати одного — столько держался в воздухе рекордный самолёт.',
            'Рекорды меняются. Здесь значения, проверенные 25 ноября 2026 г. Самые свежие — на сайте.',
          ],
          caption: 'Рекорды дальности в масштабе: в книге 1 мм на странице — это 1 м. Пунктирная линия — для вашего собственного результата. Данные Книги рекордов Гиннесса на 25 ноября 2026 г.',
          captionTime: 'Рекорды времени в воздухе. Данные Гиннесса; 1998 г. — по газетному списку. На 25 ноября 2026 г.',
          table: { date: 'Дата', value: 'Рекорд', who: 'Кто', where: 'Где', source: 'Источник', yours: 'Ваш результат', distance: 'Дальность', time: 'Время в воздухе', current: 'действующий рекорд' },
          tryIt: {
            steps: [
              'Измерьте свой лучший бросок в метрах.',
              'Нарисуйте его карандашом рядом с рекордами: 1 мм на каждый метр.',
              'Подпишите дату рядом со своей линией.',
            ],
          },
          grownUps: [
            'История рекордов дальности взята из таблицы самой Книги рекордов Гиннесса, опубликованной в мае 2026 г. [[gwr-history]], рекорды 2022 и 2025 годов — с её страниц рекордов [[gwr-2022]] [[gwr-distance]], а рекорд декабря 2022 г. — с детского сайта Гиннесса [[gwr-ruble]].',
            'Время в воздухе: 31,2 с — со страницы действующего рекорда [[gwr-time]]. 29,2 с Такуо Тоды названы прежним рекордом в статье Гиннесса 2023 года [[gwr-kids-2023]]. Агентство Kyodo в 2009 году сообщило, что признанные Гиннессом 27,9 с Тоды на 0,3 с превзошли результат, установленный в США одиннадцатью годами раньше [[japantimes-2009]]; газетный список 2003 года называет этот рекорд в помещении — 27,6 с Кена Блэкберна [[deseret-2003]].',
          ],
        },
      },
    },
    {
      id: 'paper-wings',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'Red Bull Paper Wings',
          lead: 'The largest paper-plane contest so far has three events: distance, airtime and aerobatics.',
          body: [
            'Red Bull Paper Wings is a paper-plane championship run by the drinks company Red Bull. Guinness World Records says it was first held in 2006 and returns every three years [[gwr-largest]]. The world finals have taken place in Hangar-7 in Salzburg, Austria, an indoor hall with no wind [[redbull-2022]].',
            'In 2022 more than 61,000 people in over 60 countries entered more than 500 local rounds, and the best of them flew in the sixth world final at Hangar-7 [[redbull-2022]]. Guinness counted 61,210 entrants, the largest paper aircraft competition it has recorded [[gwr-largest]].',
            'Each event had its own rules. For distance and airtime, every pilot folded one A4 sheet supplied on site, with no cutting, tearing, glue, staples or extra weight. Distance throws were made from behind a line, and the better of two throws counted. Airtime throws were made standing still with both feet on the ground, and the clock ran from the release to the first touch. In aerobatics a jury scored each display for how engaging, how well flown and how creative it was [[redbull-rules]].',
            'Watch the distance grow. Jovica Kozlica of Croatia won the distance title in 2006 with 39.43 m, and won it again in 2009 with 54.43 m [[gwr-kozlica]]. In 2022 Lazar Krstić of Serbia won with 61.11 m, about five buses parked nose to tail {{estimate}} [[gwr-rb-distance]].',
            'In the 2022 airtime event, Rana Muhammad Usman Saeed of Pakistan kept a plane up for 16.39 s in an early round, a championship record, and won the final with 14.86 s [[gwr-rb-airtime]]. Seunghoon Lee of South Korea won aerobatics [[redbull-2022]]. In 2019 Kateryna Ahafonova of Ukraine became the first woman to win a title, in aerobatics [[redbull-2019]].',
            'We found no world final after 2022, as of 25 November 2026.',
          ],
          tryIt: {
            steps: [
              'Fold your best plane from one plain A4 sheet. No cutting and no tape.',
              'Make two airtime throws, standing still with both feet down.',
              'A helper times each one from release to first touch.',
            ],
            lookFor: 'Keep the better time.',
          },
          grownUps: [
            'Guinness keeps three records of the championship itself: the largest competition, the farthest throw and the longest time aloft [[gwr-largest]] [[gwr-rb-distance]] [[gwr-rb-airtime]]. Five buses assumes a 12 m city bus {{estimate}}.',
            'Contest results sit well below the records: 61.11 m in the 2022 final, against the 77.134 m record set that April. A contest gives every pilot the same paper and two throws on the day, while a record team can prepare for months and choose its paper.',
            'Open Flight is not connected with Red Bull, and this spread describes the contest without endorsing it. Check the current rules before entering any contest.',
          ],
        },
        es: {
          title: 'Red Bull Paper Wings',
          lead: 'La mayor competición hasta hoy tiene tres pruebas: distancia, Airtime (tiempo de vuelo) y acrobacias.',
          body: [
            'Red Bull Paper Wings es un campeonato de aviones de papel de la empresa de bebidas Red Bull. Según Guinness World Records, se celebró por primera vez en 2006 y vuelve cada tres años [[gwr-largest]]. Las finales mundiales se han disputado en el Hangar-7 de Salzburgo (Austria), un recinto cubierto sin viento [[redbull-2022]].',
            'En 2022, más de 61 000 personas de más de 60 países participaron en más de 500 rondas locales, y los mejores volaron en la sexta final mundial, en el Hangar-7 [[redbull-2022]]. Guinness contó 61 210 participantes: la mayor competición de aviones de papel que tiene registrada [[gwr-largest]].',
            'Cada prueba tenía sus reglas. En distancia y Airtime, cada piloto plegaba una hoja A4 entregada allí, sin cortar, rasgar, pegar, grapar ni añadir peso. En distancia se lanzaba desde detrás de una línea y contaba el mejor de dos lanzamientos. En Airtime se lanzaba sin moverse, con los dos pies en el suelo, y el reloj corría desde que se soltaba hasta el primer contacto. En acrobacias, un jurado puntuaba cada exhibición por lo atractiva, lo bien volada y lo creativa que era [[redbull-rules]].',
            'Mira cómo crece la distancia. El croata Jovica Kozlica ganó el título de distancia en 2006 con 39,43 m, y otra vez en 2009 con 54,43 m [[gwr-kozlica]]. En 2022 ganó el serbio Lazar Krstić con 61,11 m, unos cinco autobuses en fila {{estimate}} [[gwr-rb-distance]].',
            'En la prueba de Airtime de 2022, el pakistaní Rana Muhammad Usman Saeed mantuvo un avión 16,39 s en el aire en una ronda previa, récord del campeonato, y ganó la final con 14,86 s [[gwr-rb-airtime]]. El surcoreano Seunghoon Lee ganó en acrobacias [[redbull-2022]]. En 2019, la ucraniana Kateryna Ahafonova fue la primera mujer en ganar un título, en acrobacias [[redbull-2019]].',
            'A 25 de noviembre de 2026 no encontramos ninguna final mundial posterior a 2022.',
          ],
          tryIt: {
            steps: [
              'Pliega tu mejor avión con una hoja A4 lisa. Sin cortes ni cinta.',
              'Lanza dos veces para Airtime sin moverte y con ambos pies en el suelo.',
              'Un ayudante mide cada tiempo, del lanzamiento al primer toque.',
            ],
            lookFor: 'Cuenta el mejor tiempo.',
          },
          grownUps: [
            'Guinness registra tres récords del propio campeonato: la mayor competición, el lanzamiento más largo y el mayor tiempo de vuelo [[gwr-largest]] [[gwr-rb-distance]] [[gwr-rb-airtime]]. Los cinco autobuses suponen autobuses urbanos de 12 m {{estimate}}.',
            'Los resultados de competición quedan muy por debajo de los récords: 61,11 m en la final de 2022, frente al récord de 77,134 m de abril de ese año. En competición, cada piloto tiene el mismo papel y dos lanzamientos ese día; un equipo de récord puede prepararse meses y elegir su papel.',
            'Open Flight no tiene relación con Red Bull, y estas páginas describen la competición sin respaldarla. Consulta las reglas vigentes antes de inscribirte en cualquier competición.',
          ],
        },
        ru: {
          title: 'Red Bull Paper Wings',
          lead: 'Крупнейший пока конкурс бумажных самолётов: дальность, «Время в воздухе» (Airtime) и аэробатика.',
          body: [
            'Red Bull Paper Wings — чемпионат бумажных самолётов, который проводит производитель напитков Red Bull. По данным Книги рекордов Гиннесса, он впервые прошёл в 2006 году и повторяется раз в три года [[gwr-largest]]. Мировые финалы проходили в Hangar-7 в Зальцбурге (Австрия) — закрытом зале без ветра [[redbull-2022]].',
            'В 2022 году более 61 000 человек из более чем 60 стран участвовали в более чем 500 местных отборах, а лучшие из них выступили в шестом мировом финале в Hangar-7 [[redbull-2022]]. Гиннесс насчитал 61 210 участников — это крупнейшие соревнования бумажных самолётов в его записях [[gwr-largest]].',
            'У каждой дисциплины были свои правила. На дальность и на время каждый пилот складывал один выданный на месте лист A4 — без разрезов, надрывов, клея, скрепок и дополнительного груза. На дальность бросали из-за линии, засчитывался лучший из двух бросков. На время бросали стоя на месте, обеими ногами на земле, а отсчёт шёл от выпуска до первого касания. В аэробатике (фигурном полёте) жюри оценивало каждое выступление по зрелищности, качеству полёта и творческому подходу [[redbull-rules]].',
            'Посмотрите, как растёт дальность. Йовица Козлица из Хорватии выиграл дальность в 2006 году с 39,43 м и ещё раз в 2009-м с 54,43 м [[gwr-kozlica]]. В 2022 году Лазар Крстич из Сербии победил с 61,11 м — это примерно пять автобусов, стоящих друг за другом {{estimate}} [[gwr-rb-distance]].',
            'Во «Времени в воздухе» 2022 года Рана Мухаммад Усман Саид из Пакистана продержал самолёт в воздухе 16,39 с в отборочном раунде — рекорд чемпионата — и выиграл финал с 14,86 с [[gwr-rb-airtime]]. Сынхун Ли из Южной Кореи победил в аэробатике [[redbull-2022]]. В 2019 году Катерина Агафонова из Украины стала первой женщиной, выигравшей титул, — в аэробатике [[redbull-2019]].',
            'На 25 ноября 2026 г. мировых финалов после 2022 года мы не нашли.',
          ],
          tryIt: {
            steps: [
              'Сложите свой лучший самолёт из одного чистого листа A4. Без разрезов и скотча.',
              'Сделайте два броска на время, стоя на месте обеими ногами на полу.',
              'Помощник засекает время от выпуска до первого касания.',
            ],
            lookFor: 'Засчитайте лучшее время.',
          },
          grownUps: [
            'Гиннесс ведёт три рекорда самого чемпионата: самые массовые соревнования, самый дальний бросок и самое долгое время в воздухе [[gwr-largest]] [[gwr-rb-distance]] [[gwr-rb-airtime]]. Пять автобусов — это городские автобусы длиной 12 м {{estimate}}.',
            'Результаты соревнований заметно ниже рекордов: 61,11 м в финале 2022 года против рекорда 77,134 м, установленного в апреле того же года. На соревнованиях у всех пилотов одна бумага и два броска в день состязаний, а рекордная команда может готовиться месяцами и сама выбирать бумагу.',
            'Open Flight не связан с Red Bull; этот разворот описывает соревнования, не одобряя их. Перед участием в любых соревнованиях проверьте действующие правила.',
          ],
        },
      },
    },
    {
      id: 'collins',
      kind: 'profile',
      figure: null,
      text: {
        en: {
          title: 'John M. Collins',
          role: 'Paper airplane designer · distance record, 2012',
          why: 'He brought origami technique to paper planes, and showed that a plane thrown level and flown as a glider could beat the hard-thrown dart.',
          body: [
            'Guinness World Records described John Collins in 2012 as a television producer and origami enthusiast [[gwr-2012]]. In a WIRED video he says he spent about ten years learning origami before he took its techniques back to paper airplanes [[wired-collins-2018]].',
            'On 26 February 2012, in a hangar at McClellan in Sacramento, California, a plane he designed was thrown 69.14 m by Joe Ayoob [[gwr-2012]]. It beat the 63.19 m that Stephen Krieger, then 15, threw in a hangar in Washington State in September 2003 [[gwr-history]] [[seattletimes-2003]]. Collins named the plane Suzanne, after his wife [[wired-collins-2018]].',
            'In the same video he explains what changed. Earlier record planes were darts, thrown hard at about 45 degrees to fly a high arc. His plane was thrown level and flew as a glider. He designs for ordinary US Letter paper and stresses accurate folds, symmetry and test flights [[wired-collins-2018]].',
            'In 2020 he used five of his designs in another WIRED video to explain aerodynamics, from dihedral and up-elevator to wing loading and glide ratio [[wired-level-up]]. His account of lift there is one simplified view; Chapter 2 sets out how scientists describe it.',
            'His book, The New World Champion Paper Airplane Book, was published by Ten Speed Press in 2013 and includes his instructions for Suzanne [[collins-book]].',
            'WIRED also filmed him folding his planes step by step, among them the Phoenix and the Tube [[wired-five]] [[wired-phoenix]] [[wired-tube]].',
            'We do not reproduce his designs, his diagrams or their names. To fold them, use his book, his videos and his website [[collins-site]].',
          ],
          watch: [
            { label: 'How This Guy Folds and Flies World Record Paper Airplanes · WIRED, 2018', ref: 'wired-collins-2018' },
            { label: 'How to Fold Five Incredible Paper Airplanes · WIRED, 2018', ref: 'wired-five' },
            { label: 'Aerodynamics Explained by a World Record Paper Airplane Designer · WIRED, 2020', ref: 'wired-level-up' },
            { label: 'How to Fold the ‘Phoenix’ Paper Airplane · WIRED, 2020', ref: 'wired-phoenix' },
            { label: 'How to Fold the ‘Tube’ Paper Airplane · WIRED, 2020', ref: 'wired-tube' },
            { label: 'The New World Champion Paper Airplane Book · Ten Speed Press, 2013', ref: 'collins-book' },
          ],
          watchTitle: 'Watch and read',
          portrait: 'No portrait: we have no licensed photograph. His record is drawn to scale on the records spread.',
        },
        es: {
          title: 'John M. Collins',
          role: 'Diseñador de aviones de papel · récord de distancia, 2012',
          why: 'Llevó la técnica del origami al avión de papel y mostró que uno lanzado horizontal, que vuela como planeador, puede vencer al dardo lanzado con fuerza.',
          body: [
            'En 2012, Guinness World Records describió a John Collins como productor de televisión y aficionado al origami [[gwr-2012]]. En un video de WIRED cuenta que pasó unos diez años aprendiendo origami antes de volver con sus técnicas a los aviones de papel [[wired-collins-2018]].',
            'El 26 de febrero de 2012, en un hangar de McClellan, en Sacramento (California), Joe Ayoob lanzó un avión diseñado por él a 69,14 m [[gwr-2012]]. Superó los 63,19 m que Stephen Krieger, con 15 años, lanzó en un hangar del estado de Washington en septiembre de 2003 [[gwr-history]] [[seattletimes-2003]]. Collins llamó al avión Suzanne, como su esposa [[wired-collins-2018]].',
            'En el mismo video explica qué cambió. Los aviones récord anteriores eran dardos lanzados con fuerza a unos 45 grados para trazar un arco alto. El suyo se lanzó horizontal y voló como un planeador. Diseña para papel US Letter común e insiste en los pliegues precisos, la simetría y los vuelos de prueba [[wired-collins-2018]].',
            'En 2020 usó cinco de sus diseños en otro video de WIRED para explicar aerodinámica, del diedro y el elevador levantado a la carga alar y la relación de planeo [[wired-level-up]]. Su explicación de la sustentación es una visión simplificada; el capítulo 2 expone cómo la describen los científicos.',
            'Su libro, The New World Champion Paper Airplane Book, lo publicó Ten Speed Press en 2013 e incluye sus instrucciones para Suzanne [[collins-book]].',
            'WIRED también lo grabó plegando sus aviones paso a paso, entre ellos el Phoenix y el Tube [[wired-five]] [[wired-phoenix]] [[wired-tube]].',
            'No reproducimos sus diseños, sus diagramas ni sus nombres. Para plegarlos, usa su libro, sus videos y su sitio web [[collins-site]].',
          ],
          watch: [
            { label: 'How This Guy Folds and Flies World Record Paper Airplanes · WIRED, 2018', ref: 'wired-collins-2018' },
            { label: 'How to Fold Five Incredible Paper Airplanes · WIRED, 2018', ref: 'wired-five' },
            { label: 'Aerodynamics Explained by a World Record Paper Airplane Designer · WIRED, 2020', ref: 'wired-level-up' },
            { label: 'How to Fold the ‘Phoenix’ Paper Airplane · WIRED, 2020', ref: 'wired-phoenix' },
            { label: 'How to Fold the ‘Tube’ Paper Airplane · WIRED, 2020', ref: 'wired-tube' },
            { label: 'The New World Champion Paper Airplane Book · Ten Speed Press, 2013', ref: 'collins-book' },
          ],
          watchTitle: 'Para ver y leer',
          portrait: 'Sin retrato: no tenemos ninguna fotografía con licencia. Su récord aparece a escala en las páginas de récords.',
        },
        ru: {
          title: 'Джон М. Коллинз',
          role: 'Конструктор бумажных самолётов · рекорд дальности, 2012',
          why: 'Он перенёс технику оригами в бумажные самолёты и показал, что самолёт, брошенный горизонтально и летящий как планер, может обойти сильно брошенный «дротик».',
          body: [
            'В 2012 году Книга рекордов Гиннесса назвала Джона Коллинза телепродюсером и любителем оригами [[gwr-2012]]. В видео WIRED он рассказывает, что около десяти лет изучал оригами, а потом вернулся с его приёмами к бумажным самолётам [[wired-collins-2018]].',
            '26 февраля 2012 года в ангаре в Макклеллане (Сакраменто, Калифорния) Джо Аюб бросил самолёт его конструкции на 69,14 м [[gwr-2012]]. Он превзошёл 63,19 м, которые 15-летний Стивен Кригер пролетел в ангаре в штате Вашингтон в сентябре 2003 года [[gwr-history]] [[seattletimes-2003]]. Коллинз назвал самолёт «Сюзанна» в честь жены [[wired-collins-2018]].',
            'В том же видео он объясняет, что изменилось. Прежние рекордные самолёты были «дротиками»: их сильно бросали примерно под 45 градусов по высокой дуге. Его самолёт бросили горизонтально, и он летел как планер. Коллинз делает модели под обычную бумагу US Letter и подчёркивает: важны точные сгибы, симметрия и пробные полёты [[wired-collins-2018]].',
            'В 2020 году в другом видео WIRED он на пяти своих моделях объяснил аэродинамику — от поперечного V крыла и поднятого руля высоты до нагрузки на крыло и качества планирования [[wired-level-up]]. Его объяснение подъёмной силы — упрощённый взгляд; как её описывают учёные, рассказано в главе 2.',
            'Его книга The New World Champion Paper Airplane Book вышла в издательстве Ten Speed Press в 2013 году; в ней есть его инструкция для «Сюзанны» [[collins-book]].',
            'WIRED также снял, как он шаг за шагом складывает свои самолёты, в том числе Phoenix и Tube [[wired-five]] [[wired-phoenix]] [[wired-tube]].',
            'Мы не воспроизводим его модели, схемы и их названия. Чтобы их сложить, воспользуйтесь его книгой, видео и сайтом [[collins-site]].',
          ],
          watch: [
            { label: 'How This Guy Folds and Flies World Record Paper Airplanes · WIRED, 2018', ref: 'wired-collins-2018' },
            { label: 'How to Fold Five Incredible Paper Airplanes · WIRED, 2018', ref: 'wired-five' },
            { label: 'Aerodynamics Explained by a World Record Paper Airplane Designer · WIRED, 2020', ref: 'wired-level-up' },
            { label: 'How to Fold the ‘Phoenix’ Paper Airplane · WIRED, 2020', ref: 'wired-phoenix' },
            { label: 'How to Fold the ‘Tube’ Paper Airplane · WIRED, 2020', ref: 'wired-tube' },
            { label: 'The New World Champion Paper Airplane Book · Ten Speed Press, 2013', ref: 'collins-book' },
          ],
          watchTitle: 'Смотреть и читать',
          portrait: 'Без портрета: у нас нет лицензированной фотографии. Его рекорд нарисован в масштабе на развороте с рекордами.',
        },
      },
    },
    {
      id: 'record-team',
      kind: 'profile',
      figure: null,
      text: {
        en: {
          title: 'The Daegu team, 2022',
          role: 'Distance record holders, April to December 2022',
          why: 'Three people, three jobs: one designed the plane, one folded it and one threw it.',
          body: [
            'On 16 April 2022, in Daegu, South Korea, a paper plane flew 77.134 m and broke a record that had stood for ten years. Guinness World Records credits three people: Kim Kyu Tae of South Korea threw it, Shin Moo Joon folded it, and Chee Yie Jian of Malaysia, known as Julian, designed it [[gwr-2022]].',
            'Eight of their throws were measured. Even the shortest, 71.813 m, was longer than the old record [[gwr-2022]].',
            'The paper was Conqueror CX22 at 100 g/m², the same stock John Collins had used [[gwr-2022]]. That detail matters: when the rules allow it, choosing the paper is part of the design.',
            'Their record lasted less than eight months. On 2 December 2022 Dillon Ruble, with Nathaniel Erickson and Garrett Jensen, reached 88.31 m in Crown Point, Indiana, USA, after four months of preparation, with a design they said was inspired by hypersonic vehicles [[gwr-ruble]]. All three had studied aerospace or mechanical engineering, and news reports at the time called them Boeing engineers [[aiaa-2023]].',
            'On 28 December 2025 Liu Liwen and five teammates reached 98.43 m in Shanghai [[gwr-distance]]. Guinness notes that record teams usually keep their folds secret, and that design has not been published [[gwr-history]].',
            'Several members of that team also appear in the time-aloft record, 31.2 s, set in Kunshan on 11 February 2026 [[gwr-time]].',
          ],
          watch: [
            { label: 'Epic paper airplane throw shatters record in South Korea · Guinness World Records, 2022', ref: 'gwr-2022' },
            { label: 'Farthest flight by a paper aircraft · Guinness World Records', ref: 'gwr-distance' },
          ],
          watchTitle: 'Watch and read',
          portrait: 'No portrait: we have no licensed photograph of the team.',
        },
        es: {
          title: 'El equipo de Daegu, 2022',
          role: 'Récord de distancia de abril a diciembre de 2022',
          why: 'Tres personas, tres tareas: una diseñó el avión, otra lo plegó y otra lo lanzó.',
          body: [
            'El 16 de abril de 2022, en Daegu (Corea del Sur), un avión de papel voló 77,134 m y batió un récord que llevaba diez años en pie. Guinness World Records reconoce a tres personas: el surcoreano Kim Kyu Tae lo lanzó, Shin Moo Joon lo plegó y el malasio Chee Yie Jian, conocido como Julian, lo diseñó [[gwr-2022]].',
            'Se midieron ocho de sus lanzamientos. Incluso el más corto, de 71,813 m, superaba el récord anterior [[gwr-2022]].',
            'El papel era Conqueror CX22 de 100 g/m², el mismo que había usado John Collins [[gwr-2022]]. Ese detalle importa: cuando las reglas lo permiten, elegir el papel forma parte del diseño.',
            'Su récord duró menos de ocho meses. El 2 de diciembre de 2022, Dillon Ruble, con Nathaniel Erickson y Garrett Jensen, alcanzó 88,31 m en Crown Point, Indiana (EE. UU.), tras cuatro meses de preparación, con un diseño inspirado, según ellos, en vehículos hipersónicos [[gwr-ruble]]. Los tres habían estudiado ingeniería aeroespacial o mecánica, y la prensa de entonces los presentó como ingenieros de Boeing [[aiaa-2023]].',
            'El 28 de diciembre de 2025, Liu Liwen y cinco compañeros de equipo alcanzaron 98,43 m en Shanghái [[gwr-distance]]. Guinness señala que los equipos de récord suelen guardar en secreto sus pliegues, y ese diseño no se ha publicado [[gwr-history]].',
            'Varios miembros de ese equipo están también en el récord de tiempo de vuelo, 31,2 s, logrado en Kunshan el 11 de febrero de 2026 [[gwr-time]].',
          ],
          watch: [
            { label: 'Epic paper airplane throw shatters record in South Korea · Guinness World Records, 2022', ref: 'gwr-2022' },
            { label: 'Farthest flight by a paper aircraft · Guinness World Records', ref: 'gwr-distance' },
          ],
          watchTitle: 'Para ver y leer',
          portrait: 'Sin retrato: no tenemos una foto con licencia del equipo.',
        },
        ru: {
          title: 'Команда из Тэгу, 2022',
          role: 'Рекордсмены по дальности, апрель — декабрь 2022',
          why: 'Три человека, три задачи: один сконструировал самолёт, другой сложил, третий бросил.',
          body: [
            '16 апреля 2022 года в Тэгу (Южная Корея) бумажный самолёт пролетел 77,134 м и побил рекорд, державшийся десять лет. Книга рекордов Гиннесса называет троих: бросал Ким Гю Тхэ из Южной Кореи, складывал Син Му Джун, а сконструировал Чи Йи Цзянь из Малайзии, известный как Джулиан [[gwr-2022]].',
            'Были измерены восемь их бросков. Даже самый короткий, 71,813 м, оказался длиннее старого рекорда [[gwr-2022]].',
            'Бумага — Conqueror CX22 плотностью 100 г/м², та же, что использовал Джон Коллинз [[gwr-2022]]. Эта деталь важна: если правила позволяют, выбор бумаги — часть конструкции.',
            'Их рекорд продержался меньше восьми месяцев. 2 декабря 2022 года Диллон Рубл с Натаниэлем Эриксоном и Гарреттом Дженсеном достиг 88,31 м в Краун-Пойнте (Индиана, США) после четырёх месяцев подготовки — с моделью, вдохновлённой, по их словам, гиперзвуковыми аппаратами [[gwr-ruble]]. Все трое учились на инженеров аэрокосмической или механической специальности, а новости того времени называли их инженерами Boeing [[aiaa-2023]].',
            '28 декабря 2025 года Лю Ливэнь и ещё пять участников команды достигли 98,43 м в Шанхае [[gwr-distance]]. Гиннесс отмечает, что рекордные команды обычно держат схемы складывания в секрете, и эта модель не опубликована [[gwr-history]].',
            'Несколько участников этой команды есть и в рекорде времени в воздухе — 31,2 с, установленном в Куньшане 11 февраля 2026 года [[gwr-time]].',
          ],
          watch: [
            { label: 'Epic paper airplane throw shatters record in South Korea · Книга рекордов Гиннесса, 2022', ref: 'gwr-2022' },
            { label: 'Farthest flight by a paper aircraft · Книга рекордов Гиннесса', ref: 'gwr-distance' },
          ],
          watchTitle: 'Смотреть и читать',
          portrait: 'Без портрета: у нас нет лицензированной фотографии команды.',
        },
      },
    },
    {
      id: 'time-aloft',
      kind: 'profile',
      figure: null,
      text: {
        en: {
          pull: { value: '31.2', unit: 's', sentence: 'On 11 February 2026, in Kunshan, China, a team of seven reached 31.2 s [[gwr-time]].' },
          title: 'Ken Blackburn and Takuo Toda',
          role: 'Time-aloft records · 1998 to 2026',
          why: 'Distance needs a hard, flat throw. Time needs height and the slowest possible fall. For almost thirty years the time record has moved in tenths of a second.',
          body: [
            'A time plane is thrown upwards, to turn the speed of the arm into height. At the top it must level out and sink as slowly as it can. Broad wings and careful trim matter more than raw speed.',
            'Ken Blackburn of St. Louis, in the United States, kept a paper plane up indoors for 27.6 seconds [[deseret-2003]]. His mark, set in 1998, lasted eleven years [[japantimes-2009]].',
            'On 11 April 2009, at a contest in Fukuyama, Japan, Takuo Toda beat it by three tenths of a second, with 27.9 s [[japantimes-2009]]. In December 2010 he reached 29.2 s [[gwr-kids-2023]]. That record stood for more than fifteen years.',
            'Toda leads Japan’s Origami Airplane Association. At the national contest it ran with Japan Airlines in March 2018, every pilot folded one sheet of the association’s contest paper, using folds only, and the clock ran from release to landing [[aviationwire-2018]]. A 15-year-old won the open class with 17.53 s. A 12-year-old won the primary-school class with 14.75 s, just a tenth of a second short of the time that won the 2022 Red Bull world final.',
            'On 11 February 2026, in Kunshan, China, a team of seven reached 31.2 s [[gwr-time]]. Some of them had also thrown the 98.43 m distance record.',
          ],
          watch: [
            { label: 'Longest time flying a paper aircraft · Guinness World Records', ref: 'gwr-time' },
            { label: 'Paper plane records that made history · Guinness World Records Kids, 2023', ref: 'gwr-kids-2023' },
          ],
          watchTitle: 'Read more',
          portrait: 'No portraits: we have no licensed photographs.',
        },
        es: {
          pull: { value: '31,2', unit: 's', sentence: 'El 11 de febrero de 2026, en Kunshan (China), un equipo de siete personas llegó a 31,2 s [[gwr-time]].' },
          title: 'Ken Blackburn y Takuo Toda',
          role: 'Récords de tiempo de vuelo · de 1998 a 2026',
          why: 'La distancia pide un lanzamiento fuerte y recto. El tiempo pide altura y la caída más lenta posible. Durante casi treinta años, el récord de tiempo ha avanzado por décimas de segundo.',
          body: [
            'Un avión de tiempo se lanza hacia arriba, para convertir la velocidad del brazo en altura. Arriba debe nivelarse y bajar lo más despacio posible. Las alas anchas y un ajuste cuidadoso importan más que la pura velocidad.',
            'Ken Blackburn, de St. Louis (EE. UU.), mantuvo un avión de papel 27,6 segundos en el aire bajo techo [[deseret-2003]]. Su marca, de 1998, duró once años [[japantimes-2009]].',
            'El 11 de abril de 2009, en una competición en Fukuyama (Japón), Takuo Toda la superó por tres décimas, con 27,9 s [[japantimes-2009]]. En diciembre de 2010 llegó a 29,2 s [[gwr-kids-2023]]. Ese récord duró más de quince años.',
            'Toda preside la Asociación de Aviones de Origami de Japón. En el campeonato nacional que organizó con Japan Airlines en marzo de 2018, cada piloto plegaba una hoja del papel de competición de la asociación, solo con pliegues, y el reloj corría desde que se soltaba hasta que aterrizaba [[aviationwire-2018]]. Con 15 años, quien ganó la categoría general hizo 17,53 s. Con 12, quien ganó la de primaria hizo 14,75 s, apenas una décima menos que el tiempo que ganó la final mundial de Red Bull de 2022.',
            'El 11 de febrero de 2026, en Kunshan (China), un equipo de siete personas llegó a 31,2 s [[gwr-time]]. Algunos de ellos también habían logrado el récord de distancia de 98,43 m.',
          ],
          watch: [
            { label: 'Longest time flying a paper aircraft · Guinness World Records', ref: 'gwr-time' },
            { label: 'Paper plane records that made history · Guinness World Records Kids, 2023', ref: 'gwr-kids-2023' },
          ],
          watchTitle: 'Para leer más',
          portrait: 'Sin retratos: no tenemos fotografías con licencia.',
        },
        ru: {
          pull: { value: '31,2', unit: 'с', sentence: '11 февраля 2026 года в Куньшане (Китай) команда из семи человек достигла 31,2 с [[gwr-time]].' },
          title: 'Кен Блэкберн и Такуо Тода',
          role: 'Рекорды времени в воздухе · с 1998 по 2026 год',
          why: 'Для дальности нужен сильный ровный бросок. Для времени — высота и самое медленное падение. Почти тридцать лет рекорд времени растёт на десятые доли секунды.',
          body: [
            'Самолёт на время бросают вверх, чтобы скорость руки превратилась в высоту. Наверху он должен выровняться и снижаться как можно медленнее. Широкие крылья и аккуратная настройка важнее голой скорости.',
            'Кен Блэкберн из Сент-Луиса (США) продержал бумажный самолёт в воздухе в помещении 27,6 секунды [[deseret-2003]]. Его рекорд 1998 года продержался одиннадцать лет [[japantimes-2009]].',
            '11 апреля 2009 года на соревнованиях в Фукуяме (Япония) Такуо Тода превзошёл его на три десятые секунды — 27,9 с [[japantimes-2009]]. В декабре 2010 года он достиг 29,2 с [[gwr-kids-2023]]. Этот рекорд продержался больше пятнадцати лет.',
            'Тода возглавляет японскую Ассоциацию самолётов-оригами. На национальном турнире, который она провела вместе с Japan Airlines в марте 2018 года, каждый пилот складывал один лист соревновательной бумаги ассоциации, только сгибами, а время засекали от выпуска до приземления [[aviationwire-2018]]. Пятнадцатилетний участник выиграл общий зачёт с 17,53 с. Двенадцатилетний выиграл зачёт младших школьников с 14,75 с — всего на десятую долю секунды меньше времени, которое принесло победу в мировом финале Red Bull 2022 года.',
            '11 февраля 2026 года в Куньшане (Китай) команда из семи человек достигла 31,2 с [[gwr-time]]. Некоторые из них установили и рекорд дальности — 98,43 м.',
          ],
          watch: [
            { label: 'Longest time flying a paper aircraft · Книга рекордов Гиннесса', ref: 'gwr-time' },
            { label: 'Paper plane records that made history · Guinness World Records Kids, 2023', ref: 'gwr-kids-2023' },
          ],
          watchTitle: 'Читать дальше',
          portrait: 'Без портретов: у нас нет лицензированных фотографий.',
        },
      },
    },
    {
      id: 'around-the-world',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'Contests around the world',
          lead: 'Paper-plane contests have run for more than half a century, from a magazine challenge in New York to a race against the clock in Japan.',
          body: [
            'In 1967 the magazine Scientific American ran a paper-plane contest. The final fly-offs were held in the Great Hall of the New York Hall of Science, a building first made to show rockets at the 1964 World’s Fair. In 2008 a new contest came back to the same hall [[sciam-2008]].',
            'In Japan, the Origami Airplane Association and Japan Airlines have run contests for time aloft, with classes split by age and one sheet of contest paper, folded only [[jal-ippa]] [[aviationwire-2018]].',
            'The biggest so far is Red Bull Paper Wings, earlier in this chapter. In 2022 it drew 61,210 entrants, the largest paper-plane competition Guinness has recorded [[gwr-largest]].',
            'The quickest contest of all is a Guinness record. Start with a flat A4 sheet, fold it to a set diagram and make it fly at least 2 m. In 2017 the record was 35.4 seconds. In April 2026 Ikai Tomoki of Japan did it in 4.54 seconds [[gwr-history]]. Count to five, slowly: his plane was folded and flying before you finish.',
            'Schools, clubs and museums run contests too, each with its own rules. Before you enter one, read them: paper, cuts, tape and the launch all differ.',
          ],
          tryIt: {
            steps: [
              'A helper holds a stopwatch and says go.',
              'Fold a simple dart from a flat A4 sheet, as fast as you can.',
              'Throw it past a line 2 m away. The helper stops the clock as it crosses.',
              'Try three times with the same design.',
            ],
            lookFor: 'Did your fastest fold also fly well, or did speed cost you a good glide?',
          },
          grownUps: [
            'Guinness’s fold-and-throw rules: a standard A4 sheet, unfolded at the start, folded to a diagram provided, and a flight of at least 2 m. The first record, in May 2017, was 35.435 s by Lu Yu of China [[gwr-history]].',
            'TIME reported 10,941 entries from 49 US states and 26 other countries, the same figures as in “A short history of flight” [[time-1967]]. Scientific American’s 2008 report mentions the 1967 contest only briefly.',
            'JAL’s first national contest was held on 18 March 2018 in Ōta, Tokyo, the home ward of Haneda Airport [[aviationwire-2018]]. Open Flight is not connected with any of these contests.',
          ],
        },
        es: {
          title: 'Competiciones por el mundo',
          lead: 'Hay competiciones de aviones de papel desde hace más de medio siglo, de un desafío de una revista en Nueva York a una carrera contra el reloj en Japón.',
          body: [
            'En 1967, la revista Scientific American organizó una competición de aviones de papel. Los vuelos finales se hicieron en el Gran Salón del New York Hall of Science, un edificio construido para mostrar cohetes en la Exposición Universal de 1964. En 2008 volvió al mismo salón una nueva competición [[sciam-2008]].',
            'En Japón, la Asociación de Aviones de Origami y Japan Airlines han organizado competiciones de tiempo de vuelo, con categorías por edad y una hoja de papel de competición, solo plegada [[jal-ippa]] [[aviationwire-2018]].',
            'La mayor hasta hoy es Red Bull Paper Wings, de la que habla este capítulo. En 2022 reunió a 61 210 participantes: la mayor competición de aviones de papel que tiene registrada Guinness [[gwr-largest]].',
            'La competición más rápida de todas es un récord Guinness. Empiezas con una hoja A4 plana, la pliegas según un esquema dado y debe volar al menos 2 m. En 2017 el récord era de 35,4 segundos. En abril de 2026, Ikai Tomoki (Japón) lo hizo en 4,54 segundos [[gwr-history]]. Cuenta despacio hasta cinco: su avión ya estaba plegado y volando antes de que acabes.',
            'Colegios, clubes y museos también organizan competiciones, cada una con sus reglas. Antes de participar, léelas: el papel, los cortes, la cinta y el lanzamiento cambian.',
          ],
          tryIt: {
            steps: [
              'Un ayudante sostiene un cronómetro y dice ya.',
              'Pliega un dardo sencillo con una hoja A4 plana, lo más rápido que puedas.',
              'Lánzalo más allá de una línea a 2 m. El ayudante para el reloj cuando la cruza.',
              'Prueba tres veces con el mismo diseño.',
            ],
            lookFor: '¿Tu plegado más rápido también voló bien, o la prisa te costó un buen planeo?',
          },
          grownUps: [
            'Reglas de Guinness para plegar y lanzar: una hoja A4 normal, desplegada al empezar, plegada según un esquema dado y un vuelo de al menos 2 m. El primer récord, en mayo de 2017, fue de 35,435 s, de Lu Yu (China) [[gwr-history]].',
            'TIME informó de 10 941 participaciones de 49 estados de EE. UU. y 26 países más, las mismas cifras que en «Breve historia del vuelo» [[time-1967]]. El artículo de Scientific American de 2008 menciona la competición de 1967 solo de pasada.',
            'La primera competición nacional de JAL se celebró el 18 de marzo de 2018 en Ōta (Tokio), el distrito del aeropuerto de Haneda [[aviationwire-2018]]. Open Flight no tiene relación con ninguna de estas competiciones.',
          ],
        },
        ru: {
          title: 'Соревнования по всему миру',
          lead: 'Соревнования бумажных самолётов проводят больше полувека — от конкурса журнала в Нью-Йорке до гонки со временем в Японии.',
          body: [
            'В 1967 году журнал Scientific American провёл конкурс бумажных самолётов. Финальные запуски прошли в Большом зале Нью-Йоркского зала науки — здании, построенном, чтобы показывать ракеты на Всемирной выставке 1964 года. В 2008 году в тот же зал вернулся новый конкурс [[sciam-2008]].',
            'В Японии Ассоциация самолётов-оригами и Japan Airlines проводят соревнования на время в воздухе с зачётами по возрасту и одним листом соревновательной бумаги — только сгибы [[jal-ippa]] [[aviationwire-2018]].',
            'Самые большие пока — Red Bull Paper Wings, о которых рассказано выше в этой главе. В 2022 году в них участвовали 61 210 человек — это крупнейшие соревнования бумажных самолётов в записях Гиннесса [[gwr-largest]].',
            'Самое быстрое соревнование — рекорд Гиннесса. Берёте ровный лист A4, складываете по заданной схеме, и самолёт должен пролететь не меньше 2 м. В 2017 году рекорд был 35,4 секунды. В апреле 2026 года Икай Томоки из Японии справился за 4,54 секунды [[gwr-history]]. Медленно сосчитайте до пяти: его самолёт уже сложен и летит, а вы ещё не закончили.',
            'Свои соревнования проводят школы, клубы и музеи, у каждого свои правила. Прежде чем участвовать, прочитайте их: бумага, разрезы, скотч и запуск везде разные.',
          ],
          tryIt: {
            steps: [
              'Помощник держит секундомер и говорит «старт».',
              'Как можно быстрее сложите простой «дротик» из ровного листа A4.',
              'Бросьте его за линию в 2 м. Помощник останавливает секундомер, когда самолёт её пересечёт.',
              'Попробуйте три раза с одной и той же моделью.',
            ],
            lookFor: 'Ваш самый быстрый самолёт и летал хорошо, или спешка стоила вам хорошего планирования?',
          },
          grownUps: [
            'Правила Гиннесса для складывания и броска: обычный лист A4, развёрнутый в начале, складывание по выданной схеме и полёт не меньше 2 м. Первый рекорд, в мае 2017 года, — 35,435 с, Лу Юй из Китая [[gwr-history]].',
            'TIME сообщил о 10 941 работе из 49 штатов США и ещё 26 стран — те же цифры, что и в главе «Краткая история полёта» [[time-1967]]. Статья Scientific American 2008 года упоминает конкурс 1967 года лишь мельком.',
            'Первый национальный турнир JAL прошёл 18 марта 2018 года в районе Ота (Токио), где находится аэропорт Ханэда [[aviationwire-2018]]. Open Flight не связан ни с одним из этих соревнований.',
          ],
        },
      },
    },
    {
      id: 'throwing',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'Throwing for distance, launching for time',
          lead: 'A throw for distance and a launch for time are two different skills. Practise both, safely.',
          body: [
            'For distance, the plane needs speed and a long, shallow path. Hold it under the body, near the balance point. Step forwards and throw firmly in a straight line. Try a level release first, the way glider-style record planes are thrown, then a little higher, and compare.',
            'For time, the plane needs height and a slow sink. Thrown upwards, it climbs for as long as its speed lasts. Then it must level out and glide down slowly. A plane that climbs well but cannot level out will loop or stall, so a good time plane has broad wings, a little up-elevator and a balance point set for a slow glide.',
            'Practise one thing at a time. A small change in your release can matter more than a change to the plane, so keep the throw the same while you trim, and keep the plane the same while you practise the throw.',
            'Safety comes first. Paper planes have pointed noses. Throw only when the lane ahead is clear, never towards anyone’s face, and keep watchers behind the throwing line. Do not climb on furniture to launch higher: a tall helper can hold the plane up high instead. Outdoors, keep away from roads and water.',
          ],
          tryIt: {
            steps: [
              'Mark a throwing line with tape.',
              'Throw the same plane five times for distance and five times for time.',
              'Write down every result.',
            ],
            lookFor: 'Is the throw that flies farthest also the one that stays up longest?',
          },
          grownUps: [
            'Forty-five degrees is the best angle for a ball thrown where there is no air. A paper plane makes lift, so its best launch angle depends on the plane: the old record darts were thrown high, while Collins’s record glider was thrown level [[wired-collins-2018]].',
            'For time, the throw turns speed into height. A launch at speed v can add at most v²/2g of height, about 5 m for a throw at 10 m/s, and drag takes a share of that {{estimate}}.',
          ],
        },
        es: {
          title: 'Lanzar para distancia y para tiempo',
          lead: 'Lanzar para distancia y lanzar para tiempo son dos habilidades distintas. Practica ambas con seguridad.',
          body: [
            'Para distancia, el avión necesita velocidad y una trayectoria larga y baja. Sujétalo por debajo, cerca del punto de equilibrio. Da un paso adelante y lánzalo con firmeza en línea recta. Suéltalo primero horizontal, como los aviones récord tipo planeador, luego un poco más alto, y compara.',
            'Para tiempo, el avión necesita altura y un descenso lento. Lanzado hacia arriba, sube mientras le dura la velocidad. Luego debe nivelarse y bajar planeando despacio. Un avión que sube bien pero no se nivela hará un rizo o entrará en pérdida; por eso un buen avión de tiempo tiene alas anchas, el elevador un poco levantado y el equilibrio ajustado para un planeo lento.',
            'Practica una cosa cada vez. Un pequeño cambio al soltarlo puede importar más que un cambio en el avión, así que mantén igual el lanzamiento mientras ajustas, y el avión igual mientras practicas el lanzamiento.',
            'Lo primero es la seguridad. Los aviones de papel tienen la punta afilada. Lanza solo con el pasillo despejado, nunca hacia la cara de nadie, y que el público se quede detrás de la línea de lanzamiento. No te subas a los muebles para lanzar más alto: una persona alta que ayude puede sostener el avión en alto. Al aire libre, aléjate de carreteras y del agua.',
          ],
          tryIt: {
            steps: [
              'Marca una línea de lanzamiento con cinta.',
              'Lanza el mismo avión cinco veces para distancia y cinco para tiempo.',
              'Anota cada resultado.',
            ],
            lookFor: '¿El lanzamiento que llega más lejos es también el que dura más en el aire?',
          },
          grownUps: [
            'Cuarenta y cinco grados es el mejor ángulo para una pelota lanzada donde no hay aire. Un avión de papel genera sustentación, así que su mejor ángulo depende del avión: los antiguos dardos récord se lanzaban altos, y el planeador récord de Collins, horizontal [[wired-collins-2018]].',
            'Para tiempo, el lanzamiento convierte velocidad en altura. Lanzado a velocidad v, puede ganar como mucho v²/2g de altura, unos 5 m a 10 m/s, y la resistencia del aire se lleva una parte {{estimate}}.',
          ],
        },
        ru: {
          title: 'Бросок на дальность, запуск на время',
          lead: 'Бросок на дальность и запуск на время — два разных навыка. Тренируйте оба, соблюдая безопасность.',
          body: [
            'Для дальности самолёту нужны скорость и длинная пологая траектория. Держите его снизу за фюзеляж, рядом с точкой равновесия. Шагните вперёд и бросьте уверенно по прямой. Сначала выпустите его горизонтально — так бросают рекордные самолёты-планеры, — потом чуть выше и сравните.',
            'Для времени самолёту нужны высота и медленное снижение. Брошенный вверх, он набирает высоту, пока хватает скорости. Затем он должен выровняться и медленно спланировать. Самолёт, что хорошо набирает высоту, но не выравнивается, сделает петлю или свалится; поэтому самолёту на время нужны широкие крылья, чуть поднятый руль высоты и центровка под медленное планирование.',
            'Тренируйте что-то одно за раз. Небольшое изменение в выпуске может значить больше, чем изменение самолёта, поэтому, пока регулируете самолёт, бросайте одинаково, а пока отрабатываете бросок, не меняйте самолёт.',
            'Безопасность прежде всего. У бумажных самолётов острый нос. Бросайте, только когда дорожка впереди свободна, никогда не в лицо человеку, а зрители пусть стоят за линией броска. Не залезайте на мебель, чтобы запустить выше: пусть лучше помощник повыше поднимет самолёт. На улице держитесь подальше от дорог и воды.',
          ],
          tryIt: {
            steps: [
              'Отметьте линию броска скотчем.',
              'Бросьте один и тот же самолёт пять раз на дальность и пять раз на время.',
              'Запишите каждый результат.',
            ],
            lookFor: 'Самый дальний бросок — это и самый долгий по времени?',
          },
          grownUps: [
            'Сорок пять градусов — лучший угол для мяча, брошенного там, где нет воздуха. Бумажный самолёт создаёт подъёмную силу, поэтому лучший угол запуска зависит от модели: старые рекордные «дротики» бросали высоко, а рекордный планер Коллинза — горизонтально [[wired-collins-2018]].',
            'При запуске на время скорость превращается в высоту. Запуск со скоростью v добавляет не больше v²/2g высоты — около 5 м при 10 м/с, и часть этого забирает сопротивление воздуха {{estimate}}.',
          ],
        },
      },
    },
    {
      id: 'your-contest',
      kind: 'contest',
      figure: null,
      text: {
        en: {
          title: 'Run your own contest',
          lead: 'You need paper, masking tape, a tape measure, a stopwatch and a few friends.',
          body: [
            'This is a family and classroom version of the contests in this chapter. It is not an official Red Bull or Guinness event, and you can change any rule, as long as everyone agrees before the first throw.',
          ],
          events: [
            {
              name: 'Distance',
              rules: [
                'One plain sheet each: A4 or US Letter office paper, 80 g/m². Fold only, with no cutting or tape.',
                'Throw from behind a masking-tape line. A foot over the line means the throw does not count.',
                'Two throws each. The longer one counts.',
                'Measure to the spot where the plane first touches the floor.',
              ],
            },
            {
              name: 'Time aloft',
              rules: [
                'The same paper and folding rules.',
                'Stand still with both feet on the floor. No run-up.',
                'Two timers start at the release and stop at the first touch of the floor, a wall or anything else. Use the average of their two times.',
                'Two throws each. The longer one counts.',
              ],
            },
            {
              name: 'Aerobatics',
              rules: [
                'Any paper plane you folded yourself.',
                'Each pilot has 60 seconds to show their best flights.',
                'Three judges each give 1 to 10 points for three things: how fun it is to watch, how well it flies and how inventive it is.',
              ],
            },
          ],
          classroom: [
            'Run a first round for everyone, then a final for the top three in each event.',
            'Give younger and older pupils separate categories.',
            'Print one contest sheet, L3, per group, and keep every throw.',
          ],
          classroomTitle: 'In a classroom',
          record: ['Pilot', 'Event', 'Throw 1', 'Throw 2', 'Best'],
          recordTitle: 'Contest sheet L3',
          safety: 'Clear the throwing lane before every throw. Watchers stay behind the line. Never throw towards anyone’s face.',
          grownUps: [
            'The two-throw, best-counts format and the standing airtime launch follow Red Bull’s 2022 rules [[redbull-rules]]. The age split follows the airtime contests that Japan Airlines announced in 2017 with the International Paper Plane Association, as JAL names it [[jal-ippa]]. Two timers average out some of the error in human reaction time.',
          ],
        },
        es: {
          title: 'Organiza tu competición',
          lead: 'Necesitas papel, cinta de carrocero, cinta métrica, cronómetro y algunos amigos.',
          body: [
            'Es una versión para familias y aulas de las competiciones de este capítulo. No es un evento oficial de Red Bull ni de Guinness, y puedes cambiar cualquier regla si todos están de acuerdo antes del primer lanzamiento.',
          ],
          events: [
            {
              name: 'Distancia',
              rules: [
                'Una hoja lisa por persona: papel de oficina A4 o US Letter de 80 g/m². Solo plegar, sin cortes ni cinta.',
                'Lanza desde detrás de una línea de cinta de carrocero. Si un pie pasa la línea, el lanzamiento no cuenta.',
                'Dos lanzamientos cada uno; vale el más largo.',
                'Mide hasta el punto donde el avión toca el suelo por primera vez.',
              ],
            },
            {
              name: 'Tiempo de vuelo',
              rules: [
                'Las mismas reglas de papel y plegado.',
                'Sin moverte y con los dos pies en el suelo. Sin impulso.',
                'Dos cronometradores empiezan al soltarlo y paran al primer contacto con el suelo, una pared o cualquier otra cosa. Usa el promedio de sus dos tiempos.',
                'Dos lanzamientos cada uno; vale el más largo.',
              ],
            },
            {
              name: 'Acrobacias',
              rules: [
                'Cualquier avión de papel plegado por ti.',
                'Cada piloto tiene 60 segundos para mostrar sus mejores vuelos.',
                'Tres jueces dan cada uno de 1 a 10 puntos en tres aspectos: lo divertido que es de ver, lo bien que vuela y lo original que es.',
              ],
            },
          ],
          classroom: [
            'Haz una primera ronda para todos y luego una final con los tres mejores de cada prueba.',
            'Crea categorías aparte para alumnos pequeños y mayores.',
            'Imprime una hoja de competición L3 por grupo y anota cada lanzamiento.',
          ],
          classroomTitle: 'En el aula',
          record: ['Piloto', 'Prueba', 'Lanz. 1', 'Lanz. 2', 'Mejor'],
          recordTitle: 'Hoja de competición L3',
          safety: 'Despeja el pasillo antes de cada lanzamiento. El público se queda detrás de la línea. Nunca lances hacia la cara de nadie.',
          grownUps: [
            'El formato de dos lanzamientos con el mejor como válido y el lanzamiento de Airtime sin moverse siguen las reglas de Red Bull de 2022 [[redbull-rules]]. La división por edades sigue las competiciones de tiempo de vuelo que Japan Airlines anunció en 2017 con la International Paper Plane Association, como la llama JAL [[jal-ippa]]. Dos cronometradores compensan parte del error de reacción humano.',
          ],
        },
        ru: {
          title: 'Проведите соревнования',
          lead: 'Понадобятся бумага, малярный скотч, рулетка, секундомер и несколько друзей.',
          body: [
            'Это семейная и школьная версия соревнований из этой главы. Это не официальное мероприятие Red Bull или Гиннесса, и любое правило можно изменить, если все согласны до первого броска.',
          ],
          events: [
            {
              name: 'Дальность',
              rules: [
                'Каждому — один чистый лист офисной бумаги A4 или US Letter, 80 г/м². Только складывать, без разрезов и скотча.',
                'Бросайте из-за линии из малярного скотча. Если нога заступила за линию, бросок не засчитывается.',
                'По два броска. Засчитывается дальний.',
                'Измеряйте до точки, где самолёт впервые коснулся пола.',
              ],
            },
            {
              name: 'Время в воздухе',
              rules: [
                'Те же правила для бумаги и складывания.',
                'Стойте на месте обеими ногами на полу. Без разбега.',
                'Два хронометриста включают секундомер при выпуске и останавливают при первом касании пола, стены или чего-либо ещё. Возьмите среднее из двух времён.',
                'По два броска. Засчитывается более долгий.',
              ],
            },
            {
              name: 'Аэробатика',
              rules: [
                'Любой бумажный самолёт своей работы.',
                'У каждого пилота 60 секунд, чтобы показать лучшие полёты.',
                'Три судьи ставят от 1 до 10 баллов за три вещи: насколько интересно смотреть, насколько хорошо самолёт летит и насколько это изобретательно.',
              ],
            },
          ],
          classroom: [
            'Проведите первый тур для всех, затем финал для трёх лучших в каждой дисциплине.',
            'Разделите младших и старших учеников по категориям.',
            'Печатайте по листу соревнований L3 на группу; записывайте все броски.',
          ],
          classroomTitle: 'В классе',
          record: ['Пилот', 'Дисциплина', 'Бросок 1', 'Бросок 2', 'Лучший'],
          recordTitle: 'Лист соревнований L3',
          safety: 'Освобождайте дорожку перед каждым броском. Зрители стоят за линией. Никогда не бросайте в лицо человеку.',
          grownUps: [
            'Формат «два броска, засчитывается лучший» и запуск стоя во «Времени в воздухе» — из правил Red Bull 2022 года [[redbull-rules]]. Деление по возрасту — как в конкурсах на время в воздухе, которые Japan Airlines объявила в 2017 году с International Paper Plane Association (так её называет JAL) [[jal-ippa]]. Два хронометриста частично сглаживают ошибку из-за времени реакции.',
          ],
        },
      },
    },
  ],
  references: [
    { id: 'gwr-largest-aircraft', label: 'Guinness World Records, “Largest paper aircraft” (20.04 m, Progetto Icarus and Jakidale, Bologna, Italy, 25 June 2026)', url: 'https://www.guinnessworldrecords.com/world-records/largest-paper-aircraft', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-kids-2023', label: 'Guinness World Records Kids, “Paper plane records that made history and how you can break one” (December 2023)', url: 'https://kids.guinnessworldrecords.com/news/2023/12/paper-plane-records-that-made-history-and-how-you-can-break-one-761876', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-2012', label: 'Guinness World Records, “Video: Is this the farthest ever flight by a paper airplane?” (February 2012)', url: 'https://www.guinnessworldrecords.com/news/2012/2/video-is-this-the-farthest-ever-flight-by-a-paper-airplane', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-history', label: 'Guinness World Records, “Evolution of the paper plane flight and how far it’s actually possible to throw one” (May 2026)', url: 'https://www.guinnessworldrecords.com/news/2026/5/evolution-of-the-paper-plane-flight-and-how-far-its-actually-possible-to-throw-one', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-distance', label: 'Guinness World Records, “Farthest flight by a paper aircraft”', url: 'https://www.guinnessworldrecords.com/world-records/farthest-flight-by-a-paper-aircraft', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-time', label: 'Guinness World Records, “Longest time flying a paper aircraft”', url: 'https://www.guinnessworldrecords.com/world-records/longest-time-flying-a-paper-aircraft', reuse: 'cite', checked: '2026-11-25' },
    { id: 'redbull-rules', label: 'Red Bull, “Red Bull Paper Wings World Final rules” (2022)', url: 'https://www.redbull.com/int-en/event-series/red-bull-paper-wings/red-bull-paper-wings-world-final-rules', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wired-collins-2018', label: 'WIRED, “How This Guy Folds and Flies World Record Paper Airplanes” with John Collins (2018), video', url: 'https://www.youtube.com/watch?v=3BNg4fDJC8A', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-2022', label: 'Guinness World Records, “Epic paper airplane throw shatters record in South Korea” (May 2022)', url: 'https://www.guinnessworldrecords.com/news/2022/5/epic-paper-airplane-throw-shatters-record-in-south-korea-704368', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-ruble', label: 'Guinness World Records Kids, “His paper plane flew 88 metres” (January 2023)', url: 'https://kids.guinnessworldrecords.com/news/2023/1/his-paper-plane-flew-88-metres-732788', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-largest', label: 'Guinness World Records, “Largest paper aircraft competition”', url: 'https://www.guinnessworldrecords.com/world-records/729563-largest-paper-aircraft-competition', reuse: 'cite', checked: '2026-11-25' },
    { id: 'redbull-2022', label: 'Red Bull, “Red Bull Paper Wings World Final results” (2022)', url: 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results', reuse: 'cite', checked: '2026-11-25' },
    { id: 'redbull-2019', label: 'Red Bull, “Red Bull Paper Wings World Finals report” (May 2019)', url: 'https://www.redbull.com/int-en/red-bull-paper-wings-world-finals-report', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wired-level-up', label: 'WIRED, “Aerodynamics Explained by a World Record Paper Airplane Designer”, Level Up, with John Collins (2020), video', url: 'https://www.youtube.com/watch?v=3KqjRPV9_PY', reuse: 'cite', checked: '2026-11-25' },
    { id: 'collins-book', label: 'John M. Collins, The New World Champion Paper Airplane Book, Ten Speed Press (2013), ISBN 9781607743880', url: 'https://www.penguinrandomhouse.com/books/219788/the-new-world-champion-paper-airplane-book-by-john-m-collins/9781607743880/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'collins-site', label: 'John M. Collins, The Paper Airplane Guy (website)', url: 'https://www.thepaperairplaneguy.com', reuse: 'cite', checked: '2026-11-25' },
    { id: 'jal-ippa', label: 'Japan Airlines, press release on the paper airplane contests with the International Paper Plane Association (March 2017)', url: 'https://press.jal.co.jp/en/release/201703/004211.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'seattletimes-2003', label: 'The Seattle Times, “Teen’s paper-plane flight exceeds 207 feet — and the world record” (13 September 2003): Stephen Krieger (spelled Kreiger there), 15, 207 ft 4 in, in a hangar at Moses Lake, Washington', url: 'https://archive.seattletimes.com/archive/20030913/paperplane13e/teens-paper-plane-flight-exceeds-207-feet-151-and-the-world-record', reuse: 'cite', checked: '2026-11-25' },
    { id: 'time-1967', label: 'TIME, “Modern Living: Big Boys at Play” (3 March 1967): 10,941 entries from 49 states and 26 foreign countries', url: 'https://time.com/archive/6890149/modern-living-big-boys-at-play/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'deseret-2003', label: 'Deseret News, “Paper airplane trivia” (25 September 2003), citing the Paper Aircraft Association', url: 'https://www.deseret.com/2003/9/25/19786319/paper-airplane-trivia/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'japantimes-2009', label: 'Kyodo News in The Japan Times, “New flight record for paper plane set” (17 May 2009)', url: 'https://www.japantimes.co.jp/news/2009/05/17/national/new-flight-record-for-paper-plane-set/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'aviationwire-2018', label: 'Aviation Wire, “JAL、初の折り紙ヒコーキ全国大会 滞空時間競う” (JAL’s first national origami-airplane contest; 19 March 2018, in Japanese)', url: 'https://www.aviationwire.jp/archives/143768', reuse: 'cite', checked: '2026-11-25' },
    { id: 'aiaa-2023', label: 'American Institute of Aeronautics and Astronautics, “Boeing Engineers Break World Record for Longest Paper Airplane Flight” (17 April 2023)', url: 'https://aiaa.org/2023/04/17/boeing-engineers-break-world-record-for-longest-paper-airplane-flight/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-kozlica', label: 'Guinness World Records, “Most wins of the Red Bull Paper Plane Championship”', url: 'https://www.guinnessworldrecords.com/world-records/729625-most-wins-of-the-red-bull-paper-plane-championship', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-rb-distance', label: 'Guinness World Records, “Farthest throw at the Red Bull Paper Plane Championship”', url: 'https://www.guinnessworldrecords.com/world-records/729614-farthest-throw-at-the-red-bull-paper-plane-championship', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gwr-rb-airtime', label: 'Guinness World Records, “Longest time aloft at the Red Bull Paper Wings Championship”', url: 'https://www.guinnessworldrecords.com/world-records/729617-longest-time-aloft-at-the-red-bull-paper-wings-championship', reuse: 'cite', checked: '2026-11-25' },
    { id: 'sciam-2008', label: 'Scientific American, “Paper airplane competition” by Susannah F. Locke (31 October 2008)', url: 'https://www.scientificamerican.com/article/paper-airplane-competition/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wired-five', label: 'WIRED, “How to Fold Five Incredible Paper Airplanes” with John Collins (2018), video', url: 'https://www.youtube.com/watch?v=JhYZy1ugI3Q', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wired-phoenix', label: 'WIRED, “How to Fold the ‘Phoenix’ Paper Airplane” with John Collins (2020), video', url: 'https://www.youtube.com/watch?v=2V55rc58cDg', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wired-tube', label: 'WIRED, “How to Fold the ‘Tube’ Paper Airplane” with John Collins (2020), video', url: 'https://www.youtube.com/watch?v=faR8b9DTZ1A', reuse: 'cite', checked: '2026-11-25' },
  ],
}

export default chapter
