import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import {
  Layout,
  Wrapper,
  Header,
  Subline,
  SEO,
  PrevNext,
  SectionTitle,
  Content
} from '../components'
import config from '../../config/SiteConfig'
import '../utils/prismjs-theme.css'
import PathContext from '../models/PathContext'
import Post from '../models/Post'
import { MDXProvider } from '@mdx-js/react'
import Narrow from '../components/Narrow'
import Wide from '../components/Wide'
import { ReactResponsiveEmbed } from '../components/ReactResponsiveEmbed'
import YouTube from '../components/YouTube'

const ShortCodes = { Narrow, Wide, ReactResponsiveEmbed, YouTube }

const PostContent = styled.div`
  margin-top: 4rem;
`

interface Props {
  data: {
    mdx: Post
  }
  pathContext: PathContext
}

export default class PostPage extends React.PureComponent<Props> {
  public render() {
    console.log("hey, ho, what's this now?", this.props)
    const { prev, next } = this.props.pathContext
    const post = this.props.data.mdx
    return (
      <Layout>
        {post ? (
          <>
            <SEO postPath={post.fields.slug} postNode={post} postSEO />
            <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
            <Header banner={post.frontmatter.banner}>
              <Link to="/">{config.siteTitle}</Link>
              <SectionTitle>{post.frontmatter.title}</SectionTitle>
              <Subline light={true}>
                {post.frontmatter.date} &mdash; {post.timeToRead} Min Read
                &mdash; In{' '}
              </Subline>
            </Header>
            <Wrapper>
              <Content>
                <PostContent>
                  <MDXProvider components={ShortCodes}>
                    <MDXRenderer>{post.body}</MDXRenderer>
                  </MDXProvider>
                </PostContent>
                <PrevNext prev={prev} next={next} />
              </Content>
            </Wrapper>
          </>
        ) : null}
      </Layout>
    )
  }
}

export const postQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        category
        tags
        banner
      }
      timeToRead
    }
  }
`
