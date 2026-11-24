const appearances = ['natural', 'carnival', 'twilight', 'coloring']
const papers = ['A4', 'US_LETTER']

export function foldedSettings(params, revision, draft) {
  const span = Number(params.get('span_mm'))
  const { minimum, maximum, step } = revision.parameter_definitions.find(({ name }) => name === 'span_mm')
  const validSpan = Number.isInteger(span) && span >= minimum && span <= maximum && (span - minimum) % step === 0
  const appearance = params.get('appearance_id')
  const paper = params.get('paper')
  return {
    species: revision.species_id,
    span_mm: validSpan ? span : draft.parameters.span_mm,
    appearance_id: appearances.includes(appearance) ? appearance : draft.appearance_id,
    paper: papers.includes(paper) ? paper : 'A4',
  }
}

export function foldedAddress(url, settings, locale, view, step) {
  url.search = new URLSearchParams({
    construction: 'k1', lang: locale, ...settings, view, step: String(step + 1),
  })
  url.hash = ''
  return url
}

export function foldedExports(api, plan) {
  return [
    { kind: 'print-pdf', ext: 'pdf', mime: 'application/pdf', bytes: api.foldedPdf(plan) },
    { kind: 'print-svg', ext: 'svg', mime: 'image/svg+xml', bytes: api.foldedSvg(plan, true) },
    { kind: 'fold-guide', ext: 'svg', mime: 'image/svg+xml', bytes: api.foldedGuideSvg(plan) },
    { kind: 'source', ext: 'json', mime: 'application/json', bytes: api.foldedSource(plan) },
  ]
}
