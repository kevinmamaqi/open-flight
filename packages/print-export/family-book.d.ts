export type BookOptions = {
  lang?: "en" | "es" | "ru";
  paper?: "A4" | "US_LETTER";
  theme?: "sky" | "sunset" | "meadow";
  cover?: string;
  pilot?: string;
  style?: "studio" | "illustrated" | "ink";
  sheets?: string[];
  coverModel?: string;
  appearances?: Record<string, string>;
};
export function normalizeBook(input?: BookOptions): Required<BookOptions>;
export function createBook(
  input: BookOptions,
  assets: { loadAsset(path: string): Promise<Uint8Array> },
): Promise<Uint8Array>;
export function bookPlan(input?: BookOptions): { pageCount: number; modelCount: number; guidePage: number | null; originPages: Array<{ model: string; id: string; number: number }>; entries: Array<{ id: string; start: number; end: number; guidePage: number | null }> };
export function sheetPath(id: string, paper: string, lang: string): string;
