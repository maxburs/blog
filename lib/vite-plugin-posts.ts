import path from 'node:path';
import { normalizePath, type Plugin } from 'vite';

import { getPostByFileName, postsDirectory } from './api.ts';
import { markdownToHtml } from './markdownToHtml.ts';
import type { PostSummary } from '../types';

const postSummaryQuery = 'post-summary';
const postHtmlQuery = 'post-html';

/**
 * Compiles posts in `_posts/` into JS modules, so the site needs no server.
 * Import a post with `?post-summary` for its front matter, or `?post-html`
 * for its rendered body. They're separate modules so pages listing posts
 * don't bundle every post's body.
 */
export function postsPlugin(): Plugin {
  // Vite module IDs use forward slashes, even on Windows.
  const directory = normalizePath(postsDirectory);

  return {
    name: 'blog:posts',
    enforce: 'pre',
    async load(id) {
      const [file, query] = id.split('?');
      if (
        path.dirname(file) !== directory ||
        (query !== postSummaryQuery && query !== postHtmlQuery)
      ) {
        return;
      }

      const post = getPostByFileName(path.basename(file));
      if (post === undefined) {
        this.error(`Post not found: ${file}`);
      }

      if (query === postSummaryQuery) {
        const { content: _, ...summary } = post;
        return `export default ${JSON.stringify(summary satisfies PostSummary)};`;
      }
      return `export default ${JSON.stringify(await markdownToHtml(post.content))};`;
    },
  };
}
