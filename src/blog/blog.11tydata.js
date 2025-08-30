import slugify from "@sindresorhus/slugify"

export default {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: (data) => {
    return `/blog/${slugify(data.title)}/`
  }
}
