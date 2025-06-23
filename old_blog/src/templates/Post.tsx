import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import {
  Wrapper,
  Header,
  SEO,
  PrevNext,
  SectionTitle,
  SectionSubTitle,
  Narrow,
  Wide
} from 'components'
import { Layout } from 'layouts'
import { Content } from 'layouts/components'
import config from 'config/siteConfig'
import 'utils/prismjs-theme.css'
import Post from 'models/Post'
import { MDXProvider } from '@mdx-js/react'
import { ReactResponsiveEmbed } from 'components/ReactResponsiveEmbed'
import {
  YouTube,
  Video,
  SpeakerDeck,
  SoundCloud,
  Spotify,
  Toot,
  Tweet
} from 'components/Embeds'
import { theme } from 'config/theme'
import PageContext from 'models/PageContext'
import { PersonalTimeline } from 'components/PersonalTimeline'

const ShortCodes = {
  Narrow,
  Wide,
  ReactResponsiveEmbed,
  YouTube,
  Video,
  SpeakerDeck,
  Tweet,
  SoundCloud,
  Spotify,
  Toot,
  PersonalTimeline
}

const PostContent = styled.div`
  margin-top: 1rem;
`

const TypoLink = styled.a`
  color: ${theme.colors.grey.default};
  margin: 0.5rem auto;
  display: block;
  font-size: 0.75rem;
  font-style: italic;
  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`

interface Props {
  data: {
    mdx: Post
  }
  pageContext: PageContext
}

const PostPage = (props: Props) => {
  const { prev, next } = props.pageContext
  const post = props.data.mdx
  return (
    <Layout>
      {post ? (
        <>
          <SEO path={post.fields.path} data={post} />
          <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
          <Header
            banner={
              post.frontmatter.banner && post.frontmatter.banner.publicURL
            }
            bannerAttribution={post.frontmatter.bannerAttribution}
            left
          >
            <SectionTitle left>
              {post.frontmatter.title}
              <Line />
              <SectionSubTitle left>
                <Date dateTime={post.frontmatter.standardDate}>
                  {post.frontmatter.date}
                </Date>
              </SectionSubTitle>
            </SectionTitle>
          </Header>
          <Wrapper>
            <Content>
              <PostContent>
                <MDXProvider components={ShortCodes}>
                  <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider>
              </PostContent>
              <hr style={{ margin: '0' }} />
              <TypoLink href={post.fields.githubLink}>
                Please submit typo corrections on GitHub
              </TypoLink>
              <PrevNext prev={prev} next={next} />
            </Content>
          </Wrapper>
        </>
      ) : null}
    </Layout>
  )
}
// Gatsby needs this default export to work.
// eslint-disable-next-line import/no-default-export
export default PostPage

const Line = styled.hr`
  color: white;
  width: 5rem;
  margin: 0.5rem 0;
  height: 3px;
`

const Date = styled.time`
  color: white;
  clear: both;
  font-family: ${config.headerFontFamily};
`

export const postQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        path
        githubLink
      }
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        standardDate: date(formatString: "YYYY-MM-DD")
        banner {
          publicURL
        }
        bannerAttribution
        socialImage {
          publicURL
        }
      }
      excerpt(pruneLength: 320)
      timeToRead
    }
  }
`
