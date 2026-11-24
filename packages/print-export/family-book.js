import { PDFDocument } from "pdf-lib";
import { jsPDF } from "jspdf";
import {
  paperSizes,
  sheetCatalog,
  sheetIds,
  sheetLocales,
  sheetPath,
} from "../../apps/editor/family-sheets.js";
import { bookCopy, edition, sheetName, themes } from "./family-book-copy.js";

export { bookCopy, edition, sheetName, themes };
export { sheetIds, sheetPath };
export const defaultSheets = Object.freeze(sheetCatalog.filter(item => item.construction !== 'w1').map(item => item.id))
export const coverLimit = 64;

export function normalizeBook(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new TypeError("Expected book options.");
  const {
    lang = "en",
    paper = "A4",
    theme = "sky",
    cover = "",
    sheets = defaultSheets,
  } = input;
  if (!sheetLocales.includes(lang))
    throw new TypeError("Invalid book language.");
  if (!paperSizes.includes(paper))
    throw new TypeError("Invalid book paper size.");
  if (!Object.hasOwn(themes, theme)) throw new TypeError("Invalid book theme.");
  if (
    !Array.isArray(sheets) ||
    !sheets.length ||
    !Array.from(sheets).every((id) => sheetIds.includes(id)) ||
    new Set(sheets).size !== sheets.length
  )
    throw new TypeError("Select 1 to 10 distinct sheets.");
  if (typeof cover !== "string") throw new TypeError("Invalid cover title.");
  const title = cover.trim().normalize("NFC");
  if (
    Array.from(title).length > coverLimit ||
    !/^[\p{Script=Latin}\p{Script=Cyrillic}\d .,!?'’“”«»()&+\-–#№:]*$/u.test(
      title,
    )
  )
    throw new TypeError(
      "The cover title must be at most 64 characters in Latin or Cyrillic.",
    );
  return {
    lang,
    paper,
    theme,
    cover: title || bookCopy[lang].title,
    sheets: [...sheets],
  };
}

function base64(data) {
  let binary = "";
  for (let i = 0; i < data.length; i += 8192)
    binary += String.fromCharCode(...data.subarray(i, i + 8192));
  return btoa(binary);
}

function drawWing(doc, x, y, side, fill, ink) {
  const point = (dx, dy) => [x + dx * side, y + dy];
  doc.setFillColor(fill).setDrawColor(ink).setLineWidth(0.55);
  doc
    .path([
      { op: "m", c: point(0, 0) },
      { op: "c", c: [...point(24, -55), ...point(77, -65), ...point(64, -35)] },
      { op: "c", c: [...point(61, -21), ...point(45, -11), ...point(38, -6)] },
      { op: "c", c: [...point(66, -6), ...point(46, 25), ...point(30, 25)] },
      { op: "c", c: [...point(20, 25), ...point(9, 14), ...point(0, 0)] },
      { op: "h" },
    ])
    .fillStroke();
  doc.line(...point(2, 0), ...point(55, -36));
  doc.line(...point(4, 2), ...point(34, 17));
  doc.line(...point(25, -16), ...point(37, -42));
}

export function coverArt(sheets) {
  const families = new Set(
    sheetCatalog
      .filter(({ id }) => sheets.includes(id))
      .map(({ family }) => family),
  );
  return families.size === 2
    ? "mixed"
    : families.has("airplane")
      ? "plane"
      : "butterfly";
}

function drawPlane(doc, x, y, scale, fill, ink) {
  const point = (dx, dy) => [x + dx * scale, y + dy * scale];
  doc.setFillColor(fill).setDrawColor(ink).setLineWidth(0.55);
  doc
    .path([
      { op: "m", c: point(-64, -5) },
      { op: "l", c: point(63, -43) },
      { op: "l", c: point(37, 34) },
      { op: "l", c: point(1, 14) },
      { op: "l", c: point(-15, 35) },
      { op: "l", c: point(-19, 6) },
      { op: "h" },
    ])
    .fillStroke();
  doc.line(...point(-19, 6), ...point(63, -43));
  doc.line(...point(1, 14), ...point(63, -43));
  doc.line(...point(-15, 35), ...point(1, 14));
}

function frontMatter(
  { lang, paper, theme, cover, sheets },
  font,
  sheetDocuments,
) {
  const copy = bookCopy[lang],
    { ink, wash, accent, wing } = themes[theme];
  const doc = new jsPDF({
    format: paper === "A4" ? "a4" : "letter",
    compress: true,
    putOnlyUsedFonts: true,
  });
  const w = doc.internal.pageSize.getWidth(),
    h = doc.internal.pageSize.getHeight();
  const left = 19,
    right = w - left;
  doc.addFileToVFS("Book.ttf", base64(font));
  doc.addFont("Book.ttf", "Book", "normal");
  doc.setFont("Book");
  doc.setFileId("6f70656e666c69676874626f6f6b3036");
  doc.setCreationDate("D:20000101000000+00'00'");
  doc.setProperties({
    title: cover,
    author: "Open Flight",
    subject: copy.edition,
  });
  const text = (value, x, y, size, color = ink, options) =>
    doc.setFontSize(size).setTextColor(color).text(value, x, y, options);
  const line = (y) =>
    doc.setDrawColor(accent).setLineWidth(0.35).line(left, y, right, y);
  doc.setFillColor(wash).roundedRect(11, 11, w - 22, h - 22, 3, 3, "F");
  text("OPEN FLIGHT", left, 25, 12, accent);
  text(paper === "A4" ? "A4" : "US Letter", right, 25, 11, accent, {
    align: "right",
  });
  line(30);
  let headingSize = 34;
  let heading = doc
    .setFontSize(headingSize)
    .splitTextToSize(cover, w - 2 * left);
  while (heading.length > 3 && headingSize > 18) {
    headingSize -= 2;
    heading = doc.setFontSize(headingSize).splitTextToSize(cover, w - 2 * left);
  }
  text(heading, left, 51, headingSize);
  const headingBottom =
    51 + ((heading.length - 1) * headingSize * 1.15 * 25.4) / 72;
  text(
    doc.setFontSize(13).splitTextToSize(copy.subtitle, w - 2 * left),
    left,
    headingBottom + 12,
    13,
  );
  const cx = w / 2,
    cy = h - 90;
  doc.setDrawColor(accent).setLineWidth(0.22);
  doc.circle(cx, cy - 10, 60, "S").circle(cx, cy - 10, 49, "S");
  const artwork = coverArt(sheets);
  if (artwork !== "plane") {
    const x = artwork === "mixed" ? cx - 12 : cx;
    const y = artwork === "mixed" ? cy - 7 : cy;
    drawWing(doc, x, y, 1, wing, ink);
    drawWing(doc, x, y, -1, wing, ink);
    doc.setFillColor(ink).roundedRect(x - 1.7, y - 12, 3.4, 23, 1.7, 1.7, "F");
    doc.line(x, y - 10, x - 5, y - 19).line(x, y - 10, x + 5, y - 19);
  }
  if (artwork === "plane") drawPlane(doc, cx, cy - 6, 1, wing, ink);
  if (artwork === "mixed")
    drawPlane(doc, cx + 29, cy + 24, 0.57, "#ffffff", ink);
  line(h - 36);
  text(copy.edition, left, h - 26, 11, accent);
  text(String(sheets.length).padStart(2, "0"), right, h - 26, 15, ink, {
    align: "right",
  });

  doc.addPage();
  text("OPEN FLIGHT", left, 21, 11, accent);
  line(26);
  text(copy.print, left, 41, 28);
  let y = 55;
  for (const [i, [title, body]] of copy.notes.entries()) {
    doc.setFillColor(wash).roundedRect(left, y - 4, 9, 9, 2, 2, "F");
    text(String(i + 1), left + 4.5, y + 2, 11, ink, { align: "center" });
    text(title, left + 13, y + 2, 12, accent);
    const paragraphs = doc
      .setFontSize(10.5)
      .splitTextToSize(body, w - 2 * left - 13);
    text(paragraphs, left + 13, y + 8, 10.5);
    y += 16 + paragraphs.length * 4.4;
  }
  doc
    .setDrawColor(ink)
    .setLineWidth(0.3)
    .line(left, y, left + 50, y);
  doc.line(left, y - 2, left, y + 2).line(left + 50, y - 2, left + 50, y + 2);
  text(copy.ruler, left + 55, y + 1.3, 9);
  y += 16;
  line(y);
  text(copy.contents, left, y + 9, 14);
  let start = 3;
  sheets.forEach((id, i) => {
    const column = i < 5 ? 0 : 1;
    const width = (w - 2 * left) / 2;
    const x = left + column * width;
    const row = y + 19 + (i % 5) * 6.2;
    const last = start + sheetDocuments[i].getPageCount() - 1;
    const range = start === last ? String(start) : start + "-" + last;
    text(String(i + 1).padStart(2, "0"), x, row, 8, accent);
    text(
      [sheetName(id, lang), edition(id)].filter(Boolean).join("  "),
      x + 8,
      row,
      8.5,
    );
    text(copy.pageAbbr + " " + range, x + width - 5, row, 8, accent, {
      align: "right",
    });
    start = last + 1;
  });
  const credits = {
    en: "Art and guides · CC BY-SA 4.0   |   Aircraft patterns · CERN-OHL-W-2.0",
    es: "Arte y guías · CC BY-SA 4.0   |   Plantillas · CERN-OHL-W-2.0",
    ru: "Рисунки и инструкции · CC BY-SA 4.0   |   Выкройки · CERN-OHL-W-2.0",
  };
  text("Open Flight contributors · github.com/kevinmamaqi/open-flight", left, h - 20, 8, accent);
  doc.link(left, h - 24, 105, 6, { url: "https://github.com/kevinmamaqi/open-flight/blob/main/NOTICES.md" });
  text(credits[lang], left, h - 15, 7.4, ink);
  return doc.output("arraybuffer");
}

export async function createBook(input, { loadAsset }) {
  const book = normalizeBook(input);
  const [font, ...originals] = await Promise.all([
    loadAsset("assets/planes/vendor/DejaVuSans.ttf"),
    ...book.sheets.map((id) => loadAsset(sheetPath(id, book.paper, book.lang))),
  ]);
  const sheetDocuments = await Promise.all(
    originals.map((bytes) =>
      PDFDocument.load(bytes, { updateMetadata: false }),
    ),
  );
  const output = await PDFDocument.load(
    frontMatter(book, font, sheetDocuments),
    { updateMetadata: false },
  );
  const { width, height } = output.getPage(0).getSize();
  for (const original of sheetDocuments) {
    // Copy complete page objects, preserving page boxes, resources and scale.
    for (const page of original.getPages()) {
      const size = page.getSize();
      if (
        Math.abs(size.width - width) > 1 ||
        Math.abs(size.height - height) > 1
      )
        throw new Error("A sheet does not match the selected book paper size.");
    }
    const pages = await output.copyPages(original, original.getPageIndices());
    for (const page of pages) output.addPage(page);
  }
  output.setTitle(book.cover);
  output.setAuthor("Open Flight");
  output.setCreator("Open Flight");
  output.setLanguage(book.lang);
  return output.save({ useObjectStreams: false });
}
