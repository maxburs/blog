import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Meta } from '../meta';

import styles from './layout.module.css';
import { ThemePicker } from './theme-picker';

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
