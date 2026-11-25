import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { PDFDocument, PDFName, decodePDFRawStream } from 'pdf-lib'
import { flightObjects, objectLocales, objectPapers } from '../apps/editor/assets/objects/activities.js'

const editor = new URL('../apps/editor/', import.meta.url)
test('each paper pack has the localized activity pages at scale and contains the matching editable sources', async () => {
  for (const locale of objectLocales) {
    const { activities, packets } = flightObjects(locale)
    for (const paper of objectPapers) {
      const pdf = await PDFDocument.load(await readFile(new URL(packets[paper], editor)))
      const pages = pdf.getPages()
      assert.deepEqual(activities.map(item => item.page), pages.map((_, index) => index + 1))
      assert.equal(pdf.catalog.get(PDFName.of('Lang')).decodeText(), locale)
      const [w, h] = paper === 'A4' ? [210, 297] : [215.9, 279.4]
      for (const page of pages) {
        assert.ok(Math.abs(page.getWidth() * 25.4 / 72 - w) < 0.05)
        assert.ok(Math.abs(page.getHeight() * 25.4 / 72 - h) < 0.05)
      }
      const files = pdf.catalog.lookup(PDFName.of('Names')).lookup(PDFName.of('EmbeddedFiles')).lookup(PDFName.of('Names'))
      const artwork = new Map()
      for (let i = 0; i < files.size(); i += 2) {
        const stream = files.lookup(i + 1).lookup(PDFName.of('EF')).lookup(PDFName.of('F'))
        artwork.set(files.lookup(i).decodeText(), Buffer.from(decodePDFRawStream(stream).decode()))
      }
      for (const { illustration } of activities)
        assert.deepEqual(artwork.get(illustration.split('/').at(-1)), await readFile(new URL(illustration, editor)))
    }
  }
})

test('bundled reference images match the reviewed versions and retain their individual reuse terms', async () => {
  const approved = new Map([
    ['maple-keys.jpg', ['https://creativecommons.org/licenses/by/3.0/', 'aa819a3c7208d2ee5395a62bf5be07988ca87d8d83ab8b5c0d45f32e0e61b449']],
    ['samara-study.png', ['https://creativecommons.org/licenses/by/4.0/', 'e85884581a20d7300ee90aa2ad1583c6eb52f08dde84638b359cdb5e928d2e11']],
  ])
  for (const locale of objectLocales) {
    const { references } = flightObjects(locale)
    const local = references.filter(ref => ref.asset)
    assert.equal(local.length, approved.size)
    for (const ref of local) {
      const [license, hash] = approved.get(ref.asset.split('/').at(-1))
      assert.equal(ref.licenseUrl, license)
      assert.ok(ref.creator && ref.url.startsWith('https://'))
      assert.equal(createHash('sha256').update(await readFile(new URL(ref.asset, editor))).digest('hex'), hash)
    }
  }
})
