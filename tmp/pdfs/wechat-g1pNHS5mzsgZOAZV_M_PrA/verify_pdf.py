from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageStat
from pypdf import PdfReader


PDF_PATH = Path(
    "/Users/saaaaa/Obsidian-Template/output/pdf/"
    "新人教部编版高中物理必修（第三册）高清电子课本.pdf"
)
RENDER_DIR = Path(
    "/Users/saaaaa/Obsidian-Template/tmp/pdfs/"
    "wechat-g1pNHS5mzsgZOAZV_M_PrA/rendered"
)
CONTACT_DIR = Path(
    "/Users/saaaaa/Obsidian-Template/tmp/pdfs/"
    "wechat-g1pNHS5mzsgZOAZV_M_PrA/contact-sheets"
)
EXPECTED_PAGES = 137


def page_number(path: Path) -> int:
    match = re.search(r"-(\d+)\.jpg$", path.name)
    if not match:
        raise ValueError(f"Cannot parse page number from {path.name}")
    return int(match.group(1))


def main() -> None:
    reader = PdfReader(str(PDF_PATH))
    if len(reader.pages) != EXPECTED_PAGES:
        raise RuntimeError(f"PDF page count is {len(reader.pages)}, expected {EXPECTED_PAGES}")

    previews = sorted(RENDER_DIR.glob("preview-*.jpg"), key=page_number)
    if len(previews) != EXPECTED_PAGES:
        raise RuntimeError(f"Rendered page count is {len(previews)}, expected {EXPECTED_PAGES}")

    blank_pages: list[int] = []
    hashes: dict[str, list[int]] = {}
    metrics: list[dict[str, float | int]] = []
    images: list[Image.Image] = []

    for page, path in enumerate(previews, start=1):
        with Image.open(path) as opened:
            image = opened.convert("RGB")
        gray = image.convert("L")
        stat = ImageStat.Stat(gray)
        nonwhite = sum(1 for value in gray.getdata() if value < 248) / (gray.width * gray.height)
        stddev = float(stat.stddev[0])
        if nonwhite < 0.02 or stddev < 5:
            blank_pages.append(page)
        digest = hashlib.sha256(image.tobytes()).hexdigest()
        hashes.setdefault(digest, []).append(page)
        metrics.append(
            {
                "page": page,
                "mean": round(float(stat.mean[0]), 2),
                "stddev": round(stddev, 2),
                "nonwhite_fraction": round(nonwhite, 4),
            }
        )
        images.append(image)

    duplicate_groups = [pages for pages in hashes.values() if len(pages) > 1]
    if blank_pages:
        raise RuntimeError(f"Potential blank rendered pages: {blank_pages}")
    if duplicate_groups:
        raise RuntimeError(f"Duplicate rendered page groups: {duplicate_groups}")

    CONTACT_DIR.mkdir(parents=True, exist_ok=True)
    for old in CONTACT_DIR.glob("contact-*.jpg"):
        old.unlink()

    columns, rows = 5, 5
    thumb_width, thumb_height = 210, 296
    label_height, gap = 26, 12
    sheet_width = gap + columns * (thumb_width + gap)
    sheet_height = gap + rows * (thumb_height + label_height + gap)
    per_sheet = columns * rows

    for sheet_index, start in enumerate(range(0, len(images), per_sheet), start=1):
        sheet = Image.new("RGB", (sheet_width, sheet_height), "#d7d7d7")
        draw = ImageDraw.Draw(sheet)
        for slot, image in enumerate(images[start : start + per_sheet]):
            row, column = divmod(slot, columns)
            x = gap + column * (thumb_width + gap)
            y = gap + row * (thumb_height + label_height + gap)
            thumb = image.copy()
            thumb.thumbnail((thumb_width, thumb_height), Image.Resampling.LANCZOS)
            offset_x = x + (thumb_width - thumb.width) // 2
            offset_y = y + (thumb_height - thumb.height) // 2
            sheet.paste(thumb, (offset_x, offset_y))
            page = start + slot + 1
            draw.text((x + 4, y + thumb_height + 5), f"Page {page}", fill="black")
        sheet.save(CONTACT_DIR / f"contact-{sheet_index:02d}.jpg", quality=92)

    summary = {
        "pdf_pages": len(reader.pages),
        "rendered_pages": len(previews),
        "blank_pages": blank_pages,
        "duplicate_groups": duplicate_groups,
        "contact_sheets": len(list(CONTACT_DIR.glob("contact-*.jpg"))),
        "min_nonwhite_fraction": min(item["nonwhite_fraction"] for item in metrics),
        "min_stddev": min(item["stddev"] for item in metrics),
        "max_stddev": max(item["stddev"] for item in metrics),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
