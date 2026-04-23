# Lovable Prompt — Foreman (image-forward, cinematic industrial)

Paste the block below into a new Lovable project. It is self-contained: brief, visual direction, section-by-section spec with image prompts, copy, interactions. Tuned to push Lovable into full-bleed imagery, scroll-linked motion, and restrained typographic design rather than another boxy Tailwind landing page.

---

```
# Project: Foreman — a website for a product sold to 70-year-old machine shop owners

Build the most visually powerful marketing site I have ever seen for a small industrial SaaS product called Foreman. The product is a quoting assistant for US machine shops. It reads a customer's drawing, checks the shop's schedule and inventory, writes a quote in under three minutes, and remembers every correction the shop owner makes. It runs on a computer inside the shop. No cloud. Open source.

The primary reader is a 70-year-old owner of a small US machine shop. He has been quoting jobs by hand for forty years. He is skeptical of buzzwords, loves his trade, trusts his eyes. Do not use the word "AI" anywhere in the hero or body. One neutral mention in the About section only.

The secondary reader is a grad school reviewer at MIT. They will care about open-source, clear thinking, and whether a stranger can understand the product in 30 seconds.

## Tone and aesthetic

Think Rivian meets Bellroy meets Linear's landing page, except the product is a machine shop assistant and the photography is real industrial work: hands on cold steel, mills mid-cut, paper drawings pinned to a bulletin board, a foreman walking the floor at 6 AM. Shop-manual precision meets National Geographic composition. Cinematic, unhurried, dignified. The page should feel like a documentary about a trade, not a SaaS brochure.

Visual rules:
- Full-bleed photography dominates. Text sits on top of images often, with careful tonal contrast.
- Large type. The target reader is 70 years old. Minimum body size 20px. Headlines can be 80 to 140px.
- Restrained motion: images fade in, text reveals on scroll, numbers count up in the quote dial. No carousels, no parallax hero with ten layers, no Lottie clutter.
- One accent color only: deep blueprint cyan #0a5a8a, used sparingly for interactive elements and dimension callouts.
- Palette: cream paper (#f4efe4), ink (#14110d), muted rule lines (#cabfa6), shop-floor rust (#a24a18) as a sparingly used second accent for the aggressive mode.
- Typography: mono for headlines and technical labels (JetBrains Mono, uppercase, wide tracking), serif for body (Source Serif 4, 20 to 26px, generous line height 1.55).
- Subtle grid-paper background at 24px with 3 percent opacity ink lines. Turn it off on sections that have full-bleed photography.
- Dimension-line motifs: little tick marks, brackets with labels like "4.500 ± .005," corner crop marks. These are the site's texture.
- No drop shadows. No gradients except ones that mimic paper texture or studio lighting.
- No stock-looking illustrations. No emoji. No AI-art-looking imagery that reveals seven-fingered hands or plastic surfaces.

Reference sites to look at for motion and type:
- Rivian.com (cinematic photography, calm animation, big type)
- Linear.app (type precision, restrained palette)
- Arc.net (playful but grown-up)
- Framer's own landing (scroll-linked reveals)
- Stripe's sessions.stripe.com (editorial typography)

## Image brief (generate or stage these, in this order)

1. HERO: A machinist's weathered hands resting on a pinned engineering drawing, mechanical pencil nearby, laptop at the edge of frame with a clean interface barely visible. Low side lighting, tungsten warm, slight dust in the air. Shallow depth of field. Film grain. 16:9.
2. THE SHOP, WIDE: A working US machine shop at 6:47 AM. Overhead fluorescent + warm window light. One owner in frame, back turned, clipboard in hand, walking between CNC mills. Industrial cool, not staged. 16:9.
3. CNC CLOSE-UP: A Haas VF-2 mid-cut on 6061 aluminum. Coolant spray, swarf curling, endmill blurred. Macro. Shallow DoF. 4:5.
4. DRAWING ON THE BULLETIN BOARD: A Spanish-language engineering drawing pinned to a cork board, stained coffee cup ring on it, digital calipers resting on top. Top-down. Natural light from a shop window. 1:1.
5. FOREMAN PORTRAIT: A 62-year-old shop owner in safety glasses and a worn work shirt, standing at a lathe, looking directly at the camera, serious and dignified. Not smiling. Rembrandt lighting. 4:5. Use this in the About section.
6. THE COMPUTER: A small rack-mount or mini-PC sitting on a steel workbench, ethernet cable visible, status LED glowing blueprint cyan. Gritty, real, not glossy. 16:9 or 3:2.
7. SPLIT BEFORE/AFTER: Left frame a cluttered desk at 11 PM with spreadsheets, coffee cup, calculator. Right frame the same owner at 9 AM with a clean laptop and a draft quote on screen, natural light, relaxed posture. 2:1.
8. A HAND TYPING "Boeing pays slow, add 8 percent" INTO A SIMPLE CHAT UI. Top-down over-shoulder. The product is showing a small confirmation checkmark. 4:5.

If Lovable generates these via AI: add "film photograph, 35mm, Portra 400, natural grain, no digital artifacts, no extra fingers, no plastic skin, documentary style" to every image prompt.

If Lovable cannot generate industrial photography well: use the labeled SVG placeholder pattern from Claude Design (boxed, cream-striped, monospace caption "PHOTO · DROP IN LATER") rather than fake-looking AI stock.

## Information architecture (sections, in order)

### 1. Nav bar
Sticky. Cream background, thin ink bottom border. Left: 28px black-square logo with an "F" cut into it (built from a milled slot). Word mark "FOREMAN" in JetBrains Mono bold, plus a muted "v0.9 · Cambridge, MA." Middle links: "How it works," "Three modes," "Your data," "Questions." Right: dark primary button "Book a 20-min demo" → mailto:omar.dominguez7@gmail.com

### 2. Hero
Full-bleed hero image (Image 1) with a dark gradient overlay on the left third so the text reads. Huge mono headline: "MEET FOREMAN." in two lines, 140px. Underneath, serif lede in 26px cream: "Your new quoting hand. Foreman reads the drawing, checks your material and schedule, and has a quote ready before you finish your coffee." Below that, a monospace strap line: "Lives on a computer in your shop. · Your drawings never leave the building." Two buttons: dark primary "Book a 20-min demo →" and a ghost "See how it works." Below the buttons, a thin ruler bar with tick marks and three monospace tags: "MIT AI Studio · MAS.664 · Open source · MIT license · Built in Cambridge, MA."

### 3. Problem strip (What it does)
Two-column layout on cream. Left column: huge mono headline, 54px: "Every RFQ eats 30 to 90 minutes of your morning." Right column: two serif paragraphs from the copy (see Copy section below). Below, a side-by-side compare card in a 2-column grid with 1px ink border: "TODAY · 30–90 MIN" vs "WITH FOREMAN · ≤ 3 MIN." Each side has a numbered checklist with thin dashed rules between rows, monospace step numbers.

### 4. How it works (four steps, scroll-revealed)
Sticky subheading on the left ("§ 02 HOW FOREMAN WORKS"). Right side: four numbered steps stacked vertically, each a full-width row with 3 columns: huge step number, title+body, example detail block (monospace technical readout with labels like MATL, TOL, FIN, QTY). Each step reveals on scroll with a subtle upward fade. Step numbers in accent blueprint cyan at 64px. Step 4 has a dark emphasis band beneath: "STEP 4 IS THE ONE THAT MATTERS. Every other quoting tool asks you to configure a policy once and then ignores you. Foreman learns the way a new foreman would: by listening to you every day."

Each step should have a supporting image on a parallax slow-scroll to the right at small size:
- Step 1: Image 4 (drawing on the bulletin board)
- Step 2: Image 3 (CNC close-up)
- Step 3: Image 8 (hand typing a quote into the interface)
- Step 4: Image 7 (before/after split)

### 5. THE DIAL (interactive, the signature feature)
Full-width section on cream with a grid-paper background. Left sticky column: headline "Think of Foreman as a dial." and a short list of the three modes with colored bullet dots.

Right column: a large interactive dial component:
- Header strip: "RFQ-2026-0417 · Bracket, 6061-T6 · Qty 25 · Boeing · Acct. B-118"
- Three tab buttons in a row: CAREFUL, NORMAL, AGGRESSIVE. Active tab fills ink-black.
- Below the tabs, a two-column body:
  - LEFT: "QUOTE TO CUSTOMER" label, huge mono price in the tab's color (careful = blueprint cyan, normal = ink, aggressive = rust), "/ lot of 25" suffix. Beneath: a cost breakdown in mono font with tabular numbers, five rows (Material, Setup, Run, Finish, First-article inspection), a rule, Shop cost total, Margin line in the tab's color, final "Price to customer" in bold big.
  - RIGHT: "WHY THIS NUMBER" label, three bullet flags specific to the selected mode (colored square bullets), a dashed-border "FOREMAN ASKS" callout (careful mode only) with a question, and a small mono tagline under ("Use on jobs you really want to get right" etc).
- Footer strip: "DRAFT · NOT SENT" on the left, "Review → Edit → Send" on the right.

Base cost: material $118.40, setup $78, run $312, finish $42, inspect $26. Margin: careful 42%, normal 32%, aggressive 22%. Recompute the price live when the tab changes with a short number-tween animation. When switching to careful, fade in the "Foreman asks" question.

### 6. Your shop, your data
Full-width section on ink-black background with cream type. Section tag in mono. Huge headline: "Your pricing is your moat." Right side, a lede paragraph in cream about data staying in the shop. Below, a three-column promise strip bordered in muted rule lines: "ON-PREM / Runs on a small computer in your shop. Plug it in, once. No cloud account, no monthly fee, no internet required." + "OPEN SOURCE / Every line of code, visible. Inspect, audit, or walk away. MIT license." + "DATA STAYS / Drawings never leave the building. Not used for training. Not shared. Not backed up to anyone else's server."

Behind the text: Image 6 (the small computer in the shop) as a subtle 25%-opacity overlay on the right edge.

### 7. Pricing
Two columns on cream. Left: huge mono headline in three lines: "One install. One support plan. You own it." (last line in blueprint cyan). Two serif paragraphs about pricing. A dashed-border pull-quote card: "The money is the easy part. The hard part is getting Foreman quoting as well as you do, and we are more interested in that." Two buttons: primary "Get a quote →" and secondary "Or book a demo first."

Right: a "SAMPLE COST NOTE" card, Paper component (cream with 1px ink border, floating mono label above the border). Five checklist rows with Tick icons. Bottom: a dashed rule with a monospace signature line: "SIGNED ____________________  DATE __/__/____"

### 8. Common questions (accordion)
Two columns. Left: short headline and one sentence. Right: accordion of 7 FAQ items. Each row: monospace "Q·01" through "Q·07" label, serif question in 21px, a plus/minus toggle in an ink-bordered square. Open state: serif answer at 18px indented under the question.

### 9. About (founder)
Two columns. Left: Image 5 (foreman portrait) as a 4:5 image with a mono caption beneath "Dominguez · Cambridge, MA." Right: headline "Built by one person. Based on real conversations." Three serif paragraphs (see copy). Below, an "INVITATION" Paper card with a 22px serif paragraph and a blueprint-cyan "omar.dominguez7@gmail.com →" button.

### 10. Final CTA band
Full-width ink-black band. Left: massive mono display "Bring Foreman to your shop." at 96px. Right: short body and a cyan "Email Omar →" button.

### 11. Footer
Thin ink-black bar. Left: "© 2026 Foreman · Built in Cambridge, MA." Right: small links to GitHub (https://github.com/odominguez7/wedge-agentic-edge), Docs (#how), Contact (mailto), and "MIT License."

## Copy (use this exact copy, do not paraphrase)

HERO LEDE: "Your new quoting hand. Foreman reads the drawing, checks your material and schedule, and has a quote ready before you finish your coffee."

PROBLEM PARAGRAPH 1: "You open the PDF. You look up the material. You check the schedule. You pull what you charged this customer last time. You write the quote in a spreadsheet or an email. You have been doing this for forty years and it still takes forever."

PROBLEM PARAGRAPH 2: "Foreman does that same work in under three minutes. You drop the drawing in. You tell it the customer and the quantity. It gives you back a draft quote with the math shown. You review it, change what needs changing, send it. Foreman never pretends to be you. It just has the quote ready by the time you sit down."

STEP 1 BODY: "Foreman reads the PDF, even Spanish or old scanned drawings. It pulls out the material, the tolerances, the features."
STEP 2 BODY: "Do you have 6061 in stock? Is the mill open next week? What did you charge Boeing last August for a bracket like this?"
STEP 3 BODY: "The price comes from your own job history, not a calculator on the internet. The reasoning is shown next to the number. You can argue with it if you want."
STEP 4 BODY: "Tell Foreman 'Boeing pays slow, add 8 percent.' Next week, when another Boeing job comes in, the 8 percent is already there. Nothing to update, no spreadsheet to find."

DATA SECTION LEDE: "Your drawings, your customers, your prices: they stay on a computer in your shop. They do not go to a cloud. They are not used to train someone else's product."

DATA SECTION FOLLOW: "What Foreman learns about your shop is yours. If you sell the shop one day, the knowledge goes with it. If you turn Foreman off, nobody sees what was inside."

PRICING BODY 1: "Foreman runs on a small computer we install in your shop. No monthly cloud fee. No per-quote fee."

PRICING BODY 2: "Tell us about your shop (how many quotes a week, what software you use, how many estimators), and we will price it the way you would price a job: honestly, and based on what it actually takes."

SAMPLE COST NOTE ROWS:
- "On-site install. Wired to your shop network."
- "Tuned on your last 12 months of quotes."
- "First 30 days: we sit with you and fix what it gets wrong."
- "Support plan: we answer the phone. An actual person."
- "No per-quote fee. Quote 5 or 500 a week. Same price."

FAQ:
1. Q: "Is this just ChatGPT in a box?" / A: "No. ChatGPT does not know your inventory, your schedule, or what you charged Boeing last August. Foreman does, because it reads your shop's own records."
2. Q: "Will Foreman replace my estimator?" / A: "No. Foreman drafts; your estimator reviews and sends. Same person, more quotes out the door."
3. Q: "What if the drawing is in Spanish or German?" / A: "Foreman handles mixed-language drawings. Tested on real ones from real customers."
4. Q: "What if the internet goes down?" / A: "Foreman keeps working. The brain runs on the computer in your shop."
5. Q: "What if I don't like a quote Foreman wrote?" / A: "Say so in plain English. Foreman remembers your correction and applies it next time."
6. Q: "What if the job is unusual and there is no history for it?" / A: "Foreman tells you that. It falls back to shop-average pricing and flags what it is unsure about. It will not make numbers up."
7. Q: "Is Foreman something I have to learn?" / A: "No. You type to it the way you would text a person. No menus, no dashboards, no new software to learn. If you can text, you can run Foreman."

ABOUT PARAGRAPHS:
- "Foreman is being built by Omar Dominguez as part of MIT AI Studio (MAS.664). It was shaped by conversations with machine shop owners across the US: how they quote today, what slows them down, and what they would never trust a computer to do."
- "Open source: every line of code that runs on your shop floor is on GitHub. Your data stays on your machine and does not train anyone else's product."
- "Under the hood, Foreman uses modern AI (open-source large language models running on a GPU in your shop). It just does not brag about it."

INVITATION CARD: "If you run a shop and want to see Foreman quote one of your own drawings live, write to Omar. A 20-minute call. No slides. Just your drawing and a quote."

FINAL CTA HEADLINE: "Bring Foreman to your shop."
FINAL CTA BODY: "A 20-minute demo. We quote one of your drawings live. You decide if it's useful."

## Interactions

- Scroll-linked image reveals on each section transition (soft fade + 8px upward translate, 400ms ease-out)
- Quote dial number tween when the mode changes (300ms, ease-out, tabular numerals)
- FAQ accordion: expand with clip-path animation from the bottom, 250ms
- Nav button hover: underline grows from left, 150ms
- Section tags "§ 02" appear with a 1px rule drawing out horizontally to the label

No cursor-follow effects. No mouse trails. No confetti. No bullet point animations.

## Technical requirements

- Tailwind + shadcn/ui
- Framer Motion for scroll reveals only. No page-transition animations.
- Fully responsive. On mobile (< 768px): single column, hero image cropped portrait, headline drops to 72px, quote dial stacks (price above reasoning). 
- Dark mode is optional (leave the site in one light mode if it conflicts with the cinematic look).
- LCP target under 2.5s. Preload hero image. Lazy-load everything below the fold.
- No client-side analytics beyond Vercel's own. No cookies, no GDPR banner.
- All email CTAs open mailto:omar.dominguez7@gmail.com with subject "Foreman demo request" or similar.

## What NOT to do

- Do not use the word "AI" anywhere except the one About paragraph.
- Do not use em dashes. Use periods, colons, or parens.
- Do not use stock-illustration vectors of robots, brains, handshakes, or gears.
- Do not add a pricing table with tiers. There is one plan: custom, quoted per shop.
- Do not add testimonials unless you label them clearly as placeholder.
- Do not add a newsletter signup. The only CTA is the demo email.
- Do not add a cookie banner, chat widget, or "We use cookies" dialog.
- Do not make the copy shorter. It is written to the cadence a 70-year-old shop owner reads at. Keep it.

## Success criteria

If a 70-year-old machine shop owner with 40 years of quoting experience opens this site on his phone, reads for 90 seconds, and writes an email to omar.dominguez7@gmail.com asking to see Foreman quote one of his drawings, the site worked. Design every decision against that reader.
```

---

## Notes on using this prompt

- Lovable's image generation is best when each image brief ends with a technical photography qualifier ("film photograph, 35mm, Portra 400, natural grain, documentary style"). That anchor has been added to every image brief.
- If Lovable tries to shorten the copy, push back with "keep the copy exactly as written; the cadence is tuned for the reader." The copy is intentionally long-sentence in some places because the target reader reads slower than a 30-year-old technologist.
- If Lovable insists on Tailwind utility classes that fight the type system, ask it to pull in `JetBrains Mono` and `Source Serif 4` explicitly via `@fontsource` or `<link>` tags.
- After the first generation, iterate on the three-mode dial specifically; it is the one interactive element that carries most of the product's meaning. Ask Lovable to "expand the dial to show a reasoning panel on the right with bullet flags that change per mode" if it simplifies.

## If you want a sharper brief first

You have the full HTML/JSX design already (in `~/wedge-agentic-edge/website/`). Lovable can also be asked to "reimplement this design as a premium Tailwind/shadcn site with real photography replacing the SVG placeholders." That prompt is half the length and will produce output very close to the current design, but with more polish.
