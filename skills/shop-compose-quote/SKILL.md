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
/sandbox/.openclaw-data/skills/shop-compose-quote/shop-compose-quote.sh <drawing_id> "<customer>" <qty> <steering> [personality_json] [margin_pct] [lead_delta_days]
```

Example (no personality): `/sandbox/.openclaw-data/skills/shop-compose-quote/shop-compose-quote.sh 82-Alpha "Boeing T2" 150 balanced`

Example (with personality that bumps margin +8%, adds 2d lead):
```
shop-compose-quote.sh WING-HINGE-12 "Boeing T2" 80 balanced \
  '{"matches":[{"feedback":"pays slow — +8% margin cushion"}]}' \
  8 2
```

### Argument reference

| # | Arg | Meaning |
|---|---|---|
| 1 | `drawing_id` | Canonical id, demo alias (`demo_1`), or part/drawing number from the sidecar — all aliased to the internal canonical |
| 2 | `customer` | Customer name (quoted) |
| 3 | `qty` | Quantity; 0 triggers per-drawing default (e.g. 8 for Bosch punch tool) |
| 4 | `steering` | `balanced` \| `conservative` \| `aggressive` |
| 5 | `personality_json` | Raw JSON returned by `shop-recall-personality`. Feedbacks get cited verbatim in `reasoning`. Empty string OK. |
| 6 | `margin_pct` | Agent-supplied numeric margin delta derived from personality (e.g. "+8%" feedback → `8`). Applied on top of steering. Defaults to 0. |
| 7 | `lead_delta_days` | Agent-supplied lead shift derived from personality (e.g. "needs 2 days sooner" → `-2`). Applied on top of steering. Defaults to 0. |

### How the agent uses args 5-7 together

1. Call `shop-recall-personality` with `(customer, material, part_family)`.
2. If `matches` is non-empty, read each `feedback` string.
3. Translate the feedback into concrete numeric deltas — this is a judgment call the model makes:
   - "add 8%" / "+8%" / "pays slow — bump margin 8%" → `margin_pct=8`
   - "give them 2 extra days" / "never rush this customer" → `lead_delta=+2`
   - "tighten by 10% to keep them" → `margin_pct=-10`
4. Pass the full `personality_json` as arg 5 AND the derived deltas as args 6/7. The reasoning field will cite the feedback text AND show the neutral→adjusted numbers so Mike can verify.

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
