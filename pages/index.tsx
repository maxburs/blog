import Link from 'next/link';

import { DateFormatter } from '../components/date-formatter';
import { Layout } from '../components/layout/layout';
import { getAllPosts } from '../lib/api';
import { IPost } from '../types';

import style from './index.module.css';

const author = 'Maxwell Burson';

interface Props {
  posts: Omit<IPost, 'content'>[];
}

const Index: React.FC<Props> = ({ posts }) => (
  <Layout>
    <div className={style.bio}>
      <img
        alt="Picture of the author"
        src="/me/50.jpg"
        srcSet="/me/50.jpg 50w, /me/100.jpg 100w"
        className={style.avatar}
        width={50}
        height={50}
        sizes="50px"
      />
      <p>
        <strong>{author}</strong> writes about web development and TypeScript
      </p>
    </div>

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
