import { createRouter, defineRoute, intentPreload } from '@solidjs/router';
import { lazy } from 'solid-js';

import { NotFound } from './not-found';
import { getPost } from './posts';
import { Index } from './routes/index';

export const Router = createRouter({
  routes: [
    { path: '/', component: Index },
    defineRoute({
      path: '/posts/:slug',
      // Unknown slugs fall through to the 404 route on both server and client,
      // so `404.html` hydrates when Netlify serves it for one.
      matchFilters: {
        slug: (slug: string) => import.meta.env.POST_SLUGS.includes(slug),
      },
      component: lazy(() => import('./routes/post'), { export: 'PostPage' }),
      preload: ({ params, intent }) => {
        // On initial load, the post is already in the server-rendered HTML.
        if (intent !== 'initial') {
          // Starts loading the post's HTML alongside the page's code. Ignore
          // rejections here; the page surfaces errors if the post is opened.
          getPost(params.slug).catch(() => {});
        }
      },
    }),
    { path: '*404', component: NotFound },
  ],
  preloadLinks: intentPreload(),
  // Only anchors marked `link` navigate client-side, so links to files like
  // `/rss.xml` and in-page links in posts behave natively.
  explicitLinks: true,
  transformUrl: normalizePathname,
});

export const { paths } = Router;

/**
 * Static hosts collapse repeated slashes and decode escapes like `%70`
 * before finding the file to serve, so the router has to match the same way
 * for the page to hydrate.
 */
function normalizePathname(pathname: string) {
  return pathname
    .replace(/\/{2,}/g, '/')
    .replace(/%([0-9a-f]{2})/gi, (escape, hex: string) => {
      const char = String.fromCharCode(parseInt(hex, 16));
      // Only unreserved characters, so escapes like `%2F` don't split a path
      // segment.
      return /[\w.~-]/.test(char) ? char : escape;
    });
}
