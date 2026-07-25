# Presupuestos España — Web Gamificada de Redistribución de Presupuestos Públicos

## Overview (Jul 2026)
MVP built under `/home/carlos/projects/presupuestos/` — Next.js 15 + Tailwind CSS v4 + Recharts. Static export, ready for Vercel deploy.

## Goal
A web app under `patronaige.com/crítica/` that visualizes Spanish public budgets (PGE + autonomous communities + municipalities) and lets users interactively redistribute spending away from politicians/advisors toward real services (health, education, firefighters, etc.). Gamified with sliders, comparisons, and shareable links.

## Files Created

- `/home/carlos/projects/presupuestos/package.json` — Next.js 15 + Recharts + Tailwind v4 + TypeScript
- `/home/carlos/projects/presupuestos/tsconfig.json` — TypeScript config
- `/home/carlos/projects/presupuestos/next.config.ts` — Next.js config (standalone output)
- `/home/carlos/projects/presupuestos/tailwind.config.ts` — Tailwind CSS config
- `/home/carlos/projects/presupuntos/vercel.json` — Vercel deploy config  
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
- `npm run build` ✅ passes — 103 kB static page, 4 pages generated
- Deployed to Vercel: ❌ no Vercel auth token configured on machine. Carlos needs to `vercel login` first or pass a token.

## Deploy Command (once Vercel linked)
```bash
vercel --prod
# or set VERCEL_ORG_ID + VERCEL_PROJECT_ID env vars + vercel token
```

## Next Steps (Carlos decides)
1. Vercel deploy — needs `vercel login` or PAT
2. Add /crítica/ basePath in next.config.ts or Vercel routing
3. Expand data pipeline (scrape IGAE + datos.gob.es APIs for fresh data weekly)
4. Add community/autonomous community picker
5. Add shareable link generation (encode redistribution as URL params)
6. Add leaderboard of popular redistributions
7. Deploy to patronaige.com/crítica/