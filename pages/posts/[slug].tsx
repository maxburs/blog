import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import { Layout } from '../../components/layout/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { IPost } from '../../types';
import { DateFormatter } from '../../components/date-formatter';

import style from './style.module.css';

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head key="keywords">
        <meta name="keywords" content={post.tags} />
      </Head>
      <article>
        <h1 className={style.title}>{post.title}</h1>
        <p className={style.date}>
          <DateFormatter dateString={post.date} />
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
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
    'content',
    'tags',
  ]);
  const content = await markdownToHtml(post.content);

  return { props: { post: { ...post, content } } };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((posts) => ({ params: { slug: posts.slug } })),
    fallback: false,
  };
}
