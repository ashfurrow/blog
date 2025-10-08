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
      widths: [null],
      formats: ["auto"],
      outputDir,
      urlPath,
      filenameFormat: function (_id, src, _width, format, _options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)
        return `${name}.${format}`
      }
    })

    const formats = Object.keys(metadata)
    const firstFormat = formats[0]
    const images = metadata[firstFormat]
    return images[0].url
  } catch (error) {
    console.error(`Error processing image ${imageSourcePath}:`, error)
    return null
  }
}
