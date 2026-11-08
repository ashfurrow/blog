import path from "node:path"
import { attr, decode } from "./imageflags.js"
import { resize } from "./photo-images.js"

/**
 * Adds custom filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
  // What a feed shows for a post. `templateContent` is the post's HTML from before the build's image transforms, so its
  // images still have their source names, and those are not what gets published:
  //  - the blog's image transform writes JPEGs as .jpeg, not .jpg;
  //  - a photo post's photos are never published under their own names, only as resized files next to the post, so each
  //    is pointed at its 1200px JPEG instead.
  eleventyConfig.addAsyncFilter("feedContent", async (post) => {
    let html = String(post.templateContent)
    const sources = [...html.matchAll(/<img [^>]*\bdata-photo[^>]*>/g)].map(([tag]) => tag)
    const replacements = new Map()
    for (const tag of sources) {
      const file = path.join(path.dirname(post.inputPath), decode(attr(tag, "src")))
      const { jpeg } = await resize(file, post)
      const photo = jpeg.find((size) => size.width === 1200) ?? jpeg.at(-1)
      const alt = attr(tag, "alt") ?? ""
      replacements.set(tag, `<img src="${photo.url}" alt="${alt}" width="${photo.width}" height="${photo.height}">`)
    }
    html = html.replace(/<img [^>]*\bdata-photo[^>]*>/g, (tag) => replacements.get(tag))
    return html.replace(/(<img\s[^>]*?\bsrc="(?![a-z][a-z0-9+.-]*:|\/\/)[^"]*)\.jpe?g(?=["#?])/gi, "$1.jpeg")
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
