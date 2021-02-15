import React, { useState } from "react"
import { connect } from "react-redux"
import {
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Link as MLink,
  Breadcrumbs,
  Divider,
} from "@material-ui/core"
import { Comment, Share } from "mdi-material-ui"
import { Link, graphql } from "gatsby"
import { CommentCount, DiscussionEmbed } from "disqus-react"
import moment from "moment"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { setSharerProps } from "../state/actions"

const Article = props => {
  const { article, og } = props.data

  const [showComments, setShowComments] = useState(false)

  const disqusConfig = {
    url: `https://gatsby-starter${article.fields.slug}`,
    title: article.frontmatter.title,
    identifier: article.id,
  }

  return (
    <>
      <SEO
        title={article.frontmatter.title}
        ogImage={og.frontmatter.featured_image.childImageSharp.fixed.src}
      />
      <Toolbar />
      <Box py={2}>
        <Container maxWidth="md">
          <Breadcrumbs>
            <MLink color="inherit" component={Link} to="/blog">
              Blog
            </MLink>
            <Typography color="textPrimary">
              {article.frontmatter.title}
            </Typography>
          </Breadcrumbs>
        </Container>
        <Img fluid={article.frontmatter.featured_image.childImageSharp.fluid} />
        <Container maxWidth="md">
          <Typography variant="h2">{article.frontmatter.title}</Typography>

          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() =>
              props.dispatch(
                setSharerProps({
                  visible: true,
                  title: document.title,
                  href: window.location.href,
                })
              )
            }
            startIcon={<Share />}
          >
            Share
          </Button>
          <Typography variant="overline" display="block">
            {moment(article.frontmatter.date).format("Do MMMM YYYY")}
          </Typography>

          <Divider />
          <Typography dangerouslySetInnerHTML={{ __html: article.html }} />
          <Box my={3}>
            <Button
              fullWidth
              startIcon={<Comment />}
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? "Hide comments" : "Show comments"} (
              <CommentCount shortname="gatsby-starter-1" config={disqusConfig}>
                0 comments
              </CommentCount>
              )
            </Button>
            {showComments && (
              <DiscussionEmbed
                shortname="gatsby-starter-1"
                config={disqusConfig}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
        featured_image {
          childImageSharp {
            fluid(maxWidth: 2000, maxHeight: 700, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
      excerpt
      html
      fields {
        slug
      }
    }
    og: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            fixed(width: 1200, height: 627) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export default connect()(Article)
