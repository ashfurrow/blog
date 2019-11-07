import Post from './Post'
import Frontmatter from './Frontmatter'

interface PageContext {
  next: Post
  prev: Post
  githubLink: string
}

export default PageContext
