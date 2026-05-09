# DESIGN.md - UI-First "Digital Craftsman" Specification

## 1. Architectural Directive (CRITICAL)
Do NOT use `@tailwindcss/typography` (the `prose` classes) anywhere except for the internal content of `/blog/[slug].astro`. 
The Home page (`/`), Projects page (`/projects`), and Blog index (`/blog`) must be built as custom, interactive UI components using standard Tailwind utility classes (Flexbox, CSS Grid). They should look like a high-end web application, not a rendered README document.

---

## 2. Global Tokens & Theme (`tailwind.config.mjs`)
- **Background:** `bg-base` (`#fafaf9`) - Warm off-white (Stone 50).
- **Surface Cards:** `bg-surface` (`#ffffff`) - For elevated UI elements.
- **Brand Color:** `brand-blue` (`#0071e3`) - Used for highlights, accents, and interactive states.
- **Text:** 
  - `text-main` (`#18181b`) - Primary (Zinc 900).
  - `text-muted` (`#71717a`) - Secondary (Zinc 500).
  - `text-zinc-400` - Labels and borders.
- **Typography:** 
  - `font-sans` (Inter/Geist) for navigation, dates, tags, and small UI text.
  - `font-serif` (Newsreader/Playfair) for Hero text and major headings.
- **Design Elements:**
  - **Border Radius:** `card` (1.25rem).
  - **Shadows:** `subtle` (light elevation), `hover` (pronounced for interaction).
  - **Texture:** Subtle radial gradient on `html` (`radial-gradient(#e5e7eb 0.5px, transparent 0.5px)` with 24px size).

---

## 3. UI Component Construction Specifications

### A. Global Navigation (`src/components/Header.astro`)
Sticky, transparent-blurred header for a native feel.
- **Container:** `<header class="sticky top-0 z-50 w-full backdrop-blur-md bg-stone-50/80 border-b border-zinc-200/50">`
- **Logo:** `HD` in bold, tracking-tighter sans-serif.
- **Links:** Styled with `.nav-link` (text-sm, Zinc 500). Active state adds `.active` (font-medium, Zinc 900).

### B. Home Page (`src/pages/index.astro`)
Minimalist landing page with structured information density.
- **Hero Section:**
  - Heading: `font-serif text-4xl md:text-6xl leading-tight mb-6`.
  - Subtitle: `text-xl md:text-2xl text-zinc-400 italic mb-12`.
  - Metadata Grid: 2-column grid showing Location and Status with a pulse animation.
- **Sections:** All sections use `.section-label` (10px, bold, uppercase, 0.2em tracking) as a header.
- **Philosophy:** 3-column grid with mono-styled IDs (01, 02, 03) and bold headings.
- **Toolkit:** Flex-wrap container of pill-shaped tags with hover border transitions.

### C. Projects Dashboard (`src/pages/projects.astro`)
High-performance engineering dashboard.
- **Header:** Features a `Terminal` icon and "Engineering Portfolio" label. H1 scale up to `text-7xl`.
- **The Grid:** Responsive grid (1 col mobile, 2 col md, 3 col lg) with gap-8.
- **Project Card Component (`src/components/ProjectCard.astro`):**
  - **Wrapper:** Uses `.card` class for elevation and transitions.
  - **Visuals:** Top image section (h-44) with grayscale-to-color transition on hover. Fallback to `Code2` icon.
  - **Content:** Title transitions to `brand-blue` on hover. Description uses `line-clamp-3`.
  - **Footer:** Shows language tag and "Source Code" label that appears on hover.

### D. Blog Index (`src/pages/blog/index.astro`)
Editorial directory with sticky chronological grouping.
- **Year Headers:** Sticky headers with `.section-label` styling.
- **Article Rows:** Bordered flex rows. Titles (Serif) transition to `brand-blue` on hover. Dates use `tabular-nums`.

### E. Blog Post Layout (`src/layouts/BlogPost.astro`)
**The primary location for Markdown rendering.**
- **Header:** Centered title with a `brand-blue` timestamp.
- **Typography:** Zinc-themed prose with `brand-blue` for links and inline code.
- **Navigation:** Bottom "Back to journal" link with uppercase tracking.
