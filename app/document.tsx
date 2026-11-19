import { HydrationScript, type JSX } from '@solidjs/web';

import merriweather400 from '../fonts/merriweather/merriweather-latin-400.woff2?url';
import montserrat700 from '../fonts/montserrat/montserrat-latin-700.woff2?url';

import './reset.css';
import './fonts.css';
import './global.css';

// Solid's Vite plugin requires a default export; it renders this around the
// app on the server and client.
export default function Document(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Maxwell Burson" />
        <link
          rel="preload"
          href={merriweather400}
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link
          rel="preload"
          href={montserrat700}
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        <link rel="icon" type="image/png" href="/favicon/favicon.ico" />
        {/* Runs before first paint, so the page doesn't flash the default
            theme before the saved one. */}
        <script innerHTML="document.documentElement.dataset.theme = localStorage.getItem('theme') || 'auto';" />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
