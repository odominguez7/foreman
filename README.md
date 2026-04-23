# Foreman

> A quoting hand for small and mid-size US machine shops. Reads the drawing, checks the schedule, writes the quote, remembers what you tell it. Runs on a computer in your shop; your drawings never leave the building.

Built for MIT AI Studio (MAS.664) as an open-source release.

**Status:** working demo. 7 skills wired, 3 steering profiles, persistent learning loop, 5 real and synthetic demo drawings (including one Spanish-language Bosch punch tool in tool steel).

---

## Why Foreman exists

A $10M US machine shop quotes 80 to 120 RFQs per week. Each quote takes the best estimator (usually the owner) 30 to 90 minutes. Shops lose 30 to 50 percent of bids because they cannot respond fast enough. If a shop answered 20 percent more RFQs at the same close rate, that is 20 percent more revenue, directly.

Existing tools either target enterprise shops (Paperless Parts, Xometry Toolbox) or are generic spreadsheet calculators. Nothing in this segment learns from the owner the way a human foreman does.

Foreman is the tool I wish existed. It does what an experienced foreman does, every day, for every RFQ. And it remembers every correction the owner makes.

---

## What it does (the 90 second version)

1. **Extracts** structured fields from a drawing PDF (material, tolerances, features, finish), even for Spanish-language or old scanned drawings. Reducto handles the perception.
2. **Retrieves** the shop's three most similar past jobs (won and lost), with actual hours and quoted prices.
3. **Checks** raw-material inventory and machine schedule slack in parallel.
4. **Recalls** any prior feedback the owner has given for this customer + material + part family.
5. **Composes** a draft quote under one of three steering profiles (careful, normal, aggressive), with the neutral-vs-adjusted math shown in the reasoning field.
6. **Remembers** every correction the owner makes ("Boeing pays slow, add 8 percent") and applies it automatically to the next matching RFQ.

The last step is the product. Everything else is scaffolding for it.

---

## Architecture

```
  ┌─────────────────────────────────────────────────────────────┐
  │                    NemoClaw Sandbox                         │
  │                    (Landlock + seccomp + netns)             │
  │                                                             │
  │  ┌───────────┐     ┌─────────────────────────────────┐      │
  │  │ Owner     │────▶│ Foreman Agent                   │      │
  │  │ (Telegram │     │ Llama 3.1 8B on vLLM, guided    │      │
  │  │  or CLI)  │     │ JSON, 3 steering profiles       │      │
  │  └───────────┘     └──────┬──────────────────────────┘      │
  │                           │ tool calls                      │
  │        ┌──────────────────┴────────────────────┐            │
  │        ▼                                       ▼            │
  │  ┌─────────────────┐                   ┌─────────────────┐  │
  │  │ Quoting loop    │                   │ Learning loop   │  │
  │  │ (5 skills)      │                   │ (2 skills)      │  │
  │  │                 │                   │                 │  │
  │  │ extract-drawing │                   │ remember-       │  │
  │  │ retrieve-       │                   │   feedback ────┐│  │
  │  │   similar-jobs  │◀──────uses──── recall-            ││  │
  │  │ check-material  │                   │   personality  ││  │
  │  │ check-schedule  │                                   ▼│  │
  │  │ compose-quote ◀─────────reads personality────────────┘  │
  │  └─────────────────┘                  personality.jsonl    │
  │                                       (persistent volume)   │
  └─────────────────────────────────────────────────────────────┘
```

A single declarative `blueprint.yaml` defines: three vLLM profiles, network allowlist (host.openshell.internal, integrate.api.nvidia.com), read/write filesystem scopes, personality-store location, agent system prompt, and the tool registry. Swap runtimes, swap profiles, swap the inference backend without touching the skills.

---

## The seven skills

| Skill | Purpose |
|---|---|
| `shop-extract-drawing` | Drawing PDF → structured schema. Three tiers: cached demo fast path, pre-staged Reducto sidecar, pdfplumber local fallback. |
| `shop-retrieve-similar-jobs` | Top-3 historical jobs for a material + customer, including at least one loss for benchmark pricing. |
| `shop-check-material` | Raw-material inventory and supplier lead time. |
| `shop-check-schedule` | Machine slack and earliest available slot. |
| `shop-compose-quote` | Final quote under one of three steering profiles; accepts an optional `personality_json` and agent-supplied `margin_pct` / `lead_delta_days` derived from recalled feedback. |
| `shop-remember-feedback` | Persists a correction to `personality.jsonl` in the sandbox data volume. |
| `shop-recall-personality` | Customer-gated retrieval over the personality store; called before every compose. |

Each skill is a `SKILL.md` + a bash (or bash + python) runner. The `SKILL.md` uses absolute paths under `/sandbox/.openclaw-data/skills/...` and embeds an inline JSON fallback so the agent can answer from the documentation even if the script fails.

---

## Steering profiles

Same drawing, same customer, same quantity, three visibly different quotes. Measured on the hero demo (150-pc Boeing 82-Alpha bracket, 6061 aluminum):

| Profile | Temp | System prompt append | $/unit | Total | Lead | Clarifying Q |
|---|---|---|---:|---:|---:|---|
| **Careful** (conservative) | 0.1 | +15% margin, +3d buffer, always ask | $35.65 | $5,348 | 10 d | Yes |
| **Normal** (balanced, default) | 0.3 | — | $31.00 | $4,650 | 7 d | No |
| **Aggressive** | 0.4 | –8% margin, tighter lead, cite lost bid | $28.52 | $4,278 | 5 d | No |

Swing of $1,070 on a single RFQ. The profile is set in `blueprint.yaml` and can be flipped by the owner at any time. Steering stacks on top of learned personality (margin and lead adjustments from stored feedback apply on top of the steering-chosen base).

---

## Quick start

**You need:**
- A Linux box with NVIDIA GPU (A10 or better, 24 GB VRAM minimum for Llama 3.1 8B at fp16)
- CUDA 12.1+, Python 3.10+
- `git`, `bash`, Node.js 20+ (for NemoClaw CLI)
- Docker or Podman

**Step 1. Clone and install dependencies.**

```bash
git clone https://github.com/odominguez7/wedge-agentic-edge.git foreman
cd foreman

# vLLM venv for inference server
python3 -m venv /opt/vllm-venv
/opt/vllm-venv/bin/pip install vllm==0.6.3 huggingface_hub

# NemoClaw CLI
npm install -g @nvidia/nemoclaw-cli
```

**Step 2. Start the inference server.**

```bash
export HF_TOKEN=hf_your_token_here  # get one at https://huggingface.co/settings/tokens
/opt/vllm-venv/bin/python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --host 0.0.0.0 --port 8000 \
  --dtype float16 --max-model-len 4096 \
  --enable-auto-tool-choice --tool-call-parser llama3_json
```

**Step 3. Onboard the NemoClaw sandbox.**

```bash
nemoclaw onboard --blueprint ./blueprint.yaml
for s in skills/shop-*; do
  nemoclaw foreman-agent skill install "$s"
done
cp -r demo-data/inbound/* /sandbox/.openclaw-data/media/inbound/
```

**Step 4. Run a quote.**

```bash
nemoclaw foreman-agent connect
openclaw agent --agent main \
  -m "Quote demo_1.pdf for Boeing, 150 pieces, normal mode"
```

Expected: $31/unit, $4,650, 7 days, confidence 0.9.

**Step 5. Try the learning loop.**

```bash
# Tell Foreman something
openclaw agent --agent main \
  -m "That quote is too low. Boeing always pays slow, add 8 percent."

# Later, a different Boeing 6061 job
openclaw agent --agent main \
  -m "Quote demo_3.pdf for Boeing, 80 pieces, normal mode"
# Expect: +8% pre-applied, feedback cited in the reasoning field,
# neutral base ($63.75/u) shown next to adjusted price ($68.85/u)
```

---

## Repository layout

```
foreman/
├── blueprint.yaml              # NemoClaw blueprint (profiles, network, memory, agent, tools)
├── skills/                     # 7 agent skills
│   ├── shop-extract-drawing/
│   ├── shop-retrieve-similar-jobs/
│   ├── shop-check-material/
│   ├── shop-check-schedule/
│   ├── shop-compose-quote/
│   ├── shop-remember-feedback/
│   └── shop-recall-personality/
├── demo-data/inbound/          # 5 demo PDFs + Reducto sidecars
├── website/copy.md             # Site copy for the public docs page
├── docs/
│   ├── DEMO_SCRIPT.md          # 5-minute live demo walkthrough
│   └── SATURDAY_PLAYBOOK.md    # Hour-by-hour bring-up playbook
└── README.md
```

---

## Limitations

Honest list. Foreman is a course project, not a production system.

- **Historical job data is synthetic.** `shop-retrieve-similar-jobs` returns a small hardcoded set (roughly 8 jobs across 6061, 1018, and 304 stainless). A real deployment wires this to the shop's ERP (ProShop, JobBOSS, E2, Global Shop, Fulcrum) via SQL or ODBC.
- **Inventory and schedule are synthetic.** `shop-check-material` and `shop-check-schedule` return fixed mock data. Production deployments pull from live systems.
- **Drawing extraction has two quality tiers.** Real drawings go through a pre-staged Reducto sidecar (accurate but pre-computed for the demo PDFs). Unknown drawings fall back to pdfplumber and agent reasoning, which is lower quality. A production build wires `shop-extract-drawing` directly to the Reducto API.
- **Personality retrieval is exact-match.** Customer name must match exactly. Real deployment would use sentence-transformer embeddings so "Boeing T2" matches "Boeing Tier 2 Supplier" and "Boeing, Inc."
- **No authentication, no audit trail.** The sandbox is single-user. A real shop would wire owner login and an append-only audit of every quote sent.
- **Language support.** Tested on English and Spanish drawings. German and Japanese not tested.
- **Scale.** Designed for one shop at a time, 80 to 120 quotes per week. Not built for multi-tenant SaaS.
- **The 4x vLLM-vs-cloud latency claim** (previously published) was a target, not a measurement. Latency depends heavily on GPU choice; we will publish real numbers once Foreman runs on a stable deployment target.

---

## Roadmap

- Swap exact-match personality retrieval for sentence-transformer embeddings.
- Replace synthetic historical-jobs table with live ERP integration (ProShop or JobBOSS first).
- Fine-tune Llama 3.1 8B with LoRA on per-shop feedback (personality becomes weights, not just retrievals).
- Voice channel via Twilio; phone-based RFQs.
- Multi-agent: sales-facing vs shop-floor with approval handoff.
- Simple web UI for shop owners who prefer not to text.

---

## License

MIT. See [LICENSE](./LICENSE).

---

## Contact

Omar Dominguez · MIT · omar.dominguez7@gmail.com · [github.com/odominguez7](https://github.com/odominguez7)

If you run a shop and want to see Foreman quote one of your own drawings live, write to the email above. We will set up a 20-minute demo.
