import { color, dash } from './assets/brand/tokens.js?v=48cc97ad30d5';
const ids = ['cut', 'center', 'wings', 'table', 'clip', 'launch'];
const copy = {
  en: [
    ['Cut out your butterfly', 'Start with the colors up and the nose pointing away. Cut only around the outside edge. Keep the paper between the wings whole. Ask a helper to cut around the tight corners.', 'The butterfly is one piece, with three fold lines down the middle.'],
    ['Bring the wingtips together', 'Lift both wings until the tips meet and the colored faces touch. Pinch the dotted center crease from nose to tail.', 'The tips line up and the colors are inside.'],
    ['Fold each wing back', 'Ask a helper to pinch the folded strip, or hold it with one hand. Fold one whole wing out along its dash-dot line, then the other.', 'Each wing has its own crease, and the two layers of the strip still touch.'],
    ['Set the wings flat', 'Place the butterfly color-side down on a flat table. Keep the folded strip standing straight up as you gently press both wings onto the table.', 'Both wings touch the table. The folded strip stands between them.'],
    ['Turn over and add the clip', 'Turn it color-side up, with the folded strip underneath. Slide a small rounded paper clip (about 6–8 mm wide) onto the nose so it grips both layers. Look from the side and stop with the back of the clip directly under the dots by the folds.', 'The clip holds both layers. Both wings sit at the same height.'],
    ['Let it glide', 'Hold the folded strip just behind the clip. Point the nose straight ahead with both wings level, then let go with a gentle forward push.', 'Watch where it touches down first. Point to that spot, or mark it and compare five launches.'],
  ],
  es: [
    ['Recorta tu mariposa', 'Pon los colores hacia arriba y apunta la punta hacia delante. Recorta solo el borde de fuera. Deja entera la parte entre las alas. Pide ayuda para recortar las esquinas más cerradas.', 'La mariposa queda en una sola pieza, con tres líneas de doblez en el centro.'],
    ['Junta las puntas de las alas', 'Levanta las dos alas hasta juntar sus puntas y las caras de color. Marca con los dedos el doblez central de puntos, de la punta a la cola.', 'Las puntas coinciden y el color queda dentro.'],
    ['Dobla cada ala hacia fuera', 'Pide ayuda para sujetar la tira doblada o sujétala con una mano. Dobla un ala entera hacia fuera por su línea de rayas y puntos, y luego la otra.', 'Cada ala tiene su propio doblez y las dos capas de la tira siguen juntas.'],
    ['Apoya las alas en la mesa', 'Pon la mariposa con el color hacia abajo sobre una mesa plana. Mantén la tira doblada de pie y presiona suavemente las dos alas contra la mesa.', 'Las dos alas tocan la mesa. La tira doblada queda de pie entre ellas.'],
    ['Dale la vuelta y pon el clip', 'Dale la vuelta para dejar el color arriba y la tira doblada debajo. Desliza un clip pequeño y redondeado (de unos 6–8 mm de ancho) en la punta, abrazando las dos capas. Mira de lado y deja el extremo trasero del clip justo debajo de los puntos junto a los dobleces.', 'El clip agarra las dos capas. Las alas quedan a la misma altura.'],
    ['Deja que planee', 'Sujeta la tira doblada justo detrás del clip. Apunta la punta hacia delante con las alas a la misma altura, y suelta la mariposa con un empujón suave.', 'Mira dónde toca el suelo por primera vez. Señala ese lugar, o márcalo y compara cinco lanzamientos.'],
  ],
  ru: [
    ['Вырежи бабочку', 'Положи лист цветной стороной вверх, носом от себя. Вырежи бабочку только по внешнему краю. Оставь бумагу между крыльями целой. Попроси взрослого помочь с крутыми поворотами.', 'Бабочка осталась целой, а в центре видны три линии сгиба.'],
    ['Соедини кончики крыльев', 'Подними оба крыла, чтобы их кончики совпали, а цветные стороны соприкоснулись. Прижми пальцами сгиб по точкам от носа до хвоста.', 'Кончики совпадают, цветные стороны внутри.'],
    ['Отогни каждое крыло', 'Попроси взрослого придержать сложенную полоску или зажми её одной рукой. Отогни одно крыло целиком наружу по линии из штрихов и точек, потом второе.', 'У каждого крыла свой сгиб, а слои полоски прижаты друг к другу.'],
    ['Уложи крылья на стол', 'Положи бабочку цветной стороной вниз на ровный стол. Держи сложенную полоску торчком и мягко прижми оба крыла к столу.', 'Оба крыла касаются стола. Сложенная полоска стоит между ними.'],
    ['Переверни и надень скрепку', 'Переверни бабочку цветной стороной вверх, чтобы сложенная полоска оказалась снизу. Надень на нос маленькую закруглённую скрепку шириной около 6–8 мм, захватив оба слоя. Посмотри сбоку. Задний край скрепки должен быть прямо под точками у сгибов.', 'Скрепка держит оба слоя. Крылья на одной высоте.'],
    ['Отпусти бабочку в полёт', 'Держи сложенную полоску сразу за скрепкой. Направь нос прямо перед собой, выровняй крылья и отпусти бабочку лёгким толчком вперёд.', 'Заметь, где бабочка впервые коснулась пола. Покажи это место или отметь его и сравни пять запусков.'],
  ],
};

const labels = {
  en: { pattern: 'Printed side up', center: 'Center fold', wings: 'Wing folds', rear: 'From tail toward nose', side: 'Side view', start: 'Start', finish: 'Finish', table: 'Table', strip: 'Folded strip', mark: 'Back of clip', grip: 'Hold here', nose: 'Nose', mm: 'mm' },
  es: { pattern: 'Color hacia arriba', center: 'Doblez central', wings: 'Dobleces de las alas', rear: 'De la cola a la punta', side: 'Vista lateral', start: 'Inicio', finish: 'Final', table: 'Mesa', strip: 'Tira doblada', mark: 'Parte trasera del clip', grip: 'Sujeta aquí', nose: 'Punta', mm: 'mm' },
  ru: { pattern: 'Цветом вверх', center: 'Сгиб в центре', wings: 'Сгибы крыльев', rear: 'Вид от хвоста к носу', side: 'Вид сбоку', start: 'Начало', finish: 'Конец', table: 'Стол', strip: 'Сложенная полоска', mark: 'Задний край скрепки', grip: 'Держи здесь', nose: 'Нос', mm: 'мм' },
};

export function keelSteps(locale = 'en') {
  const steps = Object.hasOwn(copy, locale) ? copy[locale] : copy.en;
  return steps.map(([title, action, check], index) => ({ id: ids[index], title, action, check }));
}

// Fold notation from the design tokens: valley dashed, mountain dash-dot, arrows in the diagram ink.
const ink = color.diagramInk;
const alignment = color.lineValley;
const motion = color.diagramArrow;
const centerDash = dash.valley;
const wingDash = dash.mountain;
const stripFill = color.diagramBack;
const escapeXml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const point = ([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`;
const path = (points) => `M ${points.map(point).join(' L ')}`;
const label = (x, y, words, align = 'middle') =>
  `<text x="${x}" y="${y}" text-anchor="${align}">${escapeXml(words)}</text>`;
const crease = (points, dash) =>
  `<path d="${path(points)}" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-dasharray="${dash}"/>`;

function arrow(start, control, end) {
  const angle = Math.atan2(end[1] - control[1], end[0] - control[0]);
  const head = [-0.52, 0.52].map((spread) => [
    end[0] - Math.cos(angle + spread) * 9,
    end[1] - Math.sin(angle + spread) * 9,
  ]);
  return `<path d="M ${point(start)} Q ${point(control)} ${point(end)} M ${point(head[0])} L ${point(end)} L ${point(head[1])}" fill="none" stroke="${motion}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function pattern(flatSvg, words) {
  const figure = flatSvg
    .replace('<svg ', '<svg x="20" y="25" width="360" height="184" aria-hidden="true" ')
    .replaceAll(' id="', ' id="lesson-');
  return `${label(200, 17, words.pattern)}
    ${figure}
    ${crease([[20, 223], [46, 223]], centerDash)}${label(53, 228, words.center, 'start')}
    ${crease([[211, 223], [237, 223]], wingDash)}${label(244, 228, words.wings, 'start')}`;
}

// The rear section keeps its original three hinge axes. The wing and each half of
// the strip rotate independently around the center valley and wing mountains.
// The paper thickness is exaggerated so the two layers can be distinguished.
function rearSection(x, y, halfWidth, stripAngle, wingAngle, inverted, color, stripDepth) {
  const direction = inverted ? 1 : -1;
  const creaseY = y + direction * stripDepth * Math.sin(stripAngle);
  const rootDistance = Math.max(2, stripDepth * Math.cos(stripAngle));
  return [-1, 1].map((side) => {
    const root = [x + side * rootDistance, creaseY];
    const tip = [root[0] + side * halfWidth * Math.cos(wingAngle), creaseY + direction * halfWidth * Math.sin(wingAngle)];
    const printedFace = [root, tip].map(([px, py]) => [
      px - 1.3 * side * Math.sin(wingAngle),
      py + 1.3 * direction * Math.cos(wingAngle),
    ]);
    return `<path d="${path([[x, y], root])}" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="${path([root, tip])}" fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>
      <path d="${path([root, tip])}" fill="none" stroke="${color.diagramFront}" stroke-width="3.4" stroke-linecap="round"/>
      <path d="${path(printedFace)}" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round"/>`;
  }).join('');
}

function foldDiagram(step, words, color, stripDepth) {
  const half = Math.PI / 2;
  const center = step === 1;
  return `${label(200, 30, words.rear)}
    ${label(100, 69, words.start)}${label(300, 69, words.finish)}
    <path d="M200 55v145" stroke="${color.rule}"/>
    ${rearSection(100, 174, 62, center ? 0 : half, center ? 0 : half, false, color, stripDepth)}
    ${rearSection(300, 174, 62, half, center ? half : 0, false, color, stripDepth)}
    ${center ? `
      ${arrow([31, 162], [31, 129], [64, 113])}${arrow([169, 162], [169, 129], [136, 113])}
      ${crease([[100, 182], [100, 200]], centerDash)}${label(100, 219, words.center)}
    ` : `
      ${arrow([91, 101], [55, 96], [43, 132])}${arrow([109, 101], [145, 96], [157, 132])}
      ${crease([[74, 169], [91, 160]], wingDash)}${crease([[126, 169], [109, 160]], wingDash)}
      ${label(100, 219, words.wings)}
    `}`;
}

function tableDiagram(words, color, stripDepth) {
  return `${label(200, 30, words.rear)}
    <path d="M28 145 H372 V186 H28 Z" fill="${stripFill}"/>
    <path d="M28 145 H372" stroke="${ink}" stroke-width="2"/>
    ${rearSection(200, 145 - stripDepth, 121, Math.PI / 2, 0, true, color, stripDepth)}
    ${arrow([75, 83], [75, 102], [75, 125])}${arrow([325, 83], [325, 102], [325, 125])}
    <path d="M200 117V89" fill="none" stroke="${ink}" stroke-width="1.4"/>
    ${label(200, 82, words.strip)}${label(200, 173, words.table)}`;
}

function finishedDiagram(step, words, plan, color, stripDepth) {
  const launch = step === 5;
  const x = 82;
  const y = 143;
  const scale = Math.min(3.15, 280 / plan.body_length_mm);
  const stop = x + plan.clip_station_mm * scale;
  const tail = x + plan.body_length_mm * scale;
  const depth = plan.keel_depth_mm * scale;
  const focus = launch ? stop + 32 : stop;
  return `${label(200, 27, words.rear)}
    ${rearSection(200, 86, 110, Math.PI / 2, 0, false, color, stripDepth)}
    <path d="M196 75v10q4 10 8 0v-10" fill="none" stroke="${motion}" stroke-width="2.4"/>
    ${label(200, 121, words.side)}
    <path d="${path([[x, y], [tail, y], [tail, y + depth], [x, y + depth]])} Z" fill="${stripFill}" stroke="${ink}" stroke-width="1.8"/>
    <path d="M${x} ${y}H${tail}" stroke="${color}" stroke-width="4"/>
    ${launch ? '' : `<circle cx="${stop}" cy="${y}" r="3" fill="${alignment}"/><path d="M${stop} ${y + 4}v15" stroke="${alignment}" stroke-dasharray="2 2"/>`}
    <path d="M${stop} ${y + 18}H${x + 3}a6 6 0 0 1 0 -12h${stop - x - 10}a3 3 0 0 1 0 6h-${stop - x - 17}" fill="none" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
    ${launch ? `<circle cx="${focus}" cy="${y + 13}" r="7" fill="${motion}"/>${arrow([74, 155], [56, 155], [34, 155])}` : `${arrow([31, 155], [52, 155], [74, 155])}`}
    <path d="M${focus} 171v18h9" fill="none" stroke="${ink}" stroke-width="1.4"/>
    ${label(focus + 13, 194, launch ? words.grip : words.mark, 'start')}
    ${launch ? label(x - 3, 124, words.nose) : `<path d="M${x} 209v8m0-4h${stop - x}m0-4v8" stroke="${ink}"/>${label(stop + 10, 218, `${plan.clip_station_mm} ${words.mm}`, 'start')}`}`;
}

export function keelDiagram(plan, stepIndex, color, flatSvg) {
  const language = plan.locale;
  const step = Number.isInteger(stepIndex) && stepIndex >= 0 && stepIndex < ids.length ? stepIndex : 0;
  const words = labels[language];
  const { title, action, check } = plan.steps[step];
  const stripDepth = 1.875 * plan.keel_depth_mm;
  let drawing;
  if (step === 0) drawing = pattern(flatSvg(), words);
  else if (step < 3) drawing = foldDiagram(step, words, color, stripDepth);
  else if (step === 3) drawing = tableDiagram(words, color, stripDepth);
  else drawing = finishedDiagram(step, words, plan, color, stripDepth);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" role="img" lang="${language}" aria-label="${escapeXml(`${title}. ${action} ${check}`)}" font-family="system-ui, sans-serif" font-size="14" fill="${ink}">
    <title>${escapeXml(title)}</title>
    <rect width="400" height="240" rx="12" fill="${color.surface}"/>
    ${drawing}
  </svg>`;
}
