import { Meta } from '@solidjs/meta';
import { getRequestEvent, httpStatus, isServer } from '@solidjs/web';

import { Layout } from '../components/layout/layout';
import styles from './not-found.module.css';

export function NotFound() {
  // Keep status 200 for `/404` itself so prerendering it to `404.html` doesn't
  // fail the build, and return 404 for paths that don't exist.
  const event = isServer ? getRequestEvent() : undefined;
  if (event !== undefined && new URL(event.request.url).pathname !== '/404') {
    httpStatus(404);
  }

  return (
    <Layout mainClass={styles.main}>
      <Meta name="robots" content="noindex" />
      <h1>404: Not Found</h1>
    </Layout>
  );
}
