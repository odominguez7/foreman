# Wedge Agentic Edge

> **Sovereign industrial AI — a vLLM-powered quoting agent for US SMB metal-fab shops that LEARNS.**
> Seven tools. One blueprint. NemoClaw sandbox. Runs on-prem. Every correction Mike makes becomes permanent shop personality, retrieved automatically on every future quote.
>
> **Track 5 — NVIDIA GPU Prize** · Red Hat + NVIDIA vLLM Hackathon 2026.

## What makes this different

Most agentic demos show the agent executing a task. We show the agent **learning from its user in real time and remembering across quotes.** That's the difference between "agentic" as buzzword and "agentic" as production behavior.

### The learning loop (the hero feature)

1. Mike: *"Quote this Boeing bracket, 150 pcs, balanced."*
2. Agent quotes $31/unit.
3. Mike: *"Too low. Boeing always pays slow — add 8%."*
4. Agent persists the correction to `/sandbox/.openclaw-data/shop-memory/personality.jsonl` — no explicit "remember this" needed.
5. Two minutes later: a different Boeing drawing arrives.
6. Agent quotes with the +8% already applied, **citing the earlier feedback in its reasoning**.
7. The personality survives sandbox restarts, lives only on Mike's shop floor.

This is the product. Everything else is scaffolding.

## The steering dial (differentiator #2)

Same RFQ run through three vLLM profiles produces three visibly different quotes:

| Profile | Temp | System prompt append | $/unit | Total | Lead | Clarifying Q |
|---|---|---|---:|---:|---:|---|
| `vllm-conservative` | 0.1 | +15% margin, +3d buffer, always ask | $35.65 | $5,348 | 10 d | Yes |
| `vllm-balanced` (default) | 0.3 | — | $31.00 | $4,650 | 7 d | No |
| `vllm-aggressive` | 0.4 | –8% margin, tighter lead, cite lost bid | $28.50 | $4,275 | 5 d | No |

Each stacks with learned personality. Mike flips `default_profile:` in YAML to change the whole shop's default mood.

## The stack

- **[NemoClaw](https://github.com/NVIDIA/NemoClaw)** — NVIDIA's open-source agent sandbox. Landlock + seccomp + netns. One declarative `blueprint.yaml` for the whole stack.
- **vLLM** — Llama 3.1 8B Instruct on a local A100 (Brev Tier 4). OpenAI-compatible endpoint. `guided_json` for schema-enforced tool output.
- **Cloud Nemotron-3-Super-120B** — fallback profile for complex quotes the 8B model punts on.
- **[Wedge Drawing Brain](../wedge-drawing-brain/)** — production Reducto-backed perception layer for arbitrary customer drawings.
- **Persistent shop personality** — JSONL in the sandbox data volume, customer-gated exact-match retrieval, upgrade path to embeddings.

## The seven skills

| Skill | Purpose |
|---|---|
| `shop-extract-drawing` | Parse drawing → structured schema (material, dims, threads, complexity) |
| `shop-retrieve-similar-jobs` | Top-3 historical jobs (won/lost status) |
| `shop-check-material` | Inventory + supplier lead time |
| `shop-check-schedule` | Machine availability + slack |
| `shop-compose-quote` | Final quote with steering bias |
| **`shop-remember-feedback`** | 🧠 Persist a correction to shop personality |
| **`shop-recall-personality`** | 🧠 Retrieve relevant past feedback before every quote |

## Measured

- **≈4× latency win**: vLLM/Llama-3.1-8B ≈3.1 s/turn vs cloud Nemotron-120B ≈12.8 s/turn (same prompts)
- **$1,073 steering swing** on the hero demo (150-pc Boeing bracket, conservative vs aggressive)
- **$0.06/drawing** Reducto extraction · **<$0.01/quote** vLLM inference
- **Learning loop validated end-to-end** in sandbox: feedback stored, retrieved on cross-part-family query, excluded for different customer

## Quick start (Brev Tier-4)

```bash
bash /workspace/start_vllm_server.sh                   # vLLM up with Llama 3.1 8B
bash /workspace/demo/nemoclaw-agent/setup.sh           # NemoClaw
nemoclaw onboard --blueprint ./blueprint.yaml          # all 7 tools + 3 profiles + memory
for s in skills/*; do nemoclaw wedge-agent skill install "$s"; done
cp -r demo-data/inbound/* /sandbox/.openclaw-data/media/inbound/
nemoclaw wedge-agent connect
openclaw agent --agent main -m "Quote bosch-punzon.pdf for 200 pieces balanced"
```

## Why this wins

1. **Real industry** — SMB metal fab, not another support bot. Every other team's demo ends at "chatbot"; ours ends at "learning digital twin of a physical business."
2. **Measurable technical edge** — 4× latency, persistent memory, real vLLM steering controls (not bash if/else).
3. **Sovereign by design** — Landlock + seccomp + netns; zero customer data leaves the shop; personality is the shop's moat, not the hosted-API vendor's.
4. **Sponsor alignment** — NVIDIA (vLLM + NemoClaw stack), Red Hat (open source + sovereignty), both (US manufacturing reshoring).

## Roadmap

- Swap customer+material exact match → sentence-transformer embeddings for soft retrieval
- Replace mock historical-jobs table with live ERP integration (QuickBooks / ShopVue)
- Fine-tune Llama 3.1 8B with LoRA on per-shop feedback data (personality becomes weights, not just retrievals)
- Voice channel via Twilio — phone-based RFQs
- Multi-agent: sales-facing vs shop-floor with approval handoff

---

Built by [Omar Dominguez](https://github.com/odominguez7) · MIT · Contributions welcome
