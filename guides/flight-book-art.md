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

## Rubik fonts

The book’s Regular (400) and Bold (700) are static TrueType instances of Rubik 2.300 from [Google Fonts commit 765b99f8](https://github.com/google/fonts/commit/765b99f8e53c5919b24c2dac03ee16c835a9b197), packaged from [Rubik source commit e337a5f](https://github.com/googlefonts/rubik/commit/e337a5f69a9bea30e58d05bd40184d79cc099628). The [upstream OFL 1.1](../apps/editor/assets/book/Rubik-OFL.txt) ships with both fonts. Each instance keeps the full font’s Latin and Cyrillic character maps.

Fetch [the pinned variable TrueType file](https://github.com/google/fonts/blob/765b99f8e53c5919b24c2dac03ee16c835a9b197/ofl/rubik/Rubik%5Bwght%5D.ttf) as `Rubik-variable.ttf`. Its SHA-256 is `1b3a7437ba2af80e465e773ed60c5036d1ba6ace492d89046dbcf18fb31e4e88`. Generate the two faces with fontTools 4.68.0:

```sh
python -m fontTools.varLib.instancer Rubik-variable.ttf wght=400 --update-name-table -o apps/editor/assets/book/Rubik-Regular.ttf
python -m fontTools.varLib.instancer Rubik-variable.ttf wght=700 --update-name-table -o apps/editor/assets/book/Rubik-Bold.ttf
```
