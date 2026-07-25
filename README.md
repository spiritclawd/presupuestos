# Presupuestos España — Presupuestos España — Web Gamificada de Redistribución de Presupuestos Públicos

## Overview (Jul 2026)

MVP built under `/home/carlos/projects/presupuestos/` — Next.js 15 + Tailwind CSS v4 + Recharts. Static export, deployed and live on Vercel.

This is the second iteration: transformed from a static dashboard into an interactive gamified experience with points, badges, impact levels, and a persistent leaderboard.

## What changed (iteration 2)

- **Points system** — every M€ redirected earns points. Max 1000 pts for full redistribution.
- **Badges** — 🟢 Ciudadano → 🔵 Activista → 🟣 Reformista → 🔴 Revolucionario → 💀 Extremista based on % of political budget redirected.
- **Impact levels** — sin cambio / Tocado / Impacto moderado / Impacto alto / Revolución total, with emoji and color feedback.
- **Progress bar** — gradient red→yellow→green showing redistribution progress.
- **Submit + Leaderboard** — pressing "Enviar redistribución" saves to `localStorage` leaderboard. Resets with "Restablecer".
- **Summary panel** — toggle-able summary with all key metrics.

## Goal

A web app under `patronaige.com/crítica/` that visualizes Spanish public budgets (PGE + autonomous communities + municipalities) and lets users interactively redistribute spending away from politicians/advisors toward real services (health, education, firefighters, etc.). Gamified with sliders, badges, points, and shareable links.

## Files in the repo

- `/home/carlos/projects/presupuestos/package.json` — Next.js 15 + Recharts + Tailwind v4 + TypeScript
- `/home/carlos/projects/presupuestos/tsconfig.json` — TypeScript config
- `/home/carlos/projects/presupuestos/next.config.ts` — Next.js config (static export)
- `/home/carlos/projects/presupuestos/tailwind.config.ts` — Tailwind CSS config
- `/home/carlos/projects/presupuestos/vercel.json` — Vercel deploy config
- `/home/carlos/projects/presupuestos/app/layout.tsx` — Root layout with dark theme
- `/home/carlos/projects/presupuestos/app/page.tsx` — Home page with slider + chart grid
- `/home/carlos/projects/presupuestos/app/globals.css` — Custom range input styles
- `/home/carlos/projects/presupuestos/data/budgets.ts` — Seed data (PGE 2024, Cataluña, Madrid)
- `/home/carlos/projects/presupuestos/components/BudgetSlider.tsx` — Interactive redistribution sliders with gamification
- `/home/carlos/projects/presupuestos/components/BudgetChart.tsx` — Horizontal bar chart (Recharts)

## Data

- **Source**: Presupuestos Generales del Estado 2024 — Ministerio de Hacienda
- **Format**: TypeScript export with hardcoded data + noted IGAE/datos.gob.es API endpoints
- **Seed data**: 20 national categories, Cataluña (10 areas), Madrid (10 areas)
- **Total PGE seed**: 577,100 M€ (real 2024 figure)

## Build Status

- `npm run build` ✅ passes — 104 kB static page, 4 pages generated
- Deployed to Vercel: ✅ Live at `https://presupuestos-three-rose.vercel.app`
- Static export (`output: 'export'`) — no Node.js runtime needed

## Deploy Command

```bash
vercel --prod
```

## Live URL

https://presupuestos-three-rose.vercel.app

## Next Steps (Carlos decides)

1. Expand data pipeline (scrape IGAE + datos.gob.es for fresh data)
2. Add community/autonomous community picker
3. Add shareable link generation (encode redistribution as URL params)
4. Add leaderboard of popular redistributions
5. Deploy to `patronaige.com/crítica/`