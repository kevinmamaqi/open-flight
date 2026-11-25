# Open Flight · Taller de vuelo en papel

Elige un planeador de papel, cambia un doblez y observa dónde aterriza. El taller es gratuito y funciona en el navegador. Está pensado para niñas y niños de 5 a 12 años, sus familias y sus docentes. Puedes guardar tus diseños en el dispositivo y descargar hojas para imprimir y guías ilustradas. [Abrir el taller en español](https://kevinmamaqi.github.io/open-flight/es.html) · [English](README.md) · [По-русски](README.ru.md)

Pliega un anillo, deja caer una semilla de papel o monta un planeador de dos pares de alas inspirado en un libro de 1918. El taller incluye tres hojas para imprimir, dibujos SVG editables y los créditos de cada actividad. [Objetos voladores](https://kevinmamaqi.github.io/open-flight/flight-objects.html?lang=es) · [Fuentes y permisos (en inglés)](guides/unusual-flyer-sources.md)

Imprime las dos monarcas en el mismo papel de 120 g/m². Alterna cinco lanzamientos con cada modelo y anota todos los resultados. La prueba se abre en el diario. La página 2 indica los clips y la 3 indica dónde está cada plantilla. [Abrir la prueba K1/K2](https://kevinmamaqi.github.io/open-flight/book.html?lang=es&p=4#m=monarch-k1,monarch-k2&paper=a4) · [PDF en A4](https://kevinmamaqi.github.io/open-flight/trials/monarch-k1-k2-A4-es.pdf) · [PDF en Carta](https://kevinmamaqi.github.io/open-flight/trials/monarch-k1-k2-US_LETTER-es.pdf)

Elige las actividades que quieras para tu Libro de vuelo o imprime las tres para cada equipo de clase. El kit contiene los patrones editables de los modelos experimentales. [Descargar el kit de objetos voladores](https://github.com/kevinmamaqi/open-flight/releases/download/v0.9.2/open-flight-flying-objects.zip)

Hojea el Libro de vuelo. Elige un modelo para probar sus colores y decide si quieres ponerlo en la portada o incluir su plantilla. El mapa interactivo muestra dónde vive una mariposa o dónde voló por primera vez un avión. Las fichas imprimibles citan museos e instituciones de historia natural e incluyen relatos de Yuri Gagarin y John Glenn. Elige A4 o Carta, mide el tramo de 50 mm de la página 2 e imprime las plantillas a tamaño real. [Abrir el Libro de vuelo](https://kevinmamaqi.github.io/open-flight/book.html?lang=es) · [Fuentes y fotografías del atlas](guides/flight-book-origins.md) · [Ilustraciones y tipografías](guides/flight-book-art.md)

La guía gratuita para el aula calcula páginas y copias para cada equipo. El ejemplo inicial reúne a 30 estudiantes en parejas. Imprime la guía, comparte el PDF del libro desde el móvil si aparece esa opción o envía a la copistería el PDF junto con las instrucciones de impresión. Imprime por una cara al 100 % y comprueba la línea de 50 mm antes de hacer las copias. [Guía para el aula y la copistería](https://kevinmamaqi.github.io/open-flight/classroom.html?lang=es)

En el taller de mariposas puedes cambiar entre dos construcciones. El laboratorio de motores incluye las referencias originales, los archivos para las primeras pruebas eléctricas y una montura de papel. [Taller de mariposas](https://kevinmamaqi.github.io/open-flight/studio.html?lang=es) · [Laboratorio de motores](https://kevinmamaqi.github.io/open-flight/motor.html?lang=es)

| Qué puedes hacer | Qué necesitas | Qué puedes cambiar |
| --- | --- | --- |
| Mariposa con cuerpo plegado | Una plantilla K1, tijeras, regla y un clip pequeño | Junta las puntas, pliega el cuerpo de dos capas y apoya las alas en la mesa. Elige la envergadura y los colores. [Construir K1](https://kevinmamaqi.github.io/open-flight/studio.html?construction=k1&species=monarch&lang=es) |
| Una mariposa original monarca, morfo azul o cola de golondrina (macaón) | Una hoja con la plantilla impresa, tijeras y un clip pequeño de puntas redondeadas | El ancho de las alas, los colores y las dos aletas de cola. Sigue los dibujos para recortar y doblar. Lanza y compara dónde toca el suelo. |
| Un avión inspirado en el Boeing 747, el Douglas DC-3, el Tupolev Tu-144 o el Ilyushin Il-62 | Una hoja entera A4 o tamaño carta | La profundidad del cuerpo, los dobleces en los extremos de las alas y los colores. Sigue los dibujos paso a paso. Puedes doblarlo sin impresora. |

Imprime al 100 % (tamaño real) y comprueba con una regla la línea de **50 mm** de cada hoja. La trayectoria en 3D y el circuito de tres puertas son ilustraciones de lo que podría pasar. Comprueba tus ideas con lanzamientos suaves, a nivel y en un espacio despejado. [78 PDF y actividades sin conexión](docs/library/) · [Actividad familiar en español](guides/paper-flight-lesson.es.md) · [Fuentes y créditos](https://kevinmamaqi.github.io/open-flight/references.html?lang=es) · [Versión 0.9.2](https://github.com/kevinmamaqi/open-flight/releases/tag/v0.9.2)

## Usa el taller en tu equipo

El sitio listo para abrir está en `docs/`. Desde la raíz del repositorio, ejecuta `python3 -m http.server 8000 --directory docs` y abre `http://localhost:8000/es.html` en tu navegador. El ZIP del taller completo incluye el Libro de vuelo y la guía para el aula. Descomprímelo, ejecuta `python3 -m http.server 8000` en la carpeta extraída y abre `http://localhost:8000/book.html?lang=es` o `http://localhost:8000/classroom.html?lang=es`. Los PDF y las actividades HTML independientes se abren directamente. [Descargar el taller y la biblioteca](https://github.com/kevinmamaqi/open-flight/releases/tag/v0.9.2)

Para usar el editor local con historial de revisiones compartido por HTTP y MCP, instala Node 24 o posterior, ejecuta `npm ci` y luego `npm run editor -- --workspace ./local/studio --port 4180`. La terminal muestra la ruta de un archivo de inicio privado. Ábrelo para conectar el editor al espacio de trabajo. [Rutas HTTP](api/openapi.json) · [Herramientas MCP](api/mcp-tools.json) · [Ejemplo de integración](examples/agent-client/journey.ts)

## Edita o comparte una observación

Las curvas y medidas de las mariposas están en `packages/geometry`. Los diseños de aviones de una hoja entera están en `apps/editor/assets/planes`. Ejecuta `npm test` y `npm run typecheck` para comprobar los cambios. Con Bun instalado, `npm run build:site` vuelve a generar el motor del navegador, los archivos para imprimir y el sitio estático. [Geometría de las alas](packages/geometry/) · [Cuerpo plegado y plantillas](packages/folded-butterfly/) · [Modelos de aviones](apps/editor/assets/planes/) · [Licencias y créditos](NOTICES.md)

Si acompañas a una familia o un grupo, puedes contarnos cómo fue un lanzamiento o qué doblez costó entender. Basta con indicar el modelo, el papel, el ajuste y lo que pasó. Omite nombres, fotos y datos de contacto de menores. [Compartir una observación](https://github.com/kevinmamaqi/open-flight/issues/new?template=flight-report.yml)
