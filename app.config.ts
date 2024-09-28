import { defineConfig } from '@solidjs/start/config';

// https://docs.solidjs.com/solid-start/reference/entrypoints/app-config

export default defineConfig({
  // https://nitro.unjs.io/config
  // https://vinxi.vercel.app/guide/getting-started.html
  server: { preset: 'static' },
});
