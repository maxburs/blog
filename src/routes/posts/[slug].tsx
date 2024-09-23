import { A, RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { createResource, Show } from 'solid-js';
import { Link, Meta, Title } from '@solidjs/meta';

import constants from '../../../constants.json';
import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdown-to-html';
import type { IPost } from '../../types';
import { DateFormatter } from '../../components/date-formatter';

import styles from './posts.module.scss';
import 'prismjs/themes/prism-okaidia.css';

interface Props {
  post: IPost;
  nextPost: null | Pick<IPost, 'slug' | 'title'>;
  lastPost: null | Pick<IPost, 'slug' | 'title'>;
}

const getPostData = async (slug: string): Promise<Props> => {
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

export const route: RouteDefinition = {
  load: async ({ params }) => getPostData(params.slug),
};

export default function Post(props: RouteSectionProps) {
  const [getData] = createResource(() => getPostData(props.params.slug));

  return (
    <Layout mainProps={{ class: styles.main }}>
      <Show when={getData()}>
        {(props) => (
          <>
            <Link
              rel="canonical"
              href={`https://maxburson.com/posts/${props().post.slug}`}
            />
            <Title>{`${constants.title} - ${props().post.title}`}</Title>
            <Meta name="keywords" content={props().post.tags} />
            <Meta name="description" content={props().post.excerpt} />
            <article class={styles.article}>
              <h1 class={styles.title}>{props().post.title}</h1>
              <DateFormatter
                className={styles.date}
                dateString={props().post.date}
              />
              <div class={styles.markdown} innerHTML={props().post.content} />
            </article>
            <ul class={styles.nav}>
              <Show when={props().lastPost}>
                {(post) => (
                  <A href={`/posts/${post().slug}`} rel="prev">
                    ← {post().title}
                  </A>
                )}
              </Show>
              <Show when={props().nextPost}>
                {(post) => (
                  <li>
                    <a href={`/posts/${post().slug}`} rel="next">
                      {post().title} →
                    </a>
                  </li>
                )}
              </Show>
            </ul>
          </>
        )}
      </Show>
    </Layout>
  );
}

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (
//   slug: string,
// ) => {
//   const posts = getPostSlugs();

//   return {
//     paths: posts.map((slug) => ({ params: { slug } })),
//     fallback: false,
//   };
// };
