// TODO: Remove migration scripts. That's what source control is for.
import path from 'path'
import { promises as fs } from 'fs'
import YAML from 'yaml'
// import { take, flatten, uniq, trim, last, kebabCase } from 'lodash'
import { take, trim, last } from 'lodash'
// import requestPromise from 'request-promise-native'

const main = async () => {
  try {
    const oldPostsPath = path.join(__dirname, '../old/source/blog')
    const posts = await fs.readdir(oldPostsPath)
    await Promise.all(
      take(
        posts.filter((p) => p.endsWith('.html.markdown')),
        30
      ).map(migratePost)
    )
  } catch {
    console.log('OOP')
  }
}

const migratePost = async (filename: string) => {
  console.log(`migrating ${filename}`)
  const contents = await fs.readFile(`./old/source/blog/${filename}`, 'utf8')
  const [, yamlRaw, ...blogMDArray] = contents.split(/---/)
  let blogMD = blogMDArray.join('---')
  const frontmatter = YAML.parse(yamlRaw)
  const {
    background_image: banner,
    background_image_source: bannerAttribution,
    og_image: socialImage
  } = frontmatter
  const oldFileName = filename.replace('.html.markdown', '')
  // const oldSlug = last(oldFileName.split(/\d{4}-\d{2}-\d{2}-/))
  const newDirName = `./blog/${oldFileName}`
  await fs.mkdir(newDirName, { recursive: true })

  const imgRegex = /(?<url>\/img\/[^\.]+\.([a-zA-Z]{2,4}))/g
  const imageURLs: string[] = []
  let match: RegExpExecArray | null
  while ((match = imgRegex.exec(blogMD)) !== null) {
    if (match.groups) {
      const imageURL = match.groups.url
      imageURLs.push(imageURL)
      const imageFilename = last(imageURL.split('/'))

      await fs.rename(`old/source${imageURL}`, `${newDirName}/${imageFilename}`)
      blogMD = blogMD.replace(imageURL, `./${imageFilename}`)
    }
  }

  blogMD = blogMD
    .replace('(READMORE)\n', '')
    .replace(/YOUTUBE ([^#\&\?\n<]+)/g, "<YouTube videoID='$1' />")
    .replace(/BEGIN_WIDE((.|[\n])*?)END_WIDE/g, '<Wide>$1</Wide>')
    .replace(/BEGIN_NARROW((.|[\n])*?)END_NARROW/g, '<Narrow>$1</Narrow>')

  const newFrontmatter = {
    title: frontmatter.title,
    date: frontmatter.date.split(' ')[0], // Removes any time from the blog post
    ...(banner && { banner }),
    ...(bannerAttribution && { bannerAttribution }),
    ...(socialImage && { socialImage })
  }
  if (banner) {
    await fs.rename(
      `old/source${banner}`,
      `${newDirName}/${path.basename(banner)}`
    )
    newFrontmatter.banner = path.basename(banner)
  }

  const newContents = `---
${trim(YAML.stringify(newFrontmatter))}
---
${blogMD}
  `

  await fs.writeFile(`${newDirName}/index.mdx`, newContents)
  await fs.unlink(`./old/source/blog/${filename}`)

  /*
    1. Transform YAML frontmatter DONE
    2. Compute new directory name and create DONE
    3. Look for images (body+frontmatter)
      - Move the images
      - Update markdown image references
    4. Migrate YouTube embeds DONE
    5. Migrate _WIDE and _NARROW sections DONE
  */
}

main()
