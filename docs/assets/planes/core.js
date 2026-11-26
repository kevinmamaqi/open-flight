import { planeCatalog, sheetSizes, liveries, revision, revisions, trimMm, sheetEdges, planeColors, referenceForLocale, planeFinish, recordRights } from './catalog.js?v=48cc97ad30d5'
import { applyFolds, openSheet, outlineOf, publicPanels, wingShape, slantedWingShape, clipPanels, dedupeCreases } from './geometry.js?v=48cc97ad30d5'
import { recordBuilders } from './records.js?v=48cc97ad30d5'
export { planeCatalog, sheetSizes, liveries, revision, revisions, trimMm, sheetEdges } from './catalog.js?v=48cc97ad30d5'

function whole(value, min, max, fallback, label) {
  if (value === undefined) return fallback
  if (!Number.isInteger(value) || value < min || value > max)
    throw new RangeError(label + ' must be a whole number from ' + min + ' to ' + max)
  return value
}
export function makePlane(input, locale = 'en') {
  if (!input || typeof input !== 'object') throw new TypeError('A plane design is required')
  const model = planeCatalog.find((p) => p.model_id === input.model_id)
  if (!model) throw new RangeError('Unknown plane model')
  if (!['en', 'ru', 'es'].includes(locale)) throw new RangeError('Unknown plane language')
  const rev = input.revision ?? revision
  if (!revisions.includes(rev)) throw new RangeError('Unknown plane revision')
  const paper = input.paper ?? 'A4',
    livery = input.livery ?? 'heritage'
  if (!Object.hasOwn(sheetSizes, paper)) throw new RangeError('Unknown plane paper')
  if (!liveries.includes(livery)) throw new RangeError('Unknown plane livery')
  const [keelMin, keelMax] = model.keel_range ?? [12, 28],
    [tipsMin, tipsMax] = model.winglet_range ?? [0, 12]
  const keel = whole(input.keel_mm, keelMin, keelMax, model.keel_mm, 'keel_mm')
  const tips = whole(input.winglet_mm, tipsMin, tipsMax, model.winglet_mm, 'winglet_mm')
  const edge = input.edge ?? (rev === '1' ? 'whole' : 'cut')
  if (!sheetEdges.includes(edge)) throw new RangeError('Unknown plane sheet edge')
  if (rev === '1' && edge !== 'whole') throw new RangeError('Revision 1 folds the whole sheet')
  const [pageW, pageH] = sheetSizes[paper]
  // A design tied to one paper shape (the Needle is an A4 design) folds a cut-out sheet of that
  // shape on other paper: the thick border is printed even for the whole-sheet choice, centred
  // across the page and trimMm from the top and bottom.
  const ratio = model.sheet_ratio
  const reshape = rev !== '1' && !!ratio && (pageH - 2 * trimMm) / (pageW - 2 * trimMm) < ratio - 0.01
  const trim = edge === 'cut' || reshape ? trimMm : 0
  // Fold geometry uses the sheet the builder actually folds: the cut-out sheet in revision 2.
  const h = Math.round((pageH - 2 * trim) * 1000) / 1000,
    w = Math.round((reshape ? h / ratio : pageW - 2 * trim) * 1000) / 1000,
    c = w / 2
  const t = (en, ru, es) => ({ en, ru, es })[locale]
  const mm = (n) =>
    (Number.isInteger(n) ? n : n.toFixed(1)).toString().replace('.', locale === 'ru' ? ',' : '.')
  const opsX = (x, tag, kind) => ({
    line: [
      [x, 0],
      [x, h],
    ],
    toward: [x < c ? 0 : w, h],
    tag,
    kind,
  })
  const horizontal = (y, towardY, tag, only) => ({
    line: [
      [0, y],
      [w, y],
    ],
    toward: [c, towardY],
    tag,
    only,
  })
  function shoulders(apexX, startY, reach) {
    return [
      {
        line: [
          [apexX, startY],
          [0, startY + reach],
        ],
        toward: [0, startY],
      },
      {
        line: [
          [w - apexX, startY],
          [w, startY + reach],
        ],
        toward: [w, startY],
      },
    ]
  }
  const steps = [],
    recorded = []
  let layers = openSheet(w, h)
  function add(title, instruction, ops, options = {}) {
    const idx = steps.length
    const base = options.base ?? layers
    const result = applyFolds(base, ops, idx, options.independent)
    const after = options.reopen ? base : result.panels
    const frame = {
      width: w,
      height: h,
      kind: options.kind ?? 'flat',
      reopen: !!options.reopen,
      panels: publicPanels(after),
      before: publicPanels(base),
      fixed: result.fixed,
      moves: result.moves,
      outline: outlineOf(after),
      beforeOutline: outlineOf(base),
      hinges: ops.map((op) => op.line),
      keel_mm: keel,
      winglet_mm: tips,
      dihedral_deg: 8,
      wingPolygon: [],
    }
    steps.push({ index: idx, title, instruction, frame })
    // lines: false keeps these creases off the printed template (folds through a wrapped body).
    recorded.push(...(options.lines === false ? result.creases.map((crease) => ({ ...crease, print: false })) : result.creases))
    layers = after
    return frame
  }
  const cutFirst = trim
    ? t(
        'Cut out the sheet along the thick border. ',
        'Вырежьте лист по толстой рамке. ',
        'Recorta la hoja por el borde grueso. ',
      )
    : ''
  // Record planes fold their own way to the open stock, then share the body, wing and tip folds.
  const record = model.record ? recordBuilders[model.model_id]({ w, h, keel, tips, t, mm }) : null
  if (!record) add(
    t('Find the centre', 'Наметьте середину', 'Marca el centro'),
    cutFirst + t(
      'Print side up. Put the short edge at the top. Bring the two long edges together, press the middle crease, then open the sheet again.',
      'Положите лист печатью вверх, короткой стороной от себя. Совместите длинные края, проведите по сгибу и раскройте лист.',
      'Coloca la cara impresa hacia arriba y un borde corto lejos de ti. Junta los bordes largos, marca el doblez del centro y vuelve a abrir la hoja.',
    ),
    [opsX(c, 'centre')],
    { reopen: true },
  )
  const cornerTitle = t(
    'Bring the corners to the centre',
    'Сведите углы к середине',
    'Lleva las esquinas al centro',
  )
  const cornerText = t(
    'Fold each top corner inward. Lay the two short top edges along the centre crease. Press the two diagonals.',
    'Загните оба верхних угла внутрь. Совместите короткие верхние кромки со средней линией. Прижмите косые сгибы.',
    'Dobla las dos esquinas de arriba hacia dentro. Alinea los bordes cortos con el doblez del centro y marca las dos diagonales.',
  )
  if (record) {
    for (const s of record.folder.steps) {
      Object.assign(s.frame, { keel_mm: keel, winglet_mm: tips, dihedral_deg: 8, wingPolygon: [] })
      steps.push(s)
    }
    recorded.push(...record.folder.creases)
    layers = record.open ?? record.stock
    if (cutFirst) steps[0].instruction = cutFirst + steps[0].instruction
  } else if (model.model_id === 'boeing-747') {
    add(cornerTitle, cornerText, shoulders(c, 0, c))
    const step = 34,
      pleat = 51
    add(
      t('Turn the nose down', 'Загните нос вниз', 'Dobla la punta hacia la cola'),
      t(
        'Fold the pointed nose towards the tail on line 3. The tip rests 68 mm from the original top edge. Press across all the layers.',
        'Согните острый нос к хвосту по линии 3. Кончик окажется в 68 мм от исходного верхнего края. Прижмите все слои.',
        'Dobla la punta hacia la cola por la línea 3. La punta queda a 68 mm del borde superior original. Presiona todas las capas a lo ancho.',
      ),
      [horizontal(step, 0, 'deck')],
    )
    add(
      t('Make the upper-deck pleat', 'Сложите ступеньку', 'Haz el escalón del piso superior'),
      t(
        'Lift only the loose triangular tip. Fold it back towards the nose on line 4 until its point touches the new front edge. The lower layers stay flat.',
        'Поднимите только свободный треугольный кончик. По линии 4 отогните его обратно к носу, до новой передней кромки. Нижние слои остаются на месте.',
        'Levanta solo la punta triangular suelta. Dóblala hacia delante por la línea 4 hasta que toque el nuevo borde delantero. Deja las capas inferiores planas.',
      ),
      [horizontal(pleat, h, 'pleat', 'deck')],
    )
  } else if (model.model_id === 'douglas-dc3') {
    add(
      t('Fold a narrow front cuff', 'Подогните передний край', 'Dobla una tira en el borde delantero'),
      t(
        'Bring the short top edge down 24 mm to make a 12 mm cuff. Press the whole width.',
        'Опустите верхний край на 24 мм. Получится подгиб шириной 12 мм. Прижмите его по всей длине.',
        'Lleva el borde corto de arriba 24 mm hacia ti para hacer un doblez de 12 mm de ancho. Presiónalo de lado a lado.',
      ),
      [horizontal(12, 0, 'cuff')],
    )
    add(
      t('Roll the cuff once more', 'Подогните ещё раз', 'Vuelve a doblar la tira'),
      t(
        'Roll the same strip towards you over its lower edge. The new front sits 24 mm from the original top. Both folds should be parallel.',
        'Перегните ту же полоску к себе через её нижний край. Новая передняя кромка окажется в 24 мм от исходного края. Сгибы должны быть параллельны.',
        'Dobla la misma tira hacia ti por su borde inferior. El nuevo borde delantero queda a 24 mm del borde superior original. Comprueba que los dobleces sean paralelos.',
      ),
      [horizontal(24, 0, 'double-cuff')],
    )
    const shoulder = 56
    add(
      t('Fold in the shoulders', 'Сложите небольшие плечи', 'Dobla las esquinas de la tira'),
      t(
        'On each side fold the cuff corner diagonally inwards on line 4. The marked diagonal joins two points 56 mm from that corner. A straight strip stays across the middle of the nose.',
        'С каждой стороны загните уголок подгиба внутрь по линии 4. Диагональ соединяет две точки в 56 мм от угла. Посередине сохранится прямой участок носа.',
        'Dobla hacia dentro las esquinas de la tira por la línea 4. Cada diagonal une dos puntos situados a 56 mm de la esquina. En el centro queda un tramo recto.',
      ),
      shoulders(shoulder, 24, shoulder),
    )
  } else if (model.model_id === 'tupolev-tu144') {
    add(cornerTitle, cornerText, shoulders(c, 0, c))
    add(
      t('Sweep the edges in again', 'Снова сведите кромки', 'Vuelve a llevar los bordes al centro'),
      t(
        'Bring each sloping front edge in until it lies along the centre crease. Start at the nose and smooth out the long diagonals one at a time.',
        'Ещё раз загните обе косые передние кромки к средней линии. Начните с носа и разгладьте каждый длинный сгиб отдельно.',
        'Lleva cada borde inclinado al doblez del centro. Empieza en la punta y marca las diagonales largas una por una.',
      ),
      shoulders(c, 0, c / Math.tan(Math.PI / 8)),
    )
  } else {
    add(
      t('Weight the front edge', 'Подогните носовую кромку', 'Refuerza el borde delantero'),
      t(
        'Fold the top edge down to the 36 mm mark. This makes an 18 mm band across the sheet.',
        'Опустите верхний край до отметки 36 мм. Получится полоса шириной 18 мм поперёк листа.',
        'Dobla el borde superior hasta la marca de 36 mm. Queda una tira de 18 mm de ancho de lado a lado.',
      ),
      [horizontal(18, 0, 'hem')],
    )
    add(
      t('Fold the hemmed corners', 'Сведите уголки подгиба', 'Dobla las esquinas reforzadas'),
      t(
        'Using the new front edge, fold both corners to the centre. Smooth each thick diagonal outwards from the tip.',
        'Загните углы новой передней кромки к середине. Разгладьте каждый многослойный сгиб от носа наружу.',
        'Lleva al centro las dos esquinas del nuevo borde delantero. Alisa cada diagonal gruesa desde la punta hacia fuera.',
      ),
      shoulders(c, 18, c),
    )
    add(
      t('Shape the swept shoulders', 'Придайте крыльям стреловидность', 'Dale forma a las alas inclinadas'),
      t(
        'Fold each sloping shoulder inward on line 4. The crease runs from the nose to a mark 160 mm down each side from the new front. The folded edges stay apart.',
        'Загните косые плечи внутрь по линии 4. Сгиб идёт от носа до отметки в 160 мм от новой передней кромки на каждом боку. Новые кромки не сходятся посередине.',
        'Dobla hacia dentro cada lado inclinado por la línea 4. La línea va desde la punta hasta una marca a 160 mm del nuevo borde delantero en cada lado. Los bordes doblados quedan separados.',
      ),
      shoulders(c, 18, 160),
    )
  }
  const stock = record ? record.stock : layers
  // A design whose body is wrapped from many layers prints no body, wing or tip lines: each fold
  // runs through every layer and would leave dozens of unrelated lines on the flat sheet.
  const bodyLines = record?.bodyLines === false ? { lines: false } : {}
  const close = add(
    record?.close.title ?? t('Close the body', 'Сложите корпус', 'Cierra el cuerpo'),
    record?.close.instruction ??
      t(
        'Keep the folded details face up. Fold the right half away from you, behind the left, along the centre line. The folded details will be on the outside.',
        'Положите лист складками вверх. Отогните правую половину от себя под левую по средней линии. Носовые складки окажутся снаружи.',
        'Deja los dobleces hacia arriba. Dobla la mitad derecha por debajo de la izquierda siguiendo la línea del centro. Los dobleces de la punta quedan por fuera.',
      ),
    [record?.closeKind === 'valley' ? opsX(c, 'spine', 'valley') : { ...opsX(c, 'spine', 'mountain'), under: true }],
    bodyLines,
  )
  const bodyFrames = [close]
  for (const extra of record?.extras ?? []) {
    const frame = add(extra.title, extra.instruction, extra.ops, bodyLines)
    if (extra.view) frame.view = extra.view
    bodyFrames.push(frame)
  }
  // A slanted wing root (deeper at the tail) runs between two points on the left half of the stock.
  const root = record?.root ?? null
  const mirror = (line) => line.map(([x, y]) => [w - x, y])
  // Paper wrapped round the body last is drawn as body, not wing.
  const shown = record?.wingWithin ? clipPanels(stock, record.wingWithin) : stock
  const rootStep = steps.length
  const wings = add(
    record?.wings.title ?? t('Fold one wing, then match its twin', 'Сложите крылья по очереди', 'Dobla un ala y luego la otra'),
    record?.wings.instruction ?? t(
      'Hold the closed body with the centre edge on your right. Fold only the upper wing outward on the line ' +
        mm(keel) +
        ' mm from that edge. Turn the model over and fold the other wing to match. From behind, the wings make a T with the body hanging below.',
      'Держите закрытый корпус средним сгибом вправо. Отогните только верхнее крыло наружу по линии в ' +
        mm(keel) +
        ' мм от среднего сгиба. Переверните и так же отогните второе. С хвоста видна буква Т с корпусом под крыльями.',
      'Sujeta el cuerpo cerrado con el doblez central a tu derecha. Dobla solo el ala de arriba hacia fuera por la línea que está a ' +
        mm(keel) +
        ' mm de ese borde. Dale la vuelta y repite con la otra ala. Desde la cola, las alas y el cuerpo dibujan una T.',
    ),
    root
      ? [
          { line: root, toward: [0, h], tag: 'wing', kind: 'mountain' },
          { line: mirror(root), toward: [w, h], tag: 'wing', kind: 'mountain' },
        ]
      : [opsX(c - keel, 'wing', 'mountain'), opsX(c + keel, 'wing', 'mountain')],
    { reopen: true, independent: true, base: shown, kind: 'wings', ...bodyLines },
  )
  wings.moves.forEach((m) => {
    m.angle_deg = 90
  })
  const finish = add(
    record
      ? record.tips.title
      : tips
      ? t('Raise the wing tips', 'Поднимите законцовки', 'Levanta los extremos de las alas')
      : t('Open the wings', 'Раскройте крылья', 'Abre las alas'),
    record
      ? record.tips.instruction
      : tips
      ? t(
          'Lift each wingtip about 10 mm above the body fold. Turn up the outer ' +
            mm(tips) +
            ' mm of each long side until both tips stand upright. Sight from the tail and match the heights.',
          'Поднимите каждый конец крыла примерно на 10 мм над сгибом корпуса. Отогните вверх по ' +
            mm(tips) +
            ' мм вдоль внешнего края каждого крыла. Посмотрите с хвоста и выровняйте законцовки.',
          'Levanta cada punta del ala unos 10 mm por encima del pliegue del cuerpo. Dobla hacia arriba los ' +
            mm(tips) +
            ' mm exteriores de cada ala hasta que las dos puntas queden verticales. Mira desde la cola y comprueba que tienen la misma altura.',
        )
      : t(
          'Lift each wingtip about 10 mm above the body fold. Keep the outer edges flat. From the tail, check that the two tips sit at the same height.',
          'Поднимите каждый конец крыла примерно на 10 мм над сгибом корпуса. Внешние кромки оставьте плоскими. Посмотрите с хвоста и проверьте, что оба конца на одной высоте.',
          'Levanta cada punta del ala unos 10 mm por encima del pliegue del cuerpo. Deja planos los bordes exteriores. Mira desde la cola y comprueba que los dos extremos queden a la misma altura.',
        ),
    tips ? [opsX(tips, 'tip'), opsX(w - tips, 'tip')] : [],
    { base: shown, reopen: true, independent: true, kind: 'tips', ...bodyLines },
  )
  finish.moves.forEach((m) => {
    m.angle_deg = 90
  })
  const wing = root ? slantedWingShape(outlineOf(shown), w, root, tips) : wingShape(outlineOf(shown), w, keel, tips)
  for (const frame of [...bodyFrames, wings, finish]) {
    frame.wingPolygon = wing
    frame.stockOutline = outlineOf(shown)
    if (root) frame.root = root
  }
  const source = {
    format: 'open-flight-plane',
    revision: rev,
    model_id: model.model_id,
    paper,
    // Revision 1 sources keep their original fields so saved files stay byte-identical.
    ...(rev === '1' ? {} : { edge }),
    keel_mm: keel,
    winglet_mm: tips,
    livery,
  }
  return {
    ...source,
    source,
    locale,
    name: model.name[locale],
    inspiration: model.inspiration[locale],
    character: model.character[locale],
    history: model.history[locale],
    experiment: model.experiment[locale],
    reference: referenceForLocale(model.reference, locale),
    field: {
      step: model.field.step,
      variant: model.field.variant,
      landmark: model.field.landmark[locale],
      look: model.field.look[locale],
      fold: model.field.fold[locale],
      finish: planeFinish(model, livery, locale),
      museum: referenceForLocale(model.field.museum ?? model.reference, locale),
    },
    dimensions: { width_mm: w, height_mm: h },
    page: { width_mm: pageW, height_mm: pageH },
    edge,
    trim_mm: trim,
    ...(reshape ? { offset_mm: [Math.round(((pageW - w) / 2) * 1000) / 1000, trim] } : {}),
    colors: planeColors(model, livery),
    motif: model.motif,
    code: model.code,
    steps,
    creases: dedupeCreases(recorded),
    rootStep,
    ...(root ? { root } : {}),
    ...(record ? { designer: model.designer, original: model.original, launch: model.launch[locale], rights: recordRights[locale] } : {}),
    ...(record?.tips.heading ? { tipsHeading: record.tips.heading } : {}),
    stockOutline: outlineOf(shown),
    wingPolygon: wing,
    stockPanels: stock.map(({ face, vertices }) => ({
      face,
      polygon: vertices.map((v) => v.p),
      sourcePolygon: vertices.map((v) => v.o),
    })),
  }
}
export function planeSource(plan) {
  return JSON.stringify(plan.source, null, 2) + '\n'
}
