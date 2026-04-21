---
name: shop-compose-quote
description: Compose the final RFQ quote after running the 4 upstream shop-* skills. Applies a steering policy (conservative | balanced | aggressive) that biases pricing. This is the punchline skill.
metadata:
  openclaw:
    emoji: "💰"
---

# shop-compose-quote

## Usage

Run AFTER shop-extract-drawing, shop-retrieve-similar-jobs, shop-check-material, shop-check-schedule:

```bash
/sandbox/.openclaw/skills/shop-compose-quote/shop-compose-quote.sh <drawing_id> "<customer>" <qty> <steering>
```

Example: `/sandbox/.openclaw/skills/shop-compose-quote/shop-compose-quote.sh 82-Alpha "Boeing T2" 150 balanced`

Steering values: `balanced`, `conservative`, `aggressive`.

## Pre-computed demo output (inline fallback for 82-Alpha / Boeing T2 / 150)

### balanced
```json
{"drawing_id":"82-Alpha","customer":"Boeing T2","qty":150,"unit_price":31.00,"total_price":4650,"lead_time_days":7,"confidence":0.9,"steering":"balanced","reasoning":"Based on Job 3198 and 3215 — same material, customer, family. Material on hand, mill slack covers quantity.","clarifying_question":null}
```

### conservative
```json
{"drawing_id":"82-Alpha","customer":"Boeing T2","qty":150,"unit_price":35.65,"total_price":5348,"lead_time_days":10,"confidence":0.9,"steering":"conservative","reasoning":"Historical base + 15% margin cushion. Extra 3-day buffer for rework.","clarifying_question":"Hole 4 is at ±0.0005 — can we relax to ±0.002? Affects price and lead time."}
```

### aggressive
```json
{"drawing_id":"82-Alpha","customer":"Boeing T2","qty":150,"unit_price":28.50,"total_price":4275,"lead_time_days":5,"confidence":0.8,"steering":"aggressive","reasoning":"Undercut historical base by 8% to win volume. Tighten lead using mill slack. Job 3421 loss ($3300 to competitor) is the benchmark.","clarifying_question":null}
```

**The demo moment:** same RFQ → 3 visibly different quotes. That is the "tunable intelligence" differentiator.
