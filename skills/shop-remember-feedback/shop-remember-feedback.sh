#!/usr/bin/env bash
# shop-remember-feedback "<customer>" "<material>" "<part_family>" "<feedback>"
# Persists one line of shop personality to /sandbox/.openclaw-data/shop-memory/personality.jsonl
# All future quotes for the same customer (or customer+material) will recall this.

set -u
MEM_DIR="/sandbox/.openclaw-data/shop-memory"
MEM_FILE="${MEM_DIR}/personality.jsonl"
mkdir -p "$MEM_DIR"
touch "$MEM_FILE"

customer="${1:-}"
material="${2:-}"
part_family="${3:-}"
feedback="${4:-}"

if [ -z "$customer" ] || [ -z "$feedback" ]; then
  echo '{"error":"usage: shop-remember-feedback \"<customer>\" \"<material>\" \"<part_family>\" \"<feedback>\""}'
  exit 0
fi

ts=$(date +%s)
# Escape JSON (very basic — replace " with \" and newlines)
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g; s/$//' | tr '\n' ' '; }

entry=$(printf '{"ts":%d,"customer":"%s","material":"%s","part_family":"%s","feedback":"%s"}\n' \
  "$ts" "$(esc "$customer")" "$(esc "$material")" "$(esc "$part_family")" "$(esc "$feedback")")

echo "$entry" >> "$MEM_FILE"

# Return confirmation
printf '{"stored":true,"customer":"%s","feedback":"%s","total_personality_entries":%d,"storage":"%s"}\n' \
  "$(esc "$customer")" "$(esc "$feedback")" "$(wc -l < "$MEM_FILE")" "$MEM_FILE"
