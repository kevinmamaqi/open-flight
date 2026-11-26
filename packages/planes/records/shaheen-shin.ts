// Shaheen Shin: the airtime glider that won Red Bull Paper Wings 2022 (Rana Muhammad Usman
// Saeed, Pakistan, 14.86 s). Designed by Shin Moo Joon according to Foldable Flight, who learned
// it from Saeed; inspired by Ken Blackburn's time-aloft design. Fold sequence from Foldable
// Flight's tutorial, checked frame by frame. A4 portrait, origin top-left, y down.

import { line, Model, type P } from './engine.ts'
import type { RecordPlane } from './sheet.ts'

const W = 210,
  H = 297,
  c = W / 2
const root = 18.33 // wing roots either side of the centre: 1 mm + (W/2 − 1)/6
const rolls = [106.7, 126.8, 146.9, 167.0, 187.0]
const lead = 187 // leading edge after rolling: 110 mm chord

export const shaheenShin: RecordPlane = {
  id: 'shaheen-shin',
  name: 'Shaheen Shin',
  claim: 'Airtime winner, Red Bull Paper Wings World Final 2022: 14.86 seconds',
  designer: 'Shin Moo Joon (per Foldable Flight)',
  paper: 'A4',
  facts: [
    ['Event', 'Red Bull Paper Wings World Final, Hangar-7, Salzburg, May 2022'],
    ['Result', 'Airtime: 1st Rana Muhammad Usman Saeed (Pakistan) 14.86 s; 2nd Esteban Neira (Chile) 12.99 s; 3rd Dimitri Dimitrev (Moldova) 12.29 s'],
    ['Record', 'Guinness lists Saeed’s 16.39 s pre-elimination throw on 13 May 2022 as the longest time aloft at the championship. It is not the overall time-aloft world record.'],
    ['Designer', 'Shin Moo Joon, according to the tutorial. Shin folded the plane in the April 2022 Daegu distance record (77.134 m); that plane is a different design, by Chee Yie Jian.'],
    ['Pilot', 'Saeed, a lawyer, was a Paper Wings finalist ten years earlier, in 2012'],
    ['Name', '“Shaheen Shin” appears only in the tutorial; we found no other source for it'],
  ],
  origin: [
    'In the airtime category the pilot throws the plane almost straight up, as hard as possible, and the clock runs until it touches the floor. A good airtime plane has to survive a violent launch and then turn itself into a slow, gentle glider at the top.',
    'Saeed told CGTN that most finalists flew Takuo Toda’s Sky King, while he flew “a square paper plane” he had modified a little. Foldable Flight credits the design to Shin Moo Joon and says it was inspired by Ken Blackburn’s design, which held the time-aloft record for years.',
    'The fold is unusual: almost half the sheet is rolled into a thick bar along the front edge, leaving a short, wide, nearly rectangular wing with a fin at each tip.',
  ],
  aero: [
    (e) =>
      `Time aloft is roughly launch height divided by sink rate, so an airtime plane needs two opposite things. Going up, it must be compact, stiff and heavy at the front so it climbs straight instead of looping or fluttering. Coming down, it must be light for its wing area so it sinks slowly. This one weighs ${e.mass_g.toFixed(1)} g on ${e.area_cm2.toFixed(0)} cm² of wing: ${e.loading_n_m2.toFixed(1)} N/m², among the lightest loadings of these record planes.`,
    (e) =>
      `The rolled bar does the first job. It stacks up to ${e.layers_at_nose / 2} layers of paper near the centre on each side of the body, so the balance point sits ${Math.round(e.balance_mm)} mm back on a ${Math.round(e.length_mm)} mm chord, about ${Math.round((100 * e.balance_mm) / e.length_mm)}% of the way. The balance has to stay ahead of the centre of lift, which for a short flat wing lies somewhere between ${Math.round(e.neutral_mm)} mm (linear theory) and ${Math.round(e.area_centroid_mm)} mm (the middle of the wing, where it moves at steep gliding angles). With paper alone this plane is close to that limit, which is why the trim curl matters. The bar is also a rounded, rigid leading edge that keeps its shape at launch speed.`,
    'The rest is a glider. A short, wide wing tolerates a slow, nose-high glide, and the tip fins act as tail fins: with no fuselage or tail, they keep the plane pointing into the airflow. A slight V from behind gives roll stability, so after the climb it settles into a wide, gentle circle instead of a spiral dive. A small upward curl at the trailing edge sets the gliding angle.',
  ],
  throwing: [
    'In competition the airtime throw goes nearly straight up, hard, from a fixed spot. The tutorial shows flights but gives no throwing advice.',
    'Indoors, start with gentle throws at about 45° and increase force once it glides well.',
  ],
  trim: [
    'The wings spread after the throw: set the V so they sit level in flight.',
    'Add a little up-elevator at the trailing edge and experiment.',
    'If it turns left, bend the trailing edge the other way to bring it level, and vice versa.',
    'Crease the fins straight, not wavy. Precision is what makes the glide repeatable.',
  ],
  sources: [
    { label: 'Red Bull, World Final 2022 results', url: 'https://www.redbull.com/us-en/red-bull-paper-wings-world-final-results', says: 'airtime podium with times' },
    { label: 'Guinness World Records, longest time aloft at the Red Bull Paper Wings Championship', url: 'https://www.guinnessworldrecords.com/world-records/729617-longest-time-aloft-at-the-red-bull-paper-wings-championship', says: 'Saeed, 16.39 s, 13 May 2022; won the Super Final with 14.86 s' },
    { label: 'CGTN, 18 May 2022', url: 'https://news.cgtn.com/news/2022-05-18/Man-throws-paper-plane-61m-at-World-Finals-1a8dn38mS64/index.html', says: 'Saeed on flying a modified “square paper plane” while most flew Sky King' },
    { label: 'Daily News Digest (Pakistan)', url: 'https://dnd.com.pk/pakistan-wins-big-at-red-bull-paper-wings-world-finals-in-austria/268518', says: 'Saeed is a lawyer and a 2012 finalist' },
    { label: 'Guinness World Records news, May 2022', url: 'https://www.guinnessworldrecords.com/news/2022/5/epic-paper-airplane-throw-shatters-record-in-south-korea-704368', says: 'Daegu record roles: Kim Kyu Tae threw, Shin Moo Joon folded, Chee Yie Jian designed' },
  ],
  tutorial: { label: 'Foldable Flight, “Easy Glider”, 26 June 2022; the presenter says Saeed taught him the fold', url: 'https://www.youtube.com/watch?v=lIBeQDtJLf4' },
  rights:
    'Open Flight’s version, Sky Raft, is based on the Shaheen Shin credited to Shin Moo Joon. The diagrams, text and art are original Open Flight work, drawn from the fold geometry; the fold sequence is derived from the credited design. Nothing is copied from the videos or any template. Red Bull, Guinness and the name Shaheen Shin appear only as factual references; there is no endorsement.',
  uncertain: [
    'Designer credit rests on the tutorial description alone.',
    'The directions of the tip chamfer and fin folds are inferred from the finished plane; the video does not show them clearly.',
    'The tutorial’s optional “competition” stiffening creases are left out: the second set is not fully specified, and the presenter says the result is the same without them.',
    'The rolls are drawn at an even 20 mm; real rolls grow with thickness, and the last one must land at 110 mm from the back edge.',
  ],
  build(m: Model) {
    const flat = m.clone()
    m.step('Centre crease', 'Fold in half lengthwise and open again.', (m) => m.fold(line.vertical(c), [W - 1, 10]), { reopen: true })
    const corners = (m: Model) => [...m.fold(line.through([c - 1, 0], [0, c - 1]), [0, 0]), ...m.fold(line.through([c + 1, 0], [W, c - 1]), [W, 0])]
    const point = (m: Model) => m.fold(line.horizontal(52), [c, 0])
    const band1 = (m: Model) => m.fold(line.horizontal(69.33), [c, 53])
    const band2 = (m: Model) => m.fold(line.horizontal(86.67), [c, 70])
    m.step('Corners in, 1 mm short', 'Fold each top corner down so its edge stops 1 mm short of the centre crease.', corners)
    m.step('Point down', 'Fold the top point down to where the two corner tips meet.', point, { check: 'The fold runs 52 mm below the old top edge.' })
    m.step('Fold a band', 'Divide the 52 mm from the top edge to the point into thirds. Fold the top edge down on the first third.', band1)
    m.step('Fold it again', 'Fold the band over once more along its lower edge.', band2, { check: 'Short creases now cross the corner flaps; you need the innermost pair.' })
    m.step(
      'Open everything',
      'Unfold the sheet completely. Find the innermost short creases left by the band, about 18 mm either side of the centre.',
      (m) => {
        m.panels = flat.map((p) => ({ ...p, tags: [...p.tags], vertices: p.vertices.map((v) => ({ p: [...v.o] as P, o: v.o })) }))
      },
      { view: 'action' },
    )
    m.step(
      'Pre-crease the wing roots',
      'Turn the sheet over. Fold along each of those two creases for the full length of the sheet, parallel to the centre, then open. Turn back.',
      (m) => [...m.fold(line.vertical(c - root), [1, 10], { kind: 'mountain' }), ...m.fold(line.vertical(c + root), [W - 1, 10], { kind: 'mountain' })],
      { reopen: true, check: 'Two long creases, 18.3 mm either side of the centre.' },
    )
    m.step('Refold the nose', 'Repeat the corners, the point and the two band folds.', (m) => [...corners(m), ...point(m), ...band1(m), ...band2(m)])
    m.step('Start rolling', 'Mark 110 mm up from the bottom on both sides. Roll the whole nose down tightly, keeping the root creases of every layer lined up.', (m) => m.fold(line.horizontal(rolls[0]), [c, 87.5], { tag: 'bar' }))
    m.step(
      'Roll to the 110 mm mark',
      'Keep rolling. The last roll must land exactly on the 110 mm marks. On A4 that is five rolls in all.',
      (m) => rolls.slice(1).flatMap((y, i) => m.fold(line.horizontal(y), [c, rolls[i] + 0.5], { tag: 'bar' })),
      { check: 'A 210 × 110 mm wing with a thick bar along the front.' },
    )
    m.step(
      'Chamfer the tips',
      'Mark 27 mm in from each front corner along the leading edge and 16 mm back down the side. Fold each corner in on that line.',
      (m) => [...m.fold(line.through([W - 27, lead], [W, lead + 16]), [W - 1, lead + 1]), ...m.fold(line.through([27, lead], [0, lead + 16]), [1, lead + 1])],
    )
    m.step(
      'Fold the fins',
      'Mark 15 mm in from each side at the front and back. Fold each side strip in on that line, trapping the chamfered corner inside. Fold against a ruler so the fins are straight.',
      (m) => [...m.fold(line.vertical(W - 15), [W - 1, H - 2], { tag: 'fin' }), ...m.fold(line.vertical(15), [1, H - 2], { tag: 'fin' })],
    )
    const stock = m.clone()
    m.step('Fold in half', 'Fold in half along the centre crease, the bar inside.', (m) => m.fold(line.vertical(c), [W - 1, H - 2], { tag: 'right' }))
    m.step(
      'Wings out, fins up',
      'Fold each wing back out on its root crease, through the new nose layers. Stand the fins up and give the wings a slight V.',
      (m) => m.fold(line.vertical(c - root), [c - root - 30, H - 10], { select: (p) => p.tags.includes('right') }),
      { check: 'From behind: a shallow V, fins upright, the bar on top.' },
    )
    return { stock, finish: { centre: c, root: [[c - root, lead], [c - root, H]] as [P, P], winglet: [[15, lead], [15, H]] as [P, P], dihedral_deg: 7, gsm: 80 } }
  },
}
