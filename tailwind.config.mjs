/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Geist Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Newsreader', 'Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'bg-base': '#fafaf9', // stone-50
        'bg-surface': '#ffffff', // white
        'text-main': '#18181b', // zinc-900
        'text-muted': '#71717a', // zinc-500
        'brand-blue': '#0071e3', // precision blue
      },
      borderRadius: { card: '1.25rem' },
      boxShadow: {
        subtle: '0 4px 20px rgba(0, 0, 0, 0.04)',
        hover: '0 12px 32px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  overrides: { '@astrojs/tailwind': { astro: '$astro' } },
};
