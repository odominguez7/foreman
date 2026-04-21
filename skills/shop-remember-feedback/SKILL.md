---
name: shop-remember-feedback
description: Persist a shop-owner correction or preference to the shop's long-term personality store. Call this whenever the user (Mike, the shop owner) corrects a quote, expresses a preference about a customer, or shares a pricing rule. Future quotes for the same customer will automatically recall this feedback.
metadata:
  openclaw:
    emoji: "🧠"
---

# shop-remember-feedback

## When to call this

Call this skill immediately whenever the user says things like:
- "Too high / too low — [amount] / [direction]"
- "This customer always [...]"
- "Add [X]% for this customer"
- "Boeing pays slow"
- "Never quote under [...] for this material"

Don't wait for explicit instruction. Corrections are training signals. Capture them.

## Usage

```bash
/sandbox/.openclaw-data/skills/shop-remember-feedback/shop-remember-feedback.sh "<customer>" "<material>" "<part_family>" "<feedback>"
```

Example:
```bash
/sandbox/.openclaw-data/skills/shop-remember-feedback/shop-remember-feedback.sh "Boeing T2" "6061 aluminum" "bracket" "Customer pays slow — always add 8% margin cushion"
```

Fields:
- `customer` — customer name as it appeared in the RFQ (exact match)
- `material` — material spec from the drawing (e.g. "6061 aluminum", "1018 steel", "AISI D-2")
- `part_family` — part style keyword ("bracket", "shaft", "housing", etc.) — optional but improves recall precision
- `feedback` — short, action-oriented. What should future quotes DO differently? ("add 8%", "prefer 10-day lead", "never quote under $X/hr", etc.)

## Return shape

```json
{"stored": true, "customer": "...", "feedback": "...", "total_personality_entries": N, "storage": "/sandbox/.openclaw-data/shop-memory/personality.jsonl"}
```
