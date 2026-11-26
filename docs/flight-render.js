const dot = (p, v) => p[0] * v[0] + p[1] * v[1] + p[2] * v[2]
export function framing(world, state, width, height, angle) {
  const yaw = angle[0],
    elev = angle[1],
    sy = Math.sin(yaw),
    cy = Math.cos(yaw),
    se = Math.sin(elev),
    ce = Math.cos(elev)
  const right = [cy, 0, -sy],
    up = [-sy * se, ce, -cy * se],
    eye = [sy * ce, se, cy * ce]
  const bounds = []
  if (state.mode === 'flight') {
    bounds.push(...world.bounds)
  } else {
    // Use the whole unfolded envelope while a fold is being scrubbed, so the camera holds still.
    // The first butterfly step shows the surrounding sheet and real 50 mm scale.
    const d = state.planes,
      sw =
        state.family === 'airplane'
          ? (d?.width ?? 210)
          : state.stage === 0
            ? 214
            : (state.parameters?.span_mm ?? 174)
    const sl = state.family === 'airplane' ? (d?.height ?? 297) : state.stage === 0 ? 297 : 103
    for (const x of [-sw / 2, sw / 2]) for (const z of [-sl / 2, sl / 2]) bounds.push([x, 0, z])
    if (state.family === 'airplane' && state.stage > 0)
      for (const f of world.faces) for (const p of f.points) bounds.push(p)
    else if (state.stage > 0) bounds.push([0, 36, 0])
  }
  const xs = bounds.map((p) => dot(p, right)),
    ys = bounds.map((p) => dot(p, up))
  const xmin = Math.min(...xs),
    xmax = Math.max(...xs),
    ymin = Math.min(...ys),
    ymax = Math.max(...ys)
  const mx = (xmin + xmax) / 2,
    my = (ymin + ymax) / 2
  const center = right.map((n, i) => n * mx + up[i] * my)
  const scale = Math.min(
    (width * 0.88) / Math.max(1, xmax - xmin),
    (height * 0.86) / Math.max(1, ymax - ymin),
  )
  return {
    right,
    up,
    eye,
    center,
    scale,
    width,
    height,
    project(p) {
      return [
        width / 2 + (dot(p, right) - mx) * scale,
        height / 2 - (dot(p, up) - my) * scale,
        dot(p, eye),
      ]
    },
  }
}
function path(ctx, points, close) {
  if (!points.length) return
  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])
  for (const p of points.slice(1)) ctx.lineTo(p[0], p[1])
  if (close) ctx.closePath()
}
function printedSide(face, eye) {
  if (!face.singleSidedPrint) return true
  const origin = face.uv[0],
    a = face.points[0]
  for (let i = 1; i < face.points.length - 1; i++) {
    const u = face.uv[i],
      v = face.uv[i + 1],
      parity = (u[0] - origin[0]) * (v[1] - origin[1]) - (u[1] - origin[1]) * (v[0] - origin[0])
    if (Math.abs(parity) < 1e-8) continue
    const b = face.points[i].map((n, k) => n - a[k]),
      c = face.points[i + 1].map((n, k) => n - a[k])
    return (
      parity *
        dot([b[1] * c[2] - b[2] * c[1], b[2] * c[0] - b[0] * c[2], b[0] * c[1] - b[1] * c[0]], eye) >=
      0
    )
  }
  return false
}
function paintPanel(ctx, f, visible, image) {
  path(ctx, visible, true)
  ctx.fillStyle = f.color
  ctx.fill()
  if (!image || !f.uv) return
  const uv = f.uv.map(([u, v]) => [u * image.width, (1 - v) * image.height])
  const a = uv[0],
    p = visible[0]
  let b = 1,
    c = 2
  // Use a well-separated triangle. A local curved outline may begin with collinear samples.
  let area = 0
  for (let i = 1; i < uv.length - 1; i++) {
    const j = Math.floor((i + uv.length) / 2),
      measure = (uv[i][0] - a[0]) * (uv[j][1] - a[1]) - (uv[i][1] - a[1]) * (uv[j][0] - a[0])
    if (Math.abs(measure) > Math.abs(area)) {
      area = measure
      b = i
      c = j
    }
  }
  if (Math.abs(area) < 0.01) return
  const bx = uv[b][0] - a[0],
    by = uv[b][1] - a[1],
    cx = uv[c][0] - a[0],
    cy = uv[c][1] - a[1]
  const px = visible[b][0] - p[0],
    py = visible[b][1] - p[1],
    qx = visible[c][0] - p[0],
    qy = visible[c][1] - p[1]
  const xx = (px * cy - qx * by) / area,
    xy = (py * cy - qy * by) / area,
    yx = (qx * bx - px * cx) / area,
    yy = (qy * bx - py * cx) / area
  ctx.save()
  ctx.clip()
  ctx.transform(xx, xy, yx, yy, p[0] - xx * a[0] - yx * a[1], p[1] - xy * a[0] - yy * a[1])
  ctx.drawImage(image, 0, 0)
  ctx.restore()
}
export function diagramRenderer(canvas) {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw Error('Canvas 2D unavailable')
  return {
    draw(world, frame, getImage) {
      const dpr = Math.min(globalThis.devicePixelRatio || 1, 2),
        w = Math.round(frame.width * dpr),
        h = Math.round(frame.height * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, frame.width, frame.height)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      const line = (l) => {
        path(ctx, l.points.map(frame.project), false)
        ctx.strokeStyle = l.color
        ctx.lineWidth = l.dash ? 1.3 : 1.45
        ctx.setLineDash(l.dash ? [3.5, 3] : [])
        ctx.stroke()
        ctx.setLineDash([])
      }
      const panels = world.faces.map((f) => {
        const pts = f.points.map(frame.project)
        return { f, pts, depth: pts.reduce((sum, p) => sum + p[2], 0) / pts.length }
      })
      const drawPanel = (e) =>
        paintPanel(ctx, e.f, e.pts, printedSide(e.f, frame.eye) ? getImage(e.f.image) : null)
      const ground = panels
        .filter((e) => e.f.ground !== undefined)
        .sort((a, b) => a.f.ground - b.f.ground)
      ground.forEach(drawPanel)
      const foreground = []
      for (const l of world.lines) {
        if (l.points.every((p) => p[1] < 0)) line(l)
        else foreground.push(l)
      }
      panels
        .filter((e) => e.f.ground === undefined)
        .sort((a, b) => a.depth - b.depth)
        .forEach(drawPanel)
      for (const l of foreground) line(l)
    },
    dispose() {},
  }
}

export async function spatialRenderer(canvas) {
  const T = await import('./assets/viewer/three.js?v=efdc141e4945')
  const ctx = canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: true })
  if (!ctx) throw Error('WebGL 2 unavailable')
  const renderer = new T.WebGLRenderer({ canvas, context: ctx, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2))
  renderer.setClearColor(0, 0)
  const scene = new T.Scene(),
    camera = new T.OrthographicCamera(-100, 100, 100, -100, 1, 2000)
  scene.add(new T.AmbientLight(0xffffff, 2.1))
  const sun = new T.DirectionalLight(0xfffcf1, 1.22)
  sun.position.set(-160, 360, 190)
  scene.add(sun)
  const meshSlots = [],
    lineSlots = [],
    textures = new Map(),
    topology = new WeakMap()
  let w = 0,
    h = 0
  function index(flat) {
    if (!topology.has(flat))
      topology.set(
        flat,
        T.ShapeUtils.triangulateShape(
          flat.map(([x, y]) => new T.Vector2(x, y)),
          [],
        ).flat(),
      )
    return topology.get(flat)
  }
  function attribute(geometry, name, values, dimensions) {
    const old = geometry.getAttribute(name)
    if (old && old.array.length === values.length) {
      old.array.set(values)
      old.needsUpdate = true
    } else geometry.setAttribute(name, new T.Float32BufferAttribute(values, dimensions))
  }
  const addMesh = () => {
    const mesh = new T.Mesh(
      new T.BufferGeometry(),
      new T.MeshLambertMaterial({
        side: T.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
    )
    mesh.frustumCulled = false
    scene.add(mesh)
    meshSlots.push(mesh)
    return mesh
  }
  const addLine = () => {
    const line = new T.Line(new T.BufferGeometry(), new T.LineBasicMaterial())
    line.frustumCulled = false
    scene.add(line)
    lineSlots.push(line)
    return line
  }
  function applyTexture(f, image) {
    if (!image) return null
    if (!textures.has(f.image)) {
      const map = new T.CanvasTexture(image)
      map.colorSpace = T.SRGBColorSpace
      textures.set(f.image, map)
    }
    return textures.get(f.image)
  }
  return {
    draw(world, frame, getImage) {
      if (w !== frame.width || h !== frame.height) {
        w = frame.width
        h = frame.height
        renderer.setSize(w, h, false)
      }
      camera.left = -w / (2 * frame.scale)
      camera.right = -camera.left
      camera.top = h / (2 * frame.scale)
      camera.bottom = -camera.top
      camera.position.set(...frame.center.map((n, i) => n + frame.eye[i] * 620))
      camera.up.set(...frame.up)
      camera.lookAt(...frame.center)
      camera.updateProjectionMatrix()
      world.faces.forEach((f, i) => {
        const mesh = meshSlots[i] ?? addMesh(),
          g = mesh.geometry
        mesh.visible = true
        attribute(g, 'position', f.points.flat(), 3)
        if (f.uv) attribute(g, 'uv', f.uv.flat(), 2)
        if (mesh.userData.flat !== f.flat) {
          g.setIndex(index(f.flat))
          mesh.userData.flat = f.flat
        }
        g.computeVertexNormals()
        const map = printedSide(f, frame.eye) ? applyTexture(f, getImage(f.image)) : null
        if (mesh.material.map !== map) {
          mesh.material.map = map
          mesh.material.needsUpdate = true
        }
        mesh.material.color.set(map ? '#ffffff' : f.color)
      })
      for (let i = world.faces.length; i < meshSlots.length; i++) meshSlots[i].visible = false
      world.lines.forEach((l, i) => {
        const line = lineSlots[i] ?? addLine()
        line.visible = true
        if (!!line.material.isLineDashedMaterial !== !!l.dash) {
          line.material.dispose()
          line.material = l.dash
            ? new T.LineDashedMaterial({ dashSize: 2.4, gapSize: 1.7 })
            : new T.LineBasicMaterial()
        }
        line.material.color.set(l.color)
        attribute(line.geometry, 'position', l.points.flat(), 3)
        if (l.dash) line.computeLineDistances()
      })
      for (let i = world.lines.length; i < lineSlots.length; i++) lineSlots[i].visible = false
      renderer.render(scene, camera)
    },
    dispose() {
      for (const o of [...meshSlots, ...lineSlots]) {
        o.geometry.dispose()
        o.material.dispose()
      }
      textures.forEach((map) => map.dispose())
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
