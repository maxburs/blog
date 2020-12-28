import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import style from './bio.module.css';

export const Bio: React.FC = () => (
  <StaticQuery
    query={bioQuery}
    render={(data) => {
      const { author } = data.site.siteMetadata;
      return (
        <div className={style.bio}>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            className={style.avatar}
            loading="eager"
            fadeIn={false}
          />
          <p>
            <strong>{author}</strong> writes about web development and
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
