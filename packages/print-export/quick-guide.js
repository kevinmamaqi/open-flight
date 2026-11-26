// The one-page quick guide of a Print & Play design, drawn with jsPDF in the paper rules of
// DESIGN.md: black text of 9 pt or more, lines of 0.3 mm or more, 6 mm safe edge, low ink.
// Airplanes also get their fold steps as small diagrams, drawn from the full guide's own scenes.
import { jsPDF } from "jspdf";
import qrcode from "qrcode-generator";
import { calibration, calibrationWords, ink, muted, print, registerFonts, useFont } from "../../apps/editor/assets/brand/print.js";
import { makePlane } from "../../apps/editor/assets/planes/core.js";
import { sheetSizes } from "../../apps/editor/assets/planes/catalog.js";
import { foldScene } from "../../apps/editor/assets/planes/guide.js";
import { draw } from "../../apps/editor/assets/planes/pdf.js";
import { quickGuideContent } from "../../apps/editor/print-guide-content.js";
import { resolvePlate } from "../../apps/editor/print-and-play.js";

const MARGIN = 14;
const PT = 25.4 / 72;
const stampHeight = 7;

export function base64(data) {
  let binary = "";
  for (let i = 0; i < data.length; i += 8192) binary += String.fromCharCode(...data.subarray(i, i + 8192));
  return btoa(binary);
}

function qr(doc, url, x, y, size) {
  const code = qrcode(0, "M");
  code.addData(url);
  code.make();
  const modules = code.getModuleCount();
  const quiet = 2;
  const step = size / (modules + quiet * 2);
  doc.setFillColor(ink);
  for (let row = 0; row < modules; row++) {
    for (let start = 0; start < modules; ) {
      if (!code.isDark(row, start)) { start++; continue; }
      let end = start + 1;
      while (end < modules && code.isDark(row, end)) end++;
      doc.rect(x + (start + quiet) * step, y + (row + quiet) * step, (end - start) * step, step, "F");
      start = end;
    }
  }
}

function drawShapes(doc, { lines, labels }) {
  for (const line of lines) {
    doc.setDrawColor(line.stroke).setLineWidth(Math.max(line.weight, print.line.min));
    doc.setLineDashPattern(line.dash ?? [], 0);
    doc.line(line.points[0][0], line.points[0][1], line.points[1][0], line.points[1][1]);
  }
  doc.setLineDashPattern([], 0);
  for (const label of labels) {
    useFont(doc, label.font ?? "text");
    doc.setFontSize(Math.max(label.size, print.text.min * PT) / PT).setTextColor(label.color);
    doc.text(label.text, label.x, label.y);
  }
}

/** Fold diagrams without their labels: the numbered titles carry the words at 9 pt or more. */
const pictures = (plan, step) => foldScene(plan, step).filter((part) => part.type !== "text");

/**
 * Lay out and draw the guide. With render false it only measures, so the caller can pick
 * the largest body size that fits the page.
 */
function layout(doc, content, plan, page, size, box, render) {
  const { w, h } = page;
  const width = w - MARGIN * 2;
  const top = (value, fontSize, kind = "text", maxWidth = width) => {
    useFont(doc, kind);
    return doc.setFontSize(fontSize).splitTextToSize(value, maxWidth);
  };
  const put = (lines, x, y, fontSize, kind = "text", color = ink, align = "left") => {
    if (!render) return;
    useFont(doc, kind);
    doc.setFontSize(fontSize).setTextColor(color).text(lines, x, y, { align, lineHeightFactor: 1.3 });
  };
  const leading = (fontSize) => fontSize * PT * 1.3;
  const body = size;
  let y = MARGIN + 2;

  // Plate ID, large, then the design name, its lineage and the honest evidence line.
  useFont(doc, "display");
  const idSize = 56;
  doc.setFontSize(idSize);
  const idWidth = doc.getTextWidth(content.id);
  put(content.id, MARGIN, y + 17, idSize, "display");
  const textX = MARGIN + idWidth + 8;
  const textWidth = w - MARGIN - textX;
  let nameSize = 28;
  let name = top(content.name, nameSize, "display", textWidth);
  while (name.length > 1 && nameSize > 18) name = top(content.name, --nameSize, "display", textWidth);
  put(name, textX, y + 7, nameSize, "display");
  let ty = y + 7 + (name.length - 1) * leading(nameSize) + 6.2;
  const lineage = top(content.lineage, 10.5, "text", textWidth);
  put(lineage, textX, ty, 10.5);
  ty += lineage.length * leading(10.5);
  const kind = top(content.statusLine, 9, "text", textWidth);
  put(kind, textX, ty, 9, "text", muted);
  ty += kind.length * leading(9);
  y = Math.max(y + 22, ty) + 1;
  if (render) doc.setDrawColor(ink).setLineWidth(0.4).line(MARGIN, y, w - MARGIN, y);
  y += 5.5;

  // Materials.
  put(content.materials.label, MARGIN, y, body + 1.5, "bold");
  y += leading(body + 1.5) - 0.4;
  const materials = top(content.materials.text, body, "text");
  put(materials, MARGIN, y, body);
  y += materials.length * leading(body) + 3;

  // Fold steps as small diagrams (airplanes).
  if (plan) {
    // Record planes have up to 13 steps: five or six to a row keeps them on one page.
    const columns = plan.steps.length > 10 ? 6 : plan.steps.length > 8 ? 5 : 4, gap = 3;
    const cell = (width - gap * (columns - 1)) / columns;
    const scale = cell / 388;
    const picture = 198 * scale;
    const textColumn = cell - 7.5;
    for (let from = 0; from < plan.steps.length; from += columns) {
      const row = plan.steps.slice(from, from + columns);
      const titles = row.map((step) => top(step.title, 9, "bold", textColumn));
      const rows = Math.max(...titles.map((lines) => lines.length));
      row.forEach((step, i) => {
        const x = MARGIN + i * (cell + gap);
        if (render) {
          doc.setDrawColor(ink).setLineWidth(0.3).line(x, y, x + cell, y);
          draw(doc, pictures(plan, step), [x, y + 1.5], scale);
        }
        const ly = y + 1.5 + picture + 4;
        if (render) doc.setDrawColor(ink).setLineWidth(0.3).circle(x + 2.6, ly - 1.1, 2.6, "S");
        put(String(step.index + 1), x + 2.6, ly, 9, "bold", ink, "center");
        put(titles[i], x + 7, ly, 9, "bold");
      });
      y += 1.5 + picture + 4 + rows * leading(9) + 2.5;
    }
    y += 1;
  }

  // Launch.
  put(content.launch.label, MARGIN, y + 1, body + 1.5, "bold");
  y += leading(body + 1.5) + 1;
  const launch = top(content.launch.text, body, "text");
  put(launch, MARGIN, y, body);
  y += launch.length * leading(body) + 3;

  // First three trim rows, then the note that none has been tested on this design.
  put(content.trim.label, MARGIN, y + 1, body + 1.5, "bold");
  y += leading(body + 1.5) + 1;
  const seeWidth = 48, fixX = MARGIN + seeWidth + 4, fixWidth = width - seeWidth - 4;
  put(content.trim.seeLabel, MARGIN, y, 9, "bold", muted);
  put(content.trim.fixLabel, fixX, y, 9, "bold", muted);
  y += leading(9) - 0.6;
  for (const row of content.trim.rows) {
    const see = top(row.see, body, "bold", seeWidth);
    const fix = top(row.fix, body, "text", fixWidth);
    if (render) doc.setDrawColor(muted).setLineWidth(print.line.min).line(MARGIN, y, w - MARGIN, y);
    put(see, MARGIN, y + 4.4, body, "bold");
    put(fix, fixX, y + 4.4, body);
    y += Math.max(see.length, fix.length) * leading(body) + 3;
  }
  if (render) doc.setDrawColor(muted).setLineWidth(print.line.min).line(MARGIN, y, w - MARGIN, y);
  const note = top(content.trim.note, 9, "text");
  put(note, MARGIN, y + 4.2, 9, "text", muted);
  y += note.length * leading(9) + 3.2;

  // Tally, calibration line, QR code and address, anchored to the foot of the page.
  const footer = h - 11;
  const qrSize = 27;
  const bandTop = footer - 5 - qrSize;
  const tallyY = bandTop - box - 4;
  if (render) {
    put(content.tally, MARGIN, tallyY + box / 2 + 1.4, body + 1.5, "bold");
    useFont(doc, "bold");
    doc.setFontSize(body + 1.5);
    const tallyX = MARGIN + doc.getTextWidth(content.tally) + 4;
    for (let n = 1; n <= 5; n++) {
      const x = tallyX + (n - 1) * (box + 2);
      doc.setDrawColor(ink).setLineWidth(0.3).rect(x, tallyY, box, box, "S");
      put(String(n), x + 1.6, tallyY + 4, 9, "text", ink);
    }
    const stage = calibration(MARGIN, bandTop + 5, content.lang, { note: false });
    drawShapes(doc, stage);
    const [, instruction] = calibrationWords(content.lang);
    put(top(instruction, 9, "text", width - qrSize - 8), MARGIN, bandTop + 11.5, 9);
    put(content.scan, MARGIN, bandTop + 20, 9, "bold");
    put(content.shortUrl, MARGIN, bandTop + 24.2, 9);
    doc.link(MARGIN, bandTop + 21.2, 78, 4.6, { url: content.url });
    qr(doc, content.url, w - MARGIN - qrSize, bandTop, qrSize);
    doc.setDrawColor(muted).setLineWidth(print.line.min).line(MARGIN, footer - 4, w - MARGIN, footer - 4);
    put(content.licence, MARGIN, footer, 9, "text", muted);
    put(content.pageLabel, w - MARGIN, footer, 9, "bold", ink, "right");
  }
  return { bottom: y, limit: tallyY - 3 };
}

/**
 * Draw the quick guide for one plate. Page 1 is the guide at the paper's real size. The pages
 * after it are small ID stamps, one per label in `stamps`, which the caller lays over the
 * pattern pages: ["A1 · 1/2", ...]. Returns the PDF bytes and each stamp's size in mm.
 */
export function quickGuideDocument({ plate, paper = "A4", lang = "en", edge = "cut", pageLabel, stamps = [] }, fonts) {
  const { id } = resolvePlate(plate);
  const content = { ...quickGuideContent(id, lang, { edge }), lang, pageLabel: pageLabel ?? id };
  const [w, h] = sheetSizes[paper];
  const plan = content.family === "airplane" ? makePlane({ model_id: content.model, paper, edge }, lang) : null;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [w, h], compress: true, putOnlyUsedFonts: true, precision: 5 });
  registerFonts(doc, { text: base64(fonts.text), bold: base64(fonts.bold), display: base64(fonts.display) });
  doc.setLanguage(lang);
  doc.setProperties({ title: content.name + " · Open Flight quick guide", author: "Open Flight contributors" });
  doc.setCreationDate("D:20260101000000+00'00'");
  doc.setFileId("6f70656e666c69676874717569636b31");
  const page = { w, h };
  let chosen = 9;
  for (const size of [12, 11.5, 11, 10.5, 10, 9.5, 9]) {
    const { bottom, limit } = layout(doc, content, plan, page, size, 10, false);
    if (bottom <= limit) { chosen = size; break; }
  }
  const fit = layout(doc, content, plan, page, chosen, 10, false);
  if (fit.bottom > fit.limit) throw new Error("The quick guide for " + id + " does not fit the page (" + (fit.bottom - fit.limit).toFixed(1) + " mm over).");
  // Plenty of room (butterflies and flying objects): larger boxes to write in.
  const box = fit.limit - fit.bottom > 40 ? 16 : 10;
  layout(doc, content, plan, page, chosen, box, true);
  const sizes = [];
  for (const label of stamps) {
    useFont(doc, "bold");
    doc.setFontSize(11);
    const width = Math.ceil(doc.getTextWidth(label) + 6);
    doc.addPage([width, stampHeight], "landscape");
    doc.setFillColor("#ffffff").setDrawColor(ink).setLineWidth(0.3).roundedRect(0.4, 0.4, width - 0.8, stampHeight - 0.8, 1.2, 1.2, "FD");
    useFont(doc, "bold");
    doc.setFontSize(11).setTextColor(ink).text(label, width / 2, stampHeight / 2 + 1.35, { align: "center" });
    sizes.push({ label, width, height: stampHeight });
  }
  return { bytes: new Uint8Array(doc.output("arraybuffer")), stamps: sizes, fontSize: chosen };
}
