import * as THREE from '../apps/editor/assets/viewer/three.js'

// The site’s minimized Three build exposes the shared vector type through its camera.
const Vector3 = new THREE.OrthographicCamera().position.constructor
import { canvas, shape, makeScene, makeCamera, textureFor } from '../apps/editor/model-scene.js'
const width = 960
const height = 600
const supersample = 1.5
const variants = {
  studio: { light: ['#fffef9', '#e9e3d6'], shadow: true, edge: '#473e33' },
  illustrated: { light: ['#fff9eb', '#f0e2c8'], shadow: false, edge: '#483141' },
  ink: { light: ['#ffffff', '#ffffff'], shadow: false, edge: '#343638' },
}

function background(ctx, style, world, camera) {
  const config = variants[style]
  const gradient = ctx.createRadialGradient(350, 180, 0, 440, 260, 650)
  gradient.addColorStop(0, config.light[0])
  gradient.addColorStop(1, config.light[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  if (!config.shadow) return

  const floor = Math.min(...world.faces.flatMap((face) => face.points.map((p) => p[1]))) - 7
  const silhouette = canvas(width, height)
  const shadow = silhouette.getContext('2d')
  shadow.fillStyle = '#3c342e'
  for (const face of world.faces) {
    shape(shadow, face.points.map(([x, y, z]) => {
      const lift = y - floor
      const p = new Vector3(x + lift * 0.45, floor, z + lift * 0.55).project(camera)
      return [(1 + p.x) * width / 2, (1 - p.y) * height / 2]
    }))
    shadow.fill()
  }
  ctx.save()
  ctx.globalAlpha = 0.22
  ctx.filter = 'blur(14px)'
  ctx.drawImage(silhouette, 0, 0)
  ctx.restore()
}

function drawnEdges(ctx, rendered) {
  // Use the visible, depth-tested silhouette for a felt-tip outline and a hatched
  // offset shadow. The underlying vector decorations remain in their real positions.
  const mask = canvas(width, height)
  const brush = mask.getContext('2d')
  brush.drawImage(rendered, 0, 0, width, height)
  brush.globalCompositeOperation = 'source-in'
  brush.fillStyle = variants.illustrated.edge
  brush.fillRect(0, 0, width, height)

  const hatching = canvas(width, height)
  const pencil = hatching.getContext('2d')
  pencil.drawImage(mask, 9, 14)
  pencil.globalCompositeOperation = 'source-in'
  pencil.strokeStyle = '#a48a72'
  pencil.lineWidth = 1.8
  pencil.beginPath()
  for (let x = -height; x < width; x += 7) {
    pencil.moveTo(x, height)
    pencil.lineTo(x + height, 0)
  }
  pencil.stroke()
  ctx.drawImage(hatching, 0, 0)
  for (const [x, y] of [[-2, 0.7], [1.7, -1.15], [-0.35, -1.55], [1.5, 1.9]]) {
    ctx.drawImage(mask, x, y)
  }
}

let renderer
function renderScene(scene, camera, style, world) {
  renderer ??= new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true })
  renderer.setSize(width * supersample, height * supersample, false)
  renderer.setClearColor(0x000000, 0)
  renderer.render(scene, camera)
  const output = canvas(width, height)
  const ctx = output.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  background(ctx, style, world, camera)
  if (style === 'illustrated') drawnEdges(ctx, renderer.domElement)
  ctx.drawImage(renderer.domElement, 0, 0, width, height)
  return output.toDataURL('image/jpeg', 0.9)
}

export async function renderBookArt(entry, model, styles) {
  const { world } = model
  const result = {}
  for (const style of styles) {
    const studioEye = entry.family === 'airplane' ? [0.9, 1.08, -1.08] : [0.57, 1.4, -1.02]
    const drawnEye = entry.family === 'airplane' ? [0.73, 1.64, -0.86] : [0.38, 2.03, -0.72]
    const eye = new Vector3(...(style === 'illustrated' ? drawnEye : studioEye)).normalize()
    const camera = makeCamera(world, eye)
    const texture = await textureFor(model, style)
    const scene = makeScene(world, style, eye, texture)
    result[style] = renderScene(scene, camera, style, world)
    scene.traverse((object) => {
      object.geometry?.dispose()
      object.material?.dispose()
    })
    texture?.dispose()
  }
  return result
}
