// Print conventions shared by every Open Flight sheet that is folded: airplanes and butterflies.

// Office printers leave the outer 3–5 mm of a sheet blank. Guides stay at least this far inside.
export const printSafeMm = 6
// A whole-sheet model can print a thick cut border this far inside the paper. The builder cuts
// along it, and the folds are computed for the cut-out sheet.
export const trimMm = 7
// 'cut': print the cut border and fold the cut-out sheet.
// 'whole': fold the whole paper (for printers that print to the edge, or trimmed print-shop pages).
export const sheetEdges = Object.freeze(['cut', 'whole'])

// Seen from the other face, a valley fold is a mountain and a mountain fold is a valley.
export function backKind(kind) {
  if (kind === 'mountain') return 'valley'
  if (kind === 'valley') return 'mountain'
  return kind
}
// Long-edge duplex on a portrait page mirrors left and right; short-edge duplex on a landscape
// page does the same. Either way the back face mirrors x about the page centre.
export const mirrorX = (width) => ([x, y]) => [width - x, y]

// Words for the back face, shared by every family. `landscape` sheets flip on the short edge.
const backWords = {
  en: {
    title: 'Back of the sheet',
    flip: (landscape) =>
      'Print both pages double-sided, flipping on the ' +
      (landscape ? 'short' : 'long') +
      ' edge, to see the fold lines on both faces.',
    swap: 'Folds that are valleys on the front are mountains here.',
    check: 'Hold the sheet to a window: each pair of crosses should overlap.',
  },
  ru: {
    title: 'Оборот листа',
    flip: (landscape) =>
      'Печатайте обе страницы с двух сторон, переворот по ' +
      (landscape ? 'короткому' : 'длинному') +
      ' краю: линии сгибов будут видны с обеих сторон.',
    swap: 'Сгибы «долиной» на лицевой стороне здесь становятся «горой».',
    check: 'Посмотрите лист на просвет: кресты должны совпасть.',
  },
  es: {
    title: 'Reverso de la hoja',
    flip: (landscape) =>
      'Imprime las dos páginas a doble cara, girando por el borde ' +
      (landscape ? 'corto' : 'largo') +
      ', para ver las líneas en las dos caras.',
    swap: 'Los dobleces en valle de la cara impresa aquí son en montaña.',
    check: 'Mira la hoja a contraluz: cada par de cruces debe coincidir.',
  },
}
export function backFaceWords(locale, landscape = false) {
  const w = backWords[locale] ?? backWords.en
  return { title: w.title, lines: [w.flip(landscape), w.swap, w.check] }
}
