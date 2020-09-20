// This is the homepage.

import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import ItemThumbnail from '../components/ItemThumbnail/ItemThumbnail';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image";
import Beginning from "../../static/beginning.png";
import Ending from "../../static/ending.gif";

const ThumbnailsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;
`

const BeginningWrapper = styled.div`
    background-color: black;
    text-align: center;
    color: white;
    width: 350px;
`

const EndingWrapper = styled.div`
    background-color: yellow;
    text-align: center;
    width: 350px;
`

const StoryLine = styled.div`
    justify-content: space-around;
    flex-flow: row wrap;
    display: flex;
    width: 100vw;
`

const Frame = styled.img`
    width: 100%;
    height: 475px;
    background-color: red;

    @media (max-width: 930px) {
        height: 100%;
    }
`

const Heading = styled.h3`
    font-size: 1.3em;
    padding: 40px 10px;
    font-weight: 900;
    text-align: center;
    width: 100%;
    min-height: 85px;
    margin: auto;
    
`


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const items = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All items" />
        <ThumbnailsWrapper>
          {items.map(({ node }) => {
            const { title, image, price } = node.frontmatter
            return (
              <StoryLine>
                <BeginningWrapper>
                  <Frame src={Beginning} />
                  <Heading>
                    The Beginning
                  </Heading>
                </BeginningWrapper>
                <ItemThumbnail
                  key={node.fields.slug}
                  link={node.fields.slug}
                  heading={title}
                  image={image.childImageSharp.fluid}
                  price={price}
                />
                <EndingWrapper>
                  <Frame src={Ending} />
                  <Heading>
                    The Ending
                  </Heading>
                </EndingWrapper>
              </StoryLine>
            )
          })}
        </ThumbnailsWrapper>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            price
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
