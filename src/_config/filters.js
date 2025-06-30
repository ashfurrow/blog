/**
 * Adds custom filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
  /**
   * Parses a date string into a Date object.
   * @param {string} dateString - The date string to parse
   * @returns {Date} The parsed Date object
   */
  eleventyConfig.addFilter("parseDate", function (dateString) {
    return new Date(dateString)
  })

  /**
   * Parses a JSON string.
   * @param {string} str - The JSON string to parse
   * @returns {any} The parsed JSON object
   */
  eleventyConfig.addFilter("fromJson", function (str) {
    return JSON.parse(str)
  })

  /**
   * Formats a date object into a readable string.
   * @param {Date} dateObj
   * @param {string} [format]
   * @param {string} [zone]
   * @returns {string}
   */
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    const date = new Date(dateObj)
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: zone || "UTC"
    }
    return date.toLocaleDateString("en-US", options)
  })

  /**
   * Formats a date object into an HTML date string (yyyy-mm-dd).
   * @param {Date} dateObj
   * @returns {string}
   */
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const date = new Date(dateObj)
    return date.toISOString().split("T")[0]
  })

  /**
   * Gets the first n elements of an array.
   * @param {any[]} array
   * @param {number} n
   * @returns {any[]}
   */
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  /**
   * Returns the smallest number argument.
   * @param {...number} numbers
   * @returns {number}
   */
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  /**
   * Returns the keys used in an object.
   * @param {Object} target
   * @returns {string[]}
   */
  eleventyConfig.addFilter("getKeys", (target) => {
    return Object.keys(target)
  })

  /**
   * Filters out 'all' and 'posts' from a tag list.
   * @param {string[]} tags
   * @returns {string[]}
   */
  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter((tag) => ["all", "posts"].indexOf(tag) === -1)
  })

  /**
   * Sorts an array of strings alphabetically.
   * @param {string[]} strings
   * @returns {string[]}
   */
  eleventyConfig.addFilter("sortAlphabetically", (strings) => (strings || []).sort((b, a) => b.localeCompare(a)))

  /**
   * Strips HTML tags from a string.
   * @param {string} content
   * @returns {string}
   */
  eleventyConfig.addFilter("striptags", (content) => {
    return content.replace(/<[^>]*>/g, "")
  })

  /**
   * Converts content to JSON properly.
   * @param {any} content
   * @returns {string}
   */
  eleventyConfig.addFilter("toJson", (content) => {
    return JSON.stringify(content)
  })
}
