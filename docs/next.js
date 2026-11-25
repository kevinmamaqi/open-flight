import { motorRoadmap } from './atlas-roadmap.js?v=b1a9665ab855'
import { currentLocale, homeURL, localizedLinks } from './atlas-nav.js?v=b1a9665ab855'
const lang = currentLocale(),
  i = { en: 0, es: 1, ru: 2 }[lang],
  t = (...v) => v[i],
  $ = (id) => document.getElementById(id)
const el = (tag, txt, cls) => {
  const node = document.createElement(tag)
  node.textContent = txt
  if (cls) node.className = cls
  return node
}
const page = motorRoadmap(lang)
const text = {
  skip: t('Skip to next steps', 'Ir a los próximos pasos', 'К следующим шагам'),
  tag: t('Next steps', 'Próximos pasos', 'Следующие шаги'),
  title: t(
    'From paper to phone control.',
    'Del papel al control por móvil.',
    'От бумаги к управлению с телефона.',
  ),
  status: page.status,
  components: t(
    'What would go into the module?',
    '¿Qué llevaría el módulo?',
    'Из чего будет состоять модуль?',
  ),
  research: t('Sourcing notebook', 'Cuaderno de piezas', 'Записи о деталях'),
  regional: t(
    'Can another family find the same part?',
    '¿Podrá otra familia conseguir la misma pieza?',
    'Можно ли найти ту же деталь в другой стране?',
  ),
  availability: t(
    'For an adult bench prototype we traced one possible Bluetooth board, the Seeed Studio XIAO ESP32C3 (113991054), to catalogues in Spain, Mexico and the US on 24 November 2026. Confirm delivery and weigh the entire assembly locally. These listings establish a sourcing lead. Flight suitability and the other components still need testing.',
    'Para un prototipo de banco localizamos una posible placa Bluetooth, Seeed Studio XIAO ESP32C3 (113991054), en catálogos de España, México y Estados Unidos el 24 de noviembre de 2026. Confirma el envío y pesa el conjunto completo. Es una pista para el aprovisionamiento. Queda por comprobar si sirve para volar y cómo se comporta con las demás piezas.',
    'Для взрослого стендового прототипа мы нашли плату Bluetooth Seeed Studio XIAO ESP32C3 (113991054) в каталогах Испании, Мексики и США 24 ноября 2026 года. Проверьте доставку и взвесьте весь узел. Пригодность для полёта и совместимость остальных деталей предстоит проверить.',
  ),
  circuit: t(
    'Start with the unpowered flight circuit ↗',
    'Empezar con el circuito sin motor ↗',
    'Начать с безмоторной трассы ↗',
  ),
}
for (const [id, value] of Object.entries(text)) $(id).textContent = value
document.documentElement.lang = lang
document.title = text.title + ' · Open Flight'
$('home').href = $('foot-home').href = homeURL(lang)
localizedLinks(lang)
$('motor-workbench').href = './motor.html?lang=' + lang
$('motor-workbench').textContent = t('Open the motor lab ↗', 'Abrir el laboratorio de motores ↗', 'Открыть лабораторию мотора ↗')
$('circuit').href = './planes.html?model=boeing-747&view=flight&lang=' + lang
for (const [i, s] of page.stages.entries()) {
  const card = el('article', '', 'stage')
  card.append(
    el(
      'p',
      (i < 2
        ? t('Family activity', 'En familia', 'Семейное занятие')
        : t('Adult research', 'Investigación para adultos', 'Исследование для взрослых')) +
        ' · ' +
        (i + 1),
      'eyebrow',
    ),
    el('h2', s.title),
    el('p', s.action),
    el('small', s.record),
  )
  $('stages').append(card)
}
for (const { part, criterion } of page.parts) {
  const li = el('li', '')
  li.append(el('strong', part + ' · '), document.createTextNode(criterion))
  $('parts').append(li)
}
for (const source of page.sources) {
  const li = el('li', ''),
    a = el('a', source.label + ' ↗')
  a.href = source.url
  li.append(a)
  $('sources').append(li)
}
