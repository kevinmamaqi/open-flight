import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";
import { flightObjects, objectLocales, objectPapers, packetPath } from "../apps/editor/assets/objects/activities.js";
import { calibrationWords, fontFiles, fontNotice as printFontNotice, print } from "../apps/editor/assets/brand/print.js";
import { color } from "../apps/editor/assets/brand/tokens.js";

import { objectDrawing, objectPalettes, coloredPacket } from '../apps/editor/assets/objects/appearance.js';
const editor = new URL("../apps/editor/", import.meta.url);
const paperSizes = { A4: [210, 297], US_LETTER: [215.9, 279.4] };
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const ink = rgb(print.ink);
const muted = rgb(print.muted);
const accent = rgb(color.textAccent);
const guide = rgb(print.muted);
const minPt = print.text.min;
const margin = 12;
const fontLicense = "https://openfontlicense.org/open-font-license-official-text/";
const geometryLicense = "https://spdx.org/licenses/CERN-OHL-W-2.0.html";
const worksheetLicense = "https://openflight.design/references.html#licenses";
const fontNotice = printFontNotice;

const copy = {
  en: {
    lab: "Open Flight · Flying objects",
    materials: "Materials",
    print: "Print single-sided at 100%. Check the 50 mm line with a ruler.",
    ring: "Folding guide · Use a separate plain sheet for the glider.",
    template: "Full-size template · Cut along the solid outline.",
    test: "Flight trial",
    recover: "If it goes wrong",
    source: "Reference",
    geometry: "Geometry",
    worksheet: "Guide and art",
    editable: "SVG attached",
    series: {
      ring: ["Diameter ____ mm", "Diameter ____ mm"],
      samara: ["Clip A", "Clip B"],
      tandem: ["Level", "Tips raised"],
    },
  },
  es: {
    lab: "Open Flight · Objetos voladores",
    materials: "Materiales",
    print: "Imprime por una cara al 100 %. Comprueba la línea de 50 mm con una regla.",
    ring: "Guía de plegado · Usa otra hoja en blanco para el planeador.",
    template: "Plantilla a tamaño real · Recorta por la línea continua.",
    test: "Prueba de vuelo",
    recover: "Si algo falla",
    source: "Referencia",
    geometry: "Geometría",
    worksheet: "Guía y arte",
    editable: "SVG adjunto",
    series: {
      ring: ["Diámetro ____ mm", "Diámetro ____ mm"],
      samara: ["Clip en A", "Clip en B"],
      tandem: ["Alas horizontales", "Puntas elevadas"],
    },
  },
  ru: {
    lab: "Open Flight · Летающие модели",
    materials: "Материалы",
    print: "Печатай с одной стороны в масштабе 100 %. Проверь линию 50 мм по линейке.",
    ring: "Схема складывания · Для кольцеплана возьми отдельный чистый лист.",
    template: "Шаблон в натуральную величину · Вырежи по сплошному контуру.",
    test: "Проверка в полёте",
    recover: "Если что-то не получилось",
    source: "Источник",
    geometry: "Геометрия",
    worksheet: "Инструкция и рисунки",
    editable: "SVG во вложении",
    series: {
      ring: ["Диаметр ____ мм", "Диаметр ____ мм"],
      samara: ["Скрепка на A", "Скрепка на B"],
      tandem: ["Крылья ровно", "Законцовки вверх"],
    },
  },
};

// The three Open Flight faces (assets/brand/print.js): text, bold text and the display serif.
const fonts = await Promise.all(
  [["text", "OFText", "normal"], ["bold", "OFText", "bold"], ["display", "OFDisplay", "bold"]].map(async ([key, family, style]) => {
    const file = fontFiles[key].split("/").at(-1);
    const bytes = await readFile(new URL(fontFiles[key], editor));
    if (key !== "display") GlobalFonts.register(bytes, "Open Flight Text");
    return { file, family, style, data: bytes.toString("base64") };
  }),
);

async function readIllustration(path) {
  const svg = await readFile(new URL(path, editor), "utf8");
  const root = svg.match(/<svg\b[^>]*>/)?.[0];
  const width = Number(root?.match(/\bwidth="([\d.]+)mm"/)?.[1]);
  const height = Number(root?.match(/\bheight="([\d.]+)mm"/)?.[1]);
  if (!(width > 0 && height > 0)) throw new Error(`Missing physical dimensions in ${path}`);
  // Force a high pixel density for the strokes while preserving the PDF dimensions in millimeters.
  const pixelsPerMm = 24;
  const rasterRoot = root.replace(/\bwidth="[\d.]+mm"/, `width="${Math.ceil(width * pixelsPerMm)}"`)
    .replace(/\bheight="[\d.]+mm"/, `height="${Math.ceil(height * pixelsPerMm)}"`);
  const rasterSvg = svg.replace(root, rasterRoot).replaceAll('font-family="sans-serif"', 'font-family="Open Flight Text"');
  const svgImage = await loadImage(Buffer.from(rasterSvg));
  const canvas = createCanvas(svgImage.width, svgImage.height);
  canvas.getContext("2d").drawImage(svgImage, 0, 0);
  return { width, height, png: canvas.toBuffer("image/png") };
}

function textStyle(doc, size, style = "normal", color = ink) {
  if (style === "display") doc.setFont("OFDisplay", "bold");
  else doc.setFont("OFText", style);
  doc.setFontSize(Math.max(size, minPt));
  doc.setTextColor(...color);
}

function paragraph(doc, text, x, y, width, size = 10.2, style = "normal", color = ink) {
  textStyle(doc, size, style, color);
  const lines = doc.splitTextToSize(text, width);
  const lineHeight = Math.max(size, minPt) * 25.4 / 72 * 1.19;
  for (const [index, line] of lines.entries()) doc.text(line, x, y + lineHeight * index);
  return y + lineHeight * lines.length;
}

function linkedText(doc, label, url, x, y) {
  doc.text(label, x, y);
  const width = doc.getTextWidth(label);
  doc.link(x, y - 2.8, width, 3.6, { url });
  return width;
}

function drawRecords(doc, labels, activity, pageWidth, y) {
  y = paragraph(doc, activity.measure, margin, y, pageWidth - 2 * margin, 8.7, "bold", muted) + 1;
  textStyle(doc, 8.4, "normal", muted);
  doc.setDrawColor(...guide);
  doc.setLineWidth(print.line.min);
  const series = labels.series[activity.id];
  const labelWidth = Math.max(...series.map((label) => doc.getTextWidth(label))) + 5;
  const firstLine = margin + labelWidth;
  const cellWidth = Math.min(23, (pageWidth - margin - firstLine) / 5);
  for (const label of series) {
    doc.text(label, margin, y);
    for (let index = 0; index < 5; index++) {
      const left = firstLine + index * cellWidth;
      doc.line(left, y + 0.6, left + cellWidth - 3, y + 0.6);
    }
    y += 6;
  }
  return y;
}

function drawPage(doc, labels, activity, illustration, pageWidth, pageHeight, locale) {
  const textWidth = pageWidth - 2 * margin;
  const rulerX = pageWidth - margin - print.calibration - 11;
  textStyle(doc, 9, "bold", muted);
  // The collection number travels with the activity. A Flight Book supplies its own page number.
  doc.text(labels.lab, margin, 12);

  let y = paragraph(doc, activity.title, margin, 24, textWidth, 25, "display") + 0.5;
  y = paragraph(doc, activity.question, margin, y, textWidth, 12.4, "normal", accent) + 2.5;
  // The 50 mm calibration line (DESIGN.md): end stops, 10 mm ticks and its length.
  doc.setDrawColor(...ink);
  doc.setLineWidth(0.4);
  doc.line(rulerX, y, rulerX + print.calibration, y);
  for (let mm = 0; mm <= print.calibration; mm += 10) {
    doc.setLineWidth(mm % print.calibration === 0 ? 0.4 : print.line.min);
    doc.line(rulerX + mm, y, rulerX + mm, y - (mm % print.calibration === 0 ? 3 : 1.6));
  }
  textStyle(doc, 9, "bold", ink);
  doc.text(calibrationWords(locale)[0], rulerX + print.calibration + 2.5, y + 0.4);
  y = paragraph(doc, labels.print, margin, y, textWidth - print.calibration - 16, 9, "normal", muted) + 2.3;
  y = paragraph(doc, `${labels.materials}  ${activity.materials}`, margin, y, textWidth, 9.7) + 2.2;

  const compact = illustration.height >= 80;
  const stepSize = compact ? 10.2 : 11.5;
  for (const [index, step] of activity.steps.entries()) {
    textStyle(doc, 10.2, "bold", accent);
    doc.text(String(index + 1), margin, y);
    y = paragraph(doc, step, margin + 6, y, textWidth - 6, stepSize) + (compact ? 1.1 : 2);
  }

  const illustrationNote = activity.sheet === "whole-rectangle" ? labels.ring : labels.template;
  const illustrationTop = paragraph(doc, illustrationNote, margin, y + 2, textWidth, 8.6, "normal", muted);
  if (illustration.width > textWidth) throw new Error(`Template too wide for ${activity.id}`);
  doc.addImage(illustration.png, "PNG", (pageWidth - illustration.width) / 2, illustrationTop, illustration.width, illustration.height);
  y = illustrationTop + illustration.height + 3.2;

  y = paragraph(doc, labels.test, margin, y, textWidth, 11.5, "bold", accent);
  y = paragraph(doc, activity.test, margin, y, textWidth, 9.6) + 1.1;
  y = drawRecords(doc, labels, activity, pageWidth, y);

  const footerRuleY = pageHeight - 22;
  const columnWidth = (textWidth - 6) / 2;
  const physicsEnd = paragraph(doc, activity.physics, margin, y, columnWidth, 8.3, "normal", muted);
  const recoveryEnd = paragraph(doc, `${labels.recover}  ${activity.recovery}`, margin + columnWidth + 6, y, columnWidth, 8.3, "normal", muted);
  if (Math.max(physicsEnd, recoveryEnd) > footerRuleY) {
    throw new Error(`Content would overlap footer: ${activity.id} ${labels.lab} (${Math.max(physicsEnd, recoveryEnd)} > ${footerRuleY})`);
  }

  doc.setDrawColor(...guide);
  doc.setLineWidth(print.line.min);
  doc.line(margin, footerRuleY, pageWidth - margin, footerRuleY);
  textStyle(doc, 8.3, "normal", accent);
  const referenceText = `${labels.source}  ${activity.source.label}`;
  const editableX = pageWidth - margin - doc.getTextWidth(labels.editable);
  if (margin + doc.getTextWidth(referenceText) + 4 > editableX) {
    throw new Error(`Source links would overlap: ${activity.id} ${labels.lab}`);
  }
  linkedText(doc, referenceText, activity.source.url, margin, pageHeight - 17);
  doc.text(labels.editable, editableX, pageHeight - 17);
  const credits = [[`${labels.worksheet} · © Open Flight`, worksheetLicense]];
  if (activity.sheet !== "whole-rectangle") {
    credits.push([`${labels.geometry} · CERN-OHL-W-2.0`, geometryLicense]);
  }
  credits.push(["Open Flight Text, Alegreya · SIL OFL 1.1", fontLicense]);
  let creditX = margin;
  for (const [label, url] of credits) {
    creditX += linkedText(doc, label, url, creditX, pageHeight - 11.8) + 6;
  }
  if (creditX - 6 > pageWidth - margin) throw new Error(`License links would overflow: ${activity.id} ${labels.lab}`);
}

const attachmentDate = new Date("2026-11-25T00:00:00Z");

for (const appearance of Object.keys(objectPalettes.ring)) {
  const illustrations = new Map();
  const sources = [];
  for (const activity of flightObjects().activities) {
    const path = objectDrawing(activity.id, appearance);
    let svg = await readFile(new URL(activity.illustration, editor), "utf8");
    if (appearance !== 'field') {
      const colors = objectPalettes[activity.id][appearance];
      const replacements = new Map(objectPalettes[activity.id].field.map((old,i)=>[old,colors[i]]));
      if (activity.id === 'ring') {
        for (const tint of ['#9cdcd9','#b7ece8','#74c6c8']) replacements.set(tint,colors[0]);
        replacements.set('#176474',colors[1]);
      }
      svg = svg.replace(/#[a-f0-9]{6}/gi, hex => replacements.get(hex.toLowerCase()) ?? hex);
      await writeFile(new URL(path,editor), svg);
    }
    illustrations.set(activity.illustration, await readIllustration(path));
    sources.push({name:path.split('/').at(-1),bytes:Buffer.from(svg)});
  }
for (const locale of objectLocales) {
  const labels = copy[locale];
  const { edition, activities } = flightObjects(locale);
  for (const paper of objectPapers) {
    const [width, height] = paperSizes[paper];
    const doc = new jsPDF({ format: [width, height], unit: "mm", compress: true, putOnlyUsedFonts: true });
    doc.setCreationDate("D:20261125000000+00'00'");
    doc.setFileId(createHash("sha256").update(`${edition}:${paper}:${locale}:${appearance}`).digest("hex").slice(0, 32));
    doc.setProperties({
      title: labels.lab,
      author: "Open Flight contributors",
      creator: "Open Flight",
      subject: "Open Flight geometry: CERN-OHL-W-2.0. Open Flight guides and illustrations: © Open Flight, free for personal and classroom use; all other rights reserved. Embedded font notice:\n" + fontNotice,
    });
    doc.setLanguage(locale);
    for (const { file, family, style, data } of fonts) {
      doc.addFileToVFS(file, data);
      doc.addFont(file, family, style);
    }
    for (const [index, activity] of activities.entries()) {
      if (index > 0) doc.addPage();
      drawPage(doc, labels, activity, illustrations.get(activity.illustration), width, height, locale);
    }

    const destination = new URL(coloredPacket(packetPath(paper, locale), appearance), editor);
    await mkdir(new URL(".", destination), { recursive: true });
    const packet = await PDFDocument.load(doc.output("arraybuffer"), { updateMetadata: false });
    for (const { name, bytes } of sources)
      await packet.attach(bytes, name, { mimeType: "image/svg+xml", creationDate: attachmentDate, modificationDate: attachmentDate });
    await writeFile(destination, await packet.save());
  }
}
}
