import remarkPrismjs from 'gatsby-remark-prismjs';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .use(() => (tree) => {
      remarkPrismjs({ markdownAST: tree });
    })
    .process(markdown);
  return result.toString();
}
