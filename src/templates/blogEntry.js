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
import { setSharerProps } from "../state/actions"

const Article = props => {
  const { article } = props.data

  const [showComments, setShowComments] = useState(false)

  const disqusConfig = {
    url: `https://gatsby-starter${article.fields.slug}`,
    title: article.frontmatter.title,
    identifier: article.id,
  }

  return (
    <>
      <SEO title={article.frontmatter.title} />
      <Toolbar />
      <Container maxWidth="md">
        <Box py={2}>
          <Box>
            <Breadcrumbs>
              <MLink color="inherit" component={Link} to="/blog">
                Blog
              </MLink>
              <Typography color="textPrimary">
                {article.frontmatter.title}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h2">{article.frontmatter.title}</Typography>

            <Box>
              <Button
                variant="text"
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
            </Box>

            <Typography variant="overline" display="block">
              {moment(article.frontmatter.date).format("Do MMM YYYY")}
            </Typography>
          </Box>
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
        </Box>
      </Container>
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
            fluid(maxWidth: 800) {
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
