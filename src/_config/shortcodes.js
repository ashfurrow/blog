/**
 * Groups items in a collection by a key returned from the iteratee function.
 * @template T
 * @template K
 * @param {T[]} collection
 * @param {(item: T) => K} iteratee
 * @returns {Object<K, T[]>}
 */
function groupBy(collection, iteratee) {
  const result = {}
  for (const item of collection) {
    const key = iteratee(item)
    if (!result[key]) {
      result[key] = []
    }
    result[key].push(item)
  }
  return result
}

/**
 * Adds custom shortcodes and filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
  /**
   * Groups posts by month and year, returning a JSON string.
   * @returns {string}
   */
  eleventyConfig.addShortcode("groupedPosts", function () {
    const collection = this.ctx.collections.posts
    const posts = collection.map((p) => ({
      title: p.data.title,
      url: p.url,
      date: p.date
    }))

    const postsByYear = groupBy(posts, (post) => {
      return new Date(post.date).getFullYear()
    })

    const results = Object.keys(postsByYear)
      .map((year) => {
        const yearPosts = postsByYear[year]
        const postsByMonth = groupBy(yearPosts, (post) => {
          return new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          })
        })
        const months = Object.keys(postsByMonth)
          .map((month) => {
            const monthPosts = postsByMonth[month]
            return {
              name: month,
              posts: monthPosts.sort((a, b) => {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateA - dateB // Most recent posts come first within month
              })
            }
          })
          .sort((a, b) => {
            const dateA = new Date(a.posts[0].date)
            const dateB = new Date(b.posts[0].date)
            return dateB - dateA // Most recent months come first
          })

        return {
          year: parseInt(year, 10),
          months
        }
      })
      .sort((lhs, rhs) => rhs.year - lhs.year)
      .flatMap(({ months }) => months)

    return JSON.stringify(results)
  })
}
