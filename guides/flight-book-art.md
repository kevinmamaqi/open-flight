# Flight Book model artwork

The [book artwork](../apps/editor/assets/book/models/) covers all ten sheet IDs, three drawing styles and the selectable flyer colors at 960 × 600 pixels. The models are rendered from the workshop’s printable geometry. The poses and lighting illustrate construction. A4 defaults provide the paper dimensions for the airplane renders, which also represent their US Letter counterparts.

- The folded-body butterflies use the [folded print outline and texture](../packages/folded-butterfly/index.ts). The wings are level, the two paper walls touch below the center crease, and the clip sits on the vertical strip at the stop on the folded sheet. A 0.24 mm render separation makes the two paper surfaces visible.
- The tab butterflies use the [flight viewer’s cut and hinged panels](../apps/editor/flight-geometry.js) and its [original printed artwork](../apps/editor/assets/viewer/README.md). They show the baseline wing angles, neutral tabs, and the clip on the nose.
- The airplanes use the [whole-sheet fold sequence](../apps/editor/assets/planes/core.js) and its [printed decorations](../apps/editor/assets/planes/drawing.js). Paper layers retain their source print coordinates through folding. The optional flags mark the country where each passenger aircraft was designed. The DC-3 uses the 48-star U.S. flag from its era, the 747 uses the 50-star version, and the Soviet airplanes use the red USSR flag with the gold hammer and sickle and gold-edged star. [U.S. flag order](https://www.archives.gov/federal-register/codification/executive-order/10834.html) · [USSR flag decree reproduced in a contemporary state publication](https://www.marxists.org/history/ussr/government/1982/ussr-sixty-years-of-union-1922-1982.pdf)
- Studio uses warm directional light and a soft shadow. Drawn uses flat color, a visible ink outline and a hatched paper shadow. Ink saver uses white stock, coloring artwork for the butterflies, and unfilled markings for the airplanes. Recolorings with the same markings share Ink saver artwork. The cover treatment and the colors of the full-size pattern are independent choices.

Families can choose the colors inspired by a living butterfly or try a creative palette. The historical aircraft markings and living species have individual field records. [Atlas sources](flight-book-origins.md)

With Node.js 24 or later and this repository’s dependencies installed, point `CHROMIUM_PATH` to a Chrome or Chromium executable and run:

```sh
node scripts/build_book_art.mjs
```

The generator uses the local Three.js bundle and software WebGL through Chromium. All images and fonts are local. For byte-for-byte reproduction, use the same Chromium build. The script derives filenames from the sheet catalog and [shared appearance choices](../apps/editor/model-appearance.js). The site build generates corresponding thumbnails and lists every render in `assets/book/art-catalog.json`.

## Fonts

Since 25 November 2026 every Open Flight PDF, the book included, uses the design system's two families. They replaced Rubik and DejaVu Sans; the b1 prototype sheet keeps DejaVu Sans because its print bytes are frozen. [Design decisions](../docs/design/DECISIONS.md)

- **Open Flight Text** is a subset of Andika 6 by SIL International, renamed as the SIL Open Font License requires because "Andika" is a Reserved Font Name. Sources: `ofl/andika/Andika-Regular.ttf` (SHA-256 `202b96b1f174a4a43baefe885b40dacacb81786755efd08ed4b7704e79c45515`), `Andika-Bold.ttf` (`4361126189a2d0e0da66999352db58aaf1b4ca940faf8a8239d725f8303d890d`) and `Andika-Italic.ttf` (`6a4a0dd26d28f577b51dd6afb5acf6fd91ab21694e25649c270a32179bb52a62`) from [Google Fonts commit fffdadf0](https://github.com/google/fonts/tree/fffdadf0f0c9cc1ec8b407063424a8bfbee05611/ofl/andika).
- **Alegreya** Bold (wght 700) and Italic (wght 400) are static instances of `ofl/alegreya/Alegreya[wght].ttf` (`ba5564634b93a8f8ba57b48cd4f1ae7417d2b4656fbac779028679b00de3cf12`) and `Alegreya-Italic[wght].ttf` (`fa915eec76227935dc5fb678953c94b71287c360928013cfdb441dfe52f5a391`) from [Google Fonts commit 1b1793b5](https://github.com/google/fonts/tree/1b1793b59eba8d074e6fb720cdc95106e4a128ec/ofl/alegreya).

Both are subset to Latin, Spanish and Cyrillic and written as TrueType (for jsPDF) and WOFF2 (for the site) with fontTools 4.60.1:

```sh
python scripts/brand/subset_fonts.py <downloaded ofl folder> apps/editor/assets/fonts <charset file>
```
