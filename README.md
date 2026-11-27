# Open Flight

*One Sheet* is a book about paper flight, and [openflight.design](https://openflight.design/) is its free web edition. It is written for readers aged 8 to 12 and the adults who build with them. It is available in English, [Spanish](README.es.md) and [Russian](README.ru.md).

Fourteen flyers each start from one sheet of paper:

- Eight airplanes. Four are named after real aircraft and four are Open Flight versions of record-setting paper planes, credited to their designers.
- Three paper butterflies.
- A ring glider, a maple spinner and a two-winged glider from a 1918 book.

Each has a printable sheet, an illustrated guide, a 3D view and a page that explains how it flies. Fold one, launch it, change one thing and launch again.

[Read the book](https://openflight.design/) · [Print & Play](https://openflight.design/print/) · [For teachers](https://openflight.design/teachers/) · [The printed edition](https://openflight.design/flight-book/) · [Contact](https://openflight.design/contact/)

Print at actual size (100%) and measure the 50 mm line on each sheet. Performance figures come from the geometry and are marked as estimates until a recorded flight replaces them.

## Terms

From 27 November 2026, Open Flight's text, illustrations, lessons, translations and printable sheets are © Open Flight. They are free to read, print and copy for personal, family and classroom use, and all other rights are reserved. Versions released before that date stay available under CC BY-SA 4.0 to anyone who received them. The software is Apache-2.0 and the editable aircraft geometry is CERN-OHL-W-2.0. Photographs and third-party sources keep their own terms. [Licenses and credits](NOTICES.md)

For publishing, translation, school or museum use, write to [hello@openflight.design](mailto:hello@openflight.design).

## Run it yourself

The `docs/` folder is the ready-to-serve site:

```sh
python3 -m http.server 8000 --directory docs
```

To build from source, install Bun 1.4.2, then run `bun install --frozen-lockfile --ignore-scripts` and `bun run build:site`. Run `bun run test` and `bun run typecheck` before proposing a change. The local studio with HTTP and MCP access starts with `bun run editor --workspace ./local/studio --port 4180`. [HTTP routes](api/openapi.json) · [MCP tools](api/mcp-tools.json) · [Integration example](examples/agent-client/journey.ts)

## Tell us how it flew

Grown-ups can [send a flight note](https://github.com/kevinmamaqi/open-flight/issues/new?template=flight-report.yml) with the model, paper, setting and what happened. Children's names, faces and contact details are not needed.

Saved designs from before the move to openflight.design open on the [previous workshop](https://kevinmamaqi.github.io/open-flight/?previous=1) in the same browser.
