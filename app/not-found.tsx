import { useHead } from '@solidjs/web';

import { Layout } from '../components/layout/layout';
import styles from './not-found.module.css';

export function NotFound() {
  useHead({ tag: 'meta', props: { name: 'robots', content: 'noindex' } });

  return (
    <Layout mainClass={styles.main}>
      <h1>404: Not Found</h1>
    </Layout>
  );
}
