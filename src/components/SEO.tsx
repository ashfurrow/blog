import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Post from '../models/Post'

interface GeneralPageProps {
  title: string
  description?: string
  image?: string
}

interface SEO {
  data: Post | GeneralPageProps
  path: string
}

function isPost(data: Post | GeneralPageProps): data is Post {
  return 'excerpt' in data
}

export const SEO = (props: SEO) => {
  const { data, path } = props
  let title
  let description
  let image
  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
  const url = config.siteUrl + realPrefix + path
  if (isPost(data)) {
    const postMeta = data.frontmatter
    title = postMeta.title
    description = data.excerpt
    image = postMeta.socialImage && postMeta.socialImage.publicURL
    image = image || (postMeta.banner && postMeta.banner.publicURL)
    image = image || config.siteBanner
  } else {
    title = data.title
    description = data.description || config.siteDescription
    image = data.image || config.siteBanner
  }
  image = config.siteUrl + realPrefix + image
  const blogURL = config.siteUrl + config.pathPrefix

  let schemaOrgJSONLD: Object[] = []
  if (isPost(data)) {
    schemaOrgJSONLD = [
      {
        url,
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        // @ts-ignore
        '@id': url,
        // @ts-ignore
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description: config.siteDescription,
        datePublished: data.frontmatter.date,
        dateModified: data.frontmatter.date,
        author: {
          '@type': 'Person',
          name: config.author,
          url: config.siteUrl,
          image: 'https://static.ashfurrow.com/ashfurrow_thumbsup_square.jpeg',
          sameAs: [
            'https://twitter.com/ashfurrow',
            'https://instagram.com/ashfurrow',
            'https://mastodon.technology/@ashfurrow',
            'https://github.com/ashfurrow'
          ]
        },
        publisher: {
          '@type': 'Organization',
          name: config.author,
          logo: {
            '@type': 'ImageObject',
            url: config.siteUrl + realPrefix + config.siteLogo
          }
        },
        isPartOf: blogURL,
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': blogURL
        }
      }
    ]
  } else {
    schemaOrgJSONLD = [
      {
        url,
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        '@id': url,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : ''
      }
    ]
  }

  return (
    <Helmet>
      <html lang={config.siteLanguage} />
      <title>{config.siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta property="og:locale" content={config.ogLanguage} />
      <meta property="og:site_name" content={config.siteTitle} />
      <meta property="og:url" content={url} />
      {isPost(data) && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={config.siteUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="alternate" type="application/rss+xml" title={config.siteTitle} href={ blogURL + "/feed.xml" }>
    </Helmet>
  )
}
