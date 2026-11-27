// Plate F1, Ring glider (NASA/JPL classroom design). Spanish and Russian need a native read.
import { objectData } from '../figures/object-data.js?v=27dc78b6a91f'

const w = (en, es, ru) => ({ en, es, ru })
const r = objectData.ring.letter
const [d0, d1] = r.diameter_mm.map(Math.round), back = Math.round(r.balance_from_front_mm), share = Math.round(r.rim_paper_share * 100)

export default {
  id: 'F1', model: 'ring',
  glance: [
    { label: w('Paper', 'Papel', 'Бумага'), value: w('One plain A4 or US Letter sheet. No printing needed.', 'Una hoja normal A4 o Carta. No hace falta imprimir.', 'Один чистый лист A4 или US Letter. Печатать не нужно.'), state: null },
    { label: w('Rim', 'Borde', 'Обод'), value: w('Two 13 mm folds (NASA/JPL uses one)', 'Dos pliegues de 13 mm (NASA/JPL usa uno)', 'Два сгиба по 13 мм (у NASA/JPL один)'), state: null },
    { label: w('Ring across', 'Diámetro', 'Диаметр'), value: w(`about ${d0}–${d1} mm on Letter`, `unos ${d0}–${d1} mm con Carta`, `около ${d0}–${d1} мм на Letter`), state: 'estimate' },
    { label: w('Balance point', 'Punto de equilibrio', 'Точка равновесия'), value: w(`about ${back} mm behind the front edge`, `a unos ${back} mm del borde delantero`, `около ${back} мм от передней кромки`), state: 'estimate' },
    { label: w('Recorded flights', 'Vuelos registrados', 'Записанные полёты'), value: w('None yet for our version', 'Ninguno aún de nuestra versión', 'Нашей версии — пока нет'), state: 'not-yet-measured' },
  ],
  howItFlies: {
    en: { lead: 'The ring glider is a wing bent into a loop. The rolled rim makes the front heavier, and the paper behind it steers like the feathers of a shuttlecock.',
      body: ['The rolled rim at the front is the thickest part, so the ring balances near the front. The paper trailing behind works like the feathers of a badminton shuttlecock: if the nose tips up, down or sideways, the air pushes on the tail and lines it up again.',
        'As it flies a little nose-up, the top and bottom of the ring push air down, and the air pushes the ring up. The sides act like fins and keep it straight.'],
      grownUps: [`Folded on its diagonal, a US Letter sheet makes a rim about ${Math.round(r.diagonal_mm)} mm long with the two peaks ${Math.round(r.peaks_mm[0])} and ${Math.round(r.peaks_mm[1])} mm along it. Rolled into a ring about ${d0}–${d1} mm across, the peaks sit about ${r.peak_separation_deg}° apart and trail up to ${Math.round(r.skirt_at_peaks_mm)} mm behind the rim. Two 13 mm rim folds hold about ${share}% of the paper; our estimate puts the balance point about ${back} mm behind the front edge. These are geometry estimates, not measurements.`,
        'The paper ring is stable in pitch and yaw because the air force on its long tail acts behind its balance point, like an arrow’s fletching. A perfectly round ring has no preferred roll angle; the two peaks break that symmetry. For the same span and lift, a closed wing can have less induced drag than a single flat wing (Prandtl, 1924), but it adds surface and friction drag, which matters a lot at paper-glider speeds.'] },
    es: { lead: 'El planeador de anillo es un ala doblada en forma de aro. El borde enrollado hace más pesado el frente, y el papel de detrás lo guía como las plumas de un volante de bádminton.',
      body: ['El borde enrollado del frente es la parte más gruesa, así que el anillo se equilibra cerca del frente. El papel de detrás funciona como las plumas de un volante de bádminton: si el morro se inclina hacia arriba, hacia abajo o de lado, el aire empuja la cola y lo vuelve a alinear.',
        'Como vuela con el morro un poco hacia arriba, la parte de arriba y la de abajo del anillo empujan el aire hacia abajo, y el aire empuja el anillo hacia arriba. Los lados hacen de aletas y lo mantienen recto.'],
      grownUps: [`Doblada por la diagonal, una hoja Carta da un borde de unos ${Math.round(r.diagonal_mm)} mm con los dos picos a ${Math.round(r.peaks_mm[0])} y ${Math.round(r.peaks_mm[1])} mm. Enrollada en un anillo de unos ${d0}–${d1} mm, los picos quedan a unos ${r.peak_separation_deg}° y se extienden hasta ${Math.round(r.skirt_at_peaks_mm)} mm detrás del borde. Dos pliegues de 13 mm reúnen cerca del ${share} % del papel; estimamos el equilibrio a unos ${back} mm del borde delantero. Son estimaciones geométricas, no medidas.`,
        'El anillo de papel es estable en cabeceo y guiñada porque la fuerza del aire sobre su cola larga actúa detrás del punto de equilibrio, como las plumas de una flecha. Un anillo perfectamente redondo no tiene un ángulo de alabeo preferido; los dos picos rompen esa simetría. Con la misma envergadura y sustentación, un ala cerrada puede tener menos resistencia inducida que un ala plana (Prandtl, 1924), pero añade superficie y rozamiento, algo que pesa mucho a la velocidad de un planeador de papel.'] },
    ru: { lead: 'Кольцеплан — это крыло, свёрнутое в кольцо. Свёрнутый обод утяжеляет перёд, а бумага позади направляет полёт, как перья волана.',
      body: ['Свёрнутый обод впереди — самая толстая часть, поэтому кольцо балансирует ближе к переду. Бумага позади работает как перья волана для бадминтона: если нос отклонится вверх, вниз или вбок, воздух надавит на хвост и вернёт кольцо на курс.',
        'Кольцо летит, чуть задрав нос, поэтому его верх и низ отбрасывают воздух вниз, а воздух толкает кольцо вверх. Боковые стороны работают как кили и держат его прямо.'],
      grownUps: [`Сложенный по диагонали лист US Letter даёт обод длиной около ${Math.round(r.diagonal_mm)} мм, на котором два выступа находятся в ${Math.round(r.peaks_mm[0])} и ${Math.round(r.peaks_mm[1])} мм. В кольце диаметром около ${d0}–${d1} мм выступы расположены примерно в ${r.peak_separation_deg}° друг от друга и уходят назад до ${Math.round(r.skirt_at_peaks_mm)} мм за обод. В двух сгибах обода по 13 мм около ${share} % бумаги; по нашей оценке, точка равновесия примерно в ${back} мм от передней кромки. Это геометрические оценки, а не измерения.`,
        'Бумажное кольцо устойчиво по тангажу и рысканию, потому что сила воздуха на длинном хвосте приложена позади точки равновесия, как у оперения стрелы. У идеально круглого кольца нет предпочтительного угла крена; два выступа нарушают эту симметрию. При том же размахе и подъёмной силе замкнутое крыло может иметь меньшее индуктивное сопротивление, чем одно плоское (Прандтль, 1924), но у него больше поверхность и трение, а на скоростях бумажного планера это важно.'] },
  },
  why: {
    en: { title: 'A classroom classic',
      body: ['The ring glider is a classroom classic. NASA’s Jet Propulsion Laboratory uses it to ask whether a ring with a smaller or larger opening flies farther. A 1990 teachers’ guide, Of Wings and Things, already had a ring-wing activity.',
        'Spinning ring toys such as the X-Zylo are steadied by spin. Your ring has no spin, so its tail does that job.'],
      borrows: 'Our ring follows the JPL fold and launch, with a second rim fold to try.' },
    es: { title: 'Un clásico de las aulas',
      body: ['El planeador de anillo es un clásico de las aulas. El Jet Propulsion Laboratory de la NASA lo usa para preguntar si un anillo con la abertura más pequeña o más grande llega más lejos. Una guía para docentes de 1990, Of Wings and Things, ya tenía una actividad con un ala en anillo.',
        'Los anillos giratorios de juguete, como el X-Zylo, se estabilizan girando. Tu anillo no gira, así que su cola hace ese trabajo.'],
      borrows: 'Nuestro anillo sigue el pliegue y el lanzamiento de JPL, con un segundo pliegue del borde para probar.' },
    ru: { title: 'Классика школьных уроков',
      body: ['Кольцеплан — классика школьных уроков. Лаборатория реактивного движения NASA (JPL) предлагает с ним выяснить, дальше ли летит кольцо с меньшим или с большим отверстием. Задание с кольцевым крылом было уже в пособии для учителей 1990 года Of Wings and Things.',
        'Вращающиеся игрушечные кольца вроде X-Zylo держатся устойчиво благодаря вращению. Ваше кольцо не вращается, эту работу делает его хвост.'],
      borrows: 'Наше кольцо складывается и запускается как у JPL, а второй сгиб обода можно попробовать отдельно.' },
  },
  tryThis: {
    en: { question: 'Does a smaller ring fly farther?', prediction: 'Which flies farther: a ring about 100 mm across or one about 70 mm across? The small ring has the same paper in a shorter loop, so it is heavier for its size and flies faster.',
      steps: ['Make two rings from the same paper. Tuck one deeper so its opening is about 70 mm.', 'Measure both openings and write them down.', 'Launch each five times from the same line, with the same swing.', 'Mark every first touchdown.'],
      lookFor: 'Which set of marks lands farther, and which one flies straighter.' },
    es: { question: '¿Un anillo más pequeño llega más lejos?', prediction: '¿Cuál llega más lejos: un anillo de unos 100 mm de diámetro o uno de unos 70 mm? El pequeño tiene el mismo papel en un aro más corto, así que pesa más para su tamaño y vuela más rápido.',
      steps: ['Haz dos anillos con el mismo papel. Encaja más uno de ellos para que la abertura mida unos 70 mm.', 'Mide las dos aberturas y apúntalas.', 'Lanza cada uno cinco veces desde la misma línea, con el mismo movimiento.', 'Marca cada primer contacto con el suelo.'],
      lookFor: 'Qué grupo de marcas llega más lejos y cuál vuela más recto.' },
    ru: { question: 'Маленькое кольцо летит дальше?', prediction: 'Что улетит дальше: кольцо диаметром около 100 мм или около 70 мм? В маленьком столько же бумаги на более короткой окружности, поэтому оно тяжелее для своего размера и летит быстрее.',
      steps: ['Сделайте два кольца из одинаковой бумаги. Одно вставьте глубже, чтобы отверстие было около 70 мм.', 'Измерьте оба отверстия и запишите.', 'Запустите каждое пять раз с одной линии одинаковым движением.', 'Отмечайте каждое первое касание пола.'],
      lookFor: 'Какая группа отметок дальше и какое кольцо летит прямее.' },
  },
  references: [
    { label: 'NASA/JPL Education, Make a paper glider (ring wing)', url: 'https://www.jpl.nasa.gov/edu/resources/project/make-a-paper-glider/', note: w('Build, grip and launch, and the diameter experiment. Paraphrased with credit; no images copied.', 'Construcción, agarre, lanzamiento y el experimento del diámetro. Parafraseado con crédito; sin copiar imágenes.', 'Сборка, хват, запуск и опыт с диаметром. Пересказ со ссылкой, без копирования рисунков.') },
    { label: 'NASA/JPL Education, The Ring Wing Glider (lesson)', url: 'https://www.jpl.nasa.gov/edu/resources/lesson-plan/the-ring-wing-glider/', note: w('Classroom lesson. Linked; its printable template stays link-only.', 'Lección para el aula. Enlazada; su plantilla imprimible solo se enlaza.', 'Урок для класса. Только ссылка, включая шаблон для печати.') },
    { label: 'Of Wings and Things (1990), a teachers’ guide (ERIC ED360170)', url: 'https://files.eric.ed.gov/fulltext/ED360170.pdf', note: w('An early ring-wing activity for teachers. Linked.', 'Una actividad temprana de ala en anillo para docentes. Enlazado.', 'Раннее задание с кольцевым крылом для учителей. Ссылка.') },
    { label: 'Prandtl, L. (1924). Induced drag of multiplanes. NACA TN 182', url: 'https://ntrs.nasa.gov/citations/19930080964', note: w('Closed and box wings and induced drag. Public NASA record.', 'Alas cerradas y en caja, y la resistencia inducida. Registro público de la NASA.', 'Замкнутые и коробчатые крылья и индуктивное сопротивление. Открытый архив NASA.') },
    { label: 'Wagner (2021). Theoretical and experimental investigation into the flight of an X-Zylo. arXiv:2102.02647', url: 'https://arxiv.org/abs/2102.02647', note: w('A spinning ring wing, modelled and tested. CC BY 4.0.', 'Un ala en anillo que gira, modelada y probada. CC BY 4.0.', 'Вращающееся кольцевое крыло: модель и опыты. CC BY 4.0.') },
  ],
}
