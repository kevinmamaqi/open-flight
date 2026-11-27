import { objectPalettes, objectDrawing, coloredPacket } from './appearance.js?v=71e84a390ddb'
import { tandem } from './tandem.js?v=71e84a390ddb'
import { linkedFlyers } from './references.js?v=71e84a390ddb'
// Open Flight's original field cards. All paths are relative to the workshop root.
const ringSource = 'https://www.jpl.nasa.gov/edu/resources/project/make-a-paper-glider/'
const seedSource = 'https://www.grc.nasa.gov/www/k-12/TRC/Aeronautics/Maple_Seed.html'

export const objects = [
  {
    id: 'ring', revision: 'ring-1', motion: 'annular-glide', sheet: 'whole-rectangle', page: 1,
    illustration: 'assets/objects/ring.svg', source: { label: 'NASA/JPL Education', url: ringSource },
    en: {
      title: 'Ring glider', verb: 'Glide', question: 'Can a loop of paper glide farther when you make the ring smaller?',
      materials: 'No printing needed: one plain A4 or US Letter sheet (write down which) and a ruler. A small piece of tape is optional.',
      steps: ['Lay the sheet sideways. Fold along the diagonal between opposite corners. The other two corners form two separate peaks.',
        'Fold the long folded edge over by about 13 mm, then once more by the same width. NASA/JPL folds it once; the second fold adds weight at the front.',
        'Bend that thick edge into a ring with the folded strip on the inside. Tuck one end into the fold of the other, or add a small piece of tape.',
        'Hold the ring at the bottom of the V between the peaks, two fingers inside and your thumb outside, rim forward. Reach your arm back, swing it up and let go gently beside your ear.'],
      test: 'Measure across the opening. Try five level tosses and mark the first landing of each. Tuck the ends a little farther in, measure again and repeat from the same spot.',
      physics: 'The folds put more paper in the front rim. The curved sheet forms a wing around an opening. Changing the overlap changes both diameter and seam stiffness.',
      measure: 'Opening (mm) / first landing (cm)', recovery: 'Dives: unroll one rim fold. Climbs and falls back: launch more gently. If the ends slip apart, tuck them deeper or tape them, the same way for both sets.',
    },
    es: {
      title: 'Planeador de anillo', verb: 'Planear', question: '¿Llegará más lejos si haces el anillo más pequeño?',
      materials: 'No hace falta imprimir: una hoja normal A4 o Carta (apunta cuál) y una regla. Un trocito de cinta adhesiva es opcional.',
      steps: ['Coloca la hoja en horizontal. Dóblala por la diagonal que une dos esquinas opuestas. Las otras dos esquinas forman dos picos separados.',
        'Dobla el borde largo doblado unos 13 mm y vuelve a doblarlo con el mismo ancho. NASA/JPL lo dobla una vez; el segundo pliegue añade peso delante.',
        'Curva el borde grueso en un anillo, con la franja doblada por dentro. Mete un extremo en el pliegue del otro o pon un trocito de cinta.',
        'Sujeta el anillo por el fondo de la V entre los picos, dos dedos dentro y el pulgar fuera, con el borde delante. Lleva el brazo atrás, súbelo y suéltalo con suavidad junto a la oreja.'],
      test: 'Mide el diámetro interior. Lanza cinco veces en horizontal y marca dónde toca el suelo por primera vez. Encaja un poco más los extremos, vuelve a medir y repite desde el mismo sitio.',
      physics: 'Los pliegues concentran papel en el borde delantero. La hoja curvada forma un ala alrededor de un hueco. Al solapar más los extremos cambian el diámetro y la rigidez de la unión.',
      measure: 'Diámetro (mm) / primer contacto (cm)', recovery: 'Si cae en picado, desenrolla un pliegue del borde. Si sube y cae hacia atrás, lánzalo más suave. Si se abre, encaja más los extremos o usa cinta, igual en las dos tandas.',
    },
    ru: {
      title: 'Кольцеплан', verb: 'Планирование', question: 'Полетит ли кольцо дальше, если сделать его чуть меньше?',
      materials: 'Печатать не нужно: чистый лист A4 или US Letter (запишите, какой) и линейка. Кусочек скотча по желанию.',
      steps: ['Положи лист горизонтально. Сложи его по диагонали между двумя противоположными углами. Два других угла станут отдельными вершинами.',
        'Загните длинный сгиб примерно на 13 мм, затем ещё раз на ту же ширину. У NASA/JPL сгиб один; второй утяжеляет перёд.',
        'Сверните плотный край в кольцо, загнутой полоской внутрь. Вставьте один конец в сгиб другого или подклейте кусочком скотча.',
        'Возьмите кольцо за дно V между вершинами: два пальца внутри, большой снаружи, обод впереди. Отведите руку назад, поднимите её и мягко отпустите кольцо у уха.'],
      test: 'Измерь внутренний диаметр. Пять раз брось кольцо горизонтально и отметь место первого касания пола. Вставь конец чуть глубже, снова измерь диаметр и повтори с того же места.',
      physics: 'В переднем ободе несколько слоёв бумаги. Изогнутый лист образует крыло вокруг отверстия. Чем глубже заходит конец, тем меньше диаметр и тем жёстче стык.',
      measure: 'Диаметр (мм) / до первого касания (см)', recovery: 'Пикирует: разверните один сгиб обода. Взмывает и падает назад: запускайте мягче. Раскрывается: вставьте конец глубже или подклейте, одинаково для обеих серий.',
    },
  }, {
    id: 'samara', revision: 'samara-1', motion: 'autorotation', sheet: 'cut-and-clip', page: 2,
    illustration: 'assets/objects/samara.svg', source: { label: 'Gregory Vogt · NASA Glenn', url: seedSource },
    en: {
      title: 'Maple spinner', verb: 'Spin', question: 'Can you make one paper wing spin just by letting it fall?',
      materials: 'The maple wing template, scissors and one small metal paper clip. A helper can cut the outline.',
      steps: ['Cut along the solid line around the printed wing. Keep the wing and its rounded root in one piece.',
        'Slide the clip onto the short edge at dot A. Its long side should lie flat on the paper.',
        'With the printed side up, lift the dotted long edge slightly with your fingers to give the wing a shallow curl.',
        'A tall helper holds the wing tip as high as they can, about 2 m and never lower than 1.5 m, clip pointing down, and opens their fingers. Watch for complete turns.'],
      test: 'Drop five times from the same height. Count full turns, including zero. Move the same clip to B and repeat. Keep the curl and release the same.',
      physics: 'The clip shifts the balance toward the root. As the wing falls, air pushes on its curved surface and makes it spin around its balance point, near the clip, tracing a cone.',
      measure: 'Clip position / full turns', recovery: 'If it falls straight, try a little more curl. Start both sets again with that curl.',
    },
    es: {
      title: 'Semilla giratoria', verb: 'Girar', question: '¿Puedes hacer girar un ala de papel con solo dejarla caer?',
      materials: 'La plantilla del ala de arce, tijeras y un clip metálico pequeño. Pide ayuda para recortar el contorno.',
      steps: ['Recorta el ala por la línea continua. El ala y su base redondeada deben quedar en una sola pieza.',
        'Coloca el clip en el borde corto, a la altura del punto A. Su lado largo debe quedar plano sobre el papel.',
        'Con la cara impresa hacia arriba, levanta un poco con los dedos el borde largo marcado con puntos para curvar el ala.',
        'Una persona alta sujeta la punta del ala lo más alto que pueda, a unos 2 m y nunca por debajo de 1,5 m, con el clip hacia abajo, y abre la mano. Cuenta las vueltas completas.'],
      test: 'Haz cinco caídas desde la misma altura. Cuenta las vueltas completas, incluso si son cero. Mueve el mismo clip a B y repite con la misma curva y desde la misma posición.',
      physics: 'El clip desplaza el punto de equilibrio hacia la base. Al caer, el aire empuja el ala curvada y puede hacer que gire alrededor del extremo más pesado.',
      measure: 'Posición del clip / vueltas completas', recovery: 'Si cae sin girar, curva un poco más el ala. Vuelve a empezar las dos series con esa curva.',
    },
    ru: {
      title: 'Кленовая крылатка', verb: 'Вращение', question: 'Закрутится ли бумажное крыло, если просто разжать пальцы?',
      materials: 'Шаблон крылатки, ножницы и одна небольшая металлическая скрепка. Вырезать удобнее вдвоём.',
      steps: ['Вырежи крыло по сплошной линии. Крыло и закруглённое основание должны остаться одной деталью.',
        'Надень скрепку на короткий край у точки A. Её длинная сторона должна плотно прилегать к бумаге.',
        'Поверни деталь рисунком вверх. Приподними пальцами длинный край, отмеченный точками, чтобы крыло слегка изогнулось.',
        'Помощник повыше держит кончик крыла как можно выше, около 2 м и не ниже 1,5 м, скрепкой вниз, и разжимает пальцы. Считайте полные обороты.'],
      test: 'Пять раз отпусти крыло с одной высоты. Запиши число полных оборотов, даже если их ноль. Переставь ту же скрепку на B и повтори с тем же изгибом и из того же положения.',
      physics: 'Скрепка смещает точку равновесия к основанию. При падении воздух давит на изогнутое крыло, и оно может закрутиться вокруг тяжёлого конца.',
      measure: 'Метка скрепки / полные обороты', recovery: 'Если крыло падает прямо, изогни его чуть сильнее. С новым изгибом начни обе серии заново.',
    },
  },
  tandem,
]

export const objectLocales = ['en', 'es', 'ru']
export const objectPapers = ['A4', 'US_LETTER']
export function packetPath(paper, locale) {
  if (!objectPapers.includes(paper) || !objectLocales.includes(locale)) throw new RangeError('Unknown paper or language')
  return 'assets/objects/flight-lab-' + paper + '-' + locale + '.pdf'
}

export function flightObjects(locale = 'en') {
  if (!objectLocales.includes(locale)) throw new RangeError('Unknown language')
  return {
    locale, edition: 'flight-objects-1', evidence: 'untested_open_flight_builds',
    packets: Object.fromEntries(objectPapers.map(paper => [paper, packetPath(paper, locale)])),
    activities: objects.map(({ en, es, ru, ...identity }) => ({ ...identity, ...{ en, es, ru }[locale],
      appearances: Object.keys(objectPalettes[identity.id]).map(id=>({id, colors:objectPalettes[identity.id][id],
        drawing:objectDrawing(identity.id,id), packets:Object.fromEntries(objectPapers.map(paper=>[paper,coloredPacket(packetPath(paper,locale),id)]))})) })),
    references: linkedFlyers(locale),
  }
}
