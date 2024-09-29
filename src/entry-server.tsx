// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

import constants from '../constants.json';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <link rel="icon" type="image/png" href="/favicon/favicon.ico" />
          <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
          <meta name="color-scheme" content="dark light" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="preload"
            href="/fonts/merriweather/merriweather-latin-400.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/merriweather/merriweather-latin-700.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/montserrat/montserrat-latin-700.woff2"
            as="font"
            crossOrigin=""
          />
          <meta name="author" content={constants.author.name} />
          <title>{constants.title}</title>
          <meta name="description" content={constants.description} />
          <meta
            name="keywords"
            content="blog, typescript, react, javascript, programming"
          />
          {assets}
        </head>
        <body>
          <script innerHTML="document.documentElement.dataset.theme = localStorage.getItem('theme') || 'auto';" />
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
