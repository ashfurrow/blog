import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Wrapper, SectionTitle, Header, Content } from '../components'
import { groupBy } from 'lodash'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Data from '../models/Data'
import theme from '../../config/Theme'
import rgba from 'polished/lib/color/rgba'
import styled from 'styled-components'

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
    const { edges } = data.allMdx

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
          <Content style={{ marginTop: '2rem' }}>
            {months
              .sort((lhs, rhs) => lhs.year - rhs.year)
              .reverse()
              .map(({ year, posts }) => {
                return (
                  <div key={year}>
                    {Object.keys(posts)
                      .map(k => {
                        return posts[k]
                      })
                      .sort((lhs, rhs) => {
                        const lhsDate = new Date(lhs[0].frontmatter.date)
                        const rhsDate = new Date(rhs[0].frontmatter.date)
                        return lhsDate.getFullYear() - rhsDate.getFullYear()
                      })
                      .reverse()
                      .map((monthPosts, index) => {
                        const representativeDate = new Date(
                          monthPosts[0].frontmatter.date
                        )
                        return (
                          <div
                            key={representativeDate.toDateString()}
                            style={{ marginBottom: '2rem' }}
                          >
                            <h2 style={{ marginBottom: '0.5rem' }}>
                              {MONTHS[representativeDate.getMonth()]} {year}
                            </h2>
                            {monthPosts.map(post => (
                              <article key={post.fields.path}>
                                <a
                                  href={post.fields.path}
                                  style={{ marginRight: '0.5rem' }}
                                >
                                  {post.frontmatter.title}
                                </a>
                                <Date dateTime={post.frontmatter.standardDate}>
                                  {post.frontmatter.formattedDate}
                                </Date>
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

const Date = styled.time`
  color: rgba(0, 0, 0, 0.5);
  float: left;
  clear: both;
  font-family: ${config.headerFontFamily};
`

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            date
            formattedDate: date(formatString: "MMMM D, YYYY")
            standardDate: date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`
