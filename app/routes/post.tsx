import { Link, Meta, Title } from '@solidjs/meta';
import type { RouteProps } from '@solidjs/router';
import { createMemo } from 'solid-js';

import { DateFormatter } from '../../components/date-formatter';
import { Layout } from '../../components/layout/layout';
import * as constants from '../../constants';
import { getPost } from '../posts';
import sfMonoRegular from '../../fonts/SFMono-Regular.ttf?url';

import styles from '../post.module.css';

// https://github.com/PrismJS/prism-themes
import '../code-dark.scss';
import '../code-light.css';

// Typed with the route pattern: `typeof Router.paths.posts` would be circular,
// since the router imports this file.
export function PostPage(props: RouteProps<'/posts/:slug'>) {
  const post = createMemo(async () => {
    // Solid doesn't track reads after the first `await`, so read the slug
    // once here.
    const slug = props.params.slug;
    const post = await getPost(slug);
    // Unreachable: the route's match filter rejects unknown slugs.
    if (post === undefined) {
      throw new Error(`Post not found: ${slug}`);
    }
    return post;
  });

  return (
    <Layout mainClass={styles.main} class={styles.layout}>
      <Title>{`${constants.title} - ${post().title}`}</Title>
      <Meta name="description" content={post().excerpt} />
      <Meta name="keywords" content={post().tags} />
      <Link
        rel="canonical"
        href={`https://maxburson.com/posts/${post().slug}`}
      />
      <Link
        rel="preload"
        href={sfMonoRegular}
        as="font"
        type="font/ttf"
        crossorigin="anonymous"
      />
      <article class={styles.article}>
        <header>
          <h1 class={styles.title}>{post().title}</h1>
          <DateFormatter class={styles.date} dateString={post().date} />
        </header>
        {/* oxlint-disable-next-line solid/no-innerhtml -- Compiled at build time from this repo's Markdown. */}
        <div class={styles.markdown} innerHTML={post().html} />
      </article>
      <a class={styles.allPostsLink} href="/" link>
        ← All posts
      </a>
    </Layout>
  );
}
