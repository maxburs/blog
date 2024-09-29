import { Title } from '@solidjs/meta';
import { HttpStatusCode } from '@solidjs/start';

import { Layout } from '../components/layout/layout';
import styles from './404.module.css';

export function NotFound() {
  return (
    <Layout mainProps={{ class: styles.main }}>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>404: Not Found</h1>
    </Layout>
  );
}

export default NotFound;
