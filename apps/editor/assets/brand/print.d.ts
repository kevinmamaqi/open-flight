import type { print as Print } from './tokens.js'
type Point = [number, number]
type Line = { id: string; points: Point[]; stroke?: string; weight?: number; dash?: number[]; fill?: string; closed?: boolean }
type Font = 'text' | 'bold' | 'display'
type Label = { x: number; y: number; text: string; size: number; color?: string; font?: Font }
type Style = { stroke: string; weight: number; dash?: number[] }
export declare const print: typeof Print
export declare const mmPerPt: number
export declare const textMm: Readonly<{ min: number; body: number; step: number; title: number; display: number }>
export declare const ink: string
export declare const muted: string
export declare const accent: string
export declare const lineStyle: Readonly<{ cut: Style; valley: Style & { dash: number[] }; mountain: Style & { dash: number[] }; guide: Style & { dash: number[] }; rule: Style }>
export declare function atLeastLine(weight?: number): number
export declare function atLeastText(mm: number): number
export declare const fontFiles: Readonly<{ text: string; bold: string; display: string }>
export declare const fontNotice: string
export declare function registerFonts(doc: unknown, base64: { text: string; bold: string; display: string }): void
export declare function useFont(doc: unknown, kind?: Font): void
export declare function calibrationWords(locale: string): [string, string]
export declare function calibrationShort(locale: string): string
export declare function calibration(x: number, y: number, locale?: string, options?: { note?: boolean; id?: string }): { lines: Line[]; labels: Label[]; width: number; height: number }
export declare function brandMark(x: number, y: number, height?: number, options?: { mono?: boolean }): { lines: Line[]; labels: Label[]; width: number }
export declare function documentCss(options?: { fontsBase?: string; paper?: 'A4' | 'US_LETTER' }): string
export declare function calibrationHtml(locale?: string): string
