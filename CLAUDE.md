# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
```

## Architecture

This is a Next.js 14 portfolio application migrated from Gatsby. Key characteristics:

- **App Router** (`src/app/`) - Uses Next.js 14 App Router with `layout.tsx` and `page.tsx`
- **Component Structure** - All components in `src/components/` with paired SCSS style files
  - `layout.tsx` - Root layout wrapper with Header and Footer
  - `page.tsx` - Home page composing Hero, Work, Features, Contact sections
- **Styling** - Tailwind CSS + SCSS hybrid
  - Tailwind for utility classes
  - SCSS for component-specific styles with SASS variables (`src/styles/variables.scss`)
- **Client Components** - Components using hooks (useState, useEffect) marked with `"use client"`:
  - Header, Hero, Work, Contact components
- **External Assets** - Images served from Cloudinary CDN

## Key Patterns

- Form handling via Formik + Yup validation (Contact component)
- Smooth scroll via native `scrollIntoView({ behavior: 'smooth' })`
- Responsive design with Tailwind breakpoints (md, lg)
- TypeScript throughout the codebase
