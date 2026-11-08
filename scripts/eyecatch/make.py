"""コラムのアイキャッチ(1200x630)を作る。

TOP と同じトーン: 白地・( Column )・黒ピル・太字の和文・サービス色の丸。
右側の丸の並べ方はカテゴリごとに変える(お金=積み上がるコイン / 人間関係=重なる輪 / 組織=整列したチーム)。

使い方 (playwright が入った python で):
  python3 -I scripts/eyecatch/make.py <cfac-homepage のパス>
出力: public/column/<slug>.png (OG用) と public/column/<slug>.webp (記事表示用)
記事を足したら ARTICLES に1件足して再実行する。
"""

import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[1]).resolve()
OUT = ROOT / "public" / "column"

# TOP の COLORS と同じ並び
BLUE, ORANGE, GREEN, LIME, PINK, SKY, YELLOW, PURPLE = (
    "#1f3dff", "#ff4b12", "#00c35a", "#e2ff1c", "#ff8ad2", "#6fd1ff", "#ffc21a", "#9b6bff",
)
INK = "#111"

CATEGORY = {
    "money": "お金の悩み",
    "relationships": "人間関係の悩み",
    "organization": "会社組織運営の悩み",
}

ARTICLES = [
    {
        "slug": "shikin-chotatsu",
        "category": "money",
        "title": ["会社のお金が", "足りないときの", "資金調達"],
        "sub": "融資・ファクタリング・ビジネスローンの選び方",
    },
    {
        "slug": "te-ga-mawaranai",
        "category": "organization",
        "title": ["少人数の会社の", "「手が回らない」を", "解決する"],
        "sub": "電話・経理・勤怠をAIとクラウドで減らす",
    },
    {
        "slug": "ningen-kankei",
        "category": "relationships",
        "title": ["人間関係に", "疲れたときの", "心の整理法"],
        "sub": "ひとりで抱え込まないための考え方と相談先",
    },
]


def motif(category: str) -> str:
    """右側 (幅460 x 高さ630) に置く丸の構成を SVG で返す。"""
    c = []
    if category == "money":
        # 左から右へ積み上がるコイン(資金が増えていく)
        cols = [(70, 2, BLUE), (170, 3, BLUE), (270, 4, INK), (370, 5, LIME)]
        for x, n, col in cols:
            for i in range(n):
                y = 520 - i * 74
                stroke = f' stroke="{INK}" stroke-width="3"' if col == LIME else ""
                c.append(f'<circle cx="{x}" cy="{y}" r="36" fill="{col}"{stroke}/>')
        c.append(f'<circle cx="370" cy="96" r="22" fill="{ORANGE}"/>')
    elif category == "relationships":
        # 重なる2つの大きな輪と、まわりの小さな丸(人と人のつながり)
        c.append(f'<circle cx="170" cy="300" r="130" fill="{PINK}" fill-opacity="0.9"/>')
        c.append(f'<circle cx="300" cy="330" r="130" fill="{PURPLE}" fill-opacity="0.85" style="mix-blend-mode:multiply"/>')
        for x, y, r, col in [(80, 120, 18, INK), (390, 140, 26, LIME), (110, 520, 22, SKY), (380, 530, 16, INK), (250, 90, 12, ORANGE)]:
            stroke = f' stroke="{INK}" stroke-width="3"' if col == LIME else ""
            c.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{col}"{stroke}/>')
    else:
        # 整列したチーム。いくつかは役割の色、1つだけ抜けている(手が回らない)
        colors = {
            (0, 0): GREEN, (1, 1): YELLOW, (2, 0): INK, (3, 2): GREEN, (0, 3): INK,
            (2, 2): BLUE, (1, 4): YELLOW, (3, 4): INK, (0, 5): GREEN, (2, 5): LIME,
        }
        for row in range(6):
            for col in range(4):
                x, y = 70 + col * 100, 70 + row * 98
                if (col, row) == (3, 0):
                    c.append(f'<circle cx="{x}" cy="{y}" r="34" fill="none" stroke="{INK}" stroke-width="3" stroke-dasharray="7 7"/>')
                    continue
                fill = colors.get((col, row), "#e9e9e9")
                stroke = f' stroke="{INK}" stroke-width="3"' if fill == LIME else ""
                c.append(f'<circle cx="{x}" cy="{y}" r="34" fill="{fill}"{stroke}/>')
    return f'<svg width="460" height="630" viewBox="0 0 460 630" xmlns="http://www.w3.org/2000/svg">{"".join(c)}</svg>'


LOGO = (
    '<svg width="34" height="34" viewBox="0 0 100 100" fill="none">'
    '<path d="M68 22A32 32 0 1 0 68 78" stroke="#111" stroke-width="9" stroke-linecap="round"/>'
    '<path d="M68 22L74 16" stroke="#111" stroke-width="9" stroke-linecap="round"/></svg>'
)


def html(a: dict) -> str:
    title = "<br>".join(a["title"])
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;900&family=Poppins:wght@500;600&family=Oswald:wght@500&display=block" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1200px;height:630px;background:#fff;color:{INK};font-family:'Noto Sans JP',sans-serif;overflow:hidden;position:relative}}
.l{{position:absolute;left:72px;top:64px;bottom:60px;width:640px;display:flex;flex-direction:column}}
.label{{font-family:Poppins;font-weight:600;font-size:22px;letter-spacing:0}}
.pill{{align-self:flex-start;margin-top:22px;background:{INK};color:#fff;border-radius:99px;padding:5px 18px 6px;font-size:18px;font-weight:700;letter-spacing:.04em}}
h1{{margin-top:30px;font-weight:900;font-size:62px;line-height:1.3;letter-spacing:.02em}}
.sub{{margin-top:22px;font-weight:700;font-size:22px;color:#6a6a6a;letter-spacing:.04em}}
.brand{{margin-top:auto;display:flex;align-items:center;gap:10px;font-family:Oswald;font-weight:500;font-size:24px;letter-spacing:.04em}}
.r{{position:absolute;right:56px;top:0}}
.rule{{position:absolute;left:72px;right:72px;bottom:0;height:10px;background:{INK}}}
</style></head><body>
<div class="l"><p class="label">( Column )</p><span class="pill">{CATEGORY[a["category"]]}</span>
<h1>{title}</h1><p class="sub">{a["sub"]}</p>
<div class="brand">{LOGO}<span>COMMON FUTURE</span></div></div>
<div class="r">{motif(a["category"])}</div>
</body></html>"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=2)
        for a in ARTICLES:
            pg.set_content(html(a), wait_until="networkidle")
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(300)
            png2x = OUT / f"{a['slug']}@2x.png"
            pg.screenshot(path=str(png2x))
            im = Image.open(png2x).convert("RGB")
            im.save(OUT / f"{a['slug']}.webp", "WEBP", quality=90)  # 記事表示用(2400x1260)
            im.resize((1200, 630), Image.LANCZOS).save(OUT / f"{a['slug']}.png", optimize=True)  # OG用
            png2x.unlink()
            print("wrote", a["slug"])
        b.close()


if __name__ == "__main__":
    main()
