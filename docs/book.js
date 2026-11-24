import { currentLocale, homeURL, localizedLinks } from "./atlas-nav.js?v=4042ad8d9b65";
import { bookSupport } from "./book-support.js?v=4042ad8d9b65";
import { sheetCatalog } from "./family-sheets.js?v=4042ad8d9b65";
import {
  bookCopy,
  coverArt,
  coverLimit,
  createBook,
  defaultSheets,
  edition,
  normalizeBook,
  sheetName,
  themes,
} from "./book-engine.js?v=4042ad8d9b65";

const copy = {
  en: {
    heading: "Make a flight book",
    intro:
      "Pick the wings you want to build together. Give your book a cover, then download one PDF to print at home.",
    preview: "Cover preview",
    setup: "Make it yours",
    titleLabel: "Cover title",
    titleHint:
      "Try “Sunday Flight Club”. Your title stays in this browser tab and in the PDF.",
    titleError:
      "Use up to 64 letters from the Latin or Cyrillic alphabet, numbers or common punctuation.",
    themeLabel: "Cover colour",
    themeNames: ["Blue sky", "Sunset", "Green meadow"],
    paperLabel: "Printer paper",
    letter: "US Letter",
    models: "Choose your models",
    versions:
      "K1 has a folded body. W1 is the classic butterfly. Airplanes fold from a whole sheet.",
    order: "Print order",
    up: "Move up",
    down: "Move down",
    empty: "Choose at least one model.",
    count: (n) => (n === 1 ? "1 model" : `${n} models`),
    takeaway: "Take your book flying",
    printHint:
      "Print one-sided at Actual size (100%). Check the ruler before making a model.",
    free: "Download your book for free. Individual sheets are free too.",
    contribution:
      "Pay what you want. Download for free or chip in to support Open Flight.",
    support: "Choose a contribution",
    download: "Download PDF",
    individual: "Get individual sheets",
    working: "Assembling your book…",
    success: "Your PDF is ready.",
    error:
      "The book could not be prepared. Try again or use the individual sheets.",
    language: "Language",
    enterFull: "Full screen",
    leaveFull: "Exit full screen",
  },
  es: {
    heading: "Crea un libro de vuelo",
    intro:
      "Elige las alas que vais a construir en familia. Diseña la portada y descarga un PDF para imprimir en casa.",
    preview: "Vista previa de la portada",
    setup: "Hazlo tuyo",
    titleLabel: "Título de la portada",
    titleHint:
      "Prueba «Club de vuelo del domingo». El título se queda en esta pestaña y en el PDF.",
    titleError:
      "Usa hasta 64 caracteres del alfabeto latino o cirílico, números o signos de puntuación habituales.",
    themeLabel: "Color de la portada",
    themeNames: ["Cielo azul", "Atardecer", "Pradera verde"],
    paperLabel: "Papel de impresión",
    letter: "Carta",
    models: "Elige tus modelos",
    versions:
      "K1 tiene el cuerpo plegado. W1 es la mariposa clásica. Los aviones se pliegan con una hoja entera.",
    order: "Orden de impresión",
    up: "Subir",
    down: "Bajar",
    empty: "Elige al menos un modelo.",
    count: (n) => (n === 1 ? "1 modelo" : `${n} modelos`),
    takeaway: "Pon tu libro a volar",
    printHint:
      "Imprime por una cara a Tamaño real (100 %). Comprueba la escala con una regla antes de construir.",
    free: "Descarga tu libro gratis. Las hojas individuales también son gratuitas.",
    contribution:
      "Paga lo que quieras. Descarga el libro gratis o haz una aportación para apoyar Open Flight.",
    support: "Elegir una aportación",
    download: "Descargar PDF",
    individual: "Obtener hojas individuales",
    working: "Preparando el libro…",
    success: "Tu PDF está listo.",
    error:
      "No se pudo preparar el libro. Vuelve a intentarlo o usa las hojas individuales.",
    language: "Idioma",
    enterFull: "Pantalla completa",
    leaveFull: "Salir de pantalla completa",
  },
  ru: {
    heading: "Собери книгу полётов",
    intro:
      "Выбери модели, которые вы сделаете вместе. Оформи обложку, скачай PDF и распечатай книгу дома.",
    preview: "Как выглядит обложка",
    setup: "Настрой книгу",
    titleLabel: "Название на обложке",
    titleHint:
      "Например, «Воскресный лётный клуб». Название остаётся в этой вкладке и в PDF.",
    titleError:
      "Введи до 64 символов. Подойдут буквы латиницы или кириллицы, цифры и обычные знаки препинания.",
    themeLabel: "Цвет обложки",
    themeNames: ["Голубое небо", "Закат", "Зелёный луг"],
    paperLabel: "Размер бумаги",
    letter: "US Letter",
    models: "Выбери модели",
    versions:
      "У K1 есть сложенный корпус. W1 — классическая бабочка. Самолёты складываются из целого листа.",
    order: "Порядок печати",
    up: "Переместить выше",
    down: "Переместить ниже",
    empty: "Выбери хотя бы одну модель.",
    count: (n) =>
      `${n} ${n === 1 ? "модель" : n >= 2 && n <= 4 ? "модели" : "моделей"}`,
    takeaway: "Пора в полёт",
    printHint:
      "Печатай с одной стороны в масштабе 100 %. Перед сборкой проверь контрольную шкалу линейкой.",
    free: "Книгу и отдельные листы можно скачать бесплатно.",
    contribution: "Скачай бесплатно или поддержи Open Flight любой суммой.",
    support: "Выбрать сумму взноса",
    download: "Скачать PDF",
    individual: "Скачать отдельные листы",
    working: "Собираем книгу…",
    success: "PDF готов.",
    error:
      "Книгу собрать не удалось. Попробуй ещё раз или скачай отдельные листы.",
    language: "Язык",
    enterFull: "На весь экран",
    leaveFull: "Выйти из полноэкранного режима",
  },
};

const byId = (id) => document.getElementById(id);
const titleInput = byId("cover-input");
const download = byId("download-book");
const status = byId("book-status");
const preview = byId("book-cover");
const fullscreen = byId("fullscreen");
const designs = byId("designs");
const order = byId("order");
const state = {
  lang: currentLocale(),
  paper: "A4",
  theme: "sky",
  sheets: [...defaultSheets],
};
const draftKey = "open-flight-family-book-1";
try {
  const stored = JSON.parse(sessionStorage.getItem(draftKey));
  if (stored) {
    const saved = normalizeBook({ ...stored, lang: state.lang });
    state.paper = saved.paper;
    state.theme = saved.theme;
    state.sheets = saved.sheets;
    titleInput.value = stored.cover ?? "";
    document.querySelector('input[name="paper"][value="' + state.paper + '"]').checked = true;
  }
} catch {}
window.addEventListener("pagehide", () => {
  try {
    sessionStorage.setItem(draftKey, JSON.stringify({ ...state, cover: titleInput.value }));
  } catch {}
});
let busy = false;

function namedModel(id) {
  return [sheetName(id, state.lang), edition(id)].filter(Boolean).join(" · ");
}

function renderOrder() {
  const t = copy[state.lang];
  byId("book-summary").textContent = t.count(state.sheets.length);
  byId("cover-count").textContent = String(state.sheets.length).padStart(
    2,
    "0",
  );
  order.replaceChildren();
  if (!state.sheets.length) {
    const item = document.createElement("li");
    item.textContent = t.empty;
    order.append(item);
  }
  state.sheets.forEach((id, index) => {
    const item = document.createElement("li");
    const model = document.createElement("b");
    model.textContent = namedModel(id);
    item.append(model);
    for (const [delta, mark, label] of [
      [-1, "↑", t.up],
      [1, "↓", t.down],
    ]) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = mark;
      button.setAttribute("aria-label", label + " · " + namedModel(id));
      button.dataset.model = id;
      button.dataset.delta = String(delta);
      button.disabled =
        index + delta < 0 || index + delta >= state.sheets.length;
      item.append(button);
    }
    order.append(item);
  });
}

function updateCover() {
  const t = copy[state.lang];
  let cover = bookCopy[state.lang].title;
  let invalidTitle = false;
  try {
    cover = normalizeBook({
      ...state,
      sheets: defaultSheets,
      cover: titleInput.value,
    }).cover;
  } catch {
    invalidTitle = true;
  }
  titleInput.setAttribute("aria-invalid", String(invalidTitle));
  byId("title-hint").textContent = invalidTitle ? t.titleError : t.titleHint;
  const coverTitle = byId("cover-title");
  coverTitle.textContent = cover;
  coverTitle.classList.toggle("is-long", cover.length > 46);
  byId("cover-subtitle").textContent = bookCopy[state.lang].subtitle;
  byId("cover-edition").textContent = bookCopy[state.lang].edition;
  byId("preview-paper").textContent = state.paper === "A4" ? "A4" : t.letter;
  preview.dataset.art = coverArt(state.sheets);
  preview.dataset.paper = state.paper;
  Object.entries(themes[state.theme]).forEach(([key, value]) =>
    preview.style.setProperty("--cover-" + key, value),
  );
  download.disabled = busy || invalidTitle || !state.sheets.length;
}

function renderFullscreen() {
  const t = copy[state.lang];
  fullscreen.textContent = (document.fullscreenElement || document.body.classList.contains("is-expanded"))
    ? t.leaveFull
    : t.enterFull;
}

function renderLocale() {
  const t = copy[state.lang];
  document.documentElement.lang = state.lang;
  document.title = t.heading + " · Open Flight";
  document.querySelector(".locales").setAttribute("aria-label", t.language);
  localizedLinks(state.lang);
  renderFullscreen();
  byId("home").href = homeURL(state.lang);
  byId("individual").href = homeURL(state.lang) + "#library";
  for (const element of document.querySelectorAll("[data-book]"))
    element.textContent = t[element.dataset.book];
  titleInput.placeholder = bookCopy[state.lang].title;
  const support = bookSupport(state.lang);
  const supportLink = byId("support");
  supportLink.hidden = !support.url;
  if (support.url) {
    supportLink.href = support.url;
    const amount = new Intl.NumberFormat(state.lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(support.suggestedEUR);
    const suggested = { en: "Suggested contribution", es: "Aportación sugerida", ru: "Предлагаемый взнос" }[state.lang];
    supportLink.textContent = t.support;
    byId("support-copy").textContent = t.contribution + " " + suggested + " · " + amount + ".";
  }
  if (busy) status.textContent = t.working;
  else status.textContent = "";
  renderControls();
  renderOrder();
  updateCover();
}

function renderControls() {
  const t = copy[state.lang];
  byId("themes").replaceChildren(
    ...Object.entries(themes).map(([theme, colors], i) => {
      const label = document.createElement("label");
      const button = document.createElement("input");
      const swatch = document.createElement("span");
      button.type = "radio";
      button.name = "theme";
      button.value = theme;
      button.checked = state.theme === theme;
      button.setAttribute("aria-label", t.themeNames[i]);
      label.title = t.themeNames[i];
      swatch.style.setProperty("--swatch", colors.wing);
      swatch.setAttribute("aria-hidden", "true");
      label.append(button, swatch);
      return label;
    }),
  );
  designs.replaceChildren(
    ...sheetCatalog.map(({ id, model, family }) => {
      const label = document.createElement("label");
      label.className = "design";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = id;
      input.checked = state.sheets.includes(id);
      input.setAttribute("aria-label", namedModel(id));
      const card = document.createElement("span");
      const image = document.createElement("img");
      image.alt = "";
      image.loading = "lazy";
      image.src =
        family === "butterfly"
          ? "./assets/atlas/" + model + ".svg"
          : "./assets/planes/" + model + ".svg";
      const name = document.createElement("b");
      name.textContent = sheetName(id, state.lang);
      const version = edition(id);
      if (version) {
        const badge = document.createElement("small");
        badge.textContent = version;
        name.append(badge);
      }
      const check = document.createElement("span");
      check.className = "check";
      check.setAttribute("aria-hidden", "true");
      card.append(image, name, check);
      label.append(input, card);
      return label;
    }),
  );
}

for (const link of document.querySelectorAll(".locales a")) {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    history.replaceState(null, "", link.href);
    state.lang = currentLocale();
    renderLocale();
  });
}
fullscreen.hidden = false;
fullscreen.addEventListener("click", async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else if (!document.body.classList.contains("is-expanded") && document.fullscreenEnabled) {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      document.body.classList.add("is-expanded");
    }
  } else {
    document.body.classList.toggle("is-expanded");
  }
  renderFullscreen();
});
document.addEventListener("fullscreenchange", renderFullscreen);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.body.classList.contains("is-expanded")) {
    document.body.classList.remove("is-expanded");
    renderFullscreen();
    fullscreen.focus();
  }
});
titleInput.maxLength = coverLimit;
titleInput.addEventListener("input", updateCover);
byId("themes").addEventListener("change", (event) => {
  state.theme = event.target.value;
  updateCover();
});
for (const input of document.querySelectorAll('[name="paper"]')) {
  input.addEventListener("change", () => {
    state.paper = input.value;
    updateCover();
  });
}
designs.addEventListener("change", ({ target }) => {
  if (target.checked) state.sheets.push(target.value);
  else state.sheets = state.sheets.filter((id) => id !== target.value);
  renderOrder();
  updateCover();
});
order.addEventListener("click", ({ target }) => {
  if (!target.matches("button")) return;
  const id = target.dataset.model;
  const index = state.sheets.indexOf(id),
    next = index + Number(target.dataset.delta);
  const [moved] = state.sheets.splice(index, 1);
  state.sheets.splice(next, 0, moved);
  renderOrder();
  const buttons = [...order.querySelectorAll("button")].filter(
    (button) => button.dataset.model === id,
  );
  const preferred = buttons.find(
    (button) =>
      button.dataset.delta === target.dataset.delta && !button.disabled,
  );
  const fallback = buttons.find((button) => !button.disabled);
  const focus = preferred ?? fallback;
  focus?.focus();
});

download.addEventListener("click", async () => {
  const book = { ...state, sheets: [...state.sheets], cover: titleInput.value };
  busy = true;
  status.textContent = copy[state.lang].working;
  updateCover();
  try {
    const data = await createBook(book, {
      async loadAsset(path) {
        const response = await fetch(new URL(path, import.meta.url));
        if (!response.ok) throw new Error("Unable to read book asset " + path);
        return new Uint8Array(await response.arrayBuffer());
      },
    });
    const url = URL.createObjectURL(
      new Blob([data], { type: "application/pdf" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download =
      "open-flight-family-book-" +
      book.lang +
      "-" +
      book.paper.toLowerCase() +
      ".pdf";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    status.textContent = copy[state.lang].success;
  } catch (error) {
    console.error(error);
    status.textContent = copy[state.lang].error;
  } finally {
    busy = false;
    updateCover();
    download.focus();
  }
});
renderLocale();
