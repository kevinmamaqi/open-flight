import { circuitWords } from './flight-circuit-copy.js?v=827c6a6b1e8f'

const radians = Math.PI / 180
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const grid = {
  directionDeg: [-30, 15, 1, 0],
  angleOfAttackDeg: [-8, 24, 1, 7],
  speed: [1.5, 6, 0.1, 3.5],
  bankDeg: [-30, 30, 1, 0],
  height: [0.5, 2, 0.1, 1.2],
  trimDeg: [-12, 12, 1, 0],
  trimDifferenceDeg: [-24, 24, 1, 0],
}
const gates = {
  level: {
    setup: {},
    view: 'top',
    markers: [{ forward: 2, across: 0, width: 1, bottom: 0.35, top: 1.3 }],
  },
  dip: {
    setup: { directionDeg: -14, angleOfAttackDeg: 12, speed: 3.1, height: 1.8 },
    view: 'side',
    markers: [
      { forward: 1.5, across: 0, width: 1, bottom: 1.4, top: 1.4 },
      { forward: 3.5, across: 0, width: 1.5, bottom: 0.3, top: 0.3 },
    ],
  },
  turn: {
    setup: { bankDeg: 18 },
    view: 'top',
    markers: [{ forward: 3.5, across: 0.85, width: 1.5, bottom: 0, top: 1.2 }],
  },
}

const limit = (key, value) => {
  const [min, max, , standard] = grid[key]
  return Number.isFinite(value) ? clamp(value, min, max) : standard
}
const inputFor = (input, setup) =>
  Object.fromEntries(Object.keys(grid).map((key) => [key, limit(key, input[key] ?? setup[key])]))

/** Return serializable controls, starting setups, virtual windows, and localized workshop instructions. */
export function flightCircuit(locale = 'en') {
  const words = circuitWords[locale] ?? circuitWords.en
  return {
    evidence: 'simulation',
    model: 'open-flight-teaching-model-1',
    intro: words.intro,
    scorecard: { ...words.scorecard },
    controls: Object.fromEntries(
      Object.entries(grid).map(([key, [min, max, step, initial]]) => [
        key,
        { min, max, step, initial, label: words[key] },
      ]),
    ),
    gates: Object.entries(gates).map(([id, { setup, view, markers }]) => ({
      id,
      view,
      inputs: inputFor({}, setup),
      markers: markers.map((marker) => ({ ...marker })),
      ...words.gates[id],
    })),
  }
}

/**
 * Deterministic, uncalibrated teaching model with no design-specific coefficients.
 * Direction is the elevation of the hand motion, positive up. Nose attitude starts at
 * direction + angle of attack. Positive bank banks right. Trim is a qualitative cue
 * for a nose-up/down change. A positive trim difference cues right bank. These
 * are generic model inputs. The butterfly viewer derives them from two independently
 * bounded practice tab angles and leaves the saved build settings intact.
 * Samples contain seconds, metres (right/height/forward), m/s and degrees.
 */
export function simulateFlight(input = {}) {
  const gate = Object.hasOwn(gates, input.gate) ? input.gate : 'level'
  const inputs = inputFor(input, gates[gate].setup)
  const dt = 1 / 120
  const gravity = 9.81
  const samples = []
  let time = 0
  let x = 0
  let y = inputs.height
  let z = 0
  let speed = inputs.speed
  let direction = inputs.directionDeg * radians
  let pitch = direction + inputs.angleOfAttackDeg * radians
  let heading = 0
  let bank = inputs.bankDeg * radians
  let downward = direction < -5 * radians
  let recovered = false
  for (let frame = 0; frame <= 480; frame++) {
    const alpha = pitch - direction
    samples.push({
      time,
      point: [x, y, z],
      directionDeg: direction / radians,
      pitchDeg: pitch / radians,
      angleOfAttackDeg: alpha / radians,
      headingDeg: heading / radians,
      bankDeg: bank / radians,
      speed,
    })
    if (y <= 0 || frame === 480) break

    // Analogue unpowered flight. Lift grows with speed squared, and fades at large incidence.
    // Gravity changes both speed and descent; banking redirects part of lift to the side.
    const lift = speed ** 2 * clamp(6.1 * alpha, -0.65, 1.05) * Math.max(0.2, 1 - 1.25 * Math.abs(alpha))
    const drag = speed ** 2 * (0.085 + 0.7 * alpha ** 2)
    const nextSpeed = clamp(speed + (-drag - gravity * Math.sin(direction)) * dt, 0.35, 12)
    const nextDirection = clamp(
      direction + ((lift * Math.cos(bank) - gravity * Math.cos(direction)) / speed) * dt,
      -1.55,
      1.45,
    )
    const nextHeading = heading + (lift * Math.sin(bank) * dt) / Math.max(0.5, speed * Math.cos(direction))
    const nextPitch = pitch + (direction + (10 + 0.48 * inputs.trimDeg) * radians - pitch) * 4 * dt
    const nextBank = bank + (inputs.trimDifferenceDeg * 1.05 * radians - bank) * 0.85 * dt
    const fall = speed * Math.sin(direction) * dt
    const forward = speed * Math.cos(direction) * dt
    const fraction = fall < -y ? -y / fall : 1
    time += fraction * dt
    x += fraction * forward * Math.sin(heading)
    z += fraction * forward * Math.cos(heading)
    y = fraction < 1 ? 0 : Math.max(0, y + fall)
    speed += fraction * (nextSpeed - speed)
    direction += fraction * (nextDirection - direction)
    heading += fraction * (nextHeading - heading)
    pitch += fraction * (nextPitch - pitch)
    bank += fraction * (nextBank - bank)
    if (direction < -12 * radians) downward = true
    if (downward && direction >= -3 * radians && y > 0.07) recovered = true
  }
  const end = samples.at(-1)
  const outcome = recovered ? 'recovery' : end.directionDeg < -28 ? 'steep' : 'glide'
  return {
    evidence: 'simulation',
    model: 'open-flight-teaching-model-1',
    gate,
    inputs,
    outcome,
    end: end.point[1] === 0 ? 'floor' : 'time-limit',
    duration: end.time,
    landing: end.point[1] === 0 ? end.point : null,
    samples,
  }
}

/** Interpolate this run at a fraction of its elapsed time, clamped to [0, 1]. */
export function sampleFlight(run, fraction) {
  const time = clamp(Number.isFinite(fraction) ? fraction : 0, 0, 1) * run.duration
  const index = Math.min(run.samples.length - 2, Math.floor(time * 120))
  const a = run.samples[index]
  const b = run.samples[index + 1]
  const ratio = clamp((time - a.time) / (b.time - a.time), 0, 1)
  const mix = (v, w) => v + ratio * (w - v)
  return Object.fromEntries(
    Object.entries(a).map(([key, value]) => [
      key,
      key === 'point' ? value.map((v, axis) => mix(v, b.point[axis])) : mix(value, b[key]),
    ]),
  )
}
