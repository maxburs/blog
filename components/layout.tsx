import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Meta } from './meta';

import styles from './layout.module.css';

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
      <div className={styles.layout}>
        <header>
          {router.pathname === '/' ? (
            <h1>{title}</h1>
          ) : (
            <h3 style={{ marginTop: 0 }}>{title} </h3>
          )}
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} •{' '}
          <a href="https://www.github.com/maxburs">github</a> •{' '}
          <a href="https://www.twitter.com/maxburs">twitter</a>
        </footer>
      </div>
    </>
  );
};
