// Photo posts (layout PHOTO_LAYOUT): the photo groups in a post, and what the /photos page needs from them, a collection
// and the shortcodes that render their banners.
import path from "node:path"
import { FLAGS, PHOTO_LAYOUT } from "./imageflags.js"
import { sizes } from "./grid.js"
import { generateHTML, resize } from "./photo-images.js"
import { rowsFor } from "./photo-rows.js"

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) ?? [])[1]

async function figure(page, { src, alt, flags }, { alone, layout }) {
  const metadata = await resize(path.join(path.dirname(page.inputPath), src), page)
  const largest = metadata.jpeg.at(-1)
  const ratio = Math.round((largest.width / largest.height) * 1000) / 1000
  const picture = generateHTML(metadata, {
    alt,
    sizes: alone ? sizes(layout || "default") : flags.has("wide") ? sizes("wide") : sizes("grid"),
    loading: "lazy",
    decoding: "async"
  })
  const classes = ["photo", flags.has("wide") && "wide", alone && "alone"].filter(Boolean).join(" ")
  return {
    ratio,
    html: `<figure class="${classes}" style="--ar: ${ratio}"><a href="${largest.url}" data-lightbox${alt ? "" : ' aria-label="View photo"'}>${picture}</a></figure>`
  }
}

/** Photo post: every paragraph made only of images becomes a photo group. */
async function photoGroups(content, page) {
  const groupPattern = /<p>((?:<img [^>]*\bdata-photo[^>]*>\s*)+)<\/p>/g
  const groups = await Promise.all(
    [...content.matchAll(groupPattern)].map(async ([, imgs]) => {
      const photos = [...imgs.matchAll(/<img [^>]*>/g)].map(([tag]) => {
        const flags = new Set((attr(tag, "data-flags") ?? "").split("+").filter(Boolean))
        return {
          src: decode(attr(tag, "src")),
          alt: decode(attr(tag, "alt") ?? ""),
          flags
        }
      })
      const alone = photos.length === 1
      // A lone photo's width comes from its flag only; a group is always the .wide column.
      const layout = alone ? (FLAGS.find((f) => photos[0].flags.has(f)) ?? "") : "wide"
      const figures = []
      for (const photo of photos) figures.push(await figure(page, photo, { alone, layout }))
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
  return content.replace(groupPattern, () => groups[i++])
}

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("photoLayout", PHOTO_LAYOUT) // for templates that tell photo posts apart

  // Dimensions come from the image files, so they are not stored anywhere.
  eleventyConfig.addTransform("photo-groups", async function (content) {
    if (!this.page.outputPath?.endsWith(".html") || !content.includes("data-photo")) return content
    return photoGroups(content, this.page)
  })

  // The photo posts, newest first, for the /photos page.
  eleventyConfig.addCollection("photoPosts", (api) =>
    api
      .getFilteredByTag("posts")
      .filter((post) => post.data.layout === PHOTO_LAYOUT)
      .reverse()
  )

  // {% photoBanners %}: a JSON list of banner image URLs (2000px) of the photo posts, for the /photos page to pick one
  // from. A post with `randomBanner: false` in its front matter (a one-off in the set) is left out.
  eleventyConfig.addAsyncShortcode("photoBanners", async function () {
    const included = this.ctx.collections.photoPosts.filter(
      (post) => post.data.banner && post.data.randomBanner !== false
    )
    const urls = []
    for (const post of included) {
      const metadata = await resize(path.join(path.dirname(post.inputPath), post.data.banner), post)
      urls.push(metadata.jpeg.at(-1).url)
    }
    return JSON.stringify(urls)
  })

  // {% photoCover post, sizes, loading %}: a photo post's banner as a <picture> for a card.
  eleventyConfig.addAsyncShortcode("photoCover", async function (post, sizes, loading = "lazy") {
    const metadata = await resize(path.join(path.dirname(post.inputPath), post.data.banner), post)
    return generateHTML(metadata, {
      alt: "",
      sizes,
      class: "photo-card-image",
      loading,
      decoding: "async",
      "eleventy:ignore": ""
    })
  })
}
