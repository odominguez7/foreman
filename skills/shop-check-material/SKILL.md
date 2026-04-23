---
name: shop-check-material
description: Check Acme Precision's raw-material inventory. Use for "do we have X in stock", "material availability for Y", "lead time for Z".
metadata:
  openclaw:
    emoji: "🔩"
---

# shop-check-material

## Usage

Run the bundled script using the ABSOLUTE path (do not use `~`):

```bash
/sandbox/.openclaw-data/skills/shop-check-material/shop-check-material.sh "<material>" <qty>
```

Example: `/sandbox/.openclaw-data/skills/shop-check-material/shop-check-material.sh "6061 aluminum" 150`

Supported: `6061 aluminum`, `6063 aluminum`, `4140 steel`, `1018 steel`, `304 stainless`, `316 stainless`, `brass 360`, `titanium Gr5`.

## Inventory (inline fallback)

| Material | In stock? | Lead time | Supplier |
|---|---|---|---|
| 6061 aluminum | yes (≤200 ft) | 0 days | On hand |
| 6063 aluminum | yes (≤80 ft) | 0 days | On hand |
| 4140 steel | no | 3 days | Admiral Steel |
| 1018 steel | yes (≤120 ft) | 0 days | On hand |
| 304 stainless | no | 7 days | Ryerson |
| 316 stainless | no | 10 days | Ryerson |
| Brass 360 | yes (≤40 ft) | 0 days | On hand |
| Titanium Gr5 | no | 21 days | TMS Titanium |

Return JSON: `{"material":"...","qty":N,"in_stock":true|false,"lead_time_days":N,"supplier":"..."}`.
