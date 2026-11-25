// Each entry opens a creator, publisher or credited demonstrator at the source.
const sources = [
  ['Art-Deco Wing', 'Michael G. LaFosse', 'https://origamiusa.org/classes/convention/2022/art-deco-wing',
    ['A square becomes a broad flying wing.', 'Un cuadrado se convierte en un ala volante.', 'Из квадрата получается широкое летающее крыло.']],
  ['Maple Seed Helicopter', 'Hans Dybkjær', 'https://cfcorigami.com/challenge/action-models/entry/maple-seed-helicopter',
    ['A folded strip turns as it falls, without a clip.', 'Una tira plegada gira al caer sin necesidad de clip.', 'Сложенная полоска вращается при падении без скрепки.']],
  ['Tumbling Wing', 'John Collins', 'https://www.youtube.com/watch?v=JhYZy1ugI3Q&t=921s',
    ['Walk behind the tumbling strip with a board to give it rising air.', 'Camina detrás de la tira con un cartón para crear una corriente ascendente.', 'Иди за кувыркающейся полоской с листом картона, создавая восходящий поток.']],
  ['Bat Plane', 'John Collins', 'https://www.youtube.com/watch?v=JhYZy1ugI3Q&t=662s',
    ['Watch the flexible wings flap during a glide.', 'Observa cómo baten las alas flexibles mientras planea.', 'Посмотри, как гибкие крылья машут в полёте.']],
  ['Backwards Plane', 'Carlos Gonzalez Garcia · Wilson Lee', 'https://heapart.github.io/site/pages/catalogue/azlist/qnEFdbOXGXs.html',
    ['Guess which end leads before the throw.', 'Adivina qué punta irá delante antes de lanzarlo.', 'До запуска угадай, какой конец полетит вперёд.']],
  ['Octagonal Boomerang', 'Jeremy Shafer', 'https://www.youtube.com/watch?v=C7-MK-9qosU',
    ['The same folded disk can spin forward or curve back.', 'El mismo disco puede avanzar girando o describir una curva de vuelta.', 'Один и тот же диск можно бросить вперёд или по дуге обратно.']],
  ['OmniWing', 'Mike Kelsey', 'https://theomniwing.com/build/omniwing',
    ['Compare the twist near the tips of this cut-and-taped wing.', 'Fíjate en la torsión de las puntas de esta ala recortada y sujeta con cinta.', 'Рассмотри изгиб законцовок этого вырезанного крыла со скотчем.']],
]
export function linkedFlyers(locale) {
  const index = ['en', 'es', 'ru'].indexOf(locale)
  const policy = ['Visit the original source', 'Ver la fuente original', 'Перейти к источнику'][index]
  const sourcesToVisit = sources.map(([title, creator, url, descriptions]) => ({ title, creator, url, policy, motion: descriptions[index] }))
  return [...sourcesToVisit, {
    title: 'Acer rubrum seed keys', creator: 'Dcrjsr (2012)',
    url: 'https://commons.wikimedia.org/wiki/File:Acer_rubrum_seed_keys.jpg',
    policy: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', asset: 'assets/objects/maple-keys.jpg',
    motion: ['Look for the heavy seed at the base of each red maple wing. Photo resized for this page.',
      'Busca la semilla en la base de cada ala del arce rojo. Foto reducida para esta página.',
      'Найди тяжёлое семя у основания каждого крылышка красного клёна. Размер фотографии уменьшен.'][index],
  }, {
    title: 'Maple samara flight · Fig. 2', creator: 'B. M. Schaeffer, S. S. Truman, T. T. Truscott & A. K. Dickerson (2024)',
    url: 'https://www.nature.com/articles/s42003-024-05913-3/figures/2',
    policy: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', asset: 'assets/objects/samara-study.png',
    motion: ['Panel a shows the tilt and spin of a falling seed. Panel c shows the wind tunnel used to measure it. Original figure.',
      'En a se ven la inclinación y el giro de la semilla. En c se ve el túnel de viento del experimento. Figura original.',
      'На схеме a показаны наклон и вращение семени. На схеме c видна аэродинамическая труба для измерений. Исходный рисунок.'][index],
  }]
}
