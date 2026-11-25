// Print & Play PDFs: one design is its pattern page(s) from the library plus the quick guide
// and a small plate-ID stamp on each pattern page. Two or three designs are the singles joined.
// The static build, the application service and the browser (which joins the static singles
// with the same apps/editor/print-merge.js) all give the same bytes for the same input.
import { PDFDict, PDFDocument, PDFName, PDFRawStream, decodePDFRawStream } from "pdf-lib";
import { jsPDF } from "jspdf";
import { fontFiles } from "../../apps/editor/assets/brand/print.js";
import { makePlane } from "../../apps/editor/assets/planes/core.js";
import { planePdfBytes } from "../../apps/editor/assets/planes/pdf.js";
import { finishDocument, dedupeStreams, mergePdfs, setTitle } from "../../apps/editor/print-merge.js";
import { designName } from "../../apps/editor/print-guide-content.js";
import { normalizeSelection, pagePlan, resolvePlate } from "../../apps/editor/print-and-play.js";
import { base64, quickGuideDocument } from "./quick-guide.js";

export { normalizeSelection, pagePlan, printFilename, readySets } from "../../apps/editor/print-and-play.js";

const mm = 72 / 25.4;

/** Loaded once per build or request: fonts and the source PDFs the designs copy from. */
export function printContext(loadAsset) {
  const documents = new Map();
  const bytes = new Map();
  const asset = (path) => {
    if (!bytes.has(path)) bytes.set(path, Promise.resolve(loadAsset(path)).then((data) => new Uint8Array(data)));
    return bytes.get(path);
  };
  return {
    asset,
    fonts: () =>
      Promise.all([asset(fontFiles.text), asset(fontFiles.bold), asset(fontFiles.display)]).then(
        ([text, bold, display]) => ({ text, bold, display }),
      ),
    document(key, make, prepare) {
      if (!documents.has(key))
        documents.set(key, make().then(async (data) => {
          const loaded = await PDFDocument.load(data, { updateMetadata: false });
          prepare?.(loaded);
          return loaded;
        }));
      return documents.get(key);
    },
  };
}

/**
 * A flying-object packet shares one resource list between its pages, so copying one page
 * would carry every page's drawings. Drop the images this page never draws.
 */
function keepOnlyDrawnImages(document, index) {
  const page = document.getPage(index);
  const contents = page.node.Contents();
  const streams = contents instanceof PDFRawStream ? [contents] : contents.asArray().map((ref) => document.context.lookup(ref));
  const content = streams.map((stream) => new TextDecoder("latin1").decode(decodePDFRawStream(stream).decode())).join("\n");
  const images = page.node.Resources()?.lookupMaybe(PDFName.of("XObject"), PDFDict);
  if (!images) return;
  for (const name of images.keys()) if (!content.includes(name.toString() + " Do")) images.delete(name);
}

/** Whole-sheet airplane patterns (no cutting) are drawn on demand: the library holds the cut-border ones. */
async function wholeSheetPlane(model, paper, lang, context) {
  const fonts = await context.fonts();
  const plan = makePlane({ model_id: model, paper, edge: "whole" }, lang);
  return planePdfBytes(plan, jsPDF, { text: base64(fonts.text), bold: base64(fonts.bold), display: base64(fonts.display) });
}

/**
 * Where the plate ID goes, in mm from the page's top-left corner, kept inside the 6 mm edge.
 * Each spot was chosen on the rendered page where nothing is printed.
 */
export function stampSpot(plateKind, role, page, stamp) {
  const { width, height } = page;
  if (plateKind === "airplane") return { x: 10, y: height - 10 - stamp.height };
  if (plateKind === "butterfly") return { x: width - 12 - stamp.width, y: height - 8 - stamp.height };
  return { x: width - 12 - stamp.width, y: height - 8 - stamp.height };
}

// Library PDFs are shared by a design's pages; a packet is loaded once per page, with the page's images only.
const sourceKey = (source, paper, lang) =>
  source.type === "plane" ? "plane:" + source.model + ":" + paper + ":" + lang
    : source.type === "packet" ? source.path + "#page" + source.index : source.path;

/** One design as a PDF: its pattern pages, then the quick guide, each stamped "A1 · 1/2". */
export async function buildSingle(plateId, options, context) {
  const { plates: [id], paper, lang, edge } = normalizeSelection({ ...options, plates: [plateId] });
  const plate = resolvePlate(id);
  const plan = pagePlan(id, { paper, lang, edge });
  const total = plan.length;
  const labels = plan.map((_, index) => id + " · " + (index + 1) + "/" + total);
  const fonts = await context.fonts();
  const stampable = plan.map((item, index) => (item.role === "guide" ? null : index)).filter((index) => index !== null);
  const guide = quickGuideDocument(
    { plate: id, paper, lang, edge, pageLabel: labels[total - 1], stamps: stampable.map((index) => labels[index]) },
    fonts,
  );
  const out = await PDFDocument.create({ updateMetadata: false });
  // Copy from each source document once: pages that share fonts and images bring them once.
  const kind = plate.chapter === "airplanes" ? "airplane" : plate.chapter === "butterflies" ? "butterfly" : "object";
  const sources = new Map();
  for (const item of plan) {
    if (item.role === "guide") continue;
    const { source } = item;
    const key = sourceKey(source, paper, lang);
    if (!sources.has(key)) sources.set(key, { item: source, indexes: [] });
    sources.get(key).indexes.push(source.index);
  }
  const copied = new Map();
  for (const [key, { item, indexes }] of sources) {
    const document = await context.document(key, () =>
      item.type === "plane" ? wholeSheetPlane(item.model, paper, lang, context) : context.asset(item.path),
    item.type === "packet" ? (loaded) => keepOnlyDrawnImages(loaded, item.index) : undefined);
    const pages = await out.copyPages(document, indexes);
    indexes.forEach((index, i) => copied.set(key + "#" + index, pages[i]));
  }
  const guideDocument = await PDFDocument.load(guide.bytes, { updateMetadata: false });
  const [guidePage] = await out.copyPages(guideDocument, [0]);
  const stamps = await out.embedPdf(guideDocument, guide.stamps.map((_, i) => i + 1));
  let stampIndex = 0;
  for (const item of plan) {
    if (item.role === "guide") {
      out.addPage(guidePage);
      continue;
    }
    const { source } = item;
    const key = sourceKey(source, paper, lang);
    const page = out.addPage(copied.get(key + "#" + source.index));
    const stamp = guide.stamps[stampIndex];
    const spot = stampSpot(kind, item.role, { width: page.getWidth() / mm, height: page.getHeight() / mm }, stamp);
    page.drawPage(stamps[stampIndex++], {
      x: spot.x * mm,
      y: page.getHeight() - (spot.y + stamp.height) * mm,
      width: stamp.width * mm,
      height: stamp.height * mm,
    });
  }
  dedupeStreams(out);
  finishDocument(out, { title: id + " " + designName(id, lang) + " · Open Flight Print & Play", lang });
  return out.save({ useObjectStreams: false });
}

/**
 * The PDF for a selection of one to three designs. A single design is built as above;
 * several are those singles joined in the order given.
 */
export async function renderPrintAndPlay(input, { loadAsset, context = printContext(loadAsset) }) {
  const selection = normalizeSelection(input);
  const singles = [];
  for (const id of selection.plates) singles.push(await buildSingle(id, selection, context));
  if (singles.length === 1) return singles[0];
  return mergePdfs(singles, { title: setTitle(selection.plates), lang: selection.lang });
}
