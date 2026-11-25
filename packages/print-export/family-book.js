import { Duplex, PDFDocument, PrintScaling } from "pdf-lib";
import { jsPDF } from "jspdf";
import { fontFiles, print, registerFonts, useFont } from "../../apps/editor/assets/brand/print.js";
import qrcode from "qrcode-generator";
import { appearanceArtPath } from "../../apps/editor/model-appearance.js";
import { loadAppearanceSheet } from "./appearance-sheet.js";
import { drawOriginPages, loadOriginArt } from "./model-origin-pages.js";
import {
  bookEdition,
  bookPlan,
  bookURL,
  modelDetails,
  normalizeBook,
} from "../../apps/editor/book-model.js";
import { sheetCatalog } from "../../apps/editor/family-sheets.js";
import {
  bookCopy,
  flightBookCopy,
  sheetName,
  themes,
} from "./family-book-copy.js";

export { bookCopy, edition, sheetName, themes } from "./family-book-copy.js";
export { sheetIds, sheetPath } from "../../apps/editor/family-sheets.js";
export {
  bookPlan,
  coverLimit,
  defaultSheets,
  normalizeBook,
} from "../../apps/editor/book-model.js";

export function coverArt(sheets) {
  const families = new Set(
    sheetCatalog
      .filter(({ id }) => sheets.includes(id))
      .map(({ family }) => family),
  );
  if (families.size === 2) return "mixed";
  return families.has("airplane") ? "plane" : "butterfly";
}

function base64(data) {
  let binary = "";
  for (let i = 0; i < data.length; i += 8192) {
    binary += String.fromCharCode(...data.subarray(i, i + 8192));
  }
  return btoa(binary);
}

function drawQR(doc, url, center, y) {
  const code = qrcode(0, "M");
  code.addData(url);
  code.make();
  const modules = code.getModuleCount();
  const quietZone = 4;
  const size = Math.min(75, Math.max(58, (modules + quietZone * 2) * 0.65));
  const x = center - size / 2;
  const step = size / (modules + quietZone * 2);
  doc.setFillColor("#ffffff").rect(x, y, size, size, "F");
  doc.setFillColor("#111111");
  for (let row = 0; row < modules; row++) {
    let start = 0;
    while (start < modules) {
      if (!code.isDark(row, start)) {
        start++;
        continue;
      }
      let end = start + 1;
      while (end < modules && code.isDark(row, end)) end++;
      doc.rect(
        x + (start + quietZone) * step,
        y + (row + quietZone) * step,
        (end - start) * step,
        step,
        "F",
      );
      start = end;
    }
  }
  return y + size;
}

function frontMatter(book, plan, regular, bold, display, art, artPaths, originArt) {
  const { lang, paper, theme, cover, sheets, pilot, style } = book;
  const instructions = bookCopy[lang];
  const copy = flightBookCopy[lang];
  const palette = themes[theme];
  const { ink, wash, accent } =
    style === "ink"
      ? { ink: "#202020", wash: "#fafafa", accent: "#464646" }
      : palette;
  const hairline = style === "ink" ? "#777777" : accent;
  const doc = new jsPDF({
    format: paper === "A4" ? "a4" : "letter",
    compress: true,
    putOnlyUsedFonts: true,
  });
  doc.setFileId("6f70656e666c69676874626f6f6b3037");
  doc.setCreationDate("D:20000101000000+00'00'");
  // The Open Flight faces (assets/brand/print.js); `regular` and `bold` carry the text face, `display` the serif.
  registerFonts(doc, { text: base64(regular), bold: base64(bold), display: base64(display) });

  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const left = 14;
  const right = w - left;
  const width = right - left;
  const text = (
    value,
    x,
    y,
    size,
    { color = ink, weight = "normal", align = "left" } = {},
  ) => {
    useFont(doc, weight === "display" ? "display" : weight === "bold" ? "bold" : "text");
    return doc.setFontSize(Math.max(size, print.text.min)).setTextColor(color).text(value, x, y, { align });
  };
  const wrap = (value, size, maxWidth, weight = "normal") => {
    useFont(doc, weight === "display" ? "display" : weight === "bold" ? "bold" : "text");
    return doc.setFontSize(Math.max(size, print.text.min)).splitTextToSize(value, maxWidth);
  };
  const rule = (x1, y1, x2, y2, weight = print.line.min) =>
    doc.setDrawColor(hairline).setLineWidth(Math.max(weight, print.line.min)).line(x1, y1, x2, y2);
  function fit(value, size, maxWidth, lines, weight = "display") {
    let fitted = wrap(value, size, maxWidth, weight);
    while (fitted.length > lines && size > print.text.min)
      fitted = wrap(value, --size, maxWidth, weight);
    return [fitted, size];
  }
  const paperLabel = paper === "A4" ? "A4" : "US Letter";
  const byline = (value, x, y, align = "left") =>
    text(value, x, y, 9, { weight: "bold", color: accent, align });
  const brandLine = (x, y, align = "left") =>
    text("Open Flight", x, y, 10, { weight: "display", color: ink, align });
  const image = (id, x, y, imageWidth) =>
    doc.addImage(
      art.get(id),
      "JPEG",
      x,
      y,
      imageWidth,
      (imageWidth * 5) / 8,
      artPaths.get(id),
    );
  const folio = (page, label) => {
    rule(left, h - 20, right, h - 20);
    byline(label, left, h - 14);
    byline(String(page).padStart(2, "0"), right, h - 14, "right");
  };
  const heading = (title, number) => {
    brandLine(left, 19);
    byline(paperLabel, right, 19, "right");
    rule(left, 24, right, 24);
    text(title, left, 41, 31, { weight: "display" });
    folio(number, instructions.title);
  };

  // Low ink: the cover is paper with a fine frame 10 mm inside the edge, not a full-page fill.
  doc.setDrawColor(accent).setLineWidth(0.5).rect(10, 10, w - 20, h - 20, "S");
  brandLine(left + 3, 21);
  byline(paperLabel, right - 3, 21, "right");
  rule(left + 3, 26, right - 3, 26);
  const [title, titleSize] = fit(cover, 37, width - 6, 2);
  const titleTop = title.length === 1 ? 49 : 42;
  text(title, left + 3, titleTop, titleSize, { weight: "display" });
  byline(copy.pilot.toUpperCase(), left + 3, 66);
  if (pilot) {
    const [name, nameSize] = fit(pilot, 15, width - 38, 2, "bold");
    text(name, left + 28, name.length > 1 ? 63 : 66, nameSize, {
      weight: "bold",
    });
  } else {
    rule(left + 28, 66.5, left + 107, 66.5);
  }
  const heroWidth = width - 6;
  image(book.coverModel, left + 3, 76, heroWidth);
  const heroBottom = 76 + (heroWidth * 5) / 8;
  byline(sheetName(book.coverModel, lang), left + 3, heroBottom + 8);
  if (style === "studio") {
    text(copy.studio, right - 3, heroBottom + 8, 8, { align: "right" });
  }
  const fleet = sheets.filter(id => id !== book.coverModel);
  const tileWidth = Math.min(
    31,
    (heroWidth - 2 * Math.max(0, fleet.length - 1)) / Math.max(1, fleet.length),
  );
  fleet.forEach((id, index) =>
    image(id, left + 3 + index * (tileWidth + 2), heroBottom + 14, tileWidth),
  );
  const taglineY = heroBottom + (fleet.length ? 22 + (tileWidth * 5) / 8 : 19);
  text(wrap(instructions.subtitle, 11, heroWidth), left + 3, taglineY, 11);
  folio(1, bookEdition(lang, plan.modelCount, paper));

  doc.addPage();
  heading(instructions.print, 2);
  let y = 59;
  for (const [index, [title, body]] of instructions.notes.entries()) {
    doc.setDrawColor(accent).setLineWidth(0.5).roundedRect(left, y - 6, 12, 12, 2, 2, "S");
    text(String(index + 1), left + 6, y + 2, 12, {
      align: "center",
      weight: "bold",
    });
    text(title, left + 18, y, 15, { weight: "bold" });
    const paragraphs = wrap(body, 12, width - 18);
    text(paragraphs, left + 18, y + 8, 12);
    y += 20 + paragraphs.length * 5;
  }
  y += 8;
  doc.setDrawColor(accent).setLineWidth(0.3).setLineDashPattern([...print.dash.valley], 0).rect(left, y, width, 32, "S").setLineDashPattern([], 0);
  text(instructions.ruler, left + 9, y + 10, 11, { weight: "bold" });
  const ruleX = left + 9;
  const ruleY = y + 23;
  rule(ruleX, ruleY, ruleX + 50, ruleY, 0.35);
  for (let mm = 0; mm <= 50; mm += 5) {
    rule(
      ruleX + mm,
      ruleY - (mm % 10 === 0 ? 3 : 1.5),
      ruleX + mm,
      ruleY,
      0.35,
    );
  }

  doc.addPage();
  heading(copy.models, 3);
  text(copy.fleetIntro, left, 51, 11);
  if (plan.guidePage)
    text(wrap(copy.fleetGuide(plan.guidePage), 9.5, width), left, 59, 9.5);
  byline(copy.pages, right, 69, "right");
  const rowHeight = 17.8;
  plan.entries.forEach(({ id, start, end, guidePage }, index) => {
    const entry = sheetCatalog.find((item) => item.id === id);
    const details = modelDetails(id);
    const y = 72 + index * rowHeight;
    if (index % 2 === 0)
      doc.setFillColor(wash).rect(left, y, width, rowHeight, "F");
    image(id, left + 3, y + 2.25, 21);
    text(sheetName(id, lang), left + 29, y + 7, 13, { weight: "bold" });
    const minutes = details.minutes
      ? ` · ${details.minutes.join("–")} ${lang === "ru" ? "мин" : "min"}`
      : "";
    const meta = `${copy.construction[entry.construction]} · ${copy.difficulty[details.level - 1]}${minutes} · ${copy.tools[entry.family]}`;
    text(meta, left + 29, y + 13.2, 8.7);
    for (let dot = 0; dot < 3; dot++) {
      doc
        .setDrawColor(accent)
        .setFillColor(accent)
        .setLineWidth(print.line.min)
        .circle(
          right - 39 + dot * 3,
          y + 5.6,
          0.9,
          dot < details.level ? "F" : "S",
        );
    }
    const range = start === end ? String(start) : `${start}–${end}`;
    text(
      guidePage && (guidePage < start || guidePage > end)
        ? `${range} + ${guidePage}`
        : range,
      right - 2.5,
      y + 10.5,
      11,
      { weight: "bold", align: "right" },
    );
  });
  const atlasLabel = {en:"Flight atlas", es:"Atlas de vuelo", ru:"Атлас полётов"}[lang];
  byline(atlasLabel + " · " + plan.originPages[0].number + (plan.originPages.length > 1 ? "–" + plan.pageCount : ""), right, 78 + plan.entries.length * rowHeight, "right");
  text(copy.estimate, left, 78 + plan.entries.length * rowHeight, 8, {
    color: accent,
  });

  doc.addPage();
  heading(copy.log, 4);
  text(wrap(copy.logIntro, 12, width), left, 52, 12);
  const half = (width - 9) / 2;
  const rightCol = left + half + 9;
  function field(label, x, y, fieldWidth) {
    byline(label, x, y);
    rule(x, y + 10, x + fieldWidth, y + 10);
  }
  field(copy.model, left, 69, half);
  field(copy.date, rightCol, 69, half);
  field(copy.predict, left, 90, half);
  field(copy.change, rightCol, 90, half);
  const tableTop = 116;
  const row = 14;
  const launchWidth = 34;
  const resultWidth = (width - launchWidth) / 2;
  doc.setFillColor(wash).rect(left, tableTop, width, row, "F");
  byline(copy.launch, left + 4, tableTop + 8.5);
  byline(copy.baseline, left + launchWidth + 4, tableTop + 8.5);
  byline(copy.changed, left + launchWidth + resultWidth + 4, tableTop + 8.5);
  text(copy.land, left, tableTop - 4, 12, { weight: "bold" });
  for (let n = 1; n <= 5; n++)
    text(String(n), left + 5, tableTop + n * row + 9, 12);
  for (let n = 1; n <= 6; n++)
    rule(left, tableTop + n * row, right, tableTop + n * row);
  for (const x of [left + launchWidth, right - resultWidth])
    rule(x, tableTop, x, tableTop + 6 * row);
  field(copy.noticed, left, 211, width);
  text(wrap(copy.example, 9.5, width), left, 232, 9.5);
  byline(copy.next, left, 246);

  doc.addPage();
  const center = w / 2;
  doc
    .setDrawColor(accent)
    .setLineWidth(0.55)
    .rect(10.4, 10.4, w - 20.8, h - 20.8);
  rule(left, 30, right, 30, 0.3);
  byline("OPEN FLIGHT", left, 23);
  byline(instructions.title, right, 23, "right");
  image(book.coverModel, center - 29, 37, 58);
  text(copy.certificate, center, 91, 29, { weight: "display", align: "center" });
  text(wrap(copy.award, 12, width - 24), center, 103, 12, { align: "center" });
  byline(copy.pilot, left + 7, 121);
  if (pilot) {
    const [name, nameSize] = fit(pilot, 23, width - 14, 2);
    text(name, left + 7, 132, nameSize, { weight: "bold" });
  }
  rule(left + 7, 145, right - 7, 145);
  field(copy.date, left + 7, 154, half - 14);
  field(copy.signature, rightCol, 154, half - 7);

  const url = bookURL(book);
  const qrBottom = drawQR(doc, url, center, 165);
  text(copy.reopen, center, qrBottom + 4, 11, {
    align: "center",
    weight: "bold",
  });
  const address = new URL(url);
  const visibleLink = address.host + address.pathname;
  text(visibleLink, center, qrBottom + 10, 8.5, {
    align: "center",
    color: accent,
  });
  doc.link(center - 53, qrBottom + 5.5, 106, 7, { url });
  text(
    "Open Flight contributors · github.com/kevinmamaqi/open-flight",
    center,
    h - 24,
    8,
    { align: "center", color: accent },
  );
  doc.link(center - 53, h - 28, 106, 5, {
    url: "https://github.com/kevinmamaqi/open-flight/blob/main/NOTICES.md",
  });
  text(copy.credits, center, h - 18, 7.5, { align: "center" });
  byline("05", right, h - 16, "right");

  drawOriginPages(doc, book, plan, { w, h, left, right, width, ink, accent, wash, image, folio, text, wrap }, originArt);
  return doc.output("arraybuffer");
}

export async function createBook(input, { loadAsset }) {
  const book = normalizeBook(input);
  const plan = bookPlan(book);
  const artPaths = new Map(
    book.sheets.map((id) => {
      const { model } = sheetCatalog.find(sheet => sheet.id === id);
      return [id, appearanceArtPath(id, book.style, book.appearances[model])];
    }),
  );
  const [regular, bold, display, originArt, sheetDocuments, images] = await Promise.all([
    loadAsset(fontFiles.text),
    loadAsset(fontFiles.bold),
    loadAsset(fontFiles.display),
    loadOriginArt(plan, book.lang, loadAsset),
    Promise.all(
      book.sheets.map(async (id) =>
        PDFDocument.load(
          await loadAppearanceSheet(id, book.paper, book.lang, book.appearances[sheetCatalog.find(sheet => sheet.id === id).model], loadAsset, book.edge),
          { updateMetadata: false },
        ),
      ),
    ),
    Promise.all(
      [...new Set(artPaths.values())].map(async (path) => [
        path,
        await loadAsset(path),
      ]),
    ),
  ]);
  const imageBytes = new Map(images);
  const art = new Map(
    Array.from(artPaths, ([id, path]) => [id, imageBytes.get(path)]),
  );
  const output = await PDFDocument.load(
    frontMatter(book, plan, regular, bold, display, art, artPaths, originArt),
    { updateMetadata: false },
  );
  const { width, height } = output.getPage(0).getSize();
  // Page numbers are set in the Open Flight text face: one small jsPDF page per stamp, placed with pdf-lib.
  const stamps = [];
  for (const [entryIndex] of sheetDocuments.entries())
    for (const { number } of plan.entries[entryIndex].pages)
      stamps.push(`${String(number).padStart(2, "0")} / ${plan.pageCount}`);
  const stampDoc = new jsPDF({ unit: "mm", format: [24, 6], orientation: "landscape", compress: true, putOnlyUsedFonts: true });
  stampDoc.setCreationDate("D:20000101000000+00'00'");
  stampDoc.setFileId("6f70656e666c696768747374616d7073");
  registerFonts(stampDoc, { text: base64(regular), bold: base64(bold), display: base64(display) });
  stamps.forEach((stamp, i) => {
    if (i) stampDoc.addPage([24, 6], "landscape");
    useFont(stampDoc, "text");
    stampDoc.setFontSize(print.text.min).setTextColor(print.muted).text(stamp, 23, 4.5, { align: "right" });
  });
  const stampPages = stamps.length ? await output.embedPdf(stampDoc.output("arraybuffer"), stamps.map((_, i) => i)) : [];
  const mm = 72 / 25.4;
  let stampIndex = 0;
  for (const [entryIndex, original] of sheetDocuments.entries()) {
    const entry = plan.entries[entryIndex];
    const airplane = sheetCatalog.find((sheet) => sheet.id === entry.id).family === "airplane";
    for (const page of original.getPages()) {
      const size = page.getSize();
      // Landscape sheets (the K2 butterfly) use the same paper turned sideways.
      const fits = (w, h) => Math.abs(size.width - w) <= 1 && Math.abs(size.height - h) <= 1;
      if (!fits(width, height) && !fits(height, width)) {
        throw new Error("A sheet does not match the selected book paper size.");
      }
    }
    const pages = await output.copyPages(
      original,
      entry.pages.map(({ index }) => index),
    );
    for (const [index, page] of pages.entries()) {
      output.insertPage(entry.pages[index].number - 1, page);
      // On the first airplane page the folio sits under the calibration line, clear of its label.
      const airplaneTemplate = airplane && entry.pages[index].index === 0;
      const right = airplaneTemplate ? page.getWidth() - 58 * mm : page.getWidth() - 11 * mm;
      page.drawPage(stampPages[stampIndex++], {
        x: right - 24 * mm,
        y: (airplaneTemplate ? 14.5 : 11) * mm,
        width: 24 * mm,
        height: 6 * mm,
      });
    }
  }
  output.setTitle(book.cover);
  output.setAuthor("Open Flight");
  output.setCreator("Open Flight");
  output.setLanguage(book.lang);
  const prefs = output.catalog.getOrCreateViewerPreferences();
  prefs.setDuplex(Duplex.Simplex);
  prefs.setPrintScaling(PrintScaling.None);
  return output.save({ useObjectStreams: false });
}
