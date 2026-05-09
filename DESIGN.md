# DESIGN.md - UI-First "Digital Craftsman" Specification

## 1. Architectural Directive (CRITICAL)
Do NOT use `@tailwindcss/typography` (the `prose` classes) anywhere except for the internal content of `/blog/[slug].astro`. 
The Home page (`/`), Projects page (`/projects`), and Blog index (`/blog`) must be built as custom, interactive UI components using standard Tailwind utility classes (Flexbox, CSS Grid). They should look like a high-end web application, not a rendered README document.

---

## 2. Global Tokens & Theme (`tailwind.config.mjs`)
- **Background:** `bg-stone-50` (`#fafaf9`) - Warm off-white.
- **Surface Cards:** `bg-white` (`#ffffff`) - For elevated UI elements.
- **Text:** `text-zinc-900` (primary), `text-zinc-500` (secondary/muted), `text-zinc-400` (borders/dividers).
- **Typography:** 
  - `font-sans` (Inter/Geist) for navigation, dates, tags, and small UI text.
  - `font-serif` (Newsreader/Playfair) for Hero text and major headings.

---

## 3. UI Component Construction Specifications

### A. Global Navigation (`src/components/Header.astro`)
Must be a sticky UI component with a native floating feel.
- **Container:** `<header class="sticky top-0 z-50 w-full backdrop-blur-md bg-stone-50/80 border-b border-zinc-200/50">`
- **Layout:** Max-width container (`max-w-4xl mx-auto px-6 py-4`), Flexbox `justify-between`, `items-center`.
- **Links:** Display as a row (`flex gap-6`). Active links should be `font-medium text-zinc-900`; inactive should be `text-zinc-500 hover:text-zinc-900 transition-colors`.

### B. Home Page (`src/pages/index.astro`)
Strictly a **Minimalist Landing Page**.
- **Hero Section:**
  - Container: `flex flex-col justify-center min-h-[80vh] py-32`.
  - Heading: `<h1 class="font-serif text-4xl md:text-6xl text-zinc-900 leading-[1.1] mb-8">`
  - Subtitle: `<p class="font-sans text-xl md:text-2xl text-zinc-500 max-w-2xl leading-relaxed mb-12">`
  - Actions: Flex row of buttons/links (e.g., "View Projects" styled as `<a class="px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium text-sm">`).

### C. Projects Page (`src/pages/projects.astro`)
High-performance dashboard for technical work.
- **Page Layout:** `<div class="max-w-4xl mx-auto px-6 py-12">`
- **Header:** `<h1 class="font-serif text-5xl md:text-6xl mb-12">Projects</h1>`
- **The Grid:** `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`
- **Project Card Component (`src/components/ProjectCard.astro`):**
  - **Wrapper:** `<a class="group block h-full p-8 bg-white rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all flex flex-col justify-between">`
  - **Interaction:** `group-hover:-translate-y-1` and soft shadow expansion.

### D. Blog Index (`src/pages/blog/index.astro`)
Interactive editorial directory grouped by year.
- **Layout:** Max-width container.
- **Year Headers:** Sticky sub-headers (`sticky top-16`) for natural grouping.
- **Article Rows:** Flex rows (`flex items-baseline justify-between`) with title on left (Serif) and date on right (Sans).
- **Interactions:** Hover state transitions title color to `text-blue-600`.

### E. Blog Post Layout (`src/layouts/BlogPost.astro`)
**Exclusive location for Markdown rendering.**
- Wrap content in: `<article class="prose prose-zinc prose-lg max-w-2xl mx-auto mt-12 prose-headings:font-serif prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">`
