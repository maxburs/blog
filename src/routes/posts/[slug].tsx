import { A, useParams } from '@solidjs/router';
import { createResource, Show } from 'solid-js';
import { Link, Meta, Title } from '@solidjs/meta';

import constants from '../../../constants.json';
import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';
import type { IPost } from '../../types';
import { DateFormatter } from '../../components/date-formatter';

import styles from './posts.module.scss';
import 'prismjs/themes/prism-okaidia.css';

interface Props {
  post: IPost;
  nextPost: null | Pick<IPost, 'slug' | 'title'>;
  lastPost: null | Pick<IPost, 'slug' | 'title'>;
}

export default function Post() {
  const params = useParams();

  const [getProps] = createResource(() => getStaticProps(params.slug));

  const post = () => getProps()!.post;

  return (
    <Layout mainProps={{ class: styles.main }}>
      <Link
        rel="canonical"
        href={`https://maxburson.com/posts/${post().slug}`}
      />
      <Title>{`${constants.title} - ${post().title}`}</Title>
      <Meta name="keywords" content={post().tags} />
      <Meta name="description" content={post().excerpt} />
      <article class={styles.article}>
        <h1 class={styles.title}>{post().title}</h1>
        <DateFormatter className={styles.date} dateString={post().date} />
        <div class={styles.markdown} innerHTML={post().content} />
      </article>
      <ul class={styles.nav}>
        <Show when={getProps()?.lastPost}>
          {(post) => (
            <A href={`/posts/${post().slug}`} rel="prev">
              ← {post().title}
            </A>
          )}
        </Show>
        <Show when={getProps()?.nextPost}>
          {(post) => (
            <li>
              <a href={`/posts/${post().slug}`} rel="next">
                {post().title} →
              </a>
            </li>
          )}
        </Show>
      </ul>
    </Layout>
  );
}

export const getStaticProps = async (slug: string): Promise<Props> => {
  'use server';
  const post = getPostBySlug(slug);
  const content = await markdownToHtml(post.content);

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug == post.slug);
  if (index === -1) {
    throw new Error();
  }
  const lastPost = allPosts[index - 1] ?? null;
  const nextPost = allPosts[index + 1] ?? null;

  return {
    post: { ...post, content },
    lastPost: lastPost && { slug: lastPost.slug, title: lastPost.title },
    nextPost: nextPost && { slug: nextPost.slug, title: nextPost.title },
  };
};

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (
//   slug: string,
// ) => {
//   const posts = getPostSlugs();

//   return {
//     paths: posts.map((slug) => ({ params: { slug } })),
//     fallback: false,
//   };
// };
