// Words on the Print & Play page, in English, Spanish and Russian.
// Short sentences, no exclamation marks. Spanish uses tú; Russian uses вы.
// Spanish and Russian need a native read before release.
import { appendix } from './book/catalog.js?v=efdc141e4945'

const w = (en, es, ru) => ({ en, es, ru })

export const printName = appendix.find(item => item.id === 'print').title

export const printCopy = {
  title: printName,
  documentTitle: w('Print & Play · Open Flight', 'Imprime y vuela · Open Flight', 'Распечатать и запустить · Open Flight'),
  description: w(
    'Pick one to three designs and get one PDF: each pattern, a one-page quick guide, trim tips and a landing tally. Free, in A4 or US Letter.',
    'Elige de uno a tres modelos y recibe un PDF: cada plantilla, una guía rápida de una página, consejos de ajuste y una tabla de aterrizajes. Gratis, en A4 o Carta.',
    'Выберите от одной до трёх моделей и получите один PDF: выкройки, краткую инструкцию на одной странице, советы по настройке и таблицу посадок. Бесплатно, A4 или US Letter.',
  ),
  lead: w(
    'Pick up to three designs. You get one PDF: each pattern, a one-page guide and trim tips.',
    'Elige hasta tres modelos. Recibes un PDF: cada plantilla, una guía de una página y consejos de ajuste.',
    'Выберите до трёх моделей. Вы получите один PDF: выкройки, инструкцию на одной странице и советы по настройке.',
  ),
  sets: w('Ready sets', 'Sets listos', 'Готовые наборы'),
  own: w('Or choose your own', 'O elige los tuyos', 'Или выберите сами'),
  ownHint: w(
    'Up to three designs. A fourth replaces the oldest.',
    'Hasta tres modelos. El cuarto reemplaza al más antiguo.',
    'Не больше трёх моделей. Четвёртая заменит самую раннюю.',
  ),
  selected: w('Selected', 'Elegido', 'Выбрано'),
  pickSet: w('Use this set', 'Usar este set', 'Выбрать набор'),
  pageOne: w('page', 'página', 'страница'),
  pageMany: w('pages', 'páginas', 'страницы'),
  pageMany5: w('pages', 'páginas', 'страниц'),
  designOne: w('design', 'modelo', 'модель'),
  designMany: w('designs', 'modelos', 'модели'),
  designMany5: w('designs', 'modelos', 'моделей'),
  tools: {
    scissors: w('scissors', 'tijeras', 'ножницы'),
    clips: w('two clips', 'dos clips', 'две скрепки'),
    clip: w('one clip', 'un clip', 'одна скрепка'),
    paper: w('paper only', 'solo papel', 'только бумага'),
  },
  chosen: w('Your PDF', 'Tu PDF', 'Ваш PDF'),
  empty: w('Choose a design', 'Elige un modelo', 'Выберите модель'),
  about: w('about', 'unos', 'около'),
  paper: w('Paper', 'Papel', 'Бумага'),
  paperNames: { A4: w('A4', 'A4', 'A4'), US_LETTER: w('US Letter', 'Carta', 'US Letter') },
  get: w('Get my PDF', 'Descargar mi PDF', 'Скачать мой PDF'),
  clear: w('Clear', 'Quitar todo', 'Сбросить'),
  busy: w('Making your PDF…', 'Preparando tu PDF…', 'Готовим ваш PDF…'),
  ready: w('Your PDF is ready.', 'Tu PDF está listo.', 'Ваш PDF готов.'),
  failed: w(
    'The PDF did not load. Check your connection and try again.',
    'No se pudo cargar el PDF. Revisa tu conexión y vuelve a intentarlo.',
    'PDF не загрузился. Проверьте соединение и попробуйте ещё раз.',
  ),
  replaced: (added, dropped, lang) => ({
    en: `${added} replaced ${dropped}. Three designs at most.`,
    es: `${added} reemplaza a ${dropped}. Máximo tres modelos.`,
    ru: `${added} заменяет ${dropped}. Не больше трёх моделей.`,
  })[lang],
  afterTitle: w('Fold, launch, then change one thing.', 'Pliega, lanza y cambia una sola cosa.', 'Сложите, запустите, измените одно.'),
  afterBooklet: w('Want a cover and a flight log?', '¿Quieres una portada y un registro de vuelo?', 'Нужны обложка и журнал полётов?'),
  booklet: w('Make it a booklet', 'Conviértelo en un cuadernillo', 'Соберите буклет'),
  reminder: w(
    'Print at 100%. Measure the 50 mm line before you cut.',
    'Imprime al 100 %. Mide la línea de 50 mm antes de recortar.',
    'Печатайте в масштабе 100%. Перед вырезанием измерьте линию в 50 мм.',
  ),
  untested: w(
    'Launch and trim tips follow how paper gliders behave. They have not yet been tested on these designs.',
    'Los consejos de lanzamiento y ajuste siguen cómo se comportan los planeadores de papel. Aún no se han probado en estos modelos.',
    'Советы по запуску и настройке основаны на поведении бумажных планёров. На этих моделях их ещё не проверяли.',
  ),
  noscript: w(
    'Choosing designs needs JavaScript. These ready sets download without it.',
    'Para elegir modelos hace falta JavaScript. Estos sets se descargan sin él.',
    'Для выбора моделей нужен JavaScript. Эти наборы скачиваются и без него.',
  ),
  crumb: printName,
  footerBook: w('Flight Book', 'Libro de vuelo', 'Книга полётов'),
}

/** "1 page", "2 pages", "5 страниц": the right plural form of a count. */
export function counted(count, lang, one, many, many5 = many) {
  const rule = new Intl.PluralRules(lang).select(count)
  const word = rule === 'one' ? one : lang === 'ru' && rule !== 'few' ? many5 : many
  return count + ' ' + word[lang]
}
