"""
Turns the original brand images in assets-src/brand/ into web-ready files
in public/images/ (and favicons in public/).

Run: python3 scripts/process-brand-images.py
Needs Pillow (pip install pillow).
"""
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "brand"
OUT = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)
BLACK = (8, 8, 8)


def key_black(im: Image.Image, gain: float = 1.7) -> Image.Image:
    """Make a black background transparent, keeping soft anti-aliased edges."""
    im = im.convert("RGB")
    r, g, b = im.split()
    lum = ImageChops.lighter(ImageChops.lighter(r, g), b)
    alpha = lum.point(lambda v: 0 if v < 18 else min(255, int((v - 18) * gain)))
    out = im.copy()
    out.putalpha(alpha)
    # un-premultiply so semi-transparent edges keep their gold colour
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            pr, pg, pb, pa = px[x, y]
            if 0 < pa < 255:
                k = 255 / pa
                px[x, y] = (min(255, int(pr * k)), min(255, int(pg * k)), min(255, int(pb * k)), pa)
    return out


def key_green(im: Image.Image) -> Image.Image:
    """Remove a green-screen background and the green colour spill."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            dom = g - max(r, b)
            if dom > 70:
                px[x, y] = (0, 0, 0, 0)
            else:
                a = 255 if dom < 25 else int(255 * (70 - dom) / 45)
                px[x, y] = (r, min(g, max(r, b) + 8), b, a)  # despill
    return im


def on_black(im: Image.Image) -> Image.Image:
    bg = Image.new("RGB", im.size, BLACK)
    bg.paste(im, mask=im.split()[3])
    return bg


def trim(im: Image.Image, pad: int = 0) -> Image.Image:
    l, t, r, b = im.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox()
    return im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad)))


# ---------------------------------------------------------------- logo
logo = key_black(Image.open(SRC / "ss-legal-firm-logo.jpg"))
full = trim(logo, 8)
full.thumbnail((900, 900), Image.LANCZOS)
full.save(OUT / "logo-full.png", optimize=True)

# Emblem only (eagle + SS/LF), above the "SS LEGAL FIRM" wordmark
emblem = trim(logo.crop((0, 0, logo.width, 830)), 6)
e = emblem.copy(); e.thumbnail((320, 320), Image.LANCZOS); e.save(OUT / "logo-mark.png", optimize=True)

# Favicons: emblem centred on black
def icon(size: int, path: Path):
    canvas = Image.new("RGBA", (size, size), BLACK + (255,))
    m = emblem.copy(); m.thumbnail((int(size * 0.86), int(size * 0.86)), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    canvas.convert("RGB").save(path, optimize=True)

icon(180, ROOT / "public" / "apple-touch-icon.png")
icon(64, ROOT / "public" / "favicon.png")
icon(512, ROOT / "public" / "icon-512.png")

# ---------------------------------------------------------------- portrait (hero)
p = Image.open(SRC / "sekin-shiju-portrait.webp").convert("RGB")
p.thumbnail((1000, 1310), Image.LANCZOS)
p.save(OUT / "sekin-shiju-portrait.webp", quality=84, method=6)

# ---------------------------------------------------------------- YouTube badge
badge = key_green(Image.open(SRC / "sekin-shiju-youtube-badge.webp"))
b = on_black(trim(badge, 20)); b.thumbnail((1000, 1000), Image.LANCZOS)
b.save(OUT / "gallery" / "youtube-channel.webp", quality=84, method=6)

# Suited half-portrait from the badge, for the About section (above the title text)
suit = on_black(badge.crop((215, 40, 1095, 600)))
suit.thumbnail((1100, 1100), Image.LANCZOS)
suit.save(OUT / "sekin-shiju-suit.webp", quality=84, method=6)

print("brand images written")
