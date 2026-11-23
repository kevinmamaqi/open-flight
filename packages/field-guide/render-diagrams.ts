import { readFileSync, writeFileSync } from 'node:fs'
import { type Point } from '../geometry/butterfly.ts'
import { workshopArt, workshopModels, type WorkshopModel } from '../geometry/workshop.ts'

const assetDirectory = new URL('../../apps/editor/assets/field-guide/', import.meta.url)
const paper = { monarch: '#ffc176', morpho: '#9bdcec', swallowtail: '#f6d966' }

const short = (n: number) => Number(n.toFixed(2))
const svgPath = (points: Point[], closed = false) =>
  'M' + points.map(([x, y]) => short(x) + ' ' + short(y)).join(' L') + (closed ? ' Z' : '')

function cutDiagram(model: WorkshopModel) {
  const { lines, minY, maxY } = workshopArt(model, model.parameters, 'natural', true)
  const marks = lines.filter(line => !line.id.endsWith('-halo'))
  const outline = marks.find(line => line.id === 'cut')!
  const hinges = marks.filter(line => line.id.startsWith('tab-hinge-'))
  const slits = marks.filter(line => line.id.startsWith('tab-slit-'))
  const rightHinge = hinges.find(line => line.id === 'tab-hinge-right')!
  const [inner, outer] = rightHinge.points
  const focusX = (inner[0] + outer[0]) / 2
  const focusY = (inner[1] + outer[1] + model.geometry.tab_depth_mm) / 2
  const scale = Math.min(155 / model.parameters.span_mm, 92 / (maxY - minY))
  const offsetY = 76 - scale * (minY + maxY) / 2
  const detailScale = 67 / Math.hypot(outer[0] - inner[0], outer[1] - inner[1])
  const highlightX = short(92 + scale * focusX)
  const highlightY = short(offsetY + scale * focusY)

  // Both views reuse the same cut outline, four tab slits and two tab hinges.
  const cutPath = svgPath(outline.points, true)
  const slitPaths = slits.map(line => svgPath(line.points)).join(' ')
  const foldPaths = hinges.map(line => svgPath(line.points)).join(' ')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 152" role="img" aria-labelledby="title">
  <title id="title">${model.name} cut outline with a magnified trailing tab and its two cut lines</title>
  <defs>
    <clipPath id="loupe"><circle cx="228" cy="74" r="54"/></clipPath>
    <g id="planform" stroke-linejoin="round" stroke-linecap="round">
      <path d="${cutPath}" fill="${paper[model.species]}" stroke="#3e3848" stroke-width="1.35"/>
      <path d="${slitPaths}" fill="none" stroke="#983d35" stroke-width="1.7"/>
      <path d="${foldPaths}" fill="none" stroke="#383243" stroke-width="1.35" stroke-dasharray="0.15 2.8"/>
    </g>
  </defs>
  <rect width="300" height="152" rx="16" fill="#f3efe8"/>
  <use href="#planform" transform="translate(92 ${short(offsetY)}) scale(${short(scale)})"/>
  <g fill="none" stroke="#766477" stroke-width="1.5">
    <circle cx="${highlightX}" cy="${highlightY}" r="15"/>
    <path d="M${highlightX + 15} ${highlightY} Q160 ${highlightY} 179 91"/>
  </g>
  <g clip-path="url(#loupe)">
    <circle cx="228" cy="74" r="54" fill="#fffaf0"/>
    <use href="#planform" transform="translate(228 74) scale(${short(detailScale)}) translate(${short(-focusX)} ${short(-focusY)})"/>
  </g>
  <circle cx="228" cy="74" r="54" fill="none" stroke="#53485c" stroke-width="2.2"/>
</svg>\n`
}

function foldDiagram(model: WorkshopModel) {
  const angle = model.geometry.target_dihedral_deg
  const radians = (angle * Math.PI) / 180
  const wingLength = 106
  const left = 141
  const right = 159
  const base = 88
  const run = Math.cos(radians) * wingLength
  const tipY = short(base - Math.sin(radians) * wingLength)
  const leftTip = short(left - run)
  const rightTip = short(right + run)
  const arcX = short(right + 45 * Math.cos(radians))
  const arcY = short(base - 45 * Math.sin(radians))
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 152" role="img" aria-labelledby="title">
  <title id="title">${model.name} seen from behind, each wing lifted ${angle} degrees above the flat middle strip</title>
  <rect width="300" height="152" rx="16" fill="#eaf0e6"/>
  <path d="M25 ${base}h250" fill="none" stroke="#7d8176" stroke-width="1.6" stroke-dasharray="4 5"/>
  <path d="M${leftTip} ${tipY} L${left} ${base} H${right} L${rightTip} ${tipY} L${rightTip} ${tipY + 4} L${right} ${base + 5} H${left} L${leftTip} ${tipY + 4}z" fill="${paper[model.species]}" stroke="#3e3848" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M${right} ${base}h45 A45 45 0 0 0 ${arcX} ${arcY}z" fill="#d05b4b" fill-opacity=".4"/>
  <path d="M204 ${base} A45 45 0 0 0 ${arcX} ${arcY}" fill="none" stroke="#a34b3f" stroke-width="1.8"/>
  <g fill="#fbf8e9" stroke="#514253" stroke-width="1.6">
    <circle cx="${left}" cy="${base}" r="3.4"/><circle cx="${right}" cy="${base}" r="3.4"/>
  </g>
  <g fill="none" stroke="#33775e" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M55 110q-14-13-14-30m-5 6 5-6 5 5"/>
    <path d="M245 110q14-13 14-30m5 6-5-6-5 5"/>
  </g>
  <rect x="193" y="100" width="45" height="23" rx="10" fill="#fbf8e9"/>
  <text x="215.5" y="116" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" fill="#783c36">${angle}°</text>
</svg>\n`
}

const checkOnly = process.argv.includes('--check')
for (const model of workshopModels) {
  for (const [name, svg] of [['cut', cutDiagram(model)], ['fold', foldDiagram(model)]]) {
    const target = new URL(`${name}-${model.species}.svg`, assetDirectory)
    if (checkOnly) {
      if (readFileSync(target, 'utf8') !== svg) throw Error('Outdated field guide diagram: ' + target.pathname)
    } else {
      writeFileSync(target, svg)
    }
  }
}
