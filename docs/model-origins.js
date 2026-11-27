import { aircraftHeritage } from './assets/planes/heritage.js?v=27dc78b6a91f';

const tr = (en, es, ru) => ({en, es, ru});

const location = (id, kind, lat, lon, label, place, date) => ({
  id, kind, lat, lon, label, place, date,
});

const source = (label, url) => ({label, url});
const person = (name, role) => ({name, role});
const firstFlight = tr('First flight', 'Primer vuelo', 'Первый полёт');
const habitat = tr('Habitat example', 'Ejemplo de hábitat', 'Пример места обитания');
const eraNames = {
  US: tr('United States', 'Estados Unidos', 'США'),
  USSR: tr('Soviet Union (USSR)', 'Unión Soviética (URSS)', 'Советский Союз (СССР)'),
};
const testPilot = tr('Pilot on the first flight', 'Piloto del primer vuelo', 'Лётчик первого полёта');
const designLead = tr('Led the design team', 'Dirigió el equipo de diseño', 'Возглавлял команду конструкторов');

const origins = {
  monarch: {
    kind: 'butterfly',
    model: tr('Monarch', 'Monarca', 'Монарх'),
    scientificName: 'Danaus plexippus',
    date: tr('Autumn migration and winter', 'Migración de otoño e invierno', 'Осенний перелёт и зимовка'),
    story: tr(
      'In autumn, many monarchs from eastern North America fly south to spend the winter in fir forests in central Mexico.',
      'En otoño, muchas monarcas del este de Norteamérica vuelan al sur para pasar el invierno en los bosques de oyamel del centro de México.',
      'Осенью многие монархи из восточной части Северной Америки летят на юг зимовать в пихтовых лесах центральной Мексики.',
    ),
    discovery: tr(
      'Milkweed feeds the caterpillars. The adults also need flowers for nectar and forest shelter in winter.',
      'El algodoncillo alimenta a las orugas. Las adultas también necesitan flores con néctar y el refugio del bosque en invierno.',
      'Гусеницы кормятся на ваточнике. Взрослым бабочкам нужны цветы с нектаром и укрытие в лесу зимой.',
    ),
    specimen: tr(
      'The workshop photograph shows one adult. The map marks a wintering site for the eastern population.',
      'La foto del taller muestra una adulta. El mapa señala un lugar de invernada de la población oriental.',
      'На фото мастерской одна взрослая бабочка. На карте отмечено место зимовки восточной популяции.',
    ),
    illustration: {
      file: 'monarch.jpg',
      caption: tr('A monarch feeding (photo location not recorded)', 'Una monarca alimentándose (lugar de la foto no registrado)', 'Монарх кормится (место съёмки не записано)'),
      credit: 'JamesDeMers · CC0',
      url: 'https://pixabay.com/photos/monarch-butterfly-pink-flowers-60824/',
    },
    locations: [
      location('sierra-chincua', 'wintering', 19.67, -100.28,
        tr('Wintering site', 'Lugar de invernada', 'Место зимовки'),
        tr('Sierra Chincua, Michoacán, Mexico', 'Sierra Chincua, Michoacán, México', 'Сьерра-Чинкуа, Мичоакан, Мексика')),
    ],
    sources: [
      source(tr('U.S. Fish & Wildlife Service', 'Servicio de Pesca y Vida Silvestre de EE. UU.', 'Служба охраны рыбных ресурсов и диких животных США'), 'https://www.fws.gov/species/monarch-danaus-plexippus'),
      source(tr('CONABIO · Monarch migration', 'CONABIO · Migración de la monarca', 'CONABIO · Миграция монарха'), 'https://biomx.biodiversidad.gob.mx/especies/espPrioritaria/monarca/travesia'),
    ],
  },
  morpho: {
    kind: 'butterfly',
    model: tr('Blue morpho', 'Morfo azul', 'Голубой морфо'),
    scientificName: 'Morpho peleides',
    date: tr('Tropical forest', 'Bosque tropical', 'Тропический лес'),
    story: tr(
      'This blue morpho lives in tropical forests from Mexico through Central America into South America. Look for the flash of blue as it turns.',
      'Este morfo azul vive en bosques tropicales desde México, por Centroamérica, hasta Sudamérica. Fíjate en el destello azul cuando gira.',
      'Этот голубой морфо живёт в тропических лесах от Мексики через Центральную Америку до Южной Америки. Заметь, как при повороте вспыхивает синий цвет.',
    ),
    discovery: tr(
      'Tiny layers in the wing scales reflect blue light. Adult morphos feed on fallen fruit in the forest.',
      'Unas capas diminutas en las escamas reflejan la luz azul. Los morfos adultos se alimentan de fruta caída en el bosque.',
      'Тончайшие слои в чешуйках крыльев отражают синий свет. Взрослые морфо кормятся упавшими плодами в лесу.',
    ),
    specimen: tr(
      'The photo shows one adult in a butterfly house. Guanacaste is an example of its wild habitat. Some collections use the name Morpho helenor peleides.',
      'La foto muestra un adulto en un mariposario. Guanacaste es un ejemplo de su hábitat natural. Algunas colecciones usan el nombre Morpho helenor peleides.',
      'На фото взрослая бабочка в павильоне бабочек. Гуанакасте — пример места, где она живёт в природе. В некоторых коллекциях используют название Morpho helenor peleides.',
    ),
    illustration: {
      file: 'morpho.jpg',
      caption: tr('A blue morpho in a butterfly house, not in the wild', 'Un morfo azul en un mariposario, no en libertad', 'Голубой морфо в павильоне бабочек, а не в природе'),
      credit: 'Meli1670 · CC0',
      url: 'https://pixabay.com/photos/blue-morpho-butterfly-morpho-peleides-947714/',
    },
    locations: [
      location('guanacaste', 'habitat', 10.84, -85.61, habitat,
        tr('Guanacaste, Costa Rica', 'Guanacaste, Costa Rica', 'Гуанакасте, Коста-Рика')),
    ],
    sources: [
      source(tr('Natural History Museum · Blue morpho', 'Museo de Historia Natural · Morfo azul', 'Музей естественной истории · Голубой морфо'), 'https://www.nhm.ac.uk/discover/spotlight-blue-morpho.html'),
      source(tr('Guanacaste Conservation Area', 'Área de Conservación Guanacaste', 'Природоохранная территория Гуанакасте'), 'https://www.acguanacaste.ac.cr/bosque_seco_virtual/bs_web_page/paginas_de_especies/morpho_peleides.html'),
      source(tr('Harvard Museum of Comparative Zoology · Name record', 'Museo de Zoología Comparada de Harvard · Nombre', 'Музей сравнительной зоологии Гарварда · Название'), 'https://mczbase.mcz.harvard.edu/name/Morpho%20peleides'),
    ],
  },
  swallowtail: {
    kind: 'butterfly',
    model: tr('Old World swallowtail', 'Macaón', 'Махаон'),
    scientificName: 'Papilio machaon',
    date: tr('Early summer at Kizhi', 'Principios del verano en Kizhi', 'Начало лета в Кижах'),
    story: tr(
      'The swallowtail lives across much of temperate Eurasia and in parts of North Africa and North America. The Kizhi museum records it where forests, meadows and wetlands meet.',
      'El macaón vive en gran parte de la Eurasia templada y en zonas del norte de África y de Norteamérica. El museo de Kizhi lo registra en bosques, prados y humedales.',
      'Махаон встречается на большей части умеренной Евразии, а также в некоторых районах Северной Африки и Северной Америки. Музей «Кижи» отмечает его в лесах, на лугах и болотах.',
    ),
    discovery: tr(
      'The caterpillars eat plants in the carrot family, such as wild angelica in Karelia. Can you spot the short tail on each hindwing?',
      'Las orugas comen plantas de la familia de la zanahoria, como la angélica silvestre en Carelia. ¿Ves la cola corta de cada ala trasera?',
      'Гусеницы едят зонтичные растения, например лесной дудник в Карелии. Найдёте короткий хвостик на каждом заднем крыле?',
    ),
    specimen: tr(
      'The map marks a documented population in the Kizhi archipelago. The photographed butterfly’s location is unverified.',
      'El mapa señala una población registrada en el archipiélago de Kizhi. Se desconoce el lugar de la foto.',
      'На карте отмечено место, где махаона наблюдали в Кижских шхерах. Место съёмки неизвестно.',
    ),
    illustration: {
      file: 'swallowtail.jpg',
      caption: tr('Adult swallowtail (photo location not recorded)', 'Macaón adulto (lugar de la foto no registrado)', 'Взрослый махаон (место съёмки не записано)'),
      credit: 'makamuki0 · CC0',
      url: 'https://pixabay.com/photos/macaon-papilio-machaon-butterfly-1710213/',
    },
    locations: [
      location('kizhi', 'habitat', 62.07, 35.22, habitat,
        tr('Kizhi, Karelia, Russia', 'Kizhi, Carelia, Rusia', 'Кижи, Карелия, Россия')),
    ],
    sources: [
      source(tr('Kizhi Museum Reserve · Swallowtail', 'Museo-reserva de Kizhi · Macaón', 'Музей-заповедник «Кижи» · Махаон'), 'https://site.kizhi.karelia.ru/nature/babochki/74'),
    ],
  },
  'boeing-747': {
    kind: 'airplane', ...aircraftHeritage['boeing-747'],
    model: tr('Boeing 747', 'Boeing 747', 'Боинг 747'),
    story: tr(
      'Boeing built the first 747 in a new factory in Everett. Its broad cabin had room for two aisles. The raised flight deck gave it a hump.',
      'Boeing construyó el primer 747 en una nueva fábrica en Everett. Su cabina ancha tenía dos pasillos. La cabina de pilotos elevada le dio su joroba.',
      'Первый 747 построили на новом заводе Boeing в Эверетте. В широком салоне поместились два прохода. Приподнятая кабина пилотов образовала характерный горб.',
    ),
    discovery: tr(
      'The 747 introduced wide-body passenger flying. Trace the hump on the paper model with your finger.',
      'El 747 inauguró los vuelos de pasajeros con fuselaje ancho. Recorre la joroba del modelo de papel con el dedo.',
      'С 747 началась эпоха широкофюзеляжных пассажирских самолётов. Проведи пальцем по горбу бумажной модели.',
    ),
    people: [
      person(tr('Joe Sutter', 'Joe Sutter', 'Джо Саттер'), designLead),
      person(tr('Jack Waddell', 'Jack Waddell', 'Джек Уодделл'), testPilot),
    ],
    locations: [
      location('everett', 'first-flight', 47.91, -122.28, firstFlight,
        tr('Everett, Washington, USA', 'Everett, Washington, EE. UU.', 'Эверетт, штат Вашингтон, США')),
    ],
    sources: [
      source(tr('Boeing · Everett and the first 747', 'Boeing · Everett y el primer 747', 'Boeing · Эверетт и первый 747'), 'https://www.boeing.com/features/2025/04/mount-rainier-our-beloved-backdrop'),
      source(tr('Museum of Flight · Waddell archive', 'Museo del Vuelo · Archivo Waddell', 'Музей авиации · Архив Уодделла'), 'https://archives.museumofflight.org/repositories/2/resources/800'),
      source(tr('Boeing · Aircraft history', 'Boeing · Historia de los aviones', 'Boeing · История самолётов'), 'https://www.boeing.com/content/dam/boeing/v2/company/history/pdf/Boeing_Products.pdf'),
    ],
  },
  'douglas-dc3': {
    kind: 'airplane', ...aircraftHeritage['douglas-dc3'],
    model: tr('Douglas DC-3', 'Douglas DC-3', 'Дуглас DC-3'),
    story: tr(
      'Douglas built the first version in Santa Monica with beds for overnight passengers. A daytime version with seats followed.',
      'Douglas construyó en Santa Mónica la primera versión, con camas para los pasajeros nocturnos. Después llegó una versión diurna con asientos.',
      'В Санта-Монике компания Douglas построила первый вариант с кроватями для ночных пассажиров. Следом появился дневной вариант с креслами.',
    ),
    discovery: tr(
      'The DC-3 helped airlines earn money by carrying people. Feel the paper model’s doubled front edge and look for its broad wing.',
      'El DC-3 ayudó a las aerolíneas a ganar dinero transportando pasajeros. Toca el doble borde delantero y busca el ala ancha del modelo de papel.',
      'DC-3 помог авиакомпаниям зарабатывать на перевозке пассажиров. Нащупай двойной передний край и найди широкое крыло бумажной модели.',
    ),
    people: [
      person(tr('C. R. Smith', 'C. R. Smith', 'С. Р. Смит'),
        tr('Airline president who asked Douglas for a sleeper airplane', 'Presidente de la aerolínea que pidió un avión con camas', 'Руководитель авиакомпании, заказавший самолёт со спальными местами')),
    ],
    locations: [
      location('santa-monica', 'first-flight', 34.02, -118.45, firstFlight,
        tr('Santa Monica, California, USA', 'Santa Mónica, California, EE. UU.', 'Санта-Моника, Калифорния, США')),
    ],
    sources: [
      source(tr('Smithsonian · Douglas DC-3', 'Smithsonian · Douglas DC-3', 'Смитсоновский институт · Дуглас DC-3'), 'https://airandspace.si.edu/collection-objects/douglas-dc-3/nasm_A19530075000'),
      source(tr('Boeing · Douglas aircraft history', 'Boeing · Historia de los aviones Douglas', 'Boeing · История самолётов Douglas'), 'https://www.boeing.com/content/dam/boeing/v2/company/history/pdf/Boeing_Products.pdf'),
    ],
  },
  'ilyushin-il62': {
    kind: 'airplane', ...aircraftHeritage['ilyushin-il62'],
    model: tr('Ilyushin Il-62', 'Ilyushin Il-62', 'Ильюшин Ил-62'),
    story: tr(
      'Ilyushin’s team in Moscow built a Soviet jet for long passenger routes. The prototype first flew in January 1963.',
      'El equipo de Ilyushin en Moscú construyó un reactor soviético para rutas largas de pasajeros. El prototipo voló por primera vez en enero de 1963.',
      'Команда Ильюшина в Москве построила советский реактивный самолёт для дальних пассажирских рейсов. Опытный самолёт впервые поднялся в воздух в январе 1963 года.',
    ),
    discovery: tr(
      'Four engines sat by the tail, leaving a clear wing. Two pairs of stripes on the illustrated paper wings recall those engines.',
      'Cuatro motores junto a la cola dejaban el ala despejada. Dos pares de franjas en las alas de papel ilustradas recuerdan esos motores.',
      'Четыре двигателя разместили у хвоста, оставив крыло свободным. О них напоминают две пары полос на иллюстрированных бумажных крыльях.',
    ),
    people: [
      person(tr('Sergei Ilyushin', 'Serguéi Ilyushin', 'Сергей Ильюшин'), designLead),
      person(tr('Vladimir Kokkinaki', 'Vladímir Kokkinaki', 'Владимир Коккинаки'), testPilot),
    ],
    locations: [
      location('moscow', 'design', 55.79, 37.54, tr('Design and prototype', 'Diseño y prototipo', 'Разработка и прототип'),
        tr('Moscow, USSR (now Russia)', 'Moscú, URSS (hoy Rusia)', 'Москва, СССР (ныне Россия)')),
    ],
    sources: [
      source(tr('Il design bureau recollections', 'Recuerdos de la oficina de diseño Il', 'Воспоминания сотрудников ОКБ Ильюшина'), 'https://www.aviaport.ru/news/246613/'),
      source(tr('Engineer Genrikh Novozhilov’s memoir', 'Memorias del ingeniero Guénrij Novozhílov', 'Воспоминания конструктора Генриха Новожилова'), 'https://www.mashin.ru/files/pol_05_1_60.pdf'),
    ],
  },
  'tupolev-tu144': {
    kind: 'airplane', ...aircraftHeritage['tupolev-tu144'],
    model: tr('Tupolev Tu-144', 'Túpolev Tu-144', 'Туполев Ту-144'),
    story: tr(
      'The Soviet Tupolev team made the first supersonic passenger airplane to fly. The prototype took off near Moscow on the last day of 1968.',
      'El equipo soviético de Túpolev construyó el primer avión supersónico de pasajeros que llegó a volar. El prototipo despegó cerca de Moscú el último día de 1968.',
      'Советское КБ Туполева построило первый в мире сверхзвуковой пассажирский самолёт, поднявшийся в воздух. Прототип взлетел под Москвой в последний день 1968 года.',
    ),
    discovery: tr(
      'Its triangular wing was made for fast flight. The airplane first flew faster than sound in June 1969.',
      'Su ala triangular se diseñó para volar a gran velocidad. El avión superó por primera vez la velocidad del sonido en junio de 1969.',
      'Треугольное крыло создали для скоростного полёта. Самолёт впервые превысил скорость звука в июне 1969 года.',
    ),
    people: [
      person(tr('Eduard Elyan', 'Eduard Elián', 'Эдуард Елян'), testPilot),
    ],
    locations: [
      location('zhukovsky', 'first-flight', 55.56, 38.15, firstFlight,
        tr('Zhukovsky, USSR (now Russia)', 'Zhukovski, URSS (hoy Rusia)', 'Жуковский, СССР (ныне Россия)')),
    ],
    sources: [
      source(tr('TsAGI · Tu-144 flight and wing', 'TsAGI · Vuelo y ala del Tu-144', 'ЦАГИ · Полёт и крыло Ту-144'), 'https://www.tsagi.ru/pressroom/news/5979/'),
      source(tr('Tupolev · Aircraft history', 'Túpolev · Historia del avión', 'Туполев · История самолёта'), 'https://www.aviationunion.ru/upload/iblock/9e0/ljt40oomk4qwdv1zp8zwdjzlq3ji0jga/PAO-Tupolev-na-sayt.pdf'),
    ],
  },

  // Record and championship planes: the original design, who flew it and where it won.
  'red-dart': {
    kind: 'airplane', record: true, country: 'RS',
    model: tr('Red Dart · Lazar Krstić', 'Red Dart · Lazar Krstić', 'Red Dart · Лазар Крстич'),
    date: tr('14 May 2022 · distance, 61.11 m', '14 de mayo de 2022 · distancia, 61,11 m', '14 мая 2022 · дальность, 61,11 м'),
    story: tr(
      'Lazar Krstić from Serbia threw his dart 61.11 m to win the distance final of Red Bull Paper Wings at Hangar-7 in Salzburg. He had come second in 2019 and refined the plane and his throw.',
      'Lazar Krstić, de Serbia, lanzó su dardo 61,11 m y ganó la final de distancia de Red Bull Paper Wings en el Hangar-7 de Salzburgo. En 2019 había quedado segundo y luego mejoró el avión y su lanzamiento.',
      'Лазар Крстич из Сербии бросил свой дротик на 61,11 м и выиграл финал Red Bull Paper Wings на дальность в «Ангаре-7» в Зальцбурге. В 2019 году он был вторым, а потом доработал самолёт и бросок.',
    ),
    discovery: tr(
      'Almost the whole sheet becomes body. Squeeze the needle’s nose to feel how many layers are wrapped there.',
      'Casi toda la hoja se convierte en cuerpo. Aprieta la punta de la aguja para notar cuántas capas hay envueltas.',
      'Почти весь лист превращается в корпус. Сожми нос «Иглы» и почувствуй, сколько там слоёв.',
    ),
    people: [person(tr('Lazar Krstić', 'Lazar Krstić', 'Лазар Крстич'), tr('Designed and threw the plane', 'Diseñó y lanzó el avión', 'Придумал и бросил самолёт'))],
    locations: [
      location('hangar-7', 'record', 47.79, 13.0, tr('World Final', 'Final mundial', 'Мировой финал'),
        tr('Hangar-7, Salzburg, Austria', 'Hangar-7, Salzburgo, Austria', '«Ангар-7», Зальцбург, Австрия')),
    ],
    sources: [
      source(tr('Red Bull · World Final 2022 results', 'Red Bull · Resultados de la final de 2022', 'Red Bull · Итоги финала 2022'), 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results'),
      source(tr('Guinness World Records · Farthest throw at the championship', 'Guinness World Records · Lanzamiento más largo del campeonato', 'Guinness World Records · Самый дальний бросок чемпионата'), 'https://www.guinnessworldrecords.com/world-records/729614-farthest-throw-at-the-red-bull-paper-plane-championship'),
      source(tr('Foldable Flight · Red Dart tutorial', 'Foldable Flight · Tutorial del Red Dart', 'Foldable Flight · Видеоурок Red Dart'), 'https://www.youtube.com/watch?v=4D6HZRaVFF8'),
    ],
  },
  'shaheen-shin': {
    kind: 'airplane', record: true, country: 'KR',
    model: tr('Shaheen Shin · Shin Moo Joon', 'Shaheen Shin · Shin Moo Joon', 'Shaheen Shin · Шин Му Джун'),
    date: tr('May 2022 · airtime, 14.86 s', 'mayo de 2022 · tiempo de vuelo, 14,86 s', 'май 2022 · время полёта, 14,86 с'),
    story: tr(
      'Rana Muhammad Usman Saeed from Pakistan won the airtime final of Red Bull Paper Wings with a square glider: 14.86 s. Foldable Flight credits the design to Shin Moo Joon, inspired by Ken Blackburn’s glider.',
      'Rana Muhammad Usman Saeed, de Pakistán, ganó la final de tiempo de vuelo de Red Bull Paper Wings con un planeador cuadrado: 14,86 s. Foldable Flight atribuye el diseño a Shin Moo Joon, inspirado en el planeador de Ken Blackburn.',
      'Рана Мухаммад Усман Саид из Пакистана выиграл финал Red Bull Paper Wings на время полёта с квадратным планёром: 14,86 с. Foldable Flight называет автором модели Шин Му Джуна, вдохновлённого планёром Кена Блэкберна.',
    ),
    discovery: tr(
      'An airtime plane must climb straight on a hard throw, then glide slowly. Feel the rolled bar that does the first job.',
      'Un avión de tiempo de vuelo debe subir recto con un lanzamiento fuerte y luego planear despacio. Toca la barra enrollada que se encarga de lo primero.',
      'Самолёт на время полёта должен ровно взлететь после сильного броска, а потом медленно планировать. Нащупай скатанный валик: он отвечает за первое.',
    ),
    people: [
      person(tr('Shin Moo Joon', 'Shin Moo Joon', 'Шин Му Джун'), tr('Credited with the design by the tutorial', 'Autor del diseño según el tutorial', 'Автор модели по данным видеоурока')),
      person(tr('Rana Muhammad Usman Saeed', 'Rana Muhammad Usman Saeed', 'Рана Мухаммад Усман Саид'), tr('Won the airtime final with it', 'Ganó con él la final de tiempo de vuelo', 'Выиграл с ней финал на время полёта')),
    ],
    locations: [
      location('hangar-7', 'record', 47.79, 13.0, tr('World Final', 'Final mundial', 'Мировой финал'),
        tr('Hangar-7, Salzburg, Austria', 'Hangar-7, Salzburgo, Austria', '«Ангар-7», Зальцбург, Австрия')),
    ],
    sources: [
      source(tr('Red Bull · World Final 2022 results', 'Red Bull · Resultados de la final de 2022', 'Red Bull · Итоги финала 2022'), 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results'),
      source(tr('Guinness World Records · Longest time aloft at the championship', 'Guinness World Records · Más tiempo en el aire en el campeonato', 'Guinness World Records · Дольше всех в воздухе на чемпионате'), 'https://www.guinnessworldrecords.com/world-records/729617-longest-time-aloft-at-the-red-bull-paper-wings-championship'),
      source(tr('Foldable Flight · Shaheen Shin tutorial', 'Foldable Flight · Tutorial del Shaheen Shin', 'Foldable Flight · Видеоурок Shaheen Shin'), 'https://www.youtube.com/watch?v=lIBeQDtJLf4'),
    ],
  },
  'crescent-boomerang': {
    kind: 'airplane', record: true, country: 'KR',
    model: tr('Crescent Boomerang · Seunghoon Lee', 'Crescent Boomerang · Seunghoon Lee', 'Crescent Boomerang · Сынхун Ли'),
    date: tr('14 May 2022 · aerobatics, 46 points', '14 de mayo de 2022 · acrobacias, 46 puntos', '14 мая 2022 · аэробатика, 46 баллов'),
    story: tr(
      'Seunghoon Lee, a science teacher from South Korea, won the aerobatics final of Red Bull Paper Wings with a one-minute show. This boomerang flew back to his hand. No designer is named; his channel WePlay published the same fold in 2018.',
      'Seunghoon Lee, profesor de ciencias de Corea del Sur, ganó la final de acrobacias de Red Bull Paper Wings con una actuación de un minuto. Este bumerán volvía a su mano. No consta quién lo diseñó; su canal WePlay publicó el mismo plegado en 2018.',
      'Сынхун Ли, учитель естествознания из Южной Кореи, выиграл финал Red Bull Paper Wings по аэробатике с минутным номером. Этот бумеранг возвращался ему в руку. Автор модели не указан; канал Ли WePlay показал тот же сгиб в 2018 году.',
    ),
    discovery: tr(
      'Thrown on its side, its lift points into a circle. Bend the back edges up and the circle gets smaller.',
      'Lanzado de lado, su sustentación apunta hacia el centro de un círculo. Levanta los bordes de atrás y el círculo se hace más pequeño.',
      'Если бросить модель на боку, подъёмная сила направлена внутрь круга. Отогни задние кромки вверх, и круг станет меньше.',
    ),
    people: [person(tr('Seunghoon Lee', 'Seunghoon Lee', 'Сынхун Ли'), tr('Flew it in the winning routine', 'Lo lanzó en la actuación ganadora', 'Запускал её в победном номере'))],
    locations: [
      location('hangar-7', 'record', 47.79, 13.0, tr('World Final', 'Final mundial', 'Мировой финал'),
        tr('Hangar-7, Salzburg, Austria', 'Hangar-7, Salzburgo, Austria', '«Ангар-7», Зальцбург, Австрия')),
    ],
    sources: [
      source(tr('Red Bull · World Final 2022 results', 'Red Bull · Resultados de la final de 2022', 'Red Bull · Итоги финала 2022'), 'https://www.redbull.com/int-en/red-bull-paper-wings-world-final-results'),
      source(tr('WePlay · Boomerang plane (2018)', 'WePlay · Avión bumerán (2018)', 'WePlay · Самолёт-бумеранг (2018)'), 'https://www.youtube.com/watch?v=qP8FrPScgos'),
      source(tr('Foldable Flight · Crescent Boomerang tutorial', 'Foldable Flight · Tutorial del Crescent Boomerang', 'Foldable Flight · Видеоурок Crescent Boomerang'), 'https://www.youtube.com/watch?v=PAp6CToFr3Y'),
    ],
  },
  'sky-king': {
    kind: 'airplane', record: true, country: 'JP',
    model: tr('Sky King · Takuo Toda', 'Sky King · Takuo Toda', 'Sky King · Такуо Тода'),
    date: tr('2009 · time-aloft record, 27.9 s', '2009 · récord de tiempo en el aire, 27,9 s', '2009 · рекорд времени полёта, 27,9 с'),
    story: tr(
      'Takuo Toda folds his planes from one uncut sheet. In 2009 a modified Sky King stayed up for 27.9 s and took the Guinness record; in 2010 his newer Zero Fighter reached 29.2 s.',
      'Takuo Toda pliega sus aviones con una sola hoja sin cortes. En 2009 un Sky King modificado se mantuvo 27,9 s en el aire y logró el récord Guinness; en 2010 su Zero Fighter, más nuevo, llegó a 29,2 s.',
      'Такуо Тода складывает самолёты из одного неразрезанного листа. В 2009 году доработанный Sky King продержался в воздухе 27,9 с и установил рекорд Guinness; в 2010 году его новая модель Zero Fighter продержалась 29,2 с.',
    ),
    discovery: tr(
      'The squashed nose stacks layers at the front, so the plane survives a hard throw and still glides.',
      'La punta aplastada acumula capas delante, así que el avión aguanta un lanzamiento fuerte y aun así planea.',
      'Расплющенный нос собирает слои спереди: самолёт выдерживает сильный бросок и всё равно планирует.',
    ),
    people: [person(tr('Takuo Toda', 'Takuo Toda', 'Такуо Тода'), tr('Designed the Sky King and set the 2009 and 2010 records', 'Diseñó el Sky King y logró los récords de 2009 y 2010', 'Придумал Sky King и установил рекорды 2009 и 2010 годов'))],
    locations: [
      location('japan', 'design', 36.2, 138.25, tr('Designer’s country', 'País del diseñador', 'Страна автора'),
        tr('Japan', 'Japón', 'Япония')),
    ],
    sources: [
      source(tr('WIRED · Takuo Toda folds the Sky King (2009)', 'WIRED · Takuo Toda pliega el Sky King (2009)', 'WIRED · Такуо Тода складывает Sky King (2009)'), 'https://www.youtube.com/watch?v=c1fXWVhd6dU'),
      source(tr('TIME · Best Inventions of 2009', 'TIME · Mejores inventos de 2009', 'TIME · Лучшие изобретения 2009 года'), 'https://content.time.com/time/specials/packages/article/0,28804,1934027_1934003_1933991,00.html'),
      source(tr('Guinness World Records · Longest time flying a paper aircraft', 'Guinness World Records · Más tiempo de vuelo de un avión de papel', 'Guinness World Records · Самый долгий полёт бумажного самолёта'), 'https://www.guinnessworldrecords.com/world-records/longest-time-flying-a-paper-aircraft.html'),
    ],
  },
};

const pilots = {
  'yuri-gagarin': {
    kind: 'pilot', country: 'USSR',
    model: tr('Yuri Gagarin', 'Yuri Gagarin', 'Юрий Гагарин'),
    date: tr('1955–1957 · Jet training', '1955–1957 · Instrucción de vuelo a reacción', '1955–1957 · Учебные полёты на реактивном самолёте'),
    story: tr(
      'Gagarin trained at the flight school in Chkalov and progressed to the MiG-15bis jet. He graduated in 1957.',
      'Gagarin estudió en la escuela de vuelo de Chkálov y llegó a pilotar el reactor MiG-15bis. Se graduó en 1957.',
      'Гагарин учился в лётном училище в Чкалове и на последнем этапе освоил реактивный МиГ-15бис. Он окончил училище в 1957 году.',
    ),
    discovery: tr(
      'On 12 April 1961 he launched from Baikonur aboard the Vostok spacecraft and became the first person in space.',
      'El 12 de abril de 1961 despegó de Baikonur a bordo de la nave Vostok y se convirtió en la primera persona en viajar al espacio.',
      '12 апреля 1961 года он стартовал с Байконура на космическом корабле «Восток» и стал первым человеком в космосе.',
    ),
    locations: [
      location('chkalov', 'training', 51.76, 55.1, tr('Jet training', 'Instrucción de vuelo', 'Лётная учёба'),
        tr('Chkalov, USSR (now Orenburg, Russia)', 'Chkálov, URSS (hoy Oremburgo, Rusia)', 'Чкалов, СССР (ныне Оренбург, Россия)'),
        tr('1955–1957', '1955–1957', '1955–1957')),
      location('baikonur', 'spaceflight', 45.92, 63.34, tr('Vostok launch', 'Lanzamiento de Vostok', 'Старт «Востока»'),
        tr('Baikonur, USSR (now Kazakhstan)', 'Baikonur, URSS (hoy Kazajistán)', 'Байконур, СССР (ныне Казахстан)'),
        tr('12 April 1961', '12 de abril de 1961', '12 апреля 1961')),
    ],
    sources: [
      source(tr('Russian State Archive · Gagarin’s training', 'Archivo estatal ruso · Formación de Gagarin', 'РГАНТД · Лётная учёба Гагарина'), 'https://rgantd.ru/virtual/lyudi/internet-vystavka-kakim-on-parnem-byl-k-85-letiyu-so-dnya-rozhdeniya-yu-a-gagarina-new/'),
      source(tr('Presidential Library · Vostok flight', 'Biblioteca Presidencial · Vuelo de Vostok', 'Президентская библиотека · Полёт «Востока»'), 'https://www.prlib.ru/history/1864421'),
    ],
    illustration: {
      file: 'orenburg-mig-15bis.jpg',
      caption: tr('MiG-15bis on display in Orenburg', 'MiG-15bis expuesto en Oremburgo', 'МиГ-15бис на постаменте в Оренбурге'),
      credit: 'Ratursun · CC BY-SA 4.0',
      url: 'https://commons.wikimedia.org/wiki/File:Оренбурггагарин.jpg',
    },
  },
  'john-glenn': {
    kind: 'pilot', country: 'US',
    model: tr('John Glenn', 'John Glenn', 'Джон Гленн'),
    date: tr('16 July 1957 · Project Bullet', '16 de julio de 1957 · Proyecto Bullet', '16 июля 1957 · Проект Bullet'),
    story: tr(
      'For Project Bullet, test pilot John Glenn flew an F8U-1P Crusader from Los Alamitos, California, to Brooklyn, New York.',
      'En el Proyecto Bullet, el piloto de pruebas John Glenn voló en un F8U-1P Crusader desde Los Alamitos, California, hasta Brooklyn, Nueva York.',
      'В проекте Bullet лётчик-испытатель Джон Гленн перелетел на F8U-1P Crusader из Лос-Аламитоса в Калифорнии в Бруклин, Нью-Йорк.',
    ),
    discovery: tr(
      'The crossing took about 3 hours and 23 minutes, averaging faster than sound. Glenn’s later Earth orbits in 1962 were aboard Friendship 7.',
      'El viaje duró unas 3 horas y 23 minutos, con una velocidad media superior a la del sonido. En 1962, Glenn orbitó la Tierra a bordo de Friendship 7.',
      'Перелёт занял около 3 часов 23 минут. Средняя скорость превысила скорость звука. В 1962 году Гленн облетел Землю на корабле Friendship 7.',
    ),
    locations: [
      location('los-alamitos', 'takeoff', 33.79, -118.05, tr('Takeoff', 'Despegue', 'Взлёт'),
        tr('Los Alamitos, California, USA', 'Los Alamitos, California, EE. UU.', 'Лос-Аламитос, Калифорния, США')),
      location('floyd-bennett', 'landing', 40.59, -73.89, tr('Landing', 'Aterrizaje', 'Посадка'),
        tr('Floyd Bennett Field, Brooklyn, USA', 'Floyd Bennett Field, Brooklyn, EE. UU.', 'Флойд-Беннетт-Филд, Бруклин, США')),
    ],
    sources: [
      source(tr('U.S. Naval History and Heritage Command', 'Comando de Historia y Patrimonio Naval de EE. UU.', 'Управление истории и наследия ВМС США'), 'https://www.history.navy.mil/news-and-events/news/2021/nhm-071321.html'),
      source(tr('Ohio State University · John Glenn archive', 'Universidad Estatal de Ohio · Archivo de John Glenn', 'Университет штата Огайо · Архив Джона Гленна'), 'https://library.osu.edu/john-glenn-biographical-sketch'),
      source(tr('NASA · Glenn’s aviation and space flights', 'NASA · Vuelos de Glenn', 'NASA · Авиационные и космические полёты Гленна'), 'https://www.nasa.gov/history/40thmerc7/shepard.htm'),
    ],
    illustration: {
      file: 'rf-8a-crusader.jpg',
      caption: tr('RF-8A (formerly F8U-1P), another airplane of the same type, c. 1963', 'RF-8A (antes F8U-1P), otro avión del mismo tipo, hacia 1963', 'RF-8A (прежнее название F8U-1P), другой самолёт того же типа, около 1963 года'),
      credit: 'U.S. Navy',
      url: 'https://commons.wikimedia.org/wiki/File:Vought_RF-8A_Crusader_of_VFP-62_in_flight_c1963.jpg',
    },
  },
};

export const originModelIds = Object.freeze(Object.keys(origins));

function localize(id, record, lang) {
  const t = value => value?.[lang] ?? value?.en;
  const locations = record.locations.map(({label, place, date, ...point}) => ({
    ...point, label: t(label), place: t(place), ...(date && {date: t(date)}),
  }));
  const {model, story, discovery, date, people = [], sources, illustration, specimen, ...other} = record;
  const era = eraNames[record.country];
  return {
    ...other, id, model: t(model), place: locations[0].place, date: t(date),
    story: t(story), discovery: t(discovery), locations,
    people: people.map(({name, role}) => ({name: t(name), role: t(role)})),
    sources: sources.map(({label, url}) => ({label: t(label), url})),
    ...(era && {era: t(era)}),
    ...(specimen && {specimen: t(specimen)}),
    ...(illustration && {illustration: {...illustration, caption: t(illustration.caption)}}),
  };
}

export function modelOrigin(modelId, lang = 'en') {
  const id = typeof modelId === 'string' ? modelId.replace(/-k1$/, '') : null;
  return Object.hasOwn(origins, id) ? localize(id, origins[id], lang) : null;
}

export function pilotStories(lang = 'en') {
  return Object.entries(pilots).map(([id, record]) => localize(id, record, lang));
}

export function relatedPilotStories(modelId, lang = 'en') {
  const country = modelOrigin(modelId, lang)?.country;
  return country ? pilotStories(lang).filter(pilot => pilot.country === country) : [];
}
