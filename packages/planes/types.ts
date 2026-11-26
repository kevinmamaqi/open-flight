export type PlaneModelId =
  | 'boeing-747'
  | 'douglas-dc3'
  | 'tupolev-tu144'
  | 'ilyushin-il62'
  | 'red-dart'
  | 'shaheen-shin'
  | 'crescent-boomerang'
  | 'sky-king'
export type PlanePaper = 'A4' | 'US_LETTER'
export type PlaneLivery = 'heritage' | 'festival' | 'pencil' | 'airshow'
export type PlaneLocale = 'en' | 'ru' | 'es'
// 'cut': fold the sheet inside a printed cut border. 'whole': fold the full paper.
export type PlaneEdge = 'cut' | 'whole'
export type Point = [number, number]
export interface PlaneOptions {
  model_id: PlaneModelId
  paper?: PlanePaper
  keel_mm?: number
  winglet_mm?: number
  livery?: PlaneLivery
  revision?: string
  edge?: PlaneEdge
}
export interface PlaneSource extends Required<Omit<PlaneOptions, 'edge'>> {
  format: 'open-flight-plane'
  edge?: PlaneEdge
}
export interface PlaneReference {
  label: string
  url: string
}
interface AircraftField<T> {
  step: number
  variant: string
  landmark: T
  look: T
  fold: T
  finish: T
}
export interface CatalogPlane {
  model_id: PlaneModelId
  name: Record<PlaneLocale, string>
  inspiration: Record<PlaneLocale, string>
  origin: Record<PlaneLocale, string>
  character: Record<PlaneLocale, string>
  field: AircraftField<Record<PlaneLocale, string>> & {
    museum?: PlaneReference
  }
  history: Record<PlaneLocale, string>
  experiment: Record<PlaneLocale, string>
  reference: PlaneReference
  keel_mm: number
  winglet_mm: number
  /** Allowed body depth and tip height, mm. Omitted: 12–28 and 0–12. */
  keel_range?: [number, number]
  winglet_range?: [number, number]
  /** A record or championship design by someone else, folded with its own sequence. */
  record?: boolean
  designer?: Record<PlaneLocale, string>
  /** How to throw it, when the shared gentle-launch advice does not fit. */
  launch?: Record<PlaneLocale, string>
  /** The original design's own name (record planes). */
  original?: string
  code: string
  colors: [string, string, string]
  motif: string
}
export interface PlanePanel {
  face: 'front' | 'back'
  polygon: Point[]
  original: Point[]
  z: number
}
export interface PlaneMove {
  face: 'front' | 'back'
  from: Point[]
  to: Point[]
  original: Point[]
  hinge: [Point, Point]
  angle_deg: number
}
export interface PlaneFrame {
  width: number
  height: number
  kind: 'flat' | 'wings' | 'tips'
  reopen: boolean
  panels: PlanePanel[]
  before: PlanePanel[]
  fixed: PlanePanel[]
  moves: PlaneMove[]
  outline: Point[]
  beforeOutline: Point[]
  hinges: [Point, Point][]
  keel_mm: number
  winglet_mm: number
  dihedral_deg: number
  wingPolygon: Point[]
  stockOutline?: Point[]
  root?: [Point, Point]
  /** A step that is not a fold: turning the model over, opening it, or shaping it by hand. */
  view?: 'turn' | 'open' | 'shape'
}
export interface PlaneStep {
  index: number
  title: string
  instruction: string
  frame: PlaneFrame
}
export interface PlanePlan extends PlaneSource {
  source: PlaneSource
  locale: PlaneLocale
  name: string
  inspiration: string
  character: string
  field: AircraftField<string> & { museum: PlaneReference }
  history: string
  experiment: string
  reference: PlaneReference
  dimensions: { width_mm: number; height_mm: number }
  page: { width_mm: number; height_mm: number }
  edge: PlaneEdge
  trim_mm: number
  // Where the cut sheet sits on the page when it is not trim_mm in on every side: [left, top] in mm.
  // Set only for a design printed on paper of another shape (the Needle on US Letter).
  offset_mm?: [number, number]
  colors: [string, string, string]
  code: string
  motif: string
  steps: PlaneStep[]
  creases: {
    line: [Point, Point]
    step: number
    kind: 'mountain' | 'valley'
    /** false: part of the crease pattern, but not printed on the template. */
    print?: false
  }[]
  rootStep: number
  /** Left wing root when it is not parallel to the centre line (record planes). */
  root?: [Point, Point]
  designer?: Record<PlaneLocale, string>
  launch?: string
  original?: string
  /** Heading for the last step's rear view when it is not about the wing tips. */
  tipsHeading?: string
  /** What Open Flight made and what it took from the credited original. */
  rights?: string
  stockOutline: Point[]
  wingPolygon: Point[]
  stockPanels: {
    face: 'front' | 'back'
    polygon: Point[]
    sourcePolygon: Point[]
  }[]
}
