// Image flags in Markdown. A flag goes in the image's URL fragment, e.g. ![Alt text](photo.jpg#wide):
//   wide    a lone image at the blog's .wide width
//   narrow  a lone image at the blog's .narrow width
//   bleed   a lone image at the full width of the window
// No flag: the normal text column.
//
// A markdown-it rule strips the flag from the image's URL while the Markdown is rendered (Eleventy's image transform
// must never see a fragment on a file name). A paragraph with one flagged image (optionally inside a link) is wrapped
// in the same <div> the {% wide %} and {% narrow %} shortcodes make, and the image still goes through the blog's image
// transform.
const FLAGS = ["wide", "narrow", "bleed"]

/** Strips the known flags from an image token's src and returns them. */
function takeFlags(image) {
  const [file, fragment = ""] = image.attrGet("src").split("#")
  const parts = fragment.split("+").filter(Boolean)
  const flags = parts.filter((part) => FLAGS.includes(part))
  if (flags.length > 0) image.attrSet("src", [file, ...parts.filter((part) => !FLAGS.includes(part))].join("#"))
  return flags
}

/** @param {import("markdown-it")} md */
export function markdownImageFlags(md) {
  md.core.ruler.push("image-flags", (state) => {
    const tokens = state.tokens
    for (let i = tokens.length - 3; i >= 0; i--) {
      if (tokens[i].type !== "paragraph_open" || tokens[i + 1].type !== "inline") continue
      const children = tokens[i + 1].children ?? []
      const images = children.filter((child) => child.type === "image")
      if (images.length === 0) continue
      const flags = images.map(takeFlags)
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
