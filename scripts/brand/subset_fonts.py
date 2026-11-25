import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset
src, out = sys.argv[1], sys.argv[2]
UNI = ("U+0020-007E,U+00A0-017F,U+0192,U+02C6,U+02DA,U+02DC,U+0400-045F,U+0490-0491,U+2010-2027,U+2030-203A,"
       "U+2044,U+20AC,U+2116,U+2122,U+2160-216B,U+2190-2199,U+21BB,U+2212,U+2215,U+2248,U+2260,U+2264,U+2265,U+25CF,U+2713")
def rename(font, family, style, ps):
    name = font['name']
    full = f"{family} {style}" if style != 'Regular' else family + ' Regular'
    for rec in list(name.names):
        if rec.nameID in (1, 4, 6, 16, 17, 21, 22, 25):
            name.removeNames(nameID=rec.nameID)
    for nid, val in ((1, family if style in ('Regular','Bold','Italic','Bold Italic') else family + ' ' + style),
                     (2, style if style in ('Regular','Bold','Italic','Bold Italic') else 'Regular'),
                     (4, full), (6, ps)):
        name.setName(val, nid, 3, 1, 0x409); name.setName(val, nid, 1, 0, 0)
    # keep copyright (0), licence (13, 14); note the modification in description (10)
    note = f"Subset of the original font for the Open Flight workshop (Latin, Spanish, Cyrillic). Modified under the SIL Open Font License 1.1."
    name.setName(note, 10, 3, 1, 0x409)
def build(path, family, style, ps, wght=None, rename_it=False):
    f = TTFont(path)
    if 'fvar' in f:
        f = instancer.instantiateVariableFont(f, {a.axisTag: (wght if a.axisTag == 'wght' else a.defaultValue) for a in f['fvar'].axes}, updateFontNames=False)
    opts = subset.Options(); opts.layout_features = ['kern','liga','calt','ccmp','locl','mark','mkmk','tnum','lnum','case']
    opts.name_IDs = ['*']; opts.name_languages = ['*']; opts.notdef_outline = True; opts.glyph_names = False; opts.hinting = False
    s = subset.Subsetter(opts); s.populate(unicodes=subset.parse_unicodes(UNI)); s.subset(f)
    rename(f, family, style, ps)
    if 'STAT' in f: del f['STAT']
    f.flavor = None; f.save(f"{out}/{ps}.ttf")
    f.flavor = 'woff2'; f.save(f"{out}/{ps}.woff2")
D = src
build(f"{D}/andika/Andika-Regular.ttf", "Open Flight Text", "Regular", "OpenFlightText-Regular")
build(f"{D}/andika/Andika-Bold.ttf", "Open Flight Text", "Bold", "OpenFlightText-Bold")
build(f"{D}/andika/Andika-Italic.ttf", "Open Flight Text", "Italic", "OpenFlightText-Italic")
build(f"{D}/alegreya/Alegreya[wght].ttf", "Alegreya", "Bold", "Alegreya-Bold", wght=700)
build(f"{D}/alegreya/Alegreya-Italic[wght].ttf", "Alegreya", "Italic", "Alegreya-Italic", wght=400)
# coverage check
need = open(sys.argv[3]).read().split('\n')[1] + ''.join(chr(c) for c in range(0x410, 0x450)) + 'Ёё'
for ps in ["OpenFlightText-Regular","OpenFlightText-Bold","Alegreya-Bold","Alegreya-Italic"]:
    cmap = TTFont(f"{out}/{ps}.ttf").getBestCmap()
    miss = [c for c in need if ord(c) not in cmap]
    print(ps, 'missing:', ''.join(miss) or 'none')
