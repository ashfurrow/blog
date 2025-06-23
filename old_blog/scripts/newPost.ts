import { last } from 'lodash'
import fs from 'fs'
import { generateSlug } from '../src/utils/paths'
import moment from 'moment'

const main = async () => {
  const args = process.argv
  if (args.length < 3) {
    console.error('You gotta supply a title.')
    return process.exit(1)
  }
  const title = last(args) as string
  const slug = generateSlug(title)
  const today = moment()
  const date = today.format('YYYY-MM-DD')
  const postPath = `${date}-${slug}`

  const post = `---
title: ${title}
date: ${date}
---

${title}
`

  await fs.promises.mkdir(`blog/${postPath}`, { recursive: true })
  await fs.promises.writeFile(`blog/${postPath}/index.mdx`, post, {
    encoding: 'utf8'
  })
}

main()
