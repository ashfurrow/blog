import { parameterize } from 'inflected'

export const generateSlug = (title: string) => {
  // Re-implementation of https://www.rubydoc.info/github/middleman/middleman/Middleman%2FUtil%2FUriTemplates.safe_parameterize
  // Which is itself a re-implementation of http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html#method-i-parameterize
  // This matches the old Middleman slugs
  const sep = '-'
  return parameterize(
    title
      .replace('&amp;', '-')
      .replace(/[']/g, '')
      .replace('&', '-')
  )
    .replace(/[^a-z0-9\-_\?]+/, sep) // Remove non-alphanumberic characters
    .replace(/-{2,}/, sep) // No more than one of the separator in a row.
    .replace(/^-|-$/, '') // Remove leading/trailing separator.
}

export const generatePath = (title: string) => `/blog/${generateSlug(title)}/`
