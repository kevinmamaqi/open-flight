// Photographs used in the book and on the site, from Pixabay (Pixabay Content License)
// and Pexels (Pexels License). Both allow free commercial use without attribution and
// forbid selling a photo as a stand-alone copy. We credit the photographer anyway and
// record the page, so each picture can be checked or replaced. Neither site verifies
// that uploaders own their pictures: for a sold edition, re-check provenance (several
// space photographs are likely NASA or SpaceX releases) or use our own photographs.
// Web files are 1280–1600 px wide. Pexels print masters (3000–5000 px) are kept outside
// Git in local/book-photos-print/ and used by the press build when present.
const w = (en, es, ru) => ({ en, es, ru })
const pexels = (id, slug, user) => ({ source: 'Pexels', url: 'https://www.pexels.com/photo/' + (slug ? slug + '-' : '') + id + '/', user, license: 'Pexels License', checked: '2026-11-25' })
const pixabay = (id, slug, user) => ({ source: 'Pixabay', url: 'https://pixabay.com/photos/' + slug + '-' + id + '/', user, license: 'Pixabay Content License', checked: '2026-11-26' })

export const photos = {
  'paper-plane': { file: 'paper-plane.jpg', kind: 'photograph', ...pixabay(2648958, 'airplane-paper-freedom-handmade-fly', 'sinousxl'),
    caption: w('A paper airplane against a stormy sky.', 'Un avión de papel ante un cielo de tormenta.', 'Бумажный самолёт на фоне грозового неба.') },
  'maple-seeds': { file: 'maple-seeds.jpg', kind: 'photograph', ...pixabay(6001497, 'seeds-maple-branch-twig-maple-keys', 'heungsoon'),
    caption: w('Maple seeds grow in pairs. Each one has its own wing.', 'Las semillas de arce crecen en parejas. Cada una tiene su propia ala.', 'Семена клёна растут парами. У каждого своё крыло.') },
  'maple-seed-single': { file: 'maple-seed-single.jpg', kind: 'photograph', ...pixabay(453336, 'maple-seed-wood-fall-maple-seeds', 'heungsoon'),
    caption: w('A maple seed: a heavy nut and a thin, veined wing.', 'Una semilla de arce: un fruto pesado y un ala fina con nervios.', 'Крылатка клёна: тяжёлое семя и тонкое крыло с прожилками.') },
  dandelion: { file: 'dandelion.jpg', kind: 'photograph', ...pixabay(333643, 'flower-dandelion-seeds-wildflower', 'tho-ge'),
    caption: w('Dandelion seeds ride the air on tiny parachutes.', 'Las semillas del diente de león viajan con pequeños paracaídas.', 'Семена одуванчика летят на крошечных парашютах.') },
  dragonfly: { file: 'dragonfly.jpg', kind: 'photograph', ...pixabay(867888, 'dragonfly-wings-insect-macro', 'derweg'),
    caption: w('Dragonfly wings: four of them, stiffened by a net of veins.', 'Alas de libélula: cuatro, reforzadas por una red de nervios.', 'Крылья стрекозы: их четыре, и их держит сетка жилок.') },
  monarch: { file: 'monarch.jpg', kind: 'photograph', ...pixabay(929798, 'butterfly-monarch-butterfly-monarch', 'publicdomainpictures'),
    caption: w('A monarch butterfly with its wings open.', 'Una mariposa monarca con las alas abiertas.', 'Бабочка-монарх с раскрытыми крыльями.') },
  'gliding-bird': { file: 'gliding-bird.jpg', kind: 'photograph', ...pixabay(4821019, 'black-browed-albatros-sea-bird', 'jmarti20'),
    caption: w('A black-browed albatross glides low over the sea on long, narrow wings.', 'Un albatros ojeroso planea sobre el mar con alas largas y estrechas.', 'Чернобровый альбатрос скользит над морем на длинных узких крыльях.') },
  bat: { file: 'bat.jpg', kind: 'photograph', ...pixabay(1081294, 'animals-bat-flying-dog', 'hans'),
    caption: w('A fruit bat at rest. Its wings are skin stretched between long fingers.', 'Un murciélago frugívoro en reposo. Sus alas son piel tendida entre dedos largos.', 'Крылан в покое. Его крылья — кожа, натянутая между длинными пальцами.') },
  kite: { file: 'kite.jpg', kind: 'photograph', ...pixabay(7576866, 'kite-wind-dragon-fall', 'cocoparisienne'),
    caption: w('A kite holds still in the wind because a string holds it back.', 'Una cometa se mantiene quieta en el viento porque el hilo la sujeta.', 'Воздушный змей стоит в ветре, потому что его держит нить.') },
  glider: { file: 'glider.jpg', kind: 'photograph', ...pixabay(3792674, 'glider-dunstable-downs-flight', 'ignartonosbg'),
    caption: w('A sailplane over Dunstable Downs, England. No engine: it rides rising air.', 'Un velero sobre Dunstable Downs (Inglaterra). Sin motor: aprovecha el aire que sube.', 'Планёр над Данстейбл-Даунс в Англии. Без мотора: он использует восходящий воздух.') },
  'vintage-plane': { file: 'vintage-plane.jpg', kind: 'photograph', ...pixabay(1813731, 'aircraft-double-decker-biplane', 'tonysell'),
    caption: w('A biplane: two wings, one above the other, braced like a box kite.', 'Un biplano: dos alas, una sobre otra, reforzadas como una cometa de caja.', 'Биплан: два крыла одно над другим, связанные, как коробчатый змей.') },
  rocket: { file: 'rocket.jpg', kind: 'photograph', ...pixabay(67643, 'rocket-launch-rocket-take-off', 'wikiimages'),
    caption: w('A Space Shuttle launch. It went up as a rocket and came home as a glider.', 'Un lanzamiento del transbordador espacial. Subía como cohete y volvía como planeador.', 'Старт шаттла. Он взлетал как ракета, а возвращался как планёр.'),
    note: 'Uploaded by wikiimages; likely a NASA image (public domain). Verify the original NASA record before print.' },
  'earth-orbit': { file: 'earth-orbit.jpg', kind: 'render', ...pixabay(7471157, 'earth-world-globe-3d-earth-render', 'stokpic'),
    caption: w('Earth from far away. A computer render, not a photograph.', 'La Tierra vista desde lejos. Una imagen por ordenador, no una fotografía.', 'Земля издалека. Компьютерное изображение, а не фотография.') },
  mars: { file: 'mars.jpg', kind: 'photograph', ...pixabay(3607928, 'victoria-mars-crater-red-planet', 'wikiimages'),
    caption: w('Victoria crater on Mars, seen from orbit. The air here is about one hundredth as dense as Earth’s.', 'El cráter Victoria en Marte, visto desde la órbita. Aquí el aire es unas cien veces menos denso que en la Tierra.', 'Кратер Виктория на Марсе, снимок с орбиты. Воздух здесь примерно в сто раз реже, чем на Земле.'),
    note: 'Uploaded by wikiimages; likely NASA/JPL/University of Arizona (public domain). Verify before print.' },
  'folding-hands': { file: 'folding-hands.jpg', kind: 'photograph', ...pixabay(7924845, 'origami-paper-crane-folds-success', 'joa70'),
    caption: w('A paper crane: one square sheet, no cuts, no glue.', 'Una grulla de papel: una hoja cuadrada, sin cortes ni pegamento.', 'Бумажный журавлик: один квадратный лист, без надрезов и клея.') },
  // Pexels, added 25 November 2026. Print masters in local/book-photos-print/.
  spacewalk: { file: 'spacewalk.jpg', kind: 'photograph', print: true, ...pexels(2156, '', 'Pixabay'),
    caption: w('An astronaut on a spacewalk, high above the clouds. Up here there is almost no air, so wings cannot help.', 'Un astronauta en un paseo espacial, muy por encima de las nubes. Aquí arriba casi no hay aire, así que las alas no sirven.', 'Астронавт в открытом космосе, высоко над облаками. Здесь почти нет воздуха, поэтому крылья бесполезны.'),
    note: 'Uploaded to Pexels by Pixabay; likely a NASA photograph (public domain). Verify before print.' },
  'dragon-over-earth': { file: 'dragon-over-earth.jpg', kind: 'photograph', print: true, ...pexels(586056, '', 'SpaceX'),
    caption: w('A cargo capsule held by the space station’s robotic arm, about 400 km above the Earth.', 'Una cápsula de carga sujeta por el brazo robótico de la estación espacial, a unos 400 km sobre la Tierra.', 'Грузовой корабль в манипуляторе космической станции, примерно в 400 км над Землёй.'),
    note: 'Uploaded by SpaceX.' },
  'shuttle-launch': { file: 'shuttle-launch.jpg', kind: 'photograph', print: true, ...pexels(2166, '', 'Pixabay'),
    caption: w('A Space Shuttle leaves the pad. It went up like a rocket and came home as a glider.', 'Un transbordador espacial despega. Subía como un cohete y volvía a casa planeando.', 'Старт «Спейс шаттла». Он взлетал как ракета, а возвращался как планер.'),
    note: 'Uploaded to Pexels by Pixabay; likely a NASA photograph (public domain). Verify before print.' },
  'shuttle-discovery': { file: 'shuttle-discovery.jpg', kind: 'photograph', print: true, ...pexels(12888837, '', 'Eleanore Stohner'),
    caption: w('Space Shuttle Discovery, now in a museum. It flew to space 39 times and glided home every time.', 'El transbordador Discovery, hoy en un museo. Viajó al espacio 39 veces y siempre volvió planeando.', 'Шаттл «Дискавери», теперь в музее. Он летал в космос 39 раз и каждый раз возвращался планируя.') },
  'soyuz-launch': { file: 'soyuz-launch.jpg', kind: 'photograph', print: true, ...pexels(41005, '', 'Pixabay'),
    caption: w('A Soyuz rocket lifts off. Soyuz rockets have carried people to space since 1967.', 'Despega un cohete Soyuz. Los Soyuz llevan personas al espacio desde 1967.', 'Старт ракеты «Союз». «Союзы» возят людей в космос с 1967 года.'),
    note: 'Uploaded to Pexels by Pixabay; likely a NASA photograph (public domain). Verify before print.' },
  'falcon-launch': { file: 'falcon-launch.jpg', kind: 'photograph', print: true, ...pexels(23795, '', 'SpaceX'),
    caption: w('A rocket climbs on a column of fire. Some rockets now fly their first stage back to land and use it again.', 'Un cohete sube sobre una columna de fuego. Algunos cohetes ya hacen volver su primera etapa para aterrizar y usarla otra vez.', 'Ракета поднимается на столбе огня. Некоторые ракеты теперь возвращают первую ступень на посадку и запускают её снова.'),
    note: 'Uploaded by SpaceX.' },
  'night-launch': { file: 'night-launch.jpg', kind: 'photograph', print: true, ...pexels(23788, '', 'SpaceX'),
    caption: w('A night launch lights up the sea.', 'Un lanzamiento nocturno ilumina el mar.', 'Ночной старт освещает море.'),
    note: 'Uploaded by SpaceX.' },
  'milky-way': { file: 'milky-way.jpg', kind: 'photograph', print: true, ...pexels(3083808, '', 'S S'),
    caption: w('The Milky Way, our own galaxy, seen from inside it on a dark night.', 'La Vía Láctea, nuestra galaxia, vista desde dentro en una noche oscura.', 'Млечный Путь — наша Галактика, если смотреть на неё изнутри тёмной ночью.') },
  moon: { file: 'moon.jpg', kind: 'photograph', print: true, ...pexels(6288131, '', 'Stephen (Why Steve) Jacobs'),
    caption: w('The Moon has no air. In 1971 astronaut David Scott dropped a hammer and a feather there, and they landed together.', 'La Luna no tiene aire. En 1971 el astronauta David Scott dejó caer allí un martillo y una pluma, y llegaron al suelo a la vez.', 'На Луне нет воздуха. В 1971 году астронавт Дэвид Скотт уронил там молоток и перо, и они упали одновременно.') },
  aurora: { file: 'aurora.jpg', kind: 'photograph', print: true, ...pexels(6321128, '', 'stein egil liland'),
    caption: w('Northern lights glow about 100 km up and higher, where the air is almost gone.', 'La aurora boreal brilla a unos 100 km de altura y más arriba, donde casi no queda aire.', 'Северное сияние светится на высоте около 100 км и выше, где воздуха почти не осталось.') },
  murmuration: { file: 'murmuration.jpg', kind: 'photograph', print: true, ...pexels(29181531, '', 'Raul Ling'),
    caption: w('Thousands of starlings turn together. Each bird keeps watch on its nearest neighbours.', 'Miles de estorninos giran a la vez. Cada pájaro vigila a sus vecinos más cercanos.', 'Тысячи скворцов поворачивают разом. Каждая птица следит за ближайшими соседями.') },
  'gull-over-sea': { file: 'gull-over-sea.jpg', kind: 'photograph', print: true, ...pexels(31959903, '', 'Raul Ling'),
    caption: w('A gull skims low over the sea. Close to a flat surface, a wing gets a little extra lift.', 'Una gaviota vuela rozando el mar. Cerca de una superficie plana, un ala gana un poco más de sustentación.', 'Чайка летит низко над морем. У ровной поверхности крыло получает чуть больше подъёмной силы.') },
  'eagle-soaring': { file: 'eagle-soaring.jpg', kind: 'photograph', print: true, ...pexels(31519183, '', 'Frank Cone'),
    caption: w('A bald eagle soars on broad wings that end in spread feathers, like fingers.', 'Un pigargo americano planea con alas anchas que terminan en plumas abiertas, como dedos.', 'Белоголовый орлан парит на широких крыльях, на концах которых перья растопырены, как пальцы.') },
  sailplane: { file: 'sailplane.jpg', kind: 'photograph', print: true, ...pexels(28487499, '', 'Sergio Zhukov'),
    caption: w('A glider has no engine. It finds rising air and can stay up for hours.', 'Un planeador no tiene motor. Busca aire que sube y puede seguir volando durante horas.', 'У планера нет мотора. Он находит восходящий воздух и может летать часами.') },
  biplanes: { file: 'biplanes.jpg', kind: 'photograph', print: true, ...pexels(28177678, '', 'Miguel Cuenca'),
    caption: w('Two biplanes. Many early aeroplanes stacked two wings to be strong and light.', 'Dos biplanos. Muchos de los primeros aviones apilaban dos alas para ser fuertes y ligeros.', 'Два биплана. У многих первых самолётов было два крыла одно над другим: так конструкция выходила прочной и лёгкой.') },
  'hot-air-balloon': { file: 'hot-air-balloon.jpg', kind: 'photograph', print: true, ...pexels(19327746, '', 'Esra Erdem'),
    caption: w('A hot-air balloon rises because warm air is lighter than the cooler air around it.', 'Un globo aerostático sube porque el aire caliente pesa menos que el aire más frío que lo rodea.', 'Воздушный шар поднимается, потому что тёплый воздух легче окружающего холодного.') },
  'contrail-sunset': { file: 'contrail-sunset.jpg', kind: 'photograph', print: true, ...pexels(11975491, '', 'Chengxin Zhao'),
    caption: w('A jet draws a line across the evening sky. The trail is ice, made from water in the engine exhaust.', 'Un avión dibuja una línea en el cielo del atardecer. La estela es hielo, formado con el agua de los gases del motor.', 'Самолёт чертит линию в вечернем небе. След — это лёд из воды, которая есть в выхлопе двигателя.') },
  'dandelion-macro': { file: 'dandelion-macro.jpg', kind: 'photograph', print: true, ...pexels(1118423, '', 'Jessica Lewis'),
    caption: w('Each dandelion seed hangs under its own parachute of fine bristles.', 'Cada semilla de diente de león cuelga de su propio paracaídas de pelos finos.', 'Каждое семечко одуванчика висит под собственным парашютом из тонких волосков.') },
  'maple-samara': { file: 'maple-samara.jpg', kind: 'photograph', print: true, ...pexels(40026, '', 'Pixabay'),
    caption: w('A maple seed. Its wing makes it spin as it falls, so the wind can carry it away from the tree.', 'Una semilla de arce. Su ala la hace girar al caer, y así el viento puede alejarla del árbol.', 'Крылатка клёна. Крыло заставляет её вращаться при падении, и ветер уносит её от дерева.'),
    note: 'Uploaded to Pexels by Pixabay.' },
  'bat-flight': { file: 'bat-flight.jpg', kind: 'photograph', print: true, ...pexels(39049829, '', '#D67 HUNTER'),
    caption: w('A bat’s wing is skin stretched over very long finger bones.', 'El ala de un murciélago es piel estirada sobre unos huesos de los dedos muy largos.', 'Крыло летучей мыши — это кожа, натянутая между очень длинными костями пальцев.') },
  'bird-kites': { file: 'bird-kites.jpg', kind: 'photograph', print: true, ...pexels(5005214, '', 'Beren Atalay Yıldırım'),
    caption: w('Kites shaped like birds. Kites are among the oldest flying things people have made.', 'Cometas con forma de pájaro. Las cometas están entre los objetos voladores más antiguos que ha hecho el ser humano.', 'Воздушные змеи в форме птиц. Змеи — одни из самых древних летающих вещей, сделанных людьми.') },
  'monarch-flight': { file: 'monarch-flight.jpg', kind: 'photograph', print: true, ...pexels(35540444, '', 'Pi Pi'),
    caption: w('A monarch butterfly in flight. Each autumn, monarchs from Canada and the United States fly thousands of kilometres to Mexico.', 'Una mariposa monarca en vuelo. Cada otoño, las monarcas de Canadá y Estados Unidos vuelan miles de kilómetros hasta México.', 'Бабочка-монарх в полёте. Каждую осень монархи из Канады и США пролетают тысячи километров до Мексики.') },
  'paper-plane-throw': { file: 'paper-plane-throw.jpg', kind: 'photograph', print: true, ...pexels(9656756, '', 'cottonbro studio'),
    caption: w('One sheet, one throw. Then change one thing and throw again.', 'Una hoja, un lanzamiento. Después cambia una cosa y lanza otra vez.', 'Один лист, один запуск. Потом измените что-то одно и запустите снова.') },
  'paper-plane-forest': { file: 'paper-plane-forest.jpg', kind: 'photograph', print: true, ...pexels(17990325, '', 'Ediprastyo'),
    caption: w('Launch gently and level, then watch where it lands.', 'Lánzalo con suavidad y recto, y mira dónde aterriza.', 'Запускайте мягко и ровно, а потом смотрите, где он приземлится.') },
}

export const photoFor = id => photos[id] ?? null
export const photoPath = id => photos[id] ? 'assets/book/photos/' + photos[id].file : null
export const photoCredit = (id, lang) => {
  const p = photos[id]
  if (!p) return ''
  const by = { en: 'Photo', es: 'Foto', ru: 'Фото' }
  return (p.kind === 'render' ? { en: 'Render', es: 'Imagen', ru: 'Изображение' }[lang] : by[lang]) + ': ' + p.user + ' · ' + p.source
}
