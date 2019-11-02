import { kebabCase, has } from 'lodash'
import { GatsbyNode } from 'gatsby'
import Frontmatter from '../src/models/Frontmatter'

const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === 'Mdx' &&
    has(node, 'frontmatter') &&
    has(node.frontmatter, 'title')
  ) {
    const frontmatter = node.frontmatter as Frontmatter
    const slug = `${kebabCase(frontmatter.title)}`
    createNodeField({ node, name: 'slug', value: slug })
  }
}
exports.onCreateNode = onCreateNode
