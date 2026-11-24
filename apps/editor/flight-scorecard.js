/** Print an accessible, blank record sheet. Simulated values never populate real results. */
export function printFlightScorecard(circuit, locale) {
  const section = document.createElement('section')
  section.className = 'ofv-scorecard'
  section.lang = locale
  const add = (parent, tag, value) => {
    const node = document.createElement(tag)
    node.textContent = value
    parent.append(node)
    return node
  }
  const words = circuit.scorecard
  add(section, 'h1', words.title)
  for (const key of ['setup', 'rules', 'repeat']) add(section, 'p', words[key])
  const labels = add(section, 'ul', '')
  for (const key of ['design', 'material', 'balance', 'clip', 'height'])
    add(labels, 'li', words[key] + ' ____________________')
  for (const gate of circuit.gates) {
    const group = add(section, 'section', '')
    add(group, 'h2', gate.name)
    add(group, 'p', gate.real)
    const table = add(group, 'table', '')
    const header = table.createTHead().insertRow()
    for (const key of ['launch', 'forward', 'across', 'note']) {
      const cell = add(header, 'th', words[key])
      cell.scope = 'col'
    }
    const tbody = table.createTBody()
    for (let count = 1; count <= 5; count++) {
      const row = tbody.insertRow()
      add(row, 'th', String(count)).scope = 'row'
      for (let col = 0; col < 3; col++) row.insertCell()
    }
  }
  document.querySelector('.ofv-scorecard')?.remove()
  document.body.append(section)
  document.body.classList.add('ofv-printing')
  window.addEventListener('afterprint', () => {
    if (!section.isConnected) return
    section.remove()
    document.body.classList.remove('ofv-printing')
  }, { once: true })
  window.print()
}
