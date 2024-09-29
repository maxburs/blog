import fs from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import type { IPost } from '../types';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map((s) => s.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): undefined | IPost {
  const fullPath = join(postsDirectory, `${slug}.md`);
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (e) {
    if (e instanceof Error && (e as NodeJS.ErrnoException).code === 'ENOENT') {
      return;
    }
    throw e;
  }
  const { data, content } = matter(fileContents);

  return { ...data, content, slug } as IPost;
}

export function getAllPosts(): IPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug)!)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
