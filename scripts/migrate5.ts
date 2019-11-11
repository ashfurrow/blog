import YAML from 'yaml'
import path from 'path'
import { promises as fs } from 'fs'
import { last, map } from 'lodash'

// const log = console.log
const log = (thing: any) => thing && undefined

interface Entry {
  heading: string
  img_url?: string
  content: string[]
}

const main = async () => {
  const fileContents = await fs.readFile(
    path.join(__dirname, '../blog/2014-12-21-5-years-of-ios/five_years.yml'),
    'utf8'
  )
  const yaml = YAML.parse(fileContents)
  log({ yaml })
  // Generate the image imports
  /*
  yaml.forEach((year: any) => {
    const yearString = Object.keys(year)[0]
    year[yearString].forEach((entry: Entry) => {
      if (entry.img_url) {
        const imageName = last(entry.img_url.split('/')) as string
        console.log(`import ${imageName.split('.')[0]} from './${imageName}'`)
      }
    })
  })
  */

  yaml.forEach((year: any) => {
    const yearString = Object.keys(year)[0]
    year[yearString].forEach((entry: Entry) => {
      let img: string | null = null
      if (entry.img_url) {
        const imageName = last(entry.img_url.split('/')) as string
        img = imageName.split('.')[0]
      }

      console.log(`
<Entry title="${entry.heading}"${img ? ` img={${img}}` : ''}>
${map(entry.content, c => `  <p>${c}</p>`).join('\n')}
</Entry>`)
    })
  })
}

main()
