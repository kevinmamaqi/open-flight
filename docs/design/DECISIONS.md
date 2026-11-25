# Design decisions

Each entry records the choice, the alternative rejected and the reason. Dated 25 November 2026, branch `design/brand-system`. The guidelines are in [DESIGN.md](../../DESIGN.md); the [brand core and the three directions](BRAND.md) come first.

## Direction and identity

1. **Field notebook over fold diagram and air mail.** The fold-diagram direction relies on colour-coded lines that fail in grayscale, and it is cold for a five-year-old. Air mail costs ink, competes with the child's colouring and is nostalgic for adults rather than children. The notebook is what a family actually makes (predict, launch, record, compare), and it is mostly paper and line, so the print rules come for free.
2. **A sheet with a lifted corner as the symbol.** I rejected a paper-dart silhouette (the generic "send" icon, already owned by messaging apps), a butterfly (cute, and half the product is airplanes), and a plain fold arrow (weak at 16 px). The lifted corner reads as paper, fold and take-off at once. It survives at 16 px without its dashes, and it reverses cleanly.
3. **The wordmark is outlined Alegreya Bold.** It is composed with HarfBuzz kerning (`scripts/brand/outline_wordmark.py`), so the logo never depends on a font being installed. I rejected a custom-drawn wordmark: it would take longer and not be better.

## Colour

4. **Paper, graphite, air-blue and kite-vermilion replace cream, pine green and orange.** The old orange CTA (#fc885b) could not carry white text (2.2:1), and dark green on dark green panels was heavy on screen. The new action colour carries white text at 5.3:1. Air-blue is reserved for information and selection, so the one warm colour always means "do this next".
5. **The next action is vermilion, not air-blue.** A blue primary would follow the SaaS default. Vermilion is the colour of a paper dart and the monarch, and it stands apart from links and selection.
6. **Every colour was checked against a press profile.** Each raw colour is converted sRGB → Generic CMYK → sRGB. The largest shift is 22/255, and nothing is neon. Series colours are spaced in L* (31 / 43 / 52 / 73) so a grayscale print still tells them apart. I lightened the green from L* 38 to 43 after the first check failed.
7. **Design colours stay out of the UI palette.** Wing palettes, airplane liveries, map art and 3D model colours belong to the paper designs. The studio's colour dots now read the real print palettes (`assets/atlas/swatches.js`) instead of a second hand-copied set of hex values in CSS.

## Type

8. **Two families: Alegreya and Open Flight Text (Andika).** I compared Literata, Bitter, Golos, Onest and Andika as display faces, and Andika, Golos and Onest as text faces, in Latin and Cyrillic. Andika was designed by SIL for beginning readers, so `I l 1` and `a g` are distinct and its Cyrillic is first-class, without the rounded "kids app" look. Alegreya is narrow, so headings have room for Russian text that runs 30% longer, and its book character suits species and aircraft names. I rejected Rubik (generic and heavy in display use) and Georgia (a system font that differs across platforms).
9. **Andika ships renamed as "Open Flight Text".** "Andika" is a Reserved Font Name, and the OFL forbids a modified font (our Latin, Spanish and Cyrillic subset) from using it. I rejected shipping SIL's full web font: about 300 kB per style against 22 kB. Credit and licence: `assets/fonts/OFL-Andika.txt`.
10. **Nothing smaller than 14 px on screen or 9 pt on paper.** Most old UI labels were 11–12 px, and the sheets were 6–8 pt. The audit showed text from 5.8 pt up. The renderers now clamp at the minimum, and two dense layouts (K2 guide, objects packet) were respaced instead of shrunk.

## Tokens and components

11. **`tokens.css` is the single source; `tokens.js` is generated from it.** The PDF generators run in Node and in a browser bundle and cannot read CSS. I rejected a JSON source with generated CSS, because people edit the CSS and it stays readable in the browser. `npm test` fails if the two drift apart.
12. **One `system.css` replaces `atlas-nav.css`, `fold-lesson.css` and the copies of base styles in every page stylesheet.** Fourteen stylesheets each restyled `body`, `button`, headings and the header. Three different headers (`.mast`, `.topbar`, `.bar`) and three button families (`.btn`, `.button`, `.primary`) are now one each.
13. **One language switch: three links, everywhere.** The studio and airplane pages used a `<select>`, which takes two taps and is hidden on phones. Links keep `hreflang` and work without JavaScript. Pages with unsaved work intercept the click and switch in place.
14. **The home page puts two ways in first.** "Make a butterfly · Cut + fold" (primary) and "Fold an airplane · Whole sheet · folds only" come first, and the Flight Book becomes a link. The old hero offered three equal actions, led by a 32-page book. A parent on a phone should see the next step and what it needs in one glance. The descriptors reuse strings that were already translated, so no new copy was needed.
15. **Touch targets are fixed in the base layer.** `button`, `select`, `summary` and standalone links get 44 px through zero-specificity rules, so page layouts still win. The audit fell from 306 undersized targets to 7. The exception: the seven fold-progress segments on the airplane page are 41 px wide at 375 px. Widening them would wrap the progress bar, and the Previous/Next buttons beside them are full-size.

## Paper

16. **One fold notation everywhere: valley dashed, mountain dash-dot, guide dotted.** K1 and K2 drew the valley fold *dotted*, which on W1 meant "trim mark", and K2's instructions told children to fold "the gold line" and "the blue line". The notation is now shared through `print.js`, and the instructions name the line style ("the dashed centre line"). Airplane fold diagrams moved from cream/mint/orange faces, which looked identical in grayscale, to white/pale/shaded faces (L* 100/85/73).
17. **A 50 mm calibration line on every printable.** Airplanes and flying objects had a 20 mm bar and butterflies a 50 mm one. A single length is easier to explain. 50 mm shows a 2% scaling error as a full millimetre, and the "fit to page" note now says the line measures about 48 mm.
18. **Text and cut lines print in black, not graphite.** On a colour printer, a dark blue-grey prints as a four-colour mix that blurs on cheap paper and fails on a mono laser. Screen ink stays graphite.
19. **Low ink.** The Flight Book cover lost its full-page wash for a 0.5 mm frame, the ruler box and source panel lost their fills, and printed web pages drop every background. Wing and livery art stays full colour, because it is the child's design. A low-ink "colour it in" option already exists. The ink check measures the inked area per page and fails above 50%; the fullest library sheet inks 21% of its page.
20. **Page numbers in the book are set in the brand face through embedded jsPDF pages.** pdf-lib can only use its standard Helvetica without `fontkit`. That would mean a third typeface or a new dependency.
21. **The b1 prototype sheet stays frozen.** Re-exporting revision b1 must reproduce `designs/butterfly-001/print/*.pdf` byte for byte. That PDF is the recorded artifact of the first physical trials. Its renderer moved verbatim to `packages/print-export/b1-frozen.ts` and keeps DejaVu Sans. I rejected restyling it: it would rewrite evidence.
22. **Fingerprinted geometry modules are untouched.** `packages/geometry/butterfly.ts` and the three W1 modules hash their own source into every design revision. Line styles for their output are applied in the renderers by line id instead.

## Dependencies, build steps, assets

23. **No new runtime dependency, build step, tracker or paid asset.** The fonts are OFL. The identity, font subsets and social images come from authoring scripts (`scripts/brand/`) run by hand when the mark changes. Their outputs are committed, so the GitHub Pages build is unchanged. `scripts/build_tokens.mjs` follows the repo's existing practice of committed generated files. The scripts use the existing devDependencies (`playwright-core`, `@napi-rs/canvas`) and ImageMagick. Font subsetting used fontTools 4.60.1 and uharfbuzz in a throwaway virtual environment. They are recorded in [the font provenance note](../../guides/flight-book-art.md), not added to the project.
24. **The dev server, site build and offline packages list the new files.** `apps/api/server.ts`, `scripts/build_site.mjs` and `scripts/package_atlas.py` allowlist files explicitly. Without the entries, the studio served by the local API loaded unstyled.

## Unsure

- Andika's simplicity may read as plain to a 12-year-old. Only an observed session can tell. Alegreya headings carry the character for now.
- Vermilion and air-blue are close to the Spanish flag reds and the Russian flag blues of the airplane liveries. On sheets they never sit next to each other, but a livery-heavy page might feel busy.
- The new Spanish and Russian strings (print reminder, calibration, K2 line-style wording, K2 construction label) are my translations and need a native read.
