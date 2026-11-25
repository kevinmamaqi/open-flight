import * as THREE from './assets/viewer/three.js?v=51d4970dfb40'
import { objectModel } from './assets/objects/geometry.js?v=51d4970dfb40'
import { objectIds } from './assets/objects/appearance.js?v=51d4970dfb40'
import { planeModel, costaModel } from './model-geometry.js?v=51d4970dfb40'
import { makeScene, textureFor } from './model-scene.js?v=51d4970dfb40'

export function createViewer(container, id, lang, onProgress) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(900, 560, false)
  renderer.domElement.setAttribute('aria-label', id + ' · 3D')
  renderer.domElement.setAttribute('role', 'img')
  container.replaceChildren(renderer.domElement)
  const eye = new THREE.OrthographicCamera().position
  let scene,
    camera,
    group,
    texture,
    version = 0,
    frame = 0,
    fraction = 0,
    radius = 1
  let yaw = 32,
    pitch = 36
  function release() {
    scene?.traverse((node) => {
      node.geometry?.dispose()
      node.material?.dispose()
    })
    texture?.dispose()
  }
  function draw() {
    if (!group) return
    const angle = (yaw * Math.PI) / 180,
      tilt = (pitch * Math.PI) / 180
    eye.set(Math.sin(angle) * Math.cos(tilt), Math.sin(tilt), -Math.cos(angle) * Math.cos(tilt))
    camera.position.copy(eye).multiplyScalar(600)
    camera.lookAt(0, 0, 0)
    const moving = fraction > 0
    group.scale.setScalar(moving ? 0.64 : 1)
    group.position.set(0, 0, 0)
    group.rotation.set(0, 0, 0)
    if (moving) {
      group.position.y = radius * (0.55 - fraction)
      if (id === 'samara') group.rotation.y = fraction * Math.PI * 6
      else {
        group.position.z = radius * (0.7 - 1.4 * fraction)
        group.rotation.z = 0.08 * Math.sin(fraction * Math.PI * 2)
        group.rotation.x = -0.08
      }
    }
    renderer.render(scene, camera)
  }
  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
    onProgress(fraction, false)
  }
  function seek(value) {
    fraction = value
    stop()
    draw()
  }
  return {
    async setModel(paint, paper, second) {
      const current = ++version
      let model
      if (objectIds.includes(id)) model = objectModel(id, paint, second)
      else if (id.includes('-')) model = planeModel(id, paint, paper)
      else {
        const api = await import('./browser-workshop.js?v=51d4970dfb40')
        model = costaModel(api.makeK2({ species: id, appearance_id: paint, paper, locale: lang }), api)
      }
      const nextTexture = await textureFor(model, 'studio')
      if (version !== current) {
        nextTexture?.dispose()
        return
      }
      release()
      texture = nextTexture
      eye.set(0.57, 1.4, -1.02).normalize()
      scene = makeScene(model.world, 'studio', eye, texture)
      group = new THREE.Group()
      for (const node of [...scene.children]) if (node.isMesh || node.isLine) group.add(node)
      scene.add(group)
      const points = model.world.faces.flatMap((f) => f.points)
      const center = [0, 1, 2].map(
        (i) => (Math.max(...points.map((p) => p[i])) + Math.min(...points.map((p) => p[i]))) / 2,
      )
      // Put the pivot at the weighted root of the spinner; orbit other models around their middle.
      if (id !== 'samara') for (const node of group.children) node.position.set(...center.map((v) => -v))
      radius = Math.max(
        ...points.map((p) => Math.hypot(...p.map((v, i) => v - (id === 'samara' ? 0 : center[i])))),
      )
      const height = radius * (id === 'samara' ? 1.05 : 0.92)
      camera = new THREE.OrthographicCamera(
        (-height * 900) / 560,
        (height * 900) / 560,
        height,
        -height,
        1,
        1200,
      )
      seek(0)
    },
    view(azimuth, elevation) {
      yaw = azimuth
      pitch = elevation
      draw()
    },
    seek,
    toggle() {
      if (frame) {
        stop()
        return
      }
      if (fraction >= 1) fraction = 0
      const start = performance.now() - fraction * 4200
      function tick(now) {
        fraction = Math.min(1, (now - start) / 4200)
        draw()
        onProgress(fraction, fraction < 1)
        frame = fraction < 1 ? requestAnimationFrame(tick) : 0
      }
      frame = requestAnimationFrame(tick)
    },
    dispose() {
      version++
      stop()
      release()
      renderer.dispose()
      container.replaceChildren()
    },
  }
}
