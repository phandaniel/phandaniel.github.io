# Daniel Phan — Digital Craftsman

A high-fidelity, editorial personal portfolio and technical journal built with **Astro** and **Tailwind CSS**. This project follows the "Digital Craftsman" philosophy: precision in engineering, minimalism in design, and brutal performance.

## 💎 Design Philosophy
This portfolio is built as a custom UI application, moving away from standard document-based rendering to a high-end editorial aesthetic.

- **Editorial Minimalism:** A sophisticated `stone-50` and `zinc-900` palette that emphasizes content through whitespace and typography.
- **Dual-Font System:** A mix of precision **System Sans-Serif** for UI elements and elegant **Serif (Newsreader)** for long-form headers and storytelling.
- **Bento-Style Dashboard:** Projects are organized in a high-density, interactive grid with tactile hover states and micro-animations.
- **Glassmorphism:** A sticky navigation layer with advanced `backdrop-blur` for a native, modern layered feel.

## 🚀 Technical Architecture
- **Framework:** [Astro 4](https://astro.build/) — Zero-JS by default, delivering sub-second load times and peak SEO performance.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) — A custom-configured design system with precise typography and color tokens.
- **Content:** [Markdown Collections](https://docs.astro.build/en/guides/content-collections/) — Type-safe, file-based technical blogging with isolated `@tailwindcss/typography` styling.
- **Data Integration:** [GitHub REST API](https://docs.github.com/en/rest) — Real-time automated synchronization of featured repositories.
- **Quality Assurance:** [Playwright](https://playwright.dev/) — Comprehensive E2E testing suite verifying navigation, rendering, and API integration.

## 📂 Core Structure
- `src/pages/index.astro` — The editorial home page and technical journal feed.
- `src/pages/projects.astro` — A high-performance interactive gallery of technical work.
- `src/content/blog/` — The source for all long-form technical writing.
- `src/components/` — Atomic UI components (Header, ProjectCards) built with utility-first precision.
- `tests/` — Automated E2E verification suite.

## 🏁 Getting Started

### Installation
1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd phandaniel.github.io
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development
Start the local server at `http://localhost:4321`:
```bash
npm run dev
```

### Verification
Execute the full E2E testing suite:
```bash
npm test
```

### Production Build
Generate a highly-optimized static build:
```bash
npm run build
```

---
© 2026 Daniel Phan. Built with precision.
