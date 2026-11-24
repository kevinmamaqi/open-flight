import {
  baselines,
  applyEdits,
  generatorId,
  geometryFor,
  previewFor,
  sourceFor,
} from "../../packages/product-core/aircraft.ts";
import {
  revision,
  emitPrintFiles,
} from "../../packages/product-core/edition.ts";
import {
  activityRevision,
  forAircraft,
  fieldGuide,
} from "../../packages/product-core/content.ts";
import { preparePrintAssets } from "atlas:files";

export { foldedSpanSpec, foldedSpecies, isFoldedSpan, foldedLessonSvg, makeFoldedButterfly, foldedSvg, foldedGuideSvg, foldedPdf, foldedPreview, foldedFinishedPreview, foldedSource } from "../../packages/folded-butterfly/index.ts";
export { classicComparisonPdf } from "../../packages/product-core/folded-butterflies.ts";
export const prepareFoldedPdf = () => preparePrintAssets(null, ["pdf"]);

const seeds = new Map(
  baselines.map((model) => {
    const seed = revision(
      model.model,
      model.baseline_revision,
      model.name,
      model.parameters,
      model.appearance_id,
      null,
      "original",
      "2026-11-23T00:00:00Z",
      model.species,
    );
    return [model.model, seed];
  }),
);
const blobCache = new Map(),
  jobs = new Map();
const storageName =
  "open-flight-designs-v1:" + new URL(".", import.meta.url).pathname;
const dbReady = new Promise((resolve, reject) => {
  const open = indexedDB.open(storageName, 1);
  open.onupgradeneeded = () => {
    open.result.createObjectStore("records");
    open.result.createObjectStore("heads");
    open.result.createObjectStore("receipts");
  };
  open.onsuccess = () => resolve(open.result);
  open.onerror = () => reject(open.error);
});
const resultOf = (req) =>
  new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
const json = (value) => Response.json(value);
async function read(id, rev, active) {
  if (seeds.has(id) && seeds.get(id).dto.ref.revision_id === rev)
    return seeds.get(id);
  const tx = active ?? (await dbReady).transaction(["records", "heads"]);
  const [row, head] = await Promise.all([
    resultOf(tx.objectStore("records").get([id, rev])),
    resultOf(tx.objectStore("heads").get(id)),
  ]);
  if (!row || !head) throw Error("This design is unavailable on this device.");
  return {
    source: row.source,
    dto: { ...row.dto, head_revision_id: head.ref.revision_id },
  };
}
async function exact(ref, tx) {
  const row = await read(ref.design_id, ref.revision_id, tx);
  if (
    row.dto.ref.source_sha256 !== ref.source_sha256 ||
    row.dto.provenance.generator_revision !== generatorId(row.dto.species_id) ||
    row.source !== sourceFor(ref.design_id, ref.revision_id, row.dto)
  )
    throw Error("The saved source differs from this revision.");
  return row;
}
async function save(id, body, options) {
  const db = await dbReady;
  const tx = db.transaction(["records", "heads", "receipts"], "readwrite");
  const completion = new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = tx.onabort = () =>
      reject(tx.error ?? Error("Save interrupted"));
  });
  const receipts = tx.objectStore("receipts");
  const key = options.headers["Idempotency-Key"];
  const fingerprint = JSON.stringify([id, options.headers["If-Match"], body]);
  try {
    const prior = await resultOf(receipts.get(key));
    if (prior) {
      if (prior.fingerprint !== fingerprint)
        throw Error("This save key belongs to a different edit.");
      await completion;
      return prior.dto;
    }
    let base, rev, name;
    if (id) {
      const head = await resultOf(tx.objectStore("heads").get(id));
      if (
        !head ||
        options.headers["If-Match"] !== '"' + head.ref.revision_id + '"'
      ) {
        const error = new Error("Reload the current revision before saving.");
        error.code = "revision_conflict";
        throw error;
      }
      base = (await exact(head.ref, tx)).dto;
      rev = "r" + (Number(head.ref.revision_id.slice(1)) + 1);
      name = base.name;
    } else {
      base = (await exact(body.source, tx)).dto;
      name = String(body.name ?? "").trim();
      if (!name || name.length > 120)
        throw Error("Choose a name of up to 120 characters.");
      id = "d-" + crypto.randomUUID();
      rev = "r1";
    }
    const edits = applyEdits(base, body.parameters, body.appearance_id);
    const next = revision(
      id,
      rev,
      name,
      edits.parameters,
      edits.appearance_id,
      base.ref,
      rev === "r1" ? "fork" : "revision",
      new Date().toISOString(),
      base.species_id,
    );
    tx.objectStore("records").add(next, [id, rev]);
    tx.objectStore("heads").put(next.dto, id);
    receipts.add({ fingerprint, dto: next.dto }, key);
    await completion;
    return next.dto;
  } catch (error) {
    try {
      tx.abort();
    } catch {}
    await completion.catch(() => {});
    throw error;
  }
}
function artifact(prefix, type, bytes) {
  const id = prefix + "-" + crypto.randomUUID();
  blobCache.set(id, new Blob([bytes], { type }));
  return { artifact_id: id };
}
export async function publicRequest(path, options = {}) {
  try {
    options.signal?.throwIfAborted();
    const url = new URL(path, location.origin);
    const [, , section, id, action, rev] = url.pathname.split("/");
    const body = options.body ? JSON.parse(options.body) : {};
    switch (section) {
      case "capabilities":
        return json({
          enabled_operations: [
            "previewDraft",
            "previewDesign",
            "forkDesign",
            "reviseDesign",
            "startExport",
            "listDesigns",
            "listActivities",
            "getDesignRevision",
            "getFieldGuide",
          ],
        });
      case "field-guide":
        return json({ species: fieldGuide });
      case "designs": {
        if (options.method === "POST")
          return json(await save(id, body, options));
        if (id) return json((await read(id, rev)).dto);
        const stored = await resultOf(
          (await dbReady).transaction("heads").objectStore("heads").getAll(),
        );
        return json({
          items: [...seeds.values()].map((row) => row.dto).concat(stored),
          next_cursor: null,
        });
      }
      case "activities": {
        if (id)
          return json(
            activityRevision(id, rev),
          );
        const species = url.searchParams.get("species_id");
        return json({
          items: forAircraft(
            species === "legacy" ? undefined : species,
            url.searchParams.get("locale"),
          ),
          next_cursor: null,
        });
      }
      case "previews": {
        const base = (await exact(body.design)).dto;
        const draft = {
          ...base,
          ...applyEdits(base, body.parameters, body.appearance_id),
        };
        const rendered = previewFor(draft);
        const svg =
          id === "draft"
            ? rendered.toString("utf8")
            : artifact("preview", "image/svg+xml", rendered);
        return json({
          svg,
          geometry: geometryFor(draft),
          is_flight_simulation: false,
        });
      }
      case "exports": {
        const current = await exact(body.design);
        await preparePrintAssets(
          fieldGuide.find((s) => s.id === current.dto.species_id),
          body.formats,
        );
        const ids = [];
        emitPrintFiles(current, body, (type, mime, bytes) =>
          ids.push(artifact(type, mime, bytes).artifact_id),
        );
        const job = {
          job_id: "job-" + crypto.randomUUID(),
          status: "succeeded",
          artifact_ids: ids,
        };
        jobs.set(job.job_id, job);
        return json(job);
      }
      case "jobs":
        if (jobs.has(id)) return json(jobs.get(id));
        break;
      case "artifacts":
        if (blobCache.has(id)) {
          const blob = blobCache.get(id);
          // The editor owns the returned Blob; bytes need no second copy after download.
          blobCache.delete(id);
          return new Response(blob, { headers: { "Content-Type": blob.type } });
        }
        break;
    }
    return Response.json(
      { message: "Unknown workshop resource." },
      { status: 404 },
    );
  } catch (error) {
    if (error.name === "AbortError") throw error;
    return Response.json(
      { code: error.code, message: error.message },
      { status: 400 },
    );
  }
}
