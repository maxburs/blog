import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';

import { getPostSlugs } from './lib/api.ts';
import { postsPlugin } from './lib/vite-plugin-posts.ts';
import { prerenderPlugin } from './lib/vite-plugin-prerender.ts';

export default defineConfig({
  plugins: [
    postsPlugin(),
    solid({
      ssr: true,
      start: { app: 'app/app.tsx', document: 'app/document.tsx' },
    }),
    prerenderPlugin(() => [
      { path: '/' },
      // Netlify serves `404.html` for unknown paths.
      { path: '/404', status: 404 },
      ...getPostSlugs().map((slug) => ({ path: `/posts/${slug}` })),
    ]),
  ],
  build: {
    rolldownOptions: {
      output: {
        // Post chunks are named after files like `2021-01-02 slug.md`; keep
        // the space out of asset URLs.
        sanitizeFileName: (name) => name.replace(/[^\w.-]/g, '-'),
      },
    },
  },
});
