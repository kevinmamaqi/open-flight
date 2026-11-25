import { tandem } from './tandem.js?v=b1a9665ab855'
import { linkedFlyers } from './references.js?v=b1a9665ab855'
// Open Flight's original field cards. All paths are relative to the workshop root.
const ringSource = 'https://www.jpl.nasa.gov/edu/resources/project/make-a-paper-glider/'
const seedSource = 'https://www.grc.nasa.gov/www/k-12/TRC/Aeronautics/Maple_Seed.html'

export const objects = [
  {
    id: 'ring', revision: 'ring-1', motion: 'annular-glide', sheet: 'whole-rectangle', page: 1,
    illustration: 'assets/objects/ring.svg', source: { label: 'NASA/JPL Education', url: ringSource },
    en: {
      title: 'Ring glider', verb: 'Glide', question: 'Can a loop of paper glide farther when you make the ring smaller?',
      materials: 'One plain sheet, a ruler and room for a gentle toss. Start with US Letter. A4 is a second shape to try.',
      steps: ['Lay the sheet sideways. Fold along the diagonal between opposite corners. The other two corners form two separate peaks.',
        'Keep the long folded edge near you. Fold a strip about 13 mm wide up over it. Roll it up once more by the same width.',
        'Bend that thick edge into a circle. Slip one end inside the folded pocket at the other end. Look through the open ring.',
        'Pinch the dip between the peaks. Point the thick rim forward and give the glider a gentle, level toss.'],
      test: 'Measure across the opening. Try five level tosses and mark the first landing of each. Tuck the ends a little farther in, measure again and repeat from the same spot.',
      physics: 'The folds put more paper in the front rim. The curved sheet forms a wing around an opening. Changing the overlap changes both diameter and seam stiffness.',
      measure: 'Opening (mm) / first landing (cm)', recovery: 'If the ends slip apart, tuck them deeper. Keep the same fastening for both sets.',
    },
    es: {
      title: 'Planeador de anillo', verb: 'Planear', question: '¿Llegará más lejos si haces el anillo más pequeño?',
      materials: 'Una hoja en blanco, una regla y espacio para lanzar con suavidad. Empieza con papel Carta. También puedes probar con A4.',
      steps: ['Coloca la hoja en horizontal. Dóblala por la diagonal que une dos esquinas opuestas. Las otras dos esquinas forman dos picos separados.',
        'Acerca el borde largo doblado. Dobla una franja de unos 13 mm hacia arriba. Vuelve a doblarla con el mismo ancho.',
        'Curva el borde grueso hasta formar un círculo. Mete un extremo en el bolsillo del otro. Mira a través del anillo.',
        'Sujeta el hueco entre los dos picos. Orienta el borde grueso hacia delante y lanza con suavidad, en horizontal.'],
      test: 'Mide el diámetro interior. Lanza cinco veces en horizontal y marca dónde toca el suelo por primera vez. Encaja un poco más los extremos, vuelve a medir y repite desde el mismo sitio.',
      physics: 'Los pliegues concentran papel en el borde delantero. La hoja curvada forma un ala alrededor de un hueco. Al solapar más los extremos cambian el diámetro y la rigidez de la unión.',
      measure: 'Diámetro (mm) / primer contacto (cm)', recovery: 'Si el anillo se abre, encaja más los extremos. Usa la misma sujeción en las dos tandas.',
    },
    ru: {
      title: 'Кольцеплан', verb: 'Планирование', question: 'Полетит ли кольцо дальше, если сделать его чуть меньше?',
      materials: 'Чистый лист, линейка и место для лёгкого броска. Начни с формата US Letter. Для второго опыта подойдёт A4.',
      steps: ['Положи лист горизонтально. Сложи его по диагонали между двумя противоположными углами. Два других угла станут отдельными вершинами.',
        'Поверни длинный сгиб к себе. Заверни вверх полоску шириной около 13 мм. Загни её ещё раз на ту же ширину.',
        'Сверни плотный край в кольцо. Вставь один конец в кармашек на другом. Проверь, что сквозь кольцо видно.',
        'Возьмись за выемку между вершинами. Направь плотный обод вперёд и легко брось кольцо горизонтально.'],
      test: 'Измерь внутренний диаметр. Пять раз брось кольцо горизонтально и отметь место первого касания пола. Вставь конец чуть глубже, снова измерь диаметр и повтори с того же места.',
      physics: 'В переднем ободе несколько слоёв бумаги. Изогнутый лист образует крыло вокруг отверстия. Чем глубже заходит конец, тем меньше диаметр и тем жёстче стык.',
      measure: 'Диаметр (мм) / до первого касания (см)', recovery: 'Если кольцо раскрылось, вставь конец глубже. Для обеих серий закрепляй концы одинаково.',
    },
  }, {
    id: 'samara', revision: 'samara-1', motion: 'autorotation', sheet: 'cut-and-clip', page: 2,
    illustration: 'assets/objects/samara.svg', source: { label: 'Gregory Vogt · NASA Glenn', url: seedSource },
    en: {
      title: 'Maple spinner', verb: 'Spin', question: 'Can you make one paper wing spin just by letting it fall?',
      materials: 'The printed wing on page 2, scissors and one small metal paper clip. A helper can cut the outline.',
      steps: ['Cut around the solid outline on page 2. Keep the wing and its rounded root in one piece.',
        'Slide the clip onto the short edge at dot A. Its long side should lie flat on the paper.',
        'With the printed side up, lift the dotted long edge slightly with your fingers to give the wing a shallow curl.',
        'Hold the wing at shoulder height with the clip pointing down. Open your fingers. Watch from above for a complete turn.'],
      test: 'Drop five times from the same height. Count full turns, including zero. Move the same clip to B and repeat. Keep the curl and release the same.',
      physics: 'The clip shifts the balance toward the root. As the wing falls, air pushes on its curved surface and can make it turn around the heavy end.',
      measure: 'Clip position / full turns', recovery: 'If it falls straight, try a little more curl. Start both sets again with that curl.',
    },
    es: {
      title: 'Semilla giratoria', verb: 'Girar', question: '¿Puedes hacer girar un ala de papel con solo dejarla caer?',
      materials: 'El ala de la página 2, tijeras y un clip metálico pequeño. Pide ayuda para recortar el contorno.',
      steps: ['Recorta el contorno continuo de la página 2. El ala y su base redondeada deben quedar en una sola pieza.',
        'Coloca el clip en el borde corto, a la altura del punto A. Su lado largo debe quedar plano sobre el papel.',
        'Con la cara impresa hacia arriba, levanta un poco con los dedos el borde largo marcado con puntos para curvar el ala.',
        'Sujeta el ala a la altura del hombro con el clip hacia abajo. Abre la mano. Mira desde arriba si da una vuelta completa.'],
      test: 'Haz cinco caídas desde la misma altura. Cuenta las vueltas completas, incluso si son cero. Mueve el mismo clip a B y repite con la misma curva y desde la misma posición.',
      physics: 'El clip desplaza el punto de equilibrio hacia la base. Al caer, el aire empuja el ala curvada y puede hacer que gire alrededor del extremo más pesado.',
      measure: 'Posición del clip / vueltas completas', recovery: 'Si cae sin girar, curva un poco más el ala. Vuelve a empezar las dos series con esa curva.',
    },
    ru: {
      title: 'Кленовая крылатка', verb: 'Вращение', question: 'Закрутится ли бумажное крыло, если просто разжать пальцы?',
      materials: 'Крыло со страницы 2, ножницы и одна небольшая металлическая скрепка. Попроси взрослого помочь с вырезанием.',
      steps: ['Вырежи крыло по сплошному контуру на странице 2. Крыло и закруглённое основание должны остаться одной деталью.',
        'Надень скрепку на короткий край у точки A. Её длинная сторона должна плотно прилегать к бумаге.',
        'Поверни деталь рисунком вверх. Приподними пальцами длинный край, отмеченный точками, чтобы крыло слегка изогнулось.',
        'Держи крыло на высоте плеча скрепкой вниз. Разожми пальцы. Посмотри сверху, успеет ли крыло сделать полный оборот.'],
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
    activities: objects.map(({ en, es, ru, ...identity }) => ({ ...identity, ...{ en, es, ru }[locale] })),
    references: linkedFlyers(locale),
  }
}
