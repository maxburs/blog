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
    <Layout root mainProps={{ className: styles.main }}>
      <div className={styles.bio}>
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
          <strong>{constants.author.name}</strong> writes about web development
          and TypeScript
        </p>
      </div>

      {posts.map((post) => (
        <div key={post.slug} className={styles.post}>
          <h3>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>
          <small>
            <DateFormatter dateString={post.date} />
          </small>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </Layout>
  );
}
