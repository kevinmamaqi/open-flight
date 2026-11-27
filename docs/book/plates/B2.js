// Plate B2, Blue morpho. Spanish and Russian need a native read before release.
import { butterflyFlight, butterflyGlance, butterflyReferences, w } from './B-shared.js?v=60abccfc0f99'

export default {
  id: 'B2', model: 'morpho',
  glance: butterflyGlance('morpho'),
  howItFlies: butterflyFlight('morpho'),
  why: {
    en: { title: 'A blue that is not paint',
      body: ['The blue of a morpho is not pigment. Tiny ridges on each wing scale reflect blue light, so the wings flash as they turn. Underneath, the wings are brown with eyespots, so a resting morpho almost disappears.',
        'Scientists who filmed Morpho butterflies found that species living high in the forest canopy glide more efficiently, while species near the forest floor flap harder and fly fast and twisting. Adult morphos feed on fallen fruit.'],
      borrows: 'Our paper morpho has the broadest wings of the three and the steepest V.' },
    es: { title: 'Un azul que no es pintura',
      body: ['El azul del morfo no es un pigmento. Unas crestas diminutas en cada escama reflejan la luz azul, y por eso las alas destellan al girar. Por debajo, las alas son marrones con ocelos, así que un morfo en reposo casi desaparece.',
        'Unos científicos que filmaron mariposas Morpho vieron que las especies que viven en lo alto de la selva planean mejor, y que las que viven cerca del suelo aletean más fuerte y vuelan rápido y con giros. Los morfos adultos comen fruta caída.'],
      borrows: 'Nuestro morfo de papel tiene las alas más anchas de los tres y la V más marcada.' },
    ru: { title: 'Синий цвет без краски',
      body: ['Синий цвет морфо — не пигмент. Крошечные рёбрышки на каждой чешуйке отражают синий свет, поэтому крылья вспыхивают при повороте. Снизу крылья коричневые, с глазками, и сидящая морфо почти незаметна.',
        'Учёные, снимавшие бабочек Morpho, выяснили, что виды из верхнего яруса леса планируют экономнее, а виды у самой земли машут крыльями сильнее и летают быстро и вёртко. Взрослые морфо питаются упавшими плодами.'],
      borrows: 'У нашей бумажной морфо самые широкие крылья из трёх и самая крутая V.' },
  },
  tryThis: {
    en: { question: 'Does the V help it roll back to level?', prediction: 'Which setting rolls back to level after a tilted launch: flat wings, or the full V? Our guess is the V.',
      steps: ['Set the wings flat: tips level with the body.', 'Hold it with the left wing 10 mm lower than the right and launch gently. Do this five times.', 'Set the full V: tips 23 mm above the body, checked with the strip.', 'Launch five more times with the same tilt.'],
      lookFor: 'Whether each launch levels out or keeps turning, and which way it turns.' },
    es: { question: '¿La V la ayuda a volver a ponerse horizontal?', prediction: '¿Qué ajuste se endereza tras un lanzamiento inclinado: alas planas o la V completa? Nuestra apuesta es la V.',
      steps: ['Pon las alas planas: las puntas a la altura del cuerpo.', 'Sujétala con el ala izquierda 10 mm más baja que la derecha y lánzala con suavidad. Hazlo cinco veces.', 'Forma la V completa: puntas a 23 mm sobre el cuerpo, comprobadas con la tira.', 'Lanza cinco veces más con la misma inclinación.'],
      lookFor: 'Si cada vuelo se endereza o sigue girando, y hacia qué lado gira.' },
    ru: { question: 'Помогает ли V выровняться?', prediction: 'Какая настройка выравнивается после наклонного запуска: плоские крылья или полная V? Мы ставим на V.',
      steps: ['Сделайте крылья плоскими: кончики на уровне корпуса.', 'Держите модель так, чтобы левое крыло было на 10 мм ниже правого, и мягко запустите. Пять раз.', 'Сделайте полную V: кончики на 23 мм выше корпуса, проверьте полоской.', 'Ещё пять запусков с тем же наклоном.'],
      lookFor: 'Выравнивается ли модель в каждом полёте или продолжает поворачивать, и в какую сторону.' },
  },
  references: [
    { label: 'Natural History Museum, Spotlight: blue morpho', url: 'https://www.nhm.ac.uk/discover/spotlight-blue-morpho.html', note: w('Structural colour and the brown underside. Linked and paraphrased.', 'Color estructural y la cara inferior marrón. Enlazado y parafraseado.', 'Структурная окраска и коричневая нижняя сторона. Ссылка и пересказ.') },
    { label: 'Área de Conservación Guanacaste, Morpho peleides', url: 'https://www.acguanacaste.ac.cr/bosque_seco_virtual/bs_web_page/paginas_de_especies/morpho_peleides.html', note: w('Habitat and food. Linked and paraphrased.', 'Hábitat y alimento. Enlazado y parafraseado.', 'Места обитания и питание. Ссылка и пересказ.') },
    { label: 'Le Roy, C. et al. (2021). Adaptive evolution of flight in Morpho butterflies. Science 374: 1158–1162. doi:10.1126/science.abh2620', url: 'https://doi.org/10.1126/science.abh2620', note: w('Canopy species glide more efficiently; understory species flap harder. Cited only.', 'Las especies del dosel planean mejor; las del sotobosque aletean más. Solo citado.', 'Виды верхнего яруса планируют экономнее, нижнего — машут сильнее. Только цитата.') },
    ...butterflyReferences,
  ],
}
