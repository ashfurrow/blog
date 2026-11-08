// Image flags in Markdown. A flag goes in the image's URL fragment, e.g. ![Alt text](photo.jpg#wide):
//   wide    a lone image at the blog's .wide width (in a photo group: the photo spans its whole row)
//   narrow  a lone image at the blog's .narrow width
//   bleed   a lone image at the full width of the window
// No flag: the normal text column.
//
// Two steps, because Eleventy runs its HTML transformer (which includes the blog's image transform) before any
// transform of ours, and it must never see a fragment on a file name:
//  1. A markdown-it rule (here) strips the flags while the Markdown is rendered. In a blog post a paragraph with one
//     flagged image (optionally inside a link) is wrapped in the same <div> the {% wide %} and {% narrow %} shortcodes
//     make, and the image still goes through the blog's image transform. In a photo post (layout PHOTO_LAYOUT) every
//     image is tagged data-photo, with its flags in data-flags, and told to be ignored by that transform.
//  2. A transform (below) turns each paragraph of data-photo images into a photo group: rows of figures, with resized
//     files from eleventy-img, a link for the lightbox and the caption (the image title) as a hover overlay.
//     Dimensions come from the image files, so they are not stored anywhere.
import path from "node:path"
import { generateHTML, resize } from "./photo-images.js"
import { rowsFor } from "./photo-rows.js"

export const PHOTO_LAYOUT = "layouts/photo.njk"

const FLAGS = ["wide", "narrow", "bleed"]

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) ?? [])[1]

// Sizes follow the grid in site.css: 12 columns, up to 80rem (1600px); text 3-11, .wide 2-12, .narrow 4-10, a full
// column on phones (600px and under).
const SIZES = {
  bleed: "100vw",
  wide: "(min-width: 1600px) 1333px, (min-width: 601px) 83vw, 100vw",
  default: "(min-width: 1600px) 1067px, (min-width: 1201px) 67vw, (min-width: 601px) 83vw, 100vw",
  narrow: "(min-width: 1600px) 800px, (min-width: 1201px) 50vw, (min-width: 601px) 67vw, 100vw",
  grid: "(min-width: 1600px) 667px, (min-width: 601px) 42vw, 100vw"
}

/** Strips the known flags from an image token's src and returns them. */
function takeFlags(image, photoPost) {
  const [file, fragment = ""] = image.attrGet("src").split("#")
  const parts = fragment.split("+").filter(Boolean)
  const flags = parts.filter((part) => FLAGS.includes(part))
  // In a photo post the file is read from disk, so any fragment goes; in a blog post only the flags do.
  if (photoPost && fragment) image.attrSet("src", file)
  else if (flags.length > 0) image.attrSet("src", [file, ...parts.filter((part) => !FLAGS.includes(part))].join("#"))
  return flags
}

/** @param {import("markdown-it")} md */
export function markdownImageFlags(md) {
  md.core.ruler.push("image-flags", (state) => {
    const photoPost = state.env?.layout === PHOTO_LAYOUT
    const tokens = state.tokens
    for (let i = tokens.length - 3; i >= 0; i--) {
      if (tokens[i].type !== "paragraph_open" || tokens[i + 1].type !== "inline") continue
      const children = tokens[i + 1].children ?? []
      const images = children.filter((child) => child.type === "image")
      if (images.length === 0) continue
      const flags = images.map((image) => takeFlags(image, photoPost))
      if (photoPost) {
        images.forEach((image, n) => {
          image.attrSet("data-photo", "")
          if (flags[n].length > 0) image.attrSet("data-flags", flags[n].join("+"))
          image.attrSet("eleventy:ignore", "")
        })
        continue
      }
      // Blog post: only a paragraph that is one image (maybe linked) gets the wrapper.
      const others = children.filter((child) => !["image", "link_open", "link_close"].includes(child.type))
      if (images.length !== 1 || others.length > 0 || flags[0].length === 0) continue
      const open = new state.Token("html_block", "", 0)
      open.content = `<div class="${flags[0][0]}">\n`
      const close = new state.Token("html_block", "", 0)
      close.content = "</div>\n"
      tokens.splice(i + 3, 0, close)
      tokens.splice(i, 0, open)
    }
  })
}

async function figure(dir, { src, alt, caption, flags }, { alone, layout }) {
  const metadata = await resize(path.join(dir, src))
  const largest = metadata.jpeg.at(-1)
  const ratio = Math.round((largest.width / largest.height) * 1000) / 1000
  const picture = generateHTML(metadata, {
    alt,
    sizes: alone ? SIZES[layout || "default"] : flags.has("wide") ? SIZES.wide : SIZES.grid,
    loading: "lazy",
    decoding: "async",
    // The blog's own image transform must leave these alone.
    "eleventy:ignore": ""
  })
  const classes = ["photo", flags.has("wide") && "wide", alone && "alone"].filter(Boolean).join(" ")
  const figcaption = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""
  return {
    ratio,
    html: `<figure class="${classes}" style="--ar: ${ratio}"><a href="${largest.url}" data-lightbox>${picture}</a>${figcaption}</figure>`
  }
}

/** Photo post: every paragraph made only of images becomes a photo group. */
async function photoGroups(content, dir) {
  const groupPattern = /<p>((?:<img [^>]*\bdata-photo[^>]*>\s*)+)<\/p>/g
  const groups = await Promise.all(
    [...content.matchAll(groupPattern)].map(async ([, imgs]) => {
      const photos = [...imgs.matchAll(/<img [^>]*>/g)].map(([tag]) => {
        const flags = new Set((attr(tag, "data-flags") ?? "").split("+").filter(Boolean))
        return {
          src: decode(attr(tag, "src")),
          alt: decode(attr(tag, "alt") ?? ""),
          caption: decode(attr(tag, "title") ?? ""),
          flags
        }
      })
      const alone = photos.length === 1
      // A lone photo's width comes from its flag only; a group is always the .wide column.
      const layout = alone ? (FLAGS.find((f) => photos[0].flags.has(f)) ?? "") : "wide"
      const figures = []
      for (const photo of photos) figures.push(await figure(dir, photo, { alone, layout }))
      const items = figures.map((f, i) => ({ ratio: f.ratio, fill: photos[i].flags.has("wide") }))
      const rows = alone ? [[0]] : rowsFor(items, "desktop")
      // On phones the rows are different. The row wrappers stop being boxes there and a spacer before the first photo
      // of each phone row breaks the line, so each photo is in the page once.
      const phoneStarts = new Map()
      if (!alone) rowsFor(items, "phone").forEach((row, n) => phoneStarts.set(row[0], n))
      const html = rows
        .map(
          (row) =>
            `<div class="row">${row
              .map((i) => (phoneStarts.get(i) > 0 ? '<span class="mbreak"></span>' : "") + figures[i].html)
              .join("")}</div>`
        )
        .join("")
      return `<div class="photos ${layout}">${html}</div>`
    })
  )
  let i = 0
  return content
    .replace(groupPattern, () => groups[i++])
    .replace(/ (eleventy:ignore|data-photo)=""| data-flags="[^"]*"/g, "")
}

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownImageFlags))

  eleventyConfig.addTransform("photo-groups", async function (content) {
    const { inputPath, outputPath } = this.page
    if (!outputPath?.endsWith(".html") || !content.includes("data-photo")) return content
    return photoGroups(content, path.dirname(inputPath))
  })
}
