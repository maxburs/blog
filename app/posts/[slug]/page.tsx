import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import * as constants from '../../../constants';
import { Layout } from '../../../components/layout/layout';
import { getPostBySlug, getPostSlugs } from '../../../lib/api';
import { markdownToHtml } from '../../../lib/markdownToHtml';
import type { IPost } from '../../../types';
import { DateFormatter } from '../../../components/date-formatter';

import styles from './page.module.css';

// https://github.com/PrismJS/prism-themes
import './code-dark.scss';
import './code-light.css';

// https://github.com/vercel/next.js/issues/56253
// export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

async function getPost(slug: string): Promise<IPost> {
  const post = getPostBySlug(slug);
  if (!post) {
    throw notFound();
  }
  const content = await markdownToHtml(post.content);

  return { ...post, content };
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
  const post = await getPost(params.slug);

  return (
    <Layout mainProps={{ className: styles.main }} className={styles.layout}>
      <article className={styles.article}>
        <header>
          <h1 className={styles.title}>{post.title}</h1>
          <DateFormatter className={styles.date} dateString={post.date} />
        </header>
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <Link className={styles.allPostsLink} href="/">
        ← All posts
      </Link>
    </Layout>
  );
}
