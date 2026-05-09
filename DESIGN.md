# Design System: Digital Craftsman

## Overview
This portfolio uses a high-performance, minimalist design system built with **Astro** and **Tailwind CSS**. It is inspired by the principles of precision, clarity, and "zero-JS" efficiency.

## Technical Architecture
- **Framework:** Astro (Static Site Generation)
- **Styling:** Tailwind CSS (Utility-first)
- **Content:** Markdown Collections (Local storage)
- **Data:** GitHub API (Real-time project syncing)
- **Testing:** Playwright (End-to-End validation)

## Color Palette
The theme uses a soft, sophisticated light palette focused on content readability.

- **Background Body:** `#f5f5f7` (Soft Off-white)
- **Cards:** `#ffffff` (Pure White)
- **Text Primary:** `#1d1d1f` (Deep Charcoal)
- **Text Secondary:** `#515154` (Muted Gray)
- **Accent:** `#0071e3` (Precision Blue)

## Component Standards

### 1. Navigation
- **Glassmorphism:** `backdrop-blur-xl` and `bg-apple-bg/80` for a native, floating feel.
- **State:** Dynamic active link highlighting based on current URL path.

### 2. Typography
- **Font Stack:** System Sans-Serif (`-apple-system`, `BlinkMacSystemFont`, etc.) fallback to `Inter`.
- **Headings:** Bold tracking-tight (`-0.03em`) for a premium editorial look.

### 3. Project Gallery
- **API Integration:** Projects are fetched dynamically from the GitHub API.
- **Card Design:** Large padding (`p-8`), `24px` border radius, and smooth scale/translate transitions on hover.
