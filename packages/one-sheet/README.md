# One Sheet: the book pipeline

*One Sheet* (working title, owner decision K1) is set as HTML and CSS from a fixed flat plan and printed by the Chromium that playwright-core already uses. The site and the book share the same content modules in `apps/editor/book/`.

| File | Holds |
| --- | --- |
| `flatplan.json` | All 160 pages as 81 fixed spreads: template, chapter, content reference (`chapter#section`), plate ID and the image each spread still needs. Page numbers are identical in EN, ES and RU. `sample` lists the spreads built by default. |
| `templates.js` | The nine templates. OP, EX, PL, DA, XP and PR set real content; SQ, LN and AP, and any spread without written content, render a labelled planning dummy. Every text box is a fixed slot (`data-slot`). |
| `content.js` | Book-only words (plate labels, captions, notes) in three languages. |
| `book.css` | Grid (210 × 279 mm; margins 18/23/20/16 mm; 12 columns, 4 mm gutters; 15 pt baseline) and type scale, on top of `apps/editor/tokens.css`. Colours are `--book-*` roles; `.night` swaps them for the space chapter. |
| `editorial.js`, `editorial.css` | Cover, back, contents, photo openers, games and index, plus the shared pieces: the flight path across every opener, the chapter numeral, metro-style roundels in the running heads, section numbers (8.1) and pull figures taken from a section's own sentence (or `pull: { value, unit, sentence }` in the module). |
| `press.css`, `home.css` | Press: 3 mm bleed (media 216 × 285 mm) and pure-black text. Home: no stage tints or page tone. |

## Build

```bash
bun scripts/build_one_sheet.mjs                 # sample, every language listed in flatplan.json
bun scripts/build_one_sheet.mjs --lang en --spreads plate-A1,contests-records
bun scripts/build_one_sheet.mjs --spreads all   # the whole 160-page dummy
bun scripts/build_one_sheet.mjs --check --lang ru   # checks only, no PDFs (used by tests)
```

The build waits for the self-hosted fonts and fails on a missing font, a slot that overflows by more than 2 px (0.53 mm, the glyph overflow of a last line), or text below 9 pt. Text inside a scaled reproduction (`data-scaled`, the A1 sheet at 1:2) is exempt, because the reduction is the point. Output in `dist/one-sheet/`: per language a screen PDF (tagged, with an outline), a home print-friendly PDF and a press PDF whose TrimBox (210 × 279 mm) and BleedBox are set with pdf-lib, plus a PNG preview of each spread. There is no PDF/X claim: colour conversion and preflight belong to the printer.

`plates/A1.js` and `figures/airplane.js` are read when they exist; until then the A1 plate shows labelled slots and is filled from `catalog.js`, `flight-notes.js` and the plane geometry.

## Open decisions

- Alegreya Regular is not shipped, so the grown-up voice is set in Open Flight Text (decision for the owner).
- Hyphenation relies on Chromium's macOS dictionaries; pre-hyphenate before a Linux build.
- Spanish and Russian are drafts for a native editor.
