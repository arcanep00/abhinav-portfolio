# Abhinav Pandey — Portfolio

A personal portfolio for Abhinav Pandey, Python Backend Engineer. Migrated from a Next.js/Vercel app into a React + Vite artifact within the Replit pnpm monorepo.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (port 21113)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + wouter routing + framer-motion
- CSS: Tailwind CSS v3 (postcss mode, not @tailwindcss/vite)
- Fonts: Inter + Space Grotesk via Google Fonts (link tags in index.html)

## Where things live

- `artifacts/portfolio/src/data/profile.ts` — all personal data, experience, skills, education, nav items, contact links
- `artifacts/portfolio/src/data/projects.ts` — projects array with full case study sections, type `Project`
- `artifacts/portfolio/src/components/` — all page sections and shared UI components
- `artifacts/portfolio/src/pages/` — one file per route (imports a component + wraps in PageShell)
- `artifacts/portfolio/src/App.tsx` — wouter Router with all 9 routes
- `artifacts/portfolio/tailwind.config.ts` — custom colors: emeraldSoft, cyanSoft, goldSoft, ink
- `artifacts/portfolio/public/` — hero-backend-workspace.png, Abhinav-Pandey-Resume.pdf

## Architecture decisions

- **Tailwind v3 postcss mode**: copied tailwind.config.ts from Next.js backup; vite.config.ts uses `css.postcss.plugins` instead of `@tailwindcss/vite`.
- **wouter routing**: replaces Next.js `<Link>` and `useRouter`; WouterRouter wraps the app with `base` derived from `import.meta.env.BASE_URL`.
- **Google Fonts via link tags**: replaces next/font/google CSS variable injection; fonts referenced by name in tailwind config (no CSS vars).
- **No backend needed**: purely frontend portfolio, no API routes.

## Product

8 pages: Home, About, Experience, Projects (with individual case studies), Skills, Odoo ERP, Education, Contact. LoadingOverlay intro animation on Home page.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Tailwind v3 must use postcss mode — do NOT install @tailwindcss/vite (v4 plugin)
- Font family names in tailwind.config must match the Google Fonts family name exactly (no CSS variable syntax)
- The LoadingOverlay shows for 1.2s on first load — screenshots taken immediately will capture it

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
