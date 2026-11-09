import { PHOTO_LAYOUT } from "./imageflags.js"

const monthName = (date) => date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })

/**
 * The posts, newest first, reduced to what a list needs.
 * @param {import('@11ty/eleventy/src/UserConfig').CollectionApi} api
 */
const summaries = (api) =>
  api
    .getFilteredByTag("posts")
    .reverse()
    .map((post) => ({
      title: post.data.title,
      url: post.url,
      date: post.date,
      photo: post.data.layout === PHOTO_LAYOUT
    }))

/**
 * The lists of posts on the home page and in the archive.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
  eleventyConfig.addCollection("postSummaries", summaries)

  // The same posts grouped by month, which the archive lists.
  eleventyConfig.addCollection("postMonths", (api) => {
    const months = []
    for (const post of summaries(api)) {
      const name = monthName(post.date)
      if (months.at(-1)?.name !== name) {
        months.push({ name, posts: [] })
      }
      months.at(-1).posts.push(post)
    }
    return months
  })
}
