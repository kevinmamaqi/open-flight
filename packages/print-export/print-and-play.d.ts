import type { PrintSelection } from '../../apps/editor/print-and-play.js'
export function printContext(loadAsset: (path: string) => Promise<Uint8Array> | Uint8Array): unknown
export function buildSingle(plateId: string, options: Partial<Omit<PrintSelection, 'plates'>>, context: unknown): Promise<Uint8Array>
export function renderPrintAndPlay(
  input: { plates?: string[]; designs?: string[]; paper?: string; lang?: string; edge?: string },
  assets: { loadAsset(path: string): Promise<Uint8Array> | Uint8Array },
): Promise<Uint8Array>
