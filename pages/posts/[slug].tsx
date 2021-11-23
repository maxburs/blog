import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

import constants from '../../constants.json';

import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts, getPostSlugs } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { IPost } from '../../types';
import { DateFormatter } from '../../components/date-formatter';

import style from './style.module.scss';
import 'prismjs/themes/prism-okaidia.css';

interface Props {
  post: IPost;
  nextPost: null | Pick<IPost, 'slug' | 'title'>;
  lastPost: null | Pick<IPost, 'slug' | 'title'>;
}

const Post = ({ post, lastPost, nextPost }: Props) => (
  <Layout>
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
    <article>
      <h1 className={style.title}>{post.title}</h1>
      <DateFormatter className={style.date} dateString={post.date} />
      <div
        className={style.markdown}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
    <ul className={style.nav}>
      <li>
        {lastPost && (
          <Link href={`/posts/${lastPost.slug}`}>
            <a rel="prev">← {lastPost.title}</a>
          </Link>
        )}
      </li>
      <li>
        {nextPost && (
          <Link href={`/posts/${nextPost.slug}`}>
            <a rel="prev">{nextPost.title} →</a>
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
