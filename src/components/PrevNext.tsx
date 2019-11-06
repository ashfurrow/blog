import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Post from '../models/Post'
import Theme from '../../config/Theme'
import { generateSlug } from '../utils/slugs'
import { media } from '../utils/media'

const Wrapper = styled.div`
  margin: 4rem auto;
  overflow: auto;
  @media ${media.tablet} {
    margin: 2rem auto;
  }
  @media ${media.phone} {
    margin: 2rem auto;
  }
  a {
    color: ${() => Theme.colors.grey.default};
    text-transform: uppercase;
  }
`

const Button = styled.div`
  border: 1px black solid;
  width: 45%;
  padding: 0.5rem;
`

const Prev = styled(Button)`
  text-align: center;
  float: left;
`

const Next = styled(Button)`
  text-align: center;
  float: right;
`

interface Props {
  next: Post
  prev: Post
}

export class PrevNext extends React.PureComponent<Props> {
  public render() {
    const { prev, next } = this.props
    return (
      <Wrapper>
        {prev && (
          <Prev>
            <Link to={`/blog/${generateSlug(prev.frontmatter.title)}`}>
              {prev.frontmatter.title}
            </Link>
          </Prev>
        )}
        {next && (
          <Next>
            <Link to={`/blog/${generateSlug(next.frontmatter.title)}`}>
              {next.frontmatter.title}
            </Link>
          </Next>
        )}
      </Wrapper>
    )
  }
}
