interface Frontmatter {
  date: string
  formattedDate?: string
  standardDate?: string
  title: string
  banner?: {
    publicURL: string
  }
  bannerAttribution?: string
  socialImage?: {
    publicURL: string
  }
}

export default Frontmatter
