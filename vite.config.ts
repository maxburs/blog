import { statSync } from 'node:fs';
import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';
import { serverFunctions } from '@solidjs/prerender/integration';
import { prerender } from 'prerender-crawler/vite';

import { fallbackUrl } from './constants.ts';
import { getPostSlugs } from './lib/api.ts';

const postSlugs = getPostSlugs();

export default defineConfig({
  define: {
    // For the router to match post URLs without loading any posts. Restart
    // the dev server after adding or renaming a post.
    'import.meta.env.POST_SLUGS': JSON.stringify(postSlugs),
  },
  plugins: [
    solid({
      ssr: true,
      // Compiles `'use server'` functions, which by default it only looks for
      // in `src/`.
      serverFunctions: { filter: { include: 'app/**/*.{ts,tsx}' } },
      start: {
        app: 'app/app.tsx',
        document: 'app/document.tsx',
        // Wait for async content before sending a page instead of streaming
        // it, so prerendered HTML contains the resolved content rather than
        // `<Loading>` fallbacks and swap scripts.
        renderMode: 'async',
      },
    }),
    // Renders these pages, and every page they link to, into `dist/client`.
    prerender({
      // Saves the results of server functions called while rendering. Its
      // check for functions the browser could call but the build never saved
      // doesn't run: it looks for the Vite plugin's list of functions in
      // `dist/client`, but the plugin moves that list to `dist/server`.
      integrations: [serverFunctions()],
      // Treat absolute links to the site as internal so they're crawled too
      // (requests still go to the built server bundle, not the live site).
      origin: fallbackUrl,
      pages: [
        '/',
        // Netlify serves `404.html` for unknown paths.
        { path: '/404', filename: '404.html' },
        // Listed so posts nothing links to are still prerendered. Without an
        // explicit filename, the crawler would percent-encode slugs with
        // spaces or non-ASCII characters, and drop `.html` from slugs with a
        // dot.
        ...postSlugs.map((slug) => ({
          // Encoded like the router's links, so both name one page.
          path: `/posts/${encodeURIComponent(slug)}`,
          filename: `posts/${slug}.html`,
        })),
      ],
      // Skip links to files in `public/`, such as `/rss.xml`, so the crawler
      // doesn't try to render them as pages.
      filter: (path) => !isPublicFile(path),
      // Write other linked pages, such as `/about`, to `about.html` instead
      // of `about/index.html`, which would make Netlify redirect `/about` to
      // `/about/`.
      autoSubfolderIndex: false,
    }),
  ],
});

/** Whether a URL path, such as `/rss.xml`, names a file in `public/`. */
function isPublicFile(urlPath: string) {
  let filePath: string;
  try {
    // Static hosts decode escapes like `%72` before looking up the file.
    filePath = decodeURI(urlPath);
  } catch {
    // Malformed escape: let the crawler request it so the build fails on 404.
    return false;
  }
  return (
    statSync(`public${filePath}`, { throwIfNoEntry: false })?.isFile() === true
  );
}
