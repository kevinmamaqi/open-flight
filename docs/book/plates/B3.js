// Plate B3, Old World swallowtail. Spanish uses «macaón» throughout. Spanish and Russian
// need a native read before release.
import { butterflyData } from '../figures/butterfly-data.js?v=48cc97ad30d5'
import { butterflyFlight, butterflyGlance, butterflyReferences, w } from './B-shared.js?v=48cc97ad30d5'

const ar = model => butterflyData[model].aspect_ratio.toFixed(1)
const arEs = model => ar(model).replace('.', ',')
const flight = butterflyFlight('swallowtail')
const extra = w(
  `Aspect ratio, a measure of how long and slim a wing is, is span squared divided by wing area. The model gives ${ar('swallowtail')} here, against ${ar('monarch')} for the monarch and ${ar('morpho')} for the morpho. A higher aspect ratio means less induced drag, the drag from the swirls at the wingtips, for the same lift. At these low speeds and sizes, friction drag from air rubbing on the paper is also large, so the advantage may be small. Compare the three on the same paper.`,
  `El alargamiento, una medida de lo larga y estrecha que es un ala, es la envergadura al cuadrado dividida por el área del ala. El modelo da ${arEs('swallowtail')} aquí, frente a ${arEs('monarch')} en la monarca y ${arEs('morpho')} en el morfo. Más alargamiento significa menos resistencia inducida, la que causan los remolinos de las puntas, para la misma sustentación. A estas velocidades y tamaños, el rozamiento del aire con el papel también pesa mucho, así que la ventaja puede ser pequeña. Compara las tres en el mismo papel.`,
  `Удлинение — мера того, насколько крыло длинное и узкое: квадрат размаха, делённый на площадь крыла. Модель даёт здесь ${arEs('swallowtail')}, против ${arEs('monarch')} у монарха и ${arEs('morpho')} у морфо. Чем больше удлинение, тем меньше индуктивное сопротивление — от вихрей на концах крыла — при той же подъёмной силе. Но при таких скоростях и размерах велико и трение воздуха о бумагу, так что выигрыш может быть небольшим. Сравните все три модели на одной бумаге.`,
)
for (const lang of ['en', 'es', 'ru']) flight[lang].grownUps.push(extra[lang])

export default {
  id: 'B3', model: 'swallowtail',
  glance: butterflyGlance('swallowtail'),
  howItFlies: flight,
  why: {
    en: { title: 'A short tail on each hindwing',
      body: ['The Old World swallowtail lives across much of temperate Europe and Asia, and in parts of North Africa and North America. Its caterpillars eat plants of the carrot family, such as wild angelica.',
        'Look for the short tail on each hindwing, the blue marks beside it and the red spot near the body.'],
      borrows: 'Our paper swallowtail has the most slender wings of the three. Slender wings usually glide flatter.' },
    es: { title: 'Una cola corta en cada ala trasera',
      body: ['El macaón vive en gran parte de la Europa y la Asia templadas, y en zonas del norte de África y de Norteamérica. Sus orugas comen plantas de la familia de la zanahoria, como la angélica silvestre.',
        'Busca la cola corta de cada ala trasera, las manchas azules a su lado y la mancha roja cerca del cuerpo.'],
      borrows: 'Nuestro macaón de papel tiene las alas más esbeltas de los tres. Las alas esbeltas suelen planear más tendido.' },
    ru: { title: 'Короткий хвостик на каждом заднем крыле',
      body: ['Махаон живёт на большей части умеренной Европы и Азии, а также в некоторых районах Северной Африки и Северной Америки. Его гусеницы едят зонтичные растения, например дудник.',
        'Найдите короткий хвостик на каждом заднем крыле, синие пятна рядом с ним и красное пятно у тела.'],
      borrows: 'У нашего бумажного махаона самые узкие крылья из трёх. Узкие крылья обычно планируют более полого.' },
  },
  tryThis: {
    en: { question: 'Can one tab steer it?', prediction: 'Which way will it turn when only the left tab is bent up? Bending a tab up takes a little lift off that side, so our guess is left.',
      steps: ['Start with both tabs flat and launch five times from the same spot.', 'Bend only the left tab up 2 mm.', 'Launch five more times with the same push.', 'Mark where each one lands.'],
      lookFor: 'Whether the second set of marks moves to one side, and which side.' },
    es: { question: '¿Puede una sola aleta hacerla girar?', prediction: '¿Hacia dónde girará con solo la aleta izquierda doblada hacia arriba? Al subir una aleta, ese lado pierde un poco de sustentación, así que apostamos por la izquierda.',
      steps: ['Empieza con las dos aletas planas y lánzalo cinco veces desde el mismo sitio.', 'Dobla solo la aleta izquierda 2 mm hacia arriba.', 'Lánzalo cinco veces más con el mismo empujón.', 'Marca dónde cae cada vez.'],
      lookFor: 'Si el segundo grupo de marcas se desplaza hacia un lado, y hacia cuál.' },
    ru: { question: 'Можно ли рулить одним язычком?', prediction: 'Куда повернёт модель, если отогнуть вверх только левый язычок? Отогнутый язычок немного уменьшает подъёмную силу на своей стороне, поэтому мы ставим на поворот влево.',
      steps: ['Начните с ровных язычков и запустите пять раз с одного места.', 'Отогните вверх только левый язычок на 2 мм.', 'Ещё пять запусков тем же толчком.', 'Отмечайте, куда приземляется модель.'],
      lookFor: 'Сместилась ли вторая группа отметок в сторону и в какую.' },
  },
  references: [
    { label: 'Kizhi Museum Reserve, Swallowtail', url: 'https://site.kizhi.karelia.ru/nature/babochki/74', note: w('A documented population in Karelia. Linked and paraphrased.', 'Una población registrada en Carelia. Enlazado y parafraseado.', 'Наблюдения в Карелии. Ссылка и пересказ.') },
    ...butterflyReferences,
  ],
}
