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

import { sheetCatalog } from '../../apps/editor/family-sheets.js'
export { sheetName } from '../../apps/editor/family-sheets.js'

export function edition(id) {
  const item = sheetCatalog.find(entry => entry.id === id)
  return item?.family === 'butterfly' ? item.construction.toUpperCase() : ''
}

export const bookCopy = {
  en: {
    title: "Our family flight book",
    subtitle: "Choose a wing. Make it together. See where it lands.",
    print: "Before you fly",
    notes: [
      [
        "Print at actual size",
        "Match the printer paper to this book. Select Actual size or 100%, turn off Fit to page and print on one side. Print a single model page first and check its scale mark with a ruler.",
      ],
      [
        "Pick a model and get ready",
        "For a butterfly, bring paper, scissors and a paper clip. Ask a grown-up to help with tricky cuts. For an airplane, start with a whole sheet and follow its folding guide.",
      ],
      [
        "Predict, launch and compare",
        "Point to where you think it will land. Launch away from people and mark where it first touches down. Change one thing and try five launches from the same spot.",
      ],
    ],
    contents: "Your models in print order",
    pageAbbr: "p.",
    ruler: "This line should measure 50 mm (1.97 in).",
    edition: "Family workshop",
  },
  es: {
    title: "Nuestro libro de vuelo en familia",
    subtitle: "Elige un ala. Construid juntos. Mirad dónde aterriza.",
    print: "Antes de volar",
    notes: [
      [
        "Imprime a tamaño real",
        "Usa en la impresora el mismo tamaño de papel que en este libro. Elige Tamaño real o 100 %, desactiva Ajustar a la página e imprime por una cara. Imprime primero una página de un modelo y comprueba su marca de escala con una regla.",
      ],
      [
        "Elige un modelo y prepárate",
        "Para una mariposa, necesitas papel, tijeras y un clip. Pídele a una persona adulta que te ayude en los recortes difíciles. Para un avión, empieza con una hoja entera y sigue su guía de plegado.",
      ],
      [
        "Predice, lanza y compara",
        "Señala dónde crees que aterrizará. Lanza lejos de las personas y marca dónde toca el suelo por primera vez. Cambia una sola cosa y haz cinco lanzamientos desde el mismo sitio.",
      ],
    ],
    contents: "Tus modelos en orden de impresión",
    pageAbbr: "pág.",
    ruler: "Esta línea debe medir 50 mm (1,97 pulgadas).",
    edition: "Taller en familia",
  },
  ru: {
    title: "Наша семейная книга полётов",
    subtitle:
      "Выбери крыло, сделай модель вместе со взрослыми и посмотри, куда она приземлится.",
    print: "Перед полётом",
    notes: [
      [
        "Печатай в исходном размере",
        "Выбери в принтере тот же формат бумаги, что и в книге. Включи «Фактический размер» или 100 %, отключи «По размеру страницы» и печатай с одной стороны. Сначала распечатай одну страницу модели и проверь контрольную шкалу линейкой.",
      ],
      [
        "Выбери модель и подготовься",
        "Для бабочки пригодятся бумага, ножницы и скрепка. Попроси взрослого помочь со сложными надрезами. Для самолёта возьми целый лист и складывай его по инструкции.",
      ],
      [
        "Угадай, запусти и сравни",
        "Покажи, куда, по-твоему, приземлится модель. Запускай её в сторону от людей и отмечай место первого касания пола. Измени одну вещь и сделай пять запусков с одного места.",
      ],
    ],
    contents: "Твои модели в порядке печати",
    pageAbbr: "с.",
    ruler: "Длина линии должна быть 50 мм (1,97 дюйма).",
    edition: "Семейная мастерская",
  },
};
