#!/usr/bin/env node

import fs from "fs"
import slugify from "@sindresorhus/slugify"
import { exec } from "child_process"

const main = async () => {
  const args = process.argv
  if (args.length < 3) {
    console.error("You gotta give a title.")
    return process.exit(1)
  }

  const title = args.at(-1)
  // Note that while this matches slugs in blog.11ty.data.js the directory name itself doesn't affect the build output.
  const slug = slugify(title, {
    decamelize: false,
    customReplacements: [
      ["'", ""],
      ["&", ""]
    ],
    preserveCharacters: ["_"]
  })
  const date = new Date().toLocaleDateString("en-CA")

  const post = `---
title: ${title}
date: ${date}
---

// TODO: Write this post
`

  const postPath = `src/blog/${date}-${slug}`
  const markdownFile = `${postPath}/index.md`
  await fs.promises.mkdir(postPath)
  await fs.promises.writeFile(markdownFile, post, {
    encoding: "utf8"
  })

  // Open the directory (to add images) and the post markdown (hopefully not in Xcode)
  exec(`open ${postPath}`)
  exec(`open ${markdownFile}`)
}

main()
