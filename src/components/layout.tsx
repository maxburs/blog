import React from 'react';
import { Link } from 'gatsby';

import styles from './layout.module.css';

const rootPath = `${__PATH_PREFIX__}/`;

interface LayoutProps {
  location: Location;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  location,
  title,
}) => {
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link className={styles.link} to="/">
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3 style={{ marginTop: 0 }}>
        <Link className={styles.link} to="/">
          {title}
        </Link>
      </h3>
    );
  }

  return (
    <div className={styles.layout}>
      {header && <header>{header}</header>}
      <main>{children}</main>
      <footer style={{ marginTop: 'auto' }}>
        © {new Date().getFullYear()} •{' '}
        <a href="https://www.github.com/maxburs">github</a> •{' '}
        <a href="https://www.twitter.com/maxburs">twitter</a>
      </footer>
    </div>
  );
};
