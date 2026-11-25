// Chapter 3 · Nature's flyers. One source for the chapter page and the book.
// Same contract as how-it-flies.js: `text[lang]` in en, es and ru with the same keys;
// `[[id]]` is a numbered note to `references`; `{{state}}` is an evidence chip.
// Extra fields used here:
// - `meta` is the fallback title, standfirst and number, used until catalog.js lists the chapter.
// - `photo` on the opener or a section is a photo slot id; the lead supplies the file.
// All dates are "about" and come from the sources listed. Where sources disagree, the text says so.
// Research notes with quotes and confidence: evidence/2026-11-25-book-orientation/research-r3/life.md.
const w = (en, es, ru) => ({ en, es, ru })

const chapter = {
  id: 'nature',
  asOf: '2026-11-25',
  review: { en: 'editorial-draft', es: 'needs-native-review', ru: 'needs-native-review' },
  meta: {
    n: 3,
    route: 'nature',
    title: w('Nature’s flyers', 'Los voladores de la naturaleza', 'Летуны природы'),
    standfirst: w(
      'Seeds, insects, reptiles, birds and bats: how flight began, and what paper borrows from it.',
      'Semillas, insectos, reptiles, aves y murciélagos: cómo empezó el vuelo y qué toma prestado el papel.',
      'Семена, насекомые, рептилии, птицы и летучие мыши: как начался полёт и что у него заимствует бумага.',
    ),
  },
  opener: {
    figure: 'nature-timeline',
    photo: 'maple-samara',
    text: {
      en: {
        intro: 'Flight is far older than people. Here are its pioneers, in order of arrival.',
        grownUps: 'Every date here is approximate and comes from a museum or a journal. Fossils are rare, so the first fossil is never the first animal. Where sources disagree we say so and give the range.',
        caption: 'When each group first appears as a fossil, on a linear scale. Dates are approximate. Winged seeds, from about 360 to 385 million years ago, are older than all of them.',
      },
      es: {
        intro: 'Los pioneros del vuelo, por orden de llegada.',
        grownUps: 'Todas las fechas son aproximadas y proceden de un museo o de una revista científica. Los fósiles son raros, así que el primer fósil nunca es el primer animal. Cuando las fuentes discrepan, lo decimos y damos el intervalo.',
        caption: 'Cuándo aparece cada grupo como fósil, en escala lineal. Las fechas son aproximadas. Las semillas con alas, de hace unos 360 a 385 millones de años, son más antiguas que todos ellos.',
      },
      ru: {
        intro: 'Полёт намного старше человека. Вот его первопроходцы — по порядку появления.',
        grownUps: 'Все даты здесь приблизительные и взяты из музеев и научных журналов. Окаменелости редки, поэтому первая находка — никогда не первое животное. Если источники расходятся, мы говорим об этом и называем диапазон.',
        caption: 'Когда каждая группа впервые появляется в виде окаменелости, в линейном масштабе. Даты приблизительные. Крылатые семена, появившиеся примерно 360–385 миллионов лет назад, старше их всех.',
      },
    },
  },
  sections: [
    {
      id: 'seeds',
      kind: 'explainer',
      figure: null,
      photo: 'dandelion-macro',
      text: {
        en: {
          title: 'Seeds that fly',
          lead: 'A plant cannot walk away from home. So its seeds fly.',
          body: [
            'Winged seeds are among the oldest flyers on Earth. Fossil seeds with three or four wings come from rocks of the Late Devonian, roughly 360 to 385 million years old [[wang-2024]] [[rowe-1997]]. Seeds found three tricks, and all three still work today.',
            'Spin. Drop a maple seed and it turns like a tiny helicopter blade. A small whirlwind sits on the front edge of the spinning wing and roughly doubles its lift. The seed falls slowly, and the wind carries it away from the tree [[lentink-2009]] [[caltech-maple]].',
            'Parachute. A dandelion seed hangs under a tuft of about 100 fine bristles. The tuft is more than nine-tenths empty space, yet it holds on to the air better than a solid disc. Air leaking through the gaps makes a ring of swirling air that floats just above the tuft, never touching it [[cummins-2018]].',
            'Glide. Alsomitra macrocarpa, the Javan cucumber, grows a seed with a paper-thin wing about 13 cm across [[guinness-seed]]. It does not spin. It glides, like a small aircraft with no tail. People copied it: see “Copied from nature” later in this chapter.',
          ],
          tryIt: {
            steps: [
              'Find a maple, sycamore or ash seed, or fold the paper maple seed, plate F2.',
              'Hold it high, with the wing up. Let go.',
              'Drop a flat paper strip of the same size from the same height.',
            ],
            lookFor: 'Which one falls slower? Which one spins?',
          },
          grownUps: [
            'The 2009 study in Science put real maple seeds and models in a flow. The swirl on the front edge is a leading-edge vortex, the same trick insects, bats and hummingbirds use [[lentink-2009]] [[caltech-maple]].',
            'For the dandelion, the tuft gives more than four times the drag of a solid disc of the same area. Scientists call the floating swirl a separated vortex ring [[cummins-2018]].',
            'The oldest winged seed is usually given as Warsteinia, from Germany, with four wings. Alasemenia, from China, is the second oldest and the earliest with three [[rowe-1997]] [[wang-2024]]. Their ages are known only to within a few million years.',
          ],
        },
        es: {
          title: 'Semillas que vuelan',
          lead: 'Una planta no puede irse de casa andando. Por eso sus semillas vuelan.',
          body: [
            'Las semillas con alas están entre los voladores más antiguos de la Tierra. Hay semillas fósiles con tres o cuatro alas en rocas del Devónico tardío, de unos 360 a 385 millones de años [[wang-2024]] [[rowe-1997]]. Las semillas encontraron tres trucos, y los tres siguen funcionando hoy.',
            'Girar. Suelta una semilla de arce y gira como la pala de un pequeño helicóptero. Un pequeño remolino se coloca en el borde delantero del ala que gira y casi duplica su sustentación. La semilla cae despacio y el viento la aleja del árbol [[lentink-2009]] [[caltech-maple]].',
            'Paracaídas. Una semilla de diente de león cuelga bajo un penacho de unos 100 pelos finos. El penacho es hueco en más de nueve décimas partes y aun así se agarra al aire mejor que un disco macizo. El aire que se cuela por los huecos forma un anillo de aire en remolino que flota justo encima del penacho, sin tocarlo [[cummins-2018]].',
            'Planear. Alsomitra macrocarpa, el pepino de Java, produce una semilla con un ala fina como el papel de unos 13 cm de ancho [[guinness-seed]]. No gira. Planea, como un pequeño avión sin cola. Las personas la copiaron: mira «Copiado de la naturaleza», más adelante en este capítulo.',
          ],
          tryIt: {
            steps: [
              'Busca una semilla de arce, plátano de sombra o fresno, o pliega la semilla de arce de papel, lámina F2.',
              'Sujétala en alto, con el ala hacia arriba. Suéltala.',
              'Suelta desde la misma altura una tira de papel plana del mismo tamaño.',
            ],
            lookFor: '¿Cuál cae más despacio? ¿Cuál gira?',
          },
          grownUps: [
            'El estudio de 2009 en Science puso semillas de arce reales y modelos en una corriente. El remolino del borde delantero es un vórtice del borde de ataque, el mismo truco que usan insectos, murciélagos y colibríes [[lentink-2009]] [[caltech-maple]].',
            'En el diente de león, el penacho da más de cuatro veces la resistencia de un disco macizo de la misma superficie. Los científicos llaman al remolino flotante anillo de vórtice separado [[cummins-2018]].',
            'La semilla con alas más antigua suele ser Warsteinia, de Alemania, con cuatro alas. Alasemenia, de China, es la segunda más antigua y la primera con tres [[rowe-1997]] [[wang-2024]]. Sus edades se conocen con un margen de pocos millones de años.',
          ],
        },
        ru: {
          title: 'Семена, которые летают',
          lead: 'Растение не может уйти из дома пешком. Поэтому его семена летают.',
          body: [
            'Крылатые семена — одни из самых древних летунов на Земле. Окаменелые семена с тремя и четырьмя крыльями найдены в породах позднего девона, им примерно 360–385 миллионов лет [[wang-2024]] [[rowe-1997]]. Семена придумали три приёма, и все три работают до сих пор.',
            'Вращение. Отпустите крылатку клёна, и она завертится, как лопасть маленького вертолёта. На передней кромке вращающегося крыла сидит маленький вихрь и почти вдвое увеличивает подъёмную силу. Семя падает медленно, и ветер уносит его от дерева [[lentink-2009]] [[caltech-maple]].',
            'Парашют. Семя одуванчика висит под хохолком примерно из 100 тонких волосков. Хохолок больше чем на девять десятых состоит из пустоты, но держится за воздух лучше сплошного диска. Воздух, проходя сквозь просветы, образует кольцо вихря, которое парит прямо над хохолком, не касаясь его [[cummins-2018]].',
            'Планирование. Alsomitra macrocarpa, яванский огурец, даёт семя с тонким, как бумага, крылом около 13 см шириной [[guinness-seed]]. Оно не вращается. Оно планирует, как маленький самолёт без хвоста. Люди его скопировали: см. раздел «Скопировано у природы» дальше в этой главе.',
          ],
          tryIt: {
            steps: [
              'Найдите семя клёна, платана или ясеня или сложите бумажную крылатку клёна, таблица F2.',
              'Держите её высоко, крылом вверх. Отпустите.',
              'С той же высоты уроните плоскую бумажную полоску такого же размера.',
            ],
            lookFor: 'Что падает медленнее? Что вращается?',
          },
          grownUps: [
            'В исследовании 2009 года в журнале Science настоящие семена клёна и модели поместили в поток. Вихрь на передней кромке — это вихрь передней кромки, тот же приём, что у насекомых, летучих мышей и колибри [[lentink-2009]] [[caltech-maple]].',
            'У одуванчика хохолок даёт сопротивление более чем в четыре раза выше, чем сплошной диск той же площади. Учёные называют парящий вихрь отделённым вихревым кольцом [[cummins-2018]].',
            'Древнейшим крылатым семенем обычно считают Warsteinia из Германии, с четырьмя крыльями. Alasemenia из Китая — второе по древности и самое раннее с тремя [[rowe-1997]] [[wang-2024]]. Их возраст известен с точностью до нескольких миллионов лет.',
          ],
        },
      },
    },
    {
      id: 'insects',
      kind: 'explainer',
      figure: 'nature-timeline',
      photo: null,
      text: {
        en: {
          caption: 'The first flyers on one scale, in millions of years. Dates are approximate and sources differ.',
          title: 'The first flying animals',
          lead: 'Long before birds, the sky belonged to insects.',
          body: [
            'Picture a sky with no birds, no bats and no flying reptiles. For about 100 million years {{estimate}}, the only animal wings were insect wings.',
            'The oldest widely accepted fossil of a winged insect is about 325 million years old. It is a mayfly-like insect called Delitzschala bitterfeldensis [[stanford-insects]]. A study of insect genes suggests the first wings came even earlier, about 406 million years ago [[misof-2014]].',
            'Older fossils are hard to read. A jaw about 400 million years old was once taken as a sign of a winged insect; a 2017 study says it may belong to a centipede-like animal instead [[engel-2004]] [[haug-2017]]. A Devonian fossil described as an insect in 2012 was challenged the next year [[ku-2012]] [[hornschemeyer-2013]].',
            'So where did wings come from? Birds and bats turned an arm into a wing. Insects grew something new, and scientists have argued about it for a century [[clark-hachtel-2016]]. One idea: wings grew from flat edges of the back. Another: from flaps on the legs, a little like the gills of water insects.',
            'Recent experiments with beetles and with a tiny shrimp-like crustacean point to both at once. The wing may have formed where a piece of the back met a piece of an ancient leg [[linz-2018]] [[clark-hachtel-2020]] [[bruce-2020]]. It is the leading idea today, not the final word.',
          ],
          tryIt: {
            steps: [
              'Find a fly, a moth or a bee at a window. Do not touch it.',
              'Count its wings.',
              'Draw it from above. Show where the wings join the body.',
            ],
            lookFor: 'Are the wings the same size? Do they overlap?',
          },
          grownUps: [
            'Rocks and genes give different dates: about 325 million years from fossils, about 406 from genes [[stanford-insects]] [[misof-2014]]. A gene date is a model with its own error range, and the gap between the two is still studied.',
            'The stretch of the fossil record with almost no insects, before the first wings, is called the Hexapod Gap. A 2018 Stanford study argued that part of it may be an effect of preservation [[stanford-insects]].',
          ],
        },
        es: {
          caption: 'Los primeros voladores en una sola escala, en millones de años. Las fechas son aproximadas y las fuentes difieren.',
          title: 'Los primeros animales voladores',
          lead: 'Mucho antes que las aves, el cielo era de los insectos.',
          body: [
            'Imagina un cielo sin aves, sin murciélagos y sin reptiles voladores. Durante unos 100 millones de años {{estimate}}, las únicas alas animales fueron alas de insecto.',
            'El fósil de insecto alado más antiguo y más aceptado tiene unos 325 millones de años. Es un insecto parecido a una efímera llamado Delitzschala bitterfeldensis [[stanford-insects]]. Un estudio de los genes de los insectos sugiere que las primeras alas llegaron aún antes, hace unos 406 millones de años [[misof-2014]].',
            'Los fósiles más antiguos son difíciles de leer. Una mandíbula de unos 400 millones de años se tomó como señal de un insecto alado; un estudio de 2017 dice que quizá sea de un animal parecido a un ciempiés [[engel-2004]] [[haug-2017]]. Un fósil del Devónico descrito como insecto en 2012 fue cuestionado al año siguiente [[ku-2012]] [[hornschemeyer-2013]].',
            '¿De dónde salieron las alas? Las aves y los murciélagos convirtieron un brazo en ala. Los insectos crearon algo nuevo, y los científicos llevan un siglo discutiéndolo [[clark-hachtel-2016]]. Una idea: las alas nacieron de bordes planos de la espalda. Otra: de lengüetas de las patas, algo parecidas a las branquias de los insectos acuáticos.',
            'Experimentos recientes con escarabajos y con un pequeño crustáceo parecido a una gamba apuntan a las dos a la vez. El ala pudo formarse donde una pieza de la espalda se unió a una pieza de una pata antigua [[linz-2018]] [[clark-hachtel-2020]] [[bruce-2020]]. Es la idea principal hoy, no la última palabra.',
          ],
          tryIt: {
            steps: [
              'Busca una mosca, una polilla o una abeja junto a una ventana. No la toques.',
              'Cuenta sus alas.',
              'Dibújala desde arriba. Marca dónde se unen las alas al cuerpo.',
            ],
            lookFor: '¿Las alas tienen el mismo tamaño? ¿Se solapan?',
          },
          grownUps: [
            'Las rocas y los genes dan fechas distintas: unos 325 millones de años según los fósiles, unos 406 según los genes [[stanford-insects]] [[misof-2014]]. Una fecha genética es un modelo con su propio margen de error, y la diferencia entre ambas se sigue estudiando.',
            'El tramo del registro fósil con casi ningún insecto, antes de las primeras alas, se llama la brecha de los hexápodos. Un estudio de Stanford de 2018 sostuvo que parte de ella puede deberse a la conservación [[stanford-insects]].',
          ],
        },
        ru: {
          caption: 'Первые летуны в одном масштабе, в миллионах лет. Даты приблизительны, источники расходятся.',
          title: 'Первые летающие животные',
          lead: 'Задолго до птиц небо принадлежало насекомым.',
          body: [
            'Представьте небо без птиц, летучих мышей и летающих рептилий. Около 100 миллионов лет {{estimate}} единственными крыльями у животных были крылья насекомых.',
            'Самой древней общепризнанной окаменелости крылатого насекомого около 325 миллионов лет. Это похожее на поденку насекомое Delitzschala bitterfeldensis [[stanford-insects]]. Исследование генов насекомых говорит, что первые крылья появились ещё раньше, около 406 миллионов лет назад [[misof-2014]].',
            'Более древние окаменелости трудно прочесть. Челюсть возрастом около 400 миллионов лет когда-то сочли признаком крылатого насекомого; исследование 2017 года считает, что она, возможно, принадлежит животному вроде многоножки [[engel-2004]] [[haug-2017]]. Девонскую находку, описанную как насекомое в 2012 году, оспорили уже на следующий год [[ku-2012]] [[hornschemeyer-2013]].',
            'Откуда же взялись крылья? Птицы и летучие мыши превратили в крыло руку. Насекомые вырастили нечто новое, и учёные спорят об этом уже сто лет [[clark-hachtel-2016]]. Одна идея: крылья выросли из плоских краёв спины. Другая: из выростов на ногах, немного похожих на жабры водных насекомых.',
            'Недавние опыты с жуками и с крошечным рачком указывают на оба варианта сразу. Крыло могло возникнуть там, где часть спины встретилась с частью древней ноги [[linz-2018]] [[clark-hachtel-2020]] [[bruce-2020]]. Сегодня это главная идея, но не последнее слово.',
          ],
          tryIt: {
            steps: [
              'Найдите у окна муху, моль или пчелу. Не трогайте её.',
              'Сосчитайте её крылья.',
              'Нарисуйте её сверху. Покажите, где крылья крепятся к телу.',
            ],
            lookFor: 'Одинаковы ли крылья по размеру? Перекрываются ли они?',
          },
          grownUps: [
            'Камни и гены дают разные даты: около 325 миллионов лет по окаменелостям и около 406 по генам [[stanford-insects]] [[misof-2014]]. Генетическая дата — это модель со своей погрешностью, и разницу между ними продолжают изучать.',
            'Отрезок палеонтологической летописи, где почти нет насекомых, до первых крыльев, называют «провалом шестиногих». Исследование Стэнфорда 2018 года показало, что часть провала может объясняться сохранностью остатков [[stanford-insects]].',
          ],
        },
      },
    },
    {
      id: 'dragonflies',
      kind: 'explainer',
      figure: null,
      photo: 'dragonfly',
      text: {
        en: {
          title: 'Griffinflies: the giants',
          lead: 'Some insects had wings wider than two sheets of paper laid end to end.',
          body: [
            'About 300 million years ago, swampy coal forests were home to griffinflies, relatives of today’s dragonflies. Meganeura, found in France, had wings about 70 cm across [[nhm-griffinflies]] [[conversation-griffinflies]].',
            'The biggest insect known, Meganeuropsis permiana, lived a little later in what is now Kansas. Sources give its wingspan as 71 to 74 cm [[nhm-griffinflies]] [[kgs-insects]].',
            'Why so big? One famous idea is oxygen. Insects breathe through a network of tiny tubes, and the air then may have held up to 35 % oxygen, against 21 % today [[graham-1995]]. Richer air could reach deeper into a big body. For about 150 million years, the largest insects grew and shrank in step with oxygen [[clapham-2012]].',
            'Then the pattern broke. After birds appeared, insects stayed smaller even when oxygen rose again, perhaps because something could now catch them in the air [[clapham-2012]]. Other scientists point out that the giants had no flying hunters, or think oxygen mattered most for young insects living in water [[nhm-griffinflies]] [[verberk-2011]]. Oxygen is probably part of the story, not all of it [[harrison-2010]].',
            'Today’s dragonflies are smaller, but brilliant flyers. A dragonfly can set the angle and speed of each of its four wings, so it can hover, turn and fly in any direction [[nhm-dragonfly-wings]].',
          ],
          tryIt: {
            steps: [
              'Cut a strip of paper 70 cm long, or tape sheets together.',
              'Stretch it across your arms from fingertip to fingertip.',
              'Compare it with your own span.',
            ],
            lookFor: 'Is your span longer or shorter than the giant insect?',
          },
          grownUps: [
            'The name “giant dragonfly” is misleading: griffinflies belong to an extinct order, Meganisoptera, that shares a superorder with dragonflies and damselflies [[nhm-griffinflies]].',
            'Ancient oxygen levels come from models of rocks and charcoal and are uncertain; 35 % is the high end [[graham-1995]]. A careful review found that the oxygen link can be neither proven nor ruled out yet [[harrison-2010]].',
          ],
        },
        es: {
          title: 'Grifínidos: los gigantes',
          lead: 'Algunos insectos tuvieron alas más anchas que dos hojas de papel puestas una tras otra.',
          body: [
            'Hace unos 300 millones de años, los bosques pantanosos del carbón albergaban a los grifínidos, parientes de las libélulas actuales. Meganeura, hallado en Francia, tenía unos 70 cm de envergadura [[nhm-griffinflies]] [[conversation-griffinflies]].',
            'El mayor insecto conocido, Meganeuropsis permiana, vivió algo después en lo que hoy es Kansas. Las fuentes dan una envergadura de 71 a 74 cm [[nhm-griffinflies]] [[kgs-insects]].',
            '¿Por qué tan grandes? Una idea famosa es el oxígeno. Los insectos respiran por una red de tubos diminutos, y el aire de entonces pudo tener hasta un 35 % de oxígeno, frente al 21 % actual [[graham-1995]]. Un aire más rico podía llegar más adentro de un cuerpo grande. Durante unos 150 millones de años, los insectos más grandes crecieron y menguaron al ritmo del oxígeno [[clapham-2012]].',
            'Después el patrón se rompió. Tras la aparición de las aves, los insectos siguieron siendo pequeños aunque el oxígeno volvió a subir, quizá porque ya había quien los cazara en el aire [[clapham-2012]]. Otros científicos señalan que los gigantes no tenían cazadores voladores, o creen que el oxígeno importaba sobre todo a los insectos jóvenes que vivían en el agua [[nhm-griffinflies]] [[verberk-2011]]. El oxígeno es probablemente parte de la historia, no toda [[harrison-2010]].',
            'Las libélulas actuales son más pequeñas, pero vuelan de maravilla. Una libélula puede fijar el ángulo y la velocidad de cada una de sus cuatro alas, así que puede quedarse quieta, girar y volar en cualquier dirección [[nhm-dragonfly-wings]].',
          ],
          tryIt: {
            steps: [
              'Corta una tira de papel de 70 cm, o pega varias hojas con cinta.',
              'Extiéndela sobre tus brazos, de punta de dedo a punta de dedo.',
              'Compárala con tu propia envergadura.',
            ],
            lookFor: '¿Tu envergadura es mayor o menor que la del insecto gigante?',
          },
          grownUps: [
            'El nombre «libélula gigante» induce a error: los grifínidos pertenecen a un orden extinto, Meganisoptera, que comparte superorden con las libélulas y los caballitos del diablo [[nhm-griffinflies]].',
            'Los niveles antiguos de oxígeno salen de modelos de rocas y carbón vegetal y son inciertos; el 35 % es el extremo alto [[graham-1995]]. Una revisión cuidadosa concluyó que el vínculo con el oxígeno no puede probarse ni descartarse todavía [[harrison-2010]].',
          ],
        },
        ru: {
          title: 'Меганевры: великаны',
          lead: 'У некоторых насекомых крылья были шире, чем два листа бумаги, положенные друг за другом.',
          body: [
            'Около 300 миллионов лет назад в болотистых каменноугольных лесах жили меганевры — родственники современных стрекоз. У Meganeura из Франции размах крыльев был около 70 см [[nhm-griffinflies]] [[conversation-griffinflies]].',
            'Самое крупное из известных насекомых, Meganeuropsis permiana, жило немного позже там, где сейчас Канзас. Источники называют размах его крыльев от 71 до 74 см [[nhm-griffinflies]] [[kgs-insects]].',
            'Почему такие большие? Одна известная идея — кислород. Насекомые дышат через сеть крошечных трубочек, а в воздухе тогда, возможно, было до 35 % кислорода против 21 % сегодня [[graham-1995]]. Более богатый воздух мог проникать глубже в большое тело. Около 150 миллионов лет самые крупные насекомые росли и уменьшались вместе с кислородом [[clapham-2012]].',
            'Потом эта связь нарушилась. После появления птиц насекомые оставались мельче, даже когда кислорода снова стало больше, — возможно, потому что их теперь могли ловить в воздухе [[clapham-2012]]. Другие учёные отмечают, что у великанов не было летающих охотников, или считают, что кислород важнее всего был для молодых насекомых, живших в воде [[nhm-griffinflies]] [[verberk-2011]]. Кислород, вероятно, — часть истории, но не вся [[harrison-2010]].',
            'Современные стрекозы мельче, но летают блестяще. Стрекоза может менять угол и скорость каждого из четырёх крыльев, поэтому умеет зависать, поворачивать и лететь в любую сторону [[nhm-dragonfly-wings]].',
          ],
          tryIt: {
            steps: [
              'Вырежьте полоску бумаги длиной 70 см или склейте листы скотчем.',
              'Приложите её к рукам, от кончиков пальцев до кончиков пальцев.',
              'Сравните со своим размахом рук.',
            ],
            lookFor: 'Ваш размах больше или меньше, чем у гигантского насекомого?',
          },
          grownUps: [
            'Название «гигантская стрекоза» вводит в заблуждение: меганевры относятся к вымершему отряду Meganisoptera, который входит в тот же надотряд, что стрекозы и равнокрылые стрекозы [[nhm-griffinflies]].',
            'Древнее содержание кислорода выводят из моделей по горным породам и древесному углю, и оно неточно; 35 % — верхняя граница [[graham-1995]]. Тщательный обзор пришёл к выводу, что связь с кислородом пока нельзя ни доказать, ни отвергнуть [[harrison-2010]].',
          ],
        },
      },
    },
    {
      id: 'pterosaurs',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Pterosaurs',
          lead: 'The first animals with a backbone to fly were not birds, and not dinosaurs.',
          body: [
            'Pterosaurs were flying reptiles. The Natural History Museum gives about 215 million years ago for the first ones on one page and 228 million on another, so we write “215 to 228” [[nhm-pterosaurs]] [[nhm-triassic]]. They lived until 66 million years ago [[nhm-pterosaurs]]. Their closest known relatives, the lagerpetids, were small running reptiles that could not fly [[ezcurra-2020]].',
            'A pterosaur wing was a thin skin stretched from the arm to the leg. One enormously long finger held its front edge out [[nhm-pterosaurs]].',
            'The biggest, Quetzalcoatlus, keeps changing size. In 1975 its discoverer estimated a wingspan of 15.5 m [[lawson-1975]]. Better bones and better sums brought that down. A 2010 study judged 10 to 11 m and 200 to 250 kg the most reliable upper estimates [[witton-habib-2010]]. Eleven metres is about 37 sheets of paper end to end {{estimate}}.',
            'How did a giant take off? Birds jump with their legs. A 2008 study suggested pterosaurs used all four limbs: they crouched, then vaulted up over their folded wings, like a pole-vaulter [[habib-2008]] [[witton-habib-2010]]. A 2021 study of Quetzalcoatlus agreed that a four-limbed launch was possible, but thought a strong jump from the back legs alone was possible too [[padian-2021]]. The question is still open.',
          ],
          tryIt: {
            steps: [
              'Hold one arm out. Cut a paper triangle from your fingertip to your hip.',
              'Tape it along the arm and the side.',
              'Lift the arm and let the paper catch the air.',
            ],
            lookFor: 'Where does the paper catch the most air?',
          },
          grownUps: [
            'Flight evolved at least four separate times: in insects, pterosaurs, birds and bats. Birds come from dinosaurs; pterosaurs do not [[nhm-pterosaurs]].',
            'Pterosaurs appear in the fossil record already able to fly, so the steps before flight are unknown [[nhm-ghost-ranch]]. The two dates above are both the museum’s own.',
            'Published wingspans for Quetzalcoatlus range widely. We use the estimate the 2010 study calls most reliable [[witton-habib-2010]].',
          ],
        },
        es: {
          title: 'Pterosaurios',
          lead: 'Los primeros animales con columna vertebral que volaron no eran aves ni dinosaurios.',
          body: [
            'Los pterosaurios eran reptiles voladores. El Museo de Historia Natural da unos 215 millones de años para los primeros en una página y 228 millones en otra, así que escribimos «de 215 a 228» [[nhm-pterosaurs]] [[nhm-triassic]]. Vivieron hasta hace 66 millones de años [[nhm-pterosaurs]]. Sus parientes conocidos más cercanos, los lagerpétidos, eran pequeños reptiles corredores que no volaban [[ezcurra-2020]].',
            'El ala de un pterosaurio era una piel fina extendida del brazo a la pata. Un dedo larguísimo sostenía su borde delantero [[nhm-pterosaurs]].',
            'El mayor, Quetzalcoatlus, no deja de cambiar de tamaño. En 1975 su descubridor calculó una envergadura de 15,5 m [[lawson-1975]]. Mejores huesos y mejores cuentas la rebajaron. Un estudio de 2010 consideró que 10 a 11 m y 200 a 250 kg son las estimaciones máximas más fiables [[witton-habib-2010]]. Once metros son unas 37 hojas de papel puestas una tras otra {{estimate}}.',
            '¿Cómo despegaba un gigante? Las aves saltan con las patas. Un estudio de 2008 propuso que los pterosaurios usaban las cuatro extremidades: se agachaban y saltaban por encima de sus alas plegadas, como un saltador con pértiga [[habib-2008]] [[witton-habib-2010]]. Un estudio de 2021 sobre Quetzalcoatlus aceptó que el despegue a cuatro patas era posible, pero pensó que un fuerte salto solo con las patas traseras también lo era [[padian-2021]]. La pregunta sigue abierta.',
          ],
          tryIt: {
            steps: [
              'Extiende un brazo. Corta un triángulo de papel desde la punta de tus dedos hasta la cadera.',
              'Pégalo con cinta a lo largo del brazo y del costado.',
              'Levanta el brazo y deja que el papel atrape el aire.',
            ],
            lookFor: '¿Dónde atrapa más aire el papel?',
          },
          grownUps: [
            'El vuelo evolucionó al menos cuatro veces por separado: en insectos, pterosaurios, aves y murciélagos. Las aves vienen de los dinosaurios; los pterosaurios, no [[nhm-pterosaurs]].',
            'Los pterosaurios aparecen en el registro fósil ya capaces de volar, así que se desconocen los pasos anteriores al vuelo [[nhm-ghost-ranch]]. Las dos fechas de arriba son las del propio museo.',
            'Las envergaduras publicadas de Quetzalcoatlus varían mucho. Usamos la estimación que el estudio de 2010 considera más fiable [[witton-habib-2010]].',
          ],
        },
        ru: {
          title: 'Птерозавры',
          lead: 'Первые позвоночные, которые полетели, не были ни птицами, ни динозаврами.',
          body: [
            'Птерозавры — летающие рептилии. Музей естественной истории на одной странице называет для первых из них около 215 миллионов лет назад, на другой — 228 миллионов, поэтому мы пишем «215–228» [[nhm-pterosaurs]] [[nhm-triassic]]. Они жили до 66 миллионов лет назад [[nhm-pterosaurs]]. Их ближайшие известные родственники, лагерпетиды, были маленькими бегающими рептилиями и летать не умели [[ezcurra-2020]].',
            'Крыло птерозавра было тонкой кожей, натянутой от руки до ноги. Передний край держал один невероятно длинный палец [[nhm-pterosaurs]].',
            'Самый крупный, Quetzalcoatlus, всё время меняет размер. В 1975 году его первооткрыватель оценил размах крыльев в 15,5 м [[lawson-1975]]. Лучшие кости и точные расчёты его уменьшили. Исследование 2010 года сочло самыми надёжными верхними оценками 10–11 м и 200–250 кг [[witton-habib-2010]]. Одиннадцать метров — это около 37 листов бумаги, выложенных друг за другом {{estimate}}.',
            'Как взлетал великан? Птицы отталкиваются ногами. Исследование 2008 года предположило, что птерозавры использовали все четыре конечности: приседали и перепрыгивали через сложенные крылья, как прыгун с шестом [[habib-2008]] [[witton-habib-2010]]. Исследование кецалькоатля 2021 года согласилось, что взлёт на четырёх конечностях был возможен, но сочло возможным и сильный прыжок одними задними ногами [[padian-2021]]. Вопрос остаётся открытым.',
          ],
          tryIt: {
            steps: [
              'Вытяните в сторону руку. Вырежьте бумажный треугольник от кончиков пальцев до бедра.',
              'Приклейте его скотчем вдоль руки и бока.',
              'Поднимите руку и дайте бумаге поймать воздух.',
            ],
            lookFor: 'Где бумага ловит больше всего воздуха?',
          },
          grownUps: [
            'Полёт возникал по меньшей мере четыре раза независимо: у насекомых, птерозавров, птиц и летучих мышей. Птицы произошли от динозавров, птерозавры — нет [[nhm-pterosaurs]].',
            'Птерозавры появляются в летописи уже умеющими летать, поэтому шаги, предшествовавшие полёту, неизвестны [[nhm-ghost-ranch]]. Обе даты выше принадлежат самому музею.',
            'Опубликованные размахи крыльев кецалькоатля сильно расходятся. Мы берём оценку, которую исследование 2010 года считает самой надёжной [[witton-habib-2010]].',
          ],
        },
      },
    },
    {
      id: 'birds',
      kind: 'explainer',
      figure: null,
      photo: 'eagle-soaring',
      text: {
        en: {
          title: 'Feathers first, flight later',
          lead: 'Birds are dinosaurs. And dinosaurs had feathers before any of them flew.',
          body: [
            'In 1996, scientists in China named Sinosauropteryx, a dinosaur about 1 m long covered in fine, hair-like feathers. It could not fly [[nhm-sinosauropteryx]]. Since then, feathers have turned up on many dinosaurs.',
            'Some were huge. Yutyrannus, a cousin of Tyrannosaurus about 9 m long, wore long, thread-like feathers [[xu-2012]] [[nature-yutyrannus]]. Even a plant-eater, Kulindadromeus, had feather-like threads about 168 million years ago [[godefroit-2014]] [[cincotta-2019]]. Feathers came first; flight came later.',
            'Archaeopteryx lived about 150 million years ago; the museum gives 149 to 145 million. It was the size of a magpie, with broad feathered wings, but also sharp teeth and a long bony tail. Every skeleton comes from limestone quarries near Solnhofen, Germany [[nhm-archaeopteryx]].',
            'Could it fly? The museum says nobody knows whether it flew fully or only glided [[nhm-archaeopteryx]]. A 2018 study of its wing bones argued that it flapped [[nc-archaeopteryx]], and a 2025 study found special inner wing feathers that suggest it was built for flight [[oconnor-2025]].',
            'Other feathered dinosaurs tried other wings. Microraptor, about 120 million years ago, had long feathers on its arms and its legs: four wings. It could probably glide [[xu-2003]] [[he-2004]].',
          ],
          tryIt: {
            steps: [
              'Find a feather. Hold it by the quill.',
              'Wave it slowly, then fast.',
              'Drop it from head height.',
            ],
            lookFor: 'Does it fall straight? Does it drift to one side?',
          },
          grownUps: [
            'About a dozen Archaeopteryx skeletons are known. The 2025 study described the 14th, but researchers do not all count the same fossils [[oconnor-2025]].',
            'Size estimates for Yutyrannus differ between sources; we give the figure published with its description [[nature-yutyrannus]]. The museum’s range of 149 to 145 million years ago is narrower than the round “about 150” used in the timeline [[nhm-archaeopteryx]].',
          ],
        },
        es: {
          title: 'Primero plumas, después vuelo',
          lead: 'Las aves son dinosaurios. Y los dinosaurios tuvieron plumas antes de que ninguno volara.',
          body: [
            'En 1996, científicos de China nombraron a Sinosauropteryx, un dinosaurio de 1 m cubierto de plumas finas como pelos. No podía volar [[nhm-sinosauropteryx]]. Desde entonces han aparecido plumas en muchos dinosaurios.',
            'Algunos eran enormes. Yutyrannus, primo de Tyrannosaurus de unos 9 m, llevaba plumas largas como hilos [[xu-2012]] [[nature-yutyrannus]]. Hasta un herbívoro, Kulindadromeus, tenía filamentos parecidos a plumas hace unos 168 millones de años [[godefroit-2014]] [[cincotta-2019]]. Primero llegaron las plumas; el vuelo, después.',
            'Archaeopteryx vivió hace unos 150 millones de años; el museo da de 149 a 145 millones. Tenía el tamaño de una urraca, alas anchas con plumas, pero también dientes afilados y una larga cola de hueso. Todos los esqueletos proceden de canteras de caliza cerca de Solnhofen, en Alemania [[nhm-archaeopteryx]].',
            '¿Podía volar? El museo dice que nadie sabe si volaba del todo o solo planeaba [[nhm-archaeopteryx]]. Un estudio de 2018 sobre los huesos de su ala defendió que aleteaba [[nc-archaeopteryx]], y un estudio de 2025 halló plumas especiales en la parte interior del ala que sugieren que estaba hecho para volar [[oconnor-2025]].',
            'Otros dinosaurios con plumas probaron otras alas. Microraptor, hace unos 120 millones de años, tenía plumas largas en los brazos y en las patas: cuatro alas. Probablemente planeaba [[xu-2003]] [[he-2004]].',
          ],
          tryIt: {
            steps: [
              'Busca una pluma. Sujétala por el cañón.',
              'Agítala despacio y luego rápido.',
              'Suéltala desde la altura de la cabeza.',
            ],
            lookFor: '¿Cae recta? ¿Se desvía hacia un lado?',
          },
          grownUps: [
            'Se conocen una docena de esqueletos de Archaeopteryx, más o menos. El estudio de 2025 describió el decimocuarto, pero no todos los investigadores cuentan los mismos fósiles [[oconnor-2025]].',
            'Las estimaciones del tamaño de Yutyrannus varían según la fuente; damos la cifra publicada con su descripción [[nature-yutyrannus]]. El intervalo del museo, de 149 a 145 millones de años, es más estrecho que el «unos 150» redondo de la cronología [[nhm-archaeopteryx]].',
          ],
        },
        ru: {
          title: 'Сначала перья, потом полёт',
          lead: 'Птицы — это динозавры. А перья у динозавров появились раньше, чем кто-то из них полетел.',
          body: [
            'В 1996 году учёные в Китае описали синозавроптерикса — динозавра длиной около 1 м, покрытого тонкими, похожими на волосы перьями. Летать он не мог [[nhm-sinosauropteryx]]. С тех пор перья нашли у многих динозавров.',
            'Некоторые были огромными. Ютираннус, родственник тираннозавра длиной около 9 м, носил длинные нитевидные перья [[xu-2012]] [[nature-yutyrannus]]. Даже у растительноядного кулиндадромеуса около 168 миллионов лет назад были похожие на перья нити [[godefroit-2014]] [[cincotta-2019]]. Сначала появились перья, полёт — потом.',
            'Археоптерикс жил около 150 миллионов лет назад; музей указывает 149–145 миллионов. Он был размером с сороку, с широкими крыльями из перьев, но ещё с острыми зубами и длинным костным хвостом. Все скелеты найдены в известняковых карьерах у Зольнхофена в Германии [[nhm-archaeopteryx]].',
            'Умел ли он летать? Музей пишет, что никто не знает, летал ли он по-настоящему или только планировал [[nhm-archaeopteryx]]. Исследование костей его крыла 2018 года говорит, что он махал крыльями [[nc-archaeopteryx]], а исследование 2025 года нашло особые внутренние перья крыла, которые указывают, что он был создан для полёта [[oconnor-2025]].',
            'Другие пернатые динозавры пробовали другие крылья. У микрораптора около 120 миллионов лет назад были длинные перья на руках и на ногах — четыре крыла. Вероятно, он умел планировать [[xu-2003]] [[he-2004]].',
          ],
          tryIt: {
            steps: [
              'Найдите перо. Держите его за очин.',
              'Помашите им сначала медленно, потом быстро.',
              'Отпустите его с высоты головы.',
            ],
            lookFor: 'Падает ли оно прямо? Сносит ли его в сторону?',
          },
          grownUps: [
            'Известно около дюжины скелетов археоптерикса. Исследование 2025 года описало четырнадцатый, но не все исследователи считают одни и те же находки [[oconnor-2025]].',
            'Оценки размера ютираннуса в разных источниках расходятся; мы даём цифру, опубликованную вместе с его описанием [[nature-yutyrannus]]. Диапазон музея, от 149 до 145 миллионов лет назад, уже, чем круглое «около 150» на хронологии [[nhm-archaeopteryx]].',
          ],
        },
      },
    },
    {
      id: 'bats',
      kind: 'explainer',
      figure: null,
      photo: 'bat-flight',
      text: {
        en: {
          title: 'Bats: hands that fly',
          lead: 'A bat’s wing is a hand, with skin between the fingers.',
          body: [
            'Bats are the only mammals that truly fly. There are more than 1,400 kinds of bat, about one in every five kinds of mammal [[doi-bats]] [[nature-bat-2008]].',
            'Their wing is a thin skin stretched over the arm and four very long fingers [[si-bats]]. The skin is alive with sensors: tiny hairs on it feel the air flowing past [[sterbing-2011]], and hair-thin muscles inside it tune the wing as it flies [[brown-bat-muscles]].',
            'The oldest bat skeletons found so far are about 52 million years old and come from Wyoming [[nhm-bats-2023]] [[rietbergen-2023]]. One early bat, Onychonycteris, could already fly, but its ears suggest it could not yet find its way by echoes. Flight came first [[nature-bat-2008]].',
            'Onychonycteris still had claws on all five fingers and short, broad wings. It may have flown by fluttering and gliding in turns [[nature-bat-2008]].',
          ],
          tryIt: {
            steps: [
              'Spread the fingers of one hand wide.',
              'Imagine skin joining the fingertips.',
              'Draw your hand with the skin between the fingers.',
            ],
            lookFor: 'Which finger would you move to turn left?',
          },
          grownUps: [
            'Finding the way by echoes is called echolocation: a bat calls and listens for the echo. Onychonycteris shows that bats could fly before they could do this [[nature-bat-2008]].',
            'Which fossil is the oldest bat depends on how the rock layers are dated, which is not exactly known [[nhm-bats-2023]] [[rietbergen-2023]]. Counts of bat species also differ between sources; we use the US Department of the Interior figure [[doi-bats]].',
          ],
        },
        es: {
          title: 'Murciélagos: manos que vuelan',
          lead: 'El ala de un murciélago es una mano, con piel entre los dedos.',
          body: [
            'Los murciélagos son los únicos mamíferos que vuelan de verdad. Hay más de 1400 especies de murciélagos, una de cada cinco especies de mamíferos [[doi-bats]] [[nature-bat-2008]].',
            'Su ala es una piel fina extendida sobre el brazo y cuatro dedos muy largos [[si-bats]]. La piel está llena de sensores: pelos diminutos notan el aire que pasa [[sterbing-2011]], y músculos finos como un pelo, dentro de ella, ajustan el ala en pleno vuelo [[brown-bat-muscles]].',
            'Los esqueletos de murciélago más antiguos hallados hasta ahora tienen unos 52 millones de años y proceden de Wyoming [[nhm-bats-2023]] [[rietbergen-2023]]. Un murciélago primitivo, Onychonycteris, ya podía volar, pero sus oídos sugieren que aún no se orientaba por el eco. Primero llegó el vuelo [[nature-bat-2008]].',
            'Onychonycteris aún tenía garras en los cinco dedos y alas cortas y anchas. Quizá volaba alternando aleteo y planeo [[nature-bat-2008]].',
          ],
          tryIt: {
            steps: [
              'Abre bien los dedos de una mano.',
              'Imagina piel uniendo las puntas de los dedos.',
              'Dibuja tu mano con la piel entre los dedos.',
            ],
            lookFor: '¿Qué dedo moverías para girar a la izquierda?',
          },
          grownUps: [
            'Orientarse por el eco se llama ecolocalización: el murciélago emite un sonido y escucha el eco. Onychonycteris muestra que los murciélagos volaban antes de saber hacerlo [[nature-bat-2008]].',
            'Cuál es el fósil de murciélago más antiguo depende de cómo se daten las capas de roca, algo que no se conoce con exactitud [[nhm-bats-2023]] [[rietbergen-2023]]. El número de especies también varía según la fuente; usamos la cifra del Departamento del Interior de EE. UU. [[doi-bats]].',
          ],
        },
        ru: {
          title: 'Летучие мыши: руки, которые летают',
          lead: 'Крыло летучей мыши — это рука с кожей между пальцами.',
          body: [
            'Летучие мыши — единственные млекопитающие, которые летают по-настоящему. Видов летучих мышей больше 1400 — это примерно каждый пятый вид млекопитающих [[doi-bats]] [[nature-bat-2008]].',
            'Их крыло — тонкая кожа, натянутая на руку и четыре очень длинных пальца [[si-bats]]. Кожа полна датчиков: крошечные волоски на ней чувствуют поток воздуха [[sterbing-2011]], а тонкие, как волос, мышцы внутри неё подстраивают крыло прямо в полёте [[brown-bat-muscles]].',
            'Самым древним найденным скелетам летучих мышей около 52 миллионов лет, они из Вайоминга [[nhm-bats-2023]] [[rietbergen-2023]]. Одна ранняя летучая мышь, онихониктерис, уже умела летать, но её уши говорят, что ориентироваться по эху она ещё не могла. Сначала появился полёт [[nature-bat-2008]].',
            'У онихониктериса ещё были когти на всех пяти пальцах и короткие широкие крылья. Возможно, он летал, чередуя порхание и планирование [[nature-bat-2008]].',
          ],
          tryIt: {
            steps: [
              'Широко раздвиньте пальцы одной руки.',
              'Представьте, что кожа соединяет кончики пальцев.',
              'Нарисуйте свою руку с кожей между пальцами.',
            ],
            lookFor: 'Каким пальцем вы бы двинули, чтобы повернуть налево?',
          },
          grownUps: [
            'Ориентирование по эху называют эхолокацией: летучая мышь издаёт звук и слушает эхо. Онихониктерис показывает, что летучие мыши летали раньше, чем научились этому [[nature-bat-2008]].',
            'Какая окаменелость считается древнейшей, зависит от датировки слоёв породы, которая известна неточно [[nhm-bats-2023]] [[rietbergen-2023]]. Число видов в разных источниках тоже разное; мы берём цифру Министерства внутренних дел США [[doi-bats]].',
          ],
        },
      },
    },
    {
      id: 'gliding-animals',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Gliders of the forest',
          lead: 'Some animals never flap. They jump, spread out, and fall forwards on purpose.',
          body: [
            'Gliding has evolved at least six separate times in mammals [[byrnes-spence-2011]]. A flying squirrel has a furry skin flap from wrist to ankle [[nps-squirrel]]. A usual glide is about 10 m; from a tall tree down a slope it can reach about 80 m [[esf-squirrel]].',
            'The colugo of South-East Asia is a champion. One Sunda colugo was recorded gliding about 145 m, longer than a football pitch [[sciencenews-colugo]].',
            'The Draco lizard opens skin on long ribs and glides from tree to tree, usually about 8 m at a time [[adw-draco]].',
            'Flying snakes have no limbs at all. A paradise tree snake leaps, spreads its ribs to flatten its body, and wriggles through the air [[socha-2002]] [[holden-2014]]. The wriggle is not wasted: it keeps the snake from tumbling [[yeaton-2020]]. In tests from a 15 m tower, snakes travelled up to 24 m [[socha-2010]].',
          ],
          tryIt: {
            steps: [
              'Stand on the first stair. Open your arms.',
              'Step forwards and land on your feet, with a helper standing beside you.',
              'Mark where you land. Try again from the second stair.',
            ],
            lookFor: 'Does a higher start give a longer glide?',
          },
          grownUps: [
            'Published glide distances vary, because species and launch heights vary. The glide ratio, distance divided by height lost, is the number that compares animals fairly [[esf-squirrel]].',
            'Jake Socha’s team at Virginia Tech filmed flying snakes in 3D. The snake ripples side to side and, more gently, up and down at the same time [[yeaton-2020]].',
          ],
        },
        es: {
          title: 'Planeadores del bosque',
          lead: 'Algunos animales nunca aletean. Saltan, se extienden y caen hacia delante a propósito.',
          body: [
            'El planeo ha evolucionado al menos seis veces por separado en los mamíferos [[byrnes-spence-2011]]. Una ardilla voladora tiene un pliegue de piel con pelo desde la muñeca hasta el tobillo [[nps-squirrel]]. Un planeo habitual ronda los 10 m; desde un árbol alto y cuesta abajo puede llegar a unos 80 m [[esf-squirrel]].',
            'El colugo del sudeste asiático es un campeón. Se registró a un colugo de la Sonda planeando unos 145 m, más que un campo de fútbol [[sciencenews-colugo]].',
            'El lagarto Draco abre una piel sobre costillas largas y planea de árbol en árbol, normalmente unos 8 m cada vez [[adw-draco]].',
            'Las serpientes voladoras no tienen patas. La serpiente arborícola del paraíso salta, separa las costillas para aplanar el cuerpo y ondula por el aire [[socha-2002]] [[holden-2014]]. La ondulación no es inútil: evita que la serpiente dé vueltas [[yeaton-2020]]. En pruebas desde una torre de 15 m, las serpientes llegaron hasta 24 m [[socha-2010]].',
          ],
          tryIt: {
            steps: [
              'Ponte en el primer escalón. Abre los brazos.',
              'Da un paso adelante y cae sobre tus pies, con alguien que ayude a tu lado.',
              'Marca dónde aterrizas. Repite desde el segundo escalón.',
            ],
            lookFor: '¿Una salida más alta da un planeo más largo?',
          },
          grownUps: [
            'Las distancias de planeo publicadas varían, porque varían las especies y las alturas de salida. La relación de planeo, distancia dividida por altura perdida, es el número que compara bien a los animales [[esf-squirrel]].',
            'El equipo de Jake Socha en Virginia Tech filmó serpientes voladoras en 3D. La serpiente ondula de lado a lado y, más suavemente, de arriba abajo a la vez [[yeaton-2020]].',
          ],
        },
        ru: {
          title: 'Планеристы леса',
          lead: 'Некоторые животные никогда не машут крыльями. Они прыгают, раскрываются и нарочно падают вперёд.',
          body: [
            'Планирование возникало у млекопитающих по меньшей мере шесть раз независимо [[byrnes-spence-2011]]. У белки-летяги есть покрытая шерстью кожная складка от запястья до лодыжки [[nps-squirrel]]. Обычный полёт — около 10 м, а с высокого дерева вниз по склону — около 80 м [[esf-squirrel]].',
            'Шерстокрыл из Юго-Восточной Азии — чемпион. Один зондский шерстокрыл пролетел около 145 м — больше футбольного поля [[sciencenews-colugo]].',
            'Летучий дракон раскрывает кожу на длинных рёбрах и перелетает с дерева на дерево, обычно примерно на 8 м за раз [[adw-draco]].',
            'У летучих змей вообще нет конечностей. Райская древесная змея прыгает, раздвигает рёбра, чтобы сплющить тело, и извивается в воздухе [[socha-2002]] [[holden-2014]]. Извивы не напрасны: они не дают змее кувыркаться [[yeaton-2020]]. В опытах с 15-метровой башни змеи пролетали до 24 м [[socha-2010]].',
          ],
          tryIt: {
            steps: [
              'Встаньте на первую ступеньку. Раскройте руки.',
              'Шагните вперёд и приземлитесь на ноги, а помощник пусть стоит рядом.',
              'Отметьте, где вы приземлились. Повторите со второй ступеньки.',
            ],
            lookFor: 'Даёт ли более высокий старт более дальний полёт?',
          },
          grownUps: [
            'Опубликованные дальности планирования различаются, потому что различаются виды и высоты старта. Качество планирования — дальность, делённая на потерянную высоту, — это число, которое честно сравнивает животных [[esf-squirrel]].',
            'Команда Джейка Сочи в Политехническом университете Виргинии снимала летучих змей в 3D. Змея извивается из стороны в сторону и одновременно, слабее, вверх и вниз [[yeaton-2020]].',
          ],
        },
      },
    },
    {
      id: 'sea-gliders',
      kind: 'explainer',
      figure: null,
      photo: null,
      text: {
        en: {
          title: 'Fish and squid that fly',
          lead: 'Some of the best gliders live in the sea.',
          body: [
            'A flying fish races to the surface, spreads its big fins like wings and leaps. Its tail keeps beating in the water as it takes off, like a plane speeding down a runway [[natgeo-flyingfish]].',
            'Once up, it glides low over the waves. Flying close to the water lowers drag, and its fins glide about as well as the wings of some birds [[park-choi-2010]]. By linking glides, touching the sea and taking off again, a flying fish can cover about 400 m [[britannica-fish]].',
            'The longest flight ever timed lasted 45 seconds. A Japanese television crew filmed it from a ferry in 2008 [[guinness-flyingfish]].',
            'Squid fly too. In 2013, Japanese scientists described young ocean squid launching from the sea. They shot out a jet of water to take off, spread their fins and arm skin as wings, glided, and dived back in [[muramatsu-2013]] [[hokudai-squid]]. They reached up to 11.2 m per second, about 40 km/h [[hokudai-squid]] {{estimate}}.',
          ],
          tryIt: {
            steps: [
              'Fold a paper plane with big, wide wings.',
              'Launch it gently, just above a long table.',
              'Launch it again the same way, high above the table.',
            ],
            lookFor: 'Does it glide farther close to the surface?',
          },
          grownUps: [
            'Flying fish speeds differ between sources. A journal press release says up to 70 km/h; Guinness estimated about 30 km/h for the record fish [[jeb-flyingfish]] [[guinness-flyingfish]].',
            'The university describes the squid as young flying squid of the family Ommastrephidae; news reports name different species, so we do not [[hokudai-squid]].',
          ],
        },
        es: {
          title: 'Peces y calamares que vuelan',
          lead: 'Algunos de los mejores planeadores viven en el mar.',
          body: [
            'Un pez volador sube a toda velocidad a la superficie, abre sus grandes aletas como alas y salta. Su cola sigue batiendo en el agua mientras despega, como un avión que corre por la pista [[natgeo-flyingfish]].',
            'Ya en el aire, planea a ras de las olas. Volar cerca del agua reduce la resistencia, y sus aletas planean casi tan bien como las alas de algunas aves [[park-choi-2010]]. Enlazando planeos, tocando el mar y despegando de nuevo, un pez volador puede recorrer unos 400 m [[britannica-fish]].',
            'El vuelo más largo jamás cronometrado duró 45 segundos. Un equipo de la televisión japonesa lo grabó desde un ferri en 2008 [[guinness-flyingfish]].',
            'Los calamares también vuelan. En 2013, científicos japoneses describieron calamares jóvenes de alta mar despegando del agua. Expulsaban un chorro de agua para despegar, abrían las aletas y la piel de los brazos como alas, planeaban y volvían a zambullirse [[muramatsu-2013]] [[hokudai-squid]]. Llegaron a 11,2 m por segundo, unos 40 km/h [[hokudai-squid]] {{estimate}}.',
          ],
          tryIt: {
            steps: [
              'Pliega un avión de papel con alas grandes y anchas.',
              'Lánzalo con suavidad justo por encima de una mesa larga.',
              'Lánzalo otra vez igual, muy por encima de la mesa.',
            ],
            lookFor: '¿Planea más lejos cerca de la superficie?',
          },
          grownUps: [
            'Las velocidades del pez volador varían según la fuente. Una nota de prensa de una revista científica habla de hasta 70 km/h; Guinness estimó unos 30 km/h para el pez del récord [[jeb-flyingfish]] [[guinness-flyingfish]].',
            'La universidad describe los calamares como calamares voladores jóvenes de la familia Ommastrephidae; las noticias citan especies distintas, así que no damos ninguna [[hokudai-squid]].',
          ],
        },
        ru: {
          title: 'Рыбы и кальмары, которые летают',
          lead: 'Некоторые лучшие планеристы живут в море.',
          body: [
            'Летучая рыба мчится к поверхности, раскрывает большие плавники, как крылья, и выпрыгивает. Её хвост продолжает бить по воде во время взлёта, как самолёт, разгоняющийся по полосе [[natgeo-flyingfish]].',
            'В воздухе она скользит низко над волнами. Полёт у самой воды снижает сопротивление, а её плавники планируют почти так же хорошо, как крылья некоторых птиц [[park-choi-2010]]. Связывая полёты, касаясь моря и снова взлетая, летучая рыба может преодолеть около 400 м [[britannica-fish]].',
            'Самый долгий полёт, который удалось засечь, длился 45 секунд. Японская съёмочная группа сняла его с парома в 2008 году [[guinness-flyingfish]].',
            'Кальмары тоже летают. В 2013 году японские учёные описали молодых океанских кальмаров, взлетающих из моря. Они выпускали струю воды, чтобы взлететь, раскрывали плавники и кожу между щупальцами, как крылья, планировали и ныряли обратно [[muramatsu-2013]] [[hokudai-squid]]. Их скорость доходила до 11,2 м в секунду, около 40 км/ч [[hokudai-squid]] {{estimate}}.',
          ],
          tryIt: {
            steps: [
              'Сложите бумажный самолёт с большими широкими крыльями.',
              'Мягко запустите его прямо над длинным столом.',
              'Запустите так же ещё раз, высоко над столом.',
            ],
            lookFor: 'Летит ли он дальше у самой поверхности?',
          },
          grownUps: [
            'Скорости летучих рыб в разных источниках разные. Пресс-релиз научного журнала называет до 70 км/ч; Книга рекордов Гиннесса оценила рекордную рыбу примерно в 30 км/ч [[jeb-flyingfish]] [[guinness-flyingfish]].',
            'Университет описывает этих кальмаров как молодых кальмаров семейства Ommastrephidae; в новостях называют разные виды, поэтому мы вид не называем [[hokudai-squid]].',
          ],
        },
      },
    },
    {
      id: 'record-flyers',
      kind: 'explainer',
      figure: null,
      photo: 'gliding-bird',
      text: {
        en: {
          title: 'Record holders',
          lead: 'The longest trip, the longest non-stop flight, the widest wings.',
          body: [
            'The Arctic tern spends the northern summer in the Arctic and the southern summer near Antarctica. Tiny trackers showed some terns flying more than 80,000 km in a year, about twice around the Earth [[egevang-2010]] {{estimate}}. Over its life, a tern may fly about 2.4 million km: three trips to the Moon and back [[natgeo-tern]] [[bas-tern]].',
            'The bar-tailed godwit never stops. In October 2022 a young godwit, known only by its tag number 234684, flew about 13,560 km from Alaska to Tasmania in 11 days and 1 hour, with no stop for food or rest [[guinness-godwit]]. In 2007, a godwit called E7 had flown 11,680 km to New Zealand [[gill-2009]].',
            'The wandering albatross has the widest wings of any living bird: about 3.5 m, and 3.63 m for the record bird, measured in 1965 [[guinness-albatross]]. That is about twelve sheets of paper end to end {{estimate}}.',
            'It hardly flaps. Near the waves the wind is slower; higher up it is faster. The albatross swoops up into the fast wind, turns and swoops down, gaining speed on every loop. This is dynamic soaring [[whoi-albatross]] [[sachs-2012]]. A lock in its shoulder holds the wings out [[whoi-albatross]]. Grey-headed albatrosses have flown right around the world, the fastest in 46 days [[croxall-2005]].',
          ],
          tryIt: {
            steps: [
              'Two players stand 3.6 m apart: the record albatross span.',
              'Lay a string on the floor between them.',
              'Now lie down beside it with your arms out.',
            ],
            lookFor: 'How many people, arms out, fit along one albatross?',
          },
          grownUps: [
            'The tern trackers are geolocators, light sensors that give rough positions, so distances are estimates. Terns from the Netherlands flew about 90,000 km in one season [[fijn-2013]].',
            'The 2022 godwit record comes from satellite tracking, not a scientific paper, and some scientists wondered whether the young bird had lost its way [[cbc-godwit]]. E7’s flight took more than eight days [[sciencenews-e7]].',
            'With the wind behind or beside it, a flying albatross uses little more energy than one resting on land [[weimerskirch-2000]].',
          ],
        },
        es: {
          title: 'Campeones del vuelo',
          lead: 'El viaje más largo, el vuelo más largo sin parar, las alas más anchas.',
          body: [
            'El charrán ártico pasa el verano del norte en el Ártico y el verano del sur cerca de la Antártida. Diminutos rastreadores mostraron que algunos charranes vuelan más de 80 000 km en un año, unas dos vueltas a la Tierra [[egevang-2010]] {{estimate}}. A lo largo de su vida, un charrán puede volar unos 2,4 millones de km: tres viajes a la Luna y vuelta [[natgeo-tern]] [[bas-tern]].',
            'La aguja colipinta no para nunca. En octubre de 2022, una aguja joven, conocida solo por el número de su marca, 234684, voló unos 13 560 km de Alaska a Tasmania en 11 días y 1 hora, sin parar a comer ni descansar [[guinness-godwit]]. En 2007, una aguja llamada E7 había volado 11 680 km hasta Nueva Zelanda [[gill-2009]].',
            'El albatros viajero tiene las alas más anchas de cualquier ave viva: unos 3,5 m, y 3,63 m el ave del récord, medida en 1965 [[guinness-albatross]]. Son unas doce hojas de papel puestas una tras otra {{estimate}}.',
            'Casi no aletea. Cerca de las olas el viento es más lento; más arriba, más rápido. El albatros sube hacia el viento rápido, gira y baja, ganando velocidad en cada vuelta. Es el planeo dinámico [[whoi-albatross]] [[sachs-2012]]. Un cierre en el hombro mantiene las alas extendidas [[whoi-albatross]]. Albatros de cabeza gris han dado la vuelta al mundo, el más rápido en 46 días [[croxall-2005]].',
          ],
          tryIt: {
            steps: [
              'Dos jugadores se ponen a 3,6 m de distancia: la envergadura del albatros récord.',
              'Tiende un cordel en el suelo entre ellos.',
              'Ahora túmbate a su lado con los brazos abiertos.',
            ],
            lookFor: '¿Cuántas personas con los brazos abiertos caben a lo largo de un albatros?',
          },
          grownUps: [
            'Los rastreadores de los charranes son geolocalizadores, sensores de luz que dan posiciones aproximadas, así que las distancias son estimaciones. Charranes de los Países Bajos volaron unos 90 000 km en una temporada [[fijn-2013]].',
            'El récord de la aguja de 2022 procede de un seguimiento por satélite, no de un artículo científico, y algunos científicos se preguntaron si el ave joven se había perdido [[cbc-godwit]]. El vuelo de E7 duró más de ocho días [[sciencenews-e7]].',
            'Con el viento de cola o de costado, un albatros en vuelo gasta poco más que uno que descansa en tierra [[weimerskirch-2000]].',
          ],
        },
        ru: {
          title: 'Рекордсмены',
          lead: 'Самый длинный путь, самый долгий полёт без посадки, самые широкие крылья.',
          body: [
            'Полярная крачка проводит северное лето в Арктике, а южное — у Антарктиды. Крошечные датчики показали, что некоторые крачки пролетают за год больше 80 000 км — примерно два оборота вокруг Земли [[egevang-2010]] {{estimate}}. За жизнь крачка может пролететь около 2,4 миллиона км — три раза до Луны и обратно [[natgeo-tern]] [[bas-tern]].',
            'Малый веретенник летит без остановок. В октябре 2022 года молодой веретенник, известный только по номеру метки, 234684, пролетел около 13 560 км от Аляски до Тасмании за 11 дней и 1 час, ни разу не остановившись поесть или отдохнуть [[guinness-godwit]]. В 2007 году веретенник по имени E7 пролетел 11 680 км до Новой Зеландии [[gill-2009]].',
            'У странствующего альбатроса самые широкие крылья среди живых птиц: около 3,5 м, а у рекордной птицы, измеренной в 1965 году, — 3,63 м [[guinness-albatross]]. Это около двенадцати листов бумаги, выложенных друг за другом {{estimate}}.',
            'Он почти не машет крыльями. У волн ветер слабее, выше — сильнее. Альбатрос взмывает в быстрый ветер, разворачивается и скользит вниз, набирая скорость на каждой петле. Это динамическое парение [[whoi-albatross]] [[sachs-2012]]. Замок в плече держит крылья раскрытыми [[whoi-albatross]]. Седоголовые альбатросы облетали весь земной шар, самый быстрый — за 46 дней [[croxall-2005]].',
          ],
          tryIt: {
            steps: [
              'Два игрока встают на расстоянии 3,6 м: это размах рекордного альбатроса.',
              'Положите между ними на пол нитку.',
              'Теперь лягте рядом с ней, раскинув руки.',
            ],
            lookFor: 'Сколько человек с раскинутыми руками поместится вдоль одного альбатроса?',
          },
          grownUps: [
            'Датчики крачек — геолокаторы, датчики света, которые дают приблизительное положение, поэтому расстояния — это оценки. Крачки из Нидерландов пролетели около 90 000 км за один сезон [[fijn-2013]].',
            'Рекорд веретенника 2022 года получен по спутниковому слежению, а не описан в научной статье, и некоторые учёные спрашивали, не сбилась ли молодая птица с пути [[cbc-godwit]]. Полёт E7 длился больше восьми дней [[sciencenews-e7]].',
            'При попутном или боковом ветре летящий альбатрос тратит лишь немногим больше энергии, чем сидящий на земле [[weimerskirch-2000]].',
          ],
        },
      },
    },
    {
      id: 'flap-or-glide',
      kind: 'explainer',
      figure: 'nature-wings',
      photo: null,
      text: {
        en: {
          title: 'How a butterfly flies',
          lead: 'A butterfly does not fly like a plane. It claps.',
          body: [
            'Every autumn, monarch butterflies from Canada and the eastern United States fly south to a few mountain forests in Mexico. Some fly as far as 3,000 miles, about 4,800 km [[usfs-monarch]]. The butterflies that make this trip live up to eight months, far longer than their parents [[fws-monarch]].',
            'How do such delicate wings do it? In a wind tunnel, scientists watched red admiral butterflies through threads of smoke. They used many tricks at once: swirls of air on the front edge of the wing, catching the air they had just stirred, and clapping their wings together [[srygley-2002]].',
            'The clap matters. On the upstroke the flexible wings cup, trapping a pocket of air, then clap shut and squeeze it out backwards as a jet. Flexible wings made that push 22 % stronger than stiff ones would [[johansson-2021]]. The clap-and-fling trick was first described in a tiny wasp in 1973 [[weis-fogh-1973]].',
            'A flapping wing makes lift and also thrust, the push forwards [[ucmp-thrust]]. A glider only trades height for distance [[nasa-gliders]]. Monarchs mix both, and flapping costs them far more: one early estimate says about 28 to 31 times the energy of gliding [[utm-monarch]]. The butterflies in this book only glide; your throw is their only push [[k2-note]].',
          ],
          tryIt: {
            steps: [
              'Hold two postcards back to back, like closed wings, near your cheek.',
              'Open them, then clap them shut quickly.',
              'Now launch a paper butterfly with a smooth, level push.',
            ],
            lookFor: 'Did you feel the puff of the clap? The paper butterfly cannot clap; only your push moves it.',
          },
          grownUps: [
            'The 22 % figure, and a 28 % gain in efficiency, come from silver-washed fritillary butterflies filmed in a wind tunnel at Lund University [[johansson-2021]]. The monarch energy estimate is an early calculation, so treat it as rough [[utm-monarch]].',
            'A flapping paper model is a separate project, planned for later in Open Flight. The figure shows wings in plan, not to scale; the labels come from the museum and Smithsonian pages cited in this chapter [[nhm-dragonfly-wings]] [[nhm-pterosaurs]] [[nhm-archaeopteryx]] [[si-bats]].',
          ],
          caption: 'Four natural wings and one paper wing, in plan. Sizes are not to scale.',
        },
        es: {
          title: 'Cómo vuela una mariposa',
          lead: 'Una mariposa no vuela como un avión. Aplaude.',
          body: [
            'Cada otoño, las mariposas monarca de Canadá y del este de Estados Unidos vuelan al sur hasta unos pocos bosques de montaña de México. Algunas recorren hasta 3000 millas, unos 4800 km [[usfs-monarch]]. Las mariposas que hacen el viaje viven hasta ocho meses, mucho más que sus padres [[fws-monarch]].',
            '¿Cómo lo consiguen unas alas tan delicadas? En un túnel de viento, unos científicos observaron mariposas vulcano entre hilos de humo. Usaban muchos trucos a la vez: remolinos de aire en el borde delantero del ala, aprovechar el aire que acababan de remover y dar palmadas con las alas [[srygley-2002]].',
            'La palmada importa. Al subir, las alas flexibles se ahuecan y atrapan una bolsa de aire; luego se cierran de golpe y la expulsan hacia atrás como un chorro. Las alas flexibles hicieron ese empuje un 22 % más fuerte que unas rígidas [[johansson-2021]]. El truco de la palmada y el despegue se describió por primera vez en una avispa diminuta en 1973 [[weis-fogh-1973]].',
            'Un ala que bate crea sustentación y también empuje, la fuerza hacia delante [[ucmp-thrust]]. Un planeador solo cambia altura por distancia [[nasa-gliders]]. Las monarca mezclan las dos cosas, y aletear les cuesta mucho más: una estimación temprana lo pone en unas 28 a 31 veces la energía del planeo [[utm-monarch]]. Las mariposas de este libro solo planean; tu lanzamiento es su único empuje [[k2-note]].',
          ],
          tryIt: {
            steps: [
              'Sujeta dos postales espalda con espalda, como alas cerradas, cerca de tu mejilla.',
              'Ábrelas y luego ciérralas de golpe.',
              'Ahora lanza una mariposa de papel con un empujón suave y horizontal.',
            ],
            lookFor: '¿Notaste el soplo de la palmada? La mariposa de papel no puede aplaudir; solo tu empujón la mueve.',
          },
          grownUps: [
            'La cifra del 22 %, y una mejora del 28 % en eficiencia, proceden de mariposas nacaradas filmadas en un túnel de viento de la Universidad de Lund [[johansson-2021]]. La estimación de energía de la monarca es un cálculo temprano; tómala como aproximada [[utm-monarch]].',
            'Un modelo de papel que bate las alas es otro proyecto, previsto para más adelante en Open Flight. La figura muestra alas en planta, no a escala; las etiquetas proceden de las páginas del museo y de la Smithsonian citadas en este capítulo [[nhm-dragonfly-wings]] [[nhm-pterosaurs]] [[nhm-archaeopteryx]] [[si-bats]].',
          ],
          caption: 'Cuatro alas naturales y un ala de papel, en planta. Los tamaños no están a escala.',
        },
        ru: {
          title: 'Как летает бабочка',
          lead: 'Бабочка летает не как самолёт. Она хлопает.',
          body: [
            'Каждую осень бабочки-монархи из Канады и востока США летят на юг, в несколько горных лесов Мексики. Некоторые пролетают до 3000 миль, около 4800 км [[usfs-monarch]]. Бабочки, совершающие этот путь, живут до восьми месяцев — гораздо дольше своих родителей [[fws-monarch]].',
            'Как такие нежные крылья с этим справляются? В аэродинамической трубе учёные наблюдали за бабочками-адмиралами сквозь струйки дыма. Те использовали много приёмов сразу: вихри на передней кромке крыла, воздух, который они только что взбили, и хлопки крыльями [[srygley-2002]].',
            'Хлопок важен. При взмахе вверх гибкие крылья выгибаются чашей и ловят карман воздуха, потом смыкаются и выталкивают его назад струёй. Гибкие крылья делали этот толчок на 22 % сильнее, чем жёсткие [[johansson-2021]]. Приём «хлопок и разлёт» впервые описали у крошечной осы в 1973 году [[weis-fogh-1973]].',
            'Машущее крыло создаёт подъёмную силу и ещё тягу — толчок вперёд [[ucmp-thrust]]. Планёр только меняет высоту на дальность [[nasa-gliders]]. Монархи сочетают и то и другое, и взмахи обходятся им намного дороже: по одной ранней оценке, примерно в 28–31 раз больше энергии, чем планирование [[utm-monarch]]. Бабочки этой книги только планируют; ваш бросок — их единственный толчок [[k2-note]].',
          ],
          tryIt: {
            steps: [
              'Держите две открытки спинками друг к другу, как сложенные крылья, возле щеки.',
              'Раскройте их, а потом быстро захлопните.',
              'Теперь запустите бумажную бабочку плавным горизонтальным толчком.',
            ],
            lookFor: 'Почувствовали дуновение от хлопка? Бумажная бабочка хлопать не умеет; её двигает только ваш толчок.',
          },
          grownUps: [
            'Цифра 22 %, а также прирост эффективности на 28 %, получены на бабочках-перламутровках, снятых в аэродинамической трубе Лундского университета [[johansson-2021]]. Оценка энергии монарха — ранний расчёт, поэтому считайте её грубой [[utm-monarch]].',
            'Бумажная модель с машущими крыльями — отдельный проект, запланированный на будущее в Open Flight. На рисунке крылья показаны сверху, не в масштабе; подписи взяты со страниц музея и Смитсоновского института, указанных в этой главе [[nhm-dragonfly-wings]] [[nhm-pterosaurs]] [[nhm-archaeopteryx]] [[si-bats]].',
          ],
          caption: 'Четыре природных крыла и одно бумажное, вид сверху. Размеры не в масштабе.',
        },
      },
    },
    {
      id: 'copycats',
      kind: 'explainer',
      figure: null,
      photo: 'sailplane',
      text: {
        en: {
          title: 'Copied from nature',
          lead: 'People have been borrowing nature’s wings for more than a hundred years.',
          body: [
            'Otto Lilienthal watched gulls, herons and storks for years, and even kept young storks in his garden. In 1889 he published a book on bird flight as the basis of flying, before flying his own gliders [[olm-lilienthal]]. The Wright brothers watched buzzards twist their wing tips to keep their balance, and twisted the wings of their own aircraft to do the same [[smithsonian-wright-warp]].',
            'The Javan cucumber seed flew to Austria. In 1897 the German professor Friedrich Ahlborn wrote about it as a model for flying machines. Igo Etrich and Franz Wels built a tailless glider in its shape. Etrich then gave the seed-shaped wing a body and a tail: the Etrich Taube, or “dove”, first tested in April 1910 [[historynet-taube]] [[olm-zanonia]].',
            'Engineers still copy seeds. Lockheed Martin named its one-winged spinning drone, Samarai, after maple seeds [[lockheed-samarai]]. Winged chips the size of a grain of sand spin down like seeds [[kim-2021]]. Sensors carried like dandelion seeds can drift up to 100 m in a moderate breeze [[iyer-2022]].',
            'And animals. Bat Bot, a 93 g robot, flies on thin silicone wings like a bat’s [[batbot-2017]]. The DelFly Nimble copies the quick escape turns of fruit flies [[delfly-2018]]. The upturned winglets at the tips of many airliners began with a NASA engineer thinking about the wing tips of soaring birds [[nasa-whitcomb]].',
          ],
          tryIt: {
            steps: [
              'Pick a flyer from this chapter.',
              'Write down the one trick it uses: spin, parachute, glide, soar or clap.',
              'Fold a paper model that uses only that trick.',
            ],
            lookFor: 'Which trick was easiest to copy with one sheet?',
          },
          grownUps: [
            'Etrich dates differ between sources. One account has the first glider sailing about 500 m in mid-1904 and flying with a sandbag in place of a pilot on 2 October 1906; others give 1905 or 1907 [[historynet-taube]] [[monash-etrich]]. The Lilienthal museum dates Ahlborn’s paper to 1896, not 1897 [[olm-zanonia]].',
            'Copying is never exact. The Taube’s name and look are bird-like, even though its wing came from a seed [[historynet-taube]]. Engineers borrow one idea at a time, then test it, just as you can.',
          ],
        },
        es: {
          title: 'Copiado de la naturaleza',
          lead: 'Las personas llevan más de cien años tomando prestadas las alas de la naturaleza.',
          body: [
            'Otto Lilienthal observó durante años gaviotas, garzas y cigüeñas, y hasta tuvo cigüeñas jóvenes en su jardín. En 1889 publicó un libro sobre el vuelo de las aves como base de la aviación, antes de volar sus propios planeadores [[olm-lilienthal]]. Los hermanos Wright vieron a los zopilotes torcer las puntas de las alas para mantener el equilibrio, y torcieron las alas de su avión para hacer lo mismo [[smithsonian-wright-warp]].',
            'La semilla del pepino de Java voló hasta Austria. En 1897, el profesor alemán Friedrich Ahlborn escribió sobre ella como modelo para máquinas voladoras. Igo Etrich y Franz Wels construyeron un planeador sin cola con su forma. Después Etrich dio al ala de semilla un cuerpo y una cola: el Etrich Taube, o «paloma», probado por primera vez en abril de 1910 [[historynet-taube]] [[olm-zanonia]].',
            'Los ingenieros siguen copiando semillas. Lockheed Martin llamó Samarai a su dron giratorio de una sola ala, por las semillas de arce [[lockheed-samarai]]. Chips con alas del tamaño de un grano de arena caen girando como semillas [[kim-2021]]. Sensores que viajan como semillas de diente de león pueden recorrer hasta 100 m con una brisa moderada [[iyer-2022]].',
            'Y animales. Bat Bot, un robot de 93 g, vuela con alas finas de silicona como las de un murciélago [[batbot-2017]]. El DelFly Nimble copia los giros rápidos de huida de la mosca de la fruta [[delfly-2018]]. Las aletas curvadas hacia arriba en la punta de las alas de muchos aviones de pasajeros nacieron de un ingeniero de la NASA que pensaba en las puntas de las alas de las aves planeadoras [[nasa-whitcomb]].',
          ],
          tryIt: {
            steps: [
              'Elige un volador de este capítulo.',
              'Escribe el único truco que usa: girar, paracaídas, planear, remontarse o aplaudir.',
              'Pliega un modelo de papel que use solo ese truco.',
            ],
            lookFor: '¿Qué truco fue más fácil de copiar con una hoja?',
          },
          grownUps: [
            'Las fechas de Etrich varían según la fuente. Un relato cuenta que el primer planeador recorrió unos 500 m a mediados de 1904 y voló con un saco de arena en lugar de piloto el 2 de octubre de 1906; otros dan 1905 o 1907 [[historynet-taube]] [[monash-etrich]]. El museo Lilienthal fecha el texto de Ahlborn en 1896, no en 1897 [[olm-zanonia]].',
            'Copiar nunca es exacto. El nombre y el aspecto del Taube recuerdan a un ave, aunque su ala viniera de una semilla [[historynet-taube]]. Los ingenieros toman prestada una idea cada vez y luego la prueban, igual que tú.',
          ],
        },
        ru: {
          title: 'Скопировано у природы',
          lead: 'Люди больше ста лет заимствуют крылья у природы.',
          body: [
            'Отто Лилиенталь годами наблюдал за чайками, цаплями и аистами и даже держал молодых аистов у себя в саду. В 1889 году он издал книгу о полёте птиц как основе воздухоплавания — ещё до полётов на своих планёрах [[olm-lilienthal]]. Братья Райт видели, как грифы скручивают концы крыльев, чтобы удержать равновесие, и стали скручивать крылья своего самолёта так же [[smithsonian-wright-warp]].',
            'Семя яванского огурца долетело до Австрии. В 1897 году немецкий профессор Фридрих Альборн описал его как образец для летательных машин. Иго Этрих и Франц Вельс построили бесхвостый планёр такой формы. Затем Этрих дал крылу-семени корпус и хвост: так появился «Этрих Таубе», то есть «голубь», впервые испытанный в апреле 1910 года [[historynet-taube]] [[olm-zanonia]].',
            'Инженеры и сейчас копируют семена. Lockheed Martin назвала свой однокрылый вращающийся дрон Samarai в честь крылаток клёна [[lockheed-samarai]]. Крылатые микросхемы размером с песчинку опускаются, вращаясь, как семена [[kim-2021]]. Датчики, которые летят, как семена одуванчика, при умеренном ветре уносятся до 100 м [[iyer-2022]].',
            'И животных. Bat Bot, робот массой 93 г, летает на тонких силиконовых крыльях, как у летучей мыши [[batbot-2017]]. DelFly Nimble повторяет быстрые повороты, которыми спасается плодовая мушка [[delfly-2018]]. Загнутые вверх законцовки на крыльях многих лайнеров начались с инженера NASA, который думал о кончиках крыльев парящих птиц [[nasa-whitcomb]].',
          ],
          tryIt: {
            steps: [
              'Выберите летуна из этой главы.',
              'Запишите один приём, которым он пользуется: вращение, парашют, планирование, парение или хлопок.',
              'Сложите бумажную модель, которая использует только этот приём.',
            ],
            lookFor: 'Какой приём легче всего повторить одним листом?',
          },
          grownUps: [
            'Даты Этриха в источниках расходятся. По одному рассказу, первый планёр пролетел около 500 м в середине 1904 года, а 2 октября 1906 года полетел с мешком песка вместо пилота; другие называют 1905 или 1907 год [[historynet-taube]] [[monash-etrich]]. Музей Лилиенталя датирует работу Альборна 1896 годом, а не 1897 [[olm-zanonia]].',
            'Копия никогда не бывает точной. Название и вид «Таубе» птичьи, хотя крыло пришло от семени [[historynet-taube]]. Инженеры заимствуют по одной идее и проверяют её — так же, как можете и вы.',
          ],
        },
      },
    },
    {
      id: 'your-flyers',
      kind: 'explainer',
      figure: null,
      photo: 'paper-plane-throw',
      text: {
        en: {
          title: 'Your paper flyers',
          lead: 'Three models in this book borrow an idea from this chapter.',
          body: [
            'The paper maple seed, plate F2, spins as it falls, like the seed in the first section. It is a classic design, and our version is {{not-yet-measured}}.',
            'The butterflies, plates B1 to B3, are experimental gliders with a monarch’s, a morpho’s and a swallowtail’s wings. They glide; they do not flap. They are {{concept}} until a recorded flight test says otherwise [[k2-note]].',
            'The ring glider, plate F1, has no animal twin that we can source. It is here because it shows that a wing does not have to be flat.',
          ],
          tryIt: {
            steps: [
              'Make the maple spinner and one butterfly.',
              'Drop the spinner from head height. Push the butterfly gently forwards.',
              'Write one sentence for each: it spins, or it glides.',
            ],
            lookFor: 'Which one stays in the air longer from the same height?',
          },
          grownUps: [
            'These models are untested in this book. Do not read a fall time or a distance from the chapter as a result. To keep a real record, use the flight lab, chapter 10.',
          ],
        },
        es: {
          title: 'Tus voladores de papel',
          lead: 'Tres modelos de este libro toman una idea de este capítulo.',
          body: [
            'La semilla de arce de papel, lámina F2, gira al caer, como la semilla de la primera sección. Es un diseño clásico y nuestra versión está {{not-yet-measured}}.',
            'Las mariposas, láminas B1 a B3, son planeadores experimentales con alas de monarca, de morfo y de macaón. Planean; no aletean. Son {{concept}} hasta que una prueba de vuelo registrada diga otra cosa [[k2-note]].',
            'El planeador de anillo, lámina F1, no tiene un gemelo animal que podamos documentar. Está aquí porque muestra que un ala no tiene por qué ser plana.',
          ],
          tryIt: {
            steps: [
              'Haz la semilla giratoria y una mariposa.',
              'Suelta la semilla desde la altura de la cabeza. Empuja la mariposa suavemente hacia delante.',
              'Escribe una frase para cada una: gira, o planea.',
            ],
            lookFor: '¿Cuál se mantiene más tiempo en el aire desde la misma altura?',
          },
          grownUps: [
            'Estos modelos no se han probado en este libro. No tomes como resultado ningún tiempo de caída ni distancia del capítulo. Para llevar un registro real, usa el laboratorio de vuelo, capítulo 10.',
          ],
        },
        ru: {
          title: 'Ваши бумажные летуны',
          lead: 'Три модели этой книги заимствуют идею из этой главы.',
          body: [
            'Бумажная крылатка клёна, таблица F2, вращается при падении, как семя из первого раздела. Это классическая модель, и наша версия {{not-yet-measured}}.',
            'Бабочки, таблицы B1–B3, — экспериментальные планёры с крыльями монарха, морфо и махаона. Они планируют, а не машут. Это {{concept}}, пока записанное лётное испытание не скажет иначе [[k2-note]].',
            'У кольцевого планёра, таблица F1, нет животного двойника, которого мы могли бы подтвердить источником. Он здесь потому, что показывает: крыло не обязано быть плоским.',
          ],
          tryIt: {
            steps: [
              'Сложите крылатку и одну бабочку.',
              'Отпустите крылатку с высоты головы. Мягко толкните бабочку вперёд.',
              'Напишите по одной фразе для каждой: вращается или планирует.',
            ],
            lookFor: 'Что дольше остаётся в воздухе с одной и той же высоты?',
          },
          grownUps: [
            'Эти модели в книге не испытаны. Не принимайте время падения или дальность из главы за результат. Чтобы вести настоящую запись, используйте лётную лабораторию, глава 10.',
          ],
        },
      },
    },
  ],
  references: [
    // Seeds
    { id: 'wang-2024', label: 'Wang et al., “Alasemenia, the earliest ovule with three wings and without cupule”, eLife (2024), doi:10.7554/eLife.92962 (Late Devonian, Famennian; called the second-earliest winged seed)', url: 'https://doi.org/10.7554/eLife.92962', reuse: 'cite', checked: '2026-11-25' },
    { id: 'rowe-1997', label: 'Rowe, “Warsteinia paprothii: an Upper Famennian winged preovule”, Palaeontology 40 (1997) 575–595 (earliest winged plant diaspore)', url: 'https://www.palass.org/publications/palaeontology-journal/archive/40/2/article_pp575-595', reuse: 'cite', checked: '2026-11-25' },
    { id: 'lentink-2009', label: 'Lentink, Dickson, van Leeuwen and Dickinson, “Leading-edge vortices elevate lift of autorotating plant seeds”, Science 324 (2009) 1438–1440, doi:10.1126/science.1174196', url: 'https://doi.org/10.1126/science.1174196', reuse: 'cite', checked: '2026-11-25' },
    { id: 'caltech-maple', label: 'Caltech, “Maple seeds and animals exploit same trick to fly” (the vortex doubles the lift)', url: 'https://www.caltech.edu/news/maple-seeds-and-animals-exploit-same-trick-fly-1540', reuse: 'cite', checked: '2026-11-25' },
    { id: 'cummins-2018', label: 'Cummins et al., “A separated vortex ring underlies the flight of the dandelion”, Nature 562 (2018) 414–418, doi:10.1038/s41586-018-0604-2 (about 100 filaments; porosity 0.916; more than four times the drag per unit area of a solid disc)', url: 'https://doi.org/10.1038/s41586-018-0604-2', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-seed', label: 'Guinness World Records, “Largest seeds, winged seeds” (Alsomitra macrocarpa, 13 cm wingspan)', url: 'https://www.guinnessworldrecords.com/world-records/86919-largest-seeds-winged-seeds', reuse: 'cite', checked: '2026-11-25' },
    // Insects
    { id: 'stanford-insects', label: 'Stanford News, “Insects took off when they evolved wings” (2018)', url: 'https://news.stanford.edu/2018/01/23/insects-took-off-evolved-wings/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'misof-2014', label: 'Misof et al., “Phylogenomics resolves the timing and pattern of insect evolution”, Science 346 (2014) 763–767, doi:10.1126/science.1257570 (origin of insect flight about 406 million years ago)', url: 'https://doi.org/10.1126/science.1257570', reuse: 'cite', checked: '2026-11-25' },
    { id: 'engel-2004', label: 'Engel and Grimaldi, “New light shed on the oldest insect”, Nature 427 (2004) 627–630, doi:10.1038/nature02291 (Rhyniognatha)', url: 'https://doi.org/10.1038/nature02291', reuse: 'cite', checked: '2026-11-25' },
    { id: 'haug-2017', label: 'Haug and Haug, “The presumed oldest flying insect: more likely a myriapod?”, PeerJ 5 (2017) e3402, doi:10.7717/peerj.3402', url: 'https://doi.org/10.7717/peerj.3402', reuse: 'cite', checked: '2026-11-25' },
    { id: 'ku-2012', label: 'University of Kansas, “Insect fossil from Devonian may shed light on birth of insect flight” (2012)', url: 'https://news.ku.edu/2012/08/02/insect-fossil-devonian-may-shed-light-birth-insect-flight', reuse: 'cite', checked: '2026-11-25' },
    { id: 'hornschemeyer-2013', label: 'Hörnschemeyer et al., “Is Strudiella a Devonian insect?”, Nature 494 (2013) E3–E4, doi:10.1038/nature11887', url: 'https://doi.org/10.1038/nature11887', reuse: 'cite', checked: '2026-11-25' },
    { id: 'clark-hachtel-2016', label: 'Clark-Hachtel and Tomoyasu, “Exploring the origin of insect wings from an evo-devo perspective”, Current Opinion in Insect Science 13 (2016) 77–85, doi:10.1016/j.cois.2015.12.005', url: 'https://doi.org/10.1016/j.cois.2015.12.005', reuse: 'cite', checked: '2026-11-25' },
    { id: 'linz-2018', label: 'Linz and Tomoyasu, “Dual evolutionary origin of insect wings supported by an investigation of the abdominal wing serial homologs in Tribolium”, PNAS 115 (2018) E658–E667, doi:10.1073/pnas.1711128115', url: 'https://doi.org/10.1073/pnas.1711128115', reuse: 'cite', checked: '2026-11-25' },
    { id: 'clark-hachtel-2020', label: 'Clark-Hachtel and Tomoyasu, “Two sets of candidate crustacean wing homologues and their implication for the origin of insect wings”, Nature Ecology & Evolution 4 (2020) 1694–1702, doi:10.1038/s41559-020-1257-8', url: 'https://doi.org/10.1038/s41559-020-1257-8', reuse: 'cite', checked: '2026-11-25' },
    { id: 'bruce-2020', label: 'Bruce and Patel, “Knockout of crustacean leg patterning genes suggests that insect wings and body walls evolved from ancient leg segments”, Nature Ecology & Evolution 4 (2020) 1703–1712, doi:10.1038/s41559-020-01349-0', url: 'https://doi.org/10.1038/s41559-020-01349-0', reuse: 'cite', checked: '2026-11-25' },
    // Griffinflies
    { id: 'nhm-griffinflies', label: 'Natural History Museum, London, “Giant dragonflies” (wingspans up to 71 cm; no aerial predators)', url: 'https://www.nhm.ac.uk/discover/giant-dragonflies.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'conversation-griffinflies', label: 'Garrouste and Nel (Muséum national d’Histoire naturelle), “Are the Paleozoic era’s giant dragonflies still among us?”, The Conversation (2018) (Meganeura, 70 cm wingspan, 300 million years ago)', url: 'https://theconversation.com/are-the-paleozoic-eras-giant-dragonflies-still-among-us-102384', reuse: 'cite', checked: '2026-11-25' },
    { id: 'kgs-insects', label: 'Kansas Geological Survey, GeoKansas, “Insects” (Meganeuropsis, wingspan of 29 inches)', url: 'https://geokansas.ku.edu/insects', reuse: 'cite', checked: '2026-11-25' },
    { id: 'graham-1995', label: 'Graham, Dudley, Aguilar and Gans, “Implications of the late Palaeozoic oxygen pulse for physiology and evolution”, Nature 375 (1995) 117–120, doi:10.1038/375117a0 (oxygen perhaps up to 35 %)', url: 'https://doi.org/10.1038/375117a0', reuse: 'cite', checked: '2026-11-25' },
    { id: 'clapham-2012', label: 'Clapham and Karr, “Environmental and biotic controls on the evolutionary history of insect body size”, PNAS 109 (2012) 10927–10930, doi:10.1073/pnas.1204026109', url: 'https://doi.org/10.1073/pnas.1204026109', reuse: 'cite', checked: '2026-11-25' },
    { id: 'harrison-2010', label: 'Harrison, Kaiser and VandenBrooks, “Atmospheric oxygen level and the evolution of insect body size”, Proc. R. Soc. B 277 (2010) 1937–1946, doi:10.1098/rspb.2010.0001', url: 'https://doi.org/10.1098/rspb.2010.0001', reuse: 'cite', checked: '2026-11-25' },
    { id: 'verberk-2011', label: 'Verberk and Bilton, “Can oxygen set thermal limits in an insect and drive gigantism?”, PLoS ONE 6 (2011) e22610, doi:10.1371/journal.pone.0022610', url: 'https://doi.org/10.1371/journal.pone.0022610', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nhm-dragonfly-wings', label: 'Natural History Museum, London, “Dragonfly wings could inspire new aeroplane flight control” (2018)', url: 'https://www.nhm.ac.uk/discover/news/2018/june/dragonfly-wings-could-inspire-new-aeroplane-flight-control.html', reuse: 'cite', checked: '2026-11-25' },
    // Pterosaurs
    { id: 'nhm-pterosaurs', label: 'Natural History Museum, London, “The truth about pterosaurs”', url: 'https://nhm.ac.uk/discover/the-truth-about-pterosaurs.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nhm-triassic', label: 'Natural History Museum, London, “The Triassic period: the rise of the dinosaurs” (pterosaurs 228 million years ago)', url: 'https://www.nhm.ac.uk/discover/the-triassic-period-the-rise-of-the-dinosaurs.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nhm-ghost-ranch', label: 'Natural History Museum, Los Angeles, “Dig deeper into pterosaurs’ evolutionary flight path”', url: 'https://nhm.org/stories/dig-deeper-pterosaurs-evolutionary-flight-path', reuse: 'cite', checked: '2026-11-25' },
    { id: 'ezcurra-2020', label: 'Ezcurra et al., “Enigmatic dinosaur precursors bridge the gap to the origin of Pterosauria”, Nature 588 (2020) 445–449, doi:10.1038/s41586-020-3011-4', url: 'https://doi.org/10.1038/s41586-020-3011-4', reuse: 'cite', checked: '2026-11-25' },
    { id: 'lawson-1975', label: 'Lawson, “Pterosaur from the Latest Cretaceous of West Texas: discovery of the largest flying creature”, Science 187 (1975) 947–948, doi:10.1126/science.187.4180.947 (estimated wingspan 15.5 m)', url: 'https://doi.org/10.1126/science.187.4180.947', reuse: 'cite', checked: '2026-11-25' },
    { id: 'witton-habib-2010', label: 'Witton and Habib, “On the size and flight diversity of giant pterosaurs”, PLoS ONE 5 (2010) e13982, doi:10.1371/journal.pone.0013982 (10–11 m, 200–250 kg; quadrupedal launch)', url: 'https://doi.org/10.1371/journal.pone.0013982', reuse: 'cite', checked: '2026-11-25' },
    { id: 'habib-2008', label: 'Habib, “Comparative evidence for quadrupedal launch in pterosaurs”, Zitteliana B28 (2008) 159–166', url: 'https://epub.ub.uni-muenchen.de/12011/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'padian-2021', label: 'Padian, Cunningham, Langston and Conway, “Functional morphology of Quetzalcoatlus”, Journal of Vertebrate Paleontology 41 (2021), doi:10.1080/02724634.2020.1780247', url: 'https://doi.org/10.1080/02724634.2020.1780247', reuse: 'cite', checked: '2026-11-25' },
    // Birds
    { id: 'nhm-sinosauropteryx', label: 'Natural History Museum, London, Dino Directory, “Sinosauropteryx” (named 1996; 1.1 m; 125–122 million years ago)', url: 'https://nhm.ac.uk/discover/dino-directory/sinosauropteryx.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'xu-2012', label: 'Xu et al., “A gigantic feathered dinosaur from the Lower Cretaceous of China”, Nature 484 (2012) 92–95, doi:10.1038/nature10906 (Yutyrannus)', url: 'https://doi.org/10.1038/nature10906', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nature-yutyrannus', label: 'Nature News Blog, “Largest feathered dinosaur discovered in China” (2012) (about 9 m and 1,400 kg)', url: 'https://blogs.nature.com/blog/largest-feathered-dinosaur-discovered-in-china/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'godefroit-2014', label: 'Godefroit et al., “A Jurassic ornithischian dinosaur from Siberia with both feathers and scales”, Science 345 (2014) 451–455, doi:10.1126/science.1253351 (Kulindadromeus)', url: 'https://doi.org/10.1126/science.1253351', reuse: 'cite', checked: '2026-11-25' },
    { id: 'cincotta-2019', label: 'Cincotta et al., “The age and depositional environments of the Kulinda Konservat-Lagerstätte”, PeerJ 7 (2019) e6239, doi:10.7717/peerj.6239 (Bathonian, about 168–166 million years ago)', url: 'https://doi.org/10.7717/peerj.6239', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nhm-archaeopteryx', label: 'Natural History Museum, London, Dino Directory, “Archaeopteryx” (149–145 million years ago; magpie-sized; teeth and a long bony tail)', url: 'https://www.nhm.ac.uk/discover/dino-directory/Archaeopteryx.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nc-archaeopteryx', label: 'Voeten et al., “Wing bone geometry reveals active flight in Archaeopteryx”, Nature Communications 9 (2018) 923, doi:10.1038/s41467-018-03296-8', url: 'https://doi.org/10.1038/s41467-018-03296-8', reuse: 'cite', checked: '2026-11-25' },
    { id: 'oconnor-2025', label: 'O’Connor et al., “Chicago Archaeopteryx informs on the early evolution of the avian bauplan”, Nature 641 (2025) 1201–1207, doi:10.1038/s41586-025-08912-4 (the 14th specimen; tertial feathers)', url: 'https://doi.org/10.1038/s41586-025-08912-4', reuse: 'cite', checked: '2026-11-25' },
    { id: 'xu-2003', label: 'Xu et al., “Four-winged dinosaurs from China”, Nature 421 (2003) 335–340, doi:10.1038/nature01342 (Microraptor)', url: 'https://doi.org/10.1038/nature01342', reuse: 'cite', checked: '2026-11-25' },
    { id: 'he-2004', label: 'He et al., “Timing of the Jiufotang Formation (Jehol Group) in Liaoning, northeastern China”, Geophysical Research Letters 31 (2004), doi:10.1029/2004GL019790 (minimum age 120 million years for Microraptor)', url: 'https://doi.org/10.1029/2004GL019790', reuse: 'cite', checked: '2026-11-25' },
    // Bats
    { id: 'doi-bats', label: 'US Department of the Interior, “13 facts about bats” (over 1,400 species)', url: 'https://www.doi.gov/blog/13-facts-about-bats', reuse: 'cite', checked: '2026-11-25' },
    { id: 'si-bats', label: 'Smithsonian Institution, “Bat Facts”', url: 'https://www.si.edu/spotlight/bats/batfacts', reuse: 'cite', checked: '2026-11-25' },
    { id: 'sterbing-2011', label: 'Sterbing-D’Angelo et al., “Bat wing sensors support flight control”, PNAS 108 (2011) 11291–11296, doi:10.1073/pnas.1018740108', url: 'https://doi.org/10.1073/pnas.1018740108', reuse: 'cite', checked: '2026-11-25' },
    { id: 'brown-bat-muscles', label: 'Brown University, “Tiny muscles help bats fine-tune flight” (2014)', url: 'https://engineering.brown.edu/news/2014-05-24/tiny-muscles-help-bats-fine-tune-flight', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nhm-bats-2023', label: 'Natural History Museum, London, “Oldest bat skeletons ever found described as new species” (2023)', url: 'https://nhm.ac.uk/discover/news/2023/april/oldest-bat-skeletons-ever-found-described-new-species.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'rietbergen-2023', label: 'Rietbergen et al., “The oldest known bat skeletons and their implications for Eocene chiropteran diversification”, PLoS ONE 18 (2023) e0283505, doi:10.1371/journal.pone.0283505 (51.98 ± 0.35 million years)', url: 'https://doi.org/10.1371/journal.pone.0283505', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nature-bat-2008', label: 'Simmons, Seymour, Habersetzer and Gunnell, “Primitive Early Eocene bat from Wyoming and the evolution of flight and echolocation”, Nature 451 (2008) 818–821, doi:10.1038/nature06549', url: 'https://deepblue.lib.umich.edu/bitstream/handle/2027.42/62816/nature06549.pdf', reuse: 'cite', checked: '2026-11-25' },
    // Gliders
    { id: 'byrnes-spence-2011', label: 'Byrnes and Spence, “Ecological and biomechanical insights into the evolution of gliding in mammals”, Integrative and Comparative Biology 51 (2011) 991–1001, doi:10.1093/icb/icr069 (at least six times)', url: 'https://doi.org/10.1093/icb/icr069', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nps-squirrel', label: 'US National Park Service, “Species spotlight: flying squirrels”', url: 'https://www.nps.gov/articles/species-spotlight-flying-squirrels.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'esf-squirrel', label: 'SUNY ESF, Adirondack Ecological Center, “Southern flying squirrel”', url: 'https://www.esf.edu/aec/adks/mammals/southern_flying_squirrel.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'sciencenews-colugo', label: 'Science News, on colugo gliding (2020), citing Byrnes et al., Journal of Experimental Biology (2011), doi:10.1242/jeb.052993 (a Sunda colugo recorded gliding 145 m)', url: 'https://www.sciencenews.org/?p=3093534', reuse: 'cite', checked: '2026-11-25' },
    { id: 'adw-draco', label: 'Animal Diversity Web, University of Michigan, M. Van Arsdale, “Draco volans” (glides about 8 m on average)', url: 'https://animaldiversity.org/accounts/Draco_volans/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'socha-2002', label: 'Socha, “Gliding flight in the paradise tree snake”, Nature 418 (2002) 603–604, doi:10.1038/418603a', url: 'https://doi.org/10.1038/418603a', reuse: 'cite', checked: '2026-11-25' },
    { id: 'holden-2014', label: 'Holden, Socha, Cardwell and Vlachos, “Aerodynamics of the flying snake Chrysopelea paradisi”, Journal of Experimental Biology 217 (2014) 382–394, doi:10.1242/jeb.090902', url: 'https://doi.org/10.1242/jeb.090902', reuse: 'cite', checked: '2026-11-25' },
    { id: 'yeaton-2020', label: 'Yeaton, Ross, Baumgardner and Socha, “Undulation enables gliding in flying snakes”, Nature Physics 16 (2020) 974–982, doi:10.1038/s41567-020-0935-4', url: 'https://doi.org/10.1038/s41567-020-0935-4', reuse: 'cite', checked: '2026-11-25' },
    { id: 'socha-2010', label: 'American Institute of Physics, via ScienceDaily, “Flying snakes” (2010) (launched from a 15 m tower; up to 24 m)', url: 'https://www.sciencedaily.com/releases/2010/11/101122200555.htm', reuse: 'cite', checked: '2026-11-25' },
    // Sea gliders
    { id: 'natgeo-flyingfish', label: 'National Geographic, “Flying fish” (taxiing with the tail)', url: 'https://www.nationalgeographic.com/animals/fish/facts/flying-fish', reuse: 'cite', checked: '2026-11-25' },
    { id: 'park-choi-2010', label: 'Park and Choi, “Aerodynamic characteristics of flying fish in gliding flight”, Journal of Experimental Biology 213 (2010) 3269–3279, doi:10.1242/jeb.046052', url: 'https://doi.org/10.1242/jeb.046052', reuse: 'cite', checked: '2026-11-25' },
    { id: 'jeb-flyingfish', label: 'Journal of Experimental Biology press release, via ScienceDaily, on Park and Choi (2010) (up to 400 m at speeds of 70 km/h)', url: 'https://www.sciencedaily.com/releases/2010/09/100910082308.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'britannica-fish', label: 'Encyclopaedia Britannica, “Flying fish” (compound glides may cover 400 m)', url: 'https://www.britannica.com/animal/flying-fish', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-flyingfish', label: 'Guinness World Records, “Longest flight by a flying fish (duration)” (45 seconds, May 2008, filmed by NHK; about 30 km/h)', url: 'https://www.guinnessworldrecords.com/world-records/498196-longest-flight-by-a-flyingfish-duration', reuse: 'cite', checked: '2026-11-25' },
    { id: 'muramatsu-2013', label: 'Muramatsu et al., “Oceanic squid do fly”, Marine Biology 160 (2013) 1171–1175, doi:10.1007/s00227-013-2169-9', url: 'https://doi.org/10.1007/s00227-013-2169-9', reuse: 'cite', checked: '2026-11-25' },
    { id: 'hokudai-squid', label: 'Hokkaido University, “Squid can fly: flight behavior of the squid explained for the first time” (8.8 to 11.2 m/s)', url: 'https://www.global.hokudai.ac.jp/blog/squid-can-fly-flight-behavior-of-the-squid-explained-for-the-first-time/index.htm', reuse: 'cite', checked: '2026-11-25' },
    // Records
    { id: 'egevang-2010', label: 'Egevang et al., “Tracking of Arctic terns Sterna paradisaea reveals longest animal migration”, PNAS 107 (2010) 2078–2081, doi:10.1073/pnas.0909493107 (more than 80,000 km a year for some birds)', url: 'https://doi.org/10.1073/pnas.0909493107', reuse: 'cite', checked: '2026-11-25' },
    { id: 'fijn-2013', label: 'Fijn et al., “Arctic terns Sterna paradisaea from the Netherlands migrate record distances across three oceans to Wilkes Land, East Antarctica”, Ardea 101 (2013) 3–12, doi:10.5253/078.101.0102 (90,000 ± 2,000 km)', url: 'https://doi.org/10.5253/078.101.0102', reuse: 'cite', checked: '2026-11-25' },
    { id: 'natgeo-tern', label: 'National Geographic, “World’s longest migration found: 2X longer than thought” (2010) (about 71,000 km a year; about 2.4 million km in a lifetime)', url: 'https://www.nationalgeographic.com/animals/article/100111-worlds-longest-migration-arctic-tern-bird', reuse: 'cite', checked: '2026-11-25' },
    { id: 'bas-tern', label: 'British Antarctic Survey, via Phys.org, “Arctic terns: longest animal migration” (2010) (three trips to the Moon and back over a lifetime)', url: 'https://phys.org/news/2010-01-arctic-terns-longest-animal-migration.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'gill-2009', label: 'Gill et al., “Extreme endurance flights by landbirds crossing the Pacific Ocean: ecological corridor rather than barrier?”, Proc. R. Soc. B 276 (2009) 447–457, doi:10.1098/rspb.2008.1142 (non-stop 8,117–11,680 km)', url: 'https://doi.org/10.1098/rspb.2008.1142', reuse: 'cite', checked: '2026-11-25' },
    { id: 'sciencenews-e7', label: 'Science News, “Avian airlines: Alaska to New Zealand nonstop” (2008) (E7, 11,680 km, more than eight days)', url: 'https://www.sciencenews.org/article/avian-airlines-alaska-new-zealand-nonstop', reuse: 'cite', checked: '2026-11-25' },
    { id: 'guinness-godwit', label: 'Guinness World Records, “Longest non-stop migration by a bird” (tag 234684, 13,560 km, 11 days 1 hour, October 2022)', url: 'https://www.guinnessworldrecords.com/world-records/86385-longest-non-stop-migration-by-a-bird', reuse: 'cite', checked: '2026-11-25' },
    { id: 'cbc-godwit', label: 'CBC News, on the 2022 godwit record flight (2022)', url: 'https://www.cbc.ca/news/science/godwit-migration-alaska-tasmania-record-1.6632658', reuse: 'cite', checked: '2026-11-25' },
    // Albatross
    { id: 'guinness-albatross', label: 'Guinness World Records, “Largest wingspan of any living species of bird” (wandering albatross, 3.63 m, 1965)', url: 'https://www.guinnessworldrecords.com/world-records/69469-largest-wingspan-of-any-living-species-of-bird', reuse: 'cite', checked: '2026-11-25' },
    { id: 'whoi-albatross', label: 'Woods Hole Oceanographic Institution, “New research unlocks clues about the iconic flight of the wandering albatross” (2022) (wind layers; shoulder lock)', url: 'https://www.whoi.edu/press-room/news-release/new-research-unlocks-clues-about-the-iconic-flight-of-the-wandering-albatross', reuse: 'cite', checked: '2026-11-25' },
    { id: 'sachs-2012', label: 'Sachs et al., “Flying at no mechanical energy cost: disclosing the secret of wandering albatrosses”, PLoS ONE 7 (2012) e41449, doi:10.1371/journal.pone.0041449', url: 'https://doi.org/10.1371/journal.pone.0041449', reuse: 'cite', checked: '2026-11-25' },
    { id: 'weimerskirch-2000', label: 'Weimerskirch et al., “Fast and fuel efficient? Optimal use of wind by flying albatrosses”, Proc. R. Soc. B 267 (2000) 1869–1874, doi:10.1098/rspb.2000.1223', url: 'https://doi.org/10.1098/rspb.2000.1223', reuse: 'cite', checked: '2026-11-25' },
    { id: 'croxall-2005', label: 'Croxall et al., “Global circumnavigations: tracking year-round ranges of nonbreeding albatrosses”, Science 307 (2005) 249–250, doi:10.1126/science.1106042 (the fastest in 46 days)', url: 'https://doi.org/10.1126/science.1106042', reuse: 'cite', checked: '2026-11-25' },
    // Butterflies
    { id: 'usfs-monarch', label: 'US Forest Service, “Monarch butterfly migration and overwintering” (some fly as far as 3,000 miles)', url: 'https://www.fs.usda.gov/wildflowers/pollinators/Monarch_Butterfly/migration/index.shtml', reuse: 'cite', checked: '2026-11-25' },
    { id: 'fws-monarch', label: 'US Fish and Wildlife Service, “Phenomenal monarch migration” (the super generation lives up to eight months)', url: 'https://www.fws.gov/story/phenomenal-monarch-migration', reuse: 'cite', checked: '2026-11-25' },
    { id: 'srygley-2002', label: 'Srygley and Thomas, “Unconventional lift-generating mechanisms in free-flying butterflies”, Nature 420 (2002) 660–664, doi:10.1038/nature01223', url: 'https://doi.org/10.1038/nature01223', reuse: 'cite', checked: '2026-11-25' },
    { id: 'johansson-2021', label: 'Johansson and Henningsson, “Butterflies fly using efficient propulsive clap mechanism owing to flexible wings”, J. R. Soc. Interface 18 (2021) 20200854, doi:10.1098/rsif.2020.0854; Lund University release (22 % more impulse, 28 % better efficiency)', url: 'https://www.biology.lu.se/article/butterfly-wing-clap-explains-mystery-flight', reuse: 'cite', checked: '2026-11-25' },
    { id: 'weis-fogh-1973', label: 'Weis-Fogh, “Quick estimates of flight fitness in hovering animals, including novel mechanisms for lift production”, Journal of Experimental Biology 59 (1973) 169–230, doi:10.1242/jeb.59.1.169', url: 'https://doi.org/10.1242/jeb.59.1.169', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-gliders', label: 'NASA Glenn Research Center, “Gliders”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/gliders/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'ucmp-thrust', label: 'UC Museum of Paleontology, Berkeley, “How does a bird generate thrust?”', url: 'https://ucmp.berkeley.edu/education/explorations/reslab/flight/function/F3.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'utm-monarch', label: 'University of Toronto Mississauga, monarch butterfly flight behaviour pages', url: 'https://utm.utoronto.ca/~w3gibo/flight_behavior_iii.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'k2-note', label: 'Open Flight, “K2 costa butterfly: why K1 does not fly and what changes”, research note, 25 November 2026 (docs/research/butterfly-k2-airframe.md in the source)', url: null, reuse: 'own-cc-by-sa-4.0', checked: '2026-11-25' },
    // Copied from nature
    { id: 'olm-lilienthal', label: 'Otto-Lilienthal-Museum Anklam, audio guide, “Bird flight” (gulls, herons and storks; Der Vogelflug als Grundlage der Fliegekunst, Berlin 1889)', url: 'https://www.museum.de/public/de/audioguide/56/6/EN/0', reuse: 'cite', checked: '2026-11-25' },
    { id: 'smithsonian-wright-warp', label: 'Smithsonian Education, “The Wright brothers: wing warping” (Wilbur Wright on buzzards, letter to Octave Chanute, 13 May 1900)', url: 'https://smithsonianeducation.org/educators/lesson_plans/wright/wing_warping.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'historynet-taube', label: 'Jon Guttman, “Inspired by a seed, an Austrian designer developed a family of airplanes, and the first warplanes”, HistoryNet (Ahlborn 1897; glider 1904 and 2 October 1906; Taube tests from 10 April 1910)', url: 'https://historynet.com/etrich-taube-wwi-planes/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'olm-zanonia', label: 'Otto-Lilienthal-Museum, object record, Zanonia (Alsomitra) seed (model for the Etrich Taube; Ahlborn’s paper dated 1896 here)', url: 'https://meckpomm.museum-digital.de/object/25', reuse: 'cite', checked: '2026-11-25' },
    { id: 'monash-etrich', label: 'Monash University, Hargrave pages, “Igo Etrich (1879–1967): the seed of an idea”', url: 'https://ctie.monash.edu/hargrave/etrich.html', reuse: 'cite', checked: '2026-11-25' },
    { id: 'lockheed-samarai', label: 'Lockheed Martin, “Lockheed Martin unveils Samarai flyer at unmanned vehicle conference” (16 August 2011)', url: 'https://news.lockheedmartin.com/2011-08-16-Lockheed-Martin-Unveils-Samarai-Flyer-at-Unmanned-Vehicle-Conference', reuse: 'cite', checked: '2026-11-25' },
    { id: 'kim-2021', label: 'Kim et al., “Three-dimensional electronic microfliers inspired by wind-dispersed seeds”, Nature 597 (2021) 503–510, doi:10.1038/s41586-021-03847-y; Northwestern University release (the size of a grain of sand)', url: 'https://news.northwestern.edu/stories/2021/september/microflier-winged-microchip-is-smallest-ever-human-made-flying-structure/', reuse: 'cite', checked: '2026-11-25' },
    { id: 'iyer-2022', label: 'Iyer et al., “Wind dispersal of battery-free wireless devices”, Nature 603 (2022) 427–433, doi:10.1038/s41586-021-04363-9; University of Washington release via ScienceDaily (up to 100 m in a moderate breeze)', url: 'https://www.sciencedaily.com/releases/2022/03/220316120838.htm', reuse: 'cite', checked: '2026-11-25' },
    { id: 'batbot-2017', label: 'Ramezani, Chung and Hutchinson, “A biomimetic robotic platform to study flight specializations of bats”, Science Robotics 2 (2017) eaal2505, doi:10.1126/scirobotics.aal2505; University of Illinois release (93 g)', url: 'https://ece.illinois.edu/news/3716', reuse: 'cite', checked: '2026-11-25' },
    { id: 'delfly-2018', label: 'Karásek et al., “A tailless aerial robotic flapper reveals that flies use torque coupling in rapid banked turns”, Science 361 (2018) 1089–1094, doi:10.1126/science.aat0350', url: 'https://doi.org/10.1126/science.aat0350', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-whitcomb', label: 'NASA Langley Research Center, “Richard T. Whitcomb” (winglets inspired by the wing tips of soaring birds)', url: 'https://www.nasa.gov/centers-and-facilities/langley/richard-t-whitcomb/', reuse: 'cite', checked: '2026-11-25' },
  ],
}

export default chapter
