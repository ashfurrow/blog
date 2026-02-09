import * as path from "path"
import Image from "@11ty/eleventy-img"

/**
 * Adds an image to the image transform pipline, returning its destination URL.
 * @param {*} context
 * @param {string} imagePath
 * @returns
 */
export async function transformImage(context, imagePath) {
  const markdownDir = path.dirname(context.page.inputPath)
  const imageSourcePath = path.resolve(markdownDir, imagePath)
  try {
    const outputDir = path.dirname(context.page.outputPath)
    const urlPath = context.page.url
    let metadata = await Image(imageSourcePath, {
      widths: [800, null],
      formats: ["webp", "auto"],
      outputDir,
      urlPath,
      filenameFormat: function (_id, src, width, format, _options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)
        return `${name}-${width}.${format}`
      }
    })

    // Return the largest original-format image URL (for CSS backgrounds and meta tags)
    const formats = Object.keys(metadata)
    const lastFormat = formats[formats.length - 1]
    const images = metadata[lastFormat]
    return images[images.length - 1].url
  } catch (error) {
    console.error(`Error processing image ${imageSourcePath}:`, error)
    return null
  }
}
