#!/usr/bin/env python3
"""Local PDF extraction: dump raw text + best-effort fields for the agent to structure."""
import sys, json, re
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print(json.dumps({"error": "pdfplumber not installed", "hint": "pip install pdfplumber in ~/wedge-venv"}))
    sys.exit(0)

if len(sys.argv) < 2:
    print(json.dumps({"error": "pass a PDF file path"}))
    sys.exit(0)

pdf_path = Path(sys.argv[1])
if not pdf_path.exists():
    print(json.dumps({"error": "file not found", "path": str(pdf_path)}))
    sys.exit(0)

text_blocks = []
try:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            t = (page.extract_text() or "").strip()
            if t:
                text_blocks.append(t)
except Exception as e:
    print(json.dumps({"error": f"pdfplumber failed: {e}"}))
    sys.exit(0)

raw_text = "\n\n".join(text_blocks)

# Best-effort regex first-pass (the agent + Kimi will do the heavy reasoning)
patterns = {
    "drawing_number": r"(?:DRAWING|DWG|DWG NO|DRG)[\s:.#]*([A-Z0-9][A-Z0-9\-/_]{3,20})",
    "part_number":    r"(?:PART NO|P/N|PART #|PART NUMBER)[\s:.#]*([A-Z0-9][A-Z0-9\-/_]{3,20})",
    "revision":       r"(?:REV|REVISION)[\s:.#]*([A-Z0-9][A-Z0-9\-]{0,5})",
    "scale":          r"(?:SCALE)[\s:.]*(\d+\s*:\s*\d+)",
    "material_hint":  r"(?:MATERIAL|MAT\.?|MAT'L)[\s:.]*([A-Za-z0-9][^\n]{2,50}?)(?:\n|  +)",
    "finish_hint":    r"(?:FINISH|FINISHING|COATING|TREATMENT)[\s:.]*([A-Za-z][^\n]{2,60}?)(?:\n|  +)",
}
detected = {}
for key, pat in patterns.items():
    m = re.search(pat, raw_text, re.IGNORECASE)
    if m:
        detected[key] = m.group(1).strip()

# Numeric-tolerance heuristic: count values like ±0.001, 0.5+0.1, etc.
tol_hits = re.findall(r"[±+\-]\s*\d+\.\d{1,5}", raw_text)

result = {
    "source": "local-pdfplumber",
    "file": pdf_path.name,
    "pages": len(text_blocks),
    "detected_fields": detected,
    "tolerance_markers_count": len(tol_hits),
    "raw_text": raw_text[:6000],
    "hint_for_agent": "raw_text is a best-effort dump. Use it + detected_fields + Wedge schema to produce structured JSON with drawing_id, material, qty, critical_dims, features, finish, flags, est_cycle_time_hrs. If text is sparse or garbled, say so in 'flags'."
}
print(json.dumps(result))
