const path = require("path")
const config = require("./gatsby-config")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  let paginationQuery = await graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "blogs" }, extension: { eq: "md" } }
        sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            childMarkdownRemark {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)
  if (paginationQuery.errors) {
    reporter.panicOnBuild("Error while running Pagination query")
    return
  }

  const posts = paginationQuery.data.allFile.edges
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("src/templates/blog.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  const blogTemplate = path.resolve("src/templates/blogEntry.js")
  const blogsQuery = await graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "blogs" }, extension: { eq: "md" } }
      ) {
        edges {
          node {
            childMarkdownRemark {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)

  if (blogsQuery.errors) {
    reporter.panicOnBuild("Error while running blog query")
    return
  }
  blogsQuery.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: `/blog${node.childMarkdownRemark.fields.slug}`,
      component: blogTemplate,
      context: { id: node.childMarkdownRemark.id },
    })
  })
}
