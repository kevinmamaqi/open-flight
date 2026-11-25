export const workshopHome = 'https://openflight.design/'
export const previousHome = 'https://kevinmamaqi.github.io/open-flight/'

// Drafts and saved designs belong to the browser origin that created them.
// A shared Flight Book carries its complete selection in the link.
export function movedPage(address) {
  const url = new URL(address)
  const previous = new URL(previousHome)
  if (url.origin !== previous.origin || !url.pathname.startsWith(previous.pathname)) return null
  const path = url.pathname.slice(previous.pathname.length)
  const view = path.replace(/(?:\.html|\/)$/, '')
  const shared = new URLSearchParams(url.hash.slice(1))
  if (url.searchParams.get('previous') === '1' || shared.has('grant') || shared.has('design')) return null
  if (['studio', 'planes', 'keel', 'costa'].includes(view)) return null
  if (view === 'book' && !shared.has('m') && !url.searchParams.has('m')) return null
  const destination = new URL(workshopHome)
  destination.pathname = '/' + path
  destination.search = url.search
  destination.hash = url.hash
  return destination.href
}
