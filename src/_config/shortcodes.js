import * as fs from "fs"
import * as path from "path"
import MarkdownIt from "markdown-it"
import md from "./util/markdown.js"
import { transformImage } from "./util/transformImage.js"
import Metadata from "../_data/metadata.js"
import { PHOTO_LAYOUT } from "./imageflags.js"
import { coverURL } from "./photoposts.js"

// Tweets are quoted as plain text, copy/pasted
const tweetMarkdown = new MarkdownIt({ linkify: true, breaks: true })
tweetMarkdown.linkify.set({ fuzzyLink: false })

// A photo post's banner is the same file the /photos page uses; any other post's is processed by the blog's transform.
const bannerURL = (ctx, imagePath) =>
  ctx.layout === PHOTO_LAYOUT ? coverURL(ctx.page, imagePath) : transformImage(ctx, imagePath)

// A post's banner is its banner.jpg (or .png, etc.) if it has one. Front matter can still set it explicitly, which photo
// posts do.
const BANNER_FILE = /^banner\.(jpg|jpeg|png|webp)$/
const bannerPath = (ctx) =>
  ctx.banner || fs.readdirSync(path.dirname(ctx.page.inputPath)).find((name) => BANNER_FILE.test(name))

const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

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
  eleventyConfig.addShortcode("exceptOrDescription", function () {
    // description or metadata.description
    if (this.ctx.description) {
      return this.ctx.description
    }
    const photo = this.ctx.layout === PHOTO_LAYOUT
    if (photo || this.ctx.layout === "layouts/post.njk") {
      // Grab the first line of markdown that is prose and render it. (Posts can start with a heading, an image, a
      // shortcode or some HTML.)
      const excerpt = first(this.ctx.page.rawInput.split("\n"), (line) => /^[^#!{<\s]/.test(line))
      if (excerpt) return md.render(excerpt).trim()
    }
    if (photo) {
      if (this.ctx.subtitle) return this.ctx.subtitle
      return this.ctx.location ? `Photos from ${this.ctx.location}.` : `Photos by ${Metadata.author.name}.`
    }
    return Metadata.description
  })

  // Transforms the socialImage frontmatter, falling back to banner or a site-wide default
  eleventyConfig.addNunjucksAsyncShortcode("socialImageURL", async function () {
    // Fall back to banner if social image is not specified
    /** @type {string} */
    const imagePath = this.ctx.socialImage || bannerPath(this.ctx)

    if (!imagePath) {
      return Metadata.banner
    }
    if (imagePath.startsWith("/")) {
      return imagePath
    }

    return bannerURL(this.ctx, imagePath)
  })

  // Transforms the bannerImage, falling back to a site-wide default.
  eleventyConfig.addNunjucksAsyncShortcode("bannerImageURL", async function () {
    /** @type {string} */
    const banner = bannerPath(this.ctx)

    if (!banner) {
      return Metadata.banner
    }
    if (banner.startsWith("/")) {
      return banner
    }

    return bannerURL(this.ctx, banner)
  })

  eleventyConfig.addPairedShortcode("wide", function (content) {
    return `<div class="wide">${content}</div>`
  })

  eleventyConfig.addPairedShortcode("narrow", function (content) {
    return `<div class="narrow">${content}</div>`
  })

  // A larger, upright blockquote that fills the normal text column. The blank lines let Markdown render the content.
  eleventyConfig.addPairedShortcode("pullquote", function (content) {
    return `<blockquote class="pullquote">\n\n${content}\n\n</blockquote>`
  })

  // Floats the images inside to the right so the paragraphs after them flow around. The blank lines let Markdown render the content.
  eleventyConfig.addPairedShortcode("rightimage", function (content) {
    return `<div class="right-image-container">\n\n${content}\n\n</div>`
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
  // A tweet embed, given the tweet's id. The body (plain Markdown) is the tweet's text and attribution, kept as a
  // blockquote in case the tweet is deleted.
  //
  //   {% tweet "123" %}
  //   Tweet text.
  //
  //   — Name @handle Month D, YYYY
  //   {% endtweet %}
  //
  // The embed script finds the tweet by the last link in the blockquote, so the shortcode links the attribution to the
  // tweet itself. With an empty body, only that link is rendered: {% tweet "123" %}{% endtweet %}.
  // Twitter is X now, but the shortcode keeps its name.
  eleventyConfig.addPairedShortcode("tweet", function (content, tweet) {
    const text = content.trim()
    const split = text.lastIndexOf("\n\n— ")
    const quote = split < 0 ? text : text.slice(0, split)
    const attribution = split < 0 ? "" : text.slice(split + 2)
    const url = `https://x.com/x/status/${tweet}`
    const link = attribution
      ? `<p><a href="${url}">${tweetMarkdown.renderInline(attribution)}</a></p>`
      : `<a href="${url}"></a>`
    const body = (quote ? tweetMarkdown.render(quote).trim() : "") + link
    return `<div class="narrow">
      <blockquote class="twitter-tweet" data-dnt="true">${body}</blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>`
  })
  eleventyConfig.addShortcode("instagram", function (url) {
    const href = escapeAttr(url)
    return `<div class="narrow">
      <blockquote class="instagram-media" data-instgrm-permalink="${href}" data-instgrm-version="14" data-instgrm-captioned>
        <a href="${href}">View this post on Instagram</a>
      </blockquote>
      <script async src="https://www.instagram.com/embed.js"></script>
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
