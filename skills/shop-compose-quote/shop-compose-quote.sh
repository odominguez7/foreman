#!/usr/bin/env bash
# shop-compose-quote <drawing_id> <customer> <qty> <steering> [personality_json] [margin_pct] [lead_delta_days]
#
# Emits the final RFQ quote JSON. Three steering modes bias pricing: balanced |
# conservative | aggressive. Optional 5th arg is the raw JSON returned by
# shop-recall-personality; when its matches array is non-empty, each feedback
# string is surfaced in the quote's reasoning field so Mike sees his prior
# corrections being applied. Optional 6th/7th args let the agent translate
# stored feedback into concrete numeric adjustments — e.g. feedback "Boeing
# pays slow — add 8%" → margin_pct=8 — so the quote's displayed price moves
# in sync with the feedback cited in reasoning.

drawing="${1:-82-Alpha}"
cust="${2:-Boeing T2}"
qty="${3:-0}"
steer="${4:-balanced}"
personality="${5:-}"
margin_pct="${6:-0}"
lead_delta="${7:-0}"

# --- Resolve aliases → canonical id ------------------------------------------
case "$drawing" in
  82-Alpha|demo_1|demo_1.pdf) id="82-Alpha" ;;
  SHAFT-204|demo_2|demo_2.pdf) id="SHAFT-204" ;;
  WING-HINGE-12|demo_3|demo_3.pdf) id="WING-HINGE-12" ;;
  F028.WB0.867|1587459|bosch-punzon|bosch-punzon.pdf) id="F028.WB0.867" ;;
  0804CS3889|bosch-bracket|bosch-bracket.pdf) id="0804CS3889" ;;
  *) id="$drawing" ;;
esac

# --- Per-drawing base (unit_price @ balanced, lead_days @ balanced) ---------
# Values derived from similar-jobs history + sidecar complexity scores.
base_unit=""; base_lead=""; base_reason=""; base_question=""
case "$id" in
  82-Alpha)
    base_unit=31.00; base_lead=7
    base_reason="Based on Job 3198 (150pc 6061 bracket, Boeing T2, \$4650) and Job 3215 — same material, customer, family. Material on hand, mill slack covers quantity."
    base_question_conservative="Hole 4 is specified at ±0.0005 — can we relax to ±0.002 to match the other holes? Will affect price and lead time."
    ;;
  SHAFT-204)
    base_unit=15.00; base_lead=6
    base_reason="Based on Job 3267 (500pc 1018 shaft for Honda at \$7500). 1018 on hand, lathe slack 14hrs comfortably covers the run."
    base_question_conservative="Keyway spec — confirm width tolerance is ±0.002 vs. tighter. Driver for setup time."
    ;;
  WING-HINGE-12)
    base_unit=63.75; base_lead=8
    base_reason="Based on Job 3501 (80pc wing-hinge for Boeing T2 at \$5100). 6061 on hand, but Type-III hard anodize is outsourced (adds 2d)."
    base_question_conservative="Pocket depth 0.500±0.003 — is Type III hard coat measured before or after anodize? 0.002in coat matters at this tolerance."
    ;;
  F028.WB0.867)
    # Bosch punch tool. AISI D-2, 60-62 HRC. COMPLEX 75. Assume qty if missing.
    [ "$qty" = "0" ] && qty=8
    base_unit=185.00; base_lead=14
    base_reason="AISI D-2 tool steel, 60-62 HRC — requires heat-treat cycle + post-HT grinding. Punch geometry adds wire EDM pass. No direct historical job; closest comparable is Job 3488 (engine cover, 1018, \$5400/200pc) scaled for hardness + EDM."
    base_question_conservative="Spanish drawing lists tolerance notes 'x=0.8' and 'xx=0.8' ambiguously — can you confirm these are ±0.008mm or ±0.08mm? Drives grinding strategy and price."
    ;;
  0804CS3889)
    # Bosch bracket. N2580-1 steel, MODERATE 55. Assume qty if missing.
    [ "$qty" = "0" ] && qty=50
    base_unit=42.00; base_lead=7
    base_reason="N2580-1 steel bracket, polished finish, 18 tight (<0.05mm) tolerance bands. Closest historical is Job 3488 (Stellantis, 1018, 200pc, \$5400). Mill slack covers; polish step is outsourced (adds 1d)."
    base_question_conservative="N2580-1 is a Bosch internal spec — is 4140 an acceptable substitute, or must we source N2580-1 exactly? 3-week lead on N2580-1 vs 3d on 4140."
    ;;
  *)
    # Generic fallback: price from qty + mild complexity assumption.
    base_unit=45.00; base_lead=9
    base_reason="No historical match for drawing ${id}. Pricing at shop-average \$45/unit (6061-class complexity), lead time assumes mill slack and on-hand material. Agent should adjust if extraction flagged unusual material, hardness, or tolerances."
    base_question_conservative="No historical match — can you confirm material, finish, and any critical tolerances before we commit? First-run quotes carry more uncertainty."
    ;;
esac

# --- Steering-adjusted numbers ----------------------------------------------
python3 - "$id" "$cust" "$qty" "$steer" "$base_unit" "$base_lead" "$base_reason" "${base_question_conservative:-}" "$personality" "$margin_pct" "$lead_delta" <<'PY'
import json, sys

id_, cust, qty, steer, base_unit, base_lead, base_reason, base_q, personality, p_margin_pct, p_lead_delta = sys.argv[1:12]
qty = int(qty)
base_unit = float(base_unit)
base_lead = int(base_lead)
try:
    p_margin_pct = float(p_margin_pct)
except ValueError:
    p_margin_pct = 0.0
try:
    p_lead_delta = int(p_lead_delta)
except ValueError:
    p_lead_delta = 0

if steer == "balanced":
    steer_mult, steer_lead_delta, conf, question = 1.00, 0, 0.90, None
    reason = base_reason
elif steer == "conservative":
    steer_mult, steer_lead_delta, conf = 1.15, 3, 0.90
    reason = f"{base_reason} Applied +15% margin cushion and +3d lead buffer for rework risk."
    question = base_q or None
elif steer == "aggressive":
    steer_mult, steer_lead_delta, conf = 0.92, -2, 0.80
    reason = f"{base_reason} Undercut ~8% to win volume; tightened lead by 2d using current slack."
    question = None
else:
    print(json.dumps({"error": "unknown steering", "hint": "Use: balanced | conservative | aggressive"}))
    sys.exit(0)

# Neutral (pre-personality) numbers = base × steering, no personality deltas.
neutral_unit = round(base_unit * steer_mult, 2)
neutral_lead = max(1, base_lead + steer_lead_delta)

# Personality layers ON TOP of steering: margin_pct scales the neutral unit,
# lead_delta shifts the neutral lead. Both default to 0 → unchanged.
unit_price = round(neutral_unit * (1 + p_margin_pct / 100.0), 2)
total_price = round(unit_price * qty, 2)
lead_time_days = max(1, neutral_lead + p_lead_delta)

# Personality integration — parse matches, surface feedback in reasoning.
if personality:
    try:
        p = json.loads(personality)
        matches = p.get("matches", []) if isinstance(p, dict) else []
    except Exception:
        matches = []
    if matches:
        cites = "; ".join(m.get("feedback", "").strip() for m in matches if m.get("feedback"))
        if cites:
            reason = f"{reason} Applied prior Mike feedback for {cust}: {cites}."
            if p_margin_pct or p_lead_delta:
                adjustments = []
                if p_margin_pct:
                    adjustments.append(f"{p_margin_pct:+g}% margin (neutral base ${neutral_unit}/u → ${unit_price}/u)")
                if p_lead_delta:
                    adjustments.append(f"{p_lead_delta:+d}d lead (neutral {neutral_lead}d → {lead_time_days}d)")
                reason = f"{reason} Numeric adjustment: {'; '.join(adjustments)}."

out = {
    "drawing_id": id_,
    "customer": cust,
    "qty": qty,
    "unit_price": unit_price,
    "total_price": total_price,
    "lead_time_days": lead_time_days,
    "confidence": conf,
    "steering": steer,
    "reasoning": reason,
    "clarifying_question": question,
}
print(json.dumps(out))
PY
