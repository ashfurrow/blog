import MarkdownIt from "markdown-it"
import slugify from "@sindresorhus/slugify"

import { transformImage } from "./util/transformImage.js"

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("personalTimeline", async function (timelineEntries) {
    if (!timelineEntries || !Array.isArray(timelineEntries)) {
      return ""
    }
    const context = this.ctx

    const timelineHtml = await Promise.all(
      timelineEntries.map(async (entry) => {
        // Handle date-only entries (year markers)
        if (!entry.title && entry.date) {
          return `<div class="timeline-item timeline-year-marker">
            <div class="timeline-content">
              <h2 class="timeline-year" id="${entry.date}">${entry.date}</h2>
            </div>
          </div>`
        }

        // Handle full timeline entries
        if (entry.title) {
          // Create a URL-friendly ID from the title
          const entryId = slugify(entry.title)

          let imageContainerHtml = ""
          if (entry.img) {
            const imgAlt = entry.imgAlt || entry.title || "Timeline image"
            imageContainerHtml = `<div class="timeline-image-container">
              <img eleventy:ignore src="${await transformImage(context, entry.img)}" alt="${imgAlt}" class="timeline-image" loading="lazy" />
            </div>`
          }

          let descriptionHtml = ""
          if (entry.description) {
            // Handle both array and string descriptions
            const descriptions = Array.isArray(entry.description) ? entry.description : [entry.description]

            descriptionHtml = descriptions
              .map((paragraph) => {
                // Parse as markdown and remove any leading/trailing whitespace
                const rendered = md.render(paragraph).trim()
                return rendered
              })
              .join("")
          }

          return `<div class="timeline-item timeline-entry" id="${entryId}">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3 class="timeline-title">
                <a href="#${entryId}" class="timeline-anchor">${entry.title}</a>
              </h3>
              <div class="timeline-description">
                ${descriptionHtml}
              </div>
            </div>
            ${imageContainerHtml}
          </div>`
        }

        return ""
      })
    )

    return `<div class="personal-timeline">
      <div class="timeline-container">
        ${timelineHtml.filter((html) => html.length > 0).join("")}
      </div>
    </div>`
  })
}
