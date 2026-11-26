export interface OriginLocation {
  id: string;
  kind: 'first-flight' | 'design' | 'habitat' | 'wintering' | 'training' | 'spaceflight' | 'takeoff' | 'landing' | 'record';
  lat: number;
  lon: number;
  label: string;
  place: string;
  date?: string;
}

interface OriginIllustration {
  file: string;
  caption: string;
  credit: string;
  url: string;
}

interface OriginStory {
  id: string;
  model: string;
  place: string;
  date: string;
  story: string;
  discovery: string;
  locations: OriginLocation[];
  people: {name: string; role: string}[];
  sources: {label: string; url: string}[];
  country?: 'US' | 'USSR' | 'RS' | 'KR' | 'JP';
  era?: string;
}

export interface ModelOrigin extends OriginStory {
  kind: 'airplane' | 'butterfly';
  scientificName?: string;
  specimen?: string;
  firstFlight?: string;
  /** A record or championship paper plane, credited to its original designer. */
  record?: boolean;
  illustration?: OriginIllustration;
}

export interface PilotStory extends OriginStory {
  kind: 'pilot';
  country: 'US' | 'USSR';
  era: string;
  illustration: OriginIllustration;
}

export const originModelIds: readonly string[];
export function modelOrigin(id: string | null | undefined, lang?: string): ModelOrigin | null;
export function pilotStories(lang?: string): PilotStory[];
export function relatedPilotStories(modelId: string | null | undefined, lang?: string): PilotStory[];
