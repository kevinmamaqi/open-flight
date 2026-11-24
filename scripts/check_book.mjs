import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";

const base = new URL(process.argv[2] ?? "http://127.0.0.1:8000/");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || process.env.OPENFLIGHT_CHROME || undefined,
});
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
    const shouldAllow = new URLSearchParams(location.search).has(
      "share-fixture",
    );
    Object.defineProperty(navigator, "canShare", { value: () => shouldAllow });
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
  const response = await page.goto(
    new URL("book.html?lang=es#pilot=Luc%C3%ADa", base).href,
  );
  assert.equal(response.status(), 200);
  await page.waitForFunction(() => document.documentElement.lang === "es");
  assert.equal(await page.locator("h1").textContent(), "Libro de vuelo");
  assert.equal(await page.locator("#designs input:checked").count(), 7);
  assert.equal(await page.locator("#pilot-input").inputValue(), "Lucía");
  assert.match(
    await page.locator("#book-summary").textContent(),
    /^25 páginas · 25 hojas$/,
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
  await page.locator("#pilot-input").fill("🐛");
  assert.equal(await page.locator("#download-book").isDisabled(), true);
  await page.locator("#pilot-input").fill("Patrulla del aire");

  for (const [preset, size] of [
    ["butterflies", 3],
    ["planes", 4],
    ["all", 7],
    ["starter", 3],
  ]) {
    await page.locator(`[data-preset="${preset}"]`).click();
    assert.equal(await page.locator("#designs input:checked").count(), size);
  }
  assert.equal(await page.locator(".order-panel").getAttribute("open"), null);
  await page.locator(".order-panel summary").click();
  const prior = await page
    .locator("#order li")
    .evaluateAll((items) => items.map((i) => i.dataset.id));
  await page
    .locator("#order li")
    .nth(1)
    .locator('button[data-delta="-1"]')
    .press("Enter");
  assert.equal(
    await page.locator("#order li").first().getAttribute("data-id"),
    prior[1],
  );
  await page
    .locator("#order li")
    .first()
    .locator(".order-item")
    .dragTo(page.locator("#order li").nth(2).locator(".order-item"));
  assert.equal(
    await page.locator("#order li").nth(2).getAttribute("data-id"),
    prior[1],
  );
  await page
    .locator('label:has(input[name="construction"][value="w1"])')
    .click();
  assert.equal(await page.locator("#order li[data-id='monarch']").count(), 1);
  assert.equal(await page.locator("#designs input").count(), 7);
  await page.locator('label:has(input[name="style"][value="ink"])').click();
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-style"),
    "ink",
  );

  await page.locator("#ru").click();
  assert.equal(await page.locator("html").getAttribute("lang"), "ru");
  assert.equal(await page.locator("h1").textContent(), "Книга полётов");
  assert.match(
    await page.locator("#cover-pilot").textContent(),
    /Patrulla del aire/,
  );
  await page.locator("#share-link").click();
  await page.waitForFunction(
    () =>
      document.querySelector("#book-status").textContent ===
      "Ссылка скопирована.",
  );
  const url = new URL(
    await page.evaluate(() => navigator.clipboard.readText()),
  );
  assert.equal(url.searchParams.has("pilot"), false);
  assert.equal(
    new URLSearchParams(url.hash.slice(1)).get("pilot"),
    "Patrulla del aire",
  );

  await page.goto(new URL("book.html", base).href);
  assert.equal(await page.locator("h1").textContent(), "Книга полётов");
  assert.equal(
    await page.locator("#pilot-input").inputValue(),
    "Patrulla del aire",
  );
  assert.equal(await page.locator("#designs input:checked").count(), 3);
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-style"),
    "ink",
  );
  await page.locator('[data-preset="all"]').click();
  await page.goto(url.href);
  await page.waitForFunction(
    () => document.querySelectorAll("#designs input:checked").length === 3,
  );

  await page.locator("#peek-page").click();
  await page
    .locator("#peek-canvas")
    .waitFor({ state: "visible", timeout: 40_000 });
  assert.ok(Number(await page.locator("#preview-select").inputValue()) > 5);
  assert.match(
    await page.locator("#peek-source").getAttribute("href"),
    /library\/.+\.pdf#page=1$/,
  );
  await page.locator("#preview-select").selectOption("4");
  await page.waitForFunction(() =>
    document
      .querySelector("#peek-canvas")
      .getAttribute("aria-label")
      ?.startsWith("4 · "),
  );
  assert.equal(await page.locator("#peek-source").isVisible(), false);
  await page.locator("#peek-dialog form button").click();

  const expected = Number(
    (await page.locator("#book-summary").textContent()).match(/^\d+/)[0],
  );
  const downloadEvent = page.waitForEvent("download");
  await page.locator("#download-book").click();
  const download = await downloadEvent;
  assert.equal(
    download.suggestedFilename(),
    "flight-book-patrulla-del-aire-letter.pdf",
  );
  const content = await PDFDocument.load(await readFile(await download.path()));
  assert.equal(content.getTitle(), "Книга полётов");
  assert.equal(content.getPage(0).getWidth(), 612);
  assert.equal(content.getPageCount(), expected);

  await page.goto(new URL("book.html?lang=en", base).href);
  assert.equal(await page.locator("h1").textContent(), "Flight Book");
  if (process.env.BOOK_MOBILE_SCREENSHOT) {
    await page.screenshot({ path: process.env.BOOK_MOBILE_SCREENSHOT });
  }
  await page.setViewportSize({ width: 1440, height: 960 });
  assert.equal(
    await page
      .locator(".stage")
      .evaluate((node) => getComputedStyle(node).position),
    "sticky",
  );
  await page.locator('[data-preset="all"]').click();
  await page
    .locator('label:has(input[name="construction"][value="k1"])')
    .click();
  await page.locator('label:has(input[name="style"][value="studio"])').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  if (process.env.BOOK_SCREENSHOT) {
    await page.locator("#cover-hero").evaluate((image) => image.decode());
    await page.screenshot({ path: process.env.BOOK_SCREENSHOT });
  }

  await page.goto(new URL("book.html?lang=en&share-fixture=1", base).href);
  await page.locator('[data-preset="starter"]').click();
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

  // A book from HTTP or a printed QR can intentionally contain both editions
  // of a butterfly. The seven-card picker must preserve the exact PDF setup.
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
  const mixedURL = new URL("book.html?lang=en", base);
  mixedURL.hash = new URLSearchParams({
    m: mixed.sheets.join(","),
    paper: "a4",
    style: mixed.style,
    pilot: mixed.pilot,
    title: mixed.cover,
  }).toString();
  await page.goto(mixedURL.href);
  await page.locator("#mixed-builds").waitFor({ state: "visible" });
  const readOrder = (target) =>
    target
      .locator("#order li")
      .evaluateAll((items) => items.map((item) => item.dataset.id));
  assert.deepEqual(await readOrder(page), mixedSheets);
  assert.equal(await page.locator("#designs input").count(), 7);
  assert.equal(await page.locator("#designs input:checked").count(), 4);
  assert.equal(
    await page.locator('input[name="construction"]:checked').count(),
    0,
  );

  const expectedMixedBytes = Buffer.from(
    await page.evaluate(async (options) => {
      const [{ createBook }] = await Promise.all([
        import("./book-engine.js"),
        import("./assets/planes/vendor/jspdf.js"),
      ]);
      return Array.from(
        await createBook(options, {
          async loadAsset(path) {
            const response = await fetch(new URL(path, location.href));
            return new Uint8Array(await response.arrayBuffer());
          },
        }),
      );
    }, mixed),
  );
  async function downloadedBytes(target) {
    const wait = target.waitForEvent("download");
    await target.locator("#download-book").click();
    return readFile(await (await wait).path());
  }
  assert.deepEqual(await downloadedBytes(page), expectedMixedBytes);
  await page.locator("#ru").click();
  assert.deepEqual(await readOrder(page), mixedSheets);
  await page.locator("#en").click();
  await page.locator("#pilot-input").fill("Lena 2");
  assert.deepEqual(await readOrder(page), mixedSheets);
  await page.locator("#pilot-input").fill(mixed.pilot);
  await page.locator("#share-link").click();
  await page.waitForFunction(
    () => document.querySelector("#book-status").textContent === "Link copied.",
  );
  const mixedShare = await page.evaluate(() => navigator.clipboard.readText());
  assert.deepEqual(
    new URLSearchParams(new URL(mixedShare).hash.slice(1)).get("m").split(","),
    mixedSheets,
  );
  await page.close();

  const reopened = await context.newPage();
  reopened.on("pageerror", (error) => errors.push(error.message));
  await reopened.goto(new URL("book.html?lang=en", base).href);
  await reopened.locator("#mixed-builds").waitFor({ state: "visible" });
  assert.deepEqual(await readOrder(reopened), mixedSheets);
  assert.deepEqual(await downloadedBytes(reopened), expectedMixedBytes);
  await reopened.goto(mixedShare);
  await reopened.locator("#mixed-builds").waitFor({ state: "visible" });
  assert.deepEqual(await readOrder(reopened), mixedSheets);
  assert.deepEqual(await downloadedBytes(reopened), expectedMixedBytes);

  await reopened.locator(".order-panel summary").click();
  assert.match(
    await reopened.locator("#order li[data-id='monarch-k1'] b").textContent(),
    /Monarch · Folded body \(K1\)/,
  );
  assert.match(
    await reopened.locator("#order li[data-id='monarch'] b").textContent(),
    /Monarch · Tabs \(W1\)/,
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
    .getByRole("button", { name: "Remove sheet · Monarch · Tabs (W1)" })
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
    "swallowtail",
  ]);
  assert.equal(await reopened.locator("#mixed-builds").isVisible(), false);

  const legacy = await browser.newContext({ locale: "en-GB" });
  await legacy.addInitScript((mixedSheets) => {
    sessionStorage.setItem(
      "open-flight-family-book-1",
      JSON.stringify({
        cover: "Weekend Wings",
        theme: "sunset",
        paper: "US_LETTER",
        sheets: mixedSheets,
      }),
    );
  }, mixedSheets);
  const old = await legacy.newPage();
  await old.goto(new URL("book.html?lang=en", base).href);
  await old.waitForFunction(
    () =>
      document.querySelector("#cover-title").textContent === "Weekend Wings",
  );
  assert.equal(await old.locator("#designs input:checked").count(), 4);
  assert.deepEqual(await readOrder(old), mixedSheets);
  assert.equal(
    await old.locator("#book-cover").getAttribute("data-paper"),
    "US_LETTER",
  );
  assert.deepEqual(externalRequests, []);
  assert.deepEqual(errors, []);
  console.log(
    "Flight Book works at 320 px and desktop, preserves setup, previews actual pages, and exports a matching Letter PDF.",
  );
} finally {
  await browser.close();
}
