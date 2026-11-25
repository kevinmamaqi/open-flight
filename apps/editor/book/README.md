# The book's content

The site is the free web edition of the book. One set of modules feeds:

- the design pages (plates);
- the chapter pages;
- Print & Play sheets;
- the book PDF.

Every module is a plain ES module with no DOM access, so it runs in the browser, in Bun and in Node. Text is always an object `{ en, es, ru }`. Spanish uses *tú*. New Russian copy uses *вы*, as `docs/design/BRAND.md` says. Spanish and Russian need a native read before release.

| Module | Holds | Owner |
| --- | --- | --- |
| `catalog.js` | Book title, chapters, appendix, plate IDs (A1–A4, B1–B3, F1–F3), lineage lines, evidence badges | Shared. Change only by agreement. |
| `flight-notes.js` | Launch line and trim table for each design | Shared |
| `plates/<ID>.js` | The editorial content of one plate (contract below) | Plate content |
| `figures/<family>.js` | The explanatory figure of each family (contract below) | Plate content |
| `chapters/<chapter-id>.js` | Chapter text for How flight works, Contests and records, and The flight lab | Book content |

## Evidence states

Every number a reader sees carries one of these states, written as words and never shown by colour alone:

`estimate` · `not-yet-measured` · `measured` (with trial ID) · `concept` · `render` · `photograph`

Never invent a flight, a measurement, a photo of a test or a quote. Records carry an "as of" date and a source URL.

## Plate content: `plates/<ID>.js`

```js
export default {
  id: 'A1', model: 'boeing-747',
  glance: [ // at most 6 rows; value strings are already formatted
    { label: { en, es, ru }, value: { en, es, ru }, state: 'estimate' | null },
  ],
  howItFlies: { en: { lead: '', body: [''], grownUps: [''] }, es: {}, ru: {} },
  why: { en: { title: '', body: [''], borrows: '' }, es: {}, ru: {} },
  tryThis: { en: { question: '', prediction: '', steps: [''], lookFor: '' }, es: {}, ru: {} },
  references: [ { label: '', url: '', note: { en, es, ru } } ],
}
```

- `lead` is one or two sentences in the making voice, which a child can follow when it is read aloud.
- `body` is two or three short paragraphs.
- `grownUps` holds the deeper physics under the “Go deeper” label: written for every age, sourced and calm, with each estimate labelled.
- `why.borrows` is a single sentence on what the fold borrows from its namesake.
- `references` are cited and linked. Never reproduce third-party diagrams.

## Figures: `figures/<family>.js`

```js
export function figure(model, lang, state = {}) // returns an SVG string
export function figureControls(model, lang)     // [{ name, label, options: [{ value, label }] }] or []
export function figureText(model, lang, state)  // the text alternative, with the numbers
```

Rules for figures:

- Pure and deterministic. The same input always gives the same bytes.
- Under 10 KB of SVG, with no WebGL and no animation required.
- Readable in grayscale. Use the brand's line styles and the colours in `assets/brand/tokens.js`.
- Show an honesty line inside the figure when the numbers are estimates.
- The plate page renders `figure(model, lang)` without JavaScript. Controls re-render it in the browser.
