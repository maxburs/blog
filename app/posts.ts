import { prerendered } from '@solidjs/prerender';
import { query } from '@solidjs/router';

import { getAllPosts, getPostBySlug } from '../lib/api';
import { markdownToHtml } from '../lib/markdownToHtml';
import type { PostSummary } from '../types';

// `prerendered()` server functions run during the build. Each call a page
// makes is saved under `dist/client/_static/`, and client-side navigation
// fetches that file instead of calling a server. In dev they run on the dev
// server.

export interface Post extends PostSummary {
  html: string;
}

/** Newest first. */
export const getPosts = query(
  prerendered(async (): Promise<PostSummary[]> => {
    'use server';
    return getAllPosts().map((post) => {
      const { content: _, ...summary } = post;
      return summary;
    });
  }),
  'posts',
);

export const getPost = query(
  prerendered(async (slug: string): Promise<Post | undefined> => {
    'use server';
    const post = getPostBySlug(slug);
    if (post === undefined) {
      return undefined;
    }
    const { content, ...summary } = post;
    return { ...summary, html: await markdownToHtml(content) };
  }),
  'post',
);
