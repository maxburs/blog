import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './layout.module.css';
import { ThemePicker } from './theme-picker';
import constants from '../../constants.json';

const Meta: React.FC = () => (
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

const title = (
  <Link href="/">
    <a className={styles.link}>Max's Blog</a>
  </Link>
);

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Meta />
      <header>
        {router.pathname === '/' ? (
          <h1>{title}</h1>
        ) : (
          <h3 style={{ marginTop: 0 }}>{title} </h3>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} /{' '}
          <a href="https://www.github.com/maxburs">github</a> /{' '}
          <a rel="alternate" type="application/rss+xml" href="/rss.xml">
            rss
          </a>
        </span>
        <ThemePicker />
      </footer>
    </>
  );
};
