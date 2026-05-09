# Design System

## Overview
This portfolio uses a modern, high-fidelity dark mode design system focused on minimalism, readability, and professional UI/UX standards.

## Color Palette
The theme uses a sophisticated dark palette driven by CSS variables in `style.css`.

- **Background Base (`--bg-base`):** `#0a0a0c` - A deep, near-black for the main background.
- **Surface (`--bg-surface`):** `#16161e` - A slightly lighter gray for cards and containers to create depth.
- **Accent (`--accent`):** `#3b82f6` - A vibrant electric blue used for CTAs, icons, and highlights.
- **Text Primary (`--text-primary`):** `#f8fafc` - High-contrast off-white for main content.
- **Text Secondary (`--text-secondary`):** `#94a3b8` - Muted gray for descriptions and secondary info.

## Typography
- **Primary Font:** 'Inter', sans-serif.
- **Header Weights:** 700 (Bold) to 800 (Extra Bold).
- **Body Weights:** 400 (Regular) to 500 (Medium).
- **Line Height:** 1.6 - 1.7 for optimal readability.
- **Letter Spacing:** Tighter spacing (`-0.04em`) on large headings for a premium feel.

## Component Architecture

### 1. Navigation
- **Glassmorphism:** Uses `backdrop-filter: blur(12px)` and a semi-transparent background for a modern layered feel.
- **Sticky Behavior:** Remains fixed at the top for easy navigation.

### 2. Project Cards
- **Aspect Ratio:** Images are locked to `16:9` using `object-fit: cover` to ensure grid uniformity.
- **Interactions:** Subtle lift effect (`translateY(-8px)`) and accent-colored glow on hover.

### 3. Grid System
- Uses **CSS Grid** with `repeat(auto-fill, minmax(320px, 1fr))` to provide a completely responsive layout without complex media queries.

### 4. Animations
- **Intersection Observer:** Triggers `reveal` animations as elements scroll into view.
- **Transitions:** Global `0.3s cubic-bezier` for all interactive states.
