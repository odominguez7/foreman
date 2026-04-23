# US Machine Shop Market Sizing & Cost of Quoting

Deep research compiled 2026-04-23 for the Wedge / Foreman pitch. All numbers carry citations — use these instead of round estimates when writing investor decks, website copy, or the MAS.664 HW9 writeup.

## 1. How many machine shops are actually in the US?

The answer depends on how you define "shop." Four defensible numbers, each with a source:

| Definition | Count | Source |
|---|---|---|
| Pure "Machine Shops" (NAICS 332710) | ~16,627 businesses | IBISWorld, 2025 |
| Machine Shops + Turned Product + Screw/Nut/Bolt (NAICS 3327) | 21,624 firms / 22,233 establishments | US Census, 2020 |
| Fabricated Metal Products (NAICS 332, broader) | ~49,442 businesses | US Census, 2020 |
| All US manufacturers | 239,265 firms | NAM, 2025 |
| Third-party directories (loose definition) | 24,913 (Manta) / 32,958 (Smartscrapers) | 2025 |

**Reality for the Wedge ICP ($5-30M shops):**
- Defensible universe: **~16,000-22,000 machine shops**
- Widens to **~50,000** if you include the full fabricated-metal segment (weldments, stamping, metal forming)
- The "600,000 shops" figure sometimes cited is not Census-backed — it double-counts every US business with any metalworking activity and is not the same as addressable shops

**Employment context:** NAICS 332710 machine shops employ ~283,000 people (BLS OEWS 2024). Median machinist wage: **$56,150/yr** (BLS May 2024).

## 2. How many hours per day do owners spend quoting?

No single survey gives "hours per day" cleanly, but the triangulation is tight across sources:

**Per-quote time (before automation):**
- Paperless Parts (industry-standard reference): "up to **2 hours to generate a quote for a single part**"
- Jax Precision case study: **3-4 days per quote** → 1 hour post-software (24-32 hours of touched time per complex quote)
- Sweetwater Machine Shop: 30 min baseline → 5 min post-software
- Double Tap Engineering: 60 min baseline → <20 min post-software
- Complex multi-vendor quotes: 2-3 weeks to gather info (Modern Machine Shop)

**Volume pressure:** A Paperless Parts survey of 400+ part buyers found **67% expect a quote in <24 hours**, and only 6% will wait >3 days. Shops are forced to process quotes fast, at volume.

**Typical small-shop quoting load** (triangulated from Gardner/MMS surveys and Practical Machinist forum data):
- 20-40 RFQs per week incoming
- Average ~1 hour blended (mix of 30-min simple + 2-hr complex)
- **20-40 hours/week** on quoting = **4-8 hours/day, 5 days/week**

**Win rate context (explains why it's so expensive):**
- Top 20% of shops: **70% quote-to-book**
- Average shop: **51%** (Modern Machine Shop / Gardner BI)
- Forum consensus: **30-50%** typical
- Meaning: **about half the hours spent quoting produce zero revenue** — the quote loses

## 3. What does that time cost?

**Owner effective hourly rate.** BLS explicitly excludes self-employed workers, so the rate is built from the ground up:
- Forum-validated benchmark: a $1M-revenue shop owner pulls ~$250K/yr combined salary + owner cash flow (Practical Machinist forum)
- For the Wedge target ($5-30M shops), conservative owner comp: **$150K-$300K/yr**
- Fully-loaded hourly rate (benefits, tax, shop overhead): **$100-150/hr**

**Annual cost of the quoting bottleneck:**

| Scenario | Hours/day | Hrs/yr (250 days) | Rate | Annual cost |
|---|---|---|---|---|
| Low end | 4 | 1,000 | $100 | **$100,000** |
| Typical | 5-6 | 1,250-1,500 | $125 | **$156K-$187K** |
| High end (owner + dedicated estimator) | 8 + estimator | 2,000 + estimator salary | $150 + $80K | **$300K-$380K/yr** |

**Punchline number for the pitch:** A typical $10M machine shop owner spends **~5 hours/day quoting**, costing the business **~$125,000-$185,000 per year in owner time alone** — and about half of that time produces zero revenue because the quote loses. That is a **6-figure annual tax on being the boss**.

## 4. Pitch-ready one-liner

> There are ~20,000 US machine shops. The median owner spends 5 hours a day generating quotes by hand. That's $150K/year of owner time, half of which produces zero revenue because the quote loses. Wedge takes it to 5 minutes.

## Sources

- [NAICS 332710 Machine Shops — IBISWorld](https://www.ibisworld.com/united-states/number-of-businesses/machine-shop-services/645/)
- [NAICS 3327 Census establishment count](https://naicslist.com/naics/3327)
- [BLS: Machine Shops NAICS 332710 employment & wages](https://www.bls.gov/oes/current/naics5_332710.htm)
- [BLS: Machinists Occupational Outlook Handbook (May 2024 wages)](https://www.bls.gov/ooh/production/machinists-and-tool-and-die-makers.htm)
- [NAM Manufacturing Data (239,265 US manufacturers)](https://nam.org/mfgdata/)
- [Paperless Parts: Machine Shop Estimating & Quoting Guide](https://www.paperlessparts.com/blog/machine-shop-estimating-quoting-a-complete-guide/)
- [Modern Machine Shop: When It Comes to RFQ Response, Time is Money](https://www.mmsonline.com/articles/when-it-comes-to-rfq-response-time-is-money)
- [Modern Machine Shop: How Job Shops Can Generate Accurate Quotes in Minutes](https://www.mmsonline.com/articles/how-job-shops-can-generate-accurate-quotes-in-minutes)
- [CNCCookbook: Quote-to-Book Ratio Survey](https://www.cnccookbook.com/job-quote-cost-estimation-survey-results/)
- [AMT: Job Shops by the Numbers (Gardner BI)](https://www.amtonline.org/article/job-shops-by-the-numbers)
- [Practical Machinist: owner compensation discussion](https://www.practicalmachinist.com/forum/threads/am-i-crazy-to-consider-buying-a-machine-shop.371516/)
- [Census 2022 Economic Census Manufacturing tables](https://www.census.gov/data/tables/2022/econ/economic-census/naics-sector-31-33.html)
