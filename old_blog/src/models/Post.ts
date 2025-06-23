import Frontmatter from './Frontmatter'

interface Post {
  id: number
  excerpt: string
  body: string
  frontmatter: Frontmatter
  fileAbsolutePath: string
  fields: {
    path: string
    githubLink: string
  }
  timeToRead: number
}

export default Post
