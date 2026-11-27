# Open Flight

*Una hoja* es un libro sobre el vuelo en papel, y [openflight.design](https://openflight.design/es) es su edición digital gratuita. Está pensado para lectores de 8 a 12 años y para las personas adultas que construyen con ellos. Está disponible en español, [inglés](README.md) y [ruso](README.ru.md).

Catorce modelos parten de una sola hoja de papel:

- Ocho aviones. Cuatro llevan el nombre de aviones reales y cuatro son versiones Open Flight de aviones de papel de récord, con el crédito de sus diseñadores.
- Tres mariposas de papel.
- Un anillo planeador, un helicóptero de arce y un planeador de dos alas de un libro de 1918.

Cada uno tiene una hoja imprimible, una guía ilustrada, una vista en 3D y una página que explica cómo vuela. Dóblalo, lánzalo, cambia una cosa y vuelve a lanzarlo.

[Lee el libro](https://openflight.design/es) · [Imprime y vuela](https://openflight.design/es/print/) · [Para docentes](https://openflight.design/es/teachers/) · [La edición impresa](https://openflight.design/es/flight-book/) · [Contacto](https://openflight.design/es/contact/)

Imprime a tamaño real (100 %) y mide la línea de 50 mm de cada hoja. Las cifras de rendimiento salen de la geometría y se marcan como estimaciones hasta que un vuelo registrado las sustituya.

## Condiciones

Desde el 27 de noviembre de 2026, los textos, ilustraciones, lecciones, traducciones y hojas imprimibles de Open Flight son © Open Flight. Se pueden leer, imprimir y copiar gratis para uso personal, familiar y en el aula, y se reservan los demás derechos. Las versiones publicadas antes de esa fecha siguen disponibles bajo CC BY-SA 4.0 para quien las recibió. El software es Apache-2.0 y la geometría editable es CERN-OHL-W-2.0. Las fotografías y las fuentes de terceros conservan sus propias condiciones. [Licencias y créditos](NOTICES.md)

Para edición, traducción o uso en escuelas y museos, usa el [formulario de contacto](https://openflight.design/es/contact/).

## Úsalo en tu equipo

La carpeta `docs/` contiene la web lista para servir:

```sh
python3 -m http.server 8000 --directory docs
```

Para compilar desde el código, instala Bun 1.4.2 y ejecuta `bun install --frozen-lockfile --ignore-scripts` y `bun run build:site`. Antes de proponer un cambio, ejecuta `bun run test` y `bun run typecheck`.

## Cuéntanos cómo voló

Las personas adultas pueden [enviar una nota de vuelo](https://github.com/kevinmamaqi/open-flight/issues/new?template=flight-report.yml) con el modelo, el papel, el ajuste y lo que pasó. No hacen falta nombres, caras ni datos de contacto de menores.
