declare module 'gatsby-remark-prismjs' {
  import type { Node } from 'unist';

  interface Options {
    classPrefix?: string;
    inlineCodeMarker?: null | string;
    aliases?: Record<string, string>;
    noInlineHighlight: boolean;
    showLineNumbers?: boolean;
    showInvisibles?: boolean;
    languageExtensions: unknown[];
    prompt?: {
      user: string;
      host: string;
      global: boolean;
    };
    escapeEntities: Record<string, string>;
  }

  declare function transform(ast: { markdownAST: Node }, options?: Options);
  export default transform;
}
