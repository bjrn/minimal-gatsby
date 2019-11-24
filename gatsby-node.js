const path = require(`path`)
const { createFilePath } = require("gatsby-source-filesystem")
// const routes = require('./src/routes');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    // Create slugs for blog entries if there are non in the md-file
    let slug = createFilePath({ node, getNode, basePath: "pages" })
    console.log("node.frontmatter.slug ", node.frontmatter.slug)
    /*
    if (!node.frontmatter.slug) {
      node.frontmatter.slug = slug
    }
    */

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      blogPosts: allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              date
              layout
              slug
              title
              path
            }
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(({ data }) => {
    if (!data) {
      console.error("No data to create pages with")
      return
    }

    const blogTemplate = path.resolve(`./src/templates/blog-post.js`)

    const blogPosts = data.blogPosts.edges
    blogPosts.forEach(({ node }, index) => {
      const {
        fields: { slug },
      } = node

      createPage({
        path: node.frontmatter.path,
        component: blogTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug,
        },
      })
    })
  })

  /*
  result.data.blogPosts.edges.forEach(({ node }) => {
    const blogTemplate = path.resolve(`./src/templates/blog-post.js`)
    const {
      fields: { slug },
    } = node

    console.log("slug ", slug)
    console.log("node.frontmatter.path ", node.frontmatter.path)
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug,
      },
    })
  })
  */
}
