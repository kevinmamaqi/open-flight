const w = (en, es, ru) => ({ en, es, ru })
const status = w(
  'Seven unpowered gliders are ready to build. The removable, phone-controlled module is a research proposal. A flyable kit, tested parts list and control app are future work.',
  'Ya puedes construir siete planeadores sin motor. El módulo desmontable controlado desde el móvil está en fase de investigación. Quedan por desarrollar y probar el kit, sus piezas y la aplicación.',
  'Семь безмоторных планеров уже можно собрать. Съёмный модуль с управлением с телефона пока в разработке концепции. Лётный образец, проверенный список деталей и приложение ещё предстоит создать.',
)
const stages = [
  [
    w('Fly the plain sheet', 'Prueba el avión de papel', 'Запусти бумажный самолёт'),
    w(
      'Build a whole-sheet airplane. Mark a line on the floor and record five gentle releases from the same height.',
      'Pliega un avión de hoja entera. Marca una línea en el suelo y haz cinco lanzamientos suaves desde la misma altura.',
      'Сложи самолёт из целого листа. Отметь линию на полу и сделай пять мягких запусков с одной высоты.',
    ),
    w(
      'Mark each first landing, including a short glide or a miss.',
      'Marca el primer contacto de cada vuelo, incluidos los vuelos cortos y los fallos.',
      'Отметь каждое первое касание пола, включая короткие полёты и промахи.',
    ),
  ],
  [
    w('Try a removable dummy mass', 'Prueba con una masa desmontable', 'Попробуй съёмный груз'),
    w(
      'With a grown-up, weigh the plane and a small secured inert weight. Find the finished plane’s balance point before and after fitting the weight. Measure from the nose in millimetres.',
      'Con un adulto, pesa el avión y un pequeño contrapeso inerte bien sujeto. Encuentra el punto de equilibrio antes y después de colocarlo. Mide desde el morro en milímetros.',
      'Вместе со взрослым взвесь самолёт и небольшой надёжно закреплённый груз. Найди точку равновесия до и после установки и измерь расстояние от носа в миллиметрах.',
    ),
    w(
      'Write down weight, attachment position and balance point separately. Repeat the baseline glides and inspect the paper around the mount.',
      'Anota por separado la masa, la posición de montaje y el punto de equilibrio. Repite los planeos de referencia y revisa el papel junto al soporte.',
      'Запиши отдельно массу, место крепления и точку равновесия. Повтори полёты и осмотри бумагу у крепления.',
    ),
  ],
  [
    w('Bench-test the controls', 'Probar los controles en banco', 'Проверить управление на стенде'),
    w(
      'An adult tests pairing, steering and the stop control on a restrained demonstrator. Begin with the propeller removed. Test a guarded drive only after the stop works.',
      'Una persona adulta comprueba el emparejamiento, la dirección y la parada en un prototipo sujeto. Se empieza sin hélice. El accionamiento protegido se prueba después de verificar la parada.',
      'Взрослый проверяет связь, поворот и остановку на закреплённом макете. Сначала снимают винт. Привод с ограждением проверяют после проверки остановки.',
    ),
    w(
      'Log what happens when the phone disconnects, goes to sleep and reconnects. Require a deliberate restart after each stop.',
      'Registra qué ocurre al desconectar, bloquear y volver a conectar el móvil. Tras cada parada, el reinicio debe ser intencional.',
      'Запиши, что происходит при разрыве связи, блокировке телефона и повторном подключении. После остановки запуск должен требовать отдельной команды.',
    ),
  ],
  [
    w(
      'Share a reproducible prototype',
      'Compartir un prototipo reproducible',
      'Поделиться воспроизводимым прототипом',
    ),
    w(
      'Before inviting families to fly it, adult builders repeat the tests, inspect the guard and verify the mount on the selected airframe. Publish editable drawings, firmware and phone controls.',
      'Antes de invitar a las familias, varios adultos repiten las pruebas, revisan la protección y verifican el soporte en el avión elegido. Se publican planos editables, firmware y controles del móvil.',
      'До семейных полётов несколько взрослых повторяют испытания, проверяют ограждение и крепление на выбранной модели. Затем публикуют редактируемые чертежи, прошивку и управление с телефона.',
    ),
    w(
      'Record exact versions, local substitutes, mass, repair steps and independent test results.',
      'Anota versiones, sustitutos locales, masa, pasos de reparación y resultados de pruebas independientes.',
      'Запиши версии, местные аналоги, массу, порядок ремонта и результаты независимых испытаний.',
    ),
  ],
]
const parts = [
  [
    w('Removable mount', 'Soporte desmontable', 'Съёмное крепление'),
    w(
      'A repeatable attachment datum, editable drawing, total mass and a paper-tear check.',
      'Una referencia de montaje repetible, plano editable, masa total y comprobación de desgarros.',
      'Повторяемая точка крепления, редактируемый чертёж, общая масса и проверка бумаги на разрыв.',
    ),
  ],
  [
    w('Controller and phone', 'Controlador y móvil', 'Контроллер и телефон'),
    w(
      'A documented Bluetooth Low Energy interface, source for firmware and controls, and a measured stop on disconnection.',
      'Interfaz Bluetooth de bajo consumo documentada, código del firmware y del control, y parada comprobada al perder la conexión.',
      'Документированный интерфейс Bluetooth Low Energy, исходный код прошивки и управления, проверенная остановка при потере связи.',
    ),
  ],
  [
    w('Motor, guard and steering', 'Motor, protección y dirección', 'Двигатель, ограждение и управление'),
    w(
      'Matched low-power drive and driver, a guard that survives handling, and a removable steering mechanism with a known neutral position.',
      'Motor de baja potencia con controlador compatible, protección que aguante el uso y dirección desmontable con posición neutra conocida.',
      'Совместимые маломощные двигатель и драйвер, прочное ограждение и съёмный рулевой механизм с известным нейтральным положением.',
    ),
  ],
  [
    w('Power and servicing', 'Alimentación y mantenimiento', 'Питание и обслуживание'),
    w(
      'A protected, enclosed battery pack and its manufacturer-matched charger, a physical disconnect, replaceable parts and documented polarity.',
      'Batería protegida y cerrada con el cargador indicado por el fabricante, desconexión física, repuestos y polaridad documentada.',
      'Закрытый защищённый аккумулятор с предусмотренным изготовителем зарядным устройством, физическое отключение, сменные детали и указанная полярность.',
    ),
  ],
]
const links = [
  [
    w(
      'Manufacturer · XIAO ESP32C3 documentation',
      'Fabricante · Documentación de XIAO ESP32C3',
      'Производитель · Документация XIAO ESP32C3',
    ),
    'https://wiki.seeedstudio.com/XIAO_ESP32C3_Getting_Started/',
  ],
  [
    'España · BricoGeek',
    'https://tienda.bricogeek.com/arduino-compatibles/2091-seeed-studio-xiao-esp32-c3.html',
  ],
  ['México · Microbot', 'https://microbot.com.mx/products/seeed-studio-xiao-esp32c3'],
  [
    w('United States · DigiKey', 'Estados Unidos · DigiKey', 'США · DigiKey'),
    'https://www.digikey.com/en/products/detail/seeed-technology-co-ltd/113991054/16652880',
  ],
  [
    w(
      'Commercial precedent · POWERUP documentation',
      'Precedente comercial · Documentación de POWERUP',
      'Коммерческий пример · Документация POWERUP',
    ),
    'https://www.poweruptoys.com/pages/documentation',
  ],
  [
    w(
      'Open Source Hardware Association · definition',
      'Open Source Hardware Association · definición',
      'Open Source Hardware Association · определение',
    ),
    'https://oshwa.org/resources/open-source-hardware-definition/',
  ],
]
export function motorRoadmap(locale = 'en') {
  if (!Object.hasOwn(status, locale)) throw new RangeError('Unknown Open Flight language')
  return {
    locale,
    status: status[locale],
    stages: stages.map(([title, action, record]) => ({
      title: title[locale],
      action: action[locale],
      record: record[locale],
    })),
    parts: parts.map(([part, criterion]) => ({ part: part[locale], criterion: criterion[locale] })),
    sources: links.map(([label, url]) => ({
      label: typeof label === 'string' ? label : label[locale],
      url,
    })),
  }
}
