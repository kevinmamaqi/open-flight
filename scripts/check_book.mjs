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
    viewport: { width: 320, height: 740 },
  });
  let externalRequests = 0;
  await context.route("**/*", (route) => {
    if (new URL(route.request().url()).origin === base.origin)
      return route.continue();
    externalRequests++;
    return route.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(new URL("book.html?lang=es", base).href);
  assert.equal(response.status(), 200);
  await page.waitForFunction(
    () => document.querySelector("html").lang === "es",
  );
  assert.equal(
    await page.locator("h1").textContent(),
    "Crea un libro de vuelo",
  );
  assert.equal(await page.locator("#designs input:checked").count(), 7);
  await page.locator("#cover-input").fill("🐛");
  assert.equal(await page.locator("#download-book").isDisabled(), true);
  await page.locator("#cover-input").fill("Patrulla del aire");
  await page.locator('label:has(input[value="sunset"])').click();
  await page.locator('label:has(input[value="US_LETTER"])').click();
  await page.locator('label:has(input[value="monarch-k1"])').click();
  await page.locator('label:has(input[value="monarch"])').click();
  await page.locator('button[data-model="monarch"][data-delta="-1"]').click();
  assert.equal(
    await page.locator("#order li").nth(5).locator("b").textContent(),
    "Monarca · W1",
  );
  await page.locator("#ru").click();
  assert.equal(await page.locator("html").getAttribute("lang"), "ru");
  assert.equal(
    await page.locator("#cover-title").textContent(),
    "Patrulla del aire",
  );
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-art"),
    "mixed",
  );
  assert.equal(
    await page.locator("#book-cover").getAttribute("data-paper"),
    "US_LETTER",
  );
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth),
    320,
  );
  const downloadEvent = page.waitForEvent("download");
  await page.locator("#download-book").click();
  const download = await downloadEvent;
  const content = await PDFDocument.load(await readFile(await download.path()));
  assert.equal(content.getTitle(), "Patrulla del aire");
  assert.equal(content.getPage(0).getWidth(), 612);
  assert.equal(content.getPageCount(), 23);
  assert.equal(externalRequests, 0);
  assert.deepEqual(errors, []);
  if (process.env.BOOK_SCREENSHOT) {
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: process.env.BOOK_SCREENSHOT });
  }
  console.log(
    "Localized mobile family book exports the customized Letter PDF offline.",
  );
} finally {
  await browser.close();
}
