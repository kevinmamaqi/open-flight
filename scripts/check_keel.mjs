import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const route = process.argv[2];
if (!route) throw new Error("Pass the full URL for keel.html.");
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH && {
    executablePath: process.env.CHROMIUM_PATH,
  }),
});
try {
  const pagesIn = (pdf) =>
    [...pdf.toString("latin1").matchAll(/\/Type\s*\/Page\b/g)].length;
  const shots = process.argv[3];
  const page = await browser.newPage({ viewport: { width: 320, height: 780 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.print = () => {
      document.body.dataset.printed = String(
        !!document.querySelector("#print-sheet svg"),
      );
      dispatchEvent(new Event("afterprint"));
    };
  });
  if (shots) {
    await page.goto(route);
    await page.locator("#preview svg").waitFor();
    await page.screenshot({ path: shots + "-phone.png", fullPage: true });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: shots + "-desktop.png", fullPage: true });
    await page.setViewportSize({ width: 320, height: 780 });
  }
  for (const lang of ["en", "es", "ru"]) {
    const url = new URL(route);
    url.search = new URLSearchParams({
      lang,
      species: "monarch",
      span_mm: "184",
      appearance_id: "twilight",
      paper: "US_LETTER",
      step: "4",
    });
    await page.goto(url.href);
    await page.locator("#preview svg").waitFor();
    await page.locator("#diagram svg").waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), lang);
    assert.equal(await page.locator("#span_mm").inputValue(), "184");
    assert.equal(await page.locator("#appearance_id").inputValue(), "twilight");
    assert.equal(await page.locator("#paper").inputValue(), "US_LETTER");
    assert.match(
      await page.locator("#original").getAttribute("href"),
      new RegExp("monarch-US_LETTER-" + lang),
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const art = () => page.locator("#preview svg").innerHTML();
    const twilight = await art();
    assert.equal(await page.locator("#view").inputValue(), "folded");
    await page.locator("#view").selectOption("flatPattern");
    assert.notEqual(await art(), twilight);
    const flat = await art();
    await page.reload();
    await page.locator("#preview svg").waitFor();
    assert.equal(await page.locator("#view").inputValue(), "flatPattern");
    assert.equal(await art(), flat);
    await page.locator("#view").selectOption("folded");
    for (const palette of ["natural", "carnival", "coloring"]) {
      await page.locator("#appearance_id").selectOption(palette);
      assert.notEqual(await art(), twilight);
    }
    await page.locator("#appearance_id").selectOption("twilight");
    await page.locator("#span_mm").press("Home");
    assert.equal(await page.locator("#span_mm").inputValue(), "148");
    assert.notEqual(await art(), twilight);
    await page.locator("#span_mm").press("End");
    assert.equal(await page.locator("#span_mm").inputValue(), "184");
    await page.locator("#next").click();
    await page.reload();
    await page.locator("#preview svg").waitFor();
    assert.equal(new URL(page.url()).searchParams.get("step"), "5");
    await page.locator("#print").click();
    assert.equal(
      await page.locator("body").getAttribute("data-printed"),
      "true",
    );
  }

  await page.locator("#save").click();
  await page.locator("#species").selectOption("morpho");
  assert.equal(await page.locator("#span_mm").inputValue(), "160");
  await page.locator("#reopen").click();
  assert.equal(await page.locator("#species").inputValue(), "monarch");
  await page.locator("#preview svg").waitFor();

  const download = async (id) => {
    const [file] = await Promise.all([
      page.waitForEvent("download"),
      page.locator("#" + id).click(),
    ]);
    return readFile(await file.path());
  };
  const source = await download("source");
  const data = JSON.parse(source);
  assert.equal(data.format, "open-flight-folded-butterfly");
  assert.equal(data.span_mm, 184);
  await page.locator("#species").selectOption("swallowtail");
  await page.locator("#source-file").setInputFiles({
    name: "butterfly.json",
    mimeType: "application/json",
    buffer: source,
  });
  await page.waitForURL((url) => url.searchParams.get("species") === "monarch");
  assert.equal(await page.locator("#span_mm").inputValue(), "184");
  assert.match((await download("svg")).toString(), /<svg\b/);
  const printable = await download("pdf");
  assert.equal(printable.subarray(0, 5).toString(), "%PDF-");
  assert.equal(pagesIn(printable), 2, "downloaded PDF page count");
  for (const [paper, mediaBox] of [
    ["US_LETTER", /\/MediaBox\s*\[0 0 612 792\]/],
    ["A4", /\/MediaBox\s*\[0 0 594(?:\.\d+)? 841(?:\.\d+)?\]/],
  ]) {
    await page.locator("#paper").selectOption(paper);
    const nativePrint = await page.pdf({ preferCSSPageSize: true });
    assert.equal(pagesIn(nativePrint), 2, paper + " browser print page count");
    assert.match(nativePrint.toString("latin1"), mediaBox);
  }
  await page.locator('summary[data-word="compare"]').click();
  assert.equal(
    (await download("matching-original")).subarray(0, 5).toString(),
    "%PDF-",
  );
  assert.deepEqual(errors, []);
  console.log(
    "Folded worktable verified in English, Spanish, and Russian at 320 px, with URL reload, print, save, editable source, and matching original.",
  );
} finally {
  await browser.close();
}
