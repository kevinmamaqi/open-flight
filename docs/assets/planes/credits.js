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
  url: 'https://openflight.design/references',
}
// A record plane is Open Flight's version of someone else's fold. The original and its designer are
// credited first, and the fold line links to the tutorial the sequence was reconstructed from.
export function creditText(locale, plan) {
  const t = (en, ru, es) => ({ en, ru, es })[locale]
  const designer = plan?.designer?.[locale]
  return {
    creator: designer
      ? t('Original: ', 'Оригинал: ', 'Original: ') + plan.original + ' · ' + designer
      : t('© Open Flight contributors', '© Авторы Open Flight', '© Colaboradores de Open Flight'),
    geometry: designer
      ? t('Folds derived from the original', 'Сгибы по оригинальной модели', 'Dobleces derivados del original')
      : t('Geometry', 'Конструкция', 'Geometría') + ' · ' + planeCredits.geometry.name,
    artwork:
      (designer
        ? t('Diagrams and lessons © Open Flight', 'Схемы и уроки © Open Flight', 'Esquemas y lecciones © Open Flight')
        : t('Art and lessons', 'Рисунки и уроки', 'Ilustraciones y lecciones')) +
      ' · ' +
      planeCredits.artwork.name,
    credits: planeCredits.url.replace('https://', ''),
  }
}
/** Where each credit line links. */
export function creditLinks(plan) {
  return {
    geometry: plan?.designer ? plan.reference.url : planeCredits.geometry.url,
    artwork: planeCredits.artwork.url,
    credits: planeCredits.url,
  }
}
