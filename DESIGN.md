# Design System

## Overview
This portfolio uses a pristine, premium light mode design system inspired by Apple's signature aesthetic (elegant, clear, and precise).

## Color Palette
The theme uses a soft, sophisticated light palette driven by CSS variables in `style.css`.

- **Background Body (`--bg-body`):** `#f5f5f7` - The iconic Apple light gray.
- **Background Card (`--bg-card`):** `#ffffff` - Pure white for content cards to create elevation.
- **Text Primary (`--text-primary`):** `#1d1d1f` - Deep charcoal for high readability.
- **Text Secondary (`--text-secondary`):** `#515154` - Muted gray for descriptions.
- **Accent (`--accent`):** `#0071e3` - Apple Signature Blue for primary actions.

## Typography
- **Primary Font:** System Font Stack (`-apple-system`, `BlinkMacSystemFont`, etc.)
- **Header Weights:** 700 (Bold).
- **Body Weights:** 400 (Regular) to 500 (Medium).
- **Line Height:** 1.5 for maximum legibility.
- **Letter Spacing:** Tighter spacing (`-0.03em`) on large headers.

## Component Architecture

### 1. Navigation
- **Glassmorphism:** Uses `backdrop-filter: blur(20px)` and a semi-transparent white background (`rgba(245, 245, 247, 0.8)`) for an elegant, floating feel.

### 2. Floating Cards (Projects & Topics)
- **Soft Depth:** Uses low-opacity diffused shadows (`rgba(0,0,0,0.04)`).
- **Tactile Hover:** Cards lift (`translateY(-4px)`) and shadows expand smoothly.
- **Rounded Corners:** Consistent `18px` radius.

### 3. Contact Form
- **Soft Inputs:** Light gray borders (`#d2d2d7`) and `12px` rounded corners.
- **Premium Focus:** Blue border (`#0071e3`) with a soft blue outer glow (`rgba(0, 113, 227, 0.2)`).

### 4. Buttons
- **Pill Shape:** Modern `980px` border-radius.
- **Interactive Scale:** Subtle scale-up effect (`scale(1.04)`) on hover.
