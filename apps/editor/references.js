import { currentLocale, localizedLinks } from './atlas-nav.js'
import { studioLink } from './atlas-guide.js'
import { planeCatalog } from './assets/planes/catalog.js'
const $ = (id) => document.getElementById(id)
const lang = currentLocale()
const ru = lang === 'ru'
document.documentElement.lang = lang
localizedLinks(lang)
const sp = {
  over: 'Biblioteca abierta',
  heading: 'Fuentes y créditos',
  intro:
    'Observa la mariposa o el avión real. Después busca en el papel el detalle que inspiró cada diseño.',
  btitle: 'Las mariposas',
  ptitle: 'Los aviones',
  ftitle: '¿Por qué planea?',
  rtitle: 'El taller con motor',
  otitle: 'Crea tu propia versión',
  'forces-text':
    'Tu mano da al planeador la velocidad inicial. Al pasar el aire por las alas aparecen la sustentación y la resistencia. La gravedad tira hacia abajo. El papel, los pliegues y cómo lo sueltes cambian el aterrizaje.',
  road: 'Después de los planeos repetidos investigaremos un módulo desmontable de control por móvil. El cuaderno de próximos pasos muestra qué puede probar una familia y qué deben verificar los adultos.',
  licenses:
    'El código se comparte bajo Apache 2.0 y la geometría editable con CERN-OHL-W-2.0. Textos, ilustraciones, lecciones y hojas imprimibles: © Open Flight. Se puede leer, imprimir y copiar gratis para uso personal, familiar y en el aula; reservados los demás derechos. Lo publicado antes del 27 de noviembre de 2026 bajo CC BY-SA 4.0 conserva esa licencia. Cada fotografía conserva su autoría y enlaza a su publicación original.',
  notices: 'Licencias y créditos ↗',
}
const extra = {
  en: [
    'Next steps ↗',
    'Balance and recovery',
    'Li and colleagues studied gliding plates, including experiments in a water tank. Their results show how mass distribution and aerodynamic forces interact. Measure your finished paper glider from nose to balance point, and observe its actual release and landing.',
  ],
  es: [
    'Próximos pasos ↗',
    'Equilibrio y recuperación',
    'Li y sus colegas estudiaron placas planeadoras, incluso en un tanque de agua. Sus resultados muestran cómo influyen la distribución de la masa y las fuerzas aerodinámicas. Mide desde el morro hasta el punto de equilibrio de tu planeador terminado y observa el lanzamiento y el aterrizaje.',
  ],
  ru: [
    'Следующие шаги ↗',
    'Равновесие и выход из снижения',
    'Ли и коллеги исследовали планирующие пластины, в том числе в резервуаре с водой. Их результаты показывают связь между распределением массы и аэродинамическими силами. Измерь расстояние от носа готового планера до точки равновесия и понаблюдай за запуском и посадкой.',
  ],
}[lang]
const keelWords={
  en:['Why fold the body?','A double-layer spine gives fingers a repeatable place to grip and adds depth along the body. A flat table sets the two wings level. The extra strip adds paper, so a real launch is needed to see how the landing changes. The Pacific Science Center guide shows a separate folded fuselage. Our version folds the body from the same sheet as the wings.','Build the folded butterfly ↗'],
  es:['¿Para qué sirve el cuerpo plegado?','Un cuerpo de dos capas da a los dedos un punto de agarre y al papel una sección más profunda. La mesa permite nivelar las alas. La tira añade papel, por lo que hay que probar el aterrizaje. La guía del Pacific Science Center muestra un fuselaje plegado aparte. Aquí las alas y el cuerpo salen de la misma hoja.','Construir la mariposa de cuerpo plegado ↗'],
  ru:['Зачем складывать корпус?','Двухслойный корпус удобно брать в одном и том же месте. Сгиб придаёт плоскому листу объём, а стол помогает выровнять крылья. Полоска добавляет бумагу, поэтому изменение посадки проверяют настоящими запусками. В пособии Pacific Science Center корпус складывают отдельно. Здесь он сделан из того же листа, что и крылья.','Сделать бабочку со складным корпусом ↗']
}[lang]
for(const [i,id] of ['folded-title','folded-text','folded-worktable'].entries())$(id).textContent=keelWords[i]
$('folded-worktable').href='./keel.html?lang='+lang
$('next-page').href = './next.html?lang=' + lang
for (const [i, id] of ['next-page', 'ctitle', 'cg'].entries()) $(id).textContent = extra[i]
const labels = {
  over: ['The open library', 'Открытая библиотека'],
  heading: ['Field references', 'Полевой справочник'],
  intro: [
    'Look at the original butterfly or aircraft, then find the detail that made its way onto the paper.',
    'Рассмотрите настоящую бабочку или самолёт. Найдите деталь, которую можно узнать и в бумажной модели.',
  ],
  btitle: ['The butterflies', 'Бабочки'],
  ptitle: ['The aircraft', 'Самолёты'],
  ftitle: ['Why a glider flies', 'Как летит планер'],
  rtitle: ['The powered workshop', 'Планы на моторный полёт'],
  otitle: ['Make it your own', 'Сделайте свою версию'],
  'forces-text': [
    'Your hand gives the launch its starting speed. In a glide, air moving around the wings produces lift and drag while gravity pulls the sheet down. Our paths illustrate ideas to test. A real landing depends on your fold, paper and launch.',
    'Рука задаёт начальную скорость. При планировании поток воздуха создаёт подъёмную силу и сопротивление, а сила тяжести тянет лист вниз. Траектории на экране иллюстрируют идеи для опытов. Место посадки зависит от бумаги, сгибов и запуска.',
  ],
  road: [
    'Today you can build and tune seven unpowered gliders. Our next question is which folds stay consistent across builders. Once we have repeatable flights, we want to investigate a removable, adult-led motor module and compare its effect on balance. POWERUP 4.0 is a commercial reference for that research.',
    'Сегодня можно сложить и настроить семь безмоторных планеров. Сначала мы хотим выяснить, какие сгибы дают повторяемый результат у разных людей. Затем планируем вместе со взрослыми исследовать влияние съёмного мотора на баланс. POWERUP 4.0 служит коммерческим примером для этой работы.',
  ],
  licenses: [
    'The software is shared under Apache 2.0 and the editable geometry under CERN-OHL-W-2.0. Text, illustrations, lessons and printable sheets: © Open Flight. Free to read, print and copy for personal, family and classroom use; all other rights reserved. Material published before 27 November 2026 under CC BY-SA 4.0 keeps that license. Each field photograph links to its photographer and original publication.',
    'Код доступен по Apache 2.0, редактируемая геометрия — по CERN-OHL-W-2.0. Тексты, рисунки, занятия и листы для печати: © Open Flight. Можно бесплатно читать, печатать и копировать для личного, семейного и учебного использования; остальные права защищены. Материалы, опубликованные до 27 ноября 2026 года под CC BY-SA 4.0, сохраняют эту лицензию. Для каждой фотографии указаны автор и исходная публикация.',
  ],
  notices: ['Licenses & credits ↗', 'Лицензии и авторы ↗'],
}
for (const [id, v] of Object.entries(labels)) $(id).textContent = lang === 'es' ? sp[id] : v[Number(ru)]
document.title = $('heading').textContent + ' · Open Flight'
function card(target, title, desc, links, imagePath, alt) {
  const article = document.createElement('article'),
    heading = document.createElement('h3'),
    body = document.createElement('p')
  heading.textContent = title
  body.textContent = desc
  const image = document.createElement('img')
  image.src = imagePath
  image.alt = alt
  image.loading = 'lazy'
  image.width = 320
  image.height = 150
  if (target === 'butter') image.className = 'ref-photo'
  article.append(image, heading, body)
  for (const [label, href] of links) {
    const p = document.createElement('p'),
      a = document.createElement('a')
    a.href = href
    a.textContent = label + ' ↗'
    p.append(a)
    article.append(p)
  }
  $(target).append(article)
}
for (const p of planeCatalog)
  card(
    'planes',
    p.inspiration[lang],
    p.field.look[lang],
    [
      [p.field.museum?.label ?? p.reference.label, p.field.museum?.url ?? p.reference.url],
      [
        { en: 'Build', es: 'Construir', ru: 'Собрать' }[lang] + ' ' + p.name[lang],
        studioLink(p.model_id, lang),
      ],
    ],
    './assets/planes/field/' + p.model_id + '.svg',
    p.field.landmark[lang],
  )
const response = await fetch(new URL('assets/atlas/species.json', import.meta.url))
for (const s of await response.json())
  card(
    'butter',
    s[lang].common_name + ' · ' + s.scientific_name,
    s[lang].observation,
    [
      [s.photo.creator + ' / Pixabay', s.photo.url],
      [s.natural_history.source, s.natural_history.url],
      [
        { en: 'Build', es: 'Construir', ru: 'Собрать' }[lang] + ' ' + s[lang].common_name,
        studioLink(s.id, lang),
      ],
    ],
    './assets/field-guide/' + s.id + '.jpg',
    s[lang].photo_alt,
  )
