# DESIGN.md - The "Digital Craftsman" Portfolio Specification

## 1. Design Philosophy
This portfolio is a minimalist digital journal. It discards heavy corporate "tech" aesthetics (no bright purple gradients, no heavy drop shadows) in favor of high-end editorial simplicity. It relies on stark contrast, perfect typography, and brutalist speed.

---

## 2. Global Tokens & Tailwind Configuration (`tailwind.config.mjs`)

**Colors (Organic & Muted):**
- **Background:** `bg-stone-50` (`#fafaf9`) - A warm, paper-like off-white. Never use pure white for the main background.
- **Surface:** `bg-white` (`#ffffff`) - Used only for elevated cards to create subtle depth.
- **Primary Text:** `text-zinc-900` (`#18181b`) - Soft black for maximum readability without eye strain.
- **Muted Text:** `text-zinc-500` (`#71717a`) - For dates, tags, and secondary metadata.
- **Accents:** `text-zinc-400` - For subtle borders or dividers.

**Typography:**
- **Sans-Serif (UI & Body):** `font-sans` (Inter or Geist). Used for navigation, dates, and small UI text.
- **Serif (Editorial Headings):** `font-serif` (Newsreader, Playfair Display, or Merriweather). Used strictly for the main Hero intro and Blog post titles to create a timeless, printed-book feel.

---

## 3. Global Layout & Navigation (`src/layouts/Layout.astro`)

The entire site is contained within a max-width column to keep line lengths readable.

**Structure:**
- `<body>` should have `bg-stone-50 text-zinc-900 antialiased min-h-screen flex flex-col`.
- **Main Container:** `<main class="max-w-3xl mx-auto px-6 py-12 flex-grow">`
- **Navigation (Header):**
  - A `<nav>` element at the very top. Flexbox row, `justify-between`, `items-center`, `mb-16`.
  - **Left Side:** Your name (`<a href="/" class="font-medium tracking-tight">Daniel Phan</a>`).
  - **Right Side:** Flex row with a gap of `gap-6`. Links: `Home`, `Blog`, `Projects`.
  - **Link States:** Inactive is `text-zinc-500 hover:text-zinc-900 transition-colors`. Active page is `text-zinc-900`.

---

## 4. Page-Specific Architectures

### A. Home Page (`/`)
The home page acts as a quick introduction and a table of contents for your best work.

1.  **Hero Section:**
    - `<h1 class="font-serif text-4xl md:text-5xl leading-tight tracking-tight mb-6">`
    - Text: "Daniel Phan. Software engineer and digital craftsman."
    - `<p class="text-zinc-500 max-w-xl text-lg leading-relaxed mb-12">`
    - Text: A 2-sentence bio about what you build and what you care about (e.g., performance, localized IoT, space tech).

2.  **Selected Writing (Preview):**
    - `<h2 class="font-medium text-sm text-zinc-400 uppercase tracking-widest mb-6">Selected Writing</h2>`
    - A simple `<ul>` flex column (`flex flex-col gap-4`).
    - Each item is a link that mimics the Blog page layout (Date on left, Title on right).

3.  **Selected Projects (Preview):**
    - `<h2 class="font-medium text-sm text-zinc-400 uppercase tracking-widest mt-12 mb-6">Recent Work</h2>`
    - A CSS grid (`grid grid-cols-1 sm:grid-cols-2 gap-4`).
    - Call in 2 of the GitHub project cards (specified below).

### B. The Timeless Tech Blog (`/blog`)
This page is a masterclass in typography. No thumbnail images, just text.

1.  **Header:**
    - `<h1 class="font-serif text-4xl mb-8">Writing</h1>`
2.  **List Layout (Grouped by Year):**
    - For each year, render a sticky year header: `<h3 class="text-zinc-400 font-medium mb-4 mt-8">2026</h3>`.
    - Below the year, an unordered list of articles.
    - **Article Row:** `<a class="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3 border-b border-zinc-200">`
    - **Article Title:** `<span class="font-serif text-lg group-hover:underline decoration-zinc-300 underline-offset-4">Building Localized Home Automation</span>`
    - **Article Date:** `<time class="text-zinc-500 text-sm mt-1 sm:mt-0 sm:ml-4 tabular-nums">May 09</time>`

### C. Article Reading Page (`/blog/[slug]`)
- **Header:** Title (Serif, `text-4xl`), Date (Sans, `text-zinc-500`), and perhaps a reading time indicator.
- **Content:** Wrap the markdown output in `<article class="prose prose-zinc max-w-none mt-8 prose-headings:font-serif prose-a:underline-offset-4">`. This allows Tailwind's Typography plugin to perfectly style the markdown text, code blocks, and blockquotes automatically.

### D. Projects Page (`/projects`)
A clean dashboard of your GitHub repositories.

1.  **Header:**
    - `<h1 class="font-serif text-4xl mb-2">Projects</h1>`
    - `<p class="text-zinc-500 mb-8">Open source tools, experiments, and web architecture.</p>`
2.  **The Grid:**
    - `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`
3.  **The Project Cards (The "Bento" look):**
    - Container: `<a href="GITHUB_URL" target="_blank" class="block p-6 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 hover:shadow-sm transition-all group">`
    - **Top Row (Title & Icon):** Flexbox row, justify-between. Title is `text-zinc-900 font-medium`. Icon is a small `↗` arrow that translates up and right on hover (`group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform`).
    - **Description:** `<p class="text-zinc-500 text-sm mt-2 line-clamp-2">`
    - **Tech Stack Footer:** Flex row of small tags at the bottom. `<span class="text-xs text-zinc-500 bg-stone-100 px-2 py-1 rounded-md">Astro</span>`
