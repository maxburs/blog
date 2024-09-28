import { defineConfig } from '@solidjs/start/config';

// https://docs.solidjs.com/solid-start/reference/entrypoints/app-config

export default defineConfig({
  ssr: true,
  // https://nitro.unjs.io/config
  // https://vinxi.vercel.app/guide/getting-started.html
  server: {
    preset: 'static',
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
