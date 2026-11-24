import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const bundle = await Bun.build({
  entrypoints: [
    fileURLToPath(new URL("packages/print-export/family-book.js", root)),
  ],
  target: "browser",
  format: "esm",
  minify: true,
  plugins: [
    {
      name: "browser-appearance-sheet",
      setup(build) {
        // book-engine.js is written beside the browser adapter. Keep it external
        // so the private Node renderer and the butterfly bundle stay out of this engine.
        build.onResolve({ filter: /^\.\/appearance-sheet\.js$/ }, () => ({
          path: "./appearance-sheet-browser.js",
          external: true,
        }));
      },
    },
    {
      name: "browser-jsPDF",
      setup(build) {
        build.onResolve({ filter: /^jspdf$/ }, () => ({
          path: "jspdf",
          namespace: "family-book-runtime",
        }));
        build.onLoad(
          { filter: /^jspdf$/, namespace: "family-book-runtime" },
          () => ({
            contents:
              "export function jsPDF(options) { return new globalThis.jspdf.jsPDF(options) }",
            loader: "js",
          }),
        );
      },
    },
  ],
});
if (!bundle.success) throw new Error(bundle.logs.join("\n"));
// PDF 1.x cross-reference rows include a space before LF. Keep that byte
// while expressing it explicitly in the generated JavaScript source.
const source = (await bundle.outputs[0].text()).replaceAll("` \n", "`\\x20\n");
writeFileSync(new URL("apps/editor/book-engine.js", root), source);
const notices = new URL("apps/editor/assets/book/", root);
mkdirSync(notices, { recursive: true });
for (const file of ['pdf.min.mjs','pdf.worker.min.mjs']) {
  copyFileSync(new URL('node_modules/pdfjs-dist/build/' + file, root), new URL(file, notices))
}
for (const [dependency, license] of [
  ["pdf-lib", "LICENSE.md"],
  ["pdfjs-dist", "LICENSE"],
  ["@pdf-lib/standard-fonts", "LICENSE.md"],
  ["@pdf-lib/upng", "LICENSE"],
  ["pako", "LICENSE"],
  ["tslib", "LICENSE.txt"],
]) {
  const notice = readFileSync(
    new URL(`node_modules/${dependency}/${license}`, root),
    "utf8",
  );
  writeFileSync(
    new URL(dependency.replace(/[^a-z0-9-]/g, "") + "-LICENSE.txt", notices),
    notice.replaceAll("\r\n", "\n"),
  );
}
