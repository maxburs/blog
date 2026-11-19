import { Link, createFileRoute } from '@tanstack/solid-router';
import { For } from 'solid-js';

import { DateFormatter } from '../../components/date-formatter';
import { Layout } from '../../components/layout/layout';
import * as constants from '../../constants';
import { posts } from '../posts';

import styles from '../index.module.css';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Layout
      class={styles.layout}
      header={
        <header>
          <h1>{constants.title}</h1>
          <img
            alt="Picture of the author"
            src="/me/50.jpg"
            srcset="/me/50.jpg 50w, /me/100.jpg 100w"
            class={styles.avatar}
            width={50}
            height={50}
            sizes="50px"
          />
          <p>Writing mostly on software development</p>
        </header>
      }
    >
      <For each={posts}>
        {(post) => (
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            class={styles.post}
          >
            <h2>{post.title}</h2>
            <DateFormatter dateString={post.date} />
            <p>{post.excerpt}</p>
          </Link>
        )}
      </For>
    </Layout>
  );
}
