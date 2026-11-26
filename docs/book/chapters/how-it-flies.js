// Chapter 2 · How flight works. One source for the chapter page (/how-it-flies/)
// and the book (One Sheet; spreads in packages/one-sheet/flatplan.json).
//
// Contract (read by render-chapter.js, the book templates and tests/one-sheet.test.js):
// - `text[lang]` holds every string a reader sees, in en, es and ru with the same keys.
// - Voices: `lead` and `tryIt` use the making voice (short, verb first, read aloud with a
//   child). `body` explains for co-reading. `grownUps` (key name kept for now) is the
//   go-deeper voice for any age: calm, specific and sourced.
// - `[[id]]` is a numbered note to `references`. `{{state}}` is an evidence chip
//   (estimate, not-yet-measured, measured, concept, render, photograph).
// - No exclamation marks. Spanish uses tú. Russian uses вы.
// - Facts checked on `asOf`. Spanish and Russian are drafts for a native editor (`review`).
const chapter = {
  id: 'how-it-flies',
  asOf: '2026-11-25',
  review: { en: 'editorial-draft', es: 'needs-native-review', ru: 'needs-native-review' },
  opener: {
    figure: 'forces',
    text: {
      en: {
        intro: 'A paper plane has no engine. It falls, but it falls forwards, along a gentle slope of air. In this chapter you will find out what holds it up, what keeps it straight, and which small bends of paper change its path.',
        grownUps: 'Each spread pairs a read-aloud story with a deeper box of numbers. The physics follows NASA Glenn’s Beginner’s Guide to Aeronautics. Numbers for this book’s designs are estimates until a recorded trial replaces them.',
        caption: 'The four forces on a paper glider. Diagram, not to scale.',
      },
      es: {
        intro: 'Un avión de papel no tiene motor. Cae, pero cae hacia delante, por una suave pendiente de aire. En este capítulo verás qué lo sostiene, qué lo mantiene recto y qué pequeños dobleces de papel cambian su rumbo.',
        grownUps: 'Cada doble página combina un texto para leer en voz alta y un recuadro con cifras para saber más. La física sigue la Beginner’s Guide to Aeronautics de NASA Glenn. Las cifras de nuestros diseños son estimaciones hasta que una prueba registrada las sustituya.',
        caption: 'Las cuatro fuerzas sobre un planeador de papel. Esquema, no a escala.',
      },
      ru: {
        intro: 'У бумажного самолёта нет мотора. Он падает, но падает вперёд, по пологому склону из воздуха. В этой главе вы узнаете, что его держит, что ведёт его прямо и какие маленькие изгибы бумаги меняют его путь.',
        grownUps: 'Каждый разворот сочетает текст для чтения вслух и рамку с цифрами для тех, кто хочет глубже. Физика изложена по Beginner’s Guide to Aeronautics центра NASA Glenn. Цифры для моделей этой книги — оценки, пока их не заменит записанное испытание.',
        caption: 'Четыре силы, действующие на бумажный планер. Схема, не в масштабе.',
      },
    },
  },
  sections: [
    {
      id: 'four-forces',
      kind: 'explainer',
      figure: 'forces',
      text: {
        en: {
          title: 'Four forces, and an engine called gravity',
          lead: 'Four pushes and pulls act on every plane. Once a paper plane leaves your hand, it has only three of them.',
          body: [
            'Weight pulls the plane down. It is gravity acting on every bit of paper, and it never stops. Lift pushes the wings up, but a wing makes lift only while it moves through the air. Drag pulls back against the motion, like the air you feel when you wave your hand fast. Thrust pushes forwards. A big plane gets its thrust from engines.',
            'A paper plane gets thrust only from your arm, and only for a moment. After you let go, it has weight, lift and drag. So how does it keep moving forwards? It goes slightly downhill. Think of a ball rolling down a long, gentle slope: gravity keeps it rolling. A glider does the same in the air. It gives up a little height every second and turns that height into speed. Gravity is its engine.',
            'In a steady glide the three forces cancel out. Lift and drag together hold up exactly the weight, so the speed stays the same while the plane slides down its invisible slope. When something changes, such as a gust or a bent wing, the forces stop cancelling. The plane speeds up, slows down or turns until they balance again.',
            'Drag comes in three kinds that matter to a paper plane. Skin friction is the air rubbing along the paper. Form drag is the air shoved aside by the plane’s shape, so thick folds and a blunt nose cost more. Induced drag is the price of lift: air curls round each wingtip in a tiny whirlwind, and that swirl tugs the plane back.',
            'That is why a good glide looks so calm. Nothing is pushing the plane. It is falling forwards, slowly, and the shape of its wings decides how steep the slope is.',
          ],
          caption: 'The forces on a paper glider in a steady glide. Lift acts across the flight path, drag along it and weight straight down. Thrust acts only during the throw. Diagram, not to scale.',
          tryIt: {
            steps: [
              'Take two sheets of the same paper.',
              'Crumple one into a ball. Keep the other flat.',
              'Hold them at the same height and let go together.',
              'Fold the flat one into a plane and launch it gently.',
            ],
            lookFor: 'The weight is the same each time. What changes is the drag and the lift.',
          },
          grownUps: [
            'An A4 sheet of 80 g/m² paper has a mass of 5.0 g, about a teaspoon of water. Its weight is about 0.05 newtons.',
            'In a steady glide, lift and drag add up to exactly that weight. Their ratio sets the slope: if the lift were five times the drag, the plane would travel 5 m forwards for every metre it sinks, a glide angle of about 11°. NASA Glenn’s guide describes the forces on a glider in the same terms [[nasa-gliders]] [[nasa-forces]].',
            'NASA Glenn lists four sources of drag: skin friction, form drag, induced drag from the wingtip vortices, and wave drag from shock waves near the speed of sound [[nasa-drag]]. A paper plane never meets the fourth.',
          ],
        },
        es: {
          title: 'Cuatro fuerzas y un motor llamado gravedad',
          lead: 'Actúan cuatro empujes y tirones sobre todo avión. Cuando un avión de papel deja tu mano, solo le quedan tres.',
          body: [
            'El peso tira del avión hacia abajo. Es la gravedad actuando sobre cada trocito de papel, y nunca se detiene. La sustentación empuja las alas hacia arriba, pero un ala solo la produce mientras se mueve por el aire. La resistencia tira hacia atrás, como el aire que notas al agitar rápido la mano. El empuje impulsa hacia delante. Un avión grande lo obtiene de sus motores.',
            'Un avión de papel solo recibe empuje de tu brazo, y solo un instante. Al soltarlo, le quedan el peso, la sustentación y la resistencia. ¿Cómo sigue avanzando, entonces? Va un poco cuesta abajo. Piensa en una pelota que rueda por una pendiente larga y suave: la gravedad la mantiene rodando. Un planeador hace lo mismo en el aire. Cede un poco de altura cada segundo y la convierte en velocidad. La gravedad es su motor.',
            'En un planeo estable, las tres fuerzas se anulan. La sustentación y la resistencia juntas sostienen justo el peso, así que la velocidad no cambia mientras el avión baja por su pendiente invisible. Si algo cambia, como una ráfaga o un ala doblada, las fuerzas dejan de anularse. El avión acelera, frena o gira hasta que vuelven a equilibrarse.',
            'Para un avión de papel importan tres tipos de resistencia. La fricción es el aire que roza el papel. La resistencia de forma es el aire que la figura del avión aparta, así que los pliegues gruesos y un morro romo cuestan más. La resistencia inducida es el precio de la sustentación: el aire se enrosca en cada punta del ala en un pequeño torbellino, y ese remolino frena el avión.',
            'Por eso un buen planeo parece tan tranquilo. Nada empuja el avión. Cae hacia delante, despacio, y la forma de sus alas decide lo empinada que es la pendiente.',
          ],
          caption: 'Fuerzas sobre un planeador de papel en planeo estable. La sustentación actúa perpendicular a la trayectoria, la resistencia a lo largo y el peso hacia abajo. El empuje solo actúa al lanzar. Esquema, no a escala.',
          tryIt: {
            steps: [
              'Toma dos hojas del mismo papel.',
              'Arruga una hasta hacer una bola. Deja la otra plana.',
              'Sostenlas a la misma altura y suéltalas a la vez.',
              'Dobla la plana en un avión y lánzalo con suavidad.',
            ],
            lookFor: 'El peso es siempre el mismo. Lo que cambia es la resistencia y la sustentación.',
          },
          grownUps: [
            'Una hoja A4 de 80 g/m² tiene una masa de 5,0 g, como una cucharadita de agua. Su peso es de unos 0,05 newtons.',
            'En un planeo estable, la sustentación y la resistencia suman exactamente ese peso. Su cociente fija la pendiente: si la sustentación fuera cinco veces la resistencia, el avión avanzaría 5 m por cada metro que baja, un ángulo de planeo de unos 11°. La guía de NASA Glenn describe así las fuerzas sobre un planeador [[nasa-gliders]] [[nasa-forces]].',
            'NASA Glenn enumera cuatro fuentes de resistencia: fricción, resistencia de forma, resistencia inducida por los vórtices de punta de ala y resistencia de onda, por las ondas de choque cerca de la velocidad del sonido [[nasa-drag]]. Un avión de papel nunca llega a la cuarta.',
          ],
        },
        ru: {
          title: 'Четыре силы и мотор по имени гравитация',
          lead: 'На каждый самолёт действуют четыре силы. Когда бумажный самолёт покидает вашу руку, остаются только три.',
          body: [
            'Вес тянет самолёт вниз. Это гравитация, которая действует на каждый кусочек бумаги и никогда не исчезает. Подъёмная сила толкает крылья вверх, но крыло создаёт её, только пока движется в воздухе. Сопротивление тянет назад, как воздух, который вы чувствуете, быстро махнув рукой. Тяга толкает вперёд. Большой самолёт получает тягу от двигателей.',
            'Бумажный самолёт получает тягу только от вашей руки, и лишь на миг. После броска у него есть вес, подъёмная сила и сопротивление. Как же он движется вперёд? Он слегка спускается под горку. Представьте мяч на длинном пологом склоне: гравитация не даёт ему остановиться. Планер делает то же в воздухе. Каждую секунду он теряет немного высоты и превращает её в скорость. Гравитация — его мотор.',
            'В ровном планировании три силы уравновешивают друг друга. Подъёмная сила и сопротивление вместе точно удерживают вес, поэтому скорость не меняется, пока самолёт скользит по невидимому склону. Если что-то меняется, например порыв ветра или погнутое крыло, равновесие нарушается. Самолёт ускоряется, замедляется или поворачивает, пока силы снова не уравновесятся.',
            'Для бумажного самолёта важны три вида сопротивления. Трение — это воздух, который трётся о бумагу. Сопротивление формы — воздух, который раздвигает сам самолёт, поэтому толстые сгибы и тупой нос обходятся дороже. Индуктивное сопротивление — цена подъёмной силы: у каждой законцовки крыла воздух закручивается в крошечный вихрь, и этот вихрь тянет самолёт назад.',
            'Вот почему хорошее планирование выглядит таким спокойным. Самолёт никто не толкает. Он медленно падает вперёд, а форма крыльев решает, насколько крут склон.',
          ],
          caption: 'Силы на бумажном планере в ровном планировании. Подъёмная сила направлена поперёк траектории, сопротивление — вдоль, вес — вниз. Тяга действует только при броске. Схема, не в масштабе.',
          tryIt: {
            steps: [
              'Возьмите два листа одной и той же бумаги.',
              'Скомкайте один в шарик. Другой оставьте ровным.',
              'Держите их на одной высоте и отпустите одновременно.',
              'Сложите ровный лист в самолёт и мягко запустите его.',
            ],
            lookFor: 'Вес каждый раз один и тот же. Меняются сопротивление и подъёмная сила.',
          },
          grownUps: [
            'Лист A4 бумаги 80 г/м² имеет массу 5,0 г, примерно как чайная ложка воды. Его вес около 0,05 ньютона.',
            'В ровном планировании подъёмная сила и сопротивление в сумме точно уравновешивают этот вес. Их отношение задаёт наклон: если подъёмная сила в пять раз больше сопротивления, самолёт пролетит 5 м вперёд на каждый метр снижения, угол планирования около 11°. Руководство NASA Glenn описывает силы на планере так же [[nasa-gliders]] [[nasa-forces]].',
            'NASA Glenn называет четыре источника сопротивления: трение, сопротивление формы, индуктивное сопротивление от концевых вихрей и волновое сопротивление от ударных волн вблизи скорости звука [[nasa-drag]]. До четвёртого бумажный самолёт никогда не доходит.',
          ],
        },
      },
    },
    {
      id: 'lift',
      kind: 'explainer',
      figure: 'angle-of-attack',
      text: {
        en: {
          title: 'How a wing makes lift',
          lead: 'A wing pushes air down. The air pushes the wing up.',
          body: [
            'Hold a flat hand out in a strong breeze and tilt its front edge up a little. You feel your hand being lifted. That tilt is the angle of attack: the angle between the wing and the air coming towards it.',
            'A paper wing is almost flat, so the angle of attack does most of the work. The tilted wing turns the passing air slightly downwards, and the air pushes back on the wing. At the same time the pressure under the wing rises a little and the pressure above it drops. Scientists describe lift in both ways, as air being turned and as a difference in pressure. They are two descriptions of the same flow, and both are right.',
            'A curved wing, like a bird’s, turns the air more easily, so it makes the same lift at a smaller angle. Some paper folds add a gentle curve for this reason.',
            'More tilt makes more lift, up to a point. Tilt the wing too far and the air can no longer follow its top surface. It breaks away in swirls, lift falls and drag jumps. This is a stall. A stalling paper plane noses up, slows down and drops.',
            'You may read that the air over a wing must meet the air from underneath at the back edge, so it has to hurry over the longer top. Nothing makes the two meet. In fact the air over the top arrives first. Use the turning and pressure explanations instead.',
          ],
          caption: 'One flat wing at three angles of attack. At small angles the air follows both surfaces. At a large angle it breaks away from the top and the wing stalls. Diagram, not to scale.',
          tryIt: {
            steps: [
              'Cut a strip of paper 3 cm wide and 15 cm long.',
              'Hold one short end just under your lower lip, so the strip droops away from you.',
              'Blow steadily, straight out over the top of the strip.',
            ],
            lookFor: 'The strip lifts. The air follows its curve and leaves the end heading slightly down.',
          },
          grownUps: [
            'NASA Glenn’s guide explains lift as flow turning [[nasa-lift]] and shows that the pressure and flow-turning descriptions give the same force [[nasa-bernoulli]]. It calls the equal-transit story incorrect [[nasa-equal-transit]].',
            'Lift grows with wing area, air density, angle of attack until the stall, and the square of the speed. Double the speed and the same wing at the same angle makes four times the lift, which is why a hard throw makes a broad paper wing climb.',
            'A stall begins in the boundary layer, the thin skin of slowed air next to the wing. At a high angle of attack it peels away from the surface, and NASA Glenn names this flow separation as the cause of wing stall [[nasa-boundary-layer]]. In a wind tunnel at Nihon University in Japan, a card glider’s lift rose in step with its angle up to about 5° and stopped rising between 7° and 10° [[nihon-2017]].',
            'The Smithsonian’s National Air and Space Museum explains that flat paper wings make lift from their angle of attack, less efficiently than a curved wing [[nasm-flat]].',
          ],
        },
        es: {
          title: 'Cómo sustenta un ala',
          lead: 'El ala empuja el aire abajo. El aire empuja el ala arriba.',
          body: [
            'Saca la mano plana a una brisa fuerte e inclina un poco hacia arriba su borde delantero. Notarás que la mano sube. Esa inclinación es el ángulo de ataque: el ángulo entre el ala y el aire que le llega.',
            'Un ala de papel es casi plana, así que el ángulo de ataque hace casi todo el trabajo. El ala inclinada desvía el aire un poco hacia abajo, y el aire empuja de vuelta al ala. A la vez, la presión bajo el ala sube un poco y la de encima baja. Los científicos describen la sustentación de las dos formas: como aire desviado y como diferencia de presión. Son dos descripciones del mismo flujo, y ambas son correctas.',
            'Un ala curva, como la de un pájaro, desvía el aire con más facilidad, así que logra la misma sustentación con menos ángulo. Por eso algunos plegados añaden una curva suave.',
            'Más inclinación da más sustentación, hasta cierto punto. Si inclinas demasiado el ala, el aire ya no puede seguir su cara superior. Se separa en remolinos, la sustentación cae y la resistencia se dispara. Es la pérdida. Un avión de papel en pérdida levanta el morro, frena y cae.',
            'Quizá leas que el aire de arriba debe reunirse con el de abajo en el borde trasero, y por eso corre por la cara superior, más larga. Nada obliga a que se reúnan. De hecho, el aire de arriba llega antes. Usa mejor las explicaciones de desvío y presión.',
          ],
          caption: 'Un ala plana con tres ángulos de ataque. Con ángulos pequeños, el aire sigue ambas caras. Con uno grande, se separa de la cara superior y el ala entra en pérdida. Esquema, no a escala.',
          tryIt: {
            steps: [
              'Corta una tira de papel de 3 cm por 15 cm.',
              'Sujeta un extremo corto justo bajo tu labio inferior, con la tira colgando hacia delante.',
              'Sopla de forma constante, recto, por encima de la tira.',
            ],
            lookFor: 'La tira sube. El aire sigue su curva y sale por el extremo un poco hacia abajo.',
          },
          grownUps: [
            'La guía de NASA Glenn explica la sustentación como desvío del flujo [[nasa-lift]] y muestra que las descripciones por presión y por desvío dan la misma fuerza [[nasa-bernoulli]]. Califica de incorrecta la teoría del tiempo de tránsito igual [[nasa-equal-transit]].',
            'La sustentación crece con el área del ala, la densidad del aire, el ángulo de ataque hasta la pérdida y el cuadrado de la velocidad. Al doble de velocidad, la misma ala con el mismo ángulo sustenta cuatro veces más; por eso un lanzamiento fuerte hace subir un ala de papel ancha.',
            'La pérdida empieza en la capa límite, la fina piel de aire frenado junto al ala. Con un ángulo de ataque grande se despega de la superficie, y NASA Glenn señala esa separación del flujo como causa de la pérdida [[nasa-boundary-layer]]. En un túnel de viento de la Universidad Nihon (Japón), la sustentación de un planeador de cartulina creció al ritmo de su ángulo hasta unos 5° y dejó de crecer entre 7° y 10° [[nihon-2017]].',
            'El National Air and Space Museum del Smithsonian explica que las alas planas de papel sustentan por su ángulo de ataque, con menos eficiencia que un ala curva [[nasm-flat]].',
          ],
        },
        ru: {
          title: 'Как крыло создаёт подъёмную силу',
          lead: 'Крыло толкает воздух вниз. Воздух толкает крыло вверх.',
          body: [
            'Выставьте ровную ладонь на сильный ветер и чуть приподнимите её передний край. Вы почувствуете, что руку поднимает. Этот наклон — угол атаки: угол между крылом и набегающим воздухом.',
            'Бумажное крыло почти плоское, поэтому основную работу делает угол атаки. Наклонённое крыло слегка отклоняет воздух вниз, а воздух в ответ давит на крыло. Одновременно давление под крылом немного растёт, а над ним падает. Учёные описывают подъёмную силу обоими способами: как поворот потока и как разницу давлений. Это два описания одного течения, и оба верны.',
            'Изогнутое крыло, как у птицы, легче поворачивает воздух и даёт ту же подъёмную силу при меньшем угле. Поэтому некоторым бумажным крыльям придают плавный изгиб.',
            'Больший наклон даёт больше подъёмной силы, но до предела. Если наклонить крыло слишком сильно, воздух уже не обтекает его верх. Он срывается вихрями, подъёмная сила падает, а сопротивление резко растёт. Это сваливание. Сваливаясь, бумажный самолёт задирает нос, тормозит и падает.',
            'Иногда пишут, что воздух над крылом должен встретиться с воздухом снизу у задней кромки и поэтому спешит по более длинному верху. Ничто не заставляет их встречаться. На деле воздух сверху приходит раньше. Лучше объясняйте через поворот потока и давление.',
          ],
          caption: 'Одно плоское крыло при трёх углах атаки. При малых углах воздух обтекает обе поверхности. При большом он срывается с верха, и происходит сваливание. Схема, не в масштабе.',
          tryIt: {
            steps: [
              'Вырежьте полоску бумаги шириной 3 см и длиной 15 см.',
              'Держите короткий край прямо под нижней губой, чтобы полоска свисала от вас.',
              'Ровно дуйте прямо вперёд над полоской.',
            ],
            lookFor: 'Полоска поднимается. Воздух следует её изгибу и уходит с конца немного вниз.',
          },
          grownUps: [
            'Руководство NASA Glenn объясняет подъёмную силу поворотом потока [[nasa-lift]] и показывает, что описания через давление и через поворот потока дают одну и ту же силу [[nasa-bernoulli]]. Теорию «равного времени прохождения» оно называет неверной [[nasa-equal-transit]].',
            'Подъёмная сила растёт с площадью крыла, плотностью воздуха, углом атаки (до сваливания) и квадратом скорости. При вдвое большей скорости то же крыло под тем же углом даёт вчетверо больше подъёмной силы, поэтому после сильного броска широкое бумажное крыло набирает высоту.',
            'Сваливание начинается в пограничном слое — тонкой «коже» заторможенного воздуха у крыла. При большом угле атаки он отрывается от поверхности, и NASA Glenn называет этот отрыв потока причиной сваливания [[nasa-boundary-layer]]. В аэродинамической трубе Университета Нихон (Япония) подъёмная сила планера из плотной бумаги росла вместе с углом примерно до 5° и переставала расти между 7° и 10° [[nihon-2017]].',
            'National Air and Space Museum Смитсоновского института объясняет, что плоские бумажные крылья создают подъёмную силу за счёт угла атаки, менее эффективно, чем изогнутое крыло [[nasm-flat]].',
          ],
        },
      },
    },
    {
      id: 'balance',
      kind: 'explainer',
      figure: 'balance',
      text: {
        en: {
          title: 'Balance: where the weight sits',
          lead: 'Balance your plane on one finger. That spot is its balance point, and it decides how the plane flies.',
          body: [
            'Every plane has a balance point, which scientists call the centre of gravity. It is the place where the plane balances on a fingertip with its nose and tail level. The plane’s whole weight acts as if it were gathered there.',
            'The wings have a point of their own. The push of the air acts as if gathered at one place, the centre of pressure. It is slippery: it slides back and forth as the angle of attack changes. So engineers use a steadier point instead. When the angle of attack changes, the extra lift acts at the neutral point. On a flat wing it sits about a quarter of the way back from the front edge, and a tail moves it further back.',
            'A plane flies steadily only when its balance point is ahead of its neutral point. Then, if a gust lifts the nose, the extra lift pushes behind the balance point and swings the nose back down. If the balance point is behind the neutral point, the extra lift swings the nose further up. The plane swoops, stalls or tumbles.',
            'That is why so many paper planes wear a paper clip on the nose. The clip is weight in front, so it moves the balance point forwards. Too much weight in front is a problem too: the plane dives, unless you bend the back edges up to hold the nose level.',
            'Researchers at New York University tested thin plates with their weight in different places. The plates glided steadily when the weight sat roughly halfway between the middle and the front edge. With the weight further back they tumbled, and further forwards they dived.',
          ],
          caption: 'Side view of a paper plane. The balance point sits ahead of the neutral point, so a nose-up gust is pushed back down. A clip on the nose moves the balance point forwards. Diagram, not to scale.',
          tryIt: {
            steps: [
              'Rest your folded plane on one fingertip, under the body.',
              'Move your finger until the plane stays level. Mark the spot with a pencil.',
              'Slide a paper clip onto the nose and find the balance point again.',
              'Measure how far the mark moved, in millimetres.',
            ],
            lookFor: 'Which way did the balance point move?',
          },
          grownUps: [
            'NASA Glenn defines the centre of gravity as the average location of an object’s weight, found where it balances, and notes that an aircraft in flight rotates about it [[nasa-cg]]. It defines the centre of pressure as the average location of the air’s pressure, which moves as the angle of attack changes; engineers therefore apply the forces at the aerodynamic centre, a steadier point near the quarter-chord point (a quarter of the way back from the front edge) [[nasa-cp]].',
            'A clip moves the balance point by its mass times its distance from the old balance point, divided by the new total mass. A 0.5 g clip set 100 mm ahead of the balance point of a 5 g plane moves it about 9 mm forwards {{estimate}}.',
            'The gap between the balance point and the neutral point, as a share of the wing’s average depth, is the static margin. Our model gives the paper butterflies in Chapter 5 a margin of 10–14% {{estimate}}. The thin-plate experiments are reported by Li and colleagues [[li-2022]] and summarised by the US National Science Foundation [[nsf-gliders]].',
          ],
        },
        es: {
          title: 'Equilibrio: dónde está el peso',
          lead: 'Equilibra tu avión sobre un dedo. Ese lugar es su punto de equilibrio, y decide cómo vuela.',
          body: [
            'Todo avión tiene un punto de equilibrio, que los científicos llaman centro de gravedad. Es el lugar donde el avión se sostiene sobre la punta de un dedo con el morro y la cola nivelados. Todo su peso actúa como si estuviera reunido allí.',
            'Las alas tienen su propio punto. El empuje del aire actúa como si estuviera reunido en un lugar, el centro de presiones. Es escurridizo: se desliza adelante y atrás cuando cambia el ángulo de ataque. Por eso los ingenieros usan un punto más estable. Cuando cambia el ángulo de ataque, la sustentación extra actúa en el punto neutro. En un ala plana está a un cuarto de su profundidad desde el borde delantero, y una cola lo lleva más atrás.',
            'Un avión vuela estable solo si su punto de equilibrio está delante del punto neutro. Así, si una ráfaga levanta el morro, la sustentación extra empuja detrás del punto de equilibrio y vuelve a bajar el morro. Si el punto de equilibrio está detrás del punto neutro, la sustentación extra sube aún más el morro. El avión se encabrita, entra en pérdida o da tumbos.',
            'Por eso tantos aviones de papel llevan un clip en el morro. El clip es peso delante, así que adelanta el punto de equilibrio. Demasiado peso delante también es un problema: el avión cae en picado, salvo que dobles hacia arriba los bordes traseros para mantener el morro nivelado.',
            'Investigadores de la Universidad de Nueva York probaron placas finas con el peso en distintos lugares. Planeaban estables cuando el peso estaba más o menos a medio camino entre el centro y el borde delantero. Con el peso más atrás daban tumbos, y más adelante caían en picado.',
          ],
          caption: 'Avión de papel visto de lado. El punto de equilibrio está delante del punto neutro, así que si una ráfaga levanta el morro, este vuelve a bajar. Un clip en el morro adelanta el punto de equilibrio. Esquema, no a escala.',
          tryIt: {
            steps: [
              'Apoya tu avión doblado en la punta de un dedo, bajo el cuerpo.',
              'Mueve el dedo hasta que el avión quede nivelado. Marca el lugar con un lápiz.',
              'Pon un clip en el morro y busca de nuevo el punto de equilibrio.',
              'Mide cuánto se movió la marca, en milímetros.',
            ],
            lookFor: '¿Hacia dónde se movió el punto de equilibrio?',
          },
          grownUps: [
            'NASA Glenn define el centro de gravedad como la posición media del peso de un objeto, el punto donde se equilibra, y señala que un avión en vuelo gira en torno a él [[nasa-cg]]. Define el centro de presiones como la posición media de la presión del aire, que se mueve al cambiar el ángulo de ataque; por eso los ingenieros aplican las fuerzas en el centro aerodinámico, un punto más estable cerca del cuarto de la cuerda (a un cuarto de la distancia desde el borde delantero) [[nasa-cp]].',
            'Un clip desplaza el punto de equilibrio en su masa por su distancia al punto anterior, dividido entre la nueva masa total. Un clip de 0,5 g a 100 mm por delante del punto de equilibrio de un avión de 5 g lo adelanta unos 9 mm {{estimate}}.',
            'La distancia entre el punto de equilibrio y el punto neutro, como fracción de la profundidad media del ala, es el margen estático. Nuestro modelo da a las mariposas de papel del capítulo 5 un margen del 10–14 % {{estimate}}. Los experimentos con placas finas los publican Li y colaboradores [[li-2022]] y los resume la National Science Foundation de EE. UU. [[nsf-gliders]].',
          ],
        },
        ru: {
          title: 'Равновесие: где сосредоточен вес',
          lead: 'Уравновесьте самолёт на одном пальце. Это место — точка равновесия, и от неё зависит, как он летит.',
          body: [
            'У каждого самолёта есть точка равновесия, которую учёные называют центром тяжести. В этом месте самолёт держится на кончике пальца, а нос и хвост остаются на одном уровне. Весь его вес действует так, будто собран там.',
            'У крыльев есть своя точка. Давление воздуха действует так, будто собрано в одном месте — центре давления. Он неуловим: при изменении угла атаки он сползает вперёд и назад. Поэтому инженеры берут точку постояннее. Когда угол атаки меняется, добавочная подъёмная сила приложена в нейтральной точке (фокусе). У плоского крыла она примерно на четверть глубины от передней кромки, а хвост сдвигает её назад.',
            'Самолёт летит устойчиво, только если точка равновесия впереди нейтральной точки. Тогда, если порыв поднимет нос, добавочная подъёмная сила толкает позади точки равновесия и опускает нос обратно. Если точка равновесия позади нейтральной точки, добавочная сила задирает нос ещё выше. Самолёт взмывает, сваливается или кувыркается.',
            'Вот почему у многих бумажных самолётов на носу скрепка. Скрепка — это вес спереди, она сдвигает точку равновесия вперёд. Слишком большой вес спереди тоже плох: самолёт пикирует, если не отогнуть задние кромки вверх, чтобы удержать нос ровно.',
            'Исследователи Нью-Йоркского университета испытывали тонкие пластины с грузом в разных местах. Пластины планировали устойчиво, когда груз был примерно посередине между центром и передней кромкой. При грузе дальше назад они кувыркались, а дальше вперёд — пикировали.',
          ],
          caption: 'Бумажный самолёт сбоку. Точка равновесия впереди нейтральной точки, поэтому нос, поднятый порывом, возвращается вниз. Скрепка на носу сдвигает точку равновесия вперёд. Схема, не в масштабе.',
          tryIt: {
            steps: [
              'Положите сложенный самолёт на кончик пальца, под корпус.',
              'Двигайте палец, пока самолёт не станет ровно. Отметьте место карандашом.',
              'Наденьте скрепку на нос и снова найдите точку равновесия.',
              'Измерьте в миллиметрах, на сколько сместилась отметка.',
            ],
            lookFor: 'В какую сторону сместилась точка равновесия?',
          },
          grownUps: [
            'NASA Glenn определяет центр тяжести как среднее положение веса предмета — точку, где он уравновешивается, — и отмечает, что самолёт в полёте вращается вокруг неё [[nasa-cg]]. Центр давления — среднее положение давления воздуха; он смещается при изменении угла атаки, поэтому инженеры прикладывают силы в аэродинамическом центре — более устойчивой точке около четверти хорды (на четверти ширины крыла от передней кромки) [[nasa-cp]].',
            'Скрепка смещает точку равновесия на её массу, умноженную на расстояние до прежней точки и делённую на новую общую массу. Скрепка 0,5 г в 100 мм перед точкой равновесия самолёта массой 5 г сдвигает её примерно на 9 мм вперёд {{estimate}}.',
            'Расстояние между точкой равновесия и нейтральной точкой в долях средней глубины крыла — это запас устойчивости. По нашей модели у бумажных бабочек из главы 5 запас 10–14 % {{estimate}}. Опыты с тонкими пластинами описали Li и соавторы [[li-2022]], а кратко изложил Национальный научный фонд США [[nsf-gliders]].',
          ],
        },
      },
    },
    {
      id: 'stability',
      kind: 'explainer',
      figure: 'dihedral',
      text: {
        en: {
          title: 'Stability: the V, the sweep and the tail',
          lead: 'Look at your plane from behind. Wings that rise in a shallow V help it level itself.',
          body: [
            'A stable plane returns to its path after a bump. Sooner or later a gust will tip it, so the shape of the plane has to put it right without your help.',
            'A plane can turn three ways about its balance point. Pitch is the nose bobbing up or down. Roll is one wing dipping. Yaw is the nose swinging left or right. The V steadies the roll, and the tail steadies pitch and yaw.',
            'The V, which engineers call dihedral, steadies the roll. When one wing drops, the plane starts to slide sideways towards the low wing. The low wing then meets the air at a larger angle and makes more lift than the high one, so the plane rolls back to level. With flat wings nothing pushes back, and a small roll can grow into a spiral.',
            'Too much V brings a different problem. The plane overcorrects and rocks from wing to wing. Most paper planes fly best with a shallow V, with the tips a little higher than the body.',
            'Sweep, wings that slope backwards like an arrowhead, has a similar levelling effect. It also puts the wingtips behind the balance point, where they work a little like a tail.',
            'A tail steadies a plane the way feathers steady an arrow. The flat tail stops the nose from bobbing, and the upright fin keeps the nose pointing into the airflow. Most paper darts have no separate tail. The back of the wing does the tail’s work, the body hanging underneath acts as a fin, and turned-up wingtips add two small fins more.',
          ],
          caption: 'From behind: wings in a shallow V. When the plane rolls, the lower wing meets the air at a larger angle, makes more lift and rolls the plane back to level. Diagram, not to scale.',
          tryIt: {
            steps: [
              'Stand your plane on a table and crouch down behind it.',
              'Measure the height of each wingtip above the table.',
              'Bend the wings until both tips are the same height.',
              'Launch five times. Watch whether it holds a straight line.',
            ],
          },
          grownUps: [
            'NASA Glenn names the three rotations pitch, roll and yaw, and notes that any aircraft in flight rotates about its centre of gravity [[nasa-rotations]].',
            'NASA Glenn defines the dihedral angle and its levelling effect [[nasa-wing-geometry]]. In a sideslip, dihedral raises the angle of attack of the lower wing, which creates a rolling moment back towards level.',
            'The rocking that comes with too much dihedral is a mild form of what pilots call Dutch roll, a linked swing in yaw and roll. Each plate’s trim table gives the paper fixes: raise the tips when the plane spirals, flatten the V when it rocks.',
          ],
        },
        es: {
          title: 'Estabilidad: la V, la flecha y la cola',
          lead: 'Mira tu avión desde atrás. Unas alas que suben en una V suave lo ayudan a nivelarse solo.',
          body: [
            'Un avión estable vuelve a su trayectoria tras un golpe de aire. Tarde o temprano una ráfaga lo inclinará, así que su forma debe corregirlo sin tu ayuda.',
            'Un avión puede girar de tres maneras en torno a su punto de equilibrio. El cabeceo es el morro que sube o baja. El alabeo es un ala que se hunde. La guiñada es el morro que se va a izquierda o derecha. La V estabiliza el alabeo, y la cola, el cabeceo y la guiñada.',
            'La V, que los ingenieros llaman diedro, estabiliza el alabeo. Cuando un ala baja, el avión empieza a deslizarse de lado hacia ella. El ala baja recibe entonces el aire con más ángulo y sustenta más que la alta, así que el avión vuelve a nivelarse. Con alas planas nada lo corrige, y un pequeño alabeo puede convertirse en espiral.',
            'Demasiada V trae otro problema. El avión se corrige de más y se balancea de un ala a otra. Casi todos los aviones de papel vuelan mejor con una V suave, con las puntas un poco más altas que el cuerpo.',
            'La flecha, alas inclinadas hacia atrás como una punta de flecha, nivela de forma parecida. Además pone las puntas del ala detrás del punto de equilibrio, donde actúan un poco como una cola.',
            'La cola estabiliza un avión como las plumas a una flecha. La cola horizontal evita que el morro cabecee, y la deriva vertical lo mantiene apuntando al flujo de aire. Casi ningún dardo de papel tiene cola aparte. La parte trasera del ala hace de cola, el cuerpo que cuelga debajo hace de deriva y las puntas dobladas hacia arriba añaden dos derivas pequeñas.',
          ],
          caption: 'Desde atrás: alas en una V suave. Cuando el avión se inclina, el ala más baja recibe el aire con más ángulo, sustenta más y lo devuelve a nivel. Esquema, no a escala.',
          tryIt: {
            steps: [
              'Pon tu avión sobre una mesa y agáchate detrás.',
              'Mide la altura de cada punta del ala sobre la mesa.',
              'Dobla las alas hasta igualar la altura de las puntas.',
              'Lánzalo cinco veces. Observa si mantiene la línea recta.',
            ],
          },
          grownUps: [
            'NASA Glenn llama a los tres giros cabeceo, alabeo y guiñada, y señala que todo avión en vuelo gira en torno a su centro de gravedad [[nasa-rotations]].',
            'NASA Glenn define el ángulo diedro y su efecto nivelador [[nasa-wing-geometry]]. En un deslizamiento lateral, el diedro aumenta el ángulo de ataque del ala baja, lo que crea un momento de alabeo que devuelve el avión a nivel.',
            'El balanceo por exceso de diedro es una forma suave de lo que los pilotos llaman balanceo holandés, una oscilación acoplada de guiñada y alabeo. La tabla de ajuste de cada lámina da los arreglos en papel: sube las puntas si el avión hace espirales y aplana la V si se balancea.',
          ],
        },
        ru: {
          title: 'Устойчивость: угол V, стреловидность и хвост',
          lead: 'Посмотрите на самолёт сзади. Крылья, поднятые пологой буквой V, помогают ему выравниваться самому.',
          body: [
            'Устойчивый самолёт возвращается на свой путь после толчка. Рано или поздно порыв его накренит, поэтому форма самолёта должна выправить его без вашей помощи.',
            'Вокруг точки равновесия самолёт может поворачиваться тремя способами. Тангаж — нос качается вверх и вниз. Крен — одно крыло опускается. Рыскание — нос уходит влево или вправо. Угол V гасит крен, а хвост — тангаж и рыскание.',
            'Угол V инженеры называют поперечным V. Он гасит крен. Когда одно крыло опускается, самолёт начинает скользить вбок, к нему. Нижнее крыло встречает воздух под большим углом и даёт больше подъёмной силы, чем верхнее, и самолёт выравнивается. С плоскими крыльями ничто не возвращает его, и небольшой крен может перейти в спираль.',
            'Слишком большой угол V создаёт другую проблему. Самолёт выравнивается слишком сильно и раскачивается с крыла на крыло. Большинство бумажных самолётов лучше летят с пологим V, когда законцовки чуть выше корпуса.',
            'Стреловидность, когда крылья отведены назад, как наконечник стрелы, выравнивает похожим образом. Она ещё и ставит законцовки крыльев позади точки равновесия, где они работают немного как хвост.',
            'Хвост делает самолёт устойчивым, как оперение — стрелу. Горизонтальное оперение не даёт носу качаться, а вертикальный киль держит нос по потоку. У большинства бумажных «дротиков» нет отдельного хвоста. Его работу делает задняя часть крыла, свисающий снизу корпус служит килем, а отогнутые вверх законцовки добавляют ещё два маленьких киля.',
          ],
          caption: 'Вид сзади: крылья пологим V. При крене нижнее крыло встречает воздух под большим углом, даёт больше подъёмной силы и выравнивает самолёт. Схема, не в масштабе.',
          tryIt: {
            steps: [
              'Поставьте самолёт на стол и присядьте за ним.',
              'Измерьте высоту каждой законцовки крыла над столом.',
              'Подогните крылья, чтобы обе законцовки были на одной высоте.',
              'Запустите пять раз. Следите, летит ли он прямо.',
            ],
          },
          grownUps: [
            'NASA Glenn называет три вращения тангажом, креном и рысканием и отмечает, что любой самолёт в полёте вращается вокруг центра тяжести [[nasa-rotations]].',
            'NASA Glenn определяет угол поперечного V и его выравнивающее действие [[nasa-wing-geometry]]. При скольжении поперечное V увеличивает угол атаки нижнего крыла, и возникает момент крена, возвращающий самолёт к горизонту.',
            'Раскачка при слишком большом поперечном V — мягкая форма того, что пилоты называют «голландским шагом»: связанных колебаний по рысканию и крену. Каждая таблица книги даёт советы по настройке: поднимите законцовки, если самолёт уходит в спираль, уменьшите угол V, если он раскачивается.',
          ],
        },
      },
    },
    {
      id: 'trim',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'Trim: small bends, big changes',
          lead: 'Trimming means making small changes to how a plane flies. One millimetre of paper can turn a dive into a glide.',
          body: [
            'A new plane rarely flies well on its first throw. That is normal. Trimming is how you tune it: bend an edge, launch, watch, and bend again.',
            'The back edges of the wings are the controls. Bend both back edges up a little and the air pushes the tail down, so the nose rises. This is called up-elevator, and it cures most dives. Bend them down and the nose drops.',
            'Why does a plane swoop, stall and then dive? Too much up-elevator holds the nose high. The plane climbs and slows until its wing passes the stalling angle. Lift collapses, the nose drops, and the plane dives to win back speed. With speed back, the bent edges lift the nose again, and round it goes. Good trim finds the bend where the plane settles at one calm speed.',
            'Bend the back edge of one wing up and the plane turns towards that side. If it turns left, bend the back edge of the right wing up 1 mm.',
            'Check the shape before you bend anything. Look from behind: are both wings the same, and both tips the same height? A twisted wing or a lopsided V steers the plane before any trim does.',
            'Change one thing at a time, by a millimetre or two, and launch the same way each time. Otherwise you cannot tell which change did what.',
          ],
          rows: [
            { see: 'Dives into the floor', why: 'The nose is too heavy, or the back edges point down.', fix: 'Bend both back edges up 1 mm. Repeat if it still dives.' },
            { see: 'Swoops up, stops, then drops', why: 'Too much up-elevator, or a throw that is too hard.', fix: 'Flatten the back edges a little and throw more gently. Then try a clip on the nose.' },
            { see: 'Turns left', why: 'The two sides do not match.', fix: 'Match the wings and tips. Then bend the right back edge up 1 mm.' },
            { see: 'Turns right', why: 'The two sides do not match.', fix: 'Match the wings and tips. Then bend the left back edge up 1 mm.' },
            { see: 'Rolls over and spirals down', why: 'Too little V.', fix: 'Raise both wingtips to the same height.' },
            { see: 'Rocks from side to side', why: 'Too much V.', fix: 'Flatten the V a little.' },
          ],
          rowsNote: 'What to try. These fixes follow how paper gliders behave. Each plate has its own table, and none has been tested on this book’s designs yet.',
          tryIt: {
            steps: [
              'Launch your plane three times the same way.',
              'Find its problem in the table.',
              'Make the one fix the table suggests, by 1 mm.',
              'Launch three more times.',
            ],
            lookFor: 'Better, worse or the same? Write it down.',
          },
          grownUps: [
            'John Collins teaches a rule of thumb in a WIRED video: bend the back edge the way you want the nose to go [[wired-phoenix]].',
            'Trim sets the angle of attack at which the plane balances, and so its speed. More up-elevator means a larger angle and a slower glide, until the stall. A nose clip moves the balance point forwards; the plane then needs more up-elevator and flies faster but steadier. The swoop-and-drop cycle is a long pitch swing that pilots call a phugoid, in which the plane trades speed for height and back again.',
          ],
        },
        es: {
          title: 'Ajuste: pequeños dobleces, grandes cambios',
          lead: 'Ajustar es hacer pequeños cambios en cómo vuela un avión. Un milímetro de papel puede convertir un picado en un planeo.',
          body: [
            'Un avión nuevo casi nunca vuela bien al primer lanzamiento. Es normal. El ajuste sirve para afinarlo: dobla un borde, lanza, observa y vuelve a doblar.',
            'Los bordes traseros de las alas son los mandos. Dobla un poco hacia arriba los dos y el aire empuja la cola hacia abajo, así que el morro sube. Es el timón de profundidad hacia arriba, y corrige casi todos los picados. Dóblalos hacia abajo y el morro baja.',
            '¿Por qué un avión sube, entra en pérdida y luego cae en picado? Demasiado timón hacia arriba mantiene el morro alto. El avión sube y frena hasta que su ala pasa el ángulo de pérdida. La sustentación se desploma, el morro cae y el avión pica para recuperar velocidad. Con la velocidad de vuelta, los bordes doblados levantan otra vez el morro, y vuelta a empezar. Un buen ajuste encuentra el doblez con el que el avión se asienta a una velocidad tranquila.',
            'Dobla hacia arriba el borde trasero de un ala y el avión girará hacia ese lado. Si gira a la izquierda, dobla 1 mm hacia arriba el borde trasero del ala derecha.',
            'Revisa la forma antes de doblar nada. Mira desde atrás: ¿son iguales las dos alas y están las puntas a la misma altura? Un ala torcida o una V desigual desvían el avión antes que cualquier ajuste.',
            'Cambia una sola cosa cada vez, uno o dos milímetros, y lanza siempre igual. Si no, no sabrás qué cambio hizo qué.',
          ],
          rows: [
            { see: 'Se clava en el suelo', why: 'El morro pesa mucho o los bordes traseros bajan.', fix: 'Sube 1 mm los dos bordes traseros. Repite si aún pica.' },
            { see: 'Sube, se para y cae', why: 'Demasiado timón de profundidad arriba, o un lanzamiento fuerte.', fix: 'Aplana un poco los bordes traseros y lanza más suave. Luego prueba un clip en el morro.' },
            { see: 'Gira a la izquierda', why: 'Los dos lados no son iguales.', fix: 'Iguala alas y puntas. Luego sube 1 mm el borde trasero derecho.' },
            { see: 'Gira a la derecha', why: 'Los dos lados no son iguales.', fix: 'Iguala alas y puntas. Luego sube 1 mm el borde trasero izquierdo.' },
            { see: 'Se inclina y baja en espiral', why: 'Poca V.', fix: 'Sube las dos puntas del ala a la misma altura.' },
            { see: 'Se balancea de lado a lado', why: 'Demasiada V.', fix: 'Aplana un poco la V.' },
          ],
          rowsNote: 'Qué probar. Estos arreglos siguen el comportamiento de los planeadores de papel. Cada lámina tiene su tabla, y ninguna se ha probado aún con los diseños de este libro.',
          tryIt: {
            steps: [
              'Lanza tu avión tres veces de la misma forma.',
              'Busca su problema en la tabla.',
              'Haz solo el arreglo que indica la tabla, de 1 mm.',
              'Lánzalo tres veces más.',
            ],
            lookFor: '¿Mejor, peor o igual? Anótalo.',
          },
          grownUps: [
            'John Collins enseña una regla práctica en un video de WIRED: dobla el borde trasero hacia donde quieres que vaya el morro [[wired-phoenix]].',
            'El ajuste fija el ángulo de ataque en el que el avión se equilibra y, con él, su velocidad. Más timón de profundidad hacia arriba da más ángulo y un planeo más lento, hasta la pérdida. Un clip en el morro adelanta el punto de equilibrio; el avión necesita entonces más timón hacia arriba y vuela más rápido pero más estable. El ciclo de subir y caer es una larga oscilación de cabeceo que los pilotos llaman fugoide: el avión cambia velocidad por altura y al revés.',
          ],
        },
        ru: {
          title: 'Настройка: малые изгибы, большие перемены',
          lead: 'Настроить самолёт — значит немного изменить его полёт. Один миллиметр бумаги может превратить пике в планирование.',
          body: [
            'Новый самолёт редко хорошо летит с первого броска. Это нормально. Настройка помогает его отладить: отогните кромку, запустите, посмотрите и отогните снова.',
            'Задние кромки крыльев — это рули. Отогните обе немного вверх, и воздух прижмёт хвост вниз, а нос поднимется. Это называют «руль высоты вверх», и это исправляет большинство пике. Отогните их вниз, и нос опустится.',
            'Почему самолёт взмывает, сваливается, а потом пикирует? Слишком много руля высоты вверх держит нос высоко. Самолёт набирает высоту и тормозит, пока крыло не перейдёт угол сваливания. Подъёмная сила пропадает, нос падает, и самолёт пикирует, чтобы вернуть скорость. Со скоростью отогнутые кромки снова поднимают нос, и всё повторяется. Хорошая настройка находит такой изгиб, при котором самолёт летит с одной спокойной скоростью.',
            'Отогните вверх заднюю кромку одного крыла, и самолёт повернёт в эту сторону. Если он поворачивает влево, отогните вверх на 1 мм заднюю кромку правого крыла.',
            'Прежде чем что-то отгибать, проверьте форму. Посмотрите сзади: одинаковы ли крылья, на одной ли высоте законцовки? Перекошенное крыло или неровное V уводят самолёт раньше любой настройки.',
            'Меняйте что-то одно за раз, на миллиметр-два, и запускайте каждый раз одинаково. Иначе не понять, какое изменение что сделало.',
          ],
          rows: [
            { see: 'Пикирует в пол', why: 'Нос слишком тяжёлый или задние кромки смотрят вниз.', fix: 'Отогните обе задние кромки вверх на 1 мм. Повторите, если нужно.' },
            { see: 'Взмывает, зависает и падает', why: 'Слишком много руля высоты вверх или сильный бросок.', fix: 'Немного распрямите задние кромки и бросайте мягче. Затем попробуйте скрепку на носу.' },
            { see: 'Поворачивает влево', why: 'Две стороны не совпадают.', fix: 'Выровняйте крылья и законцовки. Потом поднимите правую заднюю кромку на 1 мм.' },
            { see: 'Поворачивает вправо', why: 'Две стороны не совпадают.', fix: 'Выровняйте крылья и законцовки. Потом поднимите левую заднюю кромку на 1 мм.' },
            { see: 'Кренится и уходит в спираль', why: 'Слишком малый угол V.', fix: 'Поднимите обе законцовки крыла на одну высоту.' },
            { see: 'Раскачивается из стороны в сторону', why: 'Слишком большой угол V.', fix: 'Немного уменьшите угол V.' },
          ],
          rowsNote: 'Что попробовать. Эти советы основаны на поведении бумажных планеров. У каждой таблицы книги свой список, и ни один ещё не проверен на моделях этой книги.',
          tryIt: {
            steps: [
              'Запустите самолёт три раза одинаково.',
              'Найдите его проблему в таблице.',
              'Сделайте одно исправление из таблицы, на 1 мм.',
              'Запустите ещё три раза.',
            ],
            lookFor: 'Лучше, хуже или так же? Запишите.',
          },
          grownUps: [
            'John Collins в видео WIRED даёт простое правило: отгибайте заднюю кромку туда, куда должен пойти нос [[wired-phoenix]].',
            'Настройка задаёт угол атаки, при котором самолёт уравновешен, а значит, и его скорость. Больше руля высоты вверх — больше угол и медленнее планирование, вплоть до сваливания. Скрепка на носу сдвигает точку равновесия вперёд; тогда нужно больше руля высоты вверх, и самолёт летит быстрее, но устойчивее. Цикл «взмыл и упал» — долгое колебание по тангажу, которое пилоты называют фугоидой: самолёт меняет скорость на высоту и обратно.',
          ],
        },
      },
    },
    {
      id: 'fold-rescue',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'When a fold goes wrong',
          lead: 'Every builder makes a crooked fold. Many bad flights start there, so check the folds before you trim.',
          body: [
            'A crease in the wrong place: flatten it under a heavy book and fold again beside it. Paper remembers, so the old line will always pull a little.',
            'Wings that do not match: set the plane on a table and compare the tips from behind. A twisted wing or a lopsided V steers the plane before any bend at the back does.',
            'A torn tab or a soft nose: a 1 cm piece of tape fixes it, but write the change in your log. If the sheet is tired and limp, print a new one. A fresh sheet is part of a fair test.',
          ],
          rows: [
            { see: 'Turns the same way every time', why: 'One wing, tip or side of the V is folded differently.', fix: 'Match both sides from behind. Then bend up the back edge on the outside of the turn 1 mm.' },
            { see: 'Rolls over and spirals down', why: 'The tips are at different heights, or the V is flat.', fix: 'Lift both tips to the same height.' },
            { see: 'Swerves or drops a wing at once', why: 'The front edge is twisted.', fix: 'Sight along the front edge and flatten it before you bend anything else.' },
            { see: 'Flutters or opens in flight', why: 'The body fold has gone soft.', fix: 'Crease the body fold hard again.' },
            { see: 'Dives into the floor', why: 'The back edges were folded down.', fix: 'Bend both back edges up 1 mm.' },
          ],
          rowsNote: 'What to try. These fixes come from the trim tables for each design. None has been tested on this book’s designs yet.',
          tryIt: {
            steps: [
              'Hold your plane at eye level and look along it from behind.',
              'Check that both wings, both tips and both sides of the V match.',
              'Fix the fold first. Then launch three times the same way.',
            ],
            lookFor: 'Did fixing the fold change the flight before you trimmed anything?',
          },
          grownUps: [
            'The rows above are the same fixes as each plate’s trim table, sorted by the fold that usually causes them. A lopsided plane flies lopsided whatever you bend at the back, so a trim can hide a bad fold but not cure it.',
            'John Collins, who designed a record-breaking paper plane, stresses accurate folds, symmetry and test flights [[wired-collins-2018]].',
          ],
        },
        es: {
          title: 'Cuando un pliegue sale mal',
          lead: 'Todos hacemos algún pliegue torcido. Muchos vuelos malos empiezan ahí, así que revisa los pliegues antes de ajustar.',
          body: [
            'Un pliegue en el sitio equivocado: aplánalo bajo un libro pesado y vuelve a plegar al lado. El papel tiene memoria, así que la marca vieja siempre tirará un poco.',
            'Alas que no coinciden: deja el avión sobre una mesa y compara las puntas desde atrás. Un ala torcida o una V desigual desvían el avión antes que cualquier doblez en la parte trasera.',
            'Una pestaña rota o un morro blando: un trozo de cinta de 1 cm lo arregla, pero apunta el cambio en tu registro. Si la hoja está cansada y blanda, imprime otra. Una hoja nueva también forma parte de una prueba justa.',
          ],
          rows: [
            { see: 'Gira siempre hacia el mismo lado', why: 'Un ala, una punta o un lado de la V está plegado distinto.', fix: 'Iguala los dos lados desde atrás. Luego sube 1 mm el borde trasero del lado exterior del giro.' },
            { see: 'Se vuelca y baja en espiral', why: 'Las puntas están a distinta altura, o la V es plana.', fix: 'Sube las dos puntas a la misma altura.' },
            { see: 'Se desvía o baja un ala al soltarlo', why: 'El borde delantero está torcido.', fix: 'Mira a lo largo del borde delantero y enderézalo antes de doblar nada más.' },
            { see: 'Vibra o se abre en el aire', why: 'El pliegue del cuerpo se ha ablandado.', fix: 'Vuelve a marcar con fuerza el pliegue del cuerpo.' },
            { see: 'Se clava en el suelo', why: 'Los bordes traseros quedaron doblados hacia abajo.', fix: 'Sube 1 mm los dos bordes traseros.' },
          ],
          rowsNote: 'Qué probar. Estos arreglos vienen de las tablas de ajuste de cada modelo. Ninguno se ha probado aún con los diseños de este libro.',
          tryIt: {
            steps: [
              'Sostén el avión a la altura de los ojos y míralo desde atrás.',
              'Comprueba que coinciden las dos alas, las dos puntas y los dos lados de la V.',
              'Arregla primero el pliegue. Luego lánzalo tres veces de la misma forma.',
            ],
            lookFor: '¿Cambió el vuelo al arreglar el pliegue, antes de ajustar nada?',
          },
          grownUps: [
            'Las filas de arriba son los mismos arreglos de la tabla de ajuste de cada lámina, ordenados por el pliegue que suele causarlos. Un avión desigual vuela desigual por mucho que dobles la parte trasera, así que un ajuste puede esconder un mal pliegue, pero no curarlo.',
            'John Collins, que diseñó un avión de papel de récord, insiste en los pliegues precisos, la simetría y los vuelos de prueba [[wired-collins-2018]].',
          ],
        },
        ru: {
          title: 'Если сгиб не получился',
          lead: 'Кривой сгиб бывает у всех. С него начинаются многие неудачные полёты, поэтому проверьте сгибы до настройки.',
          body: [
            'Сгиб не на месте: разгладьте лист под тяжёлой книгой и согните заново рядом. Бумага помнит старую линию, и она всегда будет немного тянуть.',
            'Крылья разные: поставьте самолёт на стол и сравните законцовки сзади. Перекошенное крыло или неровное V уводят самолёт раньше любого отгиба сзади.',
            'Порвался язычок или смялся нос: поможет кусочек скотча в 1 см, но запишите это в журнал. Если лист устал и обмяк, распечатайте новый. Свежий лист — тоже часть честного опыта.',
          ],
          rows: [
            { see: 'Всегда поворачивает в одну сторону', why: 'Одно крыло, законцовка или сторона V сложены иначе.', fix: 'Выровняйте обе стороны, глядя сзади. Затем отогните вверх на 1 мм заднюю кромку с внешней стороны поворота.' },
            { see: 'Кренится и уходит в спираль', why: 'Законцовки на разной высоте, или V плоское.', fix: 'Поднимите обе законцовки на одну высоту.' },
            { see: 'Сразу уходит в сторону или роняет крыло', why: 'Передняя кромка перекручена.', fix: 'Посмотрите вдоль передней кромки и выпрямите её, прежде чем что-то отгибать.' },
            { see: 'Дрожит или раскрывается в полёте', why: 'Сгиб корпуса ослаб.', fix: 'Ещё раз сильно прогладьте сгиб корпуса.' },
            { see: 'Пикирует в пол', why: 'Задние кромки загнуты вниз.', fix: 'Отогните обе задние кромки вверх на 1 мм.' },
          ],
          rowsNote: 'Что попробовать. Эти советы взяты из таблиц настройки каждой модели. Ни один ещё не проверен на моделях этой книги.',
          tryIt: {
            steps: [
              'Держите самолёт на уровне глаз и посмотрите на него сзади.',
              'Проверьте, совпадают ли оба крыла, обе законцовки и обе стороны V.',
              'Сначала исправьте сгиб. Затем запустите три раза одинаково.',
            ],
            lookFor: 'Изменился ли полёт после исправления сгиба, ещё до настройки?',
          },
          grownUps: [
            'Строки выше — те же советы, что и в таблице настройки каждой модели, только разложенные по сгибу, который обычно виноват. Перекошенный самолёт летит криво, что бы вы ни отгибали сзади, поэтому настройка может скрыть плохой сгиб, но не исправить его.',
            'Джон Коллинз, автор рекордного бумажного самолёта, подчёркивает: важны точные сгибы, симметрия и пробные полёты [[wired-collins-2018]].',
          ],
        },
      },
    },
    {
      id: 'glide',
      kind: 'explainer',
      figure: 'glide',
      text: {
        en: {
          title: 'Glide: going far or staying up',
          lead: 'A glider is always going downhill. How gently it goes downhill decides how far it flies.',
          body: [
            'Watch a good glide from the side. The plane slides down a straight, shallow slope. The glide ratio tells you how shallow: it is the distance the plane travels forwards for each metre of height it loses. A glide ratio of 5 means 5 metres forwards for every metre down.',
            'The glide ratio equals the lift divided by the drag. Long, smooth wings with little drag give a high ratio. A top sailplane, with wings 26.5 m from tip to tip, glides about 60 m for every metre it sinks [[faa-glider]]. Let go from the top of a 30 m tower, it could glide 1.8 km, about seventeen football pitches {{estimate}}. A carefully built card glider, tested in a wind tunnel in Japan, managed about 9 [[nihon-2017]]. The Space Shuttle came home from orbit as a glider. On its final approach it dropped down a slope of 18 to 20 degrees, only about 3 m forwards for each metre down {{estimate}} [[nasa-shuttle-aero]]. Nobody has measured the glide ratio of the designs in this book yet.',
            'Sink rate is something else: how fast the plane comes down, in metres per second. A slow plane can sink slowly even with a modest glide ratio. So there are two kinds of good glide. For distance you want the flattest slope. For time in the air you want the slowest sink, which usually means flying a little slower than for the flattest slope.',
            'Height is stored energy. A plane launched from higher up has more to spend, so with the same glide ratio it flies further and longer. A throw aimed upwards turns the speed of your arm into height, and the plane can then spend that height slowly. Chapter 9 shows how far people have taken this.',
          ],
          caption: 'A steady glide from a height h covers a distance d. The glide ratio is d ÷ h, and it equals lift ÷ drag. Diagram, not to scale.',
          tryIt: {
            steps: [
              'Mark a launch height on a wall, such as your shoulder.',
              'Launch the plane gently and level from that height.',
              'Measure the distance to where it first touches the floor.',
              'Divide the distance by the height.',
            ],
            lookFor: 'That is a rough glide ratio for this launch. The throw adds a little speed, so it is not exact.',
          },
          grownUps: [
            'The glide angle γ satisfies tan γ = D/L, so the glide ratio L/D is the distance travelled divided by the height lost [[nasa-ld]]. In a WIRED video John Collins gives round numbers of about 16 for a hang glider and about 9 for a small propeller plane [[wired-level-up]].',
            'The sailplane is the long-winged example in the FAA’s Glider Flying Handbook: 86.9 ft span, aspect ratio 39 (its span is 39 times its average depth, front to back), glide ratio 60:1; its training-glider example manages 22:1 [[faa-glider]]. The card glider spanned 330 mm, weighed 11.5 g and reached a best lift-to-drag ratio of about 8.8 at 2° in the tunnel, with a lowest sink of 0.50 m/s [[nihon-2017]]. It was cut and glued, not folded. We found no folded dart measured as carefully.',
            'The Shuttle figure is our arithmetic, 1 ÷ tan 19° ≈ 2.9 {{estimate}}, from NASA’s 18–20° final glide slope [[nasa-shuttle-aero]]. That steep slope was not its flattest glide: a 1975 NASA study of an early orbiter design gives a best subsonic lift-to-drag ratio of 6.7 [[nasa-tn-d7899]].',
            'Sink rate is the flight speed times sin γ. A plane gliding at 3 m/s with a glide ratio of 5 sinks at about 0.6 m/s, so it needs about 2.5 s to come down from 1.5 m. Our model predicts a glide speed of about 2.7 m/s for the Monarch butterfly, plate B1 {{estimate}}.',
          ],
        },
        es: {
          title: 'Planeo: llegar lejos o seguir en el aire',
          lead: 'Un planeador siempre va cuesta abajo. Lo suave que baja decide lo lejos que vuela.',
          body: [
            'Mira un buen planeo de lado. El avión baja por una pendiente recta y suave. La relación de planeo dice cuánto: es la distancia que avanza por cada metro de altura que pierde. Una relación de planeo de 5 significa 5 metros hacia delante por cada metro de bajada.',
            'La relación de planeo es la sustentación dividida entre la resistencia. Alas largas y lisas, con poca resistencia, dan una relación alta. Un velero de competición, con 26,5 m de punta a punta, planea unos 60 m por cada metro que baja [[faa-glider]]. Soltado desde lo alto de una torre de 30 m, recorrería 1,8 km, unos diecisiete campos de fútbol {{estimate}}. Un planeador de cartulina bien construido, probado en un túnel de viento en Japón, logró cerca de 9 [[nihon-2017]]. El transbordador espacial volvía de la órbita como un planeador. En la aproximación final bajaba por una pendiente de 18 a 20 grados: solo unos 3 m hacia delante por cada metro de bajada {{estimate}} [[nasa-shuttle-aero]]. Nadie ha medido aún la relación de planeo de los diseños de este libro.',
            'La velocidad de descenso es otra cosa: lo rápido que baja el avión, en metros por segundo. Un avión lento puede bajar despacio aun con una relación de planeo modesta. Así que hay dos tipos de buen planeo. Para distancia, quieres la pendiente más plana. Para tiempo en el aire, el descenso más lento, que suele exigir volar algo más despacio.',
            'La altura es energía guardada. Un avión lanzado desde más alto tiene más para gastar, así que con la misma relación de planeo vuela más lejos y más tiempo. Un lanzamiento hacia arriba convierte la velocidad de tu brazo en altura, y el avión la gasta luego despacio. El capítulo 9 muestra hasta dónde se ha llevado esto.',
          ],
          caption: 'Un planeo estable desde una altura h recorre una distancia d. La relación de planeo es d ÷ h, e igual a sustentación ÷ resistencia. Esquema, no a escala.',
          tryIt: {
            steps: [
              'Marca en una pared una altura de lanzamiento, como tu hombro.',
              'Lanza el avión suave y recto desde esa altura.',
              'Mide la distancia hasta donde toca el suelo por primera vez.',
              'Divide la distancia entre la altura.',
            ],
            lookFor: 'Es una relación de planeo aproximada. El impulso añade algo de velocidad, así que no es exacta.',
          },
          grownUps: [
            'El ángulo de planeo γ cumple tan γ = D/L, así que la relación de planeo L/D es la distancia recorrida dividida entre la altura perdida [[nasa-ld]]. En un video de WIRED, John Collins da cifras redondas: unos 16 para un ala delta y unos 9 para una avioneta de hélice [[wired-level-up]].',
            'El velero es el ejemplo de alas largas del Glider Flying Handbook de la FAA: 86,9 pies de envergadura, alargamiento 39 (su envergadura es 39 veces su anchura media, de delante a atrás) y relación de planeo 60:1; su ejemplo de velero de escuela logra 22:1 [[faa-glider]]. El planeador de cartulina medía 330 mm de envergadura, pesaba 11,5 g y alcanzó en el túnel una relación sustentación/resistencia máxima de unos 8,8 a 2°, con un descenso mínimo de 0,50 m/s [[nihon-2017]]. Estaba cortado y pegado, no plegado. No encontramos ningún dardo plegado medido con tanto cuidado.',
            'La cifra del transbordador es cálculo nuestro, 1 ÷ tan 19° ≈ 2,9 {{estimate}}, a partir de la pendiente final de 18–20° que da la NASA [[nasa-shuttle-aero]]. Esa pendiente empinada no era su mejor planeo: un estudio de la NASA de 1975 sobre un diseño temprano del orbitador da una relación sustentación/resistencia subsónica máxima de 6,7 [[nasa-tn-d7899]].',
            'La velocidad de descenso es la velocidad de vuelo por sen γ. Un avión que planea a 3 m/s con relación de planeo 5 desciende a unos 0,6 m/s, así que tarda unos 2,5 s en bajar desde 1,5 m. Nuestro modelo predice unos 2,7 m/s de planeo para la mariposa Monarch, lámina B1 {{estimate}}.',
          ],
        },
        ru: {
          title: 'Планирование: дальше или дольше',
          lead: 'Планер всегда спускается под горку. Чем положе спуск, тем дальше он летит.',
          body: [
            'Посмотрите на хорошее планирование сбоку. Самолёт скользит по прямому пологому склону. Насколько он пологий, показывает аэродинамическое качество: сколько метров самолёт пролетает вперёд на каждый метр потерянной высоты. Качество 5 означает 5 метров вперёд на каждый метр вниз.',
            'Аэродинамическое качество равно подъёмной силе, делённой на сопротивление. Длинные гладкие крылья с малым сопротивлением дают высокое качество. Спортивный планер с размахом крыльев 26,5 м пролетает около 60 м на каждый метр снижения [[faa-glider]]. Отпущенный с вершины 30-метровой башни, он улетел бы на 1,8 км — это около семнадцати футбольных полей {{estimate}}. Аккуратно сделанный планер из плотной бумаги, испытанный в аэродинамической трубе в Японии, показал около 9 [[nihon-2017]]. «Спейс шаттл» возвращался с орбиты как планер. На последнем заходе он снижался по склону в 18–20 градусов — всего около 3 м вперёд на каждый метр вниз {{estimate}} [[nasa-shuttle-aero]]. Качество моделей этой книги пока никто не измерял.',
            'Скорость снижения — другое: как быстро самолёт опускается, в метрах в секунду. Медленный самолёт может снижаться медленно даже при скромном качестве. Поэтому хорошее планирование бывает двух видов. Для дальности нужен самый пологий склон. Для времени в воздухе — самое медленное снижение, а для этого обычно летят чуть медленнее.',
            'Высота — это запасённая энергия. Самолёт, запущенный выше, может больше потратить, поэтому при том же качестве летит дальше и дольше. Бросок вверх превращает скорость руки в высоту, и затем самолёт медленно её расходует. В главе 9 показано, как далеко люди зашли в этом.',
          ],
          caption: 'Ровное планирование с высоты h покрывает расстояние d. Качество — это d ÷ h, и оно равно подъёмной силе ÷ сопротивление. Схема, не в масштабе.',
          tryIt: {
            steps: [
              'Отметьте на стене высоту запуска, например на уровне плеча.',
              'Запустите самолёт мягко и горизонтально с этой высоты.',
              'Измерьте расстояние до места, где он впервые коснётся пола.',
              'Разделите расстояние на высоту.',
            ],
            lookFor: 'Это примерное качество для этого запуска. Бросок добавляет немного скорости, поэтому оно неточное.',
          },
          grownUps: [
            'Угол планирования γ удовлетворяет tg γ = D/L, поэтому качество L/D равно пройденному расстоянию, делённому на потерянную высоту [[nasa-ld]]. В видео WIRED John Collins даёт круглые числа: около 16 для дельтаплана и около 9 для небольшого винтового самолёта [[wired-level-up]].',
            'Планер — пример с длинными крыльями из справочника FAA Glider Flying Handbook: размах 86,9 фута, удлинение 39 (размах в 39 раз больше средней ширины крыла от передней кромки до задней), качество 60:1; учебный планер оттуда же даёт 22:1 [[faa-glider]]. Бумажный планер имел размах 330 мм, массу 11,5 г и показал в трубе наибольшее качество около 8,8 при 2°, с наименьшей скоростью снижения 0,50 м/с [[nihon-2017]]. Он был вырезан и склеен, а не сложен. Сложенный «дротик», измеренный так же тщательно, мы не нашли.',
            'Цифра для шаттла — наш расчёт, 1 ÷ tg 19° ≈ 2,9 {{estimate}}, по данным NASA о конечной глиссаде 18–20° [[nasa-shuttle-aero]]. Эта крутая глиссада не была его самым пологим планированием: исследование NASA 1975 года для раннего проекта орбитального корабля даёт наибольшее дозвуковое качество 6,7 [[nasa-tn-d7899]].',
            'Скорость снижения равна скорости полёта, умноженной на sin γ. Самолёт, планирующий со скоростью 3 м/с при качестве 5, снижается со скоростью около 0,6 м/с и опускается с 1,5 м примерно за 2,5 с. Наша модель предсказывает скорость планирования около 2,7 м/с для бабочки Monarch, таблица B1 {{estimate}}.',
          ],
        },
      },
    },
    {
      id: 'paper',
      kind: 'explainer',
      figure: null,
      text: {
        en: {
          title: 'Paper is a material',
          lead: 'Paper has a weight, a stiffness and a grain. Choosing the sheet is part of the design.',
          body: [
            'Paper is sold by its weight per square metre, written g/m². Office paper is usually 80 g/m². The butterflies in this book use 120 g/m², and thin card is about 160 g/m². An A4 sheet of 80 g/m² paper weighs 5 g.',
            'Heavier paper is thicker, and thickness makes paper much stiffer: a sheet twice as thick is about eight times as hard to bend. Stiff wings keep their shape when the air pushes on them. But every extra gram must be carried, so a heavier plane has to fly faster.',
            'Paper also has a grain. When paper is made, most of its fibres line up in one direction, and the sheet is roughly twice as stiff along the grain as across it. Wings that run along the grain bend less. Folds stiffen paper too: a crease turns a flat sheet into a beam, like the ridges inside corrugated card.',
            'We learned this the hard way. On 24 November 2026 our designer folded the first paper butterfly with a folded body, which we call K1, on small and larger sheets. It looked right but glided badly. The wings bent too much and felt disconnected from the head. That was one person’s observation, not a recorded test. Our model then suggested why: on thin paper, a wing that size bends a long way at the tip under its own lift. The next version, K2, moved to 120 g/m² paper with the wings along the grain, and it did not fly well in the founder’s tries either. The current version, K3, sweeps the wings back like a paper dart and doubles their front edges to stiffen them. Chapter 5 tells the rest; no K3 flight has been recorded yet.',
          ],
          tryIt: {
            steps: [
              'Cut two strips 2 cm wide and 15 cm long from one sheet: one along the long side, one along the short side.',
              'Hold each strip flat by one end.',
              'Compare how far the free ends droop.',
            ],
            lookFor: 'The strip that droops less runs along the grain. Fold wings that way.',
          },
          grownUps: [
            'Bending stiffness grows with the cube of thickness, while weight grows only in proportion to it. Our model uses typical office-paper stiffnesses, in gigapascals (GPa, a unit of stiffness), of 5–5.5 GPa along the grain and 2.1–2.5 GPa across it {{estimate}} [[k2-note]].',
            'For a 172 mm paper butterfly with its wings along the grain, the model predicts a tip bend of about 19 mm on 80 g/m² paper and about 8 mm on 120 g/m² {{estimate}}. The trial that will test this has not been done yet {{not-yet-measured}}.',
          ],
        },
        es: {
          title: 'El papel es un material',
          lead: 'El papel tiene peso, rigidez y fibra. Elegir la hoja es parte del diseño.',
          body: [
            'El papel se vende por su peso por metro cuadrado, escrito g/m². El de oficina suele ser de 80 g/m². Las mariposas de este libro usan 120 g/m², y la cartulina fina ronda los 160 g/m². Una hoja A4 de 80 g/m² pesa 5 g.',
            'El papel más pesado es más grueso, y el grosor lo hace mucho más rígido: una hoja el doble de gruesa cuesta unas ocho veces más de doblar. Las alas rígidas mantienen su forma cuando el aire las empuja. Pero cada gramo extra hay que llevarlo, así que un avión más pesado tiene que volar más rápido.',
            'El papel también tiene fibra. Al fabricarlo, casi todas sus fibras se alinean en una dirección, y la hoja es casi el doble de rígida a lo largo de la fibra que a lo ancho. Las alas en la dirección de la fibra se doblan menos. Los pliegues también dan rigidez: un pliegue convierte una hoja plana en una viga, como las ondas del cartón corrugado.',
            'Lo aprendimos por las malas. El 24 de noviembre de 2026, nuestro diseñador plegó la primera mariposa de papel con cuerpo plegado, que llamamos K1, en hojas pequeñas y grandes. Se veía bien, pero planeaba mal. Las alas se doblaban demasiado y parecían desconectadas de la cabeza. Fue la observación de una persona, no una prueba registrada. Luego nuestro modelo sugirió por qué: en papel fino, un ala de ese tamaño se dobla mucho en la punta bajo su propia sustentación. La siguiente versión, K2, pasó a papel de 120 g/m² con las alas en la dirección de la fibra, y tampoco voló bien en las pruebas del fundador. La versión actual, K3, lleva las alas hacia atrás como un dardo de papel y dobla sus bordes delanteros para darles rigidez. El capítulo 5 cuenta el resto; aún no hay vuelos de K3 registrados.',
          ],
          tryIt: {
            steps: [
              'Corta de una hoja dos tiras de 2 cm de ancho y 15 cm de largo: una a lo largo del lado largo y otra del lado corto.',
              'Sujeta cada tira plana por un extremo.',
              'Compara cuánto cuelgan los extremos libres.',
            ],
            lookFor: 'La tira que cuelga menos va en la dirección de la fibra. Pliega las alas así.',
          },
          grownUps: [
            'La rigidez a flexión crece con el cubo del grosor, mientras que el peso solo crece en proporción a él. Nuestro modelo usa módulos típicos de papel de oficina, en gigapascales (GPa, una unidad de rigidez), de 5–5,5 GPa a lo largo de la fibra y 2,1–2,5 GPa a lo ancho {{estimate}} [[k2-note]].',
            'Para una mariposa de papel de 172 mm con las alas en la dirección de la fibra, el modelo predice una flexión en la punta de unos 19 mm en papel de 80 g/m² y unos 8 mm en 120 g/m² {{estimate}}. La prueba que lo comprobará aún no se ha hecho {{not-yet-measured}}.',
          ],
        },
        ru: {
          title: 'Бумага — это материал',
          lead: 'У бумаги есть вес, жёсткость и направление волокон. Выбор листа — часть конструкции.',
          body: [
            'Бумагу продают по весу квадратного метра, его пишут в г/м². Офисная бумага обычно 80 г/м². Бабочки этой книги сделаны из 120 г/м², а тонкий картон — около 160 г/м². Лист A4 бумаги 80 г/м² весит 5 г.',
            'Плотная бумага толще, а толщина делает её намного жёстче: лист вдвое толще примерно в восемь раз труднее согнуть. Жёсткие крылья сохраняют форму, когда на них давит воздух. Но каждый лишний грамм нужно нести, поэтому более тяжёлый самолёт должен лететь быстрее.',
            'У бумаги есть и направление волокон. При изготовлении большинство волокон ложится в одну сторону, и вдоль волокон лист примерно вдвое жёстче, чем поперёк. Крылья вдоль волокон гнутся меньше. Сгибы тоже добавляют жёсткости: складка превращает плоский лист в балку, как гофры внутри картона.',
            'Мы узнали это на собственном опыте. 24 ноября 2026 года наш дизайнер сложил первую бумажную бабочку со сложенным корпусом, которую мы называем K1, из маленьких и больших листов. Выглядела она правильно, но планировала плохо. Крылья сильно гнулись и будто не были связаны с головой. Это было наблюдение одного человека, а не записанное испытание. Затем наша модель подсказала причину: на тонкой бумаге крыло такого размера сильно прогибается на конце под собственной подъёмной силой. Следующая версия, K2, перешла на бумагу 120 г/м² с крыльями вдоль волокон, но и она плохо летала в пробах основателя. Нынешняя версия, K3, отводит крылья назад, как у бумажного дротика, и удваивает их передние кромки для жёсткости. Остальное — в главе 5; записанных полётов K3 пока нет.',
          ],
          tryIt: {
            steps: [
              'Вырежьте из одного листа две полоски шириной 2 см и длиной 15 см: одну вдоль длинной стороны, другую вдоль короткой.',
              'Держите каждую полоску горизонтально за один конец.',
              'Сравните, насколько провисают свободные концы.',
            ],
            lookFor: 'Полоска, которая провисает меньше, идёт вдоль волокон. Складывайте крылья так же.',
          },
          grownUps: [
            'Жёсткость на изгиб растёт как куб толщины, а вес — лишь пропорционально ей. Наша модель берёт типичные модули офисной бумаги в гигапаскалях (ГПа — единица жёсткости): 5–5,5 ГПа вдоль волокон и 2,1–2,5 ГПа поперёк {{estimate}} [[k2-note]].',
            'Для бумажной бабочки размером 172 мм с крыльями вдоль волокон модель предсказывает прогиб конца крыла около 19 мм на бумаге 80 г/м² и около 8 мм на 120 г/м² {{estimate}}. Испытание, которое это проверит, ещё не проведено {{not-yet-measured}}.',
          ],
        },
      },
    },
    {
      id: 'spinning',
      kind: 'explainer',
      figure: null,
      image: { src: 'assets/objects/samara-study.png', ref: 'schaeffer-2024' },
      text: {
        en: {
          title: 'Spinning and rings',
          lead: 'Not everything that flies looks like a plane. A maple seed spins as it falls, and a ring of paper glides.',
          body: [
            'A maple seed has one wing with a heavy seed at its root. As it falls it tips over and starts to spin, like the blade of a helicopter. This is called autorotation. The spinning wing meets the air at an angle, makes lift and slows the fall, which gives the wind time to carry the seed away from its tree.',
            'Scientists have filmed real seeds and large models of them. Each spinning wing carries a small whirl of air along its front edge, and that whirl helps it make more lift than a wing that simply fell flat.',
            'The maple spinner in Chapter 6, plate F2, borrows the idea: one paper wing with a clip at its root. Where the clip sits changes how it spins.',
            'A ring wing is a wing bent into a circle. The ring glider, plate F1, is one sheet folded into a loop with a thick rim at the front. The heavy rim moves the balance point forwards, and the curved sides work as wings and tail at once. Some rings are thrown with a spin, which steadies them in the way it keeps a spinning top upright.',
            'John Collins’s Tube is a well-known spinning ring, shown in one of his WIRED videos. We link to it rather than copy it.',
          ],
          caption: 'Maple samara flight, Fig. 2, by B. M. Schaeffer, S. S. Truman, T. T. Truscott and A. K. Dickerson (2024). Panel a shows the tilt and spin of a falling seed. Original figure · CC BY 4.0.',
          tryIt: {
            steps: [
              'Make the maple spinner from sheet F2.',
              'A tall helper holds it up high, above their head.',
              'They let go without pushing.',
              'Lie on the floor and watch it from below.',
            ],
            lookFor: 'Does it always spin the same way round?',
          },
          grownUps: [
            'Lentink and colleagues showed that maple and other autorotating seeds keep a stable vortex along the leading edge, which raises their lift [[lentink-2009]]. Schaeffer and colleagues measured the tilt and spin of falling maple seeds in a wind tunnel [[schaeffer-2024]].',
            'Wagner built a flight model of a spinning ring wing, the X-Zylo toy, from simulation data and test launches; it matched the experiments in kind rather than in exact numbers [[wagner-2021]]. NASA’s Jet Propulsion Laboratory publishes a classroom ring-glider project [[jpl-ring]], and Collins’s Tube is in his WIRED aerodynamics video [[wired-level-up]].',
          ],
        },
        es: {
          title: 'Giros y anillos',
          lead: 'No todo lo que vuela parece un avión. Una semilla de arce gira al caer, y un anillo de papel planea.',
          body: [
            'Una semilla de arce tiene un ala con una semilla pesada en la base. Al caer, se inclina y empieza a girar, como la pala de un helicóptero. Esto se llama autorrotación. El ala que gira recibe el aire en ángulo, sustenta y frena la caída, lo que da tiempo al viento para alejar la semilla de su árbol.',
            'Los científicos han filmado semillas reales y grandes modelos de ellas. Cada ala que gira lleva un pequeño remolino de aire en su borde delantero, y ese remolino la ayuda a sustentar más que un ala que simplemente cayera plana.',
            'El rotor de arce del capítulo 6, lámina F2, toma la idea: un ala de papel con un clip en la base. Dónde va el clip cambia cómo gira.',
            'Un ala anular es un ala curvada en círculo. El planeador anular, lámina F1, es una hoja plegada en un aro con un borde grueso delante. Ese borde pesado adelanta el punto de equilibrio, y los lados curvos hacen a la vez de alas y cola. Algunos anillos se lanzan girando, lo que los estabiliza igual que mantiene en pie una peonza.',
            'El Tube de John Collins es un anillo giratorio muy conocido, que aparece en uno de sus videos de WIRED. Lo enlazamos en lugar de copiarlo.',
          ],
          caption: 'Vuelo de la sámara de arce, fig. 2, de B. M. Schaeffer, S. S. Truman, T. T. Truscott y A. K. Dickerson (2024). El panel a muestra la inclinación y el giro de una semilla al caer. Figura original · CC BY 4.0.',
          tryIt: {
            steps: [
              'Haz el rotor de arce con la hoja F2.',
              'Una persona alta que ayude lo sostiene en alto, por encima de su cabeza.',
              'Lo suelta sin empujarlo.',
              'Acuéstate en el suelo y míralo desde abajo.',
            ],
            lookFor: '¿Gira siempre en el mismo sentido?',
          },
          grownUps: [
            'Lentink y colaboradores mostraron que el arce y otras semillas en autorrotación mantienen un vórtice estable en el borde de ataque, que aumenta su sustentación [[lentink-2009]]. Schaeffer y colaboradores midieron la inclinación y el giro de semillas de arce en un túnel de viento [[schaeffer-2024]].',
            'Wagner creó un modelo de vuelo de un ala anular giratoria, el juguete X-Zylo, con datos de simulación y lanzamientos de prueba; coincidió con los experimentos en lo cualitativo, no en las cifras exactas [[wagner-2021]]. El Jet Propulsion Laboratory de la NASA publica un proyecto escolar de planeador anular [[jpl-ring]], y el Tube de Collins aparece en su video de aerodinámica de WIRED [[wired-level-up]].',
          ],
        },
        ru: {
          title: 'Вращение и кольца',
          lead: 'Не всё, что летает, похоже на самолёт. Семя клёна вращается при падении, а бумажное кольцо планирует.',
          body: [
            'У семени клёна одно крыло с тяжёлым семечком у основания. Падая, оно наклоняется и начинает вращаться, как лопасть вертолёта. Это называют авторотацией. Вращающееся крыло встречает воздух под углом, создаёт подъёмную силу и замедляет падение, а ветер успевает унести семя подальше от дерева.',
            'Учёные снимали настоящие семена и их большие модели. Каждое вращающееся крыло несёт вдоль передней кромки маленький вихрь, и он помогает создавать больше подъёмной силы, чем у крыла, которое просто падало бы плашмя.',
            'Кленовая вертушка из главы 6, таблица F2, заимствует эту идею: одно бумажное крыло со скрепкой у основания. От места скрепки зависит, как она вращается.',
            'Кольцевое крыло — это крыло, согнутое в круг. Кольцевой планер, таблица F1, — один лист, сложенный в петлю с толстым ободом спереди. Тяжёлый обод сдвигает точку равновесия вперёд, а изогнутые бока работают сразу как крылья и хвост. Некоторые кольца бросают с вращением, и оно придаёт им устойчивость, как волчку.',
            'Tube от John Collins — известное вращающееся кольцо из одного его видео WIRED. Мы даём ссылку, а не копируем его.',
          ],
          caption: 'Полёт крылатки клёна, рис. 2, авторы B. M. Schaeffer, S. S. Truman, T. T. Truscott и A. K. Dickerson (2024). Панель a показывает наклон и вращение падающего семени. Оригинальный рисунок · CC BY 4.0.',
          tryIt: {
            steps: [
              'Сделайте кленовую вертушку из листа F2.',
              'Помощник повыше держит её высоко над головой.',
              'Он отпускает её, не толкая.',
              'Лягте на пол и смотрите на неё снизу.',
            ],
            lookFor: 'Всегда ли она вращается в одну сторону?',
          },
          grownUps: [
            'Lentink и соавторы показали, что семена клёна и другие авторотирующие семена удерживают устойчивый вихрь вдоль передней кромки, повышающий подъёмную силу [[lentink-2009]]. Schaeffer и соавторы измерили наклон и вращение падающих семян клёна в аэродинамической трубе [[schaeffer-2024]].',
            'Wagner построил модель полёта вращающегося кольцевого крыла, игрушки X-Zylo, по данным моделирования и пробных запусков; она совпала с опытами качественно, но не в точных цифрах [[wagner-2021]]. Jet Propulsion Laboratory NASA публикует школьный проект кольцевого планера [[jpl-ring]], а Tube от Collins показан в его видео WIRED об аэродинамике [[wired-level-up]].',
          ],
        },
      },
    },
    {
      id: 'numbers',
      kind: 'explainer',
      figure: 'reynolds',
      text: {
        en: {
          title: 'Thick air: why size matters',
          lead: 'To a small, slow paper plane, air feels thicker and stickier than it does to an airliner. Insects fly in that same thick air.',
          body: [
            'Air is slightly sticky. Wave a spoon through honey and you feel stickiness win. Swing a bat through air and you feel only the air’s weight being shoved aside. Every flying thing feels both, in a mix that depends on its size and speed.',
            'Engineers sum up the mix in one number, the Reynolds number: the speed times the size, divided by how sticky the air is. A big number means the air acts heavy and slippery. A small number means it acts thick and gluey [[nasa-boundary-layer]].',
            'For a paper plane gliding at 3–6 m/s with wings 5–20 cm deep, the Reynolds number is roughly 10,000 to 80,000 {{estimate}}. A paper glider in a Japanese wind tunnel flew at about 12,000 [[nihon-2017]]. Flying insects live between about 10 and 10,000 [[wang-2005]]. An airliner’s wing in cruise is in the tens of millions {{estimate}}. On this scale a paper plane sits right next to the biggest insects, and a very long way from the jets.',
            'That gap is why paper planes do not copy airliners. At low Reynolds numbers a thin wing that is flat or gently curved, with a sharp front edge, works well, and the thick, rounded wing sections of big aircraft lose their advantage.',
            'A paper plane is not a scale model either. Its paper is far thinner, for its size, than any aircraft’s skin and frame, so it carries very little weight on each square metre of wing. That is what lets it fly so slowly, and why a draught in the room matters so much.',
            'This is also why every number in this book carries a state. Physics and models give estimates. Only a launch recorded with its paper, its trim and its conditions gives a measurement.',
          ],
          caption: 'Reynolds numbers on a logarithmic scale. Each band is an estimate from typical speeds and wing depths in air at about 20 °C.',
          tryIt: {
            steps: [
              'Measure the depth of your plane’s wing, front to back, in metres.',
              'Time a gentle glide over 3 m. Divide 3 by the seconds to get its speed.',
              'Multiply the speed by the depth, then by 67,000.',
            ],
            lookFor: 'The answer is roughly your plane’s Reynolds number.',
          },
          grownUps: [
            'Re = ρVL/μ = VL/ν: speed times size, divided by how sticky the air is. Here ν, the kinematic viscosity of air near 20 °C (how sticky air is for its weight), is about 1.5 × 10⁻⁵ m²/s, hence the 67,000 in the box [[nasa-reynolds]].',
            'Wang’s review of insect flight covers Reynolds numbers from 10 to 10⁴ [[wang-2005]]. The Nihon University tunnel test ran at Re = 1.23 × 10⁴, based on the glider’s mean chord, its average depth from front edge to back, of 35.1 mm at 5.11 m/s [[nihon-2017]].',
            'Our bands assume glide speeds of 3–6 m/s and wing depths of 5–20 cm for paper planes, and 2.7 m/s with a depth of about 6 cm for the Monarch butterfly {{estimate}}. The airliner band assumes about 250 m/s, a wing 4–8 m deep and the thinner air of cruise altitude {{estimate}}. None of the paper speeds has been measured yet {{not-yet-measured}}.',
          ],
        },
        es: {
          title: 'Aire espeso: por qué importa el tamaño',
          lead: 'Para un avión de papel pequeño y lento, el aire es más espeso y pegajoso que para un avión de línea. Los insectos vuelan en ese mismo aire espeso.',
          body: [
            'El aire es un poco pegajoso. Mueve una cuchara en la miel y notarás que gana lo pegajoso. Agita un bate en el aire y solo notarás el peso del aire que apartas. Todo lo que vuela siente las dos cosas, en una mezcla que depende de su tamaño y su velocidad.',
            'Los ingenieros resumen esa mezcla en un número, el número de Reynolds: la velocidad por el tamaño, dividido entre lo pegajoso que es el aire. Un número grande significa que el aire se porta pesado y resbaladizo. Uno pequeño, que se porta espeso y pegajoso [[nasa-boundary-layer]].',
            'Para un avión de papel que planea a 3–6 m/s con alas de 5–20 cm de profundidad, el número de Reynolds va de unos 10 000 a 80 000 {{estimate}}. Un planeador de papel en un túnel de viento japonés voló a unos 12 000 [[nihon-2017]]. Los insectos voladores viven entre 10 y 10 000 [[wang-2005]]. El ala de un avión de línea en crucero está en decenas de millones {{estimate}}. En esta escala, un avión de papel queda justo al lado de los insectos más grandes, y muy lejos de los reactores.',
            'Por esa diferencia, los aviones de papel no copian a los de línea. Con números de Reynolds bajos funciona bien un ala fina, plana o algo curva, con el borde delantero afilado, y los perfiles gruesos y redondeados de los aviones grandes pierden su ventaja.',
            'Un avión de papel tampoco es una maqueta a escala. Su papel es, para su tamaño, mucho más fino que el revestimiento y la estructura de cualquier avión, así que lleva muy poco peso por metro cuadrado de ala. Por eso puede volar tan despacio, y por eso importa tanto una corriente de aire en la habitación.',
            'Por eso también cada cifra de este libro lleva un estado. La física y los modelos dan estimaciones. Solo un lanzamiento registrado, con su papel, su ajuste y sus condiciones, da una medición.',
          ],
          caption: 'Números de Reynolds en escala logarítmica. Cada banda es una estimación a partir de velocidades y profundidades de ala típicas, en aire a unos 20 °C.',
          tryIt: {
            steps: [
              'Mide la profundidad del ala de tu avión, de delante atrás, en metros.',
              'Cronometra un planeo suave de 3 m. Divide 3 entre los segundos: es su velocidad.',
              'Multiplica la velocidad por la profundidad y por 67 000.',
            ],
            lookFor: 'Es aproximadamente el número de Reynolds de tu avión.',
          },
          grownUps: [
            'Re = ρVL/μ = VL/ν: velocidad por tamaño, dividido entre lo pegajoso que es el aire. Aquí ν, la viscosidad cinemática del aire a unos 20 °C (lo pegajoso que es el aire para lo que pesa), es de unos 1,5 × 10⁻⁵ m²/s; de ahí el 67 000 del recuadro [[nasa-reynolds]].',
            'La revisión de Wang sobre el vuelo de los insectos abarca números de Reynolds de 10 a 10⁴ [[wang-2005]]. La prueba en el túnel de la Universidad Nihon se hizo a Re = 1,23 × 10⁴, con la cuerda media del planeador (su anchura media de delante a atrás), 35,1 mm, a 5,11 m/s [[nihon-2017]].',
            'Nuestras bandas suponen velocidades de planeo de 3–6 m/s y alas de 5–20 cm de profundidad para los aviones de papel, y 2,7 m/s con unos 6 cm de profundidad para la mariposa Monarch {{estimate}}. La banda del avión de línea supone unos 250 m/s, un ala de 4–8 m de profundidad y el aire más tenue de la altitud de crucero {{estimate}}. Aún no se ha medido ninguna velocidad en papel {{not-yet-measured}}.',
          ],
        },
        ru: {
          title: 'Густой воздух: почему важен размер',
          lead: 'Для маленького медленного бумажного самолёта воздух гуще и липче, чем для лайнера. В таком же густом воздухе летают насекомые.',
          body: [
            'Воздух немного липкий. Поводите ложкой в мёде — и почувствуете, что побеждает липкость. Взмахните битой в воздухе — и почувствуете лишь вес воздуха, который вы отталкиваете. Всё, что летает, чувствует и то и другое, в смеси, которая зависит от размера и скорости.',
            'Инженеры описывают эту смесь одним числом — числом Рейнольдса: скорость, умноженная на размер и делённая на липкость воздуха. Большое число значит, что воздух ведёт себя тяжёлым и скользким. Малое — густым и клейким [[nasa-boundary-layer]].',
            'Для бумажного самолёта, планирующего со скоростью 3–6 м/с, с крыльями глубиной 5–20 см число Рейнольдса примерно от 10 000 до 80 000 {{estimate}}. Бумажный планер в японской аэродинамической трубе летал при числе около 12 000 [[nihon-2017]]. Летающие насекомые живут примерно между 10 и 10 000 [[wang-2005]]. Крыло авиалайнера в крейсерском полёте — это десятки миллионов {{estimate}}. На этой шкале бумажный самолёт стоит рядом с самыми крупными насекомыми и очень далеко от реактивных лайнеров.',
            'Из-за этой разницы бумажные самолёты не копируют лайнеры. При малых числах Рейнольдса хорошо работает тонкое плоское или слегка изогнутое крыло с острой передней кромкой, а толстые закруглённые профили больших самолётов теряют своё преимущество.',
            'Бумажный самолёт — и не уменьшенная копия. Его бумага для его размера намного тоньше обшивки и каркаса любого самолёта, поэтому на каждый квадратный метр крыла приходится очень малый вес. Поэтому он может летать так медленно, и поэтому так важен сквозняк в комнате.',
            'Поэтому же у каждого числа в этой книге есть статус. Физика и модели дают оценки. Только запуск, записанный вместе с бумагой, настройкой и условиями, даёт измерение.',
          ],
          caption: 'Числа Рейнольдса в логарифмическом масштабе. Каждая полоса — оценка по типичным скоростям и глубинам крыла в воздухе при температуре около 20 °C.',
          tryIt: {
            steps: [
              'Измерьте глубину крыла самолёта от передней кромки до задней, в метрах.',
              'Засеките время мягкого планирования на 3 м. Разделите 3 на секунды — это скорость.',
              'Умножьте скорость на глубину, а затем на 67 000.',
            ],
            lookFor: 'Результат — примерное число Рейнольдса вашего самолёта.',
          },
          grownUps: [
            'Re = ρVL/μ = VL/ν: скорость, умноженная на размер и делённая на «липкость» воздуха. Здесь ν — кинематическая вязкость воздуха при 20 °C (насколько воздух «липкий» относительно своей массы), около 1,5 × 10⁻⁵ м²/с; отсюда 67 000 в рамке [[nasa-reynolds]].',
            'Обзор Wang о полёте насекомых охватывает числа Рейнольдса от 10 до 10⁴ [[wang-2005]]. Испытание в трубе Университета Нихон шло при Re = 1,23 × 10⁴ по средней хорде планера (средней ширине крыла от передней кромки до задней) 35,1 мм при 5,11 м/с [[nihon-2017]].',
            'Наши полосы предполагают скорость планирования 3–6 м/с и глубину крыла 5–20 см для бумажных самолётов и 2,7 м/с при глубине около 6 см для бабочки Monarch {{estimate}}. Полоса лайнера предполагает около 250 м/с, крыло глубиной 4–8 м и разреженный воздух крейсерской высоты {{estimate}}. Ни одна из скоростей бумажных моделей ещё не измерена {{not-yet-measured}}.',
          ],
        },
      },
    },
  ],
  references: [
    { id: 'nasa-gliders', label: 'NASA Glenn Research Center, “Gliders”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/gliders/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-forces', label: 'NASA Glenn Research Center, “Four Forces on an Airplane”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/four-forces-on-an-airplane/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-lift', label: 'NASA Glenn Research Center, “What is Lift?”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-lift/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-bernoulli', label: 'NASA Glenn Research Center, “Bernoulli and Newton”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/bernoulli-and-newton/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-equal-transit', label: 'NASA Glenn Research Center, “Equal Transit Theory”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/foilw1/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasm-flat', label: 'Smithsonian National Air and Space Museum, How Things Fly, “Paper airplanes don’t have the classic airfoil shape, so how do they fly?” (2011)', url: 'https://howthingsfly.si.edu/ask-an-explainer/paper-airplanes-dont-have-classic-airfoil-shape-so-how-do-they-fly', reuse: 'cite', checked: '2026-11-25' },
    { id: 'li-2022', label: 'Li, Goodwill, Wang and Ristroph, “Centre of mass location, flight modes, stability and dynamic modelling of gliders”, Journal of Fluid Mechanics 937, A6 (2022), doi:10.1017/jfm.2022.89', url: 'https://www.cambridge.org/core/journals/journal-of-fluid-mechanics/article/centre-of-mass-location-flight-modes-stability-and-dynamic-modelling-of-gliders/D4983A693B836A364D19C95B4D5FFC3B', reuse: 'cc-by-4.0', checked: '2026-11-25' },
    { id: 'nsf-gliders', label: 'US National Science Foundation, Science Matters, “Cool Science: Paper airplanes, insect wings and the future of tiny drones”', url: 'https://www.nsf.gov/science-matters/cool-science-paper-airplanes-insect-wings-future-tiny-drones', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-wing-geometry', label: 'NASA Glenn Research Center, “Wing Geometry Definitions”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/wing-geometry-interactive/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'wired-collins-2018', label: 'WIRED, “How This Guy Folds and Flies World Record Paper Airplanes” with John Collins (2018), video', url: 'https://www.youtube.com/watch?v=3BNg4fDJC8A', reuse: 'cite', checked: '2026-11-25' },
    { id: 'wired-phoenix', label: 'WIRED, “How to Fold the ‘Phoenix’ Paper Airplane” with John Collins (2020), video', url: 'https://www.youtube.com/watch?v=2V55rc58cDg', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-ld', label: 'NASA Glenn Research Center, “Lift to Drag Ratio”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/lift-to-drag-ratio/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'wired-level-up', label: 'WIRED, “Aerodynamics Explained by a World Record Paper Airplane Designer”, Level Up, with John Collins (2020), video', url: 'https://www.youtube.com/watch?v=3KqjRPV9_PY', reuse: 'cite', checked: '2026-11-25' },
    { id: 'k2-note', label: 'Open Flight, “K2 costa butterfly: why K1 does not fly and what changes”, research note, 25 November 2026 (docs/research/butterfly-k2-airframe.md in the source)', url: null, reuse: 'own-cc-by-sa-4.0', checked: '2026-11-25' },
    { id: 'lentink-2009', label: 'Lentink, Dickson, van Leeuwen and Dickinson, “Leading-edge vortices elevate lift of autorotating plant seeds”, Science 324 (2009) 1438–1440, doi:10.1126/science.1174196', url: 'https://doi.org/10.1126/science.1174196', reuse: 'cite', checked: '2026-11-25' },
    { id: 'schaeffer-2024', label: 'Schaeffer, Truman, Truscott and Dickerson, maple samara flight, Communications Biology (2024), Fig. 2', url: 'https://www.nature.com/articles/s42003-024-05913-3/figures/2', reuse: 'cc-by-4.0', checked: '2026-11-25' },
    { id: 'wagner-2021', label: 'Wagner, “Theoretical and Experimental Investigation into the flight of an X-Zylo”, arXiv:2102.02647 (2021)', url: 'https://arxiv.org/abs/2102.02647', reuse: 'cc-by-4.0', checked: '2026-11-25' },
    { id: 'jpl-ring', label: 'NASA Jet Propulsion Laboratory Education, “Make a Paper Glider”', url: 'https://www.jpl.nasa.gov/edu/resources/project/make-a-paper-glider/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-reynolds', label: 'NASA Glenn Research Center, “Reynolds Number Interactive Simulator”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/spcal/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-drag', label: 'NASA Glenn Research Center, “What is Drag?”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-drag/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-boundary-layer', label: 'NASA Glenn Research Center, “Boundary Layer”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/boundary-layer/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-cg', label: 'NASA Glenn Research Center, “Center of Gravity”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/center-of-gravity/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-cp', label: 'NASA Glenn Research Center, “Center of Pressure”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/center-of-pressure/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-rotations', label: 'NASA Glenn Research Center, “Aircraft Rotations”, Beginner’s Guide to Aeronautics', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/aircraft-rotations/', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'faa-glider', label: 'US Federal Aviation Administration, Glider Flying Handbook, FAA-H-8083-13A, chapter 3, “Glide Ratio” and figure 3-10, “Aspect ratio”', url: 'https://www.faa.gov/sites/faa.gov/files/Glider-Flying-Handbook.pdf', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nihon-2017', label: 'Tokuhiro, Kawashima and Ohtake, “Measurement of aerodynamic characteristic of a model paper airplane” (in Japanese), Nihon University College of Science and Technology, proceedings of the 2017 academic lecture meeting, K3-57', url: 'https://www.cst.nihon-u.ac.jp/research/gakujutu/61/pdf/K3-57.pdf', reuse: 'cite', checked: '2026-11-25' },
    { id: 'nasa-shuttle-aero', label: 'NASA Langley Research Center, “The Aeronautics of the Space Shuttle” (2003, updated 2023)', url: 'https://www.nasa.gov/centers-and-facilities/langley/the-aeronautics-of-the-space-shuttle', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'nasa-tn-d7899', label: 'Edwards and colleagues, “Flight performance of a navigation, guidance, and control system concept for automatic approach and landing of the Space Shuttle orbiter”, NASA TN D-7899 (1975)', url: 'https://ntrs.nasa.gov/api/citations/19750008540/downloads/19750008540.pdf', reuse: 'public-domain-check-images', checked: '2026-11-25' },
    { id: 'wang-2005', label: 'Z. Jane Wang, “Dissecting insect flight”, Annual Review of Fluid Mechanics 37 (2005) 183–210, doi:10.1146/annurev.fluid.36.050802.121940', url: 'https://doi.org/10.1146/annurev.fluid.36.050802.121940', reuse: 'cite', checked: '2026-11-25' },
  ],
}

export default chapter
