import { has } from 'lodash'
import { GatsbyNode } from 'gatsby'
import Frontmatter from '../src/models/Frontmatter'
import { generatePath } from '../src/utils/paths'
import Path from 'path'

const repoPath = Path.join(__dirname, '..')

const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === 'Mdx' &&
    has(node, 'frontmatter') &&
    has(node.frontmatter, 'title')
  ) {
    const relativePath = (node.fileAbsolutePath as string).replace(repoPath, '')
    const githubLink = `https://github.com/ashfurrow/blog/tree/master${relativePath}`
    const frontmatter = node.frontmatter as Frontmatter
    const path = generatePath(frontmatter.title)
    createNodeField({ node, name: 'path', value: path })
    createNodeField({ node, name: 'githubLink', value: githubLink })
  }
}
exports.onCreateNode = onCreateNode
