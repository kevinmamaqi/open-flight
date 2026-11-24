// The family supplies the step and its artwork. These controls keep the
// diagram, instructions, available actions and keyboard focus in sync.
export function showFoldStep(
  { figure, progress, title, action, check, previous, next, nextLabel },
  { index, total, count, step, artwork, firstLabel, forwardLabel },
) {
  figure.replaceChildren(artwork)
  progress.textContent = count(index + 1, total)
  title.textContent = step.title
  action.textContent = step.action
  if (check) {
    check.parentElement.hidden = !step.check
    check.textContent = step.check ?? ''
  }
  const focused = document.activeElement
  previous.disabled = index === 0
  const last = index === total - 1
  next.disabled = last && !firstLabel
  if (nextLabel) nextLabel.textContent = last && firstLabel ? firstLabel : forwardLabel
  if (focused === next && next.disabled) previous.focus()
  if (focused === previous && previous.disabled) next.focus()
}

export function foldArtwork(svg) {
  const template = document.createElement('template')
  template.innerHTML = svg
  return template.content
}
