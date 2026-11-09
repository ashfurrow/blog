import slugify from "@sindresorhus/slugify"

/** The slug of a post's title, which is its URL. */
export default (title) =>
  slugify(title, {
    decamelize: false,
    customReplacements: [
      ["'", ""],
      ["&", ""]
    ],
    preserveCharacters: ["_"]
  })
