// Chapter 7 · A short history of flight. One source for the chapter page and the book.
// Same contract as how-it-flies.js, plus:
// - `timeline` in a section's text is a list of { when, what } short dated entries;
// - `meta` is the fallback title, standfirst and number until catalog.js lists the chapter;
// - `photo` is a photo slot id; the lead supplies the file.
// Every date comes from a source in `references`. Where sources differ, the text says so.
// `grownUps` keeps its key name for now; its text is "go deeper" material for any reader.
const w = (en, es, ru) => ({ en, es, ru })

const chapter = {
  id: 'history',
  asOf: '2026-11-25',
  review: { en: 'editorial-draft', es: 'needs-native-review', ru: 'needs-native-review' },
  meta: {
    n: 7,
    route: 'history',
    title: w('A short history of flight', 'Breve historia del vuelo', 'Краткая история полёта'),
    standfirst: w(
      'Kites, balloons, gliders, the first aeroplanes and the jump past the speed of sound, and where the paper plane fits in.',
      'Cometas, globos, planeadores, los primeros aviones y el salto más allá de la velocidad del sonido, y dónde encaja el avión de papel.',
      'Воздушные змеи, шары, планёры, первые самолёты и прыжок за скорость звука, и место бумажного самолёта среди них.',
    ),
  },
  opener: {
    figure: 'history-timeline',
    photo: 'biplanes',
    text: {
      en: {
        intro: 'From a kite in China to a jet faster than sound, step by step.',
        grownUps: 'Each entry has a date and a source. Where historians or sources disagree, the text says so. The oldest dates are the least certain, and the figure draws them before a break in the axis.',
        caption: 'The dates of this chapter on one axis. From 1780 the scale is linear. The two oldest dates come before the break.',
      },
      es: {
        intro: 'De una cometa en China a un reactor más rápido que el sonido, paso a paso.',
        grownUps: 'Cada entrada lleva fecha y fuente. Cuando los historiadores o las fuentes discrepan, el texto lo dice. Las fechas más antiguas son las menos seguras, y la figura las dibuja antes de un corte en el eje.',
        caption: 'Las fechas de este capítulo en un solo eje. Desde 1780 la escala es lineal. Las dos fechas más antiguas van antes del corte.',
      },
      ru: {
        intro: 'От змея в Китае до самолёта быстрее звука, шаг за шагом.',
        grownUps: 'У каждой записи есть дата и источник. Если историки или источники расходятся, текст об этом говорит. Самые древние даты наименее надёжны, и на рисунке они стоят до разрыва оси.',
        caption: 'Даты этой главы на одной оси. С 1780 года масштаб линейный. Две самые древние даты стоят до разрыва.',
      },
    },
  },
  sections: [
    {
      id: 'timeline',
      kind: 'timeline',
      figure: 'history-timeline',
      photo: null,
      text: {
        en: {
          caption: 'Eight of the steps in this chapter on one line, from kites to the 1967 contest. The axis breaks before 1780.',
          title: 'Timeline: up to 1903',
          lead: 'Read the dates down the page. Each one is a step that someone took before you.',
          body: [],
          timeline: [
            { when: '5th century BCE, or later', what: 'Kites in China. Tradition credits the thinkers Mozi and Lu Ban. The earliest written account is later, about 200 BCE [[guinness-kites]] [[loc-kites]].' },
            { when: 'About 875', what: 'In Córdoba, in what is now Spain, Abbas ibn Firnas is said to have jumped with wings and landed hard. The story was written down centuries later [[aramco-firnas]].' },
            { when: 'About 1505', what: 'Leonardo da Vinci fills a short codex with studies of how birds fly [[nasm-leonardo]].' },
            { when: '21 November 1783', what: 'Pilâtre de Rozier and the Marquis d’Arlandes make the first free flight by people, in a Montgolfier balloon over Paris [[guinness-balloon]] [[nasm-balloon]].' },
            { when: '1799', what: 'George Cayley engraves a silver disc with a fixed wing, a body and a tail: the first modern idea of an aeroplane [[britannica-cayley-disc]].' },
            { when: '1853', what: 'A full-size Cayley glider carries a man across a valley, the first recorded glider flight with a person aboard [[britannica-cayley]].' },
            { when: '1884', what: 'Near St Petersburg, Alexander Mozhaysky’s steam monoplane leaves a ramp. Whether it really flew is still argued [[aerospaceweb-mozhaysky]].' },
            { when: '1886 to 1894', what: 'Paper aeroplanes appear in print: in a children’s magazine in 1886 and in an aviation book in 1894 [[ppf-history]].' },
            { when: '1891 to 1896', what: 'Otto Lilienthal makes close to 2,000 glides in 16 designs. He dies after a crash on 9 August 1896 [[nasm-lilienthal]] [[britannica-lilienthal]].' },
            { when: '17 December 1903', what: 'Orville and Wilbur Wright make four flights at Kitty Hawk. The first lasts about 12 seconds and the last 59 [[nasm-wright-story]].' },
          ],
          tryIt: {
            steps: [
              'Take a long strip of paper. Draw a line along it.',
              'Mark 1783 at the left and 1903 at the right.',
              'Work out how many years lie between them. Mark 1853 where it belongs.',
            ],
            lookFor: 'The balloon and the aeroplane are 120 years apart. Is 1853 closer to one than the other?',
          },
          grownUps: [
            'The dates for the first kite, for Ibn Firnas and for Mozhaysky come with caveats, set out in the sections below. The 1849 glider that carried a boy, and the doubt over who flew in 1853, are noted in the gliders section.',
            'A second timeline, after the Kitty Hawk section, carries the story from 1906 to today.',
          ],
        },
        es: {
          caption: 'Ocho de los pasos de este capítulo en una sola línea, de las cometas al concurso de 1967. El eje se corta antes de 1780.',
          title: 'Cronología: hasta 1903',
          lead: 'Lee las fechas de arriba abajo. Cada una es un paso que alguien dio antes que tú.',
          body: [],
          timeline: [
            { when: 'Siglo V a. C., o después', what: 'Las cometas en China. La tradición atribuye su invención a los pensadores Mozi y Lu Ban. El relato escrito más antiguo es posterior, de hacia el 200 a. C. [[guinness-kites]] [[loc-kites]].' },
            { when: 'Hacia 875', what: 'En Córdoba, Abbas ibn Firnas se lanza, según se cuenta, con unas alas y aterriza de golpe. La historia se escribió siglos después [[aramco-firnas]].' },
            { when: 'Hacia 1505', what: 'Leonardo da Vinci llena un breve códice con estudios sobre cómo vuelan las aves [[nasm-leonardo]].' },
            { when: '21 de noviembre de 1783', what: 'Pilâtre de Rozier y el marqués d’Arlandes realizan el primer vuelo libre de personas, en un globo Montgolfier sobre París [[guinness-balloon]] [[nasm-balloon]].' },
            { when: '1799', what: 'George Cayley graba un disco de plata con un ala fija, un cuerpo y una cola: la primera idea moderna de avión [[britannica-cayley-disc]].' },
            { when: '1853', what: 'Un planeador Cayley a tamaño real lleva a un hombre a través de un valle, el primer vuelo registrado en planeador con una persona a bordo [[britannica-cayley]].' },
            { when: '1884', what: 'Cerca de San Petersburgo, el monoplano de vapor de Aleksandr Mozhaiski sale de una rampa. Aún se discute si llegó a volar [[aerospaceweb-mozhaysky]].' },
            { when: '1886 a 1894', what: 'Los aeroplanos de papel aparecen impresos: en una revista infantil en 1886 y en un libro de aviación en 1894 [[ppf-history]].' },
            { when: '1891 a 1896', what: 'Otto Lilienthal realiza casi 2000 planeos con 16 diseños. Muere tras un accidente el 9 de agosto de 1896 [[nasm-lilienthal]] [[britannica-lilienthal]].' },
            { when: '17 de diciembre de 1903', what: 'Orville y Wilbur Wright hacen cuatro vuelos en Kitty Hawk. El primero dura unos 12 segundos y el último 59 [[nasm-wright-story]].' },
          ],
          tryIt: {
            steps: [
              'Toma una tira larga de papel. Dibuja una línea a lo largo.',
              'Marca 1783 a la izquierda y 1903 a la derecha.',
              'Calcula cuántos años hay entre las dos. Marca 1853 donde corresponda.',
            ],
            lookFor: 'El globo y el avión están separados por 120 años. ¿1853 está más cerca de uno que del otro?',
          },
          grownUps: [
            'Las fechas de la primera cometa, de Ibn Firnas y de Mozhaiski vienen con salvedades, que se explican en las secciones siguientes. El planeador de 1849 que llevó a un niño y la duda sobre quién voló en 1853 se recogen en la sección de planeadores.',
            'Una segunda cronología, después de la sección de Kitty Hawk, lleva la historia desde 1906 hasta hoy.',
          ],
        },
        ru: {
          caption: 'Восемь шагов из этой главы на одной линии — от змеев до конкурса 1967 года. Ось прервана до 1780 года.',
          title: 'Хронология: до 1903 года',
          lead: 'Читайте даты сверху вниз. Каждая — шаг, который кто-то сделал до вас.',
          body: [],
          timeline: [
            { when: 'V век до н. э. или позже', what: 'Воздушные змеи в Китае. Предание приписывает их мыслителям Мо-цзы и Лу Баню. Самое древнее письменное свидетельство более позднее, около 200 года до н. э. [[guinness-kites]] [[loc-kites]].' },
            { when: 'Около 875', what: 'В Кордове, на территории нынешней Испании, Аббас ибн Фирнас, по преданию, прыгнул с крыльями и тяжело приземлился. Рассказ записали века спустя [[aramco-firnas]].' },
            { when: 'Около 1505', what: 'Леонардо да Винчи заполняет небольшой кодекс заметками о полёте птиц [[nasm-leonardo]].' },
            { when: '21 ноября 1783', what: 'Пилатр де Розье и маркиз д’Арланд совершают первый свободный полёт людей на шаре братьев Монгольфье над Парижем [[guinness-balloon]] [[nasm-balloon]].' },
            { when: '1799', what: 'Джордж Кейли гравирует серебряный диск с неподвижным крылом, корпусом и хвостом — первую современную идею самолёта [[britannica-cayley-disc]].' },
            { when: '1853', what: 'Планёр Кейли в натуральную величину переносит человека через долину — первый зафиксированный полёт на планёре с человеком на борту [[britannica-cayley]].' },
            { when: '1884', what: 'Под Петербургом паровой моноплан Александра Можайского сходит с наклонного помоста. Спор о том, летал ли он, не утих до сих пор [[aerospaceweb-mozhaysky]].' },
            { when: '1886–1894', what: 'Бумажные самолёты появляются в печати: в детском журнале в 1886 году и в книге об авиации в 1894 году [[ppf-history]].' },
            { when: '1891–1896', what: 'Отто Лилиенталь совершает почти 2000 планирующих полётов на 16 конструкциях. Он погибает после падения 9 августа 1896 года [[nasm-lilienthal]] [[britannica-lilienthal]].' },
            { when: '17 декабря 1903', what: 'Орвилл и Уилбер Райт совершают четыре полёта в Китти-Хок. Первый длится около 12 секунд, последний — 59 [[nasm-wright-story]].' },
          ],
          tryIt: {
            steps: [
              'Возьмите длинную полоску бумаги. Проведите вдоль неё линию.',
              'Отметьте 1783 слева и 1903 справа.',
              'Подсчитайте, сколько лет между ними. Отметьте 1853 там, где ему место.',
            ],
            lookFor: 'Между шаром и самолётом 120 лет. Ближе ли 1853 год к одному из них?',
          },
          grownUps: [
            'Даты первого змея, полёта Ибн Фирнаса и опыта Можайского идут с оговорками, они изложены в следующих разделах. Планёр 1849 года, на котором летел мальчик, и сомнение в том, кто летел в 1853 году, отмечены в разделе о планёрах.',
            'Вторая хронология, после раздела о Китти-Хок, ведёт историю от 1906 года до наших дней.',
          ],
        },
      },
    },
    {
      id: 'kites-notebooks',
      kind: 'explainer',
      figure: null,
      photo: 'bird-kites',
      text: {
        en: {
          title: 'Kites, a leap, a notebook',
          lead: 'Long before engines, people tied a wing to a string, jumped with wings on their arms and drew machines in notebooks.',
          body: [
            'Tradition names Mozi and Lu Ban, in the 5th century BCE, as the first kite makers in China. The earliest written account is later: Guinness gives about 200 BCE. The Library of Congress adds that kites in the Pacific almost certainly came earlier [[guinness-kites]] [[loc-kites]].',
            'Around 875, in Córdoba, the inventor Abbas ibn Firnas is said to have built wings and jumped. He came down hard and hurt his back. He later said he had forgotten to give himself a tail [[aramco-firnas]].',
            'About 1505 Leonardo da Vinci wrote his Codex on the Flight of Birds. He drew wing-flapping machines, but a human has too little muscle to flap a wing like a bird [[nasm-leonardo]].',
          ],
          tryIt: {
            steps: [
              'Fold a paper wing the size of your hand.',
              'Hold it by a thread at its centre and run into the wind outdoors, or walk fast indoors.',
              'Draw it. Mark where the thread pulls.',
            ],
            lookFor: 'Does the wing rise when you move faster?',
          },
          grownUps: [
            'The kite dates conflict: tradition says the 5th century BCE, the earliest text about 200 BCE, and Pacific kites may be older still [[guinness-kites]] [[loc-kites]].',
            'Ibn Firnas is legend and evidence mixed. Both surviving versions come from al-Maqqari, a scholar of the 1600s, and they differ: in one he falls and hurts his back, in the other he lands back on a wall. The wings were feathers or silk, so modern replicas are guesses [[aramco-firnas]]. Leonardo’s ornithopter sketches did not lead to a working machine [[nasm-leonardo]].',
          ],
        },
        es: {
          title: 'Cometas, un salto, un cuaderno',
          lead: 'Mucho antes de los motores, la gente ató un ala a un hilo, saltó con alas en los brazos y dibujó máquinas en cuadernos.',
          body: [
            'La tradición nombra a Mozi y Lu Ban, en el siglo V a. C., como los primeros fabricantes de cometas en China. El relato escrito más antiguo es posterior: Guinness da hacia el 200 a. C. La Biblioteca del Congreso añade que las cometas del Pacífico casi seguro son anteriores [[guinness-kites]] [[loc-kites]].',
            'Hacia el año 875, en Córdoba, el inventor Abbas ibn Firnas construyó unas alas y se lanzó, según se cuenta. Cayó de golpe y se lastimó la espalda. Después dijo que se le había olvidado ponerse una cola [[aramco-firnas]].',
            'Hacia 1505 Leonardo da Vinci escribió su Códice sobre el vuelo de los pájaros. Dibujó máquinas de alas batientes, pero una persona tiene muy poca fuerza muscular para batir un ala como un ave [[nasm-leonardo]].',
          ],
          tryIt: {
            steps: [
              'Pliega un ala de papel del tamaño de tu mano.',
              'Sujétala con un hilo por el centro y corre contra el viento al aire libre, o camina deprisa dentro de casa.',
              'Dibújala. Marca dónde tira el hilo.',
            ],
            lookFor: '¿Sube el ala cuando te mueves más rápido?',
          },
          grownUps: [
            'Las fechas de las cometas se contradicen: la tradición dice siglo V a. C., el texto más antiguo hacia el 200 a. C., y las cometas del Pacífico pueden ser aún más antiguas [[guinness-kites]] [[loc-kites]].',
            'Lo de Ibn Firnas mezcla leyenda y pruebas. Las dos versiones que se conservan proceden de al-Maqqari, un erudito del siglo XVII, y no coinciden: en una cae y se lastima la espalda, en la otra aterriza de nuevo sobre un muro. Las alas eran de plumas o de seda, así que las réplicas modernas son conjeturas [[aramco-firnas]]. Los bocetos de ornitóptero de Leonardo no llevaron a una máquina que funcionara [[nasm-leonardo]].',
          ],
        },
        ru: {
          title: 'Змеи, прыжок, блокнот',
          lead: 'Задолго до двигателей люди привязывали крыло к нити, прыгали с крыльями на руках и рисовали машины в блокнотах.',
          body: [
            'Предание называет Мо-цзы и Лу Баня, V век до н. э., первыми создателями змеев в Китае. Самое древнее письменное свидетельство более позднее: Guinness указывает около 200 года до н. э. Библиотека Конгресса добавляет, что змеи в Океании почти наверняка появились раньше [[guinness-kites]] [[loc-kites]].',
            'Около 875 года в Кордове изобретатель Аббас ибн Фирнас, по преданию, сделал крылья и прыгнул. Он тяжело упал и повредил спину. Позже он сказал, что забыл приделать себе хвост [[aramco-firnas]].',
            'Около 1505 года Леонардо да Винчи написал «Кодекс о полёте птиц». Он рисовал машины с машущими крыльями, но у человека слишком мало мышечной силы, чтобы махать крылом, как птица [[nasm-leonardo]].',
          ],
          tryIt: {
            steps: [
              'Сложите бумажное крыло размером с вашу ладонь.',
              'Привяжите нить в центре и бегите против ветра на улице или быстро идите по комнате.',
              'Нарисуйте его. Отметьте, где тянет нить.',
            ],
            lookFor: 'Поднимается ли крыло, когда вы двигаетесь быстрее?',
          },
          grownUps: [
            'Даты змеев противоречат друг другу: предание говорит о V веке до н. э., древнейший текст — около 200 года до н. э., а змеи Океании могут быть ещё старше [[guinness-kites]] [[loc-kites]].',
            'История Ибн Фирнаса — смесь легенды и свидетельств. Обе сохранившиеся версии идут от аль-Маккари, учёного XVII века, и они расходятся: в одной он падает и повреждает спину, в другой садится обратно на стену. Крылья были из перьев или из шёлка, так что современные копии — догадки [[aramco-firnas]]. Эскизы орнитоптера Леонардо не привели к работающей машине [[nasm-leonardo]].',
          ],
        },
      },
    },
    {
      id: 'balloons',
      kind: 'explainer',
      figure: null,
      photo: 'hot-air-balloon',
      text: {
        en: {
          title: 'Balloons over Paris',
          lead: 'In 1783 a sheep, a duck and a rooster flew first. Two months later, people followed.',
          body: [
            'On 19 September 1783 the Montgolfier brothers sent up a hot-air balloon from the palace of Versailles, in front of King Louis XVI. A sheep, a duck and a rooster rode in a wicker basket. About eight minutes later they came down in a wood, alive [[versailles-balloon]] [[guinness-animals]].',
            'On 21 November 1783 Jean-François Pilâtre de Rozier and François Laurent d’Arlandes made the first untethered flight by people, in a Montgolfier balloon. They took off from the Château de la Muette in Paris [[guinness-balloon]]. A tethered test with Pilâtre de Rozier aboard came on 15 October [[nasm-balloon]].',
            'A balloon is not a wing. It floats and goes where the wind goes. It does not glide.',
          ],
          tryIt: {
            steps: [
              'Stretch a balloon, not blown up, over the neck of an empty plastic bottle.',
              'Stand the bottle in a bowl of warm tap water, not hot, for a few minutes.',
              'Move it to a bowl of cold water and watch again.',
            ],
            lookFor: 'As the air warms it spreads out and pushes into the balloon; as it cools it shrinks back. Warm air is lighter than the same space of cool air. That is what carried the Montgolfier balloon up.',
          },
          grownUps: [
            'The animal flight: the Palace of Versailles gives about 600 m up and 3.5 km travelled; Guinness gives about 520 m and 3.2 km. Both say the rooster had a hurt wing [[versailles-balloon]] [[guinness-animals]].',
            'Accounts of the November flight differ. One gives about 5.5 miles in about 25 minutes [[history-balloon]]. Many retellings name only Pilâtre de Rozier, but the Linda Hall Library describes d’Arlandes as the original pilot [[lindahall-darlandes]].',
          ],
        },
        es: {
          title: 'Globos sobre París',
          lead: 'En 1783 volaron primero una oveja, un pato y un gallo. Dos meses después les siguieron las personas.',
          body: [
            'El 19 de septiembre de 1783 los hermanos Montgolfier soltaron un globo de aire caliente desde el palacio de Versalles, ante el rey Luis XVI. Una oveja, un pato y un gallo viajaban en una cesta de mimbre. Unos ocho minutos después bajaron en un bosque, vivos [[versailles-balloon]] [[guinness-animals]].',
            'El 21 de noviembre de 1783 Jean-François Pilâtre de Rozier y François Laurent d’Arlandes hicieron el primer vuelo libre de personas, en un globo Montgolfier. Despegaron del castillo de la Muette, en París [[guinness-balloon]]. Un vuelo de prueba atado, con Pilâtre de Rozier a bordo, se hizo el 15 de octubre [[nasm-balloon]].',
            'Un globo no es un ala. Flota y va adonde va el viento. No planea.',
          ],
          tryIt: {
            steps: [
              'Pon un globo, sin inflar, en la boca de una botella de plástico vacía.',
              'Deja la botella unos minutos en un cuenco con agua templada del grifo, no caliente.',
              'Pásala a un cuenco con agua fría y vuelve a mirar.',
            ],
            lookFor: 'Al calentarse, el aire se expande y entra en el globo; al enfriarse, se encoge. El aire templado pesa menos que el mismo espacio de aire frío. Eso es lo que subió el globo de los Montgolfier.',
          },
          grownUps: [
            'El vuelo de los animales: el palacio de Versalles da unos 600 m de altura y 3,5 km de recorrido; Guinness da unos 520 m y 3,2 km. Los dos dicen que el gallo tenía un ala herida [[versailles-balloon]] [[guinness-animals]].',
            'Los relatos del vuelo de noviembre difieren. Uno da unas 5,5 millas en unos 25 minutos [[history-balloon]]. Muchos relatos nombran solo a Pilâtre de Rozier, pero la Biblioteca Linda Hall describe a d’Arlandes como el piloto original [[lindahall-darlandes]].',
          ],
        },
        ru: {
          title: 'Шары над Парижем',
          lead: 'В 1783 году первыми полетели баран, утка и петух. Через два месяца за ними последовали люди.',
          body: [
            '19 сентября 1783 года братья Монгольфье запустили тепловой аэростат у Версальского дворца, перед королём Людовиком XVI. В плетёной корзине летели баран, утка и петух. Примерно через восемь минут они опустились в лесу живыми [[versailles-balloon]] [[guinness-animals]].',
            '21 ноября 1783 года Жан-Франсуа Пилатр де Розье и Франсуа Лоран д’Арланд совершили первый свободный полёт людей на шаре Монгольфье. Они взлетели от замка Ла-Мюэтт в Париже [[guinness-balloon]]. Пробный полёт на привязи с Пилатром де Розье на борту состоялся 15 октября [[nasm-balloon]].',
            'Шар — не крыло. Он плавает в воздухе и летит туда, куда дует ветер. Он не планирует.',
          ],
          tryIt: {
            steps: [
              'Наденьте ненадутый шарик на горлышко пустой пластиковой бутылки.',
              'Поставьте бутылку на несколько минут в миску с тёплой водой из-под крана, не горячей.',
              'Переставьте её в миску с холодной водой и посмотрите снова.',
            ],
            lookFor: 'Нагреваясь, воздух расширяется и надувает шарик, остывая — сжимается. Тёплый воздух легче, чем холодный в том же объёме. Именно он поднял шар Монгольфье.',
          },
          grownUps: [
            'Полёт животных: Версальский дворец пишет о высоте около 600 м и пути 3,5 км, Guinness — около 520 м и 3,2 км. Оба источника говорят, что у петуха было повреждено крыло [[versailles-balloon]] [[guinness-animals]].',
            'Описания ноябрьского полёта различаются. В одном — около 5,5 мили примерно за 25 минут [[history-balloon]]. Во многих пересказах назван только Пилатр де Розье, но библиотека Линды Холл описывает д’Арланда как первоначального пилота [[lindahall-darlandes]].',
          ],
        },
      },
    },
    {
      id: 'gliders',
      kind: 'explainer',
      figure: null,
      photo: 'glider',
      text: {
        en: {
          title: 'Cayley and Lilienthal',
          lead: 'Before an engine could carry a wing, someone had to learn what the wing does.',
          body: [
            'In 1799 George Cayley engraved a silver disc. One side shows a fixed wing over a boat-shaped body, with a tail. Britannica says it set out the modern idea of an aeroplane: a fixed wing, with separate parts for lift, push and control [[britannica-cayley-disc]] [[britannica-cayley]].',
            'His work ended in 1853 with a full-size glider that carried his coachman, the first recorded manned glider flight. Another source says it flew about 900 feet across Brompton Dale [[britannica-cayley]] [[wiki-cayley]].',
            'Otto Lilienthal flew from 1891. By 1896 he had made close to 2,000 flights in 16 glider designs [[nasm-lilienthal]]. He crashed on 9 August 1896 and died the next day [[britannica-lilienthal]].',
          ],
          tryIt: {
            steps: [
              'Fold a paper plane with a fixed wing and no moving parts.',
              'Launch it from the same spot five times.',
              'Bend the back edge of the wing up 1 mm and launch five more.',
            ],
            lookFor: 'Cayley wanted separate parts for lift and control. Which part changed the path?',
          },
          grownUps: [
            'Who flew in 1853 is uncertain. Britannica says it was his coachman; Wikipedia notes that there is no definitive evidence, and some accounts name a grandson or butler. An earlier glider of 1849 carried a boy whose name is not recorded [[wiki-cayley]] [[encyclopedia-cayley]].',
            'The Smithsonian says close to 2,000 flights; Britannica says some 2,000 flights in at least 16 designs [[nasm-lilienthal]] [[britannica-lilienthal]]. We write “close to 2,000”.',
          ],
        },
        es: {
          title: 'Cayley y Lilienthal',
          lead: 'Antes de que un motor pudiera llevar un ala, alguien tenía que aprender qué hace el ala.',
          body: [
            'En 1799 George Cayley grabó un disco de plata. Una cara muestra un ala fija sobre un cuerpo en forma de barca, con una cola. Britannica dice que expuso la idea moderna de avión: un ala fija, con partes separadas para la sustentación, el empuje y el control [[britannica-cayley-disc]] [[britannica-cayley]].',
            'Su trabajo terminó en 1853 con un planeador a tamaño real que llevó a su cochero, el primer vuelo registrado de un planeador con persona. Otra fuente dice que voló unos 900 pies a través de Brompton Dale [[britannica-cayley]] [[wiki-cayley]].',
            'Otto Lilienthal voló desde 1891. En 1896 había hecho casi 2000 vuelos con 16 diseños de planeador [[nasm-lilienthal]]. Se estrelló el 9 de agosto de 1896 y murió al día siguiente [[britannica-lilienthal]].',
          ],
          tryIt: {
            steps: [
              'Pliega un avión de papel con ala fija y sin piezas móviles.',
              'Lánzalo cinco veces desde el mismo punto.',
              'Dobla 1 mm hacia arriba el borde trasero del ala y lanza otras cinco veces.',
            ],
            lookFor: 'Cayley quería partes separadas para la sustentación y el control. ¿Qué parte cambió la trayectoria?',
          },
          grownUps: [
            'No se sabe con certeza quién voló en 1853. Britannica dice que fue su cochero; Wikipedia señala que no hay pruebas definitivas y algunos relatos nombran a un nieto o a un mayordomo. Un planeador anterior, de 1849, llevó a un niño cuyo nombre no consta [[wiki-cayley]] [[encyclopedia-cayley]].',
            'La Smithsonian dice casi 2000 vuelos; Britannica dice unos 2000 vuelos con al menos 16 diseños [[nasm-lilienthal]] [[britannica-lilienthal]]. Escribimos «casi 2000».',
          ],
        },
        ru: {
          title: 'Кейли и Лилиенталь',
          lead: 'Прежде чем двигатель смог нести крыло, кто-то должен был понять, что крыло делает.',
          body: [
            'В 1799 году Джордж Кейли выгравировал серебряный диск. На одной стороне — неподвижное крыло над корпусом в форме лодки, с хвостом. По словам Britannica, это выразило современную идею самолёта: неподвижное крыло и отдельные части для подъёма, тяги и управления [[britannica-cayley-disc]] [[britannica-cayley]].',
            'Его работа завершилась в 1853 году планёром в натуральную величину, который перенёс его кучера, — первым зафиксированным пилотируемым полётом на планёре. По другому источнику, он пролетел около 900 футов над долиной Бромптон-Дейл [[britannica-cayley]] [[wiki-cayley]].',
            'Отто Лилиенталь летал с 1891 года. К 1896 году он совершил почти 2000 полётов на 16 конструкциях планёров [[nasm-lilienthal]]. Он разбился 9 августа 1896 года и умер на следующий день [[britannica-lilienthal]].',
          ],
          tryIt: {
            steps: [
              'Сложите бумажный самолёт с неподвижным крылом без подвижных частей.',
              'Запустите его пять раз с одного места.',
              'Загните заднюю кромку крыла вверх на 1 мм и запустите ещё пять раз.',
            ],
            lookFor: 'Кейли хотел отдельные части для подъёма и управления. Какая часть изменила путь?',
          },
          grownUps: [
            'Кто летел в 1853 году, неясно. Britannica называет кучера; Wikipedia замечает, что убедительных доказательств нет, а в некоторых рассказах упомянуты внук или дворецкий. Более ранний планёр 1849 года нёс мальчика, имя которого не сохранилось [[wiki-cayley]] [[encyclopedia-cayley]].',
            'Смитсоновский институт пишет «почти 2000 полётов»; Britannica — около 2000 полётов минимум на 16 конструкциях [[nasm-lilienthal]] [[britannica-lilienthal]]. Мы пишем «почти 2000».',
          ],
        },
      },
    },
    {
      id: 'russian-wings',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Mozhaysky and Zhukovsky',
          lead: 'One man built a steam-powered plane. Another worked out, with pencil and paper, why a wing lifts.',
          body: [
            'In 1884, at Krasnoye Selo near St Petersburg, Alexander Mozhaysky tested a large monoplane with steam engines. It could not take off from level ground, so it was launched down a sloping ramp. Early reports say it tipped onto one wing and crashed; later accounts say it made a short hop first [[aerospaceweb-mozhaysky]].',
            'Nikolai Zhukovsky studied how air flows. In 1895 he visited Otto Lilienthal in Berlin and bought one of his gliders. In 1906 he published a rule for the lift of a wing: lift depends on the air, the speed and a swirl of air around the wing [[mactutor-zhukovsky]].',
            'In 1918 he founded TsAGI, Russia’s Central Aerohydrodynamic Institute, and became its first head. TsAGI calls him the father of Russian aviation [[tsagi]] [[mactutor-zhukovsky]].',
          ],
          tryIt: {
            steps: [
              'Roll a strip of paper into a tube and tape it.',
              'Wrap a long thread around the middle.',
              'Hold the free end and let the tube fall off a table, so the thread makes it spin.',
            ],
            lookFor: 'Does the spinning tube fall straight down, or curve away? Spin plus speed makes a sideways push. Zhukovsky’s rule is about that push.',
          },
          grownUps: [
            'Mozhaysky’s flight is disputed. The kinder accounts grew after 1949, when Soviet history named him the inventor of the aeroplane [[aerospaceweb-mozhaysky]]. Later studies by TsAGI are reported both as ruling out sustained flight and as finding it possible with better engines [[wiki-mozhaysky]]. Outside Russia the claim is rarely accepted. We call it an attempt.',
            'The Kutta–Zhukovsky theorem: lift per metre of wing equals air density × speed × circulation, L′ = ρVΓ. Martin Kutta noted that the same equation appears in his 1902 dissertation, so it carries both names [[mactutor-zhukovsky]].',
          ],
        },
        es: {
          title: 'Mozhaiski y Zhukovski',
          lead: 'Un hombre construyó un avión de vapor. Otro descubrió, con lápiz y papel, por qué sustenta un ala.',
          body: [
            'En 1884, en Krásnoye Seló, cerca de San Petersburgo, Aleksandr Mozhaiski probó un gran monoplano con motores de vapor. No podía despegar desde el suelo llano, así que lo lanzaron por una rampa inclinada. Los primeros relatos dicen que se ladeó sobre un ala y se estrelló; otros posteriores, que antes dio un pequeño salto [[aerospaceweb-mozhaysky]].',
            'Nikolái Zhukovski estudiaba cómo fluye el aire. En 1895 visitó a Otto Lilienthal en Berlín y le compró uno de sus planeadores. En 1906 publicó una regla para la sustentación de un ala: depende del aire, de la velocidad y de un remolino de aire alrededor del ala [[mactutor-zhukovsky]].',
            'En 1918 fundó el TsAGI, el Instituto Central de Aerohidrodinámica de Rusia, y fue su primer director. El TsAGI lo llama el padre de la aviación rusa [[tsagi]] [[mactutor-zhukovsky]].',
          ],
          tryIt: {
            steps: [
              'Enrolla una tira de papel en forma de tubo y pégala con cinta.',
              'Enrolla un hilo largo alrededor del centro.',
              'Sujeta el extremo libre y deja caer el tubo desde una mesa, para que el hilo lo haga girar.',
            ],
            lookFor: '¿El tubo que gira cae recto o se desvía? El giro más la velocidad dan un empuje lateral. La regla de Zhukovski trata de ese empuje.',
          },
          grownUps: [
            'El vuelo de Mozhaiski se discute. Los relatos más favorables crecieron a partir de 1949, cuando la historia soviética lo nombró inventor del avión [[aerospaceweb-mozhaysky]]. Los estudios posteriores del TsAGI se citan tanto para descartar un vuelo sostenido como para verlo posible con mejores motores [[wiki-mozhaysky]]. Fuera de Rusia la afirmación casi no se acepta. Lo llamamos un intento.',
            'El teorema de Kutta-Zhukovski: la sustentación por metro de ala es igual a densidad del aire × velocidad × circulación, L′ = ρVΓ. Martin Kutta señaló que la misma ecuación aparece en su tesis de 1902, por eso lleva los dos nombres [[mactutor-zhukovsky]].',
          ],
        },
        ru: {
          title: 'Можайский и Жуковский',
          lead: 'Один построил самолёт с паровыми машинами. Другой карандашом и бумагой объяснил, почему крыло держит.',
          body: [
            'В 1884 году в Красном Селе под Петербургом Александр Можайский испытал большой моноплан с паровыми машинами. С ровной земли он взлететь не мог, поэтому его пустили с наклонного помоста. По ранним сообщениям, он завалился на крыло и разбился; по более поздним — сначала сделал короткий подскок [[aerospaceweb-mozhaysky]].',
            'Николай Жуковский изучал, как течёт воздух. В 1895 году он побывал у Отто Лилиенталя в Берлине и купил один из его планёров. В 1906 году он опубликовал правило для подъёмной силы крыла: она зависит от воздуха, скорости и вихря воздуха вокруг крыла [[mactutor-zhukovsky]].',
            'В 1918 году он основал ЦАГИ — Центральный аэрогидродинамический институт — и стал его первым руководителем. ЦАГИ называет его отцом русской авиации [[tsagi]] [[mactutor-zhukovsky]].',
          ],
          tryIt: {
            steps: [
              'Сверните полоску бумаги в трубочку и закрепите скотчем.',
              'Намотайте длинную нить на середину.',
              'Держите свободный конец и дайте трубочке упасть со стола так, чтобы нить её раскрутила.',
            ],
            lookFor: 'Вращающаяся трубочка падает прямо или уходит в сторону? Вращение и скорость дают боковой толчок. Правило Жуковского — как раз о нём.',
          },
          grownUps: [
            'Полёт Можайского спорен. Благосклонные версии окрепли после 1949 года, когда советская история назвала его изобретателем самолёта [[aerospaceweb-mozhaysky]]. Поздние исследования ЦАГИ приводят и как доказательство того, что устойчивый полёт был невозможен, и как довод, что с лучшими двигателями он мог взлететь [[wiki-mozhaysky]]. За пределами России это утверждение почти не признают. Мы называем это попыткой.',
            'Теорема Кутты — Жуковского: подъёмная сила на метр крыла равна плотности воздуха × скорость × циркуляция, L′ = ρVΓ. Мартин Кутта заметил, что то же уравнение есть в его диссертации 1902 года, поэтому теорема носит оба имени [[mactutor-zhukovsky]].',
          ],
        },
      },
    },
    {
      id: 'wrights',
      kind: 'explainer',
      figure: null,
      photo: 'vintage-plane',
      text: {
        en: {
          title: 'Kitty Hawk, 1903',
          lead: 'Four flights in one morning, and the longest was under a minute.',
          body: [
            'On 17 December 1903 Wilbur and Orville Wright made the first powered, controlled flights of a heavier-than-air machine, at Kitty Hawk, North Carolina. The first took off at 10:35 in the morning [[nasm-wright-story]].',
            'They took turns. Orville flew about 12 seconds and 120 feet, 37 m. Wilbur flew about 175 feet, then Orville about 200. Last, Wilbur flew 852 feet, about 260 m, in 59 seconds [[nasm-wright-story]] [[si-wright-diary]] [[britannica-flyer]].',
            'They sent a telegram home to their father. On the way, 59 seconds became 57, and Orville’s name was misspelled [[nasm-telegraph]]. They had built gliders first. The engine came last.',
          ],
          tryIt: {
            steps: [
              'Mark a start line. Walk 37 big steps from it and stop. That is about the first flight.',
              'Have a friend count 12 seconds, then 59.',
              'Stand still for 12 seconds. Then try 59.',
            ],
            lookFor: 'Is a minute in the air long or short?',
          },
          grownUps: [
            'Orville’s diary gives the first flight as about 12 seconds and the second as about 175 feet, “not measured”. It records no figures for the third. The fourth is 852 feet in 59 seconds [[si-wright-diary]]. Britannica lists the four distances as 120, 175, 200 and 852 feet [[britannica-flyer]].',
            'The National Air and Space Museum’s record gives the fourth flight as 255.6 m (852 ft). But 852 feet is 259.7 m {{estimate}}, so we write “about 260 m” [[nasm-wright]].',
          ],
        },
        es: {
          title: 'Kitty Hawk, 1903',
          lead: 'Cuatro vuelos en una mañana, y el más largo duró menos de un minuto.',
          body: [
            'El 17 de diciembre de 1903 Wilbur y Orville Wright hicieron los primeros vuelos con motor y controlados de una máquina más pesada que el aire en Kitty Hawk, Carolina del Norte. El primero despegó a las 10:35 de la mañana [[nasm-wright-story]].',
            'Se turnaron. Orville voló unos 12 segundos y 120 pies, 37 m. Wilbur voló unos 175 pies, y luego Orville unos 200. Al final, Wilbur recorrió 852 pies, unos 260 m, en 59 segundos [[nasm-wright-story]] [[si-wright-diary]] [[britannica-flyer]].',
            'Enviaron un telegrama a su padre. Por el camino, 59 segundos se convirtieron en 57, y el nombre de Orville llegó mal escrito [[nasm-telegraph]]. Antes habían construido planeadores. El motor llegó el último.',
          ],
          tryIt: {
            steps: [
              'Marca una línea de salida. Camina 37 pasos largos desde ella y para. Es más o menos el primer vuelo.',
              'Pide a un amigo que cuente 12 segundos y luego 59.',
              'Quédate quieto 12 segundos. Después prueba 59.',
            ],
            lookFor: '¿Un minuto en el aire es mucho o poco?',
          },
          grownUps: [
            'El diario de Orville da al primer vuelo unos 12 segundos y al segundo unos 175 pies, «sin medir». Del tercero no anota cifras. El cuarto, 852 pies en 59 segundos [[si-wright-diary]]. Britannica da las cuatro distancias: 120, 175, 200 y 852 pies [[britannica-flyer]].',
            'El registro del Museo Nacional del Aire y del Espacio da al cuarto vuelo 255,6 m (852 pies). Pero 852 pies son 259,7 m {{estimate}}, así que escribimos «unos 260 m» [[nasm-wright]].',
          ],
        },
        ru: {
          title: 'Китти-Хок, 1903',
          lead: 'Четыре полёта за одно утро, и самый длинный был короче минуты.',
          body: [
            '17 декабря 1903 года Уилбер и Орвилл Райт совершили первые управляемые полёты аппарата тяжелее воздуха с двигателем в Китти-Хок, Северная Каролина. Первый взлёт состоялся в 10:35 утра [[nasm-wright-story]].',
            'Они летали по очереди. Орвилл продержался около 12 секунд и пролетел около 120 футов, 37 м. Уилбер — около 175 футов, затем Орвилл — около 200. Последним Уилбер пролетел 852 фута, около 260 м, за 59 секунд [[nasm-wright-story]] [[si-wright-diary]] [[britannica-flyer]].',
            'Они отправили отцу телеграмму. По дороге 59 секунд превратились в 57, а имя Орвилла исказили [[nasm-telegraph]]. Сначала они строили планёры. Двигатель появился последним.',
          ],
          tryIt: {
            steps: [
              'Отметьте линию старта. Отсчитайте от неё 37 больших шагов и остановитесь. Это примерно первый полёт.',
              'Попросите друга отсчитать 12 секунд, а потом 59.',
              'Постойте неподвижно 12 секунд. Затем 59.',
            ],
            lookFor: 'Минута в воздухе — это долго или мало?',
          },
          grownUps: [
            'В дневнике Орвилла первый полёт длится около 12 секунд, второй — около 175 футов, «не измерено». О третьем цифр нет. Четвёртый — 852 фута за 59 секунд [[si-wright-diary]]. Britannica приводит все четыре дальности: 120, 175, 200 и 852 фута [[britannica-flyer]].',
            'В записи Национального музея авиации и космонавтики четвёртый полёт — 255,6 м (852 фута). Но 852 фута — это 259,7 м {{estimate}}, поэтому мы пишем «около 260 м» [[nasm-wright]].',
          ],
        },
      },
    },
    {
      id: 'timeline-faster',
      kind: 'timeline',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Timeline: 1906 to now',
          lead: 'After Kitty Hawk, flight grew up fast. Here are the next hundred years.',
          body: [],
          timeline: [
            { when: '1906', what: 'In Moscow, Nikolai Zhukovsky publishes a rule for the lift of a wing [[mactutor-zhukovsky]].' },
            { when: '12 November 1906', what: 'In Paris, Alberto Santos-Dumont of Brazil flies his 14-bis 220 m in 21.5 seconds, while officials watch [[fai-santos-dumont]].' },
            { when: '13 May 1913', what: 'Near St Petersburg, Igor Sikorsky flies the Grand, a giant with four engines [[sikorsky-grand]].' },
            { when: 'February 1914', what: 'Sikorsky’s next giant, the Ilya Muromets, lifts 16 people and a dog [[sikorsky-grand]].' },
            { when: 'January 1923', what: 'At Getafe, near Madrid, Juan de la Cierva’s autogiro first leaves the ground under a rotor that the wind turns. On 31 January it flies a closed circuit of more than 4 km [[museo-aire-c19]] [[guinness-autogyro]].' },
            { when: '14 October 1947', what: 'Chuck Yeager flies the Bell X-1 faster than sound [[nasm-x1]].' },
            { when: 'February 1967', what: 'A Scientific American contest draws 10,941 paper plane entries from 49 US states and 26 other countries [[time-1967]].' },
            { when: '31 December 1968', what: 'The Soviet Tu-144 becomes the first supersonic airliner to fly [[nasa-tu144]].' },
            { when: '2 March 1969', what: 'Concorde flies for the first time, from Toulouse [[nasm-concorde]].' },
            { when: '2003', what: 'The last Concordes retire [[nasm-concorde]].' },
            { when: 'Now', what: 'Paper planes have records for distance and for time aloft. Chapter 9 lists them.' },
          ],
          tryIt: {
            steps: [
              'Take the paper strip from the first timeline.',
              'Add 1947 to the right of 1903, at the same scale.',
              'Compare the two gaps: 1783 to 1903, and 1903 to 1947.',
            ],
            lookFor: 'Balloon to aeroplane took 120 years. Aeroplane to faster than sound took 44. Which gap surprised you?',
          },
          grownUps: [
            'Dates follow the sources in each section. For the autogiro, sources give 9, 10 or 17 January 1923, so we write “January 1923”. For the Grand, the Sikorsky Archives give 13 May 1913, a date in the old Russian calendar [[guinness-autogyro]] [[sikorsky-grand]].',
          ],
        },
        es: {
          title: 'Cronología: de 1906 a hoy',
          lead: 'Después de Kitty Hawk, el vuelo creció deprisa. Estos son los cien años siguientes.',
          body: [],
          timeline: [
            { when: '1906', what: 'En Moscú, Nikolái Zhukovski publica una regla para la sustentación de un ala [[mactutor-zhukovsky]].' },
            { when: '12 de noviembre de 1906', what: 'En París, el brasileño Alberto Santos-Dumont vuela 220 m en 21,5 segundos con su 14-bis, ante observadores oficiales [[fai-santos-dumont]].' },
            { when: '13 de mayo de 1913', what: 'Cerca de San Petersburgo, Ígor Sikorski vuela el Grand, un gigante de cuatro motores [[sikorsky-grand]].' },
            { when: 'Febrero de 1914', what: 'El siguiente gigante de Sikorski, el Iliá Múromets, eleva a 16 personas y un perro [[sikorsky-grand]].' },
            { when: 'Enero de 1923', what: 'En Getafe, cerca de Madrid, el autogiro de Juan de la Cierva despega por primera vez bajo un rotor que gira con el viento. El 31 de enero recorre un circuito de más de 4 km [[museo-aire-c19]] [[guinness-autogyro]].' },
            { when: '14 de octubre de 1947', what: 'Chuck Yeager vuela el Bell X-1 más rápido que el sonido [[nasm-x1]].' },
            { when: 'Febrero de 1967', what: 'Un concurso de Scientific American recibe 10 941 aviones de papel de 49 estados de EE. UU. y 26 países más [[time-1967]].' },
            { when: '31 de diciembre de 1968', what: 'El soviético Tu-144 se convierte en el primer avión de pasajeros supersónico en volar [[nasa-tu144]].' },
            { when: '2 de marzo de 1969', what: 'El Concorde vuela por primera vez, desde Toulouse [[nasm-concorde]].' },
            { when: '2003', what: 'Se retiran los últimos Concorde [[nasm-concorde]].' },
            { when: 'Hoy', what: 'Los aviones de papel tienen récords de distancia y de tiempo en el aire. El capítulo 9 los recoge.' },
          ],
          tryIt: {
            steps: [
              'Toma la tira de papel de la primera cronología.',
              'Añade 1947 a la derecha de 1903, a la misma escala.',
              'Compara los dos huecos: de 1783 a 1903 y de 1903 a 1947.',
            ],
            lookFor: 'Del globo al avión pasaron 120 años. Del avión a superar el sonido, 44. ¿Qué hueco te sorprende?',
          },
          grownUps: [
            'Las fechas siguen las fuentes de cada sección. Para el autogiro, las fuentes dan el 9, el 10 o el 17 de enero de 1923, así que escribimos «enero de 1923». Para el Grand, los Sikorsky Archives dan el 13 de mayo de 1913, una fecha del antiguo calendario ruso [[guinness-autogyro]] [[sikorsky-grand]].',
          ],
        },
        ru: {
          title: 'Хронология: с 1906 года',
          lead: 'После Китти-Хок авиация росла стремительно. Вот следующие сто лет.',
          body: [],
          timeline: [
            { when: '1906', what: 'В Москве Николай Жуковский публикует правило для подъёмной силы крыла [[mactutor-zhukovsky]].' },
            { when: '12 ноября 1906', what: 'В Париже бразилец Альберту Сантус-Дюмон пролетает на своём 14-bis 220 м за 21,5 секунды на глазах у официальных наблюдателей [[fai-santos-dumont]].' },
            { when: '13 мая 1913', what: 'Под Петербургом Игорь Сикорский поднимает в воздух «Гранд» — гиганта с четырьмя моторами [[sikorsky-grand]].' },
            { when: 'Февраль 1914', what: 'Следующий гигант Сикорского, «Илья Муромец», поднимает 16 человек и собаку [[sikorsky-grand]].' },
            { when: 'Январь 1923', what: 'В Хетафе под Мадридом автожир Хуана де ла Сьервы впервые отрывается от земли под ротором, который вращает ветер. 31 января он пролетает по кругу больше 4 км [[museo-aire-c19]] [[guinness-autogyro]].' },
            { when: '14 октября 1947', what: 'Чак Йегер на Bell X-1 летит быстрее звука [[nasm-x1]].' },
            { when: 'Февраль 1967', what: 'Конкурс журнала Scientific American получает 10 941 бумажный самолёт из 49 штатов США и ещё 26 стран [[time-1967]].' },
            { when: '31 декабря 1968', what: 'Советский Ту-144 становится первым сверхзвуковым пассажирским самолётом, поднявшимся в воздух [[nasa-tu144]].' },
            { when: '2 марта 1969', what: '«Конкорд» впервые взлетает в Тулузе [[nasm-concorde]].' },
            { when: '2003', what: 'Последние «Конкорды» уходят на покой [[nasm-concorde]].' },
            { when: 'Сегодня', what: 'У бумажных самолётов есть рекорды дальности и времени в воздухе. Глава 9 их перечисляет.' },
          ],
          tryIt: {
            steps: [
              'Возьмите бумажную полоску из первой хронологии.',
              'Добавьте 1947 правее 1903 в том же масштабе.',
              'Сравните два промежутка: от 1783 до 1903 и от 1903 до 1947.',
            ],
            lookFor: 'От шара до самолёта прошло 120 лет. От самолёта до скорости звука — 44. Какой промежуток вас удивил?',
          },
          grownUps: [
            'Даты взяты из источников каждого раздела. Для автожира источники называют 9, 10 или 17 января 1923 года, поэтому мы пишем «январь 1923». Для «Гранда» архив Сикорского даёт 13 мая 1913 года — по старому стилю [[guinness-autogyro]] [[sikorsky-grand]].',
          ],
        },
      },
    },
    {
      id: 'santos-dumont',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Paris, 1906: the 14-bis',
          lead: 'A Brazilian in Paris lifted off the grass while officials stood ready with their stopwatches.',
          body: [
            'On 12 November 1906 Alberto Santos-Dumont, from Brazil, flew his 14-bis 220 metres in 21.5 seconds, about 6 metres above the ground, in Paris [[fai-santos-dumont]].',
            'Officials of the Aéro-Club de France watched and measured it. It was the first flight in Europe longer than 100 metres [[wrightorg-santos-first]]. A few weeks earlier, in October, the 14-bis had already hopped about 60 m [[si-santos]].',
            'The Wrights flew three years earlier, on a lonely beach, with few people watching. That is why many people in Brazil call Santos-Dumont the first to fly. This book counts both: the Wrights made the first controlled powered flights, and Santos-Dumont made the first that officials measured in Europe.',
          ],
          tryIt: {
            steps: [
              'Find a long path or a playground. Walk 220 big steps: about the length of the flight.',
              'Time yourself walking it.',
              'Now run it.',
            ],
            lookFor: 'Was your run faster or slower than 21.5 seconds? The 14-bis went about as fast as a quick bicycle.',
          },
          grownUps: [
            'From FAI’s figures, the average speed was 220 m ÷ 21.5 s, about 10.2 m/s or 37 km/h {{estimate}}. Some accounts give the time as 21 1/5 seconds; we follow FAI [[fai-santos-dumont]] [[wrightorg-santos]].',
            '“First to fly” depends on the rules you choose: in front of official witnesses, or with control and power. We give both stories and their dates rather than pick a winner. FAI, the world body that keeps air records, calls 12 November the first officially observed flight in Europe over 25 m; other accounts give that to the October hop, dated 23 or 27 October, of 50 or 60 m [[fai-santos-dumont]] [[si-santos]] [[wrightorg-santos-first]].',
          ],
        },
        es: {
          title: 'París, 1906: el 14-bis',
          lead: 'Un brasileño despegó de la hierba en París mientras los jueces esperaban con sus cronómetros.',
          body: [
            'El 12 de noviembre de 1906 el brasileño Alberto Santos-Dumont voló con su 14-bis 220 metros en 21,5 segundos, a unos 6 metros del suelo, en París [[fai-santos-dumont]].',
            'Lo vieron y lo midieron jueces del Aéro-Club de France. Fue el primer vuelo en Europa de más de 100 metros [[wrightorg-santos-first]]. Unas semanas antes, en octubre, el 14-bis ya había dado un salto de unos 60 m [[si-santos]].',
            'Los Wright habían volado tres años antes, en una playa solitaria y con poca gente mirando. Por eso en Brasil muchos llaman a Santos-Dumont el primero en volar. Este libro cuenta los dos: los Wright hicieron los primeros vuelos con motor y controlados, y Santos-Dumont el primero que unos jueces midieron en Europa.',
          ],
          tryIt: {
            steps: [
              'Busca un camino largo o un patio. Da 220 pasos largos: más o menos lo que duró el vuelo.',
              'Cronométrate andando.',
              'Ahora hazlo corriendo.',
            ],
            lookFor: '¿Tu carrera fue más rápida o más lenta que 21,5 segundos? El 14-bis iba más o menos como una bicicleta rápida.',
          },
          grownUps: [
            'Con las cifras de la FAI, la velocidad media fue de 220 m ÷ 21,5 s, unos 10,2 m/s o 37 km/h {{estimate}}. Algunos relatos dan 21 1/5 segundos; seguimos a la FAI [[fai-santos-dumont]] [[wrightorg-santos]].',
            '«El primero en volar» depende de las reglas que elijas: ante testigos oficiales, o con control y motor. Damos las dos historias con sus fechas en lugar de elegir un ganador. La FAI, el organismo mundial que guarda los récords del aire, llama al 12 de noviembre el primer vuelo observado oficialmente en Europa de más de 25 m; otros relatos se lo dan al salto de octubre, fechado el 23 o el 27, de 50 o 60 m [[fai-santos-dumont]] [[si-santos]] [[wrightorg-santos-first]].',
          ],
        },
        ru: {
          title: 'Париж, 1906: 14-bis',
          lead: 'Бразилец в Париже оторвался от травы, пока судьи держали наготове секундомеры.',
          body: [
            '12 ноября 1906 года бразилец Альберту Сантус-Дюмон пролетел в Париже на своём 14-bis 220 метров за 21,5 секунды на высоте около 6 метров [[fai-santos-dumont]].',
            'Полёт видели и измеряли судьи Аэроклуба Франции. Это был первый в Европе полёт длиннее 100 метров [[wrightorg-santos-first]]. За несколько недель до этого, в октябре, 14-bis уже подпрыгнул примерно на 60 м [[si-santos]].',
            'Братья Райт летали на три года раньше, на безлюдном пляже, почти без зрителей. Поэтому в Бразилии многие считают первым Сантус-Дюмона. Эта книга признаёт обоих: Райты совершили первые управляемые полёты с двигателем, а Сантус-Дюмон — первый полёт, измеренный судьями в Европе.',
          ],
          tryIt: {
            steps: [
              'Найдите длинную дорожку или площадку. Пройдите 220 больших шагов — примерно длину полёта.',
              'Засеките время шагом.',
              'Теперь пробегите.',
            ],
            lookFor: 'Ваш бег был быстрее или медленнее 21,5 секунды? 14-bis летел примерно со скоростью быстрого велосипеда.',
          },
          grownUps: [
            'По цифрам FAI средняя скорость — 220 м ÷ 21,5 с, около 10,2 м/с, или 37 км/ч {{estimate}}. В некоторых описаниях время — 21 1/5 секунды; мы следуем FAI [[fai-santos-dumont]] [[wrightorg-santos]].',
            '«Первый полёт» зависит от выбранных правил: при официальных свидетелях или с управлением и двигателем. Мы приводим обе истории с датами и не выбираем победителя. FAI, всемирная организация, которая ведёт авиационные рекорды, называет 12 ноября первым официально зафиксированным полётом в Европе длиннее 25 м; другие источники отдают это октябрьскому подлёту 23 или 27 октября на 50 или 60 м [[fai-santos-dumont]] [[si-santos]] [[wrightorg-santos-first]].',
          ],
        },
      },
    },
    {
      id: 'sikorsky-giants',
      kind: 'explainer',
      figure: null,
      photo: 'vintage-plane',
      text: {
        en: {
          title: 'Sikorsky’s giants',
          lead: 'In 1913, in Russia, a young engineer flew a plane with four engines and a cabin.',
          body: [
            'On 13 May 1913, at ten in the evening, Igor Sikorsky took the Grand into the air from an airfield in St Petersburg. It had four 100-horsepower engines and wings 28 m across. It climbed to about 120 m, turned, climbed about 75 m more and turned again. It flew for 10 minutes [[sikorsky-grand]].',
            'In August 1913 the Grand carried eight people for an hour. Sikorsky’s next giant, the Ilya Muromets, was bigger still. In February 1914 it lifted 16 people and a dog [[sikorsky-grand]].',
            'In the summer of 1914 Sikorsky and his crew flew the Ilya Muromets from St Petersburg to Kyiv and back, about 2,600 km, putting out an engine fire on the way [[sikorsky-grand]].',
          ],
          tryIt: {
            steps: [
              'Count out 28 big steps in a hall or playground. That is the width of the Grand’s wings.',
              'Fold one paper plane with very wide wings and one with short wings.',
              'Launch both gently from the same height.',
            ],
            lookFor: 'Which one glides more slowly? Big wings carry big loads at low speed.',
          },
          grownUps: [
            'The Sikorsky Archives give 13 May 1913 for the Grand’s first flight, after taxi tests and short hops from 10 May. One photo caption on the same page says 1914. Other sources give 11 or 12 February 1914 for the flight with 16 people [[sikorsky-grand]]. Russia still used the old calendar until 1918, so its dates may be 13 days behind ours: Russian calendars mark the Grand’s flight on 26 May [[calend-vityaz]].',
            'Our conversions: 91 feet 10 inches is 28.0 m, 400 feet is 122 m, another 250 feet is 76 m, so the top was about 200 m, and 1,600 miles is 2,575 km {{estimate}}. Kyiv is written Kiev in many older sources.',
          ],
        },
        es: {
          title: 'Los gigantes de Sikorski',
          lead: 'En 1913, en Rusia, un joven ingeniero voló un avión con cuatro motores y una cabina.',
          body: [
            'El 13 de mayo de 1913, a las diez de la noche, Ígor Sikorski elevó el Grand desde un aeródromo de San Petersburgo. Tenía cuatro motores de 100 caballos y alas de 28 m de punta a punta. Subió a unos 120 m, giró, subió unos 75 m más y volvió a girar. Voló 10 minutos [[sikorsky-grand]].',
            'En agosto de 1913 el Grand llevó a ocho personas durante una hora. El siguiente gigante de Sikorski, el Iliá Múromets, era aún mayor. En febrero de 1914 elevó a 16 personas y un perro [[sikorsky-grand]].',
            'En el verano de 1914 Sikorski y su tripulación volaron el Iliá Múromets de San Petersburgo a Kiev y vuelta, unos 2600 km, y apagaron un incendio de motor por el camino [[sikorsky-grand]].',
          ],
          tryIt: {
            steps: [
              'Cuenta 28 pasos largos en un pasillo o un patio. Es la anchura de las alas del Grand.',
              'Pliega un avión de papel con alas muy anchas y otro con alas cortas.',
              'Lánzalos con suavidad desde la misma altura.',
            ],
            lookFor: '¿Cuál planea más despacio? Las alas grandes llevan mucha carga a poca velocidad.',
          },
          grownUps: [
            'Los Sikorsky Archives dan el 13 de mayo de 1913 para el primer vuelo del Grand, tras pruebas de rodaje y saltos cortos desde el 10 de mayo. Un pie de foto de la misma página dice 1914. Otras fuentes dan el 11 o el 12 de febrero de 1914 para el vuelo con 16 personas [[sikorsky-grand]]. Rusia usó el calendario antiguo hasta 1918, así que sus fechas pueden ir 13 días por detrás de las nuestras: los calendarios rusos marcan el vuelo del Grand el 26 de mayo [[calend-vityaz]].',
            'Conversiones nuestras: 91 pies y 10 pulgadas son 28,0 m, 400 pies son 122 m, otros 250 pies son 76 m, así que llegó a unos 200 m, y 1600 millas son 2575 km {{estimate}}.',
          ],
        },
        ru: {
          title: 'Гиганты Сикорского',
          lead: 'В 1913 году в России молодой инженер поднял в воздух самолёт с четырьмя моторами и кабиной.',
          body: [
            '13 мая 1913 года, в десять часов вечера, Игорь Сикорский поднял «Гранд» с аэродрома в Петербурге. У него было четыре мотора по 100 лошадиных сил и крылья размахом 28 м. Он набрал около 120 м, развернулся, поднялся ещё примерно на 75 м и развернулся снова. Полёт длился 10 минут [[sikorsky-grand]].',
            'В августе 1913 года «Гранд» продержал в воздухе восемь человек целый час. Следующий гигант Сикорского, «Илья Муромец», был ещё больше. В феврале 1914 года он поднял 16 человек и собаку [[sikorsky-grand]].',
            'Летом 1914 года Сикорский с экипажем пролетел на «Илье Муромце» из Петербурга в Киев и обратно, около 2600 км, и по пути потушил пожар мотора [[sikorsky-grand]].',
          ],
          tryIt: {
            steps: [
              'Отсчитайте 28 больших шагов в коридоре или во дворе. Это размах крыльев «Гранда».',
              'Сложите один бумажный самолёт с очень широкими крыльями и один с короткими.',
              'Мягко запустите оба с одной высоты.',
            ],
            lookFor: 'Какой планирует медленнее? Большие крылья несут большой груз на малой скорости.',
          },
          grownUps: [
            'Архив Сикорского называет датой первого полёта «Гранда» 13 мая 1913 года, после пробежек и коротких подлётов с 10 мая. В одной подписи к фото на той же странице стоит 1914 год. Другие источники дают 11 или 12 февраля 1914 года для полёта с 16 людьми [[sikorsky-grand]]. До 1918 года Россия жила по старому стилю, и её даты могут отставать от наших на 13 дней: российские календари отмечают полёт «Гранда» 26 мая [[calend-vityaz]].',
            'Наши пересчёты: 91 фут 10 дюймов — это 28,0 м, 400 футов — 122 м, ещё 250 футов — 76 м, то есть он поднялся примерно на 200 м, 1600 миль — 2575 км {{estimate}}.',
          ],
        },
      },
    },
    {
      id: 'cierva-autogiro',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Getafe, 1923: the autogiro',
          lead: 'An engineer from Murcia wanted an aircraft that would not fall out of the sky. His answer was a rotor that spins by itself.',
          body: [
            'In 1919 Juan de la Cierva, from Murcia in Spain, saw his big biplane wrecked on its second flight. He set out to design a safer aircraft [[museo-aire-cierva]].',
            'His autogiro has a rotor on top that no engine turns. As the machine moves, air flows up through the blades and keeps them spinning, like a falling maple seed. If the engine stops, the rotor keeps turning and the machine comes down gently [[museo-aire-cierva]].',
            'In January 1923, at Getafe near Madrid, his C-4 left the ground for the first time. On 31 January it flew a closed circuit of more than 4 km in three and a half minutes, about 25 m up. The key was a hinge at the root of each blade, so it could flap up and down [[museo-aire-cierva]] [[museo-aire-c19]].',
          ],
          tryIt: {
            steps: [
              'Cut a paper strip 3 cm by 15 cm. Cut down the middle from one end to halfway.',
              'Fold the two flaps opposite ways, like rotor blades. Fold up the bottom and add a paper clip.',
              'Hold it up high and let go.',
            ],
            lookFor: 'Nothing turns the rotor except the air rushing past. That is autorotation, Cierva’s idea.',
          },
          grownUps: [
            'Sources disagree on the first day. Guinness gives 9 January 1923; other historians give 17 January. The Museo de Aeronáutica y Astronáutica in Madrid quotes Cierva’s own report of February 1923: a first take-off on 10 January with Gómez Spencer at the controls, official tests at Getafe on 22 January, then the 4 km circuit on 31 January [[guinness-autogyro]] [[museo-aire-c19]]. A later museum sheet runs the first flight and the 4 km circuit together [[museo-aire-cierva]].',
            'Why the hinge matters: a blade moving forwards meets faster air than a blade moving back, so one side lifts more. Letting each blade flap evens out the lift. The museum calls the autogiro a forerunner of the helicopter [[museo-aire-cierva]].',
          ],
        },
        es: {
          title: 'Getafe, 1923: el autogiro',
          lead: 'Un ingeniero murciano quería una aeronave que no se cayera del cielo. Su respuesta fue un rotor que gira solo.',
          body: [
            'En 1919 el murciano Juan de la Cierva vio cómo su gran biplano se destrozaba en su segundo vuelo. Se propuso diseñar una aeronave más segura [[museo-aire-cierva]].',
            'Su autogiro tiene arriba un rotor que no mueve ningún motor. Al avanzar la máquina, el aire sube entre las palas y las mantiene girando, como una semilla de arce al caer. Si el motor se para, el rotor sigue girando y el aparato baja con suavidad [[museo-aire-cierva]].',
            'En enero de 1923, en Getafe, cerca de Madrid, su C-4 despegó por primera vez. El 31 de enero recorrió un circuito cerrado de más de 4 km en tres minutos y medio, a unos 25 m de altura. La clave fue una articulación en la raíz de cada pala, para que pudiera batir arriba y abajo [[museo-aire-cierva]] [[museo-aire-c19]].',
          ],
          tryIt: {
            steps: [
              'Corta una tira de papel de 3 cm por 15 cm. Córtala por el centro desde un extremo hasta la mitad.',
              'Dobla las dos solapas en sentidos opuestos, como palas de un rotor. Dobla la parte de abajo y ponle un clip.',
              'Sostenlo en alto y suéltalo.',
            ],
            lookFor: 'Nada hace girar el rotor salvo el aire que pasa. Eso es la autorrotación, la idea de Cierva.',
          },
          grownUps: [
            'Las fuentes no coinciden en el primer día. Guinness da el 9 de enero de 1923; otros historiadores, el 17. El Museo de Aeronáutica y Astronáutica de Madrid cita el informe del propio Cierva de febrero de 1923: un primer despegue el 10 de enero, con Gómez Spencer a los mandos, pruebas oficiales en Getafe el 22 y el circuito de 4 km el 31 [[guinness-autogyro]] [[museo-aire-c19]]. Una ficha posterior del museo junta el primer vuelo y el circuito de 4 km [[museo-aire-cierva]].',
            'Por qué importa la articulación: la pala que avanza encuentra aire más rápido que la que retrocede, así que un lado sustenta más. Dejar que cada pala bata iguala la sustentación. El museo llama al autogiro precursor del helicóptero [[museo-aire-cierva]].',
          ],
        },
        ru: {
          title: 'Хетафе, 1923: автожир',
          lead: 'Инженер из Мурсии хотел летательный аппарат, который не падает с неба. Его ответом стал ротор, который вращается сам.',
          body: [
            'В 1919 году Хуан де ла Сьерва из испанской Мурсии увидел, как его большой биплан разбился во втором полёте. Он решил создать более безопасный аппарат [[museo-aire-cierva]].',
            'У его автожира наверху ротор, который не крутит никакой двигатель. Когда машина движется, воздух проходит снизу сквозь лопасти и вращает их, как падающее крылатое семечко клёна. Если двигатель остановится, ротор продолжит вращаться, и машина мягко опустится [[museo-aire-cierva]].',
            'В январе 1923 года в Хетафе под Мадридом его C-4 впервые оторвался от земли. 31 января он пролетел по замкнутому кругу больше 4 км за три с половиной минуты на высоте около 25 м. Главным был шарнир у корня каждой лопасти, чтобы она могла взмахивать вверх и вниз [[museo-aire-cierva]] [[museo-aire-c19]].',
          ],
          tryIt: {
            steps: [
              'Вырежьте полоску бумаги 3 на 15 см. Разрежьте её посередине от одного конца до половины.',
              'Отогните две половинки в разные стороны, как лопасти. Загните низ и прикрепите скрепку.',
              'Поднимите повыше и отпустите.',
            ],
            lookFor: 'Ротор вращает только набегающий воздух. Это авторотация — идея Сьервы.',
          },
          grownUps: [
            'Источники расходятся в дне первого полёта. Guinness называет 9 января 1923 года, другие историки — 17 января. Музей авиации и космонавтики в Мадриде приводит отчёт самого Сьервы от февраля 1923 года: первый взлёт 10 января, за штурвалом Гомес Спенсер, официальные испытания в Хетафе 22 января и круг в 4 км 31 января [[guinness-autogyro]] [[museo-aire-c19]]. В более поздней справке музея первый полёт и круг в 4 км слиты в один [[museo-aire-cierva]].',
            'Зачем нужен шарнир: лопасть, идущая вперёд, встречает более быстрый воздух, чем идущая назад, и одна сторона поднимает сильнее. Взмахи лопастей выравнивают подъёмную силу. Музей называет автожир предшественником вертолёта [[museo-aire-cierva]].',
          ],
        },
      },
    },
    {
      id: 'women-who-flew',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Women who flew',
          lead: 'In 1910 a Frenchwoman earned the first pilot’s licence ever given to a woman. Others soon followed, from Russia to Spain and the United States.',
          body: [
            'On 8 March 1910 Raymonde de Laroche, from France, became the first woman in the world to earn a pilot’s licence [[fai-laroche]]. In August 1911, near St Petersburg, Lydia Zvereva earned licence number 31, the first won by a woman in the Russian Empire [[rbth-zvereva]].',
            'A newspaper publisher told Bessie Coleman, from the United States, to learn to fly in France, where Black people met more respect. She went, and on 15 June 1921 she earned her licence, the first for an African American woman [[nasm-coleman]] [[fai-coleman]].',
            'On 15 September 1928, at Getafe near Madrid, María Bernaldo de Quirós became the first Spanish woman to earn a pilot’s licence [[orellana-2015]]. On 20 and 21 May 1932 Amelia Earhart flew alone across the Atlantic without stopping, from Newfoundland to a farmer’s field in Northern Ireland, in about 15 hours. No woman had done it before [[nasm-earhart]].',
          ],
          tryIt: {
            steps: [
              'Fold a card in half to make your own pilot’s licence.',
              'Write your name, today’s date and a licence number.',
              'Fly a paper plane three times and write your best flight inside.',
            ],
            lookFor: 'Lydia Zvereva’s licence was number 31. What number would yours be in your class?',
          },
          grownUps: [
            'Firsts depend on the rules. The Smithsonian calls Harriet Quimby the first licensed woman pilot in the United States, on 1 August 1911; in April 1912 she became the first woman to fly across the English Channel [[nasm-quimby]]. Russia Beyond dates Zvereva’s licence 23 August 1911 [[rbth-zvereva]]. Bernaldo de Quirós’s date comes from her file in the Spanish Air Force archive, as a 2015 study reports [[orellana-2015]].',
            'Coleman trained for about seven months at the Caudron brothers’ school; FAI calls her the first person of colour to hold one of its licences [[fai-coleman]]. The Smithsonian keeps Earhart’s plane, a Lockheed Vega 5B, and gives the flight as 2,026 miles; 3,260 km is our conversion {{estimate}} [[nasm-earhart]].',
          ],
        },
        es: {
          title: 'Mujeres que volaron',
          lead: 'En 1910 una francesa obtuvo la primera licencia de piloto concedida a una mujer. Pronto la siguieron otras, de Rusia a España y Estados Unidos.',
          body: [
            'El 8 de marzo de 1910 la francesa Raymonde de Laroche se convirtió en la primera mujer del mundo con licencia de piloto [[fai-laroche]]. En agosto de 1911, cerca de San Petersburgo, Lidia Zvereva obtuvo la licencia número 31, la primera de una mujer en el Imperio ruso [[rbth-zvereva]].',
            'Un editor de periódicos aconsejó a la estadounidense Bessie Coleman que aprendiera a volar en Francia, donde las personas negras encontraban más respeto. Fue allí, y el 15 de junio de 1921 obtuvo su licencia, la primera de una mujer afroamericana [[nasm-coleman]] [[fai-coleman]].',
            'El 15 de septiembre de 1928, en Getafe, cerca de Madrid, María Bernaldo de Quirós se convirtió en la primera española con licencia de piloto [[orellana-2015]]. El 20 y 21 de mayo de 1932 Amelia Earhart cruzó sola el Atlántico sin escalas, de Terranova a un prado de Irlanda del Norte, en unas 15 horas. Ninguna mujer lo había hecho antes [[nasm-earhart]].',
          ],
          tryIt: {
            steps: [
              'Dobla una cartulina por la mitad para hacer tu propia licencia de piloto.',
              'Escribe tu nombre, la fecha de hoy y un número de licencia.',
              'Lanza un avión de papel tres veces y apunta dentro tu mejor vuelo.',
            ],
            lookFor: 'La licencia de Lidia Zvereva fue la número 31. ¿Qué número tendría la tuya en tu clase?',
          },
          grownUps: [
            'Ser la primera depende de las reglas. La Smithsonian llama a Harriet Quimby la primera mujer con licencia de piloto en Estados Unidos, el 1 de agosto de 1911; en abril de 1912 fue la primera mujer en cruzar volando el canal de la Mancha [[nasm-quimby]]. Russia Beyond fecha la licencia de Zvereva el 23 de agosto de 1911 [[rbth-zvereva]]. La fecha de Bernaldo de Quirós sale de su expediente en el Archivo Histórico del Ejército del Aire, según un estudio de 2015 [[orellana-2015]].',
            'Coleman se formó unos siete meses en la escuela de los hermanos Caudron; la FAI la llama la primera persona de color con una de sus licencias [[fai-coleman]]. La Smithsonian guarda el avión de Earhart, un Lockheed Vega 5B, y da el vuelo en 2026 millas; los 3260 km son conversión nuestra {{estimate}} [[nasm-earhart]].',
          ],
        },
        ru: {
          title: 'Женщины, которые летали',
          lead: 'В 1910 году француженка получила первое пилотское свидетельство, выданное женщине. Вскоре за ней последовали другие — от России до Испании и США.',
          body: [
            '8 марта 1910 года француженка Раймонда де Ларош стала первой в мире женщиной с пилотским свидетельством [[fai-laroche]]. В августе 1911 года под Петербургом Лидия Зверева получила диплом пилота-авиатора № 31 — первый, выданный женщине в Российской империи [[rbth-zvereva]].',
            'Американке Бесси Коулман издатель газеты посоветовал учиться летать во Франции, где к чернокожим относились с большим уважением. Она поехала туда и 15 июня 1921 года получила свидетельство — первое у афроамериканки [[nasm-coleman]] [[fai-coleman]].',
            '15 сентября 1928 года в Хетафе под Мадридом Мария Бернальдо де Кирос стала первой испанкой с пилотским свидетельством [[orellana-2015]]. 20–21 мая 1932 года Амелия Эрхарт в одиночку и без посадок пересекла Атлантику — от Ньюфаундленда до фермерского поля в Северной Ирландии — примерно за 15 часов. До неё этого не делала ни одна женщина [[nasm-earhart]].',
          ],
          tryIt: {
            steps: [
              'Сложите карточку пополам — это будет ваше пилотское свидетельство.',
              'Напишите своё имя, сегодняшнюю дату и номер свидетельства.',
              'Запустите бумажный самолёт три раза и впишите внутрь лучший полёт.',
            ],
            lookFor: 'У Лидии Зверевой был диплом № 31. Какой номер был бы у вашего свидетельства в классе?',
          },
          grownUps: [
            'Кто первая — зависит от правил. Смитсоновский институт называет Гарриет Куимби первой женщиной-пилотом с лицензией в США — 1 августа 1911 года; в апреле 1912 года она первой из женщин перелетела Ла-Манш [[nasm-quimby]]. Russia Beyond датирует диплом Зверевой 23 августа 1911 года [[rbth-zvereva]]. Дата Бернальдо де Кирос взята из её дела в историческом архиве ВВС Испании, как сообщает исследование 2015 года [[orellana-2015]].',
            'Коулман около семи месяцев училась в школе братьев Кодрон; FAI называет её первым темнокожим человеком с лицензией FAI [[fai-coleman]]. Смитсоновский институт хранит самолёт Эрхарт, Lockheed Vega 5B, и указывает длину перелёта 2026 миль; 3260 км — наш пересчёт {{estimate}} [[nasm-earhart]].',
          ],
        },
      },
    },
    {
      id: 'sound-barrier',
      kind: 'explainer',
      figure: null,
      photo: 'contrail-sunset',
      text: {
        en: {
          title: 'Faster than sound',
          lead: 'In 1947 a small orange rocket plane flew faster than sound.',
          body: [
            'On 14 October 1947 Chuck Yeager flew the Bell X-1 at Mach 1.06, about 1,127 km/h, some 13,000 m up. A B-29 bomber carried it to about 7,000 m and dropped it; then its rocket engine fired. Its shape copied a machine-gun bullet [[nasm-x1]].',
            'Airliners followed. The Soviet Tu-144 flew first, on 31 December 1968, about two months before the Anglo-French Concorde first flew on 2 March 1969 [[nasa-tu144]] [[nasm-concorde]].',
            'Concorde cruised at about twice the speed of sound, between 17 and 18 km up, high enough for passengers to see the curve of the Earth. It crossed the Atlantic in under four hours [[nasm-concorde]].',
          ],
          tryIt: {
            steps: [
              'Stand at one end of a playing field. Ask a friend at the far end to clap their hands high above their head.',
              'Watch their hands, and listen.',
              'Swap places and try again.',
            ],
            lookFor: 'You see the clap a moment before you hear it. Sound takes time to travel. The X-1 flew faster than that.',
          },
          grownUps: [
            'The Tu-144 began passenger service on 1 November 1977, from Moscow to Alma-Ata, and stopped in 1978. NASA counts 102 passenger flights; Russia’s Parliamentary Gazette counts 102 Aeroflot flights, of which 55 carried passengers [[nasa-tu144]] [[pnp-tu144]]. In the 1990s NASA and Tupolev turned the last Tu-144 into a flying laboratory [[nasa-tu144]].',
            'Concorde began passenger service in January 1976. Twenty were built, and all were retired in 2003 [[nasm-concorde]]. The museum gives its height as 55,000 to 60,000 feet; 17 to 18 km is our conversion {{estimate}}.',
          ],
        },
        es: {
          title: 'Más rápido que el sonido',
          lead: 'En 1947 un pequeño avión cohete naranja voló más rápido que el sonido.',
          body: [
            'El 14 de octubre de 1947 Chuck Yeager voló el Bell X-1 a Mach 1,06, unos 1127 km/h, a unos 13 000 m de altura. Un bombardero B-29 lo subió hasta unos 7000 m y lo soltó; entonces se encendió su motor cohete. Su forma copiaba la de una bala de ametralladora [[nasm-x1]].',
            'Después llegaron los aviones de pasajeros. El soviético Tu-144 voló primero, el 31 de diciembre de 1968, unos dos meses antes de que el anglofrancés Concorde volara por primera vez, el 2 de marzo de 1969 [[nasa-tu144]] [[nasm-concorde]].',
            'El Concorde volaba a unas dos veces la velocidad del sonido, entre 17 y 18 km de altura, tan alto que los pasajeros veían la curva de la Tierra. Cruzaba el Atlántico en menos de cuatro horas [[nasm-concorde]].',
          ],
          tryIt: {
            steps: [
              'Ponte en un extremo de un campo de juego. Pide a un amigo, en el otro extremo, que dé una palmada con las manos en alto.',
              'Mira sus manos y escucha.',
              'Cambia de sitio con tu amigo y prueba otra vez.',
            ],
            lookFor: 'Ves la palmada un instante antes de oírla. El sonido tarda en viajar. El X-1 voló más rápido que eso.',
          },
          grownUps: [
            'El Tu-144 empezó a llevar pasajeros el 1 de noviembre de 1977, de Moscú a Almá-Atá, y paró en 1978. La NASA cuenta 102 vuelos con pasajeros; la Gaceta Parlamentaria rusa cuenta 102 vuelos de Aeroflot, de los que 55 llevaron pasajeros [[nasa-tu144]] [[pnp-tu144]]. En los años noventa la NASA y Túpolev convirtieron el último Tu-144 en un laboratorio volante [[nasa-tu144]].',
            'El Concorde empezó a llevar pasajeros en enero de 1976. Se construyeron veinte, y todos se retiraron en 2003 [[nasm-concorde]]. El museo da su altura en 55 000 a 60 000 pies; los 17 a 18 km son conversión nuestra {{estimate}}.',
          ],
        },
        ru: {
          title: 'Быстрее звука',
          lead: 'В 1947 году маленький оранжевый ракетоплан полетел быстрее звука.',
          body: [
            '14 октября 1947 года Чак Йегер пролетел на Bell X-1 со скоростью 1,06 Маха, около 1127 км/ч, на высоте около 13 000 м. Бомбардировщик B-29 поднял его примерно на 7000 м и сбросил, после чего включился ракетный двигатель. Форма X-1 повторяла пулю пулемёта [[nasm-x1]].',
            'Затем пришла очередь пассажирских самолётов. Советский Ту-144 взлетел первым, 31 декабря 1968 года, примерно за два месяца до первого полёта англо-французского «Конкорда» 2 марта 1969 года [[nasa-tu144]] [[nasm-concorde]].',
            '«Конкорд» летал примерно на двух скоростях звука, на высоте 17–18 км, откуда пассажиры видели изгиб Земли. Он пересекал Атлантику меньше чем за четыре часа [[nasm-concorde]].',
          ],
          tryIt: {
            steps: [
              'Встаньте в одном конце спортивного поля. Попросите друга в другом конце хлопнуть в ладоши над головой.',
              'Смотрите на его руки и слушайте.',
              'Поменяйтесь местами и повторите.',
            ],
            lookFor: 'Хлопок виден на миг раньше, чем слышен. Звуку нужно время, чтобы долететь. X-1 летел быстрее.',
          },
          grownUps: [
            'Ту-144 начал возить пассажиров 1 ноября 1977 года, из Москвы в Алма-Ату, и прекратил в 1978 году. NASA насчитывает 102 пассажирских рейса; «Парламентская газета» — 102 рейса «Аэрофлота», из них 55 с пассажирами [[nasa-tu144]] [[pnp-tu144]]. В 1990-х NASA и «Туполев» превратили последний Ту-144 в летающую лабораторию [[nasa-tu144]].',
            '«Конкорд» начал пассажирские рейсы в январе 1976 года. Построили двадцать, и все списаны в 2003 году [[nasm-concorde]]. Музей даёт высоту 55 000–60 000 футов; 17–18 км — наш пересчёт {{estimate}}.',
          ],
        },
      },
    },
    {
      id: 'paper-planes',
      kind: 'explainer',
      figure: null,
      photo: 'paper-plane-forest',
      text: {
        en: {
          title: 'The paper plane joins in',
          lead: 'Paper came from China, folding became an art in Japan, and children folded darts long before anyone wrote about them.',
          body: [
            'Court records credit Cai Lun with presenting papermaking to the Chinese emperor in 105 CE, though older scraps suggest paper began about 200 years earlier [[gatech-paper]]. In Japan folding became an art: a book printed in Kyoto in 1797 shows how to fold linked paper cranes [[met-senbazuru]].',
            'Paper planes are harder to trace. A history project lists one in the children’s magazine St Nicholas in 1886, and paper darts in an 1894 book on flying machines by Octave Chanute [[ppf-history]].',
            'In February 1967 Scientific American ran a contest with 10,941 entries from 49 US states and 26 other countries. Frederick Hooven’s tissue-paper flying wing stayed up 10.2 seconds; Robert Meuser’s plane flew 89 feet, about 27 m [[time-1967]] [[crimson-1967]].',
          ],
          tryIt: {
            steps: [
              'Fold a dart. Throw it three times and measure each throw in steps.',
              'Write the best throw on a card with the date.',
              'Beat it next week. Write the new one underneath.',
            ],
            lookFor: 'Your own record log is a small history of flight.',
          },
          grownUps: [
            'The 1967 contest had four classes: time aloft, distance, aerobatics and origami [[crimson-1967]]. Its finals were held on 21 February 1967 [[ppf-1967]]. We have not checked the 1886 and 1894 originals.',
            'Stories say that Jack Northrop and the Wright brothers tested designs with paper models. We found only secondhand retellings and no primary source, so we leave the claim out [[mentalfloss-paper]].',
          ],
        },
        es: {
          title: 'Llega el avión de papel',
          lead: 'El papel vino de China, el plegado se hizo arte en Japón y los niños plegaban dardos mucho antes de que nadie escribiera sobre ellos.',
          body: [
            'Las crónicas de la corte atribuyen a Cai Lun haber presentado al emperador chino la fabricación de papel en el año 105, aunque restos más antiguos indican que el papel empezó unos 200 años antes [[gatech-paper]]. En Japón el plegado se convirtió en arte: un libro impreso en Kioto en 1797 enseña a plegar grullas de papel unidas [[met-senbazuru]].',
            'Los aviones de papel son más difíciles de rastrear. Un proyecto de historia recoge uno en la revista infantil St Nicholas en 1886 y dardos de papel en un libro de 1894 sobre máquinas voladoras de Octave Chanute [[ppf-history]].',
            'En febrero de 1967 Scientific American organizó un concurso con 10 941 participaciones de 49 estados de EE. UU. y 26 países más. El ala volante de papel de seda de Frederick Hooven se mantuvo 10,2 segundos; el avión de Robert Meuser voló 89 pies, unos 27 m [[time-1967]] [[crimson-1967]].',
          ],
          tryIt: {
            steps: [
              'Pliega un dardo. Lánzalo tres veces y mide cada lanzamiento en pasos.',
              'Escribe el mejor lanzamiento en una ficha con la fecha.',
              'Supéralo la semana que viene. Escribe el nuevo debajo.',
            ],
            lookFor: 'Tu propio registro de récords es una pequeña historia del vuelo.',
          },
          grownUps: [
            'El concurso de 1967 tuvo cuatro clases: tiempo en el aire, distancia, acrobacias y papiroflexia [[crimson-1967]]. La final se celebró el 21 de febrero de 1967 [[ppf-1967]]. No hemos comprobado los originales de 1886 y 1894.',
            'Se cuenta que Jack Northrop y los hermanos Wright probaron diseños con modelos de papel. Solo encontramos relatos de segunda mano y ninguna fuente primaria, así que omitimos la afirmación [[mentalfloss-paper]].',
          ],
        },
        ru: {
          title: 'Бумажный самолёт',
          lead: 'Бумага пришла из Китая, складывание стало искусством в Японии, а дети складывали дротики задолго до того, как о них написали.',
          body: [
            'Придворные хроники приписывают Цай Луню то, что в 105 году он представил китайскому императору способ делать бумагу, хотя более древние обрывки говорят, что бумага появилась лет на 200 раньше [[gatech-paper]]. В Японии складывание стало искусством: книга, напечатанная в Киото в 1797 году, учит складывать сцепленных бумажных журавликов [[met-senbazuru]].',
            'Следы бумажных самолётов найти труднее. Проект по истории складывания называет бумажный аэроплан в детском журнале St Nicholas в 1886 году и бумажные дротики в книге Октава Шанюта о летательных машинах 1894 года [[ppf-history]].',
            'В феврале 1967 года журнал Scientific American провёл конкурс: 10 941 работа из 49 штатов США и ещё 26 стран. Летающее крыло из папиросной бумаги Фредерика Хувена продержалось 10,2 секунды; самолёт Роберта Мейзера пролетел 89 футов, около 27 м [[time-1967]] [[crimson-1967]].',
          ],
          tryIt: {
            steps: [
              'Сложите дротик. Бросьте его три раза и измерьте каждый бросок шагами.',
              'Запишите лучший бросок на карточке с датой.',
              'Побейте его на следующей неделе. Запишите новый ниже.',
            ],
            lookFor: 'Ваш собственный журнал рекордов — маленькая история полёта.',
          },
          grownUps: [
            'В конкурсе 1967 года было четыре класса: время в воздухе, дальность, пилотаж и оригами [[crimson-1967]]. Финал прошёл 21 февраля 1967 года [[ppf-1967]]. Оригиналы 1886 и 1894 годов мы не проверяли.',
            'Рассказывают, что Джек Нортроп и братья Райт проверяли конструкции на бумажных моделях. Мы нашли только пересказы из вторых рук и ни одного первоисточника, поэтому это утверждение мы опускаем [[mentalfloss-paper]].',
          ],
        },
      },
    },
  ],
  references: [
    { id: 'guinness-kites', label: 'Guinness World Records, “First kites” (about 200 BCE)', url: 'https://www.guinnessworldrecords.com/world-records/760239-first-kites', reuse: 'cite', checked: '2026-11-25' },
    { id: 'loc-kites', label: 'Library of Congress, American Folklife Center blog, “Kites rise on the wind” (2017)', url: 'https://blogs.loc.gov/folklife/2017/03/kites-rise-on-the-wind/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'aramco-firnas', label: 'AramcoWorld, “Flights of fancy on manmade wings” (November/December 2008): Ibn Firnas about 875, two versions both from al-Maqqari, replicas conjectural', url: 'https://archive.aramcoworld.com/issue/200806/flights.of.fancy.on.manmade.wings.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-leonardo', label: 'Smithsonian National Air and Space Museum, “Leonardo da Vinci and flight” (2013)', url: 'https://airandspace.si.edu/stories/editorial/leonardo-da-vinci-and-flight', reuse: 'cite', checked: '2026-11-25' },
    { id: 'versailles-balloon', label: 'Palace of Versailles, “First hot-air balloon flight” (19 September 1783: sheep, duck and cockerel; about eight minutes, 3.5 km, about 600 m)', url: 'https://en.chateauversailles.fr/discover/history/key-dates/first-hot-air-balloon-flight', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-animals', label: 'Guinness World Records, “First living creatures to take flight in a man-made craft” (about 520 m, about 3.2 km)', url: 'https://www.guinnessworldrecords.com/world-records/first-living-creatures-to-take-flight-in-a-man-made-craft', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-balloon', label: 'Guinness World Records, “First untethered crewed balloon flight” (21 November 1783)', url: 'https://www.guinnessworldrecords.com/world-records/385167-first-free-manned-balloon-flight', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-balloon', label: 'Smithsonian National Air and Space Museum, “Sending humans aloft” (2017)', url: 'https://airandspace.si.edu/stories/editorial/sending-humans-aloft', reuse: 'cite', checked: '2026-11-25' },
    { id: 'history-balloon', label: 'HISTORY, “Men fly over Paris” (21 November 1783)', url: 'https://www.history.com/this-day-in-history/november-21/men-fly-over-paris', reuse: 'cite', checked: '2026-11-25' },
    { id: 'lindahall-darlandes', label: 'Linda Hall Library, “François Laurent d’Arlandes”', url: 'https://www.lindahall.org/francois-laurent-darlandes/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'britannica-cayley', label: 'Encyclopaedia Britannica, “Sir George Cayley”', url: 'https://www.britannica.com/biography/Sir-George-Cayley', reuse: 'cite', checked: '2026-11-25' },
    { id: 'britannica-cayley-disc', label: 'Encyclopaedia Britannica, “Silver Disc machine”', url: 'https://www.britannica.com/topic/Silver-Disc-machine', reuse: 'cite', checked: '2026-11-25' },
    { id: 'encyclopedia-cayley', label: 'Encyclopedia.com, “Sir George Cayley” (the 1849 glider and the boy)', url: 'https://www.encyclopedia.com/science/encyclopedias-almanacs-transcripts-and-maps/sir-george-cayley', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wiki-cayley', label: 'Wikipedia, “George Cayley” (about 900 feet; identity of the 1853 pilot), used as a last resort', url: 'https://en.wikipedia.org/wiki/George_Cayley', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-lilienthal', label: 'Smithsonian National Air and Space Museum, Lilienthal Glider (object record)', url: 'https://si.edu/object/lilienthal-glider:nasm_A19060001000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'britannica-lilienthal', label: 'Encyclopaedia Britannica, “Otto Lilienthal”', url: 'https://www.britannica.com/print/article/340975', reuse: 'cite', checked: '2026-11-25' },
    { id: 'aerospaceweb-mozhaysky', label: 'Aerospaceweb.org, “Mozhaisky airplane” (1884, Krasnoye Selo, ramp launch; early reports of a crash, later claims of a hop, claims grew after 1949). A secondary source', url: 'https://aerospaceweb.org/question/history/q0172.shtml', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wiki-mozhaysky', label: 'Wikipedia, “Mozhaysky’s airplane” (1909 and 1916 claims; conflicting accounts of TsAGI studies), used as a last resort', url: 'https://en.wikipedia.org/wiki/Mozhaysky%27s_airplane', reuse: 'cite', checked: '2026-11-25' },
    { id: 'mactutor-zhukovsky', label: 'MacTutor History of Mathematics, University of St Andrews, “Nikolai Egorovich Zhukovsky” (1895 visit to Lilienthal; 1906 lift papers; Kutta’s 1902 dissertation; 1918 institute)', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Zhukovsky/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'tsagi', label: 'TsAGI, “About the institute” (founded 1 December 1918 under N. E. Zhukovsky, “the father of Russian Aviation”)', url: 'https://www.tsagi.ru/en/institute/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-wright', label: 'Smithsonian National Air and Space Museum, 1903 Wright Flyer (object record: 255.6 m, 852 ft, 59 seconds)', url: 'https://si.edu/object/1903-wright-flyer:nasm_A19610048000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-wright-story', label: 'Smithsonian National Air and Space Museum, “Wright brothers made history at Kitty Hawk” (10:35 a.m.; 120 feet in 12 seconds; 852 feet in 59 seconds)', url: 'https://airandspace.si.edu/stories/editorial/wright-brothers-made-history-kitty-hawk', reuse: 'cite', checked: '2026-11-25' },
    { id: 'si-wright-diary', label: 'Smithsonian Education, “The first flight” lesson, quoting Orville Wright’s diary for 17 December 1903', url: 'https://www.smithsonianeducation.org/educators/lesson_plans/wright/first_flight.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'britannica-flyer', label: 'Encyclopaedia Britannica, “Wright flyer of 1903” (four flights of 120, 175, 200 and 852 feet)', url: 'https://www.britannica.com/print/article/649596', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-telegraph', label: 'Smithsonian National Air and Space Museum, Telegraph key, Wright 1903 flight (two transmission errors: 57 for 59 seconds, Orville misspelled)', url: 'https://airandspace.si.edu/collection-objects/telegraph-key-wright-1903-flight/nasm_A19710854000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'fai-santos-dumont', label: 'FAI, “12 November 1906: the first flight by Santos-Dumont” (220 m in 21.5 seconds at 6 m; first officially observed flight in Europe longer than 25 m)', url: 'https://www.fai.org/node/486', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wrightorg-santos', label: 'Wright-brothers.org, “The prize patrol” (quotes the time as 21 1/5 seconds). A secondary source', url: 'https://wright-brothers.org/History_Wing/Wright_Story/Showing_the_World/Prize_Patrol/Prize_Patrol.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'si-santos', label: 'Smithsonian Education, “Alberto Santos-Dumont” (23 October 1906: 50 m in the text, 60 m in the sidebar; 12 November 1906: 220 m at 6 m)', url: 'https://smithsonianeducation.org/scitech/impacto/graphic/aviation/alberto.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wrightorg-santos-first', label: 'Wright-brothers.org, “Santos Dumont” (Who was first?): 197 feet on 27 October 1906; 12 November 1906, 220 m in 21 1/2 seconds, the Aéro-Club’s prize for the first flight in Europe over 100 m. A secondary source', url: 'https://wright-brothers.org/History_Wing/History_of_the_Airplane/Who_Was_First/Santos_Dumont/Santos_Dumont.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'sikorsky-grand', label: 'Igor I. Sikorsky Historical Archives, “Igor Sikorsky’s bold pursuit to build the world’s first multi-engine airplane” (the Grand, 1913; Ilya Muromets, 1914; Kiev flight)', url: 'https://sikorskyarchives.com/igor-sikorskys-bold-pursuit-to-build-the-first-multi-engine-airplane/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'calend-vityaz', label: 'Calend.ru, “Совершил первый полёт первый в мире многомоторный самолёт «Русский витязь»” (26 May 1913, new style)', url: 'https://www.calend.ru/events/5223/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'museo-aire-cierva', label: 'Museo de Aeronáutica y Astronáutica (Ejército del Aire y del Espacio), “Una mirada a Juan de la Cierva, inventor del autogiro”, pieza destacada, first quarter 2021', url: 'https://ejercitodelaireydelespacio.defensa.gob.es/EA/museodelaire/actividades/pieza/1T2021.pdf', reuse: 'cite', checked: '2026-11-25' },
    { id: 'museo-aire-c19', label: 'Museo de Aeronáutica y Astronáutica (Ejército del Aire), “Autogiro La Cierva C-19 Mk IV”, pieza destacada, second quarter 2018: Cierva’s report to the Real Academia de Ciencias, 15 February 1923 (first take-off 10 January 1923, pilot Gómez Spencer; official tests at Getafe 22 January; on 31 January a closed circuit of more than 4 km in three and a half minutes at 25 m)', url: 'https://ejercitodelaireydelespacio.defensa.gob.es/EA/museodelaire/actividades/pieza/2T2018.pdf', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-autogyro', label: 'Guinness World Records, “First autogyro” (Cierva C.4, Getafe, 9 January 1923)', url: 'https://www.guinnessworldrecords.com/world-records/first-autogyro', reuse: 'cite', checked: '2026-11-25' },
    { id: 'fai-laroche', label: 'FAI, “Celebrating the International Women’s Day: on 8 March 1910, Raymonde de Laroche becomes the first woman to earn a pilot licence” (8 March 2020)', url: 'https://www.fai.org/node/186272', reuse: 'cite', checked: '2026-11-25' },
    { id: 'rbth-zvereva', label: 'Russia Beyond, Boris Egorov, “The tragic fate of Russia’s first female aviator” (14 May 2021): certificate No 31, 23 August 1911, the first earned by a woman in the Russian Empire', url: 'https://www.rbth.com/history/333781-russias-first-female-aviator', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-coleman', label: 'Smithsonian National Air and Space Museum, “Bessie Coleman’s daring life as the first licensed Black woman pilot” (15 June 2021)', url: 'https://airandspace.si.edu/stories/editorial/celebrating-centennial-bessie-coleman', reuse: 'cite', checked: '2026-11-25' },
    { id: 'fai-coleman', label: 'FAI, “100 years since FAI granted Bessie Coleman’s pilot licence” (15 June 2021): Caudron school, about seven months; first person of colour with an FAI licence', url: 'https://www.fai.org/node/189620', reuse: 'cite', checked: '2026-11-25' },
    { id: 'orellana-2015', label: 'Almudena Orellana Palomares, “María Bernaldo de Quirós: primera aviadora española”, Asparkía 27 (2015) 147–161: licence of 15 September 1928, Real Aeroclub de España school at Getafe, from the Archivo Histórico del Ejército del Aire', url: 'https://dialnet.unirioja.es/descarga/articulo/5466567.pdf', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-quimby', label: 'Smithsonian National Air and Space Museum, “On this day: first U.S. female to earn pilot’s license” (1 August 2016)', url: 'https://airandspace.si.edu/stories/editorial/day-first-female-earn-pilots-license', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-earhart', label: 'Smithsonian National Air and Space Museum, Lockheed Vega 5B, Amelia Earhart (object record: 20–21 May 1932, Harbor Grace to Culmore, about 15 hours, 2,026 miles)', url: 'https://airandspace.si.edu/collection-objects/lockheed-vega-5b-amelia-earhart/nasm_A19670093000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-x1', label: 'Smithsonian National Air and Space Museum, Bell X-1 “Glamorous Glennis” (object record: Mach 1.06, about 43,000 ft, B-29 drop at about 23,000 ft)', url: 'https://airandspace.si.edu/collection-objects/bell-x-1-glamorous-glennis/nasm_A19510007000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-tu144', label: 'NASA Dryden Flight Research Center, Fact Sheet FS-2002-09-062, “The Tu-144LL: a supersonic flying laboratory” (first flight 31 December 1968; service 1977 to 1978, 102 passenger flights)', url: 'https://www.nasa.gov/centers/dryden/pdf/120315main_FS-062-DFRC.pdf', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'pnp-tu144', label: 'Parlamentskaya Gazeta, M. Sokolova, “Ту-144 совершил всего 102 рейса” (31 December 2019): 102 Aeroflot flights, 55 of them with passengers', url: 'https://www.pnp.ru/social/tu-144-sovershil-vsego-102-reysa.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasm-concorde', label: 'Smithsonian National Air and Space Museum, Concorde, Fox Alpha, Air France (object record)', url: 'https://airandspace.si.edu/collection-objects/concorde-fox-alpha-air-france/nasm_A20030139000', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gatech-paper', label: 'Robert C. Williams Museum of Papermaking, Georgia Tech, “The birth of papermaking” (105 CE; older fragments from Dunhuang)', url: 'https://paper.gatech.edu/index.php/early-papermaking', reuse: 'cite', checked: '2026-11-25' },
    { id: 'met-senbazuru', label: 'The Metropolitan Museum of Art, “A Thousand Cranes and How to Fold Them (Senbazuru orikata)”, Kyoto, 1797', url: 'https://www.metmuseum.org/art/collection/search/78714', reuse: 'cite', checked: '2026-11-25' },
    { id: 'ppf-history', label: 'The Public Paperfolding History Project, “History of paper planes” (St Nicholas, 1886; Chanute, 1894). A history project, not a primary source', url: 'https://origamiheaven.com/historyofpaperplanes.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'mentalfloss-paper', label: 'Mental Floss, “Which came first: airplanes or paper airplanes?” (secondhand claims about Northrop and the Wrights)', url: 'https://www.mentalfloss.com/article/55397/which-came-first-airplanes-or-paper-airplanes', reuse: 'cite', checked: '2026-11-25' },
    { id: 'time-1967', label: 'TIME, “Modern Living: Big Boys at Play” (3 March 1967)', url: 'https://time.com/archive/6890149/modern-living-big-boys-at-play/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'crimson-1967', label: 'The Harvard Crimson, “Paper airplane pilots practicing graceful flights” (1967): the four judging classes', url: 'https://thecrimson.com/article/1967/2/1/paper-airplane-pilots-practicing-graceful-flights', reuse: 'cite', checked: '2026-11-25' },
    { id: 'ppf-1967', label: 'The Public Paperfolding History Project, “The first International Paper Airplane Competition, 1967” (finals 21 February 1967)', url: 'https://origamiheaven.com/historyofthefirstinternationalpaperairplanecompetition1967.htm', reuse: 'cite', checked: '2026-11-25' },
  ],
}

export default chapter
