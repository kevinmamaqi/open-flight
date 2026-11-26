// Sky King: Takuo Toda's time-aloft glider, from the family of designs behind his 2009 Guinness
// record. Fold sequence from PPO's A4 tutorial, checked against WIRED's narrated 2009 tutorial and
// a step-by-step photo blog. The squashed nose is approximated by the flat fold it leaves.
// A4 portrait, origin top-left, y down.

import { line, type Model, type P } from './engine.ts'
import type { RecordPlane } from './sheet.ts'

const W = 210,
  H = 297,
  c = W / 2
const noseLine = 151.4 // the blunt nose after the reverse fold
const body = 15 // wing roots either side of the keel
const winglet = 13.5

export const skyKing: RecordPlane = {
  id: 'sky-king',
  name: 'Sky King',
  claim: 'Takuo Toda’s time-aloft glider: the design family behind his 2009 Guinness record',
  designer: 'Takuo Toda',
  paper: 'A4',
  facts: [
    ['Designer', 'Takuo Toda, chairman of the Japan Origami Airplane Association, who designs planes folded without cuts or glue'],
    ['2009', 'Toda set the time-aloft record at 27.9 s with a modified Sky King (WIRED, September 2009), beating Ken Blackburn’s 27.6 s from 1998. TIME listed the Sky King among its best inventions of 2009.'],
    ['2010', 'Toda raised the record to 29.2 s with a newer design, the Sky King Zero Fighter, folded from A5 paper (Toda’s channel and his publisher). Sources disagree on the venue: Fukuyama City or the Sapporo Dome.'],
    ['Today', 'Guinness now lists 31.2 s, set in Kunshan, China, on 11 February 2026 by a team of seven, under rules allowing up to A4, cuts and a small piece of tape'],
    ['2022', 'At the Red Bull Paper Wings World Final, the airtime winner said most finalists flew the Sky King'],
    ['This sheet', 'The A4 Sky King from PPO’s tutorial: the Sky King design, not the A5 Zero Fighter or the exact record plane'],
  ],
  origin: [
    'Takuo Toda folds his planes from a single uncut sheet. The Sky King is his best known design: a compact glider with a blunt, layered nose, swept leading edges and two small fins. In 2009 a modified Sky King stayed up for 27.9 seconds and took the Guinness record from Ken Blackburn.',
    'Sources disagree about that record plane. TIME wrote that it used no cuts and no glue; the Telegraph reported that it was about 10 cm long and held together with tape. What is clear is that the record planes were small, carefully tuned versions of the design, and that the 2010 record (29.2 s) used a newer one, the Zero Fighter.',
    'The A4 Sky King here is the version taught to everyone. Thirteen years after the record it was still the favourite at the Red Bull Paper Wings airtime final.',
  ],
  aero: [
    'Like every airtime plane, the Sky King must survive a hard throw almost straight up and then float down slowly. Toda describes the throw that way: launch nearly vertical, let it climb, then let it level off. Time aloft is roughly the height reached divided by the sink rate.',
    (e) =>
      `The blunt, squashed nose is the key. Folding the tip back inside and squashing it gives about ${e.layers_at_nose} layers through the nose, so the balance point sits ${Math.round(e.balance_mm)} mm behind it on a ${Math.round(e.length_mm)} mm plane. The centre of lift lies between ${Math.round(e.neutral_mm)} and ${Math.round(e.area_centroid_mm)} mm. A blunt nose is also tougher than a point; it survives launches and landings without crumpling.`,
    (e) =>
      `The wing is a swept delta with a straight trailing edge: ${e.area_cm2.toFixed(0)} cm² for ${e.mass_g.toFixed(1)} g, a light ${e.loading_n_m2.toFixed(1)} N/m². Swept edges keep it stable when it climbs fast, and a short span keeps it stiff. The two fins at the back of the wingtips act as its tail: with no fuselage or tail surfaces, they keep the nose pointed into the airflow.`,
    'The last fold matters most. Curling the back edges up slightly is an elevator: it holds the nose up so the plane glides instead of diving. Too little and it dives; too much and it climbs, stalls and drops.',
  ],
  throwing: [
    'For time: throw hard, nearly straight up, and let it level off at the top (Toda’s advice).',
    'For practice indoors: a gentle, level push at shoulder height shows whether it glides straight.',
  ],
  trim: [
    'Curve the back of the wings up slightly for more lift. Adjust a little at a time.',
    'Stand the fins straight up and make them match.',
    'Make the creases sharp and the two sides symmetrical; a crooked nose turns the whole flight.',
  ],
  sources: [
    { label: 'WIRED (2009), Takuo Toda folds the Sky King', url: 'https://www.youtube.com/watch?v=c1fXWVhd6dU', says: 'narrated tutorial; says a modified Sky King set the record' },
    { label: 'TIME, Best Inventions of 2009', url: 'https://content.time.com/time/specials/packages/article/0,28804,1934027_1934003_1933991,00.html', says: 'single sheet, no cuts, no gluing; beat 27.6 s by 0.3 s' },
    { label: 'Gizmodo (2009), citing the Telegraph', url: 'https://gizmodo.com/japanese-origami-airplane-enthusiast-breaks-world-rec-5260491', says: 'the 27.9 s plane was about 10 cm long and used tape' },
    { label: 'Toda’s channel THE SKYKING', url: 'https://www.youtube.com/watch?v=YWItCyvV_AE', says: 'the record plane is the Sky King Zero Fighter, folded from A5' },
    { label: 'Tuttle Publishing, Toda’s books', url: 'https://www.tuttlepublishing.com/japan/out-of-this-world-paper-airplanes-kit', says: 'Toda broke his record on 19 December 2010 with the Zero Fighter, 29.2 s' },
    { label: 'Guinness World Records, longest time flying a paper aircraft', url: 'https://www.guinnessworldrecords.com/world-records/longest-time-flying-a-paper-aircraft.html', says: 'current record 31.2 s, Kunshan, 11 February 2026' },
    { label: 'Newswitch (2018), interview with Toda', url: 'https://newswitch.jp/p/14984', says: 'throw nearly straight up, climb, then level off' },
    { label: 'CGTN (2022)', url: 'https://news.cgtn.com/news/2022-05-18/Man-throws-paper-plane-61m-at-World-Finals-1a8dn38mS64/index.html', says: 'the 2022 airtime winner says most finalists flew the Sky King' },
  ],
  tutorial: { label: 'PPO, “WORLD RECORD Paper Airplane”, 29 April 2020 (music only). Toda also publishes his own free tutorial: https://www.youtube.com/watch?v=gHJzmBfPeQs', url: 'https://www.youtube.com/watch?v=JV2aMbGtmZE' },
  rights:
    'Open Flight’s version, Snub Nose, is based on Takuo Toda’s Sky King. The diagrams, text and art are original Open Flight work, drawn from the fold geometry; the fold sequence is derived from the credited design. Nothing is copied from the videos or books. Guinness, Red Bull and the name Sky King appear only as factual references; there is no endorsement.',
  uncertain: [
    'The squashed nose (steps 10–11) is approximated: the diagrams show the flat fold it leaves, and the exact squash is described in words.',
    'Body depth (about 15 mm) and fin width (about 13 mm) are measured from angled video frames, ±5 mm.',
    'Whether the 2009 record plane used tape, and where the 2010 record was flown.',
  ],
  build(m: Model) {
    m.step('Centre crease', 'Fold in half lengthwise and open again.', (m) => m.fold(line.vertical(c), [W - 1, 10]), { reopen: true })
    m.step('Corners to the centre', 'Fold both top corners in so their edges meet on the centre crease.', (m) => [...m.fold(line.through([c, 0], [0, c]), [0, 0]), ...m.fold(line.through([c, 0], [W, c]), [W, 0])])
    m.step('Point down', 'Fold the point down so its tip stops 25 mm above the bottom edge.', (m) => m.fold(line.horizontal(136), [c, 0], { tag: 'v' }), { check: 'The fold runs 136 mm below the old top edge.' })
    m.step('Corners in, then open', 'Fold the new top corners in to the centre through all layers, crease well, and open them again.', (m) => [...m.fold(line.through([c, 136], [0, 241]), [1, 138]), ...m.fold(line.through([W - c, 136], [W, 241]), [W - 1, 138])], { reopen: true })
    m.step(
      'Sides to the creases',
      'Fold each side edge in so it lies along the crease you just made.',
      (m) => [...m.fold(line.through([0, 241], [43.5, 136]), [0.5, 200]), ...m.fold(line.through([W, 241], [W - 43.5, 136]), [W - 0.5, 200])],
    )
    m.step(
      'Corners in again',
      'Refold the corners on the creases from step 4, carrying the side flaps inside. The two flap edges meet in a slit along the centre.',
      (m) => [...m.fold(line.through([c, 136], [0, 241]), [1, 138]), ...m.fold(line.through([W - c, 136], [W, 241]), [W - 1, 138])],
    )
    m.step('Mark the nose', 'Fold the nose tip down to the end of the slit, crease, and open again.', (m) => m.fold(line.horizontal(166.75), [c, 137]), { reopen: true })
    m.step('Turn over', 'Turn the model over, left to right.', (m) => m.turnOver(), { view: 'turn' })
    // The squashed nose leaves the tip folded back inside along y = noseLine. For the estimate, apply
    // that flat equivalent to the open stock, then carry on folding without it.
    const saved = m.clone()
    m.fold(line.horizontal(noseLine), [c, 137])
    const stock = m.clone()
    m.panels = saved
    m.step('Fold in half', 'Fold in half along the centre, right onto left. The flaps end up outside.', (m) => m.fold(line.vertical(c), [W - 1, H - 2], { tag: 'top' }))
    m.step(
      'Blunt the nose',
      'Fold the tip back about 15 mm, crease, open, and push it inside between the layers (an inside-reverse fold).',
      (m) => m.fold(line.horizontal(noseLine), [c - 2, 140]),
      { check: 'The front is blunt, about 15 mm tall.' },
    )
    m.step(
      'Squash the nose',
      'Open the reversed tip into a pocket and squash it flat into a small square on the front. Pull the square’s tip down halfway and flatten it again; this marks where the wings fold.',
      () => [],
      { view: 'action' },
    )
    m.step(
      'Wings',
      'Fold each wing down along the top of the square, parallel to the keel, about 15 mm from it. Fold one, turn over, fold the other to match.',
      (m) => m.fold(line.vertical(c - body), [10, H - 10], { select: (p) => p.tags.includes('top'), tag: 'wing' }),
    )
    const w0 = m.where([winglet, 235]),
      w1 = m.where([winglet, H - 1]),
      tip = m.where([3, 285])
    m.step(
      'Fins',
      'Fold about 13 mm of each wing’s outer edge up into a fin, parallel to the centre line, along the back part of the wing.',
      (m) => m.fold(line.through(w0, w1), tip, { select: (p) => p.tags.includes('wing') }),
      { check: 'From behind: a shallow V, fins upright. Curl the back edges up slightly.' },
    )
    return {
      stock,
      finish: { centre: c, root: [[c - body, noseLine], [c - body, H]] as [P, P], winglet: [[winglet, 227.5], [winglet, H]] as [P, P], dihedral_deg: 4, gsm: 80 },
    }
  },
}
