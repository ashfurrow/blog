import { has } from 'lodash'
import { GatsbyNode } from 'gatsby'
import Frontmatter from '../src/models/Frontmatter'
import { generatePath } from '../src/utils/paths'

const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === 'Mdx' &&
    has(node, 'frontmatter') &&
    has(node.frontmatter, 'title')
  ) {
    const frontmatter = node.frontmatter as Frontmatter
    const path = generatePath(frontmatter.title)
    createNodeField({ node, name: 'path', value: path })
  }
}
exports.onCreateNode = onCreateNode
