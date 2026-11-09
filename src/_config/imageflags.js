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
//     image is tagged data-photo, with its flags in data-flags, and told to be ignored by that transform. In a blog post
//     a paragraph of only images (no blank line between them) is tagged data-group, and a lone image data-lightbox.
//  2. A transform (photoposts.js) turns each paragraph of data-photo or data-group images into a photo group, and wraps
//     each lone data-lightbox image in a link to itself that opens the lightbox.

export const PHOTO_LAYOUT = "layouts/photo.njk"

export const FLAGS = ["wide", "narrow", "bleed"]

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
      // Only a paragraph of nothing but images can become a photo group. Any other (a linked or inline image) is left to
      // the blog's image transform like in a blog post, or its file would never be published.
      const onlyImages = children.every(
        (child) =>
          child.type === "image" || child.type === "softbreak" || (child.type === "text" && !child.content.trim())
      )
      if (photoPost && onlyImages) {
        images.forEach((image, n) => {
          image.attrSet("data-photo", "")
          if (flags[n].length > 0) image.attrSet("data-flags", flags[n].join("+"))
          image.attrSet("eleventy:ignore", "")
        })
        continue
      }
      // In a blog post the images stay in the blog's image transform (they keep their format and size); the tags tell
      // photoposts.js to turn two or more of them into a photo group, or to make a lone image open in the lightbox.
      if (!photoPost && onlyImages) {
        if (images.length > 1) {
          images.forEach((image, n) => {
            image.attrSet("data-group", "")
            if (flags[n].length > 0) image.attrSet("data-flags", flags[n].join("+"))
          })
          continue
        }
        images[0].attrSet("data-lightbox", "")
      }
      // Only a paragraph that is one image (maybe linked) gets the wrapper.
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

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownImageFlags))
}
