import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy"
import bundlePlugin from "@11ty/eleventy-plugin-bundle"

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
  eleventyConfig.addPlugin(bundlePlugin)
  eleventyConfig.addPlugin(pluginFilters)
  eleventyConfig.addPlugin(pluginShortcodes)

  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy({ "node_modules/lunr/lunr.js": "assets/lunr.js" })

  // Copy static files that need to be served at root
  eleventyConfig.addPassthroughCopy({ "src/static/robots.txt": "robots.txt" })
  eleventyConfig.addPassthroughCopy({ "src/static/CNAME": "CNAME" })
  eleventyConfig.addPassthroughCopy({ "src/static/_redirects": "_redirects" })
  eleventyConfig.addPassthroughCopy({ "src/static/keybase.txt": "keybase.txt" })

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

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Output formats for each image.
    formats: ["auto"],
    failOnError: false,
    // Skip processing for images with data-no-transform attribute
    transformOnRequest: (src, attributes) => {
      if (attributes["data-no-transform"] !== undefined) {
        return false
      }
      return true
    },
    defaultAttributes: {
      loading: "lazy",
      decoding: "async"
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
