import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { PDFDocument, PDFRawStream, decodePDFRawStream } from "pdf-lib";
import {
  coverArt,
  createBook,
  normalizeBook,
  sheetIds,
  sheetPath,
} from "../packages/print-export/family-book.js";

const loadAsset = (path) =>
  readFile(new URL("../apps/editor/" + path, import.meta.url));

function content(page) {
  const contents = page.node.Contents();
  const streams =
    contents instanceof PDFRawStream
      ? [contents]
      : contents.asArray().map((ref) => page.doc.context.lookup(ref));
  return streams.map((stream) =>
    Buffer.from(decodePDFRawStream(stream).decode()),
  );
}

test("family book validates localized options and keeps the chosen order", () => {
  assert.equal(
    normalizeBook({ lang: "ru" }).cover,
    "Наша семейная книга полётов",
  );
  assert.deepEqual(
    normalizeBook({ sheets: ["douglas-dc3", "monarch"] }).sheets,
    ["douglas-dc3", "monarch"],
  );
  assert.equal(
    normalizeBook({ cover: "  Aventura y aviación  " }).cover,
    "Aventura y aviación",
  );
  for (const options of [
    { lang: "xx" },
    { theme: "constructor" },
    { paper: "Letter" },
    { cover: "🐛" },
    { cover: "Ж".repeat(65) },
    { sheets: [] },
    { sheets: ["../other"] },
    { sheets: ["monarch", "monarch"] },
    { sheets: Array(1) },
  ])
    assert.throws(() => normalizeBook(options), TypeError);
  assert.equal(coverArt(["boeing-747"]), "plane");
  assert.equal(coverArt(["monarch"]), "butterfly");
  assert.equal(coverArt(["monarch-k1", "boeing-747"]), "mixed");
});

const editions = ["en", "es", "ru"].flatMap((lang) =>
  ["A4", "US_LETTER"].map((paper) => [lang, paper]),
);
for (const [lang, paper] of editions) {
  test(`family book keeps source page order, content and scale for ${lang} ${paper}`, async () => {
    const sheets = [...sheetIds].reverse();
    const input = {
      lang,
      paper,
      cover: lang === "ru" ? "Лётный клуб" : "Flight Club",
      sheets,
    };
    const bytes = await createBook(input, { loadAsset });
    const document = await PDFDocument.load(bytes, { updateMetadata: false });
    assert.equal(document.getTitle(), input.cover);
    const dimensions =
      paper === "A4" ? [(210 * 72) / 25.4, (297 * 72) / 25.4] : [612, 792];
    const front = document.getPage(0);
    assert.ok(Math.abs(dimensions[0] - front.getWidth()) < 0.1);
    assert.ok(Math.abs(dimensions[1] - front.getHeight()) < 0.1);
    const commands = content(document.getPage(1)).join("\n");
    const actualLength = [
      ...commands.matchAll(/([\d.]+) ([\d.]+) m\n([\d.]+) \2 l/g),
    ].map(([, x1, , x2]) => Math.abs(Number(x2) - Number(x1)));
    assert.ok(
      actualLength.some(
        (length) => Math.abs(length - (50 * 72) / 25.4) < 0.001,
      ),
    );
    let next = 2;
    for (const id of sheets) {
      const original = await PDFDocument.load(
        await loadAsset(sheetPath(id, paper, lang)),
        { updateMetadata: false },
      );
      for (const source of original.getPages()) {
        const actual = document.getPage(next++);
        assert.deepEqual(actual.getMediaBox(), source.getMediaBox());
        assert.deepEqual(actual.getCropBox(), source.getCropBox());
        assert.deepEqual(actual.getRotation(), source.getRotation());
        assert.deepEqual(content(actual), content(source));
      }
    }
    assert.equal(document.getPageCount(), next);
    if (lang === "ru" && paper === "A4")
      assert.deepEqual(await createBook(input, { loadAsset }), bytes);
  });
}

test("family book reports a substituted wrong-size sheet", async () => {
  await assert.rejects(
    createBook(
      { sheets: ["monarch"] },
      {
        loadAsset: (path) => loadAsset(path.replace("-A4-", "-US_LETTER-")),
      },
    ),
    /paper size/,
  );
});
