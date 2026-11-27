export type ButterflyAppearance = 'natural' | 'carnival' | 'twilight' | 'coloring' | 'modernista'
export type AirplaneAppearance = 'heritage' | 'festival' | 'pencil' | 'airshow'
export type FlyerAppearance = ButterflyAppearance | AirplaneAppearance | 'field' | 'sunset' | 'indigo'
export type ArtworkStyle = 'studio' | 'illustrated' | 'ink'
export const appearanceArtStyles: readonly ArtworkStyle[]
export function appearanceChoices(modelId: string, lang?: string): {
  id: FlyerAppearance, label: string, colors: string[]
}[]
export const k3DesignSwatches: Record<'monarch' | 'morpho' | 'swallowtail', Record<'modernista', string[]>>
export function k3AppearanceChoices(species: string, lang?: string): {
  id: ButterflyAppearance | 'modernista', label: string, colors: string[]
}[]
export function sheetChoices(sheetId: string, lang?: string): {
  id: FlyerAppearance | 'modernista', label: string, colors: string[]
}[]
export function sheetAppearance(sheetId: string, appearance?: string): {
  id: string, model: string, family: 'butterfly' | 'airplane', construction: 'w1' | 'k1' | 'k2' | 'whole-sheet',
  appearance: FlyerAppearance, original: boolean
}
export function specimenPath(modelId: string, appearance?: string): string
export function appearanceArtPath(sheetId: string, style?: string, appearance?: string): string
export function appearanceCaption(modelId: string, appearance: string, lang?: string): string
