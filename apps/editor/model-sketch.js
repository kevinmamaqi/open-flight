const text = {
  en: [
    'Release',
    'First contact',
    'Flight sketch · unscaled',
    'Play sketch',
    'Pause',
    'Sketch position',
    'Straight',
    'Left turn',
    'Right turn',
    'Sketch route',
  ],
  es: [
    'Salida',
    'Primer contacto',
    'Trayectoria sin escala',
    'Reproducir',
    'Pausa',
    'Posición en el recorrido',
    'Recta',
    'Giro a la izquierda',
    'Giro a la derecha',
    'Recorrido',
  ],
  ru: [
    'Старт',
    'Первое касание',
    'Схема без масштаба',
    'Показать полёт',
    'Пауза',
    'Положение на схеме',
    'Прямо',
    'Левый поворот',
    'Правый поворот',
    'Траектория',
  ],
}
const glides = [
  'M74 143 C180 121 309 92 443 63',
  'M74 143 Q240 119 302 95 T443 30',
  'M74 143 Q225 99 302 95 T444 142',
]
const drop = 'M249 32 C266 48 282 52 252 65 S218 86 246 99 S285 117 255 132 S220 154 246 167'

export function sketchMarkup(id, lang, image) {
  const t = text[lang],
    spinner = id === 'samara'
  return `<div class="sketch-board" hidden>
    <svg class="flight-sketch" viewBox="0 0 500 200" role="img" aria-label="${t[2]}">
      <path class="course-line" d="${spinner ? drop : glides[0]}"/>
      <circle class="course-start" r="5" cx="${spinner ? 249 : 74}" cy="${spinner ? 32 : 143}"/>
      <g class="course-end"><circle r="8"/><circle r="2"/></g>
      <image class="course-flyer" href="${image}" x="-23" y="-16" width="46" height="32"/>
    </svg>
    <div class="sketch-key"><span>${t[0]}</span><span>${t[1]}</span></div>
    <div class="sketch-tools"><button type="button" class="sketch-play">${t[3]}</button>
      <label>${t[5]}<input class="sketch-position" type="range" min="0" max="100" value="0"></label>
      ${spinner ? '' : '<label>' + t[9] + '<select class="sketch-route">' + glides.map((_, i) => '<option value="' + i + '">' + t[6 + i] + '</option>').join('') + '</select></label>'}
    </div><small>${t[2]}</small></div>`
}

export function mountSketch(root, id, lang) {
  const t = text[lang],
    path = root.querySelector('.course-line'),
    slider = root.querySelector('.sketch-position')
  const play = root.querySelector('.sketch-play'),
    token = root.querySelector('.course-flyer')
  const spinner = id === 'samara'
  let frame = 0
  function draw(fraction) {
    const length = path.getTotalLength()
    const point = path.getPointAtLength(fraction * length)
    const ahead = path.getPointAtLength(Math.min(length, fraction * length + 1))
    const back = path.getPointAtLength(Math.max(0, fraction * length - 1))
    // Butterflies face the top of the sheet. The camera sees an airplane nose down and right.
    const heading = (Math.atan2(ahead.y - back.y, ahead.x - back.x) * 180) / Math.PI
    const angle = spinner
      ? fraction * 1080
      : heading + (id.includes('-') ? -45 : id === 'ring' || id === 'tandem' ? 0 : 90)
    token.setAttribute('transform', 'translate(' + point.x + ' ' + point.y + ') rotate(' + angle + ')')
    slider.value = Math.round(fraction * 100)
  }
  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
    play.textContent = t[3]
    play.setAttribute('aria-pressed', 'false')
  }
  function reset() {
    stop()
    const route = root.querySelector('.sketch-route')
    path.setAttribute('d', spinner ? drop : glides[Number(route.value)])
    const end = path.getPointAtLength(path.getTotalLength())
    root.querySelector('.course-end').setAttribute('transform', 'translate(' + end.x + ' ' + end.y + ')')
    draw(0)
  }
  const route = root.querySelector('.sketch-route')
  if (route) route.onchange = reset
  slider.oninput = () => {
    stop()
    draw(Number(slider.value) / 100)
  }
  play.onclick = () => {
    if (frame) return stop()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches)
      return draw(Number(slider.value) === 100 ? 0 : 1)
    const start = performance.now() - (Number(slider.value) % 100) * 32
    play.textContent = t[4]
    play.setAttribute('aria-pressed', 'true')
    function tick(now) {
      const fraction = Math.min(1, (now - start) / 3200)
      draw(fraction)
      if (fraction < 1) frame = requestAnimationFrame(tick)
      else stop()
    }
    frame = requestAnimationFrame(tick)
  }
  reset()
  return stop
}
