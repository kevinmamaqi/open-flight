// Zoom for every 3D model viewer: the airplane, butterfly and flying-object pages and the
// flying-objects workbench share this one component. Buttons in the stage corner (+, −, and reset
// once zoomed), two-finger pinch, Ctrl/⌘ + wheel (also a trackpad pinch) and the + − 0 keys.
// A plain wheel still scrolls the page. The viewer zooms its orthographic camera about the model.
const w = (en, es, ru) => ({ en, es, ru })
export const zoomWords = {
  zoomIn: w('Zoom in', 'Acercar', 'Приблизить'),
  zoomOut: w('Zoom out', 'Alejar', 'Отдалить'),
  zoomReset: w('Reset zoom', 'Restablecer zoom', 'Сбросить масштаб'),
  hint: w('Pinch, Ctrl and scroll, or + and − to zoom.', 'Pellizca, usa Ctrl y la rueda, o + y − para acercar.', 'Сведите пальцы, Ctrl и колесо или + и −, чтобы приблизить.'),
}
export const ZOOM_MIN = 0.6
export const ZOOM_MAX = 4

const escape = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const icon = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const button = (step, key, d, lang, hidden = false) =>
  `<button type="button" data-zoom-step="${step}" aria-label="${escape(zoomWords[key][lang])}" title="${escape(zoomWords[key][lang])}"${hidden ? ' hidden' : ''}>${icon(d)}</button>`

/** The zoom buttons, hidden until the 3D model is on screen. Put it inside the positioned stage. */
export function zoomMarkup(lang) {
  return `<div class="viewer-zoom" data-zoom hidden>${button('in', 'zoomIn', 'M12 5v14M5 12h14', lang)}${button('out', 'zoomOut', 'M5 12h14', lang)}${button('reset', 'zoomReset', 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5', lang, true)}</div>`
}

/**
 * Wire zoom to a viewer. `stage` is the element the model is drawn in (it takes pinch, wheel and
 * keys); `box` is the `zoomMarkup` element; `viewer()` returns the current viewer or null;
 * `onUse()` runs at every zoom gesture (to stop an idle orbit or hide a hint). The caller's own
 * drag handler should skip turning while `pinching()` is true.
 */
export function mountZoom({ stage, box, viewer, onUse = () => {} }) {
  let level = 1
  const set = (next) => {
    level = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, next))
    if (Math.abs(level - 1) < 0.02) level = 1
    viewer()?.zoom?.(level)
    if (!box) return
    box.querySelector('[data-zoom-step="in"]').disabled = level >= ZOOM_MAX
    box.querySelector('[data-zoom-step="out"]').disabled = level <= ZOOM_MIN
    box.querySelector('[data-zoom-step="reset"]').hidden = level === 1
  }
  const by = (factor) => { onUse(); set(level * factor) }
  box?.addEventListener('click', (event) => {
    const step = event.target.closest('[data-zoom-step]')?.dataset.zoomStep
    if (step === 'in') by(1.25)
    else if (step === 'out') by(0.8)
    else if (step === 'reset') { onUse(); set(1) }
  })
  // Two pointers on the stage pinch.
  const pointers = new Map()
  let pinch = null
  const spread = () => { const [a, b] = [...pointers.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1 }
  stage.addEventListener('pointerdown', (event) => {
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.size === 2) { pinch = { spread: spread(), level }; onUse() }
  })
  stage.addEventListener('pointermove', (event) => {
    if (!pointers.has(event.pointerId)) return
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pinch && pointers.size === 2) set(pinch.level * (spread() / pinch.spread))
  })
  const lift = (event) => { pointers.delete(event.pointerId); if (pointers.size < 2) pinch = null }
  stage.addEventListener('pointerup', lift)
  stage.addEventListener('pointercancel', lift)
  // A trackpad pinch arrives as a wheel event with ctrlKey set; a plain wheel scrolls the page.
  stage.addEventListener('wheel', (event) => {
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()
    by(Math.exp(-event.deltaY * 0.01))
  }, { passive: false })
  stage.addEventListener('keydown', (event) => {
    const factor = { '+': 1.25, '=': 1.25, '-': 0.8, '_': 0.8 }[event.key]
    if (factor) { event.preventDefault(); by(factor) }
    else if (event.key === '0') { event.preventDefault(); onUse(); set(1) }
  })
  return {
    /** Show the buttons and apply the current zoom to a (new) viewer. */
    show() { if (box) box.hidden = false; viewer()?.zoom?.(level) },
    hide() { if (box) box.hidden = true },
    pinching: () => pinch !== null,
    get level() { return level },
  }
}
