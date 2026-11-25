type Locale = 'en' | 'ru' | 'es'
type Paper = 'A4' | 'US_LETTER'
export const objectLocales: Locale[]
export const objectPapers: Paper[]
export function packetPath(paper: Paper, locale: Locale): string

interface FlightObjectActivity {
  id: string
  revision: string
  motion: string
  sheet: string
  page: number
  illustration: string
  source: { label: string; url: string }
  title: string
  verb: string
  question: string
  materials: string
  steps: string[]
  test: string
  physics: string
  measure: string
  recovery: string
}

interface FlightObjectReference {
  title: string
  creator: string
  url: string
  policy: string
  motion: string
}

type FlightObjectReferenceAsset =
  | { asset: string; licenseUrl: string }
  | { asset?: never; licenseUrl?: never }

export function flightObjects(locale?: Locale): {
  locale: Locale
  edition: 'flight-objects-1'
  evidence: 'untested_open_flight_builds'
  packets: { A4: string; US_LETTER: string }
  activities: FlightObjectActivity[]
  references: (FlightObjectReference & FlightObjectReferenceAsset)[]
}
