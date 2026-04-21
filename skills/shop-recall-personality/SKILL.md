---
name: shop-recall-personality
description: Retrieve any past shop-owner feedback relevant to the current RFQ. Always call this BEFORE composing a quote. If the matches array is non-empty, you MUST incorporate the feedback into the quote's reasoning and pricing, and cite the feedback in the quote's `reasoning` field.
metadata:
  openclaw:
    emoji: "🧠"
---

# shop-recall-personality

## When to call this

**Call this BEFORE every shop-compose-quote.** Every time. It returns any accumulated corrections / preferences the shop owner has shared previously about this customer or material.

Even if the match set is empty, call it — showing that you checked is part of being trustworthy to Mike.

## Usage

```bash
/sandbox/.openclaw-data/skills/shop-recall-personality/shop-recall-personality.sh "<customer>" "<material>" "<part_family>"
```

Example:
```bash
/sandbox/.openclaw-data/skills/shop-recall-personality/shop-recall-personality.sh "Boeing T2" "6061 aluminum" "bracket"
```

## Return shape

```json
{
  "matches": [
    {
      "ts": 1234567890,
      "customer": "Boeing T2",
      "material": "6061 aluminum",
      "part_family": "bracket",
      "feedback": "Customer pays slow — always add 8% margin cushion"
    }
  ],
  "query": {"customer": "Boeing T2", "material": "6061 aluminum", "part_family": "bracket"}
}
```

## How to incorporate matches into the quote

When the `matches` array has one or more entries:

1. **Apply the feedback** to the pricing, lead time, or clarifying question.
2. **Cite the feedback** explicitly in the quote's `reasoning` field — e.g. "Applied +8% margin per prior feedback on Boeing T2 payment terms (recorded 2026-04-25)."
3. **Be transparent** — the user should always know why the quote differs from the neutral base.

If the user ever says "ignore personality" or "don't apply that rule this time", skip incorporation for this one quote but do NOT delete the stored feedback.
