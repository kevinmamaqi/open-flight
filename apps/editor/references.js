import { planeCatalog } from "./assets/planes/catalog.js";
const $ = (id) => document.getElementById(id);
const explicit = new URLSearchParams(location.search).get("lang");
const lang =
  explicit === "en" || explicit === "ru"
    ? explicit
    : sessionStorage.getItem("open-flight-language") === "ru"
      ? "ru"
      : "en";
const ru = lang === "ru";
document.documentElement.lang = lang;
sessionStorage.setItem("open-flight-language", lang);
$("home").href = "./?lang=" + lang;
for (const l of ["en", "ru"]) {
  $(l).href = "?lang=" + l + location.hash;
  $(l).setAttribute("aria-current", String(l === lang));
}
const labels = {
  home: ["Workshop", "Мастерская"],
  over: ["The open library", "Открытая библиотека"],
  heading: ["Field references", "Полевой справочник"],
  intro: [
    "Look at the original butterfly or aircraft, then find the detail that made its way onto the paper.",
    "Рассмотрите настоящую бабочку или самолёт. Найдите деталь, которую можно узнать и в бумажной модели.",
  ],
  btitle: ["The butterflies", "Бабочки"],
  ptitle: ["The aircraft", "Самолёты"],
  ftitle: ["Why a glider flies", "Как летит планер"],
  rtitle: ["The powered workshop", "Планы на моторный полёт"],
  otitle: ["Make it your own", "Сделайте свою версию"],
  "forces-text": [
    "Your hand gives the launch its starting speed. In a glide, air moving around the wings produces lift and drag while gravity pulls the sheet down. Our paths illustrate ideas to test. A real landing depends on your fold, paper and launch.",
    "Рука задаёт начальную скорость. При планировании поток воздуха создаёт подъёмную силу и сопротивление, а сила тяжести тянет лист вниз. Траектории на экране иллюстрируют идеи для опытов. Место посадки зависит от бумаги, сгибов и запуска.",
  ],
  road: [
    "Today you can build and tune seven unpowered gliders. Our next question is which folds stay consistent across builders. Once we have repeatable flights, we want to investigate a removable, adult-led motor module and compare its effect on balance. POWERUP 4.0 is a commercial reference for that research.",
    "Сегодня можно сложить и настроить семь безмоторных планеров. Сначала мы хотим выяснить, какие сгибы дают повторяемый результат у разных людей. Затем планируем вместе со взрослыми исследовать влияние съёмного мотора на баланс. POWERUP 4.0 служит коммерческим примером для этой работы.",
  ],
  licenses: [
    "Open Flight contributors share the software under Apache 2.0, the original paper designs under CERN-OHL-W-2.0, and the original art and lessons under CC BY-SA 4.0. Each field photograph links to its photographer and original publication.",
    "Код Open Flight доступен по Apache 2.0, оригинальные модели — по CERN-OHL-W-2.0, рисунки и учебные материалы — по CC BY-SA 4.0. Для каждой фотографии указаны автор и исходная публикация.",
  ],
  notices: ["Licenses & credits ↗", "Лицензии и авторы ↗"],
};
for (const [id, v] of Object.entries(labels)) $(id).textContent = v[Number(ru)];
document.title = $("heading").textContent + " · Open Flight";
function card(target, title, desc, links) {
  const article = document.createElement("article"),
    heading = document.createElement("h3"),
    body = document.createElement("p");
  heading.textContent = title;
  body.textContent = desc;
  article.append(heading, body);
  for (const [label, href] of links) {
    const p = document.createElement("p"),
      a = document.createElement("a");
    a.href = href;
    a.textContent = label + " ↗";
    p.append(a);
    article.append(p);
  }
  $(target).append(article);
}
for (const p of planeCatalog)
  card("planes", p.inspiration[lang], p.history[lang], [
    [p.reference.label, p.reference.url],
  ]);
const response = await fetch(
  new URL("assets/atlas/species.json", import.meta.url),
);
for (const s of await response.json())
  card(
    "butter",
    s[lang].common_name + " · " + s.scientific_name,
    s[lang].observation,
    [
      [s.photo.creator + " / Pixabay", s.photo.url],
      [s.natural_history.source, s.natural_history.url],
    ],
  );
