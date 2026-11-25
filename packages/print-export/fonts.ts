// The three faces embedded in every Open Flight PDF, read once. In the browser bundle,
// readFileSync serves these paths from files that preparePrintAssets() has already fetched.
import { readFileSync } from 'node:fs'

const files = {
  text: new URL('../../apps/editor/assets/fonts/OpenFlightText-Regular.ttf', import.meta.url),
  bold: new URL('../../apps/editor/assets/fonts/OpenFlightText-Bold.ttf', import.meta.url),
  display: new URL('../../apps/editor/assets/fonts/Alegreya-Bold.ttf', import.meta.url),
}
let cache: { text: string; bold: string; display: string } | undefined
export function printFonts() {
  cache ??= {
    text: readFileSync(files.text).toString('base64'),
    bold: readFileSync(files.bold).toString('base64'),
    display: readFileSync(files.display).toString('base64'),
  }
  return cache
}
