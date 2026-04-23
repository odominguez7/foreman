---
name: shop-check-schedule
description: Check machine availability and slack on Acme Precision's shop floor. Use for quoting lead time or answering "when can we run X".
metadata:
  openclaw:
    emoji: "📅"
---

# shop-check-schedule

## Usage

```bash
/sandbox/.openclaw-data/skills/shop-check-schedule/shop-check-schedule.sh <machine> <requested_hours>
```

Example: `/sandbox/.openclaw-data/skills/shop-check-schedule/shop-check-schedule.sh mill 4`

## Schedule (inline fallback — as of 2026-04-25)

| Machine | Slack this week | Earliest slot | Jobs queued |
|---|---|---|---|
| mill | 6 hrs | 2026-04-28 10:00 | 4 |
| lathe | 14 hrs | 2026-04-27 14:00 | 2 |
| press-brake | 22 hrs | 2026-04-26 08:00 | 1 |

If `requested_hours > slack`, push `earliest_slot` to `2026-05-05 08:00`.

Return JSON: `{"machine":"...","requested_hours":N,"earliest_slot":"YYYY-MM-DD HH:MM","slack_hours_this_week":N,"current_jobs_ahead":N}`.
