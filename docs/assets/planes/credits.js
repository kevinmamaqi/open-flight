export const planeCredits = {
  creator: 'Open Flight contributors',
  geometry: {
    name: 'CERN-OHL-W-2.0',
    url: 'https://spdx.org/licenses/CERN-OHL-W-2.0.html',
  },
  artwork: {
    name: 'CC BY-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  url: 'https://kevinmamaqi.github.io/open-flight/references.html',
}
export function creditText(locale) {
  const t = (en, ru, es) => ({ en, ru, es })[locale]
  return {
    creator: t('© Open Flight contributors', '© Авторы Open Flight', '© Colaboradores de Open Flight'),
    geometry: t('Geometry', 'Конструкция', 'Geometría') + ' · ' + planeCredits.geometry.name,
    artwork:
      t('Art and lessons', 'Рисунки и уроки', 'Ilustraciones y lecciones') +
      ' · ' +
      planeCredits.artwork.name,
    credits: planeCredits.url.replace('https://', ''),
  }
}
