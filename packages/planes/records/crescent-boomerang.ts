// Crescent Boomerang: the returning plane from the winning aerobatics routine at Red Bull Paper
// Wings 2022 (Seunghoon Lee, South Korea). Fold sequence from Foldable Flight's tutorial, checked
// frame by frame. Designer not established: the same fold appears in a 2018 WePlay video.
// Sheet coordinates: A4 portrait, origin top-left, y down; the face you fold on is the front.

import { line, type Model, type P } from './engine.ts'
import type { RecordPlane } from './sheet.ts'

const W = 210,
  H = 297,
  c = W / 2

export const crescentBoomerang: RecordPlane = {
  id: 'crescent-boomerang',
  name: 'Crescent Boomerang',
  claim: 'The returning plane from the winning aerobatics routine, Red Bull Paper Wings World Final 2022',
  designer: 'not established (see sources)',
  paper: 'A4',
  facts: [
    ['Event', 'Red Bull Paper Wings World Final, Hangar-7, Salzburg, 14 May 2022'],
    ['Category', 'Aerobatics: a 60-second routine scored on creativity, flight performance and technical skill'],
    ['Result', '1st Seunghoon Lee (South Korea), 46 points; 2nd Seng Fatt Beh, 42; 3rd Taiga Kimura, 41'],
    ['Pilot', 'Seunghoon Lee, a science teacher in Korea, who runs the WePlay channel'],
    ['Designer', 'Not named anywhere we could find. WePlay published the same fold in 2018'],
    ['Name', '“Crescent Boomerang” appears to be Foldable Flight’s name for it'],
  ],
  origin: [
    'Aerobatics is the strangest of the three Paper Wings categories. Pilots get one minute to perform, and judges score the show, not a distance or a time. In 2022 Seunghoon Lee won it in a tuxedo, with magician’s choreography and planes that twirled, flapped and came back to his hand. This is the boomerang he threw.',
    'The fold is a dart with a heavy, locked nose, small upturned winglets and a strongly bent-up tail. Nothing in it is exotic. What makes it return is how it is thrown: on its side, wings vertical, like a frisbee standing on edge.',
    'A YouTube Short by HaoTo teaches the same plane with three small changes: no 1 mm gaps at the centre, the tip folded down by eye, and a 2.5 cm wing line at the tail instead of 2.4 cm.',
  ],
  aero: [
    (e) => {
      const r = (cl: number) => (2 * e.mass_g * 1e-3) / (1.2 * e.area_cm2 * 1e-4 * cl)
      return `Why it comes back. A plane turns by tilting its lift. Thrown with its wings vertical, all of its lift points sideways, toward the centre of a circle, so it flies round instead of away. Lift is ½ρv²·S·CL and the force needed to hold a circle is m·v²/r. The speeds cancel: r = 2m / (ρ·S·CL). The size of the circle depends on the plane’s mass, its wing area and how hard the wing is working, not on how hard you throw. With ${e.mass_g.toFixed(1)} g of paper and ${e.area_cm2.toFixed(0)} cm² of wing, the radius is about ${r(1.0).toFixed(1)} m at CL 1.0 and ${r(0.6).toFixed(1)} m at CL 0.6, before drag slows it and it sinks.`
    },
    'The bent-up tail sets CL. Turning the back edges up is an elevator: it pushes the tail down and the nose up, so the wing flies at a steeper angle and makes more lift for its size. More bend, higher CL, smaller circle. That is why the tutorial uses the elevator, not the throw, to tune the return.',
    (e) =>
      `The folds stack paper in the front half, yet the balance point (${Math.round(e.balance_mm)} mm behind the nose) still sits close to the centre of lift (${Math.round(e.neutral_mm)}–${Math.round(e.area_centroid_mm)} mm). Its pitch stability is modest, so the bent-up tail does two jobs: it holds the nose up so the plane does not dive, and the harder it works, the tighter the circle. The winglets are small fins at the back that keep the nose pointed along the circle. Flat or slightly drooped wings (no V) matter too: a V would roll the plane level again, and a level plane flies away instead of round.`,
  ],
  throwing: [
    'Hold the body between thumb and fingers with the wings vertical, never flat.',
    'Keep the arm still and turn the body: wind up to the side and release about chest high, roughly level.',
    'WePlay’s 2018 version says to stand at about 60° to where you throw. Try a few angles and keep the one that returns.',
  ],
  trim: [
    'Bend both back edges up. Small bumps in the middle give a wide circle that may not close; bends along the whole edge give a tighter return.',
    'Fold the wing roots and winglets against a ruler. A wavy crease changes the circle from throw to throw.',
    'Hold the wings flat along the back edge. If it does not come all the way back, let them droop a little.',
  ],
  sources: [
    { label: 'Red Bull, World Final 2022 results', url: 'https://www.redbull.com/int-en/red-bull-paper-wings-world-final-results', says: 'Seunghoon Lee (KOR) first in aerobatics with 46 points; routine and scoring described' },
    { label: 'WePlay (2018), easy boomerang plane', url: 'https://www.youtube.com/watch?v=qP8FrPScgos', says: 'same fold sequence, retitled later as the aerobatics champion’s boomerang; no designer named' },
    { label: 'HaoTo, YouTube Short (2024)', url: 'https://www.youtube.com/watch?v=8-IgPGEBzXg', says: 'same plane, simplified, shown with 2022 World Final footage' },
  ],
  tutorial: { label: 'Foldable Flight, “Easy Boomerang”, 28 May 2022, with Seunghoon Lee demonstrating the throw', url: 'https://www.youtube.com/watch?v=PAp6CToFr3Y' },
  rights:
    'Open Flight’s version, Homecoming, is based on the Crescent Boomerang flown by Seunghoon Lee (designer not established). The diagrams, text and art are original Open Flight work, drawn from the fold geometry; the fold sequence is derived from the credited design. Nothing is copied from the videos or any template. Red Bull and the name Crescent Boomerang appear only as factual references; there is no endorsement.',
  uncertain: [
    'Who designed it. Both videos credit the routine, not a designer.',
    'Whether the lock tip tucks under the edges of the big flaps (most likely) or lies on top. The diagram shows the result on top for clarity.',
    'Which way it circles. It depends on which hand throws and which way the wings face; the demonstration frames do not settle it.',
  ],
  build(m: Model) {
    m.step('Centre crease', 'Fold the sheet in half lengthwise, behind, and open it again.', (m) => m.fold(line.vertical(c), [W - 1, 10], { kind: 'mountain' }), { reopen: true })
    m.step(
      'Top corners in, 1 mm short',
      'Fold each top corner down so its top edge stops 1 mm short of the centre crease.',
      (m) => [...m.fold(line.through([c - 1, 0], [0, c - 1]), [0, 0]), ...m.fold(line.through([c + 1, 0], [W, c - 1]), [W, 0])],
      { check: 'A 2 mm flat sits at the top between the two triangles.' },
    )
    m.mark([c, H - 53], '53 mm')
    m.step(
      'Tip down to the 53 mm mark',
      'Mark the centre crease 53 mm from the bottom edge. Fold the whole top down so the tip lands on the mark.',
      (m) => m.fold(line.horizontal(122), [c, 0], { tag: 'v' }),
      { check: 'The fold line sits 122 mm below the old top edge.' },
    )
    m.step(
      'New corners in, then open',
      'Fold the two new top corners in to 1 mm from the centre, through all layers. Crease firmly and open them again.',
      (m) => [...m.fold(line.through([c - 1, 122], [0, 226]), [1, 124]), ...m.fold(line.through([c + 1, 122], [W, 226]), [W - 1, 124])],
      { reopen: true },
    )
    m.step(
      'Outer edges to the new creases',
      'Fold each long outer edge in to the crease you just made, stopping 1 mm short of it.',
      (m) => [...m.fold(line.through([0, 226], [42, 122]), [0.5, 200], { tag: 'edge' }), ...m.fold(line.through([W, 226], [W - 42, 122]), [W - 0.5, 200], { tag: 'edge' })],
      { check: 'Two narrow wedges lie along the sides. The lower part of the sheet stays flat.' },
    )
    m.step(
      'Fold the corners in again',
      'Refold on the creases from step 4, carrying the wedges inside. The leading edges are now doubled.',
      (m) => [...m.fold(line.through([c - 1, 122], [0, 226]), [1, 124], { tag: 'flap' }), ...m.fold(line.through([c + 1, 122], [W, 226]), [W - 1, 124], { tag: 'flap' })],
      { check: 'Shoulders about 104 mm below the nose; the tip of the first flap shows below.' },
    )
    m.step(
      'Lock the flaps',
      'Fold the small tip that shows below the flaps up as far as it goes, and tuck it under their edges.',
      (m) => m.fold(line.horizontal(201), [c, 240], { select: (p) => p.tags.includes('v') && !p.tags.includes('edge') && !p.tags.includes('flap'), tag: 'lock' }),
      { check: 'Nothing sticks out below the flaps, and they no longer spring open.' },
    )
    const stock = m.clone()
    m.step('Fold in half', 'Fold the right half behind the left along the centre crease. The flaps stay on the outside.', (m) => m.fold(line.vertical(c), [W - 1, 250], { kind: 'mountain' }))
    const A: P = [c - 10, 131],
      B: P = [c - 24, H]
    m.guide(A, B)
    m.step(
      'Fold the wings',
      'Mark 10 mm from the keel at the nose and 24 mm at the tail. Fold the near wing down on that line against a ruler. Turn over and fold the other wing to match.',
      (m) => m.fold(line.through(A, B), [10, 280], { tag: 'wing' }),
      { check: 'The body is 10 mm deep at the front and 24 mm at the back.' },
    )
    // The winglet crease is 10 mm in from the wing's outer edge; find it on the folded wing.
    const w0 = m.where([10, 230]),
      w1 = m.where([10, H - 1]),
      tip = m.where([2, 280])
    m.step(
      'Winglets and tail',
      'Fold 10 mm of the wing’s outer edge back up into a winglet, against a ruler. Repeat on the other wing. Bend both back edges up for the elevator.',
      (m) => m.fold(line.through(w0, w1), tip, { select: (p) => p.tags.includes('wing') }),
      { check: 'From behind: flat wings, upright winglets, back edges curled up.' },
    )
    return {
      stock,
      finish: { centre: c, root: [A, B], winglet: [[10, 216], [10, H]], dihedral_deg: -2, gsm: 80 },
    }
  },
}
