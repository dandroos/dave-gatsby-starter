import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  useTheme,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
} from "@material-ui/core"
import { Comment } from "mdi-material-ui"
import { Link, graphql } from "gatsby"
import { CommentCount, DiscussionEmbed } from "disqus-react"
import moment from "moment"

const Article = props => {
  const theme = useTheme()
  const { article } = props.data

  const [showComments, setShowComments] = useState(false)

  const disqusConfig = {
    url: `https://gatsby-starter${article.fields.slug}`,
    title: article.frontmatter.title,
    identifier: article.id,
  }
  const handleClick = e => {
    /*
    switch (e.currentTarget.id) {
      case "share":
        return props.dispatch(
          setPopup({
            visible: true,
            href: window.location.href,
            title: document.title,
          })
        )
      default:
        return
    }
    */
  }

  return (
    <>
      <Container maxWidth="md">
        <Box>
          <Box align="center">
            <Typography variant="h2">{article.frontmatter.title}</Typography>
            <Typography variant="overline">
              {moment(article.frontmatter.date).format("Do MMM YYYY")}
            </Typography>
          </Box>
          <Typography dangerouslySetInnerHTML={{ __html: article.html }} />
          <Box align="center">
            <Button component={Link} to="/blog" color="inherit">
              Back
            </Button>
          </Box>
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

const mapStateToProps = state => ({})
export default connect(mapStateToProps)(Article)
