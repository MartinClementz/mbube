/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import WhiteBox from '../components/WhiteBox';
import SEO from '../components/seo';

export default function Template({ data: { markdownRemark } }) {
  const {
    frontmatter: { title, description, image },
    html,
  } = markdownRemark;
  return (
    <Layout title={title} image={image} before={<WhiteBox>{description}</WhiteBox>}>
      <SEO title={title} description={description} />
      <div className="page-content" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

Template.propTypes = {
  data: PropTypes.shape({ markdownRemark: PropTypes.shape({}) }).isRequired,
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
