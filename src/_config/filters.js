/**
 * Adds custom filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
  // What a feed shows for a post. A photo post's photos are not at URLs a reader can load, so its feed item is its intro
  // (the paragraphs before the first heading or photo, else the first paragraph) and a link.
  eleventyConfig.addFilter("feedContent", (post, url) => {
    const html = String(post.templateContent)
    if (post.data.layout !== "layouts/photo.njk") return html
    const paragraphs = (text) => text.match(/<p>(?!<img )[\s\S]*?<\/p>/g) ?? []
    const intro = paragraphs(html.split(/<h2|<p><img /)[0])
    return `${(intro.length > 0 ? intro : paragraphs(html).slice(0, 1)).join("\n")}<p><a href="${url}">See the photos</a></p>`
  })

  eleventyConfig.addFilter(
    "parseDate",
    /**
     * Parses a date string into a Date object.
     * @param {string} dateString - The date string to parse
     * @returns {Date} The parsed Date object
     */
    function (dateString) {
      return new Date(dateString)
    }
  )

  eleventyConfig.addFilter(
    "fromJson",
    /**
     * @param {string} str - The JSON string to parse
     */
    function (str) {
      return JSON.parse(str)
    }
  )

  eleventyConfig.addFilter(
    "readableDate",
    /**
     * @param {Date} dateObj
     */
    function (dateObj) {
      const date = new Date(dateObj)
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      }
      return date.toLocaleDateString("en-CA", options)
    }
  )

  eleventyConfig.addFilter(
    "htmlDateString",
    /**
     * Formats a date object into an HTML date string (yyyy-mm-dd).
     * @param {Date} dateObj
     * @returns {string}
     */
    function (dateObj) {
      const date = new Date(dateObj)
      return date.toLocaleDateString("en-CA", { timeZone: "UTC" }) // Canada uses `YYYY-MM-DD`
    }
  )

  eleventyConfig.addFilter(
    "head",
    /**
     * @param {any[]} array
     * @param {number} n
     */
    function (array, n) {
      if (!Array.isArray(array) || array.length === 0) {
        return []
      }
      if (n < 0) {
        return array.slice(n)
      }

      return array.slice(0, n)
    }
  )

  eleventyConfig.addFilter(
    "min",
    /**
     * @param {...number} numbers
     */
    function (...numbers) {
      return Math.min.apply(null, numbers)
    }
  )

  eleventyConfig.addFilter("toJson", function (content) {
    return JSON.stringify(content)
  })

  // Override the RSS plugin's dateToRfc822 to force UTC (fixes #530)
  eleventyConfig.addNunjucksFilter("dateToRfc822", function (value) {
    const date = new Date(value)
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
      timeZoneName: "short"
    }
    const formatted = new Intl.DateTimeFormat("en-US", options).format(date)
    const [wkd, mmm, dd, yyyy, time, z] = formatted.replace(/([,\s+\-]+)/g, " ").split(" ")
    const tz = `${z}`.replace(/UTC/, "GMT")
    return `${wkd}, ${dd} ${mmm} ${yyyy} ${time} ${tz}`
  })
}
