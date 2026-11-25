import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

// The design system's own gates (see DESIGN.md): token contrast, grayscale and gamut, no hard-coded
// values in stylesheets, the generated token module, and the paper rules on every printable PDF.
const run = (script) => execFileSync(process.execPath, [script], { encoding: "utf8" });

test("design tokens pass contrast, grayscale and lint checks", () => {
  assert.match(run("scripts/check_design.mjs"), /Design checks pass/);
});

test("every printable follows the paper rules", () => {
  assert.match(run("scripts/check_print_design.mjs"), /Print checks pass/);
});
