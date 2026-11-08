// How photo-post images are processed. Sources are the committed 2000px files; everything smaller is generated at build
// time into _site/img/ (hashed names, so they never collide with the blog's own image output).
import Image from "@11ty/eleventy-img"

export const options = {
  widths: [600, 1200, 2000],
  formats: ["webp", "jpeg"],
  outputDir: "_site/img/",
  urlPath: "/img/"
}

export const resize = (file, overrides = {}) => Image(file, { ...options, ...overrides })
export const generateHTML = Image.generateHTML
