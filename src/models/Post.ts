import Frontmatter from './Frontmatter'

interface Post {
  id: number
  excerpt: string
  body: string
  frontmatter: Frontmatter
  fields: {
    slug: string
  }
  timeToRead: number
}

export default Post
