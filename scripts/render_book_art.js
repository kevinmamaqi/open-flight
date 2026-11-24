import * as THREE from '../apps/editor/assets/viewer/three.js'

// The site’s minimized Three build exposes the shared vector type through its camera.
const Vector3 = new THREE.OrthographicCamera().position.constructor
const width = 960
const height = 600
const supersample = 1.5
const variants = {
  studio: { light: ['#fffef9', '#e9e3d6'], shadow: true, edge: '#473e33' },
  illustrated: { light: ['#f6fbfa', '#dcece7'], shadow: true, edge: '#29484a' },
  ink: { light: ['#ffffff', '#ffffff'], shadow: false, edge: '#343638' },
}

function canvas(w, h) {
  return Object.assign(document.createElement('canvas'), { width: w, height: h })
}

function shape(ctx, points) {
  ctx.beginPath()
  ctx.moveTo(...points[0])
  for (const point of points.slice(1)) ctx.lineTo(...point)
  ctx.closePath()
}

async function loadImage(url) {
  const image = new Image()
  image.src = url
  await image.decode()
  return image
}

function paperTexture({ decoration, stock }, ink) {
  const [w, h] = stock
  const scale = 4
  const surface = canvas(w * scale, h * scale)
  const ctx = surface.getContext('2d')
  ctx.scale(scale, scale)
  ctx.fillStyle = ink ? '#ffffff' : '#fff7e6'
  ctx.fillRect(0, 0, w, h)
  for (const part of decoration) {
    shape(ctx, part.points)
    if (ink) {
      ctx.strokeStyle = '#686c70'
      ctx.lineWidth = 0.35
      ctx.stroke()
    } else {
      ctx.fillStyle = part.fill
      ctx.fill()
    }
  }
  return surface
}

async function textureFor(model, style) {
  const { svg, inkSvg, stock, world, coloring } = model
  const ink = style === 'ink'
  let surface
  if (stock) surface = paperTexture(model, ink)
  else if (svg) {
    surface = await loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(ink ? inkSvg : svg))
  } else surface = await loadImage(ink ? coloring : world.faces[0].image)
  if (style === 'illustrated') {
    const wash = canvas(surface.width, surface.height)
    const brush = wash.getContext('2d')
    brush.filter = 'saturate(0.82) contrast(1.12)'
    brush.drawImage(surface, 0, 0)
    surface = wash
  }
  const texture = new THREE.CanvasTexture(surface)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function printedSide(face, eye, triples) {
  if (!face.singleSidedPrint) return true
  const [a, b, c] = triples[0]
  const [u, v, w] = [a, b, c].map((index) => face.uv[index])
  const area = (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0])
  const [p, q, r] = [a, b, c].map((index) => new Vector3(...face.points[index]))
  return area * q.sub(p).cross(r.sub(p)).dot(eye) >= 0
}

function makeScene(world, style, eye, texture) {
  const scene = new THREE.Scene()
  const ink = style === 'ink'
  const drawn = style === 'illustrated'
  scene.add(new THREE.AmbientLight(0xffffff, ink ? Math.PI : drawn ? 2.03 : 1.65))
  const lights = [
    [0xfff3d8, drawn ? 0.4 : 1.18, [-180, 300, -160]],
    [0xe3efff, drawn ? 0.3 : 0.44, [160, 40, 130]],
  ]
  for (const [color, energy, position] of ink ? [] : lights) {
    const source = new THREE.DirectionalLight(color, energy)
    source.position.set(...position)
    scene.add(source)
  }
  for (const face of world.faces) {
    const triples = THREE.ShapeUtils.triangulateShape(
      face.flat.map(([x, y]) => new THREE.Vector2(x, y)), [],
    )
    if (!triples.length) continue
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(face.points.flat(), 3))
    geometry.setIndex(triples.flat())
    geometry.computeVertexNormals()
    if (face.uv) geometry.setAttribute('uv', new THREE.Float32BufferAttribute(face.uv.flat(), 2))
    const map = face.uv && printedSide(face, eye, triples) ? texture : null
    const params = {
      color: map || ink ? '#ffffff' : '#f7ebd5',
      side: THREE.DoubleSide,
      map,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 2,
    }
    scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ ...params, flatShading: true })))
    const edge = [...face.points, face.points[0]].map((point) => new Vector3(...point))
    const edgeGeometry = new THREE.BufferGeometry().setFromPoints(edge)
    scene.add(new THREE.Line(edgeGeometry, new THREE.LineBasicMaterial({
      color: variants[style].edge,
      transparent: !ink,
      opacity: ink ? 1 : drawn ? 0.66 : 0.23,
    })))
  }
  for (const wire of world.lines) {
    const radius = ink ? 0.31 : 0.46
    const points = wire.points.map((point) => new Vector3(...point))
    const vertices = points.flatMap((point, i) => {
      const next = points[Math.min(i + 1, points.length - 1)]
      const previous = points[Math.max(i - 1, 0)]
      const axial = next.clone().sub(previous).normalize()
      const radial = axial.clone().cross(new Vector3(1, 0, 0)).normalize()
      return Array.from({ length: 8 }, (_, side) =>
        radial.clone().applyAxisAngle(axial, side * Math.PI / 4)
          .multiplyScalar(radius).add(point).toArray()).flat()
    })
    const indices = points.slice(1).flatMap((_, row) =>
      Array.from({ length: 8 }, (_, side) => {
        const a = row * 8 + side
        const b = row * 8 + (side + 1) % 8
        return [a, b, a + 8, b, b + 8, a + 8]
      }).flat())
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: ink ? '#393a3d' : '#b4bac0',
      side: THREE.DoubleSide,
    })))
  }
  return scene
}

function makeCamera(world, eye) {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1200)
  camera.position.copy(eye).multiplyScalar(650)
  camera.lookAt(0, 0, 0)
  camera.updateMatrixWorld()
  const points = world.faces.flatMap((face) => face.points.map((v) =>
    new Vector3(...v).applyMatrix4(camera.matrixWorldInverse)))
  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const [left, right] = [Math.min(...xs), Math.max(...xs)]
  const [bottom, top] = [Math.min(...ys), Math.max(...ys)]
  const scale = Math.min(width * 0.81 / (right - left), height * 0.76 / (top - bottom))
  const centerX = (left + right) / 2
  const centerY = (top + bottom) / 2 - 10 / scale
  Object.assign(camera, {
    left: centerX - width / 2 / scale,
    right: centerX + width / 2 / scale,
    top: centerY + height / 2 / scale,
    bottom: centerY - height / 2 / scale,
  })
  camera.updateProjectionMatrix()
  return camera
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
  shadow.fillStyle = style === 'studio' ? '#3c342e' : '#346961'
  for (const face of world.faces) {
    shape(shadow, face.points.map(([x, y, z]) => {
      const lift = y - floor
      const p = new Vector3(x + lift * 0.45, floor, z + lift * 0.55).project(camera)
      return [(1 + p.x) * width / 2, (1 - p.y) * height / 2]
    }))
    shadow.fill()
  }
  ctx.save()
  ctx.globalAlpha = style === 'studio' ? 0.22 : 0.15
  ctx.filter = style === 'studio' ? 'blur(14px)' : 'blur(1.5px)'
  ctx.drawImage(silhouette, 0, 0)
  ctx.restore()
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
  ctx.drawImage(renderer.domElement, 0, 0, width, height)
  return output.toDataURL('image/jpeg', 0.9)
}

export async function renderBookArt(entry, model) {
  const { world } = model
  const eye = new Vector3(
    ...(entry.family === 'airplane' ? [0.9, 1.08, -1.08] : [0.57, 1.4, -1.02]),
  ).normalize()
  const camera = makeCamera(world, eye)
  const result = {}
  for (const style of Object.keys(variants)) {
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
