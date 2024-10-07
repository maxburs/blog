import fs from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import type { IPost } from '../types';

const postsDirectory = join(process.cwd(), '_posts');

function fileNameToSlug(fileName: string) {
  const res = /^\d{4}-\d\d-\d\d (.+)\.md$/.exec(fileName);
  if (!res) {
    throw new Error(
      `Invalid post name: ${fileName}. Should match 'yyyy-mm-dd title.md'`,
    );
  }
  return res[1];
}

function postsDir() {
  return fs.readdirSync(postsDirectory);
}

function getPostByFileName(fileName: string): undefined | IPost {
  const fullPath = join(postsDirectory, fileName);
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

  return { ...data, content, slug: fileNameToSlug(fileName) } as IPost;
}

export function getPostSlugs() {
  return postsDir().map((s) => fileNameToSlug(s));
}

export function getPostBySlug(slug: string): undefined | IPost {
  for (const fileName of postsDir()) {
    if (fileNameToSlug(fileName) === slug) {
      return getPostByFileName(fileName);
    }
  }
  return;
}

export function getAllPosts(): IPost[] {
  const posts = postsDir()
    .map((fileName) => getPostByFileName(fileName)!)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
