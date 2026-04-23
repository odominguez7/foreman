# Foreman site audit — foremanjobs.lovable.app

Audit date: 2026-04-22. Scope: copy and structure only. Do not change images, layout, fonts, colors, dimension-line motifs, or any aesthetic choice. The look and feel is working.

Issues are sorted by priority. Each item names the section, quotes the current copy, gives the recommended change, and explains why in one sentence.

---

## ⭐ STRONGEST ASSET ON THE PAGE · keep and amplify

### 1. The "11 years running the CNC shop my father built" bio

**Where it appears (twice):**
- Masthead: *"Built by Omar Dominguez. 11 years running the CNC shop his father built. Came to MIT to fix quoting."*
- About section: *"I spent 11+ years running the CNC shop my father built. I know the pains of this business because I lived them."*

**Verified true 2026-04-22.** Father built the shop; Omar ran it for 11+ years; came to MIT specifically to fix the quoting problem.

**Why this is the strongest piece of copy on the site:** every other AI-quoting startup is run by software founders selling to shop owners they have never been. Foreman is run by a 2nd-generation shop owner who went to MIT to fix his own problem. That is the single most defensible founder story in this category, and it shifts the entire pitch from "we built a tool for you" to "I built this for me, and now I want to share it."

**Recommendations:**
- **Do not depersonalize the bio.** Keep both instances exactly as they are.
- **Amplify the masthead bio** by making it more visible (slightly larger type, or moved up the page so it lands in the first scroll). Right now it reads as a small editorial tag; it should be the second thing a visitor sees after the hero headline.
- **Strengthen the About section opener** from *"Built by someone who lived it"* to *"Built by a 2nd-generation shop owner."* More specific = more credible.
- **Consider adding the shop's name and city** (if Omar is comfortable). "I ran ___ Manufacturing in ___ for 11 years" is even more specific. A 65-year-old shop owner who reads that thinks: "I know that shop" or "I know shops like it." Trust earned in two seconds.
- **Optional bigger move:** add one real photo of the father's shop or Omar at a machine in the About section. The site has placeholder figure boxes; one swap would do enormous work.

---

## 🔴 HIGH · do this week

### 2. Depersonalize the service and CTA copy (keep the bio)

The name appears 7 times. **Keep the 3 that build credibility** (masthead bio, About section, "Note from Omar" pull-quote attribution). **Replace the 4 that read as scrappy** (service-line items and CTAs sound like a one-person operation, which contradicts the "this is a real product you can buy" positioning).

| # | Current copy | Action | Reason |
|---|---|---|---|
| 1 | (Masthead) "Built by Omar Dominguez. 11 years running the CNC shop his father built." | **KEEP** | The credibility line. See item 1. |
| 2 | (Pricing setup) "60-minute remote setup with Omar over Zoom" | **REPLACE** with "60-minute remote setup with us over Zoom" | Service language; "us" sounds like a company has staff. |
| 3 | (Pricing white-glove) "Omar flies to your shop for a day. In-person setup and training." | **REPLACE** with "We fly to your shop for a day. In-person setup and training." | Same reason. Also, when you scale you will not be the only one flying. |
| 4 | (Pricing pull-quote attribution) "Note from Omar" | **KEEP** | Founder pull-quote with attribution is a trust signal in industrial sales. |
| 5 | (FAQ header) "If yours is not here, write to Omar. He will answer." | **REPLACE** with "If yours is not here, write to us. We answer every email." | CTA; reads scrappier than the bio supports. |
| 6 | (About invitation) "Want to see Foreman quote one of your own drawings live? Write to Omar." | **REPLACE** with "Want to see Foreman quote one of your own drawings live? Write to us." | CTA. |
| 7 | (Final CTA + footer) "Email Omar →" | **REPLACE** with "Email us →" (mailto address unchanged) | Button label. |

Net result: 7 mentions become 3, all of them earning their keep on credibility grounds.

### 3. Five of seven FAQ answers are missing

Q·02 through Q·07 currently render as questions with no answers. This is the single biggest broken-page issue. Restore the answers exactly as written in the original copy:

```
Q·02 Will Foreman replace my estimator?
A:   No. Foreman drafts; your estimator reviews and sends.
     Same person, more quotes out the door.

Q·03 What if the drawing is in Spanish or German?
A:   Foreman handles mixed-language drawings. Tested on
     real ones from real customers.

Q·04 What if the internet goes down?
A:   Foreman keeps working. The brain runs on the computer
     in your shop.

Q·05 What if I do not like a quote it wrote?
A:   Say so in plain English. Foreman remembers your
     correction and applies it next time.

Q·06 What if the job is unusual and there is no history?
A:   Foreman tells you that. It falls back to shop-average
     pricing and flags what it is unsure about. It will
     not make numbers up.

Q·07 Is Foreman something I have to learn?
A:   No. You type to it the way you would text a person.
     No menus, no dashboards, no new software to learn.
     If you can text, you can run Foreman.
```

### 4. The footer GitHub link still says `wedge-agentic-edge`

The slug exposes the old internal codename. Two ways to fix without changing the look:

- **Quick:** rename the GitHub repo to `foreman` (you already wanted to). The link auto-redirects from the old URL for a long time, so nothing breaks.
- **Quicker:** change the visible footer label from `GitHub` (which exposes nothing) to keep the underlying URL but never display the slug. The link is already labeled `GitHub`, so the issue is only visible if a visitor hovers over the link and reads the URL bar. Lower priority than rename, but flag for cleanup.

---

## 🟡 MEDIUM · clean these up next pass

### 5. The "✓$4,500" rendering on the cost note

Lovable interpreted the Lovable-brief checkmark instruction as a literal character glued to the price, producing `✓$4,500`. It should be a check tick to the **left** of the line, with a space, not a prefix to the dollar number. Ask Lovable to: "Treat the blueprint-cyan ✓ as a row icon (16-20px box to the left), not a character glued to the price string. Render `✓ The Box (one time) .... $4,500` not `✓$4,500`."

### 6. "Service plan is < 0.01% of shop revenue / yr"

Mathematically tight. $1,000/yr is 0.01% only for shops at $10M+ revenue. For a $7M shop it is 0.014%. To stay defensible across the full target band ($5-30M), change to:

> *"Service plan is less than 0.02% of shop revenue per year"*

Same impression, no precision risk if a CFO does the math.

### 7. The "Box pays for itself in under 1 week" line

This is honest math ($4,500 ÷ $9,450/wk = 3.3 days), but "under 1 week" reads as marketing. Consider tightening to:

> *"Box pays for itself in about 3 working days"*

More specific = more credible. Same pattern as the "3 minutes" claim at the top of the page.

### 8. "Customer name" consistency

The site swapped "Boeing T2" for "aerospace customer" in most places, which is good (avoids name-dropping a customer Foreman doesn't actually serve). But there is one residual anomaly:

- FAQ Q·01: *"ChatGPT does not know your stock, your schedule, or what you charged your aerospace customer last August."*

The phrase "your aerospace customer" reads slightly unnatural. Consider:

> *"ChatGPT does not know your stock, your schedule, or what you charged that customer last August."*

Pronoun "that" reads more like a real conversation.

### 9. The two AI mentions are well-placed; do not add more

There are exactly two: the "MIT AI Studio · MAS.664" attribution in the hero (structural, fine), and the "Modern AI, quietly" paragraph in About (deliberate, the right place). Do not let any future Lovable iteration sneak "AI" into headlines or hero copy.

---

## 🟢 LOW · cosmetic, optional

### 10. The "Edit with" Lovable badge in the footer

This is a free-tier Lovable watermark. Removing it requires upgrading the Lovable plan. Decide whether the cost is worth the polish.

### 11. The Masthead label "Masthead · Note"

The phrase is a beautiful editorial touch but slightly cryptic. Consider "Masthead · Founder note" so the reader knows what they are reading.

### 12. "Foreman, with you" final phrase in the About section

Lovable added this as a closing line. Pretty, but if the About section is being rewritten anyway (per item 1), see if it can be tightened or absorbed into the body. Not urgent.

---

## ✅ KEEP · do not touch any of this

These are the choices the site got right. Do not let a future iteration regress them.

- Every image and figure caption (FIG.01 through FIG.08, the placeholder labels, the "REF · PHOTO" tags). They look like a shop manual. They are working.
- The hero headline architecture: short verb-led claim + supporting paragraph + monospace strap line.
- The mode names "Hold the line / Book rate / Win it" — better than the brief I sent, more credible to a shop owner than "Careful / Normal / Aggressive."
- The customer-naming pattern "aerospace customer" + "Acct. A-118." Generic and credible.
- The dial layout (RFQ header, three tabs, price + breakdown left, "why this number" right, draft footer).
- The four-step "Foreman works" section with mono Readout panels for each step.
- The pricing card structure: Box → Service Plan → White-glove → Extras → Bookkeeper note → Payback math.
- The four-color cream/ink/blueprint-cyan/rust palette.
- The dimension-line corner ticks on every paper card.
- The "FIG.05 · COST NOTE · SCALE 1:1" footer style on every figure.
- The mailto-only CTA strategy (no signup forms, no chat widget, no calendar embed).

---

## How to apply this audit

Two paths:

**Path A — feed this whole file to Lovable.** Paste the doc into the Lovable chat with the instruction: "Apply every change in this audit. Do not modify any image, color, font, or layout. The visual design is finished. Only update copy and rendering as specified." Lovable should be able to do all of items 1 through 9 in one pass.

**Path B — apply by section.** If Lovable struggles with a single large prompt, send the items one at a time, easiest first (item 3, FAQ answers), then item 2 (depersonalization table), then items 5 through 8, and finally item 1 (the bio rewrite).

Either way, after Lovable applies the changes, re-read the live page once with the audit checklist in hand and confirm none of the "do not touch" items regressed.
