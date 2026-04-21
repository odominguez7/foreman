---
name: shop-extract-drawing
description: Extract structured data from an engineering drawing PDF. For demo_1/2/3.pdf returns pre-cached JSON; for any other PDF (Telegram uploads, etc.) runs local pdfplumber extraction and returns raw text + partial fields that YOU (the agent) must reason about to produce the final Wedge schema.
metadata:
  openclaw:
    emoji: "📐"
---

# shop-extract-drawing

## The command to run

```bash
/sandbox/.openclaw-data/skills/shop-extract-drawing/shop-extract-drawing.sh <filename>
```

`<filename>` is just the basename (e.g. `demo_1.pdf`, `0804CS3889.pdf`). The script auto-locates the file in the Telegram inbound dir, the workspace, or `/tmp`.

## Two response shapes

### Fast path (demo_1.pdf, demo_2.pdf, demo_3.pdf)

Returns ready-to-use JSON: `drawing_id`, `material`, `qty`, `features`, `critical_dims`, `finish`, `flags`, `est_cycle_time_hrs`, `source:"cached"`.

### Real path (any other filename)

Returns best-effort local extraction:
```json
{
  "source": "local-pdfplumber",
  "file": "...",
  "pages": N,
  "detected_fields": { "drawing_number": "...", "scale": "...", "material_hint": "..." },
  "tolerance_markers_count": N,
  "raw_text": "<first 6000 chars of PDF text>",
  "hint_for_agent": "..."
}
```

## Your job as the agent on the real path

When you get a `local-pdfplumber` response, you must:
1. Read `raw_text` and `detected_fields` carefully
2. Infer the Wedge schema fields: `drawing_id`, `material` (e.g. "6061 aluminum", "1018 steel", "1.2379", etc.), `qty` (from user's RFQ message if not in PDF), `features`, `critical_dims`, `finish`, `flags`
3. Populate `flags` with anything suspicious: mixed-language text, mirrored/rotated text (pdfplumber returns it reversed), low tolerance markers count, missing material
4. Produce the final structured JSON before handing off to `shop-compose-quote`

## Key rules

- Do NOT call curl directly. Do NOT attempt external Wedge service calls. The script is the only extraction path.
- Do NOT pass absolute paths — just basenames.
- If `raw_text` looks garbled or right-to-left (common for drawings with Spanish/German text), flag it and still make your best inference.
- Qty usually comes from the user's RFQ message, not the PDF. Use the quantity from the chat.
