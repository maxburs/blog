import React from 'react';
import { Link, graphql } from 'gatsby';

import { Bio } from '../components/bio';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

import style from './blog-post.module.css';

interface Props {
  data: any;
  pageContext: {
    previous: any;
    next: any;
  };
  location: Location;
}

const BlogPostTemplate: React.FC<Props> = (props) => {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1 className={style.title}>{post.frontmatter.title}</h1>
      <p className={style.date}>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr className={style.postEndHr} />
      <Bio />

      <ul className={style.nav}>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
