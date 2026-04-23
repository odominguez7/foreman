#!/usr/bin/env python3
"""Build PDFs from every .md in research/ (except README.md) via Chrome headless."""
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import markdown

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
RESEARCH_DIR = Path(__file__).resolve().parent

CSS = """
@page { size: Letter; margin: 0.75in; }
body {
  font-family: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.5;
  color: #1a1a1a;
  max-width: 7in;
}
h1 { font-size: 22pt; border-bottom: 2px solid #1a1a1a; padding-bottom: 6pt; margin-top: 0; }
h2 { font-size: 15pt; margin-top: 24pt; border-bottom: 1px solid #ccc; padding-bottom: 3pt; }
h3 { font-size: 12pt; margin-top: 18pt; }
h4 { font-size: 11pt; margin-top: 14pt; }
p  { margin: 8pt 0; }
code { background: #f4f4f4; padding: 1pt 4pt; border-radius: 3px; font-size: 10pt; }
pre { background: #f4f4f4; padding: 10pt; border-radius: 4px; overflow-x: auto; }
table { border-collapse: collapse; margin: 12pt 0; width: 100%; font-size: 10pt; }
th, td { border: 1px solid #ccc; padding: 6pt 10pt; text-align: left; vertical-align: top; }
th { background: #f4f4f4; font-weight: 600; }
blockquote { border-left: 3px solid #999; padding-left: 12pt; color: #555; margin: 12pt 0; font-style: italic; }
a { color: #0366d6; text-decoration: none; word-break: break-all; }
ul, ol { margin: 8pt 0; padding-left: 24pt; }
li { margin: 3pt 0; }
hr { border: none; border-top: 1px solid #ccc; margin: 18pt 0; }
"""


def build_pdf(md_path: Path) -> Path:
    pdf_path = md_path.with_suffix(".pdf")
    md_text = md_path.read_text(encoding="utf-8")
    body = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "sane_lists"],
    )
    html = f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>{md_path.stem}</title>
<style>{CSS}</style></head><body>{body}</body></html>"""

    with tempfile.TemporaryDirectory() as td:
        html_path = Path(td) / "doc.html"
        html_path.write_text(html, encoding="utf-8")
        subprocess.run(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={pdf_path}",
                f"file://{html_path}",
            ],
            check=True,
            capture_output=True,
        )
    return pdf_path


def main() -> int:
    if not Path(CHROME).exists():
        print(f"Chrome not found at {CHROME}", file=sys.stderr)
        return 1
    targets = sorted(
        p for p in RESEARCH_DIR.glob("*.md")
        if p.name.lower() != "readme.md"
    )
    if not targets:
        print("No research .md files to build.")
        return 0
    for md in targets:
        pdf = build_pdf(md)
        print(f"built {pdf.relative_to(RESEARCH_DIR.parent)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
