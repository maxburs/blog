import Link from 'next/link';

import { Bio } from '../components/bio';
import { DateFormatter } from '../components/date-formatter';
import { Layout } from '../components/layout/layout';
import { getAllPosts } from '../lib/api';
import { IPost } from '../types';

import style from './index.module.css';

interface Props {
  posts: Omit<IPost, 'content'>[];
}

const Index: React.FC<Props> = ({ posts }) => (
  <Layout>
    <Bio />
    {posts.map((post) => (
      <div key={post.slug} className={style.post}>
        <h3>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h3>
        <small>
          <DateFormatter dateString={post.date}>{post.date}</DateFormatter>
        </small>
        <p>{post.excerpt}</p>
      </div>
    ))}
  </Layout>
);

export default Index;

export async function getStaticProps() {
  const posts = getAllPosts().map((p) => {
    const { content: _, ...rest } = p;
    return rest;
  });

  return { props: { posts } };
}
