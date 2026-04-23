# Foreman website

Single-page landing site. Shop-manual aesthetic (JetBrains Mono + Source Serif 4, cream paper, blueprint cyan). Built by Claude Design, recreated pixel-perfect here as plain HTML + React via Babel-standalone. Zero build step.

## Files

- `index.html` — primary entry (copy of `Foreman.html`, named for root serving)
- `Foreman.html` — the design handoff filename, kept for parity
- `src/app.jsx` — app root + Tweaks panel
- `src/components.jsx` — shared primitives (Display, Lede, Btn, Paper, Rule, Tick, Dim, PhotoPlaceholder)
- `src/quote-dial.jsx` — the working three-mode dial, real cost math
- `src/sections.jsx` — all page sections (Nav, Hero, WhatItDoes, HowItWorks, DialSection, DataSection, Pricing, Faq, About, FinalCTA, Footer)
- `copy.md` — text source of truth (what the page says, in markdown)

## Preview locally

```bash
cd website
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy

Any static host works. No build step, no env vars.

**Vercel** (simplest):
```bash
cd website
npx vercel --prod
```
When prompted for the "build command" answer nothing (press enter). For "output directory" answer `.` (current directory).

**Netlify**:
```bash
cd website
npx netlify deploy --prod --dir=.
```

**Cloudflare Pages**:
```bash
# Drag the website/ folder into the Pages dashboard, or
npx wrangler pages deploy website --project-name=foreman
```

**GitHub Pages**: push the `website/` folder to a `gh-pages` branch, or point Pages to `/website` on the main branch.

## What to swap before launch

- Shop photo placeholders → real photos (search for `PhotoPlaceholder` in `src/sections.jsx`)
- Footer GitHub link currently points to `wedge-agentic-edge`; update if the repo is renamed
- Hero body, copy throughout — `copy.md` is the source of truth if you want to edit text
- `Built in Cambridge, MA` in the nav and footer — change if it's no longer true

## Notes

- Babel-standalone transpiles the JSX in the browser on page load. First render is ~200ms slower than precompiled. For a marketing page this is fine. If you want to precompile, run any JSX → JS step you prefer (Vite, esbuild, Parcel) and point the `<script>` tags in `index.html` at the output files.
- The tweaks panel (`TweaksPanel` in `app.jsx`) is dormant in production. It only activates when a parent window sends a `__activate_edit_mode` message, which only happens inside the Claude Design editor. Safe to leave.
- The three-mode quote dial uses a hardcoded base cost model (material + setup + run + finish + inspect = $576.40). If you want different example numbers, edit `BASE` at the top of `src/quote-dial.jsx`.
