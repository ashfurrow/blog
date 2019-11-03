import path from 'path'
import { promises as fs } from 'fs'
import YAML from 'yaml'
import { takeRight, flatten, uniq, trim } from 'lodash'

const main = async () => {
  try {
    const oldPostsPath = path.join(__dirname, '../old/source/blog')
    console.log({ hi: oldPostsPath })
    const posts = await fs.readdir(oldPostsPath)
    console.log({ length: posts.length })
    // console.log(
    //   uniq(
    //     flatten(
    //       await Promise.all(
    //         posts.filter(p => p.endsWith('.html.markdown')).map(testing)
    //       )
    //     )
    //   )
    // )
    migratePost(
      './old/source/blog/2012-09-19-uicollectionview-example.html.markdown'
    )
  } catch {
    console.log('OOP')
  }
}

const testing = async (filename: string) => {
  console.log(`migrating ${filename}`)
  const contents = await fs.readFile(`./old/source/blog/${filename}`, 'utf8')
  const [_unused, yamlRaw, ...blogMDArray] = contents.split(/---/)
  const blogMD = blogMDArray.join('---')
  const frontmatter = YAML.parse(yamlRaw)
  delete frontmatter.link_to // who cares lol
  return Object.keys(frontmatter)
}

const migratePost = async (filename: string) => {
  console.log(`migrating ${filename}`)
  const contents = await fs.readFile(filename, 'utf8')
  // console.log(JSON.stringify({ contents }))
  const [_unused, yamlRaw, ...blogMDArray] = contents.split(/---/)
  const blogMD = blogMDArray.join('---')
  const frontmatter = YAML.parse(yamlRaw)
  const {
    background_image: banner,
    background_image_source: bannerAttribution,
    og_image: socialImage
  } = frontmatter
  const newFrontmatter = {
    title: frontmatter.title,
    date: frontmatter.date,
    ...(banner && { banner }),
    ...(bannerAttribution && { bannerAttribution }),
    ...(socialImage && { socialImage })
  }
  const newContents = `---
${trim(YAML.stringify(newFrontmatter))}
---
  `
  console.log({ newContents })
  /*
    1. Transform YAML frontmatter
    2. Look for images
      - Move the images
      - Update markdown image references
    3. Migrate YouTube embeds
    4. Migrate _WIDE and _NARROW sections
  */
}

main()
