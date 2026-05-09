# DESIGN.md - The "Digital Craftsman" Portfolio Specification

## 1. Design Philosophy
The goal is to create a timeless, editorial-style personal website and tech blog. It should move away from heavy, corporate "tech" aesthetics and instead feel like a minimalist digital journal. It must be brutally fast (leveraging Astro) and highly readable.

**Core Principles:**
- **Editorial Minimalism:** Lots of negative space. Content is the primary design element.
- **Organic over Synthetic:** Use warm off-whites and soft blacks instead of harsh digital `#000000` or `#FFFFFF`.
- **Deliberate Typography:** Mix a modern, geometric sans-serif for the UI with a classic, elegant serif for blog article headings.
- **Frictionless Navigation:** A simple, sticky top navigation bar with three primary routes: Home, Blog, Projects.

---

## 2. Global Design Tokens (Tailwind CSS Configuration)

Please configure `tailwind.config.mjs` to include these specific utility extensions:

### Colors
* **Backgrounds:** * `bg-stone-50` (`#fafaf9`) - The main site background. A warm, paper-like off-white.
  * `bg-white` (`#ffffff`) - For slightly elevated elements (like project cards).
* **Text:**
  * `text-zinc-900` (`#18181b`) - Primary text for maximum readability without harshness.
  * `text-zinc-500` (`#71717a`) - Secondary text (dates, reading times, subtle links).
* **Accents:**
  * `text-blue-600` (`#2563eb`) - Used *very* sparingly for active link states or hover interactions. 

### Typography
* **UI & Body Font (Sans-serif):** `Inter`, `Geist Sans`, or system fonts.
* **Editorial Headings (Serif):** `Newsreader`, `Playfair Display`, or `Merriweather`. Used specifically for Blog post titles and main section headers to give a "timeless" feel.

---

## 3. Page Architecture & Layout

### A. Global Navigation (Header)
- A minimalist, sticky top bar with a slight blur backdrop (`backdrop-blur-md bg-stone-50/80`).
- **Left:** Your Name or a simple logo mark.
- **Right:** Links aligned horizontally: `Home`, `Blog`, `Projects`.
- Active states should simply make the text `text-zinc-900` and `font-medium`, while inactive links remain `text-zinc-500`.

### B. Home Page (`/`)
- **Hero Section:** A short, punchy intro (e.g., "Hi, I'm Daniel. A software engineer and digital craftsman.") using the Serif font, sized large (`text-4xl` to `text-6xl`), aligned left.
- **Selected Writing:** A preview of the 2-3 most recent blog posts. Show the date in muted text, the title, and a 1-sentence excerpt. 
- **Featured Projects:** A preview of 2 standout projects linking out to GitHub.

### C. The Tech Blog (`/blog`)
- **Layout:** A clean, single-column vertical list constrained to a maximum width (`max-w-2xl` or `prose` plugin size) for optimal reading line length.
- **List Items:** - Grouped by Year (e.g., "2026").
  - Each item is a flex row: `[Date (muted)] --- [Title (dark)]`.
  - On hover, the title gently shifts right (`transform translate-x-1 transition-all`).
- **Article Pages:** Use the `@tailwindcss/typography` plugin. The prose should be beautifully formatted with clear `h2` / `h3` hierarchy, styled inline code blocks (soft gray background, rounded text), and elegant blockquotes.

### D. Projects Page (`/projects`)
- A grid layout (`grid-cols-1 sm:grid-cols-2`) of project cards.
- **Card Design:** - Light border (`border border-zinc-200`).
  - No heavy drop shadows; keep it flat and clean.
  - **Content:** Project Title, a 2-line description, and tags for the tech stack used (e.g., `Astro`, `TypeScript`).
  - **Interaction:** The entire card acts as a link to the GitHub repository. Include a small external link icon (`↗` via Lucide-Astro) next to the title to indicate it leaves the site.

---

## 4. Execution Instructions for AI Assistant
1. Ensure the Tailwind configuration is updated with the warm/stone color palette.
2. Build a standard Layout wrapper containing the minimalist navigation bar.
3. Build the `/` route with a focus on left-aligned, bold typography.
4. Set up the Astro Content Collections (`src/content/blog/`) to automatically populate the `/blog` route.
5. Apply the `@tailwindcss/typography` (`prose` classes) to the blog post rendering layout.
6. Create the Projects grid focusing on flat, bordered cards that explicitly link out to external GitHub URLs.
