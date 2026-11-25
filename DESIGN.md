# Open Flight design system

Open Flight looks like a **field notebook**: paper, graphite ink, one air-blue for information and one kite-vermilion for the next action. Fold notation is the only decoration, and the screen and the printed sheet follow the same rules. [Brand core and the directions considered](docs/design/BRAND.md) · [Decisions and the alternatives rejected](docs/design/DECISIONS.md)

## Where things live

| File | Holds |
| --- | --- |
| `apps/editor/tokens.css` | **The single source of truth**: raw values, then semantic roles. Change values only here. |
| `apps/editor/system.css` | Fonts, base elements, every shared component and the print base. |
| `apps/editor/<page>.css` | Layout for one page, using semantic tokens only. |
| `apps/editor/assets/brand/tokens.js` | Generated from `tokens.css` for code that cannot read CSS. Run `bun run build:tokens`. |
| `apps/editor/assets/brand/print.js` | Paper conventions for every PDF and printable HTML document: fonts, line styles, calibration, brand mark. |
| `apps/editor/assets/brand/` | Logo, symbol, favicon, app icons and social previews, built by `scripts/brand/build_identity.mjs`. |

Every page loads `tokens.css`, then `system.css`, then its own stylesheet. A component uses `--color-*`, `--text-*`, `--space-*`, `--radius-*`, `--line-*` and `--duration-*`, never `--of-*` raw values or literals. `bun run check:design` fails on a hard-coded colour, font, size, radius, spacing or duration.

## Colour

| Role | Token | Use |
| --- | --- | --- |
| Page, sheet, sunken | `--color-page` · `--color-surface` · `--color-surface-sunken` | The paper, a printed sheet lying on it, a recessed area. |
| Drawing stage | `--color-surface-stage` + `.stage-grid` | Pale sky with a 5 mm notebook grid behind every butterfly or airplane. |
| Text | `--color-text` · `--color-text-muted` | Graphite ink, 14.4:1 and 6.9:1 on paper. |
| Link, selection, focus | `--color-text-link` · `--color-selected` · `--color-focus` | Air-blue. Selected controls get a tint and a blue edge. |
| Next action | `--color-action` | Kite-vermilion, with white text. **One per view.** |
| Status | `--color-text-success/caution/danger` + `--color-surface-*` | Always paired with words, never colour alone. |
| Series | `--color-series-a…d` | Two things compared: L* 31 / 52 / 43 / 73, so they separate in grayscale. Label them A and B too. |
| Fold notation | `--color-line-cut/valley/mountain/guide` | The line **style** carries the meaning; colour only helps. |
| Diagram faces | `--color-diagram-front/back/moving` | White, pale and shaded faces of the sheet in fold diagrams (L* 100 / 85 / 73). |
| Editorial | `--color-poster` · `--color-surface-birch` · `--color-night*` | The book and the chapter and plate pages: signal red for numerals, flight paths and the cover wedge (5.3:1 on paper); birch paper; the night sky of the space chapter with its own text, muted, accent, info, caution and rule roles. |

Every colour sits inside a CMYK press gamut, and every text and UI pair meets WCAG 2.2 AA. The check computes all 71 pairs.

## Type

**Alegreya** (display) sets names and headings: pages, sections, species and aircraft names, sheet titles. **Open Flight Text** sets everything a person reads or does. It is a renamed Latin, Spanish and Cyrillic subset of SIL's Andika, a typeface designed for early readers (`I l 1` and `a g` are distinct). Both are self-hosted under the SIL OFL in `assets/fonts/`. **Unbounded** (`--font-poster`, OFL, from google/fonts) is the editorial poster face: book titles, numerals, pull figures and signage labels, and the headings of the chapter, plate and book pages (`--text-poster`). It is never used for reading text. Rationale: the round-3 design note, `evidence/2026-11-25-book-orientation/research-r3/design.md` in the Open Flight archive.

| Screen | Size | Paper | Size |
| --- | --- | --- | --- |
| `--text-3xl` home headline | 40–64 px | `--print-text-display` | 24 pt |
| `--text-2xl` page title | 32–40 px | `--print-text-title` sheet title | 18 pt |
| `--text-xl` section | 28 px | `--print-text-step` step heading | 12 pt |
| `--text-lg` lead | 22 px | `--print-text-body` instructions | 10.5 pt |
| `--text-md` body | 18 px | `--print-text-min` captions, legends | **9 pt minimum** |
| `--text-sm` controls | 16 px | | |
| `--text-xs` labels | **14 px minimum** | | |

Layouts must survive Russian and Spanish strings that run 30% longer than English. Let text wrap, and never set a fixed width on a control that carries words.

## Space, shape, line, motion

- Space: `--space-1…9` on a 4 px base (4, 8, 12, 16, 24, 32, 48, 64, 96 px).
- Radius: paper is crisp. `--radius-sm` (4 px) for controls, `--radius-md` (8 px) for panels and `--radius-lg` (12 px) for dialogs.
- Line: `--line-hair` 1 px rules, `--line-control` 1.5 px button edges, `--line-focus` 3 px focus ring.
- Elevation: `--shadow-sheet` for a sheet resting on the page, `--shadow-float` for menus and dialogs only.
- Motion: `--duration-quick/base/slow` with `--ease-standard` or `--ease-glide`. Under `prefers-reduced-motion`, every duration becomes 0.

## Components (system.css)

| Component | Markup | Notes |
| --- | --- | --- |
| Header | `.mast > .mast-in > .wordmark, .primary-links, .workshop-menu, .lang` | Identical on every page. At 360 px and below the wordmark crops to the symbol. |
| Language switch | `nav.lang > a#en, a#es, a#ru` | Always visible and one tap. Pages with unsaved work call `languageSwitch()` to change language in place. |
| Menu | `.workshop-menu > summary + .workshop-links` | Prerendered from the shared navigation. Tool pages retain contextual compare and flight-circuit links. |
| Breadcrumbs | `.breadcrumbs > ol` | Links to parent products and marks the current page. Product pages publish the same trail as structured data. |
| Button | `.button`, `.button.primary`, `.button.secondary`, `.button.small` | 44 px high. Use `primary` once per view. |
| Text link | `.text-link` | A next step that should not look like a box. |
| Choice | any `button[aria-pressed]`, in `.segmented` for one-of-n | Selected = tint + blue edge + bold, never colour alone. |
| Fields | native `input`, `select`, `textarea`, `input[type=range]` | Borders reach 3:1. `aria-invalid` shows the error state. |
| Panel | `.panel` | A sheet on the page. |
| Stage | `.stage-grid` | Where a model is drawn. |
| Disclosure | `details.fold-physics` | |
| Chip | `.chip` | Small status words, such as "Untested concept". |
| Print reminder | `<p class="print-reminder" data-print-reminder>` | Put one next to **every** download. `atlas-nav.js` fills it in the page language. |
| Printed calibration | `<p class="print-calibration" data-print-calibration>` with the SVG | Shown only on paper. |
| Fold-step presenter | `.fold-lesson-figure`, `.fold-lesson-actions` | Shared by the studio, airplanes and worktable. |
| Eyebrow, lead, hint | `.eyebrow`, `.lede`, `.hint` | |
| Skip link, screen-reader text | `.skip-link`, `.sr-only` | |

Touch targets are 44 × 44 px. Standalone links get this automatically, and links inside a sentence stay inline. Focus always shows a 3 px air-blue ring. `bun run check:ui http://localhost:8000/` measures rendered contrast, targets, text size, focus and overflow on every page.

## Identity

- **Symbol.** A sheet whose corner lifts away along a dashed valley fold. The lifted corner is the dart. Files: `symbol.svg` (full colour), `symbol-mono.svg` (one colour), `symbol-reversed.svg` (on ink or photos), `favicon.svg/.ico`, app icons.
- **Lockup.** Symbol plus "Open Flight" in Alegreya Bold, outlined. The cap height is half the symbol height. Files: `logo.svg`, `logo-mono.svg`, `logo-reversed.svg`.
- **Clear space.** Keep half the symbol height free on every side, the height of the lifted corner. Nothing else may enter it.
- **Minimum size.** Lockup: 96 px wide on screen (about 23 px tall), 25 mm wide on paper. Symbol alone: 16 px or 4 mm. Below 360 px wide the header shows the symbol alone.
- **Don't** recolour, rotate, outline, add effects, re-set the wordmark in another font or place the full-colour mark on a busy photo (use reversed).
- **On paper the brand stays small:** `brandMark()` is 4 mm tall and at most 25 mm wide, in the top-left header band. The sheet belongs to the child's design.

## Paper

Use `assets/brand/print.js`. Never hand-set a print size, weight or dash.

| Mark | Style | Weight |
| --- | --- | --- |
| Cut | solid | 0.5 mm, black |
| Valley fold | dashed 3 · 1.5 mm | 0.35 mm |
| Mountain fold | dash-dot 3 · 1 · 0.4 · 1 mm | 0.35 mm |
| Guide, alignment, tab hinge | dotted 0.4 · 1.2 mm | 0.3 mm |

- Work on A4 and US Letter. Keep everything important at least 6 mm from the edge (`print.safe`), and never use bleeds.
- Draw no line thinner than 0.3 mm and set no text below 9 pt: `atLeastLine()` and `atLeastText()` enforce this in every renderer. A CSS border in a printed web page uses `--print-line-css` (2 px), because browsers snap borders to whole pixels.
- Every printable carries `calibration()`, a 50 mm line with end stops and the instruction. Every download on screen has a print reminder.
- Make it work in black and white on a cheap printer. Text and cuts use black toner only. Folds differ by dash pattern, and diagram faces differ by lightness. Instructions name a line by its style ("the dashed centre line"), never by its colour.
- Use low ink: no backgrounds, panels or large fills from the system. Printed web pages drop all fills. Full-colour wing and livery art is the child's design. A low-ink "Colour it in" version exists for each butterfly.
- The b1 prototype prints through `packages/print-export/b1-frozen.ts`, kept byte-identical as recorded evidence. Don't restyle it.

## Checks

```bash
bun run check:design   # tokens in sync, 71 contrast pairs, grayscale, gamut, no hard-coded values
bun run check:print    # every library and activity PDF: 9 pt, 0.3 mm, 6 mm edge, 50 mm line, ink
bun run check:ui http://localhost:8000/   # rendered contrast, 44 px targets, focus, overflow
bun run test               # includes the design and print gates
```

To add a colour, add a raw `--of-*` value and a semantic role, run `bun run build:tokens`, then run `bun run check:design`. To add a component, put it in `system.css` once a second page needs it. Until then it belongs in the page's stylesheet, using tokens only.
