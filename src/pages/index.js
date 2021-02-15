import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Button } from "@material-ui/core"
import {
  Box,
  Container,
  Typography,
  Toolbar,
  useTheme,
} from "@material-ui/core"
import { Information } from "mdi-material-ui"
import BackgroundImage from "gatsby-background-image"

const IndexPage = ({ siteIsReady, isMobile }) => {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "hero" }, sourceInstanceName: { eq: "content" }) {
        childMarkdownRemark {
          frontmatter {
            hero_image {
              childImageSharp {
                fluid(maxWidth: 2500, maxHeight: 1500, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            hero_heading
            hero_subheading
            hero_btn
          }
        }
      }
    }
  `)
  const {
    hero_heading,
    hero_subheading,
    hero_btn,
  } = data.file.childMarkdownRemark.frontmatter

  const hero_image =
    data.file.childMarkdownRemark.frontmatter.hero_image.childImageSharp.fluid

  const theme = useTheme()
  return (
    <>
      <SEO title="Home" />
      {siteIsReady ? (
        <Box
          display="flex"
          flexDirection="column"
          style={{
            width: "100vw",
            height: "100vh",
          }}
          align="center"
        >
          <Toolbar />
          <Box
            component={BackgroundImage}
            fluid={hero_image}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Box
              width="100%"
              boxShadow={2}
              mt={15}
              py={9}
              style={{
                background: `linear-gradient(to bottom right, ${theme.palette.primary.main}cc 10%, ${theme.palette.primary.main}77)`,
              }}
              color={theme.palette.primary.contrastText}
            >
              <Container maxWidth="md">
                <Typography variant="h3" paragraph>
                  {hero_heading}
                </Typography>
                <Typography variant="h5" paragraph>
                  {hero_subheading}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Information />}
                  size="large"
                  component={Link}
                  to="/about"
                >
                  {hero_btn}
                </Button>
              </Container>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
  siteIsReady: state.siteIsReady,
})
export default connect(mapStateToProps)(IndexPage)
