import path from 'path'
import { promises as fs } from 'fs'
import { takeRight } from 'lodash'

const main = async () => {
  try {
    const oldPostsPath = path.join(__dirname, '../old/source/blog')
    console.log({ hi: oldPostsPath })
    const posts = await fs.readdir(oldPostsPath)
    console.log({ length: posts.length })
    takeRight(posts.filter(p => p.endsWith('.html.markdown')), 1).forEach(
      migratePost
    )
  } catch {
    console.log('OOP')
  }
}

const migratePost = async (filename: string) => {
  console.log(`migrating ${filename}`)
  const contents = await fs.readFile(filename)
  /*
    1. Transform YAML frontmatter
    2. Look for images
      - Move the images
      - Update markdown image references
    3. Look for YouTube embeds
      - Add the required import
      - Transform the embeds
    4. Migrate _WIDE and _NARROW sections
  */
}

main()
