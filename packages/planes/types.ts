export type PlaneModelId = 'boeing-747' | 'douglas-dc3' | 'tupolev-tu144' | 'ilyushin-il62'
export type PlanePaper = 'A4' | 'US_LETTER'
export type PlaneLivery = 'heritage' | 'festival' | 'pencil'
export type PlaneLocale = 'en' | 'ru'
export type Point = [number, number]
export interface PlaneOptions {
  model_id: PlaneModelId
  paper?: PlanePaper
  keel_mm?: number
  winglet_mm?: number
  livery?: PlaneLivery
  revision?: string
}
export interface PlaneSource extends Required<PlaneOptions> {
  format: 'open-flight-plane'
}
export interface PlaneReference {
  label: string
  url: string
}
export interface CatalogPlane {
  model_id: PlaneModelId
  name: Record<PlaneLocale, string>
  inspiration: Record<PlaneLocale, string>
  origin: Record<PlaneLocale, string>
  character: Record<PlaneLocale, string>
  history: Record<PlaneLocale, string>
  experiment: Record<PlaneLocale, string>
  reference: PlaneReference
  keel_mm: number
  winglet_mm: number
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
  history: string
  experiment: string
  reference: PlaneReference
  dimensions: { width_mm: number; height_mm: number }
  colors: [string, string, string]
  code: string
  motif: string
  steps: PlaneStep[]
  creases: { line: [Point, Point]; step: number; kind: 'mountain' | 'valley' }[]
  rootStep: number
  stockOutline: Point[]
  wingPolygon: Point[]
  stockPanels: { face: 'front' | 'back'; polygon: Point[]; sourcePolygon: Point[] }[]
}
