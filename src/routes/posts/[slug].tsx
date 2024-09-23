import { A, RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { Accessor, createResource, Match, Show, Switch } from 'solid-js';
import { Link, Meta, Title } from '@solidjs/meta';

import constants from '../../../constants.json';
import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdown-to-html';
import type { IPost } from '../../types';
import { DateFormatter } from '../../components/date-formatter';

import styles from './posts.module.scss';
import 'prismjs/themes/prism-okaidia.css';
import NotFound from '../[...404]';

interface PostProps {
  data: Accessor<PostData>;
}

function Post(props: PostProps) {
  const post = () => props.data().post;

  return (
    <>
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
        <li>
          <Show when={props.data().lastPost}>
            {(post) => (
              <A href={`/posts/${post().slug}`} rel="prev">
                ← {post().title}
              </A>
            )}
          </Show>
        </li>
        <li>
          <Show when={props.data().nextPost}>
            {(post) => (
              <a href={`/posts/${post().slug}`} rel="next">
                {post().title} →
              </a>
            )}
          </Show>
        </li>
      </ul>
    </>
  );
}

interface PostData {
  kind: 'success';
  post: IPost;
  nextPost: null | Pick<IPost, 'slug' | 'title'>;
  lastPost: null | Pick<IPost, 'slug' | 'title'>;
}

type PostRouteData = PostData | { kind: '404' };

async function getPostData(slug: string): Promise<PostRouteData> {
  'use server';

  const post = getPostBySlug(slug);

  if (!post) {
    return { kind: '404' };
  }

  const content = await markdownToHtml(post.content);

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug == post.slug);
  if (index === -1) {
    throw new Error();
  }
  const lastPost = allPosts[index - 1] ?? null;
  const nextPost = allPosts[index + 1] ?? null;

  return {
    kind: 'success',
    post: { ...post, content },
    lastPost: lastPost && { slug: lastPost.slug, title: lastPost.title },
    nextPost: nextPost && { slug: nextPost.slug, title: nextPost.title },
  };
}

export const route: RouteDefinition = {
  load: async ({ params }) => getPostData(params.slug),
};

export default function PostRoute(props: RouteSectionProps) {
  const [getRouteData] = createResource(() => getPostData(props.params.slug));

  return (
    <Layout mainProps={{ class: styles.main }}>
      <Switch>
        <Match
          when={(() => {
            const data = getRouteData();
            return data?.kind === 'success' ? data : undefined;
          })()}
        >
          {(routeData) => <Post data={routeData} />}
        </Match>
        <Match when={getRouteData()?.kind === '404'}>
          <NotFound />
        </Match>
      </Switch>
    </Layout>
  );
}
