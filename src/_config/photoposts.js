// Photo posts (layout PHOTO_LAYOUT): the photo groups in a post, and what the /photos page needs from them, a collection
// and the shortcodes that render their banners.
import path from "node:path"
import posthtml from "posthtml"
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

const DATA_ATTRS = ["data-photo", "data-group", "data-flags", "data-lightbox"]

/** A blog post's image, already processed by the blog's image transform: the page's own file, at its own size. */
function blogFigure({ blog, flags }) {
  const ratio = Math.round((Number(blog.width) / Number(blog.height)) * 1000) / 1000
  const attrs = Object.entries(blog)
    .filter(([name]) => !DATA_ATTRS.includes(name))
    .map(([name, value]) => (value === true || value === "" ? name : `${name}="${value}"`))
  return {
    ratio,
    html: `<figure class="photo${flags.has("wide") ? " wide" : ""}" style="--ar: ${ratio}"><a href="${blog.src}" data-lightbox><img ${attrs.join(" ")}></a></figure>`
  }
}

async function figure(page, photo, { alone, layout }) {
  if (photo.blog) return blogFigure(photo)
  const { src, alt, flags } = photo
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

/**
 * The photos of a paragraph made only of images from a photo post (data-photo) or a group of images in a blog post
 * (data-group, which must have been given their size), or null for any other node.
 */
function photosOf(node) {
  if (node.tag !== "p") return null
  const children = (node.content ?? []).filter((child) => typeof child !== "string" || child.trim())
  const isImage = (child, marker) => child.tag === "img" && marker in (child.attrs ?? {})
  const photoPost = children.length > 0 && children.every((child) => isImage(child, "data-photo"))
  const blogGroup =
    children.length > 1 &&
    children.every((child) => isImage(child, "data-group") && child.attrs.width && child.attrs.height)
  if (!photoPost && !blogGroup) return null
  return children.map(({ attrs }) => ({
    src: decode(attrs.src),
    alt: decode(attrs.alt ?? ""),
    flags: new Set((attrs["data-flags"] ?? "").split("+").filter(Boolean)),
    blog: blogGroup ? attrs : null
  }))
}

/** The HTML of a photo group: rows of figures. */
async function photoGroup(page, photos) {
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
}

/** Photo post: every paragraph made only of images becomes a photo group. */
async function photoGroups(content, page) {
  const { html } = await posthtml([
    async (tree) => {
      const groups = new Map()
      tree.walk((node) => {
        const photos = photosOf(node)
        if (photos) groups.set(node, photoGroup(page, photos))
        return node
      })
      const built = new Map(await Promise.all([...groups].map(async ([node, group]) => [node, await group])))
      tree.walk((node) => {
        const group = built.get(node)
        if (group) return group
        if (node.tag !== "img" || !node.attrs) return node
        // A lone image in a blog post opens in the lightbox. (A group that couldn't be built has no use for its tags.)
        const lightbox = "data-lightbox" in node.attrs
        for (const name of DATA_ATTRS) delete node.attrs[name]
        return lightbox ? { tag: "a", attrs: { href: node.attrs.src, "data-lightbox": "" }, content: [node] } : node
      })
    }
  ]).process(content)
  return html
}

/**
 * The URL of a photo post's banner image (its largest size), also used as the header and social image so each banner is
 * only processed once. `page` is the post or its page data (inputPath, outputPath, url).
 */
export async function coverURL(page, banner) {
  const metadata = await resize(path.join(path.dirname(page.inputPath), banner), page)
  return metadata.jpeg.at(-1).url
}

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("photoLayout", PHOTO_LAYOUT) // for templates that tell photo posts apart

  // Dimensions come from the image files, so they are not stored anywhere.
  eleventyConfig.addTransform("photo-groups", async function (content) {
    if (!this.page.outputPath?.endsWith(".html") || !/data-(photo|group|lightbox)/.test(content)) return content
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
    return JSON.stringify(await Promise.all(included.map((post) => coverURL(post, post.data.banner))))
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
