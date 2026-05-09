# Daniel Phan — Digital Craftsman

A high-fidelity, editorial personal portfolio and technical journal built with **Astro** and **Tailwind CSS**. This project follows the "Digital Craftsman" philosophy: precision in engineering, minimalism in design, and brutal performance.

## 💎 Design Philosophy
This portfolio is built as a custom UI application, moving away from standard document-based rendering to an "Editorial Minimalism" aesthetic.

- **Minimalist Landing:** A focused Home page that introduces the brand with maximum impact and intentional whitespace.
- **Editorial Typography:** A sophisticated dual-font system mixing precision **System Sans-Serif** with elegant **Serif (Newsreader)**.
- **Technical Journal:** A curated, year-grouped directory of engineering insights and architectural thoughts.
- **Glassmorphism:** High-precision sticky navigation with `backdrop-blur` for a native, layered feel.

## 🚀 Technical Architecture
- **Framework:** [Astro 6](https://astro.build/) — Leveraging the modern Content Layer API for sub-second performance.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) — High-precision utility-first design system.
- **Content:** [Markdown Collections](https://docs.astro.build/en/guides/content-collections/) — Type-safe, file-based technical blogging.
- **Data Integration:** [GitHub REST API](https://docs.github.com/en/rest) — Real-time automated project synchronization.
- **Verification:** [Playwright](https://playwright.dev/) — End-to-End (E2E) testing suite for all core functional flows.

## 📂 Core Structure
- `src/pages/index.astro` — Focused minimalist hero entrance.
- `src/pages/projects.astro` — Interactive dashboard of technical solutions.
- `src/pages/blog/index.astro` — Editorial directory of technical writing.
- `src/content/blog/` — Source Markdown for technical journal entries.
- `tests/` — Automated E2E verification suite.

## 🏁 Getting Started

### Installation & Development
```bash
npm install
npm run dev
```
Access the site at `http://localhost:4321`.

### Quality Control
```bash
npm test
```

### Production Build
```bash
npm run build
```

---
© 2026 Daniel Phan. Crafted with precision.
