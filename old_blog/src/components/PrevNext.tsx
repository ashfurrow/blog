import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Post from 'models/Post'
import { theme } from 'config/theme'
import { generatePath } from 'utils/paths'
import { media } from 'utils/media'
import config from 'config/siteConfig'

const HR = styled.hr`
  margin-bottom: 0;
`

const Wrapper = styled.div`
  margin: 2rem auto 0;
  overflow: auto;
  @media ${media.tablet} {
    margin: 0.5rem auto 1rem;
  }
  @media ${media.phone} {
    margin: 0.5rem auto 0;
  }
`

export const Button = styled.div`
  border: 1px ${theme.colors.grey.default} solid;
  width: 45%;
  padding: 0.5rem 1rem;
  font-family: ${config.headerFontFamily};
  text-align: center;

  @media ${media.tablet} {
    width: 100%;
    margin: 0.5rem auto;
  }
  @media ${media.phone} {
    width: 100%;
    margin: 0.25rem auto;
  }

  color: ${() => theme.colors.grey.default};
  &:hover,
  &:focus {
    /* Color here is for the text colour of the link. */
    color: ${() => theme.colors.white};
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.primary};
  }
`

const Prev = styled(Button)`
  float: left;
`

const Next = styled(Button)`
  text-align: center;
  float: right;
`

const LinkText = styled.div`
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
`

interface Props {
  next: Post
  prev: Post
}

export const PrevNext = ({ prev, next }: Props) => {
  return (
    <>
      <HR />
      <Wrapper>
        {prev && (
          <Link to={generatePath(prev.frontmatter.title)}>
            <Prev>
              <LinkText>{prev.frontmatter.title}</LinkText>
            </Prev>
          </Link>
        )}
        {next && (
          <Link to={generatePath(next.frontmatter.title)}>
            <Next>
              <LinkText>{next.frontmatter.title}</LinkText>
            </Next>
          </Link>
        )}
      </Wrapper>
    </>
  )
}
