import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {createCanvas, loadImage} from '@napi-rs/canvas'
import {getDocument} from 'pdfjs-dist/legacy/build/pdf.mjs'
import {createBook} from '../packages/print-export/family-book.js'
import {sheetLocales, sheetIds} from '../apps/editor/family-sheets.js'
import {artPath, bookStyles} from '../apps/editor/book-model.js'

// The storefront shows the cover that the book renderer actually prints.
const editor = new URL('../apps/editor/', import.meta.url)
await mkdir(new URL('assets/book/thumbs/',editor),{recursive:true})
const thumbnail = createCanvas(192,120)
for (const id of sheetIds) for (const style of bookStyles) {
  const path = artPath(id,style)
  const image = await loadImage(await readFile(new URL(path,editor)))
  thumbnail.getContext('2d').drawImage(image,0,0,thumbnail.width,thumbnail.height)
  const destination = new URL(path.replace('/models/','/thumbs/'),editor)
  await writeFile(destination,thumbnail.toBuffer('image/jpeg',82))
}
for (const lang of sheetLocales) {
  const bytes = await createBook({lang, paper:'A4'}, {loadAsset:path=>readFile(new URL(path,editor))})
  const pdf = await getDocument({data:new Uint8Array(bytes), useSystemFonts:false, isEvalSupported:false}).promise
  try {
    const page = await pdf.getPage(1), viewport = page.getViewport({scale:0.83})
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    await page.render({canvasContext:canvas.getContext('2d'), viewport}).promise
    await writeFile(new URL('assets/atlas/book-cover-' + lang + '.png',editor),canvas.toBuffer('image/png'))
  } finally { await pdf.destroy() }
}
