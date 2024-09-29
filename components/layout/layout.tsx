import React from 'react';
import Link from 'next/link';

import { ThemePicker } from './theme-picker';
import styles from './layout.module.css';

export interface LayoutProps {
  root?: boolean;
  mainProps?: React.HTMLProps<HTMLElement>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  mainProps,
  root,
}) => {
  const title = (
    <Link href="/" className={styles.link}>
      Max Burson
    </Link>
  );

  return (
    <div className={styles.layout}>
      <header>{root ? <h1>{title}</h1> : <h3>{title} </h3>}</header>
      <main {...mainProps}>{children}</main>
      <footer className={styles.footer}>
        <span>
          © {new Date().toLocaleDateString(undefined, { year: 'numeric' })} /{' '}
          <a href="https://www.github.com/maxburs">GitHub</a> /{' '}
          <a rel="alternate" type="application/rss+xml" href="/rss.xml">
            RSS
          </a>
        </span>
        <ThemePicker />
      </footer>
    </div>
  );
};
