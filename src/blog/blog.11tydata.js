export default {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: (data) => {
    return `/blog/${data.page.fileSlug}/`
  }
}
