# Open Flight

Make a paper glider with a child or a classroom, then change one fold and see where it lands. The free workshop runs in your browser. You can save a butterfly design on your device, download its editable source, or start with plain paper and a folding guide. [Open the workshop](https://kevinmamaqi.github.io/open-flight/?lang=en) · [По-русски](README.ru.md) · [Español](README.es.md)

| Make | Start with | What to change |
| --- | --- | --- |
| Monarch, blue morpho or swallowtail | A printed sheet, scissors and a small blunt paper clip | Wingspan, colors and two independent back tabs. Follow the cut outline, raise the wings and compare the landing marks. |
| A Boeing 747, Douglas DC-3, Tupolev Tu-144 or Ilyushin Il-62 inspired airplane | One whole sheet of A4 or US Letter paper | Choose a body fold, wingtip height and livery. Follow the illustrated stages. A printer is optional. |

The three butterflies draw on photographs of real species. The four airplane patterns are original interpretations of civil aircraft, with illustrated guides linking a full-size feature to the paper fold. The 3D flight view and three-gate circuit illustrate predictions you can compare with an actual launch. Each starter sheet includes a calibration ruler. Print at actual size and measure 50 mm on a butterfly or 20 mm on an airplane. [Field references](https://kevinmamaqi.github.io/open-flight/references.html?lang=en) · [42 PDF editions and three offline lessons](docs/library/) · [Family lesson](guides/paper-flight-lesson.md) · [Version 0.4.0](https://github.com/kevinmamaqi/open-flight/releases/tag/v0.4.0)

[![The Open Flight paper workshop with an orange Monarch on the worktable](apps/editor/assets/atlas/workshop-preview-en.png)](https://kevinmamaqi.github.io/open-flight/)

## Run it yourself

The `docs/` folder contains the ready-to-serve site. From this repository run `python3 -m http.server 8000 --directory docs`, then visit `http://localhost:8000`. Artwork, fonts, fold instructions and 3D assets are served with the site. You can share a downloaded PDF or illustrated lesson with someone who has no connection.

For the local workspace with revision history shared across HTTP and MCP, install Node 24 or later, run `npm ci`, then `npm run editor -- --workspace ./local/studio --port 4180`. The terminal reports the path to a private launch file. Open it to connect the studio to that workspace. For command-line clients see the public contracts and integration example. [HTTP routes](api/openapi.json) · [MCP tools](api/mcp-tools.json) · [Integration example](examples/agent-client/journey.ts)

## Edit or contribute

The butterfly curves, colors and measurements live in `packages/geometry`. The whole-sheet airplane models live in `apps/editor/assets/planes`. Run `npm test` and `npm run typecheck` to check your changes. With Bun installed, `npm run build:site` regenerates the browser engine, starter sheets and static site. [Geometry](packages/geometry/) · [Airplane models](apps/editor/assets/planes/) · [Terms and credits](NOTICES.md)

Grown-ups can send a short flight observation or identify a confusing fold. Include the model, paper size, setting and what happened. Children’s names, faces and contact details are unnecessary. A powered version is a research direction. The current designs are hand-launched. [Send a flight note](https://github.com/kevinmamaqi/open-flight/issues/new?template=flight-report.yml) · [Powered roadmap](https://kevinmamaqi.github.io/open-flight/references.html?lang=en#powered)
