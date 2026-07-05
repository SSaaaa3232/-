from __future__ import annotations

import io
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit

from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


HTML_PATH = Path("/Users/saaaaa/Desktop/新人教部编版高中物理必修（第三册）高清电子课本.html")
WORK_DIR = Path("/Users/saaaaa/Obsidian-Template/tmp/pdfs/wechat-g1pNHS5mzsgZOAZV_M_PrA")
PAGES_DIR = WORK_DIR / "pages"
OUTPUT_PDF = Path(
    "/Users/saaaaa/Obsidian-Template/output/pdf/"
    "新人教部编版高中物理必修（第三册）高清电子课本.pdf"
)
EXPECTED_PAGE_COUNT = 137


class ImageTagParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.images: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "img":
            self.images.append({key: value or "" for key, value in attrs})


def article_pages() -> list[dict[str, object]]:
    parser = ImageTagParser()
    parser.feed(HTML_PATH.read_text(encoding="utf-8", errors="replace"))
    pages: dict[int, dict[str, object]] = {}

    for attrs in parser.images:
        classes = attrs.get("class", "").split()
        data_src = attrs.get("data-src", "")
        if "rich_pages" not in classes or "imgIndex=" not in data_src:
            continue
        match = re.search(r"(?:#|&)imgIndex=(\d+)", data_src)
        if not match:
            continue
        index = int(match.group(1))
        pages[index] = {
            "index": index,
            "src": attrs.get("src", ""),
            "data_src": data_src,
        }

    ordered = [pages[index] for index in sorted(pages)]
    expected = list(range(EXPECTED_PAGE_COUNT))
    actual = [int(page["index"]) for page in ordered]
    if actual != expected:
        missing = sorted(set(expected) - set(actual))
        extra = sorted(set(actual) - set(expected))
        raise RuntimeError(f"Unexpected page index set; missing={missing}, extra={extra}")
    return ordered


def local_source(src: str) -> Path | None:
    if not src or src.startswith(("data:", "http://", "https://")):
        return None
    path = (HTML_PATH.parent / unquote(src)).resolve()
    return path if path.is_file() else None


def original_resolution_url(url: str) -> str:
    parts = urlsplit(url)
    path = re.sub(r"/640$", "/0", parts.path)
    return urlunsplit((parts.scheme, parts.netloc, path, parts.query, ""))


def download_image(url: str) -> bytes:
    candidates = [original_resolution_url(url), urlunsplit((*urlsplit(url)[:4], ""))]
    last_error: Exception | None = None
    for candidate in dict.fromkeys(candidates):
        for attempt in range(3):
            try:
                request = urllib.request.Request(
                    candidate,
                    headers={
                        "User-Agent": (
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                            "AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
                        ),
                        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
                    },
                )
                with urllib.request.urlopen(request, timeout=30) as response:
                    data = response.read()
                if len(data) < 1024:
                    raise RuntimeError(f"Downloaded payload is too small: {len(data)} bytes")
                return data
            except Exception as exc:
                last_error = exc
                time.sleep(0.5 * (attempt + 1))
    raise RuntimeError(f"Unable to download image: {last_error}")


def convert_to_jpeg(data: bytes, destination: Path) -> tuple[int, int]:
    with Image.open(io.BytesIO(data)) as image:
        image.load()
        if image.mode != "RGB":
            background = Image.new("RGB", image.size, "white")
            if "A" in image.getbands():
                background.paste(image, mask=image.getchannel("A"))
            else:
                background.paste(image.convert("RGB"))
            image = background
        image.save(destination, "JPEG", quality=95, subsampling=0, optimize=True)
        return image.size


def prepare_page(page: dict[str, object]) -> dict[str, object]:
    index = int(page["index"])
    destination = PAGES_DIR / f"{index + 1:03d}.jpg"
    source_path = local_source(str(page["src"]))
    try:
        data = download_image(str(page["data_src"]))
        source_kind = "downloaded_original"
    except Exception:
        if source_path is None:
            raise
        data = source_path.read_bytes()
        source_kind = "local_fallback"
    width, height = convert_to_jpeg(data, destination)
    if width < 900 or height < 1200:
        raise RuntimeError(f"Page {index + 1} is unexpectedly small: {width}x{height}")
    return {
        "page": index + 1,
        "path": str(destination),
        "width": width,
        "height": height,
        "source": source_kind,
    }


def build_pdf(page_rows: list[dict[str, object]]) -> None:
    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    page_width, page_height = A4
    pdf = canvas.Canvas(str(OUTPUT_PDF), pagesize=A4, pageCompression=1)
    pdf.setTitle("新人教部编版高中物理必修（第三册）高清电子课本")
    pdf.setAuthor("跟谢老师学语文")
    pdf.setSubject("公众号文章图片整理")

    for row in page_rows:
        image_width = float(row["width"])
        image_height = float(row["height"])
        scale = min(page_width / image_width, page_height / image_height)
        draw_width = image_width * scale
        draw_height = image_height * scale
        x = (page_width - draw_width) / 2
        y = (page_height - draw_height) / 2
        pdf.setFillColorRGB(1, 1, 1)
        pdf.rect(0, 0, page_width, page_height, fill=1, stroke=0)
        pdf.drawImage(
            str(row["path"]),
            x,
            y,
            width=draw_width,
            height=draw_height,
            preserveAspectRatio=True,
            mask="auto",
        )
        pdf.showPage()
    pdf.save()


def main() -> None:
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    pages = article_pages()
    rows: list[dict[str, object]] = []
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(prepare_page, page): int(page["index"]) for page in pages}
        for future in as_completed(futures):
            rows.append(future.result())
    rows.sort(key=lambda row: int(row["page"]))
    build_pdf(rows)
    summary = {
        "pages": len(rows),
        "downloaded_original": sum(row["source"] == "downloaded_original" for row in rows),
        "local_fallback": sum(row["source"] == "local_fallback" for row in rows),
        "pdf": str(OUTPUT_PDF),
        "pdf_bytes": OUTPUT_PDF.stat().st_size,
        "dimensions": sorted({f'{row["width"]}x{row["height"]}' for row in rows}),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
