import slugify from "@sindresorhus/slugify"

export default {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: (data) => {
    const slug = slugify(data.title, {
      decamelize: false,
      customReplacements: [
        ["'", ""],
        ["&", ""]
      ],
      preserveCharacters: ["_"]
    })
    return `/blog/${slug}/`
  }
}
