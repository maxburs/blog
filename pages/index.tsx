import Head from 'next/head';
import Link from 'next/link';
import { Bio } from '../components/bio';

import { Layout } from '../components/layout';
import { getAllPosts } from '../lib/api';
import { IPost } from '../types/post';

import style from './index.module.css';

interface Props {
  posts: IPost[];
}

const Index: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Layout>
        <Bio />
        {posts.map((post) => {
          return (
            <div key={post.slug} className={style.post}>
              <h3>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </h3>
              <small>{post.date}</small>
              <p>{post.excerpt}</p>
            </div>
          );
        })}
      </Layout>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug', 'excerpt']);

  return { props: { posts } };
}
