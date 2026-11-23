import { ru } from './atlas-copy.js'
const search = new URLSearchParams(location.search);
const fragment = new URLSearchParams(location.hash.slice(1));
// Old launch files and bookmarked revisions still open the appropriate private studio.
if (
  fragment.has("grant") ||
  (fragment.has("design") && fragment.has("revision"))
) {
  location.replace(
    new URL("./studio.html" + location.search + location.hash, import.meta.url),
  );
}
const explicit = search.get("lang") || (location.pathname.endsWith("/ru.html") ? "ru" : null);
const lang = ["en", "ru"].includes(explicit)
  ? explicit
  : sessionStorage.getItem("open-flight-language") === "ru"
    ? "ru"
    : "en";
sessionStorage.setItem("open-flight-language", lang);
document.documentElement.lang = lang;
if (lang === "ru") {
  document.title = "Open Flight · Мастерская бумажных полётов";
  document.querySelector("meta[name=description]").content = ru.intro;
  document.querySelectorAll("[data-t]").forEach((node) => {
    if (ru[node.dataset.t]) node.textContent = ru[node.dataset.t];
  });
}
const $ = (id) => document.getElementById(id);
for (const key of ["en", "ru"]) {
  $(key).setAttribute("aria-current", String(key === lang));
  $(key).href = (key === "ru" ? "./ru.html" : "./?lang=en") + location.hash;
}
const seeds = [
  ["monarch", "Monarch", "Монарх", "Danaus plexippus"],
  ["boeing-747", "Boeing 747", "Боинг 747", "United States", "США"],
  ["morpho", "Blue Morpho", "Голубой морфо", "Morpho peleides"],
  ["tupolev-tu144", "Tupolev Tu-144", "Туполев Ту-144", "Soviet Union", "СССР"],
  ["swallowtail", "Swallowtail", "Махаон", "Papilio machaon"],
  ["douglas-dc3", "Douglas DC-3", "Дуглас DC-3", "United States", "США"],
  ["ilyushin-il62", "Ilyushin Il-62", "Ильюшин Ил-62", "Soviet Union", "СССР"],
];
const isPlane = (row) => row[0].includes("-");
const name = (row) => row[lang === "ru" ? 2 : 1];
const route = (row) =>
  isPlane(row)
    ? "./planes.html?model=" + row[0] + "&lang=" + lang
    : "./studio.html?lang=" +
      lang +
      "#design=butterfly-" +
      row[0] +
      "&revision=w1";
document.querySelector("[data-route=butterfly]").href = route(seeds[0]);
document.querySelectorAll("[data-route]").forEach((a) => {
  a.href = route(seeds[a.dataset.route === "airplane" ? 1 : 0]);
});
const option = $("download-model");
for (const seed of [...seeds].sort(
  (a, b) => Number(isPlane(a)) - Number(isPlane(b)),
)) {
  const link = document.createElement("a");
  link.href = route(seed);
  link.textContent = name(seed);
  $(isPlane(seed) ? "plane-links" : "butter-links").append(link);
  option.add(new Option(name(seed), seed[0]));
}
let selected = 0;
function display() {
  const row = seeds[selected],
    plane = isPlane(row);
  const asset = "./assets/" + (plane ? "planes/" : "atlas/") + row[0] + ".svg";
  $("specimen").src = asset;
  $("specimen").alt =
    (lang === "ru" ? "Открыть модель " : "Open design ") + name(row);
  $("hero-link").href = route(row);
  $("specimen-name").href = route(row);
  $("specimen-name").replaceChildren(document.createTextNode(name(row) + " "));
  const arrow = document.createElement("span");
  arrow.textContent = "↗";
  arrow.setAttribute("aria-hidden", "true");
  $("specimen-name").append(arrow);
  $("specimen-family").textContent = plane
    ? lang === "ru"
      ? "Бумажный самолёт"
      : "Whole-sheet airplane"
    : lang === "ru"
      ? "Планер-бабочка"
      : "Butterfly glider";
  $("specimen-detail").textContent = row[lang === "ru" && plane ? 4 : 3];
  $("specimen-count").textContent =
    String(selected + 1).padStart(2, "0") + " / 07";
  document.querySelector(".showcase").dataset.family = plane
    ? "airplane"
    : "butterfly";
}
for (const [id, delta, en, russian] of [
  ["back", -1, "Previous design", "Предыдущая модель"],
  ["next", 1, "Next design", "Следующая модель"],
]) {
  $(id).setAttribute("aria-label", lang === "ru" ? russian : en);
  $(id).onclick = () => {
    selected = (selected + delta + seeds.length) % seeds.length;
    display();
  };
}
display();
function download() {
  const id = option.value;
  const url =
    "./library/" + id + "-" + $("download-paper").value + "-" + lang + ".pdf";
  $("download").href = url;
  $("download").download = url.split("/").pop();
}
option.onchange = download;
$("download-paper").onchange = download;
download();
$("references").href = "./references.html?lang=" + lang;
$("roadmap-link").href = "./references.html?lang=" + lang + "#powered";
$("lesson-file").href = "./library/family-lesson-" + lang + ".html";
async function learning() {
  const response = await fetch(
    new URL("assets/atlas/learning.json", import.meta.url),
  );
  if (!response.ok) return;
  const copy = (await response.json())[lang],
    nodes = $("learning-notes").children;
  copy.families.forEach((entry, i) => {
    nodes[i].querySelector("h3").textContent = entry.label;
    nodes[i].querySelector("p").textContent = entry.prompt;
  });
}
learning().catch(() => {});
