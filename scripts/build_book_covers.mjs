import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {createCanvas, loadImage} from '@napi-rs/canvas'
import {getDocument} from 'pdfjs-dist/legacy/build/pdf.mjs'
import {createBook} from '../packages/print-export/family-book.js'
import {sheetLocales, sheetCatalog} from '../apps/editor/family-sheets.js'
import {appearanceArtPath, appearanceArtStyles, appearanceChoices} from '../apps/editor/model-appearance.js'

// The workshop previews the cover and flight log from the actual printable book.
const editor = new URL('../apps/editor/', import.meta.url)
await mkdir(new URL('assets/book/thumbs/',editor),{recursive:true})
const thumbnail = createCanvas(192,120)
const artwork = new Set()
for (const {id,model} of sheetCatalog) {
  for (const choice of appearanceChoices(model)) {
    for (const style of appearanceArtStyles) artwork.add(appearanceArtPath(id,style,choice.id))
  }
}
const paths = [...artwork].sort()
await writeFile(new URL('assets/book/art-catalog.json', editor), JSON.stringify(paths, null, 2) + '\n')
for (const path of paths) {
  const image = await loadImage(await readFile(new URL(path,editor)))
  thumbnail.getContext('2d').drawImage(image,0,0,thumbnail.width,thumbnail.height)
  const destination = new URL(path.replace('/models/','/thumbs/'),editor)
  await writeFile(destination,thumbnail.toBuffer('image/jpeg',82))
}
for (const lang of sheetLocales) {
  const bytes = await createBook({lang, paper:'A4'}, {loadAsset:path=>readFile(new URL(path,editor))})
  const pdf = await getDocument({data:new Uint8Array(bytes), useSystemFonts:false, isEvalSupported:false}).promise
  try {
    for (const [number, label] of [[1, 'cover'], [4, 'log']]) {
      const page = await pdf.getPage(number)
      const viewport = page.getViewport({scale:0.83})
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
      await page.render({canvasContext:canvas.getContext('2d'), viewport}).promise
      await writeFile(new URL('assets/atlas/book-' + label + '-' + lang + '.png',editor), canvas.toBuffer('image/png'))
    }
  } finally { await pdf.destroy() }
}
