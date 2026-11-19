import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/solid-router';
import type { JSX } from '@solidjs/web';

import * as constants from '../../constants';
import { NotFound } from '../not-found';
import merriweather400 from '../../fonts/merriweather/merriweather-latin-400.woff2?url';
import montserrat700 from '../../fonts/montserrat/montserrat-latin-700.woff2?url';

import '../reset.css';
import '../fonts.css';
import '../global.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: constants.title },
      { name: 'description', content: constants.description },
      { name: 'author', content: constants.author.name },
      {
        name: 'keywords',
        content: 'blog, typescript, react, javascript, programming',
      },
    ],
    links: [
      ...[merriweather400, montserrat700].map(
        (href) =>
          ({
            rel: 'preload',
            href,
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
          }) as const,
      ),
      { rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' },
      { rel: 'icon', type: 'image/png', href: '/favicon/favicon.ico' },
    ],
    scripts: [
      {
        // Runs before first paint so the saved theme doesn't flash in.
        children:
          "document.documentElement.dataset.theme = localStorage.getItem('theme') || 'auto';",
      },
    ],
  }),
  shellComponent: RootDocument,
  component: Outlet,
  notFoundComponent: NotFound,
});

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <HeadContent />
      </head>
      <body>
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
