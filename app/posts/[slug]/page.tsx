import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';

import * as constants from '../../../constants';

import { Layout } from '../../../components/layout/layout';
import { getPostBySlug, getAllPosts, getPostSlugs } from '../../../lib/api';
import { markdownToHtml } from '../../../lib/markdownToHtml';
import type { IPost } from '../../../types';
import { DateFormatter } from '../../../components/date-formatter';

import styles from './page.module.scss';
import 'prismjs/themes/prism-okaidia.css';
import { notFound } from 'next/navigation';

// https://github.com/vercel/next.js/issues/56253
// export const dynamicParams = false;

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
  if (!post) {
    throw notFound();
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
    post: { ...post, content },
    lastPost: lastPost && { slug: lastPost.slug, title: lastPost.title },
    nextPost: nextPost && { slug: nextPost.slug, title: nextPost.title },
  };
}

interface RouteProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: RouteProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    throw notFound();
  }

  return {
    title: `${constants.title} - ${post.title}`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `https://maxburson.com/posts/${post.slug}`,
    },
    // openGraph: {}
  };
}

export default async function Post({ params }: RouteProps) {
  const { post, lastPost, nextPost } = await getPageData(params.slug);

  return (
    <Layout mainProps={{ className: styles.main }}>
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
