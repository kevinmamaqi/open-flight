export const printSafeMm: number
export const trimMm: number
export const sheetEdges: readonly ('cut' | 'whole')[]
export function backKind(kind: string): string
export function mirrorX(width: number): (point: [number, number]) => [number, number]
export function backFaceWords(locale: string, landscape?: boolean): { title: string; lines: string[] }
