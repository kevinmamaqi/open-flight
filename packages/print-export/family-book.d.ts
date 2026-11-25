export type BookOptions = {
  lang?: "en" | "es" | "ru";
  paper?: "A4" | "US_LETTER";
  theme?: "sky" | "sunset" | "meadow";
  edge?: "cut" | "whole";
  cover?: string;
  pilot?: string;
  style?: "studio" | "illustrated" | "ink";
  sheets?: string[];
  activities?: string[];
  coverModel?: string;
  appearances?: Record<string, string>;
};
export type NormalizedBook = Required<Omit<BookOptions, "activities">> & Pick<BookOptions, "activities">;
export function normalizeBook(input?: BookOptions): NormalizedBook;
export function createBook(
  input: BookOptions,
  assets: { loadAsset(path: string): Promise<Uint8Array> },
): Promise<Uint8Array>;
export function bookPlan(input?: BookOptions): { pageCount: number; modelCount: number; activityPages: Array<{id: string; number: number}>; guidePage: number | null; originPages: Array<{ model: string; id: string; number: number }>; entries: Array<{ id: string; start: number; end: number; guidePage: number | null }> };
export function sheetPath(id: string, paper: string, lang: string): string;
