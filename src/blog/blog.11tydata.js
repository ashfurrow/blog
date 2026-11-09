import slugify from "../_config/util/slugify.js"

export default {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: (data) => {
    const slug = slugify(data.title)
    return `/blog/${slug}/`
  }
}
