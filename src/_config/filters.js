/**
 * Adds custom filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
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
