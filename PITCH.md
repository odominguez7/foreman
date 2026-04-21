# Wedge Agentic Edge — 60-second pitch

## The problem
Mike runs a 12-person machine shop in Pennsylvania. $8M/yr revenue. Every RFQ takes him 30 minutes to quote. He loses 40% of bids because he's too slow. Multiply by every SMB shop in the US and you have an industrial reshoring crisis.

## The product
A sovereign quoting agent that runs on Mike's shop floor. Drop any RFQ drawing into Telegram — the agent extracts it, cross-references historical jobs + inventory + machine schedule, and returns a structured quote in under 30 seconds. All on-prem. Zero customer data leaves the building.

## The differentiator that wins
**The agent learns.** When Mike corrects a quote ("too low — Boeing pays slow, add 8%"), the agent persists the correction as shop personality. Two minutes later, a different Boeing drawing arrives — the agent quotes with the +8% already applied, cites the earlier feedback in its reasoning, no explicit "remember this" needed. The personality lives in the NemoClaw sandbox data volume, survives restarts, and never leaves the shop.

Three cross-cutting vLLM steering profiles (conservative / balanced / aggressive) stack on top — same RFQ, three prices, **$1,073 swing** on a typical bracket. Real vLLM knobs (temperature + guided_json + per-profile system prompt), not prompt tricks.

## The stack
- **NemoClaw** sandbox — Landlock + seccomp + netns; one declarative YAML for the whole stack
- **vLLM + Llama 3.1 8B** on a local A100 — 4× faster than cloud Nemotron-120B; $5k hardware pays for itself in 2 months of won bids
- **Cloud Nemotron-120B fallback** for edge cases
- **Wedge Drawing Brain** (Reducto-powered) — production perception layer that handles stained scans, rotated pages, multi-language

## The numbers
- 4× faster per-turn inference vs cloud
- $1,073 steering swing (real)
- $0.06/drawing extraction, <$0.01/quote inference
- Persistent learning validated end-to-end

## The moat
Mike's historical data + his corrections + his shop's personality all live on-prem. Every bid won/lost is a training signal. Competitors who try to copy this with a hosted API give up the data moat AND sovereignty. We give the shop both.

## The ask
One team, six months, first 20 design-partner shops committed. US Manufacturing Extension Partnership intro channel. NVIDIA + Red Hat's best play here isn't another support bot — it's keeping US industry alive at machine-shop scale.
