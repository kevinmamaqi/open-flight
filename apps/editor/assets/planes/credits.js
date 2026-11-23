export const planeCredits = {
  creator: 'Open Flight contributors',
  geometry: { name: 'CERN-OHL-W-2.0', url: 'https://spdx.org/licenses/CERN-OHL-W-2.0.html' },
  artwork: { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  url: 'https://kevinmamaqi.github.io/open-flight/references.html',
}
export function creditText(locale) {
  const ru = locale === 'ru'
  return {
    creator: ru ? '© Авторы Open Flight' : '© Open Flight contributors',
    geometry: (ru ? 'Конструкция' : 'Geometry') + ' · ' + planeCredits.geometry.name,
    artwork: (ru ? 'Рисунки и уроки' : 'Art and lessons') + ' · ' + planeCredits.artwork.name,
    credits: planeCredits.url.replace('https://', ''),
  }
}
