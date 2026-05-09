# Daniel Phan - Digital Craftsman Portfolio

A high-performance, minimalist personal portfolio and technical journal built with **Astro** and **Tailwind CSS**. Designed with a focus on precision, clarity, and elegant UI/UX.

## 💎 The "Digital Craftsman" Aesthetic
This portfolio implements a premium, Apple-inspired light theme designed to showcase work with maximum impact and zero clutter.

- **Pristine Interface:** Utilizes a soft `#f5f5f7` background with pure white floating cards.
- **Glassmorphic Navigation:** A high-precision navbar with `20px` backdrop blurring and subtle borders.
- **Precision Typography:** Leverages a custom system font stack for a native, editorial feel.
- **Micro-interactions:** Staggered entrance animations and tactile card-lift effects on hover.

## 🚀 Technical Architecture
- **Framework:** [Astro 4](https://astro.build/) - Delivering sub-second performance with zero-JS by default.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - High-precision utility-first design system.
- **Content:** [Markdown Collections](https://docs.astro.build/en/guides/content-collections/) - Native, file-based technical blogging.
- **Data Integration:** [GitHub REST API](https://docs.github.com/en/rest) - Real-time automated project gallery.
- **Verification:** [Playwright](https://playwright.dev/) - End-to-End (E2E) testing suite for all core flows.

## 📂 Core Structure
- `src/pages/index.astro`: Home section featuring a bold hero and the technical journal.
- `src/pages/projects.astro`: Dynamic projects gallery synced directly with GitHub.
- `src/content/blog/`: Markdown source files for all tech articles and tutorials.
- `tests/`: Automated E2E verification suite.

## 🏁 Getting Started

### Development
1. **Clone & Install:**
   ```bash
   git clone [repository-url]
   npm install
   ```
2. **Run Dev Server:**
   ```bash
   npm run dev
   ```
   Access the site at `http://localhost:4321`.

### Quality Control
Run the full testing suite to ensure precision:
```bash
npm test
```

### Production Build
```bash
npm run build
```

---
© 2026 Daniel Phan. Crafted with precision.
