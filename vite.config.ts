import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: 'app',
      prerender: {
        enabled: true,
        crawlLinks: true,
        // Write `posts/foo.html` rather than `posts/foo/index.html`, matching
        // the URLs the Next.js export produced.
        autoSubfolderIndex: false,
        // Links to files such as `/rss.xml` aren't pages.
        filter: ({ path }) => !/\.\w+$/.test(path),
      },
      // Becomes `404.html`; see app/server.ts.
      pages: [{ path: '/404' }],
    }),
    // Must come after `tanstackStart()`.
    solid({ ssr: true }),
  ],
});
