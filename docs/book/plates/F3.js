// Plate F3, Williams tandem glider (Archibald Williams, Things To Make, 1918, Model B).
// Quotations are from the public-domain text. Spanish and Russian need a native read.
import { objectData } from '../figures/object-data.js?v=71e84a390ddb'

const w = (en, es, ru) => ({ en, es, ru })
const t = objectData.tandem
const np = [t.downwash.at(-1).neutral_point, t.downwash[0].neutral_point].map(Math.round)
const grams = [t.downwash[0].clip_g[0], t.downwash.at(-1).clip_g[1]]
const comma = v => String(v).replace('.', ',')
const cg = Math.round(t.balance_paper_only)

export default {
  id: 'F3', model: 'tandem',
  glance: [
    { label: w('Pattern', 'Patrón', 'Выкройка'), value: w(`${t.blank_length_mm} mm long; front wings 80 mm across`, `${t.blank_length_mm} mm de largo; alas delanteras de 80 mm`, `длина ${t.blank_length_mm} мм; передние крылья 80 мм`), state: null },
    { label: w('Paper', 'Papel', 'Бумага'), value: w('Ordinary 80 g/m² printer paper', 'Papel de impresora normal de 80 g/m²', 'Обычная бумага для принтера 80 г/м²'), state: null },
    { label: w('Clip', 'Clip', 'Скрепка'), value: w('One small paper clip on the keel, behind the nose', 'Un clip pequeño en la quilla, detrás del morro', 'Одна маленькая скрепка на киле за носом'), state: null },
    { label: w('Paper only', 'Solo papel', 'Без скрепки'), value: w('Probably tail-heavy', 'Probablemente con la cola pesada', 'Вероятно, тяжёлый хвост'), state: 'estimate' },
    { label: w('Clip needed', 'Clip necesario', 'Нужна скрепка'), value: w(`about ${grams[0]}–${grams[1]} g near the nose`, `unos ${comma(grams[0])}–${comma(grams[1])} g cerca del morro`, `около ${comma(grams[0])}–${comma(grams[1])} г у носа`), state: 'estimate' },
    { label: w('Recorded flights', 'Vuelos registrados', 'Записанные полёты'), value: w('None yet for our redraw', 'Ninguno aún de nuestro redibujo', 'Нашей перерисовки — пока нет'), state: 'not-yet-measured' },
  ],
  howItFlies: {
    en: { lead: 'This glider has two pairs of wings, one behind the other, on a folded keel. Both pairs lift, and the back wings work like a tail.',
      body: ['The back wings only work like a tail if the glider balances nearer the front wings. That is why you roll up the nose and add a small clip: they move the balance point forward.',
        'The front wings push air down as they lift, and the back wings fly in that air. Raising the four tips a little makes a V that helps the glider roll back to level.'],
      grownUps: [`With two wings, one behind the other, both help keep the glider steady, so the neutral point, the spot where extra lift acts when the nose tips up, lies between them. Measured from the end of the printed blank, a sum weighted by wing area puts it about ${np[1]} mm back. The front wing pushes air down onto the rear wing, and that moves the point forward, to roughly ${np[0]} mm. Balanced in front of that point, the glider can only fly while making lift if the front wing is tilted up a little more than the back one. Engineers call this decalage, or longitudinal dihedral. For his Model C, Williams wrote that “the front planes are given a somewhat steeper angle than the others”.`,
        `Our estimate for this printed sheet on 80 g/m² puts the paper-only balance point about ${cg} mm from the blank end, behind the neutral point: tail-heavy. About ${grams[0]}–${grams[1]} g of clip near the nose would move the balance point ahead of the neutral point, with a 10% margin. That is an estimate from the printed shape, not a measurement, but it matches Williams’s advice to slide “a metal clip along the keel until a good result is obtained”.`] },
    es: { lead: 'Este planeador tiene dos pares de alas, uno detrás del otro, sobre una quilla doblada. Los dos pares sustentan, y las alas traseras hacen de cola.',
      body: ['Las alas traseras solo hacen de cola si el planeador se equilibra cerca de las delanteras. Por eso enrollas el morro y añades un clip pequeño: adelantan el punto de equilibrio.',
        'Las alas delanteras empujan aire hacia abajo al sustentar, y las traseras vuelan en ese aire. Levantar un poco las cuatro puntas forma una V que ayuda al planeador a volver a ponerse horizontal.'],
      grownUps: [`Con dos alas, una detrás de otra, las dos ayudan a mantener estable el planeador, así que el punto neutro, el lugar donde actúa la sustentación extra cuando el morro se levanta, queda entre ellas. Medido desde el extremo de la plantilla impresa, una cuenta ponderada por el área de las alas lo sitúa a unos ${np[1]} mm. El ala delantera empuja aire hacia abajo sobre la trasera, y eso adelanta el punto hasta unos ${np[0]} mm. Equilibrado por delante de ese punto, el planeador solo puede volar sustentando si el ala delantera está un poco más levantada que la trasera. Los ingenieros lo llaman decalaje o diedro longitudinal. Para su modelo C, Williams escribió que «the front planes are given a somewhat steeper angle than the others» (los planos delanteros llevan un ángulo algo mayor que los demás).`,
        `Nuestra estimación para esta hoja impresa en papel de 80 g/m² sitúa el equilibrio solo con papel a unos ${cg} mm del extremo de la plantilla, detrás del punto neutro: cola pesada. Unos ${comma(grams[0])}–${comma(grams[1])} g de clip cerca del morro llevarían el equilibrio por delante del punto neutro, con un margen del 10 %. Es una estimación a partir de la forma impresa, no una medida, pero coincide con el consejo de Williams de deslizar un clip metálico por la quilla hasta que vuele bien.`] },
    ru: { lead: 'У этого планера две пары крыльев, одна за другой, на сложенном киле. Обе пары создают подъёмную силу, а задние крылья работают как хвост.',
      body: ['Задние крылья работают как хвост, только если равновесие ближе к передним. Поэтому нос сворачивают и добавляют маленькую скрепку: они сдвигают точку равновесия вперёд.',
        'Передние крылья, создавая подъёмную силу, отбрасывают воздух вниз, и задние летят в этом потоке. Если чуть приподнять четыре кончика, получится V, которая помогает планеру выровняться.'],
      grownUps: [`Когда два крыла стоят одно за другим, оба помогают планеру держаться устойчиво, поэтому нейтральная точка — место, где действует добавочная подъёмная сила, когда нос приподнимается, — лежит между ними. Если считать от края печатной заготовки, расчёт с учётом площади крыльев ставит её примерно в ${np[1]} мм. Переднее крыло отбрасывает воздух вниз на заднее, и это сдвигает точку вперёд, примерно до ${np[0]} мм. При равновесии впереди этой точки планер летит с подъёмной силой, только если переднее крыло приподнято чуть больше заднего. Инженеры называют это декаляжем, или продольным V. О своей модели C Уильямс писал: «the front planes are given a somewhat steeper angle than the others» (передним плоскостям дают несколько больший угол, чем остальным).`,
        `По нашей оценке для этой выкройки на бумаге 80 г/м² равновесие без скрепки примерно в ${cg} мм от края заготовки, позади нейтральной точки: хвост тяжёлый. Около ${comma(grams[0])}–${comma(grams[1])} г скрепки у носа сдвинули бы равновесие впереди нейтральной точки с запасом 10 %. Это оценка по печатной форме, а не измерение, но она совпадает с советом Уильямса двигать металлическую скрепку по килю, пока планер не полетит хорошо.`] },
  },
  why: {
    en: { title: 'A glider from a 1918 book',
      body: ['Archibald Williams printed this glider in Things To Make, a book of projects for young people. He wrote that its shape suggests Langley’s steam-driven aeroplane, and that a good one, launched upside down, “will right itself immediately”.',
        'On 6 May 1896, Samuel Langley’s unpiloted, steam-powered Aerodrome No. 5 flew about 1,000 m over the Potomac River on two pairs of wings in tandem, like this one.'],
      borrows: 'Our redraw keeps Williams’s two pairs of wings and his folded head, with fixed sizes for printing.' },
    es: { title: 'Un planeador de un libro de 1918',
      body: ['Archibald Williams publicó este planeador en Things To Make, un libro de proyectos para jóvenes. Escribió que su forma recuerda al aeroplano de vapor de Langley y que uno bien hecho, lanzado boca abajo, se endereza enseguida.',
        'El 6 de mayo de 1896, el Aerodrome n.º 5 de Samuel Langley, sin piloto y con motor de vapor, voló unos 1000 m sobre el río Potomac con dos pares de alas en tándem, como este.'],
      borrows: 'Nuestro redibujo conserva los dos pares de alas y el morro doblado de Williams, con medidas fijas para imprimir.' },
    ru: { title: 'Планер из книги 1918 года',
      body: ['Арчибальд Уильямс опубликовал этот планер в книге Things To Make («Что можно сделать»), сборнике поделок для юных мастеров. Он писал, что форма модели напоминает паровой аэроплан Лэнгли и что хорошо сделанный планер, запущенный вверх ногами, сразу переворачивается.',
        '6 мая 1896 года беспилотный «Аэродром № 5» Сэмюэла Лэнгли с паровым двигателем пролетел около 1000 м над рекой Потомак на двух парах крыльев, расположенных тандемом, как у этого планера.'],
      borrows: 'В нашей перерисовке сохранены две пары крыльев и сложенный нос Уильямса, а размеры зафиксированы для печати.' },
  },
  tryThis: {
    en: { question: 'Do raised tips help it fly straight?', prediction: 'Which drifts sideways less: level wings or all four tips raised about 6 mm? Williams raised the tips, so our guess is the raised tips.',
      steps: ['First make it glide: add the clip just behind the nose and slide it until the glide is smooth.', 'Fly five times with all four wings level.', 'Raise all four tips about 6 mm and fly five more times.', 'Mark every first touchdown and how far it drifted sideways.'],
      lookFor: 'Which set of marks stays closer to a straight line.' },
    es: { question: '¿Las puntas levantadas lo ayudan a volar recto?', prediction: '¿Cuál se desvía menos hacia un lado: alas planas o las cuatro puntas levantadas unos 6 mm? Williams levantaba las puntas, así que apostamos por ellas.',
      steps: ['Primero haz que planee: pon el clip justo detrás del morro y muévelo hasta que planee suave.', 'Vuela cinco veces con las cuatro alas planas.', 'Levanta las cuatro puntas unos 6 mm y vuela cinco veces más.', 'Marca cada primer contacto con el suelo y cuánto se desvió.'],
      lookFor: 'Qué grupo de marcas queda más cerca de una línea recta.' },
    ru: { question: 'Помогают ли поднятые кончики лететь прямо?', prediction: 'Что меньше уходит вбок: ровные крылья или все четыре кончика, поднятые примерно на 6 мм? Уильямс поднимал кончики, поэтому мы ставим на них.',
      steps: ['Сначала добейтесь планирования: наденьте скрепку сразу за носом и двигайте её, пока полёт не станет плавным.', 'Пять полётов с ровными крыльями.', 'Поднимите все четыре кончика примерно на 6 мм и сделайте ещё пять полётов.', 'Отмечайте каждое первое касание и насколько модель ушла вбок.'],
      lookFor: 'Какая группа отметок ближе к прямой линии.' },
  },
  references: [
    { label: 'Williams, A. (1918). Things To Make, ch. XXIV “Paper Gliders”, Fig. 128. Project Gutenberg #14664', url: 'https://www.gutenberg.org/ebooks/14664', note: w('Public domain. Short quotes and the redrawn pattern.', 'Dominio público. Citas breves y el patrón redibujado.', 'Общественное достояние. Короткие цитаты и перерисованная выкройка.') },
    { label: 'Things To Make, “Paper Gliders”, facsimile at chestofbooks.com', url: 'https://chestofbooks.com/crafts/popular-mechanics/Things-To-Make/XXIV-Paper-Gliders.html', note: w('Readable chapter with figure 128. Linked.', 'Capítulo legible con la figura 128. Enlazado.', 'Глава с рисунком 128. Ссылка.') },
    { label: 'Smithsonian National Air and Space Museum, Langley Aerodrome No. 5', url: 'https://airandspace.si.edu/collection-objects/langley-aerodrome-number-5/nasm_A19050001000', note: w('The 6 May 1896 flights. Linked and paraphrased.', 'Los vuelos del 6 de mayo de 1896. Enlazado y parafraseado.', 'Полёты 6 мая 1896 года. Ссылка и пересказ.') },
  ],
}
