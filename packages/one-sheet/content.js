// Book-only words for One Sheet: running heads, plate labels and the notes that belong to
// the printed edition rather than a chapter module. Text is { en, es, ru }; Spanish and
// Russian are drafts for a native editor.
const w = (en, es, ru) => ({ en, es, ru })

export const words = {
  chapter: w('Chapter', 'Capítulo', 'Глава'),
  plate: w('Plate', 'Lámina', 'Таблица'),
  sequence: w('Fold sequence', 'Secuencia de pliegues', 'Последовательность сгибов'),
  lineage: w('Lineage', 'Origen', 'Происхождение'),
  fieldNotes: w('Field notes', 'Notas de campo', 'Полевые заметки'),
  glance: w('At a glance', 'De un vistazo', 'Коротко'),
  launch: w('Launch it', 'Lánzalo', 'Запуск'),
  trim: w('Trim it', 'Ajústalo', 'Настройка'),
  howItFlies: w('How it flies', 'Cómo vuela', 'Как летает'),
  printPlay: w('Print & Play', 'Imprime y vuela', 'Распечатать и запустить'),
  sheet: w('sheet', 'hoja', 'лист'),
  scaleHalf: w('50 mm at 1:2', '50 mm a 1:2', '50 мм в масштабе 1:2'),
  cut: w('Cut', 'Corte', 'Разрез'),
  valley: w('Valley fold', 'Pliegue valle', 'Сгиб «долина»'),
  mountain: w('Mountain fold', 'Pliegue montaña', 'Сгиб «гора»'),
  patternCaption: w(
    'The top of the printed A4 sheet at exactly 1:2, cropped. The full sheet is 210 × 297 mm; the thick border is cut first.',
    'La parte superior de la hoja A4 impresa, exactamente a 1:2 y recortada. La hoja completa mide 210 × 297 mm; primero se recorta el borde grueso.',
    'Верх печатного листа A4 точно в масштабе 1:2, фрагмент. Полный лист 210 × 297 мм; сначала вырезают по толстой рамке.',
  ),
  playText: w(
    'A4 and US Letter. Print at 100% and measure the 50 mm line before you fold.',
    'A4 y Carta. Imprime al 100 % y mide la línea de 50 mm antes de plegar.',
    'A4 и US Letter. Печатайте в масштабе 100 % и измерьте линию 50 мм перед сгибанием.',
  ),
  specimenCaption: w(
    'Drawing from the printable geometry, not a photograph and not to scale. A photograph of a real build replaces it before press.',
    'Dibujo a partir de la geometría imprimible, no es una fotografía ni está a escala. Antes de imprimir se sustituirá por la foto de un modelo real.',
    'Рисунок по печатной геометрии — не фотография и не в масштабе. Перед печатью его заменит фотография настоящей модели.',
  ),
  openerDrawings: w(
    'The four airplanes, drawn from their printable geometry. Drawings, not photographs, and not to scale.',
    'Los cuatro aviones, dibujados a partir de su geometría imprimible. Dibujos, no fotografías, y no a escala.',
    'Четыре самолёта по их печатной геометрии. Рисунки, а не фотографии, не в масштабе.',
  ),
  airplanesNote: w(
    'Each fold is named for the idea it borrows from a real aircraft; no maker endorses this book. None of the four has a recorded flight yet, so every number here is an estimate or says not yet measured.',
    'Cada pliegue lleva el nombre de la idea que toma de un avión real; ningún fabricante respalda este libro. Ninguno de los cuatro tiene aún un vuelo registrado, así que cada número es una estimación o dice aún sin medir.',
    'Каждый сгиб назван по идее, взятой у настоящего самолёта; ни один производитель не одобрял эту книгу. Ни одна из четырёх моделей ещё не летала в записанном испытании, поэтому каждое число здесь — оценка или «ещё не измерено».',
  ),
  slotPlate: w('Slot · filled from apps/editor/book/plates/A1.js when that module exists', 'Hueco · se rellena desde apps/editor/book/plates/A1.js', 'Место · заполняется из apps/editor/book/plates/A1.js'),
  slotFigure: w('Slot · balance and trim figure from apps/editor/book/figures/airplane.js when that module exists', 'Hueco · figura de equilibrio desde apps/editor/book/figures/airplane.js', 'Место · рисунок балансировки из apps/editor/book/figures/airplane.js'),
  planned: w('Planned spread', 'Doble página prevista', 'Запланированный разворот'),
  image: w('Image', 'Imagen', 'Изображение'),
  livePage: w('Latest records', 'Récords actuales', 'Актуальные рекорды'),
  photoToCome: w('Photograph to come', 'Fotografía pendiente', 'Фотография будет позже'),
  glanceRows: {
    sheet: [w('Sheet', 'Hoja', 'Лист'), w('A4, cut to 196 × 283 mm', 'A4, recortada a 196 × 283 mm', 'A4, вырезать 196 × 283 мм')],
    span: [w('Span, wings flat', 'Envergadura, alas planas', 'Размах, крылья плоско'), (mm) => w(`${mm} mm`, `${mm} mm`, `${mm} мм`)],
    length: [w('Length', 'Longitud', 'Длина'), (mm) => w(`${mm} mm`, `${mm} mm`, `${mm} мм`)],
    folds: [w('Folds', 'Pliegues', 'Сгибы'), (n) => w(`${n} steps`, `${n} pasos`, `${n} шагов`)],
    balance: [w('Balance, one clip', 'Equilibrio, un clip', 'Равновесие, одна скрепка'), w('About 104 mm behind the nose {{estimate}}', 'A unos 104 mm del morro {{estimate}}', 'Около 104 мм от носа {{estimate}}')],
    flights: [w('Recorded flights', 'Vuelos registrados', 'Записанные полёты'), w('None yet {{not-yet-measured}}', 'Ninguno aún {{not-yet-measured}}', 'Пока нет {{not-yet-measured}}')],
  },
}
