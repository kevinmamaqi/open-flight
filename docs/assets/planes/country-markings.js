// Classroom markings for the original paper models of these four passenger aircraft.
// U.S. flag proportions: https://www.archives.gov/federal-register/codification/executive-order/10834.html
// Soviet flag description: USSR Presidium decree of 31 March 1980, reproduced in
// https://www.marxists.org/history/ussr/government/1982/ussr-sixty-years-of-union-1922-1982.pdf
import { aircraftHeritage } from './heritage.js?v=674464fb115d'

const wingMarkPosition = { 'boeing-747': 0.54, 'douglas-dc3': 0.4 }
const us = ['#B31942', '#FFFFFF', '#0A3161']
const ussr = ['#CC0000', '#FFD700', '#AA0000']

export const planeFlagCountry = (id) => aircraftHeritage[id]?.country.toLowerCase()
export const planeFlagColors = (id) => planeFlagCountry(id) === 'us' ? [...us] : [...ussr]

const polygon = (points, fill) => ({ type: 'polygon', points, fill, stroke: 'none', sw: 0 })
const rectangle = (x, y, w, h, fill) =>
  polygon([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], fill)

function star(x, y, radius, fill) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const theta = (i * Math.PI) / 5 - Math.PI / 2
    const r = i % 2 === 0 ? radius : radius * 0.382
    return [x + r * Math.cos(theta), y + r * Math.sin(theta)]
  })
  return polygon(points, fill)
}

function americanFlag(year) {
  const [red, white, blue] = us
  const height = 1
  const width = 1.9
  const stripe = height / 13
  const cantonWidth = 0.76
  const cantonHeight = 7 * stripe
  const parts = [rectangle(0, 0, width, height, white)]
  for (let i = 0; i < 13; i += 2) parts.push(rectangle(0, i * stripe, width, stripe, red))
  parts.push(rectangle(0, 0, cantonWidth, cantonHeight, blue))
  const early = year < 1960
  const rows = early ? 6 : 9
  for (let row = 0; row < rows; row++) {
    const columns = early ? 8 : 6 - (row % 2)
    for (let col = 0; col < columns; col++) {
      const x = (col + (early ? 0.5 : 0.5 + (row % 2) * 0.5)) * cantonWidth / (early ? 8 : 6)
      const y = (row + 0.5) * cantonHeight / rows
      parts.push(star(x, y, 0.0308, white))
    }
  }
  return parts
}

function sovietFlag() {
  const [red, gold] = ussr
  const arc = (x, y, rx, ry, start, end) =>
    Array.from({ length: 15 }, (_, i) => {
      const theta = (start + (end - start) * i / 14) * Math.PI / 180
      return [x + rx * Math.cos(theta), y + ry * Math.sin(theta)]
    })
  return [
    rectangle(0, 0, 2, 1, red),
    star(0.25, 0.16, 0.049, gold),
    star(0.25, 0.16, 0.032, red),
    polygon([
      ...arc(0.251, 0.315, 0.107, 0.109, -50, 142),
      ...arc(0.238, 0.307, 0.082, 0.082, 130, -50),
    ], gold),
    polygon([[0.158, 0.387], [0.178, 0.408], [0.139, 0.455], [0.115, 0.434]], gold),
    polygon([[0.211, 0.297], [0.228, 0.279], [0.359, 0.421], [0.339, 0.439]], gold),
    polygon([[0.176, 0.288], [0.231, 0.235], [0.261, 0.258], [0.204, 0.313]], gold),
  ]
}

export function flagDecals(plan) {
  const prototype = aircraftHeritage[plan.model_id]
  const { width_mm: w, height_mm: h } = plan.dimensions
  const american = prototype.country === 'US'
  const ratio = american ? 1.9 : 2
  const badgeHeight = w * (american ? 0.217 : 0.18) / ratio
  // These two patches sit on the exposed face of the final stock. The Tu-144's long
  // diagonals cover the front, so the Soviet models use the uninterrupted rear band.
  const y = american ? h * wingMarkPosition[plan.model_id] : h - 53
  const art = american ? americanFlag(Number(prototype.firstFlight.slice(0, 4))) : sovietFlag()
  return [0.265, 0.735].flatMap(center => {
    const x = w * center - badgeHeight * ratio / 2
    return art.map(part => ({
      ...part,
      points: part.points.map(([u, v]) => [x + u * badgeHeight, y + v * badgeHeight]),
    }))
  })
}
