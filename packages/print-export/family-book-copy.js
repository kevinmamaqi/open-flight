export const themes = {
  sky: { ink: "#143446", wash: "#e2f1f6", accent: "#09657d", wing: "#8fd5e7" },
  sunset: {
    ink: "#4e273c",
    wash: "#fff0de",
    accent: "#983553",
    wing: "#f3a38b",
  },
  meadow: {
    ink: "#224435",
    wash: "#ecf4dc",
    accent: "#2a6840",
    wing: "#b6d682",
  },
};

import { sheetCatalog } from "../../apps/editor/family-sheets.js";
export { sheetName } from "../../apps/editor/family-sheets.js";

export function edition(id) {
  const item = sheetCatalog.find((entry) => entry.id === id);
  return item?.family === "butterfly" ? item.construction.toUpperCase() : "";
}

export const bookCopy = {
  en: {
    title: "Flight Book",
    subtitle: "Choose a wing. Make it together. See where it lands.",
    print: "Before you fly",
    notes: [
      [
        "Print at actual size",
        "Match the printer paper to this book. Select Actual size or 100%, turn off Fit to page and print on one side. Print this page first and measure the line below with a ruler.",
      ],
      [
        "Pick a model and get ready",
        "For butterflies, gather scissors and the clips listed on the pattern. For K2, score the folds with a ruler and an empty ballpoint pen. Ask a grown-up to help cut. Fold a plain airplane sheet whole. For a printed airplane with a thick border, cut along the border first.",
      ],
      [
        "Predict, launch and compare",
        "Point to where you think it will land. Launch away from people and mark where it first touches down. Change one thing and try five launches from the same spot.",
      ],
    ],
    contents: "Your models in print order",
    pageAbbr: "p.",
    ruler: "This line should measure 50 mm (1.97 in).",
    edition: "Home-print edition",
  },
  es: {
    title: "Libro de vuelo",
    subtitle: "Elige un ala. Construid juntos. Mirad dónde aterriza.",
    print: "Antes de volar",
    notes: [
      [
        "Imprime a tamaño real",
        "Usa en la impresora el mismo tamaño de papel que en este libro. Elige Tamaño real o 100 %, desactiva Ajustar a la página e imprime por una cara. Imprime primero esta página y mide con una regla la línea de abajo.",
      ],
      [
        "Elige un modelo y prepárate",
        "Para las mariposas, prepara tijeras y los clips que indica la plantilla. Para K2, marca los dobleces con una regla y un bolígrafo sin tinta. Pide ayuda para recortar. Para un avión, dobla entera la hoja en blanco. Si la plantilla tiene un borde grueso, recorta primero por esa línea.",
      ],
      [
        "Predice, lanza y compara",
        "Señala dónde crees que aterrizará. Lanza lejos de las personas y marca dónde toca el suelo por primera vez. Cambia una sola cosa y haz cinco lanzamientos desde el mismo sitio.",
      ],
    ],
    contents: "Tus modelos en orden de impresión",
    pageAbbr: "pág.",
    ruler: "Esta línea debe medir 50 mm (1,97 pulgadas).",
    edition: "Edición para imprimir en casa",
  },
  ru: {
    title: "Книга полётов",
    subtitle:
      "Выбери крыло, сделай модель вместе со взрослыми и посмотри, куда она приземлится.",
    print: "Перед полётом",
    notes: [
      [
        "Печатай в исходном размере",
        "Выбери в принтере тот же формат бумаги, что и в книге. Включи «Фактический размер» или 100 %, отключи «По размеру страницы» и печатай с одной стороны. Сначала распечатай эту страницу и измерь линию ниже линейкой.",
      ],
      [
        "Выбери модель и подготовься",
        "Для бабочки возьми ножницы и столько скрепок, сколько указано на выкройке. Для K2 наметь сгибы по линейке шариковой ручкой без чернил. Попроси взрослого помочь с вырезанием. Чистый лист для самолёта складывай целиком. Если на выкройке есть толстая рамка, сначала вырежи по ней.",
      ],
      [
        "Угадай, запусти и сравни",
        "Покажи, куда, по-твоему, приземлится модель. Запускай её в сторону от людей и отмечай место первого касания пола. Измени одну вещь и сделай пять запусков с одного места.",
      ],
    ],
    contents: "Твои модели в порядке печати",
    pageAbbr: "с.",
    ruler: "Длина линии должна быть 50 мм (1,97 дюйма).",
    edition: "Издание для домашней печати",
  },
};

export const monarchTrialCopy = {
  en: {
    title: "Monarch flight trial · K1 and K2",
    materials: "Print both Monarchs at 100% on the same uncoated 120 g/m² paper. Check both 50 mm lines. Use scissors for both. K1 needs one small rounded clip. K2 needs two 33 mm clips, a ruler and an empty ballpoint pen.",
    launch: "Use one launcher in still indoor air, with a clear path. From the same mark, give each model a gentle level push at shoulder height. Alternate K1 then K2 for five pairs of launches.",
    measure: "Distance to first touchdown (cm) and flight outcome",
    paper: "Paper brand and grain",
    setup: "Clips and balance point",
    record: "For every attempt, write the distance in cm and whether it glided, dived, stalled or rolled. Keep failed launches. Which build gave the more consistent glide?",
  },
  es: {
    title: "Prueba de vuelo · Monarcas K1 y K2",
    materials: "Imprime ambas monarcas al 100 % en el mismo papel sin estucar de 120 g/m². Comprueba las dos líneas de 50 mm. Usa tijeras para ambas. Para K1, un clip pequeño redondeado. Para K2, dos clips de 33 mm, una regla y un bolígrafo sin tinta.",
    launch: "Una sola persona lanza en un espacio despejado, sin corrientes. Desde la misma marca, impulsa cada modelo en horizontal a la altura del hombro. Alterna K1 y K2 hasta completar cinco pares.",
    measure: "Distancia al primer contacto (cm) y tipo de vuelo",
    paper: "Marca y fibra del papel",
    setup: "Clips y punto de equilibrio",
    record: "En cada intento, anota la distancia en cm y si planeó, picó, entró en pérdida o rodó sobre un ala. Incluye los intentos fallidos. ¿Qué modelo planeó de forma más regular?",
  },
  ru: {
    title: "Полёт монархов K1 и K2",
    materials: "Напечатай обоих монархов в масштабе 100 % на одинаковой немелованной бумаге 120 г/м². Проверь обе линии 50 мм. Для обеих нужны ножницы. Для K1 возьми маленькую скрепку с округлым концом. Для K2 — две скрепки по 33 мм, линейку и шариковую ручку без чернил.",
    launch: "Пусть один человек запускает модели в свободном помещении без сквозняка. С одной отметки мягко толкай модель горизонтально с высоты плеча. Чередуй K1 и K2, пока не сделаешь пять пар запусков.",
    measure: "Расстояние до первого касания (см) и характер полёта",
    paper: "Марка и направление волокон бумаги",
    setup: "Скрепки и точка равновесия",
    record: "Для каждой попытки запиши расстояние в см. Отметь планирование, пикирование, срыв или крен. Сохрани и неудачные запуски. Какая модель планировала устойчивее?",
  },
};

export const flightBookCopy = {
  en: {
    pilot: "Pilot",
    models: "Your fleet",
    fleetIntro:
      "Find your model, gather its tools and turn to its numbered sheets.",
    fleetGuide: (page) =>
      `Use page ${page} whenever a folded-body butterfly (K1) asks for its illustrated steps. The guide works for all K1 species.`,
    pages: "Sheets",
    next: "Keep this page for your next flight.",
    log: "Flight log",
    logIntro:
      "Make a prediction. Try five launches from the same spot. Change one thing, then try five more.",
    example:
      "Try lifting one rear tab or wingtip slightly. Keep the model and launch height the same.",
    model: "Model",
    date: "Date",
    launch: "Launch",
    predict: "Where might it land?",
    land: "Where did it first touch down?",
    change: "What will you change?",
    baseline: "First setup",
    changed: "One change",
    noticed: "What did you notice?",
    certificate: "Pilot certificate",
    award:
      "For building a paper flyer, testing a prediction and recording a landing.",
    signature: "Signature",
    reopen: "Scan to reopen this edition",
    credits:
      "Art and guides · CC BY-SA 4.0   |   Aircraft patterns · CERN-OHL-W-2.0",
    tools: {
      butterfly: "Paper, scissors, clip",
      airplane: "Whole sheet of paper",
      cut: "Paper, scissors",
      k2: "Scissors, two 33 mm clips",
    },
    construction: {
      k1: "Folded body",
      k2: "Folded front edge",
      w1: "Tabs",
      "whole-sheet": "Whole-sheet fold",
      cut: "Cut border",
    },
    difficulty: ["Easy", "Medium", "Challenging"],
    estimate: "Build times are estimates.",
    studio: "Digital studio illustration",
  },
  es: {
    pilot: "Piloto",
    models: "Tu flota",
    fleetIntro:
      "Busca tu modelo, reúne los materiales y ve a las páginas indicadas.",
    fleetGuide: (page) =>
      `Si una mariposa de cuerpo plegado (K1) te remite a los pasos ilustrados, ve a la página ${page}. La guía sirve para todas las especies K1.`,
    pages: "Páginas",
    next: "Guarda esta página para tu próximo vuelo.",
    log: "Diario de vuelo",
    logIntro:
      "Haz una predicción. Lanza cinco veces desde el mismo sitio. Cambia una sola cosa y prueba cinco veces más.",
    example:
      "Prueba a levantar un poco una pestaña trasera o el extremo de un ala. Mantén el mismo modelo y la misma altura de lanzamiento.",
    model: "Modelo",
    date: "Fecha",
    launch: "Lanzamiento",
    predict: "¿Dónde podría aterrizar?",
    land: "¿Dónde tocó el suelo por primera vez?",
    change: "¿Qué vas a cambiar?",
    baseline: "Primer ajuste",
    changed: "Un cambio",
    noticed: "¿Qué observaste?",
    certificate: "Certificado de piloto",
    award:
      "Por construir un modelo de papel, poner a prueba una predicción y registrar un aterrizaje.",
    signature: "Firma",
    reopen: "Escanea para volver a abrir esta edición",
    credits: "Arte y guías · CC BY-SA 4.0   |   Plantillas · CERN-OHL-W-2.0",
    tools: {
      butterfly: "Papel, tijeras, clip",
      airplane: "Hoja entera de papel",
      cut: "Papel, tijeras",
      k2: "Tijeras, dos clips de 33 mm",
    },
    construction: {
      k1: "Cuerpo plegado",
      k2: "Borde delantero plegado",
      w1: "Pestañas",
      "whole-sheet": "Plegado de hoja entera",
      cut: "Borde para recortar",
    },
    difficulty: ["Fácil", "Medio", "Difícil"],
    estimate: "Los tiempos de montaje son orientativos.",
    studio: "Ilustración digital de estudio",
  },
  ru: {
    pilot: "Пилот",
    models: "Твои модели",
    fleetIntro:
      "Найди свою модель, подготовь материалы и открой нужные страницы.",
    fleetGuide: (page) =>
      `Если выкройка бабочки со складным корпусом (K1) отсылает к рисункам, открой с. ${page}. Эта инструкция подходит всем видам K1.`,
    pages: "Страницы",
    next: "Сохрани эту страницу для следующего полёта.",
    log: "Дневник полётов",
    logIntro:
      "Предположи, куда приземлится модель. Сделай пять запусков с одного места. Измени одну вещь и сделай ещё пять.",
    example:
      "Чуть приподними один задний язычок или кончик крыла. Возьми ту же модель и запускай с прежней высоты.",
    model: "Модель",
    date: "Дата",
    launch: "Запуск",
    predict: "Куда может сесть модель?",
    land: "Где модель впервые коснулась пола?",
    change: "Что ты изменишь?",
    baseline: "Исходный вариант",
    changed: "Одно изменение",
    noticed: "Что ты заметил?",
    certificate: "Сертификат пилота",
    award: "За бумажную модель, проверку прогноза и запись о посадке.",
    signature: "Подпись",
    reopen: "Отсканируй, чтобы снова открыть это издание",
    credits:
      "Рисунки и инструкции · CC BY-SA 4.0   |   Выкройки · CERN-OHL-W-2.0",
    tools: {
      butterfly: "Бумага, ножницы, скрепка",
      airplane: "Целый лист бумаги",
      cut: "Бумага, ножницы",
      k2: "Ножницы, две скрепки по 33 мм",
    },
    construction: {
      k1: "Складной корпус",
      k2: "Сложенный передний край",
      w1: "Язычки",
      "whole-sheet": "Сгибы на целом листе",
      cut: "Вырезать рамку",
    },
    difficulty: ["Легко", "Средне", "Сложно"],
    estimate: "Время сборки указано примерно.",
    studio: "Цифровая студийная иллюстрация",
  },
};
