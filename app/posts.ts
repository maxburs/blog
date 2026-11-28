import type { PostSummary } from '../types';

// Compiled by lib/vite-plugin-posts.ts.
const summaries = import.meta.glob<PostSummary>('../_posts/*.md', {
  query: '?post-summary',
  import: 'default',
  eager: true,
});
const htmlLoaders = import.meta.glob<string>('../_posts/*.md', {
  query: '?post-html',
  import: 'default',
});

export interface Post extends PostSummary {
  html: string;
}

/** Newest first. */
export const posts: PostSummary[] = Object.values(summaries).sort((a, b) =>
  a.date > b.date ? -1 : 1,
);

export async function getPost(slug: string): Promise<Post | undefined> {
  for (const [file, summary] of Object.entries(summaries)) {
    if (summary.slug === slug) {
      return { ...summary, html: await htmlLoaders[file]() };
    }
  }
  return undefined;
}
