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
    // TODO: So what we can do is look at the frontmatter to see if there's a
    // banner specified. If there is, perform the query to find its publicUrl
    // and add it as a node field.
    // Grab the last path component of the node's path, then append the
    // (relative) filename specified in the banner, and query:
    // allFile(filter: {relativePath: { glob: "2012-08-31-exploring-nsorderedset-in-core-data/7A2664968015404F9A7D867DCE306700.png"}}) {
    createNodeField({ node, name: 'path', value: path })
    createNodeField({ node, name: 'githubLink', value: githubLink })
  }
}
exports.onCreateNode = onCreateNode
