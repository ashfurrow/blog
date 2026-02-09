import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy"
import rssPlugin from "@11ty/eleventy-plugin-rss"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

import Image from "@11ty/eleventy-img"
const { eleventyImageTransformPlugin } = Image

import pluginFilters from "./src/_config/filters.js"
import pluginShortcodes from "./src/_config/shortcodes.js"
import pluginPersonalTimeline from "./src/_config/personaltimeline.js"

/**
 * Configure Eleventy with plugins, bundles, and shortcodes.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig - The Eleventy configuration object.
 */
export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(IdAttributePlugin)
  eleventyConfig.addPlugin(HtmlBasePlugin)
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(pluginFilters)
  eleventyConfig.addPlugin(pluginShortcodes)
  eleventyConfig.addPlugin(pluginPersonalTimeline)

  eleventyConfig.addPlugin(syntaxHighlight, {
    init: function ({ Prism }) {
      Prism.languages.plaintext = {}
    }
  })

  eleventyConfig.addTransform(
    "plaintext-code-blocks",
    /**
     * @param {string} content
     * @param {string} outpugPath
     */
    function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        // Replace <pre><code> (without language class) with <pre class="language-plaintext"><code class="language-plaintext">
        // We need this for prism formatting.
        return content.replace(
          /<pre><code>([^]*?)<\/code><\/pre>/g,
          '<pre class="language-plaintext"><code class="language-plaintext">$1</code></pre>'
        )
      }
      return content
    }
  )

  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy({ "node_modules/lunr/lunr.js": "assets/lunr.js" })

  // Copy static files that need to be served at root
  eleventyConfig.addPassthroughCopy({ "src/static/robots.txt": "robots.txt" })
  eleventyConfig.addPassthroughCopy({ "src/static/CNAME": "CNAME" })
  eleventyConfig.addPassthroughCopy({ "src/static/_redirects": "_redirects" })
  eleventyConfig.addPassthroughCopy({ "src/static/keybase.txt": "keybase.txt" })

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["auto"],
    filenameFormat:
      /** @type {import('@11ty/eleventy-img').ImageOptions['filenameFormat']} */
      function (id, src, width, format, options) {
        // It's almost like the plugin authors don't want you to use the original filename, which I think is silly.
        const filename = src.split("/").slice(-1)[0].split(".")[0]
        // We could be using `${filename}-${id}-${width}.${format}` or something more unique, but I prefer the plain filenames until we have mulitple widths
        return `${filename}.${format}`
      },
    defaultAttributes: {
      loading: "lazy",
      decoding: "async"
    },
    sharpOptions: {
      animated: true
    }
  })

  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({ typographer: true })
  })

  eleventyConfig.setServerOptions({
    domDiff: false // Fontawesome icons loose their sizing when 11ty
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
