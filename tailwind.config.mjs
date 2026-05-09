/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        apple: {
          bg: '#f5f5f7',
          text: '#1d1d1f',
          secondary: '#515154',
          blue: '#0071e3',
          border: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
  plugins: [],
};
