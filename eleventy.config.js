import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy"
import rssPlugin from "@11ty/eleventy-plugin-rss"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

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

  // RSS Plugin - provides filters like dateToRfc822, absoluteUrl, htmlToAbsoluteUrls
  eleventyConfig.addPlugin(rssPlugin)

  // Syntax highlighting plugin with shell alias (matching old Gatsby config)
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: false,
    lineSeparator: "\n",
    preAttributes: {},
    codeAttributes: {},
    // Default to plaintext for code blocks without language specified
    errorOnInvalidLanguage: false,
    init: function ({ Prism }) {
      // Add shell alias for sh (matching old Gatsby config)
      Prism.languages.shell = Prism.languages.bash
      // Add plaintext language (no highlighting, but gets the styling)
      Prism.languages.plaintext = {}
    }
  })

  // Transform code blocks without language to use plaintext
  eleventyConfig.addTransform("plaintext-code-blocks", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Replace <pre><code> (without language class) with <pre class="language-plaintext"><code class="language-plaintext">
      return content.replace(
        /<pre><code>([^]*?)<\/code><\/pre>/g,
        '<pre class="language-plaintext"><code class="language-plaintext">$1</code></pre>'
      )
    }
    return content
  })

  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy({ "node_modules/lunr/lunr.js": "assets/lunr.js" })

  // Copy static files that need to be served at root
  eleventyConfig.addPassthroughCopy({ "src/static/robots.txt": "robots.txt" })
  eleventyConfig.addPassthroughCopy({ "src/static/CNAME": "CNAME" })
  eleventyConfig.addPassthroughCopy({ "src/static/_redirects": "_redirects" })
  eleventyConfig.addPassthroughCopy({ "src/static/keybase.txt": "keybase.txt" })

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
    output: "public"
  }
}
