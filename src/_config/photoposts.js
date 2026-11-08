// What the /photos page needs from the photo posts: a collection and the shortcodes that render their banners.
import path from "node:path"
import { PHOTO_LAYOUT } from "./imageflags.js"
import { generateHTML, resize } from "./photo-images.js"

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
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
