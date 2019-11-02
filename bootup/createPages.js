const path = require('path')
const _ = require('lodash')
const createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/Post.tsx`)
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 10
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            fields {
              slug
            }
            frontmatter {
              date
              title
              category
              tags
              banner
              bannerAttribution
            }
            timeToRead
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }, index) => {
      const next = index === 0 ? null : posts[index - 1].node
      const prev = index === posts.length - 1 ? null : posts[index + 1].node
      createPage({
        path: `/blog/${_.kebabCase(node.frontmatter.title)}`,
        component: postTemplate,
        context: {
          slug: _.kebabCase(node.frontmatter.title),
          prev,
          next
        }
      })
    })
  })
}
exports.createPages = createPages
