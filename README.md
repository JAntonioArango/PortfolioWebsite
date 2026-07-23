# <span style="color: #4169E1;">Portfolio Website</span>

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC)
![Motion](https://img.shields.io/badge/Motion-12-FF0080)
![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245)

A React + Vite personal portfolio site with scroll-driven animations, a work archive, and per-project case-study pages.

## <span style="color: #2E8B57;">Overview</span>

This site presents Juan Arango's work through a single-page homepage (hero, about, projects, services, footer) plus a `/work` archive grid and `/work/:slug` case-study pages for individual projects and awards. <br>
Navigation is a persistent navbar that hash-links back to homepage sections, and all animations are driven by Motion for scroll-based parallax and entrance effects.

## <span style="color: #2E8B57;">Features</span>

- **Scroll-Driven Animations**: Entrance and parallax effects throughout, powered by `motion/react`
- **Persistent Navbar**: Renders once outside `<Routes>`, with hash-links (`/#about`, `/#work`) back to homepage sections
- **Work Archive & Case Studies**: `/work` grid links to `/work/:slug` detail pages for projects and awards
- **Data-Driven Content**: Projects, tech icons and awards are defined as static data rather than hardcoded pages
- **Shared Visual Components**: Reusable `AmbientBackground` (glow/grid/ring backdrop) and `IconRibbon` (infinite-scrolling tech logo strip)
- **Preloader & Smooth Scroll**: A startup preloader plus a `ScrollToTop` helper that scrolls to top on route change or smooth-scrolls to `#hash` anchors
- **Dark Theme UI**: Built on Tailwind CSS v4 with a `bg-neutral-950` dark surface as the primary theme
- **shadcn/ui Library**: Full Radix UI + Tailwind component library pre-installed under `components/ui/`

## <span style="color: #2E8B57;">Technology Stack</span>

- **<span style="color: #4169E1;">React 18 + Vite 6</span>**
- **<span style="color: #4169E1;">Tailwind CSS v4</span>**
- **<span style="color: #4169E1;">Motion</span>**
- **<span style="color: #4169E1;">React Router DOM v7</span>**
- **<span style="color: #4169E1;">shadcn/ui (Radix UI)</span>**

## <span style="color: #2E8B57;">Getting Started</span>

```bash
npm i          # install dependencies
npm run dev    # start the Vite dev server
npm run build  # production build
```

## <span style="color: #2E8B57;">Development Notes</span>

- **Routing**: Three routes — `/` (homepage), `/work` (archive grid), `/work/:slug` (case study)
- **Path Alias**: `@` resolves to `src/app/` (configured in `vite.config.ts`)
- **Content Location**: Edit `src/app/data/projects.ts` / `src/app/data/awards.ts` to add or update project/award entries — content is data-driven, not hardcoded per page
- **Asset Imports**: Figma-exported assets use the `figma:asset/<filename>` scheme, resolved by a custom Vite plugin to `src/assets/`
- **Styling**: CSS variables for theming live in `src/styles/globals.css`; the dark theme is the primary surface, the light/dark variable system is secondary
