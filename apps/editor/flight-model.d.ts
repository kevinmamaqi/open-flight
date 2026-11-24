import type { Locale } from '../../packages/print-export/sheets.ts'

type Gate = 'level' | 'dip' | 'turn'
type Point = [number, number, number]
type Inputs = {
  directionDeg: number
  angleOfAttackDeg: number
  speed: number
  bankDeg: number
  height: number
  trimDeg: number
  trimDifferenceDeg: number
}
type Sample = {
  time: number
  point: Point
  directionDeg: number
  pitchDeg: number
  angleOfAttackDeg: number
  headingDeg: number
  bankDeg: number
  speed: number
}
type Simulation = {
  evidence: 'simulation'
  model: 'open-flight-teaching-model-1'
  gate: Gate
  inputs: Inputs
  outcome: 'recovery' | 'steep' | 'glide'
  end: 'floor' | 'time-limit'
  duration: number
  landing: Point | null
  samples: Sample[]
}
export function simulateFlight(input?: Partial<Inputs & { gate: Gate }>): Simulation
export function sampleFlight(run: Simulation, fraction: number): Sample
export function flightCircuit(locale?: Locale): {
  evidence: 'simulation'
  model: 'open-flight-teaching-model-1'
  intro: string
  scorecard: Record<string, string>
  controls: Record<keyof Inputs, { min: number; max: number; step: number; initial: number; label: string }>
  gates: {
    id: Gate
    view: 'top' | 'side'
    inputs: Inputs
    markers: { forward: number; across: number; width: number; bottom: number; top: number }[]
    name: string
    hint: string
    real: string
  }[]
}
