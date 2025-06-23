import Path from 'path'
import { writeFileSync } from 'fs'
import { GatsbyNode } from 'gatsby'
import AllMarkdownRemark from '../src/models/AllMarkdownRemark'
import { generatePath } from '../src/utils/paths'

const createPages: GatsbyNode['createPages'] = ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = Path.resolve(`src/templates/Post.tsx`)
  return graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            body
            id
            frontmatter {
              date
              title
            }
          }
        }
      }
      siteSearchIndex {
        index
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    const allMdx = (result.data as any).allMdx as AllMarkdownRemark
    const { siteSearchIndex } = result.data as any
    const posts = allMdx.edges
    posts.forEach(({ node }, index) => {
      const next = index === 0 ? null : posts[index - 1].node
      const prev = index === posts.length - 1 ? null : posts[index + 1].node
      const path = generatePath(node.frontmatter.title)
      createPage({
        path,
        component: postTemplate,
        context: {
          prev,
          next,
          id: node.id
        }
      })
    })
    console.log('Writing search index.')
    writeFileSync(
      Path.join('public', 'siteSearchIndex.json'),
      JSON.stringify(siteSearchIndex.index)
    )
  })
}
exports.createPages = createPages
