import * as path from "path"
import MarkdownIt from "markdown-it"
import { transformImage } from "./util/transformImage.js"
import Metadata from "../_data/metadata.js"

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

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
 * Returns first item that passes the check
 * @template T
 * @param {T[]} collection
 * @param {(item: T) => boolean} check
 * @returns {K|undefined}
 */
function first(collection, check) {
  for (const item of collection) {
    if (check(item)) {
      return item
    }
  }
}

/**
 * Adds custom shortcodes and filters to the Eleventy config.
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - The Eleventy configuration object.
 */
export default function (eleventyConfig) {
  // Groups posts by month and year, returning a JSON string.
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
                return dateB - dateA // Most recent posts come first within month
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

    // We need to marshal the data over JSON due to 11ty
    return JSON.stringify(results)
  })

  eleventyConfig.addShortcode("exceptOrDescription", function () {
    // description or metadata.description
    if (this.ctx.description) {
      return this.ctx.description
    }
    if (this.ctx.layout === "layouts/post.njk") {
      // Grab the first non-empty line of markdown and render it. (I never kick blog posts off with anything but a paragraph.)
      const excerpt = first(this.ctx.page.rawInput.split("\n"), (p) => p.trim().length > 0)
      return md.render(excerpt).trim()
    }
    return Metadata.description
  })

  // Transforms the socialImage frontmatter, falling back to banner or a site-wide default
  eleventyConfig.addNunjucksAsyncShortcode("socialImageURL", async function () {
    // Fall back to banner if social image is not specified
    /** @type {string} */
    const imagePath = this.ctx.socialImage || this.ctx.banner

    if (!imagePath) {
      return "/assets/bg/default.jpg"
    }
    if (imagePath.includes("/assets/")) {
      return imagePath
    }

    return transformImage(this.ctx, imagePath)
  })

  // Transforms the bannerImage, falling back to a site-wide default.
  eleventyConfig.addNunjucksAsyncShortcode("bannerImageURL", async function () {
    /** @type {string} */
    const bannerPath = this.ctx.banner

    if (!bannerPath) {
      return "/assets/bg/default.jpg"
    }
    if (bannerPath.includes("/assets/")) {
      return bannerPath
    }

    return await transformImage(this.ctx, bannerPath)
  })

  eleventyConfig.addPairedShortcode("wide", function (content) {
    return `<div class="wide">${content}</div>`
  })

  eleventyConfig.addPairedShortcode("narrow", function (content) {
    return `<div class="narrow">${content}</div>`
  })

  eleventyConfig.addShortcode("githubLink", function () {
    const inputPath = this.ctx.page.inputPath
    // Convert to relative path from current working directory
    const relativePath = path.relative(".", inputPath)
    return `https://github.com/ashfurrow/blog/tree/main/${relativePath}`
  })

  // Social embeds
  eleventyConfig.addShortcode("youtube", function (videoId) {
    return `<div class="youtube-embed">
      <iframe 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>`
  })
  eleventyConfig.addShortcode("video", function (src) {
    return `<div class="video-embed">
      <iframe 
        src="${src}" 
        frameborder="0"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>`
  })
  eleventyConfig.addShortcode("tweet", function (tweetId) {
    return `<div class="narrow">
      <blockquote class="twitter-tweet">
        <a href="https://twitter.com/twitter/status/${tweetId}"></a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>`
  })
  eleventyConfig.addShortcode("speakerdeck", function (deckId, fourByThree = false) {
    const aspectRatio = fourByThree ? "75%" : "56.25%" // 4:3 vs 16:9
    return `<div class="narrow">
      <div class="speakerdeck-embed" style="padding-bottom: ${aspectRatio}">
        <iframe 
          src="https://speakerdeck.com/player/${deckId}" 
          frameborder="0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>`
  })
  eleventyConfig.addShortcode("soundcloud", function (trackId) {
    return `<div class="wide">
      <div class="soundcloud-embed">
        <iframe 
          width="100%" 
          height="200"
          scrolling="no"
          frameborder="0"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
          loading="lazy"
        ></iframe>
      </div>
    </div>`
  })
  eleventyConfig.addShortcode("spotify", function (src) {
    return `<div class="narrow">
      <div class="spotify-embed">
        <iframe 
          src="${src}"
          width="100%" 
          height="380"
          frameborder="0"
          allowtransparency="true"
          loading="lazy"
        ></iframe>
      </div>
    </div>`
  })
  eleventyConfig.addShortcode("toot", function (src) {
    return `<div class="narrow">
      <div class="toot-embed">
        <iframe 
          src="${src}"
          class="mastodon-embed"
          width="100%"
          style="min-height: 250px; border: 0;"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>`
  })
}
