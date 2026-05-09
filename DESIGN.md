# DESIGN.md - UI-First "Digital Craftsman" Specification

## 1. Architectural Directive (CRITICAL)
Do NOT use `@tailwindcss/typography` (the `prose` classes) anywhere except for the internal content of `/blog/[slug].astro`. 
The Home page (`/`), Projects page (`/projects`), and Blog index (`/blog`) must be built as custom, interactive UI components using standard Tailwind utility classes (Flexbox, CSS Grid). They should look like a high-end web application, not a rendered README document.

---

## 2. Global Tokens & Theme (`tailwind.config.mjs`)
- **Background:** `bg-stone-50` (`#fafaf9`) - Warm off-white.
- **Surface Cards:** `bg-white` (`#ffffff`) - For elevated UI elements.
- **Text:** `text-zinc-900` (primary), `text-zinc-500` (secondary/muted), `text-zinc-400` (borders/dividers).
- **Typography:** - `font-sans` (Inter/Geist) for navigation, dates, tags, and small UI text.
  - `font-serif` (Newsreader/Playfair) for Hero text and major headings.

---

## 3. UI Component Construction Specifications

### A. Global Navigation (`src/components/Header.astro`)
Must be a sticky UI component, not just a text list.
- **Container:** `<header class="sticky top-0 z-50 w-full backdrop-blur-md bg-stone-50/80 border-b border-zinc-200/50">`
- **Layout:** Max-width container (`max-w-4xl mx-auto px-6 py-4`), Flexbox `justify-between`, `items-center`.
- **Links:** Display as a row (`flex gap-6`). Active links should be `font-medium text-zinc-900`; inactive should be `text-zinc-500 hover:text-zinc-900 transition-colors`.

### B. Home Page (`src/pages/index.astro`)
This must be a highly structured landing page.

1. **Hero Section:**
   - Container: `flex flex-col justify-center min-h-[40vh] py-12`.
   - Heading: `<h1 class="font-serif text-5xl md:text-6xl text-zinc-900 leading-tight mb-6">`
   - Subtitle: `<p class="font-sans text-xl text-zinc-500 max-w-2xl leading-relaxed mb-8">`
   - Actions: Flex row of buttons/links (e.g., "View Projects" styled as `<a class="px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">`).

2. **Featured Projects Section:**
   - Must use a Bento-style CSS Grid: `<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">`.
   - Do not use lists. Call the Project Card component (defined below).

### C. Projects Page (`src/pages/projects.astro`)
Must look like an application dashboard, not a list of text.
- **Page Layout:** `<div class="max-w-4xl mx-auto px-6 py-12">`
- **Header:** `<h1 class="font-serif text-4xl mb-12">Projects</h1>`
- **The Grid:** `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`
- **Project Card Component (`src/components/ProjectCard.astro`):**
  - **Wrapper:** `<a class="group block h-full p-6 bg-white rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all flex flex-col justify-between">`
  - **Top:** Flex row with Title (`text-lg font-medium text-zinc-900`) and a GitHub icon or `↗` arrow that translates on hover (`group-hover:-translate-y-1 group-hover:translate-x-1`).
  - **Middle:** Description (`text-zinc-500 text-sm mt-3 line-clamp-3`).
  - **Bottom:** Flex wrap container for tech stack tags `<span class="px-2 py-1 bg-stone-100 text-zinc-600 text-xs rounded-md">Astro</span>`.

### D. Blog Index (`src/pages/blog/index.astro`)
An interactive, elegant directory.
- **Layout:** Max-width container.
- **Rows (Not Bullets):** Instead of `<ul>`/`<li>`, map through posts and build flex rows.
- **Row Styling:** `<a class="group flex flex-col sm:flex-row sm:justify-between py-4 border-b border-zinc-200 hover:bg-white/50 transition-colors px-2 -mx-2 rounded-lg">`
- **Left (Title):** `<span class="font-serif text-xl text-zinc-900 group-hover:text-blue-600 transition-colors">`
- **Right (Date):** `<span class="font-sans text-sm text-zinc-500 tabular-nums">`

### E. Blog Post Layout (`src/layouts/BlogPost.astro`)
**THIS IS THE ONLY PLACE MARKDOWN RENDERING IS ALLOWED.**
- Wrap the `<slot />` (markdown content) in: `<article class="prose prose-zinc prose-lg max-w-2xl mx-auto mt-12 prose-headings:font-serif prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">`
