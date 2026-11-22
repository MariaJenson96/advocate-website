"""
Generates on-brand PLACEHOLDER artwork (black / gold / white only).
Replace these files with authentic photography before launch.
Run: python3 scripts/generate-placeholders.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "images"
(OUT / "articles").mkdir(parents=True, exist_ok=True)
G, B, W = "#C5A253", "#080808", "#FFFFFF"


def grid(w, h, step=60, op=0.06):
    lines = [f'<path d="M{x} 0V{h}" />' for x in range(0, w + 1, step)]
    lines += [f'<path d="M0 {y}H{w}" />' for y in range(0, h + 1, step)]
    return f'<g stroke="{G}" stroke-opacity="{op}" stroke-width="1">{"".join(lines)}</g>'


def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
            f'<rect width="{w}" height="{h}" fill="{B}"/>{body}</svg>')


def label(x, y, text, size=14, op=0.55):
    return (f'<text x="{x}" y="{y}" fill="{G}" fill-opacity="{op}" font-family="Helvetica, Arial, sans-serif" '
            f'font-size="{size}" letter-spacing="{size*0.35:.1f}" text-anchor="middle">{text}</text>')


# ---------------------------------------------------------------- portrait
portrait = svg(800, 1000, grid(800, 1000, 50, 0.05) + f'''
<circle cx="400" cy="400" r="300" fill="none" stroke="{G}" stroke-opacity="0.12"/>
<circle cx="400" cy="400" r="230" fill="none" stroke="{G}" stroke-opacity="0.08"/>
<!-- shoulders / gown -->
<path d="M90 1000 C100 790 200 668 330 632 L400 760 L470 632 C600 668 700 790 710 1000 Z" fill="{W}" fill-opacity="0.045" stroke="{G}" stroke-width="2"/>
<!-- lapels -->
<path d="M330 632 L372 820 L400 760 M470 632 L428 820 L400 760" fill="none" stroke="{G}" stroke-width="2"/>
<path d="M300 645 L352 900 M500 645 L448 900" fill="none" stroke="{G}" stroke-opacity="0.35" stroke-width="1.5"/>
<!-- collar & advocate's bands -->
<path d="M352 600 L400 660 L448 600" fill="none" stroke="{W}" stroke-opacity="0.8" stroke-width="2"/>
<rect x="384" y="664" width="13" height="74" fill="{W}" fill-opacity="0.9"/>
<rect x="403" y="664" width="13" height="74" fill="{W}" fill-opacity="0.9"/>
<!-- neck -->
<path d="M360 520 C362 560 358 590 352 604 M440 520 C438 560 442 590 448 604" fill="none" stroke="{G}" stroke-width="2"/>
<!-- head -->
<ellipse cx="400" cy="420" rx="100" ry="124" fill="{W}" fill-opacity="0.04" stroke="{G}" stroke-width="2"/>
<path d="M302 400 C296 318 344 282 404 284 C466 286 506 326 498 404 C486 360 460 336 404 334 C350 336 318 358 302 400 Z" fill="{G}" fill-opacity="0.28" stroke="{G}" stroke-width="1.5"/>
<path d="M400 238 V170" stroke="{G}" stroke-opacity="0.4"/>
{label(400, 150, "PLACEHOLDER PORTRAIT", 15, 0.6)}
{label(400, 176, "REPLACE WITH ADVOCATE PHOTOGRAPH", 10, 0.45)}
''')
(OUT / "advocate-portrait.svg").write_text(portrait)

# ---------------------------------------------------------------- about / chambers
shelves = ""
for i, y in enumerate([180, 360, 540]):
    shelves += f'<path d="M80 {y+150}H330" stroke="{G}" stroke-width="2"/>'
    x = 92
    for j in range(11):
        bw = 14 + (j * 7 + i * 5) % 12
        bh = 92 + (j * 13 + i * 11) % 50
        shelves += (f'<rect x="{x}" y="{y+150-bh}" width="{bw}" height="{bh}" fill="{W}" fill-opacity="{0.03 + (j % 3)*0.02}" '
                    f'stroke="{G}" stroke-opacity="0.55"/>')
        x += bw + 4
about = svg(900, 1100, grid(900, 1100, 60, 0.05) + shelves + f'''
<!-- arched window -->
<path d="M470 720 V330 A170 170 0 0 1 810 330 V720 Z" fill="{W}" fill-opacity="0.035" stroke="{G}" stroke-width="2"/>
<path d="M640 160 V720 M470 450 H810" stroke="{G}" stroke-opacity="0.45"/>
<!-- desk -->
<path d="M40 790 H860" stroke="{G}" stroke-width="2.5"/>
<path d="M90 790 V1100 M810 790 V1100" stroke="{G}" stroke-opacity="0.4"/>
<!-- books on desk -->
<rect x="150" y="740" width="190" height="22" fill="none" stroke="{G}"/><rect x="165" y="718" width="160" height="22" fill="{G}" fill-opacity="0.2" stroke="{G}"/>
<!-- scales -->
<g stroke="{G}" stroke-width="2" fill="none">
  <path d="M640 560 V788 M590 788 H690 M545 600 H735"/>
  <path d="M545 600 L515 680 M545 600 L575 680 M500 680 A45 18 0 0 0 590 680 Z"/>
  <path d="M735 600 L705 680 M735 600 L765 680 M690 680 A45 18 0 0 0 780 680 Z"/>
  <circle cx="640" cy="552" r="9" fill="{G}"/>
</g>
{label(450, 960, "PLACEHOLDER IMAGE", 16, 0.6)}
{label(450, 990, "REPLACE WITH AN AUTHENTIC PHOTOGRAPH OF THE ADVOCATE", 10, 0.45)}
''')
(OUT / "advocate-about.svg").write_text(about)

# ---------------------------------------------------------------- articles
S = f'fill="none" stroke="{G}" stroke-width="2.2"'
motifs = {
    "property": f'''<g {S}><path d="M380 250 L600 150 L820 250 Z"/><path d="M370 250 H830 M360 270 H840 M360 560 H840 M340 590 H860"/>
      {''.join(f'<path d="M{x} 290 V540 M{x+30} 290 V540"/><path d="M{x-8} 290 H{x+38} M{x-8} 540 H{x+38}"/>' for x in range(395, 800, 95))}</g>''',
    "rights": f'''<g {S}><path d="M600 220 C540 190 440 190 380 210 V520 C440 500 540 500 600 530 C660 500 760 500 820 520 V210 C760 190 660 190 600 220 Z M600 220 V530"/>
      {''.join(f'<path d="M{410} {y} H570 M630 {y} H790" stroke-opacity="0.45"/>' for y in range(260, 480, 36))}
      <path d="M600 120 L660 140 V180 C660 210 630 228 600 238 C570 228 540 210 540 180 V140 Z" fill="{B}"/></g>''',
    "family": f'''<g {S}><circle cx="530" cy="370" r="130"/><circle cx="670" cy="370" r="130"/><circle cx="600" cy="470" r="70" stroke-opacity="0.6"/>
      <circle cx="600" cy="370" r="210" stroke-opacity="0.2"/></g>''',
    "consumer": f'''<g {S}><path d="M600 150 V560 M520 560 H680 M440 210 H760"/><circle cx="600" cy="140" r="12" fill="{G}"/>
      <path d="M440 210 L395 360 M440 210 L485 360 M375 360 A65 26 0 0 0 505 360 Z"/>
      <path d="M760 210 L715 360 M760 210 L805 360 M695 360 A65 26 0 0 0 825 360 Z"/></g>''',
    "litigation": f'''<g {S}><path d="M360 260 L600 140 L840 260 Z M330 260 H870"/><circle cx="600" cy="215" r="22"/>
      <path d="M380 560 V290 M440 560 V290 M520 560 V290 M580 560 V290 M620 560 V290 M680 560 V290 M760 560 V290 M820 560 V290" stroke-opacity="0.85"/>
      <path d="M340 290 H860 M340 560 H860 M300 600 H900 M320 580 H880"/></g>''',
    "documents": f'''<g {S}><rect x="430" y="170" width="280" height="370" transform="rotate(-6 570 355)" stroke-opacity="0.35"/>
      <rect x="460" y="150" width="280" height="370"/>
      {''.join(f'<path d="M500 {y} H{700 if i % 3 else 640}" stroke-opacity="0.5"/>' for i, y in enumerate(range(210, 440, 30)))}
      <path d="M760 420 L840 560 L800 590 Z M790 470 L815 515" fill="{B}"/></g>''',
    "cheque": f'''<g {S}><rect x="340" y="220" width="520" height="260"/><path d="M380 280 H600 M380 330 H820 M380 380 H700 M640 430 H820" stroke-opacity="0.5"/>
      <circle cx="780" cy="280" r="34"/><circle cx="780" cy="280" r="22" stroke-opacity="0.5"/>
      <path d="M380 440 C420 410 450 460 490 430 S560 420 590 440"/></g>''',
    "will": f'''<g {S}><path d="M420 200 H760 V520 C760 560 720 580 690 560 H380 C410 540 420 520 420 500 Z"/>
      <path d="M380 560 C350 540 350 500 390 500 H420"/>
      {''.join(f'<path d="M460 {y} H720" stroke-opacity="0.5"/>' for y in range(250, 470, 34))}
      <path d="M860 120 C780 160 720 260 690 380 L700 384 C740 270 800 180 860 120 Z M690 380 L676 430" fill="{B}"/></g>''',
}
for name, motif in motifs.items():
    body = grid(1200, 750, 60, 0.05) + f'''
<rect x="40" y="40" width="1120" height="670" fill="none" stroke="{G}" stroke-opacity="0.25"/>
<circle cx="600" cy="365" r="280" fill="{G}" fill-opacity="0.035"/>
{motif}
{label(600, 670, "PLACEHOLDER IMAGE", 12, 0.4)}'''
    (OUT / "articles" / f"{name}.svg").write_text(svg(1200, 750, body))

# ---------------------------------------------------------------- brand icons
favicon = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="{B}"/>'
           f'<rect x="4" y="4" width="56" height="56" fill="none" stroke="{G}" stroke-width="2"/>'
           f'<rect x="9" y="9" width="46" height="46" fill="none" stroke="{G}" stroke-opacity="0.35"/>'
           f'<text x="32" y="42" text-anchor="middle" font-family="Georgia, serif" font-size="25" font-weight="600" fill="{G}">SS</text></svg>')
(OUT.parent / "favicon.svg").write_text(favicon)

og = svg(1200, 630, grid(1200, 630, 60, 0.06) + f'''
<rect x="40" y="40" width="1120" height="550" fill="none" stroke="{G}" stroke-opacity="0.4"/>
<rect x="100" y="215" width="120" height="120" fill="none" stroke="{G}" stroke-width="2"/>
<rect x="110" y="225" width="100" height="100" fill="none" stroke="{G}" stroke-opacity="0.35"/>
<text x="160" y="295" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="{G}">SS</text>
<text x="270" y="268" font-family="Georgia, serif" font-size="64" fill="{W}">Adv. Sekin Shiju</text>
<text x="272" y="318" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="7" fill="{G}">ADVOCATE &amp; LEGAL CONSULTANT</text>
<path d="M272 380 H560" stroke="{G}"/>
<text x="272" y="430" font-family="Georgia, serif" font-style="italic" font-size="34" fill="{W}" fill-opacity="0.8">Committed to Justice. Dedicated to Your Rights.</text>
''')
(Path(__file__).resolve().parent / "og-source.svg").write_text(og)
print("placeholders written to", OUT)

# ---------------------------------------------------------------- gallery
(OUT / "gallery").mkdir(exist_ok=True)


def figure(cx, base, scale=1.0, op=1.0):
    """Minimal standing/seated advocate silhouette in line art."""
    s = scale
    return (f'<g stroke="{G}" stroke-opacity="{op}" stroke-width="2" fill="{W}" fill-opacity="0.04">'
            f'<ellipse cx="{cx}" cy="{base-210*s}" rx="{34*s}" ry="{42*s}"/>'
            f'<path d="M{cx-95*s} {base} C{cx-92*s} {base-110*s} {cx-60*s} {base-150*s} {cx-22*s} {base-160*s} L{cx} {base-120*s} '
            f'L{cx+22*s} {base-160*s} C{cx+60*s} {base-150*s} {cx+92*s} {base-110*s} {cx+95*s} {base} Z"/>'
            f'<rect x="{cx-7*s}" y="{base-152*s}" width="{5*s}" height="{26*s}" fill="{W}" fill-opacity="0.85" stroke="none"/>'
            f'<rect x="{cx+2*s}" y="{base-152*s}" width="{5*s}" height="{26*s}" fill="{W}" fill-opacity="0.85" stroke="none"/></g>')


def frame(w, h, inner):
    return svg(w, h, grid(w, h, 60, 0.05) + f'<rect x="28" y="28" width="{w-56}" height="{h-56}" fill="none" stroke="{G}" stroke-opacity="0.22"/>'
               + inner + label(w / 2, h - 52, "PLACEHOLDER — REPLACE WITH AUTHENTIC PHOTOGRAPH", 11, 0.45))


T = f'stroke="{G}" stroke-width="2" fill="none"'
gallery = {
    # chambers: seated at desk with bookshelf
    "chambers": (800, 1000, figure(400, 640, 1.5) + f'''<g {T}><path d="M120 640 H680 M160 640 V860 M640 640 V860"/>
        <rect x="230" y="600" width="120" height="40" fill="{G}" fill-opacity="0.15"/>
        {''.join(f'<path d="M{x} 260 V{170 + (x*7)%60}" stroke-opacity="0.5"/>' for x in range(110, 230, 16))}
        {''.join(f'<path d="M{x} 260 V{170 + (x*5)%60}" stroke-opacity="0.5"/>' for x in range(580, 700, 16))}
        <path d="M100 260 H240 M570 260 H710"/></g>'''),
    # court complex exterior
    "court-complex": (1200, 800, f'''<g {T}><path d="M300 300 L600 170 L900 300 Z M270 300 H930 M250 620 H950 M230 650 H970"/>
        <circle cx="600" cy="255" r="26"/>
        {''.join(f'<path d="M{x} 330 V600 M{x+26} 330 V600"/>' for x in range(330, 880, 90))}
        <path d="M290 330 H910 M290 600 H910"/></g>''' + figure(1020, 650, 0.9, 0.8)),
    # consultation: two figures across a table
    "consultation": (1000, 1000, f'<g {T}><path d="M220 640 H780 M260 640 V820 M740 640 V820"/><rect x="430" y="610" width="140" height="30"/></g>'
                     + figure(300, 620, 1.2) + figure(700, 620, 1.2, 0.55)),
    # legal research: books & lamp
    "research": (1200, 800, f'''<g {T}>
        {''.join(f'<rect x="{x}" y="{300 - (x*3)%70}" width="34" height="{250 + (x*3)%70}" fill="{W}" fill-opacity="0.03"/>' for x in range(140, 520, 44))}
        <path d="M120 550 H1080"/><path d="M640 550 C640 470 720 420 800 420 C860 420 920 450 940 520 Z" fill="{G}" fill-opacity="0.12"/>
        <path d="M900 470 L980 300 L1040 330 M960 330 L1060 310 L1040 380 Z"/></g>''' + figure(800, 550, 1.1)),
    # speaking engagement: podium
    "speaking": (800, 1000, figure(400, 600, 1.6) + f'''<g {T}><path d="M270 600 H530 L500 880 H300 Z" fill="{B}" fill-opacity="1"/>
        <path d="M400 600 V540 M380 540 H420" /><path d="M300 660 H500" stroke-opacity="0.5"/></g>'''),
    # professional event: two standing figures
    "professional-event": (1200, 800, figure(480, 680, 1.4) + figure(720, 680, 1.4, 0.6)
                           + f'<g {T}><path d="M140 680 H1060" stroke-opacity="0.5"/><circle cx="600" cy="300" r="190" stroke-opacity="0.15"/></g>'),
}
for name, (w, h, inner) in gallery.items():
    (OUT / "gallery" / f"{name}.svg").write_text(frame(w, h, inner))
print("gallery placeholders written")
