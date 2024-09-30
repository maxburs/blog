import Link from 'next/link';

import { DateFormatter } from '../components/date-formatter';
import { Layout } from '../components/layout/layout';
import { getAllPosts } from '../lib/api';
import * as constants from '../constants';

import styles from './page.module.css';

async function getPageData() {
  return getAllPosts().map((p) => {
    const { content: _, ...rest } = p;
    return rest;
  });
}

export default async function Index() {
  const posts = await getPageData();

  return (
    <Layout
      className={styles.layout}
      header={
        <header>
          <h1>{constants.title}</h1>
          <img
            alt="Picture of the author"
            src="/me/50.jpg"
            srcSet="/me/50.jpg 50w, /me/100.jpg 100w"
            className={styles.avatar}
            width={50}
            height={50}
            sizes="50px"
          />
          <p>
            <strong>{constants.author.name}</strong> writes about web
            development and TypeScript
          </p>
        </header>
      }
    >
      {posts.map((post) => (
        <Link
          href={`/posts/${post.slug}`}
          className={styles.post}
          key={post.slug}
        >
          <h2>{post.title}</h2>
          <DateFormatter dateString={post.date} />
          <p>{post.excerpt}</p>
        </Link>
      ))}
    </Layout>
  );
}
