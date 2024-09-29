import Head from 'next/head';
import Link from 'next/link';

import * as constants from '../../../constants';

import { Layout } from '../../../components/layout/layout';
import { getPostBySlug, getAllPosts, getPostSlugs } from '../../../lib/api';
import { markdownToHtml } from '../../../lib/markdownToHtml';
import type { IPost } from '../../../types';
import { DateFormatter } from '../../../components/date-formatter';

import styles from './page.module.scss';
import 'prismjs/themes/prism-okaidia.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

interface PageData {
  post: IPost;
  nextPost: null | Pick<IPost, 'slug' | 'title'>;
  lastPost: null | Pick<IPost, 'slug' | 'title'>;
}

async function getPageData(slug: string): Promise<PageData> {
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
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { post, lastPost, nextPost } = await getPageData(params.slug);

  return (
    <Layout mainProps={{ className: styles.main }}>
      <Head>
        <link
          rel="canonical"
          href={`https://maxburson.com/posts/${post.slug}`}
        />
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
}
