import { Link, createFileRoute, notFound } from '@tanstack/solid-router';

import { DateFormatter } from '../../components/date-formatter';
import { Layout } from '../../components/layout/layout';
import * as constants from '../../constants';
import { getPost } from '../posts';
import sfMonoRegular from '../../fonts/SFMono-Regular.ttf?url';

import styles from '../post.module.css';

// https://github.com/PrismJS/prism-themes
import '../code-dark.scss';
import '../code-light.css';

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = await getPost(params.slug);
    if (post === undefined) {
      throw notFound();
    }
    return post;
  },
  head: ({ loaderData: post }) => {
    if (post === undefined) {
      return {};
    }
    return {
      meta: [
        { title: `${constants.title} - ${post.title}` },
        { name: 'description', content: post.excerpt },
        { name: 'keywords', content: post.tags },
      ],
      links: [
        {
          rel: 'canonical',
          href: `https://maxburson.com/posts/${post.slug}`,
        },
        {
          rel: 'preload',
          href: sfMonoRegular,
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <Layout mainClass={styles.main} class={styles.layout}>
      <article class={styles.article}>
        <header>
          <h1 class={styles.title}>{post().title}</h1>
          <DateFormatter class={styles.date} dateString={post().date} />
        </header>
        {/* oxlint-disable-next-line solid/no-innerhtml -- Compiled at build time from this repo's Markdown. */}
        <div class={styles.markdown} innerHTML={post().html} />
      </article>
      <Link class={styles.allPostsLink} to="/">
        ← All posts
      </Link>
    </Layout>
  );
}
