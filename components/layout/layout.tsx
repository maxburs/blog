import type { JSX } from '@solidjs/web';

import { ThemePicker } from './theme-picker';
import styles from './layout.module.css';
import * as constants from '../../constants';

export interface LayoutProps {
  header?: JSX.Element;
  mainClass?: string;
  children: JSX.Element;
  class?: string;
}

export function Layout(props: LayoutProps) {
  return (
    <div class={[styles.layout, props.class]}>
      {props.header ?? (
        <header>
          <a class={styles.headerLink} href="/" link>
            {constants.title}
          </a>
        </header>
      )}

      <main class={props.mainClass}>{props.children}</main>
      <footer class={styles.footer}>
        <span>
          © {new Date().getFullYear()} •{' '}
          <a href="https://www.github.com/maxburs">GitHub</a> •{' '}
          <a rel="alternate" type="application/rss+xml" href="/rss.xml">
            RSS
          </a>
        </span>
        <ThemePicker />
      </footer>
    </div>
  );
}
