"""Bundle the independently usable public site and classroom downloads."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

parser = argparse.ArgumentParser()
parser.add_argument('public_checkout', type=Path)
parser.add_argument('destination', type=Path)
args = parser.parse_args()
root, destination = args.public_checkout.resolve(), args.destination.resolve()
destination.mkdir(parents=True, exist_ok=True)
site = root / 'docs'
intro = """OPEN FLIGHT · МАСТЕРСКАЯ БУМАЖНЫХ ПОЛЁТОВ · TALLER DE VUELO EN PAPEL

Print a PDF from the library at actual size. Butterfly sheets carry a 50 mm ruler. Airplane sheets carry a 20 mm ruler. For a folded-body K1 butterfly, cut the first page and follow the six pictures on page two. Print only the first airplane page for the aircraft. Keep the picture guide and notebook at hand.
The complete workshop includes the family book builder and the motor lab with its printable fit model and observation sheet.
To use the complete website archive offline, open a terminal in its expanded folder, start python3 -m http.server 8000 and open http://localhost:8000 in a browser. The PDFs and standalone lesson HTML files open directly.

Откройте нужный PDF и печатайте в натуральную величину. Проверьте контрольный отрезок: 50 мм у бабочки или 20 мм у самолёта. Для бабочки K1 вырежьте выкройку с первой страницы и следуйте шести рисункам на второй. Для самого самолёта достаточно первой страницы. На остальных страницах — схемы и лётный дневник.
В полном архиве есть конструктор семейной книги и лаборатория мотора с макетом для примерки.
Чтобы открыть весь сайт без интернета, распакуйте архив, откройте терминал в этой папке, запустите python3 -m http.server 8000 и перейдите на http://localhost:8000. PDF и самостоятельные HTML-занятия открываются прямо из папки.

Imprime el PDF a tamaño real. Comprueba con una regla la línea de 50 mm de la mariposa o de 20 mm del avión. Para la mariposa K1, recorta la primera página y sigue las seis imágenes de la segunda. Para armar el avión, imprime solo la primera página. Las siguientes traen los dibujos y el cuaderno de vuelo.
El taller completo incluye el creador de libros familiares y el laboratorio de motores con una maqueta imprimible.
Para usar el taller completo sin conexión, descomprime el archivo, abre una terminal en esa carpeta, ejecuta python3 -m http.server 8000 y visita http://localhost:8000/es.html en el navegador. Los PDF y las actividades HTML se abren directamente.

Website / Мастерская     https://kevinmamaqi.github.io/open-flight/
Русская версия           https://kevinmamaqi.github.io/open-flight/ru.html
Taller en español        https://kevinmamaqi.github.io/open-flight/es.html
Source / Исходники       https://github.com/kevinmamaqi/open-flight
"""
catalog = json.loads((site / 'assets/atlas/print-catalog.json').read_text())
locales = catalog['locales']
planes = [sheet['model'] for sheet in catalog['sheets'] if sheet['family'] == 'airplane']
library_pdfs = {f"{sheet['id']}-{paper}-{locale}.pdf" for sheet in catalog['sheets'] for paper in catalog['papers'] for locale in locales}
motor_files = {item['path'] for item in json.loads((site / 'assets/motor/lab.json').read_text())['files']}
library_lessons = {f'family-lesson-{locale}.html' for locale in locales}
workshop_files = {
    'index.html', 'ru.html', 'es.html', 'studio.html', 'planes.html', 'compare.html', 'next.html', 'references.html',
    'keel.html','keel.js','keel.css','keel-guide.js', 'studio-folded.js', 'fold-lesson.js', 'fold-lesson.css',
    'book.html', 'book.js', 'book.css', 'book-engine.js', 'book-support.js', 'family-sheets.js',
    'motor.html', 'motor.js', 'motor.css', 'assets/motor/lab.json', *motor_files,
    'atlas-nav.js', 'compare.js', 'next.js', 'browser-workshop.js', 'flight-viewer.js',
    'flight-model.js', 'flight-scorecard.js', 'atlas-physics.js', 'assets/planes/field-portraits.js', 'assets/atlas/baselines.js',
    'flight-circuit-copy.js', 'flight-words.js',
    *[f'assets/planes/field/{model}.svg' for model in planes],
}


def archive(name: str, directory: Path, *, full_workshop: bool = False) -> None:
    members = {}
    for file in directory.rglob('*'):
        path = file.relative_to(directory)
        if file.is_file() and not any(part.startswith('.') for part in path.parts):
            members[path.as_posix()] = file.read_bytes()
    for path in ('LICENSE', 'NOTICES.md', 'licenses/CC-BY-SA-4.0.txt', 'licenses/CERN-OHL-W-2.0.txt'):
        members[path] = (root / path).read_bytes()
    members['licenses/DejaVu.txt'] = (root / 'apps/editor/assets/planes/vendor/DejaVu-LICENSE.txt').read_bytes()
    notices = members['NOTICES.md'].decode().replace('](apps/editor/', '](https://github.com/kevinmamaqi/open-flight/tree/main/apps/editor/')
    members['NOTICES.md'] = notices.encode()
    members['START-HERE.txt'] = intro.encode()
    library_prefix = 'library/' if full_workshop else ''
    expected_pdfs = {library_prefix + item for item in library_pdfs}
    expected_files = expected_pdfs | {library_prefix + item for item in library_lessons}
    if full_workshop:
        expected_files |= workshop_files
        expected_pdfs |= {item for item in motor_files if item.endswith('.pdf')}
    missing = expected_files - members.keys()
    extra_pdfs = {path for path in members if path.endswith('.pdf')} - expected_pdfs
    if missing or extra_pdfs:
        raise ValueError(f'{name}: missing {sorted(missing)}; unexpected PDFs {sorted(extra_pdfs)}')
    with ZipFile(destination / name, 'w') as output:
        for path, content in sorted(members.items()):
            item = ZipInfo(path, (2026, 11, 24, 0, 0, 0))
            item.external_attr = 0o100644 << 16
            output.writestr(item, content, compress_type=ZIP_DEFLATED)
    with ZipFile(destination / name) as output:
        corrupt = output.testzip()
        if corrupt:
            raise ValueError(f'{name}: checksum failed for {corrupt}')
    print(f'{name}: {len(members)} verified entries')


archive('open-flight-print-library.zip', site / 'library')
archive('open-flight-workshop.zip', site, full_workshop=True)
