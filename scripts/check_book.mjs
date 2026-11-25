import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";

const base = new URL(process.argv[2] ?? "http://127.0.0.1:8000/");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || process.env.OPENFLIGHT_CHROME || undefined,
});
const bookURL = (query = "") => new URL(`book.html${query}`, base);
const starter = ["monarch-k1", "boeing-747", "morpho-k1"];
const readOrder = (page) =>
  page
    .locator("#order li")
    .evaluateAll((rows) => rows.map((row) => row.dataset.id));
const coverImage = (page) =>
  page.locator("#cover-canvas").evaluate((node) => node.toDataURL());
const pageSurface = (page, n) => page.locator(`#book-page-${n}`);
const visibleCanvas = (page, n) =>
  pageSurface(page, n).locator("canvas:visible");

async function download(page) {
  const event = page.waitForEvent("download");
  await page.locator("#download-book").click();
  const file = await event;
  return {
    filename: file.suggestedFilename(),
    bytes: await readFile(await file.path()),
  };
}

async function shareSetup(page, message) {
  await page.locator("#share-link").click();
  await page.waitForFunction(
    (status) => document.querySelector("#book-status").textContent === status,
    message,
  );
  return new URL(await page.evaluate(() => navigator.clipboard.readText()));
}

async function openOrder(page) {
  for (const name of [".settings", ".advanced", ".order-panel"]) {
    const details = page.locator(name);
    if ((await details.getAttribute("open")) === null)
      await details.locator(":scope > summary").click();
  }
}

try {
  const context = await browser.newContext({
    locale: "es-MX",
    viewport: { width: 320, height: 740 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const externalRequests = [];
  await context.route("**/*", (route) => {
    if (new URL(route.request().url()).origin === base.origin)
      return route.continue();
    externalRequests.push(route.request().url());
    return route.abort();
  });
  await context.addInitScript(() => {
    const canShare = new URLSearchParams(location.search).has("share-fixture");
    Object.defineProperty(navigator, "canShare", { value: () => canShare });
    Object.defineProperty(navigator, "share", {
      value: async ({ files }) => {
        if (!files?.length) throw new Error("Expected a PDF file");
        document.body.dataset.sharedFile = files[0].name;
      },
    });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  let releaseEngine;
  const starterCoverGate = new Promise((resolve) => {
    releaseEngine = resolve;
  });
  await page.route(
    "**/book-engine.js*",
    async (route) => {
      await starterCoverGate;
      await route.continue();
    },
    { times: 1 },
  );
  const response = await page.goto(bookURL("?lang=es#pilot=Luc%C3%ADa").href, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(response.status(), 200);
  await page.waitForFunction(() => document.documentElement.lang === "es");
  assert.equal(await page.locator("h1").textContent(), "Libro de vuelo");
  assert.equal(await page.locator("#designs [data-edit]").count(), 7);
  assert.equal(await page.locator("[data-preset]").count(), 0);
  assert.equal(await page.locator("#pilot-input").inputValue(), "Lucía");
  assert.match(
    await page.locator("#book-summary").textContent(),
    /^32 páginas · 32 hojas$/,
  );
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-paper"),
    "US_LETTER",
  );
  assert.match(
    await page.locator("#book-size").textContent(),
    /^~[\d.,]+\s*(MB|kB|KB)$/i,
  );
  assert.equal(await page.locator("#support-choices").isVisible(), false);
  assert.equal(await page.locator("#free-download").isVisible(), false);
  assert.equal(await page.locator("#share-pdf").isVisible(), false);
  assert.ok((await page.locator("#download-book").boundingBox()).y < 700);
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth),
    320,
  );
  const poster = page.locator("#cover-poster");
  await poster.evaluate((image) => image.decode());
  assert.match(await poster.getAttribute("src"), /book-cover-es\.png$/);
  assert.ok((await poster.boundingBox()).width >= 260);
  assert.equal(await page.locator("#cover-canvas").isVisible(), false);
  releaseEngine();
  await page
    .locator("#cover-canvas")
    .waitFor({ state: "visible", timeout: 40_000 });
  assert.equal(await poster.isVisible(), false);
  assert.equal(await page.locator("#reader-stack figure").count(), 31);
  assert.equal(await visibleCanvas(page, 30).count(), 0);
  if (process.env.BOOK_MOBILE_SCREENSHOT)
    await page.screenshot({ path: process.env.BOOK_MOBILE_SCREENSHOT });

  await page.locator("#reader-select").selectOption("6");
  await visibleCanvas(page, 6).waitFor({ state: "visible" });
  assert.equal(new URL(page.url()).searchParams.get("p"), "6");
  assert.match(
    await pageSurface(page, 6).locator('a[href^="blob:"]').getAttribute("href"),
    /#page=6$/,
  );
  assert.match(
    await pageSurface(page, 6)
      .locator('a[href^="./library"]')
      .getAttribute("href"),
    /monarch-k1-US_LETTER-es\.pdf(?:\?v=[0-9a-f]+)?#page=1$/,
  );
  await pageSurface(page, 7).evaluate((figure) => figure.scrollIntoView());
  await page.waitForFunction(
    () => document.querySelector("#reader-select").value === "7",
  );
  await visibleCanvas(page, 7).waitFor({ state: "visible" });

  await page.locator('.intro a[href="#customize"]').click();
  assert.equal(
    await page
      .locator("#designs [data-edit][aria-pressed=true]")
      .getAttribute("data-edit"),
    "monarch",
  );
  assert.ok(await page.locator("#construction").isVisible());
  assert.equal(await page.locator("#construction .fold-options img").count(), 3);
  assert.equal(await page.locator("#edge-choice .fold-options img").count(), 2);
  assert.match(
    await page.locator("#tabs-hint").textContent(),
    /pestañas traseras/,
  );
  const originalOrder = await readOrder(page);
  await page.locator(".history-panel > summary").click();
  await page
    .locator('#model-map button[data-story="boeing-747"]:visible')
    .first()
    .click();
  assert.equal(
    await page
      .locator('#designs [aria-pressed="true"]')
      .getAttribute("data-edit"),
    "boeing-747",
  );
  assert.equal(await page.locator("#construction").isVisible(), false);
  await page.locator('[data-edit="morpho"]').click();
  assert.deepEqual(await readOrder(page), originalOrder);
  assert.equal(
    await page.locator('[data-edit="morpho"]').getAttribute("aria-pressed"),
    "true",
  );
  assert.ok(
    await page
      .locator('#model-map button[data-story="morpho"][aria-pressed="true"]')
      .count(),
  );
  await page.locator(".history-panel > summary").click();

  await page.locator("#cover-model").click();
  assert.deepEqual(await readOrder(page), originalOrder);
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-model"),
    "morpho-k1",
  );
  await page.locator("#include-model").click();
  assert.ok(!(await readOrder(page)).includes("morpho-k1"));
  assert.equal(await page.locator("#cover-model").isDisabled(), true);
  await page.locator("#include-model").click();
  assert.deepEqual(await readOrder(page), originalOrder);
  await page.locator("#cover-model").click();

  await page.locator('.intro a[href="#reader"]').click();
  await page.locator('#book-cover[aria-busy="false"]').waitFor();
  const oldCanvas = await coverImage(page);
  const pattern = page
    .locator('.reader-page:has(a[href^="./library/morpho-k1-"])')
    .first();
  const patternCanvas = pattern.locator("canvas");
  const patternImage = () => patternCanvas.evaluate((node) => node.toDataURL());
  await pattern.evaluate((figure) => figure.scrollIntoView());
  await patternCanvas.waitFor({ state: "visible" });
  const oldPattern = await patternImage();
  const oldArt = await page.locator("#flyer-image").getAttribute("src");
  await page.locator('[data-appearance="carnival"]').click();
  await page.locator("#flyer-image").evaluate((image) => image.decode());
  assert.notEqual(
    await page.locator("#flyer-image").getAttribute("src"),
    oldArt,
  );
  assert.match(
    await page.locator("#flyer-image").getAttribute("src"),
    /morpho-k1-carnival-studio\.jpg$/,
  );
  await page.locator('.intro a[href="#reader"]').click();
  await page.locator('#book-cover[aria-busy="false"]').waitFor();
  await page.waitForFunction(
    (old) => document.querySelector("#cover-canvas").toDataURL() !== old,
    oldCanvas,
  );

  await pattern.evaluate((figure) => figure.scrollIntoView());
  await patternCanvas.waitFor({ state: "visible" });
  assert.notEqual(await patternImage(), oldPattern);
  await page.locator(".settings > summary").click();
  await page.locator("#pilot-input").fill("🐛");
  assert.equal(await page.locator("#download-book").isDisabled(), true);
  await page.locator("#pilot-input").fill("Patrulla del aire");
  await page.locator("#title-input").fill("Alas de fin de semana");
  await page.locator("#ru").click();
  assert.equal(await page.locator("html").getAttribute("lang"), "ru");
  assert.equal(await page.locator("h1").textContent(), "Книга полётов");
  assert.equal(
    await page.locator("#cover-title").textContent(),
    "Alas de fin de semana",
  );
  assert.equal(
    await page.locator("#cover-pilot").textContent(),
    "Patrulla del aire",
  );
  const url = await shareSetup(page, "Ссылка скопирована.");
  assert.equal(url.searchParams.has("pilot"), false);
  const saved = new URLSearchParams(url.hash.slice(1));
  assert.equal(saved.get("pilot"), "Patrulla del aire");
  assert.equal(saved.get("hero"), "morpho-k1");
  assert.ok(saved.get("a")?.includes("carnival"));

  const output = await download(page);
  assert.equal(output.filename, "flight-book-patrulla-del-aire-letter.pdf");
  const printed = await PDFDocument.load(output.bytes);
  assert.equal(printed.getTitle(), "Alas de fin de semana");
  assert.equal(printed.getPage(0).getWidth(), 612);
  assert.equal(printed.getPageCount(), 32);

  await page.goto(bookURL().href);
  assert.equal(await page.locator("h1").textContent(), "Книга полётов");
  assert.equal(
    await page.locator("#title-input").inputValue(),
    "Alas de fin de semana",
  );
  assert.equal(
    await page.locator("#pilot-input").inputValue(),
    "Patrulla del aire",
  );
  await page.setViewportSize({ width: 1440, height: 960 });
  url.searchParams.set("p", "9");
  await page.goto(url.href);
  await visibleCanvas(page, 9).waitFor({ state: "visible" });
  assert.equal(await page.locator("#reader-select").inputValue(), "9");
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-model"),
    "morpho-k1",
  );
  assert.equal(
    await page
      .locator('[data-appearance="carnival"]')
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.locator('.intro a[href="#reader"]').click();
  await page.locator("#cover-canvas").waitFor({ state: "visible" });
  assert.ok((await page.locator("#book-cover").boundingBox()).width >= 680);
  await page.locator("#wide-reading").click();
  assert.equal(await page.locator("#customize").isVisible(), false);
  assert.ok((await page.locator("#book-cover").boundingBox()).width >= 950);
  await page.locator("#wide-reading").click();
  assert.equal(await page.locator("#customize").isVisible(), true);
  if (process.env.BOOK_SCREENSHOT) {
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: process.env.BOOK_SCREENSHOT });
  }

  const classroom = bookURL("?lang=en&share-fixture=1");
  classroom.hash = new URLSearchParams({
    m: starter.join(","),
    paper: "letter",
  }).toString();
  await page.goto(classroom.href);
  assert.deepEqual(await readOrder(page), starter);
  assert.match(
    await page.locator("#book-summary").textContent(),
    /^15 pages · 15 sheets$/,
  );
  await page.locator("#share-pdf").click();
  await page.waitForFunction(() =>
    document
      .querySelector("#book-status")
      .textContent.includes("Tap Share PDF"),
  );
  await page.locator("#share-pdf").click();
  await page.waitForFunction(() =>
    document.body.dataset.sharedFile?.endsWith("-letter.pdf"),
  );
  assert.equal(await page.locator("#download-book").isEnabled(), true);

  const mixedSheets = [
    "monarch-k1",
    "boeing-747",
    "monarch",
    "morpho",
    "swallowtail-k1",
  ];
  const mixed = {
    lang: "en",
    sheets: mixedSheets,
    paper: "A4",
    style: "illustrated",
    pilot: "Lena",
    cover: "Weekend Wings",
  };
  const mixedURL = bookURL("?lang=en");
  mixedURL.hash = new URLSearchParams({
    m: mixed.sheets.join(","),
    paper: "a4",
    style: mixed.style,
    pilot: mixed.pilot,
    title: mixed.cover,
  }).toString();
  await page.goto(mixedURL.href);
  await page.locator("#mixed-builds").waitFor({ state: "visible" });
  assert.deepEqual(await readOrder(page), mixedSheets);
  assert.equal(
    await page.locator('input[name="construction"]:checked').count(),
    0,
  );
  const expectedHash = await page.evaluate(async (options) => {
    const [{ createBook }] = await Promise.all([
      import("./book-engine.js"),
      import("./assets/planes/vendor/jspdf.js"),
    ]);
    const data = await createBook(options, {
      async loadAsset(path) {
        const response = await fetch(new URL(path, location.href));
        return new Uint8Array(await response.arrayBuffer());
      },
    });
    const hash = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(hash)]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("");
  }, mixed);
  const matches = async (target) =>
    assert.equal(
      createHash("sha256")
        .update((await download(target)).bytes)
        .digest("hex"),
      expectedHash,
    );
  await matches(page);
  await page.locator("#ru").click();
  assert.deepEqual(await readOrder(page), mixedSheets);
  await page.locator("#en").click();
  const mixedShare = await shareSetup(page, "Link copied.");
  assert.deepEqual(
    new URLSearchParams(mixedShare.hash.slice(1)).get("m").split(","),
    mixedSheets,
  );
  await page.close();

  const reopened = await context.newPage();
  reopened.on("pageerror", (error) => errors.push(error.message));
  await reopened.goto(bookURL("?lang=en").href);
  await reopened.locator("#mixed-builds").waitFor({ state: "visible" });
  assert.deepEqual(await readOrder(reopened), mixedSheets);
  await matches(reopened);
  await reopened.goto(mixedShare.href);
  await reopened.locator("#mixed-builds").waitFor({ state: "visible" });
  assert.deepEqual(await readOrder(reopened), mixedSheets);
  await matches(reopened);
  await openOrder(reopened);
  assert.match(
    await reopened.locator("#order li[data-id='monarch-k1'] b").textContent(),
    /Monarch · Pinched spine \(K1\)/,
  );
  assert.match(
    await reopened.locator("#order li[data-id='monarch'] b").textContent(),
    /Monarch · Rear wing tabs \(W1\)/,
  );
  await reopened
    .locator("#order li[data-id='monarch'] button[data-delta='-1']")
    .press("Enter");
  assert.deepEqual(await readOrder(reopened), [
    "monarch-k1",
    "monarch",
    "boeing-747",
    "morpho",
    "swallowtail-k1",
  ]);
  await reopened
    .getByRole("button", {
      name: "Remove sheet · Monarch · Rear wing tabs (W1)",
    })
    .press("Enter");
  assert.deepEqual(await readOrder(reopened), [
    "monarch-k1",
    "boeing-747",
    "morpho",
    "swallowtail-k1",
  ]);
  assert.equal(await reopened.locator("#mixed-builds").isVisible(), true);
  await reopened
    .locator('label:has(input[name="construction"][value="w1"])')
    .click();
  assert.deepEqual(await readOrder(reopened), [
    "monarch",
    "boeing-747",
    "morpho",
    "swallowtail-k1",
  ]);
  assert.equal(
    await reopened.locator("#book-cover").getAttribute("data-model"),
    "monarch",
  );
  await reopened.locator('label:has(input[name="style"][value="ink"])').click();
  assert.equal(
    await reopened.locator("#book-cover").getAttribute("data-style"),
    "ink",
  );
  assert.equal(
    await reopened.locator("#swatches button").first().isEnabled(),
    true,
  );

  const fromStudio = bookURL(
    "?lang=es&paper=letter#flyer=morpho-k1&paint=twilight",
  );
  await reopened.goto(fromStudio.href);
  assert.equal(
    await reopened.locator("#cover-title").textContent(),
    "Weekend Wings",
  );
  assert.ok((await readOrder(reopened)).includes("morpho-k1"));
  assert.equal(
    await reopened
      .locator('#designs [aria-pressed="true"]')
      .getAttribute("data-edit"),
    "morpho",
  );
  assert.equal(
    await reopened
      .locator('[data-appearance="twilight"]')
      .getAttribute("aria-pressed"),
    "true",
  );
  const studio = new URL(
    await reopened.locator("#flyer-studio").getAttribute("href"),
    reopened.url(),
  );
  assert.equal(studio.searchParams.get("construction"), "k1");
  assert.equal(studio.searchParams.get("species"), "morpho");
  assert.equal(studio.searchParams.get("appearance_id"), "twilight");

  const legacy = await browser.newContext({ locale: "en-GB" });
  await legacy.addInitScript((sheets) => {
    sessionStorage.setItem(
      "open-flight-family-book-1",
      JSON.stringify({
        cover: "Weekend Wings",
        theme: "sunset",
        paper: "US_LETTER",
        sheets,
      }),
    );
  }, mixedSheets);
  const old = await legacy.newPage();
  await old.goto(bookURL("?lang=en").href);
  await old.waitForFunction(
    () =>
      document.querySelector("#cover-title").textContent === "Weekend Wings",
  );
  assert.deepEqual(await readOrder(old), mixedSheets);
  assert.equal(
    await old.locator("#book-cover").getAttribute("data-paper"),
    "US_LETTER",
  );
  assert.deepEqual(externalRequests, []);
  assert.deepEqual(errors, []);
  console.log(
    "Flight Book at 320 px and desktop renders real printable pages, updates cover and color, shares PDF and links, and preserves old drafts and mixed sheets.",
  );
} finally {
  await browser.close();
}
