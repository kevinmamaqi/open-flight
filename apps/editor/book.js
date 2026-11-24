import { currentLocale, homeURL, localizedLinks } from "./atlas-nav.js";
import { recordBookEvent } from "./book-metrics.js";
import {
  artPath,
  bookEdition,
  bookFilename,
  bookPlan,
  bookTitle,
  bookURL,
  localePaper,
  modelOrder,
  normalizeBook,
  pilotLimit,
  readBookURL,
  starterModels,
} from "./book-model.js";
import {
  loadBookServices,
  recoverBookCheckout,
  supportChoices,
} from "./book-support.js";
import { estimateBookBytes } from "./book-size.js";
import { builderCopy } from "./book-ui-copy.js";
import {
  sheetCatalog,
  sheetIdFor,
  sheetName,
  sheetPath,
} from "./family-sheets.js";

const byId = (id) => document.getElementById(id);
const designs = byId("designs");
const order = byId("order");
const pilotInput = byId("pilot-input");
const download = byId("download-book");
const sharePDF = byId("share-pdf");
const shareLink = byId("share-link");
const peekButton = byId("peek-page");
const peek = byId("peek-dialog");
const pageSelect = byId("preview-select");
const status = byId("book-status");
const cover = byId("book-cover");
const draftKey = "open-flight-flight-book-1";
const legacyKey = "open-flight-family-book-1";
const entries = new Map(sheetCatalog.map((item) => [item.id, item]));
const butterflies = modelOrder.filter(
  (id) => entries.get(id).family === "butterfly",
);
const planes = modelOrder.filter((id) => entries.get(id).family === "airplane");
const presets = {
  starter: starterModels,
  butterflies,
  planes,
  all: modelOrder,
};
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
const preferences = fullShare ? incoming : { ...saved, ...incoming };
const lang = incoming.lang || (locales.includes(saved.lang) ? saved.lang : currentLocale());
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
  const empty = Array.isArray(preferences.sheets) && !preferences.sheets.length;
  state = normalizeBook({
    ...defaults,
    ...preferences,
    sheets: empty ? undefined : preferences.sheets,
    lang,
    cover: savedCover,
  });
  if (empty) state.sheets = [];
} catch {
  state = normalizeBook(defaults);
}
state.cover = savedCover === state.cover ? savedCover : "";
const firstButterfly = state.sheets.find(
  (id) => entries.get(id).family === "butterfly",
);
let construction =
  entries.get(firstButterfly)?.construction ||
  (preferences.construction === "w1" ? "w1" : "k1");
let manualOrder =
  fullShare || Boolean(preferences.manualOrder ?? preferences.sheets);
let busy = false;
let dragId;
let activePDF;
let previewVersion = 0;

function copy() {
  return builderCopy[state.lang];
}

function persist() {
  try {
    localStorage.setItem(
      draftKey,
      JSON.stringify({ ...state, construction, manualOrder }),
    );
  } catch {
    /* Private browsing and storage limits must not interrupt editing. */
  }
}

function currentBook() {
  return state.sheets.length ? normalizeBook(state) : null;
}

function picture(image, id, style, small = false) {
  if (!id) {
    image.hidden = true;
    return;
  }
  image.hidden = false;
  const fullSize = artPath(id, style);
  image.src = small ? fullSize.replace("/models/", "/thumbs/") : fullSize;
  image.onerror = () => {
    if (small && !image.src.endsWith(fullSize)) {
      image.src = fullSize;
      return;
    }
    image.onerror = null;
    const { family, model } = entries.get(id);
    image.src = `./assets/${family === "butterfly" ? "atlas" : "planes"}/${model}.svg`;
  };
}

function renderCards() {
  designs.replaceChildren(
    ...modelOrder.map((model) => {
      const label = document.createElement("label");
      label.className = "design";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = model;
      const card = document.createElement("span");
      card.className = "design-card";
      const image = document.createElement("img");
      image.alt = "";
      image.decoding = "async";
      const name = document.createElement("b");
      card.append(image, name);
      label.append(input, card);
      return label;
    }),
  );
}

function namedSheet(id) {
  const name = sheetName(id, state.lang);
  const { family, construction: variant } = entries.get(id);
  if (family !== "butterfly") return name;
  const t = copy();
  return `${name} · ${variant === "k1" ? t.folded : t.tabs} (${variant.toUpperCase()})`;
}

function syncCards() {
  const selected = new Map();
  const variants = new Set();
  for (const id of state.sheets) {
    const entry = entries.get(id);
    const editions = selected.get(entry.model) ?? [];
    editions.push(id);
    selected.set(entry.model, editions);
    if (entry.family === "butterfly") variants.add(entry.construction);
  }
  const mixed = variants.size > 1;
  const [onlyVariant] = variants;
  if (onlyVariant && !mixed) construction = onlyVariant;
  byId("mixed-builds").hidden = !mixed;
  for (const input of document.querySelectorAll('input[name="construction"]')) {
    input.checked = !mixed && input.value === construction;
  }
  const preset =
    !mixed &&
    Object.entries(presets).find(
      ([, items]) =>
        items.length === selected.size && items.every((id) => selected.has(id)),
    )?.[0];
  for (const button of document.querySelectorAll("[data-preset]")) {
    button.setAttribute(
      "aria-pressed",
      String(preset === button.dataset.preset),
    );
  }
  for (const label of designs.children) {
    const input = label.querySelector("input");
    const editions = selected.get(input.value) ?? [];
    const id = editions[0] ?? sheetIdFor(input.value, construction);
    const variants = mixed
      ? editions
          .filter((sheet) => entries.get(sheet).family === "butterfly")
          .map((sheet) => entries.get(sheet).construction.toUpperCase())
      : [];
    input.checked = editions.length > 0;
    label.querySelector("b").textContent = [
      sheetName(id, state.lang),
      variants.join(" + "),
    ]
      .filter(Boolean)
      .join(" · ");
    const image = label.querySelector("img");
    if (image.dataset.sheet !== id) {
      image.dataset.sheet = id;
      picture(image, id, "studio", true);
    }
  }
}

function renderOrder() {
  const t = copy();
  order.replaceChildren(
    ...state.sheets.map((id, index) => {
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
        button.disabled = !state.sheets[index + delta];
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
    }),
  );
}

function renderActions() {
  const t = copy();
  const book = currentBook();
  const invalidPilot = pilotInput.getAttribute("aria-invalid") === "true";
  const disabled = !book || invalidPilot;
  download.disabled = disabled || busy;
  byId("free-download").disabled = disabled || busy;
  peekButton.disabled = disabled;
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

function renderCover() {
  const t = copy();
  cover.dataset.style = state.style;
  cover.dataset.paper = state.paper;
  const title = byId("cover-title");
  title.textContent = state.cover || t.title;
  title.classList.toggle("is-custom", Boolean(state.cover));
  const pilot = byId("cover-pilot");
  pilot.hidden = !state.pilot;
  pilot.textContent = state.pilot ? `${t.pilot}: ${state.pilot}` : "";
  const paper = state.paper === "A4" ? "A4" : t.letter;
  byId("preview-paper").textContent = paper;
  const modelCount = new Set(state.sheets.map((id) => entries.get(id).model))
    .size;
  byId("cover-edition").textContent = bookEdition(
    state.lang,
    modelCount,
    state.paper,
  );
  const [hero, ...rest] = state.sheets;
  picture(byId("cover-hero"), hero, state.style);
  byId("cover-fleet").replaceChildren(
    ...rest.map((id) => {
      const image = document.createElement("img");
      image.alt = "";
      image.decoding = "async";
      picture(image, id, state.style, true);
      return image;
    }),
  );
}

function refresh() {
  renderCover();
  renderActions();
  persist();
  const url = new URL(location.href);
  if (fullShare && currentBook()) {
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
  document.querySelector(".lang").setAttribute("aria-label", t.language);
  document
    .querySelector(".primary-links")
    .setAttribute("aria-label", t.workshop);
  localizedLinks(state.lang);
  for (const locale of locales) {
    const link = byId(locale);
    // An already-shared setup should reopen in the language the reader chooses.
    const url = new URL(link.href);
    if (currentBook()) link.href = bookURL({ ...state, lang: locale }, url);
  }
  const home = homeURL(state.lang);
  byId("home").href = home;
  byId("workshop").href = home;
  for (const id of ["individual", "library"]) byId(id).href = home + "#library";
  byId("classroom").href = `./classroom.html?lang=${state.lang}`;
  for (const item of document.querySelectorAll("[data-book]"))
    item.textContent = t[item.dataset.book];
  if (pilotInput.getAttribute("aria-invalid") === "true")
    byId("pilot-hint").textContent = t.pilotError;
  renderPayments();
  status.textContent = busy ? t.working : "";
  syncCards();
  renderOrder();
  refresh();
}

function applySheets(sheets) {
  state.sheets = sheets;
  syncCards();
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
byId("presets").addEventListener("click", ({ target }) => {
  const items = presets[target.dataset.preset];
  if (!items) return;
  manualOrder = false;
  applySheets(
    modelOrder
      .filter((id) => items.includes(id))
      .map((id) => sheetIdFor(id, construction)),
  );
});
designs.addEventListener("change", ({ target }) => {
  const model = target.value;
  if (!target.checked) {
    applySheets(state.sheets.filter((id) => entries.get(id).model !== model));
    return;
  }
  const next = [...state.sheets, sheetIdFor(model, construction)];
  if (!manualOrder) {
    next.sort(
      (a, b) =>
        modelOrder.indexOf(entries.get(a).model) -
        modelOrder.indexOf(entries.get(b).model),
    );
  }
  applySheets(next);
});
document.addEventListener("change", ({ target }) => {
  const { name, value } = target;
  if (name === "construction") {
    construction = value;
    const models = new Set(state.sheets.map((id) => entries.get(id).model));
    applySheets([...models].map((id) => sheetIdFor(id, construction)));
  }
  if (name === "style" || name === "paper") {
    state[name] = value;
    refresh();
  }
});
pilotInput.maxLength = pilotLimit;
pilotInput.value = state.pilot;
pilotInput.addEventListener("input", () => {
  let invalid = false;
  try {
    state.pilot = normalizeBook({ pilot: pilotInput.value }).pilot;
  } catch {
    invalid = true;
  }
  pilotInput.setAttribute("aria-invalid", String(invalid));
  byId("pilot-hint").textContent = invalid
    ? copy().pilotError
    : copy().pilotHint;
  refresh();
});

function moveSheet(id, to) {
  if (!state.sheets[to]) return;
  const from = state.sheets.indexOf(id);
  if (from < 0 || to === from) return;
  state.sheets.splice(from, 1);
  state.sheets.splice(to, 0, id);
  manualOrder = true;
  renderOrder();
  refresh();
}

order.addEventListener("click", ({ target }) => {
  const { delta, remove } = target.dataset;
  if (remove) {
    const index = state.sheets.indexOf(remove);
    applySheets(state.sheets.filter((id) => id !== remove));
    const row = order.children[Math.min(index, order.children.length - 1)];
    (row?.querySelector("[data-remove]") || byId("order-summary")).focus();
    return;
  }
  if (!delta) return;
  const { id } = target.closest("li").dataset;
  const to = state.sheets.indexOf(id) + Number(delta);
  moveSheet(id, to);
  const row = order.children[to];
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
  moveSheet(dragId, state.sheets.indexOf(target));
  dragId = undefined;
  order.querySelector(".drop-target")?.classList.remove("drop-target");
});
order.addEventListener("dragend", () => {
  dragId = undefined;
  order.querySelector(".drop-target")?.classList.remove("drop-target");
});

async function loadAsset(path) {
  const response = await fetch(new URL(path, import.meta.url));
  if (!response.ok) throw new Error("Unable to load " + path);
  return new Uint8Array(await response.arrayBuffer());
}

function readyPDF(book) {
  const key = JSON.stringify(book);
  if (activePDF?.key === key) return activePDF.promise;
  const promise = Promise.all([
    import("./book-engine.js"),
    import("./assets/planes/vendor/jspdf.js"),
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
  if (!book || busy || pilotInput.getAttribute("aria-invalid") === "true")
    return;
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
  const href = bookURL(state, location.href);
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(href);
      status.textContent = copy().copied;
    } else if (navigator.share) {
      await navigator.share({ title: bookTitle(state.lang), url: href });
    } else {
      window.prompt(copy().copyLink, href);
    }
  } catch (error) {
    if (error.name !== "AbortError") window.prompt(copy().copyLink, href);
  }
});

let previewBook;
function previewOptions(book) {
  const t = copy();
  const plan = bookPlan(book);
  const items = t.keepers.map((label, i) => ({ label, number: i + 1 }));
  for (const entry of plan.entries) {
    for (const { index, number } of entry.pages) {
      const label =
        number === plan.guidePage ? t.foldGuide : namedSheet(entry.id);
      items.push({
        label,
        number,
        path: sheetPath(entry.id, book.paper, book.lang),
        index,
      });
    }
  }
  return items;
}

async function drawPreview() {
  const version = ++previewVersion;
  const item = previewBook.options.find(
    ({ number }) => number === Number(pageSelect.value),
  );
  const canvas = byId("peek-canvas");
  const source = byId("peek-source");
  const message = byId("peek-status");
  canvas.hidden = true;
  source.hidden = true;
  if (item.path) source.href = `./${item.path}#page=${item.index + 1}`;
  message.textContent = copy().working;
  try {
    const doc = await previewBook.doc;
    if (previewVersion !== version) return;
    const page = await doc.getPage(item.number);
    if (previewVersion !== version) return;
    const viewport = page.getViewport({ scale: 1.25 });
    const image = document.createElement("canvas");
    image.width = Math.ceil(viewport.width);
    image.height = Math.ceil(viewport.height);
    await page.render({ canvas: image, viewport }).promise;
    if (previewVersion !== version) return;
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    canvas.setAttribute("aria-label", `${item.number} · ${item.label}`);
    canvas.hidden = false;
    source.hidden = !item.path;
    message.textContent = "";
  } catch {
    if (previewVersion !== version) return;
    source.hidden = !item.path;
    message.textContent = copy().peekError;
  }
}

peekButton.addEventListener("click", () => {
  const book = currentBook();
  if (!book) return;
  const options = previewOptions(book);
  const session = { options };
  const doc = (async () => {
    const [file, pdfjs] = await Promise.all([
      readyPDF(book),
      import("./assets/book/pdf.min.mjs"),
    ]);
    const data = new Uint8Array(await file.arrayBuffer());
    if (!peek.open || previewBook !== session) return null;
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "./assets/book/pdf.worker.min.mjs",
      import.meta.url,
    ).href;
    session.task = pdfjs.getDocument({ data, isEvalSupported: false });
    return session.task.promise;
  })();
  session.doc = doc;
  previewBook = session;
  pageSelect.replaceChildren(
    ...options.map(
      ({ label, number }) => new Option(`${number} · ${label}`, number),
    ),
  );
  pageSelect.value = String(options.find((item) => item.path)?.number || 1);
  peek.showModal();
  drawPreview();
});
pageSelect.addEventListener("change", drawPreview);
peek.addEventListener("close", () => {
  previewVersion++;
  previewBook?.task?.destroy().catch(() => {});
  previewBook = undefined;
});

window.addEventListener("hashchange", () => {
  const settings = readBookURL(location.href);
  if (settings.sheets || settings.pilot !== undefined) location.reload();
});
renderCards();
for (const input of document.querySelectorAll("input[type=radio]")) {
  const value =
    input.name === "construction" ? construction : state[input.name];
  input.checked = input.value === value;
}
renderLocale();
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
