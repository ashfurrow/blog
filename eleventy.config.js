import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy"
import rssPlugin from "@11ty/eleventy-plugin-rss"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import sharp from "sharp"
import { readFile } from "node:fs/promises"
import path from "node:path"

import Image from "@11ty/eleventy-img"
const { eleventyImageTransformPlugin } = Image

import pluginFilters from "./src/_config/filters.js"
import pluginShortcodes from "./src/_config/shortcodes.js"
import pluginPersonalTimeline from "./src/_config/personaltimeline.js"

const lqipCache = new Map()

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
    formats: ["webp", "auto"],
    widths: [400, 800, 1600, "auto"],
    filenameFormat:
      /** @type {import('@11ty/eleventy-img').ImageOptions['filenameFormat']} */
      function (id, src, width, format, options) {
        const filename = src.split("/").slice(-1)[0].split(".")[0]
        return `${filename}-${width}.${format}`
      },
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "auto"
    },
    sharpOptions: {
      animated: true
    },
    // Sharp re-encodes webp images at quality 80 by default, which visibly degrades the animated screen recordings
    sharpWebpOptions: {
      quality: 90
    }
  })

  // LQIP: Low-Quality Image Placeholders with blur-up
  eleventyConfig.addTransform("lqip", async function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content
    }

    const pictureRegex = /<picture>([\s\S]*?)<\/picture>/g
    const imgSrcRegex = /<img[^>]+src="([^"]+)"/
    const imgWidthRegex = /<img[^>]+width="(\d+)"/
    const imgHeightRegex = /<img[^>]+height="(\d+)"/

    const matches = [...content.matchAll(pictureRegex)]
    if (matches.length === 0) {
      return content
    }

    const replacements = []

    for (const match of matches) {
      const pictureHtml = match[0]
      const srcMatch = pictureHtml.match(imgSrcRegex)
      const widthMatch = pictureHtml.match(imgWidthRegex)
      const heightMatch = pictureHtml.match(imgHeightRegex)

      if (!srcMatch) continue

      const imgSrc = srcMatch[1]
      const filePath = path.join("_site", imgSrc)

      try {
        let base64

        if (lqipCache.has(filePath)) {
          base64 = lqipCache.get(filePath)
        } else {
          const fileBuffer = await readFile(filePath)
          const thumbBuffer = await sharp(fileBuffer).resize(20).jpeg({ quality: 50 }).toBuffer()
          base64 = `data:image/jpeg;base64,${thumbBuffer.toString("base64")}`
          lqipCache.set(filePath, base64)
        }

        const width = widthMatch ? widthMatch[1] : ""
        const height = heightMatch ? heightMatch[1] : ""
        const aspectRatio = width && height ? `aspect-ratio: ${width} / ${height};` : ""

        const wrapped =
          `<div class="lqip-wrapper" style="background-image: url(${base64}); background-size: cover; ${aspectRatio}">` +
          pictureHtml +
          `</div>`

        replacements.push({ original: pictureHtml, replacement: wrapped })
      } catch {
        // Image file not found or unprocessable — skip gracefully
      }
    }

    for (const { original, replacement } of replacements) {
      content = content.replace(original, replacement)
    }

    return content
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
    output: "_site"
  }
}
