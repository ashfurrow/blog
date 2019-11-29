import Post from './Post'

interface PageContext {
  next: Post
  prev: Post
  githubLink: string
}

export default PageContext
