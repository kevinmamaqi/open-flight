const notes = {
  monarch: [
    'Widening the pattern increases its wing area while the body length stays the same. Airspeed, wing angle and weight all affect the lift it needs. Try two spans and mark where each glide ends.',
    'Al ensanchar la plantilla aumenta la superficie de las alas y el cuerpo conserva su longitud. La velocidad del aire, el ángulo del ala y el peso influyen en el planeo. Prueba dos envergaduras y marca los aterrizajes.',
    'При увеличении размаха растёт площадь крыльев, а длина корпуса сохраняется. На планирование влияют скорость, угол крыла и вес. Испытай два размаха и отметь места посадки.',
  ],
  morpho: [
    'Seen from the front, its wings form the steepest V of the three templates. Angled wings can respond differently to sideways airflow. Check both wingtip heights before looking for a tendency to roll.',
    'Vistas de frente, sus alas forman la V más marcada de las tres plantillas. Las alas inclinadas pueden responder de forma distinta al aire que llega de lado. Comprueba la altura de ambas puntas antes de observar si se inclina.',
    'Спереди у этой модели самая крутая буква V из трёх шаблонов. При боковом обтекании наклонённые крылья могут по-разному взаимодействовать с воздухом. Перед опытом сравни высоту законцовок.',
  ],
  swallowtail: [
    'The long tails are part of the outline. Bend one of the smaller tabs inboard of them and the two wings meet the air differently. Track the first bank and the landing separately.',
    'Las colas largas forman parte del contorno. Dobla una de las aletas más pequeñas junto al cuerpo y las dos alas presentarán formas distintas al aire. Anota por separado hacia dónde se inclina al principio y dónde aterriza.',
    'Длинные хвостики входят в контур. Если загнуть один из небольших язычков ближе к корпусу, воздух будет по-разному обтекать крылья. Запиши отдельно начальный крен и место посадки.',
  ],
  'boeing-747': [
    'The pleat stacks paper at the nose. A deeper body fold leaves less paper spread out as wing, but it runs from nose to tail. Predict first: will the balance point move? Balance each copy on a pencil to check, and watch whether the nose rises or drops after release.',
    'El pliegue superpone capas en el morro. Un pliegue de fuselaje más profundo deja menos papel extendido como ala. Mide el punto de equilibrio de cada copia y observa si el morro sube o baja tras soltarla.',
    'Складка собирает слои бумаги у носа. Более глубокий сгиб корпуса оставляет меньше бумаги на расправленные крылья. Измерь точку равновесия каждого самолёта и посмотри, поднимается ли нос после запуска.',
  ],
  'douglas-dc3': [
    'The doubled leading edge reinforces the front of each broad wing. A bent or twisted leading edge can change the angle at which the air meets that wing. Sight across both edges before comparing your launches.',
    'El borde delantero doble refuerza la parte frontal del ala ancha. Si se tuerce, cambia el ángulo con que el aire llega a esa ala. Mira ambos bordes de frente antes de comparar lanzamientos.',
    'Двойной передний край укрепляет широкое крыло. Если он перекручен, меняется угол, под которым воздух встречает крыло. Перед запусками посмотри на оба края спереди.',
  ],
  'tupolev-tu144': [
    'The swept folds distribute wing area differently along the body. Air forces acting ahead of or behind the balance point can pitch the nose. Compare it with the broader DC-3 fold at the same release height.',
    'Los pliegues en flecha distribuyen la superficie del ala de otra forma a lo largo del cuerpo. Las fuerzas del aire por delante o por detrás del punto de equilibrio pueden hacer girar el morro. Compara con el DC-3 desde la misma altura.',
    'Стреловидные сгибы по-другому распределяют площадь крыла вдоль корпуса. Силы воздуха впереди или позади точки равновесия могут наклонить нос. Сравни с более широким DC-3 при одинаковой высоте запуска.',
  ],
  'ilyushin-il62': [
    'Turning both tips up changes the area facing sideways. If one tip is bent more, the two sides can feel different forces. Compare equal tips first, then change one fold and track the first sideways motion.',
    'Doblar las puntas hacia arriba cambia la superficie expuesta al aire lateral. Si una punta queda más doblada, los dos lados pueden recibir fuerzas distintas. Prueba primero con puntas iguales y observa el primer movimiento lateral.',
    'Загнутые законцовки меняют площадь, обращённую вбок. При разных загибах силы на двух сторонах могут отличаться. Сначала выровняй законцовки и отметь первое движение в сторону.',
  ],
  'red-dart': [
    'Almost all of the paper becomes body. With so little wing it carries several times more weight per square centimetre than the gliders, so it keeps the speed of a hard throw instead of climbing and slowing. The wraps stack paper at the nose, so it points along its path like an arrow.',
    'Casi todo el papel se convierte en cuerpo. Con tan poca ala lleva varias veces más peso por centímetro cuadrado que los planeadores, así que conserva la velocidad de un lanzamiento fuerte en lugar de subir y frenarse. Las vueltas acumulan papel en la punta y lo hacen ir recto como una flecha.',
    'Почти вся бумага уходит в корпус. Крыла так мало, что на каждый квадратный сантиметр приходится в несколько раз больше веса, чем у планёров: самолёт сохраняет скорость сильного броска, а не взмывает и тормозит. Обороты собирают бумагу у носа, и он летит прямо, как стрела.',
  ],
  'shaheen-shin': [
    'The rolled bar puts weight at the front, so a hard throw sends it straight up instead of looping. At the top the short, wide wing glides slowly, and the tip fins act as its tail, keeping it pointed into the air.',
    'La barra enrollada pone peso delante, así que un lanzamiento fuerte lo hace subir recto en lugar de dar una vuelta. Arriba, el ala corta y ancha planea despacio y las aletas de las puntas hacen de cola para mantenerlo de cara al aire.',
    'Скатанный валик добавляет вес спереди, поэтому после сильного броска самолёт идёт прямо вверх, а не делает петлю. Наверху короткое широкое крыло медленно планирует, а кили на концах работают как хвост и держат его носом к потоку.',
  ],
  'crescent-boomerang': [
    'Thrown with its wings vertical, all of its lift points sideways, so it flies round a circle. The size of the circle depends on its weight, its wing area and how hard the wing works, which the bent-up tail sets, not on how hard you throw.',
    'Si lo lanzas con las alas en vertical, toda su sustentación apunta hacia un lado y vuela en círculo. El tamaño del círculo depende de su peso, de la superficie del ala y de cuánto trabaja el ala, que fija la cola levantada, no de la fuerza del lanzamiento.',
    'Если бросить модель с вертикальными крыльями, вся подъёмная сила направлена вбок, и она летит по кругу. Размер круга зависит от веса, площади крыла и того, насколько сильно работает крыло — это задаёт поднятый хвост, а не сила броска.',
  ],
  'sky-king': [
    'The squashed nose stacks layers at the front and survives hard launches. Swept edges and two fins at the back keep it pointed into the air, and curling the back edges up holds the nose up so it glides instead of diving.',
    'La punta aplastada acumula capas delante y aguanta los lanzamientos fuertes. Los bordes en flecha y las dos aletas de atrás lo mantienen de cara al aire, y levantar los bordes de atrás sostiene la punta para que planee en vez de caer en picado.',
    'Расплющенный нос собирает слои спереди и выдерживает сильные броски. Стреловидные кромки и два киля сзади держат самолёт носом к потоку, а поднятые задние кромки не дают носу опуститься, и он планирует, а не пикирует.',
  ],
}
export function flightPhysics(model, locale = 'en') {
  return notes[model]?.[{ en: 0, es: 1, ru: 2 }[locale]] ?? ''
}
export function physicsTitle(locale) {
  return { en: 'What the fold changes', es: 'Qué cambia con el pliegue', ru: 'Что меняет сгиб' }[locale]
}
