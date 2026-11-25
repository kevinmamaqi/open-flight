export function loadAppearanceSheet(
  sheetId: string, paper: string, lang: string, appearance: string | undefined,
  loadAsset: (path: string) => Promise<Uint8Array | ArrayBuffer>,
  edge?: 'cut' | 'whole',
): Promise<Uint8Array | ArrayBuffer>
