// Fold sequences for the record and championship planes, for any sheet size.
//
// The paper is a stack of convex panels, bottom to top. Every vertex keeps its position on the
// table (p) and on the untouched sheet (o). A fold splits each selected panel along a straight line
// and reflects the part on one side: valley folds lay the flap on top, mountain folds tuck it
// underneath. Creases are recorded in sheet coordinates, as seen from the printed face. Moves that
// leave the table (reverse folds, tucks, squashes) are drawn as the flat result they leave.
//
// Each builder folds the sheet up to the open stock, nose up with the centre on x = width / 2, and
// returns the rest of the sequence (body, wings, tips) for makePlane's shared finishing folds. The
// tutorial measurements are for A4; points that come from the paper's own edges and creases are
// computed, and the few measured marks scale with the sheet.

const eps = 1e-7
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]]
const add = (a, b) => [a[0] + b[0], a[1] + b[1]]
const mul = (a, k) => [a[0] * k, a[1] * k]
const dot = (a, b) => a[0] * b[0] + a[1] * b[1]
const len = (a) => Math.hypot(a[0], a[1])
const unit = (a) => mul(a, 1 / len(a))
const cross = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
function area(pts) {
  return Math.abs(pts.reduce((s, a, i) => s + a[0] * pts[(i + 1) % pts.length][1] - a[1] * pts[(i + 1) % pts.length][0], 0) / 2)
}
function centroid(pts) {
  let A = 0,
    cx = 0,
    cy = 0
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i],
      [x1, y1] = pts[(i + 1) % pts.length]
    const f = x0 * y1 - x1 * y0
    A += f
    cx += (x0 + x1) * f
    cy += (y0 + y1) * f
  }
  return [cx / (3 * A), cy / (3 * A)]
}
export function reflectPoint(p, [a, b]) {
  const d = sub(b, a)
  const f = add(a, mul(d, dot(sub(p, a), d) / dot(d, d)))
  return [2 * f[0] - p[0], 2 * f[1] - p[1]]
}
function clip(vs, crease, sign) {
  const out = []
  for (let i = 0; i < vs.length; i++) {
    const a = vs[i],
      b = vs[(i + 1) % vs.length]
    const da = sign * cross(crease[0], crease[1], a.p),
      db = sign * cross(crease[0], crease[1], b.p)
    if (da >= -eps) out.push(a)
    if ((da > eps && db < -eps) || (da < -eps && db > eps)) {
      const t = da / (da - db)
      out.push({ p: lerp(a.p, b.p, t), o: lerp(a.o, b.o, t) })
    }
  }
  return out.length >= 3 && area(out.map((v) => v.p)) > 1e-4 ? out : []
}
function hull(points) {
  const sorted = points
    .filter((p, i) => !points.slice(0, i).some((q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 < eps))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const chain = (seq) => {
    const part = []
    for (const p of seq) {
      while (part.length >= 2 && cross(part.at(-2), part.at(-1), p) <= eps) part.pop()
      part.push(p)
    }
    part.pop()
    return part
  }
  return [...chain(sorted), ...chain([...sorted].reverse())]
}

export const line = {
  through: (a, b) => [a, b],
  // The crease through pivot that lays the ray pivot→a onto the ray pivot→b.
  rayOnto(pivot, a, b) {
    return [pivot, add(pivot, add(unit(sub(a, pivot)), unit(sub(b, pivot))))]
  },
  vertical: (x) => [
    [x, 0],
    [x, 1],
  ],
  horizontal: (y) => [
    [0, y],
    [1, y],
  ],
}

// The rigid map from sheet to table coordinates for one panel.
export function isometry(panel) {
  const vs = panel.vertices
  let best = null
  for (const a of vs) for (const b of vs) if (!best || len(sub(b.o, a.o)) > len(sub(best[1].o, best[0].o))) best = [a, b]
  if (!best || len(sub(best[1].o, best[0].o)) < 1e-6) return null
  const [i, j] = best
  const k = vs.reduce((a, v) => (Math.abs(cross(i.o, j.o, v.o)) > Math.abs(cross(i.o, j.o, a.o)) ? v : a), vs[0])
  if (Math.abs(cross(i.o, j.o, k.o)) < 1e-9) return null
  const mirror = Math.sign(cross(i.o, j.o, k.o)) !== Math.sign(cross(i.p, j.p, k.p))
  const uo = unit(sub(j.o, i.o))
  const no = [-uo[1], uo[0]]
  const up = unit(sub(j.p, i.p))
  const np = mirror ? [up[1], -up[0]] : [-up[1], up[0]]
  return (o) => {
    const d = sub(o, i.o)
    return add(i.p, add(mul(up, dot(d, uo)), mul(np, dot(d, no))))
  }
}
function insideConvex(p, poly) {
  let sign = 0
  for (let i = 0; i < poly.length; i++) {
    const c = cross(poly[i], poly[(i + 1) % poly.length], p)
    if (Math.abs(c) < 1e-6) continue
    const s = Math.sign(c)
    if (!sign) sign = s
    else if (s !== sign) return false
  }
  return true
}
const publicPanels = (panels) =>
  panels.map(({ vertices, face }, z) => ({ face, polygon: vertices.map((v) => v.p), original: vertices.map((v) => v.o), z }))
const outline = (panels) => hull(panels.flatMap((p) => p.vertices.map((v) => v.p)))

class Folder {
  constructor(width, height) {
    this.width = width
    this.height = height
    const corners = [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ]
    this.panels = [{ face: 'front', tags: ['sheet'], vertices: corners.map((p) => ({ p, o: p })) }]
    this.creases = []
    this.steps = []
    this.moved = new Set()
  }
  clone(panels = this.panels) {
    return panels.map((p) => ({ face: p.face, tags: [...p.tags], vertices: p.vertices.map((v) => ({ p: [...v.p], o: [...v.o] })) }))
  }
  bbox() {
    const pts = this.panels.flatMap((p) => p.vertices.map((v) => v.p))
    const xs = pts.map((p) => p[0]),
      ys = pts.map((p) => p[1])
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
  }
  // Table position of a sheet point, read from the topmost panel that holds it.
  where(o) {
    for (let i = this.panels.length - 1; i >= 0; i--) {
      const map = isometry(this.panels[i])
      if (map && insideConvex(o, this.panels[i].vertices.map((v) => v.o))) return map(o)
    }
    throw new Error('Sheet point ' + o + ' is not on any panel')
  }
  fold(crease, toward, { select, kind = 'valley', tag } = {}) {
    const sign = Math.sign(cross(crease[0], crease[1], toward))
    if (!sign) throw new Error('The point that shows which side moves lies on the crease')
    const fixed = [],
      moving = [],
      moves = []
    this.panels.forEach((panel, i) => {
      if (select && !select(panel, i)) return fixed.push(panel)
      const stay = clip(panel.vertices, crease, -sign)
      const flap = clip(panel.vertices, crease, sign)
      if (stay.length) fixed.push(stay.length === panel.vertices.length && !flap.length ? panel : { ...panel, vertices: stay })
      if (!flap.length) return
      const to = flap.map((v) => ({ p: reflectPoint(v.p, crease), o: v.o }))
      const moved = { face: panel.face === 'front' ? 'back' : 'front', tags: tag ? [...panel.tags, tag] : [...panel.tags], vertices: to }
      moving.push(moved)
      this.moved.add(moved)
      moves.push({
        face: panel.face,
        from: flap.map((v) => v.p),
        to: to.map((v) => v.p),
        original: flap.map((v) => v.o),
        hinge: crease,
        angle_deg: kind === 'mountain' ? -180 : 180,
      })
      const onHinge = flap.filter((v) => Math.abs(cross(crease[0], crease[1], v.p)) < 1e-4)
      if (stay.length && onHinge.length >= 2) {
        const os = onHinge.map((v) => v.o)
        let best = [os[0], os[1]]
        for (const a of os) for (const b of os) if (len(sub(a, b)) > len(sub(best[0], best[1]))) best = [a, b]
        // Seen from the printed face of the sheet.
        const seen = panel.face === 'front' ? kind : kind === 'valley' ? 'mountain' : 'valley'
        if (len(sub(best[0], best[1])) > 0.05) this.creases.push({ line: best, step: this.steps.length, kind: seen })
      }
    })
    if (!moves.length) throw new Error('This fold moves no paper')
    const flipped = moving.reverse()
    this.panels = kind === 'valley' ? [...fixed, ...flipped] : [...flipped, ...fixed]
    return moves
  }
  // Fold only if there is paper on the far side.
  tryFold(...args) {
    try {
      return this.fold(...args)
    } catch {
      return []
    }
  }
  turnOver() {
    const b = this.bbox()
    const cx = (b.x0 + b.x1) / 2
    this.panels = this.panels
      .map((p) => ({ ...p, face: p.face === 'front' ? 'back' : 'front', vertices: p.vertices.map((v) => ({ p: [2 * cx - v.p[0], v.p[1]], o: v.o })).reverse() }))
      .reverse()
  }
  transform(f) {
    this.panels = this.panels.map((p) => ({ ...p, vertices: p.vertices.map((v) => ({ p: f(v.p), o: v.o })) }))
  }
  // lines: false keeps a step's creases off the printed template (wraps and rolls that follow the
  // paper's own edges); they stay in the crease pattern.
  step(title, instruction, act, { reopen = false, lines = true, view } = {}) {
    const before = this.clone()
    this.moved = new Set()
    const first = this.creases.length
    const result = act(this)
    if (!lines) for (const crease of this.creases.slice(first)) crease.print = false
    const moves = Array.isArray(result) ? result : []
    const after = this.panels
    const fixed = after.filter((p) => !this.moved.has(p))
    if (reopen) this.panels = before
    const hinges = []
    for (const m of moves) if (!hinges.some((h) => h === m.hinge)) hinges.push(m.hinge)
    const shown = reopen ? before : after
    this.steps.push({
      index: this.steps.length,
      title,
      instruction,
      frame: {
        width: this.width,
        height: this.height,
        kind: 'flat',
        reopen,
        ...(view ? { view } : {}),
        panels: publicPanels(shown),
        before: publicPanels(before),
        fixed: publicPanels(fixed),
        moves,
        outline: outline(shown),
        beforeOutline: outline(before),
        hinges,
      },
    })
    this.panels = this.clone(this.panels)
  }
  // The stack in makePlane's own panel form.
  stock() {
    return this.panels.map((p) => ({ face: p.face, tag: '', vertices: p.vertices.map((v) => ({ p: [...v.p], o: [...v.o] })) }))
  }
}

// --- Red Dart -------------------------------------------------------------------------------
function redDart({ w, h, keel, t, mm }) {
  const m = new Folder(w, h)
  const c = w / 2
  // The first fold lays the top edge on the right edge; its crease is the long diagonal.
  const corner = [0, w]
  const diagonal = w * Math.SQRT2
  const nosePoint = lerp(corner, [w, 0], 148 / 297)
  const P2 = nosePoint
  const bottom = (45.5 / 210) * w
  const P1 = [bottom, h]
  const markAlong = (148 / 297) * diagonal
  m.step(
    t('Fold the long diagonal', 'Сложите по длинной диагонали', 'Dobla la diagonal larga'),
    t(
      'Print side up, short edge at the top. Fold the top edge down onto the right edge. The crease runs from the top right corner. Press it flat.',
      'Печатью вверх, короткой стороной от себя. Опустите верхний край на правый. Сгиб идёт от правого верхнего угла. Хорошо прогладьте.',
      'Cara impresa hacia arriba y un borde corto lejos de ti. Lleva el borde de arriba sobre el borde derecho. El doblez sale de la esquina superior derecha. Márcalo bien.',
    ),
    (m) => m.fold(line.through([w, 0], corner), [0, 0]),
  )
  m.step(
    t('Fold to a pencil line', 'Сложите по линии карандаша', 'Dobla por una línea de lápiz'),
    t(
      'Mark the folded edge ' + mm(markAlong) + ' mm from its lower end and the bottom edge ' + mm(bottom) + ' mm from the left corner. Join the marks with a pencil line and fold the lower left part over on it. The first mark becomes the nose.',
      'Отметьте на сгибе ' + mm(markAlong) + ' мм от его нижнего конца, а на нижнем крае ' + mm(bottom) + ' мм от левого угла. Соедините отметки карандашом и загните по линии левую нижнюю часть. Первая отметка станет носом.',
      'Marca el borde doblado a ' + mm(markAlong) + ' mm de su extremo inferior y el borde de abajo a ' + mm(bottom) + ' mm de la esquina izquierda. Une las marcas con una línea de lápiz y dobla por ella la parte de abajo a la izquierda. La primera marca será la punta.',
    ),
    (m) => m.fold(line.through(P2, P1), [0, h]),
  )
  // The diagonal edge, now folded over, and the new crease meet at the nose. Fold one onto the other.
  const raw = reflectPoint(corner, [P2, P1])
  const edgeFold = line.rayOnto(P2, P1, raw)
  m.step(
    t('Fold the edge onto the layers', 'Совместите кромку со слоями', 'Lleva el borde sobre las capas'),
    t(
      'Pivot on the nose mark. Fold the new folded edge over until it lies on the raw edge underneath. Wrap the layers as tightly as you can.',
      'Поверните вокруг отметки носа. Загните новую кромку так, чтобы она легла на край бумаги под ней. Складывайте слои как можно плотнее.',
      'Gira sobre la marca de la punta. Dobla el nuevo borde doblado hasta que quede sobre el borde suelto de debajo. Envuelve las capas lo más apretadas que puedas.',
    ),
    (m) => m.fold(edgeFold, add(P2, mul(unit(sub(P1, P2)), 50))),
  )
  // The core: a long isosceles triangle from the nose to the bottom edge.
  const u = unit(sub(raw, P2))
  const reach = (h - P2[1]) / u[1]
  const A = add(P2, mul(u, reach))
  const B = add(P2, mul(unit(sub(edgeFold[1], edgeFold[0])), reach))
  const core = [P2, A, B]
  const tc = centroid(core)
  const over = (m, p, q) => m.tryFold([p, q], reflectPoint(tc, [p, q]), { tag: 'wrap' })
  m.step(
    t('Mark the core', 'Наметьте сердцевину', 'Marca el núcleo'),
    t(
      'Measure ' + mm(reach) + ' mm from the nose along both long edges and join the marks. Crease the line both ways, then open it. This narrow triangle is the core of the plane.',
      'Отмерьте ' + mm(reach) + ' мм от носа по обеим длинным кромкам и соедините отметки. Прогладьте линию в обе стороны и раскройте. Этот узкий треугольник — сердцевина самолёта.',
      'Mide ' + mm(reach) + ' mm desde la punta por los dos bordes largos y une las marcas. Marca la línea hacia los dos lados y vuelve a abrir. Este triángulo estrecho es el núcleo del avión.',
    ),
    (m) => over(m, A, B),
    { reopen: true },
  )
  m.step(
    t('Tuck the back', 'Подогните хвост', 'Mete la parte de atrás'),
    t(
      'Fold everything that sticks out past the back line inside, over the line.',
      'Загните внутрь всё, что выступает за заднюю линию.',
      'Dobla hacia dentro, por la línea, todo lo que sobresale por detrás.',
    ),
    (m) => over(m, A, B),
    { lines: false },
  )
  m.step(
    t('First wrap', 'Первый оборот', 'Primera vuelta'),
    t(
      'Fold everything outside the core over its right long side, all layers together. Tuck anything that crosses the back line inside again.',
      'Перегните всё, что лежит вне сердцевины, через её правую длинную сторону, все слои вместе. Снова подогните то, что выходит за заднюю линию.',
      'Dobla todo lo que queda fuera del núcleo sobre su lado largo derecho, con todas las capas juntas. Vuelve a meter lo que pase de la línea de atrás.',
    ),
    (m) => [...over(m, P2, A), ...over(m, A, B)],
    { lines: false },
  )
  m.step(
    t('Second wrap', 'Второй оборот', 'Segunda vuelta'),
    t(
      'Now fold everything outside over the left long side, turning the same way as before. Tuck the back again.',
      'Теперь перегните всё лишнее через левую длинную сторону, в ту же сторону, что и раньше. Снова подогните хвост.',
      'Ahora dobla lo que queda fuera sobre el lado largo izquierdo, girando hacia el mismo lado que antes. Vuelve a meter la parte de atrás.',
    ),
    (m) => [...over(m, P2, B), ...over(m, A, B)],
    { lines: false },
  )
  m.step(
    t('Keep wrapping', 'Продолжайте оборачивать', 'Sigue envolviendo'),
    t(
      'Keep wrapping the remaining paper round the core, side after side, as tightly as you can. Stop when the small free triangle near the nose is covered. One loose flap is left over.',
      'Продолжайте оборачивать оставшуюся бумагу вокруг сердцевины, сторона за стороной, как можно плотнее. Остановитесь, когда закроется маленький свободный треугольник у носа. Останется один свободный клапан.',
      'Sigue envolviendo el papel que queda alrededor del núcleo, un lado y luego el otro, lo más apretado posible. Para cuando quede tapado el triangulito libre cerca de la punta. Sobra una solapa suelta.',
    ),
    (m) => [...over(m, P2, A), ...over(m, P2, B), ...over(m, P2, A), ...over(m, P2, B)],
    { lines: false },
  )
  // Turn the core nose up, its axis on the centre line of the page.
  const M = lerp(A, B, 0.5)
  const tilt = Math.atan2(M[0] - P2[0], M[1] - P2[1])
  const turn = (p) => {
    const dx = p[0] - P2[0],
      dy = p[1] - P2[1]
    return [c + dx * Math.cos(tilt) - dy * Math.sin(tilt), P2[1] + dx * Math.sin(tilt) + dy * Math.cos(tilt)]
  }
  // The last step wraps the loose flap round the body. Its flat result: keep folding whatever lies
  // outside the core over the core's edges. These folds happen on the closed body, so they leave no
  // crease on the template.
  const open = m.stock()
  const creases = m.creases.length
  const outside = () => m.panels.some((p) => p.vertices.some((v) => !insideConvex(v.p, core) && core.every((q, i) => Math.abs(cross(q, core[(i + 1) % 3], v.p)) > 0.01)))
  for (let i = 0; i < 24 && outside(); i++) [[P2, A], [P2, B], [A, B]].forEach(([p, q]) => over(m, p, q))
  m.creases.length = creases
  m.transform(turn)
  const stock = m.stock()
  m.panels = open.map((p) => ({ face: p.face, tags: [], vertices: p.vertices }))
  m.transform(turn)
  const nose = [c, P2[1]]
  const tail = P2[1] + len(sub(M, P2))
  return {
    folder: m,
    open: m.stock(),
    stock,
    bodyLines: false,
    close: {
      title: t('Fold the core in half', 'Сложите сердцевину пополам', 'Dobla el núcleo por la mitad'),
      instruction: t(
        'Turn the core nose up. Fold it in half along its middle, the right half behind the left. The loose flap goes with it.',
        'Поверните сердцевину носом от себя. Сложите её пополам по середине, правую половину назад под левую. Свободный клапан складывается вместе с ней.',
        'Gira el núcleo con la punta lejos de ti. Dóblalo por la mitad, la mitad derecha por detrás de la izquierda. La solapa suelta va con él.',
      ),
    },
    root: [nose, [c - keel, tail]],
    wings: {
      title: t('Fold one wing, then match its twin', 'Сложите крылья по очереди', 'Dobla un ala y luego la otra'),
      instruction: t(
        'Fold the upper wing down on a line from the nose to a point ' + mm(keel) + ' mm from the centre fold at the tail. Near the nose, roll the thick layers as far as they go. Turn over and fold the other wing to match.',
        'Отогните верхнее крыло по линии от носа до точки в ' + mm(keel) + ' мм от среднего сгиба у хвоста. У носа плотно заверните толстые слои, насколько получится. Переверните и так же сложите второе крыло.',
        'Dobla el ala de arriba por una línea que va de la punta a un punto a ' + mm(keel) + ' mm del doblez central en la cola. Cerca de la punta, enrolla las capas gruesas hasta donde lleguen. Dale la vuelta y dobla la otra ala igual.',
      ),
    },
    tips: {
      heading: t('Lock the body', 'Закрепите корпус', 'Cierra el cuerpo'),
      title: t('Lock the body', 'Закрепите корпус', 'Cierra el cuerpo'),
      instruction: t(
        'Wrap the loose flap round the body, over the centre fold and back over the wing root, and press it flat. Nothing should flap loose: the body is hard and smooth. Open the wings level, a thin T from behind.',
        'Оберните свободный клапан вокруг корпуса, через средний сгиб и обратно через основание крыла, и прижмите. Ничего не должно болтаться: корпус твёрдый и гладкий. Раскройте крылья ровно, сзади видна тонкая буква Т.',
        'Envuelve la solapa suelta alrededor del cuerpo, por encima del doblez central y de vuelta sobre la base del ala, y presiónala. No debe quedar nada suelto: el cuerpo queda duro y liso. Abre las alas a nivel; desde atrás se ve una T fina.',
      ),
    },
  }
}

// --- Shaheen Shin ---------------------------------------------------------------------------
function shaheenShin({ w, h, keel, tips, t, mm }) {
  const m = new Folder(w, h)
  const c = w / 2
  const sx = w / 210
  const point = (c - 1) / 2
  const band1 = point + point / 3,
    band2 = point + (2 * point) / 3
  const chord = (110 / 297) * h
  const lead = h - chord
  const rolls = [1, 2, 3, 4, 5].map((i) => band2 + (i * (lead - band2)) / 5)
  const flat = m.clone()
  const corners = (m) => [...m.fold(line.through([c - 1, 0], [0, c - 1]), [0, 0]), ...m.fold(line.through([c + 1, 0], [w, c - 1]), [w, 0])]
  const pointDown = (m) => m.fold(line.horizontal(point), [c, 0])
  const bands = (m) => [...m.fold(line.horizontal(band1), [c, point + 1]), ...m.fold(line.horizontal(band2), [c, band1 + 1])]
  m.step(
    t('Find the centre', 'Наметьте середину', 'Marca el centro'),
    t(
      'Print side up, short edge at the top. Fold in half lengthwise, press the middle crease and open the sheet again.',
      'Печатью вверх, короткой стороной от себя. Сложите лист пополам вдоль, прогладьте сгиб и раскройте.',
      'Cara impresa hacia arriba y un borde corto lejos de ti. Dobla la hoja por la mitad a lo largo, marca el doblez y vuelve a abrirla.',
    ),
    (m) => m.fold(line.vertical(c), [w - 1, 10]),
    { reopen: true },
  )
  m.step(
    t('Corners in, 1 mm short', 'Углы к середине, не доходя 1 мм', 'Esquinas al centro, a 1 mm'),
    t(
      'Fold each top corner down so its edge stops 1 mm short of the centre crease. A 2 mm gap stays between them.',
      'Загните оба верхних угла так, чтобы их кромки не доходили до среднего сгиба на 1 мм. Между ними останется зазор 2 мм.',
      'Dobla las dos esquinas de arriba para que su borde quede a 1 mm del doblez central. Entre ellas queda un hueco de 2 mm.',
    ),
    corners,
  )
  m.step(
    t('Point down', 'Опустите кончик', 'Baja la punta'),
    t(
      'Fold the top point down to where the two corner tips meet. The fold runs ' + mm(point) + ' mm below the old top edge.',
      'Опустите верхний кончик туда, где сходятся концы углов. Сгиб пройдёт в ' + mm(point) + ' мм от прежнего верхнего края.',
      'Baja la punta hasta donde se juntan las puntas de las esquinas. El doblez queda a ' + mm(point) + ' mm del antiguo borde de arriba.',
    ),
    pointDown,
  )
  m.step(
    t('Fold the edge down twice', 'Дважды подогните край', 'Dobla el borde dos veces'),
    t(
      'Divide the distance from the top edge to the point into thirds. Fold the top edge down on the first third, then fold the band over once more along its lower edge.',
      'Разделите расстояние от верхнего края до кончика на три части. Опустите верхний край на первую треть, затем ещё раз перегните полосу по её нижнему краю.',
      'Divide en tres la distancia del borde de arriba a la punta. Dobla el borde hasta el primer tercio y luego vuelve a doblar la tira por su borde inferior.',
    ),
    bands,
  )
  m.step(
    t('Open everything', 'Раскройте всё', 'Ábrelo todo'),
    t(
      'Unfold the sheet completely. The band has left short creases across the corner flaps; the innermost pair is about 18 mm either side of the centre.',
      'Полностью раскройте лист. Полоса оставила короткие сгибы на угловых клапанах; самая внутренняя пара — примерно в 18 мм по обе стороны от середины.',
      'Despliega la hoja del todo. La tira ha dejado dobleces cortos sobre las esquinas; el par más interior queda a unos 18 mm a cada lado del centro.',
    ),
    (m) => {
      m.panels = m.clone(flat)
    },
    { view: 'open' },
  )
  m.step(
    t('Pre-crease the wing roots', 'Наметьте основания крыльев', 'Marca la base de las alas'),
    t(
      'Fold a long crease ' + mm(keel) + ' mm either side of the centre, parallel to it, for the full length of the sheet. Fold each one behind, then open.',
      'Наметьте два длинных сгиба в ' + mm(keel) + ' мм по обе стороны от середины, параллельно ей, по всей длине листа. Сгибайте назад и раскройте.',
      'Marca un doblez largo a ' + mm(keel) + ' mm a cada lado del centro, paralelo a él, a lo largo de toda la hoja. Dóblalos hacia atrás y vuelve a abrir.',
    ),
    (m) => [...m.fold(line.vertical(c - keel), [1, 10], { kind: 'mountain' }), ...m.fold(line.vertical(c + keel), [w - 1, 10], { kind: 'mountain' })],
    { reopen: true },
  )
  m.step(
    t('Refold the nose', 'Снова сложите нос', 'Vuelve a doblar la punta'),
    t(
      'Repeat the corners, the point and the two band folds on the creases you already have.',
      'Повторите углы, кончик и два подгиба полосы по уже намеченным сгибам.',
      'Repite las esquinas, la punta y los dos dobleces de la tira por las marcas que ya tienes.',
    ),
    (m) => [...corners(m), ...pointDown(m), ...bands(m)],
  )
  m.step(
    t('Start rolling', 'Начните скатывать', 'Empieza a enrollar'),
    t(
      'Mark ' + mm(chord) + ' mm up from the bottom edge on both sides. Roll the whole nose down tightly, keeping the root creases of every layer lined up.',
      'Отметьте ' + mm(chord) + ' мм от нижнего края с обеих сторон. Плотно скатайте весь нос вниз, совмещая сгибы оснований на всех слоях.',
      'Marca ' + mm(chord) + ' mm desde el borde de abajo en los dos lados. Enrolla toda la punta hacia abajo, bien apretada, con las marcas de la base alineadas en todas las capas.',
    ),
    (m) => m.fold(line.horizontal(rolls[0]), [c, band2 - 0.5], { tag: 'bar' }),
  )
  m.step(
    t('Roll to the mark', 'Скатайте до отметки', 'Enrolla hasta la marca'),
    t(
      'Keep rolling. The last roll must land exactly on the marks: five rolls in all. A ' + mm(chord) + ' mm deep wing is left, with a thick bar along its front.',
      'Продолжайте скатывать. Последний оборот должен лечь точно на отметки: всего пять оборотов. Останется крыло глубиной ' + mm(chord) + ' мм с толстым валиком спереди.',
      'Sigue enrollando. La última vuelta debe caer justo en las marcas: cinco vueltas en total. Queda un ala de ' + mm(chord) + ' mm de fondo con una barra gruesa delante.',
    ),
    (m) => rolls.slice(1).flatMap((y, i) => m.fold(line.horizontal(y), [c, rolls[i] + 0.5], { tag: 'bar' })),
  )
  const cutIn = 27 * sx,
    cutDown = 16 * sx
  m.step(
    t('Chamfer the tips', 'Срежьте уголки', 'Achaflana las puntas'),
    t(
      'Mark ' + mm(cutIn) + ' mm in from each front corner along the bar and ' + mm(cutDown) + ' mm down the side. Fold each corner in on the line between the marks.',
      'Отметьте ' + mm(cutIn) + ' мм от каждого переднего угла вдоль валика и ' + mm(cutDown) + ' мм вниз по боку. Загните каждый угол по линии между отметками.',
      'Marca ' + mm(cutIn) + ' mm desde cada esquina delantera a lo largo de la barra y ' + mm(cutDown) + ' mm hacia abajo por el lado. Dobla cada esquina por la línea entre las marcas.',
    ),
    (m) => [...m.fold(line.through([w - cutIn, lead], [w, lead + cutDown]), [w - 1, lead + 1]), ...m.fold(line.through([cutIn, lead], [0, lead + cutDown]), [1, lead + 1])],
  )
  return {
    folder: m,
    stock: m.stock(),
    closeKind: 'valley',
    close: {
      title: t('Fold in half', 'Сложите пополам', 'Dobla por la mitad'),
      instruction: t(
        'Fold the right half over onto the left along the centre crease, the bar inside.',
        'Сложите правую половину на левую по среднему сгибу, валиком внутрь.',
        'Dobla la mitad derecha sobre la izquierda por el doblez central, con la barra por dentro.',
      ),
    },
    wings: {
      title: t('Wings out', 'Раскройте крылья', 'Abre las alas'),
      instruction: t(
        'Fold the upper wing back out on its root crease, ' + mm(keel) + ' mm from the centre fold, through the nose layers. Turn over and fold the other wing to match.',
        'Отогните верхнее крыло обратно по сгибу основания, в ' + mm(keel) + ' мм от среднего сгиба, через все слои носа. Переверните и так же сложите второе.',
        'Vuelve a abrir el ala de arriba por su marca de la base, a ' + mm(keel) + ' mm del doblez central, con todas las capas de la punta. Dale la vuelta y dobla la otra igual.',
      ),
    },
    tips: {
      title: t('Fold the fins', 'Поднимите кили', 'Levanta las aletas'),
      instruction: t(
        'Fold the outer ' + mm(tips) + ' mm of each wing up into a fin, over the folded corner, against a ruler so it is straight. Give the wings a slight V and curl the back edges up a little.',
        'Поднимите внешние ' + mm(tips) + ' мм каждого крыла вверх, поверх загнутого уголка, по линейке, чтобы кили были ровными. Придайте крыльям лёгкую букву V и чуть подогните задние кромки вверх.',
        'Dobla hacia arriba los ' + mm(tips) + ' mm exteriores de cada ala para hacer una aleta, sobre la esquina doblada y con una regla para que quede recta. Dale a las alas una V ligera y levanta un poco los bordes de atrás.',
      ),
    },
  }
}

// --- Crescent Boomerang ---------------------------------------------------------------------
function crescentBoomerang({ w, h, keel, tips, t, mm }) {
  const m = new Folder(w, h)
  const c = w / 2
  const sx = w / 210,
    sy = h / 297
  const mark = 53 * sy
  const tip = (h - mark) / 2
  const shoulder = tip + c - 1
  const edgeAt = (c - 1) * Math.tan(Math.PI / 8) - 1
  const lockAt = tip + 79 * sy
  m.step(
    t('Find the centre', 'Наметьте середину', 'Marca el centro'),
    t(
      'Print side up, short edge at the top. Fold the sheet in half lengthwise, behind, and open it again.',
      'Печатью вверх, короткой стороной от себя. Сложите лист пополам вдоль, назад, и раскройте.',
      'Cara impresa hacia arriba y un borde corto lejos de ti. Dobla la hoja por la mitad a lo largo, hacia atrás, y vuelve a abrirla.',
    ),
    (m) => m.fold(line.vertical(c), [w - 1, 10], { kind: 'mountain' }),
    { reopen: true },
  )
  m.step(
    t('Corners in, 1 mm short', 'Углы к середине, не доходя 1 мм', 'Esquinas al centro, a 1 mm'),
    t(
      'Fold each top corner down so its top edge stops 1 mm short of the centre crease. A 2 mm flat stays at the top.',
      'Загните оба верхних угла так, чтобы их кромки не доходили до среднего сгиба на 1 мм. Наверху останется площадка 2 мм.',
      'Dobla las dos esquinas de arriba para que su borde quede a 1 mm del doblez central. Arriba queda un tramo plano de 2 mm.',
    ),
    (m) => [...m.fold(line.through([c - 1, 0], [0, c - 1]), [0, 0]), ...m.fold(line.through([c + 1, 0], [w, c - 1]), [w, 0])],
  )
  m.step(
    t('Tip down to the mark', 'Кончик к отметке', 'La punta hasta la marca'),
    t(
      'Mark the centre crease ' + mm(mark) + ' mm from the bottom edge. Fold the whole top down so the tip lands on the mark.',
      'Отметьте на среднем сгибе ' + mm(mark) + ' мм от нижнего края. Опустите весь верх так, чтобы кончик лёг на отметку.',
      'Marca el doblez central a ' + mm(mark) + ' mm del borde de abajo. Baja toda la parte de arriba hasta que la punta toque la marca.',
    ),
    (m) => m.fold(line.horizontal(tip), [c, 0], { tag: 'v' }),
  )
  const left = line.through([c - 1, tip], [0, shoulder]),
    right = line.through([c + 1, tip], [w, shoulder])
  m.step(
    t('New corners in, then open', 'Новые углы к середине и раскройте', 'Esquinas nuevas al centro y abre'),
    t(
      'Fold the two new top corners in to 1 mm from the centre, through all layers. Crease firmly and open them again.',
      'Загните два новых верхних угла к середине, не доходя 1 мм, через все слои. Хорошо прогладьте и раскройте.',
      'Lleva las dos esquinas nuevas de arriba a 1 mm del centro, con todas las capas. Marca bien y vuelve a abrirlas.',
    ),
    (m) => [...m.fold(left, [1, tip + 2]), ...m.fold(right, [w - 1, tip + 2])],
    { reopen: true },
  )
  m.step(
    t('Outer edges to the creases', 'Края к сгибам', 'Bordes hasta las marcas'),
    t(
      'Fold each long outer edge in to the crease you just made, stopping 1 mm short of it. The lower part of the sheet stays flat.',
      'Загните каждый длинный внешний край к только что намеченному сгибу, не доходя до него 1 мм. Нижняя часть листа остаётся плоской.',
      'Dobla cada borde largo exterior hasta la marca que acabas de hacer, a 1 mm de ella. La parte de abajo de la hoja queda plana.',
    ),
    (m) => [
      ...m.fold(line.through([0, shoulder], [edgeAt, tip]), [0.5, tip + (c - 1) / 2], { tag: 'edge' }),
      ...m.fold(line.through([w, shoulder], [w - edgeAt, tip]), [w - 0.5, tip + (c - 1) / 2], { tag: 'edge' }),
    ],
  )
  m.step(
    t('Fold the corners in again', 'Снова загните углы', 'Vuelve a doblar las esquinas'),
    t(
      'Refold on the creases from step 4, carrying the edge strips inside. The leading edges are now doubled.',
      'Снова сложите по сгибам из шага 4, убирая полоски внутрь. Передние кромки стали двойными.',
      'Vuelve a doblar por las marcas del paso 4, con las tiras por dentro. Los bordes delanteros quedan dobles.',
    ),
    (m) => [...m.fold(left, [1, tip + 2], { tag: 'flap' }), ...m.fold(right, [w - 1, tip + 2], { tag: 'flap' })],
  )
  m.step(
    t('Lock the flaps', 'Закрепите клапаны', 'Bloquea las solapas'),
    t(
      'Fold the small tip that shows below the flaps up as far as it goes and tuck it under their edges. The flaps no longer spring open.',
      'Поднимите маленький кончик, который виден под клапанами, до упора и заправьте его под их кромки. Клапаны больше не раскрываются.',
      'Sube hasta el tope la puntita que asoma por debajo de las solapas y métela bajo sus bordes. Las solapas ya no se abren.',
    ),
    (m) => m.fold(line.horizontal(lockAt), [c, lockAt + 40 * sy], { select: (p) => p.tags.includes('v') && !p.tags.includes('edge') && !p.tags.includes('flap'), tag: 'lock' }),
  )
  const noseDepth = 10 * sx
  return {
    folder: m,
    stock: m.stock(),
    close: {
      title: t('Close the body', 'Сложите корпус', 'Cierra el cuerpo'),
      instruction: t(
        'Fold the right half behind the left along the centre crease. The flaps stay on the outside.',
        'Отогните правую половину назад под левую по среднему сгибу. Клапаны остаются снаружи.',
        'Dobla la mitad derecha por detrás de la izquierda siguiendo el doblez central. Las solapas quedan por fuera.',
      ),
    },
    root: [
      [c - noseDepth, tip + 9 * sy],
      [c - keel, h],
    ],
    wings: {
      title: t('Fold one wing, then match its twin', 'Сложите крылья по очереди', 'Dobla un ala y luego la otra'),
      instruction: t(
        'Mark ' + mm(noseDepth) + ' mm from the centre fold at the nose and ' + mm(keel) + ' mm at the tail. Fold the upper wing down on that line against a ruler. Turn over and fold the other wing to match.',
        'Отметьте ' + mm(noseDepth) + ' мм от среднего сгиба у носа и ' + mm(keel) + ' мм у хвоста. Отогните верхнее крыло по этой линии вдоль линейки. Переверните и так же сложите второе.',
        'Marca ' + mm(noseDepth) + ' mm desde el doblez central en la punta y ' + mm(keel) + ' mm en la cola. Dobla el ala de arriba por esa línea con una regla. Dale la vuelta y dobla la otra igual.',
      ),
    },
    tips: {
      title: t('Winglets and tail', 'Законцовки и хвост', 'Aletas y cola'),
      instruction: t(
        'Fold the outer ' + mm(tips) + ' mm of each wing back up into a winglet, against a ruler. Bend both back edges up for the elevator: the more bend, the tighter it circles.',
        'Поднимите внешние ' + mm(tips) + ' мм каждого крыла вверх по линейке. Отогните обе задние кромки вверх: чем сильнее изгиб, тем меньше круг.',
        'Dobla hacia arriba los ' + mm(tips) + ' mm exteriores de cada ala para hacer una aleta, con una regla. Levanta los dos bordes de atrás: cuanto más los dobles, más cerrado será el círculo.',
      ),
    },
  }
}

// --- Sky King -------------------------------------------------------------------------------
function skyKing({ w, h, keel, tips, t, mm }) {
  const m = new Folder(w, h)
  const c = w / 2
  const sy = h / 297
  const gap = 25 * sy
  const down = (h - gap) / 2
  const shoulder = down + c
  const sideTop = [c * Math.tan(Math.PI / 8), down]
  const sideLine = line.through([0, shoulder], sideTop)
  // The side flap's corner lands on the corner crease; the nose folds back where it starts.
  const flapTip = reflectPoint([0, down], sideLine)
  const noseMark = flapTip[1]
  const noseLine = (down + flapTip[1]) / 2
  const left = line.through([c, down], [0, shoulder]),
    right = line.through([c, down], [w, shoulder])
  // The model is turned over before it is folded in half, so start with the print face down: the
  // printed bands then end up on top of the wings.
  m.turnOver()
  m.step(
    t('Find the centre', 'Наметьте середину', 'Marca el centro'),
    t(
      'Print side down, short edge at the top. Fold in half lengthwise, press the middle crease and open the sheet again.',
      'Печатью вниз, короткой стороной от себя. Сложите лист пополам вдоль, прогладьте сгиб и раскройте.',
      'Cara impresa hacia abajo y un borde corto lejos de ti. Dobla la hoja por la mitad a lo largo, marca el doblez y vuelve a abrirla.',
    ),
    (m) => m.fold(line.vertical(c), [w - 1, 10]),
    { reopen: true },
  )
  m.step(
    t('Bring the corners to the centre', 'Сведите углы к середине', 'Lleva las esquinas al centro'),
    t(
      'Fold both top corners in so their edges meet on the centre crease.',
      'Загните оба верхних угла так, чтобы их кромки встретились на среднем сгибе.',
      'Dobla las dos esquinas de arriba para que sus bordes se junten en el doblez central.',
    ),
    (m) => [...m.fold(line.through([c, 0], [0, c]), [0, 0]), ...m.fold(line.through([c, 0], [w, c]), [w, 0])],
  )
  m.step(
    t('Point down', 'Опустите кончик', 'Baja la punta'),
    t(
      'Fold the point down so its tip stops ' + mm(gap) + ' mm above the bottom edge.',
      'Опустите кончик так, чтобы он не доходил до нижнего края на ' + mm(gap) + ' мм.',
      'Baja la punta hasta que quede a ' + mm(gap) + ' mm del borde de abajo.',
    ),
    (m) => m.fold(line.horizontal(down), [c, 0], { tag: 'v' }),
  )
  m.step(
    t('Corners in, then open', 'Углы к середине и раскройте', 'Esquinas al centro y abre'),
    t(
      'Fold the new top corners in to the centre through all layers, crease well and open them again.',
      'Загните новые верхние углы к середине через все слои, хорошо прогладьте и раскройте.',
      'Lleva al centro las esquinas nuevas de arriba con todas las capas, marca bien y vuelve a abrirlas.',
    ),
    (m) => [...m.fold(left, [1, down + 2]), ...m.fold(right, [w - 1, down + 2])],
    { reopen: true },
  )
  m.step(
    t('Sides to the creases', 'Бока к сгибам', 'Los lados hasta las marcas'),
    t(
      'Fold each side edge in so it lies along the crease you just made.',
      'Загните каждый боковой край так, чтобы он лёг вдоль только что намеченного сгиба.',
      'Dobla cada borde lateral hasta que quede sobre la marca que acabas de hacer.',
    ),
    (m) => [...m.fold(sideLine, [0.5, down + c / 2]), ...m.fold(line.through([w, shoulder], [w - sideTop[0], down]), [w - 0.5, down + c / 2])],
  )
  m.step(
    t('Corners in again', 'Снова загните углы', 'Vuelve a doblar las esquinas'),
    t(
      'Refold the corners on the creases from step 4, carrying the side flaps inside. The two flap edges meet in a slit along the centre.',
      'Снова загните углы по сгибам из шага 4, убирая боковые клапаны внутрь. Кромки клапанов сойдутся щелью по середине.',
      'Vuelve a doblar las esquinas por las marcas del paso 4, con las solapas laterales por dentro. Sus bordes se juntan en una ranura en el centro.',
    ),
    (m) => [...m.fold(left, [1, down + 2]), ...m.fold(right, [w - 1, down + 2])],
  )
  m.step(
    t('Mark the nose', 'Наметьте нос', 'Marca la punta'),
    t(
      'Fold the nose tip down to the end of the slit, crease and open again.',
      'Опустите кончик носа до конца щели, прогладьте и раскройте.',
      'Baja la punta hasta el final de la ranura, marca y vuelve a abrir.',
    ),
    (m) => m.fold(line.horizontal(noseMark), [c, down + 1]),
    { reopen: true },
  )
  m.step(
    t('Turn over', 'Переверните', 'Dale la vuelta'),
    t(
      'Turn the model over, left to right, so the print faces up. The nose still points away.',
      'Переверните модель слева направо, печатью вверх. Нос по-прежнему от вас.',
      'Dale la vuelta de izquierda a derecha, con la cara impresa hacia arriba. La punta sigue lejos de ti.',
    ),
    (m) => m.turnOver(),
    { view: 'turn' },
  )
  // The squashed nose leaves the tip folded back inside along noseLine. The open stock carries that
  // flat result; the steps fold it on the closed body.
  const open = m.stock()
  m.fold(line.horizontal(noseLine), [c, down + 1])
  return {
    folder: m,
    open,
    stock: m.stock(),
    close: {
      title: t('Fold in half', 'Сложите пополам', 'Dobla por la mitad'),
      instruction: t(
        'Fold the right half behind the left along the centre. The flaps end up outside.',
        'Отогните правую половину назад под левую по середине. Клапаны окажутся снаружи.',
        'Dobla la mitad derecha por detrás de la izquierda por el centro. Las solapas quedan por fuera.',
      ),
    },
    extras: [
      {
        title: t('Blunt the nose', 'Затупите нос', 'Achata la punta'),
        instruction: t(
          'Fold the tip back ' + mm(noseLine - down) + ' mm, crease, open, and push it inside between the layers (an inside reverse fold). The front is now blunt.',
          'Отогните кончик назад на ' + mm(noseLine - down) + ' мм, прогладьте, раскройте и вдавите его внутрь между слоями (обратная складка). Нос стал тупым.',
          'Dobla la punta ' + mm(noseLine - down) + ' mm hacia atrás, marca, abre y empújala hacia dentro entre las capas (un doblez invertido). La punta queda roma.',
        ),
        ops: [{ line: line.horizontal(noseLine), toward: [c - 2, down + 1] }],
      },
      {
        title: t('Squash the nose', 'Расплющите нос', 'Aplasta la punta'),
        instruction: t(
          'Open the reversed tip into a pocket and squash it flat into a small square on the front. Pull the square’s tip down halfway and flatten it again. Its top edge marks where the wings fold.',
          'Раскройте вывернутый кончик кармашком и расплющите его в маленький квадрат спереди. Опустите кончик квадрата до половины и снова прижмите. Верхний край квадрата показывает, где сгибать крылья.',
          'Abre la punta invertida como un bolsillo y aplástala en un cuadradito delante. Baja la punta del cuadrado hasta la mitad y vuelve a aplanarla. Su borde de arriba marca dónde doblar las alas.',
        ),
        ops: [],
        view: 'shape',
      },
    ],
    wings: {
      title: t('Fold one wing, then match its twin', 'Сложите крылья по очереди', 'Dobla un ala y luego la otra'),
      instruction: t(
        'Fold the upper wing down along the top of the square, parallel to the keel and ' + mm(keel) + ' mm from it. Turn over and fold the other wing to match.',
        'Отогните верхнее крыло по верху квадрата, параллельно килю, в ' + mm(keel) + ' мм от него. Переверните и так же сложите второе.',
        'Dobla el ala de arriba por el borde superior del cuadrado, paralela a la quilla y a ' + mm(keel) + ' mm de ella. Dale la vuelta y dobla la otra igual.',
      ),
    },
    tips: {
      title: t('Fins and elevator', 'Кили и руль высоты', 'Aletas y timón'),
      instruction: t(
        'Fold the outer ' + mm(tips) + ' mm of each wing up into a fin, parallel to the centre line. From behind: a shallow V, fins upright. Curl the back edges up slightly.',
        'Поднимите внешние ' + mm(tips) + ' мм каждого крыла вверх, параллельно середине. Сзади — неглубокая буква V и вертикальные кили. Слегка подогните задние кромки вверх.',
        'Dobla hacia arriba los ' + mm(tips) + ' mm exteriores de cada ala, en paralelo al centro. Desde atrás: una V suave y las aletas rectas. Levanta un poco los bordes de atrás.',
      ),
    },
  }
}

export const recordBuilders = {
  'red-dart': redDart,
  'shaheen-shin': shaheenShin,
  'crescent-boomerang': crescentBoomerang,
  'sky-king': skyKing,
}
