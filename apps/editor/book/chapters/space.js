// Chapter 8 · Beyond the sky. One source for the chapter page and the book.
// Same contract as how-it-flies.js, plus `meta` (fallback title, standfirst and number until
// catalog.js lists the chapter) and `photo` (a photo slot id the lead supplies).
// Numbers marked {{estimate}} are our own arithmetic from the sourced values, shown in the
// go-deeper notes (`grownUps`, a key name kept for now). Where sources round or date things
// differently, the text says so.
const w = (en, es, ru) => ({ en, es, ru })

const chapter = {
  id: 'space',
  asOf: '2026-11-25',
  review: { en: 'editorial-draft', es: 'needs-native-review', ru: 'needs-native-review' },
  meta: {
    n: 8,
    route: 'space',
    title: w('Beyond the sky', 'Más allá del cielo', 'За пределами неба'),
    standfirst: w(
      'Wings need air. What happens where the air runs out, who went beyond it, and how to fly on a planet where the air is thin.',
      'Las alas necesitan aire. Qué pasa donde el aire se acaba, quién fue más allá y cómo volar en un planeta de aire escaso.',
      'Крыльям нужен воздух. Что бывает там, где он кончается, кто побывал за его пределами и как летать на планете, где воздуха мало.',
    ),
  },
  opener: {
    figure: 'space-reentry',
    photo: 'dragon-over-earth',
    text: {
      en: {
        intro: 'Up to where the air runs out, round the Earth, home on a glide and on to Mars.',
        grownUps: 'Numbers for the Shuttle, the X-15 and Ingenuity come from NASA; dates for Sputnik, Gagarin, Tereshkova and Leonov from NASA and ESA. Where pages differ, we say how. The Japanese plan to drop paper planes from the space station was tested but never flown, and its section says so plainly.',
        caption: 'A re-entry glide in section view: from orbit, down through the thin air, to a runway. Diagram, not to scale.',
      },
      es: {
        intro: 'Hasta donde se acaba el aire, alrededor de la Tierra, de vuelta planeando y rumbo a Marte.',
        grownUps: 'Las cifras del transbordador, del X-15 y de Ingenuity proceden de la NASA; las fechas de Sputnik, Gagarin, Tereshkova y Leónov, de la NASA y la ESA. Cuando las páginas difieren, explicamos cómo. El plan japonés de soltar aviones de papel desde la estación espacial se probó pero nunca voló, y su sección lo dice con claridad.',
        caption: 'Un planeo de reentrada en sección: desde la órbita, a través del aire escaso, hasta una pista. Esquema, sin escala.',
      },
      ru: {
        intro: 'Туда, где кончается воздух, вокруг Земли, домой на планировании и к Марсу.',
        grownUps: 'Цифры по «Шаттлу», X-15 и Ingenuity взяты у NASA; даты Спутника, Гагарина, Терешковой и Леонова — у NASA и ESA. Если страницы расходятся, мы объясняем как. Японский план сбросить бумажные самолёты с космической станции испытали, но так и не осуществили, и его раздел говорит об этом прямо.',
        caption: 'Планирование при возвращении, вид в разрезе: с орбиты через разреженный воздух к полосе. Схема, не в масштабе.',
      },
    },
  },
  sections: [
    {
      id: 'wings-need-air',
      kind: 'explainer',
      figure: null,
      photo: 'eagle-soaring',
      text: {
        en: {
          title: 'Why wings need air',
          lead: 'A wing cannot push on nothing.',
          body: [
            'A wing makes lift by moving through air. The more air, and the faster the wing moves, the more lift it makes. NASA’s lift equation has the air density and the speed in it [[nasa-lift-equation]].',
            'At sea level the air weighs about 1.2 kg in every cubic metre [[nasa-airprop]]. Climb, and the air thins. Up high there is so little of it that a wing has almost nothing to work with.',
          ],
          tryIt: {
            steps: [
              'Hold a sheet of paper flat in front of you. Move it fast through the air, face first.',
              'Now move it fast, edge first.',
              'Feel the push on your hand in each case.',
            ],
            lookFor: 'When do you feel more air pushing back?',
          },
          grownUps: [
            'NASA Glenn’s lift equation is L = C_l × ρ × V²/2 × A: lift grows with air density ρ, with the square of speed V and with wing area A [[nasa-lift-equation]]. The sea-level density of 1.229 kg/m³ is from the Glenn standard atmosphere page; other standards give 1.225 [[nasa-airprop]].',
          ],
        },
        es: {
          title: 'Por qué las alas necesitan aire',
          lead: 'Un ala no puede empujar la nada.',
          body: [
            'Un ala crea sustentación moviéndose por el aire. Cuanto más aire y más rápido se mueve el ala, más sustentación crea. La ecuación de sustentación de la NASA contiene la densidad del aire y la velocidad [[nasa-lift-equation]].',
            'A nivel del mar el aire pesa unos 1,2 kg por cada metro cúbico [[nasa-airprop]]. Si subes, el aire se hace más escaso. A gran altura hay tan poco que el ala casi no tiene con qué trabajar.',
          ],
          tryIt: {
            steps: [
              'Sujeta una hoja de papel plana delante de ti. Muévela rápido por el aire, de cara.',
              'Ahora muévela rápido, de canto.',
              'Nota el empuje en tu mano en cada caso.',
            ],
            lookFor: '¿Cuándo notas que el aire empuja más hacia atrás?',
          },
          grownUps: [
            'La ecuación de sustentación de NASA Glenn es L = C_l × ρ × V²/2 × A: la sustentación crece con la densidad del aire ρ, con el cuadrado de la velocidad V y con la superficie alar A [[nasa-lift-equation]]. La densidad de 1,229 kg/m³ al nivel del mar es la de la página de atmósfera estándar de Glenn; otros estándares dan 1,225 [[nasa-airprop]].',
          ],
        },
        ru: {
          title: 'Зачем крыльям воздух',
          lead: 'Крыло не может давить на пустоту.',
          body: [
            'Крыло создаёт подъёмную силу, двигаясь сквозь воздух. Чем больше воздуха и чем быстрее движется крыло, тем больше подъёмная сила. В уравнении подъёмной силы NASA есть плотность воздуха и скорость [[nasa-lift-equation]].',
            'На уровне моря воздух весит около 1,2 кг на каждый кубический метр [[nasa-airprop]]. Поднимайтесь, и воздух становится реже. Высоко его так мало, что крылу почти не на что опереться.',
          ],
          tryIt: {
            steps: [
              'Держите лист бумаги плоско перед собой. Быстро двигайте его сквозь воздух плоскостью вперёд.',
              'Теперь быстро двигайте его ребром вперёд.',
              'Почувствуйте давление на руку в каждом случае.',
            ],
            lookFor: 'Когда вы чувствуете, что воздух сильнее давит в ответ?',
          },
          grownUps: [
            'Уравнение подъёмной силы NASA Glenn: L = C_l × ρ × V²/2 × A. Подъёмная сила растёт с плотностью воздуха ρ, с квадратом скорости V и с площадью крыла A [[nasa-lift-equation]]. Плотность 1,229 кг/м³ на уровне моря — со страницы стандартной атмосферы Glenn; другие стандарты дают 1,225 [[nasa-airprop]].',
          ],
        },
      },
    },
    {
      id: 'edge-of-space',
      kind: 'explainer',
      figure: null,
      photo: 'aurora',
      text: {
        en: {
          title: 'The edge of space',
          lead: 'The sky does not end at a wall. It fades.',
          body: [
            'People still draw a line. The international air sports federation, FAI, puts the edge of space at 100 km above sea level, the Kármán line. The United States uses 80 km, which is 50 miles [[space-karman]].',
            'The number 100 is a round figure. Theodore von Kármán suggested looking for the height where the air is so thin that a wing would have to fly as fast as a satellite to stay up. He never published a number. The space lawyer Andrew Haley used his idea and got about 84 km [[mcdowell-2018]].',
            'In 2018 the astrophysicist Jonathan McDowell showed that satellites can circle the Earth more than once below 100 km, and argued for 80 km [[mcdowell-2018]]. FAI called the case for lowering the line “compelling” and proposed a meeting of experts to study it [[fai-karman-2018]].',
          ],
          tryIt: {
            steps: [
              'Take a long strip of paper. Mark 0 at one end for the ground.',
              'Mark 100 at the other end. This is the 100 km line.',
              'Mark 80, the United States line. Then mark 84, where the sum by von Kármán’s idea landed.',
            ],
            lookFor: 'How close together are the three marks?',
          },
          grownUps: [
            'The 100 km line is a convention and not a physical wall [[space-karman]]. McDowell found 50 satellites with their lowest point below 100 km that still made at least two full orbits, and noted that 80 km is close to the top of the mesosphere [[mcdowell-2018]].',
            'FAI’s 2018 statement did not change the line by itself, and we found no later decision that moved it, so this book uses both figures [[fai-karman-2018]].',
          ],
        },
        es: {
          title: 'El borde del espacio',
          lead: 'El cielo no termina en un muro. Se desvanece.',
          body: [
            'Aun así, la gente traza una línea. La federación aeronáutica internacional, la FAI, sitúa el borde del espacio a 100 km sobre el nivel del mar, la línea de Kármán. Estados Unidos usa 80 km, es decir, 50 millas [[space-karman]].',
            'El número 100 es una cifra redonda. Theodore von Kármán propuso buscar la altura a la que el aire es tan fino que un ala tendría que volar tan rápido como un satélite para sostenerse. Él nunca publicó una cifra. El abogado espacial Andrew Haley usó su idea y obtuvo unos 84 km [[mcdowell-2018]].',
            'En 2018 el astrofísico Jonathan McDowell mostró que hay satélites que dan más de una vuelta a la Tierra por debajo de 100 km, y defendió los 80 km [[mcdowell-2018]]. La FAI calificó de «convincente» el argumento para bajar la línea y propuso una reunión de expertos para estudiarlo [[fai-karman-2018]].',
          ],
          tryIt: {
            steps: [
              'Toma una tira larga de papel. Marca 0 en un extremo, el suelo.',
              'Marca 100 en el otro extremo. Es la línea de 100 km.',
              'Marca 80, la línea de Estados Unidos. Después marca 84, donde cayó el cálculo con la idea de von Kármán.',
            ],
            lookFor: '¿Qué cerca están las tres marcas?',
          },
          grownUps: [
            'La línea de 100 km es una convención y no un muro físico [[space-karman]]. McDowell encontró 50 satélites con su punto más bajo por debajo de 100 km que aun así completaron al menos dos órbitas, y señaló que 80 km queda cerca de la cima de la mesosfera [[mcdowell-2018]].',
            'La declaración de la FAI de 2018 no cambió la línea por sí sola, y no hemos encontrado ninguna decisión posterior que la moviera, así que este libro usa las dos cifras [[fai-karman-2018]].',
          ],
        },
        ru: {
          title: 'Край космоса',
          lead: 'Небо не заканчивается стеной. Оно истончается.',
          body: [
            'Всё же люди проводят линию. Международная авиационная федерация FAI помещает край космоса на высоте 100 км над уровнем моря — это линия Кармана. США используют 80 км, то есть 50 миль [[space-karman]].',
            'Число 100 круглое. Теодор фон Карман предложил искать высоту, где воздух так разрежен, что крылу пришлось бы лететь со скоростью спутника, чтобы держаться. Сам он цифру не опубликовал. Юрист по космическому праву Эндрю Хейли применил его идею и получил около 84 км [[mcdowell-2018]].',
            'В 2018 году астрофизик Джонатан Макдауэлл показал, что спутники могут делать больше одного витка ниже 100 км, и предложил 80 км [[mcdowell-2018]]. FAI назвала доводы за снижение линии «убедительными» и предложила собрать экспертов, чтобы это обсудить [[fai-karman-2018]].',
          ],
          tryIt: {
            steps: [
              'Возьмите длинную полоску бумаги. Отметьте 0 на одном конце — это земля.',
              'Отметьте 100 на другом. Это линия 100 км.',
              'Отметьте 80 — линию США. Затем отметьте 84 — там оказался расчёт по идее фон Кармана.',
            ],
            lookFor: 'Насколько близко лежат три отметки?',
          },
          grownUps: [
            'Линия 100 км — условность, а не физическая стена [[space-karman]]. Макдауэлл нашёл 50 спутников, у которых нижняя точка орбиты была ниже 100 км, но они всё же сделали не меньше двух полных витков, и заметил, что 80 км — это около верхней границы мезосферы [[mcdowell-2018]].',
            'Заявление FAI 2018 года само по себе линию не изменило, а более позднего решения, которое бы её сдвинуло, мы не нашли, поэтому в книге даны обе цифры [[fai-karman-2018]].',
          ],
        },
      },
    },
    {
      id: 'rocket-pioneers',
      kind: 'explainer',
      figure: null,
      photo: 'night-launch',
      text: {
        en: {
          title: 'Tsiolkovsky and Korolev',
          lead: 'A schoolteacher who had lost his hearing as a boy worked out how a rocket could reach space. Decades later, an engineer whose name was kept secret built one.',
          body: [
            'Konstantin Tsiolkovsky lost his hearing at ten, after scarlet fever, and taught himself at home. He became a teacher in Kaluga. In 1911 he wrote: “Earth is the cradle of humanity, but one cannot live in the cradle forever” [[esa-tsiolkovsky]].',
            'His rocket equation says a rocket’s speed depends on two things: how fast its exhaust rushes out backwards, and how much of its starting weight is fuel. To reach orbit, most of a rocket must be fuel, so he proposed rockets in stages that drop away when empty [[encyclopedia-tsiolkovsky]] [[esa-tsiolkovsky]].',
            'Sergei Korolev led the team that built the R-7 rocket, which launched Sputnik and Yuri Gagarin. In 1938 he had been arrested and sent to prison. While he lived, the world knew him only as the Chief Designer. He died in 1966 [[esa-korolev]].',
          ],
          tryIt: {
            steps: [
              'Tie a string across a room and thread a drinking straw onto it.',
              'Blow up a balloon, pinch it shut and tape it under the straw.',
              'Let go. Then try again with a bigger puff of air.',
            ],
            lookFor: 'The air rushes back and the balloon rushes forwards. More air to throw out means a longer ride. That is the rocket equation in a room.',
          },
          grownUps: [
            'The rocket equation: Δv = v_e × ln(m₀/m₁), with exhaust speed v_e, full mass m₀ and empty mass m₁ [[encyclopedia-tsiolkovsky]]. ESA credits him with the figure of about 8 km/s to reach orbit [[esa-tsiolkovsky]]. With exhaust at 3 km/s, a one-piece rocket would have to be about 93 per cent fuel {{estimate}}. Stages help.',
            'The article is usually dated 1903. One encyclopedia says it was finished in 1903 and printed in full in 1911 and 1912 [[encyclopedia-tsiolkovsky]].',
          ],
        },
        es: {
          title: 'Tsiolkovski y Koroliov',
          lead: 'Un maestro que había perdido el oído de niño calculó cómo podría un cohete llegar al espacio. Décadas después, un ingeniero cuyo nombre era secreto lo construyó.',
          body: [
            'Konstantín Tsiolkovski perdió el oído a los diez años, por la escarlatina, y estudió solo en casa. Fue maestro en Kaluga. En 1911 escribió: «La Tierra es la cuna de la humanidad, pero no se puede vivir para siempre en la cuna» [[esa-tsiolkovsky]].',
            'Su ecuación del cohete dice que la velocidad de un cohete depende de dos cosas: lo rápido que salen sus gases hacia atrás y cuánto de su peso inicial es combustible. Para llegar a la órbita, casi todo el cohete debe ser combustible, así que propuso cohetes por etapas que se sueltan al vaciarse [[encyclopedia-tsiolkovsky]] [[esa-tsiolkovsky]].',
            'Serguéi Koroliov dirigió el equipo que construyó el cohete R-7, que lanzó el Sputnik y a Yuri Gagarin. En 1938 lo habían detenido y enviado a prisión. Mientras vivió, el mundo solo lo conoció como el Diseñador Jefe. Murió en 1966 [[esa-korolev]].',
          ],
          tryIt: {
            steps: [
              'Ata un cordel de lado a lado de una habitación y pasa por él una pajita.',
              'Infla un globo, ciérralo con los dedos y pégalo con cinta bajo la pajita.',
              'Suéltalo. Luego prueba con más aire.',
            ],
            lookFor: 'El aire sale hacia atrás y el globo corre hacia delante. Más aire que expulsar significa un viaje más largo. Es la ecuación del cohete en una habitación.',
          },
          grownUps: [
            'La ecuación del cohete: Δv = v_e × ln(m₀/m₁), con la velocidad de los gases v_e, la masa llena m₀ y la masa vacía m₁ [[encyclopedia-tsiolkovsky]]. La ESA le atribuye la cifra de unos 8 km/s para llegar a la órbita [[esa-tsiolkovsky]]. Con gases a 3 km/s, un cohete de una sola pieza tendría que ser combustible en un 93 por ciento {{estimate}}. Las etapas ayudan.',
            'El artículo suele fecharse en 1903. Una enciclopedia dice que se terminó en 1903 y se publicó completo en 1911 y 1912 [[encyclopedia-tsiolkovsky]].',
          ],
        },
        ru: {
          title: 'Циолковский и Королёв',
          lead: 'Школьный учитель, потерявший слух в детстве, рассчитал, как ракета может достичь космоса. Десятилетия спустя инженер, чьё имя держали в секрете, её построил.',
          body: [
            'Константин Циолковский в десять лет после скарлатины потерял слух и учился сам, дома. Он стал учителем в Калуге. В 1911 году он написал: «Земля — колыбель человечества, но нельзя вечно жить в колыбели» [[esa-tsiolkovsky]].',
            'Его формула ракеты говорит, что скорость ракеты зависит от двух вещей: как быстро вырываются назад газы и какая часть начального веса — топливо. Чтобы выйти на орбиту, ракета должна почти целиком состоять из топлива, поэтому он предложил ступени, которые отделяются, когда пустеют [[encyclopedia-tsiolkovsky]] [[esa-tsiolkovsky]].',
            'Сергей Королёв руководил созданием ракеты Р-7, которая вывела в космос Спутник и Юрия Гагарина. В 1938 году его арестовали и отправили в заключение. При жизни мир знал его только как Главного конструктора. Он умер в 1966 году [[esa-korolev]].',
          ],
          tryIt: {
            steps: [
              'Натяните нитку через комнату и наденьте на неё соломинку.',
              'Надуйте шарик, зажмите его пальцами и приклейте скотчем под соломинку.',
              'Отпустите. Потом попробуйте с большим запасом воздуха.',
            ],
            lookFor: 'Воздух уходит назад, а шарик мчится вперёд. Больше воздуха — дальше путь. Это формула ракеты прямо в комнате.',
          },
          grownUps: [
            'Формула Циолковского: Δv = v_e × ln(m₀/m₁), где v_e — скорость истечения газов, m₀ — полная масса, m₁ — масса без топлива [[encyclopedia-tsiolkovsky]]. ESA приписывает ему оценку около 8 км/с для выхода на орбиту [[esa-tsiolkovsky]]. При скорости газов 3 км/с одноступенчатая ракета должна была бы на 93 процента состоять из топлива {{estimate}}. Ступени помогают.',
            'Статью обычно датируют 1903 годом. Одна энциклопедия пишет, что она была закончена в 1903 году, а целиком напечатана в 1911–1912 годах [[encyclopedia-tsiolkovsky]].',
          ],
        },
      },
    },
    {
      id: 'sputnik-laika',
      kind: 'explainer',
      figure: null,
      photo: 'milky-way',
      text: {
        en: {
          title: 'Sputnik and Laika',
          lead: 'In October 1957 a metal ball the size of a beach ball began to beep from orbit.',
          body: [
            'On 4 October 1957 the Soviet Union launched Sputnik 1, a ball 58 cm across that weighed 83.6 kg. It carried no science instruments, only a radio whose beep-beep people could track around the world. It went round the Earth about every 96 minutes [[nasa-explorer1]] [[aps-sputnik]].',
            'Its batteries ran out after 22 days. On 4 January 1958 it fell back into the atmosphere [[nasa-sputnik]].',
            'On 3 November 1957 Sputnik 2 carried a dog named Laika, the first animal to orbit the Earth. There was no way to bring her home, and she lived only a few hours in orbit. She is remembered as the first animal to travel around our planet [[nasa-sputnik]].',
          ],
          tryIt: {
            steps: [
              'Set a timer for 96 minutes and carry on with your day.',
              'When it rings, say: Sputnik has gone once round the whole planet.',
            ],
            lookFor: 'What did you do in one orbit?',
          },
          grownUps: [
            'NASA says Laika “possibly survived only for a few hours after reaching orbit” [[nasa-sputnik]]. Earlier Soviet accounts said she lived for days. In 2002 a scientist from the mission said that her cabin had overheated after a fault in the temperature control [[airspace-laika]].',
            'NASA gives Sputnik 1 as 23 inches across and 184 pounds; 58 cm and 83.6 kg are the metric figures [[nasa-explorer1]] [[nasa-sputnik]].',
            'NASA’s history pages round the orbit to 90 or to about 98 minutes [[nasa-sputnik]] [[nasa-dawn]]. APS News gives 96, and a satellite catalogue gives 96.17, so we use 96 [[aps-sputnik]] [[skyrocket-sputnik]].',
          ],
        },
        es: {
          title: 'Sputnik y Laika',
          lead: 'En octubre de 1957 una bola de metal del tamaño de un balón de playa empezó a pitar desde la órbita.',
          body: [
            'El 4 de octubre de 1957 la Unión Soviética lanzó el Sputnik 1, una bola de 58 cm de diámetro que pesaba 83,6 kg. No llevaba instrumentos científicos, solo una radio cuyo pip-pip se podía seguir en todo el mundo. Daba una vuelta a la Tierra cada 96 minutos más o menos [[nasa-explorer1]] [[aps-sputnik]].',
            'Sus baterías se agotaron a los 22 días. El 4 de enero de 1958 volvió a caer en la atmósfera [[nasa-sputnik]].',
            'El 3 de noviembre de 1957 el Sputnik 2 llevó a una perra llamada Laika, el primer animal en orbitar la Tierra. No había forma de traerla de vuelta, y vivió solo unas horas en órbita. Se la recuerda como el primer animal que dio la vuelta a nuestro planeta [[nasa-sputnik]].',
          ],
          tryIt: {
            steps: [
              'Pon un temporizador de 96 minutos y sigue con tu día.',
              'Cuando suene, di: el Sputnik ha dado una vuelta entera al planeta.',
            ],
            lookFor: '¿Qué hiciste tú en una órbita?',
          },
          grownUps: [
            'La NASA dice que Laika «posiblemente sobrevivió solo unas horas tras llegar a la órbita» [[nasa-sputnik]]. Los relatos soviéticos anteriores decían que vivió días. En 2002 un científico de la misión contó que su cabina se sobrecalentó por un fallo del control de temperatura [[airspace-laika]].',
            'La NASA da para el Sputnik 1 23 pulgadas de diámetro y 184 libras; 58 cm y 83,6 kg son las cifras métricas [[nasa-explorer1]] [[nasa-sputnik]].',
            'Las páginas de historia de la NASA redondean la órbita a 90 o a unos 98 minutos [[nasa-sputnik]] [[nasa-dawn]]. APS News da 96, y un catálogo de satélites da 96,17, así que usamos 96 [[aps-sputnik]] [[skyrocket-sputnik]].',
          ],
        },
        ru: {
          title: 'Спутник и Лайка',
          lead: 'В октябре 1957 года металлический шар размером с пляжный мяч начал пищать с орбиты.',
          body: [
            '4 октября 1957 года Советский Союз запустил первый искусственный спутник — шар диаметром 58 см и массой 83,6 кг. Научных приборов на нём не было, только радиопередатчик, чьё «бип-бип» ловили по всему миру. Он облетал Землю примерно за 96 минут [[nasa-explorer1]] [[aps-sputnik]].',
            'Через 22 дня сели батареи. 4 января 1958 года он вошёл в атмосферу [[nasa-sputnik]].',
            '3 ноября 1957 года второй спутник поднял собаку по кличке Лайка — первое животное на орбите Земли. Вернуть её было невозможно, и на орбите она прожила лишь несколько часов. Её помнят как первое животное, облетевшее нашу планету [[nasa-sputnik]].',
          ],
          tryIt: {
            steps: [
              'Поставьте таймер на 96 минут и занимайтесь своими делами.',
              'Когда он зазвенит, скажите: Спутник облетел всю планету один раз.',
            ],
            lookFor: 'Что вы успели за один виток?',
          },
          grownUps: [
            'NASA пишет, что Лайка «возможно, прожила лишь несколько часов после выхода на орбиту» [[nasa-sputnik]]. Прежние советские сообщения говорили о нескольких днях. В 2002 году учёный, участвовавший в полёте, рассказал, что её кабина перегрелась из-за сбоя терморегулирования [[airspace-laika]].',
            'NASA даёт для первого спутника 23 дюйма и 184 фунта; 58 см и 83,6 кг — те же величины в метрических единицах [[nasa-explorer1]] [[nasa-sputnik]].',
            'Исторические страницы NASA округляют период обращения до 90 или примерно до 98 минут [[nasa-sputnik]] [[nasa-dawn]]. APS News даёт 96, а каталог спутников — 96,17, поэтому мы пишем 96 [[aps-sputnik]] [[skyrocket-sputnik]].',
          ],
        },
      },
    },
    {
      id: 'first-people',
      kind: 'explainer',
      figure: null,
      photo: 'soyuz-launch',
      text: {
        en: {
          title: 'Gagarin and Tereshkova',
          lead: '“Poyekhali”, “Let’s go”. With that word, Yuri Gagarin left the Earth.',
          body: [
            'On 12 April 1961 Yuri Gagarin flew once around the Earth in Vostok 1, the first person in space. As the rocket lifted off from Baikonur he said “Poyekhali”. The flight lasted 108 minutes [[nasa-gagarin]] [[esa-vostok1]].',
            'Near the end, about 7 km above the ground, he left the capsule in his ejection seat and came down under his own parachute in the Saratov region [[esa-vostok1]].',
            'On 16 June 1963 Valentina Tereshkova, 26, became the first woman in space. She had worked in a textile factory and jumped with parachutes at her local flying club. Her call sign was Chaika, “Seagull”. She flew for almost three days [[esa-tereshkova]] [[britannica-tereshkova]].',
          ],
          tryIt: {
            steps: [
              'Find something that lasts about 108 minutes: a long film, or a long walk.',
              'While it runs, picture going once round the whole planet.',
            ],
            lookFor: 'What else could you do in 108 minutes?',
          },
          grownUps: [
            'NASA gives 108 minutes [[nasa-gagarin]]. ESA’s minute-by-minute account gives its own times for each stage, which do not all add up to the same figure; we use NASA’s, the one most sources give [[esa-vostok1]]. His word is usually printed with an exclamation mark. This book leaves exclamation marks out, so we print it without one.',
            'Tereshkova: ESA gives 2 days, 23 hours and 12 minutes; Britannica gives 48 orbits in 71 hours [[esa-tereshkova]] [[britannica-tereshkova]].',
          ],
        },
        es: {
          title: 'Gagarin y Tereshkova',
          lead: '«Poyejali», «Vámonos». Con esa palabra, Yuri Gagarin dejó la Tierra.',
          body: [
            'El 12 de abril de 1961 Yuri Gagarin dio una vuelta a la Tierra en la Vostok 1, la primera persona en el espacio. Al despegar el cohete en Baikonur dijo «Poyejali». El vuelo duró 108 minutos [[nasa-gagarin]] [[esa-vostok1]].',
            'Cerca del final, a unos 7 km del suelo, salió de la cápsula en su asiento eyectable y bajó con su propio paracaídas en la región de Sarátov [[esa-vostok1]].',
            'El 16 de junio de 1963 Valentina Tereshkova, de 26 años, fue la primera mujer en el espacio. Había trabajado en una fábrica textil y saltaba en paracaídas en el aeroclub de su ciudad. Su indicativo era Chaika, «Gaviota». Voló casi tres días [[esa-tereshkova]] [[britannica-tereshkova]].',
          ],
          tryIt: {
            steps: [
              'Busca algo que dure unos 108 minutos: una película larga o un paseo largo.',
              'Mientras dura, imagina que das una vuelta entera al planeta.',
            ],
            lookFor: '¿Qué más podrías hacer en 108 minutos?',
          },
          grownUps: [
            'La NASA da 108 minutos [[nasa-gagarin]]. El relato minuto a minuto de la ESA da sus propias horas para cada etapa, que no suman exactamente lo mismo; usamos la cifra de la NASA, la que dan casi todas las fuentes [[esa-vostok1]]. Su palabra suele imprimirse con signos de exclamación. Este libro no los usa, así que la escribimos sin ellos.',
            'Tereshkova: la ESA da 2 días, 23 horas y 12 minutos; Britannica, 48 órbitas en 71 horas [[esa-tereshkova]] [[britannica-tereshkova]].',
          ],
        },
        ru: {
          title: 'Гагарин и Терешкова',
          lead: '«Поехали» — с этим словом Юрий Гагарин покинул Землю.',
          body: [
            '12 апреля 1961 года Юрий Гагарин облетел Землю на корабле «Восток-1» — первым из людей. Когда ракета оторвалась от Байконура, он сказал: «Поехали». Полёт длился 108 минут [[nasa-gagarin]] [[esa-vostok1]].',
            'В конце, примерно в 7 км над землёй, он покинул капсулу в катапультном кресле и спустился на собственном парашюте в Саратовской области [[esa-vostok1]].',
            '16 июня 1963 года 26-летняя Валентина Терешкова стала первой женщиной в космосе. Она работала на текстильной фабрике и прыгала с парашютом в местном аэроклубе. Её позывной был «Чайка». Она летала почти трое суток [[esa-tereshkova]] [[britannica-tereshkova]].',
          ],
          tryIt: {
            steps: [
              'Найдите занятие примерно на 108 минут: длинный фильм или долгую прогулку.',
              'Пока оно длится, представьте, что облетаете всю планету.',
            ],
            lookFor: 'Что ещё можно успеть за 108 минут?',
          },
          grownUps: [
            'NASA даёт 108 минут [[nasa-gagarin]]. Поминутная хроника ESA приводит собственное время для каждого этапа, и в сумме оно не везде совпадает; мы берём цифру NASA, которую дают почти все источники [[esa-vostok1]]. Слово Гагарина обычно печатают с восклицательным знаком. В этой книге восклицательных знаков нет, поэтому мы пишем его без него.',
            'Терешкова: ESA даёт 2 суток 23 часа 12 минут, Britannica — 48 витков за 71 час [[esa-tereshkova]] [[britannica-tereshkova]].',
          ],
        },
      },
    },
    {
      id: 'suits-spacewalk',
      kind: 'explainer',
      figure: null,
      photo: 'spacewalk',
      text: {
        en: {
          title: 'A suit, and a walk in space',
          lead: 'To go where the air runs out, you have to bring your own air with you.',
          body: [
            'In 1935 Emilio Herrera, an engineer from Granada in Spain, designed a pressure suit for a balloon flight above 20,000 m. Its helmet had a visor, a microphone and its own breathing system [[enaire-herrera]]. The Spanish Civil War began before the flight, and it never took place [[wiki-herrera-suit]].',
            'On 18 March 1965 Alexei Leonov left Voskhod 2 and floated in space for about 12 minutes, the first person ever to do so. In the vacuum his suit puffed up and went stiff. Without asking the ground, he let some air out of it, and could then bend enough to get back in [[esa-leonov]].',
            'Leonov was also an artist. He took coloured pencils into space and made the first drawings of Earth from orbit [[esa-leonov]].',
          ],
          tryIt: {
            steps: [
              'Take coloured pencils and a sheet of paper.',
              'Draw the curve of the Earth, the thin blue band of air and the black sky above.',
              'Put on thick gloves and draw it again.',
            ],
            lookFor: 'How hard is it to draw in stiff gloves? Leonov’s suit was stiffer still.',
          },
          grownUps: [
            'The Fundación ENAIRE, which is digitising Herrera’s archive, describes the suit as designed for an ascent above 20,000 m, with a thermal visor, microphone and breathing system [[enaire-herrera]]. Some writers call it a forerunner of modern space suits; we have not found a primary source for that claim.',
            'ESA gives Leonov’s suit pressure after venting as 0.27 bar, about 27 per cent of sea-level air pressure {{estimate}}. Guinness gives the walk as 12 minutes 9 seconds [[esa-leonov]] [[guinness-spacewalk]].',
          ],
        },
        es: {
          title: 'Un traje y un paseo espacial',
          lead: 'Para ir donde se acaba el aire, tienes que llevar tu propio aire contigo.',
          body: [
            'En 1935 Emilio Herrera, ingeniero granadino, diseñó una escafandra presurizada para un vuelo en globo a más de 20 000 m. Su casco tenía visor, micrófono y su propio sistema de respiración [[enaire-herrera]]. La Guerra Civil empezó antes del vuelo, que nunca se hizo [[wiki-herrera-suit]].',
            'El 18 de marzo de 1965 Alexéi Leónov salió de la Vosjod 2 y flotó en el espacio unos 12 minutos, la primera persona en hacerlo. En el vacío su traje se infló y se puso rígido. Sin consultar con tierra, dejó escapar algo de aire y así pudo doblarse lo justo para volver a entrar [[esa-leonov]].',
            'Leónov también era artista. Llevó lápices de colores al espacio e hizo los primeros dibujos de la Tierra desde la órbita [[esa-leonov]].',
          ],
          tryIt: {
            steps: [
              'Toma lápices de colores y una hoja de papel.',
              'Dibuja la curva de la Tierra, la fina franja azul del aire y el cielo negro encima.',
              'Ponte unos guantes gruesos y dibújala otra vez.',
            ],
            lookFor: '¿Qué difícil es dibujar con guantes rígidos? El traje de Leónov era aún más rígido.',
          },
          grownUps: [
            'La Fundación ENAIRE, que digitaliza el archivo de Herrera, describe la escafandra como diseñada para subir a más de 20 000 m, con visor térmico, micrófono y sistema de respiración [[enaire-herrera]]. Algunos autores la llaman precursora de los trajes espaciales modernos; no hemos encontrado una fuente primaria para esa afirmación.',
            'La ESA da para el traje de Leónov, tras soltar aire, una presión de 0,27 bar, cerca del 27 por ciento de la presión del aire a nivel del mar {{estimate}}. Guinness da al paseo 12 minutos y 9 segundos [[esa-leonov]] [[guinness-spacewalk]].',
          ],
        },
        ru: {
          title: 'Скафандр и выход в космос',
          lead: 'Чтобы попасть туда, где кончается воздух, его нужно взять с собой.',
          body: [
            'В 1935 году Эмилио Эррера, инженер из испанской Гранады, сконструировал герметичный скафандр для полёта на аэростате выше 20 000 м. У шлема были визор, микрофон и своя система дыхания [[enaire-herrera]]. До полёта началась гражданская война в Испании, и он так и не состоялся [[wiki-herrera-suit]].',
            '18 марта 1965 года Алексей Леонов вышел из корабля «Восход-2» и около 12 минут парил в открытом космосе — первым из людей. В пустоте его скафандр раздулся и стал жёстким. Не спрашивая Землю, он стравил часть воздуха и смог согнуться настолько, чтобы вернуться внутрь [[esa-leonov]].',
            'Леонов был ещё и художником. Он взял в космос цветные карандаши и сделал первые рисунки Земли с орбиты [[esa-leonov]].',
          ],
          tryIt: {
            steps: [
              'Возьмите цветные карандаши и лист бумаги.',
              'Нарисуйте изгиб Земли, тонкую голубую полоску воздуха и чёрное небо над ней.',
              'Наденьте толстые перчатки и нарисуйте ещё раз.',
            ],
            lookFor: 'Трудно ли рисовать в жёстких перчатках? Скафандр Леонова был ещё жёстче.',
          },
          grownUps: [
            'Фонд ENAIRE, который оцифровывает архив Эрреры, описывает скафандр как рассчитанный на подъём выше 20 000 м, с термовизором, микрофоном и системой дыхания [[enaire-herrera]]. Некоторые авторы называют его предшественником современных космических скафандров; первоисточника для этого утверждения мы не нашли.',
            'По данным ESA, после сброса воздуха давление в скафандре Леонова было 0,27 бар — около 27 процентов давления воздуха на уровне моря {{estimate}}. Guinness даёт для выхода 12 минут 9 секунд [[esa-leonov]] [[guinness-spacewalk]].',
          ],
        },
      },
    },
    {
      id: 'space-timeline',
      kind: 'timeline',
      figure: null,
      photo: 'moon',
      text: {
        en: {
          title: 'Timeline: into space',
          lead: 'Read down the page, from a teacher’s sums to a helicopter on Mars.',
          body: [],
          timeline: [
            { when: '1903', what: 'Konstantin Tsiolkovsky describes the rocket equation [[encyclopedia-tsiolkovsky]].' },
            { when: '4 October 1957', what: 'Sputnik 1, the first artificial satellite [[nasa-sputnik]].' },
            { when: '12 April 1961', what: 'Yuri Gagarin, the first person in space [[nasa-gagarin]].' },
            { when: '16 June 1963', what: 'Valentina Tereshkova, the first woman in space [[esa-tereshkova]].' },
            { when: '18 March 1965', what: 'Alexei Leonov makes the first spacewalk [[esa-leonov]].' },
            { when: '20 July 1969', what: 'Apollo 11 lands on the Moon. Neil Armstrong and Buzz Aldrin walk on it [[nasa-apollo11]].' },
            { when: '12 April 1981', what: 'The first Space Shuttle, Columbia, launches, 20 years to the day after Gagarin [[nasa-sts1]].' },
            { when: '15 November 1988', what: 'Buran flies two orbits and lands with no one aboard [[buran-guinness]].' },
            { when: '29 October 1998', what: 'Pedro Duque becomes the first Spaniard in space, aboard Discovery [[esa-duque]].' },
            { when: '21 December 2015', what: 'A rocket stage from an orbital launch flies back and lands upright for the first time [[planetary-falcon]].' },
            { when: '19 April 2021', what: 'Ingenuity makes the first powered flight on another planet [[nasa-ingenuity]].' },
          ],
          tryIt: {
            steps: [
              'Make a paper strip with 1 cm for every year from 1957 to today.',
              'Mark Sputnik, Gagarin and the Moon landing.',
            ],
            lookFor: 'How many centimetres from Sputnik to the Moon? Only 12 years passed.',
          },
          grownUps: [
            'Each date comes from the section that covers it, or from NASA’s and ESA’s mission pages. Columbia landed on 14 April 1981 at Edwards Air Force Base in California [[nasa-sts1]].',
          ],
        },
        es: {
          title: 'Cronología: al espacio',
          lead: 'Lee de arriba abajo, de las cuentas de un maestro a un helicóptero en Marte.',
          body: [],
          timeline: [
            { when: '1903', what: 'Konstantín Tsiolkovski describe la ecuación del cohete [[encyclopedia-tsiolkovsky]].' },
            { when: '4 de octubre de 1957', what: 'El Sputnik 1, el primer satélite artificial [[nasa-sputnik]].' },
            { when: '12 de abril de 1961', what: 'Yuri Gagarin, la primera persona en el espacio [[nasa-gagarin]].' },
            { when: '16 de junio de 1963', what: 'Valentina Tereshkova, la primera mujer en el espacio [[esa-tereshkova]].' },
            { when: '18 de marzo de 1965', what: 'Alexéi Leónov hace el primer paseo espacial [[esa-leonov]].' },
            { when: '20 de julio de 1969', what: 'El Apolo 11 se posa en la Luna. Neil Armstrong y Buzz Aldrin caminan por ella [[nasa-apollo11]].' },
            { when: '12 de abril de 1981', what: 'Despega el primer transbordador espacial, el Columbia, 20 años justos después de Gagarin [[nasa-sts1]].' },
            { when: '15 de noviembre de 1988', what: 'El Buran da dos vueltas a la Tierra y aterriza sin nadie a bordo [[buran-guinness]].' },
            { when: '29 de octubre de 1998', what: 'Pedro Duque es el primer español en el espacio, a bordo del Discovery [[esa-duque]].' },
            { when: '21 de diciembre de 2015', what: 'Por primera vez, una etapa de cohete de un lanzamiento orbital vuelve y aterriza de pie [[planetary-falcon]].' },
            { when: '19 de abril de 2021', what: 'Ingenuity hace el primer vuelo con motor en otro planeta [[nasa-ingenuity]].' },
          ],
          tryIt: {
            steps: [
              'Haz una tira de papel con 1 cm por cada año desde 1957 hasta hoy.',
              'Marca el Sputnik, a Gagarin y la llegada a la Luna.',
            ],
            lookFor: '¿Cuántos centímetros hay del Sputnik a la Luna? Solo pasaron 12 años.',
          },
          grownUps: [
            'Cada fecha procede de la sección que la trata o de las páginas de misión de la NASA y la ESA. El Columbia aterrizó el 14 de abril de 1981 en la base aérea de Edwards, en California [[nasa-sts1]].',
          ],
        },
        ru: {
          title: 'Хронология: в космос',
          lead: 'Читайте сверху вниз: от расчётов учителя до вертолёта на Марсе.',
          body: [],
          timeline: [
            { when: '1903', what: 'Константин Циолковский выводит формулу ракеты [[encyclopedia-tsiolkovsky]].' },
            { when: '4 октября 1957', what: 'Первый искусственный спутник Земли [[nasa-sputnik]].' },
            { when: '12 апреля 1961', what: 'Юрий Гагарин — первый человек в космосе [[nasa-gagarin]].' },
            { when: '16 июня 1963', what: 'Валентина Терешкова — первая женщина в космосе [[esa-tereshkova]].' },
            { when: '18 марта 1965', what: 'Алексей Леонов первым выходит в открытый космос [[esa-leonov]].' },
            { when: '20 июля 1969', what: '«Аполлон-11» садится на Луну. Нил Армстронг и Базз Олдрин идут по ней [[nasa-apollo11]].' },
            { when: '12 апреля 1981', what: 'Стартует первый «Спейс шаттл», «Колумбия», ровно через 20 лет после Гагарина [[nasa-sts1]].' },
            { when: '15 ноября 1988', what: '«Буран» делает два витка и садится без экипажа [[buran-guinness]].' },
            { when: '29 октября 1998', what: 'Педро Дуке — первый испанец в космосе, на борту «Дискавери» [[esa-duque]].' },
            { when: '21 декабря 2015', what: 'Ступень ракеты с орбитального пуска впервые возвращается и садится вертикально [[planetary-falcon]].' },
            { when: '19 апреля 2021', what: 'Ingenuity совершает первый полёт с двигателем на другой планете [[nasa-ingenuity]].' },
          ],
          tryIt: {
            steps: [
              'Сделайте бумажную полоску: 1 см на каждый год с 1957 года до сегодня.',
              'Отметьте Спутник, Гагарина и посадку на Луну.',
            ],
            lookFor: 'Сколько сантиметров от Спутника до Луны? Прошло всего 12 лет.',
          },
          grownUps: [
            'Каждая дата взята из раздела, где о ней рассказано, или со страниц миссий NASA и ESA. «Колумбия» села 14 апреля 1981 года на авиабазе Эдвардс в Калифорнии [[nasa-sts1]].',
          ],
        },
      },
    },
    {
      id: 'x-15',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'The X-15 rocket plane',
          lead: 'Dropped from a bomber, it fired its rocket for two minutes or less, then glided home.',
          body: [
            'Three X-15 rocket planes flew 199 times between 1959 and 1968. A B-52 carried each one to about 13,700 m and let it go [[nasa-x15]].',
            'Its engine burned for 80 to 120 seconds. The rest of the flight, 8 to 12 minutes in all, had no power and ended in a glide landing at about 320 km/h on a dry lake bed. Its main landing gear were skids, like a sledge [[nasa-x15]].',
            'It reached 7,274 km/h, Mach 6.7, in 1967, and 107.96 km up, above the 100 km line, in 1963 [[nasa-x15]].',
          ],
          tryIt: {
            steps: [
              'Hold a paper plane high and let it go without throwing, nose slightly down.',
              'Do the same from lower down.',
              'Mark where each one lands.',
            ],
            lookFor: 'Like the X-15, a plane let go from higher up has more height to turn into a long glide.',
          },
          grownUps: [
            'NASA calls the speed and height “unofficial” world records, and says the X-15 work fed into Mercury, Gemini, Apollo and the Space Shuttle [[nasa-x15]].',
            'Conversions are ours: 4,520 mph is 7,274 km/h, 354,200 feet is 107.96 km, 45,000 feet is 13,700 m and 200 mph is 320 km/h {{estimate}}.',
          ],
        },
        es: {
          title: 'El avión cohete X-15',
          lead: 'Lo soltaba un bombardero, encendía su cohete dos minutos o menos y volvía planeando.',
          body: [
            'Tres aviones cohete X-15 volaron 199 veces entre 1959 y 1968. Un B-52 subía cada uno hasta unos 13 700 m y lo soltaba [[nasa-x15]].',
            'Su motor funcionaba de 80 a 120 segundos. El resto del vuelo, de 8 a 12 minutos en total, iba sin motor y acababa en un aterrizaje planeando a unos 320 km/h sobre un lago seco. Su tren principal eran patines, como un trineo [[nasa-x15]].',
            'Alcanzó 7274 km/h, Mach 6,7, en 1967, y 107,96 km de altura, por encima de la línea de 100 km, en 1963 [[nasa-x15]].',
          ],
          tryIt: {
            steps: [
              'Sujeta un avión de papel en alto y suéltalo sin lanzarlo, con el morro un poco hacia abajo.',
              'Haz lo mismo desde más abajo.',
              'Marca dónde aterriza cada uno.',
            ],
            lookFor: 'Como el X-15, un avión soltado desde más alto tiene más altura que convertir en un planeo largo.',
          },
          grownUps: [
            'La NASA llama a la velocidad y la altura récords mundiales «no oficiales», y dice que el trabajo del X-15 sirvió a Mercury, Gemini, Apolo y el transbordador espacial [[nasa-x15]].',
            'Las conversiones son nuestras: 4520 mph son 7274 km/h, 354 200 pies son 107,96 km, 45 000 pies son 13 700 m y 200 mph son 320 km/h {{estimate}}.',
          ],
        },
        ru: {
          title: 'Ракетоплан X-15',
          lead: 'Его сбрасывали с бомбардировщика, он включал ракету на две минуты или меньше и возвращался планированием.',
          body: [
            'Три ракетоплана X-15 совершили 199 полётов с 1959 по 1968 год. Бомбардировщик B-52 поднимал каждый примерно на 13 700 м и отпускал [[nasa-x15]].',
            'Двигатель работал от 80 до 120 секунд. Остаток полёта, всего 8–12 минут, проходил без тяги и заканчивался посадкой планированием на скорости около 320 км/ч на сухое дно озера. Вместо основных колёс у него были лыжи, как у саней [[nasa-x15]].',
            'Он развил 7274 км/ч, 6,7 Маха, в 1967 году и поднялся на 107,96 км, выше линии 100 км, в 1963 году [[nasa-x15]].',
          ],
          tryIt: {
            steps: [
              'Поднимите бумажный самолёт повыше и отпустите без броска, чуть опустив нос.',
              'Сделайте то же пониже.',
              'Отметьте, где приземлился каждый.',
            ],
            lookFor: 'Как и у X-15, у самолёта, отпущенного выше, больше высоты, которую можно превратить в долгое планирование.',
          },
          grownUps: [
            'NASA называет рекорды скорости и высоты «неофициальными» и пишет, что работа над X-15 помогла программам «Меркурий», «Джемини», «Аполлон» и «Спейс шаттл» [[nasa-x15]].',
            'Пересчёты наши: 4520 миль/ч — это 7274 км/ч, 354 200 футов — 107,96 км, 45 000 футов — 13 700 м, 200 миль/ч — 320 км/ч {{estimate}}.',
          ],
        },
      },
    },
    {
      id: 'reentry-gliders',
      kind: 'explainer',
      figure: 'space-reentry',
      photo: null,
      text: {
        en: {
          caption: 'A return from orbit in section view: down through the thin air, gliding all the way to the runway, with no engine.',
          title: 'Coming home on a glide',
          lead: 'Some spacecraft land like gliders. Nothing pulls them. They fall forwards.',
          body: [
            'The Space Shuttle orbiter landed with no engine power. Its glide home began about an hour before touchdown, on the far side of the planet [[nasa-ksc-landing]]. NASA gives it a glide ratio of about 1, against about 70 for a high-performance sailplane, because it had to slow from about 27,800 km/h to about 400 km/h [[nasa-shuttle-glider]].',
            'It came in on a slope of about 20 degrees, more than six times steeper than an airliner, and touched down at 343 to 364 km/h. There was no second try [[nasa-ksc-landing]].',
            'The Soviet shuttle Buran flew once. On 15 November 1988 it went up without a crew, circled the Earth twice and landed by itself at Baikonur. Its builder, Energia, said no spacecraft of its class had ever landed completely automatically before [[buran-britannica]] [[buran-sfn]].',
          ],
          tryIt: {
            steps: [
              'Fold a paper plane with broad wings. Stand on a low step, or let a tall helper hold it up high.',
              'Let it glide down with no throw.',
              'Measure how far it goes for the height you started from.',
            ],
            lookFor: 'How many steps of distance for each step of height?',
          },
          grownUps: [
            'Glide ratio is distance divided by height lost. NASA Glenn gives a sailplane about 70 and the Shuttle about 1 overall [[nasa-shuttle-glider]]. That covers the whole trip down from orbit. On the last steep slope of 18 to 20 degrees it went about 3 m forwards for each metre down, as the chapter “How flight works” shows. That chapter uses the FAA’s 60 for one long-winged sailplane; NASA Glenn gives the best ones about 70. 17,300 mph is 27,800 km/h and 250 mph is 400 km/h {{estimate}}.',
            'Buran’s flight is given as 205 or 206 minutes in different sources [[buran-astronomy]] [[buran-sfn]]. The orbiter was destroyed in 2002 when its hangar at Baikonur collapsed [[buran-britannica]].',
          ],
        },
        es: {
          caption: 'Una vuelta desde la órbita en sección: baja por el aire fino y planea hasta la pista, sin motor.',
          title: 'Volver a casa planeando',
          lead: 'Algunas naves aterrizan como planeadores. Nada tira de ellas. Caen hacia delante.',
          body: [
            'El orbitador del transbordador espacial aterrizaba sin motor. Su planeo de vuelta empezaba una hora antes de tocar tierra, al otro lado del planeta [[nasa-ksc-landing]]. La NASA le da una relación de planeo de cerca de 1, frente a unos 70 de un velero de altas prestaciones, porque tenía que frenar de unos 27 800 km/h a unos 400 km/h [[nasa-shuttle-glider]].',
            'Se acercaba con una pendiente de unos 20 grados, más de seis veces más empinada que la de un avión de pasajeros, y tocaba tierra a entre 343 y 364 km/h. No había segunda oportunidad [[nasa-ksc-landing]].',
            'El transbordador soviético Buran voló una sola vez. El 15 de noviembre de 1988 subió sin tripulación, dio dos vueltas a la Tierra y aterrizó solo en Baikonur. Su constructora, Energia, dijo que nunca antes una nave de su clase había aterrizado de forma totalmente automática [[buran-britannica]] [[buran-sfn]].',
          ],
          tryIt: {
            steps: [
              'Pliega un avión de papel con alas anchas. Súbete a un escalón bajo, o pide a una persona alta que ayude y lo sostenga en alto.',
              'Déjalo planear hacia abajo sin lanzarlo.',
              'Mide cuánto llega para la altura de la que partió.',
            ],
            lookFor: '¿Cuántos pasos de distancia por cada paso de altura?',
          },
          grownUps: [
            'La relación de planeo es la distancia dividida por la altura perdida. NASA Glenn da cerca de 70 a un velero y cerca de 1 al transbordador en conjunto [[nasa-shuttle-glider]]. Esa cifra vale para todo el descenso desde la órbita. En la última pendiente, de 18 a 20 grados, avanzaba unos 3 m por cada metro de bajada, como muestra el capítulo «Cómo funciona el vuelo». Ese capítulo usa el 60 de la FAA para un velero de alas largas; NASA Glenn da a los mejores unos 70. 17 300 mph son 27 800 km/h y 250 mph son 400 km/h {{estimate}}.',
            'La duración del vuelo del Buran es de 205 o 206 minutos según la fuente [[buran-astronomy]] [[buran-sfn]]. El orbitador quedó destruido en 2002 cuando se derrumbó su hangar en Baikonur [[buran-britannica]].',
          ],
        },
        ru: {
          caption: 'Возвращение с орбиты в разрезе: вниз сквозь разреженный воздух и планированием до полосы, без двигателя.',
          title: 'Домой на планировании',
          lead: 'Некоторые космические аппараты садятся как планёры. Ничто их не тянет. Они падают вперёд.',
          body: [
            'Орбитальный корабль «Спейс шаттл» садился без тяги двигателей. Его планирование домой начиналось примерно за час до касания, на другой стороне планеты [[nasa-ksc-landing]]. NASA даёт ему качество около 1, против около 70 у высококачественного планёра, ведь ему нужно было сбросить скорость примерно с 27 800 до 400 км/ч [[nasa-shuttle-glider]].',
            'Он заходил на посадку под углом около 20 градусов — в шесть с лишним раз круче пассажирского самолёта — и касался полосы на скорости 343–364 км/ч. Второй попытки не было [[nasa-ksc-landing]].',
            'Советский «Буран» летал один раз. 15 ноября 1988 года он поднялся без экипажа, сделал два витка вокруг Земли и сам сел на Байконуре. Его создатель, РКК «Энергия», сообщил, что корабль такого класса впервые сел полностью автоматически [[buran-britannica]] [[buran-sfn]].',
          ],
          tryIt: {
            steps: [
              'Сложите бумажный самолёт с широкими крыльями. Встаньте на низкую ступеньку или попросите помощника повыше поднять его.',
              'Дайте ему спланировать вниз без броска.',
              'Измерьте, как далеко он улетел с той высоты, с которой начал.',
            ],
            lookFor: 'Сколько шагов дальности на каждый шаг высоты?',
          },
          grownUps: [
            'Качество планирования — дальность, делённая на потерянную высоту. NASA Glenn даёт планёру около 70, а «Шаттлу» в целом около 1 [[nasa-shuttle-glider]]. Эта цифра относится ко всему спуску с орбиты. На последней крутой глиссаде в 18–20 градусов он пролетал около 3 м вперёд на каждый метр снижения, как показано в главе «Как устроен полёт». Там приведено качество 60 по данным FAA для одного длиннокрылого планёра; NASA Glenn даёт лучшим около 70. 17 300 миль/ч — это 27 800 км/ч, 250 миль/ч — 400 км/ч {{estimate}}.',
            'Длительность полёта «Бурана» в разных источниках — 205 или 206 минут [[buran-astronomy]] [[buran-sfn]]. Корабль уничтожен в 2002 году при обрушении его ангара на Байконуре [[buran-britannica]].',
          ],
        },
      },
    },
    {
      id: 'paper-stratosphere',
      kind: 'explainer',
      figure: null,
      photo: 'paper-plane-forest',
      text: {
        en: {
          title: 'Paper planes in the stratosphere',
          lead: 'No paper plane has been launched from space. But balloons have carried them a third of the way.',
          body: [
            'In 2010 a team from the British technology news site The Register sent a paper plane called Vulture 1 up under a balloon over central Spain. It was let go at about 27,300 m, almost 90,000 feet [[register-paris-2010]] [[register-record-2015]]. Guinness World Records recognised it as the highest paper plane launch [[register-guinness-2012]].',
            'In 2015 a school science club from Kesgrave High School, near Ipswich in England, beat it. Their Stratos III was released from a high-altitude balloon at 35,043 m [[guinness-paper-altitude]] [[register-record-2015]].',
            'That is about twice as high as Concorde flew, and about a third of the way to the 100 km line {{estimate}} [[nasm-concorde]].',
          ],
          tryIt: {
            steps: [
              'Start a launch log for one paper plane: date, place, launch height, distance.',
              'Launch it from a low step, then let a tall helper launch it from higher up.',
              'Compare the two lines in your log.',
            ],
            lookFor: 'Every record in this book began as a log like yours.',
          },
          grownUps: [
            'These planes were released in the stratosphere, not in space. The Register gives Vulture 1’s release height as 27,310 m in 2015 and “almost 90,000 feet” in 2010 [[register-record-2015]] [[register-paris-2010]].',
            'Guinness lists the record as 35,043 m by David Green, at Elsworth, Cambridgeshire, on 24 June 2015 [[guinness-paper-altitude]]. Other balloon teams have reported high launches that Guinness has not confirmed, and we leave them out.',
          ],
        },
        es: {
          title: 'Aviones de papel en la estratosfera',
          lead: 'Nunca se ha lanzado un avión de papel desde el espacio. Pero los globos los han llevado un tercio del camino.',
          body: [
            'En 2010 un equipo de la web británica de noticias tecnológicas The Register subió un avión de papel llamado Vulture 1 bajo un globo sobre el centro de España. Lo soltaron a unos 27 300 m, casi 90 000 pies [[register-paris-2010]] [[register-record-2015]]. Guinness World Records lo reconoció como el lanzamiento de avión de papel más alto [[register-guinness-2012]].',
            'En 2015 el club de ciencias del instituto Kesgrave High School, cerca de Ipswich, en Inglaterra, lo superó. Su Stratos III se soltó desde un globo de gran altitud a 35 043 m [[guinness-paper-altitude]] [[register-record-2015]].',
            'Es más o menos el doble de alto de lo que volaba el Concorde, y un tercio del camino hasta la línea de 100 km {{estimate}} [[nasm-concorde]].',
          ],
          tryIt: {
            steps: [
              'Empieza un registro de lanzamientos para un avión de papel: fecha, lugar, altura de lanzamiento, distancia.',
              'Lánzalo desde un escalón bajo y luego pide a una persona alta que ayude y lo lance desde más arriba.',
              'Compara las dos líneas de tu registro.',
            ],
            lookFor: 'Cada récord de este libro empezó como un registro como el tuyo.',
          },
          grownUps: [
            'Estos aviones se soltaron en la estratosfera, no en el espacio. The Register da para el Vulture 1 una altura de 27 310 m en 2015 y «casi 90 000 pies» en 2010 [[register-record-2015]] [[register-paris-2010]].',
            'Guinness registra el récord como 35 043 m, de David Green, en Elsworth, Cambridgeshire, el 24 de junio de 2015 [[guinness-paper-altitude]]. Otros equipos de globos han anunciado lanzamientos altos que Guinness no ha confirmado, y los dejamos fuera.',
          ],
        },
        ru: {
          title: 'Бумажные самолёты в стратосфере',
          lead: 'Из космоса бумажный самолёт ещё никто не запускал. Но аэростаты поднимали их на треть пути.',
          body: [
            'В 2010 году команда британского сайта технологических новостей The Register подняла бумажный самолёт Vulture 1 на аэростате над центральной Испанией. Его отпустили примерно на 27 300 м, почти 90 000 футов [[register-paris-2010]] [[register-record-2015]]. Книга рекордов Гиннесса признала это самым высоким запуском бумажного самолёта [[register-guinness-2012]].',
            'В 2015 году научный кружок школы Кесгрейв близ Ипсвича в Англии побил этот рекорд. Их Stratos III отпустили с высотного аэростата на высоте 35 043 м [[guinness-paper-altitude]] [[register-record-2015]].',
            'Это примерно вдвое выше, чем летал «Конкорд», и около трети пути до линии 100 км {{estimate}} [[nasm-concorde]].',
          ],
          tryIt: {
            steps: [
              'Заведите журнал запусков одного бумажного самолёта: дата, место, высота запуска, дальность.',
              'Запустите его с низкой ступеньки, а потом попросите помощника повыше запустить его сверху.',
              'Сравните две строки в журнале.',
            ],
            lookFor: 'Каждый рекорд в этой книге начинался с такого журнала, как ваш.',
          },
          grownUps: [
            'Эти самолёты отпускали в стратосфере, а не в космосе. The Register называет высоту отпуска Vulture 1 27 310 м в 2015 году и «почти 90 000 футов» в 2010 году [[register-record-2015]] [[register-paris-2010]].',
            'Guinness записывает рекорд как 35 043 м, Дэвид Грин, Элсуорт, Кембриджшир, 24 июня 2015 года [[guinness-paper-altitude]]. Другие команды сообщали о высоких запусках, которые Guinness не подтвердил, и мы их не приводим.',
          ],
        },
      },
    },
    {
      id: 'origami-space',
      kind: 'explainer',
      figure: null,
      photo: 'folding-hands',
      text: {
        en: {
          title: 'The origami plane that never launched',
          lead: 'A Japanese team planned to drop paper planes from the space station. The planes were tested. They were never launched.',
          body: [
            'In 2008 Takuo Toda, head of the Japan Origami Airplane Association, and Shinji Suzuki, an aerospace engineer at the University of Tokyo, announced a plan to release small origami planes from the International Space Station. A Japanese astronaut would release about 100 of them from around 400 km up [[bbc-2008]].',
            'In early 2008 a small prototype, shaped like a space shuttle, went into a hypersonic wind tunnel at the University of Tokyo. It held up at Mach 7, seven times the speed of sound, and at temperatures reported as about 230 to 250 °C [[bbc-2008]] [[nbc-2008]].',
            'No plane was ever launched from the station. The launch was tentatively set for 2009. In 2009 the team postponed it, because it would be almost impossible to track the planes over a descent of about a week, and nobody was sure any would survive re-entry [[wiki-paper-plane-space]].',
          ],
          tryIt: {
            steps: [
              'Fold a small paper plane from stiff paper.',
              'Decide what would worry you about a week-long fall: heat, wind, losing sight of it.',
              'Write three worries on a card. Add one idea for each.',
            ],
            lookFor: 'Could you fix any worry with a different fold?',
          },
          grownUps: [
            'Reports of the wind tunnel test disagree. The length of the test is given as about 10 seconds, about 12 seconds and about 30 seconds in different news reports, and the temperature as about 230 °C or about 250 °C [[bbc-2008]] [[nbc-2008]]. We have not found the team’s own test record, so we give ranges.',
            'The postponement is described in Wikipedia’s article on paper planes launched from space, which cites Air & Space magazine, a 2009 newspaper report and a JAXA email. We have not read those sources directly [[wiki-paper-plane-space]]. We found no source that says any plane was launched.',
          ],
        },
        es: {
          title: 'El avión de papiroflexia que nunca se lanzó',
          lead: 'Un equipo japonés planeó soltar aviones de papel desde la estación espacial. Los aviones se probaron. Nunca se lanzaron.',
          body: [
            'En 2008 Takuo Toda, presidente de la Asociación Japonesa del Avión de Origami, y Shinji Suzuki, ingeniero aeroespacial de la Universidad de Tokio, anunciaron el plan de soltar pequeños aviones de origami desde la Estación Espacial Internacional. Un astronauta japonés soltaría unos 100 desde unos 400 km de altura [[bbc-2008]].',
            'A principios de 2008 un pequeño prototipo, con forma de transbordador espacial, entró en un túnel de viento hipersónico de la Universidad de Tokio. Resistió Mach 7, siete veces la velocidad del sonido, y temperaturas que se citan de unos 230 a 250 °C [[bbc-2008]] [[nbc-2008]].',
            'Nunca se lanzó ningún avión desde la estación. El lanzamiento se fijó de forma provisional para 2009. En 2009 el equipo lo aplazó, porque sería casi imposible seguir a los aviones durante un descenso de una semana y nadie estaba seguro de que alguno sobreviviera a la reentrada [[wiki-paper-plane-space]].',
          ],
          tryIt: {
            steps: [
              'Pliega un avión de papel pequeño con papel rígido.',
              'Decide qué te preocuparía de una caída de una semana: el calor, el viento, perderlo de vista.',
              'Escribe tres preocupaciones en una ficha. Añade una idea para cada una.',
            ],
            lookFor: '¿Podrías resolver alguna con otro pliegue?',
          },
          grownUps: [
            'Los informes de la prueba en el túnel discrepan. La duración se da como unos 10 segundos, unos 12 segundos y unos 30 segundos en distintas noticias, y la temperatura como unos 230 °C o unos 250 °C [[bbc-2008]] [[nbc-2008]]. No hemos encontrado el registro de prueba del propio equipo, así que damos intervalos.',
            'El aplazamiento se describe en el artículo de Wikipedia sobre aviones de papel lanzados desde el espacio, que cita la revista Air & Space, una noticia de prensa de 2009 y un correo de la JAXA. No hemos leído esas fuentes directamente [[wiki-paper-plane-space]]. No hemos encontrado ninguna fuente que diga que se lanzó algún avión.',
          ],
        },
        ru: {
          title: 'Оригами-самолёт, который так и не запустили',
          lead: 'Японская команда планировала сбросить бумажные самолёты с космической станции. Самолёты испытали. Запущены они не были.',
          body: [
            'В 2008 году Такуо Тода, глава Японской ассоциации оригами-самолётов, и Синдзи Судзуки, инженер-аэрокосмик Токийского университета, объявили план: выпустить маленькие оригами-самолёты с Международной космической станции. Японский астронавт должен был выпустить около 100 штук с высоты около 400 км [[bbc-2008]].',
            'В начале 2008 года небольшой прототип в форме космического челнока испытали в гиперзвуковой аэродинамической трубе Токийского университета. Он выдержал скорость в 7 раз больше скорости звука, число Маха 7, и температуры, которые называют около 230–250 °C [[bbc-2008]] [[nbc-2008]].',
            'Со станции не был запущен ни один самолёт. Запуск предварительно назначили на 2009 год. В 2009 году команда отложила его: отследить самолёты за примерно недельное снижение почти невозможно, и никто не был уверен, что хоть один переживёт вход в атмосферу [[wiki-paper-plane-space]].',
          ],
          tryIt: {
            steps: [
              'Сложите маленький бумажный самолёт из плотной бумаги.',
              'Решите, что вас беспокоило бы в недельном падении: жар, ветер, потеря из виду.',
              'Запишите три тревоги на карточке. Добавьте по одной идее для каждой.',
            ],
            lookFor: 'Можно ли решить хоть одну другим сгибом?',
          },
          grownUps: [
            'Сообщения об испытании в трубе расходятся. Длительность называют около 10 секунд, около 12 секунд и около 30 секунд в разных новостях, а температуру — около 230 °C или около 250 °C [[bbc-2008]] [[nbc-2008]]. Собственной записи испытаний команды мы не нашли, поэтому даём диапазоны.',
            'Отсрочка описана в статье Wikipedia о бумажных самолётах, запущенных из космоса, которая ссылается на журнал Air & Space, газетную заметку 2009 года и письмо JAXA. Мы не читали эти источники напрямую [[wiki-paper-plane-space]]. Источника, где сказано, что какой-либо самолёт запускали, мы не нашли.',
          ],
        },
      },
    },
    {
      id: 'mars',
      kind: 'explainer',
      figure: 'space-density',
      photo: 'mars',
      text: {
        en: {
          title: 'Mars: a helicopter in thin air',
          lead: 'On Mars the air is about one hundred times thinner. Ingenuity flew anyway.',
          body: [
            'On 19 April 2021 NASA’s Ingenuity became the first aircraft to make a powered, controlled flight on another planet. It rose about 3 m, or 10 feet [[nasa-ingenuity]]. It went on to make 72 flights, the last on 18 January 2024 [[nasa-ingenuity]].',
            'NASA calls the Martian air less than 1 per cent as dense as Earth’s at the surface; its landing fact sheet says about 1 per cent. A helicopter must be light, with blades larger and faster than a helicopter of the same weight would need on Earth [[nasa-ingenuity]] [[jpl-quick-facts]] [[nasa-6-things]].',
            'Ingenuity’s two rotors, each 1.2 m across, spun at about 2,400 rpm. Earth helicopters usually turn at 450 to 500 rpm [[nasa-6-things]]. In thin air a wing has to move faster, or be bigger, to make the same lift.',
          ],
          tryIt: {
            steps: [
              'Cut two paper wings, one the size of your palm and one the size of your hand and fingers.',
              'Tape each to a pencil as a flag. Run with each, at the same speed.',
              'Say which one you feel pulling harder, and which pulls less.',
            ],
            lookFor: 'A bigger wing pulls more at the same speed. That is the Mars trade: more wing, or more speed.',
          },
          grownUps: [
            'NASA pages round the density differently: “less than 1 per cent” on the mission page, “about 1 per cent” in the landing fact sheet [[nasa-ingenuity]] [[jpl-quick-facts]]. NASA’s Mars fact sheet, in its current version, gives 0.016 ± 0.006 kg/m³, which is about 1.3 per cent of Earth’s 1.229 kg/m³ {{estimate}} [[nasa-mars-fact]]. An older version gave 0.020 kg/m³. All of these agree that the air is about one hundredth of Earth’s, give or take. We use 0.016.',
            'The next section shows how this changes the speed and the wing size a flying machine needs.',
          ],
          caption: 'Air density and gravity on Earth and on Mars. Mars air at about 1.3 per cent of Earth’s is drawn at the same scale as Earth’s: it is a thin line.',
        },
        es: {
          title: 'Marte: un helicóptero en aire escaso',
          lead: 'En Marte el aire es unas cien veces más escaso. Ingenuity voló igualmente.',
          body: [
            'El 19 de abril de 2021 Ingenuity, de la NASA, fue la primera aeronave en hacer un vuelo con motor y controlado en otro planeta. Se elevó unos 3 m, o 10 pies [[nasa-ingenuity]]. Hizo en total 72 vuelos, el último el 18 de enero de 2024 [[nasa-ingenuity]].',
            'La NASA dice que el aire marciano tiene menos del 1 por ciento de la densidad del terrestre en la superficie; su ficha de aterrizaje dice cerca del 1 por ciento. Un helicóptero debe ser ligero, con palas más grandes y rápidas de lo que necesitaría uno del mismo peso en la Tierra [[nasa-ingenuity]] [[jpl-quick-facts]] [[nasa-6-things]].',
            'Los dos rotores de Ingenuity, de 1,2 m cada uno, giraban a unas 2400 rpm. Los helicópteros terrestres suelen girar a 450-500 rpm [[nasa-6-things]]. En aire escaso un ala debe moverse más rápido, o ser mayor, para dar la misma sustentación.',
          ],
          tryIt: {
            steps: [
              'Corta dos alas de papel, una del tamaño de tu palma y otra del tamaño de tu mano con los dedos.',
              'Pega cada una a un lápiz como una bandera. Corre con cada una a la misma velocidad.',
              'Di cuál notas que tira más y cuál menos.',
            ],
            lookFor: 'Un ala mayor tira más a la misma velocidad. Es el intercambio de Marte: más ala, o más velocidad.',
          },
          grownUps: [
            'Las páginas de la NASA redondean la densidad de forma distinta: «menos del 1 por ciento» en la página de la misión, «cerca del 1 por ciento» en la ficha de aterrizaje [[nasa-ingenuity]] [[jpl-quick-facts]]. La ficha de Marte de la NASA, en su versión actual, da 0,016 ± 0,006 kg/m³, que es cerca del 1,3 por ciento de los 1,229 kg/m³ de la Tierra {{estimate}} [[nasa-mars-fact]]. Una versión anterior daba 0,020 kg/m³. Todas coinciden en que el aire es más o menos una centésima parte del terrestre. Usamos 0,016.',
            'La sección siguiente muestra cómo esto cambia la velocidad y el tamaño de ala que necesita una máquina voladora.',
          ],
          caption: 'Densidad del aire y gravedad en la Tierra y en Marte. El aire de Marte, cerca del 1,3 por ciento del terrestre, se dibuja a la misma escala que el de la Tierra: es una línea fina.',
        },
        ru: {
          title: 'Марс: вертолёт в разреженном воздухе',
          lead: 'На Марсе воздух примерно в сто раз реже. Ingenuity всё равно полетел.',
          body: [
            '19 апреля 2021 года Ingenuity от NASA стал первым аппаратом, совершившим управляемый полёт с двигателем на другой планете. Он поднялся примерно на 3 м, или 10 футов [[nasa-ingenuity]]. Всего он совершил 72 полёта, последний — 18 января 2024 года [[nasa-ingenuity]].',
            'NASA пишет, что плотность марсианского воздуха у поверхности меньше 1 процента от земной; в справке о посадке сказано — около 1 процента. Вертолёт должен быть лёгким, с лопастями больше и быстрее, чем нужны вертолёту того же веса на Земле [[nasa-ingenuity]] [[jpl-quick-facts]] [[nasa-6-things]].',
            'Два винта Ingenuity по 1,2 м в поперечнике вращались примерно со скоростью 2400 оборотов в минуту. Земные вертолёты обычно делают 450–500 [[nasa-6-things]]. В разреженном воздухе крылу нужно двигаться быстрее или быть больше, чтобы дать ту же подъёмную силу.',
          ],
          tryIt: {
            steps: [
              'Вырежьте два бумажных крыла: одно размером с ладонь, другое — с ладонь вместе с пальцами.',
              'Приклейте каждое к карандашу, как флажок. Бегите с каждым с одной и той же скоростью.',
              'Скажите, какое тянет сильнее, а какое слабее.',
            ],
            lookFor: 'Большое крыло при той же скорости тянет сильнее. В этом марсианский компромисс: больше крыла или больше скорости.',
          },
          grownUps: [
            'Страницы NASA округляют плотность по-разному: «менее 1 процента» на странице миссии, «около 1 процента» в справке о посадке [[nasa-ingenuity]] [[jpl-quick-facts]]. Справка NASA о Марсе в нынешней версии даёт 0,016 ± 0,006 кг/м³, то есть около 1,3 процента от земных 1,229 кг/м³ {{estimate}} [[nasa-mars-fact]]. Прежняя версия давала 0,020 кг/м³. Все они сходятся в том, что воздух примерно в сто раз реже земного. Мы берём 0,016.',
            'Следующий раздел показывает, как это меняет скорость и размер крыла, которые нужны летательному аппарату.',
          ],
          caption: 'Плотность воздуха и сила тяжести на Земле и на Марсе. Воздух Марса, около 1,3 процента от земного, нарисован в том же масштабе, что и земной: это тонкая линия.',
        },
      },
    },
    {
      id: 'dynamic-pressure',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'The numbers behind Mars flight',
          lead: 'Air pushes harder on a wing when the air is thicker and the wing goes faster. On Mars that push is tiny.',
          body: [
            'The quantity ½ρv², half the density times the speed squared, is called dynamic pressure and written q [[nasa-dynamic-pressure]]. Lift is the lift coefficient times q times the wing area [[nasa-lift-equation]].',
            'At the same speed, Mars air gives about 1.3 per cent of Earth’s q {{estimate}}. A wing there needs about 8.8 times the speed, or about 77 times the area, for the same lift {{estimate}}. But gravity on Mars is only about 38 per cent of Earth’s, so the lift needed is smaller. Together: about 5.4 times the speed, or about 29 times the wing area {{estimate}}.',
            'With the uncertainty in the Mars density, 0.010 to 0.022 kg/m³, the speed factor runs from about 4.6 to about 6.8, and the area factor from about 21 to about 47 {{estimate}}. Treat all of these as orders of magnitude, not predictions.',
          ],
          tryIt: {
            steps: [
              'Write down the speed of your best gentle throw in steps per second.',
              'Multiply it by 5.',
              'Ask: could your arm throw that fast?',
            ],
            lookFor: 'This is why the Mars flyers are not paper planes.',
          },
          grownUps: [
            'Working: Mars density 0.016 kg/m³ against 1.229 kg/m³ gives a ratio of 0.0130. Gravity 3.73 against 9.81 m/s² gives 0.380 [[nasa-mars-fact]]. At fixed lift coefficient and area, the speed needed scales as √(weight ratio ÷ density ratio) = √(0.380 ÷ 0.0130) = 5.4. At fixed speed, the area needed scales as 0.380 ÷ 0.0130 = 29.',
            'The simple rule hides things: thin air also lowers the Reynolds number, which changes how the wing behaves [[nasa-reynolds]], and speed is capped by the speed of sound in Mars air. Ingenuity’s rotors spin about 5 times faster than Earth helicopters’ rotors, which is the same order as the 5.4 we found, but Ingenuity also differs in weight and blade design [[nasa-6-things]].',
          ],
        },
        es: {
          title: 'Las cifras del vuelo en Marte',
          lead: 'El aire empuja más fuerte un ala cuanto más denso es y cuanto más rápido va el ala. En Marte ese empuje es diminuto.',
          body: [
            'La magnitud ½ρv², la mitad de la densidad por la velocidad al cuadrado, se llama presión dinámica y se escribe q [[nasa-dynamic-pressure]]. La sustentación es el coeficiente de sustentación por q por la superficie alar [[nasa-lift-equation]].',
            'A la misma velocidad, el aire de Marte da cerca del 1,3 por ciento de la q terrestre {{estimate}}. Allí un ala necesita unas 8,8 veces la velocidad, o unas 77 veces la superficie, para la misma sustentación {{estimate}}. Pero la gravedad en Marte es solo cerca del 38 por ciento de la terrestre, así que la sustentación necesaria es menor. En conjunto: unas 5,4 veces la velocidad, o unas 29 veces la superficie alar {{estimate}}.',
            'Con la incertidumbre de la densidad de Marte, de 0,010 a 0,022 kg/m³, el factor de velocidad va de cerca de 4,6 a cerca de 6,8, y el de superficie de cerca de 21 a cerca de 47 {{estimate}}. Toma todo esto como órdenes de magnitud, no como predicciones.',
          ],
          tryIt: {
            steps: [
              'Anota la velocidad de tu mejor lanzamiento suave en pasos por segundo.',
              'Multiplícala por 5.',
              'Pregúntate: ¿podría tu brazo lanzar tan rápido?',
            ],
            lookFor: 'Por eso los voladores de Marte no son aviones de papel.',
          },
          grownUps: [
            'Cálculo: densidad de Marte 0,016 kg/m³ frente a 1,229 kg/m³ da una razón de 0,0130. Gravedad 3,73 frente a 9,81 m/s² da 0,380 [[nasa-mars-fact]]. Con coeficiente de sustentación y superficie fijos, la velocidad necesaria escala como √(razón de pesos ÷ razón de densidades) = √(0,380 ÷ 0,0130) = 5,4. A velocidad fija, la superficie necesaria escala como 0,380 ÷ 0,0130 = 29.',
            'La regla sencilla oculta cosas: el aire escaso también baja el número de Reynolds, lo que cambia el comportamiento del ala [[nasa-reynolds]], y la velocidad está limitada por la del sonido en el aire de Marte. Los rotores de Ingenuity giran unas 5 veces más rápido que los de los helicópteros terrestres, del mismo orden que el 5,4 que hallamos, pero Ingenuity también difiere en peso y diseño de las palas [[nasa-6-things]].',
          ],
        },
        ru: {
          title: 'Цифры полёта на Марсе',
          lead: 'Воздух давит на крыло тем сильнее, чем он плотнее и чем быстрее летит крыло. На Марсе этот напор совсем мал.',
          body: [
            'Величина ½ρv², половина плотности на квадрат скорости, называется динамическим давлением и обозначается q [[nasa-dynamic-pressure]]. Подъёмная сила равна коэффициенту подъёмной силы, умноженному на q и на площадь крыла [[nasa-lift-equation]].',
            'При той же скорости воздух Марса даёт около 1,3 процента земного q {{estimate}}. Крылу там нужна скорость примерно в 8,8 раза выше или площадь примерно в 77 раз больше для той же подъёмной силы {{estimate}}. Но сила тяжести на Марсе — лишь около 38 процентов земной, так что нужная подъёмная сила меньше. В итоге: скорость примерно в 5,4 раза выше или площадь крыла примерно в 29 раз больше {{estimate}}.',
            'С учётом неопределённости плотности на Марсе, от 0,010 до 0,022 кг/м³, множитель скорости — примерно от 4,6 до 6,8, а множитель площади — примерно от 21 до 47 {{estimate}}. Считайте всё это порядками величины, а не предсказаниями.',
          ],
          tryIt: {
            steps: [
              'Запишите скорость вашего лучшего мягкого броска в шагах в секунду.',
              'Умножьте её на 5.',
              'Спросите себя: может ли ваша рука бросить так быстро?',
            ],
            lookFor: 'Вот почему марсианские летуны — не бумажные самолёты.',
          },
          grownUps: [
            'Расчёт: плотность Марса 0,016 кг/м³ против 1,229 кг/м³ даёт отношение 0,0130. Ускорение 3,73 против 9,81 м/с² даёт 0,380 [[nasa-mars-fact]]. При неизменных коэффициенте подъёмной силы и площади нужная скорость растёт как √(отношение весов ÷ отношение плотностей) = √(0,380 ÷ 0,0130) = 5,4. При неизменной скорости нужная площадь растёт как 0,380 ÷ 0,0130 = 29.',
            'Простое правило кое-что скрывает: разреженный воздух ещё и снижает число Рейнольдса, а это меняет поведение крыла [[nasa-reynolds]], и скорость ограничена скоростью звука в воздухе Марса. Винты Ingenuity вращаются примерно в 5 раз быстрее, чем винты земных вертолётов, — того же порядка, что наши 5,4, но у Ingenuity отличаются вес и конструкция лопастей [[nasa-6-things]].',
          ],
        },
      },
    },
    {
      id: 'space-now',
      kind: 'explainer',
      figure: null,
      photo: 'falcon-launch',
      text: {
        en: {
          title: 'Rockets that come back',
          lead: 'For most of the space age, a rocket flew once. Now some come back down and fly again.',
          body: [
            'The Space Shuttle was partly reusable. Discovery alone flew 39 missions between 1984 and 2011, more than any other orbiter [[nasm-discovery]].',
            'On 21 December 2015 a SpaceX Falcon 9 first stage, which had just helped send satellites toward orbit, flew back and landed upright at Cape Canaveral. A rocket stage from an orbital launch had never done that before [[planetary-falcon]]. In March 2017 a landed stage flew a second mission [[space-reflight]].',
            'Others are working on the same idea. ESA’s Themis test stage, built to show that Europe can take off and land a rocket vertically, stood on its launch pad in Sweden in 2025. When we checked, it had not yet made its first hop [[esa-themis]].',
          ],
          tryIt: {
            steps: [
              'Fly one paper plane ten times. After each flight, check it and smooth any bent folds.',
              'Write down what you had to fix each time.',
            ],
            lookFor: 'Flying again means checking and repairing every time. Reused rockets are checked between flights too.',
          },
          grownUps: [
            'The 2015 landing was at Landing Zone 1, about 9 km from the launch pad [[planetary-falcon]]. The stage that flew again in 2017 launched the SES-10 satellite and landed a second time [[space-reflight]].',
            'Several companies and agencies are developing reusable rockets, and claims about future costs vary. This book reports flights that have happened, with their dates.',
          ],
        },
        es: {
          title: 'Cohetes que vuelven',
          lead: 'Durante casi toda la era espacial, un cohete volaba una vez. Ahora algunos vuelven a bajar y vuelan otra vez.',
          body: [
            'El transbordador espacial era en parte reutilizable. Solo el Discovery voló 39 misiones entre 1984 y 2011, más que ningún otro orbitador [[nasm-discovery]].',
            'El 21 de diciembre de 2015 una primera etapa de un Falcon 9 de SpaceX, que acababa de ayudar a enviar satélites hacia la órbita, volvió y aterrizó de pie en Cabo Cañaveral. Nunca antes lo había hecho una etapa de un lanzamiento orbital [[planetary-falcon]]. En marzo de 2017 una etapa recuperada voló una segunda misión [[space-reflight]].',
            'Otros trabajan en la misma idea. Themis, la etapa de pruebas de la ESA, construida para demostrar que Europa puede despegar y aterrizar un cohete en vertical, estaba en su plataforma en Suecia en 2025. Cuando lo comprobamos, aún no había hecho su primer salto [[esa-themis]].',
          ],
          tryIt: {
            steps: [
              'Vuela un avión de papel diez veces. Tras cada vuelo, revísalo y alisa los pliegues doblados.',
              'Apunta qué tuviste que arreglar cada vez.',
            ],
            lookFor: 'Volver a volar significa revisar y reparar cada vez. Los cohetes reutilizados también se revisan entre vuelos.',
          },
          grownUps: [
            'El aterrizaje de 2015 fue en la Landing Zone 1, a unos 9 km de la plataforma de lanzamiento [[planetary-falcon]]. La etapa que voló de nuevo en 2017 lanzó el satélite SES-10 y aterrizó por segunda vez [[space-reflight]].',
            'Varias empresas y agencias desarrollan cohetes reutilizables, y las previsiones de costes varían. Este libro recoge vuelos que ya han ocurrido, con sus fechas.',
          ],
        },
        ru: {
          title: 'Ракеты, которые возвращаются',
          lead: 'Почти всю космическую эру ракета летала один раз. Теперь некоторые возвращаются и летят снова.',
          body: [
            '«Спейс шаттл» был частично многоразовым. Один только «Дискавери» совершил 39 полётов с 1984 по 2011 год — больше любого другого орбитального корабля [[nasm-discovery]].',
            '21 декабря 2015 года первая ступень ракеты Falcon 9 компании SpaceX, только что помогшая отправить спутники к орбите, вернулась и села вертикально на мысе Канаверал. Ступень орбитального пуска сделала это впервые [[planetary-falcon]]. В марте 2017 года уже садившаяся ступень полетела второй раз [[space-reflight]].',
            'Над той же идеей работают и другие. Испытательная ступень ESA Themis, созданная, чтобы показать, что Европа умеет вертикально взлетать и садиться, стояла на стартовой площадке в Швеции в 2025 году. Когда мы проверяли, первого подскока она ещё не сделала [[esa-themis]].',
          ],
          tryIt: {
            steps: [
              'Запустите один бумажный самолёт десять раз. После каждого полёта осмотрите его и расправьте погнутые сгибы.',
              'Записывайте, что приходилось чинить каждый раз.',
            ],
            lookFor: 'Летать снова — значит каждый раз проверять и чинить. Многоразовые ракеты тоже проверяют между полётами.',
          },
          grownUps: [
            'В 2015 году ступень села на площадку Landing Zone 1, примерно в 9 км от стартового стола [[planetary-falcon]]. Ступень, полетевшая снова в 2017 году, вывела спутник SES-10 и села второй раз [[space-reflight]].',
            'Многоразовые ракеты разрабатывают несколько компаний и агентств, и прогнозы их стоимости расходятся. Эта книга рассказывает о полётах, которые уже состоялись, с их датами.',
          ],
        },
      },
    },
  ],
  references: [
    { id: 'nasa-lift-equation', label: 'NASA Glenn Research Center, “Lift Equation”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/lift-equation/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-dynamic-pressure', label: 'NASA Glenn Research Center, “Dynamic Pressure”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/dynamic-pressure-2/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-airprop', label: 'NASA Glenn Research Center, “Air properties” (sea-level density 1.229 kg/m³)', url: 'https://www.grc.nasa.gov/www/K-12/airplane/airprop.html', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'space-karman', label: 'Space.com, “The Kármán line: where does space begin?” (FAI 100 km; US 80 km). Also Scientific American, “Where does outer space begin?”, and Physics Today, “Where does outer space begin?”', url: 'https://www.space.com/karman-line-where-does-space-begin', reuse: 'cite', checked: '2026-11-25' },
    { id: 'mcdowell-2018', label: 'J. C. McDowell, “The edge of space: Revisiting the Karman Line”, Acta Astronautica 151 (2018) 668–677 (von Kármán’s argument never formally published by him; Haley, Space Law and Government, 1963, places the line at 84 km), doi:10.1016/j.actaastro.2018.07.003 (preprint arXiv:1807.07894)', url: 'https://doi.org/10.1016/j.actaastro.2018.07.003', reuse: 'cite', checked: '2026-11-25' },
    { id: 'fai-karman-2018', label: 'FAI, “Statement about the Karman line” (30 November 2018: a “compelling scientific case” for 80 km; proposed FAI/IAF workshop)', url: 'https://www.fai.org/news/statement-about-karman-line', reuse: 'cite', checked: '2026-11-25' },
    { id: 'esa-tsiolkovsky', label: 'European Space Agency, “Konstantin Tsiolkovsky” (deaf at 10; teacher in Borovsk and Kaluga; 8 km/s; multi-stage rockets; 1911 “cradle” letter)', url: 'https://www.esa.int/Our_Activities/Human_and_Robotic_Exploration/Exploration/Konstantin_Tsiolkovsky', reuse: 'cite', checked: '2026-11-25' },
    { id: 'encyclopedia-tsiolkovsky', label: 'Encyclopedia.com, “Konstantin Eduardovich Tsiolkovsky” (the rocket equation; article finished in 1903, printed in full in 1911 and 1912)', url: 'https://www.encyclopedia.com/people/science-and-technology/space-exploration-biographies/konstantin-eduardovich-tsiolkovsky', reuse: 'cite', checked: '2026-11-25' },
    { id: 'esa-korolev', label: 'European Space Agency, “Sergei Korolev: father of the Soviet Union’s success in space” (R-7, Sputnik, Vostok; arrested 1938; identity secret until his death in January 1966)', url: 'https://www.esa.int/About_Us/ESA_history/50_years_of_humans_in_space/Sergei_Korolev_Father_of_the_Soviet_Union_s_success_in_space', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-sputnik', label: 'NASA History, “65 years ago: Sputnik ushers in the space age” (Sputnik 1: 184 pounds, “every 90 minutes”, batteries to 26 October, re-entry 4 January 1958; Sputnik 2 and Laika)', url: 'https://www.nasa.gov/history/65-years-ago-sputnik-ushers-in-the-space-age/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-explorer1', label: 'NASA History, “The story of Explorer 1” (Sputnik 1 as a 23-inch, 184-pound ball)', url: 'https://www.nasa.gov/history/story-of-explorer-1/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'aps-sputnik', label: 'APS News, “October 4, 1957: Soviets launch first artificial satellite into Earth orbit” (2007): once every 96 minutes', url: 'https://www.aps.org/apsnews/2007/10/soviets-launch-first-satellite-orbit', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-dawn', label: 'NASA History, “Dawn of the Space Age” (Sputnik 1 took about 98 minutes per orbit)', url: 'https://www.nasa.gov/history/sputnik/index.html', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'skyrocket-sputnik', label: 'Gunter’s Space Page, “Sputnik 1 (PS-1 #1)” (orbit 228 × 947 km, 65.1°, period 96.17 minutes)', url: 'https://space.skyrocket.de/doc_sdat/sputnik-1.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'airspace-laika', label: 'Air & Space / Smithsonian magazine, “Laika declassified” (overheating disclosed in 2002)', url: 'https://www.smithsonianmag.com/air-space-magazine/laika-declassified-180967077/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-gagarin', label: 'NASA Science, “Yuri Gagarin: first human in space” (12 April 1961; 108 minutes)', url: 'https://science.nasa.gov/resource/yuri-gagarin-first-human-in-space', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'esa-vostok1', label: 'European Space Agency, “The flight of Vostok 1” (launch 06:07 UTC; “Poyekhali”; ejection at about 7 km; landing in the Saratov region)', url: 'https://www.esa.int/About_Us/ESA_history/50_years_of_humans_in_space/The_flight_of_Vostok_1', reuse: 'cite', checked: '2026-11-25' },
    { id: 'esa-tereshkova', label: 'European Space Agency, “First woman in space: Valentina” (16 June 1963; age 26; call sign Chaika; 2 days 23 hours 12 minutes)', url: 'https://www.esa.int/About_Us/ESA_history/50_years_of_humans_in_space/First_woman_in_space_Valentina', reuse: 'cite', checked: '2026-11-25' },
    { id: 'britannica-tereshkova', label: 'Encyclopaedia Britannica, “Valentina Tereshkova” (48 orbits in 71 hours)', url: 'https://www.britannica.com/biography/Valentina-Tereshkova', reuse: 'cite', checked: '2026-11-25' },
    { id: 'esa-leonov', label: 'European Space Agency, “Alexei Leonov: the artistic spaceman” (18 March 1965; 12 minutes; suit vented to 0.27 bar; coloured pencils)', url: 'https://www.esa.int/About_Us/ESA_history/Alexei_Leonov_The_artistic_spaceman', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-spacewalk', label: 'Guinness World Records, “First spacewalk” (12 minutes 9 seconds)', url: 'https://www.guinnessworldrecords.com/world-records/first-spacewalk', reuse: 'cite', checked: '2026-11-25' },
    { id: 'enaire-herrera', label: 'Fundación ENAIRE, “Proyecto Emilio Herrera: del aire al espacio”, project dossier (1935 stratonautical suit for ascents above 20,000 m)', url: 'https://emilioherrera.fundacionenaire.es/dossier_emilio_herrera_es.pdf', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wiki-herrera-suit', label: 'Wikipedia, “Stratonautical space suit” (flight planned for 1936, prevented by the Spanish Civil War), used as a last resort', url: 'https://en.wikipedia.org/wiki/Stratonautical_space_suit', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-apollo11', label: 'NASA, Apollo 11 mission page (Moon landing 20 July 1969; Armstrong, Aldrin, Collins)', url: 'https://www.nasa.gov/mission/apollo-11/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-sts1', label: 'NASA, STS-1 mission page (launched 12 April 1981; landed 14 April 1981 at Edwards Air Force Base)', url: 'https://www.nasa.gov/mission/sts-1/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'esa-duque', label: 'European Space Agency, “Pedro Duque” (STS-95, 29 October to 7 November 1998, first Spanish citizen in space)', url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/Pedro_Duque', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-x15', label: 'NASA Dryden Flight Research Center, Fact Sheet FS-2002-09-052, “X-15 hypersonic research program” (199 flights, 1959 to 1968; 4,520 mph; 354,200 feet; B-52 launch at about 45,000 feet; 200 mph glide landing on skids)', url: 'https://www.nasa.gov/centers/dryden/pdf/120306main_FS-052-DFRC.pdf', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-shuttle-glider', label: 'NASA Glenn Research Center, “Space Shuttle as a Glider”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/space-shuttle-as-a-glider/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-ksc-landing', label: 'NASA Kennedy Space Center, fact sheet “Landing the Space Shuttle orbiter at KSC” (2006): deorbit about 60 minutes before touchdown; 20-degree approach; touchdown 213 to 226 mph; no go-around', url: 'https://www3.nasa.gov/centers/kennedy/pdf/167415main_LandingatKSC06.pdf', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'buran-britannica', label: 'Encyclopaedia Britannica, Buran (launch 15 November 1988, no crew; destroyed 2002)', url: 'https://www.britannica.com/print/article/84902', reuse: 'cite', checked: '2026-11-25' },
    { id: 'buran-sfn', label: 'Spaceflight Now, “Buran, the Soviet space shuttle, flew 25 years ago” (2013; quotes RSC Energia; landing 3 hours 26 minutes after launch)', url: 'https://spaceflightnow.com/news/n1311/15buran/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'buran-guinness', label: 'Guinness World Records, “Largest spacecraft to orbit and land unmanned” (Buran, 15 November 1988, two orbits, computer control)', url: 'https://www.guinnessworldrecords.com/world-records/largest-spacecraft-to-orbit-and-land-unmanned', reuse: 'cite', checked: '2026-11-25' },
    { id: 'buran-astronomy', label: 'Astronomy, “Nov. 15, 1988: The Buran orbiter launches” (206-minute flight)', url: 'https://www.astronomy.com/today-in-the-history-of-astronomy/nov-15-1988-the-buran-orbiter-launches/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'register-paris-2010', label: 'The Register, “PARIS has landed” (28 October 2010: Vulture 1, almost 90,000 feet, landed near Pelayos de la Presa, Spain)', url: 'https://www.theregister.com/2010/10/28/paris_has_landed/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'register-guinness-2012', label: 'The Register, Guinness recognises the PARIS launch (17 February 2012)', url: 'https://www.theregister.com/2012/02/17/paris_guiness/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'register-record-2015', label: 'The Register, school club breaks paper plane altitude record (3 September 2015: Stratos III at 35,043 m; Vulture 1 at 27,310 m)', url: 'https://www.theregister.com/2015/09/03/paper_plane_launch_record/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-paper-altitude', label: 'Guinness World Records, “Highest altitude paper plane launch” (35,043 m, David Green, Elsworth, Cambridgeshire, 24 June 2015)', url: 'https://www.guinnessworldrecords.com/world-records/highest-altitude-paper-plane-launch/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-concorde', label: 'Smithsonian National Air and Space Museum, Concorde, Fox Alpha, Air France (cruise between 55,000 and 60,000 feet)', url: 'https://airandspace.si.edu/collection-objects/concorde-fox-alpha-air-france/nasm_A20030139000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-ingenuity', label: 'NASA Science, Ingenuity Mars Helicopter mission page (first flight 19 April 2021; 72 flights; last flight 18 January 2024; air less than 1 per cent as dense as Earth’s)', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'jpl-quick-facts', label: 'NASA JPL, Ingenuity Landing Press Kit, “Quick facts” (atmosphere about 1 per cent of Earth’s surface density)', url: 'https://www.jpl.nasa.gov/news/press_kits/ingenuity/landing/quick_facts/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-6-things', label: 'NASA, “6 things to know about NASA’s Ingenuity Mars Helicopter” (1.2 m rotors, about 2,400 rpm; Earth helicopters about 450 to 500 rpm)', url: 'https://www.nasa.gov/solar-system/6-things-to-know-about-nasas-ingenuity-mars-helicopter/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-mars-fact', label: 'NASA Space Science Data Coordinated Archive, “Mars Fact Sheet” (surface density about 0.016 ± 0.006 kg/m³; gravity 3.73 m/s²). An archived 2007 version gives 0.020 kg/m³ and 3.71 m/s²', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-reynolds', label: 'NASA Glenn Research Center, “Reynolds Number Interactive Simulator”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/spcal/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'bbc-2008', label: 'BBC News, Chris Hogg, “Can Japan’s paper plane fly in space?” (February 2008; copy hosted by the University of Tokyo)', url: 'https://www.flight.t.u-tokyo.ac.jp/wp-content/uploads/2018/05/BBC-News-Can-Japans-paper-plane-fly-in-space.pdf', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nbc-2008', label: 'NBC News, “Paper airplane to fly from space to Earth” (2008)', url: 'https://www.nbcnews.com/news/amp/wbna23827045', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wiki-paper-plane-space', label: 'Wikipedia, “Paper plane launched from space” (2009 postponement), used as a last resort; it cites Air & Space magazine, The Guardian and a JAXA email', url: 'https://en.wikipedia.org/wiki/Paper_plane_launched_from_space', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-discovery', label: 'Smithsonian National Air and Space Museum, “Space Shuttle Discovery” (39 missions, more than any other orbiter; 1984 to 2011)', url: 'https://airandspace.si.edu/explore/stories/space-shuttle-discovery', reuse: 'cite', checked: '2026-11-25' },
    { id: 'planetary-falcon', label: 'The Planetary Society, Jason Davis, “SpaceX sticks the landing” (21 December 2015: first orbital-launch stage to land upright, Landing Zone 1)', url: 'https://www.planetary.org/articles/20151221-spacex-rtf-sticks-landing', reuse: 'cite', checked: '2026-11-25' },
    { id: 'space-reflight', label: 'Space.com, “Used SpaceX rocket launches satellite, then lands in historic 1st reflight” (30 March 2017, SES-10)', url: 'https://www.space.com/36291-spacex-used-rocket-launch-landing-success.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'esa-themis', label: 'European Space Agency, “Themis stands on the launch pad” (19 September 2025: reusable first-stage demonstrator at Esrange, Sweden, before its first flight)', url: 'https://www.esa.int/Enabling_Support/Space_Transportation/Future_space_transportation/Themis_stands_on_the_launch_pad', reuse: 'cite', checked: '2026-11-25' },
  ],
}

export default chapter
