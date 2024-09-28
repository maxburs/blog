import { A, RouteDefinition } from '@solidjs/router';
import { createResource, For } from 'solid-js';

import { DateFormatter } from '~/components/date-formatter';
import { Layout } from '~/components/layout/layout';
import { getAllPosts } from '~/lib/api';

import styles from './index.module.css';

const author = 'Maxwell Burson';

async function getMainRouteData() {
  'use server';

  return getAllPosts().map((p) => {
    const { content: _, ...rest } = p;
    return rest;
  });
}

export const route: RouteDefinition = {
  load: getMainRouteData,
};

export default function Home() {
  const [getPosts] = createResource(getMainRouteData);

  return (
    <Layout mainProps={{ class: styles.main }}>
      <div class={styles.bio}>
        <img
          alt="Picture of the author"
          src="/me/50.jpg"
          srcSet="/me/50.jpg 50w, /me/100.jpg 100w"
          class={styles.avatar}
          width={50}
          height={50}
          sizes="50px"
        />
        <p>
          <strong>{author}</strong> writes about web development and TypeScript
        </p>
      </div>
      <For each={getPosts()}>
        {(post) => (
          <div class={styles.post}>
            <h3>
              <A href={`/posts/${post.slug}`}>{post.title}</A>
            </h3>
            <small>
              <DateFormatter dateString={post.date} />
            </small>
            <p>{post.excerpt}</p>
          </div>
        )}
      </For>
    </Layout>
  );
}
