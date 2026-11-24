export function loadAppearanceSheet(
  sheetId: string, paper: string, lang: string, appearance: string | undefined,
  loadAsset: (path: string) => Promise<Uint8Array | ArrayBuffer>,
): Promise<Uint8Array | ArrayBuffer>
