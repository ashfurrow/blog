import path from 'path'
import { kebabCase } from 'lodash'
import { GatsbyNode } from 'gatsby'
import AllMarkdownRemark from '../src/models/AllMarkdownRemark'

const createPages: GatsbyNode['createPages'] = ({ actions, graphql }) => {
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
    const allMarkdown = (result.data as any)
      .allMarkdownRemark as AllMarkdownRemark
    const posts = allMarkdown.edges
    posts.forEach(({ node }, index) => {
      const next = index === 0 ? null : posts[index - 1].node
      const prev = index === posts.length - 1 ? null : posts[index + 1].node
      createPage({
        path: `/blog/${kebabCase(node.frontmatter.title)}`,
        component: postTemplate,
        context: {
          prev,
          next,
          slug: kebabCase(node.frontmatter.title)
        }
      })
    })
  })
}
exports.createPages = createPages
