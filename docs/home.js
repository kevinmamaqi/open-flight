// The cover turns through the book's plates. Without this script it shows plate B1.
const cover = document.querySelector('[data-cover]')
if (cover) {
  const { label, plates } = JSON.parse(cover.querySelector('[data-cover-plates]').textContent)
  let index = Math.max(0, plates.findIndex(plate => plate.id === 'B1'))
  const show = () => {
    const plate = plates[index]
    cover.querySelector('[data-cover-image]').src = plate.src
    cover.querySelector('[data-cover-image]').alt = plate.name
    cover.querySelector('[data-cover-link]').href = plate.href
    cover.querySelector('[data-cover-id]').textContent = label + ' ' + plate.id
    cover.querySelector('[data-cover-name]').textContent = plate.name
    cover.querySelector('[data-cover-lineage]').textContent = plate.lineage
  }
  cover.addEventListener('click', event => {
    const button = event.target.closest('[data-cover-step]')
    if (!button) return
    index = (index + Number(button.dataset.coverStep) + plates.length) % plates.length
    show()
  })
}

// Links to the former workshop home keep working: its anchors now live elsewhere.
const moved = { library: 'print/', designs: '#contents', 'flying-objects': 'flying-objects/', 'family-book': 'flight-book/', learn: '#one-sheet' }
const target = moved[location.hash.slice(1)]
if (target) {
  const lang = document.documentElement.lang
  const prefix = lang === 'en' ? './' : './' + lang + '/'
  if (target.startsWith('#')) location.replace(target)
  else location.replace(prefix + target)
}
