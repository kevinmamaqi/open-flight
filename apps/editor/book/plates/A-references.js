// Sources shared by the airplane plates A1–A8. Cite and link; never reproduce third-party diagrams.
// Reuse status per evidence/2026-11-25-book-orientation/02-references.md §3.
// Editor: confirm the Torres and Mueller DOI and the Polhamus NTRS record before print.
const w = (en, es, ru) => ({ en, es, ru })
const glenn = (page, label, note) => ({
  label: 'NASA Glenn Research Center · Beginner’s Guide to Aeronautics: ' + label,
  url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/' + page + '/',
  note,
})
export const references = {
  forces: glenn('four-forces-on-an-airplane', 'Four forces on an airplane', w('Weight, lift, drag and thrust.', 'Peso, sustentación, resistencia y empuje.', 'Вес, подъёмная сила, сопротивление и тяга.')),
  cg: glenn('aircraft-center-of-gravity', 'Aircraft center of gravity', w('Where the weight acts, and how to find it.', 'Dónde actúa el peso y cómo encontrarlo.', 'Где действует вес и как его найти.')),
  elevator: glenn('aircraft-elevator-interactive', 'Aircraft elevator', w('How a raised back edge pitches the nose up.', 'Cómo un borde trasero levantado sube el morro.', 'Как поднятая задняя кромка поднимает нос.')),
  gliders: glenn('gliders', 'Gliders', w('Flight with no engine: weight against drag.', 'Vuelo sin motor: el peso contra la resistencia.', 'Полёт без двигателя: вес против сопротивления.')),
  wing: glenn('wing-geometry', 'Wing geometry', w('Span, area, aspect ratio and dihedral.', 'Envergadura, superficie, alargamiento y diedro.', 'Размах, площадь, удлинение и поперечное V.')),
  rotations: glenn('aircraft-rotations', 'Aircraft rotations', w('Pitch, roll and yaw.', 'Cabeceo, alabeo y guiñada.', 'Тангаж, крен и рыскание.')),
  exploratorium: {
    label: 'Exploratorium · Paper Airplanes, page 2',
    url: 'https://annex.exploratorium.edu/exploring/paper/airplanes2.html',
    note: w('Balance ahead of the lift, nose folds and a bent-up back edge.', 'El equilibrio por delante de la sustentación, los pliegues del morro y el borde trasero levantado.', 'Центр тяжести впереди подъёмной силы, сгибы носа и отогнутая вверх задняя кромка.'),
  },
  ristroph: {
    label: 'Li, Goodwill, Wang and Ristroph (2022), Centre of mass location, flight modes, stability and dynamic modelling of gliders, Journal of Fluid Mechanics 937, A6',
    url: 'https://www.cambridge.org/core/journals/journal-of-fluid-mechanics/article/centre-of-mass-location-flight-modes-stability-and-dynamic-modelling-of-gliders/D4983A693B836A364D19C95B4D5FFC3B',
    note: w('Moving the weight of a thin plate changes how it flies: tumble, glide or dive. CC BY 4.0.', 'Mover el peso de una placa fina cambia su vuelo: da vueltas, planea o cae en picado. CC BY 4.0.', 'Смещение груза на тонкой пластине меняет полёт: кувыркание, планирование или пике. CC BY 4.0.'),
  },
  torres: {
    label: 'G. E. Torres and T. J. Mueller (2004), Low-aspect-ratio wing aerodynamics at low Reynolds numbers, AIAA Journal 42(5)',
    url: 'https://doi.org/10.2514/1.439',
    note: w('Measured lift and centre of pressure of short, broad wings at paper-plane speeds.', 'Sustentación y centro de presiones medidos en alas cortas y anchas a velocidades de avión de papel.', 'Измеренные подъёмная сила и центр давления коротких широких крыльев на скоростях бумажных самолётов.'),
  },
  polhamus: {
    label: 'E. C. Polhamus (1966), A concept of the vortex lift of sharp-edge delta wings based on a leading-edge-suction analogy, NASA TN D-3767',
    url: 'https://ntrs.nasa.gov/citations/19670003842',
    note: w('Extra lift from the vortices over sharp edges.', 'La sustentación extra de los vórtices sobre bordes afilados.', 'Дополнительная подъёмная сила вихрей над острыми кромками.'),
  },
}
