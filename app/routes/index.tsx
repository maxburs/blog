import { createMemo, For } from 'solid-js';

import { DateFormatter } from '../../components/date-formatter';
import { Layout } from '../../components/layout/layout';
import * as constants from '../../constants';
import { getPosts } from '../posts';
import { paths } from '../router';

import styles from '../index.module.css';

export function Index() {
  const posts = createMemo(() => getPosts());

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
      <For each={posts()}>
        {(post) => (
          <a href={paths.posts(post.slug)} class={styles.post} link>
            <h2>{post.title}</h2>
            <DateFormatter dateString={post.date} />
            <p>{post.excerpt}</p>
          </a>
        )}
      </For>
    </Layout>
  );
}
