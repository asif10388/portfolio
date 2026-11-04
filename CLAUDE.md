# CLAUDE.md

Personal portfolio for Asif Hossain Khan (Senior Frontend Engineer). Static Astro site deployed to Netlify.

## Commands

```bash
pnpm dev       # Dev server (for agents: `pnpm astro dev --background`, then `astro dev stop|status|logs`)
pnpm build     # astro check + static build to dist/
pnpm preview   # Serve the built site
pnpm format    # Prettier (astro + tailwind plugins)
```

Requires Node >= 22.23.4 (Astro 7).

## Architecture

- **Astro 7, static output.** Pages ship zero JS by default; use React (`@astrojs/react`) only for interactive islands, hydrated with `client:*` directives.
- **Styling:** Tailwind v4 via `@tailwindcss/vite`. Design tokens (`--color-*`, `--font-*`) live in `@theme static` in `src/styles/global.css`; components use them through scoped `<style>` blocks (`var(--color-ink)`), never raw hex values. Shared classes (`.page`, `.label`, `.dot`, `.btn`, `.link`) are in the same file.
- **Content:** the "Products people use" rows come from `src/content/places.yaml` (one entry per country, `file()` loader, schema in `src/content.config.ts`). Roles and tools live in `src/data/experience.ts`. Site-wide facts (name, links, Cal.com URL, home time zone, working hours) live in `src/data/site.ts`; never hard-code them in components.
- **Live bits:** `src/scripts/live.ts` refreshes clocks (`data-clock`), today's Ethiopian date (`data-eth`) and the visitor working-day overlap. Pure helpers are in `src/lib/time.ts` and also run at build time, so the static HTML is already correct.
- **Site URL:** set once in `astro.config.mjs` (`SITE_URL`); also referenced in `public/robots.txt`.
- **Imports:** `@/*` maps to `src/*`.
- **Page transitions:** `<ClientRouter />` in `src/layouts/Base.astro`. Scripts that touch the DOM must re-run on `astro:page-load`.

## Conventions

- Design direction is a one-ink printed page: paper background, one blue-black ink, red (`--color-spot`) only for "home" and "now". Newsreader serif for reading and names, IBM Plex Mono for data and labels. Light only. Avoid generic portfolio patterns (stat tiles, card grids, gradients, heavy grotesk heroes).
- Fonts are self-hosted via `@fontsource` imports in `src/layouts/Base.astro`.
- Respect `prefers-reduced-motion` for all animation.
- Images go in `src/assets/` and render via `astro:assets` (`<Image />`/`<Picture />`), not `public/`.
- Design mocks live outside the repo in `../portfolio-design/`.
