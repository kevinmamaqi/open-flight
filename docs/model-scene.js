import * as THREE from './assets/viewer/three.js?v=efdc141e4945'

// The site’s minimized Three build exposes the shared vector type through its camera.
const Vector3 = new THREE.OrthographicCamera().position.constructor
export function canvas(w, h) {
  return Object.assign(document.createElement('canvas'), { width: w, height: h })
}

export function shape(ctx, points) {
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

export async function textureFor(model, style) {
  const { svg, inkSvg, stock, world, coloring } = model
  const ink = style === 'ink'
  let surface
  if (!model.textureUrl && !stock && !svg && !coloring && !world.faces[0].image) return null
  if (model.textureUrl && !ink) surface = await loadImage(model.textureUrl)
  else if (model.textureUrl) return null
  else if (stock) surface = paperTexture(model, ink)
  else if (svg) {
    surface = await loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(ink ? inkSvg : svg))
  } else surface = await loadImage(ink ? coloring : world.faces[0].image)
  if (style === 'illustrated') {
    const wash = canvas(surface.width, surface.height)
    const brush = wash.getContext('2d')
    brush.filter = 'saturate(0.94) contrast(1.03)'
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

export function makeScene(world, style, eye, texture) {
  const scene = new THREE.Scene()
  const ink = style === 'ink'
  const drawn = style === 'illustrated'
  scene.add(new THREE.AmbientLight(0xffffff, ink || drawn ? Math.PI : 1.65))
  const lights = [
    [0xfff3d8, 1.18, [-180, 300, -160]],
    [0xe3efff, 0.44, [160, 40, 130]],
  ]
  for (const [color, energy, position] of ink || drawn ? [] : lights) {
    const source = new THREE.DirectionalLight(color, energy)
    source.position.set(...position)
    scene.add(source)
  }
  for (const face of world.faces) {
    const triples = THREE.ShapeUtils.triangulateShape(
      face.flat.map(([x, y]) => new THREE.Vector2(x, y)),
      [],
    )
    if (!triples.length) continue
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(face.points.flat(), 3))
    geometry.setIndex(triples.flat())
    geometry.computeVertexNormals()
    if (face.uv) geometry.setAttribute('uv', new THREE.Float32BufferAttribute(face.uv.flat(), 2))
    const map = face.uv && printedSide(face, eye, triples) ? texture : null
    const params = {
      color: map || ink ? '#ffffff' : (face.color ?? (drawn ? '#ddcbb1' : '#f7ebd5')),
      side: THREE.DoubleSide,
      map,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 2,
    }
    scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ ...params, flatShading: true })))
    if (face.smooth) continue
    const edge = [...face.points, face.points[0]].map((point) => new Vector3(...point))
    const edgeGeometry = new THREE.BufferGeometry().setFromPoints(edge)
    scene.add(
      new THREE.Line(
        edgeGeometry,
        new THREE.LineBasicMaterial({
          color: { ink: '#343638', illustrated: '#483141', studio: '#473e33' }[style],
          transparent: !ink,
          opacity: face.color && !face.uv ? 0.07 : ink ? 1 : drawn ? 0.89 : 0.23,
        }),
      ),
    )
  }
  for (const wire of world.lines) {
    const radius = ink ? 0.31 : drawn ? 0.54 : 0.46
    const points = wire.points.map((point) => new Vector3(...point))
    const vertices = points.flatMap((point, i) => {
      const next = points[Math.min(i + 1, points.length - 1)]
      const previous = points[Math.max(i - 1, 0)]
      const axial = next.clone().sub(previous).normalize()
      const radial = axial
        .clone()
        .cross(new Vector3(1, 0, 0))
        .normalize()
      return Array.from({ length: 8 }, (_, side) =>
        radial
          .clone()
          .applyAxisAngle(axial, (side * Math.PI) / 4)
          .multiplyScalar(radius)
          .add(point)
          .toArray(),
      ).flat()
    })
    const indices = points.slice(1).flatMap((_, row) =>
      Array.from({ length: 8 }, (_, side) => {
        const a = row * 8 + side
        const b = row * 8 + ((side + 1) % 8)
        return [a, b, a + 8, b, b + 8, a + 8]
      }).flat(),
    )
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    scene.add(
      new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({
          color: ink ? '#393a3d' : drawn ? '#6c5360' : '#b4bac0',
          side: THREE.DoubleSide,
        }),
      ),
    )
  }
  return scene
}

export function makeCamera(world, eye, width = 960, height = 600) {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1200)
  camera.position.copy(eye).multiplyScalar(650)
  camera.lookAt(0, 0, 0)
  camera.updateMatrixWorld()
  const points = world.faces.flatMap((face) =>
    face.points.map((v) => new Vector3(...v).applyMatrix4(camera.matrixWorldInverse)),
  )
  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const [left, right] = [Math.min(...xs), Math.max(...xs)]
  const [bottom, top] = [Math.min(...ys), Math.max(...ys)]
  const scale = Math.min((width * 0.81) / (right - left), (height * 0.76) / (top - bottom))
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
