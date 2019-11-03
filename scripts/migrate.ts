import path from 'path'
import { promises as fs } from 'fs'
import YAML from 'yaml'
import { takeRight, flatten, uniq, trim, last } from 'lodash'

const main = async () => {
  try {
    const oldPostsPath = path.join(__dirname, '../old/source/blog')
    // console.log({ hi: oldPostsPath })
    const posts = await fs.readdir(oldPostsPath)
    // console.log({ length: posts.length })
    // console.log(
    //   uniq(
    //     flatten(
    //       await Promise.all(
    //         posts.filter(p => p.endsWith('.html.markdown')).map(testing)
    //       )
    //     )
    //   )
    // )
    // migratePost('2012-09-19-uicollectionview-example.html.markdown')
    migratePost()
  } catch {
    console.log('OOP')
  }
}

const testing = async (filename: string) => {
  console.log(`migrating ${filename}`)
  const contents = await fs.readFile(`./old/source/blog/${filename}`, 'utf8')
  const [, yamlRaw, ...blogMDArray] = contents.split(/---/)
  const blogMD = blogMDArray.join('---')
  const frontmatter = YAML.parse(yamlRaw)
  delete frontmatter.link_to // who cares lol
  return Object.keys(frontmatter)
}

const migratePost = async () => {
  const filename = '2017-11-22-taxonomies-of-engineering-careers.html.markdown'
  console.log(`migrating ${filename}`)
  const contents = await fs.readFile(`./old/source/blog/${filename}`, 'utf8')
  // console.log(JSON.stringify({ contents }))
  const [, yamlRaw, ...blogMDArray] = contents.split(/---/)
  let blogMD = blogMDArray.join('---')
  const frontmatter = YAML.parse(yamlRaw)
  const {
    background_image: banner,
    background_image_source: bannerAttribution,
    og_image: socialImage
  } = frontmatter
  const newFrontmatter = {
    title: frontmatter.title,
    date: frontmatter.date.split(' ')[0], // Removes any time from the blog post
    ...(banner && { banner }),
    ...(bannerAttribution && { bannerAttribution }),
    ...(socialImage && { socialImage })
  }
  const newDirName = `./blog/${last(
    filename.split('.')[0].split(/\d{4}-\d{2}-\d{2}-/)
  )}`
  await fs.mkdir(newDirName, { recursive: true })

  const imgRegex = /(?<url>\/img\/[^\.]+\.([a-zA-Z]{2,4}))/g
  const imageURLs: string[] = []
  let match: RegExpExecArray | null
  while ((match = imgRegex.exec(blogMD)) !== null) {
    // console.log(match)
    if (match.groups) {
      const imageURL = match.groups.url
      imageURLs.push(imageURL)
      const imageFilename = last(imageURL.split('/'))

      await fs.rename(`old/source${imageURL}`, `${newDirName}/${imageFilename}`)
      blogMD = blogMD.replace(imageURL, `./${imageFilename}`)
    }
  }

  blogMD = blogMD
    .replace('\n(READMORE)\n\n', '')
    .replace(/YOUTUBE ([^#\&\?\n<]+)/g, "<YouTube videoID='$1' />")
    .replace(/BEGIN_WIDE((.|[\n])*?)END_WIDE/g, '<Wide>$1</Wide>')
    .replace(/BEGIN_NARROW((.|[\n])*?)END_NARROW/g, '<Narrow>$1</Narrow>')

  const newContents = `---
${trim(YAML.stringify(newFrontmatter))}
---
${blogMD}
  `

  await fs.writeFile(`${newDirName}/index.mdx`, newContents)
  await fs.unlink(`./old/source/blog/${filename}`)

  // console.log({ imageURLs })
  /*
    1. Transform YAML frontmatter DONE
    2. Compute new directory name and create DONE
    3. Look for images DONE
      - Move the images
      - Update markdown image references
    4. Migrate YouTube embeds DONE
    5. Migrate _WIDE and _NARROW sections DONE
  */
}

main()
