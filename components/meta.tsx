import Head from 'next/head';

import constants from '../constants.json';

export const Meta: React.FC = () => (
  <>
    <Head>
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="icon" type="image/png" href="/favicon/favicon.ico" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
      <meta name="color-scheme" content="dark light" />
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
      <title>{constants.title}</title>
      <meta name="author" content={constants.author.name} />
      <meta name="description" content={constants.description} />
    </Head>
    <Head key="keywords">
      <meta
        name="keywords"
        content="blog, typescript, react, javascript, programming"
      />
    </Head>
  </>
);
