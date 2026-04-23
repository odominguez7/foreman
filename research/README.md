# Foreman Research

Sourced, dated research documents that back the Foreman / Wedge pitch, website copy, investor materials, and MAS.664 coursework.

Every document here must:

1. **Cite its sources** — Census, BLS, NAM, industry publications, peer-reviewed work. No numbers without a link.
2. **Be dated** — research decays. Put the research date in the header.
3. **Ship in both `.md` (source of truth) and `.pdf` (shareable)** — the `.md` is edited; the `.pdf` is regenerated from it.
4. **Earn its numbers.** If we say "20,000 shops" or "$150K/year in owner time," the math and citations sit in these files.

## Index

| # | Document | Topic | Date |
|---|---|---|---|
| 01 | [Market Sizing & Quoting Cost](01-market-sizing-and-quoting-cost.md) ([pdf](01-market-sizing-and-quoting-cost.pdf)) | How many US machine shops, how many hours/day owners spend quoting, what that time costs | 2026-04-23 |

## How to regenerate PDFs

From repo root:

```bash
python3 research/build_pdfs.py
```

Requires: Python 3, the `markdown` package (`pip3 install --user --break-system-packages markdown`), and Google Chrome installed at the default macOS path. The script converts every `.md` in `research/` (except this README) into a matching `.pdf` using Chrome headless.
