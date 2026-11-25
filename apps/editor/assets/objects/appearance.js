export const objectPalettes = {
  ring: {
    field: ['#9edddc', '#146978', '#fffdf5'],
    sunset: ['#ffc897', '#a73d36', '#fff3cf'],
    indigo: ['#babdec', '#48528b', '#e4edf7'],
  },
  samara: {
    field: ['#fcce75', '#ba652d', '#efe1bc'],
    sunset: ['#ffae88', '#9f4250', '#fff3cf'],
    indigo: ['#b9bbeb', '#514d8d', '#dfdcf5'],
  },
  tandem: {
    field: ['#a8dcd9', '#cad3ed', '#345071'],
    sunset: ['#f4ab72', '#e16a5d', '#763e4a'],
    indigo: ['#a5b4ed', '#7976b3', '#42456e'],
  },
}
export const objectIds = Object.keys(objectPalettes)
export function objectDrawing(id, appearance = 'field') {
  if (!objectIds.includes(id) || !Object.hasOwn(objectPalettes[id], appearance))
    throw new RangeError('Unknown object colors')
  return 'assets/objects/' + id + (appearance === 'field' ? '' : '-' + appearance) + '.svg'
}
export function coloredPacket(path, appearance = 'field') {
  if (!Object.hasOwn(objectPalettes.ring, appearance)) throw new RangeError('Unknown packet colors')
  return appearance === 'field' ? path : path.replace('.pdf', '-' + appearance + '.pdf')
}
