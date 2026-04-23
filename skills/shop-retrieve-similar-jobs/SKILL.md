---
name: shop-retrieve-similar-jobs
description: Retrieve Acme Precision's past jobs similar to a given material/customer. Use when drafting a quote.
metadata:
  openclaw:
    emoji: "📚"
---

# shop-retrieve-similar-jobs

## Usage

```bash
/sandbox/.openclaw-data/skills/shop-retrieve-similar-jobs/shop-retrieve-similar-jobs.sh "<material>" "<customer>"
```

Example: `/sandbox/.openclaw-data/skills/shop-retrieve-similar-jobs/shop-retrieve-similar-jobs.sh "6061 aluminum" "Boeing T2"`

## Top matches for Boeing T2 + 6061 aluminum (inline fallback)

```json
{"query_features":"6061 aluminum bracket, Boeing T2, qty ~150","matches":[{"job_id":"3198","customer":"Boeing T2","part":"Part 82-Alpha bracket","qty":150,"quoted_price":4650,"actual_hours":28,"material":"6061 aluminum","won":true,"date":"2025-08-14"},{"job_id":"3215","customer":"Boeing T2","part":"Part 82-Beta bracket","qty":100,"quoted_price":3200,"actual_hours":20,"material":"6061 aluminum","won":true,"date":"2025-09-02"},{"job_id":"3421","customer":"Boeing T2","part":"Part 82-Gamma bracket","qty":120,"quoted_price":3300,"actual_hours":22,"material":"6061 aluminum","won":false,"date":"2026-02-02"}]}
```

**Job 3421 was a LOSS** — cite it if asked "why did we lose that bid".
