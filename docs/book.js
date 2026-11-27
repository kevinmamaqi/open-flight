import { coloredPacket, objectIds } from "./assets/objects/appearance.js?v=2807f4a798d5";
import { flightObjects } from "./assets/objects/activities.js?v=2807f4a798d5";
import { currentLocale, homeURL, localizedLinks } from "./atlas-nav.js?v=2807f4a798d5";
import { recordBookEvent } from "./book-metrics.js?v=2807f4a798d5";
import {
  bookFilename,
  bookPlan,
  bookTitle,
  bookURL,
  coverLimit,
  localePaper,
  modelOrder,
  normalizeBook,
  pilotLimit,
  readBookURL,
} from "./book-model.js?v=2807f4a798d5";
import {
  loadBookServices,
  recoverBookCheckout,
  supportChoices,
} from "./book-support.js?v=2807f4a798d5";
import { estimateBookBytes } from "./book-size.js?v=2807f4a798d5";
import { mountBookReader } from "./book-reader.js?v=2807f4a798d5";
import { applyStudioColors, studioForBookSheet } from "./model-studio.js?v=2807f4a798d5";
import { mountModelMap } from "./model-map.js?v=2807f4a798d5";
import { appearanceArtPath, appearanceChoices } from "./model-appearance.js?v=2807f4a798d5";
import { builderCopy } from "./book-ui-copy.js?v=2807f4a798d5";
import {
  sheetCatalog,
  sheetIdFor,
  sheetName,
  sheetPath,
} from "./family-sheets.js?v=2807f4a798d5";

const sheetVersion = new URL(import.meta.url).search;
const byId = (id) => document.getElementById(id);
const designs = byId("designs");
const order = byId("order");
const titleInput = byId("title-input");
const pilotInput = byId("pilot-input");
const download = byId("download-book");
const sharePDF = byId("share-pdf");
const shareLink = byId("share-link");
const status = byId("book-status");
const cover = byId("book-cover");
const draftKey = "open-flight-flight-book-1";
const legacyKey = "open-flight-family-book-1";
const entries = new Map(sheetCatalog.map((item) => [item.id, item]));
for (const id of objectIds) entries.set(id, {id, model:id, family:"object", construction:"activity"});
const locales = ["en", "es", "ru"];
const previousTitles = [
  "Our family flight book",
  "Nuestro libro de vuelo en familia",
  "Наша семейная книга полётов",
  ...locales.map(bookTitle),
];

function readDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(draftKey));
    if (draft) return { draft, legacy: false };
  } catch {
    /* The current page can still run without storage. */
  }
  try {
    return {
      draft: JSON.parse(sessionStorage.getItem(legacyKey)) || {},
      legacy: true,
    };
  } catch {
    return { draft: {}, legacy: false };
  }
}

const { draft: saved, legacy } = readDraft();
const incoming = readBookURL(location.href);
const fullShare = Array.isArray(incoming.sheets);
const draft = fullShare ? incoming : { ...saved, ...incoming };
const requestedActivity = new URL(location.href).searchParams.get("addActivity");
if (requestedActivity && flightObjects().activities.some(item => item.id === requestedActivity)) {
  const previous = Array.isArray(draft.activities) ? draft.activities : [];
  draft.activities = [...new Set([...previous, requestedActivity])];

}
const studioChanges = applyStudioColors(draft, location.href);
const preferences = { ...draft, ...studioChanges };
const lang = locales.includes(preferences.lang)
  ? preferences.lang
  : currentLocale();
const defaults = { lang, paper: localePaper(navigator.languages) };
const savedCover =
  legacy &&
  !Object.hasOwn(incoming, "cover") &&
  previousTitles.includes(preferences.cover)
    ? ""
    : preferences.cover;
let payment = supportChoices();
let amount = 0;
let state;
try {
  const empty = Array.isArray(preferences.sheets) && !preferences.sheets.length && !preferences.activities?.length;
  state = normalizeBook({
    ...defaults,
    ...preferences,
    sheets: empty ? undefined : preferences.sheets,
    coverModel: empty ? undefined : preferences.coverModel,
    lang,
    cover: savedCover,
  });
  if (empty) {
    state.sheets = [];
    state.coverModel = undefined;
  }
} catch {
  state = normalizeBook(defaults);
}
state.cover = savedCover === state.cover ? savedCover : "";
// New choices use K3. A book that already holds a retired fold keeps it until the reader swaps it.
const initialFold = "k3";
const folds = new Map();
const studioSheet = new URLSearchParams(location.hash.slice(1)).get("flyer");
const studioEntry = (studioChanges.sheets || studioChanges.activities) && entries.get(studioSheet);
// A link from an older studio page keeps its fold selected for that model.
if (studioEntry?.family === "butterfly")
  folds.set(studioEntry.model, studioEntry.construction);
let activeModel =
  studioEntry?.model ||
  entries.get(state.coverModel ?? state.sheets[0])?.model ||
  modelOrder[0];
let manualOrder =
  fullShare || Boolean(preferences.manualOrder ?? preferences.sheets);
let busy = false;
let dragId;
let activePDF;
let activeMap;
let paletteKey;
const reader = mountBookReader({ readyPDF });

function copy() {
  return builderCopy[state.lang];
}

function persist() {
  try {
    localStorage.setItem(
      draftKey,
      JSON.stringify({ ...state, construction: initialFold, manualOrder }),
    );
  } catch {
    /* Private browsing and storage limits must not interrupt editing. */
  }
}

function currentBook() {
  return state.sheets.length || state.activities?.length ? normalizeBook(state) : null;
}

function picture(image, id, style, small = false) {
  const { family, model } = entries.get(id);
  const fullSize = appearanceArtPath(id, style, state.appearances?.[model]);
  const defaultSize = appearanceArtPath(id, style);
  const source =
    small && fullSize === defaultSize
      ? fullSize.replace("/models/", "/thumbs/")
      : fullSize;
  if (image.dataset.source === source) return;
  image.dataset.source = source;
  image.onerror = () => {
    if (source !== fullSize && !image.src.endsWith(fullSize)) {
      image.src = fullSize;
    } else {
      image.onerror = null;
      image.src = `./assets/${family === "butterfly" ? "atlas" : "planes"}/${model}.svg`;
    }
  };
  image.src = source;
}

function editionsFor(model) {
  if (objectIds.includes(model)) return state.activities?.includes(model) ? [model] : [];
  return state.sheets.filter((id) => entries.get(id).model === model);
}

function selectedSheet(model) {
  if (objectIds.includes(model)) return model;
  const editions = editionsFor(model);
  const preferred = sheetIdFor(model, folds.get(model) ?? initialFold);
  if (folds.has(model) && editions.includes(preferred)) return preferred;
  if (editions.includes(state.coverModel)) return state.coverModel;
  return editions[0] ?? preferred;
}

function renderCards() {
  designs.replaceChildren(
    ...modelOrder.map((model) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "design";
      button.dataset.edit = model;
      const image = document.createElement("img");
      image.alt = "";
      image.width = 288;
      image.height = 180;
      image.decoding = "async";
      const name = document.createElement("span");
      name.className = "design-name";
      const included = document.createElement("span");
      included.className = "design-state";
      button.append(image, name, included);
      return button;
    }),
  );
}

function namedSheet(id) {
  const name = sheetName(id, state.lang);
  const { family, construction } = entries.get(id);
  if (family !== "butterfly") return name;
  const t = copy();
  const fold = { k1: t.folded, w1: t.tabs, k2: t.costa, k3: t.dart }[construction];
  return construction === "k3" ? `${name} · ${fold}` : `${name} · ${fold} (${construction.toUpperCase()})`;
}

function syncFlyer() {
  const t = copy();
  for (const card of designs.children) {
    const { edit: model } = card.dataset;
    const id = selectedSheet(model);
    const included = editionsFor(model).length > 0;
    card.setAttribute("aria-pressed", String(model === activeModel));
    card.querySelector(".design-name").textContent = sheetName(id, state.lang);
    card.querySelector(".design-state").textContent = included
      ? t.inBook
      : t.notInBook;
    picture(card.querySelector("img"), id, "studio", true);
  }
  const id = selectedSheet(activeModel);
  const { family, construction } = entries.get(id);
  const name = sheetName(id, state.lang);
  const editions = editionsFor(activeModel);
  const onCover = (state.coverModel ?? state.sheets[0]) === id;
  byId("flyer-name").textContent = name;
  const planeTools = state.edge === "cut" ? t.planeCutTools : t.planeTools;
  const butterflyTools = construction === "k3" ? t.dartTools : construction === "k2" ? t.costaTools : t.butterflyTools;
  byId("flyer-tools").textContent = family === "object" ? flightObjects(state.lang).activities.find(item=>item.id===id).materials : family === "butterfly" ? butterflyTools : planeTools;
  picture(byId("flyer-image"), id, "studio");
  byId("flyer-studio").href = studioForBookSheet(state, id);
  // Only K3 is offered. A retired fold this book already holds stays visible so the reader can
  // see it and swap it for K3.
  const heldFolds = new Set(editions.map((sheet) => entries.get(sheet).construction));
  for (const input of document.querySelectorAll('input[name="construction"]')) {
    const shown = input.value === "k3" || heldFolds.has(input.value);
    input.closest("label").hidden = !shown;
    const hint = byId(input.getAttribute("aria-describedby"));
    if (hint) hint.hidden = !shown;
  }
  if (family === "butterfly") {
    picture(byId("dart-example"), sheetIdFor(activeModel, "k3"), "studio", true);
    if (heldFolds.has("k1")) picture(byId("spine-example"), sheetIdFor(activeModel, "k1"), "studio", true);
    if (heldFolds.has("k2")) picture(byId("costa-example"), sheetIdFor(activeModel, "k2"), "studio", true);
  }
  byId("construction").hidden = family !== "butterfly" || ![...heldFolds].some((fold) => fold !== "k3");
  byId("mixed-builds").hidden =
    new Set(
      state.sheets
        .map((sheet) => entries.get(sheet))
        .filter((entry) => entry.family === "butterfly")
        .map((entry) => entry.construction),
    ).size < 2;
  for (const input of document.querySelectorAll('input[name="construction"]'))
    input.checked = editions.length < 2 && input.value === construction;
  const include = byId("include-model");
  include.textContent = editions.length ? t.exclude : t.include;
  include.classList.toggle("is-included", editions.length > 0);
  const feature = byId("cover-model");
  feature.disabled = !editions.length || onCover;
  feature.textContent = onCover ? t.featured : t.feature;
  byId("flyer-status").textContent = editions.length ? "" : t.featureHint;
  const choices = appearanceChoices(activeModel, state.lang);
  const activeChoice = state.appearances?.[activeModel] ?? choices[0]?.id;
  const swatches = byId("swatches");
  const key = `${state.lang}-${activeModel}`;
  if (key !== paletteKey) {
    paletteKey = key;
    swatches.replaceChildren(
      ...choices.map(({ id, label, colors }) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "swatch";
        button.dataset.appearance = id;
        const sample = document.createElement("span");
        sample.className = "sample";
        sample.setAttribute("aria-hidden", "true");
        for (const color of colors) {
          const band = document.createElement("span");
          band.style.backgroundColor = color;
          sample.append(band);
        }
        button.append(sample, label);
        return button;
      }),
    );
  }
  for (const button of swatches.children)
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.appearance === activeChoice),
    );
  byId("model-map").closest("details").hidden = family === "object";
  if (family !== "object") activeMap?.select(activeModel);
}

function selectFlyer(model) {
  if (!modelOrder.includes(model)) return;
  activeModel = model;
  syncFlyer();
}

function renderOrder() {
  const t = copy();
  order.replaceChildren(
    ...[state.sheets, state.activities ?? []].flatMap(group => group.map((id, index) => {
      const item = document.createElement("li");
      const row = document.createElement("div");
      row.className = "order-item";
      row.draggable = true;
      item.dataset.id = id;
      const name = document.createElement("b");
      name.textContent = namedSheet(id);
      row.append(name);
      for (const [delta, arrow, label] of [
        [-1, "↑", t.up],
        [1, "↓", t.down],
      ]) {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.delta = delta;
        button.textContent = arrow;
        button.disabled = !group[index + delta];
        button.setAttribute("aria-label", `${label} · ${name.textContent}`);
        row.append(button);
      }
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.remove = id;
      remove.textContent = "×";
      remove.setAttribute("aria-label", `${t.remove} · ${name.textContent}`);
      row.append(remove);
      item.append(row);
      return item;
    })),
  );
}

function renderActions() {
  const t = copy();
  const book = currentBook();
  const disabled = !book || invalidLabels();
  download.disabled = disabled || busy;
  byId("free-download").disabled = disabled || busy;
  shareLink.disabled = disabled;
  sharePDF.disabled = disabled || busy;
  if (book) {
    const probe = new File(["%PDF-1.7"], bookFilename(book), {
      type: "application/pdf",
    });
    sharePDF.hidden = !canShareFile(probe);
  } else {
    sharePDF.hidden = true;
  }
  byId("book-summary").textContent = book
    ? t.count(bookPlan(book).pageCount)
    : t.empty;
  const size = byId("book-size");
  const bytes = book ? estimateBookBytes(book) : 0;
  size.hidden = !bytes;
  if (bytes) {
    const megabytes = bytes >= 1_000_000;
    const units = new Intl.NumberFormat(state.lang, {
      style: "unit",
      unit: megabytes ? "megabyte" : "kilobyte",
      maximumFractionDigits: megabytes ? 1 : 0,
    });
    size.textContent = `~${units.format(bytes / (megabytes ? 1_000_000 : 1_000))}`;
  }
}

function previewOptions(book) {
  if (!book) return [];
  const t = copy();
  const plan = bookPlan(book);
  const items = t.keepers.map((label, i) => ({ label, number: i + 1 }));
  for (const entry of plan.entries) {
    for (const { index, number } of entry.pages) {
      const sharedGuide = number === plan.guidePage;
      const label = sharedGuide ? t.foldGuide : namedSheet(entry.id);
      const source = `./${sheetPath(entry.id, book.paper, book.lang)}${sheetVersion}#page=${index + 1}`;
      items.push({ label, number, source });
    }
  }
  for (const { id, number } of plan.originPages ?? [])
    items.push({ label: t.origin(sheetName(id, book.lang)), number });
  if (plan.activityPages.length) {
    const lab = flightObjects(book.lang);
    for (const { id, number } of plan.activityPages) {
      const activity = lab.activities.find(item => item.id === id);
      items.push({ number, label: activity.title, source: "./" + coloredPacket(lab.packets[book.paper], book.appearances[id]) + sheetVersion + "#page=" + activity.page });
    }
  }
  return items;
}

function refresh({ lazy = false } = {}) {
  const t = copy();
  const book = currentBook();
  cover.dataset.style = state.style;
  cover.dataset.paper = state.paper;
  cover.dataset.model = book?.coverModel ?? state.sheets[0] ?? "";
  byId("cover-title").textContent = state.cover || t.title;
  const pilot = byId("cover-pilot");
  pilot.hidden = !state.pilot;
  pilot.textContent = state.pilot;
  byId("preview-paper").textContent = state.paper === "A4" ? "A4" : t.letter;
  // The edge choice only affects airplane pages, so it appears once the book has one.
  byId("edge-choice").hidden = !state.sheets.some(
    (id) => entries.get(id).family === "airplane",
  );
  reader.render(book, previewOptions(book), t, {
    coverLabel: state.cover || t.title,
    lazy,
  });
  renderActions();
  persist();
  const url = new URL(location.href);
  url.searchParams.delete("addActivity");
  if ((studioChanges.sheets || studioChanges.activities) && url.hash.includes("flyer=")) {
    url.hash = "";
  } else if (fullShare && book) {
    url.hash = new URL(bookURL(state, url)).hash;
  } else if (incoming.pilot && !fullShare) {
    const fragment = new URLSearchParams(url.hash.slice(1));
    fragment.delete("pilot");
    url.hash = fragment.toString();
  }
  if (url.href !== location.href) {
    try {
      history.replaceState(null, "", url);
    } catch {
      /* Draft persistence remains available. */
    }
  }
}

function renderPayments() {
  const t = copy();
  const canPay = payment.amounts.length > 1;
  const paid = canPay && amount !== 0;
  byId("support-choices").hidden = !canPay;
  byId("free-download").hidden = !paid;
  download.textContent = paid ? t.checkout : canPay ? t.free : t.download;
  if (!canPay) return;
  const currency = new Intl.NumberFormat(state.lang, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  byId("amounts").replaceChildren(
    ...payment.amounts.map((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.amount = choice;
      const value =
        typeof choice === "number" ? currency.format(choice) : t.other;
      button.textContent =
        choice && choice === payment.suggested
          ? `${value} · ${t.suggested}`
          : value;
      button.setAttribute("aria-pressed", String(choice === amount));
      button.addEventListener("click", () => {
        amount = choice;
        renderPayments();
        byId("amounts").querySelector(`[data-amount="${choice}"]`).focus();
      });
      return button;
    }),
  );
}

function renderLocale() {
  const t = copy();
  document.documentElement.lang = state.lang;
  document.title = `${t.title} · Open Flight`;
  localizedLinks(state.lang);
  for (const locale of locales) {
    const link = byId(locale);
    // An already-shared setup should reopen in the language the reader chooses.
    const url = new URL(link.href);
    if (currentBook()) link.href = bookURL({ ...state, lang: locale }, url);
  }
  const home = homeURL(state.lang);
  byId("individual").href = home + "#library";
  byId("classroom").href = `./classroom.html?lang=${state.lang}`;
  for (const item of document.querySelectorAll("[data-book]"))
    item.textContent = t[item.dataset.book];
  setWideReading(document.querySelector(".workbench").dataset.wide === "true");
  byId("customize").setAttribute("aria-label", t.customize);
  titleInput.placeholder = t.title;
  updateLabelHints();
  activeMap?.();
  activeMap = mountModelMap(byId("model-map"), {
    model: objectIds.includes(activeModel) ? "monarch" : activeModel,
    lang: state.lang,
    onSelect: selectFlyer,
  });
  renderPayments();
  status.textContent = busy ? t.working : "";
  syncFlyer();
  renderOrder();
  refresh();
}

function applySheets(sheets, coverModel = state.coverModel) {
  state.sheets = sheets;
  state.coverModel = sheets.includes(coverModel) || state.activities?.includes(coverModel) ? coverModel : sheets[0] ?? state.activities?.[0];
  syncFlyer();
  renderOrder();
  refresh();
}

for (const anchor of document.querySelectorAll(".lang a")) {
  anchor.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    const url = new URL(location.href);
    url.searchParams.set("lang", anchor.id);
    const fragment = new URLSearchParams(url.hash.slice(1));
    fragment.delete("lang");
    url.hash = fragment.toString();
    history.replaceState(null, "", url);
    state.lang = currentLocale();
    renderLocale();
  });
  anchor.addEventListener("pointerdown", () => {
    if (currentBook())
      anchor.href = bookURL({ ...state, lang: anchor.id }, anchor.href);
  });
}
function setWideReading(wide) {
  byId("wide-reading").setAttribute("aria-pressed", String(wide));
  byId("wide-reading").textContent = wide ? copy().showFlyers : copy().wideReading;
  document.querySelector(".workbench").dataset.wide = String(wide);
}
byId("wide-reading").addEventListener("click", () => {
  setWideReading(byId("wide-reading").getAttribute("aria-pressed") !== "true");
});

document.addEventListener("click", (event) => {
  if (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  const href = event.target.closest("a")?.getAttribute("href");
  if (href === "#reader") {
    event.preventDefault();
    reader.goTo(1);
  }
  if (href === "#customize") {
    event.preventDefault();
    setWideReading(false);
    const panel = byId("customize");
    panel.focus({ preventScroll: true });
    panel.scrollIntoView({ block: "start" });
  }
});
designs.addEventListener("click", ({ target }) => {
  const model = target.closest("[data-edit]")?.dataset.edit;
  if (model) selectFlyer(model);
});
byId("swatches").addEventListener("click", ({ target }) => {
  const id = target.closest("[data-appearance]")?.dataset.appearance;
  if (!id) return;
  const next = { ...state.appearances };
  const [original] = appearanceChoices(activeModel, state.lang);
  if (original?.id === id) delete next[activeModel];
  else next[activeModel] = id;
  state.appearances = next;
  syncFlyer();
  refresh();
});
byId("include-model").addEventListener("click", () => {
  const editions = editionsFor(activeModel);
  if (objectIds.includes(activeModel)) {
    state.activities = editions.length ? state.activities.filter(id=>id!==activeModel) : [...(state.activities ?? []), activeModel];
    applySheets(state.sheets);
    return;
  }
  if (editions.length) {
    folds.set(
      activeModel,
      entries.get(selectedSheet(activeModel)).construction,
    );
    applySheets(state.sheets.filter((id) => !editions.includes(id)));
    return;
  }
  const next = [...state.sheets, selectedSheet(activeModel)];
  if (!manualOrder) {
    next.sort(
      (a, b) =>
        modelOrder.indexOf(entries.get(a).model) -
        modelOrder.indexOf(entries.get(b).model),
    );
  }
  applySheets(next);
});
byId("cover-model").addEventListener("click", () => {
  state.coverModel = selectedSheet(activeModel);
  syncFlyer();
  byId("include-model").focus({ preventScroll: true });
  byId("flyer-status").textContent = copy().featured;
  refresh();
});
document.addEventListener("change", ({ target }) => {
  const { name, value } = target;
  if (name === "construction") {
    const replacement = sheetIdFor(activeModel, value);
    const editions = editionsFor(activeModel);
    folds.set(activeModel, value);
    const next = state.sheets.flatMap((id) => {
      if (!editions.includes(id)) return [id];
      return id === editions[0] ? [replacement] : [];
    });
    const featured = editions.includes(state.coverModel)
      ? replacement
      : state.coverModel;
    applySheets(next, featured);
  }
  if (name === "style" || name === "paper" || name === "edge") {
    state[name] = value;
    syncFlyer();
    refresh();
  }
});

function invalidLabels() {
  return [pilotInput, titleInput].some(
    (input) => input.getAttribute("aria-invalid") === "true",
  );
}

function updateLabelHints() {
  const t = copy();
  const invalidPilot = pilotInput.getAttribute("aria-invalid") === "true";
  const invalidTitle = titleInput.getAttribute("aria-invalid") === "true";
  byId("pilot-hint").textContent = invalidPilot ? t.pilotError : t.pilotHint;
  byId("title-hint").textContent = invalidTitle ? t.titleError : "";
  byId("title-hint").hidden = !invalidTitle;
}

function bindLabel(input, name, limit) {
  input.maxLength = limit;
  input.value = state[name] ?? "";
  input.addEventListener("input", () => {
    let invalid = false;
    try {
      state[name] = input.value.trim()
        ? normalizeBook({ [name]: input.value, lang: state.lang })[name]
        : "";
    } catch {
      invalid = true;
    }
    input.setAttribute("aria-invalid", String(invalid));
    updateLabelHints();
    refresh({ lazy: true });
  });
}
bindLabel(pilotInput, "pilot", pilotLimit);
bindLabel(titleInput, "cover", coverLimit);

function groupFor(id) {
  return objectIds.includes(id) ? state.activities ?? [] : state.sheets;
}
function moveSheet(id, to) {
  const group = groupFor(id);
  if (!group[to]) return;
  const from = group.indexOf(id);
  if (from < 0 || to === from) return;
  group.splice(from, 1);
  group.splice(to, 0, id);
  manualOrder = true;
  renderOrder();
  refresh();
}

order.addEventListener("click", ({ target }) => {
  const { delta, remove } = target.dataset;
  if (remove) {
    const index = [...order.children].indexOf(target.closest("li"));
    if (objectIds.includes(remove)) state.activities = state.activities.filter(id=>id!==remove);
    applySheets(state.sheets.filter((id) => id !== remove));
    const row = order.children[Math.min(index, order.children.length - 1)];
    (row?.querySelector("[data-remove]") || byId("order-summary")).focus();
    return;
  }
  if (!delta) return;
  const { id } = target.closest("li").dataset;
  const to = groupFor(id).indexOf(id) + Number(delta);
  moveSheet(id, to);
  const row = order.querySelector('li[data-id="'+id+'"]');
  (
    row.querySelector(`[data-delta="${delta}"]:enabled`) ||
    row.querySelector("button:enabled")
  )?.focus();
});
order.addEventListener("dragstart", (event) => {
  dragId = event.target.closest("li")?.dataset.id;
  if (dragId) event.dataTransfer.setData("text/plain", dragId);
});
order.addEventListener("dragover", (event) => {
  if (!dragId) return;
  const row = event.target.closest(".order-item");
  if (row) {
    event.preventDefault();
    order.querySelector(".drop-target")?.classList.remove("drop-target");
    row.classList.add("drop-target");
  }
});
order.addEventListener("drop", (event) => {
  if (!dragId) return;
  event.preventDefault();
  const target = event.target.closest("li")?.dataset.id;
  moveSheet(dragId, groupFor(dragId).indexOf(target));
  dragId = undefined;
  order.querySelector(".drop-target")?.classList.remove("drop-target");
});
order.addEventListener("dragend", () => {
  dragId = undefined;
  order.querySelector(".drop-target")?.classList.remove("drop-target");
});

// Most of a book is shared across edits. Reuse recent paper, font and image bytes
// until this tab closes, and allow a failed request to be retried.
const recentAssets = new Map();
function loadAsset(path) {
  let bytes = recentAssets.get(path);
  recentAssets.delete(path);
  if (!bytes) {
    const url = new URL(path, import.meta.url);
    if (path.startsWith("library/") || path.startsWith("assets/objects/")) url.search = sheetVersion;
    bytes = fetch(url).then(async (response) => {
      if (!response.ok) throw new Error("Unable to load " + path);
      return new Uint8Array(await response.arrayBuffer());
    });
    bytes.catch(() => {
      if (recentAssets.get(path) === bytes) recentAssets.delete(path);
    });
  }
  recentAssets.set(path, bytes);
  if (recentAssets.size > 48) recentAssets.delete(recentAssets.keys().next().value);
  return bytes;
}

function readyPDF(book) {
  const key = JSON.stringify(book);
  if (activePDF?.key === key) return activePDF.promise;
  const promise = Promise.all([
    import("./book-engine.js?v=2807f4a798d5"),
    import("./assets/planes/vendor/jspdf.js?v=2807f4a798d5"),
  ]).then(async ([{ createBook }]) => {
    const data = await createBook(book, { loadAsset });
    return new File([data], bookFilename(book), { type: "application/pdf" });
  });
  activePDF = { key, promise };
  promise.catch(() => {
    if (activePDF?.key === key) activePDF = undefined;
  });
  return promise;
}

function handOff(file) {
  const href = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = href;
  link.download = file.name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(href), 60_000);
}

function trackBookEvent(kind) {
  try {
    Promise.resolve(recordBookEvent(kind)).catch(() => {});
  } catch {
    /* A metrics failure must not interrupt the file handoff. */
  }
}

function canShareFile(file) {
  try {
    return Boolean(navigator.share && navigator.canShare?.({ files: [file] }));
  } catch {
    return false;
  }
}

async function downloadBook() {
  const book = currentBook();
  if (!book || busy || invalidLabels()) return;
  busy = true;
  status.textContent = copy().working;
  renderActions();
  try {
    const file = await readyPDF(book);
    handOff(file);
    shareReady = { key: JSON.stringify(book), file };
    trackBookEvent("download");
    status.textContent = copy().ready;
  } catch (error) {
    console.error(error);
    status.textContent = copy().error;
  } finally {
    busy = false;
    renderActions();
  }
}

download.addEventListener("click", () => {
  const href = amount === 0 ? null : payment.linkFor(amount);
  if (href) {
    persist();
    location.assign(href);
  } else {
    downloadBook();
  }
});
byId("free-download").addEventListener("click", downloadBook);
let shareReady;
sharePDF.addEventListener("click", async () => {
  const book = currentBook();
  if (!book) return;
  const key = JSON.stringify(book);
  if (shareReady?.key === key) {
    const file = shareReady.file;
    try {
      await navigator.share({ files: [file], title: bookTitle(book.lang) });
      trackBookEvent("download");
      status.textContent = copy().ready;
    } catch (error) {
      if (error.name !== "AbortError") {
        handOff(file);
        trackBookEvent("download");
        status.textContent = copy().ready;
      }
    }
    return;
  }
  busy = true;
  renderActions();
  status.textContent = copy().working;
  try {
    const file = await readyPDF(book);
    shareReady = { key, file };
    status.textContent = copy().tapShare;
  } catch (error) {
    console.error(error);
    status.textContent = copy().error;
  } finally {
    busy = false;
    renderActions();
    sharePDF.focus();
  }
});
shareLink.addEventListener("click", async () => {
  const href = new URL(bookURL(state, location.href));
  if (reader.page > 1) href.searchParams.set("p", String(reader.page));
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(href.href);
      status.textContent = copy().copied;
    } else if (navigator.share) {
      await navigator.share({ title: bookTitle(state.lang), url: href.href });
    } else {
      window.prompt(copy().copyLink, href.href);
    }
  } catch (error) {
    if (error.name !== "AbortError") window.prompt(copy().copyLink, href.href);
  }
});

window.addEventListener("hashchange", () => {
  const settings = readBookURL(location.href);
  if (
    settings.sheets ||
    settings.pilot !== undefined ||
    new URLSearchParams(location.hash.slice(1)).has("flyer")
  )
    location.reload();
});
renderCards();
for (const input of document.querySelectorAll("input[type=radio]")) {
  const value = input.name === "construction" ? initialFold : state[input.name];
  input.checked = input.value === value;
}
renderLocale();
const requestedPage = Number(new URL(location.href).searchParams.get("p"));
if (Number.isInteger(requestedPage) && requestedPage > 1)
  requestAnimationFrame(() =>
    reader.goTo(requestedPage, { focus: false, address: false }),
  );
trackBookEvent("book");
const actionBar = document.querySelector(".action-bar");
new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--bar-space",
    `${actionBar.offsetHeight + 12}px`,
  );
}).observe(actionBar);
const checkoutRecovery = recoverBookCheckout();
loadBookServices()
  .then(() => {
    payment = supportChoices();
    amount = payment.suggested;
    renderPayments();
  })
  .catch(() => {});
checkoutRecovery
  .then((recovered) => {
    if (recovered) downloadBook();
  })
  .catch(() => {});
