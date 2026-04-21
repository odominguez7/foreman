# Wedge Agentic Edge

> **Sovereign industrial AI — a vLLM-powered quoting agent for US SMB metal-fab shops.**
> NemoClaw sandbox. Runs on-prem. Zero customer data leaves the shop floor.
>
> **Track 5 — NVIDIA GPU Prize** · Red Hat + NVIDIA vLLM Hackathon 2026.

## What it does in one sentence

Drop an RFQ drawing (PDF, PNG, JPG — clean, stained, any language) into a Telegram bot or the shop's email — the agent extracts the machining schema, cross-references historical jobs + inventory + machine schedule, and returns a structured quote in under 30 seconds, with a steerable pricing dial (conservative / balanced / aggressive).

## The steering dial — the differentiator

Same RFQ run through three vLLM profiles produces three visibly different quotes:

| Steering profile | Temp | Extra system prompt | $/unit | Total | Lead (days) | Clarifying Q |
|---|---|---|---:|---:|---:|---|
| `vllm-conservative` | 0.1 | +15% margin, +3d buffer, always ask | $35.65 | $5,348 | 10 | Yes (hole-4 tol) |
| `vllm-balanced` (default) | 0.3 | no append | $31.00 | $4,650 | 7 | No |
| `vllm-aggressive` | 0.4 | –8% margin, –2d lead, never ask | $28.50 | $4,275 | 5 | No, cites lost bid #3421 |

**$1,073 swing** on a standard 150-piece Boeing bracket — controlled by a YAML knob, not prompt engineering.

## The stack

- **[NemoClaw](https://github.com/NVIDIA/NemoClaw)** — NVIDIA's open-source agent sandbox. Landlock + seccomp + netns isolation. One declarative `blueprint.yaml` configures the whole stack.
- **vLLM** — Llama 3.1 8B Instruct served locally on a Brev Tier-4 A100/H100. OpenAI-compatible endpoint. `guided_json` for schema-enforced tool output.
- **Cloud Nemotron-3-Super-120B** (NVIDIA Endpoints) — fallback profile for ambiguous, high-stakes quotes.
- **[Wedge Drawing Brain](./demo/wedge-drawing-brain)** (standalone FastAPI service, Reducto-backed) — production PDF perception layer. Handles stained scans, rotated pages, EN/ES/DE.
- **OpenClaw** — agent runtime + skill framework + Telegram channel.

## The five skills

| Skill | Input | Output |
|---|---|---|
| `shop-extract-drawing` | PDF filename | Structured drawing schema (material, critical dims, threads, flags, complexity) |
| `shop-retrieve-similar-jobs` | material + customer | Top-3 historical jobs with won/lost status |
| `shop-check-material` | material + qty | Stock status, supplier lead time |
| `shop-check-schedule` | machine + hours | Earliest slot, weekly slack |
| `shop-compose-quote` | drawing_id + customer + qty + steering | Final quote w/ reasoning + clarifying Q |

## Extraction has three tiers (best-accuracy first)

1. **Pre-cached demo** (`demo_1.pdf`, `demo_2.pdf`, `demo_3.pdf`) — instant, curated for the live demo
2. **Wedge sidecar** (`<filename>.wedge.json` pre-staged in the inbound dir) — real Reducto extraction, production-accurate, zero runtime network cost
3. **Local pdfplumber fallback** (inside the sandbox netns) — best-effort text extraction for any unknown PDF, handed to the model for reasoning

## Measured numbers

- **≈4× latency win**: vLLM/Llama-3.1-8B ≈3.1 s/turn vs cloud Nemotron-120B ≈12.8 s/turn on identical quote prompts
- **$0.06 per drawing** for full Wedge/Reducto extraction
- **<$0.01 per quote** for on-prem vLLM inference
- **100% tool-call success** across 20 test prompts on the hero demo PDF set

## Quick start on a Brev Tier-4 instance

```bash
# 0. Launch Brev Tier-4 (A100/H100 + Llama 3.1 pre-downloaded)

# 1. Start vLLM server
bash /workspace/start_vllm_server.sh

# 2. Install NemoClaw + onboard with our blueprint
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
nemoclaw onboard --blueprint ./blueprint.yaml

# 3. Deploy the five skills
for s in skills/*; do
  nemoclaw wedge-agent skill install "$s"
done

# 4. Stage demo data (pre-extracted Reducto sidecars)
cp -r demo-data/inbound/* /sandbox/.openclaw-data/media/inbound/

# 5. Connect and demo
nemoclaw wedge-agent connect
openclaw agent --agent main -m "Quote bosch-punzon.pdf for 200 pieces balanced steering"
```

## Files

```
blueprint.yaml              # Single declarative config: inference, tools, steering, Telegram
skills/                     # Five shop-* skills (SKILL.md + runner.sh)
demo-data/inbound/          # Pre-staged real Bosch PDFs + Reducto sidecars
docs/
  DEMO_SCRIPT.md            # 5-minute live demo (with recovery plan if anything breaks)
  SATURDAY_PLAYBOOK.md      # Hour-by-hour on-site plan
PITCH.md                    # 60-second pitch
```

## What makes this hard to copy

- **Mike's historical data is his moat.** The agent learns his shop's pricing patterns over time. Every bid won/lost tightens the steering.
- **On-prem deployment is non-negotiable** for defense-tier customers. Any hosted-API competitor loses on procurement.
- **Drawing perception is a 2-year investment.** Wedge Drawing Brain handles rotated, stained, multi-language, mixed-unit drawings at 78% first-pass accuracy. Most teams won't build that in a week.

## Roadmap post-hackathon

- Wire Wedge Drawing Brain inline (replaces the pre-staged sidecars)
- Swap mock historical-jobs table for real ERP integration (QuickBooks, ShopVue)
- Multi-agent: separate sales-facing vs shop-floor agents with approval handoff
- Voice channel: phone-based RFQs via Twilio
- Fine-tune Llama 3.1 8B on anonymized per-shop quote history

---

Built by [Omar Dominguez](https://github.com/odominguez7) · MIT · Contributions welcome
