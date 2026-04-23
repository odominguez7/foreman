# Foreman: an on-prem agentic quoting assistant for US machine shops

**Omar Dominguez**
*MIT AI Studio (MAS.664), April 2026*

---

## Abstract

Foreman is a working open-source agentic system that helps small US machine shops respond to customer Requests for Quote (RFQs) faster. The agent reads a drawing, retrieves similar past jobs from the shop's history, checks inventory and machine schedule, recalls any prior corrections the owner has given for that customer, and produces a draft quote in under three minutes. Every correction the owner makes is persisted and applied automatically to the next matching RFQ. The full stack (sandbox, inference server, model, skills, persistent memory) runs on a single GPU computer inside the shop. No data leaves the building. This paper documents the motivation, architecture, learning-loop design, observed behavior, and limitations.

---

## 1. Motivation

A US machine shop in the $5M–$30M revenue band quotes 80 to 120 RFQs per week. Each one consumes 30 to 90 minutes of the best estimator's time, who is typically the owner. Field interviews with shop owners across the United States indicate that 30 to 50 percent of bids are lost not because of price but because of response time: the shop that quoted in two hours wins, the shop that quoted in two days does not. The recovered hours, if Foreman halves quoting time, translate directly to either more quotes sent (revenue capture) or more time spent on shop-floor production work.

Existing tools either target enterprise shops (Paperless Parts, Xometry Toolbox, Fulcrum) at price points that exceed the segment's tolerance, or are generic spreadsheet calculators that do not learn from the shop's own history. None of the existing tools we examined retain a per-shop personality store: corrections the owner makes are not remembered across quotes.

Foreman targets that gap.

---

## 2. System architecture

### 2.1 Stack

| Layer | Component | Why |
|---|---|---|
| Sandbox | NemoClaw (Landlock + seccomp + netns) | Filesystem and network isolation; declarative blueprint; one configuration file for the whole stack |
| Inference | vLLM, OpenAI-compatible endpoint | Throughput, guided JSON output for tool-call reliability |
| Model | Llama 3.1 8B Instruct | Open weights, runs on a single 24 GB GPU, supports tool-calling via the llama3_json parser |
| Skills | 7 bash + python scripts | Each skill is independently testable, has an inline JSON fallback, and is registered in `blueprint.yaml` |
| Memory | Append-only JSONL on the persistent volume | Per-shop personality store; survives sandbox restarts |
| Channels | Telegram bot, CLI | Owner can quote from a phone or terminal |

### 2.2 Data flow for a single RFQ

1. Owner sends an RFQ message (Telegram or CLI) with a drawing PDF and a customer + quantity.
2. Agent calls `shop-extract-drawing(filename)`. Three-tier resolution: cached fast path for demo PDFs, pre-staged Reducto sidecar for known real drawings, pdfplumber local fallback otherwise.
3. Agent calls in parallel: `shop-retrieve-similar-jobs(material, customer)`, `shop-check-material(material, qty)`, `shop-check-schedule(machine, hours)`.
4. Agent calls `shop-recall-personality(customer, material, part_family)`. Returns matched feedback entries.
5. Agent calls `shop-compose-quote(drawing_id, customer, qty, steering, personality_json, margin_pct, lead_delta_days)`. Returns the final quote object.
6. If the owner replies with a correction, the agent calls `shop-remember-feedback(customer, material, part_family, feedback)` automatically.

### 2.3 Steering profiles

Three vLLM profiles, defined in `blueprint.yaml`, modulate output without changing the skill code:

| Profile | Temperature | System prompt append | Behavior |
|---|---:|---|---|
| Hold the line | 0.1 | +15% margin, +3d buffer, always ask | Conservative; flags risk; asks clarifying questions |
| Book rate | 0.3 | (none) | Default; standard pricing off history |
| Win it | 0.4 | -8% margin, tighter lead, cite lost bid | Aggressive; references the most recent loss |

Switching profile changes a single field in `blueprint.yaml` (`default_profile`). Every profile shares the same skill set; only the prompt envelope and sampling parameters differ.

---

## 3. The learning loop

The novel contribution is a per-shop personality store with deterministic retrieval before every compose.

### 3.1 Persist on correction

When the owner replies with a correction (e.g., "this customer pays slow, add 8 percent"), the agent's system prompt instructs it to call `shop-remember-feedback` immediately. The skill writes one JSONL row to `personality.jsonl`:

```json
{"ts": 1745324641, "customer": "Aerospace Customer A", "material": "6061 aluminum", "part_family": "bracket", "feedback": "pays slow — +8% margin cushion"}
```

### 3.2 Recall before compose

Before every `shop-compose-quote`, the agent calls `shop-recall-personality(customer, material, part_family)`. The recall scoring is intentionally simple: customer must match exactly (gate), material match adds +20, part_family match adds +10, sorted by score then by recency, top-5 returned.

### 3.3 Numeric application

When the recall match set is non-empty, the agent translates each feedback string into concrete numeric deltas (`margin_pct`, `lead_delta_days`) and passes them to `shop-compose-quote` as the 6th and 7th arguments. The compose script applies the delta on top of the steering-chosen base price and lead time, and the reasoning field cites both the verbatim feedback text AND the numeric adjustment ("Applied prior feedback for Aerospace Customer A: pays slow — +8%. Numeric adjustment: +8% margin (neutral $63.75/u → $68.85/u)"). This invariant ensures the displayed price moves in sync with the cited feedback, preventing a class of failure where a quoting agent appears to have applied a rule but the price did not actually change.

---

## 4. Observed behavior

Validated end-to-end on a Mac Colima sandbox using Kimi K2.5 as the inference model (Llama 3.1 8B work was the publication target; Kimi was the hands-on test bed because Llama 3.1 70B would not fit and Kimi reliably emitted OpenClaw tool calls on local hardware):

| Scenario | Input | Output | Notes |
|---|---|---|---|
| Demo PDF, default | demo_1.pdf · 150 pcs · book rate | $31.00/u, $4,650, 7d, no clarifying Q | Matches historical Job 3198/3215 base |
| Demo PDF, conservative | same · hold the line | $35.65/u, $5,348, 10d, asks Q on bore tolerance | +15% margin, +3d lead, clarifying-Q invariant fires |
| Demo PDF, aggressive | same · win it | $28.52/u, $4,278, 5d, cites Job 3421 loss | -8% margin, lost-bid citation |
| Real Bosch drawing | bosch-punzon.pdf · 8 pcs · hold the line | $212.75/u, $1,702, 17d, asks Q on Spanish tolerance notation | AISI D-2, 60-62 HRC; Reducto sidecar parsed correctly |
| Learning loop | demo_1 quoted at $31, owner says "pays slow add 8%", then demo_3 same customer | $68.85/u (was $63.75 neutral); reasoning cites feedback + math | personality.jsonl persists across the sequence |

Steering swing on the canonical hero RFQ (150 pcs, 6061 bracket): **$1,070** between most conservative and most aggressive, on the same drawing.

---

## 5. Limitations

The honest list (also documented in the repo README):

- **Historical jobs, inventory, and schedule are synthetic.** A production deployment wires these to the shop's existing ERP (ProShop, JobBOSS, E2, Global Shop, Fulcrum) over SQL or ODBC.
- **Drawing extraction has two quality tiers.** Real drawings go through pre-staged Reducto sidecars (accurate but pre-computed for the demo set). Unknown drawings fall back to pdfplumber and agent reasoning.
- **Personality retrieval is exact-match on customer name.** Production should use sentence-transformer embeddings for semantic match across customer aliases.
- **No authentication, no audit trail.** Single-user sandbox.
- **Language coverage tested only on English and Spanish.** German and Japanese pending.
- **Latency claims are targets, not measurements.** A previously-published "4× vLLM-versus-cloud" number was an aspiration. Real measurements depend heavily on GPU choice and will be published with a stable deployment target.

---

## 6. Related work

- **Paperless Parts** is the closest commercial competitor. SaaS, multi-tenant, $10K–$30K per shop per year. Targets shops larger than Foreman's segment. No per-shop personality store as far as published material indicates.
- **Xometry Toolbox** is a free CAD plugin tied to the Xometry marketplace. Monetizes via take-rate on jobs the marketplace fulfills. Different business model; orthogonal to Foreman.
- **Fulcrum** and **ProShop ERP** are full shop ERPs with quoting modules. Cloud-hosted, $700–$2,000 per month entry. Complementary to Foreman rather than competitive (Foreman could read from their databases).
- **Uptool** ($6M seed, 2024) is a venture-funded AI quoting startup. SaaS, multi-tenant, pricing not public. Fastest-moving direct competitor.
- **NemoClaw**, **vLLM**, and **Llama 3.1** are the open foundations; Foreman is one application built on top of them. The architectural pattern (declarative blueprint + sandboxed skills + persistent JSONL memory + a thin agent prompt) generalizes to other vertical agentic products.

---

## 7. Conclusion

The novel piece of Foreman is not the quoting itself; it is the architecture that combines on-prem inference, a declarative sandbox, simple skill scripts, and a deterministic per-shop memory loop. That combination produces an agent whose behavior is auditable, whose data sovereignty is honest, and whose intelligence accumulates with use rather than degrading toward a generic mean.

The product target (small US machine shops) is one of many small-business markets where existing tooling is built for the wrong tier and where the buyer trusts owned equipment more than rented software. The same pattern should apply.

The repository is open source under MIT license: [github.com/odominguez7/foreman](https://github.com/odominguez7/foreman). The marketing site, written for a 65-year-old shop owner: [foremanjobs.lovable.app](https://foremanjobs.lovable.app).

---

## References

1. NemoClaw (NVIDIA). https://github.com/NVIDIA/NemoClaw
2. vLLM. https://github.com/vllm-project/vllm
3. Llama 3.1 (Meta). https://llama.meta.com
4. Reducto. https://reducto.ai
5. Section 179 deduction (IRS, 2026). https://www.section179.org/section_179_deduction
6. Paperless Parts. https://www.paperlessparts.com
7. Uptool. https://www.uptool.ai
8. MIT AI Studio (MAS.664). https://www.media.mit.edu

---

*Acknowledgments: thanks to the shop owners across the United States who took calls, walked me through their morning routines, and corrected my assumptions; to my father, who built the shop and the skill that made this possible; and to the MIT AI Studio (MAS.664) staff for the framing and the deadline.*
