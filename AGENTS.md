# Permanent Architecture Rules - Fantasy Baseball Trade Analyzer

These rules must be preserved across all AI coding sessions.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Deployment:** Vercel (standard, no `output: export`)
- **Font:** Manrope (via `next/font/google`)

## Exclusions (Do Not Use)
- No separate backend
- No database
- No authentication
- No Supabase / Firebase / Prisma / Express
- No Redux / Zustand / React Query
- No `app/api` routes (unless strictly necessary later)
- No unnecessary dependencies (e.g., framer-motion, heavy chart libs)

## Architecture & Rendering
- **Server Components:** Must be the default for all pages and layout elements.
- **Client Components:** Only use `"use client"` when browser state, React hooks, DOM APIs, or event handling genuinely require them (e.g., `components/analyzer/TradeAnalyzer.tsx`).
- **No Client Boundaries In:** `app/layout.tsx`, `app/page.tsx`, Header, Footer, SEO sections, content sections, methodology, or FAQ content.

## Directory Structure
- `/app`: Next.js routes (`/`, `/fantasy-baseball-trade-values`, `/methodology`, etc.)
- `/components/analyzer`: Interactive trade engine components
- `/components/layout`: Global layout wrappers (Header, Footer)
- `/components/sections`: Page sections (Hero, Features, etc.)
- `/components/seo`: SEO utility components
- `/components/ui`: Reusable atomic UI elements (Button, Card, Container, Badge)
- `/lib/trade`: Pure trade calculation logic and types
- `/lib/seo`: SEO utility functions
- `/lib/utils`: Generic utility functions
- `/data`: Static demo or production data

## Design & Aesthetics
- **Vibe:** High-end, modern sports analytics SaaS, premium, fast, trustworthy.
- **Avoid:** Old sports-blog look, visual clutter, gambling vibes, generic templates.
- **Color System:** Managed via CSS variables in `globals.css` mapped to Tailwind `@theme inline`.
  - Midnight navy: #071521
  - Deep navy surface: #0C1C2C
  - Primary blue: #2563EB
  - Ballpark green: #16A36A
  - Light green: #DCFCE7
  - Amber: #D99016
  - Negative red: #DC4C4C
  - Main text: #0B1420
  - Muted text: #64748B
  - Border: #DCE4EC
  - Page background: #F7F9FC
  - White: #FFFFFF

## Accessibility & SEO
- **A11y:** Semantic HTML, one H1 per page, visible focus rings, aria attributes, minimum tap targets.
- **Motion:** CSS-only transitions, respect `prefers-reduced-motion`.
- **SEO:** Use native Next.js Metadata API, valid JSON-LD structured data. Do not invent fake reviews or ratings.

## Code Quality
- Production-quality TypeScript with no `any` abuse.
- Clean component boundaries, no duplicated logic.
- Responsive from 320px upward.
- Preserve excellent Core Web Vitals.



## Blog Architecture

The website includes a production blog at:

/blog/
/blog/[slug]/

Blog content must use local MDX.

Do not introduce a CMS, database or backend merely for publishing articles.

Content source:

content/blog/

Use a strongly typed central post registry.

Blog pages remain Server Components.

Do not add "use client" to article pages unless a specific interactive feature genuinely requires it.

Every published article must have:

- unique title
- unique description
- canonical
- Open Graph article metadata
- representative image
- visible publication date
- truthful modified date when applicable
- BlogPosting JSON-LD
- BreadcrumbList JSON-LD
- contextual internal links
- related articles where useful
- a natural CTA to the trade analyzer

Do not fabricate:

- dates
- authors
- expertise
- player statistics
- rankings
- citations
- update timestamps

Draft articles must not be publicly routable or included in the sitemap.

Do not create category/tag archive URLs until there is sufficient useful content.

Do not mass-publish AI-generated articles.

Blog content must remain tightly focused on fantasy baseball:

- trade strategy
- player valuation
- league formats
- roster/trade decision making

Avoid unrelated MLB news unless it directly supports fantasy-trade decision making.
















