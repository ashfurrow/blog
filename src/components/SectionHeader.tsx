import React from 'react'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'
import rgba from 'polished/lib/color/rgba'
import styled from 'styled-components'

const dimmingEffect = `linear-gradient(${rgba(0, 0, 0, 0.2)},${rgba(
  0,
  0,
  0,
  0.2
)}), `
const HeaderWrapper = styled.header<{ banner: string; dim: boolean }>`
  position: relative;
  background: ${props => props.dim && dimmingEffect}
    url(${props => props.banner}) no-repeat center center;
  background-size: cover;
  padding: 8rem 2rem 10rem;
  text-align: center;
  padding: 10rem 2rem;
  margin-top: 8rem;
  margin-bottom: 2rem;

  width: 100vw;
  margin-left: -50vw;
  left: 50%;

  @media ${media.tablet} {
    padding: 6rem 2rem;
  }
  @media ${media.phone} {
    padding: 3rem 0.5rem;
  }
`

const Content = styled.div`
  position: relative;
  color: white;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
  h2 {
    font-size: 2.5em;
    font-weight: 800;
    color: white;
    font-family: ${config.headerFontFamily};
  }
`

interface Props {
  children: any
  banner: string
  dim?: boolean
}
export class SectionHeader extends React.Component<Props> {
  public render() {
    const { banner, children, dim } = this.props
    return (
      <HeaderWrapper banner={banner} dim={dim || false}>
        <Content>{children}</Content>
      </HeaderWrapper>
    )
  }
}
