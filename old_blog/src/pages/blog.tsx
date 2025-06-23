import React from 'react'
import { graphql, Link } from 'gatsby'
import { Wrapper, SectionTitle, Header, SEO } from 'components'
import { Layout } from 'layouts'
import { Content } from 'layouts/components'
import { groupBy } from 'lodash'
import Helmet from 'react-helmet'
import config from 'config/siteConfig'
import Data from 'models/Data'
import styled from 'styled-components'
import moment from 'moment'

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

const BlogPage = (props: Props) => {
  const { edges } = props.data.allMdx

  const years = groupBy(edges, ({ node }) => {
    return new Date(node.frontmatter.date).getFullYear()
  })
  const months = Object.keys(years).map((year) => {
    const posts = years[year].map((y) => y.node)
    return {
      year: parseInt(year, 10),
      posts: groupBy(posts, ({ frontmatter: { date } }) => {
        return moment.utc(date).month()
      })
    }
  })

  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <SEO path="/blog/" data={{ title: 'Blog Archive' }} />
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
                  {Object.keys(posts)
                    .map((k) => {
                      return posts[k]
                    })
                    .sort((lhs, rhs) => {
                      const lhsDate = new Date(lhs[0].frontmatter.date)
                      const rhsDate = new Date(rhs[0].frontmatter.date)
                      return lhsDate.getFullYear() - rhsDate.getFullYear()
                    })
                    .reverse()
                    .map((monthPosts) => {
                      const representativeDate = moment.utc(
                        monthPosts[0].frontmatter.date
                      )
                      //  new Date(
                      //   monthPosts[0].frontmatter.date
                      // )
                      return (
                        <div
                          key={representativeDate.toString()}
                          style={{ marginBottom: '2rem' }}
                        >
                          <h2 style={{ marginBottom: '0.5rem' }}>
                            {MONTHS[representativeDate.month()]} {year}
                          </h2>
                          {monthPosts.map((post) => (
                            <article key={post.fields.path}>
                              <Link to={post.fields.path}>
                                <Title>{post.frontmatter.title}</Title>
                                <DateTag
                                  dateTime={post.frontmatter.standardDate}
                                >
                                  {post.frontmatter.formattedDate}
                                </DateTag>
                              </Link>
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
// Gatsby needs this default export to work.
// eslint-disable-next-line import/no-default-export
export default BlogPage

const Title = styled.span`
  margin-right: 0.5rem;
`

const DateTag = styled.time`
  color: rgba(0, 0, 0, 0.5);
`

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { date: { ne: null } } }
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
