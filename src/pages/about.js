import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Box, Container, Typography, Button, Toolbar } from "@material-ui/core"
import ReactMarkdown from "react-markdown"

const AboutPage = ({ siteIsReady, atTop }) => {
  const data = useStaticQuery(graphql`
    {
      file(
        name: { eq: "about" }
        extension: { eq: "md" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          rawMarkdownBody
          frontmatter {
            about_heading
            about_image {
              childImageSharp {
                fluid(maxWidth: 2000, maxHeight: 700, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const img =
    data.file.childMarkdownRemark.frontmatter.about_image.childImageSharp.fluid
  const heading = data.file.childMarkdownRemark.frontmatter.about_heading
  const body = data.file.childMarkdownRemark.rawMarkdownBody

  const renderers = {
    paragraph: ({ node }) => {
      const { value } = node.children[0]
      return <Typography paragraph>{value}</Typography>
    },
  }

  return (
    <>
      <SEO title="About" />
      {siteIsReady ? (
        <>
          <Toolbar variant={atTop ? "regular" : "dense"} />
          <Img fluid={img} />
          <Box py={2}>
            <Container maxWidth="md">
              <Typography variant="h2" paragraph>
                {heading}
              </Typography>
              <ReactMarkdown renderers={renderers}>{body}</ReactMarkdown>
              <Box align="center">
                <Button component={Link} to="/contact">
                  Link to contact
                </Button>
              </Box>
            </Container>
          </Box>
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  atTop: state.atTop,
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(AboutPage)
