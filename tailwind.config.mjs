/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Geist Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Newsreader', 'Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'bg-body': '#f5f5f7',
        'bg-surface': '#ffffff',
        'text-primary': '#1d1d1f',
        'text-secondary': '#86868b',
        'accent-blue': '#0071e3',
        'accent-blue-hover': '#0077ed',
        'border-light': '#d2d2d7',
        stone: {
          50: '#fafaf9',
        },
        zinc: {
          900: '#18181b',
          500: '#71717a',
          400: '#a1a1aa',
        },
      },
      borderRadius: {
        'card': '18px',
        'input': '12px',
        'pill': '980px',
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'hover': '0 12px 32px rgba(0, 0, 0, 0.08)',
      },
      letterSpacing: {
        'heading': '-0.022em',
        tighter: '-0.05em',
      },
      lineHeight: {
        'body': '1.47059',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
