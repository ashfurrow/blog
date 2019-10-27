import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Wrapper, SectionTitle, Header, Content } from '../components'
import { groupBy } from 'lodash'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Data from '../models/Data'
import theme from '../../config/Theme'
import rgba from 'polished/lib/color/rgba'

interface Props {
  data: Data
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default class HomePage extends React.Component<Props> {
  public render() {
    const { data } = this.props
    const { edges } = data.allMarkdownRemark

    const years = groupBy(edges, ({ node }) => {
      return new Date(node.frontmatter.date).getFullYear()
    })
    const months = Object.keys(years).map(year => {
      const posts = years[year].map(y => y.node)
      return {
        year: parseInt(year, 10),
        posts: groupBy(posts, ({ frontmatter: { date } }) => {
          return new Date(date).getMonth()
        })
      }
    })

    return (
      <Layout>
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <Header>
          <SectionTitle>Blog Archive</SectionTitle>
        </Header>
        <Wrapper>
          <Content>
            {months
              .sort((lhs, rhs) => lhs.year - rhs.year)
              .reverse()
              .map(({ year, posts }) => {
                return (
                  <div key={year}>
                    {Object.keys(posts).map(k => {
                      const monthPosts = posts[k]
                      const representativeDate = new Date(
                        monthPosts[0].frontmatter.date
                      )
                      return (
                        <div
                          key={representativeDate.toDateString()}
                          style={{ marginBottom: '2rem' }}
                        >
                          <h2 style={{ marginBottom: '0.5rem' }}>
                            {MONTHS[k]} {year}
                          </h2>
                          {monthPosts.map(post => (
                            <article key={post.fields.slug}>
                              <a href={`/blog/${post.fields.slug}`}>
                                {post.frontmatter.title}
                              </a>
                              &nbsp;&nbsp;&nbsp;
                              <span style={{ color: rgba(0, 0, 0, 0.5) }}>
                                {post.frontmatter.formattedDate}
                              </span>
                            </article>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
          </Content>
        </Wrapper>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            formattedDate: date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
