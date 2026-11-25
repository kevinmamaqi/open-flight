import { currentLocale, homeURL, localizedLinks } from "./atlas-nav.js?v=8a5cae46106b";

const lang = currentLocale();
const assetVersion = new URL(import.meta.url).search;
document.documentElement.lang = lang;
localizedLinks(lang);
for (const id of ["home", "foot-home"])
  document.getElementById(id).href = homeURL(lang);
for (const id of ["upper", "prairie"]) {
  const link = document.getElementById(id);
  const url = new URL(link.href);
  url.searchParams.set("lang", lang);
  link.href = url;
}

function node(tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  return element;
}

function link(label, href, download = false) {
  const element = node("a", label);
  element.href = href;
  if (download) element.download = "";
  return element;
}

function renderLab(lab) {
  const copy = lab.content[lang];
  document.title = copy.title + " · Open Flight";
  document.querySelector(".motor-hero img").alt = copy.referenceDiagram;
  document.querySelector(".motor-fit-art").alt = copy.artAlt;
  for (const element of document.querySelectorAll("[data-copy]")) {
    element.textContent = copy[element.dataset.copy];
  }
  document
    .getElementById("steps")
    .replaceChildren(...copy.steps.map((step) => node("li", step)));
  for (const [id, group] of [["files", "fit"], ["bench-files", "bench"], ["phone-files", "phone"]]) {
    const files = lab.files.filter(file => file.group === group)
    document.getElementById(id).replaceChildren(...files.map(file =>
      link(file.label[lang], "./" + file.path + assetVersion, !["application/pdf", "text/plain", "text/markdown"].includes(file.mediaType))
    ))
  }
  for (const [id, sources, labels] of [
    [
      "commercial-links",
      ["manual", "current", "early", "manufacturer", "commercialApp"],
      copy.commercialLinks,
    ],
    [
      "upstream-links",
      ["upstream", "upstreamHardware", "upstreamLicense", "nearby"],
      copy.upstreamLinks,
    ],
  ]) {
    document
      .getElementById(id)
      .replaceChildren(
        ...sources.map((source, index) =>
          link(labels[index], lab.links[source]),
        ),
      );
  }
  document.getElementById("bom").replaceChildren(
    ...lab.bom.map((part) => {
      const item = document.createElement("li");
      const spec = node("p", part.spec);
      spec.className = "motor-spec";
      item.append(
        node("span", part.id),
        link(part.part, lab.links[part.link]),
        spec,
        node("p", part.check[lang]),
      );
      return item;
    }),
  );
}
try {
  const data = new URL("./assets/motor/lab.json", import.meta.url);
  data.search = assetVersion;
  const response = await fetch(data);
  if (!response.ok) throw new Error("Motor lab data unavailable");
  renderLab(await response.json());
} catch {
  document.getElementById("load-status").textContent = {
    en: "The lab text could not load. The unpowered fit-check PDFs are available below.",
    es: "No se pudo cargar el texto. Puedes abrir las plantillas sin motor abajo.",
    ru: "Текст лаборатории не загрузился. Выкройки крепления без двигателя доступны ниже.",
  }[lang];
}
