import handler, { createServerEntry } from '@tanstack/solid-start/server-entry';

/**
 * The site is deployed as static files, so this server only runs while
 * prerendering. Prerendering rejects non-2xx responses, so `/404` is answered
 * with a 200 to let it be written to `404.html`, which Netlify serves for
 * unknown paths.
 */
export default createServerEntry({
  async fetch(request: Request) {
    const response = await handler.fetch(request);
    const { pathname } = new URL(request.url);
    if (response.status === 404 && ['/404', '/404/'].includes(pathname)) {
      return new Response(response.body, {
        status: 200,
        headers: response.headers,
      });
    }
    return response;
  },
});
