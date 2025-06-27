import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy"

import * as path from "path"

import Image from "@11ty/eleventy-img"
const { eleventyImageTransformPlugin } = Image

import pluginFilters from "./src/_config/filters.js"
import pluginShortcodes from "./src/_config/shortcodes.js"

/**
 * Configure Eleventy with plugins, bundles, and shortcodes.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig - The Eleventy configuration object.
 * @returns {Promise<void>}
 */
export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(IdAttributePlugin)
  eleventyConfig.addPlugin(HtmlBasePlugin)
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)
  eleventyConfig.addPlugin(pluginFilters)
  eleventyConfig.addPlugin(pluginShortcodes)

  eleventyConfig.addPassthroughCopy("src/index.css")
  eleventyConfig.addPassthroughCopy("src/assets")

  eleventyConfig.addBundle("css", {
    toFileDirectory: "assets"
  })

  eleventyConfig.addBundle("js", {
    toFileDirectory: "assets",
    bundleHtmlContentFromSelector: "script"
  })

  eleventyConfig.addShortcode("currentBuildDate", () => {
    return new Date().toISOString()
  })

  eleventyConfig.addCollection("banners", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/**/*.md").map(async (post) => {
      // Process front matter images here
      if (post.data.banner) {
        const markdownDir = path.dirname(post.inputPath)

        // Resolve image path relative to markdown file
        const imagePath = path.resolve(markdownDir, post.data.banner)
        const relativeDir = path.relative("src/blog/", markdownDir)
        const outputDir = path.join("./_site", relativeDir)
        console.log({ imagePath, outputDir })

        await Image(imagePath, {
          outputDir: outputDir
        })
      }
      return post
    })
  })

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Output formats for each image.
    formats: ["auto"],
    failOnError: false,
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async"
      }
    },
    sharpOptions: {
      animated: true
    }
  })
}

export const config = {
  templateFormats: ["md", "html", "njk"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "src",
    output: "_site"
  }
}
