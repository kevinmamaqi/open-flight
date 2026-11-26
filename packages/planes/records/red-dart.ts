// Red Dart: Lazar Krstić's distance plane, winner of Red Bull Paper Wings 2022 with 61.11 m.
// Fold sequence from Foldable Flight's tutorial and line template (A4 measurements 148 mm,
// 45.5 mm and 195 mm), reconstructed by reflecting layers and checked against frames. Every fold
// after the first pivots on one point, P2, which becomes the nose.
// A4 portrait, origin top-left, y down.

import { line, reflect, centroid, type Model, type P } from './engine.ts'
import type { RecordPlane } from './sheet.ts'

const P2: P = [104.65, 105.35] // on the diagonal fold, 148 mm from the corner (0, 210)
const P1: P = [45.5, 297] // on the bottom edge, 45.5 mm from the corner
const A: P = [140.85, 297] // 195 mm from P2 along the raw edge
const B: P = [93.67, 300.04] // 195 mm from P2 along the folded edge
const T: P[] = [P2, A, B] // the core triangle that everything is wrapped around
const M: P = [117.26, 298.52] // middle of the back edge A–B
const axisTilt = (Math.atan2(M[0] - P2[0], M[1] - P2[1]) * 180) / Math.PI // turn so the axis points down the page
const length = Math.hypot(M[0] - P2[0], M[1] - P2[1])
const tailKeel = 11.8

function turn(p: P, deg: number): P {
  const a = (deg * Math.PI) / 180
  const dx = p[0] - P2[0],
    dy = p[1] - P2[1]
  return [P2[0] + dx * Math.cos(a) - dy * Math.sin(a), P2[1] + dx * Math.sin(a) + dy * Math.cos(a)]
}

export const redDart: RecordPlane = {
  id: 'red-dart',
  name: 'Red Dart',
  claim: 'Distance winner, Red Bull Paper Wings World Final 2022: 61.11 metres',
  designer: 'Lazar Krstić',
  paper: 'A4',
  facts: [
    ['Event', 'Red Bull Paper Wings World Final, Hangar-7, Salzburg, 14 May 2022'],
    ['Result', 'Distance: 1st Lazar Krstić (Serbia) 61.11 m; 2nd Yicheng Sun (UK) 57.07 m; 3rd Abduaziz Omonillaev (Uzbekistan) 54.82 m'],
    ['Record', 'Guinness lists 61.11 m as the farthest throw at the Red Bull Paper Plane Championship. The overall distance record is held by other designs: 98.43 m in Shanghai, December 2025.'],
    ['Rules', 'Distance planes had to be folded from one standard A4 sheet'],
    ['Designer', 'Lazar Krstić, who came second in 2019 with 52.28 m and then refined the plane, his throw and his strength'],
    ['Name', '“Red Dart” is Foldable Flight’s name for it'],
  ],
  origin: [
    'Krstić threw 57.13 m with his first attempt and 61.11 m with his second, a little over 200 feet. In 2019 he had come second with 52.28 m; Red Bull reports that in between he refined the plane design, the throw and his physique, adding 10 kg.',
    'Almost nothing about this plane is a wing. The whole A4 sheet is wrapped, layer over layer, into a long, thin triangle about 19 cm long and barely 2.5 cm wide at the tail. Foldable Flight calls it “as much a dart as a dart can get”.',
    'The fold is clever geometry. Every crease after the first passes through one point marked on the first fold, 148 mm from its end. That point becomes the nose, and each wrap stacks more paper toward it.',
  ],
  aero: [
    'A distance throw is mostly a ballistic flight. The arm gives the plane all its energy in a fraction of a second (a hard competition throw is often quoted at around 25 m/s; we have not measured one), and from then on drag spends it. A glider with big wings would climb, slow down and float; a dart keeps the speed and lets it carry. The aim is the least drag for the energy you can put in.',
    (e) =>
      `So this plane has almost no wing: ${e.area_cm2.toFixed(0)} cm² for ${e.mass_g.toFixed(1)} g of paper, a wing loading of ${e.loading_n_m2.toFixed(0)} N/m², several times that of the airtime and boomerang planes. Its frontal area is a few square centimetres, and the rolled layers give it a hard, smooth, rigid body that does not flutter or bend at throwing speed.`,
    (e) =>
      `The wraps put the mass forward. About ${e.layers_at_nose} layers lie through the front of the body, so the balance point sits ${Math.round(e.balance_mm)} mm behind the nose on a ${Math.round(e.length_mm)} mm plane, ahead of the small wings. A dart balanced that far forward points itself along its flight path like an arrow: it does not need to glide, only to fly straight.`,
    'The long, shallow keel helps too. It is a vertical surface behind the balance point, so it keeps the nose pointed where it is going, and it gives the thrower something firm to grip and push.',
  ],
  throwing: [
    'The tutorial tests three grips. Normal hold: 136–150 ft (41–46 m). Krstić’s grip, plane upside down with a finger on the back edge: 148–164 ft (45–50 m). A hybrid, normal hold with the index finger on the back edge: 164–189 ft (50–58 m), the presenter’s best.',
    'The finger on the back edge lets the whole arm push the plane along its axis, like a javelin, instead of pinching it from the side.',
  ],
  trim: [
    'The tutorial gives no trim advice. Precision is the trim: tight, even wraps and straight wing creases keep it flying straight.',
    'If it curves, look from behind and make the two wings match before bending anything.',
  ],
  sources: [
    { label: 'Red Bull, World Final 2022 results', url: 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results', says: 'distance podium, Krstić’s two throws and his 2019 result; A4 rule for distance planes' },
    { label: 'Guinness World Records, farthest throw at the Red Bull Paper Plane Championship', url: 'https://www.guinnessworldrecords.com/world-records/729614-farthest-throw-at-the-red-bull-paper-plane-championship', says: 'Lazar Krstić, 61.11 m, 14 May 2022' },
    { label: 'Guinness World Records, farthest flight by a paper aircraft', url: 'https://www.guinnessworldrecords.com/world-records/farthest-flight-by-a-paper-aircraft', says: 'current overall record, 98.43 m, Shanghai, 28 December 2025' },
    { label: 'Foldable Flight line template (free PDF)', url: 'https://bit.ly/RedDartLineTemplate', says: 'A4 at 85%; the fold-to line matches the 148 mm and 45.5 mm marks' },
  ],
  tutorial: { label: 'Foldable Flight, “BEST Easy Dart”, 20 August 2022', url: 'https://www.youtube.com/watch?v=4D6HZRaVFF8' },
  rights:
    'Open Flight’s version, Needle, is based on Lazar Krstić’s Red Dart. The diagrams, text and art are original Open Flight work, drawn from the fold geometry; the fold sequence is derived from the credited design. Nothing is copied from the videos, the line template or any book. Red Bull, Guinness and the name Red Dart appear only as factual references; there is no endorsement.',
  uncertain: [
    'The exact layer order inside the first wraps; the diagrams follow the outline the tutorial shows.',
    'Steps 11–12 (wrapping the leftover triangle round the keel and tucking its tab into a pocket) are three-dimensional and shown in words only. Watch 10:54–14:13 of the tutorial for them.',
    'With the printed template the tutorial says to measure 161 mm instead of 195 mm; simple 85% scaling would give 166 mm.',
    'Whether Krstić’s own plane matches this tutorial fold in every detail.',
  ],
  build(m: Model) {
    const tc = centroid(T)
    const out = (p: P, q: P) => reflect(tc, [p, q])
    // Fold everything on the far side of a core edge over it; skip when nothing is there.
    const over = (m: Model, p: P, q: P) => {
      try {
        return m.fold([p, q], out(p, q), { tag: 'wrap' })
      } catch {
        return []
      }
    }
    m.step('Diagonal', 'Fold the top edge down onto the right edge. The crease runs from the top-right corner.', (m) => m.fold(line.through([210, 0], [0, 210]), [0, 0]))
    m.mark(P2, '148')
    m.mark(P1, '45.5')
    m.guide(P2, P1)
    m.step(
      'Fold to a pencil line',
      'Mark the folded edge 148 mm from its lower end, and the bottom edge 45.5 mm from the left corner. Join the marks with a pencil line and fold the lower-left part over on it.',
      (m) => m.fold(line.through(P2, P1), [0, 297]),
      { check: 'Every later crease passes through the 148 mm mark. It becomes the nose.' },
    )
    m.step(
      'Fold the edge onto the layers',
      'Open the layers slightly and fold the new folded edge over onto the raw edge underneath it, pivoting on the nose point. Wrap the layers as tightly as you can.',
      (m) => {
        const a = (93.23 * Math.PI) / 180
        return m.fold([P2, [P2[0] + Math.cos(a), P2[1] + Math.sin(a)]], [89.9, 153.1])
      },
    )
    m.mark(A, '195')
    m.mark(B, '195')
    m.guide(A, B)
    m.step(
      'Mark the core',
      'Measure 195 mm from the nose along both long edges and join the marks. Crease the line both ways, then open it. This narrow triangle is the core of the plane.',
      (m) => over(m, A, B),
      { reopen: true, check: 'Long sides 195 mm, back edge about 47 mm.' },
    )
    m.step('Tuck the back', 'Fold whatever sticks out past the back line inside, over the line.', (m) => over(m, A, B))
    m.step(
      'First wrap',
      'Fold everything outside the core over its right long side, all layers together. Tuck anything that crosses the back line inside again.',
      (m) => [...over(m, P2, A), ...over(m, A, B)],
    )
    m.step(
      'Second wrap',
      'Now fold everything outside over the left long side, turning the same way as before. Tuck the back again.',
      (m) => [...over(m, P2, B), ...over(m, A, B)],
    )
    m.step(
      'Keep wrapping',
      'Keep wrapping the remaining flap round the core, side after side, as tightly as you can. Stop when the small free triangle near the nose is covered.',
      (m) => [...over(m, P2, A), ...over(m, P2, B), ...over(m, P2, A), ...over(m, P2, B)],
      { check: 'A stiff, layered triangle with one loose two-layer flap left over.' },
    )
    m.rotate(axisTilt, P2)
    const c = P2[0]
    const tail = P2[1] + length
    const stock = m.clone()
    m.step('Fold in half', 'Fold the core in half along its middle, bringing one long side onto the other. The loose flap goes with it.', (m) => m.fold(line.vertical(c), [c + 5, P2[1] + 60], { tag: 'top' }))
    const rootTail: P = [c - tailKeel, tail]
    m.step(
      'First wing',
      'Fold the top long edge down to the centre fold. Crease from the middle toward the tail; near the nose, roll the layers as far as they will go.',
      (m) => m.fold(line.through(P2, rootTail), [c - 15, tail - 5], { select: (p) => p.tags.includes('top') }),
      { check: 'At the tail the wing is about 12 mm wide; at the nose it fades to nothing.' },
    )
    m.step(
      'Second wing',
      'Turn over, keep the layers tight, and fold the other wing to match. Flatten both wings.',
      (m) => m.fold(line.through(P2, rootTail), [c - 15, tail - 5], { select: (p) => !p.tags.includes('top'), kind: 'mountain' }),
    )
    m.step(
      'Lock the body',
      'Wrap the loose flap tightly round the keel and the wing roots. When it cannot make another full turn, fold it straight across the body, then fold its tip into a tab and tuck it into the pocket between the layers. A pencil helps open the pocket.',
      (m) => {
        // Seen from the side, wrapping the flap round the body is a series of folds over its two edges.
        const moves = []
        const edges = [c, c - tailKeel - 0.4]
        for (let i = 0; i < 10; i++) {
          const b = m.bbox()
          if (b.x1 <= c + 0.5 && b.x0 >= edges[1] - 0.5) break
          const x = edges[i % 2]
          try {
            moves.push(...m.fold(line.vertical(x), [i % 2 ? x - 60 : x + 60, P2[1] + 40], { tag: 'lock' }))
          } catch {
            continue
          }
        }
        return moves
      },
      { check: 'Nothing flaps loose; the body is hard and smooth.' },
    )
    const core = T.map((p) => turn(p, axisTilt))
    return {
      stock,
      finish: {
        centre: c,
        root: [P2, rootTail] as [P, P],
        dihedral_deg: 0,
        gsm: 80,
        wingWithin: core,
        probes: [
          [c - 1.5, P2[1] + 30],
          [c + 1.5, P2[1] + 30],
        ] as P[],
      },
    }
  },
}
