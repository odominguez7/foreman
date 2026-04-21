#!/usr/bin/env bash
# shop-extract-drawing <filename>
# Three-tier lookup (best accuracy first):
#   1. demo_1/2/3.pdf → cached fast path (pre-curated)
#   2. <stem>.wedge.json sidecar → REAL Wedge/Reducto extraction, pre-staged
#   3. pdfplumber → local fallback, lower accuracy

filename="${1:-}"
[ -z "$filename" ] && { echo '{"error":"filename required"}'; exit 0; }

INBOUND="/sandbox/.openclaw-data/media/inbound"
SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- Tier 1: pre-cached demo PDFs ---
case "$filename" in
  demo_1.pdf) cat <<'JSON'
{"drawing_id":"82-Alpha","material":"6061 aluminum","qty":150,"features":["4 mounting holes","2 countersinks","chamfered edges","light surface finish"],"critical_dims":[{"feature":"hole 1-3","value":"0.250 in","tolerance":"±0.002"},{"feature":"hole 4","value":"0.250 in","tolerance":"±0.0005"}],"finish":"Anodize clear Type II","flags":["Hole 4 tolerance (±0.0005) is 4x tighter than holes 1-3"],"est_cycle_time_hrs":0.18,"source":"cached"}
JSON
    exit 0 ;;
  demo_2.pdf) cat <<'JSON'
{"drawing_id":"SHAFT-204","material":"1018 steel","qty":500,"features":["turned OD","drilled ID","keyway","deburr"],"critical_dims":[{"feature":"OD","value":"0.750 in","tolerance":"±0.001"},{"feature":"ID","value":"0.375 in","tolerance":"±0.002"}],"finish":"Black oxide","flags":[],"est_cycle_time_hrs":0.10,"source":"cached"}
JSON
    exit 0 ;;
  demo_3.pdf) cat <<'JSON'
{"drawing_id":"WING-HINGE-12","material":"6061 aluminum","qty":80,"features":["complex pocket","6 threaded holes","radiused corners","milled back face"],"critical_dims":[{"feature":"pocket depth","value":"0.500 in","tolerance":"±0.003"}],"finish":"Anodize Type III hard coat, 0.002 in","flags":["Drawing uses mixed imperial+metric"],"est_cycle_time_hrs":0.35,"source":"cached"}
JSON
    exit 0 ;;
esac

# Derive the stem: strip ".pdf" then anything after "---" (Telegram UUID suffix)
stem="${filename%.pdf}"
stem="${stem%%---*}"

# --- Tier 2: Wedge sidecar (real Reducto extraction, pre-staged) ---
sidecar="${INBOUND}/${stem}.wedge.json"
if [ -f "$sidecar" ] && [ -s "$sidecar" ]; then
  cat "$sidecar"
  exit 0
fi

# --- Tier 3: pdfplumber local fallback ---
file_path=""
for dir in "$INBOUND" "/sandbox/.openclaw-data/media" "/sandbox/.openclaw-data/workspace" "/sandbox" "/tmp"; do
  hit="$(find "$dir" -maxdepth 2 -iname "${stem}*.pdf" -type f 2>/dev/null | head -1)"
  [ -n "$hit" ] && { file_path="$hit"; break; }
done

if [ -z "$file_path" ]; then
  printf '{"error":"file not found","filename":"%s","stem":"%s","hint":"PDF must be in %s"}\n' "$filename" "$stem" "$INBOUND"
  exit 0
fi

VENV="/sandbox/wedge-venv/bin/python"
if [ ! -x "$VENV" ]; then
  printf '{"error":"venv missing","hint":"python3 -m venv /sandbox/wedge-venv && /sandbox/wedge-venv/bin/pip install pdfplumber"}\n'
  exit 0
fi

"$VENV" "${SKILL_DIR}/extract.py" "$file_path"
