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
import Post from '../models/Post'
import { MDXProvider } from '@mdx-js/react'
import Narrow from '../components/Narrow'
import Wide from '../components/Wide'
import { ReactResponsiveEmbed } from '../components/ReactResponsiveEmbed'
import {
  YouTube,
  Video,
  SpeakerDeck,
  SoundCloud,
  Spotify
} from '../components/Videos'
import Theme from '../../config/Theme'
import PageContext from '../models/PageContext'
import InstagramEmbed, {
  Props as InstagramEmbedProps
} from 'react-instagram-embed'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const Tweet: React.FC<{ tweetID: string }> = ({ tweetID }) => (
  <Narrow style={{ marginBottom: '1.66rem' }}>
    <TwitterTweetEmbed tweetId={tweetID} />
  </Narrow>
)

const Instagram: React.FC<InstagramEmbedProps> = props => (
  <Narrow style={{ marginBottom: '1.66rem' }}>
    <InstagramEmbed {...props} />
  </Narrow>
)

const ShortCodes = {
  Narrow,
  Wide,
  ReactResponsiveEmbed,
  YouTube,
  Video,
  SpeakerDeck,
  Instagram,
  Tweet,
  SoundCloud,
  Spotify
}

const PostContent = styled.div`
  margin-top: 1rem;
`

const TypoLink = styled.a`
  color: ${Theme.colors.grey.default};
  margin: 1rem auto;
  display: block;
  font-size: 0.75rem;
  font-style: italic;
  &:hover {
    color: ${Theme.colors.primary};
    text-decoration: underline;
  }
`

interface Props {
  data: {
    mdx: Post
  }
  pageContext: PageContext
}

export default class PostPage extends React.PureComponent<Props> {
  public render() {
    const { prev, next } = this.props.pageContext
    const post = this.props.data.mdx
    return (
      <Layout>
        {post ? (
          <>
            <SEO postPath={post.fields.path} postNode={post} postSEO />
            <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
            <Header
              banner={
                post.frontmatter.banner && post.frontmatter.banner.publicURL
              }
              bannerAttribution={post.frontmatter.bannerAttribution}
            >
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
}

export const postQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        path
        githubLink
      }
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        banner {
          publicURL
        }
        bannerAttribution
      }
      timeToRead
    }
  }
`
