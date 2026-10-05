#!/usr/bin/env python3
"""Build one fully self-contained HTML file (fonts, photos and videos embedded) for offline presenting.

Usage:  npm run build:offline   ->  dist-offline/EFN-Arena.html
"""
import base64
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media"
FONTS = ROOT / "offline-fonts"
OUT = ROOT / "dist-offline" / "EFN-Arena.html"

TYPES = {".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm"}
# Small posters still referenced by the game-show video player.
KEEP_SMALL = {"show-still-sm.webp", "show-buzz-sm.webp"}


def b64(path: pathlib.Path) -> str:
    return base64.b64encode(path.read_bytes()).decode("ascii")


def main() -> None:
    subprocess.run(["npm", "run", "build:single"], cwd=ROOT, check=True)
    html = (ROOT / "dist-single" / "index.html").read_text()

    # Fonts: replace Google Fonts links with inline @font-face rules.
    css = (FONTS / "fonts.css").read_text()
    css = re.sub(
        r"url\(([^)]+\.woff2)\)",
        lambda m: f"url(data:font/woff2;base64,{b64(FONTS / m.group(1))})",
        css,
    )
    html = re.sub(r'\s*<link rel="preconnect"[^>]*>', "", html)
    html = re.sub(r'\s*<link href="https://fonts\.googleapis\.com[^>]*>', "", html)

    # Media: full-size photos, posters and WebM videos (Chrome, Edge, Firefox). Pass --mp4 to also
    # embed MP4 copies for Safari; that pushes the file past 30 MB.
    with_mp4 = "--mp4" in sys.argv
    media = {}
    for f in sorted(MEDIA.iterdir()):
        if f.suffix == ".mp4" and not with_mp4:
            continue
        if f.name.endswith("-sm.webp") and f.name not in KEEP_SMALL:
            continue
        media[f.name] = [TYPES[f.suffix], b64(f)]

    inject = (
        f"<style>{css}</style>\n"
        f"<script>window.__EFN_MEDIA={json.dumps(media, separators=(',', ':'))};</script>\n"
    )
    html = html.replace("</title>", "</title>\n" + inject, 1)

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html)
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size / 1e6:.1f} MB, {len(media)} media files)")


if __name__ == "__main__":
    main()
