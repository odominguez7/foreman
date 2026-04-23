#!/usr/bin/env bash
# shop-check-schedule <machine> <requested_hours>
m="$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/vf-2/mill/;s/milling machine/mill/;s/turning center/lathe/;s/^press$/press-brake/;s/^brake$/press-brake/')"
h_raw="${2:-0}"
# Coerce non-integer input to 0 so `-gt` never errors
case "$h_raw" in
  ''|*[!0-9]*) h=0 ;;
  *) h="$h_raw" ;;
esac
case "$m" in
  mill) slack=6; slot="2026-04-28 10:00"; jobs=4 ;;
  lathe) slack=14; slot="2026-04-27 14:00"; jobs=2 ;;
  press-brake) slack=22; slot="2026-04-26 08:00"; jobs=1 ;;
  *) echo '{"error":"Unknown machine","hint":"Supported: mill, lathe, press-brake"}'; exit 0 ;;
esac
if [ "$h" -gt "$slack" ]; then slot="2026-05-05 08:00"; fi
printf '{"machine":"%s","requested_hours":%d,"earliest_slot":"%s","slack_hours_this_week":%d,"current_jobs_ahead":%d}\n' "$m" "$h" "$slot" "$slack" "$jobs"
