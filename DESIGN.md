# Design System

## Overview
This portfolio uses a pristine, premium light mode design system inspired by modern minimalist principles (elegant, clear, and precise).

## Color Palette
The theme uses a soft, sophisticated light palette driven by CSS variables in `style.css`.

- **Background Body (`--bg-body`):** `#f5f5f7` - A soft, warm off-white for the main body.
- **Background Card (`--bg-card`):** `#ffffff` - Pure white for content cards to create elevation.
- **Text Primary (`--text-primary`):** `#1d1d1f` - Deep charcoal for high readability without harshness.
- **Text Secondary (`--text-secondary`):** `#515154` - Muted slate gray for descriptions.
- **Accent (`--accent`):** `#0066cc` - A professional, modern blue for primary actions.

## Typography
- **Primary Font:** 'Inter', sans-serif (Geometric Sans).
- **Header Weights:** 700 (Bold).
- **Body Weights:** 400 (Regular) to 500 (Medium).
- **Line Height:** 1.5 - 1.6 for maximum legibility.
- **Letter Spacing:** Tighter spacing (`-0.03em`) on hero headers for a premium feel.

## Component Architecture

### 1. Navigation
- **Glassmorphism:** Uses `backdrop-filter: blur(20px)` and a semi-transparent white background (`rgba(245, 245, 247, 0.75)`) for an elegant, floating feel.
- **Precision Border:** A subtle `1px` bottom border defines the navigation area.

### 2. Project & Info Cards
- **Soft Depth:** Removed harsh borders in favor of very soft, diffused shadows (`rgba(0,0,0,0.06)`).
- **Tactile Hover:** Cards lift (`translateY(-8px)`) and shadows expand smoothly on interaction.
- **Rounded Corners:** Consistent `18px` radius for a friendly yet modern look.

### 3. Grid System
- Uses **CSS Grid** with `repeat(auto-fill, minmax(340px, 1fr))` for a fluid, responsive gallery.

### 4. Animations
- **Staggered Reveal:** CSS-driven staggered animations (`reveal-1`, `reveal-2`, `reveal-3`) create a purposeful entrance experience.
- **Cubic Bezier:** Uses `cubic-bezier(0.2, 0.8, 0.2, 1)` for smooth, natural movement.
