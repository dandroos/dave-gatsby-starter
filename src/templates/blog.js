import React from "react"
import { connect } from "react-redux"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import {
  Toolbar,
  Container,
  Box,
  Typography,
  Card,
  Divider,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import moment from "moment"
import SEO from "../components/seo"
import { Post } from "mdi-material-ui"
import ReactMarkdown from "react-markdown"

const Index = props => {
  const { currentPage, numPages } = props.pageContext
  const articles = props.data.blogs.edges.map(i => {
    const article = i.node.childMarkdownRemark
    return {
      id: article.id,
      title: article.frontmatter.title,
      body: article.html,
      image: article.frontmatter.featured_image.childImageSharp.fluid,
      date: article.frontmatter.date,
      slug: article.fields.slug,
      excerpt: article.excerpt,
    }
  })
  const handleClick = (e, v) => {
    if (v === 1) {
      navigate(`/blog`)
    } else {
      navigate(`/blog/${v}`)
    }
  }

  return (
    <>
      <SEO title="Blog" />
      {props.siteIsReady ? (
        <>
          <Toolbar />
          <Container maxWidth="md">
            <Box py={2}>
              <Typography variant="h2" paragraph>
                {props.data.static.childMarkdownRemark.frontmatter.blog_heading}
              </Typography>
              <ReactMarkdown
                renderers={{
                  paragraph: ({ node }) => {
                    const { value } = node.children[0]
                    return <Typography paragraph>{value}</Typography>
                  },
                }}
              >
                {props.data.static.childMarkdownRemark.rawMarkdownBody}
              </ReactMarkdown>
              <Pagination
                count={numPages}
                page={currentPage}
                onChange={handleClick}
                style={{
                  marginBottom: ".35rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <Box my={2}>
                {articles.map((i, ind) => (
                  <Box key={ind} mb={articles.length === ind + 1 ? 0 : 2}>
                    <Card raised>
                      <CardActionArea
                        onClick={() => navigate(`/blog${i.slug}`)}
                      >
                        <Img style={{ cursor: "pointer" }} fluid={i.image} />
                        <CardContent>
                          <Typography variant="h3">{i.title}</Typography>
                          <Typography variant="overline">
                            {moment(i.date).format("Do MMMM YYYY")}
                          </Typography>
                          <Divider />
                          <Typography style={{ marginTop: 10 }} align="justify">
                            {i.excerpt}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions disableSpacing>
                        <Button
                          fullWidth
                          onClick={() => navigate(`/blog${i.slug}`)}
                          startIcon={<Post />}
                        >
                          Read more
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
            <Pagination
              count={numPages}
              page={currentPage}
              onChange={handleClick}
              style={{ display: "flex", justifyContent: "center" }}
            />
          </Container>
        </>
      ) : null}
    </>
  )
}

export const homeQuery = graphql`
  query homeQuery($skip: Int!, $limit: Int!) {
    blogs: allFile(
      limit: $limit
      skip: $skip
      filter: { sourceInstanceName: { eq: "blogs" }, extension: { eq: "md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          childMarkdownRemark {
            fields {
              slug
            }
            id
            frontmatter {
              title
              featured_image {
                childImageSharp {
                  fluid(maxHeight: 545, maxWidth: 845, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              date
            }
            html
            excerpt(pruneLength: 400)
          }
        }
      }
    }
    static: file(
      name: { eq: "blog" }
      sourceInstanceName: { eq: "content" }
      extension: { eq: "md" }
    ) {
      childMarkdownRemark {
        rawMarkdownBody
        frontmatter {
          blog_heading
        }
      }
    }
  }
`

const mapStateToProps = state => ({
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(Index)
