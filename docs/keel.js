import { foldArtwork, showFoldStep } from './fold-lesson.js?v=8a5cae46106b';
import { currentLocale, homeURL, localizedLinks } from "./atlas-nav.js?v=8a5cae46106b";
import { keelSteps } from "./keel-guide.js?v=8a5cae46106b";
import * as api from "./browser-workshop.js?v=8a5cae46106b";

const copy = {
  skip: [
    "Skip to the worktable",
    "Ir a la mesa de trabajo",
    "К рабочему столу",
  ],
  title: [
    "Fold a butterfly body",
    "Pliega el cuerpo de una mariposa",
    "Сложи корпус бабочки",
  ],
  intro: [
    "Choose your wings and make a folded paper body you can hold. You’ll need one printed sheet, scissors and a paper clip.",
    "Elige tus alas y haz un cuerpo de papel plegado que puedas sujetar. Necesitas una hoja impresa, tijeras y un clip.",
    "Выбери крылья и сложи бумажный корпус, за который удобно держаться. Нужны распечатанный лист, ножницы и скрепка.",
  ],
  previewView: ["Preview", "Vista previa", "Предпросмотр"],
  folded: ["Folded butterfly", "Mariposa plegada", "Сложенная бабочка"],
  flatPattern: ["Flat pattern", "Plantilla plana", "Плоская выкройка"],
  design: [
    "Design your butterfly",
    "Diseña tu mariposa",
    "Настрой свою бабочку",
  ],
  species: ["Butterfly", "Mariposa", "Бабочка"],
  monarch: ["Monarch", "Monarca", "Монарх"],
  morpho: ["Blue morpho", "Morfo azul", "Голубой морфо"],
  swallowtail: ["Swallowtail", "Macaón", "Махаон"],
  span: ["Finished wingspan", "Envergadura final", "Размах сложенных крыльев"],
  flat: ["Flat cutout span", "Ancho de la pieza plana", "Ширина развёртки"],
  keel: [
    "Folded body depth",
    "Altura del cuerpo plegado",
    "Высота сложенного корпуса",
  ],
  mm: ["mm", "mm", "мм"],
  appearance: ["Wing colors", "Colores de las alas", "Окраска крыльев"],
  natural: ["Field colors", "Colores naturales", "Природная окраска"],
  carnival: ["Carnival", "Carnaval", "Карнавал"],
  twilight: ["Twilight", "Crepúsculo", "Сумерки"],
  coloring: ["Color your own", "Colorea tus alas", "Раскрась сам"],
  paper: ["Paper size", "Tamaño de papel", "Формат бумаги"],
  A4: ["A4", "A4", "A4"],
  US_LETTER: ["US Letter", "Carta", "Letter (США)"],
  print: ["Print sheet", "Imprimir hoja", "Печать выкройки"],
  scale: [
    "Print at 100% or actual size. Make sure the scale bar measures 50 mm.",
    "Imprime al 100 % o a tamaño real. Comprueba que la barra mida 50 mm.",
    "Печатай в масштабе 100 %. Проверь, что контрольный отрезок равен 50 мм.",
  ],
  copy: ["Copy link", "Copiar enlace", "Копировать ссылку"],
  share: [
    "Link to this design",
    "Enlace a este diseño",
    "Ссылка на эту модель",
  ],
  copied: ["Link copied.", "Enlace copiado.", "Ссылка скопирована."],
  copyManual: [
    "Select and copy the link below.",
    "Selecciona y copia el enlace.",
    "Выдели и скопируй ссылку.",
  ],
  save: [
    "Save on this device",
    "Guardar en este dispositivo",
    "Сохранить на устройстве",
  ],
  reopen: [
    "Reopen saved design",
    "Abrir diseño guardado",
    "Открыть сохранённую модель",
  ],
  saved: [
    "Design saved on this device.",
    "Diseño guardado en este dispositivo.",
    "Модель сохранена на устройстве.",
  ],
  opened: ["Design reopened.", "Diseño abierto.", "Модель открыта."],
  noSave: [
    "There is no saved design here yet.",
    "Aún no hay un diseño guardado.",
    "На устройстве ещё нет сохранённой модели.",
  ],
  storageFailed: [
    "This browser blocked local storage.",
    "El navegador bloqueó el almacenamiento local.",
    "Браузер заблокировал локальное хранилище.",
  ],
  guide: [
    "Cut, fold and clip",
    "Corta, pliega y sujeta",
    "Вырежи, сложи и закрепи",
  ],
  step: ["Step", "Paso", "Шаг"],
  check: ["Check your build.", "Comprueba tu trabajo.", "Проверь свою работу."],
  prev: ["Previous step", "Paso anterior", "Предыдущий шаг"],
  next: ["Next step", "Paso siguiente", "Следующий шаг"],
  evidence: [
    "Folded-body prototype K1. Paper flight performance is still unverified.",
    "Prototipo K1 de cuerpo plegado. Su vuelo en papel está por comprobar.",
    "Прототип K1 со сложенным корпусом. Полёт бумажной модели ещё предстоит проверить.",
  ],
  original: [
    "Original flat sheet (PDF)",
    "Hoja plana original (PDF)",
    "Исходная плоская выкройка (PDF)",
  ],
  editor: [
    "Edit the original",
    "Editar el original",
    "Настроить исходную модель",
  ],
  source: [
    "Download editable source",
    "Descargar archivo editable",
    "Скачать редактируемый файл",
  ],
  openSource: [
    "Open editable source",
    "Abrir archivo editable",
    "Открыть редактируемый файл",
  ],
  badSource: [
    "Choose a K1 source file from this worktable.",
    "Elige un archivo K1 de esta mesa de trabajo.",
    "Выбери файл K1 из этой мастерской.",
  ],
  failed: [
    "The worktable could not prepare that file. Try again.",
    "No se pudo preparar el archivo. Inténtalo de nuevo.",
    "Не удалось подготовить файл. Попробуй ещё раз.",
  ],
  loading: ["Preparing the sheet…", "Preparando la hoja…", "Готовим выкройку…"],
  compare: [
    "Compare with the original",
    "Compara con el original",
    "Сравни с исходной моделью",
  ],
  match: [
    "Download matching original (PDF)",
    "Descargar original con los mismos ajustes (PDF)",
    "Скачать исходную модель с теми же настройками (PDF)",
  ],
  whyFold: [
    "The two layers under the wings give your fingers the same place to grip each time. The paper stands on edge along the middle. Try both builds to feel how easily that part bends and see what happens on release.",
    "Las dos capas bajo las alas te dan el mismo sitio para sujetar la mariposa cada vez. En el centro, el papel queda de canto. Prueba los dos modelos para sentir cuánto se dobla esa parte y ver qué ocurre al soltarlos.",
    "За два слоя под крыльями можно каждый раз браться в одном и том же месте. Вдоль середины бумага стоит ребром. Попробуй обе модели и сравни, насколько легко сгибается середина и что происходит при запуске.",
  ],
  foldReference: [
    "Read about the folded body",
    "Cómo funciona el cuerpo plegado",
    "Как устроен сложенный корпус",
  ],
  trial: [
    "Use the same builder, paper, clip and release height. Alternate five launches of each design. Mark how easy each is to hold and where it first lands. Start with the original’s rear tabs neutral and the K1 wings level. The builds differ in several ways, so describe what you observe in this pair.",
    "Usa la misma persona, el mismo papel y clip, y la misma altura de suelta. Alterna cinco lanzamientos de cada modelo. Anota qué tan fácil es sujetarlo y dónde toca el suelo por primera vez. Empieza con las pestañas traseras del original en posición neutra y las alas del K1 niveladas. Los modelos difieren en varios aspectos: describe lo que observes en este par.",
    "Пусть один человек соберёт и запустит обе модели с одинаковой высоты, используя одинаковую бумагу и скрепку. Сделай по пять запусков каждой модели, чередуя их. Отмечай, насколько удобно держать каждую и где она впервые коснётся пола. Для начала оставь задние язычки исходной модели в нейтральном положении, а крылья K1 выровняй. У моделей несколько различий, поэтому опиши наблюдения для этой пары.",
  ],
};

const locales = ["en", "es", "ru"];
const lang = currentLocale();
const t = (word) => copy[word][locales.indexOf(lang)];
const get = (id) => document.getElementById(id);
const { minimum, maximum, step: spanStep } = api.foldedSpanSpec;
Object.assign(get("span_mm"), { min: minimum, max: maximum, step: spanStep });
const appearances = ["natural", "carnival", "twilight", "coloring"];
const papers = ["A4", "US_LETTER"];
const steps = keelSteps(lang);
const storageKey = "open-flight-folded-butterfly-k1";
if (location.hash === '#comparison') get('comparison').open=true;
let state = readState(new URLSearchParams(location.search));
let plan;

document.documentElement.lang = lang;
document.title = t("title") + " · Open Flight";
get("home").href = homeURL(lang);
for (const el of document.querySelectorAll("[data-word]"))
  el.textContent = t(el.dataset.word);
for (const [id, choices] of [
  ["species", api.foldedSpecies],
  ["appearance_id", appearances],
  ["paper", papers],
  ["view", ["folded", "flatPattern"]],
]) {
  get(id).replaceChildren(
    ...choices.map((value) => new Option(t(value), value)),
  );
}

function readState(params) {
  const rawSpecies = params.get("species");
  const species = api.foldedSpecies.includes(rawSpecies) ? rawSpecies : "monarch";
  const span = Number(params.get("span_mm"));
  const appearance = params.get("appearance_id");
  const paper = params.get("paper");
  const step = Number(params.get("step"));
  return {
    species,
    view: params.get("view") === "flatPattern" ? "flatPattern" : "folded",
    span_mm:
      api.isFoldedSpan(span) ? span : api.makeFoldedButterfly({ species }).span_mm,
    appearance_id: appearances.includes(appearance) ? appearance : "natural",
    paper: papers.includes(paper) ? paper : "A4",
    step:
      Number.isInteger(step) && step >= 1 && step <= steps.length ? step : 1,
  };
}

function status(word) {
  get("status").textContent = t(word);
}

function syncUrl() {
  const url = new URL(location.href);
  for (const [key, value] of Object.entries({ ...state, lang }))
    url.searchParams.set(key, value);
  history.replaceState(null, "", url.href);
  get("share").value = url.href;
  localizedLinks(lang);
}

function render() {
  plan = undefined;
  syncUrl();
  const { step, view, ...settings } = state;
  get("view").value = view;
  const { species, span_mm, paper } = settings;
  for (const [key, value] of Object.entries(settings)) get(key).value = value;
  const spanLabel = span_mm + " " + t("mm");
  get("span-value").textContent = spanLabel;
  get("span_mm").setAttribute("aria-valuetext", spanLabel);
  const file = [species, paper, lang].join("-") + ".pdf";
  get("original").href = "./library/" + file;
  get("fold-reference").href = "./references.html?lang=" + lang + "#folded-body";
  get("original").download = file;
  get("editor").href =
    "./studio.html?lang=" +
    lang +
    "#design=butterfly-" +
    species +
    "&revision=w1";
  try {
    plan = api.makeFoldedButterfly(settings, lang);
    showFoldStep({
      figure: get("diagram"), progress: get("progress"), title: get("step-title"),
      action: get("action"), check: get("check"), previous: get("prev"), next: get("next"),
    }, {
      index: step - 1, total: plan.steps.length, step: plan.steps[step - 1],
      count: (n, total) => t("step") + " " + n + " / " + total,
      artwork: foldArtwork(api.foldedLessonSvg(plan, step - 1)),
    });

    const isFolded = view === "folded";
    get("preview").setAttribute("aria-label", t(view) + " · " + t(species));
    get("preview").innerHTML = isFolded
      ? api.foldedFinishedPreview(plan)
      : api.foldedPreview(plan);
    get("dimensions").textContent = (
      isFolded
        ? [
            t("span"),
            plan.span_mm,
            t("mm"),
            "·",
            t("keel"),
            plan.keel_depth_mm,
            t("mm"),
          ]
        : [t("flat"), plan.flat_span_mm, t("mm")]
    ).join(" ");
    const sheet = get("print-sheet");
    sheet.style.setProperty(
      "--print-height",
      paper === "A4" ? "297mm" : "11in",
    );
    sheet.replaceChildren(
      ...[api.foldedSvg(plan, true), api.foldedGuideSvg(plan)].map((svg) => {
        const leaf = document.createElement("div");
        leaf.className = "keel-print-page";
        leaf.innerHTML = svg;
        return leaf;
      }),
    );
    get("print-page").textContent =
      "@page { size: " + (paper === "A4" ? "A4" : "letter") + "; margin: 0; }";
  } catch {
    plan = undefined;
    status("failed");
  }
}

get("view").addEventListener("change", ({ target }) => {
  state.view = target.value;
  render();
});
get("species").addEventListener("change", ({ target }) => {
  state.species = target.value;
  state.span_mm = api.makeFoldedButterfly({ species: target.value }).span_mm;
  render();
});
for (const key of ["span_mm", "appearance_id", "paper"]) {
  get(key).addEventListener(
    key === "span_mm" ? "input" : "change",
    ({ target }) => {
      state[key] = key === "span_mm" ? Number(target.value) : target.value;
      render();
    },
  );
}
for (const [id, delta] of [
  ["prev", -1],
  ["next", 1],
]) {
  get(id).addEventListener("click", () => {
    state.step += delta;
    render();
  });
}

function download(data, type, file) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = file;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
for (const [id, method, type, ext] of [
  ["pdf", "foldedPdf", "application/pdf", "pdf"],
  ["matching-original", "classicComparisonPdf", "application/pdf", "pdf"],
  ["svg", "foldedSvg", "image/svg+xml", "svg"],
  ["source", "foldedSource", "application/json", "json"],
]) {
  get(id).addEventListener("click", async () => {
    const button = get(id);
    button.disabled = true;
    try {
      const selection = plan;
      if (!selection) throw new Error();
      if (ext === "pdf") {
        status("loading");
        await api.prepareFoldedPdf();
      }
      const revision = id === "matching-original" ? "w1" : "k1";
      const name = [
        selection.species,
        revision,
        selection.span_mm,
        selection.appearance_id,
        selection.paper,
        lang,
      ].join("-");
      download(api[method](selection), type, name + "." + ext);
      get("status").textContent = "";
    } catch {
      status("failed");
    } finally {
      button.disabled = false;
    }
  });
}
get("print").addEventListener("click", () => {
  if (!plan) return status("failed");
  document.body.classList.add("keel-print");
  window.print();
});
window.addEventListener("beforeprint", () => {
  if (plan) document.body.classList.add("keel-print");
});
window.addEventListener("afterprint", () =>
  document.body.classList.remove("keel-print"),
);

get("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    status("copied");
  } catch {
    get("share-row").hidden = false;
    get("share").focus();
    get("share").select();
    status("copyManual");
  }
});
get("save").addEventListener("click", () => {
  try {
    localStorage.setItem(storageKey, location.search);
    status("saved");
  } catch {
    status("storageFailed");
  }
});
get("reopen").addEventListener("click", () => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return status("noSave");
    const params = new URLSearchParams(saved);
    if (params.get("lang") !== lang && locales.includes(params.get("lang"))) {
      location.search = params.toString();
      return;
    }
    state = readState(params);
    render();
    status("opened");
  } catch {
    status("storageFailed");
  }
});
get("open-source").addEventListener("click", () => get("source-file").click());
get("source-file").addEventListener("change", async ({ target }) => {
  try {
    const file = target.files[0];
    if (!file) return;
    const source = JSON.parse(await file.text());
    if (
      source?.format !== "open-flight-folded-butterfly" ||
      source.revision !== "k1"
    )
      throw new Error();
    const sourceLocale = source.locale ?? lang;
    const params = new URLSearchParams({
      species: source.species,
      span_mm: source.span_mm,
      appearance_id: source.appearance_id,
      paper: source.paper,
      lang: sourceLocale,
    });
    const settings = readState(params);
    const { step, view, ...sourceSettings } = settings;
    for (const [key, value] of Object.entries(sourceSettings)) {
      if (source[key] !== value) throw new Error();
    }
    if (!locales.includes(sourceLocale)) throw new Error();
    api.makeFoldedButterfly(sourceSettings, sourceLocale);
    if (sourceLocale !== lang) {
      location.search = params.toString();
      return;
    }
    state = { ...settings, view: state.view };
    render();
    status("opened");
  } catch {
    status("badSource");
  } finally {
    target.value = "";
  }
});
render();
