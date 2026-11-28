import { flightObjects } from './assets/objects/activities.js?v=7988ca7cb2ce'
import { currentLocale, localizedLinks } from './atlas-nav.js?v=7988ca7cb2ce'
import { bookFilename, localePaper } from './book-model.js?v=7988ca7cb2ce'
import { classroomPlan } from './classroom-plan.js?v=7988ca7cb2ce'
import { sheetName } from './family-sheets.js?v=7988ca7cb2ce'

const translations = {
  en: {
    includeActivities: 'Include the ring glider, maple spinner and tandem glider',
    activitySupplies: 'Give each team a blank sheet for the ring, scissors, a paper clip and a ruler. Use the five-trial table on each activity page.',
    workshop: 'Workshop',
    language: 'Language',
    title: 'Classroom flight guide',
    proofPage: 'Scale check (print first)',
    logPage: 'Flight log',
    sharedGuide: 'Shared butterfly instructions',
    modelSheet: (name, airplane) => name + (airplane ? ' (sheet and folding guide)' : ' (cutout)'),
    summary: (learners, team, teams, total, paper) =>
      `${learners} learners, up to ${team} per team · ${teams} teams · ${total} sheets, including one scale check · ${paper}`,
    noteHeading: 'Open Flight · Starter 3',
    copied: 'Print-shop instructions copied.',
    selectBrief: 'Select and copy the instructions below.',
    noteLine: (name, range, copies) => `${name} · page(s) ${range} · ${copies} copies`,
    omitted: 'Print the cover, fleet index, certificate and field notes separately if your class wants them.',
  },
  es: {
    includeActivities: 'Incluir el anillo, la semilla giratoria y el planeador tándem',
    activitySupplies: 'Da a cada equipo una hoja en blanco para el anillo, tijeras, un clip y una regla. Usad la tabla de cinco pruebas de cada actividad.',
    workshop: 'Taller',
    language: 'Idioma',
    title: 'Guía de vuelo para el aula',
    library: 'Biblioteca para imprimir',
    classroom: 'Aula',
    intro: '¿Puede el mismo modelo aterrizar más cerca del objetivo si cambias el ángulo de lanzamiento? Dobla un avión o haz una mariposa de papel y averígualo en equipo.',
    starter: 'Abrir el libro gratuito 3 para empezar',
    printGuide: 'Imprimir esta guía',
    plan: 'Calcula las copias',
    planHint: 'El libro 3 para empezar incluye dos mariposas de cuerpo plegado y un avión de hoja entera. Imprime un juego de hojas para construir y un juego de instrucciones para compartir por equipo.',
    learners: 'Estudiantes',
    team: 'Estudiantes por equipo',
    pairs: '2 · Parejas',
    trios: '3 · Tríos',
    fours: '4 · Grupos de cuatro',
    paper: 'Tamaño del papel',
    letter: 'Carta (US Letter)',
    material: 'Qué imprimir',
    pdfPages: 'Páginas del PDF',
    copies: 'Copias',
    planNote: 'El cálculo corresponde al PDF 3 para empezar. Imprime por separado una copia de esta guía para quien dirija la actividad.',
    lesson: 'Haz una prueba justa',
    supplies: 'Para cada mariposa K3 usa papel de 120 g/m², dos clips de 33 mm y pegamento de barra. Comparte tijeras, una regla y un bolígrafo sin tinta para marcar los pliegues. Cada avión usa una hoja.',
    build: 'Construye un modelo con tu equipo. Pide ayuda a una persona adulta con los recortes difíciles y los clips. Quienes tienen menos experiencia pueden señalar un doblez o indicar con el dedo dónde creen que aterrizará.',
    test: 'Marca una línea de lanzamiento y un objetivo en un espacio despejado. Por turnos, lanza, marca el primer punto de contacto o apunta el resultado. Conserva el mismo modelo y la misma persona lanzadora en las dos series.',
    reflect: 'Haz cinco lanzamientos con el modelo horizontal. Cambia solo el ángulo en los cinco siguientes, con la punta un poco hacia abajo. Mantén la altura y un impulso parecido. Apunta también los intentos que fallen. ¿Quedaron las marcas más cerca del objetivo?',
    shop: 'Del móvil a la impresora',
    phone: 'Abre el libro 3 para empezar y descarga el PDF. Usa Compartir para imprimir si tu dispositivo lo permite, o guarda el PDF en Archivos o Descargas. Si usas una copistería, envía el PDF y las instrucciones de impresión juntos.',
    proof: 'Usa el tamaño de papel indicado, escala real o 100 %, una página del PDF por hoja y solo por una cara. Desactiva Ajustar a página. Imprime primero la página 2 y comprueba con una regla que la línea mide 50 mm.',
    copyShop: 'Copiar instrucciones de impresión',
    selectNote: 'Instrucciones de impresión',
    credits: 'Actividad e ilustraciones originales: © Open Flight. Se puede leer, imprimir y copiar gratis para uso personal, familiar y en el aula; reservados los demás derechos. La geometría editable y el software tienen licencias propias.',
    notices: 'Licencias y créditos',
    proofPage: 'Comprobación de escala (imprime primero)',
    logPage: 'Registro de vuelo',
    sharedGuide: 'Instrucciones para ambas mariposas',
    modelSheet: (name, airplane) => name + (airplane ? ' (hoja y guía de dobleces)' : ' (recortable)'),
    summary: (learners, team, teams, total, paper) =>
      `${learners} estudiantes, hasta ${team} por equipo · ${teams} equipos · ${total} hojas, incluida una prueba de escala · ${paper}`,
    noteHeading: 'Open Flight · 3 para empezar',
    copied: 'Instrucciones de impresión copiadas.',
    selectBrief: 'Selecciona y copia las instrucciones de abajo.',
    noteLine: (name, range, copies) => `${name} · pág. ${range} · ${copies} copias`,
    omitted: 'Si la clase quiere la portada, el índice, el certificado y las fichas de campo, imprímelos aparte.',
  },
  ru: {
    includeActivities: 'Добавить кольцеплан, крылатку и тандемный планер',
    activitySupplies: 'Дайте каждой команде чистый лист для кольцеплана, ножницы, скрепку и линейку. На каждом листе задания есть таблица для пяти попыток.',
    workshop: 'Мастерская',
    language: 'Язык',
    title: 'Полёты на уроке',
    library: 'Для печати',
    classroom: 'Для класса',
    intro: 'Можно ли тем же планером попасть ближе к цели, если изменить угол запуска? Сложите самолёт или сделайте бумажную бабочку и проверьте это вместе.',
    starter: 'Открыть бесплатную книгу «3 для начала»',
    printGuide: 'Распечатать памятку',
    plan: 'Сколько копий нужно',
    planHint: 'В книге «3 для начала» — две бабочки со складным корпусом и самолёт из целого листа. На каждую команду распечатайте один комплект выкроек и один комплект инструкций для общего пользования.',
    learners: 'Участников',
    team: 'Участников в команде',
    pairs: '2 · Пары',
    trios: '3 · Тройки',
    fours: '4 · Четвёрки',
    paper: 'Формат бумаги',
    letter: 'US Letter',
    material: 'Что печатать',
    pdfPages: 'Страницы PDF',
    copies: 'Копии',
    planNote: 'Расчёт относится к PDF «3 для начала». Распечатайте эту памятку отдельно в одном экземпляре для ведущего.',
    lesson: 'Сравните два запуска',
    supplies: 'Для каждой бабочки K3 нужны бумага 120 г/м², две скрепки по 33 мм и клей-карандаш. Ножницы, линейку и пустую шариковую ручку для сгибов можно взять общие. Для самолёта нужен один лист.',
    build: 'Соберите одну модель в команде. Взрослый поможет с мелкими вырезами и скрепками. Младшие могут показать пальцем линию сгиба или место, куда, по их мнению, сядет модель.',
    test: 'Отметьте линию старта и цель на свободной площадке. По очереди запускайте модель, отмечайте место её первого касания и записывайте результат. В обеих сериях используйте одну модель и попросите запускать её одного и того же участника.',
    reflect: 'Сделайте пять горизонтальных запусков. В следующих пяти поменяйте только угол: чуть опустите нос. Сохраняйте высоту и силу толчка. Запишите и промахи. Стали ли отметки ближе к цели?',
    shop: 'С телефона на принтер',
    phone: 'Откройте книгу «3 для начала» и скачайте PDF. Если устройство поддерживает печать через меню «Поделиться», воспользуйтесь им или сохраните PDF в «Файлах» либо «Загрузках». В копицентр отправьте PDF вместе с указаниями по печати.',
    proof: 'Выберите нужный формат бумаги, масштаб 100 %, одну страницу PDF на лист и одностороннюю печать. Отключите подгонку под лист. Сначала распечатайте страницу 2 и проверьте линейкой, что отрезок равен 50 мм.',
    copyShop: 'Скопировать указания для печати',
    selectNote: 'Указания для печати',
    credits: 'Занятие и оригинальные иллюстрации: © Open Flight. Можно бесплатно читать, печатать и копировать для личного, семейного и учебного использования; остальные права защищены. У редактируемых чертежей и ПО свои лицензии.',
    notices: 'Лицензии и авторство',
    proofPage: 'Проверка масштаба (печатайте первой)',
    logPage: 'Лётный журнал',
    sharedGuide: 'Общая инструкция для бабочек',
    modelSheet: (name, airplane) => name + (airplane ? ' (лист и инструкция)' : ' (выкройка)'),
    summary: (learners, team, teams, total, paper) =>
      `${learners} чел., до ${team} в команде · ${teams} ком. · ${total} лист. с учётом проверки масштаба · ${paper}`,
    noteHeading: 'Open Flight · 3 для начала',
    copied: 'Указания для печати скопированы.',
    selectBrief: 'Выделите и скопируйте указания ниже.',
    noteLine: (name, range, copies) => `${name} · с. ${range} · ${copies} экз.`,
    omitted: 'При желании распечатайте отдельно обложку, список моделей, сертификат и страницы атласа.',
  },
}

const lang = currentLocale()
const copy = translations[lang]
const get = (id) => document.getElementById(id)
document.documentElement.lang = lang
document.title = copy.title + ' · Open Flight'
for (const node of document.querySelectorAll('[data-text]')) {
  if (copy[node.dataset.text]) node.textContent = copy[node.dataset.text]
}
for (const node of document.querySelectorAll('[data-aria]')) {
  node.setAttribute('aria-label', copy[node.dataset.aria])
}

const learners = get('learners')
const team = get('team')
const paper = get('paper')
const starter = get('starter')
const table = get('page-ranges')
const brief = get('shop-brief')
const status = get('copy-status')
const query = new URLSearchParams(location.search)
const activities = get('include-activities')
activities.checked = query.get('objects') === '1'
const activityNames = new Map(flightObjects(lang).activities.map(item => [item.id, item.title]))

function learnerCount(value) {
  const size = Number(value)
  return Number.isInteger(size) && size >= 1 && size <= 300 ? size : null
}

learners.value = learnerCount(query.get('learners')) ?? 30
team.value = ['2', '3', '4'].includes(query.get('team')) ? query.get('team') : '2'
const requestedPaper = query.get('paper')
paper.value = requestedPaper === 'a4' ? 'A4' : requestedPaper === 'letter' ? 'US_LETTER' : localePaper(navigator.languages)
localizedLinks(lang)

function row(name, pages, copies) {
  const tr = document.createElement('tr')
  for (const [index, value] of [name, pages, copies].entries()) {
    const cell = document.createElement(index === 0 ? 'th' : 'td')
    if (index === 0) cell.scope = 'row'
    cell.textContent = value
    tr.append(cell)
  }
  return tr
}

function update() {
  const size = learnerCount(learners.value)
  if (!size) return
  const plan = classroomPlan(
    { lang, paper: paper.value, learners: size, team_size: Number(team.value), include_activities: activities.checked },
    new URL('./book.html', location.href),
  )
  const rowNames = { scale_check: copy.proofPage, shared_guide: copy.sharedGuide, flight_log: copy.logPage }
  const rows = plan.rows.map(({ kind, sheet_id, activity_id, pages, copies }) => ({
    name: kind === 'model' ? copy.modelSheet(sheetName(sheet_id, lang), pages.length > 1) : activityNames.get(activity_id) ?? rowNames[kind],
    pages, copies,
  }))
  const format = (pages) => pages.length > 1 ? `${pages[0]}–${pages.at(-1)}` : String(pages[0])
  const summary = copy.summary(size, plan.team_size, plan.teams, plan.total_sheets, paper.selectedOptions[0].textContent)
  get('copy-summary').textContent = summary
  table.replaceChildren(...rows.map(({ name, pages, copies }) => row(name, format(pages), copies)))
  get('activity-supplies').hidden = !activities.checked
  starter.href = plan.book_url
  const shipRanges = rows.map(({ name, pages, copies }) => copy.noteLine(name, format(pages), copies))
  brief.value = [
    copy.noteHeading,
    bookFilename(plan.settings),
    summary,
    get('print-shop').querySelector('.shop-proof').textContent,
    '',
    ...shipRanges,
    ...(activities.checked ? [copy.activitySupplies] : []),
    '',
    copy.omitted,
  ].join('\n')
  status.textContent = ''
}

function commitSettings() {
  if (!learnerCount(learners.value)) {
    const previous = new URLSearchParams(location.search).get('learners')
    learners.value = learnerCount(previous) ?? 30
  }
  update()
  const url = new URL(location.href)
  url.searchParams.set('lang', lang)
  url.searchParams.set('learners', learners.value)
  url.searchParams.set('team', team.value)
  url.searchParams.set('paper', paper.value === 'A4' ? 'a4' : 'letter')
  if (activities.checked) url.searchParams.set('objects', '1')
  else url.searchParams.delete('objects')
  history.replaceState(null, '', url)
  localizedLinks(lang)
}

learners.addEventListener('input', update)
for (const control of [learners, team, paper, activities]) control.addEventListener('change', commitSettings)
get('print-guide').addEventListener('click', () => window.print())
get('copy-shop').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(brief.value)
    status.textContent = copy.copied
  } catch {
    get('brief-label').hidden = false
    brief.hidden = false
    brief.focus()
    brief.select()
    status.textContent = copy.selectBrief
  }
})

update()
