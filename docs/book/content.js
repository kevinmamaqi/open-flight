// Registry of plate content and figures. A plate renders without its content
// module (it falls back to the existing field-guide text); each module that lands
// is added here once, so pages, Print & Play and the book read the same source.
import A1 from './plates/A1.js?v=827c6a6b1e8f'
import A2 from './plates/A2.js?v=827c6a6b1e8f'
import A3 from './plates/A3.js?v=827c6a6b1e8f'
import A4 from './plates/A4.js?v=827c6a6b1e8f'
import B1 from './plates/B1.js?v=827c6a6b1e8f'
import B2 from './plates/B2.js?v=827c6a6b1e8f'
import B3 from './plates/B3.js?v=827c6a6b1e8f'
import F1 from './plates/F1.js?v=827c6a6b1e8f'
import F2 from './plates/F2.js?v=827c6a6b1e8f'
import F3 from './plates/F3.js?v=827c6a6b1e8f'
import * as airplane from './figures/airplane.js?v=827c6a6b1e8f'
import * as butterfly from './figures/butterfly.js?v=827c6a6b1e8f'
import * as object from './figures/object.js?v=827c6a6b1e8f'

const plates = { A1, A2, A3, A4, B1, B2, B3, F1, F2, F3 }
const figures = { airplane, butterfly, object }

export const plateContent = id => plates[id] ?? null
export const plateFigure = family => figures[family] ?? null
