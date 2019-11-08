interface Frontmatter {
  date: string
  formattedDate?: string
  title: string
  banner?: {
    publicURL: string
  }
  bannerAttribution?: string
}

export default Frontmatter
