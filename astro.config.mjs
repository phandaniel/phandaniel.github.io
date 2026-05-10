import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://phandaniel.github.io',
  image: {
    domains: ['opengraph.githubassets.com', 'images.unsplash.com'],
  },
});
