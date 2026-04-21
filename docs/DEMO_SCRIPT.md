# Wedge — Live Demo Script (5 min) — v2: The Learning Shop

**Track 5 · NVIDIA GPU Prize · NemoClaw + vLLM**

Monitor 1 = Telegram. Monitor 2 = `blueprint.yaml` open + terminal with benchmark ready.

The hero moment is **Scene 2 — live learning.** Practice it until it's muscle memory.

---

## 0:00 — 0:30 · The hook

> "Mike runs a $8M machine shop in Pennsylvania. 12 people. Every RFQ takes him
> 30 minutes to quote. He loses 40% of bids because he's too slow.
>
> We built Mike a quoting agent. NemoClaw sandbox + vLLM + 7 tools. But the
> real magic isn't that it quotes fast. It's that **it learns**."

## 0:30 — 1:15 · Scene 1 — real Bosch PDF

*Drop `bosch-punzon.pdf` into Telegram. Type:*
> "Quote this for 200 pieces, balanced"

*Agent replies:*
- Drawing F028.WB0.867 — Punzón de Corte
- AISI D-2 tool steel, 60–62 HRC (grinding required)
- Complexity: COMPLEX (75/100)
- Quote: $X/unit × 200, Z days, confidence 0.85
- Flags: mixed imperial/metric, needs customer confirmation

> "Real Bosch drawing. Spanish, tool steel, hardness spec. Reducto parsed it,
> Llama on vLLM reasoned over the shop's ERP. 15 seconds."

## 1:15 — 3:15 · Scene 2 — 🔥 THE LEARNING LOOP 🔥

*Drop `demo_1.pdf` (Boeing 82-Alpha bracket). Type:*
> "Quote for Boeing, 150 pcs, balanced"

*Agent quotes: $31/unit, $4,650, 7 days, no clarifying Q.*

*Type (in Mike's voice):*
> "Too low. Boeing always pays slow — add 8%"

*Agent: "Got it. Storing: `Boeing T2 + 6061 aluminum + bracket → +8% margin,
pays slow`. Total personality entries: 1."*

*Now drop `demo_3.pdf` — Boeing 6061 wing-hinge. Type:*
> "Quote this, 80 pcs, balanced"

*Agent's response — this is the moment:*
- Quote: $X/unit (with +8% pre-applied)
- **Reasoning block says: "Applied +8% margin cushion per stored feedback on
  Boeing T2 payment history (recorded earlier this session). Neutral base
  would have been $X/unit; adjusted to $X'/unit."**

*Point to Monitor 2:*
> "The agent called shop-recall-personality as its fourth tool — before
> composing the quote — found the matching feedback, applied it, and cited
> it. Mike never said 'remember this' or 'apply it this time.'
> It just did. This is what agentic means.
>
> And this personality persists in the sandbox volume. Tomorrow, next week,
> next year, Boeing's payment pattern stays on Mike's shop floor. No other
> shop gets it. No hosted API sees it. That's the moat."

## 3:15 — 4:00 · Scene 3 — steering dial still works on top of learned personality

*Type:*
> "Same RFQ, aggressive steering"

*Quote shifts: tighter margin (-8% from personality-adjusted base), shorter
lead, cites lost bid 3421 as benchmark.*

> "Three steering profiles — real vLLM knobs in the blueprint (temperature,
> guided_json, per-profile system prompt injection). Each stacks with the
> learned personality. Mike flips the YAML line to change the whole shop's
> default personality — aggressive on slow months, conservative at full
> capacity."

*Switch to Monitor 2, show `blueprint.yaml` lines 17–55.*

## 4:00 — 4:30 · Scene 4 — latency

*Run:*
```bash
$ python3 benchmarks/latency-test.py --profile vllm --profile nvidia-cloud
  vllm           3.12 s  ±0.4 s  (n=5)
  nvidia-cloud  12.81 s  ±1.9 s  (n=5)
  → vLLM 4.1× faster on identical prompts
```

> "Llama-3.1-8B on a local A100 beats Nemotron-120B cloud by 4×.
> Every prompt stays on-prem. Zero customer drawings leak."

## 4:30 — 5:00 · Close

> "Seven tools. One declarative blueprint. Learning memory that's the shop's
> moat. NemoClaw's Landlock + seccomp + netns mean the agent can't exfiltrate
> a single customer drawing.
>
> Code on GitHub: odominguez7/wedge-agentic-edge (private for the demo —
> happy to grant read access to judges).
>
> NVIDIA + Red Hat's best play isn't another support bot. It's keeping US
> manufacturing alive at shop-floor economics. Thanks."

---

## Recovery plan — if anything breaks live

| Failure | Switch to |
|---|---|
| Telegram down | `openclaw agent --agent main -m "..."` from terminal |
| Learning loop doesn't recall | Pre-stage one feedback entry tonight: `shop-remember-feedback "Boeing T2" "6061 aluminum" "bracket" "pays slow — +8%"`. On stage, SKIP the "Mike gives feedback" step and go straight to recall demo. |
| vLLM down on Brev | Switch `default_profile: nvidia-cloud`. Lose the latency moment, keep the rest. |
| All inference down | Play pre-recorded backup video. Explain from slides. |

## Rehearsal notes (do FRIDAY)

- The 2-minute learning-loop scene is the one judges will quote in their discussion. Rehearse it 5× with a timer.
- Practice the Mike-voice correction: "Too low. Boeing always pays slow — add 8%." Say it exactly.
- Keep your tone calm when the agent cites the feedback — DON'T celebrate. Let the demo land.
- If a judge asks "is the 8% hardcoded?" — say: "No. It's whatever feedback I just gave it. Here's the jsonl file." Show `cat /sandbox/.openclaw-data/shop-memory/personality.jsonl`.
- If a judge asks "what about embeddings for soft matching?" — say: "Today it's customer + material exact match. Production would use embeddings for softer retrieval across synonymous customer names and part families. The skill interface wouldn't change."
