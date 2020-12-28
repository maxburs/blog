import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

interface Props {
  data: any;
  location: Location;
}

const NotFoundPage: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
