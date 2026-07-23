# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
```

No test runner is configured.

## Architecture

This is a React 18 + Vite + Tailwind CSS v4 portfolio site. The entry point is `src/main.tsx` → `src/app/App.tsx`.

**Routing** (react-router-dom v7): Three routes — `/` (homepage), `/work` (`Work.tsx`, the archive grid), `/work/:slug` (`ProjectDetail`). `App.tsx` also hosts a preloader that delays rendering by 2 seconds, and a `ScrollToTop` helper that scrolls to top on route change or smooth-scrolls to a `#hash` anchor (used by the navbar's in-page links).

**Navbar**: `Navbar.tsx` is rendered once in `App.tsx`, outside `<Routes>`, so it persists across all pages. Its nav items are hash links back to homepage sections (e.g. `/#about`, `/#work`), not separate routes.

**Page sections** (all rendered on `/`): `Hero` → `About` → `Projects` → `Services` → `Footer`. These are direct children of `HomePage` in `App.tsx`.

**Project data** lives entirely in `src/app/data/projects.ts` — a static array of objects with `id`, `slug`, `title`, `category`, `image`, `year`, `client`, `role`, and `description`. `ProjectDetail` looks up the current route's `:slug` against this array. `src/app/data/techIcons.ts` similarly holds the static list of skill/tool icons rendered by `IconRibbon`.

**Shared visual components**: `AmbientBackground` (glow/grid/ring backdrop, used behind `Hero`, `About`, and `Work`) and `IconRibbon` (infinite-scrolling tech logo strip, used in `About`) are reused across pages. `components/ui/CustomCursor.tsx` exists but is not currently imported/mounted anywhere.

**Animations**: `motion` (Motion for React, v12) is used throughout for scroll-driven parallax, entrance animations, and page transitions. Import from `'motion/react'`, not `'framer-motion'`.

**UI components**: `src/app/components/ui/` contains a full shadcn/ui component library (Radix UI primitives + Tailwind). These are pre-installed but not heavily used by the portfolio sections yet.

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. CSS variables for theming are defined in `src/styles/globals.css`. The site uses a dark theme (`bg-neutral-950`) as the primary surface — the CSS variable light/dark system from globals.css is secondary.

**Path alias**: `@` resolves to `src/app/` (configured in `vite.config.ts`).

**Asset imports**: Figma-exported assets use the `figma:asset/<filename>` import scheme, resolved by a custom Vite plugin to `src/assets/`.
