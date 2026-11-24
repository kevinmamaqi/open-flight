import { planePdfBytes } from './pdf.js'

let pdfLibrary, typeface

function pdfScripts() {
  if (globalThis.jspdf) return Promise.resolve(globalThis.jspdf.jsPDF)
  pdfLibrary ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = new URL('./vendor/jspdf.js', import.meta.url).href
    script.onload = () => resolve(globalThis.jspdf.jsPDF)
    script.onerror = () => {
      script.remove()
      pdfLibrary = undefined
      reject(Error('PDF renderer'))
    }
    document.head.append(script)
  })
  return pdfLibrary
}

function fontData() {
  typeface ??= Promise.all([
    fetch(new URL('./vendor/DejaVuSans.ttf', import.meta.url)),
    fetch(new URL('./vendor/DejaVu-LICENSE.txt', import.meta.url)),
  ])
    .then(([font, notice]) => {
      if (!font.ok || !notice.ok) throw Error('PDF typeface')
      return Promise.all([font.arrayBuffer(), notice.text()])
    })
    .then(([bytes, notice]) => {
      const raw = new Uint8Array(bytes)
      let binary = ''
      for (let i = 0; i < raw.length; i += 16384) binary += String.fromCharCode(...raw.subarray(i, i + 16384))
      return { base64: btoa(binary), notice }
    })
    .catch((error) => {
      typeface = undefined
      throw error
    })
  return typeface
}

export async function planeBrowserPdf(plan) {
  const [JsPDF, font] = await Promise.all([pdfScripts(), fontData()])
  return planePdfBytes(plan, JsPDF, font.base64, font.notice)
}
