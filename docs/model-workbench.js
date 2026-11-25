import { appearanceArtPath, appearanceChoices } from './model-appearance.js?v=51d4970dfb40'
import { bookFromStudio, studioForBookSheet } from './model-studio.js?v=51d4970dfb40'
import { sheetIdFor, sheetPath } from './family-sheets.js?v=51d4970dfb40'
import { flightObjects } from './assets/objects/activities.js?v=51d4970dfb40'
import { objectIds, coloredPacket } from './assets/objects/appearance.js?v=51d4970dfb40'
import { escapeHtml as e } from './site-navigation.js?v=51d4970dfb40'

const labels = {
  en: [
    'Colors',
    'Explore in 3D',
    'Paper size',
    'Print my model',
    'Add to my Flight Book',
    'Rotate',
    'View a flight',
    'Pause',
    'Motion illustration',
    'Front',
    'Above',
    'Side',
    'Try another view',
    '3D is unavailable on this device.',
    'Build instructions',
    'Preparing PDF…',
    'Download failed. Try again.',
    'Setting',
    'Loose tuck',
    'Deeper tuck',
    'Clip A',
    'Clip B',
    'Level wings',
    'Raised tips',
    'Flight position',
  ],
  es: [
    'Colores',
    'Explorar en 3D',
    'Formato',
    'Imprimir mi modelo',
    'Añadir a mi libro de vuelo',
    'Girar',
    'Ver un vuelo',
    'Pausa',
    'Ilustración del movimiento',
    'Frente',
    'Arriba',
    'Lado',
    'Cambiar de vista',
    'Este dispositivo no admite la vista 3D.',
    'Instrucciones de montaje',
    'Preparando el PDF…',
    'No se ha podido descargar. Inténtalo de nuevo.',
    'Ajuste',
    'Poco solape',
    'Más solape',
    'Clip A',
    'Clip B',
    'Alas planas',
    'Puntas elevadas',
    'Posición en vuelo',
  ],
  ru: [
    'Окраска',
    'Посмотреть в 3D',
    'Формат бумаги',
    'Напечатать модель',
    'Добавить в книгу полётов',
    'Поворот',
    'Посмотреть полёт',
    'Пауза',
    'Иллюстрация движения',
    'Спереди',
    'Сверху',
    'Сбоку',
    'Сменить ракурс',
    'На этом устройстве недоступен режим 3D.',
    'Инструкция по сборке',
    'Готовим PDF…',
    'Не удалось скачать. Попробуйте ещё раз.',
    'Настройка',
    'Малый нахлёст',
    'Большой нахлёст',
    'Скрепка A',
    'Скрепка B',
    'Крылья ровно',
    'Кончики подняты',
    'Положение в полёте',
  ],
}
export function workbenchMarkup(id, lang, base) {
  const t = labels[lang],
    object = objectIds.includes(id),
    sheet = object ? id : sheetIdFor(id)
  const choices = appearanceChoices(id, lang)
  const defaultPaper = object
    ? flightObjects(lang).packets.A4 +
      '#page=' +
      flightObjects(lang).activities.find((item) => item.id === id).page
    : sheetPath(sheet, 'A4', lang)
  const setting = { ring: 18, samara: 20, tandem: 22 }[id]
  return `<section class="model-workbench" data-model-workbench="${e(id)}" data-base="${e(base)}">
    <div class="model-stage"><img class="model-poster" src="${base}${appearanceArtPath(sheet)}" alt="${e(object ? flightObjects(lang).activities.find((item) => item.id === id).title : id)}"><div class="model-canvas" hidden></div></div>
    <div class="stage-actions"><button type="button" class="button secondary explore">${t[1]}</button><span class="stage-status" role="status"></span></div>
    <div class="orbit-controls" hidden><label>${t[5]}<input class="orbit" type="range" min="-180" max="180" value="32"></label>
    <label>${t[12]}<select class="angle"><option value="36">${t[9]}</option><option value="82">${t[10]}</option><option value="8">${t[11]}</option></select></label>
    <button class="play button secondary" type="button">${t[6]}</button><label>${t[24]}<input class="flight-position" type="range" min="0" max="100" value="0"></label><small>${t[8]}</small></div>
    <fieldset class="model-palette"><legend>${t[0]}</legend>${choices.map(({ id, label, colors }, i) => `<button type="button" data-paint="${e(id)}" aria-pressed="${i === 0}"><span class="palette-chip" aria-hidden="true" style="background:linear-gradient(120deg,${colors[0]} 48%,${colors[1]} 48% 76%,${colors[2]} 76%)"></span>${e(label)}</button>`).join('')}</fieldset>
    <div class="model-tools">${setting ? `<label>${t[17]}<select class="setting"><option value="0">${t[setting]}</option><option value="1">${t[setting + 1]}</option></select></label>` : ''}
    <label>${t[2]}<select class="size"><option>A4</option><option value="US_LETTER">${lang === 'es' ? 'Carta' : 'US Letter'}</option></select></label>
    <a class="button primary model-print" href="${e(base + defaultPaper)}">${t[3]}</a><a class="button secondary model-book" href="${e(base + bookFromStudio(sheet, choices[0].id, lang, 'A4').slice(2))}">${t[4]}</a></div></section>`
}

export function mountWorkbench(root) {
  const id = root.dataset.modelWorkbench,
    lang = document.documentElement.lang,
    base = root.dataset.base
  const t = labels[lang],
    $ = (selector) => root.querySelector(selector),
    object = objectIds.includes(id)
  const sheet = object ? id : sheetIdFor(id),
    choices = appearanceChoices(id, lang)
  const params = new URLSearchParams(location.search),
    activity = object && flightObjects(lang).activities.find((item) => item.id === id)
  let paint = choices.find((c) => c.id === params.get('colors'))?.id ?? choices[0].id
  let viewer,
    opening,
    revision = 0
  const paper = $('.size'),
    setting = $('.setting'),
    play = $('.play'),
    slider = $('.flight-position'),
    status = $('.stage-status')
  if (params.get('paper') === 'US_LETTER') paper.value = 'US_LETTER'
  if (setting && params.get('setting') === '1') setting.value = '1'
  function playing(active) {
    play.textContent = active ? t[7] : t[6]
    play.setAttribute('aria-pressed', String(active))
  }
  async function show() {
    const version = ++revision
    try {
      opening ??= import('./model-viewer.js?v=51d4970dfb40').then(({ createViewer }) =>
        createViewer($('.model-canvas'), id, lang, (fraction, active) => {
          slider.value = Math.round(fraction * 100)
          playing(active)
        }),
      )
      viewer = await opening
      if (version !== revision) return
      await viewer.setModel(paint, paper.value, setting?.value === '1')
      if (version !== revision) return
      $('.model-canvas').hidden = false
      $('.model-poster').hidden = true
      $('.orbit-controls').hidden = false
      $('.explore').hidden = true
      status.textContent = ''
    } catch {
      if (version !== revision) return
      opening = null
      viewer?.dispose()
      viewer = null
      $('.model-poster').hidden = false
      $('.model-canvas').hidden = true
      $('.orbit-controls').hidden = true
      $('.explore').hidden = false
      status.textContent = t[13]
    }
  }
  function sync(updateURL) {
    for (const button of root.querySelectorAll('[data-paint]'))
      button.setAttribute('aria-pressed', String(button.dataset.paint === paint))
    $('.model-poster').src = base + appearanceArtPath(sheet, 'studio', paint)
    const packet = object && coloredPacket(flightObjects(lang).packets[paper.value], paint)
    const link = $('.model-print')
    link.href = base + (object ? packet + '#page=' + activity.page : sheetPath(sheet, paper.value, lang))
    $('.model-book').href = base + bookFromStudio(sheet, paint, lang, paper.value).slice(2)
    const studio = document.querySelector('[data-model-studio]')
    if (studio)
      studio.href =
        base +
        studioForBookSheet({ lang, paper: paper.value, appearances: { [id]: paint } }, sheet).slice(2) +
        (object ? '&setting=' + setting.value : '')
    if (updateURL) {
      const url = new URL(location.href)
      url.searchParams.set('colors', paint)
      url.searchParams.set('paper', paper.value)
      if (setting) url.searchParams.set('setting', setting.value)
      history.replaceState(null, '', url)
      for (const a of document.querySelectorAll('.mast a[hreflang]')) {
        const target = new URL(a.href)
        for (const key of ['colors', 'paper', 'setting'])
          if (url.searchParams.has(key)) target.searchParams.set(key, url.searchParams.get(key))
        a.href = target.href
      }
      if (opening || (object && setting.value === '1')) void show()
      root.dispatchEvent(new CustomEvent('modelchange', { detail: { id, paint, paper: paper.value } }))
    }
  }
  root.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-paint]')
    if (choice) {
      paint = choice.dataset.paint
      sync(true)
    }
  })
  paper.onchange = () => sync(true)
  if (setting) setting.onchange = () => sync(true)
  $('.explore').onclick = show
  $('.orbit').oninput = () => viewer?.view(+$('.orbit').value, +$('.angle').value)
  $('.angle').onchange = $('.orbit').oninput
  play.onclick = () => viewer?.toggle()
  slider.oninput = () => viewer?.seek(Number(slider.value) / 100)
  $('.model-print').onclick = async (event) => {
    if (object || paint === choices[0].id) return
    event.preventDefault()
    status.textContent = t[15]
    try {
      const { loadAppearanceSheet } = await import('./appearance-sheet-browser.js?v=51d4970dfb40')
      const name = [sheet, paint, paper.value, lang].join('-') + '.pdf'
      const bytes = await loadAppearanceSheet(sheet, paper.value, lang, paint)
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })),
        a = document.createElement('a')
      a.download = name
      a.href = url
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 60000)
      status.textContent = ''
    } catch {
      status.textContent = t[16]
    }
  }
  root.dataset.ready = 'true'
  sync(false)
  if (setting?.value === '1') void show()
}
if (typeof document !== 'undefined')
  for (const root of document.querySelectorAll('[data-model-workbench]')) mountWorkbench(root)
