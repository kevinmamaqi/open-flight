export type ButterflyAppearance = 'natural' | 'carnival' | 'twilight' | 'coloring'
export type AirplaneAppearance = 'heritage' | 'festival' | 'pencil' | 'flag'
export type FlyerAppearance = ButterflyAppearance | AirplaneAppearance
export type ArtworkStyle = 'studio' | 'illustrated' | 'ink'
export const appearanceArtStyles: readonly ArtworkStyle[]
export function appearanceChoices(modelId: string, lang?: string): {
  id: FlyerAppearance, label: string, colors: string[]
}[]
export function sheetAppearance(sheetId: string, appearance?: string): {
  id: string, model: string, family: 'butterfly' | 'airplane', construction: 'w1' | 'k1' | 'whole-sheet',
  appearance: FlyerAppearance, original: boolean
}
export function appearanceArtPath(sheetId: string, style?: string, appearance?: string): string
