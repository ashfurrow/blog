import { coverURL } from "./_config/photoposts.js"

// The /photos page is shared as the newest photo post's banner. The page's own banner is picked at random in the
// browser, see photos.njk.
export default {
  eleventyComputed: {
    socialImage: async (data) => {
      const newest = data.collections?.photoPosts?.[0]
      return newest?.data.banner ? coverURL(newest, newest.data.banner) : undefined
    }
  }
}
