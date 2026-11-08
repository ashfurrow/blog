// What the /photos page needs from the photo posts: a collection and the shortcodes that render their banners.
import path from "node:path"
import { PHOTO_LAYOUT } from "./imageflags.js"
import { generateHTML, resize } from "./photo-images.js"

// Photo posts whose banner is not used for the /photos page's random banner.
const NOT_RANDOM_BANNERS = ["guitar-rewire"]

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

  // {% photoBanners %}: a JSON list of banner image URLs (1600px) of the photo posts, for the /photos page to pick one
  // from. A post that is a one-off in the set (a different kind of story) is left out.
  eleventyConfig.addAsyncShortcode("photoBanners", async function () {
    const included = this.ctx.collections.photoPosts.filter(
      (post) => post.data.banner && !NOT_RANDOM_BANNERS.some((slug) => post.inputPath.includes(`-${slug}/`))
    )
    const urls = []
    for (const post of included) {
      const metadata = await resize(path.join(path.dirname(post.inputPath), post.data.banner), post, {
        widths: [1600],
        formats: ["jpeg"]
      })
      urls.push(metadata.jpeg[0].url)
    }
    return JSON.stringify(urls)
  })

  // {% photoCover post, sizes, loading %}: a photo post's banner as a <picture> (600 and 1200px) for a card.
  eleventyConfig.addAsyncShortcode("photoCover", async function (post, sizes, loading = "lazy") {
    const metadata = await resize(path.join(path.dirname(post.inputPath), post.data.banner), post, {
      widths: [600, 1200]
    })
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
