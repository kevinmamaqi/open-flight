import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { revision } from "../packages/product-core/edition.ts";
import { sheetFor } from "../packages/product-core/aircraft.ts";
import { pdf } from "../packages/print-export/sheets.ts";
import { workshopModels } from "../packages/geometry/workshop.ts";
import { makePlane, planePdf, planeCatalog } from "../packages/planes/index.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const editor = join(root, "apps/editor"),
  library = join(editor, "library");
mkdirSync(library, { recursive: true });
copyFileSync(
  join(root, "packages/field-guide/species.json"),
  join(editor, "assets/atlas/species.json"),
);
const lesson = [
  "docs/outreach/paper-flight-lesson.md",
  "guides/paper-flight-lesson.md",
]
  .map((path) => join(root, path))
  .find((path) => existsSync(path));
if (!lesson) throw Error("Missing bilingual family lesson");
const md = readFileSync(lesson, "utf8");
const [english, russian] = md.split("## English\n")[1].split("## По-русски\n");
const [ruLesson, end] = russian.split("Original lesson text and tables");
const lessonCopy = {
  en:
    english +
    "\nOriginal lesson text and tables" +
    end.split("\nТекст занятия")[0],
  ru: ruLesson + "\nТекст занятия" + end.split("\nТекст занятия")[1],
};
for (const locale of ["en", "ru"]) {
  const title =
    locale === "en"
      ? "Can a paper butterfly turn?"
      : "Может ли бумажная бабочка повернуть?";
  const body = Bun.markdown.html(lessonCopy[locale]);
  writeFileSync(
    join(library, "family-lesson-" + locale + ".html"),
    '<!doctype html><html lang="' +
      locale +
      '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' +
      title +
      ' · Open Flight</title><style>body{font:17px/1.5 system-ui;color:#173d34;max-width:46rem;margin:auto;padding:1.4em}h1{line-height:1.1}li{margin:.6em 0}table{border-collapse:collapse;width:100%}td,th{border:1px solid #789487;padding:.5em}a{color:#105e76}@media print{body{font-size:11pt;padding:0}a{color:inherit}table{break-inside:avoid}}</style><header><a href="https://kevinmamaqi.github.io/open-flight/?lang=' +
      locale +
      '">Open Flight</a></header><main><h1>' +
      title +
      "</h1>" +
      body +
      "</main></html>",
  );
  for (const paper of ["A4", "US_LETTER"]) {
    for (const m of workshopModels) {
      const seed = revision(
        m.model,
        m.baseline_revision,
        m.name,
        m.parameters,
        m.appearance_id,
        null,
        "original",
        "2026-11-23T00:00:00Z",
        m.species,
      );
      writeFileSync(
        join(library, [m.species, paper, locale].join("-") + ".pdf"),
        pdf(sheetFor(seed.dto, paper, locale)),
      );
    }
    for (const m of planeCatalog) {
      const plan = makePlane({ model_id: m.model_id, paper }, locale);
      writeFileSync(
        join(library, [m.model_id, paper, locale].join("-") + ".pdf"),
        planePdf(plan),
      );
    }
  }
}
console.log("Built 28 calibrated starter PDFs and two offline family lessons.");
