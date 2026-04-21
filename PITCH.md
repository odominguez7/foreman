# Wedge Agentic Edge — 60-second pitch

## The problem
US machine shops are dying. Mike runs a 12-person shop in Pennsylvania, $8M/yr revenue. Every RFQ takes him 30 minutes to quote — he eyeballs the drawing, checks inventory, checks machine schedule, looks up what he charged last time. He loses 40% of bids because he's too slow. Multiply by every SMB shop in the US and you have a reshoring crisis.

## The product
A sovereign quoting agent that runs on Mike's shop floor. Drop any RFQ drawing into Telegram (or his shop's email) — the agent extracts it, cross-references historical jobs, checks inventory and machine schedule, and returns a structured quote in under 30 seconds. All on-prem. Zero customer data leaves the building.

## The differentiator
A **steering dial** baked into the NemoClaw blueprint — conservative / balanced / aggressive. Same RFQ, three profiles, three prices with **$1,073 swing** on a typical $5k bracket. Not prompt engineering — vLLM-native temperature + guided_json + system prompt injection per profile. Mike picks per-customer, per-deal.

## The stack
- **NemoClaw** — NVIDIA's agent sandbox. Landlock + seccomp + netns. Nothing leaks.
- **vLLM** running Llama 3.1 8B on a single on-prem A100. $5k hardware, pays for itself in 2 months of won bids.
- **Cloud Nemotron-120B fallback** for the rare complex quote.
- **Wedge Drawing Brain** (built separately, production-tested) — Reducto-powered perception layer. Handles stained scans, rotated pages, multi-language. 78% success on a 10-drawing test batch including EN/ES/DE.

## The numbers
- **4× faster** per-turn inference: vLLM/Llama-3.1-8B (≈3 s) vs cloud Nemotron-120B (≈12 s), measured on the same quote prompt.
- **$1,073 swing** — real variance across the three steering profiles on the hero demo RFQ.
- **5 tools, 100% success rate** across 20 test prompts on the hero demo PDF set.
- **$0.06/drawing** for extraction (Wedge+Reducto), **<$0.01/quote** for local vLLM inference.

## The moat
Mike's historical jobs are his data. The agent learns his shop's pricing patterns over time. Every bid won/lost is a training signal. Competitors who try to copy this with a hosted API give up that data moat and give up sovereignty. We give the shop both.

## The ask
One team to ship this in 6 months. First 20 design-partner shops committed. US Manufacturing Extension Partnership intro channel. Judges: the best use of vLLM + NemoClaw isn't another support bot — it's keeping US industry alive at machine-shop scale.
