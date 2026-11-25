// The book's structure, shared by the site, Print & Play and the book PDF.
// The site is the book's free web edition: chapters replace the workshop's tool
// list and every design is a numbered plate. Plate IDs never change: a new design
// takes the next free ID in its family (A5, B4, F4).
const w = (en, es, ru) => ({ en, es, ru })

/** Working title, chosen in one place until the owner decides (PLAN.md, K1). */
export const book = {
  title: w('One Sheet', 'Una hoja', 'Один лист'),
  subtitle: w('A field notebook of paper flight', 'Un cuaderno de campo del vuelo en papel', 'Полевой блокнот бумажного полёта'),
  promise: w(
    'Ten flying things, each from one sheet of paper. How to make them, how they fly and where their ideas come from. Free to read and print.',
    'Diez cosas que vuelan, cada una de una sola hoja de papel. Cómo hacerlas, cómo vuelan y de dónde vienen sus ideas. Gratis para leer e imprimir.',
    'Десять летающих моделей, каждая из одного листа бумаги. Как их сделать, как они летают и откуда взялась их идея. Читать и печатать бесплатно.',
  ),
}

/**
 * Chapters in book order. `route` is the public path segment (see publicPath in
 * site-navigation.js); null means the chapter has no page of its own yet.
 */
export const chapters = [
  {
    n: 1, id: 'one-sheet', route: null,
    title: w('One sheet', 'Una hoja', 'Один лист'),
    standfirst: w(
      'Why paper flight, and how to read this book together.',
      'Por qué volar con papel y cómo leer este libro juntos.',
      'Зачем запускать бумагу и как читать эту книгу вместе.',
    ),
  },
  {
    n: 2, id: 'how-it-flies', route: 'how-it-flies',
    title: w('How flight works', 'Cómo funciona el vuelo', 'Как устроен полёт'),
    standfirst: w(
      'Lift, weight, balance and drag, shown with paper.',
      'Sustentación, peso, equilibrio y resistencia, explicados con papel.',
      'Подъёмная сила, вес, балансировка и сопротивление на примере бумаги.',
    ),
  },
  {
    n: 3, id: 'nature', route: 'nature',
    title: w('Nature’s flyers', 'Los voladores de la naturaleza', 'Летуны природы'),
    standfirst: w(
      'Seeds, insects, pterosaurs, birds and bats: how flight evolved, and what paper can copy.',
      'Semillas, insectos, pterosaurios, aves y murciélagos: cómo evolucionó el vuelo y qué puede copiar el papel.',
      'Семена, насекомые, птерозавры, птицы и летучие мыши: как появился полёт и что может повторить бумага.',
    ),
  },
  {
    n: 4, id: 'airplanes', route: 'airplanes', family: 'airplane', plates: ['A1', 'A2', 'A3', 'A4'],
    title: w('Airplanes', 'Aviones', 'Самолёты'),
    standfirst: w(
      'One sheet each. Four folds, each named after a real aircraft.',
      'Una hoja cada uno. Cuatro pliegues, cada uno con el nombre de un avión real.',
      'Один лист на каждый. Четыре сгиба, у каждого есть настоящий прототип.',
    ),
  },
  {
    n: 5, id: 'butterflies', route: 'butterflies', family: 'butterfly', plates: ['B1', 'B2', 'B3'],
    title: w('Butterflies', 'Mariposas', 'Бабочки'),
    standfirst: w(
      'Three experimental gliders. Cut, fold, clip and trim, then tell us how they flew.',
      'Tres planeadores experimentales. Recorta, pliega, pon los clips y ajusta. Luego cuéntanos cómo volaron.',
      'Три экспериментальных планёра. Вырежьте, сложите, наденьте скрепки и настройте, а потом расскажите, как они летали.',
    ),
  },
  {
    n: 6, id: 'flying-objects', route: 'flying-objects', family: 'object', plates: ['F1', 'F2', 'F3'],
    title: w('Flying objects', 'Objetos voladores', 'Летающие модели'),
    standfirst: w(
      'A ring, a maple seed and a two-winged glider from 1918.',
      'Un anillo, una semilla de arce y un planeador de dos alas de 1918.',
      'Кольцо, крылатка клёна и двукрылый планёр 1918 года.',
    ),
  },
  {
    n: 7, id: 'history', route: 'history',
    title: w('A short history of flight', 'Breve historia del vuelo', 'Краткая история полёта'),
    standfirst: w(
      'From kites and balloons to gliders, the first airplane and the paper plane contests.',
      'De las cometas y los globos a los planeadores, el primer avión y los concursos de aviones de papel.',
      'От воздушных змеев и шаров к планёрам, первому самолёту и конкурсам бумажных самолётов.',
    ),
  },
  {
    n: 8, id: 'space', route: 'space',
    title: w('Beyond the sky', 'Más allá del cielo', 'За пределами неба'),
    standfirst: w(
      'Why wings need air, how the Space Shuttle glided home, and what it takes to fly on Mars.',
      'Por qué las alas necesitan aire, cómo volvía planeando el transbordador y qué hace falta para volar en Marte.',
      'Зачем крыльям воздух, как шаттл возвращался планированием и что нужно, чтобы летать на Марсе.',
    ),
  },
  {
    n: 9, id: 'contests', route: 'contests',
    title: w('Contests and records', 'Competiciones y récords', 'Соревнования и рекорды'),
    standfirst: w(
      'How people measure a paper flight, and how to hold a contest at home.',
      'Cómo se mide un vuelo de papel y cómo organizar una competición en casa.',
      'Как измеряют полёт бумажной модели и как устроить соревнование дома.',
    ),
  },
  {
    n: 10, id: 'experiments', route: 'experiments',
    title: w('The flight lab', 'El laboratorio de vuelo', 'Лётная лаборатория'),
    standfirst: w(
      'Predict, launch, change one thing, compare.',
      'Predice, lanza, cambia una sola cosa y compara.',
      'Предскажите, запустите, измените одно и сравните.',
    ),
  },
]

/** Pages that close the book. */
export const appendix = [
  { id: 'print', route: 'print', title: w('Print & Play', 'Imprime y vuela', 'Распечатать и запустить') },
  { id: 'references', route: null, title: w('Sources and credits', 'Fuentes y créditos', 'Источники и авторы') },
  {
    id: 'motor-lab', route: 'motor-lab',
    title: w('Beyond paper', 'Más allá del papel', 'За пределами бумаги'),
    standfirst: w('A motor mount and a phone bench. Untested.', 'Un soporte de motor y un banco con teléfono. Sin probar.', 'Крепление мотора и стенд с телефоном. Не испытано.'),
  },
]

const evidence = {
  fold: w('Open Flight fold · not yet measured', 'Pliegue de Open Flight · aún sin medir', 'Сгиб Open Flight · ещё не измерен'),
  traditional: w('Traditional dart · our version not yet measured', 'Dardo tradicional · nuestra versión aún sin medir', 'Традиционный дротик · наша версия ещё не измерена'),
  experimental: w('Experimental glider · awaiting flight test', 'Planeador experimental · pendiente de prueba de vuelo', 'Экспериментальный планёр · ждёт лётных испытаний'),
  classic: w('Classic design · our version not yet measured', 'Diseño clásico · nuestra versión aún sin medir', 'Классическая модель · наша версия ещё не измерена'),
  historic: w('From a 1918 book · our redraw not yet measured', 'De un libro de 1918 · nuestro redibujo aún sin medir', 'Из книги 1918 года · наша перерисовка ещё не измерена'),
}

/**
 * Plates. `model` is the existing design id used by URLs, sheets and book links.
 * `lineage` replaces the aircraft name as a title: the paper design leads and the
 * aircraft is a reference. `kind` is the flight the geometry suggests, untested.
 */
export const plates = [
  {
    id: 'A1', model: 'boeing-747', chapter: 'airplanes', evidence: evidence.fold, category: 'airtime',
    lineage: w('A broad paper glider after the Boeing 747', 'Planeador de papel de alas anchas inspirado en el Boeing 747', 'Широкий бумажный планёр по мотивам Boeing 747'),
    kind: w('Glider · gentle throw', 'Planeador · lanzamiento suave', 'Планёр · мягкий бросок'),
  },
  {
    id: 'A2', model: 'douglas-dc3', chapter: 'airplanes', evidence: evidence.fold, category: 'airtime',
    lineage: w('A slow, broad-winged glider after the Douglas DC-3', 'Planeador lento de alas anchas inspirado en el Douglas DC-3', 'Медленный ширококрылый планёр по мотивам Douglas DC-3'),
    kind: w('Slow glider · gentle throw', 'Planeador lento · lanzamiento suave', 'Медленный планёр · мягкий бросок'),
  },
  {
    id: 'A3', model: 'ilyushin-il62', chapter: 'airplanes', evidence: evidence.fold, category: 'accuracy',
    lineage: w('A swept, steady flyer after the Ilyushin Il-62', 'Avión de alas en flecha y vuelo estable inspirado en el Ilyushin Il-62', 'Устойчивый самолёт со стреловидным крылом по мотивам Ил-62'),
    kind: w('Straight flyer · steady throw', 'Vuelo recto · lanzamiento firme', 'Прямой полёт · ровный бросок'),
  },
  {
    id: 'A4', model: 'tupolev-tu144', chapter: 'airplanes', evidence: evidence.traditional, category: 'distance',
    lineage: w('The classic paper dart, after the Tupolev Tu-144', 'El clásico dardo de papel, inspirado en el Tupolev Tu-144', 'Классический бумажный дротик по мотивам Ту-144'),
    kind: w('Dart · firm throw', 'Dardo · lanzamiento fuerte', 'Дротик · сильный бросок'),
  },
  {
    id: 'B1', model: 'monarch', chapter: 'butterflies', evidence: evidence.experimental,
    lineage: w('An experimental paper glider with a monarch’s wings', 'Planeador experimental de papel con alas de monarca', 'Экспериментальный бумажный планёр с крыльями монарха'),
    kind: w('Experimental glider · smooth push', 'Planeador experimental · empuje suave', 'Экспериментальный планёр · плавный толчок'),
  },
  {
    id: 'B2', model: 'morpho', chapter: 'butterflies', evidence: evidence.experimental,
    lineage: w('An experimental paper glider with a blue morpho’s wings', 'Planeador experimental de papel con alas de morfo azul', 'Экспериментальный бумажный планёр с крыльями голубой морфо'),
    kind: w('Experimental glider · smooth push', 'Planeador experimental · empuje suave', 'Экспериментальный планёр · плавный толчок'),
  },
  {
    id: 'B3', model: 'swallowtail', chapter: 'butterflies', evidence: evidence.experimental,
    lineage: w('An experimental paper glider with a swallowtail’s wings', 'Planeador experimental de papel con alas de macaón', 'Экспериментальный бумажный планёр с крыльями махаона'),
    kind: w('Experimental glider · smooth push', 'Planeador experimental · empuje suave', 'Экспериментальный планёр · плавный толчок'),
  },
  {
    id: 'F1', model: 'ring', chapter: 'flying-objects', evidence: evidence.classic,
    lineage: w('A ring wing rolled from one sheet', 'Un ala en anillo hecha con una sola hoja', 'Кольцевое крыло из одного листа'),
    kind: w('Ring wing · overarm release', 'Ala en anillo · lanzamiento por encima del hombro', 'Кольцевое крыло · запуск из-за плеча'),
  },
  {
    id: 'F2', model: 'samara', chapter: 'flying-objects', evidence: evidence.classic,
    lineage: w('A paper maple seed that spins as it falls', 'Una semilla de arce de papel que gira al caer', 'Бумажная крылатка клёна, которая вращается при падении'),
    kind: w('Spinner · drop from high', 'Semilla giratoria · suéltala desde lo alto', 'Крылатка · отпустить с высоты'),
  },
  {
    id: 'F3', model: 'tandem', chapter: 'flying-objects', evidence: evidence.historic,
    lineage: w('A two-winged glider from a 1918 book', 'Un planeador de dos alas de un libro de 1918', 'Двукрылый планёр из книги 1918 года'),
    kind: w('Tandem glider · gentle push', 'Planeador tándem · empuje suave', 'Тандемный планёр · мягкий толчок'),
  },
]

export const plateFor = model => plates.find(plate => plate.model === model) ?? null
export const plateById = id => plates.find(plate => plate.id === id) ?? null
export const chapterById = id => chapters.find(chapter => chapter.id === id) ?? null
export const chapterOf = model => chapterById(plateFor(model)?.chapter)

/** "4 · Airplanes": the chapter label used in breadcrumbs and contents. */
export const chapterLabel = (chapter, lang) => chapter.n + ' · ' + chapter.title[lang]

/** Neighbouring plates in book order, for previous and next links. */
export function plateNeighbours(model) {
  const index = plates.findIndex(plate => plate.model === model)
  if (index < 0) return { previous: null, next: null }
  return { previous: plates[index - 1] ?? null, next: plates[index + 1] ?? null }
}
