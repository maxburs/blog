import { Meta } from '@solidjs/meta';
import { httpStatus } from '@solidjs/web';

import { Layout } from '../components/layout/layout';
import styles from './not-found.module.css';

export function NotFound() {
  httpStatus(404);

  return (
    <Layout mainClass={styles.main}>
      <Meta name="robots" content="noindex" />
      <h1>404: Not Found</h1>
    </Layout>
  );
}
