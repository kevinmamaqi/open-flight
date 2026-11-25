export type PrintPaper = 'A4' | 'US_LETTER'
export type PrintLang = 'en' | 'es' | 'ru'
export type PrintEdge = 'cut' | 'whole'
export type PrintSelection = { plates: string[]; paper: PrintPaper; lang: PrintLang; edge: PrintEdge }
export type PagePlanItem = {
  role: 'pattern' | 'build' | 'guide'
  plate: string
  source?: { type: 'library' | 'packet' | 'plane'; path?: string; model?: string; edge?: PrintEdge; index: number }
}
export const maxDesigns: number
export const designIds: readonly string[]
export const printPapers: readonly PrintPaper[]
export const readySets: readonly { id: string; plates: readonly string[]; edge: PrintEdge; title: Record<PrintLang, string>; summary: Record<PrintLang, string> }[]
export function resolvePlate(value: string): { id: string; model: string; chapter: string }
export function normalizeSelection(input?: { plates?: string[]; designs?: string[]; paper?: string; lang?: string; edge?: string }): PrintSelection
export function toggleDesign(current: string[], id: string, limit?: number): { plates: string[]; added: string | null; removed: string | null; replaced: string | null }
export function pagePlan(plateId: string, options?: { paper?: string; lang?: string; edge?: string }): PagePlanItem[]
export function pageCount(ids: string[]): number
export function printFilename(selection: { plates: string[]; paper: string; lang: string }): string
export function staticPath(selection: { plates: string[]; paper: string; lang: string; edge?: string }): string | null
export function singlePath(plateId: string, paper: string, lang: string): string
export function setPath(setId: string, paper: string, lang: string): string
export function designURL(plateId: string, lang?: string): string
export function selectionHash(selection: { plates: string[]; paper: string; edge?: string }): string
export function readySetFor(selection: { plates: string[]; edge?: string }): { id: string } | null
export function readSelection(address: string, languages?: string[]): { plates: string[]; paper: PrintPaper; edge: PrintEdge; lang?: PrintLang }
export function bookletLink(selection: { plates: string[]; paper: string; lang?: string; edge?: string }, base?: string): string
export function defaultPaper(languages?: string[]): PrintPaper
export function formatBytes(bytes: number): string
