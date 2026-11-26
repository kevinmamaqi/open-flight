import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  PDFDocument,
  PDFName,
  PDFRawStream,
  decodePDFRawStream,
} from "pdf-lib";
import { bookPlan, bookURL, readBookURL } from "../apps/editor/book-model.js";
import { sheetCatalog } from "../apps/editor/family-sheets.js";
import {
  createBook,
  normalizeBook,
  sheetIds,
  sheetPath,
} from "../packages/print-export/family-book.js";

const loadAsset = (path) =>
  readFile(new URL("../apps/editor/" + path, import.meta.url));

function streams(page) {
  const contents = page.node.Contents();
  return contents instanceof PDFRawStream
    ? [contents]
    : contents.asArray().map((ref) => page.doc.context.lookup(ref));
}

function content(stream) {
  return Buffer.from(decodePDFRawStream(stream).decode());
}

test("flight book validates localized options and keeps the chosen order", () => {
  assert.equal(normalizeBook({ lang: "ru" }).cover, "Книга полётов");
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
    { style: "constructor" },
    { cover: "🐛" },
    { cover: "Ж".repeat(65) },
    { sheets: [] },
    { sheets: ["../other"] },
    { sheets: ["monarch", "monarch"] },
    { sheets: Array(1) },
  ])
    assert.throws(() => normalizeBook(options), /Invalid|Select/);
});

const editions = ["en", "es", "ru"].flatMap((lang) =>
  ["A4", "US_LETTER"].map((paper) => [lang, paper]),
);
for (const [lang, paper] of editions) {
  test(`flight book preserves source sheets and stamps the index for ${lang} ${paper}`, async () => {
    const sheets = [...sheetIds].reverse();
    const input = {
      lang,
      paper,
      cover: lang === "ru" ? "Лётный клуб" : "Flight Club",
      pilot: {
        en: "Long Name ".repeat(4).trim(),
        es: "Lucía Núñez",
        ru: "Алёна Жукова",
      }[lang],
      style: { en: "studio", es: "illustrated", ru: "ink" }[lang],
      sheets,
    };
    const normalized = normalizeBook(input);
    const plan = bookPlan(normalized);
    const bytes = await createBook(input, { loadAsset });
    // Page text as a reader sees it (the stamps are set in the Open Flight text face).
    const readable = await getDocument({ data: new Uint8Array(bytes), verbosity: 0 }).promise;
    const pageText = async (n) =>
      (await (await readable.getPage(n)).getTextContent()).items.map((item) => item.str).join(" ");
    const document = await PDFDocument.load(bytes, { updateMetadata: false });
    assert.equal(document.getTitle(), input.cover);
    const print = document.catalog.getOrCreateViewerPreferences();
    assert.equal(print.getDuplex(), "Simplex");
    assert.equal(print.getPrintScaling(), "None");
    const dimensions =
      paper === "A4" ? [(210 * 72) / 25.4, (297 * 72) / 25.4] : [612, 792];
    const front = document.getPage(0);
    assert.ok(Math.abs(dimensions[0] - front.getWidth()) < 0.1);
    assert.ok(Math.abs(dimensions[1] - front.getHeight()) < 0.1);
    const commands = streams(document.getPage(1)).map(content).join("\n");
    const actualLength = [
      ...commands.matchAll(/([\d.]+) ([\d.]+) m\n([\d.]+) \2 l/g),
    ].map(([, x1, , x2]) => Math.abs(Number(x2) - Number(x1)));
    assert.ok(
      actualLength.some(
        (length) => Math.abs(length - (50 * 72) / 25.4) < 0.001,
      ),
    );
    const certificate = document.getPage(4);
    const links = certificate.node
      .Annots()
      .asArray()
      .map((ref) => {
        const link = document.context.lookup(ref);
        return link
          .lookup(PDFName.of("A"))
          .lookup(PDFName.of("URI"))
          .decodeText();
      });
    assert.ok(links.includes(bookURL(normalized)));
    assert.match(streams(certificate).map(content).join("\n"), / re\nf/g);

    let pageNumber = 6;
    let sharedGuides = 0;
    for (const id of sheets) {
      const original = await PDFDocument.load(
        await loadAsset(sheetPath(id, paper, lang)),
        { updateMetadata: false },
      );
      for (const [index, source] of original.getPages().entries()) {
        if (id.endsWith("-k1") && index === 2 && sharedGuides++) continue;
        // The airplane back face is for loose double-sided sheets and stays out of the book.
        const bookPages = sheetCatalog.find((sheet) => sheet.id === id).bookPages;
        if (bookPages && !bookPages.includes(index)) continue;
        const actual = document.getPage(pageNumber - 1);
        for (const box of [
          "MediaBox",
          "CropBox",
          "BleedBox",
          "TrimBox",
          "ArtBox",
          "Rotation",
        ])
          assert.deepEqual(actual[`get${box}`](), source[`get${box}`]());
        const sourceStreams = streams(source).map((stream) =>
          Buffer.from(stream.getContents()),
        );
        const actualStreams = streams(actual);
        const copiedContent = actualStreams.map((stream) =>
          Buffer.from(stream.getContents()),
        );
        assert.ok(
          copiedContent.some((_, start) =>
            sourceStreams.every((stream, offset) =>
              copiedContent[start + offset]?.equals(stream),
            ),
          ),
          `Unchanged source content for ${id} page ${index + 1}`,
        );
        const stamp = `${String(pageNumber).padStart(2, "0")} / ${plan.pageCount}`;
        const printed = await pageText(pageNumber);
        assert.ok(printed.includes(stamp), `Page stamp ${stamp}`);
        if (id.endsWith("-k1") && index === 0) {
          const heading = { en: "How to build and launch", es: "Cómo construir y lanzar", ru: "Сборка и запуск" }[lang];
          assert.ok(printed.includes(heading), `K1 pattern identifies the shared guide by its title`);
          assert.ok((await pageText(plan.guidePage)).includes(heading));
        }
        if (bookPages?.length === 4 && index === 2) {
          const standalone = { en: "separate airplane PDF", es: "PDF individual del avión", ru: "отдельном PDF самолёта" }[lang];
          assert.ok(printed.replace(/\s+/g, " ").includes(standalone), "Duplex instructions identify the standalone PDF");
        }
        pageNumber++;
      }
    }
    assert.equal(document.getPageCount(), pageNumber - 1 + plan.originPages.length);
    assert.deepEqual(plan.originPages.map(page => page.number), plan.originPages.map((_, i) => pageNumber + i));
    assert.equal(document.getPageCount(), plan.pageCount);
    if (lang === "ru" && paper === "A4")
      assert.deepEqual(await createBook(input, { loadAsset }), bytes);
  });
}

test("flight book reports a substituted wrong-size sheet", async () => {
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

test("the two Monarch sheets produce a localized paired flight log, including in reversed print order", async () => {
  const titles = { en: "Monarch flight trial", es: "Prueba de vuelo", ru: "Полёт монархов" };
  for (const [lang, paper] of editions) {
    const sheets = paper === "A4" ? ["monarch-k1", "monarch-k2"] : ["monarch-k2", "monarch-k1"];
    const bytes = await createBook({ lang, paper, sheets }, { loadAsset });
    const pdf = await getDocument({ data: bytes, verbosity: 0 }).promise;
    try {
      const text = async n => (await (await pdf.getPage(n)).getTextContent()).items.map(item => item.str.trim());
      const materials = (await text(2)).join(" ");
      assert.match(materials, /120/);
      assert.match(materials, /33/);
      const pen = { en: "empty ballpoint pen", es: "bolígrafo sin tinta", ru: "ручку без чернил" }[lang];
      assert.ok(materials.replace(/\s+/g, " ").includes(pen));
      const log = await text(4);
      assert.ok(log.some(line => line.includes(titles[lang])));
      assert.ok(log.includes("K1") && log.includes("K2"));
      assert.deepEqual(log.filter(line => /^[1-5]$/.test(line)), ["1", "2", "3", "4", "5"]);
    } finally {
      await pdf.destroy();
    }
  }
  const ordinary = await createBook({ sheets: ["monarch-k1", "monarch-k2"], activities: ["ring"] }, { loadAsset });
  const pdf = await getDocument({ data: ordinary, verbosity: 0 }).promise;
  try {
    const log = await (await pdf.getPage(4)).getTextContent();
    assert.ok(log.items.some(item => item.str === "Flight log"));
  } finally {
    await pdf.destroy();
  }
});

test("the airplane edge choice is explicit, shareable and changes only airplane pages", async () => {
  assert.equal(normalizeBook({}).edge, "cut");
  assert.throws(() => normalizeBook({ edge: "borderless" }), /edge/);
  const whole = normalizeBook({ edge: "whole", sheets: ["boeing-747", "monarch-k1"] });
  assert.equal(readBookURL(bookURL(whole)).edge, "whole");
  assert.ok(!bookURL(normalizeBook({})).includes("edge="), "the default leaves old links unchanged");
  const pagesOf = async (edge) => {
    const bytes = await createBook({ edge, sheets: ["boeing-747", "monarch-k1"] }, { loadAsset });
    const document = await PDFDocument.load(bytes, { updateMetadata: false });
    return document.getPages().map((page) => streams(page).map(content).join("\n"));
  };
  const [cut, uncut] = await Promise.all([pagesOf("cut"), pagesOf("whole")]);
  assert.equal(cut.length, uncut.length);
  const plan = bookPlan(normalizeBook({ sheets: ["boeing-747", "monarch-k1"] }));
  const [airplane, butterfly] = plan.entries;
  const template = airplane.pages.find(({ index }) => index === 0).number - 1;
  assert.notEqual(cut[template], uncut[template], "the airplane template changes with the edge");
  // Butterfly pages are cut along their outline either way. (The certificate link records the edge.)
  for (const { number } of butterfly.pages)
    assert.equal(cut[number - 1], uncut[number - 1], `butterfly page ${number} is unchanged`);
});

test("a K3 butterfly enters the book on its landscape sheet with its own guide", async () => {
  for (const paper of ["A4", "US_LETTER"]) {
    const book = normalizeBook({ sheets: ["swallowtail-k3"], paper });
    const plan = bookPlan(book);
    assert.deepEqual(plan.entries[0].pages.map(({ index }) => index), [0, 2]);
    const document = await PDFDocument.load(await createBook(book, { loadAsset }), { updateMetadata: false });
    const sheet = document.getPage(plan.entries[0].pages[0].number - 1);
    const [long, short] = paper === "A4" ? [297, 210] : [279.4, 215.9];
    assert.ok(Math.abs(sheet.getWidth() - (long * 72) / 25.4) < 0.1, "landscape sheet");
    assert.ok(Math.abs(sheet.getHeight() - (short * 72) / 25.4) < 0.1);
  }
});

test("a K2 butterfly enters the book on its landscape sheet with its own guide", async () => {
  const book = normalizeBook({ sheets: ["monarch-k2"], paper: "A4" });
  const plan = bookPlan(book);
  assert.deepEqual(plan.entries[0].pages.map(({ index }) => index), [0, 2]);
  const document = await PDFDocument.load(await createBook(book, { loadAsset }), { updateMetadata: false });
  const sheet = document.getPage(plan.entries[0].pages[0].number - 1);
  assert.ok(Math.abs(sheet.getWidth() - (297 * 72) / 25.4) < 0.1, "landscape sheet");
  assert.ok(Math.abs(sheet.getHeight() - (210 * 72) / 25.4) < 0.1);
});
