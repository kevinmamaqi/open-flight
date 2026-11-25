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
}
export function flightPhysics(model, locale = 'en') {
  return notes[model]?.[{ en: 0, es: 1, ru: 2 }[locale]] ?? ''
}
export function physicsTitle(locale) {
  return { en: 'What the fold changes', es: 'Qué cambia con el pliegue', ru: 'Что меняет сгиб' }[locale]
}
