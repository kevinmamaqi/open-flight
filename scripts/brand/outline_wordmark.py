import sys, uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
path, text, track = sys.argv[1], sys.argv[2], float(sys.argv[3])
blob = hb.Blob.from_file_path(path); face = hb.Face(blob); font = hb.Font(face)
buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties(); hb.shape(font, buf, {"kern": True, "liga": True})
tt = TTFont(path); gs = tt.getGlyphSet(); order = tt.getGlyphOrder(); upm = tt['head'].unitsPerEm
x = 0; parts = []
for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
    name = order[info.codepoint]; pen = SVGPathPen(gs)
    gs[name].draw(TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset)))
    d = pen.getCommands();  parts.append(d) if d else None
    x += pos.x_advance + track * upm
x -= track * upm
os2 = tt['OS/2']
print(f'{upm} {x:.0f} {os2.sCapHeight} {os2.sxHeight} {tt["hhea"].descent}')
print(' '.join(parts))
