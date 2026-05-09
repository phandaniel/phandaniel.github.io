# DESIGN.md - Portfolio Redesign Specification

## 1. Design Philosophy
The goal of this redesign is to achieve a premium, minimalist, "Apple-like" light theme aesthetic. The UI should feel airy, precise, and highly responsive. 

**Core Principles:**
- **Clarity over decoration:** Rely on spacing, typography, and subtle contrast rather than heavy borders or dark backgrounds.
- **Depth through shadow:** Use pure white elements floating on an off-white background with very soft, diffused drop shadows.
- **Fluid responsiveness:** All layouts must use Flexbox or CSS Grid to adapt gracefully to any screen size.
- **IMAGE CONSTRAINT:** Do NOT alter any image source URLs, aspect ratios, or image placeholder logic. Focus entirely on layout, typography, UI elements, and structural CSS.

---

## 2. Global Design Tokens (CSS Variables)

Please implement these as CSS custom properties (`:root`) for consistency:

### Colors
* `--bg-body`: `#f5f5f7` (Soft light gray for the main page background)
* `--bg-surface`: `#ffffff` (Pure white for cards, forms, and floating elements)
* `--text-primary`: `#1d1d1f` (Deep charcoal for headings and high-contrast text)
* `--text-secondary`: `#86868b` (Muted gray for labels and secondary info)
* `--accent-blue`: `#0071e3` (Primary interactive color for buttons and links)
* `--accent-blue-hover`: `#0077ed`
* `--border-light`: `#d2d2d7` (For subtle borders on inputs and dividers)

### Typography
* `--font-family-base`: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
* `--line-height-body`: `1.47059`
* `--letter-spacing-heading`: `-0.022em`

### Shadows & Radii
* `--radius-card`: `18px`
* `--radius-input`: `12px`
* `--radius-pill`: `980px`
* `--shadow-subtle`: `0 4px 20px rgba(0, 0, 0, 0.04)`
* `--shadow-hover`: `0 12px 32px rgba(0, 0, 0, 0.08)`
* `--focus-ring`: `0 0 0 4px rgba(0, 113, 227, 0.2)`

---

## 3. Component Specifications

### A. Typography & Base Elements
- **Headings (h1, h2, h3):** Font weight 600, `color: var(--text-primary)`, tight letter spacing.
- **Body Text:** Font weight 400, `color: var(--text-primary)`.
- **Links (a):** `color: var(--accent-blue)`, `text-decoration: none`. On hover: `color: var(--accent-blue-hover)`, `text-decoration: underline`.
- **Global Spacing:** Ensure generous padding (`padding: 40px 20px` minimum for main sections).

### B. Project & Topic Cards
- **Container:** `background-color: var(--bg-surface)`
- **Border Radius:** `var(--radius-card)`
- **Shadow:** `box-shadow: var(--shadow-subtle)`
- **Interactions:** On hover, apply `transform: translateY(-4px)` and `box-shadow: var(--shadow-hover)` with a `0.3s ease` transition.
- **Layout:** Use CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`) to ensure cards stack gracefully on mobile and align perfectly on desktop.

### C. Forms & Inputs
- **Inputs & Textareas:** - `background-color: var(--bg-surface)`
  - `border: 1px solid var(--border-light)`
  - `border-radius: var(--radius-input)`
  - `padding: 16px`
  - Remove default browser outlines (`outline: none`).
- **Focus State:** When clicked, change border to `var(--accent-blue)` and apply `box-shadow: var(--focus-ring)`.
- **Labels:** `font-size: 12px`, `font-weight: 600`, `color: var(--text-secondary)`, positioned cleanly above the input field.

### D. Buttons
- **Primary Button styling:**
  - `background-color: var(--accent-blue)`
  - `color: #ffffff`
  - `border-radius: var(--radius-pill)`
  - `padding: 14px 28px`
  - `font-weight: 600`
  - `border: none`
- **Interactions:** On hover, scale slightly (`transform: scale(1.02)`) and shift background to `var(--accent-blue-hover)`.

---

## 4. Execution Instructions for AI Assistant
1. Review the current HTML structure and CSS.
2. Refactor the global stylesheet to implement the CSS variables listed above.
3. Apply these variables to the `body`, headings, and base elements.
4. Rewrite the structural HTML/CSS for lists (like the Topics section) to use the "Card" specification.
5. Overhaul the contact form using the exact states and colors provided in Section 3C.
6. **Remember:** Do not modify any `<img>` tags, image source paths, or specific image-related CSS aspect ratios. Focus purely on layout, UI elements, and the surrounding whitespace.