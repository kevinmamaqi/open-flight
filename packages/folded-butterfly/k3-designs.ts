// Extra wing designs offered only on the K3 dart butterfly. They reuse the species painters in
// packages/geometry/workshop-art.ts, so every vein, spot and border stays where the species art
// puts it; only the eight colour roles change. The cut, fold and trim geometry is untouched.
//
// "Modernista", offered as "Barcelona": Catalan Modernisme in glazed ceramic. The wings are
// trencadís (k3-mosaic.ts), the broken-tile mosaic of Gaudí and Jujol at Park Güell and of the
// Palau de la Música Catalana, in saturated glaze colours with pale grout, and the veins are dark
// leading like the Palau's stained-glass skylight. Each species keeps its own key so the three
// still tell apart: the monarch in saffron and orange with a cobalt border, the morpho in cobalt
// and turquoise with gold, the swallowtail in saffron with Palau rose and green. A proposed
// palette, not a copy of any tile, building or photograph.
import type { Species, WingColors } from '../geometry/workshop-models.ts'
import type { Mosaic } from './k3-mosaic.ts'

export type K3Design = 'modernista'
export const k3Designs: readonly K3Design[] = ['modernista']

const c = (ink: string, shade: string, base: string, mid: string, sun: string, gleam: string, spot: string, blush: string): WingColors =>
  ({ ink, shade, base, mid, sun, gleam, spot, blush })

export const k3DesignPalettes: Record<Species, Record<K3Design, WingColors>> = {
  monarch: { modernista: c('#16285C', '#C2401C', '#F57A14', '#EC5A1C', '#FFB21E', '#FFDF6E', '#FFFFFF', '#D62F2A') },
  morpho: { modernista: c('#0F1F4A', '#16388F', '#1E6FD6', '#2B8EDB', '#25C1C4', '#8FE6D6', '#FFF4D2', '#E6B43A') },
  swallowtail: { modernista: c('#173A3A', '#C98714', '#FFC928', '#F6B11E', '#FFE066', '#FFF2AC', '#2BA6A0', '#D8336B') },
}

/** Mosaic settings per species: grout, the "found" accent fragments and the piece size at full scale. */
const tile = (accents: string[]): Mosaic => ({ grout: '#F5F0E4', accents, piece_mm: 5.8, gap_mm: 0.38, accent_share: 0.07 })
export const k3DesignMosaics: Record<Species, Record<K3Design, Mosaic>> = {
  monarch: { modernista: tile(['#1F5FC4', '#2BA6A0', '#3E8E3A', '#FFD84A']) },
  morpho: { modernista: tile(['#E6B43A', '#3E9B4F', '#C8384A', '#7A4FC8']) },
  swallowtail: { modernista: tile(['#D8336B', '#3E9B4F', '#2B6CC4', '#F57A14']) },
}
