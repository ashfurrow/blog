require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017'
  }
})

const config = require('./src/config/SiteConfig').default
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
const { generatePath } = require('./src/utils/paths')
const { removeStopwords } = require('stopword')

const moment = require('moment')
const _ = require('lodash')

const rssQuery = `
{
  allMdx(
    sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] },
    limit: 10,
  ) {
    edges {
      node {
        excerpt
        html
        fields { path }
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`

const feedSerializer = ({ query: { site, allMdx } }) => {
  return allMdx.edges.map((edge) => {
    return Object.assign({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      date: edge.node.frontmatter.date,
      url: site.siteMetadata.siteUrl + edge.node.fields.path,
      guid: site.siteMetadata.siteUrl + edge.node.fields.path,
      custom_elements: [{ 'content:encoded': edge.node.html }]
    })
  })
}

const feedTemplate = {
  title: "Ash Furrow's Blog",
  match: '^/blog/',
  serialize: feedSerializer,
  query: rssQuery
}

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl + pathPrefix
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-instagram-embed',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-lodash',
    'gatsby-plugin-root-import',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        // NOTE: The feeds don't work in the development environment, only in the build env.
        // See: https://github.com/gatsbyjs/gatsby/discussions/31484
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            ...feedTemplate,
            output: '/feed.xml'
          },
          {
            ...feedTemplate,
            output: '/feed.rss.xml'
          }
        ]
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `body`, `date`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          Mdx: {
            title: (node) => node.frontmatter.title,
            path: (node) => generatePath(node.frontmatter.title),
            // We want to index the blog posts but we want to keep the search index small
            // So let's do the following compromises:
            // - use the raw markdown, no html
            // - drop the yaml frontmatter
            // - do stopword pre-filtering
            // The plugin doesn't distinguish between including something in the index and making it accessible in the document store.
            body: (node) => {
              const htmlRemovedBody = node.rawBody.replace(/<[^>]+>/g, '')
              // Remove yaml frontmatter
              const body = _.drop(htmlRemovedBody.split('---'), 2).join(' ')
              return removeStopwords(body.split(' ')).join(' ')
            },
            date: (node) => moment(node.frontmatter.date).format('MMMM D, YYYY')
          }
        },
        // Optional filter to limit indexed nodes
        filter: (node) => node.frontmatter.tags !== 'exempt'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/blog`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          blog: require.resolve('./src/templates/Post.tsx'),
          default: require.resolve('./src/layouts/MDXLayout.tsx')
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoredFileExtensions: ['jpg', 'jpeg', 'png']
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'fmr6vlo'
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: config.Google_Tag_Manager_ID,
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoredFileExtensions: ['jpg', 'jpeg', 'png']
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.ts'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleAlt,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify'
  ]
}
