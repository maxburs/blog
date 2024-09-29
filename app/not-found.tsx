import { Layout } from '../components/layout/layout';
import styles from './not-found.module.css';

const FileNotFound: React.FC = () => (
  <Layout mainProps={{ className: styles.main }}>
    <h1>404: Not Found</h1>
  </Layout>
);

export default FileNotFound;
