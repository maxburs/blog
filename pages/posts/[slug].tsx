import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { IPost } from '../../types';
import { DateFormatter } from '../../components/date-formatter';

import style from './style.module.css';

interface Props {
  post: IPost;
  nextPost: null | Pick<IPost, 'slug' | 'title'>;
  lastPost: null | Pick<IPost, 'slug' | 'title'>;
}

const Post = ({ post, lastPost, nextPost }: Props) => (
  <Layout>
    <Head key="keywords">
      <meta name="keywords" content={post.tags} />
    </Head>
    <article>
      <h1 className={style.title}>{post.title}</h1>
      <DateFormatter className={style.date} dateString={post.date} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
  const post = (getPostBySlug(context.params?.slug, [
    'title',
    'date',
    'slug',
    'content',
    'tags',
  ]) as unknown) as IPost;
  const content = await markdownToHtml(post.content);

  const allPosts = (getAllPosts([
    'title',
    'date',
    'slug',
  ]) as unknown) as IPost[];
  const index = allPosts.findIndex((p) => p.slug == post.slug);
  if (index === -1) {
    throw new Error();
  }
  const lastPost = allPosts[index - 1] ?? null;
  const nextPost = allPosts[index + 1] ?? null;

  return { props: { post: { ...post, content }, lastPost, nextPost } };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((posts) => ({ params: { slug: posts.slug } })),
    fallback: false,
  };
};
