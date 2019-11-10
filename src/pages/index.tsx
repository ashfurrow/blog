import React from 'react'
import { Link, graphql } from 'gatsby'
import {
  Layout,
  Wrapper,
  SectionTitle,
  Header,
  Content,
  SectionSubTitle
} from '../components'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Data from '../models/Data'
import styled from 'styled-components'
import { FeaturedPosts } from './FeaturedPost'

interface Props {
  data: Data
}

export default class HomePage extends React.Component<Props> {
  public render() {
    const { data } = this.props
    const { edges, totalCount } = data.allMdx

    return (
      <Layout>
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <Header>
          <SectionTitle>Ash Furrow</SectionTitle>
          <Line />
          <SectionSubTitle>Compassionate Software Developer</SectionSubTitle>
        </Header>
        <Wrapper>
          <Content>
            <h2 style={{ marginBottom: '1rem' }}>Get Started Here</h2>
            <FeaturedPosts />
            <h2 style={{ marginBottom: '1rem' }}>Recent Posts</h2>
            <ol style={{ margin: 0 }}>
              {edges.map(post => (
                <li
                  key={post.node.frontmatter.title}
                  style={{ listStyleType: 'none', margin: 0 }}
                >
                  <Link to={post.node.fields.path}>
                    <Title>{post.node.frontmatter.title}</Title>
                    <Date dateTime={post.node.frontmatter.standardDate}>
                      {post.node.frontmatter.date}
                    </Date>
                  </Link>
                </li>
              ))}
            </ol>
          </Content>
        </Wrapper>
      </Layout>
    )
  }
}
export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      limit: 10
    ) {
      totalCount
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            standardDate: date(formatString: "YYYY-MM-DD")
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`

const Line = styled.hr`
  color: white;
  width: 5rem;
  margin: 0.5rem auto;
  height: 3px;
`

const Title = styled.span`
  margin-right: 0.5rem;
`

const Date = styled.time`
  color: rgba(0, 0, 0, 0.5);
  font-family: ${config.headerFontFamily};
`
