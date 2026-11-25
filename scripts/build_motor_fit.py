"""Export the same millimetre drawing to editable SVG, A4 and US Letter."""
import json
import os
import subprocess
import tempfile
from pathlib import Path

ASSETS = Path(__file__).resolve().parents[1] / "apps/editor/assets/motor"
LAB = json.loads((ASSETS / "lab.json").read_text())
REVISION = LAB["revision"]
DIMS = LAB["dimensions"]


def drawing(width, height):
    length = DIMS["saddleLength"]
    wing = DIMS["saddleWing"]
    bridge = DIMS["saddleBridge"]
    ruler = DIMS["rulerLength"]
    start = 16
    ticks = "".join(
        f'<path d="M{start + i} 112v{4 if i % 10 == 0 else 2 if i % 5 == 0 else 1}"/>'
        for i in range(ruler + 1)
    )
    labels = "".join(
        f'<text x="{start + i}" y="121" text-anchor="middle">{i}</text>'
        for i in range(0, ruler + 1, 10)
    )
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{width}mm" height="{height}mm" viewBox="0 0 {width} {height}">
  <title>{REVISION} — Open Flight</title>
  <desc>Unpowered paper saddle with cut outline, fold lines and a 50 mm calibration bar. Apache-2.0.</desc>
  <g fill="#202b25" font-family="DejaVu Sans, sans-serif">
    <text x="16" y="24" font-size="8" font-weight="bold">Open Flight</text>
    <text x="16" y="34" font-size="4.5">{REVISION} · Fit check / Prueba de ajuste / Примерка</text>
    <text x="16" y="43" font-size="3.4">Print at 100% / Imprime al 100% / Печатай в масштабе 100%</text>
    <text x="16" y="52" font-size="3.4">Paper and low-tack tape / Papel y cinta removible / Бумага и малярная лента</text>
    <text x="16" y="97" font-size="3.3">{length} × {2 * wing + bridge} mm · {wing} / {bridge} / {wing} mm</text>
    <text x="83" y="65" font-size="3.3">Cut / Recorta / Вырежи</text>
    <text x="83" y="74" font-size="3.3">Fold down / Dobla hacia abajo / Согни вниз</text>
    <text x="83" y="83" font-size="3.3">Keel / Quilla / Киль</text>
    <text x="83" y="95" font-size="3.3">Soft ballast / Lastre blando / Мягкий груз</text>
    <text x="16" y="108" font-size="3.3">Check / Comprueba / Проверь · {ruler} mm</text>
    <g font-size="2.7">{labels}</g>
    <text x="105" y="128" font-size="3.3">Rear / Desde atrás / Вид сзади</text>
    <text x="16" y="141" font-size="4">Balance from nose / Desde la punta / Равновесие от носа</text>
    <text x="16" y="153" font-size="3.4">Before / Antes / До __________________ mm</text>
    <text x="16" y="165" font-size="3.4">With ballast / Con lastre / С грузом __________________ mm</text>
    <text x="16" y="177" font-size="3.4">Added mass / Masa añadida / Добавленная масса __________________ g</text>
    <text x="16" y="194" font-size="4">First contact / Primer contacto / Первое касание</text>
    <text x="16" y="205" font-size="3.2">1 ____________  2 ____________  3 ____________  4 ____________  5 ____________</text>
    <text x="16" y="228" font-size="3">https://openflight.design/motor · Apache-2.0</text>
  </g>
  <g fill="none" stroke="#202b25" stroke-width=".35">
    <rect id="cut-outline" x="16" y="57" width="{length}" height="{2 * wing + bridge}"/>
    <path id="fold-lines" d="M16 {57 + wing}h{length}M16 {57 + wing + bridge}h{length}" stroke-dasharray="2 1.3"/>
    <path d="M72 64h8"/>
    <path d="M72 73h8" stroke-dasharray="2 1.3"/>
    <path d="M76 79v6M73 85h6"/>
    <path d="M73 92h6v3h-6z"/>
    <path d="M98 105l29 12h7l33-12" stroke="#68796d"/>
    <path d="M130.5 108v15M127.5 123h6"/>
    <path d="M117 113l10 3v-7h7v7l10-3" stroke-width=".55"/>
    <rect x="128" y="105.5" width="5" height="3.5" fill="#e4e9df"/>
    <path id="calibration-bar" d="M{start} 112h{ruler}"/>
    {ticks}
  </g>
</svg>
'''


def main():
    (ASSETS / f"{REVISION}.svg").write_text(drawing(210, 297))
    with tempfile.TemporaryDirectory() as temp:
        for label, width, height in (("A4", 210, 297), ("Letter", 215.9, 279.4)):
            source = Path(temp) / f"{REVISION}-{label}.svg"
            source.write_text(drawing(width, height))
            output = ASSETS / f"{REVISION}-{label}.pdf"
            subprocess.run(
                ["inkscape", str(source), f"--export-filename={output}"],
                check=True,
                env=dict(os.environ, SOURCE_DATE_EPOCH="0"),
            )


if __name__ == "__main__":
    main()
