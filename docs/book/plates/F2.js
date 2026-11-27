// Plate F2, Maple spinner (after Gregory Vogt's NASA Glenn activity). Spanish and Russian
// need a native read.
import { objectData } from '../figures/object-data.js?v=71e84a390ddb'

const w = (en, es, ru) => ({ en, es, ru })
const s = objectData.samara
const len = Math.round(s.length_mm), axis = Math.round(s.balance.A.from_root_mm)

export default {
  id: 'F2', model: 'samara',
  glance: [
    { label: w('Wing', 'Ala', 'Крыло'), value: w(`${len} mm, cut from the sheet`, `${len} mm, recortada de la hoja`, `${len} мм, вырезается из листа`), state: null },
    { label: w('Clip', 'Clip', 'Скрепка'), value: w('One small metal clip, at A or B', 'Un clip metálico pequeño, en A o en B', 'Одна маленькая металлическая скрепка, на A или B'), state: null },
    { label: w('Drop height', 'Altura de caída', 'Высота'), value: w('At least 1.5 m; a tall helper with an arm raised, about 2 m', 'Al menos 1,5 m; una persona alta con el brazo en alto, unos 2 m', 'Не меньше 1,5 м; помощник повыше с поднятой рукой, около 2 м'), state: null },
    { label: w('Spins around', 'Gira alrededor de', 'Вращается вокруг'), value: w(`a point about ${axis} mm from the root`, `un punto a unos ${axis} mm de la base`, `точки примерно в ${axis} мм от основания`), state: 'estimate' },
    { label: w('Turns per drop', 'Vueltas por caída', 'Оборотов за падение'), value: w('Count them: no record yet', 'Cuéntalas: aún sin registro', 'Посчитайте: записей пока нет'), state: 'not-yet-measured' },
  ],
  howItFlies: {
    en: { lead: 'A maple seed is one wing with a heavy seed at its root. Your clip is the seed. Let go, and the wing starts to spin like a helicopter blade.',
      body: ['When you let go, the heavy end leads and the wing tilts. Air pushing on the tilted, curled wing makes it turn.',
        'Once it turns, the whole wing sweeps through the air like a helicopter blade, and the air pushes up on it. That push slows the fall. It spins around its balance point, close to the clip, and the wing rises a little toward the tip, tracing a cone.',
        'Drop it from at least 1.5 m. From lower, it may land before it starts to spin.'],
      grownUps: [`Each section of the wing meets air that combines its circular motion with the upward flow of the fall. Over much of the span the resulting force tilts forward and drives the rotation, while drag near the root resists it. Steady autorotation, a spin that the falling air itself keeps going, balances the two, and the vertical force balances the weight. NASA Glenn's activity explains that the seed's centre of mass sits near one end while its centre of lift is near the middle, and that the rotation traces a cone around the axis of fall.`,
        'Lentink and colleagues (2009) showed a stable leading-edge vortex on spinning maple seeds, which raises their lift. Schaeffer and colleagues (2024) found that descent speed follows a simple drag balance on the wing area seen from below, and that samaras keep autorotating after losing up to 40% of their wing area, with descent speed changing by less than 15% when their mass more than doubles.',
        `Clip stations A and B sit ${s.stations_mm.A.toFixed(1)} and ${s.stations_mm.B.toFixed(1)} mm from the front edge across the ${s.root_chord_mm.toFixed(1)} mm root, so moving the clip shifts the balance across the chord. With a 0.3 g clip on 80 g/m² paper, our estimate puts the balance about ${axis} mm from the root. These are estimates from the printed shape.`] },
    es: { lead: 'Una semilla de arce es un ala con una semilla pesada en la base. Tu clip es la semilla. Suéltala y el ala empieza a girar como la pala de un helicóptero.',
      body: ['Al soltarla, el extremo pesado va delante y el ala se inclina. El aire empuja el ala inclinada y curvada, y la hace girar.',
        'Cuando gira, toda el ala barre el aire como la pala de un helicóptero, y el aire la empuja hacia arriba. Ese empuje frena la caída. Gira alrededor de su punto de equilibrio, cerca del clip, y el ala sube un poco hacia la punta, dibujando un cono.',
        'Suéltala desde 1,5 m como mínimo. Desde más abajo, puede tocar el suelo antes de empezar a girar.'],
      grownUps: ['Cada sección del ala recibe un aire que combina su movimiento circular con el flujo hacia arriba de la caída. En gran parte del ala, la fuerza resultante se inclina hacia delante e impulsa el giro, mientras que la resistencia cerca de la base lo frena. En la autorrotación estable, un giro que mantiene el propio aire de la caída, ambas se equilibran, y la fuerza vertical equilibra el peso. La actividad de la NASA Glenn explica que el centro de masas de la semilla está cerca de un extremo y su centro de sustentación cerca del medio, y que el giro dibuja un cono alrededor del eje de caída.',
        'Lentink y su equipo (2009) mostraron un vórtice estable en el borde delantero de las semillas de arce que aumenta su sustentación. Schaeffer y su equipo (2024) vieron que la velocidad de caída sigue un sencillo equilibrio de resistencia sobre el área del ala vista desde abajo, y que las sámaras siguen girando aunque pierdan hasta el 40 % de su ala, con cambios de velocidad de caída menores del 15 % cuando su masa se duplica con creces.',
        `Los puntos A y B están a ${s.stations_mm.A.toFixed(1).replace('.', ',')} y ${s.stations_mm.B.toFixed(1).replace('.', ',')} mm del borde delantero, en una base de ${s.root_chord_mm.toFixed(1).replace('.', ',')} mm, así que mover el clip desplaza el equilibrio a lo ancho del ala. Con un clip de 0,3 g en papel de 80 g/m², estimamos el equilibrio a unos ${axis} mm de la base. Son estimaciones a partir de la forma impresa.`] },
    ru: { lead: 'Крылатка клёна — это одно крыло с тяжёлым семенем у основания. Ваша скрепка — это семя. Отпустите её, и крыло закрутится, как лопасть вертолёта.',
      body: ['Когда вы её отпускаете, тяжёлый конец идёт вниз первым, и крыло наклоняется. Воздух давит на наклонённое изогнутое крыло и закручивает его.',
        'Когда крыло вращается, оно целиком загребает воздух, как лопасть вертолёта, и воздух толкает его вверх. Этот толчок замедляет падение. Крылатка вращается вокруг своей точки равновесия рядом со скрепкой, а крыло немного поднимается к кончику и описывает конус.',
        'Отпускайте её с высоты не меньше 1,5 м. Если ниже, она может упасть, не успев закрутиться.'],
      grownUps: ['Каждое сечение крыла встречает воздух, в котором складываются его круговое движение и поток снизу от падения. На большей части крыла результирующая сила наклонена вперёд и поддерживает вращение, а сопротивление у основания его тормозит. При установившейся авторотации — вращении, которое поддерживает сам воздух при падении, — они уравновешены, а вертикальная сила уравновешивает вес. В задании NASA Glenn объясняется, что центр масс семени смещён к одному концу, центр подъёмной силы находится примерно посередине, а вращение описывает конус вокруг оси падения.',
        'Лентинк с коллегами (2009) показали устойчивый вихрь у передней кромки вращающихся крылаток клёна, который увеличивает их подъёмную силу. Шеффер с коллегами (2024) обнаружили, что скорость снижения подчиняется простому балансу сопротивления по площади крыла, видимой снизу, и что крылатки продолжают вращаться, даже потеряв до 40 % площади крыла, а скорость снижения меняется меньше чем на 15 %, когда масса увеличивается более чем вдвое.',
        `Метки A и B находятся в ${s.stations_mm.A.toFixed(1).replace('.', ',')} и ${s.stations_mm.B.toFixed(1).replace('.', ',')} мм от передней кромки на основании шириной ${s.root_chord_mm.toFixed(1).replace('.', ',')} мм, поэтому скрепка смещает равновесие поперёк крыла. Со скрепкой 0,3 г на бумаге 80 г/м² по нашей оценке точка равновесия примерно в ${axis} мм от основания. Это оценки по печатной форме.`] },
  },
  why: {
    en: { title: 'A seed that travels',
      body: ['Maples, sycamores and ash trees make winged seeds called samaras. A maple seed spins as it falls, so it falls slowly and the wind can carry it away from its parent tree.',
        'Scientists found a small whirl of air along the front edge of the spinning wing. It raises the lift, as similar whirls do for hovering insects. Real samaras keep spinning even after losing up to about 40% of their wing area.'],
      borrows: 'Our spinner borrows the heavy root and the single curved wing of a maple key.' },
    es: { title: 'Una semilla que viaja',
      body: ['Los arces, los sicomoros y los fresnos tienen semillas con alas llamadas sámaras. La semilla de arce gira al caer, así que cae despacio y el viento puede alejarla del árbol.',
        'Los científicos encontraron un pequeño remolino de aire a lo largo del borde delantero del ala que gira. Aumenta la sustentación, como hacen remolinos parecidos en los insectos que vuelan quietos en el aire. Las sámaras reales siguen girando aunque pierdan hasta un 40 % de su ala.'],
      borrows: 'Nuestra semilla giratoria toma prestadas la base pesada y el ala curvada de la sámara del arce.' },
    ru: { title: 'Семя-путешественник',
      body: ['У клёнов, платанов и ясеней есть крылатые семена — крылатки. Крылатка клёна вращается при падении, поэтому падает медленно, и ветер может унести её далеко от дерева.',
        'Учёные нашли маленький воздушный вихрь вдоль передней кромки вращающегося крыла. Он увеличивает подъёмную силу, как похожие вихри у насекомых, зависающих в воздухе. Настоящие крылатки продолжают вращаться, даже потеряв до 40 % площади крыла.'],
      borrows: 'Наша вертушка позаимствовала у кленовой крылатки тяжёлое основание и одно изогнутое крыло.' },
  },
  tryThis: {
    en: { question: 'Where should the clip go?', prediction: 'Which clip position spins more often: A, nearer the front edge, or B, nearer the curled back edge? A wing balanced toward its front edge is usually steadier, so our guess is A.',
      steps: ['Curl the dotted edge the same way for every drop.', 'Clip at A. A tall helper drops it five times from the same height, at least 1.5 m.', 'Move the same clip to B and drop five more times.', 'Count full turns each time, including zero.'],
      lookFor: 'Which position gives more turns and a slower fall, and whether one of them tumbles.' },
    es: { question: '¿Dónde va mejor el clip?', prediction: '¿En qué posición gira más: A, más cerca del borde delantero, o B, más cerca del borde trasero curvado? Un ala equilibrada hacia su borde delantero suele ser más estable, así que apostamos por A.',
      steps: ['Curva el borde punteado igual en cada caída.', 'Clip en A. Una persona alta la suelta cinco veces desde la misma altura, 1,5 m como mínimo.', 'Pasa el mismo clip a B y suéltala cinco veces más.', 'Cuenta las vueltas completas cada vez, también si son cero.'],
      lookFor: 'Qué posición da más vueltas y una caída más lenta, y si alguna da tumbos.' },
    ru: { question: 'Куда лучше надеть скрепку?', prediction: 'Где крылатка сделает больше оборотов: со скрепкой на A, ближе к передней кромке, или на B, ближе к изогнутой задней? Крыло, уравновешенное ближе к передней кромке, обычно устойчивее, поэтому мы ставим на A.',
      steps: ['Изгибайте край по пунктиру одинаково перед каждым падением.', 'Скрепка на A. Помощник повыше пять раз отпускает крылатку с одной высоты, не меньше 1,5 м.', 'Переставьте ту же скрепку на B и отпустите ещё пять раз.', 'Каждый раз считайте полные обороты, даже если их ноль.'],
      lookFor: 'Где больше оборотов и медленнее падение и не кувыркается ли крылатка в одном из положений.' },
  },
  references: [
    { label: 'Vogt, G. (Oklahoma State University, Aerospace Education Services Project), ed. R. Storm, NASA Glenn: “Maple Seed” Helicopters', url: 'https://www.grc.nasa.gov/www/k-12/TRC/Aeronautics/Maple_Seed.html', note: w('The original activity, the 5 ft (1.5 m) drop and the cone. Open Flight drew a new outline. Linked.', 'La actividad original, la caída de 5 pies (1,5 m) y el cono. Open Flight dibujó un contorno nuevo. Enlazado.', 'Исходное задание, высота 5 футов (1,5 м) и конус. Open Flight нарисовал новый контур. Ссылка.') },
    { label: 'Lentink, D., Dickson, W. B., van Leeuwen, J. L. & Dickinson, M. H. (2009). Leading-edge vortices elevate lift of autorotating plant seeds. Science 324: 1438–1440', url: 'https://doi.org/10.1126/science.1174196', note: w('The leading-edge vortex on maple seeds. Cited only; no figures reused.', 'El vórtice del borde delantero en semillas de arce. Solo citado; sin reutilizar figuras.', 'Вихрь у передней кромки крылаток. Только цитата, без рисунков.') },
    { label: 'Schaeffer, B. M., Truman, S. S., Truscott, T. T. & Dickerson, A. K. (2024). Maple samara flight is robust to morphological perturbation and united by a classic drag model. Commun. Biol. 7: 248', url: 'https://doi.org/10.1038/s42003-024-05913-3', note: w('Robustness and the drag model; Fig. 2 may be reused with credit. CC BY 4.0.', 'Robustez y modelo de resistencia; la fig. 2 se puede reutilizar con crédito. CC BY 4.0.', 'Устойчивость и модель сопротивления; рис. 2 можно использовать с указанием авторов. CC BY 4.0.') },
    { label: 'Acer rubrum seed keys, Dcrjsr (2012), Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Acer_rubrum_seed_keys.jpg', note: w('The seed photo on this page. CC BY 3.0; resized.', 'La foto de semillas de esta página. CC BY 3.0; reducida.', 'Фото семян на этой странице. CC BY 3.0, уменьшено.') },
  ],
}
