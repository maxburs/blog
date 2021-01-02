import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import { Layout } from '../../components/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { IPost } from '../../types/post';
import { DateFormatter } from '../../components/date-formatter';

import style from './style.module.css';

interface Props {
  post: IPost;
  morePosts: IPost[];
}

const Post = ({ post, morePosts }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <h1 className={style.title}>{post.title}</h1>
            <p className={style.date}>
              <DateFormatter dateString={post.date} />
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </Layout>
  );
};

export default Post;

interface Params {
  params: { slug: string };
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content);

  return { props: { post: { ...post, content } } };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((posts) => ({
      params: { slug: posts.slug },
    })),
    fallback: false,
  };
}
