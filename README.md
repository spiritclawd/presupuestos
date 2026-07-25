# Presupuestos España — Web Gamificada de Redistribución de Presupuestos Públicos

## Overview (Jul 2026)
MVP built under `/home/carlos/projects/presupuestos/` — Next.js 15 + Tailwind CSS v4 + Recharts. Static export, ready for deploy.

## Goal
A web app under `patronaige.com/crítica/` that visualizes Spanish public budgets (PGE + autonomous communities + municipalities) and lets users interactively redistribute spending away from politicians/advisors toward real services (health, education, firefighters, etc.). Gamified with sliders, comparisons, and shareable links.

## Files Created

- `/home/carlos/projects/presupuestos/package.json` — Next.js 15 + Recharts + Tailwind v4 + TypeScript
- `/home/carlos/projects/presupuestos/tsconfig.json` — TypeScript config
- `/home/carlos/projects/presupuestos/next.config.ts` — Next.js config (static export)
- `/home/carlos/projects/presupuestos/tailwind.config.ts` — Tailwind CSS config
- `/home/carlos/projects/presupuestos/vercel.json` — Vercel deploy config
- `/home/carlos/projects/presupuestos/app/layout.tsx` — Root layout with dark theme
- `/home/carlos/projects/presupuestos/app/page.tsx` — Home page with slider + chart grid
- `/home/carlos/projects/presupuestos/app/globals.css` — Custom range input styles
- `/home/carlos/projects/presupuestos/data/budgets.ts` — Seed data (PGE 2024, Cataluña, Madrid)
- `/home/carlos/projects/presupuestos/components/BudgetSlider.tsx` — Interactive redistribution sliders
- `/home/carlos/projects/presupuestos/components/BudgetChart.tsx` — Horizontal bar chart (Recharts)

## Data
- **Source**: Presupuestos Generales del Estado 2024 — Ministerio de Hacienda
- **Format**: TypeScript export with hardcoded data + noted IGAE/datos.gob.es API endpoints
- **Seed data**: 20 national categories, Cataluña (10 areas), Madrid (10 areas)
- **Total PGE seed**: 577,100 M€ (real 2024 figure)

## Build Status
- `npm run build` ✅ passes — 103 kB static page, 2 pages generated
- Static export (`output: 'export'`) — no Node.js runtime needed
- Deployable to any static host (Vercel, Cloudflare Pages, Netlify, GitHub Pages)

## Deploy Options

### Option A — Vercel (recommended)
```bash
vercel login          # one-time browser auth
vercel --prod         # deploy
```
After deploy, set up `patronaige.com/crítica/` as a custom domain or path route.

### Option B — Cloudflare Pages
```bash
# Requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
# Configure in https://dash.cloudflare.com/pages/create
# Connect GitHub repo: spiritclawd/presupuestos
# Build command: npm run build
# Output directory: out
```

### Option C — GitHub Pages
```bash
# Add a gh-pages branch or use GitHub Actions
```

## Next Steps (Carlos decides)
1. Deploy to Vercel / Cloudflare Pages
2. Set up custom domain (patronaige.com/crítica/)
3. Expand data pipeline (scrape IGAE + datos.gob.es APIs for fresh data weekly)
4. Add community/autonomous community picker
5. Add shareable link generation (encode redistribution as URL params)
6. Add leaderboard of popular redistributions