const NS = 'http://www.w3.org/2000/svg'
const WIDTH = 500
const home = { x: WIDTH / 2, y: 232 }

export function turnMessage(parameters) {
  const { left_trim_deg: left, right_trim_deg: right } = parameters
  if (left > right) return 'sketchLeft'
  if (right > left) return 'sketchRight'
  if (left > 0) return 'sketchNeutralPitchUp'
  if (left < 0) return 'sketchNeutralPitchDown'
  return 'sketchStraight'
}

// A top-view drawing of the requested differential trim. It has no physical distance or time scale.
export function drawGlide(parameters, species, translate) {
  const left = parameters.left_trim_deg ?? 0
  const right = parameters.right_trim_deg ?? 0
  const bend = Math.max(-1, Math.min(1, (right - left) / 12))
  const x = Math.round(WIDTH / 2 + bend * 160)
  const path = document.getElementById('glide-path')
  path.setAttribute('d', 'M250 232 C250 163 ' + Math.round(250 + bend * 35) + ' 84 ' + x + ' 38')
  for (const id of ['monarch', 'morpho', 'swallowtail']) {
    document.getElementById('cue-' + id).toggleAttribute('hidden', id !== species)
  }
  const challenge = translate(species + 'Challenge'),
    prediction = translate(turnMessage(parameters))
  document.getElementById('challenge-label').textContent = challenge
  document.getElementById('trim-prediction').textContent = prediction
  document.getElementById('glide-desc').textContent =
    translate('mapAlt') + ' ' + challenge + '. ' + prediction
  resetToken()
}

function resetToken() {
  const token = document.getElementById('glider-token')
  for (const animation of token.querySelectorAll('animateMotion')) animation.remove()
  document
    .getElementById('glider-image')
    .setAttribute('transform', 'translate(' + home.x + ' ' + home.y + ')')
}

export function playGlide() {
  const token = document.getElementById('glider-token')
  const image = document.getElementById('glider-image')
  const path = document.getElementById('glide-path')
  resetToken()
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const end = path.getPointAtLength(path.getTotalLength())
    image.setAttribute('transform', 'translate(' + end.x + ' ' + end.y + ')')
    return
  }
  // SVG assumes the moving object points right. Rotate the nose-up illustration into that convention.
  image.setAttribute('transform', 'rotate(90)')
  const motion = document.createElementNS(NS, 'animateMotion')
  motion.setAttribute('path', path.getAttribute('d'))
  motion.setAttribute('dur', '1.55s')
  motion.setAttribute('begin', 'indefinite')
  motion.setAttribute('rotate', 'auto')
  motion.setAttribute('fill', 'freeze')
  token.append(motion)
  motion.beginElement()
}
