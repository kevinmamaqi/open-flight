// Types for the generated token module (scripts/build_tokens.mjs).
export declare const color: Readonly<Record<string, string>>
export declare const print: {
  ink: string
  muted: string
  text: { min: number; body: number; step: number; title: number; display: number }
  leading: number
  line: { min: number; fold: number; cut: number }
  dash: { valley: number[]; mountain: number[]; guide: number[] }
  safe: number
  margin: number
  calibration: number
  brandMax: number
}
export declare const dash: Readonly<{ valley: string; mountain: string; guide: string }>
