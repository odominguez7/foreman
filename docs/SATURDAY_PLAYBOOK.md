# Saturday Playbook — Track 5 (NVIDIA GPU Prize)

**Venue:** 300 A Street, Boston · **Arrive:** 9:30 AM · **Bring:** MacBook + charger

---

## T-minus (tonight, before sleep)

1. Register on Luma
2. Join Discord: red.ht/toa-discord
3. Create NVIDIA Brev account (keep tab open, verify email)
4. Create HuggingFace account + generate access token (needed for Llama model gate)
5. Form team or commit to solo
6. Sleep

## T+00:00 — Arrival + setup (first 30 min on-site)

1. Check in, grab coffee
2. Redeem Brev coupon → Tier 4 Launchable (1x A100 or H100 + Llama 3.1 8B pre-downloaded)
3. Wait for Launchable to provision (~2-5 min)
4. SSH into Brev instance (link from console)
5. Verify vLLM is running: `curl http://localhost:8000/v1/models`

## T+00:30 — Port our stack (30 min, mechanical)

```bash
# Inside Brev SSH session
cd /workspace
git clone https://github.com/odominguez7/wedge-agentic-edge.git
cd wedge-agentic-edge

# Run the NemoClaw setup
bash /workspace/demo/nemoclaw-agent/setup.sh

# Onboard with OUR blueprint (not the default customer_support one)
nemoclaw onboard --blueprint ./blueprint.yaml

# Copy our 7 skills into the sandbox (5 quoting + 2 learning-loop)
for s in shop-extract-drawing shop-check-material shop-check-schedule \
         shop-retrieve-similar-jobs shop-compose-quote \
         shop-remember-feedback shop-recall-personality; do
  nemoclaw wedge-agent skill install ./skills/$s
done

# Stage pre-extracted sidecars for the demo PDFs
cp -r ./demo-data/inbound/* /sandbox/.openclaw-data/media/inbound/
```

## T+01:00 — Smoke test (15 min)

```bash
# In sandbox
nemoclaw wedge-agent connect

# Hello-world: confirm model + tool-calling works
openclaw agent --agent main -m "Quote demo_1.pdf for Boeing, 150 pcs, balanced steering"
```

Expected: $31/unit × 150 = $4,650, 7 days, confidence 0.9, no clarifying Q.

If it works → skip to T+02:00. If not → troubleshoot (blueprint misalignment, model path, tool perms).

## T+01:15 — Telegram wiring (15 min)

```bash
# Set the bot token env (comes from memory — reuse the one from Mac)
nemoclaw config set --key channels.telegram.bot_token --value "<token>" --restart

# Test: drop demo_1.pdf via Telegram, verify agent response
```

## T+01:30 — Benchmarks (60 min, Deep Tech lane)

```bash
cd /workspace/demo/nemoclaw-agent
python3 benchmarks/latency-test.py --profile vllm > /tmp/bench-vllm.txt
python3 benchmarks/latency-test.py --profile vllm-steered > /tmp/bench-vllm-steered.txt
python3 benchmarks/latency-test.py --profile nvidia-cloud > /tmp/bench-cloud.txt

# Diff — produces numbers for the "2.3x faster" claim in demo script
```

## T+02:30 — Dry-run the demo (30 min)

Go through DEMO_SCRIPT.md end-to-end. Time yourself. Under 5 min.

Things to practice:
- Dropping the PDF cleanly in Telegram
- Typing the steering phrases without typos
- The "why did we lose 3421" question
- Showing the blueprint.yaml on a second monitor

## T+03:00 — Buffer / polish / Q&A prep (60 min)

Likely failure modes and prepared answers:

| Judge asks | You say |
|---|---|
| "Why Track 5 vs just a support bot?" | "Because we're not just multi-turn — we have a differentiator: steering is a policy layer, not a prompt trick." |
| "Is this actually agentic?" | "Yes — it chains 5 tools and reasons over historical losses. Watch this." *[show loss 3421 prompt]* |
| "Why vLLM?" | "Llama 3.1 8B on vLLM is cheap, fast, sovereign. We keep Nemotron-120B as cloud fallback for hard quotes — see blueprint, line 28." |
| "What's the moat?" | "Domain. We're not building a horizontal agent — we're building for the specific workflow of a 12-person metal shop. Wedge has the perception layer (Reducto). NemoClaw gives us the sandbox + steering." |
| "Pricing?" | "Per seat for small shops, per-quote for mid-market. Unit economics work at $50/mo per shop even at 1¢ per inference turn." |

## T+04:00 — Submit + demo (Launchable link + GitHub + 5-min pitch)

Submission checklist:
- [ ] GitHub repo public
- [ ] README with setup + demo instructions
- [ ] blueprint.yaml in repo root
- [ ] Demo video or screencast (optional but strong)
- [ ] Benchmark results CSV (Deep Tech submission)
- [ ] 1-paragraph business summary

## If things go sideways

**vLLM won't start on Brev:** Switch blueprint to `nvidia-cloud` profile (one-line edit). Demo still works, loses the "local GPU" story but keeps the tool chain.

**Telegram bot token issues:** Fall back to `openclaw agent --agent main -m "..."` directly in the terminal. Judges don't care about Telegram specifically; they care that it's a real chat UI.

**Sandbox won't onboard:** Use the reference `customer_support_agent.py` with `--tools` swapped to ours. Less polish but same judging fit.

**PDF extraction hallucinates on a new drawing a judge drops:** Say clearly "production uses Reducto for arbitrary drawings (see demo/wedge-drawing-brain); today's demo uses three pre-staged real customer PDFs for reliability. Here's one of them." Pivot to demo_1.pdf.
