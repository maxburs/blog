'use server';

import remarkPrismjs from 'gatsby-remark-prismjs';
import remark from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(() => (tree) => {
      remarkPrismjs({ markdownAST: tree });
    })
    .process(markdown);
  return result.toString();
}
