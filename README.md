Max Burson's blog at [maxburson.com](https://maxburson.com). Built with [Solid 2](https://docs.solidjs.com/) and [Solid Router](https://github.com/solidjs/solid-router), and prerendered to static HTML.

Originally forked off the [next.js typescript blog starter](https://github.com/vercel/next.js/tree/v10.2.0/examples/blog-starter-typescript).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/maxburs/blog)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ba57786d-e795-4bde-b057-9e3b5b1f1c37/deploy-status)](https://app.netlify.com/sites/maxburson/deploys)

## Development

Needs Node 22.12 or newer.

```sh
yarn install
yarn dev        # dev server
yarn build      # generate the RSS/Atom feeds, then prerender every page to dist/client
yarn preview    # serve the production build
yarn typecheck
```

## Posts

Posts are Markdown files in `_posts/`, named `yyyy-mm-dd slug.md`. Each is published at `/posts/slug`. To start a new one:

```sh
node --import @swc-node/register/esm-register scripts/new-post.ts my-new-post
```

## How the build works

- [lib/vite-plugin-posts.ts](lib/vite-plugin-posts.ts) compiles posts into JS modules that pages import, so client-side navigation works without a server.
- Solid's Vite plugin builds a client bundle and a server bundle. [prerender-crawler](https://github.com/solidjs/prerender-crawler/tree/main/packages/crawler) then uses the server bundle to render the home page, the 404 page, every post, and any other page they link to into `dist/client`, which Netlify publishes as static files. The server bundle isn't deployed.
- The build fails if a page doesn't render, or if an `<a>` link points to a missing page or file on the site. Images and other asset URLs aren't checked.

## Coding agents

[AGENTS.md](AGENTS.md) has instructions for coding agents, including Solid's recommended rules for Solid 2.
