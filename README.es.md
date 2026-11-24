# Open Flight · Taller de vuelo en papel

Elige un planeador de papel, cambia un doblez y observa dónde aterriza. El taller es gratuito y funciona en el navegador. Está pensado para niñas y niños de 5 a 12 años, sus familias y sus docentes. Puedes guardar tus diseños en el dispositivo y descargar hojas para imprimir y guías ilustradas. [Abrir el taller en español](https://kevinmamaqi.github.io/open-flight/es.html) · [English](README.md) · [По-русски](README.ru.md)

| Qué puedes hacer | Qué necesitas | Qué puedes cambiar |
| --- | --- | --- |
| Mariposa con cuerpo plegado | Una plantilla K1, tijeras, regla y un clip pequeño | Junta las puntas, pliega el cuerpo de dos capas y apoya las alas en la mesa. Elige la envergadura y los colores. [Construir K1](https://kevinmamaqi.github.io/open-flight/keel.html?lang=es) |
| Una mariposa original monarca, morfo azul o cola de golondrina (macaón) | Una hoja con la plantilla impresa, tijeras y un clip pequeño de puntas redondeadas | El ancho de las alas, los colores y las dos aletas de cola. Sigue los dibujos para recortar y doblar. Lanza y compara dónde toca el suelo. |
| Un avión inspirado en el Boeing 747, el Douglas DC-3, el Tupolev Tu-144 o el Ilyushin Il-62 | Una hoja entera A4 o tamaño carta | La profundidad del cuerpo, los dobleces en los extremos de las alas y los colores. Sigue los dibujos paso a paso. Puedes doblarlo sin impresora. |

Imprime al 100 % (tamaño real) y comprueba con una regla la línea de **50 mm** de la mariposa o de **20 mm** del avión. La trayectoria en 3D y el circuito de tres puertas son ilustraciones de lo que podría pasar. Comprueba tus ideas con lanzamientos suaves, a nivel y en un espacio despejado. [60 PDF y actividades sin conexión](docs/library/) · [Actividad familiar en español](guides/paper-flight-lesson.es.md) · [Fuentes y créditos](https://kevinmamaqi.github.io/open-flight/references.html?lang=es) · [Versión 0.5.0](https://github.com/kevinmamaqi/open-flight/releases/tag/v0.5.0)

## Usa el taller en tu equipo

El sitio listo para abrir está en `docs/`. Desde la raíz del repositorio, ejecuta `python3 -m http.server 8000 --directory docs` y abre `http://localhost:8000/es.html` en tu navegador. Los PDF y las actividades HTML descargadas se abren directamente, incluso sin conexión.

Para usar el editor local con historial de revisiones compartido por HTTP y MCP, instala Node 24 o posterior, ejecuta `npm ci` y luego `npm run editor -- --workspace ./local/studio --port 4180`. La terminal muestra la ruta de un archivo de inicio privado. Ábrelo para conectar el editor al espacio de trabajo. [Rutas HTTP](api/openapi.json) · [Herramientas MCP](api/mcp-tools.json) · [Ejemplo de integración](examples/agent-client/journey.ts)

## Edita o comparte una observación

Las curvas y medidas de las mariposas están en `packages/geometry`. Los diseños de aviones de una hoja entera están en `apps/editor/assets/planes`. Ejecuta `npm test` y `npm run typecheck` para comprobar los cambios. Con Bun instalado, `npm run build:site` vuelve a generar el motor del navegador, los archivos para imprimir y el sitio estático. [Geometría de las alas](packages/geometry/) · [Cuerpo plegado y plantillas](packages/folded-butterfly/) · [Modelos de aviones](apps/editor/assets/planes/) · [Licencias y créditos](NOTICES.md)

Si acompañas a una familia o un grupo, puedes contarnos cómo fue un lanzamiento o qué doblez costó entender. Basta con indicar el modelo, el papel, el ajuste y lo que pasó. Omite nombres, fotos y datos de contacto de menores. [Compartir una observación](https://github.com/kevinmamaqi/open-flight/issues/new?template=flight-report.yml)
