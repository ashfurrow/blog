// How photo-post images are processed. Sources are the committed 2000px files; the sizes below are generated at build
// time next to the post's page, like the blog's own images, named `<photo>-<width>.<format>`.
import path from "node:path"
import Image from "@11ty/eleventy-img"

export const options = {
  widths: [600, 1200, 2000],
  formats: ["webp", "jpeg"],
  filenameFormat: (id, src, width, format) => `${path.parse(src).name}-${width}.${format}`
}

// While serving, the sizes are only worked out (the dimensions come from the source) and the dev server encodes a size
// when the browser asks for it, instead of encoding all of them before the server starts.
const onRequest = process.env.ELEVENTY_RUN_MODE === "serve"

/** Resizes `file` (a photo of the post `page`, an Eleventy page object) into that post's output directory. */
export const resize = (file, page, overrides = {}) =>
  Image(file, {
    ...options,
    outputDir: path.dirname(page.outputPath),
    urlPath: page.url,
    transformOnRequest: onRequest,
    ...overrides
  })
export const generateHTML = Image.generateHTML
