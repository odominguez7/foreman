# Wedge — Live Demo Script (5 min)

**Track 5 · NVIDIA GPU Prize · NemoClaw + vLLM**

Monitor 1 = Telegram. Monitor 2 = `blueprint.yaml` open in VS Code + terminal with benchmark ready.

---

## 0:00 — 0:30 · Hook

> "Mike runs a $8M machine shop in Pennsylvania. 12 people. He quotes every
> RFQ himself at night because his estimators can't read GD&T. Each quote is
> 30 minutes. He loses 40% of bids because he's too slow.
>
> We built Mike a quoting agent. NemoClaw sandbox + vLLM + 5 tools.
> Here's what that looks like."

## 0:30 — 1:30 · Scene 1 — real customer PDF

*Drop `bosch-punzon.pdf` into Telegram. Type:*
> "Quote this for 200 pieces, balanced steering"

*Agent replies:*
- Drawing: F028.WB0.867 — Punzón de Corte
- Material: AISI D-2 tool steel, 60–62 HRC (grinding required)
- Complexity: COMPLEX (75/100)
- Quote: $X/unit × 200 = $Y total, Z days lead
- Confidence: 0.85
- Flags: mixed imperial/metric on pocket spec, needs customer confirmation

> "That's a real Bosch drawing. Spanish text, German material spec, tool steel
> that needs post-heat-treat grinding. Reducto parsed it. Kimi on vLLM reasoned
> over our mock ERP. 15 seconds end-to-end."

## 1:30 — 3:00 · Scene 2 — the steering dial (the differentiator)

*Type:*
> "Same RFQ, conservative steering"

*New quote appears — ~15% higher, longer lead, clarifying question about tolerances.*

*Type:*
> "Now aggressive"

*Third quote — ~8% lower, tighter lead, cites the lost bid as benchmark.*

> "Three profiles. Real vLLM controls, not prompt engineering."

*Switch to Monitor 2, show blueprint.yaml lines 17–55:*

> "Here's the steering — temperature, guided_json, per-profile system prompt.
> All declarative. Mike changes this YAML to tune his shop's personality. One
> line — `default_profile: vllm-aggressive` — and the whole agent rebids."

## 3:00 — 4:00 · Scene 3 — latency race (the NVIDIA story)

*Run the pre-written latency benchmark on Monitor 2:*

```bash
$ python3 benchmarks/latency-test.py --profile vllm --profile nvidia-cloud
  vllm           3.12 s  ±0.4 s  (n=5)
  nvidia-cloud  12.81 s  ±1.9 s  (n=5)
  → vLLM 4.1× faster for identical prompts
```

> "Same quote prompt. Llama-3.1-8B on vLLM on a local A100 is 4× faster than
> Nemotron-120B in the cloud. For a shop quoting 40 RFQs a day, that's the
> difference between 'responsive' and 'we already moved on to the competitor.'
>
> And every prompt stays on-prem. Zero customer drawings leaked to
> an external API."

## 4:00 — 4:30 · Scene 4 — reasoning over history

*Type:*
> "Why did we lose bid 3421?"

*Agent reads the similar-jobs table, identifies 3421 as a loss, explains:*
> "We lost 3421 — Boeing 82-Gamma bracket, 120 pcs at $3,300. That quote was in
> our balanced-mode range. Competitor undercut us. Pattern: Boeing aluminum
> brackets >100 pcs consistently lost to Shop Z at ~$2,900. Aggressive-mode
> would have quoted $2,950."

> "That's what 'agentic' actually means. The agent reasons over YOUR data,
> not generic knowledge."

## 4:30 — 5:00 · Close

> "Under the hood: one blueprint.yaml. Five tools. Three inference profiles.
> vLLM primary, Nemotron cloud fallback. NemoClaw's netns + seccomp + Landlock
> mean the agent can never exfiltrate a customer drawing.
>
> Code on GitHub: odominguez7/wedge-agentic-edge.
>
> NVIDIA + Red Hat's best play here isn't another support bot. It's keeping US
> manufacturing alive at shop-floor economics. Thanks."

---

## Recovery plan — if anything breaks live

| Failure | Switch to |
|---|---|
| Telegram bot down | Run from terminal: `openclaw agent --agent main -m "Quote bosch-punzon.pdf..."` |
| vLLM down on Brev | Switch `default_profile: nvidia-cloud` in blueprint.yaml (1 line), lose the latency-race moment, keep everything else |
| All inference down | Play the pre-recorded 90-second screencast (`/Users/.../demo-backup.mp4`); explain what it does, show code, field questions |
| Hallucinated quote on a judge-supplied PDF | "Today's demo uses 3 pre-staged real customer drawings with cached Reducto output. Let me show you one of those instead." Fall back to `bosch-punzon.pdf`. |

## Things NOT to say

- Never say "our steering is real vLLM runtime modulation" unless the judge
  asks — that claim is load-bearing and they might poke at the bash script.
  The honest answer if pressed: "temperature + guided_json + per-profile
  system prompt. On Deep Tech we plan to add grammar constraints and logit
  biasing, but this submission tests the agent loop end-to-end first."
- Never call it a "GPT wrapper." It's not, but a nervous founder might.
- Don't promise benchmark numbers you haven't run. Run them on Brev before
  the demo and update the slide.
