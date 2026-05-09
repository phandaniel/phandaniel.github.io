# Daniel Phan — Digital Craftsman

A high-fidelity, editorial personal portfolio and technical journal built with **Astro 6** and **Tailwind CSS**. This project follows the "Digital Craftsman" philosophy: precision in engineering, minimalism in design, and brutal performance.

## 💎 Design Philosophy
This portfolio is built as a custom UI application, moving away from standard document-based rendering to an "Editorial Minimalism" aesthetic.

- **Minimalist Landing:** A focused Home page that introduces the brand with maximum impact and intentional whitespace.
- **Editorial Typography:** A sophisticated dual-font system mixing precision **Inter/Geist Sans** with elegant **Newsreader Serif**.
- **Technical Journal:** A curated, year-grouped directory of engineering insights and architectural thoughts.
- **Glassmorphism:** High-precision sticky navigation with `backdrop-blur` for a native, layered feel.
- **Precision UI:** Custom-built components with subtle radial-gradient textures and high-fidelity transitions.

## 🚀 Technical Architecture
- **Framework:** [Astro 6](https://astro.build/) — Leveraging the modern **Content Layer API** for sub-second build performance and type-safe data loading.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) — High-precision utility-first design system with custom theme tokens.
- **Content Engine:** [Markdown Collections](https://docs.astro.build/en/guides/content-collections/) — File-based technical blogging with automated metadata extraction.
- **Hybrid Data:** Integrated project sourcing from both local JSON manifestos and the **GitHub REST API**.
- **Icons:** [Lucide Astro](https://lucide.dev/) — Lightweight, high-precision vector iconography.
- **Verification:** [Playwright](https://playwright.dev/) — Comprehensive E2E testing suite for all core functional flows.

## 📂 Project Structure
```text
├── src/
│   ├── components/       # Reusable UI components (Header, ProjectCard, etc.)
│   ├── content/          # Managed content collections (Blog, Projects)
│   ├── data/             # Centralized constants and site metadata
│   ├── layouts/          # Base page templates and blog post layouts
│   ├── pages/            # File-based routing (Index, Blog, Projects)
│   ├── styles/           # Global CSS and Tailwind utility layers
│   └── utils/            # Helper functions (GitHub API, formatting)
├── tests/                # Playwright E2E verification suite
└── public/               # Static assets and favicons
```

## ⚙️ Configuration

To enable real-time GitHub repository fetching, you can provide a GitHub Personal Access Token. This prevents rate limiting during builds.

Create a `.env` file in the root directory:
```bash
GITHUB_TOKEN=your_token_here
```

## 🏁 Getting Started

### Installation & Development
```bash
npm install
npm run dev
```
Access the local development server at `http://localhost:4321`.

### Quality Control
Run the E2E testing suite with:
```bash
npm test
```

### Production Build
Generate a static production build:
```bash
npm run build
```

---
© 2026 Daniel Phan. Crafted with precision.
