import Head from 'next/head';

import constants from '../constants.json';

export const Meta: React.FC = () => (
  <>
    <Head>
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
    </Head>
    <Head key="title">
      <title>{constants.title}</title>
    </Head>
    <Head key="description">
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
