import Head from 'next/head';

export const Meta: React.FC = () => (
  <>
    <Head>
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="icon" type="image/png" href="/favicon/favicon.ico" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
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
      <title>Max's Blog</title>
      <meta name="description" content="Max writes about code" />
    </Head>
    <Head key="keywords">
      <meta
        name="keywords"
        content="blog, typescript, react, javascript, programming"
      />
    </Head>
  </>
);
