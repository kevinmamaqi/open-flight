// Registry of plate content and figures. A plate renders without its content
// module (it falls back to the existing field-guide text); each module that lands
// is added here once, so pages, Print & Play and the book read the same source.
import A1 from './plates/A1.js?v=eb901ca27c79'
import A2 from './plates/A2.js?v=eb901ca27c79'
import A3 from './plates/A3.js?v=eb901ca27c79'
import A4 from './plates/A4.js?v=eb901ca27c79'
import A5 from './plates/A5.js?v=eb901ca27c79'
import A6 from './plates/A6.js?v=eb901ca27c79'
import A7 from './plates/A7.js?v=eb901ca27c79'
import A8 from './plates/A8.js?v=eb901ca27c79'
import B1 from './plates/B1.js?v=eb901ca27c79'
import B2 from './plates/B2.js?v=eb901ca27c79'
import B3 from './plates/B3.js?v=eb901ca27c79'
import F1 from './plates/F1.js?v=eb901ca27c79'
import F2 from './plates/F2.js?v=eb901ca27c79'
import F3 from './plates/F3.js?v=eb901ca27c79'
import * as airplane from './figures/airplane.js?v=eb901ca27c79'
import * as butterfly from './figures/butterfly.js?v=eb901ca27c79'
import * as object from './figures/object.js?v=eb901ca27c79'

const plates = { A1, A2, A3, A4, A5, A6, A7, A8, B1, B2, B3, F1, F2, F3 }
const figures = { airplane, butterfly, object }

export const plateContent = id => plates[id] ?? null
export const plateFigure = family => figures[family] ?? null
