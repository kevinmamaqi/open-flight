// Bun bundles the shared print and geometry code. The browser can read only these project resources.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { workshopModels } from "../packages/geometry/workshop.ts";
import { workshopPreview } from "../packages/print-export/workshop.ts";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const editor = join(root, "apps/editor");
const output = join(editor, "assets/atlas");
mkdirSync(output, { recursive: true });
for (const model of workshopModels)
  writeFileSync(
    join(output, model.species + ".svg"),
    workshopPreview(model, model.parameters, "natural"),
  );
const resources = [
  "packages/geometry/butterfly.ts",
  "packages/geometry/workshop.ts",
  "packages/geometry/workshop-art.ts",
  "packages/geometry/workshop-models.ts",
  "designs/butterfly-001/model.json",
  "packages/field-guide/species.json",
  "node_modules/dejavu-fonts-ttf/LICENSE",
  "content/en/butterfly-001/build.md",
  "content/ru/butterfly-001/build.md",
  "content/es/butterfly-001/build.md",
  "games/garden-gate/en.md",
  "games/garden-gate/ru.md",
  "games/garden-gate/es.md",
];
const files = Object.fromEntries(
  resources.map((p) => ["/" + p, readFileSync(join(root, p), "utf8")]),
);
const runtimeDir = join(editor, "assets/planes/vendor");
mkdirSync(runtimeDir, { recursive: true });
for (const [source, name] of [
  ["jspdf/dist/jspdf.umd.min.js", "jspdf.js"],
  ["jspdf/LICENSE", "jspdf-LICENSE.txt"],
  ["dejavu-fonts-ttf/ttf/DejaVuSans.ttf", "DejaVuSans.ttf"],
  ["dejavu-fonts-ttf/LICENSE", "DejaVu-LICENSE.txt"],
])
  copyFileSync(join(root, "node_modules", source), join(runtimeDir, name));
for (const [dep, license] of [
  ["buffer", "LICENSE"],
  ["base64-js", "LICENSE"],
  ["ieee754", "LICENSE"],
  ["@noble/hashes", "LICENSE"],
])
  copyFileSync(
    join(root, "node_modules", dep, license),
    join(output, dep.replace(/[^a-z0-9-]/g, "") + "-LICENSE.txt"),
  );
const browserFiles = `
import { Buffer } from 'atlas:buffer'
const textFiles = ${JSON.stringify(files)}
const remote = new Map()
let pdfLibrary
const fromSite = path=>new URL(path,import.meta.url)
function resource(key,url) {
  if (!remote.has(key)) {
    const pending = fetch(fromSite(url)).then(async response=>{
      if (!response.ok) throw Error('Cannot load print resource '+url)
      const data=Buffer.from(await response.arrayBuffer())
      remote.set(key,data)
      return data
    }).catch(error=>{remote.delete(key);throw error})
    remote.set(key,pending)
  }
  return remote.get(key)
}
async function pdfReady(){
  if(globalThis.jspdf) return
  pdfLibrary ??= new Promise((resolve,reject)=>{
    const script=document.createElement('script')
    script.src=fromSite('assets/planes/vendor/jspdf.js')
    script.onload=resolve
    script.onerror=()=>{pdfLibrary=undefined;reject(Error('Unable to load the PDF tools.'))}
    document.head.append(script)
  })
  await pdfLibrary
}
export async function preparePrintAssets(guide,formats){
  const needed=[]
  if(formats.includes('pdf')) needed.push(pdfReady(),resource('/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf','assets/planes/vendor/DejaVuSans.ttf'))
  if(guide && formats.includes('illustrated_guide')) {
    const paths=[guide.photo.local_path,...guide.en.steps.map(s=>s.diagram)].filter(Boolean)
    for(const path of new Set(paths)) needed.push(resource('/apps/editor'+path,path.slice(1)))
  }
  await Promise.all(needed)
}
export function readFileSync(url, encoding){
  const path=url.pathname
  if(Object.hasOwn(textFiles,path)) return encoding === 'utf8' ? textFiles[path] : Buffer.from(textFiles[path])
  const bytes=remote.get(path)
  if (!Buffer.isBuffer(bytes)) throw Error('Unavailable print resource '+path)
  return encoding === 'utf8' ? bytes.toString('utf8') : bytes
}
`;
const plugins = [
  {
    name: "portable-print-assets",
    setup(build) {
      build.onResolve({ filter: /^atlas:buffer$/ }, () => ({
        path: require.resolve("buffer/"),
      }));
      build.onResolve(
        { filter: /^(node:fs|atlas:files|node:crypto|jspdf)$/ },
        (args) => ({
          path: args.path === "node:fs" ? "atlas:files" : args.path,
          namespace: "atlas-runtime",
        }),
      );
      build.onResolve({ filter: /^\.\/contracts\.ts$/ }, () => ({
        path: "contracts",
        namespace: "atlas-runtime",
      }));
      build.onLoad({ filter: /.*/, namespace: "atlas-runtime" }, (args) => {
        const content = {
          "atlas:files": browserFiles,
          "node:crypto":
            "import {sha256} from '@noble/hashes/sha2.js';import {bytesToHex} from '@noble/hashes/utils.js';export function createHash(){const hash=sha256.create();return {update(bytes){hash.update(typeof bytes==='string'?new TextEncoder().encode(bytes):bytes);return this},digest(){return bytesToHex(hash.digest())}}}",
          jspdf:
            "export function jsPDF(settings){return new globalThis.jspdf.jsPDF(settings)}",
          contracts: "export const invalid=message=>new Error(message)",
        };
        return { contents: content[args.path], loader: "js", resolveDir: root };
      });
      build.onLoad({ filter: /packages\/.*\.ts$/ }, (args) => {
        const rel = relative(root, args.path).split(sep).join("/");
        // Preserve the exact historic generator fingerprints and resolve only declared assets.
        const source = readFileSync(args.path, "utf8").replaceAll(
          "import.meta.url",
          JSON.stringify("https://print.invalid/" + rel),
        );
        return {
          contents: "import {Buffer} from 'atlas:buffer'\n" + source,
          loader: "ts",
          resolveDir: resolve(args.path, ".."),
        };
      });
    },
  },
];
const bundle = await Bun.build({
  entrypoints: [join(root, "apps/public/browser-workshop.js")],
  target: "browser",
  format: "esm",
  minify: true,
  plugins,
});
if (!bundle.success) {
  for (const log of bundle.logs) console.error(log);
  process.exit(1);
}
writeFileSync(
  join(editor, "browser-workshop.js"),
  await bundle.outputs[0].text(),
);
console.log(
  "Built the portable butterfly studio and three specimen illustrations.",
);
