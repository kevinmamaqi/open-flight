import { planePdfBytes } from './pdf.js?v=3b57e65abbf7'
import { fontFiles } from '../brand/print.js?v=3b57e65abbf7'

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

// The three faces embedded in every Open Flight PDF (see assets/brand/print.js).
function fontData() {
  const base64 = (bytes) => {
    const raw = new Uint8Array(bytes)
    let binary = ''
    for (let i = 0; i < raw.length; i += 16384) binary += String.fromCharCode(...raw.subarray(i, i + 16384))
    return btoa(binary)
  }
  typeface ??= Promise.all(
    Object.entries(fontFiles).map(([key, path]) =>
      fetch(new URL('../../' + path, import.meta.url)).then((response) => {
        if (!response.ok) throw Error('PDF typeface')
        return response.arrayBuffer().then((bytes) => [key, base64(bytes)])
      }),
    ),
  )
    .then(Object.fromEntries)
    .catch((error) => {
      typeface = undefined
      throw error
    })
  return typeface
}

export async function planeBrowserPdf(plan) {
  const [JsPDF, fonts] = await Promise.all([pdfScripts(), fontData()])
  return planePdfBytes(plan, JsPDF, fonts)
}
