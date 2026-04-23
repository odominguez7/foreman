# Lovable update brief — Pricing section (§ 05)

Paste this whole file into the Lovable chat. It tells Lovable exactly what to change on the pricing section, in plain language a 65-year-old shop owner can read out loud.

The current section is the one in the screenshot you have open: "ONE INSTALL / ONE SUPPORT PLAN / YOU OWN IT," with a sample cost note on the right.

Keep the design system and layout exactly the same. Same fonts, same colors, same paper background, same dimension-line motifs, same dashed pull-quote box, same dark "GET A QUOTE" button, same "FIG.05 · COST NOTE · SCALE 1:1" footer. **Only the words and numbers change.** Do not redesign anything.

---

## What to change

There are five small changes to make:

1. **Replace the headline** to reflect the new offer (a box you buy + a service plan you can cancel).
2. **Replace the body copy** under the headline with the new two-paragraph pitch.
3. **Replace the Sample Cost Note card** with a clear two-line offer: THE BOX (one-time) and THE FOREMAN SERVICE PLAN (monthly or yearly), followed by an optional WHITE-GLOVE INSTALL line, an EXTRAS section for usage-based add-ons, a FOR YOUR BOOKKEEPER tax note, and the PAYBACK MATH block.
4. **Keep the Omar pull-quote** unchanged.
5. **Keep the buttons** unchanged.

Everything else stays. Same section anchor `#pricing`. Same dimension-line corner ticks on the card. Same FIG.05 footer.

---

## Replace the section copy with this

### Section headline (keep large mono uppercase, three lines)

```
BUY THE BOX.
ADD THE SERVICE PLAN.
CANCEL ANYTIME.
```

(Same styling: first two lines ink-black, third line in blueprint cyan.)

### Body paragraphs under the headline (serif, same style as before)

```
Foreman comes as a small box we ship to your shop. You
plug in two cables. We get on a Zoom call together for an
hour. By the end, Foreman is reading your drawings and
quoting your jobs. The box is yours to keep. It goes on
your books as equipment, like a new caliper or a tool
holder, not as a monthly bill.

The service plan is what keeps Foreman getting smarter.
Software updates, a real person on the phone, and a
monthly tune-up. It costs about as much as a meal out
once a month. You can stop the plan whenever you want
and the box keeps working at the version you have.
```

### Pull-quote box (Omar's note, keep the dashed border, italic serif)

```
NOTE FROM OMAR

"The money is the easy part. Getting Foreman to quote
like you do, customer by customer, is the whole job.
That is what we obsess over."
```

### Buttons (keep the dark primary + outline secondary)

```
[ GET A QUOTE → ]   [ OR BOOK A DEMO FIRST ]
```

---

## Replace the SAMPLE COST NOTE card with this

Keep the same paper-card look: thin black border, "SAMPLE COST NOTE" label floating on the top-left of the border, "FOREMAN INSTALL · SHOP A · NO. 0001" mono header inside, "SIGNED ____ DATE __/__/____" mono line at the bottom, "FIG.05 · COST NOTE · SCALE 1:1" footer below.

The inside of the card now has six stacked blocks. Use thin dashed dividers between blocks. Keep the same fixed-width mono font for prices and dotted leader lines (the same style the three-mode dial uses).

### 1. Card header (mono small caps, unchanged)

```
SAMPLE COST NOTE
FOREMAN INSTALL · SHOP A · NO. 0001
```

### 2. THE BOX (one-time line, large price on the right)

The price is the main number on the card. Make it as visually heavy as the quote dial's price. Blueprint cyan accent to the left of the price, like a check tick.

```
THE BOX (one time)                              $4,500

   Pre-configured Foreman box, small and fan-less
   Sits on a shelf. Two cables in: power and ethernet.
   Foreman software pre-installed and tested
   Ships next business day, two-day delivery
   60-minute remote setup with Omar over Zoom
   Yours to keep. Section 179 eligible.
```

### 3. FOREMAN SERVICE PLAN (recurring line, second-largest price)

Slightly smaller than THE BOX but still prominent. Same blueprint-cyan accent. Show both the monthly and the annual price; emphasize the annual savings.

```
FOREMAN SERVICE PLAN              $100 / month
                              or $1,000 / year
                                (save $200)

   Software updates as Foreman gets smarter
   Phone support. A real person, not a chatbot.
   Monthly tune-up call (15 minutes)
   Cancel anytime. The box keeps working
   at the last version you had.
```

### 4. WHITE-GLOVE INSTALL (optional, smaller, dashed top border)

Visually de-emphasized so it reads as an add-on, not a default. One short paragraph below.

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - -

WHITE-GLOVE INSTALL (optional)              $2,500

   Omar flies to your shop for a day. In-person
   setup and training. Used by our first ten shops.
```

### 5. EXTRAS (only if you want them, billed as you use them)

Smaller list of optional usage-based add-ons. Same dashed divider above.

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - -

EXTRAS (only if you want them, pay as you use them)

   Voice channel (quote by phone) ......... $0.50 / quote
   ERP or CAD plugin connection ........... $0.10 / call
   Human expert quote review .............. $25 / quote
   Multi-shop benchmark dashboard ......... $200 / month
```

### 6. FOR YOUR BOOKKEEPER (small dashed-border block)

Same style as the Omar pull-quote box, but smaller. "FOR YOUR BOOKKEEPER" mono label.

```
FOR YOUR BOOKKEEPER

The Box is packaged software plus equipment. Section 179
plus 100% bonus depreciation lets you deduct the entire
cost in the year you buy it. Your CPA will know what to do.
```

### 7. PAYBACK MATH (mono with dotted leaders, same look as the three-mode dial)

Block at the bottom of the card, just above the SIGNED line.

```
PAYBACK MATH (your numbers, our demo)

  RFQs per week ............................. 90
  Time per quote, today ...................... 45 min
  Time per quote, with Foreman ............... 3 min
  Hours back per week ........................ 63
  Owner billable value, $150/hr .............. $9,450 / week
  Box pays for itself in ..................... under 1 week
  Service plan is .......... < 0.01% of shop revenue / yr
```

Below the payback block, keep the existing SIGNED line and the FIG.05 footer.

---

## Important rules for Lovable

These rules matter. Do not bend them.

1. **Do not use the word "AI" anywhere on this section.** None of it.
2. **Do not use em dashes.** Use periods, commas, colons, or parentheses.
3. **Do not use the words "subscription," "SaaS," "platform," "solution," or "seamless."** They make the buyer suspicious. The recurring plan is a "Service Plan" or "Foreman Service Plan."
4. **Do not change the design system.** Same fonts (JetBrains Mono + Source Serif 4). Same paper cream background. Same blueprint cyan accent. Same dimension-line corners on the card. Same dashed-border pull-quotes. Same dark "GET A QUOTE" button.
5. **Do not add stock photography or icons** to the pricing section. The card stays clean and paper-like.
6. **Do not shorten the copy further.** It is written at the cadence the reader reads at.
7. **Keep the section ID `#pricing` so the existing nav anchor still works.**
8. **Show THE BOX price ($4,500) as the visually heaviest number on the card.** Service Plan is second. White-glove is small. Extras are small.

---

## Why these changes (one paragraph for Lovable)

The shop owner reading this is 65 years old. He has bought a mill, a lathe, a CMM, and Mastercam in his career. He has never bought a SaaS product and does not want to start. He recognizes the words "Section 179" because his CPA writes them on his tax returns every year. He recognizes a "service plan" because that is what he pays Haas every year for HaasConnect. He does not want a salesperson flying out to his shop unless he asks for one. The new pricing splits the offer into a piece of equipment he buys (The Box) and a service plan he can stop (Foreman Service Plan), with a flying-in option for the shops that want it. The payback math block makes the decision feel like a job he would price himself. The bookkeeper note makes his accountant an ally instead of an obstacle.

---

## What to ship

After Lovable applies these changes, the pricing section should:

- Look almost identical to the current screenshot in layout, color, type, and spacing
- Show THE BOX (one-time, $4,500) as the heaviest line on the cost-note card
- Show the FOREMAN SERVICE PLAN (recurring, $100/mo or $1,000/yr) just under it
- Show WHITE-GLOVE INSTALL ($2,500, optional) as a smaller dashed block
- Show four EXTRAS lines for usage-based add-ons
- Show the FOR YOUR BOOKKEEPER tax note
- Show the PAYBACK MATH at the bottom, mono with dotted leaders
- Keep the headline (now "BUY THE BOX. ADD THE SERVICE PLAN. CANCEL ANYTIME."), the Omar pull-quote, and both buttons exactly as they are designed

If anything else on the page changes, undo it. Only this section is in scope.
