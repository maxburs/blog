import React from 'react';
import Link from 'next/link';

import { ThemePicker } from './theme-picker';
import styles from './layout.module.css';
import * as constants from '../../constants';

export interface LayoutProps {
  header?: React.ReactNode;
  mainProps?: React.HTMLProps<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  mainProps,
  header,
  className,
}) => {
  return (
    <div
      className={className ? `${styles.layout} ${className}` : styles.layout}
    >
      {header ?? (
        <header>
          <Link className={styles.headerLink} href="/">
            {constants.title}
          </Link>
        </header>
      )}

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
