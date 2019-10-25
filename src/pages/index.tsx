import React from 'react'
import { Link, graphql } from 'gatsby'
import {
  Layout,
  Article,
  Wrapper,
  SectionTitle,
  Header,
  Content
} from '../components'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Data from '../models/Data'

interface Props {
  data: Data
}

export default class HomePage extends React.Component<Props> {
  public render() {
    console.log({ props: this.props })
    const { data } = this.props
    const { edges, totalCount } = data.allMarkdownRemark

    return (
      <Layout>
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
          <SectionTitle uppercase={true}>
            Latest stories ({totalCount})
          </SectionTitle>
        </Header>
        <Wrapper>
          <Content>
            {edges.map(post => (
              <Article
                title={post.node.frontmatter.title}
                date={post.node.frontmatter.date}
                excerpt={post.node.excerpt}
                timeToRead={post.node.timeToRead}
                slug={post.node.fields.slug}
                category={post.node.frontmatter.category}
                key={post.node.fields.slug}
              />
            ))}
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
            date(formatString: "DD.MM.YYYY")
            category
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`
