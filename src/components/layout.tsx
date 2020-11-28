import React from 'react';
import { Link } from 'gatsby';
import { rhythm, scale } from '../utils/typography';

import './layout.module.css';

const rootPath = `${__PATH_PREFIX__}/`;

interface LayoutProps {
  location: Location;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, location, title }) => {
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.2),
          marginBottom: rhythm(1.2),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );
  }

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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

export default Layout;
