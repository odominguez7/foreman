# Launch post — Reddit r/Machinists

Different rules than X or LinkedIn. r/Machinists hates marketing. They respect: real shop people, honesty about limitations, useful work shared without an ask. Lead with the story; minimize the pitch.

Suggested subreddits in priority order:
1. r/Machinists (220k members, the strongest community for this audience)
2. r/manufacturing (smaller, more business-side, also fine)
3. r/CNC (more hobbyist-oriented; lower priority)

Use the post for r/Machinists first. If it lands well, repost a tightened version to r/manufacturing.

---

## Title

Built a quoting tool because I couldn't find one I liked. Open-sourcing it in case it helps anyone here.

## Body

Hey all. Long-time lurker here. My family ran a CNC shop in [your area] for ~30 years. I worked it for the last 11 of those years before I went to school.

Quoting always ate my morning. Looking at a print, checking what we had in stock, walking the floor, digging through old quotes for what we charged this customer last August. Hours of typing. We lost work because we couldn't answer fast enough.

I tried Paperless Parts, Xometry's stuff, a few others. They are either built for shops 10x our size or they want a cut of every job. None of them learned from me. I had to re-enter the same "this customer pays slow" rule into a spreadsheet every quarter.

So I went to MIT and built the thing I wished I had. It is called Foreman.

What it does:

- Reads the drawing PDF (Spanish, scanned, mixed-language all OK)
- Checks your stock and your schedule
- Pulls your past jobs for this customer/material
- Writes a draft quote in about 3 minutes, with the math shown so you can argue with it
- Remembers what you tell it. Say "they pay slow, add 8%" once and the next quote for that customer has the 8% in there

Runs on a small computer in your shop. No cloud, no monthly fee, no internet required. Your drawings never leave your building.

It is open source (MIT license). Repo here: github.com/odominguez7/foreman

Limitations, honest:

- The historical-jobs database is currently mock data. A real install would wire to your ERP (ProShop, JobBOSS, E2, whatever you use).
- I have only tested it on English and Spanish drawings. German next.
- It is one shop at a time. Not a SaaS dashboard for 100 shops.
- The latency claims you might see in marketing materials are targets, not measurements. I will publish real numbers once a few shops have it running for real.

I am looking for 5-10 shops who want to try Foreman on their own drawings. No charge for the pilot, no sales call. You send me one of your real drawings, I send you back what Foreman wrote. You decide if it's useful.

DM me or write to omar.dominguez7@gmail.com.

Happy to answer questions in the thread.

---

## Notes for posting

- Post on a weekday, 9 AM to 11 AM ET. Avoid weekends; r/Machinists peak engagement is workday mornings.
- The title is intentionally low-key. Reddit hates "I built X" titles that read like a launch.
- DO NOT use bold formatting for words like "ALL CAPS PRODUCT NAME." Plain text builds trust.
- DO answer questions in the comments for 24 hours after posting. Give detailed answers. Admit when you don't know something. The comments are where the credibility is built.
- DO NOT crosspost the same post to other subs in the first 24 hours. Mods notice. Wait a day, tighten, repost to one other.
- If anyone asks "what about [competitor]," answer honestly. Praise the things they do well. r/Machinists can spot trash-talking from a mile away.
- If a moderator removes the post for "self-promotion," reply with: "Apologies, I read the rules and thought open-source releases were OK. Happy to remove or move to a comment thread if you prefer." Mods often re-approve.
