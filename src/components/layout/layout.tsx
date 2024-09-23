import { A, useLocation } from '@solidjs/router';
import styles from './layout.module.css';
import { ThemePicker } from './theme-picker';
import { JSX } from 'solid-js';

const Title = () => (
  <A href="/" class={styles.link}>
    Max Burson
  </A>
);

export interface LayoutProps {
  mainProps?: JSX.HTMLElementTags['main'];
  children?: JSX.Element;
}

export const Layout = ({ children, mainProps }: LayoutProps) => {
  const location = useLocation();

  return (
    <div class={styles.layout}>
      <header>
        {location.pathname === '/' ? (
          <h1>
            <Title />
          </h1>
        ) : (
          <h3>
            <Title />
          </h3>
        )}
      </header>
      <main {...mainProps}>{children}</main>
      <footer class={styles.footer}>
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
