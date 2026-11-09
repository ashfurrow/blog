/**
 * Adds custom filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
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

  eleventyConfig.addFilter("toJson", function (content) {
    // Nunjucks' SafeString (the result of `| safe`) would otherwise be serialized as an object. The output goes into a
    // <script> element, so a "<" must not be able to start a closing tag.
    return JSON.stringify(content instanceof String ? content.toString() : content).replace(/</g, "\\u003c")
  })

  eleventyConfig.addFilter(
    "decodeEntities",
    /**
     * Turns the entities that Markdown and Nunjucks escape text with back into characters, for text that is not HTML.
     * @param {string} text
     */
    function (text) {
      return String(text)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
    }
  )

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
