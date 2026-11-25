import { useFont } from '../../apps/editor/assets/brand/print.js'
import { modelOrigin, relatedPilotStories } from '../../apps/editor/model-origins.js'

const copy = {
  en: { atlas:'Flight atlas', aircraft:'Aircraft history', nature:'Butterfly field notes', place:'Where and when', habitat:'Where to find it', machine:'What changed?', wild:'Look closely', team:'Who worked on it?', people:'From the pilot archive', sources:'Explore the sources' },
  es: { atlas:'Atlas de vuelo', aircraft:'Historia de la aviación', nature:'Cuaderno de mariposas', place:'Dónde y cuándo', habitat:'Dónde vive', machine:'¿Qué cambió?', wild:'Mira de cerca', team:'¿Quién participó?', people:'Del archivo de pilotos', sources:'Explora las fuentes' },
  ru: { atlas:'Атлас полётов', aircraft:'История самолёта', nature:'Полевые заметки', place:'Где и когда', habitat:'Где обитает', machine:'Что изменилось?', wild:'Присмотрись', team:'Кто создавал самолёт?', people:'Из архива лётчиков', sources:'Узнать больше' },
}

export async function loadOriginArt(plan, lang, loadAsset) {
  const entries = plan.originPages.map(({model}) => modelOrigin(model, lang))
  const [world, ...photos] = await Promise.all([
    loadAsset('assets/origins/world-land.png'),
    ...entries.filter(entry => entry.kind === 'butterfly').map(async entry =>
      [entry.id, await loadAsset('assets/field-guide/' + entry.illustration.file)]),
  ])
  return { world, photos:new Map(photos) }
}

export function drawOriginPages(doc, book, plan, layout, { world, photos }) {
  const { lang } = book
  const t = copy[lang]
  const { h, left, right, width, ink, accent, wash, image, folio, text, wrap } = layout
  const featuredPilots = new Set()
  const note = (value, x, y) => text(value, x, y, 9, { color:accent, weight:'bold' })

  for (const { id, model, number } of plan.originPages) {
    const entry = modelOrigin(model, lang)
    const airplane = entry.kind === 'airplane'
    doc.addPage()
    text('Open Flight', left, 18, 10, { weight:'display', color:ink })
    text(t.atlas, right, 18, 10, { align:'right', weight:'bold', color:accent })
    doc.setDrawColor(accent).setLineWidth(0.3).line(left, 23, right, 23)
    note(airplane ? t.aircraft : t.nature, left, 32)
    text(entry.model, left, 45, 28, { weight:'display' })

    const pictureWidth = width * 0.52
    const mapX = left + pictureWidth + 6
    const mapWidth = right - mapX
    const mapY = 58
    const pictureY = 52
    const pictureHeight = pictureWidth * 5 / 8
    if (photos.has(model)) {
      const photo = photos.get(model)
      const { width:sourceW, height:sourceH } = doc.getImageProperties(photo)
      const scale = Math.min(pictureWidth / sourceW, (pictureHeight - 8) / sourceH)
      const photoW = sourceW * scale, photoH = sourceH * scale
      doc.addImage(photo, 'JPEG', left + (pictureWidth - photoW) / 2, pictureY, photoW, photoH, entry.illustration.file)
      const caption = entry.scientificName + ' · ' + entry.illustration.credit
      text(caption, left, pictureY + photoH + 4, 8, { color:accent })
      doc.link(left, pictureY + photoH, pictureWidth, 5, { url:entry.illustration.url })
    } else {
      image(id, left, pictureY, pictureWidth)
    }
    doc.addImage(world, 'PNG', mapX, mapY, mapWidth, mapWidth / 2, 'open-flight-world-map')
    for (const { lon, lat } of entry.locations) {
      const x = mapX + (lon + 180) / 360 * mapWidth
      const y = mapY + (90 - lat) / 180 * mapWidth / 2
      doc.setFillColor(accent).setDrawColor(ink).setLineWidth(0.45).circle(x, y, 1.6, 'FD')
    }
    text('Natural Earth', right, mapY + mapWidth / 2 + 4, 7, { align:'right', color:accent })

    const pilots = relatedPilotStories(model, lang)
    const pilot = pilots.find(item => !featuredPilots.has(item.id))
    if (pilot) featuredPilots.add(pilot.id)
    const sources = [...entry.sources, ...(pilot?.sources || [])]
    const sourceY = h - 26 - sources.length * 5
    const blocks = [
      { title:airplane ? t.place : t.habitat, value:[entry.locations[0].label, entry.place, entry.date].filter(Boolean).join(' · '), bold:true },
      { value:entry.story },
      { title:airplane ? t.machine : t.wild, value:entry.discovery },
    ]
    if (entry.people.length) blocks.push({title:t.team, value:entry.people.map(({name,role}) => name + ' — ' + role).join(' · ')})
    if (entry.specimen) blocks.push({ value:entry.specimen })
    if (pilot) blocks.push({ title:t.people, value:pilot.model + ' · ' + pilot.date + '. ' + pilot.story + ' ' + pilot.discovery })
    let size = 12
    // Fit translated paragraphs above the source notes on either paper size.
    const setLines = () => blocks.map(block => ({ ...block, lines:wrap(block.value, size, width - 6, block.bold ? 'bold' : 'normal') }))
    let lines = setLines()
    const blockHeight = block => (block.title ? 6 : 0) + block.lines.length * size * 0.41 + 3.8
    const start = 55 + pictureWidth * 5 / 8 + 6
    while (size > 9 && lines.reduce((y, block) => y + blockHeight(block), start) > sourceY - 5) {
      size -= 0.25
      lines = setLines()
    }
    let y = start
    for (const block of lines) {
      if (block.title) { note(block.title, left, y); y += 6 }
      text(block.lines, left, y, size, { color:ink, weight:block.bold ? 'bold' : 'normal' })
      y += block.lines.length * size * 0.41 + 3.8
    }
    doc.setDrawColor(accent).setLineWidth(0.3).line(left, sourceY - 4.8, right, sourceY - 4.8)
    note(t.sources, left + 2, sourceY)
    sources.forEach(({label, url}, index) => {
      let short = label
      useFont(doc, 'text')
      doc.setFontSize(9)
      const host = new URL(url).hostname.replace(/^www\./, '')
      const suffix = ' · ' + host
      while (short.length && doc.getTextWidth(short + suffix) > width - 6) short = short.slice(0,-1)
      const title = (short === label ? short : short.trimEnd() + '…') + suffix
      const lineY = sourceY + 5 + index * 5
      text(title, left + 2, lineY, 9)
      doc.link(left + 2, lineY - 3.7, width - 4, 4.5, { url })
    })
    folio(number, t.atlas)
  }
}
