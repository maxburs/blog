import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Bio: React.FC = () => (
  <StaticQuery
    query={bioQuery}
    render={(data) => {
      const { author } = data.site.siteMetadata;
      return (
        <div
          style={{
            display: 'flex',
            marginBottom: rhythm(2.5),
          }}
        >
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 50,
              borderRadius: '100%',
            }}
            imgStyle={{
              borderRadius: '50%',
            }}
            loading="eager"
            fadeIn={false}
          />
          <p>
            <strong>{author}</strong> writes about web developement and
            TypeScript.
          </p>
        </div>
      );
    }}
  />
);

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
