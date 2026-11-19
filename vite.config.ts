import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import solid from '@solidjs/vite-plugin';

import { getPostSlugs } from './lib/api.ts';
import { postsPlugin } from './lib/vite-plugin-posts.ts';

export default defineConfig({
  plugins: [
    postsPlugin(),
    tanstackStart({
      srcDirectory: 'app',
      prerender: {
        enabled: true,
        // Every page is listed in `pages`.
        crawlLinks: false,
        // Write `posts/foo.html` rather than `posts/foo/index.html`, matching
        // the URLs the Next.js export produced.
        autoSubfolderIndex: false,
      },
      pages: [
        { path: '/' },
        // Becomes `404.html`; see app/server.ts.
        { path: '/404' },
        ...getPostSlugs().map((slug) => ({ path: `/posts/${slug}` })),
      ],
    }),
    // TanStack Start's setup docs require this after `tanstackStart()`.
    solid({ ssr: true }),
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
