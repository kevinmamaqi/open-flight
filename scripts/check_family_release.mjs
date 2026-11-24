import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";

const base = new URL(process.argv[2] ?? "http://127.0.0.1:8000/");
base.pathname = base.pathname.endsWith("/")
  ? base.pathname
  : `${base.pathname}/`;
base.search = "";
base.hash = "";
const shots = process.argv[3];
if (shots) await mkdir(shots, { recursive: true });
const source = process.env.OPENFLIGHT_SOURCE
  ? pathToFileURL(resolve(process.env.OPENFLIGHT_SOURCE) + "/")
  : new URL("../", import.meta.url);
const assets = fileURLToPath(new URL("apps/editor/", source));
const { createBook } = await import(
  new URL("packages/print-export/family-book.js", source)
);
const { bookFilename, bookPlan, defaultSheets, normalizeBook, starterModels } =
  await import(new URL("apps/editor/book-model.js", source));
const { sheetIdFor, sheetPath } = await import(
  new URL("apps/editor/family-sheets.js", source)
);
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || process.env.OPENFLIGHT_CHROME || undefined,
});

const journeys = [
  {
    lang: "en",
    locale: "en-US",
    homepage: "",
    title: "Flight Book",
    paper: "US_LETTER",
  },
  {
    lang: "es",
    locale: "es-MX",
    homepage: "es.html",
    title: "Libro de vuelo",
    paper: "US_LETTER",
    pilot: "Lucía Álvarez",
  },
  {
    lang: "ru",
    locale: "ru-RU",
    homepage: "ru.html",
    title: "Книга полётов",
    paper: "A4",
  },
];
const [width, height] = (process.env.OPENFLIGHT_VIEWPORT ?? "320x740")
  .split("x")
  .map(Number);
assert.ok(width > 0 && height > 0, "OPENFLIGHT_VIEWPORT must be WIDTHxHEIGHT");
const view = { width, height };
const external = [];
const errors = [];
const observations = [];

async function openContext(locale) {
  const context = await browser.newContext({
    viewport: view,
    locale,
    serviceWorkers: "block",
  });
  // Routing disables browser cache and prevents accidental paid or external visits.
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === base.origin) return route.continue();
    external.push(url.origin + url.pathname);
    return route.abort();
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(response.status() + " " + response.url());
  });
  return { context, page };
}

async function measureBuilder(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.querySelectorAll("main img")]
        .filter((img) => !img.hidden)
        .map((img) => img.decode()),
    );
  });
  return page.evaluate(() => {
    const resources = [
      ...performance.getEntriesByType("navigation"),
      ...performance.getEntriesByType("resource"),
    ];
    const transferred = resources.reduce(
      (bytes, resource) => bytes + resource.transferSize,
      0,
    );
    const deferred = resources
      .filter(({ name }) =>
        /(?:book-engine|jspdf)\.js$|pdf(?:\.worker)?\.min\.mjs$/.test(name),
      )
      .map(({ name }) => name);
    return {
      bytes: transferred,
      requests: resources.length,
      deferred,
      readyMilliseconds: Math.round(performance.now()),
    };
  });
}

async function checkStickyButton(page) {
  const button = page.locator("#download-book");
  const inViewport = () =>
    button.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return (
        box.top >= 0 &&
        box.bottom <= innerHeight &&
        box.left >= 0 &&
        box.right <= innerWidth
      );
    });
  assert.equal(await inViewport(), true);
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth),
    view.width,
  );
  const start = await button.boundingBox();
  const scroll = await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
    return window.scrollY;
  });
  assert.ok(scroll > 100, "Sticky check must scroll the builder");
  assert.equal(await inViewport(), true);
  const end = await button.boundingBox();
  assert.ok(
    Math.abs(start.y - end.y) < 1,
    "Download action stays at the same vertical position",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  return {
    top: Math.round(start.y),
    bottom: Math.round(start.y + start.height),
  };
}

async function inspectBook(page, config) {
  const { lang, title, paper, pilot = "" } = config;
  const sheets = pilot
    ? starterModels.map((model) => sheetIdFor(model))
    : [...defaultSheets];
  if (pilot) await page.locator('[data-preset="starter"]').click();
  const book = normalizeBook({ lang, paper, pilot, sheets });
  const plan = bookPlan(book);
  const summary = await page.locator("#book-summary").textContent();
  assert.equal(Number(summary.match(/^\d+/)[0]), plan.pageCount);
  assert.equal(Number(summary.match(/·\s*(\d+)/)[1]), plan.pageCount);
  assert.equal(await page.locator("#book-size").isVisible(), true);
  const downloadStart = performance.now();
  const event = page.waitForEvent("download");
  await page.locator("#download-book").click();
  const download = await event;
  assert.equal(await download.failure(), null);
  assert.equal(download.suggestedFilename(), bookFilename(book));
  const downloaded = await readFile(await download.path());
  const downloadMilliseconds = Math.round(performance.now() - downloadStart);
  const loadAsset = (path) => readFile(join(assets, path));
  const rendered = await createBook(book, { loadAsset });
  assert.ok(
    downloaded.equals(Buffer.from(rendered)),
    `${lang} browser and local engines must produce the same complete PDF`,
  );
  const pdf = await PDFDocument.load(downloaded);
  assert.equal(pdf.getTitle(), title);
  assert.equal(pdf.getPageCount(), plan.pageCount);
  const [width, height] = paper === "A4" ? [595.28, 841.89] : [612, 792];
  for (const page of pdf.getPages()) {
    assert.ok(
      Math.abs(page.getWidth() - width) < 1 &&
        Math.abs(page.getHeight() - height) < 1,
    );
  }
  const sourcePageCounts = await Promise.all(
    sheets.map(async (id) => {
      const original = await loadAsset(sheetPath(id, paper, lang));
      return (await PDFDocument.load(original)).getPageCount();
    }),
  );
  const folded = sheets.filter((id) => id.endsWith("-k1"));
  assert.equal(
    pdf.getPageCount(),
    plan.keeps +
      sourcePageCounts.reduce((a, b) => a + b, 0) -
      Math.max(folded.length - 1, 0),
  );
  assert.equal(
    new Set(
      plan.entries.flatMap((entry) => entry.pages.map(({ number }) => number)),
    ).size,
    plan.pageCount - plan.keeps,
  );
  if (folded.length)
    assert.ok(
      plan.guidePage > plan.keeps,
      "PDF has one shared folded butterfly guide",
    );
  return {
    pages: pdf.getPageCount(),
    paper,
    pdfBytes: downloaded.length,
    downloadMilliseconds,
  };
}

async function checkMotor(page, lang) {
  await page.goto(new URL(`motor.html?lang=${lang}`, base).href);
  await page.locator("#phone-files a").first().waitFor();
  assert.equal(await page.locator("html").getAttribute("lang"), lang);
  assert.equal(await page.locator("#bom li").count(), 7);
  assert.equal(await page.locator("#bench-files a").count(), 3);
  assert.equal(await page.locator("#phone-files a").count(), 2);
  assert.equal(await page.locator("#files a").count(), 5);
  assert.match(
    await page.locator("#commercial-links a").first().getAttribute("href"),
    /powerup|shopify/i,
  );
  await page.locator("main img").evaluateAll((imgs) =>
    Promise.all(
      imgs.map((img) => {
        img.loading = "eager";
        return img.decode();
      }),
    ),
  );
  assert.ok(
    await page
      .locator("main img")
      .evaluateAll((imgs) =>
        imgs.every((img) => img.complete && img.naturalWidth > 0),
      ),
  );
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  for (const link of await page
    .locator("#phone-files a, #bench-files a, #files a")
    .all()) {
    const url = new URL(await link.getAttribute("href"), page.url());
    assert.equal(url.origin, base.origin);
    assert.ok(url.pathname.startsWith(base.pathname));
    const result = await page.request.get(url.href);
    assert.equal(result.status(), 200, url.href);
    const body = await result.body();
    if (url.pathname.endsWith(".zip"))
      assert.equal(body.subarray(0, 2).toString(), "PK");
    const path = url.pathname.slice(base.pathname.length);
    assert.ok(
      body.equals(await readFile(join(assets, path))),
      `${path} matches local motor asset bytes`,
    );
  }
}

try {
  for (const config of journeys) {
    const { lang, homepage, locale, title, paper, pilot } = config;
    const { context, page } = await openContext(locale);
    await page.goto(new URL(homepage, base).href);
    assert.equal(await page.locator("html").getAttribute("lang"), lang);
    const hero = page.locator("#hero-book");
    const heroURL = new URL(await hero.getAttribute("href"), page.url());
    assert.equal(heroURL.pathname, new URL("book.html", base).pathname);
    assert.equal(heroURL.searchParams.get("lang"), lang);
    assert.equal(heroURL.hash, "");
    let link = hero;
    if (pilot) {
      await page.locator("#home-pilot").fill(pilot);
      assert.equal(
        await page.locator("#home-cover-pilot").textContent(),
        pilot,
      );
      link = page.locator("#book-link");
      const route = new URL(await link.getAttribute("href"), page.url());
      assert.equal(route.pathname, heroURL.pathname);
      assert.equal(route.searchParams.has("pilot"), false);
      assert.equal(
        new URLSearchParams(route.hash.slice(1)).get("pilot"),
        pilot,
      );
    }
    await link.click();
    await page.waitForURL((url) => url.pathname === heroURL.pathname);
    await page.locator("#download-book:enabled").waitFor();
    assert.equal(await page.locator("h1").textContent(), title);
    assert.equal(await page.locator("html").getAttribute("lang"), lang);
    assert.equal(await page.locator("#pilot-input").inputValue(), pilot ?? "");
    assert.equal(new URL(page.url()).searchParams.has("pilot"), false);
    assert.equal(
      await page.locator("#book-cover").getAttribute("data-paper"),
      paper,
    );
    assert.equal(await page.locator("#support-choices").isVisible(), false);
    assert.equal(await page.locator("#fullscreen").count(), 0);
    const cold = await measureBuilder(page);
    assert.deepEqual(
      cold.deferred,
      [],
      "Render and preview libraries should load on demand",
    );
    const controls = {
      modelCards: await page.locator("#designs input").count(),
      presets: await page.locator("#presets button").count(),
      constructionChoices: await page.locator("[name='construction']").count(),
      coverStyles: await page.locator("[name='style']").count(),
      paperChoices: await page.locator("[name='paper']").count(),
      nameFields: await page.locator("#pilot-input").count(),
    };
    assert.deepEqual(controls, {
      modelCards: 7,
      presets: 4,
      constructionChoices: 2,
      coverStyles: 3,
      paperChoices: 2,
      nameFields: 1,
    });
    assert.equal(await page.locator(".order-panel").getAttribute("open"), null);
    const stickyDownload = await checkStickyButton(page);
    const file = await inspectBook(page, config);
    observations.push({
      lang,
      clickActions: pilot ? 3 : 2,
      pilotField: Boolean(pilot),
      coldBuilderBytes: cold.bytes,
      coldBuilderRequests: cold.requests,
      coldBuilderReadyMilliseconds: cold.readyMilliseconds,
      stickyDownload,
      ...file,
      controls,
    });
    if (shots)
      await page.screenshot({ path: join(shots, `book-${lang}-mobile.png`) });
    await checkMotor(page, lang);
    if (shots && lang === "en") {
      await page.setViewportSize({ width: 1280, height: 860 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(shots, "motor.png") });
      await page.goto(new URL("book.html?lang=en", base).href);
      await measureBuilder(page);
      await page.screenshot({ path: join(shots, "book.png") });
      await page.goto(new URL("#family-book", base).href);
      await page.locator("#family-book").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(shots, "home-book.png") });
    }
    await context.close();
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    JSON.stringify(
      {
        measurement: `Fresh ${view.width}×${view.height} Chromium context per locale. HTTP cache off, service worker and external requests blocked. Builder navigation and resource transferSize after fonts and artwork, before PDF generation. Clicks exclude typing and scroll. Timings are single local samples.`,
        observations,
      },
      null,
      2,
    ),
  );
  console.log(
    "Homepage, Flight Book PDF parity, and local motor downloads verified in English, Spanish and Russian.",
  );
} finally {
  await browser.close();
}
