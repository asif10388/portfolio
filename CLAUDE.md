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
- **Styling:** Tailwind v4 via `@tailwindcss/vite`. Design tokens live in `@theme` in `src/styles/global.css` — use tokens, not raw hex values, in components.
- **Content:** case studies are MDX in a content collection (schema in `src/content.config.ts`). Site-wide facts (name, links, stats, Cal.com URL) live in `src/data/site.ts` — never hard-code them in components.
- **Site URL:** set once in `astro.config.mjs` (`SITE_URL`); also referenced in `public/robots.txt`.
- **Imports:** `@/*` maps to `src/*`.
- **Page transitions:** `<ClientRouter />` in `src/layouts/Base.astro`. Scripts that touch the DOM must re-run on `astro:page-load`.

## Conventions

- Design direction is "product-dark": dark-only, grid/glow backdrops, screenshots in device frames.
- Respect `prefers-reduced-motion` for all animation.
- Images go in `src/assets/` and render via `astro:assets` (`<Image />`/`<Picture />`), not `public/`.
