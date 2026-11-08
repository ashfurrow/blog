import path from "node:path"

// The /photos page is shared as the newest photo post's banner (as a path from this directory, src/). The page's own
// banner is picked at random in the browser, see photos.njk.
export default {
  eleventyComputed: {
    socialImage: (data) => {
      const newest = data.collections?.photoPosts?.[0]
      if (!newest?.data.banner) return undefined
      return path.join(path.relative("src", path.dirname(newest.inputPath)), newest.data.banner)
    }
  }
}
