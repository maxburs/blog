import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

import * as constants from '../../constants';

import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts, getPostSlugs } from '../../lib/api';
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

const Post = ({ post, lastPost, nextPost }: Props) => (
  <Layout mainProps={{ className: styles.main }}>
    <Head>
      <link rel="canonical" href={`https://maxburson.com/posts/${post.slug}`} />
    </Head>
    <Head key="title">
      <title>{`${constants.title} - ${post.title}`}</title>
    </Head>
    <Head key="keywords">
      <meta name="keywords" content={post.tags} />
    </Head>
    <Head key="description">
      <meta name="description" content={post.excerpt} />
    </Head>
    <article className={styles.article}>
      <h1 className={styles.title}>{post.title}</h1>
      <DateFormatter className={styles.date} dateString={post.date} />
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
    <ul className={styles.nav}>
      <li>
        {lastPost && (
          <Link href={`/posts/${lastPost.slug}`} rel="prev">
            ←{lastPost.title}
          </Link>
        )}
      </li>
      <li>
        {nextPost && (
          <Link href={`/posts/${nextPost.slug}`} rel="prev">
            {nextPost.title}→
          </Link>
        )}
      </li>
    </ul>
  </Layout>
);

export default Post;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context,
) => {
  if (!context.params) {
    return { notFound: true };
  }
  const post = getPostBySlug(context.params.slug);
  const content = await markdownToHtml(post.content);

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug == post.slug);
  if (index === -1) {
    throw new Error();
  }
  const lastPost = allPosts[index - 1] ?? null;
  const nextPost = allPosts[index + 1] ?? null;

  return {
    props: {
      post: { ...post, content },
      lastPost: lastPost && { slug: lastPost.slug, title: lastPost.title },
      nextPost: nextPost && { slug: nextPost.slug, title: nextPost.title },
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = getPostSlugs();

  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
