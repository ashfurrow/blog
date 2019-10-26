import React from 'react'
import styled from 'styled-components'
import rgba from 'polished/lib/color/rgba'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'

const HeaderWrapper: any = styled.header`
  position: relative;
  /* Abusing linear-gradient for a constant dim effect. */
  background: linear-gradient(
      ${() => rgba(0, 0, 0, 0.2)},
      ${() => rgba(0, 0, 0, 0.2)}
    ),
    url(${(props: any) => props.banner}) no-repeat;
  background-size: cover;
  padding: 8rem 2rem 10rem;
  text-align: center;
  z-index: 5;

  @media ${media.tablet} {
    padding: 4rem 2rem 6rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem 2rem;
  }
`

const Content = styled.div`
  position: relative;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
`

interface Props {
  children: any
  banner?: string
}

export class Header extends React.PureComponent<Props> {
  public render() {
    return (
      <HeaderWrapper banner={this.props.banner || config.defaultBg}>
        <Content>{this.props.children}</Content>
      </HeaderWrapper>
    )
  }
}
