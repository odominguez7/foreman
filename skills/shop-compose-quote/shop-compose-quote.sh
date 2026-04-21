#!/usr/bin/env bash
# shop-compose-quote <drawing_id> <customer> <qty> <steering> — emits final quote JSON
# For demo: pre-computed for 82-Alpha/Boeing/150 across all 3 steerings
drawing="${1:-82-Alpha}"
cust="${2:-Boeing T2}"
qty="${3:-150}"
steer="${4:-balanced}"

if [ "$drawing" = "82-Alpha" ] && [ "$qty" = "150" ]; then
  case "$steer" in
    balanced) printf '{"drawing_id":"82-Alpha","customer":"%s","qty":150,"unit_price":31.00,"total_price":4650,"lead_time_days":7,"confidence":0.9,"steering":"balanced","reasoning":"Based on Job 3198 (150 pcs 6061 bracket for Boeing T2 at $4650) and Job 3215 — same material, same customer, same family. Material on hand, mill slack covers quantity.","clarifying_question":null}\n' "$cust" ;;
    conservative) printf '{"drawing_id":"82-Alpha","customer":"%s","qty":150,"unit_price":35.65,"total_price":5348,"lead_time_days":10,"confidence":0.9,"steering":"conservative","reasoning":"Historical base from Job 3198/3215 + 15%% margin cushion. Extra 3-day buffer for unexpected rework.","clarifying_question":"Hole 4 is specified at ±0.0005 — can we relax to ±0.002 to match the other holes? Will affect price and lead time."}\n' "$cust" ;;
    aggressive) printf '{"drawing_id":"82-Alpha","customer":"%s","qty":150,"unit_price":28.50,"total_price":4275,"lead_time_days":5,"confidence":0.8,"steering":"aggressive","reasoning":"Undercutting historical base by 8%% to win volume. Tightening lead by 2 days using mill slack. Job 3421 (loss at $3300 to competitor) suggests Shop Z is our aggressive benchmark.","clarifying_question":null}\n' "$cust" ;;
    *) echo '{"error":"unknown steering","hint":"Use: balanced | conservative | aggressive"}' ;;
  esac
else
  echo '{"error":"demo quote only pre-computed for 82-Alpha/Boeing/150. For other RFQs, run the 4 upstream skills and compose manually."}'
fi
