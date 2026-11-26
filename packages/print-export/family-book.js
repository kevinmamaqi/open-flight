import { objectDrawing, coloredPacket } from "../../apps/editor/assets/objects/appearance.js";
import { flightObjects } from "../../apps/editor/assets/objects/activities.js";
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
  monarchTrialSheets,
  normalizeBook,
} from "../../apps/editor/book-model.js";
import { sheetCatalog } from "../../apps/editor/family-sheets.js";
import {
  bookCopy,
  flightBookCopy,
  monarchTrialCopy,
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
  const trial = sheets.length === monarchTrialSheets.length && !book.activities?.length
    && monarchTrialSheets.every(id => sheets.includes(id)) ? monarchTrialCopy[lang] : null;
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
  byline(bookEdition(lang, plan.modelCount, paper), right - 3, 21, "right");
  rule(left + 3, 26, right - 3, 26);
  const [title, titleSize] = fit(cover, 43, width - 6, 2);
  const titleTop = title.length === 1 ? 52 : 42;
  text(title, left + 3, titleTop, titleSize, { weight: "display" });
  const heroWidth = width - 6;
  const heroTop = 66;
  image(book.coverModel, left + 3, heroTop, heroWidth);
  const heroBottom = heroTop + (heroWidth * 5) / 8;
  doc.setFillColor(wash).rect(left + 3, heroBottom, heroWidth, 12, "F");
  const heroLabel = sheetName(book.coverModel, lang) + (/-k[23]$/.test(book.coverModel) ? '  ·  ' + book.coverModel.slice(-2).toUpperCase() : '');
  text(heroLabel, left + 6, heroBottom + 8, 14, { weight: "display" });
  const fleet = [...sheets, ...(book.activities ?? [])].filter(id => id !== book.coverModel);
  const rows = Math.ceil(fleet.length / 5);
  const galleryTop = heroBottom + 17;
  const available = h - 44 - galleryTop;
  const tileRowHeight = Math.min(30, available / Math.max(1, rows));
  const columnWidth = heroWidth / Math.min(5, Math.max(1,fleet.length));
  const tileWidth = Math.min(columnWidth - 3, (tileRowHeight - 3) * 8 / 5, 45);
  fleet.forEach((id, index) => {
    const x = left + 3 + (index % 5) * columnWidth;
    image(id, x, galleryTop + Math.floor(index / 5) * tileRowHeight, tileWidth);
  });
  const subtitleY = Math.min(h - 39, galleryTop + rows * tileRowHeight + 4);
  text(wrap(instructions.subtitle, 11, heroWidth), left + 3, subtitleY, 11);
  rule(left + 3, h - 33, right - 3, h - 33);
  byline(copy.pilot.toUpperCase(), left + 3, h - 23);
  if (pilot) {
    const [name, nameSize] = fit(pilot, 14, width - 43, 1, "bold");
    text(name, left + 31, h - 23, nameSize, {weight:"bold"});
  } else {
    rule(left + 31, h - 22.5, right - 17, h - 22.5);
  }
  byline("01", right - 3, h - 23, "right");

  doc.addPage();
  heading(instructions.print, 2);
  let y = 59;
  const notes = trial ? [
    instructions.notes[0],
    [instructions.notes[1][0], trial.materials],
    [instructions.notes[2][0], trial.launch],
  ] : instructions.notes;
  for (const [index, [title, body]] of notes.entries()) {
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
  // Reserve one line per named activity, even with every sheet variant selected.
  const activityRow = 6;
  const lastIndexLine = 78 + activityRow * plan.activityPages.length;
  const rowHeight = Math.min(17.8, (h - 25 - lastIndexLine) / Math.max(1,plan.entries.length));
  plan.entries.forEach(({ id, start, end, guidePage }, index) => {
    const entry = sheetCatalog.find((item) => item.id === id);
    const details = modelDetails(id);
    const y = 72 + index * rowHeight;
    if (index % 2 === 0)
      doc.setFillColor(wash).rect(left, y, width, rowHeight, "F");
    image(id, left + 3, y + 1.5, Math.min(21, (rowHeight - 3) * 8 / 5));
    const name = sheetName(id, lang) + (trial ? " · " + entry.construction.toUpperCase() : "");
    text(name, left + 29, y + rowHeight * 0.39, 13, { weight: "bold" });
    const minutes = details.minutes
      ? ` · ${details.minutes.join("–")} ${lang === "ru" ? "мин" : "min"}`
      : "";
    const cutBorder = entry.family === "airplane" && book.edge === "cut";
    const construction = cutBorder ? "cut" : entry.construction;
    const tools = copy.tools[construction] ?? copy.tools[entry.family];
    const meta = `${copy.construction[construction]} · ${copy.difficulty[details.level - 1]}${minutes} · ${tools}`;
    text(meta, left + 29, y + rowHeight * 0.77, 9);
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
  if (plan.originPages.length) byline(atlasLabel + " · " + plan.originPages[0].number + (plan.originPages.length > 1 ? "–" + plan.originPages.at(-1).number : ""), right, 78 + plan.entries.length * rowHeight, "right");
  if (plan.activityPages.length) {
    const { activities } = flightObjects(lang);
    plan.activityPages.forEach(({ id, number }, i) => {
      const item = activities.find(activity => activity.id === id);
      const y = 78 + plan.entries.length * rowHeight + (i + 1) * activityRow;
      byline(item.title, left + 3, y);
      byline(String(number), right - 2.5, y, "right");
    });
  }
  text(copy.estimate, left, 78 + plan.entries.length * rowHeight, 8, {
    color: accent,
  });

  doc.addPage();
  heading(trial?.title ?? copy.log, 4);
  text(wrap(trial?.launch ?? copy.logIntro, 12, width), left, 52, 12);
  const half = (width - 9) / 2;
  const rightCol = left + half + 9;
  function field(label, x, y, fieldWidth) {
    byline(label, x, y);
    rule(x, y + 10, x + fieldWidth, y + 10);
  }
  field(trial?.paper ?? copy.model, left, 69, half);
  field(copy.date, rightCol, 69, half);
  field(copy.predict, left, 90, half);
  field(trial?.setup ?? copy.change, rightCol, 90, half);
  const tableTop = 116;
  const row = 14;
  const launchWidth = 34;
  const resultWidth = (width - launchWidth) / 2;
  doc.setFillColor(wash).rect(left, tableTop, width, row, "F");
  byline(copy.launch, left + 4, tableTop + 8.5);
  byline(trial ? "K1" : copy.baseline, left + launchWidth + 4, tableTop + 8.5);
  byline(trial ? "K2" : copy.changed, left + launchWidth + resultWidth + 4, tableTop + 8.5);
  text(trial?.measure ?? copy.land, left, tableTop - 4, 12, { weight: "bold" });
  for (let n = 1; n <= 5; n++)
    text(String(n), left + 5, tableTop + n * row + 9, 12);
  for (let n = 1; n <= 6; n++)
    rule(left, tableTop + n * row, right, tableTop + n * row);
  for (const x of [left + launchWidth, right - resultWidth])
    rule(x, tableTop, x, tableTop + 6 * row);
  field(copy.noticed, left, 211, width);
  text(wrap(trial?.record ?? copy.example, 9.5, width), left, 232, 9.5);
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
    [...book.sheets, ...(book.activities ?? [])].map((id) => {
      const model = sheetCatalog.find(sheet => sheet.id === id)?.model ?? id;
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
  const numberedPages = [...plan.entries.flatMap(entry => entry.pages), ...plan.activityPages];
  const stamps = numberedPages.map(({ number }) => `${String(number).padStart(2, "0")} / ${plan.pageCount}`);
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
  function drawFolio(page, right, bottom) {
    page.drawPage(stampPages[stampIndex++], {
      x: right - 24 * mm,
      y: bottom,
      width: 24 * mm,
      height: 6 * mm,
    });
  }
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
      drawFolio(page, right, (airplaneTemplate ? 14.5 : 11) * mm);
    }
  }
  if (plan.activityPages.length) {
    const lab = flightObjects(book.lang);
    const packets = new Map();
    const selected = plan.activityPages.map(({ id }) => lab.activities.find(activity => activity.id === id));
    for (const item of selected) {
      const appearance = book.appearances[item.id];
      const packetPath = coloredPacket(lab.packets[book.paper], appearance);
      if (!packets.has(packetPath)) packets.set(packetPath, await PDFDocument.load(await loadAsset(packetPath), {updateMetadata:false}));
      const [copied] = await output.copyPages(packets.get(packetPath), [item.page - 1]);
      const page = output.addPage(copied);
      drawFolio(page, page.getWidth() - 11 * mm, page.getHeight() - 13.5 * mm);
      const drawing = objectDrawing(item.id, appearance);
      await output.attach(await loadAsset(drawing), drawing.split("/").at(-1), {
        mimeType: "image/svg+xml", description: item.title,
        creationDate: new Date("2026-11-25T00:00:00Z"), modificationDate: new Date("2026-11-25T00:00:00Z"),
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
