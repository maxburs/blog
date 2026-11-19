import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';

export interface PrerenderPage {
  /** URL path, such as `/posts/foo`. */
  path: string;
  /** Status the page must render with, or the build fails. Defaults to 200. */
  status?: number;
}

/**
 * Prerenders each page through the built server handler into the client
 * output, after `vite build` has built both environments. Solid's Vite plugin
 * only prerenders a single shell.
 *
 * Writes `/` to `index.html` and `/foo/bar` to `foo/bar.html`.
 */
export function prerenderPlugin(getPages: () => PrerenderPage[]): Plugin {
  return {
    name: 'blog:prerender',
    apply: 'build',
    buildApp: {
      order: 'post',
      async handler(builder) {
        const { client, ssr } = builder.environments;
        // When a post-order `buildApp` hook like this one exists, Solid's Vite
        // plugin builds only `client` and leaves the other environments to it,
        // so the server bundle is built here.
        for (const environment of [client, ssr]) {
          if (!environment.isBuilt) {
            await builder.build(environment);
          }
        }

        const root = builder.config.root;
        const clientDir = path.resolve(root, client.config.build.outDir);
        const serverEntry = path.resolve(
          root,
          ssr.config.build.outDir,
          'server.js',
        );
        const { handleRequest } = await import(pathToFileURL(serverEntry).href);

        for (const page of getPages()) {
          const response: Response = await handleRequest(
            new Request(new URL(page.path, 'http://localhost')),
            // Wait for async content instead of streaming it in later.
            { renderMode: 'async' },
          );
          const expected = page.status ?? 200;
          if (response.status !== expected) {
            throw new Error(
              `Prerendering ${page.path} returned ${response.status}, expected ${expected}`,
            );
          }

          const file = path.join(
            clientDir,
            page.path === '/' ? 'index.html' : `${page.path}.html`,
          );
          await fs.mkdir(path.dirname(file), { recursive: true });
          await fs.writeFile(file, await response.text());
          builder.config.logger.info(
            `prerendered ${path.relative(root, file)}`,
          );
        }
      },
    },
  };
}
